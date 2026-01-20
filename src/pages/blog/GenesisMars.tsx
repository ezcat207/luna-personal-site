import { motion } from 'framer-motion';
import img1 from '../../assets/genesis-mars-image1.png';
import img2 from '../../assets/genesis-mars-image2.png';
import img3 from '../../assets/genesis-mars-image3.png';
import img4 from '../../assets/genesis-mars-image4.png';
import img5 from '../../assets/genesis-mars-image5.png';

const GenesisMars = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto px-4 py-12 space-y-12"
        >
            {/* Header */}
            <header className="border-b-2 border-red-900/10 pb-8 text-center">
                <div className="flex justify-center gap-4 mb-4">
                    <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-bold tracking-wider uppercase">
                        Sci-Fi Short
                    </span>
                    <span className="text-gray-400 text-sm">Jan 20, 2026</span>
                </div>
                <h1 className="font-header text-5xl md:text-7xl text-red-900 mb-4">Genesis on Mars: Crimson Dawn</h1>
                <p className="font-handwritten text-2xl text-gray-500 italic">
                    "The most tragic destructions in the universe are always silent."
                </p>
            </header>

            {/* Character Settings */}
            <section className="bg-gray-50 p-8 rounded-lg border border-gray-200">
                <h3 className="font-header text-2xl text-gray-800 mb-4">Character Database</h3>
                <div className="space-y-4 font-mono text-sm text-gray-600">
                    <p>
                        <strong className="text-red-700">WAYNE:</strong> 35 y/o Orange Tabby. Former Chief of Deep Space Dynamics. Hardwired with "Kirin" heavy-duty mech interface. Sharp-tongued, radiation-scarred.
                    </p>
                    <p>
                        <strong className="text-red-700">LUNA:</strong> 15 y/o White Lop-eared Rabbit. 2nd Gen Martian Subject. Embedded with "Phoenix" high-freq AI hub. Pathological data dependency.
                    </p>
                    <p>
                        <strong className="text-red-700">OLD FISH (AI):</strong> Ship's sub-routine. Voice setting: Lazy "Salty Fish".
                    </p>
                </div>
            </section>

            {/* Prologue */}
            <section className="space-y-6">
                <h2 className="font-header text-3xl text-red-800">Prologue: The Cat Under the Gravity Ripple</h2>
                <div className="prose prose-lg text-gray-700 leading-relaxed font-serif">
                    <p>The <em>Orion</em> glided silently through the vacuum.</p>
                    <p>Wayne was perched on a cushioned seat at the command station, meticulously grooming the stray fur on the inside of his right hind leg. To him, the explosion of the universe was less important than smoothing out a single tuft of matted hair.</p>
                    <p>Suddenly, the holographic projection on the console flared into a frantic, chaotic crimson.</p>
                    <div className="pl-6 border-l-4 border-red-500 italic text-gray-600 my-4">
                        【Old Fish: Mr. Wayne, I’ve detected a spatial gravitational anomaly. To put it simply, the spatial coordinates where Earth is located... are collapsing like a piece of crumpled scrap paper.】
                    </div>
                    <p>Wayne stopped grooming, his golden vertical pupils narrowing into razor-thin slits. "Gravitational anomaly? Old Fish, are you sure the main computer hasn't been chugging too much coolant?"</p>
                    <div className="pl-6 border-l-4 border-red-500 italic text-gray-600 my-4">
                        【Old Fish: I wish I were. But the gravity-gradient sensors show Earth’s mass underwent an irreversible phase shift within three seconds. Simply put... your home is gone.】
                    </div>
                    <p>Wayne snapped his head toward the viewport. Where that azure planet once hung, space was eerily warping and stretching. Finally, like a glass marble crushed by an invisible titan’s hand, it shattered into a debris field of gravitational ruins from which not even light could escape.</p>
                    <p>There was no sound. The most tragic destructions in the universe are always silent.</p>
                    <p>The <em>Orion</em> was caught in the wake. The ripple of the gravity wave hit like a gargantuan hammer thrown across the star system, snapping the ship's axial structure in half instantly.</p>
                </div>
                <img src={img1} alt="Destruction of Earth" className="w-full rounded-lg shadow-xl" />
            </section>

            {/* Act I */}
            <section className="space-y-6">
                <h2 className="font-header text-3xl text-red-800">Act I: The "Phoenix" in the Inferno</h2>
                <div className="prose prose-lg text-gray-700 leading-relaxed font-serif">
                    <p>The explosion began in the cryo-hibernation deck.</p>
                    <p>By the time Wayne leaped into the "Kirin" mech, the air was already thick with the acrid stench of ozone.<br />
                        "Old Fish, Luna’s position!"</p>
                    <div className="pl-6 border-l-4 border-red-500 italic text-gray-600 my-4">
                        【Old Fish: She’s in segment C7, the dead center of the gravitational tear. Just a reminder, the ship’s oxygen pressure is zeroing out faster than your bank balance.】
                    </div>
                    <p>Wayne steered the heavy "Kirin" into the sea of fire. The soot-stained, orange-painted mech roared through the wreckage, its mechanical arms violently tearing through warped hydraulic doors.</p>
                    <p>He saw it. Beneath debris glowing red from the heat, the elegant, silvery-white "Phoenix" mech was pinned under several tons of titanium trusses. Luna’s long ears poked out from the cracks in the cockpit, twitching violently in agony and terror.</p>
                    <p>"Phoenix... requesting connection... Mainframe... I can't see..." Luna’s voice sobbed incoherently over the channel.</p>
                    <p>"Shut up, bunny! The Mainframe is stardust now!" Wayne roared, forcing the Kirin to dig its steel feet deep into the deck. Veins bulged on his forehead as the mech’s hydraulic pumps let out a shriek at their absolute limit.</p>
                    <p>Just as the truss was pried open, a secondary fuel line burst due to pressure overload, spraying a high-pressure jet at three thousand kilometers per hour.</p>
                    <p>It wasn't fire; it was a physical blade sharp enough to cut diamond.</p>
                    <p>Wayne felt a sudden chill in his left eye, followed by an agonizing pain that felt like a power drill boring through his skull.</p>
                    <p>"Dammit..." he hissed. His left eyeball vaporized in a tenth of a second. He had no time to scream. Clenching the controls with his left claw and relying on a feline’s natural sense of balance, he scooped Luna up with his right arm like a hawk snatching a chick and slammed into the "Eagle," their only battered escape lander.</p>
                </div>
                <img src={img2} alt="Kirin Mech Rescue" className="w-full rounded-lg shadow-xl" />
            </section>

            {/* Act II */}
            <section className="space-y-6">
                <h2 className="font-header text-3xl text-red-800">Act II: A Blind Cat, a Lame Rabbit, and Expired Antibiotics</h2>
                <div className="prose prose-lg text-gray-700 leading-relaxed font-serif">
                    <div className="pl-6 border-l-4 border-red-500 italic text-gray-600 my-4">
                        【Old Fish: Congratulations, we’ve successfully detached from the mothership. The bad news is our current heading is straight for the no-man's land outside the solar system. We’ll hit an asteroid in about thirty thousand years.】
                    </div>
                    <p>The lander was suffocatingly small. Wayne slumped in the co-pilot’s seat, thick, dark blood oozing from his left eye socket. He grabbed a piece of soiled thermal cloth and tied it around his head, forming a makeshift eye patch that looked both comical and ghastly.</p>
                    <p>Luna huddled in the corner. Her legs had been scorched by high-temperature steam when the mech was damaged; her white fur was matted with black scabs, making her look like a trampled plush toy.</p>
                    <p>"Old Fish... connect me..." Luna was still instinctively searching for the AI interface.</p>
                    <p>"Give it a rest, bunny," Wayne grunted through the pain, reaching into the storage bin with one claw to pull out a crumpled hand-drawn star chart and a brass sextant covered in verdigris. "This lander’s antenna is snapped, and the main computer is fried. Now, aside from Old Fish—who’s just a voice pack for snarky remarks—we have nothing."</p>
                    <p>"I... I can't see the direction of the stars..."<br />
                        "Then use your naked eyes!" Wayne shoved the sextant into her trembling claws. "Listen, I’ve spent thirty-five years hating the idea of getting a decimal point wrong. Now, I need you to be my eyes. I’ll calculate the orbit."</p>
                    <p>It was a desperate forty-eight hours.</p>
                    <p>Luna, dragging her crippled legs and enduring the digital withdrawal from being disconnected, forced her pupils to focus again and again on the pinpricks of starlight through the viewport. Wayne, on the verge of slipping in and out of consciousness, scribbled calculations on scrap paper with his grease-stained claws.</p>
                    <p>"Kepler equation... fourth term... correction..." Wayne spat out a mouthful of blood. "Ignite, Old Fish."</p>
                    <div className="pl-6 border-l-4 border-red-500 italic text-gray-600 my-4">
                        【Old Fish: Ignition command confirmed. By the way, if you got the math wrong, we’ll become an artificial orbital satellite of Mars until the oxygen runs out. Good luck, cat.】
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <img src={img3} alt="Desperate Calculations" className="w-full rounded-lg shadow-lg" />
                    <img src={img4} alt="Space Travel" className="w-full rounded-lg shadow-lg" />
                </div>
            </section>

            {/* Act III */}
            <section className="space-y-6">
                <h2 className="font-header text-3xl text-red-800">Act III: The Suicide "Skip"</h2>
                <div className="prose prose-lg text-gray-700 leading-relaxed font-serif">
                    <p>Mars was no longer a romantic red planet. Through the Eagle’s viewport, it looked like a glowing, red-hot whetstone reeking of death.</p>
                    <p>Since the deceleration engines were destroyed in the initial blast, they were left with only one way to land: enter the atmosphere, use the hull friction to slow down, and then "skip" like a stone on water—bounce, decelerate, bounce again.</p>
                    <p>"We’re going to burn," Luna whispered, watching the orange glow begin to flare outside the cabin, her long ears pinned tight against her face.</p>
                    <p>"Old Fish, reroute all power to the forward thermal shield." Wayne removed his eye patch, his remaining eye fixed forward.</p>
                    <div className="pl-6 border-l-4 border-red-500 italic text-gray-600 my-4">
                        【Old Fish: That means I’ll have to shut down. Wayne, remember to get me a more expensive battery... if there’s a 'later.'】
                    </div>
                    <p>The AI’s voice vanished.</p>
                    <p>"Luna, get down." Wayne suddenly released all the limit locks on the mech. He maneuvered the heavy chassis of the "Kirin," acting like a gargantuan, orange-furred cushion, and locked it firmly over Luna’s "Phoenix."</p>
                    <p>"Feel it." Wayne’s voice shattered in the violent vibration. "Don't look at the red data! Use your spine to feel the frequency of the floor! When the vibration feels like it's about to shake your guts out, tell me!"</p>
                    <p>"Now... NOW!"</p>
                    <p><em>BOOM—!</em></p>
                    <p>The Eagle slammed into the atmosphere. Two-thousand-degree heat instantly stripped away the outer coating. Just seconds before impact, Wayne slammed down the manual thrust lever. Every hydraulic strut in the Kirin mech exploded from the overload in that final moment.</p>
                </div>
            </section>

            {/* Epilogue */}
            <section className="space-y-6 pt-8 border-t-2 border-red-900/10">
                <h2 className="font-header text-3xl text-red-800">Epilogue: A Shovel of Red Dirt</h2>
                <div className="prose prose-lg text-gray-700 leading-relaxed font-serif">
                    <p>Isidis Planitia.</p>
                    <p>The wind carried grit that clattered against the warped metal. The hatch was forced open by Wayne using his broken mechanical arm.</p>
                    <p>Wayne crawled out. His beautiful orange fur was singed in patches, making him look like a stray cat that had been on the streets for ten years. Dragging his broken mechanical leg, he stumbled toward the lee of a large rock.</p>
                    <p>Luna held a small box in her arms. It was the one thing Wayne had snatched from the cold storage vault in the final second before Earth vanished.</p>
                    <p>"Old cat... are we going to die?" Luna looked at the crimson sand filling the sky, her eyes vacant.<br />
                        "Like hell we are." Wayne pulled a leaking coolant line from the wreckage. Water droplets hit the dry red soil, creating a faint scent of moisture.</p>
                    <p>Using his mangled claws, he dug a hole in the red earth.<br />
                        "This is the last chip humanity left for the universe. Plant it."</p>
                    <p>Trembling, Luna placed the withered seed into the hole. Wayne covered it with dirt and patted it firm. Then, the two scarred animals sat side-by-side on the sand.</p>
                    <p>The sun set, a tiny blue star sinking below the horizon.</p>
                    <div className="pl-6 border-l-4 border-red-500 italic text-gray-600 my-4">
                        【Old Fish (a faint, staticky whisper): Warning... life signs detected... Welcome... to Mars.】
                    </div>
                    <p>Wayne pulled the shivering little bunny close, his lone eye closing. In the desolate silence of the Martian wasteland, they fulfilled the final wish of human civilization: in the face of absolute despair, dig the first shovel of dirt.</p>
                </div>
                <img src={img5} alt="First Shovel of Dirt" className="w-full rounded-lg shadow-xl" />
            </section>

            {/* Footer */}
            <footer className="text-center pt-12 pb-8">
                <p className="text-red-300 font-mono text-xs uppercase tracking-[0.2em]">
                    End of File • Genesis Archive
                </p>
            </footer>
        </motion.div>
    );
};

export default GenesisMars;
