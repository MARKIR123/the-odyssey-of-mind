import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { Philosopher, CulturalEcho } from '../../types/philosophy';
import { getCardHonorific } from '../../data/cardHonorifics';
import { ERAS_DATA } from '../../data/eras';
import { FALLBACK_STATUE_SVG, handleImageFallback } from '../../data/fallbackAvatar';
import {
  X,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  RotateCw,
  BookOpen,
  Sparkles,
  History,
  Compass,
  Shield,
  Zap,
  Award
} from 'lucide-react';

interface BalatroCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: Philosopher | CulturalEcho | null;
  deckItems?: (Philosopher | CulturalEcho)[];
  onSelectItem?: (item: Philosopher | CulturalEcho) => void;
  onStartAiChat?: (philosopher: Philosopher) => void;
  language?: 'zh' | 'en';
}

export const BalatroCardModal: React.FC<BalatroCardModalProps> = ({
  isOpen,
  onClose,
  item,
  deckItems = [],
  onSelectItem,
  onStartAiChat,
  language = 'zh'
}) => {
  // Physical parameters chosen by user
  const params = {
    thickness: 8,
    hoverScale: 1.05,
    maxTilt: 7,
    perspective: 1800,
    dragInertia: 0.35,
    snapDuration: 0.55,
    elevateZ: 28,
    idleAmp: 6
  };

  const cardRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const idleWrapperRef = useRef<HTMLDivElement>(null);
  const sheenFrontRef = useRef<HTMLDivElement>(null);
  const sheenBackRef = useRef<HTMLDivElement>(null);

  // States
  const [isFlipped, setIsFlipped] = useState(false);
  const isFlippedRef = useRef(false);
  isFlippedRef.current = isFlipped;

  const [backActiveTab, setBackActiveTab] = useState<'chronicle' | 'crisis' | 'concepts' | 'anecdotes'>('chronicle');

  const [isDragging, setIsDragging] = useState(false);
  const isDraggingRef = useRef(false);
  isDraggingRef.current = isDragging;

  const [isExiting, setIsExiting] = useState(false);

  const handleRequestClose = useCallback(() => {
    if (isExiting) return;
    setIsExiting(true);
    setTimeout(() => {
      setIsExiting(false);
      onClose();
    }, 200);
  }, [isExiting, onClose]);

  const isMouseDownRef = useRef(false);
  const isHoveredRef = useRef(false);
  const isFlippingRef = useRef(false);
  const justFinishedDragRef = useRef(false);

  const dragStartPosRef = useRef({ x: 0, y: 0 });
  const totalDragDistRef = useRef(0);
  const lastMousePosRef = useRef({ x: 0, y: 0 });
  const dragVelocityRef = useRef({ vx: 0, vy: 0 });

  // Reset flip when switching item
  useEffect(() => {
    setIsFlipped(false);
    isFlippedRef.current = false;
    setBackActiveTab('chronicle');
    if (cardRef.current) {
      cardRef.current.classList.remove('is-flipped');
      cardRef.current.style.transform = 'translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    }
  }, [item]);

  // Determine current deck index
  const currentIndex = useMemo(() => {
    if (!item || deckItems.length === 0) return -1;
    return deckItems.findIndex((d) => d.id === item.id);
  }, [item, deckItems]);

  const handlePrev = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (currentIndex > 0 && onSelectItem) {
        onSelectItem(deckItems[currentIndex - 1]);
      }
    },
    [currentIndex, deckItems, onSelectItem]
  );

  const handleNext = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (currentIndex < deckItems.length - 1 && onSelectItem) {
        onSelectItem(deckItems[currentIndex + 1]);
      }
    },
    [currentIndex, deckItems, onSelectItem]
  );

  // Flip trigger with animation lock
  const triggerFlip = useCallback(() => {
    if (isFlippingRef.current) return;
    isFlippingRef.current = true;

    const nextFlipped = !isFlippedRef.current;
    setIsFlipped(nextFlipped);
    isFlippedRef.current = nextFlipped;

    const card = cardRef.current;
    if (card) {
      if (nextFlipped) {
        card.classList.add('is-flipped');
      } else {
        card.classList.remove('is-flipped');
      }

      const baseFlip = nextFlipped ? 180 : 0;
      card.style.transition = 'transform 0.55s cubic-bezier(0.2, 0.85, 0.25, 1)';
      card.style.transform = `
        translate3d(0px, 0px, ${isHoveredRef.current ? params.elevateZ : 0}px)
        rotateX(0deg)
        rotateY(${baseFlip}deg)
        scale3d(${isHoveredRef.current ? params.hoverScale : 1}, ${isHoveredRef.current ? params.hoverScale : 1}, 1)
      `;
    }

    setTimeout(() => {
      isFlippingRef.current = false;
    }, 550);
  }, [params.elevateZ, params.hoverScale]);

  // Keyboard controls
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleRequestClose();
      } else if (e.code === 'Space' && e.target === document.body) {
        e.preventDefault();
        triggerFlip();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleRequestClose, triggerFlip, handlePrev, handleNext]);

  // Pointer & 3D Physics Handlers
  const handleStageMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isDraggingRef.current || isFlippingRef.current) return;
      const stage = stageRef.current;
      const card = cardRef.current;
      if (!stage || !card) return;

      const stageBounds = stage.getBoundingClientRect();
      const mouseX = e.clientX - stageBounds.left;
      const mouseY = e.clientY - stageBounds.top;
      const centerX = stageBounds.width / 2;
      const centerY = stageBounds.height / 2;

      const normY = Math.max(-1, Math.min(1, (mouseY - centerY) / centerY));
      const normX = Math.max(-1, Math.min(1, (mouseX - centerX) / centerX));

      const rotX = -normY * params.maxTilt;
      const rotY = normX * params.maxTilt;

      const baseFlip = isFlippedRef.current ? 180 : 0;
      const mirrorRotY = isFlippedRef.current ? -rotY : rotY;

      // 0.08s ease-out GPU transition for butter-smooth responsiveness without jitter
      card.style.transition = 'transform 0.08s ease-out';
      card.style.transform = `
        translate3d(0px, 0px, ${params.elevateZ}px)
        rotateX(${rotX.toFixed(2)}deg)
        rotateY(${(baseFlip + mirrorRotY).toFixed(2)}deg)
        scale3d(${params.hoverScale}, ${params.hoverScale}, ${params.hoverScale})
      `;

      // Optical Sheen Tracking
      const sheenX = Math.max(0, Math.min(100, (mouseX / stageBounds.width) * 100));
      const sheenY = Math.max(0, Math.min(100, (mouseY / stageBounds.height) * 100));

      if (sheenFrontRef.current) {
        sheenFrontRef.current.style.setProperty('--mouse-x', `${sheenX}%`);
        sheenFrontRef.current.style.setProperty('--mouse-y', `${sheenY}%`);
        sheenFrontRef.current.style.setProperty('--sheen-opacity', '0.42');
      }
      if (sheenBackRef.current) {
        sheenBackRef.current.style.setProperty('--mouse-x', `${sheenX}%`);
        sheenBackRef.current.style.setProperty('--mouse-y', `${sheenY}%`);
        sheenBackRef.current.style.setProperty('--sheen-opacity', '0.42');
      }

      // Dynamic Molten Gold Text Angle & Shift
      const laserShiftX = 50 + normX * 45 * 1.5;
      const laserShiftY = 50 + normY * 45 * 1.5;
      const laserAngle = 125 + normX * 25;
      card.style.setProperty('--laser-pos-x', `${laserShiftX.toFixed(1)}%`);
      card.style.setProperty('--laser-pos-y', `${laserShiftY.toFixed(1)}%`);
      card.style.setProperty('--laser-angle', `${laserAngle.toFixed(1)}deg`);
    },
    [params.elevateZ, params.hoverScale, params.maxTilt]
  );

  const handleStageMouseEnter = useCallback(() => {
    isHoveredRef.current = true;
    if (idleWrapperRef.current) {
      idleWrapperRef.current.classList.remove('balatro-card-idle-animation');
    }
  }, []);

  const handleStageMouseLeave = useCallback(() => {
    isHoveredRef.current = false;
    if (isDraggingRef.current || isFlippingRef.current) return;

    const card = cardRef.current;
    if (card) {
      const baseFlip = isFlippedRef.current ? 180 : 0;
      card.style.transition = 'transform 0.5s cubic-bezier(0.2, 0.8, 0.25, 1)';
      card.style.transform = `
        translate3d(0px, 0px, 0px)
        rotateX(0deg)
        rotateY(${baseFlip}deg)
        scale3d(1, 1, 1)
      `;
    }

    if (sheenFrontRef.current) sheenFrontRef.current.style.setProperty('--sheen-opacity', '0.15');
    if (sheenBackRef.current) sheenBackRef.current.style.setProperty('--sheen-opacity', '0.15');

    setTimeout(() => {
      if (!isHoveredRef.current && !isMouseDownRef.current && idleWrapperRef.current) {
        idleWrapperRef.current.classList.add('balatro-card-idle-animation');
      }
    }, 500);
  }, []);

  // Card Pointer Down (Drag engagement start - works across mouse, touch & pen)
  const handleCardPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 || isFlippingRef.current) return;
    isMouseDownRef.current = true;
    dragStartPosRef.current = { x: e.clientX, y: e.clientY };
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };
    totalDragDistRef.current = 0;
    dragVelocityRef.current = { vx: 0, vy: 0 };
  };

  // Global window pointerup / pointermove for drag inertia
  useEffect(() => {
    if (!isOpen) return;

    const handleWindowPointerMove = (e: PointerEvent) => {
      if (!isMouseDownRef.current) return;

      const dx = e.clientX - dragStartPosRef.current.x;
      const dy = e.clientY - dragStartPosRef.current.y;
      const dist = Math.hypot(dx, dy);
      totalDragDistRef.current = dist;

      if (dist > 7) {
        if (!isDraggingRef.current) {
          setIsDragging(true);
          isDraggingRef.current = true;
          if (idleWrapperRef.current) {
            idleWrapperRef.current.classList.remove('balatro-card-idle-animation');
          }
        }
      }

      if (isDraggingRef.current && cardRef.current) {
        const moveDx = e.clientX - lastMousePosRef.current.x;
        const moveDy = e.clientY - lastMousePosRef.current.y;

        dragVelocityRef.current.vx = dragVelocityRef.current.vx * 0.7 + moveDx * 0.3;
        dragVelocityRef.current.vy = dragVelocityRef.current.vy * 0.7 + moveDy * 0.3;
        lastMousePosRef.current = { x: e.clientX, y: e.clientY };

        const dragRotZ = Math.max(-12, Math.min(12, dragVelocityRef.current.vx * 1.5));
        const dragRotX = Math.max(-10, Math.min(10, -dragVelocityRef.current.vy * 1.2));
        const baseFlip = isFlippedRef.current ? 180 : 0;

        cardRef.current.style.transition = 'transform 0.04s linear';
        cardRef.current.style.transform = `
          translate3d(${(dx * 0.85).toFixed(1)}px, ${(dy * 0.85).toFixed(1)}px, ${params.elevateZ * 1.5}px)
          rotateX(${dragRotX.toFixed(2)}deg)
          rotateY(${baseFlip}deg)
          rotateZ(${dragRotZ.toFixed(2)}deg)
          scale3d(${params.hoverScale * 1.02}, ${params.hoverScale * 1.02}, ${params.hoverScale * 1.02})
        `;
      }
    };

    const handleWindowPointerUp = () => {
      if (!isMouseDownRef.current) return;
      isMouseDownRef.current = false;

      if (isDraggingRef.current) {
        setIsDragging(false);
        isDraggingRef.current = false;
        justFinishedDragRef.current = true;
        setTimeout(() => {
          justFinishedDragRef.current = false;
        }, 80);

        if (cardRef.current) {
          cardRef.current.style.transition = `transform ${params.snapDuration}s cubic-bezier(0.18, 0.89, 0.32, 1.28)`;
          const baseFlip = isFlippedRef.current ? 180 : 0;
          cardRef.current.style.transform = `
            translate3d(0px, 0px, ${isHoveredRef.current ? params.elevateZ : 0}px)
            rotateX(0deg)
            rotateY(${baseFlip}deg)
            scale3d(${isHoveredRef.current ? params.hoverScale : 1}, ${isHoveredRef.current ? params.hoverScale : 1}, 1)
          `;
        }

        setTimeout(() => {
          if (!isHoveredRef.current && !isMouseDownRef.current && idleWrapperRef.current) {
            idleWrapperRef.current.classList.add('balatro-card-idle-animation');
          }
        }, params.snapDuration * 1000);
      }
    };

    window.addEventListener('pointermove', handleWindowPointerMove);
    window.addEventListener('pointerup', handleWindowPointerUp);
    window.addEventListener('pointercancel', handleWindowPointerUp);

    return () => {
      window.removeEventListener('pointermove', handleWindowPointerMove);
      window.removeEventListener('pointerup', handleWindowPointerUp);
      window.removeEventListener('pointercancel', handleWindowPointerUp);
    };
  }, [isOpen, params.elevateZ, params.hoverScale, params.snapDuration]);

  if (!isOpen || !item) return null;

  // Extract display values depending on whether item is Philosopher or CulturalEcho
  const isPhilosopher = 'schools' in item;
  const phil = isPhilosopher ? (item as Philosopher) : null;
  const echo = !isPhilosopher ? (item as CulturalEcho) : null;

  const cardTitleZh = isPhilosopher ? phil!.name.zh : echo!.title.zh;
  const cardTitleEn = isPhilosopher ? phil!.name.en : echo!.title.en;
  const cardImage = isPhilosopher ? phil!.avatar : echo!.coverImage || FALLBACK_STATUE_SVG;
  const cardHonorific = getCardHonorific(item);

  const eraObj = ERAS_DATA.find((e) => e.id === (isPhilosopher ? phil!.eraId : 'axial-age'));
  const eraName = eraObj ? eraObj.name.zh : '文明纪元';

  const schoolBadge = isPhilosopher
    ? phil!.schools[0] || '思想先驱'
    : echo!.type === 'art'
    ? '传世艺术'
    : echo!.type === 'movie'
    ? '电影神作'
    : echo!.type === 'game'
    ? '数字互动'
    : '经典文渊';

  const yearTimeline = isPhilosopher
    ? phil!.lifespan
    : echo!.year ? `AD ${echo!.year}` : '';

  const originLocation = isPhilosopher
    ? phil!.nationality
    : echo!.creator || '文明遗产';

  const quoteText = isPhilosopher
    ? phil!.coreInsight || (phil!.famousQuotes?.[0]?.quote ?? '')
    : echo!.quote || echo!.connection;

  const quoteSource = isPhilosopher
    ? phil!.famousQuotes?.[0]?.source || (phil!.notableWorks?.[0] ? `《${phil!.notableWorks[0]}》` : `—— ${phil!.name.zh}`)
    : echo!.creator ? `—— ${echo!.creator} 作品` : '';

  const backSummary = isPhilosopher
    ? phil!.summary
    : echo!.connection;

  const conceptsList = isPhilosopher
    ? (phil!.keyConcepts || []).slice(0, 3)
    : (echo!.tags || []).slice(0, 3).map((tag) => ({
        term: tag,
        explanation: `${echo!.title.zh} 中所折射出的关键文明命题与哲学反思。`
      }));

  const backImpact = isPhilosopher
    ? phil!.historicalImpact
    : echo!.connection;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 select-none ${
        isExiting ? 'balatro-focus-backdrop-out' : 'balatro-focus-backdrop-in'
      }`}
      onClick={handleRequestClose}
    >
      {/* Top Bar Floating Controls */}
      <div className="absolute top-4 sm:top-6 inset-x-6 z-40 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto px-3.5 py-1.5 rounded-full bg-stone-950/85 border border-white/15 backdrop-blur-md shadow-xl text-xs font-mono text-amber-200">
          <span className="text-amber-400">✦</span>
          <span className="font-bold tracking-wider">
            {isPhilosopher ? '先哲丰碑 · 典藏思想石板' : '文明回响 · 跨媒介艺术巨作'}
          </span>
          <span className="text-stone-500">|</span>
          <span className="text-stone-400 text-[11px] hidden sm:inline">
            {isPhilosopher ? '传世肖像 · 黑曜石大典 · 触觉研思' : '时代印记 · 艺术丰碑 · 思想共鸣'}
          </span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleRequestClose();
          }}
          className="pointer-events-auto p-2 rounded-full bg-stone-900/80 hover:bg-stone-800 border border-white/20 text-stone-300 hover:text-white transition-all shadow-xl active:scale-95"
          title="关闭 (Esc)"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Deck Navigation - Left Arrow */}
      {currentIndex > 0 && onSelectItem && (
        <button
          onClick={handlePrev}
          className="absolute left-4 sm:left-10 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-stone-950/80 hover:bg-amber-500/20 border border-white/15 hover:border-amber-400/50 text-stone-300 hover:text-amber-200 transition-all shadow-2xl active:scale-90"
          title="上一张 (←)"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* Deck Navigation - Right Arrow */}
      {currentIndex < deckItems.length - 1 && onSelectItem && (
        <button
          onClick={handleNext}
          className="absolute right-4 sm:right-10 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-stone-950/80 hover:bg-amber-500/20 border border-white/15 hover:border-amber-400/50 text-stone-300 hover:text-amber-200 transition-all shadow-2xl active:scale-90"
          title="下一张 (→)"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Center 3D Stage */}
      <div
        ref={stageRef}
        className="balatro-card-stage"
        onClick={(e) => {
          if (e.target === stageRef.current) {
            handleRequestClose();
          }
        }}
        onMouseMove={handleStageMouseMove}
        onMouseEnter={handleStageMouseEnter}
        onMouseLeave={handleStageMouseLeave}
      >
        <div
          ref={idleWrapperRef}
          className={`balatro-card-idle-wrapper balatro-card-idle-animation ${
            isExiting ? 'balatro-focus-stage-out' : 'balatro-focus-stage-in'
          }`}
          onClick={(e) => {
            if (e.target === idleWrapperRef.current) {
              handleRequestClose();
            }
          }}
        >
          {/* Main 3D Balatro SSR Card */}
          <div
            ref={cardRef}
            className="balatro-ssr-card"
            onPointerDown={handleCardPointerDown}
            onClick={(e) => {
              e.stopPropagation();
              if (justFinishedDragRef.current || isDraggingRef.current || isFlippingRef.current) return;
              triggerFlip();
            }}
          >
            {/* 3D Physical Extruded Slab Slices (8px thickness) */}
            <div className="pointer-events-none">
              {Array.from({ length: 10 }).map((_, i) => {
                const z = -4 + ((i + 1) / 11) * 8;
                return (
                  <div
                    key={i}
                    className="card-slab-slice"
                    style={{ transform: `translateZ(${z.toFixed(2)}px)` }}
                  />
                );
              })}
            </div>

            {/* ======================================================== */}
            {/* A. FRONT FACE: SSR FULL-BLEED ARTWORK (肖像全幅典藏) */}
            {/* ======================================================== */}
            <div className="card-face card-face-front flex flex-col justify-between p-4 sm:p-5">
              {/* Full-Bleed Artwork Image */}
              <img
                src={cardImage}
                alt={cardTitleZh}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = FALLBACK_STATUE_SVG;
                }}
                className="absolute inset-0 w-full h-full object-cover object-top pointer-events-none filter contrast-[1.06]"
              />

              {/* Cinematic Vignette Gradients */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/85 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-transparent to-black/30 pointer-events-none" />

              {/* TOP FROSTED GLASS HEADER (Integrated, Refined, Clean) */}
              <div className="balatro-glass-header rounded-2xl p-4 relative z-10 transition-all shadow-2xl">
                {/* Header Top Bar: School & Index / Timeline */}
                <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-2.5">
                  <span className="text-[11px] font-mono font-bold tracking-wider px-3 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    {schoolBadge}
                  </span>
                  <div className="flex items-center gap-2 text-xs font-mono text-stone-400">
                    <span className="text-amber-300/85 font-medium">{eraName}</span>
                    {yearTimeline && (
                      <>
                        <span className="text-stone-600">/</span>
                        <span className="text-stone-300">{yearTimeline}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Master Name Line: Chinese Big + English Right */}
                <div className="flex items-baseline justify-between gap-2">
                  <h2 className="text-2xl sm:text-3xl font-black text-amber-50 tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] leading-tight laser-style-liquid-chrome-gold">
                    {cardTitleZh}
                  </h2>
                  <span className="text-xs font-mono font-semibold tracking-widest text-amber-300/75 uppercase">
                    {cardTitleEn}
                  </span>
                </div>

                {/* Subtitle Row: Directly under philosopher name */}
                <div className="mt-2 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-1.5 text-amber-300">
                    <span className="text-amber-400 text-xs">✦</span>
                    <span className="font-bold tracking-wider text-amber-200">
                      {cardHonorific}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-stone-300/90">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span>{originLocation}</span>
                  </div>
                </div>
              </div>

              {/* BOTTOM FROSTED GLASS QUOTE CONTAINER (Golden Core Insight) */}
              <div className="balatro-glass-quote rounded-2xl p-4 sm:p-5 relative z-10 shadow-2xl">
                <div className="text-amber-400/50 text-3xl font-serif font-black leading-none mb-1">“</div>
                <p className="text-[14px] sm:text-[15px] leading-relaxed text-stone-100 font-medium tracking-wide drop-shadow-md">
                  {quoteText}
                </p>
                <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-xs font-mono text-stone-400">
                  <span className="text-amber-300/90 italic truncate max-w-[260px]">
                    {quoteSource}
                  </span>
                  <span className="text-amber-400/90 flex items-center gap-1.5 hover:text-white transition-colors underline decoration-amber-400/40">
                    <RotateCw className="w-3.5 h-3.5" />
                    <span>点击翻转</span>
                  </span>
                </div>
              </div>

              {/* Optical Specular Sheen */}
              <div ref={sheenFrontRef} className="balatro-specular-sheen" />
            </div>

            {/* ======================================================== */}
            {/* B. BACK FACE: OBSIDIAN DOSSIER (先哲大典 · 180° 翻转) */}
            {/* ======================================================== */}
            <div className="card-face card-face-back flex flex-col justify-between p-4 sm:p-5">
              {/* Blurred Artwork Background */}
              <img
                src={cardImage}
                alt={`${cardTitleZh} Blurred`}
                onError={handleImageFallback}
                className="absolute inset-0 w-full h-full object-cover object-top pointer-events-none filter blur-md brightness-[0.22] contrast-[1.1]"
              />

              {/* Obsidian Dossier Slate */}
              <div className="balatro-glass-dossier rounded-2xl p-3.5 sm:p-4 relative z-10 h-full flex flex-col justify-between border border-white/15 overflow-hidden">
                {/* Dossier Header */}
                <div className="pb-2 border-b border-white/15 space-y-1.5 shrink-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-amber-400 text-xs font-black">✦</span>
                      <span className="text-xs font-mono font-bold tracking-wider text-amber-200 uppercase">
                        {isPhilosopher ? '先哲生平大典 · LIVING BIOGRAPHY' : '文明大典 · DOSSIER'}
                      </span>
                    </div>
                    <span className="text-[10.5px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      {cardHonorific}
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="text-lg sm:text-xl font-bold text-amber-100 font-serif tracking-wide truncate">
                      {cardTitleZh} {isPhilosopher ? '传记长卷' : '艺术解析'}
                    </h3>
                    <p className="text-[11px] font-mono text-amber-300/70 shrink-0">
                      {originLocation} {yearTimeline ? `· ${yearTimeline}` : ''}
                    </p>
                  </div>

                  {/* 4-Tab Navigation Bar for Philosophers */}
                  {isPhilosopher && (
                    <div className="flex items-center gap-1 p-1 bg-black/50 rounded-xl border border-white/10 text-[10.5px] font-mono">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setBackActiveTab('chronicle');
                        }}
                        className={`flex-1 py-1 px-1 rounded-lg transition-all text-center flex items-center justify-center gap-1 cursor-pointer ${
                          backActiveTab === 'chronicle'
                            ? 'bg-amber-500/25 text-amber-200 border border-amber-500/50 font-bold shadow-sm'
                            : 'text-stone-400 hover:text-white hover:bg-white/5 border border-transparent'
                        }`}
                      >
                        <History className="w-3 h-3" />
                        <span>生平史诗</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setBackActiveTab('crisis');
                        }}
                        className={`flex-1 py-1 px-1 rounded-lg transition-all text-center flex items-center justify-center gap-1 cursor-pointer ${
                          backActiveTab === 'crisis'
                            ? 'bg-amber-500/25 text-amber-200 border border-amber-500/50 font-bold shadow-sm'
                            : 'text-stone-400 hover:text-white hover:bg-white/5 border border-transparent'
                        }`}
                      >
                        <Zap className="w-3 h-3" />
                        <span>顿悟危机</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setBackActiveTab('concepts');
                        }}
                        className={`flex-1 py-1 px-1 rounded-lg transition-all text-center flex items-center justify-center gap-1 cursor-pointer ${
                          backActiveTab === 'concepts'
                            ? 'bg-amber-500/25 text-amber-200 border border-amber-500/50 font-bold shadow-sm'
                            : 'text-stone-400 hover:text-white hover:bg-white/5 border border-transparent'
                        }`}
                      >
                        <BookOpen className="w-3 h-3" />
                        <span>学统大典</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setBackActiveTab('anecdotes');
                        }}
                        className={`flex-1 py-1 px-1 rounded-lg transition-all text-center flex items-center justify-center gap-1 cursor-pointer ${
                          backActiveTab === 'anecdotes'
                            ? 'bg-amber-500/25 text-amber-200 border border-amber-500/50 font-bold shadow-sm'
                            : 'text-stone-400 hover:text-white hover:bg-white/5 border border-transparent'
                        }`}
                      >
                        <Award className="w-3 h-3" />
                        <span>逸事遗泽</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Scrollable Content Body */}
                <div className="flex-1 overflow-y-auto custom-scrollbar overscroll-contain pr-1 py-2 space-y-3">
                  {/* TAB 1: LIFE CHRONICLE (生平史诗) */}
                  {isPhilosopher && backActiveTab === 'chronicle' && (
                    <div className="space-y-3.5 text-left">
                      {/* Epoch Background */}
                      {phil?.biography?.historicalEpochBackground && (
                        <div className="rounded-xl p-2.5 sm:p-3 bg-amber-500/[0.06] border border-amber-500/25 text-left space-y-1">
                          <div className="text-[10px] font-mono text-amber-300 font-bold flex items-center gap-1.5 uppercase">
                            <Compass className="w-3 h-3 text-amber-400" />
                            <span>时代历史洪流与社会危机 / HISTORICAL EPOCH</span>
                          </div>
                          <p className="text-[12px] text-stone-200 leading-relaxed font-sans">
                            {phil.biography.historicalEpochBackground}
                          </p>
                        </div>
                      )}

                      {/* Multi-stage life chronicle */}
                      <div className="space-y-2.5 pt-0.5">
                        <div className="text-[10px] font-mono text-amber-300/85 font-bold uppercase tracking-wider flex items-center gap-1.5">
                          <History className="w-3 h-3 text-amber-400" />
                          <span>生平纪程长卷 / LIFE CHRONICLE ({phil?.biography?.lifeChronicle?.length || 0} 阶段)</span>
                        </div>

                        <div className="relative pl-3.5 space-y-3.5 before:absolute before:left-1 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-amber-400 before:via-amber-500/40 before:to-transparent">
                          {(phil?.biography?.lifeChronicle || []).map((stage, idx) => (
                            <div key={idx} className="relative text-left space-y-1 group">
                              {/* Timeline dot */}
                              <div className="absolute -left-[18px] top-1.5 w-2.5 h-2.5 rounded-full bg-stone-950 border-2 border-amber-400 group-hover:scale-125 transition-transform" />
                              <div className="flex items-baseline justify-between gap-2 flex-wrap">
                                <span className="text-xs font-serif font-bold text-amber-100 group-hover:text-amber-300 transition-colors">
                                  {stage.title}
                                </span>
                                <span className="text-[9.5px] font-mono text-amber-400/90 px-1.5 py-0.5 rounded bg-white/5 border border-white/10">
                                  {stage.period}
                                </span>
                              </div>
                              <div className="text-[10px] font-mono text-stone-400 font-medium">
                                {stage.phase}
                              </div>
                              <p className="text-[11.5px] leading-relaxed text-stone-200/90 font-sans">
                                {stage.summary}
                              </p>
                              {stage.keyEvents && stage.keyEvents.length > 0 && (
                                <div className="flex flex-wrap gap-1 pt-0.5">
                                  {stage.keyEvents.map((evt, eIdx) => (
                                    <span
                                      key={eIdx}
                                      className="text-[9.5px] font-mono px-1.5 py-0.5 rounded bg-white/[0.04] text-amber-200/70 border border-white/5"
                                    >
                                      • {evt}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: EPISTEMIC CRISIS (顿悟与危机) */}
                  {isPhilosopher && backActiveTab === 'crisis' && (
                    <div className="space-y-3 text-left">
                      {phil?.biography?.epistemicCrisis ? (
                        <div className="rounded-2xl p-3.5 sm:p-4 bg-gradient-to-br from-amber-500/15 via-black/40 to-stone-950/80 border border-amber-500/40 shadow-xl space-y-2.5">
                          <div className="flex items-center justify-between pb-2 border-b border-white/10">
                            <span className="text-[10.5px] font-mono text-amber-300 font-bold flex items-center gap-1.5">
                              <Zap className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                              <span>思想顿悟与认识论破壁 / EPISTEMIC CRISIS</span>
                            </span>
                            {phil.biography.epistemicCrisis.year && (
                              <span className="text-[10px] font-mono text-amber-300/90 px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/30">
                                {phil.biography.epistemicCrisis.year}
                              </span>
                            )}
                          </div>
                          <h4 className="text-base font-serif font-bold text-amber-100">
                            {phil.biography.epistemicCrisis.title}
                          </h4>
                          <p className="text-[12px] leading-relaxed text-stone-200 font-sans">
                            {phil.biography.epistemicCrisis.narrative}
                          </p>
                          <div className="pt-2 border-t border-white/10 space-y-1">
                            <span className="text-[10px] font-mono text-amber-300 font-bold flex items-center gap-1">
                              <Sparkles className="w-3 h-3 text-amber-400" />
                              <span>哲学史破壁转向与深远影响:</span>
                            </span>
                            <p className="text-[11.5px] text-amber-100/90 leading-relaxed italic bg-black/40 p-2.5 rounded-xl border border-amber-500/20">
                              “{phil.biography.epistemicCrisis.breakthrough}”
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-8 text-stone-400 font-mono text-xs">
                          先哲的思想在漫长岁月中淬炼融合，请查阅学统大典。
                        </div>
                      )}
                    </div>
                  )}

                  {/* TAB 3: CONCEPTS & DOCTRINES (学统大典) OR NON-PHILOSOPHER VIEW */}
                  {(!isPhilosopher || backActiveTab === 'concepts') && (
                    <div className="space-y-3 text-left">
                      {/* Abstract / Summary */}
                      <p className="text-[12.5px] leading-relaxed text-stone-200 font-sans bg-white/[0.03] p-3 rounded-xl border border-white/5">
                        {backSummary}
                      </p>

                      {/* Core Concepts */}
                      <div className="pt-1">
                        <div className="text-[10.5px] font-mono text-amber-300/85 font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <span>◆</span>
                          <span>核心哲学范畴 / KEY CONCEPTS</span>
                        </div>
                        <div className="space-y-2">
                          {conceptsList.map((c, idx) => (
                            <div
                              key={idx}
                              className="rounded-xl p-2.5 sm:p-3 text-left bg-white/5 border border-white/10 hover:border-amber-400/30 transition-colors"
                            >
                              <div className="text-[12.5px] font-bold text-amber-200 font-serif">
                                {c.term}
                              </div>
                              <div className="text-xs text-stone-300 leading-relaxed mt-1">
                                {c.explanation}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Notable Works & Civilization Impact */}
                      {isPhilosopher && phil?.notableWorks && phil.notableWorks.length > 0 && (
                        <div className="pt-1">
                          <div className="text-[10.5px] font-mono text-amber-300/85 font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                            <BookOpen className="w-3 h-3 text-amber-400" />
                            <span>核心传世巨著 / NOTABLE WORKS</span>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {phil.notableWorks.map((work, wIdx) => (
                              <span
                                key={wIdx}
                                className="text-[11px] font-serif px-2.5 py-0.5 rounded-lg bg-amber-500/10 text-amber-200 border border-amber-500/20"
                              >
                                {work}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="pt-1">
                        <div className="text-[10.5px] font-mono text-amber-300/85 font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                          <span>◆</span>
                          <span>文明回响 / IMPACT</span>
                        </div>
                        <p className="text-xs text-stone-300 leading-relaxed bg-black/25 p-2.5 sm:p-3 rounded-xl border border-white/5">
                          {backImpact}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* TAB 4: ANECDOTES & LEGACY (逸事遗泽) */}
                  {isPhilosopher && backActiveTab === 'anecdotes' && (
                    <div className="space-y-3 text-left">
                      {/* Anecdotes */}
                      {phil?.biography?.anecdotes && phil.biography.anecdotes.length > 0 && (
                        <div className="space-y-2">
                          <div className="text-[10.5px] font-mono text-amber-300/85 font-bold uppercase tracking-wider flex items-center gap-1.5">
                            <Sparkles className="w-3 h-3 text-amber-400" />
                            <span>传记轶事与历史注脚 / BIOGRAPHICAL ANECDOTES</span>
                          </div>
                          {phil.biography.anecdotes.map((anecdote, aIdx) => (
                            <div
                              key={aIdx}
                              className="rounded-xl p-3 bg-white/[0.04] border border-white/10 hover:border-amber-400/30 transition-colors space-y-1"
                            >
                              <div className="text-xs font-serif font-bold text-amber-200">
                                📖 {anecdote.title}
                              </div>
                              <p className="text-[11.5px] text-stone-300 leading-relaxed font-sans">
                                {anecdote.detail}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Epitaph / Historical Legacy */}
                      {phil?.biography?.epitaphOrLegacy && (
                        <div className="pt-1 space-y-1.5">
                          <div className="text-[10.5px] font-mono text-amber-300/85 font-bold uppercase tracking-wider flex items-center gap-1.5">
                            <Award className="w-3 h-3 text-amber-400" />
                            <span>墓志铭碑文与后世定论 / EPITAPH & LEGACY</span>
                          </div>
                          <div className="p-3 rounded-xl bg-gradient-to-r from-amber-500/10 via-black/40 to-transparent border border-amber-500/30">
                            <p className="text-[12px] font-serif italic text-amber-100/90 leading-relaxed">
                              {phil.biography.epitaphOrLegacy}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Famous Quotes with Sources */}
                      {phil?.famousQuotes && phil.famousQuotes.length > 0 && (
                        <div className="pt-1 space-y-1.5">
                          <div className="text-[10.5px] font-mono text-amber-300/85 font-bold uppercase tracking-wider flex items-center gap-1.5">
                            <span>“</span>
                            <span>传世原典箴言 / FAMOUS MAXIMS</span>
                          </div>
                          <div className="space-y-1.5">
                            {phil.famousQuotes.map((q, qIdx) => (
                              <div
                                key={qIdx}
                                className="p-2.5 rounded-xl bg-black/30 border border-white/5 text-[11.5px] text-stone-200"
                              >
                                <p className="font-serif italic leading-relaxed">“{q.quote}”</p>
                                {q.source && (
                                  <p className="text-[10px] font-mono text-amber-300/70 text-right mt-1">
                                    —— {q.source}
                                  </p>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Bottom Impact & Action Footer */}
                <div className="pt-3 border-t border-white/10 mt-3 shrink-0">
                  <div className="flex items-center justify-between gap-3">
                    {isPhilosopher && onStartAiChat && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onStartAiChat(phil!);
                        }}
                        className="flex-1 py-2.5 px-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-mono font-bold text-xs shadow-lg transition-all hover:shadow-amber-500/20 active:scale-95 flex items-center justify-center gap-2"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>与 {phil!.name.zh} 一对一思辨对谈 →</span>
                      </button>
                    )}

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        triggerFlip();
                      }}
                      className="cursor-pointer py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-amber-300 hover:text-white transition-all shrink-0 flex items-center gap-1.5"
                    >
                      <RotateCw className="w-3.5 h-3.5" />
                      <span>翻回正面</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Optical Specular Sheen */}
              <div ref={sheenBackRef} className="balatro-specular-sheen" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Keyboard & Interaction Hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-40 pointer-events-none">
        <div className="px-4 py-1.5 rounded-full bg-stone-950/85 border border-white/15 backdrop-blur-md shadow-lg text-[11px] font-mono text-stone-300 flex items-center gap-2">
          <span>💡 观展提示：单击翻转大典</span>
          <span className="text-stone-600">·</span>
          <span>按住倾转感知光影</span>
          <span className="text-stone-600">·</span>
          <span>← / → 漫游套牌</span>
          <span className="text-stone-600">·</span>
          <span>空白处退出</span>
        </div>
      </div>
    </div>
  );
};
