import { Link } from 'react-router-dom';
import strategicRadarBusiness from '../../assets/strategic-radar-business.png';
import strategicRadarPersonal from '../../assets/strategic-radar-personal.png';
import strategicRadarDetail from '../../assets/strategic-radar-detail.png';
import comicStrip1 from '../../assets/comic-strip-1.jpeg';
import comicStrip2 from '../../assets/comic-strip-2.jpeg';
import comicStrip3 from '../../assets/comic-strip-3.jpeg';

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

                    {/* The Journey in Comics */}
                    <div className="space-y-8 mb-12">
                        <h3 className="font-header text-3xl text-ink mb-6 text-center border-b-2 border-dotted border-gray-300 pb-2">The Journey in Comics 🎨</h3>

                        <div className="space-y-8 px-4">
                            <div className="rounded-xl overflow-hidden shadow-md border-4 border-white rotate-2 bg-white transform hover:scale-[1.02] transition-transform duration-300">
                                <img src={comicStrip1} alt="Development Journey Comic Part 1" className="w-full h-auto" />
                            </div>
                            <div className="rounded-xl overflow-hidden shadow-md border-4 border-white rotate-[-1deg] bg-white transform hover:scale-[1.02] transition-transform duration-300">
                                <img src={comicStrip2} alt="Development Journey Comic Part 2" className="w-full h-auto" />
                            </div>
                            <div className="rounded-xl overflow-hidden shadow-md border-4 border-white rotate-1 bg-white transform hover:scale-[1.02] transition-transform duration-300">
                                <img src={comicStrip3} alt="Development Journey Comic Part 3" className="w-full h-auto" />
                            </div>
                        </div>
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

                    {/* Errors, Trials, and Triumphs */}
                    <div className="space-y-8">
                        <h3 className="font-header text-3xl text-ink mb-6 text-center border-b-2 border-dotted border-gray-300 pb-2">Errors, Trials, and Triumphs 🛠️</h3>

                        <div className="bg-red-50 p-6 rounded-lg shadow-sm border-l-4 border-red-400">
                            <h4 className="font-bold text-lg text-red-800 mb-2">1. The "Connection Refused" Error</h4>
                            <p className="text-sm"><span className="font-bold">The Issue:</span> Early in testing, we tried to view the web page but got a browser error (ERR_CONNECTION_REFUSED).</p>
                            <p className="text-sm"><span className="font-bold">The Cause:</span> I had run the automated tests (test_app.py) but forgot to leave the actual uvicorn server running as a background process.</p>
                            <p className="text-sm"><span className="font-bold">The Fix:</span> Started the server with <code>uvicorn main:app --reload</code>.</p>
                        </div>

                        <div className="bg-yellow-50 p-6 rounded-lg shadow-sm border-l-4 border-yellow-400">
                            <h4 className="font-bold text-lg text-yellow-800 mb-2">2. The "Static Content" Limitation</h4>
                            <p className="text-sm"><span className="font-bold">The Issue:</span> The initial prototype returned the exact same hardcoded "mock" results every time.</p>
                            <p className="text-sm"><span className="font-bold">The Feedback:</span> User requested: "Make it so that every time you run the scan, it's different."</p>
                            <p className="text-sm"><span className="font-bold">The Fix:</span> Modified scanner.py to use random.sample() from a pool of topics and findings, creating a dynamic feel for the demo.</p>
                        </div>

                        <div className="bg-purple-50 p-6 rounded-lg shadow-sm border-l-4 border-purple-400">
                            <h4 className="font-bold text-lg text-purple-800 mb-2">3. UI Overhaul (The "Radar" Look)</h4>
                            <p className="text-sm"><span className="font-bold">The Issue:</span> The initial dark-mode UI was generic.</p>
                            <p className="text-sm"><span className="font-bold">The Feedback:</span> User provided a specific design image ("Strategic Information Radar" with light theme and two distinct sections).</p>
                            <p className="text-sm"><span className="font-bold">The Fix:</span> Rewrote style.css, updated index.html, and added realistic finding data.</p>
                        </div>

                        <div className="bg-green-50 p-6 rounded-lg shadow-sm border-l-4 border-green-400">
                            <h4 className="font-bold text-lg text-green-800 mb-2">4. The Pivot to Real AI</h4>
                            <p className="text-sm"><span className="font-bold">The Issue:</span> The "mock" data was good for a demo, but the goal was a real tool.</p>
                            <p className="text-sm"><span className="font-bold">The Fix:</span> Integrated AI Builder Student Portal API and implemented Two-Stage Logic (Search &rarr; Analyze).</p>
                        </div>

                        <div className="bg-blue-50 p-6 rounded-lg shadow-sm border-l-4 border-blue-400">
                            <h4 className="font-bold text-lg text-blue-800 mb-2">5. Personalization (The "Cool Stuff" Tab)</h4>
                            <p className="text-sm"><span className="font-bold">The Issue:</span> The scanner was stuck on "Business Mode".</p>
                            <p className="text-sm"><span className="font-bold">The Fix:</span> Created interview.md to capture user interests and refactored backend.</p>
                        </div>

                        <div className="space-y-6 mt-8">
                            <div className="rounded-xl overflow-hidden shadow-lg border-4 border-white rotate-1">
                                <img src={strategicRadarBusiness} alt="Strategic Radar Business View" className="w-full h-auto" />
                                <div className="bg-gray-800 text-white text-xs p-2 text-center">Strategic Radar (Business Mode)</div>
                            </div>
                            <div className="rounded-xl overflow-hidden shadow-lg border-4 border-white rotate-[-1deg]">
                                <img src={strategicRadarPersonal} alt="Strategic Radar Personal View" className="w-full h-auto" />
                                <div className="bg-gray-800 text-white text-xs p-2 text-center">My Cool Stuff (Personal Mode)</div>
                            </div>
                            <div className="rounded-xl overflow-hidden shadow-lg border-4 border-white rotate-1">
                                <img src={strategicRadarDetail} alt="Strategic Radar Detail View" className="w-full h-auto" />
                                <div className="bg-gray-800 text-white text-xs p-2 text-center">Broad Scan & Deep Dive Details</div>
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
