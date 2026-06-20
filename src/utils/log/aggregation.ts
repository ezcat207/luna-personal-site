import type { Task, AggregatedSubject, TimeCoverageStats } from '../../types/log';

/**
 * Aggregate tasks by subject
 */
export function aggregateBySubject(tasks: Task[]): AggregatedSubject[] {
  const grouped = tasks.reduce((acc, task) => {
    if (!acc[task.subject]) {
      acc[task.subject] = [];
    }
    acc[task.subject].push(task);
    return acc;
  }, {} as Record<string, Task[]>);

  return Object.entries(grouped)
    .map(([subject, subjectTasks]) => ({
      subject,
      emoji: getSubjectEmoji(subject),
      totalTasks: subjectTasks.length,
      doneTasks: subjectTasks.filter(t => t.status === 'done').length,
      completionRate: (subjectTasks.filter(t => t.status === 'done').length / subjectTasks.length) * 100,
      totalEstMins: subjectTasks.reduce((s, t) => s + (t.est_mins || 0), 0),
      totalActualMins: subjectTasks.reduce((s, t) => s + (t.actual_mins || 0), 0),
      totalWrong: subjectTasks.reduce((s, t) => s + (t.wrong_count || 0), 0),
    }))
    .sort((a, b) => b.totalActualMins - a.totalActualMins);
}

/**
 * Calculate time coverage statistics
 */
export function calculateTimeCoverage(
  tasks: Task[],
  startDate: string,
  endDate: string
): TimeCoverageStats {
  const start = new Date(startDate + 'T00:00:00');
  const end = new Date(endDate + 'T23:59:59');
  const totalDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;

  const totalAvailableMins = totalDays * 24 * 60;
  const totalPlannedMins = tasks.reduce((s, t) => s + (t.est_mins || 0), 0);
  const totalActualMins = tasks.reduce((s, t) => s + (t.actual_mins || 0), 0);

  const plannedCoverage = (totalPlannedMins / totalAvailableMins) * 100;
  const actualCoverage = (totalActualMins / totalAvailableMins) * 100;

  return {
    totalDays,
    totalAvailableMins,
    totalPlannedMins,
    totalActualMins,
    plannedCoverage,
    actualCoverage,
  };
}

/**
 * Get emoji for subject
 */
function getSubjectEmoji(subject: string): string {
  const emojiMap: Record<string, string> = {
    reading: '📖',
    piano: '🎹',
    math: '🧮',
    chinese: '🇨🇳',
    english: '🇬🇧',
    dinner: '🍽️',
    badminton: '🏸',
    self_task: '🌟',
    ai_coding: '🤖',
    other: '📚',
  };

  return emojiMap[subject.toLowerCase()] || '📚';
}

/**
 * Get color for subject (Tailwind class)
 */
export function getSubjectColor(subject: string): string {
  const colorMap: Record<string, string> = {
    reading: 'bg-blue-300',
    piano: 'bg-purple-300',
    math: 'bg-red-300',
    chinese: 'bg-pink-300',
    english: 'bg-green-300',
    dinner: 'bg-emerald-300',
    badminton: 'bg-teal-300',
    self_task: 'bg-yellow-300',
    ai_coding: 'bg-indigo-300',
    other: 'bg-slate-300',
  };

  return colorMap[subject.toLowerCase()] || 'bg-slate-300';
}
