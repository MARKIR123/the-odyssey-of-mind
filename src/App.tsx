import React from 'react';
import { EpochProvider, useEpoch } from './context/EpochContext';
import { DialecticProvider } from './context/DialecticContext';
import { Header } from './components/layout/Header';
import { ChronoGalleryView } from './components/gallery/ChronoGalleryView';
import { DialecticHubView } from './components/dialectic/DialecticHubView';
import { ThoughtLabView } from './components/lab/ThoughtLabView';
import { PhilosopherModal } from './components/timeline/PhilosopherModal';
import { CulturalEchoModal } from './components/echoes/CulturalEchoModal';
import { SearchModal } from './components/common/SearchModal';
import { ApiKeyModal } from './components/common/ApiKeyModal';
import { EraBackgroundBackdrop } from './components/common/EraBackgroundBackdrop';
import { Footer } from './components/layout/Footer';

const AppContent: React.FC = () => {
  const { activeHub, language, isDualVoiceFlashing } = useEpoch();

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col relative text-[var(--epoch-text)] font-sans antialiased selection:bg-white selection:text-black">
      {/* 1. Global Multi-Era Ambient Backdrop */}
      <EraBackgroundBackdrop />

      {/* 2. Fixed Studio Top Header (Full-Bleed 100vw) */}
      <Header />

      {/* 3. Main Studio Gallery Stage (Zero-Y Scroll, Flex-1 Full-Bleed) */}
      <main className="flex-1 min-h-0 w-full overflow-hidden relative z-10 px-3 sm:px-6 flex flex-col">
        {activeHub === 'gallery' && <ChronoGalleryView />}
        {activeHub === 'dialectic' && <DialecticHubView />}
        {activeHub === 'lab' && <ThoughtLabView />}
      </main>

      {/* 4. Studio Curatorial Dossiers & Modals */}
      <PhilosopherModal />
      <CulturalEchoModal />
      <SearchModal />
      <ApiKeyModal />

      {/* 5. Studio Ultra-Thin Statusline Footer (28px) */}
      <Footer />

      {/* 6. Disco Elysium [ALT] Dual-Voice Flash HUD Toast */}
      {isDualVoiceFlashing && (
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 pointer-events-none animate-in fade-in zoom-in-95 duration-200">
          <div className="px-4 py-2 rounded-lg bg-zinc-900/95 border-2 border-amber-500/70 shadow-[0_0_30px_rgba(245,158,11,0.4)] backdrop-blur-md flex items-center gap-3">
            <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500 text-black">
              ALT
            </span>
            <span className="text-xs font-mono font-bold text-amber-200 tracking-wider uppercase">
              DISCO DUAL-VOICE: {language === 'zh' ? '中文 (SIMPLIFIED CHINESE)' : 'ENGLISH'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export function App() {
  return (
    <EpochProvider>
      <DialecticProvider>
        <AppContent />
      </DialecticProvider>
    </EpochProvider>
  );
}

export default App;
