import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { SEOHead } from '../../components/SEOHead';
import { ShareBar } from '../../components/ShareBar';
import { CommentSection } from '../../components/CommentSection';

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
    title: 'The 80% We Throw Away',
    teaser:
      '20 billion kg of coffee pulp is discarded annually — the single largest avoidable waste stream in agricultural commodities. The industry knew. Nobody acted.',
    image: '/images/comics/i-am-grounded/strip-1.jpg',
    imageAlt:
      'Luna and Wayne discover that coffee is a fruit and 80% of it — the pulp — is thrown away every year, polluting rivers and emitting CO₂.',
    story: [
      'Coffee is, at its origin, a fruit. The coffee cherry grows on trees across the equatorial belt — Colombia, Ethiopia, Indonesia, Brazil — and contains a seed (the coffee bean) surrounded by layers of pulp, mucilage, and skin. When those cherries are processed into the commodity the world drinks, the bean is extracted and the rest — roughly 80% of the cherry by weight — is discarded as a byproduct.',
      'The scale of this waste is staggering. Global coffee production generates approximately 20 billion kilograms of pulp per year. Left in open piles near waterways, this material ferments and releases mycotoxins — naturally occurring compounds that, at high concentrations, leach into soil and river systems, disrupting local ecosystems and contaminating water supplies used by farming communities. Beyond the local impact, the decomposition process releases an estimated 16 million tonnes of CO₂ annually. This is not a niche environmental problem. It is a structural consequence of how a $500 billion industry processes its primary commodity.',
      'The reason this waste persisted for so long is not ignorance — agricultural scientists have known about the nutritional profile of coffee pulp for decades. It is economics. Addressing the byproduct requires infrastructure, processing capability, and a market for the output. None of those existed at scale because no one had built the bridge between the farm, the product, and the consumer. I Am Grounded built that bridge.',
    ],
    facts: (
      <>
        <p><strong>20 billion kg/year</strong> of coffee pulp discarded globally — more than the weight of all cars produced annually worldwide.</p>
        <p><strong>3,300+ Olympic swimming pools</strong> worth of coffee cherry pulp discarded every year if measured by volume.</p>
        <p><strong>16 million tonnes of CO₂</strong> emitted annually from decomposing coffee pulp — roughly equivalent to 3.5 million cars driven for a year.</p>
        <p><strong>80% of the coffee cherry</strong> is discarded; only the bean (~20% by weight) is commercially processed by most producers.</p>
        <p><strong>~$500 billion</strong> global coffee market annually — meaning the waste stream is an externalized cost at massive scale.</p>
      </>
    ),
    lesson: (
      <>
        <p>Every supply chain externalizes some costs — passes them to the environment, local communities, or future generations — because the market doesn't price them accurately. Coffee pulp waste is a textbook example: the cost of remediation is real, but it falls on Colombian river ecosystems and Colombian farming communities, not on the corporations processing the beans.</p>
        <p>Teaching children about externalities doesn't require academic language. The question is simply: "Who pays for the damage, and is that fair?" In this case, the farmers and their rivers pay. I Am Grounded's model is interesting precisely because it converts an externalized cost into a monetized asset — changing the economic incentives structurally.</p>
      </>
    ),
    lessonTitle: 'The Hidden Cost of "Free" Waste',
    tip: 'Coffee waste is a great entry point for teaching kids about externalities — the costs that businesses pass onto society instead of absorbing themselves. Ask: "If the coffee company had to clean up the pulp, would coffee be cheaper or more expensive?" Then ask: "Who do you think should pay for it?" There\'s no clean answer, and that\'s the point.',
  },
  {
    number: 2,
    tag: 'The Insight',
    tagColor: 'bg-amber-100 text-amber-700',
    title: "Waste Is a Design Failure, Not a Natural Law",
    teaser:
      "Vanessa Murillo's founding insight: the pulp isn't waste — it's a mislabeled asset. Her father's food science expertise confirmed what she intuited. Coffee pulp tests higher in antioxidant capacity than açai and blueberries combined.",
    image: '/images/comics/i-am-grounded/strip-2.jpg',
    imageAlt:
      "Coffee pulp transformed into an energy bar. The 'waste' becomes the product — more antioxidants than açai berries.",
    story: [
      "Vanessa Murillo grew up in Australia with family roots in Colombian coffee farming. That dual perspective — the commercial view from a developed market consumer, and the agricultural view from families whose livelihoods depend on the harvest — created an unusual vantage point. She understood, viscerally, that the \u201ctrash\u201d from coffee farming wasn't random debris. It was a part of the same fruit everyone paid premium prices for.",
      "Her father is a food science professional. When Vanessa began investigating the nutritional profile of coffee cherry pulp seriously, the findings were striking: coffee pulp has an ORAC (Oxygen Radical Absorbance Capacity) value that exceeds both açai berries and blueberries — two ingredients that command enormous premium positioning in the functional food market. It also contains natural caffeine, prebiotic fiber, and a micronutrient profile that compares favorably with most commercial energy bars.",
      "The reframe that drives I Am Grounded is not a marketing conceit — it's a genuine epistemic correction. The pulp was never waste in the nutritional sense. It was waste only in the logistical and commercial sense: nobody had built the infrastructure to move it from farm to consumer in a shelf-stable, appetizing form. Vanessa and Lachlan Powell's founding insight was that the infrastructure gap, not the product's lack of value, was the actual problem to solve.",
    ],
    facts: (
      <>
        <p><strong>ORAC value:</strong> Coffee pulp scores higher than açai berries and blueberries on antioxidant capacity — both of which are marketed as superfoods at a significant price premium.</p>
        <p><strong>Natural caffeine:</strong> Coffee pulp contains caffeine from the same plant, providing a cleaner energy source than synthetic caffeine used in most commercial energy bars.</p>
        <p><strong>Prebiotic fiber:</strong> The pulp's fiber content supports gut microbiome health — an emerging priority in functional food formulation.</p>
        <p><strong>Protein and micronutrients:</strong> Including potassium, magnesium, and B vitamins, making it a nutritionally dense ingredient, not merely an antioxidant source.</p>
      </>
    ),
    lesson: (
      <>
        <p>Many of the most interesting startups in the next decade will be built on the "mislabeled asset" pattern: finding things that are categorized as costs, waste, or inefficiencies — and recognizing that the categorization is wrong, not the underlying material. This requires the ability to look at a consensus assumption and ask whether the consensus is actually correct.</p>
        <p>For children, the most useful habit here is learning to ask: "Who decided this was waste?" or "Who decided this wasn't worth anything?" Those decisions are made by people, at specific moments in history, for specific reasons. They can be revised.</p>
      </>
    ),
    lessonTitle: "The 'Mislabeled Asset' Pattern",
    tip: 'Walk through the pantry or fridge with your child and pick three ingredients. Ask: "Where did this come from?" for each one. Most kids have no mental model of agricultural supply chains. Then ask: "What gets thrown away when this is made?" for each one. You\'ll almost always find an answer — and it\'s usually more interesting than expected. Apple pomace, grape skins, corn husks: most agricultural commodities generate significant byproduct streams.',
  },
  {
    number: 3,
    tag: 'The Product',
    tagColor: 'bg-indigo-100 text-indigo-700',
    title: 'Building the Business of Upcycling',
    teaser:
      'From kitchen experiments at a shared food lab in Brisbane to ~1,000 Woolworths stores in May 2023. The path was validation-first: earn credibility in specialty channels before attempting mass retail.',
    image: '/images/comics/i-am-grounded/strip-3.jpg',
    imageAlt:
      'Luna and Wayne work through the business model — from hand-made bars in a kitchen to a Woolworths listing.',
    story: [
      "Vanessa and Lachlan Powell — a civil engineer with a background in competitive triathlon — began developing the product at Wandering Cooks, a shared commercial kitchen facility in Brisbane. The early phase was genuinely artisanal: hand-making bars, iterating on formulations, testing with friends, fitness community contacts, and eventually specialty health food retailers. This phase wasn't just about recipe development. It was about understanding the customer acquisition mechanics for a functional food with an unconventional origin story.",
      "They funded the early business through a combination of government grants (competitive programs supporting Australian food innovation), a startup competition prize of $5,000, and a Kickstarter campaign that validated consumer demand before they'd committed to manufacturing at scale. The Kickstarter approach is underappreciated in food businesses — it simultaneously provides capital, creates an initial customer base, and generates the social proof that makes wholesale conversations easier.",
      "The Woolworths listing in May 2023 — approximately 1,000 stores across Australia — represents a significant commercial milestone for any food startup. Australian grocery retail is highly concentrated, with Woolworths and Coles controlling roughly 65% of the market. A national listing is not a soft launch; it requires supply chain reliability, compliance with retailer quality standards, and the operational capacity to replenish at scale. I Am Grounded earned that listing through a credibility-first progression: specialty cafes → health food stores → natural retailers → mass grocery.",
    ],
    facts: (
      <>
        <p><strong>40,000 kg of coffee pulp rescued</strong> from waste as of the company's reported figures — each SUPR Bar contains approximately 50g of upcycled coffee pulp.</p>
        <p><strong>~1,000 Woolworths stores</strong> stocking I Am Grounded SUPR Bars as of May 2023 — a national mass-market listing achieved within ~5 years of founding.</p>
        <p><strong>Founded 2018</strong> in Brisbane, Australia by Vanessa Murillo and Lachlan Powell.</p>
        <p><strong>First protein bar in Australia</strong> with natural caffeine sourced from coffee pulp — a genuine product category innovation, not just a marketing differentiation.</p>
        <p><strong>Kickstarter + grants + competition prize</strong> — non-dilutive funding pathway that preserved founder equity while validating the market.</p>
      </>
    ),
    lesson: (
      <>
        <p>I Am Grounded's distribution path illustrates what I'd call the "earned distribution" model: they built credibility in channels where buyers are sophisticated and skeptical (specialty health cafes, independent health food retailers) before attempting mass retail. This sequencing matters because it generates both operational learning and social proof at manageable scale. The Woolworths conversation is much easier when you can point to two years of sell-through data from 200 specialty accounts.</p>
        <p>The Kickstarter/community-first approach is a teachable model for any domain. Before investing heavily in production, sales infrastructure, or marketing, validate that real people will actually pay for the thing. The mechanism matters less than the discipline: find a way to test demand before you scale supply.</p>
      </>
    ),
    lessonTitle: "The 'Earned Distribution' Model",
    tip: "The Kickstarter/community-first approach is a teachable model for any project — not just businesses. If your child wants to start something (a YouTube channel, a lemonade stand, a neighborhood service), ask: \"How could you test if anyone actually wants this before you build the whole thing?\" The habit of validating demand before committing resources is one of the most practically valuable entrepreneurial instincts you can cultivate early.",
  },
  {
    number: 4,
    tag: 'The System',
    tagColor: 'bg-emerald-100 text-emerald-700',
    title: 'Circular Economy at Human Scale',
    teaser:
      "What I Am Grounded represents beyond a snack bar: a proof of concept that agricultural waste streams can be converted into value — for consumers, for farmers, and for the environment — at commercially viable scale.",
    image: '/images/comics/i-am-grounded/strip-4.jpg',
    imageAlt:
      "Wayne and Luna trace the full circle — Colombian farmers, coffee pulp, energy bars, and the impact on the supply chain.",
    story: [
      "Vanessa's connection to Colombian coffee farming communities is not incidental to the business — it's constitutive of it. When I Am Grounded sources coffee pulp from Colombian producers, it is creating demand for something that previously had zero commercial value. The farmers don't have to grow more coffee, invest in additional land, or change their practices. They simply receive payment for a byproduct that was previously a disposal problem. This is what \"circular value creation\" means in practice: the same production activity now generates two revenue streams instead of one.",
      "The structural significance extends beyond any individual farm relationship. When a waste stream is converted into a product with demonstrated commercial value — tracked to specific farms, documented in a supply chain, sold in major retailers — it creates a replicable template. Other food entrepreneurs can look at coffee pulp and say: if that waste stream can be monetized, what about our waste stream? The upcycled food ingredient market was valued at approximately $47 billion in 2023 and is growing rapidly, driven partly by a new generation of food founders who built their intuitions on examples like I Am Grounded.",
      "The scalability thesis is straightforward: every major agricultural commodity generates significant byproduct streams. Grape skins and seeds from wine production. Apple pomace from juice pressing. Spent grain from brewing. Whey from cheese production. In most cases, these streams are either disposed of at cost or sold at commodity prices to industrial processors. The I Am Grounded model demonstrates that with the right product design and supply chain architecture, these streams can command premium consumer prices — changing the economics for every farmer in that chain.",
    ],
    facts: (
      <>
        <p><strong>Global upcycled food ingredient market:</strong> approximately $47 billion in 2023, growing at ~5% annually as consumer awareness and regulatory support increases.</p>
        <p><strong>Colombian coffee industry:</strong> employs ~730,000 farming families. Converting pulp to a commercial asset meaningfully improves farm economics without requiring production expansion.</p>
        <p><strong>50g waste rescued per bar</strong> — a simple, trackable metric that gives consumers a concrete impact figure and creates a direct link between purchase behavior and environmental outcome.</p>
        <p><strong>I Am Grounded's expansion plans</strong> include additional upcycled ingredients from other agricultural waste streams, positioning the brand as a platform for circular food innovation rather than a single-product company.</p>
      </>
    ),
    lesson: (
      <>
        <p>Mission-driven brands that are built on authentic, hard-to-replicate origin stories have a structural competitive advantage that is genuinely durable. A large food conglomerate can match a bar's formulation, packaging, and price point. They cannot authentically claim Vanessa Murillo's Colombian family heritage, her father's food science expertise, and a direct relationship with specific farming communities. That origin story is the moat — and it's built from things that are real, not manufactured.</p>
        <p>For parents teaching about competitive strategy: the question isn't just "what do you make?" but "what do you make that someone else can't credibly copy?" Authentic origin, genuine relationships, and mission alignment are increasingly the answers that matter — particularly for consumer brands competing in a market where product quality is table stakes.</p>
      </>
    ),
    lessonTitle: 'Mission-Driven Brands Have a Structural Advantage',
    tip: "I Am Grounded is a concrete example of \"impact investing\" at a scale kids can understand — not a $50M ESG fund, but a $4 snack bar. When you buy a bar, you rescue some fruit pulp, you reduce CO₂, and you send revenue back to Colombian farming families. Ask your child: \"Would you rather buy this bar or a bar that tastes the same but does none of that?\" Then ask: \"Why?\" That conversation is the foundation of values-aligned consumer behavior — which is increasingly how the next generation shops.",
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

// ── Main page ────────────────────────────────────────────────────────

export default function WayneComicIAmGrounded() {
  return (
    <>
      <SEOHead
        title="Startup Stories #3: I Am Grounded — The Energy Bar That Rescues 'Trash' | Wayne's Comics"
        description="A parent-child comic series about real startups. Episode 3: I Am Grounded — how an Australian startup turned 20 billion kg of discarded coffee pulp into superfood energy bars, empowering Colombian farmers in the process."
        ogImage="/images/comics/i-am-grounded/cover.jpg"
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
            src="/images/comics/i-am-grounded/cover.jpg"
            alt="Startup Stories #3: I Am Grounded — The Energy Bar That Rescues Trash"
            className="w-full h-auto"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-bold rounded-full uppercase tracking-wide">
            Startup Stories · Episode 3 of 25
          </span>
          <span className="text-xs text-slate-400">June 2026 · 4 strips</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3 leading-tight">
          The Energy Bar That Rescues "Trash"
        </h1>
        <p className="text-slate-500 leading-relaxed mb-5 max-w-2xl">
          Every year, coffee production discards 20 billion kilograms of fruit pulp — the single largest
          avoidable agricultural waste stream in the world. I Am Grounded, founded in 2018 by
          Vanessa Murillo and Lachlan Powell, built a product that converts this waste into a superfood
          energy bar. This is the story of how that works, and what it teaches kids about circular
          economies, supply chains, and the economics of "waste."
        </p>
        <ShareBar
          title="Startup Stories #3: I Am Grounded — The Energy Bar That Rescues Trash"
          summary="A 4-strip parent-child comic about I Am Grounded, upcycled coffee pulp, circular economics, and empowering Colombian farmers."
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

      {/* ── About I Am Grounded (collapsible) ── */}
      <AboutIAmGrounded />

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
          ← All Comics
        </Link>
        <ShareBar
          title="Startup Stories #3: I Am Grounded"
          summary="A parent-child comic series about real startups — Episode 3: upcycled coffee pulp energy bars."
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
          This is Episode 3 of 25. Each story is about a real company solving a real problem —
          told in a way that makes sense to a child, with lessons for the parent reading along.
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

// ── About I Am Grounded (collapsible) ───────────────────────────────

function AboutIAmGrounded() {
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
          <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-emerald-700 text-sm font-bold">IG</span>
          </div>
          <div>
            <p className="font-bold text-slate-800">About I Am Grounded</p>
            <p className="text-xs text-slate-400 mt-0.5">
              The company, the product, the founders, and the supply chain
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
                  <p className="font-semibold text-slate-800 mb-1">Company Overview</p>
                  <p>
                    I Am Grounded is an Australian food startup founded in 2018 in Brisbane. The company
                    upcycles discarded coffee cherry pulp — a byproduct of coffee processing — into
                    functional energy bars. Their core product line is called SUPR Bars, made using
                    coffee pulp sourced from Colombian farming communities.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">The Waste Problem</p>
                  <p>
                    Global coffee production generates approximately 20 billion kilograms of pulp
                    annually. This waste stream decomposes near waterways, releasing mycotoxins
                    and emitting an estimated 16 million tonnes of CO₂ per year. I Am Grounded
                    converts this stream into a premium ingredient, rescuing 40,000 kg of pulp
                    as of its most recent disclosures.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">The Product Line</p>
                  <p>
                    SUPR Bars are named for the time of day they're designed to fuel:{' '}
                    <strong>The 9AM</strong> (morning energy), <strong>The 3PM</strong> (afternoon
                    focus), and <strong>The Pick Me Up</strong> (on-demand boost). Each bar contains
                    approximately 50g of upcycled coffee pulp. They were the first protein bars in
                    Australia with natural caffeine derived from coffee pulp.
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-slate-800 mb-1">The Founders</p>
                  <p>
                    <strong>Vanessa Murillo</strong> is Colombian-Australian, with family ties to
                    Colombian coffee farming. Her father's food science background informed her
                    understanding of coffee pulp's nutritional profile. <strong>Lachlan Powell</strong>{' '}
                    brings a civil engineering background and a competitive triathlon community
                    that served as an early product testing audience.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">Colombia Supply Chain</p>
                  <p>
                    I Am Grounded sources its coffee pulp directly from Colombian farming communities
                    connected through Vanessa's family network. This creates an additional revenue
                    stream for farmers from a byproduct that previously had zero commercial value,
                    without requiring any change to farming practices.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">Why It Matters for Kids</p>
                  <p>
                    I Am Grounded is a legible example of circular economy principles at human scale:
                    one family's knowledge of a supply chain, one scientist father's nutritional insight,
                    and one year of kitchen experiments became a product in 1,000 supermarkets.
                    The story is replicable in principle across dozens of agricultural waste streams.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">Learn More</p>
                  <p>
                    <a
                      href="https://iamgrounded.co"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-800 font-medium"
                    >
                      iamgrounded.co
                    </a>
                    {' '}— the company's own explanation of the product, mission, and impact.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <CommentSection />
    </motion.div>
  );
}
