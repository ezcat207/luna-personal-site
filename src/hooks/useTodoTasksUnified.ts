import { useAuth } from './useAuth';
import { useTodoTasks } from './useTodoTasks';
import { useTodoTasksAnonymous } from './useTodoTasksAnonymous';

/**
 * Unified hook that automatically switches between:
 * - Supabase (when logged in)
 * - localStorage (when anonymous)
 */
export function useTodoTasksUnified() {
  const { user } = useAuth();

  const supabaseHook = useTodoTasks();
  const localStorageHook = useTodoTasksAnonymous();

  // Return Supabase hook if logged in, otherwise localStorage hook
  return user ? supabaseHook : localStorageHook;
}
