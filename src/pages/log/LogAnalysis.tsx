import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import { useLogAnalysis } from '../../hooks/useLogAnalysis';
import { useSavedReports } from '../../hooks/useSavedReports';
import { AuthButton } from '../../components/AuthButton';
import { DateRangePicker } from '../../components/log/analysis/DateRangePicker';
import { TimeCoverageStats } from '../../components/log/analysis/TimeCoverageStats';
import { SummaryStats } from '../../components/log/analysis/SummaryStats';
import { SubjectCard } from '../../components/log/analysis/SubjectCard';
import { ExportMarkdownButton } from '../../components/log/analysis/ExportMarkdownButton';
import { SavedReportsList } from '../../components/log/analysis/SavedReportsList';
import { SaveReportModal } from '../../components/log/analysis/SaveReportModal';
import { todayStr, offsetDate } from '../../utils/log/formatters';
import type { SavedReport } from '../../types/log';

export default function LogAnalysis() {
  const { user, authLoading } = useAuth();
  const today = todayStr();

  // Date range state
  const [startDate, setStartDate] = useState(offsetDate(today, -6));
  const [endDate, setEndDate] = useState(today);

  // Fetch analysis data
  const { subjects, timeCoverage, loading, error } = useLogAnalysis(
    startDate,
    endDate,
    user?.id || null
  );

  // Saved reports
  const { reports, saveReport, deleteReport } = useSavedReports(user?.id || null);

  // Save report modal
  const [showSaveModal, setShowSaveModal] = useState(false);

  // Handlers
  const handleRangeChange = (start: string, end: string) => {
    setStartDate(start);
    setEndDate(end);
  };

  const handleSaveReport = async (reportName: string) => {
    if (!timeCoverage) return;

    const totalTasks = subjects.reduce((s, sub) => s + sub.totalTasks, 0);
    const doneTasks = subjects.reduce((s, sub) => s + sub.doneTasks, 0);
    const totalWrong = subjects.reduce((s, sub) => s + sub.totalWrong, 0);

    await saveReport({
      user_id: user!.id,
      report_name: reportName,
      date_start: startDate,
      date_end: endDate,
      summary_data: {
        totalTasks,
        doneTasks,
        totalEstMins: timeCoverage.totalPlannedMins,
        totalActualMins: timeCoverage.totalActualMins,
        totalWrong,
        subjects,
      },
    });
  };

  const handleSelectReport = (report: SavedReport) => {
    setStartDate(report.date_start);
    setEndDate(report.date_end);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Show login template if not authenticated
  if (!authLoading && !user) {
    return <LoginTemplate />;
  }

  // Show loading state
  if (authLoading || loading) {
    return <LoadingSkeleton />;
  }

  // Show error state
  if (error) {
    return <ErrorState error={error} />;
  }

  // Calculate summary stats
  const totalTasks = subjects.reduce((s, sub) => s + sub.totalTasks, 0);
  const doneTasks = subjects.reduce((s, sub) => s + sub.doneTasks, 0);
  const totalHours = timeCoverage ? timeCoverage.totalActualMins / 60 : 0;

  // Filter subjects with actual data (totalTasks > 0)
  const activeSubjects = subjects.filter(s => s.totalTasks > 0);

  return (
    <div className="min-h-screen bg-slate-50 p-4" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="text-indigo-600 hover:text-indigo-700 text-sm font-medium transition-colors"
            >
              ← Back to Log
            </Link>
            <h1 className="text-2xl font-bold text-slate-800">📊 Learning Analysis</h1>
          </div>
          <AuthButton lang="en" />
        </div>

        {/* Date Range + Export */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <DateRangePicker
              startDate={startDate}
              endDate={endDate}
              onRangeChange={handleRangeChange}
            />
          </div>
          <ExportMarkdownButton
            startDate={startDate}
            endDate={endDate}
            subjects={activeSubjects}
            timeCoverage={timeCoverage}
          />
        </div>

        {/* Time Coverage */}
        {timeCoverage && <TimeCoverageStats stats={timeCoverage} />}

        {/* Summary Stats */}
        <SummaryStats
          totalTasks={totalTasks}
          doneTasks={doneTasks}
          totalHours={totalHours}
        />

        {/* No Data State */}
        {activeSubjects.length === 0 && (
          <div className="bg-white rounded-xl border border-slate-200 p-8 text-center shadow-sm">
            <div className="text-6xl mb-4">🐰</div>
            <h3 className="text-lg font-bold text-slate-700 mb-2">No data yet!</h3>
            <p className="text-sm text-slate-500 mb-6">
              Start logging your daily tasks to see analysis here.
            </p>
            <Link
              to="/"
              className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              Go to Daily Log
            </Link>
          </div>
        )}

        {/* Subject Cards Grid */}
        {activeSubjects.length > 0 && (
          <>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
              {activeSubjects.map((subject, index) => (
                <SubjectCard key={subject.subject} data={subject} index={index} />
              ))}
            </div>

            {/* Actions Row */}
            <div className="grid md:grid-cols-2 gap-4">
              <button
                onClick={() => setShowSaveModal(true)}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
              >
                <span>💾</span>
                <span>Save This Report</span>
              </button>

              {/* Saved Reports Dropdown */}
              {reports.length > 0 && (
                <div className="bg-white rounded-lg border border-slate-200 px-4 py-3 shadow-sm">
                  <SavedReportsList
                    reports={reports}
                    onSelect={handleSelectReport}
                    onDelete={deleteReport}
                  />
                </div>
              )}
            </div>
          </>
        )}

        {/* Save Report Modal */}
        <SaveReportModal
          isOpen={showSaveModal}
          onClose={() => setShowSaveModal(false)}
          onSave={handleSaveReport}
          startDate={startDate}
          endDate={endDate}
          totalTasks={totalTasks}
          totalHours={totalHours}
        />
      </div>
    </div>
  );
}

// ─── Login Template ───────────────────────────────────────────────────────────

function LoginTemplate() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl w-full bg-white rounded-xl border border-slate-200 shadow-lg p-8"
      >
        {/* Hero section */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">📊</div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Learning Analysis</h1>
          <p className="text-slate-600">Track your learning progress and discover insights</p>
        </div>

        {/* Sample data preview */}
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg p-6 mb-6 border border-indigo-100">
          <h3 className="text-sm font-semibold text-slate-700 mb-4">
            📈 What you'll see after signing in:
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-white rounded-lg p-4 text-center shadow-sm">
              <div className="text-3xl font-bold text-blue-600">124</div>
              <div className="text-xs text-slate-600 font-medium mt-1">Total Tasks</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center shadow-sm">
              <div className="text-3xl font-bold text-green-600">92</div>
              <div className="text-xs text-slate-600 font-medium mt-1">Completed</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center shadow-sm">
              <div className="text-3xl font-bold text-purple-600">74%</div>
              <div className="text-xs text-slate-600 font-medium mt-1">Success Rate</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center shadow-sm">
              <div className="text-3xl font-bold text-indigo-600">45h</div>
              <div className="text-xs text-slate-600 font-medium mt-1">Study Time</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center gap-3 mb-8">
          <AuthButton lang="en" />
          <p className="text-sm text-slate-500">
            Sign in with Google to see your personalized learning analytics
          </p>
        </div>

        {/* Feature list */}
        <div className="grid md:grid-cols-2 gap-3 text-sm text-slate-700">
          <div className="flex items-center gap-3 bg-slate-50 rounded-lg p-3">
            <span className="text-xl">📅</span>
            <span>Analyze any date range</span>
          </div>
          <div className="flex items-center gap-3 bg-slate-50 rounded-lg p-3">
            <span className="text-xl">📊</span>
            <span>Track progress by subject</span>
          </div>
          <div className="flex items-center gap-3 bg-slate-50 rounded-lg p-3">
            <span className="text-xl">💾</span>
            <span>Save custom reports</span>
          </div>
          <div className="flex items-center gap-3 bg-slate-50 rounded-lg p-3">
            <span className="text-xl">📥</span>
            <span>Export as Markdown</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Loading Skeleton ─────────────────────────────────────────────────────────

function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-slate-50 p-4" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div className="max-w-7xl mx-auto space-y-4 animate-pulse">
        <div className="h-10 bg-slate-200 rounded-lg w-1/3"></div>
        <div className="h-20 bg-slate-200 rounded-lg"></div>
        <div className="h-24 bg-slate-200 rounded-lg"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-28 bg-slate-200 rounded-lg"></div>
          ))}
        </div>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-32 bg-slate-200 rounded-lg"></div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Error State ──────────────────────────────────────────────────────────────

function ErrorState({ error }: { error: string }) {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md text-center shadow-sm">
        <div className="text-5xl mb-4">⚠️</div>
        <h3 className="font-bold text-red-800 mb-2 text-lg">Failed to load data</h3>
        <p className="text-sm text-red-600 mb-6">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
