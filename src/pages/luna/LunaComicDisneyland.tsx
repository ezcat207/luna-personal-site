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
        📍 Disneyland Fast Facts
      </p>
      <div className="text-sm text-slate-700 leading-relaxed space-y-2">{children}</div>
    </div>
  );
}

// Keep LessonBox and LunaTip consistent across both pages
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
    tag: 'Flight & Departure',
    tagColor: 'bg-blue-100 text-blue-700',
    title: 'The Flight to Dreamland',
    teaser: 'Long airport wait at the gate, boarding the cozy plane, tasting delicious Mickey-shaped cookies, and falling asleep dreaming of beautiful castles!',
    image: '/images/comics/disneyland/strip-1-flight.jpg',
    imageAlt: 'Luna and Wayne\'s journey to Disneyland! A 4-panel comic strip showing their airport departure wait, cozy plane takeoff, sky dining feast, and dreaming of castles.',
    story: [
      'Waiting at the airport gate feels like it takes a million years! I was so tired and lay down across the terminal chairs. Wayne was trying to read, but even he looked super bored. I just wanted to get on the plane already!',
      'We finally boarded the plane! The seats were so cozy. I had my special travel suitcase with a Disneyland sticker on it. Since the flight was super long, we decided to take a nice nap to recharge our batteries for the big park!',
      'Plane food can be hit or miss, but this time it was amazing! We got yummy goldfish crackers (which Wayne insisted on calling Tuna crackers) and a special Mickey-shaped chocolate cookie. Eating sweets in the sky makes them taste twice as magical!',
      'As we flew closer and closer, I fell fast asleep. In my dream, I could see the giant pink and blue castle shining right through the clouds. I couldn\'t wait to see it in real life!'
    ],
    facts: (
      <>
        <p><strong>Flight delays are most common in the afternoon</strong> due to cascading schedules. Morning flights have the best on-time record.</p>
        <p><strong>Cruising altitude for commercial flights</strong> is typically between 30,000 and 42,000 feet. That is almost 8 miles straight up in the air!</p>
        <p><strong>High altitude drops our sense of taste and smell</strong> by about 20% to 30% due to low cabin humidity and pressure. That is why airplane snacks often taste different!</p>
        <p><strong>Sleeping on a plane helps your brain adjust</strong> to new time zones faster, reducing jet lag so you are ready to run to the rides as soon as you land!</p>
      </>
    ),
    lessonTitle: 'Finding Quiet in the Waiting',
    lesson: (
      <>
        <p>Waiting and flight times are natural buffers on a trip. Instead of feeling impatient, turning the gate delay into a rest session and the in-flight dining into a playful snack time helps keep your spirits high.</p>
      </>
    ),
    tip: 'Pack an inflatable neck pillow and a soft eye mask in your carry-on to make airplane naps much easier.'
  },
  {
    number: 2,
    tag: 'Theme Park & Hotel',
    tagColor: 'bg-purple-100 text-purple-700',
    title: 'Disneyland Park Adventure!',
    teaser: 'Arriving at the castle gates, checking in to our hotel with a park view, riding Dumbo and the Haunted Mansion, eating warm churros, and watching nightly fireworks!',
    image: '/images/comics/disneyland/strip-2-park.jpg',
    imageAlt: 'Luna and Wayne at Disneyland! A 6-panel comic strip showing their arrival view, main entrance greeting, hotel check-in, rollercoaster rides, eating treats, and watching the castle fireworks at night.',
    story: [
      'We landed! We grabbed our bags and pushed our luggage cart near the giant windows. Far in the distance, we could see the outline of the castle. It felt like we were walking straight into a fairy tale book!',
      'We stood right in front of the main entrance! There was a cute Mickey Mouse flowerbed and the Disneyland train station. I felt so happy and excited, I wanted to jump up and down and run inside immediately!',
      'First, we went to check-in at the hotel. The cast member at the front desk was super nice and welcomed us. Our room had a huge window with the most perfect view of the entire park! I stood by the window for ten minutes just staring.',
      'We ran from ride to ride! We sailed through "It\'s a Small World" with all the singing dolls, flew high in the air on Dumbo the flying elephant, and rode in a spooky black Doom Buggy inside the Haunted Mansion! I wasn\'t even scared of the ghosts!',
      'We walked down Main Street, U.S.A. and stopped for some treats. Wayne got a giant warm churro (churro check!), and I got a giant colorful lollipop. Running around theme parks requires a lot of sugar power!',
      'As the day came to an end, we stood by the railing and watched the beautiful castle light up against the dark night sky. I leaned against the railing, feeling so happy and sleepy. It was the most perfect day ever.'
    ],
    facts: (
      <>
        <p><strong>The Sleeping Beauty Castle is 77 feet tall</strong>. It was designed to look taller than it actually is by using forced perspective — making details get smaller near the top!</p>
        <p><strong>The Mickey Mouse flowerbed at the entrance</strong> is replanted several times a year. It takes about 10,000 individual flowers to make Mickey\'s face!</p>
        <p><strong>Disneyland hotel cast members are trained to create "Magical Moments"</strong> for families, which can include surprise room upgrades or greeting cards from characters!</p>
        <p><strong>It\'s a Small World features over 300 audio-animatronic dolls</strong> representing children from all over the world singing the classic song in multiple languages.</p>
        <p><strong>Main Street, U.S.A. is designed to smell like fresh vanilla</strong> and baked goods. Disneyland uses hidden scent machines called "Smellitizers" to blow sweet aromas into the street!</p>
        <p><strong>Disneyland\'s nightly fireworks show</strong> uses compressed air instead of gunpowder to launch the shells, which reduces noise and smoke, making it safer and cleaner!</p>
      </>
    ),
    lessonTitle: 'Appreciating the Magic in Details',
    lesson: (
      <>
        <p>A theme park is filled with tiny, designed details — from the forced perspective bricks on the castle to the smells on Main Street. Taking time to notice these details and reflecting on the day makes the memory last a lifetime.</p>
      </>
    ),
    tip: 'Go to Fantasyland first thing in the morning when the lines are shortest! You can ride Dumbo and Peter Pan without waiting forever. Save the indoor rides like Haunted Mansion for the afternoon when the sun is hot.'
  }
];

// ── Disneyland Guide (collapsible) ──────────────────────────────────

function DisneylandGuide() {
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
            <p className="font-bold text-slate-800">Luna's Disneyland Survival Guide</p>
            <p className="text-xs text-slate-400 mt-0.5">Best snacks, ride order, and how not to get tired!</p>
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
                  <p className="font-semibold text-slate-800 mb-1">🍭 The Best Snacks</p>
                  <p>1. <strong>Churros</strong> (Wayne's favorite): Get them warm from the cart near the castle. 2. <strong>Mickey Cookies</strong>: Chocolate ears are the best part. 3. <strong>Dole Whip</strong>: Super cold pineapple ice cream near Adventureland, perfect when it gets hot!</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">🎒 What to Pack in Your Bunny Bag</p>
                  <p>A water bottle (you can refill it for free at restaurants), a light sweater (it gets chilly at night during the fireworks), and a couple of band-aids just in case your feet get sore from all the running.</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-slate-800 mb-1">🎢 Ride Strategy</p>
                  <p>Go to Fantasyland first thing in the morning when the lines are shortest! You can ride Dumbo and Peter Pan without waiting forever. Save the indoor rides like Haunted Mansion for the afternoon when the sun is super hot.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">✨ Magical Fireworks Tip</p>
                  <p>Don't stand right in front of the castle! It gets super crowded. Instead, stand a bit further down Main Street or near the train station. You get a wider view of the sky, and you can escape to the hotel quickly before everyone else starts walking!</p>
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
          Strip {strip.number} of 2
        </div>
      </div>

      {/* Title & Teaser */}
      <div className="px-6 pt-5 pb-4">
        <div className="flex items-center gap-2 mb-3">
          <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${strip.tagColor}`}>
            {strip.tag}
          </span>
          <span className="text-xs text-slate-400">Story {strip.number} of 2</span>
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

export default function LunaComicDisneyland() {
  return (
    <>
      <SEOHead
        title="Adventure to Disneyland | Luna's Journey"
        description="Follow Luna and Wayne's magical trip to Disneyland! A cute 2-strip comic adventure with travel tips and stories."
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
            src="/images/comics/disneyland/cover.jpg"
            alt="Luna & Wayne's Disneyland Adventure"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-pink-900/60 via-transparent to-transparent flex items-end p-6 justify-center">
            <div className="text-white text-center">
              <span className="inline-block px-3 py-1 bg-yellow-400 text-slate-900 text-xs font-bold rounded-full uppercase tracking-wider mb-2">
                New Comic Book 🐰
              </span>
              <h1 className="text-2xl sm:text-4xl font-bold font-header drop-shadow-md">
                Luna and Wayne's Adventure to Disneyland
              </h1>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-3 mb-4">
          <span className="px-3 py-1 bg-pink-100 text-pink-800 text-xs font-bold rounded-full uppercase tracking-wide">
            Travel Series · Issue #1
          </span>
          <span className="text-xs text-slate-400">May 2026 · 2 Strips</span>
        </div>

        <p className="text-slate-500 leading-relaxed mb-6 max-w-2xl mx-auto font-sans">
          Pack your bags! Luna the rabbit and Wayne the cat go on a grand flight to the Land of Dreams. 
          Read through 2 large comic strips following their airport wait, plane napping, and riding rollercoasters at Disneyland!
        </p>

        <div className="flex justify-center">
          <ShareBar
            title="Luna & Wayne's Adventure to Disneyland"
            summary="A fun 2-strip comic travel diary to Disneyland by Luna and Wayne!"
          />
        </div>
      </motion.div>

      {/* 2 Comic Strips (vertical stack like Wayne's) */}
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

      {/* Disneyland Guide (collapsible) */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12 max-w-4xl mx-auto"
      >
        <DisneylandGuide />
      </motion.div>

      {/* Bottom Navigation / CTA */}
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
          title="Luna & Wayne's Adventure to Disneyland"
          summary="An illustrated Disneyland travel diary."
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
