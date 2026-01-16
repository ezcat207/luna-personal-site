import { Link } from 'react-router-dom';

const NotebookLM = () => {
    return (
        <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">
            <Link to="/blog" className="inline-flex items-center gap-2 text-pencil hover:text-ink transition-colors font-handwritten text-lg">
                <span className="material-symbols-outlined">arrow_back</span>
                Back to Timeline
            </Link>

            <header className="text-center relative">
                <div className="tape top-0 left-10 rotate-[-15deg]"></div>
                <div className="paper-sheet rotate-[-1deg] inline-block p-8">
                    <span className="font-mono text-xs text-gray-400 block mb-2">Dec 28, 2025</span>
                    <h1 className="font-header text-4xl md:text-5xl text-ink">My Second Brain: NotebookLM 🧠</h1>
                </div>
            </header>

            <article className="paper-sheet torn-edge bg-white/80 p-8 md:p-12 font-note text-xl leading-relaxed space-y-6 text-ink">
                <p>
                    I found something amazing called <a href="https://notebooklm.google.com" className="text-blue-500 underline decoration-wavy">NotebookLM</a>.
                </p>
                <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="flex-1">
                        <p>
                            You give it sources (PDFs, docs, even websites), and then you can <b>chat with your library</b>!
                            It organizes everything for you. It can even make mind maps and quizzes.
                        </p>
                        <p className="mt-4">
                            I asked it: <i>"Who are you talking to?"</i><br />
                            It feels like I'm talking to my family, but a family that knows EVERYTHING in my books. 📚
                        </p>
                    </div>
                    <div className="flex-1 polaroid rotate-2">
                        <img src="/assets/blog/gemini/image2.png" alt="NotebookLM Interface" className="w-full h-auto" />
                    </div>
                </div>
            </article>
        </div>
    );
};

export default NotebookLM;
