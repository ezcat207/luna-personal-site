import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { AggregatedSubject } from '../../../types/log';
import { formatMins } from '../../../utils/log/formatters';
import { getSubjectColor } from '../../../utils/log/aggregation';

interface SubjectCardProps {
  data: AggregatedSubject;
  index: number;
}

export function SubjectCard({ data, index }: SubjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const {
    subject,
    emoji,
    totalTasks,
    doneTasks,
    completionRate,
    totalEstMins,
    totalActualMins,
    totalWrong,
    subTasks,
  } = data;

  const colorClass = getSubjectColor(subject);
  const hasSubtasks = subTasks && subTasks.length > 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: index * 0.02 }}
      className="bg-white/90 backdrop-blur-sm rounded-2xl border-2 border-pink-100 p-4 shadow-sm hover:shadow-md hover:border-pink-200 transition-all"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{emoji || '📚'}</span>
          <div>
            <h3 className="font-bold text-slate-700 capitalize text-sm">{subject}</h3>
            <p className="text-[10px] text-slate-400 mt-0.5">
              {doneTasks}/{totalTasks} tasks · {completionRate.toFixed(0)}%
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-pink-600">
            {formatMins(totalActualMins)}
          </div>
          {totalEstMins > 0 && (
            <div className="text-[10px] text-slate-400">
              est: {formatMins(totalEstMins)}
            </div>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-2">
        <div className="w-full h-2 bg-amber-100 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(completionRate, 100)}%` }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.02 + 0.15 }}
            className={`h-full ${colorClass}`}
          />
        </div>
      </div>

      {/* Stats Row */}
      {totalWrong > 0 && (
        <div className="flex items-center gap-1 text-[10px] text-red-600 mb-2 bg-red-50 px-2 py-1 rounded-lg border border-red-100">
          <span className="font-semibold">❌ {totalWrong} wrong</span>
        </div>
      )}

      {/* Expand Button */}
      {hasSubtasks && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-[10px] text-pink-500 hover:text-pink-700 font-bold transition-colors"
        >
          {isExpanded ? '▲ Hide details' : '▼ Show details'}
        </button>
      )}

      {/* Subtask Breakdown */}
      <AnimatePresence>
        {isExpanded && hasSubtasks && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-2 pt-2 border-t border-dashed border-pink-100 space-y-1 overflow-hidden"
          >
            {subTasks.map((sub, i) => (
              <div key={i} className="flex justify-between items-center text-[10px] bg-amber-50 px-2 py-1.5 rounded-lg">
                <span className="text-slate-600 font-medium">└─ {sub.subject}</span>
                <div className="flex gap-2 text-slate-500">
                  <span className="font-bold text-pink-600">{formatMins(sub.totalActualMins)}</span>
                  <span>{sub.doneTasks}/{sub.totalTasks}</span>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
