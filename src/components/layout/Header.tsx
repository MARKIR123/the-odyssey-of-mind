import React from 'react';
import { useEpoch, MainHub } from '../../context/EpochContext';
import { Search, KeyRound, Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  const {
    activeHub,
    setActiveHub,
    setIsSearchOpen,
    setIsApiConfigOpen,
    activeEra,
    language,
    toggleLanguage,
    isDualVoiceFlashing
  } = useEpoch();

  const navigationItems: { id: MainHub; label: string; enLabel: string }[] = [
    { id: 'gallery', label: '哲学长廊', enLabel: 'Gallery' },
    { id: 'dialectic', label: '思辨台', enLabel: 'Dialectic' },
    { id: 'lab', label: '实验室', enLabel: 'Lab' }
  ];

  return (
    <header className="shrink-0 w-full select-none z-30 liquid-glass-nav">
      <div className="w-full flex items-center justify-between h-14 px-4 sm:px-8">
        {/* 1. Left: Brand Logo & Elegant Serif Italic Site Name */}
        <div 
          onClick={() => setActiveHub('gallery')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div 
            className="w-8 h-8 rounded-xl flex items-center justify-center border transition-all duration-500 shadow-sm"
            style={{
              borderColor: `${activeEra.accentColor}55`,
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              boxShadow: `0 0 12px ${activeEra.accentColor}33`
            }}
          >
            <Sparkles 
              className="w-4 h-4 transition-transform duration-700 group-hover:rotate-45"
              style={{ color: activeEra.accentColor }}
            />
          </div>

          <div className="flex flex-col">
            <span 
              className="font-serif italic text-lg sm:text-xl font-bold tracking-tight text-white transition-colors duration-300 drop-shadow-sm"
              style={{
                fontFamily: '"Playfair Display", "Cinzel", "Noto Serif SC", serif'
              }}
            >
              The Odyssey of Mind
            </span>
            <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-400 hidden sm:inline -mt-0.5">
              {language === 'zh' ? '人类哲学思想全史 · 艺术数字博物馆' : 'Pan-Human Intellectual History · Digital Art Museum'}
            </span>
          </div>
        </div>

        {/* 2. Middle: Three Core Feature Channels */}
        <nav className="flex items-center gap-1 sm:gap-2">
          {navigationItems.map((item) => {
            const isActive = activeHub === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveHub(item.id)}
                className={`relative px-3 sm:px-5 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 flex items-center gap-1.5 ${
                  isActive
                    ? 'text-white shadow-md'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]'
                }`}
                style={isActive ? {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  boxShadow: `0 0 20px ${activeEra.accentColor}22, inset 0 1px 1px rgba(255, 255, 255, 0.3)`
                } : undefined}
              >
                <span>{item.label}</span>
                <span className="text-[10px] font-mono opacity-50 hidden md:inline">
                  ({item.enLabel})
                </span>

                {/* Active Indicator Dot / Glow */}
                {isActive && (
                  <span 
                    className="w-1.5 h-1.5 rounded-full transition-colors duration-500"
                    style={{
                      backgroundColor: activeEra.accentColor,
                      boxShadow: `0 0 8px ${activeEra.accentColor}`
                    }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* 3. Right: Disco Elysium [ALT] Dual-Voice Switcher, Global Search & Settings */}
        <div className="flex items-center gap-2">
          {/* Disco Elysium Style [ALT] Dual-Voice Switcher Button */}
          <button
            onClick={toggleLanguage}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-mono transition-all duration-300 border ${
              isDualVoiceFlashing
                ? 'bg-amber-400 text-black border-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.6)] scale-105'
                : 'text-zinc-300 hover:text-white bg-white/[0.06] hover:bg-white/[0.12] border-white/15'
            }`}
            title="快捷键 [Alt] 即时切换中英文 (Disco Elysium 极乐迪斯科式双语翻转)"
          >
            <span className="text-[10px] font-bold px-1 py-0.2 rounded bg-black/40 text-amber-300 font-mono">
              ALT
            </span>
            <span className="font-medium tracking-wide">
              {language === 'zh' ? '中 ➔ EN' : 'EN ➔ 中'}
            </span>
          </button>

          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-mono text-zinc-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-colors"
            title={language === 'zh' ? '全局搜索 (⌘K)' : 'Global Search (⌘K)'}
          >
            <Search className="w-3.5 h-3.5" />
            <kbd className="hidden lg:inline text-[10px] text-zinc-500">⌘K</kbd>
          </button>

          <button
            onClick={() => setIsApiConfigOpen(true)}
            className="p-1.5 rounded-xl text-zinc-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-colors"
            title={language === 'zh' ? 'AI 思辨模型配置' : 'AI Dialectic Config'}
          >
            <KeyRound className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
