import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, MapPin } from 'lucide-react';
import { SEOHead } from '../../components/SEOHead';
import { ShareBar } from '../../components/ShareBar';

// ── Reusable sub-components ──────────────────────────────────────────

function LessonBox({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-indigo-50 border-l-4 border-indigo-400 rounded-r-xl p-5">
      <p className="text-xs font-bold text-indigo-600 uppercase tracking-wide mb-2">{title}</p>
      <div className="text-sm text-slate-700 leading-relaxed space-y-2">{children}</div>
    </div>
  );
}

function FactBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
      <p className="text-xs font-bold text-amber-700 uppercase tracking-wide mb-3">Grand Canyon Fast Facts</p>
      <div className="text-sm text-slate-700 leading-relaxed space-y-2">{children}</div>
    </div>
  );
}

function ParentTip({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 flex gap-3">
      <span className="text-emerald-500 text-lg flex-shrink-0">💡</span>
      <div>
        <p className="text-xs font-bold text-emerald-700 uppercase tracking-wide mb-1">Parent Tip</p>
        <p className="text-sm text-slate-700 leading-relaxed">{children}</p>
      </div>
    </div>
  );
}

// ── Comic strip data ─────────────────────────────────────────────────

const strips = [
  {
    number: 1,
    tag: 'Safety First',
    tagColor: 'bg-red-100 text-red-700',
    title: 'The Fence Is Not Decorative',
    teaser: 'The first thing Luna wanted to do at the viewpoint was lean over the fence. She moved fast, the way 8-year-olds do when they\'re excited. The railing creaked. I grabbed her arm — and then came the conversation I wanted to get right.',
    image: '/images/comics/grand-canyon/panel-safety.jpeg',
    imageAlt: 'Luna and Wayne arrive at the Grand Canyon viewpoint. Luna tries to lean over the fence. Wayne teaches her about danger. They end up watching together, safely.',
    story: [
      'The first thing Luna wanted to do at the viewpoint was lean over the fence. Not dramatically — she just wanted to see more than the fence allowed. She moved fast, the way 8-year-olds move when they\'re excited and the adult supervision hasn\'t caught up yet. The railing creaked. I grabbed her arm.',
      'She looked at me like I was overreacting. Which, honestly, is a completely reasonable response from a kid who has never stood at the edge of a 5,000-foot drop. The problem with canyon danger is that it doesn\'t look like danger from where you\'re standing. The scale is too big to read intuitively. The bottom looks like it\'s just "below" — not a mile below.',
      'I didn\'t want to give her the "because I said so" conversation. I wanted to give her the real one: some places have rules because the consequences of breaking them are permanent, and the canyon has no margin for error. She got quiet when I put it that way. Then she took my hand and we watched the shadows move across the canyon walls for a long time.',
    ],
    facts: (
      <>
        <p><strong>The canyon is over 6,000 feet deep</strong> — more than a mile. The bottom doesn't look that far because the scale is too large for human intuition to process correctly.</p>
        <p><strong>About 400 search and rescue operations</strong> happen at Grand Canyon National Park each year. Falls, dehydration, and overconfident hiking are the primary causes — not wildlife.</p>
        <p><strong>Kids should always be within arm's reach</strong> at any unfenced viewpoint or trail edge, regardless of how cautious your child usually is — the canyon disrupts normal spatial judgment for everyone.</p>
      </>
    ),
    lesson: (
      <>
        <p>"Don't go near the edge" is a rule. "The canyon is over a mile deep and people have died here" is a reason. Children accept rules more deeply when they understand what the rule is protecting them from.</p>
        <p>Try the math: "How long do you think it would take to walk down to that river?" (Answer: at least 2 days round-trip on foot.) The scale does the persuading better than the warning.</p>
      </>
    ),
    lessonTitle: 'Why Rules Need Reasons',
    tip: 'After establishing the limit, turn it into curiosity: "Let\'s see how far we CAN see from right here." The canyon rewards close looking — condors, layered rock colors, light shifts — and your child will forget about the fence once they have something to track.',
  },
  {
    number: 2,
    tag: 'Leave No Trace',
    tagColor: 'bg-emerald-100 text-emerald-700',
    title: 'The Rock That Belongs to the Canyon',
    teaser: 'Luna found a beautiful red rock — deep red with white veins, warm from the sun. It was in her pocket before I noticed. Then: "I\'m going to throw it to hear the echo!" The rule here isn\'t complicated. The explanation, if you want it to stick, is.',
    image: '/images/comics/grand-canyon/panel-nature.jpeg',
    imageAlt: 'Luna finds a beautiful red rock and wants to throw it. Wayne explains every pebble belongs to the canyon\'s story. Luna says goodbye to the little stone.',
    story: [
      'Luna found a rock that was genuinely beautiful — deep red, with white veins running through it, warm from sitting in the sun. She had it in her pocket before I noticed. I only saw it when she held it up: "Wayne, Wayne! Look! This stone is amazing!"',
      'Then: "I\'m going to throw it to hear the echo!" And I said, as calmly as I could, "Wait, Luna. We can\'t."',
      'What worked wasn\'t the rule. It was the relationship. I told her: every pebble, every grain of sand has been here for centuries. It\'s part of the canyon\'s story. It belongs to the canyon, not to us.',
      'She put it down. She said "Goodbye, little stone. Rest well." I didn\'t suggest the goodbye — that was entirely Luna. And I thought: she got it. She really got it.',
    ],
    facts: (
      <>
        <p><strong>It is illegal to remove rocks, plants, or any natural object</strong> from Grand Canyon National Park under the National Park Service Organic Act.</p>
        <p><strong>6 million people visit per year.</strong> If each took one small rock, that's 6 million rocks removed annually. Small individual actions add up to enormous collective impact.</p>
        <p><strong>Grand Canyon rocks span 270 million to 1.8 billion years of age.</strong> The reddish rocks are likely Supai Group sandstone — deposited when this was a coastal floodplain, long before the first dinosaurs.</p>
        <p><strong>The Colorado River is still carving the canyon today</strong> — about 1 mm deeper per year. Each rock on the canyon floor is part of an ongoing geological story.</p>
      </>
    ),
    lesson: (
      <>
        <p>"Leave it where you found it" is a rule. "This rock has been here longer than the human species, and it belongs to a story that's still being told" is a relationship.</p>
        <p>Try the math: "How old do you think this rock is?" Then tell them. "This rock was formed before the first dinosaur walked the Earth. Does it feel right to put it in your pocket?" Most kids, given the real number, decide on their own.</p>
      </>
    ),
    lessonTitle: 'Stewardship Is a Relationship, Not a Rule',
    tip: 'Children learn Leave No Trace by watching adults. If you pick something up "just to look" and then put it back, your child is watching and learning that\'s acceptable. Model the principle before explaining it — walk past the interesting rock without touching it, and wait to see if your child asks why.',
  },
  {
    number: 3,
    tag: 'Learning to See',
    tagColor: 'bg-violet-100 text-violet-700',
    title: "It's Just a Really Big Hole (Until It Isn't)",
    teaser: 'Luna\'s first real reaction to the Grand Canyon — after the initial "it\'s so BIG" — was disappointment. She\'d seen pictures. She was expecting something. What she saw was a very large hole with some orange walls. "What\'s so special?" The answer took twenty minutes.',
    image: '/images/comics/grand-canyon/panel-perspective.jpeg',
    imageAlt: 'Luna at sunrise says the canyon is just a big hole. Wayne explains the layers are millions of years old. Luna imagines the ancient glowing canyon — Sometimes the unseen is more magical.',
    story: [
      'Luna\'s first real reaction to the Grand Canyon — once the initial shock of "it\'s so BIG" wore off — was disappointment. She\'d seen pictures. What she saw was a very large hole with some orange walls. "It\'s just a really big hole. What\'s so special?"',
      'The canyon doesn\'t perform. It doesn\'t move or make sounds or change in a way you can perceive. For a child raised on entertainment that responds to her — videos that react, games that reward — a canyon is confusing. It simply is.',
      'I didn\'t try to sell her on the whole thing. I pointed to one layer. The reddish stripe near the top of the canyon wall. "See that? It\'s called the Kaibab Limestone. It formed when this was an ocean floor — 270 million years ago. Before dinosaurs ever existed."',
      'She was quiet. Then: "Before dinosaurs?" And after that, she couldn\'t stop looking.',
    ],
    facts: (
      <>
        <p><strong>The Grand Canyon reveals 2 billion years of Earth history</strong> in its exposed rock layers — one of the most complete geological records anywhere on Earth.</p>
        <p><strong>The Kaibab Limestone at the very top is 270 million years old,</strong> formed when this region was a shallow sea. It contains fossils of ancient marine creatures — sponges, brachiopods, crinoids.</p>
        <p><strong>Dinosaurs lived 230–65 million years ago.</strong> This means the top layer of the Grand Canyon is already older than the entire age of dinosaurs.</p>
        <p><strong>The Vishnu Basement Rocks at the very bottom are 1.8 billion years old</strong> — roughly a third of the age of the universe, predating complex life on Earth.</p>
      </>
    ),
    lesson: (
      <>
        <p>Big numbers defeat children (and most adults). "2 billion years" means nothing to an 8-year-old. "Before dinosaurs" means everything.</p>
        <p>Find the anchor your child already has. If they love dinosaurs: the top rock layer is older than all dinosaurs. If they love swimming: this was once a seafloor. Use their existing mental model as the entry point.</p>
        <p>Then stay quiet. Let them look. One good fact, planted in the right soil, will grow on its own.</p>
      </>
    ),
    lessonTitle: 'Give One Concrete Fact, Not All of Them',
    tip: 'The "it\'s just a big hole" reaction doesn\'t mean the trip failed. Don\'t rush to fill the silence. Sit down next to your child and look in the same direction. Ask: "What do you notice?" — not what they think, not what they know. That question opens eyes better than any fact.',
  },
];

// ── Travel guide content (collapsible) ──────────────────────────────

function TravelGuide() {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-6 py-5 hover:bg-slate-50 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <MapPin className="w-4 h-4 text-amber-600" />
          </div>
          <div>
            <p className="font-bold text-slate-800">Plan Your Visit: Family Travel Guide</p>
            <p className="text-xs text-slate-400 mt-0.5">What to bring, best age, South vs North Rim, sunrise tips</p>
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
            <div className="border-t border-slate-100 px-6 py-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-600 leading-relaxed">
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-slate-800 mb-1">Location & Getting There</p>
                  <p>Northern Arizona. About 4 hours from Las Vegas, 3.5 hours from Phoenix. Most families drive in — no direct train. Fly into Phoenix or Las Vegas and road-trip.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">South Rim vs. North Rim</p>
                  <p>South Rim: open year-round, most facilities, 90% of visitors. North Rim: quieter, arguably more beautiful, open mid-May to mid-October only. First trip with kids → South Rim.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">Best Time to Visit</p>
                  <p>Spring (April–May) or Fall (September–October). Summer is hot and crowded — if you go, arrive at sunrise and leave by noon. Winter has snow on the rim, oddly beautiful, but limits options.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">Best Age for Kids</p>
                  <p>5+ can fully appreciate the rim views. 8+ can do short trails like the first mile of Bright Angel. Under 5 is still worth it — views need no hiking — but expect a short attention window.</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-slate-800 mb-1">Must-See Viewpoints</p>
                  <p><strong>Mather Point</strong> — excellent panorama, first stop for most. <strong>Yavapai Observation Station</strong> — geology museum inside, great for kids. <strong>Desert View Watchtower</strong> — 30 miles east, less crowded, 360° view.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">What Most Families Don't Expect</p>
                  <p>The scale. No photo prepares you. Most kids (and adults) need 10–15 minutes of just standing there before it starts to sink in. Don't rush the first look.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">What to Bring</p>
                  <p>Water (more than you think). Sun protection. Layers — temperature swings are dramatic, especially at sunrise. Comfortable shoes even for rim-walking. Binoculars if you have them — condors soar and the river below sparkles.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">Sunrise & Sunset</p>
                  <p>Worth every alarm. The canyon turns red, orange, and purple. Sunrise: few crowds, cool air. Sunset: warm full palette, light comes from behind you at South Rim making colors more dramatic. If you do one, do sunset.</p>
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
      className="bg-white border border-slate-200 rounded-2xl overflow-hidden"
    >
      {/* Always-visible: image */}
      <div className="overflow-hidden">
        <img
          src={strip.image}
          alt={strip.imageAlt}
          className="w-full h-auto"
        />
      </div>

      {/* Always-visible: teaser */}
      <div className="px-6 pt-5 pb-4">
        <div className="flex items-center gap-2 mb-3">
          <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${strip.tagColor}`}>
            {strip.tag}
          </span>
          <span className="text-xs text-slate-400">Story {strip.number} of 3</span>
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-3">{strip.title}</h2>
        <p className="text-sm text-slate-600 leading-relaxed">{strip.teaser}</p>
      </div>

      {/* Toggle button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-6 py-3 border-t border-slate-100 hover:bg-slate-50 transition-colors text-left"
      >
        <span className="text-sm font-semibold text-indigo-600">
          {open ? 'Hide the story' : 'Read the full story, facts & lesson'}
        </span>
        {open
          ? <ChevronUp className="w-4 h-4 text-indigo-400" />
          : <ChevronDown className="w-4 h-4 text-indigo-400" />
        }
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
            <div className="px-6 pb-8 space-y-6 border-t border-slate-100 pt-6">
              {/* Story */}
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-3">The Story Behind the Strip</p>
                <div className="space-y-3">
                  {strip.story.map((para, i) => (
                    <p key={i} className="text-slate-700 leading-relaxed text-sm">{para}</p>
                  ))}
                </div>
              </div>

              {/* Facts */}
              <FactBox>{strip.facts}</FactBox>

              {/* Lesson */}
              <LessonBox title={strip.lessonTitle}>{strip.lesson}</LessonBox>

              {/* Parent tip */}
              <ParentTip>{strip.tip}</ParentTip>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Main page ────────────────────────────────────────────────────────

export default function WayneComicGrandCanyon() {
  return (
    <>
      <SEOHead
        title="Luna & Wayne's Canyon Dreams — Grand Canyon 2024 | Comics"
        description="Three parent-child comic strips from the Grand Canyon — safety, Leave No Trace, and learning to see the ancient and vast. Plus a family travel guide."
        ogImage="/images/comics/grand-canyon/cover.jpeg"
      />

      {/* Back nav */}
      <div className="mb-8">
        <Link
          to="/wayne/comics"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          All Comics
        </Link>
      </div>

      {/* ── Cover ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-10"
      >
        <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md mb-7">
          <img
            src="/images/comics/grand-canyon/cover.jpeg"
            alt="Luna & Wayne's Canyon Dreams — cover"
            className="w-full h-auto"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full uppercase tracking-wide">
            Comic Series · Issue #1
          </span>
          <span className="text-xs text-slate-400">Summer 2024 · 3 strips</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3 leading-tight">
          Luna & Wayne's Canyon Dreams
        </h1>
        <p className="text-slate-500 leading-relaxed mb-5 max-w-2xl">
          Grand Canyon, 2024. Three moments, three things learned — about fences, about rocks that belong to the canyon, and about how to actually look at something that doesn't perform for you.
        </p>
        <ShareBar
          title="Luna & Wayne's Canyon Dreams — Grand Canyon 2024"
          summary="Three parent-child comic strips + family travel guide to the Grand Canyon."
        />
      </motion.div>

      {/* ── Three Comic Strips ── */}
      <div className="space-y-6 mb-10">
        {strips.map((strip, i) => (
          <motion.div
            key={strip.number}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1 + i * 0.07 }}
          >
            <StripCard strip={strip} />
          </motion.div>
        ))}
      </div>

      {/* ── Travel Guide (collapsible) ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.35 }}
        className="mb-10"
      >
        <TravelGuide />
      </motion.div>

      {/* ── Bottom share ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.4 }}
        className="flex items-center justify-between py-6 border-t border-slate-200 mb-10"
      >
        <Link
          to="/wayne/comics"
          className="text-sm text-slate-400 hover:text-slate-700 transition-colors"
        >
          ← All Comics
        </Link>
        <ShareBar
          title="Luna & Wayne's Canyon Dreams"
          summary="Three parent-child comic strips from the Grand Canyon."
        />
      </motion.div>

      {/* ── CTA ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.45 }}
        className="bg-indigo-600 rounded-2xl px-8 py-10 text-center text-white"
      >
        <h2 className="text-xl font-bold mb-2">Enjoyed the stories?</h2>
        <p className="text-indigo-100 text-sm mb-6 max-w-md mx-auto">
          Wayne publishes weekly teaching plans and insights. Luna shares what she discovers every Sunday.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/wayne/insights"
            className="inline-flex items-center justify-center gap-2 bg-white text-indigo-700 font-semibold text-sm px-6 py-2.5 rounded-xl hover:bg-indigo-50 transition-colors"
          >
            Read Wayne's Insights
          </Link>
          <a
            href={import.meta.env.PROD ? 'https://luna.bunnyuniverse.com' : '/?persona=luna'}
            className="inline-flex items-center justify-center gap-2 bg-indigo-500 text-white font-semibold text-sm px-6 py-2.5 rounded-xl hover:bg-indigo-400 transition-colors"
          >
            Visit Luna's Journey
          </a>
        </div>
      </motion.div>
    </>
  );
}
