import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Lightbulb, BookOpen, Sparkles } from 'lucide-react';
import { SEOHead } from '../../components/SEOHead';
import { ShareBar } from '../../components/ShareBar';

// ── Sub-components ────────────────────────────────────────────────────

function RealProblemBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-amber-50/80 border-l-4 border-amber-400 rounded-r-2xl p-5">
      <p className="text-xs font-bold text-amber-700 uppercase tracking-wide mb-3 flex items-center gap-1">
        🌍 The Real-World Problem
      </p>
      <div className="text-sm text-slate-700 leading-relaxed space-y-2">{children}</div>
    </div>
  );
}

function MeetCompanyBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-indigo-50/80 border-l-4 border-indigo-400 rounded-r-2xl p-5">
      <p className="text-xs font-bold text-indigo-700 uppercase tracking-wide mb-3 flex items-center gap-1">
        <Sparkles className="w-3 h-3" /> Meet the Startup
      </p>
      <div className="text-sm text-slate-700 leading-relaxed space-y-2">{children}</div>
    </div>
  );
}

function ThinkAboutItBox({ questions }: { questions: string[] }) {
  return (
    <div className="bg-rose-50/80 border border-rose-200 rounded-2xl p-5">
      <p className="text-xs font-bold text-rose-700 uppercase tracking-wide mb-3 flex items-center gap-1">
        <Lightbulb className="w-3 h-3" /> Think About It 💭
      </p>
      <ul className="space-y-2">
        {questions.map((q, i) => (
          <li key={i} className="flex gap-2 text-sm text-slate-700">
            <span className="text-rose-400 font-bold flex-shrink-0">{i + 1}.</span>
            <span>{q}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ── Strip card ────────────────────────────────────────────────────────

interface Strip {
  number: number;
  tag: string;
  tagColor: string;
  title: string;
  teaser: string;
  image: string;
  imageAlt: string;
  realProblem: React.ReactNode;
  meetCompany: React.ReactNode;
  thinkAboutIt: string[];
}

function StripCard({ strip }: { strip: Strip }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm"
    >
      {/* Strip header */}
      <div className="px-6 pt-6 pb-4 flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold text-slate-400">#{strip.number}</span>
            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${strip.tagColor}`}>
              {strip.tag}
            </span>
          </div>
          <h3 className="font-bold text-lg text-slate-900 leading-snug">{strip.title}</h3>
          <p className="text-sm text-slate-500 mt-1 leading-relaxed">{strip.teaser}</p>
        </div>
      </div>

      {/* Comic image */}
      <div className="mx-6 mb-4 rounded-2xl overflow-hidden border border-slate-100 bg-slate-50">
        <img
          src={strip.image}
          alt={strip.imageAlt}
          className="w-full h-auto object-cover"
          loading="lazy"
        />
      </div>

      {/* Expand button */}
      <div className="px-6 pb-4">
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:border-indigo-300 hover:text-indigo-600 transition-colors"
        >
          <BookOpen className="w-4 h-4" />
          {expanded ? 'Hide Details' : 'Learn More About the Real Story →'}
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pt-4 space-y-4">
                <RealProblemBox>{strip.realProblem}</RealProblemBox>
                <MeetCompanyBox>{strip.meetCompany}</MeetCompanyBox>
                <ThinkAboutItBox questions={strip.thinkAboutIt} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ── Story data ────────────────────────────────────────────────────────

const strips: Strip[] = [
  {
    number: 1,
    tag: 'The Hidden Crisis',
    tagColor: 'bg-red-100 text-red-700',
    title: '1. Too Busy to Look Up',
    teaser:
      'Luna notices something strange at her doctor\'s appointment — the doctor barely looks up the whole time. Eyes glued to the screen, fingers typing away. But isn\'t the doctor supposed to be looking at her?',
    image: '/images/comics/abridge/strip-1.jpg',
    imageAlt:
      'Luna and Wayne sit in a doctor\'s office while the doctor stares at a computer screen typing notes instead of looking at Luna.',
    realProblem: (
      <>
        <p>For every <strong>8 hours a doctor spends with patients</strong>, they spend <strong>5.5 hours on paperwork</strong>. That means doctors are typing almost as much as they are doctoring!</p>
        <p>This is called <strong>"pajama time"</strong> — because doctors finish writing their notes at home in their pajamas, long after the last patient has left. Some doctors are awake until midnight just filling out forms.</p>
        <p><strong>2 out of 5 doctors</strong> say they are thinking about quitting medicine. Not because they don't love helping people — but because they are drowning in typing and paperwork. Imagine becoming a doctor to help sick kids, and spending half your day staring at a screen instead.</p>
      </>
    ),
    meetCompany: (
      <>
        <p><strong>Abridge AI</strong> was founded in 2018 by <strong>Dr. Shiv Rao</strong>, a heart doctor at UPMC hospital in Pittsburgh, Pennsylvania. He watched his own patients struggle — they were so worried about forgetting what was said that they couldn't fully listen during appointments.</p>
        <p>Abridge listens to the conversation between the doctor and patient, and then <strong>automatically writes the medical notes</strong>. The doctor doesn't have to type anything during the visit. They can just focus on the patient in front of them.</p>
        <p>Today, Abridge works with <strong>55+ different types of doctors</strong> and understands <strong>28+ languages</strong>, including Spanish, Mandarin, Hindi, and more.</p>
      </>
    ),
    thinkAboutIt: [
      'When you go to the doctor and they are looking at the computer instead of at you, how does that make you feel? Do you think the doctor wants to do that?',
      'If a doctor could spend 5.5 fewer hours typing every week, what could they do with that extra time instead?',
      'Why do you think doctors have to write down everything that happens during an appointment? Who reads those notes later?',
    ],
  },
  {
    number: 2,
    tag: 'The Spark',
    tagColor: 'bg-amber-100 text-amber-700',
    title: '2. The Lady Who Brought Her Husband',
    teaser:
      'One day, Dr. Rao met a patient who always brought her husband along to every appointment — not because she was scared, but because he took notes so she could actually listen. Then one day, her husband couldn\'t come. And everything changed.',
    image: '/images/comics/abridge/strip-2.jpg',
    imageAlt:
      'An AI helper sits quietly in the background while a doctor and patient have a real, connected conversation — no typing, just talking.',
    realProblem: (
      <>
        <p>When you know no one is writing things down, it\'s very hard to truly <strong>listen</strong>. You spend half your brain trying to memorize what\'s being said instead of understanding it.</p>
        <p>Research shows that patients <strong>forget up to 80% of what their doctor tells them</strong> right after leaving the office. If you\'re worried about remembering, you can\'t be fully present in the conversation.</p>
        <p>Good medical care isn\'t just about medicine — it\'s about <strong>trust and connection</strong>. But if a doctor is staring at a screen, that connection breaks. Patients feel less cared for, and they\'re less likely to share important details about how they really feel.</p>
      </>
    ),
    meetCompany: (
      <>
        <p>The patient was an English professor. She was very good at listening and understanding — it was her whole job. But at doctor\'s appointments, she always brought her husband to take notes so she could truly pay attention.</p>
        <p>One day her husband couldn\'t come. She sat in the appointment feeling lost — trying to listen AND remember at the same time, and failing at both.</p>
        <p>When Dr. Rao heard her story, something clicked. The problem wasn\'t just about saving doctors time — it was about <strong>giving every patient their own "person who takes notes."</strong> He built Abridge so the doctor and patient could just... <em>talk</em>. Like real human beings.</p>
      </>
    ),
    thinkAboutIt: [
      'Have you ever tried to listen carefully AND remember everything at the same time? What happened? Was it easier to do both at once, or just one?',
      'The professor brought her husband to take notes so she could be fully present. Can you think of other situations in life where having a note-taker would help someone pay better attention?',
      'Dr. Rao said the real problem was "human connection." What do you think he meant by that? Why does it matter if a doctor looks at you when they talk?',
    ],
  },
  {
    number: 3,
    tag: 'How It Works',
    tagColor: 'bg-indigo-100 text-indigo-700',
    title: '3. The AI That Takes Notes',
    teaser:
      'Abridge sits quietly in the background during a doctor\'s visit, listening to everything. Then it turns the whole conversation into a structured medical note — automatically. No typing required. But how do doctors know the AI got it right?',
    image: '/images/comics/abridge/strip-3.jpg',
    imageAlt:
      'An AI system listens to a doctor-patient conversation and automatically generates a clean medical note in real time, while the doctor stays focused on the patient.',
    realProblem: (
      <>
        <p>After big hospitals like <strong>Johns Hopkins</strong>, <strong>Mayo Clinic</strong>, and <strong>Kaiser Permanente</strong> started using Abridge, the results were remarkable:</p>
        <p>Doctors reported <strong>78% less mental exhaustion</strong> after their workday. And <strong>86% of doctors stopped taking work home</strong> — no more pajama time!</p>
        <p>One doctor said something that stuck with everyone: <em>"If Abridge hadn't existed, I would have quit medicine."</em> When AI saves the doctor, it also saves all the patients that doctor would have treated for the rest of their career.</p>
      </>
    ),
    meetCompany: (
      <>
        <p>Abridge doesn\'t just write down every word — it <strong>understands medical meaning</strong>. It knows the difference between a patient complaining about a pain and a doctor making a diagnosis. It organizes everything into the right sections automatically.</p>
        <p>But the most clever feature is called <strong>"Linked Evidence."</strong> If a doctor looks at the AI\'s note and wonders "did I really say that?", they can click on any sentence — and it takes them to the <em>exact moment</em> in the audio recording where it was said. The AI shows its work.</p>
        <p>This means doctors can <strong>trust the notes</strong> because they can always verify them. It\'s not "just trust me, I\'m an AI" — it\'s "here\'s the proof."</p>
      </>
    ),
    thinkAboutIt: [
      'The "Linked Evidence" feature lets doctors hear the exact moment in the recording that matches each sentence in the note. Why is that important? Would you trust AI more or less if it could show you exactly where it got its answer?',
      'Abridge works in 28 different languages. Why is it especially important for a medical AI to work in many languages?',
      'If an AI made a mistake in a medical note, what could go wrong? How does "Linked Evidence" help prevent problems?',
    ],
  },
  {
    number: 4,
    tag: 'The Bigger Lesson',
    tagColor: 'bg-emerald-100 text-emerald-700',
    title: '4. When AI Gives Time Back',
    teaser:
      'Wayne and Luna sit on the porch after the doctor\'s visit. Luna asks: "Dad, if AI can do the boring parts, what should humans do?" Wayne smiles. That, he says, is exactly the right question.',
    image: '/images/comics/abridge/strip-4.jpg',
    imageAlt:
      'Luna and Wayne sit together discussing AI, with thought bubbles showing doctors finally having time to look their patients in the eye and be fully present.',
    realProblem: (
      <>
        <p>America is running out of doctors. By <strong>2036</strong>, the United States will be short <strong>86,000 physicians</strong>. There are not enough people going to medical school to replace the ones retiring.</p>
        <p>But here\'s a different way to think about it: if AI can save each doctor <strong>3 hours of paperwork every day</strong>, that\'s like adding thousands of new doctors to the system — without training a single new person. The doctors we already have become more available.</p>
        <p>The best use of AI isn\'t to replace humans. It\'s to <strong>remove the things that prevent humans from doing what only humans can do</strong> — like truly listening to a scared patient.</p>
      </>
    ),
    meetCompany: (
      <>
        <p>Abridge has raised over <strong>$150 million</strong> from investors, including <strong>NVIDIA</strong> — the company that makes the special computer chips that power most AI systems in the world. NVIDIA investing in Abridge is a big deal. It means they believe medical AI is one of the most important places for their technology.</p>
        <p>Abridge\'s goal is bigger than just doctor\'s notes. They want to make every clinical conversation smarter — from the emergency room to the cancer ward to the village clinic. They want to be <strong>everywhere a doctor talks to a patient</strong>.</p>
        <p>And somewhere out there, a future version of Luna might walk into a doctor\'s office and have a doctor who looks her in the eye the whole time — because an AI is quietly handling the rest.</p>
      </>
    ),
    thinkAboutIt: [
      'Wayne says the best use of AI is to "give time back to humans." Can you think of another job — not just doctors — where AI could take over the boring parts so people can focus on the human parts?',
      'Should AI be allowed to help write medical notes? What could go wrong? What safeguards would you want to have?',
      'If you were a doctor and Abridge saved you 3 hours every day, what would you do with those 3 hours?',
    ],
  },
];

// ── Page component ────────────────────────────────────────────────────

export default function LunaComicAbridge() {
  return (
    <>
      <SEOHead
        title="Startup Stories #2: The AI Doctor's Note-Taker — Luna's Comics"
        description="Luna and Wayne discover Abridge AI — a real startup that listens to doctor-patient conversations and writes the medical notes automatically, so doctors can finally look their patients in the eye."
      />

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
        {/* Back link */}
        <Link
          to="/luna"
          className="inline-flex items-center gap-2 text-sm text-pink-500 hover:text-pink-700 font-semibold transition-colors"
        >
          ← Back to Luna's World
        </Link>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          {/* Series badge */}
          <div className="flex items-center justify-center gap-2">
            <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-bold uppercase tracking-wide">
              📚 Startup Stories
            </span>
            <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-full text-xs font-semibold">
              Episode 2 of 25
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
            The AI Doctor's<br />Note-Taker
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Doctors spend more time typing than talking to patients. Luna and Wayne discover a real startup called{' '}
            <strong>Abridge</strong> that uses AI to fix this — so doctors can finally look up.
          </p>

          {/* Cover image */}
          <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-md mt-4">
            <img
              src="/images/comics/abridge/cover.jpg"
              alt="Luna and Wayne learn about Abridge AI — the startup that helps doctors stop typing and start listening"
              className="w-full h-auto"
            />
          </div>

          {/* Meta row */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-slate-500 pt-2">
            <span>📅 June 2026</span>
            <span>·</span>
            <span>4 comic strips</span>
            <span>·</span>
            <span>🏥 Based on a real American startup</span>
          </div>

          <ShareBar
            title="Startup Stories #2: The AI Doctor's Note-Taker"
            summary="Luna and Wayne discover Abridge AI — a startup that listens to doctor-patient conversations and writes the notes automatically, so doctors can focus on their patients."
          />
        </motion.header>

        {/* Introduction box */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-gradient-to-br from-pink-50 to-purple-50 border border-pink-200 rounded-3xl p-6 space-y-3"
        >
          <p className="text-xs font-bold text-pink-600 uppercase tracking-wide flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> About This Series
          </p>
          <p className="text-sm text-slate-700 leading-relaxed">
            <strong>Startup Stories</strong> is a comic series based on 25 real businesses discovered by AI researchers at Tencent Research Institute. These are not famous billion-dollar companies — they're small, scrappy startups solving <em>real problems</em> in the real world. Every story starts with a problem a real person noticed, and a solution that made lives better.
          </p>
          <p className="text-sm text-slate-700 leading-relaxed">
            Each comic strip has a <strong>"Learn More" button</strong> below it — tap it to go deeper into the real story, discover the company, and think through questions that might change how you see the world. 👇
          </p>
        </motion.div>

        {/* Comic strips */}
        <div className="space-y-8">
          {strips.map(strip => (
            <StripCard key={strip.number} strip={strip} />
          ))}
        </div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center space-y-4 py-8"
        >
          <div className="text-4xl">🩺</div>
          <h2 className="text-xl font-bold text-slate-900">The End — For Now!</h2>
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            Abridge is a real company. The doctors who got their evenings back are real people. And the next time you visit a doctor, you might notice — are they looking at <em>you</em>, or at the screen?
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <Link
              to="/luna"
              className="px-5 py-2.5 rounded-xl bg-pink-100 text-pink-700 text-sm font-semibold hover:bg-pink-200 transition-colors"
            >
              ← More Comics
            </Link>
            <a
              href="https://www.abridge.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-indigo-100 text-indigo-700 text-sm font-semibold hover:bg-indigo-200 transition-colors"
            >
              Visit Abridge.com ↗
            </a>
          </div>
          <div className="pt-4">
            <ShareBar
              title="Startup Stories #2: The AI Doctor's Note-Taker"
              summary="A comic about Abridge AI — the real startup that helps doctors stop typing and start listening to their patients."
            />
          </div>
        </motion.div>
      </div>
    </>
  );
}
