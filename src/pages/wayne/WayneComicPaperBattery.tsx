import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { SEOHead } from '../../components/SEOHead';
import { ShareBar } from '../../components/ShareBar';
import { CommentSection } from '../../components/CommentSection';

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
    title: 'The Dirty Secret Behind "Clean" Energy',
    teaser:
      'Electric cars, solar panels, and smartphones all rely on lithium-ion batteries — which require cobalt mining, explode when damaged, and are nearly impossible to recycle.',
    image: '/images/comics/paper-battery/strip-1.jpg',
    imageAlt:
      'A paper battery demonstration — a flexible, bendable thin sheet that powers a small device. Wayne explains how this biodegradable battery could replace lithium-ion in many applications.',
    story: [
      'Here is the uncomfortable truth about our "clean energy" future: lithium-ion batteries — the technology powering everything from Teslas to iPhones — have serious problems. They rely on lithium, cobalt, and nickel — materials that are expensive, geographically concentrated, and often mined under questionable conditions. Over 60% of the world\'s cobalt comes from the Democratic Republic of Congo, where artisanal mining has well-documented human rights concerns. The supply chain is fragile, geopolitically tense, and anything but "green."',
      'Then there is the safety problem. Lithium-ion batteries contain a flammable liquid electrolyte. When damaged, overcharged, or overheated, they can enter "thermal runaway" — a chain reaction where the battery generates more heat than it can dissipate, leading to fire or explosion. This is why you hear about e-bikes, laptops, and even electric cars catching fire. The risk is small but real — and manufacturers manage it by adding heavy, expensive safety systems that add weight, cost, and complexity.',
      'And what happens at the end of life? Battery recycling is energy-intensive, expensive, and inefficient. The vast majority of lithium-ion batteries — perhaps 95% — end up in landfills, where they leak toxic chemicals into the soil. The very technology we rely on to build a sustainable future creates its own toxic waste problem. It is a paradox that a Singapore startup called Flint decided to solve — not by improving lithium batteries, but by replacing them with something completely different.',
    ],
    facts: (
      <>
        <p><strong>Lithium-ion problems:</strong> Expensive materials (lithium, cobalt, nickel), fragile supply chains, flammable liquid electrolyte, low recycling rates (~5%).</p>
        <p><strong>60%+ of global cobalt</strong> comes from the Democratic Republic of Congo — significant human rights concerns in artisanal mining operations.</p>
        <p><strong>Thermal runaway risk:</strong> When damaged or overheated, lithium batteries can catch fire or explode. Safety systems add weight and cost.</p>
        <p><strong>~95% of lithium batteries</strong> end up in landfills — recycling is energy-intensive, expensive, and inefficient.</p>
        <p><strong>Flint\'s insight:</strong> Rather than making lithium slightly better, replace it with zinc, manganese, and paper — abundant, cheap, non-toxic materials.</p>
      </>
    ),
    lesson: (
      <>
        <p>Flint is a great example of "first principles thinking." Most battery companies try to make lithium-ion slightly better — higher energy density, faster charging, safer chemistry within the same framework. Flint asked a more fundamental question: what if the entire lithium framework is wrong? What if we start from the properties we want (safe, cheap, sustainable, good performance) and work backward to find the right chemistry, rather than starting with lithium and trying to fix its flaws?</p>
        <p>This is a crucial thinking skill: don\'t optimize a broken system. Redesign it from scratch around your actual goals.</p>
      </>
    ),
    lessonTitle: 'First Principles, Not Incremental Improvement',
    tip: 'Ask your child: "If you had to design a snack that was healthy, cheap, and delicious, would you start with a candy bar and try to make it healthier — or start from scratch?" Most people would start with the candy bar. The first-principles approach starts with the goals and works backward. Flint did this with batteries: instead of making lithium safer, they asked "what materials would make the perfect battery?" and ended up with zinc, manganese, and paper — things you could eat.',
  },
  {
    number: 2,
    tag: 'The Innovation',
    tagColor: 'bg-amber-100 text-amber-700',
    title: 'A Battery Made of Paper, Zinc, and Manganese',
    teaser:
      'Flint\'s battery is printed on cellulose paper, uses zinc and manganese instead of lithium, and is so safe you can cut it, bend it, or hold it to a flame without it catching fire.',
    image: '/images/comics/paper-battery/strip-2.jpg',
    imageAlt:
      'Luna looks disappointed looking at a phone battery — the paper battery is lower energy density than lithium, but so much safer and cheaper that it wins for most applications.',
    story: [
      'Flint\'s battery is built from three ingredients that are almost absurdly ordinary. The anode is made of zinc — the same stuff in vitamin supplements and galvanized roofing. The cathode is manganese — a common mineral. The structural substrate is cellulose paper. All three are abundant, non-toxic, and biodegradable. Instead of the flammable liquid electrolyte in lithium batteries, Flint uses a water-based hydrogel — essentially a gelatin-like substance that is completely non-flammable.',
      'The manufacturing process is equally elegant. Flint uses screen-printing technology to deposit the electrodes onto cellulose paper, similar to how you might print a T-shirt design. The whole thing is then coated with the hydrogel and vacuum-baked to create a flexible, paper-thin energy storage sheet. The result is a battery that can be bent, folded, cut, and even punctured without catching fire or leaking toxic chemicals. In fact, Flint\'s batteries can be exposed to an open flame and continue working briefly before burning away harmlessly — something that would cause a lithium battery to explode.',
      'The environmental end-of-life story is remarkable. When a Flint battery is spent, it can be composted. In soil, it degrades completely in 4 to 6 weeks. The zinc and manganese can be recovered and reused. The organic parts (cellulose and hydrogel) simply biodegrade. No toxic waste. No expensive recycling plants. No 500-year landfill burden. And the estimated production cost? Roughly one-tenth the cost of a lithium-ion battery — because zinc, manganese, and paper are orders of magnitude cheaper than lithium, cobalt, and nickel.',
    ],
    facts: (
      <>
        <p><strong>Materials:</strong> Zinc anode, manganese cathode, cellulose paper substrate, water-based hydrogel electrolyte. All abundant, non-toxic, biodegradable.</p>
        <p><strong>Safety:</strong> Non-flammable, non-explosive, non-toxic. Can be cut, punctured, bent, or exposed to flame without thermal runaway or toxic leak.</p>
        <p><strong>Manufacturing:</strong> Screen-printed on cellulose paper — compatible with existing lithium battery production lines (no new factory needed).</p>
        <p><strong>End of life:</strong> Fully compostable — degrades in soil in 4-6 weeks. Zinc and manganese can be recovered. Organic parts biodegrade.</p>
        <p><strong>Cost:</strong> ~10% of lithium-ion production cost. Target: under $50/kWh — far below lithium\'s current cost.</p>
        <p><strong>Energy density:</strong> Comparable to lithium by weight, but 30-40% larger by volume — ideal for non-space-constrained applications.</p>
        <p><strong>Flexibility:</strong> Can be bent, folded, and shaped — enabling battery designs impossible with rigid lithium cells (e.g., integrated into watch bands or clothing).</p>
      </>
    ),
    lesson: (
      <>
        <p>Flint\'s battery is a masterclass in "elegant engineering" — using the simplest possible materials to achieve the desired outcome. Zinc, manganese, and paper have been around for centuries. The innovation was in how they were combined: a water-based hydrogel that simultaneously serves as separator and electrolyte, and a screen-printing process that makes manufacturing cheap and scalable.</p>
        <p>The key insight: the most elegant solutions often use common materials in clever ways rather than exotic materials in obvious ways. Zinc and paper are not magical — the magic is in the engineering that makes them work together as a high-performance battery.</p>
      </>
    ),
    lessonTitle: 'Elegant Engineering: Simple Materials, Clever Design',
    tip: 'Ask your child: "What are some of the most common materials in the world?" Dirt. Water. Wood. Sand. Glass. Then ask: "What amazing things can you build with just these?" Houses (wood, dirt, glass). Computers (sand = silicon). Now: what if someone told you that the next generation of batteries is made from paper and zinc — stuff you could find in a school supply closet? That is the power of clever engineering: taking ordinary things and making them extraordinary through smart design.',
  },
  {
    number: 3,
    tag: 'The Strategy',
    tagColor: 'bg-indigo-100 text-indigo-700',
    title: 'The Green Discount: 90% Cheaper and Much Safer',
    teaser:
      'Flint\'s key insight: sustainable products should cost less, not more. By targeting 90% cost reduction vs. lithium, Flint makes the green choice the obvious economic choice.',
    image: '/images/comics/paper-battery/strip-3.jpg',
    imageAlt:
      'Luna and Wayne look at a medical device powered by a paper battery — a flexible patch that monitors health signals, showing how the paper battery\'s safety and flexibility unlock applications lithium cannot serve.',
    story: [
      'Flint\'s business strategy is as innovative as its technology. CEO Carlo Charles made two critical decisions that set the company apart. First: "embedded disruption." Flint designed its chemical formula to be compatible with existing lithium-ion production lines. Manufacturers do not need billion-dollar "giga-factories" to make Flint batteries — they can use the equipment they already have, just with different raw materials. This turns every battery factory on the planet into a potential manufacturing partner, not a competitor.',
      'Second: the "green discount." For decades, sustainable products cost more than their dirty alternatives. Organic food, electric cars, solar panels — all carried a "green premium" that limited adoption to the affluent or ideologically committed. Flint\'s zinc-manganese-paper formula is inherently cheaper than lithium-cobalt chemistry — roughly 90% lower material cost. Target price: under $50 per kilowatt-hour, compared to lithium\'s $100-150. For the first time, the sustainable choice is also the cheaper choice. The buyer does not need to care about the environment — they just need to want to save money.',
      'The go-to-market strategy is equally smart: start where the advantages matter most. Flint\'s initial products target applications that leverage its unique strengths — flexibility, safety, thinness — where lithium\'s higher energy density is unnecessary. Think wearable devices (batteries built into watch bands), medical sensors (flexible patches that cannot catch fire), IoT sensors, and even CubeSats (space satellites where every gram of weight saved reduces launch costs). Once the manufacturing scale is proven, Flint plans to expand into larger applications: energy storage, and eventually — if the volume challenge can be solved — electric vehicles.',
    ],
    facts: (
      <>
        <p><strong>Embedded disruption:</strong> Flint\'s chemistry is designed to work on existing lithium-ion production lines — no new factories required.</p>
        <p><strong>Green discount:</strong> ~90% lower material cost vs. lithium. Target: under $50/kWh vs. lithium\'s $100-150/kWh.</p>
        <p><strong>CEO Carlo Charles:</strong> Filipino-born inventor, NTU mechanical engineering graduate. Previously developed climate tech solutions recognized by Google and IUCN.</p>
        <p><strong>Funding:</strong> $2M seed round led by Hatcher+ and global angel syndicate.</p>
        <p><strong>Awards:</strong> TechCrunch Disrupt Startup Battlefield finalist (2023, one of 20 from 3,200+ applicants). CES 2025 Best Sustainability Award.</p>
        <p><strong>First customer:</strong> Paid pilot with a global enterprise + 20+ companies interested from defense, consumer electronics, EV, and space sectors.</p>
        <p><strong>Initial markets:</strong> Wearables, medical devices, IoT sensors, CubeSats — applications where flexibility, safety, and thinness matter more than raw energy density.</p>
        <p><strong>Production roadmap:</strong> Pilot facility in Singapore → scaling to China, India, US, Vietnam.</p>
      </>
    ),
    lesson: (
      <>
        <p>Flint\'s "embedded disruption" strategy is a textbook example of how to commercialize a radical technology. By making the new technology work within the existing manufacturing infrastructure, Flint avoids the "chicken-and-egg" problem that kills most hardware startups: you cannot sell without volume, and you cannot get volume without a factory, and you cannot build a factory without customers. Flint\'s solution: don\'t build a new factory — make your battery work in existing ones.</p>
        <p>The green discount concept is equally powerful. The environmental movement has spent decades trying to convince people to pay more for sustainable products. Flint\'s insight: don\'t ask people to pay more. Make the sustainable option the cheaper one, and the adoption problem solves itself. This shifts the conversation from "save the planet" (which appeals to values) to "save money" (which appeals to self-interest) — a much larger market.</p>
      </>
    ),
    lessonTitle: 'Embedded Disruption + Green Discount',
    tip: 'Ask your child: "If a new video game console required you to buy all-new controllers that only work with that console, would you buy it?" Probably not. But if you could use your existing controllers? Much easier. Flint\'s "embedded disruption" is the same idea — make the new thing work with the old equipment so there is no barrier to switching. This is a powerful strategy for any invention: don\'t ask people to change everything. Fit into what they already have, and make switching easy.',
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

function AboutFlint() {
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
            <span className="text-indigo-600 text-sm font-bold">FL</span>
          </div>
          <div>
            <p className="font-bold text-slate-800">About Flint (SparkByFlint)</p>
            <p className="text-xs text-slate-400 mt-0.5">Biodegradable paper batteries for a safer, cheaper energy future</p>
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
                  <p className="font-semibold text-slate-800 mb-1">What Flint Does</p>
                  <p>Flint (SparkByFlint) develops biodegradable paper batteries using zinc, manganese, and cellulose — replacing lithium, cobalt, and nickel. The batteries are non-flammable, flexible, compostable, and cost roughly 10% of lithium-ion to produce.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">The Technology</p>
                  <p>Screen-printed zinc-manganese electrodes on cellulose paper with a water-based hydrogel electrolyte. Quasi-solid structure makes it non-flammable, cut/puncture resistant, and fully compostable (4-6 weeks in soil). Compatible with existing lithium battery production lines.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">The Business Model</p>
                  <p>IP licensing to existing battery manufacturers — Flint does not build factories. "Embedded disruption" strategy: chemical formula designed to work on standard lithium-ion production equipment. Initial focus on wearables, medical devices, IoT sensors, and space applications.</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-slate-800 mb-1">The Founder</p>
                  <p>Carlo Charles — Filipino inventor, NTU mechanical engineering graduate. Over 8 years of climate tech R&D experience before founding Flint. Licensed the paper battery technology from NTU\'s research team. Started Flint in 2021 with co-founders Bryan Chng and Jeremy Wee.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">Why It Matters for Kids</p>
                  <p>This story is about material science and first-principles thinking. Most people accept that batteries need lithium because "that is how it has always been." Flint asked: "What if we ignore how batteries are made today and design the ideal battery from scratch?" This kind of questioning — challenging assumptions about "how things are done" — is one of the most valuable thinking skills a child can develop. Paper batteries also show that the most innovative solutions sometimes come from using ordinary materials in extraordinary ways.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">Learn More</p>
                  <p>
                    <a href="https://www.madebyflint.co" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 font-medium">
                      madebyflint.co
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

export default function WayneComicPaperBattery() {
  const totalStrips = strips.length;
  return (
    <>
      <SEOHead
        title="Startup Stories #15: Flint — The Biodegradable Paper Battery | Wayne's Comics"
        description="A parent-child comic series about real startups. Episode 15: Flint — a Singapore startup making paper batteries from zinc, manganese, and cellulose that are non-flammable, flexible, fully compostable, and 90% cheaper than lithium-ion."
        ogImage="/images/comics/paper-battery/cover.jpg"
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
          <img src="/images/comics/paper-battery/cover.jpg" alt="Startup Stories #15: Flint — paper battery" className="w-full h-auto" />
        </div>
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-bold rounded-full uppercase tracking-wide">
            Startup Stories · Episode 15 of 25
          </span>
          <span className="text-xs text-slate-400">June 2026 · {totalStrips} strips · 🇸🇬 Singapore</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3 leading-tight">
          The Battery Made of Paper, Zinc, and Manganese
        </h1>
        <p className="text-slate-500 leading-relaxed mb-5 max-w-2xl">
          Lithium-ion batteries power our world — but they rely on conflict minerals, catch fire when 
          damaged, and 95% end up in landfills. Flint\'s paper battery replaces lithium with zinc, 
          manganese, and cellulose — it is non-flammable, bendable, compostable in 6 weeks, and 
          costs 90% less to produce. Episode 15 of 25.
        </p>
        <ShareBar
          title="Startup Stories #15: Flint — The Biodegradable Paper Battery"
          summary="A 3-strip parent-child comic about Flint — making paper batteries from zinc, manganese, and cellulose that are safer, cheaper, and compostable."
        />
      </motion.div>

      <div className="space-y-6 mb-10">
        {strips.map((strip, i) => (
          <motion.div key={strip.number} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.1 + i * 0.07 }}>
            <StripCard strip={strip} total={totalStrips} />
          </motion.div>
        ))}
      </div>

      <AboutFlint />

      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.4 }}
        className="flex items-center justify-between py-6 border-t border-slate-200 mb-10"
      >
        <Link to="/wayne/comics" className="text-sm text-slate-400 hover:text-slate-700 transition-colors">
          ← All Comics
        </Link>
        <ShareBar title="Startup Stories #15: Flint" summary="A parent-child comic about biodegradable paper batteries that are safer, cheaper, and greener than lithium-ion." />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.45 }}
        className="bg-indigo-600 rounded-2xl px-8 py-10 text-center text-white"
      >
        <h2 className="text-xl font-bold mb-2">More startup stories coming</h2>
        <p className="text-indigo-100 text-sm mb-6 max-w-md mx-auto">
          This is Episode 15 of 25. Each story is about a real company solving a real problem — told in a way that makes sense to a 15-year-old, with analysis for the parent reading along.
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
      <CommentSection />
    </>
  );
}
