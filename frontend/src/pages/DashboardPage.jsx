import { cn } from '@/lib/utils';
import React, { useEffect, useState } from 'react';
import { FileText, MessageSquare, Database, ShieldCheck, Cloud, Search, TrendingUp, Clock, Activity } from 'lucide-react';
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const mockUser = {
    lastLogin: '2 hours ago',
};

const mockActivities = [
    { type: 'File', text: 'Uploaded project.pdf', time: '2 mins ago', icon: FileText, color: 'text-blue-400' },
    { type: 'Chat', text: 'Asked "What is Redis?"', time: '12 mins ago', icon: MessageSquare, color: 'text-green-400' },
    { type: 'Login', text: 'Signed in', time: '1 hour ago', icon: ShieldCheck, color: 'text-purple-400' },
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
        { 
            icon: FileText, 
            label: 'Files Uploaded', 
            value: <>{userFileDetails?.length && <NumberTicker value={userFileDetails?.length} />}</>, 
            action: 'View Files', 
            url: "/files",
            trend: '+12%',
            trendUp: true,
            color: 'text-blue-400',
            bgColor: 'bg-blue-400/10'
        },
        { 
            icon: MessageSquare, 
            label: 'AI Prompts Used', 
            value: 23, 
            action: 'Go to Chat', 
            url: "/ai-assistant",
            trend: '+8%',
            trendUp: true,
            color: 'text-green-400',
            bgColor: 'bg-green-400/10'
        },
        {
            icon: Database, 
            label: 'Storage Used', 
            value: <>
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
            </>, 
            progressBar: <Progress className={`mt-3`} value={progressBar(totalSize, userDetails?.storageLimit)} />, 
            percentage: `${Math.round((totalSize / userDetails?.storageLimit) * 100)}`, 
            action: 'Upgrade', 
            url: "/upgrade-plan",
            trend: `${Math.round((totalSize / userDetails?.storageLimit) * 100)}%`,
            trendUp: false,
            color: 'text-orange-400',
            bgColor: 'bg-orange-400/10'
        },
        { 
            icon: Cloud, 
            label: 'Account Storage Tier', 
            value: `${userDetails?.storageTier} Plan`, 
            action: 'More Info', 
            url: "/upgrade-plan",
            trend: 'Active',
            trendUp: true,
            color: 'text-purple-400',
            bgColor: 'bg-purple-400/10'
        },
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
            
            {/* Enhanced Header */}
            <div className="flex items-center justify-between pb-8 mb-8 border-b border-zinc-800/50">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold text-transparent bg-gradient-to-r from-white to-zinc-400 bg-clip-text">
                        Welcome back, {userDetails?.fullName} 👋
                    </h1>
                    <p className="flex items-center gap-2 text-sm text-zinc-400">
                        <Clock className="w-4 h-4" />
                        Last signed in {mockUser.lastLogin}
                    </p>
                </div>
                {userDetails?.fullName && (
                    <div className="flex items-center gap-3">
                        <Badge variant="secondary" className="text-green-400 bg-green-500/20 border-green-500/30">
                            <div className="w-2 h-2 mr-2 bg-green-400 rounded-full"></div>
                            Online
                        </Badge>
                        <Avatar className="w-10 h-10 rounded-xl ring-2 ring-zinc-700">
                            <AvatarImage src={userDetails?.image} alt={userDetails?.fullName} />
                            <AvatarFallback className="rounded-xl bg-zinc-800">{getInitialsFromName(userDetails?.fullName)}</AvatarFallback>
                        </Avatar>
                    </div>
                )}
            </div>

            {/* Enhanced Search */}
            <div className="relative mb-8">
                <Search className="absolute transform -translate-y-1/2 left-4 top-1/2 size-5 text-zinc-400 z-1" />
                <Input
                    type="text"
                    placeholder="Search files, activities, or settings..."
                    className="w-full py-3 pl-12 pr-4 text-sm text-white transition-all rounded-xl bg-zinc-900/50 border-zinc-700 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 backdrop-blur-sm"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* Enhanced Stats Grid */}
            <div className="grid grid-cols-1 gap-6 mb-10 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, idx) => (
                    <Card key={idx} className="relative overflow-hidden transition-all duration-300 group border-zinc-800 bg-zinc-900/50 backdrop-blur-sm hover:bg-zinc-900/70 hover:shadow-xl hover:shadow-primary/5">
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <div className={cn("p-2 rounded-lg", stat.bgColor)}>
                                    <stat.icon className={cn("w-5 h-5", stat.color)} />
                                </div>
                                <Badge variant="outline" className={cn("text-xs", stat.trendUp ? "border-green-500/30 text-green-400" : "border-orange-500/30 text-orange-400")}>
                                    <TrendingUp className={cn("w-3 h-3 mr-1", stat.trendUp ? "text-green-400" : "text-orange-400 rotate-180")} />
                                    {stat.trend}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div>
                                <CardDescription className="text-sm font-medium text-zinc-400">{stat.label}</CardDescription>
                                <CardTitle className="mt-1 text-2xl font-bold">{stat.value}</CardTitle>
                            </div>
                            {stat.progressBar && (
                                <div className="space-y-2">
                                    {stat.progressBar}
                                    <p className="text-xs text-zinc-500">{stat.percentage}% used</p>
                                </div>
                            )}
                            <Button
                                onClick={() => navigate(stat.url)}
                                variant="ghost" 
                                size="sm" 
                                className={cn("mt-2 text-sm font-medium transition-all", stat.color, "hover:bg-zinc-800/50")}
                            >
                                {stat.action} →
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Enhanced Recent Activity */}
            <Card className="mb-10 border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Activity className="w-5 h-5 text-blue-400" />
                        <CardTitle className="text-xl font-semibold">Recent Activity</CardTitle>
                    </div>
                    <CardDescription>Your latest actions and updates</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {mockActivities.map((activity, idx) => (
                            <div
                                key={idx}
                                className="flex items-center justify-between p-4 transition-all border rounded-xl bg-zinc-800/50 hover:bg-zinc-800/70 border-zinc-700/50"
                            >
                                <div className="flex items-center gap-3">
                                    <div className={cn("p-2 rounded-lg bg-zinc-700/50", activity.color)}>
                                        <activity.icon className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-zinc-200">{activity.text}</p>
                                        <p className="flex items-center gap-1 text-xs text-zinc-500">
                                            <Clock className="w-3 h-3" />
                                            {activity.time}
                                        </p>
                                    </div>
                                </div>
                                <Badge variant="outline" className="border-zinc-600 text-zinc-400">
                                    {activity.type}
                                </Badge>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Enhanced Quick Actions */}
            <div>
                <div className="flex items-center gap-2 mb-6">
                    <div className="w-1 h-6 rounded-full bg-gradient-to-b from-primary to-primary/50"></div>
                    <h2 className="text-2xl font-bold text-zinc-200">Quick Actions</h2>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {[
                        { icon: "🚀", label: "Upload New File", url: "/files", description: "Add files to your storage" },
                        { icon: "💬", label: "Start New AI Chat", url: "/ai-assistant", description: "Get AI assistance" },
                        { icon: "🧾", label: "View File History", url: "/files", description: "Check recent uploads" },
                        { icon: "⚙️", label: "Go to Settings", url: "/settings", description: "Manage your account" },
                    ].map((action, idx) => (
                        <Card
                            key={idx}
                            className="transition-all duration-300 cursor-pointer group border-zinc-800 bg-zinc-900/50 backdrop-blur-sm hover:bg-zinc-900/70 hover:shadow-xl hover:shadow-primary/5 hover:scale-105"
                            onClick={() => navigate(action.url)}
                        >
                            <CardContent className="p-6 text-center">
                                <span className="block mb-3 text-4xl transition-transform duration-300 group-hover:scale-110">{action.icon}</span>
                                <h3 className="mb-2 font-semibold text-zinc-200">{action.label}</h3>
                                <p className="text-xs text-zinc-500">{action.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DashboardPage