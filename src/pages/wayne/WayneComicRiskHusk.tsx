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
    title: 'The Other Rice Crisis: 2 Million Tons of Ash',
    teaser:
      'Every year, India produces 2-3 million tons of rice husk ash — a waste product from burning rice hulls for energy. It has no commercial value, pollutes the air, and companies pay to dump it.',
    image: '/images/comics/risk-husk/strip-1.jpg',
    imageAlt:
      'Luna and Wayne walk through a rice farm in India — rice husks burn, creating clouds of ash. Wayne explains that millions of tons of this ash have no commercial value and cause serious pollution.',
    story: [
      'India is one of the world\'s largest rice producers. Every harvest season, mountains of rice husks — the hard outer shell of the rice grain — pile up across the country. Many farmers and power plants burn these husks for biomass energy, which is actually a good use. But the burning process creates a new problem: rice husk ash. India generates 2 to 3 million tons of this ash every year.',
      'Rice husk ash is a light, dusty powder with almost no commercial value. It is bulky, difficult to transport, and expensive to dispose of. Most of it gets dumped in open fields or waterways, where it creates air and water pollution. For power plants that burn rice husks, the ash is an environmental liability — something they pay to get rid of, eating into their profits.',
      'Here is the irony: rice husk ash is 85-90% silica — the same material that manufacturers pay to mine from riverbeds to produce "precipitated silica," a key ingredient in tires, toothpaste, food additives, and paint thickeners. The silica mining process is energy-intensive, produces massive CO2 emissions, and destroys river ecosystems. One industry has a waste problem it pays to dispose of. Another industry creates an environmental disaster to get the same material. The missing link is obvious: turn one industry\'s waste into the other industry\'s raw material.',
    ],
    facts: (
      <>
        <p><strong>2-3 million tons</strong> of rice husk ash generated annually in India alone — a massive and growing waste problem.</p>
        <p><strong>Rice husk ash</strong> is 85-90% silica — chemically very similar to the silica mined from riverbeds for industrial use.</p>
        <p><strong>Traditional silica production</strong> relies on mining river sand — a process that destroys river ecosystems, consumes massive energy, and generates significant CO2 emissions.</p>
        <p><strong>Precipitated silica</strong> is a $5B+ global market — used in tires, toothpaste, food, paint, rubber, and countless other products.</p>
        <p><strong>The missing link:</strong> One industry pays to get rid of silica-rich waste. Another industry pays to extract virgin silica from nature. Both would benefit from connecting the two.</p>
      </>
    ),
    lesson: (
      <>
        <p>The rice husk ash problem is a textbook example of "industrial symbiosis" — where one industry\'s waste becomes another\'s raw material. These opportunities are everywhere if you look for them. A paper mill\'s waste heat could warm a nearby greenhouse. A brewery\'s spent grain could feed cattle. A data center\'s waste heat could heat homes.</p>
        <p>The key skill is recognizing that "waste" is not a physical property — it is an information gap. Something is waste only because we have not figured out what else to do with it. Every waste stream represents a design failure in the larger industrial system. Fixing that failure — connecting the waste producer with the potential user — is both a business opportunity and an environmental solution.</p>
      </>
    ),
    lessonTitle: 'Waste Is Just a Design Flaw',
    tip: 'Ask your child: "What is the most common thing our family throws away?" Food scraps? Cardboard boxes? Plastic bottles? Then ask: "What could someone do with that instead of throwing it away?" Food scraps become compost. Cardboard gets recycled. Plastic bottles become fabric. This exercise teaches that "waste" is not a thing — it\'s a destination. Almost everything we throw away has value somewhere else. The companies that figure out how to connect the "thrower" with the "needer" solve both an environmental and an economic problem.',
  },
  {
    number: 2,
    tag: 'The Solution',
    tagColor: 'bg-amber-100 text-amber-700',
    title: 'Turning Rice Waste Into Car Tires',
    teaser:
      'Brisil Technologies developed a zero-waste process to transform rice husk ash into high-performance silica for the tire industry — cheaper than mined silica and with a fraction of the environmental cost.',
    image: '/images/comics/risk-husk/strip-2.jpg',
    imageAlt:
      'Rice husks being processed into white silica powder that makes concrete and tires stronger. Wayne explains the chemistry behind the transformation.',
    story: [
      'Brisil Technologies, founded by chemical engineer Tanmay Pandya in 2016, built exactly this bridge. The company developed a patented, zero-waste process that takes rice husk ash and converts it into high-performance precipitated silica — a white powder that is a critical additive in tire manufacturing, toothpaste, paints, and food products. The process is cleaner, cheaper, and more energy-efficient than mining and processing river sand.',
      'The company\'s origin story is a classic case of "market-pull innovation." Brisil did not start with a technology looking for a problem. It started with a problem — a large Indian power company that generated massive amounts of rice husk ash from its biomass plant and was desperate for a solution. The power company approached Pandya\'s team because they needed a way to dispose of their ash liability. This real-world demand pushed Brisil to develop the technology that eventually became their core business.',
      'The breakthrough moment came when Brisil secured a contract with a major tire manufacturer. But the contract came with a brutal requirement: pass a six-month audit by a top Japanese quality consulting firm. This forced Brisil to transform from a small R&D company into a disciplined manufacturing operation. They implemented full quality management systems — control plans, process quality control, standard operating procedures for everything from defect detection to customer complaints. They passed the audit and won a contract covering 50% of their production capacity. This experience taught them a lesson that applies to every deep-tech startup: your patent gets you in the door, but your operating discipline determines how far you go.',
    ],
    facts: (
      <>
        <p><strong>Brisil Technologies:</strong> Founded 2016 in India by Tanmay Pandya (IIT BHU chemical engineering graduate).</p>
        <p><strong>Zero-waste patented process:</strong> Converts rice husk ash into high-performance precipitated silica — comparable quality to mined silica, lower cost, much lower environmental impact.</p>
        <p><strong>Market-pull origin:</strong> The company did not start with a technology — it started when a power company with a rice husk ash problem asked Pandya\'s team for a solution.</p>
        <p><strong>Major tire manufacturer contract:</strong> Won after passing a grueling 6-month quality audit by Japanese consultants — transforming Brisil from R&D shop to disciplined manufacturer.</p>
        <p><strong>50% capacity utilization</strong> from that single contract — a validation of both technology and operational capability.</p>
        <p><strong>Global awards:</strong> Recognized by Lockheed Martin-UNIDO Clean Tech Innovation program and other international bodies.</p>
        <p><strong>Investors:</strong> CIIE (IIM Ahmedabad\'s innovation and incubation center) and others.</p>
      </>
    ),
    lesson: (
      <>
        <p>Brisil\'s story contains a critical lesson about the difference between invention and commercialization. The patent was necessary but not sufficient. What truly unlocked Brisil\'s growth was the grueling quality audit — the process of transforming from a company that "has a great technology" to a company that "can reliably deliver industrial-grade product."</p>
        <p>This is a painful but essential transition that every deep-tech startup must make. In the lab, your process works 80% of the time and that is fine. In industrial manufacturing, it must work 99.99% of the time, and every defect costs real money. The companies that make this transition successfully are the ones that build real businesses — not just interesting technologies.</p>
      </>
    ),
    lessonTitle: 'From Invention to Manufacturing Discipline',
    tip: 'Ask your child: "If you baked three perfect cookies in your kitchen, does that mean you could open a bakery?" The answer reveals the gap between "invention" (making something work once) and "manufacturing" (making it work reliably, at scale, every time). Brisil\'s breakthrough was not just the chemical process — it was building the systems to produce consistent quality, day after day, for demanding customers. This is a lesson that applies to any skill: the difference between "I can do this" and "I can do this reliably, every time, under pressure."',
  },
  {
    number: 3,
    tag: 'The Strategy',
    tagColor: 'bg-indigo-100 text-indigo-700',
    title: 'Circular Economy That Actually Makes Money',
    teaser:
      'Brisil\'s business model is not built on being "green." It is built on being cheaper and better. The environmental benefit is a free byproduct of a superior economic proposition.',
    image: '/images/comics/risk-husk/strip-3.jpg',
    imageAlt:
      'Wayne explains Brisil\'s standardized process to Luna — turning rice husk ash waste into high-value silica through a zero-waste patented chemical process.',
    story: [
      'Brisil\'s business model is a masterclass in circular economy done right. The key insight: they do not charge a premium for being "sustainable." Their product is cheaper than mined silica because their raw material (rice husk ash) has a negative cost — power companies pay Brisil to take it away. On the other end, their manufacturing process is more energy-efficient than traditional silica production because the ash is already partially processed by the biomass boiler.',
      'This creates a powerful triple win. For the power plant: their waste liability disappears. For the tire manufacturer: they get cheaper, equally high-quality silica. For the environment: no riverbed mining, less energy consumption, less landfill waste. Nobody pays a "green premium." Every participant in the value chain makes or saves money by participating. The environmental benefit is a free byproduct of a superior economic proposition.',
      'Brisil\'s expansion plans reflect confidence in the model: three new factories in India and two overseas in the coming years. The global market for precipitated silica exceeds $5 billion and is growing, driven by demand for "green tires" (low rolling resistance tires that improve fuel efficiency). Regulations in the EU, China, and elsewhere increasingly require or incentivize the use of sustainable materials in tire manufacturing. Brisil is positioned at the intersection of a regulatory tailwind, a cost advantage, and an environmental imperative — a sweet spot that every startup should aspire to occupy.',
    ],
    facts: (
      <>
        <p><strong>Cheaper raw material:</strong> Rice husk ash has negative cost — power plants pay Brisil to take it. Mined silica requires expensive extraction and processing.</p>
        <p><strong>Lower energy costs:</strong> The ash is already pre-processed by biomass combustion — less energy needed for final processing vs. mining and refining sand.</p>
        <p><strong>Triple win:</strong> Power plant (waste solved) → Brisil (profit) → Tire company (cheaper silica) → Environment (no mining, less energy, less landfill).</p>
        <p><strong>Global silica market:</strong> $5B+ and growing. Driven by "green tire" regulations in EU, China, and elsewhere that require sustainable materials.</p>
        <p><strong>Expansion:</strong> 3 new factories in India + 2 overseas planned.</p>
        <p><strong>Key metric:</strong> Every ton of Brisil silica produced prevents: riverbed mining for virgin silica, CO2 emissions from traditional processing, and rice husk ash ending up in landfills or waterways.</p>
      </>
    ),
    lesson: (
      <>
        <p>The phrase "circular economy" is often associated with higher costs — recycling is more expensive than virgin production, so it requires subsidies or consumer willingness to pay more. Brisil disproves this. Their circular model is not more expensive — it is cheaper. The circularity is a free byproduct of a better business model.</p>
        <p>This is the gold standard for sustainable business: when the "green" option is also the "cheap" option, adoption is not a question of values — it is a question of information. Once tire companies know they can save money by buying Brisil\'s silica, the decision is obvious. No marketing required. No "save the planet" messaging needed. The price signal does all the work.</p>
      </>
    ),
    lessonTitle: 'Green Is Free',
    tip: 'Ask your child: "If there was a pencil that cost the same as a regular pencil but was made from recycled materials and worked even better, would you buy it?" The answer is obviously yes. You would not need to "care about the environment" — you would just be buying the better pencil. Brisil\'s insight is that the most powerful sustainable businesses are not more expensive — they are cheaper. They find waste that has negative value and turn it into something valuable. This is a much more powerful model than asking people to pay more for eco-friendly products.',
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

function AboutBrisil() {
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
            <span className="text-indigo-600 text-sm font-bold">BR</span>
          </div>
          <div>
            <p className="font-bold text-slate-800">About Brisil Technologies</p>
            <p className="text-xs text-slate-400 mt-0.5">Turning rice husk ash into high-performance silica</p>
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
                  <p className="font-semibold text-slate-800 mb-1">What Brisil Does</p>
                  <p>Brisil converts rice husk ash — a waste product from biomass power plants — into high-performance precipitated silica for the tire, rubber, and consumer goods industries. Zero-waste process, lower cost than mined silica, significant environmental benefits.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">The Technology</p>
                  <p>Patented zero-waste chemical process that transforms rice husk ash (85-90% silica) into high-grade precipitated silica. More energy-efficient than traditional sand mining and processing. Comparable quality to virgin silica at lower cost.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">The Business Model</p>
                  <p>Circular economy without green premium: raw material has negative cost (power plants pay for disposal), manufacturing is more energy-efficient, and the product sells at competitive prices. Triple win: power plant, tire company, and environment all benefit without subsidy.</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-slate-800 mb-1">The Founder</p>
                  <p>Tanmay Pandya — IIT BHU chemical engineering graduate. Previously co-founded Bridgedots (clean tech startup). Founded Brisil in 2016 after being approached by a power company desperate for a rice husk ash solution.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">Why It Matters for Kids</p>
                  <p>This story teaches "systems thinking" — seeing how different industries connect. Most people see a rice farm, a power plant, and a tire factory as separate things. Brisil saw them as parts of one system where the waste of one is the fuel of another. This ability to connect seemingly unrelated dots is one of the most valuable thinking skills a child can develop. It is also a great example of how the most profitable sustainable businesses are often cheaper than the destructive alternatives — not more expensive.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">Learn More</p>
                  <p>
                    <a href="https://www.brisil.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 font-medium">
                      brisil.com
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

export default function WayneComicRiskHusk() {
  const totalStrips = strips.length;
  return (
    <>
      <SEOHead
        title="Startup Stories #16: Brisil Technologies — Turning Rice Waste Into Car Tires | Wayne's Comics"
        description="A parent-child comic series about real startups. Episode 16: Brisil Technologies — an Indian company turning 2-3 million tons of rice husk ash waste into high-performance silica for the tire industry, cheaper than mining river sand."
        ogImage="/images/comics/risk-husk/cover.jpg"
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
          <img src="/images/comics/risk-husk/cover.jpg" alt="Startup Stories #16: Brisil — turning rice husk ash into tire-grade silica" className="w-full h-auto" />
        </div>
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-bold rounded-full uppercase tracking-wide">
            Startup Stories · Episode 16 of 25
          </span>
          <span className="text-xs text-slate-400">June 2026 · {totalStrips} strips · 🇮🇳 India</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3 leading-tight">
          Turning Rice Waste Into Car Tires
        </h1>
        <p className="text-slate-500 leading-relaxed mb-5 max-w-2xl">
          India generates 2-3 million tons of rice husk ash every year — a waste product with no 
          commercial value that pollutes air and water. But rice husk ash is 85% silica — the same 
          material tire companies pay to mine from riverbeds. Brisil built a zero-waste process to 
          connect these dots, and it is cheaper than the destructive alternative. Episode 16 of 25.
        </p>
        <ShareBar
          title="Startup Stories #16: Brisil Technologies — Rice Waste to Silica"
          summary="A 3-strip parent-child comic about Brisil Technologies — turning rice husk ash waste into high-performance silica for the tire industry."
        />
      </motion.div>

      <div className="space-y-6 mb-10">
        {strips.map((strip, i) => (
          <motion.div key={strip.number} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.1 + i * 0.07 }}>
            <StripCard strip={strip} total={totalStrips} />
          </motion.div>
        ))}
      </div>

      <AboutBrisil />

      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.4 }}
        className="flex items-center justify-between py-6 border-t border-slate-200 mb-10"
      >
        <Link to="/wayne/comics" className="text-sm text-slate-400 hover:text-slate-700 transition-colors">
          ← All Comics
        </Link>
        <ShareBar title="Startup Stories #16: Brisil" summary="A parent-child comic about converting rice husk ash waste into tire-grade silica at lower cost than mining." />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.45 }}
        className="bg-indigo-600 rounded-2xl px-8 py-10 text-center text-white"
      >
        <h2 className="text-xl font-bold mb-2">More startup stories coming</h2>
        <p className="text-indigo-100 text-sm mb-6 max-w-md mx-auto">
          This is Episode 16 of 25. Each story is about a real company solving a real problem — told in a way that makes sense to a 15-year-old, with analysis for the parent reading along.
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
