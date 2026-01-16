import { Link } from 'react-router-dom';

const GeminiCanvas = () => {
    return (
        <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">
            <Link to="/blog" className="inline-flex items-center gap-2 text-pencil hover:text-ink transition-colors font-handwritten text-lg">
                <span className="material-symbols-outlined">arrow_back</span>
                Back to Timeline
            </Link>

            <header className="text-center relative">
                <div className="tape -top-4 right-20 rotate-[-5deg]"></div>
                <div className="paper-sheet rotate-2 inline-block p-8">
                    <span className="font-mono text-xs text-gray-400 block mb-2">Dec 24, 2025</span>
                    <h1 className="font-header text-4xl md:text-5xl text-ink">My New Tools: Gemini & Canvas 🎨</h1>
                </div>
            </header>

            <article className="paper-sheet torn-edge bg-white/80 p-8 md:p-12 font-note text-xl leading-relaxed space-y-6 text-ink">
                <p>
                    Merry Christmas Eve! 🎄 I've been playing with some new AI toys.
                    I asked: <i>"What canvas do?"</i>
                </p>
                <p>
                    Use Gemini Canvas is like having a super-powered whiteboard. It helps me make things that are more "controllable" than just chatting.
                </p>

                <div className="my-8 polaroid rotate-[-2deg] max-w-md mx-auto">
                    <img src="/assets/blog/gemini/image3.png" alt="Gemini Canvas Fireworks" className="w-full h-auto" />
                    <p className="font-handwritten text-center mt-2 text-sm text-gray-500">Making a Fireworks Generator! 🎆</p>
                </div>

                <h3 className="font-header text-3xl mt-8">The Prompt</h3>
                <div className="bg-gray-800 text-green-400 p-4 rounded-lg font-mono text-sm shadow-inner">
                    &gt; Build a fireworks generator
                </div>
                <p>
                    And it actually worked! It's not just about asking questions, it's about <b>building</b> together.
                </p>
            </article>
        </div>
    );
};

export default GeminiCanvas;
