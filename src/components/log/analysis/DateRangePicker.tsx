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
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl border-2 border-pink-100 p-3 shadow-sm">
      <div className="flex flex-col md:flex-row gap-2 items-start md:items-center">
        {/* Custom date inputs */}
        <div className="flex items-center gap-2 flex-wrap">
          <label className="text-[10px] font-bold text-slate-600">From</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => onRangeChange(e.target.value, endDate)}
            max={maxDate}
            className={`border-2 rounded-xl px-2 py-1 text-xs focus:outline-none focus:ring-2 ${
              isValid ? 'border-pink-200 focus:ring-pink-300' : 'border-red-300 focus:ring-red-300'
            }`}
          />

          <span className="text-pink-300 hidden sm:inline text-sm">→</span>
          <span className="text-pink-300 sm:hidden text-[10px]">to</span>

          <label className="text-[10px] font-bold text-slate-600">To</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => onRangeChange(startDate, e.target.value)}
            min={startDate}
            max={maxDate}
            className={`border-2 rounded-xl px-2 py-1 text-xs focus:outline-none focus:ring-2 ${
              isValid ? 'border-pink-200 focus:ring-pink-300' : 'border-red-300 focus:ring-red-300'
            }`}
          />
        </div>

        {/* Quick filters */}
        <div className="flex gap-1.5 flex-wrap">
          <button
            onClick={setLast7Days}
            className="px-3 py-1 rounded-full text-[10px] font-bold bg-pink-100 text-pink-600 hover:bg-pink-200 transition-colors"
          >
            Last 7 Days
          </button>
          <button
            onClick={setLast30Days}
            className="px-3 py-1 rounded-full text-[10px] font-bold bg-pink-100 text-pink-600 hover:bg-pink-200 transition-colors"
          >
            Last 30 Days
          </button>
          <button
            onClick={setThisMonth}
            className="px-3 py-1 rounded-full text-[10px] font-bold bg-pink-100 text-pink-600 hover:bg-pink-200 transition-colors"
          >
            This Month
          </button>
        </div>
      </div>

      {/* Validation error */}
      {!isValid && (
        <div className="mt-2 text-[10px] text-red-700 bg-red-50 border border-red-200 rounded-lg px-2 py-1.5">
          ⚠️ End date must be after start date and not in the future
        </div>
      )}
    </div>
  );
}
