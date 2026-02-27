# HUB POLISH — BIGGER, BOLDER, SELL IT

> **Prompt for Claude Code** — Run from the `store.app` project root.
> Read the full codebase first. This is a refinement pass, not a rebuild. Keep the orbital layout concept, the sacred geometry background, and the entry animations. We're fixing proportions and one icon.

---

## Problem 1: Apps Are Too Small — They Need to SELL

The app icons and names are huddled in a small cluster in the centre of the screen. There's wasted dark space above and below. The apps are the product — they need to **dominate the viewport**, not whisper from the middle.

### Fix: Expand the orbital layout to fill the screen

- **The orbit radius needs to increase significantly.** The app nodes should spread outward to use ~85-90% of the screen width and ~60-65% of the screen height.
- **Icons should be larger:** increase from ~28-32px to **44-52px**. They need to be instantly recognisable, not squinting-required.
- **App names:** increase from ~12px to **14-15px**, `font-weight: 500`, white at 90% opacity. These are brand names — they deserve presence.
- **The sacred geometry in the centre can stay** but it should fill the space between the nodes, not compete with them. Keep it at 2-3% opacity.
- **Reduce the gap** between header and the orbit — the "HARMONIC WAVES" title and apps should feel connected, not separated by a void.
- **Reduce the gap** between the orbit and footer — pull the footer up closer.

### Spatial distribution target (375×812 viewport):
```
┌─────────────────────────┐
│                         │  ← Status bar ~50px
│   HARMONIC WAVES        │  ← Header zone: ~100px (title + subtitle + divider)
│   Tools for Sound...    │
│   ────── ◆ ──────       │
│                         │  ← ~20px breathing room (NOT 100px+ like current)
│        [Binara]         │  ← Top of orbit
│                         │
│  [Earth]    [Overtone]  │  ← Apps spread wide, using full width
│                         │
│      [Nestorium]        │  ← Centre/flagship, slightly larger
│                         │
│  [Tidara]    [Sonarus]  │
│                         │
│    [Lunar Pract.]       │  ← Bottom of orbit
│                         │  ← ~20px breathing room
│  Created by Remi...     │  ← Footer zone: ~60px
│  SOUND HEALER & DEV     │
└─────────────────────────┘
```

The orbit should feel like it's **pressing outward** against the edges of the screen — like the apps are radiating energy. Not clustered tight in the centre.

### Node hover/glow:
With larger icons, the accent glow behind each one should also scale up:
- Resting state: radial glow at ~10% opacity, ~70px diameter
- Hover/active: glow expands to ~100px, opacity rises to 18%
- The glow is what makes each node feel alive and premium

---

## Problem 2: Binara Icon Looks Like Glasses

The current ∞ infinity icon renders at small size as two circles side by side — reads as silly glasses or a mask, not infinity.

### Fix: Replace with a proper binaural beats icon

**New icon concept — dual sine waves converging:**
Two sine wave paths, one from the left ear, one from the right, meeting in the centre where they create an interference pattern (the "beat"). This is literally what binaural beats are, and it's instantly recognisable to the target audience.

```tsx
// BinaraIcon.tsx — Replace the existing infinity icon
export function BinaraIcon({ size = 48, color = '#1E6F8C' }: { size?: number; color?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Left channel wave */}
      <path
        d="M8 24 C14 16, 18 16, 24 24"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity="0.9"
      />
      {/* Right channel wave */}
      <path
        d="M24 24 C30 32, 34 32, 40 24"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity="0.9"
      />
      {/* Left channel wave — inverted phase */}
      <path
        d="M8 24 C14 32, 18 32, 24 24"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity="0.45"
      />
      {/* Right channel wave — inverted phase */}
      <path
        d="M24 24 C30 16, 34 16, 40 24"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity="0.45"
      />
      {/* Centre convergence point — the "beat" */}
      <circle cx="24" cy="24" r="2.5" fill={color} opacity="0.7" />
      <circle cx="24" cy="24" r="1.2" fill={color} opacity="1" />
      {/* Headphone hint — subtle arcs at the outer edges */}
      <path
        d="M6 20 C6 14, 10 10, 16 10"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.25"
      />
      <path
        d="M42 20 C42 14, 38 10, 32 10"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.25"
      />
    </svg>
  );
}
```

**Key design notes:**
- Two sine waves crossing at the centre = binaural principle visualised
- Brighter strokes (0.9 opacity) for the primary wave, dimmer (0.45) for the phase-inverted wave
- Centre dot = the beat frequency convergence point
- Faint headphone arcs at top-left and top-right (0.25 opacity) — subliminal "headphones required" hint
- Must read clearly at 44-52px — test at that size, not just in the viewBox

**If you prefer a simpler approach:** a clean, well-drawn infinity symbol (∞) can work, but it must use a **single continuous path with proper curves**, not two separate circles. The current icon fails because the two loops disconnect visually at small sizes. A proper infinity uses a figure-8 lemniscate curve:

```svg
<path d="M8 24 C8 16, 16 16, 24 24 C32 32, 40 32, 40 24 C40 16, 32 16, 24 24 C16 32, 8 32, 8 24 Z"
  stroke="#1E6F8C" stroke-width="1.8" fill="none" stroke-linecap="round" />
```

**Claude Code: try the dual sine wave version first. If it doesn't read well at the target size, fall back to the clean lemniscate infinity.**

---

## Problem 3: Nestorium Should Feel Like the Flagship

Nestorium is at the centre of the orbit — it's the original, the most comprehensive tool. Give it slightly more presence:

- Icon size: **56px** (vs 48px for others)
- Name: **16px** (vs 14px for others)
- Glow: slightly brighter resting state (~14% vs 10% for others)
- This is subtle — not a separate design language, just a hint of hierarchy

---

## Problem 4: The Overall Page Should Feel Premium

A few small touches to elevate:

### App node tap feedback
When a user taps an app node, before the overlay appears:
- Quick pulse animation: scale `1.0 → 1.08 → 1.0` over 200ms
- Glow burst: opacity `10% → 30% → 10%` over 300ms
- This makes the page feel responsive and alive — critical for the TikTok screen-recording moment

### Ambient glow drift
The nebula glow layers in the background should drift very slowly:
- 2-3 large soft radial gradients
- Drift positions over 30-60 second CSS animation cycles
- This means the background is never exactly the same twice — it breathes
- Keeps the screen recording interesting for longer clips

### Icon accent colour consistency
Ensure every icon's stroke colour precisely matches its `accentColor` from the data. Currently some icons might be using hardcoded colours that don't align.

---

## Testing Checklist

- [ ] All 7 app nodes fill ~85% of screen width on 375px viewport
- [ ] Icons are 44-52px and instantly legible
- [ ] Binara icon reads as "waves/binaural", NOT as glasses
- [ ] Nestorium is subtly larger than other nodes
- [ ] No scrolling required on 375×812 (iPhone 13/14/15)
- [ ] No scrolling required on 390×844 (iPhone 14 Pro)
- [ ] No scrolling required on 393×852 (iPhone 15 Pro)
- [ ] Tap overlay still works correctly with larger nodes
- [ ] Entry animation stagger still feels smooth with larger icons
- [ ] Sacred geometry visible between nodes but not competing
- [ ] Glow effects don't cause jank on mobile Safari
- [ ] `next build` passes with no errors

---

## What NOT to Change

- ✅ Keep the orbital/circular layout arrangement
- ✅ Keep the sacred geometry background
- ✅ Keep the entry sequence animation
- ✅ Keep the tap-to-reveal overlay system
- ✅ Keep all app data and URLs
- ✅ Keep the header design (HARMONIC WAVES + subtitle)
- ✅ Keep the footer text (just ensure it's pulled up closer)

Only change: sizes, spacing, Binara icon, Nestorium emphasis, and ambient polish.

---

## Quality Bar

The finished page should look like something Apple would design if Apple made sound healing tools. Every pixel intentional. Every glow purposeful. When you screen-record it, it should feel like capturing something sacred.
