import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen } from 'lucide-react';
import { SEOHead } from '../../components/SEOHead';

const comicSeries = [
  {
    id: 'vr-building',
    title: "Startup Stories #13: The Machine That Builds the Machine That Builds the House",
    subtitle: 'Mobile micro-factories for decentralized home construction.',
    date: 'June 2026',
    strips: 3,
    themes: ['Construction Tech', 'Manufacturing', 'Housing'],
    description:
      'Construction productivity has been flat for 50 years. Cuby Technologies puts a software-driven micro-factory in a shipping container — deployable anywhere, turning non-skilled workers into precision home builders with 10x less labor and 90% less waste. Episode 13 of 25.',
    cover: '/images/comics/vr-building/cover.jpg',
    path: '/wayne/comics/vr-building',
    tag: 'Startup Stories',
    tagColor: 'bg-indigo-100 text-indigo-700',
  },
  {
    id: 'amazon-carbon-credit',
    title: "Startup Stories #12: Making the Amazon Rainforest More Profitable Standing Than Cut Down",
    subtitle: 'Regenerative agroforestry at scale in the Brazilian Amazon.',
    date: 'June 2026',
    strips: 3,
    themes: ['Climate Tech', 'Carbon Markets', 'Agroforestry'],
    description:
      'Farmers in the Amazon cut down trees because cattle and soy pay the bills. Belterra is changing that equation — providing seeds, training, financing, and guaranteed buyers for regenerative agroforestry, using pre-sold carbon credits to fund the transition. Episode 12 of 25.',
    cover: '/images/comics/amazon-carbon-credit/cover.jpg',
    path: '/wayne/comics/amazon-carbon-credit',
    tag: 'Startup Stories',
    tagColor: 'bg-indigo-100 text-indigo-700',
  },
  {
    id: 'pharmexpress',
    title: "Startup Stories #11: The 'Uber for Medicine' That Built Its Own Roads",
    subtitle: 'Digitizing pharmacy supply chains across Southeast Asia.',
    date: 'June 2026',
    strips: 3,
    themes: ['Health Tech', 'Supply Chain', 'Emerging Markets'],
    description:
      '57,000 pharmacies. 1,500 distributors. No single supplier carries more than 200 products. Buymed built a digital B2B marketplace connecting both sides — and when Vietnam\'s roads weren\'t reliable enough, they built their own warehouses and delivery fleet too. Episode 11 of 25.',
    cover: '/images/comics/pharmexpress/cover.jpg',
    path: '/wayne/comics/pharmexpress',
    tag: 'Startup Stories',
    tagColor: 'bg-indigo-100 text-indigo-700',
  },
  {
    id: 'recycap',
    title: "Startup Stories #10: The Machine That Eats Coffee Capsules",
    subtitle: 'Automated coffee capsule recycling for homes and offices.',
    date: 'June 2026',
    strips: 3,
    themes: ['Circular Economy', 'Hardware', 'Sustainability'],
    description:
      '7 billion capsules per year. 70% end up in landfills. Aluminum takes 500 years to decompose. RecyCap built a machine that solves the convenience paradox — automatically separating coffee grounds from shells so recycling is as easy as making the coffee. Episode 10 of 25.',
    cover: '/images/comics/recycap/cover.jpg',
    path: '/wayne/comics/recycap',
    tag: 'Startup Stories',
    tagColor: 'bg-indigo-100 text-indigo-700',
  },
  {
    id: 'nutrix',
    title: "Startup Stories #9: Spit in a Tube, Know Your Stress",
    subtitle: 'The first at-home cortisol sensor for workplace stress management.',
    date: 'June 2026',
    strips: 4,
    themes: ['Health Tech', 'Wearables', 'Workplace Wellness'],
    description:
      'Everyone talks about cortisol. Almost nobody actually measures it. Nutrix built CortiSense — a device that measures the stress hormone from a saliva sample at home, turning workplace wellness from guesswork into data science. CES 2025 Innovation Award. Episode 9 of 25.',
    cover: '/images/comics/nutrix/cover.jpg',
    path: '/wayne/comics/nutrix',
    tag: 'Startup Stories',
    tagColor: 'bg-indigo-100 text-indigo-700',
  },
  {
    id: 'bremmiller',
    title: "Startup Stories #8: The Rock Battery That Replaces Fossil Fuel Boilers",
    subtitle: 'Storing renewable energy as heat in crushed volcanic rock.',
    date: 'June 2026',
    strips: 4,
    themes: ['Clean Energy', 'Industrial Heat', 'Climate Tech'],
    description:
      'Industrial heat is the blind spot of the energy transition — over 50% of industrial energy goes to making heat, and almost all of it comes from burning fossil fuels. Bremmiller Energy\'s bGen thermal battery heats crushed volcanic rock to 650°C, delivering clean steam on demand with 97% efficiency. Episode 8 of 25.',
    cover: '/images/comics/bremmiller/cover.jpg',
    path: '/wayne/comics/bremmiller',
    tag: 'Startup Stories',
    tagColor: 'bg-indigo-100 text-indigo-700',
  },
  {
    id: 'limex',
    title: "Startup Stories #7: Paper and Plastic Made from Rocks",
    subtitle: 'A Japanese unicorn turning limestone into sustainable materials.',
    date: 'June 2026',
    strips: 4,
    themes: ['Circular Economy', 'Materials Science', 'Manufacturing'],
    description:
      'LIMEX is a material made mostly of crushed limestone that can replace both paper and plastic. It uses 97% less water than papermaking and zero trees. Founded by a used car salesman who refused to give up after a failed import business, TBM has grown into a Japanese unicorn with 10,000+ customers. Episode 7 of 25.',
    cover: '/images/comics/limex/cover.jpg',
    path: '/wayne/comics/limex',
    tag: 'Startup Stories',
    tagColor: 'bg-indigo-100 text-indigo-700',
  },
  {
    id: 'luxwall',
    title: "Startup Stories #6: The Window That Thinks It's a Wall",
    subtitle: 'Vacuum insulated glass that performs like a solid wall.',
    date: 'June 2026',
    strips: 4,
    themes: ['CleanTech', 'Deep Tech', 'Energy Efficiency'],
    description:
      'Windows are the weakest link in every building — 40% of heating and cooling energy leaks right through the glass. A trillion dollars of energy escapes through windows every year. Luxwall invented vacuum insulated glass that insulates as well as a solid wall, and their "Intel Inside" strategy partners with the industry giants instead of fighting them. Episode 6 of 25 real startup stories.',
    cover: '/images/comics/luxwall/cover.jpg',
    path: '/wayne/comics/luxwall',
    tag: 'Startup Stories',
    tagColor: 'bg-indigo-100 text-indigo-700',
  },
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
