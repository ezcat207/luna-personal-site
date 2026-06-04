import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, MapPin, Sparkles } from 'lucide-react';
import { SEOHead } from '../../components/SEOHead';
import { ShareBar } from '../../components/ShareBar';

// ── Reusable sub-components (Luna's Premium Aesthetics) ────────────────

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
        📍 Seattle Fast Facts
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

// ── Comic strips data ──────────────────────────────────────────────────

const strips = [
  {
    number: 1,
    tag: 'Seattle Arrival',
    tagColor: 'bg-teal-100 text-teal-700',
    title: '1. Heading to the Emerald City',
    teaser: "Luna's plotting, Wayne's seafood motivation, driving through the rain, and reaching the Pike Place Market sign!",
    image: '/images/comics/seattle/strip-1.jpg',
    imageAlt: "Wayne & Luna's road trip to Seattle. Panels show: Luna planning on a map while Wayne yawns on the couch dreaming of fish, driving in the rain with the Space Needle ahead, walking down cobblestone streets, and high-fiving in front of the Pike Place Market clock.",
    story: [
      'I spent hours looking at the map of the Pacific Northwest, plotting our route. "Wayne! Look at all the amazing places in Seattle! Let\'s go!" I cheered. Wayne yawned on the couch, rubbing his eyes. "*yawn* Fine, if there\'s good seafood. We should start now..." he said, already dreaming of fresh salmon.',
      'We hit the road, driving through the classic Washington mist. As the skyline came into view, I gasped, pointing through the windshield. "Wow! We\'re almost there! Look at that needle!" Wayne gripped the steering wheel, peering through the rain. "Getting close. Roads are a bit slick," he advised.',
      'We parked and walked down the cobblestone streets of Pike Place. The brick buildings and salty breeze felt so different from home. "We\'re really here, Wayne!" I said, looking around in awe as we walked side by side.',
      'We made it to the famous Pike Place Market sign and gave each other an enthusiastic high-five! "Yes! We did it! Look at that sign!" I cheered. Wayne breathed in the crisp Pacific air, smiling. "And the air smells amazing..." he agreed, his nose twitching at the scent of fish.'
    ],
    facts: (
      <>
        <p><strong>Pike Place Market</strong> is one of the oldest continuously operated public farmers\' markets in the United States, established in 1907.</p>
        <p><strong>The Space Needle</strong> was built for the 1962 World\'s Fair and stands at 605 feet tall, dominating the city\'s skyline.</p>
        <p><strong>Washington Rain</strong>: Despite its reputation, Seattle actually receives less annual rainfall than cities like New York or Atlanta, but it has more overcast and drizzly days.</p>
      </>
    ),
    lessonTitle: 'The Excitement of the Road',
    lesson: (
      <>
        <p>Planning a journey is half the fun, and sharing the drive with a friend makes even a long road trip pass in the blink of an eye.</p>
      </>
    ),
    tip: 'When driving into Seattle from the south, take I-5 North for a classic, stunning view of the downtown skyline framing the Space Needle as you exit the highway.'
  },
  {
    number: 2,
    tag: 'Seattle Sightseeing',
    tagColor: 'bg-blue-100 text-blue-700',
    title: '2. Pike Place Fish & Water Views',
    teaser: 'Flying salmon at the fish market, custom coffee cups, the Seattle Great Wheel, and the sticky (but disgusting) Gum Wall.',
    image: '/images/comics/seattle/strip-2.jpg',
    imageAlt: "Wayne & Luna sightseeing. Panels show: fishmongers throwing salmon at Pike Place Fish, sitting inside the original Starbucks, looking at the Great Wheel and Puget Sound, and cringing in disgust at the colorful Post Alley Gum Wall.",
    story: [
      'We walked into the heart of the market and saw fishmongers shouting and tossing huge fish across the counter. "Wow! The flying salmon!" I squealed, clapping my hands. "Unreal! They actually throw it!" Wayne exclaimed, his cat eyes wide with excitement.',
      'Next, we queued up at the very first Starbucks coffee shop. Clutching our drinks with cute custom cups, we enjoyed the cozy atmosphere. "Such a cozy coffee shop! Custom cups!" I smiled, sipping my warm drink. "The very first one!" Wayne added, proud of our coffee pilgrimage.',
      'We strolled down to the waterfront. The massive Seattle Great Wheel stood tall against the mountains and Puget Sound. "Look, Wayne! The view!" I pointed out across the harbor. "So many boats and the big wheel!" Wayne marvelled, watching the ferries glide by.',
      'Before leaving the market area, we took a detour to Post Alley. We found ourselves surrounded by thousands of colorful pieces of chewed gum stuck to the brick walls. "Ugh... is that... real gum?" I asked, wrinkling my nose. "Eeeeew... and it\'s... everywhere! Yuck!" Wayne cringed, holding his paws back in disgust.'
    ],
    facts: (
      <>
        <p><strong>Pike Place Fish Market</strong> is world-famous for its fishmongers throwing fish (usually King Salmon) to each other to expedite orders and entertain crowds.</p>
        <p><strong>The Original Starbucks</strong> opened in 1971 at 1912 Pike Place. It still retains its original brown logo and rustic interior.</p>
        <p><strong>The Gum Wall</strong> under Pike Place Market is a brick alleyway covered in used chewing gum. It started in the 1990s and is now one of the city\'s most unusual tourist attractions.</p>
      </>
    ),
    lessonTitle: 'A Mix of Sights',
    lesson: (
      <>
        <p>Travel is full of contrasts: from the cozy warmth of a coffee house to the salty ocean breeze, and from breathtaking scenic views to quirky (and slightly gross) local landmarks.</p>
      </>
    ),
    tip: 'The queue at the original Starbucks can be incredibly long. Go early in the morning (before 8 AM) to avoid the crowd, or check out the Starbucks Reserve Roastery in Capitol Hill for a more premium experience.'
  },
  {
    number: 3,
    tag: 'Lost in the Rain',
    tagColor: 'bg-amber-100 text-amber-700',
    title: '3. Caught in a Downpour',
    teaser: 'An unexpected Seattle downpour brings chaos, separating Luna and Wayne in the crowded market with a dead phone.',
    image: '/images/comics/seattle/strip-3.jpg',
    imageAlt: "Wayne & Luna separated. Panels show: Luna looking at roses while a fish flies behind her, sudden pouring rain causing chaos in the crowd, Wayne looking frantically for Luna in the rain with an umbrella, and Luna sitting on the wet curb with a dead phone.",
    story: [
      'As we walked back past the flower stalls, I stopped to admire the vibrant bouquets. "Ooh, look at these roses!" I smiled, leaning in to smell them. Just behind me, fish were still flying with a loud *swoosh*.',
      'But in true Seattle fashion, the sky suddenly turned dark and a heavy downpour started. The streets erupted into panic as tourists ran for cover. "CHAOS!" Wayne yelled as people pushed past him under their umbrellas.',
      'In the sudden rush of the crowd, we got separated. Wayne held his umbrella high, looking around frantically. "Luna! Luna! Where are you?!" he cried out, his voice drowned out by the pouring rain and distressed meows.',
      'Meanwhile, I had stepped under a small awning, shivering. I pulled out my phone to call him, but the screen remained black. "My phone... it\'s dead..." I whispered, sitting on the wet curb feeling completely lost and alone.'
    ],
    facts: (
      <>
        <p><strong>Seattle Weather</strong> can change rapidly. A clear morning can easily turn into a rainy afternoon, so locals always carry layers.</p>
        <p><strong>Umbrella Etiquette</strong>: Many Seattle locals rarely use umbrellas, preferring waterproof hoods or rain jackets instead. Using an umbrella in a crowded market can be tricky!</p>
        <p><strong>Flower Stalls</strong>: Pike Place Market is famous for its gorgeous, inexpensive flower bouquets, hand-grown by local Hmong farmers.</p>
      </>
    ),
    lessonTitle: 'Expect the Unexpected',
    lesson: (
      <>
        <p>Even the best-planned trips can face sudden downpours. Keeping a backup plan and staying calm when things go wrong is key to any successful adventure.</p>
      </>
    ),
    tip: 'Keep a portable phone charger in your daypack, and remember that if you get lost, many shops and cafes in Pike Place have free Wi-Fi where you can recharge or coordinate.'
  },
  {
    number: 4,
    tag: 'Space Needle Reunion',
    tagColor: 'bg-rose-100 text-rose-700',
    title: '4. Reunion Above the Clouds',
    teaser: "Remembering their promise to meet at the highest point, a heartwarming reunion on the Space Needle deck, and a sunset over Puget Sound.",
    image: '/images/comics/seattle/strip-4.jpg',
    imageAlt: "Wayne & Luna's reunion. Panels show: Luna remembering their promise to meet at the highest point, Wayne and Luna running and hugging on the Space Needle deck, standing side-by-side watching the sunset over Puget Sound, and walking back to the car at dusk with warm coffee.",
    story: [
      'As the rain began to clear, I remembered a promise we had made before the trip. If we ever got separated, we would meet at the highest point in the city—the Space Needle. "Do you remember, Wayne?" I thought, looking up at the towering structure in the distance.',
      'I bought a ticket and rode the glass elevator to the top. As I stepped onto the observation deck, a familiar voice called out. "LUNA!" Wayne yelled, running towards me. "/ WAYNE! We did it!" I cheered, hugging him tightly. "Found you..." he whispered, finally letting out a sigh of relief.',
      'We stood side-by-side at the glass barrier, watching the sun dip below the mountains. The sky turned a brilliant orange, reflecting off the water. "It was worth the climb," we agreed, gazing out at Puget Sound and the Olympic Mountains.',
      'We walked back to the car at dusk, holding warm cups of coffee. "Best day trip ever!" I smiled, feeling warm inside despite the cool evening breeze. "I\'m so glad we came," Wayne agreed, looking at the city lights twinkling behind us.'
    ],
    facts: (
      <>
        <p><strong>The Space Needle Deck</strong> features "The Loupe"—the world\'s first and only rotating glass floor, allowing you to see the city directly beneath your feet.</p>
        <p><strong>Puget Sound</strong> is a deep fjord-like estuary connected to the Pacific Ocean, home to diverse marine life including Orca whales.</p>
        <p><strong>The Olympic Mountains</strong> lie to the west of Seattle across Puget Sound, offering a spectacular backdrop during clear sunsets.</p>
      </>
    ),
    lessonTitle: 'Promises and Trust',
    lesson: (
      <>
        <p>A strong partnership means having clear agreements and trusting that, no matter how lost you get, you will always find your way back to each other.</p>
      </>
    ),
    tip: 'Visit the Space Needle during the "golden hour" (just before sunset). A ticket includes access to the glass floor, and the sunset over the Olympic Mountains is absolutely unforgettable.'
  }
];

// ── Seattle Guide (collapsible) ────────────────────────────────────

function SeattleTravelGuide() {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white border-2 border-pink-100 rounded-3xl overflow-hidden shadow-sm">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-6 py-5 hover:bg-pink-50/30 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <MapPin className="w-4 h-4 text-pink-600" />
          </div>
          <div>
            <p className="font-bold text-slate-800">Luna's Seattle Travel Guide</p>
            <p className="text-xs text-slate-400 mt-0.5">Driving routes, Pike Place highlights, rainy weather tips, and Space Needle tricks!</p>
          </div>
        </div>
        {open ? <ChevronUp className="w-5 h-5 text-slate-400 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="border-t border-pink-50 px-6 py-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-600 leading-relaxed font-sans">
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-slate-800 mb-1">🚗 Driving & Transit</p>
                  <p>Parking near Pike Place Market can be expensive and competitive. Consider parking further out and taking the Link Light Rail directly to Westlake Station, which is a short walk from the market.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">🐠 Pike Place Market Highlights</p>
                  <p>Watch the famous fish throwing at Pike Place Fish Market, buy a fresh flower bouquet, and grab a warm Russian pastry or some fresh cheese curds from the local shops.</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-slate-800 mb-1">🌧️ Rainy Day Prep</p>
                  <p>In Seattle, it is often better to wear a good waterproof windbreaker or rain jacket instead of carrying a large umbrella. It makes navigating crowded market alleys and narrow streets much easier!</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">🗼 Space Needle Sunset</p>
                  <p>Book Space Needle tickets in advance. If you're looking for a slightly cheaper view that includes the Space Needle in the skyline, visit the Columbia Center's Sky View Observatory or check out the classic view from Kerry Park.</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Individual comic strip card ──────────────────────────────────────

function StripCard({ strip }: { strip: typeof strips[0] }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      layout
      className="bg-white border-2 border-pink-100 rounded-3xl overflow-hidden hover:border-pink-200 transition-all shadow-sm"
    >
      {/* Image */}
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

      {/* Title & Teaser */}
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

      {/* Toggle button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-6 py-3.5 border-t border-pink-50 hover:bg-pink-50/20 transition-colors text-left"
      >
        <span className="text-sm font-semibold text-pink-500 hover:text-pink-600 flex items-center gap-1">
          <Sparkles className="w-4 h-4" /> {open ? 'Hide details' : 'Read the full story, facts & lesson'}
        </span>
        {open ? <ChevronUp className="w-4 h-4 text-pink-400" /> : <ChevronDown className="w-4 h-4 text-pink-400" />}
      </button>

      {/* Expandable content */}
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
              {/* Story */}
              <StorySection title="The Story Behind the Strip">
                {strip.story.map((para, i) => (
                  <p key={i} className="text-slate-700 leading-relaxed text-sm">{para}</p>
                ))}
              </StorySection>

              {/* Facts */}
              <FactBox>{strip.facts}</FactBox>

              {/* Lesson */}
              <LessonBox title={strip.lessonTitle}>{strip.lesson}</LessonBox>

              {/* Travel tip */}
              <LunaTip>{strip.tip}</LunaTip>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Main page ────────────────────────────────────────────────────────

export default function LunaComicSeattle() {
  return (
    <>
      <SEOHead
        title="Luna & Wayne: The Seattle Explorers | Luna's Journey"
        description="Join Wayne and Luna on their road trip to Seattle! An illustrated 4-part Chibi storybook travel comic featuring Pike Place Market, Space Needle reunions, and rain storms."
      />

      {/* Back nav */}
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

      {/* Cover / Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-10 text-center"
      >
        <div className="rounded-3xl overflow-hidden border-2 border-pink-100 shadow-md mb-7 max-w-4xl mx-auto aspect-[16/9] bg-pink-100 relative">
          <img
            src="/images/comics/seattle/cover.jpg"
            alt="Luna & Wayne: The Seattle Explorers Cover"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-pink-900/60 via-transparent to-transparent flex items-end p-6 justify-center">
            <div className="text-white text-center">
              <span className="inline-block px-3 py-1 bg-yellow-400 text-slate-900 text-xs font-bold rounded-full uppercase tracking-wider mb-2">
                Chibi Storybook Series 🐰
              </span>
              <h1 className="text-2xl sm:text-4xl font-bold font-header drop-shadow-md">
                Luna & Wayne: The Seattle Explorers
              </h1>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-3 mb-4">
          <span className="px-3 py-1 bg-teal-100 text-teal-800 text-xs font-bold rounded-full uppercase tracking-wide">
            Travel Series · Issue #8
          </span>
          <span className="text-xs text-slate-400">June 2026 · 4 Strips</span>
        </div>

        <p className="text-slate-500 leading-relaxed mb-6 max-w-2xl mx-auto font-sans">
          A charming chronicle of tiny adventures in the Emerald City! Follow Luna the rabbit and Wayne the cat as they take a road trip to Seattle, visit Pike Place Market and the Space Needle, get separated in the pouring rain, and reunite at the city's highest point.
        </p>

        <div className="flex justify-center">
          <ShareBar
            title="Luna & Wayne: The Seattle Explorers"
            summary="A charming 4-strip chibi storybook road trip to Seattle by Wayne and Luna!"
          />
        </div>
      </motion.div>

      {/* Comic Strips */}
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

      {/* Seattle Guide */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12 max-w-4xl mx-auto"
      >
        <SeattleTravelGuide />
      </motion.div>

      {/* Bottom Navigation */}
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
          title="Luna & Wayne: The Seattle Explorers"
          summary="An illustrated Seattle Chibi storybook travel diary."
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
    </>
  );
}
