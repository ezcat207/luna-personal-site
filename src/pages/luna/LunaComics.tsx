import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import { SEOHead } from '../../components/SEOHead';

const comics = [
  {
    title: "Luna and Wayne's Adventure to Disneyland",
    desc: "Pack your bags! Luna the rabbit and Wayne the cat fly to the Land of Dreams. Read through 2 large comic strips following their airport wait, plane napping, and rollercoaster rides!",
    link: "/luna/comics/disneyland",
    cover: "/images/comics/disneyland/cover.jpg",
    tag: "Travel Adventure",
    tagColor: "bg-pink-100 text-pink-700",
    date: "May 2026",
    panels: 2,
  },
  {
    title: "Luna and Wayne's Universal Luxe Adventure",
    desc: "First-class flights, private airplane pods, high-speed launch coasters, and opulent golden hotels. Follow their ultra-luxurious trip to Universal Studios!",
    link: "/luna/comics/universal-luxe",
    cover: "/images/comics/universal/cover.jpg",
    tag: "Luxe Travel",
    tagColor: "bg-purple-100 text-purple-700",
    date: "May 2026",
    panels: 2,
  },
  {
    title: "Luna and Wayne's Desert Adventure",
    desc: "Road trip to Joshua Tree! Luna the rabbit and Wayne the cat embark on a scenic drive to Joshua Tree National Park. Follow their journey from the long highway wait to becoming officially certified Junior Rangers!",
    link: "/luna/comics/desert",
    cover: "/images/comics/desert/cover.jpg",
    tag: "Desert Travel",
    tagColor: "bg-amber-100 text-amber-700",
    date: "May 2026",
    panels: 1,
  },
  {
    title: "Wayne & Luna's Las Vegas Adventure",
    desc: "Vegas baby, Vegas! Wayne the cat and Luna the rabbit take on the dazzling lights of the Las Vegas Strip. Follow their journey from planning and magic shows to staring at the giant MSG Sphere face!",
    link: "/luna/comics/las-vegas",
    cover: "/images/comics/las-vegas/cover.jpg",
    tag: "Vegas Travel",
    tagColor: "bg-purple-100 text-purple-700",
    date: "May 2026",
    panels: 1,
  },
  {
    title: "Wayne & Luna's Adventures in China",
    desc: "A journey of shared wonders! Wayne the cat and Luna the rabbit travel across the sea to explore the Great Wall, practice calligraphy, drink oolong tea, and share a sunset in Beijing!",
    link: "/luna/comics/china",
    cover: "/images/comics/china/cover.jpg",
    tag: "China Travel",
    tagColor: "bg-red-100 text-red-700",
    date: "May 2026",
    panels: 1,
  },
  {
    title: "China's Adventure",
    desc: "A four-part journey through Beijing! From arriving at the airport and exploring the Great Wall, to getting separated in a crowded market, reuniting with friendly locals, and wishing on lanterns at Shichahai Lake.",
    link: "/luna/comics/china-adventure",
    cover: "/images/comics/china-adventure/cover.jpg",
    tag: "China Travel",
    tagColor: "bg-red-100 text-red-700",
    date: "June 2026",
    panels: 4,
  },
  {
    title: "Luna & Wayne's Adventure to New York",
    desc: "A chibi storybook journey through New York City! Follow Wayne and Luna as they land in NYC, get lost in the crowded subway system, discover the Statue of Liberty, row in Central Park, eat giant pizza slices, and view the sunset from a skyscraper.",
    link: "/luna/comics/nyc",
    cover: "/images/comics/nyc/cover.jpg",
    tag: "NYC Travel",
    tagColor: "bg-blue-100 text-blue-700",
    date: "June 2026",
    panels: 4,
  },
  {
    title: "Luna & Wayne: The Seattle Explorers",
    desc: "A charming chronicle of tiny adventures in the Emerald City! Follow Luna the rabbit and Wayne the cat as they take a road trip to Seattle, visit Pike Place Market and the Space Needle, get separated in the pouring rain, and reunite at the city's highest point.",
    link: "/luna/comics/seattle",
    cover: "/images/comics/seattle/cover.jpg",
    tag: "Seattle Travel",
    tagColor: "bg-teal-100 text-teal-700",
    date: "June 2026",
    panels: 4,
  },
  {
    title: "Luna & Wayne's Parisian Adventure",
    desc: "Bonjour! Fly with Luna the rabbit and Wayne the cat to the City of Light! Follow their 4-part Parisian journey — from café croissants and the Louvre to getting lost in Montmartre and a magical reunion under the sparkling Eiffel Tower.",
    link: "/luna/comics/paris",
    cover: "/images/comics/paris/cover.png",
    tag: "Paris Travel",
    tagColor: "bg-blue-100 text-blue-700",
    date: "June 2026",
    panels: 4,
  }
];

export default function LunaComics() {
  return (
    <>
      <SEOHead
        title="Comics Library | Luna's Journey"
        description="Explore the complete collection of Wayne and Luna's travel and fantasy adventure comics!"
      />

      <div className="space-y-12">
        {/* Hero / Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center py-6 relative"
        >
          <div className="absolute -top-8 -right-8 w-56 h-56 bg-pink-100 rounded-full blur-3xl opacity-30 z-0"></div>
          <div className="absolute top-12 left-0 w-48 h-48 bg-yellow-100 rounded-full blur-3xl opacity-20 z-0"></div>

          <div className="relative z-10">
            <span className="inline-block px-3 py-1 bg-pink-100 text-pink-700 text-xs font-bold rounded-full mb-3 uppercase tracking-wider">
              Comic Book Library 📖
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
              Luna's Illustrated Adventures
            </h1>
            <p className="mt-3 text-slate-500 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
              Real-life travels and imaginative stories rendered in comic strips. Grab a slice of pizza or tea, and start reading!
            </p>
          </div>
        </motion.div>

        {/* Back Link */}
        <div className="flex justify-start">
          <Link
            to="/luna"
            className="text-sm text-pink-500 hover:text-pink-600 font-bold flex items-center gap-1 transition-colors"
          >
            ← Back to Journey
          </Link>
        </div>

        {/* Comics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {comics.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -4 }}
              className="bg-white border-2 border-pink-100 rounded-3xl overflow-hidden hover:border-pink-300 hover:shadow-md transition-all flex flex-col h-full"
            >
              <Link to={c.link} className="flex flex-col h-full">
                <div className="aspect-[16/9] overflow-hidden bg-pink-50 border-b border-pink-100">
                  <img
                    src={c.cover}
                    alt={c.title}
                    className="w-full h-full object-cover hover:scale-103 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${c.tagColor}`}>
                      {c.tag}
                    </span>
                    <span className="text-xs text-slate-400">{c.date}</span>
                    <span className="text-xs text-slate-400">· {c.panels} {c.panels === 1 ? 'strip' : 'strips'}</span>
                  </div>
                  <h3 className="font-bold text-xl text-slate-900 mb-2 hover:text-pink-600 transition-colors">
                    {c.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-1">
                    {c.desc}
                  </p>
                  <span className="text-pink-500 text-sm font-semibold flex items-center gap-1 mt-auto">
                    Read the Comic Book →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-3xl p-8 text-center text-white shadow-md max-w-4xl mx-auto"
        >
          <BookOpen className="w-8 h-8 mx-auto mb-3 text-pink-100" />
          <h2 className="text-2xl font-bold font-header mb-2">More adventures coming soon!</h2>
          <p className="text-pink-100 text-sm mb-6 max-w-md mx-auto">
            We are constantly planning new journeys and sketching new panels. Follow along on the weekly updates to see where we go next!
          </p>
          <div className="flex justify-center">
            <Link
              to="/luna"
              className="inline-flex items-center justify-center bg-white text-pink-600 font-bold text-sm px-6 py-3 rounded-2xl hover:bg-pink-50 transition-colors shadow-sm"
            >
              Back to Weekly Journal
            </Link>
          </div>
        </motion.div>
      </div>
    </>
  );
}
