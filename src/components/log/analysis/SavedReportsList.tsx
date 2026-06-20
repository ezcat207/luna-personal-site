import { useState } from 'react';
import { motion } from 'framer-motion';
import type { SavedReport } from '../../../types/log';
import { formatDateShort, formatRelativeTime } from '../../../utils/log/formatters';

interface SavedReportsListProps {
  reports: SavedReport[];
  onSelect: (report: SavedReport) => void;
  onDelete: (id: string) => void;
}

export function SavedReportsList({ reports, onSelect, onDelete }: SavedReportsListProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string, reportName: string) => {
    const confirmed = window.confirm(`Delete "${reportName}"? This cannot be undone.`);
    if (!confirmed) return;

    setDeletingId(id);
    await onDelete(id);
    setDeletingId(null);
  };

  if (reports.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-100 p-4 shadow-sm">
        <h3 className="text-sm font-bold text-slate-600 mb-3 flex items-center gap-2">
          📁 Saved Reports
          <span className="text-xs text-slate-400 font-normal">(0)</span>
        </h3>
        <div className="text-xs text-slate-400 text-center py-8">
          <div className="text-4xl mb-3">📁</div>
          <p>
            No saved reports yet.
            <br />
            Save your first analysis! 🐰
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-100 p-4 shadow-sm">
      <h3 className="text-sm font-bold text-slate-600 mb-3 flex items-center gap-2">
        📁 Saved Reports
        <span className="text-xs text-slate-400 font-normal">({reports.length})</span>
      </h3>

      <div className="space-y-2 max-h-[400px] overflow-y-auto">
        {reports.map((report, index) => (
          <motion.div
            key={report.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: index * 0.03 }}
            className="border border-slate-100 rounded-lg p-3 hover:border-pink-200 transition-all group"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1 min-w-0">
                <button
                  onClick={() => onSelect(report)}
                  className="text-sm font-medium text-slate-700 hover:text-pink-600 text-left truncate block w-full transition-colors"
                  title={report.report_name}
                >
                  {report.report_name}
                </button>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  {formatDateShort(report.date_start)} - {formatDateShort(report.date_end)}
                </p>
                <p className="text-[9px] text-slate-300 mt-0.5">
                  Saved {formatRelativeTime(report.created_at)}
                </p>
              </div>
              <button
                onClick={() => handleDelete(report.id, report.report_name)}
                disabled={deletingId === report.id}
                className="text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 disabled:opacity-50 ml-2"
                title="Delete report"
              >
                {deletingId === report.id ? '⏳' : '🗑️'}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
