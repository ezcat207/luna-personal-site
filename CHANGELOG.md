# Changelog

All notable changes to Bunny Universe will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## 📋 Planned Features

Features that have been designed (with PRD + Design Spec) but not yet implemented.

### 🟡 Log Todo Star (待办星) - Task & Time Management System

**Status**: 🟡 Designed (PRD + Design Spec completed, pending implementation)
**Target Subdomain**: log.bunnyuniverse.com
**Target Release**: Q3 2026 (7-week development cycle)

#### Overview
A comprehensive SOP-based task and time management system for knowledge workers, creators, and anyone seeking structured productivity workflows.

#### Core Modules (8 SOPs)
1. **Morning Start SOP** - Top 3 priorities + today's agenda view
2. **Daily Planning SOP** - Time block planner with visual timeline
3. **Deep Work SOP** - Full-screen focus mode (dark theme, distraction-free)
4. **Pomodoro SOP** - 25min work + 5min rest cycles with celebration animations
5. **Daily Review SOP** - Structured reflection (problems → improvements → tomorrow's first task)
6. **Weekly Planning SOP** - 3 core weekly goals + daily task breakdown
7. **Message-to-Task SOP** - Quick capture from any text source
8. **Energy Management SOP** - Energy tracking + rest reminders

#### Key Features
- Task management with priority levels (Eisenhower Matrix)
- Visual time block planner with drag-and-drop
- Pomodoro timer with task linking and streak tracking
- Daily/weekly review workflows
- Supabase sync for cross-device access
- Keyboard-first design with shortcuts (Cmd+K, etc.)

#### Design Aesthetic
- **Color Palette**: Indigo/Purple gradients for calm focus
- **Typography**: Inter (primary), Roboto Mono (timer)
- **Layout**: Clean sidebar navigation + max-w-4xl content
- **Responsive**: Mobile-first with bottom nav bar

#### Database Tables
- `tasks` - Task management with time blocks, priorities, categories
- `pomodoros` - Timer sessions linked to tasks
- `daily_reviews` - Reflection entries with energy/mood tracking
- `weekly_goals` - Weekly goal planning and review

#### Implementation Phases
- **Phase 1 (Week 1-2)**: MVP - Task CRUD + basic Pomodoro timer
- **Phase 2 (Week 3-4)**: Core SOPs - Daily planning + review modules
- **Phase 3 (Week 5-6)**: Advanced - Weekly planning + Eisenhower Matrix
- **Phase 4 (Week 7)**: Polish - UI refinement + performance optimization + launch

#### Documentation
- **PRD**: `docs/log-todo-star-prd.md`
- **Design Spec**: `docs/log-todo-star-design.md`
- **Source SOP Document**: `docs/design_sop_update.md`

#### Dependencies
- Existing: Supabase auth, log subdomain DNS
- New: Pomodoro timer library, drag-and-drop for time blocks

---

_(Add new planned features below this line)_

---

## ✅ Implemented Features

Features that have been fully implemented and deployed.

### [1.1.0] - Log Analysis Feature (2026-06-20)

#### Added
- **Analysis Dashboard** (`/analysis` route on log subdomain)
  - Date range selection with quick filters (Last 7 Days, Last 30 Days, This Month)
  - Time coverage statistics showing planned vs actual study time
  - Subject-based progress tracking with completion rates
  - Task/Subtask breakdown (expandable cards)
  - Export analysis reports as Markdown files
  - Save and manage custom reports

- **Authentication-Gated Access**
  - Login required for real data access
  - Anonymous users see demo template with sample data
  - User-scoped data (each user only sees their own logs)

- **Components Created**:
  - `DateRangePicker.tsx` - Date range selector with validation
  - `TimeCoverageStats.tsx` - Dual progress bar showing time usage
  - `SummaryStats.tsx` - Summary cards (tasks, completion rate, study time)
  - `SubjectCard.tsx` - Expandable subject progress cards
  - `ExportMarkdownButton.tsx` - One-click Markdown export
  - `SavedReportsList.tsx` - Sidebar for saved reports
  - `SaveReportModal.tsx` - Modal for naming and saving reports

- **Data Layer**:
  - `useLogAnalysis` hook - Fetches and aggregates task data
  - `useSavedReports` hook - CRUD operations for saved reports
  - Utility functions for aggregation, formatting, and Markdown generation

#### Database
- `luna_saved_reports` table (Supabase migration ready)
- Row-level security policies for user data isolation

#### Technical
- Full TypeScript type safety
- Framer Motion animations for smooth UX
- Responsive design (mobile + desktop layouts)
- Loading skeletons and error states

---

### [1.0.0] - Multi-Site Architecture (2026-06-XX)

#### Added
- **Four Sub-Sites with Shared Deployment**
  - `bunnyuniverse.com` → Hub homepage (dual entry point)
  - `wayne.bunnyuniverse.com` → Parent's teaching plans
  - `luna.bunnyuniverse.com` → Child's learning journal
  - `future.bunnyuniverse.com` → Course platform
  - `log.bunnyuniverse.com` → Daily task tracking

- **Persona-Based Routing**
  - `usePersona()` hook for hostname detection
  - Dev override support via `?persona=` query param
  - Automatic layout switching based on persona

#### Design Systems
- **Wayne Layout**: Professional clean design (white nav, indigo accents)
- **Luna Layout**: Scrapbook aesthetic (paper textures, washi tape, handwritten fonts)
- **Future Layout**: Dark tech theme (gradient bg, neon accents, gamified UI)
- **Log Layout**: Inherited from Luna's playful style

---

### [1.0.0] - Wayne Teaching Plans (2026-06-XX)

#### Added
- Weekly teaching plan posts (published every Wednesday)
- Content structure:
  - What we taught
  - Why this topic
  - Tools used
  - Luna's reaction
  - Parent lessons learned
  - Next week preview
  - Resources list
- SEO-optimized individual plan pages
- Roadmap visualization for AI learning journey

#### Technical
- Data-driven content via `src/data/wayneWeeks.ts`
- Component auto-rendering on new data push
- Individual plan detail pages with routing

---

### [1.0.0] - Luna Learning Journal (2026-06-XX)

#### Added
- Weekly learning journal entries (published every Sunday)
- Content structure:
  - What I learned
  - What I made
  - Hardest part
  - Coolest thing
  - Stats (practice count, works completed, new skills)
- Scrapbook-style visual presentation
- SEO-optimized individual entry pages

#### Technical
- Data-driven content via `src/data/lunaWeeks.ts`
- Component auto-rendering on new data push
- Individual entry detail pages with routing

---

### [1.0.0] - Future Course Platform (2026-06-XX)

#### Added
- **AI Age Test**: Interactive quiz to assess AI readiness
- **Free Tool Playground**: Links to AI tools for kids
- **Four Course Tracks**:
  1. AI Explorer (Ages 6-8)
  2. Code Creator (Ages 9-11)
  3. Digital Designer (Ages 12-14)
  4. Tech Innovator (Ages 15-17)

#### Design
- Dark theme with gradient backgrounds
- Gamified UI elements
- Neon accent colors (indigo/purple)
- Responsive card layouts

---

### [1.0.0] - Daily Log System (2026-06-XX)

#### Added
- **Daily Task Tracking**
  - Multi-subject task management
  - Task status (none, done, skip)
  - Estimated vs actual time tracking
  - Wrong answer counting
- **Template System**
  - School template (Chinese, Math, English, Reading, Other)
  - Summer template (8 activities including AI Coding)
  - Custom template (user-defined subjects)
- **Self-Rating System**
  - Efficiency rating (1-5 stars)
  - Accuracy rating (1-5 stars)
  - Handwriting rating (1-5 stars)
- **Dad's Comment Section**
  - CTF-gated unlock mechanism
  - 100+ encouragement phrases
  - Quick-fill encouragement chips
- **Pet Widget**
  - Animated bunny character
  - Mood changes based on task completion
  - CTF unlock bonus animations
- **14-Day History**
  - Visual completion percentage tiles
  - Quick navigation between days
  - Color-coded progress indicators

#### Technical
- Supabase integration for data persistence
- Real-time auto-save (600ms debounce)
- User authentication with Google Sign-In
- Privacy controls (public/private logs)
- Multi-user support (each user has their own logs)
- Anonymous mode for shared default data
- Collapsible form (bunny hero view vs. full form)
- Responsive design (desktop + mobile)

#### Database
- `luna_daily_logs` table (main log entries)
- `luna_log_tasks` table (individual tasks)
- User-scoped queries for data isolation

---

### [1.0.0] - Authentication & User Management (2026-06-XX)

#### Added
- **Google OAuth Sign-In**
  - Supabase Auth integration
  - User profile display (name, avatar)
  - Persistent sessions
- **Privacy Controls**
  - Public/private toggle for log entries
  - User-scoped data isolation
  - Anonymous mode for shared logs

#### Technical
- `useAuth()` hook for auth state management
- `AuthButton` component (sign-in + user menu)
- Session persistence via Supabase

---

### [1.0.0] - Internationalization (2026-06-XX)

#### Added
- **Bilingual Support (English + Chinese)**
  - react-i18next integration
  - Language toggle button
  - Persistent language preference (localStorage)
  - Default to English
- **Translation Coverage**
  - All UI strings
  - Template labels
  - Error messages
  - Encouragement phrases

#### Technical
- `src/i18n/index.ts` configuration
- `src/locales/en.json` and `src/locales/zh.json`
- Dynamic locale switching without page reload

---

### [1.0.0] - SEO & Meta Tags (2026-06-XX)

#### Added
- **SEO Optimization**
  - `react-helmet-async` for dynamic meta tags
  - Persona-specific default SEO
  - Per-page SEO overrides
  - Open Graph tags for social sharing
  - Twitter Card tags
  - Canonical URLs
- **Sitemaps**
  - `robots.txt` with sitemap pointers
  - `sitemap.xml` with all routes

#### Technical
- `SEOHead` component for reusable SEO logic
- Default SEO in layout components
- Page-level SEO overrides in route components

---

### [1.0.0] - Deployment & Infrastructure (2026-06-XX)

#### Added
- **Vercel Deployment**
  - Auto-deploy on git push to main
  - Production build validation
  - TypeScript strict mode (`tsc -b`)
- **Cloudflare DNS**
  - CNAME records for all subdomains
  - SSL auto-provisioning via Vercel
  - Proxied=false for Vercel integration
- **Environment Management**
  - `.env` for Cloudflare credentials
  - Supabase connection configs

#### Process
- Pre-commit build validation (`npm run build`)
- Automated deployment pipeline
- DNS configuration via Cloudflare API

---

## 🗂️ Version History Summary

| Version | Date | Key Features |
|---------|------|--------------|
| 1.0.0 | 2026-06-XX | Initial release: 5 subdomains, content systems, daily log, auth, i18n, SEO |

---

## 📌 How to Update This Changelog

### When Planning a New Feature:
1. Add to **Planned Features** section with status 🟡 Designed
2. Link to PRD and Design Spec docs
3. Include key features, dependencies, and target release

### When Implementing a Feature:
1. Move from **Planned Features** to **Implemented Features**
2. Change status from 🟡 to ✅
3. Add implementation details and actual release date
4. Update version number if starting a new release cycle

### When Making Small Changes:
- Add to the most recent version section under appropriate category:
  - `Added` for new features
  - `Changed` for changes in existing functionality
  - `Deprecated` for soon-to-be removed features
  - `Removed` for now removed features
  - `Fixed` for any bug fixes
  - `Security` for vulnerability fixes

---

## 🔗 Related Documentation

- **Project Context**: `CLAUDE.md`
- **Design Guide**: `DESIGN.md`
- **Feature Docs**: `docs/` directory
- **Project Tracker**: `/Volumes/Lexar/AISync90/x_personal_lexar/0000 Goal-Team-Meet/projects/P001-website/P001G-weekly-publish/P001G-project.md`

