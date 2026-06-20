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
    id: '006-caesar-cipher',
    caseNumber: 6,
    date: '2026-05-11',
    title: '凯撒的换装',
    summary: '一段密文藏在 picoCTF{} 的括号里。它只是把每个字母换了个面孔——但有 25 张面孔，哪一张才是本来的样子？',
    platform: 'picoctf',
    difficulty: 1,
    solvers: ['luna'],
    flag: 'picoCTF{crossingtherubiconywvaddee}',

    story: {
      crimeScene: `题目给了一个文件 data.enc，打开一看，内容是：

\`\`\`
picoCTF{mbyccsxqdrobelsmyxigfknnoo}
\`\`\`

旗帜格式 \`picoCTF{...}\` 是熟悉的，但括号里面的字符串——\`mbyccsxqdrobelsmyxigfknnoo\`——完全不像英文单词。

Luna 盯着这 26 个小写字母看了一会儿：没有数字，没有下划线，没有大写，全是小写字母。这是一个非常明显的提示：**替换密码**。`,

      trap: `凯撒密码有 25 种可能的位移（shift 1 到 shift 25）。每种位移把每个字母向后移动对应的格数——比如 shift 1 把 a 变成 b，shift 16 把 m 变成 c。

最大的陷阱是：你不知道 shift 是多少。你需要把 25 种可能全部试一遍，然后用眼睛判断哪个结果有意义。

Luna 第一次尝试手动移位——很快就意识到这样太慢了。`,

      deduction: `Luna 用 Python 一次生成了全部 25 种移位结果，逐行查看。

大多数结果都是乱码——shift 1: nczddtyres...，shift 5: rgdhhxcvi...

到了 **Shift 16**：\`crossingtherubiconywvaddee\`

"Crossing the Rubicon"——这是一句历史名言，意思是"破釜沉舟，不留退路"。这是唯一一行能组成真实短语的结果。

**旗帜就是把括号里的内容用 shift 16 解码后重新包回去。**`,

      commands: `\`\`\`python
# 一次生成全部 25 种凯撒移位
c = 'mbyccsxqdrobelsmyxigfknnoo'
for i in range(1, 26):
    shifted = ''.join([chr((ord(x) - 97 + i) % 26 + 97) for x in c])
    print(f'Shift {i:2}: {shifted}')
\`\`\`

输出第 16 行：\`crossingtherubiconywvaddee\`

最终旗帜：\`picoCTF{crossingtherubiconywvaddee}\``,

      deadEnds: `手动逐个移位太慢，而且容易出错。Luna 一开始尝试手动算 shift 3、shift 5，发现没有意义，才换成 Python 一键生成全部结果。

另一个可能的误区：以为 "DECIMAL" 是什么特殊编码（因为上一道题刚做过 ASCII Decimal），其实这道题只是简单的字母替换。`,

      lesson: `**暴力枚举（brute force）不是笨办法，是合理策略。** 当可能性只有 25 种时，把 25 种全算出来，比猜测快得多。凯撒密码是最古老的密码之一，它的弱点就是密钥空间太小——25 个选项，人类肉眼就能破解。`,
    },

    tags: ['caesar', 'cipher', 'cryptography', 'brute-force', 'beginner'],
  },

  // ── #007 — May 12 ─────────────────────────────────────────────────────────
  {
    id: '007-nested-encoding',
    caseNumber: 7,
    date: '2026-05-12',
    title: '洋葱解码器',
    summary: '旗帜被包了四层外衣：Base64 → Hex → URL编码 → ROT13。每剥一层，看起来还是乱码——直到最后一层。',
    platform: 'picoctf',
    difficulty: 2,
    solvers: ['luna'],
    flag: 'picoCTF{nested_enc0ding_848a466b}',

    story: {
      crimeScene: `题目给了一段看起来像 Base64 的字符串：

\`\`\`
NjM3NjcwNjI1MDQ3NTMyNTM3NDI2MTcyNjY2NzcyNzE1ZjcyNjE3MDMwNzE3NjYxNzQ1ZjM4MzQzODZlMzQzNjM2NmYyNTM3NDQ=
\`\`\`

末尾有 \`=\` 号，这是 Base64 的经典标志。Luna 解码第一层：

\`\`\`
6376706250475332353337343236313732363636373237313566323631373033303731373636313734356633383334333836653334333633363666323533373434
\`\`\`

不是明文——是一串十六进制数字。`,

      trap: `这道题最狡猾的地方是在第二层解码之后：

第二层 Hex 解码出来：\`cvpbPGS%7Barfgrq_rap0qvat_848n466o%7D\`

乍一看，\`%7B\` 和 \`%7D\` 是 URL 编码的花括号。解完 URL 编码后得到：\`cvpbPGS{arfgrq_rap0qvat_848n466o}\`

这看起来**非常像**一个 picoCTF flag——有花括号、有格式——但前缀是 \`cvpbPGS\` 不是 \`picoCTF\`。

有人会在这里停下来，以为这就是答案。错了。`,

      deduction: `\`cvpbPGS\` 对应 \`picoCTF\`——每个字母偏移了 13 位。这是 **ROT13**，把字母表折叠一半后的替换。

Luna 把整个字符串通过 ROT13 还原：

- \`cvpbPGS\` → \`picoCTF\`
- \`arfgrq_rap0qvat_848n466o\` → \`nested_enc0ding_848a466b\`

旗帜出现了：\`picoCTF{nested_enc0ding_848a466b}\`

整个解码路径：**Base64 → Hex → URL Decode → ROT13**，像剥洋葱一样，一层一层。`,

      commands: `\`\`\`python
import base64, urllib.parse, codecs

ciphertext = "NjM3NjcwNjI1MDQ3NTMyNTM3NDI2MTcyNjY2NzcyNzE1ZjcyNjE3MDMwNzE3NjYxNzQ1ZjM4MzQzODZlMzQzNjM2NmYyNTM3NDQ="

# 第一层：Base64 解码
b64 = base64.b64decode(ciphertext).decode('utf-8')

# 第二层：Hex 转 ASCII
hex_decoded = bytes.fromhex(b64).decode('utf-8')

# 第三层：URL 解码
url_decoded = urllib.parse.unquote(hex_decoded)

# 第四层：ROT13
flag = codecs.decode(url_decoded, 'rot_13')
print(flag)
# 输出：picoCTF{nested_enc0ding_848a466b}
\`\`\``,

      deadEnds: `最经典的错误：在第三层 URL 解码后，看到 \`cvpbPGS{...}\` 以为这就是答案，直接提交——失败。

另一个陷阱：在第二层 Hex 解码时，如果手动转换，\`6e\` (n) 和 \`6f\` (o) 容易被误读，导致后续 ROT13 结果最后几位出错。工具 > 手算。`,

      lesson: `**认识编码的"签名"。** Base64 末尾有 \`=\`，Hex 只有 0-9 和 a-f，URL 编码用 \`%XX\`，ROT13 看到前缀不对。每种编码都有特征，学会识别特征，就能快速判断下一步。`,
    },

    tags: ['encoding', 'base64', 'hex', 'url-encoding', 'rot13', 'cryptography'],
  },

  // ── #008 — May 13 ─────────────────────────────────────────────────────────
  {
    id: '008-session-hijack',
    caseNumber: 8,
    date: '2026-05-13',
    title: '盗用身份',
    summary: '管理员的 session token 被明文放在一个任何人都能访问的页面上。换一个 cookie，你就成了管理员。',
    platform: 'cylabacademy',
    difficulty: 2,
    solvers: ['luna'],

    story: {
      crimeScene: `这是一个模拟社交平台。Luna 注册了普通账号，登录后看到主页。

主页上，用户 \`mary_jones_8992\` 发了一条帖子，里面提到了 \`/sessions\`。

Luna 在浏览器地址栏加上 \`/sessions\`——页面打开了，显示一张表，列出了所有活跃的 session：

| User | Token |
|------|-------|
| admin | \`SlLsuD6aCv48Rgsv_V6HazK9IATq_EhLgNHcF0hg4sc\` |
| mary_jones | \`....\` |

管理员的 session token，就在那里，明文显示。`,

      trap: `两个陷阱：

**陷阱一：找入口**。页面没有链接指向 \`/sessions\`，你必须自己猜到要访问这个路径。线索藏在普通用户的帖子里，不是 HTML 源码注释。

**陷阱二：另一个挑战给出了 webshell**，所以第一反应是打开终端找文件——但这个挑战的漏洞不在服务器端，而在**浏览器的 Cookie 存储**里。工具选错了，方向就错了。`,

      deduction: `session 的工作原理：浏览器存一个 cookie（通常叫 \`session\` 或 \`token\`），每次请求都带上它。服务器拿这个 token 查数据库，确认你是谁。

如果 token 没有过期、没有和 IP 绑定，任何人拿到 admin 的 token，就能伪装成 admin。

操作路径：
1. 打开 DevTools（F12）→ Application → Cookies
2. 找到当前的 session cookie
3. 把值改成 admin 的 token：\`SlLsuD6aCv48Rgsv_V6HazK9IATq_EhLgNHcF0hg4sc\`
4. 刷新页面——服务器认为你是 admin，旗帜出现。`,

      commands: `无需终端命令。全程通过浏览器操作：

\`\`\`
1. 访问 /sessions 页面，复制 admin 的 token

2. 打开 DevTools → Application → Storage → Cookies
   找到 session 字段，双击 Value 修改

3. 刷新页面
\`\`\`

也可以用 JavaScript 控制台：
\`\`\`javascript
document.cookie = "session=SlLsuD6aCv48Rgsv_V6HazK9IATq_EhLgNHcF0hg4sc";
location.reload();
\`\`\``,

      deadEnds: `一开始在 webshell 里翻文件目录，找了半天没有结果。因为这道题的漏洞完全在前端——session 管理没有服务器端保护，只需要替换浏览器里的 cookie。

另一个误区：尝试查看 HTML 源码找注释（Ctrl+U），而线索其实是页面上的一条普通帖子。`,

      lesson: `**"已登录" 不等于 "安全"。** Session token 是你身份的证明，如果它被泄露，任何人都可以冒充你。安全的应用必须：(1) 不暴露所有用户的 token，(2) 让 token 与 IP/设备绑定，(3) 设置合理的过期时间。`,
    },

    tutorial: {
      goal: '以管理员身份登录，获取只有 admin 才能看到的旗帜。',
      hint1: '先看看普通用户发的帖子——有没有提到某个 URL 路径？把它加到浏览器地址栏里试试。',
      hint2: '你找到了一个列出所有 session 的页面？好。打开 DevTools（F12）→ Application → Cookies，看看你自己的 session 值。',
      hint3: '把你的 session cookie 的值替换成 admin 的 token，然后刷新页面。服务器会认为你就是 admin。',
      tryIt: '注册一个账号，登录，然后查看主页上所有帖子的内容——线索就在普通用户的帖子里。',
    },

    tags: ['web', 'cookies', 'session-hijacking', 'authentication'],
  },

  // ── #009 — May 14 ─────────────────────────────────────────────────────────
  {
    id: '009-pdf-metadata',
    caseNumber: 9,
    date: '2026-05-14',
    title: '档案里的名字',
    summary: '一份 PDF 文件，正文是一堆乱码和"No flag here"。旗帜藏在没人会看的地方——文件元数据的"作者"字段，用 Base64 编码。',
    platform: 'cylabacademy',
    difficulty: 1,
    solvers: ['luna'],
    flag: 'picoCTF{puzzl3d_m3tadata_f0und!_87be60c0}',

    story: {
      crimeScene: `题目给了一个叫 \`secret.pdf\` 的文件。打开一看——

正文是一大段 Lorem Ipsum 乱文，还有一个醒目的"**Special Hidden Section**"，上面写着："No flag here."

图片？没有。隐藏文字？全选复制，没有白字。

Luna 决定换个方向：不看内容，看**文件本身的信息**。`,

      trap: `这道题的精妙之处在于它用正文"骗"你浪费时间：

- 挑衅性的"No flag here"让人忍不住继续翻正文
- Lorem Ipsum 文字密集，让人以为有什么隐写内容
- 文件里还有图片，图片隐写（steganography）是另一个诱人的方向

但旗帜早就等在一个大多数人不会主动查看的地方：**PDF 文件属性的 Author 字段**。而且它不是明文，是 Base64 编码的。`,

      deduction: `PDF 等文件格式都有"元数据"（metadata）——作者、创建时间、修改软件等。这些信息不显示在文件正文里，但用工具可以读取。

\`exiftool\` 是读取文件元数据的标准工具。运行后，Author 字段显示：

\`cGljb0NURntwdXp6bDNkX20zdGFkYXRhX2YwdW5kIV84N2JlNjBjMH0=\`

末尾有 \`=\`，是 Base64。解码后就是旗帜。`,

      commands: `\`\`\`bash
# 查看 PDF 文件元数据
exiftool secret.pdf

# 找到 Author 字段的 Base64 字符串后，解码它
echo "cGljb0NURntwdXp6bDNkX20zdGFkYXRhX2YwdW5kIV84N2JlNjBjMH0=" | base64 -d
# 输出：picoCTF{puzzl3d_m3tadata_f0und!_87be60c0}
\`\`\``,

      deadEnds: `最常见的错误路径：

1. 把整个 PDF 文字全选，找有没有白色隐藏文字——没有
2. 尝试从文件里提取图片，分析图片是否含隐写——没有
3. 逐行查找正文中是否有首字母缩写组成旗帜——没有

正确方法只需要两条命令：\`exiftool\` + \`base64 -d\`。`,

      lesson: `**在法证分析中，先查元数据，再看内容。** 文件的"外壳"（创建者、软件、时间戳）往往比正文更诚实，也更容易被创建者忽视。记住这个顺序：元数据 → 文件头 → 正文内容。`,
    },

    tutorial: {
      goal: '从一个 PDF 文件中提取隐藏的旗帜。',
      hint1: '正文说"No flag here"——那旗帜在"非正文"的地方。PDF 文件有哪些属性是肉眼看不见的？',
      hint2: '试试 \`exiftool secret.pdf\` 命令，看看每个字段的值。有没有哪个字段的值看起来很奇怪、很长？',
      hint3: '找到了 Author 字段的长字符串？它末尾有 \`=\`，这是 Base64 的特征。用 \`echo "那个字符串" | base64 -d\` 解码。',
      tryIt: '下载文件，连接 webshell，运行 exiftool——不到两分钟就能拿到旗帜。',
    },

    tags: ['forensics', 'metadata', 'pdf', 'base64', 'exiftool'],
  },

  // ── #010 — May 16 ─────────────────────────────────────────────────────────
  {
    id: '010-dev-header',
    caseNumber: 10,
    date: '2026-05-16',
    title: '开发者留下的后门',
    summary: '源代码注释里藏着一条 ROT13 加密的消息。解开它，就能知道一个隐藏的 HTTP 请求头——用它绕过登录，直接拿旗帜。',
    platform: 'picoctf',
    difficulty: 2,
    solvers: ['luna'],

    story: {
      crimeScene: `一个登录页面，要求输入邮箱和密码。没有任何提示，也没有提供账号。

Luna 打开浏览器 DevTools，查看页面 HTML 源码——发现一条 HTML 注释：

\`\`\`html
<!-- ABGR: Wnpx - grzcrbenel olcnff: hfr urnqre "K-Qri-Npprff: lrf" -->
\`\`\`

不是明文，是乱码。但它有规律——字母替换，不是随机的。`,

      trap: `两个陷阱：

**陷阱一：找对目标**。这道题提供了一个 CyLab webshell 终端，很容易误以为漏洞在服务器命令行里。实际上，整个漏洞在 HTTP 请求头，webshell 只是用来发请求的工具。

**陷阱二：错误的注入方式**。看到登录表单，第一反应是 SQL 注入（email 框输入 \`' OR 1=1 --\`）。但这道题的漏洞不在输入验证，而在自定义 HTTP 头。`,

      deduction: `那段注释是 ROT13 加密的：把每个字母移动 13 位。

解密后：\`NOTE: Jack - temporary bypass: use header "X-Dev-Access: yes"\`

也就是说，开发者 Jack 给自己留了个后门：只要在 HTTP 请求里加上 \`X-Dev-Access: yes\` 这个自定义请求头，就能绕过登录验证。

Luna 用浏览器 JavaScript 控制台构造了一个带这个请求头的 POST 请求，旗帜以 JSON 格式返回。`,

      commands: `\`\`\`javascript
// 在浏览器 DevTools 控制台执行
fetch('/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'X-Dev-Access': 'yes'
    },
    body: JSON.stringify({
        email: 'ctf-player@picoctf.org',
        password: 'any'
    })
})
.then(response => response.json())
.then(data => console.log(data));
\`\`\``,

      deadEnds: `1. 尝试 SQL 注入登录框（\`' OR 1=1 --\`）——服务器拒绝，因为漏洞不在这里
2. 用 Ctrl+U 查看父页面源码找注释——线索在被隔离的挑战实例页面上，不在父框架里
3. 尝试用 curl 命令行发请求——可以，但注意要在挑战页面的 fetch 上下文里发送`,

      lesson: `**开发者留下的"临时后门"是真实存在的安全漏洞。** 测试代码、调试路由、临时 bypass 标志——这些东西经常意外地被推送到生产环境。在真实渗透测试中，查看 HTML 注释、JS 文件、API 路由是标准侦察步骤。`,
    },

    tutorial: {
      goal: '不用账号密码，直接绕过登录，获取旗帜。',
      hint1: '打开 DevTools，查看页面 HTML 源码（Ctrl+U 或右键查看源码）。有没有看到什么 HTML 注释（\`<!-- ... -->\`）？',
      hint2: '注释里的内容是 ROT13 加密的。ROT13 把字母移动 13 位，在线工具或 Python \`codecs.decode(text, "rot_13")\` 可以解密。',
      hint3: '解密后你会看到一个自定义 HTTP 请求头的名称和值。用浏览器控制台的 \`fetch()\` 发一个带这个请求头的 POST 请求到 \`/login\`。',
      tryIt: '先在 DevTools 里找 HTML 注释，解密它，然后用 JavaScript console 发送带那个特殊 header 的请求。',
    },

    tags: ['web', 'http-headers', 'rot13', 'source-code', 'authentication-bypass'],
  },

  // ── #011 — May 17 ─────────────────────────────────────────────────────────
  {
    id: '011-smart-overflow',
    caseNumber: 11,
    date: '2026-05-17',
    title: '区块链溢出',
    summary: '一个以太坊智能合约用余额大小来控制权限。旧版 Solidity 有个算术 bug：当数字超过最大值时，它会归零。用这个漏洞，让余额"溢出"成 1。',
    challengeUrl: 'https://learn.cylabacademy.org/library/756?page=1&difficulty=2',
    platform: 'cylabacademy',
    difficulty: 3,
    solvers: ['luna'],
    flag: 'picoCTF{Sm4r7_0verFl0ws_ExI5t_abeec303}',

    story: {
      crimeScene: `一个部署在测试链上的以太坊智能合约。合约里有个条件：

\`\`\`solidity
if (balances[msg.sender] < amount) {
    // 条件通过，触发 revealed = true
}
\`\`\`

逻辑是：如果你的余额 **小于** 存入金额，条件就通过。

听起来很反直觉——正常情况下，存入 X 后余额至少是 X，永远不会小于 X。

但合约用的是旧版 Solidity（0.8.0 之前），那时候整数是"不带安全检查"的。`,

      trap: `**整数溢出（Integer Overflow）**：在旧版 Solidity 里，\`uint256\` 的最大值是 2^256 - 1。如果你的余额已经是这个最大值，再存入哪怕 1 wei，它就会"绕回"变成 0。

合约的检查逻辑：余额(0) < 存入(2) → **条件成立！**

问题是，在 webshell 里安装 web3.py 库会触发 "Killed" 错误——服务器内存不够，安装进程被强制终止。`,

      deduction: `分两步：

**第一步**：先存入 \`2^256 - 1\` wei（uint256 的最大值），把余额填满。

**第二步**：再存入 2 wei。余额从最大值加 2，溢出归零后变成 1。此时 \`1 < 2\`，条件通过，\`revealed = true\`。

然后调用 \`getFlag()\` 函数，旗帜从区块链上读出来。

内存问题用特殊安装命令解决：加 \`--no-cache-dir --only-binary=:all:\` 标志，让 pip 下载预编译包，不在内存里编译。`,

      commands: `\`\`\`bash
# 绕过内存限制安装 web3
pip3 install web3 --no-cache-dir --only-binary=:all:

# 写入 Python 脚本
cat << 'EOF' > solve.py
from web3 import Web3

w3 = Web3(Web3.HTTPProvider("合约RPC地址"))
account = w3.eth.account.from_key("你的私钥")
contract = w3.eth.contract(address="合约地址", abi=[...])

# 第一步：存入 uint256 最大值
max_val = 2**256 - 1
tx = contract.functions.deposit(max_val).build_transaction({...})
w3.eth.send_raw_transaction(account.sign_transaction(tx).rawTransaction)

# 第二步：存入 2，触发溢出
tx2 = contract.functions.deposit(2).build_transaction({...})
w3.eth.send_raw_transaction(account.sign_transaction(tx2).rawTransaction)

# 第三步：读取旗帜
print(contract.functions.getFlag().call())
EOF

python3 solve.py
\`\`\``,

      deadEnds: `1. 直接用 RPC URL 在浏览器访问——区块链节点不响应普通 HTTP，需要 JSON-RPC 格式请求
2. 用普通 \`pip install web3\` 安装——webshell 内存不足，进程被杀死
3. 尝试直接提交旗帜字符串给合约——合约要求的是计算出正确答案，不是提交旗帜`,

      lesson: `**智能合约漏洞是真实的、昂贵的。** 2016 年 DAO 攻击损失 6000 万美元，2021 年多个 DeFi 协议因整数溢出损失数亿。Solidity 0.8.0 加入了自动溢出检查，但旧合约依然危险。安全地处理整数，是区块链工程师最基本的责任。`,
    },

    tutorial: {
      goal: '通过整数溢出漏洞，让合约认为你的余额小于存入金额，从而解锁 getFlag() 函数。',
      hint1: '看看合约的条件：\`balances[msg.sender] < amount\`。什么情况下，存钱之后余额反而会变小？',
      hint2: '\`uint256\` 的最大值是 2^256 - 1。如果余额是这个值，再加 1 会发生什么？',
      hint3: '先存入 \`2**256 - 1\`，再存入 2。溢出后余额变成 1，而 1 < 2，条件成立。记得用 \`--no-cache-dir --only-binary=:all:\` 安装 web3。',
      tryIt: '先读懂合约代码（题目会提供），理解 deposit 函数的逻辑，然后想想 uint256 溢出是如何改变游戏规则的。',
    },

    tags: ['blockchain', 'ethereum', 'integer-overflow', 'web3', 'solidity', 'advanced'],
  },

  // ── #012 — May 18 ─────────────────────────────────────────────────────────
  {
    id: '012-chacha-nonce-reuse',
    caseNumber: 12,
    date: '2026-05-18',
    title: '密码学的禁忌',
    summary: '同一个 nonce 用了两次——在 ChaCha20-Poly1305 里，这是致命错误。一个多项式方程，让 Luna 和 Wayne 能伪造任意消息的认证标签。',
    platform: 'picoctf',
    difficulty: 3,
    solvers: ['luna', 'wayne'],

    story: {
      crimeScene: `服务器提供了两条加密消息（明文 + 密文对），并要求提交一段能解密成特定目标字符串的密文。

服务器源码的第 13 行：

\`\`\`python
nonce = secrets.token_bytes(12)
\`\`\`

nonce（随机数）只生成了一次，然后用来加密**两条不同的消息**。

这个错误，在密码学里有个名字：**Forbidden Attack（禁忌攻击）**。`,

      trap: `看到 ChaCha20 流密码 + 已知明文对，第一反应是"位翻转攻击"——直接 XOR 构造伪造密文。

但这道题用的是 **ChaCha20-Poly1305**，加了 Poly1305 认证码（MAC）。如果你只伪造密文，Poly1305 标签就会失效，服务器会在验证阶段直接拒绝请求。

想绕过 Poly1305，需要数学——在有限域上解多项式方程。`,

      deduction: `Poly1305 的标签计算公式是：\`Tag = Poly(密文, r) + s mod p\`，其中 r 和 s 是从 nonce 派生的秘密值。

nonce 复用意味着两条消息用了**完全相同的 r 和 s**。

用两条消息的标签相减：\`Tag1 - Tag2 = Poly(密文1, r) - Poly(密文2, r)\`

这消掉了未知的 s，剩下只含 r 的多项式方程。求解这个方程（用 sympy 的有限域因式分解），得到 r，再代入求 s。

有了 r 和 s，就能为任意伪造密文计算出正确的 Poly1305 标签。`,

      commands: `\`\`\`python
from Crypto.Cipher import ChaCha20_Poly1305
import sympy, struct

# 步骤 1：从两对明文/密文中恢复密钥流
# keystream = plaintext1 XOR ciphertext1
keystream = bytes(a ^ b for a, b in zip(plaintext1, ciphertext1))

# 步骤 2：伪造目标密文
goal = b"But it's only secure if used correctly!"
forged_ct = bytes(a ^ b for a, b in zip(goal, keystream))

# 步骤 3：用 sympy 在有限域上分解多项式，恢复 r
# ... (建立 Poly1305 多项式方程，求根)

# 步骤 4：计算伪造 tag，发送
# payload = forged_ct + forged_tag + nonce
\`\`\``,

      deadEnds: `1. 只伪造密文，不伪造 Poly1305 标签——服务器在 \`decrypt_and_verify()\` 阶段直接报错
2. 用 \`sympy.roots()\` 求解多项式——sympy 高层接口无法处理超大有限域，返回空结果。需要用低层的 \`gf_factor()\`
3. 忘记 Poly1305 的 padding 规则（每 16 字节 block 末尾加 \`0x01\`）——多项式参数错误，解出的 r 无效`,

      lesson: `**Nonce（随机数）只能用一次。** 这不是建议，是安全协议的生命线。ChaCha20-Poly1305、AES-GCM 都依赖 nonce 唯一性。一旦复用，认证机制就会被数学完全击碎。这就是它叫 "Forbidden Attack" 的原因。`,
    },

    tags: ['cryptography', 'chacha20', 'poly1305', 'nonce-reuse', 'forbidden-attack', 'advanced'],
  },

  // ── #013 — May 20 ─────────────────────────────────────────────────────────
  {
    id: '013-heap-dump',
    caseNumber: 13,
    date: '2026-05-20',
    title: '内存快照',
    summary: '服务器有一个对外开放的诊断接口，可以下载整个 Node.js 内存快照。旗帜就存在内存里，用 grep 从几百 MB 的二进制文件里找出来。',
    platform: 'picoctf',
    difficulty: 2,
    solvers: ['luna'],

    story: {
      crimeScene: `一个 Node.js web 服务，主页什么都没有。

Luna 注意到题目描述提到了"API 文档"。她在浏览器里找到了 Swagger UI（\`/api-docs/\`），打开后看到一列 API 路由——其中有一个：

\`\`\`
GET /heapdump
\`\`\`

在"Diagnosing"分类下，没有任何权限要求。任何人都可以调用。

这个接口会让服务器把整个堆内存的快照打包下载下来。`,

      trap: `**找 Swagger 的路径**：直接用 \`curl http://[server]/api-docs | grep heapdump\` 得不到结果——Swagger UI 是动态渲染的 HTML，curl 拿到的是空壳。必须在浏览器里打开，才能看到所有 API。

**读取快照**：下载的 \`.heapsnapshot\` 文件是几十 MB 的二进制数据，用 \`cat\` 命令会让终端输出乱码，甚至让 shell 崩溃。需要用 \`grep -a\` 模式处理二进制文件。`,

      deduction: `Node.js 运行时把变量、字符串、对象都存在堆内存里。heapdump 是完整的内存镜像，如果服务器代码把旗帜存在某个变量里，它就在堆里。

\`grep -a -oE\` 组合：\`-a\` 把二进制文件当文本处理，\`-oE\` 用正则表达式提取匹配内容。模式 \`picoCTF{.*?}\` 能精确定位旗帜格式。`,

      commands: `\`\`\`bash
# 下载内存快照
wget http://verbal-sleep.picoctf.net:64295/heapdump -O dump.heapsnapshot

# 从二进制文件里提取旗帜
grep -a -oE "picoCTF{.*?}" dump.heapsnapshot
\`\`\``,

      deadEnds: `1. 用 curl 扫描 Swagger 路径——Swagger UI 动态渲染，grep 找不到内容
2. 直接 \`cat dump.heapsnapshot\`——终端被二进制乱码淹没，看不到任何东西
3. 尝试用 heapdump 分析工具（如 Chrome DevTools）打开——文件太大，而且 webshell 里没有 GUI`,

      lesson: `**诊断接口不应该对外开放。** \`/heapdump\`、\`/metrics\`、\`/debug\`、\`/env\`——这些在开发阶段很方便，在生产环境就是安全漏洞。内存快照可能包含密钥、session token、用户数据。生产环境的诊断接口必须要求认证，或者根本不部署。`,
    },

    tutorial: {
      goal: '找到并下载服务器的内存快照，从中提取旗帜。',
      hint1: '题目说有 API 文档。在浏览器里访问 \`/api-docs/\`（注意末尾斜杠），看看有什么 API 端点。',
      hint2: '找到 \`/heapdump\` 端点了吗？用 wget 下载它：\`wget [服务器地址]/heapdump -O dump.heapsnapshot\`',
      hint3: '文件是二进制的，不能直接 cat。用 \`grep -a -oE "picoCTF\\{.*?\\}" dump.heapsnapshot\` 直接搜索旗帜格式。',
      tryIt: '先在浏览器里找到 API 文档，记下 heapdump 的完整路径，然后切换到 webshell 下载和搜索。',
    },

    tags: ['web', 'node-js', 'heap-dump', 'forensics', 'api'],
  },

  // ── #014 — May 21 ─────────────────────────────────────────────────────────
  {
    id: '014-flag-hunters',
    caseNumber: 14,
    date: '2026-05-21',
    title: '解释器的后门',
    summary: '一个自定义脚本解释器把用户输入直接存回数组，没有任何过滤。在输入里加一个分号，就能注入一条指令——让程序"倒回"到起点，读出本该被跳过的旗帜。',
    platform: 'picoctf',
    difficulty: 2,
    solvers: ['luna'],

    story: {
      crimeScene: `一个运行"歌词脚本"的程序，流程是：

1. 从 \`[VERSE1]\` 标签开始执行（跳过开头）
2. 到了 \`[REFRAIN]\` 部分，提示用户输入一段"观众回应"
3. 把输入内容存进数组，然后继续

旗帜存在脚本最开头的 \`secret_intro\` 变量里——但程序从 \`[VERSE1]\` 开始，根本不打印那部分。

Luna 需要想办法让程序"跳回"到第 0 行。`,

      trap: `**等待的焦虑**：输入 \`;RETURN 0\` 后，程序没有立刻有反应。等了几秒钟，Luna 以为命令失败了。

实际上，这个 payload 被存进了数组——它不是立即执行的，而是在程序**下一次读到那一行**时才会被解析。程序里有 \`time.sleep(0.5)\` 让每行歌词之间有停顿，所以效果会延迟出现。

有人在这里反复重试、以为出错，其实只需要等一等。`,

      deduction: `解释器的关键逻辑：

\`\`\`python
song_lines[lip] = 'Crowd: ' + crowd  # 存入用户输入
\`\`\`

然后在下一循环里：
\`\`\`python
parts = song_lines[lip].split(';')   # 用分号分割成多条指令
\`\`\`

输入 \`;RETURN 0\`，存入后变成 \`Crowd: ;RETURN 0\`。

再次读到这行时，split(';') 分出两条指令：
1. 执行：\`Crowd: \`（打印空字符串）
2. 执行：\`RETURN 0\`（把 lip 重置为索引 0）

程序从头开始，打印 \`secret_intro\`，旗帜出现。`,

      commands: `\`\`\`
# 程序运行后，在 "Crowd:" 提示处输入：
;RETURN 0
\`\`\`

然后等待程序循环到下一次读取那行——旗帜就会自动打印出来。`,

      deadEnds: `1. 输入 \`RETURN 0\`（没有前置分号）——被当成普通文字存入，没有触发指令
2. 尝试直接输入 \`secret_intro\` 或变量名——不是 Python shell，无法读取变量
3. 输入后立刻 Ctrl+C 中断——payload 存入了但还没来得及执行`,

      lesson: `**永远不要把用户输入直接存入可执行的数据结构。** 代码和数据必须分离。这道题的漏洞叫"存储型注入"（Stored Injection）——用户的输入被存起来，之后被解释执行。SQL 注入、XSS、这道题，都是同一个根本问题：混淆了"数据"和"指令"的边界。`,
    },

    tutorial: {
      goal: '让程序执行到 secret_intro 部分，打印出被隐藏的旗帜。',
      hint1: '程序从 [VERSE1] 开始执行，跳过了开头。有没有办法让 lip（行指针）回到 0？查看程序有哪些内置指令。',
      hint2: '注意 split(\';\')——用户输入里如果有分号，会被解析为多条指令。试试在输入开头加一个分号。',
      hint3: '输入 \`;RETURN 0\`，然后耐心等待几秒。payload 是存储型的，不会立即触发——它在下一次循环里才被解析。',
      tryIt: '运行程序，到达 Crowd: 提示时，输入 \`;RETURN 0\`，然后等待。',
    },

    tags: ['injection', 'interpreter', 'stored-injection', 'logic', 'code-execution'],
  },

  // ── #015 — May 22 ─────────────────────────────────────────────────────────
  {
    id: '015-hashcrack',
    caseNumber: 15,
    date: '2026-05-22',
    title: '哈希的弱点',
    summary: '服务器发来一串哈希值，要求在几秒内提交对应的明文——MD5、SHA-1、SHA-256 轮流来。有些密码太常见，数据库里早就有答案。',
    platform: 'picoctf',
    difficulty: 1,
    solvers: ['luna'],

    story: {
      crimeScene: `连接服务器，提示出现：

\`\`\`
Please crack this hash: 482c811da5d5b4bc6d497ffa98491e38
\`\`\`

32 个十六进制字符——这是 MD5。然后 SHA-1（40位），SHA-256（64位），一个接一个。

每个哈希给你几秒钟输入正确明文，输错或超时直接断连：\`Incorrect. Goodbye.\`

Luna 需要快速把哈希反查出对应的密码。`,

      trap: `**哈希是单向的**——理论上不能从哈希反推原文。但如果原文是一个常见密码（比如 \`password123\`），它的哈希早就被提前算好存在数据库里了。

**陷阱是会话状态**：连接断开后再重连，哈希值会变。如果你在外面查到了某个哈希的答案，但连接已经超时，这个答案就没用了——要重新连、重新查。

Luna 第一次就犯了这个错：先断开连接，拿着查到的答案再连，结果哈希已经换了。`,

      deduction: `MD5 \`482c811da5d5b4bc6d497ffa98491e38\` → 在 CrackStation 等在线哈希数据库里查询 → 明文是 \`password\`。

这类网站存储了数十亿条"明文 → 哈希"的预计算映射（彩虹表）。只要明文是常见词、常见密码，瞬间就能查到。

关键是：**保持 nc 连接不断开**，在同一个终端里用另一个窗口查询，然后立刻粘贴回去。`,

      commands: `\`\`\`bash
# 保持连接打开，在另一个终端查询
nc verbal-sleep.picoctf.net 55127

# 常用在线工具（浏览器）：
# https://crackstation.net/
# https://md5decrypt.net/

# 或者终端查询（如果是常见密码）：
echo -n "password" | md5sum   # 验证是否匹配
\`\`\``,

      deadEnds: `1. 断开连接，在外面查哈希，再重连——新连接给的是新哈希，之前查的答案没用
2. 相信 AI 猜测的密码（\`fortissimo\`, \`password123\`）——AI 容易"编造"答案，要用真实数据库验证
3. 尝试用 hashcat 本地破解——对于常见密码完全没必要，在线数据库瞬间就有答案`,

      lesson: `**常见密码是不安全的，即使加了哈希。** MD5/SHA-1 这类哈希函数不是为密码设计的——它们太快了。现代密码存储应该用 bcrypt、Argon2 等慢速哈希，加盐（salt）防止彩虹表攻击。"我用了 MD5 加密" 不等于 "我的密码安全"。`,
    },

    tutorial: {
      goal: '在连接不断开的情况下，把服务器给的每个哈希快速反查出明文，依次提交。',
      hint1: '32 位十六进制 = MD5，40 位 = SHA-1，64 位 = SHA-256。先确定哈希类型。',
      hint2: '去 CrackStation（crackstation.net）粘贴哈希值查询。常见密码几乎都在数据库里。',
      hint3: '关键：nc 连接保持开着，在浏览器里查，查到了立刻回终端粘贴。如果连接断了就要重连，哈希会变。',
      tryIt: '先连上服务器，看看哈希值有多长，确定类型，然后用 CrackStation 查询。',
    },

    tags: ['cryptography', 'hash', 'md5', 'sha1', 'password-cracking', 'rainbow-table'],
  },

  // ── #016 — May 23 ─────────────────────────────────────────────────────────
  {
    id: '016-source-code',
    caseNumber: 16,
    date: '2026-05-23',
    title: '源码里的秘密',
    summary: '右键"查看页面源代码"——旗帜就在 HTML 注释或 JavaScript 里，没有任何混淆。有时候最简单的方法就是最有效的。',
    platform: 'picoctf',
    difficulty: 1,
    solvers: ['luna'],

    story: {
      crimeScene: `一个看起来完全正常的网页，页面上什么都没有——标题、文字，没有旗帜，没有提示。

Luna 的第一反应：Ctrl+U（查看页面源代码）。

源代码打开，滚动到底部——在 \`</body>\` 标签附近，有一段 HTML 注释：

\`\`\`html
<!-- flag is here: picoCTF{...} -->
\`\`\`

就这样。`,

      trap: `这道题没有什么实质性陷阱，但它测试的是一个习惯：**查看源代码是基本操作，不是最后手段**。

真正的问题是心态——看到一个什么都没有的页面，很多人会去猜"是不是要注入什么"、"是不是有隐藏 API"，而不是先做最简单的检查。

另一个轻微的坑：区分**挑战实例页面**和 **CyLab 平台父页面**。右键源码要在挑战本身的 iframe 里点，而不是外层平台页面。`,

      deduction: `没有复杂的推理。网页的 HTML 源代码是客户端可以直接读取的——服务器把 HTML 发给浏览器，浏览器显示渲染后的结果，但原始 HTML 依然完整地存在。

开发者忘记删除包含旗帜的调试注释，或者故意把旗帜放在源码里作为挑战，都是这类题目的来源。`,

      commands: `\`\`\`
# 浏览器：Ctrl+U（Windows/Linux）或 Cmd+Option+U（Mac）

# 或者 DevTools：F12 → Elements 标签 → 搜索 picoCTF

# 或者命令行：
curl -s http://[挑战地址] | grep -i "picoctf"
\`\`\``,

      lesson: `**侦察的第一步永远是最简单的那个。** Web 安全的入门清单：
1. 查看页面源代码（Ctrl+U）
2. 看 DevTools Console 有没有报错
3. 查看 Network 请求和响应
4. 查看 Cookies 和 LocalStorage

在尝试任何复杂技术之前，先走完这个清单。`,
    },

    tags: ['web', 'source-code', 'html-comments', 'beginner', 'reconnaissance'],
  },

  // ── #017 — May 29 ─────────────────────────────────────────────────────────
  {
    id: '017-nano-privesc',
    caseNumber: 17,
    date: '2026-05-29',
    title: '文本编辑器的后门',
    summary: 'sudo 只允许以 root 权限打开一个特定系统文件——但 nano 内部可以读取任意文件。root 权限的 nano，就是读取受保护旗帜文件的万能钥匙。',
    challengeUrl: 'https://learn.cylabacademy.org/library/748?page=1&difficulty=2',
    platform: 'cylabacademy',
    difficulty: 2,
    solvers: ['luna'],

    story: {
      crimeScene: `SSH 登录到远程服务器。\`flag.txt\` 就在当前目录，但读取时：

\`\`\`bash
$ cat flag.txt
cat: flag.txt: Permission denied
\`\`\`

文件属于 root，普通用户 ctf-player 没有读取权限。

Luna 试了 \`sudo cat flag.txt\`——

\`\`\`
Sorry, user ctf-player is not allowed to execute '/bin/cat flag.txt' as root
\`\`\`

sudo 有严格的白名单。`,

      trap: `**sudo 的白名单**：\`sudo -l\` 显示允许的命令列表：

\`\`\`
(root) NOPASSWD: /bin/nano /etc/sudoers
\`\`\`

只能以 root 权限运行 \`nano\`，而且只能打开 \`/etc/sudoers\` 这一个特定文件。

陷阱是：新手会认为这道题无解——"我只能打开 /etc/sudoers，但旗帜在 flag.txt"。

但 nano 不是一个只读工具。它是个**文本编辑器**，有内部文件操作功能。`,

      deduction: `nano 有一个组合键 **Ctrl+R**（Read File）——在编辑器内部打开另一个文件并读入缓冲区。

关键：\`nano\` 是以 **root** 权限启动的。它内部的所有操作都继承了 root 权限，包括 Ctrl+R 打开文件。

操作路径：
1. \`sudo /bin/nano /etc/sudoers\`（以 root 运行 nano）
2. 在 nano 里按 \`Ctrl+R\`（Read File 命令）
3. 输入 \`flag.txt\`，回车
4. flag.txt 内容加载进缓冲区，旗帜可见
5. \`Ctrl+X\` → \`N\`（不保存，避免破坏 /etc/sudoers）`,

      commands: `\`\`\`bash
# 第一步：以 root 权限启动 nano
sudo /bin/nano /etc/sudoers

# 在 nano 编辑器内部：
# Ctrl + R    → 触发 Read File 功能
# 输入：flag.txt
# Enter       → 旗帜内容加载到缓冲区

# 退出时：
# Ctrl + X
# 输入 N      → 不保存（保持 /etc/sudoers 完整）
\`\`\``,

      deadEnds: `1. 直接 \`nano flag.txt\`——没有 sudo，权限拒绝
2. \`sudo nano flag.txt\`——白名单不允许这个路径组合
3. 尝试从 nano 里执行 shell 命令——nano 的 \`^T\` 只在某些版本有 spell check 执行，不通用`,

      lesson: `**工具的权限就是你的权限。** 如果 sudo 允许你用 root 运行某个程序，那个程序的**一切内部操作**都以 root 身份执行——包括它的插件、文件访问、子进程。 \`nano\`、\`vim\`、\`less\`、\`more\`、\`python\` 等工具都可以被用来读写文件或执行 shell，这是真实渗透测试中的经典提权路径，在 GTFOBins 网站有完整记录。`,
    },

    tutorial: {
      goal: '以 root 权限读取普通用户无法访问的 flag.txt 文件。',
      hint1: '先运行 \`sudo -l\`，看看你被允许以 root 运行什么命令。结果只有一行——仔细看。',
      hint2: '你只能以 root 运行 \`nano /etc/sudoers\`。但 nano 是一个编辑器，它有内部快捷键可以打开其他文件。',
      hint3: '用 \`sudo /bin/nano /etc/sudoers\` 打开 nano，然后按 Ctrl+R，输入 \`flag.txt\`，回车。退出时按 Ctrl+X 再按 N（不保存）。',
      tryIt: '先 SSH 登录，运行 sudo -l 看白名单，然后思考那个允许的命令有什么"内置功能"可以借用。',
    },

    tags: ['linux', 'privilege-escalation', 'sudo', 'nano', 'gtfobins'],
  },

  // ── #018 — May 30 ─────────────────────────────────────────────────────────
  {
    id: '018-kubernetes-secret',
    caseNumber: 18,
    date: '2026-05-30',
    title: '集群里的秘密',
    summary: 'Kubernetes 把密钥存在 "Secret" 资源里——但 Secret 不等于加密，只是 Base64 编码。找到正确的 namespace，就能读出旗帜。',
    platform: 'cylabacademy',
    difficulty: 2,
    solvers: ['luna'],

    story: {
      crimeScene: `题目给了一个 Kubernetes 集群的访问配置文件（kubeconfig）。Luna 需要连接这个集群，找到旗帜。

集群使用了自签名 TLS 证书，标准的 kubectl 命令会因为证书验证失败而拒绝连接：

\`\`\`
Error: Get "https://[cluster]/api": tls: failed to verify certificate
\`\`\`

第一个障碍：绕过 TLS 证书验证。`,

      trap: `**两个陷阱叠加**：

**陷阱一：TLS 证书**。每条 kubectl 命令都需要加 \`--insecure-skip-tls-verify\`，否则直接报错。新手往往只在第一条命令加了，后续命令又忘了。

**陷阱二："Secret" 是 Base64，不是加密**。用 kubectl 导出 Secret 资源后，data 字段里的值看起来像乱码——其实只是 Base64 编码。直接命令行管道提取时，输出可能因为终端换行等原因产生错误字符。最安全的方法是手动复制 Base64 字符串再解码。`,

      deduction: `Kubernetes Secret 的设计：把敏感数据存在集群里，以便 Pod 挂载使用。数据用 Base64 编码存储（不是加密），所以有权限读 Secret 的人都能轻松解码。

侦察步骤：
1. 设置 KUBECONFIG 环境变量指向下载的配置文件
2. 枚举所有 namespace 的 Secret
3. 找到 \`picoctf\` namespace 下的 \`ctf-secret\`
4. 导出 YAML，找到 \`data.flag\` 字段
5. Base64 解码，旗帜出现`,

      commands: `\`\`\`bash
# 下载集群配置
wget -O kubeconfig "[题目提供的URL]"

# 设置配置
export KUBECONFIG=$PWD/kubeconfig

# 枚举所有 namespace 的 Secret（绕过自签名证书）
kubectl get secrets -A --insecure-skip-tls-verify

# 导出目标 Secret
kubectl get secret ctf-secret -n picoctf -o yaml --insecure-skip-tls-verify

# 手动复制 data.flag 的 Base64 值，再解码
echo "cGljb0NURntzZWNyZXRzX2FyZV9rZXB0X3NhZmVfd2l0aF9rOHNfMjZiMWY5ZmN9" | base64 -d
# 输出：picoCTF{secrets_are_kept_safe_with_k8s_26b1f9fc}
\`\`\``,

      deadEnds: `1. 不加 \`--insecure-skip-tls-verify\`——每条命令都报证书错误
2. 用管道直接 \`kubectl ... | base64 -d\`——kubectl 的输出格式里含有字段名、空格等，decode 后会出现乱码，旗帜最后几位错误
3. 以为 Secret 是加密的，尝试找密钥——Kubernetes Secret 默认不加密，只是 Base64`,

      lesson: `**Kubernetes Secret 不是加密存储。** 如果集群配置权限不当，任何有 \`get secret\` 权限的账户都能读出所有密钥——包括数据库密码、API 密钥、TLS 证书私钥。生产环境应该用 etcd 加密 + RBAC 最小权限 + 外部密钥管理（如 Vault）来真正保护 Secret。`,
    },

    tutorial: {
      goal: '从 Kubernetes 集群中找到并解码存储在 Secret 资源里的旗帜。',
      hint1: '下载 kubeconfig 文件后，设置 \`export KUBECONFIG=$PWD/kubeconfig\`。然后用 \`kubectl get secrets -A --insecure-skip-tls-verify\` 查看所有 Secret。',
      hint2: '找到 \`picoctf\` namespace 里的 \`ctf-secret\`？用 \`kubectl get secret ctf-secret -n picoctf -o yaml --insecure-skip-tls-verify\` 看内容。',
      hint3: '\`data.flag\` 字段的值是 Base64 编码的。手动复制那个字符串（不要用管道，避免乱码），用 \`echo "..." | base64 -d\` 解码。',
      tryIt: '下载 kubeconfig，设置环境变量，然后枚举 Secret，逐步缩小到目标资源。',
    },

    tags: ['kubernetes', 'k8s', 'cloud', 'base64', 'secrets-management', 'devops'],
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
