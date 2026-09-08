import React from 'react';
import { Philosopher } from '../../types/philosophy';
import { useEpoch } from '../../context/EpochContext';
import { handleImageFallback } from '../../data/fallbackAvatar';
import { Quote, Sparkles, Film, ArrowUpRight } from 'lucide-react';

interface GalleryArtworkCardProps {
  philosopher: Philosopher;
  index: number;
}

export const GalleryArtworkCard: React.FC<GalleryArtworkCardProps> = ({ philosopher, index }) => {
  const { setSelectedPhilosopher } = useEpoch();

  return (
    <div
      onClick={() => setSelectedPhilosopher(philosopher)}
      className="group relative rounded-3xl border border-epoch-border/80 bg-stone-900/60 p-6 sm:p-7 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-epoch-accent hover:shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(217,119,6,0.15)] cursor-pointer flex flex-col justify-between overflow-hidden"
    >
      {/* Background Museum Ambient Glow */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-60 h-60 rounded-full bg-radial-gradient opacity-0 group-hover:opacity-70 transition-opacity duration-700 pointer-events-none blur-2xl" />

      {/* Museum Artwork Number Tag */}
      <div className="flex items-center justify-between font-mono text-[10px] tracking-widest text-epoch-muted/50 uppercase border-b border-epoch-border/40 pb-3 mb-4">
        <span>EXHIBIT NO. {index < 9 ? `0${index + 1}` : index + 1}</span>
        <span className="text-epoch-accent/80 font-bold">{philosopher.region === 'west' ? 'WESTERN CANON' : 'EASTERN WISDOM'}</span>
      </div>

      <div className="space-y-5 relative z-10">
        {/* Master Portrait in Museum Mount & Brass Plaque */}
        <div className="flex items-start gap-4">
          <div className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-epoch-accent/40 group-hover:border-epoch-accent transition-colors shrink-0 bg-black/60 shadow-2xl p-0.5">
            <img
              src={philosopher.avatar}
              alt={philosopher.name.zh}
              className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-700"
              onError={handleImageFallback}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          </div>

          <div className="space-y-1.5 flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider ${
                  philosopher.region === 'west'
                    ? 'bg-blue-500/15 text-blue-300 border border-blue-500/30'
                    : 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                }`}
              >
                {philosopher.region === 'west' ? '西方' : '东方'}
              </span>
              <span className="text-[11px] text-epoch-muted font-mono truncate">
                {philosopher.lifespan}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold font-serif text-epoch-text group-hover:text-epoch-accent transition-colors leading-tight">
              {philosopher.name.zh}
            </h3>
            <div className="text-xs font-mono text-epoch-muted truncate">
              {philosopher.name.en} · {philosopher.nationality}
            </div>
          </div>
        </div>

        {/* Curatorial Plaque: Schools & Domains */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {philosopher.schools.map((school, idx) => (
            <span
              key={idx}
              className="text-[11px] px-2.5 py-1 rounded-lg museum-plaque text-epoch-accent/90 font-serif"
            >
              {school}
            </span>
          ))}
        </div>

        {/* The Master Thought Inscription (Core Insight) */}
        <div className="relative p-4 rounded-2xl bg-black/50 border border-epoch-border/60 text-xs sm:text-sm text-epoch-text/95 leading-relaxed font-serif shadow-inner">
          <Quote className="w-4 h-4 text-epoch-accent/40 absolute top-3 right-3" />
          <p className="line-clamp-3">
            <span className="text-epoch-accent font-bold mr-1.5">核心洞见：</span>
            “{philosopher.coreInsight}”
          </p>
        </div>

        {/* Analogy Annotation */}
        {philosopher.analogy && (
          <div className="text-xs text-epoch-muted flex items-start gap-1.5 italic font-sans px-1">
            <Sparkles className="w-3.5 h-3.5 text-epoch-accent shrink-0 mt-0.5" />
            <span className="line-clamp-2">比喻：{philosopher.analogy}</span>
          </div>
        )}
      </div>

      {/* Museum Plaque Footer: Cultural Resonance & Action */}
      <div className="pt-4 mt-5 border-t border-epoch-border/40 flex items-center justify-between text-xs text-epoch-muted relative z-10">
        <div>
          {philosopher.culturalEchoIds && philosopher.culturalEchoIds.length > 0 ? (
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-950/30 border border-emerald-500/20">
              <Film className="w-3 h-3" />
              <span>{philosopher.culturalEchoIds.length} 部文艺/游戏回响</span>
            </span>
          ) : (
            <span className="text-[11px] font-mono text-epoch-muted/60">PHILOSOPHICAL CANON</span>
          )}
        </div>

        <div className="flex items-center gap-1 text-epoch-accent font-bold font-serif group-hover:translate-x-1 transition-transform">
          <span>策展档案</span>
          <ArrowUpRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};
