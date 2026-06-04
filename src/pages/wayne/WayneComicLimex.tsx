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
    tag: 'The Origin',
    tagColor: 'bg-red-100 text-red-700',
    title: 'The Used Car Salesman Who Wanted to Change the World',
    teaser:
      'Atsushi Yamasaki sold used cars in Japan. Then he saw a piece of "stone paper" from Taiwan — and decided to build a 100-year company around it.',
    image: '/images/comics/limex/strip-1.jpg',
    imageAlt:
      'Luna and Wayne discover a strange material — paper made from stone. Wayne explains how a used car salesman in Japan turned a failed import into a billion-dollar materials company.',
    story: [
      'Atsushi Yamasaki grew up in Osaka, Japan, and started his first business at age 20: a used car dealership. It was profitable and unremarkable — the kind of business thousands of entrepreneurs run every day. But Yamasaki had a restless ambition. A trip to Europe changed everything. Walking through ancient cities, he was struck by buildings that had stood for centuries. The businesses that built them were long gone, but the structures remained. He realized he did not just want to build a profitable company — he wanted to build something that would last a hundred years.',
      'In 2008, a friend showed him a curious product from Taiwan: "stone paper." It was paper made from calcium carbonate — crushed limestone — rather than wood pulp. The idea seemed almost magical: take the most abundant rock on Earth and turn it into paper, saving forests and water in the process. Yamasaki saw his chance. He flew to Taiwan, struck a distribution deal, and began importing stone paper to Japan. The initial customer feedback was positive. People loved the concept. The market seemed ready.',
      'But then reality hit. The Taiwanese stone paper had fatal flaws: the quality was wildly inconsistent (Japanese customers demand precision), the cost was too high to compete with conventional paper, and the material was so heavy that shipping costs ate any profit margin. Yamasaki\'s import business failed. Most entrepreneurs would have walked away. Instead, Yamasaki made a decision that defined his entire career: "Since they cannot do it, we will do it ourselves." He shut down the import business and committed to developing an entirely new material from scratch — with no experience in materials science, no factory, and no investors.',
    ],
    facts: (
      <>
        <p><strong>Yamasaki founded TBM in 2011</strong> — Times Bridge Management — after the import failure. His background: used cars, not materials science.</p>
        <p><strong>The "stone paper" from Taiwan</strong> failed for three reasons: inconsistent quality, high cost, and excessive weight making shipping uneconomical.</p>
        <p><strong>From trader to deep-tech:</strong> Yamasaki pivoted from low-risk importing to high-risk R&D, deciding to invent a proprietary material rather than distribute someone else\'s flawed product.</p>
        <p><strong>Zero materials experience:</strong> Yamasaki had no background in chemistry, materials science, or manufacturing. He learned by hiring experts who did.</p>
      </>
    ),
    lesson: (
      <>
        <p>Yamasaki's story challenges a common myth about innovation: that breakthroughs come from domain experts. Yamasaki was an outsider to materials science, and that outsider status was arguably an advantage. An expert might have known "it cannot be done" and stopped before trying. Yamasaki only knew that it needed to be done.</p>
        <p>The pivot from trader to deep-tech manufacturer is also instructive. Most companies that fail at distribution try harder distribution. Yamasaki recognized that the problem was not in how he sold the product — it was in the product itself. Fixing the product required fundamentally changing what kind of company he was running. That willingness to transform his own business model is rare and valuable.</p>
      </>
    ),
    lessonTitle: 'The Outsider Advantage',
    tip: 'Ask your child: "If you wanted to invent a new material, would you need to be a scientist?" The follow-up is more important: "Who would you hire? Where would you start?" This reveals the difference between "being the expert" and "knowing how to find and organize experts" — a distinction that matters more as problems get harder.',
  },
  {
    number: 2,
    tag: 'The Valley of Death',
    tagColor: 'bg-amber-100 text-amber-700',
    title: 'The Government Grant That Saved the Company',
    teaser:
      'Building a factory for a material that did not yet exist required $20M. Yamasaki had no track record, no collateral, and no credibility with banks. Then the Japanese government stepped in.',
    image: '/images/comics/limex/strip-2.jpg',
    imageAlt:
      'Luna looks at a factory blueprint with Yamasaki struggling to raise money — until a Japanese government grant saves the project and gets the factory built.',
    story: [
      'The "valley of death" in hardware startups is the gap between proving a technology works and building the factory to make it at scale. For TBM, this gap was a chasm. Building a production facility for LIMEX required approximately ¥2 billion ($20M). Yamasaki had no collateral, no manufacturing track record, and a background in used car sales — not exactly the profile that convinces conservative Japanese banks to lend billions of yen.',
      'The technology development itself was brutal. The team had no dedicated equipment — they rented lab space from universities and other companies, often getting rejected. Progress was slow. Early employees quit under the pressure. Yamasaki later described this period as "having no choice but to continue." The line sounds dramatic, but it reflects a specific psychological reality: when the cost of failure is existential — personal bankruptcy, the disappointment of everyone who believed in you — the only option is to keep going.',
      'The turning point came from an unexpected source: the Japanese government. TBM applied for and received a ¥900 million ($9M) subsidy from the Ministry of Economy, Trade and Industry (METI). This was nearly half the factory\'s total cost. The subsidy did more than provide money — it provided validation. A METI grant means the government has officially certified your technology as strategically important. That certification opened doors that had been locked: private investors suddenly found TBM worth a second look, equipment suppliers offered better terms, and potential customers took the company seriously. The government grant acted as a credibility bridge that no amount of private fundraising could have built.',
    ],
    facts: (
      <>
        <p><strong>¥2 billion ($20M)</strong> — the cost to build the first LIMEX production facility. Yamasaki had no collateral, no track record, and no manufacturing experience.</p>
        <p><strong>¥900 million ($9M) METI subsidy</strong> — nearly half the factory cost. The Japanese government certified LIMEX as strategically important, which unlocked everything else.</p>
        <p><strong>Government as credibility bridge:</strong> The METI grant convinced private investors, equipment suppliers, and customers that TBM was legitimate — more effectively than any private fundraising could.</p>
        <p><strong>First factory:</strong> Opened 2015 in Shiroishi, Miyagi Prefecture — a region known for limestone deposits, strategically located near raw materials.</p>
        <p><strong>Patents approved 2014:</strong> Core LIMEX patents granted before the factory opened, creating the IP moat.</p>
      </>
    ),
    lesson: (
      <>
        <p>The "valley of death" is one of the most important concepts in deep-tech entrepreneurship. It is the gap between proving something works (R&D) and making it affordable enough to sell (manufacturing scale-up). This gap is measured in years and millions of dollars, and it kills more hardware startups than any technical failure does.</p>
        <p>Yamasaki\'s experience also reveals a counterintuitive pattern: government funding, often dismissed as slow and bureaucratic, can be the most effective way to cross the valley of death for capital-intensive technologies. The reason is not just the money — it is the signaling effect. A government grant says "this has been vetted at the national level," which reduces perceived risk for everyone else.</p>
      </>
    ),
    lessonTitle: 'Crossing the Valley of Death',
    tip: 'The "valley of death" concept applies to any ambitious project that requires upfront investment before results appear. Learning an instrument, training for a sport, writing a book — all have a valley between "starting" and "getting good." Ask your child: "What is something you want to be good at that has a valley? What could help you cross it?" The conversation builds patience with the uncomfortable middle phase of skill-building.',
  },
  {
    number: 3,
    tag: 'The Material',
    tagColor: 'bg-indigo-100 text-indigo-700',
    title: 'Paper and Plastic, but Made of Rock',
    teaser:
      'LIMEX uses 97% less water than papermaking and eliminates trees entirely. It can replace both paper and plastic — using the same base material.',
    image: '/images/comics/limex/strip-3.jpg',
    imageAlt:
      'Wayne and Luna examine LIMEX products — a menu from Yoshinoya that is waterproof, a cosmetics container from LVMH with a unique matte texture, and recycling bins.',
    story: [
      'LIMEX is a compound material made of over 50% calcium carbonate (crushed limestone) mixed with a small amount of thermoplastic resin as a binder. Limestone is one of the most abundant minerals on Earth — Japan has enough domestic limestone to supply the country for hundreds of years. The material is cheap, stable, and requires no trees, no water-intensive pulping, and no petroleum feedstock.',
      'TBM developed two distinct product lines from the same base technology. LIMEX Sheet is a paper replacement: it uses 97% less water than conventional papermaking, requires zero wood pulp, and is naturally waterproof — no plastic lamination needed. A restaurant menu made from LIMEX can be wiped clean with a cloth instead of being thrown away. LIMEX Pellet is a plastic replacement: it reduces petroleum-based resin content significantly and works with existing plastic manufacturing equipment — injection molding, extrusion, thermoforming — meaning manufacturers do not need to buy new machines to use it.',
      'The adoption numbers tell the story. Over 10,000 businesses and local governments now use LIMEX products. Yoshinoya, Japan\'s largest beef bowl chain, uses LIMEX for its menus. The Japanese Ministry of the Environment uses it for national park guides. LVMH — the luxury conglomerate behind Louis Vuitton, Dior, and Sephora — chose LIMEX Pellet for KENDO cosmetics containers specifically because of its unique matte texture and premium feel. When a fast-food chain and a luxury fashion house both adopt your material, you have solved something fundamental.',
    ],
    facts: (
      <>
        <p><strong>LIMEX = limestone + X:</strong> Over 50% calcium carbonate (crushed limestone) + thermoplastic resin binder. Limestone is abundant globally — Japan is 100% self-sufficient in it.</p>
        <p><strong>LIMEX Sheet (paper):</strong> 97% less water than conventional papermaking. Zero trees. Naturally waterproof — no plastic coating needed for water resistance.</p>
        <p><strong>LIMEX Pellet (plastic):</strong> Reduces petroleum-based resin by 50%+. Compatible with existing manufacturing equipment — injection molding, extrusion, blow molding.</p>
        <p><strong>10,000+ customers:</strong> Yoshinoya (menus), Japan Ministry of Environment (park guides), LVMH/KENDO (cosmetics containers), LAWSON (recycled garbage bags).</p>
        <p><strong>Dual-market strategy:</strong> One material platform attacking two massive industries — paper ($200B+) and plastics ($400B+) — using the same core technology.</p>
      </>
    ),
    lesson: (
      <>
        <p>The dual-market strategy — one technology platform targeting both paper and plastic — is unusually capital-efficient. Most materials startups focus on one application. LIMEX\'s ability to serve two massive industries from the same factory dramatically improves unit economics: the same machine can produce sheet for menus in the morning and pellet for cosmetics containers in the afternoon. Diversification also reduces demand risk — if the paper market slows, the plastic market may compensate, and vice versa.</p>
        <p>The LVMH adoption is particularly interesting. Luxury brands choose materials for aesthetic and tactile qualities — not just environmental metrics. LIMEX Pellet\'s matte finish and smooth feel were the deciding factors, not its carbon footprint. This is a crucial lesson: sustainability is rarely sufficient as a primary purchase driver. The sustainable option must also be better at doing the job.</p>
      </>
    ),
    lessonTitle: 'One Platform, Two Industries',
    tip: 'The "LIMEX can be paper OR plastic" concept is a concrete example of platform thinking. Ask your child: "What else could you make from crushed rock and a little plastic?" Flooring, tiles, furniture, packaging — the answers reveal how a single insight can multiply into many products. Then flip it: "What skill do you have that could be applied to different kinds of problems?"',
  },
  {
    number: 4,
    tag: 'The Future',
    tagColor: 'bg-emerald-100 text-emerald-700',
    title: 'From Saving Trees to Capturing Carbon',
    teaser:
      'TBM\'s next material does not just reduce emissions — it actively captures CO2 from industrial exhaust and locks it into stone.',
    image: '/images/comics/limex/strip-4.jpg',
    imageAlt:
      'Luna and Wayne look toward the future — a circular economy where LIMEX products are recycled, CO2 is captured from factory smoke and turned into new LIMEX, creating a carbon-negative cycle.',
    story: [
      'TBM\'s ambition goes far beyond making paper from rocks. The company has articulated a bold "TBM Pledge 2030": go carbon negative (remove more CO2 than the company emits) and recycle 1 million tons of LIMEX and plastic across 50 countries annually. These are not marketing slogans — they are backed by specific infrastructure investments and R&D programs.',
      'The centerpiece of the circular strategy is the Yokosuka recycling plant, opened in 2022 in Kanagawa Prefecture. With an annual processing capacity of 40,000 tons, it is Japan\'s largest facility capable of automatically sorting and recycling both LIMEX and conventional plastics. This plant transforms TBM from a materials producer into a waste management and resource recovery company — vertically integrated from raw material to end-of-life processing. The company also launched CirculeX, a brand of recycled materials made from post-consumer LIMEX and plastic waste, with over 50% recycled content and full traceability.',
      'The most dramatic innovation on the horizon is CR LIMEX (Carbon Recycle LIMEX). Instead of using mined limestone, CR LIMEX synthesizes calcium carbonate from CO2 captured directly from industrial exhaust — factory smokestacks, power plants, cement kilns. This transforms LIMEX from a "less bad" material into an actively "carbon-positive" one: every ton of CR LIMEX permanently locks away CO2 that would otherwise remain in the atmosphere. The product itself becomes a carbon sink. If successful at scale, this technology could turn the global building materials industry — one of the hardest sectors to decarbonize — into a net carbon sponge.',
    ],
    facts: (
      <>
        <p><strong>TBM Pledge 2030:</strong> Go carbon negative (remove more CO2 than emitted) and recycle 1M tons of material across 50 countries annually.</p>
        <p><strong>Yokosuka recycling plant:</strong> 40,000 tons/year capacity. Japan\'s largest facility for automated sorting and recycling of both LIMEX and conventional plastics. Opened 2022.</p>
        <p><strong>CirculeX:</strong> Recycled material brand with 50%+ post-consumer content. Used by LAWSON for garbage bags made from recycled Thai plastic waste.</p>
        <p><strong>CR LIMEX (next-gen):</strong> Synthesizes calcium carbonate from captured industrial CO2 instead of mined limestone. Turns the product into a permanent carbon sink.</p>
        <p><strong>Global expansion:</strong> Subsidiaries in Vietnam (2021), strategic alliance with SK Group (Korea, $123M), and China subsidiary in Shanghai (2025).</p>
        <p><strong>Closed-loop partnerships:</strong> Adventure World theme park — used LIMEX cups recycled into plates sold in the same park\'s restaurants. Circular economy in action, visible to consumers.</p>
      </>
    ),
    lesson: (
      <>
        <p>CR LIMEX represents a paradigm shift in how we think about industrial materials. Most "green" products are about doing less harm — using fewer trees, less water, less oil. CR LIMEX goes further: it actively removes a harmful substance (atmospheric CO2) and locks it into a useful product. This is the difference between "sustainable" and "restorative."</p>
        <p>The closed-loop partnership with Adventure World theme park is also worth noting as a practical demonstration. Rather than asking customers to "trust the concept," TBM showed them a real cycle: cup → recycling bin → plate → restaurant. Making circularity visible builds consumer trust in a way that marketing claims cannot replicate. Seeing is believing, especially when it comes to environmental impact.</p>
      </>
    ),
    lessonTitle: 'From Less Bad to Actively Good',
    tip: 'The "cup becomes a plate" loop at Adventure World is a perfect concrete example for explaining circular economy to a child. Ask: "What happens to your water bottle after you recycle it?" Most kids do not know. Then walk through the LIMEX example: cup used at the park → collected → ground up → made into a plate → used at the same park. The concept of "waste = food" for industry is one of the most hopeful ideas in sustainability.',
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

// ── About TBM / LIMEX (collapsible) ──────────────────────────────────

function AboutLimex() {
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
            <p className="font-bold text-slate-800">About TBM / LIMEX</p>
            <p className="text-xs text-slate-400 mt-0.5">Limestone-based paper and plastic replacement with a circular economy model</p>
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
                  <p className="font-semibold text-slate-800 mb-1">What LIMEX Is</p>
                  <p>LIMEX is a composite material made from over 50% calcium carbonate (crushed limestone) mixed with a small amount of thermoplastic resin. It can replace both paper and plastic in a wide range of applications, from restaurant menus to cosmetics containers.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">Environmental Impact</p>
                  <p>Compared to conventional papermaking, LIMEX Sheet uses 97% less water and zero wood pulp. LIMEX Pellet reduces petroleum-based plastic content by 50% or more. The next-generation CR LIMEX will actively capture CO2 from industrial exhaust to make its calcium carbonate, turning the material into a carbon sink.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">Market Traction</p>
                  <p>10,000+ businesses and governments have adopted LIMEX products. Customers range from Yoshinoya (Japan's largest fast-food chain) to LVMH (the world's largest luxury group). TBM has raised significant investment from SK Group ($123M alliance) and operates subsidiaries in Vietnam, China, and Korea.</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-slate-800 mb-1">The Founder</p>
                  <p>Atsushi Yamasaki founded TBM in 2011 after a failed attempt to import stone paper from Taiwan. A former used car dealer with no materials science background, he pivoted to proprietary R&D, secured a critical government grant, and built a vertically integrated materials company with its own recycling infrastructure.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">Why It Matters for Kids</p>
                  <p>The idea that paper can come from rocks instead of trees — and plastic can come from rocks instead of oil — fundamentally changes how children think about "waste" and "resources." LIMEX shows that the materials around us are not fixed: with enough ingenuity, we can reinvent the basic stuff of everyday life.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">Learn More</p>
                  <p>
                    <a href="https://tb-m.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 font-medium">
                      tb-m.com
                    </a>
                    {' '}— LIMEX products, technology details, and environmental impact data.
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

export default function WayneComicLimex() {
  const totalStrips = strips.length;
  return (
    <>
      <SEOHead
        title="Startup Stories #7: LIMEX — Paper and Plastic Made from Rocks | Wayne's Comics"
        description="A parent-child comic series about real startups. Episode 7: TBM's LIMEX — how a Japanese used car dealer turned crushed limestone into a revolutionary material that replaces both paper and plastic, saving forests, water, and fossil fuels."
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
          <img src="/images/comics/limex/cover.jpg" alt="Startup Stories #7: LIMEX — paper and plastic from rocks" className="w-full h-auto" />
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-bold rounded-full uppercase tracking-wide">
            Startup Stories · Episode 7 of 25
          </span>
          <span className="text-xs text-slate-400">June 2026 · {totalStrips} strips · 🇯🇵 Japan</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3 leading-tight">
          Paper and Plastic Made from Rocks
        </h1>
        <p className="text-slate-500 leading-relaxed mb-5 max-w-2xl">
          LIMEX is a material made mostly of limestone that can replace both paper and plastic — using 97% less water than papermaking and zero trees. Founded by a used car salesman who refused to give up after import failure, TBM has grown into Japan's first unicorn in the circular economy space, backed by LVMH, SK Group, and 10,000+ customers. Episode 7 of 25 real startup stories.
        </p>
        <ShareBar
          title="Startup Stories #7: LIMEX — Paper and Plastic Made from Rocks"
          summary="A 4-strip parent-child comic about TBM's LIMEX — the Japanese company turning limestone into paper and plastic replacements with 97% less water usage."
        />
      </motion.div>

      <div className="space-y-6 mb-10">
        {strips.map((strip, i) => (
          <motion.div key={strip.number} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.1 + i * 0.07 }}>
            <StripCard strip={strip} total={totalStrips} />
          </motion.div>
        ))}
      </div>

      <AboutLimex />

      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.4 }}
        className="flex items-center justify-between py-6 border-t border-slate-200 mb-10"
      >
        <Link to="/wayne/comics" className="text-sm text-slate-400 hover:text-slate-700 transition-colors">
          ← All Comics
        </Link>
        <ShareBar title="Startup Stories #7: LIMEX" summary="A parent-child comic about the Japanese company making paper and plastic from crushed limestone — 97% less water, zero trees." />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.45 }}
        className="bg-indigo-600 rounded-2xl px-8 py-10 text-center text-white"
      >
        <h2 className="text-xl font-bold mb-2">More startup stories coming</h2>
        <p className="text-indigo-100 text-sm mb-6 max-w-md mx-auto">
          This is Episode 7 of 25. Each story is about a real company solving a real problem — told in a way that makes sense to a 15-year-old, with analysis for the parent reading along.
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
