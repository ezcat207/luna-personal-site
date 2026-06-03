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
        📍 Las Vegas Fast Facts
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
    tag: 'Vegas Strip Adventure',
    tagColor: 'bg-purple-100 text-purple-700',
    title: 'Vegas Lights & Wonders',
    teaser: 'From planning and magic shows to exploring the Strip, the giant MSG Sphere, high bridge fountain views, and relaxing in the hotel!',
    image: '/images/comics/las-vegas/strip-1-las-vegas.jpg',
    imageAlt: 'Wayne & Luna\'s Vegas Adventure! A 6-panel comic strip showing their initial list planning, magic show, exploring the Coca-Cola and Statue of Liberty replicas, looking at the giant MSG Sphere face, viewing the Bellagio fountains, and falling asleep.',
    story: [
      'We started our Vegas trip with a very solid plan. Wayne had a map and a checklist: M&M World, the giant Coca-Cola bottle, a stage magic show, and a view of the fountains. I was just super excited to see all the bright neon lights!',
      'First up was a spectacular stage magic show! The magician pulled a cute white rabbit right out of his black top hat. I was completely amazed and kept asking how he did it, while Wayne sat back with his goggles, muttering about mirrors, sleight of hand, and spotting wires.',
      'Next, we walked down the busy Las Vegas Strip. We saw the giant multi-story M&M World and the massive Coca-Cola bottle! Wayne pointed out the New York-New York replica Statue of Liberty, joking that she looked a bit lost and very small compared to the real one.',
      'We turned a corner and saw the MSG Sphere. It was a massive, single glowing ball displaying a giant, dancing emoji face! Wayne stared in absolute awe, calling it a "very large, single glowing head," while the bright lights danced across our faces.',
      'As evening fell, we walked up to a high pedestrian bridge to watch the famous fountain show. The water danced high into the air in perfect rhythm with the music. It was the most beautiful sight I\'d ever seen, and even Wayne was impressed by the engineering of the lighting grid.',
      'After a super busy day, we finally checked into our hotel room and hopped into our cozy beds. Wayne smiled and admitted that Vegas was actually pretty fun. I yawned and went straight to sleep, dreaming of chocolate, slot machines, and more adventures tomorrow!'
    ],
    facts: (
      <>
        <p><strong>Las Vegas means "The Meadows"</strong> in Spanish, named by Spanish explorers who discovered natural artesian wells in the valley.</p>
        <p><strong>The MSG Sphere is the world's largest spherical structure</strong> at 366 feet tall and 516 feet wide, covered in 1.2 million programmable LED pucks!</p>
        <p><strong>Stage magic relies heavily on cognitive psychology</strong>, directing the audience's attention (misdirection) so they don't notice the mechanics of the trick.</p>
        <p><strong>The Bellagio Fountains use over 1,200 water shooters</strong> (called shooters, super shooters, and extreme shooters) that can launch water up to 460 feet in the air!</p>
        <p><strong>The replica Statue of Liberty at New York-New York</strong> is exactly half the size of the original statue in New York Harbor (which is 151 feet tall).</p>
        <p><strong>Las Vegas is the brightest spot on Earth from space</strong> due to the high concentration of neon and LED lights along the Strip.</p>
      </>
    ),
    lessonTitle: 'Embracing the Spectacle',
    lesson: (
      <>
        <p>Sometimes it's fun to put aside skepticism and just enjoy the larger-than-life spectacles of a new city. Letting yourself be wowed by lights, magic, and art creates a sense of wonder that keeps travel exciting.</p>
      </>
    ),
    tip: 'The Las Vegas Strip is much longer than it looks, and you will do a lot of walking! Wear extremely comfortable walking shoes, carry a bottle of water (desert air is dry), and use the pedestrian bridges to safely cross the busy streets.'
  }
];

// ── Vegas Guide (collapsible) ──────────────────────────────────────

function VegasGuide() {
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
            <p className="font-bold text-slate-800">Luna's Las Vegas Survival Guide</p>
            <p className="text-xs text-slate-400 mt-0.5">Best photo spots, free attractions, and walking tips!</p>
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
                  <p className="font-semibold text-slate-800 mb-1">🎰 Free Shows & Sights</p>
                  <p>1. <strong>Bellagio Fountains</strong>: Plays every 15-30 minutes in the evening. 2. <strong>Mirage Volcano</strong>: Fire and drum show (check schedule). 3. <strong>Fall of Atlantis</strong>: Animatronic show inside the Caesars Forum Shops.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">🚶 Walking in the Desert</p>
                  <p>The Strip is over 4 miles long! Hotels are giant and walking between them takes longer than it looks. Pace yourself, take the free monorails/trams where available, and stay hydrated.</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-slate-800 mb-1">📸 Best Photo Angles</p>
                  <p>1. <strong>Welcome to Las Vegas Sign</strong>: Located on the south end, go early in the morning to avoid the huge line! 2. <strong>High Roller Balcony</strong>: For a birds-eye view of the fountains. 3. <strong>MSG Sphere Boardwalk</strong>: For the best selfie with the emoji face.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">🍫 Sweet Stops</p>
                  <p>Don't miss the 4-story M&M's World (you can print custom messages on M&Ms!) and the Coca-Cola store next door where you can try a tray of 16 different international soda flavors!</p>
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
          Comic Strip (6 Panels)
        </div>
      </div>

      {/* Title & Teaser */}
      <div className="px-6 pt-5 pb-4">
        <div className="flex items-center gap-2 mb-3">
          <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${strip.tagColor}`}>
            {strip.tag}
          </span>
          <span className="text-xs text-slate-400">Story 1 of 1</span>
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

export default function LunaComicLasVegas() {
  return (
    <>
      <SEOHead
        title="Las Vegas Strip Adventure | Luna's Journey"
        description="Follow Wayne and Luna's dazzling trip to Las Vegas! A cute 6-panel comic adventure with travel tips, fountain shows, and magic."
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
            src="/images/comics/las-vegas/cover.jpg"
            alt="Wayne & Luna's Las Vegas Adventure"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-pink-900/60 via-transparent to-transparent flex items-end p-6 justify-center">
            <div className="text-white text-center">
              <span className="inline-block px-3 py-1 bg-yellow-400 text-slate-900 text-xs font-bold rounded-full uppercase tracking-wider mb-2">
                New Comic Book 🐰
              </span>
              <h1 className="text-2xl sm:text-4xl font-bold font-header drop-shadow-md">
                Wayne & Luna's Las Vegas Adventure
              </h1>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-3 mb-4">
          <span className="px-3 py-1 bg-pink-100 text-pink-800 text-xs font-bold rounded-full uppercase tracking-wide">
            Travel Series · Issue #4
          </span>
          <span className="text-xs text-slate-400">May 2026 · 1 Strip</span>
        </div>

        <p className="text-slate-500 leading-relaxed mb-6 max-w-2xl mx-auto font-sans">
          Vegas baby, Vegas! Wayne the cat and Luna the rabbit take on the dazzling lights of the Las Vegas Strip. 
          Follow their journey from planning and magic shows to staring at the giant MSG Sphere face!
        </p>

        <div className="flex justify-center">
          <ShareBar
            title="Wayne & Luna's Las Vegas Adventure"
            summary="A fun 6-panel comic travel diary to Las Vegas by Wayne and Luna!"
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

      {/* Vegas Guide (collapsible) */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12 max-w-4xl mx-auto"
      >
        <VegasGuide />
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
          title="Wayne & Luna's Las Vegas Adventure"
          summary="An illustrated Las Vegas travel diary."
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
