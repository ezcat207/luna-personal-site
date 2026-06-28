# Todo Star MVP - Implementation Plan

## 🎯 Project Overview

**Feature**: Log Todo Star (待办星) - Phase 1 MVP
**Scope**: Incremental addition to existing log subdomain (not replacement)
**Target**: 3 core modules (Today Planning + Pomodoro Focus + Daily Review)
**Timeline**: 2 weeks (Phase 1 only)

---

## 📊 Architecture Decision: Incremental Addition

### Current State (Preserved)
- `log.bunnyuniverse.com/` → Luna's Learning Tracker (existing)
- `log.bunnyuniverse.com/analysis` → Learning analytics (existing)

### New Routes (Added)
- `log.bunnyuniverse.com/todo/today` → Today's Plan (Top 3 + task list)
- `log.bunnyuniverse.com/todo/focus` → Pomodoro Timer
- `log.bunnyuniverse.com/todo/review` → Daily Review

### Benefits
✅ Zero impact on existing Luna learning log functionality
✅ Reuse existing auth, Supabase connection, layout structure
✅ Both products coexist under one subdomain
✅ Future: Can add a hub page to choose between Learning Log vs Todo Star

---

## 🗂️ File Structure (New Files Only)

```
src/
├── layouts/
│   └── TodoLayout.tsx              ← New: Sidebar nav + white theme
│
├── pages/
│   └── todo/
│       ├── TodoToday.tsx           ← Today's Plan page
│       ├── TodoFocus.tsx           ← Pomodoro Focus page
│       └── TodoReview.tsx          ← Daily Review page
│
├── components/
│   └── todo/
│       ├── TaskCard.tsx            ← Reusable task card (default/compact/top3)
│       ├── PomodoroTimer.tsx       ← 25min timer with controls
│       ├── QuickAddTask.tsx        ← Inline task input (Cmd+K)
│       └── TopThreeSection.tsx     ← Hero section for Top 3 tasks
│
├── hooks/
│   └── useTodoTasks.ts             ← Task CRUD + real-time subscriptions
│   └── usePomodoroTimer.ts         ← Timer state management
│   └── useDailyReview.ts           ← Review CRUD
│
└── types/
    └── todo.ts                     ← TypeScript interfaces

supabase/
└── migrations/
    └── 20260628_todo_star_mvp.sql  ✅ Created (3 tables + indexes + RLS)

vercel.json                         ✅ Created (preview deployment config)
```

---

## 🗃️ Database Schema (MVP - 3 Tables)

### 1. `todo_tasks`
- Core fields: `title`, `description`, `status`, `priority`, `is_top3`
- Time: `time_block_start`, `time_block_end`, `due_date`
- User-scoped with RLS

### 2. `todo_pomodoros`
- Fields: `task_id`, `duration_minutes`, `completed`, `started_at`
- Links to tasks (nullable FK)
- User-scoped with RLS

### 3. `todo_daily_reviews`
- Fields: `date`, `problem_reflection`, `optimization_action`, `tomorrow_first_task`
- Unique constraint: one review per user per day
- User-scoped with RLS

**Deferred to Phase 2+**:
- ❌ `todo_weekly_goals` (not needed for MVP)
- ❌ Task categories/tags (simplified for MVP)
- ❌ Recurring tasks (Phase 3)

---

## 🎨 Design System (Aligned with PRD)

### Color Palette
- Primary: Indigo 600 (`#4f46e5`)
- Accent: Purple 500 (`#a855f7`)
- Background: White + Slate-50 sidebar
- Success: Green 500 (completed tasks)

### Typography
- Font: Inter (same as existing Wayne layout)
- Timer: Roboto Mono (monospace for countdown)

### Layout
- Sidebar: 240px (fixed, bg-slate-50)
- Content: max-w-4xl (desktop-optimized, unlike existing log's max-w-lg)
- Responsive: Hide sidebar on mobile, show hamburger menu

### Components
- **TaskCard**: 3 variants (default, compact, top3)
- **PomodoroTimer**: Full-screen dark mode during focus
- **QuickAddTask**: Inline input with Cmd+K shortcut

---

## 🚀 Phase 1 MVP - Feature Breakdown

### Module 1: Today's Plan (`/todo/today`)

**Components**:
1. Top 3 Section (Hero)
   - Large gradient cards (`bg-gradient-to-r from-indigo-50 to-purple-50`)
   - Star icon + checkbox + task title
   - Time block display (static text, no drag-and-drop)
   - "Add to Top 3" button (max 3 tasks)

2. All Tasks Section
   - Task list with CRUD (Create, Read, Update, Delete)
   - Priority badges (High/Medium/Low with color dots)
   - Checkbox to mark complete
   - Quick Add input at bottom

**Interactions**:
- Click checkbox → Mark task as completed (fade out animation)
- Click "Add to Top 3" → Toggle `is_top3` flag (max 3 enforced)
- Cmd+K → Focus quick add input
- Click task title → Inline edit (contentEditable)

**Data Flow**:
- `useTodoTasks()` hook → Fetch tasks for today
- Real-time subscription for cross-tab sync
- Optimistic updates on checkbox toggle

### Module 2: Pomodoro Focus (`/todo/focus`)

**UI**:
- Full-screen layout (dark bg: `bg-gradient-to-br from-slate-900 to-slate-800`)
- Centered timer: `text-8xl font-mono` (countdown from 25:00)
- Task title at top (optional: link to a task)
- Buttons: Pause (yellow), Skip (gray), Stop (red)
- Tomato count: "🍅🍅🍅🍅 4 completed today"

**States**:
1. Idle: "Start your next pomodoro" (green button)
2. Running: Countdown + pause/skip/stop buttons
3. Paused: Resume button
4. Resting: "Take a 5-minute break" (light green bg)
5. Completed: Celebration animation + "Great job!" message

**Timer Logic**:
- `usePomodoroTimer()` hook with `useInterval`
- Browser notification when timer ends (if permission granted)
- Auto-insert record into `todo_pomodoros` on completion
- No auto-start of rest period (user clicks "Start Rest" manually for MVP)

**Celebration**:
- Confetti animation (use `canvas-confetti` library)
- Sound (optional, muted by default): Gentle chime (MP3)

### Module 3: Daily Review (`/todo/review`)

**UI**:
- Card-based layout (vertical stack)
- 5 sections:
  1. ✅ What I Completed (auto-populated from completed tasks)
  2. 💭 One Problem I Noticed (textarea, placeholder: "e.g., Got distracted by Slack")
  3. 💡 One Thing I'll Do Differently (textarea, placeholder: "e.g., Turn off notifications before 11am")
  4. 🌅 Tomorrow's First Task (input)
  5. Save button (large, indigo-600)

**Data Flow**:
- `useDailyReview(date)` hook → Fetch review for specific date
- Completed tasks fetched from `todo_tasks` where `status='completed'` and `completed_at::date = today`
- Auto-calculate `completed_tasks_count` before saving
- Upsert on save (insert if not exists, update if exists)

**Interactions**:
- Textareas auto-save on blur (debounced 1s)
- Save button → Show success toast + redirect to `/todo/today`

---

## 🔌 Vercel Preview Deployment

### Configuration (`vercel.json`)
```json
{
  "git": {
    "deploymentEnabled": {
      "main": true,
      "feature/*": true
    }
  },
  "github": {
    "autoAlias": true
  }
}
```

### How It Works
1. Push to `feature/log-todo-star` → Vercel auto-deploys preview
2. Preview URL: `luna-personal-site-git-feature-log-todo-star-{team}.vercel.app`
3. Test at: `<preview-url>?persona=log` (force log persona)
4. Production (`main` branch) remains untouched

### Testing Checklist
- [ ] Visit preview URL with `?persona=log`
- [ ] Test `/todo/today` → Add tasks, mark Top 3, complete tasks
- [ ] Test `/todo/focus` → Start timer, pause, skip, complete
- [ ] Test `/todo/review` → Fill form, save, verify in DB
- [ ] Test auth: Sign in, verify tasks are user-scoped
- [ ] Test responsive: Mobile view (hamburger menu)

---

## 📋 Implementation Checklist (Phase 1 MVP)

### Week 1: Core Infrastructure + Today's Plan

**Day 1-2: Setup**
- [ ] Run Supabase migration (`20260628_todo_star_mvp.sql`)
- [ ] Create TypeScript interfaces (`src/types/todo.ts`)
- [ ] Create `TodoLayout.tsx` (sidebar nav + white theme)
- [ ] Update `App.tsx` routes (add `/todo/*` routes)

**Day 3-5: Today's Plan Page**
- [ ] Create `useTodoTasks()` hook (CRUD + real-time)
- [ ] Create `TaskCard.tsx` component (3 variants)
- [ ] Create `TopThreeSection.tsx` (hero cards)
- [ ] Create `QuickAddTask.tsx` (Cmd+K input)
- [ ] Create `TodoToday.tsx` page (compose all components)
- [ ] Test: Add tasks, toggle Top 3, mark complete

### Week 2: Pomodoro + Daily Review

**Day 6-8: Pomodoro Focus**
- [ ] Create `usePomodoroTimer()` hook (countdown logic)
- [ ] Create `PomodoroTimer.tsx` component (full-screen UI)
- [ ] Create `TodoFocus.tsx` page
- [ ] Integrate `canvas-confetti` for celebration
- [ ] Test: Start timer, pause, complete, verify DB insert

**Day 9-10: Daily Review**
- [ ] Create `useDailyReview()` hook (fetch + upsert)
- [ ] Create `TodoReview.tsx` page (5-section form)
- [ ] Auto-populate completed tasks
- [ ] Test: Fill form, save, verify DB entry

**Day 11-12: Polish + Testing**
- [ ] Add loading skeletons for all pages
- [ ] Add error states (network errors, auth errors)
- [ ] Mobile responsive testing (hide sidebar, touch targets)
- [ ] Accessibility: Keyboard nav, focus indicators, ARIA labels
- [ ] Performance: Code splitting, lazy loading
- [ ] Write user documentation (README section)

**Day 13-14: Deployment**
- [ ] Push to `feature/log-todo-star`
- [ ] Test Vercel preview deployment
- [ ] QA checklist (all scenarios)
- [ ] Merge to `main` (if approved)
- [ ] Monitor production logs for 24h

---

## 🚫 Out of Scope (Deferred to Phase 2+)

### Phase 2 (Week 3-4)
- Time block drag-and-drop
- Eisenhower Matrix categories
- Task search and filters
- Weekly planning module

### Phase 3 (Week 5-6)
- Energy management (rest reminders)
- Message-to-task converter (NLP)
- Recurring tasks
- Task templates

### Future Considerations
- Mobile app (React Native)
- AI-powered task suggestions
- Team collaboration features
- Third-party integrations (Notion, Slack)

---

## 🔐 Security & Privacy

- ✅ RLS policies on all tables (user-scoped queries only)
- ✅ Auth required for all `/todo/*` routes (redirect to login if not authenticated)
- ✅ Input sanitization (prevent XSS in task titles/descriptions)
- ✅ CORS properly configured (Supabase + Vercel)
- ✅ No sensitive data in localStorage (only auth tokens via Supabase SDK)

---

## 📈 Success Metrics (Post-Launch)

### Quantitative
- Daily active users (DAU) on `/todo/*` routes
- Avg tasks created per user per day
- Avg pomodoros completed per user per day
- Daily review completion rate (% of users who fill review form)

### Qualitative
- User feedback via in-app feedback form (add in Phase 2)
- Bug reports (track in GitHub Issues)
- Feature requests (prioritize for Phase 2+)

---

## 📞 Next Steps (Awaiting Your Approval)

1. **Confirm MVP scope**: Are these 3 modules sufficient for Phase 1?
2. **Run DB migration**: Should I apply the SQL migration to Supabase now?
3. **Start coding**: Once approved, I'll begin with `TodoLayout.tsx` and routes
4. **Preview deployment**: Vercel will auto-deploy when I push to the feature branch

**Ready to proceed?** 🚀
