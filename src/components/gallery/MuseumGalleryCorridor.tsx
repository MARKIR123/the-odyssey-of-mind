import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { useEpoch } from '../../context/EpochContext';
import { ERAS_DATA } from '../../data/eras';
import { PHILOSOPHERS_DATA } from '../../data/philosophers';
import { CULTURAL_ECHOES_DATA } from '../../data/culturalEchoes';
import { THEORIES_DATA, PhilosophicalTheory } from '../../data/theories';
import { Philosopher, CulturalEcho } from '../../types/philosophy';
import { EraPictureFrame } from './EraPictureFrame';
import { EraMonumentPillar } from './EraMonumentPillar';
import { CorridorPhilosopherCard } from './CorridorPhilosopherCard';
import { CorridorCulturalEchoCard } from './CorridorCulturalEchoCard';

function lerp(start: number, end: number, factor: number) {
  return start + (end - start) * factor;
}

// Infallible SVG Fallback URLs (Instant, 0ms latency, zero external network dependency)
const FALLBACK_STATUE_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="500" viewBox="0 0 400 500"><defs><linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%2318181b"/><stop offset="100%" stop-color="%2309090b"/></linearGradient></defs><rect width="400" height="500" fill="url(%23bg)"/><path d="M200 120 C165 120 145 150 145 190 C145 235 170 265 200 265 C230 265 255 235 255 190 C255 150 235 120 200 120 Z M120 380 C120 300 155 285 200 285 C245 285 280 300 280 380 Z" fill="%23d4d4d8" opacity="0.35"/><circle cx="200" cy="180" r="4" fill="%23f59e0b"/><text x="200" y="420" font-family="serif" font-size="16" font-weight="bold" fill="%23a1a1aa" text-anchor="middle" letter-spacing="3">HISTORIC ARCHIVE</text></svg>`;

const FALLBACK_ECHO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><defs><linearGradient id="bg2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%231e1b4b"/><stop offset="100%" stop-color="%230f172a"/></linearGradient></defs><rect width="600" height="400" fill="url(%23bg2)"/><rect x="40" y="40" width="520" height="320" fill="none" stroke="%23f59e0b" stroke-width="2" stroke-dasharray="8 8" opacity="0.4"/><text x="300" y="205" font-family="serif" font-size="20" font-weight="bold" fill="%23fbbf24" text-anchor="middle" letter-spacing="4">FINE ART ARCHIVE</text></svg>`;

interface EraStructuredTheory {
  theory: PhilosophicalTheory;
  philosophers: Philosopher[];
  echoes: CulturalEcho[];
  width: number;
}

const PHIL_CARD_WIDTH = 255;
const ECHO_CARD_WIDTH = 270;
const CARD_GAP = 28;
const SECTION_DIVIDER_WIDTH = 76;
const PAVILION_PAD = 64;
const PAVILION_MIN_WIDTH = 780;

function calcPavilionWidth(numPhil: number, numEcho: number): number {
  let cardsW = 0;
  if (numPhil > 0) {
    cardsW += numPhil * PHIL_CARD_WIDTH + (numPhil - 1) * CARD_GAP;
  }
  if (numEcho > 0) {
    cardsW += (numPhil > 0 ? SECTION_DIVIDER_WIDTH : 0) + numEcho * ECHO_CARD_WIDTH + (numEcho - 1) * CARD_GAP;
  }
  const totalW = cardsW + PAVILION_PAD;
  // Ensure the pavilion is wide enough for the top horizontal header (title, thesis, inquiry)
  return Math.max(totalW, PAVILION_MIN_WIDTH);
}

// Pre-index static data to structure each era into Thematic Theory Pavilions
const ERA_STATIC_DATA = ERAS_DATA.map((era) => {
  const eraTheories = THEORIES_DATA.filter((t) =>
    t.eraId === era.id ||
    (era.id === 'enlightenment-early-modern' && t.eraId === 'enlightenment') ||
    (era.id === 'enlightenment' && t.eraId === 'enlightenment-early-modern')
  );

  const structuredTheories: EraStructuredTheory[] = eraTheories.map((theory) => {
    const philosophers = theory.philosopherIds
      .map((id) => PHILOSOPHERS_DATA.find((p) => p.id === id))
      .filter((p): p is Philosopher => p !== undefined);

    const echoes = theory.culturalEchoIds
      .map((id) => CULTURAL_ECHOES_DATA.find((e) => e.id === id))
      .filter((e): e is CulturalEcho => e !== undefined);

    return {
      theory,
      philosophers,
      echoes,
      width: calcPavilionWidth(philosophers.length, echoes.length)
    };
  });

  return {
    era,
    theories: structuredTheories
  };
});

// Six distinct era art & design languages mapping
const ERA_THEMES_CONFIG: Record<string, {
  monumentClass: string;
  frameClass: string;
  heroFrameClass: string;
  dividerClass: string;
  accent: string;
  roomSymbol: string;
  fontFamily: string;
}> = {
  'axial-age': {
    monumentClass: 'monument-era-axial',
    frameClass: 'frame-era-axial',
    heroFrameClass: 'hero-frame-era-axial',
    dividerClass: 'divider-era-axial',
    accent: '#d4a359',
    roomSymbol: 'ΑΩ · 道',
    fontFamily: "'Cinzel', 'Noto Serif SC', serif"
  },
  'hellenistic-medieval': {
    monumentClass: 'monument-era-medieval',
    frameClass: 'frame-era-medieval',
    heroFrameClass: 'hero-frame-era-medieval',
    dividerClass: 'divider-era-medieval',
    accent: '#c88a2e',
    roomSymbol: '† · ☩',
    fontFamily: "'Cormorant Garamond', 'Noto Serif SC', serif"
  },
  'enlightenment': {
    monumentClass: 'monument-era-enlightenment',
    frameClass: 'frame-era-enlightenment',
    heroFrameClass: 'hero-frame-era-enlightenment',
    dividerClass: 'divider-era-enlightenment',
    accent: '#d97736',
    roomSymbol: '⚙ · ✦',
    fontFamily: "'Playfair Display', 'Noto Serif SC', serif"
  },
  'nineteenth-century': {
    monumentClass: 'monument-era-nineteenth',
    frameClass: 'frame-era-nineteenth',
    heroFrameClass: 'hero-frame-era-nineteenth',
    dividerClass: 'divider-era-nineteenth',
    accent: '#b83a4b',
    roomSymbol: '⚡ · ⚒',
    fontFamily: "'Playfair Display', serif"
  },
  'twentieth-century': {
    monumentClass: 'monument-era-modern',
    frameClass: 'frame-era-modern',
    heroFrameClass: 'hero-frame-era-modern',
    dividerClass: 'divider-era-modern',
    accent: '#3b82c4',
    roomSymbol: '■ · ▲',
    fontFamily: "'Plus Jakarta Sans', sans-serif"
  },
  'modern-twentieth': {
    monumentClass: 'monument-era-modern',
    frameClass: 'frame-era-modern',
    heroFrameClass: 'hero-frame-era-modern',
    dividerClass: 'divider-era-modern',
    accent: '#3b82c4',
    roomSymbol: '■ · ▲',
    fontFamily: "'Plus Jakarta Sans', sans-serif"
  },
  'contemporary-future': {
    monumentClass: 'monument-era-contemporary',
    frameClass: 'frame-era-contemporary',
    heroFrameClass: 'hero-frame-era-contemporary',
    dividerClass: 'divider-era-contemporary',
    accent: '#0ea5b7',
    roomSymbol: '01 · ⌘',
    fontFamily: "'JetBrains Mono', monospace"
  },
  'contemporary': {
    monumentClass: 'monument-era-contemporary',
    frameClass: 'frame-era-contemporary',
    heroFrameClass: 'hero-frame-era-contemporary',
    dividerClass: 'divider-era-contemporary',
    accent: '#0ea5b7',
    roomSymbol: '01 · ⌘',
    fontFamily: "'JetBrains Mono', monospace"
  }
};

const ENTRANCE_WIDTH = 660;
const PAVILION_GAP = 48;
const TRANSIT_WIDTH = 96;

export const MuseumGalleryCorridor: React.FC = () => {
  const {
    activeEraIndex,
    setActiveEraId,
    setSelectedPhilosopher,
    openCulturalEchoById,
    language,
    seekCount
  } = useEpoch();

  const corridorRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Physics state for 60-120fps low-damping inertia drag & horizontal wheel
  const isDraggingRef = useRef(false);
  const isPointerDownRef = useRef(false);
  const isInteractingRef = useRef(false);
  const interactionTimeoutRef = useRef<number | null>(null);

  const pointerDownPosRef = useRef({ x: 0, y: 0, time: 0 });
  const lastClientXRef = useRef(0);
  const lastPointerTimeRef = useRef(0);
  const dragVelocityRef = useRef(0);
  const hasMovedBeyondThresholdRef = useRef(false);

  // Continuous keyboard movement tracking
  const heldKeysRef = useRef<Set<string>>(new Set());
  const keyVelocityRef = useRef<number>(0);

  const scrollPosRef = useRef(0);
  const targetPosRef = useRef(0);
  const lastPosRef = useRef(0);
  const velocityRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const lastSyncedEraIndexRef = useRef<number>(activeEraIndex);
  const lastHandledSeekCountRef = useRef<number>(seekCount);

  // Floating keyboard navigation hint state (auto-fades after 4 seconds)
  const [showKeyboardHint, setShowKeyboardHint] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setShowKeyboardHint(false);
    }, 4000);
    return () => window.clearTimeout(timer);
  }, []);

  // Image error handling with fallback
  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>, isEcho = false) => {
    const target = e.currentTarget;
    if (!target.dataset.triedFallback) {
      target.dataset.triedFallback = 'true';
      target.src = isEcho ? FALLBACK_ECHO_SVG : FALLBACK_STATUE_SVG;
    }
  };

  // Dynamically calculate each room's width and cumulative offsets based on Theory Pavilions
  const { roomWidths, eraOffsets, totalTrackWidth } = useMemo(() => {
    const widths: number[] = [];
    const offsets: number[] = [];
    let currentOffset = 0;

    ERA_STATIC_DATA.forEach(({ theories }) => {
      const pavilionsWidth = theories.reduce((acc, t, idx) => {
        return acc + t.width + (idx > 0 ? PAVILION_GAP : 0);
      }, 0);

      const rawComputed = ENTRANCE_WIDTH + PAVILION_GAP + pavilionsWidth + PAVILION_GAP + TRANSIT_WIDTH;
      const finalW = Math.max(rawComputed, 2400);

      widths.push(finalW);
      offsets.push(currentOffset);
      currentOffset += finalW;
    });

    return {
      roomWidths: widths,
      eraOffsets: offsets,
      totalTrackWidth: currentOffset
    };
  }, []);

  const maxScroll = Math.max(
    0,
    Math.max(
      eraOffsets[eraOffsets.length - 1] || 0,
      totalTrackWidth - (corridorRef.current?.clientWidth || (typeof window !== 'undefined' ? window.innerWidth : 1400))
    )
  );

  // Sync activeEraIndex with target position ONLY when explicitly sought externally (timeline scrubber click or search)
  useEffect(() => {
    if (seekCount !== lastHandledSeekCountRef.current) {
      lastHandledSeekCountRef.current = seekCount;
      const targetOffset = eraOffsets[activeEraIndex] ?? 0;
      targetPosRef.current = Math.min(maxScroll, targetOffset);
      lastSyncedEraIndexRef.current = activeEraIndex;
    }
  }, [seekCount, activeEraIndex, eraOffsets, maxScroll]);

  // Track interaction state to prevent fighting between drag and external props
  const markInteraction = useCallback(() => {
    isInteractingRef.current = true;
    if (interactionTimeoutRef.current) {
      window.clearTimeout(interactionTimeoutRef.current);
    }
    interactionTimeoutRef.current = window.setTimeout(() => {
      isInteractingRef.current = false;
    }, 450);
  }, []);

  // Main 60-120fps hardware-accelerated low-damping animation frame loop
  useEffect(() => {
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const dt = Math.min(32, Math.max(8, currentTime - lastTime));
      lastTime = currentTime;

      // Continuous Keyboard Navigation Physics (pixels per frame at 60fps, calibrated for 60-120fps)
      // Base stroll: ~14px / frame (~840px / sec) - leisurely contemplative reading pace
      // Fast stroll with Shift: ~30px / frame (~1800px / sec)
      const BASE_SPEED = 14;
      const FAST_SPEED = 30;
      const ACCEL = 0.14; // Smooth ramp up over ~7-8 frames

      const isRightHeld =
        heldKeysRef.current.has('ArrowRight') ||
        heldKeysRef.current.has('ArrowDown') ||
        heldKeysRef.current.has('d') ||
        heldKeysRef.current.has('D');

      const isLeftHeld =
        heldKeysRef.current.has('ArrowLeft') ||
        heldKeysRef.current.has('ArrowUp') ||
        heldKeysRef.current.has('a') ||
        heldKeysRef.current.has('A');

      const isShiftHeld =
        heldKeysRef.current.has('Shift') ||
        heldKeysRef.current.has('ShiftLeft') ||
        heldKeysRef.current.has('ShiftRight');

      const maxSpeed = isShiftHeld ? FAST_SPEED : BASE_SPEED;

      if (isRightHeld && !isLeftHeld) {
        markInteraction();
        keyVelocityRef.current = Math.min(maxSpeed, keyVelocityRef.current + maxSpeed * ACCEL);
      } else if (isLeftHeld && !isRightHeld) {
        markInteraction();
        keyVelocityRef.current = Math.max(-maxSpeed, keyVelocityRef.current - maxSpeed * ACCEL);
      } else {
        // Silky coasting deceleration when arrow key is released
        keyVelocityRef.current *= 0.72;
        if (Math.abs(keyVelocityRef.current) < 0.1) {
          keyVelocityRef.current = 0;
        }
      }

      if (Math.abs(keyVelocityRef.current) > 0) {
        // Scale step slightly by dt/16.67 to ensure identical physics on 60Hz and 120Hz/144Hz displays
        const step = keyVelocityRef.current * (dt / 16.67);
        targetPosRef.current = Math.max(0, Math.min(maxScroll, targetPosRef.current + step));
      }

      // Lerp physics interpolation
      const dist = targetPosRef.current - scrollPosRef.current;
      if (Math.abs(dist) < 0.15 && Math.abs(keyVelocityRef.current) === 0) {
        scrollPosRef.current = targetPosRef.current;
        velocityRef.current = 0;
      } else {
        scrollPosRef.current = lerp(scrollPosRef.current, targetPosRef.current, 0.16);
        velocityRef.current = scrollPosRef.current - lastPosRef.current;
      }
      lastPosRef.current = scrollPosRef.current;

      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${-scrollPosRef.current}px, 0, 0)`;
      }

      // Sync active era with context ONLY when movement has essentially settled
      // to prevent React tree re-renders from hitching the 60/120fps scrolling physics
      const isMotionSettled = Math.abs(velocityRef.current) < 0.8 && Math.abs(keyVelocityRef.current) < 0.5;
      if (isMotionSettled) {
        let currentRoomIndex = 0;
        for (let i = 0; i < eraOffsets.length; i++) {
          const nextOffset = eraOffsets[i + 1] ?? Infinity;
          const midpoint = (eraOffsets[i] + nextOffset) / 2;
          if (scrollPosRef.current < midpoint) {
            currentRoomIndex = i;
            break;
          }
          currentRoomIndex = i;
        }

        if (currentRoomIndex !== lastSyncedEraIndexRef.current && currentRoomIndex < ERAS_DATA.length) {
          lastSyncedEraIndexRef.current = currentRoomIndex;
          setActiveEraId(ERAS_DATA[currentRoomIndex].id);
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [eraOffsets, maxScroll, markInteraction, setActiveEraId]);

  // Wheel horizontal scrolling
  const handleWheel = useCallback(
    (e: WheelEvent) => {
      // Allow internal scrolling inside scrollable areas like drawers if not at boundaries
      const scrollable = (e.target as HTMLElement)?.closest('.overflow-y-auto');
      if (scrollable && scrollable.scrollHeight > scrollable.clientHeight) {
        const atTop = scrollable.scrollTop <= 0 && e.deltaY < 0;
        const atBottom = scrollable.scrollTop + scrollable.clientHeight >= scrollable.scrollHeight - 1 && e.deltaY > 0;
        if (!atTop && !atBottom) {
          return;
        }
      }

      e.preventDefault();
      markInteraction();

      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      targetPosRef.current = Math.max(0, Math.min(maxScroll, targetPosRef.current + delta * 1.35));
    },
    [maxScroll, markInteraction]
  );

  useEffect(() => {
    const el = corridorRef.current;
    if (!el) return;
    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [handleWheel]);

  // Continuous and paged keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle keyboard shortcut guide badge with '?'
      if (e.key === '?' || (e.key === '/' && e.shiftKey)) {
        e.preventDefault();
        setShowKeyboardHint((prev) => !prev);
        return;
      }

      // Ignore keystrokes when interacting with inputs, textareas, or modal forms
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'BUTTON' ||
          target.isContentEditable ||
          target.closest('input, textarea, button, [contenteditable="true"]'))
      ) {
        return;
      }

      // If user is focusing on an interactive element (e.g. philosopher or echo card) and presses Space or Enter, let element handle it
      if (
        (e.key === ' ' || e.key === 'Enter') &&
        target &&
        (target.getAttribute('role') === 'button' || target.closest('[role="button"]'))
      ) {
        return;
      }

      // Dismiss hint once user starts navigating
      setShowKeyboardHint(false);

      // Continuous movement keys (ArrowLeft, ArrowRight, ArrowUp, ArrowDown, A, D)
      const isContinuousKey =
        e.key === 'ArrowRight' ||
        e.key === 'ArrowLeft' ||
        e.key === 'ArrowDown' ||
        e.key === 'ArrowUp' ||
        e.key === 'd' ||
        e.key === 'D' ||
        e.key === 'a' ||
        e.key === 'A';

      if (isContinuousKey) {
        e.preventDefault();
        markInteraction();
        heldKeysRef.current.add(e.key);
        return;
      }

      if (e.key === 'Shift') {
        heldKeysRef.current.add('Shift');
      }

      // Page-level discrete navigation (PageDown, PageUp, Home, End, Space)
      const PAGE_STEP = 720;
      if (e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        markInteraction();
        targetPosRef.current = Math.max(0, Math.min(maxScroll, targetPosRef.current + PAGE_STEP));
      } else if (e.key === 'PageUp') {
        e.preventDefault();
        markInteraction();
        targetPosRef.current = Math.max(0, Math.min(maxScroll, targetPosRef.current - PAGE_STEP));
      } else if (e.key === 'Home') {
        e.preventDefault();
        markInteraction();
        targetPosRef.current = 0;
      } else if (e.key === 'End') {
        e.preventDefault();
        markInteraction();
        targetPosRef.current = maxScroll;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      heldKeysRef.current.delete(e.key);
      if (e.key === 'Shift') {
        heldKeysRef.current.delete('Shift');
        heldKeysRef.current.delete('ShiftLeft');
        heldKeysRef.current.delete('ShiftRight');
      }
    };

    const handleBlur = () => {
      heldKeysRef.current.clear();
      keyVelocityRef.current = 0;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('blur', handleBlur);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('blur', handleBlur);
    };
  }, [maxScroll, markInteraction]);

  // Pointer Drag handling (zero React re-render, hardware accelerated class toggle)
  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return;

    // Do not hijack interactive buttons or links (e.g. accordion drawers)
    const target = e.target as HTMLElement;
    if (target.closest('button, input, select, textarea, a')) {
      return;
    }

    markInteraction();
    isPointerDownRef.current = true;
    hasMovedBeyondThresholdRef.current = false;
    pointerDownPosRef.current = { x: e.clientX, y: e.clientY, time: performance.now() };
    lastClientXRef.current = e.clientX;
    lastPointerTimeRef.current = performance.now();
    dragVelocityRef.current = 0;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isPointerDownRef.current) return;

    const totalDist = Math.hypot(
      e.clientX - pointerDownPosRef.current.x,
      e.clientY - pointerDownPosRef.current.y
    );

    // Only engage drag when physical distance from start exceeds threshold (6px)
    if (totalDist > 6) {
      hasMovedBeyondThresholdRef.current = true;
      if (!isDraggingRef.current) {
        isDraggingRef.current = true;
        corridorRef.current?.classList.add('is-dragging');
        if (corridorRef.current && !corridorRef.current.hasPointerCapture(e.pointerId)) {
          try {
            corridorRef.current.setPointerCapture(e.pointerId);
          } catch {}
        }
      }
    }

    if (!hasMovedBeyondThresholdRef.current) return;

    markInteraction();
    const now = performance.now();
    const dt = Math.max(1, now - lastPointerTimeRef.current);
    const dx = e.clientX - lastClientXRef.current;
    lastClientXRef.current = e.clientX;
    lastPointerTimeRef.current = now;

    dragVelocityRef.current = -dx / dt;
    targetPosRef.current = Math.max(0, Math.min(maxScroll, targetPosRef.current - dx * 1.35));
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isPointerDownRef.current = false;
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      corridorRef.current?.classList.remove('is-dragging');

      if (corridorRef.current && corridorRef.current.hasPointerCapture?.(e.pointerId)) {
        try {
          corridorRef.current.releasePointerCapture(e.pointerId);
        } catch {}
      }

      // Apply controlled momentum inertia fling
      const clampedVelocity = Math.max(-4, Math.min(4, dragVelocityRef.current));
      const fling = clampedVelocity * 130;
      targetPosRef.current = Math.max(0, Math.min(maxScroll, targetPosRef.current + fling));
    }
  };

  return (
    <div
      ref={corridorRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className="h-full w-full flex-1 min-h-0 relative overflow-hidden select-none bg-transparent flex flex-col touch-none cursor-grab"
    >
      {/* Museum Ceiling Ambient Spotlight Field */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_45%_at_50%_0%,rgba(245,158,11,0.06),transparent_80%)]" />

      {/* Subtle Museum Floor Horizon / Ground Reflection */}
      <div className="absolute bottom-0 inset-x-0 h-24 pointer-events-none bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Corridor Horizontal Exhibition Track */}
      <div
        ref={trackRef}
        className="h-full w-max flex flex-row items-stretch will-change-transform pt-3 sm:pt-4 pb-2 sm:pb-3"
        style={{ width: `${totalTrackWidth}px` }}
      >
        {ERA_STATIC_DATA.map(({ era, theories }, eraIdx) => {
          const themeCfg = ERA_THEMES_CONFIG[era.id] || ERA_THEMES_CONFIG['axial-age'];
          const eraThemeColor = era.accentColor || themeCfg.accent;
          const thisRoomWidth = roomWidths[eraIdx] || 2400;

          return (
            <section
              key={era.id}
              className="room-containment shrink-0 flex flex-row items-stretch gap-8 sm:gap-10 px-5 sm:px-8 relative h-full min-h-[480px]"
              style={{
                width: `${thisRoomWidth}px`
              }}
            >
                {/* =========================================================
                    ZONE 1: 时代文明立柱铭碑与建筑边框 (Era Monument Architecture)
                    Unique architectural design per era (Greek Temple, Gothic Shrine, etc.)
                    ========================================================= */}
                <EraMonumentPillar
                  era={era}
                  eraIdx={eraIdx}
                  themeCfg={themeCfg}
                  language={language}
                />

                {/* =========================================================
                    ZONE 2: 主流哲学理论展亭群落 (Thematic Theory Pavilions)
                    Top-to-Bottom Architecture:
                    1. Top Horizontal Header: Theory Identity + Thesis + Inquiry + Genealogy
                    2. Middle Main Body: Representative Masters Alcove + Art Echoes Niche
                    3. Bottom Ribbon: Dialectical Clash Pedestal Ribbon
                    ========================================================= */}
                <div className="h-full flex flex-row items-stretch gap-8 sm:gap-10 shrink-0">
                  {theories.map(({ theory, philosophers, echoes, width: pWidth }, tIdx) => (
                    <div
                      key={theory.id}
                      className="h-full shrink-0 flex flex-col justify-between p-4 sm:p-6 rounded-3xl relative pavilion-obsidian-glass group/pavilion"
                      style={{ width: `${pWidth}px`, minWidth: `${pWidth}px` }}
                    >
                      {/* Ambient Theory Pavilion Spotlight (Contained top-down radial light) */}
                      <div
                        className="absolute inset-x-0 top-0 h-44 sm:h-52 rounded-t-3xl pointer-events-none opacity-20 transition-opacity group-hover/pavilion:opacity-30"
                        style={{
                          background: `radial-gradient(ellipse 70% 100% at 30% 0%, ${eraThemeColor} 0%, transparent 100%)`
                        }}
                      />

                      {/* -------------------------------------------------------------
                          1. 理论全景横幅 (Theory Panoramic Header Bar - Top Layout)
                          ------------------------------------------------------------- */}
                      <div className="w-full shrink-0 pb-3 border-b border-white/[0.12] relative z-10 flex flex-col gap-2.5 select-none text-left">
                        {/* Line 1: Badge + Name + Subtitle + Masters Count */}
                        <div className="flex items-center justify-between flex-wrap gap-2.5">
                          <div className="flex items-center gap-3">
                            <span
                              className="px-2.5 py-1 rounded-md text-black font-black text-xs tracking-[0.14em] uppercase shadow-md shrink-0"
                              style={{ backgroundColor: eraThemeColor }}
                            >
                              {theory.badge}
                            </span>
                            <div className="flex items-baseline gap-2.5">
                              <h3 className="text-xl sm:text-2xl xl:text-[26px] font-black font-serif text-white tracking-tight leading-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
                                {language === 'zh' ? theory.name.zh : theory.name.en}
                              </h3>
                              <span className="text-xs sm:text-sm font-mono text-zinc-300 font-medium hidden sm:inline">
                                ({language === 'zh' ? theory.name.en : theory.name.zh})
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center text-xs font-mono">
                            <span className="text-zinc-200 font-semibold bg-white/[0.08] px-3.5 py-1 rounded-full border border-white/15 shadow-sm">
                              {philosophers.length} {language === 'zh' ? '位宗师' : 'Masters'}
                              {echoes.length > 0 && ` · ${echoes.length} ${language === 'zh' ? '件回响' : 'Echoes'}`}
                            </span>
                          </div>
                        </div>

                        {/* Line 2: Bold Typographic Proposition & Inquiry (Peak Conviction) */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 pt-1.5 text-left items-start">
                          {/* Core Proposition (THESIS) - Commanding Monumental Manifesto (7 cols) */}
                          <div className="md:col-span-7 flex flex-col gap-1.5 pl-3.5 border-l-2" style={{ borderColor: eraThemeColor }}>
                            <div className="flex items-center gap-2">
                              <span
                                className="text-[9.5px] font-mono font-black tracking-[0.18em] uppercase px-2 py-0.5 rounded-sm text-black shadow-sm"
                                style={{ backgroundColor: eraThemeColor }}
                              >
                                {language === 'zh' ? '核心命题' : 'THESIS'}
                              </span>
                            </div>
                            <p className="pavilion-thesis text-sm sm:text-[15.5px] xl:text-[17px] font-serif font-bold text-white leading-snug line-clamp-2 drop-shadow-[0_1px_4px_rgba(0,0,0,0.85)] italic">
                              “{language === 'zh' ? theory.coreThesis.zh : theory.coreThesis.en}”
                            </p>
                          </div>

                          {/* Historic Inquiry (INQUIRY) - Reflective & Inquisitive Second Voice (5 cols) */}
                          <div className="md:col-span-5 flex flex-col gap-1.5 pl-3 border-l border-white/15">
                            <div className="flex items-center gap-2">
                              <span className="text-[9.5px] font-mono font-bold tracking-[0.15em] uppercase px-2 py-0.5 rounded-sm bg-white/10 text-zinc-300 border border-white/15">
                                {language === 'zh' ? '时代叩问' : 'INQUIRY'}
                              </span>
                            </div>
                            <p className="text-xs sm:text-[13px] font-serif font-medium text-zinc-300 leading-relaxed line-clamp-2">
                              {language === 'zh' ? theory.historicalQuestion.zh : theory.historicalQuestion.en}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* -------------------------------------------------------------
                          2. 学派代表宗师与艺术回响陈列席 (Masters & Art Echoes Display Track)
                          ------------------------------------------------------------- */}
                      <div className="flex-1 min-h-0 flex flex-row items-center gap-5 sm:gap-7 relative z-10 py-1.5">
                        {/* Representative Masters Alcove */}
                        <div className="flex flex-row items-center gap-5 sm:gap-7 shrink-0 h-full">
                          {philosophers.map((phil, pIdx) => {
                            const isHeroPortrait = pIdx === 0 && tIdx === 0;
                            return (
                              <CorridorPhilosopherCard
                                key={phil.id}
                                phil={phil}
                                eraThemeColor={eraThemeColor}
                                language={language}
                                isHero={isHeroPortrait}
                                onClick={() => {
                                  if (hasMovedBeyondThresholdRef.current) return;
                                  setSelectedPhilosopher(phil);
                                }}
                              />
                            );
                          })}
                        </div>

                        {/* Art Echo Niche */}
                        {echoes.length > 0 && (
                          <>
                            <div className="w-[1.5px] h-3/4 bg-white/20 mx-1 shrink-0 relative flex items-center justify-center">
                              <span
                                className="px-2 py-0.5 rounded text-[9.5px] font-mono font-bold uppercase tracking-widest text-zinc-200 bg-black/90 border border-white/15 rotate-90 whitespace-nowrap"
                              >
                                {language === 'zh' ? '艺术回响' : 'ECHO'}
                              </span>
                            </div>

                            <div className="flex flex-row items-center gap-5 sm:gap-7 shrink-0 h-full">
                              {echoes.map((echo) => (
                                <CorridorCulturalEchoCard
                                  key={echo.id}
                                  echo={echo}
                                  eraThemeColor={eraThemeColor}
                                  language={language}
                                  onClick={() => {
                                    if (hasMovedBeyondThresholdRef.current) return;
                                    openCulturalEchoById(echo.id);
                                  }}
                                />
                              ))}
                            </div>
                          </>
                        )}
                      </div>

                      {/* -------------------------------------------------------------
                          3. 学派核心辩难横幅 (Dialectical Clash Pedestal Ribbon)
                          ------------------------------------------------------------- */}
                      {theory.dialecticalClash && (
                        <div className="w-full shrink-0 pt-2 border-t border-white/10 flex items-center gap-3 text-left select-none relative z-10">
                          <span
                            className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded shrink-0"
                            style={{
                              backgroundColor: `${eraThemeColor}18`,
                              color: eraThemeColor
                            }}
                          >
                            {language === 'zh' ? '思想辩难' : 'DIALECTIC'}
                          </span>
                          <p className="text-xs sm:text-[13px] font-serif font-medium text-zinc-300 italic truncate flex-1">
                            {language === 'zh' ? theory.dialecticalClash.zh : theory.dialecticalClash.en}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* =========================================================
                    ZONE 3: 展厅时空过渡立柱 (Inter-Gallery Transit Column)
                    ========================================================= */}
                <div className="w-[80px] sm:w-[96px] shrink-0 h-full flex flex-col items-center justify-center select-none border-r border-dashed border-white/15">
                  <div className="flex flex-col items-center gap-3 font-mono text-[10px] font-bold tracking-widest text-zinc-400 uppercase rotate-90">
                    <span>{language === 'zh' ? '时空跃迁' : 'TRANSIT'}</span>
                    <span className="w-6 h-[1.5px] bg-zinc-600" />
                  </div>
                </div>
              </section>
            );
          })}
        </div>

      {/* -------------------------------------------------------------
          FLOATING KEYBOARD NAVIGATION HINT & SHORTCUT TRIGGER
          ------------------------------------------------------------- */}
      {/* Discreet shortcut trigger pill in bottom corner */}
      <div className="absolute bottom-4 right-6 z-30 pointer-events-auto">
        <button
          type="button"
          onClick={() => setShowKeyboardHint((prev) => !prev)}
          title={language === 'zh' ? '漫游按键指引 (快捷键: ?)' : 'Keyboard Navigation Guide (key: ?)'}
          className="px-3 py-1.5 rounded-full bg-stone-950/80 hover:bg-stone-900 border border-white/10 hover:border-amber-500/40 text-stone-300 hover:text-amber-200 text-xs font-mono backdrop-blur-md transition-all shadow-lg flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
        >
          <svg className="w-3.5 h-3.5 text-stone-300 group-hover:text-amber-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01M6 12h.01M10 12h.01M14 12h.01M18 12h.01M8 16h8" />
          </svg>
          <span className="text-[11px] font-sans font-medium hidden sm:inline">
            {language === 'zh' ? '漫游指引' : 'Shortcuts'}
          </span>
        </button>
      </div>

      {/* Floating Centered Keyboard Hint Pill (Auto-fades after 4s, or toggled) */}
      <div
        className={`absolute bottom-5 left-1/2 -translate-x-1/2 z-30 transition-all duration-500 select-none ${
          showKeyboardHint
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-3 pointer-events-none'
        }`}
      >
        <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-stone-950/90 backdrop-blur-md border border-amber-500/35 shadow-2xl text-xs font-sans text-stone-200">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shrink-0" />
          <span className="font-mono text-[11px] sm:text-xs">
            {language === 'zh'
              ? '长按 ← / → 连续漫游 · Shift 加速 · PageUp/Down 跨展区 · Tab / Enter 赏析宗师 · ? 指引'
              : 'Hold ← / → Continuous Stroll · Shift Fast · PgUp/Dn Page · Tab / Enter View Master · ? Help'}
          </span>
          <button
            type="button"
            onClick={() => setShowKeyboardHint(false)}
            className="text-stone-400 hover:text-stone-100 px-1 hover:bg-white/10 rounded transition-colors"
            aria-label={language === 'zh' ? '关闭提示' : 'Close hint'}
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};
