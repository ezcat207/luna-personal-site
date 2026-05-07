import { useState } from 'react';
import { ExternalLink, BookOpen, Route, Code, Gamepad2, BrainCircuit, ArrowRight, CheckCircle2, AlertCircle, GitBranch, RotateCcw, Languages, Terminal, Briefcase, Globe } from 'lucide-react';
import { RoadmapSEO } from '../../components/SEOHead';

// --- 多语言数据字典 ---
const DICTIONARY = {
  zh: {
    header: {
      title: "AI 时代少儿编程路线图",
      subtitle: "工具边界测试与能力演进观察日志",
      tabDecision: "工具决策树",
      tabMatrix: "条件矩阵",
      tabJourney: "Luna 的成长"
    },
    intro: "本记录提取自实际辅导过程。未采用固定课程框架，而是将编程学习视为控制论与系统工程的启蒙。核心不在于语法记忆，而在于确立：抽象逻辑映射、Debug排错权限机制、以及强AI模型下的上下文(Context)管理能力。可根据不同阶段的前置条件选择工具验证。",
    footer: "构建原则：高标准、模块化、交付型导向。",
    ui: {
      stageFocus: "阶段特征：",
      keyActions: "关键操作",
      resultAnchor: "结果锚点",
      matchPrereq: "匹配前提",
      applicableScenario: "适用场景",
      prereqAndRisk: "前提条件与风险",
      visit: "访问",
      restartTest: "重新测试",
      backToPrev: "返回上一层变量",
      matchResult: "匹配结果",
      decisionTitle: "工具路径决策树",
      decisionDesc: "通过变量评估，定位当前阶段最匹配的工具层级",
      matrixTitle: "资源清单与条件矩阵",
      journeyTitle: "Luna 的成长历程与里程碑记录",
      targetGroup: "适合人群 / 场景"
    },
    stages: [
      {
        id: 1,
        period: "2025.03 - 2025.05",
        title: "基础编程与AI初探",
        focus: "语法实体认知与AI辅助黑盒",
        actions: ["Luna 通过 Codedex 接触了 Python 基础（变量/循环）", "Luna 使用 Trae/Cursor 尝试跑通 Snake 等小游戏"],
        result: "Luna 建立起了初期的代码直觉，但在多函数联合调用上还有一点小小的认知摩擦。",
        icon: <Code className="w-6 h-6 text-blue-500" />
      },
      {
        id: 2,
        period: "2025.05 - 2025.06",
        title: "图形化与代码逻辑过渡",
        focus: "抽象思维的跨平台映射",
        actions: ["Luna 完成了 Micro:bit 图形化编程实践", "Luna 会对比 Code.org 中的事件(Event)与坐标系了"],
        result: "Luna 成功弄懂了图形化里的 forever 原来就是 Python 里的 while true！",
        icon: <BookOpen className="w-6 h-6 text-green-500" />
      },
      {
        id: 3,
        period: "2025.07 - 2025.08",
        title: "AI工具流与 Vibe Coding",
        focus: "交互范式转移：从指令到语境管理",
        actions: ["Luna 了解了 Transformer 的基础机制", "Luna 自己设计并用 Lovable 做了个旅游网站页面"],
        result: "Luna 开始喜欢基于 Prompt 来安排结构，而不是死记硬背枯燥的语法。",
        icon: <BrainCircuit className="w-6 h-6 text-purple-500" />
      },
      {
        id: 4,
        period: "2025.09 - 2025.11",
        title: "引入3D引擎与自驱力爆发",
        focus: "系统调试(Debug)权限白盒化",
        actions: ["Luna 自己啃下了满是英文的 Roblox 视频教程", "Luna 学会了用 who/explain/fix 框架去独立求助 AI 排错！"],
        result: "Luna 在可视化的 3D 世界里爆发了极强的自驱力哦。",
        icon: <Gamepad2 className="w-6 h-6 text-orange-500" />
      },
      {
        id: 5,
        period: "2025.12 - 2026.01",
        title: "全链路实战与架构思维",
        focus: "系统集成与 Context 增强",
        actions: ["Luna 参加了 One week one project 计划：做了AI建筑师", "Luna 开始听斯坦福 CS146S 现代编程课啦", "Luna 尝试用 NotebookLM 消化了许多多模态资料"],
        result: "Luna 能够把脑子里的知识点拼凑成完整的功能模块和上下文了。",
        icon: <Route className="w-6 h-6 text-red-500" />
      },
      {
        id: 6,
        period: "2026 Q1",
        title: "理论架构与启蒙期",
        focus: "从 Coder 到 Architect 的思维跃迁",
        actions: ["Luna 开始接触一点 AI Architecture (算法架构)", "Luna 定下了 80%理论 + 20%实践的学习路线", "Luna 正在保持自己的节奏（Self-Paced）稳步探索"],
        result: "Luna 立志要“成为自发光的星”，开始掌握大局观念，不再为单行代码的一点报错而纠结。",
        icon: <Briefcase className="w-6 h-6 text-teal-500" />
      },
      {
        id: 7,
        period: "2026 Q2",
        title: "工具进阶与工程实践期",
        focus: "命令行驱动与项目标准化流",
        actions: ["Luna 尝试熟练掌握 Terminal 终端和 Claude Code", "Luna 同时推进了好几个小实战项目 (比如 OpenClaw, CTF 初探)", "Luna 开始学会用 Linear 这种专业工具管理自己的进度了"],
        result: "Luna 的开发效率变高了，慢慢有了属于自己的工程化“武器库”。",
        icon: <Terminal className="w-6 h-6 text-slate-700" />
      },
      {
        id: 8,
        period: "2026 Q3-Q4",
        title: "个人品牌与多维发展期",
        focus: "AI 跨域迁移与 IP 化",
        actions: ["Luna 正在搭建属于自己的 Stella 个人品牌网站和作品集", "Luna 开始把慢慢长高的 AI 能力运用到生活真实爱好里 (比如商业策划/运动数据)"],
        result: <span>Luna 所有的成长线索收拢成型啦！作品集：<a href="https://www.fandom-trivia.com/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 hover:underline break-all">https://www.fandom-trivia.com/</a></span>,
        icon: <Globe className="w-6 h-6 text-indigo-500" />
      }
    ],
    resources: [
      {
        id: "res_syntax",
        category: "语法启蒙",
        title: "轻量级代码环境",
        tools: [{ name: "Codedex", url: "https://www.codedex.io/" }, { name: "CodeCombat", url: "https://codecombat.com/" }],
        target: "零基础 / 小学低年级",
        scenario: "初识 Python 等文本代码，建立基础语法直觉与运行逻辑。",
        prerequisite: "具备基础英语阅读能力；无需前置技术门槛。",
        description: "通过闯关式、游戏化的轻量级交互，剥离本地环境配置的摩擦，降低抽象语法的认知负荷。"
      },
      {
        id: "res_ide",
        category: "AI IDE辅助",
        title: "智能代码编辑器",
        tools: [{ name: "Trae", url: "https://www.trae.ai/" }, { name: "Cursor", url: "https://www.cursor.com/" }, { name: "Antigravity", url: "#" }],
        target: "具备初级编程概念者",
        scenario: "快速将自然语言需求转化为可运行脚本，处理简单的报错。",
        prerequisite: "理解基本“变量/函数”概念；能够清晰描述需求现象。",
        description: "提供强大的AI辅助能力。初期为单向代码索取，后期可演变为协作排查工具。"
      },
      {
        id: "res_visual",
        category: "逻辑过渡",
        title: "跨模态平台",
        tools: [{ name: "Scratch", url: "https://scratch.mit.edu/" }, { name: "Micro:bit", url: "https://microbit.org/" }, { name: "Code.org", url: "https://code.org/" }],
        target: "需要跨模态映射理解的学习者",
        scenario: "将实体物理反馈、图形化积木与底层文本代码进行逻辑对应。",
        prerequisite: "无特殊要求，但易受“学校已学过”导致的厌倦情绪影响。",
        description: "Scratch 提供最基础的图形化积木启蒙。Micro:bit 帮助建立物理实体与代码的连接，Code.org 有助于理解坐标轴(x,y)与事件驱动(Event)。"
      },
      {
        id: "res_vibe",
        category: "Vibe Coding",
        title: "AI 原生构建工具",
        tools: [{ name: "Lovable", url: "https://lovable.dev/" }, { name: "Bolt.new", url: "https://bolt.new/" }],
        target: "能够拆解产品功能的高阶学习者",
        scenario: "跳过底层代码编写，直接通过对话构建UI与交互原型。",
        prerequisite: "具备基础产品思维，能撰写 PRD (产品需求文档) 和定义 Role Profile。",
        description: "训练 AI 交互范式：核心在于如何通过高质量的语境 (Context) 约束模型输出。"
      },
      {
        id: "res_3d",
        category: "开源/商业游戏引擎",
        title: "专业级游戏开发",
        tools: [{ name: "Roblox Studio", url: "https://create.roblox.com/" }, { name: "Godot Engine", url: "https://www.gdquest.com/tutorial/godot/learning-paths/beginner/" }],
        target: "寻求即时高阶反馈、10岁+群体",
        scenario: "希望将代码能力转化为游戏资产、物理逻辑与互动机制。",
        prerequisite: "具备基础控制流思维；具有较强的抗挫折与排错(Debug)意愿。",
        description: "极佳的自驱力催化剂。通过 GDScript 等类 Python 脚本建立真实的物理世界应用与游戏系统映射。"
      },
      {
        id: "res_arch",
        category: "架构与知识体系",
        title: "认知与系统构建",
        tools: [{ name: "CS146S", url: "https://themodernsoftware.dev/" }, { name: "NotebookLM", url: "https://notebooklm.google.com/" }],
        target: "系统集成阶段 / 需要消化复杂文档",
        scenario: "学习现代 AI 编程范式，处理多模态信息提取。",
        prerequisite: "良好的英文理解力；有结构化整理信息的习惯。",
        description: "斯坦福现代编程课提供顶层架构思维，NotebookLM 提供将静态资料转化为音频/问答的杠杆工具。"
      },
      {
        id: "res_eng",
        category: "工程与项目流",
        title: "专业级开发工作流",
        tools: [{ name: "Raise Baby Agent", url: "https://github.com/ezcat207/learn-claude-code-kid/" }, { name: "Linear", url: "https://linear.app/" }],
        target: "架构期转型者 / 并行多项目开发者",
        scenario: "脱离 UI 界面使用终端进行代码生成与编辑，标准化项目进度。",
        prerequisite: "理解文件系统层级，适应纯命令行(CLI)交互，有管理碎片化任务的需求。",
        description: "实现从 Demo 到完整工程项目的跃迁。Claude Code 极大提升终端构建效率，Linear 收敛任务重心防止精力发散。"
      },
      {
        id: "res_frontier",
        category: "安全与前沿极客",
        title: "高阶挑战探索",
        tools: [{ name: "PicoCTF", url: "https://picoctf.org/" }, { name: "MIT Day of AI", url: "https://dayofai.org/" }],
        target: "具备坚实基础、追求思维挑战的学习者",
        scenario: "参加网络安全解密挑战，系统接触世界顶尖学术机构的 AI 启蒙工具。",
        prerequisite: "较强的底层计算机网络与系统常识，具备查阅纯技术文档的能力。",
        description: "拓宽技术视野的试金石。CTF 培养极限除错与逆向思维，MIT 工具引入最前沿的技术思考。"
      }
    ],
    decisionTreeNodes: {
      n1: {
        variable: "前提条件：英文读写与键盘基础",
        question: "孩子目前是否具备基础的英文阅读能力，并习惯使用键盘输入？",
        options: [
          { label: "尚不具备，倾向直观触控或实体反馈", next: "result_res_visual" },
          { label: "具备基础读写与输入能力", next: "n2" }
        ]
      },
      n2: {
        variable: "前提条件：控制流抽象认知",
        question: "孩子是否已经理解了基础的代码逻辑结构（如变量赋值、条件判断 if/else、循环）？",
        options: [
          { label: "尚未理解，需要从头启蒙", next: "result_res_syntax" },
          { label: "已初步理解，能看懂并修改简单脚本", next: "n3" }
        ]
      },
      n3: {
        variable: "决策变量：自驱力与反馈介质",
        question: "目前哪种载体能给孩子带来最强的即时成就感和学习动力？",
        options: [
          { label: "制作具有物理规则和多人互动的 3D 游戏", next: "result_res_3d" },
          { label: "设计网页、App 界面或功能产品", next: "n4" },
          { label: "管理复杂项目，追求极客开发流与个人 IP", next: "n5" },
          { label: "探索系统原理、整理资料或做研究", next: "result_res_arch" }
        ]
      },
      n4: {
        variable: "前提条件：需求结构化表达能力",
        question: "在让 AI 帮忙时，孩子能否清晰地定义角色（Profile）并写出有结构的指令（如简易PRD）？",
        options: [
          { label: "能提供充足上下文，拆解产品需求", next: "result_res_vibe" },
          { label: "只能给单句模糊指令，需要边跑边 Debug", next: "result_res_ide" }
        ]
      },
      n5: {
        variable: "前提条件：系统工程与终端适应性",
        question: "孩子是否习惯使用终端命令行（CLI），且需要并行追踪多个复杂任务？",
        options: [
          { label: "具备终端操作能力，需要收敛项目与进度管理", next: "result_res_eng" },
          { label: "希望拓宽安全架构视野或接触顶尖前沿资源", next: "result_res_frontier" }
        ]
      }
    }
  },
  en: {
    header: {
      title: "AI-Era Kids Programming Roadmap",
      subtitle: "Tool Boundary Testing & Capability Evolution Log",
      tabDecision: "Decision Tree",
      tabMatrix: "Resource Matrix",
      tabJourney: "Luna's Journey"
    },
    intro: "This record is extracted from actual tutoring sessions. It doesn't use a fixed curriculum framework, but treats programming learning as an enlightenment of cybernetics and systems engineering. The core is not syntax memorization, but establishing: abstract logic mapping, Debug permission mechanisms, and Context management capabilities under strong AI models. Choose tools based on prerequisites for different stages.",
    footer: "Design Principles: High Standards, Modular, Delivery-Oriented.",
    ui: {
      stageFocus: "Stage Focus: ",
      keyActions: "Key Actions",
      resultAnchor: "Result Anchor",
      matchPrereq: "Prerequisites",
      applicableScenario: "Applicable Scenario",
      prereqAndRisk: "Prerequisites & Risks",
      visit: "Visit",
      restartTest: "Restart Test",
      backToPrev: "Back to Previous Variable",
      matchResult: "Match Result",
      decisionTitle: "Tool Path Decision Tree",
      decisionDesc: "Locate the most suitable tool tier through variable evaluation",
      matrixTitle: "Resource Inventory & Condition Matrix",
      journeyTitle: "Luna's Growth Journey & Milestones",
      targetGroup: "Target Group / Scenario"
    },
    stages: [
      {
        id: 1,
        period: "2025.03 - 2025.05",
        title: "Basic Programming & AI Exploration",
        focus: "Syntax entity cognition & AI black box assistance",
        actions: ["Luna played around with Python basics via Codedex", "Luna tried running Snake and other mini-games with Trae/Cursor"],
        result: "Luna got a basic feel for coding, though she had some tiny cognitive friction with multi-function calls.",
        icon: <Code className="w-6 h-6 text-blue-500" />
      },
      {
        id: 2,
        period: "2025.05 - 2025.06",
        title: "Visual to Code Logic Transition",
        focus: "Cross-platform mapping of abstract thinking",
        actions: ["Luna rocked some Micro:bit visual programming", "Luna investigated Code.org events and coordinates"],
        result: "Luna successfully mapped visual blocks like 'forever' straight to Python's 'while true'!",
        icon: <BookOpen className="w-6 h-6 text-green-500" />
      },
      {
        id: 3,
        period: "2025.07 - 2025.08",
        title: "AI Toolflows & Vibe Coding",
        focus: "Interaction paradigm shift",
        actions: ["Luna understood the foundational mechanisms of Transformer models", "Luna wrote a PRD and used Lovable to generate a travel site!"],
        result: "Luna started enjoying Prompt-based control more than just dull traditional syntax.",
        icon: <BrainCircuit className="w-6 h-6 text-purple-500" />
      },
      {
        id: 4,
        period: "2025.09 - 2025.11",
        title: "3D Engine & Self-Drive Eruption",
        focus: "White-boxing system debugging permissions",
        actions: ["Luna digested full-English Roblox tutorials all by herself", "Luna learned to use the who/explain/fix framework to get AI to debug with her"],
        result: "Luna showed incredible self-motivation and initiative in a 3D interactive world.",
        icon: <Gamepad2 className="w-6 h-6 text-orange-500" />
      },
      {
        id: 5,
        period: "2025.12 - 2026.01",
        title: "Full-Stack Practice & Architecture",
        focus: "System integration & Context enhancement",
        actions: ["Luna participated in 'One week one project: AI Architect'", "Luna started listening to Stanford's CS146S modern programming course", "Luna used NotebookLM to crunch through multi-modal resources"],
        result: "Luna shifted from basic code blocks to stringing together complete functional modules.",
        icon: <Route className="w-6 h-6 text-red-500" />
      },
      {
        id: 6,
        period: "2026 Q1",
        title: "Theory & Architecture Enlightenment",
        focus: "Mindset shift from Coder to Architect",
        actions: ["Luna touched on early AI Architecture concepts", "Luna allocated an 80% theory / 20% practice learning split", "Luna is exploring at her own steady, self-paced rhythm"],
        result: "Luna set a goal to be a 'Self-shining star', focusing on intent management instead of single lines of code.",
        icon: <Briefcase className="w-6 h-6 text-teal-500" />
      },
      {
        id: 7,
        period: "2026 Q2",
        title: "Tool Advancement & Engineering",
        focus: "CLI driven & standardized project flows",
        actions: ["Luna is learning to use the Terminal and Claude Code", "Luna parallel-tracked multiple projects (like OpenClaw and basic CTFs)", "Luna began adopting Linear to track her own progress and tasks"],
        result: "Luna completely sped up her workflow, building up her personal engineering 'arsenal'.",
        icon: <Terminal className="w-6 h-6 text-slate-700" />
      },
      {
        id: 8,
        period: "2026 Q3-Q4",
        title: "Personal Brand & Multi-Domain Growth",
        focus: "AI cross-domain migration & IP creation",
        actions: ["Luna is currently structuring her Stella personal website and portfolio", "Luna is moving her AI skills into real-life hobbies (like business and sports)"],
        result: <span>Luna is converging all her learning threads into actual awesome creations! Portfolio: <a href="https://www.fandom-trivia.com/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 hover:underline break-all">https://www.fandom-trivia.com/</a></span>,
        icon: <Globe className="w-6 h-6 text-indigo-500" />
      }
    ],
    resources: [
      {
        id: "res_syntax",
        category: "Syntax Initiation",
        title: "Lightweight Code Environment",
        tools: [{ name: "Codedex", url: "https://www.codedex.io/" }, { name: "CodeCombat", url: "https://codecombat.com/" }],
        target: "Zero base / Lower elementary",
        scenario: "First encounter with Python text code, building basic syntax intuition.",
        prerequisite: "Basic English reading; no prior tech threshold.",
        description: "Reduces abstract syntax cognitive load through gamified interactions, removing local environment setup friction."
      },
      {
        id: "res_ide",
        category: "AI IDE Assist",
        title: "Smart Code Editor",
        tools: [{ name: "Trae", url: "https://www.trae.ai/" }, { name: "Cursor", url: "https://www.cursor.com/" }, { name: "Antigravity", url: "#" }],
        target: "Has basic programming concepts",
        scenario: "Convert natural language to runnable scripts, handle simple errors.",
        prerequisite: "Understands basic variable/function concepts; can describe requirement phenomena.",
        description: "Provides strong AI assistance. Initially for one-way code retrieval, later evolves into a collaborative debugging tool."
      },
      {
        id: "res_visual",
        category: "Logic Transition",
        title: "Cross-Modal Platform",
        tools: [{ name: "Scratch", url: "https://scratch.mit.edu/" }, { name: "Micro:bit", url: "https://microbit.org/" }, { name: "Code.org", url: "https://code.org/" }],
        target: "Learners needing cross-modal mapping",
        scenario: "Mapping physical feedback and visual blocks to text code logic.",
        prerequisite: "None, but prone to boredom if already learned in school.",
        description: "Scratch provides the most fundamental visual block initiation. Micro:bit helps connect physical entities with code. Code.org aids in understanding coordinates and event-driven logic."
      },
      {
        id: "res_vibe",
        category: "Vibe Coding",
        title: "AI Native Builders",
        tools: [{ name: "Lovable", url: "https://lovable.dev/" }, { name: "Bolt.new", url: "https://bolt.new/" }],
        target: "Advanced learners capable of feature breakdown",
        scenario: "Skip low-level coding, build UI/prototypes directly via chat.",
        prerequisite: "Basic product thinking, ability to write PRD and define Role Profiles.",
        description: "Trains AI interaction paradigms: core lies in constraining model output via high-quality context."
      },
      {
        id: "res_3d",
        category: "Open/Commercial Engine",
        title: "Pro Game Development",
        tools: [{ name: "Roblox Studio", url: "https://create.roblox.com/" }, { name: "Godot Engine", url: "https://www.gdquest.com/tutorial/godot/learning-paths/beginner/" }],
        target: "Seeking instant high-level feedback, Age 10+",
        scenario: "Transform coding skills into game assets, physical logic, and interaction mechanisms.",
        prerequisite: "Basic control flow thinking; strong frustration tolerance and debugging willingness.",
        description: "Excellent self-drive catalyst. Uses Python-like GDScript to bridge real-world modeling and game systems."
      },
      {
        id: "res_arch",
        category: "Architecture & Systems",
        title: "Cognition & System Build",
        tools: [{ name: "CS146S", url: "https://themodernsoftware.dev/" }, { name: "NotebookLM", url: "https://notebooklm.google.com/" }],
        target: "System integration stage / digesting complex docs",
        scenario: "Learn modern AI programming paradigms, extract multi-modal info.",
        prerequisite: "Good English comprehension; habit of structured information organization.",
        description: "Stanford course provides top-level architectural thinking, NotebookLM acts as a leverage tool to turn static materials into audio/Q&A."
      },
      {
        id: "res_eng",
        category: "Engineering & Project Flow",
        title: "Pro-Level Dev Workflow",
        tools: [{ name: "Raise Baby Agent", url: "https://github.com/ezcat207/learn-claude-code-kid/" }, { name: "Linear", url: "https://linear.app/" }],
        target: "Architect transition / Parallel project devs",
        scenario: "Generate and edit code via CLI, standardizing project tracking without GUI dependencies.",
        prerequisite: "Understands filesystem hierarchies, adaptable to purely CLI interactions, needs task management.",
        description: "Facilitates the leap from Demo to full engineering project. Claude Code speeds up CLI builds, Linear prevents energy dispersion."
      },
      {
        id: "res_frontier",
        category: "Security & Frontier",
        title: "High-Level Exploration",
        tools: [{ name: "PicoCTF", url: "https://picoctf.org/" }, { name: "MIT Day of AI", url: "https://dayofai.org/" }],
        target: "Learners with solid foundations seeking mental challenges",
        scenario: "Participate in cybersecurity decryption tasks, interact with top-tier AI enlightenment tools.",
        prerequisite: "Strong foundational knowledge of computer networks/systems, capable of reading technical documentation.",
        description: "A touchstone for broadening technical horizons. CTF fosters extreme debugging and reverse thinking."
      }
    ],
    decisionTreeNodes: {
      n1: {
        variable: "Prerequisite: English Reading & Keyboard Basics",
        question: "Does the child currently possess basic English reading skills and keyboard typing habits?",
        options: [
          { label: "Not yet, prefers intuitive touch or physical feedback", next: "result_res_visual" },
          { label: "Has basic reading and typing skills", next: "n2" }
        ]
      },
      n2: {
        variable: "Prerequisite: Control Flow Abstraction",
        question: "Has the child understood basic code logic structures (variables, if/else, loops)?",
        options: [
          { label: "Not yet, needs initiation from scratch", next: "result_res_syntax" },
          { label: "Understood preliminarily, can read and tweak simple scripts", next: "n3" }
        ]
      },
      n3: {
        variable: "Decision Variable: Self-Drive & Feedback Medium",
        question: "Which medium currently provides the strongest instant sense of achievement and motivation?",
        options: [
          { label: "Building 3D games with physics and multiplayer", next: "result_res_3d" },
          { label: "Designing websites, Apps, or functional products", next: "n4" },
          { label: "Managing complex projects, pursuing CLI dev flows and personal IP", next: "n5" },
          { label: "Exploring system principles, organizing docs, or research", next: "result_res_arch" }
        ]
      },
      n4: {
        variable: "Prerequisite: Structured Requirement Expression",
        question: "When asking AI for help, can the child clearly define roles (Profiles) and write structured instructions (e.g., a simple PRD)?",
        options: [
          { label: "Can provide ample context and break down requirements", next: "result_res_vibe" },
          { label: "Can only give vague single-sentence prompts, needs trial and error", next: "result_res_ide" }
        ]
      },
      n5: {
        variable: "Prerequisite: Systems Engineering & CLI Adaptability",
        question: "Is the child comfortable using Terminal/CLI and needing to track multiple complex tasks?",
        options: [
          { label: "Capable of terminal ops, needs project convergence and tracking", next: "result_res_eng" },
          { label: "Wishes to expand security architecture horizons or access top-tier frontier resources", next: "result_res_frontier" }
        ]
      }
    }
  }
};

// --- 组件定义 ---

const DecisionTree = ({ t }: { t: any }) => {
  const [currentNodeId, setCurrentNodeId] = useState('n1');
  const [history, setHistory] = useState<string[]>([]);

  const handleOptionClick = (nextId: string) => {
    setHistory([...history, currentNodeId]);
    setCurrentNodeId(nextId);
  };

  const handleBack = () => {
    if (history.length === 0) return;
    const prevHistory = [...history];
    const prevNode = prevHistory.pop();
    setHistory(prevHistory);
    if (prevNode) setCurrentNodeId(prevNode);
  };

  const resetTree = () => {
    setHistory([]);
    setCurrentNodeId('n1');
  };

  const isResultNode = currentNodeId.startsWith('result_');
  
  let content;

  if (isResultNode) {
    const resId = currentNodeId.replace('result_', '');
    const resourceInfo = t.resources.find((r: any) => r.id === resId);

    content = (
      <div className="bg-white rounded-xl shadow-sm border border-green-200 p-8 animate-in fade-in zoom-in duration-300">
        <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-6 mx-auto">
          <CheckCircle2 className="w-6 h-6 text-green-600" />
        </div>
        <h3 className="text-center text-sm font-semibold text-green-600 uppercase tracking-widest mb-2">{t.ui.matchResult}</h3>
        <h2 className="text-2xl text-center font-bold text-gray-900 mb-6">{resourceInfo.category} : {resourceInfo.title}</h2>
        
        <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left space-y-4 border border-gray-100">
           <div>
              <span className="block text-xs font-bold text-gray-500 uppercase">{t.ui.matchPrereq}</span>
              <span className="text-sm text-gray-800">{resourceInfo.prerequisite}</span>
            </div>
            <div>
              <span className="block text-xs font-bold text-gray-500 uppercase">{t.ui.applicableScenario}</span>
              <span className="text-sm text-gray-800">{resourceInfo.scenario}</span>
            </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
          {resourceInfo.tools.map((tool: any, idx: number) => (
             <a 
               key={idx}
               href={tool.url}
               target="_blank" 
               rel="noopener noreferrer"
               className="inline-flex items-center justify-center px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-sm"
             >
               {t.ui.visit} {tool.name} <ExternalLink className="w-4 h-4 ml-2" />
             </a>
          ))}
        </div>

        <div className="text-center">
          <button 
            onClick={resetTree}
            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            <RotateCcw className="w-4 h-4 mr-1" /> {t.ui.restartTest}
          </button>
        </div>
      </div>
    );
  } else {
    const node = t.decisionTreeNodes[currentNodeId];
    content = (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 animate-in slide-in-from-right-4 duration-300">
        <div className="mb-8">
          <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-full mb-4">
            {node.variable}
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 leading-relaxed">
            {node.question}
          </h2>
        </div>
        
        <div className="space-y-4">
          {node.options.map((option: any, idx: number) => (
            <button
              key={idx}
              onClick={() => handleOptionClick(option.next)}
              className="w-full text-left p-4 border border-gray-200 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition-all font-medium text-gray-700 flex justify-between items-center group"
            >
              <span>{option.label}</span>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-500" />
            </button>
          ))}
        </div>

        {history.length > 0 && (
          <div className="mt-8 pt-4 border-t border-gray-100">
            <button 
              onClick={handleBack}
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              &larr; {t.ui.backToPrev}
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-4">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center p-3 bg-indigo-100 rounded-full mb-4">
          <GitBranch className="w-8 h-8 text-indigo-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">{t.ui.decisionTitle}</h2>
        <p className="text-gray-500 mt-2 text-sm">{t.ui.decisionDesc}</p>
      </div>
      {content}
    </div>
  );
};

const Timeline = ({ t }: { t: any }) => (
  <div className="space-y-8 animate-in fade-in duration-500">
    <h2 className="text-2xl font-bold text-gray-800 border-b pb-4">{t.ui.journeyTitle}</h2>
    <div className="relative border-l border-gray-200 ml-3 md:ml-6 space-y-12">
      {t.stages.map((stage: any) => (
        <div key={stage.id} className="relative pl-8 md:pl-12">
          <div className="absolute -left-4 md:-left-4 bg-white p-1 rounded-full shadow-sm border border-gray-100">
            {stage.icon}
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-all hover:shadow-md">
            <div className="text-sm text-gray-500 font-mono mb-2">{stage.period}</div>
            <h3 className="text-xl font-bold text-gray-800 mb-1">{stage.title}</h3>
            <p className="text-indigo-600 font-medium mb-4 text-sm">{t.ui.stageFocus} {stage.focus}</p>
            
            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-1 flex items-center">
                  <CheckCircle2 className="w-4 h-4 mr-1 text-green-600" /> {t.ui.keyActions}
                </h4>
                <ul className="list-disc list-inside text-gray-600 text-sm space-y-1 ml-1">
                  {stage.actions.map((action: any, idx: number) => (
                    <li key={idx}>{action}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                <h4 className="text-sm font-semibold text-gray-700 mb-1">{t.ui.resultAnchor}</h4>
                <p className="text-gray-600 text-sm">{stage.result}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ResourceMatrix = ({ t }: { t: any }) => (
  <div className="space-y-8 animate-in fade-in duration-500">
    <div className="flex justify-between items-end border-b pb-4">
      <h2 className="text-2xl font-bold text-gray-800">{t.ui.matrixTitle}</h2>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {t.resources.map((res: any, idx: number) => (
        <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col transition-all hover:shadow-md hover:border-indigo-300">
          <div className="p-6 flex-grow space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-full mb-3">
                  {res.category}
                </span>
                <h3 className="text-xl font-bold text-gray-900">{res.title}</h3>
              </div>
            </div>
            
            <p className="text-ink font-sans text-[15px] leading-relaxed mb-2 font-medium">{res.description}</p>
            
            <div className="space-y-4 pt-4 border-t border-pencil/20 font-sans">
              <div className="flex items-start">
                <div className="bg-blue-50 p-1 rounded mr-3 mt-1 shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <span className="block text-[11px] font-bold text-indigo-500 uppercase tracking-wider mb-1">{t.ui.targetGroup}</span>
                  <span className="text-[15px] font-extrabold text-gray-900 block leading-snug">{res.target}</span>
                  <span className="text-sm font-semibold text-gray-700 block mt-1">{res.scenario}</span>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-amber-50 p-1 rounded mr-3 mt-1 shadow-sm">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                </div>
                <div className="flex-1">
                  <span className="block text-[11px] font-bold text-amber-600 uppercase tracking-wider mb-1">{t.ui.prereqAndRisk}</span>
                  <span className="text-[15px] font-extrabold text-gray-900 block leading-snug">{res.prerequisite}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 border-t border-gray-100 flex flex-wrap gap-3">
            {res.tools.map((tool: any, tIdx: number) => (
              <a 
                key={tIdx}
                href={tool.url}
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center py-2 px-3 bg-white border border-gray-200 rounded-md text-sm font-medium text-indigo-600 hover:bg-indigo-50 hover:border-indigo-300 transition-colors"
              >
                {tool.name} <ExternalLink className="w-4 h-4 ml-1" />
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

type Lang = keyof typeof DICTIONARY;

export default function WayneRoadmap() {
  const [activeTab, setActiveTab] = useState('resources');
  const [lang, setLang] = useState<Lang>('en');

  const t = DICTIONARY[lang];

  return (
    <div className="space-y-8">
      <RoadmapSEO />

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">{t.header.title}</h1>
          <p className="text-slate-500 mt-1 text-sm">{t.header.subtitle}</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-600 hover:bg-slate-200 rounded-md transition-colors text-sm font-medium"
          >
            <Languages className="w-4 h-4" />
            <span className="text-xs font-bold uppercase">{lang === 'zh' ? 'EN' : '中'}</span>
          </button>
          <div className="flex bg-slate-100 p-1 rounded-lg">
            {[
              { key: 'decision', label: t.header.tabDecision, icon: <GitBranch className="w-3.5 h-3.5" /> },
              { key: 'resources', label: t.header.tabMatrix, icon: null },
              { key: 'journey', label: t.header.tabJourney, icon: null },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`whitespace-nowrap px-3 py-1.5 text-xs font-semibold rounded-md transition-all flex items-center gap-1 ${
                  activeTab === tab.key
                    ? 'bg-white text-indigo-700 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Intro */}
      <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5">
        <p className="text-indigo-900 leading-relaxed text-sm">{t.intro}</p>
      </div>

      {/* Content */}
      <div className="min-h-[400px]">
        {activeTab === 'decision' && <DecisionTree t={t} />}
        {activeTab === 'resources' && <ResourceMatrix t={t} />}
        {activeTab === 'journey' && <Timeline t={t} />}
      </div>

      {/* Footer note */}
      <div className="text-center text-xs text-slate-400 py-4 border-t border-slate-100">
        {t.footer}
      </div>
    </div>
  );
}