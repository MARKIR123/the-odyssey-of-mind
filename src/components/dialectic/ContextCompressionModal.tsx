import React from 'react';
import { AIPersona } from '../../data/aiPersonas';
import { ContextSummary } from '../../context/DialecticContext';
import {
  X,
  Layers,
  Sparkles,
  Trash2,
  RotateCw,
  CheckCircle2,
  ShieldCheck,
  Zap,
  BookOpen
} from 'lucide-react';

interface ContextCompressionModalProps {
  isOpen: boolean;
  onClose: () => void;
  persona: AIPersona;
  summary?: ContextSummary;
  isCompressing: boolean;
  onCompress: () => void;
  onClear: () => void;
  totalMessagesCount: number;
  userTurnsCount: number;
}

export const ContextCompressionModal: React.FC<ContextCompressionModalProps> = ({
  isOpen,
  onClose,
  persona,
  summary,
  isCompressing,
  onCompress,
  onClear,
  totalMessagesCount,
  userTurnsCount
}) => {
  if (!isOpen) return null;

  const isPositiveSaving =
    summary && summary.originalTokensEstimate > summary.compressedTokensEstimate;
  const savedTokens = isPositiveSaving
    ? summary.originalTokensEstimate - summary.compressedTokensEstimate
    : 0;
  const savingRatio = isPositiveSaving
    ? Math.round((1 - summary.compressedTokensEstimate / summary.originalTokensEstimate) * 100)
    : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in select-none">
      <div
        className="relative w-full max-w-2xl max-h-[90vh] bg-stone-950/95 border border-amber-500/30 rounded-3xl shadow-[0_0_60px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden text-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between gap-4 bg-gradient-to-r from-amber-500/[0.12] via-transparent to-transparent shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300">
              <Layers className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold font-dialectic text-white">
                  思辨上下文压缩 · CONTEXT COMPRESSION
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {persona.name} 专席
                </span>
              </div>
              <p className="text-xs font-mono text-zinc-400 mt-0.5">
                高密度哲学认识论脉络提炼 · 杜绝长程推演失忆与 Token 膨胀
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 custom-scrollbar">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-3 gap-2.5">
            <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between">
              <span className="text-[10px] font-mono text-zinc-400 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-amber-400" />
                <span>压缩状态</span>
              </span>
              <span className="text-sm sm:text-base font-bold text-white mt-1">
                {summary ? '已生效 · 活跃中' : '未压缩 · 裸历史'}
              </span>
              <span className="text-[10px] font-mono text-zinc-500 mt-0.5">
                {summary ? `生成于 ${summary.updatedAt}` : `共 ${totalMessagesCount} 条消息`}
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between">
              <span className="text-[10px] font-mono text-zinc-400 flex items-center gap-1">
                <BookOpen className="w-3 h-3 text-amber-400" />
                <span>记忆深度</span>
              </span>
              <span className="text-sm sm:text-base font-bold text-amber-300 mt-1">
                {summary ? `前 ${summary.compressedRoundsCount} 轮交锋` : `${userTurnsCount} 轮问答`}
              </span>
              <span className="text-[10px] font-mono text-zinc-500 mt-0.5">
                {summary ? '已沉淀为哲学印记' : '待达到阈值自动凝练'}
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between">
              <span className="text-[10px] font-mono text-zinc-400 flex items-center gap-1">
                <Zap className="w-3 h-3 text-amber-400" />
                <span>Token 节省率</span>
              </span>
              <span className="text-sm sm:text-base font-bold text-emerald-400 mt-1">
                {savingRatio > 0 ? `-${savingRatio}%` : summary ? '高密度提炼' : '0%'}
              </span>
              <span className="text-[10px] font-mono text-zinc-500 mt-0.5 truncate">
                {savingRatio > 0
                  ? `节省约 ${savedTokens} tok`
                  : summary
                  ? '四维认识论结构化'
                  : '全量发送给端点'}
              </span>
            </div>
          </div>

          {/* Detailed Summary View or Empty Guide */}
          {summary ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                <span className="uppercase tracking-wider flex items-center gap-1.5 text-amber-300 font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>当前高密度思辨脉络纪要</span>
                </span>
                <span className="text-[10px] text-zinc-500">
                  约 {summary.compressedTokensEstimate} Tokens
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-black/60 border border-amber-500/25 text-stone-200 text-sm font-dialectic leading-[1.8] whitespace-pre-line shadow-inner">
                {summary.summary}
              </div>

              <div className="p-3 rounded-xl bg-amber-500/[0.06] border border-amber-500/20 text-[11px] font-sans text-stone-300 leading-relaxed">
                <strong className="text-amber-300">💡 机制说明：</strong>
                此纪要已作为 System 上下文随每一次发问自动送入大模型端点。后续无论交锋进行至第几十轮，先哲都会牢记开局确立的论题与您所作的论断让步，杜绝思维漂移。
              </div>
            </div>
          ) : (
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mx-auto">
                <Layers className="w-6 h-6" />
              </div>
              <div className="max-w-md mx-auto space-y-1">
                <h4 className="text-sm font-bold text-white font-dialectic">
                  尚未生成思辨上下文压缩
                </h4>
                <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                  系统会在对话超过 4~6 轮时自动启动后台静默压缩。您也可以现在点击下方按钮，立即将已有的对话提炼为四维哲学思辨脉络纪要。
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-white/10 flex items-center justify-between gap-3 bg-stone-900/60 shrink-0">
          <div>
            {summary && (
              <button
                onClick={onClear}
                className="px-3 py-2 rounded-xl text-xs font-mono text-zinc-400 hover:text-red-300 hover:bg-red-500/10 border border-transparent hover:border-red-500/30 transition-all flex items-center gap-1.5 cursor-pointer"
                title="清空压缩纪要，恢复全量原始历史"
              >
                <Trash2 className="w-3.5 h-3.5 text-red-400" />
                <span>清空压缩记忆</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-mono text-zinc-400 hover:text-white hover:bg-white/5 border border-white/10 transition-colors cursor-pointer"
            >
              关闭
            </button>

            <button
              onClick={onCompress}
              disabled={isCompressing || totalMessagesCount < 2}
              className="px-4 py-2 rounded-xl text-xs font-mono bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-500/40 hover:border-amber-400 transition-all flex items-center gap-1.5 shadow-md disabled:opacity-50 cursor-pointer"
            >
              {isCompressing ? (
                <>
                  <RotateCw className="w-3.5 h-3.5 animate-spin text-amber-300" />
                  <span>正在提炼哲学纪要...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>{summary ? '重新提炼/更新纪要' : '立即提炼压缩记忆'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
