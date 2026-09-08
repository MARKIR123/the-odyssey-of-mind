import React, { useState } from 'react';
import { AIPersona } from '../../data/aiPersonas';
import { PhilosopherMindstream, CustomDebateTurn, WaveringLevel } from '../../context/DialecticContext';
import { PHILOSOPHERS_DATA } from '../../data/philosophers';
import { getPhilosopherBiography } from '../../data/biographies';
import {
  Sparkles,
  Brain,
  Compass,
  Shield,
  ChevronDown,
  ChevronUp,
  History,
  ScrollText,
  Zap,
  Scale,
  Flame,
  UserCheck
} from 'lucide-react';

interface PhilosopherMindstreamCardProps {
  persona: AIPersona;
  opponent: AIPersona;
  topic: string;
  mindstream?: PhilosopherMindstream;
  turns: CustomDebateTurn[];
  themeColor: 'amber' | 'indigo';
  isThinking?: boolean;
  onOpenBiography?: () => void;
}

const WAVERING_CONFIG: Record<
  WaveringLevel,
  { label: string; badgeCls: string; dotCls: string }
> = {
  solid: {
    label: '稳固 · 磐石不移',
    badgeCls: 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300',
    dotCls: 'bg-emerald-400'
  },
  shaken: {
    label: '震颤 · 观点动摇',
    badgeCls: 'bg-rose-500/20 border-rose-500/50 text-rose-300 shadow-[0_0_8px_rgba(244,63,94,0.3)]',
    dotCls: 'bg-rose-400 animate-ping'
  },
  reconstructing: {
    label: '破壁 · 视界重构',
    badgeCls: 'bg-indigo-500/20 border-indigo-500/50 text-indigo-200 shadow-[0_0_8px_rgba(99,102,241,0.3)]',
    dotCls: 'bg-indigo-400 animate-pulse'
  },
  entrenched: {
    label: '固守 · 决绝捍卫',
    badgeCls: 'bg-amber-500/15 border-amber-500/40 text-amber-300',
    dotCls: 'bg-amber-400'
  }
};

export const PhilosopherMindstreamCard: React.FC<PhilosopherMindstreamCardProps> = ({
  persona,
  opponent,
  topic: _topic,
  mindstream,
  turns,
  themeColor,
  isThinking = false,
  onOpenBiography
}) => {
  const [showHistory, setShowHistory] = useState<boolean>(false);

  // Find corresponding philosopher & biography
  const phil = PHILOSOPHERS_DATA.find((p) => p.id === persona.id || p.name.zh === persona.name);
  const bio = phil?.biography || getPhilosopherBiography(persona.id);

  // Get historical turns spoken by this philosopher with mindstream data
  const speakerTurns = turns.filter(
    (t) => t.type === 'turn' && t.speakerId === persona.id && t.mindstream
  );

  const isAmber = themeColor === 'amber';
  const wavering = mindstream?.waveringLevel ? WAVERING_CONFIG[mindstream.waveringLevel] : WAVERING_CONFIG.solid;

  return (
    <div className="w-full space-y-2.5 my-3 select-text">
      {/* 1. Dossier Header: Radar & Posture Badge */}
      <div className="flex items-center justify-between gap-1.5 pb-2 border-b border-white/10">
        <span className="text-[11px] font-mono tracking-wider font-bold flex items-center gap-1.5 text-zinc-300">
          <Compass className={`w-3.5 h-3.5 ${isAmber ? 'text-amber-400' : 'text-indigo-400'}`} />
          <span>先哲思想罗盘</span>
        </span>

        <span
          className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border flex items-center gap-1.5 shadow-sm transition-all ${
            isAmber
              ? 'bg-amber-500/15 border-amber-500/40 text-amber-300'
              : 'bg-indigo-500/15 border-indigo-500/40 text-indigo-300'
          }`}
          title="当前交锋态势"
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              isThinking
                ? 'animate-ping ' + (isAmber ? 'bg-amber-400' : 'bg-indigo-400')
                : isAmber
                ? 'bg-amber-400'
                : 'bg-indigo-400'
            }`}
          />
          <span>态势 · {mindstream?.posture || '立论凝思'}</span>
        </span>
      </div>

      {/* Biography Quick Access Link */}
      {onOpenBiography && (
        <button
          onClick={onOpenBiography}
          className={`w-full py-1.5 px-2.5 rounded-xl border text-[11px] font-mono transition-all flex items-center justify-between cursor-pointer group ${
            isAmber
              ? 'bg-amber-500/[0.08] hover:bg-amber-500/20 border-amber-500/30 text-amber-200'
              : 'bg-indigo-500/[0.08] hover:bg-indigo-500/20 border-indigo-500/30 text-indigo-200'
          }`}
          title="展开查阅该先哲权威生平传记与思想大典"
        >
          <span className="flex items-center gap-1.5 truncate">
            <ScrollText className="w-3.5 h-3.5 opacity-80 group-hover:scale-110 transition-transform text-amber-400" />
            <span className="font-bold">先哲生平大传</span>
            {phil?.lifespan && <span className="opacity-70 text-[10px]">({phil.lifespan})</span>}
          </span>
          <span className="text-[10px] underline underline-offset-2 opacity-80 group-hover:opacity-100 shrink-0">
            查阅大传 →
          </span>
        </button>
      )}

      {/* 2. Opponent Appraisal: 先哲眼中的对手 (内心独白) */}
      <div
        className={`p-2.5 rounded-xl border text-left space-y-1.5 transition-all ${
          isAmber
            ? 'bg-stone-950/80 border-amber-500/30 shadow-sm'
            : 'bg-stone-950/80 border-indigo-500/30 shadow-sm'
        }`}
      >
        <div className="flex items-center justify-between text-[10px] font-mono font-semibold text-zinc-400">
          <span className="flex items-center gap-1.5 text-zinc-300">
            <UserCheck className={`w-3.5 h-3.5 ${isAmber ? 'text-amber-400' : 'text-indigo-400'}`} />
            <span>内心对论敌品评:</span>
          </span>
          <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-white/5 text-zinc-400 border border-white/10">
            论敌心象
          </span>
        </div>
        <p className="text-[12px] font-dialectic leading-relaxed text-[#f5f5f4] italic pl-2 border-l-2 border-amber-400/60">
          “{mindstream?.opponentAppraisal || `冷静审视对方（${opponent.name}）之学统风骨`}”
        </p>
      </div>

      {/* 3. Wavering & Tension: 体系动摇度与受冲击切片 */}
      <div
        className={`p-2.5 rounded-xl border text-left space-y-1.5 transition-all ${
          isAmber ? 'bg-black/60 border-white/10' : 'bg-black/60 border-white/10'
        }`}
      >
        <div className="flex items-center justify-between text-[10px] font-mono font-semibold">
          <span className="flex items-center gap-1.5 text-zinc-300">
            <Flame className="w-3.5 h-3.5 text-rose-400" />
            <span>观点动摇与心智状态:</span>
          </span>
          <span className={`px-2 py-0.5 rounded-full text-[9.5px] font-mono font-bold border flex items-center gap-1 ${wavering.badgeCls}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${wavering.dotCls}`} />
            <span>{wavering.label}</span>
          </span>
        </div>
        <p className="text-[11.5px] font-dialectic leading-relaxed text-zinc-200 pl-2 border-l-2 border-rose-400/50">
          {mindstream?.waveringThought || '第一性原理坚固自洽，全体系运转严密，公理底座未生动摇。'}
        </p>
      </div>

      {/* 4. Rationality Verdict: 对方论点合理性判词 */}
      <div
        className={`p-2.5 rounded-xl border text-left space-y-1 transition-all ${
          isAmber ? 'bg-stone-950/60 border-amber-500/25' : 'bg-stone-950/60 border-indigo-500/25'
        }`}
      >
        <div className="flex items-center justify-between text-[10px] font-mono font-semibold text-zinc-400">
          <span className="flex items-center gap-1.5">
            <Scale className={`w-3 h-3 ${isAmber ? 'text-amber-400' : 'text-indigo-400'}`} />
            <span>对方当期论点合理性检视:</span>
          </span>
          <span className="text-[9px] opacity-70 font-mono">理性裁决</span>
        </div>
        <p className="text-[12px] font-dialectic leading-relaxed text-[#f5f5f4] pl-2 border-l-2 border-white/20">
          “{mindstream?.rationalityVerdict || '静待对方亮明其论述地基与逻辑支点'}”
        </p>
      </div>

      {/* 5. Dialectical Resonance & Inspiration: 承认具有真正启发的观点切片 */}
      <div
        className={`p-2.5 rounded-xl border text-left space-y-1 transition-all ${
          isAmber
            ? 'bg-gradient-to-br from-amber-500/[0.08] to-transparent border-amber-500/35'
            : 'bg-gradient-to-br from-indigo-500/[0.08] to-transparent border-indigo-500/35'
        }`}
      >
        <div className="flex items-center justify-between text-[10px] font-mono font-semibold text-zinc-400">
          <span className="flex items-center gap-1.5">
            <Sparkles className={`w-3 h-3 ${isAmber ? 'text-amber-400' : 'text-indigo-400'}`} />
            <span>吸纳对方洞见与思想微澜:</span>
          </span>
          <span className={`text-[9px] font-mono ${isAmber ? 'text-amber-400/80' : 'text-indigo-400/80'}`}>
            视界交融
          </span>
        </div>
        <p
          className={`text-[12px] font-dialectic leading-relaxed pl-2 border-l-2 ${
            isAmber
              ? 'border-amber-400/60 text-amber-100/95'
              : 'border-indigo-400/60 text-indigo-100/95'
          }`}
        >
          “{mindstream?.resonance || `敏锐审视对方（${opponent.name}）之逻辑前设`}”
        </p>
      </div>

      {/* 6. Inner Preoccupation: 当下内在审视与深层困惑 */}
      <div className="p-2.5 rounded-xl bg-stone-950/40 border border-white/10 text-left space-y-1">
        <div className="flex items-center justify-between text-[10px] font-mono font-semibold text-zinc-400">
          <span className="flex items-center gap-1.5">
            <Brain className={`w-3 h-3 ${isAmber ? 'text-amber-400' : 'text-indigo-400'}`} />
            <span>当下内在审视与困惑:</span>
          </span>
          <span className="text-[9px] opacity-60 font-mono">深层自省</span>
        </div>
        <p className="text-[11.5px] font-dialectic text-stone-300 leading-snug pl-2 border-l-2 border-white/10">
          {mindstream?.preoccupation || '审视论辩之原初地基，破除常识迷障'}
        </p>
      </div>

      {/* 7. Bedrock Axiom: 元公理底线 (哲学基石) */}
      <div className="p-2 rounded-xl bg-white/[0.03] border border-white/10 text-left space-y-0.5">
        <div className="flex items-center gap-1.5 text-[9.5px] font-mono text-zinc-400">
          <Shield className="w-2.5 h-2.5 text-zinc-500" />
          <span>誓守元公理底线 (哲学基石):</span>
        </div>
        <p className="text-[11px] font-dialectic text-stone-300 leading-snug line-clamp-2">
          {mindstream?.bedrockAxiom || '立足原旨哲学本体论与认识论基石'}
        </p>
      </div>

      {/* 7.5. Epistemic Crisis Link */}
      {bio?.epistemicCrisis && (
        <div className="p-2 rounded-xl bg-amber-500/[0.03] border border-amber-500/20 text-left space-y-0.5">
          <div className="flex items-center justify-between text-[9px] font-mono text-zinc-400">
            <span className="flex items-center gap-1">
              <Zap className="w-2.5 h-2.5 text-amber-400" />
              <span>思想史破壁转折时刻:</span>
            </span>
            {onOpenBiography && (
              <button
                onClick={onOpenBiography}
                className="text-amber-400/90 hover:text-white underline cursor-pointer text-[9px]"
              >
                详见大传
              </button>
            )}
          </div>
          <p className="text-[11px] font-dialectic text-stone-200 leading-snug line-clamp-1">
            {bio.epistemicCrisis.title}
          </p>
        </div>
      )}

      {/* 8. Historical Trajectory Accordion (思辨演进脉络) */}
      {speakerTurns.length > 1 && (
        <div className="pt-1">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="w-full py-1 px-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-[10.5px] font-mono text-zinc-400 hover:text-zinc-200 transition-all flex items-center justify-between cursor-pointer"
          >
            <span className="flex items-center gap-1">
              <History className="w-3 h-3 text-zinc-400" />
              <span>思辨演进脉络 ({speakerTurns.length} 幕)</span>
            </span>
            {showHistory ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>

          {showHistory && (
            <div className="mt-1.5 p-2 rounded-xl bg-black/60 border border-white/10 space-y-2.5 max-h-48 overflow-y-auto custom-scrollbar text-left text-[11px] animate-fade-in font-dialectic">
              {speakerTurns.map((st, i) => {
                const turnWavering = st.mindstream?.waveringLevel
                  ? WAVERING_CONFIG[st.mindstream.waveringLevel]
                  : WAVERING_CONFIG.solid;
                return (
                  <div key={st.id || i} className="pb-2 border-b border-white/5 last:border-0 space-y-1">
                    <div className="flex items-center justify-between text-[9.5px] font-mono text-zinc-400">
                      <span className="font-bold text-zinc-300">交锋推演 · 第 {i + 1} 幕</span>
                      <div className="flex items-center gap-1.5">
                        <span className={`px-1.5 py-0.2 rounded border text-[9px] ${turnWavering.badgeCls}`}>
                          {turnWavering.label.split('·')[0].trim()}
                        </span>
                        <span
                          className={`px-1.5 py-0.2 rounded border text-[9px] ${
                            isAmber
                              ? 'border-amber-500/30 text-amber-300 bg-amber-500/10'
                              : 'border-indigo-500/30 text-indigo-300 bg-indigo-500/10'
                          }`}
                        >
                          {st.mindstream?.posture}
                        </span>
                      </div>
                    </div>
                    {st.mindstream?.opponentAppraisal && (
                      <p className="text-zinc-400 text-[10.5px] leading-tight italic">
                        <span className="text-zinc-500 font-mono not-italic text-[9.5px]">论敌评价: </span>
                        “{st.mindstream.opponentAppraisal}”
                      </p>
                    )}
                    {st.mindstream?.resonance && (
                      <p className="text-zinc-300 text-[10.5px] leading-tight">
                        <span className="text-zinc-500 font-mono text-[9.5px]">吸纳: </span>
                        {st.mindstream.resonance}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
