import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { getLunaWeekByNumber } from '../../data/lunaWeeks';
import { LunaEntrySEO } from '../../components/SEOHead';

const Section = ({ emoji, label, children, delay = 0, className = '' }: {
  emoji: string;
  label: string;
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.4 }}
    className={`bg-white border-2 border-pink-100 rounded-2xl p-6 ${className}`}
  >
    <h3 className="text-xs font-bold text-pink-400 uppercase tracking-widest mb-3">{emoji} {label}</h3>
    <p className="text-slate-700 leading-relaxed text-[15px]">{children}</p>
  </motion.div>
);

const LunaEntry = () => {
  const { weekNum } = useParams<{ weekNum: string }>();
  const { t } = useTranslation();
  const week = getLunaWeekByNumber(Number(weekNum));

  if (!week) {
    return (
      <div className="text-center py-32">
        <p className="text-2xl text-slate-400 mb-4">This week doesn't exist yet!</p>
        <Link to="/luna" className="text-pink-500 font-medium mt-4 inline-block hover:text-pink-700">← Back to Journey</Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 px-4 md:px-0">
      <LunaEntrySEO week={week.week} title={week.title} summary={week.summary} />

      {/* Back */}
      <Link to="/luna" className="text-pink-500 hover:text-pink-700 font-medium inline-flex items-center gap-1 text-sm">
        ← My Journey
      </Link>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border-2 border-pink-100 rounded-2xl p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-pink-500 text-white rounded-xl px-4 py-2 text-center">
            <div className="text-xs font-medium opacity-80">{t('luna.week_label')}</div>
            <div className="font-bold text-3xl leading-none">{week.week}</div>
          </div>
          <div>
            <p className="text-pink-400 text-xs font-medium">{week.date}</p>
            <p className="text-slate-400 text-xs">Published Sunday</p>
          </div>
        </div>
        <h1 className="font-bold text-3xl text-slate-900 leading-tight mb-3">{week.title}</h1>
        <p className="text-slate-500 leading-relaxed">{week.summary}</p>
      </motion.div>

      {/* Stats Row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="grid grid-cols-3 gap-4"
      >
        {[
          { value: week.stats.practiceCount, label: t('luna.stats.practice'), color: 'bg-pink-50 border-pink-200 text-pink-600', emoji: '✍️' },
          { value: week.stats.worksCompleted, label: t('luna.stats.works'), color: 'bg-yellow-50 border-yellow-200 text-yellow-600', emoji: '🎯' },
          { value: week.stats.newSkills.length, label: t('luna.stats.new_skills'), color: 'bg-green-50 border-green-200 text-green-600', emoji: '⭐' },
        ].map((stat, i) => (
          <div key={i} className={`${stat.color} border-2 rounded-2xl p-4 text-center`}>
            <div className="text-2xl mb-1">{stat.emoji}</div>
            <div className="font-bold text-2xl">{stat.value}</div>
            <div className="text-xs font-medium mt-1 opacity-80">{stat.label}</div>
          </div>
        ))}
      </motion.div>

      <Section emoji="📚" label={t('luna.sections.what_i_learned')} delay={0.1}>
        {week.whatILearned}
      </Section>
      <Section emoji="🎨" label={t('luna.sections.what_i_made')} delay={0.2}>
        {week.whatIMade}
      </Section>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-6"
      >
        <h3 className="text-xs font-bold text-yellow-600 uppercase tracking-widest mb-3">😅 {t('luna.sections.hardest_part')}</h3>
        <p className="text-slate-700 leading-relaxed text-[15px]">{week.hardestPart}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="bg-pink-500 rounded-2xl p-6"
      >
        <h3 className="text-xs font-bold text-white/70 uppercase tracking-widest mb-3">🌟 {t('luna.sections.coolest_thing')}</h3>
        <p className="text-white leading-relaxed text-[15px]">{week.coolestThing}</p>
      </motion.div>

      {/* Skills Unlocked */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="bg-white border-2 border-green-200 rounded-2xl p-6"
      >
        <h3 className="text-xs font-bold text-green-600 uppercase tracking-widest mb-4">⭐ {t('luna.sections.skills_unlocked')}</h3>
        <div className="space-y-2">
          {week.stats.newSkills.map((skill, i) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="flex items-center gap-3 bg-green-50 border border-green-100 rounded-xl px-4 py-2.5"
            >
              <span className="text-xl">{'🥇🥈🥉'[i] ?? '⭐'}</span>
              <span className="text-slate-700 text-sm font-medium">{skill}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Nav */}
      <div className="flex justify-between pt-2 pb-4">
        <Link to="/luna" className="text-pink-500 hover:text-pink-700 font-medium text-sm">← My Journey</Link>
        <Link to={`/wayne/plan/${week.week}`} className="text-slate-400 hover:text-slate-700 font-medium text-sm transition-colors">
          Wayne's plan for Week {week.week} →
        </Link>
      </div>
    </div>
  );
};

export default LunaEntry;
