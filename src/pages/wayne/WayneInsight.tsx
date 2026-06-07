import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { getWayneInsightById } from '../../data/wayneInsights';
import { SEOHead } from '../../components/SEOHead';
import { ShareBar } from '../../components/ShareBar';
import { PdfViewer } from '../../components/PdfViewer';
import { CommentSection } from '../../components/CommentSection';

// ── Language toggle ────────────────────────────────────────────────────────────

type Lang = 'zh' | 'en';

function detectLang(): Lang {
  try {
    const stored = localStorage.getItem('wayne-lang');
    if (stored === 'en' || stored === 'zh') return stored;
  } catch { /* ignore */ }
  return 'zh';
}

function LangSwitch({ lang, onToggle }: { lang: Lang; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className="text-xs font-semibold px-2.5 py-1 rounded-md border border-slate-200 text-slate-500 hover:border-indigo-300 hover:text-indigo-600 transition-colors select-none"
    >
      {lang === 'zh' ? 'EN' : '中文'}
    </button>
  );
}

// ── Content renderer ───────────────────────────────────────────────────────────

function ContentBlock({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="prose prose-lg prose-slate max-w-none mb-12">
      {paragraphs.map((paragraph, idx) => {
        if (paragraph.startsWith('## ')) {
          return (
            <h2 key={idx} className="text-2xl font-bold text-slate-900 mt-10 mb-4">
              {paragraph.slice(3)}
            </h2>
          );
        }
        if (paragraph.startsWith('@img:')) {
          const src = paragraph.slice(5);
          return (
            <div key={idx} className="my-8 rounded-xl overflow-hidden border border-slate-200 bg-white p-4">
              <img src={src} alt="" className="w-full h-auto" />
            </div>
          );
        }
        return (
          <p key={idx} className="text-slate-700 leading-relaxed mb-4">
            {paragraph}
          </p>
        );
      })}
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────────

export default function WayneInsight() {
  const { id } = useParams<{ id: string }>();
  const insight = getWayneInsightById(Number(id));
  const [lang, setLang] = useState<Lang>(detectLang);

  const toggleLang = () => {
    const next: Lang = lang === 'zh' ? 'en' : 'zh';
    setLang(next);
    try { localStorage.setItem('wayne-lang', next); } catch { /* ignore */ }
  };

  if (!insight) {
    return (
      <div className="min-h-screen bg-slate-50 py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Insight Not Found
          </h1>
          <Link
            to="/wayne/insights"
            className="text-indigo-600 hover:text-indigo-700 font-semibold"
          >
            ← Back to Insights
          </Link>
        </div>
      </div>
    );
  }

  // Bilingual: fall back to Chinese if English version not available
  const hasBilingual = Boolean(insight.contentEn && insight.contentEn.length > 0);
  const showLangSwitch = hasBilingual;
  const effectiveLang = hasBilingual ? lang : 'zh';

  const title = effectiveLang === 'en' && insight.titleEn ? insight.titleEn : insight.title;
  const subtitle = effectiveLang === 'en' && insight.subtitleEn ? insight.subtitleEn : insight.subtitle;
  const summary = effectiveLang === 'en' && insight.summaryEn ? insight.summaryEn : insight.summary;
  const content = effectiveLang === 'en' && insight.contentEn ? insight.contentEn : insight.content;
  const keyTakeaways = effectiveLang === 'en' && insight.keyTakeawaysEn ? insight.keyTakeawaysEn : insight.keyTakeaways;

  return (
    <>
      <SEOHead
        title={`${title} - Wayne's Insights`}
        description={summary}
      />
      <article className="min-h-screen bg-slate-50 py-12">
        <div className="max-w-4xl mx-auto px-6">
          {/* Back Link */}
          <div className="flex items-center justify-between mb-8">
            <Link
              to="/wayne/insights"
              className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Insights
            </Link>
            {showLangSwitch && <LangSwitch lang={lang} onToggle={toggleLang} />}
          </div>

          {/* Header */}
          <header className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <time className="text-sm text-slate-500">
                {new Date(insight.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              {insight.tags && (
                <div className="flex gap-2 flex-wrap">
                  {insight.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-indigo-50 text-indigo-600 text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <h1 className="text-5xl font-bold text-slate-900 mb-4">
              {title}
            </h1>
            {subtitle && (
              <p className="text-2xl text-slate-600 mb-6">{subtitle}</p>
            )}
            <p className="text-xl text-slate-700 leading-relaxed mb-6">
              {summary}
            </p>
            <ShareBar title={title} summary={summary} />
          </header>

          {/* Featured Image */}
          {insight.imageUrl && (
            <div className="mb-12 rounded-xl overflow-hidden border border-slate-200 bg-white p-4">
              <img
                src={insight.imageUrl}
                alt={title}
                className="w-full h-auto"
              />
            </div>
          )}

          {/* Image Gallery */}
          {insight.images && insight.images.length > 0 && (
            <div className="mb-12 space-y-6">
              {insight.images.map((src, idx) => (
                <div key={idx} className="rounded-xl overflow-hidden border border-slate-200 bg-white p-4">
                  <img
                    src={src}
                    alt={`${title} — ${idx + 1}`}
                    className="w-full h-auto"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Embedded PDF */}
          {insight.pdfUrl && (
            <PdfViewer
              url={insight.pdfUrl}
              title={effectiveLang === 'en' ? 'Original Slides — The Token Express' : '原始讲义 — Token 快车'}
            />
          )}

          {/* Content */}
          <ContentBlock paragraphs={content} />

          {/* Share — bottom */}
          <div className="flex items-center justify-between py-6 border-t border-slate-200 mb-8">
            <Link
              to="/wayne/insights"
              className="text-sm text-slate-400 hover:text-slate-700 transition-colors"
            >
              ← All Insights
            </Link>
            <ShareBar title={title} summary={summary} />
          </div>

          {/* Key Takeaways */}
          {keyTakeaways && keyTakeaways.length > 0 && (
            <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-8 mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                {effectiveLang === 'en' ? 'Key Takeaways' : '核心总结'}
              </h2>
              <ul className="space-y-3">
                {keyTakeaways.map((takeaway, idx) => (
                  <li
                    key={idx}
                    className="flex gap-3 text-slate-700 leading-relaxed"
                  >
                    <span className="text-indigo-600 font-bold">•</span>
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Related Resources */}
          {insight.relatedResources && insight.relatedResources.length > 0 && (
            <div className="bg-white border border-slate-200 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                {effectiveLang === 'en' ? 'Related Resources' : '相关资源'}
              </h2>
              <ul className="space-y-4">
                {insight.relatedResources.map((resource, idx) => (
                  <li key={idx}>
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-700 font-semibold flex items-center gap-2"
                    >
                      {resource.label}
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </article>
      <CommentSection />
    </>
  );
}
