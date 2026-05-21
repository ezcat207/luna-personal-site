export interface CourseLesson {
  title: string;
  type: 'article' | 'video' | 'practice';
  duration?: string;
}

export interface CourseModule {
  number: number;
  title: string;
  description: string;
  lessons: CourseLesson[];
}

export interface WayneCourse {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tier: 'free' | 'paid' | 'limited-free';
  price?: number;
  freeSlots?: number;       // For limited-free courses: total free spots
  status: 'live' | 'coming-soon';
  duration: string;
  level: 'Beginner' | 'Intermediate';
  tags: string[];
  learningOutcomes: string[];
  tools: string[];
  modules: CourseModule[];
}

export const wayneCourses: WayneCourse[] = [
  {
    id: 'ai-family-starter',
    title: 'AI Family Starter Pack',
    subtitle: 'ChatGPT, Cursor, and your first AI project — together',
    description:
      "A free, parent-and-child course to get your family started with AI tools. No coding experience needed. Wayne walks through the setup, Luna shows what's possible.",
    tier: 'free',
    status: 'live',
    duration: '~3 hours',
    level: 'Beginner',
    tags: ['ChatGPT', 'Cursor', 'GitHub Copilot', 'Vibe Coding'],
    learningOutcomes: [
      "Set up ChatGPT and understand what it can (and can't) do",
      'Install VS Code + GitHub Copilot free tier',
      'Open Cursor and have your first AI conversation with code',
      'Build and deploy your first webpage with AI assistance',
      'Know how to ask AI better questions (prompt basics)',
    ],
    tools: ['ChatGPT', 'VS Code', 'GitHub Copilot', 'Cursor', 'Vercel'],
    modules: [
      {
        number: 0,
        title: 'Why This Matters',
        description: 'What changed in AI and why parents + kids learning together has an edge.',
        lessons: [
          { title: 'The AI Shift: What Parents Need to Know', type: 'article', duration: '5 min' },
          {
            title: "Luna Demonstrates: What I Built This Month with AI",
            type: 'video',
            duration: '3 min',
          },
        ],
      },
      {
        number: 1,
        title: 'ChatGPT First Steps',
        description: 'Account setup, interface tour, and your first real conversation.',
        lessons: [
          {
            title: 'Account Registration + Interface Walkthrough',
            type: 'article',
            duration: '10 min',
          },
          {
            title: 'How to Ask Good Questions (Prompt Basics)',
            type: 'article',
            duration: '8 min',
          },
          {
            title: 'Family Practice: Write a Letter Together with ChatGPT',
            type: 'practice',
            duration: '15 min',
          },
        ],
      },
      {
        number: 2,
        title: 'AI Coding Tools Setup',
        description: 'Install the tools Wayne and Luna use every week.',
        lessons: [
          { title: 'VS Code: Install & Interface Tour', type: 'article', duration: '10 min' },
          { title: 'GitHub Copilot Free Tier: Activate', type: 'article', duration: '8 min' },
          { title: 'Cursor: Install + First AI Conversation', type: 'article', duration: '12 min' },
          { title: "What is Codex? How Wayne Uses It", type: 'article', duration: '5 min' },
        ],
      },
      {
        number: 3,
        title: 'First Project: Your Hello World',
        description: 'Build something real. Deploy it. Show the world.',
        lessons: [
          { title: 'Let AI Write Your First Webpage', type: 'practice', duration: '20 min' },
          { title: 'Deploy in 2 Minutes with Vercel', type: 'article', duration: '10 min' },
          {
            title: "Luna's First Project Walkthrough",
            type: 'video',
            duration: '5 min',
          },
        ],
      },
    ],
  },
  {
    id: 'website-seo',
    title: 'Build Your Site. Get Found.',
    subtitle: 'Website building + SEO for families — from zero to a real audience',
    description:
      "Learn how to build a personal or family website using AI, then make it discoverable on Google. SEO doesn't have to be complicated — this is the parent-and-kid-friendly version.",
    tier: 'paid',
    price: 149,
    status: 'coming-soon',
    duration: '5 weeks',
    level: 'Beginner',
    tags: ['React', 'Vercel', 'SEO', 'Google Search Console'],
    learningOutcomes: [
      'Build and deploy a real personal or family website',
      'Understand how Google finds and ranks pages',
      'Write content that both humans and search engines love',
      'Set up Google Search Console and read the data',
      'Ship a site update every week',
    ],
    tools: ['Cursor', 'React', 'Vercel', 'Google Search Console'],
    modules: [],
  },
  {
    id: 'ctf-intro',
    title: 'CTF: Your First Flag',
    subtitle: 'Introduction to cybersecurity competitions for ages 8–14',
    description:
      "Capture the Flag competitions are how hackers learn — and they're surprisingly fun for kids. This course prepares beginners for picoCTF and similar competitions, with Wayne explaining the \"why\" and Luna showing the \"how\".",
    tier: 'paid',
    price: 129,
    status: 'coming-soon',
    duration: '6 weeks',
    level: 'Beginner',
    tags: ['CTF', 'Cryptography', 'Web Security', 'picoCTF'],
    learningOutcomes: [
      'Understand what CTF competitions are and how to enter',
      'Solve your first cryptography challenge (Caesar cipher, ROT13, Base64)',
      'Explore web page source code like a hacker',
      'Understand basic binary and hex number systems',
      'Submit your first flag in picoCTF',
    ],
    tools: ['picoCTF', 'CyberChef', 'browser DevTools', 'Python basics'],
    modules: [
      {
        number: 1,
        title: 'What is CTF? (And Why Kids Love It)',
        description: "Intro to the competition format. Register on picoCTF. Wayne explains why this is the best way to learn security.",
        lessons: [
          { title: 'Jeopardy-style CTF: How the Game Works', type: 'article', duration: '8 min' },
          { title: 'picoCTF: Create Your Account + Explore', type: 'practice', duration: '15 min' },
          { title: "Wayne's Take: Why CTF > Security Textbooks", type: 'article', duration: '5 min' },
          { title: "Luna's Reaction: My First CTF Session", type: 'video', duration: '4 min' },
        ],
      },
      {
        number: 2,
        title: 'Cryptography: Secret Messages',
        description: 'The most beginner-friendly CTF category. Caesar cipher, ROT13, Base64, and CyberChef.',
        lessons: [
          { title: 'Caesar Cipher & ROT13: Manual + Tool', type: 'practice', duration: '20 min' },
          { title: 'Base64: What It Is and How to Decode It', type: 'article', duration: '10 min' },
          { title: 'CyberChef: Your Crypto Swiss Army Knife', type: 'practice', duration: '15 min' },
          { title: 'Solve 3 Real picoCTF Crypto Challenges', type: 'practice', duration: '30 min' },
        ],
      },
      {
        number: 3,
        title: 'Web Exploitation: Hidden in Plain Sight',
        description: "Every webpage hides secrets. Learn to find them with DevTools.",
        lessons: [
          { title: 'View Source: What\'s Inside Every Webpage', type: 'article', duration: '10 min' },
          { title: 'DevTools: Elements, Network, and Console Tabs', type: 'practice', duration: '20 min' },
          { title: 'robots.txt, Hidden Paths & URL Tricks', type: 'practice', duration: '15 min' },
          { title: 'Cookie Inspection + Simple Parameter Manipulation', type: 'practice', duration: '20 min' },
        ],
      },
      {
        number: 4,
        title: 'Forensics & Steganography: Files with Secrets',
        description: 'Images can hide messages. Files can hide other files. Learn to look deeper.',
        lessons: [
          { title: 'File Types & Magic Bytes: What Makes a File', type: 'article', duration: '8 min' },
          { title: 'Steganography: Images that Hide Data', type: 'practice', duration: '20 min' },
          { title: 'Strings Command: Read Any File Like a Pro', type: 'practice', duration: '15 min' },
          { title: 'Solve 2 Forensics Challenges on picoCTF', type: 'practice', duration: '25 min' },
        ],
      },
      {
        number: 5,
        title: 'Binary Basics: The Hacker\'s Foundation',
        description: 'A gentle intro to binary, hex, and what programs actually are.',
        lessons: [
          { title: 'Binary & Hex: Numbers Computers Speak', type: 'article', duration: '12 min' },
          { title: 'ASCII Table: How Computers Store Text', type: 'article', duration: '8 min' },
          { title: 'ELF Files & the `strings` Command', type: 'practice', duration: '20 min' },
          { title: 'Using AI to Understand Disassembly Output', type: 'practice', duration: '15 min' },
        ],
      },
      {
        number: 6,
        title: 'Family Mini-CTF: Your First Competition',
        description: 'A 24-hour live challenge. Wayne designs it, Luna competes, you both play.',
        lessons: [
          { title: 'Competition Strategy: Time, Hints, Team Roles', type: 'article', duration: '10 min' },
          { title: '24-Hour Family Mini-CTF Challenge', type: 'practice', duration: '24 hrs' },
          { title: 'Wayne + Luna Debrief: What We Learned', type: 'video', duration: '10 min' },
          { title: 'How to Enter picoCTF — Next Steps', type: 'article', duration: '5 min' },
        ],
      },
    ],
  },
  {
    id: 'ai-leadership',
    title: 'AI 领导力：带人带 AI 的六项核心能力',
    subtitle: '从"会用 AI"升级为"用 AI 带团队"的系统方法',
    description:
      '大多数人用 AI 一年后能力没有真正增长。这门课把 AI 领导力拆解成六项可训练的具体能力：管理上下文、拆解任务、判断人机分工、路由工具、诊断错误、沉淀经验。前 97 人限免。',
    tier: 'limited-free',
    price: 199,
    freeSlots: 97,
    status: 'live',
    duration: '6 周',
    level: 'Intermediate',
    tags: ['AI管理', '团队协作', '提示词工程', '工作流', '领导力'],
    learningOutcomes: [
      '建立"目标=团队+开会"的 AI 领导力框架',
      '掌握上下文管理：什么信息给 AI，什么信息不给',
      '学会任务拆解：把复杂需求切成可执行序列',
      '设计人机分工：知道哪些事 AI 做，哪些必须人来',
      '建立诊断能力：出错时追根因而不是盲目重试',
      '形成沉淀习惯：把每次成功变成可复用的资产',
    ],
    tools: ['Claude', 'ChatGPT', 'Cursor', 'Notion', 'CLAUDE.md / Skill Files'],
    modules: [
      {
        number: 0,
        title: '为什么你需要一套系统',
        description: '会用 AI 和用好 AI 的本质区别。公式：目标 = 团队 + 开会。',
        lessons: [
          { title: '会用 AI 和用好 AI 的本质区别', type: 'article', duration: '10 min' },
          { title: '公式解析：目标 = 团队 + 开会', type: 'article', duration: '8 min' },
          { title: '自我评估：你现在在哪个层次？', type: 'practice', duration: '10 min' },
        ],
      },
      {
        number: 1,
        title: '管理：上下文就是控制权',
        description: '什么信息该给 AI，什么不该给？长期信息 vs 当前任务信息，原文 vs 摘要。',
        lessons: [
          { title: '上下文的四个层次', type: 'article', duration: '12 min' },
          { title: '信息过滤：什么该给，什么不该给', type: 'article', duration: '10 min' },
          { title: '长期信息 vs 当前任务信息的管理方式', type: 'article', duration: '10 min' },
          { title: '练习：把 500 字背景压缩成 80 字上下文', type: 'practice', duration: '20 min' },
        ],
      },
      {
        number: 2,
        title: '拆解：任务不拆解，结果不可控',
        description: '为什么复杂任务必须拆解。拆解顺序、检查点设计、三类场景模板。',
        lessons: [
          { title: '为什么复杂任务必须拆解', type: 'article', duration: '10 min' },
          { title: '拆解的顺序：先做什么，后做什么', type: 'article', duration: '12 min' },
          { title: '检查点设计：什么时候介入，什么时候让 AI 继续', type: 'article', duration: '10 min' },
          { title: '练习：用拆解模板处理你的真实需求', type: 'practice', duration: '25 min' },
        ],
      },
      {
        number: 3,
        title: '判断：设计人机分工',
        description: 'AI 天然适合什么，人必须负责什么。串联/并联/迭代三种协作模式。',
        lessons: [
          { title: 'AI 擅长什么，人必须负责什么', type: 'article', duration: '10 min' },
          { title: '人机分工的三种模式：串联、并联、迭代', type: 'article', duration: '12 min' },
          { title: '如何避免 AI 依赖症', type: 'article', duration: '8 min' },
        ],
      },
      {
        number: 4,
        title: '路由：把任务交给对的「人」',
        description: '不只是哪个模型最好——这一步该由谁来做？工具匹配与流程路由图。',
        lessons: [
          { title: '任务类型与工具匹配逻辑', type: 'article', duration: '12 min' },
          { title: '多步骤任务的路由图设计', type: 'practice', duration: '20 min' },
          { title: '动态路由：根据结果调整工具选择', type: 'article', duration: '10 min' },
        ],
      },
      {
        number: 5,
        title: '诊断：出错不是重试，是追因',
        description: 'AI 出错的六类根本原因。诊断流程，从现象到根因到定向修复。',
        lessons: [
          { title: 'AI 出错的六个根本原因', type: 'article', duration: '15 min' },
          { title: '诊断流程：从现象到根因', type: 'practice', duration: '20 min' },
          { title: '建立你的诊断记录本', type: 'practice', duration: '15 min' },
        ],
      },
      {
        number: 6,
        title: '沉淀：让每次成功变成下次的起点',
        description: '四类可沉淀资产。沉淀的形式和工具。如何让团队越用越强。',
        lessons: [
          { title: '什么值得沉淀：四类可复用资产', type: 'article', duration: '10 min' },
          { title: '沉淀的形式：Prompt 库、Skill File、SOP', type: 'practice', duration: '20 min' },
          { title: '团队级沉淀：让组织越用越强', type: 'article', duration: '10 min' },
        ],
      },
      {
        number: 7,
        title: '实战：从大目标到可执行任务',
        description: '综合应用六项能力，完成一个真实项目的目标拆解与复盘。',
        lessons: [
          { title: '目标拆解完整流程演示', type: 'video', duration: '20 min' },
          { title: '复盘框架：四个核心问题', type: 'article', duration: '10 min' },
        ],
      },
    ],
  },
];
