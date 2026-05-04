import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { lunaWeeks } from '../../data/lunaWeeks';
import lunaAvatar from '../../assets/luna-avatar.jpg';

const archiveEntries = [
  {
    date: 'Feb 24, 2026',
    title: 'NotebookLM + Antigravity: Scaling Up',
    desc: 'Trivia for all 7 Harry Potter books, random questions, and Google login — built in one day.',
    link: '/blog/fandomtrivia-v2',
    emoji: '🚀',
    color: 'bg-amber-50 border-amber-200',
  },
  {
    date: 'Feb 23, 2026',
    title: 'FandomTrivia Begins',
    desc: 'I directed AI to build a whole quiz website. Like having a coding partner who never gets tired.',
    link: '/blog/fandomtrivia-v1',
    emoji: '⚡',
    color: 'bg-purple-50 border-purple-200',
  },
  {
    date: 'Feb 1, 2026',
    title: "Happy Birthday, Dad!",
    desc: 'A special digital card for Wayne — classic man, great coder.',
    link: '/blog/dad-birthday',
    emoji: '🎂',
    color: 'bg-green-50 border-green-200',
  },
  {
    date: 'Jan 25, 2026',
    title: 'Strategic Radar',
    desc: 'The missing puzzle piece: real-life information and context. A framework for thinking.',
    link: '/blog/strategic-radar',
    emoji: '📡',
    color: 'bg-purple-50 border-purple-200',
  },
  {
    date: 'Jan 20, 2026',
    title: 'Genesis on Mars: Crimson Dawn',
    desc: 'A sci-fi short story — the tragedy of the Orion and the beginning of a new era on Mars.',
    link: '/blog/genesis-mars',
    emoji: '🔴',
    color: 'bg-red-50 border-red-200',
  },
  {
    date: 'Jan 19, 2026',
    title: 'The Mars Bunny Wiki',
    desc: 'Everything you need to know about our long-eared Martian neighbors. A full field guide.',
    link: '/blog/mars-bunny-wiki',
    emoji: '🥕',
    color: 'bg-orange-50 border-orange-200',
  },
  {
    date: 'Dec 15, 2025',
    title: 'The Superlinear Path',
    desc: 'Why 1 + 1 = 10. The very beginning of my learning journey.',
    link: '/blog/superlinear',
    emoji: '📈',
    color: 'bg-yellow-50 border-yellow-200',
  },
  {
    date: 'Oct 2025',
    title: 'The AI Architect Report',
    desc: 'Gemini Canvas, NotebookLM, AI Quests — how I first learned to co-build with AI.',
    link: '/blog/gemini-report',
    emoji: '🤖',
    color: 'bg-blue-50 border-blue-200',
  },
];

const projects = [
  {
    title: 'FandomTrivia',
    desc: 'Harry Potter trivia for all 7 books. Built with AI + NotebookLM + Google login.',
    link: 'https://www.fandom-trivia.com/',
    emoji: '⚡',
    tag: 'Web App',
  },
  {
    title: 'Stella Explores Cities',
    desc: 'An AI-powered city guide. Discover hidden gems with smart recommendations.',
    link: 'https://stella-explores-cities.lovable.app',
    emoji: '🏙️',
    tag: 'AI App',
  },
  {
    title: 'Badminton Skill Tree',
    desc: 'Visualizing my badminton progress. From rookie to pro!',
    link: 'https://badminton-skill-tree.vercel.app/',
    emoji: '🏸',
    tag: 'Interactive Map',
  },
  {
    title: 'Xmas 2025 Roadtrip',
    desc: 'A log of our Christmas road trip. Photos, maps, and special moments.',
    link: 'https://xmas2025-roadtrip.vercel.app/',
    emoji: '🎄',
    tag: 'Digital Memory',
  },
  {
    title: 'Jumping Game',
    desc: "My first game built with Lua in Roblox! Reach the top and beat the high score.",
    link: 'https://www.roblox.com/games/134287711519230/Jumping-Game',
    emoji: '🎮',
    tag: 'Roblox Game',
  },
];

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
              <p className="mt-3 font-handwritten text-base text-pencil/70 italic">
                I want to be a Writer to design souls, and an Engineer to build worlds. ✨
              </p>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Weekly Journey List */}
      <section className="px-4 md:px-0 space-y-8">
        <h2 className="font-header text-3xl text-ink px-1">📅 Weekly Journal</h2>
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

      {/* My Projects */}
      <section className="px-4 md:px-0 space-y-6">
        <div>
          <h2 className="font-header text-3xl text-ink">🎨 My Projects</h2>
          <p className="font-handwritten text-pencil mt-1">Things I've actually built and shipped!</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((p, i) => (
            <motion.a
              key={p.title}
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ scale: 1.03, rotate: 0.5 }}
              className="block bg-white border-2 border-pink-100 rounded-2xl p-5 shadow-lifted hover:border-pink-300 transition-all"
            >
              <div className="text-3xl mb-3">{p.emoji}</div>
              <div className="font-mono text-xs text-pencil/60 mb-1">{p.tag}</div>
              <h3 className="font-header text-xl text-ink mb-2">{p.title}</h3>
              <p className="font-note text-pencil text-sm leading-relaxed">{p.desc}</p>
              <p className="font-handwritten text-pink-500 text-sm mt-3">Visit →</p>
            </motion.a>
          ))}
        </div>
      </section>

      {/* Archives */}
      <section className="px-4 md:px-0 space-y-6">
        <div>
          <h2 className="font-header text-3xl text-ink">📚 Before Week 1 — The Archives</h2>
          <p className="font-handwritten text-pencil mt-1">Everything from Oct 2025 → Feb 2026. Where it all started.</p>
        </div>
        <div className="relative border-l-4 border-dashed border-pink-200 ml-4 pl-8 space-y-6 pb-4">
          {archiveEntries.map((entry, i) => (
            <motion.div
              key={entry.link}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              className="relative"
            >
              <div className="absolute -left-[45px] top-5 w-5 h-5 rounded-full bg-white border-4 border-pink-300 z-10"></div>
              <Link to={entry.link}>
                <div className={`border-2 ${entry.color} rounded-2xl p-5 hover:shadow-lifted transition-all group`}>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl shrink-0">{entry.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-xs text-pencil/60 mb-1">{entry.date}</p>
                      <h3 className="font-header text-xl text-ink group-hover:text-pink-600 transition-colors">{entry.title}</h3>
                      <p className="font-note text-pencil text-sm leading-relaxed mt-1">{entry.desc}</p>
                    </div>
                    <span className="font-handwritten text-pink-400 shrink-0 text-sm group-hover:text-pink-600">read →</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LunaHome;
