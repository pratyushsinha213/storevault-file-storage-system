import multer from 'multer';

const storage = multer.memoryStorage(); // We'll upload to S3 directly from memory

// 20MB file size limit
const MAX_SIZE = 20 * 1024 * 1024;

const allowedMimeTypes = [
    'application/pdf',
    'image/png',
    'image/jpeg'
];

const upload = multer({
    storage,
    limits: {
        fileSize: MAX_SIZE
    },
    fileFilter: (req, file, cb) => {
        // Only allow PDF files
        if (allowedMimeTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            const error = new Error('Only PDF, PNG, and JPEG files are allowed!');
            error.status = 400;
            cb(error);
        }
    }
});

export default upload; 