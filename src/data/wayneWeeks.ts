export interface WayneWeek {
  week: number;
  date: string; // ISO format: YYYY-MM-DD (Wednesday publish date)
  title: string;
  summary: string;
  tools: string[];
  resources: { label: string; url: string }[]; // for replication
  whatWeTaught: string;
  whyThisTopic: string;
  lunaReaction: string;
  parentLesson: string;
  nextWeekPreview: string;
}

export const wayneWeeks: WayneWeek[] = [
  {
    week: 0,
    date: '2026-02-24',
    title: 'Building FandomTrivia: Teaching Real App Development with AI Tools',
    summary:
      "Two back-to-back sessions where Luna built a full Harry Potter trivia app — from scratch — using AI as a co-pilot. Day 1: directed AI to scaffold a quiz site, debug errors live, and add a HP question bank. Day 2: scaled to all 7 books using NotebookLM to generate 100 questions, then added Google login with Supabase auth. The live site at fandom-trivia.com is real and still running.",
    tools: ['Antigravity (AI coding assistant)', 'NotebookLM', 'Supabase', 'Vercel'],
    resources: [
      {
        label: 'Live site: FandomTrivia',
        url: 'https://www.fandom-trivia.com/',
      },
      {
        label: 'NotebookLM (question generation from uploaded books)',
        url: 'https://notebooklm.google.com/',
      },
      {
        label: 'Supabase (auth + database, free tier)',
        url: 'https://supabase.com/',
      },
      {
        label: 'Antigravity (AI coding tool for kids)',
        url: 'https://antigravity.dev/',
      },
    ],
    whatWeTaught:
      "Three things across two sessions. First, the AI-as-co-pilot model: Luna directed the AI with natural language instructions ('add a score counter', 'make the question text bigger', 'fix this error') rather than writing code herself. The skill being trained was specification — how to describe what you want precisely enough that a machine can execute it. Second, sourcing and structuring data: we used NotebookLM to upload the HP book summaries and generate 100 trivia questions organized by book. This taught the concept of AI as a specialized research tool, not just a code generator. Third, auth: adding Google login via Supabase showed that 'user accounts' are a solved problem — you don't build them, you integrate a service. That mental model matters for every future project.",
    whyThisTopic:
      "Luna wanted to build something real that her friends could actually use. That motivation is rare and worth exploiting fully. A trivia app is achievable in a session but has enough real complexity — data, UI, auth, deployment — that she'd touch all the layers of a real product. Using AI tools meant she could punch above her technical weight and ship something she was proud of, which matters more than whether she wrote the code herself at this stage.",
    lunaReaction:
      "She was shocked that the first version worked at all — she kept expecting it to fail. Once it didn't, she immediately wanted to make it bigger ('can we do all 7 books?'). The Google login was the moment she felt like she'd built a 'real' app — not a toy. She texted the link to her friends before the session was over.",
    parentLesson:
      "Ship something. An imperfect real product that friends can use is worth 10x a polished demo that lives on your laptop. Luna learned more from her friends trying the app and hitting bugs than from any tutorial. Build the feedback loop first, then optimize.",
    nextWeekPreview:
      "The app had a bug: it was pulling from main branch but Vercel was showing a preview from dev. Luna didn't understand why the live site looked different from what she'd just changed. That discrepancy became the seed for the Git/GitHub lesson.",
  },
  {
    week: 1,
    date: '2026-05-07',
    title: 'Git vs GitHub: Teaching Version Control Through a Real Broken Project',
    summary:
      "We skipped the slides and went straight to a real GitHub repo — Stella's FandomTrivia site — where a live bug was sitting right there waiting. The site wasn't updating even though Vercel showed a preview change. The culprit: wrong branch, no pull request. We used that to explain the whole Git/GitHub mental model. Then Luna did her first CTF to cap it off.",
    tools: ['GitHub', 'Vercel', 'picoCTF', 'Gemini'],
    resources: [
      {
        label: 'Tutorial: AI Programming Git Lesson (Level C8)',
        url: 'https://www.xuanyuancode.com/ai-programming/levels/c8/tutorial',
      },
      {
        label: 'Real project for demo: FandomTrivia GitHub Issues',
        url: 'https://github.com/stellaruoyu/FandomTrivia/issues',
      },
      {
        label: 'Live site to compare against (shows the branch difference)',
        url: 'https://www.fandom-trivia.com/',
      },
      {
        label: 'CTF Challenge: picoCTF Command Injection (Challenge #757)',
        url: 'https://play.picoctf.org/practice/challenge/757',
      },
    ],
    whatWeTaught:
      "Three things. First, the mental model: GitHub is the laboratory, Git is one of the tools inside it. GitHub also contains Issues, Pull Requests, commit history with timestamps and authors, branches, stars, forks. Second, the real-world scenario: Stella had pushed code to a dev branch, Vercel showed a preview that had her changes, but the live site at fandom-trivia.com hadn't changed. She didn't understand why. Answer: the main branch — the one Vercel deploys from — didn't have those changes. She needed to open a pull request and merge. Third, white hat hacking intro: we did a picoCTF challenge involving command injection to show how shell operators (the semicolon vs the pipe) work in a hands-on, high-stakes way.",
    whyThisTopic:
      "Git is foundational. Without version control intuition, everything else is fragile. But abstract Git explanations don't stick — 'branch', 'merge', 'commit' are meaningless words without a concrete story. A real broken project (one Luna could see was broken, could reload in the browser and verify) is 100x more memorable than a tutorial. The CTF adds stakes and a win condition: she either captures the flag or she doesn't. That pressure makes the ';' vs '|' distinction actually meaningful.",
    lunaReaction:
      "The branch discrepancy between main and dev didn't trigger curiosity — she noticed the difference but didn't ask why. That was the diagnostic signal I needed. She can observe facts, but hasn't yet developed the reflex of treating anomalies as puzzles. The CTF flipped it: she was genuinely motivated to figure out why her first command didn't work. So curiosity is contextual right now — it kicks in when there's a clear win to chase.",
    parentLesson:
      "Noticing anomalies is a separate skill from fixing them. Before debugging, you need the instinct to pause and ask 'why is this different than expected?' We need to build that habit deliberately — maybe with a structured question: 'what did you expect vs what happened?' before every new result she sees.",
    nextWeekPreview:
      "More CTF. She got a taste of command injection and loved it. Next session: she leads the debugging process herself with less Gemini scaffolding. Also want to introduce branches hands-on — have her make a change on a dev branch and create her own pull request on a real project.",
  },
];

export function getLatestWayneWeek(): WayneWeek | undefined {
  return wayneWeeks.at(-1);
}

export function getWayneWeekByNumber(week: number): WayneWeek | undefined {
  return wayneWeeks.find(w => w.week === week);
}
