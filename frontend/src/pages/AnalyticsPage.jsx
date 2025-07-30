// NEW ENHANCED DESIGN
import React, { useEffect, useState } from 'react';
import useAnalyticsStore from '@/store/useAnalyticsStore';
import {
    Card, CardHeader, CardTitle, CardDescription, CardContent
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend,
    BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';
import { AnimatedGridPattern } from '@/components/magicui/animated-grid-pattern';
import { cn } from '@/lib/utils';
import { 
    TrendingUp, 
    HardDrive, 
    Upload, 
    FileText, 
    Calendar, 
    Activity, 
    Download,
    BarChart3,
    PieChart as PieChartIcon,
    RefreshCw,
    ArrowUpRight,
    ArrowDownRight
} from 'lucide-react';
import formatBytes from '@/utils/formatBytes';

const AnalyticsPage = () => {
    const {
        fetchAnalytics,
        storageStats,
        uploadStats,
        topFileStats,
        fileTypeStats,
        loading,
        error
    } = useAnalyticsStore();

    const [timeRange, setTimeRange] = useState('30');
    const [chartType, setChartType] = useState('line');

    useEffect(() => {
        fetchAnalytics(parseInt(timeRange), 10);
    }, [fetchAnalytics, timeRange]);

    const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

    const getStoragePercentage = () => {
        if (!storageStats?.storageUsed || !storageStats?.storageLimit) return 0;
        return Math.round((storageStats.storageUsed / storageStats.storageLimit) * 100);
    };

    const getUploadTrend = () => {
        if (!uploadStats || uploadStats.length < 2) return { trend: 'neutral', percentage: 0 };
        const recent = uploadStats.slice(-7);
        const previous = uploadStats.slice(-14, -7);
        const recentAvg = recent.reduce((sum, day) => sum + day.count, 0) / recent.length;
        const previousAvg = previous.reduce((sum, day) => sum + day.count, 0) / previous.length;
        const percentage = Math.round(((recentAvg - previousAvg) / previousAvg) * 100);
        return { trend: percentage > 0 ? 'up' : 'down', percentage: Math.abs(percentage) };
    };

    const uploadTrend = getUploadTrend();

    return (
        <div className="min-h-screen text-white bg-black">
            <AnimatedGridPattern
                numSquares={30}
                maxOpacity={0.1}
                duration={3}
                repeatDelay={1}
                className={cn(
                    "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
                    "inset-x-0 inset-y-[-30%] min-h-screen skew-y-12"
                )}
            />

            {/* Enhanced Header */}
            <div className="relative z-10 px-6 py-8 border-b border-zinc-800/50 bg-zinc-900/50 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600">
                                <BarChart3 className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-transparent bg-gradient-to-r from-white to-zinc-300 bg-clip-text">
                                    Analytics Dashboard
                                </h1>
                                <p className="text-sm text-zinc-400">Comprehensive insights into your storage and usage patterns</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button
                            variant="outline"
                            size="sm"
                            className="border-zinc-700 text-zinc-400 hover:bg-zinc-800"
                            onClick={() => fetchAnalytics(parseInt(timeRange), 10)}
                            disabled={loading}
                        >
                            <RefreshCw className={cn("w-4 h-4 mr-2", loading && "animate-spin")} />
                            Refresh
                        </Button>
                    </div>
                </div>
            </div>

            <div className="relative z-10 px-6 py-8 space-y-8">
                {/* Error Handling */}
                {error && (
                    <Card className="border-red-500/50 bg-red-950/50 backdrop-blur-sm">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-3 text-red-300">
                                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                                <p>Error: {error}</p>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Time Range Selector */}
                <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-zinc-400">Time Range:</span>
                    <div className="flex gap-2">
                        {['7', '30', '90'].map((days) => (
                            <Button
                                key={days}
                                variant={timeRange === days ? "default" : "outline"}
                                size="sm"
                                onClick={() => setTimeRange(days)}
                                className={cn(
                                    timeRange === days 
                                        ? "bg-blue-600 hover:bg-blue-700" 
                                        : "border-zinc-700 text-zinc-400 hover:bg-zinc-800"
                                )}
                            >
                                {days} days
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Key Metrics Cards */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <Card className="transition-all duration-300 border-zinc-800 bg-zinc-900/50 backdrop-blur-sm hover:bg-zinc-900/70">
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <div className="p-2 rounded-lg bg-blue-500/20">
                                    <HardDrive className="w-5 h-5 text-blue-400" />
                                </div>
                                <Badge variant="outline" className="border-zinc-600 text-zinc-400">
                                    {getStoragePercentage()}% used
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <p className="text-2xl font-bold">
                                    {loading ? (
                                        <Skeleton className="w-24 h-8" />
                                    ) : (
                                        formatBytes(storageStats?.storageUsed || 0)
                                    )}
                                </p>
                                <p className="text-sm text-zinc-400">Storage Used</p>
                                <div className="w-full h-2 rounded-full bg-zinc-800">
                                    <div 
                                        className="h-2 transition-all duration-500 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"
                                        style={{ width: `${getStoragePercentage()}%` }}
                                    ></div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="transition-all duration-300 border-zinc-800 bg-zinc-900/50 backdrop-blur-sm hover:bg-zinc-900/70">
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <div className="p-2 rounded-lg bg-green-500/20">
                                    <Upload className="w-5 h-5 text-green-400" />
                                </div>
                                <div className="flex items-center gap-1">
                                    {uploadTrend.trend === 'up' ? (
                                        <ArrowUpRight className="w-4 h-4 text-green-400" />
                                    ) : (
                                        <ArrowDownRight className="w-4 h-4 text-red-400" />
                                    )}
                                    <Badge variant="outline" className={cn(
                                        "text-xs",
                                        uploadTrend.trend === 'up' 
                                            ? "border-green-500/30 text-green-400" 
                                            : "border-red-500/30 text-red-400"
                                    )}>
                                        {uploadTrend.percentage}%
                                    </Badge>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <p className="text-2xl font-bold">
                                    {loading ? (
                                        <Skeleton className="w-24 h-8" />
                                    ) : (
                                        uploadStats?.reduce((sum, day) => sum + day.count, 0) || 0
                                    )}
                                </p>
                                <p className="text-sm text-zinc-400">Files Uploaded</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="transition-all duration-300 border-zinc-800 bg-zinc-900/50 backdrop-blur-sm hover:bg-zinc-900/70">
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <div className="p-2 rounded-lg bg-purple-500/20">
                                    <FileText className="w-5 h-5 text-purple-400" />
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <p className="text-2xl font-bold">
                                    {loading ? (
                                        <Skeleton className="w-24 h-8" />
                                    ) : (
                                        fileTypeStats?.length || 0
                                    )}
                                </p>
                                <p className="text-sm text-zinc-400">File Types</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="transition-all duration-300 border-zinc-800 bg-zinc-900/50 backdrop-blur-sm hover:bg-zinc-900/70">
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <div className="p-2 rounded-lg bg-orange-500/20">
                                    <Activity className="w-5 h-5 text-orange-400" />
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <p className="text-2xl font-bold">
                                    {loading ? (
                                        <Skeleton className="w-24 h-8" />
                                    ) : (
                                        formatBytes(uploadStats?.reduce((sum, day) => sum + day.totalSize, 0) || 0)
                                    )}
                                </p>
                                <p className="text-sm text-zinc-400">Total Uploaded</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Chart Type Selector */}
                <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-zinc-400">Chart Type:</span>
                    <div className="flex gap-2">
                        <Button
                            variant={chartType === 'line' ? "default" : "outline"}
                            size="sm"
                            onClick={() => setChartType('line')}
                            className={cn(
                                chartType === 'line' 
                                    ? "bg-blue-600 hover:bg-blue-700" 
                                    : "border-zinc-700 text-zinc-400 hover:bg-zinc-800"
                            )}
                        >
                            <TrendingUp className="w-4 h-4 mr-2" />
                            Line
                        </Button>
                        <Button
                            variant={chartType === 'bar' ? "default" : "outline"}
                            size="sm"
                            onClick={() => setChartType('bar')}
                            className={cn(
                                chartType === 'bar' 
                                    ? "bg-blue-600 hover:bg-blue-700" 
                                    : "border-zinc-700 text-zinc-400 hover:bg-zinc-800"
                            )}
                        >
                            <BarChart3 className="w-4 h-4 mr-2" />
                            Bar
                        </Button>
                    </div>
                </div>

                {/* Upload Activity Chart */}
                <Card className="border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-blue-400" />
                            <CardTitle className="text-xl">Upload Activity</CardTitle>
                        </div>
                        <CardDescription>Daily upload patterns over the last {timeRange} days</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[400px]">
                        {loading ? (
                            <Skeleton className="w-full h-full" />
                        ) : (
                            <ResponsiveContainer width="100%" height="100%">
                                {chartType === 'line' ? (
                                    <LineChart data={uploadStats}>
                                        <CartesianGrid stroke="#333" strokeDasharray="3 3" />
                                        <XAxis 
                                            dataKey="_id" 
                                            stroke="#ccc" 
                                            fontSize={12}
                                            tickLine={false}
                                        />
                                        <YAxis 
                                            stroke="#ccc" 
                                            fontSize={12}
                                            tickLine={false}
                                        />
                                        <Tooltip 
                                            contentStyle={{
                                                backgroundColor: '#1f2937',
                                                border: '1px solid #374151',
                                                borderRadius: '8px',
                                                color: '#fff'
                                            }}
                                        />
                                        <Legend />
                                        <Line 
                                            type="monotone" 
                                            dataKey="count" 
                                            stroke="#3b82f6" 
                                            strokeWidth={3}
                                            name="Files" 
                                            dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                                        />
                                        <Line 
                                            type="monotone" 
                                            dataKey="totalSize" 
                                            stroke="#10b981" 
                                            strokeWidth={3}
                                            name="Size (MB)" 
                                            dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                                        />
                                    </LineChart>
                                ) : (
                                    <BarChart data={uploadStats}>
                                        <CartesianGrid stroke="#333" strokeDasharray="3 3" />
                                        <XAxis 
                                            dataKey="_id" 
                                            stroke="#ccc" 
                                            fontSize={12}
                                            tickLine={false}
                                        />
                                        <YAxis 
                                            stroke="#ccc" 
                                            fontSize={12}
                                            tickLine={false}
                                        />
                                        <Tooltip 
                                            contentStyle={{
                                                backgroundColor: '#1f2937',
                                                border: '1px solid #374151',
                                                borderRadius: '8px',
                                                color: '#fff'
                                            }}
                                        />
                                        <Legend />
                                        <Bar dataKey="count" fill="#3b82f6" name="Files" radius={[4, 4, 0, 0]} />
                                        <Bar dataKey="totalSize" fill="#10b981" name="Size (MB)" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                )}
                            </ResponsiveContainer>
                        )}
                    </CardContent>
                </Card>

                {/* File Types and Top Files */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* File Types Distribution */}
                    <Card className="border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <PieChartIcon className="w-5 h-5 text-purple-400" />
                                <CardTitle className="text-xl">File Types</CardTitle>
                            </div>
                            <CardDescription>Distribution of uploaded file types</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {loading ? (
                                <Skeleton className="w-full h-64" />
                            ) : (
                                <div className="space-y-4">
                                    <div className="h-48">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={fileTypeStats}
                                                    cx="50%"
                                                    cy="50%"
                                                    labelLine={false}
                                                    label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                                                    outerRadius={80}
                                                    fill="#8884d8"
                                                    dataKey="count"
                                                >
                                                    {fileTypeStats.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                    ))}
                                                </Pie>
                                                <Tooltip 
                                                    contentStyle={{
                                                        backgroundColor: '#1f2937',
                                                        border: '1px solid #374151',
                                                        borderRadius: '8px',
                                                        color: '#fff'
                                                    }}
                                                />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                    <div className="space-y-2">
                                        {fileTypeStats.map((type, index) => (
                                            <div key={type._id} className="flex items-center justify-between p-3 rounded-lg bg-zinc-800/50">
                                                <div className="flex items-center gap-3">
                                                    <div 
                                                        className="w-3 h-3 rounded-full"
                                                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                                    ></div>
                                                    <span className="font-medium capitalize">{type._id || "unknown"}</span>
                                                </div>
                                                <Badge variant="secondary" className="text-blue-400 bg-blue-500/20 border-blue-500/30">
                                                    {type.count} files
                                                </Badge>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Top Files */}
                    <Card className="border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <Download className="w-5 h-5 text-orange-400" />
                                <CardTitle className="text-xl">Top Files</CardTitle>
                            </div>
                            <CardDescription>Largest files by size</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {loading ? (
                                <Skeleton className="w-full h-64" />
                            ) : (
                                <div className="space-y-3">
                                    {topFileStats.map((file, index) => (
                                        <div key={file._id} className="flex items-center justify-between p-4 transition-colors rounded-xl bg-zinc-800/50 hover:bg-zinc-800/70">
                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center justify-center w-10 h-10 font-bold text-white rounded-lg bg-gradient-to-br from-orange-500 to-red-500">
                                                    {index + 1}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    {/* <p className="font-semibold truncate text-zinc-200">{file.name}</p> */}
                                                    <p className="font-semibold truncate text-zinc-200">
                                                        {file.name.length > 20 ? `${file.name.slice(0, 20)}...` : file.name}
                                                    </p>
                                                    <p className="text-sm text-zinc-500">{file.mimeType}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-semibold text-zinc-200">
                                                    {formatBytes(file.size)}
                                                </p>
                                                <p className="text-xs text-zinc-500">
                                                    {(file.size / (1024 ** 2)).toFixed(2)} MB
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsPage;