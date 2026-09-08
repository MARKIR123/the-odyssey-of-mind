import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { EraTheme, Philosopher, CulturalEcho, Region } from '../types/philosophy';
import { ERAS_DATA } from '../data/eras';
import { PHILOSOPHERS_DATA } from '../data/philosophers';
import { CULTURAL_ECHOES_DATA } from '../data/culturalEchoes';
import { UnifiedApiConfig } from '../utils/aiClient';

export type MainHub = 'gallery' | 'dialectic' | 'lab';

export type APIConfig = UnifiedApiConfig;

interface EpochContextType {
  activeEra: EraTheme;
  activeEraIndex: number;
  setActiveEraId: (id: string) => void;
  seekToEraIndex: (index: number) => void;
  nextEra: () => void;
  prevEra: () => void;
  scrubProgress: number;
  setScrubProgress: (progress: number) => void;
  activeHub: MainHub;
  setActiveHub: (hub: MainHub) => void;
  regionFilter: 'all' | Region;
  setRegionFilter: (r: 'all' | Region) => void;
  selectedPhilosopher: Philosopher | null;
  setSelectedPhilosopher: (p: Philosopher | null) => void;
  openPhilosopherById: (id: string) => void;
  selectedCulturalEcho: CulturalEcho | null;
  setSelectedCulturalEcho: (c: CulturalEcho | null) => void;
  openCulturalEchoById: (id: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isApiConfigOpen: boolean;
  setIsApiConfigOpen: (open: boolean) => void;
  apiConfig: APIConfig;
  setApiConfig: (config: APIConfig) => void;
  language: 'zh' | 'en';
  setLanguage: (lang: 'zh' | 'en') => void;
  toggleLanguage: () => void;
  isDualVoiceFlashing: boolean;
  seekCount: number;
}

const EpochContext = createContext<EpochContextType | undefined>(undefined);

export const EpochProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeEraId, setActiveEraIdState] = useState<string>('axial-age');
  const [activeHub, setActiveHub] = useState<MainHub>('gallery');
  const [regionFilter, setRegionFilter] = useState<'all' | Region>('all');
  const [selectedPhilosopher, setSelectedPhilosopher] = useState<Philosopher | null>(null);
  const [selectedCulturalEcho, setSelectedCulturalEcho] = useState<CulturalEcho | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isApiConfigOpen, setIsApiConfigOpen] = useState<boolean>(false);

  const activeEraIndex = Math.max(0, ERAS_DATA.findIndex(e => e.id === activeEraId));
  const activeEra = ERAS_DATA[activeEraIndex] || ERAS_DATA[0];

  // Scrub progress (0.0 to 1.0)
  const [scrubProgress, setScrubProgressState] = useState<number>(() => {
    return ERAS_DATA.length > 1 ? activeEraIndex / (ERAS_DATA.length - 1) : 0;
  });

  const setActiveEraId = useCallback((id: string) => {
    setActiveEraIdState(id);
    const idx = ERAS_DATA.findIndex(e => e.id === id);
    if (idx !== -1 && ERAS_DATA.length > 1) {
      setScrubProgressState(idx / (ERAS_DATA.length - 1));
    }
  }, []);

  const [seekCount, setSeekCount] = useState<number>(0);

  const seekToEraIndex = useCallback((index: number) => {
    const clampedIndex = Math.max(0, Math.min(ERAS_DATA.length - 1, index));
    const targetEra = ERAS_DATA[clampedIndex];
    if (targetEra) {
      setActiveEraIdState(targetEra.id);
      setSeekCount((c) => c + 1);
      if (ERAS_DATA.length > 1) {
        setScrubProgressState(clampedIndex / (ERAS_DATA.length - 1));
      }
    }
  }, []);

  const setScrubProgress = useCallback((progress: number) => {
    const clampedProgress = Math.max(0, Math.min(1, progress));
    setScrubProgressState(clampedProgress);
    const targetIndex = Math.round(clampedProgress * (ERAS_DATA.length - 1));
    const targetEra = ERAS_DATA[targetIndex];
    if (targetEra && targetEra.id !== activeEraId) {
      setActiveEraIdState(targetEra.id);
    }
  }, [activeEraId]);

  const nextEra = useCallback(() => {
    seekToEraIndex(activeEraIndex + 1);
  }, [activeEraIndex, seekToEraIndex]);

  const prevEra = useCallback(() => {
    seekToEraIndex(activeEraIndex - 1);
  }, [activeEraIndex, seekToEraIndex]);

  // API Config Persistence
  const [apiConfig, setApiConfigState] = useState<APIConfig>(() => {
    try {
      const saved = localStorage.getItem('odyssey_api_config');
      return saved ? JSON.parse(saved) : { apiKey: '', baseUrl: 'https://api.deepseek.com/v1', model: 'deepseek-chat' };
    } catch {
      return { apiKey: '', baseUrl: 'https://api.deepseek.com/v1', model: 'deepseek-chat' };
    }
  });

  const setApiConfig = (config: APIConfig) => {
    setApiConfigState(config);
    try {
      localStorage.setItem('odyssey_api_config', JSON.stringify(config));
    } catch (e) {
      console.error(e);
    }
  };

  // Disco Elysium-style Alt Key Dual-Voice Language Toggle (zh <-> en)
  const [language, setLanguageState] = useState<'zh' | 'en'>(() => {
    try {
      const saved = localStorage.getItem('odyssey_language');
      return saved === 'en' ? 'en' : 'zh';
    } catch {
      return 'zh';
    }
  });
  const [isDualVoiceFlashing, setIsDualVoiceFlashing] = useState<boolean>(false);

  const setLanguage = useCallback((lang: 'zh' | 'en') => {
    setLanguageState(lang);
    try {
      localStorage.setItem('odyssey_language', lang);
    } catch (e) {
      console.error(e);
    }
    setIsDualVoiceFlashing(true);
    setTimeout(() => setIsDualVoiceFlashing(false), 900);
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguageState(prev => {
      const next = prev === 'zh' ? 'en' : 'zh';
      try {
        localStorage.setItem('odyssey_language', next);
      } catch (e) {
        console.error(e);
      }
      return next;
    });
    setIsDualVoiceFlashing(true);
    setTimeout(() => setIsDualVoiceFlashing(false), 900);
  }, []);

  // Dynamically update document body class when activeEra changes for Epoch-Morphing
  useEffect(() => {
    const root = document.documentElement;
    ERAS_DATA.forEach(e => {
      root.classList.remove(e.cssClass);
      document.body.classList.remove(e.cssClass);
    });
    root.classList.add(activeEra.cssClass);
    document.body.classList.add(activeEra.cssClass);
  }, [activeEra]);

  // Global keyboard shortcut for Cmd+K search, Left/Right Arrow timeline navigation, and Alt key Disco Elysium toggle
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept when user is typing in an input/textarea
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
        return;
      }

      // Disco Elysium Alt key instant dual-voice toggle
      if (e.key === 'Alt') {
        e.preventDefault();
        toggleLanguage();
        return;
      }

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleLanguage]);

  const openPhilosopherById = (id: string) => {
    const found = PHILOSOPHERS_DATA.find(p => p.id === id);
    if (found) {
      setSelectedPhilosopher(found);
    }
  };

  const openCulturalEchoById = (id: string) => {
    const found = CULTURAL_ECHOES_DATA.find(c => c.id === id);
    if (found) {
      setSelectedCulturalEcho(found);
    }
  };

  return (
    <EpochContext.Provider
      value={{
        activeEra,
        activeEraIndex,
        setActiveEraId,
        seekToEraIndex,
        seekCount,
        nextEra,
        prevEra,
        scrubProgress,
        setScrubProgress,
        activeHub,
        setActiveHub,
        regionFilter,
        setRegionFilter,
        selectedPhilosopher,
        setSelectedPhilosopher,
        openPhilosopherById,
        selectedCulturalEcho,
        setSelectedCulturalEcho,
        openCulturalEchoById,
        isSearchOpen,
        setIsSearchOpen,
        isApiConfigOpen,
        setIsApiConfigOpen,
        apiConfig,
        setApiConfig,
        language,
        setLanguage,
        toggleLanguage,
        isDualVoiceFlashing
      }}
    >
      {children}
    </EpochContext.Provider>
  );
};

export const useEpoch = () => {
  const context = useContext(EpochContext);
  if (!context) {
    throw new Error('useEpoch must be used within an EpochProvider');
  }
  return context;
};
