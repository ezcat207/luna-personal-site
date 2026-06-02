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
        📍 China Fast Facts
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
    tag: 'Arrival & Selfie',
    tagColor: 'bg-blue-100 text-blue-700',
    title: '1. Welcome to Beijing!',
    teaser: 'Flying across the ocean, landing at Beijing Capital International Airport, and snapping our very first travel selfie!',
    image: '/images/comics/china-adventure/strip-1.jpg',
    imageAlt: 'Wayne & Luna\'s arrival in Beijing. Panels show: looking out the plane window at the Great Wall, claiming baggage at the carousel, walking past the Welcome to Beijing sign, and taking a close-up travel selfie together.',
    story: [
      '"Nearly there, Wayne!" I pressed my face against the airplane window, pointing excitedly at the winding Great Wall and mountain ridges visible below the clouds.',
      'After landing, we headed to Baggage Claim. "Found them! Let\'s find the exit!" Wayne cheered, pulling our matching rolling bags off the belt.',
      'As we walked into the arrival hall, a massive red-and-yellow "WELCOME TO BEIJING" sign greeted us. "Wow, this airport is huge!" I exclaimed.',
      '"First trip together!" I giggled. "Travel Selfie! Click!" We leaned our heads together and snapped a beautiful photo to remember our first moments in China.'
    ],
    facts: (
      <>
        <p><strong>Beijing Capital International Airport (PEK)</strong> is one of the busiest airports in the world and serves as the main gateway to Beijing.</p>
        <p><strong>The Great Wall</strong> can sometimes be spotted from flights landing at PEK, winding across the rugged mountain ranges north of the city.</p>
        <p><strong>First-time travel selfies</strong> are a must-do tradition for Wayne and Luna on every new adventure they start!</p>
      </>
    ),
    lessonTitle: 'Embracing the Journey',
    lesson: (
      <>
        <p>The excitement of a trip starts the moment you board the plane. Keeping a visual diary, starting with a simple arrival photo, helps capture the pure joy and anticipation of exploring somewhere new.</p>
      </>
    ),
    tip: 'Keep your passport and declaration forms handy, and remember to pick up a local SIM card or set up an eSIM before leaving the airport terminal for easy navigation.'
  },
  {
    number: 2,
    tag: 'Attractions',
    tagColor: 'bg-green-100 text-green-700',
    title: '2. Great Wall & Lake Adventures',
    teaser: 'Hiking the historic Great Wall, peeking into the Forbidden City, snacking on delicious Tanghulu, and a peaceful boat ride with a local friend.',
    image: '/images/comics/china-adventure/strip-2.jpg',
    imageAlt: 'Wayne & Luna exploring Beijing. Panels show: running on the Great Wall, peeking through the doors of the Forbidden City, eating candied hawthorn (Tanghulu) on a bench, and a serene boat ride on Kunming Lake where a friendly giant panda is rowing.',
    story: [
      '"Great Wall of China! Let\'s Go!" We ran along the historic stone path, leaping into the air as the wall stretched across the green peaks under a gorgeous blue sky.',
      'Next, we explored the Forbidden City. "Forbidden City Mysteries..." we whispered, peeking curiously through the massive red double gates.',
      'For a sweet break, we sat down to eat "Delicious Sweet Tánghúlu!" The candied hawthorns were sticky, sweet, and perfectly crunchy.',
      'We ended the day with a "Peaceful Boat Ride on Kunming Lake!" Wayne and I relaxed in a wooden rowboat while a friendly giant panda gently rowed us through the calm waters of the Summer Palace.'
    ],
    facts: (
      <>
        <p><strong>The Forbidden City</strong> was the imperial palace of China from the Ming dynasty to the end of the Qing dynasty, featuring 9,999 rooms.</p>
        <p><strong>Kunming Lake</strong> is the central lake of the Summer Palace, covering three-quarters of its grounds and offering beautiful views of the Longevity Hill.</p>
        <p><strong>Giant Pandas</strong> are native to south-central China and are widely considered a national treasure and symbol of peace.</p>
      </>
    ),
    lessonTitle: 'Living in the Moment',
    lesson: (
      <>
        <p>Whether running on historical monuments or drifting peacefully on a lake, take the time to soak in the atmosphere. Every experience—active or quiet—adds to the rich tapestry of travel.</p>
      </>
    ),
    tip: 'Try the Mutianyu section of the Great Wall for great views and a fun toboggan slide down, and make sure to buy freshly made Tanghulu from street vendors—it is crunchy on the outside and tangy on the inside!'
  },
  {
    number: 3,
    tag: 'Market Lost',
    tagColor: 'bg-amber-100 text-amber-700',
    title: '3. Lost in the Crowded Market',
    teaser: 'Navigating the bustling market crowd, losing sight of each other, and the anxiety of trying to find the way back.',
    image: '/images/comics/china-adventure/strip-3.jpg',
    imageAlt: 'Wayne & Luna getting separated. Panels show: a thick market crowd under hanging lanterns, Wayne looking around for Luna, Luna looking worriedly for Wayne, Wayne checking a map on his phone, and Luna waiting sadly on a wooden crate.',
    story: [
      'The night market was teeming with people under glowing red lanterns. "Luna?!" Wayne shouted. "Wayne?!" I called out, but the thick crowd quickly separated us.',
      '"Wait... where did he go?!" I looked around anxiously, trying to spot his eye patch through the tall sea of strangers.',
      'Wayne searched in the opposite direction. "I can\'t see her... she\'s so small..." he murmured, looking worriedly between the shoppers.',
      'Wayne checked his phone map in frustration: "Which way was the gate? This map doesn\'t help... and she has my phone number!" Meanwhile, I sat on a crate: "I\'ll wait here, like we said... but what if he\'s far away?"'
    ],
    facts: (
      <>
        <p><strong>Beijing Night Markets</strong> are famous for their lively atmosphere, bright red lanterns, and diverse array of local snacks and souvenirs.</p>
        <p><strong>Hutong Alleys</strong> around markets can form a labyrinth of narrow streets, making it easy to lose your bearings if you wander off the main path.</p>
        <p><strong>Reunion spots</strong> are crucial when traveling in busy foreign cities where mobile signal or navigation apps might not work reliably.</p>
      </>
    ),
    lessonTitle: 'Staying Calm & Prepared',
    lesson: (
      <>
        <p>Getting separated in a crowd can be scary, but staying calm and having a plan—like waiting in the last spot you saw each other—makes all the difference in reuniting safely.</p>
      </>
    ),
    tip: 'Always agree on a specific landmark to meet at if you get lost, and keep a physical card with your hotel name and contact details written in Chinese in your pocket.'
  },
  {
    number: 4,
    tag: 'Reunion & Farewell',
    tagColor: 'bg-red-100 text-red-700',
    title: '4. Reunion & Farewell',
    teaser: 'Finding each other with the help of kind locals, celebrating with a Peking duck feast, releasing sky lanterns at Shichahai, and a fond farewell at PEK airport.',
    image: '/images/comics/china-adventure/strip-4.jpg',
    imageAlt: 'Wayne & Luna reuniting and leaving. Panels show: hugging in a traditional courtyard with helpful elders, enjoying a Peking duck dinner, releasing a wish lantern at Shichahai Lake, and saying goodbye at the airport terminal.',
    story: [
      '"Wayne! I missed you!" "Luna! I found you!" We hugged tightly in a Hutong courtyard. The kind elderly neighborhood residents who helped us reunite waved and smiled.',
      'Relieved and hungry, we celebrated with a Peking duck feast. "This is delicious!" Wayne laughed, showing me how to wrap the crispy duck with cucumbers and sweet bean sauce.',
      'Later, at Shichahai Lake, we released a glowing sky lantern. "I wish for our friendship to last forever," I whispered. "I wish for more adventures!" Wayne added.',
      'At PEK Airport, clutching our souvenirs, it was time to say goodbye. "Thank you, China," Wayne said as we headed to the boarding gate. "We\'ll be back!" I smiled.'
    ],
    facts: (
      <>
        <p><strong>Peking Duck</strong> is a famous Beijing dish consisting of thin, crispy skin and tender meat, typically wrapped in thin pancakes with sweet bean sauce, cucumbers, and scallions.</p>
        <p><strong>Shichahai</strong> is a historical scenic area consisting of three lakes in central Beijing, surrounded by traditional Hutongs and lively cafes.</p>
        <p><strong>Hutongs</strong> are traditional narrow alleys lined with courtyard homes (siheyuan) that represent the historic heart of local Beijing community life.</p>
      </>
    ),
    lessonTitle: 'Gratitude and Friendship',
    lesson: (
      <>
        <p>The best adventures are those that test our bonds and show us the kindness of strangers. Coming together to share a warm meal and make wishes for the future is the perfect end to any journey.</p>
      </>
    ),
    tip: 'Peking duck is best eaten fresh and hot at local specialty restaurants (like Quanjude or Dadong). When visiting Shichahai, rent a paddle boat or walk around the lakes during sunset for a magical view of the historic district.'
  }
];

// ── China Guide (collapsible) ──────────────────────────────────────

function ChinaAdventureGuide() {
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
            <p className="font-bold text-slate-800">Luna's Beijing Adventure Travel Guide</p>
            <p className="text-xs text-slate-400 mt-0.5">Airport arrivals, market survival tips, and Peking duck wrapping etiquette!</p>
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
                  <p className="font-semibold text-slate-800 mb-1">✈️ Airport & Arrival Basics</p>
                  <p>When arriving at PEK Airport, follow the flow to fingerprint scanners, then passport control, and finally the baggage claim. Setting up digital wallets like Alipay or WeChat Pay with your foreign card before arrival is highly recommended for seamless payments everywhere in Beijing.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">🏰 Great Wall & Lakes</p>
                  <p>For the Great Wall, take a morning bus or taxi to Mutianyu. For lakes, Shichahai is perfect in the evening to walk between the old bars, and Kunming Lake at the Summer Palace is beautiful for renting an electric boat or walking the Long Corridor.</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-slate-800 mb-1">🍖 Peking Duck Wrapping Guide</p>
                  <p>1. Spread a thin pancake flat on your plate. 2. Dip a slice of crispy duck skin/meat into sweet bean sauce and place it in the center. 3. Add fresh cucumber strips and scallions. 4. Fold the bottom up, then fold both sides over to create a neat roll. Enjoy in one bite!</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">🚨 Crowded Market Navigation</p>
                  <p>Beijing markets get very busy. Always pin a meeting spot on your maps beforehand, keep your phone fully charged, and write down emergency phone numbers. If you get separated, stay in one place or ask a friendly vendor or police officer for help.</p>
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

export default function LunaComicChinaAdventure() {
  return (
    <>
      <SEOHead
        title="China's Adventure | Luna's Journey"
        description="Follow Wayne and Luna's grand trip to China! An illustrated 4-part comic adventure through Beijing with travel guides, culture tips, and stories."
      />

      {/* Back nav */}
      <div className="mb-8">
        <Link
          to="/luna"
          className="inline-flex items-center gap-2 text-sm text-pink-500 hover:text-pink-600 font-semibold transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Journey
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
            src="/images/comics/china-adventure/cover.jpg"
            alt="China's Adventure"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-pink-900/60 via-transparent to-transparent flex items-end p-6 justify-center">
            <div className="text-white text-center">
              <span className="inline-block px-3 py-1 bg-yellow-400 text-slate-900 text-xs font-bold rounded-full uppercase tracking-wider mb-2">
                New Comic Book 🐰
              </span>
              <h1 className="text-2xl sm:text-4xl font-bold font-header drop-shadow-md">
                China's Adventure
              </h1>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-3 mb-4">
          <span className="px-3 py-1 bg-pink-100 text-pink-800 text-xs font-bold rounded-full uppercase tracking-wide">
            Travel Series · Issue #6
          </span>
          <span className="text-xs text-slate-400">June 2026 · 4 Strips</span>
        </div>

        <p className="text-slate-500 leading-relaxed mb-6 max-w-2xl mx-auto font-sans">
          A four-part journey through Beijing! From arriving at the airport and exploring the Great Wall, to getting separated in a crowded market, reuniting with friendly locals, and wishing on lanterns at Shichahai Lake.
        </p>

        <div className="flex justify-center">
          <ShareBar
            title="China's Adventure"
            summary="A fun 4-strip comic travel diary to China by Wayne and Luna!"
          />
        </div>
      </motion.div>

      {/* Comic Strips (vertical stack like Wayne's) */}
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

      {/* China Guide (collapsible) */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12 max-w-4xl mx-auto"
      >
        <ChinaAdventureGuide />
      </motion.div>

      {/* Bottom Navigation / CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="flex items-center justify-between py-6 border-t border-pink-100 mb-10 max-w-4xl mx-auto"
      >
        <Link
          to="/luna"
          className="text-sm text-pink-500 hover:text-pink-600 font-bold transition-colors"
        >
          ← Back to Luna's Journey
        </Link>
        <ShareBar
          title="China's Adventure"
          summary="An illustrated China travel diary."
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
