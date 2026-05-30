import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, BookOpen, Lightbulb, ArrowRight } from 'lucide-react';
import { wayneInsights } from '../data/wayneInsights';
import { wayneWeeks } from '../data/wayneWeeks';

// ── Types ──────────────────────────────────────────────────────────────────────

type ResultType = 'insight' | 'plan';

interface SearchResult {
  type: ResultType;
  id: string | number;
  title: string;
  subtitle?: string;
  snippet: string;
  path: string;
  tags?: string[];
}

// ── Build search index once at module load ─────────────────────────────────────

function buildIndex(): SearchResult[] {
  const out: SearchResult[] = [];

  for (const w of wayneWeeks) {
    out.push({
      type: 'plan',
      id: w.week,
      title: w.title,
      snippet: w.summary,
      path: `/wayne/plan/${w.week}`,
      tags: w.tools,
    });
  }

  for (const ins of wayneInsights) {
    if ((ins as { draft?: boolean }).draft) continue;
    out.push({
      type: 'insight',
      id: ins.id,
      title: ins.title,
      subtitle: ins.subtitle,
      snippet: ins.summary,
      path: `/wayne/insights/${ins.id}`,
      tags: ins.tags,
    });
  }

  return out;
}

const INDEX = buildIndex();

function runSearch(query: string): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return INDEX.filter(
    (item) =>
      item.title.toLowerCase().includes(q) ||
      item.subtitle?.toLowerCase().includes(q) ||
      item.snippet.toLowerCase().includes(q) ||
      item.tags?.some((t) => t.toLowerCase().includes(q)),
  ).slice(0, 14);
}

// ── Highlight matching text ────────────────────────────────────────────────────

function Highlight({ text, query }: { text: string; query: string }) {
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (!query || idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-yellow-100 text-yellow-800 rounded-sm not-italic">
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </>
  );
}

// ── Result row ─────────────────────────────────────────────────────────────────

function ResultRow({
  result,
  query,
  onSelect,
}: {
  result: SearchResult;
  query: string;
  onSelect: (r: SearchResult) => void;
}) {
  return (
    <button
      onClick={() => onSelect(result)}
      className="w-full text-left px-4 py-3 hover:bg-slate-50 transition-colors flex items-start gap-3 group"
    >
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-slate-800 truncate">
          <Highlight text={result.title} query={query} />
        </p>
        {result.subtitle && (
          <p className="text-xs text-slate-500 truncate mt-0.5">
            <Highlight text={result.subtitle} query={query} />
          </p>
        )}
        <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">{result.snippet}</p>
        {result.tags && result.tags.length > 0 && (
          <div className="flex gap-1.5 mt-1.5 flex-wrap">
            {result.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-1.5 py-0.5 bg-indigo-50 text-indigo-500 rounded text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-indigo-400 mt-0.5 flex-shrink-0 transition-colors" />
    </button>
  );
}

// ── Section header ─────────────────────────────────────────────────────────────

function SectionLabel({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-1.5 px-4 pt-3 pb-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wide">
      {icon}
      {label}
    </div>
  );
}

// ── Modal ──────────────────────────────────────────────────────────────────────

interface WayneSearchModalProps {
  open: boolean;
  onClose: () => void;
}

const HINTS = ['AI', 'SEO', 'Luna', 'Git', 'FFmpeg', '跳棋', 'workflow'];

export function WayneSearchModal({ open, onClose }: WayneSearchModalProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const results = runSearch(query);
  const planResults = results.filter((r) => r.type === 'plan');
  const insightResults = results.filter((r) => r.type === 'insight');

  // Auto-focus & clear on open
  useEffect(() => {
    if (open) {
      setQuery('');
      const t = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(t);
    }
  }, [open]);

  // Esc to close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const handleSelect = (result: SearchResult) => {
    navigate(result.path);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -12 }}
            transition={{ duration: 0.15 }}
            className="fixed z-50 left-1/2 -translate-x-1/2 top-[10vh] w-full max-w-xl px-4"
          >
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">

              {/* Input row */}
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-100">
                <Search className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search insights, plans…"
                  className="flex-1 text-sm text-slate-800 placeholder-slate-400 bg-transparent outline-none"
                />
                {query ? (
                  <button
                    onClick={() => setQuery('')}
                    className="text-slate-300 hover:text-slate-500 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                ) : null}
                <button
                  onClick={onClose}
                  className="text-xs text-slate-400 border border-slate-200 rounded px-1.5 py-0.5 font-mono hover:border-slate-300 transition-colors select-none"
                >
                  esc
                </button>
              </div>

              {/* Results */}
              {query.trim() ? (
                <div className="max-h-[60vh] overflow-y-auto">
                  {results.length === 0 ? (
                    <p className="px-5 py-8 text-center text-sm text-slate-400">
                      No results for &ldquo;{query}&rdquo;
                    </p>
                  ) : (
                    <div className="pb-2">
                      {planResults.length > 0 && (
                        <>
                          <SectionLabel icon={<BookOpen className="w-3.5 h-3.5" />} label="Teaching Plans" />
                          {planResults.map((r) => (
                            <ResultRow key={`plan-${r.id}`} result={r} query={query} onSelect={handleSelect} />
                          ))}
                        </>
                      )}
                      {insightResults.length > 0 && (
                        <>
                          <SectionLabel icon={<Lightbulb className="w-3.5 h-3.5" />} label="Insights" />
                          {insightResults.map((r) => (
                            <ResultRow key={`insight-${r.id}`} result={r} query={query} onSelect={handleSelect} />
                          ))}
                        </>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                /* Empty state — hint chips */
                <div className="px-5 py-5">
                  <p className="text-xs font-semibold text-slate-500 mb-2.5">Try searching for:</p>
                  <div className="flex flex-wrap gap-2">
                    {HINTS.map((hint) => (
                      <button
                        key={hint}
                        onClick={() => setQuery(hint)}
                        className="px-2.5 py-1 bg-slate-100 text-slate-500 rounded-full text-xs hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                      >
                        {hint}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
