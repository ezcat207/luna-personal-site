export interface WayneInsight {
  id: number;
  date: string; // ISO format: YYYY-MM-DD
  title: string;
  subtitle?: string;
  summary: string;
  content: string[]; // Array of paragraphs for easier rendering
  keyTakeaways: string[];
  relatedResources?: { label: string; url: string }[];
  tags?: string[];
  imageUrl?: string; // For featured images like the architecture diagram
  images?: string[]; // Gallery: multiple images rendered in sequence
}

export const wayneInsights: WayneInsight[] = [
  {
    id: 1,
    date: '2026-05-05',
    title: 'I Spent $10,000 Learning What Really Matters in AI Workflows',
    subtitle: 'The hard part isn\'t the model—it\'s the organization',
    summary:
      'A month-long journey from chaos to structure: how I spent $10k discovering that AI productivity bottlenecks come from poor organization, not weak models. What started as trial-and-error experiments eventually converged with industry best practices from Anthropic and OpenAI.',
    content: [
      'Over the past month, I did something interesting.',
      'I didn\'t start by reading big tech articles or studying other people\'s methodologies. I started by operating on my own workflows—trying, colliding, spending money, seeing which organizational patterns worked, which made context increasingly messy, and which made AI look busy while drifting further from the goal.',
      'In the end, I spent about $10,000 to gradually develop a working intuition.',
      'I\'m increasingly convinced that with AI today, the real challenge isn\'t just whether the model is strong enough—it\'s whether you\'ve organized it well.',
      'Many people think they\'re "using AI," but what I\'ve discovered is closer to this: you\'re managing a digital team composed of different roles.',
      'My current practice increasingly resembles this structure:',
      'I handle overall goals, long-term judgment, and final decisions;',
      'There\'s a middle layer responsible for maintaining project state, advancing documentation, updating tasks, and tracking overall progress;',
      'The bottom layer only handles pushing forward within small, clear, bounded tasks—finishing one phase means clearing most context and starting fresh.',
      'The biggest impact of this shift was realizing for the first time:',
      'Most AI failures aren\'t because it can\'t do the task—',
      'It\'s because I didn\'t hand off the task properly.',
      'Once task boundaries blur, information starts distorting.',
      'What the top layer means as direction gets received as requirements by the middle, which might become self-interpretation by the time it reaches execution.',
      'If no one is specifically responsible for clarifying "what to see, what not to see, what success criteria are, and when to come back and ask when stuck"—the final output often looks like a lot was done, but nothing was actually done right.',
      'So I gradually shifted my focus from "how to write better prompts" to "how to design more stable information flows."',
      'I started caring more about layered memory, handoff protocols, who should retain long-term memory versus short-term memory, and exactly how much information to pass between layers.',
      'Interestingly, I didn\'t systematically read those articles first.',
      'I collided my way through my actual work—developing feel, costs, and methods piece by piece.',
      'But later when I looked back at some public agent articles from Anthropic and OpenAI, I realized many core ideas were actually converging toward similar directions: breaking complex tasks into orchestrator-worker structures, managing subtasks with clearer handoffs, keeping the manager in control while letting specialists execute within bounded scopes.',
      'Anthropic explicitly treats orchestrator-workers as a core pattern in their public writing, emphasizing that complex tasks become easier when broken apart so different agents can work within their own contexts.',
      'OpenAI also clearly distinguishes between handoffs and agents-as-tools, emphasizing that when a manager needs to maintain overall control, specialists should be invoked as bounded capabilities—not by releasing control entirely.',
      'When I went back to read this content, my strongest feeling wasn\'t "I learned something advanced"—it was something more grounded:',
      'Effective methods really do converge from different paths.',
      'You can enter from papers and articles first, or like me, you can force structure out from the chaos, waste, rework, and costs of real workflows.',
      'This also makes me more confident in something:',
      'The truly important capability in the AI era might not be knowing the most terminology—',
      'It\'s whether you can articulate goals clearly, separate roles clearly, transmit information clearly, and set checkpoints clearly.',
      'Models will continue to get stronger.',
      'Tools will continue to upgrade.',
      'But at least at my current stage, I\'m increasingly convinced that the productivity ceiling is often not capped by the model itself—it\'s capped by the organizational approach.',
      'If I had to summarize this month in one sentence:',
      'I\'m not looking for a smarter AI.',
      'I\'m learning how to build an AI organization that doesn\'t easily distort, doesn\'t easily lose control, and can continuously push forward.',
    ],
    keyTakeaways: [
      'AI productivity bottlenecks come from poor organization, not weak models',
      'Effective AI workflows use 3 layers: strategic (you), operational (state/docs), tactical (bounded tasks)',
      'Task handoffs matter more than prompt engineering—blur boundaries and information distorts',
      'Industry best practices (Anthropic\'s orchestrator-workers, OpenAI\'s handoffs) converge with real-world trial-and-error',
      'The key skill: articulate goals clearly, separate roles clearly, transmit information clearly, set checkpoints clearly',
    ],
    relatedResources: [
      {
        label: 'Anthropic: Building Effective Agents',
        url: 'https://www.anthropic.com/research/building-effective-agents',
      },
      {
        label: 'OpenAI: Agent Handoffs Pattern',
        url: 'https://platform.openai.com/docs/guides/agents',
      },
    ],
    tags: ['AI Workflows', 'Team Management', 'System Design', 'Meta-Learning'],
    imageUrl: '/images/ai-workflow-architecture.png', // We'll add the Excalidraw diagram here
  },
  {
    id: 2,
    date: '2026-05-06',
    title: 'From Scratch to Agentic AI: Luna\'s 3-Year Learning Journey',
    subtitle: 'How an 8-year-old built a genuine engineering foundation—one milestone at a time',
    summary:
      'Three years ago, Luna couldn\'t write a line of code. Today she ships agentic AI workflows, manages GitHub projects, and understands why computers think the way they do. This is the map we followed—and what every milestone actually taught her.',
    imageUrl: '/images/luna-growth-roadmap.png',
    content: [
      'I want to share something I\'ve been thinking about a lot lately: the map.',
      'Not the destination—the actual map of how an 8-year-old goes from "what\'s a variable?" to shipping real software products in three years.',
      'Because people always ask: "How do you teach a kid AI?" And I think they\'re asking the wrong question. You don\'t teach a kid AI. You build foundations, and AI is what happens when the foundations are solid.',

      '## Phase 1: Graphical Programming (2023)',

      'We started with Scratch. Not because it\'s "easy"—but because it makes the invisible visible.',
      'When Luna dragged a "move 10 steps" block and watched her sprite cross the screen, she wasn\'t playing a game. She was learning that computers execute instructions sequentially. That cause precedes effect. That the machine does exactly what you tell it—no more, no less.',
      'From Scratch, we moved to Micro:bit. Now code had physical consequences: LEDs lit up, motors turned, sensors responded. The abstract became tangible. Programming wasn\'t something that happened inside a screen—it was something that shaped the physical world.',
      'This phase sounds simple, but it builds the most important mental model: that you are giving instructions to a system that will follow them precisely. Everything else in engineering is a variation on this idea.',

      '## Phase 2: AI Prompting & Vibe Coding (2025)',

      'By 2025, the landscape had changed. AI coding tools weren\'t science fiction anymore—they were accessible to anyone willing to learn how to direct them. So we introduced a new kind of making: vibe coding.',
      'Luna\'s first experiments were on Lovable, a no-code AI builder. But the outputs were real, deployed products. She built a travel journal app—"Desert Wanderings," a December 2025 trip diary with entries, editing, and timeline organization. Then came Stella\'s Travel Adventures, a city exploration app she designed around a character named Stella.',
      'She also built a Roblox jumping game from scratch. If you\'ve watched a kid navigate Roblox Studio, you know it\'s not trivial—game physics, spawn points, obstacle design. Luna shipped it publicly.',
      'This is where something fundamental shifted. She stopped thinking "I can\'t make that because I don\'t know how to code it" and started thinking "what do I want to build next?" The constraint moved from technical skill to imagination and product judgment—which is exactly where it should be.',
      'AI Prompting isn\'t just talking to a chatbot. It\'s structured communication with a system that has capabilities and limitations. Knowing how to prompt well means knowing what you want clearly enough to express it—which turns out to be most of the work.',

      '## Phase 3: Agentic AI (2026 → Now)',

      'January 2026 marked the start of something different. Luna built FandomTrivia—a real web product with a real domain, real users, and real iterations. She didn\'t just use AI to generate it; she managed the product cycle: designed the concept, directed the build with AI help, tested with users, and shipped improvements.',
      'Then in April 2026, we deliberately escalated: Agentic AI. This isn\'t just prompting a model to answer a question. It\'s designing systems where AI takes sequences of actions, manages state across steps, and operates with increasing autonomy. The skill required isn\'t typing—it\'s thinking in systems.',
      'Luna is now learning GitHub Project Management: how to structure work, track progress, communicate across a team. She\'s building Business Foundations: understanding why products exist, who they serve, what makes something worth building.',
      'CS101 runs in parallel—not because she needs it to use AI tools, but because understanding how computers actually work changes how you think about what AI can and can\'t do. Terminal usage, front-end, back-end: the full stack of how software is built and delivered.',
      'And on the horizon: CTF (Capture the Flag) challenges. Security thinking. The adversarial perspective. Because understanding how systems can be broken is part of understanding how to build systems that hold.',

      '## What the Map Actually Teaches',

      'Looking back at three years, the pattern is clear: each phase didn\'t just add skills—it changed what Luna thought was possible.',
      'In 2023, "possible" meant making a sprite move on a screen. In 2025, "possible" meant shipping three real products with AI as a co-builder. In 2026, "possible" means designing systems that work even when she\'s not actively running them.',
      'This is what compounding learning looks like. Not linear progress—exponential leverage.',
      'The children who will thrive in the next decade aren\'t the ones who learned the most AI tools. They\'re the ones who built deep enough foundations that they can use any tool, evaluate any tool, and know when to put the tool down.',
      'Luna is eight years old. She has time. But we started early not to rush her—we started early to give the foundations time to settle before the real complexity arrives.',
      'The map exists. You just have to be willing to follow it.',
    ],
    keyTakeaways: [
      'Start with graphical programming (Scratch, Micro:bit) to build the mental model: computers follow instructions exactly',
      'AI Prompting is structured communication—knowing what you want clearly enough to express it is most of the work',
      'Phase a child from consumer → director → architect: each shift expands what they think is possible',
      'Agentic AI requires systems thinking, not just typing—teach GitHub, business fundamentals, and full-stack context',
      'Compounding learning is exponential: each foundation makes the next phase accessible faster',
    ],
    relatedResources: [
      {
        label: 'Desert Wanderings — Travel Journal App (2025)',
        url: 'https://journal-making.lovable.app',
      },
      {
        label: 'Stella\'s Travel Adventures — City Explorer App (2025)',
        url: 'https://stella-explores-cities.lovable.app',
      },
      {
        label: 'Jumping Game on Roblox (2025)',
        url: 'https://www.roblox.com/games/134287711519230/Jumping-Game',
      },
      {
        label: 'FandomTrivia — Luna\'s first owned product (2026)',
        url: 'https://www.fandom-trivia.com/',
      },
      {
        label: 'Luna\'s Learning Journal',
        url: 'https://luna.bunnyuniverse.com/',
      },
    ],
    tags: ['Learning Journey', 'Kids & AI', 'Curriculum Design', 'Agentic AI', 'Parenting'],
  },
  {
    id: 3,
    date: '2026-05-07',
    title: '买断工龄这件事，中国已经做过一次大实验了',
    subtitle: '4000万人的代价，美国科技业正在重走的路',
    summary:
      '微软宣布"自愿退休计划"，美国媒体称之为史无前例。但中国在1990年代末已经做过一次规模大得多的实验——4000万人，几乎没有缓冲，几乎没有准备。那次实验的结果，值得今天的每个职场人仔细阅读。',
    content: [
      '最近微软宣布：向美国员工提供"自愿退休计划"，条件是年龄加工龄之和达到70分。一个52岁、在微软干了18年的员工，恰好达线。预计影响约7%的美国员工，近9000人。',
      '很多人说：这是美国科技业的新事物。',
      '但对中国人来说，这剧本我们见过。',

      '## 1990年代的那场大实验',

      '1995年到2003年，中国以国企改革为名，推行了史上规模最大的一次有组织裁员。8年间，国有企业从11.8万家缩减到3.42万家，职工人数从1.126亿降到6880万——净减少约4400万人。',
      '高峰期的1998到2000年，每年有700到900万工人"下岗"。',
      '他们的离厂方式，叫"买断工龄"：用人单位一次性支付一笔钱，解除劳动关系，永久了结。东北地区，工龄一年对应约2000元；江浙一带，800到1000元。干了20年，也就拿到两三万。',
      '2009年沈阳的一项研究显示：随机访问的21个被买断工龄的工人，11人是被强制买断，6人是半强迫半自愿，只有4人是真正自愿的。',

      '## 那些人后来怎样了',

      '下岗工人平均年龄38.7岁。82%学历在高中及以下，几乎没有可迁移的市场化技能。',
      '57%的下岗家庭，收入减少超过50%。离婚率显著上升——经济压力加异地务工，婚姻先垮。吸烟率、饮酒率明显上升，健康状况持续恶化。犯罪率数据显示：下岗人口每增加10%，逮捕率约上升0.2%，且这个效应持续了近7年。',
      '他们去了哪里？摆摊、开小店、做保安保洁、外出打工。少数人用再就业贷款创了业，大部分人在城市底层做最低端的服务业。那个时代出现了一个专有名词："4050人员"——40到50岁的中年失业群体，被劳动力市场几乎完全边缘化。',

      '## 美国这次，有什么不同？',

      '表面上差别很大：微软的补偿金远比两万块多；美国有失业保险；科技工人有更高的储蓄底子。',
      '但核心困境是一样的：45岁以上，在就业市场里，你就是贬值资产。',
      '美国科技行业有公开的年龄歧视数据。招聘算法默认压缩简历时间窗口。招聘官看到20年经验，先想的不是"资历深"，而是"贵，而且可能跟不上AI"。',
      '微软这次的钱，可能是真诚的。但接下来跟风的公司，给的可能是半价的真诚，甚至更少。',

      '## 中国那次改革，有人买单了吗？',

      '有一个词，那代工人自己说的："时代的一粒灰，落在个人身上，就是一座山。"',
      '宏观数字里，这叫"结构性调整，阵痛期"。但4000万个具体的人，用了十年二十年，才慢慢重建了生活——或者没有重建。',
      '他们为中国的经济转型，支付了真实的代价。',

      '## 对今天的启示',

      '无论你在哪个行业，有一件事是确定的：组织不会为你的职业生涯负责，只有你自己会。',
      '这不是悲观，这是清醒。不要用工龄换安全感，用的是技能的持续更新。不要让收入全部依赖一个雇主，副业或资产配置是保险。45岁之前，你要想清楚：如果明天被买断，你的第二剧本是什么？',
      '"一人公司"不是被迫的退路，应该是提前演练好的选项。中国那批工人，没有时间准备。我们有。',
    ],
    keyTakeaways: [
      '中国1990年代买断工龄波及4400万人，是全球最大规模的有组织裁员实验',
      '57%下岗家庭收入减半，健康、婚姻、犯罪率的负面影响持续近7年',
      '"4050人员"困境：中年失业在任何时代都难以再就业，美国科技业不例外',
      '微软有诚意，但跟风者会给得更少——处理方式的先例比补偿金额更危险',
      '职业安全感来自可迁移技能和多元收入，而非工龄和忠诚度',
    ],
    relatedResources: [
      {
        label: 'Microsoft 自愿退休计划详情 — CNBC',
        url: 'https://www.cnbc.com/2026/04/23/microsoft-plans-first-voluntary-retirement-program-for-us-employees.html',
      },
      {
        label: '下岗潮历史回顾 — 维基百科',
        url: 'https://zh.wikipedia.org/zh-hans/%E4%B8%8B%E5%B2%97',
      },
      {
        label: '世纪之交的代价——下岗工人 — 知乎',
        url: 'https://zhuanlan.zhihu.com/p/588538816',
      },
    ],
    tags: ['职场转型', '历史复盘', '中文', '职业规划', 'AI冲击'],
  },
  {
    id: 4,
    date: '2026-05-07',
    title: "Microsoft's Buyout Is New for America. China Did This to 40 Million People.",
    subtitle: "What the 1990s Chinese downsizing wave can teach us about today's tech workforce crisis",
    summary:
      "When Microsoft announced its 'Rule of 70' voluntary buyout in April 2026, American media called it unprecedented. It isn't. China ran the same experiment at a scale almost incomprehensible by American standards between 1995 and 2003. The results are worth studying carefully.",
    content: [
      'When Microsoft announced its voluntary buyout program in April 2026—offering severance to employees whose age plus years of service equals 70 or more—American commentators called it unprecedented.',
      "It's not.",
      "China ran the same experiment—at a scale almost incomprehensible by American standards—between 1995 and 2003. The results are worth studying carefully, because the United States is now walking into territory China has already mapped.",

      '## What China Did',

      "As part of Zhu Rongji's sweeping state-owned enterprise reform, China systematically dismantled its guaranteed employment system. Between 1995 and 2003, state-owned enterprises shrank from 118,000 to 34,200. The state enterprise workforce collapsed from 112.6 million workers to 68.8 million. Net reduction: roughly 44 million people.",
      'At the peak years of 1998–2000, between 7 and 9 million workers were laid off per year.',
      'The mechanism was called 买断工龄 (mǎiduàn gōnglíng)—literally "buying out seniority." Workers received a one-time lump sum in exchange for permanent severance. The going rate: approximately $275 per year of service in China\'s industrial northeast. Work for 20 years, take home $5,500, and that\'s the end of your relationship with the organization that defined your adult life.',
      "Research from Shenyang in 2009 found that of 21 randomly selected workers who underwent this process, 11 had been forced into it, 6 were semi-coerced, and only 4 had genuinely volunteered.",

      '## What Happened to Those Workers',

      'The average displaced worker was 38.7 years old. 82% had a high school education or less. They had spent their careers inside protected institutions that provided not just income, but housing, healthcare, and social identity—China\'s "iron rice bowl" (铁饭碗).',
      'When the bowl shattered: 57% of displaced families saw income drop by more than 50%. Divorce rates spiked, driven by financial stress and couples separating to find work in different cities. Smoking and alcohol consumption rose significantly among displaced male workers. Crime data showed that a 10% increase in displaced worker population correlated with a 0.2% rise in arrests—and that effect persisted for nearly 7 years.',
      "Where did they end up? Street food vendors. Security guards. Cleaners. Factory workers in cities far from home. Some took government micro-loans to start tiny businesses. Many didn't.",
      'Chinese society developed a specific term for this cohort: "4050 workers"—those between 40 and 50, considered essentially unemployable in the reformed labor market.',

      "## Now Look at Microsoft's Offer",

      "The comparison isn't perfect, and it shouldn't be read as equivalent. Microsoft's offer is almost certainly worth hundreds of thousands of dollars for eligible employees. American workers have unemployment insurance. Tech workers, unlike Chinese factory workers of the 1990s, often carry significant savings and transferable skills.",
      'But the structural dynamic is identical: a large employer decides that workers over a certain age are no longer worth the cost of retaining, and offers them money to disappear quietly.',
      "Microsoft has done this with uncommon generosity. The companies that follow their lead may not be so careful. And they will follow. When a large organization finds a socially acceptable way to thin its older workforce, others watch and iterate. The next version will be cheaper. The version after that, cheaper still.",

      '## The Gap That Money Doesn\'t Bridge',

      "Here is what China's experience teaches that financial analysis misses: a 52-year-old tech worker who takes the Microsoft package is not simply changing jobs. They are changing who they are in the labor market. The longer they wait to re-enter, the more that identity calculates against them.",
      "Age discrimination in American tech is well-documented. Hiring algorithms deprioritize long tenures. Interviewers see '20 years of experience' and hear: expensive, possibly inflexible, probably behind on AI.",
      "China's displaced workers had no preparation time. They were productive insiders one month, statistical problems the next.",
      "American workers have something China's factory workers did not: a window to prepare.",

      "## What the Chinese Experience Actually Prescribes",

      "The lesson from 买断工龄 is not 'refuse buyouts' or 'demand more money.' It's simpler and harder: do not let any single organization hold your entire professional value.",
      "The workers who landed best after China's downsizing were the ones who had—by accident or foresight—built something portable: a skill that transferred, a customer relationship that was theirs, a small side business, a savings cushion.",
      "The workers who fell hardest were the ones who had traded 20 years of loyalty for the assumption that the institution would reciprocate. Institutions don't reciprocate. They optimize.",
      "Microsoft's buyout is generous. Your next employer's buyout, or your employer's buyout, might not be. The question worth asking now—not after the offer letter arrives—is: what's your second act, and is it already in progress?",
      'China ran this experiment. Forty million people paid for the data. The results are in.',
    ],
    keyTakeaways: [
      "China's 1990s 买断工龄 displaced ~44 million workers—the largest organized workforce reduction in modern history",
      '57% of displaced families saw income drop by 50%+; negative effects on health, marriage, and crime persisted for nearly 7 years',
      'The "4050 worker" problem: mid-career displacement is catastrophic in any era—and tech workers are not immune',
      'Microsoft set a PR template, not just a precedent; the companies that follow will give less with the same framing',
      'Career security comes from portable skills and diversified income—not tenure and loyalty',
    ],
    relatedResources: [
      {
        label: 'Microsoft Voluntary Buyout Details — CNBC',
        url: 'https://www.cnbc.com/2026/04/23/microsoft-plans-first-voluntary-retirement-program-for-us-employees.html',
      },
      {
        label: 'Why Companies Are Choosing Buyouts Over Layoffs — Fortune',
        url: 'https://fortune.com/2026/04/26/why-did-microsoft-do-buyouts-layoffs-tech-workers/',
      },
      {
        label: '下岗 (Xiagang) — Wikipedia',
        url: 'https://zh.wikipedia.org/wiki/%E4%B8%8B%E5%B2%97',
      },
    ],
    tags: ['Career Transition', 'History', 'Tech Industry', 'Workforce', 'AI Disruption'],
  },
  {
    id: 5,
    date: '2026-05-09',
    title: 'One Second to Teach Automation: A CTF Binary Reversing Session with Luna',
    subtitle: 'How a server-enforced 1-second timeout made an 8-year-old understand why scripts exist',
    summary:
      'Luna came into this session expecting to type answers at the keyboard. The picoCTF challenge had other ideas: dynamically generated ELF binaries delivered as hex streams, a 1-second response window, and expiring ports. By the end, she had written a working Python exploit from scratch and captured her first binary reversing flag. Here is exactly what happened and what it actually taught.',
    content: [
      'The challenge URL was from CyLab Academy. The actual server: mysterious-sea.picoctf.net. The mechanic: every time you connected, the server streamed a freshly generated ELF binary to your terminal as a continuous wall of hexadecimal characters, then asked a simple question — "What\'s the secret?" — and gave you one second to answer.',
      'One second. Not two. Not five. One.',
      'Luna\'s first instinct was completely logical: copy the hex, paste it somewhere, decode it, type the answer. This is how 8-year-olds approach problems. This is how most adults approach problems. It was also exactly wrong.',

      '## The Technical Architecture',

      'The binary the server generated was a small ELF executable. Inside its .text section — the machine code that the CPU runs — was a single instruction that held the secret: mov DWORD PTR [rbp-0x4], <secret_value>.',
      'In raw machine code, this instruction always starts with the same three bytes: c7 45 fc. In the hex stream, that appears as c745fc followed by exactly 8 hex characters (4 bytes) representing the secret integer in little-endian format. Little-endian means the least significant byte comes first — the computer\'s native byte order on x86-64.',
      'The server generated a new binary with a new secret value every connection. You could not reuse a previous answer. You could not look the flag up. You had to compute it, every time, faster than a human can read.',

      '## First Attempt: Just Read It',

      'We connected with nc and stared at the screen. The hex stream arrived — thousands of characters filling the terminal. Luna started trying to find the pattern visually. The server disconnected.',
      'Connection attempt two. Same result. At this point the lesson was already in progress, even if we hadn\'t named it: the problem is not unsolvable, but it is unsolvable by hand. The constraint is a design choice, not an accident. It exists specifically to force you toward automation.',

      '## Building solve.py: Line by Line',

      'We switched to writing a script. The structure Luna and Gemini built together: open a socket connection to the server, create a file-like interface for reading and writing, then loop — read chunks of incoming data into a buffer, check if the flag has already appeared (picoCTF{...} format), and if the server asks "What\'s the secret?", search the buffer for the c745fc opcode pattern.',
      'When the pattern is found, extract the next 8 hex characters. Convert them from little-endian bytes to a base-10 integer using struct.unpack(\'<I\', bytes.fromhex(...)). Send that integer back as a string followed by a newline. Clear the buffer. Repeat until the flag arrives.',
      'The critical insight: regex. We used the pattern c745fc([0-9a-f]{8}) to find the opcode and capture the 4-byte secret in one operation. Regular expressions are exact pattern matching — the computer equivalent of saying "find me this specific sequence anywhere in this wall of text, instantly."',

      '## The Mistakes That Taught the Most',

      'First mistake: manual hex decoding. Burned two connections before accepting the time constraint was real.',
      'Second mistake: the ports. The challenge instances expire. A port that was valid ten minutes ago throws ConnectionRefusedError now. Gemini kept reusing stale port numbers from earlier in the session. Luna had to intervene — she recognized the error message, pulled up the challenge page, found the current port, and updated the script. This is debugging. Not "the script is broken." The environment changed.',
      'Third mistake: running python3 solve.py while still inside the challenge binary\'s prompt. The binary treated "python3 solve.py" as a literal answer to "What\'s the secret?" and rejected it. The lesson: there are layers. The shell, the binary, the script — you need to know which layer is currently listening to you.',

      '## When It Clicked',

      'The script connected, buffered the stream, found c745fc in 40 milliseconds, unpacked the little-endian integer, sent it back, and the server responded: FLAG: picoCTF{bytemancy_0_...}.',
      'Luna\'s reaction was one word: "Finally." Then immediately: "Can we make it faster?"',
      'That question — not "what does this mean?" but "can we optimize it?" — is the moment a learner becomes a builder.',

      '## What This Actually Teaches',

      'Binary reversing sounds intimidating. In practice, this challenge taught four things: hex is just a number encoding; machine code has recognizable patterns you can grep for; automation is not optional when the human is the slow component; and debugging is not failure — it is the process.',
      'The picoCTF "bytemancy" category name is perfect. Byte-mancy: divination through bytes. Reading the computer\'s intentions from its native language. Luna can now look at c745fc and know something is stored nearby. That is a genuine capability, not a vocabulary word.',
      'We will build on this. CTF challenges are ideal for children because the feedback is immediate and unambiguous: you have the flag or you don\'t. There is no partial credit, no rubric, no interpretation. The computer either accepted your answer in time or it didn\'t. This kind of clarity is rare in education and invaluable in engineering.',
    ],
    keyTakeaways: [
      'The 1-second time constraint was the lesson: some problems are designed to be unsolvable by hand — automation is the intended solution',
      'The key pattern: opcode c745fc (mov [rbp-0x4]) always precedes the secret value in this binary structure — a grep-able fingerprint in machine code',
      'struct.unpack(\'<I\', ...) converts little-endian hex bytes to a Python integer — the CPU\'s native byte order on x86-64',
      'Port expiration errors are environment bugs, not code bugs — recognizing which layer is failing is a core debugging skill',
      'When a child asks "can we make it faster?" after solving something, the session worked',
    ],
    relatedResources: [
      {
        label: "Luna's take on this session — her diary entry",
        url: 'https://luna.bunnyuniverse.com/luna/2',
      },
      {
        label: 'CyLab Academy — Challenge Library',
        url: 'https://learn.cylabacademy.org/library/754',
      },
      {
        label: 'picoCTF — Competitive CTF Platform for Beginners',
        url: 'https://picoctf.org',
      },
    ],
    tags: ['CTF', 'Security', 'Binary Reversing', 'Automation', 'Kids & AI'],
  },
  {
    id: 6,
    date: '2026-05-10',
    title: 'Two CTFs, Two Lessons: File Forensics and Infrastructure Attacks',
    subtitle: "Why 'never trust the filename' and 'concurrency beats sequence' are the same insight wearing different clothes",
    summary:
      'May 10 was a double-header: a file forensics challenge about fragment reassembly and extension deception, followed by an infrastructure attack requiring concurrent request flooding to trigger an HAProxy failover. Both challenges shared a single underlying lesson — read the environment before you attack.',
    content: [
      'Two challenges in one afternoon. Different mechanics, different domains, same root principle. This is the kind of day that accelerates learning faster than any curriculum.',

      '## Challenge 1: Piece by Piece',

      'The setup: SSH into a remote server, navigate the filesystem, and extract a flag hidden inside a password-protected archive. Simple in description, layered in execution.',
      'The first obstacle was SSH syntax. The connection required ssh -p [port] ctf-player@dolphin-cove.picoctf.net with the -p flag explicitly. Common mistakes Luna hit immediately: uppercase SSH (the shell is case-sensitive), using host:port notation instead of the -p flag, and forgetting that the host key verification prompt requires typing yes before any password prompt appears. These are not logic errors — they are syntax errors. The computer does exactly what you say, not what you mean.',
      'Once connected, the flag was inside a zip archive. But the archive had been split into five fragments: part_aa, part_ab, part_ac, part_ad, part_ae. The reassembly command: cat part_* > combined.zip. The glob wildcard sorts alphabetically, so the fragments concatenate in the correct order. This is a real technique — large files are split for transfer and must be reassembled on receipt.',
      'Here is where it gets interesting. The reassembled file had a .tar.gz extension. The natural instinct is to run tar -xvzf combined.zip. This fails. The file command reveals why: the actual magic bytes inside the file identify it as a Zip archive, not a Gzip tarball. The filename lied. unzip combined.zip succeeds immediately.',
      'The password was not the SSH login password — a common assumption that leads to an infinite unzip prompt loop. It was stored in instructions.txt on the server. Alternatively, the strings command strips printable characters from the binary, often exposing embedded passwords. The lesson: the environment contains the information you need. Read it before attacking.',

      '## Challenge 2: Failure Failure',

      'The second challenge required infrastructure thinking rather than application thinking. The target was an HAProxy load balancer sitting in front of two Flask servers. The flag was exclusively on the backup server (s2), which only received traffic when the primary server (s1) was marked DOWN by HAProxy.',
      'The application code contained a deliberate trap: the rate limiter (300 requests per minute, globally keyed — not per-IP) was configured to return 503 Service Unavailable when the limit was hit, instead of the standard 429 Too Many Requests. This matters because HAProxy was configured with http-check expect status 200. Any non-200 response from s1 counts as a failed health check.',
      'HAProxy was set to inter 2s fall 2 — check every 2 seconds, mark DOWN after 2 consecutive failures. This means the attack window requires exhausting the 300-request limit within 60 seconds and then sustaining the failure state long enough for two health checks to register.',
      'The solution: concurrent flooding. Luna used a Python script with ThreadPoolExecutor at 50 workers, sending 400 requests simultaneously. Why concurrent? Because sequential requests — one after another — cannot breach a per-minute limit fast enough if the window resets between requests. Concurrency compresses 400 requests into seconds, not minutes. The primary server hits its ceiling, starts returning 503s, HAProxy sees two consecutive failures, marks s1 DOWN, and routes all subsequent traffic to s2.',
      'The Wayne Gemini analysis added an elegant one-liner alternative: for i in {1..330}; do curl -s -o /dev/null URL & done; sleep 5; curl -s URL. The & operator backgrounds each curl, creating a concurrent burst from a shell loop. The sleep 5 provides the exact window for HAProxy to complete its fall 2 cycle. The final curl retrieves from s2.',
      'A critical detail: Flask-Limiter defaults to in-memory storage per process. If s1 and s2 shared a Redis instance for rate tracking, exhausting s1 would also lock s2. The challenge was designed around this isolation.',

      '## The Connecting Thread',

      'Both challenges reward the same behavior: read the environment before you act. In Piece by Piece, the password was in instructions.txt and the file type was in the magic bytes — both visible without attacking anything. In Failure Failure, the HAProxy configuration file was provided in the challenge materials. Reading inter 2s fall 2 immediately tells you the timing window. The attack follows from the config.',
      'This is an important pattern to establish early. CTF challenges are designed to teach that reconnaissance precedes exploitation. The information needed to solve the problem is almost always already present — in a config file, an environment variable, a strings output, or the structure of the filesystem itself.',

      '## Bonus: The Competition',

      'After the CTF session, a competition. Final standings: Stella and Mom tied for first ($15 prize each). Dad placed third.',
      'For the record: third place in a competition where you designed the curriculum is a perfectly acceptable outcome. Luna will remember that Stella and Mom beat Dad. That is an excellent motivator for the next session.',
    ],
    keyTakeaways: [
      'SSH syntax is exact: lowercase ssh, -p for port, not colon notation — the shell does what you say, not what you mean',
      'cat part_* > combined.zip reassembles split archives; glob sorts alphabetically, preserving correct order',
      'Never trust the filename: use the file command to check magic bytes — .tar.gz can secretly be a zip',
      'HAProxy failover requires concurrent flooding: sequential requests cannot breach a per-minute limit fast enough before the window resets',
      'Both challenges: read the environment first (instructions.txt, HAProxy config) — the solution is always already present',
    ],
    relatedResources: [
      {
        label: "Luna's diary entry for May 10",
        url: 'https://luna.bunnyuniverse.com/luna/3',
      },
      {
        label: 'CyLab Academy — Piece by Piece (Flag 1)',
        url: 'https://learn.cylabacademy.org/library/740',
      },
      {
        label: 'CyLab Academy — Failure Failure (Flag 2)',
        url: 'https://learn.cylabacademy.org/library/756',
      },
      {
        label: 'Competition Results — who actually won →',
        url: 'https://wayne.bunnyuniverse.com/wayne/insights/7',
      },
    ],
    tags: ['CTF', 'Security', 'Linux', 'Infrastructure', 'Kids & AI'],
  },
  {
    id: 7,
    date: '2026-05-10',
    title: 'CTF Competition Results: Luna & Old Fish Take 1st, Dad Gets Third',
    subtitle: 'The scorecard nobody asked for but everyone needed to see',
    summary:
      'After two CTF flags in one afternoon, we held an internal family competition. Final standings: Rabbit (Luna) and Old Fish (AI) — joint first place. Cat (Wayne/Dad) — third place. This post exists entirely to document that outcome with appropriate dignity.',
    images: [
      '/images/competition-0510-1.jpeg',
      '/images/competition-0510-2.jpeg',
    ],
    content: [
      'The competition was held immediately after the two-flag CTF session on May 10, 2026.',
      'Three competitors. Two challenges. One scoreboard.',

      '## Final Standings',

      '1st Place (Joint): Luna + Old Fish (AI/Gemini). Prize: $15 each.',
      '3rd Place: Wayne (Dad). Prize: the satisfaction of having designed the curriculum that produced these results.',

      '## The Case for Third Place',

      'There is a specific kind of loss that is actually a win. When the person who built the learning system gets outperformed by the person who learned from it, that is the system working correctly.',
      'Luna came into today not knowing what SSH was. She left with two flags, a working exploit script, and a first-place finish against the person who taught her. Old Fish (our AI collaborator) handled the technical translation throughout — converting concepts to commands, errors to explanations, confusion to clarity.',
      'Dad got third. Dad is fine. Dad is, in fact, very proud.',

      '## What Actually Happened',

      'Luna\'s approach to both challenges was direct and un-intimidated. When SSH syntax failed, she corrected it without asking for help. When the zip file had the wrong extension, she tried the alternative. When the flooding script needed a port update, she found the new port and updated it herself.',
      'The AI (Old Fish) was a consistent presence throughout — answering questions, catching errors, suggesting next steps. This is the collaboration model we have been building toward: human judgment and direction, AI speed and recall, working together as a unit.',
      'First place is a reasonable outcome for that team.',
    ],
    keyTakeaways: [
      'Luna + AI (Old Fish) scored 1st place in the family CTF competition — $15 prize each',
      'Wayne placed 3rd — which is the correct result when your student outperforms you',
      'The collaboration model (human judgment + AI speed) is working as designed',
    ],
    relatedResources: [
      {
        label: "Luna's diary entry for May 10 →",
        url: 'https://luna.bunnyuniverse.com/luna/3',
      },
      {
        label: "Full CTF breakdown: two challenges, two lessons →",
        url: 'https://wayne.bunnyuniverse.com/wayne/insights/6',
      },
    ],
    tags: ['CTF', 'Competition', 'Family', 'Kids & AI'],
  },
  {
    id: 8,
    date: '2026-05-12',
    title: 'The Daily Prophet Method: Teaching HTML, CSS, and JavaScript Through Harry Potter\'s Magical Newspaper',
    subtitle: 'If you can explain why the photos move, you can explain the entire web stack',
    summary:
      'Most kids hit a wall when you say "HTML is markup, CSS is styling, JavaScript is behavior." Nobody\'s eyes light up at that sentence. But say "here\'s why the photos in the Daily Prophet move" — and an 8-year-old who\'s read Harry Potter six times leans forward. This is how we used wizarding journalism to explain the three languages of the web, and why the metaphor holds up technically, not just narratively.',
    content: [
      'The Daily Prophet is the best web development textbook ever accidentally written.',
      'If you\'ve read Harry Potter, you know the newspaper. Front page headlines. Opinion columns. Classified ads. And photographs — moving photographs. Wizards in black-and-white newsprint, waving at the reader, ducking out of frame, occasionally shouting.',
      'Every time I looked at that detail in the books, I thought: that\'s a perfect description of how the web works. Static content that has been animated by something underneath it.',
      'So that\'s where we started.',

      '## HTML: The Newspaper Itself',

      'HTML is the Prophet\'s content and structure. Nothing more.',
      'A newspaper has headlines — big text at the top, announcing what matters most. It has bylines — smaller text, author and date. It has columns — the body of the story, flowing in organized blocks. It has photographs — rectangles of visual content placed within the text. It has advertisements — boxes cordoned off from the editorial content.',
      'None of that is design. None of it is behavior. It\'s just structure: what exists, and in what order.',
      'HTML works the same way. <h1> is the headline. <p> is a paragraph of column text. <img> is a photograph. <div> is a named section — "this is the front page," "this is the classified ads section." You\'re not describing how anything looks. You\'re describing what exists and how it\'s organized.',
      'Luna grasped this immediately when I framed it this way: "If you printed out a webpage and the ink was black and white with no design at all — just the words and images in order — that\'s the HTML." She nodded. That\'s Muggle journalism. Functional. Readable. No magic.',

      '## CSS: The Prophet\'s Visual Identity',

      'The Daily Prophet doesn\'t look like just any newspaper. It has a specific aesthetic — slightly gothic serif fonts, dense column layouts, dramatic headlines that lean into the horror of whatever Voldemort did this week. The obituary section has a particular visual weight. The Quidditch scores use a different column width than front-page news.',
      'All of that is CSS.',
      'CSS is a set of rules that says: every headline on this page should be in this font, at this size, in this color. Every photograph should have a thin black border and sit to the right of the column text. The front page should use a three-column layout; the classified ads should run in six narrow columns at the bottom.',
      'CSS doesn\'t add new content. It doesn\'t make anything happen. It only describes how the existing content should look.',
      'The practical implication: you can take the exact same HTML — the same structure — and apply two completely different CSS stylesheets. One makes it look like the Daily Prophet. One makes it look like the New York Times. The content is identical. The presentation is entirely controlled by CSS.',
      'This is a concept most adults haven\'t consciously grasped even after years of using the web. Luna got it in about four minutes because she already understood that the Prophet and the Times are both newspapers — same category, completely different look.',

      '## JavaScript: Why the Photos Move',

      'Here\'s where it gets interesting.',
      'In Muggle newspapers, photographs are frozen. A moment in time, chemically fixed to paper, never changing. You can look at the photo for an hour and the subject won\'t blink.',
      'In the Daily Prophet, something is different. The photos are alive. The subjects move, react, leave the frame, come back. A photograph of Minister Fudge will show him nervously adjusting his bowler hat. A Quidditch action shot will loop through the save, over and over.',
      'That\'s JavaScript.',
      'JavaScript is the layer that takes a static page and makes things happen over time. It runs continuously while the page is open. It can watch for events — a reader hovering over a photo, a new edition arriving — and respond to them. It can update the content of the page without reloading it. It can animate elements.',
      'Without JavaScript, the Daily Prophet\'s photos are stuck. The structure (HTML) is there. The design (CSS) is applied. But there\'s no behavior — nothing that watches, responds, or changes.',
      'JavaScript is the magic. It\'s the spell that makes the ink move.',
      'I asked Luna: "What spell do you think makes a Prophet photo move?" She thought for a second and said "Animatus?" (making up a spell, which is exactly right — that\'s what programming is, naming operations that didn\'t exist before). I said: in JavaScript, you\'d write something like photo.animate(). You\'re telling the photo: start moving. The browser — the magical enforcement mechanism — runs that instruction continuously.',

      '## The Hands-On Part',

      'After the metaphor, we built a tiny "Daily Prophet" in the browser using just HTML and CSS. A fake front page with a headline, a byline, a two-column layout, and an image placeholder.',
      'Then we added JavaScript. Just one thing: made the image slowly pulse — scaling up by 5% and back down, every two seconds, in a loop. The "photo" was alive.',
      'Luna\'s reaction when she saw it loop: "Oh. So the page is just... running? While we\'re looking at it?"',
      'Yes. Exactly. JavaScript doesn\'t execute once and stop. It runs in the background, continuously, like a spell that sustains itself. The browser is the wand.',
      'That framing — JavaScript as a continuous spell, not a one-time instruction — is the most important conceptual shift for beginners. Once she had that, the rest of the session flowed naturally.',

      '## Why This Metaphor Works Technically',

      'The reason the Daily Prophet analogy holds up is because it accidentally maps to a real separation in web architecture.',
      'HTML is a document format. It describes content declaratively — here is a heading, here is a paragraph, here is an image. It doesn\'t describe appearance or behavior.',
      'CSS is a presentation layer. Its rules apply to elements selected by type, class, or position, and describe only visual properties. It has no state, no memory, no behavior.',
      'JavaScript is a programming language. It has state, it executes over time, it responds to events, it can modify the HTML and CSS while the page is running. It\'s the only one of the three that actually does things.',
      'This separation isn\'t incidental — it\'s a design principle. You\'re supposed to keep structure, presentation, and behavior in separate layers. When they get tangled together, pages become fragile and hard to maintain. When they\'re clean, one layer can change without breaking the others.',
      'The Daily Prophet has clean separation: the events of the wizarding world (content), the Prophet\'s visual identity (design), and the magic that animates it (behavior). Same architecture.',

      '## For Parents Trying This',

      'Start with a real copy of a newspaper, physical or on screen. Point at specific elements — headline, byline, photo, caption, column — and give each one its HTML tag name. Then change fonts and colors with CSS in the browser\'s developer tools (right-click → inspect on any webpage). Then add a single JavaScript animation. Don\'t explain what the code means line by line — explain what it does. The code is the spell. The browser is the magic enforcing it.',
      'Most kids will ask "but how does JavaScript actually make things move?" before you\'ve explained it. That question — the curiosity arriving before the explanation — is the signal you want. Answer it by showing, not by telling.',
      'The Daily Prophet photographs move because someone cast a spell. The spell runs continuously while you\'re looking at the page. JavaScript is that spell. You\'re the wizard now.',
    ],
    keyTakeaways: [
      'HTML = the newspaper\'s structure: what exists and in what order. No design, no behavior — just content organized into named sections',
      'CSS = the Prophet\'s visual identity: fonts, colors, column layouts, borders. Same HTML, different CSS → completely different newspaper',
      'JavaScript = the magic that makes photos move: it runs continuously, watches for events, and can change HTML and CSS while the page is open',
      'The three-layer separation (structure / presentation / behavior) is a real architectural principle, not just a teaching device',
      'Lead with "why do the photos move?" — curiosity that arrives before the explanation is the signal that learning is happening',
    ],
    relatedResources: [
      {
        label: 'MDN Web Docs: Getting started with the web (HTML, CSS, JS intro)',
        url: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Your_first_website',
      },
      {
        label: 'CodePen — browser sandbox for building pages live',
        url: 'https://codepen.io',
      },
      {
        label: 'CS Unplugged — offline activities for computing concepts',
        url: 'https://csunplugged.org',
      },
    ],
    tags: ['Teaching', 'HTML/CSS/JS', 'Kids & AI', 'Curriculum Design', 'Harry Potter'],
  },
];

export function getLatestWayneInsight(): WayneInsight | undefined {
  return wayneInsights.at(-1);
}

export function getWayneInsightById(id: number): WayneInsight | undefined {
  return wayneInsights.find(i => i.id === id);
}
