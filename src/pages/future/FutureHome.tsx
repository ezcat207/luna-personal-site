import { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

// ── Design tokens (Arcade Quest) ──────────────────────────────────────────────
const T = {
  bg:        '#120a1f',
  surface:   '#1c1233',
  border:    '#2a1c44',
  borderMuted: '#3a2a52',
  textPrimary: '#ffffff',
  textBody:  '#c9bbe0',
  textMuted: '#b6a3d6',
  textFaint: '#8b6fb0',
  pink:      '#ff2e88',
  pinkShadow:'#b81e63',
  yellow:    '#ffe14d',
  green:     '#4ade80',
  cyan:      '#00e5ff',
  mono: "'JetBrains Mono', monospace",
  sans: "'Plus Jakarta Sans', sans-serif",
  display: "'Space Grotesk', sans-serif",
  arcade: "'Press Start 2P', monospace",
};

// ── Helpers ───────────────────────────────────────────────────────────────────
const difficultyColor = (d: string) => d === 'beginner' ? T.green : d === 'intermediate' ? T.cyan : T.pink;

// ── AI Age Test data ──────────────────────────────────────────────────────────
const QUESTIONS = [
  {
    id: 1,
    q: 'Have you used AI tools like ChatGPT, Claude, or Gemini?',
    options: [
      { text: "A. Never used, don't know how", score: 0 },
      { text: 'B. Used, but just casual chatting', score: 1 },
      { text: 'C. Often use, I write specific prompts', score: 2 },
      { text: 'D. Use AI to complete real work or projects', score: 3 },
    ],
  },
  {
    id: 2,
    q: 'If you want AI to write you a song, what do you do?',
    options: [
      { text: "A. Don't know where to start", score: 0 },
      { text: 'B. Type "write me a song" into ChatGPT', score: 1 },
      { text: 'C. Tell AI the style, mood, and direction', score: 2 },
      { text: 'D. Use a dedicated tool like Suno and fine-tune it', score: 3 },
    ],
  },
  {
    id: 3,
    q: 'Do you know what a "Prompt" is?',
    options: [
      { text: "A. Never heard of it", score: 0 },
      { text: "B. Yes — it's the message you send to AI", score: 1 },
      { text: 'C. Yes, and I use techniques to get better results', score: 2 },
      { text: 'D. I write system-level prompts that shape AI behavior', score: 3 },
    ],
  },
  {
    id: 4,
    q: 'Have you used AI to make a finished product — an article, image, video, or site?',
    options: [
      { text: 'A. No', score: 0 },
      { text: 'B. Yes, mostly AI — I tweaked a bit', score: 1 },
      { text: 'C. Yes — I led it, AI executed', score: 2 },
      { text: 'D. Often, I have my own workflow', score: 3 },
    ],
  },
  {
    id: 5,
    q: 'Do you know what an "AI Agent" is?',
    options: [
      { text: "A. Don't know", score: 0 },
      { text: "B. Heard it, but vague", score: 1 },
      { text: 'C. Yes — AI that autonomously completes tasks', score: 2 },
      { text: 'D. Used one, or built my own agent workflow', score: 3 },
    ],
  },
];

const LEVELS = [
  { min: 0,  max: 4,  level: 0, label: 'Level 0', name: 'Chat User',    color: '#7c6fa0', desc: "You know AI exists. Time to actually use it — start with Prompt basics and make your first thing.", nextStep: 'Start with Quest 0 → Entrepreneur track' },
  { min: 5,  max: 8,  level: 1, label: 'Level 1', name: 'Prompt Beginner', color: T.green, desc: "You can get stuff done with AI. Now sharpen your prompts and build a real project.", nextStep: 'Try Quest 1 → any track' },
  { min: 9,  max: 12, level: 2, label: 'Level 2', name: 'Context Master',  color: T.cyan,  desc: "You handle multi-step tasks. Jump into orchestration and ship something you're proud of.", nextStep: 'Jump to Quest 2 → Hacker or Game Dev' },
  { min: 13, max: 15, level: 3, label: 'Level 3', name: 'Agent Builder',   color: T.pink,  desc: "You're building agents. You're ahead of 99% of people. The advanced quests are waiting.", nextStep: 'Skip to Quest 3 → any track' },
];

// ── Free Tools data ───────────────────────────────────────────────────────────
const TOOLS = [
  { tier: 'beginner', label: '🌱 Beginner',
    items: [
      { name: 'ChatGPT',  domain: 'chat.openai.com',  color: '#10a37f', desc: 'Best first stop. Ask anything, get answers, start exploring.', url: 'https://chat.openai.com' },
      { name: 'Claude',   domain: 'claude.ai',        color: '#d97757', desc: 'Great for writing, analysis, and learning step-by-step.', url: 'https://claude.ai' },
      { name: 'Gemini',   domain: 'gemini.google.com',color: '#4285f4', desc: 'Google\'s AI — connected to Search and the real world.', url: 'https://gemini.google.com' },
    ],
  },
  { tier: 'intermediate', label: '⚡ Intermediate',
    items: [
      { name: 'Bolt.new',  domain: 'bolt.new',   color: '#a78bfa', desc: 'Build a working website in minutes with AI. No setup needed.', url: 'https://bolt.new' },
      { name: 'Cursor',    domain: 'cursor.sh',  color: '#00e5ff', desc: 'AI-powered code editor. Pair-program with AI on real projects.', url: 'https://cursor.sh' },
      { name: 'Suno',      domain: 'suno.ai',    color: '#ff2e88', desc: 'Type a vibe, get a full song. AI music in 10 seconds.', url: 'https://suno.ai' },
    ],
  },
  { tier: 'advanced', label: '🚀 Advanced',
    items: [
      { name: 'Claude Code',  domain: 'claude.ai/code', color: '#d97757', desc: 'Build real apps alongside an AI agent that writes and debugs.', url: 'https://claude.ai/code' },
      { name: 'LangChain',    domain: 'langchain.com',  color: '#4ade80', desc: 'Framework for building AI agents that use tools and memory.', url: 'https://langchain.com' },
      { name: 'Godot + AI',   domain: 'godotengine.org',color: '#478cbf', desc: 'Open source game engine — use AI to write game logic in GDScript.', url: 'https://godotengine.org' },
    ],
  },
];

// ── Course Paths data ─────────────────────────────────────────────────────────
const PATHS = [
  {
    emoji: '🧑‍💼', title: 'Entrepreneur', color: '#a78bfa', borderColor: '#a78bfa',
    tools: 'Bolt.new → Cursor',
    desc: 'Build websites, apps, and browser extensions.',
    quests: [
      { n: 0, name: 'My First Website',   out: 'Personal homepage', free: true },
      { n: 1, name: 'Interactive Portfolio', out: 'Portfolio + contact form', free: false },
      { n: 2, name: 'Blog Platform',      out: 'Multi-page blog with CMS', free: false },
      { n: 3, name: 'SaaS Prototype',     out: 'Working app with auth', free: false },
    ],
  },
  {
    emoji: '🕵️', title: 'Hacker', color: T.green, borderColor: T.green,
    tools: 'PicoCTF + CyberChef → Kali Linux',
    desc: 'CTF challenges and cybersecurity fundamentals.',
    quests: [
      { n: 0, name: 'First Cipher',       out: 'Decode your first flag', free: true },
      { n: 1, name: 'Web Exploits',       out: 'Find and fix SQL injection', free: false },
      { n: 2, name: 'Network Analysis',   out: 'Capture and read packets', free: false },
      { n: 3, name: 'Binary Exploitation',out: 'Buffer overflow challenge', free: false },
    ],
  },
  {
    emoji: '🎮', title: 'Game Dev', color: T.pink, borderColor: T.pink,
    tools: 'GDevelop → Godot 4 → Roblox Studio',
    desc: 'Build games from clicker to multiplayer.',
    quests: [
      { n: 0, name: 'Clicker Game',       out: 'Your first playable game', free: true },
      { n: 1, name: 'Platformer',         out: 'Jump-and-run adventure', free: false },
      { n: 2, name: 'Puzzle Game',        out: 'Brain-teasing mechanics', free: false },
      { n: 3, name: 'Multiplayer Arena',  out: 'Real-time PvP game', free: false },
    ],
  },
  {
    emoji: '🎬', title: 'Director', color: T.yellow, borderColor: '#c9960a',
    tools: 'Kling AI + ElevenLabs + Suno + CapCut',
    desc: 'AI-powered video and storytelling.',
    quests: [
      { n: 0, name: 'First Short Film',   out: '30-sec AI-generated video', free: true },
      { n: 1, name: 'Music Video',        out: 'AI song + AI visuals', free: false },
      { n: 2, name: 'Animated Story',     out: 'Character-driven narrative', free: false },
      { n: 3, name: 'Mini Documentary',   out: 'Research + script + produce', free: false },
    ],
  },
];

// ── Component ─────────────────────────────────────────────────────────────────
export default function FutureHome() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [expandedPath, setExpandedPath] = useState<number | null>(null);

  const totalScore = Object.values(answers).reduce((s, v) => s + v, 0);
  const answered = Object.keys(answers).length;
  const result = showResult
    ? LEVELS.find(l => totalScore >= l.min && totalScore <= l.max) ?? LEVELS[0]
    : null;

  return (
    <>
      <Helmet>
        <title>LunaWayne — Level Up Into Your Future</title>
        <meta name="description" content="Gamified AI education for teens. Take the AI Age test, explore free tools, and start your learning quest — Quest 0 is always free." />
      </Helmet>

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section style={{ padding: '72px 40px 80px', textAlign: 'center', position: 'relative', overflow: 'hidden', maxWidth: 1180, margin: '0 auto' }}>
        {/* glow blobs */}
        <div style={{ position:'absolute', top:20, left:'8%', width:160, height:160, background:'radial-gradient(circle,#ff2e8840,transparent 70%)', borderRadius:'50%', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:0, right:'6%', width:200, height:200, background:'radial-gradient(circle,#00e5ff30,transparent 70%)', borderRadius:'50%', pointerEvents:'none' }} />

        {/* eyebrow pill */}
        <div style={{ display:'inline-flex', alignItems:'center', gap:9, fontFamily: T.arcade, fontSize:10, color: T.yellow, border:`2px solid ${T.borderMuted}`, background: T.surface, padding:'9px 18px', borderRadius:999, marginBottom:28 }}>
          ★ PRESS START · FREE
        </div>

        <h1 style={{ fontFamily: T.display, fontSize:'clamp(48px,7vw,72px)', lineHeight:1.04, fontWeight:700, color: T.textPrimary, margin:'0 0 22px', letterSpacing:'-1.5px' }}>
          Level up into<br />your{' '}
          <span style={{ background:'linear-gradient(120deg,#ff2e88,#ffe14d)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
            future.
          </span>
        </h1>

        <p style={{ fontSize:19, lineHeight:1.6, color: T.textMuted, maxWidth:560, margin:'0 auto 36px', fontFamily: T.sans }}>
          Pick a dream — scientist, game-maker, founder — and quest through real projects to get there. Free resources, unlocked level by level.
        </p>

        <div style={{ display:'flex', gap:14, justifyContent:'center', flexWrap:'wrap' }}>
          <a href="#test" style={{ background: T.pink, color:'#fff', fontWeight:700, fontFamily: T.sans, fontSize:16, padding:'15px 32px', borderRadius:999, boxShadow:`0 8px 0 ${T.pinkShadow}`, textDecoration:'none', display:'inline-block' }}>
            Play free →
          </a>
          <a href="#courses" style={{ border:`2px solid ${T.borderMuted}`, color: T.textPrimary, fontWeight:700, fontFamily: T.sans, fontSize:16, padding:'13px 28px', borderRadius:999, textDecoration:'none', display:'inline-block' }}>
            See the map
          </a>
        </div>
      </section>

      {/* ── AI AGE TEST ──────────────────────────────────────────── */}
      <section id="test" style={{ borderTop:`1px solid ${T.border}`, padding:'72px 40px 80px', scrollMarginTop:72 }}>
        <div style={{ maxWidth:800, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:48 }}>
            <div style={{ fontFamily: T.arcade, fontSize:10, color: T.pink, marginBottom:14, letterSpacing:1 }}>FIND YOUR LEVEL</div>
            <h2 style={{ fontFamily: T.display, fontSize:'clamp(32px,5vw,44px)', fontWeight:700, color: T.textPrimary, margin:'0 0 12px' }}>What's Your AI Age?</h2>
            <p style={{ fontFamily: T.sans, fontSize:17, color: T.textMuted, margin:0 }}>5 questions, 1 minute. Then we tell you exactly where to start.</p>
          </div>

          <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
            {QUESTIONS.map((q, qi) => (
              <motion.div
                key={q.id}
                initial={{ opacity:0, y:16 }}
                whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }}
                transition={{ delay: qi * 0.07 }}
                style={{ background: T.surface, border:`1px solid ${T.border}`, borderRadius:16, padding:'24px 28px' }}
              >
                <div style={{ display:'flex', alignItems:'baseline', gap:12, marginBottom:16 }}>
                  <span style={{ fontFamily: T.arcade, fontSize:9, color: T.pink, flexShrink:0 }}>Q{q.id}</span>
                  <span style={{ fontFamily: T.display, fontWeight:600, fontSize:17, color: T.textPrimary, lineHeight:1.35 }}>{q.q}</span>
                </div>
                <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                  {q.options.map(opt => {
                    const chosen = answers[q.id] === opt.score;
                    return (
                      <label key={opt.text} style={{ display:'flex', alignItems:'center', gap:12, padding:'11px 16px', borderRadius:10, border:`1px solid ${chosen ? T.pink : T.border}`, background: chosen ? 'rgba(255,46,136,0.10)' : 'rgba(255,255,255,0.02)', cursor:'pointer', transition:'all .15s' }}>
                        <input type="radio" name={`q${q.id}`} checked={chosen} onChange={() => setAnswers(p => ({ ...p, [q.id]: opt.score }))} style={{ accentColor: T.pink, width:16, height:16, flexShrink:0 }} />
                        <span style={{ fontFamily: T.sans, fontSize:15, color: chosen ? '#fff' : T.textBody, lineHeight:1.4 }}>{opt.text}</span>
                      </label>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Submit */}
          {answered === QUESTIONS.length && !showResult && (
            <motion.div initial={{ opacity:0, scale:.95 }} animate={{ opacity:1, scale:1 }} style={{ textAlign:'center', marginTop:36 }}>
              <button
                onClick={() => { setShowResult(true); setTimeout(() => document.getElementById('result')?.scrollIntoView({ behavior:'smooth' }), 100); }}
                style={{ background: T.green, color:'#07120b', fontWeight:700, fontFamily: T.sans, fontSize:18, padding:'16px 44px', borderRadius:999, border:'none', cursor:'pointer', boxShadow:'0 8px 0 #16a34a' }}
              >
                See My Level →
              </button>
            </motion.div>
          )}

          {/* Result */}
          {showResult && result && (
            <motion.div id="result" initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} style={{ marginTop:40, background: T.surface, border:`2px solid ${result.color}`, borderRadius:20, padding:'36px 40px', boxShadow:`0 0 40px ${result.color}30` }}>
              <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:20 }}>
                <div style={{ fontFamily: T.arcade, fontSize:11, color: result.color, background:`${result.color}18`, border:`1px solid ${result.color}50`, borderRadius:999, padding:'8px 18px' }}>
                  {result.label}
                </div>
                <div style={{ fontFamily: T.mono, fontSize:13, color: T.textFaint }}>score: {totalScore} / 15</div>
              </div>
              <h3 style={{ fontFamily: T.display, fontSize:32, fontWeight:700, color: T.textPrimary, margin:'0 0 10px' }}>{result.name}</h3>
              <p style={{ fontFamily: T.sans, fontSize:17, color: T.textBody, margin:'0 0 24px', lineHeight:1.6 }}>{result.desc}</p>
              <div style={{ background:'rgba(255,255,255,0.04)', borderRadius:12, padding:'16px 20px' }}>
                <div style={{ fontFamily: T.arcade, fontSize:9, color: T.yellow, marginBottom:8, letterSpacing:1 }}>RECOMMENDED NEXT STEP</div>
                <div style={{ fontFamily: T.sans, fontWeight:600, fontSize:16, color:'#fff' }}>{result.nextStep}</div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* ── FREE TOOLS ───────────────────────────────────────────── */}
      <section id="tools" style={{ borderTop:`1px solid ${T.border}`, padding:'72px 40px 80px', scrollMarginTop:72 }}>
        <div style={{ maxWidth:1180, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:52 }}>
            <div style={{ fontFamily: T.arcade, fontSize:10, color: T.cyan, marginBottom:14, letterSpacing:1 }}>FREE PLAYGROUND</div>
            <h2 style={{ fontFamily: T.display, fontSize:'clamp(30px,4vw,40px)', fontWeight:700, color: T.textPrimary, margin:'0 0 12px' }}>Your Starter Toolkit</h2>
            <p style={{ fontFamily: T.sans, fontSize:17, color: T.textMuted, margin:0 }}>All free. Open one and start experimenting.</p>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(320px, 1fr))', gap:24 }}>
            {TOOLS.map((tier, ti) => (
              <motion.div key={tier.tier} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay: ti*0.1 }}>
                <div style={{ fontFamily: T.arcade, fontSize:9, color: difficultyColor(tier.tier), marginBottom:14, letterSpacing:1 }}>{tier.label}</div>
                <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                  {tier.items.map(tool => (
                    <a key={tool.name} href={tool.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration:'none', display:'block', background: T.surface, border:`1px solid ${T.border}`, borderRadius:16, padding:'18px 20px' }}
                       onMouseEnter={e => (e.currentTarget.style.borderColor = difficultyColor(tier.tier))}
                       onMouseLeave={e => (e.currentTarget.style.borderColor = T.border)}>
                      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:8 }}>
                        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                          <div style={{ width:42, height:42, borderRadius:12, background: tool.color, display:'flex', alignItems:'center', justifyContent:'center', fontFamily: T.display, fontWeight:700, fontSize:17, color:'#fff' }}>
                            {tool.name[0]}
                          </div>
                          <div>
                            <div style={{ fontFamily: T.display, fontWeight:700, fontSize:17, color:'#fff' }}>{tool.name}</div>
                            <div style={{ fontFamily: T.mono, fontSize:11, color: T.textFaint }}>{tool.domain}</div>
                          </div>
                        </div>
                        <div style={{ fontFamily: T.mono, fontSize:12, color: difficultyColor(tier.tier), background:`${difficultyColor(tier.tier)}18`, padding:'3px 10px', borderRadius:999 }}>
                          {tier.tier}
                        </div>
                      </div>
                      <p style={{ fontFamily: T.sans, fontSize:14, color: T.textBody, margin:0, lineHeight:1.55 }}>{tool.desc}</p>
                      <div style={{ marginTop:14, background: T.border, color:'#fff', fontFamily: T.sans, fontWeight:600, fontSize:14, padding:'10px 16px', borderRadius:10, textAlign:'center' }}>
                        Open {tool.name} →
                      </div>
                    </a>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COURSES ──────────────────────────────────────────────── */}
      <section id="courses" style={{ borderTop:`1px solid ${T.border}`, padding:'72px 40px 80px', scrollMarginTop:72 }}>
        <div style={{ maxWidth:1180, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:52 }}>
            <div style={{ fontFamily: T.arcade, fontSize:10, color: T.yellow, marginBottom:14, letterSpacing:1 }}>CHOOSE YOUR PATH</div>
            <h2 style={{ fontFamily: T.display, fontSize:'clamp(30px,4vw,40px)', fontWeight:700, color: T.textPrimary, margin:'0 0 12px' }}>Choose your level</h2>
            <p style={{ fontFamily: T.arcade, fontSize:9, color: T.textFaint, margin:0, letterSpacing:1 }}>UNLOCK ONE TO REACH THE NEXT</p>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(480px, 1fr))', gap:18 }}>
            {PATHS.map((path, pi) => {
              const expanded = expandedPath === pi;
              const visibleQuests = expanded ? path.quests : path.quests.slice(0, 2);
              return (
                <motion.div key={path.title} initial={{ opacity:0, scale:.97 }} whileInView={{ opacity:1, scale:1 }} viewport={{ once:true }} transition={{ delay: pi*0.08 }}
                  style={{ background: T.surface, border:`2px solid ${expanded ? path.borderColor : T.border}`, borderRadius:20, padding:'26px 28px', transition:'border-color .2s' }}>

                  <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:16 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:14 }}>
                      <div style={{ width:52, height:52, borderRadius:14, background:`${path.color}25`, border:`2px solid ${path.color}60`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:26 }}>
                        {path.emoji}
                      </div>
                      <div>
                        <div style={{ fontFamily: T.display, fontWeight:700, fontSize:20, color:'#fff' }}>{path.title}</div>
                        <div style={{ fontFamily: T.sans, fontSize:13, color: T.textMuted, marginTop:3 }}>{path.desc}</div>
                      </div>
                    </div>
                  </div>

                  <div style={{ fontFamily: T.mono, fontSize:11, color: T.textFaint, background: T.border, padding:'7px 14px', borderRadius:8, marginBottom:18 }}>
                    🛠 {path.tools}
                  </div>

                  <div style={{ display:'flex', flexDirection:'column', gap:8, marginBottom:16 }}>
                    {visibleQuests.map(q => (
                      <div key={q.n} style={{ display:'flex', alignItems:'center', gap:12 }}>
                        <div style={{ width:32, height:32, borderRadius:'50%', background: q.free ? '#16a34a' : T.border, border:`2px solid ${q.free ? T.green : T.borderMuted}`, display:'flex', alignItems:'center', justifyContent:'center', fontFamily: T.arcade, fontSize:8, color: q.free ? T.green : T.textFaint, flexShrink:0 }}>
                          Q{q.n}
                        </div>
                        <div style={{ flex:1 }}>
                          <span style={{ fontFamily: T.sans, fontWeight:600, fontSize:14, color:'#fff' }}>{q.name}</span>
                          <span style={{ fontFamily: T.sans, fontSize:13, color: T.textMuted, marginLeft:8 }}>— {q.out}</span>
                        </div>
                        {q.free && <span style={{ fontFamily: T.arcade, fontSize:8, color: T.green, background:'rgba(74,222,128,.12)', padding:'4px 8px', borderRadius:6, flexShrink:0 }}>FREE</span>}
                      </div>
                    ))}
                  </div>

                  <button onClick={() => setExpandedPath(expanded ? null : pi)}
                    style={{ background:'none', border:'none', cursor:'pointer', fontFamily: T.mono, fontSize:11, color: T.textFaint, padding:'4px 0', marginBottom:14 }}>
                    {expanded ? '▲ show less' : `▼ +${path.quests.length - 2} more quests`}
                  </button>

                  <button style={{ width:'100%', padding:'13px 0', background: T.pink, color:'#fff', fontFamily: T.sans, fontWeight:700, fontSize:15, borderRadius:999, border:'none', cursor:'pointer', boxShadow:`0 6px 0 ${T.pinkShadow}` }}>
                    Start Quest 0 — FREE
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section style={{ padding:'72px 40px 96px' }}>
        <div style={{ maxWidth:860, margin:'0 auto', background:'linear-gradient(135deg,#ff2e88,#a78bfa)', borderRadius:24, padding:'60px 48px', textAlign:'center', position:'relative', overflow:'hidden' }}>
          <div style={{ position:'absolute', top:-40, right:-40, width:200, height:200, background:'rgba(255,255,255,0.06)', borderRadius:'50%', pointerEvents:'none' }} />
          <div style={{ fontFamily: T.arcade, fontSize:10, color: T.yellow, marginBottom:18, letterSpacing:1, position:'relative' }}>YOUR TURN</div>
          <h2 style={{ fontFamily: T.display, fontSize:'clamp(28px,4vw,40px)', fontWeight:700, color:'#fff', margin:'0 0 14px', position:'relative' }}>Ready for launch?</h2>
          <p style={{ fontFamily: T.sans, fontSize:18, color:'rgba(255,255,255,0.85)', margin:'0 0 32px', position:'relative' }}>Quest 0 is free — forever. Pick your path and build your first real thing.</p>
          <a href="#test" style={{ background:'#fff', color: T.pink, fontWeight:800, fontFamily: T.sans, fontSize:17, padding:'16px 40px', borderRadius:999, textDecoration:'none', display:'inline-block', boxShadow:'0 8px 0 rgba(0,0,0,0.20)', position:'relative' }}>
            Play free →
          </a>
        </div>
      </section>
    </>
  );
}
