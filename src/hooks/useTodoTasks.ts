import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';
import type { Task, CreateTaskInput, UpdateTaskInput, TaskStatus } from '../types/todo';

/**
 * Hook for managing Todo tasks with Supabase real-time sync
 *
 * Features:
 * - CRUD operations (Create, Read, Update, Delete)
 * - Real-time subscriptions for cross-tab sync
 * - Optimistic updates for instant UI feedback
 * - User-scoped queries (only fetch current user's tasks)
 */
export function useTodoTasks() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all tasks for the current user
  const fetchTasks = useCallback(async () => {
    if (!user) {
      setTasks([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase!
        .from('todo_tasks')
        .select('*')
        .eq('user_id', user.id)
        .neq('status', 'archived') // Exclude archived tasks
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      setTasks(data || []);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Create a new task
  const createTask = useCallback(async (input: CreateTaskInput): Promise<Task | null> => {
    if (!user) {
      setError('Must be logged in to create tasks');
      return null;
    }

    try {
      const newTask = {
        ...input,
        user_id: user.id,
        status: 'todo' as TaskStatus,
        priority: input.priority || 'medium',
        is_top3: input.is_top3 || false,
      };

      const { data, error: createError } = await supabase!
        .from('todo_tasks')
        .insert([newTask])
        .select()
        .single();

      if (createError) throw createError;

      // Optimistic update
      setTasks(prev => [data, ...prev]);

      return data;
    } catch (err) {
      console.error('Error creating task:', err);
      setError(err instanceof Error ? err.message : 'Failed to create task');
      return null;
    }
  }, [user]);

  // Update an existing task
  const updateTask = useCallback(async (id: string, updates: UpdateTaskInput): Promise<boolean> => {
    if (!user) {
      setError('Must be logged in to update tasks');
      return false;
    }

    try {
      // Optimistic update (update UI immediately)
      setTasks(prev =>
        prev.map(task =>
          task.id === id ? { ...task, ...updates, updated_at: new Date().toISOString() } : task
        )
      );

      const { error: updateError } = await supabase!
        .from('todo_tasks')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id); // Security: ensure user owns the task

      if (updateError) {
        // Revert optimistic update on error
        await fetchTasks();
        throw updateError;
      }

      return true;
    } catch (err) {
      console.error('Error updating task:', err);
      setError(err instanceof Error ? err.message : 'Failed to update task');
      return false;
    }
  }, [user, fetchTasks]);

  // Delete a task
  const deleteTask = useCallback(async (id: string): Promise<boolean> => {
    if (!user) {
      setError('Must be logged in to delete tasks');
      return false;
    }

    try {
      // Optimistic update (remove from UI immediately)
      setTasks(prev => prev.filter(task => task.id !== id));

      const { error: deleteError } = await supabase!
        .from('todo_tasks')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id); // Security: ensure user owns the task

      if (deleteError) {
        // Revert optimistic update on error
        await fetchTasks();
        throw deleteError;
      }

      return true;
    } catch (err) {
      console.error('Error deleting task:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete task');
      return false;
    }
  }, [user, fetchTasks]);

  // Toggle task completion
  const toggleComplete = useCallback(async (id: string): Promise<boolean> => {
    const task = tasks.find(t => t.id === id);
    if (!task) return false;

    const isCompleting = task.status !== 'completed';

    return await updateTask(id, {
      status: isCompleting ? 'completed' : 'todo',
      completed_at: isCompleting ? new Date().toISOString() : undefined,
    });
  }, [tasks, updateTask]);

  // Toggle Top 3 status (max 3 tasks)
  const toggleTop3 = useCallback(async (id: string): Promise<boolean> => {
    const task = tasks.find(t => t.id === id);
    if (!task) return false;

    const currentTop3Count = tasks.filter(t => t.is_top3).length;

    // If trying to add to Top 3 and already have 3, prevent
    if (!task.is_top3 && currentTop3Count >= 3) {
      setError('You can only have 3 top priority tasks at a time');
      return false;
    }

    return await updateTask(id, {
      is_top3: !task.is_top3,
    });
  }, [tasks, updateTask]);

  // Fetch tasks on mount and when user changes
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Set up real-time subscription for cross-tab sync
  useEffect(() => {
    if (!user) return;

    const channel = supabase!
      .channel('todo_tasks_changes')
      .on(
        'postgres_changes',
        {
          event: '*', // Listen to all events (INSERT, UPDATE, DELETE)
          schema: 'public',
          table: 'todo_tasks',
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          console.log('Real-time update:', payload);

          if (payload.eventType === 'INSERT') {
            setTasks(prev => {
              // Avoid duplicates (optimistic update might have already added it)
              if (prev.some(t => t.id === payload.new.id)) return prev;
              return [payload.new as Task, ...prev];
            });
          } else if (payload.eventType === 'UPDATE') {
            setTasks(prev =>
              prev.map(task => (task.id === payload.new.id ? (payload.new as Task) : task))
            );
          } else if (payload.eventType === 'DELETE') {
            setTasks(prev => prev.filter(task => task.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    // Cleanup subscription on unmount
    return () => {
      supabase!.removeChannel(channel);
    };
  }, [user]);

  return {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask,
    toggleComplete,
    toggleTop3,
    refetch: fetchTasks,
  };
}
