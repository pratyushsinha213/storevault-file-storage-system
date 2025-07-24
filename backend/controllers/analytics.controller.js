import Analytics from '../models/Analytics.js';
import redis from '../services/redisClient.js';

export const trackAnalytics = async (req, res) => {
    try {
        const { userId, event, page, timestamp, ip, geo, device, os, browser, meta } = req.body;
        if (!event || !page) {
            return res.status(400).json({ message: 'Missing required fields: event, page' });
        }
        // Save event to MongoDB
        const analyticsDoc = await Analytics.create({
            userId,
            event,
            page,
            timestamp: timestamp ? new Date(timestamp) : undefined,
            ip: ip || req.ip,
            geo,
            device,
            os,
            browser,
            meta
        });
        // Increment real-time counters in Redis
        await redis.incr(`analytics:pageviews:${page}`);
        if (userId) {
            await redis.set(`analytics:activeuser:${userId}`, '1', 'EX', 300); // 5 min expiry
        }
        return res.status(201).json({ message: 'Analytics event tracked', data: analyticsDoc });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to track analytics event', error: error.message });
    }
};

export const getRealtimeStats = async (req, res) => {
    try {
        // Get all page view counters
        const keys = await redis.keys('analytics:pageviews:*');
        const pageViews = {};
        for (const key of keys) {
            const page = key.replace('analytics:pageviews:', '');
            pageViews[page] = parseInt(await redis.get(key) || '0', 10);
        }
        // Get all active users
        const activeUserKeys = await redis.keys('analytics:activeuser:*');
        const activeUsers = activeUserKeys.length;
        return res.status(200).json({
            message: 'Real-time analytics stats',
            data: {
                pageViews,
                activeUsers
            }
        });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to get real-time stats', error: error.message });
    }
};

export const getDailyStats = async (req, res) => {
    try {
        // Aggregate daily page views and unique users
        const pipeline = [
            {
                $match: {
                    event: 'page_view',
                }
            },
            {
                $group: {
                    _id: {
                        date: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
                        userId: "$userId"
                    },
                    count: { $sum: 1 }
                }
            },
            {
                $group: {
                    _id: "$_id.date",
                    pageViews: { $sum: "$count" },
                    uniqueUsers: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ];
        const results = await Analytics.aggregate(pipeline);
        return res.status(200).json({
            message: 'Daily analytics stats',
            data: results
        });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to get daily stats', error: error.message });
    }
};

export const getTopPages = async (req, res) => {
    try {
        // Aggregate top 10 most visited pages
        const pipeline = [
            {
                $match: {
                    event: 'page_view',
                }
            },
            {
                $group: {
                    _id: "$page",
                    count: { $sum: 1 }
                }
            },
            { $sort: { count: -1 } },
            { $limit: 10 }
        ];
        const results = await Analytics.aggregate(pipeline);
        return res.status(200).json({
            message: 'Top pages',
            data: results
        });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to get top pages', error: error.message });
    }
};
