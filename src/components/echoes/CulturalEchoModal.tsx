import React from 'react';
import { useEpoch } from '../../context/EpochContext';
import { CULTURAL_ECHOES_DATA } from '../../data/culturalEchoes';
import { BalatroCardModal } from '../gallery/BalatroCardModal';
import { CulturalEcho } from '../../types/philosophy';

export const CulturalEchoModal: React.FC = () => {
  const {
    selectedCulturalEcho,
    setSelectedCulturalEcho,
    language
  } = useEpoch();

  if (!selectedCulturalEcho) return null;

  return (
    <BalatroCardModal
      isOpen={Boolean(selectedCulturalEcho)}
      onClose={() => setSelectedCulturalEcho(null)}
      item={selectedCulturalEcho}
      deckItems={CULTURAL_ECHOES_DATA}
      onSelectItem={(echo) => setSelectedCulturalEcho(echo as CulturalEcho)}
      language={language}
    />
  );
};
