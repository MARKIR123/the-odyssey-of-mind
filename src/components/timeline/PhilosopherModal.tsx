import React, { useMemo } from 'react';
import { useEpoch } from '../../context/EpochContext';
import { useDialectic } from '../../context/DialecticContext';
import { PHILOSOPHERS_DATA } from '../../data/philosophers';
import { BalatroCardModal } from '../gallery/BalatroCardModal';
import { Philosopher } from '../../types/philosophy';

export const PhilosopherModal: React.FC = () => {
  const {
    selectedPhilosopher,
    setSelectedPhilosopher,
    language
  } = useEpoch();
  const { startChatWithPhilosopher } = useDialectic();

  // Filter philosophers belonging to current era or full list for deck navigation
  const eraPhilosophers = useMemo(() => {
    if (!selectedPhilosopher) return [];
    const inEra = PHILOSOPHERS_DATA.filter((p) => p.eraId === selectedPhilosopher.eraId);
    return inEra.length > 0 ? inEra : PHILOSOPHERS_DATA;
  }, [selectedPhilosopher]);

  if (!selectedPhilosopher) return null;

  const handleStartAiChat = (philosopher: Philosopher) => {
    setSelectedPhilosopher(null);
    startChatWithPhilosopher(philosopher);
  };

  return (
    <BalatroCardModal
      isOpen={Boolean(selectedPhilosopher)}
      onClose={() => setSelectedPhilosopher(null)}
      item={selectedPhilosopher}
      deckItems={eraPhilosophers}
      onSelectItem={(p) => setSelectedPhilosopher(p as Philosopher)}
      onStartAiChat={handleStartAiChat}
      language={language}
    />
  );
};
