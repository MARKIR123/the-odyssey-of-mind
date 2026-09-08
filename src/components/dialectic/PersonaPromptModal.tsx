import React, { useState } from 'react';
import { AIPersona } from '../../data/aiPersonas';
import { useEpoch } from '../../context/EpochContext';
import { PHILOSOPHERS_DATA } from '../../data/philosophers';
import { getPhilosopherBiography } from '../../data/biographies';
import { handleImageFallback } from '../../data/fallbackAvatar';
import {
  X,
  Copy,
  Check,
  Code2,
  Cpu,
  BookOpen,
  Sparkles,
  Terminal,
  Layers,
  ArrowRight,
  ShieldCheck,
  MessageSquare,
  History,
  Zap,
  Award,
  Compass,
  Quote,
  ScrollText,
  Calendar,
  MapPin,
  Flame,
  Bookmark
} from 'lucide-react';

interface PersonaPromptModalProps {
  persona: AIPersona;
  isOpen: boolean;
  onClose: () => void;
  recentMessagesCount?: number;
}

export const PersonaPromptModal: React.FC<PersonaPromptModalProps> = ({
  persona,
  isOpen,
  onClose,
  recentMessagesCount = 0
}) => {
  const { apiConfig } = useEpoch();
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'biography' | 'prompt' | 'architecture' | 'pipeline'>('biography');
  const [bioSection, setBioSection] = useState<'chronicle' | 'crisis' | 'academic' | 'anecdotes'>('chronicle');

  // Find corresponding philosopher & biography
  const phil = PHILOSOPHERS_DATA.find(
    (p) => p.id === persona.id || p.name.zh === persona.name || p.name.en === persona.name
  );
  const bio = phil?.biography || getPhilosopherBiography(persona.id) || (phil ? getPhilosopherBiography(phil.id) : undefined);

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(persona.systemPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error('Failed to copy prompt:', e);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in select-none">
      <div
        className="relative w-full max-w-3xl max-h-[90vh] bg-stone-950/95 border border-amber-500/30 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden text-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Philosopher Profile */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between gap-4 bg-gradient-to-r from-amber-500/[0.08] via-transparent to-transparent shrink-0">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="relative">
              <img
                src={persona.avatar}
                alt={persona.name}
                onError={handleImageFallback}
                className="w-12 h-12 rounded-2xl object-cover border border-amber-500/40 shadow-lg shrink-0"
              />
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-stone-950" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold font-serif text-white truncate">
                  {persona.name}
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 shrink-0">
                  {phil?.lifespan ? `${phil.nationality} · ${phil.lifespan}` : '先哲生平大典 · WIKI'}
                </span>
              </div>
              <p className="text-xs font-mono text-zinc-400 truncate mt-0.5">
                {persona.title} {phil?.name.en ? `(${phil.name.en})` : ''}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-colors border border-white/5 cursor-pointer shrink-0"
            title="关闭探针 (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="px-4 sm:px-5 pt-3 pb-2 border-b border-white/[0.06] flex items-center justify-between gap-2 shrink-0 bg-stone-900/40 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1.5 text-xs font-mono shrink-0">
            <button
              onClick={() => setActiveTab('biography')}
              className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 border ${
                activeTab === 'biography'
                  ? 'bg-amber-500/20 text-amber-200 border-amber-500/40 font-bold shadow-sm'
                  : 'border-transparent text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <ScrollText className="w-3.5 h-3.5 text-amber-400" />
              <span>生平史诗长卷</span>
            </button>

            <button
              onClick={() => setActiveTab('prompt')}
              className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 border ${
                activeTab === 'prompt'
                  ? 'bg-amber-500/20 text-amber-200 border-amber-500/40 font-bold shadow-sm'
                  : 'border-transparent text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Terminal className="w-3.5 h-3.5 text-amber-400" />
              <span>原生 System Prompt</span>
            </button>

            <button
              onClick={() => setActiveTab('architecture')}
              className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 border ${
                activeTab === 'architecture'
                  ? 'bg-amber-500/20 text-amber-200 border-amber-500/40 font-bold shadow-sm'
                  : 'border-transparent text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              <span>设定架构拆解</span>
            </button>

            <button
              onClick={() => setActiveTab('pipeline')}
              className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 border ${
                activeTab === 'pipeline'
                  ? 'bg-amber-500/20 text-amber-200 border-amber-500/40 font-bold shadow-sm'
                  : 'border-transparent text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Cpu className="w-3.5 h-3.5 text-amber-400" />
              <span>运行时装配链路</span>
            </button>
          </div>

          {activeTab === 'prompt' && (
            <button
              onClick={handleCopy}
              className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-amber-500 hover:text-black border border-white/15 text-[11px] font-mono transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-bold">已复制</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>复制 Prompt</span>
                </>
              )}
            </button>
          )}
        </div>

        {/* Content Area */}
        <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-5 custom-scrollbar font-sans select-text">
          {activeTab === 'biography' && (
            <div className="space-y-4">
              {/* 1. Sub-nav Pills */}
              <div className="flex items-center gap-1.5 p-1 bg-white/[0.03] rounded-2xl border border-white/10 text-xs font-mono overflow-x-auto no-scrollbar">
                <button
                  onClick={() => setBioSection('chronicle')}
                  className={`flex-1 py-1.5 px-3 rounded-xl transition-all text-center flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer ${
                    bioSection === 'chronicle'
                      ? 'bg-amber-500/25 text-amber-200 border border-amber-500/50 font-bold shadow-sm'
                      : 'text-stone-400 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <History className="w-3.5 h-3.5 text-amber-400" />
                  <span>波澜纪程 ({bio?.lifeChronicle.length || 0}阶段)</span>
                </button>

                <button
                  onClick={() => setBioSection('crisis')}
                  className={`flex-1 py-1.5 px-3 rounded-xl transition-all text-center flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer ${
                    bioSection === 'crisis'
                      ? 'bg-amber-500/25 text-amber-200 border border-amber-500/50 font-bold shadow-sm'
                      : 'text-stone-400 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>思想史顿悟与危机</span>
                </button>

                <button
                  onClick={() => setBioSection('academic')}
                  className={`flex-1 py-1.5 px-3 rounded-xl transition-all text-center flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer ${
                    bioSection === 'academic'
                      ? 'bg-amber-500/25 text-amber-200 border border-amber-500/50 font-bold shadow-sm'
                      : 'text-stone-400 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                  <span>传世原典与学统</span>
                </button>

                <button
                  onClick={() => setBioSection('anecdotes')}
                  className={`flex-1 py-1.5 px-3 rounded-xl transition-all text-center flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer ${
                    bioSection === 'anecdotes'
                      ? 'bg-amber-500/25 text-amber-200 border border-amber-500/50 font-bold shadow-sm'
                      : 'text-stone-400 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <span>逸事轶闻与遗泽</span>
                </button>
              </div>

              {/* Top Summary Banner */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/20 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2 py-0.5 rounded-lg bg-amber-500/20 text-amber-300 font-mono text-[11px] border border-amber-500/30">
                    {phil?.eraId ? `ERA: ${phil.eraId} · 时代先哲` : '哲学史权威名录'}
                  </span>
                  {phil?.nationality && (
                    <span className="text-zinc-300 flex items-center gap-1 font-mono text-[11px]">
                      <MapPin className="w-3 h-3 text-amber-400" />
                      <span>{phil.nationality}</span>
                    </span>
                  )}
                  {phil?.lifespan && (
                    <span className="text-zinc-300 flex items-center gap-1 font-mono text-[11px]">
                      <Calendar className="w-3 h-3 text-amber-400" />
                      <span>{phil.lifespan}</span>
                    </span>
                  )}
                </div>

                {phil?.schools && phil.schools.length > 0 && (
                  <div className="flex items-center gap-1 text-[11px] font-mono text-zinc-400">
                    <span className="text-zinc-500">学派渊源：</span>
                    <span className="text-amber-200 font-serif">{phil.schools.join(' · ')}</span>
                  </div>
                )}
              </div>

              {/* Sub-tab 1: Chronicle */}
              {bioSection === 'chronicle' && (
                <div className="space-y-4">
                  {/* Historical Epoch Background */}
                  {bio?.historicalEpochBackground && (
                    <div className="p-4 rounded-2xl bg-amber-500/[0.05] border border-amber-500/25 space-y-2">
                      <div className="text-xs font-mono font-bold text-amber-300 flex items-center gap-2">
                        <Compass className="w-4 h-4 text-amber-400" />
                        <span>时代历史洪流与社会危机 / HISTORICAL EPOCH</span>
                      </div>
                      <p className="text-xs sm:text-[13px] text-stone-200 leading-relaxed font-sans">
                        {bio.historicalEpochBackground}
                      </p>
                    </div>
                  )}

                  {/* Life Stages Timeline */}
                  <div className="space-y-3 pt-1">
                    <div className="text-xs font-mono font-bold text-zinc-400 flex items-center gap-2">
                      <History className="w-4 h-4 text-amber-400" />
                      <span>先哲波澜壮阔生平纪程 / LIFE CHRONICLE</span>
                    </div>

                    <div className="relative pl-4 space-y-4 before:absolute before:left-1.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-amber-400 before:via-amber-500/40 before:to-transparent">
                      {(bio?.lifeChronicle || []).map((stage, idx) => (
                        <div key={idx} className="relative space-y-1.5 group">
                          <div className="absolute -left-[22px] top-1 w-3 h-3 rounded-full bg-stone-950 border-2 border-amber-400 group-hover:scale-125 transition-transform shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
                          <div className="flex items-baseline justify-between gap-3 flex-wrap">
                            <h4 className="text-sm font-serif font-bold text-amber-100 group-hover:text-amber-300 transition-colors">
                              {stage.title}
                            </h4>
                            <span className="text-[11px] font-mono text-amber-400/90 px-2 py-0.5 rounded-lg bg-amber-500/15 border border-amber-500/30">
                              {stage.period}
                            </span>
                          </div>
                          <div className="text-[10.5px] font-mono text-amber-300/70 font-semibold">
                            {stage.phase}
                          </div>
                          <p className="text-xs sm:text-[13px] text-stone-300 leading-relaxed font-sans">
                            {stage.summary}
                          </p>
                          {stage.keyEvents && stage.keyEvents.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {stage.keyEvents.map((evt, eIdx) => (
                                <span
                                  key={eIdx}
                                  className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/10 text-[10.5px] font-mono text-stone-300"
                                >
                                  ✦ {evt}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Sub-tab 2: Crisis */}
              {bioSection === 'crisis' && (
                <div className="space-y-3.5">
                  <div className="p-3.5 rounded-2xl bg-amber-500/[0.06] border border-amber-500/30 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-mono font-bold text-amber-300 flex items-center gap-2">
                        <Zap className="w-4 h-4 text-amber-400" />
                        <span>认识论危机与破壁时刻 / EPISTEMIC CRISIS</span>
                      </div>
                      {bio?.epistemicCrisis?.year && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          {bio.epistemicCrisis.year}
                        </span>
                      )}
                    </div>
                    <p className="text-sm sm:text-base font-serif font-bold text-amber-100 leading-relaxed">
                      {bio?.epistemicCrisis?.title || '思想范式转换与认识论破壁'}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                    <div className="text-xs font-mono font-bold text-rose-300/90 flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5 text-rose-400" />
                      <span>危机诱因与思想困境 / NARRATIVE</span>
                    </div>
                    <p className="text-xs sm:text-[13px] text-stone-300 leading-relaxed font-sans">
                      {bio?.epistemicCrisis?.narrative}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/10 via-black/40 to-stone-950/80 border border-amber-500/30 space-y-2">
                    <div className="text-xs font-mono font-bold text-emerald-300/90 flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-emerald-400" />
                      <span>思想史破壁转向与哲学跃迁 / BREAKTHROUGH</span>
                    </div>
                    <p className="text-xs sm:text-[13px] text-amber-100/95 leading-relaxed font-sans italic bg-black/40 p-2.5 rounded-xl border border-amber-500/20">
                      “{bio?.epistemicCrisis?.breakthrough}”
                    </p>
                  </div>

                  {/* Methodology Anchor */}
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-transparent to-transparent border border-amber-500/25 space-y-1.5">
                    <div className="text-[10.5px] font-mono text-amber-300 font-bold uppercase tracking-wider">
                      先哲专属思辨理路与辩论心流锚点
                    </div>
                    <p className="text-xs sm:text-sm font-serif text-amber-100 leading-relaxed">
                      {persona.signatureStyle}
                    </p>
                  </div>
                </div>
              )}

              {/* Sub-tab 3: Academic Works & Core Concepts */}
              {bioSection === 'academic' && (
                <div className="space-y-4">
                  {phil?.notableWorks && phil.notableWorks.length > 0 && (
                    <div className="space-y-2.5">
                      <div className="text-xs font-mono font-bold text-zinc-400 flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-amber-400" />
                        <span>传世代表原著与奠基文本 / NOTABLE WORKS</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {phil.notableWorks.map((work, wIdx) => (
                          <div
                            key={wIdx}
                            className="p-3 rounded-xl bg-white/[0.03] border border-white/10 hover:border-amber-500/30 transition-all flex items-center gap-2"
                          >
                            <Bookmark className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                            <span className="text-xs font-serif font-bold text-amber-200">
                              {work}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {phil?.keyConcepts && phil.keyConcepts.length > 0 && (
                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2.5">
                      <div className="text-xs font-mono font-bold text-zinc-400 flex items-center gap-2">
                        <Layers className="w-4 h-4 text-amber-400" />
                        <span>核心范畴与思想基石 / KEY CONCEPTS</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {phil.keyConcepts.map((concept, cIdx) => (
                          <div
                            key={cIdx}
                            className="p-2.5 rounded-xl bg-amber-500/[0.05] border border-amber-500/25 space-y-1"
                          >
                            <div className="text-xs font-bold text-amber-200 font-serif">
                              ✦ {concept.term}
                            </div>
                            <div className="text-[11px] text-stone-300 leading-snug">
                              {concept.explanation}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {phil?.famousQuotes && phil.famousQuotes.length > 0 && (
                    <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
                      <div className="text-xs font-mono font-bold text-zinc-400 flex items-center gap-2">
                        <Quote className="w-4 h-4 text-amber-400" />
                        <span>原典传世名言 / FAMOUS QUOTES</span>
                      </div>
                      <div className="space-y-2">
                        {phil.famousQuotes.slice(0, 3).map((q, qIdx) => (
                          <div key={qIdx} className="p-2.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
                            <p className="text-xs font-serif text-amber-100/90 leading-relaxed italic">
                              “{q.quote}”
                            </p>
                            {q.source && (
                              <div className="text-[10px] font-mono text-amber-400/70 text-right">
                                —— 《{q.source}》
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Sub-tab 4: Anecdotes & Legacy */}
              {bioSection === 'anecdotes' && (
                <div className="space-y-3.5">
                  <div className="space-y-2.5">
                    <div className="text-xs font-mono font-bold text-zinc-400 flex items-center gap-2">
                      <Bookmark className="w-4 h-4 text-amber-400" />
                      <span>史料轶事与生平吉光片羽 / HISTORICAL ANECDOTES</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {(bio?.anecdotes || []).map((anecdote, aIdx) => (
                        <div
                          key={aIdx}
                          className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-amber-500/30 transition-all space-y-2"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs font-serif font-bold text-amber-200">
                              ✦ {anecdote.title}
                            </span>
                          </div>
                          <p className="text-xs sm:text-[12.5px] text-stone-300 leading-relaxed font-sans">
                            {anecdote.detail}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Epitaph / Legacy */}
                  {bio?.epitaphOrLegacy && (
                    <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-amber-500/5 to-transparent border border-amber-500/35 space-y-2 text-left">
                      <div className="text-xs font-mono font-bold text-amber-300 flex items-center gap-2">
                        <Award className="w-4 h-4 text-amber-400" />
                        <span>墓志铭与思想史后世遗泽 / EPITAPH & HISTORICAL LEGACY</span>
                      </div>
                      <p className="text-xs sm:text-sm font-serif text-amber-100 leading-relaxed font-medium">
                        “{bio.epitaphOrLegacy}”
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
          {activeTab === 'prompt' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>系统级提示词源码（System Instruction）</span>
                </span>
                <span>字符数：{persona.systemPrompt.length}</span>
              </div>

              {/* Code block style terminal */}
              <div className="relative rounded-2xl bg-black/60 border border-white/10 p-4 font-mono text-xs sm:text-[13px] leading-relaxed text-amber-100/90 whitespace-pre-wrap selection:bg-amber-500/40">
                {persona.systemPrompt}
              </div>

              <div className="p-3 rounded-xl bg-amber-500/[0.06] border border-amber-500/20 flex items-start gap-2.5 text-xs text-stone-300">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  <span className="font-bold text-amber-300">设计提示：</span>
                  此 Prompt 是先哲灵魂的核心逻辑容器。它不仅规约了第一人称身份，更约束了大模型不得使用廉价鸡汤敷衍提问，必须严格调动原著范畴、哲学反诘法与历史背景展开深刻推演。
                </div>
              </div>
            </div>
          )}

          {activeTab === 'architecture' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1.5">
                  <div className="text-xs font-mono text-amber-300 font-bold flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>01 / 身份基石与历史锚定</span>
                  </div>
                  <p className="text-xs text-stone-300 leading-relaxed font-serif">
                    严格锚定先哲的历史时代、学统渊源与传世原旨，防止 AI 产生时空错乱或使用现代流行语汇破坏沉浸感。
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1.5">
                  <div className="text-xs font-mono text-amber-300 font-bold flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" />
                    <span>02 / 核心范畴与概念约束</span>
                  </div>
                  <p className="text-xs text-stone-300 leading-relaxed font-serif">
                    强制要求先哲将回答收敛至其核心哲学范畴（如康德的“绝对命令”、庄子的“齐物”、尼采的“权力意志”），形成鲜明论证辨识度。
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1.5">
                  <div className="text-xs font-mono text-amber-300 font-bold flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>03 / 思辨风格与反诘机锋</span>
                  </div>
                  <p className="text-xs text-stone-300 leading-relaxed font-serif">
                    从不简单给予“现成答案”，而是通过苏格拉底产婆术、先验批判或悖论反问，层层穿透提问者未经省察的前设偏见。
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1.5">
                  <div className="text-xs font-mono text-amber-300 font-bold flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>04 / 思想边界与语态纯粹性</span>
                  </div>
                  <p className="text-xs text-stone-300 leading-relaxed font-serif">
                    杜绝“AI语言模型助手”式的机械腔调，确保每一句输出都仿佛从羊皮卷或竹简中苏醒的活态思想回响。
                  </p>
                </div>
              </div>

              {/* Signature Style Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30 space-y-1.5">
                <span className="text-[10px] font-mono text-amber-300 uppercase tracking-widest block">
                  当前先哲专属思辨理路 (SIGNATURE METHODOLOGY)
                </span>
                <p className="text-sm font-serif text-amber-100 font-bold leading-relaxed">
                  {persona.signatureStyle}
                </p>
              </div>
            </div>
          )}

          {activeTab === 'pipeline' && (
            <div className="space-y-4 font-mono text-xs">
              <div className="text-zinc-400 text-[11px]">
                API 消息装配 Pipeline（大模型上下文调用结构图示）：
              </div>

              <div className="space-y-2.5">
                {/* Step 1 */}
                <div className="p-3.5 rounded-2xl bg-black/40 border border-amber-500/30 flex items-start gap-3">
                  <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold shrink-0 mt-0.5">
                    ROLE: SYSTEM
                  </span>
                  <div className="min-w-0">
                    <div className="text-white font-bold mb-1">
                      先哲角色设定卡 ({persona.systemPrompt.length} chars)
                    </div>
                    <div className="text-zinc-400 text-[11px] truncate">
                      {persona.systemPrompt.slice(0, 90)}...
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <ArrowRight className="w-4 h-4 text-zinc-600 rotate-90" />
                </div>

                {/* Step 2 */}
                <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 flex items-start gap-3">
                  <span className="px-2 py-0.5 rounded bg-white/10 text-zinc-300 text-[10px] font-bold shrink-0 mt-0.5">
                    ROLE: HISTORY
                  </span>
                  <div className="min-w-0">
                    <div className="text-white font-bold mb-1">
                      滑动对谈记忆窗口 (最近 {Math.min(recentMessagesCount, 8)} 回合)
                    </div>
                    <div className="text-zinc-400 text-[11px]">
                      维护多轮对谈连续性，记忆先哲与提问者前续辩论交锋。
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <ArrowRight className="w-4 h-4 text-zinc-600 rotate-90" />
                </div>

                {/* Step 3 */}
                <div className="p-3.5 rounded-2xl bg-black/40 border border-indigo-500/30 flex items-start gap-3">
                  <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-[10px] font-bold shrink-0 mt-0.5">
                    ROLE: USER
                  </span>
                  <div className="min-w-0">
                    <div className="text-white font-bold mb-1">
                      当前最新提问与概念困惑
                    </div>
                    <div className="text-zinc-400 text-[11px]">
                      注入用户的问题，触发先哲第一人称深度思辨与反诘推导。
                    </div>
                  </div>
                </div>
              </div>

              {/* Status footer */}
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-[11px] text-zinc-400 flex items-center justify-between">
                <span>当前推理通道：</span>
                <span className={apiConfig.apiKey ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
                  {apiConfig.apiKey ? `云端推理 (${apiConfig.model || 'DeepSeek'})` : '内置先哲仿真引擎'}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3.5 px-5 border-t border-white/10 bg-black/40 flex items-center justify-between text-xs font-mono text-zinc-500 shrink-0">
          <span>The Odyssey of Mind · Persona Prompt Engine</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold transition-colors cursor-pointer"
          >
            完成查看
          </button>
        </div>
      </div>
    </div>
  );
};
