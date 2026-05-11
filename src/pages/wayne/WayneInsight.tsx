import { useParams, Link } from 'react-router';
import { getWayneInsightById } from '../../data/wayneInsights';
import { SEOHead } from '../../components/SEOHead';

export default function WayneInsight() {
  const { id } = useParams<{ id: string }>();
  const insight = getWayneInsightById(Number(id));

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

  return (
    <>
      <SEOHead
        title={`${insight.title} - Wayne's Insights`}
        description={insight.summary}
      />
      <article className="min-h-screen bg-slate-50 py-12">
        <div className="max-w-4xl mx-auto px-6">
          {/* Back Link */}
          <Link
            to="/wayne/insights"
            className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold mb-8"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Insights
          </Link>

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
                <div className="flex gap-2">
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
              {insight.title}
            </h1>
            {insight.subtitle && (
              <p className="text-2xl text-slate-600 mb-6">{insight.subtitle}</p>
            )}
            <p className="text-xl text-slate-700 leading-relaxed">
              {insight.summary}
            </p>
          </header>

          {/* Featured Image */}
          {insight.imageUrl && (
            <div className="mb-12 rounded-xl overflow-hidden border border-slate-200 bg-white p-4">
              <img
                src={insight.imageUrl}
                alt={insight.title}
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
                    alt={`${insight.title} — ${idx + 1}`}
                    className="w-full h-auto"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Content */}
          <div className="prose prose-lg prose-slate max-w-none mb-12">
            {insight.content.map((paragraph, idx) => {
              if (paragraph.startsWith('## ')) {
                return (
                  <h2 key={idx} className="text-2xl font-bold text-slate-900 mt-10 mb-4">
                    {paragraph.slice(3)}
                  </h2>
                );
              }
              return (
                <p key={idx} className="text-slate-700 leading-relaxed mb-4">
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* Key Takeaways */}
          {insight.keyTakeaways && insight.keyTakeaways.length > 0 && (
            <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-8 mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Key Takeaways
              </h2>
              <ul className="space-y-3">
                {insight.keyTakeaways.map((takeaway, idx) => (
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
                Related Resources
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
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </article>
    </>
  );
}
