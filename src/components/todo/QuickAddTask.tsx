import { useState } from 'react';

interface QuickAddTaskProps {
  onAdd: (title: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
}

export default function QuickAddTask({
  onAdd,
  placeholder = 'Quick add task... (press Enter to add)',
  autoFocus = false,
}: QuickAddTaskProps) {
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onAdd(value.trim());
      setValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    } else if (e.key === 'Escape') {
      setValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className="
          w-full px-4 py-3 text-base
          border-b-2 border-slate-300 focus:border-indigo-600
          bg-transparent transition-colors
          placeholder:text-slate-400
          focus:outline-none
        "
      />

      {value.trim() && (
        <button
          type="submit"
          className="
            absolute right-2 top-1/2 -translate-y-1/2
            px-4 py-1.5 rounded-lg
            bg-indigo-600 text-white text-sm font-medium
            hover:bg-indigo-700 transition-colors
          "
        >
          Add
        </button>
      )}
    </form>
  );
}
