# HARMONIC WAVES HUB — CINEMATIC REBUILD

> **Prompt for Claude Code** — Run from the `store.app` project root.
> This is a visual overhaul of the hub page. Read the entire codebase first. Keep all app data, URLs, and routing intact. Replace the layout and styling.

---

## Vision

This page needs to be a **TikTok scroll-stopper**. When someone screen-records this on their phone and posts it, people in the comments should be asking "what app is this?" before the video even finishes.

Think: Apple product page meets sacred geometry meets midnight planetarium. Every frame of a screen recording should look like a wallpaper.

**One rule above all: the entire app list must be visible on a single mobile screen (375×812) without scrolling.** This is non-negotiable. The previous version forced scrolling because of element labels, "Open →" text, and spacing bloat. Strip all of that. Density is your friend — but elegant density, not cramped.

---

## Tech Stack

- Next.js (App Router, TypeScript, Tailwind)
- `output: 'export'` for static Vercel deploy
- No external animation libraries — pure CSS animations + minimal vanilla JS
- Google Fonts: use **Cormorant Garamond** (elegant serif for the title) + **Plus Jakarta Sans** (clean sans for body)

---

## App Data

Hardcode in `src/lib/apps.ts`. **Do not change URLs or app names.**

```ts
export const apps = [
  {
    id: 'nestorium',
    name: 'Nestorium',
    tagline: 'Frequency Synthesis Platform',
    url: 'https://nestorlab.app',
    element: 'ether',
    accentColor: '#8B6FE8',
    icon: 'psi', // Ψ character or SVG
  },
  {
    id: 'binara',
    name: 'Binara',
    tagline: 'Tune Your Brainwaves',
    url: 'https://binara.app',
    element: 'water',
    accentColor: '#1E6F8C',
    icon: 'infinity', // ∞ character or SVG
  },
  {
    id: 'overtone-singer',
    name: 'Overtone Singer',
    tagline: 'Real-Time Overtone Visualiser',
    url: 'https://overtonesinger.com',
    element: 'fire',
    accentColor: '#E8621A',
    icon: 'waves', // sound wave SVG
    isPro: true,
    price: '$6.99',
  },
  {
    id: 'sonarus',
    name: 'Sonarus',
    tagline: 'Vocal Biomarker Analysis',
    url: 'https://sonarus.app',
    element: 'air',
    accentColor: '#7ECBCE',
    icon: 'broadcast', // broadcast/voice SVG
  },
  {
    id: 'lunar-practitioner',
    name: 'Lunar Practitioner',
    tagline: 'Moon-Guided Session Planner',
    url: 'https://lunata.app',
    element: 'ether',
    accentColor: '#8B6FE8',
    icon: 'moon', // crescent + dots SVG
  },
  {
    id: 'tidara',
    name: 'Tidara',
    tagline: 'Live Tidal Intelligence',
    url: 'https://tidara.app',
    element: 'water',
    accentColor: '#2E86AB',
    icon: 'tides', // wave lines SVG
  },
  {
    id: 'earth-pulse',
    name: 'Earth Pulse',
    tagline: 'Live Schumann Resonance Monitor',
    url: 'https://shumann.app',
    element: 'earth',
    accentColor: '#A0714F',
    icon: 'globe', // globe/grid SVG
  },
]
```

---

## Page Layout — Single Screen, No Scroll

The entire page must fit on a 375×812 viewport (iPhone standard). This means:

### Header (top ~15% of screen)
- "HARMONIC WAVES" — Cormorant Garamond, `tracking-[0.3em]`, ~18px, white at 90% opacity
- "Tools for Sound Healers" — Plus Jakarta Sans italic, ~13px, soft gold/amber `#C9A96E` at 60% opacity
- Thin decorative line with a small diamond ◆ centre element (keep existing if present)

### App Grid (middle ~70% of screen)
**This is the hero.** Seven apps displayed as a **tight, beautiful grid** — not a vertical list.

#### Layout option — Orbital / Circular arrangement:
Position the 7 apps in a circular/orbital pattern around a central point:
- Centre: a subtle sacred geometry motif (Flower of Life or Seed of Life, very faint ~3% opacity, slowly rotating)
- 6 apps arranged in a hexagonal ring around the centre
- 1 app (Nestorium — the flagship) positioned at the centre or top-centre, slightly larger

Each app node:
- Icon: the app's unique SVG icon, ~28-32px, in the app's accent colour
- Name: ~12px, white, bold
- **No tagline visible by default** — tagline appears on tap/hover as a tooltip or overlay
- **No element labels, no "Open →", no pricing text cluttering the grid**
- Subtle radial glow behind each icon in the accent colour (~8% opacity)

#### Alternative layout — Compact 2-column grid:
If the orbital layout doesn't fit or feels forced:
- 2 columns, tight rows
- Each cell: icon (left) + name (right), single line
- Accent colour left-border or dot indicator
- ~48px row height max
- Clean, App-Store-like density

**Claude Code: try the orbital/circular layout first. If it doesn't fit elegantly in 375×812, fall back to the compact grid. The orbital version will look far more cinematic on TikTok.**

### Footer (bottom ~15% of screen)
- "Created by Remigijus Dzingelevičius" — ~10px, opacity 30%
- "Sound Healer & Developer" — ~9px, tracking wide, opacity 20%

---

## Interaction Design

### Tap an app → Reveal overlay
When user taps an app node:
1. The node scales up slightly (1.05) with a bloom/glow burst in its accent colour
2. A **frosted glass overlay** slides in from the bottom or expands from the node's position
3. Overlay contains:
   - App icon (larger, ~48px)
   - App name
   - Full tagline
   - Element badge (emoji + name, small, muted)
   - If Pro: pricing pill badge
   - **"Open App →"** button — full-width, accent colour, clean
4. Tap outside or swipe down to dismiss
5. Smooth spring-like animation (CSS `cubic-bezier(0.34, 1.56, 0.64, 1)`)

This way the grid stays ultra-clean, but all info is one tap away.

### Desktop hover
On desktop, hovering an app node shows the tagline as a floating tooltip with a subtle fade-in. Click opens the app URL directly (no overlay needed on desktop — users expect direct navigation).

---

## Background & Atmosphere

This is what makes it TikTok-worthy. The background should feel alive, cosmic, and mesmerising.

### Layer 1 — Deep space gradient
```css
background: radial-gradient(ellipse at 30% 20%, rgba(15, 10, 40, 1) 0%, rgba(5, 5, 15, 1) 70%);
```
Very dark, with a subtle warm-purple bias in the top-left. Not pure black.

### Layer 2 — Sacred geometry (Flower of Life)
- SVG Flower of Life pattern, centred, covering ~70% of the viewport
- Stroke: white at 2-3% opacity
- Rotating: one full revolution per 120 seconds
- `will-change: transform` for GPU compositing

### Layer 3 — Floating particles
- 30-40 tiny dots (1-2px), white at 10-20% opacity
- Slow, random drift (parallax-like)
- Some particles very slowly pulse opacity between 5% and 25%
- Pure CSS animation with varied `animation-duration` (15s–40s) and random start positions
- **No canvas needed** — use CSS-animated `<div>` elements with `position: absolute`

### Layer 4 — Nebula glow (optional, if performant)
- 2-3 large, soft radial gradients positioned off-centre
- Colours: deep purple `rgba(80, 40, 120, 0.08)`, midnight blue `rgba(20, 40, 80, 0.06)`, dark teal `rgba(20, 60, 80, 0.05)`
- Slowly drifting position (CSS animation, 30-60s cycle)
- Creates the sense of being inside a nebula without any heavy rendering

### The combined effect:
Deep space + sacred geometry + floating stars + nebula glow = the phone screen looks like a portal. When someone screen-records this and posts it, the comments will be fire.

---

## Entry Sequence (Page Load Animation)

When the page first loads, choreograph a 2-3 second entrance:

1. **0.0s** — Background layers fade in (gradient + geometry + particles). Start dim.
2. **0.3s** — Sacred geometry begins its slow rotation
3. **0.5s** — "HARMONIC WAVES" title fades in with a subtle letter-spacing animation (starts at `0.5em`, settles to `0.3em`)
4. **0.8s** — "Tools for Sound Healers" fades in
5. **1.0s** — App nodes begin appearing, one by one, with a soft scale-up (0.8 → 1.0) and glow bloom, staggered ~100ms apart
6. **1.7s** — All nodes visible, glows settle to resting state
7. **2.0s** — Footer fades in
8. **2.5s** — Entry sequence complete, page is fully interactive

Use CSS `@keyframes` with `animation-delay` for the stagger. No JS animation library needed.

**This sequence IS the TikTok content.** It needs to feel like a summoning ritual — each app materialising into existence. The timing must feel intentional, not rushed.

---

## Colour Reference

```
Background:     #07081A (near-black with blue undertone)
Title:          #FFFFFF at 90%
Subtitle:       #C9A96E at 60% (warm gold)
Geometry:       #FFFFFF at 2-3%
Particles:      #FFFFFF at 10-20%

Earth    🌍     #A0714F
Water    💧     #3A9BC1 / #1E6F8C / #2E86AB
Fire     🔥     #E8621A
Air      🌬️     #7ECBCE
Ether    ✨     #8B6FE8
```

---

## Typography

```css
/* Title */
font-family: 'Cormorant Garamond', serif;
/* All other text */
font-family: 'Plus Jakarta Sans', sans-serif;
```

Import via Google Fonts in `layout.tsx` or `globals.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap');
```

---

## SVG Icons

Create clean, minimal SVG icons for each app. Each icon should be a single-path or simple multi-path SVG, ~32px viewBox, using the app's accent colour. Keep them consistent in weight (1.5-2px stroke, no fill, rounded caps).

Reuse the existing icon designs from the current page if they're already good (they looked great in the screenshot). Just ensure they're properly componentised as React SVG components.

---

## What NOT to Include

- ❌ No element labels under app names
- ❌ No "Open →" text visible in the grid
- ❌ No taglines visible in the grid (only in tap overlay)
- ❌ No pricing badges in the grid (only in tap overlay)
- ❌ No scroll — everything fits in one viewport
- ❌ No heavy animation libraries (no Framer Motion, no GSAP)
- ❌ No emoji in the UI (emoji are for data/code, not for display)
- ❌ No Inter font

---

## Performance Requirements

- Lighthouse performance: > 90
- First Contentful Paint: < 1.5s
- All animations: CSS only, GPU-accelerated (`transform`, `opacity`)
- Total JS bundle: minimal (no animation libraries)
- Particles: CSS-animated divs, not canvas
- Sacred geometry: single SVG element with CSS rotation
- Test on iPhone Safari — no scroll bounce, no jank

---

## Files to Create / Modify

**Create:**
- `src/components/AppOrbit.tsx` — the orbital/grid layout of app nodes
- `src/components/AppNode.tsx` — individual app icon + name
- `src/components/AppReveal.tsx` — tap-to-reveal overlay with details
- `src/components/SacredGeometry.tsx` — rotating Flower of Life SVG
- `src/components/Particles.tsx` — floating particle layer
- `src/components/icons/` — individual icon components per app (if not already present)
- `src/styles/animations.css` — all keyframe definitions

**Modify:**
- `src/app/page.tsx` — new layout composition
- `src/app/layout.tsx` — font imports, meta
- `src/app/globals.css` — background, base styles
- `tailwind.config.ts` — extend with custom colours and fonts if needed

---

## The Test

Screen-record the page loading on a phone. Watch the entry sequence. If it doesn't give you goosebumps, it's not done yet.

---

## Quality Bar

lunata.app and sonarus.app are the reference — but this page should EXCEED them. This is the mothership. The portal. Every app in the ecosystem points back here. Make it extraordinary.
