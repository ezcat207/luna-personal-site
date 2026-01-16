import React, { useState } from 'react';

const projects = [
    {
        title: "Stella Explores Cities",
        category: "AI App",
        desc: "An AI-powered city guide built with Lovable.",
        link: "https://stella-explores-cities.lovable.app",
        color: "bg-blue-100",
        rotate: "rotate-1",
        canEmbed: true
    },
    {
        title: "Journal Making",
        category: "Web App",
        desc: "A digital journaling tool.",
        link: "https://journal-making.lovable.app",
        color: "bg-pink-100",
        rotate: "-rotate-2",
        canEmbed: true
    },
    {
        title: "Badminton Skill Tree",
        category: "Interactive Map",
        desc: "Visualizing my badminton progress.",
        link: "https://badminton-skill-tree.vercel.app/",
        color: "bg-green-100",
        rotate: "rotate-2",
        canEmbed: true
    },
    {
        title: "Xmas 2025 Roadtrip",
        category: "Digital Memory",
        desc: "A log of our Christmas adventure.",
        link: "https://xmas2025-roadtrip.vercel.app/",
        color: "bg-red-100",
        rotate: "-rotate-1",
        canEmbed: true
    },
    {
        title: "Jumping Game",
        category: "Roblox Game",
        desc: "My first game built with Lua!",
        link: "https://www.roblox.com/games/134287711519230/Jumping-Game",
        color: "bg-yellow-100",
        rotate: "rotate-1",
        canEmbed: false
    }
];

const Portfolio = () => {
    // Track which project is currently active (expanded/embedded)
    const [activeProject, setActiveProject] = useState<string | null>(null);

    return (
        <div className="space-y-20">
            {/* Header */}
            <header className="relative pt-12 text-center">
                <div className="inline-block relative">
                    <div className="tape -top-4 right-1/2 translate-x-1/2 w-32 rotate-3"></div>
                    <div className="paper-sheet rotate-[-1deg] max-w-2xl mx-auto border-dashed border-2 border-pencil/20">
                        <h1 className="font-header text-6xl text-ink mb-2">My Work</h1>
                        <p className="font-handwritten text-xl text-pencil">
                            Everything I've built with code! 🛠️
                        </p>
                    </div>
                </div>
            </header>

            {/* Active Embed View (Modal-ish Overlay or Top Section) */}
            {activeProject && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setActiveProject(null)}>
                    <div className="bg-white w-full max-w-6xl h-[80vh] rounded-xl shadow-2xl flex flex-col overflow-hidden relative" onClick={e => e.stopPropagation()}>
                        <div className="bg-gray-100 p-2 flex justify-between items-center border-b">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-400 cursor-pointer hover:bg-red-500" onClick={() => setActiveProject(null)}></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                            </div>
                            <span className="font-mono text-xs text-gray-500">Live Preview Mode</span>
                            <button onClick={() => setActiveProject(null)} className="text-gray-500 hover:text-black">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <iframe
                            src={projects.find(p => p.title === activeProject)?.link}
                            className="w-full h-full border-0 bg-white"
                            title="Project Preview"
                        />
                    </div>
                </div>
            )}

            {/* Project Grid */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 px-4 max-w-6xl mx-auto pb-20">
                {projects.map((project, index) => (
                    <div key={index} className={`relative group ${project.rotate}`}>
                        <div className="tape -top-3 left-1/2 -translate-x-1/2 w-24 opacity-80 z-10"></div>
                        <div className={`paper-sheet ${project.color} h-full flex flex-col transition-transform group-hover:scale-105 group-hover:rotate-0`}>

                            <div className="border-2 border-dashed border-gray-400/30 p-4 h-full flex flex-col">
                                <span className="inline-block px-2 py-1 bg-white/50 rounded text-xs font-mono text-gray-500 mb-4 w-fit">
                                    {project.category}
                                </span>

                                <h3 className="font-header text-3xl mb-2 text-ink">{project.title}</h3>
                                <p className="font-note text-lg text-gray-700 leading-relaxed mb-6 flex-grow">
                                    {project.desc}
                                </p>

                                <div className="flex gap-2">
                                    {project.canEmbed ? (
                                        <button
                                            onClick={() => setActiveProject(project.title)}
                                            className="flex-1 text-center bg-white border-2 border-ink text-ink font-doodle py-2 rounded shadow-[4px_4px_0px_0px_rgba(44,62,80,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center justify-center gap-2"
                                        >
                                            <span className="material-symbols-outlined text-sm">visibility</span>
                                            Preview
                                        </button>
                                    ) : (
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 text-center bg-white border-2 border-ink text-ink font-doodle py-2 rounded shadow-[4px_4px_0px_0px_rgba(44,62,80,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center justify-center gap-2"
                                        >
                                            <span className="material-symbols-outlined text-sm">open_in_new</span>
                                            Play
                                        </a>
                                    )}

                                    {project.canEmbed && (
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-3 bg-transparent border-2 border-ink/20 text-ink/50 font-doodle rounded hover:bg-white hover:text-ink hover:border-ink transition-colors flex items-center justify-center"
                                            title="Open in new tab"
                                        >
                                            <span className="material-symbols-outlined">open_in_new</span>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default Portfolio;
