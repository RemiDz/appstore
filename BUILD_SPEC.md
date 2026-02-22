# BUILD_SPEC.md — Sound Healer Hub (`store.app`)

> **For Claude Code**: Read this document fully before writing a single line of code.
> Then read `../_shared/DESIGN_TOKENS.md` in full.
> Only then begin implementation.
> Work autonomously. Do not ask for clarification unless you hit a genuine blocker.

---

## 0. Mission

Build a world-class sound healing app hub — the gravitational centre of an elemental app ecosystem. This is not a clone of any existing app in the ecosystem. It is the mothership: the place that makes each app feel part of something larger and more sacred.

A practitioner arriving here from `lunata.app` or `sonarus.app` should feel an immediate sense of homecoming — same visual DNA, same quality of silence, same attention to detail — but a different experience. Where `lunata.app` is intimate and lunar, this hub is **vast and elemental**. Where `sonarus.app` is focused and clinical, this hub is **expansive and welcoming**. It should feel like standing at the centre of a cosmos with five glowing doors around you.

The quality bar is exceptional. Every detail matters. Padding, easing curves, letter-spacing, opacity values, border radii — nothing is an afterthought.

---

## 1. Project Setup

### Stack
- **Next.js 14** — App Router, TypeScript, `output: 'export'` (fully static)
- **Tailwind CSS** — with custom tokens extending the design system
- **Framer Motion** — for scroll reveals, card entrances, hero animations
- **No backend. No database. No auth. No unnecessary dependencies.**

### Initialise (if starting fresh)
```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
npm install framer-motion
```

### `next.config.ts`
```ts
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
}
export default nextConfig
```

### Fonts — load via `next/font/google` in `layout.tsx`
```ts
import { Cormorant_Garamond, Lato } from 'next/font/google'
import localFont from 'next/font/local'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-display',
})

const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-body',
})
```

For JetBrains Mono use the Google Fonts import:
```ts
import { JetBrains_Mono } from 'next/font/google'
const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
})
```

---

## 2. Design Philosophy

### Read `../_shared/DESIGN_TOKENS.md` and deeply understand:
- The void/selenite/gold colour system
- Glass card construction (fill, blur, border, shadow, pseudo-element decorations)
- The animation philosophy — slow, ambient, breathing
- Typography hierarchy — Cormorant for display, Lato for body, JetBrains Mono for labels/data
- Easing curves — especially `cubic-bezier(0.16, 1, 0.3, 1)` as the spring easing

### What to adapt (not copy) for the hub:

The hub is **the same universe, a different planet**. Use the token system as your foundation, then make original decisions for:

- **Layout**: The hub should use a full-page vertical scroll with dramatic section transitions. Each element section has its own atmospheric micro-environment — a subtle shift in ambient glow, a unique geometric motif.
- **Hero**: More dramatic than any single app. Think vast, cosmic, awe-inspiring. The five elements should be hinted at visually before the user scrolls.
- **Cards**: Use the glass card DNA from `DESIGN_TOKENS.md` but give each card a unique elemental glow colour (not just gold). Earth cards breathe amber warmth. Water cards shimmer cool blue. Fire cards pulse orange. Air cards feel light and airy teal. Ether cards glow deep violet.
- **Typography scale**: The hero heading can go larger — this is a landing experience, not an app UI.
- **Backgrounds**: Each elemental section should have a distinct radial gradient atmosphere layered over the base void black. Not jarring — subtle shifts, like different rooms in the same cathedral.

---

## 3. Colour System

### Base tokens (from DESIGN_TOKENS.md — do not change these)
```css
--void-black:     #05050F
--deep-indigo:    #0A0A2E
--selenite-white: #F0EEF8
--moonsilver:     #C8C4DC
--lunar-gold:     #E8C97A
```

### Elemental accent colours (hub-specific additions)
```css
--earth-accent:   #A0714F   /* warm amber-brown */
--water-accent:   #3A9BC1   /* deep sky blue */
--fire-accent:    #E8621A   /* burning orange */
--air-accent:     #7ECBCE   /* soft teal-mint */
--ether-accent:   #8B6FE8   /* deep violet */
```

These elemental colours are used **exclusively** for:
- Section atmospheric glow (radial gradient, very subtle, 8–12% opacity)
- Card border accent (1px, 15–20% opacity)
- Card inner glow on hover (box-shadow, 20–30% opacity)
- Element badge/pill background
- Section label text
- "Open App" button border tint

They do **not** replace the gold accent for interactive UI elements (those remain Lunar Gold `#E8C97A`).

---

## 4. File Structure

```
src/
  app/
    layout.tsx          ← fonts, metadata, global CSS vars
    page.tsx            ← main page composition
    globals.css         ← CSS variables, keyframes, base styles
  components/
    CosmicCanvas.tsx    ← animated particle/star field background
    Hero.tsx            ← full-viewport hero section
    ElementSection.tsx  ← section wrapper with elemental atmosphere
    AppCard.tsx         ← individual app card
    ElementDivider.tsx  ← decorative section divider with element symbol
    NavHeader.tsx       ← sticky minimal header
    Footer.tsx          ← footer
  lib/
    apps.ts             ← app data
    elements.ts         ← element definitions and config
  hooks/
    useScrollReveal.ts  ← intersection observer for reveal animations
```

---

## 5. App Data (`src/lib/apps.ts`)

```ts
export type Pricing = 'free' | 'pro'

export interface App {
  id: string
  name: string
  tagline: string
  description: string
  element: 'Earth' | 'Water' | 'Fire' | 'Air' | 'Ether'
  features: string[]
  pricing: Pricing
  price?: string
  url: string
  accentColor: string
}

export const apps: App[] = [
  {
    id: 'earth-pulse',
    name: 'Earth Pulse',
    tagline: 'Tune into the planet\'s heartbeat',
    description: 'Track how space weather, geomagnetic activity, and Schumann resonance affect your energy, sleep, and mood. Live NOAA data with real-time wellness guidance and sound healer session recommendations.',
    element: 'Earth',
    features: ['Live NOAA Data', 'Schumann Resonance', 'Wellness Engine', 'Sound Healer Mode', 'Aurora Alerts'],
    pricing: 'free',
    url: 'https://shumann.app',
    accentColor: '#A0714F',
  },
  {
    id: 'nestorlab',
    name: 'NestorLab',
    tagline: 'Flow into frequency',
    description: 'Browser-based sound healing toolkit featuring binaural beats, isochronal tones, guided sound journeys, and frequency synthesis. A complete sound healing companion that runs entirely in your browser.',
    element: 'Water',
    features: ['Binaural Beat Generator', 'Guided Sound Journeys', 'Frequency Wheel', 'Ambient Soundscapes'],
    pricing: 'free',
    url: 'https://nestorlab.app',
    accentColor: '#3A9BC1',
  },
  {
    id: 'overtone-singer',
    name: 'Overtone Singer',
    tagline: 'See your voice come alive',
    description: 'Real-time vocal frequency analyser designed for overtone singers and sound healing practitioners. Watch your harmonics illuminate as you sing, with professional recording and frequency isolation tools.',
    element: 'Fire',
    features: ['Real-time Spectrogram', 'Harmonic Overtone Overlay', 'Video & Audio Recording', 'Frequency Band Isolation'],
    pricing: 'pro',
    price: '$6.99',
    url: 'https://overtonesinger.com',
    accentColor: '#E8621A',
  },
  {
    id: 'harmonic-intake',
    name: 'Harmonic Intake',
    tagline: 'Your voice holds the map',
    description: 'Discover your unique vocal frequency profile in 15 seconds. Real-time analysis of 10 voice biomarkers with personalised chakra scoring and sound healing guidance. Hum, and the app reveals what your voice says about your energy.',
    element: 'Air',
    features: ['10 Voice Biomarkers', 'Chakra Scoring', 'Playable Healing Tones', 'Shareable Reports'],
    pricing: 'free',
    url: 'https://sonarus.app',
    accentColor: '#7ECBCE',
  },
  {
    id: 'lunar-practitioner',
    name: 'Lunar Practitioner',
    tagline: 'Let the moon guide your practice',
    description: 'Moon intelligence for sound healing sessions and ceremony planning. Real-time lunar data, phase-specific session guidance, and astrological context for practitioners who work with cosmic rhythms.',
    element: 'Ether',
    features: ['Live Lunar Calendar', 'Phase Session Guidance', 'Astrological Context', 'Ceremony Planning'],
    pricing: 'free',
    url: 'https://lunata.app',
    accentColor: '#8B6FE8',
  },
]
```

---

## 6. Element Definitions (`src/lib/elements.ts`)

```ts
export interface ElementConfig {
  name: string
  symbol: string           // unicode or SVG symbol character
  color: string
  glowColor: string        // same color, used in rgba contexts
  atmosphere: string       // CSS radial-gradient string for section bg
  description: string      // short poetic descriptor shown in section header
}

export const elements: Record<string, ElementConfig> = {
  Earth: {
    name: 'Earth',
    symbol: '◉',
    color: '#A0714F',
    glowColor: 'rgba(160, 113, 79,',
    atmosphere: 'radial-gradient(ellipse 70% 50% at 20% 50%, rgba(160,113,79,0.06), transparent)',
    description: 'Grounding · Resonance · Body',
  },
  Water: {
    name: 'Water',
    symbol: '◈',
    color: '#3A9BC1',
    glowColor: 'rgba(58, 155, 193,',
    atmosphere: 'radial-gradient(ellipse 70% 50% at 80% 50%, rgba(58,155,193,0.06), transparent)',
    description: 'Flow · Depth · Journey',
  },
  Fire: {
    name: 'Fire',
    symbol: '◆',
    color: '#E8621A',
    glowColor: 'rgba(232, 98, 26,',
    atmosphere: 'radial-gradient(ellipse 60% 60% at 50% 30%, rgba(232,98,26,0.07), transparent)',
    description: 'Transformation · Voice · Power',
  },
  Air: {
    name: 'Air',
    symbol: '◇',
    color: '#7ECBCE',
    glowColor: 'rgba(126, 203, 206,',
    atmosphere: 'radial-gradient(ellipse 80% 40% at 50% 70%, rgba(126,203,206,0.05), transparent)',
    description: 'Breath · Clarity · Frequency',
  },
  Ether: {
    name: 'Ether',
    symbol: '✦',
    color: '#8B6FE8',
    glowColor: 'rgba(139, 111, 232,',
    atmosphere: 'radial-gradient(ellipse 90% 60% at 50% 50%, rgba(139,111,232,0.08), transparent)',
    description: 'Cosmos · Moon · Beyond',
  },
}
```

---

## 7. Global CSS (`src/app/globals.css`)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* ── CSS Custom Properties ─────────────────────────── */
:root {
  --void-black:     #05050F;
  --deep-indigo:    #0A0A2E;
  --selenite-white: #F0EEF8;
  --moonsilver:     #C8C4DC;
  --lunar-gold:     #E8C97A;

  --font-display: 'Cormorant Garamond', Georgia, serif;
  --font-body:    'Lato', 'Helvetica Neue', sans-serif;
  --font-mono:    'JetBrains Mono', monospace;

  --ease-spring:  cubic-bezier(0.16, 1, 0.3, 1);
  --ease-lunar:   cubic-bezier(0.25, 0.1, 0.25, 1.0);
  --ease-glow:    cubic-bezier(0.4, 0.0, 0.2, 1.0);
}

/* ── Base Reset ─────────────────────────────────────── */
*, *::before, *::after { box-sizing: border-box; }

html { scroll-behavior: smooth; }

body {
  background: var(--void-black);
  color: var(--selenite-white);
  font-family: var(--font-body);
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
}

/* ── Scrollbar ──────────────────────────────────────── */
::-webkit-scrollbar       { width: 6px; }
::-webkit-scrollbar-track  { background: #05050F; }
::-webkit-scrollbar-thumb  { background: #0A0A2E; border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: #C8C4DC; }

/* ── Keyframe Animations ────────────────────────────── */
@keyframes cardReveal {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes shimmer {
  0%   { background-position: -200% 0; }
  100% { background-position:  200% 0; }
}

@keyframes breathe {
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50%       { opacity: 0.7; transform: scale(1.04); }
}

@keyframes dustDrift {
  0%   { transform: translate(0, 0) rotate(0deg); }
  33%  { transform: translate(12px, -20px) rotate(120deg); }
  66%  { transform: translate(-8px, -35px) rotate(240deg); }
  100% { transform: translate(0, -50px) rotate(360deg); opacity: 0; }
}

@keyframes scrollIndicator {
  0%, 100% { transform: translateY(0); opacity: 0.5; }
  50%       { transform: translateY(8px); opacity: 1; }
}

@property --border-angle {
  syntax: '<angle>';
  inherits: false;
  initial-value: 0deg;
}

@keyframes borderRotate {
  to { --border-angle: 360deg; }
}

/* ── Glass Card ─────────────────────────────────────── */
.glass-card {
  background: linear-gradient(
    135deg,
    rgba(240,238,248, 0.015) 0%,
    rgba(200,196,220, 0.035) 50%,
    rgba(240,238,248, 0.010) 100%
  );
  backdrop-filter: blur(16px) saturate(1.15);
  border: 1px solid rgba(200,196,220, 0.07);
  border-radius: 16px;
  box-shadow:
    0 0 0 1px rgba(200,196,220, 0.03) inset,
    0 8px 32px rgba(0,0,0, 0.35),
    0 2px 8px rgba(0,0,0, 0.25);
  overflow: hidden;
  position: relative;
  transition:
    background 1.2s ease-out,
    backdrop-filter 1.2s ease-out,
    border-color 0.8s ease-out,
    box-shadow 0.6s ease-out,
    transform 0.4s var(--ease-spring);
}

.glass-card::before {
  content: '';
  position: absolute;
  top: 0; left: 10%; right: 10%;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(240,238,248,0.15), transparent);
  pointer-events: none;
}

.glass-card::after {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: 17px;
  background: conic-gradient(
    from var(--border-angle, 0deg),
    transparent 60%,
    rgba(200,196,220, 0.08) 80%,
    rgba(232,201,122, 0.06) 90%,
    transparent 100%
  );
  animation: borderRotate 10s linear infinite;
  pointer-events: none;
  z-index: 0;
}

.glass-card:hover {
  transform: translateY(-4px);
}

/* ── Cosmic Atmosphere ──────────────────────────────── */
.cosmic-atmosphere {
  background:
    radial-gradient(ellipse 80% 40% at 50% 15%, rgba(15,12,45,0.6), transparent),
    radial-gradient(ellipse 40% 50% at 15% 60%, rgba(20,15,55,0.25), transparent),
    radial-gradient(ellipse 35% 45% at 85% 45%, rgba(15,18,50,0.2), transparent),
    radial-gradient(ellipse 60% 30% at 50% 85%, rgba(12,10,35,0.3), transparent),
    var(--void-black);
}

/* ── Utility Classes ─────────────────────────────────── */
.font-display { font-family: var(--font-display); }
.font-body    { font-family: var(--font-body); }
.font-mono    { font-family: var(--font-mono); }

.text-selenite { color: var(--selenite-white); }
.text-moonsilver { color: var(--moonsilver); }
.text-gold     { color: var(--lunar-gold); }

.scroll-reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.9s ease-out, transform 0.9s ease-out;
}
.scroll-reveal.revealed {
  opacity: 1;
  transform: translateY(0);
}
```

---

## 8. Tailwind Config (`tailwind.config.ts`)

```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'void':      '#05050F',
        'indigo':    '#0A0A2E',
        'selenite':  '#F0EEF8',
        'moonsilver':'#C8C4DC',
        'gold':      '#E8C97A',
        'earth':     '#A0714F',
        'water':     '#3A9BC1',
        'fire':      '#E8621A',
        'air':       '#7ECBCE',
        'ether':     '#8B6FE8',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body:    ['var(--font-body)', 'Helvetica Neue', 'sans-serif'],
        mono:    ['var(--font-mono)', 'monospace'],
      },
      animation: {
        'breathe':        'breathe 6s ease-in-out infinite',
        'dust':           'dustDrift 60s linear infinite',
        'scroll-down':    'scrollIndicator 2s ease-in-out infinite',
        'border-rotate':  'borderRotate 10s linear infinite',
        'shimmer':        'shimmer 2s ease-in-out infinite',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'lunar':  'cubic-bezier(0.25, 0.1, 0.25, 1.0)',
      },
    },
  },
  plugins: [],
}
export default config
```

---

## 9. Component Specifications

### 9.1 `CosmicCanvas.tsx`
A full-page fixed canvas that renders a star field. This sits behind everything at z-index 0.

**Implementation:**
- Use a `<canvas>` element, fixed, full viewport, `z-index: 0`, `pointer-events: none`
- Render ~200 stars on mount: random positions, random sizes (0.3–1.8px radius), random opacity (0.1–0.7)
- Slowly twinkle: each star has an independent `twinkleSpeed` and `twinkleOffset` that modifies its opacity over time using `Math.sin`
- Add 3–5 slowly drifting dust particles (larger, ~3px, very low opacity ~0.08) that move in gentle arcs
- Use `requestAnimationFrame` loop
- Handle window resize by recalculating canvas dimensions and re-seeding stars

```tsx
'use client'
import { useEffect, useRef } from 'react'

export default function CosmicCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  // ... full implementation with stars, twinkle, dust
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  )
}
```

### 9.2 `NavHeader.tsx`
Minimal sticky header. Appears only after user scrolls past the hero (use IntersectionObserver or scroll listener).

**Structure:**
```
[ecosystem name/logo — left]          [subtle nav links — right: Earth Water Fire Air Ether]
```

**Style:**
- Background: `linear-gradient(180deg, rgba(6,6,26,0.92), rgba(6,6,26,0.6))`
- Backdrop blur: `blur(16px) saturate(1.15)`
- Border bottom: `1px solid rgba(200,196,220, 0.06)`
- Height: 56px
- Logo text: Cormorant Garamond, weight 300, ~18px, letter-spacing 0.1em
- Nav links: JetBrains Mono, 10px, uppercase, letter-spacing 0.2em, `rgba(200,196,220, 0.5)`, hover `rgba(200,196,220, 0.9)` — each link is an anchor to its section (#earth, #water etc.)
- Entrance: fade in over 0.6s when triggered
- On mobile (< md): hide nav links, keep logo only

### 9.3 `Hero.tsx`
Full viewport height hero. This is the most important section — make it extraordinary.

**Layout (vertically centred):**
```
                [MONO LABEL — small, tracking wide]
            "Sound Healer Hub"  ← display heading, very large
       "Five elemental tools for the modern practitioner"
                    [five element symbols in a row]
                      [scroll indicator arrow]
```

**Details:**
- Background: the `cosmic-atmosphere` class + an additional unique glow — a very subtle radial bloom in violet-indigo at centre (`rgba(100, 80, 200, 0.06)`)
- Mono label above heading: `HARMONIC WAVES ECOSYSTEM` — JetBrains Mono, 10px, uppercase, letter-spacing 0.25em, `rgba(200,196,220, 0.4)`
- Main heading: Cormorant Garamond, weight 300, `clamp(3rem, 8vw, 7rem)`, letter-spacing 0.04em, selenite white. Add a very subtle text-shadow glow: `0 0 80px rgba(200,196,220,0.08)`
- Subtitle: Lato weight 300, 18px, `rgba(200,196,220, 0.55)`, letter-spacing 0.06em, max-width 480px, centred
- Five element symbols row: display each element's symbol character in its accent colour, 24px, JetBrains Mono, spaced with generous gap (~32px). Each symbol has a subtle `breathe` animation with staggered delays (0s, 0.4s, 0.8s, 1.2s, 1.6s). On hover: scale 1.3, glow in element colour.
- Scroll indicator: a thin downward chevron or `↓` character in gold, gently animating `scrollIndicator` keyframe
- Entrance animations: stagger each element — mono label 0s, heading 0.2s, subtitle 0.5s, symbols 0.8s, scroll 1.2s — all using `fadeInUp` keyframe, `0.8s ease-out`

### 9.4 `ElementDivider.tsx`

A full-width decorative section transition element that appears above each app section.

**Props:** `element: ElementConfig`

**Structure:**
```
─────────────────── ◉ EARTH ───────────────────
            Grounding · Resonance · Body
```

- Horizontal rule: `1px` gradient line, `rgba(element.color, 0.2)` at centre fading to transparent
- Element symbol + name: centred, JetBrains Mono, 11px, uppercase, letter-spacing 0.25em, in element accent colour
- Description: Cormorant Garamond, weight 300, 16px, italic, `rgba(200,196,220, 0.4)`, centred, below the rule

### 9.5 `ElementSection.tsx`

Wrapper for each elemental group of apps.

**Props:** `element: ElementConfig, apps: App[]`

**Structure:**
```html
<section id={element.name.toLowerCase()} style={{ position: 'relative', paddingY: '80px' }}>
  <!-- Atmospheric background layer (position absolute, pointer-events none) -->
  <div style={{ background: element.atmosphere, ... }} />
  
  <ElementDivider element={element} />
  
  <!-- App cards grid -->
  <div class="card grid ...">
    {apps.map(app => <AppCard key={app.id} app={app} />)}
  </div>
</section>
```

- Atmospheric div: `position: absolute, inset: 0, opacity: 1, pointerEvents: none, zIndex: 1` — the element atmosphere gradient provides the subtle ambient shift
- Cards container: `max-width: 900px, margin: 0 auto, padding: 0 24px`
- Grid: single column on mobile, up to 2 columns on md+ if there were multiple apps per element (currently 1 each — but build the grid so it handles future additions gracefully)
- Card entrance: trigger `cardReveal` animation when section enters viewport via IntersectionObserver

### 9.6 `AppCard.tsx`

The primary card component. This is what practitioners interact with most — make it feel precious.

**Props:** `app: App`

**Visual structure (inside the glass-card):**
```
┌─────────────────────────────────────────┐
│  [element badge pill]        [pricing badge] │
│                                         │
│  App Name          ← display font, 26px  │
│  Tagline           ← body, 14px, silver  │
│                                         │
│  Description paragraph (2–3 lines)      │
│                                         │
│  [feature] [feature] [feature]          │
│                                         │
│                    [Open App →] button  │
└─────────────────────────────────────────┘
```

**Card implementation details:**

- **Element accent glow on hover**: on card hover, `box-shadow` gains an additional outer glow in the element's accent colour: `0 0 40px rgba(element.color, 0.15)`
- **Element colour accent line**: a 1px line at the very top of the card in the element's accent colour (100% opacity but very thin — feels like a laser edge). Use a pseudo-element or a `<div>` with `height: 1px, background: element.accentColor, opacity: 0.6`
- **Element badge**: pill in top-left — `background: rgba(element.color, 0.12), border: 1px solid rgba(element.color, 0.2), color: element.color` — JetBrains Mono, 9px, uppercase, letter-spacing 0.15em — text: element symbol + " " + element name (e.g. `◉ EARTH`)
- **Pricing badge**: top-right — if `free`: `rgba(200,196,220, 0.06)` bg, silver text, text: `FREE`. If `pro`: gold styling (`rgba(232,201,122, 0.12)` bg, `rgba(232,201,122, 0.25)` border, `#E8C97A` text), text: `PRO · $6.99`
- **App name**: Cormorant Garamond, weight 300, 28px, selenite white, letter-spacing 0.02em
- **Tagline**: Lato, weight 300, 13px, `rgba(200,196,220, 0.55)`, letter-spacing 0.08em, italic
- **Description**: Lato, 14px, `rgba(200,196,220, 0.7)`, line-height 1.7, margin-top 16px
- **Feature pills**: JetBrains Mono, 9px, uppercase, letter-spacing 0.12em, `rgba(200,196,220, 0.5)` text, `rgba(200,196,220, 0.06)` bg, `rgba(200,196,220, 0.1)` border, border-radius 4px, padding 3px 8px
- **"Open App" button**: right-aligned or full-width at bottom. Styled as Gold Primary from design tokens — but with element colour tint on the border. On hover: scale(1.02), element colour glow `0 0 12px rgba(element.color, 0.25)`. Text: `Open App →` in JetBrains Mono.
- **Card padding**: 24px all sides (28px on md+)

### 9.7 `Footer.tsx`

Minimal, elegant. Not an afterthought.

**Structure:**
```
─────────────────── ✦ ───────────────────

        HARMONIC WAVES ECOSYSTEM
   Five elemental tools for sound healers

   [Earth Pulse] [NestorLab] [Overtone Singer] [Harmonic Intake] [Lunar Practitioner]

   Built by a sound healing practitioner and developer
   All tools run in your browser — no accounts, no tracking

                © 2026 Harmonic Waves

─────────────────── ✦ ───────────────────
```

- Divider lines: gradient fade, `rgba(200,196,220, 0.08)`, 1px
- Ecosystem title: JetBrains Mono, 10px, uppercase, letter-spacing 0.3em, `rgba(200,196,220, 0.3)`
- App links: inline, separated by `·`, JetBrains Mono, 10px, `rgba(200,196,220, 0.4)` hover `rgba(200,196,220, 0.8)`, transition 0.3s
- Body text: Lato, 13px, `rgba(200,196,220, 0.3)`, centred
- The ✦ symbol: gold, slightly larger, breathe animation

---

## 10. Page Composition (`src/app/page.tsx`)

```tsx
import CosmicCanvas from '@/components/CosmicCanvas'
import NavHeader from '@/components/NavHeader'
import Hero from '@/components/Hero'
import ElementSection from '@/components/ElementSection'
import Footer from '@/components/Footer'
import { apps } from '@/lib/apps'
import { elements } from '@/lib/elements'

const elementOrder = ['Earth', 'Water', 'Fire', 'Air', 'Ether'] as const

export default function Home() {
  return (
    <main className="relative min-h-screen cosmic-atmosphere">
      <CosmicCanvas />
      <NavHeader />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Hero />
        {elementOrder.map(elementName => {
          const elementApps = apps.filter(a => a.element === elementName)
          return (
            <ElementSection
              key={elementName}
              element={elements[elementName]}
              apps={elementApps}
            />
          )
        })}
        <Footer />
      </div>
    </main>
  )
}
```

---

## 11. Layout (`src/app/layout.tsx`)

```tsx
import type { Metadata } from 'next'
import { Cormorant_Garamond, Lato, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
})

const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-body',
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Harmonic Waves — Tools for Sound Healers',
  description: 'Five elemental browser tools for sound healing practitioners. No accounts. No tracking. No cost.',
  keywords: 'sound healing, sound healer, binaural beats, frequency, overtone singing, lunar calendar, chakra',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${lato.variable} ${jetbrains.variable}`}>
      <body>{children}</body>
    </html>
  )
}
```

---

## 12. Scroll Reveal Hook (`src/hooks/useScrollReveal.ts`)

```ts
'use client'
import { useEffect, useRef } from 'react'

export function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('revealed')
          observer.unobserve(el)
        }
      },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return ref
}
```

Apply this to cards and section headers using the `scroll-reveal` CSS class — elements start invisible and slide up when they enter the viewport.

---

## 13. Responsive Behaviour

| Breakpoint | Behaviour |
|---|---|
| Mobile (< 640px) | Single column, reduced padding (px-4), hero heading ~48px, element symbols row wraps |
| Tablet (640–768px) | Single column, comfortable padding (px-6) |
| Desktop (768px+) | Cards grid up to 2 columns (when future apps added), max-width containers centred, nav links visible |

- Nav header shows links only on md+
- Hero subtitle hides on mobile (too much text)
- Card padding: 20px mobile, 28px desktop
- All animations remain on mobile (they're subtle enough)

---

## 14. Performance & Quality Checklist

Before finishing, verify:

- [ ] `next build` produces zero errors
- [ ] `next export` (or `output: 'export'`) generates static `out/` directory
- [ ] All fonts load via `next/font` (no FOUT)
- [ ] Canvas does not cause layout shift
- [ ] All external links open in `target="_blank" rel="noopener noreferrer"`
- [ ] No TypeScript errors (`tsc --noEmit`)
- [ ] Cards reveal smoothly on scroll in mobile Chrome and desktop Chrome/Safari
- [ ] Hover states work on all interactive elements
- [ ] No console errors in production build

---

## 15. Vercel Deployment

After the build passes locally:

```bash
# Ensure git is initialised
git init
git add .
git commit -m "feat: initial hub build"

# If connecting to existing GitHub repo
git remote add origin https://github.com/RemiDz/appstore.git
git branch -M main
git push -u origin main --force

# Deploy to Vercel
npx vercel

# Follow prompts:
# - Link to existing project? No (first time) → creates new project
# - Project name: harmonic-waves-hub (or leave default)
# - Root directory: ./
# - Build command: npm run build
# - Output directory: out
```

Vercel will auto-detect Next.js. Set output directory to `out` in Vercel dashboard if not auto-detected. Subsequent pushes to `main` will auto-deploy.

---

## 16. Final Instruction to Claude Code

You have everything you need. Build it in this order:

1. Read `../_shared/DESIGN_TOKENS.md` in full
2. Initialise the Next.js project (or clean the existing one)
3. Set up `globals.css`, `tailwind.config.ts`, and `layout.tsx` with fonts
4. Create `lib/apps.ts` and `lib/elements.ts` with the data above
5. Build `CosmicCanvas.tsx` (canvas star field)
6. Build `NavHeader.tsx`
7. Build `Hero.tsx`
8. Build `ElementDivider.tsx`
9. Build `AppCard.tsx`
10. Build `ElementSection.tsx`
11. Build `Footer.tsx`
12. Compose `page.tsx`
13. Run `next build` — fix any errors
14. Deploy to Vercel

**Make it extraordinary.** Every opacity value, every easing curve, every letter-spacing matters. This hub represents the entire ecosystem — it must be impeccable.

The practitioner who lands here should feel something. Not just see a list of apps, but feel they have found their home.
