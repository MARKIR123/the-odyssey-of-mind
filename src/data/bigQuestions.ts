import { BigQuestion } from '../types/philosophy';
import { CULTURAL_ECHOES_DATA } from './culturalEchoes';

export const BIG_QUESTIONS_DATA: BigQuestion[] = [
  {
    id: 'metaphysics-reality',
    domain: 'metaphysics',
    domainTitle: {
      zh: '形而上学与本体论',
      en: 'Metaphysics & Ontology'
    },
    question: {
      zh: '什么是真实存在？世界由什么构成？',
      en: 'What is truly real? What constitutes reality?'
    },
    whyItMatters: '当虚拟现实、生成式AI与元宇宙日益逼真，我们每天在屏幕与实体世界之间穿梭——如果感官可以被电信号完全欺骗，我们凭什么确信眼前的世界是“真”的？',
    realWorldScenario: '如果你置身于一个与现实物理世界毫无二致的完全拟真脑机元宇宙中，且永远不会断电，你愿意拔掉插头回到痛苦的真实生活吗？',
    perspectives: [
      {
        philosopherId: 'plato',
        philosopherName: '柏拉图',
        coreArgument: '肉眼所见皆是幻影流变，唯有超越感官的永恒“理念 (Forms)”才是终极真实。',
        stance: '客观唯心主义 / 理型论'
      },
      {
        philosopherId: 'laozi',
        philosopherName: '老子',
        coreArgument: '天下万物生于有，有生于无；终极本原是不可言说的“道”，无形无相而生生不息。',
        stance: '东方道体论 / 辩证自然主义'
      },
      {
        philosopherId: 'descartes',
        philosopherName: '笛卡尔',
        coreArgument: '哪怕整个物理世界是恶魔制造的幻梦，那个正在进行怀疑与思考的“心灵实体”绝对真实存在。',
        stance: '心物二元论 / 认识论基石'
      },
      {
        philosopherId: 'chalmers',
        philosopherName: '查尔默斯',
        coreArgument: '虚拟现实世界也是一种完全合法的现实（Reality+），它包含真正的因果力量与有价值的人生。',
        stance: '数字实在论 / 心智哲学'
      }
    ],
    culturalEchoes: CULTURAL_ECHOES_DATA.filter(e => ['the-matrix', 'inception', 'soma'].includes(e.id))
  },
  {
    id: 'epistemology-truth',
    domain: 'epistemology',
    domainTitle: {
      zh: '认识论与真理之镜',
      en: 'Epistemology & The Limits of Reason'
    },
    question: {
      zh: '我们如何认识世界？人类能获知客观真理吗？',
      en: 'How do we know what we know? Can we attain objective truth?'
    },
    whyItMatters: '在“后真相时代”与信息茧房盛行的当下，算法根据我们的喜好投喂定制化事实，科学模型不断被证伪更迭——我们到底是通过理智照亮了真理，还是仅仅活在人类心智构造的幻象中？',
    realWorldScenario: '外星高等文明如果使用非线性的语言和感知器官观察宇宙，他们眼中的“物理定律”会和人类完全一样吗？还是说人类的物理学只是人类大脑结构的特有产物？',
    perspectives: [
      {
        philosopherId: 'hume',
        philosopherName: '休谟',
        coreArgument: '一切知识源于感官印象；我们从未观察到“因果必然性”，那只是人类心智的心理习惯。',
        stance: '经验主义 / 怀疑论'
      },
      {
        philosopherId: 'kant',
        philosopherName: '康德',
        coreArgument: '人的心灵为自然立法！我们只能认识戴着人类先验认知框架（时空与范畴）格式化后的“现象”，物自体永远不可知。',
        stance: '先验批判哲学'
      },
      {
        philosopherId: 'zhuangzi',
        philosopherName: '庄子',
        coreArgument: '此亦一是非，彼亦一是非；世俗争辩皆受限于视角与执念，唯有齐物逍遥方能见天地之大美。',
        stance: '齐物相对论 / 境界认识论'
      },
      {
        philosopherId: 'wittgenstein',
        philosopherName: '维特根斯坦',
        coreArgument: '语言的界限即世界的界限；许多传统哲学争端并非世界本身的秘密，而是滥用语言游戏规则导致的思维痉挛。',
        stance: '日常语言哲学'
      }
    ],
    culturalEchoes: CULTURAL_ECHOES_DATA.filter(e => ['arrival', 'the-truman-show', 'the-talos-principle'].includes(e.id))
  },
  {
    id: 'ethics-good-life',
    domain: 'ethics',
    domainTitle: {
      zh: '伦理学与人生意义',
      en: 'Ethics & The Meaning of Life'
    },
    question: {
      zh: '我们应当如何生活？在无常世界中意义何在？',
      en: 'How should we live? Where does meaning come from?'
    },
    whyItMatters: '内卷、虚无感、对死亡的焦虑是当代年轻人最普遍的精神困境。当传统宗教权威退场，当科技无法许诺心灵救赎，我们该如何在有限而脆弱的一生中安顿灵魂？',
    realWorldScenario: '如果你得知宇宙最终必将走向热寂归于虚无，你个人所有的努力、爱恨在千万年后都将彻底湮灭不留痕迹，你此刻的生活还会拥有意义吗？',
    perspectives: [
      {
        philosopherId: 'socrates',
        philosopherName: '苏格拉底',
        coreArgument: '知识即美德，未经审视的人生不值得过；做个心灵正直清醒的人比拥有世俗财富重要千万倍。',
        stance: '德性伦理学'
      },
      {
        philosopherId: 'marcus-aurelius',
        philosopherName: '马可·奥勒留',
        coreArgument: '分清什么是你能控制的（内心态度与品格），什么是你无法控制的（外界命运）；守住内心的城堡，安然如磐石。',
        stance: '斯多葛主义'
      },
      {
        philosopherId: 'nietzsche',
        philosopherName: '尼采',
        coreArgument: '上帝已死！不要退缩到软弱的奴隶道德中，勇敢在深渊边缘起舞，重估一切价值，成为自己的超人。',
        stance: '权力意志 / 超人哲学'
      },
      {
        philosopherId: 'camus',
        philosopherName: '加缪',
        coreArgument: '直面世界的荒谬，不妥协，不自杀；像西西弗斯推巨石上山一样，以最清醒英勇的姿态深情拥抱大地。',
        stance: '荒谬反叛 / 积极存在主义'
      },
      {
        philosopherId: 'wang-yangming',
        philosopherName: '王阳明',
        coreArgument: '致良知与知行合一；在日常事上磨练心性，此心光明，便是人间至善。',
        stance: '心学工夫论'
      }
    ],
    culturalEchoes: CULTURAL_ECHOES_DATA.filter(e => ['disco-elysium', 'the-stranger', 'eeaao', 'detroit-become-human'].includes(e.id))
  },
  {
    id: 'political-justice',
    domain: 'political',
    domainTitle: {
      zh: '政治哲学与理想社会',
      en: 'Political Philosophy & The Just Society'
    },
    question: {
      zh: '理想的社会结构是什么？自由、平等与权力的边界在哪？',
      en: 'What is a just society? Where lie the borders of liberty and power?'
    },
    whyItMatters: '贫富分化加剧、算法监控无处不在、全球地缘冲突频发——怎样的社会治理才能兼顾个人自由与集体福祉？什么是真正的正义？',
    realWorldScenario: '为了实现社会治安犯罪率为零的绝对安全，你是否愿意接受全天候无死角的脑电波监控与AI行为预判（如《少数派报告》）？',
    perspectives: [
      {
        philosopherId: 'plato',
        philosopherName: '柏拉图',
        coreArgument: '各司其职，正义就是城邦各阶层（统治者、卫士、劳动者）遵循智慧、勇敢与节制美德的和谐秩序。',
        stance: '理想国 / 哲学王统治'
      },
      {
        philosopherId: 'confucius',
        philosopherName: '孔子',
        coreArgument: '道之以德，齐之以礼，有耻且格；治国当以仁爱为本，君臣父子各修其德，实现大同天下。',
        stance: '德治与礼制'
      },
      {
        philosopherId: 'marx',
        philosopherName: '马克思',
        coreArgument: '至今一切社会的历史都是阶级斗争史；唯有消灭私有制与剥削，实现每个人的自由全面发展。',
        stance: '科学社会主义 / 唯物史观'
      },
      {
        philosopherId: 'foucault',
        philosopherName: '福柯',
        coreArgument: '权力不仅存在于政府，而是弥散在学校、医院、语言等微观技术中；哪里有规训，哪里就必须有反抗。',
        stance: '权力谱系学 / 后现代批判'
      }
    ],
    culturalEchoes: CULTURAL_ECHOES_DATA.filter(e => ['1984', 'the-metamorphosis', 'disco-elysium'].includes(e.id))
  }
];
