import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SEOHead } from '../../components/SEOHead';
import { ShareBar } from '../../components/ShareBar';

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full uppercase tracking-wide mb-3">
      {children}
    </span>
  );
}

function LessonBox({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-indigo-50 border-l-4 border-indigo-400 rounded-r-xl p-5 my-6">
      <p className="text-xs font-bold text-indigo-600 uppercase tracking-wide mb-2">{title}</p>
      <div className="text-sm text-slate-700 leading-relaxed space-y-2">{children}</div>
    </div>
  );
}

function FactBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 my-6">
      <p className="text-xs font-bold text-amber-700 uppercase tracking-wide mb-3">Grand Canyon Fast Facts</p>
      <div className="text-sm text-slate-700 leading-relaxed space-y-2">{children}</div>
    </div>
  );
}

function ParentTip({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 my-6 flex gap-3">
      <span className="text-emerald-500 text-lg flex-shrink-0">💡</span>
      <div>
        <p className="text-xs font-bold text-emerald-700 uppercase tracking-wide mb-1">Parent Tip</p>
        <p className="text-sm text-slate-700 leading-relaxed">{children}</p>
      </div>
    </div>
  );
}

function ComicStrip({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  return (
    <div className="my-8 rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-white">
      <img src={src} alt={alt} className="w-full h-auto" />
      <p className="text-xs text-slate-400 text-center px-4 py-3 border-t border-slate-100">{caption}</p>
    </div>
  );
}

export default function WayneComicGrandCanyon() {
  return (
    <>
      <SEOHead
        title="Luna & Wayne's Canyon Dreams — Grand Canyon 2024 | Comics"
        description="A parent-child comic adventure at the Grand Canyon — three stories about safety, respecting nature, and learning to see the ancient and vast. Plus a full family travel guide."
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
      >
        <div className="flex items-center gap-3 mb-4">
          <SectionLabel>Comic Series · Issue #1</SectionLabel>
          <span className="text-xs text-slate-400">Summer 2024</span>
        </div>

        <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md mb-8">
          <img
            src="/images/comics/grand-canyon/cover.jpeg"
            alt="Luna & Wayne's Canyon Dreams — cover art"
            className="w-full h-auto"
          />
        </div>

        <h1 className="text-4xl font-bold text-slate-900 mb-3 leading-tight">
          Luna & Wayne's Canyon Dreams
        </h1>
        <p className="text-xl text-slate-500 mb-4">
          Three stories from our Grand Canyon trip — and everything the canyon taught us that we didn't expect.
        </p>

        <div className="flex items-center gap-6 mb-6 text-sm text-slate-400">
          <span>By Wayne · August 2024</span>
          <span>·</span>
          <span>3 comic strips + travel guide</span>
          <span>·</span>
          <span>Ages 6 and up</span>
        </div>

        <ShareBar
          title="Luna & Wayne's Canyon Dreams — Grand Canyon 2024"
          summary="Three parent-child comic strips from the Grand Canyon, plus a full family travel guide."
        />
      </motion.div>

      {/* ── Intro ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.08 }}
        className="prose prose-lg prose-slate max-w-none mt-12 mb-12"
      >
        <p className="text-lg text-slate-700 leading-relaxed">
          When we drove up to the South Rim for the first time, Luna pressed her face against the car window and went quiet. That almost never happens.
        </p>
        <p className="text-slate-700 leading-relaxed">
          The Grand Canyon is one of those places that doesn't need you to explain it. It explains itself. But kids are funny — they need a specific door to walk through before the wonder kicks in. Luna's first reaction was "it's really big." Her second was "can I climb the fence?" Her third, about twenty minutes later, was complete and total silence as she stared into a billion years of history.
        </p>
        <p className="text-slate-700 leading-relaxed">
          These three comics are drawn from real moments on that trip. They're not dramatized. Wayne (me, the cat with the eye patch) and Luna (the white rabbit with all the questions) had exactly these conversations — about safety, about rocks that belong to the canyon, and about how to actually look at something that doesn't perform for you.
        </p>
        <p className="text-slate-700 leading-relaxed">
          I'm sharing them here for other parents who are planning a canyon trip, or who are just trying to figure out how to translate an overwhelming place into something a child can hold onto.
        </p>
      </motion.div>

      {/* ── Before You Go: Primer ── */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="bg-white border border-slate-200 rounded-2xl p-8 mb-14"
      >
        <SectionLabel>Before You Go</SectionLabel>
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Grand Canyon: What Families Actually Need to Know</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-600 leading-relaxed">
          <div className="space-y-4">
            <div>
              <p className="font-semibold text-slate-800 mb-1">Location & Getting There</p>
              <p>Northern Arizona. About 4 hours from Las Vegas and 3.5 hours from Phoenix. There's no direct train — most families drive or fly into Phoenix / Las Vegas and road-trip in.</p>
            </div>
            <div>
              <p className="font-semibold text-slate-800 mb-1">South Rim vs. North Rim</p>
              <p>South Rim is open year-round, has the most facilities and viewpoints, and is where 90% of visitors go. North Rim is quieter and arguably more beautiful, but only open mid-May to mid-October. For a first trip with kids: South Rim.</p>
            </div>
            <div>
              <p className="font-semibold text-slate-800 mb-1">Best Time to Visit</p>
              <p>Spring (April–May) or Fall (September–October). Summer is brutally hot at the bottom and crowded at the top. If you go in summer, arrive at sunrise, leave by noon. Winter has snow on the rim — oddly beautiful, but limit what you can do.</p>
            </div>
            <div>
              <p className="font-semibold text-slate-800 mb-1">Best Age for Kids</p>
              <p>5+ can fully appreciate the rim views. 8+ can do short trails like the first mile of Bright Angel. Under 5 is still worth it — the views require no hiking — but expect a short attention window before they want to chase squirrels.</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <p className="font-semibold text-slate-800 mb-1">Must-See Viewpoints</p>
              <p><strong>Mather Point</strong> — the first stop for most visitors, excellent panorama. <strong>Yavapai Observation Station</strong> — has a geology museum inside, great for kids. <strong>Desert View Watchtower</strong> — 30 miles east, less crowded, incredible 360° view.</p>
            </div>
            <div>
              <p className="font-semibold text-slate-800 mb-1">What Surprises Most Families</p>
              <p>The scale. No photo prepares you. Luna's first word at the rim was "BIG" and that's accurate. Many kids (and adults) need 10–15 minutes of just standing there before it starts to sink in.</p>
            </div>
            <div>
              <p className="font-semibold text-slate-800 mb-1">What to Bring</p>
              <p>Water (more than you think — even at the rim). Sun protection. Layers (temperature swings are dramatic, especially at sunrise). Comfortable shoes even if you're just rim-walking. Binoculars if you have them — condors soar and the river below sparkles.</p>
            </div>
            <div>
              <p className="font-semibold text-slate-800 mb-1">Sunrise & Sunset</p>
              <p>Worth every alarm clock. The canyon turns shades of red, orange, and purple that photos can't fully capture. Sunrise has few crowds and cool air. Sunset has the full warm palette. If you do one, do sunset — the light comes from behind you at the South Rim, which makes the color more dramatic.</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ══════════════════════════════════════
          STORY 1: SAFETY
      ══════════════════════════════════════ */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.12 }}
        className="mb-16"
      >
        <SectionLabel>Story 1 of 3</SectionLabel>
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Safety First (Or: The Fence Is Not Decorative)</h2>
        <p className="text-slate-500 text-sm mb-6">Theme: Grand Canyon Safety · Why rules at natural landmarks are different</p>

        <ComicStrip
          src="/images/comics/grand-canyon/panel-safety.jpeg"
          alt="Luna and Wayne comic: Arrival at the viewpoint, Luna tries to lean over the fence, Wayne teaches her about danger and they end up watching safely together."
          caption="Luna & Wayne's Canyon Adventure — Safety First! · Summer 2024"
        />

        <div className="prose prose-slate max-w-none">
          <h3 className="text-xl font-bold text-slate-800 mt-8 mb-3">The Story Behind the Strip</h3>
          <p className="text-slate-700 leading-relaxed">
            The first thing Luna wanted to do at the viewpoint was lean over the fence. Not dramatically — she just wanted to see more than the fence allowed. She moved fast, the way 8-year-olds move when they're excited and the adult supervision hasn't caught up yet. The railing creaked. I grabbed her arm.
          </p>
          <p className="text-slate-700 leading-relaxed">
            She looked at me like I was overreacting. Which, honestly, is a completely reasonable response from a kid who has never stood at the edge of a 5,000-foot drop. The problem with canyon danger is that it doesn't look like danger from where you're standing. The scale is too big to read intuitively. The bottom looks like it's just "below" — not a mile below.
          </p>
          <p className="text-slate-700 leading-relaxed">
            I didn't want to give her the "because I said so" conversation. I wanted to give her the real one: some places have rules because the consequences of breaking them are permanent, and the canyon has no margin for error. The fence isn't there to keep the view away from you. It's there because people have died.
          </p>
          <p className="text-slate-700 leading-relaxed">
            She got quiet when I put it that way. Then she took my hand and we stood there together, safely, and watched the shadows move across the walls of the canyon for a long time.
          </p>
        </div>

        <FactBox>
          <p><strong>The canyon is over 6,000 feet deep</strong> at its deepest point — more than a mile. The bottom doesn't look that far because the scale is too large for human intuition to process correctly.</p>
          <p><strong>About 400 search and rescue operations</strong> happen at Grand Canyon National Park each year. Falls, dehydration, and overconfident hiking are the primary causes — not wildlife.</p>
          <p><strong>The terrain at the rim is loose, crumbly rock.</strong> What looks like solid ground can break away. This is why every unfenced area comes with a ranger warning.</p>
          <p><strong>Kids should always be within arm's reach</strong> at any unfenced viewpoint or trail edge. The standard "hold the child's hand" rule applies regardless of how cautious your child usually is — the canyon disrupts normal spatial judgment for everyone.</p>
        </FactBox>

        <LessonBox title="The Lesson: Why Rules Need Reasons">
          <p>"Don't go near the edge" is a rule. "The canyon is over a mile deep and people have died here" is a reason. Children accept rules more deeply when they understand what the rule is protecting them from.</p>
          <p>At the canyon specifically, the visual scale is deceptive — the bottom looks reachable and the drop looks manageable. So the explanation has to override the visual. Try: <em>"I know it doesn't look that far, but our eyes are confused because everything here is bigger than anything we're used to."</em></p>
          <p>Let the canyon itself do some of the teaching. Ask your child: "How long do you think it would take to walk down to that river you can see?" (Answer: at least 2 days round-trip on foot.) The math does the persuading better than the warning.</p>
        </LessonBox>

        <ParentTip>
          The moment after the "no" is more important than the "no" itself. After establishing the limit, turn it into curiosity: "Let's see how far we CAN see from right here." The canyon rewards close looking — condors, layered rock colors, light changes — and your child will forget about the fence entirely once they have something to track.
        </ParentTip>
      </motion.section>

      {/* ══════════════════════════════════════
          STORY 2: LEAVE NO TRACE
      ══════════════════════════════════════ */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.14 }}
        className="mb-16"
      >
        <SectionLabel>Story 2 of 3</SectionLabel>
        <h2 className="text-3xl font-bold text-slate-900 mb-2">The Rock That Belongs to the Canyon</h2>
        <p className="text-slate-500 text-sm mb-6">Theme: Leave No Trace · Why we don't take things from wild places</p>

        <ComicStrip
          src="/images/comics/grand-canyon/panel-nature.jpeg"
          alt="Luna finds a beautiful red rock and wants to throw it or take it. Wayne explains every pebble has been here for centuries and belongs to the canyon. Luna says goodbye to the stone."
          caption="Luna & Wayne's Grand Canyon Adventure — Respect for Nature · Summer 2024"
        />

        <div className="prose prose-slate max-w-none">
          <h3 className="text-xl font-bold text-slate-800 mt-8 mb-3">The Story Behind the Strip</h3>
          <p className="text-slate-700 leading-relaxed">
            Luna found a rock that was genuinely beautiful — deep red, with white veins running through it, warm from sitting in the sun. She had it in her pocket before I noticed. I only saw it when she held it up and said "Wayne, Wayne! Look! This stone is amazing!"
          </p>
          <p className="text-slate-700 leading-relaxed">
            Then: "I'm going to throw it to hear the echo!" And I said, as calmly as I could, "Wait, Luna. We can't."
          </p>
          <p className="text-slate-700 leading-relaxed">
            Throwing a rock into the Grand Canyon is dangerous — there are people on the trails below, and the scale is deceptive again. But more than that, I wanted to explain Leave No Trace not as a rule but as a relationship. The rock was beautiful because it had been shaped by millions of years of river, wind, and pressure. Taking it out of that story, or throwing it away from it, breaks something that can't be fixed.
          </p>
          <p className="text-slate-700 leading-relaxed">
            I told her: every pebble, every grain of sand — it's been here for centuries. Each one is part of the canyon's story. It belongs to the canyon, not to us.
          </p>
          <p className="text-slate-700 leading-relaxed">
            She put it down. She said "Goodbye, little stone. Rest well." I didn't suggest the goodbye — that was entirely Luna. And I thought: she got it. She really got it.
          </p>
        </div>

        <FactBox>
          <p><strong>It is actually illegal to remove rocks, plants, or any natural object</strong> from Grand Canyon National Park. The park is protected under the National Park Service Organic Act.</p>
          <p><strong>6 million people visit the Grand Canyon each year.</strong> If every visitor took one small rock, that's 6 million rocks removed annually. The aggregate impact of small individual actions is enormous at scale.</p>
          <p><strong>Grand Canyon rocks span 270 million to 1.8 billion years of age.</strong> The reddish rocks Luna found are likely Supai Group sandstone or Hermit Formation shale — deposited when this region was a coastal floodplain, long before the first dinosaurs.</p>
          <p><strong>Throwing rocks into the canyon is dangerous</strong> because there are trails and hikers far below. The visual distance is deceptive — what looks like an empty canyon bottom may have people on it.</p>
          <p><strong>The Colorado River is still carving the canyon today</strong> — about 1 millimeter deeper per year on average. Each rock on the canyon floor is part of an ongoing geological story.</p>
        </FactBox>

        <LessonBox title="The Lesson: Stewardship Is a Relationship, Not a Rule">
          <p>"Leave it where you found it" is a rule. "This rock has been here longer than the human species exists, and it belongs to a story that's still being told" is a relationship.</p>
          <p>The difference matters because rules can be negotiated ("just this once," "it's so small") and relationships cannot. When a child understands that the canyon owns its own history, taking a piece of it feels like taking something that isn't theirs — which is much more powerful than "because the sign says so."</p>
          <p>Try the math: "How old do you think this rock is?" Then tell them. "This rock was formed before the first dinosaur walked the Earth. Does it feel right to put it in your pocket?" Most kids, given the real number, decide on their own.</p>
        </LessonBox>

        <ParentTip>
          Children learn Leave No Trace by watching adults. If you pick something up "just to look" and then put it back, your child is watching and learning that's acceptable behavior. Model the principle before explaining it: walk past the interesting rock without touching it, and wait to see if your child asks why.
        </ParentTip>
      </motion.section>

      {/* ══════════════════════════════════════
          STORY 3: LEARNING TO SEE
      ══════════════════════════════════════ */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.16 }}
        className="mb-16"
      >
        <SectionLabel>Story 3 of 3</SectionLabel>
        <h2 className="text-3xl font-bold text-slate-900 mb-2">It's Just a Really Big Hole (Until It Isn't)</h2>
        <p className="text-slate-500 text-sm mb-6">Theme: Learning to See · How to help a child encounter something ancient and vast</p>

        <ComicStrip
          src="/images/comics/grand-canyon/panel-perspective.jpeg"
          alt="Luna at sunrise: 'It's just a really big hole. What's so special?' Wayne explains the layers are millions of years old stories. Luna imagines the ancient canyon glowing with ancient history."
          caption="The View from the Edge — Sometimes, the unseen is more magical · Summer 2024"
        />

        <div className="prose prose-slate max-w-none">
          <h3 className="text-xl font-bold text-slate-800 mt-8 mb-3">The Story Behind the Strip</h3>
          <p className="text-slate-700 leading-relaxed">
            Luna's first real reaction to the Grand Canyon — once the initial shock of "it's so BIG" wore off — was disappointment. She'd seen pictures. She'd expected something. What she saw was a very large hole with some orange walls.
          </p>
          <p className="text-slate-700 leading-relaxed">
            "It's just a really big hole," she said. "What's so special?"
          </p>
          <p className="text-slate-700 leading-relaxed">
            I've thought about this a lot since. The canyon doesn't perform. It doesn't move or make sounds or change in a way you can perceive. For a child raised on entertainment that responds to them — videos that react, games that reward — a canyon is confusing. It simply is. It makes no attempt to hold your attention.
          </p>
          <p className="text-slate-700 leading-relaxed">
            I didn't try to sell her on the whole thing. I pointed to one layer. The reddish stripe near the top of the canyon wall, just below the rim. "See that layer? That's called the Kaibab Limestone. It was formed when this whole area was an ocean floor — 270 million years ago. Before dinosaurs ever existed. That stripe has been sitting there, in that exact spot, for longer than the human species has been alive."
          </p>
          <p className="text-slate-700 leading-relaxed">
            She was quiet. Then: "Before dinosaurs?"
          </p>
          <p className="text-slate-700 leading-relaxed">
            "Before dinosaurs."
          </p>
          <p className="text-slate-700 leading-relaxed">
            And after that, she couldn't stop looking.
          </p>
        </div>

        <FactBox>
          <p><strong>The Grand Canyon reveals 2 billion years of Earth history</strong> in its exposed rock layers — one of the most complete geological records anywhere on Earth.</p>
          <p><strong>The Kaibab Limestone at the very top</strong> is 270 million years old — formed when this region was covered by a shallow sea. It contains fossils of ancient marine creatures including sponges, brachiopods, and crinoids.</p>
          <p><strong>The Vishnu Basement Rocks at the very bottom</strong> are 1.8 billion years old — roughly a third of the age of the universe. They predate complex life on Earth.</p>
          <p><strong>Dinosaurs lived from about 230 to 65 million years ago.</strong> This means the top layer of the Grand Canyon is already older than the entire age of dinosaurs.</p>
          <p><strong>The Colorado River began carving the canyon 5–6 million years ago,</strong> which is recent by geological standards — humans emerged only about 300,000 years ago.</p>
          <p><strong>Each distinct colored band is a different geological era,</strong> deposited by different environments — ancient seas, deserts, river deltas, and floodplains that no longer exist.</p>
        </FactBox>

        <LessonBox title="The Lesson: Give One Concrete Fact, Not All of Them">
          <p>Big numbers defeat children (and most adults). "2 billion years" means nothing to an 8-year-old. "Before dinosaurs" means everything.</p>
          <p>The key is finding the anchor your child already has. If they love dinosaurs: the top rock layer is older than all dinosaurs. If they love animals: there were no land animals at all when those rocks formed. If they love swimming: this was once a seafloor. Use their existing mental model as the entry point and attach the new fact to it.</p>
          <p>Then stay quiet. Let them look. Don't keep explaining — one good fact, planted in the right soil, will grow on its own. What changes for children at the canyon isn't the view. It's the realization that time is real and vast and that they are very, very small in it. That takes a moment to land.</p>
        </LessonBox>

        <ParentTip>
          The "it's just a big hole" reaction is completely normal and doesn't mean the trip failed. It means your child hasn't found their door in yet. Don't rush to fill the silence with explanations. Sit down next to them and look in the same direction. Ask what they notice — not what they think, not what they know. <em>What do you notice?</em> That question opens eyes better than any fact.
        </ParentTip>
      </motion.section>

      {/* ── Closing ── */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.18 }}
        className="border-t border-slate-200 pt-12 mb-12"
      >
        <h2 className="text-2xl font-bold text-slate-900 mb-4">What the Canyon Teaches Parents</h2>
        <div className="prose prose-slate max-w-none">
          <p className="text-slate-700 leading-relaxed">
            I went to the Grand Canyon thinking I was bringing Luna to a beautiful place. I came back thinking the canyon had taught both of us something.
          </p>
          <p className="text-slate-700 leading-relaxed">
            It taught Luna: that the world is very old, that rules at wild places exist for real reasons, and that some things belong to themselves and not to you.
          </p>
          <p className="text-slate-700 leading-relaxed">
            It taught me: that overwhelm is often the first step toward wonder, that one well-placed fact is worth a hundred explanations, and that sitting quietly next to your child and looking at the same thing is one of the highest forms of parenting.
          </p>
          <p className="text-slate-700 leading-relaxed">
            Go to the Grand Canyon. Arrive at sunrise if you can. Bring water. Let your kid be disappointed first. Then find the one thing — the layer, the color, the condor floating on a thermal — that opens the door. The rest takes care of itself.
          </p>
        </div>

        <div className="flex items-center justify-between mt-10 py-6 border-t border-slate-200">
          <Link
            to="/wayne/comics"
            className="text-sm text-slate-400 hover:text-slate-700 transition-colors"
          >
            ← All Comics
          </Link>
          <ShareBar
            title="Luna & Wayne's Canyon Dreams — Grand Canyon 2024"
            summary="Three parent-child comic strips + a full family travel guide to the Grand Canyon."
          />
        </div>
      </motion.section>

      {/* ── Related ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="bg-indigo-600 rounded-2xl px-8 py-10 text-center text-white"
      >
        <h2 className="text-xl font-bold mb-2">Enjoyed the stories?</h2>
        <p className="text-indigo-100 text-sm mb-6 max-w-md mx-auto">
          Wayne publishes weekly teaching plans and insights on learning with your child. Luna shares what she discovers every Sunday.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/wayne/insights"
            className="inline-flex items-center justify-center gap-2 bg-white text-indigo-700 font-semibold text-sm px-6 py-2.5 rounded-xl hover:bg-indigo-50 transition-colors"
          >
            Read Wayne's Insights
          </Link>
          <a
            href={import.meta.env.PROD ? 'https://luna.bunnyuniverse.com' : '/?persona=luna'}
            className="inline-flex items-center justify-center gap-2 bg-indigo-500 text-white font-semibold text-sm px-6 py-2.5 rounded-xl hover:bg-indigo-400 transition-colors"
          >
            Visit Luna's Journey
          </a>
        </div>
      </motion.div>
    </>
  );
}
