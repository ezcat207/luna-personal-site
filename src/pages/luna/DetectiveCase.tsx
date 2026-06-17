import { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, BookOpen, Target, ExternalLink, ChevronDown, ChevronUp, Flag } from 'lucide-react';
import { getCtfCaseById, type CtfCase, type Difficulty } from '../../data/ctfCases';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const PLATFORM_LABEL: Record<string, string> = {
  picoctf: 'picoCTF',
  cylabacademy: 'CyLabAcademy',
};

function DifficultyStars({ level }: { level: Difficulty }) {
  const colors = ['', 'text-green-600', 'text-amber-500', 'text-red-500'];
  return (
    <span className={`font-bold text-sm ${colors[level]}`}>
      {'★'.repeat(level)}{'☆'.repeat(3 - level)}
    </span>
  );
}

// ─── Collapsible hint ─────────────────────────────────────────────────────────

function HintBlock({ label, children }: { label: string; children: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-indigo-100 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between px-4 py-3 bg-indigo-50 hover:bg-indigo-100 transition-colors text-left"
      >
        <span className="text-sm font-semibold text-indigo-700">{label}</span>
        {open ? <ChevronUp className="w-4 h-4 text-indigo-400" /> : <ChevronDown className="w-4 h-4 text-indigo-400" />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 py-3 text-sm text-slate-700 leading-relaxed bg-white">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Markdown-lite: render ```code``` blocks ──────────────────────────────────

function StoryText({ text }: { text: string }) {
  if (!text) return null;
  // Split by ```...``` code blocks
  const parts = text.split(/(```[\s\S]*?```)/g);
  return (
    <div className="space-y-3">
      {parts.map((part, i) => {
        if (part.startsWith('```') && part.endsWith('```')) {
          const inner = part.slice(3, -3).replace(/^\w+\n/, ''); // strip language tag
          return (
            <pre key={i} className="bg-slate-900 text-green-400 rounded-xl p-4 text-xs font-mono overflow-x-auto leading-relaxed">
              <code>{inner}</code>
            </pre>
          );
        }
        if (!part.trim()) return null;
        // Render blockquotes (> text) and bold (**text**)
        return (
          <div key={i} className="text-slate-700 leading-relaxed text-sm space-y-2">
            {part.split('\n\n').map((para, j) => {
              if (!para.trim()) return null;
              if (para.startsWith('> ')) {
                return (
                  <blockquote key={j} className="border-l-4 border-pink-300 pl-4 italic text-slate-500 text-sm">
                    {para.slice(2)}
                  </blockquote>
                );
              }
              // Bold via **text**
              const rendered = para.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
              return (
                <p key={j} className="text-slate-700 text-sm leading-relaxed"
                   dangerouslySetInnerHTML={{ __html: rendered }} />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

// ─── Story view ───────────────────────────────────────────────────────────────

function StoryView({ c }: { c: CtfCase }) {
  return (
    <div className="space-y-8">

      <div className="bg-white border-2 border-pink-100 rounded-2xl p-6 space-y-2">
        <h2 className="text-xs font-bold uppercase tracking-widest text-pink-400 mb-3">🔍 犯罪现场</h2>
        <StoryText text={c.story.crimeScene} />
      </div>

      <div className="bg-white border-2 border-amber-100 rounded-2xl p-6 space-y-2">
        <h2 className="text-xs font-bold uppercase tracking-widest text-amber-500 mb-3">⚠️ 陷阱在哪</h2>
        <StoryText text={c.story.trap} />
      </div>

      <div className="bg-white border-2 border-indigo-100 rounded-2xl p-6 space-y-2">
        <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-500 mb-3">💡 侦探推理</h2>
        <StoryText text={c.story.deduction} />
      </div>

      <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 space-y-2">
        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">⌨️ 解题命令</h2>
        <StoryText text={c.story.commands} />
      </div>

      {c.story.deadEnds && (
        <div className="bg-white border-2 border-rose-100 rounded-2xl p-6 space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-widest text-rose-400 mb-3">🚫 走过的弯路</h2>
          <StoryText text={c.story.deadEnds} />
        </div>
      )}

      <div className="bg-gradient-to-r from-pink-50 to-indigo-50 border-2 border-pink-200 rounded-2xl p-6">
        <h2 className="text-xs font-bold uppercase tracking-widest text-pink-500 mb-3">🏆 本案结论</h2>
        <StoryText text={c.story.lesson} />
      </div>

    </div>
  );
}

// ─── Tutorial view ────────────────────────────────────────────────────────────

function TutorialView({ c }: { c: CtfCase }) {
  if (!c.tutorial) {
    return (
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 text-center">
        <p className="text-slate-400 text-sm">这道题的教程还在准备中，先去看故事版吧！</p>
      </div>
    );
  }
  const t = c.tutorial;
  return (
    <div className="space-y-6">

      <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-6">
        <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-500 mb-2">🎯 挑战目标</h2>
        <p className="text-slate-700 text-sm leading-relaxed">{t.goal}</p>
      </div>

      {c.challengeUrl && (
        <a
          href={c.challengeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between gap-4 bg-white border-2 border-indigo-200 hover:border-indigo-400 rounded-2xl p-5 transition-all group"
        >
          <div>
            <p className="text-xs text-slate-400 font-medium mb-0.5">
              {c.platform ? PLATFORM_LABEL[c.platform] : 'Challenge'} · 点击跳转
            </p>
            <p className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{c.title}</p>
          </div>
          <ExternalLink className="w-5 h-5 text-indigo-400 shrink-0" />
        </a>
      )}

      <div className="space-y-3">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">三级渐进提示（从模糊到具体）</p>
        <HintBlock label="提示 1 — 方向">
          {t.hint1}
        </HintBlock>
        <HintBlock label="提示 2 — 更具体">
          {t.hint2}
        </HintBlock>
        <HintBlock label="提示 3 — 差一步">
          {t.hint3}
        </HintBlock>
      </div>

      <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-6">
        <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-2">⚡ 开始挑战</h2>
        <p className="text-slate-700 text-sm leading-relaxed mb-4">{t.tryIt}</p>
        {c.challengeUrl && (
          <a
            href={c.challengeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm px-5 py-2.5 rounded-xl transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            去解题
          </a>
        )}
      </div>

    </div>
  );
}

// ─── Main ──────────────────────────────────────────────────────────────────────

type Mode = 'story' | 'tutorial';

export default function DetectiveCase() {
  const { caseId } = useParams<{ caseId: string }>();
  const [mode, setMode] = useState<Mode>('story');
  const [showFlag, setShowFlag] = useState(false);

  const c = caseId ? getCtfCaseById(caseId) : undefined;

  if (!c) return <Navigate to="/luna/detective" replace />;

  const hasContent = c.story.crimeScene !== '';

  return (
    <div className="space-y-8 max-w-3xl mx-auto">

      {/* Back link */}
      <Link
        to="/luna/detective"
        className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-pink-500 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        回到所有案件
      </Link>

      {/* Case header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border-2 border-pink-100 rounded-3xl p-6 md:p-8 shadow-sm"
      >
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <span className="bg-slate-100 text-slate-600 text-xs font-bold px-3 py-1 rounded-lg font-mono">
            案件 #{String(c.caseNumber).padStart(3, '0')}
          </span>
          <DifficultyStars level={c.difficulty} />
          {c.platform && (
            <span className="bg-indigo-50 text-indigo-600 text-xs font-semibold px-2.5 py-1 rounded-full">
              {PLATFORM_LABEL[c.platform]}
            </span>
          )}
          <span className="text-xs text-slate-400 ml-auto">{c.date}</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">{c.title}</h1>
        <p className="text-slate-500 leading-relaxed">{c.summary}</p>

        <div className="flex items-center gap-2 mt-4 flex-wrap">
          {c.tags.map(tag => (
            <span key={tag} className="bg-pink-50 text-pink-500 text-xs font-medium px-2.5 py-1 rounded-full border border-pink-100">
              {tag}
            </span>
          ))}
        </div>
      </motion.div>

      {hasContent ? (
        <>
          {/* Mode switcher */}
          <div className="flex gap-2 bg-slate-100 p-1 rounded-2xl w-fit">
            <button
              onClick={() => setMode('story')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                mode === 'story'
                  ? 'bg-white shadow-sm text-pink-600'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              侦探故事
            </button>
            <button
              onClick={() => setMode('tutorial')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                mode === 'tutorial'
                  ? 'bg-white shadow-sm text-indigo-600'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <Target className="w-4 h-4" />
              我要做题
            </button>
          </div>

          {/* Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {mode === 'story' ? <StoryView c={c} /> : <TutorialView c={c} />}
            </motion.div>
          </AnimatePresence>

          {/* Flag reveal */}
          {c.flag && (
            <div className="border border-slate-200 rounded-2xl p-5">
              <button
                onClick={() => setShowFlag(v => !v)}
                className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-600 transition-colors"
              >
                <Flag className="w-4 h-4" />
                {showFlag ? '隐藏旗帜' : '显示正确旗帜（剧透警告）'}
              </button>
              <AnimatePresence>
                {showFlag && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden mt-3"
                  >
                    <pre className="bg-slate-900 text-green-400 text-xs font-mono rounded-xl p-3 overflow-x-auto">
                      {c.flag}
                    </pre>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </>
      ) : (
        <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-12 text-center">
          <p className="text-4xl mb-4">🔒</p>
          <p className="font-semibold text-slate-700 mb-1">故事还在整理中</p>
          <p className="text-slate-400 text-sm">Luna 正在把这个案件写成故事，敬请期待。</p>
          <Link to="/luna/detective" className="inline-block mt-6 text-sm text-pink-500 hover:text-pink-600 font-medium">
            ← 先看其他案件
          </Link>
        </div>
      )}

    </div>
  );
}
