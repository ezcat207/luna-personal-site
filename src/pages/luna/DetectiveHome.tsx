import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, Lock, ExternalLink } from 'lucide-react';
import { ctfCases, type CtfCase, type Difficulty } from '../../data/ctfCases';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const PLATFORM_LABEL: Record<string, string> = {
  picoctf: 'picoCTF',
  cylabacademy: 'CyLabAcademy',
};

const DIFFICULTY_STARS = (d: Difficulty) => '★'.repeat(d) + '☆'.repeat(3 - d);

const SOLVER_EMOJI: Record<string, string> = {
  luna: '🐰',
  wayne: '🧑‍💻',
};

function DifficultyBadge({ level }: { level: Difficulty }) {
  const colors = ['', 'bg-green-100 text-green-700', 'bg-amber-100 text-amber-700', 'bg-red-100 text-red-700'];
  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${colors[level]}`}>
      {DIFFICULTY_STARS(level)}
    </span>
  );
}

function CaseCard({ c, index }: { c: CtfCase; index: number }) {
  const hasStory = c.story.crimeScene !== '';
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04 }}
    >
      <Link to={`/luna/detective/${c.id}`}>
        <div className={`bg-white border-2 rounded-2xl p-5 transition-all hover:shadow-md group ${
          hasStory ? 'border-pink-100 hover:border-pink-300' : 'border-slate-100 hover:border-slate-200 opacity-60'
        }`}>
          {/* Header row */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-2 shrink-0">
              <span className="bg-slate-100 text-slate-500 text-xs font-bold px-2 py-1 rounded-lg font-mono">
                #{String(c.caseNumber).padStart(3, '0')}
              </span>
              <DifficultyBadge level={c.difficulty} />
            </div>
            <div className="flex items-center gap-1">
              {c.solvers.map(s => (
                <span key={s} title={s} className="text-base">{SOLVER_EMOJI[s]}</span>
              ))}
            </div>
          </div>

          {/* Title */}
          <h3 className={`font-bold text-lg mb-1.5 leading-snug transition-colors ${
            hasStory ? 'text-slate-900 group-hover:text-pink-600' : 'text-slate-400'
          }`}>
            {c.title}
          </h3>

          <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mb-3">
            {c.summary}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              {c.platform && (
                <span className="bg-indigo-50 text-indigo-600 text-[11px] font-semibold px-2 py-0.5 rounded-full">
                  {PLATFORM_LABEL[c.platform]}
                </span>
              )}
              {c.tags.slice(0, 2).map(tag => (
                <span key={tag} className="bg-slate-50 text-slate-400 text-[11px] px-2 py-0.5 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            <span className="text-xs text-slate-400">{c.date}</span>
          </div>

          {!hasStory && (
            <p className="text-xs text-slate-400 mt-2 italic">Story coming soon…</p>
          )}
        </div>
      </Link>
    </motion.div>
  );
}

// ─── Main ──────────────────────────────────────────────────────────────────────

export default function DetectiveHome() {
  const published = ctfCases.filter(c => c.story.crimeScene !== '');
  const upcoming  = ctfCases.filter(c => c.story.crimeScene === '');

  return (
    <div className="space-y-16">

      {/* Hero */}
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative"
      >
        <div className="absolute -top-8 -right-8 w-56 h-56 bg-indigo-100 rounded-full blur-3xl opacity-30 z-0" />
        <div className="absolute top-20 left-0 w-48 h-48 bg-pink-100 rounded-full blur-3xl opacity-20 z-0" />

        <div className="relative z-10 bg-white border-2 border-pink-100 rounded-3xl p-8 md:p-12 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-md shrink-0">
              <Shield className="w-6 h-6" />
            </div>
            <span className="text-pink-400 text-sm font-semibold uppercase tracking-wide">Luna's Case Files</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-3">
            CTF 侦探故事集
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed max-w-2xl">
            每一道 CTF 题目背后，都是一场小小的数字犯罪现场调查。
            读故事，或者动手解题——看你更喜欢哪种方式。
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <div className="flex items-center gap-2 bg-pink-50 border border-pink-200 rounded-xl px-4 py-2">
              <span className="text-2xl">🐰</span>
              <div>
                <p className="text-xs text-slate-500">Luna 解题</p>
                <p className="text-sm font-bold text-slate-800">{ctfCases.filter(c => c.solvers.includes('luna')).length} 个案子</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-indigo-50 border border-indigo-200 rounded-xl px-4 py-2">
              <span className="text-2xl">🧑‍💻</span>
              <div>
                <p className="text-xs text-slate-500">Wayne 协助</p>
                <p className="text-sm font-bold text-slate-800">{ctfCases.filter(c => c.solvers.includes('wayne')).length} 个案子</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2">
              <span className="text-2xl">📖</span>
              <div>
                <p className="text-xs text-slate-500">已发布故事</p>
                <p className="text-sm font-bold text-slate-800">{published.length} 篇</p>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* How it works */}
      <section className="px-1 md:px-0">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="bg-pink-50 border border-pink-200 rounded-2xl p-6">
            <div className="text-3xl mb-3">📖</div>
            <h3 className="font-bold text-lg text-slate-900 mb-2">侦探故事模式</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              不想做题？读故事就好。每个案件都有完整的犯罪现场描述、侦探推理过程和最终结论。
              适合所有对网络安全好奇、但还不想动手的人。
            </p>
          </div>
          <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-6">
            <div className="text-3xl mb-3">🎯</div>
            <h3 className="font-bold text-lg text-slate-900 mb-2">教程挑战模式</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              想亲手解题？切换到教程模式，获得三级渐进提示。
              每道题都有真实的 picoCTF 链接，直接去挑战。
            </p>
          </div>
        </motion.div>
      </section>

      {/* Published cases */}
      {published.length > 0 && (
        <section className="space-y-5">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">📂 已发布案件</h2>
            <p className="text-slate-500 text-sm mt-1">点击进入，切换故事或教程模式。</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {published.map((c, i) => <CaseCard key={c.id} c={c} index={i} />)}
          </div>
        </section>
      )}

      {/* Upcoming */}
      {upcoming.length > 0 && (
        <section className="space-y-5">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">🗓️ 即将发布</h2>
            <p className="text-slate-500 text-sm mt-1">故事正在整理中，敬请期待。</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {upcoming.map((c, i) => <CaseCard key={c.id} c={c} index={i} />)}
          </div>
        </section>
      )}

      {/* CTA */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-indigo-50 to-pink-50 border-2 border-indigo-100 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-md shrink-0">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-slate-900">想在 picoCTF 上自己试试？</h3>
            <p className="text-slate-500 text-sm">免费注册，数百道入门到进阶题目，是我们练习的主要平台。</p>
          </div>
        </div>
        <a
          href="https://picoctf.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm px-6 py-3.5 rounded-2xl shadow-sm transition-all transform hover:scale-[1.02] shrink-0 whitespace-nowrap"
        >
          <ExternalLink className="w-4 h-4" />
          去 picoCTF
        </a>
      </motion.section>

    </div>
  );
}
