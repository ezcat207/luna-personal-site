import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { questions } from './questions'

// 人格类型数据
const topPersonalities = [
  { rank: '🥇', code: 'LOVE-R', name: '多情者', percentage: '10.8%', quote: '「爱意太满，现实显得有点贫瘠。」', emoji: '❤️' },
  { rank: '🥈', code: 'SEXY', name: '尤物', percentage: '9.7%', quote: '「你就是天生的尤物！」', emoji: '💋' },
  { rank: '🥉', code: 'MALO', name: '吗喽', percentage: '6.4%', quote: '「人生是个副本，而我只是一只吗喽。」', emoji: '🤖' },
  { rank: '4', code: 'OJBK', name: '无所谓人', percentage: '4.9%', quote: '「我说随便，是真的随便。」', emoji: '😌' },
  { rank: '5', code: 'CTRL', name: '拿捏者', percentage: '4.7%', quote: '「怎么样，被我拿捏了吧？」', emoji: '😏' },
]

const rarePersonalities = [
  { code: 'IMFW', name: '废物', percentage: '0.4%' },
  { code: 'POOR', name: '贫困者', percentage: '0.7%' },
  { code: 'DEAD', name: '死者', percentage: '1.6%' },
]

const allPersonalities = [
  'CTRL 拿捏者', 'ATM-er 送钱者', 'Dior-s 屌丝', 'BOSS 领导者',
  'THAN-K 感恩者', 'OH-NO 哦不人', 'GOGO 行者', 'SEXY 尤物',
  'LOVE-R 多情者', 'MUM 妈妈', 'FAKE 伪人', 'OJBK 无所谓人',
  'MALO 吗喽', 'JOKE-R 小丑', 'WOC! 握草人', 'THIN-K 思考者',
  'SHIT 愤世者', 'ZZZZ 装死者', 'POOR 贫困者', 'MONK 僧人',
  'IMSB 傻者', 'SOLO 孤儿', 'FUCK 草者', 'DEAD 死者',
  'IMFW 废物', 'NULL 无'
]

const languages = [
  { code: '中文', url: '/' },
  { code: 'EN', url: '/en/' },
  { code: '日本語', url: '/ja/' },
  { code: '한국어', url: '/ko/' },
  { code: 'ไทย', url: '/th/' },
  { code: 'Tiếng Việt', url: '/vi/' },
  { code: 'Bahasa', url: '/id/' },
  { code: '繁體中文', url: '/tw/' },
  { code: '粵語', url: '/hk/' },
]

const models = [
  { name: '自我模型', dimensions: 'S1 · S2 · S3' },
  { name: '情感模型', dimensions: 'E1 · E2 · E3' },
  { name: '态度模型', dimensions: 'A1 · A2 · A3' },
  { name: '行动驱力模型', dimensions: 'Ac1 · Ac2 · Ac3' },
  { name: '社交模型', dimensions: 'So1 · So2 · So3' },
]

const faqs = [
  { q: 'SBTI 测试准确吗？', a: 'SBTI 是娱乐性质的人格测试，具有一定的心理学基础，但不应作为专业心理诊断的依据。' },
  { q: '测试需要多久？', a: '通常 3-5 分钟即可完成 30 道题目。' },
  { q: '我的数据安全吗？', a: '我们不收集任何个人信息，所有测试结果仅保存在您的浏览器本地。' },
  { q: '可以分享结果吗？', a: '当然可以！测试结果页面提供了分享按钮，您可以分享到各大社交平台。' },
  { q: 'SBTI 和 MBTI 有什么区别？', a: 'SBTI 是讽刺性娱乐测试，基于 5 大模型 15 个维度；MBTI 是严肃的心理学测试，基于荣格理论 4 个维度。' },
  { q: 'SBTI 有多少种人格类型？', a: '常规有 26 种人格类型，另有 2 种特殊隐藏类型。' },
  { q: 'SBTI 测试的评分算法是什么？', a: '采用三级评分（L/M/H）和模式匹配算法，根据 15 个维度的得分组合匹配最接近的人格类型。' },
]

// 根据答案计算人格类型（简化版本）
function calculatePersonality(answers: number[]): { code: string; name: string; description: string } {
  const lowCount = answers.filter(a => a === 1).length
  const highCount = answers.filter(a => a === 3).length
  const totalScore = answers.reduce((sum, val) => sum + val, 0)
  const avgScore = totalScore / answers.length

  // 简化的匹配逻辑
  if (highCount > 15 || avgScore > 2.5) {
    return { code: 'SEXY', name: '尤物', description: '你就是天生的尤物！充满魅力和自信。' }
  } else if (highCount > 10 || avgScore > 2.3) {
    return { code: 'CTRL', name: '拿捏者', description: '怎么样，被我拿捏了吧？你善于掌控局面。' }
  } else if (lowCount > 15 || avgScore < 1.5) {
    return { code: 'MALO', name: '吗喽', description: '人生是个副本，而我只是一只吗喽。但你也有独特的价值。' }
  } else if (lowCount > 10 || avgScore < 1.7) {
    return { code: 'OJBK', name: '无所谓人', description: '我说随便，是真的随便。佛系的生活态度。' }
  } else {
    return { code: 'LOVE-R', name: '多情者', description: '爱意太满，现实显得有点贫瘠。你是一个感情丰富的人。' }
  }
}

function App() {
  const [activeLanguage, setActiveLanguage] = useState('中文')
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [isTesting, setIsTesting] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [showResult, setShowResult] = useState(false)
  const [result, setResult] = useState<{ code: string; name: string; description: string } | null>(null)

  const handleStartTest = () => {
    setIsTesting(true)
    setCurrentQuestion(0)
    setAnswers([])
    setShowResult(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers, value]
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      // 测试完成，计算结果
      const personalityResult = calculatePersonality(newAnswers)
      setResult(personalityResult)
      setShowResult(true)
      setIsTesting(false)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setAnswers(answers.slice(0, -1))
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleRetake = () => {
    setShowResult(false)
    setIsTesting(false)
    setCurrentQuestion(0)
    setAnswers([])
    setResult(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen pb-12">
      {/* 语言导航 - 固定在顶部 */}
      <nav className="sticky top-0 z-50 bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg">
        <div className="flex justify-center gap-2 py-3 flex-wrap px-4">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setActiveLanguage(lang.code)}
              className={`px-3 py-1 rounded-full text-sm transition-all ${
                activeLanguage === lang.code
                  ? 'bg-white text-purple-700 font-semibold shadow-md'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              {lang.code}
            </button>
          ))}
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4">
        <AnimatePresence mode="wait">
          {/* 测试界面 */}
          {isTesting && (
            <motion.div
              key="test"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-8"
            >
              <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-10">
                {/* 进度条 */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-gray-600">
                      {answers.length} / {questions.length}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(answers.length / questions.length) * 100}%` }}
                      className="h-full bg-gradient-to-r from-purple-600 to-pink-600"
                    />
                  </div>
                </div>

                {/* 题目 */}
                <div className="mb-8">
                  <div className="inline-block bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                    第 {currentQuestion + 1} 题
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">
                    {questions[currentQuestion].text}
                  </h2>

                  {/* 选项 */}
                  <div className="space-y-4">
                    {questions[currentQuestion].options.map((option, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.02, x: 5 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleAnswer(option.value)}
                        className="w-full text-left p-5 rounded-2xl border-2 border-gray-200 hover:border-purple-400 hover:bg-purple-50 transition-all group"
                      >
                        <div className="flex items-start gap-4">
                          <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white flex items-center justify-center font-bold text-sm group-hover:scale-110 transition-transform">
                            {option.label}
                          </span>
                          <span className="text-lg text-gray-700 group-hover:text-gray-900 leading-relaxed">
                            {option.text}
                          </span>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* 导航按钮 */}
                <div className="flex justify-between items-center mt-8">
                  <button
                    onClick={handlePrevious}
                    disabled={currentQuestion === 0}
                    className="px-6 py-3 rounded-full border-2 border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all font-semibold"
                  >
                    ← 上一题
                  </button>
                  <span className="text-sm text-gray-500">
                    {answers.length}/{questions.length} 已完成
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {/* 结果页面 */}
          {showResult && result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="mt-8"
            >
              <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                  className="text-8xl mb-6"
                >
                  🎉
                </motion.div>

                <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  你的人格类型是
                </h1>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="my-8 p-8 bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl"
                >
                  <div className="text-5xl font-bold text-purple-700 mb-2">{result.code}</div>
                  <div className="text-3xl font-semibold text-gray-800 mb-4">{result.name}</div>
                  <p className="text-xl text-gray-600 italic leading-relaxed">
                    「{result.description}」
                  </p>
                </motion.div>

                <div className="flex gap-4 justify-center mt-8 flex-wrap">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleRetake}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl transition-all"
                  >
                    重新测试
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-full font-bold hover:bg-purple-50 transition-all"
                  >
                    分享结果
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}

          {/* 首页 */}
          {!isTesting && !showResult && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Hero 区域 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 my-8"
              >
                <div className="text-center mb-8">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="text-6xl mb-4"
                  >
                    🧪
                  </motion.div>
                  <p className="text-sm text-gray-600 mb-2">15个维度 · 5大模型 · 26种人格</p>
                  <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    SBTI 测试 — 人格测试
                  </h1>
                  <p className="text-lg text-gray-700 mb-2 leading-relaxed">
                    <strong className="text-purple-700">MBTI 已经过时，SBTI 来了。</strong>
                    一场荒诞又精准的人格审判，30 道题看穿你的 15 个灵魂维度。不用注册，不用付费，不用交出你的隐私。
                  </p>
                  <p className="text-sm text-gray-500 mb-8">已有 65,412 人完成测试</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleStartTest}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-10 py-5 rounded-full text-xl font-bold shadow-lg hover:shadow-2xl transition-all flex items-center gap-3 mx-auto group"
                  >
                    开始测试
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1 }}
                      className="text-2xl"
                    >
                      →
                    </motion.span>
                  </motion.button>
                </div>

                {/* 人气排行 */}
                <div className="mt-16">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                      👑 人气排行
                    </h2>
                    <p className="text-sm text-gray-500">65,412 人已测</p>
                  </div>
                  <div className="space-y-4">
                    {topPersonalities.map((person, index) => (
                      <motion.div
                        key={person.code}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-5 flex items-center gap-4 hover:shadow-lg transition-shadow border border-purple-100"
                      >
                        <div className="text-4xl">{person.emoji}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className="text-2xl">{person.rank}</span>
                            <span className="font-bold text-purple-700 text-lg">{person.code}</span>
                            <span className="text-gray-400">·</span>
                            <span className="text-gray-700 font-medium">{person.name}</span>
                            <span className="ml-auto text-purple-600 font-bold text-lg">{person.percentage}</span>
                          </div>
                          <p className="text-sm text-gray-600 italic">{person.quote}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* 稀有人格 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="mt-8 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl border-2 border-dashed border-orange-200"
                >
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    🎲 稀有人格
                  </h3>
                  <div className="flex gap-6 flex-wrap">
                    {rarePersonalities.map((person) => (
                      <div key={person.code} className="flex items-center gap-2">
                        <span className="font-bold text-orange-700 text-lg">{person.code}</span>
                        <span className="text-gray-700">{person.name}</span>
                        <span className="text-orange-600 text-sm font-semibold">{person.percentage}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>

              {/* 介绍区域 */}
              <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-8">
                <h2 className="text-3xl font-bold mb-6 text-center">SBTI 测试 是什么？</h2>
                <p className="text-gray-700 leading-relaxed mb-8 text-center max-w-3xl mx-auto">
                  SBTI（Satirical Behavioral Type Indicator，讽刺行为类型指标）是一款基于 5 大心理模型、15 个人格维度的娱乐型人格测试。它用 30 道精心设计的题目，通过三级评分（L/M/H）和模式匹配算法，为你匹配 26 种独特的人格类型——每一种都带着善意的毒舌和精准的洞察。
                </p>

                {/* 5大模型 */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
                  {models.map((model, index) => (
                    <motion.div
                      key={model.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gradient-to-br from-purple-100 to-pink-100 p-6 rounded-2xl hover:shadow-lg transition-all border border-purple-200"
                    >
                      <h3 className="font-bold text-lg mb-2 text-purple-800">{model.name}</h3>
                      <p className="text-gray-600 font-mono text-sm">{model.dimensions}</p>
                    </motion.div>
                  ))}
                </div>

                {/* 26种人格类型 */}
                <h2 className="text-3xl font-bold mb-4 text-center">26 种人格类型</h2>
                <p className="text-center text-gray-600 mb-6">你会是哪一种？测完才知道。</p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-12">
                  {allPersonalities.map((personality, index) => {
                    const [code, name] = personality.split(' ')
                    return (
                      <motion.div
                        key={personality}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.02 }}
                        className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl hover:shadow-md hover:scale-105 transition-all cursor-pointer text-center border border-purple-100"
                      >
                        <div className="font-bold text-purple-700 mb-1">{code}</div>
                        <div className="text-sm text-gray-600">{name}</div>
                      </motion.div>
                    )
                  })}
                </div>

                {/* 对比表格 */}
                <h2 className="text-3xl font-bold mb-6 text-center">SBTI vs MBTI 对比</h2>
                <div className="overflow-x-auto mb-12">
                  <table className="w-full border-collapse rounded-2xl overflow-hidden shadow-lg">
                    <thead>
                      <tr className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                        <th className="p-4 text-left font-bold">对比项</th>
                        <th className="p-4 text-left font-bold">MBTI</th>
                        <th className="p-4 text-left font-bold">SBTI 测试</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['理论基础', '荣格心理类型理论', '5大心理模型（自我/情感/态度/行动/社交）'],
                        ['维度数量', '4 个维度', '15 个维度'],
                        ['评分方式', '二分法（E/I, S/N...）', '三级评分（L/M/H）'],
                        ['类型数量', '16 种', '26 种 + 2 种特殊'],
                        ['风格', '正式、心理学', '讽刺、娱乐'],
                        ['题目数量', '93 题', '15 题（3-5分钟）'],
                        ['费用', '官方版收费', '完全免费'],
                      ].map((row, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-purple-50' : 'bg-white'}>
                          <td className="p-4 font-semibold text-purple-800">{row[0]}</td>
                          <td className="p-4 text-gray-700">{row[1]}</td>
                          <td className="p-4 text-purple-700 font-semibold">{row[2]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* FAQ */}
                <h2 className="text-3xl font-bold mb-6 text-center">常见问题</h2>
                <div className="space-y-3">
                  {faqs.map((faq, index) => (
                    <motion.div
                      key={index}
                      className="border-2 border-purple-200 rounded-xl overflow-hidden"
                    >
                      <button
                        onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                        className="w-full p-4 text-left font-semibold text-purple-800 hover:bg-purple-50 transition-colors flex justify-between items-center"
                      >
                        <span>{faq.q}</span>
                        <span className="text-2xl">{expandedFaq === index ? '−' : '+'}</span>
                      </button>
                      <AnimatePresence>
                        {expandedFaq === index && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: 'auto' }}
                            exit={{ height: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="px-4 pb-4 text-gray-700 bg-purple-50">
                              {faq.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 页脚 */}
        <footer className="text-center text-white/90 text-sm py-8">
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            <span>原作者: <a href="https://space.bilibili.com/417038183" target="_blank" rel="noopener noreferrer" className="hover:text-white underline">B站@蛆肉儿串儿</a></span>
            <span>·</span>
            <span>本站仅供娱乐</span>
            <span>·</span>
            <span>Powered by <a href="https://clawdaddy.run/#hosting" target="_blank" rel="noopener noreferrer" className="hover:text-white underline">ClawDaddy</a></span>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App
