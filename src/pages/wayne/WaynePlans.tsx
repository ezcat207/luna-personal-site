import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { wayneWeeks } from '../../data/wayneWeeks';

const WaynePlans = () => {
  const weeks = [...wayneWeeks].reverse();

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">All Teaching Plans</h1>
          <p className="text-slate-500 text-sm mt-1">Published every Wednesday · {weeks.length} plan{weeks.length !== 1 ? 's' : ''} so far</p>
        </div>
      </div>

      {weeks.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-12 text-center">
          <p className="text-slate-400">First plan coming this Wednesday.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {weeks.map((week, i) => (
            <motion.div
              key={week.week}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.3 }}
            >
              <Link to={`/wayne/plan/${week.week}`} className="block group">
                <div className="bg-white border border-slate-200 rounded-xl p-5 hover:border-indigo-300 hover:shadow-sm transition-all">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-0.5 bg-indigo-600 text-white text-xs font-bold rounded">
                          Week {week.week}
                        </span>
                        <span className="text-xs text-slate-400">{week.date}</span>
                      </div>
                      <h2 className="font-semibold text-slate-800 group-hover:text-indigo-700 transition-colors mb-2 leading-snug">
                        {week.title}
                      </h2>
                      <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed">{week.summary}</p>
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {week.tools.map(tool => (
                          <span key={tool} className="px-2 py-0.5 bg-slate-100 text-slate-500 text-xs rounded font-medium">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-500 shrink-0 mt-1 transition-colors" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WaynePlans;
