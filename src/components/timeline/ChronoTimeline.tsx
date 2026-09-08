import React from 'react';
import { useEpoch } from '../../context/EpochContext';
import { PHILOSOPHERS_DATA } from '../../data/philosophers';
import { EraBanner } from './EraBanner';
import { PhilosopherCard } from './PhilosopherCard';
import { Globe, Compass, BookOpen, Layers } from 'lucide-react';

export const ChronoTimeline: React.FC = () => {
  const { activeEra, regionFilter } = useEpoch();

  // Filter philosophers belonging to current active era
  const currentPhilosophers = PHILOSOPHERS_DATA.filter(
    (p) => p.eraId === activeEra.id
  );

  const westPhilosophers = currentPhilosophers.filter((p) => p.region === 'west');
  const eastPhilosophers = currentPhilosophers.filter((p) => p.region === 'east');

  return (
    <div className="space-y-8 animate-fade-in">
      {/* 1. Era Hero Banner & Vibe Guide */}
      <EraBanner />

      {/* 2. Philosophers Stream by Region */}
      {regionFilter === 'all' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Western Stream */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-epoch-border">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-500/80 shadow-sm" />
                <h3 className="text-lg font-bold font-serif text-epoch-text flex items-center gap-1.5">
                  <span>西方哲学脉络</span>
                  <span className="text-xs text-epoch-muted font-normal font-sans">
                    ({westPhilosophers.length} 位先哲)
                  </span>
                </h3>
              </div>
              <span className="text-xs text-blue-400 font-mono">理型·逻辑·启蒙·解构</span>
            </div>

            {westPhilosophers.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
                {westPhilosophers.map((philosopher) => (
                  <PhilosopherCard key={philosopher.id} philosopher={philosopher} />
                ))}
              </div>
            ) : (
              <div className="p-8 text-center rounded-2xl bg-epoch-card/50 border border-epoch-border/40 text-epoch-muted text-xs">
                该历史时期西方主要代表思想正在整理中...
              </div>
            )}
          </div>

          {/* Eastern Stream */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-epoch-border">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-amber-500/80 shadow-sm" />
                <h3 className="text-lg font-bold font-serif text-epoch-text flex items-center gap-1.5">
                  <span>东方哲学脉络</span>
                  <span className="text-xs text-epoch-muted font-normal font-sans">
                    ({eastPhilosophers.length} 位先哲)
                  </span>
                </h3>
              </div>
              <span className="text-xs text-amber-400 font-mono">天人·仁礼·心性·禅悟</span>
            </div>

            {eastPhilosophers.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
                {eastPhilosophers.map((philosopher) => (
                  <PhilosopherCard key={philosopher.id} philosopher={philosopher} />
                ))}
              </div>
            ) : (
              <div className="p-8 text-center rounded-2xl bg-epoch-card/50 border border-epoch-border/40 text-epoch-muted text-xs">
                该历史时期东方思想流派正在进一步扩充中...
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Single Region Filter Mode */
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-epoch-border">
            <h3 className="text-lg font-bold font-serif text-epoch-text">
              {regionFilter === 'west' ? '西方哲学思想阵列' : '东方哲学智慧阵列'}
              <span className="text-xs text-epoch-muted font-normal font-sans ml-2">
                (当前纪元共 {regionFilter === 'west' ? westPhilosophers.length : eastPhilosophers.length} 位哲学家)
              </span>
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(regionFilter === 'west' ? westPhilosophers : eastPhilosophers).map(
              (philosopher) => (
                <PhilosopherCard key={philosopher.id} philosopher={philosopher} />
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};
