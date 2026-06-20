// ─── Shared Types for Log System ─────────────────────────────────────────────

export type TemplateId = 'school' | 'summer' | 'custom';
export type TaskStatus = 'none' | 'done' | 'skip';
export type Weather = 'sunny' | 'cloudy' | 'rainy';

export interface Task {
  id: string;
  log_id: string;
  subject: string;
  task_text: string;
  est_mins: number | null;
  actual_mins: number | null;
  status: TaskStatus;
  wrong_count: number;
  sort_order: number;
}

export interface DailyLog {
  id: string;
  log_date: string;
  template: TemplateId;
  weather: Weather;
  wake_time: string | null;
  sleep_time: string | null;
  self_efficiency: number;
  self_accuracy: number;
  self_handwriting: number;
  luna_notes: string | null;
  dad_comment: string | null;
  user_id: string | null;
  is_public: boolean;
}

// ─── Analysis Types ───────────────────────────────────────────────────────────

export interface TaskWithLog extends Task {
  log: {
    log_date: string;
    user_id: string | null;
  };
}

export interface AggregatedSubject {
  subject: string;
  emoji?: string;
  totalTasks: number;
  doneTasks: number;
  completionRate: number;
  totalEstMins: number;
  totalActualMins: number;
  totalWrong: number;
  subTasks?: AggregatedSubject[];
}

export interface SavedReport {
  id: string;
  user_id: string;
  report_name: string;
  date_start: string;
  date_end: string;
  summary_data: {
    totalTasks: number;
    doneTasks: number;
    totalEstMins: number;
    totalActualMins: number;
    totalWrong: number;
    subjects: AggregatedSubject[];
  };
  created_at: string;
}

export interface TimeCoverageStats {
  totalDays: number;
  totalAvailableMins: number;
  totalPlannedMins: number;
  totalActualMins: number;
  plannedCoverage: number;
  actualCoverage: number;
}
