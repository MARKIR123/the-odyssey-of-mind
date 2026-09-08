import React from 'react';
import { useEpoch, MainHub } from '../../context/EpochContext';
import { Landmark, MessagesSquare, FlaskConical } from 'lucide-react';

interface TabItem {
  id: MainHub;
  label: string;
  icon: React.ElementType;
  description: string;
}

const TABS: TabItem[] = [
  { id: 'gallery', label: '时空长廊', icon: Landmark, description: '全景东西双轨历史画廊' },
  { id: 'dialectic', label: '先哲思辨台', icon: MessagesSquare, description: '跨时空先哲对话与辩论' },
  { id: 'lab', label: '思维实验室', icon: FlaskConical, description: '思想实验、星图与人格测验' },
];

export const NavigationTabs: React.FC = () => {
  const { activeHub, setActiveHub } = useEpoch();

  return (
    <div className="border-b border-epoch-border/50 bg-black/40 sticky top-20 z-30 backdrop-blur-xl theme-transition">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-2 overflow-x-auto py-2.5 no-scrollbar scroll-smooth">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeHub === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveHub(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-epoch-accent text-gray-950 font-bold shadow-liquid-glow'
                    : 'text-epoch-muted hover:text-epoch-text hover:bg-white/5 border border-transparent hover:border-epoch-border'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-gray-950' : 'text-epoch-accent'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
