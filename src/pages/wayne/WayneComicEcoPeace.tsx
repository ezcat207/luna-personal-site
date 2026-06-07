import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { SEOHead } from '../../components/SEOHead';
import { ShareBar } from '../../components/ShareBar';

function LessonBox({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-indigo-50 border-l-4 border-indigo-400 rounded-r-xl p-5">
      <p className="text-xs font-bold text-indigo-600 uppercase tracking-wide mb-2">{title}</p>
      <div className="text-sm text-slate-700 leading-relaxed space-y-2">{children}</div>
    </div>
  );
}

function FactBox({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
      <p className="text-xs font-bold text-amber-700 uppercase tracking-wide mb-3">{title}</p>
      <div className="text-sm text-slate-700 leading-relaxed space-y-2">{children}</div>
    </div>
  );
}

function ParentTip({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 flex gap-3">
      <span className="text-emerald-500 text-lg flex-shrink-0">💡</span>
      <div>
        <p className="text-xs font-bold text-emerald-700 uppercase tracking-wide mb-1">Parent Tip</p>
        <p className="text-sm text-slate-700 leading-relaxed">{children}</p>
      </div>
    </div>
  );
}

const strips = [
  {
    number: 1,
    tag: 'The Problem',
    tagColor: 'bg-red-100 text-red-700',
    title: 'The Green Slime Taking Over the World\'s Lakes',
    teaser:
      'Toxic algae blooms are choking lakes worldwide — over half of US lakes are affected. Traditional solutions (chemicals, manual cleanup) are expensive and ineffective. The water crisis is not just about quantity — it is about quality.',
    image: '/images/comics/ecopeace/strip-1.jpg',
    imageAlt:
      'Luna and Wayne visit a lake covered in green toxic algae. The water is thick with slime, fish are dying, and signs warn people to stay away. Luna asks "Can\'t someone just clean this up?"',
    story: [
      'Every summer, lakes around the world turn green. Not the pleasant green of a forest reflected in clear water — a thick, soupy green of toxic algae blooms. These blooms are caused by nutrient pollution — fertilizer runoff from farms, untreated sewage, and industrial waste flowing into lakes and feeding explosive algae growth. The result is water so toxic that it kills fish, sickens people and pets, and makes the lake unusable for recreation or drinking water.',
      'The scale of the problem is staggering. According to the US EPA, more than half of the lakes in the United States are affected by algae blooms. The World Economic Forum projects that by 2030, the world could face a 40% water supply deficit. Water pollution is not just an environmental issue — it is an economic and public health emergency. Toxic algae closes beaches, kills tourism, increases water treatment costs, and in extreme cases, makes tap water undrinkable (as happened in Toledo, Ohio in 2014 when a algae bloom in Lake Erie left 500,000 people without clean water).',
      'For city managers and lake authorities, the traditional response is a losing battle. Manual cleanup is slow and expensive — workers in boats scooping algae with nets. Chemical treatments (like copper sulfate) kill the algae but leave toxins in the water and harm other aquatic life. Fixed aeration systems are costly to install and maintain. None of these solutions address the root problem: the lack of an affordable, scalable way to continuously monitor and manage water quality in real time.',
    ],
    facts: (
      <>
        <p><strong>Over 50% of US lakes</strong> affected by harmful algae blooms according to the EPA — a problem that is getting worse with climate change and agricultural runoff.</p>
        <p><strong>40% water supply deficit</strong> projected by 2030 by the World Economic Forum — water quality degradation is a major contributor.</p>
        <p><strong>Toledo, Ohio 2014:</strong> A toxic algae bloom in Lake Erie made tap water undrinkable for 500,000 people for three days. This was a wake-up call for the nation.</p>
        <p><strong>Traditional solutions fail:</strong> Manual cleanup is labor-intensive and slow. Chemical treatments cause secondary pollution. Fixed equipment is expensive and covers limited area.</p>
        <p><strong>Root cause:</strong> Excess nutrients (nitrogen and phosphorus) from agriculture, sewage, and industry feed explosive algae growth. Managing this requires continuous monitoring and intervention — not one-time fixes.</p>
      </>
    ),
    lesson: (
      <>
        <p>The lake algae crisis is what systems thinkers call a "slow-moving emergency." It does not make headlines like a hurricane or earthquake, but it causes more cumulative damage over time. These are the hardest problems to solve because they lack urgency — there is no single moment of crisis that forces action, just a gradual degradation that society learns to tolerate.</p>
        <p>This is also why the problem persisted for so long without a good solution. The customers (city governments, lake authorities) had limited budgets and no great options. They bought the cheapest inadequate solution year after year. Creating a breakthrough here required not just better technology, but a fundamentally different business model — which is exactly what EcoPeace eventually built.</p>
      </>
    ),
    lessonTitle: 'Slow Emergencies Need New Business Models, Not Just New Tech',
    tip: 'Ask your child: "If your room got messier by one percent every day, would you notice? When would you finally clean it?" The answer reveals the challenge of slow-moving problems. A lake does not go from clean to toxic overnight — it happens over years. These problems are hard to solve because nobody acts until it is too late. The best solutions are the ones that make continuous, automatic improvement possible — like a Roomba that cleans a little every day instead of waiting for a big spring cleaning.',
  },
  {
    number: 2,
    tag: 'The Solution',
    tagColor: 'bg-amber-100 text-amber-700',
    title: 'The Roomba for Lakes — A Robot That Eats Algae',
    teaser:
      'After 7 years of struggling as a traditional equipment company, EcoPeace reinvented itself as a robotics company. Their solar-powered autonomous boats skim algae, monitor water quality, and navigate lakes entirely on their own.',
    image: '/images/comics/ecopeace/strip-2.jpg',
    imageAlt:
      'A solar-powered autonomous robot boat skimming algae from a lake surface. Wayne explains how the robot navigates, collects algae, and monitors water quality data in real time — all without human operators.',
    story: [
      'EcoPeace was founded in 2012 by Chae Inwon in Gwangju, South Korea. For the first seven years, the company did what every other water treatment company did: develop and sell fixed purification equipment to government agencies. It was a brutal business — high competition, low margins, long sales cycles, and customers who saw water treatment as a cost to minimize rather than a problem to solve. By 2019, the company was near collapse. Employees had left. Revenue had dried up. EcoPeace was days away from shutting down.',
      'Then came the turning point. A government official from Suwon City asked Chae a simple question: "Can you make something like a Roomba — a device that cruises around on the water automatically, collects data, and cleans up pollution as it goes?" That question changed everything. Chae realized that the future of water management was not better filters — it was autonomous, intelligent, mobile platforms.',
      'EcoPeace pivoted from being an environmental equipment company to a robotics and AI company. They built solar-powered autonomous boats — "Healing Boats" — that navigate lakes, rivers, and reservoirs without human operators. The boats skim algae from the surface, monitor water quality in real time (temperature, pH, dissolved oxygen, nutrient levels), and send data to a cloud platform. They navigate using GPS, avoid obstacles with sensors, and return to their docking station to recharge automatically when the battery runs low.',
      'The pivot was a high-risk gamble. EcoPeace had to learn robotics, AI, autonomous navigation, and energy management from scratch — while also integrating their deep expertise in environmental science. But it worked. In 2024 and 2025, EcoPeace won CES Innovation Awards in the Smart Cities category. In 2024, they won the prestigious Edison Award Gold. The company that was nearly dead in 2019 became a globally recognized innovator.',
    ],
    facts: (
      <>
        <p><strong>EcoPeace Inc.:</strong> Founded 2012 in Gwangju, South Korea by Chae Inwon. Near collapse in 2019 before reinventing as a robotics company.</p>
        <p><strong>The pivot:</strong> From selling fixed water purification equipment (failing) to building autonomous solar-powered water robots (succeeding).</p>
        <p><strong>Healing Boat:</strong> Solar-powered autonomous boat that skims algae, monitors water quality, and navigates lakes without human operators. Self-charging.</p>
        <p><strong>Inspiration:</strong> A government official asked "Can you make a Roomba for lakes?" — this one question triggered the company\'s complete reinvention.</p>
        <p><strong>Awards:</strong> CES Innovation Award (Smart Cities) 2024 and 2025. Edison Award Gold 2024.</p>
        <p><strong>The risk:</strong> EcoPeace had to learn robotics, AI, and autonomous navigation from scratch — they had zero experience in these fields before the pivot.</p>
      </>
    ),
    lesson: (
      <>
        <p>EcoPeace\'s story contains a brutal but essential lesson: sometimes your first business model is wrong, and you have to be willing to kill it to survive. Seven years of effort, near bankruptcy, and a complete identity change — that is what it took. Most founders would have given up long before year seven. Most would have been too attached to their original vision to pivot so radically.</p>
        <p>But notice what made the pivot possible: Chae listened to a customer. Not a consultant, not a trend report, not a competitor — a customer with a real problem who said "I don\'t want your current product, I want something else." The most valuable strategic insights often come from frontline conversations with people who are actually struggling with the problem you claim to solve.</p>
      </>
    ),
    lessonTitle: 'Your First Business Model Is Probably Wrong — Listen to the Customer Who Tells You Why',
    tip: 'Ask your child: "Have you ever tried to solve a problem one way, failed, and then found a completely different approach that worked?" Maybe they tried to memorize a math formula but it did not stick — so they tried practicing problems instead. The method changed but the goal stayed the same. EcoPeace\'s goal never changed (clean water), but their entire approach had to change (from stationary filters to autonomous robots). This teaches kids that changing your method is not failure — it is learning. The only real failure is refusing to change when your approach is not working.',
  },
  {
    number: 3,
    tag: 'The Strategy',
    tagColor: 'bg-indigo-100 text-indigo-700',
    title: 'Why Rent When You Can Buy? Because Nobody Buys Lake Cleanup Robots.',
    teaser:
      'EcoPeace\'s breakthrough was not the robot — it was the "Robot-as-a-Service" model. Cities pay a monthly fee instead of buying expensive equipment. And the "Healing Boat" doubles as a luxury cruise that generates revenue while cleaning.',
    image: '/images/comics/ecopeace/strip-3.jpg',
    imageAlt:
      'Wayne explains EcoPeace\'s two business models to Luna: Robot-as-a-Service (cities pay monthly for algae cleanup) and Healing Boat (a luxury solar-powered cruise boat that cleans the water while tourists enjoy the ride).',
    story: [
      'EcoPeace\'s technological breakthrough (the autonomous robot) was necessary, but it was not sufficient. They still faced the same problem that nearly killed the company: government customers have limited capital budgets and hate buying expensive equipment with uncertain long-term value. So EcoPeace designed a business model that made the purchasing decision easy.',
      'Model 1: Robot-as-a-Service (RaaS). Instead of buying a robot, cities pay a monthly subscription fee. EcoPeace handles deployment, maintenance, monitoring, and data analytics. The city gets clean water without the capital expenditure, the technical risk, or the operational headache. This transforms water treatment from a "capital project" (approved once, budgeted for years) into an "operational expense" (monthly payment, easy to renew or cancel). For government procurement, this is a dramatically easier decision.',
      'Model 2: The Healing Boat. This is where EcoPeace\'s strategy gets truly creative. The Healing Boat is not just a water cleanup robot — it is also a luxury solar-powered cruise boat. Cities can rent it out for eco-tourism, sunset cruises, and corporate events. The boat generates revenue by providing a delightful experience (quiet, clean, solar-powered ride on a beautiful lake) while simultaneously cleaning the water underneath it. The environmental cleanup is not a cost center — it is a byproduct of a profitable leisure activity.',
      'The Healing Boat model transforms the economics of water cleanup. Instead of being a budget line item that city councils grudgingly approve, it becomes a revenue-generating asset that pays for itself. Tourists pay to ride a boat that is quietly making the lake cleaner. This is the holy grail of sustainable business: the "green" option is not just cheaper — it is profitable on its own terms. By 2025, EcoPeace is planning an IPO and expanding to Vietnam, Singapore, North America, Europe, and the Middle East.',
    ],
    facts: (
      <>
        <p><strong>Robot-as-a-Service (RaaS):</strong> Monthly subscription model — cities pay for clean water outcomes, not hardware. No capital expenditure, no maintenance burden.</p>
        <p><strong>Healing Boat:</strong> A solar-powered autonomous boat that doubles as a luxury eco-tourism cruise. Generates revenue from ticket sales while cleaning the lake. Environmental cleanup as a profitable byproduct.</p>
        <p><strong>Revenue-positive cleanup:</strong> The Healing Boat makes water treatment a profit center, not a cost center. Cities can actually make money from cleaning their lakes.</p>
        <p><strong>Busan project (2023):</strong> Two AI robots deployed on the Seonakdong River, managing 400,000 square meters of water. Regular patrols with increased frequency during algae season.</p>
        <p><strong>Global expansion:</strong> Vietnam (negotiations), Singapore (PoC project), North America and Europe (CES 2025 targeting), Middle East (oil spill cleanup partnership). IPO planned around 2025.</p>
        <p><strong>Awards:</strong> CES Innovation Award 2024, 2025. Edison Award Gold 2024.</p>
      </>
    ),
    lesson: (
      <>
        <p>The Healing Boat is one of the most elegant business model innovations in this entire series. Most environmental technology companies try to sell "less bad" — a filter that pollutes less, a process that uses less energy. EcoPeace instead created something that is genuinely delightful (a quiet solar cruise on a clean lake) that happens to solve an environmental problem as a side effect.</p>
        <p>This is the difference between "eco-premium" (charging more for green features) and "eco-byproduct" (charging for something people want, and getting the green benefit for free). The second model is vastly more powerful because it does not require customers to value sustainability — it just requires them to want what you are selling. The environmental benefit comes along for the ride.</p>
      </>
    ),
    lessonTitle: 'Don\'t Sell Clean Water — Sell a Sunset Cruise That Happens to Clean the Lake',
    tip: 'Ask your child: "If I asked you to pay more for a candy bar because the wrapper is recyclable, would you be excited?" Probably not. "But what if I sold you a candy bar that tasted amazing and was also good for your teeth?" Would you buy it? The Healing Boat works the same way — nobody buys it because they care about algae. They buy it because a quiet solar cruise on a beautiful lake sounds wonderful. The algae removal is a free bonus. This teaches kids that the most powerful sustainable solutions are not more expensive versions of normal things — they are better versions that happen to be sustainable.',
  },
];

function StripCard({ strip, total }: { strip: typeof strips[0]; total: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div layout className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
      <div className="overflow-hidden">
        <img src={strip.image} alt={strip.imageAlt} className="w-full h-auto" />
      </div>
      <div className="px-6 pt-5 pb-4">
        <div className="flex items-center gap-2 mb-3">
          <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${strip.tagColor}`}>{strip.tag}</span>
          <span className="text-xs text-slate-400">Strip {strip.number} of {total}</span>
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-3">{strip.title}</h2>
        <p className="text-sm text-slate-600 leading-relaxed">{strip.teaser}</p>
      </div>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-6 py-3 border-t border-slate-100 hover:bg-slate-50 transition-colors text-left"
      >
        <span className="text-sm font-semibold text-indigo-600">
          {open ? 'Hide the story' : 'Read the full story, facts & lesson'}
        </span>
        {open ? <ChevronUp className="w-4 h-4 text-indigo-400" /> : <ChevronDown className="w-4 h-4 text-indigo-400" />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-8 space-y-6 border-t border-slate-100 pt-6">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-3">The Story Behind the Strip</p>
                <div className="space-y-3">
                  {strip.story.map((para, i) => (
                    <p key={i} className="text-slate-700 leading-relaxed text-sm">{para}</p>
                  ))}
                </div>
              </div>
              <FactBox title="Real Numbers">{strip.facts}</FactBox>
              <LessonBox title={strip.lessonTitle}>{strip.lesson}</LessonBox>
              <ParentTip>{strip.tip}</ParentTip>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function AboutEcoPeace() {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.35 }}
      className="bg-white border border-slate-200 rounded-2xl overflow-hidden mb-10"
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-6 py-5 hover:bg-slate-50 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-cyan-600 text-sm font-bold">EP</span>
          </div>
          <div>
            <p className="font-bold text-slate-800">About EcoPeace</p>
            <p className="text-xs text-slate-400 mt-0.5">Autonomous solar-powered water robots for lake cleanup</p>
          </div>
        </div>
        {open ? <ChevronUp className="w-5 h-5 text-slate-400 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="border-t border-slate-100 px-6 py-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-600 leading-relaxed">
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-slate-800 mb-1">What EcoPeace Does</p>
                  <p>EcoPeace builds autonomous, solar-powered robots that clean lakes, rivers, and reservoirs. Their "Healing Boats" skim algae, monitor water quality in real time, and navigate without human operators — all while running on renewable energy.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">The Technology</p>
                  <p>GPS-guided autonomous navigation with obstacle avoidance. Real-time water quality monitoring (temperature, pH, dissolved oxygen, nutrients). Solar-powered with automatic docking and recharging. Cloud platform for data analytics and remote fleet management.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">The Business Model</p>
                  <p>Two models: (1) Robot-as-a-Service — monthly subscription for clean water outcomes, no capital expenditure. (2) Healing Boat — luxury solar cruise that generates tourism revenue while cleaning the lake. Environmental cleanup as a profitable byproduct.</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-slate-800 mb-1">The Founder</p>
                  <p>Chae Inwon — started with a passion for water treatment in college. Worked at an environmental technology company before founding EcoPeace in 2012. Nearly went bankrupt in 2019 before a customer question inspired the pivot to robotics. Now a globally recognized innovator with CES and Edison Award wins.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">Why It Matters for Kids</p>
                  <p>EcoPeace\'s story teaches two powerful lessons. First: sometimes you have to completely reinvent yourself to succeed — seven years of failure does not mean you should give up, it means you should try something fundamentally different. Second: the best business models do not ask people to pay more for "green" features — they create something people genuinely want, and the environmental benefit is a free bonus. This reframes sustainability from a sacrifice into an innovation opportunity.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">Learn More</p>
                  <p>
                    <a href="http://www.eco-peace.co.kr" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 font-medium">
                      eco-peace.co.kr
                    </a>
                    {' '}— company information and projects (Korean).
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function WayneComicEcoPeace() {
  const totalStrips = strips.length;
  return (
    <>
      <SEOHead
        title="Startup Stories #19: EcoPeace — The Roomba for Lakes | Wayne's Comics"
        description="A parent-child comic series about real startups. Episode 19: EcoPeace — a Korean company that built solar-powered autonomous robots to clean toxic algae from lakes, using a Robot-as-a-Service model that turns water treatment from a cost center into a profit center."
        ogImage="/images/comics/ecopeace/cover.jpg"
      />

      <div className="mb-8">
        <Link to="/wayne/comics" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          All Comics
        </Link>
      </div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-10">
        <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md mb-7">
          <img src="/images/comics/ecopeace/cover.jpg" alt="Startup Stories #19: EcoPeace — solar-powered robots cleaning toxic algae from lakes" className="w-full h-auto" />
        </div>
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-bold rounded-full uppercase tracking-wide">
            Startup Stories · Episode 19 of 25
          </span>
          <span className="text-xs text-slate-400">June 2026 · {totalStrips} strips · 🇰🇷 South Korea</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3 leading-tight">
          The Roomba for Lakes
        </h1>
        <p className="text-slate-500 leading-relaxed mb-5 max-w-2xl">
          Over half of US lakes are choked by toxic algae. Traditional cleanup is slow, 
          expensive, and ineffective. After nearly going bankrupt selling water filters, 
          EcoPeace reinvented itself as a robotics company — building solar-powered 
          autonomous boats that eat algae for a monthly subscription fee. Episode 19 of 25.
        </p>
        <ShareBar
          title="Startup Stories #19: EcoPeace — Algae-Eating Robots for Lakes"
          summary="A 3-strip parent-child comic about EcoPeace — a Korean startup that pivoted from failing water equipment company to award-winning autonomous lake cleanup robots."
        />
      </motion.div>

      <div className="space-y-6 mb-10">
        {strips.map((strip, i) => (
          <motion.div key={strip.number} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.1 + i * 0.07 }}>
            <StripCard strip={strip} total={totalStrips} />
          </motion.div>
        ))}
      </div>

      <AboutEcoPeace />

      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.4 }}
        className="flex items-center justify-between py-6 border-t border-slate-200 mb-10"
      >
        <Link to="/wayne/comics" className="text-sm text-slate-400 hover:text-slate-700 transition-colors">
          ← All Comics
        </Link>
        <ShareBar title="Startup Stories #19: EcoPeace" summary="A parent-child comic about solar-powered lake cleanup robots and the Robot-as-a-Service business model." />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.45 }}
        className="bg-indigo-600 rounded-2xl px-8 py-10 text-center text-white"
      >
        <h2 className="text-xl font-bold mb-2">More startup stories coming</h2>
        <p className="text-indigo-100 text-sm mb-6 max-w-md mx-auto">
          This is Episode 19 of 25. Each story is about a real company solving a real problem — told in a way that makes sense to a 15-year-old, with analysis for the parent reading along.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/wayne/comics" className="inline-flex items-center justify-center gap-2 bg-white text-indigo-700 font-semibold text-sm px-6 py-2.5 rounded-xl hover:bg-indigo-50 transition-colors">
            All Wayne Comics
          </Link>
          <Link to="/wayne/insights" className="inline-flex items-center justify-center gap-2 bg-indigo-500 text-white font-semibold text-sm px-6 py-2.5 rounded-xl hover:bg-indigo-400 transition-colors">
            Read Wayne's Insights
          </Link>
        </div>
      </motion.div>
    </>
  );
}
