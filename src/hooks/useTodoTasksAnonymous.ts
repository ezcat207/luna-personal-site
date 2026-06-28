import { useState, useEffect, useCallback } from 'react';
import type { Task, CreateTaskInput, UpdateTaskInput } from '../types/todo';

/**
 * Anonymous mode: Tasks stored in localStorage
 * Used when user is not logged in
 */

const STORAGE_KEY = 'todo_star_tasks';

function getTasksFromStorage(): Task[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error('Error reading from localStorage:', err);
    return [];
  }
}

function saveTasksToStorage(tasks: Task[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (err) {
    console.error('Error writing to localStorage:', err);
  }
}

export function useTodoTasksAnonymous() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load tasks from localStorage on mount
  useEffect(() => {
    const storedTasks = getTasksFromStorage();
    setTasks(storedTasks);
    setLoading(false);
  }, []);

  // Save to localStorage whenever tasks change
  useEffect(() => {
    if (!loading) {
      saveTasksToStorage(tasks);
    }
  }, [tasks, loading]);

  // Create a new task
  const createTask = useCallback(async (input: CreateTaskInput): Promise<Task | null> => {
    try {
      const newTask: Task = {
        id: crypto.randomUUID(),
        user_id: 'anonymous',
        title: input.title,
        description: input.description || null,
        status: 'todo',
        priority: input.priority || 'medium',
        is_top3: input.is_top3 || false,
        time_block_start: input.time_block_start || null,
        time_block_end: input.time_block_end || null,
        due_date: input.due_date || null,
        completed_at: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      setTasks(prev => [newTask, ...prev]);
      return newTask;
    } catch (err) {
      console.error('Error creating task:', err);
      setError(err instanceof Error ? err.message : 'Failed to create task');
      return null;
    }
  }, []);

  // Update an existing task
  const updateTask = useCallback(async (id: string, updates: UpdateTaskInput): Promise<boolean> => {
    try {
      setTasks(prev =>
        prev.map(task =>
          task.id === id
            ? { ...task, ...updates, updated_at: new Date().toISOString() }
            : task
        )
      );
      return true;
    } catch (err) {
      console.error('Error updating task:', err);
      setError(err instanceof Error ? err.message : 'Failed to update task');
      return false;
    }
  }, []);

  // Delete a task
  const deleteTask = useCallback(async (id: string): Promise<boolean> => {
    try {
      setTasks(prev => prev.filter(task => task.id !== id));
      return true;
    } catch (err) {
      console.error('Error deleting task:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete task');
      return false;
    }
  }, []);

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

  // Refetch (no-op for localStorage mode)
  const refetch = useCallback(async () => {
    const storedTasks = getTasksFromStorage();
    setTasks(storedTasks);
  }, []);

  return {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask,
    toggleComplete,
    toggleTop3,
    refetch,
  };
}
