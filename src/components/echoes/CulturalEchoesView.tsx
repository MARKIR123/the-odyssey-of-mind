import React, { useState } from 'react';
import { CULTURAL_ECHOES_DATA } from '../../data/culturalEchoes';
import { PHILOSOPHERS_DATA } from '../../data/philosophers';
import { useEpoch } from '../../context/EpochContext';
import { Film, Gamepad2, BookOpen, Palette, Quote, Sparkles, Filter, ArrowUpRight } from 'lucide-react';
import { CulturalEcho } from '../../types/philosophy';

export const CulturalEchoesView: React.FC = () => {
  const { openPhilosopherById, selectedCulturalEcho, setSelectedCulturalEcho } = useEpoch();
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedTag, setSelectedTag] = useState<string>('all');

  // Extract all unique tags
  const allTags = Array.from(new Set(CULTURAL_ECHOES_DATA.flatMap(e => e.tags)));

  // Filtered list
  const filteredEchoes = CULTURAL_ECHOES_DATA.filter(echo => {
    const matchType = selectedType === 'all' || echo.type === selectedType;
    const matchTag = selectedTag === 'all' || echo.tags.includes(selectedTag);
    return matchType && matchTag;
  });

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Banner */}
      <div className="rounded-3xl border border-epoch-border bg-epoch-card p-6 sm:p-8 backdrop-blur-xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-medium">
          <Film className="w-3.5 h-3.5" />
          <span>跨媒介思想映照 (Cross-Media Resonance)</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-bold font-serif text-epoch-text">
          文艺与游戏中的哲学回响
        </h2>
        <p className="text-sm sm:text-base text-epoch-muted max-w-3xl leading-relaxed">
          哲学从来不是象牙塔里的冷门概念，而是人类所有伟大故事、震撼电影与神作游戏的“思维母题”。在这里，发现《黑客帝国》《极乐迪斯科》《尼尔》《局外人》背后两千年的哲学灵魂。
        </p>

        {/* Filter Bar */}
        <div className="pt-4 border-t border-epoch-border flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          {/* Media Type Tabs */}
          <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-black/40 border border-epoch-border text-xs">
            <button
              onClick={() => setSelectedType('all')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                selectedType === 'all' ? 'bg-epoch-accent text-gray-950 font-bold' : 'text-epoch-muted hover:text-epoch-text'
              }`}
            >
              全部作品 ({CULTURAL_ECHOES_DATA.length})
            </button>
            <button
              onClick={() => setSelectedType('game')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                selectedType === 'game' ? 'bg-epoch-accent text-gray-950 font-bold' : 'text-epoch-muted hover:text-epoch-text'
              }`}
            >
              <Gamepad2 className="w-3.5 h-3.5" />
              <span>电子游戏</span>
            </button>
            <button
              onClick={() => setSelectedType('movie')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                selectedType === 'movie' ? 'bg-epoch-accent text-gray-950 font-bold' : 'text-epoch-muted hover:text-epoch-text'
              }`}
            >
              <Film className="w-3.5 h-3.5" />
              <span>电影神作</span>
            </button>
            <button
              onClick={() => setSelectedType('book')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                selectedType === 'book' ? 'bg-epoch-accent text-gray-950 font-bold' : 'text-epoch-muted hover:text-epoch-text'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>经典文学</span>
            </button>
            <button
              onClick={() => setSelectedType('art')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                selectedType === 'art' ? 'bg-epoch-accent text-gray-950 font-bold' : 'text-epoch-muted hover:text-epoch-text'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>世界名画</span>
            </button>
          </div>

          {/* Tag Filter */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-epoch-muted">主题标签：</span>
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg bg-epoch-bg border border-epoch-border text-epoch-accent focus:outline-none cursor-pointer"
            >
              <option value="all">所有哲学主题</option>
              {allTags.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Grid of Cultural Echoes Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEchoes.map((echo) => {
          // Find associated philosophers
          const relatedPhilosophers = PHILOSOPHERS_DATA.filter(p => echo.philosopherIds?.includes(p.id));

          return (
            <div
              key={echo.id}
              onClick={() => setSelectedCulturalEcho(echo)}
              className="rounded-2xl border border-epoch-border bg-epoch-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/50 hover:shadow-glow-lg flex flex-col justify-between cursor-pointer group"
            >
              <div className="space-y-4">
                {/* Type badge & Year */}
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-medium flex items-center gap-1.5">
                    {echo.type === 'game' && <Gamepad2 className="w-3 h-3" />}
                    {echo.type === 'movie' && <Film className="w-3 h-3" />}
                    {echo.type === 'book' && <BookOpen className="w-3 h-3" />}
                    {echo.type === 'art' && <Palette className="w-3 h-3" />}
                    <span>
                      {echo.type === 'game' ? '电子游戏' : echo.type === 'movie' ? '电影' : echo.type === 'book' ? '文学' : '艺术名画'}
                    </span>
                  </span>
                  <span className="text-xs text-epoch-muted font-mono">{echo.year}</span>
                </div>

                {/* Title & Creator */}
                <div>
                  <h3 className="text-xl font-bold font-serif text-epoch-text group-hover:text-emerald-300 transition-colors">
                    {echo.title.zh}
                  </h3>
                  <div className="text-xs text-epoch-muted font-mono mt-0.5">
                    {echo.title.en} {echo.creator && `· ${echo.creator}`}
                  </div>
                </div>

                {/* Quote */}
                {echo.quote && (
                  <div className="p-3 rounded-xl bg-black/30 border border-white/5 text-xs text-epoch-text/90 italic font-serif relative">
                    <Quote className="w-3 h-3 text-emerald-400/40 absolute top-2 right-2" />
                    <p className="line-clamp-2">"{echo.quote}"</p>
                  </div>
                )}

                {/* Deep Connection explanation */}
                <div className="space-y-1">
                  <div className="text-xs font-bold text-emerald-400/90 uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>思想母题纽带</span>
                  </div>
                  <p className="text-xs text-epoch-text/85 leading-relaxed line-clamp-4">
                    {echo.connection}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {echo.tags.map((tag, idx) => (
                    <span key={idx} className="text-[11px] px-2 py-0.5 rounded bg-black/40 border border-white/5 text-epoch-muted">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Related Philosophers Footer */}
              <div className="pt-4 mt-4 border-t border-epoch-border/50 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-epoch-muted">先哲映射：</span>
                  {relatedPhilosophers.map(p => (
                    <button
                      key={p.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        openPhilosopherById(p.id);
                      }}
                      className="px-2 py-0.5 rounded bg-epoch-accent/15 border border-epoch-accent/30 text-epoch-accent hover:bg-epoch-accent hover:text-gray-950 transition-all font-medium"
                    >
                      {p.name.zh}
                    </button>
                  ))}
                </div>
                <ArrowUpRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
