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
    title: '7 Billion Pods, 4.9 Billion in Landfills',
    teaser:
      'Coffee capsules are incredibly convenient — and incredibly wasteful. 70% of the 7 billion pods consumed globally every year end up in landfills, with aluminum taking 500 years to decompose.',
    image: '/images/comics/recycap/strip-1.jpg',
    imageAlt:
      'Luna looks surprised as Wayne shows her a pile of used coffee capsules — 7 billion consumed per year, 4.9 billion never recycled, each aluminum pod taking 500 years to break down in a landfill.',
    story: [
      'The numbers are staggering. Every year the world consumes roughly 7 billion single-serve coffee capsules. That is more than 19 million per day. And roughly 4.9 billion of them — 70% — end up in landfills. Each aluminum capsule can take up to 500 years to decompose. By 2022, the global coffee capsule market was worth $12.3 billion, up from $9.9 billion the year before. And in Spain alone, more than 5 million capsules are consumed every single day.',
      'Here is the irony: aluminum is one of the most recyclable materials on the planet. It can be recycled infinitely without losing quality. The problem is not the material itself. It is the product design. A coffee capsule combines metal or plastic with moist organic waste (coffee grounds). To recycle it properly, you need to separate the two — which means someone has to empty out the wet, sticky coffee grounds from each capsule before it can be processed. That someone is usually you.',
      'This creates what the founders of RecyCap call the "convenience paradox": the very feature that makes capsule coffee successful — fast, clean, one-button — is what makes it unsustainable. The recycling process requires a series of steps that completely contradict the product\'s core promise. Store used capsules. Scrape out wet grounds. Rinse the shell. Find a drop-off point. The result: despite widespread consumer concern about waste, the actual recycling rate hovers around just 10%.',
    ],
    facts: (
      <>
        <p><strong>7 billion capsules</strong> consumed globally per year — about 19 million per day.</p>
        <p><strong>4.9 billion (70%)</strong> end up in landfills.</p>
        <p><strong>Aluminum capsules</strong> take up to 500 years to decompose in nature.</p>
        <p><strong>Market size:</strong> $12.3 billion in 2022, up from $9.9 billion in 2021 — rapid growth means the waste problem is accelerating.</p>
        <p><strong>Spain alone:</strong> 5+ million capsules consumed daily.</p>
        <p><strong>Current recycling rate:</strong> approximately 10% — despite high consumer awareness and concern.</p>
      </>
    ),
    lesson: (
      <>
        <p>The convenience paradox is a recurring pattern in sustainable product design. A product that succeeds because it is easy to use creates a waste stream that requires difficult, inconvenient behavior to manage. The harder recycling is, the fewer people do it — regardless of how much they care about the environment.</p>
        <p>This insight is crucial for any entrepreneur designing a physical product: the disposal experience is part of the user experience. If your product creates waste, you have designed a recycling problem into your business. The smartest companies design the disposal to be as effortless as the consumption.</p>
      </>
    ),
    lessonTitle: 'The Convenience Paradox',
    tip: 'Ask your child: "What is something you use that creates waste — a snack wrapper, a water bottle, a toy package?" Then ask: "How easy is it to recycle or dispose of properly?" Walk through the steps required. If it is complicated, most people will not do it — even if they want to. This exercise reveals that product design extends beyond the product itself to what happens after you are done using it.',
  },
  {
    number: 2,
    tag: 'The Solution',
    tagColor: 'bg-amber-100 text-amber-700',
    title: 'The Machine That Eats Coffee Capsules',
    teaser:
      'RecyCap built an automated recycling machine for homes and offices. You drop in used capsules, it separates the grounds from the aluminum, and produces clean recyclable materials — all at the push of a button.',
    image: '/images/comics/recycap/strip-2.jpg',
    imageAlt:
      'RecyCap\'s REACT technology illustrated — a compact countertop machine that automatically separates coffee grounds from aluminum or plastic capsules, outputting clean materials ready for standard recycling.',
    story: [
      'RecyCap Technologies, founded in Valencia, Spain in 2022, built exactly that: a device that does the dirty work for you. Their patent-protected REACT technology is a compact, countertop machine that automatically separates coffee grounds from the capsule shell — whether aluminum or plastic. You drop in your used capsules, the machine handles the separation, and it outputs clean, dry aluminum ready for standard recycling bins. The coffee grounds can be composted or used as fertilizer.',
      'The brilliance of this approach is that it shifts the burden of recycling from the consumer to a machine. Instead of asking millions of people to change their behavior — store capsules, scrape grounds, rinse shells, find drop-off points — RecyCap puts a device in the home or office that does all of that automatically. The consumer\'s job shrinks from a multi-step chore to a single action: drop the pod in the machine.',
      'By solving the convenience paradox at the source, RecyCap unlocks a massive environmental and economic opportunity. The aluminum recovered from capsules has real value — it can be sold back into the recycling stream. And the machine itself creates a hardware-as-a-service business model, with recurring revenue from filters, maintenance, and eventually proprietary capsule partnerships.',
    ],
    facts: (
      <>
        <p><strong>RecyCap Technologies</strong> founded 2022 in Valencia, Spain.</p>
        <p><strong>REACT® technology:</strong> Patent-protected automated separation of coffee grounds from capsule shells (aluminum or plastic).</p>
        <p><strong>How it works:</strong> Drop in used capsules → machine separates grounds from shell → outputs clean aluminum ready for standard recycling bins.</p>
        <p><strong>Pre-orders:</strong> 12,600 units worth €855,000 — real market validation, not projections.</p>
        <p><strong>Geographic distribution:</strong> Orders from EU, US, Middle East, and North Africa — global demand.</p>
        <p><strong>Funding:</strong> €555,000 raised from Veos Ventures, ENISA (Spanish National Innovation Company), and other investors.</p>
      </>
    ),
    lesson: (
      <>
        <p>RecyCap\'s approach is a textbook example of "friction removal" in circular economy design. Most sustainability solutions ask consumers to do more work. RecyCap asks them to do less. The insight is that consumer guilt is not enough to drive behavior change at scale. If you want 90% recycling rates instead of 10%, you cannot rely on people being good — you need to make recycling automatic.</p>
        <p>This principle applies far beyond coffee capsules. Any product category where convenience drives consumption and inconvenience blocks recycling is a candidate for the same kind of solution: build a machine or system that absorbs the friction so the user does not have to.</p>
      </>
    ),
    lessonTitle: 'Remove the Friction',
    tip: 'Ask your child: "What chores in our house feel like the most hassle?" Then ask: "What would a machine look like that did that chore for you?" This is essentially what inventors do — they find tasks that people hate doing and build devices that eliminate the hated steps. The coffee capsule problem is a perfect example: nobody likes scraping wet coffee grounds out of tiny pods. RecyCap made a machine so nobody has to.',
  },
  {
    number: 3,
    tag: 'The Strategy',
    tagColor: 'bg-indigo-100 text-indigo-700',
    title: 'Intel Inside for Coffee Machines',
    teaser:
      'RecyCap\'s real goal is not to sell recycling machines. It is to embed REACT technology into every coffee maker — making recycling automatic, invisible, and unavoidable.',
    image: '/images/comics/recycap/strip-3.jpg',
    imageAlt:
      'Wayne shows Luna how RecyCap\'s long-term strategy is to license its REACT technology to major coffee machine brands — like "Intel Inside" but for coffee capsule recycling — making recycling automatic in every home coffee maker.',
    story: [
      'Here is the really clever part of RecyCap\'s strategy. The current countertop recycling machine is not the end product. It is the "Trojan horse." RecyCap\'s long-term goal is not to sell recycling devices to consumers. It is to license the REACT technology to major coffee machine manufacturers like Nespresso, Lavazza, and Keurig — embedding it directly into future coffee machines so recycling happens automatically, invisibly, inside the machine itself.',
      'This "Intel Inside" strategy is a classic platform play. By proving the technology works in a standalone device, RecyCap builds the engineering validation, the patent portfolio, and the market awareness needed to negotiate licensing deals with the giants. For a brand like Nespresso — which faces constant criticism over its environmental impact — the ability to say "our machines now recycle automatically" would be a massive competitive advantage and a solution to one of its biggest ESG problems.',
      'The company\'s valuation thesis is based on this platform potential, not on hardware sales alone. A licensing royalty on every coffee machine sold globally represents a much larger addressable market than selling standalone recycling units. It also creates a moat: once REACT is integrated into a major brand\'s supply chain, switching costs are high. RecyCap\'s stated exit strategy — acquisition by a major appliance manufacturer or an IPO — reflects confidence that this platform approach creates substantial long-term value.',
    ],
    facts: (
      <>
        <p><strong>Standalone device</strong> is the "Trojan horse" — proving the technology works and building market awareness before the licensing push.</p>
        <p><strong>Target partners:</strong> Nespresso, Lavazza, Keurig — any major coffee capsule brand that faces ESG pressure around capsule waste.</p>
        <p><strong>Licensing model:</strong> REACT technology embedded directly into coffee machines at the factory — recycling becomes automatic, invisible, unavoidable.</p>
        <p><strong>Platform economics:</strong> A licensing royalty on millions of coffee machines per year is far more valuable than selling thousands of standalone units.</p>
        <p><strong>Exit strategy:</strong> Acquisition by a major appliance/coffee company or IPO — both assume platform-level valuation, not hardware margins.</p>
        <p><strong>Next step:</strong> Commercial-grade recycling machines for coffee shops and offices, then integration directly into home coffee makers.</p>
      </>
    ),
    lesson: (
      <>
        <p>The "Trojan horse" strategy — entering the market with a product that is not the end goal but a stepping stone — is an underused approach in hardware startups. Instead of trying to convince a giant company to license unproven technology, RecyCap first builds a direct-to-consumer product that validates the technology in the real world. Once the giant sees proven demand, the licensing conversation changes from "take a risk on our technology" to "your competitor is going to get this technology if you don\'t."</p>
        <p>This is the same playbook that allowed ARM to dominate mobile chips without selling a single chip directly to consumers. They licensed their architecture to everyone. The key insight: owning the standard is more valuable than owning the product.</p>
      </>
    ),
    lessonTitle: 'The Trojan Horse Strategy',
    tip: 'Ask your child: "If you invented a better bicycle wheel, would you start a bicycle company or sell your wheel design to existing bicycle companies?" The licensing route (sell to everyone) often creates more value than the product route (sell to a few). This is a fundamental business strategy lesson: sometimes owning the standard is better than owning the product. Can they think of other examples where the "hidden ingredient" is more valuable than the final product?',
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

function AboutRecyCap() {
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
            <span className="text-indigo-600 text-sm font-bold">RC</span>
          </div>
          <div>
            <p className="font-bold text-slate-800">About RecyCap Technologies</p>
            <p className="text-xs text-slate-400 mt-0.5">Automated coffee capsule recycling for homes and offices</p>
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
                  <p className="font-semibold text-slate-800 mb-1">What RecyCap Does</p>
                  <p>RecyCap makes automated coffee capsule recycling machines for homes and offices. Their REACT® technology separates coffee grounds from aluminum or plastic shells — turning a manual chore into a push-button process and unlocking circular economy value.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">The Technology</p>
                  <p>REACT® (patent-pending) is a compact countertop system that automatically separates coffee grounds from capsule shells. Output: clean, dry aluminum ready for standard recycling bins, and compostable coffee grounds. No manual scraping, rinsing, or sorting required.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">The Business Model</p>
                  <p>Phase 1: sell standalone recycling devices direct to consumers and offices. Phase 2: license REACT® technology to major coffee machine manufacturers (Nespresso, Lavazza, Keurig) for integration into future coffee makers. Phase 3: commercial-grade machines for coffee shops and institutional use.</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-slate-800 mb-1">The Team</p>
                  <p>Founded in Valencia, Spain in 2022. Backed by Veos Ventures and ENISA (Spanish National Innovation Company). €555,000 raised. 12,600 units pre-ordered (€855,000 value) across EU, US, Middle East, and North Africa.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">Why It Matters for Kids</p>
                  <p>This story is about how product design determines waste. A coffee capsule is brilliantly designed for convenience — and terribly designed for recycling. Understanding this connection helps children think critically about the products they use every day: What happens to this when I am done with it? Was it designed to be recycled? The best solutions are not about asking people to recycle more — they are about designing products that make recycling automatic.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">Learn More</p>
                  <p>
                    <a href="https://recycap.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 font-medium">
                      recycap.com
                    </a>
                    {' '}— company information and REACT® technology details.
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

export default function WayneComicRecyCap() {
  const totalStrips = strips.length;
  return (
    <>
      <SEOHead
        title="Startup Stories #10: RecyCap — The Coffee Capsule Recycling Machine | Wayne's Comics"
        description="A parent-child comic series about real startups. Episode 10: RecyCap — the Spanish startup that built an automated machine to recycle coffee capsules, solving the convenience paradox of single-serve coffee waste."
        ogImage="/images/comics/recycap/cover.jpg"
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
          <img src="/images/comics/recycap/cover.jpg" alt="Startup Stories #10: RecyCap — automated coffee capsule recycling" className="w-full h-auto" />
        </div>
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-bold rounded-full uppercase tracking-wide">
            Startup Stories · Episode 10 of 25
          </span>
          <span className="text-xs text-slate-400">June 2026 · {totalStrips} strips · 🇪🇸 Spain</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3 leading-tight">
          The Machine That Eats Coffee Capsules
        </h1>
        <p className="text-slate-500 leading-relaxed mb-5 max-w-2xl">
          7 billion coffee capsules per year. 70% end up in landfills. Aluminum takes 500 years to decompose. 
          RecyCap built a machine that solves the convenience paradox — automatically separating grounds from shells 
          so recycling is as easy as making the coffee. Episode 10 of 25 real startup stories.
        </p>
        <ShareBar
          title="Startup Stories #10: RecyCap — The Coffee Capsule Recycling Machine"
          summary="A 3-strip parent-child comic about RecyCap — the Spanish startup building automated coffee capsule recycling machines for homes and offices."
        />
      </motion.div>

      <div className="space-y-6 mb-10">
        {strips.map((strip, i) => (
          <motion.div key={strip.number} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.1 + i * 0.07 }}>
            <StripCard strip={strip} total={totalStrips} />
          </motion.div>
        ))}
      </div>

      <AboutRecyCap />

      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.4 }}
        className="flex items-center justify-between py-6 border-t border-slate-200 mb-10"
      >
        <Link to="/wayne/comics" className="text-sm text-slate-400 hover:text-slate-700 transition-colors">
          ← All Comics
        </Link>
        <ShareBar title="Startup Stories #10: RecyCap" summary="A parent-child comic about the Spanish startup making coffee capsule recycling automatic with REACT technology." />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.45 }}
        className="bg-indigo-600 rounded-2xl px-8 py-10 text-center text-white"
      >
        <h2 className="text-xl font-bold mb-2">More startup stories coming</h2>
        <p className="text-indigo-100 text-sm mb-6 max-w-md mx-auto">
          This is Episode 10 of 25. Each story is about a real company solving a real problem — told in a way that makes sense to a 15-year-old, with analysis for the parent reading along.
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
