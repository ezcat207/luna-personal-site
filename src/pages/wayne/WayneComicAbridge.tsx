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
    title: 'The Doctor Who Can\'t Look Up',
    teaser:
      'The physician burnout crisis is hiding in plain sight. Doctors spend nearly as much time documenting as they do caring for patients — a systemic design failure that is now a public health emergency.',
    image: '/images/comics/abridge/strip-1.jpg',
    imageAlt:
      'Luna and Wayne at a doctor\'s office where the doctor is absorbed in typing on a computer screen, barely making eye contact.',
    story: [
      'There is a term in medicine called "pajama time." It refers to the hours physicians spend completing electronic health record (EHR) documentation after returning home — often late in the evening, long after their last patient has left. It is not a quirk. It is the norm. A 2022 study published in JAMA found that for every eight hours spent in direct patient care, the average physician spends an additional 5.5 hours on administrative tasks, the majority of which is EHR documentation.',
      'This is not a personal failure of individual doctors. It is a design failure of the system they work in. The EHR systems mandated across American healthcare were built primarily to satisfy billing and regulatory requirements, not to support clinical thinking. The result is that physicians — people who spent a decade training to diagnose and heal — now spend much of their professional lives as data entry clerks.',
      'The consequences are measurable and serious. Physician burnout rates now exceed 40% across most specialties. Emergency medicine and primary care — the two most patient-facing fields — have the highest rates. When a physician burns out, the system doesn\'t just lose a worker: it loses a decade of training, institutional knowledge, and patient relationships that took years to build. The downstream effects on access to care, especially in underserved communities, are severe.',
    ],
    facts: (
      <>
        <p><strong>5.5 hours of administrative work</strong> for every 8 hours of patient care — physicians effectively have a 13.5-hour theoretical workday just to keep up.</p>
        <p><strong>40%+ of physicians</strong> report symptoms of burnout; in primary care and emergency medicine, rates approach 60%.</p>
        <p><strong>86,000 physician shortfall</strong> projected by 2036 in the United States, according to the Association of American Medical Colleges (AAMC).</p>
        <p><strong>Physicians see 20–25 patients per day</strong> on average; at 3–5 minutes of documentation per encounter, that\'s up to 2 hours of typing just for the encounters themselves — before any inbox messages, prior authorizations, or follow-up notes.</p>
        <p><strong>EHR adoption has not improved care outcomes</strong> at the population level, despite massive investment — the primary beneficiary has been billing accuracy, not patient health.</p>
      </>
    ),
    lesson: (
      <>
        <p>The paperwork crisis in medicine is a canonical example of a system that was optimized for the wrong objective. EHRs were mandated to improve billing compliance and interoperability — reasonable goals — but the implementation put the documentation burden entirely on clinicians, with no consideration for the cognitive cost.</p>
        <p>This is a design failure, not a personal one. Teaching children to distinguish between "this person failed" and "this system failed" is one of the most important analytical skills we can develop in them. When 40% of doctors are burning out, the correct response is not "doctors need more resilience training." It is: what is wrong with how we designed this system, and how do we fix it?</p>
      </>
    ),
    lessonTitle: 'What This Teaches About System Design',
    tip: 'When you take your child to a doctor who seems distracted by the computer screen, you can use it as a teaching moment rather than a source of frustration. Explain what\'s actually happening: doctors are required by law to document every encounter in detail, and most EHR systems make that process slow and cumbersome. The doctor isn\'t being rude — they\'re completing mandated paperwork while trying to also give you care. That\'s a design problem worth discussing.',
  },
  {
    number: 2,
    tag: 'The Origin',
    tagColor: 'bg-amber-100 text-amber-700',
    title: 'The Lady and Her Note-Taking Husband',
    teaser:
      'The best startups are built by founders who feel the problem in their bones. Dr. Shiv Rao\'s founding insight didn\'t come from a market analysis. It came from a patient story that he couldn\'t stop thinking about.',
    image: '/images/comics/abridge/strip-2.jpg',
    imageAlt:
      'A doctor and patient having a genuine, fully present conversation while an AI quietly handles the documentation in the background.',
    story: [
      'Among the patients Dr. Shiv Rao saw regularly at UPMC in Pittsburgh was an English professor — a woman whose entire professional life was built around careful listening and precise language. She came to every appointment with her husband. Not because the medical news was difficult, not because she needed emotional support — but because she needed him to take notes. Without a note-taker, she found she couldn\'t fully listen. The moment she knew she\'d have to remember everything herself, part of her brain was already in recall mode, and the conversation suffered.',
      'The day her husband couldn\'t come, the appointment was noticeably different. She was distracted, anxious, less engaged. Dr. Rao noticed. When she explained why, he recognized something he\'d sensed in other patients but never fully articulated: the quality of a medical conversation is directly affected by whether either party is burdened with remembering it.',
      'This is the insight at the heart of Abridge. It wasn\'t a grand technological vision. It was a recognition that a specific, human problem — the inability to be fully present when you\'re also trying to memorize — had a clear solution. If the documentation burden could be lifted from both sides of the conversation, something important would be restored: the therapeutic relationship between doctor and patient, which research consistently shows has direct impact on health outcomes.',
    ],
    facts: (
      <>
        <p><strong>Patients forget 40–80% of medical information immediately</strong> after leaving a clinical encounter, according to studies in the Journal of General Internal Medicine.</p>
        <p><strong>The therapeutic alliance</strong> — the quality of the doctor-patient relationship — is one of the strongest independent predictors of patient adherence to treatment and recovery outcomes.</p>
        <p><strong>Eye contact frequency correlates with patient trust:</strong> studies show patients rate their doctor as more competent and caring when they maintain eye contact at least 60% of the time — something nearly impossible when typing notes simultaneously.</p>
        <p><strong>Note-taking proxies are common but invisible:</strong> family members, friends, or advocates accompany millions of patients specifically to handle the documentation burden — a workaround that is unavailable to those without support networks.</p>
      </>
    ),
    lesson: (
      <>
        <p>The rarest startup founders are those who solve problems they viscerally understand — not through empathy alone, but through direct, personal encounter with the friction. Dr. Rao\'s insight wasn\'t "the EHR market is inefficient." It was "this woman cannot be present in her own medical care because someone has to take notes." The product followed from the human observation, not from the market opportunity.</p>
        <p>This is worth teaching children explicitly: the best innovations often start with someone asking "why does this have to be this way?" about something most people have accepted as normal. The English professor had learned to work around the problem. Dr. Rao looked at the workaround and asked why the problem existed at all.</p>
      </>
    ),
    lessonTitle: 'Startups Born from Empathy',
    tip: 'The practice of having a "note-taker" so someone else can be fully present applies far beyond medicine. Think about parent-teacher conferences, IEP meetings, difficult family conversations, even parent-child check-ins. When you\'re taking notes, you\'re partially absent from the conversation. Next time you have an important talk with your child, try this: put down the phone, don\'t take notes, just be there. Then write down what you remember afterward. Notice what presence feels like — and what it produces.',
  },
  {
    number: 3,
    tag: 'The Technology',
    tagColor: 'bg-indigo-100 text-indigo-700',
    title: 'Ambient AI and the Linked Evidence Feature',
    teaser:
      'Abridge is often called "ambient AI" — it listens without interrupting. But the technology decision that most defines Abridge isn\'t what it produces. It\'s how it lets you verify what it produced.',
    image: '/images/comics/abridge/strip-3.jpg',
    imageAlt:
      'An AI system processes a doctor-patient conversation and generates a structured medical note with clickable evidence links back to the original recording.',
    story: [
      'The term "ambient AI" refers to AI that operates in the background without requiring active user input. In medicine, this means a microphone-equipped device in the exam room (or an app on a physician\'s phone) that captures the clinical conversation as it happens. Abridge\'s system ingests that audio, applies a contextual reasoning engine trained on millions of medical encounters, and produces a structured SOAP note — the standard format for clinical documentation — in near real time.',
      'What distinguishes Abridge from simple transcription is its medical understanding. The system knows the difference between a patient\'s subjective complaint ("my chest feels tight when I walk upstairs") and a clinical assessment ("exertional angina, likely stable"). It knows which information belongs in the History of Present Illness versus the Review of Systems. It knows when a medication name is spoken versus a diagnosis name. This contextual intelligence is what makes the output clinically useful rather than just a word-for-word transcript.',
      'But the feature that has arguably done the most to drive adoption among skeptical physicians is Linked Evidence. Every sentence in an Abridge-generated note is hyperlinked to the precise timestamp in the original recording where that statement was made. If a physician looks at the AI-generated note and has any doubt — did the patient say that? did I actually say that? — they can click on the sentence and hear it, in context, in seconds. This design decision transforms the AI from a black box into an auditable assistant. Trust is not assumed; it is earned through transparency.',
    ],
    facts: (
      <>
        <p><strong>78% reduction in cognitive load</strong> reported by physicians using Abridge across health system deployments — measured via validated burnout and workload scales.</p>
        <p><strong>86% of Abridge users reduced after-hours charting</strong> within the first month of adoption — the single most cited quality-of-life improvement among surveyed physicians.</p>
        <p><strong>55+ medical specialties</strong> supported, from cardiology and oncology to behavioral health and pediatrics — each requiring different documentation schemas and clinical vocabulary.</p>
        <p><strong>28+ languages</strong> supported, with full note generation capability — critical for health systems serving non-English-speaking patient populations.</p>
        <p><strong>Deployed at Johns Hopkins, Mayo Clinic, Kaiser Permanente, Corewell Health, and UVMHN</strong>, among others — representing tens of millions of covered patients.</p>
      </>
    ),
    lesson: (
      <>
        <p>The Linked Evidence feature is a masterclass in trust as a product feature. Abridge could have shipped without it — the notes would have been just as accurate. But without auditability, physicians would have had to either trust the AI implicitly (which most would not do in a clinical setting) or verify everything manually (which defeats the purpose). Linked Evidence solved the trust problem by making verification effortless rather than impossible.</p>
        <p>The design principle here is generalizable: when you want someone to rely on a system they didn\'t build, the most effective approach is not to tell them it\'s reliable. It\'s to make it easy for them to check. This is worth teaching children explicitly — about AI tools, about sources, about any system they didn\'t design themselves. The question to ask is not "is this trustworthy?" but "how would I know if it were wrong?"</p>
      </>
    ),
    lessonTitle: 'Trust as a Product Feature',
    tip: 'Teach your children that good AI tools show their work. When your child uses an AI tool for homework, school research, or creative projects, make "how would I verify this?" the standard question — not as a gotcha, but as a habit. Any AI output that can\'t be traced back to a source, a reason, or an auditable process should be used cautiously. The Linked Evidence model is the right design pattern: every claim should have a citation.',
  },
  {
    number: 4,
    tag: 'The Opportunity',
    tagColor: 'bg-emerald-100 text-emerald-700',
    title: 'When AI Solves a People Problem',
    teaser:
      'Abridge raised over $150 million, landed NVIDIA as a strategic investor, and integrated directly into Epic — the EHR system used by 38% of US hospitals. This is no longer a startup story. It\'s a platform story.',
    image: '/images/comics/abridge/strip-4.jpg',
    imageAlt:
      'Wayne and Luna discuss what it means when AI handles the tedious parts so humans can focus on what matters most — the human connection.',
    story: [
      'Abridge\'s business model is B2B enterprise SaaS: health systems pay per physician per month, with pricing structured around deployment size. The distribution strategy is integration-first — Abridge is embedded directly into Epic, the dominant EHR platform in the United States (used by 38% of hospitals). This means Abridge doesn\'t require physicians to switch workflows or open a new application. The AI appears inside the tool they already use, which dramatically reduces adoption friction.',
      'The NVIDIA partnership, announced in 2024, is strategically significant for more than the capital. NVIDIA is developing specialized AI inference chips optimized for healthcare workloads — lower latency, better performance on long-form audio, HIPAA-compliant edge computing options. Abridge being an early partner in that infrastructure layer means they are building with the hardware that will define the next five years of clinical AI. This is not a feature partnership; it is a bet on becoming foundational infrastructure.',
      'The long-term vision is larger than documentation. Clinical conversations contain a density of medically relevant information that is currently almost entirely lost — nuances of a patient\'s affect, the specific words they use to describe pain, the questions they asked that the physician couldn\'t fully answer. A system that captures, understands, and structures every clinical conversation becomes the memory layer for medicine. Notes are just the entry point.',
    ],
    facts: (
      <>
        <p><strong>$150M+ raised</strong> from investors including NVIDIA, Union Square Ventures, and Bessemer Venture Partners, reflecting high confidence in both the team and the market.</p>
        <p><strong>Epic integration</strong> gives Abridge access to the 38% of US hospitals on Epic — a distribution moat that would take years and enormous capital to replicate independently.</p>
        <p><strong>The global EHR market is $30B+</strong> and growing; the ambient AI in healthcare segment is projected to exceed $4B by 2030, growing at 22% CAGR.</p>
        <p><strong>If AI saves each physician 3 hours per day</strong>, across 900,000 active US physicians, that is equivalent to adding 337,000 full-time physician equivalents to the system — without training a single new doctor.</p>
        <p><strong>Physician time costs approximately $300/hour</strong> in fully-loaded compensation and overhead; a 3-hour daily saving represents $225,000/year per physician in recovered capacity.</p>
      </>
    ),
    lesson: (
      <>
        <p>Abridge started with a product (ambient note-taking) but is building toward a platform (the intelligence layer for all clinical conversation). The distinction matters: a product solves one problem for one user. A platform becomes the substrate through which an entire category of problems gets addressed. Epic integration is not a feature — it is a distribution moat. NVIDIA partnership is not a vendor relationship — it is infrastructure positioning.</p>
        <p>Teaching platform versus product thinking to children means helping them see beyond the obvious use case. Ask not "what does this do?" but "what would need to be true for this to become the way everyone does something?" That question is how you identify the companies that go from useful to essential.</p>
      </>
    ),
    lessonTitle: 'Platform vs. Product Thinking',
    tip: 'When discussing AI career opportunities with your children, the most important reframe is this: the jobs are in applying AI to specific domains, not in AI itself. Abridge is not a company of AI researchers — it is a company of people who deeply understand clinical medicine, who found the right AI tools to solve a specific medical problem. The same pattern holds in law, education, logistics, agriculture, and every other field. Encourage your children to find the domain they care about most, then ask: what are the things in that domain that shouldn\'t require human attention? That question is where the next generation of useful companies will come from.',
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

              <FactBox title={`${strip.tag} — Key Numbers`}>{strip.facts}</FactBox>
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

export default function WayneComicAbridge() {
  return (
    <>
      <SEOHead
        title="Startup Stories #2: Abridge — The AI Doctor's Note-Taker | Wayne's Comics"
        description="A parent-child comic series about real startups. Episode 2: Abridge AI — how a cardiologist's patient story led to an AI that listens to doctor-patient conversations and writes the notes automatically."
        ogImage="/images/comics/abridge/cover.jpg"
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
            src="/images/comics/abridge/cover.jpg"
            alt="Startup Stories #2: Abridge AI — The AI Doctor's Note-Taker"
            className="w-full h-auto"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-bold rounded-full uppercase tracking-wide">
            Startup Stories · Episode 2 of 25
          </span>
          <span className="text-xs text-slate-400">June 2026 · 4 strips</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3 leading-tight">
          The AI Doctor's Note-Taker
        </h1>
        <p className="text-slate-500 leading-relaxed mb-5 max-w-2xl">
          Abridge AI — giving doctors back the time to look their patients in the eye. A 4-strip
          comic about physician burnout, the founding story behind Abridge, and what it means when
          AI handles the paperwork so humans can focus on the human parts.
        </p>
        <ShareBar
          title="Startup Stories #2: Abridge — The AI Doctor's Note-Taker"
          summary="A 4-strip parent-child comic about Abridge AI — the real startup that listens to doctor-patient conversations and writes the medical notes, so doctors can finally look up."
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

      {/* ── About Abridge (collapsible) ── */}
      <AboutAbridge />

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
          title="Startup Stories #2: Abridge"
          summary="A parent-child comic series about real startups — Episode 2: ambient AI in medicine."
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
          This is Episode 2 of 25. Each story is about a real company solving a real problem —
          told in a way that makes sense to a child, with the depth a parent deserves.
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

// ── About Abridge (collapsible) ──────────────────────────────────────

function AboutAbridge() {
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
            <span className="text-indigo-600 text-sm font-bold">Ab</span>
          </div>
          <div>
            <p className="font-bold text-slate-800">About Abridge</p>
            <p className="text-xs text-slate-400 mt-0.5">
              How the company works, the founding story, and why it matters for healthcare
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
                  <p className="font-semibold text-slate-800 mb-1">What Abridge Does</p>
                  <p>
                    Abridge is an ambient AI platform that listens to clinical conversations between
                    doctors and patients, then automatically generates structured medical notes. The goal
                    is to eliminate the documentation burden that forces physicians to spend nearly as
                    much time typing as they do caring for patients.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">The Origin Story</p>
                  <p>
                    Founded in 2018 by Dr. Shiv Rao, a cardiologist at UPMC Pittsburgh. The founding
                    insight came from a patient — an English professor who always brought her husband to
                    appointments to take notes, so she could fully listen. Dr. Rao recognized that the
                    problem wasn't efficiency; it was human presence in medical care.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">The Technology</p>
                  <p>
                    Abridge uses a contextual reasoning engine trained on millions of medical encounters.
                    It doesn't transcribe — it understands. The "Linked Evidence" feature hyperlinks
                    every sentence in the AI-generated note to the exact timestamp in the original
                    recording, making every output fully auditable by the physician.
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-slate-800 mb-1">Market Position</p>
                  <p>
                    Integrated directly into Epic, the dominant EHR platform used by 38% of US hospitals.
                    Deployed at Johns Hopkins, Mayo Clinic, Kaiser Permanente, and others. Backed by
                    $150M+ including a strategic investment from NVIDIA, with whom they are co-developing
                    healthcare-optimized AI infrastructure.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">Why It Matters for Kids</p>
                  <p>
                    Abridge is a concrete example that AI's best use cases are not about replacing
                    humans — they're about removing the friction that prevents humans from doing what
                    only humans can do. Teaching children to ask "what should AI handle so humans can
                    focus on the human parts?" is the right frame for the next decade of AI adoption.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">Learn More</p>
                  <p>
                    <a
                      href="https://www.abridge.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-800 font-medium"
                    >
                      abridge.com
                    </a>
                    {' '}— the company's explanation of their approach, clinical outcomes, and health system partnerships.
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
