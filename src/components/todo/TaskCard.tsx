import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Task, TaskCardVariant, TaskPriority } from '../../types/todo';

interface TaskCardProps {
  task: Task;
  variant?: TaskCardVariant;
  onToggle?: (id: string) => void;
  onToggleTop3?: (id: string) => void;
  onEdit?: (id: string, title: string) => void;
  onDelete?: (id: string) => void;
}

const PRIORITY_COLORS: Record<TaskPriority, { bg: string; text: string; border: string }> = {
  high: { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-300' },
  medium: { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-300' },
  low: { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-300' },
};

export default function TaskCard({
  task,
  variant = 'default',
  onToggle,
  onToggleTop3,
  onEdit,
  onDelete,
}: TaskCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);

  const priorityStyle = PRIORITY_COLORS[task.priority];
  const isCompleted = task.status === 'completed';

  const handleSave = () => {
    if (editedTitle.trim() && editedTitle !== task.title) {
      onEdit?.(task.id, editedTitle.trim());
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setEditedTitle(task.title);
      setIsEditing(false);
    }
  };

  // Top 3 variant (hero card)
  if (variant === 'top3') {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        className={`
          bg-gradient-to-r from-indigo-50 to-purple-50
          rounded-xl p-6 shadow-sm border border-indigo-100
          ${isCompleted ? 'opacity-60' : ''}
        `}
      >
        <div className="flex items-start gap-4">
          {/* Star Icon */}
          <span className="text-2xl flex-shrink-0">⭐</span>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3">
              {/* Checkbox */}
              <input
                type="checkbox"
                checked={isCompleted}
                onChange={() => onToggle?.(task.id)}
                className="w-6 h-6 rounded border-indigo-300 text-indigo-600 focus:ring-indigo-500 flex-shrink-0"
              />

              {/* Task Title */}
              {isEditing ? (
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  onBlur={handleSave}
                  onKeyDown={handleKeyDown}
                  autoFocus
                  className="flex-1 text-lg font-medium text-slate-900 border-b-2 border-indigo-600 bg-transparent focus:outline-none"
                />
              ) : (
                <h3
                  onClick={() => setIsEditing(true)}
                  className={`
                    flex-1 text-lg font-medium cursor-pointer
                    ${isCompleted ? 'line-through text-slate-500' : 'text-slate-900'}
                  `}
                >
                  {task.title}
                </h3>
              )}
            </div>

            {/* Time Block */}
            {task.time_block_start && task.time_block_end && (
              <div className="ml-9 mt-1 text-sm text-slate-600">
                {new Date(task.time_block_start).toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: false,
                })}{' '}
                -{' '}
                {new Date(task.time_block_end).toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: false,
                })}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  // Compact variant
  if (variant === 'compact') {
    return (
      <motion.div
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={`flex items-center gap-3 p-2 ${isCompleted ? 'opacity-60' : ''}`}
      >
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={() => onToggle?.(task.id)}
          className="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
        />
        <span className={`flex-1 ${isCompleted ? 'line-through text-slate-500' : 'text-slate-900'}`}>
          {task.title}
        </span>
      </motion.div>
    );
  }

  // Default variant (full card)
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 5 }}
      whileHover={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
      className={`
        border border-slate-200 rounded-lg p-4 bg-white transition-shadow
        ${isCompleted ? 'opacity-60' : ''}
      `}
    >
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={() => onToggle?.(task.id)}
          className="w-5 h-5 mt-0.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 flex-shrink-0"
        />

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Title */}
          {isEditing ? (
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              onBlur={handleSave}
              onKeyDown={handleKeyDown}
              autoFocus
              className="w-full font-medium text-slate-900 border-b-2 border-indigo-600 bg-transparent focus:outline-none"
            />
          ) : (
            <h4
              onClick={() => setIsEditing(true)}
              className={`
                font-medium cursor-pointer
                ${isCompleted ? 'line-through text-slate-500' : 'text-slate-900'}
              `}
            >
              {task.title}
            </h4>
          )}

          {/* Description */}
          {task.description && (
            <p className="text-sm text-slate-600 mt-1">{task.description}</p>
          )}

          {/* Meta info */}
          <div className="flex items-center gap-3 mt-2 text-sm">
            {/* Priority Badge */}
            <span
              className={`
                px-2 py-1 rounded-full text-xs font-medium
                ${priorityStyle.bg} ${priorityStyle.text}
              `}
            >
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </span>

            {/* Due Date */}
            {task.due_date && (
              <span className="text-slate-500">
                Due: {new Date(task.due_date).toLocaleDateString()}
              </span>
            )}

            {/* Top 3 Badge */}
            {task.is_top3 && (
              <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                ⭐ Top 3
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-start gap-2">
          {/* Add to Top 3 */}
          {!task.is_top3 && onToggleTop3 && (
            <button
              onClick={() => onToggleTop3(task.id)}
              className="text-slate-400 hover:text-yellow-500 transition-colors"
              title="Add to Top 3"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </button>
          )}

          {/* Delete */}
          {onDelete && (
            <button
              onClick={() => onDelete(task.id)}
              className="text-slate-400 hover:text-red-500 transition-colors"
              title="Delete task"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
