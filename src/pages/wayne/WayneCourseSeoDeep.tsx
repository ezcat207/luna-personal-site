import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BookOpen,
  ChevronRight,
  Clock,
  CheckCircle2,
  Star,
} from 'lucide-react';
import { SEOHead } from '../../components/SEOHead';
import { SEO_DEEP_MODULES } from '../../data/seoDeepModules';

// ── Reusable Prime Number Free callout (also imported by WayneCourseSeo) ────
export function PrimeNumberFreeBadge() {
  return (
    <div className="flex items-start gap-4 border border-violet-200 bg-violet-50 rounded-2xl p-5">
      <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center flex-shrink-0 text-lg select-none">
        🔢
      </div>
      <div>
        <p className="font-bold text-violet-900 mb-1">Prime Number Free</p>
        <p className="text-sm text-violet-700 leading-relaxed">
          凡购买过我们任何<strong>素数定价</strong>产品的用户
          （$2、$3、$5、$7、$11、$13、$17…），本课程永久免费。
        </p>
        <p className="text-xs text-violet-400 mt-1.5">
          Honor system — 直接开始学习即可，无需验证。
        </p>
      </div>
    </div>
  );
}

const MODULE_COLORS = [
  'bg-indigo-50 text-indigo-700 border-indigo-200',
  'bg-sky-50 text-sky-700 border-sky-200',
  'bg-teal-50 text-teal-700 border-teal-200',
  'bg-emerald-50 text-emerald-700 border-emerald-200',
  'bg-amber-50 text-amber-700 border-amber-200',
  'bg-orange-50 text-orange-700 border-orange-200',
  'bg-rose-50 text-rose-700 border-rose-200',
];

export default function WayneCourseSeoDeep() {
  const totalChapters = SEO_DEEP_MODULES.reduce((s, m) => s + m.chapters.length, 0);

  return (
    <>
      <SEOHead
        title="SEO深度课程：完整阅读版（28章）— Wayne's Courses"
        description="7模块28章，完整叙事式SEO深度学习课。每章含开篇故事、真实案例研究、交互式行动清单。适合从零开始系统学习SEO的内容创业者。"
      />

      <div className="space-y-14">
        {/* ── Hero ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center pt-4 pb-2"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full uppercase tracking-wide">
              完全免费
            </span>
            <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-full uppercase tracking-wide">
              深度阅读版
            </span>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4 leading-tight">
            SEO深度课程：<br className="sm:hidden" />像读书一样系统学SEO
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
            {totalChapters}篇完整文章，每章都有开篇故事、真实案例拆解、交互式行动清单。
            从搜索引擎工作原理到国际化SEO，一步一步读懂、读透。
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/wayne/courses/seo-deep/1/1"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors text-base"
            >
              从第一章开始阅读
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          <p className="text-xs text-slate-400 mt-3">无需注册 · 永久免费 · 可随时保存阅读进度</p>
        </motion.div>

        {/* ── Stats ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {[
            { num: '7', label: '个模块' },
            { num: String(totalChapters), label: '篇完整文章' },
            { num: '28+', label: '真实案例' },
            { num: '100+', label: '行动清单任务' },
          ].map((s) => (
            <div key={s.label} className="bg-white border border-slate-200 rounded-xl p-5 text-center">
              <p className="text-3xl font-bold text-indigo-600 mb-1">{s.num}</p>
              <p className="text-sm text-slate-500">{s.label}</p>
            </div>
          ))}
        </motion.div>

        {/* ── Prime Number Free ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.07 }}
        >
          <PrimeNumberFreeBadge />
        </motion.div>

        {/* ── VS Callout ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.09 }}
          className="bg-slate-50 border border-slate-200 rounded-2xl p-6"
        >
          <p className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-4">两门SEO课的区别</p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-white border border-indigo-100 rounded-xl p-4">
              <p className="text-xs font-bold text-indigo-600 uppercase tracking-wide mb-2">
                SEO速查指南 <span className="text-slate-400 normal-case font-normal">（已有课程）</span>
              </p>
              <ul className="space-y-1.5 text-sm text-slate-600">
                {['要点提炼 · 结构化速查', '8模块含AI工具Bonus', '适合已有基础快速复习', '每模块一页，纵览全貌'].map(t => (
                  <li key={t} className="flex items-start gap-2">
                    <ChevronRight className="w-3.5 h-3.5 mt-0.5 text-indigo-400 flex-shrink-0" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
              <Link to="/wayne/courses/seo" className="inline-flex items-center gap-1 text-xs text-indigo-600 mt-3 font-semibold">查看 →</Link>
            </div>
            <div className="bg-white border border-emerald-100 rounded-xl p-4">
              <p className="text-xs font-bold text-emerald-600 uppercase tracking-wide mb-2">
                SEO深度课程 <span className="text-slate-400 normal-case font-normal">（本课程）</span>
              </p>
              <ul className="space-y-1.5 text-sm text-slate-600">
                {['完整叙事 · 沉浸式阅读', '28章独立文章', '适合零基础系统学习', '每章含案例+交互清单'].map(t => (
                  <li key={t} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 text-emerald-500 flex-shrink-0" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* ── Curriculum ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.11 }}
        >
          <h2 className="text-2xl font-bold text-slate-900 mb-6">完整目录</h2>
          <div className="space-y-4">
            {SEO_DEEP_MODULES.map((mod, mi) => {
              const colorClass = MODULE_COLORS[mi % MODULE_COLORS.length];
              return (
                <div key={mod.num} className={`border rounded-2xl overflow-hidden ${colorClass}`}>
                  {/* Module header */}
                  <div className="px-5 py-4 flex items-center gap-3">
                    <span className="text-xs font-bold uppercase tracking-wide opacity-60">模块 {mod.num}</span>
                    <div className="flex-1">
                      <p className="font-bold text-base">{mod.title}</p>
                      <p className="text-sm opacity-70">{mod.subtitle}</p>
                    </div>
                    <span className="flex items-center gap-1 text-xs opacity-60 flex-shrink-0">
                      <Clock className="w-3 h-3" /> {mod.duration}
                    </span>
                  </div>
                  {/* Chapter list */}
                  <div className="bg-white divide-y divide-slate-100">
                    {mod.chapters.map((chap) => (
                      <Link
                        key={chap.id}
                        to={`/wayne/courses/seo-deep/${mod.num}/${chap.num}`}
                        className="flex items-center gap-3 px-5 py-3 hover:bg-slate-50 transition-colors group"
                      >
                        <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0 text-xs font-bold text-slate-500">
                          {chap.num}
                        </div>
                        <span className="flex-1 text-sm text-slate-700 group-hover:text-indigo-700 transition-colors">
                          {chap.title}
                        </span>
                        <BookOpen className="w-3.5 h-3.5 text-slate-300 group-hover:text-indigo-400 flex-shrink-0 transition-colors" />
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* ── Who It's For ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.13 }}
          className="bg-white border border-slate-200 rounded-2xl p-6"
        >
          <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-400" />
            适合你，如果你想：
          </h3>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              '从零开始，系统理解SEO的每一个知识点',
              '通过真实案例学习，而不是干巴巴的要点列表',
              '在上下班途中像读文章一样消化SEO知识',
              '每章学完就有具体的行动清单，立即应用',
              '想建立SEO框架，再去看更高级的策略',
              '想把SEO课推荐给完全不懂SEO的朋友',
            ].map((item) => (
              <div key={item} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-slate-700">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          className="bg-indigo-600 rounded-2xl px-8 py-10 text-center text-white"
        >
          <h2 className="text-2xl font-bold mb-3">从第一章开始，今天就读起来</h2>
          <p className="text-indigo-100 mb-6 max-w-lg mx-auto">
            每章平均15分钟读完。从"什么是SEO"开始，
            28篇读完，你已经具备独立操盘一个站的能力。
          </p>
          <Link
            to="/wayne/courses/seo-deep/1/1"
            className="inline-flex items-center gap-2 bg-white text-indigo-700 font-semibold px-8 py-3 rounded-xl hover:bg-indigo-50 transition-colors"
          >
            开始阅读第一章
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </>
  );
}
