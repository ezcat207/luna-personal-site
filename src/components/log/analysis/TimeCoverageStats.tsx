import { motion } from 'framer-motion';
import type { TimeCoverageStats as TimeCoverageStatsType } from '../../../types/log';
import { formatMins } from '../../../utils/log/formatters';

interface TimeCoverageStatsProps {
  stats: TimeCoverageStatsType;
}

export function TimeCoverageStats({ stats }: TimeCoverageStatsProps) {
  const { totalDays, totalAvailableMins, totalPlannedMins, totalActualMins, plannedCoverage, actualCoverage } = stats;

  const coverageDiff = actualCoverage - plannedCoverage;

  return (
    <div className="bg-white rounded-xl border border-pink-100 p-4 shadow-sm">
      <h3 className="text-sm font-bold text-slate-600 mb-3 flex items-center gap-2">
        <span>⏰ Time Coverage</span>
        <span className="text-xs text-slate-400 font-normal">
          ({totalDays} {totalDays === 1 ? 'day' : 'days'})
        </span>
      </h3>

      <div className="space-y-2 text-xs text-slate-600">
        <div className="flex justify-between">
          <span>Total Available:</span>
          <span className="font-bold">{formatMins(totalAvailableMins)}</span>
        </div>
        <div className="flex justify-between text-blue-600">
          <span>📊 Planned Time:</span>
          <span className="font-bold">{formatMins(totalPlannedMins)} ({plannedCoverage.toFixed(1)}%)</span>
        </div>
        <div className="flex justify-between text-green-600">
          <span>✅ Actual Time:</span>
          <span className="font-bold">{formatMins(totalActualMins)} ({actualCoverage.toFixed(1)}%)</span>
        </div>
      </div>

      {/* Dual progress bar */}
      <div className="mt-3 relative h-6 bg-slate-100 rounded-full overflow-hidden">
        {/* Planned time bar (blue, background layer) */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(plannedCoverage, 100)}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="absolute inset-y-0 left-0 bg-blue-300 opacity-60"
        />
        {/* Actual time bar (green, foreground layer) */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(actualCoverage, 100)}%` }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
          className="absolute inset-y-0 left-0 bg-green-400"
        />
        {/* Labels */}
        <div className="relative h-full flex items-center justify-between px-2 text-[10px] font-bold">
          <span className="text-blue-700">Planned</span>
          <span className="text-green-700">Actual</span>
        </div>
      </div>

      {/* Insight */}
      {coverageDiff < -1 && (
        <p className="mt-2 text-[10px] text-amber-600">
          ⚠️ You planned {formatMins(totalPlannedMins - totalActualMins)} more than you completed
        </p>
      )}
      {coverageDiff > 1 && (
        <p className="mt-2 text-[10px] text-green-600">
          🎉 Great job! You exceeded your plan by {formatMins(totalActualMins - totalPlannedMins)}
        </p>
      )}
    </div>
  );
}
