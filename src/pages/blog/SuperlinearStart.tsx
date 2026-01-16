import { Link } from 'react-router-dom';

const SuperlinearStart = () => {
    return (
        <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">
            {/* Navigation */}
            <Link to="/blog" className="inline-flex items-center gap-2 text-pencil hover:text-ink transition-colors font-handwritten text-lg">
                <span className="material-symbols-outlined">arrow_back</span>
                Back to Timeline
            </Link>

            {/* Header */}
            <header className="text-center relative">
                <div className="tape -top-4 left-1/2 -translate-x-1/2 rotate-2"></div>
                <div className="paper-sheet rotate-[-1deg] inline-block p-8">
                    <span className="font-mono text-xs text-gray-400 block mb-2">Dec 15, 2025</span>
                    <h1 className="font-header text-4xl md:text-5xl text-ink">What is Superlinear? 🚀</h1>
                </div>
            </header>

            {/* Content Body */}
            <article className="paper-sheet torn-edge bg-white/80 p-8 md:p-12 font-note text-xl leading-relaxed space-y-6 text-ink">
                <p>
                    Today I learned a new word: <b>Superlinear</b>. It sounds like a superhero name, but it's actually math! 🤓
                </p>
                <p>
                    If you have a company (or even just a lemonade stand!), you want it to grow fast.
                    <b>Linear growth</b> is simpler: 1, 2, 3, 4... it's a straight line.
                    But <b>Superlinear growth</b> is like a rocket: 1, 2, 4, 8, 16, 32... 🚀
                </p>

                <div className="my-8 p-6 bg-yellow-50 border-2 border-dashed border-yellow-200 rotate-1">
                    <h3 className="font-header text-2xl mb-4">Luna's Math Note:</h3>
                    <p className="font-handwritten text-pencil">
                        "If A = 1, then the output is always 1. You stay the same.<br />
                        But if A = 1.1... the output is <b>limitless!</b>" ✨
                    </p>
                </div>

                <h3 className="font-header text-3xl mt-8">Coding: The Hard Way vs. The Smart Way</h3>
                <p>
                    I realized there are two ways to correct files on my computer:
                </p>
                <ul className="list-disc pl-6 space-y-2 marker:text-blue-400">
                    <li><b>Linear Way:</b> Make a folder, drag a file. Make a folder, drag a file. (So boring!) 😴</li>
                    <li><b>Superlinear Way:</b> Write a Python script to do it for me! 🐍</li>
                </ul>
                <p>
                    It might take longer to write the code at first, but if I have 1,000,000 files, the script finishes in 1 second.
                    That is <b>investing time to save time</b>. That is Superlinear.
                </p>
            </article>
        </div>
    );
};

export default SuperlinearStart;
