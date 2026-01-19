import { Link } from 'react-router-dom';

const GeminiReport = () => {
    return (
        <article className="max-w-3xl mx-auto pt-12 pb-20">
            <Link to="/blog" className="inline-block mb-8 text-pencil hover:text-ink font-handwritten">&larr; Back to Journal</Link>

            <div className="bg-white p-8 md:p-12 shadow-lifted relative overflow-hidden">
                {/* Decorative "Newspaper" Header */}
                <div className="border-b-4 border-double border-gray-800 pb-6 mb-8 text-center">
                    <h1 className="font-marker text-4xl md:text-6xl text-ink uppercase tracking-tight mb-2">The AI Architect</h1>
                    <div className="flex justify-between text-xs font-mono text-gray-500 uppercase tracking-widest border-t border-b border-gray-300 py-1 mt-4">
                        <span>Vol. 1</span>
                        <span>Date: Oct 2025</span>
                        <span>Price: 1 Smile</span>
                    </div>
                </div>

                <div className="font-serif text-lg leading-relaxed text-gray-800 space-y-8 columns-1">
                    {/* Introduction */}
                    <div className="mb-8">
                        <p className="first-letter:text-5xl first-letter:float-left first-letter:mr-3 first-letter:font-bold first-letter:text-ink">
                            I used to think AI was just a chatbot. You ask it a question, it gives an answer. Boring.
                            But then I met <b>Gemini</b> and <b>NotebookLM</b>.
                        </p>
                        <p className="mt-4">
                            It helped me come up with a prompt. One key question: <i>"What can a canvas do?"</i>
                        </p>
                        <p className="mt-4">
                            Prompt: <b>Build a fireworks generator</b>
                        </p>
                    </div>

                    {/* Gemini Section */}
                    <div className="relative bg-blue-50 p-6 rounded-lg shadow-sm border border-blue-100 rotate-1 my-8">
                        <div className="tape -top-3 left-1/2 -translate-x-1/2 w-24 bg-blue-200/50 h-6 absolute rotate-[-2deg]"></div>
                        <h2 className="font-header text-3xl text-blue-800 mb-4">1. Gemini & Canvas</h2>
                        <p className="mb-4">
                            Gemini isn't just for talking. It's for building. I used it to make a <b>Fireworks Generator</b>!
                        </p>

                        <div className="my-4 rotate-[-1deg] shadow-md border-4 border-white">
                            <img src="/assets/blog/gemini/image1.png" alt="Gemini Canvas Screenshot" className="w-full" onError={(e) => { e.currentTarget.style.display = 'none' }} />
                        </div>

                        <p>
                            Tools used: <a href="https://gemini.google.com/app/74cbf04167072c30" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline decoration-wavy">Canvas</a>.
                            It's related to <a href="https://ai.studio/apps/drive/1rHsBx6J6na1Iw2Ds7okJGvyH4er_D5tX" className="text-blue-600 hover:underline">ai.dev</a> (more controllable).
                        </p>
                    </div>

                    {/* NotebookLM Section */}
                    <div className="relative bg-yellow-50 p-6 rounded-lg shadow-md border border-yellow-100 rotate-[-1deg] my-8">
                        <div className="tape -top-3 right-10 w-24 bg-yellow-200/50 h-6 absolute rotate-2"></div>
                        <h2 className="font-header text-3xl text-yellow-800 mb-4">2. NotebookLM</h2>

                        <div className="mb-4 rotate-1 shadow-md border-4 border-white">
                            <img src="/assets/blog/gemini/image2.png" alt="NotebookLM Interface" className="w-full" onError={(e) => { e.currentTarget.style.display = 'none' }} />
                        </div>

                        <p className="mb-4">
                            <a href="https://notebooklm.google.com/" className="text-yellow-700 underline font-bold">NotebookLM</a> is like a second brain.
                            You give it sources, and you can chat with it, make mind maps, and quizzes.
                        </p>
                        <p className="italic text-gray-600 border-l-2 border-yellow-400 pl-4 my-2">
                            "NotebookLM is like you tell it to make some things and it makes it organized."
                        </p>
                        <p className="mt-4">
                            <b>Why use it?</b> To organize scattered thoughts. <br />
                            <b>Who looks at it?</b> My family. <br />
                            <b>Will it help?</b> Yes, it organizes the chaos.
                        </p>
                    </div>

                    {/* AI Quests Section */}
                    <div className="my-10">
                        <h2 className="font-header text-4xl text-ink mb-6 text-center underline decoration-green-300 decoration-4">3. Google AI Quests</h2>
                        <p className="text-xl mb-6">
                            <a href="https://research.google/ai-quests/intl/en_gb/map" className="text-green-600 font-bold hover:text-green-800">AI Quests</a> are like training with a game instead of real life.
                        </p>

                        <div className="my-6 rotate-[-1deg] shadow-lg border-8 border-white bg-white p-2">
                            <img src="/assets/blog/gemini/image3.png" alt="AI Quests Map" className="w-full" onError={(e) => { e.currentTarget.style.display = 'none' }} />
                            <p className="text-center font-handwritten text-gray-500 text-sm mt-2">The Quest Map</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-handwritten text-lg">
                            <div className="bg-white p-4 shadow-lifted rotate-1">
                                <h3 className="font-bold text-center border-b border-gray-200 pb-2 mb-2">Step 1 & 2</h3>
                                <p>Collect information around the forest. Choose the "wrong" information to switch out.</p>
                            </div>
                            <div className="bg-white p-4 shadow-lifted rotate-[-1deg]">
                                <h3 className="font-bold text-center border-b border-gray-200 pb-2 mb-2">Step 3 & 4</h3>
                                <p>Choose 4 things you found, test it with the AI model, and improve it!</p>
                            </div>
                        </div>

                        <div className="mt-8 bg-green-50 p-6 rounded-xl border border-green-200">
                            <h3 className="font-bold text-green-800 text-xl mb-4 text-center">Researcher Reflection</h3>

                            <div className="space-y-6">
                                <div>
                                    <h4 className="font-bold text-green-700 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-sm">target</span>
                                        The Mission: Market Marshes
                                    </h4>
                                    <p className="mt-1">
                                        The flood forecasting quest was the most compelling. It was harder because you always sometimes had to redo some things to help
                                        <b> Market Marshes</b> be able to clean up faster before the flood comes in.
                                    </p>
                                </div>

                                <div>
                                    <h4 className="font-bold text-green-700 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-sm">settings_suggest</span>
                                        The Workflow & Humility
                                    </h4>
                                    <p className="mt-1">
                                        Data collection, model training, and testing were all part of the job. I didn't have a "most difficult" stage because you would always find
                                        a solution if there was a problem. The course emphasizes that "AI is not magic"—it's an engineering challenge!
                                    </p>
                                </div>

                                <div>
                                    <h4 className="font-bold text-green-700 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-sm">warning</span>
                                        Data & Bias
                                    </h4>
                                    <p className="mt-1">
                                        AI is only as good as the data it’s fed. Identifying bias in the system is crucial. If I were to explain it to a friend, I'd say
                                        AI bias is like teaching a computer only half the truth and expecting it to know everything.
                                    </p>
                                </div>

                                <div className="border-t border-green-200 pt-4">
                                    <h4 className="font-bold text-green-700 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-sm">favorite</span>
                                        Real-World Impact
                                    </h4>
                                    <p className="mt-1 font-handwritten text-lg">
                                        I feel more confident about AI's role in our future after seeing how it's built responsibly.
                                        Role-playing as a researcher actually made me more interested in a career in STEM! 🚀
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Opal Section */}
                    <div className="my-8 p-6 border-2 border-purple-200 rounded-lg bg-purple-50">
                        <h2 className="font-header text-3xl text-purple-800 mb-4">4. Opal</h2>
                        <p className="mb-4">
                            Another cool tool: <a href="https://opal.google/?flow=drive:/16wYi66JS4a7NO1dIZuGjmz62UlfBn5vm&mode=canvas" className="text-purple-600 underline">Opal</a>.
                        </p>
                        <div className="my-4 shadow-md rotate-1 border-4 border-white">
                            <img src="/assets/blog/gemini/image4.png" alt="Opal Interface" className="w-full" onError={(e) => { e.currentTarget.style.display = 'none' }} />
                        </div>
                    </div>

                    {/* Antigravity Section */}
                    <div className="my-8 relative bg-pink-50 p-6 rounded-lg shadow-lifted">
                        <div className="tape -top-3 left-1/2 -translate-x-1/2 w-32 bg-pink-200/50 h-6 absolute rotate-1"></div>
                        <h2 className="font-header text-3xl text-pink-700 mb-4">5. The React Cafe (Antigravity)</h2>
                        <p className="mb-4">
                            I also learned how to work with <b>Antigravity</b> (my AI coding assistant). It's like cooking in a "React Cafe"!
                        </p>
                        <ul className="list-none space-y-3 font-handwritten text-lg">
                            <li className="flex items-start">
                                <span className="mr-2 text-2xl">🍓</span>
                                <span><b>The Ingredients</b> (e.g., constants.tsx): You buy them, but just having them doesn't make a meal.</span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2 text-2xl">🍰</span>
                                <span><b>The Recipe</b> (e.g., MapExplorer.tsx): This is the instruction. "Put the strawberry right in front of the frosting!"</span>
                            </li>
                        </ul>
                        <div className="mt-4 p-4 bg-white border border-pink-100 rounded rotate-[-1deg]">
                            <p className="font-mono text-xs text-gray-500">
                                &gt; git clone https://github.com/stellaruoyu/xmas2025_roadtrip <br />
                                &gt; Commit changes, push to remote.
                            </p>
                        </div>
                    </div>

                    {/* Conclusion */}
                    <div className="bg-pink-100 p-6 rotate-1 shadow-md mt-12 font-handwritten text-ink relative">
                        <div className="w-4 h-4 rounded-full bg-red-800 opacity-20 absolute top-2 left-1/2 -translate-x-1/2"></div>
                        <h3 className="font-bold text-2xl mb-2 text-center text-pink-700">Final Thoughts</h3>
                        <p>
                            Completing these quests meant stepping into the shoes of a researcher.
                            AI doesn't replace creativity. It's a trampoline. You still have to jump, but you go way higher.
                        </p>
                        <div className="mt-4 text-xs font-mono text-gray-500 text-right">
                            - Luna, Future AI Architect
                        </div>
                    </div>

                    <div className="mt-12 p-4 border-2 border-dashed border-gray-300 rounded text-center text-gray-400 text-sm">
                        (Note: Original report generated via NotebookLM & Gemini)
                    </div>
                </div>
            </div>
        </article>
    );
};

export default GeminiReport;
