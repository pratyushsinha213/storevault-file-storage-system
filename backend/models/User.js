import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    lastLoginAt: {
        type: Date,
        default: null,
    },
    // For tracking user activity
    isActive: {
        type: Boolean,
        default: true,
    },
    storageUsed: {
        type: Number, // in bytes
        default: 0,
    },
    storageLimit: {
        type: Number, // e.g., 5GB = 5 * 1024 * 1024 * 1024
        default: 5 * 1024 * 1024 * 1024,
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

export default User;