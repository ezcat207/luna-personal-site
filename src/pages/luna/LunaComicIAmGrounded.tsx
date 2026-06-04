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
    title: '1. Coffee Is a Fruit?!',
    teaser:
      'Luna is shocked — coffee grows as a cherry fruit on trees! And when we make coffee, we only use the tiny bean inside. What happens to all the rest of the fruit?',
    image: '/images/comics/i-am-grounded/strip-1.jpg',
    imageAlt:
      'Luna and Wayne discover that coffee grows as a fruit — and only the tiny bean inside gets used. The rest of the cherry pulp gets thrown away.',
    realProblem: (
      <>
        <p>
          Every year, coffee farmers throw away <strong>20 billion kilograms of coffee fruit pulp</strong>. If
          you stacked all those cherries, they'd fill over <strong>3,300 Olympic swimming pools</strong>.
        </p>
        <p>
          The rotting pulp releases harmful chemicals called <strong>mycotoxins</strong> that poison the soil
          and rivers near coffee farms — making it dangerous for animals and plants living nearby.
        </p>
        <p>
          And it sends <strong>16 million tonnes of CO₂</strong> into the air every single year — making
          climate change worse, just from fruit that nobody wanted.
        </p>
      </>
    ),
    meetCompany: (
      <>
        <p>
          <strong>I Am Grounded</strong> was started by Vanessa Murillo, who grew up in a Colombian coffee
          farming family before moving to Australia. She always knew the secret that most people miss:
        </p>
        <p>
          The fruit pulp isn't trash — it's actually a <strong>SUPERFOOD</strong> with more antioxidants
          than blueberries! Vanessa wanted to turn the waste into something amazing instead of letting
          it rot.
        </p>
      </>
    ),
    thinkAboutIt: [
      'Next time you eat a fruit, look at how much you throw away. Seeds, skin, cores — what if all of that could become something useful?',
      "Why do you think farmers never tried to use the coffee fruit pulp before? Do you think it was because they didn't know it was healthy, or because it was too hard to use?",
      'Can you think of any other food where we throw away the best part without realizing it?',
    ],
  },
  {
    number: 2,
    tag: 'The Discovery',
    tagColor: 'bg-amber-100 text-amber-700',
    title: '2. The Pulp That Nobody Wanted',
    teaser:
      "Vanessa's dad — a food science expert — showed her something amazing. The \"trash\" from coffee farming is packed with more antioxidants than açai berries, more energy than a cup of coffee, and nutrients that most energy bars don't have. What if you could turn the waste into the product?",
    image: '/images/comics/i-am-grounded/strip-2.jpg',
    imageAlt:
      'Coffee pulp being transformed into a colorful energy bar. Luna and Wayne look amazed at what the "waste" can become.',
    realProblem: (
      <>
        <p>
          <strong>"Upcycling"</strong> means taking something that was going to be thrown away and turning
          it into something new and useful. Most food companies don't do this because it's harder and more
          expensive than just buying cheap ingredients.
        </p>
        <p>
          But upcycling also means you're helping the planet AND the farmers who grew the food — because
          now the "waste" has value, and the farmers can earn money from it too.
        </p>
      </>
    ),
    meetCompany: (
      <>
        <p>
          Vanessa and her business partner <strong>Lachlan Powell</strong> spent a whole year hand-making
          energy bars in a tiny kitchen in Brisbane, Australia. They called them{' '}
          <strong>"SUPR Bars"</strong> — with names like <em>"The 9AM"</em> and <em>"The 3PM"</em> to
          match when you need energy during the day.
        </p>
        <p>
          They gave bars to coffee shops and health stores to try. People loved the taste AND the story
          behind it — a product that helped the planet while giving you energy!
        </p>
      </>
    ),
    thinkAboutIt: [
      'Can you think of something in your house that gets thrown away that might actually be useful? How could you upcycle it?',
      'Why do you think naming the bars "The 9AM" and "The 3PM" was a smart idea? How does a name help people understand what a product does?',
      'Vanessa used her family\'s knowledge about coffee farming to build her business. What special knowledge does YOUR family have that might help solve a problem someday?',
    ],
  },
  {
    number: 3,
    tag: 'The Business',
    tagColor: 'bg-indigo-100 text-indigo-700',
    title: '3. From Kitchen to Supermarket',
    teaser:
      "How does a small kitchen project turn into a product you can buy at the supermarket? It takes a lot of testing, failing, learning, and not giving up. Luna wants to know — how much does a bar cost to make, and how do you get into a huge store?",
    image: '/images/comics/i-am-grounded/strip-3.jpg',
    imageAlt:
      'Luna and Wayne discuss the business side of I Am Grounded — how they got from a kitchen experiment to 1,000 Woolworths stores.',
    realProblem: (
      <>
        <p>
          Starting a food business is really hard! You need to prove the product is safe, tastes good,
          has the right nutrition labels, and can be made at scale — not just in a small kitchen.
        </p>
        <p>
          In May 2023, I Am Grounded got their SUPR Bars into about <strong>1,000 Woolworths stores</strong>{' '}
          across Australia — one of the biggest supermarket chains in the country. That means millions of
          people could now pick one up when they went grocery shopping.
        </p>
      </>
    ),
    meetCompany: (
      <>
        <p>
          They raised money through <strong>government grants</strong> (free money from the government for
          good ideas!), a competition where they won <strong>$5,000</strong>, and{' '}
          <strong>Kickstarter</strong> — a website where regular people can support new products they
          believe in.
        </p>
        <p>
          Every step of the way, they tested their bars with real customers and improved the recipe. This
          process is called <strong>"product-market fit"</strong> — making sure people actually want to
          buy what you made.
        </p>
      </>
    ),
    thinkAboutIt: [
      'If you made a snack at home and wanted to sell it, what would be the very first step you\'d take? Who would you test it on first?',
      'I Am Grounded bars cost a little more than regular energy bars because they\'re better for the planet. Would you pay more for something if you knew it helped the environment? Why or why not?',
      'Kickstarter lets regular people invest in new ideas. If you had $10 to support a new product, what kind of invention would you want to help make happen?',
    ],
  },
  {
    number: 4,
    tag: 'The Impact',
    tagColor: 'bg-emerald-100 text-emerald-700',
    title: '4. Saving the Planet, One Bar at a Time',
    teaser:
      'Wayne and Luna do the math. If each bar rescues 50 grams of coffee pulp, and they sell thousands of bars... that\'s a lot of waste turned into something good! But the most important part is what it means for the farmers in Colombia.',
    image: '/images/comics/i-am-grounded/strip-4.jpg',
    imageAlt:
      "Wayne and Luna explore the bigger story of I Am Grounded's impact — from rescuing coffee pulp to empowering Colombian farmers.",
    realProblem: (
      <>
        <p>
          I Am Grounded has already rescued <strong>40,000 kilograms of coffee pulp</strong> from the waste
          pile. Each SUPR Bar saves about <strong>50 grams</strong> of coffee pulp from rotting.
        </p>
        <p>
          But the bigger impact is on the farmers. When the pulp becomes a valuable product, the farmers
          earn <strong>MORE money from the same crop</strong> — without growing a single extra coffee plant.
          This is called creating <strong>"circular value"</strong> in a supply chain.
        </p>
      </>
    ),
    meetCompany: (
      <>
        <p>
          Vanessa's family still has connections to Colombian coffee farming communities. When she buys the
          pulp from these farmers, she's helping people she knows personally — and changing what "waste"
          means for an entire region.
        </p>
        <p>
          I Am Grounded's goal is to expand to even more products using other upcycled food waste from
          around the world — proving that one company's clever idea can inspire a whole new way of thinking
          about the food we grow and the "waste" we throw away.
        </p>
      </>
    ),
    thinkAboutIt: [
      'If each bar saves 50g of waste, how many bars would need to be sold to rescue 1,000 kg? (Hint: 1 kg = 1,000 g.) Does that number feel big or small to you?',
      'Vanessa helps farmers she knows personally. Do you think a business that knows the people in its supply chain makes better decisions than one that doesn\'t? Why?',
      'Can you think of another kind of farm — fruit, vegetables, grains — that probably throws away a lot of "waste" that might secretly be useful?',
    ],
  },
];

// ── Page component ────────────────────────────────────────────────────

export default function LunaComicIAmGrounded() {
  return (
    <>
      <SEOHead
        title="Startup Stories #3: The Energy Bar Made from Trash — Luna's Comics"
        description="Luna and Wayne discover that coffee is actually a fruit — and 80% of it gets thrown away! An Australian startup called I Am Grounded turns that waste into energy bars. A real story about upcycling, farming, and saving the planet."
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
              Episode 3 of 25
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
            The Energy Bar Made<br />from Trash
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Did you know coffee is actually a fruit — and we throw away 80% of it? Luna and Wayne
            discover a real startup called{' '}
            <strong>I Am Grounded</strong> that turns that "trash" into superfood energy bars.
          </p>

          {/* Cover image */}
          <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-md mt-4">
            <img
              src="/images/comics/i-am-grounded/cover.jpg"
              alt="I Am Grounded — coffee pulp turned into energy bars"
              className="w-full h-auto"
            />
          </div>

          {/* Meta row */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-slate-500 pt-2">
            <span>📅 June 2026</span>
            <span>·</span>
            <span>4 comic strips</span>
            <span>·</span>
            <span>🇦🇺 Based on a real Australian startup</span>
          </div>

          <ShareBar
            title="Startup Stories #3: The Energy Bar Made from Trash"
            summary="Luna and Wayne discover I Am Grounded — a startup that turns coffee fruit waste into superfood energy bars, rescuing 40,000 kg of pulp and empowering Colombian farmers."
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
            <strong>Startup Stories</strong> is a comic series based on 25 real businesses discovered by
            AI researchers at Tencent Research Institute. These are not famous billion-dollar companies —
            they're small, scrappy startups solving <em>real problems</em> in the real world. Every story
            starts with a problem a real person noticed, and a solution that made lives better.
          </p>
          <p className="text-sm text-slate-700 leading-relaxed">
            Each comic strip has a <strong>"Learn More" button</strong> below it — tap it to go deeper into
            the real story, discover the company, and think through questions that might change how you see
            the world. 👇
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
          <div className="text-4xl">☕</div>
          <h2 className="text-xl font-bold text-slate-900">The End — For Now!</h2>
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            I Am Grounded is a real company. The coffee farmers in Colombia are real people. And the next
            time you see a cup of coffee, you might wonder —{' '}
            <em>what happened to the other 80% of that fruit?</em>
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <Link
              to="/luna"
              className="px-5 py-2.5 rounded-xl bg-pink-100 text-pink-700 text-sm font-semibold hover:bg-pink-200 transition-colors"
            >
              ← More Comics
            </Link>
            <a
              href="https://iamgrounded.co"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-indigo-100 text-indigo-700 text-sm font-semibold hover:bg-indigo-200 transition-colors"
            >
              Visit iamgrounded.co ↗
            </a>
          </div>
          <div className="pt-4">
            <ShareBar
              title="Startup Stories #3: The Energy Bar Made from Trash"
              summary="A comic about I Am Grounded — an Australian startup that turns coffee fruit waste into energy bars."
            />
          </div>
        </motion.div>
      </div>
    </>
  );
}
