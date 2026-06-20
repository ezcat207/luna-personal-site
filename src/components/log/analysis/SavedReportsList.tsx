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
    return null; // Don't show anything if no saved reports
  }

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
        📁 Saved Reports
        <span className="text-xs text-slate-500 font-normal">({reports.length})</span>
      </h3>

      <div className="space-y-2 max-h-[300px] overflow-y-auto">
        {reports.map((report, index) => (
          <motion.div
            key={report.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: index * 0.03 }}
            className="border border-slate-200 rounded-md p-2.5 hover:border-indigo-300 hover:bg-indigo-50/50 transition-all group"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1 min-w-0">
                <button
                  onClick={() => onSelect(report)}
                  className="text-sm font-medium text-slate-800 hover:text-indigo-600 text-left truncate block w-full transition-colors"
                  title={report.report_name}
                >
                  {report.report_name}
                </button>
                <p className="text-xs text-slate-500 mt-0.5">
                  {formatDateShort(report.date_start)} - {formatDateShort(report.date_end)}
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  {formatRelativeTime(report.created_at)}
                </p>
              </div>
              <button
                onClick={() => handleDelete(report.id, report.report_name)}
                disabled={deletingId === report.id}
                className="text-slate-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 disabled:opacity-50 ml-2 text-sm"
                title="Delete report"
              >
                {deletingId === report.id ? '⏳' : '×'}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
