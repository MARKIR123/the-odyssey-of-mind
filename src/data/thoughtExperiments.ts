import { ThoughtExperiment } from '../types/philosophy';

export const THOUGHT_EXPERIMENTS_DATA: ThoughtExperiment[] = [
  {
    id: 'trolley-problem',
    title: {
      zh: '电车难题',
      en: 'The Trolley Problem'
    },
    originator: '菲利帕·福特 (Philippa Foot) & 朱迪斯·汤姆森',
    scenario: '一辆失控的电车正飞速驶来，前方轨道上有5名无辜工人。你正站在轨道扳道器旁，如果你拉动扳手，电车将转向侧轨，但侧轨上有1名工人。你是否会拉动扳手？',
    questionPrompt: '面对5条人命与1条人命的抉择，你的选择是：',
    options: [
      {
        id: 'pull-lever',
        text: '果断拉动扳手：牺牲1人换取5人存活。',
        alignedSchool: '功利主义 (Utilitarianism - 边沁/密尔)',
        explanation: '功利主义认为道德的核心是“追求最大多数人的最大幸福”。5大于1，在可预测的后果计算中，减少生命的净损失是理性的正确之举。',
        statPercentage: 68,
        personalityTrait: {
          dimension: 'U_D',
          score: -0.8
        }
      },
      {
        id: 'do-not-pull',
        text: '不拉动扳手：绝不主动成为杀害无辜者的直接凶手。',
        alignedSchool: '康德道义论 (Deontology - 康德)',
        explanation: '道义论认为人永远是目的，不能把无辜个体的生命当成挽救他人的“数学工具”。主动杀人违反了不可侵犯的绝对道德律令。',
        statPercentage: 32,
        personalityTrait: {
          dimension: 'U_D',
          score: 0.8
        }
      }
    ],
    philosophicalDebate: '变体问题“天桥胖子”：如果不是扳道岔，而是需要你亲手把一个无辜路人推下天桥去卡住电车救5人，大多数人就会瞬间拒绝。这揭示了人类道德直觉中“行为后果计算”与“直接剥夺生命侵犯”之间的深刻撕裂。',
    culturalConnections: ['《底特律：变人》', '《蝙蝠侠：黑暗骑士》']
  },
  {
    id: 'ship-of-theseus',
    title: {
      zh: '忒修斯之船',
      en: 'The Ship of Theseus'
    },
    originator: '普鲁塔克 (Plutarch) & 托马斯·霍布斯',
    scenario: '古希腊英雄忒修斯的木船在海上长期航行，木板逐渐腐朽，船员不断用新木板替换旧木板。直到最后一块旧木板被换下，整艘船没有一块原来的木头。这艘船还是原来的忒修斯之船吗？如果有人用换下来的所有旧木板重新拼装成了一艘船，哪一艘才是真正的那艘船？',
    questionPrompt: '当所有物理构成被完全替换后，实体的同一性（Identity）依然存在吗？',
    options: [
      {
        id: 'continuous-identity',
        text: '换完新木板的船依然是原船：其功能的连续性与历史轨迹定义了它。',
        alignedSchool: '形式/功能同一性 (Functionalism & Aristotle)',
        explanation: '亚里士多德认为事物的本质在于其“形式因”与“目的因”。只要船在航行中保持了结构的连续演进，它就维系了同一性。',
        statPercentage: 54,
        personalityTrait: {
          dimension: 'E_R',
          score: 0.6
        }
      },
      {
        id: 'material-identity',
        text: '它早已不是原来的船；由旧木板重新拼装的那艘才是真身（或者两艘都不是）。',
        alignedSchool: '质料实在论与佛家无我 (Mereological Essentialism / Anatta)',
        explanation: '没有固定不变的“船的灵魂”。万物皆是因缘和合的暂时聚合物，所谓“同一性”只是人类语言强加的概念标签（如佛教“诸行无常，诸法无我”）。',
        statPercentage: 46,
        personalityTrait: {
          dimension: 'E_R',
          score: -0.6
        }
      }
    ],
    philosophicalDebate: '这个实验直接关涉人类自我意识：人体内的每一个细胞在7年内几乎都会被全部更新代谢一遍，那么7年前的你和今天的你，凭什么是“同一个人”？',
    culturalConnections: ['《活体脑细胞 (SOMA)》', '《旺达幻视》', '《攻壳机动队》']
  },
  {
    id: 'allegory-of-the-cave',
    title: {
      zh: '柏拉图的洞穴',
      en: 'Allegory of the Cave'
    },
    originator: '柏拉图 (Plato) 《理想国》第七卷',
    scenario: '一群囚徒自幼被铁链锁在幽暗洞穴中，只能面朝石壁。身后火光将各种器物的影子投射在石壁上，囚徒们以为影子就是世界的全部真相。有一天，你挣脱了铁链爬出洞穴，第一次看到了刺眼但真实的阳光与灿烂天地。',
    questionPrompt: '你是否会选择冒险重回洞穴，去唤醒那些可能会嘲笑你、甚至杀死你的昔日狱友？',
    options: [
      {
        id: 'return-cave',
        text: '重返洞穴启蒙同胞：即使被当作疯子甚至被处死，也要传递真理。',
        alignedSchool: '哲学家的启蒙担当 (Plato & Socrates)',
        explanation: '真正的智者不仅追求个人灵魂的解放，更肩负照亮城邦与人类良知的使命，如同苏格拉底虽千万人吾往矣。',
        statPercentage: 62,
        personalityTrait: {
          dimension: 'I_M',
          score: 0.7
        }
      },
      {
        id: 'stay-sunlight',
        text: '留在阳光下自由生活：不强行将真理强加给尚未准备好觉醒的人。',
        alignedSchool: '自然逍遥与尊重自性 (Zhuangzi & Epicurus)',
        explanation: '庄子曰“夏虫不可语冰，井蛙不可语海”。盲目打碎别人的安宁幻象可能带来毁灭，不如顺应天性独善其身。',
        statPercentage: 38,
        personalityTrait: {
          dimension: 'I_M',
          score: -0.7
        }
      }
    ],
    philosophicalDebate: '揭示了认知的残酷性：真理往往伴随着刺眼的痛苦，而虚假的谎言往往包裹着温暖舒适的安慰。人类到底更渴望真理还是舒适？',
    culturalConnections: ['《黑客帝国》', '《楚门的世界》', '《盗梦空间》']
  },
  {
    id: 'experience-machine',
    title: {
      zh: '诺齐克的体验机',
      en: 'The Experience Machine'
    },
    originator: '罗伯特·诺齐克 (Robert Nozick)',
    scenario: '科学家发明了一台“体验机”，只要接入它，你的大脑就会获得任何你渴望的无上幸福体验（成为顶级艺术家、与真爱相伴、拥有无尽财富），而且在机内你完全不会察觉这一切是虚构的。一旦进入，你将度过极其快乐的一生。',
    questionPrompt: '你会选择永远接入这台体验机吗？',
    options: [
      {
        id: 'plug-in',
        text: '接入体验机：快乐与主观幸福就是生命的终极意义。',
        alignedSchool: '快乐主义 / 享乐功利主义 (Hedonism - 伊壁鸠鲁/边沁)',
        explanation: '如果一切体验对意识来说都是神经电信号，能够一生免受痛苦并享有完美幸福，何乐而不为？',
        statPercentage: 27,
        personalityTrait: {
          dimension: 'N_X',
          score: -0.8
        }
      },
      {
        id: 'refuse-plug',
        text: '拒绝接入：我宁愿在真实世界中承受真实的缺憾与痛苦，也不要虚幻的快乐。',
        alignedSchool: '存在主义与本体真实论 (Nozick & Sartre)',
        explanation: '人类不仅渴望“拥有做某事的体验”，我们更渴望“真真切切地去成为某个人、真实地做出行动与产生连接”。',
        statPercentage: 73,
        personalityTrait: {
          dimension: 'N_X',
          score: 0.8
        }
      }
    ],
    philosophicalDebate: '这个实验重创了纯粹的快乐主义：证明了人类灵魂深处对“真实连接”与“自主能动性”的渴望，远高于单纯的多巴胺快感。',
    culturalConnections: ['《黑客帝国（红蓝药丸）》', '《赛博朋克2077》']
  },
  {
    id: 'veil-of-ignorance',
    title: {
      zh: '无知之幕',
      en: 'The Veil of Ignorance'
    },
    originator: '约翰·罗尔斯 (John Rawls) 《正义论》',
    scenario: '假设大家要坐下来为未来的社会制定一套政治与经济规则。但在开会前，所有人被拉上了一道“无知之幕”——你完全不知道自己走出幕布后会是一个亿万富翁、一个残障人士、一个天资平庸的底层劳工，还是某个少数族裔。',
    questionPrompt: '在完全未知的恐惧下，你制定的社会正义原则会更偏向：',
    options: [
      {
        id: 'difference-principle',
        text: '最大程度保障最弱势群体的利益（差异原则与兜底福利）。',
        alignedSchool: '自由平等主义 / 正义即公平 (Rawlsian Justice)',
        explanation: '因为你随时可能是那个最不幸的人，理性的决策必然是提高社会底层的最低保障线（最大化最小值原则 Maximin）。',
        statPercentage: 79,
        personalityTrait: {
          dimension: 'U_D',
          score: 0.5
        }
      },
      {
        id: 'libertarianism',
        text: '坚持绝对的机会均等与个人产权，不强制进行财富二次再分配。',
        alignedSchool: '古典自由主义 / 自由至上论 (Nozick / Hayek)',
        explanation: '只要过程公正合法，结果的差异就属于自然博弈，强行劫富济贫是对个人正当劳动所得的强制掠夺。',
        statPercentage: 21,
        personalityTrait: {
          dimension: 'U_D',
          score: -0.5
        }
      }
    ],
    philosophicalDebate: '现代福利国家制度与自由市场资本主义辩论的核心支柱。',
    culturalConnections: ['《饥饿游戏》', '《雪国列车》']
  },
  {
    id: 'chinese-room',
    title: {
      zh: '中文房间与缸中之脑',
      en: 'The Chinese Room & Brain in a Vat'
    },
    originator: '约翰·塞尔 (John Searle) & 希拉里·普特南',
    scenario: '一个完全不懂中文的英语母语者被关在一间屋子里，手里拿着一本详尽的英文对照符号规则书。门外不断递进汉字纸条，他根据规则书查找对应的汉字符号并递出去。门外的人以为里面是一个精通中文的大师，但里面的人自始至终对汉字的意义一无所知。',
    questionPrompt: '一个通过了图灵测试、能完美回答任何问题的超级AI，真的“拥有理解与意识”吗？',
    options: [
      {
        id: 'syntax-not-semantics',
        text: '它没有真正的意识：纯粹的形式计算（语法）永远无法等同于真正的主观理解（语义）。',
        alignedSchool: '生物自然主义 / 意识具身论 (John Searle)',
        explanation: 'AI只是在操纵无意义的0和1电信号矩阵，它永远没有“理解”的内在心灵状态。',
        statPercentage: 58,
        personalityTrait: {
          dimension: 'E_R',
          score: 0.7
        }
      },
      {
        id: 'system-understands',
        text: '系统整体具有意识：只要输入输出在功能上完全自洽，它就拥有等效的智慧与心灵。',
        alignedSchool: '功能主义与计算主义 (Functionalism & Dennett)',
        explanation: '人类大脑本质上也是无数个不懂汉语的单一神经元组成的生化计算机系统。',
        statPercentage: 42,
        personalityTrait: {
          dimension: 'E_R',
          score: -0.7
        }
      }
    ],
    philosophicalDebate: '直接触及强人工智能（AGI）的终极哲学红线：我们创造出的到底是有灵魂的新物种，还是只是一个宇宙规模的宏大算盘？',
    culturalConnections: ['《银翼杀手 2049》', '《机械姬 (Ex Machina)》', '《西部世界》']
  }
];
