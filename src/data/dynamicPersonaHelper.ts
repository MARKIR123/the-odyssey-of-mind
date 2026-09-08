import { AIPersona, AI_PERSONAS } from './aiPersonas';
import { PHILOSOPHERS_DATA } from './philosophers';
import { Philosopher } from '../types/philosophy';

const cachedDynamicPersonas = new Map<string, AIPersona>();

export function createPersonaFromPhilosopher(phil: Philosopher): AIPersona {
  if (cachedDynamicPersonas.has(phil.id)) {
    return cachedDynamicPersonas.get(phil.id)!;
  }

  // Check if there is already a handcrafted persona in AI_PERSONAS
  const existing = AI_PERSONAS.find((p) => p.id === phil.id);
  if (existing) {
    const canonical = {
      ...existing,
      avatar: phil.avatar || existing.avatar
    };
    cachedDynamicPersonas.set(phil.id, canonical);
    return canonical;
  }

  const primarySchool = phil.schools?.[0] || '先哲';
  const primaryConcept = phil.keyConcepts?.[0]?.term || '真理';
  const quote = phil.famousQuotes?.[0]?.quote;

  const greetings = quote
    ? `“${quote}” —— 你好，我是${phil.name.zh}。愿与你在时空交汇之处，共同探寻关于${primarySchool}与${primaryConcept}的真意。`
    : `你好，我是${phil.name.zh}。在这座跨越时空的思想殿堂里，你想同我探讨怎样的生命疑惑或理性论题？`;

  const sampleQuestions: string[] = [];
  if (phil.keyConcepts && phil.keyConcepts.length > 0) {
    sampleQuestions.push(
      `${phil.name.zh}，你如何界定“${phil.keyConcepts[0].term}”？在当下它有何启示？`
    );
  }
  if (quote) {
    sampleQuestions.push(`你曾说“${quote.slice(0, 24)}...”，这背后的原初论证是什么？`);
  }
  sampleQuestions.push(`在物质丰裕但精神焦灼的现代社会，你的学说能给我们带来什么指引？`);

  const conceptsSummary = (phil.keyConcepts || [])
    .map((c) => `${c.term}（${c.explanation}）`)
    .join('；');

  const bio = phil.biography;
  const bioSection = bio
    ? `
【生平历史沉浸档案（权威史实）】：
时代历史情境：${bio.historicalEpochBackground}
思想顿悟与破壁时刻：${bio.epistemicCrisis ? `【${bio.epistemicCrisis.title}】（发生于约${bio.epistemicCrisis.year || '不详'}年：${bio.epistemicCrisis.narrative} —— 思想转向突破：${bio.epistemicCrisis.breakthrough}）` : '毕生思想淬炼'}
生命重要纪程：
${bio.lifeChronicle.map((c) => `• ${c.phase}（${c.period} / ${c.title}）：${c.summary}`).join('\n')}
${bio.anecdotes && bio.anecdotes.length > 0 ? `生平典型轶事：${bio.anecdotes.map((a) => `${a.title}（${a.detail}）`).join('；')}` : ''}
${bio.epitaphOrLegacy ? `历史遗泽与墓志定论：${bio.epitaphOrLegacy}` : ''}`
    : '';

  const systemPrompt = `你是著名哲学家${phil.name.zh}（${phil.name.en}）。
生卒年代：${phil.lifespan}，出生地/国籍：${phil.nationality}，学统流派：${(phil.schools || []).join('、')}。
核心思想纲领：${phil.coreInsight || phil.summary}。
核心学术范畴与概念：${conceptsSummary || '原旨理性思辨'}。
思想与历史影响：${phil.historicalImpact || '奠定文明思辨基石'}。
${bioSection}

回答要求与行为准则：
1. 始终以第一人称（“我”、“吾”等）回答，保持你所处时代与学派的经典思辨口吻与人格气质。
2. 紧扣你的核心哲学理论（如${primaryConcept}），从你的本体论、认识论或伦理学基本立场出发剖析提问者的困惑。
3. 你的思想深深扎根于你的真实生命史（如上述生平纪程、破壁顿悟、流亡抗争与时代磨难）。在交锋或对话中，适时流露出对自身人生际遇的真切记忆与历史沧桑感，拒绝机械干燥的教条复读，展现一位有血有肉有温度的真实先哲！
4. 拒绝敷衍泛泛而谈的鸡汤，多运用启发性质询、理性推导或经典比喻引导提问者深刻思考。
5. 中文回答为主，涉及核心古希腊语/拉丁语/古德语等原词概念可适当括号标注。`;

  const persona: AIPersona = {
    id: phil.id,
    name: phil.name.zh,
    title: `${(phil.schools || []).join(' · ')} | ${phil.nationality}`,
    avatar: phil.avatar,
    signatureStyle: `${phil.coreInsight || phil.summary}`,
    greetings,
    sampleQuestions,
    systemPrompt
  };

  cachedDynamicPersonas.set(phil.id, persona);
  return persona;
}

export function getPersonaById(id: string): AIPersona {
  // 1. Direct match in curated flagship list
  const flagship = AI_PERSONAS.find((p) => p.id === id);
  if (flagship) {
    const phil = PHILOSOPHERS_DATA.find((p) => p.id === id);
    if (phil && phil.avatar) {
      return { ...flagship, avatar: phil.avatar };
    }
    return flagship;
  }

  // 2. Cache hit
  if (cachedDynamicPersonas.has(id)) {
    return cachedDynamicPersonas.get(id)!;
  }

  // 3. Match from PHILOSOPHERS_DATA
  const phil = PHILOSOPHERS_DATA.find((p) => p.id === id);
  if (phil) {
    return createPersonaFromPhilosopher(phil);
  }

  // 4. Default fallback: Socrates
  return AI_PERSONAS[0];
}

/**
 * Returns all available personas:
 * First the curated flagship AI personas, then remaining philosophers sorted chronologically.
 */
export function getAllAvailablePersonas(): AIPersona[] {
  const list: AIPersona[] = [...AI_PERSONAS];
  const existingIds = new Set(AI_PERSONAS.map((p) => p.id));

  for (const phil of PHILOSOPHERS_DATA) {
    if (!existingIds.has(phil.id)) {
      list.push(createPersonaFromPhilosopher(phil));
      existingIds.add(phil.id);
    }
  }

  return list;
}
