// NEW ENHANCED DESIGN
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { AnimatedGridPattern } from '@/components/magicui/animated-grid-pattern';
import { cn } from '@/lib/utils';
import { 
    Ghost, 
    Home, 
    Search, 
    ArrowLeft, 
    AlertTriangle,
    Compass,
    FileText,
    Zap
} from 'lucide-react';

const Custom404ErrorPage = () => {
    const navigate = useNavigate();

    const quickLinks = [
        { name: 'Dashboard', path: '/dashboard', icon: Home },
        { name: 'Files', path: '/files', icon: FileText },
        { name: 'Analytics', path: '/analytics', icon: Search },
        { name: 'AI Assistant', path: '/ai-assistant', icon: Zap }
    ];

    return (
        <div className="min-h-screen text-white bg-black">
            <AnimatedGridPattern
                numSquares={30}
                maxOpacity={0.1}
                duration={3}
                repeatDelay={1}
                className={cn(
                    "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
                    "absolute inset-0 -z-10"
                )}
            />

            <div className="flex flex-col items-center justify-center min-h-screen px-6 py-16">
                {/* 404 Animation */}
                <div className="relative mb-8">
                    <div className="p-8 border rounded-full bg-gradient-to-br from-red-500/20 to-orange-500/20 backdrop-blur-sm border-red-500/30">
                        <Ghost className="w-16 h-16 text-red-400 animate-bounce" />
                    </div>
                    <div className="absolute -top-4 -right-4">
                        <div className="p-3 rounded-full bg-gradient-to-br from-orange-400 to-red-500 animate-pulse">
                            <AlertTriangle className="w-6 h-6 text-white" />
                        </div>
                    </div>
                </div>

                {/* 404 Content */}
                <div className="max-w-2xl mx-auto space-y-6 text-center">
                    <div className="space-y-2">
                        <h1 className="font-bold text-transparent text-8xl bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text">
                            404
                        </h1>
                        <h2 className="text-3xl font-bold text-zinc-200">Page Not Found</h2>
                        <p className="text-xl text-zinc-400">
                            Oops! The page you're looking for doesn't exist
                        </p>
                    </div>

                    <Card className="border-red-500/30 bg-red-500/10 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="text-red-400">Lost in the Digital Void?</CardTitle>
                            <CardDescription className="text-zinc-300">
                                Don't worry, we'll help you find your way back
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="p-4 border rounded-lg bg-zinc-800/50 border-zinc-700">
                                <p className="text-zinc-300">
                                    The page you're looking for might have been moved, deleted, or never existed. 
                                    Check the URL for typos or try one of the links below.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                {quickLinks.map((link) => (
                                    <Button
                                        key={link.path}
                                        variant="outline"
                                        onClick={() => navigate(link.path)}
                                        className="justify-start h-auto p-4 text-left transition-all duration-200 border-zinc-700 hover:bg-zinc-800/50"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-lg bg-zinc-700/50">
                                                <link.icon className="w-4 h-4 text-zinc-400" />
                                            </div>
                                            <span className="text-sm font-medium text-zinc-300">{link.name}</span>
                                        </div>
                                    </Button>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                        <Button 
                            onClick={() => navigate('/')}
                            className="px-8 py-3 text-white transition-all duration-200 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl hover:scale-105"
                        >
                            <Home className="w-4 h-4 mr-2" />
                            Go Home
                        </Button>
                        
                        <Button 
                            variant="outline" 
                            onClick={() => navigate(-1)}
                            className="px-8 py-3 transition-all duration-200 border-zinc-700 text-zinc-300 hover:bg-zinc-800 rounded-xl"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Go Back
                        </Button>
                    </div>

                    {/* Additional Info */}
                    <div className="mt-8 space-y-2 text-center">
                        <p className="text-sm text-zinc-500">
                            Still can't find what you're looking for?
                        </p>
                        <p className="text-xs text-zinc-600">
                            Contact our support team for assistance
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Custom404ErrorPage;