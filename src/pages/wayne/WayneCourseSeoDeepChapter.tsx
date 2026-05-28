import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckSquare,
  Square,
  ChevronRight,
  Lightbulb,
} from 'lucide-react';
import { SEOHead } from '../../components/SEOHead';
import {
  getDeepChapter,
  getDeepModule,
  getDeepAdjacentChapters,
  type ChapterSection,
  type CaseBox,
} from '../../data/seoDeepModules';

// ── Case Box ──────────────────────────────────────────────────────────────────
function CaseBoxView({ box }: { box: CaseBox }) {
  return (
    <div className="my-6 rounded-xl overflow-hidden border border-amber-200">
      <div className="bg-amber-50 px-5 py-3 flex items-center gap-2">
        <Lightbulb className="w-4 h-4 text-amber-600" />
        <span className="text-sm font-bold text-amber-800">案例研究</span>
      </div>
      <div className="bg-amber-50/40 px-5 py-4 space-y-3">
        <div>
          <span className="text-xs font-bold text-amber-700 uppercase tracking-wide">背景</span>
          <p className="text-sm text-slate-700 mt-1 leading-relaxed">{box.background}</p>
        </div>
        {box.steps.length > 0 && (
          <div>
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wide">操作</span>
            <ol className="mt-1 space-y-1">
              {box.steps.map((step, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                  <span className="w-4 h-4 rounded-full bg-amber-200 text-amber-800 text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        )}
        <div>
          <span className="text-xs font-bold text-amber-700 uppercase tracking-wide">结果</span>
          <p className="text-sm text-slate-700 mt-1 leading-relaxed font-medium">{box.result}</p>
        </div>
      </div>
    </div>
  );
}

// ── Content block (paragraph or bullet) ──────────────────────────────────────
function ContentLine({ text }: { text: string }) {
  if (text.startsWith('• ')) {
    return (
      <li className="flex items-start gap-2.5 text-slate-700">
        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0 mt-2" />
        <span className="text-base leading-relaxed">{text.slice(2)}</span>
      </li>
    );
  }
  return <p className="text-base text-slate-700 leading-relaxed">{text}</p>;
}

// ── Section renderer ──────────────────────────────────────────────────────────
function SectionView({ section }: { section: ChapterSection }) {
  const hasBullets = section.content.some((c) => c.startsWith('• '));

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-bold text-slate-900">{section.title}</h3>
      {hasBullets ? (
        <ul className="space-y-2 ml-1">
          {section.content.map((line, i) =>
            line.startsWith('• ') ? (
              <ContentLine key={i} text={line} />
            ) : (
              <p key={i} className="text-base text-slate-700 leading-relaxed">{line}</p>
            )
          )}
        </ul>
      ) : (
        <div className="space-y-3">
          {section.content.map((line, i) => (
            <ContentLine key={i} text={line} />
          ))}
        </div>
      )}
      {section.caseBox && <CaseBoxView box={section.caseBox} />}
    </div>
  );
}

// ── Interactive checklist ─────────────────────────────────────────────────────
function ChecklistView({
  items,
  storageKey,
}: {
  items: string[];
  storageKey: string;
}) {
  const [checked, setChecked] = useState<boolean[]>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved
        ? JSON.parse(saved)
        : items.map(() => false);
    } catch {
      return items.map(() => false);
    }
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(checked));
  }, [checked, storageKey]);

  const toggle = (i: number) => {
    setChecked((prev) => {
      const next = [...prev];
      next[i] = !next[i];
      return next;
    });
  };

  const doneCount = checked.filter(Boolean).length;

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-slate-900 flex items-center gap-2">
          <CheckSquare className="w-4 h-4 text-indigo-500" />
          行动清单
        </h3>
        {doneCount > 0 && (
          <span className="text-xs text-emerald-600 font-semibold">
            {doneCount}/{items.length} 完成
          </span>
        )}
      </div>
      <ul className="space-y-2.5">
        {items.map((item, i) => (
          <li
            key={i}
            className="flex items-start gap-3 cursor-pointer select-none group"
            onClick={() => toggle(i)}
          >
            {checked[i] ? (
              <CheckSquare className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
            ) : (
              <Square className="w-5 h-5 text-slate-300 group-hover:text-indigo-400 flex-shrink-0 mt-0.5 transition-colors" />
            )}
            <span
              className={`text-sm leading-relaxed transition-colors ${
                checked[i] ? 'text-slate-400 line-through' : 'text-slate-700'
              }`}
            >
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function WayneCourseSeoDeepChapter() {
  const { moduleNum, chapterNum } = useParams<{
    moduleNum: string;
    chapterNum: string;
  }>();
  const navigate = useNavigate();

  const modNum = parseInt(moduleNum ?? '1', 10);
  const chapNum = parseInt(chapterNum ?? '1', 10);

  const chapter = getDeepChapter(modNum, chapNum);
  const mod = getDeepModule(modNum);
  const [prev, next] = getDeepAdjacentChapters(modNum, chapNum);

  useEffect(() => {
    if (!chapter) {
      navigate('/wayne/courses/seo-deep', { replace: true });
    }
  }, [chapter, navigate]);

  if (!chapter || !mod) return null;

  // Total chapters for progress
  const totalInModule = mod.chapters.length;
  const progressPct = Math.round((chapNum / totalInModule) * 100);

  return (
    <>
      <SEOHead
        title={`${chapter.title} — SEO深度课程 · Wayne`}
        description={chapter.summary.slice(0, 150)}
      />

      <div className="max-w-2xl mx-auto space-y-10">
        {/* ── Breadcrumb ── */}
        <nav className="flex items-center gap-1.5 text-sm text-slate-500 flex-wrap">
          <Link to="/wayne/courses" className="hover:text-indigo-600 transition-colors">课程</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/wayne/courses/seo-deep" className="hover:text-indigo-600 transition-colors">SEO深度课程</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link
            to={`/wayne/courses/seo-deep/${modNum}/1`}
            className="hover:text-indigo-600 transition-colors"
          >
            模块 {modNum}: {mod.title}
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-800 font-medium">第 {chapNum} 章</span>
        </nav>

        {/* ── Module progress bar ── */}
        <div>
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
            <span>模块 {modNum} 进度</span>
            <span>{chapNum} / {totalInModule} 章</span>
          </div>
          <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-500 rounded-full transition-all"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        {/* ── Chapter header ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wide">
              模块 {modNum} · 第 {chapNum} 章
            </span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 leading-snug mb-6">
            {chapter.title}
          </h1>

          {/* Hook */}
          <div className="bg-indigo-50 border-l-4 border-indigo-400 rounded-r-xl px-5 py-4">
            <p className="text-base text-indigo-900 leading-relaxed font-medium italic">
              {chapter.hook}
            </p>
          </div>
        </motion.div>

        {/* ── Sections ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="space-y-8"
        >
          {chapter.sections.map((section, i) => (
            <SectionView key={i} section={section} />
          ))}
        </motion.div>

        {/* ── Summary ── */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.15 }}
          className="bg-white border border-slate-200 rounded-xl p-5"
        >
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-4 h-4 text-indigo-500" />
            <h3 className="font-bold text-slate-900">本章小结</h3>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">{chapter.summary}</p>
        </motion.div>

        {/* ── Checklist ── */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.18 }}
        >
          <ChecklistView
            items={chapter.checklist}
            storageKey={`seo-deep-checklist-${chapter.id}`}
          />
        </motion.div>

        {/* ── Next chapter preview ── */}
        {chapter.nextPreview && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.2 }}
            className="bg-slate-50 border border-slate-200 rounded-xl px-5 py-4"
          >
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">下章预告</p>
            <p className="text-sm text-slate-600 leading-relaxed">{chapter.nextPreview}</p>
          </motion.div>
        )}

        {/* ── Prev / Next navigation ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25, delay: 0.22 }}
          className="grid grid-cols-2 gap-3 pt-2"
        >
          {prev ? (
            <Link
              to={`/wayne/courses/seo-deep/${prev.moduleNum}/${prev.num}`}
              className="group flex items-start gap-3 bg-white border border-slate-200 hover:border-indigo-300 rounded-xl p-4 transition-all"
            >
              <ArrowLeft className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 flex-shrink-0 mt-0.5 transition-colors" />
              <div className="min-w-0">
                <p className="text-xs text-slate-400 mb-0.5">上一章</p>
                <p className="text-sm font-semibold text-slate-700 group-hover:text-indigo-700 transition-colors line-clamp-2">
                  {prev.title}
                </p>
              </div>
            </Link>
          ) : (
            <div />
          )}

          {next ? (
            <Link
              to={`/wayne/courses/seo-deep/${next.moduleNum}/${next.num}`}
              className="group flex items-start gap-3 bg-white border border-slate-200 hover:border-indigo-300 rounded-xl p-4 transition-all text-right"
            >
              <div className="flex-1 min-w-0">
                <p className="text-xs text-slate-400 mb-0.5">下一章</p>
                <p className="text-sm font-semibold text-slate-700 group-hover:text-indigo-700 transition-colors line-clamp-2">
                  {next.title}
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 flex-shrink-0 mt-0.5 transition-colors" />
            </Link>
          ) : (
            <Link
              to="/wayne/courses/seo-deep"
              className="group flex items-center justify-end gap-2 bg-indigo-600 hover:bg-indigo-700 rounded-xl p-4 text-white transition-colors"
            >
              <span className="text-sm font-semibold">课程完成！返回目录</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </motion.div>
      </div>
    </>
  );
}
