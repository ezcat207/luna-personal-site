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
    tag: 'China Travel',
    tagColor: 'bg-red-100 text-red-700',
    title: 'Adventures in China',
    teaser: 'Ancient architecture, walking the Great Wall, discovering guardian lions, drinking oolong tea, brush calligraphy, tasting tanghulu, and a sunset pagoda view!',
    image: '/images/comics/china/strip-1-china.jpg',
    imageAlt: 'Wayne & Luna\'s Adventures in China! An 8-panel comic strip showing their journey: departure planning, visiting a Beijing archway, walking the Great Wall, comparing patterns on a guardian lion, drinking oolong tea, practicing calligraphy, eating tanghulu, and viewing the sunset over pagodas.',
    story: [
      'Our grand journey begins! Wayne pointed excitedly at the map of China, shouting that our next big adventure was starting. I put on my best travel ribbon and told him to prepare the airship — a long and exciting flight lay ahead of us!',
      'We landed in Beijing and went straight to see the grand architecture. We stood right under a massive, beautiful red-and-gold archway (Pailou). The intricate carvings were absolutely incredible, and Wayne couldn\'t help but marvel at the impressive craftsmanship.',
      'We hiked up to the Great Wall of China. It was so long it stretched as far as the eye could see, winding up and down over the misty mountain peaks! Wayne stood with a telescope, declaring it a true masterpiece of ancient engineering.',
      'While walking through the temple gardens, I found a stone guardian lion statue. I noticed the swirls on its back and called out to Wayne — its patterns looked exactly like the golden swirls on Wayne\'s fur! Wayne stared in quiet, proud surprise.',
      'After all that walking, we stopped at a traditional teahouse. We sat at a low wooden table and drank fresh, steaming oolong tea. The flavor was exceptional and warm, and I joked that it wasn\'t bright red like my stripes, but just lovely.',
      'Next, we tried our paws at brush calligraphy. I held the brush carefully and wrote the Chinese character for "Rabbit" (兔). Wayne leaned in to guide my hand, telling me it was almost perfect but needed to look just a little bit more graceful!',
      'As night fell, the street markets lit up with glowing red lanterns. I saw a street vendor selling fresh, glossy Tanghulu (candied hawthorn skewers). They were bright red and shiny, and Wayne agreed we must try this sweet, delightful treat!',
      'We ended our trip standing on a balcony overlooking the golden rooftops of Beijing at sunset. Wayne smiled and told me it had been an inspiring journey. I agreed, and told him the best part of any adventure was sharing it with him.'
    ],
    facts: (
      <>
        <p><strong>The Great Wall of China</strong> stretches over 13,000 miles (21,000 km) and was built over multiple dynasties to protect borders and trade routes.</p>
        <p><strong>Chinese Calligraphy</strong> is a revered art form that uses brush, ink, inkstone, and paper (known as the Four Treasures of the Study).</p>
        <p><strong>Tanghulu</strong> is a traditional northern Chinese street snack made of skewered hawthorn fruit dipped in hardened sugar syrup, dating back to the Song Dynasty.</p>
        <p><strong>Chinese Guardian Lions (Shishi)</strong> are traditional stone statues placed at entrances to protect buildings from harmful spiritual influences.</p>
        <p><strong>Beijing (北京)</strong> means "Northern Capital" and has served as China's political and cultural center for over 800 years.</p>
        <p><strong>Oolong Tea</strong> is a partially oxidized tea, placing it between green tea and black tea, and is famous for its complex floral and roasted aromas.</p>
      </>
    ),
    lessonTitle: 'Appreciating Art and Heritage',
    lesson: (
      <>
        <p>Exploring a culture with a long history teaches us to appreciate the art, engineering, and craftsmanship passed down through generations. From writing characters to drinking tea, taking part in local traditions deepens our connection to the world.</p>
      </>
    ),
    tip: 'When hiking the Great Wall, go early in the morning to beat the crowds, and bring a light windbreaker as it can get windy and cool on top of the ridges. Also, try different varieties of oolong tea—they range from light and floral to dark and woody!'
  }
];

// ── China Guide (collapsible) ──────────────────────────────────────

function ChinaGuide() {
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
            <p className="font-bold text-slate-800">Luna's China Travel & Culture Guide</p>
            <p className="text-xs text-slate-400 mt-0.5">Calligraphy basics, Great Wall tips, and teahouse etiquette!</p>
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
                  <p className="font-semibold text-slate-800 mb-1">✍️ Calligraphy & Characters</p>
                  <p>1. <strong>Hold the brush vertically</strong>: Keep your wrist off the paper for fluid strokes. 2. <strong>Stroke Order</strong>: Write from top to bottom, left to right. 3. <strong>The character 兔 (tù)</strong>: Means rabbit, featuring a stroke at the top representing ears and a hook representing the tail!</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">🏰 Great Wall Hiking Tip</p>
                  <p>Choose the <strong>Mutianyu section</strong> for a scenic hike with fewer crowds than Badaling. You can take a cable car up and a fun toboggan slide all the way back down the mountain!</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-slate-800 mb-1">🍵 Teahouse Etiquette</p>
                  <p>1. <strong>Thanking the server</strong>: Tap two fingers (index and middle) on the table to show gratitude when tea is poured. 2. <strong>Smell the aroma first</strong>: Take in the steam before taking a sip. 3. <strong>Multiple steeps</strong>: High-quality oolong leaves can be brewed 5-6 times, changing flavors each time.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">🍡 Street Food Checklist</p>
                  <p>Don't miss out on <strong>Tanghulu</strong> (candied hawthorns), <strong>Jianbing</strong> (savory breakfast crepes), and traditional Beijing <strong>Dumplings</strong> stuffed with fresh chives and meat.</p>
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
          Comic Strip (8 Panels)
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

export default function LunaComicChina() {
  return (
    <>
      <SEOHead
        title="Adventures in China | Luna's Journey"
        description="Follow Wayne and Luna's grand trip to China! An illustrated 8-panel comic adventure with travel guides, culture tips, and stories."
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
            src="/images/comics/china/cover.jpg"
            alt="Luna & Wayne's Adventures in China"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-pink-900/60 via-transparent to-transparent flex items-end p-6 justify-center">
            <div className="text-white text-center">
              <span className="inline-block px-3 py-1 bg-yellow-400 text-slate-900 text-xs font-bold rounded-full uppercase tracking-wider mb-2">
                New Comic Book 🐰
              </span>
              <h1 className="text-2xl sm:text-4xl font-bold font-header drop-shadow-md">
                Wayne & Luna's Adventures in China
              </h1>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-3 mb-4">
          <span className="px-3 py-1 bg-pink-100 text-pink-800 text-xs font-bold rounded-full uppercase tracking-wide">
            Travel Series · Issue #5
          </span>
          <span className="text-xs text-slate-400">May 2026 · 1 Strip</span>
        </div>

        <p className="text-slate-500 leading-relaxed mb-6 max-w-2xl mx-auto font-sans">
          A journey of shared wonders! Wayne the cat and Luna the rabbit travel across the sea to explore the Great Wall, practice calligraphy, drink oolong tea, and share a sunset in Beijing!
        </p>

        <div className="flex justify-center">
          <ShareBar
            title="Wayne & Luna's Adventures in China"
            summary="A fun 8-panel comic travel diary to China by Wayne and Luna!"
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
        <ChinaGuide />
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
          title="Wayne & Luna's Adventures in China"
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
