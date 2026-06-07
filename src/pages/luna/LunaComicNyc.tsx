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
        📍 NYC Fast Facts
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
    tag: 'NYC Arrival',
    tagColor: 'bg-blue-100 text-blue-700',
    title: '1. Welcome to New York!',
    teaser: 'Flying across the country, landing in New York City, and taking our very first yellow cab selfie!',
    image: '/images/comics/nyc/strip-1.jpg',
    imageAlt: "Wayne & Luna's arrival in NYC. Panels show: looking out the plane window at the skyline, taking a yellow cab through Times Square, snapping a cab selfie, and deciding between Central Park and hot dogs.",
    story: [
      '"Look, Wayne! So many buildings!" I pressed my face against the airplane window, pointing at the skyscrapers. "Unbelievable! We\'re here!" Wayne marvelled as we landed.',
      'We hopped in a yellow taxi and drove through Times Square. "So... much... light!" I gasped. "I feel so small!" Wayne whispered, looking out at the massive glowing billboards.',
      'We pulled over and took a quick selfie in front of our cab. "Okay, smile! Our first photo!" I said as the camera clicked. "NYC is awesome!" Wayne cheered.',
      'We stepped onto the sidewalk and opened our map. "Okay, Central Park first!" I said, pointing uptown. "No, a hot dog first!" Wayne counter-offered, patting his stomach.'
    ],
    facts: (
      <>
        <p><strong>Times Square</strong> is famous for its bright, multi-story digital billboards and is known as "The Crossroads of the World."</p>
        <p><strong>Yellow Cabs</strong> are an iconic symbol of New York City, first introduced in the early 20th century to standardise taxicab services.</p>
        <p><strong>New York City Skyline</strong> features world-famous skyscrapers like the Empire State Building and the Chrysler Building.</p>
      </>
    ),
    lessonTitle: 'The Joy of Arrival',
    lesson: (
      <>
        <p>Arriving in a huge, bustling city can be overwhelming but also incredibly exciting. Capturing those first moments of awe helps preserve the fresh anticipation of the trip.</p>
      </>
    ),
    tip: 'If you take a taxi from JFK Airport, look for the official taxi stand. There is a flat fare to Manhattan plus tolls and tips, so avoid unofficial drivers offering rides inside the terminal.'
  },
  {
    number: 2,
    tag: 'NYC Sights',
    tagColor: 'bg-green-100 text-green-700',
    title: '2. Exploring the Big Apple',
    teaser: 'Seeing the Statue of Liberty from the ferry, rowing a boat in Central Park, enjoying street music in Times Square, and taking a selfie on the Brooklyn Bridge.',
    image: '/images/comics/nyc/strip-2.jpg',
    imageAlt: "Wayne & Luna sightseeing in NYC. Panels show: standing on a ferry looking at the Statue of Liberty, rowing a boat on Central Park lake, enjoying street performers in Times Square at night, and taking a selfie on the Brooklyn Bridge at sunset.",
    story: [
      'We boarded the ferry to Liberty Island. "Look, Wayne! Liberty!" I cheered, pointing at the colossal green statue. "Okay, pretty cool," Wayne smiled, adjusting his eye patch.',
      'Next, we rented a wooden boat at Central Park. "This is the best hot dog ever!" I cheered, eating my snack in the middle of the lake. "You\'re not rowing!" Wayne complained, sweating over the oars.',
      'At night, we walked through the neon streets. Street guitarists were playing lively tunes, and people were chatting. "The city that never sleeps!" I yelled over the music.',
      'We walked across the historic Brooklyn Bridge. We squeezed together for one last selfie: "#NYCAdventure! Sunset view." Behind us, the bridge towers glowed in the pink and orange sunset.'
    ],
    facts: (
      <>
        <p><strong>The Statue of Liberty</strong> was a gift from France to the United States and was dedicated in 1886 as a symbol of freedom and democracy.</p>
        <p><strong>Central Park Lake</strong> allows visitors to rent classic wooden rowboats from the Loeb Boathouse to row around the 22-acre water body.</p>
        <p><strong>The Brooklyn Bridge</strong> was completed in 1883 and is one of the oldest suspension bridges in the United States, connecting Manhattan and Brooklyn over the East River.</p>
      </>
    ),
    lessonTitle: 'Balancing Work & Play',
    lesson: (
      <>
        <p>A great adventure requires cooperation. While one companion rows (or works), the other can provide the moral support (or eat the hot dog!). Appreciating each other\'s efforts makes the sunset views even sweeter.</p>
      </>
    ),
    tip: 'You can take the free Staten Island Ferry for a great view of the Statue of Liberty and the Manhattan skyline without waiting in long ticket lines. For Brooklyn Bridge, walk from Brooklyn to Manhattan during sunset for the best skyline views!'
  },
  {
    number: 3,
    tag: 'Subway Labyrinth',
    tagColor: 'bg-amber-100 text-amber-700',
    title: '3. Subway Spaghetti Labyrinth',
    teaser: 'Navigating the crowded subway stations, taking the wrong train in the wrong direction, and asking a helpful local for directions.',
    image: '/images/comics/nyc/strip-3.jpg',
    imageAlt: "Wayne & Luna getting lost in the subway. Panels show: crowded subway turnstiles at Times Square, looking worriedly inside a subway car going uptown, staring at a confusing subway map, and asking a local for directions on a station bench.",
    story: [
      'We walked down into the 42nd Street Subway station. "I think this is it... right?" I mumbled nervously. "So... many... people," Wayne muttered, squeezed between commuters.',
      'We rushed onto a train, but immediately realised something was wrong. "That wasn\'t our stop! It said \'Uptown\'!" I cried. "We\'re going the wrong way, aren\'t we?" Wayne sighed.',
      'We got off and stared at a massive map on the wall. "This map... it\'s a labyrinth! Which colored line are we even on?" I asked. "I don\'t know, it just looks like a mess of spaghetti!" Wayne groaned.',
      'Exhausted, I sat on a green station bench. "(zZz... I\'m so done...)" I sighed. Wayne walked up to a passing local: "Um, excuse me... are we... are we anywhere near Central Park?" The man smiled: "Central Park? You\'re way off, kid..."'
    ],
    facts: (
      <>
        <p><strong>The New York City Subway</strong> has over 472 stations, making it one of the largest rapid transit systems in the world by number of stations.</p>
        <p><strong>Uptown vs. Downtown</strong>: In Manhattan, trains heading north are marked "Uptown" (towards Central Park and the Bronx) and trains heading south are marked "Downtown" (towards Lower Manhattan and Brooklyn).</p>
        <p><strong>Subway Maps</strong> use colored lines to group routes that share tracks in Midtown Manhattan, which can be tricky for first-time visitors!</p>
      </>
    ),
    lessonTitle: 'Learning from Mistakes',
    lesson: (
      <>
        <p>Getting lost is a normal part of exploring any new city. Taking the wrong train teaches us how to read signs more carefully and when to ask friendly locals for help.</p>
      </>
    ),
    tip: 'Use a transit app like Google Maps or Citymapper to plan subway trips. You can tap your phone or contact-less card at the OMNY readers to pay the fare directly without buying a MetroCard!'
  },
  {
    number: 4,
    tag: 'NYC Ending',
    tagColor: 'bg-red-100 text-red-700',
    title: '4. A Pizza-Filled Happy Ending',
    teaser: 'Finding the way back to the surface, devouring giant NYC pizza slices, looking out over the breathtaking skyline, and saying farewell at the airport.',
    image: '/images/comics/nyc/strip-4.jpg',
    imageAlt: "Wayne & Luna's trip ending. Panels show: exiting the subway stairs into the sunlight, eating giant slices of pepperoni pizza at a checkerboard table, looking at the skyline from a high deck at sunset, and standing in the airport holding I Heart NY bags.",
    story: [
      'Finally, we found the right subway stairs. "Finally, sunlight!" I cheered as we climbed back up to the street. "We made it!" Wayne laughed, glad to leave the underground.',
      'We celebrated by ordering a giant pepperoni pizza. "Best pizza ever!" Wayne declared, pulling a huge, cheese-stretching slice. "Mmm, so good!" I mumbled, mouth full of delicious crust.',
      'At sunset, we stood at a high observatory deck. The Empire State Building and Manhattan skyline stretched out before us. "Wow..." Wayne whispered. "It\'s breathtaking..." I agreed.',
      'At the airport, holding our \'I Love NY\' souvenir bags and Statue of Liberty toys, we looked out at the planes. "Until next time, NY!" Wayne waved. And so, our amazing trip came to a happy, heartwarming end.'
    ],
    facts: (
      <>
        <p><strong>New York-style Pizza</strong> is famous for its large, hand-tossed thin crust, which is traditionally folded in half to eat on the go.</p>
        <p><strong>Observatory Decks</strong> in NYC (like Top of the Rock, Empire State Building, or Edge) offer panoramic views of the city skyline from hundreds of feet in the air.</p>
        <p><strong>NYC Souvenirs</strong> like the classic "I ❤️ NY" t-shirts and miniature Statue of Liberty figures are popular ways to bring a piece of the city back home.</p>
      </>
    ),
    lessonTitle: 'Every Journey Has a Destination',
    lesson: (
      <>
        <p>No matter how many wrong turns you take, pushing through the challenges leads to the sweetest rewards—like a warm slice of pizza and a breathtaking view. The memories we make are the best souvenirs.</p>
      </>
    ),
    tip: 'Fold your pizza slice lengthwise (like a taco) to keep the grease from dripping and make it easier to eat. If visiting an observatory, book tickets online for a slot 30 minutes before sunset to see the city in both daylight and nighttime lights!'
  }
];

// ── NYC Guide (collapsible) ────────────────────────────────────────

function NycTravelGuide() {
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
            <p className="font-bold text-slate-800">Luna's NYC Chibi Storybook Travel Guide</p>
            <p className="text-xs text-slate-400 mt-0.5">Subway transit tips, Central Park rowboats, and how to eat NYC pizza!</p>
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
                  <p className="font-semibold text-slate-800 mb-1">🚇 Subway Survival Basics</p>
                  <p>When entering the subway station, verify the platform signs say "Uptown" (northbound) or "Downtown" (southbound) before passing through the turnstiles. Keep your mobile payment ready to tap at the OMNY reader.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">🌳 Central Park & Liberty Ferry</p>
                  <p>Rent a rowboat at the Loeb Boathouse for a peaceful ride. For a cheap view of the Statue of Liberty, ride the free Staten Island Ferry, which departs every 15-30 minutes from the Whitehall Terminal.</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-slate-800 mb-1">🍕 NYC Pizza Etiquette</p>
                  <p>Fold your large slice in half lengthwise. This helps control the cheese and prevents the crust from sagging, letting you eat it easily in one hand like a true New Yorker!</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">🏙️ Skyline Sunset Spots</p>
                  <p>Book observatory tickets at least 1-2 weeks in advance, especially for sunset slots. Top of the Rock offers the best view of the Empire State Building, while Edge features a glass floor overlooking the city.</p>
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

export default function LunaComicNyc() {
  return (
    <>
      <SEOHead
        title="Luna & Wayne's Adventure to New York | Luna's Journey"
        description="Follow Wayne and Luna's grand trip to New York City! An illustrated 4-part Chibi storybook adventure with subway guides, pizza tips, and sightseeing stories."
        ogImage="/images/comics/nyc/cover.jpg"
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
            src="/images/comics/nyc/cover.jpg"
            alt="Luna & Wayne's Adventure to New York Cover"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-pink-900/60 via-transparent to-transparent flex items-end p-6 justify-center">
            <div className="text-white text-center">
              <span className="inline-block px-3 py-1 bg-yellow-400 text-slate-900 text-xs font-bold rounded-full uppercase tracking-wider mb-2">
                Chibi Storybook Series 🐰
              </span>
              <h1 className="text-2xl sm:text-4xl font-bold font-header drop-shadow-md">
                Luna & Wayne's Adventure to New York
              </h1>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-3 mb-4">
          <span className="px-3 py-1 bg-pink-100 text-pink-800 text-xs font-bold rounded-full uppercase tracking-wide">
            Travel Series · Issue #7
          </span>
          <span className="text-xs text-slate-400">June 2026 · 4 Strips</span>
        </div>

        <p className="text-slate-500 leading-relaxed mb-6 max-w-2xl mx-auto font-sans">
          A chibi storybook journey through New York City! Follow Wayne and Luna as they land in NYC, get lost in the crowded subway system, discover the Statue of Liberty, row in Central Park, eat giant pizza slices, and view the sunset from a skyscraper.
        </p>

        <div className="flex justify-center">
          <ShareBar
            title="Luna & Wayne's Adventure to New York"
            summary="A fun 4-strip chibi storybook travel diary to NYC by Wayne and Luna!"
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

      {/* NYC Guide */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12 max-w-4xl mx-auto"
      >
        <NycTravelGuide />
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
          title="Luna & Wayne's Adventure to New York"
          summary="An illustrated NYC Chibi storybook travel diary."
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
