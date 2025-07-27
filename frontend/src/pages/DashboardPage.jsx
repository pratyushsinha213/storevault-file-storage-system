import { cn } from '@/lib/utils';
import React, { useEffect, useState } from 'react';
import { FileText, MessageSquare, Database, ShieldCheck, Cloud, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import useAuthStore from '@/store/useAuthStore';
import formatBytes from '@/utils/formatBytes';
import { Progress } from '@/components/ui/progress';
import progressBar from '@/utils/progressBar';
import { useNavigate } from 'react-router-dom';
import { getInitialsFromName } from '@/utils/getInitialsFromName';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { NumberTicker } from '@/components/magicui/number-ticker';
import { AnimatedGridPattern } from '@/components/magicui/animated-grid-pattern';

const mockUser = {
    lastLogin: '2 hours ago',
};

const mockActivities = [
    { type: 'File', text: 'Uploaded project.pdf', time: '2 mins ago' },
    { type: 'Chat', text: 'Asked "What is Redis?"', time: '12 mins ago' },
    { type: 'Login', text: 'Signed in', time: '1 hour ago' },
];


const DashboardPage = () => {

    const { getProfileDetails, details } = useAuthStore();
    const [search, setSearch] = useState("");

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
        { icon: FileText, label: 'Files Uploaded', value: <>{userFileDetails?.length && <NumberTicker value={userFileDetails?.length} />}</>, action: 'View Files', url: "/files" },
        { icon: MessageSquare, label: 'AI Prompts Used', value: 23, action: 'Go to Chat', url: "/ai-assistant" },
        // { icon: Database, label: 'Storage Used', value: `${formatBytes(totalSize)}/${formatBytes(userDetails?.storageLimit)}`, progressBar: <Progress className={`mt-2`} value={progressBar(totalSize, userDetails?.storageLimit)} />, percentage: `${Math.round((totalSize / userDetails?.storageLimit) * 100)}`, action: 'Upgrade', url: "/upgrade-plan" },
        {
            icon: Database, label: 'Storage Used', value: <>
                <NumberTicker
                    decimalPlaces={2}
                    value={parseFloat(formatBytes(totalSize).split(" ")[0])}
                /> {`${formatBytes(totalSize).split(" ")[1]}`}
                {" / "}
                {userDetails?.storageLimit ? (
                    <>
                        <NumberTicker
                            decimalPlaces={0}
                            value={parseFloat(formatBytes(userDetails.storageLimit).split(" ")[0])}
                        />{" "}
                        {formatBytes(userDetails.storageLimit).split(" ")[1]}
                    </>
                ) : (
                    "Loading..."
                )}
            </>, progressBar: <Progress className={`mt-2`} value={progressBar(totalSize, userDetails?.storageLimit)} />, percentage: `${Math.round((totalSize / userDetails?.storageLimit) * 100)}`, action: 'Upgrade', url: "/upgrade-plan"
        },
        { icon: Cloud, label: 'Account Storage Tier', value: `${userDetails?.storageTier} Plan`, action: 'More Info', url: "/upgrade-plan" },
    ];

    const navigate = useNavigate();

    return (
        <div className="min-h-screen p-6 text-white bg-black">
            <AnimatedGridPattern
                numSquares={30}
                maxOpacity={0.1}
                duration={3}
                repeatDelay={1}
                className={cn(
                    "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
                    "inset-x-0 inset-y-[-30%] min-h-screen skew-y-12",)}
            />
            {/* Header */}
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-zinc-800">
                <div>
                    <h1 className="text-2xl font-semibold">Welcome back, {userDetails?.fullName} 👋</h1>
                    <p className="text-sm text-zinc-400">You last signed in {mockUser.lastLogin}</p>
                </div>
                {userDetails?.fullName && (
                    <Avatar className="w-8 h-8 rounded-lg">
                        <AvatarImage src={userDetails?.image} alt={userDetails?.fullName} />
                        <AvatarFallback className="rounded-lg">{getInitialsFromName(userDetails?.fullName)}</AvatarFallback>
                    </Avatar>
                )}
            </div>

            <div className="relative flex items-center w-full mb-4">
                <Search className="absolute left-3 size-5 text-zinc-400" />
                <Input
                    type="text"
                    placeholder="Search files..."
                    className="w-full py-2 pl-10 pr-4 text-sm text-white transition rounded-lg bg-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
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
                <h2 className="mb-6 text-2xl font-bold text-zinc-200">Quick Actions</h2>

                <div className="grid grid-cols-1 gap-6 mb-12 md:grid-cols-2 lg:grid-cols-4">
                    {[
                        { icon: "🚀", label: "Upload New File", url: "/files" },
                        { icon: "💬", label: "Start New AI Chat", url: "/ai-assistant" },
                        { icon: "🧾", label: "View File History", url: "/files" },
                        { icon: "⚙️", label: "Go to Settings", url: "/settings" },
                    ].map((action, idx) => (
                        <Button
                            key={idx}
                            className="flex flex-col items-center justify-center h-24 px-6 py-4 text-lg transition-all shadow-md rounded-xl bg-zinc-800 hover:bg-zinc-700"
                            variant="ghost"
                            onClick={() => navigate(action.url)}
                        >
                            <span className="mb-2 text-3xl">{action.icon}</span>
                            <span className="font-medium text-zinc-200">{action.label}</span>
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DashboardPage