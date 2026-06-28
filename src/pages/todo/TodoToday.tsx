import { useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTodoTasksUnified } from '../../hooks/useTodoTasksUnified';
import { useAuth } from '../../hooks/useAuth';
import TaskCard from '../../components/todo/TaskCard';
import QuickAddTask from '../../components/todo/QuickAddTask';

export default function TodoToday() {
  const { user } = useAuth();
  const {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask,
    toggleComplete,
    toggleTop3,
  } = useTodoTasksUnified();

  // Filter tasks
  const top3Tasks = useMemo(() => tasks.filter(t => t.is_top3 && t.status !== 'completed'), [tasks]);
  const regularTasks = useMemo(() => tasks.filter(t => !t.is_top3 && t.status !== 'completed'), [tasks]);
  const completedTasks = useMemo(() => tasks.filter(t => t.status === 'completed'), [tasks]);

  // Handlers
  const handleAddTask = async (title: string) => {
    await createTask({ title });
  };

  const handleEditTask = async (id: string, title: string) => {
    await updateTask(id, { title });
  };

  // Anonymous mode banner (show at top if not logged in)
  const anonymousBanner = !user && (
    <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
      <div className="flex items-start gap-3">
        <span className="text-2xl">⚠️</span>
        <div className="flex-1">
          <h3 className="font-semibold text-yellow-900 mb-1">
            You're using Todo Star in anonymous mode
          </h3>
          <p className="text-sm text-yellow-700 mb-3">
            Your tasks are saved locally on this device only. Sign in to sync across all your devices.
          </p>
          <button
            onClick={() => {/* AuthButton will handle this */}}
            className="text-sm font-medium text-yellow-900 hover:text-yellow-700 underline"
          >
            Sign in to sync your data →
          </button>
        </div>
      </div>
    </div>
  );

  // Loading state
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-slate-200 rounded w-48 animate-pulse" />
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-24 bg-slate-100 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <h3 className="text-red-800 font-medium">Error loading tasks</h3>
        <p className="text-red-600 text-sm mt-1">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Anonymous mode banner */}
      {anonymousBanner}

      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Today's Plan</h1>
        <p className="text-slate-600">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* Top 3 Priority Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-slate-900">
            ⭐ Today's Top 3 Priorities
          </h2>
          <span className="text-sm text-slate-500">
            {top3Tasks.length} / 3
          </span>
        </div>

        {top3Tasks.length === 0 ? (
          <div className="bg-indigo-50 border-2 border-dashed border-indigo-200 rounded-xl p-8 text-center">
            <p className="text-indigo-700 font-medium mb-2">
              No top priorities set for today
            </p>
            <p className="text-indigo-600 text-sm">
              Click the star icon ⭐ on any task below to mark it as a top priority
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {top3Tasks.map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  variant="top3"
                  onToggle={toggleComplete}
                  onEdit={handleEditTask}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </section>

      {/* All Tasks Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-slate-900">All Tasks</h2>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <span>{regularTasks.length} active</span>
            <span>•</span>
            <span>{completedTasks.length} completed</span>
          </div>
        </div>

        {/* Quick Add */}
        <div className="mb-6">
          <QuickAddTask
            onAdd={handleAddTask}
            placeholder="What needs to be done today?"
          />
        </div>

        {/* Task List */}
        {regularTasks.length === 0 && completedTasks.length === 0 ? (
          <div className="text-center py-12 text-slate-500">
            <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p className="text-lg font-medium">No tasks yet</p>
            <p className="text-sm mt-1">Add your first task above to get started</p>
          </div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {regularTasks.map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  variant="default"
                  onToggle={toggleComplete}
                  onToggleTop3={toggleTop3}
                  onEdit={handleEditTask}
                  onDelete={deleteTask}
                />
              ))}
            </AnimatePresence>

            {/* Completed Tasks (Collapsible) */}
            {completedTasks.length > 0 && (
              <details className="mt-6">
                <summary className="cursor-pointer text-slate-600 hover:text-slate-900 font-medium mb-3">
                  Completed Tasks ({completedTasks.length})
                </summary>
                <div className="space-y-2 ml-4">
                  <AnimatePresence mode="popLayout">
                    {completedTasks.map(task => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        variant="compact"
                        onToggle={toggleComplete}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              </details>
            )}
          </div>
        )}
      </section>

      {/* Quick Actions */}
      <section className="border-t border-slate-200 pt-6">
        <h3 className="text-sm font-semibold text-slate-700 mb-3">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/todo/focus"
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors text-sm font-medium"
          >
            🍅 Start Pomodoro
          </Link>
          <Link
            to="/todo/review"
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors text-sm font-medium"
          >
            📝 Daily Review
          </Link>
        </div>
      </section>
    </div>
  );
}
