import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import { useLogAnalysis } from '../../hooks/useLogAnalysis';
import { useSavedReports } from '../../hooks/useSavedReports';
import { AuthButton } from '../../components/AuthButton';
import { SaveReportModal } from '../../components/log/analysis/SaveReportModal';
import { todayStr, offsetDate, formatMins } from '../../utils/log/formatters';
import type { Task, SavedReport } from '../../types/log';

// ─── Column layout (same as LogHome, minus delete col) ─────────────────────
const ROW_COLS = '1fr 28px 36px 36px 30px';

// ─── Subject color map (same colors as LogHome TEMPLATES) ──────────────────
const SUBJECT_COLORS: Record<string, string> = {
  reading:   '#bfdbfe',
  piano:     '#e9d5ff',
  math:      '#fecaca',
  chinese:   '#fbcfe8',
  dinner:    '#bbf7d0',
  badminton: '#a7f3d0',
  self_task: '#fef08a',
  ai_coding: '#c7d2fe',
  english:   '#86efac',
  other:     '#e2e8f0',
};

function getSubjectColor(key: string): string {
  return SUBJECT_COLORS[key.toLowerCase()] ?? '#f1f5f9';
}

// ─── Quick-filter buttons ────────────────────────────────────────────────────
interface QuickPickerProps {
  startDate: string;
  endDate: string;
  onChange: (s: string, e: string) => void;
}

function QuickPicker({ startDate, endDate, onChange }: QuickPickerProps) {
  const today = todayStr();
  return (
    <div className="flex flex-col sm:flex-row gap-1.5 items-start sm:items-center flex-wrap">
      <div className="flex items-center gap-1.5 flex-wrap">
        <label className="text-[10px] font-bold text-slate-500">From</label>
        <input type="date" value={startDate} max={today}
          onChange={e => onChange(e.target.value, endDate)}
          className="border-2 border-pink-200 rounded-xl px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-pink-300" />
        <span className="text-pink-300 text-sm hidden sm:inline">→</span>
        <label className="text-[10px] font-bold text-slate-500">To</label>
        <input type="date" value={endDate} min={startDate} max={today}
          onChange={e => onChange(startDate, e.target.value)}
          className="border-2 border-pink-200 rounded-xl px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-pink-300" />
      </div>
      <div className="flex gap-1.5">
        {[
          { label: '7 days', fn: () => onChange(offsetDate(today, -6), today) },
          { label: '30 days', fn: () => onChange(offsetDate(today, -29), today) },
          { label: 'This month', fn: () => {
            const n = new Date();
            onChange(`${n.getFullYear()}-${String(n.getMonth() + 1).padStart(2, '0')}-01`, today);
          }},
        ].map(({ label, fn }) => (
          <button key={label} onClick={fn}
            className="px-3 py-1 rounded-full text-[10px] font-bold bg-pink-100 text-pink-600 hover:bg-pink-200 transition-colors">
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Single task row (readonly, same look as LogHome TaskRow) ───────────────
function AnalysisTaskRow({ task }: { task: Task }) {
  const statusIcon = task.status === 'done' ? '✓' : task.status === 'skip' ? '✗' : '○';
  const statusCls  = task.status === 'done'
    ? 'text-green-600 border-green-400 bg-green-50'
    : task.status === 'skip'
    ? 'text-red-400 border-red-300 bg-red-50'
    : 'text-slate-300 border-slate-200';

  return (
    <div className="grid items-center gap-0.5 border-b border-dashed border-amber-100 py-1"
      style={{ gridTemplateColumns: ROW_COLS }}>
      <span className={`text-xs px-1 truncate ${task.status === 'done' ? 'line-through text-slate-400' : 'text-slate-700'}`}>
        {task.task_text || <span className="italic text-slate-300">—</span>}
      </span>
      <div className="flex justify-center">
        <span className={`w-6 h-6 rounded border text-xs flex items-center justify-center font-bold ${statusCls}`}>
          {statusIcon}
        </span>
      </div>
      <span className="text-center text-xs text-slate-500">{task.est_mins ?? '—'}</span>
      <span className="text-center text-xs text-slate-700 font-medium">{task.actual_mins ?? '—'}</span>
      <span className="text-center text-xs text-red-500 font-medium">
        {task.wrong_count ? task.wrong_count : '—'}
      </span>
    </div>
  );
}

// ─── Subject section row (same structure as LogHome SubjectSection) ──────────
function AnalysisSubjectSection({ subject, tasks }: { subject: string; tasks: Task[] }) {
  const color = getSubjectColor(subject);
  const done  = tasks.filter(t => t.status === 'done').length;
  const totalActual = tasks.reduce((s, t) => s + (t.actual_mins ?? 0), 0);
  const totalEst    = tasks.reduce((s, t) => s + (t.est_mins ?? 0), 0);

  return (
    <div className="flex border-b border-amber-100 last:border-b-0">
      {/* Subject strip — same as LogHome */}
      <div className="w-9 shrink-0 flex flex-col items-center justify-start pt-2 pb-1 border-r border-amber-100"
        style={{ background: color + '88' }}>
        <span className="text-[10px] font-bold text-slate-600 select-none"
          style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', letterSpacing: '0.05em' }}>
          {subject}
        </span>
        <span className="text-[9px] text-slate-400 mt-1 font-medium">{done}/{tasks.length}</span>
        <span className="text-[8px] text-pink-500 mt-0.5 font-bold">{formatMins(totalActual)}</span>
      </div>

      {/* Task rows */}
      <div className="flex-1 min-w-0 px-1">
        {tasks.map(task => (
          <AnalysisTaskRow key={task.id} task={task} />
        ))}
        {/* Subject totals row */}
        <div className="grid items-center gap-0.5 py-1 bg-amber-50/40 text-[9px] font-bold text-slate-500"
          style={{ gridTemplateColumns: ROW_COLS }}>
          <span className="pl-1 text-slate-400">Total</span>
          <span className="text-center">{done}/{tasks.length}</span>
          <span className="text-center">{totalEst || '—'}</span>
          <span className="text-center text-pink-600">{totalActual || '—'}</span>
          <span className="text-center text-red-400">
            {tasks.reduce((s, t) => s + (t.wrong_count ?? 0), 0) || '—'}
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Export Markdown ─────────────────────────────────────────────────────────
function exportMarkdown(
  startDate: string,
  endDate: string,
  groupedTasks: { subject: string; tasks: Task[] }[]
) {
  const now = new Date().toLocaleString();
  const lines: string[] = [
    `# Learning Analysis Report`,
    `**Period:** ${startDate} → ${endDate}`,
    `**Generated:** ${now}`,
    '',
  ];

  // Overall summary
  const allTasks   = groupedTasks.flatMap(g => g.tasks);
  const totalTasks = allTasks.length;
  const doneTasks  = allTasks.filter(t => t.status === 'done').length;
  const totalEst   = allTasks.reduce((s, t) => s + (t.est_mins ?? 0), 0);
  const totalAct   = allTasks.reduce((s, t) => s + (t.actual_mins ?? 0), 0);
  const totalWrong = allTasks.reduce((s, t) => s + (t.wrong_count ?? 0), 0);

  lines.push(`## Summary`);
  lines.push(`- Tasks: ${doneTasks}/${totalTasks} done (${totalTasks > 0 ? Math.round(doneTasks/totalTasks*100) : 0}%)`);
  lines.push(`- Planned time: ${formatMins(totalEst)}`);
  lines.push(`- Actual time: ${formatMins(totalAct)}`);
  if (totalWrong > 0) lines.push(`- Wrong answers: ${totalWrong}`);
  lines.push('');

  // Per-subject breakdown with ALL tasks
  lines.push(`## Breakdown by Subject`);
  lines.push('');

  for (const { subject, tasks } of groupedTasks) {
    const subDone   = tasks.filter(t => t.status === 'done').length;
    const subEst    = tasks.reduce((s, t) => s + (t.est_mins ?? 0), 0);
    const subAct    = tasks.reduce((s, t) => s + (t.actual_mins ?? 0), 0);
    const subWrong  = tasks.reduce((s, t) => s + (t.wrong_count ?? 0), 0);

    lines.push(`### ${subject}`);
    lines.push(`- Done: ${subDone}/${tasks.length} · Actual: ${formatMins(subAct)} · Est: ${formatMins(subEst)}${subWrong > 0 ? ` · Wrong: ${subWrong}` : ''}`);
    lines.push('');
    lines.push('| Task | Status | Est (min) | Actual (min) | Wrong |');
    lines.push('|------|--------|-----------|--------------|-------|');
    for (const t of tasks) {
      const status = t.status === 'done' ? '✅' : t.status === 'skip' ? '❌' : '○';
      lines.push(`| ${t.task_text || '—'} | ${status} | ${t.est_mins ?? '—'} | ${t.actual_mins ?? '—'} | ${t.wrong_count || '—'} |`);
    }
    lines.push('');
  }

  const blob = new Blob([lines.join('\n')], { type: 'text/markdown' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = `analysis-${startDate}-to-${endDate}.md`;
  a.click();
  URL.revokeObjectURL(url);
}

// ─── Saved Reports pill list ──────────────────────────────────────────────────
function SavedReportPills({
  reports, onSelect, onDelete,
}: {
  reports: { id: string; report_name: string; date_start: string; date_end: string; created_at: string }[];
  onSelect: (r: SavedReport) => void;
  onDelete: (id: string) => void;
}) {
  if (reports.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-1.5 items-center">
      <span className="text-[10px] font-bold text-slate-500">Saved:</span>
      {reports.map(r => (
        <div key={r.id} className="flex items-center gap-0.5 bg-white border border-pink-200 rounded-full px-2 py-0.5 group">
          <button onClick={() => onSelect(r as SavedReport)}
            className="text-[10px] text-slate-700 hover:text-pink-600 transition-colors">
            {r.report_name}
          </button>
          <button onClick={() => onDelete(r.id)}
            className="text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 ml-1 text-[10px]">
            ×
          </button>
        </div>
      ))}
    </div>
  );
}

// ─── Login template ──────────────────────────────────────────────────────────
function LoginTemplate() {
  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-2xl border border-amber-100 shadow-lg p-8 text-center">
        <div className="text-5xl mb-4">📊</div>
        <h1 className="text-xl font-bold text-slate-700 mb-2">Learning Analysis</h1>
        <p className="text-sm text-slate-500 mb-6">Sign in to see your learning stats</p>
        <AuthButton lang="en" />
        <p className="text-xs text-slate-400 mt-3">Analyze progress · Save reports · Export Markdown</p>
      </motion.div>
    </div>
  );
}

// ─── Main ────────────────────────────────────────────────────────────────────
export default function LogAnalysis() {
  const { user, authLoading } = useAuth();
  const today = todayStr();

  const [startDate, setStartDate] = useState(offsetDate(today, -6));
  const [endDate,   setEndDate]   = useState(today);
  const [showSave,  setShowSave]  = useState(false);

  const { tasks, timeCoverage, loading, error } = useLogAnalysis(
    startDate, endDate, user?.id ?? null
  );

  const { reports, saveReport, deleteReport } = useSavedReports(user?.id ?? null);

  // Group tasks by subject — only subjects with actual_mins > 0
  const groupedTasks = useMemo(() => {
    const map = new Map<string, Task[]>();
    for (const t of tasks) {
      if (!map.has(t.subject)) map.set(t.subject, []);
      map.get(t.subject)!.push(t);
    }
    return [...map.entries()]
      .map(([subject, subTasks]) => ({ subject, tasks: subTasks }))
      .filter(g => g.tasks.some(t => (t.actual_mins ?? 0) > 0))
      .sort((a, b) => {
        const actA = a.tasks.reduce((s, t) => s + (t.actual_mins ?? 0), 0);
        const actB = b.tasks.reduce((s, t) => s + (t.actual_mins ?? 0), 0);
        return actB - actA;
      });
  }, [tasks]);

  // Summary stats
  const allTasks   = groupedTasks.flatMap(g => g.tasks);
  const totalTasks = allTasks.length;
  const doneTasks  = allTasks.filter(t => t.status === 'done').length;
  const totalAct   = allTasks.reduce((s, t) => s + (t.actual_mins ?? 0), 0);
  const totalEst   = allTasks.reduce((s, t) => s + (t.est_mins ?? 0), 0);
  const totalWrong = allTasks.reduce((s, t) => s + (t.wrong_count ?? 0), 0);

  const handleSave = async (name: string) => {
    if (!user || !timeCoverage) return;
    await saveReport({
      user_id: user.id,
      report_name: name,
      date_start: startDate,
      date_end: endDate,
      summary_data: { totalTasks, doneTasks, totalEstMins: totalEst, totalActualMins: totalAct, totalWrong, subjects: [] },
    });
  };

  const handleSelectReport = (r: SavedReport) => {
    setStartDate(r.date_start);
    setEndDate(r.date_end);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!authLoading && !user) return <LoginTemplate />;
  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center">
        <div className="text-4xl animate-pulse">🐰</div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center p-4">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center max-w-sm">
          <div className="text-4xl mb-3">⚠️</div>
          <p className="text-sm text-red-700 mb-3">{error}</p>
          <button onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-600 text-white rounded-xl text-sm font-bold">
            Retry
          </button>
        </div>
      </div>
    );
  }

  const coveragePct = timeCoverage
    ? Math.round(timeCoverage.actualCoverage * 10) / 10
    : null;

  return (
    <div className="space-y-3 pb-10 bg-amber-50 min-h-screen p-3">

      {/* ── Top bar ── */}
      <div className="flex items-center gap-2 flex-wrap">
        <Link to="/"
          className="px-3 py-1.5 rounded-full text-xs font-bold bg-white border border-slate-200 text-slate-500 hover:border-pink-300 transition-all">
          ← Back to Log
        </Link>
        <span className="font-black text-sm text-slate-700">📊 Learning Analysis</span>
        <div className="flex-1" />
        <AuthButton lang="en" />
      </div>

      {/* ── Date range + actions ── */}
      <div className="bg-white/90 rounded-2xl border border-amber-100 shadow-sm px-3 py-2.5 space-y-2">
        <QuickPicker startDate={startDate} endDate={endDate} onChange={(s, e) => { setStartDate(s); setEndDate(e); }} />
        <div className="flex gap-2 flex-wrap items-center">
          <button onClick={() => setShowSave(true)}
            disabled={groupedTasks.length === 0}
            className="px-3 py-1 rounded-full text-[10px] font-bold bg-pink-500 text-white hover:bg-pink-600 transition-colors disabled:opacity-40">
            💾 Save Report
          </button>
          <button
            onClick={() => exportMarkdown(startDate, endDate, groupedTasks)}
            disabled={groupedTasks.length === 0}
            className="px-3 py-1 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-600 hover:bg-indigo-200 transition-colors disabled:opacity-40">
            📥 Export MD
          </button>
          <SavedReportPills reports={reports} onSelect={handleSelectReport} onDelete={deleteReport} />
        </div>
      </div>

      {/* ── Summary stats bar ── */}
      {totalTasks > 0 && (
        <div className="bg-white/90 rounded-2xl border border-amber-100 shadow-sm px-3 py-2">
          <div className="flex flex-wrap gap-x-5 gap-y-1 text-[11px] text-slate-600">
            <span>
              ✅ <strong className="text-green-600">{doneTasks}</strong>/{totalTasks} done
              ({totalTasks > 0 ? Math.round(doneTasks / totalTasks * 100) : 0}%)
            </span>
            <span>
              ⏱️ Est: <strong className="text-blue-600">{formatMins(totalEst)}</strong>
            </span>
            <span>
              ✅ Actual: <strong className="text-pink-600">{formatMins(totalAct)}</strong>
            </span>
            {coveragePct !== null && (
              <span>
                📊 Coverage: <strong className="text-indigo-600">{coveragePct}%</strong>
                {timeCoverage && ` of ${formatMins(timeCoverage.totalAvailableMins)}`}
              </span>
            )}
            {totalWrong > 0 && (
              <span>❌ Wrong: <strong className="text-red-500">{totalWrong}</strong></span>
            )}
          </div>
        </div>
      )}

      {/* ── Empty state ── */}
      {groupedTasks.length === 0 && (
        <div className="bg-white/90 rounded-2xl border border-amber-100 p-8 text-center">
          <div className="text-5xl mb-3">🐰</div>
          <p className="text-sm text-slate-500 mb-4">No tasks with logged time in this range</p>
          <Link to="/" className="inline-block px-5 py-2 bg-pink-500 text-white rounded-xl text-sm font-bold hover:bg-pink-600">
            Go Log Today
          </Link>
        </div>
      )}

      {/* ── Main table (SAME structure as LogHome) ── */}
      {groupedTasks.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-amber-100 shadow-[0_4px_20px_rgba(0,0,0,0.07)] overflow-hidden"
          style={{ fontFamily: "'PingFang SC', 'Microsoft YaHei', system-ui, sans-serif" }}>

          {/* Header strip */}
          <div className="bg-gradient-to-r from-pink-400 via-pink-350 to-pink-300 px-4 py-2 flex items-center justify-between">
            <p className="text-white font-black text-sm tracking-wide">
              🐰 {user?.user_metadata?.given_name ?? 'My'} Learning Summary
            </p>
            <p className="text-pink-100 text-[10px]">{startDate} → {endDate}</p>
          </div>

          {/* Column headers */}
          <div className="flex border-b-2 border-amber-200 bg-amber-50/60">
            <div className="w-9 shrink-0 border-r border-amber-200 flex items-center justify-center py-1">
              <span className="text-[9px] font-bold text-slate-400">Subject</span>
            </div>
            <div className="flex-1 grid items-center py-1 px-1 text-[9px] font-bold text-slate-400 text-center"
              style={{ gridTemplateColumns: ROW_COLS }}>
              <span className="text-left pl-1">Task</span>
              <span>Done</span>
              <span style={{ whiteSpace: 'pre-line' }}>{'Est\n(min)'}</span>
              <span style={{ whiteSpace: 'pre-line' }}>{'Act\n(min)'}</span>
              <span>❌</span>
            </div>
          </div>

          {/* Subject sections */}
          {groupedTasks.map(({ subject, tasks: subTasks }) => (
            <AnalysisSubjectSection key={subject} subject={subject} tasks={subTasks} />
          ))}

          {/* Footer totals */}
          <div className="border-t-2 border-amber-200 px-3 py-2 bg-amber-50/30 flex flex-wrap gap-x-4 gap-y-0.5 text-[11px] text-slate-500">
            <span>Total tasks: <strong className="text-slate-700">{totalTasks}</strong></span>
            <span>Done: <strong className="text-green-600">{doneTasks}</strong></span>
            <span>Est: <strong className="text-blue-600">{formatMins(totalEst)}</strong></span>
            <span>Actual: <strong className="text-pink-600">{formatMins(totalAct)}</strong></span>
            {totalWrong > 0 && <span>Wrong: <strong className="text-red-500">{totalWrong}</strong></span>}
          </div>
        </motion.div>
      )}

      {/* ── Save modal ── */}
      <SaveReportModal
        isOpen={showSave}
        onClose={() => setShowSave(false)}
        onSave={handleSave}
        startDate={startDate}
        endDate={endDate}
        totalTasks={totalTasks}
        totalHours={totalAct / 60}
      />
    </div>
  );
}
