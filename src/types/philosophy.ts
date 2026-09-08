export type Region = 'west' | 'east';

export type DomainCategory = 
  | 'metaphysics'      // 形而上学与本体论
  | 'epistemology'     // 认识论
  | 'ethics'           // 伦理学与人生哲学
  | 'political'        // 政治与社会哲学
  | 'mind_ai'          // 心智与前沿AI哲学
  | 'aesthetics';      // 美学

export interface CulturalEcho {
  id: string;
  type: 'movie' | 'game' | 'book' | 'art';
  title: {
    zh: string;
    en: string;
  };
  creator?: string;        // 导演/制作团队/作者/画家 (如 "克里斯托弗·诺兰", "ZA/UM", "阿尔贝·加缪")
  year?: string;
  coverImage?: string;     // 封面插画/视觉
  quote?: string;          // 核心台词/名句
  connection: string;      // 思想纽带：这部作品是如何生动诠释或反思该哲学思想的
  tags: string[];          // 关联标签 (如 "存在主义", "缸中之脑", "荒谬")
  philosopherIds?: string[]; // 关联哲人
  domain?: DomainCategory; // 关联领域
}

export interface Philosopher {
  id: string;
  name: {
    zh: string;
    en: string;
    original?: string;
  };
  eraId: string;
  lifespan: string;
  birthYear: number;       // 用于时间轴排序
  deathYear?: number;
  region: Region;
  nationality: string;     // 如 "古希腊雅典", "先秦鲁国", "普鲁士柯尼斯堡"
  avatar: string;          // 雕塑/肖像插画
  schools: string[];       // 所属流派 (如 ["儒家", "理性主义", "存在主义"])
  primaryDomain: DomainCategory;
  
  // 三层递进思想拆解
  coreInsight: string;     // 直觉层：30秒速懂的一句震撼洞见
  analogy: string;         // 通俗比喻或现代类比
  summary: string;         // 3分钟逻辑推导与时代困境剖析
  historicalImpact: string;// 为什么重要？打破了什么？
  
  keyConcepts: Array<{
    term: string;
    explanation: string;
  }>;
  famousQuotes: Array<{
    quote: string;
    source?: string;
  }>;
  notableWorks: string[];  // 核心代表著作
  
  // 师承与论辩
  influencedBy: string[];  // 师承/受启发自谁 (Philosopher IDs)
  influenced: string[];    // 启发/影响了谁 (Philosopher IDs)
  debatesWith?: Array<{
    targetId: string;
    targetName: string;
    topic: string;
    perspective: string;
  }>;

  // 跨媒介文化回响
  culturalEchoIds?: string[]; // 关联的电影/游戏/文学/画作

  // 维基权威信源：传记史诗体系
  biography?: PhilosopherBiography;
}

export interface BiographyStage {
  phase: string;          // 阶段归类 (如 "早年求学与启蒙", "流亡抗争与立言", "代表巨著与体系确立", "晚境归宿与精神殉道")
  period: string;         // 年代区间 (如 "1818 - 1843")
  title: string;          // 阶段核心标题 (如 "特里尔的叛逆青年与柏林青年黑格尔派")
  summary: string;        // 详尽维基百科与学术史料考据叙述
  keyEvents?: string[];   // 标志性事件或关键出版物
}

export interface EpistemicCrisis {
  title: string;          // 危机/顿悟事件 (如 "特尔斐神谕之谜", "从独断论迷梦中惊醒", "贵州龙场大悟")
  year?: string;          // 发生年份或时期
  narrative: string;      // 思想危机、困境渊源与心理突破叙述
  breakthrough: string;   // 这一危机对哲人核心思想转向的决定性影响
}

export interface BiographicalAnecdote {
  title: string;          // 逸事标题 (如 "柯尼斯堡市民的定时散步", "宁为泥涂之龟", "大英博物馆的贫困脚印")
  detail: string;         // 生动真实的传记史料记载
}

export interface PhilosopherBiography {
  historicalEpochBackground: string; // 身处的宏大时代风暴与社会历史矛盾
  lifeChronicle: BiographyStage[];   // 3~4个波澜壮阔的人生阶段史诗纪程
  epistemicCrisis?: EpistemicCrisis; // 思想破壁与认识论危机时刻
  anecdotes?: BiographicalAnecdote[]; // 传记生平轶事与生动注脚
  epitaphOrLegacy?: string;          // 墓志铭或思想史定论
}

export interface CoreQuestionAnalysis {
  dimension: string;      // 追问维度 (如 "宇宙始基之问", "秩序至善之问", "生命安顿之问")
  question: string;       // 核心具体问题
  explanation: string;    // 哲人们是如何回应与推演这一问题的
}

export interface EraTheme {
  id: string;
  name: {
    zh: string;
    en: string;
  };
  timeRange: string;
  startYear: number;
  endYear: number;
  vibeTitle: string;        // 时代美学风格标题 (如 "古典希腊大理石与理性黄金律")
  artMovement: string;      // 对应的艺术流派背景 (如 "古典雕塑与神庙建筑")
  artPhilosophyConnection: string; // 艺术与哲学渊源解构
  architecturalStyle?: string;     // 展厅建筑质感 (如 "多立克柱式大理石回廊")
  backgroundImage?: string;        // 展厅沉浸背景图
  masterpieceName?: {              // 展厅背景真实传世名画信息
    zh: string;
    en: string;
    artist: string;
    year: string;
    location?: string;
  };
  
  // 样式系统变量
  cssClass: string;         // 时代专属 CSS 标记
  accentColor: string;      // 强调主色
  bgGradient: string;       // 背景渐变
  cardBg: string;           // 卡片背景
  textColor: string;        // 文字颜色
  borderColor: string;      // 边框质感
  fontStyle: string;        // 字体倾向
  texturePattern: string;   // 背景纹理材质描述

  description: string;      // 时代哲学总述
  majorQuestions: string[]; // 时代核心追问

  // 深度概念与哲学使命剖析 (回应用户深入需求)
  conceptExplanation?: {
    term: string;           // 时代核心概念名称 (如 "什么是轴心文明？")
    definition: string;     // 深度概念解析
  };
  historicalCrisis?: string; // 时代历史生存危机与社会困境
  coreQuestionsAnalysis?: CoreQuestionAnalysis[]; // 这些哲学都在回答什么样的问题？
  eraManifesto?: string;    // 时代哲学宪章宣言
}

export interface BigQuestion {
  id: string;
  domain: DomainCategory;
  domainTitle: {
    zh: string;
    en: string;
  };
  question: {
    zh: string;
    en: string;
  };
  whyItMatters: string;     // 为什么这个追问与每个人息息相关？
  realWorldScenario: string;// 现实生活与科技困惑
  perspectives: Array<{
    philosopherId: string;
    philosopherName: string;
    coreArgument: string;
    stance: string;
  }>;
  culturalEchoes: CulturalEcho[];
}

export interface ThoughtExperiment {
  id: string;
  title: {
    zh: string;
    en: string;
  };
  originator: string;       // 提出者/起源
  scenario: string;         // 核心情境描述
  questionPrompt: string;   // 你的抉择是什么？
  options: Array<{
    id: string;
    text: string;
    alignedSchool: string;  // 契合流派 (如 "功利主义", "康德道义论")
    explanation: string;
    statPercentage?: number;// 全网选择参考比例
    personalityTrait: {
      dimension: 'E_R' | 'U_D' | 'N_X' | 'I_M';
      score: number;        // -1 to 1
    };
  }>;
  philosophicalDebate: string; // 哲学深度剖析与争议
  culturalConnections?: string[]; // 关联的电影/游戏/文学 (如 "《黑客帝国》", "《底特律：变人》")
}

export interface QuizQuestion {
  id: number;
  category?: 'daily_life' | 'thought_experiment'; // 篇章模块：生活日常抉择 VS 极限思想实验
  lifeSceneTitle?: string;  // 生活场景主题 (如 "购物求真与实践经验", "好友创作与善意谎言")
  scenario: string;         // 情境背景描述
  dimension: 'E_R' | 'U_D' | 'N_X' | 'I_M'; // 四大哲学基石维度
  experimentTitle?: string; // 思想实验名称 (如 "忒修斯之船 (The Ship of Theseus)")
  originator?: string;      // 实验提出者/出处 (如 "普鲁塔克 (Plutarch) & 霍布斯")
  dilemmaPrompt?: string;   // 核心哲学抉择叩问
  culturalRef?: string;     // 跨媒介文化呼应 (如 "《黑客帝国》/《银翼杀手》")
  options: [
    {
      text: string;
      subtext?: string;
      value: -1; // 偏向前者 (E, U, N, I)
      trait: string;
    },
    {
      text: string;
      subtext?: string;
      value: 1;  // 偏向后者 (R, D, X, M)
      trait: string;
    }
  ];
}

export interface PhilosophyArchetype {
  code: string;             // 如 "RDXM"
  title: string;            // 如 "理性立法者"
  subtitle: string;         // 如 "头顶星空璀璨，心中绝对道德律坚如磐石"
  matchedPhilosopher: {
    id: string;             // 先哲全局 ID (如 "kant")
    name: string;
    avatar: string;
    quote: string;
    works: string;
  };
  radarScores: {
    empiricismVsRationalism: number; // 0-100 (0=经验, 100=理性)
    utilitarianVsDeontology: number; // 0-100 (0=功利, 100=道义)
    nihilismVsExistentialism: number;// 0-100 (0=虚无, 100=存在)
    idealismVsMaterialism: number;   // 0-100 (0=心性/唯心, 100=唯物/改造)
  };
  dimensionPercentages?: {
    E: number;
    R: number;
    U: number;
    D: number;
    N: number;
    X: number;
    I: number;
    M: number;
  };
  traits: string[];
  strengths: string[];
  blindSpots: string[];
  recommendedWorks: {
    book: string;
    movie: string;
    game: string;
  };
}

export interface GraphNode {
  id: string;
  name: string;
  type: 'philosopher' | 'school' | 'concept' | 'echo';
  eraId?: string;
  region?: Region;
  val: number;              // 节点大小权重
  color?: string;
  description?: string;
  echoId?: string;          // 映射至真实文化回响 ID
}

export interface GraphLink {
  source: string;
  target: string;
  type: 'inherited' | 'critiqued' | 'inspired' | 'echoes';
  label?: string;
}

// 哲学心灵诊所（Philosophical Clinic）问诊对话记录
export interface ClinicChatMessage {
  id: string;
  sender: 'user' | 'doctor';
  text: string;
  timestamp: string;
}

// 哲学心灵诊所特聘主治先哲档案
export interface ClinicDoctorProfile {
  philosopherId: string;              // 严格映射全馆 63 位先哲
  philosopherName: string;            // 先哲中文名
  doctorTitle: string;                // 契合该病症的专科称号
  school: string;                     // 所属学派
  avatar: string;                     // 本地肖像
  matchingRationale: string;          // 为什么由该先哲接诊该病症
  quote: string;                      // 原典金句药引
}

// 哲学心灵诊所（Philosophical Clinic）处方笺核心定义
export interface ClinicPrescription {
  id: string;                         // 处方编号 (如 "RX-PHIL-2026-0819")
  userInquiry: string;                // 来访者初始主诉
  timestamp: string;                  // 问诊时间
  roundsOfConsultation: number;       // 深入问诊交谈轮数
  diagnosis: {
    syndromeTitle: string;            // 哲学病理名 (如 "目的论代偿性焦灼与虚无综合征")
    symptomDeconstruction: string;    // 现象学解构：剖析交谈中展现的表面痛苦与深层执念
    metaphysicalBlindSpot: string;    // 形而上学盲区：指出来访者暗中默认、未经审视的元假设
  };
  primaryDoctor: {
    philosopherId: string;            // 主治先哲 ID (严格映射全馆 63 位先哲)
    philosopherName: string;          // 先哲中文姓名
    doctorTitle: string;              // 专科特聘头衔 (如 "荒谬反抗与存在重构首席专科医师")
    school: string;                   // 哲学流派
    avatar: string;                   // 本地头像路径
    quote: string;                    // 原典金句药引
    analysis: string;                 // 先哲针对该病症与整场对话的长文深层辩难与剖析
  };
  consultantDoctor?: {
    philosopherId: string;            // 会诊副治先哲 ID
    philosopherName: string;
    doctorTitle: string;              // 会诊专科头衔
    school: string;
    avatar: string;
    critiqueAngle: string;            // 补充视角或辩证对冲意见
  };
  mindAntidote: string;               // 一句话思想解毒剂
  prescribedRemedy: {
    ontologicalShift: string;         // 本体论视界跃迁 (认知框架重置)
    dailyPraxis: string[];            // 3 条日常生活与微观思想修行作业
    recommendedReadings: {
      title: string;
      author: string;
      reason: string;
    }[];
  };
  suggestedDebateQuestion: string;    // 先哲留给来访者的终极闭环思考题
}


