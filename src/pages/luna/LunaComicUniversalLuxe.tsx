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
        📍 Universal Studios Fast Facts
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
    tag: 'Flight & Departure',
    tagColor: 'bg-blue-100 text-blue-700',
    title: 'On the Plane - First Class Pods',
    teaser: 'Here we go, Wayne! First class all the way to Orlando. Cozy private suites, gourmet meals in the clouds, and sweet dreams of adventure!',
    image: '/images/comics/universal/strip-1-plane.jpg',
    imageAlt: 'Luna & Wayne Go to Universal Studios! A 4-panel comic strip showing their airport departure, first-class pods, sky dining, and sleeping.',
    story: [
      'We arrived at the airport feeling like absolute royalty. Today, we weren\'t just traveling — we were flying first class to Orlando for our big Universal Studios adventure! Wayne put on a black eye patch for "dramatic effect." The cat at the boarding gate just shook his head and handed us our boarding passes.',
      'When we boarded the plane, our seats were private pods! It felt like having a tiny, futuristic apartment in the clouds. Wayne immediately curled up on the soft cushions and let out a loud purring sound, declaring that the bed was absolutely perfect. I started playing with the built-in control screens.',
      'Soon, the flight attendant served us a spectacular gourmet lunch. I had a fresh, colorful salad with a fancy cocktail, and Wayne got a special bento box with grilled fish and a glass of premium catnip water. He looked like the most pampered cat in the sky.',
      'A few hours into the flight, the cabin lights dimmed. I tucked myself under a warm blanket, already dreaming of the rollercoasters and castles waiting for us, while Wayne slept peacefully next to me dreaming of the Universal Studios globe.'
    ],
    facts: (
      <>
        <p><strong>Orlando International Airport (MCO)</strong> is one of the busiest airports in the United States, welcoming over 50 million passengers annually.</p>
        <p><strong>Modern first-class pods</strong> are designed using advanced ergonomics, featuring seats that lay completely flat to form a 2-meter bed.</p>
        <p><strong>High altitude drops our sense of taste and smell</strong> by about 20% to 30% due to low cabin humidity and pressure. That is why airplane snacks often taste different!</p>
        <p><strong>Jet lag is caused by disruption to the circadian rhythm</strong>. Getting good sleep during the flight is a primary way to combat it.</p>
      </>
    ),
    lessonTitle: 'Finding Joy in the Journey',
    lesson: (
      <>
        <p>Getting to a destination is half the fun. When you start a trip with a playful attitude and allow yourself to rest, the travel itself becomes a memorable part of the adventure.</p>
      </>
    ),
    tip: 'Bring a light sweater or scarf on the plane. Even in first class, cabin temperatures are kept cool to help passengers sleep and reduce motion sickness.'
  },
  {
    number: 2,
    tag: 'Theme Park & Hotel',
    tagColor: 'bg-purple-100 text-purple-700',
    title: 'Universal Luxe Adventure!',
    teaser: 'Arriving at the grand park for a day of wonder: riding high-speed launch coasters, eating opulent gold-dusted treats, and checking in to our luxury hotel stay!',
    image: '/images/comics/universal/strip-2-park.jpg',
    imageAlt: 'Wayne & Luna\'s Universal Luxe Adventure! A 6-panel comic strip showing their park entrance, riding the Golden Gryphon Express, eating themed treats, checking in, and enjoying their private suite.',
    story: [
      'We finally arrived at the grand entrance of Universal Studios! The weather was perfect, and the giant archway loomed over us like the gates to another world. Wayne stood tall, declaring that his "phoenix senses" were tingling. I could feel the energy in the air — we were finally here!',
      'For our first ride, we chose the legendary Golden Gryphon Express, featuring the high-speed Baroque Blaster launcher. As we buckled into the golden carriage, Wayne yelled "Hold on tight, Luna! This has a high-speed start!" Before I could answer, we shot forward like a rocket!',
      'We reached the highest peak of the Gryphon track. For a split second, the carriage hovered at the very top of the world. Wayne yelled "The best views!" as we looked out over the sparkling lakes, then plunged down!',
      'All that riding made us hungry, so we stopped at The Parvenu\'s Provisions. Wayne got a golden, paw-shaped cookie called Wayne\'s Golden Bone. I got a phoenix-themed ice popsicle called Luna\'s Glowing Nektar. The taste was absolutely exquisite!',
      'After a full day in the park, we checked in to the magnificent Golden Phoenix Plaza Hotel. The lobby was covered in gold, with huge crystal chandeliers hanging from the ceiling. Wayne immediately hopped up to inspect the check-in bell.',
      'Our hotel room was a dream. It had a giant, plush bed with gold covers, and a private clawfoot bathtub waiting for us. Wayne took off his eye patch and curled up on the bed, while I prepared a warm bath. It was the perfect end to a lavish adventure.'
    ],
    facts: (
      <>
        <p><strong>Universal Studios Florida</strong> opened on June 7, 1990. The iconic archway design was inspired by classic Hollywood studio gates from the 1930s.</p>
        <p><strong>Launch coasters</strong> use electromagnetic propulsion (LSM) or hydraulic launches to accelerate trains from 0 to top speed in just a few seconds.</p>
        <p><strong>Theme park food design</strong> is a growing art form, with chefs creating custom treats that tell a story or match specific fictional worlds.</p>
        <p><strong>Theme park resort hotels</strong> are designed to keep guests "in the story" even after they leave the park, using music, decor, and custom styling.</p>
      </>
    ),
    lessonTitle: 'Balancing Excitement and Rest',
    lesson: (
      <>
        <p>A great vacation balances high-speed excitement with deep relaxation. After the rush of rollercoasters, taking time to savor delicious treats and rest in a quiet room makes the experience complete.</p>
      </>
    ),
    tip: 'Staying at official premier hotels often includes perks like early park admission or free express passes!'
  }
];

// ── Universal Guide (collapsible) ────────────────────────────────────

function UniversalGuide() {
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
            <p className="font-bold text-slate-800">Luna's Universal Survival Guide</p>
            <p className="text-xs text-slate-400 mt-0.5">Luxe ride selections, themed snacks, and hotel perks!</p>
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
                  <p className="font-semibold text-slate-800 mb-1">🍰 Opulent Snack Picks</p>
                  <p>1. <strong>Wayne's Golden Bone</strong>: A rich butter cookie covered in edible gold dust. 2. <strong>Luna's Glowing Nektar</strong>: A dragon-fruit and strawberry phoenix-shaped popsicle that glows under blacklight. 3. <strong>Catnip Brew</strong>: A refreshing carbonated mint beverage served at the Plaza Hotel.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">🏰 Express Pass Strategy</p>
                  <p>If you stay at official premier hotels, Universal Express Unlimited is included for free! This lets you bypass regular lines at most attractions as many times as you want.</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-slate-800 mb-1">🎢 Rollercoaster Order</p>
                  <p>Ride high-launch coasters like the Golden Gryphon Express first thing in the morning. Afternoon queues can grow long, making it a perfect time to head back to the hotel for a spa session or pool break.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">🛁 Post-Park Spa Checklist</p>
                  <p>Prepare a warm bath with <strong>Feather Fluffing Salts</strong> to ease muscle tension, apply <strong>Whisker Wax</strong> for a soothing facial rub, and get a solid 8 hours of sleep on Egyptian cotton sheets to be ready for Day 2!</p>
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

export default function LunaComicUniversalLuxe() {
  return (
    <>
      <SEOHead
        title="Universal Luxe Adventure | Luna's Journey"
        description="Follow Luna and Wayne's luxurious trip to Universal Studios! A cute 2-strip comic adventure with deluxe travel tips and stories."
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
            src="/images/comics/universal/cover.jpg"
            alt="Luna & Wayne's Universal Luxe Adventure"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-pink-900/60 via-transparent to-transparent flex items-end p-6 justify-center">
            <div className="text-white text-center">
              <span className="inline-block px-3 py-1 bg-yellow-400 text-slate-900 text-xs font-bold rounded-full uppercase tracking-wider mb-2">
                New Comic Book 🐰
              </span>
              <h1 className="text-2xl sm:text-4xl font-bold font-header drop-shadow-md">
                Luna and Wayne's Universal Luxe Adventure
              </h1>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-3 mb-4">
          <span className="px-3 py-1 bg-pink-100 text-pink-800 text-xs font-bold rounded-full uppercase tracking-wide">
            Travel Series · Issue #2
          </span>
          <span className="text-xs text-slate-400">May 2026 · 2 Strips</span>
        </div>

        <p className="text-slate-500 leading-relaxed mb-6 max-w-2xl mx-auto font-sans">
          First-class flights, private airplane pods, high-speed launch coasters, and opulent golden hotels. 
          Read through 2 large comic strips following their ultra-luxurious trip to Universal Studios!
        </p>

        <div className="flex justify-center">
          <ShareBar
            title="Luna & Wayne's Universal Luxe Adventure"
            summary="A fun 2-strip comic travel diary to Universal Studios by Luna and Wayne!"
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

      {/* Universal Guide (collapsible) */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12 max-w-4xl mx-auto"
      >
        <UniversalGuide />
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
          title="Luna & Wayne's Universal Luxe Adventure"
          summary="An illustrated Universal Studios travel diary."
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
