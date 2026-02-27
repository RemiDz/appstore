# HARMONIC WAVES HUB — FULL REBUILD

> **Prompt for Claude Code** — Run from the `store.app` project root.
> This is a complete visual rebuild. Replace the current page with the design below. Keep the Next.js project structure, routing, and deployment config intact.

---

## Overview

Rebuild the hub page as a vibrant, cinematic, aurora-themed single-screen app store. The current dark/muted design is being replaced with something alive — colour, depth, movement, energy. Think premium wellness brand meets cosmic portal.

**Critical constraint: everything must fit on a single mobile screen (375×812) with NO scrolling.**

---

## Tech Stack

- Next.js (App Router, TypeScript, Tailwind)
- `output: 'export'` for static Vercel deploy
- Google Font: **Outfit** (weights 200, 300, 400, 500, 600)
- Canvas API for animated background — no animation libraries
- All UI animations via CSS only

```css
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@200;300;400;500;600&display=swap');
```

---

## App Data

Create `src/lib/apps.ts`:

```ts
export interface App {
  id: string;
  name: string;
  tagline: string;
  description: string;
  url: string;
  accent: string;
  accentRgb: string;
  glow1: string;
  glow2: string;
  flagship?: boolean;
  isPro?: boolean;
  price?: string;
}

export const apps: App[] = [
  {
    id: 'nestorium',
    name: 'Nestorium',
    tagline: 'Frequency Synthesis Platform',
    description: 'Binaural beats, guided sound journeys, isochronal tones, and frequency synthesis. Your complete sound healing companion.',
    url: 'https://nestorlab.app',
    accent: '#A78BFA',
    accentRgb: '167,139,250',
    glow1: '#7C3AED',
    glow2: '#C4B5FD',
    flagship: true,
  },
  {
    id: 'binara',
    name: 'Binara',
    tagline: 'Tune Your Brainwaves',
    description: 'Pure binaural beats and brainwave entrainment. Choose your target state and let precise stereo frequencies guide your brain into resonance.',
    url: 'https://binara.app',
    accent: '#22D3EE',
    accentRgb: '34,211,238',
    glow1: '#06B6D4',
    glow2: '#67E8F9',
  },
  {
    id: 'overtone-singer',
    name: 'Overtone Singer',
    tagline: 'Real-Time Overtone Visualiser',
    description: 'Watch your harmonics illuminate as you sing. Professional recording with frequency isolation for overtone practitioners.',
    url: 'https://overtonesinger.com',
    accent: '#FB923C',
    accentRgb: '251,146,60',
    glow1: '#EA580C',
    glow2: '#FDBA74',
    isPro: true,
    price: '$6.99',
  },
  {
    id: 'sonarus',
    name: 'Sonarus',
    tagline: 'Vocal Biomarker Analysis',
    description: 'Discover your unique vocal frequency profile in 15 seconds. 10 voice biomarkers with personalised chakra scoring.',
    url: 'https://sonarus.app',
    accent: '#2DD4BF',
    accentRgb: '45,212,191',
    glow1: '#0D9488',
    glow2: '#5EEAD4',
  },
  {
    id: 'lunar',
    name: 'Lunar Practitioner',
    tagline: 'Moon-Guided Session Planner',
    description: 'Moon intelligence for sound healing sessions and ceremony planning. Live lunar data with phase-specific guidance.',
    url: 'https://lunata.app',
    accent: '#C084FC',
    accentRgb: '192,132,252',
    glow1: '#9333EA',
    glow2: '#D8B4FE',
  },
  {
    id: 'tidara',
    name: 'Tidara',
    tagline: 'Live Tidal Intelligence',
    description: 'Real-time tidal data with wellness insights. Align your practice with the rhythms of the ocean.',
    url: 'https://tidara.app',
    accent: '#38BDF8',
    accentRgb: '56,189,248',
    glow1: '#0284C7',
    glow2: '#7DD3FC',
  },
  {
    id: 'earth-pulse',
    name: 'Earth Pulse',
    tagline: 'Live Schumann Resonance',
    description: 'Track how space weather affects your energy, sleep, and mood. Live NOAA data with real-time wellness guidance.',
    url: 'https://shumann.app',
    accent: '#FBBF24',
    accentRgb: '251,191,36',
    glow1: '#D97706',
    glow2: '#FDE68A',
  },
];
```

---

## Component Architecture

### 1. `AuroraCanvas.tsx` — Animated Background

Full-viewport `<canvas>` with:

**Base:** `#080414` (very deep purple-black, NOT pure black)

**Aurora blobs (6):** Large radial gradients that slowly drift across the screen. Each has:
- Unique purple/teal/blue colour
- Slow sinusoidal position drift (0.0004–0.0009 speed)
- Opacity pulses between 0.06 and 0.14
- Radius: 30–50% of screen size
- Blur via radial gradient falloff (not CSS filter)

Blob definitions:
```ts
const blobs = [
  { x: 0.2, y: 0.15, r: 0.45, c1: [100,40,180], c2: [60,20,120], sp: 0.0008, ph: 0 },
  { x: 0.8, y: 0.3, r: 0.35, c1: [20,120,180], c2: [10,80,140], sp: 0.0006, ph: 1.5 },
  { x: 0.5, y: 0.65, r: 0.5, c1: [80,30,140], c2: [40,15,80], sp: 0.0005, ph: 3 },
  { x: 0.15, y: 0.75, r: 0.3, c1: [20,100,140], c2: [10,60,100], sp: 0.0007, ph: 4.5 },
  { x: 0.75, y: 0.8, r: 0.35, c1: [140,60,100], c2: [80,30,60], sp: 0.0009, ph: 2 },
  { x: 0.5, y: 0.2, r: 0.28, c1: [30,80,120], c2: [15,50,80], sp: 0.0004, ph: 5.5 },
];
```

**Stars (100):** Scattered white dots, 0.3–1.8px radius, twinkling opacity (sinusoidal, 0.2–0.6 range, varied speeds).

The canvas must:
- Use `devicePixelRatio` for crisp rendering on Retina
- Resize on window resize
- Run at 60fps via `requestAnimationFrame`
- Clean up on unmount

### 2. `AppIcon.tsx` — SVG Icons

Create an icon component that renders a unique SVG per app ID. Each icon uses the app's accent colour as stroke colour.

**CRITICAL — Binara icon design:**
The Binara icon is a VERTICAL ZIGZAG BRAINWAVE PULSE — like an EKG/brainwave reading:
- A single vertical path: straight down, sharp angle left, sharp angle right, straight down
- Path: `M24 4 L24 14 L18 20 L30 28 L24 34 L24 44`
- A pulsing circle at the centre intersection (animated r: 2.5→4→2.5, opacity: 0.7→0.3→0.7, dur 2s)
- Expanding emanation ring (animated r: 6→12→6, opacity: 0.2→0→0.2, dur 3s)
- Endpoint dots at top and bottom
- **It must NOT look like glasses, circles, loops, or infinity symbols**
- It must read as "brainwave" / "frequency pulse" at 40px

Other icons (preserve existing designs where they work):
- **Nestorium:** Ψ (psi) character — two vertical lines with connecting curve, decorative top arcs
- **Overtone Singer:** Tuning fork with sound emission arcs
- **Sonarus:** Central circle with bilateral sound wave arcs
- **Lunar Practitioner:** Crescent moon with crater dots
- **Tidara:** Double wave lines
- **Earth Pulse:** Globe with meridian lines and centre dot

All icons: 48×48 viewBox, 2–2.4px stroke width, round caps, no fill, accent colour.

### 3. `FlagshipCard.tsx` — Nestorium Featured Card

Full-width card at top of app area:
- Frosted glass: `background: rgba(255,255,255,0.04)`, `backdrop-filter: blur(20px)`
- **Animated gradient border:** `linear-gradient(135deg, accent1, accent2, accent1)` with `background-size: 200% 200%` shifting via CSS animation (4s cycle). Applied using the mask border technique (see CSS below).
- Contains: icon with pulsing glow + name + tagline
- Hover: inner radial glow appears
- Active/press: `scale(0.97)`
- Tapping opens the detail overlay

### 4. `AppCard.tsx` — Grid Cards

6 cards in a 3×2 grid:
- Each card: frosted glass, rounded 20px
- **Hover effects (all three happen together):**
  1. Animated gradient border appears (same mask technique, using app's glow1/glow2)
  2. Inner ambient light blooms from top (blurred radial gradient, app colour, 12% opacity)
  3. Coloured box-shadow appears: `0 8px 32px rgba(accentRgb, 0.15)`
  4. Card lifts: `scale(1.06) translateY(-3px)`
  5. Name text shifts to accent colour
- Active/press: `scale(0.92)`
- Contains: icon with pulsing glow + name + optional "Pro" badge
- Tapping opens the detail overlay

**CSS for animated gradient border (mask technique):**
```css
.card::before {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: 21px;
  background: linear-gradient(135deg, var(--glow1)44, var(--glow2)22, var(--glow1)44);
  background-size: 200% 200%;
  animation: borderShift 4s ease-in-out infinite;
  opacity: 0;
  transition: opacity 0.35s;
  z-index: -1;
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: xor;
  -webkit-mask-composite: xor;
  padding: 1px;
}
.card:hover::before { opacity: 1; }

@keyframes borderShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
```

### 5. `AppOverlay.tsx` — Detail Sheet

Bottom sheet that slides up when an app is tapped:
- Backdrop: `rgba(8,4,20,0.8)` with `backdrop-filter: blur(30px)`
- Sheet: rounded top corners (28px), frosted glass `rgba(20,16,40,0.92)`
- Drag handle bar at top
- Close button (✕) top-right
- Content: icon with glow + name + Pro badge (if applicable) + description text
- Full-width CTA button: gradient background using app's glow1→accent, with coloured box-shadow
- Animations: backdrop fades in 0.3s, sheet slides up 0.5s with spring curve

### 6. `EntrySequence` — Page Load Animation

Choreographed via React state phases + CSS transitions:

| Time | Phase | What happens |
|------|-------|-------------|
| 0.1s | 1 | Header fades in + slides down, title has gradient shimmer |
| 0.7s | 2 | Flagship card springs in (scale 0.88→1.0 with overshoot curve) |
| 0.7s+ | 2 | Grid cards cascade in, staggered 80ms apart (scale 0.7→1.0 with overshoot) |
| 1.8s | 3 | Footer fades in |

All card entrance animations use `cubic-bezier(0.34, 1.56, 0.64, 1)` — the spring/overshoot curve.

---

## Page Layout (`src/app/page.tsx`)

```
┌──────────────────────────┐
│ [safe-area-top + 3.5vh]  │
│   HARMONIC WAVES         │  ← gradient text, 300 weight, 0.38em tracking
│   Tools for Sound Healers│  ← gold gradient italic
│   ────── ◇ ──────        │  ← divider with hollow diamond
│                          │  ← ~2.5vh gap
│ ┌──────────────────────┐ │
│ │ (Ψ)  Nestorium       │ │  ← flagship card, full width
│ │      Freq Synthesis   │ │
│ └──────────────────────┘ │
│                          │  ← ~2.5vh gap
│ ┌──────┐┌──────┐┌──────┐│
│ │Binara││Ovrtne││Sonars││  ← 3-column grid
│ └──────┘└──────┘└──────┘│
│ ┌──────┐┌──────┐┌──────┐│
│ │Lunar ││Tidara││Earth ││
│ └──────┘└──────┘└──────┘│
│                          │  ← flex spacer
│  Created by Remi...      │  ← footer
│  SOUND HEALER & DEV      │
│ [safe-area-bottom + 2vh] │
└──────────────────────────┘
```

The page uses `height: 100vh; height: 100dvh; overflow: hidden;` and `display: flex; flex-direction: column; justify-content: space-between;` to fill the screen without scrolling.

---

## Title Text Treatment

The "HARMONIC WAVES" title has a gradient fill:
```css
background: linear-gradient(135deg, #e0d4ff, #fff, #c4e0ff);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
```

The "Tools for Sound Healers" subtitle:
```css
background: linear-gradient(90deg, #c9a96e, #e8d5a8);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
```

---

## Colour Reference

```
Background base:    #080414 (deep purple-black)
Title gradient:     #e0d4ff → #fff → #c4e0ff
Subtitle gradient:  #c9a96e → #e8d5a8 (warm gold)
Card glass:         rgba(255,255,255,0.03–0.06)
Card border:        rgba(255,255,255,0.06)

Nestorium:    accent #A78BFA  glow #7C3AED/#C4B5FD
Binara:       accent #22D3EE  glow #06B6D4/#67E8F9
Overtone:     accent #FB923C  glow #EA580C/#FDBA74
Sonarus:      accent #2DD4BF  glow #0D9488/#5EEAD4
Lunar:        accent #C084FC  glow #9333EA/#D8B4FE
Tidara:       accent #38BDF8  glow #0284C7/#7DD3FC
Earth Pulse:  accent #FBBF24  glow #D97706/#FDE68A
```

---

## Performance

- Canvas: `requestAnimationFrame`, `devicePixelRatio` scaling, cleanup on unmount
- All CSS animations use `transform` and `opacity` only
- `backdrop-filter` only on cards that use it (7 cards + overlay)
- `will-change: transform` on animated elements
- Total page weight should be minimal — no images, no heavy libraries
- Test on iPhone Safari — no scroll bounce, no jank, no overflow

---

## Testing Checklist

- [ ] Page fits in single viewport on 375×812, 390×844, 393×852 (all modern iPhones)
- [ ] Aurora background is visibly colourful and animated (NOT invisible/subtle)
- [ ] Stars twinkle at visible brightness
- [ ] Entry sequence plays smoothly on load
- [ ] All 7 apps render — flagship + 6 in grid
- [ ] Binara icon reads as brainwave pulse, NOT as glasses/circles
- [ ] Tapping any card opens the overlay sheet
- [ ] Overlay "Open App →" button links to correct URL in new tab
- [ ] Card hover effects work on desktop (glow border, ambient light, shadow, lift)
- [ ] Card press states work on mobile (scale down)
- [ ] Pro badge shows on Overtone Singer
- [ ] Title has gradient shimmer text
- [ ] `next build` passes with zero errors
- [ ] Lighthouse performance > 85

---

## What NOT to Include

- ❌ No element labels (Earth/Water/Fire/Air/Ether)
- ❌ No "Open →" text in the grid
- ❌ No taglines in the grid cards (only in overlay)
- ❌ No scrolling
- ❌ No Framer Motion or GSAP
- ❌ No Inter/Roboto/system fonts
- ❌ No subtle-to-invisible effects — everything should be VISIBLE

---

## Quality Bar

This page should make a sound healer stop scrolling on TikTok and ask "what is that?" The aurora background should feel like being inside the northern lights. The card hover effects should feel luxurious. The entry sequence should feel like a portal opening. Screen-record it on a phone — every frame should look like a wallpaper.
