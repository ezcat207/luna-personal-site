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
    tag: 'The Blind Spot',
    tagColor: 'bg-red-100 text-red-700',
    title: 'The Energy Problem Nobody Talks About',
    teaser:
      'Electric cars get all the attention. But the biggest source of industrial CO2 is not electricity — it is heat. And most factories still burn fossil fuels to make it.',
    image: '/images/comics/bremmiller/strip-1.jpg',
    imageAlt:
      'Luna and Wayne look at factory smokestacks. Wayne explains that most of the world\'s industrial energy is used for heat, not electricity — and almost none of it comes from clean sources.',
    story: [
      'Here is a fact that surprises most people: when we talk about "clean energy," we are usually talking about electricity — solar panels, wind turbines, electric cars. But electricity accounts for only about 20% of global energy consumption. The other 80% is dominated by heat: heating buildings, cooking food, and most of all, powering industrial processes. Industrial heat alone consumes over 50% of all industrial energy. It is the single largest use of energy in the global economy, and it is almost entirely powered by fossil fuels.',
      'The reason is structural. Factories need heat at specific temperatures — 150°C for food processing, 400°C for chemical manufacturing, 1000°C+ for steel and cement — delivered reliably, 24 hours a day, 7 days a week. Solar and wind cannot provide that consistency. Batteries can store electricity, but converting electricity back into high-temperature industrial heat is inefficient and expensive. So factories keep burning coal, oil, and natural gas. Not because they want to pollute, but because there was no clean alternative that worked at industrial scale and industrial price.',
      'This is the blind spot at the center of the climate debate. We have made remarkable progress cleaning up electricity generation. But industrial heat — which produces a massive share of global CO2 — has been nearly untouched by the clean energy revolution. Avi Brenmiller, an Israeli energy veteran who spent decades building solar thermal power plants, recognized this gap. After years of watching molten salt storage systems fail due to complexity and cost, he decided there had to be a simpler way. His insight: what if the storage medium was just... rocks?',
    ],
    facts: (
      <>
        <p><strong>Industrial heat</strong> consumes over 50% of all industrial energy — more than electricity, lighting, and transportation combined within industrial settings.</p>
        <p><strong>Global energy breakdown:</strong> Electricity is ~20% of final energy consumption. The rest is heat and fuel — mostly for industry, buildings, and transport.</p>
        <p><strong>No clean alternative exists</strong> at scale for most industrial heating applications. Fossil fuel boilers dominate because they are cheap, reliable, and proven over decades.</p>
        <p><strong>The Ashalim plant</strong> in Israel\'s Negev desert — a landmark solar thermal project — showed Avi Brenmiller that molten salt storage was too complex and expensive for widespread adoption.</p>
      </>
    ),
    lesson: (
      <>
        <p>The "industrial heat blind spot" is a perfect example of why climate change is such a difficult problem: the biggest sources of emissions are often invisible because they happen inside factories, not on roads or rooftops. The technologies we use to generate industrial heat — boilers, furnaces, kilns — have been optimized for over a century. Displacing them requires not just a cleaner alternative, but one that matches their reliability, cost, and convenience.</p>
        <p>This is a useful lesson in how progress works: the easy problems get solved first (electricity generation), and the hard problems get deferred (industrial heat). The hard problems are where the biggest opportunities currently sit — and where the most creative solutions are needed.</p>
      </>
    ),
    lessonTitle: 'The Blind Spot Problem',
    tip: 'Ask your child: "When you think of pollution, what do you picture?" Most kids picture car exhaust or factory smokestacks. Then ask: "Do you know what happens inside those factories?" The answer reveals how much of our energy system is invisible. Walk through a simple example: "Where does the heat come from to bake bread in a factory? To dry paint on a car? To make steel?" Each answer leads to "a boiler burning something" — and that is the problem Brenmiller is solving.',
  },
  {
    number: 2,
    tag: 'The Solution',
    tagColor: 'bg-amber-100 text-amber-700',
    title: 'The Giant Thermos Full of Hot Rocks',
    teaser:
      'Crushed volcanic rock, heated to 650°C, stored in a simple insulated box. No rare minerals. No complex chemistry. Just heat, held in the most basic material on Earth.',
    image: '/images/comics/bremmiller/strip-2.jpg',
    imageAlt:
      'A cross-section diagram shows the bGen thermal battery: crushed volcanic rock inside an insulated container, with electric heating elements charging it and pipes producing steam on demand.',
    story: [
      'The bGen thermal battery is almost embarrassingly simple in concept. Take crushed volcanic rock — the same material you would find in any gravel pit — and pack it into a heavily insulated steel container. Run electric heating elements through the rock to heat it to 650°C (1200°F). When heat is needed, run water or another fluid through pipes embedded in the hot rock. The water flashes to steam, which can be used directly in industrial processes or to generate electricity. Charge it with electricity; discharge it as steam, hot air, or hot thermal oil.',
      'The genius is not in any single component but in the system-level design. Molten salt — the incumbent thermal storage technology — is corrosive, requires expensive alloys for pipes and tanks, and degrades over time. Rocks have none of these problems. They are chemically inert, thermally stable through tens of thousands of cycles, cost essentially nothing, and are available everywhere on Earth. A factory in Germany uses the same rocks as a factory in Brazil. No supply chain dependency, no critical mineral sourcing, no geopolitical risk.',
      'The modular design reinforces these advantages. Each bCube module is a standardized 10-ton unit, pre-fabricated at the Dimona "gigafactory" in Israel and shipped to the customer site for assembly. Capacity scales from 10 MWh (a small factory) to over 500 MWh (a large industrial complex or power plant). The system achieves 97% heat-to-heat conversion efficiency — meaning almost all the energy put in comes back out as usable heat. And it lasts 30 years with minimal maintenance.',
    ],
    facts: (
      <>
        <p><strong>bGen storage medium:</strong> Crushed volcanic rock — chemically inert, thermally stable, available everywhere, costs effectively nothing.</p>
        <p><strong>Operating temperature:</strong> Up to 650°C (1200°F) — hot enough for most industrial processes including food processing, chemical manufacturing, and power generation.</p>
        <p><strong>97% heat-to-heat efficiency:</strong> Almost no energy lost between charging and discharging — one of the highest efficiencies in thermal storage.</p>
        <p><strong>Modular bCube design:</strong> Each module is 10 tons, pre-fabricated, and shipped as a standardized unit. System capacity: 10 MWh to 500+ MWh.</p>
        <p><strong>30-year lifespan</strong> with minimal maintenance — rocks do not degrade, corrode, or fatigue over time like batteries or molten salt systems do.</p>
        <p><strong>Versatile output:</strong> Can produce steam, hot water, hot air, or thermal oil — whichever form of heat the customer needs.</p>
      </>
    ),
    lesson: (
      <>
        <p>The bGen story is a masterclass in the power of "appropriate technology." In a world obsessed with cutting-edge complexity — solid-state batteries, hydrogen fuel cells, quantum computing — Brenmiller chose the opposite direction. He went simpler. He asked: "What is the cheapest, most abundant, most durable material that can hold heat?" The answer was rocks. That choice cascaded into every advantage the system has: low cost, long life, no supply chain risk, easy maintenance.</p>
        <p>This pattern appears across many successful innovations. The best solution is not always the most technologically advanced one. Sometimes it is the one that is just advanced enough to solve the problem while being simple enough to deploy at scale. Knowing when "good enough" is actually better than "more advanced" is a form of wisdom that experience — not technology — provides.</p>
      </>
    ),
    lessonTitle: 'Appropriate Technology: Simple Can Beat Advanced',
    tip: 'The "rocks vs. molten salt" comparison is a great way to introduce the concept of tradeoffs in engineering. Ask your child: "If you needed to store heat for a week, would you use a fancy chemical that costs $100/kg but stores more heat, or plain rocks that cost $0.01/kg but need more space?" There is no right answer — the choice depends on context. The exercise of thinking through tradeoffs is more valuable than the answer.',
  },
  {
    number: 3,
    tag: 'The Business Model',
    tagColor: 'bg-indigo-100 text-indigo-700',
    title: 'Heat as a Service: Pay Nothing, Get Steam',
    teaser:
      'Industrial customers can install a bGen system with zero upfront cost. They pay only for the clean heat they actually use — like a subscription for hot rocks.',
    image: '/images/comics/bremmiller/strip-3.jpg',
    imageAlt:
      'Wayne explains the "Heat as a Service" model to Luna — instead of buying the bGen system, factories pay a monthly fee for the clean steam it produces, with no upfront investment.',
    story: [
      'The single biggest barrier to clean industrial heat adoption is not technology — it is capital. A thermal storage system that can power a medium-sized factory costs millions of dollars upfront. Industrial companies are conservative by nature. They operate on thin margins. Asking a factory owner to write a multi-million-dollar check for an unproven technology from a startup is a very hard sell, no matter how good the technology is.',
      'Brenmiller\'s answer to this problem is "Heat as a Service" (HaaS). Under this model, Brenmiller designs, builds, owns, and operates the bGen system on the customer\'s site. The customer pays zero upfront. Instead, they sign a long-term contract to purchase the clean heat at a predictable rate — typically at or below what they currently pay for fossil-fuel-generated heat. For the customer, this transforms a risky capital investment into a manageable operating expense. For Brenmiller, it creates a long-term, recurring revenue stream and dramatically accelerates adoption.',
      'The HaaS model has a secondary benefit that is less obvious but equally important: it aligns incentives perfectly. Because Brenmiller owns the equipment, it is responsible for maintenance, performance, and uptime. If the system underperforms, Brenmiller bears the cost. The customer simply pays for the heat they receive. This removes the trust barrier that kills many industrial tech sales — the customer does not need to believe in the technology; they just need to believe in the contract. Early HaaS customers include Tempo Beverages (Israel\'s largest beverage company), Wolfson Medical Center, and a major Brazilian manufacturing firm.',
    ],
    facts: (
      <>
        <p><strong>Heat as a Service (HaaS):</strong> Customers pay $0 upfront. Brenmiller owns and operates the system. Customers pay only for the clean heat they consume.</p>
        <p><strong>Risk transfer:</strong> The customer converts a multi-million-dollar capital expense (CAPEX) into a predictable monthly operating expense (OPEX).</p>
        <p><strong>Aligned incentives:</strong> Brenmiller bears all maintenance and performance risk. If the system fails, Brenmiller loses money — not the customer.</p>
        <p><strong>Early HaaS customers:</strong> Tempo Beverages (Israel\'s largest drinks company), Wolfson Medical Center, and industrial clients in Brazil.</p>
        <p><strong>Traditional model also available:</strong> For customers who prefer to own the asset, Brenmiller offers direct equipment sales alongside HaaS.</p>
      </>
    ),
    lesson: (
      <>
        <p>The HaaS model is a specific example of a broader go-to-market strategy called "outcome-based pricing." Instead of selling a product, you sell the outcome the product produces. The customer does not buy a thermal battery; they buy reliable, clean steam. This distinction matters because it removes the customer\'s need to evaluate and trust the technology itself — they only need to trust the service level agreement.</p>
        <p>This model is gaining traction across climate tech because it solves a fundamental mismatch: climate technologies are capital-intensive, but industrial customers are capital-constrained and risk-averse. By absorbing the capital cost and performance risk, the technology provider accelerates adoption while capturing more of the long-term value. It is harder to execute than direct sales, but the market expansion it enables can be dramatically larger.</p>
      </>
    ),
    lessonTitle: 'Selling Outcomes, Not Equipment',
    tip: 'The "service instead of product" model is everywhere once you start looking: Netflix instead of buying DVDs, Spotify instead of CDs, Uber instead of owning a car. Ask your child: "What else could you buy as a service instead of owning?" Washing machines? Drills? Paint? The exercise reveals how many things could be shifted from "buy and maintain" to "pay for what you use" — and why that shift is often better for both sides.',
  },
  {
    number: 4,
    tag: 'The Frontier',
    tagColor: 'bg-emerald-100 text-emerald-700',
    title: 'From Factory Steam to AI Data Center Cooling',
    teaser:
      'Brenmiller\'s thermal battery can power factories AND cool the data centers driving the AI revolution. One technology, two of the world\'s biggest energy problems.',
    image: '/images/comics/bremmiller/strip-4.jpg',
    imageAlt:
      'Luna and Wayne look at a future city where bGen systems power factories with clean steam AND cool AI data centers — a single technology solving two huge problems.',
    story: [
      'Brenmiller\'s validation milestone came through a partnership with Enel, Italy\'s largest utility company. At the Santa Barbara natural gas power plant in Tuscany, Brenmiller installed a 24 MWh bGen system integrated into the existing facility. The goal was not to replace the plant entirely — it was to make it more flexible. By storing excess heat and releasing it when needed, the bGen system allows the plant to ramp up and down faster, compensating for the variability of solar and wind on the grid. This is called "grid flexibility," and it is becoming one of the most valuable services in energy markets as renewable penetration increases.',
      'The company\'s project pipeline has grown to over $500 million in potential commercial projects across food and beverage, consumer goods, energy, chemicals, and pharmaceuticals. The Dimona gigafactory in Israel has an annual production capacity of 4 GWh — roughly $200 million in potential output. As a publicly traded company on NASDAQ (BNRG), Brenmiller provides transparent financial reporting and operates under standard public company governance.',
      'The most exciting frontier is the recently announced bGen™Cool — a version of the thermal battery adapted for data center cooling. AI and cloud computing are driving explosive growth in data center energy demand. Cooling these facilities accounts for up to 40% of their total electricity consumption. Brenmiller\'s system can absorb excess renewable energy when it is abundant, store it as thermal energy, and use it to power absorption chillers for data center cooling on demand. This application alone could open a market larger than industrial heating — and it uses the exact same rock-based technology, just configured differently.',
    ],
    facts: (
      <>
        <p><strong>Enel pilot:</strong> 24 MWh bGen system at Enel\'s Santa Barbara gas plant in Tuscany, Italy — proving grid flexibility services alongside industrial heat.</p>
        <p><strong>$500M+ project pipeline:</strong> Across food & beverage, consumer goods, energy, chemicals, and pharmaceuticals worldwide.</p>
        <p><strong>Dimona gigafactory:</strong> 4 GWh annual production capacity (~$200M in potential output). Located in Dimona, Israel.</p>
        <p><strong>NASDAQ-listed:</strong> Ticker BNRG — transparent financial reporting and public company governance.</p>
        <p><strong>bGen™Cool (new):</strong> Thermal battery adapted for AI data center cooling. Cooling accounts for up to 40% of data center electricity consumption — a massive and rapidly growing market.</p>
      </>
    ),
    lesson: (
      <>
        <p>The bGen™Cool application illustrates a powerful strategic pattern: a platform technology that solves one hard problem often turns out to solve a completely different hard problem. Brenmiller built a thermal battery for industrial heat. It discovered, almost accidentally, that the same technology could cool data centers — a market growing faster than industrial heat due to the AI boom. The platform expands the addressable market without requiring new R&D.</p>
        <p>For anyone building a career or a company, this suggests a useful principle: develop deep capability in one area rather than shallow capability in many. If the capability is fundamental enough, new applications will find you. The rock battery was built for steam. The cooling market came looking for it.</p>
      </>
    ),
    lessonTitle: 'Platform Expansion: When One Problem Leads to Another',
    tip: 'Ask your child: "Can you think of something that was invented for one purpose but became famous for another?" Post-it Notes (failed superglue), microwave ovens (radar technology), Play-Doh (wallpaper cleaner). The pattern is common: deep capability in one area unlocks unexpected applications. The lesson: build real skill at something, and you never know which problem will turn out to need exactly that skill.',
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

function AboutBremmiller() {
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
            <span className="text-indigo-600 text-sm font-bold">BE</span>
          </div>
          <div>
            <p className="font-bold text-slate-800">About Bremmiller Energy</p>
            <p className="text-xs text-slate-400 mt-0.5">Crushed rock thermal storage for industrial heat and data center cooling</p>
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
                  <p className="font-semibold text-slate-800 mb-1">What Bremmiller Energy Does</p>
                  <p>Bremmiller Energy manufactures bGen thermal batteries that store renewable electricity as heat in crushed volcanic rock. The stored heat can be released on demand as steam, hot air, or thermal oil — replacing fossil fuel boilers in industrial processes and power plants.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">The Technology</p>
                  <p>Crushed volcanic rock is heated to 650°C inside heavily insulated steel containers. Internal heat exchangers allow the system to charge with electricity and discharge as industrial-grade heat at 97% round-trip efficiency. Each bCube module is 10 tons and pre-fabricated for rapid deployment.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">The Business Model</p>
                  <p>Dual approach: traditional equipment sales + "Heat as a Service" (HaaS) where Brenmiller owns and operates the system and customers pay only for the heat they use. HaaS removes the upfront capital barrier that blocks adoption of clean industrial technology.</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-slate-800 mb-1">The Founder</p>
                  <p>Avi Brenmiller spent decades leading solar thermal companies (Solel Solar Systems, Siemens CSP). His experience building the Ashalim solar plant in Israel\'s Negev desert convinced him that molten salt storage was too complex — and that simpler solutions using basic materials were the path forward.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">Why It Matters for Kids</p>
                  <p>Most kids (and adults) have no idea that industrial heat is one of the biggest climate problems on the planet. This story reveals an invisible world — the energy that actually makes the stuff we use every day — and shows that sometimes the most brilliant solutions are also the simplest: just heat up some rocks.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">Learn More</p>
                  <p>
                    <a href="https://bren-energy.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 font-medium">
                      bren-energy.com
                    </a>
                    {' '}— technology details, case studies, and investor information.
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

export default function WayneComicBremmiller() {
  const totalStrips = strips.length;
  return (
    <>
      <SEOHead
        title="Startup Stories #8: Bremmiller — The Rock Battery That Replaces Fossil Fuel Boilers | Wayne's Comics"
        description="A parent-child comic series about real startups. Episode 8: Bremmiller Energy — using crushed volcanic rock to store renewable energy as industrial-grade heat, replacing fossil fuel boilers with a 30-year rock battery."
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
          <img src="/images/comics/bremmiller/cover.jpg" alt="Startup Stories #8: Bremmiller Energy — the rock battery" className="w-full h-auto" />
        </div>
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-bold rounded-full uppercase tracking-wide">
            Startup Stories · Episode 8 of 25
          </span>
          <span className="text-xs text-slate-400">June 2026 · {totalStrips} strips · 🇮🇱 Israel</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3 leading-tight">
          The Rock Battery That Replaces Fossil Fuel Boilers
        </h1>
        <p className="text-slate-500 leading-relaxed mb-5 max-w-2xl">
          Industrial heat is the blind spot of the clean energy transition — over 50% of industrial energy goes to making heat, and almost all of it still comes from burning fossil fuels. Bremmiller Energy\'s bGen thermal battery stores renewable electricity as heat in crushed volcanic rock, delivering 650°C steam on demand with 97% efficiency — for 30 years, with basically no maintenance. Episode 8 of 25 real startup stories.
        </p>
        <ShareBar
          title="Startup Stories #8: Bremmiller — The Rock Battery"
          summary="A 4-strip parent-child comic about Bremmiller Energy's rock-based thermal battery replacing fossil fuel boilers in factories worldwide."
        />
      </motion.div>

      <div className="space-y-6 mb-10">
        {strips.map((strip, i) => (
          <motion.div key={strip.number} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.1 + i * 0.07 }}>
            <StripCard strip={strip} total={totalStrips} />
          </motion.div>
        ))}
      </div>

      <AboutBremmiller />

      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.4 }}
        className="flex items-center justify-between py-6 border-t border-slate-200 mb-10"
      >
        <Link to="/wayne/comics" className="text-sm text-slate-400 hover:text-slate-700 transition-colors">
          ← All Comics
        </Link>
        <ShareBar title="Startup Stories #8: Bremmiller" summary="A parent-child comic about thermal energy storage using crushed volcanic rock to replace fossil fuel boilers." />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.45 }}
        className="bg-indigo-600 rounded-2xl px-8 py-10 text-center text-white"
      >
        <h2 className="text-xl font-bold mb-2">More startup stories coming</h2>
        <p className="text-indigo-100 text-sm mb-6 max-w-md mx-auto">
          This is Episode 8 of 25. Each story is about a real company solving a real problem — told in a way that makes sense to a 15-year-old, with analysis for the parent reading along.
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
