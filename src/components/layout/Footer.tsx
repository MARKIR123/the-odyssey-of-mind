import React from 'react';
import { useEpoch } from '../../context/EpochContext';

export const Footer: React.FC = () => {
  const { setActiveHub } = useEpoch();

  return (
    <footer className="h-6 shrink-0 border-t border-white/[0.06] bg-black/40 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between text-[11px] font-mono text-zinc-500 select-none z-20">
      <div className="font-serif italic text-white/70 font-medium tracking-wide">
        The Odyssey of Mind
      </div>

      <div className="flex items-center gap-5 text-zinc-400">
        <button onClick={() => setActiveHub('gallery')} className="hover:text-white transition-colors">01 哲学长廊</button>
        <button onClick={() => setActiveHub('dialectic')} className="hover:text-white transition-colors">02 思辨台</button>
        <button onClick={() => setActiveHub('lab')} className="hover:text-white transition-colors">03 实验室</button>
      </div>
    </footer>
  );
};

