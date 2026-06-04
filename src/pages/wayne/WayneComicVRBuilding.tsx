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
    title: 'The $12 Trillion Industry That Forgot How to Improve',
    teaser:
      'Construction productivity has barely improved in 50 years. Most other industries got 10x more efficient. Building a house still works the same way it did in the 1970s — blueprints, plywood, skilled labor shortages.',
    image: '/images/comics/vr-building/strip-1.jpg',
    imageAlt:
      'A construction worker struggles with paper blueprints on a chaotic job site. Wayne explains to Luna that construction productivity has been flat for 50 years while every other industry transformed.',
    story: [
      'Here is a shocking fact: construction productivity has been basically flat since the 1970s. Manufacturing? Up 8x. Retail? Up 10x. Agriculture? Up 15x. Construction? Flat. The $12 trillion global construction industry — one of the largest sectors of the world economy — has somehow avoided the productivity revolution that transformed virtually every other industry.',
      'The reasons are well known but deeply entrenched. First: skilled labor is disappearing. The average carpenter in the US is over 50 years old. Young people are not entering the trades. Every construction company is fighting over an ever-shrinking pool of experienced workers. Second: waste is catastrophic. Up to 30% of materials delivered to a typical job site end up as waste — either damaged, incorrectly ordered, or simply unused. Third: the entire process is analog. Blueprints are still paper. Coordination happens in morning meetings. Changes require reprinting and redistributing documents.',
      'Previous attempts to industrialize construction failed because they took the wrong approach. "Volumetric modular" construction — building entire rooms in giant factories and shipping them to sites — required $50-100 million factory investments that locked companies into specific designs and geographies. The transportation costs of moving giant modules hundreds of miles proved prohibitive. These centralized mega-factories created more problems than they solved. The industry needed a fundamentally different approach.',
    ],
    facts: (
      <>
        <p><strong>Construction productivity</strong> has been flat since the 1970s — while manufacturing improved 8x, retail 10x, agriculture 15x.</p>
        <p><strong>$12 trillion</strong> global construction industry — one of the world's largest sectors, yet one of the least technologically advanced.</p>
        <p><strong>30% waste</strong> — that is how much of the materials delivered to a typical job site end up in landfills.</p>
        <p><strong>Skilled labor crisis:</strong> Average US carpenter is 50+. Young workers are not entering the trades. Competition for skilled labor is intense and worsening.</p>
        <p><strong>Previous failed approach:</strong> Volumetric modular required $50-100M factories, locked to specific designs, and created impossible logistics challenges transporting giant modules.</p>
      </>
    ),
    lesson: (
      <>
        <p>Construction\'s productivity stagnation is a case study in what happens when an industry has fragmented supply chains, project-based work, and no software layer. Unlike manufacturing (where factories created standardized processes) or retail (where e-commerce digitized everything), construction remained analog because every project is different, every site is unique, and every trade is a separate business.</p>
        <p>The key insight: you cannot solve construction\'s problems by asking it to be more like manufacturing. The centralized factory approach failed because it could not adapt to local conditions and created impossible logistics. The solution had to be portable, adaptable, and affordable — a factory you can put inside a shipping container and deploy anywhere.</p>
      </>
    ),
    lessonTitle: 'The Last Analog Industry',
    tip: 'Ask your child: "What is something in your daily life that has not really changed in 50 years?" School desks? Pencils? Maybe the way your school building was built? Then ask: "If we could redesign how buildings are made from scratch, what would it look like?" This is the kind of first-principles thinking that leads to real innovation — not doing the same thing slightly better, but reimagining the whole process.',
  },
  {
    number: 2,
    tag: 'The Solution',
    tagColor: 'bg-amber-100 text-amber-700',
    title: 'The Micro-Factory in a Shipping Container',
    teaser:
      'Cuby Technologies\' Mobile Micro-Factory fits in a shipping container, deploys anywhere, and lets a small team of non-skilled workers assemble high-quality homes with 90% less waste.',
    image: '/images/comics/vr-building/strip-2.jpg',
    imageAlt:
      'A worker uses VR/AR glasses on a construction site — superimposing digital blueprints onto the physical world. Wayne explains how Cuby\'s mobile micro-factory brings the factory to the job site.',
    story: [
      'Cuby Technologies\' answer is the Mobile Micro-Factory (MMF). Picture this: a complete, software-driven factory packed into standard shipping containers. You truck them to any construction site, unfold them, and within days you have a fully operational factory that can produce building components — walls, floors, roof panels — with surgical precision. No $50 million mega-factory required. No 300-mile truck journey for oversized modules. The factory comes to you.',
      'The MMF is operated by a small team of workers who do not need traditional construction skills. The software handles the complexity; the workers handle the execution. Using augmented reality (AR) headsets, workers see exactly where each component goes, overlaid on the physical world. A carpenter who needs 10 years of experience to read blueprints and measure accurately can now do the same work with a few hours of training, guided by the AR system. The knowledge is in the software, not in the worker\'s head.',
      'The numbers are dramatic. Cuby reduces labor hours by nearly 10x compared to traditional construction. Material waste drops by up to 90% — because the software optimizes cuts and the factory precision eliminates errors. The final construction cost comes in at roughly $100 per square foot, compared to the national average of $150. Most importantly, the quality is consistent and predictable — no more "we will fix it during punch list" because every component is manufactured to exact specifications in a controlled environment.',
    ],
    facts: (
      <>
        <p><strong>Mobile Micro-Factory (MMF):</strong> Complete, software-driven factory packed into standard shipping containers. Deployable anywhere in days.</p>
        <p><strong>Labor reduction:</strong> ~10x fewer labor hours compared to traditional construction. Workers need minimal training — software handles the complexity.</p>
        <p><strong>AR/VR guidance:</strong> Augmented reality headsets show workers exactly where each component goes. No need for years of blueprint-reading experience.</p>
        <p><strong>90% waste reduction:</strong> Software-optimized cuts and factory precision virtually eliminate material waste.</p>
        <p><strong>Cost:</strong> ~$100/sq ft vs. national average of $150/sq ft — a 33% reduction.</p>
        <p><strong>Founded:</strong> 2021 | HQ: USA | R&D: Minsk, Belarus | Total funding: $23.4M | Valuation: $257M (Series B).</p>
        <p><strong>Investors:</strong> Cemex Ventures (global building materials giant), At One Ventures, GOS Capital, Type One Ventures.</p>
      </>
    ),
    lesson: (
      <>
        <p>Cuby\'s key insight is that the problem with construction is not that we lack good ways to build — it is that we have not industrialized the building process itself. The MMF is not a better hammer; it is a fundamentally different way of organizing work. By putting the factory in a container, Cuby makes industrialization portable, affordable, and adaptable to any location.</p>
        <p>The AR-guided workforce model is equally important. Instead of competing for an ever-shrinking pool of skilled labor, Cuby creates a system where technology augments human capability — making a novice worker as productive as an experienced craftsman. This is the opposite of the "replace humans with robots" approach. It is "let software handle the complexity so humans can focus on execution."</p>
      </>
    ),
    lessonTitle: 'The Factory Comes to You',
    tip: 'Ask your child: "What is the difference between a chef and a cook?" A chef creates recipes; a cook follows them. Both produce food. The chef has years of training; a cook can learn in days. Cuby\'s approach is like turning every construction worker into a "cook" — the recipe (the software and AR guidance) does the thinking, so the worker can focus on doing. This is a powerful idea: use technology to eliminate the need for rare specialized skills, making high-quality output accessible with ordinary talent.',
  },
  {
    number: 3,
    tag: 'The Strategy',
    tagColor: 'bg-indigo-100 text-indigo-700',
    title: 'The Machine That Builds the Machine That Builds the House',
    teaser:
      'Cuby does not sell houses. It sells the system that builds houses. Their real product is the Mobile Micro-Factory itself — and their next product will be the factory that builds factories.',
    image: '/images/comics/vr-building/strip-3.jpg',
    imageAlt:
      'Wayne shows Luna a diagram of Cuby\'s strategy — shipping containers arrive at a job site, unfold into a micro-factory, and produce house components on location. The next step: a "Papa Factory" that builds micro-factories.',
    story: [
      'Here is the really clever part of Cuby\'s strategy. The company\'s core philosophy is: "It is all about the machine that builds the machine." Cuby is not a home building company. It is a "home-building-system building" company. Their product is not a house — it is the Mobile Micro-Factory that produces houses. Selling factories is a fundamentally different business from selling houses: higher margins, stronger intellectual property protection, and a recurring revenue model from software updates, maintenance, and consumables.',
      'This "meta-factory" strategy goes one level deeper. Cuby is now planning what they call the "Papa Factory" — a dedicated factory whose sole purpose is to mass-produce Mobile Micro-Factories. Once the Papa Factory is operational, Cuby can scale exponentially: one factory builds many MMFs, and each MMF builds many homes. The Papa Factory transforms Cuby from a construction company into a manufacturing company that produces construction companies. The recursion is deliberate and powerful.',
      'Cuby\'s 10-year vision reflects this ambition: deploy ~275 MMFs worldwide, deliver 200,000 homes, and create 300,000 jobs. The jobs point is crucial — each MMF creates local employment wherever it is deployed. Rather than centralizing production in one location, Cuby distributes manufacturing capability to where it is needed. This is the opposite of globalization; it is "localization at scale." And for a world facing a housing crisis, rising material costs, and a shrinking skilled workforce, this model could not be more timely.',
    ],
    facts: (
      <>
        <p><strong>Core philosophy:</strong> "It is all about the machine that builds the machine." Cuby\'s product is the MMF, not the house.</p>
        <p><strong>Papa Factory:</strong> A dedicated factory to mass-produce Mobile Micro-Factories — enabling exponential scaling. Factory that builds factories that build homes.</p>
        <p><strong>10-year vision:</strong> ~275 MMFs deployed, 200,000 homes delivered, 300,000 jobs created worldwide.</p>
        <p><strong>First US deployments:</strong> Nevada and Detroit — initial MMFs being set up in 2025-2026.</p>
        <p><strong>Business model:</strong> Selling MMF systems (hardware + software) — not per-house revenue. Higher margins, recurring software income, strong IP moat.</p>
        <p><strong>Localization at scale:</strong> Each MMF creates local jobs wherever deployed — distributing manufacturing capability rather than centralizing it.</p>
      </>
    ),
    lesson: (
      <>
        <p>The "machine that builds the machine" philosophy is one of the most elegant business strategies in this entire comic series. Most companies compete in their industry. A few transform their industry. Cuby is building the system that builds the industry. By making the factory itself the product, Cuby achieves leverage that a traditional homebuilder could never match.</p>
        <p>The Papa Factory takes this to the next level. A homebuilder scales by hiring more workers and buying more materials. Cuby scales by building one more factory that produces 10 more MMFs at a time, each of which can produce hundreds of homes per year. This is exponential leverage — the kind of structural advantage that creates category-defining companies. It is the same logic that made Intel valuable (they sell the chips that go inside computers, not the computers themselves) or ARM (they license the architecture that goes inside the chips).</p>
      </>
    ),
    lessonTitle: 'Sell the Means of Production',
    tip: 'Ask your child: "During the Gold Rush, who made more money — the people digging for gold, or the people selling shovels and jeans to the miners?" The answer (the shovel sellers) illustrates a classic business strategy: sell the tool, not the product. Cuby sells the factory (the shovel), not the house (the gold). This is why software companies are often more valuable than the industries they serve — they sell the "machine" that the industry runs on.',
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

function AboutCuby() {
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
          <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-indigo-600 text-sm font-bold">CB</span>
          </div>
          <div>
            <p className="font-bold text-slate-800">About Cuby Technologies</p>
            <p className="text-xs text-slate-400 mt-0.5">Mobile Micro-Factories for decentralized home construction</p>
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
                  <p className="font-semibold text-slate-800 mb-1">What Cuby Does</p>
                  <p>Cuby Technologies builds Mobile Micro-Factories (MMFs) — complete, software-driven construction factories packed into shipping containers. Deployed to any job site, an MMF enables a small team of non-skilled workers to assemble high-quality homes with 10x less labor and 90% less waste.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">The Technology</p>
                  <p>AR/VR-guided assembly with headsets showing workers exactly where each component goes. Software-optimized material cutting eliminates waste. Factory-level precision in a portable container. The system is designed so that software handles complexity and workers focus on execution.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">The Business Model</p>
                  <p>Cuby sells the MMF system (hardware + software license), not individual homes. This creates higher margins, recurring software revenue, and strong IP protection. Future: "Papa Factory" to mass-produce MMFs for exponential scaling.</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-slate-800 mb-1">The Team</p>
                  <p>CEO Aleh Kandrashou (PhD in innovation ecosystems) + COO Aleksandr Gampel (finance, real estate, venture capital background). Combined "deep tech systems thinking" with "real-world industry experience." Founded 2021, $23.4M raised.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">Why It Matters for Kids</p>
                  <p>This story introduces the concept of "meta-manufacturing" — building the machines that build things. Most people think about making products; the most innovative companies think about making the systems that make products. Understanding this "meta" layer — the machine that builds the machine — is a powerful mental model that applies to software, hardware, and even creative work.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">Learn More</p>
                  <p>
                    <a href="https://cuby.eu" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 font-medium">
                      cuby.eu
                    </a>
                    {' '}— company information and technology details.
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

export default function WayneComicVRBuilding() {
  const totalStrips = strips.length;
  return (
    <>
      <SEOHead
        title="Startup Stories #13: Cuby Technologies — Mobile Micro-Factories for Home Construction | Wayne's Comics"
        description="A parent-child comic series about real startups. Episode 13: Cuby Technologies — the company putting software-driven micro-factories in shipping containers, bringing factory precision to any construction site with 90% less waste."
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
          <img src="/images/comics/vr-building/cover.jpg" alt="Startup Stories #13: Cuby Technologies — mobile micro-factories for home construction" className="w-full h-auto" />
        </div>
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-bold rounded-full uppercase tracking-wide">
            Startup Stories · Episode 13 of 25
          </span>
          <span className="text-xs text-slate-400">June 2026 · {totalStrips} strips · 🇺🇸 United States</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3 leading-tight">
          The Machine That Builds the Machine That Builds the House
        </h1>
        <p className="text-slate-500 leading-relaxed mb-5 max-w-2xl">
          Construction productivity has been flat for 50 years. Skilled labor is disappearing. 
          Material waste hits 30%. Cuby Technologies\' answer: a software-driven micro-factory 
          packed in a shipping container that can be deployed anywhere, turning a small team of 
          non-skilled workers into precision home builders. Episode 13 of 25.
        </p>
        <ShareBar
          title="Startup Stories #13: Cuby Technologies — The Machine That Builds the Machine"
          summary="A 3-strip parent-child comic about Cuby Technologies — putting mobile micro-factories in shipping containers to revolutionize home construction."
        />
      </motion.div>

      <div className="space-y-6 mb-10">
        {strips.map((strip, i) => (
          <motion.div key={strip.number} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.1 + i * 0.07 }}>
            <StripCard strip={strip} total={totalStrips} />
          </motion.div>
        ))}
      </div>

      <AboutCuby />

      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.4 }}
        className="flex items-center justify-between py-6 border-t border-slate-200 mb-10"
      >
        <Link to="/wayne/comics" className="text-sm text-slate-400 hover:text-slate-700 transition-colors">
          ← All Comics
        </Link>
        <ShareBar title="Startup Stories #13: Cuby Technologies" summary="A parent-child comic about mobile micro-factories that bring factory precision to any construction site." />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.45 }}
        className="bg-indigo-600 rounded-2xl px-8 py-10 text-center text-white"
      >
        <h2 className="text-xl font-bold mb-2">More startup stories coming</h2>
        <p className="text-indigo-100 text-sm mb-6 max-w-md mx-auto">
          This is Episode 13 of 25. Each story is about a real company solving a real problem — told in a way that makes sense to a 15-year-old, with analysis for the parent reading along.
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
