import React, { useEffect } from 'react';
import { FileText, MessageSquare, Database, ShieldCheck, Cloud } from 'lucide-react';
import { Button } from '@/components/ui/button';
import useAuthStore from '@/store/useAuthStore';
import formatBytes from '@/utils/formatBytes';
import { Progress } from '@/components/ui/progress';
import progressBar from '@/utils/progressBar';
import { useNavigate } from 'react-router-dom';

const mockUser = {
    avatar: 'https://avatars.githubusercontent.com/u/12345678?v=4',
    lastLogin: '2 hours ago',
};

const mockActivities = [
    { type: 'File', text: 'Uploaded project.pdf', time: '2 mins ago' },
    { type: 'Chat', text: 'Asked "What is Redis?"', time: '12 mins ago' },
    { type: 'Login', text: 'Signed in', time: '1 hour ago' },
];


const DashboardPage = () => {

    const { getProfileDetails, details } = useAuthStore();

    useEffect(() => {
        getProfileDetails();
    }, [getProfileDetails]);

    const userDetails = details?.user;
    const userFileDetails = details?.files;

    let totalSize = 0
    userFileDetails?.forEach(file => {
        totalSize += file.size;
    });


    const stats = [
        { icon: FileText, label: 'Files Uploaded', value: userFileDetails?.length, action: 'View Files', url: "/files" },
        { icon: MessageSquare, label: 'AI Prompts Used', value: 23, action: 'Go to Chat', url: "/ai-assistant" },
        { icon: Database, label: 'Storage Used', value: `${formatBytes(totalSize)}/${formatBytes(userDetails?.storageLimit)}`, progressBar: <Progress className={`mt-2`} value={progressBar(totalSize, userDetails?.storageLimit)} />, percentage: `${Math.round((totalSize / userDetails?.storageLimit) * 100).toFixed(2)}`, action: 'Upgrade', url: "/upgrade-plan" },
        { icon: Cloud, label: 'Account Storage Tier', value: `${userDetails?.storageTier} Plan`, action: 'More Info', url: "/upgrade-plan" },
    ];

    const navigate = useNavigate();

    return (
        <div className="min-h-screen p-6 text-white bg-black">
            {/* Header */}
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-zinc-800">
                <div>
                    <h1 className="text-2xl font-semibold">Welcome back, {userDetails?.fullName} 👋</h1>
                    <p className="text-sm text-zinc-400">You last signed in {mockUser.lastLogin}</p>
                </div>
                <img src={mockUser.avatar} className="w-12 h-12 border rounded-full border-zinc-700" alt="avatar" />
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-4 mb-8 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, idx) => (
                    <div key={idx} className="p-4 transition border rounded-xl bg-zinc-900 border-zinc-800 hover:shadow-md">
                        <stat.icon className="w-6 h-6 mb-2 text-blue-400" />
                        <p className="text-sm text-zinc-400">{stat.label}</p>
                        <h2 className="text-xl font-semibold">{stat.value}</h2>
                        {stat.progressBar ? stat.progressBar : null} {stat.percentage ? `${stat.percentage}%` : null}
                        <Button
                            onClick={() => navigate(stat.url)}
                            variant="ghost" size="sm" className="mt-2 text-blue-400 hover:underline"
                        >
                            {stat.action}
                        </Button>
                    </div>
                ))}
            </div>

            {/* Recent Activity */}
            <div className="mb-8">
                <h2 className="mb-4 text-lg font-semibold text-zinc-300">Recent Activity</h2>
                <ul className="space-y-2">
                    {mockActivities.map((activity, idx) => (
                        <li
                            key={idx}
                            className="flex items-center justify-between px-4 py-3 transition border rounded-lg bg-zinc-900 border-zinc-800 hover:bg-zinc-800"
                        >
                            <div>
                                <p className="text-sm font-medium text-zinc-200">{activity.text}</p>
                                <span className="text-xs text-zinc-500">{activity.time}</span>
                            </div>
                            <span className="px-2 py-1 text-xs font-medium rounded bg-zinc-800 text-zinc-400">
                                {activity.type}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Quick Actions */}
            <div>
                <h2 className="mb-4 text-lg font-semibold text-zinc-300">Quick Actions</h2>
                <div className="flex flex-wrap gap-4">
                    <Button variant="default">🚀 Upload New File</Button>
                    <Button variant="secondary">💬 Start New AI Chat</Button>
                    <Button variant="outline">🧾 View File History</Button>
                    <Button variant="ghost">⚙️ Go to Settings</Button>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage