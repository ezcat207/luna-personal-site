

const Home = () => {
    return (
        <div className="space-y-32">
            {/* Header / Hero */}
            <header className="relative mb-24 md:mb-32">
                <div className="absolute -top-10 -left-10 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-40 z-0"></div>
                <div className="absolute top-20 right-0 w-72 h-72 bg-yellow-100 rounded-full blur-3xl opacity-40 z-0"></div>

                <div className="relative z-10 flex flex-col md:flex-row items-center justify-center md:justify-between gap-12 px-4 md:px-12">
                    <div className="relative group w-full md:w-7/12">
                        <div className="washi-tape pattern-1 -top-4 left-1/2 -translate-x-1/2 md:left-20"></div>
                        <div className="washi-tape pattern-2 bottom-[-10px] right-10 rotate-[4deg]"></div>
                        <div className="paper-texture torn-all p-8 md:p-12 bg-white shadow-lifted transform rotate-[-1deg] transition-transform hover:rotate-0">
                            <div className="border-4 border-dashed border-gray-200 p-6 relative">
                                <span className="absolute -top-8 -left-8 text-6xl text-gray-300 font-header opacity-50 select-none">#01</span>
                                <h1 className="font-header text-6xl md:text-8xl text-ink leading-tight text-center md:text-left drop-shadow-sm">
                                    Hello, <br />
                                    <span className="text-pink-500 font-marker transform inline-block rotate-[-3deg]">I am Luna!</span>
                                </h1>
                                <p className="mt-6 font-handwritten text-xl md:text-2xl text-pencil leading-relaxed">
                                    Welcome to my digital <span className="bg-yellow-100 px-2 transform -rotate-1 inline-block border-b-2 border-yellow-400">brain dump!</span>
                                    I'm 8 years old (almost 9!) and I turn <span className="font-mono text-purple-600 bg-purple-100 px-1 rounded text-sm">candy</span> into <span className="font-mono text-green-600 bg-green-100 px-1 rounded text-sm">code</span>.
                                </p>
                                <div className="absolute -bottom-6 -right-12 md:-right-24 rotate-[-10deg] w-40">
                                    <p className="font-doodle text-blue-600 text-lg">&larr; My first webpage!</p>
                                    <svg className="w-12 h-12 text-blue-600 absolute -top-8 -left-4 rotate-45" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 100 100">
                                        <path d="M10,50 Q50,10 90,50"></path>
                                        <path d="M80,40 L90,50 L80,60"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative w-full md:w-4/12 flex justify-center md:justify-end">
                        <div className="polaroid-frame bg-white max-w-xs mx-auto md:mr-0 z-20">
                            <div className="aspect-square bg-gray-100 overflow-hidden border border-gray-200 relative">
                                <div className="absolute inset-0 bg-gray-200 flex items-center justify-center text-gray-400">
                                    <img alt="Luna Avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCoEbVQQC3V8n1HIGIbDv6cS9gs72jZccFowdcyk2s2r6JH7YSFmSYUrgWd3QKVOhtZIX-5iESTIi9uyjCn1wBPhaa2o0_q5LSJUuCOmYXePstNHcU2DsiMpBXYsjm62RYBtxoV6tJR4m7UeIxaj6tCF_OdWnP3xc8wLWbDrVKbdI3xBTNY_ZoqQjkQybeOll4VTKScSC3uFQoWi-q0__4ecIvthNT8reQCvlvAMAAv_OkeidmVkvfqKKwV0PDlz-tmNrwTpfpBcBrW" />
                                </div>
                            </div>
                            <div className="mt-4 text-center font-marker text-ink text-xl rotate-1">Me &amp; My Bunny Ears 🐰</div>
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-8 bg-red-400/30 rotate-2 backdrop-blur-sm"></div>
                        </div>
                        <div className="absolute -bottom-8 -left-4 md:-left-12 z-30 floating-element">
                            <div className="bg-yellow-300 w-20 h-20 rounded-full flex items-center justify-center shadow-lg border-2 border-yellow-500 transform rotate-12">
                                <span className="font-header text-center text-xs leading-tight">Coder<br />in<br />Training</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Stats & Wisdom */}
            <section className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 px-4 md:px-0 mb-32 relative">
                <svg className="hidden md:block absolute top-10 left-[40%] w-64 h-32 pointer-events-none z-0" style={{ transform: "rotate(10deg)" }}>
                    <path d="M0,20 C100,0 150,80 250,50" fill="none" stroke="#cbd5e0" strokeDasharray="8,4" strokeWidth="2"></path>
                </svg>
                <div className="md:col-span-5 relative">
                    <div className="washi-tape pattern-1 top-0 left-1/2 -translate-x-1/2 w-40 h-10 z-20"></div>
                    <div className="bg-white p-6 shadow-lifted hand-drawn-border transform rotate-1 index-card relative min-h-[300px]">
                        <h3 className="font-header text-3xl text-center mb-6 text-ink underline decoration-wavy decoration-pink-300">My Stats</h3>
                        <ul className="space-y-1 font-handwritten text-xl relative z-10 pl-4">
                            <li className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-orange-500">bolt</span>
                                <span>Energy Level: <b className="text-orange-600">Over 9000!</b></span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-blue-500">terminal</span>
                                <span>Lines of Code: <b className="text-blue-600">142</b></span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-purple-500">cookie</span>
                                <span>Cookies Eaten: <b className="text-purple-600">Unknown</b></span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-green-500">school</span>
                                <span>Grade: <b className="text-green-600">3rd</b></span>
                            </li>
                        </ul>
                        <div className="absolute bottom-4 right-4 opacity-70">
                            <svg className="text-pencil fill-current" height="60" viewBox="0 0 100 100" width="60">
                                <path d="M20,80 Q50,20 80,80 Z" fill="none" stroke="currentColor" strokeWidth="2"></path>
                                <circle cx="50" cy="50" r="5"></circle>
                            </svg>
                            <span className="text-xs font-note absolute bottom-0 right-0">Graph??</span>
                        </div>
                    </div>
                </div>

                <div className="md:col-span-7 relative flex items-center">
                    <div className="bg-yellow-100 p-6 shadow-lg transform rotate-[-2deg] max-w-md ml-auto relative">
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-red-500 shadow-sm border border-red-700 z-20"></div>
                        <div className="flex flex-row items-start gap-4">
                            <div className="shrink-0 w-24 h-24 border-4 border-white shadow-sm rotate-[-5deg] overflow-hidden bg-gray-200">
                                <img alt="Wayne the Cat" className="w-full h-full object-cover grayscale sepia-[0.4] contrast-125" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBRkbybPm15O7f6OgYUkP0Qal1OAhZ2_o4BNY957B_szE-IISBhUNngot4GcmK0itFHi5jMK98QJIN_GEf2rh_euhF-IVq0jYzaVXBdBgSRJWWkvh4kjjPzZgwYDcbOobCtI21ftORbHklAiN1Sg6FIU1w-BGhQfaqczeJ3szDLr34iN8v9WyeQ-za05EY9WziPs2bkvG5CMaNwYOgTcSm2ySergu4MRd02UxvHtrUNcGfrp7QJDOANxYQnp033bG7CWEbcbY9bo9x" />
                            </div>
                            <div>
                                <h4 className="font-marker text-2xl text-ink mb-2">Wayne's Wisdom 🐱</h4>
                                <p className="font-note text-xl leading-snug text-gray-700">
                                    "The code is just the tool. The architecture is the soul of the machine."
                                </p>
                                <p className="text-right mt-2 font-handwritten text-sm text-gray-500">- Wayne (The Architect)</p>
                            </div>
                        </div>
                        <div className="absolute -bottom-4 right-8 w-8 h-12 border-2 border-gray-400 rounded-full z-10 rotate-12"></div>
                    </div>
                </div>
            </section>

            {/* AI Toolbox */}
            <section className="relative my-24 px-4">
                <div className="craft-paper torn-all p-8 md:p-16 shadow-deep transform rotate-1 relative z-10">
                    <div className="absolute -top-5 left-10 w-32 h-10 bg-gray-800/20 rotate-[-1deg] blur-sm"></div>
                    <div className="washi-tape pattern-2 -top-5 left-8 w-40 h-12 rotate-[-1deg]"></div>
                    <h2 className="font-header text-5xl text-center text-white drop-shadow-md mb-12 mix-blend-overlay opacity-90">My AI Toolbox</h2>
                    <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                        <div className="sticker group relative w-32 h-32 bg-white rounded-full flex flex-col items-center justify-center border-4 border-white shadow-md transform rotate-[-5deg]">
                            <span className="material-symbols-outlined text-5xl text-purple-500 mb-1">auto_awesome</span>
                            <span className="font-doodle text-sm font-bold">Magic Prompts</span>
                        </div>
                        <div className="sticker group relative w-32 h-32 bg-indigo-500 rounded-lg flex flex-col items-center justify-center shadow-md transform rotate-3 border-2 border-dashed border-white">
                            <span className="material-symbols-outlined text-5xl text-white mb-1">psychology</span>
                            <span className="font-doodle text-sm font-bold text-white">Brain v2.0</span>
                        </div>
                        <div className="sticker group relative w-32 h-32 bg-green-100 rounded-full flex flex-col items-center justify-center shadow-md border-4 border-green-300 transform rotate-[-2deg]">
                            <span className="material-symbols-outlined text-5xl text-green-600 mb-1">terminal</span>
                            <span className="font-doodle text-sm font-bold text-green-800">Python</span>
                        </div>
                        <div className="sticker relative w-36 h-32 bg-paper torn-top p-2 flex flex-col items-center justify-center shadow-md transform rotate-6">
                            <div className="border border-pencil p-2 w-full h-full flex flex-col items-center justify-center">
                                <span className="material-symbols-outlined text-4xl text-pencil mb-1">draw</span>
                                <span className="font-handwritten text-sm text-pencil">Design</span>
                            </div>
                        </div>
                    </div>
                    <div className="absolute -right-2 bottom-10 rotate-[-5deg] w-48 hidden md:block">
                        <span className="font-marker text-white text-lg leading-tight drop-shadow-md">Mastering K-5 CS logic! 🚀</span>
                        <svg className="w-8 h-8 text-white absolute -top-6 -left-4 rotate-[-45deg]" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M10 19l-7-7m0 0l7-7m-7 7h18" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                    </div>
                </div>
            </section>

            {/* Learning Galaxy */}
            <section className="relative my-32 px-4 md:px-0">
                <h3 className="font-header text-4xl text-center mb-16 relative inline-block left-1/2 -translate-x-1/2">
                    <span className="relative z-10">My Learning Galaxy</span>
                    <span className="absolute bottom-1 left-0 w-full h-3 bg-blue-200/50 -rotate-1 z-0"></span>
                </h3>
                <div className="relative h-[500px] w-full max-w-4xl mx-auto border-4 border-dashed border-gray-300/50 rounded-3xl p-8 bg-white/30">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                        <div className="w-32 h-32 bg-white rounded-full border-4 border-pink-300 flex items-center justify-center shadow-lg relative">
                            <span className="font-header text-2xl text-pink-500">Luna</span>
                            <div className="absolute inset-0 -z-10 border-2 border-dashed border-pink-200 rounded-full scale-125 animate-pulse"></div>
                        </div>
                    </div>
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                        <path d="M50% 50% Q 25% 40% 20% 30%" fill="none" stroke="#cbd5e0" strokeDasharray="5,5" strokeWidth="3"></path>
                        <path d="M50% 50% Q 75% 40% 80% 30%" fill="none" stroke="#cbd5e0" strokeDasharray="5,5" strokeWidth="3"></path>
                        <path d="M50% 50% Q 50% 80% 50% 85%" fill="none" stroke="#cbd5e0" strokeDasharray="5,5" strokeWidth="3"></path>
                    </svg>
                    <div className="absolute top-[20%] left-[10%] md:left-[15%] transform -rotate-6 z-10">
                        <div className="bg-yellow-50 p-4 shadow-md rounded-lg border border-yellow-200 w-32 text-center">
                            <span className="material-symbols-outlined text-yellow-600 text-3xl">code</span>
                            <div className="font-doodle font-bold mt-1">Python</div>
                            <div className="text-xs font-handwritten text-gray-500">Basic Spells</div>
                        </div>
                    </div>
                    <div className="absolute top-[20%] right-[10%] md:right-[15%] transform rotate-3 z-10">
                        <div className="bg-blue-50 p-4 shadow-md rounded-[2rem] border border-blue-200 w-36 text-center">
                            <span className="material-symbols-outlined text-blue-600 text-3xl">auto_awesome</span>
                            <div className="font-doodle font-bold mt-1">Prompting</div>
                            <div className="text-xs font-handwritten text-gray-500">AI Whispering</div>
                        </div>
                    </div>
                    <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 z-10 opacity-70 grayscale">
                        <div className="bg-gray-100 p-4 shadow-sm rounded-lg border-2 border-dashed border-gray-400 w-40 text-center flex flex-col items-center">
                            <span className="material-symbols-outlined text-gray-500 mb-1">lock</span>
                            <div className="font-doodle font-bold">Neural Nets</div>
                            <div className="text-[10px] font-handwritten bg-gray-200 px-2 py-1 rounded mt-1">Math Lvl 4 Req.</div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
