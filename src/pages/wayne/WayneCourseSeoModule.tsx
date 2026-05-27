import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle2, BookOpen, Clock, ChevronRight } from 'lucide-react';
import { SEOHead } from '../../components/SEOHead';
import { SEO_MODULES, type SeoContentBlock } from '../../data/seoCourseModules';

function ContentBlockView({ block }: { block: SeoContentBlock }) {
  return (
    <div className="mb-6">
      {block.heading && (
        <h4 className="text-base font-bold text-slate-800 mb-3">{block.heading}</h4>
      )}

      {/* Bullet list */}
      {block.items.length > 0 && (
        <ul className="space-y-2 mb-3">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0 mt-2" />
              <span className="text-sm text-slate-700 leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Code block */}
      {block.code && (
        <pre className="bg-slate-900 text-slate-100 text-xs rounded-lg p-4 overflow-x-auto mb-3 leading-relaxed">
          <code>{block.code}</code>
        </pre>
      )}

      {/* Table */}
      {block.table && (
        <div className="overflow-x-auto mb-3">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-100">
                {block.table.headers.map((h, i) => (
                  <th
                    key={i}
                    className="text-left text-xs font-bold text-slate-600 uppercase tracking-wide px-3 py-2 border border-slate-200"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.table.rows.map((row, ri) => (
                <tr key={ri} className={ri % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      className="px-3 py-2 text-slate-700 border border-slate-200 text-xs"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default function WayneCourseSeoModule() {
  const { moduleNum } = useParams<{ moduleNum: string }>();
  const num = parseInt(moduleNum ?? '1', 10);
  const mod = SEO_MODULES.find((m) => m.num === num);

  if (!mod) return <Navigate to="/wayne/courses/seo" replace />;

  const prevMod = SEO_MODULES.find((m) => m.num === num - 1);
  const nextMod = SEO_MODULES.find((m) => m.num === num + 1);
  const progress = Math.round((num / SEO_MODULES.length) * 100);

  return (
    <>
      <SEOHead
        title={`模块${mod.num}：${mod.title} — SEO初级课程 | Wayne`}
        description={mod.subtitle}
      />

      <div className="max-w-3xl mx-auto">
        {/* ── Breadcrumb ── */}
        <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-6">
          <Link to="/wayne/courses" className="hover:text-slate-600 transition-colors">
            Courses
          </Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/wayne/courses/seo" className="hover:text-slate-600 transition-colors">
            SEO初级课程
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-600">模块 {mod.num}</span>
        </div>

        {/* ── Progress bar ── */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
            <span>模块 {mod.num} / {SEO_MODULES.length}</span>
            <span>{progress}% 已完成</span>
          </div>
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-500 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* ── Module header ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-2xl px-7 py-8 text-white mb-8"
        >
          <p className="text-xs font-bold text-indigo-200 uppercase tracking-widest mb-2">
            SEO初级课程 · 模块 {mod.num}
          </p>
          <h1 className="text-2xl font-bold mb-2">{mod.title}</h1>
          <p className="text-indigo-100 text-sm mb-4">{mod.subtitle}</p>
          <div className="flex flex-wrap gap-4 text-xs text-indigo-200">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> {mod.duration}
            </span>
            <span className="flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" /> {mod.chapters.length} 章节
            </span>
          </div>
        </motion.div>

        {/* ── Chapters ── */}
        <div className="space-y-10">
          {mod.chapters.map((chapter, ci) => (
            <motion.section
              key={chapter.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: ci * 0.06 }}
            >
              {/* Chapter header */}
              <div className="flex items-start gap-3 mb-5">
                <span className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                  {ci + 1}
                </span>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">{chapter.title}</h2>
                  <p className="text-sm text-indigo-600 mt-0.5">
                    <span className="font-semibold">学习目标：</span>{chapter.objective}
                  </p>
                </div>
              </div>

              {/* Content blocks */}
              <div className="pl-10 space-y-1">
                {chapter.blocks.map((block, bi) => (
                  <ContentBlockView key={bi} block={block} />
                ))}
              </div>

              {/* Practice task */}
              {chapter.practice.length > 0 && (
                <div className="ml-10 mt-5 bg-amber-50 border border-amber-200 rounded-xl p-5">
                  <h4 className="text-sm font-bold text-amber-800 mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-500" />
                    实践任务
                  </h4>
                  <ul className="space-y-2">
                    {chapter.practice.map((task, ti) => (
                      <li key={ti} className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded border border-amber-300 flex-shrink-0 mt-0.5 bg-white" />
                        <span className="text-sm text-amber-900">{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Divider between chapters */}
              {ci < mod.chapters.length - 1 && (
                <div className="mt-10 border-t border-slate-100" />
              )}
            </motion.section>
          ))}
        </div>

        {/* ── Prev / Next navigation ── */}
        <div className="mt-14 pt-8 border-t border-slate-200 flex items-center justify-between gap-4">
          {prevMod ? (
            <Link
              to={`/wayne/courses/seo/${prevMod.num}`}
              className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              <div className="text-left">
                <p className="text-xs text-slate-400">上一模块</p>
                <p className="text-sm font-semibold">{prevMod.title}</p>
              </div>
            </Link>
          ) : (
            <Link
              to="/wayne/courses/seo"
              className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">返回课程目录</span>
            </Link>
          )}

          {nextMod ? (
            <Link
              to={`/wayne/courses/seo/${nextMod.num}`}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors group"
            >
              <div className="text-right">
                <p className="text-xs text-indigo-200">下一模块</p>
                <p>{nextMod.title}</p>
              </div>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          ) : (
            <Link
              to="/wayne/courses/geo"
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors"
            >
              <div className="text-right">
                <p className="text-xs text-indigo-200">课程完成！下一步</p>
                <p>GEO课程 →</p>
              </div>
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
