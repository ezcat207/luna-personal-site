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
