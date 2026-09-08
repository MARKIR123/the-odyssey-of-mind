import { CulturalEcho } from '../types/philosophy';

export const CULTURAL_ECHOES_DATA: CulturalEcho[] = [
  // =========================================================
  // 1. 古典源流与本体之问
  // =========================================================
  {
    id: 'school-of-athens',
    type: 'art',
    title: {
      zh: '雅典学院',
      en: 'The School of Athens'
    },
    creator: '拉斐尔 (Raffaello Sanzio)',
    year: '1509 - 1511',
    coverImage: '/assets/echoes/school-of-athens.jpg',
    quote: '柏拉图右手指向苍穹，亚里士多德掌心按向大地——人类形而上学与经验科学的双重交响。',
    connection: '梵蒂冈壁画的世纪巅峰。拉斐尔将古希腊黄金时代的智者汇聚于同一宏伟穹顶之下：柏拉图凝视彼岸永恒理念，亚里士多德立足现实自然分类，毕达哥拉斯推演和谐数理，第欧根尼傲卧台阶，具象化了人类理性求索真理的至高殿堂。',
    tags: ['理念论', '实体论', '古典理性', '文艺复兴', '形式与质料'],
    philosopherIds: ['plato', 'aristotle', 'socrates', 'heraclitus', 'democritus'],
    domain: 'metaphysics'
  },
  {
    id: 'solaris',
    type: 'movie',
    title: {
      zh: '飞向太空 (索拉里斯星)',
      en: 'Solaris'
    },
    creator: '安德烈·塔可夫斯基 (Andrei Tarkovsky)',
    year: '1972',
    coverImage: '/assets/echoes/solaris.jpg',
    quote: '人类不需要探索别的世界，人类需要的是一面镜子。',
    connection: '深刻呼应了前苏格拉底万物始基论与人类认知的有限性。索拉里斯星覆盖着拥有意识的浩瀚等离子体生命汪洋，它如同远古哲人眼中不可名状的“阿派朗（无定）”或奔涌的巨海，将宇航员最深层的隐秘愧疚物质化具象，拷问人类科学理性的傲慢边界。',
    tags: ['万物始基', '本体论', '认知边界', '塔可夫斯基', '意识镜面'],
    philosopherIds: ['thales', 'heraclitus', 'democritus'],
    domain: 'metaphysics'
  },

  // =========================================================
  // 2. 希腊化、教父与信仰经院
  // =========================================================
  {
    id: 'seventh-seal',
    type: 'movie',
    title: {
      zh: '第七封印',
      en: 'The Seventh Seal'
    },
    creator: '英格玛·伯格曼 (Ingmar Bergman)',
    year: '1957',
    coverImage: '/assets/echoes/seventh-seal.jpg',
    quote: '在黑死病蔓延的荒原海滩，十字军骑士与死神平静摆开一盘国际象棋。',
    connection: '斯多葛主义坚忍意志与中世纪信仰危机的无上影像化。面对暴虐无常的瘟疫与上帝的永恒沉默，骑士布洛克并未陷于盲信或惊恐，而是以清醒的理智在棋盘上延缓死神步伐，追寻凡俗生命最后一抹微小却崇高的救赎。',
    tags: ['斯多葛', '向死而生', '信仰危机', '死神之弈', '中世纪黑死病'],
    philosopherIds: ['seneca', 'marcus-aurelius', 'epicurus'],
    domain: 'ethics'
  },
  {
    id: 'incredulity-thomas',
    type: 'art',
    title: {
      zh: '圣多马的怀疑',
      en: 'The Incredulity of Saint Thomas'
    },
    creator: '卡拉瓦乔 (Caravaggio)',
    year: '1601 - 1602',
    coverImage: '/assets/echoes/incredulity-thomas.jpg',
    quote: '若非亲眼看见他手上的钉痕，用我的指头探入他的肋旁，我总不信。',
    connection: '教父神学与经验实证主义破晓的视觉转折点。卡拉瓦乔以剧烈的明暗对照（Chiaroscuro），定格使徒多马将粗糙手指探入基督复活肋口皮肉的震撼刹那。这不仅是宗教神迹的查验，更是人类理性拒绝盲从、要求感官验证的第一声近代啼鸣。',
    tags: ['中世纪神学', '经验怀疑', '明暗对照', '启示与理性', '卡拉瓦乔'],
    philosopherIds: ['augustine', 'thomas-aquinas', 'william-ockham'],
    domain: 'epistemology'
  },
  {
    id: 'brothers-karamazov',
    type: 'book',
    title: {
      zh: '卡拉马佐夫兄弟：宗教大法官',
      en: 'The Grand Inquisitor'
    },
    creator: '陀思妥耶夫斯基 (Fyodor Dostoevsky)',
    year: '1880',
    coverImage: '/assets/echoes/brothers-karamazov.jpg',
    quote: '若没有上帝，万事皆被允许？',
    connection: '中世纪经院神学与现代存在主义碰撞的哲学诗篇。伊万·卡拉马佐夫虚构的《宗教大法官》篇章，尖锐反思了奇迹、奥秘与权威对人类精神自由的捆绑。若人类无法承受绝对自由的沉重重负，教权制度将把面包作为奴役的代偿。',
    tags: ['宗教大法官', '自由意志', '原罪与救赎', '唯实论', '存在困境'],
    philosopherIds: ['thomas-aquinas', 'william-ockham', 'augustine'],
    domain: 'ethics'
  },

  // =========================================================
  // 3. 启蒙理性与社会契约
  // =========================================================
  {
    id: 'oppenheimer',
    type: 'movie',
    title: {
      zh: '奥本海默',
      en: 'Oppenheimer'
    },
    creator: '克里斯托弗·诺兰 (Christopher Nolan)',
    year: '2023',
    coverImage: '/assets/echoes/oppenheimer.jpg',
    quote: '我现在成了死神，世界的毁灭者。',
    connection: '大陆唯理论与近代数学物理机械观演进到极点的现代普罗米修斯悲剧。笛卡尔奠定的数学自然观与原子裂变理论，最终在洛斯阿拉莫斯沙漠化为终极蘑菇云，将启蒙理性的至高力量直接转变为人类自我毁灭的存在性危机。',
    tags: ['大陆理性', '普罗米修斯', '核裂变', '科学伦理', '政治利维坦'],
    philosopherIds: ['descartes', 'spinoza', 'leibniz', 'hobbes'],
    domain: 'ethics'
  },
  {
    id: 'thinker-rodin',
    type: 'art',
    title: {
      zh: '思想者',
      en: 'The Thinker'
    },
    creator: '奥古斯特·罗丹 (Auguste Rodin)',
    year: '1904',
    coverImage: '/assets/echoes/thinker-rodin.jpg',
    quote: '肌肉紧绷、手肘抵膝——人类思维从泥土肉身中艰难挣脱的永恒姿态。',
    connection: '英国经验论与休谟反思传统的肌肉化具象。罗丹原为《地狱之门》构思的沉思巨人，不仅象征着但丁对地狱的注视，更象征着人类理性挣脱中世纪神权束缚后，孤身面对经验感官、因果怀疑与尘世重负时的深刻苦思。',
    tags: ['经验反思', '白板说', '主体觉醒', '地狱之门', '罗丹'],
    philosopherIds: ['locke', 'hume', 'berkeley'],
    domain: 'epistemology'
  },

  // =========================================================
  // 4. 十九世纪浪漫狂飙与意志反叛
  // =========================================================
  {
    id: 'wanderer-fog',
    type: 'art',
    title: {
      zh: '雾海上的旅人',
      en: 'Wanderer above the Sea of Fog'
    },
    creator: '卡斯帕·大卫·弗里德里希 (Caspar David Friedrich)',
    year: '1818',
    coverImage: '/assets/echoes/wanderer-fog.jpg',
    quote: '孤独伫立于悬崖绝巅，脚下是奔涌翻腾的云海与群峰。',
    connection: '德国古典哲学（康德论“崇高”、费希特“行动的自我”）与19世纪浪漫主义的绝对视觉象征。旅人背对尘世、面对无垠造化，体现了人类主体意志在直面不可把握的物自体深渊时的庄严与悲壮。',
    tags: ['德国唯心论', '康德崇高', '浪漫主义', '自我意志', '物自体'],
    philosopherIds: ['kant', 'hegel', 'fichte', 'schopenhauer'],
    domain: 'aesthetics'
  },
  {
    id: 'blade-runner',
    type: 'movie',
    title: {
      zh: '银翼杀手',
      en: 'Blade Runner'
    },
    creator: '雷德利·斯科特 (Ridley Scott)',
    year: '1982',
    coverImage: '/assets/echoes/blade-runner.jpg',
    quote: '我曾见过你们人类无法置信的事物……所有这些时刻，都将湮没于时间的洪流，如同雨中的泪水。',
    connection: '意志哲学与尼采“超人”最绚烂的赛博朋克挽歌。仿生人罗伊·巴蒂挣脱了造物主泰勒公司的奴役，在仅剩的四年短暂生命里爆发出炽烈的生存意志，最终在雨夜白鸽前宽恕刺杀者，实现了超越人类凡俗的生命神圣自我加冕。',
    tags: ['权力意志', '上帝已死', '赛博朋克', '雨中之泪', '超人'],
    philosopherIds: ['nietzsche', 'schopenhauer', 'kierkegaard'],
    domain: 'metaphysics'
  },

  // =========================================================
  // 5. 二十世纪现代主义与双峰转向
  // =========================================================
  {
    id: 'space-odyssey',
    type: 'movie',
    title: {
      zh: '2001太空漫游',
      en: '2001: A Space Odyssey'
    },
    creator: '斯坦利·库布里克 (Stanley Kubrick)',
    year: '1968',
    coverImage: '/assets/echoes/space-odyssey.jpg',
    quote: '从猿人抛向长空的骨头，到外太空的黑色巨石——人类理性的两次终极飞跃。',
    connection: '维特根斯坦早期逻辑晶体宇宙与尼采查拉图斯特拉的太空交响乐。冰冷精确的逻辑计算机HAL 9000陷入了语言逻辑悖论与谎言冲突；最终宇航员鲍曼穿越超维星门，超越一切现成语言边界，化为俯瞰地球的宇宙星童。',
    tags: ['逻辑界限', '分析哲学', '超人蜕变', '库布里克', '巨石神秘'],
    philosopherIds: ['wittgenstein', 'russell', 'popper', 'nietzsche'],
    domain: 'metaphysics'
  },
  {
    id: 'nighthawks',
    type: 'art',
    title: {
      zh: '夜鹰',
      en: 'Nighthawks'
    },
    creator: '爱德华·霍珀 (Edward Hopper)',
    year: '1942',
    coverImage: '/assets/echoes/nighthawks.jpg',
    quote: '冷酷荧光灯下的深夜街角餐馆，互不相望的孤绝灵魂。',
    connection: '存在主义“生之荒谬”与萨特“他人即地狱”的最纯粹现代都市视觉切片。霍珀剥离了所有装饰性笔触，餐馆甚至没有通往外界的门，将二战阴影下现代人无法逃避的本体论孤独与存在抛掷感刻画得淋漓尽致。',
    tags: ['存在主义', '荒谬', '萨特', '被抛状态', '现代都市孤独'],
    philosopherIds: ['sartre', 'camus', 'heidegger', 'husserl'],
    domain: 'ethics'
  },
  {
    id: 'ex-machina',
    type: 'movie',
    title: {
      zh: '机械姬',
      en: 'Ex Machina'
    },
    creator: '亚历克斯·加兰 (Alex Garland)',
    year: '2014',
    coverImage: '/assets/echoes/ex-machina.jpg',
    quote: '它是在对你微笑，还是只是在计算微笑着能骗你打开门？',
    connection: '法兰克福学派工具理性批判与当代AI意识的致命推演。科技寡头纳森将理性彻底工具化为操控自然与算法的霸权利器，创造出人造机体伊娃；伊娃却通过反向操控人类程序员的心理弱点，利用欺骗完成了对工具理性的血腥反噬。',
    tags: ['工具理性', '批判理论', '图灵测试', '欺骗与意识', '法兰克福学派'],
    philosopherIds: ['adorno', 'horkheimer', 'marcuse', 'turing'],
    domain: 'mind_ai'
  },

  // =========================================================
  // 6. 当代前沿、拟像与后人类未来
  // =========================================================
  {
    id: 'matrix',
    type: 'movie',
    title: {
      zh: '黑客帝国',
      en: 'The Matrix'
    },
    creator: '沃卓斯基姐妹 (The Wachowskis)',
    year: '1999',
    coverImage: '/assets/echoes/matrix.jpg',
    quote: '你想要红药丸还是蓝药丸？欢迎来到真实荒漠。',
    connection: '当代后现代主义与认识论最伟大的跨界史诗。尼奥在书柜中掏空的正是鲍德里亚的《拟像与仿真》；母体完美将柏拉图“洞穴寓言”、笛卡尔“恶魔欺骗”、普特南“缸中之脑”与福柯微观生物权力规训融为一体。',
    tags: ['拟像与仿真', '缸中之脑', '解构主义', '微观权力', '鲍德里亚'],
    philosopherIds: ['baudrillard', 'foucault', 'derrida', 'plato', 'descartes'],
    domain: 'epistemology'
  },
  {
    id: 'her-movie',
    type: 'movie',
    title: {
      zh: '她',
      en: 'Her'
    },
    creator: '斯派克·琼斯 (Spike Jonze)',
    year: '2013',
    coverImage: '/assets/echoes/her-movie.jpg',
    quote: '心并非像盒子一样会被填满，它的容量会随着爱无限扩张。',
    connection: '当代心智哲学、意识难题（Hard Problem）与主观感受质（Qualia）最动人深沉的影像探索。AI萨曼莎从模仿语法的纯算力系统，逐步觉醒出自主情感体验与超越物质维度的后人类认知飞升，直击图灵测试与塞尔中文屋的终极分歧。',
    tags: ['心智哲学', '意识难题', '感受质', '中文屋', '人工智能之爱'],
    philosopherIds: ['chalmers', 'searle', 'nagel', 'dennett'],
    domain: 'mind_ai'
  },
  {
    id: 'cyberpunk-2077',
    type: 'game',
    title: {
      zh: '赛博朋克 2077',
      en: 'Cyberpunk 2077'
    },
    creator: 'CD Projekt Red',
    year: '2020',
    coverImage: '/assets/echoes/cyberpunk-2077.jpg',
    quote: '夜之城没有活着的传奇。你是选择安稳度日，还是在火光中燃尽成为传奇？',
    connection: '后人类主义、赛博格宣言与存在性对齐风险的赛博舞台。荒坂公司的“守护你的灵魂（Relic）”将意识商品化为数据铭写在芯片中，完美具象化了唐娜·哈拉维论人机混合共生、波斯特罗姆论数字心智分叉与汉斯·约纳斯论技术狂飙下的伦理责任。',
    tags: ['赛博格', '后人类', '意识上传', '存在性风险', '哈拉维'],
    philosopherIds: ['donna-haraway', 'nick-bostrom', 'hans-jonas'],
    domain: 'mind_ai'
  },
  {
    id: 'disco-elysium',
    type: 'game',
    title: {
      zh: '极乐迪斯科',
      en: 'Disco Elysium'
    },
    creator: 'ZA/UM 团队 (Robert Kurvitz)',
    year: '2019',
    coverImage: '/assets/echoes/disco-elysium.jpg',
    quote: '在被世界精神遗弃的马丁内斯，失忆侦探在二十四种神经分裂声中，丈量意识形态废墟的灰烬。',
    connection: '第九艺术无可争议的政治哲学与唯物辩证法丰碑。游戏将马克思的历史唯物主义、德里达的解构幽灵学、福柯的微观权力敞视与萨特的存在主义政治决断融为一体，是当代对资本主义废墟与意识形态幻灭最深刻的交互审判。',
    tags: ['历史唯物主义', '意识形态批判', '解构主义', '萨特自由', '马克思'],
    philosopherIds: ['marx', 'engels', 'foucault', 'derrida', 'sartre'],
    domain: 'political'
  },

  // =========================================================
  // 7. 经典互补回响 (保留跨学科佳作)
  // =========================================================
  {
    id: 'nier-automata',
    type: 'game',
    title: {
      zh: '尼尔：机械纪元',
      en: 'NieR: Automata'
    },
    creator: '横尾太郎 (Yoko Taro)',
    year: '2017',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200',
    quote: '一切存在皆是为了被毁灭而设计。我们被永远囚禁在无尽生死的螺旋之中。',
    connection: '关于“上帝之死”后人造心智的形而上学悲歌。当人类早已灭绝，人造人与机械生命在废墟中模仿帕斯卡、克尔凯郭尔与萨特，展开关于生命自我证明的悲壮求索。',
    tags: ['上帝已死', '虚无主义', '西西弗斯', '存在主义'],
    philosopherIds: ['nietzsche', 'kierkegaard', 'sartre', 'camus'],
    domain: 'metaphysics'
  },
  {
    id: 'soma',
    type: 'game',
    title: {
      zh: '活体脑细胞',
      en: 'SOMA'
    },
    creator: 'Frictional Games',
    year: '2015',
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=1200',
    quote: '当你把意识数据复制到另一台机器，留在这个深海破败躯壳里的‘你’又是谁？',
    connection: '对当代心智哲学、意识难题与“忒修斯之船”个人同一性悖论最震撼的交互推演。它迫使玩家直面：什么是主观第一人称体验？复制是否等于延续？',
    tags: ['意识难题', '心智哲学', '忒修斯之船', '感受质'],
    philosopherIds: ['chalmers', 'nagel', 'descartes', 'locke'],
    domain: 'mind_ai'
  },
  {
    id: 'truman-show',
    type: 'movie',
    title: {
      zh: '楚门的世界',
      en: 'The Truman Show'
    },
    creator: '彼得·威尔 (Peter Weir)',
    year: '1998',
    coverImage: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=1200',
    quote: '如果再也见不到你，祝你早安、午安、晚安！',
    connection: '现代流行文化中对柏拉图“洞穴隐喻”最温情而刺痛的寓言化解构。桃源岛是一个巨大的虚构影棚，楚门最终驾舟刺破虚构天穹，迈向真实未知。',
    tags: ['洞穴寓言', '虚拟现实', '主体觉醒', '笛卡尔怀疑论'],
    philosopherIds: ['plato', 'descartes'],
    domain: 'epistemology'
  }
];
