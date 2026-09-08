import { PhilosopherBiography } from '../../types/philosophy';
import { AXIAL_AGE_BIOGRAPHIES } from './axialAge';
import { HELLENISTIC_MEDIEVAL_BIOGRAPHIES } from './hellenisticMedieval';
import { ENLIGHTENMENT_EARLY_MODERN_BIOGRAPHIES } from './enlightenmentEarlyModern';
import { NINETEENTH_CENTURY_BIOGRAPHIES } from './nineteenthCentury';
import { TWENTIETH_CENTURY_BIOGRAPHIES } from './twentiethCentury';
import { CONTEMPORARY_FUTURE_BIOGRAPHIES } from './contemporaryFuture';

/**
 * 完整聚合全站6大时代全部63位先哲的权威维基传记库
 */
export const BIOGRAPHIES_MAP: Record<string, PhilosopherBiography> = {
  ...AXIAL_AGE_BIOGRAPHIES,
  ...HELLENISTIC_MEDIEVAL_BIOGRAPHIES,
  ...ENLIGHTENMENT_EARLY_MODERN_BIOGRAPHIES,
  ...NINETEENTH_CENTURY_BIOGRAPHIES,
  ...TWENTIETH_CENTURY_BIOGRAPHIES,
  ...CONTEMPORARY_FUTURE_BIOGRAPHIES,
};

/**
 * 安全查询指定哲学家的详实传记史诗数据
 */
export function getPhilosopherBiography(id: string): PhilosopherBiography | undefined {
  return BIOGRAPHIES_MAP[id];
}
