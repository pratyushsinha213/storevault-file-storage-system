import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid, Legend } from 'recharts';

const AnalyticsPage = () => {
    const [realtime, setRealtime] = useState(null);
    const [dailyStats, setDailyStats] = useState([]);
    const [topPages, setTopPages] = useState([]);

    useEffect(() => {
        fetchAllAnalytics();
    }, []);

    const fetchAllAnalytics = async () => {
        try {
            const [real, daily, top] = await Promise.all([
                axios.get('/analytics/realtime'),
                axios.get('/analytics/daily'),
                axios.get('/analytics/top-pages')
            ]);
            setRealtime(real.data.data);
            setDailyStats(daily.data.data);
            setTopPages(top.data.data);
        } catch (error) {
            console.error("Failed to load analytics:", error);
        }
    };

    return (
        <div className="min-h-screen p-6 text-white bg-zinc-950">
            <h1 className="mb-4 text-2xl font-bold">📊 Analytics Dashboard</h1>

            {/* Realtime Stats */}
            <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 md:grid-cols-3">
                <div className="p-4 border rounded-lg bg-zinc-900 border-zinc-800">
                    <h2 className="mb-1 text-lg font-semibold">🔄 Active Users</h2>
                    <p className="text-3xl font-bold">{realtime?.activeUsers ?? 0}</p>
                </div>
                {realtime?.pageViews &&
                    Object.entries(realtime?.pageViews).map(([page, count]) => (
                        <div key={page} className="p-4 border rounded-lg bg-zinc-900 border-zinc-800">
                            <h2 className="text-lg font-semibold truncate">📄 {page}</h2>
                            <p className="text-3xl font-bold">{count}</p>
                        </div>
                    ))}
            </div>

            {/* Daily Trends Chart */}
            <div className="p-4 mb-6 border rounded-lg bg-zinc-900 border-zinc-800">
                <h2 className="mb-3 text-lg font-semibold">📅 Daily Trends</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={dailyStats}>
                        <XAxis dataKey="_id" stroke="#ccc" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <CartesianGrid stroke="#333" />
                        <Line type="monotone" dataKey="pageViews" stroke="#3b82f6" name="Page Views" />
                        <Line type="monotone" dataKey="uniqueUsers" stroke="#22c55e" name="Unique Users" />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Top Pages */}
            <div className="p-4 border rounded-lg bg-zinc-900 border-zinc-800">
                <h2 className="mb-3 text-lg font-semibold">🏆 Top 10 Pages</h2>
                <ul className="divide-y divide-zinc-800">
                    {topPages?.map((item, index) => (
                        <li key={item._id} className="flex justify-between py-2">
                            <span className="truncate">{index + 1}. {item._id}</span>
                            <span className="text-blue-400">{item.count} views</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AnalyticsPage;