# Log Todo Star (待办星) - Product Requirements Document (PRD)

## Overview

**Product Name**: Log Todo Star (待办星)
**Subdomain**: log.bunnyuniverse.com
**Target Users**: 知识工作者、独立创作者、需要时间管理的个人用户
**Core Value**: 通过结构化的 SOP（标准操作流程）帮助用户从被动应对转向主动管理，提升每日工作效率和目标完成率

## Problem Statement

用户面临的核心问题：
1. **启动困难**: 早上不知道从哪里开始，被琐事牵着走
2. **优先级混乱**: 忙一天却没做重要事，任务列表没有重点
3. **频繁打断**: 被消息、通知打断，无法进入深度工作状态
4. **缺乏复盘**: 不知道时间花在哪里，重复犯同样的效率错误
5. **工具割裂**: 任务、日历、番茄钟分散在不同工具，流程不连贯

## User Stories

### Primary User Stories

1. **清晨启动 SOP**
   - As a user, I want to see today's agenda and top 3 priorities when I start my day, so that I can begin from active mode instead of reactive mode.

2. **每日计划 SOP**
   - As a user, I want to assign time blocks to my tasks, so that I know exactly when to work on what.

3. **深度工作 SOP**
   - As a user, I want to enter focus mode with a timer and block distractions, so that I can complete high-value tasks without interruptions.

4. **番茄专注 SOP**
   - As a user, I want to use Pomodoro technique (25min work + 5min rest), so that I can overcome procrastination and make progress on difficult tasks.

5. **复盘总结 SOP**
   - As a user, I want to review what I completed today and plan tomorrow's first task, so that I can improve continuously and start tomorrow with clarity.

6. **周计划 SOP**
   - As a user, I want to set 3 weekly goals and break them into daily tasks, so that my week has direction and I don't feel overwhelmed.

### Secondary User Stories

7. **信息处理 SOP**
   - As a user, I want to convert messages into tasks, so that actionable items don't get lost in chat history.

8. **能量管理 SOP**
   - As a user, I want to track my energy levels and get rest reminders, so that I can maintain sustainable productivity.

## Core Requirements

### 1. Task Management Module

**Must Have**:
- [ ] Task list with CRUD operations (Create, Read, Update, Delete)
- [ ] Task priority levels: High / Medium / Low
- [ ] Task categories: Important-Urgent Matrix (Eisenhower Matrix)
  - Important & Urgent
  - Important but Not Urgent
  - Can Defer
  - Trivial
- [ ] Time block assignment (e.g., "10:00-11:30 Write proposal draft")
- [ ] Task status: Todo / In Progress / Completed / Archived
- [ ] Due date and reminder settings
- [ ] Top 3 daily priorities marking

**Nice to Have**:
- [ ] Recurring tasks
- [ ] Task tags and filters
- [ ] Task templates
- [ ] Task dependencies
- [ ] Subtask support

### 2. Pomodoro Timer Module

**Must Have**:
- [ ] 25-minute work timer with 5-minute rest
- [ ] Visual countdown display
- [ ] Sound notification when timer ends
- [ ] Pause / Resume / Skip controls
- [ ] Link timer to a specific task
- [ ] Pomodoro completion counter (daily streak)

**Nice to Have**:
- [ ] Customizable timer length (e.g., 50min work + 10min rest)
- [ ] Long break after 4 pomodoros
- [ ] Pomodoro history and statistics

### 3. Daily Planning Module

**Must Have**:
- [ ] Daily task view (Today's tasks)
- [ ] Select Top 3 priorities for the day
- [ ] Time block planner (visual time slots)
- [ ] Quick task capture (brain dump area)

**Nice to Have**:
- [ ] Calendar integration
- [ ] Time estimation vs actual tracking
- [ ] Morning routine checklist

### 4. Daily Review Module

**Must Have**:
- [ ] Completed tasks summary
- [ ] Incomplete tasks review (with options: Keep / Defer / Delete / Break Down)
- [ ] One problem reflection (Why was I inefficient today?)
- [ ] One optimization action (What will I do differently tomorrow?)
- [ ] Tomorrow's first task planning

**Nice to Have**:
- [ ] Daily reflection journal
- [ ] Mood tracking
- [ ] Energy level tracking

### 5. Weekly Planning Module

**Must Have**:
- [ ] Weekly goals setting (max 3 core goals)
- [ ] Break down weekly goals into daily tasks
- [ ] Weekly review (What completed? What delayed? What's not worth doing?)

**Nice to Have**:
- [ ] Weekly template
- [ ] Weekly stats dashboard
- [ ] Week-over-week comparison

### 6. Energy Management Module

**Must Have**:
- [ ] Hourly rest reminder (browser notification)
- [ ] Energy level tracking (High / Medium / Low)

**Nice to Have**:
- [ ] Sleep time tracking
- [ ] Energy pattern analysis
- [ ] Low-energy task suggestions

### 7. Message-to-Task Converter

**Must Have**:
- [ ] Quick capture from any text (paste message → create task)
- [ ] Extract task title and due date from text

**Nice to Have**:
- [ ] Browser extension for one-click capture
- [ ] Email integration

## Database Schema

### `tasks` Table
```sql
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'todo', -- 'todo' | 'in_progress' | 'completed' | 'archived'
  priority TEXT DEFAULT 'medium', -- 'high' | 'medium' | 'low'
  category TEXT, -- 'important_urgent' | 'important_not_urgent' | 'can_defer' | 'trivial'
  is_top3 BOOLEAN DEFAULT false,
  time_block_start TIMESTAMPTZ,
  time_block_end TIMESTAMPTZ,
  due_date DATE,
  reminder_time TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

### `pomodoros` Table
```sql
CREATE TABLE pomodoros (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  task_id UUID REFERENCES tasks(id) ON DELETE SET NULL,
  duration_minutes INTEGER DEFAULT 25,
  completed BOOLEAN DEFAULT false,
  started_at TIMESTAMPTZ NOT NULL,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

### `daily_reviews` Table
```sql
CREATE TABLE daily_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL UNIQUE,
  completed_tasks_count INTEGER DEFAULT 0,
  problem_reflection TEXT,
  optimization_action TEXT,
  tomorrow_first_task TEXT,
  energy_level TEXT, -- 'high' | 'medium' | 'low'
  mood TEXT, -- 'great' | 'good' | 'okay' | 'tired' | 'stressed'
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

### `weekly_goals` Table
```sql
CREATE TABLE weekly_goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  week_start_date DATE NOT NULL,
  goal_1 TEXT,
  goal_2 TEXT,
  goal_3 TEXT,
  review_completed_count INTEGER DEFAULT 0,
  review_delayed_count INTEGER DEFAULT 0,
  review_not_worth_count INTEGER DEFAULT 0,
  review_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, week_start_date)
);
```

## Success Criteria

### Quantitative Metrics
- [ ] User completes daily planning 5+ days per week
- [ ] User marks Top 3 tasks 80%+ of active days
- [ ] User completes 4+ pomodoros per day
- [ ] User completes daily review 3+ days per week
- [ ] Average task completion rate > 60%

### Qualitative Metrics
- [ ] Users report feeling "in control" of their day
- [ ] Users can articulate their daily priorities
- [ ] Users notice reduction in "busy but unproductive" days

## Out of Scope (V1)

- Team collaboration features
- Mobile app (web-first, responsive design only)
- AI-powered task suggestions
- Integration with third-party tools (Notion, Todoist, etc.)
- Time tracking and billing
- Habit tracking

## Implementation Timeline

### Phase 1: MVP (Week 1-2)
- Basic task CRUD
- Top 3 priority marking
- Daily task view
- Simple Pomodoro timer

### Phase 2: Core SOPs (Week 3-4)
- Daily planning module
- Daily review module
- Task time blocks
- Energy level tracking

### Phase 3: Advanced Features (Week 5-6)
- Weekly planning module
- Pomodoro history
- Task categories (Eisenhower Matrix)
- Message-to-task converter

### Phase 4: Polish & Launch (Week 7)
- UI/UX refinement
- Performance optimization
- Documentation
- Launch on log.bunnyuniverse.com

## Open Questions

1. **Authentication**: Use Supabase Auth or allow anonymous mode?
   - **Recommendation**: Start with anonymous mode (localStorage), add auth later
2. **Data Persistence**: Client-side only or sync to Supabase?
   - **Recommendation**: Supabase from day 1 for cross-device sync
3. **Notification System**: Browser notifications or in-app only?
   - **Recommendation**: Start with in-app, add browser notifications in Phase 3
4. **Freemium Model**: All features free or have premium tier?
   - **Recommendation**: 100% free for V1, consider premium later

## References

- Design SOP Document: `/Volumes/Lexar/oneweekoneproject/bunnyuniverse/docs/design_sop_update.md`
- Related Project: Bunny Universe Hub (bunnyuniverse.com)
- Tech Stack: React 19 + TypeScript + Tailwind CSS v4 + Supabase
