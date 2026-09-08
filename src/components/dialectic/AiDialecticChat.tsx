import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useEpoch } from '../../context/EpochContext';
import { useDialectic } from '../../context/DialecticContext';
import { getAllAvailablePersonas } from '../../data/dynamicPersonaHelper';
import { handleImageFallback } from '../../data/fallbackAvatar';
import {
  Send,
  Sparkles,
  RotateCcw,
  Download,
  Check,
  Search,
  BookOpen,
  Filter,
  Terminal,
  Layers,
  ChevronDown,
  ChevronUp,
  Zap
} from 'lucide-react';
import { PersonaPromptModal } from './PersonaPromptModal';
import { ContextCompressionModal } from './ContextCompressionModal';

export const AiDialecticChat: React.FC = () => {
  const { activeEra, apiConfig } = useEpoch();
  const {
    activePersona,
    activePersonaId,
    selectPersona,
    currentMessages,
    currentDraft,
    setDraftInput,
    isLoading,
    sendMessage,
    resetCurrentThread,
    exportCurrentThread,
    activeSummary,
    isCompressing,
    compressCurrentContext,
    clearContextSummary
  } = useDialectic();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<'all' | 'flagship' | 'eastern' | 'western'>('all');
  const [isCopied, setIsCopied] = useState(false);
  const [showPromptModal, setShowPromptModal] = useState(false);
  const [showContextModal, setShowContextModal] = useState(false);
  const [isSummaryExpanded, setIsSummaryExpanded] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const allPersonas = useMemo(() => getAllAvailablePersonas(), []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentMessages, isLoading]);

  // Filtered personas
  const filteredPersonas = useMemo(() => {
    return allPersonas.filter((p) => {
      const matchQuery =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.signatureStyle.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchQuery) return false;

      if (filterCategory === 'flagship') {
        return ['socrates', 'zhuangzi', 'kant', 'nietzsche', 'camus', 'wang-yangming'].includes(p.id);
      }
      if (filterCategory === 'eastern') {
        return (
          p.title.includes('东周') ||
          p.title.includes('战国') ||
          p.title.includes('明') ||
          p.title.includes('中国') ||
          ['zhuangzi', 'wang-yangming', 'laozi', 'confucius'].includes(p.id)
        );
      }
      if (filterCategory === 'western') {
        return !(
          p.title.includes('东周') ||
          p.title.includes('战国') ||
          p.title.includes('明') ||
          p.title.includes('中国') ||
          ['zhuangzi', 'wang-yangming', 'laozi', 'confucius'].includes(p.id)
        );
      }
      return true;
    });
  }, [allPersonas, searchQuery, filterCategory]);

  const handleExport = async () => {
    const markdown = exportCurrentThread();
    try {
      await navigator.clipboard.writeText(markdown);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (e) {
      console.error('Clipboard copy error:', e);
    }
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!currentDraft.trim() || isLoading) return;
    sendMessage();
  };

  const handleQuickQuestion = (q: string) => {
    setDraftInput(q);
  };

  return (
    <div className="h-full grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-stretch overflow-hidden">
      {/* 1. Left Column: Thinker Selector & Search Drawer */}
      <div className="lg:col-span-4 h-full flex flex-col liquid-glass-card p-3.5 sm:p-4 rounded-2xl overflow-hidden justify-between gap-2.5">
        {/* Header & Filter */}
        <div className="shrink-0 space-y-2 border-b border-white/[0.08] pb-2.5">
          <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
            <span className="uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span>选择对谈先哲 · PERSONAS</span>
            </span>
            <span className="text-[10px] text-amber-300/80 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              全馆 {allPersonas.length} 哲人
            </span>
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索先哲名号、学派或核心范畴..."
              className="w-full bg-black/40 border border-white/10 focus:border-amber-400/50 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder:text-zinc-600 focus:outline-none transition-colors font-sans"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar text-[10.5px] font-mono">
            {[
              { id: 'all', label: '全部' },
              { id: 'flagship', label: '旗舰人格' },
              { id: 'western', label: '西方学统' },
              { id: 'eastern', label: '东方原旨' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilterCategory(cat.id as any)}
                className={`px-2.5 py-1 rounded-lg transition-all shrink-0 cursor-pointer ${
                  filterCategory === cat.id
                    ? 'bg-amber-500/20 text-amber-200 border border-amber-500/40 font-bold'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Thinkers List */}
        <div className="flex-1 min-h-0 overflow-y-auto space-y-1.5 pr-1 custom-scrollbar">
          {filteredPersonas.map((persona) => {
            const isSelected = persona.id === activePersona.id;
            return (
              <button
                key={persona.id}
                onClick={() => selectPersona(persona.id)}
                className={`w-full p-2.5 rounded-xl text-left transition-all duration-200 flex items-center gap-3 border cursor-pointer ${
                  isSelected
                    ? 'bg-amber-500/20 border-amber-500/40 text-white shadow-md'
                    : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.06] hover:border-white/15 text-zinc-300'
                }`}
              >
                <div className="relative shrink-0">
                  <img
                    src={persona.avatar}
                    alt={persona.name}
                    onError={handleImageFallback}
                    className={`w-10 h-10 rounded-full object-cover border transition-all ${
                      isSelected ? 'border-amber-400 shadow-md ring-2 ring-amber-500/30' : 'border-white/10'
                    }`}
                  />
                  {isSelected && (
                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-amber-400 border-2 border-stone-900 flex items-center justify-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-stone-950" />
                    </span>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className={`text-xs sm:text-sm font-dialectic font-bold truncate ${isSelected ? 'text-amber-200' : 'text-stone-200'}`}>
                      {persona.name}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-400 shrink-0">
                      {/* @ts-ignore */}
                      {persona.coreEpoch}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400 truncate mt-0.5 font-sans">
                    {persona.title}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Bottom Active Persona Methodology Footnote */}
        <div className="pt-2 border-t border-white/[0.08] space-y-1 shrink-0 text-xs">
          <div className="text-[10px] font-mono text-amber-300/80 uppercase">
            思辨理路 · METHODOLOGY
          </div>
          <p className="text-stone-300 font-dialectic leading-relaxed text-[12px] line-clamp-2">
            {activePersona.signatureStyle}
          </p>
        </div>
      </div>

      {/* 2. Right Column: Liquid Glass Dialogue Console */}
      <div className="lg:col-span-8 h-full flex flex-col liquid-glass-card p-4 sm:p-5 rounded-2xl overflow-hidden justify-between gap-3">
        {/* Header of Active Thinker */}
        <div className="flex items-center justify-between pb-2.5 border-b border-white/[0.08] shrink-0">
          <div className="flex items-center gap-3">
            <img
              src={activePersona.avatar}
              alt={activePersona.name}
              onError={handleImageFallback}
              className="w-9 h-9 rounded-full object-cover border border-white/20 shadow-md"
            />
            <div>
              <h3 className="text-sm sm:text-base font-bold font-dialectic text-white flex items-center gap-2">
                <span>{activePersona.name}</span>
                <span className="text-xs font-mono font-normal text-amber-300/70">
                  ({activePersona.title})
                </span>
              </h3>
              <div className="text-[10px] font-mono text-zinc-400 flex items-center gap-2">
                <span>1-on-1 纯粹思辨舱</span>
                <span className="text-zinc-600">·</span>
                <span className={apiConfig.apiKey ? 'text-emerald-400' : 'text-amber-400/90'}>
                  {apiConfig.apiKey ? `云端推理 (${apiConfig.model || 'DeepSeek'})` : '哲学原旨深度模拟'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Context Compression Button */}
            <button
              onClick={() => setShowContextModal(true)}
              className={`context-compress-btn p-1.5 px-2.5 rounded-lg border transition-all flex items-center gap-1 text-xs font-mono cursor-pointer ${
                activeSummary
                  ? 'bg-amber-500/15 border-amber-500/40 text-amber-200 hover:bg-amber-500/25 shadow-sm'
                  : 'text-zinc-400 hover:text-stone-200 border-white/10 hover:bg-white/5'
              }`}
              title="查看与管理上下文记忆压缩（Context Compression）"
            >
              <Layers className={`w-3.5 h-3.5 ${activeSummary ? 'text-amber-400' : 'text-zinc-400'}`} />
              <span className="text-[11px] hidden sm:inline">
                {activeSummary
                  ? activeSummary.originalTokensEstimate > activeSummary.compressedTokensEstimate
                    ? `已压缩 (-${Math.round((1 - activeSummary.compressedTokensEstimate / activeSummary.originalTokensEstimate) * 100)}%)`
                    : `已压缩 (${activeSummary.compressedRoundsCount}轮纪要)`
                  : isCompressing
                  ? '正在压缩...'
                  : '记忆压缩'}
              </span>
            </button>

            {/* Persona Prompt & Biography Modal Button */}
            <button
              onClick={() => setShowPromptModal(true)}
              className="persona-prompt-btn p-1.5 px-2.5 text-zinc-300 hover:text-amber-300 rounded-lg hover:bg-amber-500/10 border border-amber-500/20 hover:border-amber-500/40 transition-colors flex items-center gap-1 text-xs font-mono cursor-pointer"
              title="查看当前先哲生平大传长卷与角色设定卡"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-[11px] hidden sm:inline">生平传记 · 设定</span>
            </button>

            {/* Export Button */}
            <button
              onClick={handleExport}
              className="p-1.5 px-2.5 text-zinc-400 hover:text-white rounded-lg hover:bg-white/10 border border-white/10 transition-colors flex items-center gap-1 text-xs font-mono"
              title="复制完整对谈纪要"
            >
              {isCopied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 text-[11px]">已复制</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span className="text-[11px] hidden sm:inline">导出纪要</span>
                </>
              )}
            </button>

            {/* Reset Current Thread Button */}
            <button
              onClick={resetCurrentThread}
              className="p-1.5 px-2 text-zinc-400 hover:text-red-300 rounded-lg hover:bg-red-500/10 border border-white/10 transition-colors flex items-center gap-1 text-xs font-mono"
              title="清空当前先哲对谈记录并重新唤醒"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="text-[11px] hidden sm:inline">重启</span>
            </button>
          </div>
        </div>

        {/* Message Stream */}
        <div className="flex-1 min-h-0 overflow-y-auto space-y-4 pr-2 custom-scrollbar py-1">
          {(() => {
            const cutoffIdx = activeSummary
              ? currentMessages.findIndex((m) => m.id === activeSummary.summarizedUpToMessageId)
              : -1;

            return currentMessages.map((msg, idx) => {
              const isCompressedPortion = cutoffIdx !== -1 && idx <= cutoffIdx;
              const isCutoffPoint = cutoffIdx !== -1 && idx === cutoffIdx;

              return (
                <React.Fragment key={msg.id}>
                  <div
                    className={`flex flex-col space-y-1 animate-fade-in transition-opacity ${
                      msg.sender === 'user' ? 'items-end' : 'items-start'
                    } ${isCompressedPortion ? 'opacity-80 hover:opacity-100' : ''}`}
                  >
                    <div className="flex items-baseline gap-2 text-[10px] font-mono text-zinc-500">
                      <span className={msg.sender === 'user' ? 'text-zinc-400' : 'text-amber-300 font-bold'}>
                        {msg.sender === 'user' ? 'YOU / 提问者' : `✦ ${msg.personaName}`}
                      </span>
                      <span>{msg.timestamp}</span>
                      {isCompressedPortion && (
                        <span className="text-[9px] text-amber-400/80 bg-amber-500/10 px-1.5 py-0.2 rounded border border-amber-500/20">
                          已归纳为思维印记
                        </span>
                      )}
                    </div>
                    <div
                      className={`max-w-[90%] p-4 rounded-2xl text-[15px] sm:text-[15.5px] font-dialectic leading-[1.78] tracking-[0.012em] border transition-all ${
                        msg.sender === 'user'
                          ? 'bg-amber-500/20 border-amber-500/45 text-stone-100 shadow-md rounded-tr-sm'
                          : 'bg-black/50 backdrop-blur-md border border-white/15 text-[#f5f5f4] rounded-tl-sm shadow-lg'
                      }`}
                      style={
                        msg.sender === 'user'
                          ? {
                              boxShadow: `0 0 16px rgba(245, 158, 11, 0.15)`
                            }
                          : undefined
                      }
                    >
                      {msg.text.split('\n\n').map((paragraph, pIdx) => (
                        <p key={pIdx} className={pIdx > 0 ? 'mt-2.5' : ''}>
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Memory Horizon Divider right after the cutoff message */}
                  {isCutoffPoint && activeSummary && (
                    <div className="my-4 p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-stone-900/90 to-amber-500/10 border border-amber-500/35 backdrop-blur-md text-stone-200 shadow-lg select-none animate-fade-in">
                      <div
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() => setIsSummaryExpanded(!isSummaryExpanded)}
                      >
                        <div className="flex items-center gap-2.5 text-xs font-mono text-amber-300">
                          <Sparkles className="w-4 h-4 text-amber-400 shrink-0 animate-pulse" />
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-bold tracking-wide">
                              ✦ 前 {activeSummary.compressedRoundsCount} 轮交锋已凝练为思辨脉络纪要
                            </span>
                            {activeSummary.originalTokensEstimate > activeSummary.compressedTokensEstimate ? (
                              <span className="text-[10px] text-amber-200/90 bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/30">
                                节省约 {activeSummary.originalTokensEstimate - activeSummary.compressedTokensEstimate} tokens ({Math.round((1 - activeSummary.compressedTokensEstimate / activeSummary.originalTokensEstimate) * 100)}%)
                              </span>
                            ) : (
                              <span className="text-[10px] text-amber-200/90 bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/30">
                                4 维哲学认识论高密度沉淀
                              </span>
                            )}
                          </div>
                        </div>
                        <button
                          type="button"
                          className="text-zinc-400 hover:text-amber-200 text-xs flex items-center gap-1 font-mono transition-colors cursor-pointer shrink-0 ml-2"
                        >
                          <span>{isSummaryExpanded ? '收起纪要' : '展开查看纪要'}</span>
                          {isSummaryExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </button>
                      </div>

                      {isSummaryExpanded && (
                        <div className="mt-3 pt-3 border-t border-amber-500/20 animate-fade-in">
                          <div className="text-[10.5px] font-mono text-amber-300/80 mb-2 flex items-center justify-between">
                            <span>高密度哲学认识论脉络 · 4 维结构化要义</span>
                            <span className="text-zinc-500">生成于 {activeSummary.updatedAt}</span>
                          </div>
                          <div className="text-[13.5px] font-dialectic leading-[1.78] text-stone-200 whitespace-pre-line bg-black/50 p-3.5 rounded-xl border border-white/10 shadow-inner">
                            {activeSummary.summary}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </React.Fragment>
              );
            });
          })()}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs font-mono text-amber-300 animate-pulse py-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{activePersona.name} 正在以深刻的哲学理路凝思推导...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Sample Prompts & Input Bar */}
        <div className="space-y-2 pt-2.5 border-t border-white/[0.08] shrink-0">
          {/* Sample Prompts */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs font-mono text-zinc-400">
            <span className="shrink-0 text-zinc-500 text-[10px]">发问示例:</span>
            {activePersona.sampleQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleQuickQuestion(q)}
                className="sample-prompt-btn shrink-0 px-2.5 py-0.5 rounded-full bg-white/[0.04] hover:bg-white/10 border border-white/10 hover:border-amber-400/40 text-[11px] text-zinc-300 hover:text-white transition-colors truncate max-w-[280px]"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex items-center gap-2.5">
            <input
              type="text"
              value={currentDraft}
              onChange={(e) => setDraftInput(e.target.value)}
              placeholder={`向 ${activePersona.name} 提出你的哲学困惑或现实两难...`}
              className="flex-1 bg-black/60 border border-white/15 focus:border-amber-400/50 rounded-xl px-4 py-2.5 text-sm sm:text-[15px] text-[#f5f5f4] placeholder:text-zinc-500 focus:outline-none transition-colors font-dialectic"
            />
            <button
              type="submit"
              disabled={!currentDraft.trim() || isLoading}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-mono text-xs font-bold disabled:opacity-30 transition-all flex items-center gap-1.5 shrink-0 cursor-pointer shadow-lg active:scale-95"
            >
              <span>发问</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>

      {/* Persona Prompt Dossier Modal */}
      <PersonaPromptModal
        persona={activePersona}
        isOpen={showPromptModal}
        onClose={() => setShowPromptModal(false)}
        recentMessagesCount={currentMessages.length}
      />

      {/* Context Compression Modal */}
      <ContextCompressionModal
        isOpen={showContextModal}
        onClose={() => setShowContextModal(false)}
        persona={activePersona}
        summary={activeSummary}
        isCompressing={isCompressing}
        onCompress={() => compressCurrentContext(true)}
        onClear={() => clearContextSummary()}
        totalMessagesCount={currentMessages.length}
        userTurnsCount={currentMessages.filter((m) => m.sender === 'user').length}
      />
    </div>
  );
};
