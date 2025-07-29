import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const ScrollbarDemo = () => {
    const generateContent = (count) => {
        return Array.from({ length: count }, (_, i) => (
            <div key={i} className="p-4 mb-2 rounded-lg bg-zinc-800/50 border border-zinc-700">
                <h3 className="font-semibold text-white">Item {i + 1}</h3>
                <p className="text-sm text-zinc-400">
                    This is a sample content item to demonstrate scrollbar styles. 
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
            </div>
        ));
    };

    return (
        <div className="p-6 space-y-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-white mb-2">Scrollbar Styles Demo</h1>
                <p className="text-zinc-400">Different scrollbar styles available in the application</p>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Modern Scrollbar */}
                <Card className="border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="text-white">Modern Scrollbar</CardTitle>
                        <CardDescription className="text-zinc-400">
                            Standard modern scrollbar with hover effects
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-64 overflow-y-auto scrollbar-modern scroll-smooth">
                            {generateContent(20)}
                        </div>
                    </CardContent>
                </Card>

                {/* Thin Scrollbar */}
                <Card className="border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="text-white">Thin Scrollbar</CardTitle>
                        <CardDescription className="text-zinc-400">
                            Minimal scrollbar for subtle appearance
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-64 overflow-y-auto scrollbar-thin scroll-smooth">
                            {generateContent(20)}
                        </div>
                    </CardContent>
                </Card>

                {/* Gradient Scrollbar */}
                <Card className="border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="text-white">Gradient Scrollbar</CardTitle>
                        <CardDescription className="text-zinc-400">
                            Beautiful gradient scrollbar with animations
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-64 overflow-y-auto scrollbar-gradient scroll-smooth">
                            {generateContent(20)}
                        </div>
                    </CardContent>
                </Card>

                {/* Chat Scrollbar */}
                <Card className="border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="text-white">Chat Scrollbar</CardTitle>
                        <CardDescription className="text-zinc-400">
                            Optimized for chat interfaces
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-64 overflow-y-auto scrollbar-chat scroll-smooth">
                            {generateContent(20)}
                        </div>
                    </CardContent>
                </Card>

                {/* Table Scrollbar */}
                <Card className="border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="text-white">Table Scrollbar</CardTitle>
                        <CardDescription className="text-zinc-400">
                            Designed for table components
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-64 overflow-y-auto scrollbar-table scroll-smooth">
                            {generateContent(20)}
                        </div>
                    </CardContent>
                </Card>

                {/* Hidden Scrollbar */}
                <Card className="border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="text-white">Hidden Scrollbar</CardTitle>
                        <CardDescription className="text-zinc-400">
                            Scrollbar hidden but functionality preserved
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-64 overflow-y-auto scrollbar-hidden scroll-smooth">
                            {generateContent(20)}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Usage Instructions */}
            <Card className="border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="text-white">Usage Instructions</CardTitle>
                    <CardDescription className="text-zinc-400">
                        How to use these scrollbar styles in your components
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="p-4 rounded-lg bg-zinc-800/50 border border-zinc-700">
                            <h4 className="font-semibold text-white mb-2">Basic Usage:</h4>
                            <code className="text-sm text-green-400">
                                className="overflow-y-auto scrollbar-modern scroll-smooth"
                            </code>
                        </div>
                        
                        <div className="p-4 rounded-lg bg-zinc-800/50 border border-zinc-700">
                            <h4 className="font-semibold text-white mb-2">Available Classes:</h4>
                            <ul className="text-sm text-zinc-300 space-y-1">
                                <li><code className="text-blue-400">scrollbar-modern</code> - Standard modern scrollbar</li>
                                <li><code className="text-blue-400">scrollbar-thin</code> - Minimal thin scrollbar</li>
                                <li><code className="text-blue-400">scrollbar-gradient</code> - Gradient scrollbar with animations</li>
                                <li><code className="text-blue-400">scrollbar-chat</code> - Optimized for chat interfaces</li>
                                <li><code className="text-blue-400">scrollbar-table</code> - Designed for tables</li>
                                <li><code className="text-blue-400">scrollbar-hidden</code> - Hidden scrollbar</li>
                                <li><code className="text-blue-400">scroll-smooth</code> - Smooth scrolling behavior</li>
                            </ul>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default ScrollbarDemo; 