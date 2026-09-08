import React, { useState } from 'react';
import { PhilosophyCompassQuiz } from '../interactive/PhilosophyCompassQuiz';
import { PhilosophicalClinicView } from './PhilosophicalClinicView';
import { KnowledgeGraphView } from '../interactive/KnowledgeGraphView';
import { useEpoch } from '../../context/EpochContext';
import { Sparkles, Compass, Stethoscope, Network } from 'lucide-react';

export const ThoughtLabView: React.FC = () => {
  const { activeEra } = useEpoch();
  const [labTab, setLabTab] = useState<'compass' | 'clinic' | 'graph'>('compass');

  const tabs: { id: 'compass' | 'clinic' | 'graph'; label: string; icon: any }[] = [
    { id: 'compass', label: '01 / 思想实验与哲学MBTI', icon: Compass },
    { id: 'clinic', label: '02 / 哲学心灵诊所', icon: Stethoscope },
    { id: 'graph', label: '03 / 思想星图网络', icon: Network }
  ];

  return (
    <div className="h-full flex flex-col overflow-hidden gap-2 animate-fade-in pt-0.5 pb-1">
      {/* Compact Liquid Glass Section Header */}
      <div className="flex items-center justify-between gap-4 border-b border-white/[0.08] pb-2 shrink-0 select-none">
        <div className="flex items-center gap-3">
          <div className="text-[11px] font-mono uppercase tracking-widest flex items-center gap-1.5" style={{ color: activeEra.accentColor }}>
            <Sparkles className="w-3.5 h-3.5" />
            <span>03 / LAB</span>
          </div>
          <span className="text-zinc-600">|</span>
          <h1 className="text-sm sm:text-lg font-bold font-serif text-white tracking-tight">
            思维实验室 · 思想互动探索场
          </h1>
        </div>

        {/* Liquid Glass Sub-View Pill Switcher */}
        <div className="flex items-center gap-1 p-1 rounded-xl liquid-glass-pill text-xs font-mono">
          {tabs.map(tab => {
            const isActive = labTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setLabTab(tab.id)}
                className={`px-3 py-1.5 rounded-lg transition-all duration-300 flex items-center gap-1.5 text-xs ${
                  isActive
                    ? 'text-white bg-white/10 shadow-sm font-bold'
                    : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                }`}
                style={isActive ? {
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                  boxShadow: `0 0 16px ${activeEra.accentColor}18`
                } : undefined}
              >
                <Icon className="w-3.5 h-3.5" style={isActive ? { color: activeEra.accentColor } : undefined} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content View in Liquid Glass Stage */}
      <div className="flex-1 min-h-0 w-full overflow-hidden">
        {labTab === 'compass' && <PhilosophyCompassQuiz />}
        {labTab === 'clinic' && <PhilosophicalClinicView />}
        {labTab === 'graph' && <KnowledgeGraphView />}
      </div>
    </div>
  );
};

