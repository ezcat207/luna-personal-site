import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ChevronDown,
  ChevronUp,
  ChevronRight,
  CheckCircle2,
  ArrowRight,
  Clock,
  Users,
  BookOpen,
  Video,
  Zap,
  Infinity,
  BarChart2,
  Sparkles,
  Image,
  Clapperboard,
  Palette,
  Star,
} from 'lucide-react';
import { SEOHead } from '../../components/SEOHead';
import { wayneCourses } from '../../data/wayneCourses';
import wayneAvatar from '../../assets/wayne-avatar.jpg';
import lunaAvatar from '../../assets/luna-avatar.jpg';

const EARLY_BIRD_DISCOUNT = 0.8;

const lunaSubdomain = import.meta.env.PROD
  ? 'https://luna.bunnyuniverse.com'
  : '/?persona=luna';

const WAITLIST_HREF =
  'mailto:wayne@bunnyuniverse.com?subject=Waitlist: Create with AI — Images %26 Video&body=Hi Wayne, I\'d like to join the waitlist for the AI Images %26 Video course.%0A%0AMy child\'s age:%0AWhat I want to create:%0AQuestions:';

const lessonIcon = {
  article: <BookOpen className="w-3.5 h-3.5 text-slate-400" />,
  video: <Video className="w-3.5 h-3.5 text-indigo-400" />,
  practice: <Zap className="w-3.5 h-3.5 text-amber-400" />,
};

type LessonType = 'article' | 'video' | 'practice';

const faqs = [
  {
    q: 'Do we need any art or design experience?',
    a: "None at all. Prompting is the skill — describing what you want in words, then refining it. Luna had zero art training and started making professional-looking illustrations within her first hour. If you can describe a scene, you can make the image.",
  },
  {
    q: 'Are the tools free?',
    a: "DALL-E 3 (via Bing Image Creator) is completely free. Midjourney has a free trial. Runway and Kling AI have free tiers sufficient for all course projects. We walk through exactly which free plan to use at each step so you won't hit a paywall unexpectedly.",
  },
  {
    q: 'Can my younger child (under 13) use these tools?',
    a: "Bing Image Creator (DALL-E 3) works for all ages and is the safest option for younger kids. Midjourney requires a Discord account (13+). We designate which tools are appropriate for which ages throughout the course.",
  },
  {
    q: "This isn't just typing in ChatGPT, right?",
    a: "ChatGPT images are a starting point. This course teaches the prompting craft — how to specify style, mood, composition, character consistency, and motion — that gets professional results instead of generic ones. The difference is technique, and technique is learnable.",
  },
  {
    q: 'What equipment do we need?',
    a: 'A laptop or desktop with a modern browser. All tools run in the cloud — no GPU, no special hardware, no software to install. Mobile works for viewing but a keyboard makes prompting much faster.',
  },
  {
    q: 'When does the course launch?',
    a: "We're finishing the video production now. Waitlist members get first access and the early-bird price ($79 vs regular $99). We'll notify you by email the moment it's live.",
  },
];

function ModuleCard({
  mod,
  num,
  defaultOpen = false,
}: {
  mod: NonNullable<ReturnType<typeof wayneCourses.find>>['modules'][0];
  num: number;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const mins = mod.lessons.reduce((a, l) => {
    const m = l.duration?.match(/(\d+)\s*min/);
    return a + (m ? parseInt(m[1]) : 0);
  }, 0);
  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-4 px-5 py-4 hover:bg-slate-50 transition-colors text-left"
      >
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-violet-600 text-white text-xs font-bold flex items-center justify-center">
          {num === 0 ? '0' : num}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-slate-800 text-sm">{mod.title}</p>
          <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{mod.description}</p>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0 ml-2 text-xs text-slate-400">
          <span className="hidden sm:block">
            {mod.lessons.length} lessons{mins > 0 ? ` · ~${mins}m` : ''}
          </span>
          {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>
      {open && (
        <div className="border-t border-slate-100 divide-y divide-slate-100">
          {mod.lessons.map((l, i) => (
            <div key={i} className="flex items-center gap-3 px-5 py-3 bg-slate-50/60">
              <span className="flex-shrink-0">{lessonIcon[l.type as LessonType]}</span>
              <span className="text-sm text-slate-700 flex-1">{l.title}</span>
              {l.duration && (
                <span className="text-xs text-slate-400 flex-shrink-0">{l.duration}</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-slate-200 last:border-0">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 py-4 text-left hover:text-violet-700 transition-colors"
      >
        <span className="font-semibold text-slate-800 text-sm">{q}</span>
        {open ? (
          <ChevronUp className="w-4 h-4 text-slate-400 flex-shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
        )}
      </button>
      {open && (
        <div className="pb-4">
          <p className="text-sm text-slate-600 leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

function WaitlistSidebar({ totalLessons }: { totalLessons: number }) {
  const course = wayneCourses.find((c) => c.id === 'ai-visuals')!;
  const earlyBirdPrice = Math.round((course.price ?? 99) * EARLY_BIRD_DISCOUNT);
  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
      {/* Price header */}
      <div className="bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-5 text-white">
        <div className="flex items-end gap-3 mb-1">
          <span className="text-3xl font-bold">${earlyBirdPrice}</span>
          <span className="text-violet-200 line-through text-sm mb-1">${course.price}</span>
        </div>
        <p className="text-xs text-violet-200">Early-bird · Regular price ${course.price}</p>
      </div>

      {/* CTA */}
      <div className="px-6 py-4 border-b border-slate-100">
        <a
          href={WAITLIST_HREF}
          className="flex items-center justify-center gap-2 w-full bg-violet-600 hover:bg-violet-700 text-white font-bold px-5 py-3.5 rounded-xl transition-colors text-sm"
        >
          Join Waitlist — Early Bird ${earlyBirdPrice}
          <ArrowRight className="w-4 h-4" />
        </a>
        <p className="text-xs text-slate-400 text-center mt-2">Get notified first · Lock in early-bird price</p>
      </div>

      {/* Stats */}
      <div className="px-6 py-4 border-b border-slate-100 space-y-3">
        {[
          { icon: <Clock className="w-4 h-4 text-slate-400" />, label: '5 weeks · self-paced' },
          { icon: <BookOpen className="w-4 h-4 text-slate-400" />, label: `${totalLessons} lessons` },
          { icon: <Users className="w-4 h-4 text-slate-400" />, label: 'For parents + kids (ages 8+)' },
          { icon: <BarChart2 className="w-4 h-4 text-slate-400" />, label: 'Beginner level' },
          { icon: <Infinity className="w-4 h-4 text-slate-400" />, label: 'Lifetime access' },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-3 text-sm text-slate-600">
            {item.icon}
            {item.label}
          </div>
        ))}
      </div>

      {/* What's included */}
      <div className="px-6 py-4">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">What's Included</p>
        {[
          'Step-by-step prompting lessons',
          'Personal style library template',
          'Character consistency guide',
          'Tool setup walkthroughs (all free tiers)',
          'Wayne + Luna project walkthroughs',
          'Family project brief + production guide',
        ].map((item) => (
          <div key={item} className="flex items-start gap-2 mb-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-violet-500 flex-shrink-0 mt-0.5" />
            <span className="text-xs text-slate-600">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function WayneCourseAiVisuals() {
  const course = wayneCourses.find((c) => c.id === 'ai-visuals')!;
  const totalLessons = course.modules.reduce((a, m) => a + m.lessons.length, 0);
  const earlyBirdPrice = Math.round((course.price ?? 99) * EARLY_BIRD_DISCOUNT);

  return (
    <>
      <SEOHead
        title="Create with AI: Images & Video Course | Wayne's Plans"
        description="Learn to generate stunning AI images and videos. DALL-E, Midjourney, Runway, Kling — no design experience needed. Parent-child course for families."
      />

      {/* Breadcrumb */}
      <div className="flex items-center gap-1 text-xs text-slate-400 mb-8">
        <Link to="/wayne" className="hover:text-slate-600">Wayne</Link>
        <ChevronRight className="w-3 h-3" />
        <Link to="/wayne/courses" className="hover:text-slate-600">Courses</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-slate-600">AI Images & Video</span>
      </div>

      {/* Two-column layout */}
      <div className="lg:grid lg:grid-cols-[1fr_300px] lg:gap-10 lg:items-start">

        {/* ══ LEFT ══ */}
        <div className="space-y-14 min-w-0">

          {/* ── Hero ── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-full">
                Coming Soon
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 bg-violet-50 text-violet-700 text-xs font-bold rounded-full border border-violet-200">
                <Sparkles className="w-3 h-3" /> Early Bird ${earlyBirdPrice}
              </span>
              <span className="px-3 py-1 bg-slate-100 text-slate-500 text-xs rounded-full line-through">
                Regular ${course.price}
              </span>
            </div>

            <h1 className="text-4xl font-bold text-slate-900 leading-tight mb-3">
              Create with AI:<br className="sm:hidden" /> Images & Video
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed mb-6">
              Go from a blank prompt to a shareable creation — stunning AI images,
              consistent characters, and short videos. No design background needed.
            </p>

            <div className="flex items-center gap-3">
              <img src={wayneAvatar} alt="Wayne" className="w-8 h-8 rounded-full object-cover" />
              <img src={lunaAvatar} alt="Luna" className="w-8 h-8 rounded-full object-cover -ml-3 border-2 border-white" />
              <span className="text-sm text-slate-600">
                <span className="font-semibold text-slate-800">Wayne</span> teaches ·{' '}
                <span className="font-semibold text-slate-800">Luna</span> demonstrates
              </span>
            </div>

            {/* Mobile CTA */}
            <div className="lg:hidden mt-6 p-5 bg-violet-50 border border-violet-200 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-bold text-violet-800 text-lg">Early Bird ${earlyBirdPrice}</p>
                  <p className="text-xs text-slate-500">Regular ${course.price} · Join waitlist now</p>
                </div>
              </div>
              <a
                href={WAITLIST_HREF}
                className="flex items-center justify-center gap-2 w-full bg-violet-600 hover:bg-violet-700 text-white font-bold px-5 py-3 rounded-xl transition-colors text-sm"
              >
                Join Waitlist <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* ── Problem ── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-5">
              Everyone can generate an image. Almost no one gets the image they imagined.
            </h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                You type something into DALL-E or Midjourney, and you get... something. Technically impressive, but
                not what you had in your head. You try again. Different, but still not right. After a few more
                attempts you settle for something good-enough. Sound familiar?
              </p>
              <p>
                The gap between "generated an image" and "made exactly what I imagined" is a skill — and it's
                learnable. It's called prompting craft: how you specify subject, style, composition, mood, and
                consistency so AI delivers what you actually want, not just what it guesses.
              </p>
              <p className="font-medium text-slate-800">
                Luna learned this craft at age 8 and is now making illustrated story scenes, consistent
                characters across 20+ images, and short animated clips — all from prompts.
                This course teaches both of you how she does it.
              </p>
            </div>
          </motion.div>

          {/* ── Three pillars ── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.07 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            {[
              {
                icon: <Image className="w-5 h-5 text-violet-600" />,
                title: 'AI Images',
                body: 'Master prompting across DALL-E 3, Midjourney, and Ideogram. Style, composition, and reference control.',
              },
              {
                icon: <Palette className="w-5 h-5 text-violet-600" />,
                title: 'Style & Characters',
                body: 'The hardest part: keeping a character consistent across scenes. We teach the exact techniques that work.',
              },
              {
                icon: <Clapperboard className="w-5 h-5 text-violet-600" />,
                title: 'AI Video',
                body: 'Animate your illustrations and create original clips with Runway Gen-3 and Kling AI.',
              },
            ].map((p) => (
              <div key={p.title} className="bg-white border border-slate-200 rounded-xl p-5">
                <div className="w-9 h-9 bg-violet-50 rounded-lg flex items-center justify-center mb-3">
                  {p.icon}
                </div>
                <p className="font-bold text-slate-800 text-sm mb-1">{p.title}</p>
                <p className="text-sm text-slate-500">{p.body}</p>
              </div>
            ))}
          </motion.div>

          {/* ── Luna results ── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.08 }}
            className="bg-slate-900 rounded-2xl p-7 text-white"
          >
            <div className="flex items-start gap-4">
              <img
                src={lunaAvatar}
                alt="Luna"
                className="w-12 h-12 rounded-full object-cover flex-shrink-0 border-2 border-slate-700"
              />
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <p className="font-bold text-white">Luna, age 8</p>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                  "I made a whole illustrated story about Mars Bunny using DALL-E and Midjourney.
                  All the characters look the same in every picture now — it took me a few tries to
                  learn how, but Wayne helped me figure out the pattern. Now I teach my friends."
                </p>
                <div className="flex flex-wrap gap-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Image className="w-3 h-3" /> 200+ images generated
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clapperboard className="w-3 h-3" /> 3 short AI video clips
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" /> 1 complete illustrated story
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── What you'll learn ── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.09 }}
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-5">What You'll Walk Away With</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
              {course.learningOutcomes.map((o) => (
                <div key={o} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-violet-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700">{o}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Tools ── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Tools You'll Use</h2>
            <p className="text-sm text-slate-500 mb-5">All have free tiers. No credit card required to start.</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { name: 'DALL-E 3', note: 'via Bing — completely free', icon: '🎨' },
                { name: 'Midjourney', note: 'free trial included', icon: '✨' },
                { name: 'Ideogram', note: 'free tier', icon: '🖋️' },
                { name: 'Runway Gen-3', note: 'free credits', icon: '🎬' },
                { name: 'Kling AI', note: 'free tier', icon: '🎞️' },
                { name: 'CapCut AI', note: 'free', icon: '✂️' },
              ].map((t) => (
                <div key={t.name} className="bg-white border border-slate-200 rounded-xl p-4">
                  <div className="text-2xl mb-2">{t.icon}</div>
                  <p className="font-semibold text-slate-800 text-sm">{t.name}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{t.note}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Curriculum ── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.11 }}
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Curriculum</h2>
            <p className="text-sm text-slate-500 mb-5">
              {course.modules.length} modules · {totalLessons} lessons · self-paced
            </p>
            <div className="space-y-2.5">
              {course.modules.map((mod, i) => (
                <ModuleCard key={mod.number} mod={mod} num={i} defaultOpen={i === 0} />
              ))}
            </div>
          </motion.div>

          {/* ── Who is it for ── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.12 }}
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-5">Who Is This For</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
                <p className="font-bold text-emerald-800 mb-3 text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Right for you if…
                </p>
                <ul className="space-y-2">
                  {[
                    'You want to create AI images but keep getting generic results',
                    'Your child (8+) is curious about AI and creative tools',
                    'You want a family project with a real tangible output',
                    "You've tried Midjourney or DALL-E but feel like you're guessing",
                    'You want to understand AI video before it becomes mainstream',
                  ].map((i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-emerald-900">
                      <span className="text-emerald-500 font-bold flex-shrink-0">✓</span> {i}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                <p className="font-bold text-slate-600 mb-3 text-sm">Not the right fit if…</p>
                <ul className="space-y-2">
                  {[
                    "You're looking for professional-grade graphic design software (Photoshop, Figma)",
                    'You need video editing skills (Premier, DaVinci) — this is AI generation, not editing',
                    "You want to learn how to train your own AI model",
                    'You need live instruction or a scheduled class',
                  ].map((i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-500">
                      <span className="text-slate-400 flex-shrink-0">—</span> {i}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* ── Instructors ── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.13 }}
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-5">Your Instructors</h2>
            <div className="space-y-4">
              <div className="bg-white border border-slate-200 rounded-2xl p-6 flex gap-5">
                <img src={wayneAvatar} alt="Wayne" className="w-14 h-14 rounded-full object-cover flex-shrink-0 border-2 border-slate-100" />
                <div>
                  <p className="font-bold text-slate-900 mb-0.5">Wayne</p>
                  <p className="text-sm text-violet-600 font-medium mb-2">Software Engineer · AI Practitioner · Dad</p>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Wayne has been using AI image and video tools since the first public releases.
                    He's the one who figured out the character consistency techniques that let Luna maintain
                    her "Mars Bunny" across 100+ images — and he designed this course so any parent can
                    teach those same techniques without being a designer.
                  </p>
                </div>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-6 flex gap-5">
                <img src={lunaAvatar} alt="Luna" className="w-14 h-14 rounded-full object-cover flex-shrink-0 border-2 border-slate-100" />
                <div>
                  <p className="font-bold text-slate-900 mb-0.5">Luna, age 8</p>
                  <p className="text-sm text-violet-600 font-medium mb-2">AI Artist · Storyteller · Wayne's Daughter</p>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Luna demonstrates every technique in the course — you see the actual process, not a
                    polished demo. She shows her failed attempts too. Watching an 8-year-old figure
                    something out in real time is the best proof that you can do it too.
                  </p>
                  <a
                    href={lunaSubdomain}
                    className="text-xs text-violet-600 hover:text-violet-800 font-medium mt-2 inline-block"
                  >
                    See Luna's work →
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── FAQ ── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.14 }}
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-2">FAQ</h2>
            <div className="divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white px-6 mb-4">
              {faqs.map((f) => <FaqItem key={f.q} q={f.q} a={f.a} />)}
            </div>
            <p className="text-sm text-slate-500">
              Other questions?{' '}
              <a href="mailto:wayne@bunnyuniverse.com?subject=AI Images %26 Video Course Question" className="text-violet-600 hover:text-violet-800 font-medium">
                Email Wayne
              </a>.
            </p>
          </motion.div>

          {/* ── Bottom CTA ── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="bg-gradient-to-br from-violet-900 to-indigo-900 rounded-2xl px-8 py-10 text-center text-white"
          >
            <div className="text-4xl mb-3">🎨</div>
            <h2 className="text-2xl font-bold mb-2">Join the Waitlist — Early Bird ${earlyBirdPrice}</h2>
            <p className="text-violet-200 mb-1 text-sm">Regular price ${course.price} · Lock in early-bird now</p>
            <p className="text-violet-300 text-xs mb-6">You'll be notified the moment the course is live</p>
            <a
              href={WAITLIST_HREF}
              className="inline-flex items-center gap-2 bg-white text-violet-700 hover:bg-violet-50 font-bold px-8 py-3.5 rounded-xl transition-colors text-sm"
            >
              Join Waitlist
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>

          {/* Back */}
          <div className="pb-4">
            <Link to="/wayne/courses" className="text-sm text-slate-400 hover:text-slate-700 flex items-center gap-1 transition-colors">
              ← All Courses
            </Link>
          </div>
        </div>

        {/* ══ RIGHT: Sticky sidebar ══ */}
        <div className="hidden lg:block lg:sticky lg:top-20 space-y-4">
          <WaitlistSidebar totalLessons={totalLessons} />
          <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-xl">
            <p className="text-xs font-semibold text-indigo-700 mb-2">Related courses</p>
            <Link to="/wayne/courses/ai-leadership" className="text-xs text-indigo-600 hover:text-indigo-800 block mb-1">
              AI Leadership: Six Core Skills →
            </Link>
            <Link to="/wayne/courses/ctf" className="text-xs text-indigo-600 hover:text-indigo-800 block">
              CTF: Your First Flag →
            </Link>
          </div>
        </div>

      </div>

      {/* Mobile sticky bottom bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 px-4 py-3 flex items-center justify-between gap-3 shadow-lg">
        <div>
          <p className="text-xs text-slate-400 line-through">${course.price}</p>
          <p className="font-bold text-violet-700 text-sm">Early Bird ${earlyBirdPrice}</p>
        </div>
        <a
          href={WAITLIST_HREF}
          className="flex-1 max-w-xs flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-bold px-5 py-2.5 rounded-xl transition-colors text-sm"
        >
          Join Waitlist <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </>
  );
}
