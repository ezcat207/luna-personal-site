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
    title: 'Our Oceans Are Running Out of Fish',
    teaser:
      'Global seafood demand will rise 50% by 2050, but only 7% of fisheries are sustainable. Overfishing, disease in aquaculture, and climate change are collapsing the ocean\'s protein supply.',
    image: '/images/comics/umami-seafood/strip-1.jpg',
    imageAlt:
      'Luna and Wayne watch a documentary about overfishing — empty nets, depleted oceans, and fishing boats returning with nothing. Luna looks worried as she realizes the ocean cannot keep feeding us at this rate.',
    story: [
      'The global seafood market is a paradox. On one side, demand is exploding — the world will need 50% more seafood by 2050 as populations grow and middle classes expand. On the other side, the ocean is running out. Only 7% of global fisheries are considered sustainable. The rest are overfished, depleted, or collapsing. Meanwhile, aquaculture (fish farming) has its own problems: disease outbreaks can wipe out entire farms in weeks, pollution from fish waste damages coastal ecosystems, and climate change is making ocean conditions more unpredictable.',
      'For decades, the seafood industry has operated on a simple premise: take fish from the ocean, process them, sell them. That model is breaking. The supply side — wild fish stocks and even farmed fish — can no longer keep up with demand in a sustainable way. The infrastructure of processing, distribution, and retail is fine. The bottleneck is the raw material itself.',
      'This is where most people see a dead end. But for UMAMI Bioworks founder Mihir Pershad, this was a design problem. He looked at the seafood industry and saw not a resource crisis, but an engineering challenge: how do you produce the same protein without depending on a fragile, unpredictable ocean? His answer: don\'t catch fish. Grow them.',
    ],
    facts: (
      <>
        <p><strong>50% demand increase</strong> by 2050 — global population growth and rising middle class are driving unsustainable pressure on seafood supply.</p>
        <p><strong>Only 7%</strong> of global fisheries are sustainable. The vast majority are overfished or at capacity.</p>
        <p><strong>Aquaculture disease outbreaks</strong> can destroy entire fish farms in weeks — a single virus in a shrimp farm can wipe out months of production and millions of dollars.</p>
        <p><strong>Climate change</strong> makes ocean conditions unpredictable — warming waters, acidification, and changing currents disrupt both wild fish populations and farmed fish health.</p>
        <p><strong>The infrastructure is fine</strong> — the global seafood processing, distribution, and retail network is mature and efficient. The bottleneck is raw material supply.</p>
      </>
    ),
    lesson: (
      <>
        <p>The seafood crisis is what engineers call a "supply-side constraint." The demand exists, the distribution exists, but the raw material is running out. These are often the most valuable problems to solve because the entire value chain is already built and waiting — it just needs a new source of input.</p>
        <p>Pershad saw this clearly: instead of building a new seafood brand from scratch (competing with giants), he asked "how do I feed the existing system?" This is a classic strategic insight — look for the bottleneck in a system, not the opportunity to build a parallel system.</p>
      </>
    ),
    lessonTitle: 'Feed the System, Don\'t Replace It',
    tip: 'Ask your child: "If all the grocery stores were still open but the farms stopped growing food, what would happen?" The answer reveals the concept of supply chain bottlenecks. UMAMI\'s insight was that the seafood industry had plenty of stores and trucks and freezers — but was running out of fish. The most valuable thing they could build was not a new store — it was a new source of fish. This teaches kids to look for the weakest link in a chain, not just the most visible opportunity.',
  },
  {
    number: 2,
    tag: 'The Solution',
    tagColor: 'bg-amber-100 text-amber-700',
    title: 'Growing Real Fish Meat Without the Fish',
    teaser:
      'UMAMI Bioworks grows real fish cells in a lab — not plant-based imitation seafood, but actual fish tissue cultivated from cells, with a fraction of the environmental cost.',
    image: '/images/comics/umami-seafood/strip-2.jpg',
    imageAlt:
      'Wayne shows Luna a lab where fish cells are being grown in bioreactors — stainless steel tanks with nutrient solutions, producing real fish meat without catching or farming any fish.',
    story: [
      'UMAMI Bioworks, founded in Singapore in 2020 by Mihir Pershad, is not making plant-based imitation seafood. They are growing real fish tissue — actual fish cells — cultivated in bioreactors. The process starts with a small sample of cells from a living fish (a one-time collection that does not harm the fish). These cells are then fed a nutrient-rich solution in a sterile, controlled environment. Over weeks, the cells multiply into edible fish tissue — the same cellular composition as wild-caught fish, without the mercury, microplastics, parasites, or environmental damage.',
      'But the real innovation is not the biology — it is the platform. UMAMI built "CultivateOS," an automated biomanufacturing platform that uses machine learning to optimize cell growth conditions. The platform monitors thousands of data points — temperature, pH, nutrient levels, cell density — and adjusts conditions in real time to maximize yield and quality. This is not a science experiment. It is a software-controlled manufacturing process designed for industrial scale.',
      'Pershad\'s background is revealing. He studied biochemistry but found academic research too slow. He spent four years at a venture studio building business models for aquaculture technology companies — developing disease diagnostics and management tools for fish farms. He saw firsthand how disease could destroy a farm in weeks and how fragile open-water aquaculture truly was. His conclusion: incremental improvements to fishing and farming would never be enough. The industry needed radical change — a closed-loop, automated, predictable biomanufacturing system that did not depend on the ocean at all.',
    ],
    facts: (
      <>
        <p><strong>UMAMI Bioworks:</strong> Founded 2020 in Singapore by Mihir Pershad. Formerly called UMAMI Meats.</p>
        <p><strong>CultivateOS:</strong> Their core platform — an AI-powered, automated biomanufacturing system that grows fish cells at industrial scale. ML monitors thousands of data points to optimize growth.</p>
        <p><strong>Real fish tissue, not imitation:</strong> Grown from actual fish cells — same cellular composition as wild-caught fish. Not a plant-based alternative.</p>
        <p><strong>No mercury, microplastics, or parasites:</strong> Cultivated in a sterile, controlled environment — free from the contaminants found in wild-caught and even farmed fish.</p>
        <p><strong>"Intel Inside" model:</strong> UMAMI licenses its platform to food companies rather than selling its own branded products. They are a technology provider, not a consumer brand.</p>
        <p><strong>Founder background:</strong> Pershad spent 4 years at a venture studio building fish farm disease management tools before starting UMAMI. He saw the fragility of aquaculture firsthand.</p>
      </>
    ),
    lesson: (
      <>
        <p>UMAMI\'s "Intel Inside" model is a masterclass in choosing your position in the value chain. Most startups want to be the consumer brand — the recognizable name on the package. But being the invisible technology inside someone else\'s product has huge advantages: no consumer marketing costs, no retail relationships to build, and the ability to work with every player in the industry simultaneously (since you are a supplier, not a competitor).</p>
        <p>This is a counterintuitive but powerful strategy. When you are a component supplier rather than a finished-product company, you win when your customers win. Your incentive is perfectly aligned with theirs. For a deep technology like cell-cultivated seafood, this alignment is critical — the existing industry giants have the factories, the distribution, and the customers. You just need to give them a better raw material.</p>
      </>
    ),
    lessonTitle: 'Be the Engine, Not the Car',
    tip: 'Ask your child: "Which company do you think makes more money — the company that makes a computer\'s processor (Intel) or the company that puts the computer in a box and sells it (Dell)?" The surprising answer is often Intel. Being the "inside" component can be more profitable and less risky than being the "outside" brand. This teaches kids about thinking strategically about where to position themselves in a value chain — sometimes the invisible but essential role is the best one.',
  },
  {
    number: 3,
    tag: 'The Strategy',
    tagColor: 'bg-indigo-100 text-indigo-700',
    title: 'Pet Food, Supplements, and Caviar — the Unlikely Path to Mass Market',
    teaser:
      'Instead of going straight for the fish counter, UMAMI launches with cat food, omega-3 supplements, and lab-grown caviar — each a deliberate stepping stone toward affordable fish for everyone.',
    image: '/images/comics/umami-seafood/strip-3.jpg',
    imageAlt:
      'Wayne explains UMAMI\'s three-pronged go-to-market strategy to Luna: first pet food (easy regulations), then supplements (small biomass needed), then luxury caviar (high profit margin), eventually mass-market fish fillets.',
    story: [
      'Most people assume that a cell-cultivated seafood company would try to sell fish fillets to grocery stores first. UMAMI did the opposite. They designed a three-phase market entry strategy that prioritizes regulatory speed, capital efficiency, and revenue generation over marketing splash.',
      'Phase 1: Pet food. UMAMI partnered with Friends & Family Pet Food Co. to develop cell-cultured fish cat food for markets in Singapore, the UK, and the EU. The EU alone has nearly 90 million pet-owning households. More importantly, the regulatory pathway for animal feed is far simpler and faster than for human food. This lets UMAMI bring product to market quickly, validate their production process, and generate early revenue — all while the regulatory framework for human consumption catches up.',
      'Phase 2: Nutritional supplements. UMAMI launched "Marine Radiance" — a line of cell-cultured omega-3 fatty acids and collagen. The global supplements market exceeds $700 billion. Traditional sources like krill oil face their own ecological and supply bottlenecks. Critically, supplements require much less biomass than fish fillets — UMAMI can produce them in smaller, cheaper bioreactors, bypassing the need for massive capital expenditure upfront.',
      'Phase 3: Luxury caviar. Cell-cultured caviar commands a premium price that makes even small-scale, high-cost production profitable. This is not just a revenue stream — it is a strategic proof point. By selling a luxury product at a premium, UMAMI demonstrates commercial viability to future B2B licensees while funding their path to mass-market scale.',
      'Each phase de-risks the next. Pet food proves the production process. Supplements prove the unit economics. Caviar proves the premium market. Together, they build toward the ultimate goal: affordable, cell-cultured fish fillets for the global mass market.',
    ],
    facts: (
      <>
        <p><strong>Three-phase strategy:</strong> Pet food → Nutritional supplements → Luxury caviar → Mass market fish fillets. Each phase de-risks the next.</p>
        <p><strong>Pet food first:</strong> EU has 90M pet-owning households. Animal feed regulations are much simpler than human food regulations — faster time to market.</p>
        <p><strong>Marine Radiance supplements:</strong> Omega-3 and collagen from cell culture. Supplements market is $700B+. Smaller bioreactors needed = lower capital requirements.</p>
        <p><strong>Luxury caviar:</strong> High unit price makes small-scale production profitable. Acts as both revenue source and proof of commercial viability for future licensees.</p>
        <p><strong>Singapore\'s "30 by 30" policy:</strong> Singapore aims to produce 30% of its food domestically by 2030. UMAMI aligns perfectly with this national strategy, gaining government support and regulatory tailwinds.</p>
        <p><strong>B2B licensing model:</strong> UMAMI does not sell fish directly. They license CultivateOS to food companies — collecting royalties on every pound of fish their partners produce.</p>
      </>
    ),
    lesson: (
      <>
        <p>UMAMI\'s go-to-market strategy is a textbook example of "beachhead sequencing." Most deep-tech startups fail not because their technology does not work, but because they try to sell to the mass market too early, before they have driven costs down and proven their production system at scale.</p>
        <p>UMAMI\'s insight: start with the easiest regulation (pet food), then the lowest-volume premium product (supplements), then the highest-margin luxury item (caviar), and only then — having de-risked every dimension of the business — go for the mass market. Each step funds and enables the next. This is patient, strategic thinking that dramatically improves the odds of success.</p>
      </>
    ),
    lessonTitle: 'Start Where the Rules Are Easiest',
    tip: 'Ask your child: "If you wanted to start a lemonade stand but could not sell lemonade directly to people yet, where would you start?" Maybe sell lemonade to your friend who runs a hot dog stand first (business-to-business), or sell a lemonade-flavored treat for pets (easier rules). The idea is that you do not have to start with the hardest customer. Find the easiest door to open first, and use that success to open the next door. This is a life skill, not just a business strategy.',
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

function AboutUmami() {
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
          <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-amber-600 text-sm font-bold">UM</span>
          </div>
          <div>
            <p className="font-bold text-slate-800">About UMAMI Bioworks</p>
            <p className="text-xs text-slate-400 mt-0.5">The "Intel Inside" of cell-cultivated seafood</p>
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
                  <p className="font-semibold text-slate-800 mb-1">What UMAMI Does</p>
                  <p>UMAMI Bioworks grows real fish tissue from cells in bioreactors — not plant-based imitation seafood, but actual fish meat cultivated at industrial scale. Their CultivateOS platform uses AI to optimize cell growth, creating a predictable, sustainable supply of seafood without overfishing or aquaculture pollution.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">The Technology</p>
                  <p>CultivateOS is an automated biomanufacturing platform powered by machine learning. It monitors thousands of data points (temperature, pH, nutrients, cell density) and adjusts conditions in real time to maximize yield. It is a software-controlled manufacturing process, not a lab experiment.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">The Business Model</p>
                  <p>"Intel Inside" for seafood — UMAMI licenses its platform to food companies rather than selling its own branded products. Royalties on every pound of fish produced by partners. Capital-efficient: partners build the factories, UMAMI provides the technology.</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-slate-800 mb-1">The Founder</p>
                  <p>Mihir Pershad — biochemistry background, spent 4 years at venture studio Early Charm Ventures building business models for aquaculture tech companies. He saw the fragility of fish farming firsthand — disease outbreaks, environmental shocks, systemic vulnerability — and concluded the industry needed radical change, not incremental improvement.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">Why It Matters for Kids</p>
                  <p>This story teaches "systems thinking" — the ability to look at a complex problem (overfishing) and see where the real bottleneck is (raw material supply, not distribution). It also teaches the power of a counterintuitive strategy: instead of becoming a competitor, become an enabler. Instead of starting with the hardest market, start with the easiest. These are thinking frameworks that apply far beyond business — they are useful for any complex problem.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">Learn More</p>
                  <p>
                    <a href="https://umamibioworks.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 font-medium">
                      umamibioworks.com
                    </a>
                    {' '}— company information and technology.
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

export default function WayneComicUmamiSeafood() {
  const totalStrips = strips.length;
  return (
    <>
      <SEOHead
        title="Startup Stories #17: UMAMI Bioworks — Growing Real Fish Meat Without the Fish | Wayne's Comics"
        description="A parent-child comic series about real startups. Episode 17: UMAMI Bioworks — a Singapore-based company growing real fish cells in bioreactors, using an 'Intel Inside' model to license their AI-powered CultivateOS platform to food companies."
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
          <img src="/images/comics/umami-seafood/cover.jpg" alt="Startup Stories #17: UMAMI Bioworks — cell-cultivated seafood grown in bioreactors" className="w-full h-auto" />
        </div>
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-bold rounded-full uppercase tracking-wide">
            Startup Stories · Episode 17 of 25
          </span>
          <span className="text-xs text-slate-400">June 2026 · {totalStrips} strips · 🇸🇬 Singapore</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3 leading-tight">
          Growing Real Fish Meat Without the Fish
        </h1>
        <p className="text-slate-500 leading-relaxed mb-5 max-w-2xl">
          Only 7% of fisheries are sustainable. Demand will rise 50% by 2050. UMAMI Bioworks 
          grows real fish cells in AI-powered bioreactors — not plant-based imitation, but actual 
          fish tissue — and licenses their platform to food companies rather than competing 
          with them. Episode 17 of 25.
        </p>
        <ShareBar
          title="Startup Stories #17: UMAMI Bioworks — Cell-Cultivated Seafood"
          summary="A 3-strip parent-child comic about UMAMI Bioworks — growing real fish meat from cells in AI-powered bioreactors, using an Intel Inside licensing model."
        />
      </motion.div>

      <div className="space-y-6 mb-10">
        {strips.map((strip, i) => (
          <motion.div key={strip.number} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.1 + i * 0.07 }}>
            <StripCard strip={strip} total={totalStrips} />
          </motion.div>
        ))}
      </div>

      <AboutUmami />

      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.4 }}
        className="flex items-center justify-between py-6 border-t border-slate-200 mb-10"
      >
        <Link to="/wayne/comics" className="text-sm text-slate-400 hover:text-slate-700 transition-colors">
          ← All Comics
        </Link>
        <ShareBar title="Startup Stories #17: UMAMI Bioworks" summary="A parent-child comic about growing real fish meat from cells — cheaper, cleaner, and without overfishing." />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.45 }}
        className="bg-indigo-600 rounded-2xl px-8 py-10 text-center text-white"
      >
        <h2 className="text-xl font-bold mb-2">More startup stories coming</h2>
        <p className="text-indigo-100 text-sm mb-6 max-w-md mx-auto">
          This is Episode 17 of 25. Each story is about a real company solving a real problem — told in a way that makes sense to a 15-year-old, with analysis for the parent reading along.
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
