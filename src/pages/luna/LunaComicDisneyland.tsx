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
        📍 Disneyland Fast Facts
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
    title: 'The Wait',
    teaser: 'Long plane wait... still at the gate. So tired and so very bored!',
    image: '/images/comics/disneyland/panel-1-wait.jpg',
    imageAlt: 'Luna the rabbit laying on the airport terminal seats looking bored, while Wayne the cat sits nearby waiting at the gate.',
    story: [
      'Waiting at the airport gate feels like it takes a million years! I was so tired and lay down across the terminal chairs.',
      'Wayne was trying to read, but even he looked super bored, flipping pages without really reading them. I just wanted to get on the plane already!'
    ],
    facts: (
      <>
        <p><strong>Major airports have designated family play areas</strong> designed to let kids burn off energy before long flights.</p>
        <p><strong>Flight delays are most common in the afternoon</strong> due to cascading schedules. Morning flights have the best on-time record.</p>
      </>
    ),
    lessonTitle: 'Patience at the Gate',
    lesson: (
      <>
        <p>Waiting is a part of every big trip. Instead of fighting the boredom, sometimes you just have to rest your eyes and save your energy for the adventure ahead.</p>
      </>
    ),
    tip: 'Bring a small card game or download an offline game on your phone for gate delays. And always look for family lounges!'
  },
  {
    number: 2,
    tag: 'Takeoff',
    tagColor: 'bg-indigo-100 text-indigo-700',
    title: 'The Adventure Begins',
    teaser: 'Finally on our way! It is so far, so first: nap time!',
    image: '/images/comics/disneyland/panel-2-begins.jpg',
    imageAlt: 'Luna and Wayne sitting in their airplane seats. Luna has a bag with a Disneyland sticker. They are ready to nap.',
    story: [
      'We finally boarded the plane! The seats were so cozy, and I buckled my seatbelt right away.',
      'I had my special travel suitcase under the seat, covered in colorful stickers including my favorite shiny Disneyland castle sticker. Since the flight was super long, we decided to take a nice nap to recharge our batteries for the big park!'
    ],
    facts: (
      <>
        <p><strong>Cruising altitude for commercial flights</strong> is typically between 30,000 and 42,000 feet. That is almost 8 miles straight up in the air!</p>
        <p><strong>Cabin pressure makes the air very dry</strong>, which is why travelers get dehydrated faster in the sky than on the ground.</p>
      </>
    ),
    lessonTitle: 'Recharging Early',
    lesson: (
      <>
        <p>Excitement makes it hard to sleep, but sleeping on the plane is the best way to avoid being too tired when you arrive.</p>
      </>
    ),
    tip: 'Pack an inflatable neck pillow and a soft eye mask in your carry-on to make airplane naps much easier.'
  },
  {
    number: 3,
    tag: 'Sky Dining',
    tagColor: 'bg-orange-100 text-orange-700',
    title: 'In-Flight Feast',
    teaser: 'These are so good! Tuna crackers! And this cookie is magical!',
    image: '/images/comics/disneyland/panel-3-feast.jpg',
    imageAlt: 'Luna and Wayne eating snacks on the plane. Wayne has goldfish crackers (Tuna crackers) and Luna has a Mickey Mouse-shaped chocolate cookie.',
    story: [
      'Plane food can be hit or miss, but this time it was amazing!',
      'We got yummy goldfish crackers (which Wayne insisted on calling Tuna crackers because he is a cat) and a special Mickey-shaped chocolate cookie. Eating sweets in the sky makes them taste twice as magical!'
    ],
    facts: (
      <>
        <p><strong>High altitude drops our sense of taste and smell</strong> by about 20% to 30% due to low cabin humidity and pressure. That is why airplane snacks often taste different!</p>
        <p><strong>Goldfish crackers were originally invented in Switzerland</strong> in 1958 as a soup cracker before becoming a popular snack.</p>
      </>
    ),
    lessonTitle: 'Making Snacks Fun',
    lesson: (
      <>
        <p>A simple snack becomes a feast when you share a laugh. Wayne\'s silly joke about Tuna crackers made the plane ride much more fun.</p>
      </>
    ),
    tip: 'Pack your own favorite snacks in your bag. High altitude can make you extra hungry, and plane service can sometimes be delayed.'
  },
  {
    number: 4,
    tag: 'Dreamland',
    tagColor: 'bg-purple-100 text-purple-700',
    title: 'Dreaming of Castles',
    teaser: 'Snore-patch-zz... falling asleep dreaming of beautiful castles.',
    image: '/images/comics/disneyland/panel-4-dreaming.jpg',
    imageAlt: 'Luna and Wayne sleeping side-by-side on the plane, with a thought bubble above Luna showing a glowing pink and blue fairy-tale castle.',
    story: [
      'As we flew closer and closer, I fell fast asleep.',
      'In my dream, I could see the giant pink and blue castle shining right through the clouds, surrounded by flying rabbits and sparkle dust. I couldn\'t wait to see it in real life!'
    ],
    facts: (
      <>
        <p><strong>Sleeping on a plane helps your brain adjust</strong> to new time zones faster, reducing jet lag so you are ready to run to the rides as soon as you land!</p>
        <p><strong>Lucid dreaming</strong>, where you know you are dreaming and can control the events, is a skill that can be practiced over time.</p>
      </>
    ),
    lessonTitle: 'Visualizing the Goal',
    lesson: (
      <>
        <p>Dreaming about your destination builds healthy excitement and keeps your spirits high during long journeys.</p>
      </>
    ),
    tip: 'Drink plenty of water before trying to sleep on a plane, as dry cabin air can wake you up feeling dehydrated.'
  },
  {
    number: 5,
    tag: 'First View',
    tagColor: 'bg-pink-100 text-pink-700',
    title: 'Arrival!',
    teaser: 'Look! There it is! The real castle! Magical dreams come true!',
    image: '/images/comics/disneyland/panel-5-airport-arrival.jpg',
    imageAlt: 'Luna and Wayne looking out of the big airport window at the Disneyland castle standing tall in the distance.',
    story: [
      'We landed! We grabbed our bags and pushed our luggage cart near the giant windows of the terminal.',
      'Far in the distance, past the highway and the trees, we could see the outline of the castle rising up. It felt like we were walking straight into a fairy tale book!'
    ],
    facts: (
      <>
        <p><strong>The Sleeping Beauty Castle is 77 feet tall</strong>. It was designed to look taller than it actually is by using a technique called forced perspective — making the bricks and details get smaller near the top!</p>
        <p><strong>It was inspired by Neuschwanstein Castle</strong> in Bavaria, Germany, which Wayne visited once and said was very drafty.</p>
      </>
    ),
    lessonTitle: 'The Power of Scale',
    lesson: (
      <>
        <p>Seeing the castle in the distance makes the dream feel real. Even before entering the park, the excitement of arrival is a special memory.</p>
      </>
    ),
    tip: 'Keep your camera or phone handy in your pocket, not deep in your bag, so you don\'t miss the first view of your destination.'
  },
  {
    number: 6,
    tag: 'Welcome',
    tagColor: 'bg-teal-100 text-teal-700',
    title: 'The Entrance',
    teaser: 'FINALLY HERE! The land of dreams! Standing at the gates of magic.',
    image: '/images/comics/disneyland/panel-6-disney-arrival.jpg',
    imageAlt: 'Luna and Wayne standing at the entrance of Disneyland with the Disneyland Railroad station behind them.',
    story: [
      'We stood right in front of the main entrance gates!',
      'There was a cute Mickey Mouse flowerbed in the grass and the old steam train station overhead. I felt so happy and excited, I wanted to jump up and down and run inside immediately!'
    ],
    facts: (
      <>
        <p><strong>The Mickey Mouse flowerbed at the entrance</strong> is replanted several times a year with seasonal flowers. It takes about 10,000 individual flowers to make Mickey\'s face!</p>
        <p><strong>Disneyland originally opened on July 17, 1955</strong>, and the train station was one of the first things visitors encountered.</p>
      </>
    ),
    lessonTitle: 'Taking a Moment',
    lesson: (
      <>
        <p>It\'s tempting to run inside immediately, but taking a minute to look at the entrance helps lock the memory of starting your adventure.</p>
      </>
    ),
    tip: 'Arrive at the gates at least 30-45 minutes before the official park opening time to beat the main crowd.'
  },
  {
    number: 7,
    tag: 'Checking In',
    tagColor: 'bg-rose-100 text-rose-700',
    title: 'Hotel Check-In',
    teaser: 'Checking in to our hotel. Cast member welcomes us, and wow... the view!',
    image: '/images/comics/disneyland/panel-7-hotel.jpg',
    imageAlt: 'Luna standing at the hotel front desk checking in, while looking out the window at the spectacular view.',
    story: [
      'First, we went to check-in at the hotel to drop off our heavy bags.',
      'The cast member at the front desk was super nice and welcomed us with special badges. Our room had a huge window with the most perfect view of the entire park! I stood by the window for ten minutes just staring.'
    ],
    facts: (
      <>
        <p><strong>Disneyland hotel cast members are trained to create "Magical Moments"</strong> for families, which can sometimes include surprise room upgrades, custom stickers, or greeting cards from characters!</p>
        <p><strong>The hotels surrounding the park</strong> often feature Disney-themed artwork, hidden Mickeys in the carpet, and custom wake-up calls from Mickey Mouse himself.</p>
      </>
    ),
    lessonTitle: 'Appreciating Hospitality',
    lesson: (
      <>
        <p>A warm welcome makes a big difference. Smiling back and thanking the hotel staff is a great way to start any stay.</p>
      </>
    ),
    tip: 'Ask the front desk for "First Visit" or "Celebration" buttons—they are free and characters love to read them!'
  },
  {
    number: 8,
    tag: 'Rides',
    tagColor: 'bg-amber-100 text-amber-700',
    title: 'Rides Galore',
    teaser: 'We rode so many rides! Small World, Dumbo, and the Haunted Mansion!',
    image: '/images/comics/disneyland/panel-8-rides.jpg',
    imageAlt: 'Luna and Wayne riding different attractions: sailing in a Small World boat, flying on Dumbo, and riding a Haunted Mansion Doom Buggy.',
    story: [
      'We ran from ride to ride, trying to see everything!',
      'We sailed through "It\'s a Small World" with all the singing dolls, flew high in the air on Dumbo the flying elephant, and rode in a spooky black Doom Buggy inside the Haunted Mansion! I wasn\'t even scared of the ghosts!'
    ],
    facts: (
      <>
        <p><strong>"It\'s a Small World" features over 300 audio-animatronic dolls</strong> representing children from all over the world singing the classic song in multiple languages.</p>
        <p><strong>The Haunted Mansion uses a theater trick</strong> called "Pepper\'s Ghost" to make the dancing ghosts appear real in the ballroom scene — it is actually a reflection from real rooms below!</p>
      </>
    ),
    lessonTitle: 'Overcoming Small Fears',
    lesson: (
      <>
        <p>Trying spooky rides can be scary at first, but with a friend or parent beside you, it can turn into a fun adventure.</p>
      </>
    ),
    tip: 'Use the Disneyland App to check live wait times so you can choose which ride to visit next without walking across the whole park.'
  },
  {
    number: 9,
    tag: 'Sweets',
    tagColor: 'bg-red-100 text-red-700',
    title: 'Views & Sweets',
    teaser: 'Churro check for Wayne, and a giant colorful lollipop for me!',
    image: '/images/comics/disneyland/panel-9-sweets.jpg',
    imageAlt: 'Luna and Wayne walking down Main Street U.S.A. Wayne is holding a churro and Luna is holding a large lollipop.',
    story: [
      'We walked down Main Street, U.S.A. and stopped for some treats.',
      'Wayne got a giant warm churro (churro check!), and I got a giant colorful lollipop. Running around theme parks requires a lot of sugar power!'
    ],
    facts: (
      <>
        <p><strong>Main Street, U.S.A. is designed to smell like fresh vanilla</strong> and baked goods. Disneyland uses hidden scent machines called "Smellitizers" to blow sweet aromas into the street!</p>
        <p><strong>Over 2.8 million churros are sold</strong> at Disneyland Resort every year. That is a lot of cinnamon and sugar!</p>
      </>
    ),
    lessonTitle: 'The Joy of Treats',
    lesson: (
      <>
        <p>Walking miles around the park burns a lot of energy. Stopping for a sweet treat is a delicious way to take a break and rest your feet.</p>
      </>
    ),
    tip: 'Churros are best eaten fresh and warm. If the line at one cart is long, walk a bit further—there are carts all over the park!'
  },
  {
    number: 10,
    tag: 'Night Magic',
    tagColor: 'bg-violet-100 text-violet-700',
    title: 'The Final Admire',
    teaser: 'Just one more look... Worth it. ZzZ... perfect night.',
    image: '/images/comics/disneyland/panel-10-final-admire.jpg',
    imageAlt: 'Luna and Wayne leaning against a railing at night, watching the castle lit up with fireworks and lights.',
    story: [
      'As the day came to an end, we stood by the railing and watched the beautiful castle light up against the dark night sky.',
      'I leaned against the railing, feeling so happy and sleepy. The fireworks burst in colors above, and I knew it was the most perfect day ever.'
    ],
    facts: (
      <>
        <p><strong>Disneyland\'s nightly fireworks show</strong> uses compressed air instead of gunpowder to launch the shells, which reduces noise and smoke, making it safer and cleaner!</p>
        <p><strong>The music and fireworks are synchronized using computer controls</strong> that measure down to the millisecond to match the music perfectly.</p>
      </>
    ),
    lessonTitle: 'Reflecting on the Day',
    lesson: (
      <>
        <p>The quiet moment at the end of a busy day is just as special as the rides. Taking a moment to appreciate the magic helps you sleep peacefully.</p>
      </>
    ),
    tip: 'Find a spot near the back of Main Street for a quick exit after the fireworks, or wait 20 minutes for the crowds to clear.'
  }
];

// ── Disneyland Guide (collapsible) ────────────────────────────────────

function DisneylandGuide() {
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
            <p className="font-bold text-slate-800">Luna's Disneyland Survival Guide</p>
            <p className="text-xs text-slate-400 mt-0.5">Best snacks, ride order, and how not to get tired!</p>
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
                  <p className="font-semibold text-slate-800 mb-1">🍭 The Best Snacks</p>
                  <p>1. <strong>Churros</strong> (Wayne's favorite): Get them warm from the cart near the castle. 2. <strong>Mickey Cookies</strong>: Chocolate ears are the best part. 3. <strong>Dole Whip</strong>: Super cold pineapple ice cream near Adventureland, perfect when it gets hot!</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">🎒 What to Pack in Your Bunny Bag</p>
                  <p>A water bottle (you can refill it for free at restaurants), a light sweater (it gets chilly at night during the fireworks), and a couple of band-aids just in case your feet get sore from all the running.</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-slate-800 mb-1">🎢 Ride Strategy</p>
                  <p>Go to Fantasyland first thing in the morning when the lines are shortest! You can ride Dumbo and Peter Pan without waiting forever. Save the indoor rides like Haunted Mansion for the afternoon when the sun is super hot.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">✨ Magical Fireworks Tip</p>
                  <p>Don't stand right in front of the castle! It gets super crowded. Instead, stand a bit further down Main Street or near the train station. You get a wider view of the sky, and you can escape to the hotel quickly before everyone else starts walking!</p>
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
      <div className="overflow-hidden bg-slate-50 border-b border-pink-50 relative">
        <img
          src={strip.image}
          alt={strip.imageAlt}
          className="w-full h-auto object-cover"
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

export default function LunaComicDisneyland() {
  return (
    <>
      <SEOHead
        title="Adventure to Disneyland | Luna's Journey"
        description="Follow Luna and Wayne's magical trip to Disneyland! A cute 10-panel comic adventure with travel tips and stories."
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
            src="/images/comics/disneyland/cover.jpg"
            alt="Luna & Wayne's Disneyland Adventure"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-pink-900/60 via-transparent to-transparent flex items-end p-6 justify-center">
            <div className="text-white text-center">
              <span className="inline-block px-3 py-1 bg-yellow-400 text-slate-900 text-xs font-bold rounded-full uppercase tracking-wider mb-2">
                New Comic Book 🐰
              </span>
              <h1 className="text-2xl sm:text-4xl font-bold font-header drop-shadow-md">
                Luna and Wayne's Adventure to Disneyland
              </h1>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-3 mb-4">
          <span className="px-3 py-1 bg-pink-100 text-pink-800 text-xs font-bold rounded-full uppercase tracking-wide">
            Travel Series · Issue #1
          </span>
          <span className="text-xs text-slate-400">May 2026 · 10 Panels</span>
        </div>

        <p className="text-slate-500 leading-relaxed mb-6 max-w-2xl mx-auto font-sans">
          Pack your bags! Luna the rabbit and Wayne the cat go on a grand flight to the Land of Dreams. 
          Read through 10 cute comic panels following their airport wait, plane napping, and riding rollercoasters at Disneyland!
        </p>

        <div className="flex justify-center">
          <ShareBar
            title="Luna & Wayne's Adventure to Disneyland"
            summary="A fun 10-panel comic travel diary to Disneyland by Luna and Wayne!"
          />
        </div>
      </motion.div>

      {/* 10 Comic Strips (vertical stack like Wayne's) */}
      <div className="space-y-8 mb-12 max-w-4xl mx-auto">
        {strips.map((strip, i) => (
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

      {/* Disneyland Guide (collapsible) */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12 max-w-4xl mx-auto"
      >
        <DisneylandGuide />
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
          title="Luna & Wayne's Adventure to Disneyland"
          summary="An illustrated Disneyland travel diary."
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
