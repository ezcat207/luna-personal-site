// ============================================================================
// Todo Star - TypeScript Type Definitions
// ============================================================================

/**
 * Task status values
 */
export type TaskStatus = 'todo' | 'in_progress' | 'completed' | 'archived';

/**
 * Task priority levels
 */
export type TaskPriority = 'high' | 'medium' | 'low';

/**
 * Task interface matching database schema
 */
export interface Task {
  id: string;
  user_id: string;

  // Basic info
  title: string;
  description: string | null;

  // Status & Priority
  status: TaskStatus;
  priority: TaskPriority;
  is_top3: boolean;

  // Time management
  time_block_start: string | null; // ISO 8601 timestamp
  time_block_end: string | null;   // ISO 8601 timestamp
  due_date: string | null;         // ISO 8601 date (YYYY-MM-DD)

  // Completion tracking
  completed_at: string | null;     // ISO 8601 timestamp

  // Timestamps
  created_at: string;              // ISO 8601 timestamp
  updated_at: string;              // ISO 8601 timestamp
}

/**
 * Pomodoro session interface matching database schema
 */
export interface Pomodoro {
  id: string;
  user_id: string;
  task_id: string | null;

  // Timer settings
  duration_minutes: number;

  // Completion tracking
  completed: boolean;
  started_at: string;    // ISO 8601 timestamp
  completed_at: string | null; // ISO 8601 timestamp

  // Timestamp
  created_at: string;    // ISO 8601 timestamp
}

/**
 * Daily review interface matching database schema
 */
export interface DailyReview {
  id: string;
  user_id: string;

  // Review date
  date: string; // ISO 8601 date (YYYY-MM-DD)

  // Review content
  problem_reflection: string | null;
  optimization_action: string | null;
  tomorrow_first_task: string | null;

  // Stats
  completed_tasks_count: number;

  // Timestamps
  created_at: string;    // ISO 8601 timestamp
  updated_at: string;    // ISO 8601 timestamp
}

/**
 * Task creation payload (omits auto-generated fields)
 */
export interface CreateTaskInput {
  title: string;
  description?: string;
  priority?: TaskPriority;
  is_top3?: boolean;
  time_block_start?: string;
  time_block_end?: string;
  due_date?: string;
}

/**
 * Task update payload (all fields optional)
 */
export interface UpdateTaskInput {
  title?: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  is_top3?: boolean;
  time_block_start?: string;
  time_block_end?: string;
  due_date?: string;
  completed_at?: string;
}

/**
 * Pomodoro creation payload
 */
export interface CreatePomodoroInput {
  task_id?: string;
  duration_minutes?: number;
  started_at?: string;
}

/**
 * Daily review creation/update payload
 */
export interface UpsertDailyReviewInput {
  date: string;
  problem_reflection?: string;
  optimization_action?: string;
  tomorrow_first_task?: string;
  completed_tasks_count?: number;
}

/**
 * TaskCard component variant types
 */
export type TaskCardVariant = 'default' | 'compact' | 'top3';

/**
 * Pomodoro timer states
 */
export type PomodoroTimerState = 'idle' | 'running' | 'paused' | 'resting' | 'completed';
