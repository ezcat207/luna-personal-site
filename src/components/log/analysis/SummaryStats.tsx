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
    blue: 'bg-blue-50/80 border-blue-200 text-blue-600',
    green: 'bg-green-50/80 border-green-200 text-green-600',
    purple: 'bg-purple-50/80 border-purple-200 text-purple-600',
    pink: 'bg-pink-50/80 border-pink-200 text-pink-600',
    red: 'bg-red-50/80 border-red-200 text-red-600',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: index * 0.03 }}
      className={`rounded-2xl p-3 border-2 shadow-sm backdrop-blur-sm ${colorClasses[color]}`}
    >
      <div className="text-xl mb-0.5">{icon}</div>
      <div className={`text-2xl font-bold ${colorClasses[color].split(' ')[2]}`}>
        {value}
      </div>
      <div className="text-[10px] text-slate-600 font-bold mt-0.5">{label}</div>
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
