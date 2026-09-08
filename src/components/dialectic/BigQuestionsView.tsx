import React, { useState } from 'react';
import { BIG_QUESTIONS_DATA } from '../../data/bigQuestions';
import { BigQuestion } from '../../types/philosophy';
import { useDialectic } from '../../context/DialecticContext';
import { MessageSquare, Sparkles, HelpCircle, ArrowRight } from 'lucide-react';

export const BigQuestionsView: React.FC = () => {
  const { startChatWithPhilosopher, activePersonaId } = useDialectic();
  const [selectedQuestionId, setSelectedQuestionId] = useState<string>(BIG_QUESTIONS_DATA[0].id);
  const activeQuestion: BigQuestion =
    BIG_QUESTIONS_DATA.find((q) => q.id === selectedQuestionId) || BIG_QUESTIONS_DATA[0];

  return (
    <div className="h-full flex flex-col gap-4 overflow-hidden">
      {/* Horizontal Question Category Selector */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar border-b border-white/[0.08] shrink-0 select-none">
        <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest px-1 shrink-0 flex items-center gap-1">
          <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
          <span>终极之问:</span>
        </span>
        {BIG_QUESTIONS_DATA.map((q, idx) => {
          const isSelected = q.id === activeQuestion.id;
          return (
            <button
              key={q.id}
              onClick={() => setSelectedQuestionId(q.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-serif whitespace-nowrap transition-all border ${
                isSelected
                  ? 'bg-amber-500/20 border-amber-500/50 text-amber-200 font-bold shadow-md'
                  : 'border-white/10 hover:bg-white/[0.05] text-zinc-400 hover:text-white'
              }`}
            >
              <span className="font-mono text-[10px] opacity-70">0{idx + 1}</span>
              <span>{q.domainTitle.zh}</span>
            </button>
          );
        })}
      </div>

      {/* Main Question Stage */}
      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch overflow-hidden">
        {/* Left Column: Dilemma Statement & Real-world scenario */}
        <div className="lg:col-span-5 rounded-2xl liquid-glass-card p-5 flex flex-col justify-between overflow-y-auto custom-scrollbar gap-4">
          <div className="space-y-3">
            <div className="text-[11px] font-mono text-amber-300/80 uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{activeQuestion.domainTitle.en} · 核心困境</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold font-dialectic text-white leading-snug">
              {activeQuestion.question.zh}
            </h2>

            <div className="p-3.5 rounded-xl bg-black/40 border border-white/10">
              <div className="text-[10px] font-mono text-zinc-400 uppercase mb-1">
                为何至关重要 / WHY IT MATTERS
              </div>
              <p className="text-[13.5px] sm:text-[14.5px] text-stone-200 leading-[1.75] font-dialectic">
                {activeQuestion.whyItMatters}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-500/[0.06] border border-amber-500/20">
              <div className="text-[10px] font-mono text-amber-300 uppercase mb-1">
                现代思维实验情境 / THOUGHT EXPERIMENT
              </div>
              <p className="text-[13.5px] sm:text-[14.5px] text-[#f5f5f4] leading-[1.75] font-dialectic">
                {activeQuestion.realWorldScenario}
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-white/10">
            <button
              onClick={() =>
                startChatWithPhilosopher(
                  activePersonaId,
                  `关于人类终极之问“${activeQuestion.question.zh}”，结合现代情境（${activeQuestion.realWorldScenario.slice(0, 30)}...），请从你的哲学体系出发给出深刻的剖析。`
                )
              }
              className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-mono font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>以此终极命题质询当前先哲 →</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right Column: Comparative Philosophical Perspectives */}
        <div className="lg:col-span-7 rounded-2xl liquid-glass-card p-5 flex flex-col justify-between overflow-hidden gap-3">
          <div className="flex items-center justify-between pb-2 border-b border-white/[0.08] shrink-0">
            <div className="text-[11px] font-mono text-amber-300/80 uppercase tracking-wider flex items-center gap-1.5">
              <span>◆</span>
              <span>先哲争鸣答卷 / PHILOSOPHICAL PERSPECTIVES</span>
            </div>
            <span className="text-[10.5px] font-mono text-zinc-500">
              共收录 {activeQuestion.perspectives.length} 派答卷
            </span>
          </div>

          <div className="flex-1 min-h-0 overflow-y-auto space-y-3 pr-1.5 custom-scrollbar py-1">
            {activeQuestion.perspectives.map((p, idx) => (
              <div
                key={idx}
                className="group/card p-3.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-amber-400/40 transition-all space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="text-base font-bold font-dialectic text-white">
                      {p.philosopherName}
                    </span>
                    <span className="text-[11px] font-mono text-amber-300/75 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                      {p.stance}
                    </span>
                  </div>

                  <button
                    onClick={() =>
                      startChatWithPhilosopher(
                        p.philosopherId,
                        `在探讨“${activeQuestion.question.zh}”时，你的答卷主张是“${p.coreArgument}”。请向我深入推导这一论证。`
                      )
                    }
                    className="opacity-70 group-hover/card:opacity-100 hover:text-amber-200 transition-all text-xs font-mono text-zinc-300 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
                    <span>入舱辩难 →</span>
                  </button>
                </div>

                <p className="text-[14px] sm:text-[15px] font-dialectic text-[#f5f5f4] leading-[1.75] bg-black/35 p-3 rounded-lg border border-white/10">
                  {p.coreArgument}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
