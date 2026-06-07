import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { SEOHead } from '../../components/SEOHead';
import { ShareBar } from '../../components/ShareBar';
import { CommentSection } from '../../components/CommentSection';

function StorySection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-rose-50/60 border-l-4 border-rose-400 rounded-r-2xl p-5">
      <p className="text-xs font-bold text-rose-600 uppercase tracking-wide mb-2 flex items-center gap-1">
        <Sparkles className="w-3 h-3" /> {title}
      </p>
      <div className="text-sm text-slate-700 leading-relaxed font-handwritten space-y-2">{children}</div>
    </div>
  );
}

function FactBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-yellow-50/60 border border-yellow-200 rounded-2xl p-5">
      <p className="text-xs font-bold text-amber-700 uppercase tracking-wide mb-3 flex items-center gap-1">
        🇯🇵 Japan Fast Facts
      </p>
      <div className="text-sm text-slate-700 leading-relaxed space-y-2">{children}</div>
    </div>
  );
}

function LessonBox({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-pink-50 border-l-4 border-pink-400 rounded-r-2xl p-5">
      <p className="text-xs font-bold text-pink-600 uppercase tracking-wide mb-2">⭐ Lesson: {title}</p>
      <div className="text-sm text-slate-700 leading-relaxed space-y-2">{children}</div>
    </div>
  );
}

function LunaTip({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-purple-50 border border-purple-200 rounded-2xl p-5 flex gap-3">
      <span className="text-purple-500 text-lg flex-shrink-0">💡</span>
      <div>
        <p className="text-xs font-bold text-purple-700 uppercase tracking-wide mb-1">Luna's Travel Tip</p>
        <p className="text-sm text-slate-700 leading-relaxed">{children}</p>
      </div>
    </div>
  );
}

const strips = [
  {
    number: 1,
    tag: 'Tokyo Arrival',
    tagColor: 'bg-blue-100 text-blue-700',
    title: '1. Welcome to Japan!',
    teaser: "Flying past Mount Fuji, arriving at Narita Airport, boarding the train to Tokyo, and stepping into the bustling crowd of Shibuya.",
    image: '/images/comics/japan/strip-1.jpg',
    imageAlt: "Wayne & Luna's arrival in Japan. Panels show: looking out the plane window at Mount Fuji, arriving at Narita Airport, riding the clean train to Tokyo, and standing at Shibuya Crossing.",
    story: [
      '"Finalmente! Wayne, look! Is that Fuji?!" I pressed my face against the window as the airplane descended. Wayne pointed at the snow-capped peak in the distance. "It\'s even more beautiful than I imagined!"',
      '"ようこそ日本へ! So many symbols!" I looked around Narita Airport, wide-eyed. Wayne rolled our suitcases and grinned. "I think I can read some of these kanji! Let\'s go!"',
      '"It\'s so peaceful..." I sighed, gazing out the train window at the quiet Japanese countryside. "A perfect start to our adventure," Wayne agreed, looking out the other side.',
      '"This is it... Shibuya Crossing!" Wayne gasped. I looked at the sea of people. "Wow! So many people!" We prepared to dive into the world\'s most famous scramble.'
    ],
    facts: (
      <>
        <p><strong>Mount Fuji</strong> is Japan\'s highest peak at 3,776 meters. It is an active volcano and a sacred symbol of the country, frequently depicted in Japanese art and literature.</p>
        <p><strong>Narita Airport</strong> is the main international gateway to Tokyo, located in Chiba Prefecture, about 60 kilometers east of central Tokyo. It is connected to the city via high-speed train lines.</p>
        <p><strong>Shibuya Crossing</strong> is often called the world\'s busiest pedestrian crossing, with up to 3,000 people crossing at a single time during peak hours when all traffic stops in all directions.</p>
      </>
    ),
    lessonTitle: 'The Journey Begins',
    lesson: (
      <>
        <p>Traveling to a new country can feel overwhelming with different languages and crowds. Embrace the excitement, take it step-by-step, and enjoy the transition from quiet countryside to bustling metropolis.</p>
      </>
    ),
    tip: 'Buy a digital or physical IC transit card (like Suica or Pasmo) at the airport for seamless train and subway travel throughout Tokyo, and take the Narita Express (N\'EX) for a direct link to Shibuya.'
  },
  {
    number: 2,
    tag: 'Shibuya & Train',
    tagColor: 'bg-yellow-100 text-yellow-700',
    title: '2. Shibuya Scramble & Bullet Train',
    teaser: "Navigating the busy Shibuya crossing, sharing a delicious bowl of ramen at a tiny counter, visiting Senso-ji Temple, and boarding the high-speed Shinkansen.",
    image: '/images/comics/japan/strip-2.jpg',
    imageAlt: "Wayne & Luna exploring Tokyo and riding the Shinkansen. Panels show: navigating crowded Shibuya Scramble crossing, eating hot ramen at a tiny counter, holding amulets at Senso-ji temple, and opening a bento box on the bullet train.",
    story: [
      '"EXCITED! BUSY!" I called out as we navigated the crowded Shibuya streets. "Stay close, Luna!" Wayne said. "Don\'t worry, I\'m right here!" I cheered, holding his hand tight.',
      '"Delicious!" I slurped my noodles happily. Wayne held his chopsticks with focus. "Mogu mogu... this is the best ramen I\'ve ever tasted! I could eat this every single day!"',
      'We stood in front of the giant red lantern of Senso-ji Temple. "Let\'s make a wish!" I suggested, holding our omikuji papers. "To many more happy travels," Wayne smiled.',
      '"On to the next adventure! ZOOM!" We sat comfortably on the Shinkansen bullet train, opening a cute bento box as Mt. Fuji sped past our window.'
    ],
    facts: (
      <>
        <p><strong>Ramen Counters</strong>: Many traditional Japanese ramen shops (like Ichiran) feature individual booths or counter seating designed for quick, focused dining, allowing you to appreciate the broth fully.</p>
        <p><strong>Senso-ji Temple</strong> is Tokyo\'s oldest temple, founded in 628 AD in the historic Asakusa district, dedicated to the Bodhisattva Kannon (the Goddess of Mercy).</p>
        <p><strong>The Shinkansen</strong> is Japan\'s high-speed rail network, famous for its punctuality (average delay is under a minute) and speeds reaching up to 320 km/h.</p>
      </>
    ),
    lessonTitle: 'Savoring the Small Moments',
    lesson: (
      <>
        <p>In a fast-paced trip, take time to enjoy the simple pleasures — a hot bowl of ramen, a quiet moment of reflection at a temple, or a delicious bento box on a high-speed train.</p>
      </>
    ),
    tip: 'When visiting temples like Senso-ji, purchase an omikuji (fortune slip). If it is a good fortune, keep it; if it is bad, tie it to the metal racks so the bad fortune stays behind!'
  },
  {
    number: 3,
    tag: 'Matsuri Festival',
    tagColor: 'bg-indigo-100 text-indigo-700',
    title: '3. Lost at the Matsuri',
    teaser: "Exploring a lively Japanese summer festival, enjoying the taiko drum performance, and the panic of getting separated in the dense crowd.",
    image: '/images/comics/japan/strip-3.jpg',
    imageAlt: "Wayne & Luna getting separated at a festival. Panels show: holding hands in a crowded street with food stalls, watching taiko drummers perform, Wayne panicking in the crowd calling for Luna, and Luna sitting lost on shrine steps under fireworks.",
    story: [
      'The matsuri night was busy and exciting! We walked hand-in-hand through the festival stalls. The air smelled like Takoyaki, Ramen, and Yakitori. "It\'s so lively!" I beamed.',
      '"Wow, those drums are so cool!" I gasped, watching a magnificent taiko drum performance. "BOOM! TAKA! TAKA!" went the beats, vibrating through my chest.',
      'But when the performance ended, the crowd surged. "Luna?! Wait, where did you go?! LUNA!" Wayne sweated in panic, looking at the ocean of festival-goers. We were separated in the crowd.',
      '"I\'m lost... I hope Wayne finds me." I sat sadly on the steps of a quiet shrine, lit by stone lanterns, watching the colorful fireworks fill the night sky.'
    ],
    facts: (
      <>
        <p><strong>Matsuri</strong> are traditional Japanese festivals held throughout the year, featuring food stalls (yatai), game booths, and energetic performances.</p>
        <p><strong>Taiko</strong> are traditional Japanese drums played in ensembles. The performances are highly athletic and form a core part of summer festivals.</p>
        <p><strong>Yatai</strong> are mobile food stalls that sell delicious street food like takoyaki (octopus balls), yakitori (skewered chicken), and kakigori (shaved ice).</p>
      </>
    ),
    lessonTitle: 'Staying Calm When Lost',
    lesson: (
      <>
        <p>Large festivals are exciting but crowded, making separation easy. If you get separated, do not panic. Head toward a quiet, recognizable landmark like a shrine entrance and stay put.</p>
      </>
    ),
    tip: 'Japanese summer festivals are hot and crowded. Dress in a light yukata or comfortable clothes, bring a hand fan (uchiwa), and always designate a meeting point before entering.'
  },
  {
    number: 4,
    tag: 'Fuji Reunion',
    tagColor: 'bg-pink-100 text-pink-700',
    title: '4. Reunion under Mount Fuji',
    teaser: "Looking out from Tokyo Skytree, remembering their promise, a heartwarming reunion under the Mt. Fuji sunset, and a magical farewell.",
    image: '/images/comics/japan/strip-4.jpg',
    imageAlt: "Wayne & Luna's Japan reunion and farewell. Panels show: Luna looking at Mt. Fuji from Tokyo Skytree, Wayne hugging Luna by a lake with Mt. Fuji in the background, cooking okonomiyaki together, and saying farewell at the airport under cherry blossoms.",
    story: [
      'I looked out from Tokyo Skytree at the setting sun. "We said... the tallest landmark." I remembered our promise to meet at the highest spot if we ever got separated, and looked at Mt. Fuji far away.',
      'Wayne ran up to the lakeside where I had walked down to. "Finally!" he cried. We ran and embraced under the purple sunset, Mt. Fuji reflecting beautifully in the calm water. "I found you!"',
      'We celebrated our reunion at a cozy grill. "It\'s the best! And with you!" I laughed, flipping the cabbage pancake. "Absolutely! More bonito flakes!" Wayne cheered.',
      '"What a trip! Until next time!" We stood at the airport under blooming cherry blossoms, holding travel amulets. "A magical ending... until we meet again."'
    ],
    facts: (
      <>
        <p><strong>Tokyo Skytree</strong> is the tallest structure in Japan and the third tallest structure in the world at 634 meters, offering stunning panoramic views of Tokyo and Mount Fuji.</p>
        <p><strong>Okonomiyaki</strong> is a savory Japanese cabbage pancake cooked on a flat teppan grill. The name means "grilled as you like," and it is a fun, interactive meal.</p>
        <p><strong>Omamori</strong> are Japanese amulets sold at Shinto shrines and Buddhist temples, providing protection and good luck for travel, health, or studies.</p>
      </>
    ),
    lessonTitle: 'Promises Keep Us Connected',
    lesson: (
      <>
        <p>No matter how far apart we wander or get lost in the busy moments of life, shared promises and a clear direction will always bring us back together to celebrate our achievements.</p>
      </>
    ),
    tip: 'Tokyo Skytree tickets should be booked in advance for the sunset slot to catch the spectacular view of Mount Fuji silhouetted against the orange sky.'
  }
];

function StripCard({ strip }: { strip: typeof strips[0] }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      layout
      className="bg-white border-2 border-pink-100 rounded-3xl overflow-hidden hover:border-pink-200 transition-all shadow-sm"
    >
      <div className="overflow-hidden bg-slate-50 border-b border-pink-50 relative">
        <img
          src={strip.image}
          alt={strip.imageAlt}
          className="w-full h-auto object-contain"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm border border-pink-100 rounded-xl px-3 py-1 font-bold text-pink-600 text-xs shadow-sm">
          Comic Strip (4 Panels)
        </div>
      </div>

      <div className="px-6 pt-5 pb-4">
        <div className="flex items-center gap-2 mb-3">
          <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${strip.tagColor}`}>
            {strip.tag}
          </span>
          <span className="text-xs text-slate-400">Story {strip.number} of 4</span>
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">{strip.title}</h2>
        <p className="text-sm text-slate-600 leading-relaxed italic">"{strip.teaser}"</p>
      </div>

      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-6 py-3.5 border-t border-pink-50 hover:bg-pink-50/20 transition-colors text-left"
      >
        <span className="text-sm font-semibold text-pink-500 hover:text-pink-600 flex items-center gap-1">
          <Sparkles className="w-4 h-4" /> {open ? 'Hide details' : 'Read the full story, facts & lesson'}
        </span>
        {open ? <ChevronUp className="w-4 h-4 text-pink-400" /> : <ChevronDown className="w-4 h-4 text-pink-400" />}
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
            <div className="px-6 pb-8 space-y-6 border-t border-pink-50 pt-6 bg-pink-50/10">
              <StorySection title="The Story Behind the Strip">
                {strip.story.map((para, i) => (
                  <p key={i} className="text-slate-700 leading-relaxed text-sm">{para}</p>
                ))}
              </StorySection>

              <FactBox>{strip.facts}</FactBox>

              <LessonBox title={strip.lessonTitle}>{strip.lesson}</LessonBox>

              <LunaTip>{strip.tip}</LunaTip>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function LunaComicJapan() {
  return (
    <>
      <SEOHead
        title="Luna & Wayne: Japan Trip | Luna's Journey"
        description="Join Wayne and Luna on their Japanese adventure! A 4-part chibi storybook comic about Tokyo, Shibuya Crossing, ramen, bullet trains, matsuri festivals, and Skytree reunions."
        ogImage="/images/comics/japan/cover.jpg"
      />

      <div className="mb-8">
        <Link
          to="/luna/comics"
          className="inline-flex items-center gap-2 text-sm text-pink-500 hover:text-pink-600 font-semibold transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Comics Library
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-10 text-center"
      >
        <div className="rounded-3xl overflow-hidden border-2 border-pink-100 shadow-md mb-7 max-w-4xl mx-auto aspect-[16/9] bg-pink-100 relative">
          <img
            src="/images/comics/japan/cover.jpg"
            alt="Luna & Wayne: Japan Trip Cover"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-pink-900/60 via-transparent to-transparent flex items-end p-6 justify-center">
            <div className="text-white text-center">
              <span className="inline-block px-3 py-1 bg-yellow-400 text-slate-900 text-xs font-bold rounded-full uppercase tracking-wider mb-2">
                Chibi Storybook Series 🐰
              </span>
              <h1 className="text-2xl sm:text-4xl font-bold font-header drop-shadow-md">
                Luna & Wayne: Japan Trip
              </h1>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-3 mb-4">
          <span className="px-3 py-1 bg-red-100 text-red-800 text-xs font-bold rounded-full uppercase tracking-wide">
            Travel Series · Issue #10
          </span>
          <span className="text-xs text-slate-400">June 2026 · 4 Strips</span>
        </div>

        <p className="text-slate-500 leading-relaxed mb-6 max-w-2xl mx-auto font-sans">
          A spectacular travel adventure through Japan! Follow Luna the rabbit and Wayne the cat as they land in Tokyo, explore the chaotic Shibuya Crossing, eat hot ramen, visit historic Asakusa, ride the Shinkansen, experience a summer Matsuri festival, and find each other at Tokyo Skytree under the sunset.
        </p>

        <div className="flex justify-center">
          <ShareBar
            title="Luna & Wayne: Japan Trip"
            summary="A charming 4-strip chibi storybook trip to Japan by Wayne and Luna!"
          />
        </div>
      </motion.div>

      <div className="space-y-8 mb-12 max-w-4xl mx-auto">
        {strips.map((strip) => (
          <motion.div
            key={strip.number}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.35, delay: 0.05 }}
          >
            <StripCard strip={strip} />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="flex items-center justify-between py-6 border-t border-pink-100 mb-10 max-w-4xl mx-auto"
      >
        <Link
          to="/luna/comics"
          className="text-sm text-pink-500 hover:text-pink-600 font-bold transition-colors"
        >
          ← Back to Comics Library
        </Link>
        <ShareBar
          title="Luna & Wayne: Japan Trip"
          summary="An illustrated Japan travel diary."
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-3xl px-8 py-10 text-center text-white shadow-md max-w-4xl mx-auto"
      >
        <h2 className="text-2xl font-bold font-header mb-2">Want to see more adventures?</h2>
        <p className="text-pink-100 text-sm mb-6 max-w-md mx-auto">
          Luna updates her learning journal and creative projects every Sunday. Check out the weekly logs to see what we build next!
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/luna"
            className="inline-flex items-center justify-center gap-2 bg-white text-pink-600 font-bold text-sm px-6 py-3 rounded-2xl hover:bg-pink-50 transition-colors shadow-sm"
          >
            Explore My Journal
          </Link>
          <a
            href={import.meta.env.PROD ? 'https://wayne.bunnyuniverse.com' : '/?persona=wayne'}
            className="inline-flex items-center justify-center gap-2 bg-pink-600 text-white border border-pink-400 font-bold text-sm px-6 py-3 rounded-2xl hover:bg-pink-700 transition-colors shadow-sm"
          >
            Visit Wayne's Plans
          </a>
        </div>
      </motion.div>
      <CommentSection />
    </>
  );
}
