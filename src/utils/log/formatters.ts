/**
 * Format minutes to human-readable time
 * @param mins - Total minutes
 * @returns Formatted string like "2h 30m" or "45m"
 */
export function formatMins(mins: number): string {
  if (!mins || mins === 0) return '0m';

  const hours = Math.floor(mins / 60);
  const minutes = mins % 60;

  if (hours === 0) return `${minutes}m`;
  if (minutes === 0) return `${hours}h`;
  return `${hours}h ${minutes}m`;
}

/**
 * Format date to short format
 * @param dateStr - ISO date string (YYYY-MM-DD)
 * @param lang - Language ('en' | 'zh')
 * @returns Formatted date like "06/13" or "6月13日"
 */
export function formatDateShort(dateStr: string, lang: 'en' | 'zh' = 'en'): string {
  const d = new Date(dateStr + 'T12:00:00');

  if (lang === 'zh') {
    return `${d.getMonth() + 1}月${d.getDate()}日`;
  }

  return `${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}`;
}

/**
 * Format date to full format
 * @param dateStr - ISO date string (YYYY-MM-DD)
 * @param lang - Language ('en' | 'zh')
 * @returns Formatted date like "June 13, 2026" or "2026年6月13日"
 */
export function formatDateFull(dateStr: string, lang: 'en' | 'zh' = 'en'): string {
  const d = new Date(dateStr + 'T12:00:00');

  if (lang === 'zh') {
    return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
  }

  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

/**
 * Format date range
 * @param start - Start date (YYYY-MM-DD)
 * @param end - End date (YYYY-MM-DD)
 * @param lang - Language
 * @returns Formatted range like "Jun 13 - Jun 20, 2026"
 */
export function formatDateRange(start: string, end: string, lang: 'en' | 'zh' = 'en'): string {
  const startDate = new Date(start + 'T12:00:00');
  const endDate = new Date(end + 'T12:00:00');

  if (lang === 'zh') {
    return `${startDate.getFullYear()}年${startDate.getMonth() + 1}月${startDate.getDate()}日 - ${endDate.getMonth() + 1}月${endDate.getDate()}日`;
  }

  const startMonth = startDate.toLocaleDateString('en-US', { month: 'short' });
  const endMonth = endDate.toLocaleDateString('en-US', { month: 'short' });
  const year = endDate.getFullYear();

  if (startMonth === endMonth) {
    return `${startMonth} ${startDate.getDate()}-${endDate.getDate()}, ${year}`;
  }

  return `${startMonth} ${startDate.getDate()} - ${endMonth} ${endDate.getDate()}, ${year}`;
}

/**
 * Format relative time
 * @param dateStr - ISO timestamp
 * @returns Relative time like "2 hours ago" or "3 days ago"
 */
export function formatRelativeTime(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 30) return `${diffDays}d ago`;

  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

/**
 * Get today's date in YYYY-MM-DD format (Pacific Time)
 */
export function todayStr(): string {
  return new Date().toLocaleDateString('en-CA', { timeZone: 'America/Los_Angeles' });
}

/**
 * Offset a date by N days
 * @param base - Base date (YYYY-MM-DD)
 * @param days - Days to offset (positive or negative)
 * @returns New date string (YYYY-MM-DD)
 */
export function offsetDate(base: string, days: number): string {
  const d = new Date(base + 'T12:00:00');
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}
