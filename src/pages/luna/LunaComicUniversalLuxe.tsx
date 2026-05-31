import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, MapPin, Sparkles } from 'lucide-react';
import { SEOHead } from '../../components/SEOHead';
import { ShareBar } from '../../components/ShareBar';

// ── Reusable sub-components (Luna's Premium Aesthetics) ────────────────

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
        📍 Universal Studios Fast Facts
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

// ── Comic strips data ──────────────────────────────────────────────────

const strips = [
  {
    number: 1,
    tag: 'The Departure',
    tagColor: 'bg-blue-100 text-blue-700',
    title: 'First Class All the Way',
    teaser: 'Here we go, Wayne! First class all the way!',
    image: '/images/comics/universal/panel-1-departure.jpg',
    imageAlt: 'Luna the rabbit pulling her USJ suitcase excitedly, while Wayne the cat stands next to her wearing an eye patch for dramatic effect at the boarding gate.',
    story: [
      'We arrived at the airport feeling like absolute royalty. Today, we weren\'t just traveling — we were flying first class to Orlando for our big Universal Studios adventure!',
      'Wayne put on a black eye patch. I asked him why, and he grunted that it was "for dramatic effect." The cat at the boarding gate just shook his head and handed us our boarding passes.'
    ],
    facts: (
      <>
        <p><strong>Orlando International Airport (MCO)</strong> is one of the busiest airports in the United States, welcoming over 50 million passengers annually.</p>
        <p><strong>First-class travel</strong> was first introduced by commercial airlines in the 1950s to cater to travelers looking for maximum luxury in the skies.</p>
      </>
    ),
    lessonTitle: 'Starting with Joy',
    lesson: (
      <>
        <p>Getting to a destination is half the fun. When you start a trip with a playful attitude (even with a dramatic eye patch), the waiting feels like part of the game.</p>
      </>
    ),
    tip: 'Check-in online 24 hours in advance to avoid long terminal lines, especially when traveling to popular family destinations like Orlando!'
  },
  {
    number: 2,
    tag: 'On the Plane',
    tagColor: 'bg-indigo-100 text-indigo-700',
    title: 'The Personal Pods',
    teaser: 'Oh my gosh, these suites are incredible! A personal pod!',
    image: '/images/comics/universal/panel-2-plane-pod.jpg',
    imageAlt: 'Luna looking amazed inside her private airplane pod, while Wayne is curled up on his cushion purring and enjoying his cozy setup.',
    story: [
      'We boarded the plane and gasped. Our seats were private pods! It felt like having a tiny, futuristic apartment in the clouds.',
      'Wayne immediately curled up on the soft cushions and let out a loud purr, declaring that the bed was absolutely perfect. I started playing with the built-in control screens.'
    ],
    facts: (
      <>
        <p><strong>Modern first-class pods</strong> are designed using advanced ergonomics, featuring seats that lay completely flat to form a 2-meter bed.</p>
        <p><strong>Noise-canceling technology</strong> works by emitting a sound wave that is the exact opposite of the ambient engine noise, canceling it out.</p>
      </>
    ),
    lessonTitle: 'Appreciating Comfort',
    lesson: (
      <>
        <p>Travel can be exhausting, so having a cozy place to rest is something to be truly grateful for. Taking a quiet moment to appreciate a comfortable seat helps calm pre-trip jitters.</p>
      </>
    ),
    tip: 'Bring a light sweater or scarf on the plane. Even in first class, cabin temperatures are kept cool to help passengers sleep and reduce motion sickness.'
  },
  {
    number: 3,
    tag: 'Sky Dining',
    tagColor: 'bg-orange-100 text-orange-700',
    title: 'Gourmet in the Clouds',
    teaser: 'Your gourmet selection. Enjoy! And special catnip water!',
    image: '/images/comics/universal/panel-3-sky-dining.jpg',
    imageAlt: 'Luna being served a gourmet salad by a cat flight attendant, while Wayne enjoys a fish bento box and a glass of premium catnip water.',
    story: [
      'The flight attendant served us a spectacular gourmet lunch. I had a fresh, colorful salad that looked so cute, and a fancy cocktail with a tiny umbrella.',
      'Wayne got a special bento box with grilled fish, and the attendant even brought him a glass of premium catnip water! He looked like the most pampered cat in the sky.'
    ],
    facts: (
      <>
        <p><strong>Airline catering is a massive industry</strong>. Food is prepared in specialized flight kitchens near the airport and kept chilled until heated on the plane.</p>
        <p><strong>Catnip (Nepeta cataria)</strong> contains a chemical compound called nepetalactone, which triggers a euphoric response in about 70-80% of domestic cats.</p>
      </>
    ),
    lessonTitle: 'Trying New Flavors',
    lesson: (
      <>
        <p>Eating fancy food in the sky is a treat. Sharing a meal with different options makes travel dining feel like a special event.</p>
      </>
    ),
    tip: 'Special dietary meals (like vegetarian or gluten-free) can be pre-ordered at least 24 hours before flight departure on most airlines.'
  },
  {
    number: 4,
    tag: 'Dreamland',
    tagColor: 'bg-purple-100 text-purple-700',
    title: 'Dreaming of Adventure',
    teaser: 'Dreaming of adventure... but first, the best sleep!',
    image: '/images/comics/universal/panel-4-sleeping.jpg',
    imageAlt: 'Luna and Wayne sleeping side-by-side in their lay-flat seats, with Wayne dreaming of the Universal Studios globe.',
    story: [
      'A few hours into the flight, the cabin lights dimmed. I tucked myself under a warm blanket, already dreaming of the rollercoasters and castles waiting for us.',
      'Wayne was fast asleep next to me, clutching his pillow. In his dream, he was already standing under the giant Universal Studios globe, ready to conquer the park.'
    ],
    facts: (
      <>
        <p><strong>Jet lag is caused by disruption to the circadian rhythm</strong>, our body\'s internal clock. Getting good sleep during the flight is a primary way to combat it.</p>
        <p><strong>The Universal Studios globe</strong> is one of the most photographed theme park landmarks in the world, rotating continuously in front of the park entrance.</p>
      </>
    ),
    lessonTitle: 'Resting Before the Rush',
    lesson: (
      <>
        <p>Theme parks require a lot of walking and energy. Getting a full sleep on the journey ensures you are ready to explore the moment you land.</p>
      </>
    ),
    tip: 'Avoid caffeine and heavy sweets right before sleeping on a long flight to ensure your sleep is deep and restful.'
  },
  {
    number: 5,
    tag: 'Grand Entrance',
    tagColor: 'bg-pink-100 text-pink-700',
    title: 'A Day of Wonder',
    teaser: 'Wayne and Luna arrive at the grand park for a day of wonder!',
    image: '/images/comics/universal/panel-5-entrance.jpg',
    imageAlt: 'Wayne and Luna standing in front of the Universal Studios Grand Entrance archway, excited to start their park day.',
    story: [
      'We finally arrived at the grand entrance of Universal Studios! The weather was perfect, and the giant archway loomed over us like the gates to another world.',
      'Wayne stood tall, declaring that his "phoenix senses" were tingling. I could feel the energy in the air — we were finally here!'
    ],
    facts: (
      <>
        <p><strong>Universal Studios Florida</strong> opened on June 7, 1990. The iconic archway design was inspired by classic Hollywood studio gates from the 1930s.</p>
        <p><strong>The park uses RFID technology</strong> in tickets and passes, allowing visitors to enter through the turnstiles with a quick tap.</p>
      </>
    ),
    lessonTitle: 'Entering the Magic',
    lesson: (
      <>
        <p>Walking through the main gates is a threshold. It is the moment where everyday life fades away and imagination takes over.</p>
      </>
    ),
    tip: 'Take a photo of your parking spot and entry ticket before entering the gates. It is very easy to forget where you parked after a long, fun day!'
  },
  {
    number: 6,
    tag: 'Rides',
    tagColor: 'bg-teal-100 text-teal-700',
    title: 'The Thrilling Fantasy Flight',
    teaser: 'Hold on tight, Luna! The Baroque Blaster has a high-speed start!',
    image: '/images/comics/universal/panel-6-blaster.jpg',
    imageAlt: 'Wayne and Luna riding the Golden Gryphon Express rollercoaster as it speeds off on a high-speed start.',
    story: [
      'For our first ride, we chose the legendary Golden Gryphon Express, featuring the high-speed Baroque Blaster launcher.',
      'As we buckled into the golden carriage, Wayne yelled "Hold on tight, Luna! This has a high-speed start!" Before I could answer, we shot forward like a rocket!'
    ],
    facts: (
      <>
        <p><strong>Launch coasters</strong> use electromagnetic propulsion (LSM) or hydraulic launches to accelerate trains from 0 to top speed in just a few seconds.</p>
        <p><strong>Gryphons</strong> are mythical creatures combining the body of a lion and the head and wings of an eagle, symbolizing strength and vigilance.</p>
      </>
    ),
    lessonTitle: 'Embracing the Launch',
    lesson: (
      <>
        <p>The initial acceleration is the scariest part of a rollercoaster. Trusting the safety harness and screaming out loud makes the fear turn into pure excitement.</p>
      </>
    ),
    tip: 'Secure all loose items like glasses, hats, and phones in the lockers provided at the entrance of high-speed coasters.'
  },
  {
    number: 7,
    tag: 'Coaster Peak',
    tagColor: 'bg-rose-100 text-rose-700',
    title: 'The Best Views',
    teaser: 'Screaming at the top with the best views of the park!',
    image: '/images/comics/universal/panel-7-views.jpg',
    imageAlt: 'Wayne and Luna smiling and holding on as they look out at the beautiful view from the top of the rollercoaster track.',
    story: [
      'We reached the highest peak of the Gryphon track. For a split second, the carriage hovered at the very top of the world.',
      'Wayne yelled "The best views!" as we looked out over the sparkling lakes, the winding tracks, and the tiny people below. Then, we plunged straight down!'
    ],
    facts: (
      <>
        <p><strong>Rollercoasters use kinetic and potential energy</strong>. The highest hill (the lift hill) stores potential energy, which converts to kinetic energy as the train drops.</p>
        <p><strong>Modern rollercoaster tracks</strong> are manufactured using high-precision steel tubes to ensure the wheels glide with minimal friction and maximum speed.</p>
      </>
    ),
    lessonTitle: 'Finding Beauty in the Rush',
    lesson: (
      <>
        <p>Even during the most fast-paced moments, there are split seconds of quiet beauty. Learning to look around and appreciate the view is a wonderful skill.</p>
      </>
    ),
    tip: 'Keep your eyes open during the drop! It actually helps reduce the feeling of stomach-drop and lets you enjoy the incredible perspective.'
  },
  {
    number: 8,
    tag: 'Sweets',
    tagColor: 'bg-amber-100 text-amber-700',
    title: 'Uniquely Crafted Treats',
    teaser: 'Indulging in uniquely crafted, themed treats! Wayne\'s Golden Bone and Luna\'s Glowing Nektar.',
    image: '/images/comics/universal/panel-8-provisions.jpg',
    imageAlt: 'Close-up of the delicious themed snacks from The Parvenu\'s Provisions: a golden paw-shaped cookie and a glowing pink phoenix-themed popsicle.',
    story: [
      'All that riding made us hungry, so we stopped at The Parvenu\'s Provisions. They served the most beautiful, luxurious theme snacks.',
      'Wayne got a golden, paw-shaped cookie called Wayne\'s Golden Bone. I got a phoenix-themed ice popsicle called Luna\'s Glowing Nektar. The taste was absolutely exquisite!'
    ],
    facts: (
      <>
        <p><strong>Theme park food design</strong> is a growing art form, with chefs creating custom treats that tell a story or match specific fictional worlds.</p>
        <p><strong>Gold leaf used on desserts</strong> is 23 to 24-karat gold, which is biologically inert and passes through the body without being absorbed.</p>
      </>
    ),
    lessonTitle: 'Savoring the Treats',
    lesson: (
      <>
        <p>Special treats are meant to be enjoyed slowly. Taking the time to look at the details and savor the flavor makes the snack feel like a work of art.</p>
      </>
    ),
    tip: 'Look for custom snack locations inside the park rather than general food courts. The themed areas often have unique treats you can\'t find anywhere else!'
  },
  {
    number: 9,
    tag: 'Checking In',
    tagColor: 'bg-red-100 text-red-700',
    title: 'The Golden Phoenix Plaza',
    teaser: 'Checking in to our opulent hotel stay!',
    image: '/images/comics/universal/panel-9-hotel.jpg',
    imageAlt: 'Wayne and Luna checking in at the front desk of the opulent Golden Phoenix Plaza Hotel, surrounded by luxurious decor.',
    story: [
      'After a full day in the park, we checked in to the magnificent Golden Phoenix Plaza Hotel. The lobby was covered in gold, with huge crystal chandeliers hanging from the ceiling.',
      'We walked up to the counter, feeling like VIP guests. Wayne immediately hopped up to inspect the check-in bell, while I admired the elegant gold statues.'
    ],
    facts: (
      <>
        <p><strong>Theme park resort hotels</strong> are designed to keep guests "in the story" even after they leave the park, using music, decor, and custom styling.</p>
        <p><strong>Opulent chandeliers</strong> in historic hotels often use lead crystal, which has a high refractive index to split light into brilliant rainbows.</p>
      </>
    ),
    lessonTitle: 'Checking in to Rest',
    lesson: (
      <>
        <p>A beautiful hotel lobby is like a gateway to relaxation. Stepping into a quiet, cool space after a long day in the sun is a great transition to rest.</p>
      </>
    ),
    tip: 'Staying at official park resort hotels often includes perks like early park admission or free express passes!'
  },
  {
    number: 10,
    tag: 'Night Magic',
    tagColor: 'bg-violet-100 text-violet-700',
    title: 'Pure Comfort and Luxury',
    teaser: 'Our private spa awaits! The perfect end to a perfectly lavish adventure.',
    image: '/images/comics/universal/panel-10-spa.jpg',
    imageAlt: 'Wayne and Luna relaxing in their hotel suite, with a clawfoot bathtub prepared and Wayne sleeping comfortably on the bed.',
    story: [
      'Our hotel room was a dream. It had a giant, plush bed with gold covers, and a private clawfoot bathtub waiting for us.',
      'Wayne took off his eye patch and curled up on the bed, while I prepared a warm bath with Luna\'s Feather Fluffing Salts and Wayne\'s Whisker Wax. It was the perfect end to a lavish adventure.'
    ],
    facts: (
      <>
        <p><strong>Warm baths help relax muscles</strong> by increasing blood circulation and dilating blood vessels, which speeds up recovery after walking miles in a theme park.</p>
        <p><strong>Luxury hotel bedding</strong> often uses high-thread-count Egyptian cotton, which is woven with longer fibers to create a softer, more durable fabric.</p>
      </>
    ),
    lessonTitle: 'Resting in Luxury',
    lesson: (
      <>
        <p>Taking care of your body after a long day of adventure is essential. A warm bath, a cozy bed, and a quiet room are the best rewards for a day well-spent.</p>
      </>
    ),
    tip: 'Fill the tub with warm water and soak your feet for 10-15 minutes after a park day. It prevents sore muscles the next morning!'
  }
];

// ── Universal Guide (collapsible) ────────────────────────────────────

function UniversalGuide() {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white border-2 border-pink-100 rounded-3xl overflow-hidden shadow-sm">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-6 py-5 hover:bg-pink-50/30 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <MapPin className="w-4 h-4 text-pink-600" />
          </div>
          <div>
            <p className="font-bold text-slate-800">Luna's Universal Survival Guide</p>
            <p className="text-xs text-slate-400 mt-0.5">Luxe ride selections, themed snacks, and hotel perks!</p>
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
            <div className="border-t border-pink-50 px-6 py-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-600 leading-relaxed font-sans">
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-slate-800 mb-1">🍰 Opulent Snack Picks</p>
                  <p>1. <strong>Wayne's Golden Bone</strong>: A rich butter cookie covered in edible gold dust. 2. <strong>Luna's Glowing Nektar</strong>: A dragon-fruit and strawberry phoenix-shaped popsicle that glows under blacklight. 3. <strong>Catnip Brew</strong>: A refreshing carbonated mint beverage served at the Plaza Hotel.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">🏰 Express Pass Strategy</p>
                  <p>If you stay at official premier hotels, Universal Express Unlimited is included for free! This lets you bypass regular lines at most attractions as many times as you want.</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-slate-800 mb-1">🎢 Rollercoaster Order</p>
                  <p>Ride high-launch coasters like the Golden Gryphon Express first thing in the morning. Afternoon queues can grow long, making it a perfect time to head back to the hotel for a spa session or pool break.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">🛁 Post-Park Spa Checklist</p>
                  <p>Prepare a warm bath with <strong>Feather Fluffing Salts</strong> to ease muscle tension, apply <strong>Whisker Wax</strong> for a soothing facial rub, and get a solid 8 hours of sleep on Egyptian cotton sheets to be ready for Day 2!</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Individual comic strip card ──────────────────────────────────────

function StripCard({ strip }: { strip: typeof strips[0] }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      layout
      className="bg-white border-2 border-pink-100 rounded-3xl overflow-hidden hover:border-pink-200 transition-all shadow-sm"
    >
      {/* Image */}
      <div className="overflow-hidden bg-slate-50 border-b border-pink-50 aspect-[4/3] sm:aspect-video relative">
        <img
          src={strip.image}
          alt={strip.imageAlt}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm border border-pink-100 rounded-xl px-3 py-1 font-bold text-pink-600 text-xs shadow-sm">
          Panel {strip.number} of 10
        </div>
      </div>

      {/* Title & Teaser */}
      <div className="px-6 pt-5 pb-4">
        <div className="flex items-center gap-2 mb-3">
          <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${strip.tagColor}`}>
            {strip.tag}
          </span>
          <span className="text-xs text-slate-400">Story {strip.number} of 10</span>
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">{strip.title}</h2>
        <p className="text-sm text-slate-600 leading-relaxed italic">"{strip.teaser}"</p>
      </div>

      {/* Toggle button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-6 py-3.5 border-t border-pink-50 hover:bg-pink-50/20 transition-colors text-left"
      >
        <span className="text-sm font-semibold text-pink-500 hover:text-pink-600 flex items-center gap-1">
          <Sparkles className="w-4 h-4" /> {open ? 'Hide details' : 'Read the full story, facts & lesson'}
        </span>
        {open ? <ChevronUp className="w-4 h-4 text-pink-400" /> : <ChevronDown className="w-4 h-4 text-pink-400" />}
      </button>

      {/* Expandable content */}
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
              {/* Story */}
              <StorySection title="The Story Behind the Strip">
                {strip.story.map((para, i) => (
                  <p key={i} className="text-slate-700 leading-relaxed text-sm">{para}</p>
                ))}
              </StorySection>

              {/* Facts */}
              <FactBox>{strip.facts}</FactBox>

              {/* Lesson */}
              <LessonBox title={strip.lessonTitle}>{strip.lesson}</LessonBox>

              {/* Travel tip */}
              <LunaTip>{strip.tip}</LunaTip>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Main page ────────────────────────────────────────────────────────

export default function LunaComicUniversalLuxe() {
  return (
    <>
      <SEOHead
        title="Universal Luxe Adventure | Luna's Journey"
        description="Follow Luna and Wayne's luxurious trip to Universal Studios! A cute 10-panel comic adventure with deluxe travel tips and stories."
      />

      {/* Back nav */}
      <div className="mb-8">
        <Link
          to="/luna"
          className="inline-flex items-center gap-2 text-sm text-pink-500 hover:text-pink-600 font-semibold transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Journey
        </Link>
      </div>

      {/* Cover / Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-10 text-center"
      >
        <div className="rounded-3xl overflow-hidden border-2 border-pink-100 shadow-md mb-7 max-w-4xl mx-auto aspect-[16/9] bg-pink-100 relative">
          <img
            src="/images/comics/universal/cover.jpg"
            alt="Luna & Wayne's Universal Luxe Adventure"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-pink-900/60 via-transparent to-transparent flex items-end p-6 justify-center">
            <div className="text-white text-center">
              <span className="inline-block px-3 py-1 bg-yellow-400 text-slate-900 text-xs font-bold rounded-full uppercase tracking-wider mb-2">
                New Comic Book 🐰
              </span>
              <h1 className="text-2xl sm:text-4xl font-bold font-header drop-shadow-md">
                Luna and Wayne's Universal Luxe Adventure
              </h1>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-3 mb-4">
          <span className="px-3 py-1 bg-pink-100 text-pink-800 text-xs font-bold rounded-full uppercase tracking-wide">
            Travel Series · Issue #2
          </span>
          <span className="text-xs text-slate-400">May 2026 · 10 Panels</span>
        </div>

        <p className="text-slate-500 leading-relaxed mb-6 max-w-2xl mx-auto font-sans">
          First-class flights, private airplane pods, high-speed launch coasters, and opulent golden hotels. 
          Read through 10 cute comic panels following their ultra-luxurious trip to Universal Studios!
        </p>

        <div className="flex justify-center">
          <ShareBar
            title="Luna & Wayne's Universal Luxe Adventure"
            summary="A fun 10-panel comic travel diary to Universal Studios by Luna and Wayne!"
          />
        </div>
      </motion.div>

      {/* 10 Comic Strips (2-column grid) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
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

      {/* Universal Guide (collapsible) */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12 max-w-4xl mx-auto"
      >
        <UniversalGuide />
      </motion.div>

      {/* Bottom Navigation / CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="flex items-center justify-between py-6 border-t border-pink-100 mb-10 max-w-4xl mx-auto"
      >
        <Link
          to="/luna"
          className="text-sm text-pink-500 hover:text-pink-600 font-bold transition-colors"
        >
          ← Back to Luna's Journey
        </Link>
        <ShareBar
          title="Luna & Wayne's Universal Luxe Adventure"
          summary="An illustrated Universal Studios travel diary."
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
    </>
  );
}
