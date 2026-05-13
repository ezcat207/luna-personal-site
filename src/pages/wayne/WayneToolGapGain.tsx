import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SEOHead } from '../../components/SEOHead';
import { Plus, X, ArrowLeft, ChevronRight } from 'lucide-react';

export default function WayneToolGapGain() {
  const [goal, setGoal] = useState('');
  const [startPoint, setStartPoint] = useState('');
  const [gains, setGains] = useState<string[]>(['']);
  const [showResult, setShowResult] = useState(false);

  const addGain = () => setGains([...gains, '']);
  const updateGain = (i: number, val: string) => {
    const next = [...gains];
    next[i] = val;
    setGains(next);
  };
  const removeGain = (i: number) => setGains(gains.filter((_, idx) => idx !== i));

  const filledGains = gains.filter(g => g.trim().length > 0);
  const canReflect = goal.trim() && startPoint.trim() && filledGains.length > 0;

  const reset = () => {
    setGoal('');
    setStartPoint('');
    setGains(['']);
    setShowResult(false);
  };

  return (
    <>
      <SEOHead
        title="Gap & Gain Reflector — Wayne's Tools"
        description="Stop measuring only how far you are from your goal. See how far you've already come."
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
            <span className="inline-block bg-emerald-50 text-emerald-600 text-xs font-semibold px-2.5 py-1 rounded-full mb-3">
              Mindset · Gap & Gain
            </span>
            <h1 className="text-3xl font-bold text-slate-900 mb-3">Gap & Gain Reflector</h1>
            <p className="text-slate-500 leading-relaxed">
              Most people measure progress by how far they still need to go — the <span className="font-semibold text-slate-700">Gap</span>. Dan Sullivan's insight: your motivation and confidence come from measuring how far you've come — the <span className="font-semibold text-emerald-600">Gain</span>. Fill in the three fields below.
            </p>
          </div>

          <AnimatePresence mode="wait">
            {!showResult ? (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                {/* Goal */}
                <div className="bg-white border border-slate-200 rounded-xl p-6">
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    🎯 Your goal or ideal state
                  </label>
                  <p className="text-xs text-slate-400 mb-3">
                    The destination you're measuring yourself against. Be specific.
                  </p>
                  <textarea
                    value={goal}
                    onChange={e => setGoal(e.target.value)}
                    placeholder="e.g. Luna ships an AI project independently, without my guidance"
                    rows={2}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 resize-none"
                  />
                </div>

                {/* Starting point */}
                <div className="bg-white border border-slate-200 rounded-xl p-6">
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    📍 Where you started
                  </label>
                  <p className="text-xs text-slate-400 mb-3">
                    Your genuine baseline — before this journey began.
                  </p>
                  <textarea
                    value={startPoint}
                    onChange={e => setStartPoint(e.target.value)}
                    placeholder="e.g. Luna had never written a line of code, didn't know what a variable was"
                    rows={2}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 resize-none"
                  />
                </div>

                {/* Gains list */}
                <div className="bg-white border border-slate-200 rounded-xl p-6">
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    ✅ What you've gained since then
                  </label>
                  <p className="text-xs text-slate-400 mb-4">
                    List every milestone, skill, insight, or result — no matter how small it seems.
                  </p>
                  <div className="space-y-2">
                    {gains.map((g, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className="text-emerald-400 text-sm font-bold w-5 shrink-0">#{i + 1}</span>
                        <input
                          value={g}
                          onChange={e => updateGain(i, e.target.value)}
                          placeholder={`Gain ${i + 1}…`}
                          className="flex-1 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-50"
                        />
                        {gains.length > 1 && (
                          <button
                            onClick={() => removeGain(i)}
                            className="text-slate-300 hover:text-red-400 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={addGain}
                    className="mt-3 flex items-center gap-1.5 text-sm text-slate-400 hover:text-emerald-600 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add another gain
                  </button>
                </div>

                {/* Submit */}
                <button
                  onClick={() => setShowResult(true)}
                  disabled={!canReflect}
                  className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all ${
                    canReflect
                      ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm'
                      : 'bg-slate-100 text-slate-300 cursor-not-allowed'
                  }`}
                >
                  See your Gain →
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Progress bar */}
                <div className="bg-white border border-slate-200 rounded-xl p-6">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Your Journey</p>

                  {/* Timeline */}
                  <div className="relative mb-6">
                    <div className="flex items-center gap-0 w-full">
                      {/* Start node */}
                      <div className="shrink-0 text-center">
                        <div className="w-3 h-3 rounded-full bg-slate-300 mx-auto mb-1" />
                        <p className="text-xs text-slate-400 font-medium">Start</p>
                      </div>
                      {/* Gain bar */}
                      <div className="flex-[2] h-2.5 bg-emerald-400 rounded-l-full relative">
                        <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-xs font-bold text-emerald-600 whitespace-nowrap">
                          ✦ THE GAIN
                        </span>
                      </div>
                      {/* Now node */}
                      <div className="shrink-0 text-center">
                        <div className="w-4 h-4 rounded-full bg-indigo-600 border-2 border-white shadow mx-auto mb-1" />
                        <p className="text-xs text-indigo-600 font-bold">You Now</p>
                      </div>
                      {/* Gap bar */}
                      <div className="flex-[1] h-2.5 bg-slate-200 rounded-r-full relative">
                        <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-xs font-medium text-slate-400 whitespace-nowrap">
                          the gap
                        </span>
                      </div>
                      {/* Goal node */}
                      <div className="shrink-0 text-center">
                        <div className="w-3 h-3 rounded-full bg-slate-300 border border-dashed border-slate-400 mx-auto mb-1" />
                        <p className="text-xs text-slate-400 font-medium">Goal</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm mt-2">
                    <div>
                      <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide mb-1">Where you started</p>
                      <p className="text-slate-700 leading-snug">{startPoint}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide mb-1">Your goal</p>
                      <p className="text-slate-700 leading-snug">{goal}</p>
                    </div>
                  </div>
                </div>

                {/* Gains */}
                <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-6">
                  <p className="text-sm font-bold text-emerald-700 mb-4">
                    {filledGains.length} gain{filledGains.length > 1 ? 's' : ''} — all real, all yours
                  </p>
                  <ul className="space-y-2.5">
                    {filledGains.map((gain, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.06 }}
                        className="flex items-start gap-3"
                      >
                        <span className="w-5 h-5 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                          ✓
                        </span>
                        <span className="text-slate-700 text-sm leading-snug">{gain}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Reframe */}
                <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6">
                  <p className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-2">The Reframe</p>
                  <p className="text-slate-700 leading-relaxed text-sm">
                    You didn't start where you are now. Everything listed above is real progress — not luck, not coincidence. The gap to your goal is real, but it's smaller than it looks from here. Measure backward more often.
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={reset}
                    className="flex-1 py-3 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-white transition-all"
                  >
                    Start over
                  </button>
                  <Link
                    to="/wayne/tools/must-have"
                    className="flex-1 py-3 bg-indigo-600 text-white rounded-xl text-sm font-semibold text-center hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
                  >
                    Try Must Have / Want Have
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
