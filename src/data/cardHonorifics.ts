import { Philosopher, CulturalEcho } from '../types/philosophy';

export const PHILOSOPHER_HONORIFICS: Record<string, string> = {
  // 轴心时代与古希腊源头
  thales: '先知印记',
  socrates: '至圣导师',
  plato: '理念宗师',
  aristotle: '万学先师',
  heraclitus: '流变之火',
  parmenides: '存在磐石',
  democritus: '原子先驱',
  pythagoras: '数律神圣',
  epicurus: '泰然花园',
  zeno_citium: '斯多葛之锚',

  // 东方诸子百家
  laozi: '玄牝之门',
  confucius: '万世师表',
  zhuangzi: '逍遥至人',
  mencius: '亚圣浩气',
  xunzi: '礼法大匠',
  mozi: '兼爱侠宗',
  hanfeizi: '法术权锋',

  // 希腊化与中世纪
  augustine: '神国圣光',
  aquinas: '经院博士',
  anselm: '本体先验',
  william_of_ockham: '剃刀之锋',

  // 近代启蒙与唯理论/经验论
  descartes: '怀疑先锋',
  spinoza: '神即自然',
  leibniz: '单子和谐',
  locke: '白板开篇',
  hume: '怀疑审判',
  rousseau: '卢梭契约',
  bacon: '知识之光',

  // 德意志唯心论与19世纪思潮
  kant: '启蒙丰碑',
  hegel: '辩证巅峰',
  schopenhauer: '意志沉沦',
  nietzsche: '深渊狂飙',
  kierkegaard: '信仰跃迁',
  marx: '实践惊雷',
  mill: '功利自由',

  // 20世纪分析、现象学与存在主义
  russell: '数理灯塔',
  wittgenstein: '语言阶梯',
  husserl: '纯粹意识',
  heidegger: '此在追问',
  sartre: '自由囚徒',
  camus: '西西弗之勇',
  de_beauvoir: '第二性界',
  merleau_ponty: '肉身感知',
  adorno: '启蒙反思',
  foucault: '权力谱系',
  derrida: '解构之刃',
  deleuze: '块茎游牧',

  // 现代数智与前沿
  turing: '数智机先',
  parfit: '非同一律',
  chalmers: '意识深壑'
};

export const CULTURAL_ECHO_HONORIFICS: Record<string, string> = {
  'school-of-athens': '传世名作',
  'matrix': '矩阵觉醒',
  'blade-runner': '银翼霓虹',
  'disco-elysium': '极乐回响',
  'cyberpunk-2077': '赛博荒原',
  'solaris': '索拉里斯海',
  '2001-space-odyssey': '星孩漫游',
  'space-odyssey': '星孩漫游',
  'ex-machina': '机心伊甸',
  'her-movie': '以太之恋',
  'seventh-seal': '死神对弈',
  'brothers-karamazov': '大审判官',
  'nighthawks': '午夜幽光',
  'oppenheimer': '裂变宿命',
  'thinker-rodin': '青铜沉思',
  'wanderer-fog': '雾海行者',
  'incredulity-thomas': '触碰圣伤'
};

/**
 * 获取哲学家或艺术名作的专属典藏印记尊号（用于姓名正下方的典雅副标题）
 */
export function getCardHonorific(item: Philosopher | CulturalEcho): string {
  if ('schools' in item) {
    // Philosopher
    if (PHILOSOPHER_HONORIFICS[item.id]) {
      return PHILOSOPHER_HONORIFICS[item.id];
    }
    if (item.schools && item.schools[0]) {
      return `${item.schools[0]}宗师`;
    }
    return '先哲印记';
  } else {
    // Cultural Echo
    if (CULTURAL_ECHO_HONORIFICS[item.id]) {
      return CULTURAL_ECHO_HONORIFICS[item.id];
    }
    const typeMap: Record<string, string> = {
      art: '传世名作',
      movie: '银幕史诗',
      game: '沉浸互动',
      book: '传世文渊'
    };
    return typeMap[item.type] || '文明回响';
  }
}
