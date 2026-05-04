export interface LunaWeek {
  week: number;
  date: string; // ISO format: YYYY-MM-DD (Sunday publish date)
  title: string;
  summary: string;
  whatILearned: string;
  whatIMade: string;
  hardestPart: string;
  coolestThing: string;
  stats: {
    practiceCount: number;
    worksCompleted: number;
    newSkills: string[]; // multiple skills per week
  };
  images?: string[]; // asset paths
}

export const lunaWeeks: LunaWeek[] = [
  {
    week: 1,
    date: '2026-05-04',
    title: 'I Found a Secret Flag! (And Learned Git vs GitHub)',
    summary:
      "Dad taught me the difference between Git and GitHub using a real broken website. Then I hacked into a fake server (with permission!) and captured my first CTF flag ever.",
    whatILearned:
      "GitHub and Git are two different things! GitHub is like a laboratory. Git is a tool. GitHub doesn't only include the tool Git — it also has Issues (for tracking bugs), Pull Requests (for merging code), the actual code, commits, and even projects. There are also stars and forks, and they all help you make good projects. Every commit shows who did it and when, plus a code name (basically the name of the commit) that helps you track changes. Even better: if you made a commit changing A to B and want to change it back, you just click the three dots and promote the old commit back to the main branch!",
    whatIMade:
      "I solved my first ever CTF (Capture The Flag) challenge! It was called a command injection challenge. The server said 'we only allow 8.8.8.8' — but I figured out how to sneak in a second command using a semicolon (;). First I typed 8.8.8.8 | ls to see the files in the directory. Then I typed 8.8.8.8; cat flag.txt to read the secret file. And it worked! The flag was: picoCTF{p1nG_c0mm@nd_3xpL0iT_su33EssFuL_8555bda7} 🏆",
    hardestPart:
      "At first I tried cat flag.txt by itself but the server blocked it. I had to sneak in the second command after the allowed ping command. I also mixed up semicolon (;) and pipe (|) at the beginning. Semicolons run two commands one after the other — Command A finishes, then Command B runs no matter what. Pipes (|) are different — they take the output of Command A and feed it INTO Command B as input. Like: ls | grep 'flag' would give grep the list of files to search through.",
    coolestThing:
      "I used Gemini to help me think through the CTF. And I discovered something funny: I added 'please' to my command to be polite to the server... and it gave me the EXACT SAME answer as when I wasn't polite. Dad said that's actually an important thing to understand about how computers work — they don't care about manners, only about syntax!",
    stats: {
      practiceCount: 2,
      worksCompleted: 1,
      newSkills: [
        'Git & GitHub Basics',
        'White Hat Hacking: Command Injection',
        'Bash: Semicolon vs Pipe Operators',
      ],
    },
  },
];

export function getLatestLunaWeek(): LunaWeek | undefined {
  return lunaWeeks.at(-1);
}

export function getLunaWeekByNumber(week: number): LunaWeek | undefined {
  return lunaWeeks.find(w => w.week === week);
}
