import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const projects = [
    {
        title: "Stella Explores Cities",
        category: "AI App",
        desc: "An AI-powered city guide built with Lovable. Discover hidden gems with smart recommendations!",
        link: "https://stella-explores-cities.lovable.app",
        color: "bg-blue-100",
        rotate: "rotate-1",
        canEmbed: true,
        annotation: "Best for Travel!"
    },
    {
        title: "Journal Making",
        category: "Web App",
        desc: "A digital journaling tool. Write your heart out in a beautiful, tactile interface.",
        link: "https://journal-making.lovable.app",
        color: "bg-pink-100",
        rotate: "-rotate-2",
        canEmbed: true,
        annotation: "Top Choice!"
    },
    {
        title: "Badminton Skill Tree",
        category: "Interactive Map",
        desc: "Visualizing my badminton progress. See the journey from rookie to pro!",
        link: "https://badminton-skill-tree.vercel.app/",
        color: "bg-green-100",
        rotate: "rotate-2",
        canEmbed: true
    },
    {
        title: "Xmas 2025 Roadtrip",
        category: "Digital Memory",
        desc: "A log of our Christmas adventure. Photos, maps, and special moments.",
        link: "https://xmas2025-roadtrip.vercel.app/",
        color: "bg-red-100",
        rotate: "-rotate-1",
        canEmbed: true
    },
    {
        title: "Jumping Game",
        category: "Roblox Game",
        desc: "My first game built with Lua! Reach the top and beat the high scores.",
        link: "https://www.roblox.com/games/134287711519230/Jumping-Game",
        color: "bg-yellow-100",
        rotate: "rotate-1",
        canEmbed: false,
        annotation: "Fun stuff!"
    }
];

const Portfolio = () => {
    const [activeProject, setActiveProject] = useState<string | null>(null);

    return (
        <div className="space-y-20 pb-20">
            {/* Header */}
            <motion.header
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative pt-12 text-center"
            >
                <div className="inline-block relative">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="absolute -top-4 right-1/2 translate-x-1/2 h-8 bg-yellow-200/50 -rotate-2 z-0"
                    ></motion.div>
                    <div className="relative z-10 paper-sheet rotate-[-1deg] max-w-2xl mx-auto border-dashed border-2 border-pencil/20 p-8">
                        <h1 className="font-header text-6xl text-ink mb-2">My Work</h1>
                        <p className="font-handwritten text-xl text-pencil">
                            Everything I've built with code! 🛠️
                        </p>
                    </div>
                </div>
            </motion.header>

            {/* Active Embed View */}
            <AnimatePresence>
                {activeProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                        onClick={() => setActiveProject(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-white w-full max-w-6xl h-[80vh] rounded-xl shadow-2xl flex flex-col overflow-hidden relative"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="bg-gray-100 p-3 flex justify-between items-center border-b">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-400 cursor-pointer hover:bg-red-500" onClick={() => setActiveProject(null)}></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                </div>
                                <span className="font-mono text-xs text-pencil uppercase tracking-widest font-bold">Live Preview</span>
                                <button onClick={() => setActiveProject(null)} className="text-gray-500 hover:text-black transition-colors">
                                    <span className="material-symbols-outlined">close</span>
                                </button>
                            </div>
                            <iframe
                                src={projects.find(p => p.title === activeProject)?.link}
                                className="w-full h-full border-0 bg-white"
                                title="Project Preview"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Project Grid */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 px-4 max-w-6xl mx-auto">
                {projects.map((project, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30, rotate: index % 2 === 0 ? -2 : 2 }}
                        whileInView={{ opacity: 1, y: 0, rotate: index % 2 === 0 ? -1 : 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, type: "spring" }}
                        className="relative group"
                    >
                        {/* Decorative elements */}
                        <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-32 h-10 bg-tape rotate-[-2deg] z-20 pointer-events-none"></div>

                        <motion.div
                            whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
                            className={`paper-sheet ${project.color} h-full flex flex-col shadow-lifted transition-all relative overflow-hidden`}
                        >
                            <div className="border-2 border-dashed border-gray-400/30 p-6 h-full flex flex-col relative z-10">
                                {project.annotation && (
                                    <div className="absolute top-4 right-4 rotate-12">
                                        <span className="bg-yellow-300 text-ink text-[10px] font-marker px-2 py-1 shadow-sm uppercase tracking-tighter">
                                            {project.annotation}
                                        </span>
                                    </div>
                                )}

                                <span className="inline-block px-2 py-1 bg-white/50 rounded text-xs font-mono text-pencil mb-4 w-fit border border-pencil/10">
                                    {project.category}
                                </span>

                                <h3 className="font-header text-3xl mb-3 text-ink leading-tight">{project.title}</h3>
                                <p className="font-note text-xl text-gray-700 leading-relaxed mb-8 flex-grow italic">
                                    "{project.desc}"
                                </p>

                                <div className="flex gap-3">
                                    {project.canEmbed ? (
                                        <motion.button
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setActiveProject(project.title)}
                                            className="flex-1 bg-white border-2 border-ink text-ink font-marker py-3 rounded shadow-[4px_4px_0px_0px_rgba(44,62,80,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center justify-center gap-2"
                                        >
                                            <span className="material-symbols-outlined text-sm">visibility</span>
                                            Explore
                                        </motion.button>
                                    ) : (
                                        <motion.a
                                            whileTap={{ scale: 0.95 }}
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 bg-white border-2 border-ink text-ink font-marker py-3 rounded shadow-[4px_4px_0px_0px_rgba(44,62,80,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center justify-center gap-2"
                                        >
                                            <span className="material-symbols-outlined text-sm">play_circle</span>
                                            Play Now
                                        </motion.a>
                                    )}

                                    {project.canEmbed && (
                                        <motion.a
                                            whileTap={{ scale: 0.95 }}
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-4 bg-transparent border-2 border-ink/20 text-ink/40 font-marker rounded hover:bg-white hover:text-ink hover:border-ink transition-colors flex items-center justify-center"
                                            title="Open in new tab"
                                        >
                                            <span className="material-symbols-outlined">open_in_new</span>
                                        </motion.a>
                                    )}
                                </div>
                            </div>

                            {/* Texture overlay */}
                            <div className="absolute inset-0 opacity-[0.03] pointer-events-none paper-texture bg-repeat rotate-45 scale-150"></div>
                        </motion.div>
                    </motion.div>
                ))}
            </section>
        </div>
    );
};

export default Portfolio;
