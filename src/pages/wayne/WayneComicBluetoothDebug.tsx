import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, ArrowLeft } from 'lucide-react';
import { SEOHead } from '../../components/SEOHead';
import { CommentSection } from '../../components/CommentSection';

// ─── Sub-components ────────────────────────────────────────────────────────

function LessonBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-indigo-50 border-l-4 border-indigo-400 rounded-r-xl p-4 text-sm text-slate-700 leading-relaxed">
      {children}
    </div>
  );
}

function FactBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-slate-700 leading-relaxed">
      {children}
    </div>
  );
}

function ParentTip({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-sm text-slate-700 leading-relaxed">
      <span className="font-semibold text-emerald-700">Parent Tip — </span>
      {children}
    </div>
  );
}

type StripVariant = 'neutral' | 'path-a' | 'path-b';

function StripCard({
  image,
  title,
  brief,
  deepDive,
  index,
  variant = 'neutral',
}: {
  image: string;
  title: string;
  brief: string;
  deepDive: React.ReactNode;
  index: number;
  variant?: StripVariant;
}) {
  const [open, setOpen] = useState(false);

  const border =
    variant === 'path-a'
      ? 'border-orange-200 hover:border-orange-300'
      : variant === 'path-b'
      ? 'border-indigo-200 hover:border-indigo-300'
      : 'border-slate-200 hover:border-slate-300';

  const btnClass =
    variant === 'path-b'
      ? 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
      : variant === 'path-a'
      ? 'bg-orange-50 text-orange-700 hover:bg-orange-100'
      : 'bg-slate-100 text-slate-600 hover:bg-slate-200';

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
      className={`bg-white border rounded-2xl overflow-hidden shadow-sm ${border} transition-colors`}
    >
      <img src={image} alt={title} className="w-full object-cover border-b border-slate-100" />
      <div className="p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
        <p className="text-slate-600 text-sm leading-relaxed mb-4">{brief}</p>
        <button
          onClick={() => setOpen(!open)}
          className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${btnClass}`}
        >
          {open ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          {open ? 'Show less' : 'Learn more'}
        </button>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-4 pt-4 border-t border-slate-100 space-y-3"
          >
            {deepDive}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────

export default function WayneComicBluetoothDebug() {
  const [techOpen, setTechOpen] = useState(false);

  return (
    <>
      <SEOHead
        title="The Case of the Phantom Pause | Wayne's Comics"
        description="A real Bluetooth debugging story. Two paths, side by side. Without AI: 3+ hours, broken registry, alone at 4am. With AI: 1 hour, root cause found, fixed."
        ogImage="/images/comics/bluetooth-debug/cover.jpeg"
      />

      <div className="max-w-3xl mx-auto space-y-12 pb-20">
        {/* Back */}
        <Link
          to="/wayne/comics"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Comics
        </Link>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center space-y-4"
        >
          <div className="flex justify-center gap-2 flex-wrap">
            <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-full uppercase tracking-wide">
              Real-Life Tech
            </span>
            <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-full uppercase tracking-wide">
              AI Co-Pilot
            </span>
            <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full uppercase tracking-wide">
              6 strips
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
            The Case of the Phantom Pause
          </h1>
          <p className="text-slate-500 text-base max-w-2xl mx-auto leading-relaxed">
            Wayne's Sennheiser earbuds kept pausing YouTube every five seconds — for no visible reason.
            He tried it two ways: alone with Google, and with an AI co-pilot.
            Here are both paths, exactly as they happened.
          </p>
          <p className="text-xs text-slate-400 pt-1">June 2026 · Bluetooth · Windows · AI Debugging</p>
        </motion.div>

        {/* Strip 1: The Problem */}
        <StripCard
          image="/images/comics/bluetooth-debug/strip-1.jpeg"
          title="Every. Single. Time."
          brief="Wayne unboxes his new Sennheiser Momentum True Wireless 3 earbuds. Connects them to Windows 11. Opens YouTube. The video plays for five seconds — then stops. He hits play. Five seconds. Stops again. He opens Google. There are fifty forum threads with fifty different answers. None of them agree."
          index={0}
          deepDive={
            <>
              <LessonBox>
                <p>
                  <strong>Why this is so common:</strong> Windows Bluetooth audio runs two competing profiles simultaneously — A2DP (high-quality stereo) for listening, and HFP/HSP (low-quality, with mic) for calls. When Windows detects any microphone request, it silently switches from A2DP to HFP — dropping audio quality and causing unexpected behavior. Add the Sennheiser TW3's AVRCP quirk on top, and you have a hard-to-diagnose compound problem.
                </p>
              </LessonBox>
              <FactBox>
                AVRCP (touch controls) can send phantom "pause" commands to Windows when audio briefly stutters. That was the real root cause — but finding it alone would take all night.
              </FactBox>
            </>
          }
        />

        {/* PATH A */}
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-orange-200" />
          <div className="flex items-center gap-2 px-5 py-2 bg-orange-50 border border-orange-200 rounded-full shrink-0">
            <span className="text-base">😤</span>
            <span className="text-sm font-bold text-orange-700 uppercase tracking-wide">
              Path A — Without AI
            </span>
          </div>
          <div className="h-px flex-1 bg-orange-200" />
        </div>

        <div className="space-y-8">
          <StripCard
            image="/images/comics/bluetooth-debug/strip-2.jpeg"
            title="Forum Roulette: Try Everything, Break Something"
            brief="A forum post says to disable the 'PeacePower HF SNK' device in Device Manager. Wayne tries it. Sound test: works! 'Wait, that felt too easy. Maybe I should keep digging.' He finds a registry guide. He edits EnablePowerSaving and three other keys. Minutes later: 'What did I just break?! Everything is worse! Disconnected completely!' He never backed it up."
            index={1}
            variant="path-a"
            deepDive={
              <>
                <FactBox>
                  <strong>The trial-and-error trap:</strong> Without a mental model of WHY the problem is happening, every fix is a guess with two possible outcomes — lucky or worse. Forum advice is especially risky for Windows Bluetooth because driver names, registry paths, and behaviors change with every OS update. Advice from 2021 can actively break a 2024 setup.
                </FactBox>
                <p className="text-sm text-slate-600 leading-relaxed">
                  The registry keys Wayne edited were real and relevant — but he applied them without knowing whether he had identified the correct root cause. He had not.
                </p>
              </>
            }
          />

          <StripCard
            image="/images/comics/bluetooth-debug/strip-3.jpeg"
            title="4:23 AM. The Registry Is Broken. Discord Is Silent."
            brief="Two hours passed. Bluetooth status: CRITICALLY BROKEN. He re-pairs the earbuds. Connects. Hits play. Still pauses. Three hours. THREE HOURS. He posts to a Discord support channel: 'Anyone fix Windows Bluetooth auto pause? Registry edits didn't work. Please help.' No one responds. The chat is so quiet. Exhausted. He is alone with this bug."
            index={2}
            variant="path-a"
            deepDive={
              <>
                <LessonBox>
                  <p>
                    <strong>The hidden cost of solo debugging:</strong> It is not just the time. It is the compounding errors — each wrong fix makes the next diagnosis harder. It is the cognitive load of holding ten possible causes in your head at once. And it is the isolation: forums are asynchronous. Nobody is thinking with you in real time.
                  </p>
                </LessonBox>
                <ParentTip>
                  This is what we want Luna to avoid: hours alone on a problem, growing increasingly frustrated, making it worse. The skill we are teaching is knowing when and how to ask for help — from a human or an AI. Struggling alone is not the same as learning.
                </ParentTip>
              </>
            }
          />
        </div>

        {/* VS divider */}
        <div className="flex items-center gap-4">
          <div className="h-0.5 flex-1 bg-gradient-to-r from-orange-200 to-slate-200" />
          <div className="px-6 py-2.5 bg-slate-900 text-white text-sm font-black rounded-full tracking-widest shrink-0">
            VS
          </div>
          <div className="h-0.5 flex-1 bg-gradient-to-l from-indigo-200 to-slate-200" />
        </div>

        {/* PATH B */}
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-indigo-200" />
          <div className="flex items-center gap-2 px-5 py-2 bg-indigo-50 border border-indigo-200 rounded-full shrink-0">
            <span className="text-base">🤖</span>
            <span className="text-sm font-bold text-indigo-700 uppercase tracking-wide">
              Path B — With AI
            </span>
          </div>
          <div className="h-px flex-1 bg-indigo-200" />
        </div>

        <div className="space-y-8">
          <StripCard
            image="/images/comics/bluetooth-debug/strip-4.jpeg"
            title="AI Spots the First Clue: A2DP and HFP Are Fighting"
            brief="Wayne opens his AI and describes the problem precisely: exact device model, the symptom, what works on his phone vs. what fails on Windows. AI immediately identifies the Windows Bluetooth classic trap — A2DP and HFP are both active at once. It provides a PowerShell command to disable the Hands-Free profile. Wayne runs it. 'It works! High-five, AI!' Then — a few minutes later — the pause is back. AI says: 'That was not the root cause.'"
            index={3}
            variant="path-b"
            deepDive={
              <>
                <LessonBox>
                  <strong>How to write a debugging prompt that gets results:</strong>
                  <ul className="mt-2 space-y-1 list-disc list-inside text-sm">
                    <li>Specify the exact device model — not just "earbuds"</li>
                    <li>Describe the symptom precisely — "pauses after 5 seconds," not "doesn't work"</li>
                    <li>State what does work — works on phone means hardware is fine, OS is the issue</li>
                    <li>Include OS version and relevant hardware</li>
                  </ul>
                </LessonBox>
                <p className="text-sm text-slate-600 leading-relaxed">
                  AI did not guess. It formed a hypothesis from the description and tested it. When the fix was partial, it updated the hypothesis — instead of repeating the same guess. That is how a good debugger, human or AI, operates.
                </p>
              </>
            }
          />

          <StripCard
            image="/images/comics/bluetooth-debug/strip-5.jpeg"
            title="The Real Culprit: Earbuds Pressing Pause on Themselves"
            brief="AI runs a deeper PowerShell scan and finds something strange: the earbuds have TWO AVRCP transport instances — both showing 'OK.' AVRCP is the Bluetooth protocol behind touch controls. The logical failure chain: A2DP audio plays → audio buffer briefly dips → earbuds interpret silence as 'playback ended' → AVRCP sends PAUSE command → Windows forwards it to Chrome → YouTube pauses. Wayne: 'Wait — my earbuds are pressing pause BY THEMSELVES?!'"
            index={4}
            variant="path-b"
            deepDive={
              <>
                <FactBox>
                  <strong>What AVRCP actually does:</strong>
                  <p className="mt-1">
                    Audio/Video Remote Control Profile — the Bluetooth protocol behind your earbuds' touch controls. Tap to skip a track: AVRCP. Earbuds misread a brief audio buffer gap as "end of playback" and auto-send a pause signal: also AVRCP. Two duplicate AVRCP instances doubled the rate of phantom signals, making the bug happen reliably every few seconds.
                  </p>
                </FactBox>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Finding this alone takes 3+ hours — because you have to know to look for it. AI found it on the second scan. Each failed hypothesis narrowed the search space rather than wasting time.
                </p>
              </>
            }
          />

          <StripCard
            image="/images/comics/bluetooth-debug/strip-6.jpeg"
            title="The Fix. One Hour Total."
            brief="Phase 1: Registry tweaks to stop Intel Bluetooth's aggressive power-saving. Restarted Bluetooth service. Still auto-pauses. Phase 2: AI writes a PowerShell script to disable the AVRCP devices. Wayne runs it. '...Check AVRCP...' Then: 'Wait — it's not pausing! The audio is smooth, playing normally. IT WORKS! Haaaah~' Total elapsed time: one hour. Wayne's reflection: 'Without AI, each wrong turn costs an hour. With AI — one hour, done.'"
            index={5}
            variant="path-b"
            deepDive={
              <>
                <LessonBox>
                  <strong>The AI co-pilot model — how it actually works:</strong>
                  <div className="mt-3 grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <p className="font-semibold text-indigo-700 mb-1">AI does:</p>
                      <ul className="space-y-1 text-slate-600">
                        <li>Generate structured hypotheses</li>
                        <li>Write scripts and commands</li>
                        <li>Analyze output and logs</li>
                        <li>Explain trade-offs before you commit</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-700 mb-1">Human does:</p>
                      <ul className="space-y-1 text-slate-600">
                        <li>Describe symptoms accurately</li>
                        <li>Execute on the real machine</li>
                        <li>Paste results back</li>
                        <li>Make the final decision</li>
                      </ul>
                    </div>
                  </div>
                </LessonBox>
                <p className="text-sm text-slate-600 leading-relaxed mt-1">
                  Trade-off accepted: disabling AVRCP removes phantom pauses but also disables touch gesture controls on the earbuds. AI explained this before Wayne ran the command. He decided it was worth it. No surprises, no regrets.
                </p>
                <ParentTip>
                  The skill we want Luna to internalize: describe a problem precisely, then think with a partner who does not get tired or frustrated. It is not about having all the answers — it is about knowing how to ask better questions.
                </ParentTip>
              </>
            }
          />
        </div>

        {/* The Verdict */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm"
        >
          <img
            src="/images/comics/bluetooth-debug/cover.jpeg"
            alt="Same destination. Two paths. One took all night. The other took one focused hour."
            className="w-full object-cover"
          />
          <div className="bg-slate-800 text-white px-6 py-4 text-center">
            <p className="text-sm font-medium text-slate-300 italic">
              "Same destination. Two paths. One took all night. The other took one focused hour. The difference? A second brain that does not get tired."
            </p>
          </div>
        </motion.div>

        {/* Scoreboard */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm"
        >
          <div className="bg-slate-800 text-white px-6 py-4">
            <h2 className="font-bold text-lg">The Scoreboard</h2>
            <p className="text-slate-300 text-sm">Same person. Same problem. Different approach.</p>
          </div>
          <div className="grid grid-cols-2 divide-x divide-slate-100">
            <div className="p-6 bg-orange-50">
              <p className="text-orange-600 font-bold text-sm mb-4 uppercase tracking-wide">
                😤 Path A — No AI
              </p>
              <ul className="space-y-2.5 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-orange-400 shrink-0">✗</span>3+ hours (and counting)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-400 shrink-0">✗</span>Random forum guesses
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-400 shrink-0">✗</span>Registry corrupted
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-400 shrink-0">✗</span>Nobody to think with
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-400 shrink-0">✗</span>Root cause never found
                </li>
              </ul>
            </div>
            <div className="p-6 bg-indigo-50">
              <p className="text-indigo-600 font-bold text-sm mb-4 uppercase tracking-wide">
                🤖 Path B — With AI
              </p>
              <ul className="space-y-2.5 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-500 shrink-0">✓</span>1 hour total
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-500 shrink-0">✓</span>Systematic hypotheses
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-500 shrink-0">✓</span>No collateral damage
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-500 shrink-0">✓</span>A thinking partner available
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-500 shrink-0">✓</span>Root cause: AVRCP identified
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Technical Deep Dive */}
        <div>
          <button
            onClick={() => setTechOpen(!techOpen)}
            className="w-full flex items-center justify-between px-6 py-4 bg-white border border-slate-200 rounded-2xl hover:border-indigo-300 transition-colors shadow-sm"
          >
            <span className="font-semibold text-slate-800">About the Technical Concepts</span>
            {techOpen ? (
              <ChevronUp className="w-4 h-4 text-slate-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-400" />
            )}
          </button>
          {techOpen && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-slate-600">
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">A2DP vs HFP</h3>
                  <p className="leading-relaxed">
                    Bluetooth headphones carry two audio profiles. A2DP (Advanced Audio Distribution Profile) delivers high-quality stereo music. HFP/HSP (Hands-Free Profile) delivers lower-quality audio plus a microphone. Windows often switches from A2DP to HFP at the wrong moment, degrading quality and causing instability.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">AVRCP</h3>
                  <p className="leading-relaxed">
                    Audio/Video Remote Control Profile — the protocol behind your earbuds' touch controls. Play, pause, skip, volume: all AVRCP. When duplicate AVRCP instances exist on the same device, they can fire conflicting control signals. Here, both instances sent phantom "pause" commands during brief audio buffer gaps.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">Intel Bluetooth Power Saving</h3>
                  <p className="leading-relaxed">
                    Intel's Bluetooth chip aggressively sleeps during "silence" to extend battery life. Brief audio buffer gaps look like silence to the driver. This causes the A2DP connection to drop momentarily, which the earbuds interpret as "playback ended," triggering an AVRCP pause. The four registry keys target this behavior.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">Why macOS doesn't have this problem</h3>
                  <p className="leading-relaxed">
                    Apple controls both the OS and the Bluetooth stack, allowing tight integration and strict profile management. Windows must support hardware from hundreds of manufacturers, making the audio stack inherently more complex and more prone to edge cases — especially around Bluetooth audio profiles.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="bg-indigo-600 rounded-2xl p-8 text-center text-white"
        >
          <h2 className="text-xl font-bold mb-3">The Skill Wayne Is Teaching Luna</h2>
          <p className="text-indigo-100 text-sm max-w-lg mx-auto leading-relaxed mb-6">
            Do not just Google. Describe precisely. Think with a partner — AI or human — who will not get frustrated, will not run out of energy at 4am, and will explain every trade-off before you commit.
            That is the skill. The specific problem does not matter.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/wayne/comics"
              className="inline-flex items-center justify-center bg-white text-indigo-700 font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-indigo-50 transition-colors"
            >
              Back to Comics
            </Link>
            <Link
              to="/wayne/insights"
              className="inline-flex items-center justify-center bg-indigo-500 text-white font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-indigo-400 transition-colors"
            >
              Read Wayne's Insights
            </Link>
          </div>
        </motion.div>
      </div>
      <CommentSection />
    </>
  );
}
