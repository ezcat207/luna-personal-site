import { Link } from 'react-router';
import { wayneInsights } from '../../data/wayneInsights';
import { SEOHead } from '../../components/SEOHead';

export default function WayneInsights() {
  const sortedInsights = [...wayneInsights]
    .filter((i) => !i.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <>
      <SEOHead
        title="Insights - Wayne's AI Parenting Journey"
        description="Deep dives into AI workflows, parenting strategies, and building with technology. Reflections from a parent teaching kids to build with AI."
      />
      <div className="min-h-screen bg-slate-50 py-12">
        <div className="max-w-4xl mx-auto px-6">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              Insights
            </h1>
            <p className="text-lg text-slate-600">
              Deep dives into AI workflows, parenting strategies, and lessons learned from teaching kids to build with technology.
            </p>
          </div>

          {/* Insights List */}
          <div className="space-y-8">
            {sortedInsights.map((insight) => (
              <Link
                key={insight.id}
                to={`/wayne/insights/${insight.id}`}
                className="block bg-white border border-slate-200 rounded-xl p-8 hover:border-indigo-300 hover:shadow-lg transition-all"
              >
                {/* Date & Tags */}
                <div className="flex items-center gap-4 mb-4">
                  <time className="text-sm text-slate-500">
                    {new Date(insight.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                  {insight.tags && (
                    <div className="flex gap-2">
                      {insight.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-indigo-50 text-indigo-600 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Title & Subtitle */}
                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                  {insight.title}
                </h2>
                {insight.subtitle && (
                  <p className="text-lg text-slate-600 mb-4">{insight.subtitle}</p>
                )}

                {/* Summary */}
                <p className="text-slate-700 mb-6">{insight.summary}</p>

                {/* Key Takeaways Preview */}
                {insight.keyTakeaways && insight.keyTakeaways.length > 0 && (
                  <div className="border-l-4 border-indigo-200 pl-4">
                    <p className="text-sm font-semibold text-slate-700 mb-2">
                      Key Takeaways:
                    </p>
                    <ul className="text-sm text-slate-600 space-y-1">
                      {insight.keyTakeaways.slice(0, 2).map((takeaway, idx) => (
                        <li key={idx}>• {takeaway}</li>
                      ))}
                      {insight.keyTakeaways.length > 2 && (
                        <li className="text-indigo-600">
                          + {insight.keyTakeaways.length - 2} more...
                        </li>
                      )}
                    </ul>
                  </div>
                )}

                {/* Read More */}
                <div className="mt-6 text-indigo-600 font-semibold flex items-center gap-2">
                  Read full article
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
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
