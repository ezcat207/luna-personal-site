export interface SeoContentBlock {
  heading?: string;
  items: string[];
  code?: string;
  table?: { headers: string[]; rows: string[][] };
}

export interface SeoChapter {
  id: string;
  title: string;
  objective: string;
  blocks: SeoContentBlock[];
  practice: string[];
}

export interface SeoModule {
  num: number;
  slug: string;
  title: string;
  subtitle: string;
  duration: string;
  intro: string;
  chapters: SeoChapter[];
}

export const SEO_MODULES: SeoModule[] = [
  {
    num: 1,
    slug: 'module-1',
    title: 'SEO基础认知',
    subtitle: '搞清楚SEO是什么、为什么它能改变你的网站命运',
    duration: '约60分钟',
    intro: '从零理解SEO的本质，建立正确的认知框架。',
    chapters: [
      {
        id: 'module-1-chapter-1',
        title: '什么是SEO',
        objective: '理解SEO的定义、价值和与其他营销方式的区别',
        blocks: [
          {
            heading: 'SEO的定义',
            items: [
              'SEO（Search Engine Optimization）即搜索引擎优化，核心目的是让你的网页在搜索引擎中获得更高的自然排名',
              '自然流量 vs 付费流量：自然流量免费持续，付费流量停止投放即停止',
              '一旦获得排名，每月可持续免费获得流量，成本远低于广告',
            ],
          },
          {
            heading: 'SEO vs 其他营销方式',
            items: [
              'SEM包括SEO（自然搜索）和PPC（付费广告）',
              '社交媒体流量多但意图不明确；搜索流量意图明确，转化率更高',
              '邮件营销需要已有用户基础；内容营销用SEO作为分发渠道',
            ],
          },
          {
            heading: 'SEO的商业价值',
            items: [
              '可以建立自己的独立网站资产，通过AdSense、联盟营销、产品销售变现',
              '可扩展性强：一个站成功后可复制到多个站',
              '用户主动搜索意味着意图明确，转化率相对较高',
            ],
          },
        ],
        practice: [
          '选择一个你感兴趣的行业，在Google搜索3-5个相关关键词',
          '观察排名前3的网站是什么类型，内容有什么特点',
          '记录：这些网站可能通过什么方式变现（广告、产品、服务）',
        ],
      },
      {
        id: 'module-1-chapter-2',
        title: '搜索引擎工作原理',
        objective: '理解Google如何发现、索引和排名网页，为优化奠定基础',
        blocks: [
          {
            heading: '爬虫与发现',
            items: [
              'Google派出爬虫（蜘蛛/机器人）通过链接跳转来发现互联网上的网页',
              '网站地图（Sitemap）帮助爬虫更快发现页面；Robots.txt控制爬虫权限',
              '内部链接和外部链接都是爬虫发现新页面的路径',
            ],
          },
          {
            heading: '索引与排名',
            items: [
              '爬虫将发现的页面存入Google数据库，并分析内容、结构、链接等信息',
              '并非所有被爬取的页面都会被索引——低质量、重复内容的页面可能被跳过',
              '排名时Google根据相关性、权威性、用户体验等数百个因素给页面打分排序',
            ],
          },
          {
            heading: 'Google如何评估网页质量',
            items: [
              '相关性：页面内容与用户搜索关键词的匹配程度',
              '权威性：通过外链数量和质量判断（PageRank核心逻辑）',
              '用户体验：页面速度、移动端适配、布局等',
              'E-E-A-T：专业性（Expertise）、经验（Experience）、权威性（Authoritativeness）、可信度（Trustworthiness）',
            ],
          },
        ],
        practice: [
          '访问你的网站（或借用一个网站），进入Google Search Console',
          '查看网站有多少页面被索引，是否有爬虫错误',
          '访问网站的robots.txt文件（在地址栏输入「网站地址/robots.txt」）',
        ],
      },
      {
        id: 'module-1-chapter-3',
        title: 'SEO的四大核心要素',
        objective: '掌握SEO优化的四个主要方向，建立整体学习框架',
        blocks: [
          {
            heading: '四大核心要素',
            items: [
              '技术SEO（Technical SEO）：网站能否被顺利爬取和索引——速度、移动端、SSL、Sitemap、Robots.txt',
              '页面SEO（On-Page SEO）：单个页面内的优化——标题、描述、H标签、关键词、内容质量、内部链接',
              '内容SEO（Content SEO）：内容策略和质量——是否满足用户需求、深度广度、新鲜度、可读性',
              '链接SEO（Link SEO / Off-Page SEO）：外链（其他网站指向你）+ 内链（站内页面互链）',
            ],
          },
          {
            heading: '四大要素的关系',
            items: [
              '技术SEO是地基：没有它，内容和链接的价值都无法发挥',
              '内容SEO是核心：优质内容是获得排名和外链的基础',
              '外链SEO是放大器：好内容+好外链才能快速突破',
              '四者缺一不可，初级阶段先把技术SEO和页面SEO打好基础',
            ],
          },
        ],
        practice: [
          '选择一个排名靠前的网站，用Ahrefs或SEMrush免费版分析：',
          '它的页面标题和描述是什么？',
          '它的主要外链来自哪些网站？',
          '它的网站结构如何？',
        ],
      },
      {
        id: 'module-1-chapter-4',
        title: '白帽SEO vs 黑帽SEO',
        objective: '理解SEO的伦理边界，明确初级阶段应该采取的正确方向',
        blocks: [
          {
            heading: '白帽SEO',
            items: [
              '完全遵守搜索引擎指南，通过提供高质量内容、改善用户体验、获取合法外链来优化',
              '优势：长期稳定、不会被处罚、建立真实权威性',
              '缺点：见效慢（通常3-6个月），但效果持久',
            ],
          },
          {
            heading: '黑帽SEO',
            items: [
              '违反搜索引擎指南，常见手法：关键词堆砌、隐藏文本、链接买卖、内容农场',
              '风险：被Google发现后会被严厉惩罚（降权、降排名，甚至整站被K）',
              '恢复周期长，前期所有投入付之东流',
            ],
          },
          {
            heading: '为什么初级学习者必须选白帽',
            items: [
              '白帽SEO的原理可以长期复用，积累的是可持续资产',
              '理解白帽原理后也能识别黑帽风险，不被忽悠',
              '一旦被K站，不仅失去排名，还失去所有积累的品牌信任',
            ],
          },
        ],
        practice: [
          '访问Google搜索中心（Google Search Central）官方指南',
          '记录其中「不应该做什么」的3-5条建议',
          '思考：为什么搜索引擎要禁止这些做法？',
        ],
      },
      {
        id: 'module-1-chapter-5',
        title: '学习路径与期望管理',
        objective: '建立正确的学习预期，明确初级阶段的目标和合理时间表',
        blocks: [
          {
            heading: 'SEO是长期投资',
            items: [
              '通常需要3-6个月才能看到明显效果，不是快速暴富的方法',
              '第1个月：学习基础、上线网站、发布初始内容',
              '第2-3个月：完善网站、积累内容、开始获得少量流量',
              '第4-6个月：如果优化得当，部分长尾词开始获得首页排名',
            ],
          },
          {
            heading: '初级学习者常见误区',
            items: [
              '期望过高：认为优化一个关键词后就立即有流量',
              '操之过急：频繁改动，导致搜索引擎重新评估',
              '放弃太快：3个月没效果就放弃，没给网站足够时间',
              '只学不做：光看教程不建站，学了等于没学',
            ],
          },
          {
            heading: '初级阶段的专注重点',
            items: [
              '建立1-2个网站并做好它们，不要贪多',
              '学会选择合适的长尾关键词（竞争低，意图明确）',
              '写出满足用户需求的内容（不是写给搜索引擎）',
              '理解基本技术SEO（不需要成为技术专家）',
            ],
          },
        ],
        practice: [
          '为自己制定SEO学习计划：',
          '选择一个感兴趣的利基市场',
          '设定6个月目标（如：获得10个关键词排名，月流量100）',
          '列出每个月的具体任务',
        ],
      },
      {
        id: 'module-1-chapter-6',
        title: 'SEO工具介绍（初级版）',
        objective: '掌握3个核心SEO工具，用数据取代感觉做决策',
        blocks: [
          {
            heading: 'GSC（Google Search Console）——你的SEO体检报告',
            items: [
              '谷歌官方免费工具，告诉你Google如何看待你的网站',
              '查看哪些词排在第几名、点击率多少、有没有技术错误',
              '案例：博主通过GSC发现高展示量但低点击率的长尾词，仅修改标题后流量翻倍',
              '关键价值：数据会告诉你用户真正想看什么——唯一的"真理来源"',
            ],
          },
          {
            heading: 'SimilarWeb——透视竞争对手的利器',
            items: [
              '查看竞品网站的月流量、Top Pages和流量来源',
              '发现流量大但内容烂的网站，找到你的市场机会',
              '案例：站长通过SimilarWeb发现爆火AI工具的垂直功能页月流量5万，开发更好用的垂直工具成功截流',
              '核心策略：模仿成功的路径，优化失败的环节',
            ],
          },
          {
            heading: 'Ahrefs / SEMrush——战前的沙盘推演',
            items: [
              '查看关键词难度（KD）和搜索量（Volume），黄金准则：寻找高Volume、低KD（<30）的组合',
              '案例：词A搜量1万KD 70 vs 词B搜量1千KD 10——对于新站，词B的KDROI远高于词A',
              '核心原则：选择你能打赢的战场，不要用新站挑战行业巨头',
            ],
          },
        ],
        practice: [
          '注册并验证你的Google Search Console账号，提交你的网站',
          '使用SimilarWeb免费插件，查看你最佩服的3个竞品网站的流量情况',
          '在Ahrefs免费版输入你的核心关键词，记录KD值和搜索量',
        ],
      },
    ],
  },
  {
    num: 2,
    slug: 'module-2',
    title: '关键词研究基础',
    subtitle: '找到用户真实搜索的词，是SEO成功的第一步',
    duration: '约75分钟',
    intro: '掌握关键词分类与研究方法，学会用工具找到有价值的目标词。',
    chapters: [
      {
        id: 'module-2-chapter-1',
        title: '关键词类型和用户意图',
        objective: '理解不同类型的关键词及背后的用户意图，为关键词选择建立基础',
        blocks: [
          {
            heading: '按搜索意图分类',
            items: [
              '信息型（Informational）：用户想学习了解，如「如何使用WordPress」「什么是SEO」——适合博客/教程',
              '导航型（Navigational）：用户想找特定网站，如「Facebook登录」——适合品牌页面',
              '商业型（Commercial）：用户在比较阶段，如「最好的SEO工具对比」——适合评测/对比文章，转化率高',
              '交易型（Transactional）：用户准备立即行动，如「购买iPhone 15」——适合产品页面，转化率最高',
            ],
          },
          {
            heading: '按关键词长度分类',
            items: [
              '短尾词（1-2个词）：搜索量大但竞争极高，初级学习者不应该做',
              '中尾词（3-4个词）：搜索量中等，竞争中等——有一定基础后再尝试',
              '长尾词（4个词以上）：搜索量小，竞争低，意图明确，转化率高——初级学习者的最佳切入点',
            ],
          },
          {
            heading: '为什么理解意图很重要',
            items: [
              '你的内容必须匹配用户的搜索意图，否则即使排名靠前也没有转化',
              '例如：用户搜索「如何学SEO」是想要教程，不是想买SEO工具',
              '观察搜索结果前3名的内容类型，就能判断这个词的用户意图',
            ],
          },
        ],
        practice: [
          '选择5个你感兴趣的关键词',
          '对每个关键词分类：意图类型（信息/导航/商业/交易）和长度类型（短/中/长尾）',
          '在Google搜索这些词，观察排名前3的网页是什么类型，记录你的发现',
        ],
      },
      {
        id: 'module-2-chapter-2',
        title: '关键词研究工具使用',
        objective: '掌握免费和付费关键词研究工具的基本使用，能独立进行关键词数据查询',
        blocks: [
          {
            heading: '免费工具',
            items: [
              'Google Search Console（GSC）：查看你自己网站已经排名的关键词和点击数，但看不到竞争对手数据',
              'Google Keyword Planner：官方搜索量数据，需要Google Ads账户（免费），可查月均搜索量和竞争度',
              'Google Trends：查看关键词搜索量趋势，发现上升型新词——相对热度而非绝对搜索量',
              'Answer The Public（answerthepublic.com）：发现用户关于某主题的常见问题，以how/what/why等形式呈现',
              'Google搜索下拉和相关搜索：最简单的方法，输入关键词看底部相关搜索，都是真实用户搜索过的词',
            ],
          },
          {
            heading: '付费工具',
            items: [
              'Ahrefs：全能SEO工具，可查关键词难度（KD）、搜索量、排名前10网站的DR等，月费约$99起',
              'SEMrush：支持多国家多搜索引擎，Keyword Magic Tool帮助发现相关关键词，有免费试用',
              'Similarweb：查看竞争对手网站的流量关键词分布，分析竞争对手引流策略',
            ],
          },
          {
            heading: '初级阶段工具使用建议',
            items: [
              '先用免费工具起步：Google Search Console + Google Trends组合使用',
              '有预算再考虑Ahrefs的基础套餐，数据质量最稳定',
              '核心技能是判断关键词意图，工具只是辅助数据来源',
            ],
          },
        ],
        practice: [
          '用Google Keyword Planner搜索你利基市场的5个核心词',
          '记录每个词的月均搜索量和竞争度',
          '用Google Trends对比这5个词的趋势，找出搜索量上升的词',
        ],
      },
      {
        id: 'module-2-chapter-3',
        title: '竞争度基础判断',
        objective: '学会用KD值和SERP分析法，找到你真正能打赢的关键词战场',
        blocks: [
          {
            heading: 'KD值（关键词难度）怎么看',
            items: [
              'KD 0-10（简单）：新站也可以尝试，通常很快见效',
              'KD 11-30（中等）：需要高质量内容和基础外链支持',
              'KD 31-70（困难）：需要强大的域名权重和专业内容',
              'KD 70+（极难）：基本被行业巨头（Amazon/Wikipedia）垄断，不建议新站尝试',
            ],
          },
          {
            heading: 'SERP分析法：不只看数字，要亲眼观察',
            items: [
              '如果第一页全是行业巨头（Apple/Nike）或Wikipedia官方页面，直接放弃这个词',
              '如果前几名内容陈旧（几年前的）、篇幅短、页面丑：这是你的机会！',
              '内容超车策略：提供"更全、更新、更美"的内容实现超越',
              '案例：将"Best CRM software"（KD 85）改做"Best CRM for freelance graphic designers"（KD 12），2个月内排名前三',
            ],
          },
        ],
        practice: [
          '挑选3个你心仪的关键词，用Ahrefs或SEMrush免费版记录它们的KD值',
          '在隐私模式下搜索这3个词，观察前10名的网站类型',
          '寻找一个第一页出现过个人博客或中小型网站的关键词——那就是你的机会',
        ],
      },
      {
        id: 'module-2-chapter-4',
        title: '长尾关键词入门',
        objective: '理解长尾词的价值，掌握寻找高质量长尾词的实战方法',
        blocks: [
          {
            heading: '为什么长尾词是新手的红利',
            items: [
              '极低竞争度：大公司看不上小词，你只要把内容写好就能排上去',
              '极高转化率：搜"适合拍Vlogs的5000元以下索尼相机"的人，已经快要下单了',
              '积少成多：100篇长尾词文章的合力流量非常惊人，且极其稳定',
              'SEO不是追求最大的词，而是追求最准的词',
            ],
          },
          {
            heading: '如何寻找高质量长尾词',
            items: [
              '修饰词组合法：核心词 + 场景（for beginners / at home）+ 时间（2024）+ 属性（cheap / free / premium）',
              'Google下拉框：输入关键词不按回车，看下拉建议',
              '相关搜索：页面底部的"People also search for"是长尾词金矿',
              '案例：瑜伽垫品牌通过50篇长尾词内容（"Extra thick yoga mat for bad knees"等）实现月销10万美金',
            ],
          },
        ],
        practice: [
          '针对你的核心产品，用修饰词组合法找出10个具体的长尾关键词',
          '确认这些词是否具有明确的"解决问题"或"购买"意图',
          '为其中最精准的1个长尾词写一个简要的内容大纲',
        ],
      },
    ],
  },
  {
    num: 3,
    slug: 'module-3',
    title: '页面优化基础',
    subtitle: '让搜索引擎一眼看懂你的页面——标题、URL、标签缺一不可',
    duration: '约60分钟',
    intro: '掌握页面级别的SEO优化，覆盖用户和爬虫都能看到的每个元素。',
    chapters: [
      {
        id: 'module-3-chapter-1',
        title: 'Title和Meta Description写法',
        objective: '掌握标题和描述的写法规范，提高页面在搜索结果中的点击率',
        blocks: [
          {
            heading: 'Title写法规范',
            items: [
              '推荐长度：50-60个字符（英文），或20-30个汉字',
              '基本公式：主关键词 + 修饰词 | 品牌名',
              '好例子：「如何选择WordPress主题 | 初学者完全指南」',
              '坏例子：关键词堆砌「WordPress主题 | 最好的WordPress主题 | WordPress主题推荐」',
              '要包含：主关键词（最好放前面）、修饰词（初学者/2024年/完全指南）、品牌名',
            ],
            table: {
              headers: ['类型', '不好的例子', '好的例子'],
              rows: [
                ['博客文章', 'WordPress主题', '如何选择WordPress主题 | 初学者完全指南'],
                ['产品页', '手机壳', 'iPhone 15手机壳 | 防摔防水 | 品牌官网'],
                ['对比文章', 'SEO工具', '2024年最佳SEO工具对比 | 功能+价格分析'],
              ],
            },
          },
          {
            heading: 'Meta Description写法规范',
            items: [
              '推荐长度：150-160个字符（英文），70-80个汉字',
              '公式：简短介绍 + 关键信息 + 行动呼吁（CTA）',
              '要包含：关键词（自然出现）、独特价值、数字（如「10+」「30天」）、CTA',
              'Description不直接影响排名，但影响点击率——点击率高的页面Google会倾向提升排名',
            ],
          },
          {
            heading: 'Title和Description对排名的影响',
            items: [
              'Title直接影响排名（关键词在Title中权重最高）',
              'Description不直接影响排名，但影响点击率，进而间接影响排名',
              '实际案例：排名第3，搜索量1000/月，点击率10% = 月流量100；优化后点击率15% = 月流量150，增长50%',
            ],
          },
        ],
        practice: [
          '选择3个已排名的网页（自己或竞争对手的）',
          '对每个页面的Title和Description评分：是否包含关键词？长度合适吗？有吸引力吗？',
          '如果是自己的网站，尝试改进Title和Description，4周后记录点击率变化',
        ],
      },
      {
        id: 'module-3-chapter-2',
        title: 'URL结构优化',
        objective: '理解URL结构对SEO的影响，学会规划和优化网站URL',
        blocks: [
          {
            heading: 'URL结构的最佳实践',
            items: [
              '使用关键词：/blog/how-to-choose-wordpress-theme（好）vs /blog/post123（坏）',
              '用连字符分隔单词：/how-to-choose（好）vs /how_to_choose（坏，下划线不是分隔符）',
              '保持简洁：不要超过3-4个目录层级',
              '全部小写：避免大小写混乱导致重复内容',
              '避免参数：/wordpress-theme-guide（好）vs /wordpress-theme-guide?id=123（坏）',
            ],
          },
          {
            heading: 'URL与网站权重的关系',
            items: [
              '首页权重最高，一级目录次高，越深层的页面权重越低',
              '规划时要考虑：最重要的内容放在更浅的层级',
              '小型网站建议扁平结构（所有页面距首页2-3层以内）',
              '已上线的URL不要随意修改，否则旧链接404会损失排名权重',
            ],
          },
        ],
        practice: [
          '审查你现有网站（或规划中网站）的5个页面URL',
          '按最佳实践检查每个URL：是否有关键词？是否简洁？大小写是否统一？',
          '如有问题，制定修改计划（并记得设置301重定向）',
        ],
      },
      {
        id: 'module-3-chapter-3',
        title: 'H1-H6标签使用',
        objective: '掌握标题标签的语义逻辑，帮助搜索引擎理解页面内容架构',
        blocks: [
          {
            heading: 'H1标签：页面的灵魂',
            items: [
              '每个页面必须有且仅有一个H1',
              'H1中必须包含该页面的核心关键词',
              '通常放在页面正文最上方，是搜索引擎判断页面主题的最重要标签',
            ],
          },
          {
            heading: 'H2-H3：内容的大纲和细节',
            items: [
              'H2：划分文章的主要章节，可以有多个，包含长尾关键词或语义相关词汇',
              'H3：H2下的小节，大多数网页用到H3就够了',
              '严格遵循层级：H1→H2→H3，不要跳级使用',
              '正确序列：H1→H2→H3→H2；错误：H1→H3→H2（跳级会让搜索引擎困惑）',
            ],
          },
          {
            heading: '常见误区',
            items: [
              '不要把H标签当调色盘——H标签代表语义逻辑，不是用来改字体样式的',
              '如果只是想让文字变大变粗，请用CSS',
              '案例：一篇"2024最佳笔记本选购指南"的正确结构：H1（指南标题）→H2（品牌对比）→H3（Apple MacBook/Dell XPS）→H2（如何选配置）',
            ],
          },
        ],
        practice: [
          '检查首页和核心产品页，确保有且只有一个H1标签',
          '用浏览器F12检查功能确认页面标题嵌套在正确的H标签内',
          '为超过1000字的长文章添加至少3个H2标签，使内容易于扫描',
        ],
      },
      {
        id: 'module-3-chapter-4',
        title: '内部链接策略入门',
        objective: '理解内链的权重传递机制，学会用内部链接让整站排名共同提升',
        blocks: [
          {
            heading: '什么是内部链接，为什么重要',
            items: [
              '内链 = 从网站一个页面指向同一网站另一个页面的链接',
              '作用：帮助用户导航、定义网站架构、传递页面权重（Link Equity）',
              '没有内部链接的网站就像孤岛群岛——用户进得来出不去，爬虫也会断线',
            ],
          },
          {
            heading: '面包屑导航和上下文内链',
            items: [
              '面包屑（首页 > 课程中心 > SEO入门 > 页面优化）：同时告诉用户和搜索引擎页面层级关系',
              '上下文内链（文章正文中自然引用相关文章）权重高于侧边栏的"相关阅读"',
              '将权重高的页面（首页/高流量文章）链接到你想提升排名的新页面',
              '策略：发布新文章后，在旧的相关文章中加入指向新文章的链接',
            ],
          },
          {
            heading: '锚文本优化',
            items: [
              '锚文本 = 链接上的可见文字，是搜索引擎判断目标页面内容的重要信号',
              '避免：「点击这里」「更多」「查看详情」（含义模糊）',
              '推荐：描述性关键词，如「查看我们的SEO实战课程」',
              '内链必须自然且相关——不要在咖啡冲泡文章里强行链接到二手车页面',
            ],
          },
        ],
        practice: [
          '为网站安装或启用面包屑导航功能',
          '找出站内权重最高的前3个页面，从这些页面链接到你最新的内容',
          '检查已发布的文章，确保每篇至少包含2-3个指向站内其他相关页面的链接',
        ],
      },
    ],
  },
  {
    num: 4,
    slug: 'module-4',
    title: '内容优化基础',
    subtitle: '写出既让用户爱看、又让Google爱排的内容',
    duration: '约90分钟',
    intro: '掌握SEO内容写作的5步框架，用数据和结构让内容真正发挥排名价值。',
    chapters: [
      {
        id: 'module-4-chapter-1',
        title: 'SEO内容写作框架',
        objective: '掌握系统的内容写作方法，能写出既满足用户需求又符合SEO规范的高质量内容',
        blocks: [
          {
            heading: 'SEO内容写作的5步框架',
            items: [
              '第1步：研究用户需求——在Google搜索关键词，观察排名前3页面的内容类型；用PAA（People Also Ask）了解用户常见问题',
              '第2步：分析竞争对手——排名前3的页面涵盖了什么主题？他们遗漏了什么？这就是你的机会',
              '第3步：制定内容大纲——确定内容类型（教程/列表/对比/案例）；确保大纲回答用户可能有的所有问题',
              '第4步：优化关键词布局——主关键词自然出现在Title、H1、前100词、H2/H3、正文多处、图片Alt文本中',
              '第5步：添加数据、案例和引用——带来源的数据比空洞的表述更可信，Google偏好有权威证据支撑的内容',
            ],
          },
          {
            heading: '内容结构的最佳实践',
            items: [
              '清晰的层级：H1（一篇只有一个）→ H2 → H3，不要跳级',
              '短段落：2-3句话为一段，超过300字的章节考虑拆分',
              '使用列表和加粗突出关键点，提高可扫读性',
              '长文章加目录或导航链接，帮助用户快速定位',
            ],
          },
          {
            heading: '关键词布局的原则',
            items: [
              '自然出现：关键词融入内容，不要生硬堆砌',
              '现代SEO不需要控制关键词密度，写得自然、相关词自然会多次出现',
              '使用关键词变种和相关词汇（如「WordPress主题」也可以写「WordPress模板」「主题选择」）',
              '警告：过度堆砌关键词会被Google惩罚，降权或K站',
            ],
          },
          {
            heading: 'SEO内容写作常见错误',
            items: [
              '为搜索引擎写，不是为用户写——过度堆砌关键词，读起来不自然',
              '内容太短或不完整——没有充分回答用户问题，用户会去看竞争对手',
              '没有明确结构——一大段文字，没有标题和格式化',
              '复制竞争对手内容——Google识别重复内容，不给好排名',
              '忽视用户意图——写的内容与用户搜索目的不符，即使排名好也不会转化',
            ],
          },
        ],
        practice: [
          '选择你最重要的一个关键词，分析排名前3的内容',
          '用5步框架写一篇文章的大纲（不需要马上写全文）',
          '检查：你的大纲是否回答了用户所有可能的问题？有没有竞争对手遗漏的角度？',
        ],
      },
      {
        id: 'module-4-chapter-2',
        title: '信息架构设计',
        objective: '用支柱页面和内容集群构建知识图谱，告诉搜索引擎你是某领域专家',
        blocks: [
          {
            heading: '支柱页面与内容集群（Pillar & Clusters）',
            items: [
              '支柱页面（Pillar Page）：深度覆盖某个大话题的权威页面（如：SEO终极指南）',
              '内容集群（Topic Clusters）：围绕支柱页面产生的细分话题文章',
              '连接：所有集群文章链接回支柱页面，支柱页面也链接到各集群，形成权重网络',
              '效果：告诉搜索引擎"我是这个领域的专家"，显著提升主题权威性',
            ],
          },
          {
            heading: '导航与信息层级设计',
            items: [
              '扁平化结构：用户通过3次点击以内能到达任何页面',
              '面包屑导航：不仅方便用户回退，也向Google明确展示页面层级',
              '主菜单：放入最重要的分类，不是所有页面',
              'URL语义化：/blog/seo-tips 优于 /p=123；保持URL短小精悍',
            ],
          },
          {
            heading: '信息架构改造案例',
            items: [
              '某垂直电商：500个产品全堆在"新闻"分类，Google对核心产品关键词认知模糊',
              '改造：按产品线重分子分类，建立"核心购买指南"作为支柱页面',
              '结果：网站索引量提升40%，核心品类长尾词流量2个月内翻倍',
            ],
          },
        ],
        practice: [
          '绘制你网站的思维导图，检查目前是否有清晰的分类结构',
          '确定1-2个核心支柱话题（Pillar Topics），为每个话题规划相关集群文章',
          '检查并开启网站的面包屑导航功能',
          '清理URL结构，确保包含语义关键词且层级简单（不超过3层）',
        ],
      },
      {
        id: 'module-4-chapter-3',
        title: '图片优化和多媒体使用',
        objective: '在保证视觉美感的同时，让图片成为SEO加分项而非拖分项',
        blocks: [
          {
            heading: '图片SEO的基础',
            items: [
              'Alt文本：用简洁语言描述图片内容并嵌入关键词（如 alt="复古风格不锈钢咖啡机"）',
              '文件名优化：stainless-steel-coffee-maker.jpg 优于 IMG_001.jpg',
              'WebP格式：比JPEG/PNG小25-30%，质量几乎无损——Google推荐格式',
              'SVG：适用于图标和插图，体积极小且无限缩放不失真',
            ],
          },
          {
            heading: '图片加载性能优化',
            items: [
              '永远不要直接上传单反相机导出的几MB原图',
              '尺寸匹配：显示区域只有800px宽就不要上传4000px的图片',
              '懒加载（Lazy Loading）：用户滚动到图片位置才加载，极大提升首屏速度（LCP）',
              '推荐工具：TinyPNG、Squoosh.app',
              '案例：某生活博客将图片转WebP+启用懒加载，页面加载从8秒缩短到2.5秒，移动端排名平均上升12位',
            ],
          },
          {
            heading: '视频多媒体的正确使用',
            items: [
              'YouTube嵌入：利用YouTube带宽，不占用自己服务器资源',
              '视频结构化数据（Schema）：帮助Google识别视频标题/描述/缩略图，有机会获得视频大卡片展示',
              '背景视频必须自动静音，否则严重影响用户体验',
            ],
          },
        ],
        practice: [
          '安装WebP转换插件或用Squoosh.app处理网站现有图片',
          '检查网站最热门的5篇文章，补全缺失的Alt标签',
          '用Google PageSpeed Insights测试一个页面，重点查看"图片优化"建议',
          '确保所有嵌入视频都有简短的文字说明',
        ],
      },
      {
        id: 'module-4-chapter-4',
        title: '内容更新节奏',
        objective: '建立科学的内容更新机制，通过持续优化维持和提升搜索排名',
        blocks: [
          {
            heading: '为什么新鲜度很重要',
            items: [
              'Google算法中的"新鲜度（Freshness）"信号：内容常年不更新，搜索引擎认为信息已过时',
              '爬虫频率：经常更新的网站吸引爬虫更频繁光顾，新内容被更快索引',
              '用户CTR：搜索结果中带"2024更新版"标签的内容点击率更高',
            ],
          },
          {
            heading: '内容审计和更新策略',
            items: [
              '常青树内容（Evergreen）：核心指南类，每6-12个月复核一次数据和链接',
              '内容衰减（Content Decay）：在GSC中找出流量下滑的页面，重点优化',
              '更新的定义：不只是改日期！增加新段落、更新数据、替换失效链接、加入新案例',
              '稳定性胜过爆发性：每周1篇高质量 > 一个月猛发20篇然后消失半年',
            ],
          },
          {
            heading: '内容再利用（Repurposing）',
            items: [
              '将旧的热门博客整理成电子书或PDF',
              '将文章核心观点做成信息图（Infographic）重新发布',
              '将深度教程录制成视频嵌入原页面，增加停留时间',
              '案例：某科技网站半年未更新，月流量从10万跌至4万；更新前50篇核心文章的数据并加入"2024更新版"，1个月内流量恢复到8万',
            ],
          },
        ],
        practice: [
          '在Google Search Console找出过去3个月流量下滑最严重的3个页面',
          '为这3个页面各增加至少200字的新信息（新数据/新视角/新案例）',
          '检查并修复这些页面中的所有失效链接',
          '制定未来3个月的内容日历，包含新发和旧更计划',
        ],
      },
    ],
  },
  {
    num: 5,
    slug: 'module-5',
    title: '技术SEO基础',
    subtitle: '让搜索引擎能顺利进入、读懂、并信任你的网站',
    duration: '约75分钟',
    intro: '技术SEO是地基，覆盖网站架构、移动端和速度优化，确保爬虫能高效索引你的内容。',
    chapters: [
      {
        id: 'module-5-chapter-1',
        title: '网站架构规划',
        objective: '理解网站架构对SEO的影响，学会规划搜索引擎友好的网站结构',
        blocks: [
          {
            heading: '为什么网站架构很重要',
            items: [
              '影响爬虫效率：清晰的架构帮助爬虫更快发现和索引所有页面',
              '影响权重分配：良好的架构能帮助权重从首页向内页传递',
              '影响用户体验：清晰的导航帮助用户快速找到内容',
              '最重要原则：不超过3-4层——页面距离首页太远，爬虫可能无法有效索引',
            ],
          },
          {
            heading: '扁平化 vs 树形结构',
            items: [
              '扁平化结构：所有页面距首页2-3层，适合小型网站（<500页）——爬虫发现效率高',
              '树形结构：页面按逻辑分类，适合中大型网站——需要做好内部链接来传递权重',
              '推荐：小站用扁平，大站用树形但不超过3层',
            ],
          },
          {
            heading: '子域名 vs 子目录',
            items: [
              '子目录（example.com/blog/）比子域名（blog.example.com）更有利于SEO',
              '子目录：权重集中在主域名，Google视为同一网站',
              '子域名：被视为独立网站，权重不传递给主域名',
              '建议：初级阶段统一用子目录',
            ],
          },
          {
            heading: '内部链接规划',
            items: [
              '从首页链接到重要的分类页面',
              '从分类页面链接到相关文章',
              '在文章中链接到相关的其他文章（相关推荐）',
              '使用描述性锚文本（「SEO完全指南」而不是「点击这里」）',
            ],
          },
        ],
        practice: [
          '为你的网站规划架构：确定主要分类（最多5-7个），为每个分类规划URL结构',
          '绘制网站架构图（可以用思维导图工具）',
          '规划主导航和面包屑导航',
        ],
      },
      {
        id: 'module-5-chapter-2',
        title: '移动端优化',
        objective: '理解移动端SEO的重要性，掌握移动端优化的核心方法',
        blocks: [
          {
            heading: '为什么移动端优化很重要',
            items: [
              '全球超过60%的搜索来自移动设备',
              'Google已采用「移动优先索引」（Mobile-First Indexing），优先索引和排名移动版本',
              '移动端加载每延迟1秒，跳出率增加7%；53%的移动用户会放弃加载超过3秒的网站',
            ],
          },
          {
            heading: '响应式设计',
            items: [
              '响应式设计（Responsive Design）是移动端优化的基础：同一URL，根据屏幕尺寸自动调整布局',
              '现代建站工具（WordPress、Webflow、Framer）默认支持响应式设计',
              '检查方法：在Chrome DevTools中切换到移动端模式预览',
            ],
          },
          {
            heading: '移动端核心优化要点',
            items: [
              '字体大小：正文至少16px，避免用户缩放',
              '按钮和链接：至少44×44px，手指能轻松点击',
              '避免使用Flash（iOS/Android不支持）',
              '避免弹窗遮挡内容（Google会惩罚侵入式弹窗）',
              '压缩图片：移动端流量更宝贵，图片过大直接导致跳出',
            ],
          },
          {
            heading: '检查工具',
            items: [
              'Google Search Console → 移动可用性报告（查看哪些页面有移动端问题）',
              'PageSpeed Insights（developers.google.com/speed/pagespeed/insights）：检测移动端速度和问题',
              'Chrome DevTools的设备模拟：本地实时预览移动端效果',
            ],
          },
        ],
        practice: [
          '在PageSpeed Insights输入你的网站地址，查看移动端得分',
          '记录最需要改进的3个问题',
          '在Chrome DevTools中用移动端模式浏览你的5个主要页面，记录可用性问题',
        ],
      },
      {
        id: 'module-5-chapter-3',
        title: '网站速度优化',
        objective: '理解Core Web Vitals，掌握提升页面速度的核心手段',
        blocks: [
          {
            heading: 'Core Web Vitals：Google的性能量化指标',
            items: [
              'LCP（Largest Contentful Paint）：最大内容绘制，衡量加载性能——应在2.5秒内完成',
              'INP（Interaction to Next Paint）：交互响应，用户点击后页面反馈应在200毫秒内',
              'CLS（Cumulative Layout Shift）：累积布局偏移，页面元素不应在加载中乱跳——应低于0.1',
              '现实数据：移动端加载超3秒，53%的用户会离开；速度是Google的明确排名因素',
            ],
          },
          {
            heading: '速度优化的核心手段',
            items: [
              '图片优化：WebP格式（比JPEG/PNG小30-80%）+ 懒加载，通常是最大的提速点',
              'CDN（内容分发网络）：通过全球节点缓存，让用户从最近的服务器获取资源（推荐Cloudflare，有免费套餐）',
              '代码压缩（Minification）：压缩CSS/JS/HTML，去掉多余空格和注释',
              '浏览器缓存：让回头客直接从本地读取资源，不重新下载',
              '案例：某旅游博客安装Cloudflare CDN + WebP + 移除3个不必要JS，LCP从6秒降至1.8秒，核心关键词重回首页前三',
            ],
          },
          {
            heading: '速度测量工具',
            items: [
              'Google PageSpeed Insights：测试LCP/INP/CLS分数，提供具体优化建议',
              'Google Search Console → Core Web Vitals报告：查看真实用户数据',
              'GTmetrix：更详细的性能分解报告',
            ],
          },
        ],
        practice: [
          '在Google PageSpeed Insights测试你的网站，记录LCP/INP/CLS分数',
          '将所有大于200KB的图片转换为WebP格式',
          '开启网站的Gzip或Brotli压缩',
          '为你的网站配置Cloudflare CDN（有免费套餐）',
        ],
      },
      {
        id: 'module-5-chapter-4',
        title: 'XML Sitemap 和 Robots.txt 配置',
        objective: '掌握爬虫控制文件的配置，确保Google高效索引你真正有价值的页面',
        blocks: [
          {
            heading: 'XML Sitemap：网站的索引蓝图',
            items: [
              'Sitemap是列出你希望搜索引擎抓取的所有重要页面的文件（通常是yourdomain.com/sitemap.xml）',
              '动态更新：用SEO插件（Yoast/Rank Math）自动生成，发布新文章时自动更新',
              '提交到GSC：在Google Search Console中手动提交Sitemap链接',
              '只包含高质量页面：不要把404页面、重复内容或被Noindex的页面放进Sitemap',
            ],
          },
          {
            heading: 'Robots.txt：爬虫的准入协议',
            items: [
              '放在网站根目录的文本文件，告诉爬虫哪些路径可以访问、哪些不可以',
              '常见指令：User-agent: *（针对所有爬虫）；Disallow: /admin/（禁止访问后台）',
              '在Robots.txt末尾添加 Sitemap 路径，方便爬虫发现',
              '警告：千万不要Disallow你的CSS或JS文件夹，否则爬虫无法正常渲染页面',
            ],
            code: 'User-agent: *\nDisallow: /admin/\nDisallow: /user/preview/\nAllow: /\nSitemap: https://example.com/sitemap.xml',
          },
          {
            heading: '配置效果案例',
            items: [
              '某SaaS平台的用户个人预览页（无价值内容）被Google大量索引，导致核心产品页抓取缓慢',
              '在Robots.txt中添加Disallow: /user/preview/，更新Sitemap移除无价值页面',
              '结果：无效索引2周内开始下降，核心产品页抓取时间从周级缩短到小时级',
            ],
          },
        ],
        practice: [
          '确认你的网站已生成XML Sitemap，在Google Search Console中提交',
          '访问你的robots.txt（yourdomain.com/robots.txt），确保没有误禁重要内容目录',
          '在Robots.txt文件末尾添加你的Sitemap完整链接',
          '用GSC的"网址检查"功能测试几个重要页面是否可以被正常爬取',
        ],
      },
    ],
  },
  {
    num: 6,
    slug: 'module-6',
    title: '外链建设入门',
    subtitle: '让其他网站主动为你「投票」——外链是权威性的核心信号',
    duration: '约60分钟',
    intro: '理解外链的价值体系，掌握5种初级外链建设方法，制定可执行的外链计划。',
    chapters: [
      {
        id: 'module-6-chapter-1',
        title: '外链的作用和重要性',
        objective: '理解外链在SEO中的核心作用，认识到外链建设的战略意义',
        blocks: [
          {
            heading: '什么是外链',
            items: [
              '外链（Backlink）= 从其他网站指向你网站的链接，代表其他网站对你的「投票」',
              '外链是Google最重要的排名因素之一（仅次于内容质量）',
              'Google PageRank算法本质就是基于链接的——更多高质量外链 = 更高排名概率',
            ],
          },
          {
            heading: '外链的价值来源',
            items: [
              '权重传递：高权重网站（DA/DR高）的外链价值远高于低权重网站',
              '相关性：来自同领域网站的外链价值是不相关网站的10倍',
              '引荐流量：高质量外链不仅提升排名，还直接带来真实访问流量',
              '品牌建设：在权威网站被提及，提升品牌可信度',
            ],
          },
          {
            heading: '外链质量 vs 数量',
            items: [
              '5条DA 30+的外链 > 50条DA 5的外链',
              '初级阶段最忌讳：购买大量低质量外链（会被Google惩罚）',
              '正确策略：从少量高质量外链开始积累，慢慢建立权威性',
            ],
          },
        ],
        practice: [
          '用Ahrefs免费工具（ahrefs.com/backlink-checker）查看你的竞争对手的外链',
          '找出3个高质量的外链来源（DA > 20，与你领域相关）',
          '分析：对方为什么链接到竞争对手？是产品推荐？资源整理？案例引用？',
        ],
      },
      {
        id: 'module-6-chapter-2',
        title: '高质量外链的特征',
        objective: '学会识别什么是高质量外链，能够评估外链的价值',
        blocks: [
          {
            heading: '高质量外链的5个关键特征',
            items: [
              '特征1 - 高权重：来自DA/DR 20+的网站，DA 50+是顶级',
              '特征2 - 相关性：来自同领域、同主题的网站',
              '特征3 - 页面质量：有真实内容、经常更新、有用户互动（不是垃圾页面/链接农场）',
              '特征4 - Dofollow属性：默认属性，传递权重；Nofollow不传递权重',
              '特征5 - 描述性锚文本：「这篇SEO完全指南」比「点击这里」更有价值',
            ],
            table: {
              headers: ['外链类型', '获取难度', '总体价值'],
              rows: [
                ['新闻媒体', '很难', '★★★★★'],
                ['行业权威网站', '难', '★★★★☆'],
                ['高质量博客', '中等', '★★★☆☆'],
                ['博客评论', '容易', '★★☆☆☆'],
                ['目录提交', '很容易', '★☆☆☆☆'],
              ],
            },
          },
        ],
        practice: [
          '查看你自己网站的外链（Google Search Console → 链接），或用Ahrefs免费版查看',
          '对每条外链按5个特征评分，找出最有价值的和最需要剔除的',
          '制定外链健康度报告',
        ],
      },
      {
        id: 'module-6-chapter-3',
        title: '初级外链获取方法',
        objective: '掌握5种初级外链获取方法，能够制定可执行的外链建设计划',
        blocks: [
          {
            heading: '方法1：竞品分析法（最有效）',
            items: [
              '核心思路：分析竞争对手已经获得的外链，然后模仿获取相同来源',
              '步骤：Google搜索目标关键词 → 记录前3-5名网站 → 用Ahrefs导出其外链 → 筛选高质量来源 → 联系网站所有者',
              '为什么有效：证明这些来源愿意链接同类内容，成功率远高于冷接触',
            ],
          },
          {
            heading: '方法2：内容营销法（最持久）',
            items: [
              '写出足够优秀的内容，让其他网站主动引用你',
              '什么内容容易获得外链：原创数据/研究报告、终极指南（2000字+的深度内容）、免费工具或模板',
              '关键：内容要比现有内容「好10倍」，提供独特视角或数据',
            ],
          },
          {
            heading: '方法3：资源页面外链',
            items: [
              '很多网站有「推荐资源」页面，列出该领域的有用链接',
              '搜索方式：「你的行业 + inurl:resources」或「你的行业 + 推荐工具」',
              '联系邮件模板：简短介绍你的内容 + 说明它与对方资源页的相关性 + 请求被添加',
            ],
          },
          {
            heading: '方法4：Guest Post（访客博文）',
            items: [
              '在相关领域的博客上写文章，文章中包含指向你网站的外链',
              '寻找机会：搜索「你的行业 + write for us」或「你的行业 + guest post」',
              '注意：内容质量要高，不要在低质量网站上发文章',
            ],
          },
          {
            heading: '方法5：本地/行业目录提交',
            items: [
              '把你的网站提交到相关行业目录（如ProductHunt、GitHub、行业协会网站）',
              '这类外链权重不高，但建立初始信号，新站值得做',
              '目录要选相关的、有真实用户的，避免垃圾目录',
            ],
          },
        ],
        practice: [
          '选择竞品分析法：找出排名第1的竞争对手，用Ahrefs免费版查看其前10条外链',
          '其中有哪些来源你也可以获取？制定联系计划',
          '本周完成：向1个相关资源页面提交你的内容',
        ],
      },
    ],
  },
  {
    num: 7,
    slug: 'module-7',
    title: 'GEO SEO与国际化',
    subtitle: '覆盖本地搜索和全球市场——让你的网站被全球用户找到',
    duration: '约75分钟',
    intro: '掌握本地SEO、多语言架构和Hreflang配置，为出海内容站和本地服务业打好全球化基础。',
    chapters: [
      {
        id: 'module-7-chapter-1',
        title: 'GEO SEO基础',
        objective: '理解地理位置SEO的重要性，掌握针对特定地区优化的方法',
        blocks: [
          {
            heading: '什么是GEO SEO',
            items: [
              'GEO SEO = 针对特定地理位置进行的搜索引擎优化，目标是在特定地区的搜索结果中排名更好',
              '适用场景：本地服务业（餐厅/律所）、出海工具站（多语言多地区流量）、SaaS产品（本地化支持）',
            ],
          },
          {
            heading: '为什么GEO SEO很重要',
            items: [
              '全球46%的搜索包含地理位置信息；移动端「我附近」搜索每年增长50%+',
              'Google根据用户位置显示不同的搜索结果，本地信号直接影响排名',
              '本地搜索转化率最高——搜索「北京SEO咨询」的用户有明确购买意图',
            ],
          },
          {
            heading: '地理位置信号的种类',
            items: [
              '显式信号：URL中的国家代码（.uk/.de）、子目录语言代码（/en/ /zh/）、GSC中的地理位置设置、Hreflang标签',
              '隐式信号：服务器IP位置、内容中提到的城市名和地址、本地化内容和语言',
              '业务信号：Google My Business信息、本地评价和评分、本地电话号码和地址',
            ],
          },
        ],
        practice: [
          '在Google搜索「[你的行业] [你的城市]」，观察本地搜索结果',
          '你的网站出现了吗？竞争对手是谁？他们做了哪些本地SEO优化？',
          '如果你的业务需要本地流量，检查是否已设置Google My Business',
        ],
      },
      {
        id: 'module-7-chapter-2',
        title: '本地SEO（Local SEO）',
        objective: '掌握本地搜索优化的方法，提升在特定地区的搜索排名',
        blocks: [
          {
            heading: 'Google My Business（GMB）优化',
            items: [
              'GMB是本地SEO最重要的因素——几乎所有本地搜索结果都包含GMB信息',
              '必须完整的信息：企业名称、准确地址、本地电话、营业时间、网站链接、业务类别',
              '每周发布GMB Post（促销/新服务）：贴文会在搜索结果中显示，吸引点击',
              '积极管理评价：回复好评和差评，鼓励满意客户留评——评价数量和评分直接影响排名',
            ],
          },
          {
            heading: '本地关键词优化',
            items: [
              '本地关键词特征：包含地理位置（「上海律师」「纽约牙医」）、竞争低、转化率高',
              '研究方法：Google搜索建议 + 关键词工具按地区过滤 + 分析本地竞争对手',
              '布局：首页包含主要地区词，服务页面包含更具体的地区+服务关键词',
            ],
          },
          {
            heading: 'NAP一致性',
            items: [
              'NAP = Name、Address、Phone（名称/地址/电话）',
              'Google用NAP一致性验证企业真实性——在所有平台（网站、GMB、Yelp、社交媒体）保持完全一致',
              'NAP不一致会直接降低本地排名',
              '定期审计所有平台的企业信息，确保格式完全相同',
            ],
          },
        ],
        practice: [
          '如果你有本地业务，审核你的GMB信息：是否完整？照片是否有5张以上？最近一次Post是什么时候？',
          '检查你的网站、GMB、Yelp/大众点评上的NAP是否完全一致',
          '在Google搜索你的企业名称，看看哪些平台展示了你的信息',
        ],
      },
      {
        id: 'module-7-chapter-3',
        title: '多语言和多地区SEO',
        objective: '掌握多语言网站的SEO优化方法，避免重复内容和流量分散的陷阱',
        blocks: [
          {
            heading: '多语言网站架构选择',
            items: [
              '强烈推荐子目录方案：权重集中、只需一个GSC账户管理、Google官方推荐',
            ],
            table: {
              headers: ['方案', '示例', '优势', '劣势', '推荐度'],
              rows: [
                ['子目录', 'example.com/en/ /zh/', '权重集中在主域名，易管理', '稍复杂', '★★★★★'],
                ['子域名', 'en.example.com', '独立管理每个语言版本', '权重分散被视为独立站', '★★☆☆☆'],
                ['独立域名', 'example.com（英）example.cn（中）', '完全独立', '维护成本高', '★★☆☆☆'],
              ],
            },
          },
          {
            heading: 'Hreflang标签配置',
            items: [
              'Hreflang告诉搜索引擎不同语言/地区版本页面的对应关系，避免重复内容问题',
              '没有Hreflang：多个语言版本被视为重复内容，导致权重分散',
              '配置方式：在每个语言版本的HTML head中添加相互指向的hreflang标签',
              '每个页面必须有自我引用（自己也指向自己）',
            ],
            code: `<!-- 英文版页面 head 中添加 -->
<link rel="alternate" hreflang="en" href="https://example.com/en/" />
<link rel="alternate" hreflang="zh" href="https://example.com/zh/" />
<link rel="alternate" hreflang="ja" href="https://example.com/ja/" />
<!-- 自我引用（必须）-->
<link rel="alternate" hreflang="en" href="https://example.com/en/" />`,
          },
          {
            heading: '多语言内容策略',
            items: [
              '不要机器翻译——Google会识别低质量翻译，排名很差',
              '每个语言版本都应该针对当地用户优化——不只是翻译文字，而是适配当地的搜索习惯',
              '本地关键词研究：不同语言的用户搜索习惯不同，需要分别做关键词研究',
              '出海工具站策略：先做英语市场（流量最大），再扩展日/韩/德等语言',
            ],
          },
        ],
        practice: [
          '如果你计划做多语言网站，选择子目录方案并规划URL结构',
          '用Google Search Console配置目标地区（设置 → 国际定向）',
          '在你的英文首页和中文首页之间添加正确的Hreflang标签，并用Google的Hreflang测试工具验证',
        ],
      },
    ],
  },
  {
    num: 8,
    slug: 'module-8',
    title: 'Bonus：AI工具辅助SEO',
    subtitle: '用AI工具10倍提升SEO效率——从关键词到内容全流程',
    duration: '约45分钟',
    intro: '掌握5类AI工具的SEO应用场景，把重复性工作交给AI，把创意和策略留给自己。',
    chapters: [
      {
        id: 'module-8-chapter-1',
        title: 'AI关键词研究与竞争分析',
        objective: '用AI工具快速发现关键词机会，10倍提升竞争分析效率',
        blocks: [
          {
            heading: 'ChatGPT / Claude做关键词头脑风暴',
            items: [
              'Prompt模板：「我做[你的利基市场]，目标用户是[描述]，帮我列出50个他们可能搜索的长尾关键词」',
              '快速生成修饰词变体：「把这10个关键词用"for beginners / 2024 / free / best"等修饰词扩展成50个」',
              '发现竞争对手遗漏的角度：「分析[竞争对手URL]的内容，找出他们没有覆盖但用户可能关心的子话题」',
            ],
          },
          {
            heading: 'AI辅助SERP意图分析',
            items: [
              '把搜索结果前10名的标题和描述粘贴给AI，让它分析用户意图模式',
              '识别内容缺口：「这些排名页面都在讲X，但没有人讲Y——Y就是你的差异化机会」',
              '自动分类关键词意图：批量粘贴关键词，让AI分类为信息型/商业型/交易型',
            ],
          },
          {
            heading: '推荐工具组合',
            items: [
              'Ahrefs / SEMrush：获取真实搜索量和KD数据（AI无法替代这个）',
              'ChatGPT / Claude：关键词创意、意图分析、内容缺口发现',
              'Perplexity：实时搜索，了解某话题当前被引用最多的内容是什么',
            ],
          },
        ],
        practice: [
          '用ChatGPT为你的核心业务生成50个长尾关键词候选',
          '将候选词导入Ahrefs验证搜索量和KD，筛选出KD < 20的词',
          '让AI分析你的前3个竞争对手的内容，找出他们都遗漏的角度',
        ],
      },
      {
        id: 'module-8-chapter-2',
        title: 'AI内容写作辅助',
        objective: '用AI加速内容生产，同时保持真实性和E-E-A-T质量标准',
        blocks: [
          {
            heading: 'AI辅助内容创作的正确姿势',
            items: [
              '用AI起草，人工优化：AI负责80%的结构和初稿，你负责加入真实案例、数据和个人观点',
              'Answer-first写作：让AI先写一段200字以内的直接答案，再展开细节',
              '永远不要直接发布AI全文：Google能识别低质量AI内容，E-E-A-T要求真实的经验和专业性',
            ],
          },
          {
            heading: '高效内容生产Prompt模板',
            items: [
              '文章大纲：「为关键词[XXX]写一个SEO优化的文章大纲，包含H2和H3标题，涵盖用户所有可能的问题」',
              'Meta标签：「为这篇文章写3个版本的Title（50-60字符）和Meta Description（150-160字符）」',
              'FAQ区块：「基于这篇文章，生成8个用户最可能搜索的FAQ问答」',
              '内容更新：「这是我2022年写的旧文章，帮我识别需要更新的部分并给出修改建议」',
            ],
          },
          {
            heading: 'AI写作工具对比',
            items: [
              'ChatGPT（GPT-4o）：通用能力最强，适合任何类型的内容创作',
              'Claude：长文档处理能力出色，适合整理和改写大量内容',
              'Perplexity：附带引用来源，适合需要数据支撑的内容',
              'Jasper / Surfer AI：专门为SEO优化的写作工具，可以分析竞争对手并给出关键词密度建议',
            ],
          },
        ],
        practice: [
          '选一个你想写的关键词，用AI生成文章大纲，然后人工评估：是否有遗漏的重要角度？',
          '用AI为你最重要的5个页面重写Title和Meta Description，再人工筛选最好的版本',
          '为你最近发布的一篇文章让AI生成FAQ区块，添加到文章末尾',
        ],
      },
      {
        id: 'module-8-chapter-3',
        title: 'AI技术SEO工具',
        objective: '用AI工具自动化技术SEO的检查和修复，让技术问题不再是障碍',
        blocks: [
          {
            heading: 'Schema Markup自动生成',
            items: [
              'AI可以根据页面内容自动生成JSON-LD Schema代码（FAQ、HowTo、Article、Product类型）',
              'Prompt：「为以下FAQ内容生成FAQPage类型的JSON-LD Schema markup代码」',
              '直接用Claude或ChatGPT生成，粘贴到页面的<head>中即可',
            ],
          },
          {
            heading: 'AI辅助内容审计',
            items: [
              '将Google Search Console数据导出为CSV，让AI分析哪些页面需要优先优化',
              '批量检查内链机会：把站内所有文章标题和URL给AI，让它推荐哪些文章之间应该互相链接',
              '发现内容缺口：让AI对比你的内容目录和竞争对手的目录，找出你缺少的话题',
            ],
          },
          {
            heading: 'AI SEO工具推荐',
            items: [
              'Surfer SEO：分析竞争对手页面，给出关键词使用建议和内容评分',
              'Clearscope：内容优化建议，确保覆盖相关语义词汇',
              'SEO.ai：专为SEO设计的AI写作和优化一体化平台',
              'ChatGPT + Code Interpreter：上传sitemap或爬虫数据，让AI直接分析问题',
            ],
          },
        ],
        practice: [
          '用AI为你的核心FAQ页面生成FAQPage Schema代码，添加到页面并用Google Rich Results Test验证',
          '将你的文章列表（标题+URL）发给AI，让它推荐5对应该相互内链的文章',
          '让AI分析你的GSC点击率数据，找出点击率低于2%但排名在第1页的词——这些是优化Title的机会',
        ],
      },
    ],
  },
];

export function getSeoModule(num: number): SeoModule | undefined {
  return SEO_MODULES.find(m => m.num === num);
}
