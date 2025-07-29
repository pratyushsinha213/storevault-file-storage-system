// NEW ENHANCED DESIGN
import React, { useState, useRef, useEffect } from 'react';
import { SendHorizonal, Bot, Sparkles, MessageSquare, Zap, Brain, User, Clock, FileText } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import useAIStore from '@/store/useAIStore';
import ReactMarkdown from 'react-markdown';
import { AnimatedGridPattern } from '@/components/magicui/animated-grid-pattern';
import { cn } from '@/lib/utils';

const AIChatPage = () => {
    const [messages, setMessages] = useState([
        { 
            sender: 'ai', 
            text: 'Hello! I\'m your AI assistant. I can help you with file management, answer questions, and provide insights about your data. How can I assist you today?',
            timestamp: new Date()
        }
    ]);
    const [input, setInput] = useState('');
    const [typingMessage, setTypingMessage] = useState(null);
    const [isTyping, setIsTyping] = useState(false);
    const bottomRef = useRef(null);
    const { getResponseFromAi } = useAIStore();

    const tempUser = {
        name: "John Doe",
        avatar: "https://avatars.githubusercontent.com/u/12345678?v=4",
    };

    const quickPrompts = [
        "How can I organize my files better?",
        "What's the best way to backup my data?",
        "Explain file compression",
        "Help me understand cloud storage"
    ];

    const handleSend = async (customMessage = null) => {
        const messageToSend = customMessage || input;
        if (!messageToSend.trim()) return;

        const userInput = messageToSend;
        setMessages(prev => [...prev, { 
            sender: 'user', 
            text: userInput,
            timestamp: new Date()
        }]);
        setInput('');
        setIsTyping(true);

        const thinkingId = Date.now();
        setMessages(prev => [...prev, { 
            sender: 'ai', 
            text: '...', 
            id: thinkingId,
            timestamp: new Date()
        }]);

        try {
            const aiReply = await getResponseFromAi(userInput);
            setMessages(prev => prev.filter(msg => msg.id !== thinkingId));

            // Typing animation - much faster now
            let i = 0;
            const interval = setInterval(() => {
                setTypingMessage({ 
                    sender: 'ai', 
                    text: aiReply.slice(0, i + 1),
                    timestamp: new Date()
                });
                i++;
                if (i === aiReply.length) {
                    clearInterval(interval);
                    setMessages(prev => [...prev, { 
                        sender: 'ai', 
                        text: aiReply,
                        timestamp: new Date()
                    }]);
                    setTypingMessage(null);
                    setIsTyping(false);
                }
            }, 5); // Reduced from 30ms to 5ms for much faster typing
        } catch (error) {
            setMessages(prev => prev.filter(msg => msg.id !== thinkingId));
            setMessages(prev => [...prev, { 
                sender: 'ai', 
                text: 'Sorry, I encountered an error. Please try again.',
                timestamp: new Date()
            }]);
            setIsTyping(false);
        }
    };

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, typingMessage]);

    const formatTime = (timestamp) => {
        return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="flex flex-col h-screen text-white bg-black">
            <AnimatedGridPattern
                numSquares={30}
                maxOpacity={0.1}
                duration={3}
                repeatDelay={1}
                className={cn(
                    "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
                    "absolute inset-0 z-10"
                )}
            />

            {/* Enhanced Header */}
            <div className="relative z-10 flex-shrink-0 px-6 py-6 border-b border-zinc-800/50 bg-zinc-900/50 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600">
                            <Bot className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-transparent bg-gradient-to-r from-white to-zinc-300 bg-clip-text">
                                AI Assistant
                            </h1>
                            <p className="text-sm text-zinc-400">Your intelligent file management companion</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Badge variant="secondary" className="text-green-400 bg-green-500/20 border-green-500/30">
                            <div className="w-2 h-2 mr-2 bg-green-400 rounded-full"></div>
                            Online
                        </Badge>
                        <Avatar className="w-10 h-10 rounded-xl ring-2 ring-zinc-700">
                            <AvatarImage src={tempUser.avatar} alt={tempUser.name} />
                            <AvatarFallback className="text-white rounded-xl bg-zinc-800">
                                {tempUser.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                        </Avatar>
                    </div>
                </div>
            </div>

            {/* Quick Prompts - Only show if no messages beyond initial */}
            {messages.length === 1 && (
                <div className="relative z-10 flex-shrink-0 px-6 py-4">
                    <Card className="border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-blue-400" />
                                <CardTitle className="text-lg">Quick Start</CardTitle>
                            </div>
                            <CardDescription>Try these prompts to get started</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                {quickPrompts.map((prompt, idx) => (
                                    <Button
                                        key={idx}
                                        variant="outline"
                                        className="justify-start h-auto p-4 text-left border-zinc-700 hover:bg-zinc-800/50"
                                        onClick={() => handleSend(prompt)}
                                        disabled={isTyping}
                                    >
                                        <div className="flex items-start gap-3">
                                            <MessageSquare className="flex-shrink-0 w-4 h-4 mt-1 text-blue-400" />
                                            <span className="text-sm">{prompt}</span>
                                        </div>
                                    </Button>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* Chat Messages - Takes remaining space */}
            <div className="relative z-10 flex-1 px-6 py-4 space-y-6 overflow-y-auto scrollbar-chat scroll-smooth">
                {[...messages, typingMessage].filter(Boolean).map((msg, idx) => (
                    <div
                        key={idx}
                        className={cn(
                            "flex items-start gap-4",
                            msg.sender === 'user' ? 'justify-end' : 'justify-start'
                        )}
                    >
                        {msg.sender === 'ai' && (
                            <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600">
                                <Bot className="w-5 h-5 text-white" />
                            </div>
                        )}

                        <div className={cn(
                            "max-w-2xl px-6 py-4 rounded-2xl",
                            msg.sender === 'user'
                                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white'
                                : 'bg-zinc-800/80 backdrop-blur-sm border border-zinc-700/50'
                        )}>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-xs font-medium opacity-70">
                                    {msg.sender === 'user' ? 'You' : 'AI Assistant'}
                                </span>
                                <span className="text-xs opacity-50">
                                    {formatTime(msg.timestamp)}
                                </span>
                            </div>
                            
                            {msg.text === "..." ? (
                                <div className="flex items-center gap-2">
                                    <div className="flex space-x-1">
                                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                    </div>
                                    <span className="text-sm text-zinc-400">AI is thinking...</span>
                                </div>
                            ) : (
                                <ReactMarkdown className="text-sm prose prose-invert max-w-none">
                                    {msg.text}
                                </ReactMarkdown>
                            )}
                        </div>

                        {msg.sender === 'user' && (
                            <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-zinc-600 to-zinc-700">
                                <User className="w-5 h-5 text-white" />
                            </div>
                        )}
                    </div>
                ))}
                <div ref={bottomRef} />
            </div>

            {/* Enhanced Input Area - Fixed at bottom */}
            <div className="relative z-10 flex-shrink-0 px-6 py-4 border-t border-zinc-800/50 bg-zinc-900/50 backdrop-blur-sm">
                <div className="flex items-end gap-4">
                    <div className="relative flex-1">
                        <Input
                            type="text"
                            className="w-full py-4 pl-4 pr-12 text-sm text-white transition-all rounded-xl bg-zinc-800/50 border-zinc-700 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 backdrop-blur-sm"
                            placeholder="Ask me anything about your files, storage, or get help with organization..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                            disabled={isTyping}
                        />
                        <div className="absolute flex items-center gap-2 transform -translate-y-1/2 right-3 top-1/2">
                            {isTyping && (
                                <div className="flex space-x-1">
                                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></div>
                                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                </div>
                            )}
                        </div>
                    </div>
                    <Button
                        onClick={() => handleSend()}
                        disabled={!input.trim() || isTyping}
                        className="px-6 py-4 text-white transition-all duration-200 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                        <SendHorizonal className="w-5 h-5" />
                    </Button>
                </div>
                
                {/* Input Tips */}
                <div className="flex items-center justify-between mt-3 text-xs text-zinc-500">
                    <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                            <Zap className="w-3 h-3" />
                            Press Enter to send
                        </span>
                        <span className="flex items-center gap-1">
                            <Brain className="w-3 h-3" />
                            AI-powered responses
                        </span>
                    </div>
                    <span className="flex items-center gap-1">
                        <FileText className="w-3 h-3" />
                        {messages.length - 1} messages
                    </span>
                </div>
            </div>
        </div>
    );
};

export default AIChatPage;