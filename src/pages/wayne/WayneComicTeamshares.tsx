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
    tag: 'The Problem',
    tagColor: 'bg-red-100 text-red-700',
    title: 'The Closed Shop',
    teaser:
      "Luna and Wayne walk past their favorite neighborhood shop and find a sign: \"Owner Retired.\" What happens to the people who worked there? What happens to the store? These are questions most kids have never thought to ask — and most parents haven't either.",
    image: '/images/comics/teamshares/strip-1.jpg',
    imageAlt:
      'Luna and Wayne discover their favorite shop has a sign saying "Owner Retired" — who takes care of the workers?',
    story: [
      'Every year in America, tens of thousands of small business owners retire, sell, or simply close their doors. When an owner retires without a succession plan, most of what happens next is invisible: employees find out their jobs are gone, loyal customers lose a place they loved, and a community loses something it didn\'t realize it depended on.',
      'This is the hidden side of entrepreneurship that almost no one teaches. We celebrate startups. We teach kids to dream big. But we rarely talk about what sustains businesses over decades, or what happens to the people inside them when ownership changes hands.',
      'Luna\'s question — "What happens to the people who work there?" — is a better question than most MBA programs ask. The answer, for most businesses, used to be: they\'re on their own. That\'s exactly the gap Teamshares was designed to fill.',
    ],
    facts: (
      <>
        <p><strong>2.5 million small businesses</strong> in the United States are owned by people over 55 — all of which will need to be sold, passed on, or closed in the next 10–20 years.</p>
        <p><strong>When a small business closes,</strong> the average affected employee has worked there for 7–12 years. Many are in their 40s and 50s, mid-career, with limited options.</p>
        <p><strong>Most small business owners have no succession plan.</strong> Nearly 60% say they want to pass the business to employees or family, but fewer than 15% have taken steps to do so.</p>
        <p><strong>The U.S. small business sector employs about 60 million people</strong> — nearly half the entire private workforce. Their stability matters far beyond any single shop.</p>
      </>
    ),
    lesson: (
      <>
        <p>Teaching kids about businesses doesn't just mean teaching them to start one. It means helping them see businesses as communities — with people, relationships, and responsibilities that extend beyond the owner's own financial interests.</p>
        <p>The "closed shop" problem is a perfect entry point: concrete, local, and emotionally legible. Ask your child: "Who depends on this store?" Not just "what does it sell?"</p>
      </>
    ),
    lessonTitle: 'Businesses Are Communities, Not Just Transactions',
    tip: 'Next time you walk past a local business, ask your child to name all the people who depend on it: the owner, the employees, the delivery drivers, the regular customers, the landlord. Most kids have only ever thought about the customer side of the equation. Expanding that picture is the first step to economic literacy.',
  },
  {
    number: 2,
    tag: 'The Fear',
    tagColor: 'bg-orange-100 text-orange-700',
    title: '"Boss, We Can\'t Lose This…"',
    teaser:
      'The moment the employees heard the news, panic set in. Some of them had worked at the shop for over a decade. Their jobs, their community, their daily routines — all of it suddenly uncertain. This is the part of business that rarely gets told.',
    image: '/images/comics/teamshares/strip-2.jpg',
    imageAlt: 'Employees discuss the future of the shop in fear after the owner announces retirement',
    story: [
      'Economic anxiety is one of the most common human experiences, and one of the least discussed with children. When a business closes or changes hands, it\'s not just a financial event — it\'s a social disruption. Relationships formed over years, routines that anchored people\'s weeks, a shared sense of purpose — all of it is suddenly at risk.',
      'The employees in our story aren\'t passive victims. They want to keep the business going. They know how to run it. They\'ve been doing it for years. What they lack is capital — the money to buy the business from the retiring owner — and the structures to own it collectively.',
      'This is where the conversation between "having a job" and "having ownership" becomes vivid. The difference between those two things is enormous. An employee can be let go. An owner has equity, agency, and a stake in the long-term outcome.',
    ],
    facts: (
      <>
        <p><strong>Employee-owned businesses have significantly higher survival rates</strong> than traditionally owned small businesses — studies show 3–4× less likely to close in the first five years.</p>
        <p><strong>Job security is the #1 financial concern</strong> for American households earning under $75,000/year, above healthcare costs, housing, and retirement savings.</p>
        <p><strong>The difference between a worker and an owner</strong> isn't just legal — it's psychological. Owners make longer-term decisions, invest more in the business, and report higher job satisfaction on average.</p>
        <p><strong>Most employees could not afford</strong> to buy the businesses they work in outright — a $1M small business requires $200,000–400,000 in down payment under conventional financing, far out of reach for most hourly workers.</p>
      </>
    ),
    lesson: (
      <>
        <p>Fear of job loss is real and legitimate. Don't teach kids to dismiss it or "think positively." Teach them to understand it clearly: what is actually at risk, what resources exist, and how people navigate structural problems together.</p>
        <p>The employees in this story aren't powerless — they're resource-constrained. That's a solvable problem. This distinction matters: it's the difference between a victim narrative and a problem-solving narrative.</p>
      </>
    ),
    lessonTitle: 'Economic Anxiety Is a Design Problem, Not a Personal Failure',
    tip: 'If your child ever expresses anxiety about money — theirs, yours, or a hypothetical — resist the instinct to immediately reassure. Instead, ask: "What specifically are you worried about?" Vague fear is harder to address than a specific concern. Then walk through it concretely. Economic anxiety in kids often comes from lack of information, not from genuine threat.',
  },
  {
    number: 3,
    tag: 'The Solution',
    tagColor: 'bg-indigo-100 text-indigo-700',
    title: 'Teamshares to the Rescue!',
    teaser:
      'A startup called Teamshares had a radical idea: what if the people who already know how to run the business became the ones who own it? Not through charity — through a real transfer of equity, over time, that the employees earn.',
    image: '/images/comics/teamshares/strip-3.jpg',
    imageAlt: 'Teamshares steps in and offers the employees a chance to become the new owners of the shop',
    story: [
      'Teamshares was founded in 2019 by Michael Brown and Alex Eu, both veterans of private equity and fintech. Their insight was simple but powerful: there are thousands of profitable small businesses whose owners want to retire, and thousands of employees who want to keep those businesses alive — the only thing missing is a mechanism to transfer ownership.',
      'The Teamshares model works like this: Teamshares buys the small business from the retiring owner, then immediately grants 10% equity to the employees as a group. Over time, that stake can grow to 80% or more as the employees pay down the acquisition debt and hit performance milestones.',
      'Critically, Teamshares doesn\'t just hand over a deed and walk away. They provide financial training, operational software, a network of peer businesses, and ongoing coaching. The bet is that with the right support, the people who already know the business best are the best possible owners of it.',
    ],
    facts: (
      <>
        <p><strong>Teamshares was founded in 2019</strong> and has acquired over 100 small businesses across the United States as of 2024, employing thousands of new employee-owners.</p>
        <p><strong>Employees receive 10% equity immediately</strong> upon Teamshares' acquisition, with pathways to reach up to 80% ownership over time — making it one of the most aggressive employee-ownership transitions in the market.</p>
        <p><strong>Teamshares has raised over $245 million</strong> in venture capital and debt financing, including backing from Spark Capital and other leading investors.</p>
        <p><strong>The average Teamshares employee earns meaningful equity value</strong> in addition to their regular salary — aligning their long-term financial interests with the health of the business they run every day.</p>
      </>
    ),
    lesson: (
      <>
        <p>Startups don't have to be about inventing new technology. Teamshares is a startup built entirely around a structural insight: the existing economy has a transition problem, and a company that solves it at scale creates enormous value — for workers, for retiring owners, and for local communities.</p>
        <p>This is a powerful framing for kids who don't see themselves as "tech people." The biggest unsolved problems in the economy are often in the unsexy middle — succession, ownership transitions, access to capital — not at the frontier of AI or biotech.</p>
      </>
    ),
    lessonTitle: 'The Best Startups Solve Problems That Already Exist',
    tip: 'Ask your child: "What problem does Teamshares solve, and for whom?" Then follow up: "Who are all the people who win when this works?" (The retiring owner gets a fair price. The employees keep their jobs and gain equity. The community keeps the business. Teamshares earns a return.) Teaching kids to map all stakeholders in a solution — not just the customer — builds systems thinking.',
  },
  {
    number: 4,
    tag: 'The Transformation',
    tagColor: 'bg-emerald-100 text-emerald-700',
    title: 'From Clerk to Boss — Step by Step',
    teaser:
      'Becoming an owner doesn\'t happen overnight. The employees had to learn new skills, make new kinds of decisions, and take on responsibilities they\'d never had before. That journey — from worker to owner — is the real story.',
    image: '/images/comics/teamshares/strip-4.jpg',
    imageAlt:
      'The employees grow into their new roles as owners, making decisions and building something that is truly theirs',
    story: [
      'Ownership is a skill. It requires different thinking than employment. An employee asks: "What do I need to do today?" An owner asks: "Where is this business going, and what decisions today will shape that future?" The shift is more cognitive than financial.',
      'The Teamshares model accounts for this. They spend significant resources on financial education — helping newly minted employee-owners read a balance sheet, understand cash flow, think about reinvestment versus distribution, and make decisions with a long time horizon.',
      'What strikes me most about this model is the patience it requires from everyone involved. The employees don\'t get rich overnight. Teamshares doesn\'t get a quick exit. The transformation happens over years, through the accumulation of small decisions and growing confidence. That\'s a hard thing to teach in a culture obsessed with overnight success — but it may be the most important thing.',
    ],
    facts: (
      <>
        <p><strong>Research on Employee Stock Ownership Plans (ESOPs)</strong> consistently shows that employee-owned businesses outperform traditional businesses on productivity, employee retention, and long-term survival rates.</p>
        <p><strong>Employee-owners build significantly more wealth</strong> than comparable workers at non-employee-owned firms — median wealth is 92% higher, according to a Rutgers University study.</p>
        <p><strong>The transition from employee to owner mindset</strong> takes an average of 18–24 months in practice — not weeks. The behavioral shift is real, measurable, and requires deliberate support.</p>
        <p><strong>Teamshares teaches financial literacy</strong> as a core part of its acquisition process, recognizing that equity is only valuable if the holder understands what it means.</p>
      </>
    ),
    lesson: (
      <>
        <p>The arc from clerk to owner is a story about delayed gratification, skill accumulation, and identity change — all of which are directly teachable to children.</p>
        <p>The Teamshares model implicitly teaches something most schools don't: ownership is not a reward you receive, it's a role you grow into. The best way to prepare kids for ownership — of businesses, of their own futures — is to give them real decisions with real consequences, early and often.</p>
      </>
    ),
    lessonTitle: 'Ownership Is a Skill, Not a Reward',
    tip: 'Give your child a small piece of "ownership" over something real: a garden plot, a household budget line, a savings goal they design themselves. Not just chores with an allowance — actual decisions with actual consequences. The difference between doing a task and owning an outcome is enormous, and kids can feel it. That feeling is where entrepreneurial identity starts.',
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

export default function WayneComicTeamshares() {
  return (
    <>
      <SEOHead
        title="Startup Stories #1: Teamshares — When Workers Become Owners | Wayne's Comics"
        description="A parent-child comic series about real startups. Episode 1: Teamshares — what happens when a beloved neighborhood shop's owner retires, and how one company turns employees into owners."
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
            src="/images/comics/teamshares/cover.jpg"
            alt="Startup Stories #1: Teamshares cover"
            className="w-full h-auto"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-bold rounded-full uppercase tracking-wide">
            Startup Stories · Episode 1 of 25
          </span>
          <span className="text-xs text-slate-400">June 2026 · 4 strips</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3 leading-tight">
          When Grandpa's Shop Almost Closed
        </h1>
        <p className="text-slate-500 leading-relaxed mb-5 max-w-2xl">
          A real startup called Teamshares has a radical idea: when a small business owner retires,
          let the employees buy it — step by step, over time. This is the story of how that works,
          and what it teaches kids about ownership, community, and economic fairness.
        </p>
        <ShareBar
          title="Startup Stories #1: Teamshares — When Workers Become Owners"
          summary="A 4-strip parent-child comic about the real startup Teamshares, employee ownership, and what happens when a beloved shop's owner retires."
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

      {/* ── About Teamshares (collapsible) ── */}
      <AboutTeamshares />

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
          title="Startup Stories #1: Teamshares"
          summary="A parent-child comic series about real startups — Episode 1: employee ownership."
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
          This is Episode 1 of 25. Each story is about a real company solving a real problem —
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

// ── About Teamshares (collapsible) ───────────────────────────────────

function AboutTeamshares() {
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
            <span className="text-indigo-600 text-sm font-bold">TS</span>
          </div>
          <div>
            <p className="font-bold text-slate-800">About Teamshares</p>
            <p className="text-xs text-slate-400 mt-0.5">
              How the company works, who it's for, and why it matters
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
                  <p className="font-semibold text-slate-800 mb-1">What Teamshares Does</p>
                  <p>
                    Teamshares acquires small businesses from retiring owners, then transfers meaningful equity
                    to the employees who already work there. The goal is to make employee ownership the default
                    exit path for America's 2.5 million small businesses facing a succession crisis.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">The Ownership Model</p>
                  <p>
                    Employees receive 10% equity immediately at acquisition. As the business pays down
                    its acquisition debt and hits milestones, the employee ownership stake grows —
                    reaching up to 80% over time. Teamshares retains a minority stake and provides
                    ongoing operational and financial support.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">Who Founded It</p>
                  <p>
                    Michael Brown and Alex Eu founded Teamshares in 2019, drawing on backgrounds in
                    private equity and fintech. They identified the small business succession crisis
                    as one of the largest, least-addressed structural problems in the American economy.
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-slate-800 mb-1">Scale & Traction</p>
                  <p>
                    As of 2024, Teamshares has acquired over 100 businesses across industries including
                    manufacturing, services, and distribution — employing thousands of new employee-owners
                    across the United States.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">Why This Matters for Kids</p>
                  <p>
                    Teamshares is a concrete example that ownership isn't reserved for founders.
                    The people who know the business best — who've served the customers, maintained
                    the equipment, built the relationships — can become the people who own it.
                    That's a powerful idea to plant early.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">Learn More</p>
                  <p>
                    <a
                      href="https://www.teamshares.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-800 font-medium"
                    >
                      teamshares.com
                    </a>
                    {' '}— the company's own explanation of how the model works.
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
