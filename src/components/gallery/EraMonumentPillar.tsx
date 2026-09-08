import React from 'react';
import { EraTheme } from '../../types/philosophy';

interface EraMonumentPillarProps {
  era: EraTheme;
  eraIdx: number;
  themeCfg: {
    monumentClass: string;
    frameClass: string;
    heroFrameClass: string;
    dividerClass: string;
    accent: string;
    roomSymbol: string;
    fontFamily: string;
  };
  language: 'zh' | 'en';
}

interface EraArchitecturalConfig {
  pngImg: string;
  stagePos: string;
  titleFont: string;
  ornament: string;
  ornamentClass: string;
  titleEn: string;
  titleZh: string;
  timeRange: string;
  subtitleZh: string;
  subtitleEn: string;
  titleColorClass: string;
  subtitleColorClass: string;
  hairlineClass: string;
  // Section 1: Epigraph
  epigraphTitleZh: string;
  epigraphTitleEn: string;
  epigraphTitleClass: string;
  quoteZh: string;
  quoteEn: string;
  quoteClass: string;
  authorZh: string;
  authorEn: string;
  authorClass: string;
  // Section 2: Essence
  essenceTitleZh: string;
  essenceTitleEn: string;
  essenceTitleClass: string;
  essenceTextZh: string;
  essenceTextEn: string;
  essenceTextClass: string;
  // Section 3: Inquiries
  inquiryTitleZh: string;
  inquiryTitleEn: string;
  inquiryTitleClass: string;
  inquiriesZh: { dim: string; q: string }[];
  inquiriesEn: { dim: string; q: string }[];
  thinkersZh: string;
  thinkersEn: string;
  inquiryTextClass: string;
  bulletDotClass: string;
}

const ERA_ARCHITECTURAL_CONFIGS: Record<string, EraArchitecturalConfig> = {
  // =========================================================================
  // ROOM 01: 轴心文明与古典源头 (Doric Temple Stele · Honed Limestone)
  // =========================================================================
  'axial-age': {
    pngImg: '/assets/monuments/axial_monolithic_stele_clean.png?v=20260906c',
    stagePos: 'left-[14%] right-[14%] top-[24%] bottom-[10.5%]',
    titleFont: "'Cinzel', 'Noto Serif SC', serif",
    ornament: '✦   P A R T H E N O N   ✦',
    ornamentClass: 'text-[#6d3e12] [text-shadow:0_1px_0_rgba(255,255,255,0.85)]',
    titleEn: 'THE AXIAL AGE',
    titleZh: '轴心文明与古典源头',
    timeRange: 'BC 800 - BC 200',
    subtitleZh: '古希腊理性觉醒与始基追问',
    subtitleEn: 'Classical Awakening of Reason & Logos',
    titleColorClass: 'text-[#0d0501] [text-shadow:0_1px_0_rgba(255,255,255,0.85)]',
    subtitleColorClass: 'text-[#422208] [text-shadow:0_1px_0_rgba(255,255,255,0.8)]',
    hairlineClass: 'from-transparent via-[#784618]/50 to-transparent',
    epigraphTitleZh: '「古典理性主义 · LOGOS」',
    epigraphTitleEn: '「CLASSICAL LOGOS」',
    epigraphTitleClass: 'text-[#150701] [text-shadow:0_1px_0_rgba(255,255,255,0.85)]',
    quoteZh: '“未经审视的人生是不值得度过的。万物源于原初始基，理性照亮城邦公义。”',
    quoteEn: '“The unexamined life is not worth living. Primal reason illuminates civic justice.”',
    quoteClass: 'text-[#0d0501] [text-shadow:0_1px_0_rgba(255,255,255,0.85)]',
    authorZh: '—— 苏格拉底 · 《申辩篇》',
    authorEn: '—— Socrates · Apology',
    authorClass: 'text-[#4f2708] [text-shadow:0_1px_0_rgba(255,255,255,0.7)]',
    essenceTitleZh: '「从神话走向理性」',
    essenceTitleEn: '「From Mythos to Logos」',
    essenceTitleClass: 'text-[#150701] [text-shadow:0_1px_0_rgba(255,255,255,0.85)]',
    essenceTextZh: '希腊先哲破除原始巫术神话，以自主理性叩问宇宙始基、城邦契约与德性本质，奠定了人类哲思的永久母体。',
    essenceTextEn: 'Greek thinkers transcended mythic dogma, employing autonomous reason to investigate cosmic Arche and civic virtue, forging the permanent bedrock of philosophy.',
    essenceTextClass: 'text-[#140803] [text-shadow:0_1px_0_rgba(255,255,255,0.8)]',
    inquiryTitleZh: '「三大终极追问」',
    inquiryTitleEn: '「Three Grand Inquiries」',
    inquiryTitleClass: 'text-[#150701] [text-shadow:0_1px_0_rgba(255,255,255,0.85)]',
    inquiriesZh: [
      { dim: '始基', q: '万物生灭流变背后，宇宙根本原初何在？' },
      { dim: '正义', q: '在动荡城邦中，人应当如何建立良治契约？' },
      { dim: '至善', q: '面对苦难与虚妄，灵魂如何在沉思中接近至善？' }
    ],
    inquiriesEn: [
      { dim: 'Arche', q: 'What primal substance underlies all cosmic flux?' },
      { dim: 'Justice', q: 'How can mortals establish a just and virtuous polis?' },
      { dim: 'Virtue', q: 'How should one examine life to attain tranquility?' }
    ],
    thinkersZh: '泰勒斯 · 赫拉克利特 · 苏格拉底 · 柏拉图 · 亚里士多德',
    thinkersEn: 'Thales · Heraclitus · Socrates · Plato · Aristotle',
    inquiryTextClass: 'text-[#0d0501] [text-shadow:0_1px_0_rgba(255,255,255,0.85)]',
    bulletDotClass: 'bg-[#6d3910]'
  },

  // =========================================================================
  // ROOM 02: 希腊化与中世纪经院 (Gothic Lancet Shrine · Monastery Vellum)
  // =========================================================================
  'hellenistic-medieval': {
    pngImg: '/assets/monuments/era_medieval_shrine_clean.png?v=20260906c',
    stagePos: 'left-[16%] right-[16%] top-[25.5%] bottom-[11%]',
    titleFont: "'MedievalSharp', 'Cinzel', 'Noto Serif SC', serif",
    ornament: '✦   ☩   S C H O L A   ☩   ✦',
    ornamentClass: 'text-[#854d0e] [text-shadow:0_1px_0_rgba(255,255,255,0.8)]',
    titleEn: 'HELLENISTIC & SCHOLASTICISM',
    titleZh: '希腊化自洽与经院理智',
    timeRange: 'BC 200 - AD 1400',
    subtitleZh: '灵魂不动心与逻辑信仰大厦',
    subtitleEn: 'Inner Ataraxia & Sacred Rigor',
    titleColorClass: 'text-[#140702] [text-shadow:0_1px_0_rgba(255,255,255,0.8)]',
    subtitleColorClass: 'text-[#4a2308] [text-shadow:0_1px_0_rgba(255,255,255,0.75)]',
    hairlineClass: 'from-transparent via-[#854d0e]/50 to-transparent',
    epigraphTitleZh: '「信仰与理性 · FIDES ET RATIO」',
    epigraphTitleEn: '「FAITH & REASON」',
    epigraphTitleClass: 'text-[#1a0701] [text-shadow:0_1px_0_rgba(255,255,255,0.85)]',
    quoteZh: '“伤害不在于外在事实，而在于内心的判断；恩典完善自然，理性是真理的阶梯。”',
    quoteEn: '“Harm lies not in facts, but judgment. Grace perfects nature; reason is the staircase to truth.”',
    quoteClass: 'text-[#120601] [text-shadow:0_1px_0_rgba(255,255,255,0.75)]',
    authorZh: '—— 马可·奥勒留《沉思录》 / 阿奎那《神学大全》',
    authorEn: '—— Marcus Aurelius / Thomas Aquinas',
    authorClass: 'text-[#592607] [text-shadow:0_1px_0_rgba(255,255,255,0.7)]',
    essenceTitleZh: '「在信仰内构筑逻辑城堡」',
    essenceTitleEn: '「Rigor in Sacred Faith」',
    essenceTitleClass: 'text-[#1a0701] [text-shadow:0_1px_0_rgba(255,255,255,0.85)]',
    essenceTextZh: '乱世中哲学转向灵魂内省以求不动心；经院大师借助亚里士多德严密逻辑，构建起信仰与理智合一的思辨城堡。',
    essenceTextEn: 'Stoics sought inner sanctuary (ataraxia); medieval scholars deployed Aristotelian logic to harmonize rational thought with sacred faith.',
    essenceTextClass: 'text-[#180903] [text-shadow:0_1px_0_rgba(255,255,255,0.75)]',
    inquiryTitleZh: '「三大终极追问」',
    inquiryTitleEn: '「Three Grand Inquiries」',
    inquiryTitleClass: 'text-[#1a0701] [text-shadow:0_1px_0_rgba(255,255,255,0.85)]',
    inquiriesZh: [
      { dim: '不动心', q: '外部世界动荡失控，心灵如何达成绝对内在安顿？' },
      { dim: '求证', q: '有限凡人的形式逻辑，能否论证无限超验的神圣？' },
      { dim: '共相', q: '“善”与“人性”是真实实在，还是仅为语言符号？' }
    ],
    inquiriesEn: [
      { dim: 'Ataraxia', q: 'How can the soul preserve calm peace amid external turmoil?' },
      { dim: 'Proof', q: 'Can mortal logic rigorously demonstrate transcendent existence?' },
      { dim: 'Universals', q: 'Are abstract essences real substances or mere linguistic names?' }
    ],
    thinkersZh: '马可·奥勒留 · 奥古斯丁 · 安瑟伦 · 托马斯·阿奎那 · 奥卡姆',
    thinkersEn: 'Marcus Aurelius · Augustine · Anselm · Thomas Aquinas · Ockham',
    inquiryTextClass: 'text-[#120601] [text-shadow:0_1px_0_rgba(255,255,255,0.8)]',
    bulletDotClass: 'bg-[#854d0e]'
  },

  // =========================================================================
  // ROOM 03: 文艺复兴与理性经验启蒙 (Neoclassical Arch · Rag Print Plaque)
  // =========================================================================
  'enlightenment': {
    pngImg: '/assets/monuments/era_enlightenment_arch_clean.png?v=20260906c',
    stagePos: 'left-[15%] right-[15%] top-[22.5%] bottom-[11%]',
    titleFont: "'Cormorant Garamond', 'Playfair Display', 'Noto Serif SC', serif",
    ornament: '✦   ⚙   R A T I O · 1789   ⚙   ✦',
    ornamentClass: 'text-[#0284c7] [text-shadow:0_1px_0_rgba(255,255,255,0.85)]',
    titleEn: 'THE AGE OF ENLIGHTENMENT',
    titleZh: '理性觉醒与主体确立',
    timeRange: '1400 - 1800',
    subtitleZh: '唯理论经验论决战与哥白尼式革命',
    subtitleEn: 'The Epistemological Turn & Reason',
    titleColorClass: 'text-[#080d14] [text-shadow:0_1px_0_rgba(255,255,255,0.85)]',
    subtitleColorClass: 'text-[#1e3a5f] [text-shadow:0_1px_0_rgba(255,255,255,0.8)]',
    hairlineClass: 'from-transparent via-[#0284c7]/45 to-transparent',
    epigraphTitleZh: '「批判理性主义 · SAPERE AUDE」',
    epigraphTitleEn: '「CRITICAL REASON」',
    epigraphTitleClass: 'text-[#080d14] [text-shadow:0_1px_0_rgba(255,255,255,0.85)]',
    quoteZh: '“Sapere aude！勇于运用你自己的理性！头顶璀璨星空与心中道德法则，人是目的，绝非工具。”',
    quoteEn: '“Sapere aude! Have courage to use reason! Starry skies above and moral law within; man is an end, not a means.”',
    quoteClass: 'text-[#0c131d] [text-shadow:0_1px_0_rgba(255,255,255,0.8)]',
    authorZh: '—— 笛卡尔《沉思集》 / 康德《实践理性批判》',
    authorEn: '—— René Descartes / Immanuel Kant',
    authorClass: 'text-[#0369a1] [text-shadow:0_1px_0_rgba(255,255,255,0.7)]',
    essenceTitleZh: '「人类心智的成年礼」',
    essenceTitleEn: '「The Maturity of Mind」',
    essenceTitleClass: 'text-[#080d14] [text-shadow:0_1px_0_rgba(255,255,255,0.85)]',
    essenceTextZh: '自然科学粉碎神权蒙昧，人类理性升华为最高法官。笛卡尔立足“我思”，康德完成哲学革命确立道德自主。',
    essenceTextEn: 'The scientific revolution crowned human reason as the supreme arbiter. Descartes grounded subjectivity; Kant established moral autonomy.',
    essenceTextClass: 'text-[#101724] [text-shadow:0_1px_0_rgba(255,255,255,0.8)]',
    inquiryTitleZh: '「三大终极追问」',
    inquiryTitleEn: '「Three Grand Inquiries」',
    inquiryTitleClass: 'text-[#080d14] [text-shadow:0_1px_0_rgba(255,255,255,0.85)]',
    inquiriesZh: [
      { dim: '我思', q: '感官若会欺骗，认识最坚不可摧的阿基米德支点何在？' },
      { dim: '认识', q: '知识源于心灵天赋公理演绎，还是后天经验归纳？' },
      { dim: '自由', q: '在机械物理宇宙中，人类道德自由与尊严何以安立？' }
    ],
    inquiriesEn: [
      { dim: 'Cogito', q: 'When senses deceive, where lies the bedrock of certainty?' },
      { dim: 'Origin', q: 'Does truth derive from innate deduction or empirical senses?' },
      { dim: 'Autonomy', q: 'How can moral freedom exist in a mechanistic clockwork cosmos?' }
    ],
    thinkersZh: '笛卡尔 · 洛克 · 斯宾诺莎 · 休谟 · 康德 · 卢梭',
    thinkersEn: 'Descartes · Locke · Spinoza · Hume · Kant · Rousseau',
    inquiryTextClass: 'text-[#080d14] [text-shadow:0_1px_0_rgba(255,255,255,0.85)]',
    bulletDotClass: 'bg-[#0284c7]'
  },

  // =========================================================================
  // ROOM 04: 19世纪狂飙、工业暗潮与意志批判 (Forged Girder · Charcoal Slate)
  // =========================================================================
  'nineteenth-century': {
    pngImg: '/assets/monuments/era_industrial_girder_clean.png?v=20260906c',
    stagePos: 'left-[13.5%] right-[13.5%] top-[13.5%] bottom-[11%]',
    titleFont: "'Playfair Display', 'Cinzel', 'Noto Serif SC', serif",
    ornament: '⚡   ⚒   F O R G E · 1848   ⚒   ⚡',
    ornamentClass: 'text-[#f87171] [text-shadow:0_1px_3px_rgba(0,0,0,0.9)]',
    titleEn: 'TITANS & THE GREAT CRITIQUE',
    titleZh: '意志深渊与阶级批判',
    timeRange: '1800 - 1900',
    subtitleZh: '辩证历史巨轮与重估一切价值',
    subtitleEn: 'Dialectical Engine & Transvaluation',
    titleColorClass: 'text-[#f8fafc] [text-shadow:0_1px_3px_rgba(0,0,0,0.9)]',
    subtitleColorClass: 'text-rose-200 [text-shadow:0_1px_2px_rgba(0,0,0,0.9)]',
    hairlineClass: 'from-transparent via-[#ef4444]/50 to-transparent',
    epigraphTitleZh: '「实践与生命意志 · PRAXIS」',
    epigraphTitleEn: '「WILL & PRAXIS」',
    epigraphTitleClass: 'text-rose-100 [text-shadow:0_1px_3px_rgba(0,0,0,0.9)]',
    quoteZh: '“哲学家们只是用不同的方式解释世界，而问题在于改变世界；每一个不曾起舞的日子，都是对生命的辜负。”',
    quoteEn: '“Philosophers have interpreted the world; the point is to change it. Every un-danced day is a day lost to life.”',
    quoteClass: 'text-[#f1f5f9] [text-shadow:0_1px_2px_rgba(0,0,0,0.9)]',
    authorZh: '—— 马克思《提纲》 / 尼采《查拉图斯特拉》',
    authorEn: '—— Karl Marx / Friedrich Nietzsche',
    authorClass: 'text-rose-300 [text-shadow:0_1px_2px_rgba(0,0,0,0.9)]',
    essenceTitleZh: '「直面深渊与革命实践」',
    essenceTitleEn: '「The Abyss & Revolutionary Praxis」',
    essenceTitleClass: 'text-rose-100 [text-shadow:0_1px_3px_rgba(0,0,0,0.9)]',
    essenceTextZh: '工业机器与资本异化撕裂启蒙温情。思想巨人们直面生存真相：从唯物史观阶级斗争，到叔本华欲望深渊与超人自我超越。',
    essenceTextEn: 'Industrial roar shattered naive optimism. Titans faced raw reality: Marx forged dialectical materialism, while Nietzsche transvaluated values.',
    essenceTextClass: 'text-[#e2e8f0] [text-shadow:0_1px_2px_rgba(0,0,0,0.9)]',
    inquiryTitleZh: '「三大终极追问」',
    inquiryTitleEn: '「Three Grand Inquiries」',
    inquiryTitleClass: 'text-rose-100 [text-shadow:0_1px_3px_rgba(0,0,0,0.9)]',
    inquiriesZh: [
      { dim: '动力', q: '推动历史前进的根本引擎，是观念精神还是现实物质生产？' },
      { dim: '深渊', q: '理性若只是欲望奴隶，生命如何在痛苦钟摆中获得解脱？' },
      { dim: '超人', q: '传统神圣支柱瓦解后，个体如何在虚无中重估价值自我立法？' }
    ],
    inquiriesEn: [
      { dim: 'Engine', q: 'Is history propelled by ideal spirit or material production?' },
      { dim: 'Abyss', q: 'If reason serves blind will, how does life escape suffering?' },
      { dim: 'Overcoming', q: 'When idols fall, how does man forge self-legislated meaning?' }
    ],
    thinkersZh: '黑格尔 · 叔本华 · 克尔凯郭尔 · 马克思 · 尼采',
    thinkersEn: 'Hegel · Schopenhauer · Kierkegaard · Marx · Nietzsche',
    inquiryTextClass: 'text-[#f8fafc] [text-shadow:0_1px_2px_rgba(0,0,0,0.9)]',
    bulletDotClass: 'bg-[#ef4444]'
  },

  // =========================================================================
  // ROOM 05: 20世纪现代主义与语言转向 (Bauhaus Steel Frame · Swiss Kraft Board)
  // =========================================================================
  'twentieth-century': {
    pngImg: '/assets/monuments/era_bauhaus_frame_clean.png?v=20260906c',
    stagePos: 'left-[11%] right-[11%] top-[12.5%] bottom-[11%]',
    titleFont: "'Plus Jakarta Sans', 'Noto Serif SC', sans-serif",
    ornament: '■   ▲   B A U H A U S · 1919   ▲   ■',
    ornamentClass: 'text-[#2563eb] [text-shadow:0_1px_0_rgba(255,255,255,0.7)]',
    titleEn: 'MODERNITY & LANGUAGE TURN',
    titleZh: '语言界限与荒谬反叛',
    timeRange: '1900 - 2000',
    subtitleZh: '存在主义抉择与微观权力解构',
    subtitleEn: 'Existential Freedom & Linguistic Turn',
    titleColorClass: 'text-[#0f172a] [text-shadow:0_1px_0_rgba(255,255,255,0.7)]',
    subtitleColorClass: 'text-[#334155] [text-shadow:0_1px_0_rgba(255,255,255,0.65)]',
    hairlineClass: 'from-transparent via-[#2563eb]/45 to-transparent',
    epigraphTitleZh: '「存在与自由 · EXISTENCE」',
    epigraphTitleEn: '「BEING & FREEDOM」',
    epigraphTitleClass: 'text-[#0f172a] [text-shadow:0_1px_0_rgba(255,255,255,0.7)]',
    quoteZh: '“凡不可言说的，必须保持沉默。人被判定为自由，存在先于本质；在隆冬，我身上有一个不可战胜的夏天。”',
    quoteEn: '“Whereof one cannot speak, thereof must one be silent. Existence precedes essence; within me lies an invincible summer.”',
    quoteClass: 'text-[#0f172a] [text-shadow:0_1px_0_rgba(255,255,255,0.65)]',
    authorZh: '—— 维特根斯坦《逻辑哲学论》 / 萨特 / 加缪',
    authorEn: '—— Wittgenstein / Sartre / Camus',
    authorClass: 'text-[#1d4ed8] [text-shadow:0_1px_0_rgba(255,255,255,0.6)]',
    essenceTitleZh: '「语言澄明与荒谬反叛」',
    essenceTitleEn: '「Linguistic Turn & Existential Revolt」',
    essenceTitleClass: 'text-[#0f172a] [text-shadow:0_1px_0_rgba(255,255,255,0.7)]',
    essenceTextZh: '世界大战宣告理性乌托邦破产。现代哲学放弃虚妄宏大体系，转向澄清语言逻辑误用，并在荒谬宇宙中捍卫个体绝对自由。',
    essenceTextEn: 'Wartime ruins dismantled grand dogmas. Thinkers clarified semantic illusions while defending radical freedom and revolt against absurdity.',
    essenceTextClass: 'text-[#1e293b] [text-shadow:0_1px_0_rgba(255,255,255,0.65)]',
    inquiryTitleZh: '「三大终极追问」',
    inquiryTitleEn: '「Three Grand Inquiries」',
    inquiryTitleClass: 'text-[#0f172a] [text-shadow:0_1px_0_rgba(255,255,255,0.7)]',
    inquiriesZh: [
      { dim: '语言', q: '千年形而上学谜题，是否只是日常语言误用导致的逻辑幻觉？' },
      { dim: '荒谬', q: '在毫无神圣蓝图的世界里，人如何承担自由并赋予荒诞以崇高？' },
      { dim: '规训', q: '现代社会的学校与组织，是如何以理性名义规训人性的？' }
    ],
    inquiriesEn: [
      { dim: 'Language', q: 'Are timeless metaphysical puzzles mere linguistic illusions?' },
      { dim: 'Absurd', q: 'Without divine purpose, how does humanity forge authentic dignity?' },
      { dim: 'Power', q: 'How do modern rational institutions discipline human existence?' }
    ],
    thinkersZh: '罗素 · 维特根斯坦 · 海德格尔 · 萨特 · 加缪 · 福柯',
    thinkersEn: 'Russell · Wittgenstein · Heidegger · Sartre · Camus · Foucault',
    inquiryTextClass: 'text-[#0f172a] [text-shadow:0_1px_0_rgba(255,255,255,0.7)]',
    bulletDotClass: 'bg-[#2563eb]'
  },

  'modern-twentieth': {
    pngImg: '/assets/monuments/era_bauhaus_frame_clean.png?v=20260906c',
    stagePos: 'left-[11%] right-[11%] top-[12.5%] bottom-[11%]',
    titleFont: "'Plus Jakarta Sans', 'Noto Serif SC', sans-serif",
    ornament: '■   ▲   B A U H A U S · 1919   ▲   ■',
    ornamentClass: 'text-[#2563eb] [text-shadow:0_1px_0_rgba(255,255,255,0.7)]',
    titleEn: 'MODERNITY & LANGUAGE TURN',
    titleZh: '语言界限与荒谬反叛',
    timeRange: '1900 - 2000',
    subtitleZh: '存在主义抉择与微观权力解构',
    subtitleEn: 'Existential Freedom & Linguistic Turn',
    titleColorClass: 'text-[#0f172a] [text-shadow:0_1px_0_rgba(255,255,255,0.7)]',
    subtitleColorClass: 'text-[#334155] [text-shadow:0_1px_0_rgba(255,255,255,0.65)]',
    hairlineClass: 'from-transparent via-[#2563eb]/45 to-transparent',
    epigraphTitleZh: '「存在与自由 · EXISTENCE」',
    epigraphTitleEn: '「BEING & FREEDOM」',
    epigraphTitleClass: 'text-[#0f172a] [text-shadow:0_1px_0_rgba(255,255,255,0.7)]',
    quoteZh: '“凡不可言说的，必须保持沉默。人被判定为自由，存在先于本质；在隆冬，我身上有一个不可战胜的夏天。”',
    quoteEn: '“Whereof one cannot speak, thereof must one be silent. Existence precedes essence; within me lies an invincible summer.”',
    quoteClass: 'text-[#0f172a] [text-shadow:0_1px_0_rgba(255,255,255,0.65)]',
    authorZh: '—— 维特根斯坦《逻辑哲学论》 / 萨特 / 加缪',
    authorEn: '—— Wittgenstein / Sartre / Camus',
    authorClass: 'text-[#1d4ed8] [text-shadow:0_1px_0_rgba(255,255,255,0.6)]',
    essenceTitleZh: '「语言澄明与荒谬反叛」',
    essenceTitleEn: '「Linguistic Turn & Existential Revolt」',
    essenceTitleClass: 'text-[#0f172a] [text-shadow:0_1px_0_rgba(255,255,255,0.7)]',
    essenceTextZh: '世界大战宣告理性乌托邦破产。现代哲学放弃虚妄宏大体系，转向澄清语言逻辑误用，并在荒谬宇宙中捍卫个体绝对自由。',
    essenceTextEn: 'Wartime ruins dismantled grand dogmas. Thinkers clarified semantic illusions while defending radical freedom and revolt against absurdity.',
    essenceTextClass: 'text-[#1e293b] [text-shadow:0_1px_0_rgba(255,255,255,0.65)]',
    inquiryTitleZh: '「三大终极追问」',
    inquiryTitleEn: '「Three Grand Inquiries」',
    inquiryTitleClass: 'text-[#0f172a] [text-shadow:0_1px_0_rgba(255,255,255,0.7)]',
    inquiriesZh: [
      { dim: '语言', q: '千年形而上学谜题，是否只是日常语言误用导致的逻辑幻觉？' },
      { dim: '荒谬', q: '在毫无神圣蓝图的世界里，人如何承担自由并赋予荒诞以崇高？' },
      { dim: '规训', q: '现代社会的学校与组织，是如何以理性名义规训人性的？' }
    ],
    inquiriesEn: [
      { dim: 'Language', q: 'Are timeless metaphysical puzzles mere linguistic illusions?' },
      { dim: 'Absurd', q: 'Without divine purpose, how does humanity forge authentic dignity?' },
      { dim: 'Power', q: 'How do modern rational institutions discipline human existence?' }
    ],
    thinkersZh: '罗素 · 维特根斯坦 · 海德格尔 · 萨特 · 加缪 · 福柯',
    thinkersEn: 'Russell · Wittgenstein · Heidegger · Sartre · Camus · Foucault',
    inquiryTextClass: 'text-[#0f172a] [text-shadow:0_1px_0_rgba(255,255,255,0.7)]',
    bulletDotClass: 'bg-[#2563eb]'
  },

  // =========================================================================
  // ROOM 06: 当代心智、数智奇点与后人类 (Cybernetic Quantum HUD Console)
  // =========================================================================
  'contemporary-future': {
    pngImg: '/assets/monuments/era_cyberpunk_hud_clean.png?v=20260906c',
    stagePos: 'left-[13.5%] right-[13.5%] top-[13.5%] bottom-[12%]',
    titleFont: "'JetBrains Mono', 'Plus Jakarta Sans', monospace",
    ornament: '0 1   ⌘   Q U A N T U M · A I   ⌘   0 1',
    ornamentClass: 'text-[#06b6d4] [text-shadow:0_0_10px_rgba(6,182,212,0.8)]',
    titleEn: 'MIND, AI & POST-HUMANITY',
    titleZh: '心智之谜与数智未来',
    timeRange: '2000 - 2026+',
    subtitleZh: '意识困难问题与碳硅文明分水岭',
    subtitleEn: 'Hard Problem of Consciousness',
    titleColorClass: 'text-[#f0fdfa] [text-shadow:0_0_10px_rgba(6,182,212,0.8)]',
    subtitleColorClass: 'text-cyan-200 [text-shadow:0_0_6px_rgba(6,182,212,0.6)]',
    hairlineClass: 'from-transparent via-[#06b6d4]/50 to-transparent',
    epigraphTitleZh: '「心智与存在 · QUALIA & BEING」',
    epigraphTitleEn: '「QUALIA & BEING」',
    epigraphTitleClass: 'text-cyan-100 [text-shadow:0_0_8px_rgba(6,182,212,0.7)]',
    quoteZh: '“机器可以模拟无限的计算，但唯有人类在脆弱肉身中以爱与有限性赋予宇宙意义。计算永非理解，存在不可化约。”',
    quoteEn: '“Machines simulate computation; only mortal humans imbue the cosmos with meaning through love and finitude. Computation is never comprehension.”',
    quoteClass: 'text-[#ecfeff] [text-shadow:0_0_5px_rgba(6,182,212,0.5)]',
    authorZh: '—— 查尔默斯《意识的心智》 / 塞尔 / 彭罗斯',
    authorEn: '—— David Chalmers / John Searle / Penrose',
    authorClass: 'text-cyan-300 [text-shadow:0_0_6px_rgba(6,182,212,0.6)]',
    essenceTitleZh: '「奇点临近下的文明自审」',
    essenceTitleEn: '「Consciousness at the Crossroads」',
    essenceTitleClass: 'text-cyan-100 [text-shadow:0_0_8px_rgba(6,182,212,0.7)]',
    essenceTextZh: '通用人工智能将哲学推向生存前沿：符号运算是否等同于主观理解？当算法重塑一切，何为人类存在的不可替代之真义？',
    essenceTextEn: 'AGI thrusts philosophy to survival frontiers: Does calculation equal understanding? What defines humanity amid the silicon turn?',
    essenceTextClass: 'text-[#cffafe] [text-shadow:0_0_4px_rgba(6,182,212,0.4)]',
    inquiryTitleZh: '「三大终极追问」',
    inquiryTitleEn: '「Three Grand Inquiries」',
    inquiryTitleClass: 'text-cyan-100 [text-shadow:0_0_8px_rgba(6,182,212,0.7)]',
    inquiriesZh: [
      { dim: '感受质', q: '神经元放电与晶体管矩阵，何时何因才能孕育出主观感受？' },
      { dim: '意志', q: '心智抉择若完全由生化算法决定，人类自由意志是否为错觉？' },
      { dim: '拟像', q: '当数字拟像无限逼真，我们该在何处锚定真实生命的重量？' }
    ],
    inquiriesEn: [
      { dim: 'Qualia', q: 'How do physical signals give rise to subjective felt experience?' },
      { dim: 'Agency', q: 'If choices reduce to biochemical algorithms, is will an illusion?' },
      { dim: 'Simulacra', q: 'In a hyper-real digital landscape, where is authentic life anchored?' }
    ],
    thinkersZh: '内格尔 · 查尔默斯 · 塞尔 · 丹尼特 · 鲍德里亚 · 帕菲特',
    thinkersEn: 'Thomas Nagel · David Chalmers · Searle · Dennett · Baudrillard',
    inquiryTextClass: 'text-[#f0fdfa] [text-shadow:0_0_5px_rgba(6,182,212,0.5)]',
    bulletDotClass: 'bg-[#06b6d4] shadow-[0_0_6px_rgba(6,182,212,0.8)]'
  }
};

export const EraMonumentPillar: React.FC<EraMonumentPillarProps> = ({
  era,
  themeCfg,
  language
}) => {
  const cfg = ERA_ARCHITECTURAL_CONFIGS[era.id] || ERA_ARCHITECTURAL_CONFIGS['axial-age'];

  return (
    <div className="w-[560px] sm:w-[620px] xl:w-[650px] shrink-0 h-full relative select-none group">
      {/* 1. Freestanding Architectural Silhouette (Clean Transparent Cutout PNG) */}
      <img
        src={cfg.pngImg}
        alt={era.name.zh}
        className="w-full h-full object-fill pointer-events-none select-none filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.85)] group-hover:scale-[1.01] transition-transform duration-700"
      />

      {/* 2. Intercolumn Opening Inner Stage (Positioned precisely within columns / arch opening, content-first with no-scrollbar) */}
      <div className={`absolute ${cfg.stagePos} z-10 overflow-y-auto no-scrollbar flex flex-col`}>
        {renderMonolithicContent(era, language, cfg, themeCfg)}
      </div>
    </div>
  );
};

// Universal Monolithic Architectural Content Renderer for All 6 Eras
function renderMonolithicContent(
  era: EraTheme,
  language: 'zh' | 'en',
  cfg: EraArchitecturalConfig,
  themeCfg: { fontFamily?: string }
) {
  const isZh = language === 'zh';

  return (
    <div className="monument-content-stage min-h-full w-full flex flex-col justify-between py-1.5 sm:py-2 px-3 sm:px-4.5 xl:px-5 select-text gap-2 sm:gap-2.5 xl:gap-3.5">
      {/* 1. Inscribed Header Area */}
      <div className="text-center shrink-0 space-y-0.5 sm:space-y-1">
        <div className={`font-serif tracking-[0.32em] text-[10.5px] sm:text-xs font-black ${cfg.ornamentClass}`}>
          {cfg.ornament}
        </div>
        {isZh && (
          <div className={`monument-subtitle font-serif tracking-[0.2em] text-[11px] sm:text-xs xl:text-[13px] font-black uppercase ${cfg.subtitleColorClass}`}>
            {cfg.titleEn}
          </div>
        )}
        <h2
          className={`monument-title font-black tracking-wide leading-tight ${isZh ? 'text-xl sm:text-2xl xl:text-[28px]' : 'text-[19px] sm:text-[22px] xl:text-[25px] tracking-wider'} ${cfg.titleColorClass}`}
          style={{ fontFamily: cfg.titleFont || themeCfg.fontFamily }}
        >
          {isZh ? cfg.titleZh : cfg.titleEn}
        </h2>
        <div className={`monument-subtitle font-serif italic text-[11px] sm:text-xs xl:text-[13px] font-bold leading-tight ${cfg.subtitleColorClass}`}>
          {cfg.timeRange} · {isZh ? cfg.subtitleZh : cfg.subtitleEn}
        </div>
        <div className={`monument-hairline w-full h-[1.5px] bg-gradient-to-r ${cfg.hairlineClass} my-1 sm:my-1.5`} />
      </div>

      {/* 2. Middle Inscriptions: Pure Inscribed Sovereign Epigraph & Essence (NO BADGES) */}
      <div className="flex-1 flex flex-col justify-center py-0.5 sm:py-1 gap-2.5 sm:gap-3 xl:gap-4 text-left">
        {/* Section 1: 时代铭文 */}
        <div className="space-y-1 sm:space-y-1.5">
          <div className={`monument-sec-title text-[13px] sm:text-[14px] xl:text-[15px] font-serif font-black tracking-wide ${cfg.epigraphTitleClass}`}>
            {isZh ? cfg.epigraphTitleZh : cfg.epigraphTitleEn}
          </div>
          <p className={`monument-quote ${isZh ? 'text-[12px] sm:text-[12.5px] xl:text-[13.5px]' : 'text-[11.5px] sm:text-[12px] xl:text-[12.5px]'} font-serif font-bold leading-relaxed italic ${cfg.quoteClass}`}>
            {isZh ? cfg.quoteZh : cfg.quoteEn}
          </p>
          <div className="monument-author text-[11px] sm:text-xs xl:text-[12.5px] font-serif font-extrabold text-right pr-1">
            <span className={cfg.authorClass}>{isZh ? cfg.authorZh : cfg.authorEn}</span>
          </div>
        </div>

        {/* Section 2: 时代精义 */}
        <div className="space-y-1 sm:space-y-1.5">
          <div className={`monument-sec-title text-[13px] sm:text-[14px] xl:text-[15px] font-serif font-black tracking-wide ${cfg.essenceTitleClass}`}>
            {isZh ? cfg.essenceTitleZh : cfg.essenceTitleEn}
          </div>
          <p className={`monument-essence ${isZh ? 'text-[11.5px] sm:text-[12px] xl:text-[12.5px]' : 'text-[11px] sm:text-[11.5px] xl:text-[12px]'} font-serif font-semibold leading-relaxed text-justify ${cfg.essenceTextClass}`}>
            {isZh ? cfg.essenceTextZh : cfg.essenceTextEn}
          </p>
        </div>
      </div>

      {/* 3. Lower Section: 终极追问与先哲谱系 (NO BADGES) */}
      <div className={`monument-hairline shrink-0 pt-1.5 sm:pt-2 border-t ${cfg.hairlineClass} space-y-1.5 sm:space-y-2 text-left`}>
        <div className={`monument-sec-title text-[13px] sm:text-[14px] xl:text-[15px] font-serif font-black tracking-wide ${cfg.inquiryTitleClass}`}>
          {isZh ? cfg.inquiryTitleZh : cfg.inquiryTitleEn}
        </div>

        <div className="space-y-1 sm:space-y-1.5 pl-0.5">
          {(isZh ? cfg.inquiriesZh : cfg.inquiriesEn).map((item, idx) => (
            <div key={idx} className={`monument-inquiry flex items-start gap-1.5 ${isZh ? 'text-[11.5px] sm:text-[12px] xl:text-[12.5px]' : 'text-[11px] sm:text-[11.5px] xl:text-[12px]'} font-serif font-bold leading-snug ${cfg.inquiryTextClass}`}>
              <span className={`w-1.5 h-1.5 mt-1 rotate-45 shrink-0 ${cfg.bulletDotClass}`} />
              <span>
                <strong className="font-black">【{item.dim}】</strong> {item.q}
              </span>
            </div>
          ))}
          <div className={`monument-thinkers text-[10.5px] sm:text-[11px] xl:text-[11.5px] font-serif font-semibold italic pl-3 pt-0.5 ${cfg.subtitleColorClass}`}>
            {isZh ? '先哲谱系：' : 'Key Thinkers: '} {isZh ? cfg.thinkersZh : cfg.thinkersEn}
          </div>
        </div>
      </div>
    </div>
  );
}
