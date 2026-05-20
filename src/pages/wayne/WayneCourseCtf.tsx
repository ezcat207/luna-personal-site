import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ChevronDown,
  ChevronUp,
  ChevronRight,
  CheckCircle2,
  ArrowRight,
  Clock,
  Users,
  BarChart2,
  BookOpen,
  Video,
  Zap,
  Shield,
  Trophy,
  HelpCircle,
  Flag,
} from 'lucide-react';
import { SEOHead } from '../../components/SEOHead';
import { wayneCourses } from '../../data/wayneCourses';

const lunaSubdomain = import.meta.env.PROD
  ? 'https://luna.bunnyuniverse.com'
  : '/?persona=luna';

const lessonIcon = {
  article: <BookOpen className="w-3.5 h-3.5 text-slate-400" />,
  video: <Video className="w-3.5 h-3.5 text-indigo-400" />,
  practice: <Zap className="w-3.5 h-3.5 text-amber-400" />,
};

const EARLY_BIRD_DISCOUNT = 0.8;

const faqs = [
  {
    q: 'My child is only 8. Is this really for them?',
    a: "Yes — Luna started CTF at age 8. The course is designed so a parent and child work through challenges together. The parent doesn't need to know the answers; you're both figuring it out. That's the point.",
  },
  {
    q: "I have zero security background. Can I still do this with my kid?",
    a: "Wayne had no security background either when he started. The course teaches both of you simultaneously. Week 1 starts with zero assumed knowledge. If you can use a browser, you can start.",
  },
  {
    q: 'Is this safe? Are we learning to do anything illegal?',
    a: "CTF is a completely legal, sandboxed educational environment. You're solving puzzles on platforms like picoCTF — a Carnegie Mellon research project. It's like a video game for security concepts. Nothing taught in this course is applicable outside of CTF sandboxes.",
  },
  {
    q: 'What equipment do we need?',
    a: "A laptop and a browser. That's it for the first 4 weeks. Week 5 introduces a terminal (built into any modern Mac or Windows machine). No special hardware needed.",
  },
  {
    q: 'When does the course start? Is there a schedule?',
    a: "The course is async — you go at your own pace. Content releases weekly so you can follow along or binge. All materials stay accessible forever after purchase. The 24-hour mini-CTF in Week 6 has scheduled cohort dates.",
  },
  {
    q: "What if my child loses interest partway through?",
    a: "Most dropoff happens in Week 1 when crypto clicks. If they solve their first cipher, they're usually hooked. We've designed Week 1 specifically to create that 'aha' moment fast. And you keep lifetime access to come back anytime.",
  },
];

function WeekCard({ mod, weekNum, defaultOpen = false }: { mod: NonNullable<ReturnType<typeof wayneCourses.find>>['modules'][0]; weekNum: number; defaultOpen?: boolean }) {
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
        className="w-full flex items-center gap-4 px-6 py-5 hover:bg-slate-50 transition-colors text-left"
      >
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-600 text-white text-sm font-bold flex items-center justify-center">
          {weekNum}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-slate-800">{mod.title}</p>
          <p className="text-sm text-slate-500 mt-0.5 truncate">{mod.description}</p>
        </div>
        <div className="flex items-center gap-4 flex-shrink-0 ml-2">
          <span className="text-xs text-slate-400 hidden sm:block">
            {mod.lessons.length} lessons{totalMins > 0 ? ` · ~${totalMins} min` : ''}
          </span>
          {open ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </div>
      </button>
      {open && (
        <div className="border-t border-slate-100 divide-y divide-slate-100">
          {mod.lessons.map((lesson, i) => (
            <div key={i} className="flex items-center gap-3 px-6 py-3 bg-slate-50/60">
              <span className="flex-shrink-0">{lessonIcon[lesson.type]}</span>
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
    <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 px-6 py-4 hover:bg-slate-50 transition-colors text-left"
      >
        <span className="font-semibold text-slate-800 text-sm">{q}</span>
        {open ? (
          <ChevronUp className="w-4 h-4 text-slate-400 flex-shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
        )}
      </button>
      {open && (
        <div className="border-t border-slate-100 px-6 py-4 bg-slate-50/50">
          <p className="text-sm text-slate-600 leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

export default function WayneCourseCtf() {
  const course = wayneCourses.find((c) => c.id === 'ctf-intro')!;
  const price = course.price ?? 129;
  const earlyBirdPrice = Math.round(price * EARLY_BIRD_DISCOUNT);
  const waitlistHref = `mailto:wayne@bunnyuniverse.com?subject=CTF Course Waitlist&body=Hi Wayne, I'd like to join the waitlist for "CTF: Your First Flag". My child is __ years old.`;

  return (
    <>
      <SEOHead
        title="CTF: Your First Flag — Cybersecurity for Kids & Parents | Wayne's Plans"
        description="A 6-week parent-child course that takes complete beginners to their first Capture the Flag competition. Ages 8–14. Wayne teaches, Luna demonstrates."
      />

      <div className="space-y-16 max-w-4xl mx-auto">

        {/* ── Breadcrumb ── */}
        <div className="flex items-center gap-1 text-xs text-slate-400 -mb-10 pt-2">
          <Link to="/wayne" className="hover:text-slate-600">Wayne</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/wayne/courses" className="hover:text-slate-600">Courses</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-600">CTF: Your First Flag</span>
        </div>

        {/* ── Hero ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-2xl px-8 py-12 text-white overflow-hidden relative"
        >
          {/* decorative circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-500/10 rounded-full translate-y-1/2 -translate-x-1/4 pointer-events-none" />

          <div className="relative">
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="flex items-center gap-1.5 px-3 py-1 bg-amber-400/20 text-amber-300 text-xs font-bold rounded-full border border-amber-400/30">
                <Flag className="w-3 h-3" /> PAID COURSE
              </span>
              <span className="px-3 py-1 bg-white/10 text-white/70 text-xs rounded-full border border-white/10">
                Waitlist Open — Early Bird ${earlyBirdPrice}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight">
              CTF: Your First Flag
            </h1>
            <p className="text-xl text-indigo-200 mb-6 max-w-2xl leading-relaxed">
              A 6-week parent-and-child course that takes complete beginners to their first
              Capture the Flag cybersecurity competition. No experience needed — anywhere.
            </p>

            <div className="flex flex-wrap gap-5 text-sm mb-8">
              {[
                { icon: <Clock className="w-4 h-4" />, label: '6 weeks · self-paced' },
                { icon: <Users className="w-4 h-4" />, label: 'Ages 8–14 + parent' },
                { icon: <BarChart2 className="w-4 h-4" />, label: 'Absolute beginner' },
                { icon: <Trophy className="w-4 h-4" />, label: 'picoCTF ready' },
              ].map((item) => (
                <span key={item.label} className="flex items-center gap-2 text-indigo-200">
                  {item.icon}
                  {item.label}
                </span>
              ))}
            </div>

            <a
              href={waitlistHref}
              className="inline-flex items-center gap-2 bg-indigo-500 hover:bg-indigo-400 text-white font-bold px-7 py-3.5 rounded-xl transition-colors text-sm"
            >
              Join Waitlist — Early Bird ${earlyBirdPrice}
              <ArrowRight className="w-4 h-4" />
            </a>
            <p className="text-xs text-indigo-300/70 mt-2">
              ${price} at launch · Lifetime access
            </p>
          </div>
        </motion.div>

        {/* ── What is CTF? ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
        >
          <h2 className="text-2xl font-bold text-slate-900 mb-6">What is CTF?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: <Shield className="w-5 h-5 text-indigo-600" />,
                title: 'It\'s a puzzle competition',
                body: 'CTF (Capture the Flag) is how security professionals train. Teams compete to find hidden "flags" — secret codes buried in websites, files, ciphers, and programs.',
              },
              {
                icon: <Trophy className="w-5 h-5 text-indigo-600" />,
                title: 'Beginner-friendly by design',
                body: 'Platforms like picoCTF (from Carnegie Mellon) are built specifically for students. The easiest challenges teach the same concepts covered in Week 1 of this course.',
              },
              {
                icon: <Users className="w-5 h-5 text-indigo-600" />,
                title: 'Family-scale fun',
                body: 'CTF is one of the few competitive activities where an 8-year-old can outperform a PhD if they think creatively. Wayne and Luna proved it together.',
              },
            ].map((item) => (
              <div key={item.title} className="bg-white border border-slate-200 rounded-xl p-5">
                <div className="w-9 h-9 bg-indigo-50 rounded-lg flex items-center justify-center mb-3">
                  {item.icon}
                </div>
                <p className="font-semibold text-slate-800 text-sm mb-2">{item.title}</p>
                <p className="text-sm text-slate-500 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Luna's real results ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.08 }}
          className="bg-pink-50 border border-pink-200 rounded-2xl p-8"
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="text-2xl">🐰</span>
            <div>
              <p className="font-bold text-slate-800">Luna's Real Results</p>
              <p className="text-sm text-slate-500">Age 8 · Complete beginner → CTF competitor</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {[
              { number: '2', label: 'CTF competitions entered', sub: 'May 2026' },
              { number: '8+', label: 'Flags captured', sub: 'binary + crypto + web' },
              { number: 'Top 15%', label: 'picoCTF ranking', sub: 'first attempt' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-xl p-4 text-center border border-pink-100">
                <p className="text-2xl font-bold text-indigo-700">{stat.number}</p>
                <p className="text-xs font-semibold text-slate-700 mt-1">{stat.label}</p>
                <p className="text-xs text-slate-400 mt-0.5">{stat.sub}</p>
              </div>
            ))}
          </div>
          <blockquote className="text-slate-700 text-sm italic leading-relaxed border-l-4 border-pink-300 pl-4">
            "The binary reversing session was insane. Luna looked at the disassembled output and
            found the flag by tracing through the logic — something most adult beginners take months
            to do. We both learned that day."
          </blockquote>
          <p className="text-xs text-slate-400 mt-2 pl-4">— Wayne, May 9 session notes</p>
          <div className="mt-4 pl-4">
            <a
              href="/wayne/insights/6"
              className="text-xs text-indigo-600 hover:text-indigo-800 font-medium inline-flex items-center gap-1"
            >
              Read the full session recap <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </motion.div>

        {/* ── What you'll learn ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <h2 className="text-2xl font-bold text-slate-900 mb-6">What You'll Learn</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              'Understand what CTF competitions are and how to enter picoCTF',
              'Decode secret messages: Caesar cipher, ROT13, Base64, XOR',
              'Use CyberChef — the all-in-one decryption tool',
              'Explore web pages with DevTools like a security researcher',
              'Find hidden data in images (steganography)',
              'Read binary files with the `strings` command',
              'Understand binary, hex, and ASCII — the hacker\'s foundation',
              'Use AI to make sense of complex technical output',
              'Develop a competition mindset: triage, hints, team strategy',
              'Submit your first real flag in a live CTF event',
            ].map((outcome) => (
              <div key={outcome} className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-slate-700">{outcome}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Curriculum ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.12 }}
        >
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Full Curriculum</h2>
          <p className="text-slate-500 text-sm mb-6">
            6 weeks · {course.modules.reduce((a, m) => a + m.lessons.length, 0)} lessons · self-paced
          </p>
          <div className="space-y-3">
            {course.modules.map((mod, i) => (
              <WeekCard key={mod.number} mod={mod} weekNum={i + 1} defaultOpen={i === 0} />
            ))}
          </div>
        </motion.div>

        {/* ── Is this for me? ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.14 }}
        >
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Is This Course for You?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
              <p className="font-bold text-emerald-800 mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> This IS for you if...
              </p>
              <ul className="space-y-2.5">
                {[
                  'Your child is 7–14 and curious about computers or "hacking"',
                  'You want a shared activity, not just another kids\' class',
                  'Your child already finished a beginner coding course and wants the next challenge',
                  'You\'re fine not knowing all the answers — you\'ll figure it out together',
                  "Your kid plays puzzle games (Minecraft, logic puzzles, escape rooms)",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-emerald-900">
                    <span className="text-emerald-500 flex-shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
              <p className="font-bold text-slate-700 mb-4 flex items-center gap-2">
                <HelpCircle className="w-4 h-4" /> Consider waiting if...
              </p>
              <ul className="space-y-2.5">
                {[
                  "Your child doesn't have interest — curiosity is the only prerequisite we can't provide",
                  'You need a fully live, teacher-led format with guaranteed weekly calls',
                  'Your child is under 7 and not yet comfortable with a keyboard',
                  'You\'re looking for a traditional certification (this is practical, not credentialed)',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="text-slate-400 flex-shrink-0">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* ── Pricing ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.16 }}
          id="pricing"
        >
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Pricing</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Early Bird */}
            <div className="bg-white border-2 border-indigo-300 rounded-2xl p-7 relative">
              <span className="absolute -top-3 left-6 px-3 py-1 bg-indigo-600 text-white text-xs font-bold rounded-full">
                WAITLIST PRICE
              </span>
              <p className="text-4xl font-bold text-slate-900 mt-2">
                ${earlyBirdPrice}
                <span className="text-base font-normal text-slate-400 ml-1">one-time</span>
              </p>
              <p className="text-sm text-slate-500 mt-1 mb-5">
                Save ${price - earlyBirdPrice} vs. launch price. Lock it in now.
              </p>
              <ul className="space-y-2.5 mb-6">
                {[
                  'All 6 weeks of content',
                  '24-hour family mini-CTF event',
                  'Lifetime access — revisit anytime',
                  'Wayne\'s weekly Q&A (first cohort)',
                  'Direct email access to Wayne',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-indigo-500 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href={waitlistHref}
                className="flex items-center justify-center gap-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-5 py-3 rounded-xl transition-colors text-sm"
              >
                Join Waitlist — ${earlyBirdPrice}
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* At launch */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-7">
              <p className="text-lg font-semibold text-slate-400 mt-2">
                At launch
              </p>
              <p className="text-4xl font-bold text-slate-400 mt-1">
                ${price}
                <span className="text-base font-normal text-slate-400 ml-1">one-time</span>
              </p>
              <p className="text-sm text-slate-400 mt-1 mb-5">
                Available when the course goes live.
              </p>
              <ul className="space-y-2.5 mb-6">
                {[
                  'All 6 weeks of content',
                  '24-hour family mini-CTF event',
                  'Lifetime access — revisit anytime',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-slate-400">
                    <CheckCircle2 className="w-4 h-4 text-slate-300 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <button
                disabled
                className="w-full bg-slate-200 text-slate-400 font-bold px-5 py-3 rounded-xl text-sm cursor-not-allowed"
              >
                Not yet available
              </button>
            </div>
          </div>
        </motion.div>

        {/* ── FAQ ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.18 }}
        >
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <FaqItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
          <p className="text-sm text-slate-500 mt-6">
            More questions?{' '}
            <a
              href="mailto:wayne@bunnyuniverse.com?subject=CTF Course Question"
              className="text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Email Wayne directly
            </a>
            .
          </p>
        </motion.div>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="bg-slate-900 rounded-2xl px-8 py-10 text-center text-white"
        >
          <div className="text-3xl mb-3">🚩</div>
          <h2 className="text-2xl font-bold mb-3">Ready to capture your first flag?</h2>
          <p className="text-slate-300 mb-6 max-w-lg mx-auto text-sm leading-relaxed">
            Join the waitlist and get early bird pricing. Course releases with the first cohort.
            You'll be the first to know the launch date.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={waitlistHref}
              className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-7 py-3 rounded-xl transition-colors text-sm"
            >
              Join Waitlist — Early Bird ${earlyBirdPrice}
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href={`${lunaSubdomain}/luna/3`}
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium px-7 py-3 rounded-xl transition-colors text-sm"
            >
              See Luna's CTF results first
            </a>
          </div>
        </motion.div>

        {/* ── Back link ── */}
        <div className="pb-4">
          <Link
            to="/wayne/courses"
            className="text-sm text-slate-400 hover:text-slate-700 flex items-center gap-1 transition-colors"
          >
            ← All Courses
          </Link>
        </div>

      </div>
    </>
  );
}
