import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Search, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

import { runAgent } from '../services/aiAgent';

const Mind = () => {
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: "Hi! I'm your Bunny Universe AI assistant. I can search the web and read pages to help you explore. What's on your mind?" }
    ]);
    const [input, setInput] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [thinkingStatus, setThinkingStatus] = useState<string>('');
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMsg: Message = { role: 'user', content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);
        setThinkingStatus('Bunny is thinking... 🐰');

        try {
            const answer = await runAgent(input, (status) => {
                setThinkingStatus(status);
            });

            setMessages(prev => [...prev, { role: 'assistant', content: answer }]);
        } catch (err) {
            console.error(err);
            setMessages(prev => [...prev, { role: 'assistant', content: `Oops! My brain hit a snag: ${(err as Error).message}. Check your console and .env!` }]);
        } finally {
            setIsLoading(false);
            setThinkingStatus('');
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <header className="text-center space-y-4">
                <h1 className="font-header text-6xl text-ink">The Bunny Brain</h1>
                <p className="font-handwritten text-xl text-pencil">Connecting Luna's creativity with Agentic Intelligence</p>
            </header>

            <div className="craft-paper torn-all shadow-deep min-h-[600px] flex flex-col relative overflow-hidden">
                <div className="washi-tape pattern-1 top-2 right-10 w-32 h-8 rotate-3 z-20"></div>

                {/* Chat Messages */}
                <div
                    ref={scrollRef}
                    className="flex-1 overflow-y-auto p-8 space-y-6 max-h-[500px] custom-scrollbar"
                >
                    <AnimatePresence>
                        {messages.map((msg, idx) => (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                key={idx}
                                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`max-w-[80%] p-4 shadow-sm relative ${msg.role === 'user'
                                    ? 'bg-blue-100 rotate-1 border-l-4 border-blue-400 font-note'
                                    : 'bg-white -rotate-1 border-l-4 border-pink-400 font-handwritten'
                                    }`}>
                                    <div className="flex items-center gap-2 mb-2 opacity-50">
                                        {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                                        <span className="text-xs uppercase tracking-widest">
                                            {msg.role === 'user' ? 'Luna' : 'Bunny AI'}
                                        </span>
                                    </div>
                                    <p className="text-lg leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="bg-white p-4 shadow-sm -rotate-1 border-l-4 border-pink-400 flex items-center gap-3">
                                <Loader2 className="animate-spin text-pink-400" size={20} />
                                <span className="font-handwritten text-pencil italic">{thinkingStatus || "Gathering brain cells..."}</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Tools Indicators */}
                <div className="px-8 py-2 flex gap-4 opacity-40 grayscale hover:grayscale-0 transition-all cursor-default select-none border-t border-dashed border-gray-300">
                    <div className="flex items-center gap-1 text-xs font-mono"><Search size={12} /> WebSearch</div>
                    <div className="flex items-center gap-1 text-xs font-mono"><FileText size={12} /> PageReader</div>
                </div>

                {/* Input Area */}
                <div className="p-8 pt-4">
                    <div className="relative group">
                        <div className="absolute inset-0 bg-yellow-200/20 blur opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
                        <div className="relative flex items-center bg-white border-2 border-pencil/30 p-2 shadow-inner">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Ask me anything..."
                                className="flex-1 bg-transparent border-none focus:ring-0 font-note text-xl p-2"
                            />
                            <button
                                onClick={handleSend}
                                disabled={isLoading}
                                className="p-3 bg-pink-500 text-white hover:bg-pink-600 transition-colors shadow-md disabled:bg-gray-300"
                            >
                                <Send size={20} />
                            </button>
                        </div>
                    </div>
                    <p className="mt-4 text-center text-sm font-handwritten text-pencil opacity-60 italic">
                        "Design souls, build worlds." — Luna's Motto
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Mind;
