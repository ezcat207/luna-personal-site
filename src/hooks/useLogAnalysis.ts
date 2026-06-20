import { useState, useEffect, useMemo } from 'react';
import { supabase } from '../lib/supabase';
import type { Task, TaskWithLog, AggregatedSubject, TimeCoverageStats } from '../types/log';
import { aggregateBySubject, calculateTimeCoverage } from '../utils/log/aggregation';

interface UseLogAnalysisReturn {
  tasks: Task[];
  subjects: AggregatedSubject[];
  timeCoverage: TimeCoverageStats | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useLogAnalysis(
  startDate: string,
  endDate: string,
  userId: string | null
): UseLogAnalysisReturn {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch tasks in date range
  const fetchTasks = async () => {
    if (!supabase || !userId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('luna_log_tasks')
        .select(`
          *,
          log:luna_daily_logs!inner(log_date, user_id)
        `)
        .eq('log.user_id', userId)
        .gte('log.log_date', startDate)
        .lte('log.log_date', endDate);

      if (fetchError) throw fetchError;

      // Extract tasks from nested structure
      const tasksData = (data as unknown as TaskWithLog[]).map(item => {
        const { log, ...task } = item;
        return task as Task;
      });

      setTasks(tasksData);
    } catch (err) {
      console.error('Error fetching analysis data:', err);
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate, userId]);

  // Aggregate subjects
  const subjects = useMemo(() => {
    if (tasks.length === 0) return [];
    return aggregateBySubject(tasks);
  }, [tasks]);

  // Calculate time coverage
  const timeCoverage = useMemo(() => {
    if (tasks.length === 0) return null;
    return calculateTimeCoverage(tasks, startDate, endDate);
  }, [tasks, startDate, endDate]);

  return {
    tasks,
    subjects,
    timeCoverage,
    loading,
    error,
    refetch: fetchTasks,
  };
}
