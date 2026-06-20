import type { AggregatedSubject, TimeCoverageStats } from '../../types/log';
import { formatMins, formatDateRange } from './formatters';

/**
 * Generate Markdown report from analysis data
 */
export function generateMarkdownReport(
  startDate: string,
  endDate: string,
  subjects: AggregatedSubject[],
  timeCoverage: TimeCoverageStats
): string {
  const now = new Date();
  const timestamp = now.toLocaleString('en-US', {
    timeZone: 'America/Los_Angeles',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const totalTasks = subjects.reduce((s, sub) => s + sub.totalTasks, 0);
  const doneTasks = subjects.reduce((s, sub) => s + sub.doneTasks, 0);
  const totalWrong = subjects.reduce((s, sub) => s + sub.totalWrong, 0);

  let md = '';

  // Header
  md += `# Learning Analysis Report\n\n`;
  md += `**Date Range**: ${formatDateRange(startDate, endDate, 'en')} (${timeCoverage.totalDays} days)\n`;
  md += `**Generated**: ${timestamp} PST\n\n`;
  md += `---\n\n`;

  // Summary
  md += `## Summary\n\n`;
  md += `- **Total Tasks**: ${totalTasks}\n`;
  md += `- **Completed**: ${doneTasks} (${((doneTasks / totalTasks) * 100).toFixed(1)}%)\n`;
  md += `- **Total Planned Time**: ${formatMins(timeCoverage.totalPlannedMins)}\n`;
  md += `- **Total Actual Time**: ${formatMins(timeCoverage.totalActualMins)}\n`;
  md += `- **Total Wrong Answers**: ${totalWrong}\n\n`;
  md += `---\n\n`;

  // Time Coverage
  md += `## Time Coverage\n\n`;
  md += `- **Total Available**: ${formatMins(timeCoverage.totalAvailableMins)} (${timeCoverage.totalDays} days × 24h)\n`;
  md += `- **Planned Coverage**: ${timeCoverage.plannedCoverage.toFixed(1)}%\n`;
  md += `- **Actual Coverage**: ${timeCoverage.actualCoverage.toFixed(1)}%\n\n`;

  const coverageDiff = timeCoverage.actualCoverage - timeCoverage.plannedCoverage;
  if (coverageDiff > 0) {
    md += `🎉 **Great job!** You exceeded your plan by ${formatMins(timeCoverage.totalActualMins - timeCoverage.totalPlannedMins)}.\n\n`;
  } else if (coverageDiff < 0) {
    md += `⚠️ You planned ${formatMins(timeCoverage.totalPlannedMins - timeCoverage.totalActualMins)} more than you completed.\n\n`;
  }

  md += `---\n\n`;

  // By Subject
  md += `## By Subject\n\n`;

  subjects.forEach(subject => {
    md += `### ${subject.emoji || '📚'} ${subject.subject.charAt(0).toUpperCase() + subject.subject.slice(1)} (${formatMins(subject.totalActualMins)})\n\n`;
    md += `- **Tasks**: ${subject.totalTasks} total, ${subject.doneTasks} done (${subject.completionRate.toFixed(1)}%)\n`;
    md += `- **Time**: Planned ${formatMins(subject.totalEstMins)}, Actual ${formatMins(subject.totalActualMins)}\n`;

    if (subject.totalWrong > 0) {
      md += `- **Wrong Answers**: ${subject.totalWrong}\n`;
    }

    md += `\n`;

    // Subtasks (if any)
    if (subject.subTasks && subject.subTasks.length > 0) {
      md += `**Subtasks**:\n`;
      subject.subTasks.forEach(sub => {
        md += `- ${sub.subject}: ${formatMins(sub.totalActualMins)} (${sub.totalTasks} tasks, ${sub.doneTasks} done)\n`;
      });
      md += `\n`;
    }

    md += `---\n\n`;
  });

  // Raw Data
  md += `## Raw Data (JSON)\n\n`;
  md += `\`\`\`json\n`;
  md += JSON.stringify(
    {
      dateRange: {
        start: startDate,
        end: endDate,
        days: timeCoverage.totalDays,
      },
      summary: {
        totalTasks,
        completedTasks: doneTasks,
        completionRate: ((doneTasks / totalTasks) * 100).toFixed(1),
        totalPlannedMins: timeCoverage.totalPlannedMins,
        totalActualMins: timeCoverage.totalActualMins,
        totalWrong,
      },
      timeCoverage: {
        totalAvailableMins: timeCoverage.totalAvailableMins,
        plannedCoverage: timeCoverage.plannedCoverage.toFixed(1),
        actualCoverage: timeCoverage.actualCoverage.toFixed(1),
      },
      subjects: subjects.map(s => ({
        subject: s.subject,
        emoji: s.emoji,
        totalTasks: s.totalTasks,
        doneTasks: s.doneTasks,
        completionRate: s.completionRate.toFixed(1),
        totalEstMins: s.totalEstMins,
        totalActualMins: s.totalActualMins,
        totalWrong: s.totalWrong,
      })),
    },
    null,
    2
  );
  md += `\n\`\`\`\n\n`;

  md += `---\n\n`;
  md += `*Generated with [Bunny Universe](https://log.bunnyuniverse.com) 🐰*\n`;

  return md;
}

/**
 * Download markdown file
 */
export function downloadMarkdown(content: string, filename: string): void {
  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
