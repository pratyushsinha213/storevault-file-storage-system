import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        enum: ['file', 'folder'],
        default: 'file'
    },
    name: {
        type: String,
        required: true
    },
    isFolder: {
        type: Boolean,
        default: false
    },
    path: {
        type: String,
        required: function () {
            return !this.isFolder; // folders don’t need S3 path
        }
    },
    applicationPath: {
        type: String // e.g., "fiLes/documents/personal"
    },
    size: {
        type: Number,
        required: function () {
            return !this.isFolder;
        },
        default: 0
    },
    mimeType: {
        type: String,
        required: function () {
            return !this.isFolder;
        }
    },
    folderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'File',
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