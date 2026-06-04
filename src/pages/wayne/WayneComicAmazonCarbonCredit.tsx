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
    title: 'Why Farmers Cut Down the Amazon',
    teaser:
      'It is not that farmers want to destroy the rainforest. It is that farming (soy, beef) pays the bills — and protecting the forest does not. Belterra set out to change the math.',
    image: '/images/comics/amazon-carbon-credit/strip-1.jpg',
    imageAlt:
      'Luna and Wayne walk through the Amazon forest. Wayne explains the paradox: farmers cut down trees because cattle and soy are profitable, while keeping the forest standing has no economic value — until Belterra changed that equation.',
    story: [
      'Here is an uncomfortable truth about deforestation in the Amazon: it is not driven by evil people who hate trees. It is driven by economics. A farmer with a piece of land in the Brazilian Amazon faces a simple financial calculation. Clearing the forest and planting soy or raising cattle generates income — roughly $1,500 to $2,500 per hectare per year. Leaving the forest standing generates nothing. The choice is obvious. And at scale, this choice has destroyed millions of hectares of the most biodiverse ecosystem on Earth.',
      'Brazil faces a staggering challenge: over 70 to 80 million hectares of degraded land — an area larger than France. This land was once forest, then cleared for low-productivity cattle grazing or monoculture crops, and then abandoned when the soil gave out. More than 3 million small-scale farmers are trapped in this cycle. They are not bad people. They are people without alternatives. They lack three things: the technical knowledge to farm differently, the capital to invest in new approaches, and access to markets that pay for sustainable products.',
      'These three barriers feed each other. Without knowledge, farmers use destructive methods. Without capital, they cannot afford to transition. Without market access, even successful sustainable farms cannot sell their products. The result is a self-reinforcing trap: poverty drives deforestation, and deforestation creates more poverty. Breaking this cycle requires a solution that addresses all three barriers at once — not just planting trees, but building an entire economic system around keeping them standing.',
    ],
    facts: (
      <>
        <p><strong>70-80 million hectares</strong> of degraded land in Brazil — larger than France. Low-productivity cattle grazing and monoculture crops are the main causes.</p>
        <p><strong>3+ million</strong> small-scale farmers trapped in the poverty-deforestation cycle.</p>
        <p><strong>Three barriers:</strong> lack of technical knowledge, lack of capital, lack of market access. All three must be solved together.</p>
        <p><strong>Soy vs. agroforestry:</strong> Soy generates ~$1,500-2,500/hectare. A well-managed agroforest can generate 3-4x more — but requires 4-5 years of investment before payback.</p>
        <p><strong>Ex-IBAMA director</strong> Valmir Ortega founded Belterra after realizing enforcement and fines alone could not stop deforestation — only economics can.</p>
      </>
    ),
    lesson: (
      <>
        <p>Belterra\'s founding insight is that environmental problems are almost always economic problems in disguise. If deforestation is more profitable than conservation, farmers will deforest — not because they are bad, but because the economic system creates that incentive. The solution is not to blame farmers but to change the economic equation so that keeping the forest standing becomes the more profitable choice.</p>
        <p>This principle — "align economics with ecology" — is the foundation of every successful large-scale environmental solution. Carbon credits, payment for ecosystem services, sustainable certification premiums — all of these are mechanisms to make conservation financially viable. The question Belterra answers is: how do you make this work at scale for millions of small farmers?</p>
      </>
    ),
    lessonTitle: 'Economics Drives Ecology',
    tip: 'Ask your child: "Imagine someone offered you $100 to cut down a tree in your backyard, and $0 to leave it standing. What would you do?" Most people would cut it down. Then ask: "What if someone offered you $20 a year to leave it standing, every year, forever?" Now the math changes. This is exactly what carbon credits do — they put a price on keeping the forest alive. Understanding this shift from "one-time profit from destruction" to "ongoing profit from preservation" is the key insight behind the entire carbon economy.',
  },
  {
    number: 2,
    tag: 'The Solution',
    tagColor: 'bg-amber-100 text-amber-700',
    title: 'The Ecosystem-in-a-Box',
    teaser:
      'Belterra provides everything a farmer needs to transition to regenerative agroforestry — seeds, training, financing, and guaranteed buyers. The farmer just has to farm.',
    image: '/images/comics/amazon-carbon-credit/strip-2.jpg',
    imageAlt:
      'Wayne explains Belterra\'s "Ecosystem-in-a-Box" model to Luna — showing how the company provides seeds, training, financing, and market access so the farmer only needs to manage the land.',
    story: [
      'Belterra\'s model is called "Ecosystem-in-a-Box." It is a vertically integrated platform that removes all three barriers simultaneously. For the farmer, it works like a turnkey solution. Belterra provides everything: land assessment and soil analysis, design of the optimal mix of tree and crop species, supply of high-quality seedlings, ongoing technical support for years, financing to cover the transition period, and a guaranteed market for everything the farmer produces.',
      'The science behind the system is impressive. Belterra\'s proprietary tool analyzes over 34 crop species and designs an optimal combination for each specific plot of land — factoring in local climate, soil conditions, and market prices. The design mixes short-cycle crops (cassava, bananas that generate income in year one) with medium-cycle crops (acai, cupuacu that pay off in years 3-5) and long-cycle timber trees (the big payoff in 10+ years). This "temporal stacking" ensures the farmer has cash flow at every stage, rather than waiting years for the first paycheck.',
      'On the financial side, Belterra takes on most of the risk. The farmer provides the land and labor; Belterra provides everything else. A well-managed hectare of agroforest can generate over 6,000 reais per year from cocoa alone — 3-4x what soy or cattle generates. The upfront investment is high (10,000-25,000 reais per hectare) and payback takes 4-5 years — which is why most farmers cannot do it alone. Belterra bridges this gap by securing capital from sources that understand long-term returns.',
    ],
    facts: (
      <>
        <p><strong>"Ecosystem-in-a-Box":</strong> Belterra\'s vertically integrated platform — seeds, training, financing, management, and guaranteed market access.</p>
        <p><strong>34+ crop species</strong> analyzed by proprietary tool to design optimal combinations per plot — factoring climate, soil, and market conditions.</p>
        <p><strong>Temporal stacking:</strong> Short-cycle crops (cassava, banana) → year 1. Medium-cycle (acai, cupuacu) → years 3-5. Long-cycle (timber) → 10+ years. Continuous cash flow at every stage.</p>
        <p><strong>Cocoa revenue:</strong> 6,000+ reais/hectare from a managed agroforest — vs. 1,500-2,500 reais for soy or cattle.</p>
        <p><strong>Upfront cost:</strong> 10,000-25,000 reais/hectare — too high for most small farmers. Belterra fronts this capital.</p>
        <p><strong>Farmer role:</strong> Provide land and labor. Belterra handles everything else — seeds, training, financing, sales.</p>
      </>
    ),
    lesson: (
      <>
        <p>The "Ecosystem-in-a-Box" model is a brilliant example of what business theorists call "vertical integration for risk reduction." By controlling every link in the chain — from seed design to market access — Belterra can eliminate the risks that would otherwise prevent a farmer from transitioning. The farmer does not need to learn new skills, find financing, or search for buyers. All of that complexity is absorbed by Belterra\'s platform.</p>
        <p>This approach works because the barriers are systemic — they are all connected. Solving only the knowledge gap (training) without solving the capital gap leaves farmers unable to act on what they learned. Solving capital without solving market access leaves farmers with products they cannot sell. You have to solve all three at once, which means you have to build a platform that controls the entire value chain — which is exactly what Belterra did.</p>
      </>
    ),
    lessonTitle: 'Solve All Three, or Solve None',
    tip: 'Ask your child: "If you wanted to help a friend who is failing math, would you just give them a textbook? Or would you also need to explain the concepts, help with homework, and make sure they understand before the test?" Helping with just one thing (giving them a book) is not enough. Real help addresses all the barriers at once. This is the same insight Belterra applied to farming: providing seeds alone would not work — they also needed financing, training, and a buyer.',
  },
  {
    number: 3,
    tag: 'The Innovation',
    tagColor: 'bg-indigo-100 text-indigo-700',
    title: 'Selling Carbon Credits Before the Trees Grow',
    teaser:
      'Belterra presold carbon credits to Amazon (the company) to fund the upfront cost of planting. Instead of waiting 10 years for the forest to capture carbon, they sold the future capture today.',
    image: '/images/comics/amazon-carbon-credit/strip-3.jpg',
    imageAlt:
      'Luna and Wayne look at a diagram showing how Belterra "pre-sells" carbon credits to Amazon (the company) — turning future forest growth into upfront funding for today\'s planting costs.',
    story: [
      'Belterra\'s most innovative financial move is a deal with Amazon (the tech company, not the river). Amazon committed at least 90 million reais to buy carbon credits from Belterra\'s farms — but here is the crucial detail: the contract is a forward purchase agreement. Amazon pays now for carbon credits that will be generated over the next 10 years as the trees grow. This "pre-purchase" turns future carbon capture into upfront cash that Belterra can use to fund the expensive work of planting today.',
      'This is a fundamentally different way to think about carbon credits. Most carbon markets work like this: a company emits CO2, then buys credits to offset it — essentially paying for past guilt. Belterra flipped the model: "presell" the future carbon capture of trees that have not even been planted yet, use the cash to fund the planting, and deliver the credits over time as the forest grows. Carbon becomes project finance, not guilt offset. As Valmir Ortega put it: "Without the carbon money, farmers simply do not have the courage to take the first step toward transition."',
      'Belterra layers multiple sources of capital on top of this. A 100 million real loan from Brazil\'s BNDES climate fund at just 1% annual interest. A 20 million real impact investment from the Amazon Biodiversity Fund. Strategic partnerships with Vale (mining) and Cargill (agriculture) that provide both funding and guaranteed offtake for farmer products. And a new venture called Rio Capim with JBS (the world\'s largest meat processor) to apply the same model to cattle ranching — a project expected to mobilize nearly 1 billion reais. Together, these create a "blended finance" engine that turns the high-risk work of forest restoration into a fundable, scalable asset class.',
    ],
    facts: (
      <>
        <p><strong>Amazon (company) deal:</strong> 90+ million reais forward purchase agreement — pays now for carbon credits to be delivered over 10 years.</p>
        <p><strong>Carbon as project finance:</strong> Future carbon capture is "pre-sold" to generate upfront cash for today\'s planting costs — flipping the traditional carbon offset model.</p>
        <p><strong>BNDES climate fund loan:</strong> 100 million reais at 1% annual interest — public capital deployed at below-market rates for climate impact.</p>
        <p><strong>Amazon Biodiversity Fund:</strong> 20 million reais impact investment.</p>
        <p><strong>Vale partnership:</strong> Initial investor and strategic partner — aligns with Vale\'s own forest restoration commitments.</p>
        <p><strong>Cargill partnership:</strong> Global agricultural supply chain access for farmer products.</p>
        <p><strong>JBS/Rio Capim venture:</strong> Scaling agroforestry to cattle ranching — expected to mobilize ~1 billion reais.</p>
        <p><strong>Founded:</strong> 2020. CEO: Valmir Ortega — former acting director of IBAMA (Brazilian environmental regulatory agency).</p>
      </>
    ),
    lesson: (
      <>
        <p>The forward purchase of carbon credits is a financial innovation that could transform climate finance. It solves the fundamental timing mismatch of forest restoration: the costs are upfront (planting, maintenance for 4-5 years before harvest), but the benefits (carbon capture, timber, high-value crops) come later. By pre-selling the future carbon, Belterra transforms a long-term environmental asset into immediate development capital.</p>
        <p>This is the "blended finance" model at its best: patient capital from public banks (BNDES at 1%), catalytic funding from impact investors (Biodiversity Fund), pre-purchase commitments from corporate buyers (Amazon), and strategic partnerships with industry players (Vale, Cargill, JBS). Each type of capital has a different risk-return profile, and Belterra designed a structure where each one plays the role it is best suited for. The result is a financing engine that can scale to millions of hectares.</p>
      </>
    ),
    lessonTitle: 'Carbon as Catalytic Capital',
    tip: 'Ask your child: "Imagine you want to start a lemonade stand, but you need money to buy lemons, sugar, and cups. You will not make any profit for 2 weeks. What do you do?" One answer: find someone who will pay you now for lemonade you will deliver later (a "forward contract"). This is exactly what Belterra did — they found someone (Amazon) willing to pay today for carbon that the trees will capture tomorrow. This is a powerful lesson in how creative financing can solve the "timing problem" of any long-term investment.',
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

function AboutBelterra() {
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
            <span className="text-indigo-600 text-sm font-bold">BT</span>
          </div>
          <div>
            <p className="font-bold text-slate-800">About Belterra Agroflorestas</p>
            <p className="text-xs text-slate-400 mt-0.5">Regenerative agroforestry at scale in the Brazilian Amazon</p>
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
                  <p className="font-semibold text-slate-800 mb-1">What Belterra Does</p>
                  <p>Belterra is a climate-food tech company that restores degraded Amazon land through regenerative agroforestry. It provides a complete "Ecosystem-in-a-Box" platform — seeds, financing, training, and market access — turning small farmers from forest destroyers into forest protectors.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">The Technology</p>
                  <p>Proprietary analysis tool evaluating 34+ crop species to design optimal agroforest combinations per plot. Temporal stacking of short, medium, and long-cycle crops for continuous cash flow. QR-code traceability across the supply chain.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">The Business Model</p>
                  <p>Vertical integration: Belterra owns the farmer relationship, the technical assistance, the carbon credit generation, and the product offtake. Revenue from: (1) high-value crop sales (cocoa, acai, etc.), (2) carbon credit sales, (3) management fees. Financing from blended capital: corporate prepurchases, public climate funds, impact investments, and strategic partnerships.</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-slate-800 mb-1">The Founder</p>
                  <p>Valmir Ortega — former acting director of IBAMA (Brazil\'s environmental agency) and secretary of environment for Para state (the Amazon deforestation frontline). Founded Belterra in 2020 after concluding that enforcement alone cannot stop deforestation.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">Why It Matters for Kids</p>
                  <p>This story teaches a crucial lesson about incentives. Most people think companies destroy forests because they are "greedy." The reality is more nuanced: the economic system rewarded destruction and punished conservation. Belterra\'s innovation was not just planting trees — it was redesigning the economic system so that keeping the forest standing pays better than cutting it down. Understanding how incentives shape behavior is one of the most important life skills a child can learn.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">Learn More</p>
                  <p>
                    <a href="https://www.belterra.com.br" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 font-medium">
                      belterra.com.br
                    </a>
                    {' '}— company information and project details.
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

export default function WayneComicAmazonCarbonCredit() {
  const totalStrips = strips.length;
  return (
    <>
      <SEOHead
        title="Startup Stories #12: Belterra — Making the Amazon Rainforest More Profitable Standing Than Cut Down | Wayne's Comics"
        description="A parent-child comic series about real startups. Episode 12: Belterra Agroflorestas — the Brazilian company using agroforestry, carbon credits, and blended finance to restore the Amazon while making farmers more money than cattle or soy."
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
          <img src="/images/comics/amazon-carbon-credit/cover.jpg" alt="Startup Stories #12: Belterra — making the Amazon worth more standing than cut down" className="w-full h-auto" />
        </div>
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-bold rounded-full uppercase tracking-wide">
            Startup Stories · Episode 12 of 25
          </span>
          <span className="text-xs text-slate-400">June 2026 · {totalStrips} strips · 🇧🇷 Brazil</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3 leading-tight">
          Making the Amazon Rainforest More Profitable Standing Than Cut Down
        </h1>
        <p className="text-slate-500 leading-relaxed mb-5 max-w-2xl">
          Farmers in the Amazon do not cut down trees because they hate the environment. They do it because 
          cattle and soy pay the bills — and keeping the forest standing does not. Belterra is changing 
          that equation through regenerative agroforestry, pre-selling carbon credits, and a financing 
          model that turns forest restoration into a viable business. Episode 12 of 25.
        </p>
        <ShareBar
          title="Startup Stories #12: Belterra — Making the Amazon Pay Standing Up"
          summary="A 3-strip parent-child comic about Belterra Agroflorestas — using agroforestry and carbon finance to restore the Brazilian Amazon."
        />
      </motion.div>

      <div className="space-y-6 mb-10">
        {strips.map((strip, i) => (
          <motion.div key={strip.number} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.1 + i * 0.07 }}>
            <StripCard strip={strip} total={totalStrips} />
          </motion.div>
        ))}
      </div>

      <AboutBelterra />

      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.4 }}
        className="flex items-center justify-between py-6 border-t border-slate-200 mb-10"
      >
        <Link to="/wayne/comics" className="text-sm text-slate-400 hover:text-slate-700 transition-colors">
          ← All Comics
        </Link>
        <ShareBar title="Startup Stories #12: Belterra" summary="A parent-child comic about the Brazilian company making forest restoration profitable through agroforestry and carbon finance." />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.45 }}
        className="bg-indigo-600 rounded-2xl px-8 py-10 text-center text-white"
      >
        <h2 className="text-xl font-bold mb-2">More startup stories coming</h2>
        <p className="text-indigo-100 text-sm mb-6 max-w-md mx-auto">
          This is Episode 12 of 25. Each story is about a real company solving a real problem — told in a way that makes sense to a 15-year-old, with analysis for the parent reading along.
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
