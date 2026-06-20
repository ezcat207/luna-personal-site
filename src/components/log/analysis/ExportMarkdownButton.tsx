import { useState } from 'react';
import type { AggregatedSubject, TimeCoverageStats } from '../../../types/log';
import { generateMarkdownReport, downloadMarkdown } from '../../../utils/log/exportMarkdown';

interface ExportMarkdownButtonProps {
  startDate: string;
  endDate: string;
  subjects: AggregatedSubject[];
  timeCoverage: TimeCoverageStats | null;
}

export function ExportMarkdownButton({
  startDate,
  endDate,
  subjects,
  timeCoverage,
}: ExportMarkdownButtonProps) {
  const [exporting, setExporting] = useState(false);

  const handleExport = () => {
    if (!timeCoverage || subjects.length === 0) return;

    try {
      setExporting(true);

      const markdown = generateMarkdownReport(startDate, endDate, subjects, timeCoverage);
      const filename = `learning-analysis-${startDate}-to-${endDate}.md`;

      downloadMarkdown(markdown, filename);

      // Optional: Show success toast (you can add a toast library later)
      console.log('Report exported successfully!');
    } catch (err) {
      console.error('Failed to export:', err);
    } finally {
      setExporting(false);
    }
  };

  const isDisabled = !timeCoverage || subjects.length === 0 || exporting;

  return (
    <button
      onClick={handleExport}
      disabled={isDisabled}
      className="px-4 py-2 bg-indigo-500 text-white rounded-lg text-sm font-bold hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
      title="Export analysis as Markdown file"
    >
      <span>📥</span>
      <span className="hidden sm:inline">{exporting ? 'Exporting...' : 'Export MD'}</span>
    </button>
  );
}
