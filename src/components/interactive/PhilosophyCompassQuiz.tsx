import React, { useState, useRef } from 'react';
import { QUIZ_QUESTIONS_DATA, calculateArchetype } from '../../data/quizQuestions';
import { PhilosophyArchetype } from '../../types/philosophy';
import { useEpoch } from '../../context/EpochContext';
import { useDialectic } from '../../context/DialecticContext';
import { handleImageFallback } from '../../data/fallbackAvatar';
import {
  Download,
  RotateCcw,
  ArrowLeft,
  Sparkles,
  BookOpen,
  MessageSquare,
  CheckCircle2,
  Share2,
  Compass,
  Zap,
  ShieldCheck,
  AlertTriangle,
  Flame,
  Film,
  Gamepad2,
  ExternalLink,
  Scroll,
  HelpCircle,
  Brain,
  Coffee
} from 'lucide-react';
import confetti from 'canvas-confetti';

const DIMENSION_CONFIG = {
  E_R: {
    title: '认识论探索 · 经验实证 VS 理性先验 (Epistemology)',
    color: 'text-amber-400',
    badge: 'bg-amber-500/15 border-amber-500/30 text-amber-300'
  },
  U_D: {
    title: '伦理学抉择 · 功利后果 VS 绝对道义 (Ethics)',
    color: 'text-emerald-400',
    badge: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
  },
  N_X: {
    title: '存在论叩问 · 自然虚无 VS 存在意志 (Ontology)',
    color: 'text-purple-400',
    badge: 'bg-purple-500/15 border-purple-500/30 text-purple-300'
  },
  I_M: {
    title: '实践论取向 · 心性内求 VS 唯物行动 (Praxis)',
    color: 'text-cyan-400',
    badge: 'bg-cyan-500/15 border-cyan-500/30 text-cyan-300'
  }
};

export const PhilosophyCompassQuiz: React.FC = () => {
  const { openPhilosopherById, setActiveHub } = useEpoch();
  const { setActiveSubTab, startChatWithPhilosopher } = useDialectic();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [resultArchetype, setResultArchetype] = useState<PhilosophyArchetype | null>(null);
  const [isExporting, setIsExporting] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const totalQuestions = QUIZ_QUESTIONS_DATA.length;
  const currentQ = QUIZ_QUESTIONS_DATA[currentQuestionIndex];
  const progressPercent = Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100);

  const handleAnswer = (val: number) => {
    const updatedAnswers = {
      ...userAnswers,
      [currentQuestionIndex]: val
    };
    setUserAnswers(updatedAnswers);

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // 计算各维度的总分
      const scores = { E_R: 0, U_D: 0, N_X: 0, I_M: 0 };
      QUIZ_QUESTIONS_DATA.forEach((q, idx) => {
        const choice = updatedAnswers[idx] !== undefined ? updatedAnswers[idx] : 0;
        scores[q.dimension] += choice;
      });

      const res = calculateArchetype(scores);
      setResultArchetype(res);

      try {
        confetti({
          particleCount: 60,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch {}
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setResultArchetype(null);
  };

  const handleStartChatWithMatch = (philosopherId: string) => {
    setActiveHub('dialectic');
    setActiveSubTab('one-on-one');
    startChatWithPhilosopher(philosopherId);
  };

  const handleExportPoster = async () => {
    if (!resultArchetype || !canvasRef.current) return;
    setIsExporting(true);

    try {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = 800;
      canvas.height = 1200;

      // 1. 背景底色 (沉稳黑曜金)
      ctx.fillStyle = '#0b0b0e';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 2. 边框装饰线条
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.25)';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(36, 36, canvas.width - 72, canvas.height - 72);

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;
      ctx.strokeRect(44, 44, canvas.width - 88, canvas.height - 88);

      // 3. 顶部 Header
      ctx.fillStyle = '#f59e0b';
      ctx.font = 'bold 12px "JetBrains Mono", monospace';
      ctx.fillText('✦ THE ODYSSEY OF MIND · PHILOSOPHY ARCHETYPE ✦', 64, 82);

      ctx.fillStyle = '#71717a';
      ctx.font = '11px "JetBrains Mono", monospace';
      ctx.fillText('人类哲学思想全史 · 8大生活抉择 + 8大思想实验灵魂罗盘档案', 64, 102);

      // 4. 原型代码与大标题
      ctx.fillStyle = '#d97706';
      ctx.font = 'bold 22px "JetBrains Mono", monospace';
      ctx.fillText(`ARCHETYPE / ${resultArchetype.code}`, 64, 150);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 36px "Noto Serif SC", serif';
      ctx.fillText(resultArchetype.title, 64, 196);

      // 5. 题词副标
      ctx.fillStyle = '#fef3c7';
      ctx.font = 'italic 15px "Noto Serif SC", serif';
      ctx.fillText(`“${resultArchetype.subtitle}”`, 64, 235);

      // 6. 四大维度光谱分析柱状条
      ctx.fillStyle = '#a1a1aa';
      ctx.font = 'bold 12px "JetBrains Mono", monospace';
      ctx.fillText('PHILOSOPHICAL SPECTRUM / 四大哲学基石维度倾向', 64, 280);

      const pcts = resultArchetype.dimensionPercentages || {
        E: 50,
        R: 50,
        U: 50,
        D: 50,
        N: 50,
        X: 50,
        I: 50,
        M: 50
      };

      const dimensions = [
        { labelL: '经验实证 (E)', pctL: pcts.E, labelR: '理性先验 (R)', pctR: pcts.R, color: '#f59e0b' },
        { labelL: '功利后果 (U)', pctL: pcts.U, labelR: '绝对道义 (D)', pctR: pcts.D, color: '#10b981' },
        { labelL: '自然虚无 (N)', pctL: pcts.N, labelR: '存在意志 (X)', pctR: pcts.X, color: '#a855f7' },
        { labelL: '心性内求 (I)', pctL: pcts.I, labelR: '唯物实践 (M)', pctR: pcts.M, color: '#06b6d4' }
      ];

      dimensions.forEach((dim, idx) => {
        const y = 310 + idx * 36;
        ctx.fillStyle = '#a1a1aa';
        ctx.font = '12px "Noto Serif SC", serif';
        ctx.fillText(`${dim.labelL} ${dim.pctL}%`, 64, y);

        ctx.textAlign = 'right';
        ctx.fillText(`${dim.pctR}% ${dim.labelR}`, canvas.width - 64, y);
        ctx.textAlign = 'left';

        // 槽轨
        ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.fillRect(64, y + 6, canvas.width - 128, 6);

        // 游标指示点
        const trackWidth = canvas.width - 128;
        const pointerX = 64 + (dim.pctR / 100) * trackWidth;
        ctx.fillStyle = dim.color;
        ctx.beginPath();
        ctx.arc(pointerX, y + 9, 5, 0, Math.PI * 2);
        ctx.fill();
      });

      // 7. 灵魂契合先哲板块 (图文并茂)
      const philY = 485;
      ctx.fillStyle = '#f59e0b';
      ctx.font = 'bold 12px "JetBrains Mono", monospace';
      ctx.fillText('SOUL PHILOSOPHER / 灵魂契合先哲', 64, philY);

      // 尝试预加载先哲头像
      const avatarImg = new Image();
      avatarImg.crossOrigin = 'anonymous';
      avatarImg.src = resultArchetype.matchedPhilosopher.avatar;

      await new Promise<void>((resolve) => {
        avatarImg.onload = () => resolve();
        avatarImg.onerror = () => resolve();
        setTimeout(resolve, 600);
      });

      // 绘制先哲头像
      const imgSize = 110;
      if (avatarImg.complete && avatarImg.naturalWidth > 0) {
        ctx.save();
        ctx.beginPath();
        ctx.roundRect(64, philY + 18, imgSize, imgSize, 14);
        ctx.clip();
        ctx.drawImage(avatarImg, 64, philY + 18, imgSize, imgSize);
        ctx.restore();

        ctx.strokeStyle = 'rgba(245, 158, 11, 0.5)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(64, philY + 18, imgSize, imgSize, 14);
        ctx.stroke();
      }

      // 先哲文字介绍
      const textLeft = 196;
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 24px "Noto Serif SC", serif';
      ctx.fillText(resultArchetype.matchedPhilosopher.name, textLeft, philY + 50);

      ctx.fillStyle = '#fde68a';
      ctx.font = 'italic 14px "Noto Serif SC", serif';
      const quoteText = `“${resultArchetype.matchedPhilosopher.quote}”`;
      ctx.fillText(quoteText, textLeft, philY + 85, canvas.width - textLeft - 64);

      ctx.fillStyle = '#71717a';
      ctx.font = '12px "JetBrains Mono", monospace';
      ctx.fillText(`代表著作: ${resultArchetype.matchedPhilosopher.works}`, textLeft, philY + 115);

      // 8. 核心特质与优势
      const traitY = 660;
      ctx.fillStyle = '#a1a1aa';
      ctx.font = 'bold 12px "JetBrains Mono", monospace';
      ctx.fillText('CORE PERSONALITY TRAITS / 核心特质', 64, traitY);

      ctx.font = '13px "Noto Serif SC", serif';
      resultArchetype.traits.forEach((t, i) => {
        const pillX = 64 + i * 140;
        ctx.fillStyle = 'rgba(245, 158, 11, 0.12)';
        ctx.beginPath();
        ctx.roundRect(pillX, traitY + 14, 125, 28, 6);
        ctx.fill();

        ctx.strokeStyle = 'rgba(245, 158, 11, 0.3)';
        ctx.stroke();

        ctx.fillStyle = '#fef3c7';
        ctx.fillText(`✦ ${t}`, pillX + 12, traitY + 33);
      });

      // 9. 优势与盲区
      const metaY = 745;
      ctx.fillStyle = '#10b981';
      ctx.font = 'bold 13px "Noto Serif SC", serif';
      ctx.fillText('思想禀赋:', 64, metaY);
      ctx.fillStyle = '#d1d5db';
      ctx.font = '13.5px "Noto Serif SC", serif';
      ctx.fillText(resultArchetype.strengths[0] || '', 140, metaY, canvas.width - 204);

      ctx.fillStyle = '#f43f5e';
      ctx.font = 'bold 13px "Noto Serif SC", serif';
      ctx.fillText('思维盲区:', 64, metaY + 36);
      ctx.fillStyle = '#d1d5db';
      ctx.font = '13.5px "Noto Serif SC", serif';
      ctx.fillText(resultArchetype.blindSpots[0] || '', 140, metaY + 36, canvas.width - 204);

      // 10. 书影游推荐
      const recY = 840;
      ctx.fillStyle = '#a1a1aa';
      ctx.font = 'bold 12px "JetBrains Mono", monospace';
      ctx.fillText('RECOMMENDED ARTIFACTS / 哲学治愈书影游', 64, recY);

      ctx.fillStyle = '#e4e4e7';
      ctx.font = '13px "Noto Serif SC", serif';
      ctx.fillText(`📖 经典名著: ${resultArchetype.recommendedWorks.book}`, 64, recY + 30);
      ctx.fillText(`🎬 沉浸电影: ${resultArchetype.recommendedWorks.movie}`, 64, recY + 58);
      ctx.fillText(`🎮 哲学游戏: ${resultArchetype.recommendedWorks.game}`, 64, recY + 86);

      // 11. 底部认证水印与印章
      const footerY = 1130;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.beginPath();
      ctx.moveTo(64, footerY - 20);
      ctx.lineTo(canvas.width - 64, footerY - 20);
      ctx.stroke();

      ctx.fillStyle = '#71717a';
      ctx.font = '11px "JetBrains Mono", monospace';
      ctx.fillText('THE ODYSSEY OF MIND · 人类哲学思想全史 · 数字博物馆', 64, footerY);

      ctx.textAlign = 'right';
      ctx.fillText('CERTIFIED PHILOSOPHY ARCHETYPE', canvas.width - 64, footerY);
      ctx.textAlign = 'left';

      // 导出下载
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `Philosophy_Archetype_${resultArchetype.code}_${resultArchetype.matchedPhilosopher.name}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to export poster:', err);
    } finally {
      setIsExporting(false);
    }
  };

  const dimConfig = DIMENSION_CONFIG[currentQ.dimension];

  return (
    <div className="h-full flex flex-col justify-start overflow-y-auto pr-1 custom-scrollbar gap-4 select-none">
      <canvas ref={canvasRef} className="hidden" />

      {!resultArchetype ? (
        /* 答题阶段卡片 (Question Stage) */
        <div className="max-w-3xl mx-auto w-full py-2 animate-fade-in space-y-4">
          <div className="liquid-glass-card rounded-3xl p-6 sm:p-8 border border-white/15 bg-black/55 backdrop-blur-2xl shadow-[0_16px_50px_rgba(0,0,0,0.6)] space-y-6">
            {/* Dual-Stage Chapter Stepper Indicators */}
            {(() => {
              const isDailyLife = currentQ.category === 'daily_life' || currentQuestionIndex < 8;
              const chapterQuestionIndex = isDailyLife ? currentQuestionIndex + 1 : currentQuestionIndex - 7;

              return (
                <>
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                    <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/[0.03] border border-white/10 text-[11px] font-mono">
                      <div className={`px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition-all ${
                        isDailyLife
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold shadow-[0_0_12px_rgba(16,185,129,0.2)]'
                          : 'text-zinc-400'
                      }`}>
                        <Coffee className="w-3.5 h-3.5 text-emerald-400" />
                        <span>01 人间烟火 (生活篇 8题)</span>
                        {currentQuestionIndex >= 8 && <CheckCircle2 className="w-3 h-3 text-emerald-400 ml-0.5" />}
                      </div>

                      <span className="text-zinc-600 px-0.5">→</span>

                      <div className={`px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition-all ${
                        !isDailyLife
                          ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 font-bold shadow-[0_0_12px_rgba(168,85,247,0.2)]'
                          : 'text-zinc-500'
                      }`}>
                        <Brain className="w-3.5 h-3.5 text-purple-400" />
                        <span>02 深渊凝视 (实验篇 8题)</span>
                      </div>
                    </div>

                    <span className="text-zinc-400 text-xs font-mono">
                      总进度 <strong className="text-amber-400 font-mono text-sm">{String(currentQuestionIndex + 1).padStart(2, '0')}</strong> / {totalQuestions} · {progressPercent}%
                    </span>
                  </div>

                  {/* Top Dimension & Progress Bar */}
                  <div className="space-y-2.5">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                      <span className={`px-2.5 py-1 rounded-full border text-[11px] font-bold flex items-center gap-1.5 ${dimConfig.badge}`}>
                        <Sparkles className="w-3 h-3" />
                        <span>{dimConfig.title}</span>
                      </span>
                      <span className="text-zinc-400 text-[11px]">
                        {isDailyLife ? `生活日常 0${chapterQuestionIndex} / 08` : `思想实验 0${chapterQuestionIndex} / 08`}
                      </span>
                    </div>

                    {/* Smooth Progress Track */}
                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-200 transition-all duration-300 rounded-full shadow-[0_0_12px_rgba(245,158,11,0.5)]"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>

                  {/* Intermission Notice when stepping into Question 9 (Part 2) */}
                  {currentQuestionIndex === 8 && (
                    <div className="p-3.5 rounded-2xl bg-gradient-to-r from-purple-500/15 via-indigo-500/10 to-transparent border border-purple-500/30 text-purple-200 text-xs font-mono flex items-center gap-2.5 animate-fade-in shadow-[0_0_20px_rgba(168,85,247,0.15)]">
                      <Sparkles className="w-4 h-4 text-purple-400 shrink-0" />
                      <span>你已顺利完成【人间烟火】生活抉择！现已进入【第二篇章：深渊凝视 · 8大极限思想实验】，直击内心形而上边界。</span>
                    </div>
                  )}

                  {/* Question Identity & Context Banner */}
                  {isDailyLife ? (
                    /* 生活篇场景标头 */
                    <div className="space-y-2.5 pt-1 border-b border-white/10 pb-4">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px] font-mono font-bold tracking-widest uppercase flex items-center gap-1">
                          <Coffee className="w-3 h-3" />
                          <span>DAILY LIFE SCENE 0{chapterQuestionIndex}</span>
                        </span>
                        <span className="text-[11px] font-mono text-emerald-400/80">
                          ✦ 现实生活直觉映照
                        </span>
                      </div>

                      <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                        {currentQ.lifeSceneTitle || `生活日常抉择 0${chapterQuestionIndex}`}
                      </h2>

                      <div className="p-4 rounded-2xl bg-white/[0.025] border border-white/10 text-sm sm:text-base font-serif text-stone-200 leading-relaxed">
                        {currentQ.scenario}
                      </div>
                    </div>
                  ) : (
                    /* 思想实验篇标头 */
                    <div className="space-y-2.5 pt-1 border-b border-white/10 pb-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-md bg-purple-500/20 border border-purple-500/40 text-purple-300 text-[10px] font-mono font-bold tracking-widest uppercase flex items-center gap-1">
                          <Brain className="w-3 h-3" />
                          <span>THOUGHT EXPERIMENT 0{chapterQuestionIndex}</span>
                        </span>
                        {currentQ.culturalRef && (
                          <span className="px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-stone-300 text-[10px] font-mono flex items-center gap-1">
                            <Film className="w-3 h-3 text-purple-400" />
                            <span>文化回响：{currentQ.culturalRef}</span>
                          </span>
                        )}
                      </div>

                      <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                        {currentQ.experimentTitle || currentQ.scenario}
                      </h2>

                      {currentQ.originator && (
                        <div className="flex items-center gap-1.5 text-xs font-mono text-amber-300/80">
                          <Scroll className="w-3.5 h-3.5 text-amber-400" />
                          <span>思想源流与提出者：{currentQ.originator}</span>
                        </div>
                      )}

                      <div className="p-4 rounded-2xl bg-white/[0.025] border border-white/10 space-y-1.5">
                        <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                          <Brain className="w-3.5 h-3.5 text-purple-400" />
                          <span>思想实验经典情境 (Scenario)</span>
                        </div>
                        <p className="text-sm sm:text-base font-serif text-stone-200 leading-relaxed">
                          {currentQ.scenario}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Dilemma Prompt Box */}
                  {currentQ.dilemmaPrompt && (
                    <div className={`p-4 sm:p-5 rounded-2xl border space-y-1.5 ${
                      isDailyLife
                        ? 'bg-emerald-500/[0.06] border-emerald-500/25 shadow-[0_0_20px_rgba(16,185,129,0.06)]'
                        : 'bg-amber-500/[0.08] border-amber-500/30 shadow-[0_0_20px_rgba(245,158,11,0.06)]'
                    }`}>
                      <div className={`text-[11px] font-mono uppercase tracking-wider font-bold flex items-center gap-1.5 ${
                        isDailyLife ? 'text-emerald-400' : 'text-amber-400'
                      }`}>
                        <HelpCircle className="w-3.5 h-3.5" />
                        <span>{isDailyLife ? '生活直觉叩问 (Intuitive Dilemma)' : '灵魂终极叩问 (Core Dilemma)'}</span>
                      </div>
                      <p className="text-base sm:text-lg font-serif font-bold text-stone-100 leading-snug">
                        {currentQ.dilemmaPrompt}
                      </p>
                    </div>
                  )}

                  {/* Options */}
                  <div className="space-y-3.5 pt-1">
                    <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                      ✦ 请选择你的真实直觉或哲学立场
                    </div>
                    {currentQ.options.map((opt, idx) => {
                      const isSelected = userAnswers[currentQuestionIndex] === opt.value;
                      const optionLabel = idx === 0 ? 'A' : 'B';

                      return (
                        <button
                          key={idx}
                          data-quiz-option={optionLabel}
                          onClick={() => handleAnswer(opt.value)}
                          className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-300 group flex items-start gap-4 cursor-pointer ${
                            isSelected
                              ? isDailyLife
                                ? 'bg-emerald-500/20 border-emerald-400/80 shadow-[0_0_24px_rgba(16,185,129,0.25)]'
                                : 'bg-amber-500/20 border-amber-400/80 shadow-[0_0_24px_rgba(245,158,11,0.25)]'
                              : 'bg-white/[0.03] hover:bg-white/[0.07] border-white/10 hover:border-amber-400/50'
                          }`}
                        >
                          <span
                            className={`w-8 h-8 rounded-xl flex items-center justify-center font-mono font-bold text-xs shrink-0 transition-colors mt-0.5 ${
                              isSelected
                                ? isDailyLife
                                  ? 'bg-emerald-500 text-stone-950 shadow-md'
                                  : 'bg-amber-500 text-stone-950 shadow-md'
                                : 'bg-white/10 text-zinc-300 group-hover:bg-amber-500/20 group-hover:text-amber-200'
                            }`}
                          >
                            {optionLabel}
                          </span>

                          <div className="space-y-1.5 flex-1">
                            {opt.trait && (
                              <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${
                                isDailyLife
                                  ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
                                  : 'bg-amber-500/15 border-amber-500/30 text-amber-300'
                              }`}>
                                ✦ {opt.trait}
                              </span>
                            )}
                            <div className="text-base sm:text-lg font-serif text-stone-100 group-hover:text-white leading-snug">
                              {opt.text}
                            </div>
                            {opt.subtext && (
                              <div className="text-xs sm:text-[13px] text-zinc-400 group-hover:text-zinc-300 font-sans leading-relaxed">
                                {opt.subtext}
                              </div>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Bottom Controls */}
                  <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs font-mono">
                    <button
                      onClick={handlePrevQuestion}
                      disabled={currentQuestionIndex === 0}
                      className="flex items-center gap-1.5 text-zinc-400 hover:text-white disabled:opacity-30 disabled:hover:text-zinc-400 transition-colors cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>上一题 (Previous)</span>
                    </button>

                    <span className="text-zinc-500 text-[11px]">
                      {isDailyLife
                        ? '依从你的生活本能与日常经验 · 8大现实抉择'
                        : '依从你的理性直觉与灵魂原则 · 8大思想实验'}
                    </span>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      ) : (
        /* 测评结果页 (Result Archetype Stage) */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start animate-fade-in max-w-6xl mx-auto w-full pb-8">
          {/* 左栏 (7 栏) · 灵魂哲学档案与四大维度光谱 */}
          <div className="lg:col-span-7 space-y-5">
            {/* 顶栏徽章与标题 */}
            <div className="liquid-glass-card rounded-3xl p-6 sm:p-7 border border-amber-500/30 bg-black/40 backdrop-blur-xl shadow-xl space-y-3">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className="px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold tracking-widest flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5" />
                  <span>PHILOSOPHY MBTI / {resultArchetype.code}</span>
                </span>
                <span className="text-[11px] font-mono text-amber-300/80 flex items-center gap-1">
                  <Brain className="w-3 h-3 text-amber-400" />
                  <span>8大生活抉择 + 8大思想实验双重推演判定</span>
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-bold font-serif text-white tracking-tight">
                {resultArchetype.title}
              </h1>

              <p className="text-sm sm:text-base font-serif italic text-amber-200/90 pl-3 border-l-2 border-amber-400/60 leading-relaxed">
                “{resultArchetype.subtitle}”
              </p>
            </div>

            {/* 四大哲学基石维度倾向光谱 */}
            <div className="liquid-glass-card rounded-3xl p-6 border border-white/10 bg-black/35 backdrop-blur-xl space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400 border-b border-white/10 pb-2">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>四大哲学维度倾向光谱 (Philosophical Spectrum)</span>
                </span>
                <span>0 - 100% 相对倾向</span>
              </div>

              <div className="space-y-4 pt-1 text-xs">
                {(() => {
                  const pcts = resultArchetype.dimensionPercentages || {
                    E: 50,
                    R: 50,
                    U: 50,
                    D: 50,
                    N: 50,
                    X: 50,
                    I: 50,
                    M: 50
                  };

                  const bars = [
                    {
                      name: '认识论 (Epistemology)',
                      leftCode: 'E',
                      leftName: '经验实证 (Empiricism)',
                      leftPct: pcts.E,
                      rightCode: 'R',
                      rightName: '理性先验 (Rationalism)',
                      rightPct: pcts.R,
                      activeColor: pcts.R >= 50 ? 'bg-amber-400' : 'bg-cyan-400'
                    },
                    {
                      name: '伦理学 (Ethics)',
                      leftCode: 'U',
                      leftName: '功利后果 (Utilitarianism)',
                      leftPct: pcts.U,
                      rightCode: 'D',
                      rightName: '绝对道义 (Deontology)',
                      rightPct: pcts.D,
                      activeColor: pcts.D >= 50 ? 'bg-emerald-400' : 'bg-rose-400'
                    },
                    {
                      name: '存在论 (Ontology)',
                      leftCode: 'N',
                      leftName: '自然虚无 (Naturalism/Zen)',
                      leftPct: pcts.N,
                      rightCode: 'X',
                      rightName: '存在意志 (Existentialism)',
                      rightPct: pcts.X,
                      activeColor: pcts.X >= 50 ? 'bg-purple-400' : 'bg-teal-400'
                    },
                    {
                      name: '实践论 (Praxis)',
                      leftCode: 'I',
                      leftName: '心性内求 (Idealism/Inward)',
                      leftPct: pcts.I,
                      rightCode: 'M',
                      rightName: '唯物行动 (Materialism/Action)',
                      rightPct: pcts.M,
                      activeColor: pcts.M >= 50 ? 'bg-indigo-400' : 'bg-amber-400'
                    }
                  ];

                  return bars.map((b, idx) => (
                    <div key={idx} className="space-y-1.5 p-2.5 rounded-2xl bg-white/[0.02] border border-white/5">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-amber-300 font-sans tracking-wide">
                          {b.name}
                        </span>
                        <span className="font-mono text-[10px] text-zinc-400">
                          {b.leftCode} {b.leftPct}% VS {b.rightPct}% {b.rightCode}
                        </span>
                      </div>

                      {/* Visual Track */}
                      <div className="relative w-full h-2 bg-white/10 rounded-full overflow-hidden flex">
                        <div
                          className="h-full bg-cyan-500/60 transition-all duration-500"
                          style={{ width: `${b.leftPct}%` }}
                        />
                        <div
                          className="h-full bg-amber-500/80 transition-all duration-500"
                          style={{ width: `${b.rightPct}%` }}
                        />
                      </div>

                      <div className="flex items-center justify-between text-[10.5px] font-mono">
                        <span className={b.leftPct >= b.rightPct ? 'text-cyan-300 font-bold' : 'text-zinc-500'}>
                          {b.leftName}
                        </span>
                        <span className={b.rightPct > b.leftPct ? 'text-amber-300 font-bold' : 'text-zinc-500'}>
                          {b.rightName}
                        </span>
                      </div>
                    </div>
                  ));
                })()}
              </div>
            </div>

            {/* 核心人格特质 */}
            <div className="liquid-glass-card rounded-3xl p-5 border border-white/10 bg-black/35 backdrop-blur-xl space-y-2.5">
              <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>核心思想特质 (Core Philosophical Traits)</span>
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                {resultArchetype.traits.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/15 text-stone-200 text-xs font-serif font-bold shadow-sm"
                  >
                    ✦ {t}
                  </span>
                ))}
              </div>
            </div>

            {/* 思想禀赋与思维盲区 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="liquid-glass-card rounded-3xl p-5 border border-emerald-500/20 bg-emerald-950/10 backdrop-blur-xl space-y-2">
                <div className="text-xs font-mono text-emerald-400 font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  <span>思想优势与人格禀赋</span>
                </div>
                <p className="text-xs sm:text-sm font-dialectic text-zinc-300 leading-relaxed">
                  {resultArchetype.strengths[0]}
                </p>
              </div>

              <div className="liquid-glass-card rounded-3xl p-5 border border-rose-500/20 bg-rose-950/10 backdrop-blur-xl space-y-2">
                <div className="text-xs font-mono text-rose-400 font-bold flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" />
                  <span>潜在思维盲区与极端陷阱</span>
                </div>
                <p className="text-xs sm:text-sm font-dialectic text-zinc-300 leading-relaxed">
                  {resultArchetype.blindSpots[0]}
                </p>
              </div>
            </div>

            {/* 治愈书影游推荐 */}
            <div className="liquid-glass-card rounded-3xl p-5 border border-white/10 bg-black/35 backdrop-blur-xl space-y-3">
              <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>哲学治愈书影游推荐 (Curated Artifacts)</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1">
                  <span className="text-amber-300 flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>经典著作</span>
                  </span>
                  <div className="text-white font-serif font-bold text-sm">
                    {resultArchetype.recommendedWorks.book}
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1">
                  <span className="text-purple-300 flex items-center gap-1">
                    <Film className="w-3.5 h-3.5" />
                    <span>沉浸电影</span>
                  </span>
                  <div className="text-white font-serif font-bold text-sm">
                    {resultArchetype.recommendedWorks.movie}
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1">
                  <span className="text-cyan-300 flex items-center gap-1">
                    <Gamepad2 className="w-3.5 h-3.5" />
                    <span>哲学游戏</span>
                  </span>
                  <div className="text-white font-serif font-bold text-sm">
                    {resultArchetype.recommendedWorks.game}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 右栏 (5 栏) · 灵魂契合先哲 3D 典藏卡与生态联动 */}
          <div className="lg:col-span-5 space-y-5">
            {/* 先哲典藏立绘卡片 */}
            <div className="liquid-glass-card rounded-3xl p-6 sm:p-7 border border-amber-500/40 bg-gradient-to-b from-amber-500/[0.07] to-black/60 backdrop-blur-xl shadow-2xl text-center space-y-4">
              <span className="text-[11px] font-mono text-amber-400 uppercase tracking-widest block font-bold">
                ✦ 灵魂契合先哲 (SOUL PHILOSOPHER) ✦
              </span>

              {/* 图像 */}
              <div className="relative inline-block mx-auto">
                <img
                  src={resultArchetype.matchedPhilosopher.avatar}
                  alt={resultArchetype.matchedPhilosopher.name}
                  onError={handleImageFallback}
                  className="w-36 h-36 sm:w-44 sm:h-44 rounded-3xl object-cover border-2 border-amber-400/50 shadow-[0_0_30px_rgba(245,158,11,0.35)] mx-auto transition-transform hover:scale-105 duration-500"
                />
                <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-amber-500 text-stone-950 font-mono font-bold text-[10px] shadow-lg whitespace-nowrap">
                  100% 灵魂契合
                </span>
              </div>

              {/* 先哲名号与名言 */}
              <div className="space-y-1 pt-1">
                <h2 className="text-2xl sm:text-3xl font-bold font-serif text-white">
                  {resultArchetype.matchedPhilosopher.name}
                </h2>
                <p className="text-xs font-mono text-amber-300/80">
                  代表著作: {resultArchetype.matchedPhilosopher.works}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 text-stone-200 text-xs sm:text-sm font-serif italic leading-relaxed">
                “{resultArchetype.matchedPhilosopher.quote}”
              </div>

              {/* 生态联动操作按钮 */}
              <div className="space-y-2.5 pt-2">
                <button
                  onClick={() => handleStartChatWithMatch(resultArchetype.matchedPhilosopher.id)}
                  className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:brightness-110 text-stone-950 font-mono font-bold text-xs tracking-wider shadow-[0_0_24px_rgba(245,158,11,0.35)] transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>入舱与 {resultArchetype.matchedPhilosopher.name.split(' ')[0]} 展开 1-on-1 辩难 →</span>
                </button>

                <button
                  onClick={() => openPhilosopherById(resultArchetype.matchedPhilosopher.id)}
                  className="w-full py-2.5 px-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 text-stone-200 font-mono text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                  <span>查阅先哲生平大传与 Prompt 档案</span>
                </button>
              </div>
            </div>

            {/* 导出海报与重新测试 */}
            <div className="liquid-glass-card rounded-3xl p-5 border border-white/10 bg-black/40 backdrop-blur-xl flex items-center justify-between gap-3">
              <button
                onClick={handleExportPoster}
                disabled={isExporting}
                className="flex-1 py-3 px-4 rounded-xl bg-white text-black font-mono font-bold text-xs transition-all hover:bg-stone-200 flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-40"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{isExporting ? '正在绘制海报...' : '生成并导出黑金典藏海报'}</span>
              </button>

              <button
                onClick={handleRestart}
                className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-400 hover:text-white transition-all cursor-pointer"
                title="重新测试 (Retake Quiz)"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
