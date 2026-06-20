import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { SavedReport } from '../types/log';

interface UseSavedReportsReturn {
  reports: SavedReport[];
  loading: boolean;
  error: string | null;
  saveReport: (report: Omit<SavedReport, 'id' | 'created_at'>) => Promise<SavedReport | null>;
  deleteReport: (id: string) => Promise<boolean>;
  refetch: () => void;
}

export function useSavedReports(userId: string | null): UseSavedReportsReturn {
  const [reports, setReports] = useState<SavedReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all saved reports for user
  const fetchReports = useCallback(async () => {
    if (!supabase || !userId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('luna_saved_reports')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      setReports((data || []) as SavedReport[]);
    } catch (err) {
      console.error('Error fetching saved reports:', err);
      setError(err instanceof Error ? err.message : 'Failed to load reports');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  // Save a new report
  const saveReport = async (
    report: Omit<SavedReport, 'id' | 'created_at'>
  ): Promise<SavedReport | null> => {
    if (!supabase || !userId) return null;

    try {
      const { data, error: insertError } = await supabase
        .from('luna_saved_reports')
        .insert({
          user_id: userId,
          report_name: report.report_name,
          date_start: report.date_start,
          date_end: report.date_end,
          summary_data: report.summary_data,
        })
        .select()
        .single();

      if (insertError) throw insertError;

      const newReport = data as SavedReport;
      setReports(prev => [newReport, ...prev]);
      return newReport;
    } catch (err) {
      console.error('Error saving report:', err);
      throw err;
    }
  };

  // Delete a report
  const deleteReport = async (id: string): Promise<boolean> => {
    if (!supabase) return false;

    try {
      const { error: deleteError } = await supabase
        .from('luna_saved_reports')
        .delete()
        .eq('id', id);

      if (deleteError) throw deleteError;

      setReports(prev => prev.filter(r => r.id !== id));
      return true;
    } catch (err) {
      console.error('Error deleting report:', err);
      return false;
    }
  };

  return {
    reports,
    loading,
    error,
    saveReport,
    deleteReport,
    refetch: fetchReports,
  };
}
