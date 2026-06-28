-- Migration: Todo Star MVP Tables
-- Created: 2026-06-28
-- Description: Creates database schema for Todo Star (待办星) Phase 1 MVP
-- Tables: todo_tasks, todo_pomodoros, todo_daily_reviews

-- ============================================================================
-- 1. Tasks Table (任务管理)
-- ============================================================================

CREATE TABLE IF NOT EXISTS todo_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,

  -- Basic info
  title TEXT NOT NULL,
  description TEXT,

  -- Status & Priority
  status TEXT NOT NULL DEFAULT 'todo' CHECK (status IN ('todo', 'in_progress', 'completed', 'archived')),
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('high', 'medium', 'low')),
  is_top3 BOOLEAN DEFAULT false,

  -- Time management
  time_block_start TIMESTAMPTZ,
  time_block_end TIMESTAMPTZ,
  due_date DATE,

  -- Completion tracking
  completed_at TIMESTAMPTZ,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Index for fast user queries
CREATE INDEX IF NOT EXISTS idx_todo_tasks_user_id ON todo_tasks(user_id);
CREATE INDEX IF NOT EXISTS idx_todo_tasks_status ON todo_tasks(status);
CREATE INDEX IF NOT EXISTS idx_todo_tasks_is_top3 ON todo_tasks(is_top3) WHERE is_top3 = true;
CREATE INDEX IF NOT EXISTS idx_todo_tasks_due_date ON todo_tasks(due_date) WHERE due_date IS NOT NULL;

-- Row Level Security (RLS)
ALTER TABLE todo_tasks ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own tasks
CREATE POLICY "Users can view their own tasks"
  ON todo_tasks FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can insert their own tasks
CREATE POLICY "Users can insert their own tasks"
  ON todo_tasks FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own tasks
CREATE POLICY "Users can update their own tasks"
  ON todo_tasks FOR UPDATE
  USING (auth.uid() = user_id);

-- Policy: Users can delete their own tasks
CREATE POLICY "Users can delete their own tasks"
  ON todo_tasks FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================================================
-- 2. Pomodoros Table (番茄钟记录)
-- ============================================================================

CREATE TABLE IF NOT EXISTS todo_pomodoros (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  task_id UUID REFERENCES todo_tasks(id) ON DELETE SET NULL,

  -- Timer settings
  duration_minutes INTEGER NOT NULL DEFAULT 25,

  -- Completion tracking
  completed BOOLEAN DEFAULT false,
  started_at TIMESTAMPTZ NOT NULL,
  completed_at TIMESTAMPTZ,

  -- Timestamp
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Index for fast user queries
CREATE INDEX IF NOT EXISTS idx_todo_pomodoros_user_id ON todo_pomodoros(user_id);
CREATE INDEX IF NOT EXISTS idx_todo_pomodoros_task_id ON todo_pomodoros(task_id);
CREATE INDEX IF NOT EXISTS idx_todo_pomodoros_started_at ON todo_pomodoros(started_at);

-- Row Level Security (RLS)
ALTER TABLE todo_pomodoros ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own pomodoros
CREATE POLICY "Users can view their own pomodoros"
  ON todo_pomodoros FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can insert their own pomodoros
CREATE POLICY "Users can insert their own pomodoros"
  ON todo_pomodoros FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own pomodoros
CREATE POLICY "Users can update their own pomodoros"
  ON todo_pomodoros FOR UPDATE
  USING (auth.uid() = user_id);

-- Policy: Users can delete their own pomodoros
CREATE POLICY "Users can delete their own pomodoros"
  ON todo_pomodoros FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================================================
-- 3. Daily Reviews Table (每日复盘)
-- ============================================================================

CREATE TABLE IF NOT EXISTS todo_daily_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,

  -- Review date
  date DATE NOT NULL,

  -- Review content
  problem_reflection TEXT,        -- One problem I noticed
  optimization_action TEXT,        -- One thing I'll do differently
  tomorrow_first_task TEXT,        -- Tomorrow's first task

  -- Stats (auto-calculated or manually entered)
  completed_tasks_count INTEGER DEFAULT 0,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),

  -- Ensure one review per user per day
  UNIQUE(user_id, date)
);

-- Index for fast user queries
CREATE INDEX IF NOT EXISTS idx_todo_daily_reviews_user_id ON todo_daily_reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_todo_daily_reviews_date ON todo_daily_reviews(date);

-- Row Level Security (RLS)
ALTER TABLE todo_daily_reviews ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own reviews
CREATE POLICY "Users can view their own reviews"
  ON todo_daily_reviews FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can insert their own reviews
CREATE POLICY "Users can insert their own reviews"
  ON todo_daily_reviews FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own reviews
CREATE POLICY "Users can update their own reviews"
  ON todo_daily_reviews FOR UPDATE
  USING (auth.uid() = user_id);

-- Policy: Users can delete their own reviews
CREATE POLICY "Users can delete their own reviews"
  ON todo_daily_reviews FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================================================
-- Functions & Triggers
-- ============================================================================

-- Function: Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger: Auto-update updated_at for todo_tasks
CREATE TRIGGER update_todo_tasks_updated_at
  BEFORE UPDATE ON todo_tasks
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger: Auto-update updated_at for todo_daily_reviews
CREATE TRIGGER update_todo_daily_reviews_updated_at
  BEFORE UPDATE ON todo_daily_reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- Helpful Views (Optional - for analytics)
-- ============================================================================

-- View: Today's tasks for each user
CREATE OR REPLACE VIEW todo_today_tasks AS
SELECT
  t.*,
  CASE
    WHEN t.due_date = CURRENT_DATE THEN 'due_today'
    WHEN t.due_date < CURRENT_DATE THEN 'overdue'
    WHEN t.is_top3 = true THEN 'top3'
    ELSE 'normal'
  END as task_urgency
FROM todo_tasks t
WHERE t.status != 'archived'
ORDER BY t.is_top3 DESC, t.priority DESC, t.created_at ASC;

-- View: Daily pomodoro count per user
CREATE OR REPLACE VIEW todo_daily_pomodoro_stats AS
SELECT
  user_id,
  DATE(started_at) as date,
  COUNT(*) as total_pomodoros,
  COUNT(*) FILTER (WHERE completed = true) as completed_pomodoros,
  SUM(duration_minutes) FILTER (WHERE completed = true) as total_focus_minutes
FROM todo_pomodoros
GROUP BY user_id, DATE(started_at);

-- ============================================================================
-- End of Migration
-- ============================================================================

-- Grant necessary permissions (if needed)
-- GRANT ALL ON todo_tasks TO authenticated;
-- GRANT ALL ON todo_pomodoros TO authenticated;
-- GRANT ALL ON todo_daily_reviews TO authenticated;
