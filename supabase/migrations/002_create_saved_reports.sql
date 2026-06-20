-- Create saved reports table for log analysis
CREATE TABLE IF NOT EXISTS luna_saved_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  report_name TEXT NOT NULL,
  date_start DATE NOT NULL,
  date_end DATE NOT NULL,
  summary_data JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add index for faster queries
CREATE INDEX IF NOT EXISTS idx_saved_reports_user_id ON luna_saved_reports(user_id);
CREATE INDEX IF NOT EXISTS idx_saved_reports_created_at ON luna_saved_reports(created_at DESC);

-- Add RLS policies
ALTER TABLE luna_saved_reports ENABLE ROW LEVEL SECURITY;

-- Users can only see their own reports
CREATE POLICY "Users can view their own reports"
  ON luna_saved_reports
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own reports
CREATE POLICY "Users can insert their own reports"
  ON luna_saved_reports
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own reports
CREATE POLICY "Users can update their own reports"
  ON luna_saved_reports
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can delete their own reports
CREATE POLICY "Users can delete their own reports"
  ON luna_saved_reports
  FOR DELETE
  USING (auth.uid() = user_id);
