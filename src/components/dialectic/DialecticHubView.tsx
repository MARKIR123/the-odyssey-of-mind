import React from 'react';
import { AiDialecticChat } from './AiDialecticChat';
import { DualDebateTheater } from './DualDebateTheater';
import { BigQuestionsView } from './BigQuestionsView';
import { useEpoch } from '../../context/EpochContext';
import { useDialectic, DialecticSubTab } from '../../context/DialecticContext';
import { Sparkles, MessagesSquare, Swords, HelpCircle } from 'lucide-react';

export const DialecticHubView: React.FC = () => {
  const { activeEra } = useEpoch();
  const { activeSubTab, setActiveSubTab } = useDialectic();

  const tabs: { id: DialecticSubTab; label: string; icon: any }[] = [
    {
      id: 'one-on-one',
      label: '01 / 先哲一对一思辨',
      icon: MessagesSquare
    },
    {
      id: 'debates',
      label: '02 / 世纪双哲大辩论',
      icon: Swords
    },
    {
      id: 'big-questions',
      label: '03 / 人类终极之问',
      icon: HelpCircle
    }
  ];

  return (
    <div className="h-full flex flex-col overflow-hidden gap-2 animate-fade-in pt-0.5 pb-1">
      {/* Compact Liquid Glass Section Header */}
      <div className="flex items-center justify-between gap-4 border-b border-white/[0.08] pb-2 shrink-0 select-none">
        <div className="flex items-center gap-3">
          <div
            className="text-[11px] font-mono uppercase tracking-widest flex items-center gap-1.5"
            style={{ color: activeEra.accentColor }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>02 / ARENA</span>
          </div>
          <span className="text-zinc-600">|</span>
          <h1 className="text-sm sm:text-lg font-bold font-serif text-white tracking-tight">
            思辨台 · 思想碰撞与智慧辩难
          </h1>
        </div>

        {/* Sub-Tab Navigation Pills */}
        <div className="flex items-center gap-1 p-1 rounded-xl liquid-glass-pill text-xs font-mono">
          {tabs.map((tab) => {
            const isActive = activeSubTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id)}
                className={`px-3 py-1.5 rounded-lg transition-all duration-300 flex items-center gap-1.5 text-xs ${
                  isActive
                    ? 'text-white bg-white/10 shadow-sm font-bold'
                    : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                }`}
                style={
                  isActive
                    ? {
                        borderColor: 'rgba(255, 255, 255, 0.2)',
                        boxShadow: `0 0 16px ${activeEra.accentColor}18`
                      }
                    : undefined
                }
              >
                <Icon
                  className="w-3.5 h-3.5"
                  style={isActive ? { color: activeEra.accentColor } : undefined}
                />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content View Stage */}
      <div className="flex-1 min-h-0 w-full overflow-hidden">
        {activeSubTab === 'one-on-one' && <AiDialecticChat />}
        {activeSubTab === 'debates' && <DualDebateTheater />}
        {activeSubTab === 'big-questions' && <BigQuestionsView />}
      </div>
    </div>
  );
};
