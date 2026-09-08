import { QuizQuestion, PhilosophyArchetype } from '../types/philosophy';

// 16 大双篇章哲学测验矩阵 (8大现实生活抉择 + 8大极限思想实验)
// 严格对应四大基石维度：E_R (经验 vs 理性), U_D (功利 vs 道义), N_X (虚无 vs 存在), I_M (心性 vs 实践)
export const QUIZ_QUESTIONS_DATA: QuizQuestion[] = [
  // =========================================================================
  // 第一篇章：人间烟火 · 现实生活抉择 (Part 1: Daily Life & Grounded Intuition)
  // =========================================================================

  // --- 认识论 E_R (经验实证 VS 理性先验) ---
  {
    id: 1,
    category: 'daily_life',
    dimension: 'E_R',
    lifeSceneTitle: '高客单数码选购与决策真相',
    scenario: '你要入手一款价格昂贵的核心生产力工具（如专业电脑或相机）。在下单前面对各种铺天盖地的营销宣传，你最信赖哪种方式来断定它的真实好坏？',
    dilemmaPrompt: '在纷繁复杂的信息轰炸中，什么才是你认定“事物真相”的最底层锚点？',
    options: [
      {
        text: '大量翻看真实买家的几百条带图追评、翻车差评，以及亲自到实体店上手摸真机实测。',
        subtext: '实践与亲身体验才是检验真理的唯一标准，纸面参数吹得再高不如实际摸一摸。',
        value: -1,
        trait: '经验实证流 (Empirical Verification)'
      },
      {
        text: '深入拆解厂商发布的底层芯片微架构白皮书、工业理论设计规范与标准化性能公理。',
        subtext: '只要底层逻辑架构与公理推导足够优秀，实际体验必然在必然性之中。',
        value: 1,
        trait: '理性公理流 (Rationalist Axiom)'
      }
    ]
  },
  {
    id: 2,
    category: 'daily_life',
    dimension: 'E_R',
    lifeSceneTitle: '职场方案推翻与论证依据',
    scenario: '在一次决定项目生死的关键方案评审会上，面对一个看似宏大华丽但漏洞百出的方案，如果要彻底说服所有决策者推翻它，你最有力的武器是：',
    dilemmaPrompt: '当你要摧毁一个虚妄的假说时，你的致命一击来自：',
    options: [
      {
        text: '摆出过去两周最新的用户留存断崖式实测数据、A/B测试曲线与残酷的客观事实反例。',
        subtext: '在冰冷的客观经验事实面前，任何自吹自擂的理论都会瞬间破产。',
        value: -1,
        trait: '客观经验事实 (Factual Realism)'
      },
      {
        text: '层层剖析对方方案在因果逻辑链条上的概念偷换、循环论证与底层公理自相矛盾。',
        subtext: '逻辑前提若有硬伤，推论再华丽也是沙上建塔，纯粹理性能直接从根基击穿它。',
        value: 1,
        trait: '纯粹逻辑演绎 (Logical Deduction)'
      }
    ]
  },

  // --- 伦理学 U_D (功利后果 VS 绝对道义) ---
  {
    id: 3,
    category: 'daily_life',
    dimension: 'U_D',
    lifeSceneTitle: '好友创作与善意谎言的边界',
    scenario: '一位相交多年的挚友倾注数月心血并花光积蓄完成了一件设计作品，满怀期待地展示给你看并问：“你觉得怎么样？”坦白讲，这件作品在审美和市场运作上都有严重硬伤。此时你会：',
    dilemmaPrompt: '在“呵护他人的脆弱心力”与“捍卫不可逾越的诚实原则”之间，你的第一伦理直觉是：',
    options: [
      {
        text: '先真诚肯定他的付出与闪光点，给予温暖鼓励，避免在当下给他带来无谓的精神摧残。',
        subtext: '语言的道德价值在于产生的实际善意效用，纯粹生硬的打击只会带来双输的结果。',
        value: -1,
        trait: '善意后果关怀 (Utilitarian Empathy)'
      },
      {
        text: '温和但绝不撒谎，实事求是指出其设计硬伤。因为真诚是神圣原则，善意谎言亦是欺骗。',
        subtext: '人与人真正的尊重建立在绝对真诚之上，虚伪的妥协是对道德律与朋友人格的贬损。',
        value: 1,
        trait: '绝对真诚道义 (Deontological Honesty)'
      }
    ]
  },
  {
    id: 4,
    category: 'daily_life',
    dimension: 'U_D',
    lifeSceneTitle: '普遍规则与特殊善行的冲突',
    scenario: '部门规章明文规定严禁迟到，迟到一次扣除全勤奖。一位表现卓越的下属因为在上班早高峰护送一位昏厥老人就医而迟到了2分钟。作为部门主管，你的决定是：',
    dilemmaPrompt: '当普遍适用的法则遇到了崇高且特殊的善意行为时，你如何裁决？',
    options: [
      {
        text: '破例免除其迟到处罚，并在周会上公开表扬其见义勇为，因为这有利于弘扬社会正气与团队凝聚力。',
        subtext: '制度是为人幸福服务的工具，追求最大化社会善与团队效用远胜于教条执行。',
        value: -1,
        trait: '效用弹性裁量 (Flexible Utilitarianism)'
      },
      {
        text: '依章程扣除全勤奖，但主管个人私下为他补足并表达敬意。因为规则一旦随意开先例便失去了权威。',
        subtext: '法度的神圣在于其普遍不可动摇性，公理不容因个别情境随意弯折。',
        value: 1,
        trait: '普遍法则守卫 (Categorical Imperative)'
      }
    ]
  },

  // --- 存在论 N_X (自然虚无 VS 存在意志) ---
  {
    id: 5,
    category: 'daily_life',
    dimension: 'N_X',
    lifeSceneTitle: '深夜独处与宇宙级空无感',
    scenario: '深夜加班独自行走在空无一人的天桥上，仰望繁星，你猛然意识到地球不过是宇宙微尘，人类文明终将归于死寂，百年生老病死如露如电。此时你内心升起的感觉更接近：',
    dilemmaPrompt: '面对无可逃避的终极虚无，你安放灵魂的方式是：',
    options: [
      {
        text: '一种深邃的释怀与宁静：天地本就无常虚空，万物自然流转，何必强求执念？顺应自然、无为而安。',
        subtext: '天地与我并生，万物与我为一。承认虚无，方能从过度紧绷的心智执念中彻底解脱。',
        value: -1,
        trait: '道法自然齐物 (Natural Tranquility)'
      },
      {
        text: '一种悲壮而滚烫的斗志：正因为宇宙本无预设意义，我当下的每一次清醒抗争，才自我赋予了无上意义！',
        subtext: '存在先于本质。虚无是自由的荒原，我们必须在荒谬中亲手铸造自我的丰碑。',
        value: 1,
        trait: '存在意志抗争 (Existential Defiance)'
      }
    ]
  },
  {
    id: 6,
    category: 'daily_life',
    dimension: 'N_X',
    lifeSceneTitle: '完全自由的长假与人生图景',
    scenario: '如果你获得了一整年完全财务自由、无需向任何人汇报交差的空白时光，你理想中度过这笔时间的方式是：',
    dilemmaPrompt: '当你卸下所有外界期望与社会规训后，你灵魂深处真正向往的生存姿态是：',
    options: [
      {
        text: '隐入山野林泉或海畔小镇，日出而作日落而息，没有刻意规划，任心神消融在自然四时的节律中。',
        subtext: '生命本身即是自足的目的，无需证明什么，停止向外索求，融入原初生活的无为滋味。',
        value: -1,
        trait: '归真自然避世 (Quietist Naturalism)'
      },
      {
        text: '投身一项充满未知与艰难的宏大创作、极限探险或创办事业，在征服与开拓中确证自我。',
        subtext: '人的尊严在于创造与超越，在与阻力的搏击中，生命的火焰才燃烧得最为纯粹。',
        value: 1,
        trait: '自我超越意志 (Will to Overcome)'
      }
    ]
  },

  // --- 实践论 I_M (心性内求 VS 唯物行动) ---
  {
    id: 7,
    category: 'daily_life',
    dimension: 'I_M',
    lifeSceneTitle: '精神内耗与焦虑深渊的化解支点',
    scenario: '当你陷入对未来的巨大不确定性与严重的精神内耗、心浮气躁夜不能寐时，最能迅速将你从绝望深渊中拉出来的是：',
    dilemmaPrompt: '在内在省察与外部行动之间，你对抗心魔的根本支点在于：',
    options: [
      {
        text: '闭门独处、深呼吸打坐冥想或写反思日记，向内看穿情绪背后的执念妄想，心安则万事安。',
        subtext: '风动幡动，皆是仁者心动。精神内耗皆由心生，必须从内在心性源头破除“心中之贼”。',
        value: -1,
        trait: '内省心性觉知 (Inward Contemplation)'
      },
      {
        text: '立刻强迫身体动起来：大汗淋漓地跑步、狠狠打扫房间、出门见人、做一件微小具体的现实事务。',
        subtext: '想，都是问题；做，才是答案。在具体的物理运动与客观现实碰撞中，内耗不攻自破。',
        value: 1,
        trait: '唯物实践出击 (Material Action)'
      }
    ]
  },
  {
    id: 8,
    category: 'daily_life',
    dimension: 'I_M',
    lifeSceneTitle: '习惯重塑与自我革命的突破口',
    scenario: '你下定决心要彻底戒除一个长期困扰你的恶习（如严重熬夜、拖延成性或刷手机上瘾），你认为这次自我革命成败的根本在于：',
    dilemmaPrompt: '重塑自我的阿基米德支点究竟在何处？',
    options: [
      {
        text: '内心深处价值观与生命愿景的真正顿悟觉醒。内在若没有真正想通，任何外在强制都只是暂时的。',
        subtext: '知是行之始，行是知之成。意念至诚、心体明澈，方能生出不可阻挡的长久定力。',
        value: -1,
        trait: '致良知心性顿悟 (Internal Realization)'
      },
      {
        text: '彻底重构外部物理环境与约束机制（如物理收缴手机、设定违约惩罚、改变物理空间工位）。',
        subtext: '人是环境的产物，靠纯粹心力对抗诱惑注定失败，客观物理机制才是行为的坚实保障。',
        value: 1,
        trait: '物理环境重塑 (Environmental Materialism)'
      }
    ]
  },

  // =========================================================================
  // 第二篇章：深渊凝视 · 极限思想实验 (Part 2: Extreme Thought Experiments)
  // =========================================================================

  // --- 认识论 E_R (经验实证 VS 理性先验) ---
  {
    id: 9,
    category: 'thought_experiment',
    dimension: 'E_R',
    experimentTitle: '忒修斯之船 (The Ship of Theseus)',
    originator: '普鲁塔克 (Plutarch) & 托马斯·霍布斯',
    culturalRef: '《活体脑细胞 (SOMA)》 / 《旺达幻视》 / 《攻壳机动队》',
    scenario: '古希腊英雄忒修斯的木船在海上长期航行，木板逐渐腐朽，船员不断用新木板替换旧木板。直到最后一块旧木板被换下，整艘船没有一块原来的木头。同时，有人将换下来的所有旧木板在岸上重新拼装成了一艘新船。',
    dilemmaPrompt: '当所有物理构成在岁月中被彻底替换后，海上那艘换完新木板的船，究竟还是原来的忒修斯之船吗？',
    options: [
      {
        text: '换完新木板的船依然是原船：其连续的航行历史、功能延续与生命轨迹定义了它。',
        subtext: '在经验世界中，同一性源于活生生的生命轨迹与实践过程。',
        value: -1,
        trait: '经验连续论 (Empirical Continuity)'
      },
      {
        text: '它早已不是原来的船；由旧质料拼成的才是真身。',
        subtext: '实体具有不可替换的质料或形式公理，概念定义不能随经验流动而妥协。',
        value: 1,
        trait: '先验本质论 (Rationalist Essence)'
      }
    ]
  },
  {
    id: 10,
    category: 'thought_experiment',
    dimension: 'E_R',
    experimentTitle: '中文房间与图灵测试 (The Chinese Room)',
    originator: '约翰·塞尔 (John Searle) & 阿兰·图灵',
    culturalRef: '《机械姬 (Ex Machina)》 / 《银翼杀手 2049》 / 《西部世界》',
    scenario: '一个完全不懂中文的人被关在密室里，手里拿着一本极其详尽的规则对照手册处理汉字纸条。门外的人以为里面是一个精通中文的大师，但屋内的人自始至终对汉字的实际含义一无所知。',
    dilemmaPrompt: '一个通过了图灵测试、能完美回答一切人类提问的超级大模型 AI，它真的“拥有理解与意识”吗？',
    options: [
      {
        text: '它没有真正的意识：纯粹的形式符号计算（语法）永远不能产生真实的生物学理解与主观体验。',
        subtext: '意识必须具身于真实的感官经验与感受质，而非冰冷的机械代码。',
        value: -1,
        trait: '经验生物具身论 (Embodied Realism)'
      },
      {
        text: '系统整体具有意识：只要输入输出在逻辑与功能上完全自洽等效，它就拥有实质的心智。',
        subtext: '思维的本质是逻辑与计算架构，形式与信息结构超越具体的生物血肉。',
        value: 1,
        trait: '形式计算功能主义 (Functionalism)'
      }
    ]
  },

  // --- 伦理学 U_D (功利后果 VS 绝对道义) ---
  {
    id: 11,
    category: 'thought_experiment',
    dimension: 'U_D',
    experimentTitle: '电车难题与天桥胖子 (The Trolley Problem)',
    originator: '菲利帕·福特 (Philippa Foot) & 朱迪斯·汤姆森',
    culturalRef: '《底特律：变人》 / 《黑暗骑士 (轮船双炸弹)》',
    scenario: '失控电车即将撞死轨道上的5名工人。你站在天桥上，身边有一位身材极为魁梧的陌生人，只要将他推下天桥卡住电车，就能挽救5人的性命，但他必死无疑。',
    dilemmaPrompt: '面对5条人命与1条人命的残酷数字对比，你的根本伦理准则是：',
    options: [
      {
        text: '推下胖子：在没有两全之法的绝境中，尽可能最大化挽救生命总数是理性的必然抉择。',
        subtext: '评价道德的核心度量衡在于行动最终产生的总体善恶净结果（5大于1）。',
        value: -1,
        trait: '功利后果主义 (Utilitarianism)'
      },
      {
        text: '绝不推人：人是目的，绝不能被当作工具。哪怕面对灾难，也不能主动杀害无辜者。',
        subtext: '人具有绝对尊严，不能沦为数学加减法中的筹码，道义底线不容妥协。',
        value: 1,
        trait: '绝对义务道义论 (Kantian Deontology)'
      }
    ]
  },
  {
    id: 12,
    category: 'thought_experiment',
    dimension: 'U_D',
    experimentTitle: '罗尔斯的无知之幕 (The Veil of Ignorance)',
    originator: '约翰·罗尔斯 (John Rawls)',
    culturalRef: '《雪国列车》 / 《人类清除计划》',
    scenario: '在制定新社会的一切法律制度时，所有人都被套上一层“无知之幕”。你完全不知道自己摘下眼罩后，会是身家百亿的富豪、天赋异禀的学者，还是身患重残、贫病交加的最底层流浪者。',
    dilemmaPrompt: '在对自身处境一无所知的神圣原初状态下，你支持制定何种正义原则？',
    options: [
      {
        text: '效率至上原则：允许贫富分化，只要这种不平等能最大限度刺激整体经济繁荣与科技飞跃。',
        subtext: '只要把蛋糕做得足够巨大，哪怕底层分到的比例小，其绝对获得量也可能更高。',
        value: -1,
        trait: '效益至上主义 (Efficiency Utilitarianism)'
      },
      {
        text: '最大最小原则：优先保障处于社会最弱势群体的最大福祉，宁可牺牲整体发展速度。',
        subtext: '社会的正义程度取决于最不幸者的境遇，正义是社会制度的首要价值。',
        value: 1,
        trait: '公平正义契约论 (Justice as Fairness)'
      }
    ]
  },

  // --- 存在论 N_X (自然虚无 VS 存在意志) ---
  {
    id: 13,
    category: 'thought_experiment',
    dimension: 'N_X',
    experimentTitle: '诺齐克的体验机 (The Experience Machine)',
    originator: '罗伯特·诺齐克 (Robert Nozick)',
    culturalRef: '《黑客帝国 (蓝药丸与红药丸)》 / 《香草天空》 / 《盗梦空间》',
    scenario: '顶尖脑神经学家造出了一台体验机，它可以刺激你的大脑，让你体验到所能渴望的一切美好：成为登顶珠峰的英雄、创作世界名画的大师、享受无休止的被爱与幸福。但在现实中，你只是漂浮在营养液里的肉体。一旦接入，你将永远不会醒来。',
    dilemmaPrompt: '如果有机会插上体验机享受一生无痛苦的至纯狂喜，你会选择插管吗？',
    options: [
      {
        text: '选择插管：如果主观体验完全无法区分，幸福与平静即是生命的终极归宿，何必执着于受苦？',
        subtext: '所有的“真实”不过是神经电信号，只要内心得到了极致圆融，何必被虚妄的现实折磨。',
        value: -1,
        trait: '圆融感官解脱 (Hedonistic Naturalism)'
      },
      {
        text: '断然拒绝：我们要的是“真实地去生活、去行动”，宁可在苦难中真切存在，也不要虚妄的甜梦。',
        subtext: '存在先于本质。虚幻的快感不能取代真实的人格建构，人的尊严在于直面真实的泥泞。',
        value: 1,
        trait: '真实存在意志 (Existential Authenticity)'
      }
    ]
  },
  {
    id: 14,
    category: 'thought_experiment',
    dimension: 'N_X',
    experimentTitle: '西西弗斯的神话与荒谬 (The Myth of Sisyphus)',
    originator: '阿尔贝·加缪 (Albert Camus)',
    culturalRef: '《极乐迪斯科》 / 《土拨鼠之日》 / 《瞬息全宇宙》',
    scenario: '诸神惩罚西西弗斯将一块巨石推上山顶，但每当快到山顶，巨石就会因自身重量滚回山谷。西西弗斯必须日复一日、永无休止地重复这项毫无意义的劳役。',
    dilemmaPrompt: '面对这毫无最终意义、永远归零的永恒循环，你如何理解西西弗斯与我们的人生？',
    options: [
      {
        text: '巨石是终将消散的幻象，彻底放下执念与对抗，以虚静之心观照石起石落，心如止水。',
        subtext: '执着于“推上去”才产生痛苦。参透缘起性空，便知无所谓成败，顺应自然便得解脱。',
        value: -1,
        trait: '齐物消解达观 (Zen Tranquility)'
      },
      {
        text: '“我们必须想象西西弗斯是幸福的”——向山顶奋斗的过程本身，足以充实一颗人心！',
        subtext: '在没有神明、充满荒谬的世界里，清醒的反抗与对当下的全情投入，就是对命运的最高蔑视。',
        value: 1,
        trait: '荒谬反抗意志 (Heroic Existentialism)'
      }
    ]
  },

  // --- 实践论 I_M (心性内求 VS 唯物行动) ---
  {
    id: 15,
    category: 'thought_experiment',
    dimension: 'I_M',
    experimentTitle: '柏拉图的洞穴之喻 (Allegory of the Cave)',
    originator: '柏拉图 (Plato)',
    culturalRef: '《楚门的世界》 / 《黑客帝国》 / 《移魂都市》',
    scenario: '一群囚徒自幼被锁在阴暗洞穴深处，他们只能看到墙壁上由火光投射出的木偶皮影，并以为皮影就是宇宙的全部真相。某天一名囚徒挣脱锁链，艰难爬出洞穴，第一次看到了刺眼的真实阳光、流水与理念世界。',
    dilemmaPrompt: '如果这位觉醒者想要真正解放仍在洞穴深处的同胞，最根本的途径是：',
    options: [
      {
        text: '唤醒内在心智：引导囚徒回转目光，启蒙他们的理性与精神，从内在破除对阴影的无知幻见。',
        subtext: '肉身虽在洞中，心若觉悟即见天日。精神的觉醒是不可替代的内在飞跃。',
        value: -1,
        trait: '心智理念启蒙 (Idealist Awakening)'
      },
      {
        text: '改造外部物理：直接下到洞中打碎铁链，砸烂投影火堆，用物理行动改变现实生存环境。',
        subtext: '物质决定意识。不改变囚徒被锁的客观物理现实，空谈阳光理念不过是空中楼阁。',
        value: 1,
        trait: '唯物实践变革 (Materialist Revolution)'
      }
    ]
  },
  {
    id: 16,
    category: 'thought_experiment',
    dimension: 'I_M',
    experimentTitle: '阳明龙场大悟与格物致知 (The Longchang Enlightenment)',
    originator: '王守仁 (王阳明) & 朱熹',
    culturalRef: '《一代宗师》 / 《黑神话：悟空》',
    scenario: '年轻时的王阳明曾遵循理学大师朱熹的教诲，面对庭院前的青竹连格七天七夜，试图格尽竹子之理，结果未得一理反致大病一场。数年后被贬谪龙场绝境，他在石棺中忽悟：“圣人之道，吾性自足，向之求理于事物者误也。”',
    dilemmaPrompt: '寻求终极之理与立身之本，真正的途径究竟是：',
    options: [
      {
        text: '吾性自足，向内求索：天下万理皆具于本心，良知即是天理，不假外求。',
        subtext: '心外无物，心外无理。向外穷索终是支离破碎，明心见性方能立定天地根基。',
        value: -1,
        trait: '心即理与致良知 (Heart-Mind Inward)'
      },
      {
        text: '深入外物，实践出真知：天理规律蕴藏于客观物理与历史实践中，绝不能闭门空想。',
        subtext: '没有脱离物质世界孤立存在的心灵。认识必须在改造外部客观世界的千锤百炼中产生。',
        value: 1,
        trait: '格物唯物实践 (Objective Praxis)'
      }
    ]
  }
];

// 完整 16 种哲学灵魂人格原型 (Archetypes Matrix)
// 键位严格对应 [E/R][U/D][N/X][I/M]
export const PHILOSOPHY_ARCHETYPES: Record<string, PhilosophyArchetype> = {
  // 1. EUNI
  'EUNI': {
    code: 'EUNI',
    title: '逍遥观察家 (The Serene Observer)',
    subtitle: '幸福就是身体无痛苦，灵魂无纷扰；在经验的大地上诗意自足',
    matchedPhilosopher: {
      id: 'epicurus',
      name: '伊壁鸠鲁 (Epicurus)',
      avatar: '/assets/philosophers/epicurus.jpg',
      quote: '幸福并不来自奢华的宴饮，而在于清醒的心智与对事物原因的理解。',
      works: '《致美诺客的信》《主旨要义》'
    },
    radarScores: {
      empiricismVsRationalism: 25,
      utilitarianVsDeontology: 30,
      nihilismVsExistentialism: 20,
      idealismVsMaterialism: 30
    },
    traits: ['感性敏锐', '避苦求真', '恬淡清醒', '善待生活'],
    strengths: ['拥有感知当下具体美好事物的高级能力，不易被外界宏大的虚名和焦虑绑架。'],
    blindSpots: ['面对需要长期承受沉重压力去博弈的宏大社会议题时，容易退回自己的精神花园。'],
    recommendedWorks: {
      book: '《论幸福生活》',
      movie: '《小森林》',
      game: '《星露谷物语》'
    }
  },

  // 2. EUNM
  'EUNM': {
    code: 'EUNM',
    title: '实证改良家 (The Pragmatic Reformer)',
    subtitle: '心灵初如白板，一切知识与正义皆在经验的现实中得以检验',
    matchedPhilosopher: {
      id: 'locke',
      name: '约翰·洛克 (John Locke)',
      avatar: '/assets/philosophers/locke.jpg',
      quote: '人类的一切知识都以经验为根基，并在经验中得以最终检验。',
      works: '《人类理解论》《政府论》'
    },
    radarScores: {
      empiricismVsRationalism: 15,
      utilitarianVsDeontology: 35,
      nihilismVsExistentialism: 40,
      idealismVsMaterialism: 80
    },
    traits: ['重视实效', '尊重契约', '讲求证据', '温和理性'],
    strengths: ['务实严谨，善于用现实数据与渐进试验解决实际矛盾，社会适应与制度构建力极强。'],
    blindSpots: ['有时过度看重可测量的实利指标，对纯粹先验的形而上学浪漫灵性缺少感知。'],
    recommendedWorks: {
      book: '《政府论》',
      movie: '《社交网络》',
      game: '《模拟城市》'
    }
  },

  // 3. EUXI
  'EUXI': {
    code: 'EUXI',
    title: '荒谬反抗者 (The Absurd Rebel)',
    subtitle: '重要的不是活得最好，而是活得最多；在冷漠宇宙中以激情推石上山',
    matchedPhilosopher: {
      id: 'camus',
      name: '阿尔贝·加缪 (Albert Camus)',
      avatar: '/assets/philosophers/camus.jpg',
      quote: '应当设想，西西弗斯是幸福的。在隆冬，我终于知道，我身上有一个不可战胜的夏天。',
      works: '《西西弗神话》《局外人》《反抗者》'
    },
    radarScores: {
      empiricismVsRationalism: 30,
      utilitarianVsDeontology: 40,
      nihilismVsExistentialism: 85,
      idealismVsMaterialism: 35
    },
    traits: ['清醒热烈', '拒绝自欺', '直面荒谬', '骄傲倔强'],
    strengths: ['不依赖任何虚假神话麻痹自己，在彻底看透世俗荒谬后依然保有无限的生命烈焰。'],
    blindSpots: ['对世俗规则的虚伪容易感到极度厌恶，有时陷入尖锐的个体孤独。'],
    recommendedWorks: {
      book: '《西西弗神话》',
      movie: '《海边的曼彻斯特》',
      game: '《死亡搁浅》'
    }
  },

  // 4. EUXM
  'EUXM': {
    code: 'EUXM',
    title: '赛博架构师 (The Cybernetic Architect)',
    subtitle: '逻辑与图灵机打破心物隔阂，以可计算性重构智能与存在的未来',
    matchedPhilosopher: {
      id: 'turing',
      name: '阿兰·图灵 (Alan Turing)',
      avatar: '/assets/philosophers/turing.jpg',
      quote: '有时候，正是那些人们未曾指望之人，做出了人们无法想象之事。',
      works: '《计算机器与智能》《论可计算数》'
    },
    radarScores: {
      empiricismVsRationalism: 35,
      utilitarianVsDeontology: 45,
      nihilismVsExistentialism: 75,
      idealismVsMaterialism: 85
    },
    traits: ['技术前瞻', '功能实证', '破壁重构', '系统思维'],
    strengths: ['善于打破陈腐传统的人性偏见，以强大的工程逻辑将复杂的精神问题化为现实可能。'],
    blindSpots: ['有时将复杂的人类情感和伦理悲剧简化为参数寻优问题，引发情感隔阂。'],
    recommendedWorks: {
      book: '《哥德尔、艾舍尔、巴赫》',
      movie: '《模仿游戏》',
      game: '《底特律：变人》'
    }
  },

  // 5. EDNI
  'EDNI': {
    code: 'EDNI',
    title: '齐物隐逸士 (The Daoist Sage)',
    subtitle: '乘物以游心，安时而处顺；天地与我并生，万物与我为一',
    matchedPhilosopher: {
      id: 'zhuangzi',
      name: '庄子 (Zhuangzi)',
      avatar: '/assets/philosophers/zhuangzi.jpg',
      quote: '至人无己，神人无功，圣人无名。泉涸，鱼相与处于陆，相呴以湿，相濡以沫，不如相忘于江湖。',
      works: '《庄子·内篇》《齐物论》《逍遥游》'
    },
    radarScores: {
      empiricismVsRationalism: 30,
      utilitarianVsDeontology: 75,
      nihilismVsExistentialism: 15,
      idealismVsMaterialism: 25
    },
    traits: ['超然空灵', '破除是非', '乘物游心', '大道无形'],
    strengths: ['拥有无可比拟的精神超脱力，能轻易穿透世俗名利的沉重枷锁，活得自如通透。'],
    blindSpots: ['对世俗政治和制度变革常常采取消极悬置的态度，容易被误认为避世冷眼。'],
    recommendedWorks: {
      book: '《庄子心得》',
      movie: '《刺客聂隐娘》',
      game: '《黑神话：悟空》'
    }
  },

  // 6. EDNM
  'EDNM': {
    code: 'EDNM',
    title: '斯多葛执政官 (The Stoic Guardian)',
    subtitle: '区分可控与不可控，在命运的风暴中守护无懈可击的内心城堡',
    matchedPhilosopher: {
      id: 'marcus-aurelius',
      name: '马可·奥勒留 (Marcus Aurelius)',
      avatar: '/assets/philosophers/marcus-aurelius.jpg',
      quote: '你有权控制你的心灵，而不是控制外部事件。意识到这一点，你就会找到力量。',
      works: '《沉思录》《论坚毅》'
    },
    radarScores: {
      empiricismVsRationalism: 40,
      utilitarianVsDeontology: 85,
      nihilismVsExistentialism: 30,
      idealismVsMaterialism: 70
    },
    traits: ['沉毅自律', '恪尽职守', '控制二分', '大局从容'],
    strengths: ['无论处于何种恶劣环境都能保持尊严与理智，是危急关头最值得托付的磐石伙伴。'],
    blindSpots: ['有时对自己和他人过于克制严苛，可能压抑了生命深处自然的情感宣泄。'],
    recommendedWorks: {
      book: '《沉思录》',
      movie: '《角斗士》',
      game: '《冰汽时代 (Frostpunk)》'
    }
  },

  // 7. EDXI
  'EDXI': {
    code: 'EDXI',
    title: '孤勇信仰者 (The Knight of Faith)',
    subtitle: '在绝望与战栗边缘纵身一跃，以个体真实与永恒神圣确立自身',
    matchedPhilosopher: {
      id: 'kierkegaard',
      name: '索伦·克尔凯郭尔 (Søren Kierkegaard)',
      avatar: '/assets/philosophers/kierkegaard.jpg',
      quote: '恐惧与战栗是通往深刻生命的必经之路。真理只存在于个体的热情决断之中。',
      works: '《恐惧与战栗》《非此即彼》《致死的疾病》'
    },
    radarScores: {
      empiricismVsRationalism: 35,
      utilitarianVsDeontology: 80,
      nihilismVsExistentialism: 80,
      idealismVsMaterialism: 20
    },
    traits: ['虔敬真挚', '深刻敏锐', '敢于决绝', '精神深邃'],
    strengths: ['拒绝随波逐流的平庸群众意识，对生命的悲剧性与神圣性有着无与伦比的体悟深度。'],
    blindSpots: ['内心极度敏感且常陷入深层精神内耗，容易在人际社交中感到格格不入。'],
    recommendedWorks: {
      book: '《恐惧与战栗》',
      movie: '《第七封印》',
      game: '《艾尔登法环》'
    }
  },

  // 8. EDXM
  'EDXM': {
    code: 'EDXM',
    title: '君子践履者 (The Exemplary Statesman)',
    subtitle: '克己复礼，仁以为己任；知其不可而为之，立君子浩然之气',
    matchedPhilosopher: {
      id: 'confucius',
      name: '孔子 (Confucius)',
      avatar: '/assets/philosophers/confucius.jpg',
      quote: '君子和而不同，小人同而不和。士不可以不弘毅，任重而道远。仁以为己任，不亦重乎？',
      works: '《论语》《礼记》'
    },
    radarScores: {
      empiricismVsRationalism: 35,
      utilitarianVsDeontology: 85,
      nihilismVsExistentialism: 65,
      idealismVsMaterialism: 85
    },
    traits: ['温良弘毅', '知行礼节', '担当大局', '教化育人'],
    strengths: ['具有极高的人格修养与社会组织号召力，能在具体的人伦日用中凝聚秩序与善意。'],
    blindSpots: ['可能过度推崇既有的长幼伦理与传统礼法，对颠覆性的激进前卫思想有所保留。'],
    recommendedWorks: {
      book: '《论语译注》',
      movie: '《孔子》',
      game: '《三国志》'
    }
  },

  // 9. RUNI
  'RUNI': {
    code: 'RUNI',
    title: '泛神沉思者 (The Pantheist Mystic)',
    subtitle: '神即自然，从永恒的相下观照万物；理解一切即宽恕一切',
    matchedPhilosopher: {
      id: 'spinoza',
      name: '巴鲁赫·斯宾诺莎 (Baruch Spinoza)',
      avatar: '/assets/philosophers/spinoza.jpg',
      quote: '不要哭，不要笑，要理解。自由是对必然性的认识。',
      works: '《伦理学》《神学政治论》'
    },
    radarScores: {
      empiricismVsRationalism: 80,
      utilitarianVsDeontology: 35,
      nihilismVsExistentialism: 25,
      idealismVsMaterialism: 30
    },
    traits: ['理性纯粹', '宁静致远', '超脱怨尤', '系统宏富'],
    strengths: ['能以几何学般的客观理性审视人世间的贪嗔痴，不易产生情绪波澜与狭隘报复欲。'],
    blindSpots: ['有时显得过分冷峻与超然世外，让人感到难以企及的距离感。'],
    recommendedWorks: {
      book: '《伦理学》',
      movie: '《星际穿越》',
      game: '《见证者 (The Witness)》'
    }
  },

  // 10. RUNM
  'RUNM': {
    code: 'RUNM',
    title: '秩序利维坦 (The Rational Sovereign)',
    subtitle: '自然状态是暴力的深渊，唯有至高理性契约方能庇护文明不坠',
    matchedPhilosopher: {
      id: 'hobbes',
      name: '托马斯·霍布斯 (Thomas Hobbes)',
      avatar: '/assets/philosophers/hobbes.jpg',
      quote: '自然状态下人的生活是孤独、贫困、卑污、残忍和短寿的。没有剑的契约只是一纸空文。',
      works: '《利维坦》《论公民》'
    },
    radarScores: {
      empiricismVsRationalism: 70,
      utilitarianVsDeontology: 20,
      nihilismVsExistentialism: 35,
      idealismVsMaterialism: 90
    },
    traits: ['看透人性', '崇尚秩序', '讲求威慑', '严密推演'],
    strengths: ['对现实政治与人性的幽暗面洞若观火，善于构建坚不可摧的制度防线避免系统崩溃。'],
    blindSpots: ['对人性的善良和利他倾向常抱怀疑，容易滑向集权与强力控制倾向。'],
    recommendedWorks: {
      book: '《利维坦》',
      movie: '《教父》',
      game: '《文明 VI》'
    }
  },

  // 11. RUXI
  'RUXI': {
    code: 'RUXI',
    title: '酒神超人 (The Dionysian Overman)',
    subtitle: '上帝已死！在虚无废墟中重估一切价值，做自身命运的造物神',
    matchedPhilosopher: {
      id: 'nietzsche',
      name: '弗里德里希·尼采 (Friedrich Nietzsche)',
      avatar: '/assets/philosophers/nietzsche.jpg',
      quote: '凡杀不死我的，必使我更强大。每一个不曾起舞的日子，都是对生命的辜负。',
      works: '《查拉图斯特拉如是说》《善恶的彼岸》《偶像的黄昏》'
    },
    radarScores: {
      empiricismVsRationalism: 70,
      utilitarianVsDeontology: 30,
      nihilismVsExistentialism: 95,
      idealismVsMaterialism: 25
    },
    traits: ['狂飙突进', '破除偶像', '生命意志', '诗意狂热'],
    strengths: ['拥有惊人的精神突破力与美学创造力，敢于挑战任何虚伪陈规并塑造全新价值。'],
    blindSpots: ['对弱者的平庸常缺乏耐心，容易陷入过于炽烈的孤独与精神风暴。'],
    recommendedWorks: {
      book: '《查拉图斯特拉如是说》',
      movie: '《鸟人》',
      game: '《尼尔：机械纪元》'
    }
  },

  // 12. RUXM
  'RUXM': {
    code: 'RUXM',
    title: '历史唯物巨匠 (The Historical Materialist)',
    subtitle: '哲学家们只是用不同方式解释世界，而问题在于改变世界！',
    matchedPhilosopher: {
      id: 'marx',
      name: '卡尔·马克思 (Karl Marx)',
      avatar: '/assets/philosophers/marx.jpg',
      quote: '批判的武器当然不能代替武器的批判，物质力量只能用物质力量来摧毁。',
      works: '《资本论》《共产党宣言》《1844年经济学哲学手稿》'
    },
    radarScores: {
      empiricismVsRationalism: 65,
      utilitarianVsDeontology: 40,
      nihilismVsExistentialism: 90,
      idealismVsMaterialism: 95
    },
    traits: ['宏大视野', '批判犀利', '改造世界', '阶级敏锐'],
    strengths: ['能穿透复杂的经济与社会表象，直达历史运转的根本经济动力，具有极强的变革魄力。'],
    blindSpots: ['有时容易将个体的复杂心理和精神诉求完全还原为阶级与物质利益决定论。'],
    recommendedWorks: {
      book: '《资本论》',
      movie: '《极乐迪斯科》',
      game: '《维多利亚 3》'
    }
  },

  // 13. RDXI
  'RDXI': {
    code: 'RDXI',
    title: '理念国哲王 (The Philosopher King)',
    subtitle: '攀登出洞穴凝视理念太阳，以灵魂的至善真理照亮迷茫城邦',
    matchedPhilosopher: {
      id: 'plato',
      name: '柏拉图 (Plato)',
      avatar: '/assets/philosophers/plato.jpg',
      quote: '除非哲学家成为城邦的国王，或者现在的国王具有真正的哲学精神，否则人类的灾难永无休止。',
      works: '《理想国》《会饮篇》《斐多篇》'
    },
    radarScores: {
      empiricismVsRationalism: 90,
      utilitarianVsDeontology: 85,
      nihilismVsExistentialism: 75,
      idealismVsMaterialism: 15
    },
    traits: ['理想主义', '深邃思辨', '至善追求', '精神导师'],
    strengths: ['拥有宏伟崇高的精神愿景与逻辑建构力，能指引人们超越庸常物欲走向更高的灵魂卓越。'],
    blindSpots: ['可能因过于追求纯粹完美的“理念乌托邦”，而在面对灰色的世俗妥协时感到刺痛。'],
    recommendedWorks: {
      book: '《理想国》',
      movie: '《楚门的世界》',
      game: '《塔罗斯法则》'
    }
  },

  // 14. RDXM
  'RDXM': {
    code: 'RDXM',
    title: '理性立法者 (The Rational Lawgiver)',
    subtitle: '头顶星空璀璨，心中绝对道德律坚如磐石；人是目的而非工具',
    matchedPhilosopher: {
      id: 'kant',
      name: '伊曼努尔·康德 (Immanuel Kant)',
      avatar: '/assets/philosophers/kant.jpg',
      quote: '有两样东西，人们越是经常持久地对之凝思，它们就越是使内心充满常新而日增的赞叹和敬畏：我头顶的星空和我心中的道德律。',
      works: '《纯粹理性批判》《实践理性批判》《判断力批判》'
    },
    radarScores: {
      empiricismVsRationalism: 85,
      utilitarianVsDeontology: 95,
      nihilismVsExistentialism: 70,
      idealismVsMaterialism: 85
    },
    traits: ['严密自律', '恪守原则', '敬畏正义', '哥白尼式颠覆'],
    strengths: ['逻辑极其缜密，具有无可动摇的道德原则与责任感，是人类理智最崇高的界碑守护者。'],
    blindSpots: ['在复杂的现实人情面前，可能显得过于教条与不近人情。'],
    recommendedWorks: {
      book: '《实践理性批判》',
      movie: '《十二怒汉》',
      game: '《逆转裁判》'
    }
  },

  // 15. RDNI
  'RDNI': {
    code: 'RDNI',
    title: '百科全书全知宗师 (The Universal Master)',
    subtitle: '追求万事万物的四因本质，执守中道之美，万物皆有其内在目的',
    matchedPhilosopher: {
      id: 'aristotle',
      name: '亚里士多德 (Aristotle)',
      avatar: '/assets/philosophers/aristotle.jpg',
      quote: '吾爱吾师，吾更爱真理。德性在于中道，它是两种过恶之间的平均状态。',
      works: '《形而上学》《尼各马可伦理学》《政治学》'
    },
    radarScores: {
      empiricismVsRationalism: 75,
      utilitarianVsDeontology: 80,
      nihilismVsExistentialism: 30,
      idealismVsMaterialism: 40
    },
    traits: ['博学渊博', '中庸节制', '体系博大', '追根溯源'],
    strengths: ['融汇理性推演与经验分类，能在对立的两端找到最成熟的平衡中道，洞悉事物目的。'],
    blindSpots: ['因追求集大成与平衡，在面对需要决绝打破旧秩序的时刻可能偏向保守。'],
    recommendedWorks: {
      book: '《尼各马可伦理学》',
      movie: '《模仿游戏》',
      game: '《刺客信条：奥德赛》'
    }
  },

  // 16. RDNM
  'RDNM': {
    code: 'RDNM',
    title: '知行合一圣哲 (The Unified Sage)',
    subtitle: '心即理，致良知；知是行之始，行是知之成，事上磨炼立不世之功',
    matchedPhilosopher: {
      id: 'wang-yangming',
      name: '王阳明 (Wang Yangming)',
      avatar: '/assets/philosophers/wang-yangming.jpg',
      quote: '无善无恶心之体，有善有恶意之动。知善知恶是良知，为善去恶是格物。此心光明，亦复何言！',
      works: '《传习录》《大学问》'
    },
    radarScores: {
      empiricismVsRationalism: 70,
      utilitarianVsDeontology: 85,
      nihilismVsExistentialism: 45,
      idealismVsMaterialism: 95
    },
    traits: ['大彻大悟', '刚毅果决', '心体光明', '绝境破壁'],
    strengths: ['真正做到了最高哲学境界与现实卓越建功立业的合一，能在绝境中激发内心的无限潜能。'],
    blindSpots: ['其学说要求极高的人格修养与心性纯度，普通人极易流于口头禅学与狂禅。'],
    recommendedWorks: {
      book: '《传习录》',
      movie: '《一代宗师》',
      game: '《只狼：影逝二度》'
    }
  }
};

// 根据 16 道思想实验选项回答计算所属哲学原型
export const calculateArchetype = (answers: Record<number, number>): PhilosophyArchetype => {
  const scores = {
    E_R: 0,
    U_D: 0,
    N_X: 0,
    I_M: 0
  };

  const counts = {
    E_R: 0,
    U_D: 0,
    N_X: 0,
    I_M: 0
  };

  // 累计得分与计数
  QUIZ_QUESTIONS_DATA.forEach(q => {
    if (answers[q.id] !== undefined) {
      scores[q.dimension] += answers[q.id];
      counts[q.dimension] += 1;
    }
  });

  // 归一化为百分比 (0-100)
  const maxPossible = 4;
  const pctR = Math.min(100, Math.max(0, Math.round(((scores.E_R + maxPossible) / (maxPossible * 2)) * 100)));
  const pctE = 100 - pctR;

  const pctD = Math.min(100, Math.max(0, Math.round(((scores.U_D + maxPossible) / (maxPossible * 2)) * 100)));
  const pctU = 100 - pctD;

  const pctX = Math.min(100, Math.max(0, Math.round(((scores.N_X + maxPossible) / (maxPossible * 2)) * 100)));
  const pctN = 100 - pctX;

  const pctM = Math.min(100, Math.max(0, Math.round(((scores.I_M + maxPossible) / (maxPossible * 2)) * 100)));
  const pctI = 100 - pctM;

  const d1 = scores.E_R >= 0 ? 'R' : 'E';
  const d2 = scores.U_D >= 0 ? 'D' : 'U';
  const d3 = scores.N_X >= 0 ? 'X' : 'N';
  const d4 = scores.I_M >= 0 ? 'M' : 'I';

  const code = `${d1}${d2}${d3}${d4}`;

  const baseArchetype = PHILOSOPHY_ARCHETYPES[code] || PHILOSOPHY_ARCHETYPES['RDXM'];

  return {
    ...baseArchetype,
    dimensionPercentages: {
      E: pctE,
      R: pctR,
      U: pctU,
      D: pctD,
      N: pctN,
      X: pctX,
      I: pctI,
      M: pctM
    }
  };
};
