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
  Shield,
  Trophy,
  Infinity,
  Flag,
  Star,
  BarChart2,
  MessageSquare,
} from 'lucide-react';
import { SEOHead } from '../../components/SEOHead';
import { wayneCourses } from '../../data/wayneCourses';
import wayneAvatar from '../../assets/wayne-avatar.jpg';
import lunaAvatar from '../../assets/luna-avatar.jpg';

const lunaSubdomain = import.meta.env.PROD
  ? 'https://luna.bunnyuniverse.com'
  : '/?persona=luna';

const EARLY_BIRD_DISCOUNT = 0.8;

const lessonIcon = {
  article: <BookOpen className="w-3.5 h-3.5 text-slate-400" />,
  video: <Video className="w-3.5 h-3.5 text-indigo-400" />,
  practice: <Zap className="w-3.5 h-3.5 text-amber-400" />,
};

type LessonType = 'article' | 'video' | 'practice';

const faqs = [
  {
    q: 'My child is only 8. Is this really for them?',
    a: "Yes — Luna started CTF at age 8. The course is designed so parent and child work through challenges together. The parent doesn't need to know the answers; you're both figuring it out. That's the point.",
  },
  {
    q: 'I have zero security background. Can I still do this with my kid?',
    a: "Wayne had no security background either when he started. The course teaches both of you simultaneously. Week 1 starts with zero assumed knowledge. If you can use a browser, you can begin.",
  },
  {
    q: 'Is this safe? Are we learning to do anything illegal?',
    a: "CTF is a completely legal, sandboxed educational environment. You're solving puzzles on platforms like picoCTF — a Carnegie Mellon research project. It's like a video game for security concepts. Nothing in this course applies outside CTF sandboxes.",
  },
  {
    q: 'What equipment do we need?',
    a: "A laptop and a browser. That's it for the first 4 weeks. Week 5 introduces a terminal (built into any modern Mac or Windows machine). No special hardware needed.",
  },
  {
    q: 'When does the course start? Is there a schedule?',
    a: "The course is async — you go at your own pace. Content releases weekly so you can follow along or binge ahead. All materials stay accessible forever. The 24-hour mini-CTF in Week 6 has scheduled cohort dates.",
  },
  {
    q: "What if my child loses interest partway through?",
    a: "Most dropoff happens before Week 1 ends — if they solve their first cipher, they're usually hooked for good. We've designed Week 1 to create that 'aha' moment as fast as possible. You keep lifetime access to come back anytime.",
  },
];

function WeekCard({
  mod,
  weekNum,
  defaultOpen = false,
}: {
  mod: NonNullable<ReturnType<typeof wayneCourses.find>>['modules'][0];
  weekNum: number;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const totalMins = mod.lessons.reduce((acc, l) => {
    if (!l.duration) return acc;
    const m = l.duration.match(/(\d+)\s*min/);
    return acc + (m ? parseInt(m[1]) : 0);
  }, 0);

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-4 px-5 py-4 hover:bg-slate-50 transition-colors text-left"
      >
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">
          {weekNum}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-slate-800 text-sm">{mod.title}</p>
          <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{mod.description}</p>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0 ml-2 text-xs text-slate-400">
          <span className="hidden sm:block">
            {mod.lessons.length} lessons{totalMins > 0 ? ` · ~${totalMins}m` : ''}
          </span>
          {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>
      {open && (
        <div className="border-t border-slate-100 divide-y divide-slate-100">
          {mod.lessons.map((lesson, i) => (
            <div key={i} className="flex items-center gap-3 px-5 py-3 bg-slate-50/60">
              <span className="flex-shrink-0">{lessonIcon[lesson.type as LessonType]}</span>
              <span className="text-sm text-slate-700 flex-1">{lesson.title}</span>
              {lesson.duration && (
                <span className="text-xs text-slate-400 flex-shrink-0">{lesson.duration}</span>
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
        className="w-full flex items-center justify-between gap-4 py-4 hover:text-indigo-700 transition-colors text-left"
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

// ── Sticky sidebar ────────────────────────────────────────────────
function EnrollSidebar({
  price,
  earlyBirdPrice,
  waitlistHref,
  totalLessons,
}: {
  price: number;
  earlyBirdPrice: number;
  waitlistHref: string;
  totalLessons: number;
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
      {/* Price block */}
      <div className="px-6 pt-6 pb-4 border-b border-slate-100">
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-3xl font-bold text-slate-900">${earlyBirdPrice}</span>
          <span className="text-lg text-slate-400 line-through">${price}</span>
          <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-bold rounded-full ml-auto">
            EARLY BIRD
          </span>
        </div>
        <p className="text-xs text-slate-400">
          Save ${price - earlyBirdPrice} · Price goes to ${price} at launch
        </p>
      </div>

      {/* CTA */}
      <div className="px-6 py-5 border-b border-slate-100">
        <a
          href={waitlistHref}
          className="flex items-center justify-center gap-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-5 py-3.5 rounded-xl transition-colors text-sm"
        >
          Join Waitlist — ${earlyBirdPrice}
          <ArrowRight className="w-4 h-4" />
        </a>
        <p className="text-xs text-slate-400 text-center mt-2">
          We'll email you when the course launches
        </p>
      </div>

      {/* Stats */}
      <div className="px-6 py-4 border-b border-slate-100 space-y-3">
        {[
          { icon: <Clock className="w-4 h-4 text-slate-400" />, label: '6 weeks · self-paced' },
          { icon: <BookOpen className="w-4 h-4 text-slate-400" />, label: `${totalLessons} lessons` },
          { icon: <Users className="w-4 h-4 text-slate-400" />, label: 'Ages 7–14 + parent' },
          { icon: <BarChart2 className="w-4 h-4 text-slate-400" />, label: 'Absolute beginner' },
          { icon: <Infinity className="w-4 h-4 text-slate-400" />, label: 'Lifetime access' },
          { icon: <Trophy className="w-4 h-4 text-slate-400" />, label: 'picoCTF competition ready' },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-3 text-sm text-slate-600">
            {item.icon}
            {item.label}
          </div>
        ))}
      </div>

      {/* What's included */}
      <div className="px-6 py-4 border-b border-slate-100">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">
          What's included
        </p>
        {[
          'All 6 weeks of async content',
          'Wayne\'s weekly written commentary',
          'Luna\'s video walkthroughs',
          '24-hour family mini-CTF event',
          'Wayne direct email access (first cohort)',
          'Future content updates',
        ].map((item) => (
          <div key={item} className="flex items-start gap-2 mb-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0 mt-0.5" />
            <span className="text-xs text-slate-600">{item}</span>
          </div>
        ))}
      </div>

      {/* Social proof mini */}
      <div className="px-6 py-4 bg-pink-50">
        <div className="flex items-center gap-2 mb-1">
          <img src={lunaAvatar} alt="Luna" className="w-6 h-6 rounded-full object-cover" />
          <span className="text-xs font-semibold text-slate-700">Luna, age 8</span>
          <div className="flex ml-auto">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" />
            ))}
          </div>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed italic">
          "Top 15% in her first picoCTF competition. 8+ flags captured."
        </p>
      </div>
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────────
export default function WayneCourseCtf() {
  const course = wayneCourses.find((c) => c.id === 'ctf-intro')!;
  const price = course.price ?? 129;
  const earlyBirdPrice = Math.round(price * EARLY_BIRD_DISCOUNT);
  const totalLessons = course.modules.reduce((a, m) => a + m.lessons.length, 0);
  const waitlistHref = `mailto:wayne@bunnyuniverse.com?subject=CTF Course Waitlist&body=Hi Wayne, I'd like to join the waitlist for "CTF: Your First Flag". My child is __ years old.`;

  return (
    <>
      <SEOHead
        title="CTF: Your First Flag — Cybersecurity for Kids & Parents | Wayne's Plans"
        description="A 6-week parent-child course from absolute beginner to first Capture the Flag competition. Ages 7–14. Wayne teaches, Luna demonstrates."
      />

      {/* Breadcrumb */}
      <div className="flex items-center gap-1 text-xs text-slate-400 mb-8">
        <Link to="/wayne" className="hover:text-slate-600">Wayne</Link>
        <ChevronRight className="w-3 h-3" />
        <Link to="/wayne/courses" className="hover:text-slate-600">Courses</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-slate-600">CTF: Your First Flag</span>
      </div>

      {/* Two-column layout */}
      <div className="lg:grid lg:grid-cols-[1fr_300px] lg:gap-10 lg:items-start">

        {/* ══ LEFT: main content ══ */}
        <div className="space-y-14 min-w-0">

          {/* ── Hero ── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-full border border-indigo-200">
                <Flag className="w-3 h-3" /> Paid Course
              </span>
              <span className="px-3 py-1 bg-amber-50 text-amber-700 text-xs font-semibold rounded-full border border-amber-200">
                Waitlist Open · Early Bird ${earlyBirdPrice}
              </span>
            </div>

            <h1 className="text-4xl font-bold text-slate-900 leading-tight mb-4">
              CTF: Your First Flag
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed mb-6">
              A 6-week parent-and-child course that takes complete beginners to their first
              Capture the Flag cybersecurity competition. Wayne teaches the why. Luna shows the how.
            </p>

            {/* Instructor line */}
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <img src={wayneAvatar} alt="Wayne" className="w-8 h-8 rounded-full object-cover" />
                <img src={lunaAvatar} alt="Luna" className="w-8 h-8 rounded-full object-cover -ml-3 border-2 border-white" />
                <span className="text-sm text-slate-600 ml-1">
                  Taught by <span className="font-semibold text-slate-800">Wayne</span> · Demonstrated by <span className="font-semibold text-slate-800">Luna</span>
                </span>
              </div>
              <div className="flex items-center gap-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <span className="text-xs text-slate-500 ml-1">Luna's first competition result: Top 15%</span>
              </div>
            </div>

            {/* Mobile-only CTA */}
            <div className="lg:hidden mt-6 p-5 bg-white border border-slate-200 rounded-xl">
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-2xl font-bold text-slate-900">${earlyBirdPrice}</span>
                <span className="text-slate-400 line-through">${price}</span>
                <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-bold rounded-full">
                  EARLY BIRD
                </span>
              </div>
              <a
                href={waitlistHref}
                className="flex items-center justify-center gap-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-5 py-3 rounded-xl transition-colors text-sm"
              >
                Join Waitlist
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* ── Problem statement ── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-5">
              Cybersecurity is the most under-taught skill in K–12
            </h2>
            <div className="prose prose-slate max-w-none">
              <p className="text-slate-600 leading-relaxed mb-4">
                Most kids who want to "learn hacking" end up watching YouTube tutorials they can't
                reproduce, or following one-off articles with no structure. They get excited, try one
                thing, hit a wall, and stop.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                Capture the Flag competitions solve this. CTF is how actual security professionals
                learned — a series of escalating puzzles with real tools, real constraints, and real
                satisfaction when you submit a flag. The problem is that all existing CTF preparation
                assumes a high school or college student, working alone.
              </p>
              <p className="text-slate-600 leading-relaxed font-medium">
                This course fixes that. Wayne designs the learning path. Luna — age 8 at the start
                — proves it's achievable. You and your child do it together.
              </p>
            </div>
          </motion.div>

          {/* ── What is CTF? ── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.07 }}
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-5">What is CTF?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  icon: <Shield className="w-5 h-5 text-indigo-600" />,
                  title: 'A puzzle competition',
                  body: 'Teams find hidden "flags" — secret codes buried in encrypted messages, web pages, image files, and programs. Each flag is worth points.',
                },
                {
                  icon: <Trophy className="w-5 h-5 text-indigo-600" />,
                  title: 'Beginner-friendly categories',
                  body: 'Cryptography, web exploitation, forensics, binary basics — each category has beginner challenges anyone can attempt on day one.',
                },
                {
                  icon: <Users className="w-5 h-5 text-indigo-600" />,
                  title: 'Age doesn\'t matter',
                  body: 'CTF rewards creative thinking over raw knowledge. An 8-year-old with good instincts can outperform adults on certain challenges.',
                },
              ].map((item) => (
                <div key={item.title} className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                  <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center mb-3">
                    {item.icon}
                  </div>
                  <p className="font-semibold text-slate-800 text-sm mb-1">{item.title}</p>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Luna's results ── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.09 }}
            className="bg-pink-50 border border-pink-200 rounded-2xl p-7"
          >
            <div className="flex items-center gap-3 mb-4">
              <img src={lunaAvatar} alt="Luna" className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm" />
              <div>
                <p className="font-bold text-slate-800 text-sm">Luna's Real Results</p>
                <p className="text-xs text-slate-500">Age 8 · zero experience → CTF competitor</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-5">
              {[
                { n: '2', label: 'Competitions', sub: 'May 2026' },
                { n: '8+', label: 'Flags captured', sub: 'binary + crypto + web' },
                { n: 'Top 15%', label: 'picoCTF rank', sub: 'first attempt' },
              ].map((s) => (
                <div key={s.label} className="bg-white rounded-xl p-3 text-center border border-pink-100">
                  <p className="text-xl font-bold text-indigo-700">{s.n}</p>
                  <p className="text-xs font-semibold text-slate-700 mt-0.5">{s.label}</p>
                  <p className="text-xs text-slate-400">{s.sub}</p>
                </div>
              ))}
            </div>
            <blockquote className="border-l-4 border-pink-300 pl-4 text-sm text-slate-700 italic leading-relaxed">
              "The binary reversing session was insane. Luna looked at the disassembled output and
              found the flag by tracing through the logic — something most adult beginners take
              months to reach. We both learned that day."
            </blockquote>
            <p className="text-xs text-slate-400 mt-2 pl-4">— Wayne, May 9 session notes</p>
            <div className="mt-3 pl-4">
              <a href="/wayne/insights/6" className="text-xs text-indigo-600 hover:text-indigo-800 font-medium inline-flex items-center gap-1">
                Read the full CTF session recap <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </motion.div>

          {/* ── What you'll learn ── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-5">What You'll Learn</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
              {[
                'Understand what CTF competitions are and how to enter picoCTF',
                'Decode secret messages: Caesar cipher, ROT13, Base64, XOR',
                'Use CyberChef — the all-in-one decryption toolkit',
                'Explore web pages with DevTools like a security researcher',
                'Find hidden data inside image files (steganography)',
                'Read binary files with the `strings` command',
                'Understand binary, hex, and ASCII — the hacker\'s foundation',
                'Use AI to make sense of complex technical output',
                'Develop a competition mindset: triage, hints, team roles',
                'Submit your first real flag in a live CTF event',
              ].map((item) => (
                <div key={item} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Is this for you ── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.11 }}
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-5">Is This Course for You?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
                <p className="font-bold text-emerald-800 mb-3 text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Yes, if...
                </p>
                <ul className="space-y-2">
                  {[
                    'Your child is 7–14 and curious about computers',
                    'You want a shared activity, not a drop-off class',
                    "Your child plays logic/puzzle games (Minecraft, escape rooms)",
                    "You're fine not knowing answers — you learn together",
                    'Your kid has finished a basic coding course and wants the next challenge',
                  ].map((i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-emerald-900">
                      <span className="text-emerald-500 flex-shrink-0 font-bold">✓</span> {i}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                <p className="font-bold text-slate-600 mb-3 text-sm flex items-center gap-2">
                  <span className="text-slate-400">—</span> Not a fit if...
                </p>
                <ul className="space-y-2">
                  {[
                    "Your child has no interest — curiosity is the only thing we can't provide",
                    'You need a live, teacher-led format with scheduled weekly calls',
                    'Your child is under 7 and not yet comfortable with a keyboard',
                    "You're looking for a formal credential or certificate",
                  ].map((i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-500">
                      <span className="text-slate-400 flex-shrink-0">—</span> {i}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* ── Curriculum ── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.12 }}
          >
            <div className="flex items-baseline gap-3 mb-2">
              <h2 className="text-2xl font-bold text-slate-900">Course Curriculum</h2>
            </div>
            <p className="text-sm text-slate-500 mb-5">
              {course.modules.length} weeks · {totalLessons} lessons · self-paced
            </p>
            <div className="space-y-2.5">
              {course.modules.map((mod, i) => (
                <WeekCard key={mod.number} mod={mod} weekNum={i + 1} defaultOpen={i === 0} />
              ))}
            </div>
          </motion.div>

          {/* ── Instructors ── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.13 }}
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-5">Your Instructors</h2>
            <div className="space-y-5">
              {/* Wayne */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 flex gap-5">
                <img
                  src={wayneAvatar}
                  alt="Wayne"
                  className="w-16 h-16 rounded-full object-cover flex-shrink-0 border-2 border-slate-100"
                />
                <div>
                  <p className="font-bold text-slate-900 text-lg">Wayne</p>
                  <p className="text-sm text-indigo-600 font-medium mb-3">Curriculum designer · Dad</p>
                  <p className="text-sm text-slate-600 leading-relaxed mb-3">
                    Software engineer and AI practitioner who started teaching Luna about computers
                    when she was 5. Wayne documents every lesson — what worked, what failed, and
                    why — in his weekly teaching plans. He had zero cybersecurity background before
                    this journey.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['AI Tools', 'Curriculum Design', 'Vibe Coding', 'CTF'].map((tag) => (
                      <span key={tag} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              {/* Luna */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 flex gap-5">
                <img
                  src={lunaAvatar}
                  alt="Luna"
                  className="w-16 h-16 rounded-full object-cover flex-shrink-0 border-2 border-pink-100"
                />
                <div>
                  <p className="font-bold text-slate-900 text-lg">Luna</p>
                  <p className="text-sm text-pink-500 font-medium mb-3">Proof of concept · Age 8</p>
                  <p className="text-sm text-slate-600 leading-relaxed mb-3">
                    Luna is the real validator of this course. Every module Wayne designs, Luna
                    executes. Her results — and her reactions — are documented publicly every week.
                    She entered her first CTF in May 2026 and finished in the top 15% on the first
                    attempt. She is not exceptional; she had a good curriculum.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['CTF', 'Cryptography', 'Binary Reversing', 'Web Exploits'].map((tag) => (
                      <span key={tag} className="px-2 py-0.5 bg-pink-50 text-pink-600 text-xs rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-3">
                    <a
                      href={`${lunaSubdomain}/luna/3`}
                      className="text-xs text-pink-500 hover:text-pink-700 font-medium inline-flex items-center gap-1"
                    >
                      See Luna's learning diary <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
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
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Questions</h2>
            <div className="divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white px-6 mb-4">
              {faqs.map((faq) => (
                <FaqItem key={faq.q} q={faq.q} a={faq.a} />
              ))}
            </div>
            <p className="text-sm text-slate-500">
              Something else?{' '}
              <a
                href="mailto:wayne@bunnyuniverse.com?subject=CTF Course Question"
                className="text-indigo-600 hover:text-indigo-800 font-medium"
              >
                Email Wayne directly
              </a>
              .
            </p>
          </motion.div>

          {/* ── Bottom CTA (left column) ── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="bg-slate-900 rounded-2xl px-8 py-10 text-center text-white"
          >
            <div className="text-3xl mb-3">🚩</div>
            <h2 className="text-2xl font-bold mb-3">Ready to capture your first flag?</h2>
            <p className="text-slate-300 mb-6 text-sm leading-relaxed max-w-md mx-auto">
              Join the waitlist now and lock in early-bird pricing. You'll be the first to know
              when the course opens.
            </p>
            <a
              href={waitlistHref}
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-7 py-3 rounded-xl transition-colors text-sm"
            >
              Join Waitlist — Early Bird ${earlyBirdPrice}
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>

          {/* Back link */}
          <div className="pb-4">
            <Link
              to="/wayne/courses"
              className="text-sm text-slate-400 hover:text-slate-700 flex items-center gap-1 transition-colors"
            >
              ← All Courses
            </Link>
          </div>
        </div>

        {/* ══ RIGHT: Sticky sidebar ══ */}
        <div className="hidden lg:block lg:sticky lg:top-20">
          <EnrollSidebar
            price={price}
            earlyBirdPrice={earlyBirdPrice}
            waitlistHref={waitlistHref}
            totalLessons={totalLessons}
          />

          {/* Also used by block */}
          <div className="mt-4 p-4 bg-white border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5" /> Tools you'll use
            </p>
            <div className="flex flex-wrap gap-1.5">
              {course.tools.map((tool) => (
                <span key={tool} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded-md">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Mobile sticky bottom bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 px-4 py-3 flex items-center justify-between gap-3 shadow-lg">
        <div>
          <p className="text-xs text-slate-500 line-through">${price}</p>
          <p className="font-bold text-slate-900">${earlyBirdPrice} <span className="text-xs font-normal text-amber-600">early bird</span></p>
        </div>
        <a
          href={waitlistHref}
          className="flex-1 max-w-xs flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-5 py-2.5 rounded-xl transition-colors text-sm"
        >
          Join Waitlist
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </>
  );
}
