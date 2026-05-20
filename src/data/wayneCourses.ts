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
  tier: 'free' | 'paid';
  price?: number;
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
];
