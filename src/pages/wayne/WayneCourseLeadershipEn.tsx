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
  MessageSquare,
  Flame,
  BrainCircuit,
  GitBranch,
  Route,
  Stethoscope,
  Layers,
} from 'lucide-react';
import { SEOHead } from '../../components/SEOHead';
import { wayneCourses } from '../../data/wayneCourses';
import wayneAvatar from '../../assets/wayne-avatar.jpg';

const FREE_SLOTS = 97;
// Update this number manually as signups come in
const SLOTS_TAKEN = 0;
const SLOTS_LEFT = FREE_SLOTS - SLOTS_TAKEN;

const ENROLL_HREF =
  'mailto:wayne@bunnyuniverse.com?subject=AI Leadership Course — Free Enrollment&body=Hi Wayne, I\'d like to apply for a free spot in the AI Leadership course.%0A%0AMy background:%0AHow I currently use AI:%0AThe problem I want to solve:';

const lessonIcon = {
  article: <BookOpen className="w-3.5 h-3.5 text-slate-400" />,
  video: <Video className="w-3.5 h-3.5 text-indigo-400" />,
  practice: <Zap className="w-3.5 h-3.5 text-amber-400" />,
};

type LessonType = 'article' | 'video' | 'practice';

const SIX_SKILLS = [
  {
    num: '01',
    icon: <MessageSquare className="w-5 h-5 text-indigo-600" />,
    name: 'Brief',
    tagline: 'Garbage in, garbage out',
    desc: 'Context is your most important asset. What you feed AI — and what you withhold — directly determines output quality. Long-term project context vs. single-task context; raw source vs. compressed summary. Master this and every other skill compounds.',
  },
  {
    num: '02',
    icon: <GitBranch className="w-5 h-5 text-indigo-600" />,
    name: 'Stage',
    tagline: 'Complex tasks need steps, not wishes',
    desc: 'Break a complex request into an executable sequence: have AI confirm understanding, surface uncertainties, fill gaps, then execute with checkpoints. Skipping this and demanding a final result almost always produces something that looks right but doesn\'t work.',
  },
  {
    num: '03',
    icon: <BrainCircuit className="w-5 h-5 text-indigo-600" />,
    name: 'Own',
    tagline: 'Humans lead, AI executes',
    desc: 'AI excels at organizing information, generating first drafts, extracting structure, and batch rewriting. But direction, key trade-offs, and accountability must remain human. Real AI leadership means designing the collaboration — not outsourcing your judgment.',
  },
  {
    num: '04',
    icon: <Route className="w-5 h-5 text-indigo-600" />,
    name: 'Route',
    tagline: 'The right tool for the right step',
    desc: "It's not just 'which model is best' — it's 'who handles this step.' Long-context tasks, web search, code execution, structured output — each has a best-fit tool. A good dispatcher knows how to position the right players at the right moment.",
  },
  {
    num: '05',
    icon: <Stethoscope className="w-5 h-5 text-indigo-600" />,
    name: 'Debug',
    tagline: 'Find the cause, not another roll of the dice',
    desc: 'Retrying blindly is like rolling dice each time — no systematic improvement. AI errors fall into six root causes: context, instructions, staging, model capability, tool calls, evaluation criteria. Identify the category and fixes become targeted, not random.',
  },
  {
    num: '06',
    icon: <Layers className="w-5 h-5 text-indigo-600" />,
    name: 'Distill',
    tagline: 'Experts compound — you should too',
    desc: 'A good prompt, a checklist, a project spec, an effective human-AI workflow — none of these should stay trapped in a single conversation. Ordinary users restart from zero every time. Experts get stronger with every project. The gap is this habit.',
  },
];

const faqs = [
  {
    q: 'Is the course in English or Chinese?',
    a: 'This version is fully in English. A Chinese version of the same course is also available at /wayne/courses/ai-leadership/zh.',
  },
  {
    q: 'What does "First 97 Free" mean?',
    a: 'The regular price is $199. The first 97 students can enroll completely free as the first wave of testers. After that, full price applies. No advance notice when spots run out.',
  },
  {
    q: "Why free? Is there a catch?",
    a: "The course just launched and needs real user feedback to improve. The only 'condition': if you find problems or have suggestions, tell Wayne directly. No mandatory sharing, no forced reviews.",
  },
  {
    q: 'How difficult is this? What background do I need?',
    a: 'You should have been using AI (ChatGPT, Claude, etc.) for at least a month. No coding background required. The course targets people who want to use AI for complex work, or who need to lead a human-AI team.',
  },
  {
    q: 'Is it async or live?',
    a: 'Fully async, self-paced. Content is released weekly, but you can work ahead. First-wave students get direct email access to Wayne for Q&A.',
  },
  {
    q: "What will I have when I finish?",
    a: '7 immediately usable templates and tools (Brief context template, Stage task template, Own decision tree, Route dispatch map, Debug log, Prompt asset library, Retrospective framework) — plus a work system you can bring to every new project.',
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
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">
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
        className="w-full flex items-center justify-between gap-4 py-4 text-left hover:text-indigo-700 transition-colors"
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

function EnrollSidebar({ totalLessons }: { totalLessons: number }) {
  const pct = Math.round((SLOTS_TAKEN / FREE_SLOTS) * 100);
  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
      {/* Free badge */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 px-6 py-4 text-white">
        <div className="flex items-center gap-2 mb-1">
          <Flame className="w-4 h-4" />
          <span className="font-bold text-sm">First 97 Free</span>
        </div>
        <p className="text-xs text-emerald-100">Regular price $199 · Free now</p>
      </div>

      {/* Slot counter */}
      <div className="px-6 py-4 border-b border-slate-100">
        <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
          <span>{SLOTS_TAKEN} spots claimed</span>
          <span className="font-bold text-emerald-600">{SLOTS_LEFT} remaining</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2">
          <div
            className="bg-emerald-500 h-2 rounded-full transition-all"
            style={{ width: `${Math.max(pct, 2)}%` }}
          />
        </div>
        <p className="text-xs text-slate-400 mt-1.5">{FREE_SLOTS} free spots · gone without notice</p>
      </div>

      {/* CTA */}
      <div className="px-6 py-4 border-b border-slate-100">
        <a
          href={ENROLL_HREF}
          className="flex items-center justify-center gap-2 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-3.5 rounded-xl transition-colors text-sm"
        >
          Apply for Free
          <ArrowRight className="w-4 h-4" />
        </a>
        <p className="text-xs text-slate-400 text-center mt-2">Email Wayne — reply within 24h</p>
      </div>

      {/* Stats */}
      <div className="px-6 py-4 border-b border-slate-100 space-y-3">
        {[
          { icon: <Clock className="w-4 h-4 text-slate-400" />, label: '6 weeks · self-paced' },
          { icon: <BookOpen className="w-4 h-4 text-slate-400" />, label: `${totalLessons} lessons` },
          { icon: <Users className="w-4 h-4 text-slate-400" />, label: 'For people with AI experience' },
          { icon: <BarChart2 className="w-4 h-4 text-slate-400" />, label: 'Intermediate level' },
          { icon: <Infinity className="w-4 h-4 text-slate-400" />, label: 'Lifetime access' },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-3 text-sm text-slate-600">
            {item.icon}
            {item.label}
          </div>
        ))}
      </div>

      {/* Deliverables */}
      <div className="px-6 py-4">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">What You'll Receive</p>
        {[
          'Brief context template',
          'Stage task template (3 scenario versions)',
          'Own decision tree',
          'Route dispatch map',
          'Debug log',
          'Prompt asset library framework',
          'Retrospective template',
        ].map((item) => (
          <div key={item} className="flex items-start gap-2 mb-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0 mt-0.5" />
            <span className="text-xs text-slate-600">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function WayneCourseLeadershipEn() {
  const course = wayneCourses.find((c) => c.id === 'ai-leadership-en')!;
  const totalLessons = course.modules.reduce((a, m) => a + m.lessons.length, 0);

  return (
    <>
      <SEOHead
        title="AI Leadership: Six Core Skills | Wayne's Plans"
        description="Upgrade from AI user to AI team leader. Six trainable skills: Brief, Stage, Own, Route, Debug, Distill. First 97 students free."
      />

      {/* Breadcrumb */}
      <div className="flex items-center gap-1 text-xs text-slate-400 mb-8">
        <Link to="/wayne" className="hover:text-slate-600">Wayne</Link>
        <ChevronRight className="w-3 h-3" />
        <Link to="/wayne/courses" className="hover:text-slate-600">Courses</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-slate-600">AI Leadership</span>
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
              <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200">
                <Flame className="w-3 h-3" /> First 97 Free
              </span>
              <span className="px-3 py-1 bg-slate-100 text-slate-500 text-xs rounded-full line-through">
                Regular price $199
              </span>
              <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-full border border-indigo-200">
                {SLOTS_LEFT} spots left
              </span>
              <Link
                to="/wayne/courses/ai-leadership/zh"
                className="px-3 py-1 bg-slate-50 text-slate-500 text-xs rounded-full border border-slate-200 hover:text-slate-700 transition-colors"
              >
                中文版 →
              </Link>
            </div>

            <h1 className="text-4xl font-bold text-slate-900 leading-tight mb-3">
              AI Leadership:<br className="sm:hidden" /> Six Core Skills
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed mb-6">
              Upgrade from AI user to AI team leader — systematically.
              The formula: <span className="font-semibold text-slate-800">Goal = Team + Meeting</span>.
            </p>

            <div className="flex items-center gap-3">
              <img src={wayneAvatar} alt="Wayne" className="w-8 h-8 rounded-full object-cover" />
              <span className="text-sm text-slate-600">
                by <span className="font-semibold text-slate-800">Wayne</span>
                <span className="text-slate-400 mx-2">·</span>
                Published 2026-05-21
              </span>
            </div>

            {/* Mobile CTA */}
            <div className="lg:hidden mt-6 p-5 bg-emerald-50 border border-emerald-200 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-bold text-emerald-800 text-lg">Free now</p>
                  <p className="text-xs text-slate-500">Regular $199 · First 97 free</p>
                </div>
                <span className="text-sm font-bold text-emerald-700 bg-white px-3 py-1.5 rounded-lg border border-emerald-200">
                  {SLOTS_LEFT} left
                </span>
              </div>
              <a
                href={ENROLL_HREF}
                className="flex items-center justify-center gap-2 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-3 rounded-xl transition-colors text-sm"
              >
                Apply for Free <ArrowRight className="w-4 h-4" />
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
              Why Most People Get Weaker at AI Over Time
            </h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                I know a lot of people who were blown away when they first tried ChatGPT. Three months later,
                they were using AI to write reports, summarize documents, and draft proposals.
                A year later — the exact same things. They never got stronger.
              </p>
              <p>
                In that same year, other people completed projects they couldn't have tackled before.
                They led teams they couldn't have managed before. They didn't use more AI tools.
                They built a different kind of work system.
              </p>
              <p className="font-medium text-slate-800">
                The gap isn't intelligence, resources, or how often they use AI.
                It's whether they treat AI like a tool — or like a team.
                Tool users get one-shot outputs. Team leaders get compounding systems.
              </p>
            </div>
          </motion.div>

          {/* ── Formula ── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.07 }}
            className="bg-indigo-50 border border-indigo-200 rounded-2xl p-7 text-center"
          >
            <p className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-4">The Core Formula</p>
            <p className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Goal = Team + Meeting
            </p>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="bg-white rounded-xl p-3 border border-indigo-100">
                <p className="font-bold text-indigo-700 mb-1">Goal</p>
                <p className="text-xs text-slate-500">The outcome you want to achieve</p>
              </div>
              <div className="bg-white rounded-xl p-3 border border-indigo-100">
                <p className="font-bold text-indigo-700 mb-1">Team</p>
                <p className="text-xs text-slate-500">People + AI + tools, configured right</p>
              </div>
              <div className="bg-white rounded-xl p-3 border border-indigo-100">
                <p className="font-bold text-indigo-700 mb-1">Meeting</p>
                <p className="text-xs text-slate-500">Staging, owning, and reflecting</p>
              </div>
            </div>
            <p className="text-sm text-slate-500 mt-4">
              Most people only optimize "Team" (which tool to pick) and ignore "Meeting."
              <br />
              But the quality of the coordination process is what determines outcomes.
            </p>
          </motion.div>

          {/* ── Six skills ── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.09 }}
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Six Core Skills</h2>
            <p className="text-slate-500 text-sm mb-6">Each can be trained independently. Together, they form a complete AI leadership system.</p>
            <div className="space-y-4">
              {SIX_SKILLS.map((skill) => (
                <div key={skill.num} className="bg-white border border-slate-200 rounded-xl p-5 flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-9 h-9 bg-indigo-50 rounded-lg flex items-center justify-center">
                      {skill.icon}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-indigo-400">{skill.num}</span>
                      <span className="font-bold text-slate-900">{skill.name}</span>
                      <span className="text-sm text-slate-500">— {skill.tagline}</span>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">{skill.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── What you'll get ── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-5">What You'll Walk Away With</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
              {course.learningOutcomes.map((o) => (
                <div key={o} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700">{o}</span>
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
                    "You're already using ChatGPT or Claude, but feel like you've plateaued",
                    'You need AI for complex projects, not just simple Q&A',
                    'You manage or coordinate a human-AI mixed team',
                    "You want to systematize your AI practice instead of relying on intuition",
                    "When AI goes wrong, you don't know the root cause",
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
                    "You've never used an AI tool (try it for 3–4 weeks first)",
                    'You just need a tutorial for a specific tool (e.g. "how to use Cursor")',
                    'You want a course for your kids to learn AI (see AI Family Starter Pack)',
                    'You need live synchronous instruction',
                  ].map((i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-500">
                      <span className="text-slate-400 flex-shrink-0">—</span> {i}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* ── Instructor ── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.13 }}
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-5">About Wayne</h2>
            <div className="bg-white border border-slate-200 rounded-2xl p-6 flex gap-5">
              <img
                src={wayneAvatar}
                alt="Wayne"
                className="w-16 h-16 rounded-full object-cover flex-shrink-0 border-2 border-slate-100"
              />
              <div>
                <p className="font-bold text-slate-900 text-lg mb-1">Wayne</p>
                <p className="text-sm text-indigo-600 font-medium mb-3">Software Engineer · AI Practitioner · Dad</p>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  Wayne uses AI daily to lead teams and build products. He also teaches his 8-year-old daughter Luna AI and CTF on weekends. He documents every mistake, every systematic improvement, and every effective human-AI collaboration pattern at wayne.bunnyuniverse.com. This course is his year of real-world experience distilled into a teachable framework.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Context Engineering', 'Task Decomposition', 'AI Team Leadership', 'CTF', 'Parent-Child AI Education'].map((t) => (
                    <span key={t} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded-md">{t}</span>
                  ))}
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
              {faqs.map((f) => (
                <FaqItem key={f.q} q={f.q} a={f.a} />
              ))}
            </div>
            <p className="text-sm text-slate-500">
              Other questions?{' '}
              <a href="mailto:wayne@bunnyuniverse.com?subject=AI Leadership Course Question" className="text-indigo-600 hover:text-indigo-800 font-medium">
                Email Wayne directly
              </a>
              .
            </p>
          </motion.div>

          {/* ── Bottom CTA ── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="bg-slate-900 rounded-2xl px-8 py-10 text-center text-white"
          >
            <p className="text-3xl mb-3">🚀</p>
            <h2 className="text-2xl font-bold mb-2">First 97 Students — Free</h2>
            <p className="text-slate-300 mb-1 text-sm">Regular price $199 · {SLOTS_LEFT} free spots remaining</p>
            <p className="text-slate-400 text-xs mb-6">Spots disappear without notice</p>
            <a
              href={ENROLL_HREF}
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 py-3.5 rounded-xl transition-colors text-sm"
            >
              Apply for Free
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
          <EnrollSidebar totalLessons={totalLessons} />
          <div className="p-4 bg-white border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">Tools Used in This Course</p>
            <div className="flex flex-wrap gap-1.5">
              {course.tools.map((t) => (
                <span key={t} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded-md">{t}</span>
              ))}
            </div>
          </div>
          <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-xl">
            <p className="text-xs font-semibold text-indigo-700 mb-2 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" /> Related Reading
            </p>
            <Link
              to="/wayne/insights/21"
              className="text-xs text-indigo-600 hover:text-indigo-800 leading-relaxed"
            >
              Why Most People Get Weaker at AI — While a Few Get Stronger →
            </Link>
          </div>
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-semibold text-slate-500 mb-2">Also available</p>
            <Link
              to="/wayne/courses/ai-leadership/zh"
              className="text-xs text-slate-600 hover:text-slate-800 leading-relaxed"
            >
              中文版：AI 领导力六项核心能力 →
            </Link>
          </div>
        </div>

      </div>

      {/* Mobile sticky bottom bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 px-4 py-3 flex items-center justify-between gap-3 shadow-lg">
        <div>
          <p className="text-xs text-slate-400 line-through">$199</p>
          <p className="font-bold text-emerald-700 text-sm">
            Free <span className="text-xs font-normal text-slate-400">{SLOTS_LEFT} left</span>
          </p>
        </div>
        <a
          href={ENROLL_HREF}
          className="flex-1 max-w-xs flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2.5 rounded-xl transition-colors text-sm"
        >
          Apply for Free <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </>
  );
}
