import { EraTheme } from '../types/philosophy';

export const ERAS_DATA: EraTheme[] = [
  {
    id: 'axial-age',
    name: {
      zh: '轴心文明与古典源头',
      en: 'The Axial Age & Classical Antiquity'
    },
    timeRange: 'BC 800 - BC 200',
    startYear: -800,
    endYear: -200,
    vibeTitle: '帕特农大理石冷白、地中海晨光与青铜简帛长卷',
    artMovement: '古典希腊人体雕塑、多立克神庙柱式与中国先秦青铜礼乐铭文',
    artPhilosophyConnection: '古希腊艺术追求人体的神圣黄金分割与几何对称秩序，完美映照着泰勒斯至柏拉图对宇宙恒常秩序（Logos）与完美理念的追寻；东方先秦诸子则以青铜重器与简帛流云寄托对天道人伦、礼崩乐坏后的天人合一秩序重建。',
    architecturalStyle: '雅典娜神庙大理石回廊 · 先秦诸子漆木案几',
    backgroundImage: '/assets/backgrounds/bg_axial.jpg',
    masterpieceName: {
      zh: '拉斐尔《雅典学院》',
      en: 'The School of Athens by Raphael',
      artist: '拉斐尔 (Raffaello Sanzio)',
      year: '1509 - 1511',
      location: '梵蒂冈宗座宫签字厅'
    },
    cssClass: 'theme-greek',
    accentColor: '#d4a359',
    bgGradient: 'from-[#080b11] via-[#131b28] to-[#080b11]',
    cardBg: 'rgba(20, 27, 39, 0.7)',
    textColor: '#f1f5f9',
    borderColor: 'rgba(212, 163, 89, 0.26)',
    fontStyle: 'font-classical',
    texturePattern: '古典几何比例网格与大理石冷金浮雕纹理',
    description: '人类思维的第一次真正觉醒。从爱琴海滨的城邦辩论到黄河流域的百家争鸣，东西方智者几乎同时放下了原始神话的盲从，开始以人类自身的理性凝视宇宙本原与生命本质。',
    majorQuestions: [
      '世界的终极始基与本原是什么？水、火、原子，还是道与气？',
      '人应当如何在城邦与天地间实现最高的至善与仁义？',
      '我们眼见的万物流变背后，是否存在永恒不变的真理（理念/道）？'
    ],
    conceptExplanation: {
      term: '什么是“轴心文明”？(The Axial Age)',
      definition: '由哲学家雅斯贝尔斯提出：在公元前800至前200年间，在古希腊、古代中国、古印度等彼此隔绝的核心区，人类精神文明发生了人类史上最壮丽的同步爆发式觉醒。人类首次摆脱原始神话巫术的盲从，开始凭借人类自身的理性直面宇宙本原与生命终极意义，奠定了延续至今的人类思想母体。'
    },
    historicalCrisis: '古代神权统治破产与世俗动荡。东方周室衰微、诸侯争霸、礼崩乐坏；西方雅典城邦陷入伯罗奔尼撒内战与民主危机，智者诡辩乱政，苏格拉底以身殉道。',
    coreQuestionsAnalysis: [
      {
        dimension: '宇宙始基与终极本体',
        question: '万物生灭流变背后，是否存在永恒客观的本原？',
        explanation: '古希腊自泰勒斯的水、赫拉克利特的火与Logos，到柏拉图的超越理念；先秦老子体悟“无形之道”，庄子主张“天地与我并生，万物为一”。'
      },
      {
        dimension: '天下秩序与政治至善',
        question: '在动荡乱世中，人应当如何建立正义与善的共同体？',
        explanation: '孔子倡“克己复礼、天下归仁”，墨子求兼爱，法家立刑赏；柏拉图勾勒哲学王理想国，亚里士多德探讨城邦中庸与宪政。'
      },
      {
        dimension: '个体德性与精神超越',
        question: '面对虚妄、苦难与死亡，个体生命如何自处与安顿？',
        explanation: '苏格拉底坚持“未经审视的生活不值得过”，以产婆术叩问自心；庄子倡导“逍遥游、齐万物”，以诗性解构生死是非。'
      }
    ],
    eraManifesto: '“未经审视的生活不值得过；人法地，地法天，天法道，道法自然。”'
  },
  {
    id: 'hellenistic-medieval',
    name: {
      zh: '希腊化、罗马与中世纪经院',
      en: 'Hellenistic, Roman & Medieval Scholasticism'
    },
    timeRange: 'BC 200 - AD 1400',
    startYear: -200,
    endYear: 1400,
    vibeTitle: '哥特暗夜、彩绘玻璃圣光透射与金箔手抄本',
    artMovement: '罗马拱券工程、哥特式大教堂尖顶与修道院泥金手抄本 (Illuminated Manuscripts)',
    artPhilosophyConnection: '哥特建筑高耸入云的尖顶与彩绘玻璃折射出的神秘天光，将信徒的心灵从世俗泥淖引向超越维度的上帝之城；阿奎那与奥古斯丁试图以亚里士多德的理性之刃为信仰筑造坚不可摧的逻辑堡垒。',
    architecturalStyle: '哥特尖肋拱顶大教堂 · 修道院静谧回廊',
    backgroundImage: '/assets/backgrounds/bg_medieval.jpg',
    masterpieceName: {
      zh: '乔托《斯克罗威尼礼拜堂天顶》',
      en: 'Scrovegni Chapel Vault by Giotto',
      artist: '乔托 (Giotto di Bondone)',
      year: '1305',
      location: '意大利帕多瓦斯克罗威尼礼拜堂'
    },
    cssClass: 'theme-medieval',
    accentColor: '#c88a2e',
    bgGradient: 'from-[#07060e] via-[#171126] to-[#07060e]',
    cardBg: 'rgba(20, 15, 34, 0.7)',
    textColor: '#f3e8ff',
    borderColor: 'rgba(200, 138, 46, 0.25)',
    fontStyle: 'font-serif',
    texturePattern: '古拉丁经卷羊皮暗纹与修道院彩玻光斑',
    description: '在帝国崩溃与动荡岁月里，斯多葛派教导灵魂保持坚如磐石的“不动心 (Ataraxia)”；随后千年里，基督教教父与经院哲学家在信仰与理性、共相与殊相的激荡中，搭建了庞大的神学思辨体系。',
    majorQuestions: [
      '在外部世界风雨飘摇时，内心如何达成绝对的安宁与自洽？',
      '理性与信仰能够调和吗？我们能否通过逻辑推导证明终极神圣存在？',
      '共相（如“人性”、“美”）是独立真实存在的实体，还是仅仅是名称（唯名论 vs 唯实论）？'
    ],
    conceptExplanation: {
      term: '什么是“希腊化与经院哲学”？(Hellenistic & Scholasticism)',
      definition: '古典城邦自由瓦解，个体沦为庞大帝国的孤立臣民，哲学从宏大的“城邦建构”转向追求个体灵魂平安的“避难所”（斯多葛的不动心、伊壁鸠鲁的宁静）；中世纪时期，哲学家借助亚里士多德的严密逻辑工具，为超验信仰搭建理性论证堡垒。'
    },
    historicalCrisis: '罗马帝国崩溃瓦解、黑死病肆虐与漫长乱世。在凡俗尘世风雨飘摇中，人类迫切需要构筑不被外部命运侵蚀的灵魂堡垒，并在超越苦难的神圣维度中锚定存在的终极意义。',
    coreQuestionsAnalysis: [
      {
        dimension: '逆境自洽与内心不动心',
        question: '当身处的世界彻底失控时，个体如何保持绝对的尊严与宁静？',
        explanation: '马可·奥勒留提出“控制二分法”：严格区分可控的内心意志与不可控的外部祸福，顺应大自然命运；伊壁鸠鲁倡导精神无纷扰。'
      },
      {
        dimension: '理性与超验信仰的调和',
        question: '凡人有限的理性，能否证明甚至理解无限的神圣存在？',
        explanation: '托马斯·阿奎那创立“五路证明”，论证理性是信仰的前厅，恩典不废除自然；奥古斯丁宣示“我相信，故我理解”。'
      },
      {
        dimension: '共相本原与顿悟自性',
        question: '抽象概念是否真实独立存在？人如何脱离繁琐经卷证悟真理？',
        explanation: '西方唯实论与唯名论的世纪激辩孕育近代实证萌芽；东方禅宗六祖慧能打破读经执念，倡导“直指人心，见性成佛”。'
      }
    ],
    eraManifesto: '“伤害不在于外在事实，而在于你内心的解释；理性是通往终极真理的坚实阶梯。”'
  },
  {
    id: 'enlightenment',
    name: {
      zh: '文艺复兴与理性经验启蒙',
      en: 'Renaissance & The Age of Enlightenment'
    },
    timeRange: '15 - 18 世纪 (1400 - 1800)',
    startYear: 1400,
    endYear: 1800,
    vibeTitle: '达芬奇手稿蓝图、新古典铜版雕刻画与理性工坊',
    artMovement: '文艺复兴透视法、达芬奇解剖手稿与新古典主义精密铜版画',
    artPhilosophyConnection: '画师们用数学几何透视法在二维画布上重构真实空间，恰如笛卡尔、斯宾诺莎用公理化几何演绎心灵与实体；牛顿力学与百科全书运动将理性光芒洒向黑暗，人类第一次宣称自己是自然的主人。',
    architecturalStyle: '文艺复兴科学实验室 · 百科全书出版工坊',
    backgroundImage: '/assets/backgrounds/bg_enlighten.jpg',
    masterpieceName: {
      zh: '约瑟夫·怀特《哲学家讲授太阳系仪》',
      en: 'A Philosopher Lecturing on the Orrery',
      artist: '约瑟夫·怀特 (Joseph Wright of Derby)',
      year: '1766',
      location: '德比博物馆与艺术馆'
    },
    cssClass: 'theme-enlightenment',
    accentColor: '#d97736',
    bgGradient: 'from-[#0e0c08] via-[#221b12] to-[#0e0c08]',
    cardBg: 'rgba(30, 25, 18, 0.7)',
    textColor: '#fef3c7',
    borderColor: 'rgba(217, 119, 54, 0.28)',
    fontStyle: 'font-serif',
    texturePattern: '古董铜版蚀刻线稿与精密工程坐标网格',
    description: '“敢于认识！(Sapere aude!)” 笛卡尔的怀疑之火烧尽教条，确立了“我思故我在”的主体性；欧陆理性主义与不列颠经验主义展开世纪大对决，最终由康德发起“哥白尼式的认识论革命”，宣告人类理性的边界与崇高。',
    majorQuestions: [
      '我们所感知的一切，究竟来自先天的理性概念，还是后天的感官经验？',
      '因果律是世界的客观铁律，还是人类心智习惯的联想投射（休谟之问）？',
      '人是自由的吗？在机械决定论的物理宇宙中，人类的道德责任如何成立？'
    ],
    conceptExplanation: {
      term: '什么是“启蒙时代与理性主义”？(The Enlightenment)',
      definition: '康德名言：“启蒙就是人类脱离自己所加之于自己的不成熟状态。勇于运用你自己的理性！（Sapere aude!）”。近代自然科学（哥白尼、伽利略、牛顿）彻底打破了中世纪教会神权垄断，人类理性被首次奉为主宰世界的最高法官，确立了近代思想的主体性。'
    },
    historicalCrisis: '中世纪经院神权的愚昧教条压迫，以及近代机械科学兴起带来的世界观动荡：当宇宙被牛顿力学还原为钟表般的精密发条，人类心灵是否还有灵魂与自由意志的位置？'
    ,
    coreQuestionsAnalysis: [
      {
        dimension: '普遍怀疑与主体确立',
        question: '如果感官可能欺骗我们，人类认识的最坚固基石是什么？',
        explanation: '笛卡尔以恶魔怀疑论逼出无可怀疑的“我思故我在”；王阳明于龙场顿悟“心即理也、知行合一”，破除外在格物束缚。'
      },
      {
        dimension: '唯理论 vs 经验论世纪决战',
        question: '真理来源于心灵先天的逻辑演绎，还是来自后天的感官经验？',
        explanation: '斯宾诺莎以几何方式推导无限实体“神即自然”；休谟将知识归于知觉印象，论证因果律只是习惯联想，引爆怀疑论危机。'
      },
      {
        dimension: '认识界限与道德绝对律令',
        question: '人为自然立法的边界何在？机械物理宇宙中人类如何享有自由？',
        explanation: '康德完成哥白尼式认识论转向：人只能认识经范畴整理的现象，而无法触及物自体；在实践领域确立绝对命令：“人是目的，而非工具”。'
      }
    ],
    eraManifesto: '“Sapere aude! 勇于运用你自己的理性！人是目的，绝非工具。”'
  },
  {
    id: 'nineteenth-century',
    name: {
      zh: '19世纪狂飙、工业暗潮与意志批判',
      en: 'The 19th Century: Titans & The Great Critique'
    },
    timeRange: '19 世纪 (1800 - 1900)',
    startYear: 1800,
    endYear: 1900,
    vibeTitle: '浪漫主义崇高暴风雨、蒸汽钢铁与酒神血月',
    artMovement: '浪漫主义崇高风景 (弗里德里希/透纳)、现实主义与表现主义前奏',
    artPhilosophyConnection: '弗里德里希笔下伫立于雾海之巅孤独凝望悬崖的漫游者，正是19世纪思想家对抗冷酷工业社会的精神自画像；黑格尔的辩证历史巨轮与尼采宣称“上帝已死”后的精神深渊在暴风雨般的色彩中激烈碰撞。',
    architecturalStyle: '工业革命钢铁拱顶 · 雾海悬崖荒野画厅',
    backgroundImage: '/assets/backgrounds/bg_nineteen.jpg',
    masterpieceName: {
      zh: '卡斯帕·弗里德里希《雾海上的旅人》',
      en: 'Wanderer above the Sea of Fog',
      artist: '卡斯帕·大卫·弗里德里希 (Caspar David Friedrich)',
      year: '1818',
      location: '汉堡艺术馆 (Kunsthalle Hamburg)'
    },
    cssClass: 'theme-nineteenth',
    accentColor: '#b83a4b',
    bgGradient: 'from-[#0a0b10] via-[#1c141d] to-[#0a0b10]',
    cardBg: 'rgba(24, 21, 30, 0.7)',
    textColor: '#f1f5f9',
    borderColor: 'rgba(184, 58, 75, 0.28)',
    fontStyle: 'font-serif',
    texturePattern: '浓重油画颗粒、工业铁锈与深红天幕裂痕',
    description: '思想巨人彼此交锋的狂飙世纪。黑格尔构筑了庞大的绝对精神体系，随即引来叔本华的盲目意志论、克尔凯郭尔的个体信仰飞跃、马克思的唯物史观与资本解剖，以及尼采重估一切价值的狂人呼号。',
    majorQuestions: [
      '人类历史是在理性的推动下走向终极自由，还是受阶级斗争与物质利益所驱动？',
      '生命本质上是无尽欲望带来的痛苦与虚无，还是迸发创造力的权力意志？',
      '当传统的形而上学神圣支柱崩塌后，个体如何独自承受生存的重负并重塑意义？'
    ],
    conceptExplanation: {
      term: '什么是“19世纪意志与意识形态批判”？(The Great Critique)',
      definition: '启蒙理性构筑的乐观宏大叙事在工业革命异化与资本残酷现实中破裂。黑格尔建立起最后一个唯心辩证法宏大体系，随后激起了人类思想史最剧烈的反思浪潮：从唯物主义历史批判（马克思），到生命意志与虚无主义深渊（叔本华、尼采）。'
    },
    historicalCrisis: '工业革命蒸汽机器轰鸣带来的残酷劳动异化、资本扩张带来的阶级撕裂，以及传统宗教大厦倒塌后虚无主义（Nihilism）的全面降临——人类在失落了神圣彼岸的物质宇宙中陷入空前的无意义危机。',
    coreQuestionsAnalysis: [
      {
        dimension: '辩证巨轮与唯物史观',
        question: '人类历史演进的根本动力，是绝对精神还是现实物质生产？',
        explanation: '黑格尔断言绝对精神经由矛盾对立在正反合中辩证前进；马克思颠倒唯心体系，提出生产力与生产关系矛盾是历史根本推力，“问题在于改变世界”。'
      },
      {
        dimension: '生命本质与欲望深渊',
        question: '如果理性只是盲目欲望的傀儡，生命的痛苦是否永恒不可避免？',
        explanation: '叔本华洞察到生存即意志的无尽匮乏，“人生如钟摆，在痛苦与无聊中摆荡”，主张通过艺术审美获得片刻超脱。'
      },
      {
        dimension: '上帝之死与超人自我立法',
        question: '当传统的一切权威偶像崩塌后，个体如何免于堕入虚无泥潭？',
        explanation: '尼采宣告“上帝死了！重估一切价值”，号召直面生存苦难并践行命运之爱（Amor Fati），在深渊中以生命力锻造自我立法的超人。'
      }
    ],
    eraManifesto: '“哲学家们只是用不同的方式解释世界，而问题在于改变世界；每一个不曾起舞的日子，都是对生命的辜负。”'
  },
  {
    id: 'twentieth-century',
    name: {
      zh: '20世纪现代主义、语言转向与解构反叛',
      en: '20th Century: Language, Existentialism & Deconstruction'
    },
    timeRange: '20 世纪 (1900 - 2000)',
    startYear: 1900,
    endYear: 2000,
    vibeTitle: '包豪斯原色色块、打字机等宽字体与立体派拼贴',
    artMovement: '包豪斯、立体主义、达达主义拼贴、野兽派与波普艺术',
    artPhilosophyConnection: '达达主义撕碎传统审美的秩序拼贴，正如维特根斯坦、德里达撕开语言与形而上学的神话；波普艺术与包豪斯的功能极简，直接呼应了晚期资本主义批判与结构主义对主体性的解构。',
    architecturalStyle: '包豪斯极简玻璃展厅 · 达达主义反叛沙龙',
    backgroundImage: '/assets/backgrounds/bg_modern.jpg',
    masterpieceName: {
      zh: '康定斯基《第七号构图》',
      en: 'Composition VII by Wassily Kandinsky',
      artist: '瓦西里·康定斯基 (Wassily Kandinsky)',
      year: '1913',
      location: '莫斯科国立特列季亚科夫画廊'
    },
    cssClass: 'theme-modern',
    accentColor: '#3b82c4',
    bgGradient: 'from-[#0d0d10] via-[#141822] to-[#0d0d10]',
    cardBg: 'rgba(22, 22, 28, 0.75)',
    textColor: '#fafafa',
    borderColor: 'rgba(59, 130, 196, 0.3)',
    fontStyle: 'font-mono',
    texturePattern: '包豪斯红黄蓝纯粹几何、打字机网格与错位字符',
    description: '经历两次世界大战的浩劫，哲学告别了宏大叙事。海德格尔追问“存在的意义”，萨特加缪高呼“存在先于本质”与荒谬英雄；维特根斯坦引爆语言转向，“凡不可言说者必须保持沉默”；福柯与后现代思潮解构权力与话语微观机制。',
    majorQuestions: [
      '“我”并不是预先定义好的本质，而是在荒谬无常的世界中由每一次自由选择所塑造的吗？',
      '哲学的全部问题，是否归根结底只是日常语言误用所产生的“逻辑幻觉”？',
      '现代社会的规训（学校、医院、监狱、疯人院）是如何以科学理性的名义隐蔽施加权力的？'
    ],
    conceptExplanation: {
      term: '什么是“现代主义与语言转向”？(The Linguistic Turn)',
      definition: '经历两次世界大战的人间惨剧，哲学彻底告别了构建“终极真理宏大体系”的虚妄幻想。一方面，英美哲学转向分析日常语言与逻辑符号；另一方面，欧陆存在主义与后现代思潮高擎“解构”旗帜，将目光聚焦于具体的生存荒谬与社会微观权力规训。'
    },
    historicalCrisis: '奥斯威辛集中营与广岛核爆宣告了技术理性神话的血腥破产；极权主义统治、冷战核阴影与现代官僚体系的冷酷异化，使个体在荒谬且毫无指望的宇宙中承受空前的存在焦虑。',
    coreQuestionsAnalysis: [
      {
        dimension: '语言的界限与逻辑治疗',
        question: '千年以来的形而上学难题，是否仅仅是日常语言误用的假象？',
        explanation: '维特根斯坦前期主张“凡不可言说者必须保持沉默”，后期提出“语言游戏”，主张哲学使命是清除语言概念给思维带来的痉挛与误导。'
      },
      {
        dimension: '存在先于本质与荒谬反叛',
        question: '在没有上帝预设蓝图的冷漠宇宙中，人如何赋予自身生命价值？',
        explanation: '萨特断言“存在先于本质，人被判定为自由，人即是其选择”；加缪指出真正的哲学问题唯有自杀，推石上山的西西弗斯以清醒反叛实现崇高幸福。'
      },
      {
        dimension: '权力微观规训与形而上学解构',
        question: '现代社会的学校、医院、监狱，是如何以理性名义规训人性的？',
        explanation: '福柯揭示知识与权力的共谋，展现全景敞视社会的微观规训；德里达解构逻各斯中心主义，打破非黑即白的二元本质神话。'
      }
    ],
    eraManifesto: '“存在先于本质；在隆冬，我终于知道，我身上有一个不可战胜的夏天。”'
  },
  {
    id: 'contemporary-future',
    name: {
      zh: '当代前沿、心智之谜与数智后人类',
      en: 'Contemporary: Mind, AI & Post-Humanity'
    },
    timeRange: '21 世纪 - 至今 (2000 - 2026+)',
    startYear: 2000,
    endYear: 2050,
    vibeTitle: '黑曜石微晶镜面、神经元光纤与赛博算法流光',
    artMovement: '生成式算法艺术、赛博朋克超现实、数字故障 (Glitch Art) 与玻璃拟态',
    artPhilosophyConnection: '算法生成的流体晶体与无限维度的虚拟隐喻空间，直接投射了当今物理主义与心智哲学（Mind-Body Problem）对人类意识是否可计算、世界是否为数字全息模拟的极限追问。',
    architecturalStyle: '赛博黑曜石棱镜殿堂 · 量子神经全息展区',
    backgroundImage: '/assets/backgrounds/bg_cyber.jpg',
    masterpieceName: {
      zh: '韦伯太空望远镜《首张深空视界》',
      en: "Webb's First Deep Field (SMACS 0723)",
      artist: 'NASA / ESA / CSA (James Webb)',
      year: '2022',
      location: '深空宇宙天文台 (NASA Archives)'
    },
    cssClass: 'theme-contemporary',
    accentColor: '#0ea5b7',
    bgGradient: 'from-[#040507] via-[#091420] to-[#040507]',
    cardBg: 'rgba(10, 14, 22, 0.75)',
    textColor: '#ecfeff',
    borderColor: 'rgba(14, 165, 183, 0.32)',
    fontStyle: 'font-mono',
    texturePattern: '深邃黑曜石数码网格与神经元脉冲光纤',
    description: '人工智能奇点、脑机接口、合成生物学与虚拟元宇宙正在重构“人类”这一概念的物理与道德边界。从查尔默斯的“意识难题”、塞尔的中文房间，到加速主义与后人类伦理，哲学正处于人类物种命运的最前线。',
    majorQuestions: [
      '机器能够拥有主观感受体验（Qualia / 感受质）吗？纯粹的计算何时跃迁为真正的自我意识？',
      '如果人脑神经活动与决策完全受物理法则支配，所谓的“自由意志”是否只是一种生物演化错觉？',
      '在赛博数字化与基因编辑的后人类时代，什么是人类不可替代的尊严与存在的终极锚点？'
    ],
    conceptExplanation: {
      term: '什么是“心智之谜与后人类哲学”？(Mind, AI & Post-Humanity)',
      definition: '大语言模型、神经计算网络、脑机接口与虚拟现实技术将哲学推向了物种存续的第一线。哲学不再是书斋中的文字游戏，而是直接参与定义：“计算能否等同于理解？”、“机器能否拥有主体感受质（Qualia）？”、“虚拟世界是否享有本体真实？”。'
    },
    historicalCrisis: '碳基人类主体性地位的历史性动摇：算法在创造力、逻辑推理、语言生成上的飞跃甚至超越凡人，深度伪造消解了客观事实，赛博资本主义监控与通用人工智能奇点将人类带至存在的十字路口。',
    coreQuestionsAnalysis: [
      {
        dimension: '意识难题与符号语义鸿沟',
        question: '物理神经元的放电和算法矩阵计算，何时才能孕育出主观感受？',
        explanation: '图灵以模仿测试确立行为智能标准；塞尔以中文房间论证句法不等于语义；查尔默斯提出困难问题，并在《现实+》中论证虚拟现实亦是真实本体。'
      },
      {
        dimension: '自由意志与神经还原困境',
        question: '如果每一次心智决断皆受神经回路与物理法则驱动，自由意志是否只是幻觉？',
        explanation: '心智哲学界激烈探讨相容论与物理主义，追问在神经科学时代人类道德责任、法律正义与个体尊严如何重新确立立足点。'
      },
      {
        dimension: '算法母体批判与生命本体',
        question: '在数字拟像泛滥、信息过载的时代，人类真实的生命体验何以持存？',
        explanation: '齐泽克以精神分析解剖赛博意识形态的隐秘控制机制；李泽厚力倡“情本体”与“积淀说”，主张活生生的人间真情与感性体验是任何算法不可取代的终极实在。'
      }
    ],
    eraManifesto: '“机器可以模拟无限的计算，但唯有人类在脆弱有限的生命中，以爱与痛苦赋予存在以永恒的意义。”'
  }
];

