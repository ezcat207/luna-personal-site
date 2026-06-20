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
    <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      <h3 className="text-base font-semibold text-slate-800 mb-4 flex items-center gap-2">
        <span>⏰ Time Coverage</span>
        <span className="text-xs text-slate-500 font-normal">
          ({totalDays} {totalDays === 1 ? 'day' : 'days'})
        </span>
      </h3>

      <div className="space-y-2.5 text-sm text-slate-700">
        <div className="flex justify-between">
          <span className="text-slate-600">Total Available:</span>
          <span className="font-semibold text-slate-800">{formatMins(totalAvailableMins)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-blue-600">📊 Planned Time:</span>
          <span className="font-semibold text-blue-700">{formatMins(totalPlannedMins)} <span className="text-xs">({plannedCoverage.toFixed(1)}%)</span></span>
        </div>
        <div className="flex justify-between">
          <span className="text-green-600">✅ Actual Time:</span>
          <span className="font-semibold text-green-700">{formatMins(totalActualMins)} <span className="text-xs">({actualCoverage.toFixed(1)}%)</span></span>
        </div>
      </div>

      {/* Dual progress bar */}
      <div className="mt-4 relative h-7 bg-slate-100 rounded-lg overflow-hidden">
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
          className="absolute inset-y-0 left-0 bg-green-500"
        />
        {/* Labels */}
        <div className="relative h-full flex items-center justify-between px-3 text-xs font-semibold">
          <span className="text-blue-800">Planned</span>
          <span className="text-green-800">Actual</span>
        </div>
      </div>

      {/* Insight */}
      {coverageDiff < -1 && (
        <p className="mt-3 text-xs text-amber-700 bg-amber-50 px-3 py-2 rounded">
          ⚠️ You planned {formatMins(totalPlannedMins - totalActualMins)} more than you completed
        </p>
      )}
      {coverageDiff > 1 && (
        <p className="mt-3 text-xs text-green-700 bg-green-50 px-3 py-2 rounded">
          🎉 Great job! You exceeded your plan by {formatMins(totalActualMins - totalPlannedMins)}
        </p>
      )}
    </div>
  );
}
