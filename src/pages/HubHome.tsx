import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { getLatestWayneWeek } from '../data/wayneWeeks';
import { getLatestLunaWeek } from '../data/lunaWeeks';
import lunaAvatar from '../assets/luna-avatar.jpg';
import wayneAvatar from '../assets/wayne-avatar.jpg';

const wayneSubdomain = import.meta.env.PROD
  ? 'https://wayne.bunnyuniverse.com'
  : '/?persona=wayne';

const lunaSubdomain = import.meta.env.PROD
  ? 'https://luna.bunnyuniverse.com'
  : '/?persona=luna';

const HubHome = () => {
  const { t } = useTranslation();
  const latestWayne = getLatestWayneWeek();
  const latestLuna = getLatestLunaWeek();

  return (
    <div className="space-y-24">
      {/* Hero */}
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center pt-8 relative"
      >
        <div className="absolute -top-10 left-1/4 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-30 z-0"></div>
        <div className="absolute top-10 right-1/4 w-64 h-64 bg-pink-100 rounded-full blur-3xl opacity-30 z-0"></div>
        <div className="relative z-10">
          <motion.div
            animate={{ rotate: [-2, 2, -2] }}
            transition={{ repeat: Infinity, duration: 5 }}
            className="inline-block text-7xl mb-4"
          >
            🐰
          </motion.div>
          <h1 className="font-header text-6xl md:text-8xl text-ink mb-4">
            {t('site.name')}
          </h1>
          <p className="font-handwritten text-2xl text-pencil max-w-lg mx-auto">
            {t('site.tagline')}
          </p>
        </div>
      </motion.header>

      {/* Dual Entry Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 px-4 md:px-0">
        {/* Wayne Card */}
        <motion.a
          href={wayneSubdomain}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.02, rotate: 0 }}
          className="block"
        >
          <div className="bg-white border-4 border-blue-200 rounded-2xl p-8 shadow-lifted transform -rotate-1 hover:rotate-0 transition-all cursor-pointer relative overflow-hidden">
            {/* Washi tape */}
            <div className="absolute -top-3 left-12 w-24 h-6 bg-blue-200/60 rotate-1"></div>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-blue-300 shadow-md shrink-0">
                <img src={wayneAvatar} alt="Wayne" className="w-full h-full object-cover" />
              </div>
              <div>
                <h2 className="font-header text-4xl text-blue-700">{t('hub.wayne_title')}</h2>
                <p className="font-handwritten text-sm text-blue-500">Wayne · Dad · Teacher</p>
              </div>
            </div>

            <p className="font-note text-pencil mb-6 leading-relaxed">
              {t('hub.wayne_subtitle')}
            </p>

            {latestWayne && (
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-100 mb-6">
                <p className="font-handwritten text-xs text-blue-400 mb-1">
                  {t('hub.latest')} · Week {latestWayne.week}
                </p>
                <p className="font-note text-ink font-bold text-sm leading-snug">
                  {latestWayne.title}
                </p>
                <p className="font-handwritten text-xs text-pencil mt-2 line-clamp-2">
                  {latestWayne.summary}
                </p>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                {['📋', '🛠️', '💡'].map((emoji, i) => (
                  <span key={i} className="text-2xl">{emoji}</span>
                ))}
              </div>
              <span className="font-marker text-blue-600 text-lg">{t('hub.wayne_cta')}</span>
            </div>
          </div>
        </motion.a>

        {/* Luna Card */}
        <motion.a
          href={lunaSubdomain}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.02, rotate: 0 }}
          className="block"
        >
          <div className="bg-white border-4 border-pink-200 rounded-2xl p-8 shadow-lifted transform rotate-1 hover:rotate-0 transition-all cursor-pointer relative overflow-hidden">
            {/* Washi tape */}
            <div className="absolute -top-3 right-12 w-24 h-6 bg-pink-300/50 -rotate-2"></div>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-pink-300 shadow-md shrink-0">
                <img src={lunaAvatar} alt="Luna" className="w-full h-full object-cover" />
              </div>
              <div>
                <h2 className="font-header text-4xl text-pink-600">{t('hub.luna_title')}</h2>
                <p className="font-handwritten text-sm text-pink-400">Luna · 8 years old · Learner</p>
              </div>
            </div>

            <p className="font-note text-pencil mb-6 leading-relaxed">
              {t('hub.luna_subtitle')}
            </p>

            {latestLuna && (
              <div className="bg-pink-50 rounded-xl p-4 border border-pink-100 mb-6">
                <p className="font-handwritten text-xs text-pink-400 mb-1">
                  {t('hub.latest')} · Week {latestLuna.week}
                </p>
                <p className="font-note text-ink font-bold text-sm leading-snug">
                  {latestLuna.title}
                </p>
                <p className="font-handwritten text-xs text-pencil mt-2 line-clamp-2">
                  {latestLuna.summary}
                </p>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                {['🌟', '🎨', '🚀'].map((emoji, i) => (
                  <span key={i} className="text-2xl">{emoji}</span>
                ))}
              </div>
              <span className="font-marker text-pink-500 text-lg">{t('hub.luna_cta')}</span>
            </div>
          </div>
        </motion.a>
      </section>

      {/* How It Works */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="relative px-4 py-12"
      >
        <div className="bg-white border-4 border-dashed border-gray-200 rounded-3xl p-8 md:p-12 max-w-2xl mx-auto transform rotate-[-0.5deg]">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-yellow-200/70 rotate-1"></div>
          <h3 className="font-header text-3xl text-center text-ink mb-8">How This Works</h3>
          <div className="space-y-6">
            {[
              { day: 'Every Wednesday', who: 'Wayne', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200', text: 'publishes this week\'s teaching plan — what we tried, what worked, what to steal.' },
              { day: 'Every Sunday', who: 'Luna', color: 'text-pink-600', bg: 'bg-pink-50', border: 'border-pink-200', text: 'publishes her learning results — raw, honest, and sometimes hilarious.' },
            ].map((item, i) => (
              <div key={i} className={`${item.bg} border-2 ${item.border} rounded-xl p-4 flex gap-4 items-start`}>
                <div className="shrink-0">
                  <div className="font-handwritten text-xs text-pencil">{item.day}</div>
                  <div className={`font-marker text-xl ${item.color}`}>{item.who}</div>
                </div>
                <p className="font-note text-pencil text-sm leading-relaxed pt-1">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default HubHome;
