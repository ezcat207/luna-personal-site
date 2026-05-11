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
  companion?: { label: string; url: string }; // cross-link to Wayne's paired post
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
  {
    week: 2,
    date: '2026-05-09',
    title: 'I Beat a 1-Second Computer Challenge! (Binary CTF)',
    summary:
      "The server was sending us a scrambled secret message in computer code, and we had to decode it AND send the answer back in under one second. A human could never do that — so we made a robot do it for us.",
    whatILearned:
      "Hex is just another way computers write numbers. Instead of 0-9, computers use 0-9 AND A-F, so 'FF' means 255. The server sent us a whole program written in hex, and hidden inside that program was a secret number. We couldn't read it by hand because the server would disconnect us after 1 second! That's when I learned: some problems exist specifically to teach you that automation is necessary. Computers can read and respond in milliseconds. Humans can't. When the time limit is 1 second, the lesson is: stop trying to be the fast part.",
    whatIMade:
      "We wrote solve.py — a Python script that automatically connected to the server, grabbed all the hex code, found the secret pattern (c745fc followed by 8 hex characters), converted those hex characters from computer-format to a regular number, and sent the answer back — all before the 1-second timer ran out! And it worked! The flag appeared on screen: picoCTF solved! 🏆",
    hardestPart:
      "Gemini (our AI helper) kept forgetting the port number! The challenge servers use expiring ports like 57056 or 58790, and every time we reconnected, the port was different. We got 'ConnectionRefusedError' over and over. I had to keep telling Gemini the right port. Also at the very start, we thought we could just copy the hex code by hand and decode it ourselves — but the server closed the connection before we could even finish copying one line.",
    coolestThing:
      "The moment solve.py actually worked and printed 'FLAG: picoCTF{...}' to the screen! Also Dad explained what 'c745fc' means — it's a secret instruction written in the computer's own language that says 'store this value right here.' We used that pattern like a treasure map: wherever we see c745fc, the next 8 characters are the secret. It's like reading the computer's mind.",
    stats: {
      practiceCount: 4,
      worksCompleted: 1,
      newSkills: [
        'Hexadecimal Decoding',
        'Socket Programming',
        'Binary Reverse Engineering',
        'Python Automation',
      ],
    },
    companion: {
      label: "Dad's full technical breakdown →",
      url: 'https://wayne.bunnyuniverse.com/wayne/insights/5',
    },
  },
  {
    week: 3,
    date: '2026-05-10',
    title: 'Two Flags in One Day! (Plus a Competition)',
    summary:
      "We hacked into a server with broken-up files, then flooded another server until it surrendered and gave us the flag. Oh — and we had a competition. Stella and Mom tied for first place. Dad got third.",
    whatILearned:
      "SSH is how you log into a computer over the internet — but the command has to be EXACTLY right. Uppercase SSH doesn't work. You can't use a colon before the port number, you need -p. For the first challenge, zip files can be split into pieces like a puzzle — you have to join all the pieces back together before you can open it. And here's a sneaky trick: the file was named .tar.gz but it was secretly a zip file inside! For the second challenge — computers that are too busy will give up and switch to a backup. We made the main server SO busy that it gave up, and then the backup server, which had the flag, had to take over!",
    whatIMade:
      "Two flags in one session! Flag 1 (Piece by Piece): SSH'd into the server, found five puzzle pieces (part_aa through part_ae), joined them into one file with cat part_* > combined.zip, unzipped it using the password 'supersecret' that was hidden in instructions.txt, and read flag.txt. Flag 2 (Failure Failure): wrote solve.py using 50 threads to send 400 requests all at once, overwhelmed the main server until it said 503 (overloaded!), the traffic manager saw that and switched everything to the backup server — and that's where the flag was.",
    hardestPart:
      "SSH syntax was really confusing at first — I typed SSH in uppercase, used a colon before the port instead of -p, and got connection errors every time. It turns out computers are very strict about lowercase commands and exact flag formats. Also for the zip file, if you just looked at the filename you'd think it was a .tar.gz file and use the wrong command. The trick is to use the file command to see what's ACTUALLY inside instead of trusting the name.",
    coolestThing:
      "The flooding attack felt like a heist movie! We sent 400 requests almost at the exact same time using 50 threads, the main server got so overwhelmed it started sending 503 errors (that means 'I'm broken!'), the load balancer saw those errors and thought the server crashed, so it switched ALL the traffic to the backup — and that's where the flag was hiding. We didn't find a secret door, we made the security system think there was an emergency and redirect itself!",
    stats: {
      practiceCount: 4,
      worksCompleted: 2,
      newSkills: [
        'SSH Remote Login',
        'File Fragment Assembly (cat part_*)',
        'Magic Bytes vs Filename (file command)',
        'Load Balancer Failover Exploitation',
      ],
    },
    companion: {
      label: "Dad's technical breakdown →",
      url: 'https://wayne.bunnyuniverse.com/wayne/insights/6',
    },
  },
];

export function getLatestLunaWeek(): LunaWeek | undefined {
  return lunaWeeks.at(-1);
}

export function getLunaWeekByNumber(week: number): LunaWeek | undefined {
  return lunaWeeks.find(w => w.week === week);
}
