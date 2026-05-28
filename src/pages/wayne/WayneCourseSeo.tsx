import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BookOpen,
  Bot,
  CheckCircle2,
  Clock,
  ChevronRight,
  Globe,
  Search,
  FileText,
  Link2,
  BarChart2,
  Zap,
  Star,
} from 'lucide-react';

const SEO_SIGNUP_URL = 'https://forms.gle/noJPhc9rz5StsH7x7';
import { SEOHead } from '../../components/SEOHead';
import { SEO_MODULES } from '../../data/seoCourseModules';
import { PrimeNumberFreeBadge } from './WayneCourseSeoDeep';

const MODULE_ICONS = [
  <Search className="w-5 h-5" />,
  <BookOpen className="w-5 h-5" />,
  <FileText className="w-5 h-5" />,
  <Zap className="w-5 h-5" />,
  <BarChart2 className="w-5 h-5" />,
  <Link2 className="w-5 h-5" />,
  <Globe className="w-5 h-5" />,
  <Bot className="w-5 h-5" />,
];

export default function WayneCourseSeo() {
  return (
    <>
      <SEOHead
        title="SEO初级课程：从零到首页排名 — Wayne's Courses"
        description="8个模块，完整的SEO初级课程。免费学习：关键词研究、页面优化、技术SEO、外链建设，含AI工具辅助SEO Bonus，适合出海站长和内容创业者。"
      />

      <div className="space-y-16">
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
              初级课程
            </span>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4 leading-tight">
            SEO从零开始：<br className="sm:hidden" />让Google主动找到你
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
            8个模块，系统学习搜索引擎优化的完整方法论。
            从关键词研究到外链建设，含AI工具辅助SEO Bonus——每个模块都有实践任务，学完就能动手做。
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/wayne/courses/seo/1"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors text-base"
            >
              从第一章开始
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href={SEO_SIGNUP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-slate-300 hover:border-indigo-400 text-slate-700 hover:text-indigo-700 font-semibold px-6 py-3.5 rounded-xl transition-colors text-base"
            >
              订阅课程更新
            </a>
          </div>
          <p className="text-xs text-slate-400 mt-3">无需注册 · 永久免费 · 随时中断随时继续</p>
        </motion.div>

        {/* ── Stats ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {[
            { num: '8', label: '个模块' },
            { num: '¥0', label: '永久免费' },
            { num: '8h+', label: '学习时长' },
            { num: '24+', label: '实践任务' },
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

        {/* ── What You'll Learn ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.08 }}
        >
          <h2 className="text-2xl font-bold text-slate-900 mb-6">学完这门课，你能做到：</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              '理解搜索引擎工作原理，知道Google为什么给某页面排名',
              '独立做关键词研究，找到有价值的低竞争词',
              '写出Title、Meta Description和URL结构符合SEO规范的页面',
              '用5步写作框架创作同时满足用户和搜索引擎的内容',
              '规划技术友好的网站架构，解决移动端和速度问题',
              '制定可执行的外链建设计划，获得第一批高质量外链',
              '为出海站和多语言网站配置Hreflang，避免重复内容陷阱',
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 bg-white border border-slate-100 rounded-lg p-4">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-slate-700">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Curriculum ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900">课程大纲</h2>
            <span className="text-sm text-slate-400">{SEO_MODULES.length} 个模块</span>
          </div>

          <div className="space-y-3">
            {SEO_MODULES.map((mod, i) => (
              <Link
                key={mod.num}
                to={`/wayne/courses/seo/${mod.num}`}
                className="group flex items-center gap-4 bg-white border border-slate-200 hover:border-indigo-300 hover:shadow-sm rounded-xl p-5 transition-all"
              >
                {/* Icon */}
                <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-100 transition-colors">
                  {MODULE_ICONS[i]}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                      模块 {mod.num}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-slate-400">
                      <Clock className="w-3 h-3" /> {mod.duration}
                    </span>
                  </div>
                  <p className="font-semibold text-slate-800 group-hover:text-indigo-700 transition-colors">
                    {mod.title}
                  </p>
                  <p className="text-sm text-slate-500 mt-0.5 truncate">{mod.subtitle}</p>
                </div>

                {/* Chapter count + arrow */}
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="text-xs text-slate-400 hidden sm:block">
                    {mod.chapters.length} 章节
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-500 transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* ── Who Is This For ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.12 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-400" />
              适合你，如果你是：
            </h3>
            <ul className="space-y-2.5">
              {[
                '想通过内容站获得被动收入的副业创业者',
                '做出海产品，想靠Google自然流量降低获客成本',
                '已有网站但流量很少，想系统学习SEO',
                '对SEO感兴趣但不知道从哪里入手的完全新手',
                '想在GEO课（AI引擎优化）之前打好SEO基础',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
            <h3 className="font-bold text-slate-500 mb-4">可能不适合，如果你：</h3>
            <ul className="space-y-2.5">
              {[
                '已经熟悉关键词研究和On-Page SEO基础',
                '在寻找高级SEO技巧（如JS渲染、日志分析）',
                '想学黑帽SEO快速排名（我们不教这个）',
                '希望有视频讲解而非文字形式',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="w-4 h-4 rounded-full border-2 border-slate-300 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-500">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* ── SEO → GEO Bridge ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.14 }}
          className="bg-gradient-to-r from-indigo-50 to-slate-50 border border-indigo-100 rounded-2xl p-6"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <ArrowRight className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <p className="text-xs font-bold text-indigo-600 uppercase tracking-wide mb-1">下一步</p>
              <h3 className="font-bold text-slate-900 mb-1">学完SEO之后：GEO课程</h3>
              <p className="text-sm text-slate-600 mb-3">
                SEO让Google找到你，GEO让ChatGPT、Perplexity等AI引擎引用你。
                这门SEO课的模块7（GEO SEO与国际化）已经为你铺好过渡路径。
              </p>
              <Link
                to="/wayne/courses/geo"
                className="inline-flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-700 font-semibold"
              >
                查看GEO课程 →
              </Link>
            </div>
          </div>
        </motion.div>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.16 }}
          className="bg-indigo-600 rounded-2xl px-8 py-10 text-center text-white"
        >
          <h2 className="text-2xl font-bold mb-3">从第一章开始，今天就动手</h2>
          <p className="text-indigo-100 mb-6 max-w-lg mx-auto">
            SEO没有捷径，但有正确的方法。
            每个模块都有明确的实践任务——边学边做，3个月后你会看到结果。
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/wayne/courses/seo/1"
              className="inline-flex items-center gap-2 bg-white text-indigo-700 font-semibold px-8 py-3 rounded-xl hover:bg-indigo-50 transition-colors"
            >
              开始学习
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={SEO_SIGNUP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-indigo-300 hover:border-white text-indigo-100 hover:text-white font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              订阅课程更新
            </a>
          </div>
        </motion.div>
      </div>
    </>
  );
}
