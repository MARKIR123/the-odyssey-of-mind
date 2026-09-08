import React, { useState } from 'react';
import { THOUGHT_EXPERIMENTS_DATA } from '../../data/thoughtExperiments';
import confetti from 'canvas-confetti';

export const ThoughtExperimentSandbox: React.FC = () => {
  const [selectedExpId, setSelectedExpId] = useState<string>(THOUGHT_EXPERIMENTS_DATA[0].id);
  const [userChoices, setUserChoices] = useState<Record<string, string>>({});

  const activeExp = THOUGHT_EXPERIMENTS_DATA.find(e => e.id === selectedExpId) || THOUGHT_EXPERIMENTS_DATA[0];
  const selectedOptionId = userChoices[activeExp.id];

  const handleChoose = (optionId: string) => {
    setUserChoices(prev => ({
      ...prev,
      [activeExp.id]: optionId
    }));

    try {
      confetti({
        particleCount: 20,
        spread: 50,
        origin: { y: 0.7 }
      });
    } catch {}
  };

  return (
    <div className="h-full flex flex-col justify-between overflow-y-auto pr-1 custom-scrollbar gap-4">
      {/* 1. Experiment Selector Index */}
      <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto pb-2 no-scrollbar border-b border-white/[0.08] shrink-0">
        {THOUGHT_EXPERIMENTS_DATA.map((exp, idx) => {
          const isSelected = exp.id === activeExp.id;
          const hasChosen = !!userChoices[exp.id];
          return (
            <button
              key={exp.id}
              onClick={() => setSelectedExpId(exp.id)}
              className={`flex items-baseline gap-2 text-xs sm:text-[13px] font-mono whitespace-nowrap transition-colors py-1 ${
                isSelected ? 'text-white font-bold underline underline-offset-4' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <span>0{idx + 1}</span>
              <span className="font-sans font-medium">{exp.title.zh}</span>
              {hasChosen && <span className="text-[10px] text-zinc-400 font-mono">✓</span>}
            </button>
          );
        })}
      </div>

      {/* 2. Main Dilemma Stage (System.Studio 2-Column Split) */}
      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start overflow-y-auto pr-1 custom-scrollbar">
        {/* Left: Scenario & Prompt */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest">
              Originator: {activeExp.originator} · {activeExp.title.en}
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold font-serif text-white">
              {activeExp.title.zh}
            </h2>
          </div>

          <p className="text-sm sm:text-base font-serif leading-[1.7] text-zinc-300 studio-text-balance">
            {activeExp.scenario}
          </p>

          <div className="pt-2 text-xs font-mono text-white font-bold">
            Q: {activeExp.questionPrompt}
          </div>

          {/* Minimalist Options */}
          <div className="space-y-3 pt-2">
            {activeExp.options.map((opt) => {
              const isSelected = selectedOptionId === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => handleChoose(opt.id)}
                  className={`w-full text-left py-3.5 px-4 rounded transition-colors flex items-center justify-between border ${
                    isSelected
                      ? 'border-white bg-white/10 text-white font-bold'
                      : 'border-white/[0.08] hover:border-white/20 text-zinc-300 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono">{isSelected ? '●' : '○'}</span>
                    <span className="text-sm font-serif">{opt.text}</span>
                  </div>
                  {opt.statPercentage && (
                    <span className="text-[11px] font-mono text-zinc-500">
                      {opt.statPercentage}%
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Analytical Insight */}
        <div className="lg:col-span-6 space-y-6 border-l border-white/[0.06] pl-0 lg:pl-10">
          <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
            Analysis & Dialectic / 思维基因剖析
          </div>

          {selectedOptionId ? (
            <div className="space-y-6 animate-fade-in">
              {(() => {
                const opt = activeExp.options.find(o => o.id === selectedOptionId);
                if (!opt) return null;
                return (
                  <div className="space-y-3">
                    <div className="text-xs font-mono text-zinc-400">
                      Aligned School: <strong className="text-white font-serif text-sm">{opt.alignedSchool}</strong>
                    </div>
                    <p className="text-sm font-serif text-zinc-300 leading-[1.6] studio-text-balance">
                      {opt.explanation}
                    </p>
                  </div>
                );
              })()}

              <div className="pt-4 border-t border-white/[0.06] space-y-1.5">
                <div className="text-[11px] font-mono text-zinc-500">Theoretical Tension / 核心争议</div>
                <p className="text-[13px] text-zinc-400 leading-[1.6] studio-text-balance">
                  {activeExp.philosophicalDebate}
                </p>
              </div>

              {activeExp.culturalConnections && activeExp.culturalConnections.length > 0 && (
                <div className="pt-2 text-xs font-mono text-zinc-500">
                  <span>Pop Culture Echoes: </span>
                  <span className="text-zinc-300">{activeExp.culturalConnections.join(', ')}</span>
                </div>
              )}
            </div>
          ) : (
            <div className="text-sm font-mono text-zinc-600 py-12">
              Waiting for decision... / 请在左侧做出抉择以观察背后的伦理谱系。
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
