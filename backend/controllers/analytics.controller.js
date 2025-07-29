import Analytics from '../models/Analytics.js';
// import redis from '../services/redisClient.js';

import File from "../models/File.js";
import User from "../models/User.js";
import mongoose from "mongoose";

// 1. GET /analytics/storage
export const getStorageUsage = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("storageUsed storageLimit");

        const storageStats = {
            storageUsed: user.storageUsed,
            storageLimit: user.storageLimit,
        }

        res.status(200).json({
            data: storageStats
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to get storage stats", error: error.message });
    }
};

// 2. GET /analytics/uploads?range=30
export const getUploadActivity = async (req, res) => {
    try {
        const userId = req.user.id;
        const rangeInDays = parseInt(req.query.range);
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - rangeInDays);

        const uploads = await File.aggregate([
            {
                $match: {
                    ownerId: new mongoose.Types.ObjectId(userId),
                    createdAt: { $gte: startDate },
                    isFolder: { $ne: true }
                }
            },
            {
                $group: {
                    _id: {
                        $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
                    },
                    totalSize: { $sum: "$size" },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]);

        res.status(200).json({ data: uploads });
    } catch (error) {
        res.status(500).json({ message: "Failed to get upload history", error: error.message });
    }
};

// 3. GET /analytics/file-types
export const getFileTypeDistribution = async (req, res) => {
    try {
        const userId = req.user.id;
        const fileTypes = await File.aggregate([
            {
                $match: {
                    ownerId: new mongoose.Types.ObjectId(userId),
                    isFolder: { $ne: true }
                }
            },
            {
                $group: {
                    _id: "$mimeType",
                    count: { $sum: 1 },
                    totalSize: { $sum: "$size" }
                }
            },
            {
                $sort: { totalSize: -1 }
            }
        ]);

        res.status(200).json({ data: fileTypes });
    } catch (error) {
        res.status(500).json({ message: "Failed to get file type stats", error: error.message });
    }
};

// 4. GET /analytics/top-files?limit=5
export const getTopFiles = async (req, res) => {
    try {
        const userId = req.user.id;
        const limit = parseInt(req.query.limit) || 5;

        const topFiles = await File.find({
            ownerId: userId,
            isFolder: { $ne: true }
        })
            .sort({ size: -1 })
            .limit(limit)
            .select("name size mimeType createdAt");

        res.status(200).json({ data: topFiles });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch top files", error: error.message });
    }
};