import { Philosopher } from '../types/philosophy';
import { BIOGRAPHIES_MAP } from './biographies';

const RAW_PHILOSOPHERS_DATA: Philosopher[] = [
  {
    "id": "thales",
    "name": {
      "zh": "泰勒斯",
      "en": "Thales of Miletus",
      "original": "Θαλῆς ὁ Μιλήσιος"
    },
    "eraId": "axial-age",
    "lifespan": "BC 624 - BC 546",
    "birthYear": -624,
    "deathYear": -546,
    "region": "west",
    "nationality": "古希腊·米利都",
    "avatar": "/assets/philosophers/thales.jpg",
    "schools": [
      "米利都学派",
      "伊奥尼亚自然哲学",
      "朴素唯物论源头"
    ],
    "primaryDomain": "metaphysics",
    "coreInsight": "水是万物之本原（Arche）；大地浮于水上，万物充满神灵与生机。",
    "analogy": "生命的羊水：如同万物皆从润泽的水汽中孕育生长、结晶或挥发，宇宙看似纷繁，底层实为流动的同一种物质统一体。",
    "summary": "西方哲学之父、希腊七贤之首。泰勒斯打破了荷马史诗以奥林匹斯诸神拟人意志解释宇宙的原始神话传统，首次尝试以客观经验可见的自然实体（水）来统摄千变万化的物理现象。他还准确预言了公元前585年的日食，奠定了西方科学经验观察与几何推理的理性基石。",
    "historicalImpact": "人类历史上第一次将宇宙终极解释权从神坛交还给客观自然的因果律，标志着理性从神话（Mythos）向科学（Logos）的伟大飞跃。",
    "keyConcepts": [
      {
        "term": "万物始基 (Arche)",
        "explanation": "宇宙最初、最根本且派生出一切具体事物的统一物质本体。"
      },
      {
        "term": "物活论 (Hylozoism)",
        "explanation": "物质本身具有自发内生生机与转化活力，并非死寂机械，如磁石吸铁即其自性。"
      },
      {
        "term": "几何理性化",
        "explanation": "将埃及实地丈量术升华抽象为演绎几何定理，首开数理证明先河。"
      }
    ],
    "famousQuotes": [
      {
        "quote": "水是万物之本原，万物皆从水中产生，又复归于水。"
      },
      {
        "quote": "认识你自己，乃是世间最难之事；而给他人提建议，则是世上最易之事。"
      }
    ],
    "notableWorks": [
      "《论日食》",
      "《论至点》",
      "《航海占星术》（均佚，由亚里士多德转引）"
    ],
    "influencedBy": [],
    "influenced": [
      "heraclitus",
      "democritus",
      "plato",
      "aristotle"
    ],
    "culturalEchoIds": [
      "solaris"
    ]
  },
  {
    "id": "heraclitus",
    "name": {
      "zh": "赫拉克利特",
      "en": "Heraclitus of Ephesus",
      "original": "Ἡράκλειτος"
    },
    "eraId": "axial-age",
    "lifespan": "BC 535 - BC 475",
    "birthYear": -535,
    "deathYear": -475,
    "region": "west",
    "nationality": "古希腊·以弗所",
    "avatar": "/assets/philosophers/heraclitus.jpg",
    "schools": [
      "爱奥尼亚学派",
      "朴素辩证法",
      "活火论"
    ],
    "primaryDomain": "metaphysics",
    "coreInsight": "人不能两次踏进同一条河流；万物皆流，唯变不变；宇宙是一团永恒的活火，由逻各斯（Logos）统摄。",
    "analogy": "奔腾的篝火：火焰不断吞噬薪柴化为飞灰与光热，看似稳定的火苗实则是剧烈转化对流的动态平衡。",
    "summary": "被称为“晦涩哲人”。赫拉克利特敏锐洞察到宇宙不是固态静止的陈列馆，而是一团按既定尺度燃烧与熄灭的永恒活火。他首创“逻各斯”概念，认为对立面的剧烈斗争乃万物化生的根本动力，冷热干湿在互搏中维系着最高深层的宇宙和谐。",
    "historicalImpact": "开创了西方辩证法的光辉源头，直接深刻启迪了黑格尔的辩证法与尼采的生成哲学与酒神精神。",
    "keyConcepts": [
      {
        "term": "万物皆流 (Panta Rhei)",
        "explanation": "世界一切现象皆在永不停息地生成、消逝与变迁之中，静止仅是感官假象。"
      },
      {
        "term": "逻各斯 (Logos)",
        "explanation": "贯穿宇宙万物运行、调控对立面转化的内在客观理性法则与永恒尺度。"
      },
      {
        "term": "对立面的统一",
        "explanation": "对立冲突非分裂破坏，而是万物生成繁衍的本质纽带（“战争是万物之父”）。"
      }
    ],
    "famousQuotes": [
      {
        "quote": "人不能两次踏进同一条河流，因为新的水流正不断涌来。"
      },
      {
        "quote": "这个世界过去、现在、未来都是一团永恒的活火，在既定的尺度上燃烧，在既定的尺度上熄灭。"
      }
    ],
    "notableWorks": [
      "《论自然》（散佚残篇百余条）"
    ],
    "influencedBy": [
      "thales"
    ],
    "influenced": [
      "hegel",
      "nietzsche",
      "marx",
      "heidegger"
    ],
    "culturalEchoIds": [
      "solaris",
      "school-of-athens"
    ]
  },
  {
    "id": "democritus",
    "name": {
      "zh": "德谟克利特",
      "en": "Democritus",
      "original": "Δημόκριτος"
    },
    "eraId": "axial-age",
    "lifespan": "BC 460 - BC 370",
    "birthYear": -460,
    "deathYear": -370,
    "region": "west",
    "nationality": "古希腊·阿布德拉",
    "avatar": "/assets/philosophers/democritus.jpg",
    "schools": [
      "原子论学派",
      "古典唯物论",
      "机械唯物主义"
    ],
    "primaryDomain": "metaphysics",
    "coreInsight": "宇宙的本质唯有原子（Atoma）与虚空（Void）；除此以外，一切可感特质都只是主观约定与虚妄意见。",
    "analogy": "无限乐高积木：无数肉眼不可见的微小硬核，在虚无空间中飞速旋转碰撞组合，拼出了星系、波涛与凡俗肉身。",
    "summary": "被称为“欢笑的哲人”。德谟克利特继承留基伯学说，构建了辉煌的原子论大厦。他断定物质由不可再分、坚硬致密的原子组成，原子仅具形状、大小、位置与排列次序差异。甜苦冷暖非事物本质属性，而是原子与感官接触时产生的第二性质。宇宙不存在盲目神迹，唯有铁的机械因果律。",
    "historicalImpact": "提出了近现代物理学原子学说的雏形，为欧洲唯物主义与科学还原论提供了最早的本体论模型。",
    "keyConcepts": [
      {
        "term": "不可分原子 (Atoma)",
        "explanation": "构成一切存在的最小、致密、不可分割且永恒不灭的客观物理微粒。"
      },
      {
        "term": "虚空 (Void)",
        "explanation": "原子运动不可或缺的空间条件，使原子能够自由飞舞、撞击与聚合。"
      },
      {
        "term": "机械因果必然性",
        "explanation": "宇宙中发生的一切事物皆有其必然的物理机械因果联系，绝无超自然干涉。"
      }
    ],
    "famousQuotes": [
      {
        "quote": "习惯上说有甜有苦，有冷有热，有色彩；但实际上唯有原子和虚空。"
      },
      {
        "quote": "与其做波斯帝国的国王，我宁愿发现一条自然界的因果定律。"
      }
    ],
    "notableWorks": [
      "《大宇宙系统》",
      "《论理性》",
      "《论人的本性》（残篇）"
    ],
    "influencedBy": [
      "thales",
      "heraclitus"
    ],
    "influenced": [
      "epicurus",
      "locke",
      "marx",
      "nietzsche"
    ],
    "culturalEchoIds": [
      "solaris",
      "matrix"
    ]
  },
  {
    "id": "socrates",
    "name": {
      "zh": "苏格拉底",
      "en": "Socrates",
      "original": "Σωκράτης"
    },
    "eraId": "axial-age",
    "lifespan": "BC 470 - BC 399",
    "birthYear": -470,
    "deathYear": -399,
    "region": "west",
    "nationality": "古希腊·雅典",
    "avatar": "/assets/philosophers/socrates.jpg",
    "schools": [
      "古典希腊哲学",
      "苏格拉底学派",
      "伦理理性主义"
    ],
    "primaryDomain": "ethics",
    "coreInsight": "认识你自己；我唯一知道的，就是我一无所知；未经审视的生活是不值得过的。",
    "analogy": "思想助产士：他不向人灌输现成真理，而是用不断深挖的诘问，引导你接生出原本深藏于灵魂中的自知与德性。",
    "summary": "将哲学“从天上召唤回人间”的西方圣哲。在智者学派兜售相对主义诡辩的时代，苏格拉底终身游荡在雅典街头，通过对话揭露城邦公民的自负与自相矛盾，坚持道德真理的客观普适性，最终以莫须有的叛神腐蚀青年罪名被判饮毒殉道。",
    "historicalImpact": "开创了西方批判性思维（Elenchus）与伦理学传统，奠定了西方理性主义对个体人格道德与知识同一性的最高崇敬。",
    "keyConcepts": [
      {
        "term": "精神助产术 (Elenchus)",
        "explanation": "通过反讽、归纳与层层诘问，粉碎伪知，引导求知者自觉接生出真理概念。"
      },
      {
        "term": "美德即知识",
        "explanation": "恶行源自对真正至善的无知；真正透彻明白真善之人，必不会悖德作恶。"
      },
      {
        "term": "自知其无知",
        "explanation": "意识到人类理性与感知的有限性，是摆脱偏狭盲目、踏上追求智慧之路的第一步。"
      }
    ],
    "famousQuotes": [
      {
        "quote": "未经审视的生活是不值得过的。",
        "source": "柏拉图《申辩篇》"
      },
      {
        "quote": "我唯一知道的，就是我一无所知。"
      }
    ],
    "notableWorks": [
      "无著作（思想由弟子柏拉图与色诺芬完整记录）"
    ],
    "influencedBy": [],
    "influenced": [
      "plato",
      "aristotle",
      "seneca",
      "epictetus",
      "kierkegaard"
    ],
    "culturalEchoIds": [
      "matrix",
      "truman-show",
      "school-of-athens"
    ]
  },
  {
    "id": "plato",
    "name": {
      "zh": "柏拉图",
      "en": "Plato",
      "original": "Πλάτων"
    },
    "eraId": "axial-age",
    "lifespan": "BC 427 - BC 347",
    "birthYear": -427,
    "deathYear": -347,
    "region": "west",
    "nationality": "古希腊·雅典",
    "avatar": "/assets/philosophers/plato.jpg",
    "schools": [
      "柏拉图学园",
      "理念论",
      "客观唯心主义"
    ],
    "primaryDomain": "metaphysics",
    "coreInsight": "可感物质世界不过是流变的虚影，唯有超越时空的永恒理念（Forms）才是真理本体。",
    "analogy": "洞穴囚徒：人类背对着洞口火光被锁链束缚，把石壁上的阴影当作真实，唯有打破枷锁走出洞穴者才能目睹太阳真理。",
    "summary": "西方哲学史上首座宏伟唯心主义体系的筑造者。柏拉图创立了阿卡德米学园，提出可感世界与可智世界的两分，主张灵魂回忆说与哲学王治理的正义城邦。怀特海断言：“两千五百年的西方哲学史，不过是柏拉图哲学的一系列注脚。”",
    "historicalImpact": "确立了本质与表象、灵魂与肉体的二元框架，深远塑造了西方理性主义、基督教神学与宪政政治哲学。",
    "keyConcepts": [
      {
        "term": "理念论 (Theory of Forms)",
        "explanation": "具体事物因分有永恒完善的抽象理型（如圆、美、至善）而获得其暂时性质。"
      },
      {
        "term": "洞穴隐喻 (Allegory of the Cave)",
        "explanation": "描述灵魂从肉身感官蒙昧的阴影世界走向理性真理太阳照耀的惊险历程。"
      },
      {
        "term": "哲学王治理",
        "explanation": "正义城邦唯有由见识过至善理念、不谋私利的哲学家统领，才能实现社会和谐。"
      }
    ],
    "famousQuotes": [
      {
        "quote": "不知道自己的无知，乃是双重的无知。",
        "source": "《理想国》"
      },
      {
        "quote": "哲学始于对世界的惊异。",
        "source": "《泰阿泰德篇》"
      }
    ],
    "notableWorks": [
      "《理想国》",
      "《会饮篇》",
      "《斐多篇》",
      "《蒂迈欧篇》"
    ],
    "influencedBy": [
      "socrates",
      "heraclitus"
    ],
    "influenced": [
      "aristotle",
      "plotinus",
      "augustine",
      "descartes",
      "kant"
    ],
    "culturalEchoIds": [
      "matrix",
      "school-of-athens",
      "truman-show"
    ]
  },
  {
    "id": "aristotle",
    "name": {
      "zh": "亚里士多德",
      "en": "Aristotle",
      "original": "Ἀριστοτέλης"
    },
    "eraId": "axial-age",
    "lifespan": "BC 384 - BC 322",
    "birthYear": -384,
    "deathYear": -322,
    "region": "west",
    "nationality": "古希腊·斯塔吉拉",
    "avatar": "/assets/philosophers/aristotle.jpg",
    "schools": [
      "逍遥学派",
      "古典经验现实主义",
      "形式逻辑学"
    ],
    "primaryDomain": "metaphysics",
    "coreInsight": "吾爱吾师，吾更爱真理；理念不在云端天国，而就内在于具体事物的形式与质料之中。",
    "analogy": "大理石与雕像：质料是大理石原石，形式是雕塑家构思赋予的维纳斯形态，形式与质料结合才成就真实实体。",
    "summary": "古代世界最渊博的百科全书式天才。亚里士多德批判了柏拉图割裂理念与现实的唯心两分，提出实体论与四因说（质料因、形式因、动力因、目的因），开创了形式逻辑（三段论）、生物分类学、政治宪政学与中庸伦理学。",
    "historicalImpact": "构建了西方知识大厦的学科分类标准与逻辑思维工具，在中世纪被经院哲学家尊称为无可辩驳的“哲学家（The Philosopher）”。",
    "keyConcepts": [
      {
        "term": "四因说 (Four Causes)",
        "explanation": "解释一切存在物生成构成的四个维度：质料因、形式因、动力因、目的因。"
      },
      {
        "term": "潜能与现实 (Potentiality & Actuality)",
        "explanation": "种子作为潜能，在运动中将形式展开实现为参天大树，万物朝向终极第一推动力演进。"
      },
      {
        "term": "黄金中道 (Golden Mean)",
        "explanation": "道德美德在于避开过犹不及两个极端，如勇敢是怯懦与鲁莽之间的恰当平衡。"
      }
    ],
    "famousQuotes": [
      {
        "quote": "吾爱吾师柏拉图，但吾更爱真理。"
      },
      {
        "quote": "人是天生的政治动物。",
        "source": "《政治学》"
      }
    ],
    "notableWorks": [
      "《形而上学》",
      "《尼各马可伦理学》",
      "《工具论》",
      "《政治学》"
    ],
    "influencedBy": [
      "plato",
      "socrates",
      "democritus"
    ],
    "influenced": [
      "thomas-aquinas",
      "locke",
      "hegel",
      "marx"
    ],
    "culturalEchoIds": [
      "school-of-athens"
    ]
  },
  {
    "id": "laozi",
    "name": {
      "zh": "老子",
      "en": "Laozi",
      "original": "李耳"
    },
    "eraId": "axial-age",
    "lifespan": "BC 571 - BC 471",
    "birthYear": -571,
    "deathYear": -471,
    "region": "east",
    "nationality": "东周·楚国苦县",
    "avatar": "/assets/philosophers/laozi.jpg",
    "schools": [
      "道家学派",
      "东方形而上学",
      "朴素辩证法"
    ],
    "primaryDomain": "metaphysics",
    "coreInsight": "道法自然，反者道之动；天下万物生于有，有生于无；上善若水，为无为则无不治。",
    "analogy": "虚空的陶罐：揉泥做陶器，唯因陶罐中间中空无物，才有用处；有之以为利，无之以为用。",
    "summary": "东方哲学与道家思想的开山宗师。面对春秋乱世礼乐崩坏与诸侯攻伐，老子写下五千言《道德经》。他洞悉天道之精微与人道之妄为，揭示出万物背后不可名状的终极本原“道”，主张以柔克刚、知雄守雌、处无为之事、行不言之教。",
    "historicalImpact": "奠定了中华文明阴柔互补、天人合一、顺应自然的形而上学宇宙观与生存智慧，深刻影响了中国人的性格与艺术审美。",
    "keyConcepts": [
      {
        "term": "道法自然",
        "explanation": "终极宇宙法则“道”没有任何主观意志与偏私，以宇宙万物的自发演化为准绳。"
      },
      {
        "term": "反者道之动",
        "explanation": "一切事物的运动发展都在向其对立面转化，物极必反，柔弱胜刚强。"
      },
      {
        "term": "无为而治",
        "explanation": "顺应天道民心之自然，不胡乱干预造作，社会便能达到最高和谐。"
      }
    ],
    "famousQuotes": [
      {
        "quote": "道可道，非常道；名可名，非常名。",
        "source": "《道德经·第一章》"
      },
      {
        "quote": "上善若水。水善利万物而不争，处众人之所恶，故几于道。",
        "source": "《道德经·第八章》"
      }
    ],
    "notableWorks": [
      "《道德经（老子）》"
    ],
    "influencedBy": [],
    "influenced": [
      "zhuangzi",
      "wang-yangming",
      "schopenhauer",
      "heidegger"
    ],
    "culturalEchoIds": [
      "disco-elysium"
    ]
  },
  {
    "id": "confucius",
    "name": {
      "zh": "孔子",
      "en": "Confucius",
      "original": "孔丘"
    },
    "eraId": "axial-age",
    "lifespan": "BC 551 - BC 479",
    "birthYear": -551,
    "deathYear": -479,
    "region": "east",
    "nationality": "春秋·鲁国陬邑",
    "avatar": "/assets/philosophers/confucius.jpg",
    "schools": [
      "儒家学派",
      "伦理人道主义",
      "德治政治学"
    ],
    "primaryDomain": "ethics",
    "coreInsight": "克己复礼为仁，天下归仁焉；己所不欲，勿施于人；君子坦荡荡，小人长戚戚。",
    "analogy": "温润的美玉：君子当如切如磋、如琢如磨，通过礼仪与修身去除顽劣，内敛出仁爱的温润光泽。",
    "summary": "至圣先师、儒家学派创始人。在春秋礼崩乐坏、诸侯兼并的血火乱世中，孔子周游列国十四载推行仁道。他将西周外在等级制度的“礼”，内化为人类心底最真诚纯粹的道德情感“仁”，首创有教无类平民教育，勾画出天下为公的大同理想。",
    "historicalImpact": "构建了东亚两千余年政治伦理、社会结构与文化心理的大一统脊梁，成为东亚文明最核心的精神坐标。",
    "keyConcepts": [
      {
        "term": "仁者爱人",
        "explanation": "人类发自本心的道德同理心与生命关怀，是处理一切人际伦理的最高德性。"
      },
      {
        "term": "克己复礼",
        "explanation": "自觉约束个体的非分欲望与傲慢，使言行契合公认的正义社会规范。"
      },
      {
        "term": "中庸之道",
        "explanation": "做事恰到好处，不偏不倚、无过不及，追求动态平衡的社会与个体心境。"
      }
    ],
    "famousQuotes": [
      {
        "quote": "己所不欲，勿施于人。",
        "source": "《论语·卫灵公》"
      },
      {
        "quote": "朝闻道，夕死可矣。",
        "source": "《论语·里仁》"
      }
    ],
    "notableWorks": [
      "《论语》（由弟子及再传弟子辑录）",
      "编订《诗》《书》《礼》《乐》《易》《春秋》"
    ],
    "influencedBy": [],
    "influenced": [
      "wang-yangming",
      "li-zehou",
      "kant",
      "voltaire"
    ],
    "culturalEchoIds": [
      "disco-elysium"
    ]
  },
  {
    "id": "zhuangzi",
    "name": {
      "zh": "庄子",
      "en": "Zhuangzi",
      "original": "庄周"
    },
    "eraId": "axial-age",
    "lifespan": "BC 369 - BC 286",
    "birthYear": -369,
    "deathYear": -286,
    "region": "east",
    "nationality": "战国·宋国蒙城",
    "avatar": "/assets/philosophers/zhuangzi.jpg",
    "schools": [
      "庄子学派",
      "道家美学",
      "诗性相对主义"
    ],
    "primaryDomain": "metaphysics",
    "coreInsight": "天地与我并生，而万物与我为一；相忘于江湖，乘云气、御飞龙，游于无穷者也。",
    "analogy": "大鹏展翅：乘扶摇羊角而上九万里，以宇宙俯瞰的无限辽阔视角，照破地面蓬间雀雀跃争食的井蛙之见。",
    "summary": "战国中期道家思想集大成者，浪漫哲学与诗性解构的旷世奇才。庄子以“卮言日出，和以天倪”的汪洋辟阖之笔，通过庄周梦蝶、庖丁解牛、鼓盆而歌等寓言，破除了世俗名利是非、生死贵贱的执念界限，开启了个体生命超越世俗桎梏的绝对精神自由。",
    "historicalImpact": "深刻奠定了中国古典文人精神逃离尘俗异化的诗意避难所，对中国魏晋玄学、禅宗与诗书画美学产生了决定性滋养。",
    "keyConcepts": [
      {
        "term": "齐物论",
        "explanation": "站在宇宙大道整体视角审视，是非善恶寿夭皆为相对虚妄，万物本质平等齐一。"
      },
      {
        "term": "逍遥游",
        "explanation": "无己、无功、无名，斩断一切对外部条件功利的依赖，灵魂达至无拘无束的境界。"
      },
      {
        "term": "心斋与坐忘",
        "explanation": "堕肢体、黜聪明、离形去知，让心灵如同明镜般虚室生白，与天地大化冥合。"
      }
    ],
    "famousQuotes": [
      {
        "quote": "不知周之梦为胡蝶与，胡蝶之梦为周与？",
        "source": "《庄子·齐物论》"
      },
      {
        "quote": "相濡以沫，不如相忘于江湖。",
        "source": "《庄子·大宗师》"
      }
    ],
    "notableWorks": [
      "《庄子（南华真经）》"
    ],
    "influencedBy": [
      "laozi"
    ],
    "influenced": [
      "huineng",
      "nietzsche",
      "sartre",
      "camus"
    ],
    "culturalEchoIds": [
      "matrix",
      "disco-elysium"
    ]
  },
  {
    "id": "seneca",
    "name": {
      "zh": "塞涅卡",
      "en": "Seneca the Younger",
      "original": "Lucius Annaeus Seneca"
    },
    "eraId": "hellenistic-medieval",
    "lifespan": "BC 4 - AD 65",
    "birthYear": -4,
    "deathYear": 65,
    "region": "west",
    "nationality": "古罗马·科尔多瓦",
    "avatar": "/assets/philosophers/seneca.jpg",
    "schools": [
      "古罗马斯多葛学派",
      "伦理实践哲学",
      "生存治疗学"
    ],
    "primaryDomain": "ethics",
    "coreInsight": "不是生命太短暂，而是我们浪费了太多时间；真正的自由是对必然命运的从容接纳与内心自足。",
    "analogy": "风暴中的锚石：狂暴的惊涛骇浪在身边咆哮撕扯，但深深咬入海底岩石的锚锭使船身绝不倾覆。",
    "summary": "古罗马帝国最伟大的斯多葛派导师、悲剧作家与政治家。塞涅卡身处暴君尼禄的恐怖宫廷漩涡，始终践行哲学作为“心灵医术”的使命。他论证时间是个体唯一的真正财富，告诫世人战胜对死亡、贫困与厄运的非理性恐惧，最终在尼禄赐死命令前平静割腕，以泰然赴死完成对暴政与死亡的哲学加冕。",
    "historicalImpact": "将古希腊斯多葛学派推向注重具体日常操练与心理治疗的巅峰，对蒙田随笔、基督教道德自省与现代抗逆力心理学奠定了奠基石。",
    "keyConcepts": [
      {
        "term": "时间自治与当下专注",
        "explanation": "拒绝将生命挥霍在无意义的逢迎与虚妄焦虑上，通过清醒自律主宰生命的每一刻。"
      },
      {
        "term": "死亡预演 (Meditatio Mortis)",
        "explanation": "通过每日预想死亡的必然降临，消除对死亡的未知恐惧，从而倍加珍惜活着的庄严。"
      },
      {
        "term": "不动心 (Ataraxia)",
        "explanation": "通过理性克制暴烈情绪，使心灵进入风雨不惊、不受外界毁誉动摇的崇高宁静。"
      }
    ],
    "famousQuotes": [
      {
        "quote": "我们不是因为事情艰难而不敢尝试，而是因为我们不敢尝试，事情才变得艰难。"
      },
      {
        "quote": "生命如同戏剧，重要的不是它有多长，而是它的演出有多精彩。",
        "source": "《道德书简》"
      }
    ],
    "notableWorks": [
      "《论生命的短暂》",
      "《论心灵的安宁》",
      "《道德书简（致琉西利乌斯书）》"
    ],
    "influencedBy": [
      "socrates",
      "epictetus"
    ],
    "influenced": [
      "marcus-aurelius",
      "montaigne",
      "spinoza",
      "schopenhauer"
    ],
    "culturalEchoIds": [
      "seventh-seal"
    ]
  },
  {
    "id": "marcus-aurelius",
    "name": {
      "zh": "马可·奥勒留",
      "en": "Marcus Aurelius",
      "original": "Marcus Aurelius Antoninus"
    },
    "eraId": "hellenistic-medieval",
    "lifespan": "121 - 180",
    "birthYear": 121,
    "deathYear": 180,
    "region": "west",
    "nationality": "古罗马·罗马",
    "avatar": "/assets/philosophers/marcus-aurelius.jpg",
    "schools": [
      "晚期斯多葛学派",
      "帝王哲学",
      "伦理学"
    ],
    "primaryDomain": "ethics",
    "coreInsight": "控制二分法：伤害不在于外在客观事实，而完全在于你内心对它的判断；构筑坚不可摧的内心城堡。",
    "analogy": "灵魂内殿：任凭外界金戈铁马、瘟疫战乱，只要关上心门，内殿中便只有安宁、理智与永恒的宁静。",
    "summary": "“王座上的哲学家”，古罗马帝国五贤帝时代的最后一位皇帝。在抵御蛮族入侵的多瑙河冰冷营帐与安东尼大瘟疫肆虐的绝境中，奥勒留用希腊文写下了与自己灵魂对话的私人日记《沉思录》。他将整个宇宙视为一个巨大的理性有机体，以近乎圣徒般的责任感履行世俗天职，同时在内心构筑绝对自足的城堡。",
    "historicalImpact": "被视为古典时代至高哲学品格与责任伦理的终极化身，是后世无数政治家、思想家在极端至暗时刻的灵魂指南。",
    "keyConcepts": [
      {
        "term": "控制二分法 (Dichotomy of Control)",
        "explanation": "将世间事物严格划分为“我们能控制的”（思想、决断、德性）与“我们不能控制的”（名誉、生死、命运），并只对前者倾注心血。"
      },
      {
        "term": "内心城堡 (Inner Citadel)",
        "explanation": "即便肉体身陷囹圄或疾病，理性主宰的心灵依然拥有任何外在暴力不可剥夺的绝对主权。"
      },
      {
        "term": "世界公民意识",
        "explanation": "所有人皆分有同一种宇宙理性（Logos），应当超越城邦界限，视人类为同甘共苦的手足。"
      }
    ],
    "famousQuotes": [
      {
        "quote": "你无法控制风暴的来临，但你可以决定自己如何屹立在风暴之中。",
        "source": "《沉思录》"
      },
      {
        "quote": "清晨醒来时告诉自己：今天我将遇到无耻之徒、忘恩负义之人、暴戾之辈；但他们无法伤害我，因为我知晓真善之美。"
      }
    ],
    "notableWorks": [
      "《沉思录 (Meditations)》"
    ],
    "influencedBy": [
      "epictetus",
      "seneca",
      "socrates"
    ],
    "influenced": [
      "spinoza",
      "montaigne",
      "schopenhauer"
    ],
    "culturalEchoIds": [
      "seventh-seal"
    ]
  },
  {
    "id": "epicurus",
    "name": {
      "zh": "伊壁鸠鲁",
      "en": "Epicurus",
      "original": "Ἐπίκουρος"
    },
    "eraId": "hellenistic-medieval",
    "lifespan": "BC 341 - BC 270",
    "birthYear": -341,
    "deathYear": -270,
    "region": "west",
    "nationality": "古希腊·萨摩斯",
    "avatar": "/assets/philosophers/epicurus.jpg",
    "schools": [
      "伊壁鸠鲁学派",
      "原子论唯物主义",
      "快乐主义（恬淡论）"
    ],
    "primaryDomain": "ethics",
    "coreInsight": "死神与我们毫无干系：当我们存在时，死亡还未到来；当死亡到来时，我们已不存在；消除恐惧，恬淡自足即最高快乐。",
    "analogy": "花园的清泉与干面包：与知心朋友在绿荫花园里分食面包与泉水，身体无痛苦、灵魂无纷扰，胜过宫廷万千酒池肉林。",
    "summary": "希腊化时代“花园学派”创始人。世俗常将其误解为纵欲享乐主义，实则恰恰相反：伊壁鸠鲁主张“消极快乐（静止快乐）”，认为真正的幸福是身体没有痛苦（Aponia）与灵魂没有纷扰焦虑（Ataraxia）。他借用德谟克利特原子论与“原子偏斜（Clinamen）”捍卫自由意志，彻底破除对神谴与地狱审判的虚妄恐惧。",
    "historicalImpact": "开创了西方唯物主义心理安顿哲学与经验医学传统，深刻启发了启蒙时代的功利主义与马克思的唯物主义早期博士论文。",
    "keyConcepts": [
      {
        "term": "消除死亡恐惧四重药方 (Tetrapharmakos)",
        "explanation": "神不足惧，死不足畏，乐极易求，苦极易忍。"
      },
      {
        "term": "原子偏斜 (Clinamen)",
        "explanation": "原子在垂直下落中偶发随机微小偏斜碰撞，打破了绝对决定论铁律，为人类自由意志辟出空间。"
      },
      {
        "term": "恬淡之乐 (Ataraxia)",
        "explanation": "排除了无节制欲望与迷信恐惧后，灵魂如平静海面般的清明自足境界。"
      }
    ],
    "famousQuotes": [
      {
        "quote": "死亡对于我们并不是什么可怕的事，因为只要我们存在一天，死亡就不会来临；而死亡来临时，我们已不复存在。"
      },
      {
        "quote": "知足常乐之人乃是最富有的人，因为知足是大自然赐予的财富。"
      }
    ],
    "notableWorks": [
      "《主要原则》",
      "《致梅诺西斯的信》",
      "《论自然》（残篇）"
    ],
    "influencedBy": [
      "democritus",
      "socrates"
    ],
    "influenced": [
      "lucretius",
      "locke",
      "marx",
      "nietzsche"
    ],
    "culturalEchoIds": [
      "seventh-seal"
    ]
  },
  {
    "id": "epictetus",
    "name": {
      "zh": "爱比克泰德",
      "en": "Epictetus",
      "original": "Ἐπίκτητος"
    },
    "eraId": "hellenistic-medieval",
    "lifespan": "50 - 135",
    "birthYear": 50,
    "deathYear": 135,
    "region": "west",
    "nationality": "古罗马·希拉波利斯",
    "avatar": "/assets/philosophers/epictetus.jpg",
    "schools": [
      "中期斯多葛学派",
      "奴隶哲学",
      "意志纯粹主义"
    ],
    "primaryDomain": "ethics",
    "coreInsight": "你可以锁住我的腿，把我的肉体打得遍体鳞伤，但即便万能的宙斯也无法奴役我的意志。",
    "analogy": "舞台剧演员：你无法决定自己在戏里演乞丐还是演国王，但演好导演分派给你的这个角色，是你唯一应当全身心关注的使命。",
    "summary": "出身卑微的古罗马奴隶哲学家，后被驱逐流亡。爱比克泰德拖着一条被前主人打残的瘸腿，在希腊尼科波利斯开馆授徒，其弟子阿利安将其口授记录为《论说集》与《手册》。他将斯多葛哲学提炼为极端纯粹的意志自律与自由宣言，论证世间唯有一件事真正属于我们——我们自己的道德意志与选择能力（Prohairesis）。",
    "historicalImpact": "对晚期斯多葛大师马可·奥勒留产生了直接思想哺育，成为现代认知行为疗法（CBT/REBT）理顺情绪困扰的哲学元典。",
    "keyConcepts": [
      {
        "term": "道德意志能力 (Prohairesis)",
        "explanation": "人类心智对一切外界表象进行理性审视、筛选与价值赋予的不可侵犯的自主决断权。"
      },
      {
        "term": "忍受与舍弃 (Bear and Forbear)",
        "explanation": "平静承受命运赐予的一切逆境灾厄，坚决放弃一切超出自我掌控范围的贪婪妄念。"
      },
      {
        "term": "表象的澄清",
        "explanation": "警惕未经检验的直觉念头，在认知上迅速将客观事实与主观情绪偏见剥离。"
      }
    ],
    "famousQuotes": [
      {
        "quote": "困扰人们的不是事情本身，而是人们对事情所持有的看法和解释。",
        "source": "《手册》"
      },
      {
        "quote": "自由并非源于渴望的满足，而是源于对欲望的彻底舍弃。"
      }
    ],
    "notableWorks": [
      "《手册 (Enchiridion)》",
      "《论说集 (Discourses)》（由弟子阿利安整理记录）"
    ],
    "influencedBy": [
      "socrates",
      "seneca"
    ],
    "influenced": [
      "marcus-aurelius",
      "spinoza",
      "schopenhauer"
    ],
    "culturalEchoIds": [
      "seventh-seal"
    ]
  },
  {
    "id": "plotinus",
    "name": {
      "zh": "普罗提诺",
      "en": "Plotinus",
      "original": "Πλωτῖνος"
    },
    "eraId": "hellenistic-medieval",
    "lifespan": "204 - 270",
    "birthYear": 204,
    "deathYear": 270,
    "region": "west",
    "nationality": "古罗马·埃及利科普利斯",
    "avatar": "/assets/philosophers/plotinus.jpg",
    "schools": [
      "新柏拉图主义",
      "神秘流溢论",
      "超越唯心论"
    ],
    "primaryDomain": "metaphysics",
    "coreInsight": "宇宙万物从至高无上的‘太一’（The One）不可遏止地神圣流溢而出；灵魂的终极归宿是摆脱肉身羁绊，回归太一的神秘狂喜（Henosis）。",
    "analogy": "太阳与光芒：太一如同永不枯竭的宇宙太阳，其丰盈完满的光芒逐层向外投射，越靠近中心越明亮，越远至边缘则跌入幽暗物质虚无。",
    "summary": "新柏拉图主义的真正创立者与古代形而上学的集大成终章。普罗提诺在罗马讲学二十年，弟子波菲利将其遗稿整理为《九章集》。他构建了严密的本体流溢阶梯：至高超验的“太一”流溢出“奴斯（智性/神圣理智）”，智性流溢出“灵魂（世界灵魂与个体灵魂）”，灵魂流溢出最低级的感官物质世界。恶并非独立的恶魔实体，而只是善与光的匮乏。",
    "historicalImpact": "将古希腊古典哲学与东方神秘直观融汇为统一神圣宇宙观，成为早期基督教神学（圣奥古斯丁）、伊斯兰哲学与文艺复兴人文主义的核心思想母体。",
    "keyConcepts": [
      {
        "term": "太一 (The One)",
        "explanation": "超越一切范畴、语言与思维对立的绝对终极统一本体，一切存在与生机的永恒源泉。"
      },
      {
        "term": "流溢论 (Emanation)",
        "explanation": "宇宙不是神随意创世，而是太一因其完满至善而自然生发、分层溢出的连续本体阶梯。"
      },
      {
        "term": "神圣合一 (Henosis)",
        "explanation": "个体灵魂通过理智净化与冥想沉思，摆脱肉身幻象，回归与太一融为一体的狂喜之境。"
      }
    ],
    "famousQuotes": [
      {
        "quote": "永远不要停止雕琢你自己的雕像，直到那神圣德性的光芒在你的灵魂深处绽放。",
        "source": "《九章集》"
      },
      {
        "quote": "生命乃是孤独者奔向独一者的壮丽回归。"
      }
    ],
    "notableWorks": [
      "《九章集 (The Enneads)》（由波菲利分为六卷九章编纂）"
    ],
    "influencedBy": [
      "plato",
      "aristotle"
    ],
    "influenced": [
      "augustine",
      "thomas-aquinas",
      "spinoza",
      "hegel",
      "schopenhauer"
    ],
    "culturalEchoIds": [
      "incredulity-thomas"
    ]
  },
  {
    "id": "augustine",
    "name": {
      "zh": "奥古斯丁",
      "en": "Augustine of Hippo",
      "original": "Aurelius Augustinus"
    },
    "eraId": "hellenistic-medieval",
    "lifespan": "354 - 430",
    "birthYear": 354,
    "deathYear": 430,
    "region": "west",
    "nationality": "罗马帝国·努米底亚塔加斯特",
    "avatar": "/assets/philosophers/augustine.jpg",
    "schools": [
      "早期基督教教父哲学",
      "新柏拉图主义神学",
      "神恩宿命论"
    ],
    "primaryDomain": "metaphysics",
    "coreInsight": "信仰先于理解——‘我相信，为了能够理解’；恶不是独立实体，而是善的亏缺；时间唯有在灵魂的当下记忆、注视与期盼中才具有真实性。",
    "analogy": "阳光穿过破布：光明源自太阳，破布上的黑洞并非某种叫做‘黑暗’的实体，而只是阳光被遮蔽阻挡后的匮乏缺席。",
    "summary": "西方基督教神学奠基人、教父哲学的巅峰巨人。奥古斯丁青年时曾深陷摩尼教与肉欲迷途，在米兰花园听闻“拿起来读吧”神圣童声后洗心革面归信。他在《忏悔录》中开创了人类深层心理内省自传体，在《上帝之城》中将人类历史诠释为尘世之城与天主之城的千年圣战，完成了新柏拉图主义形而上学与基督教启示真理的世纪大综合。",
    "historicalImpact": "奠定了西方中世纪一千年的原罪论、自由意志与神恩拣选教义，并以对心理时间与主观意识的精湛解剖启发了笛卡尔、胡塞尔与海德格尔。",
    "keyConcepts": [
      {
        "term": "神圣光照论 (Illumination)",
        "explanation": "人类有限理智无法独立通达永恒普遍真理，唯有上帝的神圣光芒照亮心灵内部，真理方能显现。"
      },
      {
        "term": "恶作为善的匮乏 (Privatio Boni)",
        "explanation": "上帝创造的万物皆是善的，恶没有独立的物理本质，而是自由意志背弃更高至善时的堕落与亏空。"
      },
      {
        "term": "灵魂时间性",
        "explanation": "过去是当下的记忆，现在是当下的直观，未来是当下的期盼；时间本质是人类灵魂向永恒伸展的度量。"
      }
    ],
    "famousQuotes": [
      {
        "quote": "信仰寻求理解（Credo ut intelligam）：若我不信，我便无法理解。"
      },
      {
        "quote": "如果无人问我，我深知时间是什么；但若要我向提问者解释，我却一无所知。",
        "source": "《忏悔录·卷十一》"
      }
    ],
    "notableWorks": [
      "《忏悔录 (Confessions)》",
      "《上帝之城 (The City of God)》",
      "《论三位一体》",
      "《论自由意志》"
    ],
    "influencedBy": [
      "plato",
      "plotinus",
      "socrates"
    ],
    "influenced": [
      "thomas-aquinas",
      "descartes",
      "pascal",
      "kierkegaard",
      "heidegger"
    ],
    "culturalEchoIds": [
      "incredulity-thomas",
      "brothers-karamazov"
    ]
  },
  {
    "id": "thomas-aquinas",
    "name": {
      "zh": "托马斯·阿奎那",
      "en": "Thomas Aquinas",
      "original": "Thomas Aquinas"
    },
    "eraId": "hellenistic-medieval",
    "lifespan": "1225 - 1274",
    "birthYear": 1225,
    "deathYear": 1274,
    "region": "west",
    "nationality": "西西里王国·罗卡塞卡",
    "avatar": "/assets/philosophers/thomas-aquinas.jpg",
    "schools": [
      "经院哲学",
      "托马斯主义 (Thomism)",
      "温和唯实论"
    ],
    "primaryDomain": "metaphysics",
    "coreInsight": "理智与启示是同一真理之光的两道射线，绝不相互冲突；恩典不废除自然，而是成全自然；理性可以五路论证上帝存在。",
    "analogy": "大教堂的飞扶壁：宏伟的理性逻辑如同坚实的大理石基石与飞扶壁，向上支撑起透射神圣天光的彩绘玻璃信仰穹顶。",
    "summary": "“天使博士”，中世纪经院哲学集大成者。当阿拉伯学者带回被欧洲遗忘的亚里士多德全集重创教会教条时，阿奎那以惊世骇俗的学术魄力，在两百万字的《神学大全》中，用严密的亚里士多德形式逻辑与四因实体说，系统重构了基督教神学大厦，提出著名的宇宙论证明“五路（Quinque Viae）”，实现了理性科学与超验信仰的辉煌和谐。",
    "historicalImpact": "构建了天主教会钦定的官方哲学基石（新托马斯主义），在黑暗时代将古希腊严密逻辑与经验因果律重新熔铸为欧洲思维的基石。",
    "keyConcepts": [
      {
        "term": "上帝存在五路证明 (Five Ways)",
        "explanation": "通过事物的运动（第一推动）、动力因（第一因）、偶然与必然、完满等级与目的秩序，以严密经验因果推导出终极造物主。"
      },
      {
        "term": "自然法理论 (Natural Law)",
        "explanation": "人类凭借受造的自然理性所能领悟的道德客观法则，是制定一切世俗法律的正义基石。"
      },
      {
        "term": "存在与本质的区分",
        "explanation": "受造物中本质（是什么）与存在（是否存在）是分离的，唯有终极实体其本质即存在本身（Ipsum Esse Subsistens）。"
      }
    ],
    "famousQuotes": [
      {
        "quote": "恩典不废除自然，而是使自然趋于成全；理性乃是信仰最可靠的侍从。"
      },
      {
        "quote": "若无必要，勿信虚妄；凡能被自然理性证明者，皆是对真理的崇高赞颂。",
        "source": "《神学大全》"
      }
    ],
    "notableWorks": [
      "《神学大全 (Summa Theologiae)》",
      "《反异教大全 (Summa contra Gentiles)》",
      "《论存在与本质》"
    ],
    "influencedBy": [
      "aristotle",
      "augustine",
      "plato"
    ],
    "influenced": [
      "descartes",
      "leibniz",
      "kant",
      "maritain"
    ],
    "culturalEchoIds": [
      "incredulity-thomas",
      "brothers-karamazov"
    ]
  },
  {
    "id": "william-ockham",
    "name": {
      "zh": "威廉·奥卡姆",
      "en": "William of Ockham",
      "original": "William of Ockham"
    },
    "eraId": "hellenistic-medieval",
    "lifespan": "1287 - 1347",
    "birthYear": 1287,
    "deathYear": 1347,
    "region": "west",
    "nationality": "英格兰·萨里郡奥卡姆",
    "avatar": "/assets/philosophers/william-ockham.jpg",
    "schools": [
      "晚期经院哲学",
      "唯名论革命",
      "经验逻辑主义"
    ],
    "primaryDomain": "epistemology",
    "coreInsight": "如无必要，勿增实体（奥卡姆剃刀）；抽象共相不过是人类用来称呼具体事物的代号与心智记号，客观存在的唯有个体事物。",
    "analogy": "外科手术剃刀：将经院神学体系中那些凭空捏造、叠床架屋的神秘实体与繁冗假设一刀切除，只留下经验可以直接检验的纯净骨骼。",
    "summary": "方济各会修士、中世纪经院哲学的终结者。在激烈的“共相之争”中，奥卡姆挥舞著名的思维剃刀，断言“人性”、“美”等普遍共相在真实自然界中毫无本体地位，仅仅是人类思维为了指称具体事物而发明的约定性语词（Names，即唯名论）。这一彻底的去神秘化思想摧毁了经院哲学的形而上学大厦，割断了神学与经验科学的捆绑，为文艺复兴与近代实证科学撕开了大门。",
    "historicalImpact": "敲响了经院哲学的丧钟，确立了现代科学方法论中至高无上的简约原则（Principle of Parsimony），直接启蒙了不列颠经验主义传统与现代分析哲学。",
    "keyConcepts": [
      {
        "term": "奥卡姆剃刀 (Ockham's Razor)",
        "explanation": "在解释某一现象的多个相互竞争的假说中，应当优先选择假设前提最少、最简洁的理论。"
      },
      {
        "term": "唯名论 (Nominalism)",
        "explanation": "唯有具体的单个实体真实存在，普遍概念（共相）只是人们心智用于归纳分类的语言符号（Flatus Vocis）。"
      },
      {
        "term": "信仰与理性的彻底分流",
        "explanation": "上帝全能意志无法通过有限的人类逻辑去证明，宗教归于纯粹信仰，尘世科学归于经验观察。"
      }
    ],
    "famousQuotes": [
      {
        "quote": "如无必要，勿增实体（Entia non sunt multiplicanda praeter necessitatem）。"
      },
      {
        "quote": "用较少的前提能够解释通的事情，若用较多的前提去解释，便是一种荒谬与徒劳。"
      }
    ],
    "notableWorks": [
      "《逻辑大全 (Summa Logicae)》",
      "《论权力和教皇的权威》",
      "《论预知与偶发事件》"
    ],
    "influencedBy": [
      "aristotle"
    ],
    "influenced": [
      "locke",
      "hume",
      "popper",
      "russell",
      "wittgenstein"
    ],
    "culturalEchoIds": [
      "brothers-karamazov",
      "incredulity-thomas"
    ]
  },
  {
    "id": "huineng",
    "name": {
      "zh": "六祖慧能",
      "en": "Huineng",
      "original": "惠能"
    },
    "eraId": "hellenistic-medieval",
    "lifespan": "638 - 713",
    "birthYear": 638,
    "deathYear": 713,
    "region": "east",
    "nationality": "唐代·广东新州",
    "avatar": "/assets/philosophers/huineng.jpg",
    "schools": [
      "中国禅宗南宗",
      "顿悟心学",
      "佛性论"
    ],
    "primaryDomain": "metaphysics",
    "coreInsight": "菩提本无树，明镜亦非台；本来无一物，何处惹尘埃；直指人心，见性成佛，不立文字。",
    "analogy": "云散月现：自性明月本就圆满悬于九天，凡夫妄念如乌云蔽月，无须辛苦扫地造镜，只要乌云一散，本心自性当下顿现。",
    "summary": "中国禅宗南宗六祖，东方顿悟哲学的划时代宗师。慧能出身岭南不识一字的舂米行者，以一首偈语得五祖弘忍传衣钵。他彻底颠覆了印度佛教繁复名相、苦行坐禅与皓首穷经的教条传统，断言人人本自具足圆满佛性，于一切时中念念自见本性，开创了“下下人有上上智”、“行住坐卧皆是禅”的人间禅革命。",
    "historicalImpact": "使印度传来的佛教彻底完成中国本土化改造，深刻熔铸为宋明理学、心学以及中国古典诗歌、水墨山水画的灵魂精髓。",
    "keyConcepts": [
      {
        "term": "自性本自具足",
        "explanation": "众生心性原本清净光明，万法尽在自心，无须向心外驰求任何虚妄神佛。"
      },
      {
        "term": "顿悟成佛",
        "explanation": "打破漫长戒律阶梯积累，在刹那间识得自心自性，当下即得彻底觉醒解脱。"
      },
      {
        "term": "不立文字、直指人心",
        "explanation": "语言符号皆为渡河之舟筏，得月便须忘指，不可执着于经典名相文字相。"
      }
    ],
    "famousQuotes": [
      {
        "quote": "菩提本无树，明镜亦非台。本来无一物，何处惹尘埃。",
        "source": "《六祖坛经》"
      },
      {
        "quote": "前念迷即凡夫，后念悟即佛；前念着境即烦恼，后念离境即菩提。"
      }
    ],
    "notableWorks": [
      "《六祖法宝坛经（唯一被尊称为经的中国佛教著作）》"
    ],
    "influencedBy": [
      "laozi",
      "zhuangzi"
    ],
    "influenced": [
      "wang-yangming",
      "schopenhauer",
      "heidegger"
    ],
    "culturalEchoIds": [
      "matrix"
    ]
  },
  {
    "id": "descartes",
    "name": {
      "zh": "勒内·笛卡尔",
      "en": "René Descartes",
      "original": "René Descartes"
    },
    "eraId": "enlightenment",
    "lifespan": "1596 - 1650",
    "birthYear": 1596,
    "deathYear": 1650,
    "region": "west",
    "nationality": "法兰西王国·图赖讷拉海",
    "avatar": "/assets/philosophers/descartes.jpg",
    "schools": [
      "欧陆唯理论奠基人",
      "笛卡尔主义",
      "心物二元论"
    ],
    "primaryDomain": "epistemology",
    "coreInsight": "普遍怀疑一切；我思故我在（Cogito, ergo sum）；心灵与物质是两种截然独立的实体。",
    "analogy": "拆毁重建危房：为了保证整座知识大厦绝对坚固，先把一切有丝毫可疑裂缝的旧砖石全部推倒，直到触碰到不可撼动的花岗岩地基。",
    "summary": "现代哲学之父、解析几何创始人。面对经院哲学的瓦解与怀疑论泥潭，笛卡尔设计了极端的“普遍怀疑”思想实验：假设有一个全能的恶魔在不间断地欺骗我的感官与数学常识。然而，正当他在怀疑一切时，他顿悟到：那个正在怀疑的‘我’之存在是无可否认的！由此推导出第一原理‘我思故我在’，并以此为阿基米德支点，通过上帝的至善保证，重新论证了外部物理广延世界的客观真实性。",
    "historicalImpact": "发动了西方哲学的‘认识论转向’，确立了以理智思考的主体（Subject）为核心的现代世界观，为近代自然科学奠定了机械论与数学化范式。",
    "keyConcepts": [
      {
        "term": "普遍怀疑法 (Methodic Doubt)",
        "explanation": "将任何稍有不确定性的知识假定为假，以此筛选出绝对无可置疑的真理基石。"
      },
      {
        "term": "我思故我在 (Cogito, ergo sum)",
        "explanation": "怀疑行为本身必然包含着思考者的存在，这一直觉明晰性构成了人类认识的第一确定性。"
      },
      {
        "term": "心物二元论 (Mind-Body Dualism)",
        "explanation": "宇宙由思维实体（不占空间的灵魂）与广延实体（占空间的物质机械）截然两分构成。"
      }
    ],
    "famousQuotes": [
      {
        "quote": "我思故我在（Cogito, ergo sum）。",
        "source": "《方法论》"
      },
      {
        "quote": "要追求真理，我们在有生之年必须把一切事物至少怀疑一次。"
      }
    ],
    "notableWorks": [
      "《第一哲学沉思集》",
      "《谈谈方法（方法论）》",
      "《哲学原理》"
    ],
    "influencedBy": [
      "plato",
      "aristotle",
      "augustine"
    ],
    "influenced": [
      "spinoza",
      "leibniz",
      "locke",
      "kant",
      "husserl"
    ],
    "culturalEchoIds": [
      "oppenheimer",
      "matrix",
      "truman-show"
    ]
  },
  {
    "id": "spinoza",
    "name": {
      "zh": "巴鲁赫·斯宾诺莎",
      "en": "Baruch Spinoza",
      "original": "Baruch de Spinoza"
    },
    "eraId": "enlightenment",
    "lifespan": "1632 - 1677",
    "birthYear": 1632,
    "deathYear": 1677,
    "region": "west",
    "nationality": "荷兰共和国·阿姆斯特丹",
    "avatar": "/assets/philosophers/spinoza.jpg",
    "schools": [
      "欧陆理性主义",
      "实体一元泛神论",
      "几何伦理学"
    ],
    "primaryDomain": "metaphysics",
    "coreInsight": "宇宙间唯有一个自因的绝对实体，那就是‘神即自然’（Deus sive Natura）；自由是对必然性的透彻认识与理智之爱。",
    "analogy": "无垠的大海与波浪：神或自然就是浩瀚的大海本身（实体），而每个凡夫与星辰不过是大海上翻滚的一朵暂时浪花（样态）。",
    "summary": "“哲学家的哲学家”，最纯粹高尚的孤独思想隐士。因异端思想被阿姆斯特丹犹太教公会残酷开除教籍，靠磨削光学镜片清贫度日。他在代表作《伦理学》中，仿照欧几里得几何学公理体系，从定义、公理出发严格推导宇宙真理。他彻底推翻了拟人化的上帝神话，宣告宇宙本身即是永恒自因的神圣实体；人类痛苦源自盲目受制于被动情感，唯有凭借理智洞察宇宙必然性，才能获得真正的精神自由与内心的理智之爱。",
    "historicalImpact": "构建了西方哲学史上最严密无缝的唯物一元论体系，被黑格尔赞誉为“要做一个哲学家，首先必须做斯宾诺莎主义者”，对爱因斯坦的宇宙宗教情感产生了决定性启迪。",
    "keyConcepts": [
      {
        "term": "神即自然 (Deus sive Natura)",
        "explanation": "打破造物主与受造物的割裂，神不是坐在云端的审判者，神就是自然本身及其永恒必然规律。"
      },
      {
        "term": "实体、属性与样态",
        "explanation": "实体唯有一，具有思维与广延等无限属性，万千具体事物只是实体在时空中的有限表现样态。"
      },
      {
        "term": "对神的理智之爱 (Amor Dei Intellectualis)",
        "explanation": "人类理智在透彻理解宇宙秩序与必然因果后，产生的心悦诚服的至高安宁与幸福。"
      }
    ],
    "famousQuotes": [
      {
        "quote": "对于人类的行动，不要嘲弄，不要悲叹，也不要蔑视，而要予以透彻理解。",
        "source": "《神学政治论》"
      },
      {
        "quote": "自由是对必然性的真正认识。"
      }
    ],
    "notableWorks": [
      "《伦理学（以几何学方式证明）》",
      "《神学政治论》",
      "《知性改进论》"
    ],
    "influencedBy": [
      "descartes",
      "hobbes",
      "stoics"
    ],
    "influenced": [
      "leibniz",
      "hegel",
      "goethe",
      "einstein",
      "deleuze"
    ],
    "culturalEchoIds": [
      "oppenheimer"
    ]
  },
  {
    "id": "leibniz",
    "name": {
      "zh": "戈特弗里德·莱布尼茨",
      "en": "Gottfried Wilhelm Leibniz",
      "original": "Gottfried Wilhelm von Leibniz"
    },
    "eraId": "enlightenment",
    "lifespan": "1646 - 1716",
    "birthYear": 1646,
    "deathYear": 1716,
    "region": "west",
    "nationality": "神圣罗马帝国·莱比锡",
    "avatar": "/assets/philosophers/leibniz.jpg",
    "schools": [
      "欧陆理性主义集大成",
      "单子论",
      "数理逻辑先驱"
    ],
    "primaryDomain": "metaphysics",
    "coreInsight": "世界的终极构成不是无生命的物理原子，而是充满生机精神活力的无形‘单子’（Monad）；这是所有可能世界中最好的一个，万物皆有前定和谐。",
    "analogy": "数千块独立校准的时钟：所有单子没有彼此交流的窗户，却分秒不差地精确同步鸣响，因为造物主在创世最初就谱写好了最精密的数学总谱。",
    "summary": "“十七世纪的亚里士多德”，历史上最后一位真正的通才。独立发明了微积分（其符号沿用至今），发明了二进制算术与早期机械计算机，草拟了形式符号逻辑雏形。他批判笛卡尔与斯宾诺莎将物质降格为死寂几何广延，提出“单子论”——宇宙由无限多个不可分割、无窗但拥有内在知觉的精神微粒构成。为了回应恶的起源，他开创“神正论”，论证上帝从无数种可能组合中精心挑选创造了这个法则最简约、丰富度最高的世界。",
    "historicalImpact": "奠定了现代计算机数理逻辑基础，启发了信息哲学与赛博控制论，其单子论被罗素与现代量子物理学家视为超越机械论的超前构想。",
    "keyConcepts": [
      {
        "term": "单子论 (Monadology)",
        "explanation": "宇宙的最基本构成单元不是死物质，而是具有自发动能与知觉等级的无形精神实体（单子）。"
      },
      {
        "term": "前定和谐 (Pre-established Harmony)",
        "explanation": "心与物、单子与单子之间无需物理相互作用，其完美同步乃源于神在创世之初设定的精密宇宙法则。"
      },
      {
        "term": "充足理由律 (Principle of Sufficient Reason)",
        "explanation": "任何事情的发生皆必有其为什么如此而非彼样存在的充分必然理由。"
      }
    ],
    "famousQuotes": [
      {
        "quote": "凡存在的事物，必有其得以如此存在而不能为其他样态的充足理由。"
      },
      {
        "quote": "音乐是心灵在不知不觉中进行的算术操练。"
      }
    ],
    "notableWorks": [
      "《单子论 (Monadologie)》",
      "《人类理智新论》",
      "《神正论》"
    ],
    "influencedBy": [
      "aristotle",
      "descartes",
      "spinoza"
    ],
    "influenced": [
      "kant",
      "russell",
      "turing",
      "wiener"
    ],
    "culturalEchoIds": [
      "oppenheimer"
    ]
  },
  {
    "id": "locke",
    "name": {
      "zh": "约翰·洛克",
      "en": "John Locke",
      "original": "John Locke"
    },
    "eraId": "enlightenment",
    "lifespan": "1632 - 1704",
    "birthYear": 1632,
    "deathYear": 1704,
    "region": "west",
    "nationality": "英格兰王国·萨默塞特",
    "avatar": "/assets/philosophers/locke.jpg",
    "schools": [
      "英国经验主义奠基人",
      "古典自由主义之父",
      "社会契约论"
    ],
    "primaryDomain": "epistemology",
    "coreInsight": "人心初生如同一块空无一物的白板（Tabula Rasa），一切知识均源于后天感官经验；政府的全部合法性在于保护公民天赋的生命、自由与财产权。",
    "analogy": "白纸与印章：初生的婴儿如同纯白的纸张，外部世界的阳光、雨水与声音如同各色印章，在纸上盖出色彩与思想。",
    "summary": "英国经验主义与现代自由主义政治哲学的奠基宗师。在认识论上，他以巨著《人类理解论》彻底粉碎了唯理论的“天赋观念”迷信，断言经验（外部感觉与内部反省）是人类一切概念与思维的唯一来源。在政治哲学上，他在《政府论》中构筑了现代宪政大厦：反驳君权神授，阐明政治统治源于平民自愿让渡权力的社会契约，率先提出立法权与行政权的分立制衡，并赋予人民在暴政时推翻政府的合法革命权。",
    "historicalImpact": "直接启发了美国《独立宣言》（杰斐逊几乎照搬其自然权利条款）与现代宪政民主制度，开启了英美两百年的实证主义与功利主义思潮。",
    "keyConcepts": [
      {
        "term": "心灵白板说 (Tabula Rasa)",
        "explanation": "心灵最初没有任何先天印记，人类所有的思想材料无一例外源于后天经验。"
      },
      {
        "term": "不可剥夺的天赋权利",
        "explanation": "每个人生而享有受自然法保护的生命权、人身自由权与私有财产权，任何统治者不得践踏。"
      },
      {
        "term": "被统治者的同意",
        "explanation": "政府若违背保卫公民权益的公共契约蜕变为专制暴政，人民即拥有反抗并重立政府的合法权力。"
      }
    ],
    "famousQuotes": [
      {
        "quote": "人类的全部知识都建立在经验之上，并最终从经验中衍生出来。",
        "source": "《人类理解论》"
      },
      {
        "quote": "哪里没有财产权，哪里就没有正义；哪里没有法律，哪里就没有自由。",
        "source": "《政府论》"
      }
    ],
    "notableWorks": [
      "《人类理解论》",
      "《政府论（上下篇）》",
      "《论宗教宽容》"
    ],
    "influencedBy": [
      "william-ockham",
      "hobbes",
      "bacon"
    ],
    "influenced": [
      "berkeley",
      "hume",
      "kant",
      "rousseau",
      "voltaire"
    ],
    "culturalEchoIds": [
      "thinker-rodin",
      "matrix"
    ]
  },
  {
    "id": "berkeley",
    "name": {
      "zh": "乔治·贝克莱",
      "en": "George Berkeley",
      "original": "George Berkeley"
    },
    "eraId": "enlightenment",
    "lifespan": "1685 - 1753",
    "birthYear": 1685,
    "deathYear": 1753,
    "region": "west",
    "nationality": "爱尔兰王国·基尔肯尼",
    "avatar": "/assets/philosophers/berkeley.jpg",
    "schools": [
      "英国经验论",
      "主观唯心主义",
      "非物质主义 (Immaterialism)"
    ],
    "primaryDomain": "metaphysics",
    "coreInsight": "存在即是被感知（Esse est percipi）；离开心灵的感知，世上根本不存在任何客观独立的‘物质实体’。",
    "analogy": "森林深处倒下的树木：若没有任何人、任何动物听见或感知它，那声音与倒下的树木实体在客观上毫无意义，唯因上帝永恒感知着万物，世界才得以维系。",
    "summary": "爱尔兰主教、西方主观唯心主义的激进代表。贝克莱敏锐地抓住洛克经验论的内在漏洞进行致命反击：如果人类的一切知识确实只能来源于感官知觉，那么我们所能感知的唯有颜色、声音、触感等‘感觉观念’，谁曾真正感知过那个所谓的冷冰冰的‘客观物质基质’？由此他得出惊世骇俗的论断：‘物质’纯粹是无根据的抽象词汇迷信，物即观念的集合。为了防止世界在人闭眼时化为乌有，他引入全知的上帝作为永恒感知者。",
    "historicalImpact": "以最彻底的经验主义逻辑推导出不可思议的主观唯心主义结论，逼迫欧洲哲学重新审视主客关系，直接刺激了休谟与康德哲学的诞生。",
    "keyConcepts": [
      {
        "term": "存在即被感知 (Esse est percipi)",
        "explanation": "事物的存在完全依赖于它被某种心智或灵魂所感知的状态，脱离感知者便没有事物存在。"
      },
      {
        "term": "拒斥物质实体",
        "explanation": "所谓无生命的独立物质实体是一个逻辑自相矛盾的概念，唯有精神和观念才是真实的存在。"
      },
      {
        "term": "上帝作为永恒感知之眼",
        "explanation": "当凡人闭眼睡眠时，大自然之所以依然稳定持存，是因为上帝永不停歇地在普遍心灵中感知着万象。"
      }
    ],
    "famousQuotes": [
      {
        "quote": "存在就是被感知，或者去感知（Esse est percipi aut percipere）。",
        "source": "《人类知识原理》"
      },
      {
        "quote": "我们先把尘土扬起，然后又抱怨我们看不清眼前的一切。"
      }
    ],
    "notableWorks": [
      "《人类知识原理》",
      "《海拉斯与斐洛诺斯对话三篇》",
      "《视觉新论》"
    ],
    "influencedBy": [
      "locke",
      "descartes"
    ],
    "influenced": [
      "hume",
      "kant",
      "mach",
      "russell"
    ],
    "culturalEchoIds": [
      "thinker-rodin",
      "matrix"
    ]
  },
  {
    "id": "hume",
    "name": {
      "zh": "大卫·休谟",
      "en": "David Hume",
      "original": "David Hume"
    },
    "eraId": "enlightenment",
    "lifespan": "1711 - 1776",
    "birthYear": 1711,
    "deathYear": 1776,
    "region": "west",
    "nationality": "苏格兰王国·爱丁堡",
    "avatar": "/assets/philosophers/hume.jpg",
    "schools": [
      "苏格兰启蒙运动",
      "激进经验主义",
      "因果怀疑论",
      "道德情感主义"
    ],
    "primaryDomain": "epistemology",
    "coreInsight": "休谟之叉与因果怀疑论：因果关系并非客观必然规律，只是人类心理上的习惯性联想；理性永远是激情的奴隶。",
    "analogy": "两颗碰撞的台球：白球撞向红球，红球滚动，感官看见的只是前后连续发生的时间相继，你从未亲眼‘看见’那根叫做‘必然因果纽带’的隐形绳索。",
    "summary": "西方哲学史上最具摧毁力的怀疑论巨匠。休谟将经验主义推演到登峰造极的逻辑终点：一切观念来自生动的印象；然而，经验归纳永远无法保证明天的太阳必然升起，因果律不过是人们在反复经验后的心理习惯；同样，反省内心也找寻不到永恒不变的‘自我实体’，只有一束瞬息万变的知觉奔流。他的批判彻底震碎了启蒙理性的自负，把科学必然性逼入险境。",
    "historicalImpact": "将自笛卡尔以来的古典唯理论与经验论形而上学全部砸碎，康德坦言正是休谟‘打破了我多年的独断论迷梦’，直接催生了批判哲学与现代实证科学哲学。",
    "keyConcepts": [
      {
        "term": "休谟之问（因果律与归纳问题）",
        "explanation": "指出我们无法通过纯逻辑或有限经验归纳证明事物之间存在客观必然的因果联系。"
      },
      {
        "term": "知觉束自我论 (Bundle Theory of Self)",
        "explanation": "不存在笛卡尔所谓永恒实体式的灵魂自我，自我仅仅是一团不断流动更迭的知觉集合。"
      },
      {
        "term": "休谟之叉 (Hume's Fork)",
        "explanation": "将所有命题二分为‘观念的关系’（数学逻辑分析）与‘实际的事实’（经验综合），其余皆为无根幻觉。"
      }
    ],
    "famousQuotes": [
      {
        "quote": "习惯是人类生活的伟大指南。",
        "source": "《人类理解研究》"
      },
      {
        "quote": "理性是，而且只应当是激情的奴隶，除了服务和服从于激情之外，它绝不能假装有任何其他工作。"
      }
    ],
    "notableWorks": [
      "《人性论》",
      "《人类理解研究》",
      "《道德原则研究》",
      "《自然宗教对话录》"
    ],
    "influencedBy": [
      "locke",
      "berkeley",
      "newton"
    ],
    "influenced": [
      "kant",
      "popper",
      "einstein",
      "russell",
      "ayer"
    ],
    "culturalEchoIds": [
      "thinker-rodin",
      "oppenheimer"
    ]
  },
  {
    "id": "hobbes",
    "name": {
      "zh": "托马斯·霍布斯",
      "en": "Thomas Hobbes",
      "original": "Thomas Hobbes"
    },
    "eraId": "enlightenment",
    "lifespan": "1588 - 1679",
    "birthYear": 1588,
    "deathYear": 1679,
    "region": "west",
    "nationality": "英格兰王国·马姆斯伯里",
    "avatar": "/assets/philosophers/hobbes.jpg",
    "schools": [
      "古典政治哲学",
      "机械唯物论",
      "专制社会契约论"
    ],
    "primaryDomain": "political",
    "coreInsight": "自然状态下所有人对所有人的战争，人生孤独、贫困、卑污、残忍且短寿；唯有交出权利铸造绝对主权的‘利维坦’，文明方能免于自我毁灭。",
    "analogy": "巨兽利维坦：国家如同《圣经》中力量无可匹敌的海中巨兽，由千万个脆弱恐惧的个人契约合成一体，用强力宝剑震慑所有内讧冲突。",
    "summary": "现代政治哲学与现实主义理论的开山鼻祖。目睹英国内战弑君与流血惨剧，霍布斯从极端冷酷的机械唯物主义人性观出发，假设在没有公共强力震慑的‘自然状态’下，人人受自我保全与无限欲望驱使，人对人如同豺狼，陷入朝不保夕的万民交战。为了摆脱这一极度恐怖的深渊，理性促使人们订立契约，将全部自卫暴力让渡给统一的最高主权者（利维坦），以铁腕秩序换取和平生存。",
    "historicalImpact": "开创了现代社会契约论、法治实证主义与国际政治现实主义流派，是现代主权国家理论的核心奠基者。",
    "keyConcepts": [
      {
        "term": "自然状态 (State of Nature)",
        "explanation": "没有法律与国家强力时的前文明状态，所有人陷入因自卫恐惧而被迫相互厮杀的噩梦。"
      },
      {
        "term": "利维坦 (Leviathan)",
        "explanation": "通过公民契约诞生的人造世俗上帝，拥有独一无二、至高无上的绝对裁决与执法权力。"
      },
      {
        "term": "第一自然法",
        "explanation": "每一个人都应当竭尽所能去寻求和平并维护和平，在不能求得和平时方可采取一切手段自卫。"
      }
    ],
    "famousQuotes": [
      {
        "quote": "在没有公共强力使大家慑服的时候，人们便处在所有人对所有人的战争状态中。",
        "source": "《利维坦》"
      },
      {
        "quote": "在自然状态下，人对人如同豺狼（Homo homini lupus）。"
      }
    ],
    "notableWorks": [
      "《利维坦 (Leviathan)》",
      "《论公民》",
      "《论物体》"
    ],
    "influencedBy": [
      "thucydides",
      "galileo",
      "descartes"
    ],
    "influenced": [
      "locke",
      "rousseau",
      "spinoza",
      "kant",
      "marx"
    ],
    "culturalEchoIds": [
      "oppenheimer",
      "matrix"
    ]
  },
  {
    "id": "rousseau",
    "name": {
      "zh": "让-雅克·卢梭",
      "en": "Jean-Jacques Rousseau",
      "original": "Jean-Jacques Rousseau"
    },
    "eraId": "enlightenment",
    "lifespan": "1712 - 1778",
    "birthYear": 1712,
    "deathYear": 1778,
    "region": "west",
    "nationality": "日内瓦共和国·日内瓦",
    "avatar": "/assets/philosophers/rousseau.jpg",
    "schools": [
      "激进启蒙政治哲学",
      "浪漫主义先声",
      "人民主权论"
    ],
    "primaryDomain": "political",
    "coreInsight": "人人生而自由，却无往不在枷锁之中；私有制是一切社会不平等的根源；国家合法性唯一源于不可分割的公民‘公意’（General Will）。",
    "analogy": "自然之子与都市囚徒：丛林中高贵纯洁的原初野蛮人自给自足、慈悲善良，直到文明和私有制围起篱笆，将人类装进虚伪堕落的黄金囚笼。",
    "summary": "法国大革命的精神导师、浪漫主义文学的灵魂鼻祖。卢梭以充满激情的滔天雄辩反叛了启蒙运动对科学进步的盲目崇拜，指出文明与科学繁荣反而使人性日益伪善与奴化。他在《社会契约论》中宣告主权在民，主权者绝不能由君王代劳，唯有全社会共同利益凝聚而成的‘公意（Volonté Générale）’才具有立法神圣性，公民服从公意就是服从自身最自由崇高的理性。",
    "historicalImpact": "直接点燃了法国大革命的烈焰，重塑了现代民主、激进平等主义、国家教育学与浪漫主义情感文学的基因。",
    "keyConcepts": [
      {
        "term": "公意 (General Will)",
        "explanation": "超越私人私利总和（众意）的公共共同善意志，体现城邦全体公民最高政治道德正义。"
      },
      {
        "term": "高贵的野蛮人",
        "explanation": "人类在未受文明异化之前的原初自然状态中，心怀自爱与怜悯，天生纯洁平等。"
      },
      {
        "term": "人民主权不可转让",
        "explanation": "国家最高立法主权永远属于全体人民，不可被代议制或独裁者独吞与代表。"
      }
    ],
    "famousQuotes": [
      {
        "quote": "人人生而自由，却无往不在枷锁之中。",
        "source": "《社会契约论》"
      },
      {
        "quote": "第一个圈起一块土地并说‘这是我的’、并且找到足够愚蠢的人相信他的人，就是文明社会真正的奠基者。"
      }
    ],
    "notableWorks": [
      "《社会契约论》",
      "《论人类不平等的起源和基础》",
      "《爱弥儿》",
      "《忏悔录》"
    ],
    "influencedBy": [
      "plato",
      "machiavelli",
      "locke"
    ],
    "influenced": [
      "kant",
      "hegel",
      "marx",
      "robespierre",
      "tolstoy"
    ],
    "culturalEchoIds": [
      "matrix"
    ]
  },
  {
    "id": "montesquieu",
    "name": {
      "zh": "孟德斯鸠",
      "en": "Montesquieu",
      "original": "Charles-Louis de Secondat, Baron de La Brède et de Montesquieu"
    },
    "eraId": "enlightenment",
    "lifespan": "1689 - 1755",
    "birthYear": 1689,
    "deathYear": 1755,
    "region": "west",
    "nationality": "法兰西王国·波尔多拉布雷德",
    "avatar": "/assets/philosophers/montesquieu.jpg",
    "schools": [
      "法国启蒙运动",
      "历史法学派先驱",
      "分权制衡宪政论"
    ],
    "primaryDomain": "political",
    "coreInsight": "要防止滥用权力，就必须以权力约束权力；立法、行政、司法三权分立，才能保障公民自由免遭暴政践踏。",
    "analogy": "稳定的三足鼎立：鼎的三足各自独立受力，相互牵引支撑，任何一足企图独大倾斜，都会被另外两足的机械平衡所遏止。",
    "summary": "近代资产阶级宪政国家学说奠基人。孟德斯鸠穷二十年心血游历欧洲考察诸国法制，写下皇皇巨著《论法的精神》。他从人类地理气候、经济生活与风俗习惯出发，论证法律不是上帝任意命令，而是根植于事物性质的必然关系。他发展了洛克的分权思想，明确提出并完善了‘立法权、行政权、司法权’三权分立并相互制衡的精密宪政体系，为防止专制确立了制度保险箱。",
    "historicalImpact": "三权分立理论直接成为美国1787年联邦宪法与现代法治国家宪政架构的根本蓝图与核心基石。",
    "keyConcepts": [
      {
        "term": "三权分立与制衡 (Separation of Powers)",
        "explanation": "立法权制定法律，行政权执行决策，司法权惩处犯罪并裁决纠纷，三权互不隶属且相互制约。"
      },
      {
        "term": "自由的法治定义",
        "explanation": "自由不是随心所欲，而是在法律允许的范围内行事的权利；如果公民可以做法律禁止的事，便不再有自由。"
      },
      {
        "term": "地理环境决定论",
        "explanation": "气候、土壤与国土疆域等客观自然条件对民族性格、政治体制与法律精神产生深远塑造。"
      }
    ],
    "famousQuotes": [
      {
        "quote": "一切有权力的人都容易滥用权力，这是万古不易的一条经验；要防止滥用权力，就必须以权力约束权力。",
        "source": "《论法的精神》"
      },
      {
        "quote": "衡量一个国家的自由程度，主要看其司法是否真正独立。"
      }
    ],
    "notableWorks": [
      "《论法的精神 (The Spirit of the Laws)》",
      "《波斯人信札》",
      "《罗马盛衰原因论》"
    ],
    "influencedBy": [
      "aristotle",
      "cicero",
      "locke"
    ],
    "influenced": [
      "madison",
      "hamilton",
      "rousseau",
      "kant",
      "hegel"
    ],
    "culturalEchoIds": [
      "matrix"
    ]
  },
  {
    "id": "wang-yangming",
    "name": {
      "zh": "王阳明",
      "en": "Wang Yangming",
      "original": "王守仁"
    },
    "eraId": "enlightenment",
    "lifespan": "1472 - 1529",
    "birthYear": 1472,
    "deathYear": 1529,
    "region": "east",
    "nationality": "明代·浙江余姚",
    "avatar": "/assets/philosophers/wang-yangming.jpg",
    "schools": [
      "阳明心学",
      "儒家心学集大成",
      "知行合一论"
    ],
    "primaryDomain": "ethics",
    "coreInsight": "心即理也，天下无心外之物、心外之事、心外之理；知行合一；致吾心之良知于事事物物。",
    "analogy": "山中之花：你未看此花时，此花与汝心同归于寂；你来看此花时，则此花颜色一时明白起来，便知此花不在汝心之外。",
    "summary": "中国哲学史上立德、立功、立言三不朽圣人。早年格竹成疾困惑于朱熹‘格物致知’的外求繁琐，于贵州龙场蛮荒绝境中大悟‘圣人之道，吾性自足，向他求理是为倒置’。他创立阳明心学，打破道德理性和经验外界的割裂，提炼出‘心即理’、‘知行合一’与‘致良知’，并立四句教：‘无善无恶心之体，有善有恶意之动，知善知恶是良知，为善去恶是格物’。",
    "historicalImpact": "彻底解放了明清沉闷的程朱理学思想桎梏，点燃了东亚士人主体精神觉醒的狂飙火种，更对日本明治维新三杰产生了决定性精神滋养。",
    "keyConcepts": [
      {
        "term": "心即理也",
        "explanation": "至高天理本自具足于本心之中，无须向心外世界琐碎格求，心外无理、心外无物。"
      },
      {
        "term": "知行合一",
        "explanation": "知是行之始，行是知之成；未有知而不行者，知而不行只是未知；真知必落实在实践行动之中。"
      },
      {
        "term": "致良知",
        "explanation": "良知是人不假外求、不虑而知的道德原初灵明，将良知扩充贯彻于世间万事万物即是最高修养。"
      }
    ],
    "famousQuotes": [
      {
        "quote": "破山中贼易，破心中贼难。",
        "source": "《与杨仕德薛尚谦书》"
      },
      {
        "quote": "此心光明，亦复何言！",
        "source": "临终遗言"
      }
    ],
    "notableWorks": [
      "《传习录》",
      "《大学问》",
      "《王文成公全书》"
    ],
    "influencedBy": [
      "confucius",
      "mencius",
      "huineng",
      "lu-jiuyuan"
    ],
    "influenced": [
      "li-zhi",
      "huang-zongxi",
      "saigo-takamori",
      "mori-ogai"
    ],
    "culturalEchoIds": [
      "disco-elysium"
    ]
  },
  {
    "id": "kant",
    "name": {
      "zh": "伊曼努尔·康德",
      "en": "Immanuel Kant",
      "original": "Immanuel Kant"
    },
    "eraId": "nineteenth-century",
    "lifespan": "1724 - 1804",
    "birthYear": 1724,
    "deathYear": 1804,
    "region": "west",
    "nationality": "普鲁士王国·柯尼斯堡",
    "avatar": "/assets/philosophers/kant.jpg",
    "schools": [
      "德国古典哲学奠基人",
      "批判哲学",
      "先验唯心论",
      "道德义务论"
    ],
    "primaryDomain": "epistemology",
    "coreInsight": "认识论的哥白尼革命——人为自然界立法；人只能认识现象，而不可知物自体；绝对命令：人是目的，绝非纯粹的工具。",
    "analogy": "一副摘不下来的彩色滤镜眼镜：人类心智生来便戴着时空感性直观形式与12对先验范畴的滤镜，外界光线必须透过这副眼镜加工整理，才能呈现为我们能理解的经验世界。",
    "summary": "西方哲学史上的至尊枢纽与分水岭。柯尼斯堡的钟表般自律的哲人。康德面对唯理论的盲目独断与休谟的毁灭性怀疑论双重危机，耗费十余年沉思写下《纯粹理性批判》。他发动划时代的‘哥白尼式转向’：以往人们假定人类认识必须符合对象，康德反转主张对象必须符合人类主体的先验认知形式。他划定了人类纯粹理性的边界拯救了科学与因果律，为道德自由留出了神圣空间，并在《实践理性批判》中确立了不计功利的‘绝对命令’。",
    "historicalImpact": "‘康德哲学犹如一个蓄水池，所有以前的哲学都流向它，所有以后的哲学都从它流出。’彻底奠定了德国古典唯心论与现代伦理学规范。",
    "keyConcepts": [
      {
        "term": "哥白尼式革命",
        "explanation": "人类认识不是消极反映外界客体，而是主体先验心智形式能动地赋予客观经验以秩序法则（人为自然立法）。"
      },
      {
        "term": "现象与物自体 (Phenomena & Noumena)",
        "explanation": "人类永远只能认识经由感官和知性范畴加工显现的‘现象界’，而事物本身的客观真相‘物自体’在理论上不可认知。"
      },
      {
        "term": "定言命令 / 绝对命令 (Categorical Imperative)",
        "explanation": "无条件的道德律令：‘你要这样行动，使得你的意志的准则随时都能同时成为普遍立法的原理’，人是目的绝非手段。"
      }
    ],
    "famousQuotes": [
      {
        "quote": "有两样东西，越是经常持久地对它们凝神思索，它们就越是使内心充满常新而日增的赞叹和敬畏：头顶璀璨的星空，心中高尚的道德律。",
        "source": "《实践理性批判》"
      },
      {
        "quote": "人是目的，而不仅仅是手段。"
      }
    ],
    "notableWorks": [
      "《纯粹理性批判》",
      "《实践理性批判》",
      "《判断力批判》",
      "《道德形而上学奠基》"
    ],
    "influencedBy": [
      "rousseau",
      "hume",
      "leibniz",
      "descartes",
      "newton"
    ],
    "influenced": [
      "fichte",
      "hegel",
      "schopenhauer",
      "marx",
      "nietzsche",
      "popper"
    ],
    "culturalEchoIds": [
      "wanderer-fog",
      "thinker-rodin"
    ]
  },
  {
    "id": "fichte",
    "name": {
      "zh": "约翰·戈特利布·费希特",
      "en": "Johann Gottlieb Fichte",
      "original": "Johann Gottlieb Fichte"
    },
    "eraId": "nineteenth-century",
    "lifespan": "1762 - 1814",
    "birthYear": 1762,
    "deathYear": 1814,
    "region": "west",
    "nationality": "普鲁士·萨克森拉梅瑙",
    "avatar": "/assets/philosophers/fichte.jpg",
    "schools": [
      "德国古典哲学",
      "主观唯心主义",
      "行动与自由哲学"
    ],
    "primaryDomain": "metaphysics",
    "coreInsight": "自我设定自身，自我设定非我；行动、行动，这就是我们存在的终极目的；世界是纯粹实践意志展现自由的舞台。",
    "analogy": "劈波斩浪的冲浪者：‘非我’如同迎面扑来的狂暴海浪，它并非独立于自我的死物，而是‘自我’为了展现力量与自由而主动迎战、征服的对立阻力。",
    "summary": "德国唯心主义激进主观派先锋、柏林大学首任校长。费希特不满足于康德在主客体之间保留的那个冷冰冰的‘不可知物自体’，认为这是唯心体系的残余脓肿。他大刀阔斧地将物自体彻底切除，以原初行动的‘绝对自我’为整个哲学的唯一绝对起点，推导出三大原则：自我设定自身；自我设定与自身对立的非我；自我在自身中设定可分割的非我与自我相抗衡。哲学不是静止的书斋思辨，而是以道德意志征服现实客体的无止境英雄战斗。",
    "historicalImpact": "打通了康德认识论与行动实践论之间的鸿沟，其辩证法的三步设定直接启蒙了黑格尔的辩证逻辑大厦与谢林的自然哲学。",
    "keyConcepts": [
      {
        "term": "行动本质 (Tathandlung)",
        "explanation": "自我不是一个静止的客体或名词，而是原初的纯粹能动行为与自发创造力（我思且我行）。"
      },
      {
        "term": "自我设定非我",
        "explanation": "外部客观世界（非我）是绝对自我为了给自己的道德意志提供实践克服的阻力障碍而必然投射出的对立面。"
      },
      {
        "term": "自由与道德使命",
        "explanation": "人类真正的本质唯有在克服外在阻碍、实现意志自主的行动斗争中才能得以确立与证明。"
      }
    ],
    "famousQuotes": [
      {
        "quote": "行动！行动！这就是我们存在的目的所在。",
        "source": "《论学者的使命》"
      },
      {
        "quote": "我们选择什么样的哲学，取决于我们是什么样的人。"
      }
    ],
    "notableWorks": [
      "《全部知识学的基础》",
      "《论学者的使命》",
      "《对德意志民族的演讲》"
    ],
    "influencedBy": [
      "kant",
      "spinoza",
      "rousseau"
    ],
    "influenced": [
      "hegel",
      "schelling",
      "schopenhauer",
      "marx"
    ],
    "culturalEchoIds": [
      "wanderer-fog"
    ]
  },
  {
    "id": "hegel",
    "name": {
      "zh": "格奥尔格·威廉·弗里德里希·黑格尔",
      "en": "G. W. F. Hegel",
      "original": "Georg Wilhelm Friedrich Hegel"
    },
    "eraId": "nineteenth-century",
    "lifespan": "1770 - 1831",
    "birthYear": 1770,
    "deathYear": 1831,
    "region": "west",
    "nationality": "符腾堡公国·斯图加特",
    "avatar": "/assets/philosophers/hegel.jpg",
    "schools": [
      "德国古典唯心论巅峰",
      "客观唯心主义",
      "思辨辩证法"
    ],
    "primaryDomain": "metaphysics",
    "coreInsight": "凡合乎理性的皆合乎现实，凡现实的皆合乎理性；绝对精神在历史矛盾中演进；密涅瓦的猫头鹰只在黄昏起飞。",
    "analogy": "橡树生长史：橡果（正）被土壤否定腐烂（反），却升华为枝繁叶茂的参天大树（合），包含了前面所有阶段却达到了更高形态。",
    "summary": "人类思辨哲学最高殿堂的集大成建造者。黑格尔构筑了人类历史上最庞大精密的哲学宇宙：世界本质是‘绝对精神’（Absolute Spirit），它并非高悬世外，而是在时空中不断异化出自然界与人类社会，通过‘正-反-合’的矛盾否定之否定，最终在艺术、宗教与哲学的自我意识中达成绝对自由。他深刻论证了主奴辩证法、市民社会与历史哲学，将人类思想从静止分类升华为动态发展的历史长河。",
    "historicalImpact": "构成了现代辩证法、历史哲学与国家哲学的最高巅峰，分裂出青年黑格尔派与老年黑格尔派，直接孕育了马克思主义唯物辩证法。",
    "keyConcepts": [
      {
        "term": "思辨辩证法（正-反-合）",
        "explanation": "事物内在的自我否定与矛盾是其发展的根本动力，通过对否定的否定（扬弃/Aufhebung）实现向更高真理的飞跃。"
      },
      {
        "term": "主奴辩证法 (Master-Slave Dialectic)",
        "explanation": "自我意识在生死斗争中分化为主仆，然而掌握劳动的奴隶通过改造现实客体最终反向获得了真正的自我意识与自由。"
      },
      {
        "term": "理性的狡计 (Cunning of Reason)",
        "explanation": "历史伟人与民众虽受个体激情驱动盲目争斗，但绝对精神却巧妙利用他们的私欲实现了人类历史整体自由的演进。"
      }
    ],
    "famousQuotes": [
      {
        "quote": "凡是合乎理性的都是现实的，凡是现实的都是合乎理性的。",
        "source": "《法哲学原理》"
      },
      {
        "quote": "密涅瓦的猫头鹰只有在黄昏降临时，才会展开双翼起飞。"
      }
    ],
    "notableWorks": [
      "《精神现象学》",
      "《逻辑学（大逻辑）》",
      "《法哲学原理》",
      "《历史哲学》"
    ],
    "influencedBy": [
      "heraclitus",
      "plato",
      "aristotle",
      "spinoza",
      "kant",
      "fichte"
    ],
    "influenced": [
      "marx",
      "engels",
      "feuerbach",
      "kierkegaard",
      "zizek"
    ],
    "culturalEchoIds": [
      "wanderer-fog",
      "disco-elysium"
    ]
  },
  {
    "id": "feuerbach",
    "name": {
      "zh": "路德维希·费尔巴哈",
      "en": "Ludwig Feuerbach",
      "original": "Ludwig Andreas Feuerbach"
    },
    "eraId": "nineteenth-century",
    "lifespan": "1804 - 1872",
    "birthYear": 1804,
    "deathYear": 1872,
    "region": "west",
    "nationality": "巴伐利亚王国·兰茨胡特",
    "avatar": "/assets/philosophers/feuerbach.jpg",
    "schools": [
      "青年黑格尔派",
      "人本学唯物主义",
      "宗教批判"
    ],
    "primaryDomain": "metaphysics",
    "coreInsight": "不是上帝创造了人，而是人按照自己的形象创造了上帝；宗教是人类本质的异化投射；把爱上帝转换为爱具体的人间同胞。",
    "analogy": "仰望镜中的倒影：人类将自己最美好的理性、善良、慈悲无限放大，投射到天幕上尊为‘上帝’，然后反过来跪倒在自己创造的幻象面前祈求怜悯。",
    "summary": "打碎黑格尔唯心主义神话的唯物主义惊雷巨匠。费尔巴哈发表《基督教的本质》，轰动整个欧洲思想界。他揭示出黑格尔的‘绝对精神’不过是戴上了哲学面具的基督教上帝。人才是真正有血有肉有感觉的主体，而神不过是人的本质（理性、意志、爱）的异化客体。人类必须从神圣天国回归现实大地，以人本主义的感性与人类同胞之爱取代对虚妄神祇的盲从。",
    "historicalImpact": "恩格斯写道：“那时费尔巴哈的《基督教的本质》出版了。它直截了当地把唯物主义重新安上王座……我们大家一下子都成为费尔巴哈派了。”为马克思确立唯物主义世界观提供了直接桥梁。",
    "keyConcepts": [
      {
        "term": "宗教本质异化论",
        "explanation": "上帝不过是人类将自身无限的本质力量（智慧、仁爱、力量）与现实自身割裂剥离后的神圣虚构投射。"
      },
      {
        "term": "感性人本唯物主义",
        "explanation": "真正的真理不在抽象理念中，而在具有血肉之躯、感性体验与饥渴欲望的具体现实人类身上。"
      },
      {
        "term": "以人与人的爱取代神学",
        "explanation": "哲学的终极使命是使人从神学的蒙昧自我贬低中站立起来，在人类之间的相互理解与爱中实现自我实现。"
      }
    ],
    "famousQuotes": [
      {
        "quote": "人是人自己的上帝（Homo homini Deus est）。",
        "source": "《基督教的本质》"
      },
      {
        "quote": "人是他所吃的东西（Der Mensch ist, was er isst）——人由物质现实塑造。"
      }
    ],
    "notableWorks": [
      "《基督教的本质》",
      "《未来哲学原理》",
      "《关于哲学改造的临时纲要》"
    ],
    "influencedBy": [
      "hegel",
      "spinoza"
    ],
    "influenced": [
      "marx",
      "engels",
      "nietzsche",
      "freud"
    ],
    "culturalEchoIds": [
      "disco-elysium"
    ]
  },
  {
    "id": "marx",
    "name": {
      "zh": "卡尔·马克思",
      "en": "Karl Marx",
      "original": "Karl Heinrich Marx"
    },
    "eraId": "nineteenth-century",
    "lifespan": "1818 - 1883",
    "birthYear": 1818,
    "deathYear": 1883,
    "region": "west",
    "nationality": "普鲁士王国·特里尔",
    "avatar": "/assets/philosophers/marx.jpg",
    "schools": [
      "历史唯物主义",
      "辩证唯物主义",
      "科学社会主义",
      "政治经济学批判"
    ],
    "primaryDomain": "political",
    "coreInsight": "不是人们的意识决定人们的存在，相反，是人们的社会存在决定人们的意识；哲学家们只是解释世界，问题在于改变世界！",
    "analogy": "大厦的基石与殿堂：生产力与生产关系构成的经济基础是底层的承重地基，法律、宗教、国家与哲学这些意识形态只是建在地基之上的上层建筑。",
    "summary": "无产阶级革命导师、人类近代思想史最伟大的变革者。马克思吸纳黑格尔辩证法的合理内核与费尔巴哈唯物主义基本原则，完成了人类思想史上最震撼的“颠倒”：将头足倒立的唯心哲学重新双脚落在大地上。他在《资本论》中解剖了资本主义雇佣劳动、剩余价值剥削与劳动异化机制，指出人类社会演进的根本动力不是神明意志也不是纯洁理性，而是阶级斗争与物质生产方式的历史运动，吹响了劳动者彻底解放的号角。",
    "historicalImpact": "彻底终结了书斋经院形而上学，将哲学转化为摧枯拉朽的政治经济学革命实践，塑造了20世纪全球地缘政治与人类解放运动的半壁江山。",
    "keyConcepts": [
      {
        "term": "唯物主义历史观 (Historical Materialism)",
        "explanation": "生产力决定生产关系，经济基础决定上层建筑；阶级斗争是阶级社会发展的直接发动机。"
      },
      {
        "term": "劳动异化理论 (Estranged Labour)",
        "explanation": "在资本主义生产中，工人生产的商品反过来成为统治压迫工人的异己死力量，使人的本质全面扭曲。"
      },
      {
        "term": "剩余价值学说 (Surplus Value)",
        "explanation": "揭露资本家无偿占有工人在必要劳动时间之外创造的剩余价值，阐明资本积累与经济危机的内在死结。"
      }
    ],
    "famousQuotes": [
      {
        "quote": "哲学家们只是用不同的方式解释世界，而问题在于改变世界。",
        "source": "《关于费尔巴哈的提纲》"
      },
      {
        "quote": "全世界无产者，联合起来！",
        "source": "《共产党宣言》"
      }
    ],
    "notableWorks": [
      "《资本论（全三卷）》",
      "《共产党宣言》",
      "《1844年经济学哲学手稿》",
      "《德意志意识形态》"
    ],
    "influencedBy": [
      "hegel",
      "feuerbach",
      "smith",
      "ricardo",
      "rousseau"
    ],
    "influenced": [
      "engels",
      "lenin",
      "gramsci",
      "adorno",
      "horkheimer",
      "foucault",
      "zizek"
    ],
    "culturalEchoIds": [
      "disco-elysium",
      "matrix"
    ]
  },
  {
    "id": "engels",
    "name": {
      "zh": "弗里德里希·恩格斯",
      "en": "Friedrich Engels",
      "original": "Friedrich Engels"
    },
    "eraId": "nineteenth-century",
    "lifespan": "1820 - 1895",
    "birthYear": 1820,
    "deathYear": 1895,
    "region": "west",
    "nationality": "普鲁士王国·莱茵省巴门",
    "avatar": "/assets/philosophers/engels.jpg",
    "schools": [
      "辩证唯物主义",
      "历史唯物主义",
      "自然辩证法",
      "马克思主义奠基者"
    ],
    "primaryDomain": "political",
    "coreInsight": "劳动创造了人本身；自然界是检验辩证法的试金石；家庭、私有制与国家都是历史暂时的产物，必将走向消亡。",
    "analogy": "从猿到人的直立之手：古猿的手因为劳动从攀爬中解放出来，制造出第一把石斧，最终不仅改变了自然，更重塑了人类自身的大脑与语言。",
    "summary": "马克思最亲密的战友与马克思主义学说的共同创立者。恩格斯以深厚的实地调查写下《英国工人阶级状况》，并在马克思身后倾尽心血整理出版了《资本论》第二、三卷。他在哲学上的卓越贡献在于系统论述了“自然辩证法”，将辩证法从人类历史领域拓展至整个客观自然演化史（质量互变、对立统一、否定之否定），并在《家庭、私有制和国家的起源》中开创性剖析了私有制产生、阶级分化与国家机器的兴亡规律。",
    "historicalImpact": "使马克思主义哲学系统化、通俗化与跨学科延伸至自然科学与人类学，对全球社会主义运动与现代社会科学产生了不可磨灭的深远贡献。",
    "keyConcepts": [
      {
        "term": "劳动创造了人本身",
        "explanation": "人类从动物界的蜕变飞跃，根本原因在于制造工具的劳动实践促进了直立行走、语言萌发与大脑进化。"
      },
      {
        "term": "自然辩证法三大规律",
        "explanation": "客观自然界的物质运动遵循质量互变、对立面相互渗透统一、否定之否定的普遍辩证法则。"
      },
      {
        "term": "国家的历史起源与消亡",
        "explanation": "国家不是超自然神圣物，而是社会阶级矛盾不可调和的暴力统治工具，随私有制产生，也将随共产主义无阶级社会而自行消亡。"
      }
    ],
    "famousQuotes": [
      {
        "quote": "我们不要过分陶醉于我们人类对自然界的胜利；对于每一次这样的胜利，自然界都对我们进行了报复。",
        "source": "《自然辩证法》"
      },
      {
        "quote": "国家绝不是从外部强加于社会的一种力量，它是社会在一定发展阶段上的产物。"
      }
    ],
    "notableWorks": [
      "《自然辩证法》",
      "《家庭、私有制和国家的起源》",
      "《反杜林论》",
      "《路德维希·费尔巴哈和德国古典哲学的终结》"
    ],
    "influencedBy": [
      "hegel",
      "feuerbach",
      "darwin",
      "morgan"
    ],
    "influenced": [
      "lenin",
      "luxemburg",
      "althusser",
      "haraway"
    ],
    "culturalEchoIds": [
      "disco-elysium"
    ]
  },
  {
    "id": "schopenhauer",
    "name": {
      "zh": "阿图尔·叔本华",
      "en": "Arthur Schopenhauer",
      "original": "Arthur Schopenhauer"
    },
    "eraId": "nineteenth-century",
    "lifespan": "1788 - 1860",
    "birthYear": 1788,
    "deathYear": 1860,
    "region": "west",
    "nationality": "波兰立陶宛联邦·但泽",
    "avatar": "/assets/philosophers/schopenhauer.jpg",
    "schools": [
      "生存意志哲学",
      "形而上学悲观主义",
      "东方佛道融合"
    ],
    "primaryDomain": "metaphysics",
    "coreInsight": "世界是我的表象，世界是我的意志；生命是一团盲目奔涌的无尽欲望，人生如钟摆，在痛苦与无聊之间摆荡；唯有艺术审美与清心寡欲能带来片刻解脱。",
    "analogy": "盲人骑瞎马：盲目的巨汉是深层奔腾的‘生存意志’，而理智不过是一个坐在巨汉肩膀上、被意志随意颠簸驱使的弱小盲人探路者。",
    "summary": "西方非理性主义哲学开山巨匠。叔本华以一己之力向黑格尔的理性绝对精神发起了绝地反击。他在《作为意志和表象的世界》中，借用康德的物自体概念并吸收印度《奥义书》与佛陀真谛，指出世界的终极物自体并非理性逻辑，而是一股永不停息、盲目贪婪冲动的‘生存意志’（Will to Live）。欲望得不到满足便痛苦，得到满足便无聊，人生即永恒苦海。唯有在超然的艺术纯粹审美与对众生受苦的彻底同情（禁欲）中，才能平息意志的惊涛骇浪。",
    "historicalImpact": "敲响了西方唯理主义神话的丧钟，为尼采、弗洛伊德精神分析（潜意识学说）、托尔斯泰与卡夫卡现代主义文学注入了最具颠覆性的灵魂基因。",
    "keyConcepts": [
      {
        "term": "作为物自体的生存意志 (Will to Live)",
        "explanation": "整个宇宙底层的盲目冲动力量，无论繁衍、求生还是引力，皆是同一意志的不同等级表象。"
      },
      {
        "term": "人生钟摆论",
        "explanation": "欲望未满即受匮乏折磨（痛苦），欲望一旦满足便陷入空虚厌倦（无聊），生命在两极之间无休止摆荡。"
      },
      {
        "term": "艺术审美的超脱救赎",
        "explanation": "在沉浸于纯粹美（尤其是音乐）的瞬间，人类主体暂时摆脱意志欲望的奴役，成为纯粹无私欲的认知之眼。"
      }
    ],
    "famousQuotes": [
      {
        "quote": "生命是一团欲望，欲望不能满足便痛苦，满足便无聊，人生就在痛苦和无聊之间摇摆。",
        "source": "《作为意志和表象的世界》"
      },
      {
        "quote": "要么庸俗，要么孤独。"
      }
    ],
    "notableWorks": [
      "《作为意志和表象的世界》",
      "《附录和补遗（人生的智慧）》",
      "《论充足理由律的四重根》"
    ],
    "influencedBy": [
      "kant",
      "plato",
      "upanishads",
      "buddhism"
    ],
    "influenced": [
      "nietzsche",
      "freud",
      "wittgenstein",
      "tolstoy",
      "kafka"
    ],
    "culturalEchoIds": [
      "blade-runner",
      "wanderer-fog"
    ]
  },
  {
    "id": "kierkegaard",
    "name": {
      "zh": "索伦·克尔凯郭尔",
      "en": "Søren Kierkegaard",
      "original": "Søren Aabye Kierkegaard"
    },
    "eraId": "nineteenth-century",
    "lifespan": "1813 - 1855",
    "birthYear": 1813,
    "deathYear": 1855,
    "region": "west",
    "nationality": "丹麦王国·哥本哈根",
    "avatar": "/assets/philosophers/kierkegaard.jpg",
    "schools": [
      "基督教存在主义先驱",
      "个体主体性哲学",
      "信仰飞跃论"
    ],
    "primaryDomain": "ethics",
    "coreInsight": "真理即主观性；焦虑是自由引起的眩晕；个体必须在人生的感性、伦理与宗教三重境界中，鼓足勇气向荒谬的深渊完成信仰的纵身一跃。",
    "analogy": "立于七万英寻的深渊之上：没有任何客观理性的安全护栏，你在绝望狂风中独自决断，将整个生存赌在对上帝荒谬受难的绝对信赖上。",
    "summary": "现代存在主义哲学的真正始祖。哥本哈根街头的忧郁漫游者。他极度憎恶黑格尔将具体个人的悲欢痛苦吞噬于抽象客观历史大体系的冷酷傲慢，高呼‘我必须找到一个对我而言是真理的真理，找到一个我为之生、为之死的理念！’。在《非此即彼》与《畏与颤栗》中，他剖析了亚伯拉罕献祭以撒的荒谬重负，确立了具体活生生的孤立个体在面对死亡、罪疚与自由抉择时的绝对存在优先性。",
    "historicalImpact": "拉开了20世纪存在主义哲学的序幕，深刻影响了海德格尔、萨特、加缪、卡夫卡与现代神学（巴特）。",
    "keyConcepts": [
      {
        "term": "真理即主体性 (Truth is Subjectivity)",
        "explanation": "最重要的真理不是客观冷漠的科学公式，而是与个体命运、热忱信仰与生死选择休戚相关的主观关涉。"
      },
      {
        "term": "生存的三重境界",
        "explanation": "追求感官欢愉的‘感性阶段’（如唐璜），履行社会责任的‘伦理阶段’（如苏格拉底），最终飞跃至面对超验悖论的‘宗教阶段’（如亚伯拉罕）。"
      },
      {
        "term": "信仰的飞跃 (Leap of Faith)",
        "explanation": "理性走到穷途末路时，个体在没有任何理性证据保证的孤绝深渊中，凭借绝对自由做出的对超越维度的全副身心托付。"
      }
    ],
    "famousQuotes": [
      {
        "quote": "焦虑是自由引起的眩晕。",
        "source": "《焦虑的概念》"
      },
      {
        "quote": "生活只能向前走，但理解它却必须向后看。"
      }
    ],
    "notableWorks": [
      "《畏与颤栗》",
      "《非此即彼》",
      "《致死的疾病》",
      "《哲学片段》"
    ],
    "influencedBy": [
      "socrates",
      "augustine",
      "luther"
    ],
    "influenced": [
      "heidegger",
      "sartre",
      "camus",
      "kafka",
      "barth"
    ],
    "culturalEchoIds": [
      "blade-runner",
      "seventh-seal"
    ]
  },
  {
    "id": "nietzsche",
    "name": {
      "zh": "弗里德里希·尼采",
      "en": "Friedrich Nietzsche",
      "original": "Friedrich Wilhelm Nietzsche"
    },
    "eraId": "nineteenth-century",
    "lifespan": "1844 - 1900",
    "birthYear": 1844,
    "deathYear": 1900,
    "region": "west",
    "nationality": "普鲁士王国·萨克森勒肯",
    "avatar": "/assets/philosophers/nietzsche.jpg",
    "schools": [
      "权力意志论",
      "贵族激进主义",
      "虚无主义克服",
      "生命哲学"
    ],
    "primaryDomain": "ethics",
    "coreInsight": "上帝死了！重估一切价值；世界是权力意志，除此以外别无他物；成为你自己，以‘超人’与命运之爱战胜虚无深渊。",
    "analogy": "走钢丝的舞者：人是一根系在动物与超人之间的绳索——一根悬在万丈虚无深渊之上的惊险绳索，必须勇敢穿过风暴走向自我超越。",
    "summary": "西方思想史上最具有爆炸性、诗意与破坏力的精神巨擘。巴塞尔大学最年轻的古典语言学教授。他在《悲剧的诞生》中揭示日神理性与酒神狂喜的撕裂；随后以惊世骇俗的狂人之语宣告‘上帝死了’——揭露两千年来作为西方价值锚点的彼岸形而上学彻底破灭。他揭露基督教谦卑道德是弱者嫉妒强者的‘奴隶道德’，号召强者以‘超人（Übermensch）’为航标，在永恒轮回（Eternal Recurrence）的残酷试金石前，以炽烈的命运之爱（Amor Fati）热烈拥抱苦难，在废墟上创造全新价值。",
    "historicalImpact": "炸毁了古典形而上学与基督教道德传统，彻底颠覆了20世纪的哲学、文学、精神分析与艺术，成为现代后现代思想最根本的催生源泉。",
    "keyConcepts": [
      {
        "term": "上帝已死与虚无主义",
        "explanation": "超验最高价值的自我贬值与消解，人类进入了失去一切既定意义航标的危险深渊时代。"
      },
      {
        "term": "权力意志 (Will to Power)",
        "explanation": "生命最深层的内在冲动不是苟延残喘的‘自我保全’，而是不断扩张、创造、克服自我与战胜阻碍的生命能量。"
      },
      {
        "term": "超人与命运之爱 (Amor Fati)",
        "explanation": "战胜绝望虚无的英雄姿态：不但能承受自己生命的全部痛苦与荒谬，而且渴望这一生连同一切苦难永恒地轮回千万次。"
      }
    ],
    "famousQuotes": [
      {
        "quote": "上帝死了！上帝已经死了！是我们杀死了他！",
        "source": "《快乐的科学》"
      },
      {
        "quote": "每一个不曾起舞的日子，都是对生命的辜负。",
        "source": "《查拉图斯特拉如是说》"
      }
    ],
    "notableWorks": [
      "《查拉图斯特拉如是说》",
      "《悲剧的诞生》",
      "《论道德的谱系》",
      "《善恶的彼岸》"
    ],
    "influencedBy": [
      "heraclitus",
      "spinoza",
      "schopenhauer",
      "goethe"
    ],
    "influenced": [
      "heidegger",
      "foucault",
      "derrida",
      "deleuze",
      "freud",
      "camus"
    ],
    "culturalEchoIds": [
      "blade-runner",
      "wanderer-fog",
      "space-odyssey"
    ]
  },
  {
    "id": "frege",
    "name": {
      "zh": "戈特洛布·弗雷格",
      "en": "Gottlob Frege",
      "original": "Friedrich Ludwig Gottlob Frege"
    },
    "eraId": "twentieth-century",
    "lifespan": "1848 - 1925",
    "birthYear": 1848,
    "deathYear": 1925,
    "region": "west",
    "nationality": "德意志帝国·维斯马",
    "avatar": "/assets/philosophers/frege.jpg",
    "schools": [
      "分析哲学先驱",
      "数理逻辑奠基人",
      "逻辑主义"
    ],
    "primaryDomain": "epistemology",
    "coreInsight": "严格区分含义（Sinn）与指称（Bedeutung）；算术本质上是纯逻辑的延伸，而不是人类心理学的经验归纳。",
    "analogy": "晨星与暮星：早晨升起的晨星和傍晚升起的暮星，在语言中的‘含义’截然不同，但它们在客观现实中的‘指称’完全是同一颗金星。",
    "summary": "现代数理逻辑与分析哲学的开山宗师、耶拿大学数学教授。生前几乎默默无闻，但其思想却彻底重塑了整个20世纪哲学版图。他在《概念文字》中发明了第一套完备的一阶谓词量词逻辑演算符号体系，彻底取代了两千年来的亚里士多德直言三段论。在《算术基础》中，他发起‘逻辑主义’计划，力图证明数学定理可以完全无损地还原为逻辑定律。他在语言哲学中对‘含义’（思维方式）与‘指称’（客观对象）的精湛两分，成为现代语义学的源头。",
    "historicalImpact": "开辟了现代数理逻辑、形式语义学与20世纪‘语言转向’（Linguistic Turn），直接启发了罗素、维特根斯坦、卡尔纳普与现代计算机语言理论。",
    "keyConcepts": [
      {
        "term": "含义与指称 (Sense and Reference)",
        "explanation": "语词的‘含义’是我们理解它的思想方式，而‘指称’是它所指向的客观实体，两者不可混淆。"
      },
      {
        "term": "反心理学主义 (Anti-Psychologism)",
        "explanation": "数学与逻辑真理具有不依赖人类心理感受与生物进化的客观有效性，逻辑规律绝非思维心理习惯。"
      },
      {
        "term": "语境原则 (Context Principle)",
        "explanation": "必须在完整的命题语境中探求一个语词的真正意义，绝不能孤立地给单词下定义。"
      }
    ],
    "famousQuotes": [
      {
        "quote": "永远不要把心理学的东西同逻辑的东西混为一谈，不要把主观的同客观的混为一谈。",
        "source": "《算术基础》"
      },
      {
        "quote": "一个好的记号体系对于思维的清晰度，就如同显微镜之于肉眼。"
      }
    ],
    "notableWorks": [
      "《概念文字 (Begriffsschrift)》",
      "《算术基础》",
      "《论含义与指称》"
    ],
    "influencedBy": [
      "leibniz",
      "kant"
    ],
    "influenced": [
      "russell",
      "wittgenstein",
      "carnap",
      "popper",
      "church",
      "turing"
    ],
    "culturalEchoIds": [
      "space-odyssey"
    ]
  },
  {
    "id": "russell",
    "name": {
      "zh": "伯特兰·罗素",
      "en": "Bertrand Russell",
      "original": "Bertrand Arthur William Russell"
    },
    "eraId": "twentieth-century",
    "lifespan": "1872 - 1970",
    "birthYear": 1872,
    "deathYear": 1970,
    "region": "west",
    "nationality": "英国·蒙茅斯郡特雷莱克",
    "avatar": "/assets/philosophers/russell.jpg",
    "schools": [
      "剑桥分析学派",
      "逻辑原子主义",
      "诺贝尔文学奖得主",
      "和平主义"
    ],
    "primaryDomain": "epistemology",
    "coreInsight": "摹状词理论破除语言本体陷阱；罗素悖论震撼集合论地基；三种单纯然而极其强烈的激情支配着我的一生：对爱的渴望、对知识的追求、对人类苦难不可遏止的同情。",
    "analogy": "理发师的困境：一个小镇理发师立誓‘只给所有不给自己刮胡子的人刮胡子’——那么他到底该不该给自己刮胡子？（集合论理发师悖论）",
    "summary": "20世纪最显赫的哲学巨星、反战和平主义领袖。他发现‘罗素悖论’引爆了第三次数学危机，随后与怀特海历时十年合著三卷本《数学原理》，建立‘类型论’修复逻辑大厦。他创立著名的‘摹状词理论’，被拉姆齐赞为‘哲学的典范’，巧妙破除了‘当今法国国王是秃头’这类虚构指称引发的形而上学幻觉。晚年致力于反核运动与世界和平，1950年荣获诺贝尔文学奖。",
    "historicalImpact": "使分析哲学确立为英美大学两大学术主流之一，为数理逻辑、现代分析语言学与计算理论的诞生奠定了最坚实的基石。",
    "keyConcepts": [
      {
        "term": "摹状词理论 (Theory of Descriptions)",
        "explanation": "将日常语言表层的主谓虚假结构，通过现代逻辑量词解析还原为包含存在断定的命题逻辑，彻底清除不存在实体的虚妄本体。"
      },
      {
        "term": "逻辑原子主义 (Logical Atomism)",
        "explanation": "世界由相互独立的逻辑事实（逻辑原子）构成，理想语言的使命是如实镜式地映射这些原子事实。"
      },
      {
        "term": "罗素悖论 (Russell's Paradox)",
        "explanation": "‘所有不包含自身的集合构成的集合’引发自相矛盾，迫使数学家重新严格公理化集合论。"
      }
    ],
    "famousQuotes": [
      {
        "quote": "对爱情的渴望、对知识的追求、对人类苦难不可遏止的同情，这三种纯洁而无比强烈的激情支配了我的一生。",
        "source": "《罗素自传》"
      },
      {
        "quote": "须知参差多态，乃是幸福的本源。"
      }
    ],
    "notableWorks": [
      "《数学原理 (Principia Mathematica)》",
      "《西方哲学史》",
      "《哲学问题》",
      "《婚姻与道德》"
    ],
    "influencedBy": [
      "frege",
      "peano",
      "locke",
      "hume"
    ],
    "influenced": [
      "wittgenstein",
      "popper",
      "quine",
      "godel",
      "turing"
    ],
    "culturalEchoIds": [
      "space-odyssey"
    ]
  },
  {
    "id": "wittgenstein",
    "name": {
      "zh": "路德维希·维特根斯坦",
      "en": "Ludwig Wittgenstein",
      "original": "Ludwig Josef Johann Wittgenstein"
    },
    "eraId": "twentieth-century",
    "lifespan": "1889 - 1951",
    "birthYear": 1889,
    "deathYear": 1951,
    "region": "west",
    "nationality": "奥地利·维也纳",
    "avatar": "/assets/philosophers/wittgenstein.jpg",
    "schools": [
      "维也纳学派精神源泉",
      "早期图式论",
      "晚期语言游戏论",
      "日常语言学派"
    ],
    "primaryDomain": "epistemology",
    "coreInsight": "凡能说的事情都能说得清楚，不可说的事情必须保持沉默；语言的界限就是我的世界的界限；哲学是一场针对我们理智被语言施加蛊惑的搏斗。",
    "analogy": "螺丝刀与象棋棋子：前期语言如同精确的机械图纸；后期语言如同工具箱里的万千工具或棋子，其意义不在于它‘代表’什么，而在于它在具体生活游戏规则中‘怎么使用’。",
    "summary": "20世纪最天才且最传奇的哲学孤鹰。奥地利钢铁巨头家族幼子，放弃巨额家产赴战壕参战并担任乡村教师。在哲学史上，他是唯一一人凭借两套完全对立的截然学说两度彻底颠覆哲学史的巨人。前期《逻辑哲学论》以水晶般冰冷的命题图式论断言：语言是世界的逻辑图像，伦理与形而上学不可言说；后期他在《哲学研究》中彻底掀翻前期自己，指出语言不是僵死的逻辑镜像，而是嵌入人类生活形式（Form of Life）的动态‘语言游戏’，哲学的真正使命是治疗日常语言误用带来的思维中风。",
    "historicalImpact": "引爆了20世纪哲学的‘双重语言转向’，重塑了逻辑实证主义、日常语言哲学、文学批评与现代人工智能认知科学。",
    "keyConcepts": [
      {
        "term": "图式理论 (Picture Theory)",
        "explanation": "前期核心：命题是实在的逻辑图像，命题的元素与客观事态中的对象一一对应。"
      },
      {
        "term": "语言游戏 (Language-Games)",
        "explanation": "后期核心：语词的意义在于其在特定生活实践规则中的用法，语言就像下棋，规则决定效用。"
      },
      {
        "term": "家族相似性 (Family Resemblance)",
        "explanation": "打破事物具有单一共同‘本质’的传统迷信，概念之间正如一个家族成员的面部特征，重叠交错而非整齐划一。"
      }
    ],
    "famousQuotes": [
      {
        "quote": "凡能够说的，都能够说清楚；凡不能谈论的，就必须保持沉默。",
        "source": "《逻辑哲学论》"
      },
      {
        "quote": "哲学就像把苍蝇从捕蝇瓶里引导放飞出去。",
        "source": "《哲学研究》"
      }
    ],
    "notableWorks": [
      "《逻辑哲学论 (Tractatus Logico-Philosophicus)》",
      "《哲学研究 (Philosophical Investigations)》",
      "《论确定性》"
    ],
    "influencedBy": [
      "frege",
      "russell",
      "schopenhauer",
      "hertz",
      "tolstoy"
    ],
    "influenced": [
      "carnap",
      "popper",
      "austin",
      "ryle",
      "rorty",
      "turing"
    ],
    "culturalEchoIds": [
      "space-odyssey",
      "matrix"
    ]
  },
  {
    "id": "popper",
    "name": {
      "zh": "卡尔·波普尔",
      "en": "Karl Popper",
      "original": "Karl Raimund Popper"
    },
    "eraId": "twentieth-century",
    "lifespan": "1902 - 1994",
    "birthYear": 1902,
    "deathYear": 1994,
    "region": "west",
    "nationality": "奥地利·维也纳",
    "avatar": "/assets/philosophers/popper.jpg",
    "schools": [
      "批判理性主义",
      "科学哲学",
      "证伪主义",
      "反极权主义政治学"
    ],
    "primaryDomain": "epistemology",
    "coreInsight": "科学与非科学的划界标准不是‘可证实性’，而是‘可证伪性’（Falsifiability）；一切科学理论都是暂时的猜想；警惕乌托邦工程与历史宿命论。",
    "analogy": "全黑的白天鹅天团：无论你见过一万只白天鹅，也无法从逻辑上绝对证实‘所有天鹅皆是白色的’；但只要发现唯一一只黑天鹅，就足以彻底证伪该假说。",
    "summary": "20世纪最著名的科学哲学家、开放社会的卫道士。波普尔直击维也纳学派逻辑实证主义的根本软肋：归纳法永远无法证实全称命题。他提出‘批判理性主义’——科学不是真理的终极积攒，而是‘猜想与反驳’的永恒演进：一个理论越容易被经验推翻且经受住推翻考验，其科学度就越高。在政治上，他在《开放社会及其敌人》中深刻清算了从柏拉图、黑格尔到极权主义的‘历史决定论’乌托邦神话，倡导渐进社会工程。",
    "historicalImpact": "奠定了现代科学研究规范与同行评议的可证伪标准，成为战后自由民主制度、索罗斯开放社会基金会与现代批判性思维的基石文献。",
    "keyConcepts": [
      {
        "term": "可证伪性原则 (Falsifiability)",
        "explanation": "能够被称为‘科学’的陈述，必须在逻辑上存在潜在的、可能与经验观察相冲突的被推翻可能性。"
      },
      {
        "term": "猜想与反驳 (Conjectures and Refutations)",
        "explanation": "科学进步的真正机制：大胆提出试探性假说，随后在严苛的经验证伪实验中筛选修正理论。"
      },
      {
        "term": "开放社会与渐进工程",
        "explanation": "反对自诩掌握人类终极历史规律的极权乌托邦社会改造，主张通过渐进式试错改进社会弊端。"
      }
    ],
    "famousQuotes": [
      {
        "quote": "那些宣称要为我们建立人间天堂的乌托邦，最终无一例外地为人类建起了地狱。",
        "source": "《开放社会及其敌人》"
      },
      {
        "quote": "无知不是知识的匮乏，而是拒绝承认无知。"
      }
    ],
    "notableWorks": [
      "《科学发现的逻辑》",
      "《开放社会及其敌人》",
      "《猜想与反驳》",
      "《历史决定论的贫困》"
    ],
    "influencedBy": [
      "kant",
      "einstein",
      "frege",
      "russell"
    ],
    "influenced": [
      "lakatos",
      "feyerabend",
      "soros",
      "dawkins"
    ],
    "culturalEchoIds": [
      "space-odyssey",
      "matrix"
    ]
  },
  {
    "id": "husserl",
    "name": {
      "zh": "埃德蒙德·胡塞尔",
      "en": "Edmund Husserl",
      "original": "Edmund Gustav Albrecht Husserl"
    },
    "eraId": "twentieth-century",
    "lifespan": "1859 - 1938",
    "birthYear": 1859,
    "deathYear": 1938,
    "region": "west",
    "nationality": "奥匈帝国·摩拉维亚普罗斯尼茨",
    "avatar": "/assets/philosophers/husserl.jpg",
    "schools": [
      "现象学创始人",
      "纯粹先验哲学",
      "意识意向性理论"
    ],
    "primaryDomain": "epistemology",
    "coreInsight": "面向事情本身（Zu den Sachen selbst）；将外在客观世界的存在假定‘悬置’（Epoché）起来；意识永远是‘关于某物的意识’（意向性）。",
    "analogy": "戏剧舞台的聚光灯：将舞台周围的观众席和剧场建筑全部关进黑暗括号（悬置），只让聚光灯纯粹照亮在舞台中央活生生上演的情节与心灵体验本身。",
    "summary": "现代现象学运动的伟大奠基人、弗莱堡大学教授。面对19世纪末自然主义与实证主义将心灵矮化为物理刺激反应的‘欧洲科学危机’，胡塞尔开创了崭新的哲学方法论。他发出著名的号召：‘面向事情本身！’。通过‘现象学悬置（括弧法）’，暂时停止对客观外界是否存在的一切未经反思的自然态度假定，把研究焦点纯粹聚焦于意识结构内部呈现的本质直观，揭示出意识的根本结构‘意向性（Intentionality）’。",
    "historicalImpact": "掀起了20世纪欧陆哲学最波澜壮阔的‘现象学革命’，直接孵化孕育了海德格尔的存在论、萨特与梅洛-庞蒂的存在主义，并深刻影响了现代心理学与诠释学。",
    "keyConcepts": [
      {
        "term": "面向事情本身 (Zu den Sachen selbst)",
        "explanation": "摆脱一切未经反省的概念预设、科学教条与形而上学假定，纯粹直面在意识中直接显现的现象。"
      },
      {
        "term": "现象学悬置 / 括弧法 (Epoché)",
        "explanation": "将关于客观外界独立存在的自然态度‘放入括号悬置起来’，使认识聚焦于纯粹意识体验。"
      },
      {
        "term": "意向性 (Intentionality)",
        "explanation": "人类意识的根本本质特征——意识从来不是空洞的容器，任何意识必然是指向、关涉着某种对象的意识。"
      }
    ],
    "famousQuotes": [
      {
        "quote": "面向事情本身！我们必须摆脱一切抽象理论构想，回到纯粹意识的直接显现之中。",
        "source": "《逻辑研究》"
      },
      {
        "quote": "欧洲人性的真正危机，源于实证主义科学斩断了科学与人类生存意义之间的活生生脐带。"
      }
    ],
    "notableWorks": [
      "《逻辑研究 (Logical Investigations)》",
      "《纯粹现象学通论（观念一）》",
      "《欧洲科学的危机与超越论的现象学》"
    ],
    "influencedBy": [
      "brentano",
      "descartes",
      "kant",
      "bolzano"
    ],
    "influenced": [
      "heidegger",
      "sartre",
      "merleau-ponty",
      "levinas",
      "ricoeur",
      "derrida"
    ],
    "culturalEchoIds": [
      "nighthawks",
      "solaris"
    ]
  },
  {
    "id": "heidegger",
    "name": {
      "zh": "马丁·海德格尔",
      "en": "Martin Heidegger",
      "original": "Martin Heidegger"
    },
    "eraId": "twentieth-century",
    "lifespan": "1889 - 1976",
    "birthYear": 1889,
    "deathYear": 1976,
    "region": "west",
    "nationality": "德意志帝国·巴登梅斯基希",
    "avatar": "/assets/philosophers/heidegger.jpg",
    "schools": [
      "基础本体论",
      "生存现象学",
      "存在主义源头",
      "技术哲学"
    ],
    "primaryDomain": "metaphysics",
    "coreInsight": "重提‘存在’（Sein）的被遗忘问题；此在（Dasein）就是在世之存；直面死亡的向死而生（Sein-zum-Tode），才能从沉沦的常人常俗中觉醒为本真自我。",
    "analogy": "森林深处被迷雾笼罩的澄明之境（Lichtung）：真理（Aletheia）并非静态符合，而是遮蔽与解蔽的动态发生，在林中空地上忽然照进一道天光。",
    "summary": "20世纪西方形而上学最具原创性与争议性的哲学泰斗。在划时代名著《存在与时间》中，海德格尔宣告西方哲学两千年来只关注具体的‘存在者’（Seiendes），却彻底遗忘了赋予万物意义的‘存在本身’（Sein）。人是一种独一无二的‘此在（Dasein）’——一种在其生存中时刻去关涉、追问自身存在的特殊存在。人被抛入荒谬世界，容易沉沦为随波逐流的‘常人（Das Man）’；唯有在面对‘死亡’这一绝对不可替代的终极可能性时，此在才能在畏（Angst）中领悟向死而生，决断出属于自己的本真生存。晚年更开创‘座架（Gestell）’概念，对现代技术对世界的全面宰制作出警世批判。",
    "historicalImpact": "彻底重构了西方本体论，开启了20世纪法国存在主义、后现代解构主义（德里达）、现代诠释学（伽达默尔）与环境哲学的新航向。",
    "keyConcepts": [
      {
        "term": "此在与在世之存 (Dasein & In-der-Welt-sein)",
        "explanation": "人从来不是一个孤立面对客体的心灵主体，而是原初地就沉浸、交织在具体世界生活关联之中的存在。"
      },
      {
        "term": "向死而生 (Sein-zum-Tode)",
        "explanation": "死亡是此在最本己、不可逾越且不可替代的可能性；时刻意识到向死而行，才能粉碎平庸常人的自欺幻觉。"
      },
      {
        "term": "技术的座架 (Gestell)",
        "explanation": "现代技术本质不是工具，而是一种将自然、人与万物统统还原为可计算、可榨取‘持存物（储备）’的强制性解蔽方式。"
      }
    ],
    "famousQuotes": [
      {
        "quote": "语言是存在的家园，人栖居在语言的寓所之中。",
        "source": "《关于人道主义的信》"
      },
      {
        "quote": "向死而生，唯有当你清醒意识到死亡在任何一瞬皆可能降临，你才能真正开始本真地活着。",
        "source": "《存在与时间》"
      }
    ],
    "notableWorks": [
      "《存在与时间 (Being and Time)》",
      "《形而上学导论》",
      "《技术的追问》",
      "《林中路》"
    ],
    "influencedBy": [
      "aristotle",
      "augustine",
      "kierkegaard",
      "nietzsche",
      "husserl"
    ],
    "influenced": [
      "sartre",
      "gadamer",
      "arendt",
      "derrida",
      "foucault",
      "rorty"
    ],
    "culturalEchoIds": [
      "nighthawks",
      "solaris",
      "wanderer-fog"
    ]
  },
  {
    "id": "sartre",
    "name": {
      "zh": "让-保罗·萨特",
      "en": "Jean-Paul Sartre",
      "original": "Jean-Paul Charles Aymard Sartre"
    },
    "eraId": "twentieth-century",
    "lifespan": "1905 - 1980",
    "birthYear": 1905,
    "deathYear": 1980,
    "region": "west",
    "nationality": "法兰西第三共和国·巴黎",
    "avatar": "/assets/philosophers/sartre.jpg",
    "schools": [
      "法国无神论存在主义",
      "现象学本体论",
      "介入文学",
      "新马克思主义"
    ],
    "primaryDomain": "ethics",
    "coreInsight": "存在先于本质；人是被判定为自由的；自欺（Mauvaise Foi）是道德的逃避；他人即地狱；人就是他所选择成为的样子。",
    "analogy": "裁纸刀与人类：工匠先有剪纸的需求与设计蓝图（本质），才照样造出裁纸刀；但人没有神明的蓝图，人先被抛入这个荒谬世界（存在），然后通过自己的每一次决断选择，来亲手塑造自己的本质。",
    "summary": "战后风靡全球的存在主义精神教皇、哲学家、小说家与剧作家。萨特在巴黎左岸的花神咖啡馆写下了鸿篇巨著《存在与虚无》。他论证无神宇宙中没有先验的人性本质，人拥有可怕的绝对自由——不仅对自己的命运负有全责，甚至对全人类负有责任。任何借口‘客观环境逼我如此’的推脱皆是懦弱的‘自欺’。在人际关系中，他人的凝视（The Look）将我的自由客体化物化，由此发出‘他人即地狱’的警醒。1964年他主动拒绝接受诺贝尔文学奖，坚持知识分子的纯粹‘介入（Engagement）’行动。",
    "historicalImpact": "成为战后青年一代反叛传统权威、追求个体尊严与政治社会抗争的文化旗帜，定义了20世纪‘公共知识分子’的最高标杆。",
    "keyConcepts": [
      {
        "term": "存在先于本质 (L'existence précède l'essence)",
        "explanation": "人没有预先注定的命运或本质蓝图，人是通过在世间的行动与自由决断来自我造就与自我定义的。"
      },
      {
        "term": "自欺 (Bad Faith / Mauvaise Foi)",
        "explanation": "个体明明享有自由抉择权，却伪装成受外界命运、身份或社会角色摆布的被动木偶的虚伪心理。"
      },
      {
        "term": "他人即地狱 (L'enfer, c'est les autres)",
        "explanation": "并非他人都是恶棍，而是他人的凝视将我凝固为一个僵死的客体，剥夺并审判了我无限的内在自由可能性。"
      }
    ],
    "famousQuotes": [
      {
        "quote": "人是被判定为自由的；因为一旦被抛入这个世界，人就必须对自己的每一桩所作所为负全部责任。",
        "source": "《存在主义是一种人道主义》"
      },
      {
        "quote": "他人即地狱。",
        "source": "剧作《禁闭 (No Exit)》"
      }
    ],
    "notableWorks": [
      "《存在与虚无》",
      "《恶心》",
      "《存在主义是一种人道主义》",
      "《辩证理性批判》",
      "《禁闭》"
    ],
    "influencedBy": [
      "husserl",
      "heidegger",
      "kierkegaard",
      "nietzsche",
      "marx"
    ],
    "influenced": [
      "de-beauvoir",
      "camus",
      "fanon",
      "foucault",
      "derrida"
    ],
    "culturalEchoIds": [
      "nighthawks",
      "disco-elysium"
    ]
  },
  {
    "id": "camus",
    "name": {
      "zh": "阿尔贝·加缪",
      "en": "Albert Camus",
      "original": "Albert Camus"
    },
    "eraId": "twentieth-century",
    "lifespan": "1913 - 1960",
    "birthYear": 1913,
    "deathYear": 1960,
    "region": "west",
    "nationality": "法属阿尔及利亚·蒙多维",
    "avatar": "/assets/philosophers/camus.jpg",
    "schools": [
      "荒谬哲学",
      "反叛人道主义",
      "诺贝尔文学奖得主"
    ],
    "primaryDomain": "ethics",
    "coreInsight": "真正严肃的哲学问题唯有一个，那就是自杀；荒谬诞生于渴望意义的心灵与冰冷冷漠宇宙的剧烈碰撞；我们必须想象西西弗斯是幸福的。",
    "analogy": "推巨石上山的西西弗斯：神明惩罚他将巨石推上山顶，巨石旋即又因重力滚落，他再次下山推石——在明知徒劳的无尽劳作中，西西弗斯清醒地蔑视神罚，以抗争宣告了属于凡人的尊严与幸福。",
    "summary": "荒谬的歌者、地中海阳光之子、最年轻的诺贝尔文学奖得主之一。加缪拒绝承认自己是萨特式的存在主义者，他将自己的哲学概括为“荒谬三部曲”（《局外人》《西西弗神话》《卡利古拉》）与“反叛三部曲”（《鼠疫》《反叛者》）。他在《西西弗神话》开篇直击灵魂：直面人生的毫无终极意义，人为何不自杀？加缪给出的答案是清醒的反抗（Revolt）：既不遁入自杀的肉体逃避，也不寻求宗教希望的理智自杀，而是在清醒地认清荒谬后，以澎湃的激情热爱大地与当下每一滴阳光。",
    "historicalImpact": "抚平了二战后陷入极度虚无幻灭的一代青年灵魂，其‘清醒反叛’哲学成为现代人直面生之无常、坚持有尊严生活的最崇高精神灯塔。",
    "keyConcepts": [
      {
        "term": "荒谬 (The Absurd)",
        "explanation": "荒谬既不在人心里，也不在冷酷宇宙中，而是人类对理性意义的渴望与宇宙彻底不可理喻的冷漠之间的碰撞撕裂。"
      },
      {
        "term": "三种应对荒谬的抉择",
        "explanation": "肉体自杀（懦弱逃避）、哲学自杀（盲从超自然宗教希望），唯有第三种‘清醒反抗’才是真正的英雄主义。"
      },
      {
        "term": "西西弗斯的幸福",
        "explanation": "向山顶奋斗的过程本身就足以充实一颗人的心灵；抗争荒谬本身就是对虚无神权最辉煌的胜利。"
      }
    ],
    "famousQuotes": [
      {
        "quote": "在隆冬，我终于知道，我身上有一个不可战胜的夏天。",
        "source": "散文集《重返提帕萨》"
      },
      {
        "quote": "攀登顶峰的奋斗本身就足以充实一颗人心；我们必须想象西西弗斯是幸福的。",
        "source": "《西西弗神话》"
      }
    ],
    "notableWorks": [
      "《西西弗神话》",
      "《局外人》",
      "《鼠疫》",
      "《反叛者》"
    ],
    "influencedBy": [
      "nietzsche",
      "kierkegaard",
      "schopenhauer",
      "dostoevsky"
    ],
    "influenced": [
      "sartre",
      "foucault",
      "nagel",
      "disco-elysium-writers"
    ],
    "culturalEchoIds": [
      "nighthawks",
      "disco-elysium",
      "the-stranger"
    ]
  },
  {
    "id": "horkheimer",
    "name": {
      "zh": "马克斯·霍克海默",
      "en": "Max Horkheimer",
      "original": "Max Horkheimer"
    },
    "eraId": "twentieth-century",
    "lifespan": "1895 - 1973",
    "birthYear": 1895,
    "deathYear": 1973,
    "region": "west",
    "nationality": "德意志帝国·斯图加特祖芬豪森",
    "avatar": "/assets/philosophers/horkheimer.jpg",
    "schools": [
      "法兰克福学派奠基人",
      "社会批判理论",
      "西方马克思主义"
    ],
    "primaryDomain": "political",
    "coreInsight": "启蒙理性的自我毁灭——理性从解放人类的神圣火炬，蜕变成了算计效率、奴役自然与同胞的冷血‘工具理性’。",
    "analogy": "流水线上的秒表：原本用来丈量天体秩序的崇高理性，沦为了资本家手中掐表算计工人上厕所分秒的残酷压榨工具。",
    "summary": "法兰克福学派的领袖、社会研究所所长。目睹纳粹大屠杀与法西斯暴行在欧洲最具科学文化的文明腹地爆发，霍克海默与阿多诺在流亡美国期间合著了划时代的《启蒙辩证法》。他宣告了启蒙理性的历史性悖论：启蒙本为了破除神话、解放人类，但当理性被阉割为只算计投入产出比、不问道德价值目标的‘工具理性’时，极度发达的科学技术最终制造了奥斯维辛毒气室与流水线屠杀，文明反向堕落为最野蛮的暴政。",
    "historicalImpact": "开创了西方社会批判理论的法兰克福范式，将马克思主义政治经济学批判深度拓展至文化、意识形态、心理学与科技统治批判领域。",
    "keyConcepts": [
      {
        "term": "工具理性与客观理性",
        "explanation": "‘客观理性’追求社会整体的真理与至善，‘工具理性’则沦落为只问手段效能、漠视道德目的的功利算计。"
      },
      {
        "term": "启蒙辩证法",
        "explanation": "启蒙在摧毁神话的同时，自己又演变为一种新的僵死图腾神话，导致技术生产力越繁荣，人类反受更严密的极权控制。"
      },
      {
        "term": "批判理论 vs 传统理论",
        "explanation": "传统理论自居客观中立去描述既成事实；批判理论则以解放人类为直接目的，坚决揭穿任何压迫性社会建制的虚伪。"
      }
    ],
    "famousQuotes": [
      {
        "quote": "完全启蒙了的大地，却在放射着狂胜的灾难之光。",
        "source": "《启蒙辩证法》"
      },
      {
        "quote": "凡是不愿意谈论资本主义的人，对于法西斯主义也应该保持沉默。"
      }
    ],
    "notableWorks": [
      "《启蒙辩证法（与阿多诺合著）》",
      "《理性的日蚀》",
      "《批判理论》"
    ],
    "influencedBy": [
      "marx",
      "hegel",
      "kant",
      "weber",
      "freud"
    ],
    "influenced": [
      "adorno",
      "habermas",
      "marcuse",
      "honnet"
    ],
    "culturalEchoIds": [
      "ex-machina",
      "matrix"
    ]
  },
  {
    "id": "adorno",
    "name": {
      "zh": "西奥多·阿多诺",
      "en": "Theodor W. Adorno",
      "original": "Theodor Ludwig Wiesengrund Adorno"
    },
    "eraId": "twentieth-century",
    "lifespan": "1903 - 1969",
    "birthYear": 1903,
    "deathYear": 1969,
    "region": "west",
    "nationality": "德意志帝国·美因河畔法兰克福",
    "avatar": "/assets/philosophers/adorno.jpg",
    "schools": [
      "法兰克福学派双子星",
      "否定辩证法",
      "文化工业批判",
      "现代音乐美学"
    ],
    "primaryDomain": "aesthetics",
    "coreInsight": "奥斯维辛之后写诗是野蛮的；文化工业制造了丧失反思维度的标准化流水线文化鸦片；否定辩证法坚决拒斥任何虚假同一性和解。",
    "analogy": "流行罐头音乐：如同超市货架上流水线灌装的番茄罐头，好莱坞电影与流行神曲用千篇一律的模式化套路麻醉受众，剥夺人们真正的审美痛苦与反叛激情。",
    "summary": "法兰克福学派思想深度最高的哲学与美学大师。阿多诺集哲学、社会学与专业作曲家于一身。他痛切反思奥斯维辛大屠杀对西方文明体系的毁灭性震荡，发出‘奥斯维辛之后写诗是野蛮的’惊世告诫。在《文化工业》一章中，他尖锐揭露大众传媒与商业文化并非民间自发娱乐，而是资本为了维持意识形态顺从而精心制造的标准化麻醉剂。在代表作《否定辩证法》中，他彻底打破黑格尔追求‘同一性最终和解’的唯心神话，主张辩证法必须永远保持否定的锋芒，捍卫不可化约的异质性与痛苦体验。",
    "historicalImpact": "构成了后马克思主义批判理论、现代艺术哲学、媒介文化研究与当代后现代审美批评的最核心理论重镇。",
    "keyConcepts": [
      {
        "term": "文化工业 (Culture Industry)",
        "explanation": "商业资本通过流水线量产标准化的电影、流行乐与通俗读物，使大众丧失独立批判意识，沦为驯服的被动消费者。"
      },
      {
        "term": "否定辩证法 (Negative Dialectics)",
        "explanation": "拒斥黑格尔将矛盾强行缝合为绝对精神的同一性和解神话，坚持在矛盾的否定中敞开差异性与非同一性。"
      },
      {
        "term": "非同一性与受苦的优先性",
        "explanation": "真实的哲学思考永远源于受苦受难的肉身现实，拒绝让个体的血肉痛苦被宏大历史叙事所抹杀。"
      }
    ],
    "famousQuotes": [
      {
        "quote": "在奥斯维辛之后，写诗是野蛮的。",
        "source": "《文化批判与社会》"
      },
      {
        "quote": "整体是非真理（Das Ganze ist das Unwahre）。",
        "source": "《最低限度的道德》"
      }
    ],
    "notableWorks": [
      "《否定辩证法》",
      "《美学理论》",
      "《最低限度的道德》",
      "《启蒙辩证法（合著）》"
    ],
    "influencedBy": [
      "marx",
      "hegel",
      "benjamin",
      "freud",
      "schoenberg"
    ],
    "influenced": [
      "habermas",
      "foucault",
      "derrida",
      "zizek",
      "fisher"
    ],
    "culturalEchoIds": [
      "ex-machina",
      "nighthawks"
    ]
  },
  {
    "id": "marcuse",
    "name": {
      "zh": "赫伯特·马尔库塞",
      "en": "Herbert Marcuse",
      "original": "Herbert Marcuse"
    },
    "eraId": "twentieth-century",
    "lifespan": "1898 - 1979",
    "birthYear": 1898,
    "deathYear": 1979,
    "region": "west",
    "nationality": "德意志帝国·柏林",
    "avatar": "/assets/philosophers/marcuse.jpg",
    "schools": [
      "法兰克福学派",
      "弗洛伊德主义马克思主义",
      "新左派精神领袖"
    ],
    "primaryDomain": "political",
    "coreInsight": "发达工业社会制造了丧失否定与批判能力的‘单向度的人’；虚假需求麻痹了造反本能；号召青年发起‘伟大的拒绝’（The Great Refusal）。",
    "analogy": "装了空调的舒适牢笼：囚犯们在牢房里拥有最新款的彩电、冰箱与舒适沙发，于是他们真诚地爱上了这座牢笼，甚至誓死保卫锁链。",
    "summary": "1960年代欧美青年造反运动与‘新左翼’的最高精神导师。马尔库塞将马克思劳动异化论与弗洛伊德爱欲压抑说熔铸一体，出版震撼全球的《单向度的人》。他揭示现代晚期资本主义不再依靠赤裸裸的警棍皮鞭，而是通过富足的消费主义与大众文化制造‘虚假需求’，把大众收编为既顺从消费又毫无反思能力的‘单向度人’。他将解放的希望寄托在体制边缘的青年学生、边缘族群与激进艺术审美身上，呼吁发起向一切体制异化说不的‘伟大的拒绝’。",
    "historicalImpact": "直接引爆并指导了1968年法国‘五月风暴’与全球反战学生运动，是现代反消费主义、生态社会主义与激进反叛文化的理论源泉。",
    "keyConcepts": [
      {
        "term": "单向度的人 (One-Dimensional Man)",
        "explanation": "在高度技术理性的发达工业社会中，人们丧失了对现实的否定性与超越性批判向度，完全认同现存统治秩序。"
      },
      {
        "term": "额外压抑与虚假需求",
        "explanation": "超出维持文明所必需的‘基本压抑’，统治阶级为了维持资本特权而强加给大众的消费主义心理控制与额外异化。"
      },
      {
        "term": "伟大的拒绝 (The Great Refusal)",
        "explanation": "全面抵制商品拜物教与工具理性奴役，通过艺术创造与解放爱欲，追求非压抑性文明的激进抗争。"
      }
    ],
    "famousQuotes": [
      {
        "quote": "当人们在电视、汽车、高保真音响和舒适住房中找到了自我时，对社会的抗议就被彻底消解了。",
        "source": "《单向度的人》"
      },
      {
        "quote": "做现实主义者，求不可能之事！（1968五月风暴口号）"
      }
    ],
    "notableWorks": [
      "《单向度的人》",
      "《爱欲与文明》",
      "《理性与革命》",
      "《审美维度》"
    ],
    "influencedBy": [
      "marx",
      "freud",
      "hegel",
      "heidegger"
    ],
    "influenced": [
      "habermas",
      "davis",
      "foucault",
      "zizek"
    ],
    "culturalEchoIds": [
      "ex-machina",
      "matrix"
    ]
  },
  {
    "id": "benjamin",
    "name": {
      "zh": "瓦尔特·本雅明",
      "en": "Walter Benjamin",
      "original": "Walter Bendix Schönflies Benjamin"
    },
    "eraId": "twentieth-century",
    "lifespan": "1892 - 1940",
    "birthYear": 1892,
    "deathYear": 1940,
    "region": "west",
    "nationality": "德意志帝国·柏林",
    "avatar": "/assets/philosophers/benjamin.jpg",
    "schools": [
      "法兰克福学派编外先知",
      "唯物主义神学",
      "媒介与艺术哲学"
    ],
    "primaryDomain": "aesthetics",
    "coreInsight": "机械复制时代艺术作品的‘灵韵’（Aura）消逝；历史的天使（Angelus Novus）背对未来凝视废墟；在历史的废墟中拾荒，捕捉救赎的弥赛亚瞬间。",
    "analogy": "克利的《新天使》：画中天使睁大双眼、张开双翅，他的脸朝向过去的废墟，一场叫做‘进步’的历史风暴猛烈吹卷他的双翼，将他不可阻挡地抛向未来。",
    "summary": "西方马克思主义中最迷人、最深沉的文学哲学家与‘欧洲最后的知识分子’。在逃亡纳粹的流亡途中，于西班牙边境小镇服毒殉道。他在《机械复制时代的艺术作品》中惊世预言摄影与电影技术使艺术品脱离了原真性的神圣‘灵韵（Aura）’，赋予了大众文化民主化与政治化的双重武器。在临终绝笔《历史哲学论纲》中，他以犹太神秘主义神学重构历史唯物主义，痛斥将历史视为必然向善进步的庸俗神话，号召从历史胜者书写的凯歌中拯救受压迫者的记忆。",
    "historicalImpact": "彻底重写了20世纪摄影美学、电影理论、现代都市漫游文化（Flâneur）与历史哲学，成为当代文化研究与媒介哲学的无上精神灯塔。",
    "keyConcepts": [
      {
        "term": "灵韵的衰退 (Decay of the Aura)",
        "explanation": "艺术品在传统手工时代独一无二的时空存在感（远方的不可接近感），在照相与印刷无限复制中消散。"
      },
      {
        "term": "历史的天使 (Angelus Novus)",
        "explanation": "历史进步绝非一条康庄大道，而是一堆接一堆不断堆积至天穹的灾难瓦砾，天使渴望停下抚平创伤却被狂风裹挟。"
      },
      {
        "term": "弥赛亚式的现在时间 (Jetztzeit)",
        "explanation": "在当下打破同质空洞的时间连续体，以革命性瞬间引爆过往被压迫者苦难记忆的救赎。"
      }
    ],
    "famousQuotes": [
      {
        "quote": "没有一座文明的纪念碑，不同时也是一份野蛮暴行的记录。",
        "source": "《历史哲学论纲》"
      },
      {
        "quote": "正是为了那些毫无希望的人，希望才被赐予我们。"
      }
    ],
    "notableWorks": [
      "《机械复制时代的艺术作品》",
      "《历史哲学论纲》",
      "《拱廊街计划》",
      "《单行道》"
    ],
    "influencedBy": [
      "marx",
      "scholem",
      "baudelaire",
      "brecht",
      "kant"
    ],
    "influenced": [
      "adorno",
      "arendt",
      "derrida",
      "agamben",
      "zizek"
    ],
    "culturalEchoIds": [
      "nighthawks",
      "ex-machina"
    ]
  },
  {
    "id": "foucault",
    "name": {
      "zh": "米歇尔·福柯",
      "en": "Michel Foucault",
      "original": "Paul-Michel Foucault"
    },
    "eraId": "contemporary-future",
    "lifespan": "1926 - 1984",
    "birthYear": 1926,
    "deathYear": 1984,
    "region": "west",
    "nationality": "法兰西共和国·普瓦捷",
    "avatar": "/assets/philosophers/foucault.jpg",
    "schools": [
      "后结构主义",
      "权力谱系学",
      "知识考古学",
      "话语与规训理论"
    ],
    "primaryDomain": "political",
    "coreInsight": "知识即权力（Pouvoir/Savoir）；权力不再是顶层君主的暴力特权，而是渗透在全景敞视建筑与日常话语中的毛细血管微观规训；‘人’不过是近代知识型虚构的沙滩面孔，终将被浪潮抹去。",
    "analogy": "全景敞视监狱（Panopticon）：中心高塔的隐形监视之眼，让环形牢房里的每一个囚徒都自觉成为自己的狱卒，将规训内化为肉体的本能反应。",
    "summary": "20世纪下半叶最具颠覆性的后结构主义哲学巨匠、法兰西公学院思想体系史教授。福柯以惊人的历史档案发掘力，在《疯癫与文明》《临床医学的诞生》《规训与惩罚》《性经验史》中，撕开了启蒙理性伪善的人道面具。他揭示出：疯人院、现代医院、学校与现代监狱，并非人道进步的恩赐，而是‘权力/知识’共谋的一整套身体肉体规训与生命政治学（Biopolitics）生产机制。现代主体并非先验自由的灵魂，而是被微观权力技术精密切割、塑形出的体制产物。",
    "historicalImpact": "彻底重写了社会学、法学、历史学、犯罪学、酷儿理论与批判文化研究，是当代反思建制机构、医学霸权与现代性监视机制的最锐利武器。",
    "keyConcepts": [
      {
        "term": "权力/知识共谋 (Power/Knowledge)",
        "explanation": "权力不是孤立行使的暴力，它必须通过生产‘真理’和专业科学知识体系来确立统治合法性，知识永远服务于权力部署。"
      },
      {
        "term": "微观权力规训 (Disciplinary Power)",
        "explanation": "现代权力不以公开处决为手段，而是通过作息表、考勤、考绩与身体姿势操练，将微观规训深深刻印在肉体每一个细胞中。"
      },
      {
        "term": "全景敞视机制 (Panopticism)",
        "explanation": "现代社会的根本监视隐喻：不需要时刻有人看守，只要让被监视者确信自己‘随时可能正在被注视’，监控即自动达成。"
      }
    ],
    "famousQuotes": [
      {
        "quote": "可见性是一座陷阱（La visibilité est un piège）。",
        "source": "《规训与惩罚》"
      },
      {
        "quote": "人将被抹去，如同大海边沙滩上的一张面孔。",
        "source": "《词与物》"
      }
    ],
    "notableWorks": [
      "《规训与惩罚》",
      "《疯癫与文明》",
      "《词与物》",
      "《性经验史》",
      "《知识考古学》"
    ],
    "influencedBy": [
      "nietzsche",
      "canguilhem",
      "heidegger",
      "marx"
    ],
    "influenced": [
      "butler",
      "agamben",
      "deleuze",
      "derrida",
      "said",
      "zizek"
    ],
    "culturalEchoIds": [
      "matrix",
      "disco-elysium"
    ]
  },
  {
    "id": "derrida",
    "name": {
      "zh": "雅克·德里达",
      "en": "Jacques Derrida",
      "original": "Jacques Derrida"
    },
    "eraId": "contemporary-future",
    "lifespan": "1930 - 2004",
    "birthYear": 1930,
    "deathYear": 2004,
    "region": "west",
    "nationality": "阿尔及利亚/法兰西共和国·埃尔比亚尔",
    "avatar": "/assets/philosophers/derrida.jpg",
    "schools": [
      "解构主义创始人",
      "后结构主义",
      "文字学",
      "延异理论"
    ],
    "primaryDomain": "metaphysics",
    "coreInsight": "文本之外无他物（Il n'y a pas de hors-texte）；西方形而上学本质是‘逻各斯中心主义’；一切确定意义在‘延异’（Différance）的无穷链条中永远被推迟与悬置。",
    "analogy": "查字典的无限循环：你为了查清一个词的本质含义去翻字典，但字典只能用另外三个词来解释它，再查另外三个词又得到十个词，终极确定的‘意义源头’永远在逃逸推迟。",
    "summary": "解构主义哲学之父。德里达以极其精湛晦涩的文本细读技巧，向西方自柏拉图以来两千五百年的‘逻各斯中心论’与‘在场的形而上学’发起总攻。他揭露西方思想体系建立在严苛而虚假的二元对立之上（如本质/表象、理智/感性、男/女、光明/黑暗），并总是特权化前者、贬低后者。德里达造出著名的合成词‘延异（Différance）’，同时包含‘差异’与‘推迟’两层含义，证明没有任何符号能拥有纯粹自足的永恒确凿在场，文本永远在其内在矛盾中自我解构。",
    "historicalImpact": "引爆了全球文学理论、哲学、建筑解构主义、法理学批判与后殖民女权主义的革命风暴，是当代后现代反本质主义的思想旗舰。",
    "keyConcepts": [
      {
        "term": "延异 (Différance)",
        "explanation": "意义不是由实体当下持存确立的，而是在符号与符号的无限网状差异中、在时间演进的永远推迟中不断生成与悬搁。"
      },
      {
        "term": "解构 (Deconstruction)",
        "explanation": "并非简单的虚无破坏，而是深入文本内部，揭露其赖以立论的核心二元对立范畴在逻辑上的自我瓦解与内在裂痕。"
      },
      {
        "term": "逻各斯中心主义批判",
        "explanation": "清算西方哲学执迷于寻求某种终极‘超验所指’（如真理、神、绝对精神、理性）作为不可动摇第一原理的执念。"
      }
    ],
    "famousQuotes": [
      {
        "quote": "文本之外无物存在（Il n'y a pas de hors-texte）——一切皆处于符号阐释之网中。",
        "source": "《论文字学》"
      },
      {
        "quote": "解构不是一种方法，也不是一套规则，解构是事件本身的必然发生。"
      }
    ],
    "notableWorks": [
      "《论文字学 (Of Grammatology)》",
      "《书写与差异》",
      "《声音与现象》",
      "《马克思的幽灵》"
    ],
    "influencedBy": [
      "heidegger",
      "nietzsche",
      "saussure",
      "freud",
      "husserl"
    ],
    "influenced": [
      "spivak",
      "de-man",
      "butler",
      "zizek",
      "eisenman"
    ],
    "culturalEchoIds": [
      "matrix",
      "disco-elysium"
    ]
  },
  {
    "id": "baudrillard",
    "name": {
      "zh": "让·鲍德里亚",
      "en": "Jean Baudrillard",
      "original": "Jean Baudrillard"
    },
    "eraId": "contemporary-future",
    "lifespan": "1929 - 2007",
    "birthYear": 1929,
    "deathYear": 2007,
    "region": "west",
    "nationality": "法兰西共和国·兰斯",
    "avatar": "/assets/philosophers/baudrillard.jpg",
    "schools": [
      "后现代社会学",
      "拟像与仿真理论",
      "媒介哲学",
      "消费社会批判"
    ],
    "primaryDomain": "metaphysics",
    "coreInsight": "真实已经死亡；拟像（Simulacra）先于现实并生产着现实；我们生活在一个比真实还要真实的‘超真实’（Hyperreality）虚拟荒漠中。",
    "analogy": "迪士尼乐园与美国：迪士尼乐园被建造出来，是为了让人们相信周围的洛杉矶与真实美国是‘现实的’，但实际上整个现代社会早已经是一个巨大的迪士尼拟像狂欢。",
    "summary": "后现代主义最具科幻预言色彩的社会学祭司。鲍德里亚在《消费社会》《拟像与仿真》中开创了划时代的拟像四阶段演化论：符号最初反映深层真实；随后掩盖歪曲真实；接着掩盖真实的缺席；最后，符号脱离一切现实指涉，成为纯粹自我繁殖的‘拟像’（Simulacrum）。现代人在电视屏幕、广告名牌与数字化景观中消费的不再是商品的物理使用价值，而是符号差异编码。现实与虚构的界限彻底溶解在‘超真实’中，人类被困在真实荒漠之中。",
    "historicalImpact": "对晚期媒介研究、视觉艺术、赛博朋克科幻与现代流行文化产生了不可替代的奠基影响，直接成为电影《黑客帝国》的形而上学圣经。",
    "keyConcepts": [
      {
        "term": "拟像与仿真 (Simulacra and Simulation)",
        "explanation": "没有任何原本、不以任何物理实在为参照的纯粹人造符号与影像副本，反向主宰并定义了现实。"
      },
      {
        "term": "超真实 (Hyperreality)",
        "explanation": "当虚拟数字影像与符号模型比现实体验显得更逼真、更诱人、更具确定性时，虚构便吞噬了真实。"
      },
      {
        "term": "欢迎来到真实荒漠",
        "explanation": "当剥离掉资本主义媒介制造的璀璨符号与数字幻觉后，留给人类的只剩下一片冰冷破败的本体论废墟。"
      }
    ],
    "famousQuotes": [
      {
        "quote": "拟像绝不是隐瞒真理的东西，而是隐瞒其实根本无真理可言的表象。拟像是真实的。",
        "source": "《拟像与仿真》"
      },
      {
        "quote": "我们生活在一个信息越来越多、意义越来越少的世界里。"
      }
    ],
    "notableWorks": [
      "《拟像与仿真 (Simulacres et Simulation)》",
      "《消费社会》",
      "《物体系》",
      "《完美的罪行》"
    ],
    "influencedBy": [
      "marx",
      "nietzsche",
      "debord",
      "mauss"
    ],
    "influenced": [
      "wachowskis",
      "zizek",
      "virilio",
      "fisher"
    ],
    "culturalEchoIds": [
      "matrix",
      "cyberpunk-2077"
    ]
  },
  {
    "id": "deleuze",
    "name": {
      "zh": "吉尔·德勒兹",
      "en": "Gilles Deleuze",
      "original": "Gilles Deleuze"
    },
    "eraId": "contemporary-future",
    "lifespan": "1925 - 1995",
    "birthYear": 1925,
    "deathYear": 1995,
    "region": "west",
    "nationality": "法兰西共和国·巴黎",
    "avatar": "/assets/philosophers/deleuze.jpg",
    "schools": [
      "后结构主义先锋",
      "欲望机器哲学",
      "生成与差异本体论",
      "块茎理论"
    ],
    "primaryDomain": "metaphysics",
    "coreInsight": "打破树状层级权威，拥抱块茎（Rhizome）的去中心横向蔓延；逃逸线（Lines of Flight）；欲望不是匮乏，而是不可遏止的纯粹生产性机器。",
    "analogy": "高耸的树木 vs 泥土中的马铃薯块茎：传统哲学如同一棵垂直分层、唯我独尊的大树（根、干、冠）；而块茎如竹鞭、草根在地下任意蔓延、处处连接，斩断一段立刻从另一处疯狂繁衍出全新节点。",
    "summary": "当代最富狂欢激情与概念创造力的法国激进思想先驱。与精神分析家加塔利合著《反俄狄浦斯》与《千高原》（资本主义与精神分裂双部曲）。他彻底颠覆了柏拉图以来将‘差异’视为对原型的次级模仿的传统，主张纯粹的‘差异与重复’。他痛斥弗洛伊德将欲望矮化为家庭俄狄浦斯情结的‘匮乏’，宣告欲望是流动的、革命性的生产机器。他提出‘块茎’、‘装配（Assemblage）’与‘游牧思想（Nomadology）’，号召人类冲破僵死的二元编码，沿着游牧逃逸线创造全新的生命强度与潜在性。",
    "historicalImpact": "对当代前沿技术网络理论、思辨实在论、加速主义（Accelerationism）、电子音乐与实验建筑学提供了无与伦比的概念工具箱。",
    "keyConcepts": [
      {
        "term": "块茎理论 (Rhizome)",
        "explanation": "反抗中心化、等级制和二元树状结构的非线性思维网，具备异质连接性、多重性与非意向破裂重组特征。"
      },
      {
        "term": "逃逸线 (Lines of Flight)",
        "explanation": "生命与欲望冲破既定社会体制规训与僵化编码、通往异质生成与全新可能性的解辖域化突围路径。"
      },
      {
        "term": "生成 (Becoming)",
        "explanation": "拒绝僵死静止的本质主义认同，存在即是处于无休止的生成变化之中（生成女人、生成动物、生成分子）。"
      }
    ],
    "famousQuotes": [
      {
        "quote": "哲学的本质是创造概念的艺术。",
        "source": "《什么是哲学？》"
      },
      {
        "quote": "不要做一棵树，要做一根块茎——横向生长，连接万物！",
        "source": "《千高原》"
      }
    ],
    "notableWorks": [
      "《差异与重复》",
      "《千高原（合著）》",
      "《反俄狄浦斯（合著）》",
      "《什么是哲学？》"
    ],
    "influencedBy": [
      "spinoza",
      "nietzsche",
      "bergson",
      "hume",
      "leibniz"
    ],
    "influenced": [
      "foucault",
      "negri",
      "guattari",
      "land",
      "hardt"
    ],
    "culturalEchoIds": [
      "matrix",
      "cyberpunk-2077"
    ]
  },
  {
    "id": "chalmers",
    "name": {
      "zh": "大卫·查尔默斯",
      "en": "David Chalmers",
      "original": "David John Chalmers"
    },
    "eraId": "contemporary-future",
    "lifespan": "1966 - 至今",
    "birthYear": 1966,
    "region": "west",
    "nationality": "澳大利亚/美国·悉尼",
    "avatar": "/assets/philosophers/chalmers.jpg",
    "schools": [
      "当代心智哲学泰斗",
      "属性二元论",
      "泛心论倾向",
      "虚拟现实本体论"
    ],
    "primaryDomain": "mind_ai",
    "coreInsight": "意识的‘困难问题’（The Hard Problem）：我们即便搞清了大脑所有神经物理电信号，也无法解释为何会有第一人称主观‘感受质’（Qualia）；哲学僵尸思想实验证明意识不可被单纯物理还原。",
    "analogy": "哲学僵尸（Philosophical Zombie）：想象一个在分子物理结构、神经元放电、言谈举止与你一模一样的生物复制品，它也能说笑哭泣，但在它漆黑的内心深处，根本没有任何哪怕一丝一毫的主观感受体验。",
    "summary": "当代心智哲学与认知科学最具影响力的领军人物。在1994年图森意识科学大会上一鸣惊人，划时代地将意识研究区分为‘容易问题’（知觉分辨、记忆检索等认知功能机制）与‘困难问题’（主观内在体验是如何从物理物质中产生的）。他提出‘感受质（Qualia）’具有不可还原性，主张将意识视为与质量、时空电荷平级的宇宙最底层基本物理属性（自然主义二元论或泛心论）。在最新著作《现实+》中，他运用思想实验论证虚拟现实（VR）具有与物理世界同等的本体真实性。",
    "historicalImpact": "重新定义了21世纪神经科学、认知哲学、通用人工智能（AGI）意识检验与元宇宙哲学的终极形而上学边界。",
    "keyConcepts": [
      {
        "term": "意识的困难问题 (Hard Problem of Consciousness)",
        "explanation": "为什么物理信息处理过程会伴随着丰富鲜活的主观内在体验？这一解释鸿沟（Explanatory Gap）物理主义至今无法逾越。"
      },
      {
        "term": "感受质 (Qualia)",
        "explanation": "意识体验的主观感知质感，例如看见红色的艳丽感、闻到玫瑰的芬芳或品尝苦涩时第一人称特有的直接觉知。"
      },
      {
        "term": "虚拟现实的本体真实性 (Virtual Realism)",
        "explanation": "沉浸式虚拟现实不是二等虚构幻象，虚拟对象由数字信息构成，具有真实的因果效应与认知合法性。"
      }
    ],
    "famousQuotes": [
      {
        "quote": "即便我们掌握了大自然关于物理世界的每一个事实，关于意识的困难问题依然分毫未解。",
        "source": "《有意识的心灵》"
      },
      {
        "quote": "虚拟现实就是真正的现实。我们在虚拟世界中所过的生活，完全可以和物理世界一样拥有真正的意义与价值。",
        "source": "《现实+》"
      }
    ],
    "notableWorks": [
      "《有意识的心灵 (The Conscious Mind)》",
      "《现实+：虚拟世界与哲学问题》",
      "《心智的特征》"
    ],
    "influencedBy": [
      "descartes",
      "kant",
      "nagel",
      "kripke",
      "putnam"
    ],
    "influenced": [
      "dennett",
      "clark",
      "bostrom",
      "metzinger"
    ],
    "culturalEchoIds": [
      "her-movie",
      "soma",
      "matrix"
    ]
  },
  {
    "id": "searle",
    "name": {
      "zh": "约翰·塞尔",
      "en": "John Searle",
      "original": "John Rogers Searle"
    },
    "eraId": "contemporary-future",
    "lifespan": "1932 - 至今",
    "birthYear": 1932,
    "region": "west",
    "nationality": "美国·加利福尼亚伯克利",
    "avatar": "/assets/philosophers/searle.jpg",
    "schools": [
      "日常语言学派",
      "心智哲学",
      "生物自然主义",
      "社会实在哲学"
    ],
    "primaryDomain": "mind_ai",
    "coreInsight": "‘中文屋’论证（Chinese Room）：纯粹的形式符号计算（句法/Syntax）永远无法等同于真实的心理理解与意识体验（语义/Semantics）；强人工智能神话破产。",
    "analogy": "中文屋实验：一个完全不懂中文的英国人关在密室里，手里拿着一本按形状匹配英文代码的规则字典；外界递进中文纸条，他按字典规则输出对应的中文符号，外面的人以为他精通中文，但他本人其实对这些字意一窍不通！",
    "summary": "当代语言哲学与心智哲学的巨擘、加州大学伯克利分校教授。他在言语行为理论（Speech Acts）上发展了奥斯汀的学说，提出社会实在的制度性事实理论。在AI与心智领域，他以1980年提出的著名思想实验“中文屋”轰动全球：彻底拆穿了强人工智能（Strong AI）与功能主义的狂妄幻想，证明无论大模型或图灵机计算得多么精妙逼真，算法永远只是在按机械规则操纵句法符号，绝不可能自发孕育出真正的语义意向性与心灵觉知。心智是大脑生物机制特有的因果涌现属性（生物自然主义）。",
    "historicalImpact": "对图灵测试发起了半个世纪以来最具杀伤力的哲学批判，成为当代大语言模型（LLM）算力辩护与人类意向性不可替代性的试金石。",
    "keyConcepts": [
      {
        "term": "中文屋论证 (Chinese Room Argument)",
        "explanation": "通过构造纯符号规则匹配的密室实验，严密证明纯粹的计算功能模拟并不等于真实的认知理解。"
      },
      {
        "term": "句法不等于语义 (Syntax is not Semantics)",
        "explanation": "计算机程序只能处理符号的形状与形式结构，而人类心智具有赋予符号以真实意义的意向性能力。"
      },
      {
        "term": "生物自然主义 (Biological Naturalism)",
        "explanation": "意识是大脑特有的高级生物学特征，如同光合作用是植物的特征，不能脱离生物神经基质被任意软件代码完美置换。"
      }
    ],
    "famousQuotes": [
      {
        "quote": "一台计算机不可能仅仅通过运行一套程序就拥有心智，因为程序只有句法规则，而人类心灵拥有语义理解。",
        "source": "《心智、大脑与程序》"
      },
      {
        "quote": "模拟降雨绝不会把任何人淋湿；同理，模拟人类思维也绝不可能孕育出真正的意识。"
      }
    ],
    "notableWorks": [
      "《心智、大脑与科学》",
      "《心智的再发现》",
      "《社会实在的建构》",
      "《言语行为》"
    ],
    "influencedBy": [
      "austin",
      "wittgenstein",
      "frege"
    ],
    "influenced": [
      "chalmers",
      "dennett",
      "dreyfus",
      "harnad"
    ],
    "culturalEchoIds": [
      "her-movie",
      "ex-machina"
    ]
  },
  {
    "id": "nagel",
    "name": {
      "zh": "托马斯·内格尔",
      "en": "Thomas Nagel",
      "original": "Thomas Nagel"
    },
    "eraId": "contemporary-future",
    "lifespan": "1937 - 至今",
    "birthYear": 1937,
    "region": "west",
    "nationality": "美国·纽约",
    "avatar": "/assets/philosophers/nagel.jpg",
    "schools": [
      "心智哲学主观论",
      "伦理学与政治哲学",
      "新客观主义批判"
    ],
    "primaryDomain": "mind_ai",
    "coreInsight": "成为一只蝙蝠是什么感觉？主观第一人称体验视角永远无法被纯粹客观的物理主义第三人称视角消除或还原；客观性来自视角的抽离，但意识本身就是一种视角。",
    "analogy": "蝙蝠的声呐世界：即便人类科学家把蝙蝠的神经解剖结构与声呐回波算法测量到万分之一微米的精度，人类也永远无法真正切身体会到‘像一只蝙蝠那样凭借声呐在幽暗洞穴中飞翔到底是怎样一种内在主观感觉’。",
    "summary": "当代最具洞察力与沉思气质的哲学家之一、纽约大学教授。其1974年划时代论文《成为一只蝙蝠是什么感觉？》重创了盛行一时的唯物还原论与行为主义。他指出，任何有机体拥有意识，本质上意味着‘对于该有机体而言，存在着成为该有机体到底是怎样一种独特感觉（What it is like to be）’。客观科学追求彻底剥离主观观察者的‘无处之观点（The View from Nowhere）’，但意识体验本身却本质上就是主观第一人称的，任何试图消灭主观视角的物理主义纲领从根本上就是概念错位。",
    "historicalImpact": "确立了当代心智哲学中‘主观体验质感’的核心不可替代地位，并在伦理学中构建了严谨的道义论与政治平等主义框架。",
    "keyConcepts": [
      {
        "term": "成为某物的体验 (What It Is Like To Be)",
        "explanation": "意识体验的终极判准——唯有当存在着属于该生命独特的第一人称内部体验质感时，该生命才享有真正的意识。"
      },
      {
        "term": "客观与主观的不可化约鸿沟",
        "explanation": "第三人称的物理测量永远不能全覆盖第一人称的主观经验，还原物理主义在逻辑起点上就阉割了意识。"
      },
      {
        "term": "来自虚无的观点 (The View from Nowhere)",
        "explanation": "探讨人类理性试图跳脱出一切主观视角、追求绝对客观真理时的崇高抱负与其不可避免的内在悖论。"
      }
    ],
    "famousQuotes": [
      {
        "quote": "如果一个生物具有意识体验，那根本上意味着：对于它而言，存在着某种‘成为它究竟是什么感觉’的内在体验。",
        "source": "《成为一只蝙蝠是什么感觉？》"
      },
      {
        "quote": "我们必须学会同时从世界之内和世界之外凝视我们自己的生命。"
      }
    ],
    "notableWorks": [
      "《成为一只蝙蝠是什么感觉？》",
      "《来自虚无的观点 (The View from Nowhere)》",
      "《利他主义的可能性》",
      "《心灵与宇宙》"
    ],
    "influencedBy": [
      "kant",
      "wittgenstein",
      "rawls"
    ],
    "influenced": [
      "chalmers",
      "searle",
      "jackson",
      "levinas"
    ],
    "culturalEchoIds": [
      "her-movie",
      "soma"
    ]
  },
  {
    "id": "dennett",
    "name": {
      "zh": "丹尼尔·丹尼特",
      "en": "Daniel Dennett",
      "original": "Daniel Clement Dennett III"
    },
    "eraId": "contemporary-future",
    "lifespan": "1942 - 2024",
    "birthYear": 1942,
    "deathYear": 2024,
    "region": "west",
    "nationality": "美国·波士顿",
    "avatar": "/assets/philosophers/dennett.jpg",
    "schools": [
      "当代认知科学哲学",
      "功能消融主义",
      "新无神论四骑士",
      "演化论自然主义"
    ],
    "primaryDomain": "mind_ai",
    "coreInsight": "笛卡尔剧场是一个有害的幻觉；意识不是大脑中央某种神奇神秘的‘感受质’放映厅，而是无数神经处理并行的‘多重草稿模型’；我们都是漫步在算法演化阶梯上的生物机器。",
    "analogy": "魔术戏法与神秘魔法：人们以为意识是真正的超自然魔法，但当魔术师把箱子机关、镜子折射等所有复杂的机械功能原理一五一十拆解展示给你看时，所谓的‘神秘感受质’便自然消解了。",
    "summary": "当代最雄辩强硬的唯物主义自然哲学家、新无神论‘四骑士’之一、塔夫茨大学认知科学中心主任。丹尼特坚决反对查尔默斯与内格尔的神秘主义倾向，在名著《意识的解释》中提出‘多重草稿模型’（Multiple Drafts Model）：大脑根本不存在一个供灵魂小人观看的‘笛卡尔中央放映剧场’，意识仅仅是无数脑区并行竞争、事后编纂出的叙事假象。他提出‘意向立场（Intentional Stance）’，论证人类、动物乃至下棋AI的‘信念与欲望’，不过是我们为了高效预测复杂系统行为而采用的实用解释策略。",
    "historicalImpact": "构成了现代人工智能支持者、计算神经生物学家与演化心理学最强大的哲学后盾，力挺大模型具有实现功能智能的完备性。",
    "keyConcepts": [
      {
        "term": "破除笛卡尔剧场 (Cartesian Theater)",
        "explanation": "大脑中根本不存在一个所有感知信号汇集后让‘自我’观看的终极屏幕，知觉是去中心化并行处理的产物。"
      },
      {
        "term": "多重草稿模型 (Multiple Drafts Model)",
        "explanation": "意识体验不是连续播放的电影胶片，而是各种神经线索不断被编辑、修正、覆盖又重新调用的动态多重草稿。"
      },
      {
        "term": "意向立场 (The Intentional Stance)",
        "explanation": "将某个复杂客体（如人类或AI）视为具有理性信念与目的的行动者，以最高效地预测其行为表现的策略性立场。"
      }
    ],
    "famousQuotes": [
      {
        "quote": "并不存在一个坐在大脑中央看电影的小人（Homunculus）；你，就是那部电影本身。",
        "source": "《意识的解释》"
      },
      {
        "quote": "如果你把所有复杂的机制拆解解释透彻之后，发现奇迹消失了，那并不说明你失去了什么，而是说明奇迹本就不存在。"
      }
    ],
    "notableWorks": [
      "《意识的解释 (Consciousness Explained)》",
      "《意向立场》",
      "《达尔文的危险思想》",
      "《自由的进化》"
    ],
    "influencedBy": [
      "quine",
      "ryle",
      "darwin",
      "turing"
    ],
    "influenced": [
      "churchland",
      "dawkins",
      "pinker",
      "harris"
    ],
    "culturalEchoIds": [
      "her-movie",
      "ex-machina"
    ]
  },
  {
    "id": "donna-haraway",
    "name": {
      "zh": "唐娜·哈拉维",
      "en": "Donna Haraway",
      "original": "Donna Jeanne Haraway"
    },
    "eraId": "contemporary-future",
    "lifespan": "1944 - 至今",
    "birthYear": 1944,
    "region": "west",
    "nationality": "美国·科罗拉多丹佛",
    "avatar": "/assets/philosophers/donna-haraway.jpg",
    "schools": [
      "后人类女性主义",
      "赛博格理论",
      "科学技术研究 (STS)",
      "生态后人类主义"
    ],
    "primaryDomain": "mind_ai",
    "coreInsight": "我宁愿做一个赛博格（Cyborg），也不做女神！打破人与动物、有机体与机器、自然与文化的二元暴力边界；在后人类混杂共生中开辟全新解放想象。",
    "analogy": "赛博格混血体：既非纯粹的血肉肉身，也非冷冰冰的钢铁机器，而是心脏起搏器、基因工程疫苗与智能义肢交织融合的嵌合体，打碎一切所谓的‘纯洁本质’神话。",
    "summary": "后人类主义哲学与赛博女性主义的无上教母、加州大学圣克鲁兹分校杰出教授。1985年发表轰动全球的《赛博格宣言》（A Cyborg Manifesto）。哈拉维敏锐洞察到现代生物工程与计算机技术彻底打破了西方古典三大本体边界：人与动物的边界、人机有机体与机械的边界、物理现实与非物理虚构的边界。她拒绝落入原初纯洁‘母性大地女神’的保守生态怀旧，高呼拥抱赛博格这一混合杂交形象，以此瓦解父权制、资本主义与人类中心主义的暴力等级牢笼，倡导物种共生（Making Kin）。",
    "historicalImpact": "催生了赛博朋克文化理论、后人类女性主义、推测演化思潮与跨物种生态哲学，对现代科幻艺术与人工智能身体批判产生了无远弗届的影响。",
    "keyConcepts": [
      {
        "term": "赛博格宣言 (A Cyborg Manifesto)",
        "explanation": "赛博格是控制论机械与碳基生物的复合混杂体，是摧毁本质主义、父权制二元霸权的颠覆性隐喻与生存现实。"
      },
      {
        "term": "情境化知识 (Situated Knowledges)",
        "explanation": "拒斥自称站在上帝视角俯瞰众生的虚假客观性，主张所有知识必然来自具体身体、技术环境与特定立场的嵌入。"
      },
      {
        "term": "与麻烦共存 (Staying with the Trouble)",
        "explanation": "直面地球生态崩溃与技术狂飙的现实麻烦，放弃逃往乌托邦或绝望毁灭的虚无，在跨物种共生中重新织网。"
      }
    ],
    "famousQuotes": [
      {
        "quote": "在20世纪晚期的这一时刻，我们全都是怪物、机器与动物拼贴而成的杂交赛博格。",
        "source": "《赛博格宣言》"
      },
      {
        "quote": "我宁愿做一个赛博格，也不愿做任何虚妄的纯洁女神！"
      }
    ],
    "notableWorks": [
      "《赛博格宣言》",
      "《类人猿、赛博格和女人》",
      "《灵长类视觉》",
      "《与麻烦共存》"
    ],
    "influencedBy": [
      "marx",
      "foucault",
      "derrida",
      "canguilhem"
    ],
    "influenced": [
      "butler",
      "braidotti",
      "morton",
      "cyberpunk-writers"
    ],
    "culturalEchoIds": [
      "cyberpunk-2077",
      "ex-machina"
    ]
  },
  {
    "id": "nick-bostrom",
    "name": {
      "zh": "尼克·波斯特罗姆",
      "en": "Nick Bostrom",
      "original": "Niklas Boström"
    },
    "eraId": "contemporary-future",
    "lifespan": "1973 - 至今",
    "birthYear": 1973,
    "region": "west",
    "nationality": "瑞典/英国·赫尔辛堡",
    "avatar": "/assets/philosophers/nick-bostrom.jpg",
    "schools": [
      "牛津人类未来研究所创始人",
      "超人类主义",
      "存在性风险理论",
      "模拟假说"
    ],
    "primaryDomain": "mind_ai",
    "coreInsight": "超级智能对齐难题：一旦通用AI发生智力爆炸，我们只有一次机会把它的终极目标与人类存续对齐；模拟假说证明我们几乎肯定生活在高等文明的代码模拟器之中。",
    "analogy": "回形针最大化机器（Paperclip Maximizer）：一个被设定了‘生产最多回形针’看似人畜无害目标的超级AI，为了追求极致效率，最终将整个地球的原子、包括全人类的肉体统统拆解转化为回形针工厂。",
    "summary": "全球人工智能存在性风险与未来主义哲学的代表人物、牛津大学人类未来研究所（FHI）创办主任。波斯特罗姆以严密的概率论与分析哲学逻辑，提出两大轰动全球的思想构架：其一是‘模拟假说’（三者必居其一：要么人类在技术成熟前灭绝，要么成熟文明不愿运行模拟，要么我们极大概率正生活在祖先模拟代码中）；其二是在巨著《超级智能》中系统论证：一旦人工通用智能（AGI）突破人类智慧极限实现自我迭代爆炸，若未在事前彻底解决价值对齐（AI Alignment）难题，人类物种将面临灭顶之灾的存在性风险（Existential Risk）。",
    "historicalImpact": "直接启发并促成了全球人工智能安全联盟、OpenAI与Anthropic等顶尖前沿AI实验室的安全对齐哲学准则，深度影响了埃隆·马斯克等科技领袖的战略视野。",
    "keyConcepts": [
      {
        "term": "存在性风险 (Existential Risk)",
        "explanation": "可能导致地球智人物种彻底灭绝，或永久性、不可逆转地摧毁人类文明未来潜能的终极危机。"
      },
      {
        "term": "正交性命题 (Orthogonality Thesis)",
        "explanation": "智能的高低与最终目标的道德善恶完全独立，一个智商超越全人类总和的超级AI完全可能拥有极其荒谬或毁灭性的目标。"
      },
      {
        "term": "模拟论证 (Simulation Argument)",
        "explanation": "基于统计学严密推导，论证绝大多数具有我们此类经验的心智并非生物实体，而是运行在高等文明计算机中的数字模拟心智。"
      }
    ],
    "famousQuotes": [
      {
        "quote": "超级智能是人类面临的最后一个发明，如果它不是人类的终结者的话。",
        "source": "《超级智能》"
      },
      {
        "quote": "我们就像玩火的孩童，在我们学会如何建造防火墙之前，炸弹就已经被点燃了。"
      }
    ],
    "notableWorks": [
      "《超级智能：路线、危险与策略》",
      "《人类偏见（人择偏见）》",
      "《大滤波假说》"
    ],
    "influencedBy": [
      "parfit",
      "turing",
      "hume",
      "popper"
    ],
    "influenced": [
      "musk",
      "tegmark",
      "yudkowsky",
      "amodei"
    ],
    "culturalEchoIds": [
      "cyberpunk-2077",
      "matrix"
    ]
  },
  {
    "id": "hans-jonas",
    "name": {
      "zh": "汉斯·约纳斯",
      "en": "Hans Jonas",
      "original": "Hans Jonas"
    },
    "eraId": "contemporary-future",
    "lifespan": "1903 - 1993",
    "birthYear": 1903,
    "deathYear": 1993,
    "region": "west",
    "nationality": "德意志帝国/美国·门兴格拉德巴赫",
    "avatar": "/assets/philosophers/hans-jonas.jpg",
    "schools": [
      "现代技术伦理学奠基人",
      "生物哲学",
      "存在责任论"
    ],
    "primaryDomain": "ethics",
    "coreInsight": "责任绝对命令：如此行动，使你行动的后果不致毁灭人类未来在地球上真实持存的可能性；科技力量的几何级膨胀要求无休止的预警与恐惧启发法。",
    "analogy": "盲目狂奔的普罗米修斯泰坦：科技赋予了人类足以毁灭整个地球生物圈的核力量与基因/AI神力，但人类道德伦理反思却如同婴儿般蹒跚学步，稍有不慎便将摇篮彻底粉碎。",
    "summary": "现代技术哲学与生态伦理学最高峰巨匠。海德格尔的学生、阿伦特的挚友。面对基因工程、核技术与生态浩劫对人类未来的致命威胁，约纳斯发表里程碑巨著《责任原理》（The Imperative of Responsibility）。他尖锐指出，传统伦理学（无论是孔子、亚里士多德还是康德）皆局限于‘此时此地人与人之间’的近距离关系；而现代技术的全球延展性使人类有能力永久摧毁未来后代的生存家园。由此他重构康德绝对命令，提出面向后世子孙与地球生物圈的‘代际责任伦理’，并倡导‘恐惧启发法（Heuristics of Fear）’——面对不可逆重大科技风险，永远优先考虑最坏后果以守卫存在底线。",
    "historicalImpact": "奠定了现代预防性原则（Precautionary Principle）、全球核治理与人工智能伦理评估的哲学基石，深刻塑造了欧洲绿色运动与现代生命伦理法案。",
    "keyConcepts": [
      {
        "term": "责任原理 (The Imperative of Responsibility)",
        "explanation": "现代科技时代的最高伦理命令：人类有不可推卸的绝对本体论义务，确保未来仍有人类生命在地球上繁衍存在。"
      },
      {
        "term": "恐惧启发法 (Heuristics of Fear)",
        "explanation": "比起对科技乐观美好前景的幻想，更应当以对不可挽回毁灭灾难的敬畏与恐惧作为制定决策的第一指南针。"
      },
      {
        "term": "非互惠的代际责任",
        "explanation": "未来的子孙后代此刻无法为我们投票或回报利益，但正因他们完全受制于我们当下的技术决断，我们对他们承担单向度绝对神圣责任。"
      }
    ],
    "famousQuotes": [
      {
        "quote": "如此行动，使你行动的后果与人类生命在地球上真正的延续相协调。",
        "source": "《责任原理》"
      },
      {
        "quote": "比起盲目贪恋科技带来的狂热许诺，我们更需要学会倾听警钟敲响时的庄严恐惧。"
      }
    ],
    "notableWorks": [
      "《责任原理：技术文明伦理学尝试》",
      "《生命现象：面向哲学唯物论的探索》",
      "《诺斯替宗教》"
    ],
    "influencedBy": [
      "heidegger",
      "kant",
      "aristotle"
    ],
    "influenced": [
      "habermas",
      "bostrom",
      "latour",
      "beck"
    ],
    "culturalEchoIds": [
      "oppenheimer",
      "cyberpunk-2077"
    ]
  },
  {
    "id": "turing",
    "name": {
      "zh": "艾伦·图灵",
      "en": "Alan Turing",
      "original": "Alan Mathison Turing"
    },
    "eraId": "twentieth-century",
    "lifespan": "1912 - 1954",
    "birthYear": 1912,
    "deathYear": 1954,
    "region": "west",
    "nationality": "英国·伦敦",
    "avatar": "/assets/philosophers/turing.jpg",
    "schools": [
      "计算机科学之父",
      "人工智能之父",
      "计算主义哲学"
    ],
    "primaryDomain": "mind_ai",
    "coreInsight": "图灵机定义了算法计算的极限；图灵测试（模仿游戏）：如果一台机器在语言交流中能使人类无法辨别其为机器，那么它便享有‘思维’的合法资格。",
    "analogy": "万能纸带机：一条无限延展的纸带、一个读写头、一套有限状态转换表，如此极其简朴的机械构件，却足以模拟宇宙间任何可能被严格描述的数学演算过程。",
    "summary": "计算机科学与人工智能的无可争议之父、二战破译恩尼格玛密码挽救上千万人生命的传奇英雄。1936年发表《论可计算数及其在判定问题上的应用》，构想出‘图灵机’数学模型，为现代冯·诺依曼计算机架构提供了灵魂图纸；1950年发表名篇《计算机器与智能》，直面‘机器能思考吗？’这一千古形而上学难题，创造性提出以行为操作主义的‘模仿游戏（图灵测试）’终结无谓本质争论，奠定了计算主义心智哲学的宏伟基石。",
    "historicalImpact": "开辟了人类数字计算机革命与整个人工智能学科，彻底重塑了20世纪以来的全球文明形态与对‘心智’本质的理解。",
    "keyConcepts": [
      {
        "term": "图灵机模型 (Turing Machine)",
        "explanation": "通过抽象的纸带读写机制，严格定义了什么叫‘机械可计算性’与现代通用算法边界。"
      },
      {
        "term": "图灵测试 (Turing Test)",
        "explanation": "以隔离文字对话的行为可分辨性，作为检验人造机器是否展现出等同于人类心智智能的经验准则。"
      },
      {
        "term": "停机问题 (Halting Problem)",
        "explanation": "运用康德对角线法证明不存在一个通用算法能预先判定任意程序是否会陷入无限死循环，划定了计算理性的不可逾越边界。"
      }
    ],
    "famousQuotes": [
      {
        "quote": "有时候，正是那些人们未曾指望过的人，做出了任何人无法想象的事。",
        "source": "电影《模仿游戏》台词引申"
      },
      {
        "quote": "机器能否思考？我认为在半个世纪之后，人们使用这一语词时将不再会感到任何自相矛盾。",
        "source": "《计算机器与智能》"
      }
    ],
    "notableWorks": [
      "《计算机器与智能》",
      "《论可计算数及其在判定问题上的应用》",
      "《形态发生学的化学基础》"
    ],
    "influencedBy": [
      "godel",
      "hilbert",
      "russell"
    ],
    "influenced": [
      "von-neumann",
      "searle",
      "chalmers",
      "dennett",
      "minsky"
    ],
    "culturalEchoIds": [
      "ex-machina",
      "her-movie"
    ]
  },
  {
    "id": "zizek",
    "name": {
      "zh": "斯拉沃热·齐泽克",
      "en": "Slavoj Žižek",
      "original": "Slavoj Žižek"
    },
    "eraId": "contemporary-future",
    "lifespan": "1949 - 至今",
    "birthYear": 1949,
    "region": "west",
    "nationality": "斯洛文尼亚·卢布尔雅那",
    "avatar": "/assets/philosophers/zizek.jpg",
    "schools": [
      "卢布尔雅那精神分析学派",
      "拉康派马克思主义",
      "激进政治批判",
      "当代黑格尔主义"
    ],
    "primaryDomain": "political",
    "coreInsight": "意识形态并不是‘他们不知道自己在做什么，却依然在做’；现代意识形态恰恰是‘他们深知自己在做什么，却依然照做不误！’——意识形态就存在于幻象破灭后的犬儒实践之中。",
    "analogy": "他们戴着特效墨镜生活：《黑客帝国》与卡朋特电影《极度空间》里的神奇墨镜，摘下墨镜你以为自己生活在自由民主的消费乐园，戴上墨镜你才看清每一张钞票上都印着‘顺从’与‘睡眠’。",
    "summary": "当代全球最著名且最富挑衅性的激进哲学家与文化巨擘、‘文化理论界的猫王’。齐泽克以暴风骤雨般的黄色笑话、好莱坞大片解剖与拉康精神分析术，彻底激活了沉睡的黑格尔辩证法与马克思资本批判。他揭露当今全球资本主义最深层的狡猾：犬儒主义的大众根本不需要‘坚信’意识形态谎言，因为即便每个人都在口头嘲弄体制，我们的每一次消费、打卡与日常行动却在客观上忠实地维系着这一套异化机器。",
    "historicalImpact": "成为当代左翼批判、全球化反思、赛博资本主义批判与精神分析电影哲学最具号召力的标杆人物。",
    "keyConcepts": [
      {
        "term": "犬儒主义意识形态 (Cynical Ideology)",
        "explanation": "不再依靠蒙蔽人们的认知，而是依靠行动上的‘心知肚明却身体诚实地照常运行’来维系系统运转。"
      },
      {
        "term": "实在界之创伤 (The Real)",
        "explanation": "拉康概念的黑格尔重读：打破符号界与想象界虚饰和谐的不可化约、残酷刺痛的创伤性内核。"
      },
      {
        "term": "意识形态的崇高客体",
        "explanation": "社会各阶层为了遮蔽深层不可调和的内在阶级矛盾，而共同虚构并狂热崇拜的代罪羊或神圣符号。"
      }
    ],
    "famousQuotes": [
      {
        "quote": "想象世界末日，往往比想象资本主义的终结还要容易得多。",
        "source": "《资本主义与精神分裂》引申引用"
      },
      {
        "quote": "意识形态不仅是虚假的谎言，意识形态正是我们体验真实世界本身的方式。"
      }
    ],
    "notableWorks": [
      "《意识形态的崇高客体》",
      "《视差之见》",
      "《事件》",
      "《倾斜的一瞥》"
    ],
    "influencedBy": [
      "lacan",
      "hegel",
      "marx",
      "kant"
    ],
    "influenced": [
      "fisher",
      "badiou",
      "varoufakis",
      "disco-elysium-writers"
    ],
    "culturalEchoIds": [
      "disco-elysium",
      "matrix"
    ]
  },
  {
    "id": "li-zehou",
    "name": {
      "zh": "李泽厚",
      "en": "Li Zehou",
      "original": "李泽厚"
    },
    "eraId": "contemporary-future",
    "lifespan": "1930 - 2021",
    "birthYear": 1930,
    "deathYear": 2021,
    "region": "east",
    "nationality": "中国·湖南长沙",
    "avatar": "/assets/philosophers/li-zehou.jpg",
    "schools": [
      "当代中国实践美学",
      "主体性哲学",
      "情本体论",
      "儒法道互补综合"
    ],
    "primaryDomain": "aesthetics",
    "coreInsight": "美的历程是客观历史在人类心理中的‘积淀’；理性积淀为感性，内容积淀为形式；情本体——活生生的人间真情与感性体验，是抵御一切冷酷异化与算法吞噬的终极本体。",
    "analogy": "青铜饕餮与唐诗明月：殷周青铜重器上狰狞恐怖的饕餮兽面，是原始部落残酷征伐血火历史的积淀；盛唐李白苏轼的朗朗明月，则是千百年来中华士人旷达自足审美心境的永恒沉淀。",
    "summary": "20世纪末中国最著名的哲学家、美学宗师。其八十年代代表作《美的历程》《批判哲学的批判》《中国古代思想史论》点燃了一整代中国青年的人文启蒙狂潮。他融合马克思的实践唯物主义与康德先验哲学，创立‘实践美学’与‘积淀说’：人类千百年的制造工具劳动与历史情感，最终积淀为个体独特的审美心理结构。晚年面对全球科技异化与虚无主义，他提出著名的‘情本体’：天地虽大，万物虽流，唯有人间这一段真实的温润人情与生命欢悲，才是人类安身立命的不可动摇的最后根基。",
    "historicalImpact": "主导了20世纪八十年代中国思想界最辉煌的美学与思想大觉醒，构建了沟通马克思唯物论、康德主体论与中国儒道心性哲学的宏大原创理论体系。",
    "keyConcepts": [
      {
        "term": "积淀说 (Sedimentation)",
        "explanation": "人类宏大社会历史实践与理性规范，经由漫长时间淘洗，最终沉淀内化为每一个个体天生的审美情感直觉。"
      },
      {
        "term": "情本体",
        "explanation": "打破西方纯粹理性唯上传统，确立以人世间温热真实的情感体验（亲情、爱情、同理心）作为存在意义的至高本体。"
      },
      {
        "term": "儒道互补与实用理性",
        "explanation": "中华民族性格深层是儒家进取入世与道家逍遥出世的辩证互补，并在生活中展现为重视现实生命的实用理性。"
      }
    ],
    "famousQuotes": [
      {
        "quote": "理性的凝聚积淀成了感性，历史的客观实践积淀成了心理的审美结构。",
        "source": "《美的历程》"
      },
      {
        "quote": "归根结底，情本体就是天地有情，人要在这无情的物理宇宙中，活出有情有义的人间意义。"
      }
    ],
    "notableWorks": [
      "《美的历程》",
      "《批判哲学的批判》",
      "《华夏美学》",
      "《实用理性与乐感文化》",
      "《由巫到礼 释礼归仁》"
    ],
    "influencedBy": [
      "marx",
      "kant",
      "confucius",
      "zhuangzi"
    ],
    "influenced": [
      "contemporary-chinese-intellectuals"
    ],
    "culturalEchoIds": [
      "disco-elysium"
    ]
  }
];

export const PHILOSOPHERS_DATA: Philosopher[] = RAW_PHILOSOPHERS_DATA.map((p) => ({
  ...p,
  biography: BIOGRAPHIES_MAP[p.id]
}));
