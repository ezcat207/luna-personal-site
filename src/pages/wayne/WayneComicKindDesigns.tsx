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
    title: 'The $760 Billion Wall That Destroys the Ocean',
    teaser:
      'Miami\'s sea level has risen 8 inches since 1950 — and the pace is accelerating. The standard solution? Concrete seawalls that kill marine life and make erosion worse.',
    image: '/images/comics/kind-designs/strip-1.jpg',
    imageAlt:
      'Luna and Wayne look at a 3D-printed seawall that looks alive — textured with nooks and crannies designed for marine life to attach and grow.',
    story: [
      'Sea level rise is not a future problem for Florida. It is happening now. Miami\'s sea level has risen 8 inches since 1950, and the rate is accelerating — latest data suggests it could rise another inch every 3 years. By 2040, just building protective seawalls in Florida alone will cost an estimated $760 billion. Nationwide, the cost of protecting major coastal cities is at least $42 billion, and expanding to smaller communities pushes that past $400 billion. The market is massive, urgent, and unavoidable.',
      'The traditional solution is a vertical wall made of concrete or steel. It works — waves are blocked. But it creates three catastrophic side effects. First, ecologically: smooth concrete walls are "ocean deserts." Nothing can live on them. They destroy the intertidal habitat where fish, crabs, and birds feed and breed. Biodiversity collapses along any walled coastline. Second, structurally: the hard vertical surface does not absorb wave energy — it reflects it. This scours the seabed at the base of the wall, destabilizing it over time. Worse, the reflected energy gets transferred to adjacent unprotected shorelines, accelerating their erosion. Third, aesthetically: concrete walls are ugly and lower property values.',
      'This is the paradox of traditional coastal defense: the wall that protects your property destroys the ocean that makes your property valuable. The solution is not to stop building seawalls — the rising seas guarantee they will be built. The solution is to build a different kind of wall: one that protects the coast AND restores the ecosystem.',
    ],
    facts: (
      <>
        <p><strong>Miami sea level:</strong> 8 inches higher than 1950. Rate of rise accelerating — potentially 1 inch every 3 years.</p>
        <p><strong>$760 billion</strong> — estimated cost of building seawalls in Florida alone by 2040.</p>
        <p><strong>$42 billion minimum</strong> to protect major US coastal cities; $400+ billion including smaller communities.</p>
        <p><strong>Traditional seawalls</strong> create "ocean deserts" — smooth, vertical surfaces where nothing can live. They reflect wave energy, eroding the base of the wall and adjacent shorelines.</p>
        <p><strong>Intertidal habitat</strong> — the zone between high and low tide — is one of the most biologically productive areas on Earth. Traditional walls destroy it completely.</p>
      </>
    ),
    lesson: (
      <>
        <p>The traditional seawall embodies a design philosophy that dominated the 20th century: "conquer nature." Build a barrier, keep nature out, and do not worry about the consequences. Kind Designs represents a shift to a 21st-century philosophy: "partner with nature." Build a barrier that strengthens the ecosystem it touches.</p>
        <p>This is a crucial lesson for young minds. Many of the world\'s biggest problems are not caused by people being evil — they are caused by doing the obvious thing without considering second-order effects. The seawall that protects one property harms the next. The fertilizer that grows one crop poisons the river. The solution is not to stop solving problems — it is to design solutions that account for the system, not just the immediate symptom.</p>
      </>
    ),
    lessonTitle: 'Second-Order Thinking',
    tip: 'Ask your child: "If you build a wall to keep water out of your yard, where does the water go?" The obvious answer: your neighbor\'s yard. This is "second-order thinking" — considering not just the direct effect of your action, but the indirect effects too. Traditional seawalls are a classic case of first-order thinking (stop the waves) without second-order thinking (we kill the ocean and make erosion worse next door). Great solutions consider the whole system, not just the immediate problem.',
  },
  {
    number: 2,
    tag: 'The Solution',
    tagColor: 'bg-amber-100 text-amber-700',
    title: 'The 3D-Printed Wall That Grows an Ecosystem',
    teaser:
      'Kind Designs prints seawalls with a robotic 3D concrete printer — 20x faster than traditional methods. But the real innovation is the surface: designed to mimic mangrove roots and attract oysters, barnacles, and fish.',
    image: '/images/comics/kind-designs/strip-2.jpg',
    imageAlt:
      'Luna compares the cost of a 3D-printed living seawall to a traditional concrete wall — finding they cost the same, while one creates a thriving ecosystem and the other destroys it.',
    story: [
      'Kind Designs\' founder Anya Freeman is not a marine biologist or an engineer — she is a lawyer who moved to Miami and got tired of wading through floodwater to get home. Her outsider perspective was her superpower. Instead of trying to make better concrete walls, she asked: "What if a seawall could be designed like an artificial reef?" She combined two existing technologies — artificial reef science and high-speed 3D concrete printing — into a completely new product: the Living Seawall.',
      'The manufacturing process is radically different from traditional seawalls. Using robotic 3D concrete printers (sourced from Dutch company Cybe) that print at 500 millimeters per second with 0.5-inch layer precision, Kind Designs can produce a 10-by-10-foot seawall panel in under one hour. That is 20x faster than traditional precast concrete methods. The panels are made from a proprietary cement blend that is pH-neutral and non-toxic to marine life — unlike standard concrete, which has a high pH that poisons marine organisms. The result is strong enough to meet all building codes (5,000 psi) but safe enough to have been used in drinking water reservoirs.',
      'The ecological genius is in the surface design. The panels are textured with complex patterns — specific shapes, crevices, and cavities at least 3 inches deep — that mimic local natural habitats. In Miami, the design resembles mangrove roots, providing shelter for juvenile fish and invertebrates. In New York, the texture is optimized for barnacles and eelgrass. These textured surfaces absorb wave energy rather than reflecting it, reducing scour and protecting the wall\'s foundation. And they provide an instant home for marine life: within months of installation, oysters, mussels, sponges, and fish move in, creating a living ecosystem on what used to be a dead wall.',
    ],
    facts: (
      <>
        <p><strong>Anya Freeman, founder:</strong> Lawyer who moved to Miami and experienced flooding firsthand. Her outsider perspective allowed her to combine artificial reef science with 3D printing.</p>
        <p><strong>Robotic 3D printing:</strong> 500 mm/second print speed, 0.5-inch layer precision. A 10x10 ft panel prints in under 1 hour — 20x faster than traditional precast concrete.</p>
        <p><strong>Proprietary cement:</strong> pH-neutral, non-toxic to marine life. 5,000 psi strength. Used in drinking water reservoirs — safe enough to touch drinking water.</p>
        <p><strong>Biomimetic design:</strong> Textures mimic local habitats (mangrove roots in Miami, barnacle-friendly in New York). Complex 3D shapes absorb wave energy rather than reflecting it.</p>
        <p><strong>FIU pilot project:</strong> Within 9 months, the Living Seawall attracted 1,000+ oysters, mussels, sponges, and 8 fish species. Adjacent 30-year-old traditional seawall: zero oysters.</p>
        <p><strong>Oysters filter ~50,000 gallons/day</strong> — the Living Seawall actively cleans the water as the oysters grow.</p>
      </>
    ),
    lesson: (
      <>
        <p>Freeman\'s "adjacent innovation" strategy is a masterclass in creative problem-solving. She did not invent artificial reef science (that was already well understood) and she did not invent 3D concrete printing (the Dutch company Cybe had the technology). Her breakthrough was combining them — applying reef-design principles to seawalls using a manufacturing method that made complex shapes economically viable.</p>
        <p>The 9-month FIU pilot data is devastatingly convincing: 1,000+ oysters and 8 fish species on the Living Seawall, zero on the 30-year-old traditional wall. When you can show that kind of evidence, the sales conversation shifts from "why should we pay more for eco-friendly?" to "why would anyone still buy the old kind?"</p>
      </>
    ),
    lessonTitle: 'Adjacent Innovation',
    tip: 'Ask your child: "What are two things that are great separately but nobody has combined?" Peanut butter and chocolate was once a revolutionary idea. A phone and a camera (the smartphone). Bicycle lanes and solar panels (solar bike path roofs). The best innovations often come from combining existing ideas in new ways. Anya Freeman combined artificial reefs (an ocean idea) with 3D printing (a manufacturing idea) to create something entirely new. What two things can your child think of that would be better together?',
  },
  {
    number: 3,
    tag: 'The Strategy',
    tagColor: 'bg-indigo-100 text-indigo-700',
    title: 'The Zero-Green-Premium Strategy',
    teaser:
      'Kind Designs prices its Living Seawalls at exactly the same price as traditional toxic ones. Same cost, infinitely better performance. The buyer does not have to be "green" — they just have to want the better product.',
    image: '/images/comics/kind-designs/strip-3.jpg',
    imageAlt:
      'Wayne reveals the strategy to Luna — the 3D-printed living seawall costs the same as a traditional concrete wall but comes with oysters, fish habitat, and wave absorption built in at no extra charge.',
    story: [
      'Anya Freeman\'s most brilliant strategic decision was to eliminate the "green premium" entirely. Most sustainable products cost more — organic food, electric cars, solar panels. The buyer pays a premium for the environmental benefit. Freeman recognized that this limits market to the eco-conscious few. Her insight: if you can match the price of the destructive alternative, you remove the tradeoff entirely. The question is no longer "am I willing to pay extra for the planet?" It becomes "same price — why would I buy the ugly, destructive, slow-to-build option?"',
      'Kind Designs achieved price parity through manufacturing efficiency. The robotic 3D printing system is so much faster (20x) and more automated than traditional precast concrete that it absorbs the cost of the more expensive pH-neutral materials and the complex biomimetic design. The total cost to the customer is identical to a standard seawall. The built-in ecological benefits — oyster filtration, fish habitat, wave absorption — become free upgrades rather than premium add-ons.',
      'The strategy is working. Kind Designs has raised $11.5 million from investors including Mark Cuban (Shark Tank), who doubled down on his investment. The company has $10 million in residential project pipeline and is pursuing $180 million in public-sector projects. Most telling: the US Navy (NAVSEA) and Air Force (AFWERX) have awarded contracts for coastal military base protection — among the most rigorous engineering standards in the world. The company is expanding to New York (8 active projects) and Massachusetts, and has developed a modular tile product (Kind Tiles) that can be retrofitted onto existing seawalls to add ecological function without rebuilding them.',
    ],
    facts: (
      <>
        <p><strong>Zero green premium:</strong> Living Seawalls are priced identically to traditional concrete/steel seawalls. No price penalty for being eco-friendly.</p>
        <p><strong>Cost parity through speed:</strong> 20x faster manufacturing via robotic 3D printing offsets the cost of premium pH-neutral materials and complex designs.</p>
        <p><strong>$11.5M raised:</strong> Seed round at $18M valuation, then Series A at $30M. Mark Cuban is an early and repeat investor.</p>
        <p><strong>$10M residential pipeline</strong> + $180M in public sector project opportunities.</p>
        <p><strong>US military contracts:</strong> Navy (NAVSEA) and Air Force (AFWERX) — the most rigorous engineering validation possible.</p>
        <p><strong>Kind Tiles:</strong> Modular add-on product that brings ecological function to existing traditional seawalls — no reconstruction needed.</p>
        <p><strong>Geographic expansion:</strong> Miami (home base), New York City (8 active projects), Massachusetts (partnership with UMass for ecological monitoring).</p>
        <p><strong>Franchise model:</strong> Future strategy is to license the 3D printing tech + design library to local partners worldwide — the "Intel Inside" of seawalls.</p>
      </>
    ),
    lesson: (
      <>
        <p>The "zero green premium" strategy is one of the most important business ideas in this comic series. Most people assume that sustainable products must cost more. Kind Designs proves that with the right manufacturing technology, the sustainable option can match the destructive one on price — and beat it on every other dimension. This is how you scale sustainability from niche to mainstream: not by asking customers to pay more, but by making the sustainable choice the obvious, rational, economic choice.</p>
        <p>The Kind Tiles product also demonstrates a smart expansion strategy. Instead of only selling to new construction projects, Kind created a lower-cost retrofit product that can be added to existing walls. This expands the addressable market from "everyone building a new seawall" to "everyone who already has an old seawall" — which is a much larger number.</p>
      </>
    ),
    lessonTitle: 'Make Green the Default, Not the Premium',
    tip: 'Ask your child: "If a company made an organic T-shirt that cost the same as a regular T-shirt, looked better, and lasted longer, would you buy it?" Of course you would. You would not need to "care about the environment" — you would just be buying the better product. This is the key insight: the most powerful environmental solutions do not ask people to sacrifice. They make the sustainable choice the better choice on every dimension — price, quality, convenience, and planet. No tradeoff required.',
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

function AboutKindDesigns() {
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
            <span className="text-indigo-600 text-sm font-bold">KD</span>
          </div>
          <div>
            <p className="font-bold text-slate-800">About Kind Designs</p>
            <p className="text-xs text-slate-400 mt-0.5">3D-printed Living Seawalls for coastal protection and ecosystem restoration</p>
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
                  <p className="font-semibold text-slate-800 mb-1">What Kind Designs Does</p>
                  <p>Kind Designs manufactures 3D-printed "Living Seawalls" — coastal defense structures that protect shorelines while actively restoring marine ecosystems. The walls are biomimetic, pH-neutral, and priced identically to traditional destructive seawalls.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">The Technology</p>
                  <p>Robotic 3D concrete printing (500 mm/sec, 0.5-inch precision) — 20x faster than traditional precast. Proprietary pH-neutral cement blend that is non-toxic to marine life. Surface textures designed to mimic local habitats (mangrove roots, rocky intertidal zones). Kind Tiles for retrofitting existing walls.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">The Business Model</p>
                  <p>Manufacture + sell seawalls at price parity with traditional alternatives. Future: franchise model licensing 3D printing technology and design library to local partners worldwide. Retrofits via Kind Tiles for the existing seawall market.</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-slate-800 mb-1">The Founder</p>
                  <p>Anya Freeman — lawyer turned climate tech entrepreneur. Moved to Miami, experienced chronic flooding, and decided to solve the problem using a combination of artificial reef science and advanced manufacturing. Founded Kind Designs in 2020.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">Why It Matters for Kids</p>
                  <p>This story is about the power of "adjacent innovation" — combining things that already exist in new ways. Anya Freeman was not a marine biologist or a 3D printing expert. She was a lawyer who saw a problem and found a creative solution by connecting two unrelated fields. Her outsider perspective was her superpower. Kids should know that you do not need to be a "domain expert" to solve hard problems — sometimes the best solutions come from people who see things with fresh eyes.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">Learn More</p>
                  <p>
                    <a href="https://www.kinddesigns.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 font-medium">
                      kinddesigns.com
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

export default function WayneComicKindDesigns() {
  const totalStrips = strips.length;
  return (
    <>
      <SEOHead
        title="Startup Stories #14: Kind Designs — 3D-Printed Living Seawalls | Wayne's Comics"
        description="A parent-child comic series about real startups. Episode 14: Kind Designs — 3D-printed Living Seawalls that protect coastlines while growing oyster reefs and attracting fish, priced the same as traditional concrete walls."
        ogImage="/images/comics/kind-designs/cover.jpg"
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
          <img src="/images/comics/kind-designs/cover.jpg" alt="Startup Stories #14: Kind Designs — 3D-printed Living Seawalls" className="w-full h-auto" />
        </div>
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-bold rounded-full uppercase tracking-wide">
            Startup Stories · Episode 14 of 25
          </span>
          <span className="text-xs text-slate-400">June 2026 · {totalStrips} strips · 🇺🇸 United States</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3 leading-tight">
          The 3D-Printed Wall That Grows an Ecosystem
        </h1>
        <p className="text-slate-500 leading-relaxed mb-5 max-w-2xl">
          Miami\'s sea level has risen 8 inches since 1950. The standard solution — concrete seawalls — 
          destroys marine life and makes erosion worse next door. Kind Designs 3D-prints walls that 
          mimic mangrove roots, attract 1,000+ oysters in 9 months, and cost the same as the 
          destructive alternative. Episode 14 of 25.
        </p>
        <ShareBar
          title="Startup Stories #14: Kind Designs — 3D-Printed Living Seawalls"
          summary="A 3-strip parent-child comic about Kind Designs — 3D-printed seawalls that protect coastlines while growing oyster reefs and restoring marine ecosystems."
        />
      </motion.div>

      <div className="space-y-6 mb-10">
        {strips.map((strip, i) => (
          <motion.div key={strip.number} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.1 + i * 0.07 }}>
            <StripCard strip={strip} total={totalStrips} />
          </motion.div>
        ))}
      </div>

      <AboutKindDesigns />

      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.4 }}
        className="flex items-center justify-between py-6 border-t border-slate-200 mb-10"
      >
        <Link to="/wayne/comics" className="text-sm text-slate-400 hover:text-slate-700 transition-colors">
          ← All Comics
        </Link>
        <ShareBar title="Startup Stories #14: Kind Designs" summary="A parent-child comic about 3D-printed seawalls that protect coastlines while growing oyster reefs and restoring marine ecosystems." />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.45 }}
        className="bg-indigo-600 rounded-2xl px-8 py-10 text-center text-white"
      >
        <h2 className="text-xl font-bold mb-2">More startup stories coming</h2>
        <p className="text-indigo-100 text-sm mb-6 max-w-md mx-auto">
          This is Episode 14 of 25. Each story is about a real company solving a real problem — told in a way that makes sense to a 15-year-old, with analysis for the parent reading along.
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
