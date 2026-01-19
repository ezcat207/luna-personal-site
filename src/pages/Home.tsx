import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import lunaAvatar from '../assets/luna-avatar.jpg';
import wayneAvatar from '../assets/wayne-avatar.jpg';

const Home = () => {
    return (
        <div className="space-y-32">
            {/* Header / Hero */}
            <motion.header
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative mb-24 md:mb-32"
            >
                <div className="absolute -top-10 -left-10 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-40 z-0 animate-pulse"></div>
                <div className="absolute top-20 right-0 w-72 h-72 bg-yellow-100 rounded-full blur-3xl opacity-40 z-0 animate-pulse" style={{ animationDelay: '1s' }}></div>

                <div className="relative z-10 flex flex-col md:flex-row items-center justify-center md:justify-between gap-12 px-4 md:px-12">
                    <div className="relative group w-full md:w-7/12">
                        <motion.div
                            whileHover={{ scale: 1.02, rotate: 0 }}
                            className="paper-texture torn-all p-8 md:p-12 bg-white shadow-lifted transform rotate-[-1deg] transition-all"
                        >
                            {/* Washi Tape */}
                            <motion.div
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="washi-tape pattern-1 -top-4 left-1/2 -translate-x-1/2 md:left-20"
                            ></motion.div>
                            <motion.div
                                initial={{ x: 20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.7 }}
                                className="washi-tape pattern-2 bottom-[-10px] right-10 rotate-[4deg]"
                            ></motion.div>

                            <div className="border-4 border-dashed border-gray-200 p-6 relative">
                                <span className="absolute -top-8 -left-8 text-6xl text-gray-300 font-header opacity-50 select-none">#01</span>
                                <h1 className="font-header text-6xl md:text-8xl text-ink leading-tight text-center md:text-left drop-shadow-sm">
                                    Hello, <br />
                                    <motion.span
                                        animate={{ rotate: [-3, -1, -3] }}
                                        transition={{ repeat: Infinity, duration: 4 }}
                                        className="text-pink-500 font-marker transform inline-block"
                                    >I am Luna!</motion.span>
                                </h1>
                                <p className="mt-6 font-handwritten text-xl md:text-2xl text-pencil leading-relaxed">
                                    Welcome to my digital <span className="bg-yellow-100 px-2 transform -rotate-1 inline-block border-b-2 border-yellow-400">brain dump!</span>
                                    I'm 8 years old (almost 9!) and I turn <span className="font-mono text-purple-600 bg-purple-100 px-1 rounded text-sm">candy</span> into <span className="font-mono text-green-600 bg-green-100 px-1 rounded text-sm">code</span>.
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                        animate={{ opacity: 1, scale: 1, rotate: -3 }}
                        transition={{ delay: 0.3, type: "spring" }}
                        className="relative w-full md:w-4/12 flex justify-center md:justify-end"
                    >
                        <div className="polaroid-frame bg-white max-w-xs mx-auto md:mr-0 z-20 group">
                            <div className="aspect-square bg-gray-100 overflow-hidden border border-gray-200 relative">
                                <motion.img
                                    whileHover={{ scale: 1.1 }}
                                    alt="Luna Avatar"
                                    className="w-full h-full object-cover transition-transform"
                                    src={lunaAvatar}
                                />
                            </div>
                            <div className="mt-4 text-center font-marker text-ink text-xl rotate-1">Me &amp; My Bunny Ears 🐰</div>
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-8 bg-red-400/30 rotate-2 backdrop-blur-sm"></div>
                        </div>
                    </motion.div>
                </div>
            </motion.header>

            {/* Stats & Wisdom */}
            <section className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 px-4 md:px-0 mb-32 relative">
                <div className="md:col-span-5 relative">
                    <motion.div
                        whileInView={{ rotate: 1, scale: 1 }}
                        initial={{ rotate: -5, scale: 0.9 }}
                        transition={{ type: "spring" }}
                        className="bg-white p-6 shadow-lifted hand-drawn-border transform index-card relative min-h-[300px]"
                    >
                        <h3 className="font-header text-3xl text-center mb-6 text-ink underline decoration-wavy decoration-pink-300">My Stats</h3>
                        <ul className="space-y-4 font-handwritten text-xl relative z-10 pl-4">
                            {[
                                { icon: 'bolt', label: 'Energy Level', value: 'Over 9000!', color: 'text-orange-600' },
                                { icon: 'terminal', label: 'Lines of Code', value: '142', color: 'text-blue-600' },
                                { icon: 'cookie', label: 'Cookies Eaten', value: 'Unknown', color: 'text-purple-600' },
                                { icon: 'school', label: 'Grade', value: '3rd', color: 'text-green-600' }
                            ].map((stat, i) => (
                                <motion.li
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-center gap-3"
                                >
                                    <span className="material-symbols-outlined">{stat.icon}</span>
                                    <span>{stat.label}: <b className={stat.color}>{stat.value}</b></span>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>
                </div>

                <div className="md:col-span-7 relative flex items-center">
                    <motion.div
                        whileHover={{ scale: 1.05, rotate: 0 }}
                        className="bg-yellow-100 p-6 shadow-lg transform rotate-[-2deg] max-w-md ml-auto relative"
                    >
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-red-500 shadow-sm border border-red-700 z-20"></div>
                        <div className="flex flex-row items-start gap-4">
                            <div className="shrink-0 w-24 h-24 border-4 border-white shadow-sm rotate-[-5deg] overflow-hidden bg-gray-200">
                                <img alt="Wayne the Cat" className="w-full h-full object-cover" src={wayneAvatar} />
                            </div>
                            <div>
                                <h4 className="font-marker text-2xl text-ink mb-2">Wayne's Wisdom 🐱</h4>
                                <p className="font-note text-xl leading-snug text-gray-700 italic">
                                    "The code is just the tool. The architecture is the soul of the machine."
                                </p>
                                <p className="text-right mt-2 font-handwritten text-sm text-gray-500">- Wayne (The Architect)</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* AI Toolbox */}
            <section className="relative my-24 px-4 overflow-hidden">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="craft-paper torn-all p-8 md:p-16 shadow-deep transform rotate-1 relative z-10"
                >
                    <h2 className="font-header text-5xl text-center text-white drop-shadow-md mb-12 mix-blend-overlay opacity-90">My AI Toolbox</h2>
                    <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                        {[
                            { icon: 'auto_awesome', label: 'Magic Prompts', color: 'bg-white', text: 'text-purple-500', rotate: -5 },
                            { icon: 'psychology', label: 'Brain v2.0', color: 'bg-indigo-500', text: 'text-white', rotate: 3 },
                            { icon: 'terminal', label: 'Python', color: 'bg-green-100', text: 'text-green-600', rotate: -2 },
                            { icon: 'draw', label: 'Design', color: 'bg-paper', text: 'text-pencil', rotate: 6 }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ scale: 1.1, rotate: 0 }}
                                className={`sticker relative w-32 h-32 ${item.color} rounded-lg flex flex-col items-center justify-center shadow-md transform`}
                                style={{ rotate: `${item.rotate}deg` }}
                            >
                                <span className={`material-symbols-outlined text-5xl ${item.text} mb-1`}>{item.icon}</span>
                                <span className={`font-doodle text-sm font-bold ${item.text.includes('white') ? 'text-white' : 'text-gray-800'}`}>{item.label}</span>
                            </motion.div>
                        ))}
                    </div>

                    <Link to="/mind" className="block mt-12 text-center">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-pink-500 text-white font-marker px-8 py-4 rounded-full shadow-lg hover:bg-pink-600 transition-colors text-2xl rotate-[-2deg]"
                        >
                            Talk to my AI! 🤖
                        </motion.button>
                    </Link>
                </motion.div>
            </section>

            {/* Learning Galaxy */}
            <section className="relative my-32 px-4 md:px-0">
                <h3 className="font-header text-4xl text-center mb-16 relative inline-block left-1/2 -translate-x-1/2">
                    <span className="relative z-10">My Learning Galaxy</span>
                    <span className="absolute bottom-1 left-0 w-full h-3 bg-blue-200/50 -rotate-1 z-0"></span>
                </h3>
                <div className="relative h-[600px] w-full max-w-4xl mx-auto border-4 border-dashed border-gray-300/50 rounded-3xl p-8 bg-white/30 overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                        <motion.div
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ repeat: Infinity, duration: 3 }}
                            className="w-40 h-40 bg-white rounded-full border-4 border-pink-300 flex items-center justify-center shadow-lg relative"
                        >
                            <span className="font-header text-3xl text-pink-500">Luna</span>
                            <div className="absolute inset-0 -z-10 border-2 border-dashed border-pink-200 rounded-full scale-125"></div>
                        </motion.div>
                    </div>

                    {[
                        { pos: 'top-[15%] left-[10%]', label: 'Python', desc: 'Basic Spells', icon: 'code', color: 'bg-yellow-50', border: 'border-yellow-200', rotate: -6 },
                        { pos: 'top-[15%] right-[10%]', label: 'Prompting', desc: 'AI Whispering', icon: 'auto_awesome', color: 'bg-blue-50', border: 'border-blue-200', rotate: 3 },
                        { pos: 'bottom-[15%] left-1/2 -translate-x-1/2', label: 'Roblox', desc: 'Lua Scripting', icon: 'videogame_asset', color: 'bg-red-50', border: 'border-red-200', rotate: 1 }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            whileHover={{ scale: 1.1, zIndex: 30 }}
                            className={`absolute ${item.pos} z-10`}
                            style={{ rotate: `${item.rotate}deg` }}
                        >
                            <div className={`${item.color} p-6 shadow-md rounded-2xl border ${item.border} w-40 text-center cursor-help transition-all`}>
                                <span className="material-symbols-outlined text-4xl mb-2">{item.icon}</span>
                                <div className="font-doodle font-bold text-xl">{item.label}</div>
                                <div className="text-xs font-handwritten text-gray-500">{item.desc}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
