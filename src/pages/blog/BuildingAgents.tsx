import { Link } from 'react-router-dom';

const BuildingAgents = () => {
    return (
        <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">
            <Link to="/blog" className="inline-flex items-center gap-2 text-pencil hover:text-ink transition-colors font-handwritten text-lg">
                <span className="material-symbols-outlined">arrow_back</span>
                Back to Timeline
            </Link>

            <header className="text-center relative">
                <div className="tape -top-5 left-[40%] w-32 rotate-[-2deg]"></div>
                <div className="paper-sheet rotate-[-2deg] inline-block p-8">
                    <span className="font-mono text-xs text-gray-400 block mb-2">Jan 10, 2026</span>
                    <h1 className="font-header text-4xl md:text-5xl text-ink">I Built an AI Agent! (Meet Mr. Wayne) 🤖</h1>
                </div>
            </header>

            <article className="paper-sheet torn-edge bg-white/80 p-8 md:p-12 font-note text-xl leading-relaxed space-y-6 text-ink">
                <p>
                    <b>"Arms and Legs."</b> That's the difference.
                    An AI just talks. An <b>AI Agent</b> has arms and legs (tools) to DO things in the world.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
                    <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200 shadow-lifted transform rotate-[-1deg]">
                        <h3 className="font-header text-2xl text-blue-800 mb-2">Mr. Wayne (Teacher Agent) 🐱</h3>
                        <p>He has the persona of my mentor. He verifies problems (like counting "r"s in strawberry) by writing Python scripts.</p>
                    </div>
                    <div className="bg-pink-50 p-6 rounded-xl border-2 border-pink-200 shadow-lifted transform rotate-1">
                        <h3 className="font-header text-2xl text-pink-800 mb-2">Luna (Student Agent) 🐰</h3>
                        <p>It's me! Even when I'm sleeping, "Luna Agent" can keep learning from Mr. Wayne.</p>
                    </div>
                </div>

                <h3 className="font-header text-3xl mt-8 underline decoration-wavy decoration-pencil/30">My Architecture</h3>
                <div className="font-mono bg-gray-900 text-green-400 p-6 rounded-lg text-sm md:text-base leading-loose shadow-inner">
                    Input &rarr; Think (LLM) &rarr; Tool Use &rarr; Environment<br />
                    Environment &rarr; Observation &rarr; Think (LLM) &rarr; Output
                </div>

                <p className="italic text-gray-600 mt-8">
                    "I feel like I am a god creating a world for them. I am going to make a 'School' environment... with a Classroom and a Library."
                </p>

                <div className="polaroid max-w-sm mx-auto mt-8 rotate-2">
                    <img src="/assets/blog/superlinear/image1.png" alt="NotebookLM Interface" className="w-full h-auto" />
                    <p className="font-handwritten text-center mt-2 text-sm text-gray-500">Me learning to build agents!</p>
                </div>
            </article>
        </div>
    );
};

export default BuildingAgents;
