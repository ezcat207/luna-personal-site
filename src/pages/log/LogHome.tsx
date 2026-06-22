import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { supabase } from '../../lib/supabase';
import { PetWidget } from '../../components/log/PetWidget';
import { AuthButton } from '../../components/AuthButton';
import { useAuth } from '../../hooks/useAuth';

// ─── Encouragement Phrases (100 entries, for dad's comment section) ───────────

const ENCOURAGEMENTS: string[] = [
  "You showed up today — that's what champions do! 🏆",
  "Every problem you solve makes your brain stronger! 💪",
  "I am SO proud of you! 🌟",
  "Learning is your superpower! ⚡",
  "You make me incredibly proud just by trying! 💖",
  "Your effort today will pay off tomorrow! 📈",
  "You're building skills most adults never learn! 🔑",
  "Keep going — you're closer than you think! 🎯",
  "Hard work + curiosity = unstoppable you! 🚀",
  "You turned confusion into understanding — magic! ✨",
  "Mistakes are stepping stones — you're climbing! 🧗",
  "Your persistence is your greatest strength! 🌊",
  "One step at a time — you're getting there! 👣",
  "Today's struggle is tomorrow's skill! 💡",
  "You didn't give up. That's everything! 🎖️",
  "Watching you grow fills my heart! 🌱",
  "Proud of you for showing up on tough days too! 🤝",
  "You're learning things that challenge grown-ups! 🧠",
  "'Not yet' is just the beginning — keep going! ⏳",
  "You're braver than you know! 🦁",
  "The world needs curious minds like yours! 🌍",
  "Your questions are better than most people's answers! ❓",
  "Reading + thinking + doing = you're unstoppable! 📚",
  "You tackled something hard today — hero stuff! 🦸",
  "Consistency is your secret weapon! 🔒",
  "Small steps every day lead to giant leaps! 🌙",
  "I see how hard you're working — keep it up! 👀",
  "Your determination inspires me every single day! 🌅",
  "You're building your future one day at a time! 🏗️",
  "The effort is yours. The growth is yours too! 🌿",
  "Challenges make you sharper — you're getting sharp! ⚔️",
  "You're doing something many kids never try! 🌈",
  "Your brain is a muscle you work out every day! 🏋️",
  "Focus + practice = brilliance. You've got both! 💎",
  "You're doing something extraordinary — never forget it! 🎆",
  "Keep believing in yourself — I always do! 💌",
  "You're writing your own success story! 📖",
  "Difficulties reveal strength. Yours is showing! 🌟",
  "You faced it, you tried — that IS the win! 🥇",
  "Big dreams need daily effort. You've got both! 🌠",
  "I'm your biggest fan, always and forever! 📣",
  "You're building habits that will last a lifetime! ⚙️",
  "Even on hard days, you showed up — that's everything! 💫",
  "Your curiosity is a gift — never lose it! 🎁",
  "You are more capable than you realize! 🔭",
  "Every challenge is a chance to grow — you grew today! 🌻",
  "The road is long but you're walking it bravely! 🛤️",
  "Nothing today was wasted — every minute counts! ⏱️",
  "You're turning hard things into normal things! 🦋",
  "You amaze me every single day! 💥",
  "Showing up is half the battle — you won today! 🎊",
  "Your work ethic is something to be proud of! 🏅",
  "The harder you work, the luckier you'll get! 🍀",
  "Discipline + heart = a force of nature. That's you! 🌪️",
  "You did what needed to be done — that's maturity! 🎓",
  "Dream big, work hard, stay humble — nailing all three! 🌏",
  "Today's effort is building tomorrow's confidence! 🏠",
  "You're planting seeds of excellence every day! 🌾",
  "Each day you choose growth over comfort. 🌄",
  "I see your effort even when it's invisible to others! 🔍",
  "You're doing at 8 what others do at 18! 🚀",
  "Your focus today will pay dividends for years! 💰",
  "The challenges you face today shape your future! 🔮",
  "You're proving every day that you're exceptional! ⭐",
  "Hard work is its own reward — you're earning it! 🎯",
  "Your mindset is everything — and yours is gold! 🥇",
  "I love that you keep trying, no matter what! ❤️",
  "Progress over perfection — and you're progressing! 📊",
  "You turned 'I can't' into 'I did.' Powerful! ⚡",
  "Your dedication is rare and precious! 💎",
  "Every session builds on the last. Stacking wins! 🏗️",
  "You're growing in ways you can't even see yet! 🌱",
  "Your perseverance is setting the foundation for greatness! 🏛️",
  "I'm watching you become someone remarkable! 🌠",
  "Strong work today — I mean every word! 💪",
  "You're making the impossible look possible! ✅",
  "Keep your eyes on the goal — you're getting closer! 🎯",
  "Learning is a long game and you're playing it brilliantly! ♟️",
  "The fact that you tried makes me proud! 🌺",
  "Every expert was once where you are — keep going! 🛤️",
  "Your effort today is a gift to future-you! 🎀",
  "You're exactly where you need to be right now! 📍",
  "Showing up consistently is the real secret to success! 🔑",
  "You make hard work look like an adventure! 🗺️",
  "The grit you're building will carry you far! 🦅",
  "One more day closer to where you want to be! 📅",
  "You're doing the work — results will follow! 🌊",
  "I'm so glad you're you. Keep being amazing! 🌟",
  "Your best today is better than your best yesterday! 📈",
  "You're learning to think — the most valuable skill! 🧩",
  "The world is bigger because you're curious about it! 🌍",
  "Every hard day makes the easy days sweeter! 🍯",
  "You're building mental toughness one session at a time! 🔨",
  "I admire your courage to keep going — always! 🦸",
  "Today you were completely unstoppable! 🚂",
  "You're not just doing tasks — you're building character! 🏆",
  "The discipline you practice today shapes who you'll be! 🎭",
  "Nothing worth having comes easy — and you know it! 💡",
  "You're writing a story I'm so proud to be part of! 📝",
  "Every day you choose learning is a day well spent! ✨",
];

// ─── Template Definitions ──────────────────────────────────────────────────────

type TemplateId = 'school' | 'summer' | 'custom';
type TaskStatus = 'none' | 'done' | 'skip';
type Weather    = 'sunny' | 'cloudy' | 'rainy';
type CtfStatus  = 'idle' | 'format_err' | 'used_err' | 'unlocked';

interface SubjectDef { key: string; label: string; color: string; }

// name / cardTitle live in i18n: log.templates.<id>.name / .cardTitle
const TEMPLATES: Record<TemplateId, { subjects: SubjectDef[] }> = {
  school: {
    subjects: [
      { key: 'chinese', label: 'Chinese', color: '#fda4af' },
      { key: 'math',    label: 'Math',    color: '#93c5fd' },
      { key: 'english', label: 'English', color: '#86efac' },
      { key: 'reading', label: 'Reading', color: '#fde68a' },
      { key: 'other',   label: 'Other',   color: '#e9d5ff' },
    ],
  },
  summer: {
    subjects: [
      { key: 'reading',   label: 'Reading 📖',   color: '#bfdbfe' },
      { key: 'piano',     label: 'Piano 🎹',      color: '#e9d5ff' },
      { key: 'math',      label: 'Math 🧮',        color: '#fecaca' },
      { key: 'chinese',   label: 'Chinese 🇨🇳',    color: '#fbcfe8' },
      { key: 'dinner',    label: 'Dinner 🍽️',      color: '#bbf7d0' },
      { key: 'badminton', label: 'Badminton 🏸',   color: '#a7f3d0' },
      { key: 'self_task', label: 'My Task 🌟',     color: '#fef08a' },
      { key: 'ai_coding', label: 'AI Coding 🤖',   color: '#c7d2fe' },
    ],
  },
  custom: {
    subjects: [],
  },
};

// ─── Types ────────────────────────────────────────────────────────────────────

interface Task {
  id: string;
  log_id: string;
  subject: string;
  task_text: string;
  est_mins: number | null;
  actual_mins: number | null;
  status: TaskStatus;
  wrong_count: number;
  sort_order: number;
}

interface DailyLog {
  id: string;
  log_date: string;
  template: TemplateId;
  weather: Weather;
  wake_time: string | null;
  sleep_time: string | null;
  self_efficiency: number;
  self_accuracy: number;
  self_handwriting: number;
  luna_notes: string | null;
  dad_comment: string | null;
  user_id: string | null;
  is_public: boolean;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function todayStr() {
  // Use Pacific Time so the date matches the US West Coast day
  return new Date().toLocaleDateString('en-CA', { timeZone: 'America/Los_Angeles' });
}

function offsetDate(base: string, days: number) {
  const d = new Date(base + 'T12:00:00');
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

function formatDateFull(s: string, lang: string) {
  const d = new Date(s + 'T12:00:00');
  if (lang === 'zh') {
    const wd = ['日', '一', '二', '三', '四', '五', '六'][d.getDay()];
    return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日 · 周${wd}`;
  }
  return d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

function formatDateShort(s: string, lang: string) {
  const d  = new Date(s + 'T12:00:00');
  const md = `${d.getMonth() + 1}/${d.getDate()}`;
  if (lang === 'zh') {
    const wd = ['日', '一', '二', '三', '四', '五', '六'][d.getDay()];
    return { md, wd: `周${wd}` };
  }
  return { md, wd: d.toLocaleDateString('en-US', { weekday: 'short' }) };
}

function pickRandom<T>(arr: T[], n: number): T[] {
  return [...arr].sort(() => Math.random() - 0.5).slice(0, n);
}

// ─── Stars ────────────────────────────────────────────────────────────────────

function Stars({ value, onChange }: { value: number; onChange?: (v: number) => void }) {
  return (
    <span className="inline-flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <button key={i} type="button" onClick={() => onChange?.(value === i ? 0 : i)}
          className="text-sm leading-none transition-transform hover:scale-125">
          {i <= value ? '⭐' : '☆'}
        </button>
      ))}
    </span>
  );
}

// ─── Status Button ────────────────────────────────────────────────────────────

function StatusBtn({ status, onClick }: { status: TaskStatus; onClick: () => void }) {
  const cfg = {
    none: { ch: '○', cls: 'text-slate-300 border-slate-200 hover:text-green-500 hover:border-green-400' },
    done: { ch: '✓', cls: 'text-green-600 border-green-400 bg-green-50 font-bold' },
    skip: { ch: '✗', cls: 'text-red-400 border-red-300 bg-red-50 font-bold' },
  }[status];
  return (
    <button type="button" onClick={onClick}
      className={`w-6 h-6 rounded border text-xs flex items-center justify-center transition-all shrink-0 ${cfg.cls}`}>
      {cfg.ch}
    </button>
  );
}

// ─── Task Row ─────────────────────────────────────────────────────────────────

// columns: [task-text flex] [status 28px] [est 36px] [actual 36px] [wrong 30px] [del 18px]
const ROW_COLS = '1fr 28px 36px 36px 30px 18px';

function TaskRow({ task, onUpdate, onDelete, onToggle }: {
  task: Task;
  onUpdate: (id: string, f: Partial<Task>) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
}) {
  const { t } = useTranslation();
  return (
    <div className="grid items-center gap-0.5 border-b border-dashed border-amber-100 py-1"
      style={{ gridTemplateColumns: ROW_COLS }}>
      <input
        type="text"
        value={task.task_text}
        onChange={e => onUpdate(task.id, { task_text: e.target.value })}
        placeholder={t('log.task_ph')}
        className={`text-xs bg-transparent focus:outline-none focus:bg-pink-50/50 rounded px-1 min-w-0 w-full ${
          task.status === 'done' ? 'line-through text-slate-400' : 'text-slate-700'}`}
      />
      <div className="flex justify-center">
        <StatusBtn status={task.status} onClick={() => onToggle(task.id)} />
      </div>
      <input type="number" min={0} value={task.est_mins ?? ''} placeholder="--"
        onChange={e => onUpdate(task.id, { est_mins: e.target.value ? +e.target.value : null })}
        className="w-full text-center text-xs border border-slate-200 rounded px-0.5 py-0.5 focus:outline-none focus:border-pink-300 bg-transparent" />
      <input type="number" min={0} value={task.actual_mins ?? ''} placeholder="--"
        onChange={e => onUpdate(task.id, { actual_mins: e.target.value ? +e.target.value : null })}
        className="w-full text-center text-xs border border-slate-200 rounded px-0.5 py-0.5 focus:outline-none focus:border-pink-300 bg-transparent" />
      <input type="number" min={0} value={task.wrong_count || ''} placeholder="0"
        onChange={e => onUpdate(task.id, { wrong_count: +e.target.value || 0 })}
        className="w-full text-center text-xs border border-slate-200 rounded px-0.5 py-0.5 focus:outline-none focus:border-pink-300 bg-transparent" />
      <button onClick={() => onDelete(task.id)} className="text-slate-200 hover:text-red-400 text-xs text-center">✕</button>
    </div>
  );
}

// ─── Subject Section ──────────────────────────────────────────────────────────

function SubjectSection({ subj, tasks, onAdd, onUpdate, onDelete, onToggle }: {
  subj: SubjectDef;
  tasks: Task[];
  onAdd: () => void;
  onUpdate: (id: string, f: Partial<Task>) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
}) {
  const { t } = useTranslation();
  const done = tasks.filter(tk => tk.status === 'done').length;

  return (
    <div className="flex border-b border-amber-100 last:border-b-0">
      {/* Subject strip — vertical label */}
      <div className="w-9 shrink-0 flex flex-col items-center justify-start pt-2 pb-1 gap-0 border-r border-amber-100 relative"
        style={{ background: subj.color + '55' }}>
        <span
          className="text-[10px] font-bold text-slate-600 select-none"
          style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', letterSpacing: '0.05em' }}>
          {subj.label}
        </span>
        {tasks.length > 0 && (
          <span className="text-[9px] text-slate-400 mt-1 font-medium">{done}/{tasks.length}</span>
        )}
      </div>

      {/* Task rows area */}
      <div className="flex-1 min-w-0 px-1">
        {tasks.map(task => (
          <TaskRow key={task.id} task={task} onUpdate={onUpdate} onDelete={onDelete} onToggle={onToggle} />
        ))}
        <button onClick={onAdd}
          className="w-full text-left text-[10px] text-pink-400 hover:text-pink-600 py-1 px-1 hover:bg-pink-50/40 transition-colors">
          {t('log.add_task')}
        </button>
      </div>
    </div>
  );
}

// ─── History Tile ─────────────────────────────────────────────────────────────

function DayTile({ date, pct, active, isToday, lang, onClick }: {
  date: string; pct: number; active: boolean; isToday: boolean; lang: string; onClick: () => void;
}) {
  const { md, wd } = formatDateShort(date, lang);
  const dotBg = pct === 0 ? '#e2e8f0' : pct < 50 ? '#fde68a' : pct < 100 ? '#86efac' : '#4ade80';
  return (
    <button onClick={onClick}
      className={`flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-xl border-2 shrink-0 transition-all ${
        active ? 'border-pink-400 bg-pink-50' : 'border-transparent hover:border-pink-200 bg-white'}`}>
      <span className="text-[10px] text-slate-400 font-medium">{wd}</span>
      <span className="text-xs font-bold text-slate-600">{md}</span>
      <div className="w-6 h-6 rounded-full border border-slate-200 flex items-center justify-center"
        style={{ background: dotBg }}>
        {isToday && pct === 0
          ? <span className="text-[9px]">🐰</span>
          : pct > 0 ? <span className="text-[9px] font-bold text-slate-700">{pct}%</span>
          : null}
      </div>
    </button>
  );
}

// ─── Add Custom Subject ───────────────────────────────────────────────────────

function AddSubjectRow({ onAdd }: { onAdd: (name: string) => void }) {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const submit = () => { if (name.trim()) { onAdd(name.trim()); setName(''); } };
  return (
    <div className="flex gap-2 px-2 py-1.5 border-t border-dashed border-amber-100">
      <input type="text" value={name} onChange={e => setName(e.target.value)}
        placeholder={t('log.add_subject_ph')}
        onKeyDown={e => e.key === 'Enter' && submit()}
        className="flex-1 text-xs border border-dashed border-slate-300 rounded-lg px-2 py-1 focus:outline-none" />
      <button onClick={submit}
        className="px-2.5 py-1 bg-pink-100 text-pink-600 text-xs font-bold rounded-lg hover:bg-pink-200 transition-colors">
        {t('log.add_subject_btn')}
      </button>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function LogHome() {
  const { t, i18n } = useTranslation();
  const today = todayStr();
  const lang  = i18n.language;
  const { user, authLoading } = useAuth();

  const [currentDate, setCurrentDate]     = useState(today);
  const [log,         setLog]             = useState<DailyLog | null>(null);
  const [tasks,       setTasks]           = useState<Task[]>([]);
  const [history,     setHistory]         = useState<{ date: string; pct: number }[]>([]);
  const [template,    setTemplate]        = useState<TemplateId>('summer');   // default: summer
  const [loading,     setLoading]         = useState(true);
  const [syncStatus,  setSyncStatus]      = useState<'idle' | 'saving' | 'saved'>('idle');
  const [customSubjs, setCustomSubjs]     = useState<SubjectDef[]>([]);

  // Refs always hold latest values so debounced doSync reads fresh data
  const syncRef = useRef<{ log: DailyLog | null; tasks: Task[]; template: TemplateId }>({
    log: null, tasks: [], template: 'summer',
  });
  syncRef.current = { log, tasks, template };
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Calendar picker ──
  const [showCalendar, setShowCalendar] = useState(false);
  const [calView, setCalView] = useState<{ year: number; month: number }>(() => {
    const d = new Date();
    return { year: d.getFullYear(), month: d.getMonth() };
  });
  const calendarRef = useRef<HTMLDivElement>(null);

  // Close calendar on outside click
  useEffect(() => {
    if (!showCalendar) return;
    function onDown(e: MouseEvent) {
      if (calendarRef.current && !calendarRef.current.contains(e.target as Node)) {
        setShowCalendar(false);
      }
    }
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [showCalendar]);

  function openCalendar() {
    // Sync the calendar view to the currently selected date
    const [y, m] = currentDate.split('-').map(Number);
    setCalView({ year: y, month: m - 1 });
    setShowCalendar(true);
  }

  function calPrevMonth() {
    setCalView(v => v.month === 0
      ? { year: v.year - 1, month: 11 }
      : { year: v.year, month: v.month - 1 });
  }
  function calNextMonth() {
    setCalView(v => v.month === 11
      ? { year: v.year + 1, month: 0 }
      : { year: v.year, month: v.month + 1 });
  }

  // ── Copy to Tomorrow ──
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copying' | 'done' | 'error'>('idle');

  async function copyToTomorrow() {
    if (!supabase || !log || tasks.length === 0) return;
    setCopyStatus('copying');
    try {
      const tomorrowDate = offsetDate(currentDate, 1);

      // 1. Get or create tomorrow's log
      let tomorrowQuery = supabase.from('luna_daily_logs').select('*').eq('log_date', tomorrowDate);
      if (user?.id) {
        tomorrowQuery = tomorrowQuery.eq('user_id', user.id);
      } else {
        tomorrowQuery = tomorrowQuery.is('user_id', null);
      }
      const { data: tomorrowRows } = await tomorrowQuery.limit(1);
      let tomorrowLog = tomorrowRows?.[0] ?? null;

      if (!tomorrowLog) {
        const insertData: Record<string, unknown> = {
          log_date: tomorrowDate,
          template: log.template,
          weather: 'sunny',
          is_public: log.is_public,
          ...(user?.id ? { user_id: user.id } : {}),
        };
        const { data: created } = await supabase
          .from('luna_daily_logs').insert(insertData).select().single();
        tomorrowLog = created;
      }
      if (!tomorrowLog) throw new Error('no log');

      // 2. Clear tomorrow's existing tasks
      await supabase.from('luna_log_tasks').delete().eq('log_id', tomorrowLog.id);

      // 3. Copy today's tasks — reset all progress
      const newTasks = tasks.map(tk => ({
        log_id: tomorrowLog!.id,
        subject:    tk.subject,
        task_text:  tk.task_text,
        est_mins:   tk.est_mins,
        sort_order: tk.sort_order,
        status:     'none' as const,
        wrong_count: 0,
        actual_mins: 0,
        completed:  false,
      }));
      await supabase.from('luna_log_tasks').insert(newTasks);

      setCopyStatus('done');
      setTimeout(() => setCopyStatus('idle'), 2500);
    } catch (err) {
      console.error('copyToTomorrow failed:', err);
      setCopyStatus('error');
      setTimeout(() => setCopyStatus('idle'), 2500);
    }
  }

  // CTF unlock
  const [ctfInput,   setCtfInput]   = useState('');
  const [ctfStatus,  setCtfStatus]  = useState<CtfStatus>('idle');
  const [usedFlags,  setUsedFlags]  = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem('luna-used-flags') ?? '[]'); } catch { return []; }
  });

  // Encouragement chips shown in the dad's comment section
  const [encouragements, setEncouragements] = useState<string[]>(() => pickRandom(ENCOURAGEMENTS, 6));

  // ── Collapse / expand form ──
  // Default is collapsed (bunny hero view). User can toggle; setting persists in localStorage.
  const [formCollapsed,     setFormCollapsed]     = useState<boolean>(() => {
    return localStorage.getItem('log-form-default') !== 'expanded';
  });
  const [showFormSettings,  setShowFormSettings]  = useState(false);

  function toggleCollapse() {
    setFormCollapsed(v => !v);
    setShowFormSettings(false);
  }
  function saveDefaultMode(mode: 'collapsed' | 'expanded') {
    localStorage.setItem('log-form-default', mode);
    setShowFormSettings(false);
  }

  // Initialise language: log page defaults to English unless user has saved a log-specific pref
  useEffect(() => {
    const saved = localStorage.getItem('log-lang');
    i18n.changeLanguage(saved ?? 'en');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function toggleLang() {
    const next = lang === 'en' ? 'zh' : 'en';
    i18n.changeLanguage(next);
    localStorage.setItem('log-lang', next);
  }

  // Load day whenever currentDate OR signed-in user changes
  useEffect(() => {
    if (authLoading) return;          // wait until we know if user is signed in
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    setSyncStatus('idle');
    if (!supabase) { setLoading(false); return; }
    loadDay(currentDate, user?.id ?? null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDate, user?.id, authLoading]);

  async function loadDay(date: string, userId: string | null) {
    if (!supabase) return;
    // Clear immediately so the UI never shows a previous user's tasks
    // while the new query is in-flight.
    setTasks([]);
    setLog(null);
    setLoading(true);

    // Always scope to the correct "lane":
    //   Signed-in  → rows where user_id = their UUID
    //   Anonymous  → rows where user_id IS NULL (shared/demo data)
    // Using .limit(1) instead of .maybeSingle() avoids silent errors when
    // duplicate rows exist (maybeSingle returns null on multiple matches).
    let query = supabase.from('luna_daily_logs').select('*').eq('log_date', date);
    if (userId) {
      query = query.eq('user_id', userId);
    } else {
      query = query.is('user_id', null);
    }

    const { data: logRows } = await query.limit(1);
    let logRow = logRows?.[0] ?? null;

    // Client-side sanity check: if DB (or RLS) somehow returned the wrong user's
    // row, discard it so we create a clean empty log for this user instead.
    if (logRow) {
      const rowOwner = logRow.user_id ?? null;
      if (rowOwner !== (userId ?? null)) {
        console.warn('[loadDay] user_id mismatch – discarding row', { rowOwner, userId });
        logRow = null;
      }
    }

    // Auto-create log if missing for any date (today or history).
    // Anonymous → user_id null (shared demo data).
    // Signed-in → user_id set (private log).
    if (!logRow) {
      const insertData: Record<string, unknown> = {
        log_date: date, template, weather: 'sunny', is_public: true,
        ...(userId ? { user_id: userId } : {}),
      };
      const { data: created } = await supabase
        .from('luna_daily_logs')
        .insert(insertData)
        .select()
        .single();
      logRow = created;
    }

    if (logRow) {
      setLog(logRow as DailyLog);
      const tid = (logRow.template ?? 'summer') as TemplateId;
      setTemplate(tid);

      const { data: taskRows } = await supabase
        .from('luna_log_tasks')
        .select('*')
        .eq('log_id', logRow.id)
        .order('sort_order');
      const taskList = (taskRows ?? []) as Task[];
      setTasks(taskList);

      if (tid === 'custom') {
        const keys = [...new Set(taskList.map(x => x.subject))];
        setCustomSubjs(keys.map(k => ({ key: k, label: k, color: '#e2e8f0' })));
      }
    } else {
      setLog(null);
      setTasks([]);
    }

    // History: last 14 days — scoped to the same lane as above
    const pastDates = Array.from({ length: 14 }, (_, i) => offsetDate(today, -i));
    let histQuery = supabase.from('luna_daily_logs').select('id, log_date').in('log_date', pastDates);
    if (userId) {
      histQuery = histQuery.eq('user_id', userId);
    } else {
      histQuery = histQuery.is('user_id', null);
    }
    const { data: histLogs } = await histQuery;

    if (histLogs && histLogs.length > 0) {
      const ids = histLogs.map(l => l.id);
      const { data: histTasks } = await supabase
        .from('luna_log_tasks')
        .select('log_id, status')
        .in('log_id', ids);

      const days = pastDates.map(d => {
        const l = histLogs.find(x => x.log_date === d);
        if (!l) return { date: d, pct: 0 };
        const lt = (histTasks ?? []).filter(tk => tk.log_id === l.id);
        const pct = lt.length === 0 ? 0 : Math.round(lt.filter(tk => tk.status === 'done').length / lt.length * 100);
        return { date: d, pct };
      });
      setHistory(days);
    } else {
      setHistory(pastDates.map(d => ({ date: d, pct: 0 })));
    }

    setLoading(false);
  }

  // CTF flag validation & unlock
  function submitCtfFlag() {
    const flag = ctfInput.trim();
    if (!/^picoCTF\{[^}]+\}$/.test(flag)) {
      setCtfStatus('format_err');
      return;
    }
    if (usedFlags.includes(flag)) {
      setCtfStatus('used_err');
      return;
    }
    const newUsed = [...usedFlags, flag];
    setUsedFlags(newUsed);
    localStorage.setItem('luna-used-flags', JSON.stringify(newUsed));
    setCtfStatus('unlocked');
  }

  // Translate subject label: for school template, try i18n key; otherwise keep original label
  const translateSubjectLabel = useCallback((tid: TemplateId, key: string, fallback: string): string => {
    const tKey = `log.subjects.${tid}.${key}`;
    const result = t(tKey);
    return result === tKey ? fallback : result;
  }, [t]);

  // Active subjects with translated labels
  const subjects = useMemo<SubjectDef[]>(() => {
    const base = template === 'custom' ? customSubjs : TEMPLATES[template].subjects;
    return base.map(s => ({
      ...s,
      label: translateSubjectLabel(template, s.key, s.label),
    }));
  }, [template, customSubjs, translateSubjectLabel]);

  // ── Task CRUD ──

  async function addTask(subject: string) {
    if (!supabase || !log) return;
    const order = tasks.filter(tk => tk.subject === subject).length;
    const { data } = await supabase
      .from('luna_log_tasks')
      .insert({ log_id: log.id, subject, task_text: '', status: 'none', sort_order: order, est_mins: null, actual_mins: null, wrong_count: 0 })
      .select().single();
    if (data) setTasks(prev => [...prev, data as Task]);
  }

  async function addCustomSubject(name: string) {
    if (!supabase || !log) return;
    const def: SubjectDef = { key: name, label: name, color: '#e2e8f0' };
    setCustomSubjs(prev => [...prev, def]);
    await addTask(name);
  }

  const updateTask = useCallback((id: string, fields: Partial<Task>) => {
    setTasks(prev => prev.map(tk => tk.id === id ? { ...tk, ...fields } : tk));
    scheduleSync();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function deleteTask(id: string) {
    if (!supabase) return;
    setTasks(prev => prev.filter(tk => tk.id !== id));
    await supabase.from('luna_log_tasks').delete().eq('id', id);
  }

  function toggleStatus(id: string) {
    const tk = tasks.find(x => x.id === id);
    if (!tk) return;
    const next: TaskStatus = tk.status === 'none' ? 'done' : tk.status === 'done' ? 'skip' : 'none';
    updateTask(id, { status: next });
  }

  function updateLog(fields: Partial<DailyLog>) {
    setLog(prev => prev ? { ...prev, ...fields } : prev);
    scheduleSync();
  }

  // ── Auto-sync (debounced 600 ms) ──

  function scheduleSync() {
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(doSync, 600);
  }

  async function doSync() {
    const { log, tasks, template } = syncRef.current;
    if (!supabase || !log) return;
    setSyncStatus('saving');

    await supabase.from('luna_daily_logs').update({
      template,
      weather:          log.weather,
      wake_time:        log.wake_time,
      sleep_time:       log.sleep_time,
      self_efficiency:  log.self_efficiency,
      self_accuracy:    log.self_accuracy,
      self_handwriting: log.self_handwriting,
      luna_notes:       log.luna_notes,
      dad_comment:      log.dad_comment,
      is_public:        log.is_public ?? true,
      updated_at:       new Date().toISOString(),
    }).eq('id', log.id);

    if (tasks.length > 0) {
      await supabase.from('luna_log_tasks').upsert(
        tasks.map(tk => ({
          id: tk.id, log_id: tk.log_id, subject: tk.subject,
          task_text: tk.task_text, est_mins: tk.est_mins,
          actual_mins: tk.actual_mins, status: tk.status,
          completed: tk.status === 'done',
          wrong_count: tk.wrong_count, sort_order: tk.sort_order,
        }))
      );
    }

    setSyncStatus('saved');
    setTimeout(() => setSyncStatus('idle'), 2000);
  }

  // ── Derived ──

  const totalTasks  = tasks.length;
  const doneTasks   = tasks.filter(tk => tk.status === 'done').length;
  const totalWrong  = tasks.reduce((s, tk) => s + (tk.wrong_count || 0), 0);
  const totalEst    = tasks.reduce((s, tk) => s + (tk.est_mins || 0), 0);
  const totalActual = tasks.reduce((s, tk) => s + (tk.actual_mins || 0), 0);
  const isToday     = currentDate === today;

  if (!supabase) return <div className="text-center py-16 text-pink-400">{t('log.no_config')}</div>;
  if (loading)   return <div className="text-center py-16 text-4xl animate-pulse">🐰</div>;

  return (
    <div className="space-y-3 pb-10">

      {/* ── Top bar: two rows, no scroll ── */}
      <div className="space-y-1.5">
        {/* Row 1: Template tabs */}
        <div className="flex gap-2 flex-wrap">
          {(Object.keys(TEMPLATES) as TemplateId[]).map(tid => (
            <button key={tid}
              onClick={() => {
                setTemplate(tid);
                if (log) updateLog({ template: tid });
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                template === tid
                  ? 'bg-pink-500 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-500 hover:border-pink-300'}`}>
              {t(`log.templates.${tid}.name`)}
            </button>
          ))}
        </div>
        {/* Row 2: Utility buttons */}
        <div className="flex items-center gap-2 justify-between">
          <Link
            to="/analysis"
            className="px-3 py-1.5 rounded-full text-xs font-bold bg-indigo-100 text-indigo-600 hover:bg-indigo-200 transition-all whitespace-nowrap flex items-center gap-1"
          >
            <span>📊</span>
            <span>Analysis</span>
          </Link>
          <div className="flex items-center gap-2">
            <button onClick={toggleLang}
              className="px-2.5 py-1.5 rounded-full text-xs font-bold border border-slate-200 bg-white text-slate-500 hover:border-pink-300 transition-all whitespace-nowrap">
              {t('log.lang_switch')}
            </button>
            <AuthButton
              lang={lang}
              isPublic={log?.is_public ?? true}
              onPrivacyChange={user ? (v) => updateLog({ is_public: v }) : undefined}
            />
          </div>
        </div>
      </div>

      {/* ── Sign-in nudge (only when anonymous) ── */}
      {!authLoading && !user && (
        <div className="bg-white/70 border border-pink-100 rounded-xl px-3 py-2">
          <span className="text-[11px] text-slate-500">
            {lang === 'zh'
              ? '✏️ 这是共享打卡本，点右上角登录可创建你自己的私人记录'
              : '✏️ Shared log — sign in (top right) to keep your own private one'}
          </span>
        </div>
      )}

      {/* ── Date Navigation ── */}
      <div className="flex items-center justify-between">
        <button onClick={() => setCurrentDate(d => offsetDate(d, -1))}
          className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-500 hover:border-pink-300 transition-all">
          {t('log.yesterday')}
        </button>

        {/* Date display — click to open calendar */}
        <div className="relative" ref={calendarRef}>
          <button
            onClick={openCalendar}
            className="text-center group"
          >
            <div className="text-xs font-bold text-slate-600 group-hover:text-pink-500 transition-colors flex items-center gap-1">
              {formatDateFull(currentDate, lang)}
              <span className="text-[10px] text-slate-400 group-hover:text-pink-400">📅</span>
            </div>
            {isToday && <div className="text-[10px] text-pink-400">{t('log.today_label')}</div>}
          </button>

          {/* Calendar popup */}
          {showCalendar && (() => {
            const firstDay  = new Date(calView.year, calView.month, 1);
            const daysInMon = new Date(calView.year, calView.month + 1, 0).getDate();
            const startDow  = firstDay.getDay(); // 0=Sun
            const monthLabel = new Date(calView.year, calView.month, 1)
              .toLocaleString('en-US', { month: 'long', year: 'numeric' });
            // Build a set of dates that have history entries
            const historyDates = new Set(history.map(h => h.date));

            return (
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 z-50 bg-white rounded-2xl border-2 border-pink-100 shadow-2xl p-3 w-64">
                {/* Month header */}
                <div className="flex items-center justify-between mb-2">
                  <button onClick={calPrevMonth}
                    className="px-2 py-0.5 rounded-lg hover:bg-pink-50 text-slate-500 hover:text-pink-500 text-sm transition-colors">
                    ‹
                  </button>
                  <span className="text-xs font-bold text-slate-700">{monthLabel}</span>
                  <button onClick={calNextMonth}
                    className="px-2 py-0.5 rounded-lg hover:bg-pink-50 text-slate-500 hover:text-pink-500 text-sm transition-colors">
                    ›
                  </button>
                </div>

                {/* Day-of-week headers */}
                <div className="grid grid-cols-7 mb-1">
                  {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => (
                    <div key={d} className="text-center text-[9px] font-bold text-slate-400 py-0.5">{d}</div>
                  ))}
                </div>

                {/* Day cells */}
                <div className="grid grid-cols-7 gap-y-0.5">
                  {/* Empty padding cells */}
                  {Array.from({ length: startDow }).map((_, i) => <div key={`e${i}`} />)}
                  {/* Day buttons */}
                  {Array.from({ length: daysInMon }, (_, i) => i + 1).map(day => {
                    const dateStr    = `${calView.year}-${String(calView.month + 1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
                    const isFuture   = dateStr > today;
                    const isSelected = dateStr === currentDate;
                    const isTodayDay = dateStr === today;
                    const hasLog     = historyDates.has(dateStr);
                    return (
                      <button
                        key={day}
                        onClick={() => { setCurrentDate(dateStr); setShowCalendar(false); }}
                        className={`relative text-[11px] font-medium h-7 w-7 mx-auto rounded-lg transition-all cursor-pointer
                          ${isSelected  ? 'bg-pink-400 text-white hover:bg-pink-500 font-bold' : ''}
                          ${isTodayDay && !isSelected ? 'ring-2 ring-pink-300 text-pink-600 hover:bg-pink-50' : ''}
                          ${isFuture  && !isSelected ? 'text-blue-400 hover:bg-blue-50' : ''}
                          ${!isSelected && !isFuture && !isTodayDay ? 'text-slate-700 hover:bg-pink-50' : ''}
                        `}
                      >
                        {day}
                        {hasLog && !isSelected && (
                          <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-green-400" />
                        )}
                        {isFuture && !isSelected && (
                          <span className="absolute top-0.5 right-0.5 w-1 h-1 rounded-full bg-blue-300" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Footer shortcut */}
                <div className="mt-2 pt-2 border-t border-slate-100 flex justify-center">
                  <button
                    onClick={() => { setCurrentDate(today); setShowCalendar(false); }}
                    className="text-[10px] font-bold text-pink-400 hover:text-pink-600 transition-colors"
                  >
                    Jump to Today
                  </button>
                </div>
              </div>
            );
          })()}
        </div>

        <button onClick={() => setCurrentDate(d => offsetDate(d, 1))}
          className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-500 hover:border-pink-300 transition-all">
          {t('log.tomorrow')}
        </button>
      </div>


      {/* ── Paper Form Card ── */}
      {log && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-amber-100 shadow-[0_4px_20px_rgba(0,0,0,0.07)] overflow-hidden"
          style={{ fontFamily: "'PingFang SC', 'Microsoft YaHei', system-ui, sans-serif" }}>

          {/* ── Header strip ── */}
          <div className="bg-gradient-to-r from-pink-400 via-pink-350 to-pink-300 px-4 py-2.5 flex items-center justify-between">
            <div>
              <p className="text-white font-black text-sm tracking-wide">
                🐰 {user ? (user.user_metadata?.given_name ?? user.user_metadata?.full_name?.split(' ')[0] ?? 'My') : 'Luna'} {t(`log.templates.${template}.cardTitle`)}
              </p>
              <p className="text-pink-100 text-[10px] mt-0.5">
                {formatDateFull(currentDate, lang)}
                {user && (
                  <span className="ml-2 opacity-80">
                    {log?.is_public ? '🌐' : '🔒'}
                  </span>
                )}
              </p>
            </div>
            <div className="flex gap-2 items-center">
              {/* Weather */}
              {(['sunny', 'cloudy', 'rainy'] as const).map(w => (
                <button key={w} onClick={() => updateLog({ weather: w })}
                  className={`text-lg transition-all ${log.weather === w ? 'scale-125' : 'opacity-40 hover:opacity-70'}`}>
                  {w === 'sunny' ? '☀️' : w === 'cloudy' ? '☁️' : '🌧️'}
                </button>
              ))}
              {/* Settings popover anchor */}
              <div className="relative">
                <button onClick={() => setShowFormSettings(v => !v)}
                  className="text-white/70 hover:text-white text-base transition-all leading-none px-0.5"
                  title={lang === 'zh' ? '设置' : 'Settings'}>
                  ⚙️
                </button>
                <AnimatePresence>
                  {showFormSettings && (
                    <motion.div
                      initial={{ opacity: 0, y: -4, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -4, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-7 z-50 bg-white rounded-xl shadow-lg border border-slate-100 p-2 w-44 text-xs">
                      <p className="text-slate-400 font-bold px-1 pb-1 border-b border-slate-100 mb-1">
                        {lang === 'zh' ? '默认展示方式' : 'Default view'}
                      </p>
                      {(['collapsed', 'expanded'] as const).map(mode => (
                        <button key={mode} onClick={() => saveDefaultMode(mode)}
                          className={`w-full text-left px-2 py-1.5 rounded-lg transition-all flex items-center gap-2 ${
                            localStorage.getItem('log-form-default') === mode ||
                            (mode === 'collapsed' && !localStorage.getItem('log-form-default'))
                              ? 'bg-pink-50 text-pink-600 font-bold'
                              : 'text-slate-600 hover:bg-slate-50'}`}>
                          <span>{mode === 'collapsed' ? '🐰' : '📋'}</span>
                          {mode === 'collapsed'
                            ? (lang === 'zh' ? '默认折叠（兔兔优先）' : 'Default: bunny view')
                            : (lang === 'zh' ? '默认展开（表格优先）' : 'Default: form view')}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              {/* Collapse / expand toggle */}
              <button onClick={toggleCollapse}
                className="text-white/80 hover:text-white text-base transition-all leading-none px-0.5"
                title={formCollapsed ? (lang === 'zh' ? '展开表格' : 'Show form') : (lang === 'zh' ? '收起表格' : 'Collapse form')}>
                {formCollapsed ? '📋' : '🔼'}
              </button>
            </div>
          </div>

          {/* ── Collapsed hero view (bunny takes center stage) ── */}
          <AnimatePresence initial={false}>
            {formCollapsed && (
              <motion.div
                key="hero"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                style={{ overflow: 'hidden' }}>
                <PetWidget tasks={tasks} ctfUnlocked={ctfStatus === 'unlocked'} lang={lang} size="hero" />
                {/* Quick stats + expand CTA */}
                <div className="px-4 py-3 flex flex-col items-center gap-2 bg-white">
                  {totalTasks > 0 && (
                    <div className="text-xs text-slate-400">
                      <span className="font-bold text-pink-500">{doneTasks}</span>
                      <span> / {totalTasks} </span>
                      <span>{lang === 'zh' ? '任务完成' : 'tasks done'}</span>
                    </div>
                  )}
                  <button onClick={toggleCollapse}
                    className="w-full max-w-xs py-2.5 rounded-xl bg-pink-500 hover:bg-pink-600 text-white text-sm font-bold transition-all shadow-sm active:scale-95">
                    📋 {lang === 'zh' ? '展开填写' : 'Fill in tasks'}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Expanded form body ── */}
          <AnimatePresence initial={false}>
            {!formCollapsed && (
              <motion.div
                key="form"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                style={{ overflow: 'hidden' }}>

          {/* ── Pet Widget strip ── */}
          {isToday && (
            <div className="px-3 py-2 border-b border-pink-100">
              <PetWidget tasks={tasks} ctfUnlocked={ctfStatus === 'unlocked'} lang={lang} size="compact" />
            </div>
          )}

          {/* ── Signature row ── */}
          <div className="px-3 py-1.5 bg-amber-50/40 border-b border-amber-100 flex items-center justify-between text-[11px] text-slate-400">
            <span>{t('log.sign_label')}</span>
            <input type="text" placeholder="Luna ✍️"
              className="border-b border-dashed border-pink-300 bg-transparent focus:outline-none w-28 text-center text-slate-500 text-[11px] placeholder-pink-200" />
            {totalTasks > 0 && (
              <span className="font-bold text-pink-500">
                {t('log.completed', { done: doneTasks, total: totalTasks })}
              </span>
            )}
          </div>

          {/* ── Column headers ── */}
          <div className="flex border-b-2 border-amber-200 bg-amber-50/60">
            <div className="w-9 shrink-0 border-r border-amber-200 flex items-center justify-center py-1">
              <span className="text-[9px] font-bold text-slate-400 text-center leading-tight">
                {t('log.col_subject')}
              </span>
            </div>
            <div className="flex-1 grid items-center py-1 px-1 text-[9px] font-bold text-slate-400 text-center"
              style={{ gridTemplateColumns: ROW_COLS }}>
              <span className="text-left pl-1">{t('log.col_plan')}</span>
              <span>{t('log.col_done')}</span>
              <span style={{ whiteSpace: 'pre-line' }}>{t('log.col_est')}</span>
              <span style={{ whiteSpace: 'pre-line' }}>{t('log.col_actual')}</span>
              <span>{t('log.col_wrong')}</span>
              <span></span>
            </div>
          </div>

          {/* ── Subject Sections ── */}
          {subjects.length === 0 && template === 'custom' && (
            <div className="px-4 py-4 text-center text-xs text-slate-400">
              {t('log.no_subjects')}
            </div>
          )}
          {subjects.map(subj => (
            <SubjectSection
              key={subj.key}
              subj={subj}
              tasks={tasks.filter(tk => tk.subject === subj.key).sort((a, b) => a.sort_order - b.sort_order)}
              onAdd={() => addTask(subj.key)}
              onUpdate={updateTask}
              onDelete={deleteTask}
              onToggle={toggleStatus}
            />
          ))}

          {/* Add subject (custom only) */}
          {template === 'custom' && (
            <AddSubjectRow onAdd={addCustomSubject} />
          )}

          {/* ── Bottom stats ── */}
          <div className="border-t-2 border-amber-200 px-3 py-2 bg-amber-50/30">
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[11px] text-slate-500">
              <label className="flex items-center gap-1.5">
                <span>{t('log.wake')}</span>
                <input type="time" value={log.wake_time ?? ''}
                  onChange={e => updateLog({ wake_time: e.target.value || null })}
                  className="border-b border-dashed border-slate-300 bg-transparent focus:outline-none text-xs flex-1 min-w-0" />
              </label>
              <label className="flex items-center gap-1.5">
                <span>{t('log.sleep')}</span>
                <input type="time" value={log.sleep_time ?? ''}
                  onChange={e => updateLog({ sleep_time: e.target.value || null })}
                  className="border-b border-dashed border-slate-300 bg-transparent focus:outline-none text-xs flex-1 min-w-0" />
              </label>
              {totalEst > 0 && <div>{t('log.est_study', { min: totalEst })}</div>}
              {totalActual > 0 && <div>{t('log.actual_time', { min: totalActual })}</div>}
            </div>
            <div className="mt-1 text-[11px] text-slate-500">
              {t('log.wrong_prefix')} <strong className="text-red-500 text-sm">{totalWrong}</strong>
              {t('log.wrong_unit') ? ` ${t('log.wrong_unit')}` : ''}
            </div>
          </div>

          {/* ── Memo ── */}
          <div className="border-t border-amber-100 px-3 py-2">
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">
              {t('log.memo_title')}
            </p>
            <textarea value={log.luna_notes ?? ''}
              onChange={e => updateLog({ luna_notes: e.target.value || null })}
              placeholder={t('log.memo_ph')}
              rows={2}
              className="w-full text-xs border border-dashed border-amber-200 rounded-lg px-2 py-1.5 focus:outline-none focus:border-pink-300 bg-amber-50/20 resize-none placeholder-slate-300" />
          </div>

          {/* ── Self Rating ── */}
          <div className="border-t border-amber-100 px-3 py-2 bg-amber-50/20">
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
              {t('log.self_title')}
            </p>
            <div className="space-y-1.5">
              {[
                { labelKey: 'log.rate_efficiency', field: 'self_efficiency' as const },
                { labelKey: 'log.rate_accuracy',   field: 'self_accuracy' as const },
                { labelKey: 'log.rate_handwriting', field: 'self_handwriting' as const },
              ].map(item => (
                <div key={item.field} className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 w-16 shrink-0">{t(item.labelKey)}</span>
                  <Stars value={log[item.field]} onChange={v => updateLog({ [item.field]: v })} />
                </div>
              ))}
            </div>
          </div>

          {/* ── Dad's Comment (CTF-gated) ── */}
          <div className="border-t border-amber-100 px-3 py-2">
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
              {t('log.dad_title')}
            </p>

            {ctfStatus === 'unlocked' ? (
              /* ── Unlocked: encouragement chips + textarea ── */
              <div className="space-y-2">
                <p className="text-[10px] text-green-600 font-semibold">{t('log.ctf_unlocked')}</p>

                {/* Encouragement chips */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wide">
                      {t('log.encourage_title')}
                    </span>
                    <button
                      onClick={() => setEncouragements(pickRandom(ENCOURAGEMENTS, 6))}
                      className="text-[9px] text-pink-400 hover:text-pink-600 font-medium">
                      {t('log.encourage_more')}
                    </button>
                  </div>
                  <div className="flex flex-col gap-1">
                    {encouragements.map((phrase, i) => (
                      <button key={i} onClick={() => updateLog({ dad_comment: phrase })}
                        className="text-left text-[10px] px-2 py-1 bg-indigo-50 border border-indigo-100 rounded-lg text-indigo-700 hover:bg-indigo-100 transition-colors leading-snug">
                        {phrase}
                      </button>
                    ))}
                  </div>
                </div>

                <textarea value={log.dad_comment ?? ''}
                  onChange={e => updateLog({ dad_comment: e.target.value || null })}
                  placeholder={t('log.dad_ph')}
                  rows={2}
                  className="w-full text-xs border border-dashed border-indigo-200 rounded-lg px-2 py-1.5 focus:outline-none bg-indigo-50/30 resize-none placeholder-slate-300" />
              </div>

            ) : log.dad_comment ? (
              /* ── Has a saved comment but session not unlocked: show read-only ── */
              <div className="text-xs text-slate-600 italic bg-indigo-50 border border-indigo-100 rounded-lg px-3 py-2">
                "{log.dad_comment}"
              </div>

            ) : (
              /* ── Locked: CTF challenge ── */
              <div className="space-y-2">
                <p className="text-[10px] text-slate-500">{t('log.ctf_section')}</p>

                {/* Link to CTF library */}
                <a
                  href="https://learn.cylabacademy.org/library?page=1&difficulty=2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[11px] font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 border border-indigo-200 rounded-lg px-3 py-1.5 transition-colors">
                  🚩 {t('log.ctf_link')}
                </a>

                {/* Flag input */}
                <form onSubmit={e => { e.preventDefault(); submitCtfFlag(); }} className="flex gap-2">
                  <input
                    type="text"
                    value={ctfInput}
                    onChange={e => { setCtfInput(e.target.value); setCtfStatus('idle'); }}
                    placeholder={t('log.ctf_ph')}
                    className={`flex-1 text-xs border rounded-lg px-2 py-1.5 font-mono focus:outline-none focus:border-indigo-400 ${
                      ctfStatus === 'format_err' || ctfStatus === 'used_err'
                        ? 'border-red-400 bg-red-50'
                        : 'border-slate-200'}`}
                  />
                  <button type="submit"
                    className="px-3 py-1.5 bg-indigo-600 text-white text-xs font-bold rounded-lg hover:bg-indigo-700 transition-colors whitespace-nowrap">
                    {t('log.ctf_submit')}
                  </button>
                </form>

                {ctfStatus === 'format_err' && (
                  <p className="text-[10px] text-red-400">{t('log.ctf_err_format')}</p>
                )}
                {ctfStatus === 'used_err' && (
                  <p className="text-[10px] text-red-400">{t('log.ctf_err_used')}</p>
                )}
              </div>
            )}
          </div>

          {/* ── Footer ── */}
          <div className="border-t border-amber-100 bg-amber-50/30 px-3 py-1.5 flex justify-between items-center gap-2">
            {/* Copy to Tomorrow */}
            {tasks.length > 0 ? (
              <button
                onClick={copyToTomorrow}
                disabled={copyStatus === 'copying'}
                className={`text-[10px] font-bold px-2.5 py-1 rounded-lg transition-all border
                  ${copyStatus === 'done'
                    ? 'bg-green-50 border-green-200 text-green-600'
                    : copyStatus === 'error'
                    ? 'bg-red-50 border-red-200 text-red-500'
                    : 'bg-blue-50 border-blue-200 text-blue-500 hover:bg-blue-100 active:scale-95'
                  } disabled:opacity-60`}
              >
                {copyStatus === 'copying' ? '⏳ Copying…'
                 : copyStatus === 'done'  ? '✅ Copied to tomorrow!'
                 : copyStatus === 'error' ? '❌ Failed, retry?'
                 : '📋 Copy to Tomorrow'}
              </button>
            ) : (
              <span className="text-[10px] text-slate-400 italic">{t('log.footer')}</span>
            )}
            <span className={`text-[9px] font-medium transition-opacity duration-300 shrink-0 ${
              syncStatus === 'idle' ? 'opacity-0' :
              syncStatus === 'saving' ? 'text-amber-400 opacity-100' :
              'text-green-500 opacity-100'}`}>
              {syncStatus === 'saving' ? t('log.auto_saving') : t('log.auto_saved')}
            </span>
          </div>

              </motion.div>
            )}
          </AnimatePresence>

        </motion.div>
      )}

      {/* ── History Bar ── */}
      <div className="bg-white rounded-2xl border border-slate-100 p-3">
        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2">
          {t('log.history_title')}
        </p>
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {history.map(d => (
            <DayTile key={d.date} date={d.date} pct={d.pct} lang={lang}
              active={d.date === currentDate} isToday={d.date === today}
              onClick={() => setCurrentDate(d.date)} />
          ))}
        </div>
      </div>

    </div>
  );
}
