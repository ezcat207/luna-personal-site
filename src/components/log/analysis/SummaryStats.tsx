import { motion } from 'framer-motion';
import { formatMins } from '../../../utils/log/formatters';

interface SummaryStatsProps {
  totalTasks: number;
  doneTasks: number;
  totalHours: number;
}

interface StatCardProps {
  icon: string;
  label: string;
  value: string;
  color: 'blue' | 'green' | 'purple' | 'pink' | 'red';
  index: number;
}

function StatCard({ icon, label, value, color, index }: StatCardProps) {
  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200 text-blue-600',
    green: 'bg-green-50 border-green-200 text-green-600',
    purple: 'bg-purple-50 border-purple-200 text-purple-600',
    pink: 'bg-pink-50 border-pink-200 text-pink-600',
    red: 'bg-red-50 border-red-200 text-red-600',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={`rounded-lg p-4 border shadow-sm ${colorClasses[color]}`}
      style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
    >
      <div className="text-2xl mb-1">{icon}</div>
      <div className={`text-3xl font-bold ${colorClasses[color].split(' ')[2]}`}>
        {value}
      </div>
      <div className="text-xs text-slate-600 font-medium mt-1">{label}</div>
    </motion.div>
  );
}

export function SummaryStats({ totalTasks, doneTasks, totalHours }: SummaryStatsProps) {
  const completionRate = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <StatCard
        icon="📝"
        label="Total Tasks"
        value={totalTasks.toString()}
        color="blue"
        index={0}
      />
      <StatCard
        icon="✅"
        label="Completed"
        value={doneTasks.toString()}
        color="green"
        index={1}
      />
      <StatCard
        icon="📊"
        label="Success Rate"
        value={`${completionRate}%`}
        color="purple"
        index={2}
      />
      <StatCard
        icon="⏱️"
        label="Study Time"
        value={formatMins(Math.round(totalHours * 60))}
        color="pink"
        index={3}
      />
    </div>
  );
}
