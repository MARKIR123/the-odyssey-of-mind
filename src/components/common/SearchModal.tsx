import React, { useState } from 'react';
import { useEpoch } from '../../context/EpochContext';
import { PHILOSOPHERS_DATA } from '../../data/philosophers';
import { CULTURAL_ECHOES_DATA } from '../../data/culturalEchoes';
import { BIG_QUESTIONS_DATA } from '../../data/bigQuestions';
import { Search, X, User, Film, HelpCircle, ArrowRight } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const { 
    isSearchOpen, 
    setIsSearchOpen, 
    openPhilosopherById, 
    openCulturalEchoById,
    setActiveHub
  } = useEpoch();

  const [query, setQuery] = useState('');

  if (!isSearchOpen) return null;

  const q = query.trim().toLowerCase();

  // Search Results
  const matchedPhilosophers = q
    ? PHILOSOPHERS_DATA.filter(p => 
        p.name.zh.toLowerCase().includes(q) ||
        p.name.en.toLowerCase().includes(q) ||
        p.schools.some(s => s.toLowerCase().includes(q)) ||
        p.coreInsight.toLowerCase().includes(q) ||
        p.notableWorks.some(w => w.toLowerCase().includes(q))
      )
    : [];

  const matchedEchoes = q
    ? CULTURAL_ECHOES_DATA.filter(e =>
        e.title.zh.toLowerCase().includes(q) ||
        e.title.en.toLowerCase().includes(q) ||
        e.tags.some(t => t.toLowerCase().includes(q)) ||
        e.connection.toLowerCase().includes(q)
      )
    : [];

  const matchedQuestions = q
    ? BIG_QUESTIONS_DATA.filter(bq =>
        bq.question.zh.toLowerCase().includes(q) ||
        bq.domainTitle.zh.toLowerCase().includes(q)
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="w-full max-w-2xl rounded-3xl border border-epoch-border bg-epoch-card p-5 sm:p-6 shadow-2xl backdrop-blur-2xl text-epoch-text space-y-4 max-h-[80vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center border-b border-epoch-border pb-3">
          <Search className="w-5 h-5 text-epoch-accent mr-3" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索哲学家、著作、名言、流派、电影或游戏..."
            className="w-full bg-transparent text-sm sm:text-base text-epoch-text placeholder:text-epoch-muted/50 focus:outline-none"
          />
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1 rounded-lg text-epoch-muted hover:text-epoch-text hover:bg-black/30"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Stream */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1 custom-scrollbar text-xs">
          {!q && (
            <div className="py-8 text-center text-epoch-muted space-y-2">
              <p>输入关键词（如：“康德”、“黑客帝国”、“存在主义”、“正义”、“洞穴”）</p>
              <div className="flex flex-wrap gap-2 justify-center pt-2">
                {['苏格拉底', '极乐迪斯科', '存在先于本质', '道法自然', '电车难题', '尼采'].map(tag => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-2.5 py-1 rounded-full bg-black/40 border border-epoch-border hover:border-epoch-accent text-epoch-accent"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Philosophers */}
          {matchedPhilosophers.length > 0 && (
            <div className="space-y-2">
              <div className="text-[11px] font-bold text-epoch-accent uppercase tracking-wider flex items-center gap-1.5">
                <User className="w-3 h-3" />
                <span>先哲档案 ({matchedPhilosophers.length})</span>
              </div>
              <div className="space-y-1.5">
                {matchedPhilosophers.map(p => (
                  <div
                    key={p.id}
                    onClick={() => {
                      setIsSearchOpen(false);
                      openPhilosopherById(p.id);
                    }}
                    className="p-3 rounded-xl bg-black/30 hover:bg-epoch-accent/15 border border-epoch-border/60 hover:border-epoch-accent flex items-center justify-between cursor-pointer transition-all group"
                  >
                    <div>
                      <div className="font-bold text-epoch-text group-hover:text-epoch-accent text-sm font-serif">
                        {p.name.zh} ({p.name.en}) · <span className="text-xs font-normal text-epoch-muted">{p.nationality}</span>
                      </div>
                      <div className="text-epoch-muted line-clamp-1 mt-0.5">
                        {p.coreInsight}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-epoch-muted group-hover:text-epoch-accent group-hover:translate-x-0.5 transition-transform shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Cultural Echoes */}
          {matchedEchoes.length > 0 && (
            <div className="space-y-2 pt-2">
              <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <Film className="w-3 h-3" />
                <span>文化回响 (电影/游戏/文学) ({matchedEchoes.length})</span>
              </div>
              <div className="space-y-1.5">
                {matchedEchoes.map(e => (
                  <div
                    key={e.id}
                    onClick={() => {
                      setIsSearchOpen(false);
                      openCulturalEchoById(e.id);
                    }}
                    className="p-3 rounded-xl bg-black/30 hover:bg-emerald-950/30 border border-emerald-500/20 hover:border-emerald-400 flex items-center justify-between cursor-pointer transition-all group"
                  >
                    <div>
                      <div className="font-bold text-emerald-300 group-hover:text-emerald-200 text-sm font-serif">
                        {e.title.zh} ({e.year}) · <span className="text-xs font-normal text-epoch-muted">{e.creator}</span>
                      </div>
                      <div className="text-epoch-muted line-clamp-1 mt-0.5">
                        {e.connection}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Big Questions */}
          {matchedQuestions.length > 0 && (
            <div className="space-y-2 pt-2">
              <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <HelpCircle className="w-3 h-3" />
                <span>终极追问 ({matchedQuestions.length})</span>
              </div>
              <div className="space-y-1.5">
                {matchedQuestions.map(bq => (
                  <div
                    key={bq.id}
                    onClick={() => {
                      setIsSearchOpen(false);
                      setActiveHub('dialectic');
                    }}
                    className="p-3 rounded-xl bg-black/30 hover:bg-amber-950/30 border border-amber-500/20 hover:border-amber-400 flex items-center justify-between cursor-pointer transition-all group"
                  >
                    <div>
                      <div className="font-bold text-amber-300 group-hover:text-amber-200 text-sm font-serif">
                        {bq.question.zh}
                      </div>
                      <div className="text-epoch-muted text-[11px]">
                        {bq.domainTitle.zh}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {q && !matchedPhilosophers.length && !matchedEchoes.length && !matchedQuestions.length && (
            <div className="py-8 text-center text-epoch-muted">
              未找到与 “{query}” 相关的哲人或文化条目，换个词试试？
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
