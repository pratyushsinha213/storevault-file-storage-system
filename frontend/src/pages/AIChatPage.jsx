import React, { useState, useRef, useEffect } from 'react';
import { SendHorizonal, Bot } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import useAIStore from '@/store/useAIStore';
import ReactMarkdown from 'react-markdown';

const AIChatPage = () => {
    const [messages, setMessages] = useState([
        { sender: 'ai', text: 'Hi! I’m your AI assistant. How can I help you today?' }
    ]);
    const [input, setInput] = useState('');
    const [typingMessage, setTypingMessage] = useState(null); // For animation
    const bottomRef = useRef(null);
    const { getResponseFromAi } = useAIStore();

    const tempUser = {
        name: "John Doe",
        avatar: "https://avatars.githubusercontent.com/u/12345678?v=4",
    };

    const handleSend = async () => {
        if (!input.trim()) return;

        const userInput = input;
        setMessages(prev => [...prev, { sender: 'user', text: userInput }]);
        setInput('');

        // Show "thinking..." placeholder with unique ID
        const thinkingId = Date.now();
        setMessages(prev => [...prev, { sender: 'ai', text: '...', id: thinkingId }]);

        const aiReply = await getResponseFromAi(userInput);

        // Remove placeholder before animating
        setMessages(prev => prev.filter(msg => msg.id !== thinkingId));

        // Typing animation
        let i = 0;
        const interval = setInterval(() => {
            setTypingMessage({ sender: 'ai', text: aiReply.slice(0, i + 1) });
            i++;
            if (i === aiReply.length) {
                clearInterval(interval);
                setMessages(prev => [...prev, { sender: 'ai', text: aiReply }]);
                setTypingMessage(null);
            }
        }, 10);
    };

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, typingMessage]);

    return (
        <div className="flex flex-col h-screen text-white bg-zinc-950">
            {/* Header */}
            <div className="px-6 py-4 border-b border-zinc-800 bg-zinc-900">
                <h1 className="text-xl font-semibold">🤖 AI Chat Assistant</h1>
                <p className="text-sm text-zinc-400">Ask me anything!</p>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 px-4 py-6 space-y-4 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700">
                {[...messages, typingMessage].filter(Boolean).map((msg, idx) => (
                    <div
                        key={idx}
                        className={`flex items-end ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        {/* Avatar */}
                        {msg.sender === 'ai' && (
                            <div className="flex items-center justify-center w-8 h-8 mr-2 rounded-full bg-zinc-800">
                                <Bot className="w-4 h-4 text-blue-300" />
                            </div>
                        )}

                        {/* Message Bubble */}
                        <div
                            className={`max-w-sm px-4 py-2 rounded-lg text-sm ${msg.sender === 'user'
                                ? 'bg-blue-600 text-white rounded-br-none'
                                : 'bg-zinc-800 text-zinc-200 rounded-bl-none'
                                }`}
                        >
                            {msg.text === "..." ? (
                                <span className="font-mono text-zinc-400 animate-pulse">...</span>
                            ) : (
                                <ReactMarkdown className="text-sm prose prose-invert max-w-none">
                                    {msg.text}
                                </ReactMarkdown>
                            )}
                        </div>

                        {msg.sender === 'user' && (
                            <div className="flex items-center justify-center w-8 h-8 ml-2 bg-blue-600 rounded-full">
                                <img src={tempUser.avatar} className='rounded-full' />
                            </div>
                        )}
                    </div>
                ))}
                <div ref={bottomRef} />
            </div>

            {/* Input Area */}
            <div className="flex items-center px-4 py-3 border-t border-zinc-800 bg-zinc-900">
                <Input
                    type="text"
                    className="flex-1 px-4 py-2 text-sm rounded-md outline-none bg-zinc-800 focus:ring-2 focus:ring-blue-500"
                    placeholder="Type your message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                />
                <Button
                    onClick={handleSend}
                    className="p-2 ml-2 text-blue-500 transition hover:text-blue-600 hover:cursor-pointer"
                >
                    <SendHorizonal className="w-5 h-5" />
                </Button>
            </div>
        </div>
    );
};

export default AIChatPage;