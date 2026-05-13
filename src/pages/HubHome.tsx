import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { getLatestWayneWeek } from '../data/wayneWeeks';
import { getLatestLunaWeek } from '../data/lunaWeeks';
import { wayneInsights } from '../data/wayneInsights';
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
  const sortedInsights = [...wayneInsights].filter((i) => !i.draft).reverse();
  const featuredInsight = sortedInsights[0];
  const recentInsights = sortedInsights.slice(1, 4);

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

      {/* Latest from the Blog */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="px-4 md:px-0"
      >
        <div className="text-center mb-8">
          <h2 className="font-header text-4xl text-ink mb-2">📓 Latest from the Blog</h2>
          <p className="font-handwritten text-pencil text-lg">What we've been learning, building, and cracking open</p>
        </div>

        {/* Pinned / Featured post */}
        {featuredInsight && (
          <motion.a
            href={`${wayneSubdomain}/wayne/insights/${featuredInsight.id}`}
            whileHover={{ scale: 1.01, rotate: 0 }}
            className="block mb-6"
          >
            <div className="bg-white border-4 border-indigo-200 rounded-2xl p-8 shadow-lifted transform -rotate-1 hover:rotate-0 transition-all relative overflow-hidden">
              <div className="absolute -top-3 left-16 w-24 h-6 bg-indigo-200/60 rotate-1"></div>
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-full uppercase tracking-wide">📌 Latest</span>
                <span className="font-handwritten text-xs text-pencil">{featuredInsight.date}</span>
                {featuredInsight.tags?.slice(0, 2).map(tag => (
                  <span key={tag} className="text-xs px-2 py-0.5 bg-slate-100 text-slate-500 rounded-full hidden sm:inline">{tag}</span>
                ))}
              </div>
              <h3 className="font-bold text-2xl text-slate-900 leading-tight mb-2">{featuredInsight.title}</h3>
              {featuredInsight.subtitle && (
                <p className="text-slate-500 text-sm mb-3 italic">{featuredInsight.subtitle}</p>
              )}
              <p className="font-note text-pencil text-sm leading-relaxed line-clamp-2">{featuredInsight.summary}</p>
              <p className="font-marker text-indigo-600 text-sm mt-4">Read more →</p>
            </div>
          </motion.a>
        )}

        {/* Recent posts grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {recentInsights.map((insight, i) => (
            <motion.a
              key={insight.id}
              href={`${wayneSubdomain}/wayne/insights/${insight.id}`}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ scale: 1.02 }}
              className="block bg-white border-2 border-slate-200 hover:border-indigo-300 rounded-2xl p-5 transition-all group"
            >
              <p className="font-handwritten text-xs text-pencil mb-2">{insight.date}</p>
              <h4 className="font-bold text-slate-900 text-sm leading-snug mb-2 group-hover:text-indigo-700 line-clamp-2">{insight.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">{insight.summary}</p>
              <div className="mt-3 flex gap-1 flex-wrap">
                {insight.tags?.slice(0, 2).map(tag => (
                  <span key={tag} className="text-xs px-2 py-0.5 bg-slate-50 text-slate-400 rounded-full">{tag}</span>
                ))}
              </div>
            </motion.a>
          ))}
        </div>

        <div className="text-center">
          <a href={`${wayneSubdomain}/wayne/insights`} className="font-marker text-indigo-600 hover:text-indigo-800 text-xl transition-colors">
            All posts →
          </a>
        </div>
      </motion.section>

      {/* What We've Built */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="px-4 md:px-0"
        style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">🛠️ What We've Built</h2>
          <p className="text-slate-500 text-sm">Real tools and projects — made by this family, free to use.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              emoji: '⚡',
              name: 'FandomTrivia',
              desc: 'Harry Potter trivia for all 7 books. 100 questions, Google login, built by Luna in 2 days.',
              url: 'https://www.fandom-trivia.com',
              tag: 'Game',
              color: 'border-amber-200 hover:border-amber-400',
              tagColor: 'bg-amber-50 text-amber-600',
            },
            {
              emoji: '🧠',
              name: 'VRAM Calculator',
              desc: 'Can your GPU run this LLM? Instant VRAM estimates for 60+ models across Nvidia and Apple Silicon.',
              url: 'https://vram.bunnyuniverse.com',
              tag: 'AI Tool',
              color: 'border-violet-200 hover:border-violet-400',
              tagColor: 'bg-violet-50 text-violet-600',
            },
            {
              emoji: '🎬',
              name: 'DramaScout',
              desc: 'Find your next Asian drama. Smart recommendations across genres, countries, and vibes.',
              url: 'https://dramascout.com',
              tag: 'Entertainment',
              color: 'border-red-200 hover:border-red-400',
              tagColor: 'bg-red-50 text-red-600',
            },
          ].map((project, i) => (
            <motion.a
              key={project.name}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ scale: 1.03 }}
              className={`block bg-white border-2 ${project.color} rounded-2xl p-5 transition-all group`}
            >
              <div className="text-3xl mb-3">{project.emoji}</div>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${project.tagColor}`}>
                {project.tag}
              </span>
              <h3 className="font-bold text-slate-900 mt-2 mb-1 group-hover:text-slate-700">{project.name}</h3>
              <p className="text-slate-500 text-xs leading-relaxed">{project.desc}</p>
              <p className="text-xs text-slate-400 mt-3 font-mono truncate">{project.url.replace('https://', '')}</p>
            </motion.a>
          ))}
        </div>
      </motion.section>

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
