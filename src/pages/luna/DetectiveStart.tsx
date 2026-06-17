import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';

const steps = [
  {
    step: '01',
    emoji: '🔗',
    title: '注册 picoCTF 账号',
    body: '免费注册，不需要任何编程基础。我们大部分题目都在这个平台上。',
    link: { label: '去注册', href: 'https://picoctf.org/' },
  },
  {
    step: '02',
    emoji: '📋',
    title: '打开"兔子侦探模板"',
    body: '每解一道题，用这个模板记录下来：犯罪现场、陷阱、推理过程、命令、结论。这是 Luna 用的同款模板。',
    link: null,
  },
  {
    step: '03',
    emoji: '🔍',
    title: '选一个案件，先读故事',
    body: '不用急着做题。先切换到"侦探故事"模式读完，理解思路。再切换到"教程模式"看提示，最后去平台上自己试。',
    link: { label: '查看案件列表', href: '/luna/detective' },
  },
  {
    step: '04',
    emoji: '🧰',
    title: '工具准备',
    body: '大多数题目只需要浏览器。进阶题目会用到终端（Terminal）。Mac 自带，Windows 用 WSL 或 Git Bash。',
    link: null,
  },
  {
    step: '05',
    emoji: '🏆',
    title: '提交 Flag 拿分',
    body: 'Flag 通常长这样：picoCTF{...}。找到它，填进 picoCTF 的提交框，得分！',
    link: null,
  },
];

const template = `## 🔍 案件记录模板

**案件名称：** ___________
**日期：** ___________
**平台/链接：** ___________
**难度（1-3星）：** ___________

---

### 犯罪现场
题目描述了什么？旗帜可能藏在哪里？

___________

---

### 陷阱
最容易被骗到的地方是什么？

___________

---

### 推理过程
我是怎么想到解法的？

___________

---

### 解题命令
\`\`\`
（把用到的终端命令或操作步骤写在这里）
\`\`\`

---

### 走过的弯路（可选）
哪些思路是死路？

___________

---

### 结论 / 今天学到了
___________

---

**最终 Flag：** \`picoCTF{...}\`
`;

export default function DetectiveStart() {
  return (
    <div className="space-y-12 max-w-3xl mx-auto">

      {/* Back */}
      <Link
        to="/luna/detective"
        className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-pink-500 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        回到案件列表
      </Link>

      {/* Hero */}
      <motion.header
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border-2 border-pink-100 rounded-3xl p-8 shadow-sm"
      >
        <span className="text-pink-400 text-xs font-bold uppercase tracking-widest">新手入门</span>
        <h1 className="text-4xl font-bold text-slate-900 mt-2 mb-3">从零开始破案</h1>
        <p className="text-slate-500 leading-relaxed">
          CTF（Capture The Flag）是一种网络安全竞赛。每道题藏着一个旗帜（Flag），你要用技术手段找到它。
          Luna 8岁就开始做了——你也可以。
        </p>
      </motion.header>

      {/* Steps */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900">🗺️ 五步上路</h2>
        {steps.map((s, i) => (
          <motion.div
            key={s.step}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
            className="flex gap-4 bg-white border-2 border-slate-100 hover:border-pink-200 rounded-2xl p-5 transition-all"
          >
            <div className="shrink-0 w-10 h-10 bg-pink-500 text-white rounded-xl flex items-center justify-center font-bold text-sm">
              {s.step}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">{s.emoji}</span>
                <h3 className="font-bold text-slate-900">{s.title}</h3>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">{s.body}</p>
              {s.link && (
                s.link.href.startsWith('http') ? (
                  <a
                    href={s.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 mt-2 text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                  >
                    {s.link.label} <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <Link
                    to={s.link.href}
                    className="inline-flex items-center gap-1 mt-2 text-sm text-pink-600 hover:text-pink-700 font-medium"
                  >
                    {s.link.label} →
                  </Link>
                )
              )}
            </div>
          </motion.div>
        ))}
      </section>

      {/* Template */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">📋 兔子侦探记录模板</h2>
          <p className="text-slate-500 text-sm mt-1">
            这是 Luna 每次解题后用来总结的模板。复制下去，贴进你的笔记本。
          </p>
        </div>
        <div className="relative">
          <pre className="bg-slate-900 text-slate-300 text-xs font-mono rounded-2xl p-6 overflow-x-auto leading-relaxed whitespace-pre-wrap">
            {template}
          </pre>
        </div>
      </section>

      {/* What is CTF */}
      <section className="bg-indigo-50 border-2 border-indigo-100 rounded-3xl p-8 space-y-4">
        <h2 className="text-xl font-bold text-slate-900">🤔 CTF 里会遇到什么类型的题？</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { emoji: '🔐', cat: 'Cryptography', desc: '破解加密，理解密码学原理' },
            { emoji: '🌐', cat: 'Web', desc: '找网站漏洞，读隐藏数据' },
            { emoji: '💻', cat: 'General Skills', desc: '终端命令、文件操作、编码' },
            { emoji: '🔬', cat: 'Forensics', desc: '分析文件、提取隐藏信息' },
            { emoji: '⚙️', cat: 'Binary/Pwn', desc: '程序逻辑分析，内存操作' },
            { emoji: '🔎', cat: 'Reverse Engineering', desc: '读懂已编译的程序' },
          ].map(item => (
            <div key={item.cat} className="bg-white rounded-xl p-4 flex gap-3 items-start border border-indigo-100">
              <span className="text-xl shrink-0">{item.emoji}</span>
              <div>
                <p className="font-bold text-sm text-slate-900">{item.cat}</p>
                <p className="text-xs text-slate-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-slate-500 text-sm">
          Luna 的故事以 <strong>General Skills</strong> 和 <strong>Cryptography</strong> 为主——最适合入门。
        </p>
      </section>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center py-4"
      >
        <p className="text-slate-500 text-sm mb-4">准备好了？去看第一个案件。</p>
        <Link
          to="/luna/detective"
          className="inline-flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white font-bold text-sm px-8 py-3.5 rounded-2xl shadow-sm transition-all transform hover:scale-[1.02]"
        >
          查看所有案件 →
        </Link>
      </motion.div>

    </div>
  );
}
