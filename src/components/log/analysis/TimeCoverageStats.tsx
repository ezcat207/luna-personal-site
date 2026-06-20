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
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl border-2 border-pink-100 p-4 shadow-sm">
      <h3 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
        <span>⏰ Time Coverage</span>
        <span className="text-[10px] text-slate-500 font-normal">
          ({totalDays} {totalDays === 1 ? 'day' : 'days'})
        </span>
      </h3>

      <div className="space-y-1.5 text-xs text-slate-700">
        <div className="flex justify-between">
          <span className="text-slate-600">Total Available:</span>
          <span className="font-bold text-slate-800">{formatMins(totalAvailableMins)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-blue-600">📊 Planned Time:</span>
          <span className="font-bold text-blue-700">{formatMins(totalPlannedMins)} <span className="text-[10px]">({plannedCoverage.toFixed(1)}%)</span></span>
        </div>
        <div className="flex justify-between">
          <span className="text-green-600">✅ Actual Time:</span>
          <span className="font-bold text-green-700">{formatMins(totalActualMins)} <span className="text-[10px]">({actualCoverage.toFixed(1)}%)</span></span>
        </div>
      </div>

      {/* Dual progress bar */}
      <div className="mt-3 relative h-6 bg-amber-100 rounded-full overflow-hidden">
        {/* Planned time bar (blue, background layer) */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(plannedCoverage, 100)}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="absolute inset-y-0 left-0 bg-blue-300 opacity-60"
        />
        {/* Actual time bar (green, foreground layer) */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(actualCoverage, 100)}%` }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
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
        <p className="mt-2 text-[10px] text-amber-700 bg-amber-50 px-2 py-1.5 rounded-lg border border-amber-200">
          ⚠️ You planned {formatMins(totalPlannedMins - totalActualMins)} more than you completed
        </p>
      )}
      {coverageDiff > 1 && (
        <p className="mt-2 text-[10px] text-green-700 bg-green-50 px-2 py-1.5 rounded-lg border border-green-200">
          🎉 Great job! You exceeded your plan by {formatMins(totalActualMins - totalPlannedMins)}
        </p>
      )}
    </div>
  );
}
