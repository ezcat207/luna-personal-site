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
    title: 'The Forest Is Dying in Silence — and No One Can Hear It',
    teaser:
      'A single forest ranger might be responsible for monitoring 500 square miles of rainforest. Illegal loggers use chainsaws under cover of darkness. Endangered species vanish without a trace. Conservationists are fighting blind — because traditional monitoring is too slow, too expensive, and too sparse.',
    image: '/images/comics/forest-monitor/strip-1.jpg',
    imageAlt:
      'A lone forest ranger stands overwhelmed in a vast jungle, surrounded by signs of illegal logging. Luna asks "How can one person watch an entire forest?" Wayne explains that rangers are fighting a losing battle — they cannot be everywhere at once.',
    story: [
      'Across the world, the people responsible for protecting forests and biodiversity are fighting with one hand tied behind their backs. A single park ranger in the Amazon might be responsible for patrolling an area larger than Los Angeles — on foot, with limited equipment, and no real-time intelligence. In the Democratic Republic of Congo, rangers in Virunga National Park risk their lives daily against armed poachers and illegal loggers, but they cannot be everywhere at once. The result: an estimated 10 million hectares of forest are destroyed every year — an area roughly the size of Iceland.',
      'Traditional biodiversity monitoring is just as broken. Scientists who need to track animal populations rely on methods that have not changed in decades: hike into the forest, set up camera traps, wait weeks or months, retrieve the memory cards, manually sort through thousands of photos, and try to estimate population numbers from the scraps of data collected. This process is slow, expensive, and produces results that are outdated by the time they are published. It is like trying to understand a movie by looking at five random freeze frames.',
      'The core problem is a data vacuum. We are trying to manage the most complex biological systems on Earth with almost no real-time information. We know that species are disappearing at 1,000 times the natural background rate. We know that forests are being cut down at alarming speed. But we cannot measure, in real time, what we are losing, where we are losing it, and whether our conservation efforts are working. Without data, every decision is a guess — and the guesses are not working.',
    ],
    facts: (
      <>
        <p><strong>10 million hectares</strong> of forest are destroyed annually — an area the size of Iceland. Most deforestation is illegal.</p>
        <p><strong>Species extinction rate:</strong> 1,000 times higher than the natural background rate. We are in the sixth mass extinction — but we cannot track it in real time.</p>
        <p><strong>Traditional monitoring:</strong> Manual camera traps, human surveys, and eDNA sampling. Slow, expensive, labor-intensive, and produces results that are months or years out of date.</p>
        <p><strong>Ranger coverage:</strong> A single ranger may be responsible for patrolling hundreds of square miles of wilderness. Impossible to detect illegal logging, poaching, or ecological changes without technological assistance.</p>
        <p><strong>The data vacuum paradox:</strong> We have more satellites, sensors, and computing power than ever before, but conservation remains one of the least digitized fields. The technology exists — it just has not been deployed at scale in the world\'s forests.</p>
      </>
    ),
    lesson: (
      <>
        <p>The "data vacuum" in conservation is a perfect example of a problem that is invisible to most people because it does not affect their daily lives. If your bank had no real-time transaction data, you would notice immediately. But when the Amazon rainforest loses data coverage, the world barely blinks. This asymmetry — what we choose to measure versus what we choose to ignore — shapes the entire global response to environmental crises.</p>
        <p>For kids, this is a profound lesson about attention and measurement. We tend to manage only what we measure. If we cannot measure biodiversity loss in real time, we cannot manage it. The first step to solving any big problem is building the sensors and systems to see it clearly. Synature\'s insight was not "we can build a better microphone." It was "the first thing conservation needs is not a solution — it is a measurement."</p>
      </>
    ),
    lessonTitle: 'You Cannot Save What You Cannot See',
    tip: 'Ask your child: "If you had to count all the birds in our neighborhood, how would you do it?" They might say "watch and count." But what if the neighborhood was 500 square miles? That is the problem conservationists face. Synature\'s answer: do not watch with your eyes — listen with microphones and let AI do the counting. This teaches kids that the hardest problems often require not just working harder, but changing the fundamental way you measure the problem.',
  },
  {
    number: 2,
    tag: 'The Solution',
    tagColor: 'bg-amber-100 text-amber-700',
    title: 'AI That Listens to the Forest Like a Billion Bat Ears',
    teaser:
      'Synature builds solar-powered "smart microphones" that sit in trees for months, recording every sound. A transformer-based AI — the same architecture behind ChatGPT — identifies animal calls, chainsaws, gunshots, and the subtle acoustic signatures of ecosystem health.',
    image: '/images/comics/forest-monitor/strip-2.jpg',
    imageAlt:
      'A solar-powered smart microphone mounted on a tree in the forest. Sound waves emanate from the microphone and flow into a laptop showing an AI interface that identifies different animal calls, chainsaw sounds, and other forest noises. Luna looks amazed.',
    story: [
      'Enter Synature — a Swiss startup born from a collaboration between two of Europe\'s top technical universities: EPFL and ETH Zurich. The company was founded in 2024 by Olivier Stähli and Noah Schmid, who met studying at the University of Bern. Schmid went to ETH Zurich for computer science; Stähli went to EPFL for management, technology, and entrepreneurship. Together, they formed the classic "tech + business" founding team that venture capitalists dream about.',
      'Synature\'s solution has two parts, and both are remarkable. Part one: the hardware — a "smart microphone" designed for the harshest野外 environments. It is weatherproof, has a battery life of 920 hours (three months of continuous operation), can be recharged indefinitely with a solar panel, uses a 4-MEMS microphone array for high-fidelity sound capture, and transmits data in real time over the LTE cellular network with GPS location tagging. This is not a toy — it is a rugged, autonomous acoustic sentinel designed to be deployed in jungles, mountains, and remote wilderness and left alone for months.',
      'Part two is where Synature truly differentiates itself. The "SynApp" AI platform uses a novel transformer-based architecture — the same type of AI that powers ChatGPT — but trained to understand forest sounds. Instead of requiring thousands of manually labeled examples (a "supervised" approach that is impractical for rare species), Synature uses "unsupervised machine learning." The AI listens to raw forest audio and learns to find patterns, anomalies, and clusters of similar sounds on its own. It can identify known species calls, but it can also detect unusual sounds that might indicate poaching, illegal logging, or ecological shifts — without being explicitly programmed to look for them.',
    ],
    facts: (
      <>
        <p><strong>Synature:</strong> Founded 2024 in Lausanne, Switzerland. EPFL spin-off. Offices in the EPFL Innovation Park.</p>
        <p><strong>Founding team:</strong> Olivier Stähli (CEO, EPFL) + Noah Schmid (CTO, ETH Zurich). The "Swiss tech twin" combination — management meets computer science.</p>
        <p><strong>Smart microphone specs:</strong> 920-hour battery life (3 months continuous), solar-rechargeable, weatherproof, 4-MEMS microphone array, LTE cellular data, GPS. Designed for extreme野外 deployment.</p>
        <p><strong>Transformer-based AI:</strong> The same architecture behind ChatGPT and GPT-4, but trained on acoustic data instead of text. Can process vast amounts of raw audio efficiently.</p>
        <p><strong>Unsupervised learning:</strong> The AI discovers patterns in forest sounds without requiring massive labeled datasets. It can detect unknown sounds — chainsaws it has never heard before, animal calls from rare species, anomalies that indicate ecosystem stress.</p>
        <p><strong>Pilot deployments:</strong> Swiss National Park, Yellowstone National Park (wolf acoustic detection), and multiple European forests.</p>
      </>
    ),
    lesson: (
      <>
        <p>The use of transformer architecture — the same AI that powers ChatGPT — for listening to forests is a brilliant example of "technology transfer." The most advanced AI models in the world were built for processing human language, but their fundamental capability (finding patterns in sequential data) applies just as well to audio from a rainforest as it does to text from the internet. Synature did not need to invent a new AI architecture; they just needed to point an existing one at a new problem.</p>
        <p>This is a crucial lesson for kids: the most powerful innovations often come from taking something that works in one field and applying it to another. You do not need to invent the wheel from scratch — you need to recognize that someone else\'s wheel could solve your problem, too. Synature looked at ChatGPT and asked: "What if this could listen to a forest instead of read the internet?" That question was worth building a company around.</p>
      </>
    ),
    lessonTitle: 'Your Solution Might Already Exist — Just in a Different Industry',
    tip: 'Ask your child: "What is something that works really well for one purpose but could be used for something completely different?" A smartphone camera can scan QR codes at a restaurant — but it can also diagnose skin diseases through medical apps. A gaming console can play Fortnite — but NASA used PlayStation controllers for their Mars helicopter. Synature took ChatGPT\'s brain and put it in a tree in the forest. This teaches kids that innovation is often about "recontextualization" — seeing a familiar tool in an unfamiliar setting.',
  },
  {
    number: 3,
    tag: 'The Strategy',
    tagColor: 'bg-indigo-100 text-indigo-700',
    title: 'Listen to the Pigs to Save the Wolves — The Genius of Dual-Use Tech',
    teaser:
      'Synature\'s secret: conservation alone cannot pay for global-scale monitoring. So they sell the same AI system to poultry farmers (who need to detect sick chickens by cough) and shrimp farmers (who need to optimize feed). The profits fund the rainforest monitoring.',
    image: '/images/comics/forest-monitor/strip-3.jpg',
    imageAlt:
      'A split screen showing two applications of Synature\'s technology. On the left, a smart microphone in a forest detects wolf howls. On the right, the same microphone in a poultry barn detects chickens coughing. Wayne explains to Luna that the same AI powers both — and the farmers pay for the rainforest.',
    story: [
      'Synature\'s strategy is a masterclass in what is called "dual-use technology" — building one platform that serves two very different markets. On one side, conservation: national parks, protected areas, and NGOs who need to monitor biodiversity and detect illegal activity. On the other side, agriculture: poultry farms, pig barns, and shrimp ponds that need to monitor animal health and optimize feeding.',
      'The conservation market gives Synature credibility and mission: their microphones are deployed in Yellowstone National Park (tracking wolf populations via howl detection) and the Swiss National Park (monitoring the return of apex predators). These high-profile deployments prove that the technology works in the harshest conditions and provide priceless "brand authority" for a young company. But the conservation market alone cannot scale fast enough — government budgets for park monitoring are limited, and the sales cycles are long.',
      'Enter agriculture, where the economics are completely different. A poultry farmer with 50,000 chickens has a very clear problem: respiratory diseases can wipe out an entire flock in days. Synature\'s microphones can detect the sound of chickens coughing — an early symptom of avian flu or other respiratory infections — days before the farmer would notice visible symptoms. Early detection means early treatment, which means fewer deaths, which means more profit. The return on investment is so clear that farmers will pay for the system out of their operating budgets — no government grants needed.',
      'The same principle applies to shrimp farming, where Synature\'s microphones detect the clicking sounds shrimp make when they eat. By monitoring feeding activity, farmers can optimize their feed schedule — reducing waste (feed is the largest cost in aquaculture), improving water quality, and increasing yield. Every shrimp farmer in the world wants this. The agricultural revenue funds the continued development of Synature\'s AI platform, which in turn makes the conservation product better. The wolves benefit from the pigs — literally.',
    ],
    facts: (
      <>
        <p><strong>Dual-use business model:</strong> One AI platform serves two markets — conservation (national parks, NGOs) and agriculture (poultry, pig, shrimp farming).</p>
        <p><strong>Conservation credibility:</strong> Yellowstone National Park (wolf acoustic detection) and Swiss National Park deployed Synature\'s microphones. High-profile pilots that prove the technology works.</p>
        <p><strong>Agricultural ROI — poultry:</strong> AI detects chickens coughing (early respiratory disease sign) days before farmers notice. Early treatment saves flocks. Clear, measurable ROI from reduced mortality.</p>
        <p><strong>Agricultural ROI — shrimp:</strong> AI detects shrimp feeding clicks to optimize feed timing and quantity. Feed is the largest cost in aquaculture. Optimization reduces waste, improves water quality, increases yield.</p>
        <p><strong>The virtuous cycle:</strong> Agricultural profits → fund AI R&D → improve conservation product → more park deployments → more credibility → more agricultural sales. Each market feeds the other.</p>
        <p><strong>Investors and ecosystem:</strong> Venture Kick, FIT Digital, EPFL Tech4Regen accelerator, MassChallenge Switzerland 2025, and affiliation with ETH Zurich\'s Crowther Lab (world-leading ecosystem science).</p>
      </>
    ),
    lesson: (
      <>
        <p>Synature\'s dual-use strategy solves one of the hardest problems in climate tech: how to make conservation financially sustainable. Conservation alone is a tough business — your customers are government agencies and NGOs with tight budgets and slow procurement cycles. Pure-play conservation startups almost always struggle to scale because the market cannot pay enough to support the required R&D investment.</p>
        <p>Synature\'s answer: find a second market where the same technology solves an even more urgent problem with clearer economics. Poultry farmers have a life-and-death need (flock health) and the budget to pay for it. The fact that the same microphones and AI that listen for wolves in Yellowstone can also listen for coughing chickens in a barn is not a coincidence — it is a deliberate strategy to make the conservation mission financially self-sustaining. This is not charity disguised as business; it is business engineered to fund charity.</p>
      </>
    ),
    lessonTitle: 'Make the Profitable Customer Pay for the Mission',
    tip: 'Ask your child: "If you wanted to protect all the forests in the world, who would pay for it?" The obvious answer is "the government" or "donations" — but those are unreliable. Synature found a smarter answer: build something that farmers desperately need (early disease detection for their animals), charge them for it, and use the profits to protect forests. This teaches kids a powerful principle: the best way to fund a mission is not to ask for donations — it is to build something valuable that people will pay for, and let the profits do the good.',
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

function AboutSynature() {
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
          <div className="w-8 h-8 bg-sky-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-sky-600 text-sm font-bold">SY</span>
          </div>
          <div>
            <p className="font-bold text-slate-800">About Synature</p>
            <p className="text-xs text-slate-400 mt-0.5">Acoustic AI for biodiversity monitoring and precision agriculture</p>
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
                  <p className="font-semibold text-slate-800 mb-1">What Synature Does</p>
                  <p>Synature builds solar-powered smart microphones and an AI platform that listens to natural and agricultural environments. The system identifies animal calls, detects early signs of disease in livestock, monitors feeding behavior in aquaculture, and generates real-time biodiversity reports — all from the same hardware and AI.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">The Technology</p>
                  <p>Weatherproof smart microphones with 920-hour battery life, solar charging, LTE connectivity, GPS, and a 4-MEMS microphone array. The "SynApp" AI platform uses a transformer-based architecture (the same as ChatGPT) with unsupervised learning to discover patterns in raw audio without requiring massive labeled datasets.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">The Business Model</p>
                  <p>Dual-use strategy: conservation markets (national parks, NGOs, ESG reporting) provide credibility and mission; agricultural markets (poultry, pig, shrimp farming) provide revenue and scalability. Profits from agriculture fund continued AI R&D that improves the conservation product.</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-slate-800 mb-1">The Founders</p>
                  <p>Olivier Stähli (CEO, EPFL) and Noah Schmid (CTO, ETH Zurich) — the Swiss "tech + business" twin. They met at the University of Bern and split for graduate studies: Schmid for computer science at ETH, Stähli for management and entrepreneurship at EPFL. The company is an EPFL spin-off founded in 2024.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">Why It Matters for Kids</p>
                  <p>Synature teaches three things. First: the most powerful innovations borrow technology from one field and apply it to another (ChatGPT\'s brain listening to forests). Second: "dual-use" strategy — if your mission cannot pay for itself, find a profitable customer who needs the same product, and let their money fund the mission. Third: you cannot solve a problem you cannot measure — the first step to protecting forests is building sensors to understand what is happening in them. Also, Synature was founded in 2024 — it is brand new, showing that the most interesting companies are being created right now.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">Learn More</p>
                  <p>
                    <a href="https://www.synature.ch" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 font-medium">
                      synature.ch
                    </a>
                    {' '}— official website with technology details and pilot project information.
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

export default function WayneComicForestMonitor() {
  const totalStrips = strips.length;
  return (
    <>
      <SEOHead
        title="Startup Stories #23: Synature — AI That Listens to Forests Like a Billion Bat Ears | Wayne's Comics"
        description="A parent-child comic series about real startups. Episode 23: Synature — a Swiss EPFL spin-off that builds solar-powered smart microphones with transformer-based AI to monitor biodiversity, detect illegal logging, and optimize agriculture — all from the sound of the forest."
        ogImage="/images/comics/forest-monitor/cover.jpg"
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
          <img src="/images/comics/forest-monitor/cover.jpg" alt="Startup Stories #23: Synature — AI-powered acoustic monitoring for forests and biodiversity" className="w-full h-auto" />
        </div>
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-bold rounded-full uppercase tracking-wide">
            Startup Stories · Episode 23 of 25
          </span>
          <span className="text-xs text-slate-400">June 2026 · {totalStrips} strips · 🇨🇭 Switzerland</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3 leading-tight">
          The AI That Listens to the Forest Like a Billion Ears
        </h1>
        <p className="text-slate-500 leading-relaxed mb-5 max-w-2xl">
          A ranger cannot patrol 500 square miles of rainforest alone. But a solar-powered 
          smart microphone, running ChatGPT-grade AI, can listen to every chainsaw, every 
          wolf howl, every cough of a sick chicken — 24 hours a day, 7 days a week, 365 
          days a year. And the poultry farmers\' payments fund the rainforest protection. 
          Episode 23 of 25.
        </p>
        <ShareBar
          title="Startup Stories #23: Synature — Acoustic AI Forest Monitoring"
          summary="A 3-strip parent-child comic about Synature — a Swiss startup using transformer-based AI to listen to forests for biodiversity monitoring and illegal logging detection, funded by agricultural applications."
        />
      </motion.div>

      <div className="space-y-6 mb-10">
        {strips.map((strip, i) => (
          <motion.div key={strip.number} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.1 + i * 0.07 }}>
            <StripCard strip={strip} total={totalStrips} />
          </motion.div>
        ))}
      </div>

      <AboutSynature />

      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.4 }}
        className="flex items-center justify-between py-6 border-t border-slate-200 mb-10"
      >
        <Link to="/wayne/comics" className="text-sm text-slate-400 hover:text-slate-700 transition-colors">
          ← All Comics
        </Link>
        <ShareBar title="Startup Stories #23: Synature" summary="A parent-child comic about using transformer-based AI to listen to forests for biodiversity monitoring and illegal logging detection." />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.45 }}
        className="bg-indigo-600 rounded-2xl px-8 py-10 text-center text-white"
      >
        <h2 className="text-xl font-bold mb-2">More startup stories coming</h2>
        <p className="text-indigo-100 text-sm mb-6 max-w-md mx-auto">
          This is Episode 23 of 25. Each story is about a real company solving a real problem — told in a way that makes sense to a 15-year-old, with analysis for the parent reading along.
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
