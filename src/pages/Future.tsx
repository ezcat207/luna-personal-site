import React from 'react';
import { Link } from 'react-router-dom';

const Future = () => {
    return (
        <div className="space-y-24">
            {/* Header: Loading Future */}
            <header className="relative group pt-12">
                <div className="tape top-0 left-[40%] z-10"></div>
                <div className="paper-sheet torn-edge rotate-[-1deg] max-w-2xl mx-auto">
                    <div className="flex flex-col items-center text-center">
                        <h1 className="text-6xl md:text-7xl font-header font-bold text-ink mb-2">Loading Future...</h1>
                        <p className="font-handwritten text-xl text-pencil">Day 2,431 of being me. System check: Green!</p>

                        <div className="mt-8 relative w-full max-w-md">
                            <div className="h-8 border-2 border-ink rounded-full p-1 overflow-hidden">
                                <div className="h-full bg-blue-300 rounded-full w-[80%] pattern-paper animate-pulse"></div>
                            </div>
                            <span className="absolute -top-8 right-0 font-handwritten text-lg scribble">80% Done Growing!</span>
                        </div>
                    </div>
                </div>
                <div className="absolute -right-4 top-10 rotate-12 bg-pink-100 p-2 shadow-sm border border-pink-200 text-sm font-handwritten hidden lg:block">
                    Luna's Personal Journal <br /> (Grade 3 Edition)
                </div>
            </header>

            {/* North Star */}
            <section className="relative max-w-4xl mx-auto px-6 text-center">
                <div className="absolute -left-10 top-0 text-7xl text-pencil/20 font-serif">“</div>
                <h2 className="text-3xl md:text-5xl font-header leading-relaxed">
                    I want to be a <span className="bg-green-100 px-2 rounded-sm border-b-2 border-green-400">Writer</span> to design souls, <br />
                    and an <span className="bg-blue-100 px-2 rounded-sm border-b-2 border-blue-400">Engineer</span> to build worlds.
                </h2>
                <div className="absolute -right-10 bottom-0 text-7xl text-pencil/20 font-serif translate-y-6">”</div>
                <div className="mt-6">
                    <span className="scribble text-xl font-bold">— My North Star —</span>
                </div>
            </section>

            {/* Content Grid: Mentor & Knowledge Map */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start px-4">

                {/* Mentor Section */}
                <div className="lg:col-span-5 relative space-y-12">
                    <div className="polaroid rotate-[-3deg] hover:rotate-0 transition-transform cursor-pointer mx-auto lg:mx-0 block">
                        <div className="tape -top-4 left-1/2 -translate-x-1/2 rotate-1 z-10"></div>
                        <img
                            alt="Wayne"
                            className="w-72 h-72 object-cover grayscale sepia-[0.3]"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBRkbybPm15O7f6OgYUkP0Qal1OAhZ2_o4BNY957B_szE-IISBhUNngot4GcmK0itFHi5jMK98QJIN_GEf2rh_euhF-IVq0jYzaVXBdBgSRJWWkvh4kjjPzZgwYDcbOobCtI21ftORbHklAiN1Sg6FIU1w-BGhQfaqczeJ3szDLr34iN8v9WyeQ-za05EY9WziPs2bkvG5CMaNwYOgTcSm2ySergu4MRd02UxvHtrUNcGfrp7QJDOANxYQnp033bG7CWEbcbY9bo9x"
                        />
                        <div className="mt-4 text-center">
                            <p className="font-doodle text-2xl font-bold text-ink">Mentor: Wayne</p>
                            <p className="font-handwritten text-sm text-pencil">"The Architect"</p>
                        </div>
                    </div>

                    <div className="paper-sheet rotate-2 text-sm max-w-xs ml-auto lg:ml-8 border-l-4 border-blue-400">
                        <h3 className="font-header text-2xl font-bold mb-2">Wayne's Wisdom</h3>
                        <p className="font-note leading-relaxed text-lg">
                            Wayne doesn't just teach code; he teaches <span className="underline decoration-wavy decoration-blue-500">how to think</span>.
                            He says reality is just a big codebase!
                        </p>
                        <div className="mt-4 p-2 bg-slate-50 border-dashed border border-pencil/30 text-pencil italic">
                            "The code is just the tool. The architecture is the soul of the machine."
                        </div>
                    </div>
                </div>

                {/* Knowledge Map */}
                <div className="lg:col-span-7 paper-sheet torn-edge bg-white/80 min-h-[600px] overflow-hidden">
                    <h3 className="font-header text-4xl mb-12 text-center underline decoration-dashed decoration-pencil/30">Knowledge Map</h3>
                    <div className="relative h-full flex flex-wrap justify-center items-center gap-12 p-8">
                        <div className="mindmap-node bg-blue-50 z-10 border-blue-400 scale-110">
                            <span className="font-bold text-xl block">Luna</span>
                            <span className="text-xs scribble">Learning Engine</span>
                        </div>

                        <div className="mindmap-node rotate-3 bg-yellow-50 border-yellow-400">
                            <span className="material-symbols-outlined text-yellow-600 block mb-1">code</span>
                            <span className="font-bold block">Python</span>
                            <span className="text-xs font-handwritten">Basic Spells</span>
                        </div>

                        <div className="mindmap-node -rotate-2 bg-pink-50 border-pink-400">
                            <span className="material-symbols-outlined text-pink-600 block mb-1">auto_awesome</span>
                            <span className="font-bold block">Prompting</span>
                            <span className="text-xs font-handwritten">AI Whispering</span>
                        </div>

                        {/* Progress Bar Quest */}
                        <div className="w-full mt-8 p-4 bg-blue-100/50 rounded-xl border-2 border-dashed border-blue-300 relative">
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-bold font-header text-2xl">Quest: Life Simulator</span>
                                <span className="scribble font-bold">45%</span>
                            </div>
                            <div className="h-2 bg-white rounded-full overflow-hidden">
                                <div className="h-full bg-blue-400 w-[45%]"></div>
                            </div>
                            <div className="absolute -right-4 -bottom-4 rotate-12 scribble">Almost there!</div>
                        </div>

                        {/* Locked Nodes */}
                        <div className="mindmap-node opacity-40 grayscale flex flex-col items-center">
                            <span className="material-symbols-outlined">lock</span>
                            <span className="font-bold">nanoGPT</span>
                            <span className="text-[10px]">Math Lvl 4 req.</span>
                        </div>
                        <div className="mindmap-node opacity-40 grayscale flex flex-col items-center rotate-6">
                            <span className="material-symbols-outlined">lock</span>
                            <span className="font-bold">Neural Nets</span>
                            <span className="text-[10px]">Python Mastery req.</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Reading Stash */}
            <section className="relative mt-12 px-4 max-w-5xl mx-auto">
                <div className="tape top-[-20px] left-10 z-10 rotate-[-15deg]"></div>
                <div className="paper-sheet rotate-[0.5deg]">
                    <h3 className="font-header text-4xl mb-8 flex items-center gap-4">
                        <span className="material-symbols-outlined text-pencil">auto_stories</span>
                        Wayne's Reading Stash
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Logic Shelf */}
                        <div className="space-y-4">
                            <div className="bg-blue-200/40 shelf-label text-blue-800 rotate-[-1deg]">Logic Shelf</div>
                            <ul className="space-y-4 font-note text-lg">
                                <BookItem title="Thinking, Fast and Slow" author="D. Kahneman" />
                                <BookItem title="Pragmatic Programmer" author="Hunt & Thomas" />
                            </ul>
                        </div>
                        {/* Heart Shelf */}
                        <div className="space-y-4">
                            <div className="bg-pink-200/40 shelf-label text-pink-800 rotate-[2deg]">Heart Shelf</div>
                            <ul className="space-y-4 font-note text-lg">
                                <BookItem title="The Little Prince" author="Saint-Exupéry" />
                                <BookItem title="Sophie's World" author="Jostein Gaarder" />
                            </ul>
                        </div>
                        {/* Strategy Shelf */}
                        <div className="space-y-4">
                            <div className="bg-yellow-200/40 shelf-label text-yellow-800 rotate-[-2deg]">Strategy Shelf</div>
                            <ul className="space-y-4 font-note text-lg">
                                <BookItem title="Zero to One" author="Peter Thiel" />
                                <BookItem title="The Art of War" author="Sun Tzu" />
                            </ul>
                        </div>
                    </div>
                    <div className="absolute -bottom-10 -right-4 sticky-note w-48 hidden md:block">
                        <p className="font-handwritten text-sm">Wayne says: "Read these if you want to understand the matrix."</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

const BookItem = ({ title, author }: { title: string, author: string }) => (
    <li className="border-b border-pencil/20 pb-1 hover:text-blue-600 transition-colors cursor-pointer">
        <span className="font-bold block">{title}</span>
        <span className="text-sm opacity-60">{author}</span>
    </li>
);

export default Future;
