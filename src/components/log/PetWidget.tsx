import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { TargetAndTransition } from 'framer-motion';

// ─── Types ────────────────────────────────────────────────────────────────────

type PetScore = 0 | 1 | 2 | 3;

interface Task { status: 'none' | 'done' | 'skip'; }

interface PetWidgetProps {
  tasks: Task[];
  ctfUnlocked: boolean;
  lang: string;
  /** compact = horizontal strip; normal = vertical widget; hero = large centered display */
  size?: 'compact' | 'normal' | 'hero';
}

// ─── Config ───────────────────────────────────────────────────────────────────

const STATE_CFG: Record<PetScore, {
  img: string;
  labelEn: string;
  labelZh: string;
  hearts: number;
  heartColor: string;
  bgFrom: string;
  bgTo: string;
  particles: string[];
  glow: string;
}> = {
  3: {
    img: '/lunaimage/bunny_ecstatic.jpeg',
    labelEn: '✨ Super Star today!',
    labelZh: '✨ 今日满分！超厉害！',
    hearts: 3,
    heartColor: 'text-yellow-500',
    bgFrom: 'from-yellow-50',
    bgTo: 'to-pink-50',
    particles: ['✨', '⭐', '💫', '🌟', '💛', '🎉', '🌈'],
    glow: 'shadow-yellow-200',
  },
  2: {
    img: '/lunaimage/bunny_happy.jpeg',
    labelEn: '💕 Great job!',
    labelZh: '💕 做得很好！',
    hearts: 2,
    heartColor: 'text-pink-400',
    bgFrom: 'from-pink-50',
    bgTo: 'to-rose-50',
    particles: ['💕', '🌸', '💖', '🫧'],
    glow: 'shadow-pink-200',
  },
  1: {
    img: '/lunaimage/bunny_hungry.jpeg',
    labelEn: '🥕 Keep going!',
    labelZh: '🥕 继续加油！',
    hearts: 1,
    heartColor: 'text-orange-400',
    bgFrom: 'from-orange-50',
    bgTo: 'to-amber-50',
    particles: ['🥕', '⭐', '🌙'],
    glow: 'shadow-orange-100',
  },
  0: {
    img: '/lunaimage/bunny_sad.jpeg',
    labelEn: '😢 Come check in...',
    labelZh: '😢 快来打卡吧...',
    hearts: 0,
    heartColor: 'text-slate-300',
    bgFrom: 'from-slate-50',
    bgTo: 'to-blue-50',
    particles: ['💧', '😢'],
    glow: 'shadow-slate-100',
  },
};

// ─── Floating Particle ────────────────────────────────────────────────────────

function Particle({ emoji, index }: { emoji: string; index: number }) {
  const x  = (index % 3 - 1) * 40 + Math.random() * 20 - 10;
  const dur = 1.8 + Math.random() * 1.2;
  const del = index * 0.35 + Math.random() * 0.3;

  return (
    <motion.span
      className="absolute text-base pointer-events-none select-none"
      style={{ left: '50%', bottom: '55%' }}
      initial={{ opacity: 0, x, y: 0, scale: 0.5 }}
      animate={{ opacity: [0, 1, 1, 0], y: -70, scale: [0.5, 1.1, 1, 0.7] }}
      transition={{ duration: dur, delay: del, repeat: Infinity, repeatDelay: 1.5 + Math.random() }}
    >
      {emoji}
    </motion.span>
  );
}

// ─── Heart Row ────────────────────────────────────────────────────────────────

function Hearts({ filled, colorClass }: { filled: number; colorClass: string }) {
  return (
    <div className="flex gap-0.5 justify-center mt-1">
      {[0, 1, 2].map(i => (
        <motion.span
          key={i}
          className={`text-base transition-all duration-500 ${i < filled ? colorClass : 'text-slate-200'}`}
          animate={i < filled ? { scale: [1, 1.3, 1] } : {}}
          transition={{ delay: i * 0.15, duration: 0.4 }}
        >
          {i < filled ? '♥' : '♡'}
        </motion.span>
      ))}
    </div>
  );
}

// ─── Pet score persistence ────────────────────────────────────────────────────

function loadPetScore(): PetScore {
  try {
    const v = parseInt(localStorage.getItem('luna-pet-score') ?? '2', 10);
    return Math.max(0, Math.min(3, v)) as PetScore;
  } catch { return 2; }
}

function savePetScore(s: PetScore) {
  try { localStorage.setItem('luna-pet-score', String(s)); } catch { /* noop */ }
}

/** On new-day load: check if yesterday was completed and adjust score */
function checkDayRollover(onDrop: () => void): PetScore {
  try {
    const today     = new Date().toISOString().slice(0, 10);
    const lastDate  = localStorage.getItem('luna-pet-last-date');
    let   score     = loadPetScore();

    if (lastDate && lastDate !== today) {
      const last     = new Date(lastDate + 'T12:00:00');
      const now      = new Date(today    + 'T12:00:00');
      const daysGap  = Math.round((now.getTime() - last.getTime()) / 86400000);
      const completed = localStorage.getItem('luna-pet-last-completed') === 'true';

      if (completed) {
        score = Math.min(3, score + 1) as PetScore;
      } else {
        score = Math.max(0, score - 1) as PetScore;
        onDrop();
      }
      // Extra penalty for each additional missed day
      if (daysGap > 1) {
        score = Math.max(0, score - (daysGap - 1)) as PetScore;
        onDrop();
      }

      savePetScore(score);
      localStorage.setItem('luna-pet-last-date', today);
      localStorage.setItem('luna-pet-last-completed', 'false');
    } else if (!lastDate) {
      localStorage.setItem('luna-pet-last-date', today);
      localStorage.setItem('luna-pet-last-completed', 'false');
      savePetScore(2);
      score = 2;
    }

    return score;
  } catch { return 2; }
}

// ─── Main Widget ──────────────────────────────────────────────────────────────

export function PetWidget({ tasks, ctfUnlocked, lang, size = 'normal' }: PetWidgetProps) {
  const [showAngry,    setShowAngry]    = useState(false);
  const [justLevelUp,  setJustLevelUp]  = useState(false);
  const prevDisplayRef = useRef<PetScore>(2);
  const angryTimer     = useRef<ReturnType<typeof setTimeout> | null>(null);

  // On mount: roll over day if needed
  useEffect(() => {
    const score = checkDayRollover(() => {
      setShowAngry(true);
      if (angryTimer.current) clearTimeout(angryTimer.current);
      angryTimer.current = setTimeout(() => setShowAngry(false), 1600);
    });
    void score; // score still saved to localStorage via checkDayRollover; not needed in state
    return () => { if (angryTimer.current) clearTimeout(angryTimer.current); };
  }, []);

  // Compute real-time display score from today's tasks
  const displayScore: PetScore = (() => {
    const done  = tasks.filter(t => t.status === 'done').length;
    const total = tasks.length;
    // No tasks added yet → score 1 (hungry bunny waiting for work)
    if (total === 0) return 1;

    const rate = done / total;
    let base: number;
    if (rate === 1)       base = 3;  // 100% done
    else if (rate >= 0.5) base = 2;  // ≥50% done
    else if (rate > 0)    base = 1;  // some done
    else                  base = 0;  // tasks exist but 0% done → sad

    if (ctfUnlocked) base = Math.min(3, base + 1);
    return Math.max(0, Math.min(3, base)) as PetScore;
  })();

  // Detect level-up moment for celebration flash
  useEffect(() => {
    if (displayScore > prevDisplayRef.current) {
      setJustLevelUp(true);
      setTimeout(() => setJustLevelUp(false), 800);
    }
    prevDisplayRef.current = displayScore;
  }, [displayScore]);

  // Persist "today was completed" flag
  useEffect(() => {
    const done  = tasks.filter(t => t.status === 'done').length;
    const total = tasks.length;
    if (total > 0 && done === total) {
      try { localStorage.setItem('luna-pet-last-completed', 'true'); } catch { /* noop */ }
    }
  }, [tasks]);

  const cfg = STATE_CFG[showAngry ? 0 : displayScore];
  const imgSrc = showAngry ? '/lunaimage/bunny_angry.jpeg' : cfg.img;

  // Use waiting label when no tasks have been added yet (score is 1 but reason is different)
  const noTasks = tasks.length === 0;
  const label = showAngry
    ? (lang === 'zh' ? '😤 哎呀！' : '😤 Oh no!')
    : noTasks
      ? (lang === 'zh' ? '🥕 快来添加任务吧！' : '🥕 Add tasks to start!')
      : (lang === 'zh' ? cfg.labelZh : cfg.labelEn);

  // Animation variants per score — typed explicitly to satisfy Framer Motion's TargetAndTransition
  const bunnyVariants: Record<PetScore, TargetAndTransition> = {
    3: { y: [0, -18, 0], transition: { duration: 0.9, repeat: Infinity, ease: 'easeInOut' } },
    2: { y: [0, -7, 0],  transition: { duration: 1.8, repeat: Infinity, ease: 'easeInOut' } },
    1: { rotate: [-4, 4, -4], transition: { duration: 2.2, repeat: Infinity, ease: 'easeInOut' } },
    0: { x: [-2, 2, -2], transition: { duration: 2.8, repeat: Infinity, ease: 'easeInOut' } },
  };
  const variant: TargetAndTransition = showAngry ? bunnyVariants[0] : bunnyVariants[displayScore];

  // Pick a stable set of particles (don't re-randomize on every render)
  const particles = cfg.particles;

  // ── Compact (horizontal strip inside card) ─────────────────────────────────
  if (size === 'compact') {
    return (
      <div className={`relative flex items-center gap-3 w-full bg-gradient-to-r ${cfg.bgFrom} ${cfg.bgTo} overflow-hidden`}>
        {/* Level-up flash */}
        <AnimatePresence>
          {justLevelUp && (
            <motion.div
              className="absolute inset-0 bg-yellow-100 z-10 pointer-events-none"
              initial={{ opacity: 0.8 }} animate={{ opacity: 0 }}
              exit={{ opacity: 0 }} transition={{ duration: 0.7 }}
            />
          )}
        </AnimatePresence>

        {/* Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.slice(0, 3).map((p, i) => (
            <Particle key={`${displayScore}-${i}`} emoji={p} index={i} />
          ))}
        </div>

        {/* Bunny */}
        <div className="relative z-10 shrink-0">
          <AnimatePresence mode="wait">
            <motion.img
              key={imgSrc}
              src={imgSrc}
              alt="Bunny pet"
              className="w-16 h-16 object-contain drop-shadow-sm"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1, ...(variant as object) } as TargetAndTransition}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ opacity: { duration: 0.3 }, scale: { duration: 0.3 } }}
            />
          </AnimatePresence>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 relative z-10">
          <p className="text-xs font-bold text-slate-600 truncate">{label}</p>
          <Hearts filled={showAngry ? 0 : displayScore} colorClass={cfg.heartColor} />
          {/* Progress bar */}
          {tasks.length > 0 && (
            <div className="mt-1 h-1.5 bg-white/70 rounded-full overflow-hidden w-full max-w-[140px]">
              <motion.div
                className="h-full bg-pink-400 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${Math.round(tasks.filter(t => t.status === 'done').length / tasks.length * 100)}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── Hero (large centered, used in collapsed form view) ────────────────────
  if (size === 'hero') {
    return (
      <div className={`relative flex flex-col items-center py-6 w-full bg-gradient-to-b ${cfg.bgFrom} ${cfg.bgTo} select-none overflow-hidden`}>
        {/* Level-up flash */}
        <AnimatePresence>
          {justLevelUp && (
            <motion.div className="absolute inset-0 bg-yellow-100 z-10 pointer-events-none"
              initial={{ opacity: 0.8 }} animate={{ opacity: 0 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }} />
          )}
        </AnimatePresence>

        {/* Particles — more, all active */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((p, i) => (
            <Particle key={`hero-${displayScore}-${i}`} emoji={p} index={i} />
          ))}
        </div>

        {/* Big bunny */}
        <div className="relative z-10">
          <AnimatePresence mode="wait">
            <motion.img
              key={imgSrc}
              src={imgSrc}
              alt="Bunny pet"
              className="w-40 h-40 object-contain drop-shadow-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1, ...(variant as object) } as TargetAndTransition}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ opacity: { duration: 0.35 }, scale: { duration: 0.35 } }}
            />
          </AnimatePresence>
        </div>

        {/* Hearts — bigger */}
        <div className="flex gap-1 justify-center mt-2 relative z-10">
          {[0, 1, 2].map(i => (
            <motion.span key={i}
              className={`text-xl transition-all duration-500 ${i < (showAngry ? 0 : displayScore) ? cfg.heartColor : 'text-slate-200'}`}
              animate={i < (showAngry ? 0 : displayScore) ? { scale: [1, 1.4, 1] } : {}}
              transition={{ delay: i * 0.15, duration: 0.4 }}>
              {i < (showAngry ? 0 : displayScore) ? '♥' : '♡'}
            </motion.span>
          ))}
        </div>

        {/* Label */}
        <p className="mt-2 text-sm font-bold text-slate-600 relative z-10">{label}</p>
      </div>
    );
  }

  // ── Normal (vertical standalone widget) ────────────────────────────────────
  return (
    <div className={`relative flex flex-col items-center justify-end rounded-2xl bg-gradient-to-b ${cfg.bgFrom} ${cfg.bgTo} shadow-md ${cfg.glow} px-3 pt-3 pb-2 w-[120px] select-none overflow-hidden`}>
      {/* Level-up flash */}
      <AnimatePresence>
        {justLevelUp && (
          <motion.div
            className="absolute inset-0 bg-yellow-100 rounded-2xl z-10 pointer-events-none"
            initial={{ opacity: 0.7 }} animate={{ opacity: 0 }}
            exit={{ opacity: 0 }} transition={{ duration: 0.8 }}
          />
        )}
      </AnimatePresence>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p, i) => (
          <Particle key={`${displayScore}-${i}`} emoji={p} index={i} />
        ))}
      </div>

      {/* Bunny image */}
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          <motion.img
            key={imgSrc}
            src={imgSrc}
            alt="Bunny pet"
            className="w-20 h-20 object-contain drop-shadow-sm"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1, ...variant }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ opacity: { duration: 0.3 }, scale: { duration: 0.3 } }}
          />
        </AnimatePresence>
      </div>

      {/* Hearts */}
      <Hearts filled={showAngry ? 0 : displayScore} colorClass={cfg.heartColor} />

      {/* Label */}
      <p className="mt-1 text-center text-[10px] font-medium leading-tight text-slate-500 max-w-[105px]">
        {label}
      </p>
    </div>
  );
}
