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
];

export function getLatestWayneInsight(): WayneInsight | undefined {
  return wayneInsights.at(-1);
}

export function getWayneInsightById(id: number): WayneInsight | undefined {
  return wayneInsights.find(i => i.id === id);
}
