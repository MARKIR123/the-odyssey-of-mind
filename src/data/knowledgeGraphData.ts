import { GraphNode, GraphLink } from '../types/philosophy';

export const GRAPH_NODES: GraphNode[] = [
  // ==========================================
  // 1. 轴心时代 (Axial Age)
  // ==========================================
  { id: 'thales', name: '泰勒斯', type: 'philosopher', eraId: 'axial-age', region: 'west', val: 26, color: '#d4a359', description: '水是万物始基，西方理性自然哲学之父' },
  { id: 'heraclitus', name: '赫拉克利特', type: 'philosopher', eraId: 'axial-age', region: 'west', val: 26, color: '#d4a359', description: '人不能两次踏进同一条河流，流变与逻各斯' },
  { id: 'socrates', name: '苏格拉底', type: 'philosopher', eraId: 'axial-age', region: 'west', val: 32, color: '#d4a359', description: '无知之知，产婆诘问术与德性即知识' },
  { id: 'plato', name: '柏拉图', type: 'philosopher', eraId: 'axial-age', region: 'west', val: 34, color: '#d4a359', description: '理念论，洞穴寓言与理想国' },
  { id: 'aristotle', name: '亚里士多德', type: 'philosopher', eraId: 'axial-age', region: 'west', val: 34, color: '#d4a359', description: '四因说，实体论与中道伦理学' },
  { id: 'laozi', name: '老子', type: 'philosopher', eraId: 'axial-age', region: 'east', val: 32, color: '#ea580c', description: '道法自然，反者道之动，无为而无不为' },
  { id: 'confucius', name: '孔子', type: 'philosopher', eraId: 'axial-age', region: 'east', val: 32, color: '#ea580c', description: '克己复礼，仁者爱人与为政以德' },
  { id: 'zhuangzi', name: '庄子', type: 'philosopher', eraId: 'axial-age', region: 'east', val: 30, color: '#ea580c', description: '齐物逍遥，乘物游心与无用之大用' },

  // ==========================================
  // 2. 希腊化与中世纪 (Hellenistic & Medieval)
  // ==========================================
  { id: 'epicurus', name: '伊壁鸠鲁', type: 'philosopher', eraId: 'hellenistic-medieval', region: 'west', val: 26, color: '#c88a2e', description: '原子论与静止快乐主义，心灵宁静无求' },
  { id: 'marcus-aurelius', name: '马可·奥勒留', type: 'philosopher', eraId: 'hellenistic-medieval', region: 'west', val: 28, color: '#c88a2e', description: '斯多葛主义，控制二分法与建立内心城堡' },
  { id: 'augustine', name: '奥古斯丁', type: 'philosopher', eraId: 'hellenistic-medieval', region: 'west', val: 28, color: '#c88a2e', description: '神义论，上帝之城与光照认识论' },
  { id: 'thomas-aquinas', name: '托马斯·阿奎那', type: 'philosopher', eraId: 'hellenistic-medieval', region: 'west', val: 30, color: '#c88a2e', description: '经院哲学集大成，理性为信仰奠基五路证明' },
  { id: 'huineng', name: '六祖慧能', type: 'philosopher', eraId: 'hellenistic-medieval', region: 'east', val: 28, color: '#ea580c', description: '本来无一物，明心见性与顿悟成佛' },

  // ==========================================
  // 3. 启蒙时代与理性破晓 (Enlightenment)
  // ==========================================
  { id: 'descartes', name: '笛卡尔', type: 'philosopher', eraId: 'enlightenment', region: 'west', val: 32, color: '#d97736', description: '我思故我在，普遍怀疑与心物二元论' },
  { id: 'spinoza', name: '斯宾诺莎', type: 'philosopher', eraId: 'enlightenment', region: 'west', val: 30, color: '#d97736', description: '实体一元论，神即自然与几何学伦理学' },
  { id: 'locke', name: '洛克', type: 'philosopher', eraId: 'enlightenment', region: 'west', val: 28, color: '#d97736', description: '心灵白板说，经验主义与自然权利契约' },
  { id: 'hume', name: '休谟', type: 'philosopher', eraId: 'enlightenment', region: 'west', val: 28, color: '#d97736', description: '因果律怀疑论，经验不可知论之峰' },
  { id: 'kant', name: '康德', type: 'philosopher', eraId: 'enlightenment', region: 'west', val: 36, color: '#d97736', description: '哥白尼认识论革命，纯粹理性划界与绝对命令' },
  { id: 'wang-yangming', name: '王阳明', type: 'philosopher', eraId: 'enlightenment', region: 'east', val: 30, color: '#ea580c', description: '心即理，致良知与知行合一' },

  // ==========================================
  // 4. 十九世纪狂飙 (Nineteenth Century)
  // ==========================================
  { id: 'hegel', name: '黑格尔', type: 'philosopher', eraId: 'nineteenth-century', region: 'west', val: 34, color: '#b83a4b', description: '绝对精神辩证法，正反合与历史终结论' },
  { id: 'schopenhauer', name: '叔本华', type: 'philosopher', eraId: 'nineteenth-century', region: 'west', val: 28, color: '#b83a4b', description: '作为意志和表象的世界，悲观主义解脱之道' },
  { id: 'kierkegaard', name: '克尔凯郭尔', type: 'philosopher', eraId: 'nineteenth-century', region: 'west', val: 28, color: '#b83a4b', description: '存在主义之父，信仰纵身一跃与人生三境界' },
  { id: 'marx', name: '马克思', type: 'philosopher', eraId: 'nineteenth-century', region: 'west', val: 34, color: '#b83a4b', description: '历史唯物论，异化劳动批判与改变世界' },
  { id: 'nietzsche', name: '尼采', type: 'philosopher', eraId: 'nineteenth-century', region: 'west', val: 34, color: '#b83a4b', description: '上帝之死，超人哲学与永恒轮回权力意志' },

  // ==========================================
  // 5. 二十世纪现代转向 (Twentieth Century)
  // ==========================================
  { id: 'wittgenstein', name: '维特根斯坦', type: 'philosopher', eraId: 'twentieth-century', region: 'west', val: 30, color: '#3b82c4', description: '语言游戏论，凡不可言说者皆须保持沉默' },
  { id: 'heidegger', name: '海德格尔', type: 'philosopher', eraId: 'twentieth-century', region: 'west', val: 30, color: '#3b82c4', description: '此在（Dasein）与时间，向死而生存在论' },
  { id: 'sartre', name: '萨特', type: 'philosopher', eraId: 'twentieth-century', region: 'west', val: 30, color: '#3b82c4', description: '存在先于本质，人被判为自由并承担全责' },
  { id: 'camus', name: '加缪', type: 'philosopher', eraId: 'twentieth-century', region: 'west', val: 30, color: '#3b82c4', description: '荒谬哲学，西西弗斯的反叛与阳光' },
  { id: 'foucault', name: '福柯', type: 'philosopher', eraId: 'twentieth-century', region: 'west', val: 28, color: '#3b82c4', description: '权力谱系学，规训与全景敞视机制' },

  // ==========================================
  // 6. 当代与未来前沿 (Contemporary & Future)
  // ==========================================
  { id: 'turing', name: '图灵', type: 'philosopher', eraId: 'contemporary-future', region: 'west', val: 28, color: '#0ea5b7', description: '可计算性与机器智能，图灵测试破壁' },
  { id: 'chalmers', name: '查尔默斯', type: 'philosopher', eraId: 'contemporary-future', region: 'west', val: 26, color: '#0ea5b7', description: '意识硬难题（Hard Problem），哲学僵尸与感受质' },

  // ==========================================
  // 核心流派 (Schools)
  // ==========================================
  { id: 'school-rationalism', name: '理性主义 (Rationalism)', type: 'school', val: 22, color: '#38bdf8', description: '主张理性先验、演绎推理为知识唯一可靠源泉' },
  { id: 'school-empiricism', name: '经验主义 (Empiricism)', type: 'school', val: 22, color: '#f59e0b', description: '主张一切知识源于后天感官经验与归纳实证' },
  { id: 'school-stoicism', name: '斯多葛主义 (Stoicism)', type: 'school', val: 22, color: '#a3e635', description: '区分可控与不可控，顺应自然以达心灵平静' },
  { id: 'school-existentialism', name: '存在主义 (Existentialism)', type: 'school', val: 24, color: '#ec4899', description: '个体存在先于本质，在虚无荒谬中抉择与自塑' },
  { id: 'school-daoism', name: '道家逍遥 (Daoism)', type: 'school', val: 24, color: '#10b981', description: '道法自然，破除二元对立，乘物游心于天地' },
  { id: 'school-confucianism', name: '儒家心性 (Confucianism)', type: 'school', val: 24, color: '#f97316', description: '仁义礼智，修身齐家，致良知而内圣外王' },

  // ==========================================
  // 关键概念 (Concepts)
  // ==========================================
  { id: 'concept-cave', name: '洞穴寓言 (The Cave)', type: 'concept', val: 18, color: '#c084fc', description: '人类感官世界如囚徒所见阴影，唯有理性攀登至理念太阳' },
  { id: 'concept-mind-body', name: '身心二元 (Mind/Body)', type: 'concept', val: 18, color: '#c084fc', description: '物质延展实体与精神思维实体的本质割裂之问' },
  { id: 'concept-superman', name: '超人意志 (Übermensch)', type: 'concept', val: 18, color: '#c084fc', description: '在价值坍塌废墟中，战胜虚无而重估一切价值的创造者' },

  // ==========================================
  // 文化回响 (Cultural Echoes)
  // ==========================================
  { id: 'echo-matrix', name: '《黑客帝国》', type: 'echo', echoId: 'matrix', val: 20, color: '#10b981', description: '电影：洞穴隐喻、缸中之脑与拟像仿真' },
  { id: 'echo-disco', name: '《极乐迪斯科》', type: 'echo', echoId: 'disco-elysium', val: 20, color: '#f43f5e', description: '游戏：意识形态废墟、历史唯物与存在决断' },
  { id: 'echo-nier', name: '《尼尔：机械纪元》', type: 'echo', echoId: 'nier-automata', val: 20, color: '#8b5cf6', description: '游戏：上帝之死后人造心智的西西弗斯式探求' },
  { id: 'echo-oppenheimer', name: '《奥本海默》', type: 'echo', echoId: 'oppenheimer', val: 20, color: '#fb923c', description: '电影：科学理性反噬人类的存在性技术危机' },
  { id: 'echo-school-of-athens', name: '《雅典学院》', type: 'echo', echoId: 'school-of-athens', val: 20, color: '#eab308', description: '艺术：拉斐尔笔下人类古典哲思双峰聚首' },
  { id: 'echo-seventh-seal', name: '《第七封印》', type: 'echo', echoId: 'seventh-seal', val: 20, color: '#94a3b8', description: '电影：向死而生，十字军骑士与死神弈棋' }
];

export const GRAPH_LINKS: GraphLink[] = [
  // 轴心时代古希腊与东方谱系
  { source: 'thales', target: 'heraclitus', type: 'inherited', label: '始基探求' },
  { source: 'heraclitus', target: 'socrates', type: 'inspired', label: '逻各斯启迪' },
  { source: 'socrates', target: 'plato', type: 'inherited', label: '师徒传承' },
  { source: 'plato', target: 'aristotle', type: 'inherited', label: '师徒与实体转向' },
  { source: 'laozi', target: 'zhuangzi', type: 'inherited', label: '道家嫡传' },
  { source: 'confucius', target: 'wang-yangming', type: 'inherited', label: '心性儒学' },
  { source: 'zhuangzi', target: 'huineng', type: 'inspired', label: '禅道合流' },

  // 希腊化至中世纪
  { source: 'aristotle', target: 'thomas-aquinas', type: 'inherited', label: '经院哲学基石' },
  { source: 'plato', target: 'augustine', type: 'inspired', label: '新柏拉图神学' },
  { source: 'epicurus', target: 'marcus-aurelius', type: 'critiqued', label: '快感 vs 坚忍' },

  // 启蒙时代唯理 vs 经验 vs 批判
  { source: 'descartes', target: 'spinoza', type: 'inherited', label: '唯理论推演' },
  { source: 'locke', target: 'hume', type: 'inherited', label: '经验主义演进' },
  { source: 'descartes', target: 'kant', type: 'inspired', label: '理性先验' },
  { source: 'hume', target: 'kant', type: 'critiqued', label: '惊醒独断论迷梦' },
  { source: 'kant', target: 'hegel', type: 'inspired', label: '德国观念论' },

  // 十九世纪颠覆与批判
  { source: 'hegel', target: 'marx', type: 'critiqued', label: '辩证法唯物化' },
  { source: 'kant', target: 'schopenhauer', type: 'inspired', label: '物自体意志化' },
  { source: 'schopenhauer', target: 'nietzsche', type: 'critiqued', label: '悲观转为权力意志' },
  { source: 'hegel', target: 'kierkegaard', type: 'critiqued', label: '反叛普遍精神' },

  // 二十世纪现代与存在主义
  { source: 'kierkegaard', target: 'sartre', type: 'inspired', label: '存在先于本质' },
  { source: 'nietzsche', target: 'camus', type: 'inspired', label: '荒谬与反抗' },
  { source: 'nietzsche', target: 'foucault', type: 'inspired', label: '权力谱系' },
  { source: 'heidegger', target: 'sartre', type: 'inspired', label: '存在论演进' },
  { source: 'descartes', target: 'wittgenstein', type: 'critiqued', label: '破除心智隐喻' },

  // 当代心智与未来
  { source: 'turing', target: 'chalmers', type: 'critiqued', label: '图灵机 vs 意识难题' },
  { source: 'descartes', target: 'chalmers', type: 'inspired', label: '新二元论' },

  // 流派归属
  { source: 'descartes', target: 'school-rationalism', type: 'inherited' },
  { source: 'spinoza', target: 'school-rationalism', type: 'inherited' },
  { source: 'locke', target: 'school-empiricism', type: 'inherited' },
  { source: 'hume', target: 'school-empiricism', type: 'inherited' },
  { source: 'marcus-aurelius', target: 'school-stoicism', type: 'inherited' },
  { source: 'sartre', target: 'school-existentialism', type: 'inherited' },
  { source: 'camus', target: 'school-existentialism', type: 'inspired' },
  { source: 'kierkegaard', target: 'school-existentialism', type: 'inspired' },
  { source: 'laozi', target: 'school-daoism', type: 'inherited' },
  { source: 'zhuangzi', target: 'school-daoism', type: 'inherited' },
  { source: 'confucius', target: 'school-confucianism', type: 'inherited' },
  { source: 'wang-yangming', target: 'school-confucianism', type: 'inherited' },

  // 关键概念链接
  { source: 'plato', target: 'concept-cave', type: 'inherited', label: '提出' },
  { source: 'descartes', target: 'concept-mind-body', type: 'inherited', label: '奠定' },
  { source: 'nietzsche', target: 'concept-superman', type: 'inherited', label: '提出' },

  // 文化回响跨媒介共鸣
  { source: 'concept-cave', target: 'echo-matrix', type: 'echoes', label: '母体隐喻' },
  { source: 'descartes', target: 'echo-matrix', type: 'echoes', label: '恶魔怀疑' },
  { source: 'marx', target: 'echo-disco', type: 'echoes', label: '废墟批判' },
  { source: 'sartre', target: 'echo-disco', type: 'echoes', label: '存在决断' },
  { source: 'nietzsche', target: 'echo-nier', type: 'echoes', label: '上帝之死' },
  { source: 'camus', target: 'echo-nier', type: 'echoes', label: '西西弗斯' },
  { source: 'descartes', target: 'echo-oppenheimer', type: 'echoes', label: '机械物理' },
  { source: 'plato', target: 'echo-school-of-athens', type: 'echoes', label: '壁画中心' },
  { source: 'aristotle', target: 'echo-school-of-athens', type: 'echoes', label: '壁画中心' },
  { source: 'marcus-aurelius', target: 'echo-seventh-seal', type: 'echoes', label: '向死而生' }
];
