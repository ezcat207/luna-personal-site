import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { useAuth } from '../../hooks/useAuth';
import { useLogAnalysis } from '../../hooks/useLogAnalysis';
import { useSavedReports } from '../../hooks/useSavedReports';
import { AuthButton } from '../../components/AuthButton';
import { SaveReportModal } from '../../components/log/analysis/SaveReportModal';
import { todayStr, offsetDate, formatMins } from '../../utils/log/formatters';
import type { Task, SavedReport } from '../../types/log';

// ─── Column layout for expanded task rows ───────────────────────────────────
const TASK_COLS = '1fr 28px 36px 36px 30px';

// ─── Subject color map ───────────────────────────────────────────────────────
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
const SUBJECT_EMOJIS: Record<string, string> = {
  reading: '📖', piano: '🎹', math: '🧮', chinese: '🇨🇳',
  dinner: '🍽️', badminton: '🏸', self_task: '🌟', ai_coding: '🤖',
  english: '🇬🇧', other: '📚',
};

function getColor(key: string) { return SUBJECT_COLORS[key.toLowerCase()] ?? '#f1f5f9'; }
function getEmoji(key: string) { return SUBJECT_EMOJIS[key.toLowerCase()] ?? '📚'; }

// ─── Quick-filter date picker ────────────────────────────────────────────────
function QuickPicker({ startDate, endDate, onChange }: {
  startDate: string; endDate: string;
  onChange: (s: string, e: string) => void;
}) {
  const today = todayStr();
  return (
    <div className="flex flex-col sm:flex-row gap-1.5 items-start sm:items-center flex-wrap">
      <div className="flex items-center gap-1.5 flex-wrap">
        <label className="text-[10px] font-bold text-slate-500">From</label>
        <input type="date" value={startDate} max={today}
          onChange={e => onChange(e.target.value, endDate)}
          className="border-2 border-pink-200 rounded-xl px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-pink-300" />
        <span className="text-pink-300 hidden sm:inline">→</span>
        <label className="text-[10px] font-bold text-slate-500">To</label>
        <input type="date" value={endDate} min={startDate} max={today}
          onChange={e => onChange(startDate, e.target.value)}
          className="border-2 border-pink-200 rounded-xl px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-pink-300" />
      </div>
      <div className="flex gap-1.5">
        {[
          { label: '7 days',    fn: () => onChange(offsetDate(today, -6), today) },
          { label: '30 days',   fn: () => onChange(offsetDate(today, -29), today) },
          { label: 'This month', fn: () => {
            const n = new Date();
            onChange(`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,'0')}-01`, today);
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

// ─── Readonly task row (expanded view) ──────────────────────────────────────
function TaskRow({ task }: { task: Task }) {
  const icon = task.status === 'done' ? '✓' : task.status === 'skip' ? '✗' : '○';
  const cls  = task.status === 'done'
    ? 'text-green-600 border-green-400 bg-green-50'
    : task.status === 'skip'
    ? 'text-red-400 border-red-300 bg-red-50'
    : 'text-slate-300 border-slate-200';
  return (
    <div className="grid items-center gap-0.5 border-b border-dashed border-amber-100 py-1 pl-2"
      style={{ gridTemplateColumns: TASK_COLS }}>
      <span className={`text-xs truncate ${task.status === 'done' ? 'line-through text-slate-400' : 'text-slate-700'}`}>
        {task.task_text || <em className="text-slate-300">—</em>}
      </span>
      <span className={`w-6 h-6 rounded border text-xs flex items-center justify-center font-bold mx-auto ${cls}`}>
        {icon}
      </span>
      <span className="text-center text-xs text-slate-500">{task.est_mins ?? '—'}</span>
      <span className="text-center text-xs text-slate-700 font-medium">{task.actual_mins ?? '—'}</span>
      <span className="text-center text-xs text-red-500 font-medium">{task.wrong_count || '—'}</span>
    </div>
  );
}

// ─── Sortable subject row ────────────────────────────────────────────────────
function SubjectRow({ subject, tasks }: { subject: string; tasks: Task[] }) {
  const [expanded, setExpanded] = useState(false);

  const {
    attributes, listeners, setNodeRef,
    transform, transition, isDragging,
  } = useSortable({ id: subject });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 10 : undefined,
  };

  const color      = getColor(subject);
  const emoji      = getEmoji(subject);
  const done       = tasks.filter(t => t.status === 'done').length;
  const totalAct   = tasks.reduce((s, t) => s + (t.actual_mins ?? 0), 0);
  const totalEst   = tasks.reduce((s, t) => s + (t.est_mins ?? 0), 0);
  const totalWrong = tasks.reduce((s, t) => s + (t.wrong_count ?? 0), 0);
  const pct        = tasks.length > 0 ? Math.round(done / tasks.length * 100) : 0;

  return (
    <div ref={setNodeRef} style={style} className="border-b border-amber-100 last:border-b-0">
      {/* ── Compact summary row ── */}
      <div
        className="flex items-center gap-2 px-2 py-2 hover:bg-amber-50/40 transition-colors"
        style={{ borderLeft: `4px solid ${color}` }}
      >
        {/* Drag handle */}
        <button
          {...attributes} {...listeners}
          className="text-slate-300 hover:text-slate-500 cursor-grab active:cursor-grabbing touch-none select-none text-base leading-none shrink-0"
          title="Drag to reorder"
        >
          ⠿
        </button>

        {/* Emoji + name */}
        <span className="text-base shrink-0">{emoji}</span>
        <span className="text-xs font-bold text-slate-700 w-20 shrink-0 truncate capitalize">{subject}</span>

        {/* Progress pill */}
        <span className="text-[10px] font-bold text-slate-500 shrink-0">{done}/{tasks.length}</span>

        {/* Mini progress bar */}
        <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden min-w-0">
          <div
            className="h-full rounded-full transition-all"
            style={{ width: `${pct}%`, background: color }}
          />
        </div>

        {/* Stats */}
        <span className="text-[10px] font-bold text-pink-600 shrink-0 w-12 text-right">{formatMins(totalAct)}</span>
        <span className="text-[10px] text-slate-400 shrink-0 w-10 text-right">est:{formatMins(totalEst)}</span>
        {totalWrong > 0 && (
          <span className="text-[10px] font-bold text-red-500 shrink-0">❌{totalWrong}</span>
        )}

        {/* Expand toggle */}
        <button
          onClick={() => setExpanded(v => !v)}
          className="text-[10px] font-bold text-pink-400 hover:text-pink-600 transition-colors shrink-0 w-14 text-right"
        >
          {expanded ? '▲ hide' : '▼ detail'}
        </button>
      </div>

      {/* ── Expanded task rows ── */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="tasks"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ overflow: 'hidden' }}
          >
            {/* Task column headers */}
            <div className="grid items-center gap-0.5 py-0.5 pl-2 bg-amber-50/60 text-[9px] font-bold text-slate-400 text-center border-b border-amber-100"
              style={{ gridTemplateColumns: TASK_COLS }}>
              <span className="text-left pl-0">Task</span>
              <span>Done</span>
              <span>Est</span>
              <span>Act</span>
              <span>❌</span>
            </div>
            {tasks.map(task => <TaskRow key={task.id} task={task} />)}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Markdown export ─────────────────────────────────────────────────────────
function exportMarkdown(
  startDate: string, endDate: string,
  groups: { subject: string; tasks: Task[] }[]
) {
  const allTasks   = groups.flatMap(g => g.tasks);
  const doneTasks  = allTasks.filter(t => t.status === 'done').length;
  const totalEst   = allTasks.reduce((s, t) => s + (t.est_mins ?? 0), 0);
  const totalAct   = allTasks.reduce((s, t) => s + (t.actual_mins ?? 0), 0);
  const totalWrong = allTasks.reduce((s, t) => s + (t.wrong_count ?? 0), 0);

  const lines = [
    `# Learning Analysis: ${startDate} → ${endDate}`,
    `Generated: ${new Date().toLocaleString()}`,
    '',
    `## Summary`,
    `- Tasks: ${doneTasks}/${allTasks.length} (${allTasks.length > 0 ? Math.round(doneTasks/allTasks.length*100) : 0}%)`,
    `- Planned: ${formatMins(totalEst)} · Actual: ${formatMins(totalAct)}`,
    ...(totalWrong > 0 ? [`- Wrong answers: ${totalWrong}`] : []),
    '',
    `## By Subject`,
    '',
  ];

  for (const { subject, tasks } of groups) {
    const done  = tasks.filter(t => t.status === 'done').length;
    const act   = tasks.reduce((s, t) => s + (t.actual_mins ?? 0), 0);
    const est   = tasks.reduce((s, t) => s + (t.est_mins ?? 0), 0);
    const wrong = tasks.reduce((s, t) => s + (t.wrong_count ?? 0), 0);
    lines.push(`### ${getEmoji(subject)} ${subject}`);
    lines.push(`${done}/${tasks.length} done · ${formatMins(act)} actual · ${formatMins(est)} est${wrong > 0 ? ` · ❌${wrong}` : ''}`);
    lines.push('');
    lines.push('| Task | Status | Est | Actual | Wrong |');
    lines.push('|------|--------|-----|--------|-------|');
    for (const t of tasks) {
      const s = t.status === 'done' ? '✅' : t.status === 'skip' ? '❌' : '○';
      lines.push(`| ${t.task_text || '—'} | ${s} | ${t.est_mins ?? '—'} | ${t.actual_mins ?? '—'} | ${t.wrong_count || '—'} |`);
    }
    lines.push('');
  }

  const blob = new Blob([lines.join('\n')], { type: 'text/markdown' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url; a.download = `analysis-${startDate}-to-${endDate}.md`; a.click();
  URL.revokeObjectURL(url);
}

// ─── Saved report pills ──────────────────────────────────────────────────────
function SavedPills({ reports, onSelect, onDelete }: {
  reports: SavedReport[];
  onSelect: (r: SavedReport) => void;
  onDelete: (id: string) => void;
}) {
  if (!reports.length) return null;
  return (
    <div className="flex flex-wrap gap-1.5 items-center">
      <span className="text-[10px] font-bold text-slate-500">Saved:</span>
      {reports.map(r => (
        <div key={r.id} className="flex items-center gap-0.5 bg-white border border-pink-200 rounded-full px-2 py-0.5 group">
          <button onClick={() => onSelect(r)}
            className="text-[10px] text-slate-700 hover:text-pink-600 transition-colors">
            {r.report_name}
          </button>
          <button onClick={() => onDelete(r.id)}
            className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 ml-1 text-[10px] transition-all">
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

  // Group + sort by actual time desc
  const initialGroups = useMemo(() => {
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

  // Separate state for drag-reordered list
  const [order, setOrder] = useState<string[]>([]);

  // When data loads, reset order
  const prevSubjects = useMemo(
    () => initialGroups.map(g => g.subject).join(','),
    [initialGroups]
  );
  const subjectKeys = useMemo(() => {
    const initial = initialGroups.map(g => g.subject);
    // If order doesn't match current subjects (data changed), reset
    const missing = initial.some(s => !order.includes(s));
    const extra   = order.some(s => !initial.includes(s));
    if (!order.length || missing || extra) return initial;
    return order;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prevSubjects, order]);

  const groupMap = useMemo(() => {
    const m = new Map<string, Task[]>();
    for (const g of initialGroups) m.set(g.subject, g.tasks);
    return m;
  }, [initialGroups]);

  const orderedGroups = useMemo(
    () => subjectKeys.map(s => ({ subject: s, tasks: groupMap.get(s) ?? [] })),
    [subjectKeys, groupMap]
  );

  // Sensors for dnd
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIdx = subjectKeys.indexOf(active.id as string);
      const newIdx = subjectKeys.indexOf(over.id as string);
      setOrder(arrayMove(subjectKeys, oldIdx, newIdx));
    }
  }

  // Summary stats
  const allTasks   = orderedGroups.flatMap(g => g.tasks);
  const totalTasks = allTasks.length;
  const doneTasks  = allTasks.filter(t => t.status === 'done').length;
  const totalAct   = allTasks.reduce((s, t) => s + (t.actual_mins ?? 0), 0);
  const totalEst   = allTasks.reduce((s, t) => s + (t.est_mins ?? 0), 0);
  const totalWrong = allTasks.reduce((s, t) => s + (t.wrong_count ?? 0), 0);

  const handleSave = async (name: string) => {
    if (!user) return;
    await saveReport({
      user_id: user.id, report_name: name,
      date_start: startDate, date_end: endDate,
      summary_data: {
        totalTasks, doneTasks,
        totalEstMins: totalEst, totalActualMins: totalAct,
        totalWrong, subjects: [],
      },
    });
  };

  const handleSelectReport = (r: SavedReport) => {
    setStartDate(r.date_start); setEndDate(r.date_end);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!authLoading && !user) return <LoginTemplate />;
  if (authLoading || loading) return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center">
      <div className="text-4xl animate-pulse">🐰</div>
    </div>
  );
  if (error) return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center p-4">
      <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center max-w-sm">
        <div className="text-4xl mb-3">⚠️</div>
        <p className="text-sm text-red-700 mb-3">{error}</p>
        <button onClick={() => window.location.reload()}
          className="px-4 py-2 bg-red-600 text-white rounded-xl text-sm font-bold">Retry</button>
      </div>
    </div>
  );

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

      {/* ── Controls card ── */}
      <div className="bg-white/90 rounded-2xl border border-amber-100 shadow-sm px-3 py-2.5 space-y-2">
        <QuickPicker
          startDate={startDate} endDate={endDate}
          onChange={(s, e) => { setStartDate(s); setEndDate(e); setOrder([]); }}
        />
        <div className="flex gap-2 flex-wrap items-center">
          <button onClick={() => setShowSave(true)} disabled={!orderedGroups.length}
            className="px-3 py-1 rounded-full text-[10px] font-bold bg-pink-500 text-white hover:bg-pink-600 transition-colors disabled:opacity-40">
            💾 Save
          </button>
          <button onClick={() => exportMarkdown(startDate, endDate, orderedGroups)} disabled={!orderedGroups.length}
            className="px-3 py-1 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-600 hover:bg-indigo-200 transition-colors disabled:opacity-40">
            📥 Export MD
          </button>
          <SavedPills reports={reports} onSelect={handleSelectReport} onDelete={deleteReport} />
        </div>
      </div>

      {/* ── Summary bar ── */}
      {totalTasks > 0 && (
        <div className="bg-white/90 rounded-2xl border border-amber-100 shadow-sm px-3 py-2">
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-slate-600">
            <span>✅ <strong className="text-green-600">{doneTasks}/{totalTasks}</strong> ({Math.round(doneTasks/totalTasks*100)}%)</span>
            <span>⏱️ Est: <strong className="text-blue-600">{formatMins(totalEst)}</strong></span>
            <span>✅ Actual: <strong className="text-pink-600">{formatMins(totalAct)}</strong></span>
            {timeCoverage && (
              <span>📊 <strong className="text-indigo-600">{timeCoverage.actualCoverage.toFixed(1)}%</strong> of {formatMins(timeCoverage.totalAvailableMins)}</span>
            )}
            {totalWrong > 0 && <span>❌ Wrong: <strong className="text-red-500">{totalWrong}</strong></span>}
          </div>
        </div>
      )}

      {/* ── Empty state ── */}
      {!orderedGroups.length && (
        <div className="bg-white/90 rounded-2xl border border-amber-100 p-8 text-center">
          <div className="text-5xl mb-3">🐰</div>
          <p className="text-sm text-slate-500 mb-4">No tasks with logged time in this range</p>
          <Link to="/" className="inline-block px-5 py-2 bg-pink-500 text-white rounded-xl text-sm font-bold">
            Go Log Today
          </Link>
        </div>
      )}

      {/* ── Sortable subject list ── */}
      {orderedGroups.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-amber-100 shadow-[0_4px_20px_rgba(0,0,0,0.07)] overflow-hidden"
          style={{ fontFamily: "'PingFang SC','Microsoft YaHei',system-ui,sans-serif" }}>

          {/* Header strip */}
          <div className="bg-gradient-to-r from-pink-400 to-pink-300 px-4 py-2 flex items-center justify-between">
            <p className="text-white font-black text-sm">
              🐰 {user?.user_metadata?.given_name ?? 'My'} Learning Summary
            </p>
            <p className="text-pink-100 text-[10px]">{startDate} → {endDate}</p>
          </div>

          {/* Column hints */}
          <div className="flex items-center gap-2 px-2 py-1 bg-amber-50/60 border-b border-amber-200 text-[9px] font-bold text-slate-400">
            <span className="w-4 shrink-0" />
            <span className="w-6 shrink-0" />
            <span className="w-20 shrink-0">Subject</span>
            <span className="w-10 shrink-0">Done</span>
            <span className="flex-1">Progress</span>
            <span className="w-12 text-right">Actual</span>
            <span className="w-10 text-right">Est</span>
            <span className="w-14 text-right">▼ expand</span>
          </div>

          {/* DnD sortable list */}
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={subjectKeys} strategy={verticalListSortingStrategy}>
              {orderedGroups.map(({ subject, tasks: subTasks }) => (
                <SubjectRow key={subject} subject={subject} tasks={subTasks} />
              ))}
            </SortableContext>
          </DndContext>

          {/* Footer totals */}
          <div className="border-t-2 border-amber-200 px-3 py-2 bg-amber-50/30 flex flex-wrap gap-x-4 gap-y-0.5 text-[11px] text-slate-500">
            <span>Total: <strong className="text-slate-700">{totalTasks}</strong> tasks</span>
            <span>Done: <strong className="text-green-600">{doneTasks}</strong></span>
            <span>Est: <strong className="text-blue-600">{formatMins(totalEst)}</strong></span>
            <span>Actual: <strong className="text-pink-600">{formatMins(totalAct)}</strong></span>
            {totalWrong > 0 && <span>Wrong: <strong className="text-red-500">{totalWrong}</strong></span>}
          </div>
        </motion.div>
      )}

      <SaveReportModal
        isOpen={showSave} onClose={() => setShowSave(false)}
        onSave={handleSave} startDate={startDate} endDate={endDate}
        totalTasks={totalTasks} totalHours={totalAct / 60}
      />
    </div>
  );
}
