import { Link } from 'react-router-dom';

const FandomTriviaV1 = () => {
    return (
        <article className="max-w-4xl mx-auto pt-12 pb-20">
            <Link to="/blog" className="inline-block mb-8 text-pencil hover:text-ink font-handwritten">&larr; Back to Journal</Link>

            <div className="paper-sheet relative overflow-hidden">
                <div className="tape -top-4 left-1/2 -translate-x-1/2 w-40 rotate-1"></div>

                {/* Header */}
                <div className="text-center mb-12 border-b-2 border-dashed border-gray-300 pb-8">
                    <h1 className="font-header text-4xl md:text-6xl text-ink mb-4">Building with AI: FandomTrivia Begins ⚡</h1>
                    <p className="font-handwritten text-xl text-pencil">How I used AI to build a website and add a Harry Potter quiz</p>
                    <div className="mt-4 inline-block bg-purple-100 px-3 py-1 text-sm font-mono rotate-[-2deg] shadow-sm">
                        Feb 23, 2026
                    </div>
                </div>

                <div className="space-y-12 font-serif text-lg leading-relaxed text-gray-800">

                    {/* Intro */}
                    <div className="prose prose-lg max-w-none">
                        <p>
                            Today I started building <strong>FandomTrivia</strong> — a trivia quiz app for fans of books, movies, and more.
                            But here's the twist: I didn't write the code by hand. I used AI to do the heavy lifting!
                        </p>
                        <p className="mt-4">
                            I learned how to <em>direct</em> AI like a co-pilot — telling it what to build, what to fix, and what to add.
                            It felt like having a super-fast coding partner who never gets tired. 🤖
                        </p>
                    </div>

                    {/* What I Did */}
                    <div className="bg-purple-50 p-6 rounded-lg rotate-1 shadow-lifted border border-purple-100">
                        <h3 className="font-header text-2xl text-purple-800 mb-4">What I Did 🛠️</h3>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <span className="text-2xl">🌐</span>
                                <div>
                                    <p className="font-bold text-purple-700">Used AI to read web pages</p>
                                    <p className="text-sm text-gray-600">I told AI to look at web pages and understand how they work, so it could learn from them.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="text-2xl">🔧</span>
                                <div>
                                    <p className="font-bold text-purple-700">Fixed errors with AI</p>
                                    <p className="text-sm text-gray-600">When something broke, I showed AI the error and it figured out how to fix it. Like having a debugging buddy!</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="text-2xl">⚡</span>
                                <div>
                                    <p className="font-bold text-purple-700">Added Harry Potter Book 1 quiz</p>
                                    <p className="text-sm text-gray-600">I told AI to add a trivia quiz for <em>Harry Potter and the Sorcerer's Stone</em>, complete with questions and pictures!</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* The Harry Potter Quiz */}
                    <div className="relative my-12">
                        <div className="tape -top-3 right-10 w-24 bg-yellow-200/50 rotate-2"></div>
                        <div className="bg-yellow-50 p-8 rounded-xl border-2 border-dashed border-yellow-300">
                            <h3 className="font-header text-3xl text-yellow-800 mb-6 text-center">The Harry Potter Quiz ⚡📚</h3>

                            <div className="space-y-6">
                                <p>
                                    The first quiz I added was for <strong>Harry Potter and the Sorcerer's Stone</strong> (Book 1).
                                    Here's how it works:
                                </p>

                                <div className="bg-white p-4 rounded-lg border border-yellow-200 space-y-2">
                                    <div className="flex items-center gap-2">
                                        <span className="bg-yellow-200 text-yellow-800 text-xs font-bold px-2 py-1 rounded">1</span>
                                        <p>Pick a Harry Potter book to quiz on</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="bg-yellow-200 text-yellow-800 text-xs font-bold px-2 py-1 rounded">2</span>
                                        <p>Answer 20 multiple-choice trivia questions</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="bg-yellow-200 text-yellow-800 text-xs font-bold px-2 py-1 rounded">3</span>
                                        <p>See your score and which ones you got right or wrong</p>
                                    </div>
                                </div>

                                <p className="text-center font-handwritten text-xl text-yellow-700">
                                    I also told AI to add pictures to make it look cooler! 🖼️
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* How AI Helped */}
                    <div className="relative my-12">
                        <div className="tape -top-3 left-8 w-24 bg-blue-200/50 rotate-[-2deg]"></div>
                        <div className="bg-blue-50 p-8 rounded-xl border-2 border-dashed border-blue-200">
                            <h3 className="font-header text-3xl text-blue-800 mb-6 text-center">How AI Helped 🤖</h3>

                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="font-bold text-blue-600 min-w-[60px]">Luna:</div>
                                    <div className="font-handwritten text-lg">I told AI to read the website and understand how it looks.</div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="font-bold text-purple-600 min-w-[60px]">AI:</div>
                                    <div className="font-handwritten text-lg italic">
                                        It read the page, found some errors, and I told it to fix them.
                                        Then I said "add a Harry Potter quiz for Book 1" and it built it!
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="font-bold text-blue-600 min-w-[60px]">Luna:</div>
                                    <div className="font-handwritten text-lg">
                                        It's like giving instructions to a really smart helper. You don't have to write every line of code —
                                        you just have to <em>explain what you want</em>.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Key Takeaway */}
                    <div className="bg-gray-100 p-6 rounded-lg rotate-[-1deg] shadow-inner">
                        <h3 className="font-header text-xl text-gray-700 mb-3">Key Takeaway 💡</h3>
                        <p className="font-handwritten text-lg text-gray-600">
                            You don't need to be a coding expert to build things. With AI, you just need to know
                            <strong> what you want</strong> and <strong>how to explain it clearly</strong>.
                            Today I proved that a kid can build a real app by talking to AI!
                        </p>
                    </div>

                </div>
            </div>
        </article>
    );
};

export default FandomTriviaV1;
