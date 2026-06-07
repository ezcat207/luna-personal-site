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
    tag: 'The Trust Problem',
    tagColor: 'bg-red-100 text-red-700',
    title: 'The Information Asymmetry That Costs Billions',
    teaser:
      'Rice quality inspection is a billion-dollar trust problem hiding in plain sight — and the solution was a camera and a database.',
    image: '/images/comics/easyrice/strip-1.jpg',
    imageAlt:
      'Luna and Wayne inspect rice grains side by side, illustrating how even experts struggle to tell expensive Thai Jasmine rice apart from cheaper varieties by eye alone.',
    story: [
      'The rice supply chain has three distinct trust breakdowns, each compounding the next. Farmers sell paddy rice to mills and get underpaid — the mill claims quality is substandard, but the farmer has no objective way to dispute it. Mills sell milled rice to exporters and inflate purity claims, knowing the exporter cannot easily verify. Exporters sell to international buyers who, upon arrival, may reject an entire multi-million-dollar shipment if testing reveals contamination. Nobody is held accountable because there was never a shared, objective standard.',
      'This is a textbook case of information asymmetry — a condition economists define as a situation where one party in a transaction holds significantly more or better information than the other. The party with less information (the buyer) cannot accurately assess the quality of what they are purchasing, so prices become unreliable and trust erodes. In George Akerlof\'s Nobel Prize-winning 1970 paper "The Market for Lemons," he showed that information asymmetry eventually drives high-quality producers out of the market entirely: if buyers cannot distinguish good rice from bad, they will only pay an average price, making it unprofitable to produce and sell high-quality rice honestly.',
      'The existing solutions failed at scale for different reasons. Human experts were inconsistent between inspectors and across fatigue levels, creating a system that produced different answers to the same question depending on who you asked and when. DNA testing was laboratory-grade accurate but took days and cost far too much for routine commercial use. Neither solution could be deployed at the volume Thailand\'s rice export market requires — hundreds of thousands of inspections per year. EasyRice identified this gap not as a technology problem to be solved with technology, but as a trust infrastructure problem where technology happened to be the right tool.',
    ],
    facts: (
      <>
        <p><strong>Thailand</strong> is one of the world's top rice exporters, sending millions of tonnes annually to buyers across Asia, Europe, and the Middle East.</p>
        <p><strong>A single rejected shipment</strong> to Europe can represent several million dollars in lost revenue — plus penalties, logistics costs, and reputational damage to the exporter and Thailand's rice brand.</p>
        <p><strong>Human experts disagree:</strong> independent inspectors examining the same rice sample can reach different conclusions on variety purity, creating disputes that have no resolution mechanism.</p>
        <p><strong>DNA testing</strong> is the gold standard for accuracy but takes 2–5 days and costs significantly more than pay-per-use AI inspection — making it impractical for routine screening of every shipment.</p>
        <p><strong>84 Thai rice varieties</strong> must be distinguished, many of which are visually similar to non-expert eyes — including the premium Thai Jasmine (Hom Mali) that commands 3x the price of ordinary long-grain varieties.</p>
      </>
    ),
    lesson: (
      <>
        <p>Akerlof's "Market for Lemons" demonstrated that in markets with persistent information asymmetry, quality collapses toward the lowest common denominator. Sellers of high-quality goods cannot credibly signal their quality, so they either exit the market or accept the same price as low-quality sellers. The rational response to being unable to prove quality is to stop producing quality.</p>
        <p>EasyRice is literally a market-repair mechanism. By providing an objective, cheap, fast quality signal, it restores the condition that allows high-quality producers to capture the premium their quality deserves. The Thai farmer who grows genuine Jasmine rice can now prove it. That proof is economically valuable — not just operationally convenient.</p>
        <p>This framing helps parents explain why "being able to measure things" is foundational to fair markets. Standardized weights and measures, food safety testing, financial auditing — all are trust infrastructure that makes markets function. EasyRice is adding a new layer to that infrastructure for agriculture.</p>
      </>
    ),
    lessonTitle: 'Information Asymmetry as a Market Failure',
    tip: '"The Market for Lemons" is a Nobel Prize-winning economics concept your child can fully understand through this story. Ask them: "If buyers cannot tell good rice from bad rice, why would anyone bother growing the expensive kind?" Then walk through why a trustworthy test changes everything. The conversation naturally leads to why we have food labels, safety inspections, and financial audits — all are solutions to the same underlying problem.',
  },
  {
    number: 2,
    tag: 'The Founder',
    tagColor: 'bg-amber-100 text-amber-700',
    title: 'Find the Nail First, Then Build the Hammer',
    teaser:
      "Phuvin Kongsawat's founding philosophy: spend years understanding the industry before building anything.",
    image: '/images/comics/easyrice/strip-2.jpg',
    imageAlt:
      'Thai rice farmers work in paddy fields while Kongsawat, as an engineer, walks among them learning the industry from the ground up before designing any technology.',
    story: [
      'Phuvin Kongsawat is an engineer who made a deliberate choice to enter the agricultural industry in 2017 — not because he had a product idea, but because he was looking for the deepest structural problem he could find. This is an unusual founder archetype. Most technology entrepreneurs start with a solution they want to build and then search for the problem it solves. Kongsawat inverted the sequence: years of industry immersion first, product concept second.',
      'What he found during that immersion was not a missing feature or a broken workflow. He found a missing institution: there was no objective, trusted third-party quality standard for rice that operated at commercial speed and commercial price. Every participant in the supply chain was either cheating or being cheated, not necessarily out of malice, but because the information gap made cheating easy and getting caught unlikely. The root cause was not bad actors — it was bad infrastructure.',
      'Rejecting "technology first" in favor of "problem first" shaped every subsequent product decision. The 84-variety database was not built because it was technically interesting — it was built because that is how many varieties Thai buyers and sellers needed to distinguish. The LINE integration was not a feature addition — it was the primary distribution channel because that is how Thai rice industry professionals already communicated. The pay-per-use pricing was not an experiment — it was the only model that could reach smallholder farmers. Each choice traces directly back to the problem as understood from inside the industry, not from outside it.',
    ],
    facts: (
      <>
        <p><strong>EasyRice was founded in 2019</strong> by Phuvin Kongsawat after approximately two years of agricultural industry research and engagement.</p>
        <p><strong>10 million+ rice grain images</strong> were captured and labeled to train the AI — a data collection effort that required deep industry relationships to access the variety and volume of samples needed.</p>
        <p><strong>95% accuracy</strong> on variety identification, validated against expert human inspectors and DNA testing results.</p>
        <p><strong>3 to 5 minutes</strong> per inspection — compared to days for DNA testing and hours for expert human inspection of a large sample batch.</p>
        <p><strong>84 rice variety database</strong> covering all commercially significant Thai rice types, including the premium Hom Mali (Thai Jasmine) varieties with multiple sub-classifications.</p>
        <p><strong>25 official Thai quality standards</strong> incorporated into the EASYRICE M0 grading system, including broken grain percentage, yellow grain count, chalky grain ratio, and foreign material content.</p>
        <p><strong>LINE messaging integration</strong> means results are delivered directly inside the communication tool the industry already uses — zero adoption friction.</p>
      </>
    ),
    lesson: (
      <>
        <p>The best deep-tech founders in domains like agriculture, manufacturing, and healthcare share an unusual characteristic: they have domain depth that is genuinely rare, not just Wikipedia-level familiarity. Kongsawat's two years of industry immersion before building is not a charming origin story detail — it is the actual source of competitive advantage. The product decisions that drove EasyRice's adoption (LINE integration, pay-per-use, specific variety coverage) are only visible as correct decisions if you understand the industry from the inside.</p>
        <p>This is the "rare founder" archetype: someone who combines domain depth with technical breadth and the patience to resist building until the problem is truly understood. It is rarer than technical skill alone, and often more valuable. The technology for AI vision inspection existed before EasyRice. The insight about which problem to apply it to, and how to package and price it for this specific market, required something technology could not provide.</p>
      </>
    ),
    lessonTitle: 'The Rare Founder Who Earns Their Domain',
    tip: 'Ask your child: "What would you need to understand before you could build something that fixes farming?" Follow the thread — soil chemistry, weather patterns, equipment costs, how farmers negotiate prices, how rice gets transported, who the buyers are, what regulations exist. The answer reveals how complex seemingly simple industries are, and builds genuine respect for expertise. Then flip it: "Is there an industry you already know well from the inside?" Family businesses, hobbies, and communities are underrated sources of founder insight.',
  },
  {
    number: 3,
    tag: 'The Traction',
    tagColor: 'bg-indigo-100 text-indigo-700',
    title: '30% Market Share in One Year',
    teaser:
      "Capturing 30% of a country's national export inspection market within 12 months of launch — what that means, and why it happened so fast.",
    image: '/images/comics/easyrice/strip-3.jpg',
    imageAlt:
      'The EasyRice AI visual system processes rice grains at a mill, with results delivered instantly via LINE to buyers and sellers across the supply chain.',
    story: [
      'Thirty percent of a national market in year one is an extraordinary adoption number for any B2B product, let alone one in a traditional industry like rice milling. The question worth examining is not just what the number is, but why adoption happened so fast — because the answer reveals the actual drivers of growth, which were not the technology itself.',
      'The pay-per-use pricing model was the critical adoption unlock. The alternative — selling hardware or annual licenses — would have required mills and exporters to make a capital commitment before experiencing the product\'s value. Pay-per-use eliminated that barrier entirely. Each inspection was a contained, low-risk transaction. A mill manager could run one test on a single shipment, see the result, compare it to their expert\'s assessment, and make an independent judgment about whether the tool was valuable. The risk of being wrong was the cost of one inspection, not a multi-year contract. This is a specific pricing strategy insight: in markets where trust in a new product category is low, pay-per-use converts skeptics in a way that subscription or license pricing cannot.',
      'The LINE integration was equally important, and it represents something deeper than a feature decision. It was a distribution strategy. LINE is not just popular in Thailand — it is the medium through which Thai business communication actually happens. Rice quality inspection results that arrive in LINE look and feel like any other business communication. There is no new interface to learn, no login to manage, no separate system to check. The product inserted itself into existing workflow rather than requiring users to adopt a new one. Combining zero adoption friction with zero upfront cost created a self-propagating spread: the first user at a mill shared a report via LINE, and the recipient saw the format and immediately understood how to request their own.',
    ],
    facts: (
      <>
        <p><strong>30% of Thailand's rice export inspection market</strong> captured within the first year of commercial launch — one of the fastest market penetrations recorded for a B2B agri-tech product in Southeast Asia.</p>
        <p><strong>300+ large industrial users</strong> including major rice mills and exporters — the high-volume customers whose adoption validated the product for the broader market.</p>
        <p><strong>20,000+ individual farmers</strong> using the platform — enabled by pay-per-use pricing that made professional-grade inspection economically accessible to smallholders.</p>
        <p><strong>500,000+ inspection batches</strong> completed, generating a proprietary dataset of Thai rice quality data that no competitor can replicate.</p>
        <p><strong>10 million+ tonnes of rice</strong> covered — roughly equivalent to a significant fraction of Thailand's total annual rice export volume.</p>
        <p><strong>Vietnam: 25+ trial customers</strong> already active as of the expansion phase, validating that the model translates across Southeast Asian rice markets.</p>
        <p><strong>EXAMBRISK launched in 2024</strong> — applying the same visual AI capability to electronics defect detection and drone-based roof inspection, proving the platform thesis.</p>
      </>
    ),
    lesson: (
      <>
        <p>The EasyRice growth story is a case study in distribution as the primary moat — not technology. The visual AI capability was necessary but not sufficient. Dozens of computer vision companies could have built a rice inspection tool. What EasyRice built that no competitor could easily copy was the distribution architecture: the LINE integration that made adoption frictionless, the pay-per-use model that removed financial barriers, and the 500,000-inspection dataset that makes the model continuously better than any new entrant starting from scratch.</p>
        <p>Most deep-tech startups fail not because the technology does not work, but because they cannot get users to adopt it. The technology-first founder often underweights distribution. EasyRice\'s success is attributable at least as much to how the product was delivered as to what the product did. This is the lesson for children who want to build things: the best idea in the world does not reach people automatically. Getting to people is its own hard problem, deserving as much creative attention as the solution itself.</p>
      </>
    ),
    lessonTitle: 'Distribution as the Real Moat',
    tip: 'The LINE messaging integration is a perfect, concrete example of "meet the user where they are." Explore this with your child using their own apps: if you were building a homework helper, would you make it a new app, or would you make it work inside the apps kids already use every day? The conversation reveals why distribution friction is real, and why the best tools often succeed by fitting into existing habits rather than requiring new ones.',
  },
  {
    number: 4,
    tag: 'The Platform',
    tagColor: 'bg-emerald-100 text-emerald-700',
    title: 'From Rice Grains to a Visual AI Empire',
    teaser:
      'EasyRice started with rice. But the deeper asset was a proprietary visual AI capability that could inspect anything.',
    image: '/images/comics/easyrice/strip-4.jpg',
    imageAlt:
      'A farmer holds her phone with EasyRice results while in the background the same AI technology extends to electronics inspection and roof surveying — the same eyes, different problems.',
    story: [
      'The investor composition of EasyRice is worth analyzing carefully because it reveals the actual thesis behind the company. Yip In Tsoi is Thailand\'s largest fertilizer and agricultural technology company. Their interest in EasyRice is not primarily financial — it is strategic data access. Every inspection EasyRice processes contributes to a growing map of Thai agricultural quality: which regions produce higher-purity Jasmine rice, how quality varies across seasons and growing conditions, which mills maintain consistent standards. This is agricultural infrastructure data, and Yip In Tsoi\'s core business — advising farmers on inputs, predicting yields, optimizing supply chains — becomes more valuable as that data improves. Acquiring a stake in EasyRice is acquiring a stake in the agricultural data layer of Thailand.',
      'PTT-ARV, the venture arm of PTT (Thailand\'s national oil company), operates with a different but complementary thesis. PTT is one of the largest industrial operators in Thailand, with assets in energy, manufacturing, and infrastructure. Their AI and robotics fund is building a portfolio of visual inspection capabilities applicable across industrial settings — quality control on production lines, structural inspection of facilities, anomaly detection in complex systems. EasyRice\'s visual AI, validated at scale in rice inspection, is a proven platform that can be extended into those industrial contexts. EXAMBRISK, the division applying the same AI to electronics and building inspection, is exactly this extension. PTT-ARV is not buying a rice startup — they are buying a proven visual AI platform with demonstrated field accuracy.',
      'The wedge product strategy is a deliberate framework in B2B platform building. A wedge product is a narrow, highly specific solution to a well-defined problem in a specific industry. It is chosen not because the problem is the largest problem the company wants to solve, but because it is solvable with the available resources, creates a data moat in the process of being solved, and validates the underlying platform capability. Rice inspection was EasyRice\'s wedge. It was solvable (defined problem, accessible training data, clear customer), generated proprietary data at scale (10 million images, 500,000 inspections), and validated the underlying platform (visual AI capable of fine-grained classification at industrial throughput). EXAMBRISK is the horizontal expansion that the wedge made possible.',
    ],
    facts: (
      <>
        <p><strong>Yip In Tsoi</strong> — Thailand's largest fertilizer and agri-tech company — invested strategically to access the agricultural quality data EasyRice generates across hundreds of thousands of inspections annually.</p>
        <p><strong>PTT-ARV</strong> — the AI and robotics venture capital arm of PTT, Thailand's national oil company — invested to build a portfolio of industrial visual AI capabilities, of which EasyRice is a proven anchor.</p>
        <p><strong>These are not financial bets</strong> — both investors have strategic reasons to want EasyRice to succeed that extend beyond financial return: one wants agricultural data infrastructure, one wants industrial AI capability.</p>
        <p><strong>EXAMBRISK (2024)</strong> — EasyRice's new business unit applying the same visual AI to electronics manufacturing defect detection and drone-based building roof inspection.</p>
        <p><strong>Geographic expansion:</strong> Vietnam, India, Indonesia, Philippines — Southeast and South Asian markets that together account for a majority of global rice production and face similar quality certification challenges.</p>
      </>
    ),
    lesson: (
      <>
        <p>The wedge product strategy is one of the most important concepts in B2B platform building and one of the least taught. The pattern: start vertical (one industry, one well-defined problem), build the data moat (accumulate proprietary training data and usage data that makes the product better over time), validate the platform (prove the core capability works at scale), then expand horizontal (apply the same capability to adjacent industries with similar structure). EasyRice followed this pattern almost perfectly. Rice inspection was the wedge; visual AI quality assurance across industries is the platform.</p>
        <p>The lesson for children is broader than startup strategy: what you learn while solving problem A often gives you the capability to solve problems B, C, and D — problems you could not have seen from the starting point. This is an argument for going deep on hard problems rather than staying shallow on easy ones. The data and skills you accumulate solving a genuinely difficult problem in one domain become assets that transfer in unexpected directions.</p>
      </>
    ),
    lessonTitle: 'The Wedge Product Strategy',
    tip: 'EasyRice and EXAMBRISK together make a great illustration of capability transfer: the team learned to teach an AI to see differences in rice grains that humans miss, then discovered the same skill applied to electronics components and building surfaces. Ask your child: "What other things could be inspected by a camera that has learned to see differences humans miss?" Fruit quality, clothing defects, concrete cracks, soil conditions. The conversation builds the habit of asking "where else does this apply?" — one of the most valuable thinking patterns in any creative field.',
  },
];

// ── Individual comic strip card ──────────────────────────────────────

function StripCard({ strip, total }: { strip: typeof strips[0]; total: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div layout className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
      {/* Image */}
      <div className="overflow-hidden">
        <img src={strip.image} alt={strip.imageAlt} className="w-full h-auto" />
      </div>

      {/* Teaser */}
      <div className="px-6 pt-5 pb-4">
        <div className="flex items-center gap-2 mb-3">
          <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${strip.tagColor}`}>
            {strip.tag}
          </span>
          <span className="text-xs text-slate-400">
            Strip {strip.number} of {total}
          </span>
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-3">{strip.title}</h2>
        <p className="text-sm text-slate-600 leading-relaxed">{strip.teaser}</p>
      </div>

      {/* Toggle */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-6 py-3 border-t border-slate-100 hover:bg-slate-50 transition-colors text-left"
      >
        <span className="text-sm font-semibold text-indigo-600">
          {open ? 'Hide the story' : 'Read the full story, facts & lesson'}
        </span>
        {open
          ? <ChevronUp className="w-4 h-4 text-indigo-400" />
          : <ChevronDown className="w-4 h-4 text-indigo-400" />
        }
      </button>

      {/* Expandable */}
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
              {/* Story */}
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-3">
                  The Story Behind the Strip
                </p>
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

// ── About EasyRice (collapsible) ─────────────────────────────────────

function AboutEasyRice() {
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
            <span className="text-indigo-600 text-sm font-bold">ER</span>
          </div>
          <div>
            <p className="font-bold text-slate-800">About EasyRice</p>
            <p className="text-xs text-slate-400 mt-0.5">
              How the company works, what it built, and why it matters
            </p>
          </div>
        </div>
        {open
          ? <ChevronUp className="w-5 h-5 text-slate-400 flex-shrink-0" />
          : <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
        }
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
                  <p className="font-semibold text-slate-800 mb-1">What EasyRice Does</p>
                  <p>
                    EasyRice provides AI-powered quality inspection for rice, using computer vision to
                    identify varieties and grade quality faster, cheaper, and more consistently than
                    human experts. The platform serves the entire rice supply chain from individual
                    farmers to large export companies.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">The Trust Problem It Solves</p>
                  <p>
                    Thailand's rice supply chain had no objective, fast, affordable quality standard —
                    creating a three-layer trust breakdown between farmers, mills, exporters, and
                    international buyers. EasyRice provides the independent verification that makes
                    fair pricing and reliable trade possible.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">The Two Products</p>
                  <p>
                    <strong>EASYRICE MP</strong> identifies rice varieties from a database of 84 types,
                    detecting whether expensive Jasmine rice has been mixed with cheaper varieties.
                    <strong> EASYRICE M0</strong> grades milled rice against 25 official Thai quality
                    standards, measuring broken grains, yellow grains, chalky grains, and more.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">Business Model</p>
                  <p>
                    Pay-per-use pricing makes professional inspection accessible to smallholder farmers
                    who could not afford traditional expert inspection or laboratory testing. Results
                    are delivered via LINE messaging, fitting into existing business communication
                    workflows with zero adoption friction.
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-slate-800 mb-1">Market Impact</p>
                  <p>
                    Within one year of launch, EasyRice captured 30% of Thailand's rice export
                    inspection market. The platform now serves 300+ large industrial users,
                    20,000+ individual farmers, and has processed 500,000+ inspection batches
                    covering over 10 million tonnes of rice.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">EXAMBRISK Expansion</p>
                  <p>
                    In 2024, EasyRice launched EXAMBRISK — a new division applying the same visual AI
                    capability to electronics defect detection and drone-based roof inspection. This
                    confirms the platform thesis: the core competency in fine-grained visual
                    classification transfers across industries.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">Strategic Investors</p>
                  <p>
                    Yip In Tsoi (Thailand's largest agri-tech company) and PTT-ARV (national oil
                    company's AI/robotics fund) are not financial investors — they are acquiring
                    access to agricultural data infrastructure and a proven visual AI platform,
                    respectively.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">Learn More</p>
                  <p>
                    <a
                      href="https://easyrice.ai"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-800 font-medium"
                    >
                      easyrice.ai
                    </a>
                    {' '}\u2014 the company's explanation of the products and technology.
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

export default function WayneComicEasyRice() {
  return (
    <>
      <SEOHead
        title="Startup Stories #5: EasyRice — The AI That Inspects Rice Grain by Grain | Wayne's Comics"
        description="A parent-child comic series about real startups. Episode 5: EasyRice — how a Thai founder solved the rice supply chain's billion-dollar trust problem with AI computer vision, and what it teaches about information asymmetry, distribution strategy, and platform building."
        ogImage="/images/comics/easyrice/cover.jpg"
      />

      {/* Back nav */}
      <div className="mb-8">
        <Link
          to="/wayne/comics"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          All Comics
        </Link>
      </div>

      {/* ── Cover ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-10"
      >
        <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md mb-7">
          <img
            src="/images/comics/easyrice/cover.jpg"
            alt="Startup Stories #5: EasyRice — AI-powered rice grain inspection"
            className="w-full h-auto"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-bold rounded-full uppercase tracking-wide">
            Startup Stories · Episode 5 of 25
          </span>
          <span className="text-xs text-slate-400">June 2026 · 4 strips · 🇹🇭 Thailand</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3 leading-tight">
          The AI That Inspects Rice Grain by Grain
        </h1>
        <p className="text-slate-500 leading-relaxed mb-5 max-w-2xl">
          Thailand's rice supply chain had a billion-dollar trust problem: no one could objectively
          verify quality fast enough or cheaply enough to matter. EasyRice built the missing
          infrastructure — and captured 30% of the national market in one year. This is the story
          of information asymmetry, distribution strategy, and what happens when a founder earns
          their domain before building their product.
        </p>
        <ShareBar
          title="Startup Stories #5: EasyRice — The AI That Inspects Rice Grain by Grain"
          summary="A 4-strip parent-child comic about EasyRice, the Thai startup that captured 30% of national rice export inspection in year one by solving the supply chain trust problem with AI."
        />
      </motion.div>

      {/* ── Strips ── */}
      <div className="space-y-6 mb-10">
        {strips.map((strip, i) => (
          <motion.div
            key={strip.number}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1 + i * 0.07 }}
          >
            <StripCard strip={strip} total={strips.length} />
          </motion.div>
        ))}
      </div>

      {/* ── About EasyRice (collapsible) ── */}
      <AboutEasyRice />

      {/* ── Bottom share ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.4 }}
        className="flex items-center justify-between py-6 border-t border-slate-200 mb-10"
      >
        <Link
          to="/wayne/comics"
          className="text-sm text-slate-400 hover:text-slate-700 transition-colors"
        >
          \u2190 All Comics
        </Link>
        <ShareBar
          title="Startup Stories #5: EasyRice"
          summary="A parent-child comic series about real startups — Episode 5: AI rice inspection and the trust infrastructure that makes fair trade possible."
        />
      </motion.div>

      {/* ── CTA ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.45 }}
        className="bg-indigo-600 rounded-2xl px-8 py-10 text-center text-white"
      >
        <h2 className="text-xl font-bold mb-2">More startup stories coming</h2>
        <p className="text-indigo-100 text-sm mb-6 max-w-md mx-auto">
          This is Episode 5 of 25. Each story is about a real company solving a real problem —
          told in a way that makes sense to a child, with analysis for the parent reading along.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/wayne/comics"
            className="inline-flex items-center justify-center gap-2 bg-white text-indigo-700 font-semibold text-sm px-6 py-2.5 rounded-xl hover:bg-indigo-50 transition-colors"
          >
            All Wayne Comics
          </Link>
          <Link
            to="/wayne/insights"
            className="inline-flex items-center justify-center gap-2 bg-indigo-500 text-white font-semibold text-sm px-6 py-2.5 rounded-xl hover:bg-indigo-400 transition-colors"
          >
            Read Wayne's Insights
          </Link>
        </div>
      </motion.div>
    </>
  );
}
