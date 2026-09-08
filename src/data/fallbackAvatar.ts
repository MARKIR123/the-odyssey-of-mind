import React from 'react';

export const FALLBACK_STATUE_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="500" viewBox="0 0 400 500"><defs><linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%2318181b"/><stop offset="100%" stop-color="%2309090b"/></linearGradient></defs><rect width="400" height="500" fill="url(%23bg)"/><path d="M200 120 C165 120 145 150 145 190 C145 235 170 265 200 265 C230 265 255 235 255 190 C255 150 235 120 200 120 Z M120 380 C120 300 155 285 200 285 C245 285 280 300 280 380 Z" fill="%23d4d4d8" opacity="0.35"/><circle cx="200" cy="180" r="4" fill="%23f59e0b"/><text x="200" y="420" font-family="serif" font-size="16" font-weight="bold" fill="%23a1a1aa" text-anchor="middle" letter-spacing="3">HISTORIC ARCHIVE</text></svg>`;

/**
 * React image onError fallback handler to smoothly prevent broken image icons
 */
export function handleImageFallback(e: React.SyntheticEvent<HTMLImageElement>) {
  if (e.currentTarget.src !== FALLBACK_STATUE_SVG) {
    e.currentTarget.src = FALLBACK_STATUE_SVG;
  }
}
