import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { lunaWeeks } from '../../data/lunaWeeks';
import lunaAvatar from '../../assets/luna-avatar.jpg';

const LunaHome = () => {
  const { t } = useTranslation();
  const weeks = [...lunaWeeks].reverse();

  return (
    <div className="space-y-20">
      {/* Hero */}
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative"
      >
        <div className="absolute -top-8 -right-8 w-56 h-56 bg-pink-100 rounded-full blur-3xl opacity-40 z-0"></div>
        <div className="absolute top-20 left-0 w-48 h-48 bg-yellow-100 rounded-full blur-3xl opacity-30 z-0"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: -3 }}
            transition={{ delay: 0.3, type: 'spring' }}
            className="polaroid-frame bg-white max-w-[200px] mx-auto md:order-last"
          >
            <div className="aspect-square overflow-hidden border border-gray-200">
              <img src={lunaAvatar} alt="Luna" className="w-full h-full object-cover" />
            </div>
            <div className="mt-3 text-center font-marker text-ink text-lg rotate-1">Me & My Bunny Ears 🐰</div>
          </motion.div>

          <div className="w-full md:w-2/3">
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="paper-texture torn-all p-8 bg-white shadow-lifted transform rotate-[-1deg] relative"
            >
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="washi-tape pattern-1 -top-4 left-1/2 -translate-x-1/2"
              ></motion.div>
              <p className="font-handwritten text-pink-400 text-sm mb-2">🌟 My Learning Journey</p>
              <h1 className="font-header text-6xl md:text-7xl text-ink leading-tight">
                Hello, <br />
                <motion.span
                  animate={{ rotate: [-3, -1, -3] }}
                  transition={{ repeat: Infinity, duration: 4 }}
                  className="text-pink-500 font-marker inline-block"
                >
                  I am Luna!
                </motion.span>
              </h1>
              <p className="mt-4 font-handwritten text-xl text-pencil leading-relaxed">
                {t('luna.hero_subtitle')}
              </p>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Weekly Journey List */}
      <section className="px-4 md:px-0 space-y-8">
        {weeks.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-handwritten text-2xl text-pencil">First entry coming soon...!</p>
          </div>
        ) : (
          weeks.map((week, i) => (
            <motion.article
              key={week.week}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.01 }}
            >
              <Link to={`/luna/${week.week}`}>
                <div className="bg-white border-2 border-pink-100 rounded-2xl p-6 shadow-lifted transform hover:border-pink-300 transition-all relative">
                  <div className="absolute -top-2 right-8 w-16 h-5 bg-pink-100/80 -rotate-1"></div>
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    <div className="shrink-0">
                      <div className="bg-pink-500 text-white rounded-xl px-4 py-2 text-center inline-block min-w-[80px]">
                        <div className="font-handwritten text-xs opacity-80">{t('luna.week_label')}</div>
                        <div className="font-header text-3xl leading-none">{week.week}</div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h2 className="font-header text-2xl text-ink mb-2">{week.title}</h2>
                      <p className="font-note text-pencil text-sm leading-relaxed mb-4">{week.summary}</p>
                      <div className="flex flex-wrap gap-3">
                        <span className="bg-pink-50 border border-pink-200 text-pink-600 text-xs font-handwritten px-3 py-1 rounded-full">
                          ✍️ {week.stats.practiceCount} practices
                        </span>
                        <span className="bg-yellow-50 border border-yellow-200 text-yellow-600 text-xs font-handwritten px-3 py-1 rounded-full">
                          🎯 {week.stats.worksCompleted} works
                        </span>
                        {week.stats.newSkills.map(skill => (
                          <span key={skill} className="bg-green-50 border border-green-200 text-green-600 text-xs font-handwritten px-3 py-1 rounded-full">
                            ⭐ {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="shrink-0 self-center">
                      <span className="font-marker text-pink-500">{t('luna.read_more')}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))
        )}
      </section>
    </div>
  );
};

export default LunaHome;
