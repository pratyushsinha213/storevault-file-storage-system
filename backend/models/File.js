import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true // S3 object key or full path
    },
    size: {
        type: Number,
        required: true
    },
    mimeType: {
        type: String,
        required: true
    },
    folderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'File', // For folder hierarchy (self-reference)
        default: null
    },
    version: {
        type: Number,
        default: 1
    },
    current: {
        type: Boolean,
        default: true
    },
    permissions: {
        visibility: {
            type: String,
            enum: ['private', 'public', 'shared'],
            default: 'private'
        },
        sharedWith: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }]
    }
}, {
    timestamps: true
});

const File = mongoose.model('File', fileSchema);
export default File;