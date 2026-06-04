import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen } from 'lucide-react';
import { SEOHead } from '../../components/SEOHead';

const comicSeries = [
  {
    id: 'easy-rice',
    title: "Startup Stories #5: The AI That Checks Every Grain of Rice",
    subtitle: 'Computer vision solving a centuries-old commodity fraud problem.',
    date: 'June 2026',
    strips: 4,
    themes: ['AgriTech', 'Computer Vision', 'Fair Trade'],
    description:
      'In Thailand, jasmine rice commands a 3× price premium — but adulteration is rampant and manual inspection is impossible at scale. EasyRice uses AI cameras to inspect 10 million grains per minute, giving every farmer a verifiable quality certificate. Episode 5 of 25 real startup stories.',
    cover: '/images/comics/easyrice/cover.jpg',
    path: '/wayne/comics/easy-rice',
    tag: 'Startup Stories',
    tagColor: 'bg-indigo-100 text-indigo-700',
  },
  {
    id: 'ampd',
    title: "Startup Stories #4: The Battery That Ships Software Updates",
    subtitle: 'Construction sites run on diesel generators. Not for long.',
    date: 'June 2026',
    strips: 4,
    themes: ['CleanTech', 'Hardware + Software', 'Construction'],
    description:
      'Diesel generators power 90% of construction sites — noisy, polluting, and increasingly illegal in dense cities. Ampd Energy\'s Enertainer is a software-defined battery that improves via OTA updates. After a lithium price crash made hardware cheap, the real moat is the software. Episode 4 of 25.',
    cover: '/images/comics/ampd/cover.jpg',
    path: '/wayne/comics/ampd',
    tag: 'Startup Stories',
    tagColor: 'bg-indigo-100 text-indigo-700',
  },
  {
    id: 'grand-canyon',
    title: "Luna & Wayne's Canyon Dreams",
    subtitle: 'Three stories from Grand Canyon National Park',
    date: 'Summer 2024',
    strips: 3,
    themes: ['Safety', 'Leave No Trace', 'Learning to See'],
    description:
      'What happens when a curious rabbit meets a mile-deep canyon. Three comic strips about fences, ancient rocks, and how to actually look at something that doesn\'t perform for you.',
    cover: '/images/comics/grand-canyon/cover.jpeg',
    path: '/wayne/comics/grand-canyon',
    tag: 'Travel Adventure',
    tagColor: 'bg-amber-100 text-amber-700',
  },
  {
    id: 'genesis-mars',
    title: 'Genesis on Mars: Crimson Dawn',
    subtitle: 'Earth is gone. Mars is all that\'s left.',
    date: 'Jan 2026',
    strips: 5,
    themes: ['Survival', 'Trust', 'Resilience'],
    description:
      'When a gravitational collapse destroys Earth, Wayne and Luna are left adrift in a broken escape lander — one eye between them, expired antibiotics, and a hand-drawn star chart. A sci-fi short story about planting the last seed of human civilization.',
    cover: '/images/comics/genesis-mars/cover.png',
    path: '/wayne/comics/genesis-mars',
    tag: 'Sci-Fi Short',
    tagColor: 'bg-red-100 text-red-700',
  },
  {
    id: 'i-am-grounded',
    title: "Startup Stories #3: The Energy Bar Made from Trash",
    subtitle: "Coffee is a fruit. 80% of it gets thrown away. Not anymore.",
    date: 'June 2026',
    strips: 4,
    themes: ['Circular Economy', 'Sustainability', 'Food Systems'],
    description:
      "Every year, 20 billion kilograms of coffee pulp are discarded — rotting in fields and polluting rivers. But the pulp is actually a superfood. I Am Grounded turns it into energy bars and empowers Colombian farmers. Episode 3 of 25 real startup stories.",
    cover: '/images/comics/i-am-grounded/cover.jpg',
    path: '/wayne/comics/i-am-grounded',
    tag: 'Startup Stories',
    tagColor: 'bg-indigo-100 text-indigo-700',
  },
  {
    id: 'abridge',
    title: "Startup Stories #2: The AI Doctor's Note-Taker",
    subtitle: "Giving doctors back the time to look their patients in the eye.",
    date: 'June 2026',
    strips: 4,
    themes: ['Healthcare AI', 'Burnout', 'Trust'],
    description:
      "Doctors spend 5.5 hours on paperwork for every 8 hours with patients. Abridge listens to the conversation and writes the notes automatically — so doctors can finally put down the keyboard and look at the person in front of them. Episode 2 of 25.",
    cover: '/images/comics/abridge/cover.jpg',
    path: '/wayne/comics/abridge',
    tag: 'Startup Stories',
    tagColor: 'bg-indigo-100 text-indigo-700',
  },
  {
    id: 'teamshares',
    title: "Startup Stories #1: When Grandpa's Shop Almost Closed",
    subtitle: 'A real startup turns workers into owners.',
    date: 'June 2026',
    strips: 4,
    themes: ['Ownership', 'Community', 'Economics'],
    description:
      'Luna and Wayne discover their favorite neighborhood store has a sign: "Owner Retired." What happens to the employees? A real startup called Teamshares has a heartwarming answer — turn the workers into owners. Episode 1 of 25 real startup stories.',
    cover: '/images/comics/teamshares/cover.jpg',
    path: '/wayne/comics/teamshares',
    tag: 'Startup Stories',
    tagColor: 'bg-indigo-100 text-indigo-700',
  },
];

export default function WayneComics() {
  return (
    <>
      <SEOHead
        title="Comics — Luna & Wayne's Adventures | Wayne's Plans"
        description="Illustrated parent-child adventures with lessons. Luna the rabbit and Wayne the cat explore the world — and come back with something learned."
      />

      <div className="space-y-12">
        {/* ── Hero ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center pt-4 pb-2"
        >
          <span className="inline-block px-3 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full mb-4 tracking-wide uppercase">
            Comics
          </span>
          <h1 className="text-4xl font-bold text-slate-900 mb-4 leading-tight">
            Adventures in the Real World
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Luna and Wayne go places, ask questions, make mistakes, and come back with something learned.
            Every comic comes with the story behind it — and lessons for the parents reading along.
          </p>
        </motion.div>

        {/* ── Series Grid ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.08 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {comicSeries.map((series) => (
            <Link
              key={series.id}
              to={series.path}
              className="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-indigo-300 hover:shadow-md transition-all"
            >
              <div className="aspect-[16/9] overflow-hidden">
                <img
                  src={series.cover}
                  alt={series.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${series.tagColor}`}>
                    {series.tag}
                  </span>
                  <span className="text-xs text-slate-400">{series.date}</span>
                  <span className="text-xs text-slate-400">· {series.strips} strips</span>
                </div>
                <h2 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-indigo-700 transition-colors">
                  {series.title}
                </h2>
                <p className="text-sm text-slate-500 mb-3">{series.subtitle}</p>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">{series.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {series.themes.map((theme) => (
                    <span key={theme} className="px-2 py-0.5 bg-slate-100 text-slate-500 text-xs rounded-md">
                      {theme}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-1 text-indigo-600 text-sm font-semibold">
                  Read the comic <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}

          {/* Placeholder — more coming */}
          <div className="bg-slate-50 border border-dashed border-slate-300 rounded-2xl p-8 flex flex-col items-center justify-center text-center min-h-[280px]">
            <BookOpen className="w-8 h-8 text-slate-300 mb-3" />
            <p className="text-slate-400 font-medium text-sm mb-1">More adventures coming</p>
            <p className="text-slate-400 text-xs max-w-xs">
              Luna and Wayne are always going somewhere. Follow along on Wayne's weekly updates.
            </p>
            <Link
              to="/wayne/insights"
              className="mt-4 text-xs text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Read Wayne's Insights →
            </Link>
          </div>
        </motion.div>
      </div>
    </>
  );
}
