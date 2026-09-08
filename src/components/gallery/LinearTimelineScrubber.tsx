import React, { useRef, useState } from 'react';
import { useEpoch } from '../../context/EpochContext';
import { ERAS_DATA } from '../../data/eras';

interface EraTypographyConfig {
  fontFamily: string;
  nameClass: string;
  yearClass: string;
  fontStyle?: string;
  letterSpacing?: string;
  shortName: {
    zh: string;
    en: string;
  };
  yearDisplay: {
    zh: string;
    en: string;
  };
}

const ERA_TIMELINE_CONFIG: Record<string, EraTypographyConfig> = {
  'axial-age': {
    fontFamily: "'Cinzel', 'Noto Serif SC', serif",
    nameClass: 'text-[12.5px] sm:text-[14px]',
    yearClass: 'text-[10px] sm:text-[11px]',
    letterSpacing: '0.08em',
    shortName: {
      zh: '轴心文明',
      en: 'AXIAL AGE'
    },
    yearDisplay: {
      zh: '前800 — 前200',
      en: '800 BC — 200 BC'
    }
  },
  'hellenistic-medieval': {
    fontFamily: "'Cormorant Garamond', 'Noto Serif SC', serif",
    nameClass: 'text-[13px] sm:text-[15px]',
    yearClass: 'text-[10.5px] sm:text-[11.5px]',
    letterSpacing: '0.03em',
    shortName: {
      zh: '希腊与中世纪',
      en: 'MEDIEVAL'
    },
    yearDisplay: {
      zh: '前300 — 1400',
      en: '300 BC — 1400'
    }
  },
  'enlightenment': {
    fontFamily: "'Playfair Display', 'Noto Serif SC', serif",
    nameClass: 'text-[12.5px] sm:text-[14px]',
    yearClass: 'text-[10px] sm:text-[11px]',
    letterSpacing: '-0.01em',
    shortName: {
      zh: '启蒙理性',
      en: 'ENLIGHTENMENT'
    },
    yearDisplay: {
      zh: '1650 — 1800',
      en: '1650 — 1800'
    }
  },
  'nineteenth-century': {
    fontFamily: "'Playfair Display', 'Noto Serif SC', serif",
    fontStyle: 'italic',
    nameClass: 'text-[12.5px] sm:text-[14px]',
    yearClass: 'text-[10px] sm:text-[11px]',
    letterSpacing: '0.02em',
    shortName: {
      zh: '十九世纪狂飙',
      en: '19th CENTURY'
    },
    yearDisplay: {
      zh: '1800 — 1900',
      en: '1800 — 1900'
    }
  },
  'twentieth-century': {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    nameClass: 'text-[12px] sm:text-[13px]',
    yearClass: 'text-[9.5px] sm:text-[10.5px]',
    letterSpacing: '-0.02em',
    shortName: {
      zh: '现代转向',
      en: 'MODERN TURN'
    },
    yearDisplay: {
      zh: '1900 — 1970',
      en: '1900 — 1970'
    }
  },
  'contemporary-future': {
    fontFamily: "'JetBrains Mono', monospace",
    nameClass: 'text-[11px] sm:text-[12px]',
    yearClass: 'text-[9.5px] sm:text-[10px]',
    letterSpacing: '0.06em',
    shortName: {
      zh: '当代与未来',
      en: 'CYBER & AI'
    },
    yearDisplay: {
      zh: '1970 — 至今',
      en: '1970 — NOW'
    }
  }
};

const getEraTypography = (eraId: string): EraTypographyConfig => {
  if (eraId === 'modern-twentieth') return ERA_TIMELINE_CONFIG['twentieth-century'];
  if (eraId === 'contemporary') return ERA_TIMELINE_CONFIG['contemporary-future'];
  return ERA_TIMELINE_CONFIG[eraId] || ERA_TIMELINE_CONFIG['axial-age'];
};

export const LinearTimelineScrubber: React.FC = () => {
  const {
    activeEra,
    activeEraIndex,
    seekToEraIndex,
    language
  } = useEpoch();

  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragPercent, setDragPercent] = useState<number | null>(null);
  const lastEmittedEraRef = useRef<number>(activeEraIndex);

  // Calculate display percentage for playhead: local drag overrides external state
  const externalPercent = ERAS_DATA.length > 1 ? (activeEraIndex / (ERAS_DATA.length - 1)) * 100 : 0;
  const currentPercent = isDragging && dragPercent !== null ? dragPercent : externalPercent;

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const progress = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const percent = progress * 100;
    
    setIsDragging(true);
    setDragPercent(percent);
    lastEmittedEraRef.current = activeEraIndex;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const progress = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const percent = progress * 100;
    setDragPercent(percent);

    // Only update global era when crossing era center threshold to prevent 60fps app re-renders
    const nearestIndex = Math.max(0, Math.min(ERAS_DATA.length - 1, Math.round(progress * (ERAS_DATA.length - 1))));
    if (nearestIndex !== lastEmittedEraRef.current) {
      lastEmittedEraRef.current = nearestIndex;
      seekToEraIndex(nearestIndex);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging) {
      setIsDragging(false);
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {}
      
      let finalProgress = currentPercent / 100;
      if (trackRef.current) {
        const rect = trackRef.current.getBoundingClientRect();
        finalProgress = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      }
      setDragPercent(null);

      // Snap to nearest era
      const targetIndex = Math.max(0, Math.min(ERAS_DATA.length - 1, Math.round(finalProgress * (ERAS_DATA.length - 1))));
      seekToEraIndex(targetIndex);
    }
  };

  return (
    <div className="w-full select-none py-0.5">
      {/* Interactive Linear Scrubber Track */}
      <div
        ref={trackRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="relative w-full h-12 sm:h-14 flex flex-col justify-center cursor-ew-resize group touch-none"
      >
        {/* Base Background Track Line */}
        <div className="relative w-full h-[2px] bg-white/[0.15] group-hover:bg-white/25 transition-colors rounded-full overflow-hidden">
          {/* Active Fill Line with Era Dynamic Gradient */}
          <div
            className={`absolute top-0 left-0 h-full ${
              isDragging ? 'transition-none' : 'transition-[width] duration-300 ease-out'
            }`}
            style={{
              width: `${currentPercent}%`,
              background: `linear-gradient(90deg, rgba(255,255,255,0.25) 0%, ${activeEra.accentColor} 100%)`,
              boxShadow: `0 0 12px ${activeEra.accentColor}90`
            }}
          />
        </div>

        {/* Draggable Playhead Thumb (Era-Adaptive Form) */}
        <div
          className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 pointer-events-none ${
            isDragging
              ? 'transition-none scale-125'
              : 'transition-[left,transform] duration-300 ease-out group-hover:scale-115'
          }`}
          style={{ left: `${currentPercent}%` }}
        >
          <div
            className={`w-4 h-4 ring-2 ring-offset-2 ring-offset-black transition-all duration-300 ${
              activeEraIndex === 0
                ? 'rotate-45 rounded-xs'
                : activeEraIndex === 1
                ? 'rounded-none rotate-12'
                : activeEraIndex === 2
                ? 'rounded-full'
                : activeEraIndex === 3
                ? 'rounded-none'
                : activeEraIndex === 4
                ? 'rounded-full ring-4'
                : 'rounded-none ring-1'
            }`}
            style={{
              backgroundColor: activeEra.accentColor,
              borderColor: '#ffffff',
              boxShadow: `0 0 24px ${activeEra.accentColor}, inset 0 1px 1px rgba(255,255,255,0.8)`
            }}
          />
        </div>

        {/* 3. Micro Tick Marks & Era Anchors (Above: Name, Below: Year, Unique Fonts) */}
        <div className="absolute inset-x-0 top-0 bottom-0 pointer-events-none flex items-center justify-between">
          {ERAS_DATA.map((era, index) => {
            const eraPercent = ERAS_DATA.length > 1 ? (index / (ERAS_DATA.length - 1)) * 100 : 0;
            const isPassed = currentPercent >= eraPercent;
            const isCurrent = index === activeEraIndex;
            const typo = getEraTypography(era.id);

            // Pin left and right edge anchors so text never spills out of container
            const nodeTransform =
              index === 0
                ? 'translateX(0%)'
                : index === ERAS_DATA.length - 1
                ? 'translateX(-100%)'
                : 'translateX(-50%)';

            const alignClass =
              index === 0
                ? 'items-start text-left'
                : index === ERAS_DATA.length - 1
                ? 'items-end text-right'
                : 'items-center text-center';

            return (
              <div
                key={era.id}
                className={`absolute flex flex-col ${alignClass} pointer-events-auto`}
                style={{
                  left: `${eraPercent}%`,
                  top: '50%',
                  transform: `${nodeTransform} translateY(-50%)`
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  seekToEraIndex(index);
                }}
              >
                {/* 1. TOP: Era Name (Above the Timeline Axis Line) */}
                <div
                  className={`absolute bottom-2.5 sm:bottom-3 whitespace-nowrap cursor-pointer transition-all duration-300 ${
                    isCurrent
                      ? 'font-black scale-105 filter drop-shadow-[0_0_8px_currentColor]'
                      : 'text-zinc-400 hover:text-white font-semibold hover:scale-102'
                  }`}
                  style={{
                    fontFamily: typo.fontFamily,
                    fontStyle: typo.fontStyle,
                    letterSpacing: typo.letterSpacing,
                    color: isCurrent ? era.accentColor : undefined
                  }}
                >
                  <span className={typo.nameClass}>
                    {language === 'zh' ? typo.shortName.zh : typo.shortName.en}
                  </span>
                </div>

                {/* 2. MIDDLE: Tick Mark Line on the Axis */}
                <div
                  className="w-[1.5px] transition-all duration-300 shrink-0"
                  style={{
                    height: isCurrent ? '16px' : isPassed ? '10px' : '8px',
                    backgroundColor: isCurrent ? era.accentColor : isPassed ? 'rgba(255,255,255,0.48)' : 'rgba(255,255,255,0.2)',
                    boxShadow: isCurrent ? `0 0 10px ${era.accentColor}` : 'none'
                  }}
                />

                {/* 3. BOTTOM: Year Range (Below the Timeline Axis Line) */}
                <div
                  className={`absolute top-2.5 sm:top-3 whitespace-nowrap cursor-pointer transition-all duration-300 ${
                    isCurrent
                      ? 'font-bold opacity-100'
                      : 'text-zinc-400 hover:text-zinc-200 font-medium opacity-80 hover:opacity-100'
                  }`}
                  style={{
                    fontFamily: typo.fontFamily,
                    fontStyle: typo.fontStyle,
                    letterSpacing: typo.letterSpacing,
                    color: isCurrent ? era.accentColor : undefined
                  }}
                >
                  <span className={typo.yearClass}>
                    {language === 'zh' ? typo.yearDisplay.zh : typo.yearDisplay.en}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
