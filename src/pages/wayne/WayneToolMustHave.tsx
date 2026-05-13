import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SEOHead } from '../../components/SEOHead';
import { Plus, X, ArrowLeft } from 'lucide-react';

type ItemStatus = 'unsorted' | 'must' | 'want';

interface Item {
  id: number;
  text: string;
  status: ItemStatus;
}

let nextId = 1;

export default function WayneToolMustHave() {
  const [input, setInput] = useState('');
  const [items, setItems] = useState<Item[]>([]);
  const [showInsight, setShowInsight] = useState(false);

  const addItem = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setItems(prev => [...prev, { id: nextId++, text: trimmed, status: 'unsorted' }]);
    setInput('');
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') addItem();
  };

  const setStatus = (id: number, status: ItemStatus) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, status } : item));
    // check if all sorted
    const updated = items.map(item => item.id === id ? { ...item, status } : item);
    if (updated.length > 0 && updated.every(i => i.status !== 'unsorted')) {
      setShowInsight(true);
    }
  };

  const removeItem = (id: number) => {
    setItems(prev => prev.filter(item => item.id !== id));
    setShowInsight(false);
  };

  const reset = () => {
    setItems([]);
    setInput('');
    setShowInsight(false);
  };

  const mustHaves = items.filter(i => i.status === 'must');
  const wantHaves = items.filter(i => i.status === 'want');
  const unsorted = items.filter(i => i.status === 'unsorted');
  const allSorted = items.length > 0 && unsorted.length === 0;

  return (
    <>
      <SEOHead
        title="Must Have / Want Have Sorter — Wayne's Tools"
        description="Clarify your real priorities: what's a genuine Must Have vs what's just a Want Have."
      />
      <div className="min-h-screen bg-slate-50 py-12">
        <div className="max-w-2xl mx-auto px-6">

          {/* Back */}
          <Link
            to="/wayne/tools"
            className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Tools
          </Link>

          {/* Header */}
          <div className="mb-10">
            <span className="inline-block bg-violet-50 text-violet-600 text-xs font-semibold px-2.5 py-1 rounded-full mb-3">
              Clarity · Must Have / Want Have
            </span>
            <h1 className="text-3xl font-bold text-slate-900 mb-3">Must Have / Want Have Sorter</h1>
            <p className="text-slate-500 leading-relaxed">
              The insight: you're not avoiding things you <em>don't</em> want — you're avoiding things you don't want <span className="font-semibold text-slate-700">enough</span>. Sort your list into <span className="font-semibold text-indigo-600">Must Have</span> (non-negotiable) and <span className="font-semibold text-violet-600">Want Have</span> (nice, but not critical). What's left tells you where to actually spend your energy.
            </p>
          </div>

          {/* Input */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 mb-6">
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              Add your items — goals, tasks, decisions, anything you're weighing
            </label>
            <div className="flex gap-2">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Type an item and press Enter…"
                className="flex-1 border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-50"
              />
              <button
                onClick={addItem}
                disabled={!input.trim()}
                className={`px-4 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-1.5 transition-all ${
                  input.trim()
                    ? 'bg-violet-600 text-white hover:bg-violet-700'
                    : 'bg-slate-100 text-slate-300 cursor-not-allowed'
                }`}
              >
                <Plus className="w-4 h-4" />
                Add
              </button>
            </div>
            {items.length === 0 && (
              <div className="mt-4 p-3 bg-slate-50 rounded-lg">
                <p className="text-xs text-slate-400">
                  <strong>Examples:</strong> Ship Wayne Insight #9 · Start morning run habit · Buy new laptop · Learn Mandarin · Read 2 books/month · Date night weekly
                </p>
              </div>
            )}
          </div>

          {/* Unsorted items */}
          {unsorted.length > 0 && (
            <div className="bg-white border border-slate-200 rounded-xl p-6 mb-6">
              <p className="text-sm font-semibold text-slate-700 mb-4">
                Sort each item — be honest, not aspirational
              </p>
              <div className="space-y-3">
                <AnimatePresence>
                  {unsorted.map(item => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100"
                    >
                      <span className="flex-1 text-sm text-slate-800">{item.text}</span>
                      <div className="flex gap-2 shrink-0">
                        <button
                          onClick={() => setStatus(item.id, 'must')}
                          className="px-3 py-1.5 text-xs font-bold rounded-lg border-2 border-indigo-300 text-indigo-600 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all"
                        >
                          Must Have
                        </button>
                        <button
                          onClick={() => setStatus(item.id, 'want')}
                          className="px-3 py-1.5 text-xs font-bold rounded-lg border-2 border-violet-300 text-violet-600 hover:bg-violet-600 hover:text-white hover:border-violet-600 transition-all"
                        >
                          Want Have
                        </button>
                        <button onClick={() => removeItem(item.id)} className="text-slate-300 hover:text-red-400 transition-colors">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          )}

          {/* Sorted results */}
          {(mustHaves.length > 0 || wantHaves.length > 0) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {/* Must Have */}
              <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-bold text-indigo-700">Must Have</p>
                  <span className="text-xs font-bold text-indigo-400 bg-indigo-100 px-2 py-0.5 rounded-full">
                    {mustHaves.length}
                  </span>
                </div>
                {mustHaves.length === 0 ? (
                  <p className="text-xs text-indigo-300 italic">Nothing here yet</p>
                ) : (
                  <ul className="space-y-2">
                    <AnimatePresence>
                      {mustHaves.map(item => (
                        <motion.li
                          key={item.id}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="flex items-start gap-2"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                          <span className="text-sm text-indigo-800 leading-snug">{item.text}</span>
                          <button
                            onClick={() => setStatus(item.id, 'unsorted')}
                            className="ml-auto text-indigo-300 hover:text-indigo-500 shrink-0"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </motion.li>
                      ))}
                    </AnimatePresence>
                  </ul>
                )}
              </div>

              {/* Want Have */}
              <div className="bg-violet-50 border border-violet-100 rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-bold text-violet-700">Want Have</p>
                  <span className="text-xs font-bold text-violet-400 bg-violet-100 px-2 py-0.5 rounded-full">
                    {wantHaves.length}
                  </span>
                </div>
                {wantHaves.length === 0 ? (
                  <p className="text-xs text-violet-300 italic">Nothing here yet</p>
                ) : (
                  <ul className="space-y-2">
                    <AnimatePresence>
                      {wantHaves.map(item => (
                        <motion.li
                          key={item.id}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="flex items-start gap-2"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-1.5 shrink-0" />
                          <span className="text-sm text-violet-800 leading-snug">{item.text}</span>
                          <button
                            onClick={() => setStatus(item.id, 'unsorted')}
                            className="ml-auto text-violet-300 hover:text-violet-500 shrink-0"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </motion.li>
                      ))}
                    </AnimatePresence>
                  </ul>
                )}
              </div>
            </div>
          )}

          {/* Insight — shown when all sorted */}
          <AnimatePresence>
            {allSorted && showInsight && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                <div className="bg-slate-900 text-white rounded-xl p-6">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">The Clarity</p>
                  {mustHaves.length === 0 ? (
                    <p className="text-slate-300 leading-relaxed text-sm">
                      Nothing made the Must Have list. That's data — either nothing on this list is truly non-negotiable, or you're being too generous with "want." Worth sitting with.
                    </p>
                  ) : wantHaves.length === 0 ? (
                    <p className="text-slate-300 leading-relaxed text-sm">
                      Everything is a Must Have. Check: are these genuinely non-negotiable, or have you lost the ability to distinguish? Real Must Haves are rare. If you have more than 5, revisit.
                    </p>
                  ) : (
                    <>
                      <p className="text-white font-semibold mb-2">
                        {mustHaves.length} Must Have · {wantHaves.length} Want Have
                      </p>
                      <p className="text-slate-300 leading-relaxed text-sm">
                        Your energy and attention belong to the <span className="text-indigo-300 font-semibold">{mustHaves.length} Must Have{mustHaves.length > 1 ? 's' : ''}</span> first. The <span className="text-violet-300 font-semibold">{wantHaves.length} Want Have{wantHaves.length > 1 ? 's' : ''}</span> are real — but they shouldn't compete for resources until the Must Haves are moving. You're not ignoring them. You're sequencing correctly.
                      </p>
                    </>
                  )}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={reset}
                    className="flex-1 py-3 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-white transition-all"
                  >
                    Start over
                  </button>
                  <Link
                    to="/wayne/tools/gap-gain"
                    className="flex-1 py-3 bg-indigo-600 text-white rounded-xl text-sm font-semibold text-center hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
                  >
                    Try Gap & Gain Reflector
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Prompt to finish sorting */}
          {items.length > 0 && unsorted.length > 0 && (
            <p className="text-center text-slate-400 text-xs mt-4">
              {unsorted.length} item{unsorted.length > 1 ? 's' : ''} left to sort — the insight appears when you're done
            </p>
          )}

          {/* Empty state */}
          {items.length === 0 && (
            <div className="text-center py-8">
              <p className="text-slate-400 text-sm">Add at least 3 items to make the sort meaningful.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
