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
    title: '800 Million People That E-Commerce Forgot',
    teaser:
      'India has 800 million rural consumers with billions in spending power. But Amazon and Flipkart cannot reach them — no addresses, bad roads, no internet. And even if they could, nobody would trust a stranger selling through a screen.',
    image: '/images/comics/village-trust/strip-1.jpg',
    imageAlt:
      'Luna and Wayne visit a rural Indian village. There are no street addresses, no mail delivery, and villagers are skeptical of buying things online. Luna asks "How do people here buy things they need?"',
    story: [
      'India has over 800 million rural consumers — a market worth hundreds of billions of dollars. But e-commerce giants like Amazon and Flipkart have barely scratched the surface. The problem is not demand or spending power — rural Indians buy plenty of goods. The problem is that the entire e-commerce model was designed for cities, and it breaks down completely in rural India.',
      'The obstacles are layered. Physical logistics: no standardized street addresses, poor road connectivity that gets worse during monsoon season, low population density that makes per-delivery costs astronomical. Digital barriers: rural Indian men are twice as likely to use the internet as women, and many women have no access to smartphones at all. Trust deficit: e-commerce requires trust in digital payments and faceless sellers, but rural consumers strongly prefer "touch and feel" buying, fear data theft, and rely almost exclusively on cash-on-delivery.',
      'The result is a massive market failure. Rural consumers pay more for lower-quality goods from local shops because they have no access to the competitive pricing and selection that urban consumers take for granted. The infrastructure is not the bottleneck — the bottleneck is trust. And you cannot solve a trust problem with a better app.',
    ],
    facts: (
      <>
        <p><strong>800 million</strong> rural consumers in India — a market larger than the entire population of Europe, yet massively underserved by e-commerce.</p>
        <p><strong>No standardized addresses</strong> — in most Indian villages, there are no street names or house numbers. Delivery apps cannot find anyone.</p>
        <p><strong>Gender digital divide:</strong> Rural Indian men are twice as likely to use the internet as women. Many women are not allowed to own smartphones.</p>
        <p><strong>Cash-on-delivery</strong> is the only trusted payment method in rural India — digital payment adoption is extremely low due to fear and lack of literacy.</p>
        <p><strong>Last-mile logistics:</strong> Poor roads, monsoon flooding, and low population density make traditional delivery models economically unviable.</p>
        <p><strong>The real problem is trust:</strong> Not technology, not infrastructure, not affordability. Rural consumers do not trust faceless e-commerce platforms.</p>
      </>
    ),
    lesson: (
      <>
        <p>This is a classic example of what happens when you try to apply a solution designed for one context to a completely different context. E-commerce works in cities because cities have addresses, internet penetration, digital payment infrastructure, and anonymous trust (trust in brands and platforms rather than in people). In rural India, none of these exist.</p>
        <p>The critical insight: the bottleneck is not technology — it is trust. Technology can amplify trust, but it cannot create it from nothing. To serve a market where trust is the scarce resource, you need to build your business model around trust first and technology second. This is the opposite of how Silicon Valley thinks.</p>
      </>
    ),
    lessonTitle: 'You Cannot Solve a Trust Problem with an App',
    tip: 'Ask your child: "Would you buy something from a stranger on the internet?" Probably not. "What if your best friend said they already bought from that seller and it was great?" That changes everything. Trust is transferred through relationships, not through logos or ads. Frontier Markets understood that in rural India, the only way to earn trust is through a person who is already part of the community. The app is just a tool — the Saheli is the real platform. This teaches kids that relationships matter more than technology in many situations.',
  },
  {
    number: 2,
    tag: 'The Solution',
    tagColor: 'bg-amber-100 text-amber-700',
    title: 'The "Saheli" — A Girlfriend Who Is Also Your Amazon, UPS, and Tech Support',
    teaser:
      'Frontier Markets recruits, trains, and equips rural women — "Sahelis" (best friends) — who become the human interface between e-commerce and their village. They earn commissions, respect, and a surprising 95% retention rate.',
    image: '/images/comics/village-trust/strip-2.jpg',
    imageAlt:
      'Wayne and Luna discuss how the Saheli network works — local women in Indian villages who act as sales agents, delivery people, and tech support for their communities. Wayne explains the "phygital" model.',
    story: [
      'Frontier Markets was founded in 2011 by Ajaita Shah — an Indian-American woman who grew up between New York and a traditional Jaipur community. She speaks Hindi fluently and understands both the "insider" cultural perspective and the "outsider" business perspective. Her lightbulb moment came while working in microfinance in India, where she met countless rural women who were illiterate, lacked basic utilities, yet managed their household finances and were pillars of their communities.',
      'The company started as a clean energy provider, training local women as "Solar Sahelis" (solar girlfriends) to sell solar lamps. But Shah quickly realized that the real asset was not the solar products — it was the network of women who could overcome the trust barrier and sell anything. Frontier Markets pivoted from a clean energy company to a "phygital" (physical + digital) assisted commerce platform. The Saheli network became the distribution channel for everything.',
      'Today, a "Saral Jeevan Saheli" (Simple Life Friend) is a trained local woman who acts as Amazon, UPS, tech support, and customer service — all in one person. She takes orders from villagers (on her smartphone, or verbally for those who cannot read), places them through the Frontier Markets app, receives the goods at her home, delivers them to neighbors, collects cash payments, and handles complaints. The company provides the technology, the products, the inventory financing, and the training. The Saheli provides the one thing technology cannot: trusted human relationships.',
    ],
    facts: (
      <>
        <p><strong>Frontier Markets:</strong> Founded 2011 by Ajaita Shah. Started as a solar energy social enterprise, pivoted to a platform model in 2012.</p>
        <p><strong>Saheli network:</strong> "Saheli" means "girlfriend" in Hindi. These are local women trained as last-mile sales, delivery, and service agents for their villages.</p>
        <p><strong>"Phygital" model:</strong> Physical (human Saheli network) + Digital (app for ordering, inventory, payments). Technology amplifies trust rather than replacing it.</p>
        <p><strong>From product to platform:</strong> Started selling solar lamps, realized the Saheli network was the real asset. Now sells 500+ products across categories.</p>
        <p><strong>Founder background:</strong> Ajaita Shah grew up in New York and a traditional Jaipur community. Hindi-fluent, bicultural — able to bridge urban and rural India.</p>
        <p><strong>95% Saheli retention rate:</strong> Extraordinary for a gig-economy workforce. The secret: flexible hours, zero commute (work from home), dignity, and community respect.</p>
      </>
    ),
    lesson: (
      <>
        <p>Frontier Markets\' pivot from "selling solar lamps" to "building a Saheli network" is one of the most important strategic lessons in this series. The company thought its product was solar energy. It turned out the product was the distribution channel itself. The solar lamps were just the first thing sold through that channel.</p>
        <p>This is a pattern that repeats across many successful businesses: the initial product is a vehicle for building a capability, and the capability turns out to be far more valuable than the product. Amazon started selling books but the real product was the e-commerce infrastructure. Frontier Markets started selling solar lamps but the real product was the Saheli trust network.</p>
      </>
    ),
    lessonTitle: 'Your First Product Is Training Wheels for Your Real Business',
    tip: 'Ask your child: "If you started a lemonade stand, what would be more valuable after a summer — the money you earned, or the relationships you built with your customers and the knowledge of how to run a stand?" The relationships and knowledge are the real asset — they can be used for any future business. Frontier Markets discovered the same thing: the solar lamps were just the first product. The real asset was a network of trusted women who could sell anything.',
  },
  {
    number: 3,
    tag: 'The Strategy',
    tagColor: 'bg-indigo-100 text-indigo-700',
    title: 'When COVID Broke Everything, Their Network Was the Only Thing That Worked',
    teaser:
      'During COVID lockdowns, every supply chain in India collapsed except one: Frontier Markets. The Saheli network became a critical infrastructure for food, medicine, and essentials. The crisis that killed competitors validated their model.',
    image: '/images/comics/village-trust/strip-3.jpg',
    imageAlt:
      'Wayne explains the impact of COVID on rural India and how the Saheli network became the only functioning supply chain. Frontier Markets sold 10x more products and served 2x more customers than before the pandemic.',
    story: [
      'When COVID-19 hit India in 2020, the country went into one of the strictest lockdowns in the world. Every logistics network — Amazon, Flipkart, traditional distributors — collapsed. Roads were closed, trucks stopped moving, and rural villages were cut off from all supply chains. The crisis was existential for Frontier Markets too — their product supply chain was broken.',
      'But Ajaita Shah did something that transformed the company. She turned Frontier Markets into a giant call center — every employee called every Saheli to assess local conditions. They discovered that villages were running out of food, soap, medicine, and agricultural supplies. Frontier Markets pivoted overnight from selling solar products and electronics to selling groceries, hygiene products, and farming tools. They partnered with the Rajasthan state government to get travel permits for their delivery team.',
      'The result was stunning: Frontier Markets sold 10 times the number of products and served twice the number of customers compared to the previous year. While every other supply chain had failed, the Saheli network was the only functioning logistics infrastructure in rural India. The Sahelis were not just salespeople — they were the emergency response system for their communities.',
      'COVID proved that Frontier Markets was not a "nice to have" social enterprise — it was critical national infrastructure. The company is now expanding into financial services through "She Leads Bharat" — a partnership with Mastercard and Airtel Payments Bank to train Sahelis as village bankers, insurance agents, and health advisors. By 2030, the goal is 1 million Sahelis serving 100 million rural households.',
    ],
    facts: (
      <>
        <p><strong>COVID pivot:</strong> When all supply chains collapsed, Frontier Markets pivoted from solar products to groceries, hygiene essentials, and farm tools — selling 10x more products and serving 2x more customers.</p>
        <p><strong>Call center transformation:</strong> The company turned into a giant call center, with every employee calling Sahelis to assess community needs. This real-time intelligence network was invaluable.</p>
        <p><strong>Government partnership:</strong> Worked with Rajasthan state government to secure travel permits for delivery teams — proving the network\'s status as essential infrastructure.</p>
        <p><strong>"She Leads Bharat":</strong> Partnership with Mastercard and Airtel Payments Bank to transform Sahelis into village bankers, insurance agents, and health advisors.</p>
        <p><strong>2020 goal:</strong> 1 million Sahelis serving 100 million rural households by 2030 — scaling from product delivery to comprehensive service infrastructure.</p>
        <p><strong>The secret weapon:</strong> 95% Saheli retention. In an industry where gig workers churn at 50-80% annually, this stability is Frontier Markets\' moat.</p>
      </>
    ),
    lesson: (
      <>
        <p>The COVID story reveals something profound about what Frontier Markets had actually built. Before the crisis, it looked like a distribution company selling consumer goods to rural villages. After the crisis, it was clear they had built a trust network that functioned as critical infrastructure — a network that could distribute anything, gather real-time intelligence from thousands of communities, and mobilize rapidly in a crisis.</p>
        <p>This is the difference between a business and an institution. A business optimizes for profit within a stable environment. An institution is a system that becomes essential to how society functions. Frontier Markets became an institution during COVID, and that fundamentally changed the company\'s trajectory. The partnerships with Mastercard, Airtel, and the Rajasthan government would not have been possible without this proof of resilience.</p>
      </>
    ),
    lessonTitle: 'A Crisis Doesn\'t Create Value — It Reveals It',
    tip: 'Ask your child: "When things go wrong, who do people in our community turn to?" Maybe it is a neighbor who always has extra food, a relative who is good at fixing things, or a local store that stays open during storms. These people are not heroes during normal times — but when things break down, their real value becomes visible. COVID did not make Frontier Markets valuable — it revealed that the Saheli network had always been valuable. Crises strip away the superficial and reveal what truly matters.',
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

function AboutFrontierMarkets() {
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
          <div className="w-8 h-8 bg-rose-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-rose-600 text-sm font-bold">FM</span>
          </div>
          <div>
            <p className="font-bold text-slate-800">About Frontier Markets</p>
            <p className="text-xs text-slate-400 mt-0.5">Trust-powered commerce for rural India</p>
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
                  <p className="font-semibold text-slate-800 mb-1">What Frontier Markets Does</p>
                  <p>Frontier Markets operates a "phygital" (physical + digital) assisted commerce platform for rural India. Their network of 10,000+ Sahelis (local women agents) provides last-mile sales, delivery, and service for 500+ products including electronics, groceries, hygiene products, and farm tools.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">The Technology</p>
                  <p>A mobile app that Sahelis use to place orders, track inventory, process payments, and manage customer relationships. But the "real" technology is the human network — the Sahelis themselves, who bridge the trust gap that pure technology cannot cross.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">The Business Model</p>
                  <p>Commission-based income for Sahelis, inventory financing provided by Frontier Markets, B2B partnerships with brands (electronics, FMCG, agriculture). Expanding into financial services through "She Leads Bharat" with Mastercard and Airtel Payments Bank.</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-slate-800 mb-1">The Founder</p>
                  <p>Ajaita Shah — Indian-American, grew up between New York and Jaipur. Hindi-fluent, bicultural perspective. Started Frontier Markets in 2011 at age 25. Previously worked in microfinance in rural India where she discovered the power and potential of rural women as economic agents.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">Why It Matters for Kids</p>
                  <p>Frontier Markets teaches that the best technology does not always replace human relationships — sometimes it amplifies them. The Saheli network succeeds because it starts with trust (a real person in the community) and uses technology (a smartphone app) as a tool, not a replacement. This is a powerful counterpoint to the idea that "apps solve everything" — in many real-world contexts, the human element is the actual product, and technology is just the enabler.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">Learn More</p>
                  <p>
                    <a href="https://www.frontiermkts.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 font-medium">
                      frontiermkts.com
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

export default function WayneComicVillageTrust() {
  const totalStrips = strips.length;
  return (
    <>
      <SEOHead
        title="Startup Stories #20: Frontier Markets — The 'Girlfriend Network' Powering Rural India's E-Commerce | Wayne's Comics"
        description="A parent-child comic series about real startups. Episode 20: Frontier Markets — a social enterprise turning rural Indian women into a last-mile sales and delivery network that outperforms Amazon and Flipkart in 800 million underserved villages."
        ogImage="/images/comics/village-trust/cover.jpg"
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
          <img src="/images/comics/village-trust/cover.jpg" alt="Startup Stories #20: Frontier Markets — empowering rural Indian women as last-mile e-commerce agents" className="w-full h-auto" />
        </div>
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-bold rounded-full uppercase tracking-wide">
            Startup Stories · Episode 20 of 25
          </span>
          <span className="text-xs text-slate-400">June 2026 · {totalStrips} strips · 🇮🇳 India</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3 leading-tight">
          The Girlfriend Network That Amazon Could Not Build
        </h1>
        <p className="text-slate-500 leading-relaxed mb-5 max-w-2xl">
          800 million rural Indians have no addresses, unreliable internet, and zero trust 
          in faceless apps. Frontier Markets found a solution: recruit, train, and equip local 
          women — "Sahelis" (best friends) — to be Amazon, UPS, and tech support for their 
          own villages. Episode 20 of 25.
        </p>
        <ShareBar
          title="Startup Stories #20: Frontier Markets — Rural India's Saheli E-Commerce Network"
          summary="A 3-strip parent-child comic about Frontier Markets — turning rural Indian women into a trusted last-mile commerce network that outperforms traditional e-commerce."
        />
      </motion.div>

      <div className="space-y-6 mb-10">
        {strips.map((strip, i) => (
          <motion.div key={strip.number} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.1 + i * 0.07 }}>
            <StripCard strip={strip} total={totalStrips} />
          </motion.div>
        ))}
      </div>

      <AboutFrontierMarkets />

      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.4 }}
        className="flex items-center justify-between py-6 border-t border-slate-200 mb-10"
      >
        <Link to="/wayne/comics" className="text-sm text-slate-400 hover:text-slate-700 transition-colors">
          ← All Comics
        </Link>
        <ShareBar title="Startup Stories #20: Frontier Markets" summary="A parent-child comic about how rural Indian women built a trusted commerce network that beats Amazon on its own turf." />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.45 }}
        className="bg-indigo-600 rounded-2xl px-8 py-10 text-center text-white"
      >
        <h2 className="text-xl font-bold mb-2">More startup stories coming</h2>
        <p className="text-indigo-100 text-sm mb-6 max-w-md mx-auto">
          This is Episode 20 of 25. Each story is about a real company solving a real problem — told in a way that makes sense to a 15-year-old, with analysis for the parent reading along.
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
