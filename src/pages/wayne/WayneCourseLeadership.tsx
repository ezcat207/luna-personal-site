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
  'mailto:wayne@bunnyuniverse.com?subject=AI领导力课程免费入学&body=Hi Wayne，我想申请 AI 领导力课程的免费名额。\n\n我的背景：\n我目前的 AI 使用方式：\n我想解决的问题：';

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
    name: '管理',
    tagline: '上下文就是控制权',
    desc: '什么信息该给 AI，什么信息不该给？长期信息 vs 当前任务，原文保留 vs 压缩摘要——上下文管理能力决定你能从 AI 拿到多高质量的输出。',
  },
  {
    num: '02',
    icon: <GitBranch className="w-5 h-5 text-indigo-600" />,
    name: '拆解',
    tagline: '不拆解，复杂需求必然失败',
    desc: '一个复杂需求不能直接丢给 AI。你要知道先让它理解背景还是先让它列问题，先让它给方案还是先让它做局部执行，什么时候检查，什么时候回滚。',
  },
  {
    num: '03',
    icon: <BrainCircuit className="w-5 h-5 text-indigo-600" />,
    name: '判断',
    tagline: '设计人机分工，不是盲目外包',
    desc: 'AI 适合整理资料、生成初稿、提取结构、批量改写。但方向判断、关键取舍、风险承担，仍然要有人负责。真正会用 AI 的人会设计人和 AI 的配合方式。',
  },
  {
    num: '04',
    icon: <Route className="w-5 h-5 text-indigo-600" />,
    name: '路由',
    tagline: '这一步该由谁来做',
    desc: '问题不只是"哪个模型最好"，更重要的是"这一步该由谁来做"。长上下文模型、搜索工具、代码工具、结构化输出——每类任务有对应的最佳路由。',
  },
  {
    num: '05',
    icon: <Stethoscope className="w-5 h-5 text-indigo-600" />,
    name: '诊断',
    tagline: '出错不是重试，是追因',
    desc: '只会重试，每次都像重新摇骰子。AI 出错有六类根本原因：上下文、指令、拆解、模型能力、工具调用、评估标准。能诊断，系统才会越来越稳定。',
  },
  {
    num: '06',
    icon: <Layers className="w-5 h-5 text-indigo-600" />,
    name: '沉淀',
    tagline: '让每次成功变成下次的起点',
    desc: '一个好 Prompt、一套检查清单、一个项目规范、一次有效的人机协作流程，都不应该只停留在某次对话里。普通人每次重新开始，高手越用越强。',
  },
];

const faqs = [
  {
    q: '课程是中文还是英文？',
    a: '全程中文。课程专门为中文语境下使用 AI 工作、带团队的人设计。',
  },
  {
    q: '"前 97 人免费"是什么意思？',
    a: '课程正式定价 $199。前 97 位报名的学员可以完全免费入学，作为第一批内测用户。之后正常收费。免费名额用完即止，不另行通知。',
  },
  {
    q: '为什么免费？有什么条件吗？',
    a: '课程刚刚发布，需要真实用户的反馈来完善内容。唯一的"条件"是：如果你发现课程有问题或者有改进建议，请直接告诉 Wayne。没有强制要求，没有强制分享。',
  },
  {
    q: '课程有多难？我需要什么基础？',
    a: '需要已经在用 AI（ChatGPT/Claude 等）至少一个月。不需要编程基础，不需要技术背景。课程面向想用 AI 做更复杂的事情、或者需要带 AI 团队的人。',
  },
  {
    q: '是异步课程还是有直播？',
    a: '完全异步，自己掌握节奏。内容按周发布，你也可以提前看。第一批学员有 Wayne 的直接邮件答疑权限。',
  },
  {
    q: '学完后我会得到什么？',
    a: '7 个可直接使用的模板/工具（上下文管理模板、任务拆解模板、人机分工决策树、工具路由地图、诊断记录本、Prompt 资产库、复盘框架）。还有一套可以复用到每个新项目的工作系统。',
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
          {num === 0 ? '序' : num}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-slate-800 text-sm">{mod.title}</p>
          <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{mod.description}</p>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0 ml-2 text-xs text-slate-400">
          <span className="hidden sm:block">
            {mod.lessons.length} 节课{mins > 0 ? ` · ~${mins}m` : ''}
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
          <span className="font-bold text-sm">前 97 人限免</span>
        </div>
        <p className="text-xs text-emerald-100">正式定价 $199 · 现在免费</p>
      </div>

      {/* Slot counter */}
      <div className="px-6 py-4 border-b border-slate-100">
        <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
          <span>已占用 {SLOTS_TAKEN} 个名额</span>
          <span className="font-bold text-emerald-600">剩余 {SLOTS_LEFT} 个</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2">
          <div
            className="bg-emerald-500 h-2 rounded-full transition-all"
            style={{ width: `${Math.max(pct, 2)}%` }}
          />
        </div>
        <p className="text-xs text-slate-400 mt-1.5">{FREE_SLOTS} 个免费名额 · 用完停止</p>
      </div>

      {/* CTA */}
      <div className="px-6 py-4 border-b border-slate-100">
        <a
          href={ENROLL_HREF}
          className="flex items-center justify-center gap-2 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-3.5 rounded-xl transition-colors text-sm"
        >
          免费申请入学
          <ArrowRight className="w-4 h-4" />
        </a>
        <p className="text-xs text-slate-400 text-center mt-2">发送邮件，Wayne 24h 内回复确认</p>
      </div>

      {/* Stats */}
      <div className="px-6 py-4 border-b border-slate-100 space-y-3">
        {[
          { icon: <Clock className="w-4 h-4 text-slate-400" />, label: '6 周 · 异步自学' },
          { icon: <BookOpen className="w-4 h-4 text-slate-400" />, label: `${totalLessons} 节课` },
          { icon: <Users className="w-4 h-4 text-slate-400" />, label: '适合有 AI 使用经验的人' },
          { icon: <BarChart2 className="w-4 h-4 text-slate-400" />, label: '进阶级别' },
          { icon: <Infinity className="w-4 h-4 text-slate-400" />, label: '永久访问' },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-3 text-sm text-slate-600">
            {item.icon}
            {item.label}
          </div>
        ))}
      </div>

      {/* Deliverables */}
      <div className="px-6 py-4">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">课程交付物</p>
        {[
          '上下文管理模板',
          '任务拆解模板（3 个场景版本）',
          '人机分工决策树',
          '工具路由地图',
          '诊断记录本',
          'Prompt 资产库框架',
          '项目复盘模板',
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

export default function WayneCourseLeadership() {
  const course = wayneCourses.find((c) => c.id === 'ai-leadership')!;
  const totalLessons = course.modules.reduce((a, m) => a + m.lessons.length, 0);

  return (
    <>
      <SEOHead
        title={'AI 领导力：带人带 AI 的六项核心能力 | Wayne\'s Plans'}
        description={'从"会用 AI"升级为"用 AI 带团队"的系统方法。六项核心能力：管理、拆解、判断、路由、诊断、沉淀。前 97 人限免。'}
      />

      {/* Breadcrumb */}
      <div className="flex items-center gap-1 text-xs text-slate-400 mb-8">
        <Link to="/wayne" className="hover:text-slate-600">Wayne</Link>
        <ChevronRight className="w-3 h-3" />
        <Link to="/wayne/courses" className="hover:text-slate-600">Courses</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-slate-600">AI 领导力</span>
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
                <Flame className="w-3 h-3" /> 前 97 人限免
              </span>
              <span className="px-3 py-1 bg-slate-100 text-slate-500 text-xs rounded-full line-through">
                正式定价 $199
              </span>
              <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-full border border-indigo-200">
                剩余 {SLOTS_LEFT} 个名额
              </span>
            </div>

            <h1 className="text-4xl font-bold text-slate-900 leading-tight mb-3">
              AI 领导力：<br className="sm:hidden" />带人带 AI 的六项核心能力
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed mb-6">
              从"会用 AI"升级为"用 AI 带团队"的系统方法。
              公式：<span className="font-semibold text-slate-800">目标 = 团队 + 开会</span>。
            </p>

            <div className="flex items-center gap-3">
              <img src={wayneAvatar} alt="Wayne" className="w-8 h-8 rounded-full object-cover" />
              <span className="text-sm text-slate-600">
                by <span className="font-semibold text-slate-800">Wayne</span>
                <span className="text-slate-400 mx-2">·</span>
                发布于 2026-05-21
              </span>
            </div>

            {/* Mobile CTA */}
            <div className="lg:hidden mt-6 p-5 bg-emerald-50 border border-emerald-200 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-bold text-emerald-800 text-lg">现在免费</p>
                  <p className="text-xs text-slate-500">正式定价 $199 · 前 97 人限免</p>
                </div>
                <span className="text-sm font-bold text-emerald-700 bg-white px-3 py-1.5 rounded-lg border border-emerald-200">
                  剩余 {SLOTS_LEFT}
                </span>
              </div>
              <a
                href={ENROLL_HREF}
                className="flex items-center justify-center gap-2 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-3 rounded-xl transition-colors text-sm"
              >
                免费申请入学 <ArrowRight className="w-4 h-4" />
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
              为什么大多数人用 AI 越用越弱
            </h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                我认识很多人，第一次用 ChatGPT 的时候兴奋得不行。三个月后，他们还在用 AI
                写报告、整理资料、生成方案。一年后，同样的事。他们没有变得更强。AI
                没有让他们完成更难的项目，没有让他们的团队能力提升。他们只是有了一个更快的打字员。
              </p>
              <p>
                同样的一年里，另一些人用 AI 完成了以前完成不了的项目，带出了以前带不动的团队。他们不是用了更多
                AI 工具，而是形成了一套不同的工作系统。
              </p>
              <p className="font-medium text-slate-800">
                这两类人的差距不在工具，在于有没有把 AI 当成团队来管。
                用工具的人每次对话都是一次性的。用团队的人每次项目都在让系统变好。
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
            <p className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-4">核心公式</p>
            <p className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              目标 = 团队 + 开会
            </p>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="bg-white rounded-xl p-3 border border-indigo-100">
                <p className="font-bold text-indigo-700 mb-1">目标</p>
                <p className="text-xs text-slate-500">你想达成的结果</p>
              </div>
              <div className="bg-white rounded-xl p-3 border border-indigo-100">
                <p className="font-bold text-indigo-700 mb-1">团队</p>
                <p className="text-xs text-slate-500">人 + AI + 工具的配置</p>
              </div>
              <div className="bg-white rounded-xl p-3 border border-indigo-100">
                <p className="font-bold text-indigo-700 mb-1">开会</p>
                <p className="text-xs text-slate-500">拆解、分工、复盘的协调过程</p>
              </div>
            </div>
            <p className="text-sm text-slate-500 mt-4">
              大多数人只优化"团队"（选哪个工具），却忽视了"开会"（协调过程）。
              <br />但协调过程的质量，才是结果质量的决定因素。
            </p>
          </motion.div>

          {/* ── Six skills ── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.09 }}
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-2">六项核心能力</h2>
            <p className="text-slate-500 text-sm mb-6">每一项都可以独立训练，六项加起来构成完整的 AI 领导力系统。</p>
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
            <h2 className="text-2xl font-bold text-slate-900 mb-5">学完你将拥有</h2>
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
            <h2 className="text-2xl font-bold text-slate-900 mb-2">课程大纲</h2>
            <p className="text-sm text-slate-500 mb-5">
              {course.modules.length} 个模块 · {totalLessons} 节课 · 异步自学
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
            <h2 className="text-2xl font-bold text-slate-900 mb-5">这门课适合谁</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
                <p className="font-bold text-emerald-800 mb-3 text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> 适合你，如果…
                </p>
                <ul className="space-y-2">
                  {[
                    '你已经在用 ChatGPT / Claude，但感觉遇到了瓶颈',
                    '你需要用 AI 完成复杂项目，不只是简单问答',
                    '你需要带一个人机混合的团队',
                    '你想把 AI 使用经验系统化，而不是靠直觉摸索',
                    '你每次用 AI 出错都不知道根本原因在哪里',
                  ].map((i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-emerald-900">
                      <span className="text-emerald-500 font-bold flex-shrink-0">✓</span> {i}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                <p className="font-bold text-slate-600 mb-3 text-sm">暂时不适合，如果…</p>
                <ul className="space-y-2">
                  {[
                    '你从来没用过 AI 工具（建议先用 3-4 周）',
                    '你只需要一个具体工具的使用教程（如"怎么用 Cursor"）',
                    '你想要带小孩学 AI（请看 AI Family Starter Pack）',
                    '你需要现场直播授课的形式',
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
            <h2 className="text-2xl font-bold text-slate-900 mb-5">关于 Wayne</h2>
            <div className="bg-white border border-slate-200 rounded-2xl p-6 flex gap-5">
              <img
                src={wayneAvatar}
                alt="Wayne"
                className="w-16 h-16 rounded-full object-cover flex-shrink-0 border-2 border-slate-100"
              />
              <div>
                <p className="font-bold text-slate-900 text-lg mb-1">Wayne</p>
                <p className="text-sm text-indigo-600 font-medium mb-3">软件工程师 · AI 实践者 · 爸爸</p>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  Wayne 在工作中用 AI 带团队，同时在家里教 8 岁的 Luna 学 AI 和 CTF。他记录每一次出错、每一次系统改善、每一次有效的人机协作方式，发布在 wayne.bunnyuniverse.com。这门课是他把一年的真实经验提炼成可教授框架的结果。
                </p>
                <div className="flex flex-wrap gap-2">
                  {['上下文工程', '任务拆解', 'AI 团队协作', 'CTF', '亲子 AI 教育'].map((t) => (
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
            <h2 className="text-2xl font-bold text-slate-900 mb-2">常见问题</h2>
            <div className="divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white px-6 mb-4">
              {faqs.map((f) => (
                <FaqItem key={f.q} q={f.q} a={f.a} />
              ))}
            </div>
            <p className="text-sm text-slate-500">
              其他问题？{' '}
              <a href="mailto:wayne@bunnyuniverse.com?subject=AI领导力课程问题" className="text-indigo-600 hover:text-indigo-800 font-medium">
                直接给 Wayne 发邮件
              </a>
              。
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
            <h2 className="text-2xl font-bold mb-2">前 97 人，现在免费</h2>
            <p className="text-slate-300 mb-1 text-sm">正式定价 $199 · 当前剩余 {SLOTS_LEFT} 个免费名额</p>
            <p className="text-slate-400 text-xs mb-6">名额用完即止，不另行通知</p>
            <a
              href={ENROLL_HREF}
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 py-3.5 rounded-xl transition-colors text-sm"
            >
              免费申请入学
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>

          {/* Back */}
          <div className="pb-4">
            <Link to="/wayne/courses" className="text-sm text-slate-400 hover:text-slate-700 flex items-center gap-1 transition-colors">
              ← 所有课程
            </Link>
          </div>
        </div>

        {/* ══ RIGHT: Sticky sidebar ══ */}
        <div className="hidden lg:block lg:sticky lg:top-20 space-y-4">
          <EnrollSidebar totalLessons={totalLessons} />
          <div className="p-4 bg-white border border-slate-200 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">课程使用的工具</p>
            <div className="flex flex-wrap gap-1.5">
              {course.tools.map((t) => (
                <span key={t} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded-md">{t}</span>
              ))}
            </div>
          </div>
          <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-xl">
            <p className="text-xs font-semibold text-indigo-700 mb-2 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" /> 相关阅读
            </p>
            <Link
              to="/wayne/insights/21"
              className="text-xs text-indigo-600 hover:text-indigo-800 leading-relaxed"
            >
              为什么你用 AI 越用越弱，而少数人越用越强 →
            </Link>
          </div>
        </div>

      </div>

      {/* Mobile sticky bottom bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 px-4 py-3 flex items-center justify-between gap-3 shadow-lg">
        <div>
          <p className="text-xs text-slate-400 line-through">$199</p>
          <p className="font-bold text-emerald-700 text-sm">
            免费 <span className="text-xs font-normal text-slate-400">剩余 {SLOTS_LEFT}</span>
          </p>
        </div>
        <a
          href={ENROLL_HREF}
          className="flex-1 max-w-xs flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2.5 rounded-xl transition-colors text-sm"
        >
          免费申请入学 <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </>
  );
}
