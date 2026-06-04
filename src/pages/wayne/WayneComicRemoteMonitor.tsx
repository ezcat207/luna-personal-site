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
    title: 'Grandma Travels 200 Kilometers for a 5-Minute Checkup — and That Is the Best Option',
    teaser:
      'Thailand\'s public hospitals are drowning. An aging population, skyrocketing chronic disease rates, and a system designed for in-person visits mean patients in rural areas travel hours for brief follow-ups. Doctors are exhausted. The system is breaking — not from bad medicine, but from bad logistics.',
    image: '/images/comics/remote-monitor/strip-1.jpg',
    imageAlt:
      'An elderly Thai grandmother looks confused at a complex medical device. Luna notices her frustration. Wayne explains that she has diabetes and has to travel 200km to the nearest hospital for a checkup that lasts 5 minutes — because there is no other way for the doctor to monitor her.',
    story: [
      'Thailand has one of the best public healthcare systems in Southeast Asia. It also has one of the most stressed. The country is aging rapidly — by 2030, Thailand will be a "super-aged" society with over 20% of the population over 65. At the same time, chronic non-communicable diseases (NCDs) like diabetes, hypertension, and kidney disease are exploding. Diabetes alone affects over 8 million Thais. The combination is a time bomb.',
      'The system was designed for acute care — you get sick, you go to the hospital, you get treated, you go home. But chronic disease requires continuous monitoring — monthly checkups, medication adjustments, lab tests, lifestyle counseling. The old model cannot handle it. In rural northern Thailand, over 6.5 million patients travel 200 kilometers or more each year just to reach a hospital. Once there, they wait 3-4 hours for a follow-up consultation that lasts 5 minutes. The doctor barely has time to ask "how are you feeling?" before the next patient is wheeled in.',
      'The human cost is staggering. For an elderly grandmother with diabetes living in a rural village, a monthly hospital visit means: waking up at 4 AM, arranging transportation (often a shared pickup truck or a motorbike taxi), travelling for 2-3 hours on rough roads, waiting hours at the hospital, seeing the doctor for minutes, picking up medication, and travelling home — arriving exhausted and having spent a full day and significant money for what should be a simple checkup. Many patients skip appointments entirely, leading to complications that land them in the ER — which costs the system 10x more than preventive care would have.',
    ],
    facts: (
      <>
        <p><strong>Thailand\'s aging crisis:</strong> By 2030, Thailand will be a "super-aged" society — over 20% of the population over 65. One of the fastest-aging populations in the developing world.</p>
        <p><strong>Chronic disease explosion:</strong> Over 8 million Thais have diabetes. Hypertension, kidney disease, and heart disease are also at epidemic levels. These require continuous monitoring that the system was not designed for.</p>
        <p><strong>6.5 million rural patients</strong> travel 200+ km annually for hospital visits. Average wait time: 3-4 hours for a 5-minute consultation.</p>
        <p><strong>The skip cycle:</strong> Patients who cannot make the trip skip appointments → complications worsen → they end up in the ER → costs the system 10x more than preventive care. A vicious cycle that strains everyone.</p>
        <p><strong>Doctor burnout:</strong> Public hospital doctors in Thailand see 100+ patients per day. Any new system that adds to their workload will be rejected — even if it helps patients.</p>
      </>
    ),
    lesson: (
      <>
        <p>Thailand\'s healthcare crisis is not a technology problem or a funding problem at its core — it is a "process" problem. The medical knowledge exists. The medications exist. The doctors and nurses exist. What does not exist is a workflow that matches the needs of chronic disease patients to the capabilities of the healthcare system. The 19th-century model of "patient travels to doctor" cannot handle 21st-century disease patterns.</p>
        <p>This is an important lesson for kids: some of the biggest problems in the world are not caused by a lack of something — they are caused by a mismatch between how things are organized and what people actually need. The solution is not always "build more hospitals" or "train more doctors" (though both help). Sometimes the solution is to redesign the process so that the existing resources can serve more people more effectively.</p>
      </>
    ),
    lessonTitle: 'The Problem Is Not Resources — It Is Process',
    tip: 'Ask your child: "If you had to visit the doctor every week for a condition, what would be the hardest part?" The answer is probably not the medical check itself — it is the travel, the waiting, the time away from school or friends. Dietz.Asia\'s founder started the company because his mother had kidney disease and he saw firsthand how exhausting the system was. He realized that the real problem was not "how do we cure disease?" but "how do we make managing disease less burdensome?" This shift in framing — from cure to convenience — was the key insight that built a company.',
  },
  {
    number: 2,
    tag: 'The Solution',
    tagColor: 'bg-amber-100 text-amber-700',
    title: 'The "Intel Inside" for Overwhelmed Hospitals — Telemedicine That Does Not Add to Doctors\' Workload',
    teaser:
      'Dietz.Asia\'s founder made a crucial decision: not a B2C app that patients download, but a B2B platform that plugs directly into hospital systems. The platform redesigns workflows so doctors do less admin and patients make fewer trips.',
    image: '/images/comics/remote-monitor/strip-2.jpg',
    imageAlt:
      'A remote monitoring device in a Thai home. The grandmother checks her blood sugar and blood pressure, and the data is automatically sent to her doctor\'s dashboard. Wayne explains to Luna how the data flows from the village to the hospital without anyone traveling.',
    story: [
      'Phongchai Petsanghan founded Dietz.Asia in 2020, but his founding story started years earlier — as a caregiver for his mother, who suffered from chronic kidney disease, and his grandparents, who had diabetes. He experienced the brutal friction of Thailand\'s public healthcare system firsthand. But instead of building yet another "Uber for doctors" app, he made a strategic decision that would define the company: go B2B, not B2C.',
      'This decision was based on a simple reality: 90% of Thais rely on the public hospital system for their healthcare. A B2C app that operates outside this system cannot access patient medical records, cannot coordinate with the patient\'s actual doctors, and cannot integrate with the hospital\'s billing and insurance systems. It would be a parallel universe that helps nobody. Dietz.Asia\'s insight: do not try to replace the public hospital system — empower it.',
      'Dietz.Asia\'s platform is a comprehensive "telemedicine-as-a-service" system that plugs directly into hospital information systems (HIS). It enables: remote patient monitoring (patients measure blood sugar and blood pressure at home, data flows automatically to the hospital), video consultations with the patient\'s own doctor, electronic prescriptions sent directly to the pharmacy, online payment integrated with Thailand\'s universal healthcare coverage (the "30 Baht" scheme), and medication delivery tracking. The platform supports multi-disciplinary care teams — doctors, nurses, pharmacists, nutritionists, and physical therapists all on the same system.',
      'But the real innovation is not the features — it is the "process innovation." Phongchai emphasizes that Dietz.Asia sells workflow redesign, not software. Every feature is designed to reduce the workload of already-overworked hospital staff, not add to it. For example, instead of making nurses manually interview and enter data for HIV patients, the platform lets patients fill out a detailed self-assessment questionnaire at home before the appointment — saving the nurse 15 minutes per patient. Small changes, massive impact when multiplied across thousands of appointments.',
    ],
    facts: (
      <>
        <p><strong>Dietz.Asia:</strong> Founded 2020 by Phongchai Petsanghan in Thailand. Precision Dietz Co., Ltd. "Dietz" = digital health platform.</p>
        <p><strong>Founder\'s motivation:</strong> His mother suffered from chronic kidney disease. Grandparents had diabetes. He experienced the system\'s friction as a caregiver and decided to fix it.</p>
        <p><strong>Strategic choice: B2B, not B2C:</strong> 90% of Thais rely on public hospitals. A B2C app cannot access medical records, coordinate with doctors, or process insurance claims. Dietz.Asia integrates with the existing system instead of trying to bypass it.</p>
        <p><strong>Platform features:</strong> Remote patient monitoring (blood glucose, blood pressure), video consultations, e-prescriptions, online payment (integrated with universal healthcare), medication delivery tracking, multi-disciplinary care teams.</p>
        <p><strong>Key metric — patient self-assessment:</strong> Patients fill out health questionnaires at home before appointments. Saves nurses 15 minutes per patient. This "small" time saving, multiplied across thousands of appointments, fundamentally changes hospital capacity.</p>
        <p><strong>Process innovation over product innovation:</strong> Dietz.Asia\'s core differentiator is not better technology — it is better workflow design. Every feature is evaluated by one question: "Does this make the doctor\'s or nurse\'s job easier?"</p>
      </>
    ),
    lesson: (
      <>
        <p>The B2B vs. B2C decision is one of the most important strategic choices any startup founder makes. Most health-tech startups in Thailand went B2C — building apps that let patients book doctors directly, like "Uber for healthcare." Dietz.Asia went the opposite direction. The reasoning: 90% of the market is inaccessible through a B2C app because those patients are already inside the public hospital system, and an app that operates outside that system cannot help them.</p>
        <p>This is a powerful lesson about "where to compete." Dietz.Asia chose a harder path (selling to hospitals) over an easier one (selling to consumers) because the harder path gave them access to the real bottleneck: the hospital workflow. Consumers could adopt their app overnight, but it would not change the fact that the hospital system was overwhelmed. By selling to hospitals, Dietz.Asia could redesign the actual care process — and that is where the real impact lives.</p>
      </>
    ),
    lessonTitle: 'The Harder Path Is Often the Only Path That Works',
    tip: 'Ask your child: "If you wanted to make school lunches better, would you sell lunchboxes to students (B2C) or would you convince the school to change their lunch program (B2B)?" Selling lunchboxes is easier, but changing the lunch program affects everyone. Dietz.Asia chose the harder path — convincing hospitals to change their workflow — because that is what actually fixes the problem. This teaches kids that the most impactful solutions are often the hardest to sell, because you have to convince institutions to change, not just individuals.',
  },
  {
    number: 3,
    tag: 'The Strategy',
    tagColor: 'bg-indigo-100 text-indigo-700',
    title: 'One Hospital\'s Results That Changed Thailand\'s Healthcare: 75% Less Work, 98% Satisfaction, Better Health',
    teaser:
      'At Buddhasothorn Hospital, high-risk pregnant women with diabetes went from 4 in-person visits per month to 1. Staff workload dropped 75%. Each patient saved $280/year in travel costs. Blood sugar control improved. Dietz.Asia scaled this blueprint to 200+ hospitals.',
    image: '/images/comics/remote-monitor/strip-3.jpg',
    imageAlt:
      'A manga-style panel showing the Dietz.Asia system in action: a pregnant woman checks her blood sugar at home, the data goes to the hospital, the doctor reviews it on a dashboard, and a message comes back "Everything looks good — see you next month." Luna realizes how much time and stress this saves.',
    story: [
      'The case study that made Dietz.Asia famous came from Buddhasothorn Hospital in Chachoengsao province. The hospital was struggling with a specific patient population: pregnant women with type 1 diabetes or gestational diabetes mellitus (GDM). These high-risk pregnancies require intensive monitoring — the standard protocol was weekly in-person visits (4 per month). For women in rural areas, that meant four days of travel, waiting, and expense every single month of their pregnancy.',
      'Dietz.Asia redesigned the workflow. Instead of 4 in-person visits per month, patients came to the hospital once per month and did the other three visits remotely — measuring their blood sugar at home, uploading the data through the platform, and having a video consultation with their doctor. The results were extraordinary and created an extremely rare "win-win-win" for every stakeholder.',
      'For hospital staff: the workload for managing these patients dropped by 75%. Nurses no longer spent hours checking in patients, taking vitals, and entering data manually. Doctors could review lab results and patient-reported data before the video call, making the actual consultation more efficient. For the hospital administration: each patient saved the hospital 41,580 Thai Baht ($1,150 USD) per year in medical service costs — because remote monitoring caught problems earlier and prevented expensive emergency admissions.',
      'For patients: each woman saved 10,200 Thai Baht ($280 USD) per year in travel costs and lost wages. Plus, they got to spend those days at home with their families instead of on a bus to the hospital. Patient satisfaction was 98%. And most importantly: clinical outcomes improved. The study showed that patients using the Dietz.Asia platform had better blood glucose control than those attending all visits in person. The remote monitoring actually produced better medicine, not just cheaper medicine.',
      'Dietz.Asia now serves 200+ hospitals and clinics, processing over 2 million medical transactions. They have expanded from diabetes to HIV care, kidney dialysis, thyroid disease, obesity management, and stroke rehabilitation. The founder, Phongchai Petsanghan, is now chairman of the Thai Health Tech Trade Association — a clear sign that he has gone from entrepreneur to architect of Thailand\'s healthcare future.',
    ],
    facts: (
      <>
        <p><strong>Buddhasothorn Hospital case study:</strong> High-risk pregnant women with diabetes. Changed from 4 in-person visits/month to 1 in-person + 3 remote. Results: clinical improvement, cost reduction, massive satisfaction.</p>
        <p><strong>Staff workload: ↓ 75%</strong> — nurses and doctors spent a fraction of the time managing these patients. The workflow redesign saved hours per patient per month.</p>
        <p><strong>Hospital savings: 41,580 THB/year/patient</strong> (~$1,150) — fewer ER visits, fewer complications, lower overhead. The system saved money while improving outcomes.</p>
        <p><strong>Patient savings: 10,200 THB/year/patient</strong> (~$280) — travel costs, food, time off work. Plus: no more waking up at 4 AM to catch a bus to the hospital.</p>
        <p><strong>Patient satisfaction: 98%</strong> — an extraordinary score for any healthcare intervention. Patients preferred remote monitoring overwhelmingly.</p>
        <p><strong>Clinical outcomes: improved</strong> — average blood glucose levels dropped. Remote monitoring produced better diabetes control than in-person visits. More data, better decisions.</p>
        <p><strong>Scale today:</strong> 200+ hospitals and clinics, 2M+ medical transactions processed. Expanded to HIV care, kidney dialysis, thyroid, obesity, stroke rehab.</p>
      </>
    ),
    lesson: (
      <>
        <p>The Buddhasothorn case study is a masterclass in what makes a business case irrefutable. Dietz.Asia did not ask hospitals to adopt their platform based on "innovation" or "doing good" — they presented hard numbers: 75% less work for staff, $1,150 savings per patient per year for the hospital, $280 savings per patient per year for the patient, 98% satisfaction, and improved clinical outcomes. Every single stakeholder won. There was no trade-off. When you can show that kind of data, selling becomes easy.</p>
        <p>This is a crucial lesson for kids: the most powerful argument for any idea is not "this is cool" or "this is the future" — it is "this makes everyone\'s life better, and here are the numbers to prove it." Dietz.Asia\'s success was built on measurement. They did not guess that their platform saved time — they measured exactly how much time. They did not assume patients were happier — they surveyed them and got 98%. Measure everything, and let the data speak.</p>
      </>
    ),
    lessonTitle: 'Make the Case Irrefutable: Show Everyone Exactly What They Win',
    tip: 'Ask your child: "If you invented a homework machine that did your assignments for you, who would you need to convince to use it?" Your parents (worried about learning) and your teacher (worried about cheating) would both say no. But what if your homework machine also taught you the material better AND gave the teacher detailed reports on what you learned? That is what Dietz.Asia did — they made sure every stakeholder (patient, doctor, hospital administrator) got something they wanted. The best solutions create value for everyone, not just one group.',
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

function AboutDietz() {
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
            <span className="text-sky-600 text-sm font-bold">DA</span>
          </div>
          <div>
            <p className="font-bold text-slate-800">About Dietz.Asia</p>
            <p className="text-xs text-slate-400 mt-0.5">B2B telemedicine platform for Thailand\'s public hospital system</p>
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
                  <p className="font-semibold text-slate-800 mb-1">What Dietz.Asia Does</p>
                  <p>Dietz.Asia provides a B2B telemedicine platform that integrates with Thailand\'s public hospital information systems. It enables remote patient monitoring, video consultations, e-prescriptions, and online payment for chronic disease patients — all within the existing public healthcare framework.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">The Innovation: Process, Not Product</p>
                  <p>Dietz.Asia\'s core insight is that technology alone does not fix healthcare — you need to redesign the workflow. Every feature is evaluated by whether it reduces the workload of hospital staff. The platform transforms care from "patient travels to data" to "data travels to doctor."</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">The Business Model</p>
                  <p>B2B SaaS sold to public hospitals. The platform integrates with Thailand\'s universal healthcare coverage (NHSO "30 Baht" scheme), so hospitals can bill for remote consultations through existing payment channels. This makes the platform financially sustainable for cash-strapped public hospitals.</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-slate-800 mb-1">The Founder</p>
                  <p>Phongchai Petsanghan — started Dietz.Asia after caring for his mother (chronic kidney disease) and grandparents (diabetes). He experienced the friction of Thailand\'s public healthcare system as a caregiver and decided to fix the process, not just build an app. Now chairman of the Thai Health Tech Trade Association.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">Why It Matters for Kids</p>
                  <p>Dietz.Asia is the final episode of this 25-story series, and it teaches one of the most important lessons: the best solutions come from empathy. Phongchai did not study the healthcare market through reports and spreadsheets — he lived it as a caregiver for his own mother. He felt the pain of the 4 AM wake-up, the 200km drive, the 4-hour wait, the 5-minute consultation. That personal experience gave him a clarity that no market research could provide. The company\'s name is built on "empathy" — not as a marketing slogan, but as a strategic framework. Every product decision started with the question: "Does this make life easier for the patient AND the doctor?" If the answer was no for either, they went back to the drawing board.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">Learn More</p>
                  <p>
                    <a href="https://dietz.asia" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 font-medium">
                      dietz.asia
                    </a>
                    {' '}— official website with case studies and platform information.
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

export default function WayneComicRemoteMonitor() {
  const totalStrips = strips.length;
  return (
    <>
      <SEOHead
        title="Startup Stories #25: Dietz.Asia — Remote Chronic Disease Management for Thailand's Aging Population | Wayne's Comics"
        description="A parent-child comic series about real startups. Episode 25: Dietz.Asia — a B2B telemedicine platform that integrates with Thailand's public hospitals to enable remote monitoring for diabetes, hypertension, and other chronic diseases. 75% less staff workload, 98% patient satisfaction."
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
          <img src="/images/comics/remote-monitor/cover.jpg" alt="Startup Stories #25: Dietz.Asia — remote chronic disease management for Thailand's aging population" className="w-full h-auto" />
        </div>
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-bold rounded-full uppercase tracking-wide">
            Startup Stories · Episode 25 of 25
          </span>
          <span className="text-xs text-slate-400">June 2026 · {totalStrips} strips · 🇹🇭 Thailand</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3 leading-tight">
          Grandma Travels 200km for a 5-Minute Checkup — and That Is the Best Option
        </h1>
        <p className="text-slate-500 leading-relaxed mb-5 max-w-2xl">
          Thailand\'s public hospitals are drowning. An aging population and exploding chronic 
          disease rates mean patients travel hours for brief follow-ups. Dietz.Asia built a 
          B2B telemedicine platform that plugs into hospital systems — not to replace doctors, 
          but to redesign the workflow so data travels instead of patients. Episode 25 of 25.
        </p>
        <ShareBar
          title="Startup Stories #25: Dietz.Asia — Remote Patient Monitoring"
          summary="A 3-strip parent-child comic about Dietz.Asia — a Thai B2B telemedicine platform that redesigns hospital workflows for chronic disease management. The final episode of the 25-story series."
        />
      </motion.div>

      <div className="space-y-6 mb-10">
        {strips.map((strip, i) => (
          <motion.div key={strip.number} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.1 + i * 0.07 }}>
            <StripCard strip={strip} total={totalStrips} />
          </motion.div>
        ))}
      </div>

      <AboutDietz />

      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.4 }}
        className="flex items-center justify-between py-6 border-t border-slate-200 mb-10"
      >
        <Link to="/wayne/comics" className="text-sm text-slate-400 hover:text-slate-700 transition-colors">
          ← All Comics
        </Link>
        <ShareBar title="Startup Stories #25: Dietz.Asia" summary="A parent-child comic about remote chronic disease management in Thailand\'s public hospital system." />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.45 }}
        className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl px-8 py-12 text-center text-white"
      >
        <h2 className="text-2xl font-bold mb-3">🎉 25 Startup Stories — Complete!</h2>
        <p className="text-indigo-100 text-sm mb-6 max-w-lg mx-auto leading-relaxed">
          From vacuum glass to smartphone microscopes, from solar water ATMs to AI that listens to forests — 
          25 real companies, 25 real problems, 25 real solutions. Each one taught us something about how 
          entrepreneurs see the world differently. The series may be finished, but the learning never stops.
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
