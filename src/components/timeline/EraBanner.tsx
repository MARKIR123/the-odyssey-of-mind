import React from 'react';
import { useEpoch } from '../../context/EpochContext';
import { ERAS_DATA } from '../../data/eras';
import { Sparkles, Palette, HelpCircle, ArrowRight, Clock } from 'lucide-react';

export const EraBanner: React.FC = () => {
  const { activeEra, setActiveEraId } = useEpoch();

  return (
    <div className="relative overflow-hidden rounded-3xl border border-epoch-border bg-epoch-card p-6 sm:p-8 mb-8 backdrop-blur-xl transition-all shadow-glow-sm">
      {/* Background radial glow */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-radial-gradient pointer-events-none opacity-40 blur-2xl" />

      {/* Top Epoch Pills for Quick Jumping */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-6 border-b border-epoch-border/60 no-scrollbar">
        {ERAS_DATA.map((era, index) => {
          const isSelected = era.id === activeEra.id;
          return (
            <button
              key={era.id}
              onClick={() => setActiveEraId(era.id)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                isSelected
                  ? 'bg-epoch-accent text-gray-950 font-bold shadow-sm ring-2 ring-epoch-accent/30'
                  : 'bg-black/30 hover:bg-black/50 text-epoch-muted hover:text-epoch-text border border-white/5'
              }`}
            >
              <span className="font-mono opacity-60">0{index + 1}</span>
              <span>{era.name.zh}</span>
              <span className="text-[10px] opacity-75 font-mono hidden sm:inline">({era.timeRange})</span>
            </button>
          );
        })}
      </div>

      {/* Main Era Hero Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Title & Historical Context */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="px-2.5 py-1 rounded-md bg-epoch-accent/20 text-epoch-accent text-xs font-mono font-semibold border border-epoch-border">
              {activeEra.timeRange}
            </span>
            <span className="text-xs text-epoch-muted font-serif flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-epoch-accent" />
              历史演进纪元
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-bold font-serif text-epoch-text tracking-tight">
            {activeEra.name.zh}
          </h2>
          <div className="text-sm font-mono text-epoch-accent font-medium">
            {activeEra.name.en}
          </div>

          <p className="text-sm sm:text-base text-epoch-text/85 leading-relaxed">
            {activeEra.description}
          </p>

          {/* Era Vibe & Art Movement Linkage */}
          <div className="p-4 rounded-2xl bg-black/30 border border-epoch-border/80 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-epoch-accent uppercase tracking-wider">
              <Palette className="w-4 h-4" />
              <span>时代艺术流派与美学精神 (Epoch Aesthetics)</span>
            </div>
            <div className="text-xs sm:text-sm font-serif text-epoch-text font-medium">
              {activeEra.vibeTitle} · 对应艺术：{activeEra.artMovement}
            </div>
            <p className="text-xs text-epoch-muted leading-relaxed">
              {activeEra.artPhilosophyConnection}
            </p>
          </div>
        </div>

        {/* Right Column: Major Philosophical Questions of this Era */}
        <div className="lg:col-span-5 p-5 rounded-2xl bg-epoch-bg/80 border border-epoch-border space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-epoch-accent uppercase tracking-wider">
            <HelpCircle className="w-4 h-4" />
            <span>该时代的灵魂终极追问</span>
          </div>
          <ul className="space-y-2.5">
            {activeEra.majorQuestions.map((q, idx) => (
              <li key={idx} className="text-xs sm:text-sm text-epoch-text/90 flex items-start gap-2 leading-snug">
                <span className="w-5 h-5 rounded-full bg-epoch-accent/20 text-epoch-accent text-[11px] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span>{q}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
