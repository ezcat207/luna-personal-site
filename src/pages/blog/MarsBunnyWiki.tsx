import { motion } from 'framer-motion';
import marsEncyclopedia from '../../assets/mars-bunny-encyclopedia.png';
import jackrabbitWiki from '../../assets/mars-jackrabbit-wiki.png';
import cottontailWiki from '../../assets/mars-cottontail-wiki.png';

const MarsBunnyWiki = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto px-4 py-12 space-y-12"
        >
            {/* Wiki Header */}
            <header className="border-b-2 border-ink/10 pb-8">
                <div className="flex items-center gap-4 mb-4">
                    <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-bold tracking-wider uppercase">
                        Mars Colony Archive
                    </span>
                    <span className="text-gray-400 text-sm">Last updated: Sol 482</span>
                </div>
                <h1 className="font-header text-5xl md:text-6xl text-ink">Mars Bunny Wiki 🥕🚀</h1>
                <p className="font-handwritten text-xl text-pencil mt-4 italic">
                    "From the dusty plains of Olympus Mons to the pressurized meadows of Habitat Alpha."
                </p>
            </header>

            {/* Introduction */}
            <section className="paper-sheet bg-white p-8">
                <h2 className="font-header text-3xl text-ink mb-4">The Martian Leap</h2>
                <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="flex-1 space-y-4 font-handwritten text-lg text-pencil leading-relaxed">
                        <p>
                            Bunnies were among the first "psychological comfort" species brought to Mars. To our surprise, they didn't just survive in the low gravity—they thrived. The lower G-force allows for massive leaps (some up to 10 meters!) and has subtly shifted the morphology of traditional breeds.
                        </p>
                        <p>
                            This wiki serves as the primary field guide for colonists identifying the various "Mars-adapted" rabbit species roaming both our bio-domes and the terraformed valleys.
                        </p>
                    </div>
                    <div className="w-full md:w-64 space-y-2">
                        <div className="p-4 border-2 border-ink/5 rounded-lg bg-gray-50 text-sm font-mono text-gray-500">
                            <strong>Quick Facts:</strong>
                            <ul className="mt-2 space-y-1">
                                <li>• Origin: Terra</li>
                                <li>• Current Population: 1.2M</li>
                                <li>• Top Speed (Low G): 85km/h</li>
                                <li>• Favorite Crop: Mars-Kale</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Encyclopedia Image */}
            <section className="space-y-6">
                <h2 className="font-header text-3xl text-ink px-4 border-l-4 border-orange-400">Common Rabbit Encyclopedia</h2>
                <div className="paper-sheet p-4 bg-orange-50 rotate-[-1deg] shadow-lifted hover:rotate-0 transition-transform duration-500">
                    <img src={marsEncyclopedia} alt="Common Rabbit Encyclopedia" className="w-full rounded shadow-sm" />
                    <p className="mt-4 text-center font-handwritten text-pencil italic">
                        The primary classification chart used by Martian bio-engineers.
                    </p>
                </div>
            </section>

            {/* Jackrabbit Section */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                    <h2 className="font-header text-3xl text-ink">The Martian Jackrabbit</h2>
                    <div className="paper-sheet bg-blue-50 p-6 space-y-4 leading-relaxed font-handwritten text-lg text-pencil">
                        <p>
                            <strong>The Low-G Sprinter:</strong> Adapted for the open, arid red deserts. The Jackrabbit (Lepus californicus) doesn't burrow; it rests in shallow depressions called "forms" hidden behind Martian boulders.
                        </p>
                        <p>
                            With their powerful hind legs and extremely long black-tipped ears, they are the fastest terrestrial mammals on the planet in open dust-fields.
                        </p>
                    </div>
                </div>
                <div className="paper-sheet p-2 bg-white rotate-1 shadow-lifted hover:rotate-0 transition-transform duration-500">
                    <img src={jackrabbitWiki} alt="Jackrabbit Breakdown Chart" className="w-full rounded shadow-inner" />
                </div>
            </section>

            {/* Cottontail Section */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pb-24">
                <div className="md:order-2 space-y-4">
                    <h2 className="font-header text-3xl text-ink">Cottontail: The Explorer</h2>
                    <div className="paper-sheet bg-green-50 p-6 space-y-4 leading-relaxed font-handwritten text-lg text-pencil">
                        <p>
                            <strong>Biom-Dome Resident:</strong> Prefers the dense cover of brushy fields and the Bio-Woods. Recognized by the distinctive white underside of its tail—which many colonists say looks like a floating cotton ball in the dim Martian dusk.
                        </p>
                        <p>
                            They are widely spread through the Valles Marineris bio-corridors, acting as the primary explorers of new green zones.
                        </p>
                    </div>
                </div>
                <div className="md:order-1 paper-sheet p-2 bg-white rotate-[-1deg] shadow-lifted hover:rotate-0 transition-transform duration-500">
                    <img src={cottontailWiki} alt="Cottontail Rabbit Breakdown Chart" className="w-full rounded shadow-inner" />
                </div>
            </section>

            {/* Footer */}
            <footer className="text-center pt-12 border-t-2 border-ink/5">
                <p className="text-gray-400 font-mono text-sm uppercase tracking-widest">
                    End of entry • For more, visit Habitat Libary
                </p>
            </footer>
        </motion.div>
    );
};

export default MarsBunnyWiki;
