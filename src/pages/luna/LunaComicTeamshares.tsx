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
    tag: 'The Problem',
    tagColor: 'bg-orange-100 text-orange-700',
    title: '1. The Closed Shop',
    teaser: 'Luna and Wayne notice their favorite neighborhood store has a sign: "Owner Retired." But nobody told the shop what to do next…',
    image: '/images/comics/teamshares/strip-1.jpg',
    imageAlt: 'Luna and Wayne discover their neighborhood store is closed with an "Owner Retired" sign. Luna peeks inside and asks why it closed. Wayne explains the owner worked his whole life but his children moved to big cities.',
    realProblem: (
      <>
        <p>In the United States, there are about <strong>14 million small businesses</strong> — like bakeries, hardware stores, and family diners — owned by people who are over 55 years old.</p>
        <p>When these owners are ready to retire, a big problem appears: <strong>70% of small businesses cannot find anyone to take over.</strong></p>
        <p>Their kids have their own careers in big cities. Selling to a stranger might destroy the store's culture. So many shops that have served their communities for decades simply… close down. The employees lose their jobs. The neighborhood loses its store.</p>
        <p>This is called the <strong>"Silver Tsunami"</strong> — millions of businesses all reaching this same problem at the same time.</p>
      </>
    ),
    meetCompany: (
      <>
        <p><strong>Teamshares</strong> is an American startup founded in 2019 that decided to tackle this exact problem head-on.</p>
        <p>Instead of letting these businesses disappear, they buy them from retiring owners — and then slowly hand ownership to the employees who already work there.</p>
        <p>The employees get to keep their jobs <em>and</em> eventually become the new owners. Over 20 years, workers can own up to <strong>80% of the company</strong>.</p>
      </>
    ),
    thinkAboutIt: [
      'Think of a small shop or restaurant in your neighborhood. What would happen to the people who work there if the owner suddenly retired?',
      'Why do you think it\'s hard to just hand a store to an employee? What skills would they need to learn?',
      'Have you ever seen a business close down? How did it make you feel?',
    ],
  },
  {
    number: 2,
    tag: 'The Obstacle',
    tagColor: 'bg-red-100 text-red-700',
    title: '2. "Boss, We Can\'t…"',
    teaser: 'Luna has a brilliant idea: let the employees run the store! But Grandpa Tom already tried asking them, and they said "we can\'t." Why is it so hard?',
    image: '/images/comics/teamshares/strip-2.jpg',
    imageAlt: 'Luna runs to Grandpa Tom with an idea. Grandpa Tom explains he already asked employees but they said they can\'t. Luna asks why. Wayne explains running a store requires accounting, management, and the courage to make decisions.',
    realProblem: (
      <>
        <p>The employees who work in a small business often know the products and customers better than anyone. So why can't they just take over?</p>
        <p>Running a business requires skills that most workers were never taught: <strong>reading financial reports, managing budgets, ordering supplies, hiring people, and making hard decisions</strong> — even when you're scared.</p>
        <p>For many workers, the idea of becoming "the boss" feels overwhelming. They don't have the confidence because nobody ever trained them for it. And without training, even the most dedicated employee might not want to take the risk.</p>
        <p>This skill gap is one of the biggest reasons why employee ownership doesn't happen more often — even when everyone wants it to work.</p>
      </>
    ),
    meetCompany: (
      <>
        <p>Teamshares realized that <strong>the problem wasn't the employees — it was the lack of training.</strong></p>
        <p>So they built a whole <strong>education system</strong> that comes with every business they acquire. Before handing over shares, they teach employees:</p>
        <p>📊 How to read a financial report · 📦 How to manage purchasing and inventory · 📅 How to create schedules · 💡 How to think like an owner, not just an employee</p>
        <p>They call it building an <strong>"ownership culture"</strong> — where every worker understands how the business works and feels confident making decisions to improve it.</p>
      </>
    ),
    thinkAboutIt: [
      'If you were an employee at a store for 10 years, what do you think you would know really well? What might you still need to learn to run it yourself?',
      'Why is "courage" important for being a boss? Can courage be taught, or do you have to be born with it?',
      'What\'s the difference between doing a job and owning a job?',
    ],
  },
  {
    number: 3,
    tag: 'The Discovery',
    tagColor: 'bg-indigo-100 text-indigo-700',
    title: '3. Teamshares to the Rescue!',
    teaser: 'Wayne finds a company called Teamshares on his laptop. It helps employees become the new owners! Luna can\'t believe it — the cashiers and stock ladies could actually become bosses?',
    image: '/images/comics/teamshares/strip-3.jpg',
    imageAlt: 'Wayne and Luna look at a laptop showing the Teamshares website. Wayne asks if employees like cashiers and stocking ladies could become bosses. A thought bubble shows employees learning purchasing, scheduling, and accounting together. Luna gets excited that Grandpa Tom\'s store could be saved.',
    realProblem: (
      <>
        <p>The idea of <strong>employee ownership</strong> has existed for a long time, but it was always really complicated to set up. Lawyers, contracts, and complex financial arrangements made it expensive and hard.</p>
        <p>Most small business owners didn't even know it was an option. They thought their only choices were: sell to a stranger, close down, or hope a family member takes over.</p>
        <p>What was missing was a <strong>simple, repeatable system</strong> that could make employee ownership easy — for both the retiring owner and the employees.</p>
      </>
    ),
    meetCompany: (
      <>
        <p>Teamshares created a <strong>step-by-step playbook</strong> for transitioning businesses to employee ownership. Here's how it works:</p>
        <p>🤝 <strong>Step 1:</strong> They buy the business from the retiring owner at a fair price. The owner gets paid and can retire with peace of mind.</p>
        <p>📚 <strong>Step 2:</strong> They start the training program — employees learn finance, management, and ownership skills together.</p>
        <p>📈 <strong>Step 3:</strong> Employees receive shares in the company. Over time, as they keep working and learning, they earn more shares.</p>
        <p>🏆 <strong>Step 4:</strong> After 20 years, employees own <strong>80% of the company</strong>. The business belongs to the people who built it.</p>
      </>
    ),
    thinkAboutIt: [
      'If you worked at a store and found out you could slowly become an owner, how would that change how you felt about going to work every day?',
      'Why might it matter to people that the store they shop at is owned by the workers, not a big corporation?',
      'Can you think of other types of businesses where employee ownership might work really well?',
    ],
  },
  {
    number: 4,
    tag: 'The Resolution',
    tagColor: 'bg-emerald-100 text-emerald-700',
    title: '4. From Clerk to Boss — Step by Step',
    teaser: 'A few months later, Grandpa Tom\'s store has a new sign: "Employee Collaborative Management." The stocking ladies are smiling. Wayne and Luna watch as the community discovers that together, people can do what one person cannot.',
    image: '/images/comics/teamshares/strip-4.jpg',
    imageAlt: 'Wayne explains Teamshares teaches employees step by step — not dumping everything at once. A few months later the store shows employees in collaborative management. Wayne concludes what one person can\'t do, a group of people can.',
    realProblem: (
      <>
        <p>The most beautiful part of Teamshares' approach is its patience. They know that <strong>confidence is built slowly</strong>, not overnight.</p>
        <p>The training happens in three phases:</p>
        <p><strong>Phase 1 — Introduction:</strong> Employees learn what ownership even means and how their daily actions affect the business's health.</p>
        <p><strong>Phase 2 — Common language:</strong> Everyone learns to read the same financial documents. Now a cashier and a shelf-stocker can sit together and understand what's going on in the business.</p>
        <p><strong>Phase 3 — Continuous improvement:</strong> Employees use financial data to suggest and drive improvements themselves — without being told to.</p>
        <p>This isn't just good for the business. Studies show that <strong>employees who own shares in their company are happier, work harder, and stay longer</strong>.</p>
      </>
    ),
    meetCompany: (
      <>
        <p>Teamshares has already acquired <strong>over 100 small businesses</strong> across the US — plumbers, electricians, cleaners, pet groomers, and more.</p>
        <p>One real example: <strong>Maggie's Organics</strong>, a fair-trade clothing brand in Michigan. The founder Bená Burda spent 30 years building it. When she was ready to retire, she didn't want to sell to a big corporation that would destroy her values. Teamshares bought it — and her 18 employees received 10% of the company on day one, with more to come over time.</p>
        <p>Bená could go on her dream vacation to Costa Rica, knowing the business and its mission would live on — in the hands of the people who loved it most.</p>
        <p><strong>The goal?</strong> Create $10 billion in new wealth for working-class employees across America. 💰</p>
      </>
    ),
    thinkAboutIt: [
      'Wayne says "What one person can\'t do, a group of people can." Can you think of examples from your own life where a team achieved something no one person could do alone?',
      'If you were designing a "From Clerk to Boss" instruction manual, what would be the three most important things to teach?',
      'Teamshares wants to create $10 billion in new wealth for working people. Why is it important that wealth goes to workers, not just investors?',
    ],
  },
];

// ── Page component ────────────────────────────────────────────────────

export default function LunaComicTeamshares() {
  return (
    <>
      <SEOHead
        title="Startup Stories #1: When Grandpa's Shop Almost Closed — Luna's Comics"
        description="Luna and Wayne discover what happens when a shop owner retires and no one takes over. A real startup called Teamshares has an amazing solution — and it starts with the employees."
        ogImage="/images/comics/teamshares/cover.jpg"
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
              Episode 1 of 25
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
            When Grandpa's Shop<br />Almost Closed Forever
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            What happens when a shop owner retires and nobody takes over?
            Luna and Wayne discover a real startup called <strong>Teamshares</strong> that has a heartwarming answer.
          </p>

          {/* Cover image */}
          <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-md mt-4">
            <img
              src="/images/comics/teamshares/cover.jpg"
              alt="Luna and Wayne discover Teamshares — a startup that turns employees into owners"
              className="w-full h-auto"
            />
          </div>

          {/* Meta row */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-slate-500 pt-2">
            <span>📅 June 2026</span>
            <span>·</span>
            <span>4 comic strips</span>
            <span>·</span>
            <span>🇺🇸 Based on a real American startup</span>
          </div>

          <ShareBar
            title="Startup Stories #1: When Grandpa's Shop Almost Closed"
            summary="Luna and Wayne discover Teamshares — a startup that turns employees into owners of the shops they work in."
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
          <div className="text-4xl">🌟</div>
          <h2 className="text-xl font-bold text-slate-900">The End — For Now!</h2>
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            Teamshares is a real company. The employees who became owners are real people. And the next time you see a small shop in your neighborhood, you might wonder — <em>who will run it when the owner retires?</em>
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <Link
              to="/luna"
              className="px-5 py-2.5 rounded-xl bg-pink-100 text-pink-700 text-sm font-semibold hover:bg-pink-200 transition-colors"
            >
              ← More Comics
            </Link>
            <a
              href="https://www.teamshares.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-indigo-100 text-indigo-700 text-sm font-semibold hover:bg-indigo-200 transition-colors"
            >
              Visit Teamshares.com ↗
            </a>
          </div>
          <div className="pt-4">
            <ShareBar
              title="Startup Stories #1: When Grandpa's Shop Almost Closed"
              summary="A comic about a real startup called Teamshares that turns employees into shop owners."
            />
          </div>
        </motion.div>
      </div>
    </>
  );
}
