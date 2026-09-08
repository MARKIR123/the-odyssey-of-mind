import React from 'react';
import { CULTURAL_ECHOES_DATA } from '../../data/culturalEchoes';
import { PHILOSOPHERS_DATA } from '../../data/philosophers';
import { useEpoch } from '../../context/EpochContext';

export const CulturalEchoCabinet: React.FC = () => {
  const { activeEra, openCulturalEchoById } = useEpoch();

  // Find philosophers in current era
  const currentPhilosopherIds = PHILOSOPHERS_DATA
    .filter(p => p.eraId === activeEra.id)
    .map(p => p.id);

  // Find echoes connected to these philosophers
  const eraEchoes = CULTURAL_ECHOES_DATA.filter(echo => 
    echo.philosopherIds?.some(id => currentPhilosopherIds.includes(id))
  );

  if (eraEchoes.length === 0) return null;

  return (
    <section className="space-y-6 pt-16 border-t border-white/[0.06]">
      {/* Studio Section Title */}
      <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2">
        <div className="flex items-baseline gap-3">
          <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest">
            Cross-Media Artifacts
          </span>
          <h2 className="text-xl sm:text-2xl font-bold font-serif text-white">
            时代跨媒介回响
          </h2>
        </div>
        <p className="text-[13px] text-zinc-500 max-w-[320px] studio-text-balance">
          哲学母题在电影、当代艺术、世界文学与先锋游戏中的投射
        </p>
      </div>

      {/* Horizontal Studio Media Flow (System.Studio Style) */}
      <div className="flex flex-col md:flex-row gap-8 overflow-x-auto pb-6 no-scrollbar items-start">
        {eraEchoes.map(echo => (
          <figure
            key={echo.id}
            onClick={() => openCulturalEchoById(echo.id)}
            className="flex flex-col gap-3 shrink-0 w-full md:w-[360px] lg:w-[420px] cursor-pointer group select-none"
          >
            {/* Borderless Media Container */}
            <div className="studio-media-frame aspect-[16/10] w-full bg-zinc-900/60 overflow-hidden">
              {echo.coverImage ? (
                <img
                  src={echo.coverImage}
                  alt={echo.title.zh}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-950 flex items-center justify-center p-6 text-center">
                  <span className="font-serif text-lg text-zinc-300 group-hover:text-white transition-colors">
                    {echo.title.zh}
                  </span>
                </div>
              )}
            </div>

            {/* Studio Figcaption (Concise text-balance) */}
            <figcaption className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500">
                <span className="uppercase tracking-wider">
                  {echo.type === 'game' ? 'Game' : echo.type === 'movie' ? 'Cinema' : echo.type === 'book' ? 'Literature' : 'Art'} · {echo.creator}
                </span>
                <span>{echo.year}</span>
              </div>
              <h3 className="text-base font-bold font-serif text-zinc-200 group-hover:text-white transition-colors">
                {echo.title.zh} <span className="font-sans text-xs font-normal text-zinc-500">({echo.title.en})</span>
              </h3>
              <p className="text-[13px] leading-[1.4] text-zinc-400 studio-text-balance line-clamp-3">
                {echo.connection}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
};
