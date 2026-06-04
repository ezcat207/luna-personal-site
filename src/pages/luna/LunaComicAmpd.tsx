import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Lightbulb, BookOpen, Sparkles } from 'lucide-react';
import { SEOHead } from '../../components/SEOHead';
import { ShareBar } from '../../components/ShareBar';

function RealProblemBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-amber-50/80 border-l-4 border-amber-400 rounded-r-2xl p-5">
      <p className="text-xs font-bold text-amber-700 uppercase tracking-wide mb-3 flex items-center gap-1">
        🌍 The Real-World Problem
      </p>
      <div className="text-sm text-slate-700 leading-relaxed space-y-2">{children}</div>
    </div>
  );
}

function MeetCompanyBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-indigo-50/80 border-l-4 border-indigo-400 rounded-r-2xl p-5">
      <p className="text-xs font-bold text-indigo-700 uppercase tracking-wide mb-3 flex items-center gap-1">
        <Sparkles className="w-3 h-3" /> Meet the Startup
      </p>
      <div className="text-sm text-slate-700 leading-relaxed space-y-2">{children}</div>
    </div>
  );
}

function ThinkAboutItBox({ questions }: { questions: string[] }) {
  return (
    <div className="bg-rose-50/80 border border-rose-200 rounded-2xl p-5">
      <p className="text-xs font-bold text-rose-700 uppercase tracking-wide mb-3 flex items-center gap-1">
        <Lightbulb className="w-3 h-3" /> Think About It 💭
      </p>
      <ul className="space-y-2">
        {questions.map((q, i) => (
          <li key={i} className="flex gap-2 text-sm text-slate-700">
            <span className="text-rose-400 font-bold flex-shrink-0">{i + 1}.</span>
            <span>{q}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

interface Strip {
  number: number;
  tag: string;
  tagColor: string;
  title: string;
  teaser: string;
  image: string;
  imageAlt: string;
  realProblem: React.ReactNode;
  meetCompany: React.ReactNode;
  thinkAboutIt: string[];
}

function StripCard({ strip }: { strip: Strip }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm"
    >
      <div className="px-6 pt-6 pb-4 flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold text-slate-400">#{strip.number}</span>
            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${strip.tagColor}`}>
              {strip.tag}
            </span>
          </div>
          <h3 className="font-bold text-lg text-slate-900 leading-snug">{strip.title}</h3>
          <p className="text-sm text-slate-500 mt-1 leading-relaxed">{strip.teaser}</p>
        </div>
      </div>
      <div className="mx-6 mb-4 rounded-2xl overflow-hidden border border-slate-100 bg-slate-50">
        <img src={strip.image} alt={strip.imageAlt} className="w-full h-auto object-cover" loading="lazy" />
      </div>
      <div className="px-6 pb-4">
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:border-indigo-300 hover:text-indigo-600 transition-colors"
        >
          <BookOpen className="w-4 h-4" />
          {expanded ? 'Hide Details' : 'Learn More About the Real Story →'}
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pt-4 space-y-4">
                <RealProblemBox>{strip.realProblem}</RealProblemBox>
                <MeetCompanyBox>{strip.meetCompany}</MeetCompanyBox>
                <ThinkAboutItBox questions={strip.thinkAboutIt} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

const strips: Strip[] = [
  {
    number: 1,
    tag: 'The Problem',
    tagColor: 'bg-red-100 text-red-700',
    title: '1. Why Is the Building Site So LOUD?',
    teaser:
      'Luna covers her ears walking past a construction site. The roar, the exhaust, the smoke — all coming from one giant metal machine. Wayne explains: almost every building in the world gets built using the same invention from the 1800s. Meet the diesel generator.',
    image: '/images/comics/ampd/strip-1.jpg',
    imageAlt: 'Luna and Wayne walk past a noisy, smoky construction site powered by diesel generators',
    realProblem: (
      <>
        <p>Construction is one of the biggest sources of pollution on Earth — it produces nearly <strong>40% of all global carbon emissions</strong>. Most of that pollution comes from burning diesel fuel.</p>
        <p>One diesel generator produces as much carbon in a year as <strong>22 cars running non-stop</strong>. And they are incredibly loud — 32 times louder than the clean solution that exists today.</p>
        <p>Workers breathe diesel exhaust all day. Neighbors cannot sleep at night. Projects in cities often have to <strong>stop work completely after dark</strong> because of noise regulations — which makes buildings take longer and cost more to build.</p>
        <p>The worst part? This technology has not really changed in over 100 years. We are building 21st-century skyscrapers with 19th-century engines.</p>
      </>
    ),
    meetCompany: (
      <>
        <p><strong>Ampd Energy</strong> is a green technology company from Hong Kong, founded in 2014 by Brandon Ng, a chemical engineer who studied at Imperial College London.</p>
        <p>His big question: <em>what if we replaced every diesel generator on every construction site with a giant rechargeable battery?</em> One that is quiet, clean, and smart?</p>
        <p>It took years of experimenting and pivoting — from electric motorcycles to rural power grids — before finding the right problem to solve. But the skills they built along the way made everything possible.</p>
      </>
    ),
    thinkAboutIt: [
      'Why do you think companies still use diesel generators if they are so polluting and loud? What would make it hard to switch to something cleaner?',
      'If you lived near a construction site, what would bother you most — the noise, the smell, or the emissions? How would you feel if it went quiet overnight?',
      'Construction builds the homes, schools, and hospitals we need. How do we balance building what we need with protecting the environment?',
    ],
  },
  {
    number: 2,
    tag: 'The Invention',
    tagColor: 'bg-amber-100 text-amber-700',
    title: '2. Meet the Enertainer!',
    teaser:
      'Wayne pulls out his phone and shows Luna a photo: a big white shipping container sitting on a construction site. Inside: 30,000 battery cells, enough to power cranes, elevators, lights, and computers — all at once. It is called the "Enertainer." Half Energy, half Container. And it is completely silent.',
    image: '/images/comics/ampd/strip-2.jpg',
    imageAlt: 'Luna and Wayne look at the Enertainer — a white container battery system replacing diesel generators',
    realProblem: (
      <>
        <p>Building a battery powerful enough to replace a diesel generator on a real construction site is a serious engineering challenge. Construction sites need massive, reliable power for cranes, concrete mixers, elevators, power tools, and office equipment — all running at the same time, outdoors, in dust, rain, and extreme heat.</p>
        <p>Most batteries designed for homes or electric cars are not built for this. Ampd Energy had to design something completely custom — rugged, safe, and powerful enough to handle it all.</p>
        <p>They also had to make it <strong>easy to use</strong>. If it takes weeks to install or requires special training, construction companies will not bother. The Enertainer sets up in <strong>just 2 hours</strong> and works like a plug-and-play replacement.</p>
      </>
    ),
    meetCompany: (
      <>
        <p>The Enertainer is a 7.3-tonne white container, 2.6 meters tall, holding <strong>30,000 lithium-ion battery cells</strong>. It looks like a shipping container but works like the world's most advanced portable power station.</p>
        <p>Real results from real projects:</p>
        <p>🇸🇬 <strong>Singapore:</strong> Saved 70,000 liters of diesel in 9 months. Energy costs down 27%.</p>
        <p>🇬🇧 <strong>London:</strong> Energy costs cut by 70%.</p>
        <p>🇦🇺 <strong>Sydney:</strong> Saves $48,000 AUD every single month.</p>
        <p>And because it is 32 times quieter than diesel, construction sites can work longer hours — meaning buildings get finished faster!</p>
      </>
    ),
    thinkAboutIt: [
      'Ampd Energy tried electric motorcycles and rural power solutions before finding the right problem. Do you think "failing first" is a bad thing, or can it be useful?',
      'The Enertainer installs in 2 hours. Why do you think ease of use is just as important as the technology itself?',
      'If you were designing a battery for a construction site, what would be your biggest challenges? Think about weather, space, and the kinds of machines that need power.',
    ],
  },
  {
    number: 3,
    tag: 'The Smart Brain',
    tagColor: 'bg-indigo-100 text-indigo-700',
    title: '3. The Battery That Gets Software Updates',
    teaser:
      'Here is the coolest part: the Enertainer is not just a battery — it is a computer connected to the internet. It tracks every watt of power used, automatically calculates carbon savings, and gets software updates like a phone app. Wayne calls it a "smart battery." Luna wants one for her homework.',
    image: '/images/comics/ampd/strip-3.jpg',
    imageAlt: 'Luna and Wayne see the Enertainer connected to the internet, sending data and getting smarter over time',
    realProblem: (
      <>
        <p>A regular battery just stores and releases power. The Enertainer does something much smarter: it connects to Ampd's cloud platform called <strong>Enernet</strong>, which monitors everything in real time.</p>
        <p>This matters for a surprising reason: construction companies today must prove to regulators and investors that they are meeting environmental targets. The Enertainer automatically generates monthly reports showing exactly how much carbon was saved — saving hours of manual reporting work.</p>
        <p>It also tracks how often cranes and other equipment are actually being used — helping managers schedule work more efficiently and reduce wasted time on site.</p>
      </>
    ),
    meetCompany: (
      <>
        <p>In 2022, the global electric car boom caused the price of lithium — the main material in batteries — to shoot up by <strong>360% in just 12 months</strong>. For a company that makes battery products, that could have been a disaster.</p>
        <p>But Ampd Energy's engineers did something remarkable: they reprogrammed the Enertainer's software to use <strong>40% fewer battery cells</strong> — without reducing its power output at all. The software brain adapted to save the hardware business.</p>
        <p>This is called "software-defined hardware." It is the same reason a Tesla car improves over time even after you buy it. Ampd Energy is not just making batteries — they are making <em>intelligent energy systems</em>.</p>
      </>
    ),
    thinkAboutIt: [
      'Your phone gets better through software updates without changing the hardware. Can you think of other things that could work the same way?',
      'Why is it valuable for a company to automatically generate reports showing how much carbon they saved? Who would want to see those reports?',
      'Ampd solved a hardware cost problem with software. What does that tell you about the relationship between hardware and software in modern technology?',
    ],
  },
  {
    number: 4,
    tag: 'The Big Picture',
    tagColor: 'bg-emerald-100 text-emerald-700',
    title: '4. Building a Cleaner World, One Site at a Time',
    teaser:
      'Governments around the world are starting to ban diesel generators from construction sites. London by 2035. Oslo already now. California restricting new ones. Wayne explains: Ampd Energy is not just making a better product — it is becoming the new legal standard. The old generator is not just getting replaced. It is getting outlawed.',
    image: '/images/comics/ampd/strip-4.jpg',
    imageAlt: 'Wayne and Luna see a future city where construction sites are quiet and clean, with Enertainers everywhere',
    realProblem: (
      <>
        <p>The global market for diesel generators is worth <strong>$20 billion every year</strong>. Just in construction, it is more than $5.5 billion. Every one of those generators is eventually going to need a cleaner replacement — whether companies want to change or not.</p>
        <p>Because now governments are requiring it. Oslo in Norway is the world's first city that <strong>already requires all construction sites to be zero-emission</strong>. London is banning most diesel construction equipment by 2035. California has restricted new small engine purchases. Delhi temporarily bans diesel generators when air quality gets too bad.</p>
        <p>For Ampd Energy, these rules are not a problem — they are a business opportunity. Every new regulation creates new customers who <em>have to</em> switch.</p>
      </>
    ),
    meetCompany: (
      <>
        <p>Ampd Energy raised $27.3 million in new investment in 2024 to expand around the world. They already operate in Hong Kong, Singapore, Australia, and the UK. Next: the UAE, the United States, the Middle East, and Southeast Asia.</p>
        <p>By 2025, they are expanding beyond construction into <strong>mining and manufacturing</strong> — other industries where giant diesel engines still rule. The same Enertainer that quieted a Hong Kong building site could soon power a gold mine in Australia or a factory floor in India.</p>
        <p>One company, one product, one idea: <em>replace every diesel generator on earth with something cleaner and smarter.</em> That is a very big idea.</p>
      </>
    ),
    thinkAboutIt: [
      'Cities like Oslo are requiring zero-emission construction right now. If you were a construction company owner, how would you feel about that rule? Would it make you angry, or would you see it as an opportunity?',
      'The diesel generator market is worth $20 billion per year. If Ampd Energy replaced even 10% of that, how big would their business be?',
      'Ampd started in Hong Kong and is now expanding globally. What challenges do you think a company faces when it tries to sell the same product in very different countries?',
    ],
  },
];

export default function LunaComicAmpd() {
  return (
    <>
      <SEOHead
        title="Startup Stories #4: The Giant Battery That Silenced Construction Sites — Luna's Comics"
        description="Luna and Wayne discover why construction sites are so noisy and polluting — and meet Ampd Energy, the Hong Kong startup that replaced diesel generators with a giant smart battery called the Enertainer."
      />
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
        <Link
          to="/luna/comics"
          className="inline-flex items-center gap-2 text-sm text-pink-500 hover:text-pink-700 font-semibold transition-colors"
        >
          ← Back to Comics
        </Link>

        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <div className="flex items-center justify-center gap-2">
            <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-bold uppercase tracking-wide">
              📚 Startup Stories
            </span>
            <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-full text-xs font-semibold">
              Episode 4 of 25
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
            The Giant Battery That<br />Silenced Construction Sites
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Buildings get built using the same noisy, polluting diesel engines invented 150 years ago.
            A Hong Kong startup called <strong>Ampd Energy</strong> decided to change that — with a giant smart battery called the Enertainer.
          </p>
          <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-md mt-4">
            <img
              src="/images/comics/ampd/cover.jpg"
              alt="Ampd Energy Enertainer — the silent battery replacing diesel generators"
              className="w-full h-auto"
            />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-slate-500 pt-2">
            <span>📅 June 2026</span>
            <span>·</span>
            <span>4 comic strips</span>
            <span>·</span>
            <span>🇭🇰 Based on a real Hong Kong startup</span>
          </div>
          <ShareBar
            title="Startup Stories #4: The Giant Battery That Silenced Construction Sites"
            summary="Luna and Wayne discover Ampd Energy — the Hong Kong startup replacing diesel generators with a giant smart battery called the Enertainer."
          />
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-gradient-to-br from-pink-50 to-purple-50 border border-pink-200 rounded-3xl p-6 space-y-3"
        >
          <p className="text-xs font-bold text-pink-600 uppercase tracking-wide flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> About This Series
          </p>
          <p className="text-sm text-slate-700 leading-relaxed">
            <strong>Startup Stories</strong> is a comic series based on 25 real businesses discovered by AI researchers. These are not famous billion-dollar companies — they are scrappy startups solving <em>real problems</em> in the real world. Every story starts with a problem a real person noticed, and a solution that made something better.
          </p>
          <p className="text-sm text-slate-700 leading-relaxed">
            Tap <strong>"Learn More"</strong> below each strip to go deeper — find the real story, the real numbers, and questions to think about. 👇
          </p>
        </motion.div>

        <div className="space-y-8">
          {strips.map(strip => (
            <StripCard key={strip.number} strip={strip} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center space-y-4 py-8"
        >
          <div className="text-4xl">🔋</div>
          <h2 className="text-xl font-bold text-slate-900">The End — For Now!</h2>
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            Ampd Energy is a real company. The Enertainer is a real product sitting on real construction sites right now — quietly saving carbon while the city grows taller.
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <Link
              to="/luna/comics"
              className="px-5 py-2.5 rounded-xl bg-pink-100 text-pink-700 text-sm font-semibold hover:bg-pink-200 transition-colors"
            >
              ← More Comics
            </Link>
            <a
              href="https://www.ampd.energy"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-indigo-100 text-indigo-700 text-sm font-semibold hover:bg-indigo-200 transition-colors"
            >
              Visit ampd.energy ↗
            </a>
          </div>
          <div className="pt-4">
            <ShareBar
              title="Startup Stories #4: Ampd Energy — The Giant Battery"
              summary="A comic about the Hong Kong startup replacing diesel generators with a smart battery called the Enertainer."
            />
          </div>
        </motion.div>
      </div>
    </>
  );
}
