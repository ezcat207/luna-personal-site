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
    title: 'The Filter That Keeps Clogging — and the Factory That Learned to Hate Its Water Bill',
    teaser:
      'Every factory generates wastewater full of fats, oils, and proteins. Traditional filters clog within hours, forcing factories to use corrosive chemicals, high-pressure pumps, and expensive replacements. The result: most factories dump their wastewater and buy fresh water — a linear, wasteful, expensive cycle.',
    image: '/images/comics/zwitterco/strip-1.jpg',
    imageAlt:
      'A factory manager shows Luna and Wayne a clogged filtration membrane covered in greasy residue. Luna makes a disgusted face. The manager explains that they have to stop production every few hours to clean or replace the filter — costing time, chemicals, and money.',
    story: [
      'In the world of industrial water treatment, there is a material science problem that has gone unsolved for over 40 years. The standard filtration membrane — the thin plastic sheet with microscopic pores that separates clean water from dirty water — is made of a material called polyamide. It works great for the first few hours. Then the fats, oils, grease, proteins, and other organic gunk in the wastewater start sticking to its surface. Once that happens, the membrane is effectively clogged.',
      'This "fouling" problem is the Achilles\' heel of the entire water treatment industry. When a membrane clogs, the factory has to do something about it. Option one: pump harder — use more pressure to force water through the clogged pores, which means higher energy bills. Option two: stop production and "clean in place" — circulate harsh chemicals (acid and bleach) through the filter to dissolve the gunk, which costs money, creates hazardous chemical waste, and slowly destroys the membrane. Option three: replace the membrane entirely — the most expensive option, but eventually unavoidable no matter what.',
      'The economic consequences are staggering. Factories in the food and beverage industry, oil and gas, chemical manufacturing, and agriculture all face the same dilemma: treat your wastewater properly (which costs a fortune because of fouling) or dump it (which is environmentally catastrophic but economically rational under current technology). Most choose to dump, because the math simply does not work. A factory that produces 1 million gallons of wastewater per day faces treatment costs so high that it is cheaper to buy fresh water from the municipal supply than to recycle what it already has. This is not laziness or malice — it is a technology failure.',
    ],
    facts: (
      <>
        <p><strong>40+ years without a breakthrough:</strong> Polyamide membrane technology has had no fundamental material science innovation since the 1980s. The fouling problem was considered "impossible" to solve.</p>
        <p><strong>Fats, oils, grease, proteins:</strong> These organic compounds stick to standard membranes within hours of operation. This irreversible fouling is the industry\'s biggest unsolved problem.</p>
        <p><strong>Three costly workarounds:</strong> Higher pressure (more energy), chemical cleaning (corrosive + expensive + membrane damage), or membrane replacement (most expensive). All three options increase operating costs dramatically.</p>
        <p><strong>The dumping incentive:</strong> When treatment costs exceed the cost of buying fresh water plus paying disposal fees, the economically rational choice is to dump untreated wastewater. This is the perverse economics that ZwitterCo set out to fix.</p>
        <p><strong>80% of global wastewater</strong> is discharged without any treatment — a staggering failure of both technology and economics.</p>
      </>
    ),
    lesson: (
      <>
        <p>The 40-year stagnation in membrane technology is a perfect example of a problem that everyone knew about but nobody could solve. It was considered a "material science impossibility" — the organic compounds naturally want to stick to the membrane surface, and no one could figure out how to prevent that without changing the membrane\'s filtration properties.</p>
        <p>This is important for kids to understand: some of the world\'s most valuable breakthroughs come from challenging "impossible" problems that everyone else has accepted as unsolvable. The fouling problem was not a secret. Every water treatment engineer knew about it. Thousands of PhDs had worked on it. And yet it took a completely different approach — not a better version of the same membrane chemistry, but a fundamentally new chemistry — to solve it.</p>
      </>
    ),
    lessonTitle: 'The "Impossible" Problem Everyone Accepted',
    tip: 'Ask your child: "What is something that has always been broken or annoying that everyone just accepts?" Maybe a slow school computer, a confusing homework portal, or a bus route that takes too long. The natural response is "that\'s just how it is." But ZwitterCo\'s story shows that "that\'s just how it is" is often an opportunity in disguise. The problems everyone accepts are the ones that, if solved, create the most value.',
  },
  {
    number: 2,
    tag: 'The Solution',
    tagColor: 'bg-amber-100 text-amber-700',
    title: 'A Whitewater Rafting Guide Who Invented a Non-Stick Membrane for the World\'s Nastiest Water',
    teaser:
      'Alex Rappaport was a river rafting guide who fell in love with clean water — then discovered a lab\'s "accidental" material that repels oil and protein the way Teflon repels egg. He turned it into a filtration membrane that simply will not clog.',
    image: '/images/comics/zwitterco/strip-2.jpg',
    imageAlt:
      'A microscopic diagram showing the ZwitterCo membrane — it has special "zwitterionic" molecules that create a water-loving, oil-repelling surface. Oil droplets slide off while clean water passes through. Wayne explains to Luna how it works like a non-stick pan.',
    story: [
      'Alex Rappaport\'s journey to founding ZwitterCo did not begin in a chemistry lab. It began on the Potomac River in Washington, D.C., where he worked as a whitewater rafting and kayaking guide during college summers. Those summers on the river were, in his words, "a transformative experience" that gave him a profound connection to water and nature. He went on to study environmental engineering at Tufts University — not because he wanted to stay in academia, but because he wanted to solve real problems fast.',
      'At Tufts, Rappaport discovered a research project led by chemical engineering professor Ayse Asatekin. She had developed a new class of materials called "zwitterionic polymers" — molecules with an equal number of positive and negative charges, arranged in a way that makes them incredibly hydrophilic (water-loving). When coated onto a membrane surface, these zwitterions create a hydration layer — a microscopic shield of water molecules that physically prevents oils, fats, and proteins from touching the membrane. Think of it as a non-stick coating for water filtration.',
      'Rappaport was not the scientist who invented the zwitterionic material. But he was the first person to fully grasp its commercial potential. In 2018, his team won Tufts University\'s $100K startup competition. ZwitterCo was founded with an exclusive license to the technology (now 12 patent families). Rappaport brought on Christopher Drover as CTO — a manufacturing expert who had previously scaled membrane production for a Fortune 500 company — and a COO with deep industrial water treatment experience. The "iron triangle" was complete: a visionary, a manufacturer, and a sales engine.',
    ],
    facts: (
      <>
        <p><strong>Zwitterions:</strong> Molecules with equal positive and negative charges that are extremely hydrophilic (water-loving). When applied to a membrane surface, they create a "hydration layer" of water molecules that repels oils and proteins.</p>
        <p><strong>Non-stick for water filtration:</strong> ZwitterCo\'s membranes resist organic fouling entirely — fats, oils, grease, and proteins simply slide off. No chemical cleaning. No high-pressure pumping. No frequent replacement.</p>
        <p><strong>Alex Rappaport: from raft guide to CEO:</strong> His summers as a whitewater guide gave him a personal mission to protect clean water. He studied environmental engineering at Tufts and discovered the zwitterionic technology in a campus lab.</p>
        <p><strong>The "iron triangle" team:</strong> Rappaport (business vision), Drover (manufacturing expertise), and a COO (industrial sales). A deliberately built team to cross the "valley of death" from lab to commercial scale.</p>
        <p><strong>12 patent families:</strong> Exclusive license from Tufts University covering the core zwitterionic membrane technology.</p>
      </>
    ),
    lesson: (
      <>
        <p>Rappaport is the classic "translator" — someone who can understand deep science AND see its commercial potential. He did not invent the zwitterionic chemistry. But he understood that the fouling problem was a multi-billion-dollar opportunity, and that this material was the key. This is one of the most valuable but least-taught skills: the ability to recognize a breakthrough technology and imagine how it could transform an industry.</p>
        <p>The "iron triangle" team structure is also worth noting. Rappaport knew he could not commercialize this alone. He needed a manufacturing expert (Drover) and a sales expert. Startups fail most often not because the technology does not work, but because the team is incomplete. ZwitterCo\'s deliberate team design was as important as the membrane itself.</p>
      </>
    ),
    lessonTitle: 'The Most Valuable Skill Is Translation — Between Science and Business',
    tip: 'Ask your child: "If you found a magical new material in a science lab that could do something amazing, would you know what to do with it?" The answer is probably no — and that is exactly the skill Rappaport had. He could look at a lab experiment and imagine it inside a factory solving a real problem. This is called "technology transfer" or "translation," and it is one of the highest-value skills in the world. It is the bridge between "this works in a test tube" and "this works for 10,000 customers."',
  },
  {
    number: 3,
    tag: 'The Strategy',
    tagColor: 'bg-indigo-100 text-indigo-700',
    title: 'When Your Water Filter Pays for Itself — and Unlocks a $1 Trillion Opportunity',
    teaser:
      'ZwitterCo\'s membranes do not just work better — they change the economics of water entirely. One dairy processor saved over 1 million gallons of fresh water in 10 months. A biotech company cut membrane costs by 400%. The prize: turning wastewater from a cost center into a profit center.',
    image: '/images/comics/zwitterco/strip-3.jpg',
    imageAlt:
      'Wayne shows Luna a chart comparing factory costs before and after ZwitterCo. Before: high energy, chemical cleaning, frequent replacements. After: near-zero fouling, continuous operation, dramatic cost savings. Luna realizes this is not just about cleaner water — it is about cheaper factories.',
    story: [
      'The proof of ZwitterCo\'s technology is not in the lab data — it is in the customer results. In the oil and gas industry, a ZwitterCo pre-treatment system for produced water (the contaminated water that comes out of oil wells) achieved a treatment cost of just $0.11 per barrel — well below the $0.20 industry target that made recycling economically viable. The system achieved 99% water recovery and "complete membrane cleanability" — meaning the membrane could be fully restored to its original performance.',
      'The results in the bioprocessing industry are even more dramatic. Solugen, a Texas-based biotech company, found that ZwitterCo\'s membranes worked as a "direct replacement" for their existing filters — meaning they could swap them in without changing any equipment. The result: 400% membrane cost savings and production cycles doubled. In the dairy industry, a Midwest whey processor reduced cleaning steps so dramatically that they saved over 1 million gallons of fresh water in just 10.5 months.',
      'But the most transformative case came from an anonymous biomanufacturer. By recycling 80% of their fermentation wastewater using ZwitterCo membranes, they were able to expand production capacity in a water-stressed region — something that would have been impossible under the old economics. This was the turning point: water treatment stopped being a "cost center" on the company\'s P&L and became a "growth enabler."',
      'This shift — from cost to value — explains why ZwitterCo raised the largest Series A in water technology history ($33M), followed by an oversubscribed $58.4M Series B. Investors include DCVC (deep tech venture capital), MANN+HUMMEL (a global filtration giant), and Munich Re Ventures (a global reinsurance company). The reinsurance company\'s presence is the most telling signal: water scarcity is now recognized as a core, quantifiable financial risk. A factory forced to shut down by drought is an insurance event. ZwitterCo\'s technology is a risk mitigation tool for the global economy.',
    ],
    facts: (
      <>
        <p><strong>Oil & gas:</strong> ZwitterCo pre-treatment achieved $0.11/bbl — below the $0.20 industry target for economic recycling. 99% water recovery rate.</p>
        <p><strong>Bioprocessing (Solugen):</strong> 400% membrane cost savings as a direct replacement. Production cycles doubled. Zero equipment changes needed.</p>
        <p><strong>Dairy processing:</strong> 1 million+ gallons of fresh water saved in 10.5 months — just from reducing cleaning steps.</p>
        <p><strong>Biomanufacturing:</strong> 80% fermentation wastewater recycled, enabling production expansion in a water-stressed region. Treatment became a "growth enabler" rather than a cost.</p>
        <p><strong>$33M Series A + $58.4M Series B:</strong> Largest water tech Series A in history. Investors include deep tech VC (DCVC), filtration giant (MANN+HUMMEL), and reinsurance (Munich Re Ventures).</p>
        <p><strong>From cost center to profit center:</strong> ZwitterCo\'s core insight — water treatment economics have historically forced a linear "use-then-discard" model. By making recycling cheaper than disposal, they unlock a circular model where wastewater becomes a resource.</p>
      </>
    ),
    lesson: (
      <>
        <p>ZwitterCo\'s strategy reveals a profound insight about how to sell transformative technology. They do not market themselves as a "better filter company" — they market themselves as a "water resiliency platform." Their customers are not buying membranes; they are buying the ability to expand production in water-scarce regions, to avoid drought-related shutdowns, and to turn a regulatory burden (wastewater treatment) into a competitive advantage (lower water costs).</p>
        <p>This reframing is what attracted Munich Re Ventures — a reinsurance company — as an investor. Munich Re understands that water scarcity is one of the biggest financial risks of the coming decades. They are not investing in a filtration company; they are investing in a hedge against climate-driven water disruption. When you can change how the insurance industry thinks about your technology, you know you have found product-market fit.</p>
      </>
    ),
    lessonTitle: 'Sell the Outcome, Not the Product',
    tip: 'Ask your child: "If you invented a better mousetrap, would you sell it as \'a better mousetrap\' or as \'a way to never worry about mice again\'?" The answer is obvious — nobody wants to buy a mousetrap, they want to solve a mouse problem. ZwitterCo understood this perfectly. They are not selling membranes, they are selling "water resiliency" — the ability for a factory to never worry about water again. This is a lesson that applies to any product or service: sell the outcome, not the features.',
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

function AboutZwitterCo() {
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
            <span className="text-sky-600 text-sm font-bold">ZC</span>
          </div>
          <div>
            <p className="font-bold text-slate-800">About ZwitterCo</p>
            <p className="text-xs text-slate-400 mt-0.5">Non-stick filtration membranes for industrial wastewater</p>
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
                  <p className="font-semibold text-slate-800 mb-1">What ZwitterCo Does</p>
                  <p>ZwitterCo manufactures filtration membranes coated with zwitterionic polymers — a special chemistry that prevents fats, oils, grease, and proteins from sticking to the membrane surface. This "non-stick" membrane solves the 40-year-old fouling problem that has plagued industrial water treatment, making it economically viable for the first time to recycle the world\'s most difficult wastewater streams.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">The Technology</p>
                  <p>Zwitterionic polymers create a hydration layer — a microscopic shield of water molecules — on the membrane surface. Oils and proteins cannot penetrate this shield, so they slide off harmlessly. The membrane operates continuously without chemical cleaning, high-pressure pumping, or frequent replacement. It works across food & beverage, oil & gas, bioprocessing, dairy, and agriculture.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">The Business Model</p>
                  <p>Direct replacement sales into existing filtration systems, plus new system installations. The value proposition is simple: lower total cost of ownership (TCO) than any alternative, with payback periods measured in months. Customers in bioprocessing have seen 400% cost savings. Dairy processors save millions of gallons of water. Each case study unlocks the next industry vertical.</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-slate-800 mb-1">The Founder</p>
                  <p>Alex Rappaport — former whitewater rafting guide turned environmental engineer. Discovered zwitterionic membrane technology in a Tufts University lab and recognized its commercial potential. Built an "iron triangle" team with a manufacturing expert (CTO Christopher Drover) and an industrial sales leader to cross the valley of death from lab to market. Raised the largest Series A in water technology history.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">Why It Matters for Kids</p>
                  <p>ZwitterCo teaches three big lessons. First: the "impossible" problems everyone has accepted are often the biggest opportunities — the membrane fouling problem was 40 years old and everyone thought it was unsolvable. Second: your path to impact does not have to be linear — Rappaport went from rafting guide to engineering student to CEO. Third: the rarest skill is "translation" — understanding deep science AND seeing its business potential. You do not need to be the inventor; you need to be the person who sees what the invention can become.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">Learn More</p>
                  <p>
                    <a href="https://zwitterco.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 font-medium">
                      zwitterco.com
                    </a>
                    {' '}— company information, technology details, and case studies.
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

export default function WayneComicZwitterCo() {
  const totalStrips = strips.length;
  return (
    <>
      <SEOHead
        title="Startup Stories #22: ZwitterCo — Non-Stick Membranes That Unlock Industrial Water Recycling | Wayne's Comics"
        description="A parent-child comic series about real startups. Episode 22: ZwitterCo — a former whitewater rafting guide turned CEO invented a 'non-stick' filtration membrane that resists fouling from fats, oils, and proteins, turning industrial wastewater from a cost center into a profit center."
        ogImage="/images/comics/zwitterco/cover.jpg"
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
          <img src="/images/comics/zwitterco/cover.jpg" alt="Startup Stories #22: ZwitterCo — non-stick filtration membranes that make industrial water recycling economically viable" className="w-full h-auto" />
        </div>
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-bold rounded-full uppercase tracking-wide">
            Startup Stories · Episode 22 of 25
          </span>
          <span className="text-xs text-slate-400">June 2026 · {totalStrips} strips · 🇺🇸 United States</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3 leading-tight">
          The Non-Stick Membrane That Makes the World's Nastiest Water Drinkable Again
        </h1>
        <p className="text-slate-500 leading-relaxed mb-5 max-w-2xl">
          For 40 years, filtration membranes have clogged instantly when exposed to fats, oils, and proteins — 
          making industrial water recycling impossibly expensive. A former whitewater rafting guide turned CEO 
          invented a zwitterionic "non-stick" coating that repels organic gunk. The result: 400% cost savings 
          for factories and a whole new economics of water. Episode 22 of 25.
        </p>
        <ShareBar
          title="Startup Stories #22: ZwitterCo — Non-Stick Water Filtration"
          summary="A 3-strip parent-child comic about ZwitterCo — a material science breakthrough that makes industrial wastewater recycling economically viable for the first time."
        />
      </motion.div>

      <div className="space-y-6 mb-10">
        {strips.map((strip, i) => (
          <motion.div key={strip.number} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.1 + i * 0.07 }}>
            <StripCard strip={strip} total={totalStrips} />
          </motion.div>
        ))}
      </div>

      <AboutZwitterCo />

      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.4 }}
        className="flex items-center justify-between py-6 border-t border-slate-200 mb-10"
      >
        <Link to="/wayne/comics" className="text-sm text-slate-400 hover:text-slate-700 transition-colors">
          ← All Comics
        </Link>
        <ShareBar title="Startup Stories #22: ZwitterCo" summary="A parent-child comic about non-stick filtration membranes that turn industrial wastewater from a cost center into a profit center." />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.45 }}
        className="bg-indigo-600 rounded-2xl px-8 py-10 text-center text-white"
      >
        <h2 className="text-xl font-bold mb-2">More startup stories coming</h2>
        <p className="text-indigo-100 text-sm mb-6 max-w-md mx-auto">
          This is Episode 22 of 25. Each story is about a real company solving a real problem — told in a way that makes sense to a 15-year-old, with analysis for the parent reading along.
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
