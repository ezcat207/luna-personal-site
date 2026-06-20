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
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="bg-white rounded-xl border border-slate-100 p-4 shadow-sm hover:shadow-md transition-shadow"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{emoji || '📚'}</span>
          <div>
            <h3 className="font-bold text-slate-700 capitalize">{subject}</h3>
            <p className="text-xs text-slate-400">
              {totalTasks} tasks · {doneTasks} done
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-slate-600">
            {formatMins(totalActualMins)}
          </div>
          <div className="text-xs text-slate-400">
            {completionRate.toFixed(0)}% complete
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-3">
        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(completionRate, 100)}%` }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.05 + 0.2 }}
            className={`h-full ${colorClass}`}
          />
        </div>
      </div>

      {/* Stats Row */}
      <div className="flex gap-4 text-xs text-slate-500 mb-2">
        <span>⏱️ Est: {formatMins(totalEstMins)}</span>
        {totalWrong > 0 && (
          <span className="text-red-500 font-bold">
            ❌ {totalWrong} wrong
          </span>
        )}
      </div>

      {/* Expand Button */}
      {hasSubtasks && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-xs text-pink-500 hover:text-pink-700 font-medium transition-colors"
        >
          {isExpanded ? '▲ Hide subtasks' : '▼ Show subtasks'}
        </button>
      )}

      {/* Subtask Breakdown */}
      <AnimatePresence>
        {isExpanded && hasSubtasks && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-3 pt-3 border-t border-slate-100 space-y-2 overflow-hidden"
          >
            {subTasks.map((sub, i) => (
              <div key={i} className="flex justify-between text-xs">
                <span className="text-slate-600">└─ {sub.subject}</span>
                <div className="flex gap-3 text-slate-400">
                  <span>{formatMins(sub.totalActualMins)}</span>
                  <span>{sub.completionRate.toFixed(0)}%</span>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
