import React from 'react';
import { LinearTimelineScrubber } from './LinearTimelineScrubber';
import { MuseumGalleryCorridor } from './MuseumGalleryCorridor';

export const ChronoGalleryView: React.FC = () => {
  return (
    <div className="h-full flex flex-col overflow-hidden animate-fade-in">
      {/* 1. Jesper Landberg Linear Scrubber Timeline at the Top (Architectural Gallery Header) */}
      <div className="w-full shrink-0 px-3 sm:px-6 py-0.5 relative z-20 border-b border-white/[0.08] bg-black/40 backdrop-blur-sm">
        <LinearTimelineScrubber />
      </div>

      {/* 2. Museum Hanging Gallery Corridor (Zero-Y Panoramic Horizontal Tracking) */}
      <div className="flex-1 min-h-0 w-full overflow-hidden relative flex flex-col">
        <MuseumGalleryCorridor />
      </div>
    </div>
  );
};

