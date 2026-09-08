import React from 'react';
import { Philosopher } from '../../types/philosophy';
import { useEpoch } from '../../context/EpochContext';
import { handleImageFallback } from '../../data/fallbackAvatar';
import { Quote, Sparkles, Film, ArrowUpRight } from 'lucide-react';

interface PhilosopherCardProps {
  philosopher: Philosopher;
}

export const PhilosopherCard: React.FC<PhilosopherCardProps> = ({ philosopher }) => {
  const { setSelectedPhilosopher } = useEpoch();

  return (
    <div
      onClick={() => setSelectedPhilosopher(philosopher)}
      className="group relative rounded-2xl border border-epoch-border bg-epoch-card p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:border-epoch-accent hover:shadow-glow-lg cursor-pointer flex flex-col justify-between"
    >
      {/* Top Header: Avatar, Name, Region & Lifespan */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-epoch-border/80 group-hover:border-epoch-accent transition-colors shrink-0 bg-black/40">
              <img
                src={philosopher.avatar}
                alt={philosopher.name.zh}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={handleImageFallback}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold font-serif text-epoch-text group-hover:text-epoch-accent transition-colors">
                  {philosopher.name.zh}
                </h3>
                <span className="text-xs text-epoch-muted font-mono hidden sm:inline">
                  {philosopher.name.en}
                </span>
              </div>
              <div className="text-xs text-epoch-muted flex items-center gap-1.5 mt-0.5">
                <span>{philosopher.nationality}</span>
                <span>·</span>
                <span className="font-mono">{philosopher.lifespan}</span>
              </div>
            </div>
          </div>

          <span
            className={`px-2 py-0.5 rounded text-[11px] font-medium shrink-0 ${
              philosopher.region === 'west'
                ? 'bg-blue-500/15 text-blue-300 border border-blue-500/30'
                : 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
            }`}
          >
            {philosopher.region === 'west' ? '西方' : '东方'}
          </span>
        </div>

        {/* Schools Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {philosopher.schools.map((school, idx) => (
            <span
              key={idx}
              className="text-[11px] px-2 py-0.5 rounded-md bg-black/30 border border-white/5 text-epoch-muted"
            >
              {school}
            </span>
          ))}
        </div>

        {/* 30s Core Insight with Quote Icon */}
        <div className="relative p-3.5 rounded-xl bg-epoch-bg/70 border border-epoch-border/60 mb-3 text-xs sm:text-sm text-epoch-text/90 leading-relaxed font-serif">
          <Quote className="w-3.5 h-3.5 text-epoch-accent/50 absolute top-2 right-2" />
          <p className="line-clamp-3">
            <span className="text-epoch-accent font-bold mr-1">核心洞见：</span>
            {philosopher.coreInsight}
          </p>
        </div>

        {/* Analogy Pill */}
        {philosopher.analogy && (
          <div className="text-xs text-epoch-muted/90 flex items-start gap-1.5 mb-4 italic">
            <Sparkles className="w-3.5 h-3.5 text-epoch-accent shrink-0 mt-0.5" />
            <span className="line-clamp-2">通俗比喻：{philosopher.analogy}</span>
          </div>
        )}
      </div>

      {/* Footer: Cultural Echoes & Click Action */}
      <div className="pt-3 border-t border-epoch-border/40 flex items-center justify-between text-xs text-epoch-muted">
        <div className="flex items-center gap-1 text-[11px]">
          {philosopher.culturalEchoIds && philosopher.culturalEchoIds.length > 0 && (
            <span className="flex items-center gap-1 text-emerald-400 font-medium">
              <Film className="w-3 h-3" />
              <span>{philosopher.culturalEchoIds.length} 跨媒介回响</span>
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 text-epoch-accent font-medium group-hover:translate-x-0.5 transition-transform">
          <span>档案</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
};
