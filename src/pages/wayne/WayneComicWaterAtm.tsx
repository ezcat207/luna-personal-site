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
    title: 'The World\'s Most Expensive Water Is the Water You Have to Boil',
    teaser:
      '57% of Rwandans cannot access clean water within a 30-minute walk. Families boil contaminated water over wood fires — spending money on fuel, inhaling toxic smoke, and contributing to deforestation. The poorest pay the most for the worst water.',
    image: '/images/comics/wateratm/strip-1.jpg',
    imageAlt:
      'Luna and Wayne visit a Rwandan village where people collect water from a contaminated pond. Girls miss school to fetch water. Luna asks "Why can\'t they just buy clean water?" Wayne explains that clean water costs more than most families can afford.',
    story: [
      'In Rwanda, 57% of people cannot reach clean drinking water within a 30-minute walk. The consequences are brutal: over 3,000 Rwandan children die every year from diarrheal diseases caused by contaminated water and poor sanitation. Up to 80% of illnesses in rural Rwanda are water-related. The burden falls disproportionately on women and girls, who are responsible for water collection — hours every day that could be spent in school or working.',
      'The existing solutions are all broken. Bottled water is too expensive for low-income families. Public utility water is unreliable and still requires boiling. So families do what they have always done: collect water from the nearest pond or stream, carry it home, and boil it over a wood fire. Boiling kills the pathogens, but it creates a cascade of secondary problems: the cost of fuel (charcoal or wood), the health damage from indoor smoke inhalation (a leading cause of respiratory disease), the time spent collecting firewood, and the environmental damage from deforestation.',
      'This is the cruel paradox of water poverty: the poorest families spend a higher percentage of their income on water than wealthy families do, and they get worse quality. They pay for fuel to boil water, they pay for medicine when boiling fails, and they pay with their children\'s health and education. The market has failed them completely — not because there is no demand, but because the economics of delivering clean water to dispersed rural communities have not worked.',
    ],
    facts: (
      <>
        <p><strong>57% of Rwandans</strong> cannot access clean water within a 30-minute walk — nearly 8 million people.</p>
        <p><strong>3,000+ children</strong> die annually from waterborne diseases like diarrhea — a preventable tragedy.</p>
        <p><strong>80% of illnesses</strong> in rural Rwanda are water-related — contaminated water is the single biggest public health threat.</p>
        <p><strong>Water collection</strong> is primarily done by women and girls, who spend hours daily fetching water instead of attending school or working.</p>
        <p><strong>Boiling water</strong> requires fuel (wood/charcoal) — creating indoor air pollution, respiratory disease, deforestation, and additional expense for the poorest families.</p>
        <p><strong>The water poverty paradox:</strong> The poorest pay the most for water (fuel + medicine + lost time) while getting the worst quality.</p>
      </>
    ),
    lesson: (
      <>
        <p>The water crisis in rural Rwanda is not just a problem of scarcity — it is a problem of system design. Clean water exists (rain, groundwater, treatment technology). Demand exists (families desperately want clean water). Willingness to pay exists (they already spend money on fuel and medicine). What is missing is a distribution model that works at the right price point for dispersed, low-income communities.</p>
        <p>This is a classic "last mile" problem — and it is one of the hardest problems in global development. The cost of connecting the last 20% of a population to any infrastructure (water, electricity, internet) is often higher than the cost of connecting the first 80%. Solving it requires not just technology, but a business model that makes the economics work at small scale and low margin.</p>
      </>
    ),
    lessonTitle: 'The Last Mile Is Always the Hardest — and the Most Important',
    tip: 'Ask your child: "Why does a bottle of water cost $2 at a convenience store but only pennies from the tap at home?" The answer is infrastructure — pipes, treatment plants, and maintenance are expensive to build and operate. Now imagine trying to build that infrastructure for people who live far apart, on bad roads, with very little money. This is the challenge IRIBA faced. They had to invent a completely new way to deliver clean water — not just a new filter, but a new business model.',
  },
  {
    number: 2,
    tag: 'The Solution',
    tagColor: 'bg-amber-100 text-amber-700',
    title: 'A 19-Year-Old Built a Water ATM That Runs on Sunshine',
    teaser:
      'Yvette Ishimwe was 19 when she started treating lake water with a UV purifier and delivering it by bicycle. She pivoted to solar-powered water ATMs — decentralized purification kiosks that dispense clean water 70% cheaper than bottled.',
    image: '/images/comics/wateratm/strip-2.jpg',
    imageAlt:
      'A solar-powered water ATM kiosk in a Rwandan village. Wayne explains how the prepaid meter works — families pay a few cents for clean water, dispensed from a solar-powered purification system that needs no grid electricity.',
    story: [
      'Yvette Ishimwe was 19 years old, fresh out of high school, studying at Kepler College in Rwanda, when she confronted her community\'s water crisis directly. Her family had moved from Kigali (the capital) to rural Kayonza district, and she experienced the daily struggle of finding safe water firsthand. Her first attempt at a solution was simple and personal: she bought a UV water purifier, treated water from a nearby lake, and had a team deliver it by bicycle to hundreds of families in her neighborhood. It worked — but it did not scale.',
      'In 2017, Ishimwe founded IRIBA Water Group ("IRIBA" means "source" in Kinyarwanda). The company pivoted from bicycle delivery to a decentralized model: solar-powered water purification kiosks installed directly in communities. These "Water ATMs" use solar panels to power a filtration and UV treatment system, store the clean water in a tank, and dispense it through a prepaid smart meter. Families pay a few Rwandan francs per liter — about 70% cheaper than bottled water. The smart meter tracks usage, collects payments digitally, and sends operational data to a cloud platform.',
      'The genius of the Water ATM is that it solves multiple problems at once. Solar power means no grid electricity required — the kiosk works anywhere the sun shines. Decentralized installation means water is purified at the point of use — no long pipelines, no tanker trucks. The prepaid meter means micro-payments are feasible — families buy what they can afford, a few liters at a time, rather than needing a large lump sum. And the data from the smart meters gives IRIBA real-time visibility into water consumption, payment flows, and maintenance needs across hundreds of sites.',
    ],
    facts: (
      <>
        <p><strong>IRIBA Water Group:</strong> Founded 2017 by Yvette Ishimwe in Rwanda. "IRIBA" means "source" in Kinyarwanda.</p>
        <p><strong>Founder was 19</strong> when she started treating lake water with a UV purifier and delivering by bicycle. The business was born from a lived crisis — her family\'s move to rural Kayonza.</p>
        <p><strong>Solar-powered Water ATMs:</strong> Decentralized purification kiosks that use solar panels, filtration, UV treatment, and prepaid smart meters. No grid electricity needed.</p>
        <p><strong>70% cheaper than bottled water:</strong> Families pay a few francs per liter — affordable for daily use, dispensed through a prepaid meter in micro-transactions.</p>
        <p><strong>Smart meter data:</strong> Real-time monitoring of water consumption, payments, and maintenance needs across all kiosks. Cloud-connected for remote management.</p>
        <p><strong>Women franchisee model:</strong> Local women operate the kiosks as small businesses — creating jobs while ensuring the kiosk is managed by a trusted community member.</p>
      </>
    ),
    lesson: (
      <>
        <p>IRIBA\'s pivot from "delivering water by bicycle" to "installing solar-powered Water ATMs" is a classic example of moving from a linear, labor-intensive model to a scalable, capital-efficient one. The bicycle delivery model required more labor for every new customer. The Water ATM model requires a fixed investment per kiosk, after which the marginal cost of serving each additional liter is near zero.</p>
        <p>This is the difference between a "service" business and a "platform" business — and it is one of the most important strategic distinctions in any industry. Services grow linearly (more customers = more people). Platforms grow exponentially (more customers = better economics). When Ishimwe realized that her bicycle delivery route would never achieve platform economics, she had the courage to fundamentally change her model — even though the first version was already working.</p>
      </>
    ),
    lessonTitle: 'Know When to Kill a Working Model for One That Scales',
    tip: 'Ask your child: "If you baked and sold cookies one at a time, how many could you sell in a day?" Maybe 50. "What if you built a cookie machine that baked 100 at once?" That is platform thinking. IRIBA\'s first model (bicycle delivery) was like selling cookies one at a time — it worked but could not grow. The Water ATM model (solar-powered kiosk) was the "cookie machine." This teaches kids that the best solution is not always the one that works first — it is the one that can work for everyone.',
  },
  {
    number: 3,
    tag: 'The Strategy',
    tagColor: 'bg-indigo-100 text-indigo-700',
    title: 'Turning Clean Water into Carbon Credits That Pay for Free School Water',
    teaser:
      'IRIBA\'s secret weapon: every liter of clean water they provide means less wood burned for boiling. Those saved emissions become carbon credits sold to global companies. The revenue funds free water stations for schools that cannot afford to pay.',
    image: '/images/comics/wateratm/strip-3.jpg',
    imageAlt:
      'Wayne explains IRIBA\'s impact flywheel to Luna: clean water sales reduce boiling → carbon credits generated → credits sold to global companies → revenue funds free water for schools. A self-funding social enterprise model.',
    story: [
      'IRIBA\'s business model has three layers, and the third layer is the most innovative. Layer 1: B2C — communities buy clean water from the solar-powered ATMs at an affordable per-liter price. This generates revenue and creates the core business. Layer 2: B2B — schools and health centers get water stations on a "rent-to-own" model, paying over time rather than needing a large upfront investment. This expands the customer base and generates predictable recurring revenue.',
      'Layer 3 is where it gets brilliant. When families use IRIBA\'s clean water, they stop boiling water over wood fires. This means less firewood is burned, which means fewer trees are cut down and less CO2 is emitted. IRIBA measures and certifies these emission reductions and sells them as carbon credits on the global carbon market. Companies like Microsoft, Google, and airlines buy these credits to offset their own emissions.',
      'The carbon credit revenue is then used to fund water stations at the poorest schools — those that cannot afford even the rent-to-own model. Free water for schools means children stay hydrated and healthy, girls spend more time in class instead of fetching water, and the community sees the benefit of clean water firsthand. This creates a virtuous flywheel: the more water IRIBA sells, the more carbon credits it generates, the more free water it can provide, the healthier communities become, the more water they buy.',
      'By 2026, IRIBA has installed 203 water stations, serving over 517,000 people, creating 194 jobs, and expanding from Rwanda into the Democratic Republic of Congo and the Central African Republic. Yvette Ishimwe has won the Queen\'s Young Leader Award, the Zayed Sustainability Prize, the Cartier Women\'s Initiative, and many others — each award providing capital, credibility, and connections that fuel further growth.',
    ],
    facts: (
      <>
        <p><strong>Three-layer business model:</strong> B2C (community kiosk sales) → B2B (rent-to-own for schools) → Carbon credits (funding free water for poorest schools).</p>
        <p><strong>Carbon credit flywheel:</strong> Clean water replaces boiled water → less wood burning → fewer CO2 emissions → certified carbon credits → sold to global companies → revenue funds free school water → healthier communities → more water consumption → more carbon credits.</p>
        <p><strong>Impact to date:</strong> 203 water stations, 517,412 people served, 194 jobs created. Expanded to DRC and Central African Republic.</p>
        <p><strong>Awards:</strong> Queen\'s Young Leader Award, Zayed Sustainability Prize, Cartier Women\'s Initiative, YouthADAPT Challenge, and many more.</p>
        <p><strong>Founder age at start:</strong> 19 years old. Now one of Africa\'s most recognized young social entrepreneurs.</p>
        <p><strong>Carbon market innovation:</strong> IRIBA registered as a carbon credit broker — systematically monetizing the environmental impact of clean water delivery.</p>
      </>
    ),
    lesson: (
      <>
        <p>IRIBA\'s carbon credit flywheel is one of the most elegant business model innovations in this entire series. Most social enterprises face an impossible trade-off: serve the poorest (who cannot pay enough) OR build a sustainable business (which requires paying customers). IRIBA found a third option: use the environmental byproduct of your core business (carbon savings) to cross-subsidize the customers who cannot pay.</p>
        <p>This is "impact investing" in its truest form — not charity, but a financial engineering solution that aligns profit motive with social impact. The carbon market is the mechanism that allows global capital to flow to local problems. IRIBA is effectively letting Microsoft and Google pay for clean water in Rwandan schools, because their emissions reductions have market value. The beauty is that everyone wins: the global companies get carbon credits, IRIBA gets revenue, and the poorest children get free clean water.</p>
      </>
    ),
    lessonTitle: 'Make Your Impact Fund Your Impact',
    tip: 'Ask your child: "If you could only sell lemonade to people who had money, how would you give free lemonade to people who could not afford it?" One answer: sell more lemonade to people who can pay, and use the extra profit to give it away. But IRIBA found an even better answer: their lemonade stand also cleaned the air every time it made a sale. Companies paid them for cleaning the air, and that money paid for free lemonade. This teaches kids that the most powerful solutions do not ask "how do we fund this?" — they ask "how does this create value that someone will pay for?"',
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

function AboutIriba() {
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
            <span className="text-sky-600 text-sm font-bold">IR</span>
          </div>
          <div>
            <p className="font-bold text-slate-800">About IRIBA Water Group</p>
            <p className="text-xs text-slate-400 mt-0.5">Solar-powered Water ATMs for rural Africa</p>
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
                  <p className="font-semibold text-slate-800 mb-1">What IRIBA Does</p>
                  <p>IRIBA installs solar-powered water purification kiosks ("Water ATMs") in rural African communities. Families buy clean water through prepaid smart meters at 70% less than bottled water. Local women operate the kiosks as franchise businesses.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">The Technology</p>
                  <p>Solar-powered filtration and UV treatment system. Prepaid smart meters for micro-payments. Cloud-connected for real-time monitoring of water quality, consumption, payments, and maintenance needs. Works entirely off-grid.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">The Business Model</p>
                  <p>Three-layer flywheel: (1) B2C water sales generate revenue. (2) B2B rent-to-own for schools and clinics. (3) Carbon credits from reduced boiling fund free water for the poorest schools. Each layer enables the next.</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-slate-800 mb-1">The Founder</p>
                  <p>Yvette Ishimwe — started at age 19 when her family moved to rural Kayonza. First prototype was a UV purifier treating lake water, delivered by bicycle. Now one of Africa\'s most decorated young entrepreneurs with global awards including the Queen\'s Young Leader Award and Zayed Sustainability Prize.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">Why It Matters for Kids</p>
                  <p>Yvette Ishimwe was 19 — a teenager — when she started solving her community\'s water crisis. She did not wait until she had a degree, funding, or permission. She saw a problem, tried a simple solution (UV purifier + bicycle delivery), learned why it did not scale, and redesigned it. This is one of the most inspiring examples in this series of how young people can create real change — not by being "the future" but by acting in the present. It also teaches the sophisticated concept of using carbon markets to fund social impact — a financial innovation that even most adults do not understand.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">Learn More</p>
                  <p>
                    <a href="https://iribawatergroup.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 font-medium">
                      iribawatergroup.com
                    </a>
                    {' '}— company information and impact reports.
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

export default function WayneComicWaterAtm() {
  const totalStrips = strips.length;
  return (
    <>
      <SEOHead
        title="Startup Stories #21: IRIBA Water — Solar Water ATMs That Turn Clean Water into Carbon Credits | Wayne's Comics"
        description="A parent-child comic series about real startups. Episode 21: IRIBA Water Group — a 19-year-old Rwandan founder built solar-powered Water ATMs that sell clean water 70% cheaper than bottled, and uses carbon credits to fund free water for the poorest schools."
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
          <img src="/images/comics/wateratm/cover.jpg" alt="Startup Stories #21: IRIBA Water — solar-powered Water ATMs providing affordable clean water in rural Rwanda" className="w-full h-auto" />
        </div>
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-bold rounded-full uppercase tracking-wide">
            Startup Stories · Episode 21 of 25
          </span>
          <span className="text-xs text-slate-400">June 2026 · {totalStrips} strips · 🇷🇼 Rwanda</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3 leading-tight">
          The Water ATM That Runs on Sunshine
        </h1>
        <p className="text-slate-500 leading-relaxed mb-5 max-w-2xl">
          57% of Rwandans cannot reach clean water within a 30-minute walk. A 19-year-old 
          founder built solar-powered Water ATMs — purification kiosks that dispense clean 
          water 70% cheaper than bottled. And when families stop boiling water over wood fires, 
          the carbon savings fund free water for the poorest schools. Episode 21 of 25.
        </p>
        <ShareBar
          title="Startup Stories #21: IRIBA Water — Solar Water ATMs"
          summary="A 3-strip parent-child comic about IRIBA Water Group — a 19-year-old Rwandan founder who built solar-powered Water ATMs and uses carbon credits to fund free clean water for schools."
        />
      </motion.div>

      <div className="space-y-6 mb-10">
        {strips.map((strip, i) => (
          <motion.div key={strip.number} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.1 + i * 0.07 }}>
            <StripCard strip={strip} total={totalStrips} />
          </motion.div>
        ))}
      </div>

      <AboutIriba />

      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.4 }}
        className="flex items-center justify-between py-6 border-t border-slate-200 mb-10"
      >
        <Link to="/wayne/comics" className="text-sm text-slate-400 hover:text-slate-700 transition-colors">
          ← All Comics
        </Link>
        <ShareBar title="Startup Stories #21: IRIBA Water" summary="A parent-child comic about solar-powered Water ATMs and the carbon credit flywheel that funds free school water in Rwanda." />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.45 }}
        className="bg-indigo-600 rounded-2xl px-8 py-10 text-center text-white"
      >
        <h2 className="text-xl font-bold mb-2">More startup stories coming</h2>
        <p className="text-indigo-100 text-sm mb-6 max-w-md mx-auto">
          This is Episode 21 of 25. Each story is about a real company solving a real problem — told in a way that makes sense to a 15-year-old, with analysis for the parent reading along.
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
