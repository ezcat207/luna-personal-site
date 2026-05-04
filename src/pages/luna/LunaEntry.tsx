import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { getLunaWeekByNumber } from '../../data/lunaWeeks';

const Section = ({ emoji, label, children, rotate = 0, delay = 0 }: {
  emoji: string;
  label: string;
  children: React.ReactNode;
  rotate?: number;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.4 }}
    className="bg-white border-2 border-pink-100 rounded-2xl p-6 shadow-lifted"
    style={{ transform: `rotate(${rotate}deg)` }}
  >
    <h3 className="font-handwritten text-pink-400 text-sm mb-1">{emoji} {label}</h3>
    <p className="font-note text-ink leading-relaxed">{children}</p>
  </motion.div>
);

const LunaEntry = () => {
  const { weekNum } = useParams<{ weekNum: string }>();
  const { t } = useTranslation();
  const week = getLunaWeekByNumber(Number(weekNum));

  if (!week) {
    return (
      <div className="text-center py-32">
        <p className="font-handwritten text-3xl text-pencil">This week doesn't exist yet!</p>
        <Link to="/luna" className="font-marker text-pink-500 mt-4 inline-block">← Back to Journey</Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8 px-4 md:px-0">
      {/* Back */}
      <Link to="/luna" className="font-handwritten text-pink-500 hover:text-pink-700 inline-flex items-center gap-1">
        ← My Journey
      </Link>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="paper-texture torn-all p-8 bg-white shadow-lifted transform rotate-[-1deg] relative"
      >
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="washi-tape pattern-2 -top-4 left-1/2 -translate-x-1/2"
        ></motion.div>
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-pink-500 text-white rounded-xl px-4 py-2 text-center">
            <div className="font-handwritten text-xs opacity-80">{t('luna.week_label')}</div>
            <div className="font-header text-3xl leading-none">{week.week}</div>
          </div>
          <div>
            <p className="font-handwritten text-pink-400 text-xs">{week.date}</p>
            <p className="font-handwritten text-pink-300 text-xs">Published Sunday</p>
          </div>
        </div>
        <h1 className="font-header text-4xl text-ink leading-tight mb-4">{week.title}</h1>
        <p className="font-handwritten text-pencil leading-relaxed">{week.summary}</p>
      </motion.header>

      {/* Stats Row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-3 gap-4"
      >
        {[
          { value: week.stats.practiceCount, label: t('luna.stats.practice'), color: 'bg-pink-50 border-pink-200 text-pink-600', emoji: '✍️' },
          { value: week.stats.worksCompleted, label: t('luna.stats.works'), color: 'bg-yellow-50 border-yellow-200 text-yellow-600', emoji: '🎯' },
          { value: week.stats.newSkills.length, label: t('luna.stats.new_skills'), color: 'bg-green-50 border-green-200 text-green-600', emoji: '⭐' },
        ].map((stat, i) => (
          <div key={i} className={`${stat.color} border-2 rounded-xl p-3 text-center`}>
            <div className="text-2xl mb-1">{stat.emoji}</div>
            <div className="font-header text-2xl">{stat.value}</div>
            <div className="font-handwritten text-xs mt-1">{stat.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Content Sections */}
      <Section emoji="📚" label={t('luna.sections.what_i_learned')} rotate={-0.5} delay={0.1}>
        {week.whatILearned}
      </Section>
      <Section emoji="🎨" label={t('luna.sections.what_i_made')} rotate={0.5} delay={0.2}>
        {week.whatIMade}
      </Section>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-6 shadow-lifted transform rotate-1 relative"
      >
        <div className="absolute -top-2 right-6 w-4 h-4 rounded-full bg-red-400 shadow-sm border border-red-600"></div>
        <h3 className="font-handwritten text-yellow-600 text-sm mb-1">😅 {t('luna.sections.hardest_part')}</h3>
        <p className="font-note text-ink leading-relaxed">{week.hardestPart}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="craft-paper torn-all p-6 shadow-deep transform -rotate-1 relative"
      >
        <h3 className="font-handwritten text-white/80 text-sm mb-2 mix-blend-overlay">🌟 {t('luna.sections.coolest_thing')}</h3>
        <p className="font-note text-white leading-relaxed mix-blend-overlay">{week.coolestThing}</p>
      </motion.div>

      {/* Skills Unlocked */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="bg-white border-4 border-green-200 rounded-2xl p-6 shadow-lifted relative"
      >
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-green-200/60 rotate-1"></div>
        <h3 className="font-handwritten text-green-600 text-sm mb-4">⭐ {t('luna.sections.skills_unlocked')}</h3>
        <div className="space-y-2">
          {week.stats.newSkills.map((skill, i) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="flex items-center gap-3 bg-green-50 border border-green-100 rounded-xl px-4 py-2"
            >
              <span className="text-xl">{'🥇🥈🥉'[i] ?? '⭐'}</span>
              <span className="font-note text-ink text-sm">{skill}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Nav */}
      <div className="flex justify-between pt-4">
        <Link to="/luna" className="font-handwritten text-pink-500 hover:text-pink-700">← My Journey</Link>
        <Link to={`/wayne/${week.week}`} className="font-handwritten text-blue-500 hover:text-blue-700">
          Wayne's plan for Week {week.week} →
        </Link>
      </div>
    </div>
  );
};

export default LunaEntry;
