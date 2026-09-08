import React, { useState, useRef, useEffect, useMemo } from 'react';
import { DUAL_DEBATES_DATA, DualDebate } from '../../data/aiPersonas';
import { useEpoch } from '../../context/EpochContext';
import { useDialectic, cleanSpeechText, generateFallbackMindstream } from '../../context/DialecticContext';
import { getAllAvailablePersonas, getPersonaById } from '../../data/dynamicPersonaHelper';
import { handleImageFallback } from '../../data/fallbackAvatar';
import { PersonaPromptModal } from './PersonaPromptModal';
import { PhilosopherMindstreamCard } from './PhilosopherMindstreamCard';
import {
  Swords,
  Play,
  Pause,
  SkipForward,
  RotateCcw,
  MessageSquare,
  Sparkles,
  Send,
  UserCheck,
  Download,
  Terminal,
  ArrowRight,
  Scale,
  Zap,
  Search,
  Check,
  Flame,
  BookOpen
} from 'lucide-react';

interface AudienceIntervention {
  id: string;
  question: string;
  responseA: string;
  responseB: string;
  timestamp: string;
}

export const DualDebateTheater: React.FC = () => {
  const { apiConfig } = useEpoch();
  const {
    activeDebateId,
    setActiveDebateId,
    startChatWithPhilosopher,
    customDebate,
    setCustomDebateMode,
    configureCustomDebate,
    startCustomDebate,
    forwardTurnToOpponent,
    setArbitrationDraft,
    resetCustomDebate,
    downloadDebateMarkdown,
    isDebateThinking
  } = useDialectic();

  // Mode: 'custom' | 'preset'
  const currentMode = customDebate.mode || 'custom';

  // Preset Debate State
  const currentPresetDebate: DualDebate =
    DUAL_DEBATES_DATA.find((d) => d.id === activeDebateId) || DUAL_DEBATES_DATA[0];

  const [revealedCount, setRevealedCount] = useState<number>(2);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [audienceQuestion, setAudienceQuestion] = useState<string>('');
  const [isAnswering, setIsAnswering] = useState<boolean>(false);
  const [interventions, setInterventions] = useState<AudienceIntervention[]>([]);

  // Custom Debate Local Form State (for setup phase)
  const allPersonas = useMemo(() => getAllAvailablePersonas(), []);
  const [selectedPhilAId, setSelectedPhilAId] = useState<string>(customDebate.philosopherAId || 'kant');
  const [selectedPhilBId, setSelectedPhilBId] = useState<string>(customDebate.philosopherBId || 'nietzsche');
  const [customTopic, setCustomTopic] = useState<string>(
    customDebate.topic || '强人工智能是否具有真正的主体性与痛苦？'
  );
  const [firstSpeakerId, setFirstSpeakerId] = useState<string>(customDebate.nextSpeakerId || 'kant');

  // Inline arbitration expansion
  const [isArbitrating, setIsArbitrating] = useState<boolean>(false);

  // Persona Prompt Modal inspection
  const [inspectedPersonaId, setInspectedPersonaId] = useState<string | null>(null);

  const transcriptContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll on new turns (scroll only within transcript container, never outer grids)
  useEffect(() => {
    if (transcriptContainerRef.current) {
      transcriptContainerRef.current.scrollTo({
        top: transcriptContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [revealedCount, interventions, customDebate.turns, isDebateThinking]);

  // Preset auto-play timer
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (currentMode === 'preset' && isPlaying && revealedCount < currentPresetDebate.dialogue.length) {
      timer = setTimeout(() => {
        setRevealedCount((prev) => prev + 1);
      }, 3500);
    } else if (revealedCount >= currentPresetDebate.dialogue.length) {
      setIsPlaying(false);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isPlaying, revealedCount, currentPresetDebate.dialogue.length, currentMode]);

  // Helper getters
  const customPhilA = getPersonaById(customDebate.philosopherAId || selectedPhilAId);
  const customPhilB = getPersonaById(customDebate.philosopherBId || selectedPhilBId);
  const nextSpeaker = getPersonaById(customDebate.nextSpeakerId || customDebate.philosopherAId);

  // Preset speakers
  const presetSpeakerId =
    revealedCount > 0 && revealedCount <= currentPresetDebate.dialogue.length
      ? currentPresetDebate.dialogue[revealedCount - 1]?.speakerId
      : null;

  // Active Mindstream resolution
  const philAMindstream = useMemo(() => {
    if (currentMode === 'custom') {
      if (customDebate.mindstreams?.[customPhilA.id]) {
        return customDebate.mindstreams[customPhilA.id];
      }
      const lastATurn = [...customDebate.turns].reverse().find((t) => t.speakerId === customPhilA.id && t.mindstream);
      if (lastATurn?.mindstream) return lastATurn.mindstream;
      return generateFallbackMindstream(customPhilA, customPhilB, customDebate.topic, 1);
    } else {
      const presetPhilA = getPersonaById(currentPresetDebate.philosopherA.id);
      const presetPhilB = getPersonaById(currentPresetDebate.philosopherB.id);
      return generateFallbackMindstream(
        presetPhilA,
        presetPhilB,
        currentPresetDebate.topic,
        Math.max(1, revealedCount)
      );
    }
  }, [currentMode, customDebate.mindstreams, customDebate.turns, customDebate.topic, customPhilA, customPhilB, currentPresetDebate, revealedCount]);

  const philBMindstream = useMemo(() => {
    if (currentMode === 'custom') {
      if (customDebate.mindstreams?.[customPhilB.id]) {
        return customDebate.mindstreams[customPhilB.id];
      }
      const lastBTurn = [...customDebate.turns].reverse().find((t) => t.speakerId === customPhilB.id && t.mindstream);
      if (lastBTurn?.mindstream) return lastBTurn.mindstream;
      return generateFallbackMindstream(customPhilB, customPhilA, customDebate.topic, 1);
    } else {
      const presetPhilA = getPersonaById(currentPresetDebate.philosopherA.id);
      const presetPhilB = getPersonaById(currentPresetDebate.philosopherB.id);
      return generateFallbackMindstream(
        presetPhilB,
        presetPhilA,
        currentPresetDebate.topic,
        Math.max(1, revealedCount)
      );
    }
  }, [currentMode, customDebate.mindstreams, customDebate.turns, customDebate.topic, customPhilA, customPhilB, currentPresetDebate, revealedCount]);

  // Handlers for Preset
  const handlePresetReset = () => {
    setRevealedCount(1);
    setIsPlaying(false);
    setInterventions([]);
  };

  const handleAudienceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const q = audienceQuestion.trim();
    if (!q || isAnswering) return;

    setAudienceQuestion('');
    setIsAnswering(true);

    await new Promise((r) => setTimeout(r, 800));

    let respA = '';
    let respB = '';

    if (currentPresetDebate.id === 'kant-vs-nietzsche') {
      respA = `你所提出的这个问题，恰恰检验了准则的普遍性。我们绝不能为特殊情况开脱特例；唯有将人作为最高目的本身，理性才能在困境中确立绝对命令。`;
      respB = `虚伪的道德法庭！看见了吗？提问者本能地在逃避生存的残酷法则！去拥抱烈火吧，只有敢于打破旧秩序的强力意志，才能在这场困境中锤炼出真正的人性！`;
    } else {
      respA = `君子以仁存心，以礼存心。处世安邦，若无规矩礼法与教化，天下将何以立身？克己复礼，天下归仁焉。`;
      respB = `大音希声，大象无形。越是强加干涉规范，世人越易生狡诈之私。顺应自然而行，无为而无不为，道法自然方是出路。`;
    }

    setInterventions((prev) => [
      ...prev,
      {
        id: `interv-${Date.now()}`,
        question: q,
        responseA: respA,
        responseB: respB,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setIsAnswering(false);
  };

  // Handlers for Custom Debate
  const handleStartCustomDebate = () => {
    configureCustomDebate(selectedPhilAId, selectedPhilBId, customTopic, firstSpeakerId);
    startCustomDebate();
  };

  const handleDirectForward = () => {
    forwardTurnToOpponent();
  };

  const handleArbitrationSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const draft = customDebate.arbitrationDraft.trim();
    if (!draft) return;
    forwardTurnToOpponent(draft);
    setIsArbitrating(false);
  };

  const handleQuickMatch = (aId: string, bId: string, topic: string) => {
    setSelectedPhilAId(aId);
    setSelectedPhilBId(bId);
    setCustomTopic(topic);
    setFirstSpeakerId(aId);
    configureCustomDebate(aId, bId, topic, aId);
  };

  return (
    <div className="h-full flex flex-col gap-3 overflow-hidden select-none">
      {/* 1. Top Mode & Controller Bar */}
      <div className="p-2.5 rounded-2xl liquid-glass-card flex items-center justify-between gap-3 shrink-0 flex-wrap">
        {/* Left: Mode Switcher */}
        <div className="flex items-center gap-1.5 text-xs font-mono">
          <button
            onClick={() => setCustomDebateMode('custom')}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 border cursor-pointer ${
              currentMode === 'custom'
                ? 'bg-amber-500/25 border-amber-500/60 text-amber-100 font-bold shadow-sm'
                : 'border-white/10 hover:bg-white/[0.05] text-zinc-400 hover:text-white'
            }`}
          >
            <Swords className="w-3.5 h-3.5 text-amber-400" />
            <span>自定义世纪论剑 (自由选角 & 仲裁)</span>
          </button>

          <button
            onClick={() => setCustomDebateMode('preset')}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 border cursor-pointer ${
              currentMode === 'preset'
                ? 'bg-amber-500/25 border-amber-500/60 text-amber-100 font-bold shadow-sm'
                : 'border-white/10 hover:bg-white/[0.05] text-zinc-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>经典名局预设</span>
          </button>
        </div>

        {/* Right Controls */}
        {currentMode === 'custom' ? (
          <div className="flex items-center gap-2 font-mono text-xs">
            {customDebate.status === 'debating' && (
              <>
                <button
                  onClick={downloadDebateMarkdown}
                  className="px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-zinc-200 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                  title="下载排版完整的 Markdown 辩论大典纪要文件"
                >
                  <Download className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-[11px] hidden sm:inline">下载辩论纪要 (.md)</span>
                </button>

                <button
                  onClick={resetCustomDebate}
                  className="px-2.5 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-300 transition-all flex items-center gap-1.5 cursor-pointer"
                  title="重新配置对局先哲与论题"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="text-[11px] hidden sm:inline">重置对局</span>
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar font-mono text-xs">
            {DUAL_DEBATES_DATA.map((debate) => {
              const isActive = debate.id === currentPresetDebate.id;
              return (
                <button
                  key={debate.id}
                  onClick={() => setActiveDebateId(debate.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-serif transition-all whitespace-nowrap flex items-center gap-2 border cursor-pointer ${
                    isActive
                      ? 'bg-amber-500/20 border-amber-500/50 text-amber-200 shadow-md font-bold'
                      : 'border-white/10 hover:bg-white/[0.05] text-zinc-400 hover:text-white'
                  }`}
                >
                  <span>
                    {debate.philosopherA.name} vs {debate.philosopherB.name}
                  </span>
                </button>
              );
            })}

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`p-1.5 rounded-xl border transition-all flex items-center gap-1 px-2.5 cursor-pointer ${
                isPlaying
                  ? 'bg-amber-500 text-black font-bold border-amber-400'
                  : 'bg-white/5 hover:bg-white/10 border-white/10 text-zinc-300'
              }`}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span className="text-[11px]">{isPlaying ? '播放中' : '自动推演'}</span>
            </button>

            <button
              onClick={() => {
                if (revealedCount < currentPresetDebate.dialogue.length) {
                  setRevealedCount((prev) => prev + 1);
                }
              }}
              disabled={revealedCount >= currentPresetDebate.dialogue.length}
              className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 disabled:opacity-30 transition-all flex items-center gap-1 px-2 cursor-pointer"
            >
              <SkipForward className="w-3.5 h-3.5" />
              <span className="text-[11px] hidden sm:inline">思想推进</span>
            </button>

            <button
              onClick={handlePresetReset}
              className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-400 hover:text-white transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* 2. Main Body: Custom Mode Setup or Active Arena */}
      {currentMode === 'custom' && customDebate.status === 'setup' ? (
        /* Setup Phase Dashboard */
        <div className="flex-1 min-h-0 overflow-y-auto liquid-glass-card rounded-2xl p-5 sm:p-7 flex flex-col justify-between gap-6 custom-scrollbar">
          <div className="space-y-5 max-w-4xl mx-auto w-full">
            {/* Title Header */}
            <div className="text-center space-y-2 border-b border-white/10 pb-4">
              <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 text-xs font-mono uppercase tracking-widest inline-flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>自定义世纪先哲论剑台</span>
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-dialectic text-white">
                设定对战先哲、自定辩题与开场立论
              </h2>
              <p className="text-xs sm:text-sm text-stone-300 font-dialectic leading-relaxed">
                自由指派全馆任意两位先哲展开跨时空巅峰辩难。您可以自定义辩题，并在思想交锋进程中以“第三方仲裁”角色介入批注或直接令对方驳斥。
              </p>
            </div>

            {/* Quick Match Inspiration Pills */}
            <div className="space-y-2">
              <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block">
                ⚡ 经典灵感对决快捷注入:
              </span>
              <div className="flex flex-wrap gap-2 text-xs font-serif">
                {[
                  {
                    a: 'kant',
                    b: 'nietzsche',
                    title: '康德 vs 尼采',
                    topic: '绝对道德律令是崇高的理性尊严，还是弱者的奴隶谎言？'
                  },
                  {
                    a: 'zhuangzi',
                    b: 'camus',
                    title: '庄子 vs 加缪',
                    topic: '面对冰冷荒谬的世界，应当齐物逍遥还是不屈反抗？'
                  },
                  {
                    a: 'confucius',
                    b: 'laozi',
                    title: '孔子 vs 老子',
                    topic: '天下大治应恪守礼乐仁义经世，还是顺应自然无为而治？'
                  },
                  {
                    a: 'socrates',
                    b: 'wang-yangming',
                    title: '苏格拉底 vs 王阳明',
                    topic: '美德是通过自知无知的理性辩难获得，还是本具于自心良知？'
                  },
                  {
                    a: 'marx',
                    b: 'aristotle',
                    title: '马克思 vs 亚里士多德',
                    topic: '人的本质是由阶级生产关系所塑造，还是合乎理性的德性目的？'
                  }
                ].map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuickMatch(item.a, item.b, item.topic)}
                    className="px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-amber-500/20 hover:border-amber-500/40 border border-white/10 text-zinc-300 hover:text-amber-100 transition-all text-left flex items-center gap-1.5 cursor-pointer"
                  >
                    <span className="font-bold text-amber-300/90">{item.title}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Two Combatant Selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Philosopher A */}
              <div className="p-4 rounded-2xl bg-amber-500/[0.04] border border-amber-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-amber-300 flex items-center gap-1.5">
                    <span>正方主辩两造 (PHILOSOPHER A)</span>
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500">正方阵营</span>
                </div>

                <div className="flex items-center gap-3">
                  <img
                    src={getPersonaById(selectedPhilAId).avatar}
                    alt={getPersonaById(selectedPhilAId).name}
                    onError={handleImageFallback}
                    className="w-14 h-14 rounded-2xl object-cover border border-amber-500/40 shadow-lg shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <select
                      value={selectedPhilAId}
                      onChange={(e) => {
                        setSelectedPhilAId(e.target.value);
                        if (firstSpeakerId === selectedPhilAId) setFirstSpeakerId(e.target.value);
                      }}
                      className="w-full bg-stone-900 border border-white/15 focus:border-amber-400 rounded-xl px-3 py-2 text-sm text-white font-serif focus:outline-none cursor-pointer"
                    >
                      {allPersonas.map((p) => (
                        <option key={p.id} value={p.id} className="bg-stone-900 text-white">
                          {p.name} ({p.title})
                        </option>
                      ))}
                    </select>
                    <p className="text-[11px] font-serif text-amber-200/70 truncate mt-1">
                      {getPersonaById(selectedPhilAId).signatureStyle}
                    </p>
                  </div>
                </div>
              </div>

              {/* Philosopher B */}
              <div className="p-4 rounded-2xl bg-indigo-500/[0.04] border border-indigo-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-indigo-300 flex items-center gap-1.5">
                    <span>反方应辩两造 (PHILOSOPHER B)</span>
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500">反方阵营</span>
                </div>

                <div className="flex items-center gap-3">
                  <img
                    src={getPersonaById(selectedPhilBId).avatar}
                    alt={getPersonaById(selectedPhilBId).name}
                    onError={handleImageFallback}
                    className="w-14 h-14 rounded-2xl object-cover border border-indigo-500/40 shadow-lg shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <select
                      value={selectedPhilBId}
                      onChange={(e) => setSelectedPhilBId(e.target.value)}
                      className="w-full bg-stone-900 border border-white/15 focus:border-indigo-400 rounded-xl px-3 py-2 text-sm text-white font-serif focus:outline-none cursor-pointer"
                    >
                      {allPersonas.map((p) => (
                        <option key={p.id} value={p.id} className="bg-stone-900 text-white">
                          {p.name} ({p.title})
                        </option>
                      ))}
                    </select>
                    <p className="text-[11px] font-serif text-indigo-200/70 truncate mt-1">
                      {getPersonaById(selectedPhilBId).signatureStyle}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Custom Topic / Opening Statement Input */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-zinc-300 flex items-center justify-between">
                <span>✦ 辩论主题 / 用户发起之初始命题:</span>
                <span className="text-[10px] text-zinc-500 font-normal">支持自由输入任意哲学命题或现实困惑</span>
              </label>
              <textarea
                rows={2}
                value={customTopic}
                onChange={(e) => setCustomTopic(e.target.value)}
                placeholder="在此输入你希望两造哲学家展开辩难的核心命题或开场白..."
                className="w-full bg-black/50 border border-white/15 focus:border-amber-400/50 rounded-xl p-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none transition-colors font-serif resize-none"
              />
            </div>

            {/* First Speaker Selection */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/10 text-xs font-mono">
              <span className="text-zinc-400">选择谁先开篇立论：</span>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-1.5 cursor-pointer text-amber-200">
                  <input
                    type="radio"
                    name="firstSpeaker"
                    checked={firstSpeakerId === selectedPhilAId}
                    onChange={() => setFirstSpeakerId(selectedPhilAId)}
                    className="accent-amber-500"
                  />
                  <span>由正方 {getPersonaById(selectedPhilAId).name} 先行立论</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer text-indigo-200">
                  <input
                    type="radio"
                    name="firstSpeaker"
                    checked={firstSpeakerId === selectedPhilBId}
                    onChange={() => setFirstSpeakerId(selectedPhilBId)}
                    className="accent-indigo-500"
                  />
                  <span>由反方 {getPersonaById(selectedPhilBId).name} 先行立论</span>
                </label>
              </div>
            </div>
          </div>

          {/* Launch Button */}
          <div className="text-center pt-2 max-w-md mx-auto w-full">
            <button
              onClick={handleStartCustomDebate}
              disabled={isDebateThinking || !customTopic.trim()}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-stone-950 font-bold font-mono text-sm tracking-wider shadow-[0_0_30px_rgba(245,158,11,0.4)] hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40"
            >
              <Swords className="w-4 h-4" />
              <span>{isDebateThinking ? '正在唤醒两造先哲...' : '开启世纪论剑巅峰大辩论 →'}</span>
            </button>
          </div>
        </div>
      ) : (
        /* Active Debate Arena (Both Custom & Preset) */
        <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-3 overflow-hidden">
          {/* Left Column: Philosopher A */}
          <div
            className={`lg:col-span-3 h-full min-h-0 rounded-2xl liquid-glass-card p-4 flex flex-col justify-between overflow-hidden transition-all duration-500 border ${
              (currentMode === 'custom' ? customDebate.nextSpeakerId !== customPhilA.id : presetSpeakerId === currentPresetDebate.philosopherA.id)
                ? 'border-amber-400/60 shadow-[0_0_24px_rgba(245,158,11,0.25)] bg-amber-500/[0.04]'
                : 'border-white/10 opacity-80'
            }`}
          >
            <div className="space-y-3 text-center flex flex-col items-center shrink-0">
              <div className="relative shrink-0">
                <img
                  src={currentMode === 'custom' ? customPhilA.avatar : currentPresetDebate.philosopherA.avatar}
                  alt={currentMode === 'custom' ? customPhilA.name : currentPresetDebate.philosopherA.name}
                  onError={handleImageFallback}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-white/20 shadow-xl shrink-0"
                />
                {(currentMode === 'custom'
                  ? customDebate.nextSpeakerId !== customPhilA.id && customDebate.turns.length > 0
                  : presetSpeakerId === currentPresetDebate.philosopherA.id) && (
                  <span className="absolute -bottom-1 -right-1 px-2 py-0.5 rounded-full bg-amber-500 text-black font-mono font-bold text-[9px] shadow-lg animate-pulse">
                    刚发言
                  </span>
                )}
                {currentMode === 'custom' && customDebate.nextSpeakerId === customPhilA.id && (
                  <span className="absolute -bottom-1 -right-1 px-2 py-0.5 rounded-full bg-amber-400/30 text-amber-300 font-mono font-bold text-[9px] border border-amber-400/50">
                    等待应战
                  </span>
                )}
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-bold font-dialectic text-white">
                  {currentMode === 'custom' ? customPhilA.name : currentPresetDebate.philosopherA.name}
                </h3>
                <p className="text-[11px] font-mono text-amber-300/80 mt-0.5">
                  {currentMode === 'custom' ? customPhilA.title : '正方立场方阵'}
                </p>
              </div>
            </div>

            {/* Mindstream Dossier Card for Philosopher A */}
            <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar px-0.5">
              <PhilosopherMindstreamCard
                persona={currentMode === 'custom' ? customPhilA : getPersonaById(currentPresetDebate.philosopherA.id)}
                opponent={currentMode === 'custom' ? customPhilB : getPersonaById(currentPresetDebate.philosopherB.id)}
                topic={currentMode === 'custom' ? customDebate.topic : currentPresetDebate.topic}
                mindstream={philAMindstream}
                turns={customDebate.turns}
                themeColor="amber"
                isThinking={isDebateThinking && nextSpeaker.id === (currentMode === 'custom' ? customPhilA.id : currentPresetDebate.philosopherA.id)}
                onOpenBiography={() => setInspectedPersonaId(currentMode === 'custom' ? customPhilA.id : currentPresetDebate.philosopherA.id)}
              />
            </div>

            <div className="pt-3 border-t border-white/10 space-y-2 shrink-0">
              <button
                onClick={() => setInspectedPersonaId(currentMode === 'custom' ? customPhilA.id : currentPresetDebate.philosopherA.id)}
                className="w-full py-1.5 px-3 rounded-xl bg-white/5 hover:bg-amber-500/20 text-zinc-300 hover:text-amber-200 border border-white/10 text-xs font-mono transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                <span>生平传记 · Prompt 设定</span>
              </button>

              <button
                onClick={() =>
                  startChatWithPhilosopher(
                    currentMode === 'custom' ? customPhilA.id : currentPresetDebate.philosopherA.id
                  )
                }
                className="w-full py-2 px-3 rounded-xl bg-white/10 hover:bg-amber-500 hover:text-black border border-white/15 text-xs font-mono font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>入舱一对一深谈 →</span>
              </button>
            </div>
          </div>

          {/* Center Column: Transcript & Live Clash */}
          <div className="lg:col-span-6 h-full min-h-0 rounded-2xl liquid-glass-card p-4 flex flex-col justify-between overflow-hidden gap-3">
            {/* Topic & Description Header */}
            <div className="pb-2.5 border-b border-white/[0.08] shrink-0 text-center space-y-1">
              <div className="text-[10.5px] font-mono uppercase tracking-widest text-amber-300/80 flex items-center justify-center gap-1.5">
                <Sparkles className="w-3 h-3" />
                <span>
                  {currentMode === 'custom'
                    ? `思想对垒 · ${customPhilA.name} VS ${customPhilB.name}`
                    : currentPresetDebate.description}
                </span>
              </div>
              <h2 className="text-[15px] sm:text-base font-bold font-dialectic text-white leading-snug">
                “{currentMode === 'custom' ? customDebate.topic : currentPresetDebate.topic}”
              </h2>
              <div className="text-[10px] font-mono text-zinc-500 flex items-center justify-center gap-2">
                <span>
                  {currentMode === 'custom'
                    ? `思辨交锋历程 · ${customDebate.turns.filter((t) => t.type === 'turn').length} 幕`
                    : `思辨交锋历程 · ${revealedCount} / ${currentPresetDebate.dialogue.length} 幕`}
                </span>
                <span className="text-zinc-600">·</span>
                <span className={apiConfig.apiKey ? 'text-emerald-400' : 'text-amber-400/80'}>
                  {apiConfig.apiKey ? `双引擎推理 (${apiConfig.model || 'DeepSeek'})` : '哲学原旨深度仿真'}
                </span>
              </div>
            </div>

            {/* Dialogue Transcript Stream */}
            <div ref={transcriptContainerRef} className="flex-1 min-h-0 overflow-y-auto space-y-3.5 pr-2 custom-scrollbar py-1 select-text">
              {currentMode === 'custom' ? (
                /* Custom Debate Transcript */
                <>
                  {customDebate.turns.map((turn, idx) => {
                    if (turn.type === 'topic') {
                      return (
                        <div
                          key={turn.id}
                          className="p-3.5 rounded-2xl bg-amber-500/[0.08] border border-amber-500/25 space-y-1 animate-fade-in"
                        >
                          <div className="flex items-center gap-2 text-[10px] font-mono text-amber-300 font-bold">
                            <Sparkles className="w-3 h-3" />
                            <span>✦ 破题立论与初始命题 ({turn.timestamp}):</span>
                          </div>
                          <p className="text-[14px] sm:text-[15px] font-dialectic text-[#f5f5f4] leading-[1.75]">
                            {turn.text}
                          </p>
                        </div>
                      );
                    }

                    if (turn.type === 'arbitration') {
                      return (
                        <div
                          key={turn.id}
                          className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-indigo-500/10 to-transparent border border-amber-400/40 space-y-1 animate-fade-in"
                        >
                          <div className="flex items-center gap-2 text-[10.5px] font-mono text-amber-300 font-bold">
                            <Scale className="w-3.5 h-3.5 text-amber-400" />
                            <span>⚖️ 第三方仲裁席批注与质询 ({turn.timestamp}):</span>
                          </div>
                          <p className="text-[14px] sm:text-[15px] font-dialectic text-amber-100/95 leading-[1.75] pl-2.5 border-l-2 border-amber-400/50">
                            {turn.text}
                          </p>
                        </div>
                      );
                    }

                    const isA = turn.speakerId === customPhilA.id;
                    const cleanedSpeech = cleanSpeechText(turn.text, turn.speakerName);
                    return (
                      <div
                        key={turn.id}
                        className={`flex flex-col space-y-1 animate-fade-in ${
                          isA ? 'items-start' : 'items-end'
                        }`}
                      >
                        <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-400">
                          <span className={`font-bold ${isA ? 'text-amber-200' : 'text-indigo-200'}`}>
                            {turn.speakerName}
                          </span>
                          <span className="text-zinc-600">·</span>
                          <span>{turn.timestamp}</span>
                          {turn.mindstream && (
                            <span
                              className={`px-1.5 py-0.2 rounded text-[9.5px] border ${
                                isA
                                  ? 'border-amber-500/30 text-amber-300 bg-amber-500/10'
                                  : 'border-indigo-500/30 text-indigo-300 bg-indigo-500/10'
                              }`}
                            >
                              ✦ {turn.mindstream.posture}
                            </span>
                          )}
                        </div>

                        <div
                          className={`max-w-[90%] p-3.5 sm:p-4 rounded-2xl text-[14.5px] sm:text-[15.5px] font-dialectic leading-[1.78] tracking-[0.012em] border shadow-lg ${
                            isA
                              ? 'bg-amber-500/[0.12] border-amber-500/35 text-[#f5f5f4] rounded-tl-sm'
                              : 'bg-indigo-500/[0.12] border-indigo-500/35 text-[#f5f5f4] rounded-tr-sm'
                          }`}
                        >
                          <p>{cleanedSpeech}</p>
                          {turn.mindstream && (
                            <div
                              className={`mt-2.5 pt-2 border-t text-[11px] font-dialectic space-y-1 ${
                                isA ? 'border-amber-500/20 text-amber-200/90' : 'border-indigo-500/20 text-indigo-200/90'
                              }`}
                            >
                              {turn.mindstream.opponentAppraisal && (
                                <div className="text-[10px] font-mono italic opacity-85 truncate">
                                  ✦ 论敌评价: “{turn.mindstream.opponentAppraisal}”
                                </div>
                              )}
                              {turn.mindstream.resonance && (
                                <div className="flex items-center gap-1.5 text-[11px]">
                                  <span className="text-[9.5px] font-mono opacity-60 shrink-0">微澜吸纳:</span>
                                  <span className="truncate">{turn.mindstream.resonance}</span>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}

                  {isDebateThinking && (
                    <div className="p-3 rounded-xl bg-white/[0.04] border border-amber-400/30 text-xs font-mono text-amber-300 animate-pulse flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 animate-spin" />
                      <span>{nextSpeaker.name} 正在严密审视论点并准备锋利反驳...</span>
                    </div>
                  )}
                </>
              ) : (
                /* Preset Debate Transcript */
                <>
                  {currentPresetDebate.dialogue.slice(0, revealedCount).map((turn, idx) => {
                    const isA = turn.speakerId === currentPresetDebate.philosopherA.id;
                    const cleanedPresetSpeech = cleanSpeechText(turn.text, turn.speakerName);
                    return (
                      <div
                        key={idx}
                        className={`flex flex-col space-y-1 animate-fade-in ${
                          isA ? 'items-start' : 'items-end'
                        }`}
                      >
                        <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-400">
                          <span className={`font-bold ${isA ? 'text-amber-200' : 'text-indigo-200'}`}>
                            {turn.speakerName}
                          </span>
                          <span className="text-zinc-600">·</span>
                          <span>交锋 0{idx + 1}</span>
                        </div>

                        <div
                          className={`max-w-[90%] p-3.5 sm:p-4 rounded-2xl text-[14.5px] sm:text-[15.5px] font-dialectic leading-[1.78] tracking-[0.012em] border shadow-lg ${
                            isA
                              ? 'bg-amber-500/[0.12] border-amber-500/35 text-[#f5f5f4] rounded-tl-sm'
                              : 'bg-indigo-500/[0.12] border-indigo-500/35 text-[#f5f5f4] rounded-tr-sm'
                          }`}
                        >
                          {cleanedPresetSpeech}
                        </div>
                      </div>
                    );
                  })}

                  {/* Interventions in Preset */}
                  {interventions.map((item) => (
                    <div key={item.id} className="space-y-2 pt-2 border-t border-white/10 animate-fade-in">
                      <div className="flex items-start gap-2 bg-white/10 p-3 rounded-xl border border-white/15">
                        <UserCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <div className="text-[13.5px] sm:text-[14px] font-dialectic text-white">
                          <span className="font-mono text-[10px] text-amber-300 block mb-0.5">
                            观众席第三方质询 ({item.timestamp}):
                          </span>
                          {item.question}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[13.5px] sm:text-[14px] font-dialectic leading-[1.75]">
                        <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[#f5f5f4]">
                          <span className="text-amber-300 font-bold block text-[11px] mb-1">
                            {currentPresetDebate.philosopherA.name}：
                          </span>
                          {item.responseA}
                        </div>
                        <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-[#f5f5f4]">
                          <span className="text-indigo-300 font-bold block text-[11px] mb-1">
                            {currentPresetDebate.philosopherB.name}：
                          </span>
                          {item.responseB}
                        </div>
                      </div>
                    </div>
                  ))}

                  {isAnswering && (
                    <div className="flex items-center gap-2 text-xs font-mono text-amber-300 animate-pulse py-2">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>双方先哲正在审视观众席质询并准备应答...</span>
                    </div>
                  )}
                </>
              )}

              <div className="h-2" />
            </div>

            {/* Bottom Interactive Turn Action Dock */}
            {currentMode === 'custom' ? (
              <div className="pt-2 border-t border-white/[0.08] shrink-0 space-y-2">
                {!isArbitrating ? (
                  /* Dual Action Selection: Direct Forward vs Add Arbitration */
                  <div className="flex items-center justify-between gap-2 p-2 rounded-xl bg-black/40 border border-white/10">
                    <div className="text-xs font-mono text-zinc-300 flex items-center gap-2 pl-1 truncate">
                      <span className="text-amber-400 font-bold">下一发言方：</span>
                      <span className="px-2 py-0.5 rounded bg-white/10 text-white font-bold truncate">
                        {nextSpeaker.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {/* Direct Forward */}
                      <button
                        onClick={handleDirectForward}
                        disabled={isDebateThinking}
                        className="direct-forward-btn px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-mono font-bold text-xs disabled:opacity-30 transition-all flex items-center gap-1.5 cursor-pointer shadow-md active:scale-95"
                        title={`将上一位先哲立论直接交由 ${nextSpeaker.name} 展开反驳`}
                      >
                        <Zap className="w-3.5 h-3.5" />
                        <span>直接转交对方反驳</span>
                      </button>

                      {/* Add Arbitration */}
                      <button
                        onClick={() => setIsArbitrating(true)}
                        disabled={isDebateThinking}
                        className="arbitration-toggle-btn px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-amber-200 font-mono text-xs transition-all flex items-center gap-1.5 cursor-pointer"
                        title="作为第三方仲裁者，批注此论述并向对方抛出质询"
                      >
                        <Scale className="w-3.5 h-3.5 text-amber-400" />
                        <span>以第三方仲裁补充</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Inline Arbitration Input Drawer */
                  <form onSubmit={handleArbitrationSubmit} className="space-y-2 animate-fade-in">
                    <div className="flex items-center justify-between text-[11px] font-mono text-amber-300">
                      <span className="flex items-center gap-1.5 font-bold">
                        <Scale className="w-3.5 h-3.5" />
                        <span>⚖️ 第三方仲裁席介入（你的批注将作为交锋前设交由【{nextSpeaker.name}】应对）：</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => setIsArbitrating(false)}
                        className="text-zinc-500 hover:text-white transition-colors cursor-pointer"
                      >
                        取消仲裁
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={customDebate.arbitrationDraft}
                        onChange={(e) => setArbitrationDraft(e.target.value)}
                        placeholder={`作为第三方仲裁，指出前述立论盲区，并向 ${nextSpeaker.name} 提出辩难要旨...`}
                        className="flex-1 bg-black/50 border border-amber-500/40 focus:border-amber-400 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white placeholder:text-zinc-600 focus:outline-none transition-colors font-serif"
                        autoFocus
                      />
                      <button
                        type="submit"
                        disabled={!customDebate.arbitrationDraft.trim() || isDebateThinking}
                        className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-mono font-bold text-xs disabled:opacity-30 transition-all flex items-center gap-1.5 shrink-0 cursor-pointer shadow-lg active:scale-95"
                      >
                        <span>裁决并转交</span>
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </form>
                )}
              </div>
            ) : (
              /* Preset Audience Question Form */
              <form
                onSubmit={handleAudienceSubmit}
                className="pt-2 border-t border-white/[0.08] shrink-0 flex items-center gap-2"
              >
                <input
                  type="text"
                  value={audienceQuestion}
                  onChange={(e) => setAudienceQuestion(e.target.value)}
                  placeholder="作为第三方仲裁，向辩论双方抛出你的追问..."
                  className="flex-1 bg-black/40 border border-white/15 focus:border-amber-400/50 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-zinc-600 focus:outline-none transition-colors font-serif"
                />
                <button
                  type="submit"
                  disabled={!audienceQuestion.trim() || isAnswering}
                  className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-mono font-bold text-xs disabled:opacity-30 transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer"
                >
                  <span>发问</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Philosopher B */}
          <div
            className={`lg:col-span-3 h-full min-h-0 rounded-2xl liquid-glass-card p-4 flex flex-col justify-between overflow-hidden transition-all duration-500 border ${
              (currentMode === 'custom' ? customDebate.nextSpeakerId !== customPhilB.id : presetSpeakerId === currentPresetDebate.philosopherB.id)
                ? 'border-indigo-400/60 shadow-[0_0_24px_rgba(99,102,241,0.25)] bg-indigo-500/[0.04]'
                : 'border-white/10 opacity-80'
            }`}
          >
            <div className="space-y-3 text-center flex flex-col items-center shrink-0">
              <div className="relative shrink-0">
                <img
                  src={currentMode === 'custom' ? customPhilB.avatar : currentPresetDebate.philosopherB.avatar}
                  alt={currentMode === 'custom' ? customPhilB.name : currentPresetDebate.philosopherB.name}
                  onError={handleImageFallback}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-white/20 shadow-xl shrink-0"
                />
                {(currentMode === 'custom'
                  ? customDebate.nextSpeakerId !== customPhilB.id && customDebate.turns.length > 0
                  : presetSpeakerId === currentPresetDebate.philosopherB.id) && (
                  <span className="absolute -bottom-1 -left-1 px-2 py-0.5 rounded-full bg-indigo-500 text-white font-mono font-bold text-[9px] shadow-lg animate-pulse">
                    刚发言
                  </span>
                )}
                {currentMode === 'custom' && customDebate.nextSpeakerId === customPhilB.id && (
                  <span className="absolute -bottom-1 -left-1 px-2 py-0.5 rounded-full bg-indigo-400/30 text-indigo-300 font-mono font-bold text-[9px] border border-indigo-400/50">
                    等待应战
                  </span>
                )}
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-bold font-dialectic text-white">
                  {currentMode === 'custom' ? customPhilB.name : currentPresetDebate.philosopherB.name}
                </h3>
                <p className="text-[11px] font-mono text-indigo-300/80 mt-0.5">
                  {currentMode === 'custom' ? customPhilB.title : '反方立场方阵'}
                </p>
              </div>
            </div>

            {/* Mindstream Dossier Card for Philosopher B */}
            <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar px-0.5">
              <PhilosopherMindstreamCard
                persona={currentMode === 'custom' ? customPhilB : getPersonaById(currentPresetDebate.philosopherB.id)}
                opponent={currentMode === 'custom' ? customPhilA : getPersonaById(currentPresetDebate.philosopherA.id)}
                topic={currentMode === 'custom' ? customDebate.topic : currentPresetDebate.topic}
                mindstream={philBMindstream}
                turns={customDebate.turns}
                themeColor="indigo"
                isThinking={isDebateThinking && nextSpeaker.id === (currentMode === 'custom' ? customPhilB.id : currentPresetDebate.philosopherB.id)}
                onOpenBiography={() => setInspectedPersonaId(currentMode === 'custom' ? customPhilB.id : currentPresetDebate.philosopherB.id)}
              />
            </div>

            <div className="pt-3 border-t border-white/10 space-y-2 shrink-0">
              <button
                onClick={() => setInspectedPersonaId(currentMode === 'custom' ? customPhilB.id : currentPresetDebate.philosopherB.id)}
                className="w-full py-1.5 px-3 rounded-xl bg-white/5 hover:bg-indigo-500/20 text-zinc-300 hover:text-indigo-200 border border-white/10 text-xs font-mono transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                <span>生平传记 · Prompt 设定</span>
              </button>

              <button
                onClick={() =>
                  startChatWithPhilosopher(
                    currentMode === 'custom' ? customPhilB.id : currentPresetDebate.philosopherB.id
                  )
                }
                className="w-full py-2 px-3 rounded-xl bg-white/10 hover:bg-indigo-500 hover:text-white border border-white/15 text-xs font-mono font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>入舱一对一深谈 →</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Inspected Persona Prompt Modal */}
      {inspectedPersonaId && (
        <PersonaPromptModal
          persona={getPersonaById(inspectedPersonaId)}
          isOpen={Boolean(inspectedPersonaId)}
          onClose={() => setInspectedPersonaId(null)}
          recentMessagesCount={customDebate.turns.length}
        />
      )}
    </div>
  );
};
