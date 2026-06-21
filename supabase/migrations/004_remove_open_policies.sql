-- ============================================================
-- Migration 004: Remove open/public policies that bypass RLS
-- The pre-existing "open *" policies (roles: public, qual: true)
-- allow any user to read/write ALL rows, rendering migration 003
-- ineffective (Postgres ORs all matching policies together).
-- ============================================================

-- ─── luna_daily_logs ───────────────────────────────────────
DROP POLICY IF EXISTS "open read luna_daily_logs"   ON luna_daily_logs;
DROP POLICY IF EXISTS "open insert luna_daily_logs" ON luna_daily_logs;
DROP POLICY IF EXISTS "open update luna_daily_logs" ON luna_daily_logs;
DROP POLICY IF EXISTS "open delete luna_daily_logs" ON luna_daily_logs;

-- ─── luna_log_tasks ────────────────────────────────────────
DROP POLICY IF EXISTS "open read luna_log_tasks"    ON luna_log_tasks;
DROP POLICY IF EXISTS "open insert luna_log_tasks"  ON luna_log_tasks;
DROP POLICY IF EXISTS "open update luna_log_tasks"  ON luna_log_tasks;
DROP POLICY IF EXISTS "open delete luna_log_tasks"  ON luna_log_tasks;
