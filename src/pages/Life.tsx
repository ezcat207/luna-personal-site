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

                {/* Entry 3: Jan 2026 */}
                <TimelineItem
                    date="Jan 19, 2026"
                    title="The Mars Bunny Wiki"
                    desc="Everything you need to know about our long-eared Martian neighbors. A field guide for colonists."
                    link="/blog/mars-bunny-wiki"
                    color="bg-orange-50"
                    rotate="rotate-1"
                    emoji="🥕"
                />

                {/* Entry 2: Oct 2025 */}
                <TimelineItem
                    date="Oct 2025"
                    title="The AI Architect Report"
                    desc="Gemini Canvas, NotebookLM, and AI Quests. How I learned to co-build with AI."
                    link="/blog/gemini-report"
                    color="bg-blue-50"
                    rotate="rotate-[-1deg]"
                    emoji="🤖"
                />

                {/* Entry 1: Dec 2025 */}
                <TimelineItem
                    date="Dec 15, 2025"
                    title="The Superlinear Path"
                    desc="Learning why 1 + 1 = 10. The start of my journey."
                    link="/blog/superlinear"
                    color="bg-yellow-50"
                    rotate="rotate-1"
                    emoji="🚀"
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
