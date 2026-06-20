import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatDateRange, formatMins } from '../../../utils/log/formatters';

interface SaveReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (reportName: string) => void;
  startDate: string;
  endDate: string;
  totalTasks: number;
  totalHours: number;
}

export function SaveReportModal({
  isOpen,
  onClose,
  onSave,
  startDate,
  endDate,
  totalTasks,
  totalHours,
}: SaveReportModalProps) {
  const [reportName, setReportName] = useState('');
  const [saving, setSaving] = useState(false);

  const defaultName = `Analysis ${formatDateRange(startDate, endDate, 'en')}`;

  const handleSave = async () => {
    const name = reportName.trim() || defaultName;
    setSaving(true);
    try {
      await onSave(name);
      setReportName('');
      onClose();
    } catch (err) {
      console.error('Failed to save report:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleClose = () => {
    if (!saving) {
      setReportName('');
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl"
          >
            <h2 className="text-lg font-bold text-slate-700 mb-4">
              💾 Save This Report
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5">
                  Report Name
                </label>
                <input
                  type="text"
                  value={reportName}
                  onChange={(e) => setReportName(e.target.value)}
                  placeholder={defaultName}
                  maxLength={50}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-pink-400"
                  autoFocus
                />
                <p className="text-[10px] text-slate-400 mt-1">
                  {reportName.length}/50 characters
                </p>
              </div>

              <div className="bg-slate-50 rounded-lg p-3 text-xs text-slate-600">
                <p className="font-bold mb-1">Report Details:</p>
                <p>📅 {formatDateRange(startDate, endDate, 'en')}</p>
                <p>📊 {totalTasks} tasks analyzed</p>
                <p>⏱️ {formatMins(Math.round(totalHours * 60))} study time</p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleClose}
                  disabled={saving}
                  className="flex-1 px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex-1 px-4 py-2.5 bg-pink-500 text-white rounded-xl text-sm font-bold hover:bg-pink-600 disabled:opacity-50 transition-colors"
                >
                  {saving ? 'Saving...' : 'Save Report'}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
