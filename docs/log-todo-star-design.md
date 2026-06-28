# Log Todo Star (待办星) - Design Specification

## Design Philosophy

**Design Aesthetic**: Minimal, calm, focus-oriented
**Color Psychology**: Cool tones for calm focus, warm accents for completion celebrations
**Interaction Principle**: Frictionless, no unnecessary clicks, keyboard-first where possible
**Visual Hierarchy**: Prioritize today's Top 3, de-emphasize noise

## Layout Structure

### Main Layout (`LogLayout.tsx`)

```
┌─────────────────────────────────────────┐
│  [Logo] Log | 待办星      [User] [⚙️]  │  ← Header (sticky, 60px height)
├─────────────────────────────────────────┤
│ ┌────────┐ ┌────────────────────────┐  │
│ │        │ │                        │  │
│ │  Sidebar│ │   Main Content Area   │  │  ← Body (flex layout)
│ │  (240px)│ │   (flex-1, max-w-4xl) │  │
│ │        │ │                        │  │
│ │  Nav   │ │   Dynamic Routing     │  │
│ │  Links │ │   (Today / Focus /    │  │
│ │        │ │    Review / Weekly)   │  │
│ └────────┘ └────────────────────────┘  │
└─────────────────────────────────────────┘
```

**Header**:
- Background: `bg-white border-b border-slate-200`
- Logo + "Log | 待办星" (Inter font, text-lg font-semibold)
- Right corner: User avatar + Settings icon
- Sticky positioning

**Sidebar**:
- Background: `bg-slate-50`
- Width: 240px (fixed)
- Navigation links with icons:
  - 🌅 清晨启动 (Morning Start)
  - 📅 今日计划 (Today's Plan)
  - 🍅 番茄专注 (Pomodoro)
  - 🎯 深度工作 (Deep Work)
  - 📝 每日复盘 (Daily Review)
  - 📊 周计划 (Weekly Plan)
  - ⚡ 能量管理 (Energy)
- Active state: `bg-indigo-50 border-l-4 border-indigo-600`

**Main Content**:
- Max width: 1024px
- Padding: `px-8 py-6`
- Background: `bg-white`

## Page Layouts

### 1. Today's Plan Page (`/log/today`)

**Top Section - Top 3 Priorities** (Hero section):
```
┌──────────────────────────────────────────────┐
│  今日最重要的 3 件事                          │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │
│                                              │
│  ⭐ 1. [ ] Complete project proposal draft   │
│          10:00 - 11:30                       │
│                                              │
│  ⭐ 2. [ ] Review Q2 marketing results        │
│          14:00 - 15:30                       │
│                                              │
│  ⭐ 3. [ ] Schedule 1-on-1 with team          │
│          16:00 - 16:30                       │
│                                              │
│  [+ Add to Top 3]                            │
└──────────────────────────────────────────────┘
```

**Design Specs**:
- Card: `bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 shadow-sm`
- Star icon: `text-yellow-500 text-2xl`
- Checkbox: Large (24px), `checked:bg-indigo-600`
- Task title: `text-lg font-medium text-slate-900`
- Time block: `text-sm text-slate-600 ml-8`
- Add button: `text-indigo-600 hover:bg-indigo-50 rounded-lg px-4 py-2`

**Middle Section - Time Blocks**:
```
┌──────────────────────────────────────────────┐
│  时间块安排                                   │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │
│                                              │
│  06:00 ─────── Morning Routine               │
│  08:00 ─────── [ ] Email triage              │
│  09:00 ─────── [ ] Team standup              │
│  10:00 ════════ ⭐ Project proposal (Top 3)  │
│  12:00 ─────── Lunch                         │
│  14:00 ════════ ⭐ Q2 review (Top 3)         │
│  16:00 ════════ ⭐ 1-on-1s (Top 3)           │
│  18:00 ─────── Wrap up                       │
│                                              │
│  [+ Add Time Block]                          │
└──────────────────────────────────────────────┘
```

**Design Specs**:
- Timeline: Vertical layout with time markers on left
- Top 3 tasks: Double-line border (`border-l-4 border-indigo-600`)
- Regular tasks: Single-line border (`border-l-2 border-slate-300`)
- Hour markers: `text-sm text-slate-500 w-16`
- Hover state: `bg-slate-50` for interactive blocks

**Bottom Section - All Tasks**:
```
┌──────────────────────────────────────────────┐
│  所有任务                     [Filter ▼]     │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │
│                                              │
│  [ ] Write blog post               [🔴 High] │
│      Due: Tomorrow                           │
│                                              │
│  [ ] Update website copy           [🟡 Med]  │
│      No due date                             │
│                                              │
│  [ ] Research competitors          [🟢 Low]  │
│      Due: Next week                          │
│                                              │
│  [+ Quick Add Task]                          │
└──────────────────────────────────────────────┘
```

**Design Specs**:
- Task card: `border border-slate-200 rounded-lg p-4 hover:shadow-md`
- Priority badge: Circle icon with color
  - High: `bg-red-100 text-red-700`
  - Medium: `bg-yellow-100 text-yellow-700`
  - Low: `bg-green-100 text-green-700`
- Due date: `text-sm text-slate-500`
- Quick add: Inline input with auto-focus on click

### 2. Pomodoro Focus Page (`/log/focus`)

**Full Screen Focus Mode**:
```
┌──────────────────────────────────────────────┐
│                                              │
│              Currently Working On            │
│                                              │
│        "Complete project proposal draft"     │
│                                              │
│            ┌─────────────────┐               │
│            │                 │               │
│            │      24:53      │  ← Big timer  │
│            │                 │               │
│            └─────────────────┘               │
│                                              │
│         [Pause]  [Skip]  [Stop]              │
│                                              │
│         🍅🍅🍅🍅 (4 completed today)         │
│                                              │
│  ┌──────────────────────────────────────┐   │
│  │ Tips: Focus on one thing. No         │   │
│  │ multitasking. You've got this!       │   │
│  └──────────────────────────────────────┘   │
│                                              │
│  [← Back to Tasks]                           │
└──────────────────────────────────────────────┘
```

**Design Specs**:
- Background: `bg-gradient-to-br from-slate-900 to-slate-800` (dark, distraction-free)
- Timer: `text-8xl font-bold text-white` (circular progress ring optional)
- Task title: `text-2xl text-slate-300 mb-8`
- Buttons: Large touch targets (56px height)
  - Pause: `bg-yellow-500 hover:bg-yellow-600`
  - Skip: `bg-slate-600 hover:bg-slate-700`
  - Stop: `bg-red-500 hover:bg-red-600`
- Tomato count: `text-4xl` (celebrate with subtle animation on completion)
- Tip card: `bg-slate-700/50 rounded-lg p-4 text-slate-300`

**Pomodoro Timer States**:
1. **Ready**: "Start your next pomodoro" (green button)
2. **Working**: Countdown timer (pause/skip/stop buttons)
3. **Rest**: "Take a 5-minute break" (light green background)
4. **Completed**: Celebration animation + "Great job!" message

### 3. Daily Review Page (`/log/review`)

**Review Form Layout**:
```
┌──────────────────────────────────────────────┐
│  📅 Today's Review - June 28, 2026           │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │
│                                              │
│  ✅ What I Completed                         │
│  ┌────────────────────────────────────────┐ │
│  │ ✓ Complete project proposal draft      │ │
│  │ ✓ Review Q2 marketing results           │ │
│  │ ✓ Schedule 1-on-1 with team             │ │
│  └────────────────────────────────────────┘ │
│                                              │
│  ⏸️ What's Still Pending                     │
│  ┌────────────────────────────────────────┐ │
│  │ [ ] Write blog post → Keep / Defer /   │ │
│  │                       Delete / Break   │ │
│  └────────────────────────────────────────┘ │
│                                              │
│  💭 One Problem I Noticed                    │
│  ┌────────────────────────────────────────┐ │
│  │ [Textarea: e.g., Got distracted by     │ │
│  │  Slack notifications in the morning]   │ │
│  └────────────────────────────────────────┘ │
│                                              │
│  💡 One Thing I'll Do Differently            │
│  ┌────────────────────────────────────────┐ │
│  │ [Textarea: e.g., Turn off Slack        │ │
│  │  notifications before 11am]            │ │
│  └────────────────────────────────────────┘ │
│                                              │
│  🌅 Tomorrow's First Task                    │
│  ┌────────────────────────────────────────┐ │
│  │ [Input: e.g., Review partnership       │ │
│  │  proposal]                             │ │
│  └────────────────────────────────────────┘ │
│                                              │
│  ⚡ Energy Level Today                       │
│  ○ High   ● Medium   ○ Low                  │
│                                              │
│  [Save Review]                               │
└──────────────────────────────────────────────┘
```

**Design Specs**:
- Section headers: `text-lg font-semibold text-slate-900 mb-3`
- Completed tasks: Green checkmark, `text-slate-600 line-through`
- Pending tasks: Inline action buttons (Keep/Defer/Delete/Break)
- Textareas: `border border-slate-300 rounded-lg p-3 min-h-24`
- Radio buttons: Large (20px), custom styled with color
- Save button: `bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700`

### 4. Weekly Plan Page (`/log/weekly`)

**Weekly Dashboard**:
```
┌──────────────────────────────────────────────┐
│  📊 Week of June 22 - 28, 2026    [← →]      │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │
│                                              │
│  🎯 This Week's Top 3 Goals                  │
│  ┌────────────────────────────────────────┐ │
│  │ 1. Launch new product landing page     │ │
│  │ 2. Complete Q2 team performance reviews│ │
│  │ 3. Finalize partnership with Acme Corp │ │
│  └────────────────────────────────────────┘ │
│                                              │
│  📅 Daily Breakdown                          │
│  ┌────────────────────────────────────────┐ │
│  │ Mon 6/22  ✓ 5 tasks completed          │ │
│  │ Tue 6/23  ✓ 3 tasks completed          │ │
│  │ Wed 6/24  ✓ 4 tasks completed          │ │
│  │ Thu 6/25  ⏸️ 2 tasks in progress        │ │
│  │ Fri 6/26  📅 6 tasks planned            │ │
│  │ Sat 6/27  📅 2 tasks planned            │ │
│  │ Sun 6/28  📅 1 task planned             │ │
│  └────────────────────────────────────────┘ │
│                                              │
│  📈 Week Stats                               │
│  ┌────────────────────────────────────────┐ │
│  │ Tasks Completed:  17 / 25  (68%)       │ │
│  │ Pomodoros:        23                   │ │
│  │ Focus Hours:      9.5 hrs              │ │
│  └────────────────────────────────────────┘ │
│                                              │
│  [Start Next Week Planning]                  │
└──────────────────────────────────────────────┘
```

**Design Specs**:
- Week navigation: Arrow buttons to go prev/next week
- Goal cards: `bg-indigo-50 rounded-lg p-4 mb-2`
- Daily breakdown: Timeline with icons for status
  - Completed: Green checkmark
  - In Progress: Yellow circle
  - Planned: Blue calendar icon
- Stats: Progress bar for completion rate
- CTA button: Large, prominent at bottom

## Component Design

### Core Components

#### 1. `TaskCard.tsx`
```tsx
interface TaskCardProps {
  task: Task;
  variant?: 'default' | 'compact' | 'top3';
  onToggle?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}
```

**Variants**:
- `default`: Full card with all metadata (priority, due date, description)
- `compact`: Minimal card (title + checkbox only)
- `top3`: Hero card with star icon and large text

**Styling**:
- Default: `border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow`
- Top3: `bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 shadow-sm`
- Completed: `opacity-60 line-through`

#### 2. `PomodoroTimer.tsx`
```tsx
interface PomodoroTimerProps {
  taskId?: string;
  duration?: number; // minutes, default 25
  onComplete?: () => void;
}
```

**States**:
- Idle: Show start button
- Running: Show countdown + pause/stop buttons
- Paused: Show resume button
- Resting: Show rest countdown + skip button
- Completed: Show celebration + "Start Next" button

**Styling**:
- Circular progress indicator (SVG ring)
- Large digits: `font-mono text-8xl`
- Pulse animation on last 60 seconds

#### 3. `TimeBlockPlanner.tsx`
```tsx
interface TimeBlockPlannerProps {
  date: Date;
  tasks: Task[];
  onAssignTime?: (taskId: string, start: Date, end: Date) => void;
}
```

**Features**:
- Drag-and-drop tasks into time slots
- 30-minute intervals (can snap to 15min)
- Visual distinction for Top 3 tasks
- Current time indicator (red line)

**Styling**:
- Hour rows: `border-t border-slate-200 h-16`
- Task blocks: Colored rectangles with task title
- Drag handle: `cursor-grab active:cursor-grabbing`

#### 4. `QuickAddTask.tsx`
```tsx
interface QuickAddTaskProps {
  onAdd: (title: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
}
```

**Features**:
- Inline input field
- Natural language parsing (e.g., "Write blog post tomorrow 2pm" → extracts due date and time)
- Keyboard shortcut: `Cmd + K` to focus from anywhere

**Styling**:
- Input: `border-b-2 border-slate-300 focus:border-indigo-600 text-lg px-2 py-1`
- Suggestions dropdown (if NLP extracts metadata)

## Visual Design System

### Color Palette

**Primary Colors**:
- Indigo 600: `#4f46e5` (Primary actions, focus states)
- Purple 500: `#a855f7` (Accents, gradients)
- Slate 900: `#0f172a` (Headings, dark text)
- Slate 600: `#475569` (Body text)
- Slate 300: `#cbd5e1` (Borders, dividers)
- White: `#ffffff` (Backgrounds)

**Semantic Colors**:
- Success: Green 500 `#22c55e` (Completed tasks)
- Warning: Yellow 500 `#eab308` (Pending, paused)
- Danger: Red 500 `#ef4444` (Delete, urgent)
- Info: Blue 500 `#3b82f6` (Informational)

**Gradients**:
- Top 3 Card: `from-indigo-50 to-purple-50`
- Focus Mode Background: `from-slate-900 to-slate-800`
- Celebration: `from-green-400 to-cyan-500`

### Typography

**Font Families**:
- Primary: `Inter` (all UI text)
- Monospace: `'Roboto Mono'` (timer, stats)

**Font Sizes**:
- Hero (Timer): `text-8xl` (96px)
- H1 (Page Title): `text-3xl` (30px)
- H2 (Section): `text-xl` (20px)
- Body: `text-base` (16px)
- Small: `text-sm` (14px)
- Tiny: `text-xs` (12px)

**Font Weights**:
- Bold: `font-bold` (700) - Headings
- Semibold: `font-semibold` (600) - Subheadings
- Medium: `font-medium` (500) - Task titles
- Regular: `font-normal` (400) - Body text

### Spacing

**Component Spacing**:
- Section gap: `gap-8` (32px)
- Card padding: `p-6` (24px)
- Input padding: `px-4 py-3` (16px, 12px)
- Button padding: `px-6 py-3` (24px, 12px)

**Layout Spacing**:
- Page padding: `px-8 py-6`
- Container max-width: `max-w-4xl` (896px)
- Sidebar width: `w-60` (240px)

### Shadows

- Card: `shadow-sm` (subtle)
- Hover: `shadow-md` (medium)
- Modal: `shadow-xl` (prominent)
- Focus Mode: No shadows (flat, minimal)

### Border Radius

- Small: `rounded-lg` (8px) - Buttons, inputs
- Medium: `rounded-xl` (12px) - Cards
- Large: `rounded-2xl` (16px) - Hero sections
- Circle: `rounded-full` (Priority badges, avatars)

## Responsive Design

### Breakpoints

- Mobile: `< 640px` (sm)
- Tablet: `640px - 1024px` (md, lg)
- Desktop: `> 1024px` (xl, 2xl)

### Mobile Adaptations

**Layout Changes**:
- Hide sidebar, show hamburger menu icon
- Full-width content (`px-4` instead of `px-8`)
- Stack time blocks vertically (no timeline view)
- Bottom navigation bar for key actions

**Component Adaptations**:
- TaskCard: Reduce padding to `p-4`
- PomodoroTimer: Reduce font size to `text-6xl`
- Top 3: Show 1 at a time with swipe navigation
- Quick Add: Sticky bottom button instead of inline

**Touch Targets**:
- Minimum 44px × 44px for all interactive elements
- Larger checkboxes (32px)
- Swipe gestures for task actions (complete, delete)

## Interactions & Animations

### Micro-interactions

1. **Task Completion**:
   - Checkbox: Scale + checkmark draw animation (200ms)
   - Card: Slide out to right + fade (300ms)
   - Confetti burst (if Top 3 task)

2. **Pomodoro Complete**:
   - Timer: Pulse + glow effect
   - Sound: Gentle chime (optional, user setting)
   - Celebration modal: Slide up from bottom

3. **Quick Add**:
   - Input focus: Border color transition (150ms)
   - Submit: Fade in new task card from top

4. **Time Block Drag**:
   - Hover: Slight scale (1.02)
   - Dragging: Shadow increase + cursor change
   - Drop: Snap animation to grid

### Loading States

- Task list: Skeleton cards (3-5 placeholders)
- Pomodoro: Spinner on timer start
- Daily review: Progress bar for save action

### Empty States

- No tasks: Illustration + "Start your day" CTA
- No completed tasks: "No wins yet, keep going!" encouragement
- No weekly goals: "Set your 3 goals for the week" prompt

## Accessibility

### WCAG 2.1 AA Compliance

- Color contrast: Minimum 4.5:1 for text
- Focus indicators: 2px outline on all interactive elements
- Keyboard navigation: Full support (Tab, Enter, Esc, Arrow keys)
- Screen reader: ARIA labels for all icons and actions

### Keyboard Shortcuts

- `Cmd + K`: Quick add task
- `Cmd + /`: Search tasks
- `Cmd + 1-6`: Navigate between SOP pages
- `Space`: Start/pause Pomodoro
- `Enter`: Complete task
- `Esc`: Close modals

### Screen Reader Support

- Task status announcements ("Task completed")
- Timer announcements ("5 minutes remaining")
- Page navigation landmarks
- Alt text for all icons

## Performance

### Optimization Strategies

1. **Lazy Loading**:
   - Weekly stats chart (only load when Weekly page opens)
   - Pomodoro history (paginated, load on scroll)

2. **Code Splitting**:
   - Split routes by page (Today, Focus, Review, Weekly)
   - Lazy load heavy components (Chart.js, confetti)

3. **Data Fetching**:
   - Cache today's tasks (React Query with staleTime: 5min)
   - Optimistic updates for task completion
   - Debounce task title edits (300ms)

4. **Rendering**:
   - Virtualized task list (if > 50 tasks)
   - Memoize TaskCard component
   - Throttle timer updates (1s interval, not sub-second)

### Performance Budget

- Initial load: < 2s (3G connection)
- Time to Interactive: < 3s
- First Contentful Paint: < 1.5s
- Task completion action: < 100ms perceived latency

## Design Handoff Notes

### Assets Needed

1. **Icons**:
   - SOP page icons (SVG, 24x24)
   - Priority badges (SVG, 16x16)
   - Empty state illustrations (SVG, 200x200)

2. **Sounds** (optional):
   - Pomodoro complete chime (MP3, < 50KB)
   - Task complete sound (MP3, < 30KB)

3. **Animations**:
   - Confetti library (e.g., canvas-confetti)
   - Lottie file for celebration (< 100KB)

### Design Files

- Figma file (if created): [Link placeholder]
- Color palette export: Tailwind config
- Component library: Storybook (if built)

## Next Steps

1. **User Feedback**: Share PRD + Design Spec with 3-5 beta testers
2. **Prototype**: Build interactive prototype in Figma or v0
3. **Dev Handoff**: Create Jira tickets for each module
4. **Usability Testing**: Test with 5 users before launch

---

**Document Version**: 1.0
**Last Updated**: 2026-06-28
**Author**: Claude (based on design_sop_update.md)
