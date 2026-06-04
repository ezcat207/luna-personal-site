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
          {expanded ? 'Hide Details' : 'Learn More About the Real Story \u2192'}
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
    title: '1. Can You Spot the Fake Rice?',
    teaser:
      'Luna holds up a handful of rice. It all looks the same! But Wayne explains that expensive Thai Jasmine rice — fragrant, delicious, worth 3x as much — can look almost identical to cheap ordinary rice. How do you tell them apart?',
    image: '/images/comics/easyrice/strip-1.jpg',
    imageAlt:
      'Luna and Wayne inspect a handful of rice grains, trying to spot the difference between expensive Thai Jasmine rice and cheaper ordinary varieties that look almost identical.',
    realProblem: (
      <>
        <p>Thailand exports rice all over the world. But sometimes, unscrupulous sellers mix cheap rice into expensive Jasmine rice to make more money.</p>
        <p>The only way to check used to be: hire an expert who stares at the grains for a long time and uses their experience to guess. Different experts gave different answers. And customers in faraway countries had no way to verify what they were buying.</p>
        <p>As these experts retire, fewer and fewer people have the skill. And even the best human eye is not always consistent from one inspection to the next.</p>
      </>
    ),
    meetCompany: (
      <>
        <p><strong>EasyRice</strong> was founded in 2019 by Phuvin Kongsawat in Thailand. He realized the rice industry had a huge trust problem — and the solution was an AI camera that could identify rice varieties faster and more accurately than any human expert.</p>
        <p>His company, EasyRice Digital Technology Co., Ltd., built a system that can recognize 84 different rice varieties and tell you in minutes whether a bag of expensive Jasmine rice is really what it claims to be.</p>
      </>
    ),
    thinkAboutIt: [
      'If you bought something expensive and later found out it was mixed with something cheaper, how would you feel? Who would be responsible?',
      'Why is it important to be able to trust the label on food packaging? What could go wrong if you could not trust it?',
      'Can you think of another food where fake or lower-quality products might get mixed in with the real thing?',
    ],
  },
  {
    number: 2,
    tag: 'The Stakes',
    tagColor: 'bg-amber-100 text-amber-700',
    title: '2. When a Whole Shipload Gets Rejected',
    teaser:
      'A ship carrying millions of dollars worth of Thai Jasmine rice is heading to Europe. But when it arrives, the buyer tests a sample and finds cheaper rice mixed in! The whole shipment gets rejected. The farmers who grew it do not get paid. How did this happen?',
    image: '/images/comics/easyrice/strip-2.jpg',
    imageAlt:
      'Thai rice farmers stand in their paddy fields looking worried as Wayne explains that without fair quality testing, farmers are often the ones who lose out when rice shipments get rejected far away.',
    realProblem: (
      <>
        <p>This kind of problem happens all along the rice supply chain. At every step — from farm to mill, mill to exporter, exporter to international buyer — someone is trying to cheat or someone is being cheated.</p>
        <p>Rice farmers in Thailand often get paid less than their rice is worth because mills claim the quality is bad. But the farmers have no proof that it is not. And without an objective test, there is no way to settle the argument.</p>
        <p>This three-layer trust crisis — farmer vs. mill vs. exporter vs. buyer — cost the entire industry millions every year and made Thailand's rice reputation fragile on the world stage.</p>
      </>
    ),
    meetCompany: (
      <>
        <p>EasyRice built two products to solve both sides of the trust problem:</p>
        <p><strong>EASYRICE MP</strong> identifies what variety the rice is — checking from a database of 84 varieties whether the expensive Jasmine rice is really Jasmine.</p>
        <p><strong>EASYRICE M0</strong> grades the quality against 25 official Thai standards — detecting broken grains, yellow grains, chalky grains, and damaged grains.</p>
        <p>Results come out in just 3 to 5 minutes. One user said it was like having a rapid antigen test (ATK) for rice — fast and reliable initial screening, compared to the slow and expensive DNA test (PCR) that was the only other option.</p>
      </>
    ),
    thinkAboutIt: [
      'Think about all the people involved in getting rice from a Thai farm to a dinner table in Europe. How many different people need to trust each other for it to work?',
      'Why do you think having an independent, objective test could make trade more fair? Who benefits the most?',
      'Have you ever been in a disagreement where both sides needed a fair "referee"? What made a good referee in that situation?',
    ],
  },
  {
    number: 3,
    tag: 'The Technology',
    tagColor: 'bg-indigo-100 text-indigo-700',
    title: '3. Ten Million Grains of Rice Later...',
    teaser:
      'To train EasyRice\'s AI, the team photographed over 10 MILLION individual rice grains! The AI learned to recognize 84 different rice varieties, and can spot broken, yellow, or chalky grains that lower the quality. Now it is faster and more accurate than any human eye.',
    image: '/images/comics/easyrice/strip-3.jpg',
    imageAlt:
      'A close-up AI visual system scans individual rice grains on a tray, identifying and categorizing each grain by variety and quality in a matter of seconds.',
    realProblem: (
      <>
        <p>Teaching an AI to identify rice varieties is hard because many types of rice look nearly identical to the human eye. The difference between high-grade Thai Jasmine and a cheaper variety might be subtle differences in grain shape, transparency, and texture.</p>
        <p>A human expert develops this skill over many years of practice. The EasyRice team had to gather millions of sample images to teach their AI to see what an expert sees — but to do it in seconds, every time, without getting tired or distracted.</p>
        <p>Getting to 95% accuracy required patience, a massive dataset, and constant testing against real-world rice samples.</p>
      </>
    ),
    meetCompany: (
      <>
        <p>In just <strong>one year</strong> after launching, EasyRice captured <strong>30% of Thailand's entire rice export inspection market</strong>. That means 3 out of every 10 bags of rice exported from Thailand was checked using EasyRice!</p>
        <p>Today, more than <strong>300 large rice mills and exporters</strong> use it, plus over <strong>20,000 individual farmers</strong>. Together they have inspected over <strong>500,000 batches</strong> of rice — covering about 10 million tonnes in total.</p>
        <p>The results are shared instantly via <strong>LINE</strong>, the messaging app most people in Thailand already use — so no one needs to download a special app or learn new software.</p>
      </>
    ),
    thinkAboutIt: [
      'The AI was trained on 10 million examples. How do you think the team collected all those rice grain photos? What challenges would that involve?',
      'What makes an AI "trustworthy" for something as important as trade? Is 95% accuracy good enough, or do you need 100%?',
      'Humans learn skills through practice over years. How is the way an AI learns the same? How is it different?',
    ],
  },
  {
    number: 4,
    tag: 'The Impact',
    tagColor: 'bg-emerald-100 text-emerald-700',
    title: '4. A Fair Price for Every Farmer',
    teaser:
      'The best part of EasyRice is not the technology — it is what it does for farmers. When a small farmer can prove their rice is high quality, they can negotiate a fair price. Nobody can cheat them anymore. Wayne and Luna visit a Thai rice farmer who just got her best price ever!',
    image: '/images/comics/easyrice/strip-4.jpg',
    imageAlt:
      'A Thai rice farmer holds up her phone showing the EasyRice inspection result. Wayne explains that pay-per-use pricing means even small farmers can now afford to test their own crop and prove its quality.',
    realProblem: (
      <>
        <p>In developing countries, small farmers are often the most vulnerable part of the supply chain. They sell their crops to large mills that have much more power in the negotiation. Without objective quality data, a mill can simply say "your rice is not good enough" and pay less — and the farmer has no proof otherwise.</p>
        <p>EasyRice's <strong>pay-per-use model</strong> means even the smallest farmer can afford to test their own crop before selling it. They no longer have to guess what their rice is worth. They have proof.</p>
      </>
    ),
    meetCompany: (
      <>
        <p>EasyRice is now expanding to <strong>Vietnam, India, Indonesia, and the Philippines</strong> — countries that together produce a huge share of the world's rice — with 25+ trial customers already in Vietnam.</p>
        <p>And in 2024, they started a new division called <strong>EXAMBRISK</strong> that uses the same AI visual technology to inspect <strong>electronics defects</strong> and do <strong>drone roof inspections</strong> of buildings. The rice inspection idea turned into a whole visual AI platform!</p>
        <p>Their strategic investors include Yip In Tsoi (Thailand's largest fertilizer and agri-tech company) and PTT-ARV (the Thai national oil company's AI and robotics venture fund) — both of which want access to the agricultural data this platform generates.</p>
      </>
    ),
    thinkAboutIt: [
      'If you were a small rice farmer, how would it feel to finally have proof of your rice quality when negotiating a price? How might that change your confidence?',
      'EasyRice started with rice and then expanded to electronics and buildings. Can you think of other things that could be inspected by an AI camera that has learned to see differences humans miss?',
      'Why do you think large companies like a national oil company would want to invest in a rice inspection startup? What are they really buying?',
    ],
  },
];

// ── Page component ────────────────────────────────────────────────────

export default function LunaComicEasyRice() {
  return (
    <>
      <SEOHead
        title="Startup Stories #5: The AI That Can Tell If Your Rice Is Fake — Luna's Comics"
        description="Luna and Wayne discover EasyRice, a Thai startup that uses AI to inspect rice grains and protect farmers from being cheated. 10 million training images, 95% accuracy, 3 minutes per test."
      />

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
        {/* Back link */}
        <Link
          to="/luna"
          className="inline-flex items-center gap-2 text-sm text-pink-500 hover:text-pink-700 font-semibold transition-colors"
        >
          \u2190 Back to Luna's World
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
              Episode 5 of 25
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
            The AI That Can Tell<br />If Your Rice Is Real
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            How do you know the expensive Thai Jasmine rice you bought is actually Jasmine?
            Luna and Wayne discover <strong>EasyRice</strong> — a real Thai startup using AI to protect
            farmers, exporters, and everyone who loves a bowl of fragrant rice.
          </p>

          {/* Cover image */}
          <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-md mt-4">
            <img
              src="/images/comics/easyrice/cover.jpg"
              alt="EasyRice AI system scanning individual rice grains to verify variety and quality"
              className="w-full h-auto"
            />
          </div>

          {/* Meta row */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-slate-500 pt-2">
            <span>📅 June 2026</span>
            <span>·</span>
            <span>4 comic strips</span>
            <span>·</span>
            <span>🇹🇭 Based on a real Thai startup</span>
          </div>

          <ShareBar
            title="Startup Stories #5: The AI That Can Tell If Your Rice Is Fake"
            summary="Luna and Wayne discover EasyRice — a Thai startup using AI to inspect rice grains and protect farmers from being cheated on quality."
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
            <strong>Startup Stories</strong> is a comic series based on 25 real businesses discovered by AI researchers at Tencent Research Institute. These are not famous billion-dollar companies — they are small, scrappy startups solving <em>real problems</em> in the real world. Every story starts with a problem a real person noticed, and a solution that made lives better.
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
          <div className="text-4xl">🌾</div>
          <h2 className="text-xl font-bold text-slate-900">The End — For Now!</h2>
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            EasyRice is a real company. The farmers who now have proof of their rice quality are real people. And the next time you eat a bowl of fragrant rice, you might wonder — <em>how does anyone know this is really the good stuff?</em>
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <Link
              to="/luna"
              className="px-5 py-2.5 rounded-xl bg-pink-100 text-pink-700 text-sm font-semibold hover:bg-pink-200 transition-colors"
            >
              \u2190 More Comics
            </Link>
            <a
              href="https://easyrice.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-indigo-100 text-indigo-700 text-sm font-semibold hover:bg-indigo-200 transition-colors"
            >
              Visit EasyRice.ai \u2197
            </a>
          </div>
          <div className="pt-4">
            <ShareBar
              title="Startup Stories #5: The AI That Can Tell If Your Rice Is Fake"
              summary="A comic about EasyRice, the real Thai startup using AI to inspect rice grains and protect farmers."
            />
          </div>
        </motion.div>
      </div>
    </>
  );
}
