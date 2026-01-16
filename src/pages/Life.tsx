import { Link } from 'react-router-dom';

const Life = () => {
    return (
        <div className="space-y-32">
            {/* Header: My Story */}
            <header className="relative pt-12 text-center">
                <div className="inline-block relative">
                    <div className="tape -top-6 left-1/2 -translate-x-1/2 w-48 rotate-[-2deg]"></div>
                    <div className="paper-sheet rotate-1 max-w-3xl mx-auto">
                        <h1 className="font-header text-6xl text-ink mb-6">Luna's Blog</h1>
                        <p className="font-handwritten text-xl text-pencil leading-relaxed max-w-2xl mx-auto">
                            My thoughts, stories, and research notes. 📝
                        </p>
                    </div>
                </div>
            </header>

            {/* Real World Stats */}
            <section className="max-w-5xl mx-auto px-4">
                <h2 className="font-header text-4xl text-center mb-12 flex items-center justify-center gap-3">
                    <span className="material-symbols-outlined text-4xl">fitness_center</span>
                    Real World Stats
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Badminton */}
                    <div className="bg-white p-6 rounded-xl shadow-lifted border-2 border-dashed border-gray-200 transform rotate-[-2deg] hover:rotate-0 transition-transform">
                        <div className="text-center mb-4">
                            <span className="material-symbols-outlined text-5xl text-blue-500">sports_tennis</span>
                        </div>
                        <h3 className="font-doodle text-xl font-bold text-center mb-2">Badminton</h3>
                        <p className="font-handwritten text-center text-gray-500">Level: Fast Feet 🏃‍♀️</p>
                        <div className="mt-4 bg-gray-100 rounded-full h-3 overflow-hidden">
                            <div className="bg-blue-400 h-full w-[60%]"></div>
                        </div>
                        <p className="text-xs text-right mt-1 font-mono text-gray-400">1 Year EXP</p>
                    </div>

                    {/* Piano */}
                    <div className="bg-white p-6 rounded-xl shadow-lifted border-2 border-dashed border-gray-200 transform rotate-1 hover:rotate-0 transition-transform">
                        <div className="text-center mb-4">
                            <span className="material-symbols-outlined text-5xl text-pink-500">piano</span>
                        </div>
                        <h3 className="font-doodle text-xl font-bold text-center mb-2">Piano</h3>
                        <p className="font-handwritten text-center text-gray-500">Level: Mozart Jr. 🎹</p>
                        <div className="mt-4 bg-gray-100 rounded-full h-3 overflow-hidden">
                            <div className="bg-pink-400 h-full w-[85%]"></div>
                        </div>
                        <p className="text-xs text-right mt-1 font-mono text-gray-400">3 Years EXP</p>
                    </div>

                    {/* Lego */}
                    <div className="bg-white p-6 rounded-xl shadow-lifted border-2 border-dashed border-gray-200 transform rotate-2 hover:rotate-0 transition-transform">
                        <div className="text-center mb-4">
                            <span className="material-symbols-outlined text-5xl text-yellow-500">extension</span>
                        </div>
                        <h3 className="font-doodle text-xl font-bold text-center mb-2">Lego</h3>
                        <p className="font-handwritten text-center text-gray-500">Level: Master Builder 🏗️</p>
                        <div className="mt-4 bg-gray-100 rounded-full h-3 overflow-hidden">
                            <div className="bg-yellow-400 h-full w-[99%]"></div>
                        </div>
                        <p className="text-xs text-right mt-1 font-mono text-gray-400">Lifetime EXP</p>
                    </div>
                </div>
            </section>

            {/* Learning Journal (Blog) */}
            <section className="max-w-4xl mx-auto px-4 pb-20">
                <div className="relative mb-16">
                    <h2 className="font-header text-5xl text-center z-10 relative">My Learning Journal</h2>
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-pencil/10 -z-0"></div>
                </div>

                <div className="space-y-16">
                    {/* Entry 1: Gemini Report */}
                    <div className="newspaper-clipping relative group cursor-pointer hover:-translate-y-2 transition-transform">
                        <div className="absolute -top-4 -right-4 w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white font-bold shadow-md rotate-12 z-20">
                            NEW!
                        </div>
                        <h3 className="font-marker text-3xl mb-2 text-ink">The AI Architect's Report</h3>
                        <p className="font-mono text-xs text-gray-500 mb-4">Filed under: #Gemini #NotebookLM #Research</p>
                        <div className="font-note text-lg leading-relaxed text-justify space-y-4 opacity-80 decoration-slice">
                            <p>
                                <b>Subject:</b> Analysis of Gemini and NotebookLM capabilities.<br />
                                <b>Status:</b> Mind-blown. 🤯
                            </p>
                            <p>
                                I've been experimenting with using Gemini not just as a chatbot, but as a co-architect.
                                Combined with NotebookLM, it's like having a library that talks back to you.
                                We are entering an era where "learning" means "synthesizing" faster than ever before...
                            </p>
                            <p className="italic text-sm text-gray-600">
                                [Full report content from "Stella Gemini and Notebooklm Report.pdf" available...]
                            </p>
                        </div>
                        <div className="mt-6 text-center">
                            <Link to="/blog/gemini-report" className="inline-block bg-ink text-white font-doodle py-2 px-6 rounded-sm rotate-1 hover:scale-105 transition-transform">Read Full Entry</Link>
                        </div>
                    </div>

                    {/* Entry 2: Superlinear */}
                    <div className="blog-entry transform -rotate-1">
                        <div className="tape -top-3 left-1/2 -translate-x-1/2 rotate-[-2deg]"></div>
                        <h3 className="font-header text-3xl mb-2 text-ink">The Superlinear Path</h3>
                        <p className="font-mono text-xs text-gray-500 mb-4">Filed under: #Growth #Math #Philosophy</p>
                        <div className="font-handwritten text-xl leading-relaxed text-gray-700">
                            <p className="mb-4">
                                "Linear growth is boring. Exponential is scary. Superlinear is where the magic happens."
                            </p>
                            <p>
                                I learned that learning doesn't happen in a straight line. It's like a staircase, or sometimes a rocket launch.
                                You struggle, struggle, struggle, and then... ZOOM! 🚀
                            </p>
                            <p className="italic text-sm text-gray-500 mt-4">
                                [Notes from "Stella Superlinear .pdf"]
                            </p>
                        </div>
                        <div className="mt-6 text-right">
                            <Link to="/blog/superlinear" className="inline-block text-blue-600 font-bold hover:underline decoration-wavy">Continue Reading &rarr;</Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Life;
