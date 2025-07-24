import { v4 as uuidv4 } from 'uuid';

import File from '../models/File.js';
import { uploadToS3, getSignedUrlFromS3, deleteFromS3 } from '../services/s3Service.js';
import User from '../models/User.js';
import { aiQueue } from '../services/aiQueue.js';

const generateUniqueFileName = (originalname) => {
    const ext = originalname.split('.').pop();
    const uniqueName = `${uuidv4()}.${ext}`;
    return uniqueName;
}

export const uploadFile = async (req, res) => {
    try {
        console.log(req.file);
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const userId = req.user.id;
        const { originalname, mimetype, size, buffer } = req.file;

        // Fetch user details
        const user = await User.findById(userId).select('fullName');

        // Generate a unique file name (uuid + original extension)
        const uniqueName = generateUniqueFileName(originalname);

        // S3 key: you can organize by user or folder if desired
        const s3Key = `uploads/${userId}-${user.fullName.split(' ')[0]}/${uniqueName}`;
        // Upload to S3
        const s3Path = await uploadToS3(buffer, s3Key, mimetype);

        // Save file metadata to MongoDB
        const fileDoc = await File.create({
            ownerId: userId,
            name: originalname,
            path: s3Path, // S3 key or URL
            size,
            mimeType: mimetype,
            // folderId, // Add if you support folders
            version: 1,
            current: true,
            permissions: {
                visibility: 'private',
                sharedWith: []
            }
        });
        // Enqueue AI summarization/classification job
        // Comment out the next line if you want to disable AI jobs
        await aiQueue.add('summarize', {
            fileId: fileDoc._id.toString(),
            s3Key: fileDoc.path,
            mimeType: fileDoc.mimeType,
            originalname: fileDoc.name
        });

        return res.status(201).json({
            message: 'File uploaded successfully',
            data: fileDoc
        });
    } catch (error) {
        return res.status(500).json({ message: 'File upload failed', error: error.message });
    }
}

export const getFileById = async (req, res) => {
    try {
        const fileId = req.params.id;
        const userId = req.user.id;
        const fileDoc = await File.findById(fileId);
        if (!fileDoc) {
            return res.status(404).json({ message: 'File not found' });
        }
        // Only allow owner to download for now
        if (fileDoc.ownerId.toString() !== userId) {
            return res.status(403).json({ message: 'You do not have permission to access this file' });
        }
        // Generate signed URLs for download and view
        const downloadUrl = await getSignedUrlFromS3(fileDoc.path, 900, 'attachment', fileDoc.name);
        const viewUrl = await getSignedUrlFromS3(fileDoc.path, 900, 'inline', fileDoc.name);
        return res.status(200).json({
            message: 'File URLs generated',
            data: {
                file: fileDoc,
                downloadUrl,
                viewUrl
            }
        });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to get file', error: error.message });
    }
}

export const getAllFiles = async (req, res) => {
    try {
        const userId = req.user.id;
        const files = await File.find({ ownerId: userId }).sort({ createdAt: -1 });

        // For each file, generate signed URLs for download and view using Promise.all
        const updatedFileData = await Promise.all(files.map(async (file) => {
            const viewUrl = await getSignedUrlFromS3(file.path, 3600, 'inline', file.name);
            const downloadUrl = await getSignedUrlFromS3(file.path, 3600, 'attachment', file.name);

            return {
                ...file._doc,      // copy file data
                viewUrl,
                downloadUrl
            };
        }));

        return res.status(200).json({
            message: 'Files retrieved successfully',
            data: updatedFileData
        });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to get files', error: error.message });
    }
}

export const updateFile = async (req, res) => {
    // TODO: Implement file update logic
    // This could include renaming, changing permissions, etc.
    const fileId = req.params.id;
    const userId = req.user.id;
    const fileDoc = await File.findById(fileId);
    if (!fileDoc) {
        return res.status(404).json({ message: 'File not found' });
    }

    // Only allow owner to update
    if (fileDoc.ownerId.toString() !== userId) {
        return res.status(403).json({ message: 'You do not have permission to update this file' });
    }

    

    return res.status(501).json({ message: 'Update file functionality not implemented yet' });
}

export const deleteFile = async (req, res) => {

    try {
        const fileId = req.params.id;
        const userId = req.user.id;
        const fileDoc = await File.findById(fileId);
        if (!fileDoc) {
            return res.status(404).json({ message: 'File not found' });
        }

        // Only allow owner to delete
        if (fileDoc.ownerId.toString() !== userId) {
            return res.status(403).json({ message: 'You do not have permission to delete this file' });
        }

        // First delete from S3 then proceed to delete from MongoDB
        await deleteFromS3(fileDoc.path);
        const deletedUser = await File.findByIdAndDelete(fileId);

        return res.status(200).json({
            message: 'File deleted successfully',
            data: deletedUser
        });
    } catch (error) {

    }
}