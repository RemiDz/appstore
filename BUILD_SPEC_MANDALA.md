# BUILD_SPEC_MANDALA.md — Sound Healer Hub: The Living Mandala

> **For Claude Code**: Read this entire document before writing a single line of code.
> Then read `../_shared/DESIGN_TOKENS.md` in full.
> This replaces the previous BUILD_SPEC.md entirely.
> Work autonomously. Do not ask for clarification unless you hit a genuine blocker.
> This is the most important app in the ecosystem — the mothership. Make it extraordinary.

---

## 0. Vision

A full-screen, immersive mandala experience. No scrolling. No nav menus. No predictable card lists.

The user arrives into darkness — a living cosmic void. Five elemental orbs breathe in a sacred pentagonal arrangement at the centre of the screen. Each orb is alive: fire flickers, water ripples, earth pulses, air shimmers, ether radiates slow violet light. The sacred geometry grid beneath them glows faintly, like a star map etched into the universe.

The user's cursor becomes part of the experience. As they move toward an element, it responds — swelling, brightening, reaching back with particles. The whole mandala subtly shifts and breathes in response to presence.

When an element is clicked, the universe contracts — everything else dims and recedes — and that element blooms open into a beautiful app reveal: name, description, features, and an "Enter" button, all animated as if emerging from within the element itself. Pressing Escape or clicking outside returns to the mandala.

This should feel like a ritual. Like lighting a candle before a session. Like the app itself is alive and breathing.

**No other sound healing platform has anything like this. Build it to be unforgettable.**

---

## 1. Technical Stack

- **Next.js 14** — App Router, TypeScript, `output: 'export'` (fully static)
- **Tailwind CSS** — for layout utilities and responsive helpers only
- **Canvas API** — for the star field, sacred geometry grid, particle systems
- **CSS + Framer Motion** — for elemental orb animations, cursor interactions, reveal transitions
- **No Three.js, No WebGL, No heavy dependencies** — everything achievable with Canvas 2D + CSS

### Install
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

---

## 2. Design System

Read `../_shared/DESIGN_TOKENS.md` and absorb it completely. Then apply:

### Core tokens (unchanged from ecosystem)
```css
--void-black:     #05050F
--deep-indigo:    #0A0A2E
--selenite-white: #F0EEF8
--moonsilver:     #C8C4DC
--lunar-gold:     #E8C97A
```

### Elemental colours (hub-specific)
```css
--earth-color:  #A0714F   /* amber-brown */
--water-color:  #3A9BC1   /* deep sky blue */
--fire-color:   #E8621A   /* burning orange-red */
--air-color:    #7ECBCE   /* soft teal-mint */
--ether-color:  #8B6FE8   /* deep violet */
```

### Fonts
- **Display**: Cormorant Garamond, weight 300 — app names, headings
- **Body**: Lato, weight 300/400 — descriptions
- **Mono**: JetBrains Mono, weight 400 — labels, feature pills, micro text

---

## 3. File Structure

```
src/
  app/
    layout.tsx
    page.tsx
    globals.css
  components/
    CosmicCanvas.tsx         ← star field + sacred geometry grid (canvas)
    MandalaRing.tsx          ← the outer sacred geometry ring (SVG)
    ElementOrb.tsx           ← individual elemental orb with particles
    ElementalMandala.tsx     ← orchestrates all 5 orbs in pentagonal layout
    ElementReveal.tsx        ← the app reveal overlay when orb is clicked
    CursorTrail.tsx          ← custom cursor with elemental particle trail
    EntrySequence.tsx        ← the cinematic opening animation
    HubLabel.tsx             ← minimal ecosystem name label
  lib/
    apps.ts                  ← app data
    elements.ts              ← element config
  hooks/
    useMouse.ts              ← global mouse position tracker
    useElementalSound.ts     ← optional: subtle audio feedback (Web Audio API)
```

---

## 4. App Data (`src/lib/apps.ts`)

```ts
export interface App {
  id: string
  name: string
  tagline: string
  description: string
  element: ElementName
  features: string[]
  pricing: 'free' | 'pro'
  price?: string
  url: string
}

export const apps: App[] = [
  {
    id: 'earth-pulse',
    name: 'Earth Pulse',
    tagline: 'Tune into the planet\'s heartbeat',
    description: 'Track how space weather, geomagnetic activity, and Schumann resonance affect your energy, sleep, and mood. Live NOAA data with real-time wellness guidance for sound healing practitioners.',
    element: 'Earth',
    features: ['Live NOAA Data', 'Schumann Resonance', 'Wellness Engine', 'Aurora Alerts'],
    pricing: 'free',
    url: 'https://shumann.app',
  },
  {
    id: 'nestorlab',
    name: 'NestorLab',
    tagline: 'Flow into frequency',
    description: 'Binaural beats, guided sound journeys, isochronal tones, and frequency synthesis. A complete sound healing companion that runs entirely in your browser — no install, no accounts.',
    element: 'Water',
    features: ['Binaural Beats', 'Guided Journeys', 'Frequency Wheel', 'Ambient Soundscapes'],
    pricing: 'free',
    url: 'https://nestorlab.app',
  },
  {
    id: 'overtone-singer',
    name: 'Overtone Singer',
    tagline: 'See your voice come alive',
    description: 'Real-time vocal frequency analyser for overtone singers and sound healing practitioners. Watch your harmonics illuminate as you sing, with professional recording and frequency isolation.',
    element: 'Fire',
    features: ['Live Spectrogram', 'Harmonic Overlay', 'Video Recording', 'Frequency Isolation'],
    pricing: 'pro',
    price: '$6.99',
    url: 'https://overtonesinger.com',
  },
  {
    id: 'harmonic-intake',
    name: 'Harmonic Intake',
    tagline: 'Your voice holds the map',
    description: 'Discover your unique vocal frequency profile in 15 seconds. Real-time analysis of 10 voice biomarkers with personalised chakra scoring and sound healing guidance.',
    element: 'Air',
    features: ['10 Voice Biomarkers', 'Chakra Scoring', 'Healing Tones', 'Shareable Reports'],
    pricing: 'free',
    url: 'https://sonarus.app',
  },
  {
    id: 'lunar-practitioner',
    name: 'Lunar Practitioner',
    tagline: 'Let the moon guide your practice',
    description: 'Moon intelligence for sound healing sessions and ceremony planning. Live lunar data, phase-specific session guidance, and astrological context for practitioners who work with cosmic rhythms.',
    element: 'Ether',
    features: ['Live Lunar Calendar', 'Phase Guidance', 'Ceremony Planning', 'Astrological Context'],
    pricing: 'free',
    url: 'https://lunata.app',
  },
]
```

---

## 5. Element Config (`src/lib/elements.ts`)

```ts
export type ElementName = 'Earth' | 'Water' | 'Fire' | 'Air' | 'Ether'

export interface ElementConfig {
  name: ElementName
  symbol: string
  color: string
  glowColor: string          // rgba prefix — append opacity e.g. `${glowColor} 0.4)`
  darkColor: string          // darker shade for depth
  description: string
  orbBehaviour: OrbBehaviour
  particleStyle: ParticleStyle
  angle: number              // position in pentagon, degrees (top = 270°, going clockwise)
}

export interface OrbBehaviour {
  pulseSpeed: number         // seconds per pulse cycle
  pulseScale: number         // max scale during pulse (e.g. 1.08)
  wobble: boolean            // subtle position wobble
  wobbleAmount: number       // pixels
  wobbleSpeed: number        // seconds
}

export interface ParticleStyle {
  count: number              // particles emitted continuously
  size: [number, number]     // [min, max] radius
  speed: [number, number]    // [min, max] drift speed
  life: [number, number]     // [min, max] particle lifetime (seconds)
  shape: 'dot' | 'spark' | 'ring' | 'dust'
}

export const elements: Record<ElementName, ElementConfig> = {
  Earth: {
    name: 'Earth',
    symbol: '◉',
    color: '#A0714F',
    glowColor: 'rgba(160, 113, 79,',
    darkColor: '#5C3D24',
    description: 'Grounding · Resonance · Body',
    orbBehaviour: {
      pulseSpeed: 4.0,       // slow, steady heartbeat
      pulseScale: 1.06,
      wobble: true,
      wobbleAmount: 3,
      wobbleSpeed: 7,
    },
    particleStyle: {
      count: 12,
      size: [1, 2.5],
      speed: [0.2, 0.6],
      life: [2, 5],
      shape: 'dust',         // slow drifting motes, like soil particles
    },
  },
  Water: {
    name: 'Water',
    symbol: '◈',
    color: '#3A9BC1',
    glowColor: 'rgba(58, 155, 193,',
    darkColor: '#1A5A78',
    description: 'Flow · Depth · Journey',
    orbBehaviour: {
      pulseSpeed: 3.0,       // flowing, wave-like
      pulseScale: 1.10,
      wobble: true,
      wobbleAmount: 5,
      wobbleSpeed: 4,
    },
    particleStyle: {
      count: 20,
      size: [0.5, 2],
      speed: [0.4, 1.0],
      life: [1.5, 4],
      shape: 'ring',         // small circles, like bubbles or droplets
    },
  },
  Fire: {
    name: 'Fire',
    symbol: '◆',
    color: '#E8621A',
    glowColor: 'rgba(232, 98, 26,',
    darkColor: '#8B2E05',
    description: 'Transformation · Voice · Power',
    orbBehaviour: {
      pulseSpeed: 1.8,       // fast, erratic, like flame
      pulseScale: 1.12,
      wobble: true,
      wobbleAmount: 4,
      wobbleSpeed: 2,
    },
    particleStyle: {
      count: 30,
      size: [0.5, 3],
      speed: [1.0, 3.0],
      life: [0.5, 2],
      shape: 'spark',        // fast rising sparks
    },
  },
  Air: {
    name: 'Air',
    symbol: '◇',
    color: '#7ECBCE',
    glowColor: 'rgba(126, 203, 206,',
    darkColor: '#3A8A8E',
    description: 'Breath · Clarity · Frequency',
    orbBehaviour: {
      pulseSpeed: 5.0,       // very slow, like breath
      pulseScale: 1.15,      // expands most — like an inhale
      wobble: true,
      wobbleAmount: 8,       // drifts most — light, airy
      wobbleSpeed: 6,
    },
    particleStyle: {
      count: 25,
      size: [0.3, 1.5],
      speed: [0.8, 2.0],
      life: [2, 6],
      shape: 'dust',         // ultra light, barely visible wisps
    },
  },
  Ether: {
    name: 'Ether',
    symbol: '✦',
    color: '#8B6FE8',
    glowColor: 'rgba(139, 111, 232,',
    darkColor: '#4A2FA0',
    description: 'Cosmos · Moon · Beyond',
    orbBehaviour: {
      pulseSpeed: 6.0,       // slowest — cosmic, eternal
      pulseScale: 1.08,
      wobble: false,         // perfectly still — transcendent
      wobbleAmount: 0,
      wobbleSpeed: 0,
    },
    particleStyle: {
      count: 35,
      size: [0.3, 2],
      speed: [0.1, 0.5],
      life: [3, 8],
      shape: 'ring',         // slow, large rings — like cosmic waves
    },
  },
}

// Pentagon positions: top orb = Ether (270°), then clockwise
// Angles in degrees from centre, top = 0
export const pentagonAngles: Record<ElementName, number> = {
  Ether: 270,    // top centre
  Fire:  342,    // upper right
  Earth: 54,     // lower right
  Water: 126,    // lower left
  Air:   198,    // upper left
}
```

---

## 6. Global CSS (`src/app/globals.css`)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --void-black:     #05050F;
  --deep-indigo:    #0A0A2E;
  --selenite-white: #F0EEF8;
  --moonsilver:     #C8C4DC;
  --lunar-gold:     #E8C97A;
  --ease-spring:    cubic-bezier(0.16, 1, 0.3, 1);
  --ease-lunar:     cubic-bezier(0.25, 0.1, 0.25, 1.0);
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html, body {
  width: 100%; height: 100%;
  overflow: hidden;             /* NO SCROLL — full screen experience */
  background: var(--void-black);
  color: var(--selenite-white);
  font-family: 'Lato', sans-serif;
  -webkit-font-smoothing: antialiased;
  cursor: none;                 /* hide default cursor — replaced by CursorTrail */
}

/* Re-enable scroll on mobile since full-screen is harder there */
@media (max-width: 768px) {
  html, body { overflow: auto; cursor: auto; }
}

/* Scrollbar (fallback for mobile) */
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: #05050F; }
::-webkit-scrollbar-thumb { background: #0A0A2E; border-radius: 2px; }

/* Font families */
.font-display { font-family: 'Cormorant Garamond', Georgia, serif; }
.font-mono    { font-family: 'JetBrains Mono', monospace; }

/* ── Keyframes ── */

@keyframes breathe {
  0%, 100% { transform: scale(1);    opacity: 0.85; }
  50%       { transform: scale(1.06); opacity: 1; }
}

@keyframes orbFloat {
  0%, 100% { transform: translate(0, 0); }
  25%       { transform: translate(3px, -5px); }
  75%       { transform: translate(-3px, 3px); }
}

@keyframes ringRotate {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

@keyframes ringRotateReverse {
  from { transform: rotate(360deg); }
  to   { transform: rotate(0deg); }
}

@keyframes entryFadeIn {
  from { opacity: 0; transform: scale(0.94); }
  to   { opacity: 1; transform: scale(1); }
}

@keyframes revealBloom {
  from { opacity: 0; transform: translate(-50%, -50%) scale(0.85); }
  to   { opacity: 1; transform: translate(-50%, -50%) scale(1); }
}

@keyframes particleRise {
  0%   { opacity: 0; transform: translateY(0) scale(0); }
  15%  { opacity: 1; transform: translateY(-8px) scale(1); }
  100% { opacity: 0; transform: translateY(-60px) scale(0.3); }
}

@keyframes glowPulse {
  0%, 100% { box-shadow: 0 0 20px var(--glow-color, rgba(139,111,232,0.3)); }
  50%       { box-shadow: 0 0 60px var(--glow-color, rgba(139,111,232,0.5)), 0 0 120px var(--glow-color, rgba(139,111,232,0.2)); }
}

@keyframes shimmerLine {
  0%   { background-position: -200% 0; }
  100% { background-position:  200% 0; }
}

@keyframes cursorTrail {
  0%   { opacity: 0.8; transform: scale(1); }
  100% { opacity: 0; transform: scale(0); }
}

@property --border-angle {
  syntax: '<angle>';
  inherits: false;
  initial-value: 0deg;
}

@keyframes borderRotate {
  to { --border-angle: 360deg; }
}
```

---

## 7. Component Specifications

### 7.1 `CosmicCanvas.tsx` — Background Layer

A fixed full-screen canvas (`z-index: 0, pointer-events: none`) that renders:

**Layer 1 — Star field:**
- 300 stars, random positions, random sizes 0.2–1.6px, random opacity 0.05–0.6
- Each star twinkles independently: `opacity = baseOpacity + sin(time * twinkleSpeed + offset) * 0.2`
- 5–8 slightly larger stars (2–3px) with a soft glow effect (draw multiple circles at decreasing opacity)

**Layer 2 — Sacred geometry grid:**
- A Flower of Life pattern (or simpler: concentric rings with radiating lines from centre)
- Draw it very faintly: `rgba(200, 196, 220, 0.025)` stroke, `lineWidth: 0.5`
- Centred on canvas, radius proportional to `Math.min(width, height) * 0.42`
- Draw: 1 large circle, 6 surrounding circles of same radius touching centre circle, then the outer ring of 12 circles (Flower of Life). Also draw the circumscribed hexagon connecting the 6 outer centres.
- This should be barely visible — felt rather than seen

**Layer 3 — Ambient nebula:**
- 3 large radial gradients, very low opacity (0.04–0.08), positioned off-centre
- Colours: deep indigo `#0A0A2E`, faint violet `rgba(80,50,160,0.05)`, near-black teal `rgba(20,50,80,0.04)`
- These drift extremely slowly (full traversal over 120 seconds) using `sin/cos` oscillation

**Render loop:**
```ts
function draw(time: number) {
  ctx.clearRect(0, 0, W, H)
  drawNebula(time)
  drawGeometryGrid()   // static — draw once, cache to offscreen canvas
  drawStars(time)
  requestAnimationFrame(draw)
}
```

Cache the geometry grid to an offscreen canvas — draw it once and `ctx.drawImage` each frame.

---

### 7.2 `MandalaRing.tsx` — Outer Decorative Ring

An SVG component rendered around the entire orb arrangement. This gives the sacred geometry frame to the whole mandala.

**Structure:**
- Outer circle: `stroke: rgba(200,196,220, 0.06)`, `strokeWidth: 1`, `fill: none`
- Middle circle: `stroke: rgba(200,196,220, 0.04)`, slightly smaller
- 12 equally-spaced radial tick marks at the outer edge (like a clock): `stroke: rgba(200,196,220, 0.08)`, short (5px)
- 5 lines connecting the pentagon points (pentagram): `stroke: rgba(200,196,220, 0.05)`, `strokeDasharray: "2 8"`
- The outer ring slowly rotates: `animation: ringRotate 120s linear infinite`
- The inner ring slowly counter-rotates: `animation: ringRotateReverse 80s linear infinite`

**Sizing:** `width: min(90vw, 90vh)`, `height: min(90vw, 90vh)`, centred absolutely

---

### 7.3 `ElementOrb.tsx` — Individual Elemental Orb

This is the heart of the experience. Each orb is a living, breathing entity.

**Props:**
```ts
interface ElementOrbProps {
  element: ElementConfig
  position: { x: number; y: number }  // pixels from mandala centre
  isActive: boolean                    // currently selected
  isIdle: boolean                      // another orb is active (dim this one)
  mouseDistance: number                // pixels from cursor to orb centre
  onClick: () => void
}
```

**Visual layers (inside a positioned div, absolute):**

**Layer 1 — Deep glow (largest, most diffuse):**
```css
width: 160px; height: 160px;
border-radius: 50%;
background: radial-gradient(circle, rgba(element.color, 0.15) 0%, transparent 70%);
filter: blur(20px);
animation: glowPulse [element.pulseSpeed]s ease-in-out infinite;
```
Scale this based on `mouseDistance`: closer cursor = larger, brighter glow. Interpolate from 1.0 (far) to 1.6 (touching).

**Layer 2 — Orb body:**
```css
width: 80px; height: 80px;
border-radius: 50%;
background: radial-gradient(circle at 35% 35%,
  rgba(element.color, 0.9) 0%,
  rgba(element.darkColor, 0.7) 40%,
  rgba(element.darkColor, 0.3) 70%,
  transparent 100%
);
box-shadow:
  0 0 20px rgba(element.color, 0.5),
  0 0 60px rgba(element.color, 0.2),
  inset 0 0 20px rgba(255,255,255,0.05);
animation: breathe [element.pulseSpeed]s ease-in-out infinite;
           orbFloat [element.wobbleSpeed]s ease-in-out infinite; /* if wobble */
transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
            opacity 0.6s ease,
            box-shadow 0.4s ease;
cursor: none;
```

On hover (mouseDistance < 80px): scale to 1.15, increase glow intensity
On click active: scale to 0.9 briefly (press feel), then scale to 1.0

**Layer 3 — Inner shimmer ring:**
```css
width: 90px; height: 90px;
border-radius: 50%;
border: 1px solid rgba(element.color, 0.3);
box-shadow: 0 0 8px rgba(element.color, 0.2);
/* Counter-rotates slowly */
animation: ringRotateReverse [element.pulseSpeed * 8]s linear infinite;
```

**Layer 4 — Element symbol:**
```css
position: absolute; /* centred on orb */
font-family: JetBrains Mono;
font-size: 18px;
color: rgba(255,255,255,0.9);
text-shadow: 0 0 12px rgba(element.color, 0.8);
pointer-events: none;
```

**Layer 5 — Element label (below orb):**
```css
margin-top: 16px;
font-family: JetBrains Mono;
font-size: 9px;
text-transform: uppercase;
letter-spacing: 0.25em;
color: rgba(element.color, 0.8);
```
Only visible when mouse is near OR always visible — your call.

**Particle system (Canvas overlay or CSS):**
Implement as a small canvas (200×200px) positioned behind the orb, or use CSS `@keyframes` with multiple `::after` pseudo-elements for the simpler approach.

CSS particle approach (simpler, effective):
```css
/* Create 8–12 particle divs as children, each with:*/
.particle {
  position: absolute;
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  background: rgba(element.color, 0.7);
  top: 50%; left: 50%;
  animation: particleRise var(--life) ease-out var(--delay) infinite;
  transform-origin: center;
}
```
Each particle div has random `--size`, `--life`, `--delay`, and slight random `translateX` offset built in via inline style. On hover, particle emission rate increases (add class that increases animation speed and opacity).

**Idle state (another orb active):**
- `opacity: 0.25`
- `filter: blur(1px)`
- `transform: scale(0.9)`
- Transition all: `0.8s ease`

---

### 7.4 `ElementalMandala.tsx` — Orchestrator

Manages all five orbs, mouse position tracking, and which element (if any) is active.

```tsx
'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ElementalMandala() {
  const [activeElement, setActiveElement] = useState<ElementName | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [centrePos, setCentrePos] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  // Track mouse
  useEffect(() => {
    const handler = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [])

  // Calculate mandala centre
  useEffect(() => {
    const update = () => {
      const { innerWidth: W, innerHeight: H } = window
      setCentrePos({ x: W / 2, y: H / 2 })
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  // Pentagon radius: adapts to viewport
  const radius = Math.min(window.innerWidth, window.innerHeight) * 0.28

  // Calculate each orb's absolute position
  const orbPositions = Object.entries(pentagonAngles).map(([name, angleDeg]) => {
    const rad = (angleDeg * Math.PI) / 180
    return {
      element: name as ElementName,
      x: centrePos.x + radius * Math.cos(rad),
      y: centrePos.y + radius * Math.sin(rad),
    }
  })

  return (
    <div ref={containerRef} className="fixed inset-0" style={{ zIndex: 2 }}>
      <MandalaRing />
      
      {orbPositions.map(({ element, x, y }) => {
        const dx = mousePos.x - x
        const dy = mousePos.y - y
        const dist = Math.sqrt(dx * dx + dy * dy)
        
        return (
          <div key={element} style={{
            position: 'absolute',
            left: x, top: y,
            transform: 'translate(-50%, -50%)',
          }}>
            <ElementOrb
              element={elements[element]}
              position={{ x, y }}
              isActive={activeElement === element}
              isIdle={activeElement !== null && activeElement !== element}
              mouseDistance={dist}
              onClick={() => setActiveElement(
                activeElement === element ? null : element
              )}
            />
          </div>
        )
      })}

      {/* Element reveal overlay */}
      <AnimatePresence>
        {activeElement && (
          <ElementReveal
            key={activeElement}
            app={apps.find(a => a.element === activeElement)!}
            element={elements[activeElement]}
            onClose={() => setActiveElement(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
```

---

### 7.5 `ElementReveal.tsx` — App Reveal Overlay

When an orb is clicked, this component animates in from the centre of the screen — a beautiful, ritual-feeling reveal.

**Entry animation:**
1. The background dims to `rgba(5,5,15, 0.85)` — `backdrop-filter: blur(12px)` (0.4s)
2. The reveal panel blooms from centre: scale 0.85→1.0, opacity 0→1, 0.5s spring easing

**Layout (centred absolutely, `position: fixed, top: 50%, left: 50%, transform: translate(-50%, -50%)`):**

```
┌──────────────────────────────────────────┐
│                                          │
│   [element symbol — large, glowing]      │
│                                          │
│   App Name          ← Cormorant 42px     │
│   Tagline           ← Lato 14px silver   │
│                                          │
│   ───────────────────────────            │
│                                          │
│   Description                            │
│                                          │
│   [feature] [feature] [feature]          │
│                                          │
│   [pricing]           [Enter →]          │
│                                          │
│                         [✕ close]        │
└──────────────────────────────────────────┘
```

**Panel styling:**
```css
width: min(520px, 90vw);
background: linear-gradient(135deg,
  rgba(240,238,248, 0.03) 0%,
  rgba(200,196,220, 0.06) 50%,
  rgba(240,238,248, 0.02) 100%
);
backdrop-filter: blur(24px) saturate(1.3);
border: 1px solid rgba(element.color, 0.2);
border-radius: 24px;
box-shadow:
  0 0 0 1px rgba(element.color, 0.05) inset,
  0 0 80px rgba(element.color, 0.12),
  0 32px 80px rgba(0,0,0, 0.7);
padding: 40px;
```

**Element symbol (top centre):**
```css
font-family: JetBrains Mono;
font-size: 48px;
color: element.color;
text-shadow: 0 0 30px rgba(element.color, 0.8), 0 0 60px rgba(element.color, 0.4);
animation: breathe 4s ease-in-out infinite;
```

**Accent top line:**
```css
height: 1px;
background: linear-gradient(90deg,
  transparent,
  rgba(element.color, 0.6) 30%,
  rgba(element.color, 0.6) 70%,
  transparent
);
margin-bottom: 24px;
```

**App name:**
```css
font-family: Cormorant Garamond;
font-size: 42px;
font-weight: 300;
letter-spacing: 0.04em;
color: var(--selenite-white);
```

**Divider line:**
```css
height: 1px;
background: linear-gradient(90deg,
  transparent,
  rgba(200,196,220, 0.12),
  transparent
);
margin: 20px 0;
```

**Feature pills:**
```css
font-family: JetBrains Mono;
font-size: 9px;
text-transform: uppercase;
letter-spacing: 0.15em;
background: rgba(element.color, 0.08);
border: 1px solid rgba(element.color, 0.15);
color: rgba(element.color, 0.9);
border-radius: 4px;
padding: 4px 10px;
```

**"Enter" button (primary CTA):**
```css
background: linear-gradient(135deg,
  rgba(element.color, 0.2),
  rgba(element.color, 0.08)
);
border: 1px solid rgba(element.color, 0.35);
color: element.color;
border-radius: 12px;
padding: 12px 28px;
font-family: JetBrains Mono;
font-size: 13px;
letter-spacing: 0.1em;
transition: all 0.3s ease;
/* hover: scale 1.03, box-shadow 0 0 20px rgba(element.color, 0.3) */
```
Opens `app.url` in `target="_blank"`.

**Close button (top right or bottom):**
JetBrains Mono, `✕`, 11px, `rgba(200,196,220, 0.35)`, hover `rgba(200,196,220, 0.8)`. Also close on Escape keypress and on backdrop click.

**Framer Motion variants:**
```ts
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
  exit:   { opacity: 0, transition: { duration: 0.3 } },
}

const panelVariants = {
  hidden:  { opacity: 0, scale: 0.85, y: 20 },
  visible: { opacity: 1, scale: 1,    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
  },
  exit:    { opacity: 0, scale: 0.92, y: 10,
    transition: { duration: 0.3, ease: 'easeIn' }
  },
}
```

---

### 7.6 `CursorTrail.tsx` — Custom Cursor

Replace the default cursor with a custom experience.

```tsx
'use client'
import { useEffect, useState } from 'react'

export default function CursorTrail() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([])

  useEffect(() => {
    let id = 0
    const handler = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY })
      setTrail(prev => [
        { x: e.clientX, y: e.clientY, id: id++ },
        ...prev.slice(0, 6),
      ])
    }
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [])

  return (
    <>
      {/* Primary cursor dot */}
      <div style={{
        position: 'fixed',
        left: pos.x, top: pos.y,
        width: 8, height: 8,
        borderRadius: '50%',
        background: 'rgba(200,196,220,0.9)',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 9999,
        boxShadow: '0 0 8px rgba(200,196,220,0.5)',
        transition: 'none',
      }} />

      {/* Trail particles — each fades and shrinks */}
      {trail.map((point, i) => (
        <div key={point.id} style={{
          position: 'fixed',
          left: point.x, top: point.y,
          width: 4 - i * 0.4,
          height: 4 - i * 0.4,
          borderRadius: '50%',
          background: `rgba(200,196,220, ${0.4 - i * 0.05})`,
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 9998,
          transition: 'opacity 0.1s ease',
        }} />
      ))}
    </>
  )
}
```

---

### 7.7 `EntrySequence.tsx` — Cinematic Opening

The first thing the user sees. Controls the initial reveal sequence.

**Sequence:**
1. **0.0s** — Black void, completely empty
2. **0.5s** — Sacred geometry grid fades in at 15% opacity (the canvas starts)
3. **1.2s** — Hub label appears: `HARMONIC WAVES` — JetBrains Mono, 10px, uppercase, letter-spacing 0.4em, `rgba(200,196,220, 0.3)`, centred at top
4. **1.8s** — The five orbs bloom into existence one by one, staggered 0.15s each, using a `scale(0) → scale(1)` + `opacity 0 → 1` spring animation
5. **2.8s** — The mandala ring fades in
6. **3.2s** — A faint instruction text appears at the bottom: `"Choose your element"` — Cormorant Garamond italic, 14px, `rgba(200,196,220, 0.25)`, fades out after 4 seconds

Implement using `useEffect` with timed `setState` calls controlling opacity/visibility of each layer. Use Framer Motion `AnimatePresence` for the instruction text.

This plays **once per visit** — use `sessionStorage` to skip if already played this session.

---

### 7.8 `HubLabel.tsx` — Minimal Ecosystem Label

Positioned at the top centre of the screen (above the mandala), always visible.

```
HARMONIC WAVES
Tools for Sound Healers
```

- `HARMONIC WAVES`: JetBrains Mono, 10px, uppercase, letter-spacing 0.35em, `rgba(200,196,220, 0.3)`
- `Tools for Sound Healers`: Cormorant Garamond italic, 14px, weight 300, `rgba(200,196,220, 0.2)`
- Position: `top: 32px`, centred, `z-index: 3`
- On mobile: reduce font sizes, position `top: 20px`

---

## 8. Page Composition (`src/app/page.tsx`)

```tsx
'use client'
import CosmicCanvas from '@/components/CosmicCanvas'
import ElementalMandala from '@/components/ElementalMandala'
import CursorTrail from '@/components/CursorTrail'
import EntrySequence from '@/components/EntrySequence'
import HubLabel from '@/components/HubLabel'

export default function Home() {
  return (
    <main className="fixed inset-0 overflow-hidden" style={{ background: '#05050F' }}>
      {/* z-index 0: star field + sacred geometry */}
      <CosmicCanvas />

      {/* z-index 1: atmospheric nebula overlays (CSS only) */}
      <div className="fixed inset-0 pointer-events-none" style={{
        background: `
          radial-gradient(ellipse 80% 60% at 50% 50%, rgba(15,12,45,0.5), transparent),
          radial-gradient(ellipse 40% 40% at 20% 30%, rgba(20,15,55,0.2), transparent),
          radial-gradient(ellipse 35% 45% at 80% 70%, rgba(15,18,50,0.15), transparent)
        `,
        zIndex: 1,
      }} />

      {/* z-index 2: mandala + orbs */}
      <ElementalMandala />

      {/* z-index 3: UI labels */}
      <HubLabel />

      {/* z-index 10: entry sequence overlay */}
      <EntrySequence />

      {/* z-index 9999: custom cursor */}
      <CursorTrail />
    </main>
  )
}
```

---

## 9. Layout (`src/app/layout.tsx`)

```tsx
import type { Metadata } from 'next'
import { Cormorant_Garamond, Lato, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
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
  openGraph: {
    title: 'Harmonic Waves',
    description: 'Five elemental tools for sound healers.',
    type: 'website',
  },
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

## 10. Mobile Adaptation

The full mandala experience works best on desktop. On mobile:

- Restore `overflow: auto; cursor: auto` on body
- Disable `CursorTrail` on touch devices (`'ontouchstart' in window`)
- Switch layout: instead of fixed full-screen mandala, render a scrollable page
- Stack the five element orbs vertically (centred, full-width sections)
- Each orb expands inline when tapped (no overlay — the reveal appears below the orb)
- Keep all visual styling, animations, and atmosphere — just linearise the layout
- Detect mobile with: `const isMobile = typeof window !== 'undefined' && window.innerWidth < 768`

---

## 11. Performance & Quality Checklist

Before finishing, verify:

- [ ] Entry sequence plays smoothly — no jank on first load
- [ ] All five orbs breathe independently with correct element personality
- [ ] Cursor trail is smooth at 60fps
- [ ] ElementReveal opens and closes with spring animation, Escape key works
- [ ] Sacred geometry grid visible but subtle (barely there — felt not seen)
- [ ] No TypeScript errors (`tsc --noEmit`)
- [ ] `next build` completes without errors
- [ ] Static export works (`output: 'export'` in next.config.ts)
- [ ] Mobile fallback renders correctly
- [ ] No console errors in production build
- [ ] All external links: `target="_blank" rel="noopener noreferrer"`
- [ ] OG metadata is set (for sharing)

---

## 12. Vercel Deployment

```bash
git add .
git commit -m "feat: living mandala hub"
git push origin main
```

Vercel auto-deploys on push (already connected). Done.

---

## 13. Final Instruction to Claude Code

You have everything you need. Build in this order:

1. Read `../_shared/DESIGN_TOKENS.md` fully
2. Set up Next.js project, `globals.css`, fonts, `tailwind.config.ts`
3. Create `lib/apps.ts` and `lib/elements.ts`
4. Build `CosmicCanvas.tsx` (stars + sacred geometry + nebula)
5. Build `MandalaRing.tsx` (SVG rotating rings)
6. Build `ElementOrb.tsx` (the living orb with all layers + particles)
7. Build `ElementalMandala.tsx` (pentagon layout + mouse tracking)
8. Build `ElementReveal.tsx` (app overlay with bloom animation)
9. Build `CursorTrail.tsx` (custom cursor)
10. Build `EntrySequence.tsx` (cinematic opening)
11. Build `HubLabel.tsx` (ecosystem label)
12. Compose `page.tsx` and `layout.tsx`
13. Run `next build` — fix all errors
14. Push to git → Vercel auto-deploys

**The goal is to create something that makes a sound healing practitioner stop and breathe when they first see it. Not a website. A portal. Make every detail count — the easing curves, the particle timing, the glow intensities, the moment each orb comes alive during the entry sequence. This is the mothership of the ecosystem. It must be extraordinary.**
