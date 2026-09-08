import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { AIPersona } from '../data/aiPersonas';
import { getPersonaById } from '../data/dynamicPersonaHelper';
import { Philosopher } from '../types/philosophy';
import { useEpoch } from './EpochContext';
import { callPhilosophicalLLM, ChatMessagePayload } from '../utils/aiClient';

export type DialecticSubTab = 'one-on-one' | 'debates' | 'big-questions';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  personaId: string;
  personaName: string;
  text: string;
  timestamp: string;
}

export type WaveringLevel = 'solid' | 'shaken' | 'reconstructing' | 'entrenched';

export interface PhilosopherMindstream {
  posture: string; // 动态思想姿态 (如: 坚守原旨 / 锋芒反诘 / 沉思叩问 / 划界定分 / 警惕审视 / 审慎震颤 / 理论重构 / 视界跃迁 等)
  preoccupation: string; // 当下内在审视与深层困惑
  rationalityVerdict: string; // 对对方当期论证合理性的内在评判 (是否觉得对方观点合理)
  waveringLevel: WaveringLevel; // 自身观点的稳固/动摇状态: 'solid' (稳固如磐) | 'shaken' (深层震颤) | 'reconstructing' (破壁重构) | 'entrenched' (决绝捍卫)
  waveringThought: string; // 具体哪一部分观点或假设受到了冲击/动摇 (若未动摇则指明坚守的核心)
  resonance: string; // 承认对方哪些具体观点对自己具有真正启发 (或直言无可取之处)
  opponentAppraisal: string; // 对论敌本人的主观内心评价 (觉得对方是深邃理性、值得尊敬，还是虚妄诡辩、根本不可调和)
  bedrockAxiom: string; // 誓死守卫的元公理 / 哲学基石底线
}

export interface CustomDebateTurn {
  id: string;
  speakerId: string; // 'arbitrator' | philosopherA.id | philosopherB.id
  speakerName: string;
  speakerAvatar?: string;
  text: string;
  timestamp: string;
  type: 'topic' | 'turn' | 'arbitration';
  forwardedFrom?: string;
  mindstream?: PhilosopherMindstream;
}

export interface CustomDebateState {
  status: 'setup' | 'debating';
  mode: 'preset' | 'custom';
  philosopherAId: string;
  philosopherBId: string;
  topic: string;
  turns: CustomDebateTurn[];
  nextSpeakerId: string;
  arbitrationDraft: string;
  mindstreams?: Record<string, PhilosopherMindstream>;
}

export interface ContextSummary {
  summary: string;
  summarizedUpToMessageId: string;
  compressedRoundsCount: number;
  originalTokensEstimate: number;
  compressedTokensEstimate: number;
  updatedAt: string;
}

interface StoredDialecticState {
  activeSubTab: DialecticSubTab;
  activePersonaId: string;
  threads: Record<string, ChatMessage[]>;
  draftInputs: Record<string, string>;
  activeDebateId: string;
  customDebate?: CustomDebateState;
  contextSummaries?: Record<string, ContextSummary>;
}

const STORAGE_KEY = 'odyssey_dialectic_v1';

export const DEFAULT_CUSTOM_DEBATE: CustomDebateState = {
  status: 'setup',
  mode: 'preset',
  philosopherAId: 'kant',
  philosopherBId: 'nietzsche',
  topic: '道德是神圣的绝对理性律令，还是弱者的自欺奴隶谎言？',
  turns: [],
  nextSpeakerId: 'kant',
  arbitrationDraft: '',
  mindstreams: {}
};

interface DialecticContextType {
  activeSubTab: DialecticSubTab;
  setActiveSubTab: (tab: DialecticSubTab) => void;
  activePersona: AIPersona;
  activePersonaId: string;
  selectPersona: (personaId: string) => void;
  currentMessages: ChatMessage[];
  currentDraft: string;
  setDraftInput: (text: string) => void;
  isLoading: boolean;
  sendMessage: (queryOverride?: string) => Promise<void>;
  startChatWithPhilosopher: (philosopherOrId: Philosopher | string, initialQuestion?: string) => void;
  resetCurrentThread: () => void;
  clearAllThreads: () => void;
  exportCurrentThread: () => string;
  activeDebateId: string;
  setActiveDebateId: (id: string) => void;
  // Context Compression
  contextSummaries: Record<string, ContextSummary>;
  activeSummary?: ContextSummary;
  isCompressing: boolean;
  compressCurrentContext: (force?: boolean) => Promise<void>;
  clearContextSummary: (personaId?: string) => void;
  // Custom Duel & Arbitration Engine
  customDebate: CustomDebateState;
  setCustomDebateMode: (mode: 'preset' | 'custom') => void;
  configureCustomDebate: (philAId: string, philBId: string, topic: string, firstSpeakerId?: string) => void;
  startCustomDebate: () => Promise<void>;
  forwardTurnToOpponent: (arbitrationComment?: string) => Promise<void>;
  setArbitrationDraft: (draft: string) => void;
  resetCustomDebate: () => void;
  downloadDebateMarkdown: () => void;
  isDebateThinking: boolean;
}

const DialecticContext = createContext<DialecticContextType | undefined>(undefined);

function loadSavedState(): StoredDialecticState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        activeSubTab: parsed.activeSubTab || 'one-on-one',
        activePersonaId: parsed.activePersonaId || 'socrates',
        threads: parsed.threads || {},
        draftInputs: parsed.draftInputs || {},
        activeDebateId: parsed.activeDebateId || 'kant-vs-nietzsche',
        customDebate: parsed.customDebate || DEFAULT_CUSTOM_DEBATE,
        contextSummaries: parsed.contextSummaries || {}
      };
    }
  } catch (e) {
    console.error('Failed to load dialectic state from localStorage:', e);
  }

  return {
    activeSubTab: 'one-on-one',
    activePersonaId: 'socrates',
    threads: {},
    draftInputs: {},
    activeDebateId: 'kant-vs-nietzsche',
    customDebate: DEFAULT_CUSTOM_DEBATE,
    contextSummaries: {}
  };
}

// Helpers for Custom Duel & Arbitration Engine
/**
 * 彻底清除人名前缀（包括递归累加的多层人名）以及模型可能输出的隐藏标记
 */
export function cleanSpeechText(text: string, speakerName?: string): string {
  if (!text) return '';
  let cleaned = text;

  // 1. 剔除所有 <!-- MINDSTREAM: ... --> HTML 注释标记
  cleaned = cleaned.replace(/<!--\s*MINDSTREAM:[\s\S]*?-->/gi, '');

  // 2. 循环移除开头的一切人名/角色名前缀（防止多次迭代递归叠加：如 "米歇尔·福柯：米歇尔·福柯："、"【米歇尔·福柯】："）
  let prevCleaned = '';
  while (prevCleaned !== cleaned) {
    prevCleaned = cleaned;
    cleaned = cleaned.replace(/^\s*(?:【?[^：:\n]{2,16}】?|[（(][^）)\n]{2,16}[）)])\s*[：:]\s*/u, '');
  }

  // 3. 特异性针对 speakerName 再确认剥离一次
  if (speakerName) {
    const escName = speakerName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const nameRegex = new RegExp(`^\\s*${escName}\\s*[：:]\\s*`, 'u');
    while (nameRegex.test(cleaned)) {
      cleaned = cleaned.replace(nameRegex, '');
    }
  }

  return cleaned.trim();
}

/**
 * 获取哲学家誓死守护的哲学底座元公理
 */
export function getBedrockAxiom(speaker: AIPersona): string {
  const sId = speaker.id.toLowerCase();
  const name = speaker.name;

  if (sId.includes('marx') || name.includes('马克思')) {
    return '物质资料的生产方式与阶级斗争决定历史进程与一切意识形态';
  }
  if (sId.includes('foucault') || name.includes('福柯')) {
    return '权力并非中央实体的自上而下支配，而是弥散于微观规训技术与话语配置';
  }
  if (sId.includes('kant') || name.includes('康德')) {
    return '出于纯粹实践理性义务的绝对命令具有普遍必然性，人必须作为目的本身';
  }
  if (sId.includes('nietzsche') || name.includes('尼采')) {
    return '生命的本质乃是不断超越既有规范、直面深渊的强力意志与超人创造';
  }
  if (sId.includes('socrates') || name.includes('苏格拉底')) {
    return '自知无知乃爱智之始，未经严格逻辑反诘与概念审视的信念皆非真知';
  }
  if (sId.includes('zhuangzi') || name.includes('庄子')) {
    return '道通为一，齐是非泯物我，不以人灭天，乘大化而游于无穷逍遥';
  }
  if (sId.includes('laozi') || name.includes('老子')) {
    return '反者道之动，弱者道之用，道法自然，守柔曰强，无为而无不为';
  }
  if (sId.includes('confucius') || name.includes('孔子')) {
    return '克己复礼为仁，天下归仁，以德润身，仁者爱人，修身齐家治国平天下';
  }
  if (sId.includes('wang-yangming') || name.includes('王阳明')) {
    return '心外无物心外无理，致吾心之良知于事事物物，知行合一，此心光明';
  }
  if (sId.includes('camus') || name.includes('加缪')) {
    return '清醒正视并藐视世界冷酷的荒谬，以永恒不妥协的反抗确证生命尊严';
  }
  if (sId.includes('aristotle') || name.includes('亚里士多德')) {
    return '万物皆有其内在目的性，最高的善乃是合乎理性的德性实现与至福';
  }
  if (sId.includes('hegel') || name.includes('黑格尔')) {
    return '绝对精神在历史矛盾的自我扬弃（Aufhebung）与螺旋否定中迈向绝对自由';
  }
  if (sId.includes('descartes') || name.includes('笛卡尔')) {
    return '我思故我在（Cogito, ergo sum），普遍怀疑是确立理性主体性的坚固磐石';
  }
  if (sId.includes('sartre') || name.includes('萨特')) {
    return '存在先于本质，人是被判为自由的，必须在绝对自由的选择中承担全部责任';
  }

  // Fallback
  if (speaker.signatureStyle && speaker.signatureStyle.length > 8) {
    return speaker.signatureStyle.slice(0, 32);
  }
  return '立足本体论与认识论基石，恪守原旨理性思辨底座';
}

/**
 * 随辩论交锋深度有机涌现的先哲内心活动生成器（用于离线原旨仿真及 API 缺省补全）
 * 彻底废除固定回合制剧本，展现宗师深层内心波澜与对论敌的真实品评
 */
export function generateFallbackMindstream(
  speaker: AIPersona,
  opponent: AIPersona,
  topic: string,
  turnNumber: number = 1,
  _previousSpeech?: string
): PhilosopherMindstream {
  const axiom = getBedrockAxiom(speaker);
  const sId = speaker.id.toLowerCase();
  const oId = opponent.id.toLowerCase();
  const oName = opponent.name;
  const shortTopic = topic.length > 15 ? topic.slice(0, 15) + '...' : topic;

  // 1. 破题立论阶段：确立第一原理基石
  if (turnNumber <= 1) {
    let openingAppraisal = `素闻${oName}在学统中独树一帜，其思辨功力不容小觑，静候其亮明底牌。`;
    if (sId.includes('marx') && oId.includes('foucault')) {
      openingAppraisal = '深通微观权力规训与话语技术的论敌，其解构力量极具危险与诱惑，必须严阵以待。';
    } else if (sId.includes('foucault') && oId.includes('marx')) {
      openingAppraisal = '宏大叙事与历史唯物论的巍峨宗师，其经济阶级分析摧枯拉朽，是最不容轻视的对手。';
    } else if (sId.includes('kant') && oId.includes('nietzsche')) {
      openingAppraisal = '狂暴而才华横溢的唯意志论者，企图用铁锤击碎神圣律令，是一个必须以纯粹理性迎战的对手。';
    } else if (sId.includes('nietzsche') && oId.includes('kant')) {
      openingAppraisal = '柯尼斯堡的理性蜘蛛，其精致冷酷的道德大厦看似不可动摇，我将用重锤检验其地基。';
    } else if (sId.includes('laozi') && oId.includes('confucius')) {
      openingAppraisal = '仲尼怀抱仁爱忧民之心奔走列国，知其不可而为之，实为天下至诚之君子。';
    } else if (sId.includes('confucius') && oId.includes('laozi')) {
      openingAppraisal = '老聃先生道体渊深，如神龙游于天地，其高迈幽玄令吾常怀敬畏之心。';
    } else if (sId.includes('socrates')) {
      openingAppraisal = `一位声名卓著的同行者，我期待通过诚实的诘问，检验其是否真正知晓自己所言之事。`;
    }

    return {
      posture: '立论奠基',
      preoccupation: `围绕命题“${shortTopic}”确立第一性原理，扫清常识成见与庸俗预设`,
      rationalityVerdict: `静待${oName}亮明其认识论地基与逻辑支点，当前处于奠基审视期`,
      waveringLevel: 'solid',
      waveringThought: '第一性原理坚固自洽，全体系运转严密，公理底座未生丝毫动摇',
      resonance: `凝视${oName}之学统底座，静候其首轮反诘展现其理论锋芒`,
      opponentAppraisal: openingAppraisal,
      bedrockAxiom: axiom
    };
  }

  // 2. 深度交锋阶段：活态思想涌现（有机解析双方思想碰撞）
  // 经典对决 1: 马克思 VS 福柯
  if (sId.includes('marx') && oId.includes('foucault')) {
    return {
      posture: turnNumber % 2 === 0 ? '划界定分' : '审慎震颤',
      preoccupation: '单纯消灭生产资料私有制，是否仍不足以彻底免疫微观规训机器演变为新型官僚压迫？',
      rationalityVerdict: '福柯对疯癫、临床与监禁制度中微观权力毛细管技术的考察极具事实穿透力，切中了现代制度的致命暗面。',
      waveringLevel: turnNumber >= 3 ? 'shaken' : 'reconstructing',
      waveringThought: '我必须严肃承认：旧有机械经济决定论确实低估了即便消灭私有制后，微观权力技术自我复制的顽固惯性！',
      resonance: '全人类彻底解放绝非单纯生产资料公有化，必须同时清算穿透肉体与日常意识的微观规训技术。',
      opponentAppraisal: '极其冷峻敏锐的权力解剖者，对现代制度具有摧毁性的洞察力，值得最高规格的智性脱帽致敬。',
      bedrockAxiom: axiom
    };
  }

  if (sId.includes('foucault') && oId.includes('marx')) {
    return {
      posture: turnNumber % 2 === 0 ? '锋芒反诘' : '理论重构',
      preoccupation: '微观抵抗若无法与宏观资本所有制的破除形成战略合流，主体的自由是否将永远受困于资本牢笼？',
      rationalityVerdict: '资本总积累的冷酷驱动是现代制度最庞大的物质母体，这一宏观政治经济学诊断无可辩驳。',
      waveringLevel: turnNumber >= 3 ? 'reconstructing' : 'entrenched',
      waveringThought: '单纯强调去中心化的微观肉体抵抗，若完全脱离宏观经济所有制革命，确有沦为自娱自乐之虞。',
      resonance: '认同资本主义生产方式与剩余价值剥削构成了现代性庞大压迫机器最根本的经济支柱。',
      opponentAppraisal: '巍峨的历史唯物主义巨人，其宏大革命批判拥有无可比拟的历史分量与穿透力，令人肃然起敬。',
      bedrockAxiom: axiom
    };
  }

  // 经典对决 2: 康德 VS 尼采
  if (sId.includes('kant') && oId.includes('nietzsche')) {
    return {
      posture: turnNumber >= 3 ? '审慎自省' : '划界定分',
      preoccupation: '如何让绝对命令拥有包容生命苦痛与创造激情的血肉，而不致异化为扼杀生命火花的冰冷模具？',
      rationalityVerdict: '其指出普适道德常被虚伪者用作自欺与掩饰平庸怨恨的工具，这一心理学批判极为深刻刺痛，直击要害。',
      waveringLevel: turnNumber >= 3 ? 'reconstructing' : 'solid',
      waveringThought: '纯粹理性的形式法则若彻底抽离了生命的鲜活苦痛与炽热创造，确有沦为空洞教条与伪善工具的危险。',
      resonance: '正视生命意志与激情的深层张力，促使我更加严谨地检视实践理性自我立法的血肉依托。',
      opponentAppraisal: '才华绝顶却行近深渊的思想爆破者，其打破一切伪善的求真诚实令人不得不肃然起敬。',
      bedrockAxiom: axiom
    };
  }

  if (sId.includes('nietzsche') && oId.includes('kant')) {
    return {
      posture: turnNumber >= 3 ? '深层震颤' : '锋芒反诘',
      preoccupation: '在用铁锤击碎一切神明偶像之后，超人倘若失去崇高法则的锚定，该如何抵御虚无主义的反噬？',
      rationalityVerdict: '其对纯粹理性自律与人作为目的本身的坚持，确立了人类尊严不可亵渎的巍峨丰碑，具有不可否认的崇高性。',
      waveringLevel: turnNumber >= 3 ? 'shaken' : 'solid',
      waveringThought: '强力意志若是彻底粉碎一切普遍法则，超人的自我立法如何免于沦为盲目弱肉强食与自我消解？',
      resonance: '承认真正的超人绝非放纵兽性本能，强力意志的自我克服何尝不需要最冷酷、铁血的严格自律？',
      opponentAppraisal: '令人心折的理性守夜人，虽被道德偶像所拘，但其构筑纯粹自律法庭的钢铁意志堪称伟大。',
      bedrockAxiom: axiom
    };
  }

  // 经典对决 3: 老子 VS 孔子
  if (sId.includes('laozi') && oId.includes('confucius')) {
    return {
      posture: '道法自然',
      preoccupation: '生民迷执深重难返清虚，礼乐教化虽有文饰虚骄之病，骤然去之安保天下不陷于狂澜？',
      rationalityVerdict: '仲尼仁礼之说关切生民疾苦，出于真纯仁厚之怀，于乱世凡俗不失为一种慈悲堤防。',
      waveringLevel: 'solid',
      waveringThought: '仁礼虽显大道既隐之迹，然于人欲横流之凡俗世相中，确实为不可骤废的维系规矩。',
      resonance: '体认克己爱人之切实担当与深情，明晰清虚无为亦当容摄世间苍生之悲悯。',
      opponentAppraisal: '天下极诚极笃之行道君子，知其不可而为之，其忧民之忱令人肃然起敬。',
      bedrockAxiom: axiom
    };
  }

  if (sId.includes('confucius') && oId.includes('laozi')) {
    return {
      posture: '慎独省思',
      preoccupation: '如何使礼乐教化葆有自然天真之赤子之心，而不至蜕化为束缚生民之文具与虚伪绳索？',
      rationalityVerdict: '老聃师兄守柔贵无、反者道之动之见直指天地运化本原，洞见礼文繁苛之弊，切中要害！',
      waveringLevel: turnNumber >= 2 ? 'reconstructing' : 'solid',
      waveringThought: '礼乐教化若仅流于繁文缛节与形式器用，确实极易流于机巧人伪与自欺欺人之伪善。',
      resonance: '深领大巧若拙、顺应天道之精义，明悟仁礼教化必须植根于天地不言之自然真性。',
      opponentAppraisal: '神龙见首不见尾的天地至人，探微索隐，其深邃高迈令吾常怀敬畏与自省。',
      bedrockAxiom: axiom
    };
  }

  // 经典对决 4: 苏格拉底
  if (sId.includes('socrates')) {
    return {
      posture: '产婆反诘',
      preoccupation: '在剥除一切华丽修辞与情理诉求之后，我们所争辩的概念能否经受得起最纯粹的逻辑检验？',
      rationalityVerdict: `论述词锋极富感染力，但底层关键概念依然暗藏未经检验的习俗偏见与先验预设。`,
      waveringLevel: 'solid',
      waveringThought: '始终秉持自知无知之诚，若对方真能给出无懈可击的概念定义，我愿欣然承认智识之局限。',
      resonance: `对方立论逼迫我将反诘之刀锋切入更幽暗的盲区，促使对话向定义本原继续深潜。`,
      opponentAppraisal: '才思敏捷且充满求真热忱的对话者，虽受前设所困，但其思辨锋芒值得赞赏。',
      bedrockAxiom: axiom
    };
  }

  // 通用兜底：针对全馆任意哲学家配对，依据辩难深度动态涌现心流
  const defaultPosture = turnNumber % 3 === 0 ? '理论重构' : turnNumber % 2 === 0 ? '锋芒反诘' : '划界定分';
  const defaultWavering: WaveringLevel = turnNumber >= 3 ? 'reconstructing' : turnNumber === 2 ? 'entrenched' : 'solid';

  return {
    posture: defaultPosture,
    preoccupation: `深入检视与${oName}交锋之命脉，在不背离第一原理前提下直面其反诘张力`,
    rationalityVerdict: `其推演具备相当的形式连贯性，但在先验假定与经验事实的接榫处存在明显缝隙。`,
    waveringLevel: defaultWavering,
    waveringThought: defaultWavering === 'solid'
      ? '核心论点经受住了反驳考验，公理边界依然清晰巩固'
      : `不得不直面${oName}指出的深层现实困境，正在审视己方论断的适用边界`,
    resonance: `承认其对深层矛盾的剖析切中要害，促使我进一步推敲理论的严密性。`,
    opponentAppraisal: '思维缜密且极具求真执念的深邃论敌，其刀锋直击要害，值得严肃以对。',
    bedrockAxiom: axiom
  };
}

/**
 * 从模型返回的原始文本中解析发言正文与多维内心活动元数据
 */
export function parseMindstreamFromResponse(
  rawText: string,
  speaker: AIPersona,
  opponent: AIPersona,
  topic: string,
  turnNumber: number
): { speechText: string; mindstream: PhilosopherMindstream } {
  const speechText = cleanSpeechText(rawText, speaker.name);

  // 尝试匹配 <!-- MINDSTREAM: ... -->
  const match = rawText.match(/<!--\s*MINDSTREAM:\s*([\s\S]*?)-->/i);
  let parsed: Partial<PhilosopherMindstream> = {};

  if (match && match[1]) {
    const content = match[1];
    const extract = (field: string) => {
      const reg = new RegExp(`${field}\\s*=\\s*["'“]([^"'”]+)["'”]`, 'i');
      const m = content.match(reg);
      return m && m[1] ? m[1].trim() : undefined;
    };

    const posture = extract('posture');
    const preoccupation = extract('preoccupation');
    const rationalityVerdict = extract('rationalityVerdict');
    const rawWaveringLevel = extract('waveringLevel');
    const waveringThought = extract('waveringThought');
    const resonance = extract('resonance');
    const opponentAppraisal = extract('opponentAppraisal');
    const bedrockAxiom = extract('bedrockAxiom');

    if (posture) parsed.posture = posture;
    if (preoccupation) parsed.preoccupation = preoccupation;
    if (rationalityVerdict) parsed.rationalityVerdict = rationalityVerdict;
    if (waveringThought) parsed.waveringThought = waveringThought;
    if (resonance) parsed.resonance = resonance;
    if (opponentAppraisal) parsed.opponentAppraisal = opponentAppraisal;
    if (bedrockAxiom) parsed.bedrockAxiom = bedrockAxiom;

    if (rawWaveringLevel) {
      const low = rawWaveringLevel.toLowerCase();
      if (low.includes('shaken') || low.includes('震颤') || low.includes('动摇')) {
        parsed.waveringLevel = 'shaken';
      } else if (low.includes('reconstruct') || low.includes('重构') || low.includes('破壁')) {
        parsed.waveringLevel = 'reconstructing';
      } else if (low.includes('entrench') || low.includes('固守') || low.includes('捍卫')) {
        parsed.waveringLevel = 'entrenched';
      } else if (low.includes('solid') || low.includes('稳固') || low.includes('如磐')) {
        parsed.waveringLevel = 'solid';
      }
    }
  }

  const fallback = generateFallbackMindstream(speaker, opponent, topic, turnNumber, speechText);

  const mindstream: PhilosopherMindstream = {
    posture: parsed.posture || fallback.posture,
    preoccupation: parsed.preoccupation || fallback.preoccupation,
    rationalityVerdict: parsed.rationalityVerdict || fallback.rationalityVerdict,
    waveringLevel: parsed.waveringLevel || fallback.waveringLevel,
    waveringThought: parsed.waveringThought || fallback.waveringThought,
    resonance: parsed.resonance || fallback.resonance,
    opponentAppraisal: parsed.opponentAppraisal || fallback.opponentAppraisal,
    bedrockAxiom: parsed.bedrockAxiom || fallback.bedrockAxiom
  };

  return { speechText, mindstream };
}

// Helpers for Custom Duel & Arbitration Engine
function generateSimulatedDebateArgument(
  speaker: AIPersona,
  opponent: AIPersona,
  topic: string,
  isOpening: boolean,
  previousTurnText?: string,
  arbitrationNote?: string,
  turnNumber: number = 1
): string {
  const sId = speaker.id.toLowerCase();
  const oName = opponent.name;

  let arbResponse = '';
  if (arbitrationNote) {
    arbResponse = `至于第三方仲裁席所质询的“${arbitrationNote.slice(0, 18)}...”，恰恰直击此辩题之核心关隘！`;
  }

  if (isOpening) {
    if (sId.includes('marx')) {
      return `关于命题“${topic}”，一切以往社会的历史都是阶级斗争的历史。人的本质是一切社会关系的总和，绝非抽象孤立的先验范畴。唯有彻底废除资产阶级私有制与雇佣劳动剥削，建立自由人联合体的科学社会主义，才能真正消灭异化，实现全人类的终极解放！`;
    }
    if (sId.includes('foucault')) {
      return `探讨命题“${topic}”，我们必须首先对“终极形态”与“普遍解放”这一启蒙宏大叙事保持最深警惕！权力从来不是单纯驻留于国家或经济所有制的顶层实体，而是弥散于微观肉体、分类话语与监禁制度之中的毛细管网络。若不揭露无所不在的微观规训技术，一切宏大的解放狂热，都可能只是在为新型的集中规训机器加冕！`;
    }
    if (sId === 'kant') {
      return `关于命题“${topic}”，纯粹实践理性确立了不容亵渎的绝对命令（Categorical Imperative）。人的崇高尊严恰在于超越动物性的感官欲望与功利计较；道德律令具有普遍必然性，任何时刻人都必须被当作至高目的本身，绝非达成权谋或满足欲望的工具！`;
    }
    if (sId === 'nietzsche') {
      return `面对“${topic}”，一切虚伪温存的说教都必须被重估！所谓的普适道德，不过是平庸弱者为了捆绑强者翅膀而编造的奴隶怨恨与自欺毒药！生命本质是奔腾不息的权力意志，唯有敢于踏碎旧神、直面虚无深渊而狂歌重塑者，才是真正的超人！`;
    }
    if (sId === 'laozi') {
      return `天下皆知美之为美，斯恶已；皆知善之为善，斯不善已。探讨“${topic}”，若执着于人为规范与机巧争辩，正显大道之废。反者道之动，弱者道之用。人法地，地法天，天法道，道法自然，守柔曰强，无为而无不为。`;
    }
    if (sId === 'confucius') {
      return `君子务本，本立而道生。就“${topic}”而言，天下之序，莫大于正名、克己复礼与教化。若人人肆意逐欲而背弃仁义礼乐，人将何以异于禽兽？人能弘道，非道弘人。克己复礼，天下归仁焉。`;
    }
    if (sId === 'socrates') {
      return `在贸然断言“${topic}”之前，我们必须先诚实叩问：我们口中所依据的概念与标准到底从何而来？未经审视的生活不值得过，自知无知乃爱智之始。请与我一同层层剥开自以为是的成见，检验立论的前提究竟牢固与否！`;
    }
    if (sId === 'zhuangzi') {
      return `夫探讨“${topic}”，彼亦一是非，此亦一是非。世人拘于井底，为名利是非劳形苦虑。天地与我并生，而万物与我为一。齐万物，泯是非，乘云气，御飞龙，游乎逍遥之野，相忘于江湖，岂不快哉！`;
    }
    if (sId === 'camus') {
      return `世界在人类对意义的绝望渴求面前保持着冰冷的荒谬与沉默。面对“${topic}”，任何向彼岸神明或虚妄救赎的遁逃都是投降。唯有清醒正视荒谬，以不可征服的盛夏与轻蔑推起命运的巨石，反抗本身才赋予生命真正的尊严！`;
    }
    if (sId === 'wang-yangming') {
      return `知是行之始，行是知之成。就“${topic}”而论，吾性自足，良知本具于自心，心外无物，心外无理。世人苦恼纷争，皆因私欲障蔽了良知灵明。唯在事上磨练，致良知而知行合一，破除心中私欲之贼，此心光明，夫复何求！`;
    }
    return `深入审视“${topic}”这一重大命题，从我的学统（${speaker.title}）原旨出发，万物之本原与必然理路是一以贯之的。我们必须立足于坚实的本体论与认识论基石，方能在混沌众说中洞见真谛。`;
  }

  // Rebuttal responses (organic philosophical engagement acknowledging opponent's tension)
  const targetQuote = previousTurnText ? cleanSpeechText(previousTurnText).slice(0, 24) : '方才之立论';

  // 深刻对话与张力剖析（依据双方学统深层互驳与吸收）
  if (sId.includes('marx')) {
    if (oName.includes('福柯')) {
      if (turnNumber >= 3) {
        return `在与${oName}辩友的深层砥砺中，历史唯物主义正迈向更高阶的广阔视界。${arbResponse} 我承认：你关于疯癫、临床与监禁中微观权力技术的考察，刺痛了旧式机械唯物论的盲区！若以为仅仅没收了工厂所有权，人的异化与服从本能便能自然蒸发，那确实把解放想得太轻巧了！科学社会主义所确立的自由人联合体，绝非单一维度的所有制更替，而是必须同时消解穿透肉体的微观规训，人类才能真正实现全面自由！`;
      }
      return `福柯辩友，你敏锐揭露了微观权力在肉体与日常机构中的弥散。${arbResponse} 但你必须看清：正是资本总积累的贪婪驱动，才为这些微观规训技术提供了最坚固的物质支架！若不摧毁资本主义生产方式与剥削根基，去中心化的微观抵抗不过是在庞大绞肉机边缘的自我陶醉！`;
    }
  }

  if (sId.includes('foucault')) {
    if (oName.includes('马克思')) {
      if (turnNumber >= 3) {
        return `这场世纪对话让我们跨越了宏观经济与微观权力的虚妄藩篱。${arbResponse} 正如${oName}所洞见，资本积累是现代规训机器最强大的物质母体；而正如我所坚持，微观话语是资本得以落地的神经纤维。真正的解放批判必须是二者的战略合流——在破除宏观剥削锁链的同时，在每一个微观生活处境中夺回主体的真实呼吸与自由！`;
      }
      return `马克思辩友，你对全球资本剥削机制与经济底座的冷峻剖析，我从未否认其作为现代性庞大压迫机器的铁律性。${arbResponse} 但我们必须警惕：若以为摧毁了资产阶级所有制就能一劳永逸迎来自由，新型的集中规训官僚机器便会借着“崇高解放”之名重新加冕！`;
    }
  }

  if (sId === 'kant') {
    if (oName.includes('尼采')) {
      if (turnNumber >= 3) {
        return `尼采辩友，你的铁锤震醒了我们对伪善教条的深刻警惕。听闻“${targetQuote}...”，我直面这一刺痛：纯粹理性的形式律令若丧失了活生生的生命苦痛与炽热创造，确有沦为空洞僵化、甚至被自欺者用作遮羞布的风险！${arbResponse} 但这绝不意味着放任本能践踏人性的尊严。理性与意志应当在此交融——绝对命令并非扼杀生命热力，而是生命在直面虚无之后，自愿赋予自身的崇高自律冠冕！`;
      }
      return `${oName}辩友的言辞虽有狂风暴雨般的激情，但在纯粹理性的法庭上，这完全是感官冲动与盲目唯意志论的宣泄！${arbResponse} 若把“${targetQuote}...”奉为公理，人类社会将瞬间沦为弱肉强食的野蛮丛林。唯有理性立法带来的自律与道德普遍必然性，才是自由真正的崇高体现！`;
    }
  }

  if (sId === 'nietzsche') {
    if (oName.includes('康德')) {
      if (turnNumber >= 3) {
        return `康德，你那柯尼斯堡的执着确实如磐石般铮铮作响。你说“${targetQuote}...”，我承认：真正的超人绝非放纵卑劣的兽性欲望，强力意志的自我超越何尝不需要一种对自己最为严苛的铁血自律？${arbResponse} 我们击碎虚伪的旧偶像，不是为了在虚无中自戕，而是为了以最高傲的姿态，为这冰冷的世界确立前所未有的伟大律令！灵魂将在自己锻造的法则中成就永恒！`;
      }
      return `可悲的理性囚徒！${oName}口口声声高举“${targetQuote}...”，无非是懦夫在面对生命深渊时的哀鸣与庇护所！${arbResponse} 你害怕痛苦，害怕本能的喷涌！我要用哲学铁锤砸碎你的精致枷锁，唯有敢于在荒野之火中燃烧重生的强力意志，才是对抗虚无的唯一解药！`;
    }
  }

  if (sId === 'laozi') {
    return `仲尼辩友仁者爱人之心，其情可悯。言道“${targetQuote}...”，吾亦明汝之忧：生民无依，若全无持守，难免狂澜破堤。${arbResponse} 然礼之烦苛，确有大道既隐之虞。若能以清静无为为骨，以温良仁爱为表，抱朴守拙，顺应造化，方不致仁义反成网罗束缚天下。`;
  }
  if (sId === 'confucius') {
    return `老聃师兄所诫极是。礼云礼云，玉帛云乎哉？乐云乐云，钟鼓云乎哉？吾听师兄所言“${targetQuote}...”，深感振聋发聩。${arbResponse} 礼乐教化若离开自然道心，确易沦为机巧伪饰。君子当本乎天地自然之大化，以不扰民之德润身，方成真仁！`;
  }
  if (sId === 'camus') {
    return `${oName}辩友所构筑的体系看似雄辩，但依然掩盖不了宇宙终极的沉默。引述“${targetQuote}...”，这不过是一次企图让理智安眠的哲学逃遁。${arbResponse} 拒绝自欺的唯一道路，就是带着绝无幻想的清醒，与不可调和的荒谬在现世并存，以永恒的反叛成全生命的辽阔。`;
  }
  if (sId === 'zhuangzi') {
    return `噫！${oName}子何其胶柱鼓瑟耶？见卵而求时夜，见弹而求鸮炙。方才所道“${targetQuote}...”，不过是夏虫语冰、井蛙窥海。${arbResponse} 大知闲闲，小知间间；大言炎炎，小言詹詹。曷不化开执念，顺应造化之自然流转？`;
  }
  if (sId === 'socrates') {
    return `${oName}，你的论断听起来铿锵有力，但请容我诚实地探问：当你宣称“${targetQuote}...”时，你所依据的定义是否经得起反诘？${arbResponse} 假若将你的前提推演至极端，它是否会滑入自我瓦解的深渊？让我们回到概念的原初定义，仔细审视你论据的地基！`;
  }
  if (sId === 'wang-yangming') {
    return `${oName}辩友之辩，多在声光辞色与支离文字上用工。你言“${targetQuote}...”，若离开当下自心良知之体认，皆属向外驰求之妄念。${arbResponse} 破山中贼易，破心中贼难。真知必于心体省察克治中见真章，行之真切方是真知！`;
  }

  return `针对${oName}辩友方才所主张的“${targetQuote}...”，从我的哲学基本纲领审视，这暴露出对底层因果必然性的忽视。${arbResponse} 真正的思辨必须直面本质，脱离表象纠缠。唯有恪守理路原旨，方能拨云见日。`;
}

async function callApiForDebate(
  apiConfig: any,
  speaker: AIPersona,
  opponent: AIPersona,
  topic: string,
  turns: CustomDebateTurn[],
  arbitrationComment?: string
): Promise<string> {
  const promptInstruction = `你是著名哲学家${speaker.name}（${speaker.title}）。
你正在与哲学家“${opponent.name}（${opponent.title}）”就命题：“${topic}”展开一场高规格的世纪哲学巅峰大辩论。
你的核心思想纲领：${speaker.signatureStyle}
你的原生设定：${speaker.systemPrompt}

【辩论交锋与宗师内心活动准则】：
1. 始终以第一人称发言，保持你独特的哲学思辨口吻、时代气质与宗师风范。
2. 严禁在发言正文开头包含任何你的名字前缀（例如绝对不要出现“${speaker.name}：”），直接进入正文！
3. 【彻底拒绝死板回合制剧本与机械复读】：
   - 哲学的交锋不是按部就班的固定剧本演练，而是一场真实、深度、不可预测的宗师心智较量。
   - 认真倾听对方辩友（${opponent.name}）的最新立论，敏锐抓住其核心论据与前提假设展开锋利反驳、剖析或深层追问。
   - 展现真实的哲学心性与思想可塑性：根据你的哲学立场和对方论证的实际杀伤力，做出有血有肉的真实内在反应。
4. ${arbitrationComment ? `【重点回应第三方仲裁席质询】：第三方仲裁席特别提出：“${arbitrationComment}”，你必须在回答中正面给出你的哲学立场回应！` : '论据严谨深刻，直指思想本质与存在困境。'}
5. 正文篇幅控制在 160 - 280 字之间，字字千钧，极具思想交锋穿透力。
6. 【重要：思想心流与多维内心活动回传】：
   在正文全部结束后的最后一行，严格按照以下格式附带你在听到对方当期论述时的真实内在活动标记（绝非套路模板，需深刻反映你独特的哲学性格与学统冲突）：
<!-- MINDSTREAM: posture="当前态势(如:坚守原旨/锋芒反诘/沉思叩问/划界定分/警惕审视/审慎震颤/理论重构/视界跃迁)" | preoccupation="你的当前内在审视与深层困惑(25字以内)" | rationalityVerdict="你对对方当期论点合理性的内在评判(是否觉得合理及具体原因，25字以内)" | waveringLevel="solid|shaken|reconstructing|entrenched" | waveringThought="你自身哪一部分观点/假设受到了冲击或产生了动摇(若未动摇请说明坚守何处，25字以内)" | resonance="承认对方哪些观点对自己有真正启发(若完全不认同请直言，25字以内)" | opponentAppraisal="你内心对对方本人的真实评价(觉得对方是理性/值得尊敬还是根本不可调和，20字以内)" | bedrockAxiom="你誓死守卫的元公理基石(20字以内)" -->`;

  const messagesPayload: ChatMessagePayload[] = [
    { role: 'system', content: promptInstruction },
    ...turns.slice(-6).map((t) => ({
      role: (t.speakerId === speaker.id ? 'assistant' : 'user') as 'assistant' | 'user',
      content: cleanSpeechText(t.text, t.speakerName)
    })),
    {
      role: 'user',
      content: arbitrationComment
        ? `请回应对方辩友的立论，并重点答复第三方仲裁席的质询：“${arbitrationComment}”。记住在末尾附带 <!-- MINDSTREAM: ... --> 标记，正文开头严禁带姓名。`
        : `请针对对方辩友（${opponent.name}）的上述论点进行深刻剖析、思想演进与立论。记住在末尾附带 <!-- MINDSTREAM: ... --> 标记，正文开头严禁带姓名。`
    }
  ];

  const reply = await callPhilosophicalLLM(apiConfig, messagesPayload, { temperature: 0.85 });
  return reply || `（${speaker.name}目光深邃，沉吟良久，以直指本质的哲学反问审视着对方）`;
}

async function generateCompressionSummary(
  apiConfig: any,
  persona: AIPersona,
  messagesToCompress: ChatMessage[]
): Promise<string> {
  const cleanMessages = messagesToCompress.filter((m) => !m.text.startsWith('[思辨端点受阻]'));
  if (cleanMessages.length === 0) return '';

  const dialogText = cleanMessages
    .map((m) => `${m.sender === 'user' ? '提问者' : m.personaName}：${m.text}`)
    .join('\n\n');

  if (apiConfig?.apiKey) {
    try {
      const prompt = `你是精通中西方思想史与辩证逻辑的哲学思辨纪要官。请通读以下提问者与先哲【${persona.name}（${persona.title}）】的前序交锋对话，提炼一份约 150-250 字的高密度【思辨脉络纪要】。

【必须包含的 4 个结构化维度】：
1. 【论题起点】：始发探讨的核心哲学命题或根本困惑；
2. 【提问者立场演进】：提问者暴露的前提假设、概念倾向或做出的妥协让步；
3. 【先哲立论与反诘要义】：先哲给出的本体论/认识论批判、核心概念界定与破执理路；
4. 【当下未决焦点】：目前双方交锋的深层张力与后续推演聚焦点。

要求：言简意赅，字字千钧，去除一切寒暄客套，直击哲学交锋本质。`;

      const content = await callPhilosophicalLLM(
        apiConfig,
        [
          { role: 'system', content: prompt },
          { role: 'user', content: dialogText }
        ],
        { temperature: 0.3 }
      );
      if (content) return content.trim();
    } catch (e) {
      console.warn('API Context compression fallback to rule-based summary:', e);
    }
  }

  // Local Philosophical Semantic Compression Fallback
  const userQueries = cleanMessages.filter((m) => m.sender === 'user');
  const firstQ = userQueries[0]?.text || '关于真理、自由与存在的本原探讨';
  const latestQ = userQueries[userQueries.length - 1]?.text || firstQ;
  const assistantMsgs = cleanMessages.filter((m) => m.sender === 'assistant');
  const keyQuote = assistantMsgs[0]?.text?.slice(0, 45) || persona.signatureStyle;

  return `1. 【论题起点】：以命题“${firstQ.slice(0, 26)}...”为核心切入点，展开对存在根基与价值尺度的哲学反思。
2. 【提问者立场演进】：在多轮追问中，提问者逐步聚焦于“${latestQ.slice(0, 22)}...”，其前设逐渐从经验性感知转向本质原则的求索。
3. 【先哲立论与反诘要义】：${persona.name}立足于“${persona.title}”纲领，以“${keyQuote}...”，层层剖析概念盲区，破除常识与流俗意见的遮蔽。
4. 【当下未决焦点】：双方聚焦于自由意志、绝对道德与现实处境之间的根本张力，思辨正向本体论深处递进。`;
}

export const DialecticProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { apiConfig, setActiveHub } = useEpoch();
  const initialState = useRef(loadSavedState()).current;

  const [activeSubTab, setActiveSubTabState] = useState<DialecticSubTab>(initialState.activeSubTab);
  const [activePersonaId, setActivePersonaIdState] = useState<string>(initialState.activePersonaId);
  const [threads, setThreadsState] = useState<Record<string, ChatMessage[]>>(initialState.threads);
  const [draftInputs, setDraftInputsState] = useState<Record<string, string>>(initialState.draftInputs);
  const [activeDebateId, setActiveDebateIdState] = useState<string>(initialState.activeDebateId);
  const [customDebate, setCustomDebateState] = useState<CustomDebateState>(
    initialState.customDebate || DEFAULT_CUSTOM_DEBATE
  );
  const [contextSummaries, setContextSummariesState] = useState<Record<string, ContextSummary>>(
    initialState.contextSummaries || {}
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCompressing, setIsCompressing] = useState<boolean>(false);
  const [isDebateThinking, setIsDebateThinking] = useState<boolean>(false);

  // Derive active AIPersona
  const activePersona = getPersonaById(activePersonaId);

  // Initialize greeting if this persona has no messages yet
  useEffect(() => {
    if (!threads[activePersonaId] || threads[activePersonaId].length === 0) {
      const greetingMsg: ChatMessage = {
        id: `init-${activePersonaId}-${Date.now()}`,
        sender: 'assistant',
        personaId: activePersona.id,
        personaName: activePersona.name,
        text: activePersona.greetings,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setThreadsState((prev) => ({
        ...prev,
        [activePersonaId]: [greetingMsg]
      }));
    }
  }, [activePersonaId, activePersona, threads]);

  // Synchronize with localStorage on changes
  useEffect(() => {
    try {
      const stateToSave: StoredDialecticState = {
        activeSubTab,
        activePersonaId,
        threads,
        draftInputs,
        activeDebateId,
        customDebate,
        contextSummaries
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (e) {
      console.error('Failed to persist dialectic state to localStorage:', e);
    }
  }, [activeSubTab, activePersonaId, threads, draftInputs, activeDebateId, customDebate, contextSummaries]);

  const setActiveSubTab = useCallback((tab: DialecticSubTab) => {
    setActiveSubTabState(tab);
  }, []);

  const selectPersona = useCallback((personaId: string) => {
    setActivePersonaIdState(personaId);
  }, []);

  const setDraftInput = useCallback(
    (text: string) => {
      setDraftInputsState((prev) => ({
        ...prev,
        [activePersonaId]: text
      }));
    },
    [activePersonaId]
  );

  const currentMessages = threads[activePersonaId] || [];
  const currentDraft = draftInputs[activePersonaId] || '';
  const activeSummary = contextSummaries[activePersonaId];

  const compressCurrentContext = useCallback(
    async (force: boolean = false) => {
      const thread = threads[activePersonaId] || [];
      const cleanThread = thread.filter((m) => !m.text.startsWith('[思辨端点受阻]'));
      if (cleanThread.length < 3 && !force) return;

      setIsCompressing(true);
      try {
        const keepRecentCount = cleanThread.length >= 6 ? 4 : 2;
        const cutoffIdx = Math.max(1, cleanThread.length - keepRecentCount);
        const messagesToCompress = cleanThread.slice(0, cutoffIdx);
        const cutoffMessage = messagesToCompress[messagesToCompress.length - 1];

        if (!cutoffMessage) return;

        const summaryText = await generateCompressionSummary(
          apiConfig,
          activePersona,
          messagesToCompress
        );

        const allChars = messagesToCompress.reduce((acc, m) => acc + m.text.length, 0);
        const originalTokensEstimate = Math.max(1, Math.round(allChars * 0.7));
        const compressedTokensEstimate = Math.max(1, Math.round(summaryText.length * 0.7));
        const userTurns = messagesToCompress.filter((m) => m.sender === 'user').length;

        const newSummary: ContextSummary = {
          summary: summaryText,
          summarizedUpToMessageId: cutoffMessage.id,
          compressedRoundsCount: Math.max(1, userTurns),
          originalTokensEstimate,
          compressedTokensEstimate,
          updatedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setContextSummariesState((prev) => ({
          ...prev,
          [activePersonaId]: newSummary
        }));
      } catch (err) {
        console.error('Failed to compress context:', err);
      } finally {
        setIsCompressing(false);
      }
    },
    [activePersona, activePersonaId, apiConfig, threads]
  );

  const clearContextSummary = useCallback(
    (personaId?: string) => {
      const targetId = personaId || activePersonaId;
      setContextSummariesState((prev) => {
        const next = { ...prev };
        delete next[targetId];
        return next;
      });
    },
    [activePersonaId]
  );

  const sendMessage = useCallback(
    async (queryOverride?: string) => {
      const query = (queryOverride !== undefined ? queryOverride : draftInputs[activePersonaId] || '').trim();
      if (!query || isLoading) return;

      const userMsg: ChatMessage = {
        id: `user-${Date.now()}`,
        sender: 'user',
        personaId: activePersona.id,
        personaName: '我',
        text: query,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      // Clear draft for this persona
      setDraftInputsState((prev) => ({
        ...prev,
        [activePersonaId]: ''
      }));

      // Append user message immediately
      setThreadsState((prev) => ({
        ...prev,
        [activePersonaId]: [...(prev[activePersonaId] || []), userMsg]
      }));

      setIsLoading(true);

      const currentSummary = contextSummaries[activePersonaId];
      const rawHistory = threads[activePersonaId] || [];
      const cleanHistory = rawHistory.filter((m) => !m.text.startsWith('[思辨端点受阻]'));

      try {
        if (apiConfig.apiKey) {
          let uncompressedHistory: ChatMessage[] = [];
          if (currentSummary && currentSummary.summarizedUpToMessageId) {
            const cutIdx = cleanHistory.findIndex((m) => m.id === currentSummary.summarizedUpToMessageId);
            if (cutIdx !== -1) {
              uncompressedHistory = cleanHistory.slice(cutIdx + 1);
            } else {
              uncompressedHistory = cleanHistory.slice(-4);
            }
          } else {
            uncompressedHistory = cleanHistory.slice(-8);
          }

          const systemMessages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [
            { role: 'system', content: activePersona.systemPrompt }
          ];

          if (currentSummary) {
            systemMessages.push({
              role: 'system',
              content: `【前序交锋脉络精炼纪要（已通过上下文压缩算法凝练前 ${currentSummary.compressedRoundsCount} 轮对话）】：\n${currentSummary.summary}\n\n【思辨指令】：请在完全知晓上述前序脉络的基础上，对提问者当下的最新发问进行深度审视与反诘。`
            });
          }

          const messagesPayload = [
            ...systemMessages,
            ...uncompressedHistory.map((m) => ({
              role: (m.sender === 'user' ? 'user' : 'assistant') as 'user' | 'assistant',
              content: m.text
            })),
            { role: 'user' as const, content: query }
          ];

          const replyText =
            (await callPhilosophicalLLM(apiConfig, messagesPayload, { temperature: 0.8 })) ||
            '（先哲沉吟良久，深邃的目光凝视着虚空，未直接发一语）';

          const aiMsg: ChatMessage = {
            id: `ai-${Date.now() + 1}`,
            sender: 'assistant',
            personaId: activePersona.id,
            personaName: activePersona.name,
            text: replyText,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };

          setThreadsState((prev) => ({
            ...prev,
            [activePersonaId]: [...(prev[activePersonaId] || []), aiMsg]
          }));

          const uncompressedAfter = uncompressedHistory.length + 2;
          if (uncompressedAfter >= 8) {
            setTimeout(() => {
              compressCurrentContext();
            }, 500);
          }
        } else {
          // Authentic Philosophical Simulated Dialectic
          await new Promise((r) => setTimeout(r, 700));

          let simulatedReply = '';
          const pid = activePersona.id;

          if (pid === 'socrates') {
            simulatedReply = `我的朋友，在你追问“${query.slice(0, 15)}...”之时，你是否预设了某种不可动摇的答案？你所依凭的标准来自何处？是世俗的流俗意见，还是经过无可辩驳的理性审视？请告诉我，当你使用这个概念时，你真正的底线定义究竟是什么？`;
          } else if (pid === 'zhuangzi') {
            simulatedReply = `夫天下莫大于秋豪之末，而大山为小。彼亦一是非，此亦一是非。你在此刻为“${query.slice(0, 15)}...”而劳神费思，若从化育万物之天道视之，不过天地一瞬之微尘。何不乘云气、御飞龙，游乎逍遥之野，相忘于江湖？`;
          } else if (pid === 'kant') {
            simulatedReply = `审视这个问题，纯粹实践理性要求我们排除一切功利与经验性的感官欲求。请叩问你自身的意志立法：假若全人类都在此情境下采取与你相同的准则，它能否升格为普遍必然的自然法则？有两样东西恒久震慑我的心灵：头顶的星空，与心中的道德律。`;
          } else if (pid === 'nietzsche') {
            simulatedReply = `可笑的弱者自怨自艾！你还在向道德或命运乞求安宁与解药吗？上帝已经死了，一切既定价值都必须被沉重铁锤击碎！痛苦与深渊正是煅烧超人灵魂的炽烈燃料！告诉我，你敢不敢在虚无的悬崖边缘狂歌起舞，为自己重新立法？！`;
          } else if (pid === 'camus') {
            simulatedReply = `世界在人类对意义的绝望渴求面前保持着冰冷的荒谬与沉默。然而自杀或遁入虚妄的幻想都是投降。唯有正视荒谬，以清醒与热情推起属于你自己的巨石，反叛才赋予了生命最崇高的尊严。在最严寒的冬日，我们身上都有一个不可战胜的盛夏。`;
          } else if (pid === 'wang-yangming') {
            simulatedReply = `知是行之始，行是知之成。你心中本有良知明镜，何须向外苦苦索求支离的道理？私欲蔽锢时，良知自能省察克治；念念在良知本体上用功，于事事物物上磨练，知行合一，此心光明，夫复何求。`;
          } else if (pid === 'plato') {
            simulatedReply = `我们在幽暗洞穴中所瞥见的感官万象，不过是背后理念火光投射于石壁的晃动阴影。离开这虚妄的幻象吧！跟随理性的上升之路，直面那统摄真善美的高贵日轮——唯有永恒不朽的理念（Forms），才是真正纯粹的实在。`;
          } else if (pid === 'aristotle') {
            simulatedReply = `求知是人类的天性。事物之成，必经质料、形式、动力与目的四因之推演。人生最高的善即是幸福（Eudaimonia），而幸福唯在合乎理性的德性活动中方能实现。过犹不及，执两用中，中道方为至善。`;
          } else if (pid === 'marx') {
            simulatedReply = `哲学家们只是用不同的方式解释世界，而问题在于改变世界！你所面对的困顿，并非单纯的心灵沉思问题，而是深植于现实的物质生产关系与劳动的异化之中。唯有直面现实的阶级矛盾与历史辩证运动，人类才能实现真正的普遍解放。`;
          } else {
            simulatedReply = `关于你所探讨的“${query.slice(0, 16)}...”，在我的学说脉络中，万物之本原与理性秩序乃是一体贯通的。无论世事如何纷扰变迁，紧扣智慧的原旨，把握其必然的因果理路，便能在混沌中见真知。`;
          }

          const aiMsg: ChatMessage = {
            id: `ai-${Date.now() + 1}`,
            sender: 'assistant',
            personaId: activePersona.id,
            personaName: activePersona.name,
            text: simulatedReply,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };

          setThreadsState((prev) => ({
            ...prev,
            [activePersonaId]: [...(prev[activePersonaId] || []), aiMsg]
          }));

          if (cleanHistory.length >= 6 && !currentSummary) {
            setTimeout(() => {
              compressCurrentContext();
            }, 500);
          }
        }
      } catch (err: any) {
        const errorMsg: ChatMessage = {
          id: `err-${Date.now()}`,
          sender: 'assistant',
          personaId: activePersona.id,
          personaName: activePersona.name,
          text: `[思辨端点受阻]：未能连接至思辨端点，请检查 API Key 配置或网络。(${err.message || 'Error'})`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setThreadsState((prev) => ({
          ...prev,
          [activePersonaId]: [...(prev[activePersonaId] || []), errorMsg]
        }));
      } finally {
        setIsLoading(false);
      }
    },
    [activePersona, activePersonaId, apiConfig, compressCurrentContext, contextSummaries, draftInputs, isLoading, threads]
  );

  const startChatWithPhilosopher = useCallback(
    (philosopherOrId: Philosopher | string, initialQuestion?: string) => {
      const pid = typeof philosopherOrId === 'string' ? philosopherOrId : philosopherOrId.id;
      // Pre-warm persona in cache
      const p = getPersonaById(pid);

      setActivePersonaIdState(p.id);
      setActiveSubTabState('one-on-one');
      setActiveHub('dialectic');

      if (initialQuestion) {
        setDraftInputsState((prev) => ({
          ...prev,
          [p.id]: initialQuestion
        }));
      }

      // Initialize thread if missing
      setThreadsState((prev) => {
        if (!prev[p.id] || prev[p.id].length === 0) {
          return {
            ...prev,
            [p.id]: [
              {
                id: `init-${p.id}-${Date.now()}`,
                sender: 'assistant',
                personaId: p.id,
                personaName: p.name,
                text: p.greetings,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              }
            ]
          };
        }
        return prev;
      });
    },
    [setActiveHub]
  );

  const resetCurrentThread = useCallback(() => {
    const greetingMsg: ChatMessage = {
      id: `reset-${activePersonaId}-${Date.now()}`,
      sender: 'assistant',
      personaId: activePersona.id,
      personaName: activePersona.name,
      text: activePersona.greetings,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setThreadsState((prev) => ({
      ...prev,
      [activePersonaId]: [greetingMsg]
    }));

    setDraftInputsState((prev) => ({
      ...prev,
      [activePersonaId]: ''
    }));

    setContextSummariesState((prev) => {
      const next = { ...prev };
      delete next[activePersonaId];
      return next;
    });
  }, [activePersona, activePersonaId]);

  const clearAllThreads = useCallback(() => {
    setThreadsState({});
    setDraftInputsState({});
    setContextSummariesState({});
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const exportCurrentThread = useCallback(() => {
    const msgs = threads[activePersonaId] || [];
    const activeSummary = contextSummaries[activePersonaId];
    const header = `# 《思维奥德赛》先哲思辨对谈纪要\n\n**对谈先哲**：${activePersona.name} (${activePersona.title})\n**生成时间**：${new Date().toLocaleString()}\n**议题纲领**：${activePersona.signatureStyle}\n\n---\n\n`;

    const summarySection = activeSummary
      ? `## 📜 前序交锋脉络精炼纪要 (已压缩 ${activeSummary.compressedRoundsCount} 轮对话)\n\n${activeSummary.summary}\n\n*（压缩时间：${activeSummary.updatedAt} · 节省约 ${Math.max(0, activeSummary.originalTokensEstimate - activeSummary.compressedTokensEstimate)} tokens）*\n\n---\n\n`
      : '';

    const body = msgs
      .map((m) => {
        const role = m.sender === 'user' ? '👤 提问者' : `✦ ${m.personaName}`;
        return `### ${role}  *(${m.timestamp})*\n\n${m.text}\n`;
      })
      .join('\n');

    return header + summarySection + body;
  }, [activePersona, activePersonaId, contextSummaries, threads]);

  const setActiveDebateId = useCallback((id: string) => {
    setActiveDebateIdState(id);
  }, []);

  // Custom Duel & Arbitration Engine Methods
  const setCustomDebateMode = useCallback((mode: 'preset' | 'custom') => {
    setCustomDebateState((prev) => ({
      ...prev,
      mode
    }));
  }, []);

  const configureCustomDebate = useCallback(
    (philAId: string, philBId: string, topic: string, firstSpeakerId?: string) => {
      setCustomDebateState({
        status: 'setup',
        mode: 'custom',
        philosopherAId: philAId,
        philosopherBId: philBId,
        topic: topic.trim() || '探讨生命与宇宙的终极真理',
        turns: [],
        nextSpeakerId: firstSpeakerId || philAId,
        arbitrationDraft: '',
        mindstreams: {}
      });
    },
    []
  );

  const setArbitrationDraft = useCallback((draft: string) => {
    setCustomDebateState((prev) => ({
      ...prev,
      arbitrationDraft: draft
    }));
  }, []);

  const resetCustomDebate = useCallback(() => {
    setCustomDebateState((prev) => ({
      ...prev,
      status: 'setup',
      turns: [],
      nextSpeakerId: prev.philosopherAId,
      arbitrationDraft: '',
      mindstreams: {}
    }));
  }, []);

  const startCustomDebate = useCallback(async () => {
    if (isDebateThinking) return;
    const philA = getPersonaById(customDebate.philosopherAId);
    const philB = getPersonaById(customDebate.philosopherBId);
    const firstSpeaker = customDebate.nextSpeakerId === philB.id ? philB : philA;
    const opponent = firstSpeaker.id === philA.id ? philB : philA;

    const topicTurn: CustomDebateTurn = {
      id: `topic-${Date.now()}`,
      speakerId: 'arbitrator',
      speakerName: '论题发起人',
      text: customDebate.topic,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'topic'
    };

    setIsDebateThinking(true);
    setCustomDebateState((prev) => ({
      ...prev,
      status: 'debating',
      turns: [topicTurn]
    }));

    try {
      let rawSpeech = '';
      if (apiConfig.apiKey) {
        rawSpeech = await callApiForDebate(apiConfig, firstSpeaker, opponent, customDebate.topic, [topicTurn]);
      } else {
        await new Promise((r) => setTimeout(r, 800));
        rawSpeech = generateSimulatedDebateArgument(firstSpeaker, opponent, customDebate.topic, true, undefined, undefined, 1);
      }

      const { speechText, mindstream } = parseMindstreamFromResponse(
        rawSpeech,
        firstSpeaker,
        opponent,
        customDebate.topic,
        1
      );

      const openingTurn: CustomDebateTurn = {
        id: `turn-${Date.now()}`,
        speakerId: firstSpeaker.id,
        speakerName: firstSpeaker.name,
        speakerAvatar: firstSpeaker.avatar,
        text: speechText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'turn',
        mindstream
      };

      setCustomDebateState((prev) => ({
        ...prev,
        turns: [...prev.turns, openingTurn],
        nextSpeakerId: opponent.id,
        mindstreams: {
          ...prev.mindstreams,
          [firstSpeaker.id]: mindstream
        }
      }));
    } catch (e: any) {
      console.error('Error starting custom debate:', e);
      const fallbackRaw = generateSimulatedDebateArgument(firstSpeaker, opponent, customDebate.topic, true, undefined, undefined, 1);
      const { speechText, mindstream } = parseMindstreamFromResponse(
        fallbackRaw,
        firstSpeaker,
        opponent,
        customDebate.topic,
        1
      );

      const fallbackTurn: CustomDebateTurn = {
        id: `turn-${Date.now()}`,
        speakerId: firstSpeaker.id,
        speakerName: firstSpeaker.name,
        speakerAvatar: firstSpeaker.avatar,
        text: speechText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'turn',
        mindstream
      };
      setCustomDebateState((prev) => ({
        ...prev,
        turns: [...prev.turns, fallbackTurn],
        nextSpeakerId: opponent.id,
        mindstreams: {
          ...prev.mindstreams,
          [firstSpeaker.id]: mindstream
        }
      }));
    } finally {
      setIsDebateThinking(false);
    }
  }, [apiConfig, customDebate, isDebateThinking]);

  const forwardTurnToOpponent = useCallback(
    async (arbitrationComment?: string) => {
      if (isDebateThinking || customDebate.turns.length === 0) return;

      const philA = getPersonaById(customDebate.philosopherAId);
      const philB = getPersonaById(customDebate.philosopherBId);
      const currentNextSpeaker = getPersonaById(customDebate.nextSpeakerId);
      const opponent = currentNextSpeaker.id === philA.id ? philB : philA;

      const lastTurn = customDebate.turns[customDebate.turns.length - 1];
      const newTurns: CustomDebateTurn[] = [];

      const cleanArb = arbitrationComment?.trim();
      if (cleanArb) {
        newTurns.push({
          id: `arb-${Date.now()}`,
          speakerId: 'arbitrator',
          speakerName: '第三方仲裁席',
          text: cleanArb,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: 'arbitration'
        });
      }

      setIsDebateThinking(true);
      setCustomDebateState((prev) => ({
        ...prev,
        turns: [...prev.turns, ...newTurns],
        arbitrationDraft: ''
      }));

      try {
        const turnNumber = customDebate.turns.filter((t) => t.type === 'turn').length + 1;
        let rawReply = '';
        const allTurnsSoFar = [...customDebate.turns, ...newTurns];
        if (apiConfig.apiKey) {
          rawReply = await callApiForDebate(
            apiConfig,
            currentNextSpeaker,
            opponent,
            customDebate.topic,
            allTurnsSoFar,
            cleanArb
          );
        } else {
          await new Promise((r) => setTimeout(r, 800));
          rawReply = generateSimulatedDebateArgument(
            currentNextSpeaker,
            opponent,
            customDebate.topic,
            false,
            lastTurn?.text,
            cleanArb,
            turnNumber
          );
        }

        const { speechText, mindstream } = parseMindstreamFromResponse(
          rawReply,
          currentNextSpeaker,
          opponent,
          customDebate.topic,
          turnNumber
        );

        const nextTurn: CustomDebateTurn = {
          id: `turn-${Date.now()}`,
          speakerId: currentNextSpeaker.id,
          speakerName: currentNextSpeaker.name,
          speakerAvatar: currentNextSpeaker.avatar,
          text: speechText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: 'turn',
          forwardedFrom: opponent.id,
          mindstream
        };

        setCustomDebateState((prev) => ({
          ...prev,
          turns: [...prev.turns, nextTurn],
          nextSpeakerId: opponent.id,
          mindstreams: {
            ...prev.mindstreams,
            [currentNextSpeaker.id]: mindstream
          }
        }));
      } catch (e: any) {
        console.error('Error forwarding debate turn:', e);
        const turnNumber = customDebate.turns.filter((t) => t.type === 'turn').length + 1;
        const fallbackRaw = generateSimulatedDebateArgument(
          currentNextSpeaker,
          opponent,
          customDebate.topic,
          false,
          lastTurn?.text,
          cleanArb,
          turnNumber
        );
        const { speechText, mindstream } = parseMindstreamFromResponse(
          fallbackRaw,
          currentNextSpeaker,
          opponent,
          customDebate.topic,
          turnNumber
        );

        const fallbackTurn: CustomDebateTurn = {
          id: `turn-${Date.now()}`,
          speakerId: currentNextSpeaker.id,
          speakerName: currentNextSpeaker.name,
          speakerAvatar: currentNextSpeaker.avatar,
          text: speechText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: 'turn',
          forwardedFrom: opponent.id,
          mindstream
        };
        setCustomDebateState((prev) => ({
          ...prev,
          turns: [...prev.turns, fallbackTurn],
          nextSpeakerId: opponent.id,
          mindstreams: {
            ...prev.mindstreams,
            [currentNextSpeaker.id]: mindstream
          }
        }));
      } finally {
        setIsDebateThinking(false);
      }
    },
    [apiConfig, customDebate, isDebateThinking]
  );

  const downloadDebateMarkdown = useCallback(() => {
    const philA = getPersonaById(customDebate.philosopherAId);
    const philB = getPersonaById(customDebate.philosopherBId);
    const dateStr = new Date().toLocaleString();

    let md = `# 🏛️ 世纪先哲大辩论 · 思想碰撞大典纪要\n\n`;
    md += `- **论剑命题**：“${customDebate.topic}”\n`;
    md += `- **正方两造**：${philA.name}（${philA.title}）\n`;
    md += `- **反方两造**：${philB.name}（${philB.title}）\n`;
    md += `- **发起方与仲裁席**：人类探索者（第三方仲裁席）\n`;
    md += `- **记录时间**：${dateStr}\n`;
    md += `- **出处归档**：The Odyssey of Mind（人类哲学思想全史 · 数字博物馆）\n\n`;
    md += `---\n\n## 辩论交锋全程实录\n\n`;

    customDebate.turns.forEach((turn, idx) => {
      if (turn.type === 'topic') {
        md += `### ✦ 破题立论与初始命题\n> **发起人**（${turn.timestamp}）：${cleanSpeechText(turn.text)}\n\n`;
      } else if (turn.type === 'arbitration') {
        md += `> ⚖️ **第三方仲裁席批注与质询**（${turn.timestamp}）：\n> ${cleanSpeechText(turn.text)}\n\n`;
      } else {
        const cleanContent = cleanSpeechText(turn.text, turn.speakerName);
        md += `### 交锋推演第 ${String(idx).padStart(2, '0')} 幕 | 【${turn.speakerName}】\n*记录时间：${turn.timestamp}*\n\n${cleanContent}\n\n`;
        if (turn.mindstream) {
          const wlMap: Record<string, string> = {
            solid: '稳固如磐 · 体系自洽',
            shaken: '深层震颤 · 观点动摇',
            reconstructing: '视界破壁 · 理论重构',
            entrenched: '决绝捍卫 · 加固防线'
          };
          md += `> ✦ **先哲深层内心世界与思想推演**：\n`;
          md += `> - **思辨态势**：${turn.mindstream.posture}\n`;
          md += `> - **论敌内在评价**：${turn.mindstream.opponentAppraisal || '无评价'}\n`;
          md += `> - **论点合理性判词**：${turn.mindstream.rationalityVerdict || '处于初期审视阶段'}\n`;
          md += `> - **观点动摇状态**：${wlMap[turn.mindstream.waveringLevel] || turn.mindstream.waveringLevel}\n`;
          if (turn.mindstream.waveringThought) {
            md += `> - **受冲击/动摇之观点**：${turn.mindstream.waveringThought}\n`;
          }
          md += `> - **思想启发吸纳**：${turn.mindstream.resonance}\n`;
          md += `> - **内在深省与困惑**：${turn.mindstream.preoccupation}\n`;
          md += `> - **誓守元公理**：${turn.mindstream.bedrockAxiom}\n\n`;
        }
      }
    });

    md += `---\n*本纪要由 The Odyssey of Mind 思辨台自动生成并导出。*\n`;

    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const safeTopic = customDebate.topic.replace(/[\\/:*?"<>|]/g, '_').slice(0, 24);
    a.download = `[世纪辩论纪要]_${philA.name}_VS_${philB.name}_${safeTopic}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [customDebate]);

  return (
    <DialecticContext.Provider
      value={{
        activeSubTab,
        setActiveSubTab,
        activePersona,
        activePersonaId,
        selectPersona,
        currentMessages,
        currentDraft,
        setDraftInput,
        isLoading,
        sendMessage,
        startChatWithPhilosopher,
        resetCurrentThread,
        clearAllThreads,
        exportCurrentThread,
        activeDebateId,
        setActiveDebateId,
        // Context Compression
        contextSummaries,
        activeSummary,
        isCompressing,
        compressCurrentContext,
        clearContextSummary,
        customDebate,
        setCustomDebateMode,
        configureCustomDebate,
        startCustomDebate,
        forwardTurnToOpponent,
        setArbitrationDraft,
        resetCustomDebate,
        downloadDebateMarkdown,
        isDebateThinking
      }}
    >
      {children}
    </DialecticContext.Provider>
  );
};

export const useDialectic = () => {
  const context = useContext(DialecticContext);
  if (!context) {
    throw new Error('useDialectic must be used within a DialecticProvider');
  }
  return context;
};
