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
    tag: 'The Hidden Problem',
    tagColor: 'bg-red-100 text-red-700',
    title: 'The Hormone Everyone Talks About, Nobody Measures',
    teaser:
      'Social media is full of ads for "cortisol-lowering" supplements. But almost nobody actually measures their cortisol levels before taking them. Nutrix saw this gap and built a sensor for it.',
    image: '/images/comics/nutrix/strip-1.jpg',
    imageAlt:
      'Luna watches Wayne scrolling through ads for stress supplements. Wayne explains that nobody actually measures their cortisol before buying these products — which is exactly the problem Nutrix solves.',
    story: [
      'Cortisol is one of the most talked-about hormones on social media. TikTok videos about "lowering your cortisol" have millions of views. Supplement companies sell pills, powders, and teas all claiming to reduce cortisol. There is only one problem: almost nobody who buys these products has ever actually measured their cortisol level. You cannot know whether a supplement is working if you never measure what it is supposed to change.',
      'Cortisol itself is not bad. It is an essential hormone produced by the adrenal glands that regulates metabolism, blood pressure, inflammation, and the sleep-wake cycle. In a healthy stress response, cortisol spikes to give you energy during a challenging situation — the classic "fight or flight" mechanism — and then returns to normal. The problem is chronic stress: when the alarm system stays on permanently. Persistently elevated cortisol disrupts nearly every system in the body, leading to anxiety, weight gain (especially abdominal fat), high blood pressure, weakened immunity, and sleep disorders — the classic symptoms of burnout.',
      'The paradox is that while millions of people worry about cortisol, the only way to measure it accurately has been a blood test in a lab — expensive, inconvenient, and impractical for tracking changes over time. Nutrix, a Swiss health-tech startup, set out to change this. Their insight: if you cannot measure stress objectively, you cannot manage it. And if you cannot manage it, all the supplements and wellness programs in the world are just guesswork.',
    ],
    facts: (
      <>
        <p><strong>Cortisol is essential</strong> for metabolism, blood pressure regulation, inflammation control, and the sleep-wake cycle. It is not the enemy — chronic elevation is.</p>
        <p><strong>Chronic high cortisol</strong> causes: anxiety, depression, weight gain (abdominal), hypertension, weakened immunity, sleep disorders, and memory impairment.</p>
        <p><strong>Traditional cortisol testing</strong> requires a blood draw in a lab — expensive, inconvenient, and provides only a single snapshot that cannot track daily patterns.</p>
        <p><strong>The wellness industry</strong> sells billions of dollars in "cortisol-lowering" supplements annually — but virtually no consumers ever measure their cortisol before or after taking them.</p>
      </>
    ),
    lesson: (
      <>
        <p>The cortisol supplement industry is a case study in what happens when a market forms around a problem that cannot be measured. Without measurement, consumers cannot tell which products work. Companies compete on marketing rather than efficacy. The entire category drifts toward placebo and hype. Nutrix\'s intervention — making cortisol measurable at home — has the potential to transform this market from faith-based to evidence-based.</p>
        <p>This pattern repeats across many health and wellness categories: anything that cannot be measured cannot be managed, and markets for unmeasurable things tend to reward marketing over results. The companies that introduce measurement to unmeasured markets often capture disproportionate value.</p>
      </>
    ),
    lessonTitle: 'The Measurement Gap',
    tip: 'Ask your child: "If you wanted to get stronger, what would you measure?" The obvious answers are things like how much you can lift, how fast you can run. Then ask: "What if you wanted to be less stressed? What would you measure?" This reveals the core problem: stress is harder to measure than physical fitness, which makes it harder to manage. The conversation builds awareness that measurement is the first step toward improvement in any domain.',
  },
  {
    number: 2,
    tag: 'The Founder',
    tagColor: 'bg-amber-100 text-amber-700',
    title: 'The Startup That Started in Chile to Save Swiss Health Tech',
    teaser:
      'Maria Hahn founded Nutrix in Switzerland but launched in Chile — because that is where the funding and the urgent medical need intersected.',
    image: '/images/comics/nutrix/strip-2.jpg',
    imageAlt:
      'Luna learns how Nutrix founder Maria Hahn started her company in Switzerland but chose Chile as the first market — demonstrating a pragmatic global-first strategy.',
    story: [
      'Maria Hahn spent years as a global director at Straumann Group, a leading medical device company. That experience gave her a front-row seat to the fundamental flaw in modern medicine: it is reactive. You get sick, then you get treated. Hahn wanted to build something proactive — a system that helped people stay healthy rather than just treating them after they broke down. After attending an innovation bootcamp at MIT, she founded Nutrix in Basel, Switzerland, in 2020.',
      'What happened next is unusual. Instead of launching in Europe, Hahn took Nutrix to Chile. The decision was strategic: Chile was facing a severe diabetes and obesity public health crisis, the government offered non-dilutive grant funding for female founders, and the country had a national health system (Fonasa) that was open to technology partnerships. Nutrix deployed its gSense digital health platform — connecting smart scales and wearables with AI analysis and remote coaching — to manage chronic disease in Chilean patients. The platform was successfully integrated with Fonasa, validating both the technology and the business model in a real national healthcare system.',
      'This "go where the problem and the money meet" strategy is textbook smart for a deep-tech health startup. Switzerland provided the talent and R&D environment; Chile provided the market, the funding, and the regulatory pathway. When Nutrix later pivoted from general chronic disease management to the more focused cortisol/stress market, it had already proven it could deploy technology at national scale — a credential that opened doors with enterprise customers worldwide.',
    ],
    facts: (
      <>
        <p><strong>Nutrix founded 2020</strong> in Basel, Switzerland, by Maria Hahn — former global director at Straumann Group (medical devices).</p>
        <p><strong>First market: Chile.</strong> Strategic reasons: government grants for female founders, severe diabetes/obesity crisis, open national health system (Fonasa) for tech partnerships.</p>
        <p><strong>gSense platform</strong> — Nutrix\'s original digital health system connecting wearables, AI analysis, and remote coaching for chronic disease management. Validated at national scale in Chile.</p>
        <p><strong>CortiSense pivot:</strong> The cortisol sensor emerged from the gSense platform capability — adding a specific biomarker sensor to a proven digital health infrastructure.</p>
        <p><strong>Funding:</strong> $2.32M raised from Simpact VC, Chile Ventures, and Innosuisse (Swiss Innovation Agency).</p>
      </>
    ),
    lesson: (
      <>
        <p>Hahn\'s strategy of launching in Chile rather than Switzerland is a counterintuitive lesson in market selection. Most startups go where they are based. Hahn went where the conditions were favorable — available grant funding, an urgent health crisis that created demand, and a national health system willing to partner. The "home market" bias is strong, but for health-tech startups in particular, the best first market is rarely where the founder lives.</p>
        <p>The pivot from general chronic disease to specific stress monitoring also demonstrates a smart narrowing strategy. "Digital health for chronic disease" is a crowded, vague category. "At-home cortisol measurement for workplace burnout" is a specific, defensible niche. The narrower problem was easier to communicate, sell, and build a product around — even though it addressed a subset of the original mission.</p>
      </>
    ),
    lessonTitle: 'Go Where the Conditions Are Right',
    tip: 'The Chile strategy is a great conversation starter about "finding the right place to start." Ask your child: "If you wanted to start a business selling winter coats, would you start in Florida or Alaska?" The obvious answer (Alaska) reveals a simple principle: go where the problem is most urgent. Then ask: "What is something you want to learn? Where is the best place to start — the place where conditions are most favorable?"',
  },
  {
    number: 3,
    tag: 'The Innovation',
    tagColor: 'bg-indigo-100 text-indigo-700',
    title: 'Spit in a Tube, Know Your Stress',
    teaser:
      'CortiSense measures cortisol from a saliva sample at home — no blood, no lab, no waiting. Results in minutes, patterns tracked over time.',
    image: '/images/comics/nutrix/strip-3.jpg',
    imageAlt:
      'Luna tries the CortiSense device — a small saliva tester connected to a phone app that shows cortisol levels and stress trends over time.',
    story: [
      'CortiSense is a small, portable device that measures cortisol levels from a saliva sample. The user provides a small saliva sample onto a test strip, inserts it into the reader, and gets results within minutes. No blood draw, no lab visit, no waiting days for results. The device connects to a smartphone app that tracks cortisol patterns over time — showing not just a single reading but the daily rhythm of cortisol production, which is clinically more meaningful than any isolated measurement.',
      'The clinical relevance of tracking cortisol patterns is significant. Healthy cortisol production follows a diurnal rhythm: highest in the morning (to help you wake up), declining through the day, and lowest at night (to allow sleep). Chronic stress disrupts this rhythm — the morning peak may be blunted, the evening level may stay elevated, or the entire curve may flatten. A single lab test cannot capture this pattern. At-home daily measurement can. This difference transforms cortisol testing from a diagnostic snapshot into a management tool.',
      'Nutrix won the CES 2025 Digital Health Innovation Award for CortiSense — selected from over 3,400 competing projects. The award validated both the technology and the market timing. Competitors exist (notably Canada\'s Eli Health with its Hormometer), but Nutrix\'s differentiation is its B2B ecosystem approach. Rather than selling devices directly to consumers as a "quantified self" gadget, Nutrix sells CortiSense as part of a comprehensive workplace wellness platform — including the device, test strips, AI analytics, and integration with corporate wellness programs.',
    ],
    facts: (
      <>
        <p><strong>CortiSense:</strong> At-home salivary cortisol measurement device. Results in minutes. No blood, no lab, no waiting.</p>
        <p><strong>Tracks cortisol rhythm:</strong> Healthy cortisol peaks in the morning and declines through the day. Chronic stress disrupts this pattern. At-home daily tracking captures what a single lab test cannot.</p>
        <p><strong>CES 2025 Digital Health Innovation Award:</strong> Won from over 3,400 competing projects — one of the most competitive categories at CES.</p>
        <p><strong>Competitor landscape:</strong> Eli Health\'s Hormometer (Canada) is a direct competitor. Nutrix differentiates via its B2B/enterprise ecosystem rather than direct-to-consumer sales.</p>
        <p><strong>Enterprise platform:</strong> CortiSense is sold as part of a workplace wellness subscription — device + strips + AI analytics + integration with corporate health programs.</p>
      </>
    ),
    lesson: (
      <>
        <p>Nutrix\'s key strategic insight was choosing the enterprise B2B route over direct-to-consumer. Selling a wellness device to individuals is a tough business: high customer acquisition costs, low retention, price sensitivity. Selling a stress-management platform to companies is fundamentally different: longer contracts, higher willingness to pay, and a buyer (HR/benefits managers) who has budget allocated for exactly this category.</p>
        <p>The CES award is also worth noting strategically. Winning a major innovation award provides third-party validation that is particularly valuable in health-tech, where trust is a critical purchase factor. For a startup competing against established wellness vendors, an independent "best in class" award can be the difference between a sales meeting and a sales cycle.</p>
      </>
    ),
    lessonTitle: 'B2B vs. DTC: Choosing Your Battlefield',
    tip: 'The "sell to companies vs. sell to people" choice is a fundamental business strategy question. Ask your child: "If you invented a device that measures how much homework someone has left, would you sell it to students or to schools?" Walk through the tradeoffs: students have less money, schools have budgets; students can decide overnight, schools take months; one customer (a school district) buys for thousands of students at once. The exercise reveals why many health-tech startups choose B2B over DTC.',
  },
  {
    number: 4,
    tag: 'The Opportunity',
    tagColor: 'bg-emerald-100 text-emerald-700',
    title: 'When the Government Mandates Stress Testing',
    teaser:
      'Japan requires all companies with 50+ employees to conduct annual stress checks. Nutrix\'s CortiSense turns a regulatory checkbox into a data-driven wellness strategy.',
    image: '/images/comics/nutrix/strip-4.jpg',
    imageAlt:
      'Wayne and Luna look at a world map — Nutrix is expanding from Chile to Japan, where the government already mandates annual stress checks for employees, creating a ready-made market.',
    story: [
      'Nutrix\'s most strategically important market may be Japan. Since 2015, Japanese law has required all companies with 50 or more employees to conduct annual "stress checks" — a questionnaire-based screening for mental health risks. This regulation creates a massive, built-in demand for stress assessment tools. Currently, most companies comply with paper surveys that are subjective, easy to game, and provide limited actionable data. CortiSense offers an objective, biomarker-based alternative that turns a compliance requirement into a data-driven wellness initiative.',
      'The Japan opportunity illustrates a broader principle: the best market entry points are often where regulation creates demand. Nutrix does not need to convince Japanese companies that stress measurement matters — the government already did that. The question is simply whether CortiSense is a better tool than the paper surveys companies currently use. "Better" is a much easier sale than "necessary." Maria Hahn has personally engaged with the Japanese market through events like BioJapan, signaling serious commitment to this expansion.',
      'Beyond Japan, Nutrix is expanding across Latin America (Chile, Mexico, Peru) and targeting the United States. The US market is driven by a different dynamic: corporate wellness spending has grown to massive levels as employers seek to reduce healthcare costs and improve productivity. If Nutrix can demonstrate that CortiSense-driven wellness programs reduce burnout-related turnover and healthcare claims, the ROI argument writes itself. The company\'s long-term vision is to build the operating system for preventive mental health — starting with cortisol, expanding to other biomarkers, and becoming the standard for objective stress measurement in the workplace.',
    ],
    facts: (
      <>
        <p><strong>Japan\'s Stress Check Law (2015):</strong> All companies with 50+ employees must conduct annual mental health stress screening. Creates a massive built-in market for stress assessment tools.</p>
        <p><strong>Current compliance:</strong> Mostly paper-based questionnaires — subjective, easy to game, limited actionable data. CortiSense offers objective biomarker-based measurement as a superior alternative.</p>
        <p><strong>Latin America expansion:</strong> Chile (home base), Mexico, Peru — leveraging existing gSense platform relationships and regulatory experience.</p>
        <p><strong>US target market:</strong> Corporate wellness spending has reached enormous scale. The value proposition: reduce burnout-related turnover and healthcare claims through objective stress management.</p>
        <p><strong>Funding raised:</strong> $2.32M to date. Investors: Simpact VC, Chile Ventures, Innosuisse.</p>
        <p><strong>Long-term vision:</strong> Cortisol is the first biomarker. The platform is designed to expand to other stress-related biomarkers over time — becoming the standard for objective workplace stress measurement.</p>
      </>
    ),
    lesson: (
      <>
        <p>The Japan market strategy is a textbook example of "regulatory tailwind." When a government mandates a specific activity (stress testing), companies must comply. The question is not whether they will spend money on it — it is which solution they will choose. Being the "better alternative" in a mandated category is structurally easier than creating demand in an unregulated market.</p>
        <p>This is a specific type of go-to-market strategy worth understanding: find a regulation that creates a purchasing requirement, then build a product that is clearly superior to the compliance-default option (in this case, paper surveys). The regulation creates demand; the product captures it through differentiation.</p>
      </>
    ),
    lessonTitle: 'Riding the Regulatory Tailwind',
    tip: 'Ask your child: "What are some things the government requires companies to do?" Safety inspections, fire exits, health checks. Then ask: "If a company has to do something by law, what opportunity does that create for someone who can help them do it better?" This is a foundational insight about how regulation creates markets — and why some of the best business opportunities come from compliance requirements, not consumer demand.',
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

function AboutNutrix() {
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
            <span className="text-indigo-600 text-sm font-bold">NX</span>
          </div>
          <div>
            <p className="font-bold text-slate-800">About Nutrix / CortiSense</p>
            <p className="text-xs text-slate-400 mt-0.5">At-home cortisol measurement for workplace stress management</p>
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
                  <p className="font-semibold text-slate-800 mb-1">What Nutrix Does</p>
                  <p>Nutrix makes CortiSense — the first at-home salivary cortisol measurement device. It provides real-time cortisol readings and tracks stress patterns over time, enabling individuals and companies to manage chronic stress with objective data rather than guesswork.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">The Technology</p>
                  <p>CortiSense measures cortisol from a saliva sample using a proprietary sensor. Results appear within minutes on a connected smartphone app. The app tracks daily cortisol rhythms and provides trend analysis over weeks and months.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">The Business Model</p>
                  <p>B2B subscription for corporate wellness programs. Employers pay for device + test strips + AI analytics + platform access. Only aggregate, anonymized data is shared with employers — individual privacy is protected. Also exploring integration with national health systems.</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-slate-800 mb-1">The Founder</p>
                  <p>Maria Hahn, former global director at Straumann Group (medical devices). Inspired by MIT innovation bootcamp to shift healthcare from reactive "sick-care" to proactive "healthcare." Founded Nutrix in Basel, Switzerland, in 2020.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">Why It Matters for Kids</p>
                  <p>Stress is something every child experiences — tests, performances, social pressure. Learning that stress can be measured objectively (not just "felt") helps children understand their own bodies better. It also introduces the concept of biomarkers and preventive health: measuring something before it becomes a problem.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">Learn More</p>
                  <p>
                    <a href="https://www.corti-sense.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 font-medium">
                      corti-sense.com
                    </a>
                    {' '}— product information and technology details.
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

export default function WayneComicNutrix() {
  const totalStrips = strips.length;
  return (
    <>
      <SEOHead
        title="Startup Stories #9: Nutrix — The At-Home Cortisol Sensor | Wayne's Comics"
        description="A parent-child comic series about real startups. Episode 9: Nutrix and CortiSense — the first at-home salivary cortisol measurement device that turns workplace stress management from guesswork into data-driven science."
        ogImage="/images/comics/nutrix/cover.jpg"
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
          <img src="/images/comics/nutrix/cover.jpg" alt="Startup Stories #9: Nutrix CortiSense — at-home cortisol measurement" className="w-full h-auto" />
        </div>
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-bold rounded-full uppercase tracking-wide">
            Startup Stories · Episode 9 of 25
          </span>
          <span className="text-xs text-slate-400">June 2026 · {totalStrips} strips · 🇨🇭 Switzerland</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3 leading-tight">
          Spit in a Tube, Know Your Stress
        </h1>
        <p className="text-slate-500 leading-relaxed mb-5 max-w-2xl">
          Everyone talks about cortisol. Almost nobody measures it. Nutrix built CortiSense — a device that measures the stress hormone from a saliva sample at home, turning workplace wellness from guesswork into data science. CES 2025 Innovation Award winner. Episode 9 of 25 real startup stories.
        </p>
        <ShareBar
          title="Startup Stories #9: Nutrix — The At-Home Cortisol Sensor"
          summary="A 4-strip parent-child comic about Nutrix and CortiSense — the first at-home salivary cortisol measurement device for workplace stress management."
        />
      </motion.div>

      <div className="space-y-6 mb-10">
        {strips.map((strip, i) => (
          <motion.div key={strip.number} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.1 + i * 0.07 }}>
            <StripCard strip={strip} total={totalStrips} />
          </motion.div>
        ))}
      </div>

      <AboutNutrix />

      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.4 }}
        className="flex items-center justify-between py-6 border-t border-slate-200 mb-10"
      >
        <Link to="/wayne/comics" className="text-sm text-slate-400 hover:text-slate-700 transition-colors">
          ← All Comics
        </Link>
        <ShareBar title="Startup Stories #9: Nutrix" summary="A parent-child comic about the Swiss startup making at-home cortisol measurement accessible for workplace wellness." />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.45 }}
        className="bg-indigo-600 rounded-2xl px-8 py-10 text-center text-white"
      >
        <h2 className="text-xl font-bold mb-2">More startup stories coming</h2>
        <p className="text-indigo-100 text-sm mb-6 max-w-md mx-auto">
          This is Episode 9 of 25. Each story is about a real company solving a real problem — told in a way that makes sense to a 15-year-old, with analysis for the parent reading along.
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
