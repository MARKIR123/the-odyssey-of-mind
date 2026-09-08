import React from 'react';
import { useEpoch } from '../../context/EpochContext';

export const EpochPavilionBanner: React.FC = () => {
  const { activeEra, activeEraIndex } = useEpoch();

  return (
    <div className="space-y-4 pt-2 pb-6">
      {/* Editorial Monumental Header (Title + Era-specific typography) */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-widest flex items-center gap-3">
            <span
              className="font-bold px-2 py-0.5 rounded text-black transition-colors duration-500"
              style={{ backgroundColor: activeEra.accentColor }}
            >
              EPOCH 0{activeEraIndex + 1}
            </span>
            <span>·</span>
            <span>{activeEra.timeRange}</span>
            <span>·</span>
            <span>{activeEra.name.en}</span>
          </div>

          <h1
            key={activeEra.id}
            className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white transition-all duration-700 animate-fade-in"
            style={{
              fontFamily: 'var(--era-font-heading)'
            }}
          >
            {activeEra.name.zh}
          </h1>
        </div>

        <div className="max-w-[460px] space-y-2 text-[13px] leading-[1.6] text-zinc-300 studio-text-balance">
          <p key={`${activeEra.id}-desc`} className="animate-fade-in">
            {activeEra.description}
          </p>
          <div className="text-[12px] font-mono pt-0.5 text-zinc-400">
            <span>Aesthetics & Logos: </span>
            <span style={{ color: activeEra.accentColor }} className="font-semibold">
              {activeEra.artMovement}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
