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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
      className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm hover:shadow-md transition-all"
      style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{emoji || '📚'}</span>
          <div>
            <h3 className="font-semibold text-slate-800 capitalize text-base">{subject}</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {doneTasks}/{totalTasks} tasks · {completionRate.toFixed(0)}% complete
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xl font-bold text-indigo-600">
            {formatMins(totalActualMins)}
          </div>
          {totalEstMins > 0 && (
            <div className="text-xs text-slate-400">
              est: {formatMins(totalEstMins)}
            </div>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-3">
        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(completionRate, 100)}%` }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.03 + 0.2 }}
            className={`h-full ${colorClass}`}
          />
        </div>
      </div>

      {/* Stats Row */}
      {totalWrong > 0 && (
        <div className="flex items-center gap-2 text-xs text-slate-600 mb-2 bg-red-50 px-2 py-1.5 rounded">
          <span className="text-red-600 font-semibold">❌ {totalWrong} wrong answers</span>
        </div>
      )}

      {/* Expand Button */}
      {hasSubtasks && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-xs text-indigo-600 hover:text-indigo-700 font-medium transition-colors mt-1"
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
            className="mt-3 pt-3 border-t border-slate-200 space-y-2 overflow-hidden"
          >
            {subTasks.map((sub, i) => (
              <div key={i} className="flex justify-between items-center text-xs bg-slate-50 px-3 py-2 rounded">
                <span className="text-slate-700 font-medium">└─ {sub.subject}</span>
                <div className="flex gap-4 text-slate-500">
                  <span className="font-semibold">{formatMins(sub.totalActualMins)}</span>
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
