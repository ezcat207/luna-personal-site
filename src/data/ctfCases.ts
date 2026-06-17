// ─── CTF Case Files ───────────────────────────────────────────────────────────
// Source: Lark wiki https://zcpj3avuhsr.sg.larksuite.com/wiki/SQRUwEoE0iR0Ykkuc47lvddng3c
// Local copy: LARK_CTF_RAW.md
// Last synced: 2026-06-17

export type Platform = 'picoctf' | 'cylabacademy';
export type Difficulty = 1 | 2 | 3;
export type Solver = 'luna' | 'wayne';

export interface CtfCase {
  id: string;            // slug used in URL: /detective/001-git-identity
  caseNumber: number;
  date: string;          // YYYY-MM-DD
  title: string;
  summary: string;       // one-line teaser shown on card
  challengeUrl?: string;
  platform?: Platform;
  difficulty: Difficulty;
  solvers: Solver[];
  flag?: string;

  // ── Detective Story (for readers who want narrative) ──────────────────────
  story: {
    crimeScene: string;    // Q1: where was the flag hidden
    trap: string;          // Q2: what was tricky
    deduction: string;     // Q3: how we figured it out
    commands: string;      // Q4: exact terminal commands (markdown code block string)
    deadEnds?: string;     // Q5: wrong paths taken
    lesson: string;        // key takeaway
  };

  // ── Tutorial (for readers who want to try it themselves) ──────────────────
  tutorial?: {
    goal: string;          // what you're trying to accomplish
    hint1: string;         // first nudge without spoiling
    hint2: string;         // second nudge, more specific
    hint3: string;         // near-solution hint
    tryIt: string;         // CTA copy, e.g. "Open the challenge and try Step 1"
  };

  tags: string[];
}

// ─── Cases ────────────────────────────────────────────────────────────────────

export const ctfCases: CtfCase[] = [

  // ── #001 ──────────────────────────────────────────────────────────────────
  {
    id: '001-git-identity',
    caseNumber: 1,
    date: '2026-04-12',
    title: '身份幻术',
    summary: '一台神秘的 Git 服务器只让 "root" 进入。问题是——谁说你不能变成 root？',
    challengeUrl: 'https://play.picoctf.org/practice/challenge/764',
    platform: 'picoctf',
    difficulty: 1,
    solvers: ['luna'],
    flag: 'picoCTF{mp3r50n4t4_g17_345y_6877715a}',

    story: {
      crimeScene: `深夜，一台神秘的 Git 服务器悄悄运行在互联网的角落。

服务器主人留下了一张字条："我建了一个用自己规则运行的 Git 服务器。克隆它，读 README，你就能得到旗帜。"

Luna 用提供的命令克隆了仓库：

\`\`\`bash
git clone ssh://git@foggy-cliff.picoctf.net:55400/git/challenge.git
\`\`\`

密码 \`e38a0906\` 输入。仓库下载成功。她打开 README——旗帜不在里面。`,

      trap: `README 里有一句话像谜语悬在空中：

> *"只有 root 提交的文件，才会触发旗帜。"*

服务器在验证**你是谁**。不是密码，不是账号，而是 Git 提交记录里署名的身份。

普通人会卡在这里：我怎么可能"成为" root？`,

      deduction: `Luna 想到了一件关键的事：

Git 提交时，会把提交者的名字和邮箱写进记录。这个信息——**不是从服务器验证的，而是从你自己的本地配置读取的**。

换句话说：服务器根本不问"你真的是 root 吗？"，它只是读了一下你递过去的**名片**。而名片……是你自己印的。`,

      commands: `\`\`\`bash
# 第一步：换上伪装身份
git config user.name "root"
git config user.email "root@picoctf"

# 第二步：创造触发旗帜的钥匙
echo "trigger" > flag.txt

# 第三步：放进暂存区并提交
git add flag.txt
git commit -m "pushing flag"

# 第四步：推送到服务器
git push origin master
\`\`\``,

      deadEnds: `这个案子没有太多弯路。但它留下一个更深的问题：

> *为什么冒充 root 这么简单？*

因为 Git 设计之初假设提交者不会说谎——在小团队里，大家都是真实的人。当服务器用"名字验证"做安全机制时，它就成了漏洞。就像一个保险库门上写"只有行长能进"，却从不查工牌。`,

      lesson: `**身份 ≠ 验证。** Git 的 user.name 完全由客户端控制，服务器不做真实性检查。当系统用"信任名字"来做权限判断时，它就是可以被绕过的。`,
    },

    tutorial: {
      goal: '让服务器相信你是 "root" 用户，触发旗帜输出。',
      hint1: 'Git 提交时，服务器靠什么来知道"是谁提交的"？这个信息存在哪里？',
      hint2: '试试在本地运行 `git config user.name` 看看输出什么。你能改它吗？',
      hint3: '把 user.name 改成 "root"，user.email 改成 "root@picoctf"，然后创建任意一个文件并推送。',
      tryIt: '打开题目，克隆仓库，然后从"修改 git config"开始试试看。',
    },

    tags: ['git', 'identity', 'impersonation', 'beginner'],
  },

  // ── #002 ──────────────────────────────────────────────────────────────────
  {
    id: '002-ascii-flood',
    caseNumber: 2,
    date: '2026-04-19',
    title: '字符的洪水',
    summary: '服务器要求你发送 1751 个完全相同的字符。手动输入？不可能。自动化才是答案。',
    challengeUrl: 'https://play.picoctf.org/practice/challenge/762',
    platform: 'picoctf',
    difficulty: 2,
    solvers: ['luna', 'wayne'],

    story: {
      crimeScene: `服务器在等待一个非常特别的密码——不是八位数字，不是一串单词，而是 **1751 个完全相同的字符**，连续不断，中间不能有空格。

挑战描述写着：\`ASCII DECIMAL 101\`。

Luna 连上服务器，看到提示，开始手动输入……然后连接超时了。服务器给的时间只有 1 秒。`,

      trap: `两个陷阱同时出现：

**陷阱一：时间锁**。服务器只给 1 秒钟。人类手速根本不够。

**陷阱二：编码迷雾**。"ASCII DECIMAL 101" 是什么？101 是十进制——对应的字符是小写字母 \`e\`，不是字面意思上的 "101" 三个字符。

Luna 的第一次尝试：把 "101" 重复 1751 次——失败。服务器要的是字符 \`e\`，不是数字串。`,

      deduction: `破案的关键是一张对照表：

| 表示方式 | 值 |
|---------|---|
| ASCII Decimal | 101 |
| ASCII Hex | \\x65 |
| 实际字符 | \`e\` |

就像一个间谍有三本护照，但脸只有一张。服务器代码写的是 \`if user_input == "\\x65" * 1751\`，无论哪种写法，它要的都是字符 \`e\` 重复 1751 次。

自动化解决时间问题：用 Python 生成 payload，用管道传给服务器。`,

      commands: `\`\`\`bash
# 用 Python 生成 1751 个 'e'，通过管道发给服务器
python3 -c "print('e' * 1751, end='')" | nc <服务器地址> <端口>
\`\`\``,

      deadEnds: `最大的弯路：把 "DECIMAL 101" 理解成字符串 "101"，导致发送了三个字符 '1','0','1' 各重复 1751 次，而不是一个字符 'e'。

教训：遇到编码问题，先建立映射表，不要靠直觉。`,

      lesson: `**从源码出发，不从描述出发。** 服务器验证的是 \`\\x65\`（十六进制）= 字符 \`e\`（十进制 101）。描述说的是人话，代码说的是机器话，两者在编码问题上不一样。永远优先看代码逻辑，再对照人类描述。`,
    },

    tutorial: {
      goal: '向服务器发送 1751 个字符 `e`，在 1 秒内完成。',
      hint1: 'ASCII Decimal 101 对应哪个字符？试试在 Python 里运行 `chr(101)`。',
      hint2: '你不可能手动输入 1751 个字符。Python 的字符串乘法 `"e" * 1751` 能帮你。怎么把它"发"给服务器？',
      hint3: '用 `python3 -c "print(..., end=\'\')" | nc 服务器地址 端口` 的方式，把 Python 输出直接管道给 netcat。',
      tryIt: '打开题目，先用 `nc` 连上服务器看看提示，然后想想怎么在 1 秒内发送 1751 个字符。',
    },

    tags: ['ascii', 'encoding', 'automation', 'python', 'netcat'],
  },

  // ── #003 ──────────────────────────────────────────────────────────────────
  {
    id: '003-printer-heist',
    caseNumber: 3,
    date: '2026-04-26',
    title: '打印机里的秘密',
    summary: '一台网络打印机被设置成了"公共书架"。没人想到里面藏着旗帜。',
    platform: 'picoctf',
    difficulty: 1,
    solvers: ['luna', 'wayne'],
    flag: 'picoCTF{mb_pr1nter_5n4re5_51f37693}',

    story: {
      crimeScene: `想象一个大图书馆，大部分书都锁在玻璃柜里。但角落有一个书架标着"社区杂志"——任何人都可以走过去翻看，不需要图书证。

这台打印机服务器就是那个书架。它开着一个名叫 \`print$\` 的 SMB 共享目录，任何人都能匿名访问。而旗帜，就放在里面的 \`flag.txt\` 文件里。`,

      trap: `三个障碍同时出现：

1. **非标准端口**：SMB 通常运行在 445 端口，但这台服务器用的是自定义端口，标准工具直接连会失败。

2. **匿名访问**：服务器允许"无密码"访客登录，但你得知道用 \`-N\` 参数跳过密码验证。

3. **目录名不直观**：不知道共享文件夹叫什么名字，需要先"枚举"（列出所有共享）才能找到 \`print$\`。`,

      deduction: `标准渗透测试三步走：

**侦察** → 列出服务器上所有共享目录，找到 \`print$\`

**进入** → 用匿名身份连进去

**提取** → 找到 \`flag.txt\`，读出内容`,

      commands: `\`\`\`bash
# 第一步：列出所有共享（-N 表示不需要密码）
smbclient -L //mysterious-sea.picoctf.net -p 49387 -N

# 第二步：连进 print$ 共享
smbclient //mysterious-sea.picoctf.net/print$ -p 49387 -N

# 第三步：在 SMB 交互界面里列出文件并读取
smb: \\> ls
smb: \\> get flag.txt
smb: \\> exit

# 第四步：在本地读取下载的文件
cat flag.txt
\`\`\``,

      lesson: `**网络服务的默认配置往往不安全。** 打印机共享设置成"公开访问"是为了方便，但忘记移走敏感文件时就成了漏洞。安全检查不只看密码，还要看"什么东西是公开可访问的"。`,
    },

    tutorial: {
      goal: '找到打印机服务器上的 flag.txt 文件并读取它。',
      hint1: '`smbclient` 是连接 SMB/打印机共享的工具。怎么"列出"一个服务器上的所有共享目录？',
      hint2: '用 `smbclient -L //地址 -p 端口 -N` 看看服务器上有什么。找到目录名后，再用 `smbclient //地址/目录名 -p 端口 -N` 连进去。',
      hint3: '连进去之后，用 `ls` 列文件，用 `get filename` 下载，然后在本地 `cat` 读取。',
      tryIt: '先装好 smbclient（`brew install samba` 或 `apt install smbclient`），然后用题目给的地址和端口开始侦察。',
    },

    tags: ['smb', 'network', 'enumeration', 'anonymous-access', 'beginner'],
  },

  // ── #004 ──────────────────────────────────────────────────────────────────
  {
    id: '004-ping-injection',
    caseNumber: 4,
    date: '2026-05-03',
    title: '分号的力量',
    summary: '服务器声称"只允许 ping 8.8.8.8"。一个分号，让它乖乖交出旗帜。',
    challengeUrl: 'https://play.picoctf.org/practice/challenge/757',
    platform: 'picoctf',
    difficulty: 2,
    solvers: ['luna', 'wayne'],
    flag: 'picoCTF{p1nG_c0mm@nd_3xpL0iT_su33EssFuL_8555bda7}',

    story: {
      crimeScene: `服务器门口挂着一块牌子：

> *"我们有严格的安全措施，只允许 ping 8.8.8.8。"*

连上服务器后，它等待你输入一个 IP 地址，然后运行 \`ping\`。听起来天衣无缝——直到你开始思考：它怎么"运行 ping"的？`,

      trap: `服务器的实现方式大概是这样：

\`\`\`bash
ping \${你输入的内容}
\`\`\`

它没有检查你输入的是不是真的 IP 地址。只要你的输入能让 \`ping\` 先跑完，然后额外运行另一个命令……

**第一次失败**：Luna 试了 \`8.8.8.8 | ls\`，用管道——\`ls\` 的执行依赖 ping 的输出，而 ping 不产生文件列表，所以 \`ls\` 没拿到输入，失败。`,

      deduction: `分号（\`;\`）和管道（\`|\`）是两种完全不同的东西：

| 符号 | 作用 | 关系 |
|------|------|------|
| \`;\` | 顺序执行 | B 不依赖 A 的输出，A 结束后 B 独立运行 |
| \`|\` | 管道传递 | B 的输入 = A 的输出，强耦合 |

用分号：\`8.8.8.8; cat flag.txt\`

服务器实际执行：先 \`ping 8.8.8.8\`，结束后再独立执行 \`cat flag.txt\`。`,

      commands: `\`\`\`bash
# 连上服务器
nc mysterious-sea.picoctf.net <端口>

# 当服务器要求输入时：
8.8.8.8; cat flag.txt
\`\`\``,

      deadEnds: `**管道尝试失败**：\`8.8.8.8 | ls\` 不工作，因为 \`ls\` 是目录列表命令，不接受标准输入（stdin）。管道把 ping 的输出传给了 ls，但 ls 不需要这个。

**教训**：分号和管道不能混用理解。遇到命令注入，先用分号，因为它独立执行。`,

      lesson: `**命令注入的核心：找到服务器"拼接"用户输入的地方。** 当服务器把你的输入直接插进 shell 命令而不做任何过滤时，分号让你"附加"任意命令。这是 Web 安全 OWASP Top 10 中最经典的漏洞之一。`,
    },

    tutorial: {
      goal: '通过向 ping 命令"注入"额外指令，读取服务器上的 flag.txt。',
      hint1: 'Shell 里有哪些方法可以在一行里执行两个命令？想想 `;`、`|`、`&&` 的区别。',
      hint2: '试试输入 `8.8.8.8; ls`，看看发生什么。能看到目录列表吗？',
      hint3: '如果 `ls` 能看到 flag.txt，下一步用什么命令读取文件内容？把 `ls` 换成那个命令。',
      tryIt: '用 `nc` 连上题目服务器，先发送 `8.8.8.8` 确认 ping 能跑，再加上分号和第二个命令。',
    },

    tags: ['command-injection', 'shell', 'semicolon', 'netcat', 'web-security'],
  },

  // ── #005 ─────────────────────────────────────────────────────────────── ──
  {
    id: '005-binary-automaton',
    caseNumber: 5,
    date: '2026-05-09',
    title: '一秒内的自动化',
    summary: '服务器把旗帜藏在二进制流里，只给你 1 秒解码。唯一的出路是让代码替你思考。',
    challengeUrl: 'https://learn.cylabacademy.org/library/754?page=1&difficulty=2',
    platform: 'cylabacademy',
    difficulty: 3,
    solvers: ['luna'],
    flag: 'picoCTF{bytemancy_0_b8e94030}',

    story: {
      crimeScene: `服务器发来的不是文字，而是一串连续的十六进制字符流——一个藏在其中的二进制可执行程序。旗帜就嵌在这个程序的数据段里。

但服务器只给 **1 秒钟**。

手动解码？不可能。`,

      trap: `三重障碍：

1. **时间锁**：1 秒执行窗口，人类无法手动完成
2. **动态生成**：每次连接服务器都产生一个新程序，旗帜在变
3. **端口过期**：实例端口会快速失效，需要及时更新脚本`,

      deduction: `解法：写一个 Python 脚本，让它替你完成所有步骤：

1. 开 socket 连接服务器
2. 把收到的十六进制流缓存起来
3. 用正则表达式在流里找 \`picoCTF{...}\` 模式
4. 在 1 秒内把找到的答案发回去`,

      commands: `\`\`\`python
import socket, re

HOST = "服务器地址"
PORT = 端口号

with socket.socket() as s:
    s.connect((HOST, PORT))
    data = b""
    while b"picoCTF" not in data:
        data += s.recv(4096)
    flag = re.search(rb'picoCTF\\{[^}]+\\}', data).group().decode()
    s.sendall((flag + "\\n").encode())
    print(s.recv(1024).decode())
\`\`\``,

      deadEnds: `多次因端口过期导致脚本失效，需要重新从题目页面获取新实例端口。每次换端口都要更新脚本里的 PORT 变量。`,

      lesson: `**当速度是障碍时，自动化是唯一答案。** 编写脚本不是作弊，是工程师思维——把重复的、机械的、有规律的工作交给代码，把思考留给人类。`,
    },

    tutorial: {
      goal: '在 1 秒内解析服务器发来的十六进制流，找到旗帜并发回去。',
      hint1: '用 `nc` 连上服务器，看看它发来的是什么格式。能找到 `picoCTF{` 的起始位置吗？',
      hint2: 'Python 的 `socket` 模块可以建立连接并接收数据。`re.search()` 可以用正则表达式在数据里找模式。',
      hint3: '先用 `socket.recv()` 循环接收数据直到包含 `picoCTF`，再用正则提取完整 flag，最后 `sendall()` 发回去。',
      tryIt: '先手动用 nc 看数据格式，然后写一个最简单的 Python socket 脚本，只做"接收 + 打印"，再逐步加入搜索和发送。',
    },

    tags: ['automation', 'python', 'socket', 'binary', 'regex', 'advanced'],
  },

  // ── #006 — May 11 ─────────────────────────────────────────────────────────
  {
    id: '006-may11',
    caseNumber: 6,
    date: '2026-05-11',
    title: '（待填写）',
    summary: '待填写',
    platform: 'picoctf',
    difficulty: 2,
    solvers: ['luna'],
    flag: 'picoCTF{mbyccsxqdrobelsmyxigfknnoo}',
    story: { crimeScene: '', trap: '', deduction: '', commands: '', lesson: '' },
    tags: [],
  },

  // ── #007 — May 12 ─────────────────────────────────────────────────────────
  {
    id: '007-may12',
    caseNumber: 7,
    date: '2026-05-12',
    title: '（待填写）',
    summary: '待填写',
    platform: 'picoctf',
    difficulty: 2,
    solvers: ['luna'],
    story: { crimeScene: '', trap: '', deduction: '', commands: '', lesson: '' },
    tags: [],
  },

  // ── #008 — May 13 ─────────────────────────────────────────────────────────
  {
    id: '008-may13',
    caseNumber: 8,
    date: '2026-05-13',
    title: '（待填写）',
    summary: '待填写',
    platform: 'picoctf',
    difficulty: 2,
    solvers: ['luna'],
    story: { crimeScene: '', trap: '', deduction: '', commands: '', lesson: '' },
    tags: [],
  },

  // ── #009 — May 14 ─────────────────────────────────────────────────────────
  {
    id: '009-may14',
    caseNumber: 9,
    date: '2026-05-14',
    title: '（待填写）',
    summary: '待填写',
    platform: 'picoctf',
    difficulty: 2,
    solvers: ['luna'],
    story: { crimeScene: '', trap: '', deduction: '', commands: '', lesson: '' },
    tags: [],
  },

  // ── #010 — May 16 ─────────────────────────────────────────────────────────
  {
    id: '010-may16',
    caseNumber: 10,
    date: '2026-05-16',
    title: '（待填写）',
    summary: '待填写',
    platform: 'picoctf',
    difficulty: 2,
    solvers: ['luna'],
    story: { crimeScene: '', trap: '', deduction: '', commands: '', lesson: '' },
    tags: [],
  },

  // ── #011 — May 17 ─────────────────────────────────────────────────────────
  {
    id: '011-may17',
    caseNumber: 11,
    date: '2026-05-17',
    title: '（待填写）',
    summary: '待填写',
    platform: 'picoctf',
    difficulty: 2,
    solvers: ['luna'],
    flag: 'picoCTF{Sm4r7_0verFl0ws_ExI5t_abeec303}',
    story: { crimeScene: '', trap: '', deduction: '', commands: '', lesson: '' },
    tags: [],
  },

  // ── #012 — May 18 ─────────────────────────────────────────────────────────
  {
    id: '012-may18',
    caseNumber: 12,
    date: '2026-05-18',
    title: '（待填写）',
    summary: '待填写',
    platform: 'picoctf',
    difficulty: 2,
    solvers: ['luna'],
    story: { crimeScene: '', trap: '', deduction: '', commands: '', lesson: '' },
    tags: [],
  },

  // ── #013 — May 20 ─────────────────────────────────────────────────────────
  {
    id: '013-may20',
    caseNumber: 13,
    date: '2026-05-20',
    title: '（待填写）',
    summary: '待填写',
    platform: 'picoctf',
    difficulty: 2,
    solvers: ['luna'],
    story: { crimeScene: '', trap: '', deduction: '', commands: '', lesson: '' },
    tags: [],
  },

  // ── #014 — May 21 ─────────────────────────────────────────────────────────
  {
    id: '014-may21',
    caseNumber: 14,
    date: '2026-05-21',
    title: '（待填写）',
    summary: '待填写',
    platform: 'picoctf',
    difficulty: 2,
    solvers: ['luna'],
    story: { crimeScene: '', trap: '', deduction: '', commands: '', lesson: '' },
    tags: [],
  },

  // ── #015 — May 22 ─────────────────────────────────────────────────────────
  {
    id: '015-may22',
    caseNumber: 15,
    date: '2026-05-22',
    title: '（待填写）',
    summary: '待填写',
    platform: 'picoctf',
    difficulty: 2,
    solvers: ['luna'],
    story: { crimeScene: '', trap: '', deduction: '', commands: '', lesson: '' },
    tags: [],
  },

  // ── #016 — May 23 ─────────────────────────────────────────────────────────
  {
    id: '016-may23',
    caseNumber: 16,
    date: '2026-05-23',
    title: '（待填写）',
    summary: '待填写',
    platform: 'picoctf',
    difficulty: 2,
    solvers: ['luna'],
    story: { crimeScene: '', trap: '', deduction: '', commands: '', lesson: '' },
    tags: [],
  },

  // ── #017 — May 29 ─────────────────────────────────────────────────────────
  {
    id: '017-may29',
    caseNumber: 17,
    date: '2026-05-29',
    title: '（待填写）',
    summary: '待填写',
    challengeUrl: 'https://learn.cylabacademy.org/library/748?page=1&difficulty=2',
    platform: 'cylabacademy',
    difficulty: 2,
    solvers: ['luna'],
    story: { crimeScene: '', trap: '', deduction: '', commands: '', lesson: '' },
    tags: [],
  },

  // ── #018 — May 30 ─────────────────────────────────────────────────────────
  {
    id: '018-may30',
    caseNumber: 18,
    date: '2026-05-30',
    title: '（待填写）',
    summary: '待填写',
    challengeUrl: 'https://learn.cylabacademy.org/library/760?page=1&search=Smart_Overflow:',
    platform: 'cylabacademy',
    difficulty: 3,
    solvers: ['luna', 'wayne'],
    story: { crimeScene: '', trap: '', deduction: '', commands: '', lesson: '' },
    tags: [],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function getCtfCaseById(id: string): CtfCase | undefined {
  return ctfCases.find(c => c.id === id);
}

export function getCtfCaseByNumber(n: number): CtfCase | undefined {
  return ctfCases.find(c => c.caseNumber === n);
}

export function getPublishedCases(): CtfCase[] {
  return ctfCases.filter(c => c.story.crimeScene !== '');
}
