import { Link } from 'react-router-dom';

const DadBirthday = () => {
    return (
        <article className="max-w-4xl mx-auto pt-12 pb-20">
            <Link to="/blog" className="inline-block mb-8 text-pencil hover:text-ink font-handwritten">&larr; Back to Journal</Link>

            <div className="paper-sheet relative overflow-hidden">
                <div className="tape -top-4 left-1/2 -translate-x-1/2 w-40 rotate-1"></div>

                {/* Header */}
                <div className="text-center mb-12 border-b-2 border-dashed border-gray-300 pb-8">
                    <h1 className="font-header text-4xl md:text-6xl text-ink mb-4">Happy Birthday Dad! 🎂</h1>
                    <p className="font-handwritten text-xl text-pencil">Celebrating a Classic Man</p>
                    <div className="mt-4 inline-block bg-green-100 px-3 py-1 text-sm font-mono rotate-[-2deg] shadow-sm">
                        Feb 01, 2026
                    </div>
                </div>

                <div className="space-y-12 font-serif text-lg leading-relaxed text-gray-800">

                    {/* Intro */}
                    <div className="prose prose-lg max-w-none text-center">
                        <p className="text-xl italic text-gray-600">
                            "Thank you for being my rock, my guide, and my inspiration. May this year bring you as much joy as you bring to everyone around you."
                        </p>
                    </div>

                    {/* The Code Note */}
                    <div className="relative my-12">
                        <div className="tape -top-3 right-10 w-24 bg-green-200/50 rotate-2"></div>
                        <div className="bg-gray-900 text-gray-100 p-8 rounded-xl border-4 border-gray-800 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-4 right-4 text-xs text-gray-500 font-mono">super_dad.js</div>

                            <pre className="font-mono text-sm overflow-x-auto">
                                {`class SuperDad extends Hero {
  constructor() {
    super();
    this.name = "Wayne";
    this.skills = ["Coding", "Parenting", "Wisdom"];
    this.love = Infinity;
  }
}
// Validated by Unit Tests ✅`}
                            </pre>
                        </div>
                        <p className="text-center mt-4 font-handwritten text-gray-500">Found hidden in the source code!</p>
                    </div>

                    {/* Card Content */}
                    <div className="bg-white p-8 rounded-lg rotate-[-1deg] shadow-lifted border border-gray-200">
                        <h3 className="font-header text-2xl text-ink mb-4">To the Best Dad</h3>
                        <p className="mb-4">
                            We built a special digital birthday card to celebrate his special day. It features a gallery of memories and a surprise interactive section.
                        </p>
                        <p className="mb-4">
                            The highlight? A hidden notebook section revealing the truth: <strong>Wayne is a great coder!</strong>
                        </p>
                        <p className="text-right font-handwritten text-xl text-pencil mt-8">
                            - With love, Luna
                        </p>
                    </div>

                </div>
            </div>
        </article>
    );
};

export default DadBirthday;
