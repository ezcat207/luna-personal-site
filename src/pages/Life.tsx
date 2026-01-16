import { Link } from 'react-router-dom';

const Life = () => {
    return (
        <div className="space-y-24 max-w-4xl mx-auto px-4">
            {/* Header: My Learning Journey */}
            <header className="relative pt-12 text-center">
                <div className="inline-block relative">
                    <div className="tape -top-6 left-1/2 -translate-x-1/2 w-48 rotate-[-2deg]"></div>
                    <div className="paper-sheet rotate-1 max-w-3xl mx-auto">
                        <h1 className="font-header text-5xl md:text-6xl text-ink mb-4">Luna's Learning Timeline 🚀</h1>
                        <p className="font-handwritten text-xl text-pencil leading-relaxed max-w-2xl mx-auto">
                            My journey from a linear thinker to a superlinear builder!
                        </p>
                    </div>
                </div>
            </header>

            {/* Timeline Section */}
            <div className="relative border-l-4 border-dashed border-gray-300 ml-4 md:ml-12 pl-8 md:pl-12 pb-24 space-y-16">

                {/* Entry 5: Jan 10 */}
                <TimelineItem
                    date="Jan 10, 2026"
                    title="I Built an AI Agent! (Mr. Wayne)"
                    desc="Meeting my new AI friends: Mr. Wayne (Teacher) and Luna (Student)."
                    link="/blog/building-agents"
                    color="bg-pink-50"
                    rotate="rotate-1"
                    emoji="🤖"
                />

                {/* Entry 4: Jan 05 */}
                <TimelineItem
                    date="Jan 05, 2026"
                    title="Quest Completed: Market Marshes"
                    desc="Saving a town from floods using AI. Responsible AI is hard!"
                    link="/blog/ai-quests"
                    color="bg-green-50"
                    rotate="rotate-[-1deg]"
                    emoji="🌍"
                />

                {/* Entry 3: Dec 28 */}
                <TimelineItem
                    date="Dec 28, 2025"
                    title="My Second Brain: NotebookLM"
                    desc="Chatting with my library. It feels like talking to a family of books."
                    link="/blog/notebooklm"
                    color="bg-blue-50"
                    rotate="rotate-2"
                    emoji="🧠"
                />

                {/* Entry 2: Dec 24 */}
                <TimelineItem
                    date="Dec 24, 2025"
                    title="New Tools: Gemini & Canvas"
                    desc="Building a fireworks generator with Gemini Canvas. Mind blown!"
                    link="/blog/gemini-canvas"
                    color="bg-yellow-50"
                    rotate="rotate-[-2deg]"
                    emoji="🎨"
                />

                {/* Entry 1: Dec 15 */}
                <TimelineItem
                    date="Dec 15, 2025"
                    title="What is Superlinear?"
                    desc="Learning why 1.1 is so much bigger than 1. The start of it all."
                    link="/blog/superlinear-start"
                    color="bg-gray-50"
                    rotate="rotate-1"
                    emoji="📈"
                />
            </div>
        </div>
    );
};

const TimelineItem = ({ date, title, desc, link, color, rotate, emoji }: any) => (
    <div className={`relative group ${rotate} transition-transform hover:rotate-0 hover:scale-105 duration-300`}>
        {/* Dot on line */}
        <div className="absolute -left-[45px] md:-left-[61px] top-6 w-6 h-6 rounded-full bg-white border-4 border-ink z-10"></div>

        <Link to={link} className={`block paper-sheet ${color} shadow-lifted relative`}>
            <div className="absolute -right-4 -top-4 w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl shadow-sm border border-gray-100 rotate-12">
                {emoji}
            </div>
            <span className="font-mono text-xs text-gray-500 mb-1 block">{date}</span>
            <h3 className="font-header text-2xl md:text-3xl text-ink mb-2">{title}</h3>
            <p className="font-handwritten text-lg text-pencil">{desc}</p>
            <div className="mt-4 text-right">
                <span className="text-sm font-bold text-ink border-b-2 border-ink/20 group-hover:border-ink transition-colors">Read Entry &rarr;</span>
            </div>
        </Link>
    </div>
);

export default Life;
