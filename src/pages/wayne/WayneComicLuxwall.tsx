import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { SEOHead } from '../../components/SEOHead';
import { ShareBar } from '../../components/ShareBar';

// ── Reusable sub-components ──────────────────────────────────────────

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

// ── Comic strip data ─────────────────────────────────────────────────

const strips = [
  {
    number: 1,
    tag: 'The Problem',
    tagColor: 'bg-red-100 text-red-700',
    title: 'The Hole in Every Wall',
    teaser:
      'Windows are the worst part of any building — 40% of heating and cooling energy leaks right through the glass. And half the world still uses single-pane windows.',
    image: '/images/comics/luxwall/strip-1.jpg',
    imageAlt:
      'Luna and Wayne stand by a window on a cold day, feeling the draft. A thermos is shown for comparison — if a thermos can keep things hot, why can\'t a window?',
    story: [
      'Here is a strange fact about the buildings around you: the weakest part of any wall is the hole you put a window in. Glass is a terrible insulator. It conducts heat roughly 10 times faster than a typical insulated wall. When you stand next to a single-pane window in winter, that cold you feel is not "cold coming in" — it is your home\'s heat rushing out. The same thing happens in reverse during summer: air conditioning escapes through the same glass, making your AC work much harder than it should.',
      'The numbers are genuinely shocking. Buildings consume about 30% of all energy on Earth and produce 39% of global CO2 emissions. Heating and cooling alone account for roughly half of a typical building\'s energy bill. And windows? They are responsible for up to 40% of that thermal energy loss. A trillion dollars worth of energy escapes through windows every single year.',
      'You would think we would have fixed this by now. Double-pane and triple-pane windows have existed for decades. But here is the uncomfortable truth: roughly 50% of the world\'s buildings still use the same single-pane glass technology that was standard a hundred years ago. Why? Because upgrading is expensive, complicated, and the return on investment takes too long for most building owners to justify. The market is broken — not because the technology does not exist, but because the economics of adoption do not work.',
    ],
    facts: (
      <>
        <p><strong>Buildings consume 30%</strong> of all global energy and produce 39% of CO2 emissions — more than the entire transportation sector.</p>
        <p><strong>Heating and cooling</strong> account for roughly 50% of a typical building\'s energy use.</p>
        <p><strong>Windows lose up to 40%</strong> of that thermal energy — the single biggest source of heat loss in any building.</p>
        <p><strong>~50% of buildings worldwide</strong> still use single-pane glass — the same technology from a century ago.</p>
        <p><strong>The annual energy waste</strong> through windows is a trillion-dollar problem — money literally floating out through the glass.</p>
      </>
    ),
    lesson: (
      <>
        <p>The window problem is what economists call a "market failure": the best solution exists, but the incentives are misaligned. A landlord pays for a window upgrade today, but the energy savings go to the tenant over many years. The person who pays is not the person who benefits. This gap between who bears the cost and who reaps the reward is one of the most common reasons good technologies fail to spread.</p>
        <p>Understanding market failures is a superpower. When you see a technology that seems obviously better but is not widely adopted, the bottleneck is almost never "people are stupid." It is almost always a structural misalignment — cost, risk, or reward distributed in a way that blocks adoption even when everyone would benefit from the change.</p>
      </>
    ),
    lessonTitle: 'When Markets Fail: The Adoption Gap',
    tip: 'Ask your child: "If a better window existed that saved money every month, why would a landlord not install it?" Walk through the logic — the landlord pays the full cost upfront, but the tenant gets the monthly savings. This reveals a pattern called "split incentive" that explains many environmental problems. Then ask: "How could you fix that misalignment?" The answers lead to ideas like building codes, green leases, and financing models — all of which real companies are building right now.',
  },
  {
    number: 2,
    tag: 'The Innovation',
    tagColor: 'bg-amber-100 text-amber-700',
    title: 'The Thermos for Your Window',
    teaser:
      'Vacuum insulated glass works exactly like a thermos — remove the air, stop the heat transfer. The science is simple. The manufacturing is not.',
    image: '/images/comics/luxwall/strip-2.jpg',
    imageAlt:
      'Wayne explains how vacuum insulated glass works — Luna looking cold by a window, then a diagram showing the vacuum layer between two panes of glass.',
    story: [
      'The principle behind vacuum insulated glass is almost embarrassingly simple. A thermos keeps your coffee hot because the air between its inner and outer walls has been removed — without air molecules to carry heat, thermal transfer drops to nearly zero. Luxwall\'s Enthermal™ vacuum insulated glass (VIG) does exactly the same thing for windows: two panes of glass with a vacuum seal in between. No air means almost no heat loss.',
      'The hard part is not the idea — it is the manufacturing. Creating a vacuum between two sheets of glass and maintaining that seal for decades, through seasonal temperature swings of 100°F and continuous exposure to UV radiation, is an extraordinarily difficult engineering challenge. A single microscopic leak ruins the entire panel. Luxwall\'s founder, Scott Thomsen, was uniquely equipped to solve this. He spent decades as a materials scientist at Guardian Glass (one of the world\'s largest glass manufacturers), developed extreme-environment systems at Honeywell Aerospace, and worked on vacuum deposition technology for flat-panel displays. He essentially combined three separate industries worth of expertise into one product.',
      'The result: a glass panel that insulates as well as a solid insulated wall — in a package that is only about half an inch thick. It can replace existing windows in the same frame, which means upgrading a building\'s energy efficiency does not require replacing the entire facade. This "drop-in replacement" capability is not just convenient — it is the key to the business model. Most commercial buildings have thousands of windows. Replacing them all requires shutting down floors, disrupting tenants, and redoing the entire exterior. Luxwall\'s VIG panels fit into the existing frame. The upgrade becomes a weekend project instead of a construction project.',
    ],
    facts: (
      <>
        <p><strong>Vacuum insulated glass (VIG)</strong> works on the same principle as a thermos: remove the air between two surfaces, eliminate conductive and convective heat transfer.</p>
        <p><strong>R-value comparable to a wall:</strong> Luxwall\'s VIG achieves insulation levels previously possible only with solid wall construction — in a half-inch-thick glass panel.</p>
        <p><strong>Founder Scott Thomsen</strong> spent decades at Guardian Glass (CTO), Honeywell Aerospace (extreme materials), and an AMLCD display company (vacuum coating). Three separate technical careers, one combined breakthrough.</p>
        <p><strong>Drop-in replacement:</strong> Luxwall panels fit into existing window frames — no need to replace the entire facade or disrupt building operations for weeks.</p>
        <p><strong>Durability challenge:</strong> Maintaining a vacuum seal for 30+ years through thermal expansion, contraction, and UV exposure requires manufacturing precision at a level normally found in semiconductor fabrication.</p>
      </>
    ),
    lesson: (
      <>
        <p>The Luxwall story is a masterclass in the value of "T-shaped expertise." Scott Thomsen was not the world\'s best glass scientist, nor the best aerospace materials engineer, nor the best display manufacturing expert. But he was very likely the only person in the world who had deep experience in all three fields simultaneously — and that intersection is where the breakthrough lived.</p>
        <p>This is a powerful lesson for anyone choosing what to learn. Deep specialization in one field can make you an expert. But combining two or three fields — even at a merely competent level in each — creates intersections where genuinely novel solutions emerge. The most interesting problems in the world live at the boundaries between disciplines, not at their centers.</p>
      </>
    ),
    lessonTitle: 'T-Shaped Expertise and Cross-Disciplinary Breakthroughs',
    tip: 'The "intersection of three careers" is a concrete, memorable way to talk about cross-disciplinary thinking with a child. Ask: "What three things do you know about? They do not have to be school subjects — could be drawing, soccer, and video games. Can you think of a problem that needs all three to solve?" The exercise builds the habit of connecting disparate knowledge — one of the most valuable thinking skills for the AI era.',
  },
  {
    number: 3,
    tag: 'The Strategy',
    tagColor: 'bg-indigo-100 text-indigo-700',
    title: 'Intel Inside for Windows',
    teaser:
      'Luxwall does not sell windows to homeowners. It sells its vacuum glass to the companies that already make windows — and lets them do the selling.',
    image: '/images/comics/luxwall/strip-3.jpg',
    imageAlt:
      'Luna and Wayne look at a window with a "Luxwall Inside" label, next to a computer chip with the classic "Intel Inside" logo — drawing the analogy.',
    story: [
      'Most people, when they imagine a hardware startup, picture a company that builds and sells a finished product directly to customers. Luxwall chose a completely different path. Instead of becoming a window company — which would require building a brand, a sales force, distribution channels, and service operations — Luxwall decided to be the "Intel Inside" of the window industry.',
      'Intel Inside was one of the most successful branding strategies in technology history. Intel did not sell computers to consumers. It sold microprocessors to computer manufacturers — Dell, HP, Lenovo — and its "Intel Inside" campaign made consumers specifically ask for Intel chips when buying a PC. The computer makers became Intel\'s free sales force. Luxwall is executing the same playbook. It manufactures the core vacuum insulated glass units and sells them to established window manufacturers who integrate them into their existing product lines.',
      'Luxwall\'s partnerships read like a who\'s who of the global glass industry. In residential construction, it partners with Kolbe, a premium window and door manufacturer serving architects and high-end builders. In the commercial market, it works with Viracon, the leading American architectural glass fabricator. For global expansion, it partnered with Saint-Gobain, the French multinational that is one of the oldest and largest glass companies in the world — selling under the INSIO™ brand in Europe. Each partnership gives Luxwall instant access to decades of customer relationships, distribution networks, and brand trust that would have taken it years and hundreds of millions of dollars to build on its own.',
    ],
    facts: (
      <>
        <p><strong>Intel Inside (1991):</strong> One of the most successful co-branding campaigns in history. Intel spent $7B on the campaign over a decade and captured 80%+ of the PC microprocessor market.</p>
        <p><strong>Kolbe partnership:</strong> Premium US residential window manufacturer — serves architects, custom home builders, and the luxury market.</p>
        <p><strong>Viracon partnership:</strong> The largest architectural glass fabricator in the United States — covers the commercial building market.</p>
        <p><strong>Saint-Gobain partnership:</strong> Founded in 1665 (yes, 359 years ago). One of the largest glass and building materials companies in the world. DISTRIBUTES Luxwall\'s technology as INSIO™ in Europe.</p>
        <p><strong>The strategy:</strong> Luxwall avoids the hardest parts of building a hardware company — brand, channel, sales, service — and lets incumbent giants do what they do best while Luxwall does what only it can do: make the core technology.</p>
      </>
    ),
    lesson: (
      <>
        <p>The "Intel Inside" strategy is a specific type of business model called "component branding." The component supplier builds brand awareness with end consumers, creating "pull demand" — customers ask for the component by name, forcing the finished-product manufacturers to include it. This is structurally different from selling to manufacturers as a hidden component (which is what most suppliers do) because the brand creates consumer leverage.</p>
        <p>For a child interested in building things, this model raises an important question: do you want to build the whole product, or do you want to build the one critical piece that goes inside many products? The latter is less glamorous but often more defensible — and you do not have to fight the incumbents. You partner with them.</p>
      </>
    ),
    lessonTitle: 'Component Branding: The Power of "Inside"',
    tip: 'The "Intel Inside" analogy is a great way to introduce strategy thinking. Ask your child: "If you invented a better battery, would you start a phone company, or would you sell your battery to Apple and Samsung?" Walk through the tradeoffs — building a phone brand is hard, but you control the whole experience; selling batteries is simpler but you depend on others. There is no right answer, but the exercise of thinking through the choice is valuable.',
  },
  {
    number: 4,
    tag: 'The Impact',
    tagColor: 'bg-emerald-100 text-emerald-700',
    title: 'Backed by Bill Gates, Funded by the Government',
    teaser:
      'Luxwall raised $33M from top climate investors, $31.7M from the US Department of Energy, and another $51M — with the potential to eliminate 500 million tons of CO2 annually.',
    image: '/images/comics/luxwall/strip-4.jpg',
    imageAlt:
      'Wayne and Luna look at a city skyline where every building has energy-efficient windows — the future of sustainable construction. A DOE seal and climate impact stats are shown.',
    story: [
      'To understand why Luxwall attracted world-class investors, you have to connect the technology to the regulatory and economic tailwinds. Building energy codes are tightening worldwide. The European Union\'s Energy Performance of Buildings Directive requires dramatic emissions reductions from existing buildings. Major US cities like New York and Boston have passed laws imposing steep fines on buildings that exceed carbon caps. These regulations are not hypothetical — they are in effect now, and they are creating a compliance-driven demand for products like Luxwall\'s VIG. When a building owner faces a $1M fine for exceeding emissions limits, a $200K window upgrade starts looking like a smart investment.',
      'Luxwall\'s funding history reads like a blueprint for how to de-risk a deep-tech hardware company. The $33M Series A was led by Breakthrough Energy Ventures (Bill Gates\' climate fund), Khosla Ventures, and Prelude Ventures — top-tier climate tech investors who validated the technology thesis. The $31.7M grant from the US Department of Energy was a non-dilutive seal of approval that positioned Luxwall\'s technology as nationally strategic for clean energy supply chains. The $51M Series B added Barclays Sustainable Impact Capital and The Nature Conservancy — bridging the gap from climate tech to mainstream finance. Each funding round reduced a different category of risk: technology risk, then manufacturing risk, then commercial risk.',
      'The potential impact is enormous. Luxwall estimates its technology could eliminate 500+ million tons of CO2 annually if widely adopted — roughly equivalent to taking 100 million cars off the road. And because the "Intel Inside" strategy leverages existing manufacturing partners, Luxwall can scale its production capacity faster than a traditional hardware company could build its own factories. The technology is proven, the partners are lined up, the regulations are creating demand, and the funding covers the manufacturing buildout. This is what a "platform ready for takeoff" looks like in climate tech.',
    ],
    facts: (
      <>
        <p><strong>$33M Series A:</strong> Breakthrough Energy Ventures (Bill Gates), Khosla Ventures, Prelude Ventures — top-tier climate tech investors.</p>
        <p><strong>$31.7M DOE grant:</strong> U.S. Department of Energy non-dilutive funding for the Detroit manufacturing plant — signaling national strategic importance.</p>
        <p><strong>$51M Series B:</strong> Barclays Sustainable Impact Capital, Climate Investment, and The Nature Conservancy — bridging from climate tech to mainstream finance.</p>
        <p><strong>500+ million tons CO2</strong> reduction potential annually — equivalent to taking ~100 million cars off the road.</p>
        <p><strong>Regulatory tailwind:</strong> EU Energy Performance of Buildings Directive, NYC Local Law 97, Boston BERDO — all creating compliance-driven demand for better windows.</p>
        <p><strong>Edison Invention Award</strong> winner. Ranked in Norrsken\'s Top 100 Most Promising Impact Startups (2024).</p>
      </>
    ),
    lesson: (
      <>
        <p>Luxwall\'s funding strategy is a textbook case of "tranched risk reduction." Deep-tech hardware companies die not because the technology fails, but because they run out of money between proving the technology and building the factory. Luxwall systematically addressed this: Series A proved the technology worked. The DOE grant funded the factory (without diluting equity). Series B proved there was commercial demand. Each step de-risked the next for a different category of investor — from visionary climate funds to strategic corporate investors to return-driven financial institutions.</p>
        <p>This staged approach to risk reduction is a valuable framework beyond startups. Any ambitious project — learning a difficult skill, starting a creative work, building a community — benefits from asking: "What is the smallest step that proves the next step is worth taking?"</p>
      </>
    ),
    lessonTitle: 'Tranched Risk Reduction: How Deep Tech Avoids the Valley of Death',
    tip: 'The concept of "proving things one step at a time" is a life skill as much as a business one. Share with your child: "What is something hard you want to do? What is the smallest version of it you could try first?" Whether learning an instrument (start with one song, not a full recital) or starting a small business (sell to one neighbor, not open a store), the pattern is the same — prove the next step before taking it.',
  },
];

// ── Individual comic strip card ──────────────────────────────────────

function StripCard({ strip, total }: { strip: typeof strips[0]; total: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div layout className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
      <div className="overflow-hidden">
        <img src={strip.image} alt={strip.imageAlt} className="w-full h-auto" />
      </div>
      <div className="px-6 pt-5 pb-4">
        <div className="flex items-center gap-2 mb-3">
          <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${strip.tagColor}`}>
            {strip.tag}
          </span>
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

// ── About Luxwall (collapsible) ──────────────────────────────────────

function AboutLuxwall() {
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
            <span className="text-indigo-600 text-sm font-bold">LX</span>
          </div>
          <div>
            <p className="font-bold text-slate-800">About Luxwall</p>
            <p className="text-xs text-slate-400 mt-0.5">Vacuum insulated glass, the Intel Inside strategy, and the trillion-dollar window problem</p>
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
                  <p className="font-semibold text-slate-800 mb-1">What Luxwall Does</p>
                  <p>Luxwall manufactures vacuum insulated glass (VIG) — a window panel that insulates as well as a solid wall. Their Enthermal™ technology removes the air between two panes of glass, eliminating the primary pathway for heat loss through windows.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">The Technology</p>
                  <p>Vacuum insulated glass works like a thermos: by creating a vacuum between two surfaces, conductive and convective heat transfer drops to near zero. Luxwall\'s innovation is manufacturing this at commercial scale with a 30+ year durability guarantee — a challenge that bankrupted earlier attempts.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">The Business Model</p>
                  <p>Luxwall follows the "Intel Inside" playbook: it manufactures the core VIG units and sells them to established window manufacturers (Kolbe, Viracon, Saint-Gobain) who integrate them into their existing products. Luxwall avoids building its own brand, sales force, or distribution — it lets the giants do what they do best.</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-slate-800 mb-1">The Founding Story</p>
                  <p>Scott Thomsen founded Luxwall in 2020 after a career spanning Guardian Glass (CTO), Honeywell Aerospace (extreme materials), and flat-panel display manufacturing (vacuum coating). His unique cross-disciplinary expertise — nobody else combined all three — made the breakthrough possible.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">Why It Matters for Kids</p>
                  <p>Every building a child enters — school, library, home, store — leaks energy through its windows. Luxwall is fixing something so fundamental that most people never notice it. The story also shows that you do not have to fight big companies to change an industry; sometimes the smartest move is to make your technology indispensable to them.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">Learn More</p>
                  <p>
                    <a href="https://www.luxwall.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 font-medium">
                      luxwall.com
                    </a>
                    {' '}— product information, case studies, and technology details.
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

// ── Main page ────────────────────────────────────────────────────────

export default function WayneComicLuxwall() {
  const totalStrips = strips.length;
  return (
    <>
      <SEOHead
        title="Startup Stories #6: Luxwall — The Window That Thinks It's a Wall | Wayne's Comics"
        description="A parent-child comic series about real startups. Episode 6: Luxwall — how vacuum insulated glass turns the weakest part of every building into its strongest defense against energy waste, backed by Bill Gates and the US Department of Energy."
      />

      {/* Back nav */}
      <div className="mb-8">
        <Link to="/wayne/comics" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          All Comics
        </Link>
      </div>

      {/* ── Cover ── */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-10">
        <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md mb-7">
          <img src="/images/comics/luxwall/cover.jpg" alt="Startup Stories #6: Luxwall — vacuum insulated glass" className="w-full h-auto" />
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-bold rounded-full uppercase tracking-wide">
            Startup Stories · Episode 6 of 25
          </span>
          <span className="text-xs text-slate-400">June 2026 · {totalStrips} strips · 🇺🇸 USA</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3 leading-tight">
          The Window That Thinks It's a Wall
        </h1>
        <p className="text-slate-500 leading-relaxed mb-5 max-w-2xl">
          Windows are the weakest link in every building — 40% of heating and cooling energy leaks right through the glass. Luxwall invented a vacuum insulated window that performs like a solid wall. This is the story of a trillion-dollar problem, a founder who combined three careers into one breakthrough, and the "Intel Inside" strategy that lets a startup partner with giants instead of fighting them. Episode 6 of 25 real startup stories.
        </p>
        <ShareBar
          title="Startup Stories #6: Luxwall — The Window That Thinks It's a Wall"
          summary="A 4-strip parent-child comic about Luxwall — vacuum insulated glass that turns the building's weakest point into its strongest defense against energy waste."
        />
      </motion.div>

      {/* ── Strips ── */}
      <div className="space-y-6 mb-10">
        {strips.map((strip, i) => (
          <motion.div key={strip.number} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.1 + i * 0.07 }}>
            <StripCard strip={strip} total={totalStrips} />
          </motion.div>
        ))}
      </div>

      {/* ── About Luxwall ── */}
      <AboutLuxwall />

      {/* ── Bottom share ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.4 }}
        className="flex items-center justify-between py-6 border-t border-slate-200 mb-10"
      >
        <Link to="/wayne/comics" className="text-sm text-slate-400 hover:text-slate-700 transition-colors">
          ← All Comics
        </Link>
        <ShareBar title="Startup Stories #6: Luxwall" summary="A parent-child comic series about real startups — Episode 6: energy-efficient vacuum insulated windows and the Intel Inside strategy." />
      </motion.div>

      {/* ── CTA ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.45 }}
        className="bg-indigo-600 rounded-2xl px-8 py-10 text-center text-white"
      >
        <h2 className="text-xl font-bold mb-2">More startup stories coming</h2>
        <p className="text-indigo-100 text-sm mb-6 max-w-md mx-auto">
          This is Episode 6 of 25. Each story is about a real company solving a real problem — told in a way that makes sense to a 15-year-old, with analysis for the parent reading along.
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
