-- ============================================================
-- Migration 003: RLS policies for user data isolation
-- Prevents cross-user data contamination in log tables.
-- Run: cd luna-personal-site && supabase db push
-- ============================================================

-- ─── luna_daily_logs ───────────────────────────────────────

ALTER TABLE luna_daily_logs ENABLE ROW LEVEL SECURITY;

-- Drop any pre-existing policies to make this idempotent
DROP POLICY IF EXISTS "users_own_logs_select"  ON luna_daily_logs;
DROP POLICY IF EXISTS "users_own_logs_insert"  ON luna_daily_logs;
DROP POLICY IF EXISTS "users_own_logs_update"  ON luna_daily_logs;
DROP POLICY IF EXISTS "users_own_logs_delete"  ON luna_daily_logs;
DROP POLICY IF EXISTS "anon_logs_select"       ON luna_daily_logs;
DROP POLICY IF EXISTS "anon_logs_insert"       ON luna_daily_logs;
DROP POLICY IF EXISTS "anon_logs_update"       ON luna_daily_logs;
DROP POLICY IF EXISTS "anon_logs_delete"       ON luna_daily_logs;

-- Authenticated users: only their own rows
CREATE POLICY "users_own_logs_select" ON luna_daily_logs
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "users_own_logs_insert" ON luna_daily_logs
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "users_own_logs_update" ON luna_daily_logs
  FOR UPDATE TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "users_own_logs_delete" ON luna_daily_logs
  FOR DELETE TO authenticated
  USING (user_id = auth.uid());

-- Anonymous users: only rows with no user_id (shared/public logs)
CREATE POLICY "anon_logs_select" ON luna_daily_logs
  FOR SELECT TO anon
  USING (user_id IS NULL);

CREATE POLICY "anon_logs_insert" ON luna_daily_logs
  FOR INSERT TO anon
  WITH CHECK (user_id IS NULL);

CREATE POLICY "anon_logs_update" ON luna_daily_logs
  FOR UPDATE TO anon
  USING (user_id IS NULL)
  WITH CHECK (user_id IS NULL);

-- Unique index: one log per authenticated user per day
-- (only for non-null user_ids; PostgreSQL NULLs are never equal
-- so a regular UNIQUE constraint would allow infinite anon rows)
CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_log_per_user_per_day
  ON luna_daily_logs (log_date, user_id)
  WHERE user_id IS NOT NULL;

-- ─── luna_log_tasks ────────────────────────────────────────

ALTER TABLE luna_log_tasks ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "tasks_via_log_select" ON luna_log_tasks;
DROP POLICY IF EXISTS "tasks_via_log_insert" ON luna_log_tasks;
DROP POLICY IF EXISTS "tasks_via_log_update" ON luna_log_tasks;
DROP POLICY IF EXISTS "tasks_via_log_delete" ON luna_log_tasks;
DROP POLICY IF EXISTS "anon_tasks_all"       ON luna_log_tasks;

-- Authenticated: tasks belong to their own logs only
CREATE POLICY "tasks_via_log_select" ON luna_log_tasks
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM luna_daily_logs
      WHERE luna_daily_logs.id = luna_log_tasks.log_id
        AND luna_daily_logs.user_id = auth.uid()
    )
  );

CREATE POLICY "tasks_via_log_insert" ON luna_log_tasks
  FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM luna_daily_logs
      WHERE luna_daily_logs.id = luna_log_tasks.log_id
        AND luna_daily_logs.user_id = auth.uid()
    )
  );

CREATE POLICY "tasks_via_log_update" ON luna_log_tasks
  FOR UPDATE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM luna_daily_logs
      WHERE luna_daily_logs.id = luna_log_tasks.log_id
        AND luna_daily_logs.user_id = auth.uid()
    )
  );

CREATE POLICY "tasks_via_log_delete" ON luna_log_tasks
  FOR DELETE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM luna_daily_logs
      WHERE luna_daily_logs.id = luna_log_tasks.log_id
        AND luna_daily_logs.user_id = auth.uid()
    )
  );

-- Anonymous: tasks belonging to public (null user_id) logs only
CREATE POLICY "anon_tasks_all" ON luna_log_tasks
  FOR ALL TO anon
  USING (
    EXISTS (
      SELECT 1 FROM luna_daily_logs
      WHERE luna_daily_logs.id = luna_log_tasks.log_id
        AND luna_daily_logs.user_id IS NULL
    )
  );
