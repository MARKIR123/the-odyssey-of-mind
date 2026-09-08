# -*- coding: utf-8 -*-
import json
import os

philosophers = [
  # =========================================================
  # ERA 1: 轴心文明与古典源头 (axial-age)
  # =========================================================
  {
    "id": "thales",
    "name": {"zh": "泰勒斯", "en": "Thales of Miletus", "original": "Θαλῆς ὁ Μιλήσιος"},
    "eraId": "axial-age",
    "lifespan": "BC 624 - BC 546",
    "birthYear": -624,
    "deathYear": -546,
    "region": "west",
    "nationality": "古希腊·米利都",
    "avatar": "/assets/philosophers/thales.jpg",
    "schools": ["米利都学派", "伊奥尼亚自然哲学", "唯物主义源头"],
    "primaryDomain": "metaphysics",
    "coreInsight": "水是万物之本原（Arche）；大地浮于水上，万物充满神灵（生气与自发动力）。",
    "analogy": "生命的羊水：如同世间万物皆从润泽的水汽中孕育、冷却或蒸发，万千流变背后是一体的源泉。",
    "summary": "西方哲学之父、希腊七贤之首。泰勒斯第一次彻底摆脱了荷马史诗以神祇喜怒解释宇宙的原始神话思维，尝试用一种经验可见的自然实体（水）去解释千变万化的物理现象。他还准确预言了公元前585年的日食，开创了西方几何学与天文学的理性经验观察传统。",
    "historicalImpact": "人类历史上第一次将宇宙的终极解释权从天神手中夺回，交给了客观自然的因果规律，标志着人类理性从神话（Mythos）向科学理性（Logos）的伟大飞跃。",
    "keyConcepts": [
      {"term": "万物始基 (Arche)", "explanation": "宇宙最初的、根本的、派生出一切具体事物的物理统一本体。"},
      {"term": "物活论 (Hylozoism)", "explanation": "物质本身具有内在的生命与活力，并非死寂机械，如磁石引铁即其内在生机。"},
      {"term": "自然理性化", "explanation": "拒绝用超自然神迹解释日食、地震等现象，确立了观察与几何推演的理性范式。"}
    ],
    "famousQuotes": [
      {"quote": "水是万物之本原，万物皆从水中产生，又复归于水。"},
      {"quote": "认识你自己，乃是世间最难之事；而给他人提建议，则是世上最易之事。"}
    ],
    "notableWorks": ["《论日食》", "《论至点》", "《航海占星术》（均佚，由亚里士多德与第欧根尼·拉尔修转引）"],
    "influencedBy": [],
    "influenced": ["heraclitus", "democritus", "plato", "aristotle"],
    "culturalEchoIds": ["solaris"]
  },
  {
    "id": "heraclitus",
    "name": {"zh": "赫拉克利特", "en": "Heraclitus of Ephesus", "original": "Ἡράκλειτος"},
    "eraId": "axial-age",
    "lifespan": "BC 535 - BC 475",
    "birthYear": -535,
    "deathYear": -475,
    "region": "west",
    "nationality": "古希腊·以弗所",
    "avatar": "/assets/philosophers/heraclitus.jpg",
    "schools": ["爱奥尼亚学派", "朴素辩证法", "活火论"],
    "primaryDomain": "metaphysics",
    "coreInsight": "人不能两次踏进同一条河流；万物皆流，唯变不变，其尺度即是永恒的逻各斯（Logos）。",
    "analogy": "燃烧的篝火：火焰不断吞噬木柴又不断转化为青烟与灰烬，看似稳定的火苗实则是剧烈转化平衡的动态体现。",
    "summary": "被称为“晦涩哲人”与“哭泣的哲人”。赫拉克利特洞察到宇宙不是静止的雕像，而是一团永恒的活火（Living Fire），按既定的尺度燃烧与熄灭。他首创“逻各斯（Logos）”概念，认为对立冲突乃万物生成的根本动力，战争是万物之父，冷热明暗在对立中达成深层和谐。",
    "historicalImpact": "开创了西方辩证法的光辉源头，直接深刻启迪了黑格尔的辩证法与尼采的生成哲学与酒神精神。",
    "keyConcepts": [
      {"term": "万物皆流 (Panta Rhei)", "explanation": "世间一切事物都在永不停息地流动、转化与生成之中，静止只是相对表象。"},
      {"term": "逻各斯 (Logos)", "explanation": "统治宇宙万物运行、调控对立面转化的内在客观理性尺度与必然规律。"},
      {"term": "对立统一与活火", "explanation": "相互冲突的对立面（如疾病与健康、饥饿与温饱）通过斗争共同构成了动态的宇宙和谐。"}
    ],
    "famousQuotes": [
      {"quote": "人不能两次踏进同一条河流，因为新的水流正不断向你涌来。"},
      {"quote": "这个世界对一切存在物都是一样的，它不是任何神或人创造的，它过去、现在、未来都是一团永恒的活火。"}
    ],
    "notableWorks": ["《论自然》（散佚残篇百余条）"],
    "influencedBy": ["thales"],
    "influenced": ["hegel", "nietzsche", "marx", "heidegger"],
    "culturalEchoIds": ["solaris", "school-of-athens"]
  },
  {
    "id": "democritus",
    "name": {"zh": "德谟克利特", "en": "Democritus", "original": "Δημόκριτος"},
    "eraId": "axial-age",
    "lifespan": "BC 460 - BC 370",
    "birthYear": -460,
    "deathYear": -370,
    "region": "west",
    "nationality": "古希腊·阿布德拉",
    "avatar": "/assets/philosophers/democritus.jpg",
    "schools": ["原子论学派", "古典唯物论", "机械决定论"],
    "primaryDomain": "metaphysics",
    "coreInsight": "宇宙的本体只有原子（Atoma）和虚空（Void）；除此以外，一切都只是主观意见与表象。",
    "analogy": "微型乐高积木：无数肉眼看不见的不可分割硬块，在无限虚空中旋转碰撞组合，拼出了星辰、海水与人体。",
    "summary": "被称为“欢笑的哲人”。德谟克利特与导师留基伯共同创立了古典原子论。他认为物质由不可再分、坚硬不可入的微观实体“原子”构成。颜色、气味、冷热不是事物的内在固有属性，而只是原子刺激人类感官产生的主观感知，率先区分了第一性质与第二性质。",
    "historicalImpact": "提出了近现代物理学与量子力学的原子概念先驱，为欧洲唯物主义与科学还原论提供了最早的形而上学脚手架。",
    "keyConcepts": [
      {"term": "不可分原子 (Atom)", "explanation": "构成一切存在的最小不可再分、充实而永恒的微粒，仅有形状、次序和位置差异。"},
      {"term": "虚空 (The Void)", "explanation": "非存在并非不存在，而是原子自由运动与聚合分离所不可或缺的物理空间。"},
      {"term": "因果必然性", "explanation": "宇宙中发生的一切事件均有其机械必然原因，绝无纯粹盲目的偶然与超自然意志。"}
    ],
    "famousQuotes": [
      {"quote": "习惯上说有甜有苦，有冷有热，有色彩；但实际上唯有原子和虚空。"},
      {"quote": "与其做波斯国王，我宁愿发现一条因果定律。"}
    ],
    "notableWorks": ["《大宇宙系统》", "《论人的本性》", "《论平和的心境》（残篇）"],
    "influencedBy": ["thales", "heraclitus"],
    "influenced": ["epicurus", "locke", "marx", "nietzsche"],
    "culturalEchoIds": ["solaris", "matrix"]
  },
  {
    "id": "socrates",
    "name": {"zh": "苏格拉底", "en": "Socrates", "original": "Σωκράτης"},
    "eraId": "axial-age",
    "lifespan": "BC 470 - BC 399",
    "birthYear": -470,
    "deathYear": -399,
    "region": "west",
    "nationality": "古希腊·雅典",
    "avatar": "/assets/philosophers/socrates.jpg",
    "schools": ["古典希腊哲学", "苏格拉底学派", "伦理理性主义"],
    "primaryDomain": "ethics",
    "coreInsight": "认识你自己；我唯一知道的，就是我一无所知；未经审视的生活是不值得过的。",
    "analogy": "思想助产士：他不向人灌输现成真理，而是用不断深挖的诘问，引导你接生出原本深藏于灵魂中的自知与德性。",
    "summary": "将哲学“从天上召唤回人间”的西方圣哲。在智者学派兜售相对主义诡辩的时代，苏格拉底终身游荡在雅典街头，通过对话揭露城邦公民的自负与自相矛盾，坚持道德真理的客观普适性，最终以莫须有的叛神腐蚀青年罪名被判饮毒殉道。",
    "historicalImpact": "开创了西方批判性思维（Elenchus）与伦理学传统，奠定了西方理性主义对个体人格道德与知识同一性的最高崇敬。",
    "keyConcepts": [
      {"term": "精神助产术 (Elenchus)", "explanation": "通过反讽、归纳与层层诘问，粉碎伪知，引导求知者自觉接生出真理概念。"},
      {"term": "美德即知识", "explanation": "恶行源自对真正至善的无知；真正透彻明白真善之人，必不会悖德作恶。"},
      {"term": "自知其无知", "explanation": "意识到人类理性与感知的有限性，是摆脱偏狭盲目、踏上追求智慧之路的第一步。"}
    ],
    "famousQuotes": [
      {"quote": "未经审视的生活是不值得过的。", "source": "柏拉图《申辩篇》"},
      {"quote": "我唯一知道的，就是我一无所知。"}
    ],
    "notableWorks": ["无著作（思想由弟子柏拉图与色诺芬完整记录）"],
    "influencedBy": [],
    "influenced": ["plato", "aristotle", "seneca", "epictetus", "kierkegaard"],
    "culturalEchoIds": ["matrix", "truman-show", "school-of-athens"]
  },
  {
    "id": "plato",
    "name": {"zh": "柏拉图", "en": "Plato", "original": "Πλάτων"},
    "eraId": "axial-age",
    "lifespan": "BC 427 - BC 347",
    "birthYear": -427,
    "deathYear": -347,
    "region": "west",
    "nationality": "古希腊·雅典",
    "avatar": "/assets/philosophers/plato.jpg",
    "schools": ["柏拉图学园", "理念论", "客观唯心主义"],
    "primaryDomain": "metaphysics",
    "coreInsight": "可感物质世界不过是流变的虚影，唯有超越时空的永恒理念（Forms）才是真理本体。",
    "analogy": "洞穴囚徒：人类背对着洞口火光被锁链束缚，把石壁上的阴影当作真实，唯有打破枷锁走出洞穴者才能目睹太阳真理。",
    "summary": "西方哲学史上首座宏伟唯心主义体系的筑造者。柏拉图创立了阿卡德米学园，提出可感世界与可智世界的两分，主张灵魂回忆说与哲学王治理的正义城邦。怀特海断言：“两千五百年的西方哲学史，不过是柏拉图哲学的一系列注脚。”",
    "historicalImpact": "确立了本质与表象、灵魂与肉体的二元框架，深远塑造了西方理性主义、基督教神学与宪政政治哲学。",
    "keyConcepts": [
      {"term": "理念论 (Theory of Forms)", "explanation": "具体事物因分有永恒完善的抽象理型（如圆、美、至善）而获得其暂时性质。"},
      {"term": "洞穴隐喻 (Allegory of the Cave)", "explanation": "描述灵魂从肉身感官蒙昧的阴影世界走向理性真理太阳照耀的惊险历程。"},
      {"term": "哲学王治理", "explanation": "正义城邦唯有由见识过至善理念、不谋私利的哲学家统领，才能实现社会和谐。"}
    ],
    "famousQuotes": [
      {"quote": "不知道自己的无知，乃是双重的无知。", "source": "《理想国》"},
      {"quote": "哲学始于对世界的惊异。", "source": "《泰阿泰德篇》"}
    ],
    "notableWorks": ["《理想国》", "《会饮篇》", "《斐多篇》", "《蒂迈欧篇》"],
    "influencedBy": ["socrates", "heraclitus"],
    "influenced": ["aristotle", "plotinus", "augustine", "descartes", "kant"],
    "culturalEchoIds": ["matrix", "school-of-athens", "truman-show"]
  },
  {
    "id": "aristotle",
    "name": {"zh": "亚里士多德", "en": "Aristotle", "original": "Ἀριστοτέλης"},
    "eraId": "axial-age",
    "lifespan": "BC 384 - BC 322",
    "birthYear": -384,
    "deathYear": -322,
    "region": "west",
    "nationality": "古希腊·斯塔吉拉",
    "avatar": "/assets/philosophers/aristotle.jpg",
    "schools": ["逍遥学派", "古典经验现实主义", "形式逻辑学"],
    "primaryDomain": "metaphysics",
    "coreInsight": "吾爱吾师，吾更爱真理；理念不在云端天国，而就内在于具体事物的形式与质料之中。",
    "analogy": "大理石与雕像：质料是大理石原石，形式是雕塑家构思赋予的维纳斯形态，形式与质料结合才成就真实实体。",
    "summary": "古代世界最渊博的百科全书式天才。亚里士多德批判了柏拉图割裂理念与现实的唯心两分，提出实体论与四因说（质料因、形式因、动力因、目的因），开创了形式逻辑（三段论）、生物分类学、政治宪政学与中庸伦理学。",
    "historicalImpact": "构建了西方知识大厦的学科分类标准与逻辑思维工具，在中世纪被经院哲学家尊称为无可辩驳的“哲学家（The Philosopher）”。",
    "keyConcepts": [
      {"term": "四因说 (Four Causes)", "explanation": "解释一切存在物生成构成的四个维度：质料因、形式因、动力因、目的因。"},
      {"term": "潜能与现实 (Potentiality & Actuality)", "explanation": "种子作为潜能，在运动中将形式展开实现为参天大树，万物朝向终极第一推动力演进。"},
      {"term": "黄金中道 (Golden Mean)", "explanation": "道德美德在于避开过犹不及两个极端，如勇敢是怯懦与鲁莽之间的恰当平衡。"}
    ],
    "famousQuotes": [
      {"quote": "吾爱吾师柏拉图，但吾更爱真理。"},
      {"quote": "人是天生的政治动物。", "source": "《政治学》"}
    ],
    "notableWorks": ["《形而上学》", "《尼各马可伦理学》", "《工具论》", "《政治学》"],
    "influencedBy": ["plato", "socrates", "democritus"],
    "influenced": ["thomas-aquinas", "locke", "hegel", "marx"],
    "culturalEchoIds": ["school-of-athens"]
  },
  {
    "id": "laozi",
    "name": {"zh": "老子", "en": "Laozi", "original": "李耳"},
    "eraId": "axial-age",
    "lifespan": "BC 571 - BC 471",
    "birthYear": -571,
    "deathYear": -471,
    "region": "east",
    "nationality": "东周·楚国苦县",
    "avatar": "/assets/philosophers/laozi.jpg",
    "schools": ["道家学派", "东方形而上学", "朴素辩证法"],
    "primaryDomain": "metaphysics",
    "coreInsight": "道法自然，反者道之动；天下万物生于有，有生于无；上善若水，为无为则无不治。",
    "analogy": "虚空的陶罐：揉泥做陶器，唯因陶罐中间中空无物，才有用处；有之以为利，无之以为用。",
    "summary": "东方哲学与道家思想的开山宗师。面对春秋乱世礼乐崩坏与诸侯攻伐，老子写下五千言《道德经》。他洞悉天道之精微与人道之妄为，揭示出万物背后不可名状的终极本原“道”，主张以柔克刚、知雄守雌、处无为之事、行不言之教。",
    "historicalImpact": "奠定了中华文明阴柔互补、天人合一、顺应自然的形而上学宇宙观与生存智慧，深刻影响了中国人的性格与艺术审美。",
    "keyConcepts": [
      {"term": "道法自然", "explanation": "终极宇宙法则“道”没有任何主观意志与偏私，以宇宙万物的自发演化为准绳。"},
      {"term": "反者道之动", "explanation": "一切事物的运动发展都在向其对立面转化，物极必反，柔弱胜刚强。"},
      {"term": "无为而治", "explanation": "顺应天道民心之自然，不胡乱干预造作，社会便能达到最高和谐。"}
    ],
    "famousQuotes": [
      {"quote": "道可道，非常道；名可名，非常名。", "source": "《道德经·第一章》"},
      {"quote": "上善若水。水善利万物而不争，处众人之所恶，故几于道。", "source": "《道德经·第八章》"}
    ],
    "notableWorks": ["《道德经（老子）》"],
    "influencedBy": [],
    "influenced": ["zhuangzi", "wang-yangming", "schopenhauer", "heidegger"],
    "culturalEchoIds": ["disco-elysium"]
  },
  {
    "id": "confucius",
    "name": {"zh": "孔子", "en": "Confucius", "original": "孔丘"},
    "eraId": "axial-age",
    "lifespan": "BC 551 - BC 479",
    "birthYear": -551,
    "deathYear": -479,
    "region": "east",
    "nationality": "春秋·鲁国陬邑",
    "avatar": "/assets/philosophers/confucius.jpg",
    "schools": ["儒家学派", "伦理人道主义", "德治政治学"],
    "primaryDomain": "ethics",
    "coreInsight": "克己复礼为仁，天下归仁焉；己所不欲，勿施于人；君子坦荡荡，小人长戚戚。",
    "analogy": "温润的美玉：君子当如切如磋、如琢如磨，通过礼仪与修身去除顽劣，内敛出仁爱的温润光泽。",
    "summary": "至圣先师、儒家学派创始人。在春秋礼崩乐坏、诸侯兼并的血火乱世中，孔子周游列国十四载推行仁道。他将西周外在等级制度的“礼”，内化为人类心底最真诚纯粹的道德情感“仁”，首创有教无类平民教育，勾画出天下为公的大同理想。",
    "historicalImpact": "构建了东亚两千余年政治伦理、社会结构与文化心理的大一统脊梁，成为东亚文明最核心的精神坐标。",
    "keyConcepts": [
      {"term": "仁者爱人", "explanation": "人类发自本心的道德同理心与生命关怀，是处理一切人际伦理的最高德性。"},
      {"term": "克己复礼", "explanation": "自觉约束个体的非分欲望与傲慢，使言行契合公认的正义社会规范。"},
      {"term": "中庸之道", "explanation": "做事恰到好处，不偏不倚、无过不及，追求动态平衡的社会与个体心境。"}
    ],
    "famousQuotes": [
      {"quote": "己所不欲，勿施于人。", "source": "《论语·卫灵公》"},
      {"quote": "朝闻道，夕死可矣。", "source": "《论语·里仁》"}
    ],
    "notableWorks": ["《论语》（由弟子及再传弟子辑录）", "编订《诗》《书》《礼》《乐》《易》《春秋》"],
    "influencedBy": [],
    "influenced": ["wang-yangming", "li-zehou", "kant", "voltaire"],
    "culturalEchoIds": ["disco-elysium"]
  },
  {
    "id": "zhuangzi",
    "name": {"zh": "庄子", "en": "Zhuangzi", "original": "庄周"},
    "eraId": "axial-age",
    "lifespan": "BC 369 - BC 286",
    "birthYear": -369,
    "deathYear": -286,
    "region": "east",
    "nationality": "战国·宋国蒙城",
    "avatar": "/assets/philosophers/zhuangzi.jpg",
    "schools": ["庄子学派", "道家美学", "诗性相对主义"],
    "primaryDomain": "metaphysics",
    "coreInsight": "天地与我并生，而万物与我为一；相忘于江湖，乘云气、御飞龙，游于无穷者也。",
    "analogy": "大鹏展翅：乘扶摇羊角而上九万里，以宇宙俯瞰的无限辽阔视角，照破地面蓬间雀雀跃争食的井蛙之见。",
    "summary": "战国中期道家思想集大成者，浪漫哲学与诗性解构的旷世奇才。庄子以“卮言日出，和以天倪”的汪洋辟阖之笔，通过庄周梦蝶、庖丁解牛、鼓盆而歌等寓言，破除了世俗名利是非、生死贵贱的执念界限，开启了个体生命超越世俗桎梏的绝对精神自由。",
    "historicalImpact": "深刻奠定了中国古典文人精神逃离尘俗异化的诗意避难所，对中国魏晋玄学、禅宗与诗书画美学产生了决定性滋养。",
    "keyConcepts": [
      {"term": "齐物论", "explanation": "站在宇宙大道整体视角审视，是非善恶寿夭皆为相对虚妄，万物本质平等齐一。"},
      {"term": "逍遥游", "explanation": "无己、无功、无名，斩断一切对外部条件功利的依赖，灵魂达至无拘无束的境界。"},
      {"term": "心斋与坐忘", "explanation": "堕肢体、黜聪明、离形去知，让心灵如同明镜般虚室生白，与天地大化冥合。"}
    ],
    "famousQuotes": [
      {"quote": "不知周之梦为胡蝶与，胡蝶之梦为周与？", "source": "《庄子·齐物论》"},
      {"quote": "相濡以沫，不如相忘于江湖。", "source": "《庄子·大宗师》"}
    ],
    "notableWorks": ["《庄子（南华真经）》"],
    "influencedBy": ["laozi"],
    "influenced": ["huineng", "nietzsche", "sartre", "camus"],
    "culturalEchoIds": ["matrix", "disco-elysium"]
  }
]

print(f"Era 1 ready: {len(philosophers)} philosophers.")
