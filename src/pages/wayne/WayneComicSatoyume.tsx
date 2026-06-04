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
    title: 'The Village That Was Supposed to Disappear',
    teaser:
      'Kosuge Village in Japan — population 700, 45% over 65, over 100 empty houses, designated a "disappearing city" by the government. The textbook solution? Nothing. It seemed terminal.',
    image: '/images/comics/satoyume/strip-1.jpg',
    imageAlt:
      'Luna and Wayne visit a Japanese mountain village — abandoned houses, elderly residents, empty streets. Luna asks "Where did all the young people go?" Wayne explains the cycle of rural decline.',
    story: [
      'Deep in the mountains of Yamanashi Prefecture, Japan, lies Kosuge Village — population just over 700. It is the kind of place that demographers point to as a warning. Nearly half the residents are over 65. There are more than 100 abandoned houses — empty, decaying, their owners gone to the cities or passed away without successors. The Japanese government officially designated Kosuge a "disappearing city" — one of hundreds across rural Japan facing terminal population decline.',
      'The standard playbook for places like Kosuge is straightforward and it does not work: invest in infrastructure (new roads, new public buildings), offer subsidies to attract businesses, run tourism campaigns. The problem is that these solutions treat the symptom — the lack of economic activity — without addressing the root cause: the loss of hope and identity. Young people leave because there is no future. Businesses do not come because there are no customers. The village gets quieter, older, emptier. The spiral feeds on itself.',
      'To a traditional economist, Kosuge looks like a collection of liabilities: declining population, aging workforce, surplus housing stock with negative value, limited industry. The rational recommendation would be "managed decline" — accept the inevitable and plan for an orderly depopulation. But Satoyume, a company founded in 2012 by a man named Shimada Shunpei, looked at the same village and saw something completely different.',
    ],
    facts: (
      <>
        <p><strong>Kosuge Village:</strong> Population ~700, located in Yamanashi Prefecture at the source of the Tama River.</p>
        <p><strong>45% of residents</strong> are over 65 years old — one of the highest elderly ratios in Japan.</p>
        <p><strong>100+ abandoned houses</strong> — traditional wooden homes (kominka) dating back over 100 years, now empty and decaying.</p>
        <p><strong>Designated "disappearing city":</strong> Official government designation for municipalities at risk of vanishing due to population decline.</p>
        <p><strong>Japan-wide problem:</strong> Hundreds of rural communities face the same crisis. Young people migrate to Tokyo, Osaka, and other cities, leaving aging populations behind.</p>
        <p><strong>The standard approach fails:</strong> Infrastructure spending and subsidies have not reversed the decline. The problem is not just economic — it is psychological and cultural.</p>
      </>
    ),
    lesson: (
      <>
        <p>The story of Kosuge Village illustrates a critical flaw in how we traditionally measure value. On a balance sheet, an abandoned house in a shrinking village is a liability — it costs money to maintain, generates no income, and has no resale value. But that "liability" label is a product of our assumptions about what value looks like, not an intrinsic property of the house itself.</p>
        <p>Satoyume\'s breakthrough was recognizing that the same abandoned house, when seen through a different lens, is an asset. It is not an empty building — it is a 100-year-old traditional Japanese farmhouse with hand-hewn beams, natural materials, and a story. In a world where people pay premiums for "authentic experiences," that house is a hotel room like no other. The lesson: value is not discovered — it is created by how you frame what already exists.</p>
      </>
    ),
    lessonTitle: 'A Liability Is Just an Asset You Haven\'t Reframed',
    tip: 'Ask your child: "If nobody wanted to buy your old bicycle, is it worthless?" Then ask: "What if someone who collects vintage bikes saw it? What if a movie set needed a retro bike?" The bicycle did not change — what changed was who was looking at it and what they valued. Satoyume\'s insight was that the "value" of a place depends entirely on the lens you use. An abandoned house is either a decaying building or a 100-year-old traditional Japanese inn. Both descriptions are true. The difference is which one you choose to act on.',
  },
  {
    number: 2,
    tag: 'The Solution',
    tagColor: 'bg-amber-100 text-amber-700',
    title: 'The Village That Became a Hotel',
    teaser:
      'Satoyume turned Kosuge Village into "NIPPONIA Kosuge Source of the River" — a distributed hotel where abandoned houses become guest rooms and villagers become the concierge.',
    image: '/images/comics/satoyume/strip-2.jpg',
    imageAlt:
      'Luna looks amazed as Wayne explains the NIPPONIA distributed hotel concept — abandoned farmhouses converted into beautiful guest rooms, connected by village paths, with local residents as guides and hosts.',
    story: [
      'Satoyume proposed something that sounded absurd at first: turn the entire village into a single hotel. NIPPONIA Kosuge Source of the River — a distributed hotel where the abandoned 100-year-old farmhouses become individual guest rooms, the village paths become corridors connecting them, the local hot spring becomes the hotel spa, and the residents themselves become guides, hosts, and cultural ambassadors.',
      'This is not a hotel built in a village — it is the village itself transformed into a hotel. When you stay at NIPPONIA Kosuge, you are not a tourist visiting a destination — you are a guest in someone\'s extended home. Your room is a restored kominka (traditional farmhouse) where generations of a family lived. Your dinner features local vegetables grown by your neighbor. Your guide is a retiree who has lived in the valley for 70 years and knows every trail, every plant, every story.',
      'The transformation was not about building anything new. It was about seeing existing assets differently. The empty houses were not liabilities — they were unique accommodations that no hotel chain could replicate. The elderly residents were not a burden — they were the world\'s most knowledgeable local guides. The village\'s "emptiness" and "slowness" were not deficiencies — they were the product: an escape from the noise and speed of city life that people would pay a premium for.',
    ],
    facts: (
      <>
        <p><strong>NIPPONIA Kosuge Source of the River:</strong> A distributed hotel where the entire village serves as the hotel. Abandoned farmhouses become guest rooms.</p>
        <p><strong>Not about building new:</strong> The innovation is entirely perceptual — seeing existing abandoned houses, elderly residents, and rural quiet as valuable assets rather than problems.</p>
        <p><strong>Authentic experience:</strong> Guests stay in restored 100-year-old kominka (traditional farmhouses), eat local food, and interact with residents as guides and hosts.</p>
        <p><strong>Revenue model:</strong> High-value experiential tourism — people pay a premium not for luxury amenities but for authentic immersion in a living Japanese village.</p>
        <p><strong>Villagers become hosts:</strong> The local residents are the hotel\'s greatest asset — they are guides, storytellers, and the reason the experience cannot be replicated elsewhere.</p>
        <p><strong>"Dream-driven" philosophy:</strong> Satoyume does not ask "what\'s wrong with this village?" It asks "what does this village dream of becoming?"</p>
      </>
    ),
    lesson: (
      <>
        <p>Satoyume\'s distributed hotel model contains a profound lesson about innovation: the most powerful transformations often come from redefining what you already have, not acquiring something new. Every village has empty buildings. Most see them as problems. Satoyume saw them as a hotel chain in waiting — a chain with the ultimate competitive advantage: each "room" is unique, irreplaceable, and embedded in an authentic cultural context that no purpose-built resort could ever replicate.</p>
        <p>This is the difference between "resource-oriented thinking" and "deficit-oriented thinking." Deficit thinking asks "what are we missing?" and concludes "we need more investment, more infrastructure, more young people." Resource thinking asks "what do we already have that others might value?" and starts building from there.</p>
      </>
    ),
    lessonTitle: 'You Already Have What You Need',
    tip: 'Ask your child: "What is something our town has that a tourist from another country might find fascinating?" A local bakery that has been open for 50 years? A park with a specific history? A festival only our town celebrates? The exercise teaches that value is often invisible to the people who live with it every day. The most powerful innovations sometimes come from simply seeing ordinary things through fresh eyes — and realizing they are extraordinary.',
  },
  {
    number: 3,
    tag: 'The Strategy',
    tagColor: 'bg-indigo-100 text-indigo-700',
    title: 'The Pride Flywheel — Why Self-Esteem Is an Economic Development Tool',
    teaser:
      'Satoyume\'s model scales through a "pride flywheel": when villagers feel proud of their home, they maintain it better, host more warmly, and attract more visitors — creating a self-reinforcing cycle of renewal.',
    image: '/images/comics/satoyume/strip-3.jpg',
    imageAlt:
      'Wayne explains Satoyume\'s pride flywheel to Luna — outside recognition creates villager pride, which leads to better maintenance and hosting, attracting more visitors, creating more pride. A self-reinforcing cycle.',
    story: [
      'The most important thing Satoyume created was not a hotel — it was a "pride flywheel." The mechanism works like this: outside visitors come to the village and pay good money to experience something the villagers considered ordinary — their daily life, their food, their traditions. This external validation creates a shock of recognition: "Wait, people actually value what we have?"',
      'This recognition triggers a cascade of behavioral changes. Villagers start maintaining their homes more carefully — not because a hotel inspector demands it, but because they feel pride in showing their home to guests. They share local stories more warmly. They plant flowers, clean the streets, start small businesses to serve visitors. The village becomes more beautiful and more welcoming, which attracts more visitors, which generates more revenue and pride. The flywheel accelerates.',
      'Satoyume\'s partnership with JR East (Japan Railways) proved the model could scale. They formed "Ensen Marugoto Co." — a joint venture to turn the entire JR Ome Line into a distributed hotel. Unmanned train stations became hotel front desks and cafes. Farmhouses along the railway became guest rooms. This transformed a loss-making rural railway line into a destination experience. For JR East, this was not just a new revenue stream — it was a strategic answer to what to do with hundreds of rural stations losing passengers to demographic decline.',
      'Satoyume\'s founder, Shimada Shunpei, developed his philosophy from an unusual background. He spent his childhood in Thailand and India, where he witnessed Japanese logging companies stripping tropical forests. This experience gave him a deep sense of responsibility — a feeling that he owed something back to the places and communities that had been exploited. This personal history shaped Satoyume\'s core principle: not "how do we extract value from this place?" but "how do we serve this place\'s dream?"',
    ],
    facts: (
      <>
        <p><strong>Pride flywheel:</strong> External validation → Villager pride → Better maintenance/hosting → More visitors → More revenue → More pride. A self-reinforcing economic development cycle.</p>
        <p><strong>JR East partnership:</strong> Joint venture "Ensen Marugoto Co." turns the entire JR Ome Line into a distributed hotel. Unmanned stations become front desks and cafes. Loss-making lines become destinations.</p>
        <p><strong>Founder background:</strong> Shimada Shunpei grew up in Thailand and India. Witnessed Japanese companies logging tropical forests — felt personal responsibility to give back to communities.</p>
        <p><strong>"Dream-driven" not "problem-driven":</strong> Satoyume\'s core philosophy. Ask "what does this place dream of becoming?" not "what is wrong with this place?"</p>
        <p><strong>Scalable model:</strong> NIPPONIA brand now applied to multiple locations across Japan, each adapted to local character. Not a franchise — a philosophy adapted to each community.</p>
        <p><strong>SDG alignment:</strong> Satoyume\'s model aligns with UN Sustainable Development Goals — building inclusive, resilient communities and reducing inequalities.</p>
      </>
    ),
    lesson: (
      <>
        <p>The pride flywheel is one of the most important concepts in this entire series. It reveals that economic development is not just about money — it is about identity and meaning. People do not invest in places they are ashamed of. They do not maintain homes they see as worthless. The first step in reviving a community is not writing a check — it is helping people see their home through eyes that value it.</p>
        <p>This has profound implications beyond rural villages. It applies to schools, teams, companies, and even individuals. The most powerful force for improvement is not external pressure or incentives — it is the internal motivation that comes from feeling that what you do matters and is valued by others. Satoyume\'s real product is not hotel rooms. It is dignity.</p>
      </>
    ),
    lessonTitle: 'Dignity Is the Most Underrated Economic Input',
    tip: 'Ask your child: "Think of something you are really proud of — a drawing, a project, a skill. How does that pride make you act?" You probably want to improve it more, show it to people, and keep practicing. Now contrast that with something you feel embarrassed about — do you want to hide it, ignore it, or give up on it? Satoyume\'s insight is that the same psychology applies to entire communities. When people feel proud of where they live, they invest in it — not because they are paid to, but because they want to. This teaches kids that pride and dignity are not just feelings — they are forces that create real-world change.',
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

function AboutSatoyume() {
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
          <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-emerald-600 text-sm font-bold">SY</span>
          </div>
          <div>
            <p className="font-bold text-slate-800">About Satoyume</p>
            <p className="text-xs text-slate-400 mt-0.5">Turning Japan's fading villages into living destinations</p>
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
                  <p className="font-semibold text-slate-800 mb-1">What Satoyume Does</p>
                  <p>Satoyume is a "local business incubator" that revitalizes declining rural communities in Japan. Their signature approach: turn entire villages into distributed hotels (NIPPONIA brand), where abandoned houses become guest rooms and residents become hosts. Founded in 2012.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">The Philosophy</p>
                  <p>"Dream-driven" not "problem-driven." Instead of asking "what\'s wrong with this place?" they ask "what does this place dream of becoming?" This reframes decline not as a crisis to be managed but as an opportunity to rediscover and amplify what makes a community unique.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">The Business Model</p>
                  <p>High-value experiential tourism based on authentic immersion. Revenue from hotel operations, consulting, and partnerships (e.g., JR East joint venture). Capital-efficient because the "infrastructure" (abandoned houses, local knowledge) already exists — the investment is in renovation and curation, not construction.</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-slate-800 mb-1">The Founder</p>
                  <p>Shimada Shunpei — spent childhood in Thailand and India. Witnessed Japanese companies logging tropical forests, which created a lifelong commitment to serving communities rather than extracting from them. This personal history shapes every decision Satoyume makes.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">Why It Matters for Kids</p>
                  <p>The pride flywheel concept is one of the most powerful ideas in this series. It teaches that the most important resource for improving anything — a village, a classroom, a team, a skill — is not money or technology. It is the pride and dignity people feel about what they are part of. When people feel valued, they invest themselves. When they feel worthless, they withdraw. Understanding this dynamic gives kids a lens for seeing why some communities thrive and others decline — and what they can do about it.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">Learn More</p>
                  <p>
                    <a href="https://satoyume.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 font-medium">
                      satoyume.com
                    </a>
                    {' '}— company information and village projects (Japanese).
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

export default function WayneComicSatoyume() {
  const totalStrips = strips.length;
  return (
    <>
      <SEOHead
        title="Startup Stories #18: Satoyume — Turning Japan's Dying Villages Into Hotels | Wayne's Comics"
        description="A parent-child comic series about real startups. Episode 18: Satoyume — a Japanese company transforming abandoned rural villages into distributed hotels by redefining empty houses and elderly residents as valuable assets."
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
          <img src="/images/comics/satoyume/cover.jpg" alt="Startup Stories #18: Satoyume — reviving Japanese villages by turning them into living hotels" className="w-full h-auto" />
        </div>
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-bold rounded-full uppercase tracking-wide">
            Startup Stories · Episode 18 of 25
          </span>
          <span className="text-xs text-slate-400">June 2026 · {totalStrips} strips · 🇯🇵 Japan</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3 leading-tight">
          The Village That Became a Hotel
        </h1>
        <p className="text-slate-500 leading-relaxed mb-5 max-w-2xl">
          A village of 700 people. 45% over 65. 100 abandoned houses. The government 
          said it would disappear. Then Satoyume asked a different question: not "what\'s wrong 
          with this place?" but "what does this place dream of becoming?" The answer 
          transformed the entire village into a hotel — and sparked a nationwide movement. 
          Episode 18 of 25.
        </p>
        <ShareBar
          title="Startup Stories #18: Satoyume — Japan's Village Hotel Movement"
          summary="A 3-strip parent-child comic about Satoyume — transforming Japan's dying villages into distributed hotels, where abandoned houses become guest rooms and residents become hosts."
        />
      </motion.div>

      <div className="space-y-6 mb-10">
        {strips.map((strip, i) => (
          <motion.div key={strip.number} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.1 + i * 0.07 }}>
            <StripCard strip={strip} total={totalStrips} />
          </motion.div>
        ))}
      </div>

      <AboutSatoyume />

      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.4 }}
        className="flex items-center justify-between py-6 border-t border-slate-200 mb-10"
      >
        <Link to="/wayne/comics" className="text-sm text-slate-400 hover:text-slate-700 transition-colors">
          ← All Comics
        </Link>
        <ShareBar title="Startup Stories #18: Satoyume" summary="A parent-child comic about turning Japan's abandoned villages into distributed hotels through the power of pride and reframing." />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.45 }}
        className="bg-indigo-600 rounded-2xl px-8 py-10 text-center text-white"
      >
        <h2 className="text-xl font-bold mb-2">More startup stories coming</h2>
        <p className="text-indigo-100 text-sm mb-6 max-w-md mx-auto">
          This is Episode 18 of 25. Each story is about a real company solving a real problem — told in a way that makes sense to a 15-year-old, with analysis for the parent reading along.
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
