import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  ArrowRight,
  Clock,
  BookOpen,
  Zap,
  Search,
  BrainCircuit,
  BarChart2,
  Target,
  FileText,
  TrendingUp,
  Globe,
} from 'lucide-react';
import { SEOHead } from '../../components/SEOHead';
import wayneAvatar from '../../assets/wayne-avatar.jpg';

// ─── REPLACE THIS URL WITH YOUR GOOGLE FORM LINK ───────────────────────
const WAITLIST_URL = 'https://forms.gle/42j7xjown7aWPRa5A';
// ────────────────────────────────────────────────────────────────────────

const MODULES = [
  {
    num: '01',
    icon: <Search className="w-5 h-5 text-indigo-600" />,
    title: 'GEO基础认知',
    subtitle: '搞清楚这件事为什么现在很重要',
    desc: '什么是GEO，它和SEO的本质区别在哪里，AI搜索的市场现状，以及为什么现在入场是最好的时机。',
    chapters: ['什么是GEO vs SEO', 'AI搜索引擎的现状', 'GEO的商业价值', '白帽vs黑帽GEO', '期望管理与学习路径'],
  },
  {
    num: '02',
    icon: <BrainCircuit className="w-5 h-5 text-indigo-600" />,
    title: 'AI引擎如何工作',
    subtitle: '知道它怎么想，才能让它引用你',
    desc: 'RAG（检索增强生成）原理，AI如何决定引用哪些内容，ChatGPT / Perplexity / Claude / Gemini各自的差异和盲区。',
    chapters: ['RAG原理简介', 'AI引用决策逻辑', '各大引擎差异对比', 'AI引擎的盲区和机会'],
  },
  {
    num: '03',
    icon: <FileText className="w-5 h-5 text-indigo-600" />,
    title: '为AI写内容',
    subtitle: 'Answer-first格式，让AI抢着引用你',
    desc: 'AI偏好的内容格式（直接答案、结构化列表、量化数据），E-E-A-T升级版，Answer-first写作框架，18条发布前检查清单。',
    chapters: ['AI偏好的内容格式', 'AI时代的权威信号', 'Answer-First写作框架', '图片表格代码的作用', '内容检查清单'],
  },
  {
    num: '04',
    icon: <Globe className="w-5 h-5 text-indigo-600" />,
    title: '技术GEO优化',
    subtitle: '让AI爬虫能找到你、读懂你',
    desc: 'Schema markup for AI（FAQ/HowTo/Article），页面结构信号，About页和作者页的权威性建设，robots.txt的AI爬虫配置，25条技术检查清单。',
    chapters: ['Schema markup for AI', '页面结构与H标签规范', '网站权威性信号建设', '速度与可抓取性', '技术检查清单'],
  },
  {
    num: '05',
    icon: <Target className="w-5 h-5 text-indigo-600" />,
    title: '查询策略与意图分析',
    subtitle: '从"关键词"思维升级到"意图"思维',
    desc: 'AI搜索的查询特征（更长、更口语、带上下文），意图矩阵规划内容，AI查询研究工具，从已有内容出发的快速GEO策略。',
    chapters: ['AI搜索查询特征', '从关键词到意图', 'AI查询研究工具', '内容覆盖策略'],
  },
  {
    num: '06',
    icon: <BarChart2 className="w-5 h-5 text-indigo-600" />,
    title: '监测、追踪与迭代',
    subtitle: '你做了但怎么知道有没有用？',
    desc: '建立GEO效果衡量基准，AI引用追踪工具，四种常见问题的优化模式，30天行动计划，真实案例复盘。',
    chapters: ['如何衡量GEO效果', 'AI引用追踪工具', '迭代优化方法', '案例分析与30天计划'],
  },
];

const FAQS = [
  {
    q: '这门课是中文还是英文的？',
    a: '课程内容全部为简体中文，部分技术术语保留英文原词（如Schema markup、RAG、E-E-A-T），并附有解释。目标受众是面向英文互联网做内容的中文创作者和站主。',
  },
  {
    q: 'GEO和SEO有什么不同？我需要先有SEO基础吗？',
    a: 'GEO的目标是让ChatGPT、Perplexity、Google AI Overview等AI引擎在回答用户问题时引用你的内容，而SEO的目标是在Google排名靠前。两者互补而非互斥。有SEO基础会更容易理解，但不是必须的——课程从零开始讲AI搜索的工作原理。',
  },
  {
    q: '现在AI搜索流量还很少，学GEO值得吗？',
    a: '2025年，Perplexity月活已超1亿，ChatGPT Search覆盖5亿用户，Google AI Overview正在全面替代传统蓝链。这和2012年做SEO的时机类似——早进去的人积累了巨大优势。竞争对手现在大多数还没有意识到GEO。',
  },
  {
    q: '课程适合什么类型的网站？',
    a: '内容站/博客、工具站、SaaS、个人品牌网站均适用。电商平台（如Shopify独立站）相对次之，但产品评测类页面的GEO优化同样有价值。如果你的网站有内容输出，这门课就适合你。',
  },
  {
    q: '等候名单之后会怎么样？',
    a: '加入等候名单后，Wayne会在课程开放前一周发邮件通知。等候名单用户享有早鸟价格优先权，以及课程上线后第一批内测名额。',
  },
];

function ModuleCard({ mod, defaultOpen = false }: { mod: typeof MODULES[0]; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center gap-4 px-5 py-4 hover:bg-slate-50 transition-colors text-left"
      >
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">
          {mod.num}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-slate-800 text-sm">{mod.title}</p>
          <p className="text-xs text-slate-500 mt-0.5">{mod.subtitle}</p>
        </div>
        <div className="flex-shrink-0 ml-2">
          {open ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </div>
      </button>
      {open && (
        <div className="border-t border-slate-100 px-5 py-4 bg-slate-50/60 space-y-3">
          <p className="text-sm text-slate-600 leading-relaxed">{mod.desc}</p>
          <ul className="space-y-1">
            {mod.chapters.map((ch, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-slate-500">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />
                {ch}
              </li>
            ))}
          </ul>
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
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-start gap-3 px-5 py-4 hover:bg-slate-50 transition-colors text-left"
      >
        <span className="flex-1 text-sm font-semibold text-slate-800">{q}</span>
        {open ? <ChevronUp className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />}
      </button>
      {open && (
        <div className="border-t border-slate-100 px-5 py-4 bg-slate-50/60">
          <p className="text-sm text-slate-600 leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

function WaitlistBtn({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const cls = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  }[size];
  return (
    <a
      href={WAITLIST_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors ${cls}`}
    >
      加入等候名单 <ArrowRight className="w-4 h-4" />
    </a>
  );
}

export default function WayneCourseGeo() {
  return (
    <>
      <SEOHead
        title="GEO课程：让AI搜索引擎主动引用你的内容 — Wayne's Plans"
        description="学会GEO（生成式引擎优化），让ChatGPT、Perplexity、Claude在回答用户问题时引用你的内容。6个模块，5-8小时，从原理到实战的完整体系。"
      />

      <div className="space-y-16 pb-20">

        {/* ── Hero ── */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="pt-6 pb-2 text-center"
        >
          <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-bold rounded-full mb-5 tracking-wide uppercase">
            即将开放 · 加入等候名单
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-5 leading-tight">
            让AI搜索引擎<br />
            <span className="text-indigo-600">主动引用你的内容</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-4 leading-relaxed">
            ChatGPT、Perplexity、Claude每天回答数亿个问题。<br />
            它们引用的那些网站，不是最有钱的，而是<strong className="text-slate-800">最会被AI读懂的</strong>。
          </p>
          <p className="text-base text-slate-500 max-w-xl mx-auto mb-8">
            GEO（生成式引擎优化）是AI时代的SEO。这门课教你从内容格式、技术信号到引用追踪，系统性地让AI主动选择你。
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <WaitlistBtn size="lg" />
            <span className="text-sm text-slate-400">免费加入 · 开课前一周通知</span>
          </div>
        </motion.section>

        {/* ── 数字说话 ── */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { num: '1亿+', label: 'Perplexity月活用户' },
              { num: '5亿+', label: 'ChatGPT覆盖用户数' },
              { num: '6个', label: '核心课程模块' },
              { num: '5-8小时', label: '完整学习时长' },
            ].map(s => (
              <div key={s.label} className="bg-white border border-slate-200 rounded-xl p-5 text-center">
                <div className="text-2xl font-bold text-indigo-600 mb-1">{s.num}</div>
                <div className="text-xs text-slate-500">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ── 问题与机会 ── */}
        <section className="grid md:grid-cols-2 gap-8">
          <div className="bg-red-50 border border-red-100 rounded-2xl p-6 space-y-3">
            <p className="text-sm font-bold text-red-600 uppercase tracking-wider">现在的情况</p>
            <h3 className="text-lg font-bold text-slate-900">AI搜索已经开始截流你的流量</h3>
            <ul className="space-y-2">
              {[
                'Google AI Overview出现后，部分关键词的点击率下降30-50%',
                'Perplexity直接回答问题，用户不再需要点击你的链接',
                '竞争对手已经开始被AI引用，你的内容却排不进AI的候选池',
              ].map(t => (
                <li key={t} className="flex gap-2 text-sm text-slate-600">
                  <span className="text-red-400 mt-0.5 flex-shrink-0">✗</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-green-50 border border-green-100 rounded-2xl p-6 space-y-3">
            <p className="text-sm font-bold text-green-600 uppercase tracking-wider">学完之后</p>
            <h3 className="text-lg font-bold text-slate-900">成为AI引擎主动选择的来源</h3>
            <ul className="space-y-2">
              {[
                '你的内容格式能被AI快速提取，比竞争对手被引用3-5倍',
                '你的网站建立了AI识别的权威信号，长期受益',
                '你知道如何追踪AI引用频次，持续优化，不再靠猜',
              ].map(t => (
                <li key={t} className="flex gap-2 text-sm text-slate-600">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── 课程模块 ── */}
        <section className="space-y-6">
          <div className="text-center">
            <p className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-2">课程结构</p>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">6个模块，从原理到实战</h2>
            <p className="text-slate-500 text-sm">每个模块配有实践任务和检查清单，学完即可落地</p>
          </div>
          <div className="space-y-3">
            {MODULES.map((mod, i) => (
              <ModuleCard key={mod.num} mod={mod} defaultOpen={i === 0} />
            ))}
          </div>
        </section>

        {/* ── 你会得到什么 ── */}
        <section className="bg-indigo-50 border border-indigo-100 rounded-2xl p-8 space-y-6">
          <h2 className="text-xl font-bold text-slate-900 text-center">学完课程，你会拿到</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: <BookOpen className="w-5 h-5 text-indigo-600" />, title: '6个完整模块', desc: '从GEO基础到技术优化，覆盖完整学习路径' },
              { icon: <Zap className="w-5 h-5 text-indigo-600" />, title: '2份检查清单', desc: '内容发布前18条 + 技术优化25条，可直接使用' },
              { icon: <TrendingUp className="w-5 h-5 text-indigo-600" />, title: '30天行动计划', desc: '具体到每周的GEO优化任务，开始执行不迷茫' },
              { icon: <Clock className="w-5 h-5 text-indigo-600" />, title: '持续更新', desc: 'GEO领域快速变化，课程内容随AI搜索变化持续迭代' },
            ].map(item => (
              <div key={item.title} className="flex gap-3 bg-white rounded-xl p-4 border border-indigo-100">
                <div className="flex-shrink-0 w-9 h-9 bg-indigo-50 rounded-lg flex items-center justify-center">
                  {item.icon}
                </div>
                <div>
                  <p className="font-semibold text-slate-800 text-sm">{item.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 适合谁 ── */}
        <section className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">这门课适合你吗？</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <p className="text-sm font-bold text-green-600 mb-4">✅ 适合这些人</p>
              <ul className="space-y-2">
                {[
                  '有独立网站/博客，想在AI搜索中被引用',
                  '做内容营销，想提前布局AI搜索时代',
                  '做SEO，想了解GEO这个新维度',
                  '做SaaS / 独立产品，想被AI推荐',
                  '有知识付费内容，想扩大AI时代的曝光',
                ].map(t => (
                  <li key={t} className="text-sm text-slate-600 flex gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
              <p className="text-sm font-bold text-slate-500 mb-4">⬜ 暂时不适合</p>
              <ul className="space-y-2">
                {[
                  '还没有任何网站或内容的完全新手',
                  '只做国内中文搜索优化（百度/微信生态）',
                  '期待一夜暴富的流量策略',
                ].map(t => (
                  <li key={t} className="text-sm text-slate-500 flex gap-2">
                    <span className="mt-0.5 flex-shrink-0">—</span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── About Wayne ── */}
        <section className="bg-white border border-slate-200 rounded-2xl p-8">
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <img
              src={wayneAvatar}
              alt="Wayne"
              className="w-16 h-16 rounded-full object-cover flex-shrink-0 border-2 border-indigo-100"
            />
            <div className="space-y-3">
              <div>
                <p className="font-bold text-slate-900 text-lg">Wayne</p>
                <p className="text-sm text-slate-500">AI教练 · Bunny Universe创始人</p>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                过去两年花了超过$10,000测试AI工作流，涵盖内容创作、SEO优化、独立产品开发。
                2024年底开始系统研究GEO，测试了超过50篇文章的格式改造，观察AI引擎的引用变化。
                每周三在Wayne's Plans发布AI学习计划，和8岁的女儿Luna一起实验、记录、分享真实结果。
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                这门课不是理论汇编，是我自己踩坑之后整理出来的体系。
              </p>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-6">常见问题</h2>
          {FAQS.map(faq => (
            <FaqItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </section>

        {/* ── Final CTA ── */}
        <section className="bg-indigo-600 rounded-2xl p-10 text-center space-y-5">
          <h2 className="text-2xl font-bold text-white">现在是最好的入场时机</h2>
          <p className="text-indigo-100 max-w-xl mx-auto text-sm leading-relaxed">
            AI搜索算法还在形成期，竞争对手大多数还没有意识到GEO。
            现在建立的权威信号会在AI引擎成熟后持续发挥作用。
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={WAITLIST_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-indigo-600 hover:bg-indigo-50 font-bold px-8 py-4 rounded-lg transition-colors text-base"
            >
              加入等候名单 <ArrowRight className="w-5 h-5" />
            </a>
            <Link
              to="/wayne/insights"
              className="text-indigo-200 hover:text-white text-sm transition-colors"
            >
              先读Wayne的Insights →
            </Link>
          </div>
          <p className="text-indigo-300 text-xs">免费加入 · 开课前一周通知 · 可随时取消</p>
        </section>

      </div>
    </>
  );
}
