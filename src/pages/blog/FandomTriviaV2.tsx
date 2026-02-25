import { Link } from 'react-router-dom';

const FandomTriviaV2 = () => {
    return (
        <article className="max-w-4xl mx-auto pt-12 pb-20">
            <Link to="/blog" className="inline-block mb-8 text-pencil hover:text-ink font-handwritten">&larr; Back to Journal</Link>

            <div className="paper-sheet relative overflow-hidden">
                <div className="tape -top-4 left-1/2 -translate-x-1/2 w-40 rotate-1"></div>

                {/* Header */}
                <div className="text-center mb-12 border-b-2 border-dashed border-gray-300 pb-8">
                    <h1 className="font-header text-4xl md:text-6xl text-ink mb-4">NotebookLM + Antigravity: Scaling Up 🚀</h1>
                    <p className="font-handwritten text-xl text-pencil">Trivia for all 7 books, random questions, and Supabase auth</p>
                    <div className="mt-4 inline-block bg-amber-100 px-3 py-1 text-sm font-mono rotate-[-2deg] shadow-sm">
                        Feb 24, 2026
                    </div>
                </div>

                <div className="space-y-12 font-serif text-lg leading-relaxed text-gray-800">

                    {/* Intro */}
                    <div className="prose prose-lg max-w-none">
                        <p>
                            Yesterday I built the first Harry Potter quiz with AI. Today I decided to go <strong>big</strong> —
                            trivia questions for <em>all seven</em> Harry Potter books, plus login with Google!
                        </p>
                        <p className="mt-4">
                            I used two AI tools together: <strong>NotebookLM</strong> to create the questions, and <strong>Antigravity</strong> to build the code.
                            It was like having two super-powered assistants working as a team. 🤝
                        </p>
                    </div>

                    {/* NotebookLM Section */}
                    <div className="bg-amber-50 p-6 rounded-lg rotate-1 shadow-lifted border border-amber-100">
                        <h3 className="font-header text-2xl text-amber-800 mb-4">Step 1: NotebookLM — The Question Factory 🏭</h3>
                        <div className="space-y-4">
                            <p>
                                I used <strong>Google NotebookLM</strong> to create trivia questions for each Harry Potter book.
                                NotebookLM is amazing because it can read entire books and generate questions from them!
                            </p>

                            <div className="bg-white p-4 rounded-lg border border-amber-200">
                                <p className="font-mono text-sm text-amber-700 mb-2">📚 Books covered:</p>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <div className="flex items-center gap-2">⚡ Book 1: Sorcerer's Stone</div>
                                    <div className="flex items-center gap-2">🐍 Book 2: Chamber of Secrets</div>
                                    <div className="flex items-center gap-2">🐺 Book 3: Prisoner of Azkaban</div>
                                    <div className="flex items-center gap-2">🔥 Book 4: Goblet of Fire</div>
                                    <div className="flex items-center gap-2">🦅 Book 5: Order of the Phoenix</div>
                                    <div className="flex items-center gap-2">📖 Book 6: Half-Blood Prince</div>
                                    <div className="flex items-center gap-2">💀 Book 7: Deathly Hallows</div>
                                </div>
                            </div>

                            <p className="font-handwritten text-lg text-amber-700 text-center">
                                100 questions total — that's a LOT of trivia! 🧠
                            </p>
                        </div>
                    </div>

                    {/* Antigravity Section */}
                    <div className="relative my-12">
                        <div className="tape -top-3 right-10 w-24 bg-purple-200/50 rotate-2"></div>
                        <div className="bg-purple-50 p-8 rounded-xl border-2 border-dashed border-purple-200">
                            <h3 className="font-header text-3xl text-purple-800 mb-6 text-center">Step 2: Teaching Antigravity 🤖</h3>

                            <div className="space-y-6">
                                <p>
                                    After NotebookLM created the questions, I gave all 100 of them to <strong>Antigravity</strong> (my AI coding partner).
                                    Then I taught it something cool:
                                </p>

                                <div className="bg-gray-900 text-gray-100 p-6 rounded-xl border-4 border-gray-800 shadow-2xl relative overflow-hidden">
                                    <div className="absolute top-4 right-4 text-xs text-gray-500 font-mono">luna_instructions.txt</div>
                                    <pre className="font-mono text-sm overflow-x-auto">
                                        {`> Luna: "Take these 100 questions and 
   randomly pick 20 for each book."

> Antigravity: "Got it! I'll shuffle the 
   questions so every quiz feels different."

> Luna: "Perfect! Now each time someone 
   plays, they get a random set!" 🎲`}
                                    </pre>
                                </div>

                                <p className="text-center font-handwritten text-lg text-purple-700">
                                    This means every time you play, you get a <em>different</em> set of 20 questions! 🔀
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Supabase Auth Section */}
                    <div className="relative my-12">
                        <div className="tape -top-3 left-8 w-24 bg-green-200/50 rotate-[-2deg]"></div>
                        <div className="bg-green-50 p-8 rounded-xl border-2 border-dashed border-green-200">
                            <h3 className="font-header text-3xl text-green-800 mb-6 text-center">Step 3: Supabase Auth — The Treasure Map 🗺️</h3>

                            <div className="space-y-6">
                                <p>
                                    We also set up <strong>Supabase</strong> so users can log in with their Google account.
                                    But this part was like following a <em>treasure map</em> — lots of steps and some wrong turns!
                                </p>

                                <div className="space-y-4">
                                    <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-400">
                                        <h4 className="font-bold text-red-800 mb-1">🚧 Obstacle 1: "Provider not enabled"</h4>
                                        <p className="text-sm">Google login didn't work at first because we had to <em>manually</em> turn it on in the Supabase dashboard. It's not automatic!</p>
                                    </div>

                                    <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
                                        <h4 className="font-bold text-yellow-800 mb-1">🔑 Obstacle 2: Client IDs and Secrets</h4>
                                        <p className="text-sm">We had to find the Google Client ID and Client Secret and paste them in the right place. It was confusing because there are so many different IDs!</p>
                                    </div>

                                    <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                                        <h4 className="font-bold text-blue-800 mb-1">🔄 Obstacle 3: Switching between apps</h4>
                                        <p className="text-sm">We had to jump between Supabase Dashboard, Google Cloud Console, and Vercel — like following a treasure map with clues in different rooms!</p>
                                    </div>
                                </div>

                                <p className="text-center font-handwritten text-lg text-green-700">
                                    But we made it work! Users can now log in with Google. 🎉
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Session Stats */}
                    <div className="bg-white p-6 rounded-lg shadow-lifted border border-gray-200 rotate-[-1deg]">
                        <h3 className="font-header text-2xl text-ink mb-4">Dev Session Stats 📊</h3>
                        <div className="grid grid-cols-2 gap-4 text-center">
                            <div className="bg-purple-50 p-4 rounded-lg">
                                <div className="text-3xl font-bold text-purple-700">7</div>
                                <div className="text-sm text-gray-600">HP books covered</div>
                            </div>
                            <div className="bg-amber-50 p-4 rounded-lg">
                                <div className="text-3xl font-bold text-amber-700">100</div>
                                <div className="text-sm text-gray-600">trivia questions</div>
                            </div>
                            <div className="bg-green-50 p-4 rounded-lg">
                                <div className="text-3xl font-bold text-green-700">~45</div>
                                <div className="text-sm text-gray-600">minutes total</div>
                            </div>
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <div className="text-3xl font-bold text-blue-700">3</div>
                                <div className="text-sm text-gray-600">obstacles overcome</div>
                            </div>
                        </div>
                    </div>

                    {/* The Roadmap */}
                    <div className="relative my-12">
                        <div className="tape -top-3 right-6 w-28 bg-pink-200/50 rotate-1"></div>
                        <div className="bg-pink-50 p-8 rounded-xl border-2 border-dashed border-pink-200">
                            <h3 className="font-header text-3xl text-pink-800 mb-6 text-center">What's Next? The Roadmap 🗺️</h3>

                            <p className="mb-4">
                                We also created a <strong>commercial roadmap</strong> for FandomTrivia! Here are the top priorities:
                            </p>

                            <div className="space-y-3">
                                <div className="flex items-center gap-3 bg-white p-3 rounded-lg border border-pink-100">
                                    <span className="bg-pink-200 text-pink-800 text-xs font-bold px-2 py-1 rounded">🏆 1</span>
                                    <span>Add HP Books 3–7 trivia</span>
                                </div>
                                <div className="flex items-center gap-3 bg-white p-3 rounded-lg border border-pink-100">
                                    <span className="bg-pink-200 text-pink-800 text-xs font-bold px-2 py-1 rounded">🏆 2</span>
                                    <span>Share Results Card (so friends can see your score!)</span>
                                </div>
                                <div className="flex items-center gap-3 bg-white p-3 rounded-lg border border-pink-100">
                                    <span className="bg-pink-200 text-pink-800 text-xs font-bold px-2 py-1 rounded">🏆 3</span>
                                    <span>Daily Challenge mode</span>
                                </div>
                                <div className="flex items-center gap-3 bg-white p-3 rounded-lg border border-pink-100">
                                    <span className="bg-pink-200 text-pink-800 text-xs font-bold px-2 py-1 rounded">🏆 4</span>
                                    <span>Supabase Leaderboard (global rankings!)</span>
                                </div>
                            </div>

                            <p className="text-center font-handwritten text-lg text-pink-700 mt-6">
                                FandomTrivia is growing from a fun project into something real! 🌟
                            </p>
                        </div>
                    </div>

                    {/* Key Takeaway */}
                    <div className="bg-gray-100 p-6 rounded-lg rotate-[-1deg] shadow-inner">
                        <h3 className="font-header text-xl text-gray-700 mb-3">Key Takeaway 💡</h3>
                        <p className="font-handwritten text-lg text-gray-600">
                            Today I learned that you can use <strong>multiple AI tools together</strong> to build bigger things.
                            NotebookLM creates the content, Antigravity writes the code, and together they're unstoppable!
                            Setting up auth was tricky (like a treasure hunt 🗺️), but patience and following the steps got us there.
                        </p>
                    </div>

                </div>
            </div>
        </article>
    );
};

export default FandomTriviaV2;
