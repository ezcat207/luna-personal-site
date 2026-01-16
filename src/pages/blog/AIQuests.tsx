import { Link } from 'react-router-dom';

const AIQuests = () => {
    return (
        <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">
            <Link to="/blog" className="inline-flex items-center gap-2 text-pencil hover:text-ink transition-colors font-handwritten text-lg">
                <span className="material-symbols-outlined">arrow_back</span>
                Back to Timeline
            </Link>

            <header className="text-center relative">
                <div className="paper-sheet rotate-3 inline-block p-8 border-b-8 border-green-200">
                    <span className="font-mono text-xs text-gray-400 block mb-2">Jan 05, 2026</span>
                    <h1 className="font-header text-4xl md:text-5xl text-ink">Quest Completed: Market Marshes 🌍</h1>
                </div>
            </header>

            <article className="paper-sheet torn-edge bg-white/80 p-8 md:p-12 font-note text-xl leading-relaxed space-y-6 text-ink">
                <p>
                    I did a training mission! Google has these <b className="text-green-600">AI Quests</b> that are like video games but for research.
                </p>

                <div className="bg-green-50 p-6 rounded-lg border border-green-200 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-green-200 text-green-800 text-xs font-bold px-2 py-1">MISSION LOG</div>
                    <ul className="list-decimal pl-6 space-y-2 marker:font-bold">
                        <li><b>Target:</b> Flood Forecasting in "Market Marshes"</li>
                        <li><b>Goal:</b> Help the town clean up fast before the flood comes! 🌊</li>
                        <li><b>Difficulty:</b> Hard! I had to redo things many times.</li>
                    </ul>
                </div>

                <p>
                    I learned that <b>AI is not magic</b>. It's only as good as the data you feed it.
                    If you give it bad data, it makes bad predictions (and the town gets flooded!).
                    Completing this made me feel like a real researcher tackling massive world problems. 👩‍🔬
                </p>

                <div className="polaroid max-w-md mx-auto rotate-[-1deg] mt-8">
                    <img src="/assets/blog/gemini/image4.png" alt="AI Quest Map" className="w-full h-auto" />
                    <p className="font-handwritten text-center mt-2 text-sm text-gray-500">Quest Map Overview</p>
                </div>
            </article>
        </div>
    );
};

export default AIQuests;
