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
        📍 Joshua Tree Fast Facts
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
    tag: 'Desert Road Trip',
    tagColor: 'bg-amber-100 text-amber-700',
    title: 'Junior Ranger Adventure',
    teaser: 'Long highway wait, packing Jelly Berries, arriving at Joshua Tree, completing the activity booklet, and becoming officially certified Junior Rangers!',
    image: '/images/comics/desert/strip-1-desert.jpg',
    imageAlt: 'Luna and Wayne\'s Desert Adventure! A 6-panel comic strip showing their highway wait, eating Jelly Berries, park entrance greeting, working on the booklet, swearing the ranger oath, and celebrating at sunset.',
    story: [
      'Stuck in highway traffic feels like it takes an absolute eternity! I kept asking, "Are we there yet?" while staring out at the dry desert hills. Wayne was driving the green VW van, feeling just as tired of the endless line of cars ahead of us.',
      'But wait — I had a secret weapon! I pulled out a big bag of Jelly Berries from my backpack. Wayne smiled and agreed that snacks definitely make everything better. Eating sweet berries made the traffic jam feel like a pre-trip party!',
      'We finally arrived at the Joshua Tree National Park Entrance! The park ranger greeted us with a big friendly smile and handed us a Junior Ranger activity booklet. She told us we had to complete the activities to earn our official badges!',
      'We set up a picnic blanket among the Joshua trees and went straight to work on the booklet. I searched for animal tracks in the sand, while Wayne proudly drew a super detailed lizard track. Learning about desert wildlife was so much fun!',
      'We finished all the activities and headed to the visitor center. The ranger reviewed our booklet and was super impressed! She had us raise our paws and swear the Junior Ranger oath to protect and preserve the park\'s beautiful nature.',
      'Officially certified! As the sun began to set, casting a warm golden glow over the giant rocks and Joshua trees, we stood proudly wearing our shiny new badges. It was the absolute best trip ever, and completely worth the wait!'
    ],
    facts: (
      <>
        <p><strong>Joshua Tree National Park</strong> is located in southeastern California, where the high Mojave Desert meets the low Colorado Desert.</p>
        <p><strong>Joshua trees (Yucca brevifolia)</strong> are not actually trees, but rather tree-like succulents belonging to the agave family!</p>
        <p><strong>The National Park Service Junior Ranger program</strong> is active in over 300 parks, helping kids (and enthusiastic rabbits and cats) learn about nature and conservation.</p>
        <p><strong>Joshua Tree is famous for its unique rock formations</strong>, which were formed millions of years ago by groundwater filtering through underground joints in the granite.</p>
        <p><strong>Desert animals leave distinct tracks</strong> in the sand. Lizards leave tiny clawed footprints with a tail drag line in the middle, while rabbits leave asymmetric groupings of four paw prints.</p>
        <p><strong>The Junior Ranger pledge</strong> asks participants to protect parks, continue learning, and share their knowledge with others back home.</p>
      </>
    ),
    lessonTitle: 'Patience and Perseverance in Nature',
    lesson: (
      <>
        <p>Whether it is waiting in long highway traffic or working hard to complete an activity booklet, the best rewards in travel take patience. Taking the time to learn about the environment makes the destination so much more meaningful.</p>
      </>
    ),
    tip: 'Always bring plenty of water and snacks when visiting Joshua Tree! There are no stores or water refilling stations inside the main park areas. Also, grab your Junior Ranger booklet at any entrance station or visitor center before you start exploring.'
  }
];

// ── Desert Guide (collapsible) ──────────────────────────────────────

function DesertGuide() {
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
            <p className="font-bold text-slate-800">Luna's Joshua Tree Survival Guide</p>
            <p className="text-xs text-slate-400 mt-0.5">Best spots, desert safety, and how to become a Junior Ranger!</p>
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
                  <p className="font-semibold text-slate-800 mb-1">🌵 Desert Safety Essentials</p>
                  <p>1. <strong>Water, water, water</strong>: Drink at least one gallon per day. 2. <strong>Sun Protection</strong>: Wear a hat, sunscreen, and sunglasses. 3. **Cell Service**: There is almost no cell coverage in the park, so download offline maps before entering!</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">🎒 Junior Ranger Checklist</p>
                  <p>Grab a booklet at the entrance station, bring a pencil, find 5 different plants or animal signs, and complete the activity pages. Once done, return it to any ranger at the visitor center to be sworn in!</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-slate-800 mb-1">🌅 Best Photo Spots</p>
                  <p>1. <strong>Arch Rock</strong>: An easy walk to a beautiful natural arch. 2. <strong>Cholla Cactus Garden</strong>: Amazing at sunrise, but don't touch the fuzzy-looking cacti! 3. <strong>Keys View</strong>: Panoramic views of the Coachella Valley at sunset.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">🚗 Driving Route</p>
                  <p>Enter from the West Entrance (Joshua Tree Village), drive along Park Boulevard to see the best rock formations and Joshua trees, and exit through the South Entrance (Cottonwood) to see the transition to the Colorado Desert.</p>
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

export default function LunaComicDesert() {
  return (
    <>
      <SEOHead
        title="Desert Adventure to Joshua Tree | Luna's Journey"
        description="Follow Luna and Wayne's road trip to Joshua Tree National Park! A cute 6-panel comic adventure with safety tips, ranger swearing-in, and stories."
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
            src="/images/comics/desert/cover.jpg"
            alt="Luna & Wayne's Desert Adventure"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-pink-900/60 via-transparent to-transparent flex items-end p-6 justify-center">
            <div className="text-white text-center">
              <span className="inline-block px-3 py-1 bg-yellow-400 text-slate-900 text-xs font-bold rounded-full uppercase tracking-wider mb-2">
                New Comic Book 🐰
              </span>
              <h1 className="text-2xl sm:text-4xl font-bold font-header drop-shadow-md">
                Luna and Wayne's Desert Adventure
              </h1>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-3 mb-4">
          <span className="px-3 py-1 bg-pink-100 text-pink-800 text-xs font-bold rounded-full uppercase tracking-wide">
            Travel Series · Issue #3
          </span>
          <span className="text-xs text-slate-400">May 2026 · 1 Strip</span>
        </div>

        <p className="text-slate-500 leading-relaxed mb-6 max-w-2xl mx-auto font-sans">
          Road trip to Joshua Tree! Luna the rabbit and Wayne the cat embark on a scenic drive to Joshua Tree National Park. 
          Follow their journey from the long highway wait, to packing yummy Jelly Berries, to completing their booklets to become officially certified Junior Rangers!
        </p>

        <div className="flex justify-center">
          <ShareBar
            title="Luna & Wayne's Desert Adventure"
            summary="A fun 6-panel comic travel diary to Joshua Tree by Luna and Wayne!"
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

      {/* Desert Guide (collapsible) */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12 max-w-4xl mx-auto"
      >
        <DesertGuide />
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
          title="Luna & Wayne's Desert Adventure"
          summary="An illustrated Joshua Tree National Park travel diary."
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
