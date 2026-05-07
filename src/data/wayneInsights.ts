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
];

export function getLatestWayneInsight(): WayneInsight | undefined {
  return wayneInsights.at(-1);
}

export function getWayneInsightById(id: number): WayneInsight | undefined {
  return wayneInsights.find(i => i.id === id);
}
