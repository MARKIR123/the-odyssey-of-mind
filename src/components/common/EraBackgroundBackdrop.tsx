import React from 'react';
import { useEpoch } from '../../context/EpochContext';
import { ERAS_DATA } from '../../data/eras';

export const EraBackgroundBackdrop: React.FC = () => {
  const { activeEra, activeHub } = useEpoch();

  return (
    <div aria-hidden="true" className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none">
      {/* 1. Gallery Backdrops (Active when activeHub === 'gallery') */}
      <div className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${activeHub === 'gallery' ? 'opacity-100' : 'opacity-0'}`}>
        {ERAS_DATA.map((era) => {
          const isActive = era.id === activeEra.id;
          return (
            <div
              key={era.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {/* Background Image with High-Fidelity Museum Atmosphere */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${era.backgroundImage})`,
                  filter: 'brightness(0.50) contrast(1.12) saturate(1.15)',
                  opacity: 0.85
                }}
              />

              {/* Era Ambient Radial Light Spheres */}
              <div
                className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[550px] rounded-full blur-[160px] opacity-25 transition-all duration-1000 pointer-events-none"
                style={{
                  backgroundColor: era.accentColor
                }}
              />
            </div>
          );
        })}
      </div>

      {/* 2. Dialectic Hub Backdrop (Active when activeHub === 'dialectic'): Jacques-Louis David: The Death of Socrates */}
      <div className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${activeHub === 'dialectic' ? 'opacity-100' : 'opacity-0'}`}>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(/assets/backgrounds/bg_dialectic.jpg)`,
            filter: 'brightness(0.46) contrast(1.15) saturate(1.12)',
            opacity: 0.88
          }}
        />
        {/* Socratic Dialogue Amber Ambient Light */}
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[950px] h-[600px] rounded-full blur-[180px] opacity-28 pointer-events-none"
          style={{ backgroundColor: '#f59e0b' }}
        />
      </div>

      {/* 3. Thought Lab Backdrop (Active when activeHub === 'lab'): The Flammarion Celestial Engraving */}
      <div className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${activeHub === 'lab' ? 'opacity-100' : 'opacity-0'}`}>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(/assets/backgrounds/bg_lab.jpg)`,
            filter: 'brightness(0.44) contrast(1.18) saturate(1.22)',
            opacity: 0.88
          }}
        />
        {/* Cosmic Explorer Cyan/Indigo Ambient Light */}
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] rounded-full blur-[180px] opacity-32 pointer-events-none"
          style={{ backgroundColor: '#06b6d4' }}
        />
      </div>

      {/* 4. Seamless Atmosphere: Soft top/bottom shading ensuring liquid-glass nav and statusline legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/65 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.55)_100%)] pointer-events-none" />

      {/* 5. Subtle Museum Lighting Grain */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] [background-size:28px_28px] opacity-40 pointer-events-none" />
    </div>
  );
};
