import React from 'react';
import { Philosopher } from '../../types/philosophy';
import { getCardHonorific } from '../../data/cardHonorifics';
import { handleImageFallback } from '../../data/fallbackAvatar';

interface CorridorPhilosopherCardProps {
  phil: Philosopher;
  eraThemeColor: string;
  language: 'zh' | 'en';
  onClick: () => void;
  isHero?: boolean;
}

function getContrastTextColor(hexColor: string): string {
  const hex = hexColor.replace('#', '');
  if (hex.length !== 6) return '#0a0a0c';
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? '#0a0a0c' : '#ffffff';
}

export const CorridorPhilosopherCard: React.FC<CorridorPhilosopherCardProps> = ({
  phil,
  eraThemeColor,
  language,
  onClick,
  isHero = false
}) => {
  const cardHonorific = getCardHonorific(phil);
  const badgeTextColor = getContrastTextColor(eraThemeColor);
  const rawConcept = phil.keyConcepts[0]?.term || phil.schools[0] || '思想原旨';
  const cleanConcept = rawConcept.replace(/\s*\(.*?\)/g, '').trim();

  return (
    <div className="flex flex-col items-center shrink-0 group/card-wrapper py-1 select-none">
      {/* Standalone Corridor Balatro SSR Card */}
      <div
        role="button"
        tabIndex={0}
        aria-label={
          language === 'zh'
            ? `哲学家典藏卡 ${phil.name.zh}，点击放大聚焦检视`
            : `Philosopher Card ${phil.name.en}, click to zoom and focus inspect`
        }
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick();
          }
        }}
        className={`relative ${
          isHero ? 'w-[235px] sm:w-[255px]' : 'w-[220px] sm:w-[240px]'
        } h-[355px] sm:h-[380px] rounded-[22px] overflow-hidden cursor-pointer flex flex-col justify-between border border-amber-400/35 hover:border-amber-300/80 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.025] hover:shadow-[0_16px_40px_rgba(245,158,11,0.3)] shadow-[0_12px_32px_rgba(0,0,0,0.85)] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400`}
        style={{
          background: '#0d0c14'
        }}
      >
        {/* Full-bleed Portrait Cover Image */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[21px]">
          <img
            src={phil.avatar}
            alt={phil.name.zh}
            referrerPolicy="no-referrer"
            onError={handleImageFallback}
            className="w-full h-full object-cover object-top filter contrast-[1.06] brightness-[0.92] group-hover/card-wrapper:scale-105 group-hover/card-wrapper:brightness-100 transition-transform duration-500"
            loading="lazy"
          />
          {/* Vignette Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0c14] via-[#0d0c14]/40 to-[#0d0c14]/75 pointer-events-none" />
          {/* Hover Specular Overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/0 via-amber-300/10 to-transparent opacity-0 group-hover/card-wrapper:opacity-100 transition-opacity duration-300 pointer-events-none" />
          {/* Fine Card Inner Border Line */}
          <div className="absolute inset-1 rounded-[17px] border border-white/10 pointer-events-none" />
        </div>

        {/* 1. Top Frosted Header Bar */}
        <div className="relative z-10 m-2 px-2.5 py-1.5 rounded-xl balatro-glass-header flex items-center justify-between">
          <span
            className="text-[9.5px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-sm truncate max-w-[110px]"
            style={{ backgroundColor: eraThemeColor, color: badgeTextColor }}
          >
            {phil.schools[0] || '思想先驱'}
          </span>
          <span className="text-[10px] font-mono font-medium text-zinc-300">
            {phil.lifespan}
          </span>
        </div>

        {/* 2. Middle Identity Area (Name + Integrated Subtitle) */}
        <div className="relative z-10 px-3.5 mt-auto mb-1 text-left">
          <h4 className="text-xl sm:text-2xl font-black font-serif tracking-tight leading-none text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] laser-style-liquid-chrome-gold">
            {language === 'zh' ? phil.name.zh : phil.name.en}
          </h4>
          <div className="flex items-center gap-1.5 mt-1 text-xs font-mono text-amber-200/95 font-medium drop-shadow-md">
            <span className="text-amber-400 text-[11px]">✦</span>
            <span className="font-bold text-amber-300 tracking-wide text-[11.5px]">{cardHonorific}</span>
            <span className="text-amber-500/60">•</span>
            <span className="text-zinc-300 text-[10.5px] truncate max-w-[110px]">{phil.nationality}</span>
          </div>
        </div>

        {/* 3. Bottom Frosted Glass Quote Box */}
        <div className="relative z-10 m-2 p-2.5 rounded-xl balatro-glass-quote text-left flex flex-col justify-between gap-1.5 border border-white/15 group-hover/card-wrapper:border-amber-400/45 transition-colors">
          <p className="text-xs sm:text-[12.5px] font-serif font-medium italic text-zinc-100 line-clamp-2 leading-snug">
            “{phil.coreInsight || phil.famousQuotes?.[0]?.quote}”
          </p>
          <div className="flex items-center justify-between pt-1 border-t border-white/10 text-xs font-mono">
            <span
              className="text-zinc-300 text-[10px] font-medium bg-white/10 px-2 py-0.5 rounded truncate max-w-[110px]"
              title={rawConcept}
            >
              {cleanConcept}
            </span>
            <span className="text-amber-400/90 group-hover/card-wrapper:text-amber-300 font-bold text-[10.5px] flex items-center gap-1 transition-colors">
              <span>放大检视</span>
              <span className="text-xs">↗</span>
            </span>
          </div>
        </div>
      </div>

      {/* Gallery Pedestal Floor Reflection Highlight */}
      <div className="w-28 sm:w-36 h-2 mx-auto mt-2 rounded-full corridor-card-pedestal blur-[1.5px] opacity-70 group-hover/card-wrapper:opacity-100 group-hover/card-wrapper:scale-110 transition-all duration-300" />
    </div>
  );
};
