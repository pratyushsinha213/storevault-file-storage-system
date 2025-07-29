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

export const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 B';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;

    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    const formatted = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

    return `${formatted} ${sizes[i]}`;
}

export const uploadFile = async (req, res) => {
    try {
        console.log(req.file);
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const userId = req.user.id;
        const { originalname, mimetype, size, buffer } = req.file;
        const { folderId } = req.body;

        // Fetch user details
        const user = await User.findById(userId).select('fullName storageUsed storageLimit storageTier');

        const availableStorage = user.storageLimit - user.storageUsed;
        if (size > availableStorage) {
            return res.status(403).json({
                message: `Upload failed. You've exceeded your storage limit. You have ${formatBytes(availableStorage)} left. Either upgrade your plan or delete existing files.`
            });
        }

        // Update user's storage used on mongodb
        user.storageUsed += size;
        await user.save();

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
            folderId, // Add if you support folders
            version: 1,
            current: true,
            permissions: {
                visibility: 'private',
                sharedWith: []
            }
        });
        // Enqueue AI summarization/classification job
        // Comment out the next line if you want to disable AI jobs
        // await aiQueue.add('summarize', {
        //     fileId: fileDoc._id.toString(),
        //     s3Key: fileDoc.path,
        //     mimeType: fileDoc.mimeType,
        //     originalname: fileDoc.name
        // });

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
        const updatedFileData = await Promise.all(
            files.map(async (file) => {
                // 🛑 Skip signed URL generation for folders
                if (file.isFolder) {
                    return {
                        ...file._doc,
                        viewUrl: null,
                        downloadUrl: null,
                    };
                }

                // ✅ Generate signed URLs only for actual files
                const viewUrl = await getSignedUrlFromS3(file.path, 3600, 'inline', file.name);
                const downloadUrl = await getSignedUrlFromS3(file.path, 3600, 'attachment', file.name);

                return {
                    ...file._doc,
                    viewUrl,
                    downloadUrl,
                };
            })
        );
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
        const user = await User.findById(userId);

        user.storageUsed -= fileDoc.size;
        await user.save();

        return res.status(200).json({
            message: 'File deleted successfully',
            data: deletedUser
        });
    } catch (error) {

    }
}

export const upgradePlanCheck = async (req, res) => {
    try {
        const userId = req.user.id;
        const { newTier } = req.body;

        const tierLimits = {
            "Free": 5 * 1024 * 1024,          // 5MB
            "Pro": 100 * 1024 * 1024,         // 100MB
            "Team": 1024 * 1024 * 1024,       // 1GB
            "Enterprise": 5 * 1024 * 1024 * 1024 // 5GB
        };

        if (!tierLimits[newTier]) {
            return res.status(400).json({ message: 'Invalid tier' });
        }

        const user = await User.findById(userId);
        const newLimit = tierLimits[newTier];

        // Prevent downgrade if over limit
        if (user.storageUsed > newLimit) {
            return res.status(400).json({
                message: `Cannot downgrade to ${newTier} plan. You're currently using ${formatBytes(user.storageUsed)} and the limit is ${formatBytes(newLimit)}. Please delete some files first.`
            });
        }

        return res.status(200).json({ message: '' });
    } catch (error) {
        return res.status(500).json({ message: 'Plan update failed', error: error.message });
    }
};


export const createFolder = async (req, res) => {
    try {
        const { name, parentFolderId } = req.body;
        const userId = req.user.id;

        // Find parent folder to determine path
        let applicationPath = 'fiLes';
        if (parentFolderId) {
            const parent = await File.findById(parentFolderId);
            if (!parent || !parent.isFolder) {
                return res.status(400).json({ message: "Invalid parent folder." });
            }
            applicationPath = `${parent.applicationPath}/${parent.name}`;
        }

        // const existing = await File.findOne({ ownerId: userId, name: originalname, folderId: folderId || null });
        // if (existing) {
        //     return res.status(400).json({ message: 'A file with this name already exists in this folder.' });
        // }

        const folderDoc = await File.create({
            ownerId: userId,
            name,
            isFolder: true,
            folderId: parentFolderId || null,
            applicationPath
        });

        return res.status(201).json({ message: "Folder created successfully", data: folderDoc });
    } catch (error) {
        return res.status(500).json({ message: "Failed to create folder", error: error.message });
    }
};

// POST /files/folders
// export const createFolder = async (req, res) => {
//     try {
//         const userId = req.user.id;
//         const { name } = req.body;

//         const newFolder = await File.create({
//             ownerId: userId,
//             name,
//             isFolder: true,
//             applicationPath: "fiLes"
//         });

//         return res.status(201).json({ message: "Folder created", data: newFolder });
//     } catch (error) {
//         return res.status(500).json({ message: "Failed to create folder", error: error.message });
//     }
// };

// PATCH /files/folders/:id
export const renameFolder = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;
        const { name } = req.body;

        const folder = await File.findById(id);
        if (!folder || !folder.isFolder) {
            return res.status(404).json({ message: "Folder not found" });
        }

        folder.name = name;
        await folder.save();

        return res.status(200).json({ message: "Folder renamed", data: folder });
    } catch (error) {
        return res.status(500).json({ message: "Failed to rename folder", error: error.message });
    }
};

export const deleteFolder = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;

        const folder = await File.findById(id);
        if (!folder || !folder.isFolder) {
            return res.status(404).json({ message: "Folder not found" });
        }

        await File.findByIdAndDelete(id);
        return res.status(200).json({ message: "Folder Deleted Successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Failed to delete folder", error: error.message });
    }
};