import { todayStr, offsetDate } from '../../../utils/log/formatters';

interface DateRangePickerProps {
  startDate: string;
  endDate: string;
  onRangeChange: (start: string, end: string) => void;
}

export function DateRangePicker({ startDate, endDate, onRangeChange }: DateRangePickerProps) {
  const today = todayStr();
  const maxDate = today;

  const setLast7Days = () => {
    const end = today;
    const start = offsetDate(today, -6);
    onRangeChange(start, end);
  };

  const setLast30Days = () => {
    const end = today;
    const start = offsetDate(today, -29);
    onRangeChange(start, end);
  };

  const setThisMonth = () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().slice(0, 10);
    const end = today;
    onRangeChange(start, end);
  };

  // Validation
  const isValid = endDate >= startDate && endDate <= maxDate;

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div className="flex flex-col md:flex-row gap-3 items-start md:items-center">
        {/* Custom date inputs */}
        <div className="flex items-center gap-2 flex-wrap">
          <label className="text-xs font-semibold text-slate-600">From</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => onRangeChange(e.target.value, endDate)}
            max={maxDate}
            className={`border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
              isValid ? 'border-slate-300 focus:ring-indigo-300' : 'border-red-400 focus:ring-red-300'
            }`}
          />

          <span className="text-slate-300 hidden sm:inline">→</span>
          <span className="text-slate-300 sm:hidden text-xs">to</span>

          <label className="text-xs font-semibold text-slate-600">To</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => onRangeChange(startDate, e.target.value)}
            min={startDate}
            max={maxDate}
            className={`border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
              isValid ? 'border-slate-300 focus:ring-indigo-300' : 'border-red-400 focus:ring-red-300'
            }`}
          />
        </div>

        {/* Quick filters */}
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={setLast7Days}
            className="px-3 py-1.5 rounded-md text-xs font-semibold bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition-colors"
          >
            Last 7 Days
          </button>
          <button
            onClick={setLast30Days}
            className="px-3 py-1.5 rounded-md text-xs font-semibold bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition-colors"
          >
            Last 30 Days
          </button>
          <button
            onClick={setThisMonth}
            className="px-3 py-1.5 rounded-md text-xs font-semibold bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition-colors"
          >
            This Month
          </button>
        </div>
      </div>

      {/* Validation error */}
      {!isValid && (
        <div className="mt-2 text-xs text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          ⚠️ End date must be after start date and not in the future
        </div>
      )}
    </div>
  );
}
