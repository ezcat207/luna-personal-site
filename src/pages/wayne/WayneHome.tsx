import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Map, Calendar } from 'lucide-react';
import { wayneWeeks } from '../../data/wayneWeeks';
import wayneAvatar from '../../assets/wayne-avatar.jpg';

const lunaSubdomain = import.meta.env.PROD
  ? 'https://luna.bunnyuniverse.com'
  : '/?persona=luna';

const WayneHome = () => {
  const weeks = [...wayneWeeks].reverse();
  const latest = weeks[0];

  return (
    <div className="space-y-12">

      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col md:flex-row items-start gap-8 pt-4"
      >
        <div className="flex-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-semibold mb-4">
            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse"></span>
            Publishing every Wednesday
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-4">
            Teaching Plans<br />
            <span className="text-indigo-600">From a Real Dad</span>
          </h1>
          <p className="text-slate-500 text-lg leading-relaxed max-w-xl">
            Every week I plan what my daughter Luna learns. This is the honest version —
            what I tried, what worked, what didn't. Steal anything useful.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <Link
              to="/wayne/plans"
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              All Teaching Plans
            </Link>
            <Link
              to="/wayne/roadmap"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors"
            >
              <Map className="w-4 h-4" />
              Full Roadmap
            </Link>
          </div>
        </div>

        <div className="shrink-0">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden border-2 border-slate-200 shadow-sm">
            <img src={wayneAvatar} alt="Wayne" className="w-full h-full object-cover" />
          </div>
          <p className="text-xs text-slate-400 text-center mt-2">Wayne · Dad</p>
        </div>
      </motion.section>

      {/* Latest week highlight */}
      {latest && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span className="text-sm font-medium text-slate-500">Latest</span>
          </div>
          <Link to={`/wayne/plan/${latest.week}`} className="block group">
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:border-indigo-300 hover:shadow-md transition-all">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-block px-2 py-0.5 bg-indigo-600 text-white text-xs font-bold rounded">
                      Week {latest.week}
                    </span>
                    <span className="text-xs text-slate-400">{latest.date}</span>
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-700 transition-colors">
                    {latest.title}
                  </h2>
                  <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">{latest.summary}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {latest.tools.map(tool => (
                      <span key={tool} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded-md font-medium">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-500 shrink-0 mt-1 transition-colors" />
              </div>
            </div>
          </Link>
        </motion.div>
      )}

      {/* What this is */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {[
          {
            icon: '📋',
            title: 'Weekly Teaching Plans',
            desc: 'What we covered, what tools we used, and the honest reaction from an 8-year-old.',
          },
          {
            icon: '🗺️',
            title: 'Full Learning Roadmap',
            desc: "A structured decision tree to find the right tools for your child's current stage.",
          },
          {
            icon: '🔗',
            title: "See Luna's Results",
            desc: "Every Sunday, Luna publishes what she actually built and learned from my plan.",
            href: lunaSubdomain,
          },
        ].map((card, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <div className="text-2xl mb-3">{card.icon}</div>
            <h3 className="font-semibold text-slate-800 mb-1 text-sm">{card.title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed">{card.desc}</p>
            {card.href && (
              <a href={card.href} className="inline-flex items-center gap-1 text-pink-500 text-xs font-medium mt-2 hover:text-pink-700">
                Visit Luna's site <ArrowRight className="w-3 h-3" />
              </a>
            )}
          </div>
        ))}
      </motion.section>

      {/* Archive list */}
      {weeks.length > 1 && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.4 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Archive</h2>
            <Link to="/wayne/plans" className="text-xs text-indigo-600 hover:text-indigo-800 font-medium">
              View all →
            </Link>
          </div>
          <div className="space-y-2">
            {weeks.slice(1, 5).map(week => (
              <Link key={week.week} to={`/wayne/plan/${week.week}`} className="block group">
                <div className="flex items-center gap-4 px-4 py-3 bg-white border border-slate-100 rounded-lg hover:border-slate-300 transition-colors">
                  <span className="text-xs font-bold text-indigo-600 w-14 shrink-0">Week {week.week}</span>
                  <span className="text-sm text-slate-700 flex-1 truncate group-hover:text-slate-900">{week.title}</span>
                  <span className="text-xs text-slate-400 shrink-0">{week.date}</span>
                </div>
              </Link>
            ))}
          </div>
        </motion.section>
      )}
    </div>
  );
};

export default WayneHome;
