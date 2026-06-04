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
    title: 'The 19th-Century Engine Powering 21st-Century Cities',
    teaser:
      'Every skyscraper you see was built with a diesel generator. The construction industry has not meaningfully updated its primary energy infrastructure in over a century.',
    image: '/images/comics/ampd/strip-1.jpg',
    imageAlt: 'Luna and Wayne at a noisy construction site running on diesel generators',
    story: [
      'There is a profound irony at the heart of modern construction: the buildings designed to be net-zero and carbon-neutral are being built with diesel generators, one of the most polluting energy sources still in widespread commercial use. The construction industry accounts for nearly 40% of global carbon emissions, with 500 million tonnes annually attributed to construction activities — the majority from fossil fuel combustion.',
      'A single diesel generator produces approximately 100 tonnes of CO2 per year — equivalent to 22 gasoline cars running continuously. But the full cost of diesel goes far beyond the carbon: NOx and particulate matter emissions create chronic health risks for on-site workers; noise at 32 times the level of cleaner alternatives forces urban projects to halt during evening hours, extending timelines and budgets; diesel storage creates persistent fire and spill liability; and the rising cost of regulatory compliance adds further pressure to project economics.',
      'The reason this has persisted is structural: construction is a highly fragmented, risk-averse industry where procurement decisions are made project-by-project, liability exposure is high, and the incentive to adopt new technology is systematically underweighted against the risk of adoption. The "hidden costs" of diesel — health externalities, noise-related delays, insurance surcharges — do not appear on the fuel invoice, making the status quo look cheaper than it actually is.',
    ],
    facts: (
      <>
        <p><strong>Construction = 40% of global carbon emissions.</strong> Of this, construction activities alone generate 500M tonnes of CO2/year.</p>
        <p><strong>One diesel generator = 100 tonnes CO2/year</strong> — equivalent to 22 cars running non-stop for a year.</p>
        <p><strong>32x noise difference:</strong> a diesel generator vs the Enertainer, measured in decibels. This is the difference between "work must stop at 10pm" and "work can continue through the night in urban zones."</p>
        <p><strong>Global diesel generator market: $20B/year.</strong> Construction segment alone: $5.5B+. All of it in the early stages of regulatory-forced replacement.</p>
        <p><strong>Externalized costs not on the invoice:</strong> NOx/PM health impact on workers (long-term respiratory), project delay costs from noise curfews, diesel storage insurance and compliance, fire/spill liability management.</p>
      </>
    ),
    lesson: (
      <>
        <p>Construction is a textbook case of a market where the true cost of the incumbent technology is systematically understated because most of the negative externalities — health damage, environmental harm, noise-related schedule impacts — are not borne by the entity making the purchase decision.</p>
        <p>When the cost structure is distorted this way, incumbents persist far longer than they should. The corrective mechanism is usually regulation: when governments force the externalized costs back onto the decision-maker (through emissions standards, noise ordinances, or outright bans), the economics of alternatives change overnight.</p>
      </>
    ),
    lessonTitle: 'Hidden Costs and the Persistence of Bad Technology',
    tip: 'Next time you walk past a construction site with your child, use the diesel generator as a teaching tool for externalities: "Who pays for the smoke? Who pays for the noise? Is it the construction company — or everyone around them?" This is a core economics concept kids can feel directly.',
  },
  {
    number: 2,
    tag: 'The Pivot',
    tagColor: 'bg-amber-100 text-amber-700',
    title: 'The Startup That Found Its Problem After Its Product',
    teaser:
      "Ampd Energy's founding story is a masterclass in the power of accumulated capability over committed product vision — and why being an outsider in a traditional industry can be a strategic asset.",
    image: '/images/comics/ampd/strip-2.jpg',
    imageAlt: 'Luna and Wayne discover the Enertainer and how Ampd Energy found its real problem',
    story: [
      'Brandon Ng co-founded Ampd Energy in 2014 after completing a chemical engineering degree at Imperial College London. His early career detour through Barclays Capital was brief — he left to pursue what he was actually interested in: the emerging battery storage market. The company\'s early years, however, were a series of commercial failures. Electric motorcycles: not viable. Power stability solutions for developing markets: not deployable at scale.',
      'What Ng and his team accumulated during this period was not a product — it was expertise: deep knowledge of lithium-ion battery systems, thermal management, power electronics, and energy management software. That expertise was the real asset. The "right problem" had not yet presented itself.',
      'In 2018, Gammon Construction — one of Hong Kong\'s leading builders — approached Ampd asking whether their battery technology could replace diesel generators on construction sites. This single conversation was the clarifying moment. Ng\'s outsider status became an advantage: he had no construction industry assumptions to overcome. He could analyze the problem from first principles — what is the actual power profile of a modern construction site? What does reliability actually require? How do you make adoption frictionless for a risk-averse procurement culture? The answer became the Enertainer: 2-hour installation, plug-and-play replacement, zero special training required.',
    ],
    facts: (
      <>
        <p><strong>Enertainer specs:</strong> 7.3 tonnes, 2.6m height, 30,000 lithium-ion cells, 2-hour installation, designed for outdoor/harsh environments.</p>
        <p><strong>Gammon Construction co-development model:</strong> ~2 years of joint development with a real customer as the test environment, ensuring product-market fit before broad commercialization.</p>
        <p><strong>First customer verdict:</strong> "The Enertainer worked perfectly from day one" — Andy Wong, Head of Digital, Gammon Construction.</p>
        <p><strong>Verified project results:</strong> CDL Singapore — 70,000L diesel saved in 9 months, 27% OPEX reduction. Laing O'Rourke London — 70% OPEX reduction. Sydney project — AUD$48,000 saved per month.</p>
      </>
    ),
    lesson: (
      <>
        <p>The Ampd pivot story challenges the common startup narrative of "build something and find customers." Ampd built capability, then let the right problem find them. This is particularly common in deep-tech hardware, where the technical insight is the moat and the application is the vehicle.</p>
        <p>The co-development model with Gammon also deserves attention as a risk-mitigation strategy: rather than building a product and hoping it fits the customer's workflow, Ampd embedded the customer in the development process. This turns a potential buyer into a co-designer — and the first sale into a validation, not a bet.</p>
      </>
    ),
    lessonTitle: 'Capability-First vs. Product-First Founding',
    tip: 'The Ampd story is useful for children who want to "invent something." Redirect the question from "what do I want to build?" to "what am I learning to do really well?" and then "what problem might need exactly that skill in the future?" Building capability before committing to an application is a more durable strategy than most kids — and most adults — are taught.',
  },
  {
    number: 3,
    tag: 'The Innovation',
    tagColor: 'bg-indigo-100 text-indigo-700',
    title: 'Software-Defined Hardware and the Lithium Price Crisis',
    teaser:
      'When lithium prices rose 360% in 12 months, most hardware companies would have faced an existential cost crisis. The way Ampd responded revealed their actual competitive moat.',
    image: '/images/comics/ampd/strip-3.jpg',
    imageAlt: 'Wayne and Luna discuss the Enernet platform and the lithium price challenge that software solved',
    story: [
      'Every Enertainer is connected to Enernet, Ampd\'s proprietary IoT platform. Enernet provides 24/7 real-time remote monitoring, fault diagnostics, over-the-air software updates, automated ESG reporting (energy consumption, fuel savings, carbon reduction calculations), and equipment utilization analytics — tracking crane usage patterns, identifying scheduling inefficiencies, and generating actionable insights for project managers.',
      'This software layer is not a feature add-on — it is the core value proposition for enterprise buyers. Construction companies increasingly need auditable ESG data for regulatory compliance, investor reporting, and tender qualifications. Enernet generates that data automatically, as a byproduct of the system\'s normal operation. The hardware provides the energy; the software provides the intelligence and the compliance documentation.',
      'The crisis test came in 2022, when the global EV boom drove lithium carbonate prices up 360% in 12 months. For a company whose product is built from lithium-ion cells, this was potentially fatal. Ampd\'s response demonstrated the strategic depth of their software investment: engineers optimized the Enernet energy management algorithms to reduce the number of battery cells required per unit by 40% without any reduction in output performance. A software solution to a hardware cost problem. This is the defining characteristic of "software-defined hardware" — products that can be improved post-manufacture through algorithmic optimization rather than physical redesign.',
    ],
    facts: (
      <>
        <p><strong>Enernet platform capabilities:</strong> 24/7 real-time remote monitoring, OTA software updates (like Tesla), automated ESG report generation, crane/equipment utilization analytics, fault prediction and remote diagnostics.</p>
        <p><strong>System performance:</strong> 99.8%+ uptime, ~700 work hours saved per project (vs diesel maintenance requirements), near-zero on-site service needs.</p>
        <p><strong>The lithium crisis:</strong> Lithium carbonate prices rose 360% in 12 months (2022). Ampd\'s algorithmic response reduced battery cell count per unit by 40% with no performance loss.</p>
        <p><strong>The OTA analogy:</strong> Tesla vehicles improve via software updates after sale. Enertainers deployed 3 years ago now run software written last month. This changes the product lifecycle economics fundamentally.</p>
      </>
    ),
    lesson: (
      <>
        <p>Hardware is visible; software is defensible. Any company can look at Ampd\'s hardware and attempt to copy the battery configuration. Replicating the Enernet platform — the energy management algorithms, the fault prediction models, the operational data accumulated across hundreds of deployments — requires years of field experience that cannot be purchased.</p>
        <p>The lithium crisis also demonstrates why software-defined products are structurally more resilient than purely hardware-dependent businesses. When input costs spike, a software optimization can partially substitute for physical materials. That optionality is only available to companies that built the software layer in the first place.</p>
      </>
    ),
    lessonTitle: 'The Defensibility of Software-Defined Products',
    tip: 'The concept of a product that improves after purchase is increasingly common and worth exploring with children — phones, cars, smart appliances. Ask: "What does it mean to own something that keeps getting better over time? Who benefits? Are there risks?" The OTA update model raises interesting questions about ownership, dependency, and what "finished" means for a product.',
  },
  {
    number: 4,
    tag: 'The Opportunity',
    tagColor: 'bg-emerald-100 text-emerald-700',
    title: 'Regulation as a Tailwind: When Policy Becomes a Product Roadmap',
    teaser:
      'Oslo has already mandated zero-emission construction. London is banning diesel by 2035. California has restricted new small engine sales. For Ampd Energy, government regulation is not a risk to manage — it is the primary demand driver.',
    image: '/images/comics/ampd/strip-4.jpg',
    imageAlt: 'Wayne and Luna see future cities where regulation is driving clean construction at scale',
    story: [
      'The transition from early-adopter sales to mainstream adoption in industrial markets rarely happens through product excellence alone. It typically requires a regulatory forcing function — a mandate that removes the option of staying with the incumbent technology. Ampd Energy is now operating in exactly this environment.',
      'Oslo is currently the world\'s first city with an enforced zero-emission construction mandate. London has committed to eliminating most diesel construction equipment by 2035. California has banned new small off-road engine (SORE) purchases, with broader restrictions expected. Delhi activates temporary diesel generator bans under its Graded Response Action Plan when air quality deteriorates. Each of these policies converts previously voluntary sustainability decisions into compliance requirements — and compliance requirements are, for B2B sales, among the most powerful purchase drivers that exist.',
      'Ampd\'s $27.3M Series B in late 2024 (oversubscribed) funds geographic expansion into UAE, US, Middle East, Europe, and Southeast Asia — markets where the regulatory trajectory is directionally similar even if the timeline differs. The 2025 expansion into mining and manufacturing applies the same playbook: an industry dependent on diesel in remote or industrial environments, facing increasing ESG pressure and impending regulatory change, with no proven clean alternative at scale. Ampd enters with a validated product and a repeatable go-to-market model.',
    ],
    facts: (
      <>
        <p><strong>Current mandates:</strong> Oslo — zero-emission construction (enforced now). London — diesel equipment ban by 2035. California — SORE new purchase ban (effective). Delhi — GRAP diesel restrictions on air quality alert days.</p>
        <p><strong>Series B:</strong> $27.3M, oversubscribed, closed late 2024. Current markets: Hong Kong, Singapore, Australia, UK. Expansion: UAE, US, Middle East, Europe, Southeast Asia.</p>
        <p><strong>2025 expansion:</strong> Mining and manufacturing — both share the same dependency on diesel in harsh/remote environments, the same ESG pressure, and the same absence of a proven clean alternative at scale.</p>
        <p><strong>Market size:</strong> Global diesel generator replacement opportunity: $20B/year. Construction alone: $5.5B+. Mining and manufacturing add significantly to the addressable market.</p>
      </>
    ),
    lesson: (
      <>
        <p>The most durable competitive position in a regulated industry is to be the product that makes compliance easy. Ampd does not sell "lower emissions" as a sustainability benefit — it sells "continued access to Oslo, London, and California job sites" as a business necessity. That reframe changes the buyer psychology entirely: from optional improvement to mandatory infrastructure.</p>
        <p>This is the "compliance license" sales model, and it is one of the most powerful go-to-market strategies available to clean technology companies. The regulatory tailwind does not just create demand — it eliminates the alternative, making the purchasing decision binary rather than comparative.</p>
      </>
    ),
    lessonTitle: 'Selling the Compliance License',
    tip: 'Environmental regulations creating economic opportunities is a concept most children have not been exposed to. Use this story to explain that "green businesses" are not charity — when governments set environmental rules, they create markets, and the companies that prepared early for those rules gain a structural advantage. Ask your child: "Can you think of a rule that was once unpopular that ended up creating new kinds of businesses?"',
  },
];

function StripCard({ strip }: { strip: typeof strips[0] }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div layout className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
      <div className="overflow-hidden">
        <img src={strip.image} alt={strip.imageAlt} className="w-full h-auto" />
      </div>
      <div className="px-6 pt-5 pb-4">
        <div className="flex items-center gap-2 mb-3">
          <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${strip.tagColor}`}>{strip.tag}</span>
          <span className="text-xs text-slate-400">Strip {strip.number} of 4</span>
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-3">{strip.title}</h2>
        <p className="text-sm text-slate-600 leading-relaxed">{strip.teaser}</p>
      </div>
      <button
        onClick={() => setOpen(v => !v)}
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

function AboutAmpd() {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.35 }}
      className="bg-white border border-slate-200 rounded-2xl overflow-hidden mb-10"
    >
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between px-6 py-5 hover:bg-slate-50 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-indigo-600 text-sm font-bold">AE</span>
          </div>
          <div>
            <p className="font-bold text-slate-800">About Ampd Energy</p>
            <p className="text-xs text-slate-400 mt-0.5">The Enertainer, Enernet, and the clean construction thesis</p>
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
                  <p className="font-semibold text-slate-800 mb-1">What Ampd Energy Does</p>
                  <p>Ampd Energy makes the Enertainer — a containerized battery storage system that replaces diesel generators on construction sites. It delivers the same power output with 85–95% lower CO2 emissions, near-zero noise, no exhaust, and significantly lower operating costs.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">The Enertainer</p>
                  <p>A 7.3-tonne, 2.6m white shipping container holding 30,000 lithium-ion cells. Installs in 2 hours as a plug-and-play diesel replacement. Designed for the harsh, space-constrained conditions of active construction sites. 99.8%+ uptime.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">The Enernet Platform</p>
                  <p>The IoT software layer that makes every Enertainer a "smart" device: real-time monitoring, OTA updates, automated ESG reporting, equipment utilization analytics, fault prediction. The platform is the competitive moat — not the battery cells.</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-slate-800 mb-1">The Founding Story</p>
                  <p>Brandon Ng (chemical engineering, Imperial College London) and Luca Valente founded Ampd in Hong Kong in 2014. After failed attempts at electric motorcycles and rural power solutions, a 2018 inquiry from Gammon Construction led to a 2-year co-development process and the Enertainer's launch.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">Why It Matters for Kids</p>
                  <p>The construction sites children walk past every day are among the most polluting environments in the city. Ampd Energy is proof that "boring" infrastructure problems — power on a work site — can be the foundation of an important and growing business.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">Learn More</p>
                  <p>
                    <a href="https://www.ampd.energy" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 font-medium">
                      ampd.energy
                    </a>
                    {' '}— the company's product documentation and case studies.
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

export default function WayneComicAmpd() {
  return (
    <>
      <SEOHead
        title="Startup Stories #4: Ampd Energy — The Giant Battery That Silenced Construction Sites | Wayne's Comics"
        description="A parent-child comic series about real startups. Episode 4: Ampd Energy — replacing diesel generators on construction sites with the Enertainer, a smart battery system that is cleaner, quieter, and cheaper to run."
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
          <img src="/images/comics/ampd/cover.jpg" alt="Ampd Energy Enertainer cover" className="w-full h-auto" />
        </div>
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-bold rounded-full uppercase tracking-wide">
            Startup Stories · Episode 4 of 25
          </span>
          <span className="text-xs text-slate-400">June 2026 · 4 strips</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3 leading-tight">
          The Giant Battery That Silenced Construction Sites
        </h1>
        <p className="text-slate-500 leading-relaxed mb-5 max-w-2xl">
          Ampd Energy replaced the diesel generator — a 150-year-old technology — with a smart, connected battery system. Four strips on the hidden costs of diesel, the pivot that found the right problem, the software layer that survived a commodity crisis, and the regulatory tailwind turning this from a niche product into infrastructure.
        </p>
        <ShareBar
          title="Startup Stories #4: Ampd Energy — The Giant Battery"
          summary="4-strip parent-child comic on the Hong Kong startup replacing diesel generators on construction sites."
        />
      </motion.div>

      <div className="space-y-6 mb-10">
        {strips.map((strip, i) => (
          <motion.div key={strip.number} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.1 + i * 0.07 }}>
            <StripCard strip={strip} />
          </motion.div>
        ))}
      </div>

      <AboutAmpd />

      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.4 }}
        className="flex items-center justify-between py-6 border-t border-slate-200 mb-10"
      >
        <Link to="/wayne/comics" className="text-sm text-slate-400 hover:text-slate-700 transition-colors">
          ← All Comics
        </Link>
        <ShareBar title="Startup Stories #4: Ampd Energy" summary="The Hong Kong startup replacing diesel generators with a smart battery — the Enertainer." />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.45 }}
        className="bg-indigo-600 rounded-2xl px-8 py-10 text-center text-white"
      >
        <h2 className="text-xl font-bold mb-2">More startup stories coming</h2>
        <p className="text-indigo-100 text-sm mb-6 max-w-md mx-auto">
          This is Episode 4 of 25. Each story is about a real company solving a real problem — told with the story behind it and lessons for the parent reading along.
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
