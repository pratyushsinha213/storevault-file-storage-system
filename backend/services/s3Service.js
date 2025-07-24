import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import { AWS_S3_BUCKET_NAME, AWS_S3_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } from '../config/env.js';

const s3 = new S3Client({
    region: AWS_S3_REGION,
    credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY
    }
});

const bucketName = AWS_S3_BUCKET_NAME;

export const uploadToS3 = async (buffer, key, mimetype) => {
    const params = {
        Bucket: bucketName,
        Key: key,
        Body: buffer,
        ContentType: mimetype
    };
    try {
        const command = new PutObjectCommand(params);
        await s3.send(command);
        return key;
        // const url = await getSignedUrl(s3, command, { expiresIn: 3600 }); // 1 hour expiration
        // return url; // Return the S3 URL or key
    } catch (error) {
        throw new Error('S3 upload failed: ' + error.message);
    }
};

export const getSignedUrlFromS3 = async (key, expiresInSeconds = 900, disposition = 'attachment', filename = null) => {
    let contentDisposition = disposition;
    if (filename) {
        contentDisposition += `; filename=\"${filename}\"`;
    }
    const command = new GetObjectCommand({
        Bucket: bucketName,
        Key: key,
        ResponseContentDisposition: contentDisposition
    });
    try {
        const url = await getSignedUrl(s3, command, { expiresIn: expiresInSeconds });
        return url;
    } catch (error) {
        throw new Error('Failed to generate signed URL: ' + error.message);
    }
}; 

export const deleteFromS3 = async (key) => {
    const params = {
        Bucket: bucketName,
        Key: key,
    }
    try {
        const command = new DeleteObjectCommand(params);
        await s3.send(command);
    } catch (error) {
        
    }
}