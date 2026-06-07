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
    title: '57,000 Pharmacies, Zero Supply Chain',
    teaser:
      'Vietnam has 57,000 pharmacies — 98.5% are tiny mom-and-pop shops. To stock 1,000 medicines, a pharmacist has to call 10 different suppliers. Some get their drugs delivered by motorcycle on muddy roads.',
    image: '/images/comics/pharmexpress/strip-1.jpg',
    imageAlt:
      'Luna and Wayne visit a rural Vietnamese village pharmacy — a small shop with shelves of medicine. Wayne explains that this pharmacy needs to call up to 10 different suppliers just to stock its shelves.',
    story: [
      'Imagine running a pharmacy in a small town in Vietnam. Your shop is small — maybe 300 square feet. You need to stock roughly 1,000 different medicines to serve your community. But no single distributor carries more than 200 products. So every week, you call 5 to 10 different suppliers, negotiate prices, place separate orders, and wait. A full restocking cycle takes about a week — if the roads are good. In the rainy season, "good" is not guaranteed. Many deliveries arrive by motorcycle on unpaved roads.',
      'This is not a fringe case. Vietnam has over 57,000 pharmacies, and 98.5% of them are independently owned small shops. The country has roughly 1,500 pharmaceutical distributors, but none of them offers a comprehensive product catalog. The result is a tangled "many-to-many" distribution network that is wildly inefficient. The pharmacy market is worth $8.9 billion (2024) and growing fast — projected to exceed $16 billion by 2032. But the infrastructure to get medicine from manufacturers to pharmacies is stuck in the 1990s.',
      'The social cost is real. If you live in a city, you have access to most medicines within hours. If you live in a rural province — where millions of Vietnamese live — your local pharmacy may simply not carry the drug your doctor prescribed. It is not that the drug does not exist in the country. It just cannot get to you. The founders of Buymed call this the "poverty tax" on rural healthcare: geography directly determines access to medicine.',
    ],
    facts: (
      <>
        <p><strong>57,000+ pharmacies</strong> in Vietnam — 98.5% are independent small shops.</p>
        <p><strong>~1,500 distributors</strong> — but none carries a full product catalog. Most handle fewer than 200 products.</p>
        <p><strong>$8.9 billion</strong> Vietnamese pharma market in 2024, projected to exceed $16 billion by 2032.</p>
        <p><strong>Restocking cycle:</strong> ~1 week for a typical pharmacy, requiring calls to 5-10 suppliers.</p>
        <p><strong>Rural impact:</strong> Patients in remote areas often cannot access prescribed medicines — not because they don't exist, but because the supply chain cannot reach them.</p>
        <p><strong>Top 10 Vietnamese pharma companies</strong> combined are worth less than Indonesia's single largest pharma company (Kalbe Farma) — showing extreme market fragmentation.</p>
      </>
    ),
    lesson: (
      <>
        <p>Vietnam\'s pharmacy problem is a textbook example of what economists call "fragmentation failure." When a market has too many small players on both sides (57,000 buyers and 1,500 sellers), the transaction costs of finding and matching become so high that the market stops functioning efficiently. No single participant has enough scale to invest in infrastructure. The market gets stuck in a low-efficiency equilibrium.</p>
        <p>The solution is a platform that aggregates demand on one side and supply on the other — creating the scale that no individual participant can achieve alone. This is the same structural insight behind Alibaba in China, Amazon in the US, and Flipkart in India. The difference is that Buymed built this for healthcare, which has much higher stakes than books or electronics.</p>
      </>
    ),
    lessonTitle: 'Fragmentation Creates Opportunity',
    tip: 'Ask your child: "Imagine every student in your school had to find their own textbook supplier — calling different stores, comparing prices, arranging delivery. How long would it take to get all your books?" Then ask: "What if one company bought all the books and delivered them to the school? Would that be faster?" This is exactly what Buymed did for pharmacies in Vietnam — consolidated a fragmented mess into a single efficient system.',
  },
  {
    number: 2,
    tag: 'The Solution',
    tagColor: 'bg-amber-100 text-amber-700',
    title: 'The "Uber for Medicine" That Built Its Own Roads',
    teaser:
      'Buymed\'s app lets a pharmacist order 30,000+ products with a few taps. But the real innovation is what happens after the order: a 15,000 sq meter warehouse packing 3,500 orders per day, delivered by Buymed\'s own fleet.',
    image: '/images/comics/pharmexpress/strip-2.jpg',
    imageAlt:
      'A Buymed warehouse in Binh Duong — 15,000 square meters, processing thousands of pharmacy orders daily. Wayne explains how QR code tracking enables "just-in-time" inventory with 1-week turnover.',
    story: [
      'Buymed\'s solution has two layers. The first is visible: a mobile app called thuocsi.vn (which translates to "pharmacy wholesale"). On this app, a pharmacist in any province can browse over 30,000 verified pharmaceutical products, compare prices, check inventory in real time, and place an order with a few taps. No phone calls. No bargaining. No wondering whether the product is in stock. The app digitizes what was previously a network of verbal agreements and paper catalogs.',
      'The second layer is invisible but more important. Buymed realized early that in Vietnam, you cannot be a lightweight platform that outsources delivery. The logistics infrastructure is simply not reliable enough — especially for medicine, which has strict temperature and handling requirements. So Buymed made a capital-intensive bet: build its own warehouses and delivery fleet. Its fulfillment center in Binh Duong province spans 15,000 square meters and processes 3,200 to 3,500 orders every single day. More warehouses in Hanoi and Bac Ninh expanded the network.',
      'This "bytes and mortar" approach — combining a high-tech ordering platform with a physical logistics network — creates a powerful competitive moat. A pure software company cannot match the physical infrastructure. A pure logistics company cannot match the software platform. Buymed\'s innovation is not just in one or the other but in how they integrate: QR code tracking on every product, data analytics driving inventory decisions, and a "just-in-time" fulfillment model that turns inventory in under one week — versus the industry average of three months.',
    ],
    facts: (
      <>
        <p><strong>thuocsi.vn app:</strong> B2B ordering platform with 30,000+ verified pharmaceutical products. Real-time inventory, pricing, and ordering.</p>
        <p><strong>Binh Duong fulfillment center:</strong> 15,000 sq meters, processing 3,200-3,500 orders daily.</p>
        <p><strong>Additional warehouses:</strong> Hanoi, Bac Ninh — expanding the physical network across Vietnam.</p>
        <p><strong>Just-in-time fulfillment:</strong> Inventory turnover of under 1 week vs. industry average of 3 months.</p>
        <p><strong>QR code tracking:</strong> Every product is tracked through the supply chain — improving accuracy and reducing loss.</p>
        <p><strong>38,000+ pharmacies</strong> served as of 2024 — up from 0 in 2018 when the company started from a 50 sq meter mini-warehouse.</p>
      </>
    ),
    lesson: (
      <>
        <p>Buymed\'s "bytes and mortar" strategy challenges the common startup wisdom that "asset-light" is always better. In emerging markets, the most valuable companies are often the ones willing to build physical infrastructure that does not yet exist. A pure software platform cannot solve a problem caused by missing infrastructure — you have to build the infrastructure too.</p>
        <p>The one-week inventory turnover is the key metric. Traditional distributors hold three months of inventory because they lack real-time data on what pharmacies need. Buymed\'s platform gives it perfect demand visibility, so it can carry far less stock, freeing up working capital for both itself and its pharmacy customers. This financial innovation — turning "just in case" inventory into "just in time" — is perhaps Buymed\'s most transformative impact.</p>
      </>
    ),
    lessonTitle: 'Build What\'s Missing',
    tip: 'Ask your child: "If you wanted to start a bakery in a town that has no bakeries, would you just create an app for ordering bread? Or would you also need an oven and a delivery truck?" The answer seems obvious — but lots of startups try the "app only" approach when what the world really needs is "app + oven + truck." Buymed understood that in Vietnam, you cannot skip the physical infrastructure. Sometimes the winning strategy is the one that does the hard, unglamorous work.',
  },
  {
    number: 3,
    tag: 'The Strategy',
    tagColor: 'bg-indigo-100 text-indigo-700',
    title: 'From B2B to Ecosystem',
    teaser:
      'Once Buymed owned the supply chain, it launched its own pharmacy chain — Circa — using a clever franchise model. Same data, more leverage, bigger vision.',
    image: '/images/comics/pharmexpress/strip-3.jpg',
    imageAlt:
      'Wayne and Luna look at the Buymed app — showing how the company expanded from B2B pharma distribution to launching its own Circa pharmacy chain using a franchise model powered by its own supply chain data.',
    story: [
      'Once Buymed had built the supply chain serving 38,000 pharmacies, it faced a classic platform question: what next? The company had accumulated massive amounts of data on which medicines sell where, at what prices, and in what volumes. It had become the "nervous system" of Vietnam\'s pharmaceutical distribution. The natural next step was to leverage that data to build a retail pharmacy chain of its own — Circa Pharmacy.',
      'Circa uses an innovative model called FOCO — "Franchise Owned, Company Operated." Local investors own the physical store; Buymed handles everything else: supply chain, technology, staffing, marketing, training. This gives Buymed the capital efficiency of franchising (someone else funds the store build-out) with the operational control of a company-owned chain (Buymed runs the day-to-day). It is a clever way to expand rapidly without the massive capital expenditure of building 500 company-owned stores.',
      'The data advantage is decisive. Because Buymed already knows exactly which medicines are in demand in each neighborhood, Circa stores can be stocked optimally from day one — no guessing, no trial and error. And because Circa buys from Buymed\'s own B2B network, it gets better pricing than any independent pharmacy. This creates a virtuous cycle: Buymed\'s B2B data makes Circa stores more profitable, and Circa\'s demand further strengthens Buymed\'s purchasing power with manufacturers. The platform gets stronger with every new node added to the network.',
    ],
    facts: (
      <>
        <p><strong>Circa Pharmacy:</strong> Buymed\'s own retail pharmacy chain launched after establishing the B2B supply chain.</p>
        <p><strong>FOCO model:</strong> "Franchise Owned, Company Operated" — local capital + Buymed operations = rapid expansion without massive capex.</p>
        <p><strong>Data advantage:</strong> Buymed\'s B2B data reveals exactly which medicines are in demand in each neighborhood — Circa stores are stocked optimally from day one.</p>
        <p><strong>Supply chain synergy:</strong> Circa buys from Buymed\'s own B2B network, getting better pricing than independent pharmacies.</p>
        <p><strong>Global partnerships:</strong> Strategic alliances with Sanofi, Abbott, and other pharma giants for co-marketing and pharmacist training.</p>
        <p><strong>Regional expansion:</strong> Beyond Vietnam — expanding into Thailand and Cambodia.</p>
        <p><strong>Revenue milestone:</strong> Raised $27M in Series B (2022) led by Northstar Group, with participation from IFC (World Bank) and other investors.</p>
      </>
    ),
    lesson: (
      <>
        <p>Buymed\'s trajectory — from B2B platform to retail chain to healthcare ecosystem — illustrates a powerful platform strategy: build the infrastructure layer first, then expand into higher-value applications on top of it. The B2B distribution network is hard to build but creates deep moats. Once it exists, launching a retail chain is relatively easy because the infrastructure (supply chain, data, logistics) is already in place.</p>
        <p>The FOCO franchise model is also worth studying. It solves the classic tension in retail expansion: company-owned stores give you control but cost a fortune; franchises give you capital but sacrifice quality. FOCO splits the difference — local investors provide capital, Buymed provides everything that matters for quality. It is the kind of creative business model innovation that distinguishes great companies from good ones.</p>
      </>
    ),
    lessonTitle: 'Build the Layer, Then the Application',
    tip: 'Ask your child: "If you built the only road connecting two towns, what other businesses could you start along that road?" A gas station? A restaurant? A delivery service? The road (infrastructure) enables many businesses on top of it. Buymed\'s supply chain is the road; Circa pharmacy is one of the businesses built on top. This is why the most powerful companies often start by building infrastructure — everything else can be added later.',
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

function AboutPharmExpress() {
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
            <span className="text-indigo-600 text-sm font-bold">BM</span>
          </div>
          <div>
            <p className="font-bold text-slate-800">About Buymed / PharmExpress</p>
            <p className="text-xs text-slate-400 mt-0.5">Digitizing pharmacy supply chains across Southeast Asia</p>
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
                  <p className="font-semibold text-slate-800 mb-1">What Buymed Does</p>
                  <p>Buymed is a B2B healthcare platform that digitizes pharmaceutical supply chains in Vietnam and Southeast Asia. It connects 38,000+ independent pharmacies with 30,000+ pharmaceutical products through a mobile ordering app, supported by its own warehouse network and delivery fleet.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">The Technology</p>
                  <p>thuocsi.vn mobile app for pharmacy ordering (30,000+ products, real-time inventory and pricing). QR code tracking across the supply chain. Data analytics enabling just-in-time fulfillment with under 1-week inventory turnover.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">The Business Model</p>
                  <p>B2B marketplace taking a margin on pharmaceutical distribution. Recently expanded into B2C retail through Circa Pharmacy (FOCO franchise model). Expanding into Thailand and Cambodia. Strategic partnerships with Sanofi, Abbott, and other global pharma companies.</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-slate-800 mb-1">The Founders</p>
                  <p>Chairman Peter Nguyen, CEO Hoang Nguyen (Forbes Asia 30 Under 30, Endeavor Entrepreneur), and VP Vu Vuong. Hoang Nguyen previously built and operated a profitable dental platform in Los Angeles before returning to Vietnam to tackle healthcare distribution.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">Why It Matters for Kids</p>
                  <p>This story is about how infrastructure determines access. Whether a child in rural Vietnam can get the medicine they need depends on whether there is a supply chain that reaches their town. Buymed shows that building infrastructure — as unglamorous as it sounds — can be as innovative and impactful as building the next social media app. Sometimes the most meaningful innovation is invisible: a warehouse, a delivery route, a QR code on a medicine box.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">Learn More</p>
                  <p>
                    <a href="https://buymed.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 font-medium">
                      buymed.com
                    </a>
                    {' '}— company information and platform details.
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

export default function WayneComicPharmExpress() {
  const totalStrips = strips.length;
  return (
    <>
      <SEOHead
        title="Startup Stories #11: Buymed — Digitizing Pharmacy Supply Chains in Vietnam | Wayne's Comics"
        description="A parent-child comic series about real startups. Episode 11: Buymed — the Vietnamese health-tech platform connecting 38,000 pharmacies through a digital B2B marketplace and its own logistics network."
        ogImage="/images/comics/pharmexpress/cover.jpg"
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
          <img src="/images/comics/pharmexpress/cover.jpg" alt="Startup Stories #11: Buymed — Vietnam pharmacy supply chain" className="w-full h-auto" />
        </div>
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-bold rounded-full uppercase tracking-wide">
            Startup Stories · Episode 11 of 25
          </span>
          <span className="text-xs text-slate-400">June 2026 · {totalStrips} strips · 🇻🇳 Vietnam</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3 leading-tight">
          The "Uber for Medicine" That Built Its Own Roads
        </h1>
        <p className="text-slate-500 leading-relaxed mb-5 max-w-2xl">
          57,000 pharmacies. 1,500 distributors. No single supplier carries more than 200 products. 
          Buymed built a digital B2B marketplace connecting both sides — and when Vietnam\'s roads 
          weren\'t reliable enough, they built their own warehouses and delivery fleet too. 
          Episode 11 of 25 real startup stories.
        </p>
        <ShareBar
          title="Startup Stories #11: Buymed — Digitizing Pharmacy Supply Chains"
          summary="A 3-strip parent-child comic about Buymed — the Vietnamese health-tech platform that digitized 38,000 pharmacies and built its own logistics infrastructure."
        />
      </motion.div>

      <div className="space-y-6 mb-10">
        {strips.map((strip, i) => (
          <motion.div key={strip.number} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.1 + i * 0.07 }}>
            <StripCard strip={strip} total={totalStrips} />
          </motion.div>
        ))}
      </div>

      <AboutPharmExpress />

      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.4 }}
        className="flex items-center justify-between py-6 border-t border-slate-200 mb-10"
      >
        <Link to="/wayne/comics" className="text-sm text-slate-400 hover:text-slate-700 transition-colors">
          ← All Comics
        </Link>
        <ShareBar title="Startup Stories #11: Buymed" summary="A parent-child comic about the Vietnamese health-tech platform digitizing pharmacy supply chains across Southeast Asia." />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.45 }}
        className="bg-indigo-600 rounded-2xl px-8 py-10 text-center text-white"
      >
        <h2 className="text-xl font-bold mb-2">More startup stories coming</h2>
        <p className="text-indigo-100 text-sm mb-6 max-w-md mx-auto">
          This is Episode 11 of 25. Each story is about a real company solving a real problem — told in a way that makes sense to a 15-year-old, with analysis for the parent reading along.
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
