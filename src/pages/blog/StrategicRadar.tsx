import { Link } from 'react-router-dom';

const StrategicRadar = () => {
    return (
        <article className="max-w-4xl mx-auto pt-12 pb-20">
            <Link to="/blog" className="inline-block mb-8 text-pencil hover:text-ink font-handwritten">&larr; Back to Journal</Link>

            <div className="paper-sheet relative overflow-hidden">
                <div className="tape -top-4 left-1/2 -translate-x-1/2 w-40 rotate-1"></div>

                {/* Header */}
                <div className="text-center mb-12 border-b-2 border-dashed border-gray-300 pb-8">
                    <h1 className="font-header text-4xl md:text-6xl text-ink mb-4">Strategic Information Radar 📡</h1>
                    <p className="font-handwritten text-xl text-pencil">The Missing Puzzle Piece</p>
                    <div className="mt-4 inline-block bg-blue-100 px-3 py-1 text-sm font-mono rotate-[-2deg] shadow-sm">
                        Jan 25, 2026
                    </div>
                </div>

                <div className="space-y-12 font-serif text-lg leading-relaxed text-gray-800">

                    {/* Intro */}
                    <div className="prose prose-lg max-w-none">
                        <p>
                            Today we made a scanner to scan for important and not helpful stuff. We forgot to give AI one missing piece of information.
                            It was like losing a puzzle piece. If I were doing this project again, I would remember to add the puzzle piece or piece of information.
                        </p>
                        <p className="font-bold text-ink mt-4">
                            What information? Real life information.
                        </p>
                    </div>

                    {/* The Missing Prompts */}
                    <div className="bg-yellow-50 p-6 rounded-lg rotate-1 shadow-lifted border border-yellow-100">
                        <h3 className="font-header text-2xl text-yellow-800 mb-4">The Missing Context</h3>
                        <p className="mb-4">First, I missed this prompt context for the MVP:</p>

                        <div className="bg-white p-4 rounded border border-yellow-200 font-mono text-sm overflow-x-auto">
                            <p className="mb-2"><strong>1. Core Context & Goal:</strong><br />
                                "Our project's primary strategic focus is on competitor breakthroughs related to 'video lip-sync' and 'real-time generation' technologies."</p>

                            <p className="mb-2"><strong>2. Technology & Tools:</strong><br />
                                Use AI Builder Student Portal API with openai SDK and supermind-agent-v1 model.</p>

                            <p className="mb-2"><strong>3. Backend (FastAPI):</strong><br />
                                POST /run-scan executing a Two-Stage Scan (Broad Scan &rarr; Deep Dive Analysis).</p>

                            <p><strong>4. Front-End:</strong><br />
                                Simple "Start Scan" button and JSON report renderer.</p>
                        </div>

                        <p className="mt-4">
                            Second, I missed telling AI what I like and what I don't like.
                        </p>
                    </div>

                    {/* Wayne's Advice */}
                    <div className="relative my-12">
                        <div className="tape -top-3 right-10 w-24 bg-blue-200/50 rotate-2"></div>
                        <div className="bg-blue-50 p-8 rounded-xl border-2 border-dashed border-blue-200">
                            <h3 className="font-header text-3xl text-blue-800 mb-6 text-center">How Wayne Helped 🧙‍♂️</h3>

                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="font-bold text-blue-600 min-w-[60px]">Luna:</div>
                                    <div className="font-handwritten text-lg">He told me what I did wrong.</div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="font-bold text-purple-600 min-w-[60px]">Wayne:</div>
                                    <div className="font-handwritten text-lg italic">
                                        He first understands your progress in the course, then he's in Luna's shoes to find out what Luna might miss.
                                        <br /><br />
                                        He instructs how to add missing pieces Luna can fit in first, bringing the bridge between Gemini and Luna.
                                        <br /><br />
                                        He compares the final result between the mock data and the real result of the class demos to realize what part is missing.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Technical Retrospective */}
                    <div className="bg-gray-100 p-6 rounded-lg rotate-[-1deg] shadow-inner">
                        <h3 className="font-header text-xl text-gray-700 mb-3">Technical Retrospective</h3>
                        <p className="font-mono text-sm text-gray-600 mb-2">
                            <strong>Basic Question:</strong> LLM, where is it provider? What tools are use? What context?
                        </p>
                        <p className="font-mono text-sm text-gray-600">
                            <strong>Answer:</strong> The API key is from the AI Builder Student Portal. Antigravity likely used <code>web_search</code> and <code>read_page</code> tools to preserve the RAG functionality.
                        </p>
                    </div>

                </div>
            </div>
        </article>
    );
};

export default StrategicRadar;
