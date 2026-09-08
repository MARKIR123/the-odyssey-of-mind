export interface PhilosophicalTheory {
  id: string;
  eraId: string;
  name: {
    zh: string;
    en: string;
  };
  symbol: string;
  badge: string;
  precedingCrisis?: {
    zh: string;
    en: string;
  };
  coreThesis: {
    zh: string;
    en: string;
  };
  historicalQuestion: {
    zh: string;
    en: string;
  };
  significance: {
    zh: string;
    en: string;
  };
  dialecticalClash?: {
    zh: string;
    en: string;
  };
  philosopherIds: string[];
  culturalEchoIds: string[];
  accentColor: string;
}

export const THEORIES_DATA: PhilosophicalTheory[] = [
  // =========================================================
  // ERA 1: 轴心文明与古典源头 (The Axial Age & Classical Antiquity)
  // =========================================================
  {
    id: 'theory-natural-arche',
    eraId: 'axial-age',
    name: {
      zh: '自然哲学与万物始基论',
      en: 'Pre-Socratic Naturalism & Arche'
    },
    symbol: '🌊',
    badge: 'THEORY 01',
    precedingCrisis: {
      zh: '荷马与赫西俄德的神话宇宙将日月风雷归于神祇喜怒，无法提供可经验证、自洽客观的自然因果律。',
      en: 'Mythological cosmology attributed natural phenomena to whims of anthropomorphic deities, lacking falsifiable causal law.'
    },
    coreThesis: {
      zh: '宇宙是由内在统一的客观物质与不可动摇的恒常法则（Logos）构成的，世界并非诸神任意创造，其本体可以被人类理性把握。',
      en: 'The cosmos is constituted by an underlying unified physical substratum and governed by invariant logos, intelligible to human reason without divine whim.'
    },
    historicalQuestion: {
      zh: '纷繁复杂的万物流变生灭背后，统一的终极物质始基与转化规律是什么？',
      en: 'Behind the perpetual flux of generation and decay, what is the immutable primordial substance and cosmic law?'
    },
    significance: {
      zh: '标志着人类理性从蒙昧神话中的惊险飞跃，奠定了物理学、宇宙论与唯物经验观察的最初源头。',
      en: 'Marked the decisive leap from myth to rational inquiry, founding cosmology and empirical physics.'
    },
    dialecticalClash: {
      zh: '「水、火与原子之辩」：泰勒斯主张水润万物，赫拉克利特断言万物皆流、唯变不变（Logos为尺度），德谟克利特则推导出不可再分的微观原子与虚空。',
      en: 'Arche Disputes: Thales posits water, Heraclitus sees perpetual fire in logos flux, Democritus deduces indivisible atoms in void.'
    },
    philosopherIds: ['thales', 'heraclitus', 'democritus'],
    culturalEchoIds: ['solaris'],
    accentColor: '#d4a359'
  },
  {
    id: 'theory-forms-rationalism',
    eraId: 'axial-age',
    name: {
      zh: '古典理性与理念/实体形而上学',
      en: 'Classical Rationalism, Forms & Substance'
    },
    symbol: '🏛️',
    badge: 'THEORY 02',
    precedingCrisis: {
      zh: '前苏格拉底始基说互不相让，催生智者学派的相对主义诡辩（“人是万物的尺度”），雅典陷入城邦内耗与道德伦理虚无。',
      en: 'Conflicting pre-Socratic arche theories sparked Sophist relativism ("man is the measure"), deteriorating democratic polis into moral anarchy.'
    },
    coreThesis: {
      zh: '感官可见之物皆为流变虚影，唯有超越可感世界的永恒理念（Forms）才是真理本体；理性能够认知永恒，美德即知识。',
      en: 'Sensory objects are ephemeral shadows; immutable transcendental Forms alone embody authentic truth. Virtue is knowledge.'
    },
    historicalQuestion: {
      zh: '若感官经验处处流变受限，确定不易的客观真理与城邦最高至善何以可能？',
      en: 'If sensory perception is inherently deceitful and fluctuating, how can infallible epistemic truth and moral justice be established?'
    },
    significance: {
      zh: '确立了本质与现象、主体与客体的二元框架，构建了西方两千五百年来形而上学、演绎逻辑与科学哲学的核心坐标。',
      en: 'Established the quintessential dichotomy of appearance vs. reality, cementing 2,500 years of Western metaphysics.'
    },
    dialecticalClash: {
      zh: '「理念天国 vs 现实实体」：柏拉图主张走出肉身洞穴凝视彼岸太阳理念；亚里士多德直言“吾爱吾师，吾更爱真理”，形式不可割裂于具体质料之中。',
      en: 'Forms vs. Substance: Plato points skyward to transcendental realm; Aristotle grounds formal causes in concrete, empirical composite matter.'
    },
    philosopherIds: ['socrates', 'plato', 'aristotle'],
    culturalEchoIds: ['school-of-athens', 'matrix'],
    accentColor: '#d4a359'
  },
  {
    id: 'theory-dao-nature',
    eraId: 'axial-age',
    name: {
      zh: '天道自然、仁礼与天下秩序',
      en: 'Daoist Metaphysics & Confucian Humanism'
    },
    symbol: '☯️',
    badge: 'THEORY 03',
    precedingCrisis: {
      zh: '周室衰微、礼崩乐坏、诸侯兼并，神权天命神话瓦解，华夏大地陷入尸横遍野的春秋战国乱世。',
      en: 'The collapse of Zhou ritual order plunged China into relentless Warring States carnage, shattering ancient theocratic legitimacy.'
    },
    coreThesis: {
      zh: '道法自然、反朴归真，在宇宙生生不息的大化中体悟齐物逍遥；同时以仁爱内圣为源泉，克己复礼以定天下公序。',
      en: 'Dao models cosmic spontaneity, dissolving egoistic strife in transcendence; while Confucian benevolence reconstructs societal harmony through moral self-cultivation.'
    },
    historicalQuestion: {
      zh: '礼崩乐坏的血火乱世中，个体生命如何求得安顿？人类社会如何重建政治正义与天下大同？',
      en: 'Amidst catastrophic war and moral disintegration, how does the individual preserve inner peace, and how can society rebuild enduring virtue?'
    },
    significance: {
      zh: '奠定了东方文明“天人合一”、“内圣外王”、“知行合一”的深厚根基，成为东亚两千余年精神世界与社会治理的骨骼与血脉。',
      en: 'Anchored the profound East Asian civilization paradigm of cosmic unity, benevolent governance, and poetic existential freedom.'
    },
    dialecticalClash: {
      zh: '「逍遥无为 vs 仁义名教」：老庄批判人为道德造作导致天下大乱，主张顺应大道天真；孔孟则强调君子当以天下为己任，知其不可而为之。',
      en: 'Spontaneous Non-Action vs. Ethical Duty: Daoism rejects artificial moral dogmatism; Confucianism champions unyielding social responsibility.'
    },
    philosopherIds: ['laozi', 'confucius', 'zhuangzi'],
    culturalEchoIds: ['disco-elysium'],
    accentColor: '#d4a359'
  },

  // =========================================================
  // ERA 2: 希腊化、罗马与中世纪经院 (Hellenistic, Roman & Medieval)
  // =========================================================
  {
    id: 'theory-hellenistic-ethics',
    eraId: 'hellenistic-medieval',
    name: {
      zh: '希腊化伦理学与心灵避难所',
      en: 'Hellenistic Ethics: Stoicism & Epicureanism'
    },
    symbol: '🏛️',
    badge: 'THEORY 04',
    precedingCrisis: {
      zh: '亚历山大征服与罗马军团踏平希腊城邦民主，个体沦为辽阔帝国中身不由己的卑微臣民，古典城邦政治哲学彻底幻灭。',
      en: 'The crushing of polis autonomy by imperial Rome rendered classical civic virtue obsolete, isolating the citizen into a powerless subject.'
    },
    coreThesis: {
      zh: '哲学是心灵的拯救医术：区分可控之内心与不可控之厄运，以理性的“绝对不动心（Ataraxia）”或消除恐惧的恬淡自适，在残酷乱世中保有尊严。',
      en: 'Philosophy as spiritual medicine: bifurcate what is within control from external fate, attaining invulnerable peace through tranquil fortitude or moderate pleasure.'
    },
    historicalQuestion: {
      zh: '当外界政治不可抗拒、命运暴虐无常时，个体心灵如何达成不可剥夺的绝对安宁？',
      en: 'When imperial oppression and mortality are unavoidable, how can the isolated soul cultivate an unassailable fortress of internal serenity?'
    },
    significance: {
      zh: '将哲学焦点从外在制度转向内心操练与心理韧性，成为古罗马法治精神、现代认知疗法（CBT）与抗逆力哲学的鼻祖。',
      en: 'Pioneered spiritual exercises, personal resilience, and internal sovereignty, laying foundations for cognitive behavioral psychology.'
    },
    dialecticalClash: {
      zh: '「斯多葛坚忍 vs 伊壁鸠鲁退隐」：马可·奥勒留倡导在履行命运职责中保持磐石般坚忍；伊壁鸠鲁则主张避开喧嚣政治花园，消除死神恐惧。',
      en: 'Stoic Cosmic Duty vs. Epicurean Garden Retreat: Aurelius embraces civic burden with endurance; Epicurus seeks moderate retreat from public vanity.'
    },
    philosopherIds: ['seneca', 'marcus-aurelius', 'epicurus', 'epictetus'],
    culturalEchoIds: ['seventh-seal'],
    accentColor: '#c88a2e'
  },
  {
    id: 'theory-patristic-neoplatonism',
    eraId: 'hellenistic-medieval',
    name: {
      zh: '教父神学与新柏拉图流溢论',
      en: 'Patristic Philosophy & Neoplatonism'
    },
    symbol: '✝️',
    badge: 'THEORY 05',
    precedingCrisis: {
      zh: '古罗马帝国晚期蛮族入侵与信仰崩塌，古典异教神话无法安顿人类苦难灵魂，新兴基督教面临异教哲人的理性嘲讽。',
      en: 'Barbarian sacks of Rome and spiritual void exposed pagan decay, leaving Christianity urgent need to defend revelation against Greek philosophy.'
    },
    coreThesis: {
      zh: '宇宙万物由至高超越之“太一（The One）/上帝”逐层神圣流溢而出；恶不是实体而是善的匮乏；信仰先于理解，理智因神圣光照而通达真理。',
      en: 'All being emanates from the transcendent One/Godhead; evil is merely the privation of good; faith precedes understanding and illuminates intellect.'
    },
    historicalQuestion: {
      zh: '如果神是全善全能的创世主，苦难与恶从何而来？人如何凭借灵魂阶梯回归超越的永恒救赎？',
      en: 'If the Creator is omnipotent and good, what is the origin of evil? How can the fallen soul ascend the spiritual ladder to salvation?'
    },
    significance: {
      zh: '成功完成了希腊古典哲学与基督教神学的首次历史性大融合，确立了西方中世纪一千年的神学世界观与心理自省传统。',
      en: 'Consummated the historic marriage of Greek ontology and Christian revelation, shaping medieval consciousness.'
    },
    dialecticalClash: {
      zh: '「神恩光照 vs 原罪堕落」：奥古斯丁力辩意志自由与神恩拣选，与伯拉纠主义激烈辩难，奠定了西方原罪论与救赎论基石。',
      en: 'Grace vs. Free Will: Augustine champions sovereign grace against Pelagian optimism, formalizing original sin theology.'
    },
    philosopherIds: ['augustine', 'plotinus'],
    culturalEchoIds: ['incredulity-thomas'],
    accentColor: '#c88a2e'
  },
  {
    id: 'theory-scholasticism-universals',
    eraId: 'hellenistic-medieval',
    name: {
      zh: '经院哲学大综合与唯名论转向',
      en: 'High Scholasticism & The Crisis of Universals'
    },
    symbol: '⚖️',
    badge: 'THEORY 06',
    precedingCrisis: {
      zh: '十字军东征带回被阿拉伯学者保存的亚里士多德自然科学与因果逻辑全书，传统教会教条面临被自然理性撕碎的空前危机。',
      en: 'The recovery of Aristotelian natural science via Islamic scholars posed an existential challenge to dogmatic Christian fideism.'
    },
    coreThesis: {
      zh: '理智与启示是同一真理之光的两道射线；阿奎那构建信仰的理性五路证明；而奥卡姆挥动简约剃刀，宣告共相只是名称，撕开科学实证之门。',
      en: 'Faith and reason are harmonious rays of divine truth; Aquinas erects logical proofs of God, while Ockham shears away metaphysical universals.'
    },
    historicalQuestion: {
      zh: '理性逻辑能否独立论证超验信仰？抽象普遍概念（共相）是独立客观实在，还是仅仅是人类经验的心智代号？',
      en: 'Can human logic independently demonstrate transcendental truths? Are universals substantial entities or mere nominal conventions?'
    },
    significance: {
      zh: '阿奎那奠定了天主教权威神学体系；唯名论革命则敲响了中世纪经院哲学的丧钟，直接催生了文艺复兴与近代经验科学革命。',
      en: 'Thomism formalized canonical Catholic epistemology, while Ockham’s nominalism dissolved scholastic reification, sparking modern empirical science.'
    },
    dialecticalClash: {
      zh: '「唯实论 vs 唯名论（奥卡姆剃刀）」：阿奎那坚持共相客观实在；奥卡姆反诘“若无必要，勿增实体”，将存在归还给具体个体。',
      en: 'Realism vs. Nominalism: Aquinas defends real universals; Ockham wields his razor, asserting only individual empirical particulars exist.'
    },
    philosopherIds: ['thomas-aquinas', 'william-ockham'],
    culturalEchoIds: ['brothers-karamazov'],
    accentColor: '#c88a2e'
  },

  // =========================================================
  // ERA 3: 文艺复兴与启蒙理性 (Enlightenment & Rationalism)
  // =========================================================
  {
    id: 'theory-continental-rationalism',
    eraId: 'enlightenment',
    name: {
      zh: '大陆唯理论与第一原理奠基',
      en: 'Continental Rationalism & Methodic Doubt'
    },
    symbol: '💡',
    badge: 'THEORY 07',
    precedingCrisis: {
      zh: '中世纪神学世界观被哥白尼与伽利略击穿，感官欺骗性暴露，欧洲思想界陷入无所适从的皮浪怀疑主义泥潭。',
      en: 'The scientific revolution demolished scholastic dogmatism, yet sensory illusions cast European thought into paralyzing Pyrrhonian skepticism.'
    },
    coreThesis: {
      zh: '通过普遍怀疑剔除一切假定，确立“我思故我在”的第一真理基石；真理的终极源泉是人类心灵中天赋的理性明晰与必然演绎。',
      en: 'Through radical hyperbolic doubt, "Cogito, ergo sum" emerges as infallible foundation; genuine truth flows from innate rational clear and distinct ideas.'
    },
    historicalQuestion: {
      zh: '在一切经验表象都可被怀疑欺骗的情况下，人类如何获得毫无破绽、具有绝对必然性的科学第一原理？',
      en: 'When all sensory appearances can be doubted, how can humanity discover an unshakable Archimedean point of absolute knowledge?'
    },
    significance: {
      zh: '发动了欧洲哲学的“认识论转向”，确立了现代哲学以“主体（Subject）”为核心的理性主义与数学机械自然观。',
      en: 'Initiated the modern epistemological turn, enthroning human cognitive subjectivity and mathematical-mechanistic science.'
    },
    dialecticalClash: {
      zh: '「笛卡尔心物二元论 vs 斯宾诺莎实体泛神论」：笛卡尔割裂思维与广延；斯宾诺莎反诘实体唯有一，神即全包容的大自然（Deus sive Natura）。',
      en: 'Dualism vs. Monism: Descartes bifurcates mind and matter; Spinoza unifies them as infinite attributes of one self-caused Nature.'
    },
    philosopherIds: ['descartes', 'spinoza', 'leibniz'],
    culturalEchoIds: ['oppenheimer'],
    accentColor: '#d97736'
  },
  {
    id: 'theory-british-empiricism',
    eraId: 'enlightenment',
    name: {
      zh: '英国经验论与休谟怀疑论危机',
      en: 'British Empiricism & Humean Crisis'
    },
    symbol: '🔬',
    badge: 'THEORY 08',
    precedingCrisis: {
      zh: '唯理论者闭门造车凭空虚构“天赋观念”，无法与现实经验事实相互校验；科学需要以牛顿实验观察为标准。',
      en: 'Rationalists invented ungrounded "innate ideas" without empirical verification; modern physics demanded inductive observational accountability.'
    },
    coreThesis: {
      zh: '人心初生如同一块白板（Tabula Rasa），一切观念无一不源于感官经验；然而休谟彻底揭示：因果律只是习惯性联想，科学必然性根本无法被理性证实。',
      en: 'The mind is a tabula rasa; all ideas originate in sensory impressions. Hume demonstrates induction and causality are mere psychological habits, not logical necessities.'
    },
    historicalQuestion: {
      zh: '知识的真实来源到底是什么？如果因果律无法被经验严格证实，科学规律的普遍必然性立足于何处？',
      en: 'What is the genuine origin of ideas? If causal necessity cannot be perceived empirically, does objective scientific certainty collapse?'
    },
    significance: {
      zh: '休谟以致命的怀疑论炸醒了整个西方思想界，宣告了古典形而上学体系的破产，直接倒逼出康德批判哲学的诞生。',
      en: 'Hume’s devastating critique shattered classical dogmatism, awakening Kant from his "dogmatic slumber" and inaugurating critical philosophy.'
    },
    dialecticalClash: {
      zh: '「洛克白板说 vs 贝克莱主观唯心 vs 休谟怀疑论」：从感官是认识源泉，推演至“存在即被感知”，最终在休谟手中粉碎了因果实在性。',
      en: 'Empirical Trajectory: Locke’s tabula rasa evolves into Berkeley’s idealism ("esse est percipi"), culminating in Hume’s radical inductive skepticism.'
    },
    philosopherIds: ['locke', 'berkeley', 'hume'],
    culturalEchoIds: ['thinker-rodin'],
    accentColor: '#d97736'
  },
  {
    id: 'theory-social-contract',
    eraId: 'enlightenment',
    name: {
      zh: '社会契约论与政治启蒙自由',
      en: 'Social Contract & Political Enlightenment'
    },
    symbol: '📜',
    badge: 'THEORY 09',
    precedingCrisis: {
      zh: '“君权神授”封建王权阻碍资本主义工商业发展，惨烈的三十年宗教战争摧毁了传统统治合法性，欧洲亟需新型政治权力基石。',
      en: 'Divine right of kings collapsed under religious civil wars and merchant empowerment, demanding purely secular rational legitimacy for political power.'
    },
    coreThesis: {
      zh: '国家合法性不在于神授或血统，而在于理性公民平等的社会契约；权力必须分立制衡以保障公民天赋之生命、自由与财产权。',
      en: 'Legitimate political rule derives solely from voluntary social contract among free equals; governance exists to secure natural rights via checks and balances.'
    },
    historicalQuestion: {
      zh: '生而自由的人类为何自愿服从国家统治？暴政践踏公意时，人民是否享有神圣的抗争与革命之权？',
      en: 'Why would autonomous individuals surrender liberty to a sovereign state? When despotism reigns, do citizens possess the right to revolution?'
    },
    significance: {
      zh: '直接点燃了美国独立战争与法国大革命的火种，构筑了现代宪政民主、分权制衡与人权宣言的法理基石。',
      en: 'Direct catalyst for the American and French Revolutions, establishing modern constitutionalism, division of power, and universal human rights.'
    },
    dialecticalClash: {
      zh: '「霍布斯利维坦专制 vs 洛克分权自由 vs 卢梭公意民主」：霍布斯主张集权以止内乱；洛克主张私权至上与制衡；卢梭主张人民主权与道德公意。',
      en: 'Absolutism vs. Liberalism vs. Popular Sovereignty: Hobbes cedes all to the Leviathan; Locke limits power to protect property; Rousseau champions the General Will.'
    },
    philosopherIds: ['hobbes', 'rousseau', 'montesquieu'],
    culturalEchoIds: ['matrix'],
    accentColor: '#d97736'
  },

  // =========================================================
  // ERA 4: 十九世纪狂飙与批判意志 (19th Century Romanticism)
  // =========================================================
  {
    id: 'theory-german-idealism',
    eraId: 'nineteenth-century',
    name: {
      zh: '德国古典唯心论：康德革命与黑格尔辩证法',
      en: 'German Idealism: Kantian Revolution & Hegelian Dialectics'
    },
    symbol: '⚡',
    badge: 'THEORY 10',
    precedingCrisis: {
      zh: '休谟怀疑论推翻了科学因果律的客观必然性；唯理论沦为无凭无据的独断论；欧洲哲学陷入前所未有的认知瘫痪。',
      en: 'Hume’s inductive skepticism destroyed scientific certainty, while rationalism degenerated into groundless dogmatism.'
    },
    coreThesis: {
      zh: '认识论哥白尼革命——人为自然界立法；主体先天认知形式赋予经验以秩序；黑格尔更将真理动态化为“绝对精神”在历史激荡中的正反合自我扬弃。',
      en: 'Copernican revolution: the mind constructs phenomenal nature; Hegel dynamically unifies subject and substance into the self-actualizing historical Absolute Spirit.'
    },
    historicalQuestion: {
      zh: '既具普遍必然性又能拓展实际经验的真理如何可能？人类历史演进是否具有终极理性目的？',
      en: 'How are synthetic a priori judgments possible? Is human historical trajectory a progression towards absolute self-conscious freedom?'
    },
    significance: {
      zh: '康德划定了人类理性的边界并拯救了自然科学与道德律；黑格尔构建了人类历史上最庞大精密的思辨辩证法宇宙。',
      en: 'Kant delineated the limits of pure reason, safeguarding science and morality; Hegel constructed the crowning summit of systemic speculative metaphysics.'
    },
    dialecticalClash: {
      zh: '「康德不可知物自体 vs 黑格尔绝对唯心一元」：康德严守现象与物自体的天堑；黑格尔断言“凡合乎理性的皆合乎现实”，理性足以彻底统摄全景。',
      en: 'Kantian Dualism vs. Hegelian Panlogism: Kant limits knowledge to phenomena; Hegel obliterates the thing-in-itself, identifying the real with the rational.'
    },
    philosopherIds: ['kant', 'hegel', 'fichte'],
    culturalEchoIds: ['wanderer-fog'],
    accentColor: '#b83a4b'
  },
  {
    id: 'theory-historical-materialism',
    eraId: 'nineteenth-century',
    name: {
      zh: '历史唯物主义与政治经济学批判',
      en: 'Historical Materialism & Critique of Capitalism'
    },
    symbol: '⚒️',
    badge: 'THEORY 11',
    precedingCrisis: {
      zh: '黑格尔体系将人类历史描绘为纯粹抽象精神的自我游荡；而现实工业社会中，工人阶级深陷残酷异化、童工剥削与绝望贫困，思辨哲学脱离血肉苦难。',
      en: 'Hegelian speculative idealism treated history as disembodied spirit, ignoring brutal industrial exploitation, starvation wages, and human alienation.'
    },
    coreThesis: {
      zh: '不是意识决定生活，而是生活决定意识；物质生产方式与阶级斗争是历史变迁的真正火车头；哲学家们只是解释世界，问题在于改变世界！',
      en: 'Social being determines consciousness; material relations of production drive history through class struggle; the point is not merely to interpret the world, but to change it.'
    },
    historicalQuestion: {
      zh: '人类社会形态演进的真正物质规律是什么？资本剥削与劳动者全面异化的根源与解放路径何在？',
      en: 'What is the material dynamic of historical transformation? How can systemic capitalist commodification and human alienation be revolutionized?'
    },
    significance: {
      zh: '宣告了传统形而上学神话的终结，将哲学与政治经济学、社会阶级解放实践熔铸为一，彻底重塑了全球现代政治版图。',
      en: 'Terminated armchair metaphysics, anchoring philosophy in socio-economic revolution and reshaping global geopolitics.'
    },
    dialecticalClash: {
      zh: '「唯心倒转为唯物」：马克思将黑格尔倒立的辩证法重新双脚着地，以现实的经济基础与生产力矛盾取代虚幻的绝对观念。',
      en: 'Turning Hegel Right-Side Up: Marx grounds dialectical movement in material forces of production rather than mystical spiritual self-evolution.'
    },
    philosopherIds: ['marx', 'engels', 'feuerbach'],
    culturalEchoIds: ['disco-elysium'],
    accentColor: '#b83a4b'
  },
  {
    id: 'theory-philosophy-of-will',
    eraId: 'nineteenth-century',
    name: {
      zh: '意志哲学与生存虚无主义反叛',
      en: 'Philosophy of Will & The Death of God'
    },
    symbol: '🌪️',
    badge: 'THEORY 12',
    precedingCrisis: {
      zh: '启蒙运动许诺的“理性进步必然带来幸福”破产；现代大机器生产压抑人性本能；基督教奴隶道德走向虚伪僵死。',
      en: 'The Enlightenment dream of rational utopia collapsed into mechanical alienation; Victorian morality repressed vital human instincts.'
    },
    coreThesis: {
      zh: '世界本质不是理性逻辑，而是盲目奔涌的生命意志；尼采宣告“上帝死了”，号召重估一切价值，以“超人”与权力意志战胜虚无深渊。',
      en: 'The primordial essence of reality is non-rational blind Will. Nietzsche announces the Death of God, demanding the transvaluation of all values through the Will to Power.'
    },
    historicalQuestion: {
      zh: '在形而上学神话破灭、上帝退场的终极虚无面前，孤立个体如何超越痛苦，迸发出生命的炽烈之美？',
      en: 'In the abyss of nihilism following the demise of metaphysical absolutes, how does authentic human will celebrate existence and conquer despair?'
    },
    significance: {
      zh: '炸碎了西方两千年的理性主义与基督教道德神话，直接启迪了弗洛伊德精神分析、现代主义文学与存在主义思想。',
      en: 'Demolished millennia of rationalism and slave morality, igniting psychoanalysis, literary modernism, and existentialism.'
    },
    dialecticalClash: {
      zh: '「叔本华悲观禁欲 vs 尼采酒神悲剧狂欢」：叔本华主张看破生命之苦趋向清心寡欲；尼采反诘应当热爱命运（Amor Fati），在酒神精神中热烈拥抱苦难与创造。',
      en: 'Schopenhauerian Resignation vs. Nietzschean Dionysian Affirmation: Pessimistic ascetic denial opposing ecstatic amor fati and creative overcoming.'
    },
    philosopherIds: ['schopenhauer', 'nietzsche', 'kierkegaard'],
    culturalEchoIds: ['blade-runner'],
    accentColor: '#b83a4b'
  },

  // =========================================================
  // ERA 5: 二十世纪现代主义与双峰转向 (20th Century Modernism)
  // =========================================================
  {
    id: 'theory-linguistic-turn',
    eraId: 'twentieth-century',
    name: {
      zh: '语言转向与逻辑实证主义',
      en: 'The Linguistic Turn & Analytic Philosophy'
    },
    symbol: '📐',
    badge: 'THEORY 13',
    precedingCrisis: {
      zh: '传统形而上学争论两千年无实质进展，其命题既无法经验证实又逻辑含混；日常语言的歧义成为思想的紧箍咒。',
      en: 'Traditional metaphysics stagnated in insoluble verbal pseudoproblems generated by logical ambiguities of natural language.'
    },
    coreThesis: {
      zh: '哲学不是学说，而是澄清语言逻辑的工作；语言的界限即世界的界限；凡能说的事皆能说清，不可说的必须保持沉默。',
      en: 'Philosophy is linguistic therapy and logical analysis; the limits of my language mean the limits of my world. What can be said can be said clearly; whereof one cannot speak, thereof one must be silent.'
    },
    historicalQuestion: {
      zh: '哲学研究的真正合法边界何在？一个命题如何才能具有确定无误的意义与可证伪性？',
      en: 'What constitutes legitimate cognitive meaning? How can propositions be rigorously demarcated from metaphysical nonsense?'
    },
    significance: {
      zh: '奠定了英美百年分析哲学传统，催生了数理逻辑、现代计算机编程语言与科学哲学实证标准。',
      en: 'Established Anglo-American analytic hegemony, inspiring mathematical logic, computer language syntax, and Popperian philosophy of science.'
    },
    dialecticalClash: {
      zh: '「前期逻辑图式 vs 后期生活语言游戏」：早期维特根斯坦追求命题与世界的晶体逻辑镜像；后期颠覆自我，揭示语言是嵌入生活形式的多元工具游戏。',
      en: 'Picture Theory vs. Language Games: Early Wittgenstein seeks crystalline logical isomorphism; late Wittgenstein embraces fluid, contextual socio-linguistic practices.'
    },
    philosopherIds: ['frege', 'russell', 'wittgenstein', 'popper'],
    culturalEchoIds: ['space-odyssey'],
    accentColor: '#3b82c4'
  },
  {
    id: 'theory-phenomenology-existentialism',
    eraId: 'twentieth-century',
    name: {
      zh: '现象学直观与存在主义荒谬抉择',
      en: 'Phenomenology & Existential Freedom'
    },
    symbol: '🕯️',
    badge: 'THEORY 14',
    precedingCrisis: {
      zh: '实证科学把世界还原为冷酷冷漠的物理原子，两次世界大战将数千万人送进绞肉机，人类直面深渊般的“生之荒谬”。',
      en: 'Positivism emptied human consciousness of meaning, while total world wars plunged European humanity into existential vertigo.'
    },
    coreThesis: {
      zh: '面向事情本身；存在先于本质——人不是现成被定义的机器，而是被判定为拥有绝对自由，必须在荒谬世界中通过决断自负其责。',
      en: 'To the things themselves; existence precedes essence. Humans possess no preordained nature; we are condemned to be free and forge selfhood through authentic choice.'
    },
    historicalQuestion: {
      zh: '在上帝缺席、死亡注定、万物毫无既定意义的荒谬处境中，个体如何承担自由与此在的真实存在？',
      en: 'In a godless, absurd universe shadowed by mortality, how can mortal Dasein live authentically and assume total existential responsibility?'
    },
    significance: {
      zh: '深刻治愈了现代人的精神异化与虚无恐惧，对战后文学、心理学、电影艺术（存在主义戏剧与新浪潮）产生了决定性塑造。',
      en: 'Rescued subjective human inwardness from reductive scientism, galvanizing twentieth-century arts, theater, and existential psychotherapy.'
    },
    dialecticalClash: {
      zh: '「海德格尔此在之谜 vs 萨特绝对自由 vs 加缪荒谬反抗」：海德格尔深究“存在”的本体遗忘；萨特高呼行动中自我造就；加缪则主张在西西弗斯的无休抗争中领受幸福。',
      en: 'Ontological Dasein vs. Radical Political Action vs. Absurdist Revolt: Heidegger unpacks Being-towards-death; Sartre commands political commitment; Camus celebrates defiant lucidity.'
    },
    philosopherIds: ['husserl', 'heidegger', 'sartre', 'camus'],
    culturalEchoIds: ['nighthawks'],
    accentColor: '#3b82c4'
  },
  {
    id: 'theory-critical-theory',
    eraId: 'twentieth-century',
    name: {
      zh: '法兰克福学派与工具理性异化批判',
      en: 'Critical Theory & The Frankfurt School'
    },
    symbol: '⚙️',
    badge: 'THEORY 15',
    precedingCrisis: {
      zh: '启蒙理性本承诺带来自由，却在20世纪异化出纳粹奥斯维辛工业化屠杀、极权统治与大众文化工业的普遍奴役。',
      en: 'The Enlightenment promise of human liberation inverted into industrial death camps, totalitarian terror, and homogenizing capitalist culture industries.'
    },
    coreThesis: {
      zh: '理性已经变质为算计效率与统治自然的“工具理性”；大众文化工业制造了丧失反思与否定维度的“单向度的人”。',
      en: 'Substantive human reason was reduced to instrumental efficiency and dominance over nature; mass culture constructs pacified "one-dimensional" conformists.'
    },
    historicalQuestion: {
      zh: '为什么人类科学技术与生产力的极度繁荣，反倒沦为对人性更深层、更精致的精神规训与控制？',
      en: 'Why does supreme technological progress coincide with profound psychological subjugation and democratic decay?'
    },
    significance: {
      zh: '开创了当代新马克思主义批判范式，奠定了大众传播学、媒介批判、消费社会学与现代生态哲学的批判武器。',
      en: 'Inaugurated cultural studies, media critique, and ecological sociology, unmasking structural alienation inside advanced industrial democracies.'
    },
    dialecticalClash: {
      zh: '「启蒙辩证自戕 vs 单向度抗争」：阿多诺悲观断言“奥斯维辛之后写诗是野蛮的”；马尔库塞则期许在青年运动与艺术审美中唤醒激进否定力量。',
      en: 'Tragic Dialectic vs. Great Refusal: Adorno diagnoses total reification; Marcuse seeks emancipation through counter-cultural aesthetic resistance.'
    },
    philosopherIds: ['adorno', 'horkheimer', 'marcuse', 'benjamin'],
    culturalEchoIds: ['ex-machina'],
    accentColor: '#3b82c4'
  },

  // =========================================================
  // ERA 6: 当代前沿、解构与数智未来 (Contemporary & Post-Humanity)
  // =========================================================
  {
    id: 'theory-postmodern-deconstruction',
    eraId: 'contemporary-future',
    name: {
      zh: '后现代主义、微观权力与解构谱系',
      en: 'Postmodernism, Micro-Power & Deconstruction'
    },
    symbol: '🪞',
    badge: 'THEORY 16',
    precedingCrisis: {
      zh: '一切宏大叙事（启蒙理性的历史必然进步、黑格尔整体真理）被识破为内嵌西方中心主义、知识独裁与话语暴力的神话。',
      en: 'Grand meta-narratives were exposed as totalizing instruments of Western-centric hegemony, disciplinary violence, and ideological exclusion.'
    },
    coreThesis: {
      zh: '不存在先验中心与绝对本质；知识即权力，真理是修辞的虚构；通过解构（Deconstruction）释放意义的无限“延异（Différance）”；现实已被拟像（Simulacra）吞噬。',
      en: 'There is no transcendental signified; knowledge is inexorably intertwined with micro-power. Deconstruction liberates text into infinite différance; simulacra precede reality.'
    },
    historicalQuestion: {
      zh: '在宏大叙事彻底瓦解后，微观权力如何规训身体？在拟态符号充斥的后工业社会中，真实与虚构的边界何在？',
      en: 'When foundational truth dissolves, how do institutional discourses discipline human bodies? How can authenticity survive inside hypersaturated simulacra?'
    },
    significance: {
      zh: '重创了现代主义的单一真理神话，为女性主义、后殖民批判、多元文化与现代艺术审美实验开辟了广袤疆域。',
      en: 'Dismantled foundationalism, fueling post-colonialism, gender theory, fluid subjectivity, and radical contemporary aesthetics.'
    },
    dialecticalClash: {
      zh: '「福柯微观权力敞视 vs 德里达文本延异 vs 鲍德里亚拟像狂欢」：福柯解构身体规训与疯癫谱系；德里达瓦解逻各斯中心论；鲍德里亚宣告真实已死。',
      en: 'Panoptic Discipline vs. Textual Différance vs. Hyperreality: Foucault maps institutional regimes; Derrida unweaves binaries; Baudrillard diagnoses consumer simulation.'
    },
    philosopherIds: ['foucault', 'derrida', 'baudrillard', 'deleuze'],
    culturalEchoIds: ['matrix'],
    accentColor: '#0ea5b7'
  },
  {
    id: 'theory-philosophy-of-mind',
    eraId: 'contemporary-future',
    name: {
      zh: '心智哲学与意识的困难问题',
      en: 'Philosophy of Mind & The Hard Problem'
    },
    symbol: '🧠',
    badge: 'THEORY 17',
    precedingCrisis: {
      zh: '脑科学与计算机科学一日千里，物理还原论宣称“大脑就是电脑，思维就是算法”，却无法跨越主观体验的解释鸿沟。',
      en: 'Cognitive neuroscience and computing reduced mind to physical synapses, but hit an explanatory abyss regarding subjective qualitative feeling (qualia).'
    },
    coreThesis: {
      zh: '意识具有不可还原的“困难问题”——主观感受质（Qualia）无法单凭物理计算消除；图灵机可以模拟语法，却无法产生真正的语义理解与心灵体验。',
      en: 'The Hard Problem: subjective qualia cannot be reduced to functional computation. Syntax does not equal semantics; computers simulate without understanding.'
    },
    historicalQuestion: {
      zh: '三磅重的大脑物理电信号，究竟为何且如何产生出看见红色的鲜活主观体验？强人工智能能拥有真正的灵魂吗？',
      en: 'Why should physical neuronal electrochemistry give rise to rich inner subjective experience? Can artificial neural networks ever possess conscious minds?'
    },
    significance: {
      zh: '构成了当前AI前沿、认知科学与脑机接口技术最具挑战性的形而上学试金石，划定了图灵计算与人类意识的终极边界。',
      en: 'The definitive philosophical crucible for generative AI and cognitive neuroscience, delineating the frontier between syntax and genuine consciousness.'
    },
    dialecticalClash: {
      zh: '「查尔默斯唯心二元 vs 塞尔中文屋 vs 丹尼特功能消融」：查尔默斯主张意识是宇宙基本属性；塞尔以中文屋反驳AI语义；丹尼特则宣称意识只是一种认知错觉。',
      en: 'Property Dualism vs. Chinese Room vs. Functional Eliminativism: Chalmers defends irreducibility of qualia; Searle refutes AI comprehension; Dennett deflates consciousness as functional illusion.'
    },
    philosopherIds: ['chalmers', 'searle', 'nagel', 'dennett'],
    culturalEchoIds: ['her-movie'],
    accentColor: '#0ea5b7'
  },
  {
    id: 'theory-posthuman-cybernetics',
    eraId: 'contemporary-future',
    name: {
      zh: '控制论、赛博格与后人类/AI终极伦理',
      en: 'Cybernetics, Cyborgs & Post-Humanity'
    },
    symbol: '🤖',
    badge: 'THEORY 18',
    precedingCrisis: {
      zh: '大语言模型、基因工程与脑机接口将智人推向生物演化临界点，传统的古典“人类中心主义”伦理体系彻底土崩瓦解。',
      en: 'Frontier generative models, bio-engineering, and BCIs propel Homo sapiens to post-biological boundaries, rendering anthropocentric ethics obsolete.'
    },
    coreThesis: {
      zh: '打破人与动物、人与机器的二元边界（赛博格宣言）；在人机共生与加速迭代中，人类必须直面超级智能的存在性风险与物种演化责任。',
      en: 'Abolish the organic/machine dualism through cyborg symbiosis; confront technological acceleration and existential catastrophic risks of superintelligence.'
    },
    historicalQuestion: {
      zh: '当算法比人类更懂人类、机器能自主决策与繁衍时，人之所以为人的本质何在？超级智能时代人类文明将走向何方？',
      en: 'When artificial agency eclipses biological intellect, what defines human essence? How do we navigate technological singularity without civilizational extinction?'
    },
    significance: {
      zh: '直面人类心智奥德赛的终极未知，构成了全球人工智能治理（AI Alignment）、后人类主义哲学与宇宙生存论的最前沿灯塔。',
      en: 'Pioneering beacon for AI existential alignment, transhumanism, and planetary civilizational responsibility in the twenty-first century.'
    },
    dialecticalClash: {
      zh: '「哈拉维赛博格共生 vs 波斯特罗姆存在性对齐危机」：哈拉维主张拥抱混合共生打破父权控制；波斯特罗姆系统警示AI对齐难题与人类灭绝风险。',
      en: 'Cyborg Emancipation vs. Superintelligent Existential Risk: Haraway celebrates hybrid fluidity; Bostrom warns of uncontrollable cognitive divergence.'
    },
    philosopherIds: ['donna-haraway', 'nick-bostrom', 'hans-jonas'],
    culturalEchoIds: ['cyberpunk-2077'],
    accentColor: '#0ea5b7'
  }
];
