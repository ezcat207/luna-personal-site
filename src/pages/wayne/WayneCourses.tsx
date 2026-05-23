import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ChevronDown,
  ChevronUp,
  BookOpen,
  Video,
  Zap,
  CheckCircle2,
  Lock,
  ArrowRight,
  Users,
  Clock,
  BarChart2,
  Flame,
} from 'lucide-react';
import { SEOHead } from '../../components/SEOHead';
import { wayneCourses, type CourseModule } from '../../data/wayneCourses';

const lessonTypeIcon = {
  article: <BookOpen className="w-3.5 h-3.5 text-slate-400" />,
  video: <Video className="w-3.5 h-3.5 text-indigo-400" />,
  practice: <Zap className="w-3.5 h-3.5 text-amber-400" />,
};

const lessonTypeLabel = {
  article: 'Read',
  video: 'Watch',
  practice: 'Practice',
};

function ModuleCard({ mod, defaultOpen = false }: { mod: CourseModule; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-4 bg-white hover:bg-slate-50 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <span className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center justify-center flex-shrink-0">
            {mod.number}
          </span>
          <div>
            <p className="font-semibold text-slate-800 text-sm">{mod.title}</p>
            <p className="text-xs text-slate-500 mt-0.5">{mod.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 ml-4 flex-shrink-0">
          <span className="text-xs text-slate-400">{mod.lessons.length} lessons</span>
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
            <div key={i} className="flex items-center gap-3 px-5 py-3 bg-slate-50/50">
              <span className="flex-shrink-0">{lessonTypeIcon[lesson.type]}</span>
              <span className="text-sm text-slate-700 flex-1">{lesson.title}</span>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-xs text-slate-400">{lessonTypeLabel[lesson.type]}</span>
                {lesson.duration && (
                  <span className="text-xs text-slate-400 border-l border-slate-200 pl-2">
                    {lesson.duration}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function WayneCourses() {
  const freeCourse = wayneCourses.find((c) => c.tier === 'free')!;
  const paidCourses = wayneCourses.filter((c) => c.tier === 'paid');

  return (
    <>
      <SEOHead
        title="Courses — Learn AI Together | Wayne's Plans"
        description="Free and paid AI courses for parent-child families. Learn ChatGPT, Cursor, SEO, and CTF — together. Wayne teaches, Luna demonstrates."
      />

      <div className="space-y-16">
        {/* ── Hero ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center pt-4 pb-2"
        >
          <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-full mb-4 tracking-wide uppercase">
            Courses
          </span>
          <h1 className="text-4xl font-bold text-slate-900 mb-4 leading-tight">
            Learn AI Together,<br />Parent &amp; Child
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            The first AI curriculum designed for families who want to learn <em>side by side</em> —
            not just ship the kids off to class. Wayne designs the plan. Luna proves it works.
          </p>
        </motion.div>

        {/* ── Why Different ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-5"
        >
          {[
            {
              icon: <Users className="w-5 h-5 text-indigo-600" />,
              title: 'Parent is a co-learner',
              body: 'Most courses exclude parents. Here, you\'re part of the team — not just the credit card.',
            },
            {
              icon: <CheckCircle2 className="w-5 h-5 text-indigo-600" />,
              title: 'Real results, not theory',
              body: 'Every module maps to something Luna has actually built. You see the output, not just the slides.',
            },
            {
              icon: <Zap className="w-5 h-5 text-indigo-600" />,
              title: 'Tools kids actually use',
              body: 'ChatGPT, Cursor, Copilot — not toy environments. The same stack professionals use.',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white border border-slate-200 rounded-xl p-5"
            >
              <div className="w-9 h-9 bg-indigo-50 rounded-lg flex items-center justify-center mb-3">
                {item.icon}
              </div>
              <p className="font-semibold text-slate-800 text-sm mb-1">{item.title}</p>
              <p className="text-sm text-slate-500">{item.body}</p>
            </div>
          ))}
        </motion.div>

        {/* ── Free Course ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="flex items-center gap-3 mb-5">
            <h2 className="text-2xl font-bold text-slate-900">Free Course</h2>
            <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">
              FREE FOREVER
            </span>
          </div>

          <div className="bg-white border-2 border-indigo-200 rounded-2xl overflow-hidden shadow-sm">
            {/* Course header */}
            <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 px-8 py-7 text-white">
              <h3 className="text-2xl font-bold mb-1">{freeCourse.title}</h3>
              <p className="text-indigo-100 text-sm mb-5">{freeCourse.subtitle}</p>
              <div className="flex flex-wrap gap-4 text-xs">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 opacity-80" />
                  {freeCourse.duration}
                </span>
                <span className="flex items-center gap-1.5">
                  <BarChart2 className="w-3.5 h-3.5 opacity-80" />
                  {freeCourse.level}
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 opacity-80" />
                  For parents + kids (ages 7+)
                </span>
              </div>
            </div>

            <div className="p-8 grid grid-cols-1 lg:grid-cols-5 gap-8">
              {/* Left: outcomes + tools + CTA */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-3">
                    What you'll learn
                  </h4>
                  <ul className="space-y-2.5">
                    {freeCourse.learningOutcomes.map((outcome) => (
                      <li key={outcome} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-700">{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-3">
                    Tools covered
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {freeCourse.tools.map((tool) => (
                      <span
                        key={tool}
                        className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs rounded-md font-medium"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href="/wayne/insights"
                    className="flex items-center justify-center gap-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm px-5 py-3 rounded-xl transition-colors"
                  >
                    Start Learning — It's Free
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <p className="text-xs text-slate-400 text-center mt-2">
                    No account required. Content published weekly.
                  </p>
                </div>
              </div>

              {/* Right: curriculum */}
              <div className="lg:col-span-3">
                <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-3">
                  Curriculum ({freeCourse.modules.length} modules)
                </h4>
                <div className="space-y-2">
                  {freeCourse.modules.map((mod, i) => (
                    <ModuleCard key={mod.number} mod={mod} defaultOpen={i === 0} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Limited Free Course: AI Leadership ── */}
        {(() => {
          const leadership = wayneCourses.find((c) => c.id === 'ai-leadership-en')!;
          return (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.13 }}
            >
              <div className="flex items-center gap-3 mb-5">
                <h2 className="text-2xl font-bold text-slate-900">Limited Free</h2>
                <span className="flex items-center gap-1 px-2.5 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">
                  <Flame className="w-3 h-3" /> First 97 Free
                </span>
              </div>
              <Link
                to="/wayne/courses/ai-leadership"
                className="block bg-white border-2 border-emerald-200 rounded-2xl overflow-hidden hover:border-emerald-400 hover:shadow-md transition-all"
              >
                <div className="bg-gradient-to-r from-slate-900 to-indigo-950 px-7 py-6 text-white">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-bold text-emerald-400 mb-2 uppercase tracking-wide">Intermediate · 6 weeks</p>
                      <h3 className="text-xl font-bold mb-1">{leadership.title}</h3>
                      <p className="text-slate-300 text-sm">{leadership.subtitle}</p>
                    </div>
                    <div className="flex-shrink-0 text-right">
                      <p className="text-2xl font-bold text-emerald-400">Free</p>
                      <p className="text-xs text-slate-400 line-through mt-0.5">${leadership.price}</p>
                    </div>
                  </div>
                </div>
                <div className="px-7 py-5 flex items-center justify-between">
                  <div className="space-y-1">
                    {leadership.learningOutcomes.slice(0, 3).map((o) => (
                      <div key={o} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span className="text-xs text-slate-600">{o}</span>
                      </div>
                    ))}
                    <p className="text-xs text-slate-400 pl-5">+ {leadership.learningOutcomes.length - 3} more outcomes</p>
                  </div>
                  <div className="flex-shrink-0 ml-6 text-indigo-600 flex items-center gap-1 font-semibold text-sm">
                    See Course <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
              <p className="text-xs text-slate-400 mt-2 pl-1">
                Also available:{' '}
                <Link to="/wayne/courses/ai-leadership/zh" className="text-slate-500 hover:text-slate-700 underline underline-offset-2">
                  中文版 →
                </Link>
              </p>
            </motion.div>
          );
        })()}

        {/* ── Paid / Coming Soon ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
        >
          <div className="flex items-center gap-3 mb-5">
            <h2 className="text-2xl font-bold text-slate-900">Coming Soon</h2>
            <span className="px-2.5 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-full">
              WAITLIST OPEN
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {paidCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden"
              >
                {/* Course card header */}
                <div className="px-6 py-5 border-b border-slate-100">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg leading-snug">
                        {course.title}
                      </h3>
                      <p className="text-sm text-slate-500 mt-0.5">{course.subtitle}</p>
                    </div>
                    <div className="flex-shrink-0 text-right">
                      <span className="text-xl font-bold text-slate-900">${course.price}</span>
                      <p className="text-xs text-slate-400">one-time</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {course.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="px-6 py-5">
                  <p className="text-sm text-slate-600 mb-4">{course.description}</p>

                  <div className="space-y-2 mb-5">
                    {course.learningOutcomes.slice(0, 3).map((outcome) => (
                      <div key={outcome} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-slate-300 flex-shrink-0 mt-0.5" />
                        <span className="text-xs text-slate-500">{outcome}</span>
                      </div>
                    ))}
                    {course.learningOutcomes.length > 3 && (
                      <p className="text-xs text-slate-400 pl-5">
                        + {course.learningOutcomes.length - 3} more outcomes
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-3 mb-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {course.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <BarChart2 className="w-3.5 h-3.5" />
                      {course.level}
                    </span>
                  </div>

                  {course.id === 'ctf-intro' ? (
                    <Link
                      to="/wayne/courses/ctf"
                      className="flex items-center justify-center gap-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm px-4 py-2.5 rounded-xl transition-colors"
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                      See Full Course Details
                    </Link>
                  ) : course.id === 'ai-visuals' ? (
                    <Link
                      to="/wayne/courses/ai-visuals"
                      className="flex items-center justify-center gap-2 w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold text-sm px-4 py-2.5 rounded-xl transition-colors"
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                      See Full Course Details
                    </Link>
                  ) : (
                    <a
                      href={`mailto:wayne@bunnyuniverse.com?subject=Waitlist: ${encodeURIComponent(course.title)}&body=Hi Wayne, I'd like to join the waitlist for "${course.title}". My child is __ years old.`}
                      className="flex items-center justify-center gap-2 w-full border border-indigo-300 text-indigo-700 hover:bg-indigo-50 font-semibold text-sm px-4 py-2.5 rounded-xl transition-colors"
                    >
                      <Lock className="w-3.5 h-3.5" />
                      Join Waitlist — Early Bird ${Math.round((course.price ?? 0) * 0.8)}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="bg-indigo-600 rounded-2xl px-8 py-10 text-center text-white"
        >
          <h2 className="text-2xl font-bold mb-3">Not sure where to start?</h2>
          <p className="text-indigo-100 mb-6 max-w-lg mx-auto">
            Start with the free course. Read Wayne's weekly teaching plans to see the thinking
            behind each lesson. Watch Luna's results to stay motivated.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/wayne/insights"
              className="inline-flex items-center justify-center gap-2 bg-white text-indigo-700 font-semibold text-sm px-6 py-2.5 rounded-xl hover:bg-indigo-50 transition-colors"
            >
              Read Wayne's Insights
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href={
                import.meta.env.PROD
                  ? 'https://luna.bunnyuniverse.com'
                  : '/?persona=luna'
              }
              className="inline-flex items-center justify-center gap-2 bg-indigo-500 text-white font-semibold text-sm px-6 py-2.5 rounded-xl hover:bg-indigo-400 transition-colors"
            >
              See Luna's Results
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </>
  );
}
