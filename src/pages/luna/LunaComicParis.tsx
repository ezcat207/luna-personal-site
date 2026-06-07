import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { SEOHead } from '../../components/SEOHead';
import { ShareBar } from '../../components/ShareBar';
import { CommentSection } from '../../components/CommentSection';

function StorySection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-rose-50/60 border-l-4 border-rose-400 rounded-r-2xl p-5">
      <p className="text-xs font-bold text-rose-600 uppercase tracking-wide mb-2 flex items-center gap-1">
        <Sparkles className="w-3 h-3" /> {title}
      </p>
      <div className="text-sm text-slate-700 leading-relaxed font-handwritten space-y-2">{children}</div>
    </div>
  );
}

function FactBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-yellow-50/60 border border-yellow-200 rounded-2xl p-5">
      <p className="text-xs font-bold text-amber-700 uppercase tracking-wide mb-3 flex items-center gap-1">
        🇫🇷 Paris Fast Facts
      </p>
      <div className="text-sm text-slate-700 leading-relaxed space-y-2">{children}</div>
    </div>
  );
}

function LessonBox({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-pink-50 border-l-4 border-pink-400 rounded-r-2xl p-5">
      <p className="text-xs font-bold text-pink-600 uppercase tracking-wide mb-2">⭐ Lesson: {title}</p>
      <div className="text-sm text-slate-700 leading-relaxed space-y-2">{children}</div>
    </div>
  );
}

function LunaTip({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-purple-50 border border-purple-200 rounded-2xl p-5 flex gap-3">
      <span className="text-purple-500 text-lg flex-shrink-0">💡</span>
      <div>
        <p className="text-xs font-bold text-purple-700 uppercase tracking-wide mb-1">Luna's Travel Tip</p>
        <p className="text-sm text-slate-700 leading-relaxed">{children}</p>
      </div>
    </div>
  );
}

const strips = [
  {
    number: 1,
    tag: 'Paris Arrival',
    tagColor: 'bg-blue-100 text-blue-700',
    title: '1. Bonjour, Paris!',
    teaser: "Flying over the Eiffel Tower, checking into a cozy hotel, strolling along the Seine, and toasting with croissants at a sidewalk café!",
    image: '/images/comics/paris/strip-1.jpg',
    imageAlt: "Wayne & Luna's arrival in Paris. Panels show: looking out the plane window at the Eiffel Tower, a charming hotel room with a tiny balcony, walking along the Seine past green bookstalls, and toasting with croissants and hot chocolate at a café.",
    story: [
      '"Wayne! Look! There it is!" I pressed my face against the airplane window as the Eiffel Tower appeared through the clouds like a giant golden needle. Wayne leaned over, his cat eyes widening. "Paris! We\'re finally here!"',
      'We found the cutest little hotel with a balcony overlooking a street lined with chestnut trees. "Our Paris home!" I declared, bouncing on the bed. Wayne opened the window shutters and breathed in the morning air. "Ah, the real Paris," he smiled.',
      'We walked along the River Seine, passing the famous green bookstalls (bouquinistes!) filled with old posters and vintage books. "Look at all these treasures!" I said, flipping through a sketchbook. "This city is a museum everywhere you look," Wayne agreed.',
      'We sat down at a cozy sidewalk café, the sun warming our faces. "Croissants and hot chocolate!" I cheered, raising my tiny cup. "Bonjour, Paris!" Wayne clinked his cup against mine. "Best first morning ever!" I laughed.'
    ],
    facts: (
      <>
        <p><strong>Paris</strong> is the capital of France, known as the "City of Light" (La Ville Lumière), named for its leading role in the Age of Enlightenment and its early adoption of street lighting.</p>
        <p><strong>The Eiffel Tower</strong> was built for the 1889 World\'s Fair and was originally intended as a temporary structure. It stands 330 meters tall and was the world\'s tallest structure until 1930.</p>
        <p><strong>Bouquinistes</strong> are the iconic green metal booksellers along the Seine, a UNESCO World Heritage site. They\'ve been selling books and prints along the river since the 16th century.</p>
      </>
    ),
    lessonTitle: 'The Magic of Arrival',
    lesson: (
      <>
        <p>The very first moments in a new city — the skyline from the plane, the smell of a new street, the first sip of coffee — are pure magic. Taking time to savor arrival sets the tone for the whole adventure.</p>
      </>
    ),
    tip: 'Try to book a hotel in the Latin Quarter or Le Marais for a classic Parisian experience with easy walking access to the Seine, Notre Dame, and local bistros.'
  },
  {
    number: 2,
    tag: 'Paris Art & Pastry',
    tagColor: 'bg-pink-100 text-pink-700',
    title: '2. Art and Macarons',
    teaser: 'The glass pyramid of the Louvre, gazing at the Mona Lisa, colorful Ladurée macarons, and relaxing in the Tuileries Garden.',
    image: '/images/comics/paris/strip-2.jpg',
    imageAlt: "Wayne & Luna exploring Paris art and pastry. Panels show: standing awestruck in front of the Louvre pyramid, looking at the Mona Lisa with a crowd, picking out macarons at Ladurée, and eating them in the Tuileries Garden by the fountain.",
    story: [
      'We arrived at the Louvre, and the glass pyramid glittering in the sunlight took my breath away. "It\'s HUGE!" I gasped, spinning around. "We could spend a week in there," Wayne said, pulling out our museum map with a determined look.',
      'Inside, we found our way to the Mona Lisa. Standing behind the velvet rope, I stared at her mysterious smile. "She\'s smaller than I expected!" I whispered. "But that smile... it follows you everywhere," Wayne noted, tilting his head.',
      'After all that art, we needed a sweet treat. At Ladurée, the display case was a rainbow of colorful macarons. "Pistachio, rose, raspberry, vanilla..." I counted, my nose pressed against the glass. "Let\'s get a box of each!" Wayne declared grandly.',
      'We sat in the Jardin des Tuileries, the green metal chairs scattered around the fountain. Biting into a rose macaron, the delicate flavor melted in my mouth. "Paris is the sweetest city," I hummed happily. Wayne nodded, already reaching for another.'
    ],
    facts: (
      <>
        <p><strong>The Louvre Museum</strong> is the world\'s largest art museum, housing over 38,000 objects including the Mona Lisa, Venus de Milo, and Winged Victory of Samothrace.</p>
        <p><strong>The Mona Lisa</strong> was painted by Leonardo da Vinci in the early 1500s. It\'s famous for her enigmatic smile and is protected behind bulletproof glass in a climate-controlled case.</p>
        <p><strong>Macarons</strong> are delicate French meringue-based confections. Ladurée, founded in 1862, is credited with inventing the modern double-decker macaron as we know it today.</p>
      </>
    ),
    lessonTitle: 'Art Tastes Sweet',
    lesson: (
      <>
        <p>Great art and great food are two sides of the same cultural coin. A day spent exploring a museum is perfectly balanced by sitting in a beautiful garden, tasting something delicious, and letting it all sink in.</p>
      </>
    ),
    tip: 'The Louvre is enormous. Pick 2-3 must-see sections before you go, and consider booking a skip-the-line ticket or visiting on Wednesday or Friday evening when it stays open late and is less crowded.'
  },
  {
    number: 3,
    tag: 'Montmartre Lost',
    tagColor: 'bg-amber-100 text-amber-700',
    title: '3. Lost in Montmartre',
    teaser: 'Climbing to the Sacré-Cœur, wandering artist streets, and the panic of realizing they\'ve been separated in the winding cobblestone alleys.',
    image: '/images/comics/paris/strip-3.jpg',
    imageAlt: "Wayne & Luna getting separated in Montmartre. Panels show: climbing stairs to Sacré-Cœur with a Paris view, walking through narrow artist-filled streets, Luna distracted by a street painter while Wayne walks ahead, and Luna looking around in confusion at unfamiliar winding alleys alone.",
    story: [
      'We climbed the steep stairs up to the Sacré-Cœur Basilica, the white domes gleaming against the blue sky. "Almost there!" I panted. We reached the top and turned around — the most incredible view of all Paris sprawled below us.',
      'We wandered into the narrow cobblestone streets of Montmartre, past artists with easels painting under the trees. "This feels like a different world," I whispered. Street musicians played accordion music, and the air smelled like crepes and oil paint.',
      'I stopped to watch a street artist sketch a portrait with incredible speed. "Look at this, Wayne!" I called out, mesmerized by the charcoal lines. But when I turned around... Wayne wasn\'t there. "Wayne?" I called softly, looking down the winding alley.',
      'The streets twisted in every direction. I walked faster, peeking into doorways and around corners, but everyone was a stranger. "Okay... I\'m lost," I admitted to myself, my heart pounding as I stood alone in the unfamiliar maze.'
    ],
    facts: (
      <>
        <p><strong>Montmartre</strong> means "Mountain of the Martyr" and was once a village outside Paris. It was the epicenter of the Belle Époque art scene, home to Picasso, Van Gogh, and Renoir.</p>
        <p><strong>Sacré-Cœur Basilica</strong> sits at the highest point in Paris at 130 meters above sea level, offering panoramic views of the entire city from its dome.</p>
        <p><strong>Place du Tertre</strong> is the lively square in Montmartre where artists set up their easels daily, continuing the neighborhood\'s tradition as an artist colony since the early 1900s.</p>
      </>
    ),
    lessonTitle: 'Wandering Has Its Price',
    lesson: (
      <>
        <p>Getting lost in a beautiful place is part of the adventure — but it\'s also a reminder to always stay aware of your surroundings and keep your travel companion in sight, especially in winding, unfamiliar neighborhoods.</p>
      </>
    ),
    tip: 'Montmartre\'s streets are a labyrinth. Use the Sacré-Cœur dome as a landmark to orient yourself, or download an offline map before you wander into the winding alleys.'
  },
  {
    number: 4,
    tag: 'Eiffel Reunion',
    tagColor: 'bg-rose-100 text-rose-700',
    title: '4. Amour at the Tower',
    teaser: "Asking a friendly gendarme for help, remembering their promise to meet at the highest point, and a sparkling farewell under the Eiffel Tower.",
    image: '/images/comics/paris/strip-4.jpg',
    imageAlt: "Wayne & Luna's Paris reunion. Panels show: Wayne asking a policeman with a drawing of Luna, Luna looking up at the Eiffel Tower remembering their promise, a big hug on the Eiffel Tower observation deck, and watching the tower sparkle at night from a bridge saying goodbye.",
    story: [
      'Wayne realized I was missing and ran to a friendly gendarme. He pulled out a little sketch from his pocket — a drawing he had made of me at the café. "Mon amie! Perdue!" he explained. The policeman nodded kindly and helped him search.',
      'Meanwhile, I remembered our promise. If we ever got lost, meet at the highest point. I looked up — the Eiffel Tower stood tall above the city. "The highest point!" I whispered, and started walking toward it with hope.',
      'I took the elevator to the observation deck. The city stretched beneath me like a glittering map. And then I heard it — "LUNA!" I spun around. "WAYNE!" We ran into each other\'s arms, hugging so tight. "Found you," he whispered. "I knew you\'d come," I smiled.',
      'As night fell, the Eiffel Tower began to sparkle — thousands of golden lights dancing across the iron structure. "It\'s like the tower is celebrating with us," I said, leaning on the railing. Wayne put his paw on my shoulder. "Best trip ever. We have to come back."'
    ],
    facts: (
      <>
        <p><strong>The Eiffel Tower Sparkle Show</strong> happens every night after sunset for 5 minutes at the start of each hour. 20,000 golden light bulbs create the dazzling effect, added in 1985 for the tower\'s centennial.</p>
        <p><strong>Paris Police (Préfecture de Police)</strong> officers are called "gendarmes" or "agents de police." They are generally helpful and many speak basic English in tourist areas.</p>
        <p><strong>The Eiffel Tower Observation Deck</strong> at 276 meters offers one of the best panoramic views of Paris, including the Seine, Sacré-Cœur, and the Arc de Triomphe.</p>
      </>
    ),
    lessonTitle: 'Promises Light the Way',
    lesson: (
      <>
        <p>In every adventure, there\'s a risk of getting separated. But a simple promise — to meet at the highest point, to wait where you last saw each other — can turn panic into hope and bring two hearts back together.</p>
      </>
    ),
    tip: 'The Eiffel Tower sparkle is best viewed from the Trocadéro esplanade or from a Seine river cruise. For the tower itself, book evening tickets in advance and arrive before sunset for both day and night views.'
  }
];



function StripCard({ strip }: { strip: typeof strips[0] }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      layout
      className="bg-white border-2 border-pink-100 rounded-3xl overflow-hidden hover:border-pink-200 transition-all shadow-sm"
    >
      <div className="overflow-hidden bg-slate-50 border-b border-pink-50 relative">
        <img
          src={strip.image}
          alt={strip.imageAlt}
          className="w-full h-auto object-contain"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm border border-pink-100 rounded-xl px-3 py-1 font-bold text-pink-600 text-xs shadow-sm">
          Comic Strip (4 Panels)
        </div>
      </div>

      <div className="px-6 pt-5 pb-4">
        <div className="flex items-center gap-2 mb-3">
          <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${strip.tagColor}`}>
            {strip.tag}
          </span>
          <span className="text-xs text-slate-400">Story {strip.number} of 4</span>
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">{strip.title}</h2>
        <p className="text-sm text-slate-600 leading-relaxed italic">"{strip.teaser}"</p>
      </div>

      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-6 py-3.5 border-t border-pink-50 hover:bg-pink-50/20 transition-colors text-left"
      >
        <span className="text-sm font-semibold text-pink-500 hover:text-pink-600 flex items-center gap-1">
          <Sparkles className="w-4 h-4" /> {open ? 'Hide details' : 'Read the full story, facts & lesson'}
        </span>
        {open ? <ChevronUp className="w-4 h-4 text-pink-400" /> : <ChevronDown className="w-4 h-4 text-pink-400" />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-8 space-y-6 border-t border-pink-50 pt-6 bg-pink-50/10">
              <StorySection title="The Story Behind the Strip">
                {strip.story.map((para, i) => (
                  <p key={i} className="text-slate-700 leading-relaxed text-sm">{para}</p>
                ))}
              </StorySection>

              <FactBox>{strip.facts}</FactBox>

              <LessonBox title={strip.lessonTitle}>{strip.lesson}</LessonBox>

              <LunaTip>{strip.tip}</LunaTip>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function LunaComicParis() {
  return (
    <>
      <SEOHead
        title="Luna & Wayne's Parisian Adventure | Luna's Journey"
        description="Join Wayne and Luna on their Parisian adventure! A 4-part chibi storybook comic about the Louvre, Montmartre, macarons, and a magical Eiffel Tower reunion."
        ogImage="/images/comics/paris/cover.jpg"
      />

      <div className="mb-8">
        <Link
          to="/luna/comics"
          className="inline-flex items-center gap-2 text-sm text-pink-500 hover:text-pink-600 font-semibold transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Comics Library
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-10 text-center"
      >
        <div className="rounded-3xl overflow-hidden border-2 border-pink-100 shadow-md mb-7 max-w-4xl mx-auto aspect-[16/9] bg-pink-100 relative">
          <img
            src="/images/comics/paris/cover.jpg"
            alt="Luna & Wayne's Parisian Adventure Cover"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-pink-900/60 via-transparent to-transparent flex items-end p-6 justify-center">
            <div className="text-white text-center">
              <span className="inline-block px-3 py-1 bg-yellow-400 text-slate-900 text-xs font-bold rounded-full uppercase tracking-wider mb-2">
                Chibi Storybook Series 🐰
              </span>
              <h1 className="text-2xl sm:text-4xl font-bold font-header drop-shadow-md">
                Luna & Wayne's Parisian Adventure
              </h1>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-3 mb-4">
          <span className="px-3 py-1 bg-pink-100 text-pink-800 text-xs font-bold rounded-full uppercase tracking-wide">
            Travel Series · Issue #9
          </span>
          <span className="text-xs text-slate-400">June 2026 · 4 Strips</span>
        </div>

        <p className="text-slate-500 leading-relaxed mb-6 max-w-2xl mx-auto font-sans">
          A delightful journey through the City of Light! Follow Luna the rabbit and Wayne the cat as they fly to Paris, explore the Louvre, taste colorful macarons, get lost in the winding streets of Montmartre, and reunite under the sparkling Eiffel Tower.
        </p>

        <div className="flex justify-center">
          <ShareBar
            title="Luna & Wayne's Parisian Adventure"
            summary="A charming 4-strip chibi storybook trip to Paris by Wayne and Luna!"
          />
        </div>
      </motion.div>

      <div className="space-y-8 mb-12 max-w-4xl mx-auto">
        {strips.map((strip) => (
          <motion.div
            key={strip.number}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.35, delay: 0.05 }}
          >
            <StripCard strip={strip} />
          </motion.div>
        ))}
      </div>



      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="flex items-center justify-between py-6 border-t border-pink-100 mb-10 max-w-4xl mx-auto"
      >
        <Link
          to="/luna/comics"
          className="text-sm text-pink-500 hover:text-pink-600 font-bold transition-colors"
        >
          ← Back to Comics Library
        </Link>
        <ShareBar
          title="Luna & Wayne's Parisian Adventure"
          summary="An illustrated Paris travel diary."
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-3xl px-8 py-10 text-center text-white shadow-md max-w-4xl mx-auto"
      >
        <h2 className="text-2xl font-bold font-header mb-2">Want to see more adventures?</h2>
        <p className="text-pink-100 text-sm mb-6 max-w-md mx-auto">
          Luna updates her learning journal and creative projects every Sunday. Check out the weekly logs to see what we build next!
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/luna"
            className="inline-flex items-center justify-center gap-2 bg-white text-pink-600 font-bold text-sm px-6 py-3 rounded-2xl hover:bg-pink-50 transition-colors shadow-sm"
          >
            Explore My Journal
          </Link>
          <a
            href={import.meta.env.PROD ? 'https://wayne.bunnyuniverse.com' : '/?persona=wayne'}
            className="inline-flex items-center justify-center gap-2 bg-pink-600 text-white border border-pink-400 font-bold text-sm px-6 py-3 rounded-2xl hover:bg-pink-700 transition-colors shadow-sm"
          >
            Visit Wayne's Plans
          </a>
        </div>
      </motion.div>
      <CommentSection />
    </>
  );
}
