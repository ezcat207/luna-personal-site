import { Link } from 'react-router-dom';

const Superlinear = () => {
    return (
        <article className="max-w-4xl mx-auto pt-12 pb-20">
            <Link to="/life" className="inline-block mb-8 text-pencil hover:text-ink font-handwritten">&larr; Back to Journal</Link>

            <div className="paper-sheet rotate-[-1deg] relative">
                <div className="tape -top-4 left-1/2 -translate-x-1/2 w-32 rotate-2"></div>

                <h1 className="font-header text-5xl md:text-7xl text-ink mb-8 text-center text-blue-600">The Superlinear Path 🚀</h1>

                <div className="font-handwritten text-xl md:text-2xl text-ink space-y-8 leading-loose relative z-10">
                    <p>
                        Dear Diary, <br />
                        Today I learned a new word: <span className="highlight bg-yellow-200 px-2">Superlinear</span>.
                    </p>

                    <div className="float-right w-48 bg-white p-2 shadow-md rotate-3 ml-6 mb-4 border border-gray-200">
                        <div className="h-32 bg-gray-50 flex items-end justify-center pb-2 border border-gray-100">
                            {/* Simple SVG Chart */}
                            <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                                <path d="M10,90 Q50,90 90,10" fill="none" stroke="blue" strokeWidth="3" />
                                <text x="10" y="90" fontSize="10">Start</text>
                                <text x="90" y="10" fontSize="10">Boom!</text>
                            </svg>
                        </div>
                        <p className="text-center text-xs font-mono mt-2">Fig 1. Whoosh</p>
                    </div>

                    <p>
                        Most people think learning allows you to get better step by step like climbing a ladder. <br />
                        1 + 1 + 1 = 3.
                    </p>
                    <p>
                        But "Superlinear" means sometimes 1 + 1 = 10. <br />
                        It happens when different skills mix together. Like: <br />
                        <span className="text-blue-500 font-bold">Coding</span> + <span className="text-pink-500 font-bold">Storytelling</span> = <span className="text-purple-600 font-bold underline decoration-wavy">Magic Apps</span>.
                    </p>

                    <p>
                        It's hard at the beginning. You accept that you know nothing. You feel stuck.
                        But if you keep pushing, suddenly everything clicks.
                    </p>

                    <div className="p-6 border-2 border-dashed border-red-300 rounded-xl bg-red-50 rotate-[-1deg]">
                        <h3 className="font-bold text-red-500 uppercase text-lg mb-2">Note to self:</h3>
                        <p>Don't stop when it's hard. That just means I'm at the bottom of the curve.</p>
                    </div>
                </div>

                {/* Background Grid Lines */}
                <div className="absolute inset-0 pointer-events-none opacity-20"
                    style={{ backgroundImage: 'linear-gradient(#000000 1px, transparent 1px)', backgroundSize: '100% 2.5rem', marginTop: '4rem' }}>
                </div>
            </div>
        </article>
    );
};

export default Superlinear;
