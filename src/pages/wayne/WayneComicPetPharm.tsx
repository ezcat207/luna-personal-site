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
    title: 'Your Cat Is Sick — and Your Only Option Is to Pay Double',
    teaser:
      'In South Korea, 15 million pets live in loving homes — but their owners face a brutal choice: pay double the price at the vet for medication, or embark on a hopeless hunt through pharmacies that do not stock animal medicine. The market is broken not by demand, but by a complete failure of distribution.',
    image: '/images/comics/petpharm/strip-1.jpg',
    imageAlt:
      'Luna and Wayne at a Korean pharmacy counter. Luna holds a sick cat. The pharmacist shrugs apologetically — they do not carry pet medication. A sign on the wall says they are "legally authorized" to sell animal drugs, but they have no inventory and no training.',
    story: [
      'South Korea is one of the most pet-obsessed countries in the world. Over 15 million pets live in Korean homes — more than one for every three people. Pet owners spend lavishly on food, grooming, toys, and clothing. But when their dog needs heartworm prevention or their cat needs deworming medication, they hit a wall. The system does not work.',
      'Pet owners face a painful dilemma. Option one: go to the animal hospital. The vet has every medication in stock, the staff is knowledgeable, and the service is professional. But the prices are brutal — sometimes double what the same medication would cost at a human pharmacy. A course of heartworm prevention that costs $20 at a pharmacy might be $40 or more at the vet. For a country with 15 million pets, this extra cost adds up to hundreds of millions of dollars annually.',
      'Option two: try the local community pharmacy. The medication would be cheaper — much cheaper. But 99% of pharmacies do not carry animal medication. Even though Korean law technically allows licensed pharmacists to apply for "animal pharmacy" status and sell animal drugs, almost none actually do. Why? Because they have no supply chain for animal medicine, no training on animal vs. human dosages, no way to manage inventory that has different expiration profiles than human drugs, and no confidence that they will not make a mistake that harms someone\'s beloved pet.',
      'The result is a market where the law says pharmacies CAN sell pet medication, but reality says they WON\'T. Pet owners are forced to overpay at vets or, in the worst cases, turn to illegal overseas online sellers who ship unregulated, counterfeit, or expired medications. The problem is not a lack of demand — it is a complete dysfunction of the distribution channel.',
    ],
    facts: (
      <>
        <p><strong>15 million pets</strong> in South Korea — more than one for every three people. One of the highest pet ownership rates in Asia.</p>
        <p><strong>Pet medication price gap:</strong> The same medication can cost 2x more at an animal hospital than at a human pharmacy — because the vet has a monopoly on access.</p>
        <p><strong>Legal vs. operational:</strong> Korean law allows licensed pharmacists to apply for "animal pharmacy" status. But nearly none do — because they lack supply chain, training, inventory systems, and confidence.</p>
        <p><strong>Illegal gray market:</strong> Frustrated pet owners increasingly turn to unregulated overseas online sellers for pet medication — risking counterfeit or expired products that can harm or kill their pets.</p>
        <p><strong>Structural paradox:</strong> 12,000+ registered "animal pharmacies" exist in Korea\'s legal system, but the vast majority are operationally inactive. A dormant asset waiting to be activated.</p>
      </>
    ),
    lesson: (
      <>
        <p>This is a textbook example of what business strategists call a "channel failure." The product exists (pet medication), the demand exists (15 million pets need it), and the legal framework exists (pharmacies can sell it). But the operational infrastructure does not exist — no supply chain, no training, no inventory system, no confidence. The market is like a car with a full gas tank, a working engine, and a legal driver\'s license — but no one has connected the steering wheel to the wheels.</p>
        <p>For kids, this is an important lesson about the difference between "legal permission" and "operational capability." Just because you are allowed to do something does not mean you can actually do it. PetPharm\'s founder recognized that the bottleneck was not legal or regulatory — it was operational. He did not try to change the law. He built the infrastructure to make the law actually work in practice.</p>
      </>
    ),
    lessonTitle: 'The Difference Between "Allowed" and "Possible"',
    tip: 'Ask your child: "What is something you are allowed to do but cannot actually do because you lack the tools, knowledge, or support?" Maybe you can cook dinner, but you do not know any recipes. Maybe you can build a treehouse, but you have no wood or nails. PetPharm\'s insight was that thousands of pharmacies were "allowed" to sell pet medicine but had no "infrastructure" to actually do it. The most valuable businesses often bridge exactly this gap — between permission and capability.',
  },
  {
    number: 2,
    tag: 'The Solution',
    tagColor: 'bg-amber-100 text-amber-700',
    title: 'The B2B Engine That Turned 6,000 Pharmacies into Pet Pharmacies Overnight',
    teaser:
      'PetPharm built a B2B platform that handles everything a pharmacy needs to sell pet medication: sourcing, inventory management, expiration tracking, and an AI assistant that tells pharmacists the correct dosage for a 12-pound cat versus a 60-pound dog.',
    image: '/images/comics/petpharm/strip-2.jpg',
    imageAlt:
      'A Korean pharmacist uses PetPharm\'s AI assistant on a tablet. The screen shows the correct medication and dosage for a cat versus a dog. Luna and Wayne watch as the pharmacist confidently hands pet medicine to a grateful customer.',
    story: [
      'In 2019, Yoon Sunghan founded PetPharm with a simple but powerful insight: the problem was not the pharmacies — it was the missing infrastructure between the pharmacies and the pet medication supply chain. If he could build that infrastructure, he could unlock a network of thousands of sales points overnight — without building a single new store or hiring a single veterinarian.',
      'PetPharm\'s B2B platform is comprehensive. It handles everything a community pharmacist needs to start selling animal medication: supply chain sourcing (finding reliable suppliers of quality pet medications), inventory management (tracking stock levels, expiration dates, and reorder points), logistics and delivery (getting the right products to the right pharmacies), regulatory compliance (ensuring all products meet Korean animal drug regulations), and recall management (quickly pulling any defective or expired products from the entire network).',
      'The most innovative feature is PetPharm\'s AI-powered assistant for pharmacists. A human pharmacist knows human drugs inside and out — but a 5mg dose of a medication might be correct for a 60-pound dog but fatal for an 8-pound cat. PetPharm\'s AI system guides the pharmacist through every prescription: verifying the correct species, weight-based dosage, potential drug interactions with other medications the pet might be taking, and proper administration instructions. The pharmacist does not need to become a veterinary expert — the AI provides the expertise.',
      'The growth has been explosive. From launch in 2020, PetPharm hit 1,000 member pharmacies in one year, 3,000 by 2023, 5,000 by August 2024, and over 6,000 by May 2025 — representing approximately 50% of all animal pharmacies in South Korea. Monthly revenue grew from 60 million KRW (~$45K) at launch to 1.4 billion KRW (~$1M) by mid-2022. Total investment reached 10.5 billion KRW ($8-9M) by the B round.',
    ],
    facts: (
      <>
        <p><strong>PetPharm:</strong> Founded 2019 by Yoon Sunghan in South Korea. A B2B platform connecting community pharmacies with pet medication supply chains.</p>
        <p><strong>Growth trajectory:</strong> 2020 (launch) → 1,000 pharmacies (2021) → 3,000 (2023) → 5,000 (Aug 2024) → 6,000+ (May 2025). In 5 years, captured 50% of Korea\'s animal pharmacy market.</p>
        <p><strong>Revenue growth:</strong> From 60 million KRW/month (~$45K) at launch to 1.4 billion KRW/month (~$1M) by mid-2022.</p>
        <p><strong>Total investment:</strong> 10.5 billion KRW (~$8-9M) cumulative by Series B.</p>
        <p><strong>AI assistant:</strong> Built-in AI system that guides pharmacists through species-specific dosing, weight-based calculations, drug interactions, and administration instructions. Turns a human pharmacist into a pet medication expert without requiring veterinary training.</p>
        <p><strong>Full-service B2B platform:</strong> Supply chain sourcing, inventory management, logistics, regulatory compliance, and recall management — all handled by PetPharm so the pharmacist only needs to serve the customer.</p>
      </>
    ),
    lesson: (
      <>
        <p>PetPharm\'s model is a textbook example of "B2B platform" strategy — sometimes called the "infrastructure play." Instead of building their own retail stores (expensive, slow, risky), they built the infrastructure that enables thousands of existing stores to enter a new market. They are not a pet pharmacy chain — they are the operating system for the pet pharmacy network.</p>
        <p>This is one of the most capital-efficient strategies in business. PetPharm did not need to build 6,000 stores. They did not need to hire 6,000 pharmacists. They did not need to acquire 6,000 customer bases. All those assets already existed — they were just dormant. PetPharm\'s job was to "activate" them by removing the operational barriers. This is the difference between building from scratch and unlocking what already exists.</p>
      </>
    ),
    lessonTitle: 'The Smartest Way to Scale Is Not to Build — It Is to Unlock',
    tip: 'Ask your child: "If you wanted to sell lemonade in every store in town, would you build 100 lemonade stands yourself, or would you find 100 stores that already exist and give them a way to sell your lemonade?" The second option is what PetPharm did. They did not build new pharmacies — they gave 6,000 existing pharmacies the tools to sell pet medication. This teaches kids that growth does not always mean building from scratch. Sometimes the smartest strategy is to find existing assets that are sitting idle and build the bridge to activate them.',
  },
  {
    number: 3,
    tag: 'The Strategy',
    tagColor: 'bg-indigo-100 text-indigo-700',
    title: 'From Distribution to Domination: When the Middleman Becomes the Manufacturer',
    teaser:
      'Once PetPharm controlled 50% of Korea\'s pet medication distribution, they flipped the board. In 2025, they obtained a drug manufacturing license and announced "K-Pet Medicine" — replacing expensive imported drugs with their own brands, sold through their own network.',
    image: '/images/comics/petpharm/strip-3.jpg',
    imageAlt:
      'A flowchart showing PetPharm\'s evolution: from B2B platform connecting suppliers to pharmacies, to manufacturing their own pet medications. Wayne explains to Luna how controlling distribution lets you control the entire market.',
    story: [
      'By 2025, PetPharm had achieved something remarkable: they controlled distribution to half of Korea\'s animal pharmacy market. Every day, 6,000 pharmacies relied on PetPharm for their pet medication inventory. PetPharm knew exactly which products sold best, at what prices, in which regions, during which seasons. They had more data about the Korean pet medication market than any company in history.',
      'That is when they made their boldest move. In February 2025, PetPharm announced that they had obtained an "animal drug manufacturing license." They were no longer just a distributor — they were now a manufacturer. They announced the "K-Pet Medicine" strategy: a plan to develop and manufacture their own branded pet medications to replace expensive imported drugs from multinational corporations like Zoetis, Merck, and Boehringer Ingelheim.',
      'The strategic logic is devastatingly simple. PetPharm has three massive advantages as a manufacturer. First, "data de-risked R&D" — they know exactly which products to make, at what price points, in what dosages, because they have 6,000 pharmacies worth of sales data. No guessing. No market research. Just execution on known demand. Second, "guaranteed distribution" — when PetPharm\'s first own-brand medication rolls off the production line, it does not need a single dollar of marketing or a single sales call. It already has 6,000 pharmacy shelves waiting for it. Third, "vertical margin capture" — instead of taking a distribution fee on someone else\'s product, PetPharm captures the entire profit from manufacturing to retail sale.',
      'The "reasonable pricing" that PetPharm promises in its K-Pet Medicine announcement is not charity — it is strategy. By manufacturing domestically and controlling the full value chain, PetPharm can undercut imported drugs on price while still making higher margins than they ever did as a pure distributor. Consumers pay less, PetPharm earns more, and foreign pharmaceutical companies get squeezed out of the Korean market. This is platform evolution at its most powerful: start as the middleman, become the platform, then become the product.',
    ],
    facts: (
      <>
        <p><strong>February 2025:</strong> PetPharm obtained an animal drug manufacturing license — transitioning from a pure distributor to a manufacturer.</p>
        <p><strong>K-Pet Medicine strategy:</strong> Domestic manufacturing of pet medications to replace expensive imported drugs. "国产化" (domestic production) as a competitive weapon.</p>
        <p><strong>Three strategic advantages:</strong> (1) Data de-risked R&D — 6,000 pharmacies of sales data tell them exactly what to make. (2) Guaranteed distribution — no marketing or sales needed for new products. (3) Full vertical margin — capture profit from manufacturing through retail.</p>
        <p><strong>The incumbents:</strong> Multinational corporations like Zoetis, Merck, and Boehringer Ingelheim have dominated the Korean pet medication market for decades. PetPharm\'s manufacturing play is a direct challenge to their pricing power.</p>
        <p><strong>Platform → product evolution:</strong> PetPharm\'s trajectory is a pattern seen in the most successful platforms: start by distributing others\' products (Amazon), then introduce your own brands (Amazon Basics). The platform gives you the data, distribution, and customer trust to become a product company.</p>
        <p><strong>50% market share:</strong> 6,000+ pharmacies = ~50% of Korea\'s animal pharmacy network. PetPharm is no longer a startup — it is national infrastructure.</p>
      </>
    ),
    lesson: (
      <>
        <p>PetPharm\'s evolution from distributor to manufacturer is one of the most powerful strategic patterns in business. It is the same playbook that Amazon used with Amazon Basics, that Alibaba used with its own brands, and that every successful marketplace has eventually deployed. The insight: once you control the distribution channel, you can afford to become a manufacturer — because your distribution costs are zero.</p>
        <p>This is called "vertical integration" — controlling more than one step in the value chain. PetPharm started at the distribution step and is now moving backward to manufacturing. The beauty is that each step makes the next one easier: distribution gives you data, data tells you what to manufacture, manufacturing gives you margin, margin lets you invest in better distribution. It is a flywheel that gets stronger with every turn.</p>
      </>
    ),
    lessonTitle: 'Control the Channel, Then Own the Product',
    tip: 'Ask your child: "If a lemonade stand sells 100 cups of someone else\'s lemonade every day, should they start making their own lemonade?" The answer is yes — if they know exactly how much customers buy, at what price, and what flavors they like. That is what PetPharm did. They spent 5 years being the best distributor, learning everything about the market, and only then started making their own products. This teaches kids a crucial lesson about timing: the best time to launch your own product is after you have already mastered the distribution of everyone else\'s.',
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

function AboutPetPharm() {
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
            <span className="text-sky-600 text-sm font-bold">PP</span>
          </div>
          <div>
            <p className="font-bold text-slate-800">About PetPharm</p>
            <p className="text-xs text-slate-400 mt-0.5">B2B platform turning Korean community pharmacies into pet medication retailers</p>
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
                  <p className="font-semibold text-slate-800 mb-1">What PetPharm Does</p>
                  <p>PetPharm is a B2B platform that enables community pharmacies in South Korea to sell animal medication. It handles supply chain sourcing, inventory management, logistics, regulatory compliance, and provides an AI assistant for dosage guidance. With 6,000+ member pharmacies, it controls ~50% of Korea\'s animal pharmacy distribution.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">The Technology</p>
                  <p>AI-powered assistant for pharmacists that provides species-specific dosing, weight-based calculations, and drug interaction checking. Cloud-based inventory and expiration management across 6,000+ pharmacy locations. Data analytics platform for demand forecasting and supply chain optimization.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">The Business Model</p>
                  <p>Phase 1 (2019-2024): B2B distribution platform — connecting pharmacies with pet medication suppliers, earning a margin on each transaction. Phase 2 (2025+): Vertical manufacturer — producing own-brand "K-Pet Medicine" to replace expensive imported drugs, capturing full manufacturing-to-retail margin.</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-slate-800 mb-1">The Founder</p>
                  <p>Yoon Sunghan — recognized that Korean pharmacies were legally allowed but operationally unable to sell pet medication. Built the B2B infrastructure to bridge the gap between legal permission and operational capability. Led the company from launch in 2019 to 50% market share and a manufacturing license by 2025.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">Why It Matters for Kids</p>
                  <p>PetPharm teaches the power of "infrastructure thinking" — building the bridge between what is legally possible and what is operationally practical. It also teaches a sophisticated strategy pattern: start as a distributor to learn the market and build the network, then use that position to become a manufacturer. This "platform-to-product" evolution is one of the most powerful business strategies in the world — used by Amazon, Alibaba, and now PetPharm.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">Learn More</p>
                  <p>
                    <a href="https://www.petpharm.kr" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 font-medium">
                      petpharm.kr
                    </a>
                    {' '}— official website (Korean). The company is primarily domestic but the model has global relevance.
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

export default function WayneComicPetPharm() {
  const totalStrips = strips.length;
  return (
    <>
      <SEOHead
        title="Startup Stories #24: PetPharm — Turning 6,000 Pharmacies into Pet Medication Retailers | Wayne's Comics"
        description="A parent-child comic series about real startups. Episode 24: PetPharm — a Korean B2B platform that activated 50% of the country's pharmacies to sell pet medication, then became a manufacturer to replace expensive imported drugs with domestic alternatives."
        ogImage="/images/comics/petpharm/cover.jpg"
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
          <img src="/images/comics/petpharm/cover.jpg" alt="Startup Stories #24: PetPharm — turning Korean community pharmacies into pet medication retailers" className="w-full h-auto" />
        </div>
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-bold rounded-full uppercase tracking-wide">
            Startup Stories · Episode 24 of 25
          </span>
          <span className="text-xs text-slate-400">June 2026 · {totalStrips} strips · 🇰🇷 South Korea</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3 leading-tight">
          The B2B Engine That Turned 6,000 Pharmacies into Pet Pharmacies
        </h1>
        <p className="text-slate-500 leading-relaxed mb-5 max-w-2xl">
          In South Korea, 15 million pets need medication — but pet owners were forced to 
          pay double at the vet or hunt hopelessly through pharmacies. PetPharm built a B2B 
          platform that gave 6,000 community pharmacies the supply chain, training, and AI 
          tools to sell pet medicine. Then they became a manufacturer. Episode 24 of 25.
        </p>
        <ShareBar
          title="Startup Stories #24: PetPharm — B2B Pet Medication Platform"
          summary="A 3-strip parent-child comic about PetPharm — a Korean B2B platform that activated 50% of community pharmacies to sell pet medication, then evolved into manufacturing."
        />
      </motion.div>

      <div className="space-y-6 mb-10">
        {strips.map((strip, i) => (
          <motion.div key={strip.number} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.1 + i * 0.07 }}>
            <StripCard strip={strip} total={totalStrips} />
          </motion.div>
        ))}
      </div>

      <AboutPetPharm />

      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.4 }}
        className="flex items-center justify-between py-6 border-t border-slate-200 mb-10"
      >
        <Link to="/wayne/comics" className="text-sm text-slate-400 hover:text-slate-700 transition-colors">
          ← All Comics
        </Link>
        <ShareBar title="Startup Stories #24: PetPharm" summary="A parent-child comic about PetPharm — a Korean B2B platform turning pharmacies into pet medication retailers." />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.45 }}
        className="bg-indigo-600 rounded-2xl px-8 py-10 text-center text-white"
      >
        <h2 className="text-xl font-bold mb-2">More startup stories coming</h2>
        <p className="text-indigo-100 text-sm mb-6 max-w-md mx-auto">
          This is Episode 24 of 25. Each story is about a real company solving a real problem — told in a way that makes sense to a 15-year-old, with analysis for the parent reading along.
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
