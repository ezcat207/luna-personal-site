import { Link } from 'react-router-dom';

const GeminiReport = () => {
    return (
        <article className="max-w-3xl mx-auto pt-12 pb-20">
            <Link to="/life" className="inline-block mb-8 text-pencil hover:text-ink font-handwritten">&larr; Back to Journal</Link>

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

                <div className="font-serif text-lg leading-relaxed text-gray-800 space-y-6 columns-1">
                    <p className="first-letter:text-5xl first-letter:float-left first-letter:mr-3 first-letter:font-bold first-letter:text-ink">
                        I used to think AI was just a chatbot. You ask it a question, it gives an answer. Boring.
                        But then I met <b>Gemini</b> and <b>NotebookLM</b>.
                    </p>
                    <p>
                        <b>The Experiment:</b> I fed all my scattered notes about "World Building" into NotebookLM.
                        Instead of just summarizing them, it started acting like a co-architect. It asked me questions I hadn't thought of!
                    </p>

                    <blockquote className="border-l-4 border-blue-400 pl-4 italic text-gray-600 my-6 bg-blue-50 p-4">
                        "The most powerful tool for a creator isn't a faster pencil. It's a mirror that reflects your ideas back to you with new angles."
                    </blockquote>

                    <h3 className="font-bold text-2xl font-header mt-8 mb-4">Finding Patterns</h3>
                    <p>
                        Human brains are great at dreaming, but sometimes we lose the details. AI is great at details but can't dream.
                        When we work together, it's like... "Vibe Coding". I bring the vibe, it brings the code.
                    </p>
                    <p>
                        I learned that I can be an <i>Architect</i> of systems, not just a writer of words.
                    </p>

                    <div className="bg-yellow-100 p-4 rotate-1 shadow-sm mt-8 font-handwritten text-ink">
                        <b>Conclusion:</b>
                        AI doesn't replace creativity. It's a trampoline. You still have to jump, but you go way higher.
                    </div>
                </div>
            </div>
        </article>
    );
};

export default GeminiReport;
