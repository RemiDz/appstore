# REPLACE OVERTONE SINGER & BINARA ICONS

> **Prompt for Claude Code** — Run from the `store.app` project root.
> Read the codebase first. **Only change the icon SVGs for Overtone Singer and Binara.** Do not touch anything else.

---

## The Problem

The hand-coded SVG icons for Overtone Singer (tuning fork) and Binara (zigzag) don't represent their apps well and look crude at small sizes. We need professional-quality replacements.

---

## Approach

Use **Lucide icons** as a foundation — they're professionally designed, pixel-hinted, and look clean at any size. The project should already have `lucide-react` available. If not, install it:

```bash
npm install lucide-react
```

Import the specific icons we need and render them with custom colour and sizing to match the existing icon style.

---

## Overtone Singer — Use `MicVocal` from Lucide

The `MicVocal` icon from Lucide is a professional vocal microphone icon — much more appropriate for an overtone singing app than a tuning fork. It's clean, recognisable, and reads perfectly at small sizes.

```tsx
import { MicVocal } from 'lucide-react';
```

BUT — if you want to keep it more unique and specific to "singing voice" rather than just "microphone", use a **combination approach**: use Lucide's `MicVocal` or `AudioLines` icon as the main element, then add 2-3 custom sound wave arcs emanating from it to represent the overtone harmonics.

### Option A: Pure Lucide icon
```tsx
// In the icon component, for overtone-singer:
<MicVocal size={size} color={color} strokeWidth={1.8} />
```

### Option B: Lucide icon + custom harmonic arcs (PREFERRED)
```tsx
// Wrap in an SVG that matches the existing 48x48 viewBox:
<svg width={size} height={size} viewBox="0 0 48 48" fill="none">
  {/* Lucide MicVocal paths scaled to fit 48x48 viewBox */}
  {/* The Lucide MicVocal icon (24x24) needs to be scaled 2x and offset to fit */}
  <g transform="translate(4, 4) scale(1.65)">
    {/* MicVocal icon paths from Lucide — get the exact SVG paths from: 
        https://unpkg.com/lucide-static/icons/mic-vocal.svg
        Copy the <path> elements and paste them here */}
  </g>
  {/* Add custom harmonic wave arcs on the right side */}
  <path d="M34 18 Q38 24, 34 30" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
  <path d="M38 15 Q44 24, 38 33" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.25"/>
</svg>
```

### How to get the actual Lucide SVG paths:

1. Go to https://lucide.dev/icons/mic-vocal
2. Click the icon to see its SVG source
3. Copy the `<path>` elements  
4. Embed them in your custom SVG wrapper at the correct scale

Alternatively, just render the Lucide React component directly if your icon component supports it — this is simpler and guarantees visual quality:

```tsx
case 'overtone-singer':
  return <MicVocal size={size * 0.75} color={color} strokeWidth={1.8} />;
```

The `* 0.75` scaling factor keeps it proportional with the other custom icons.

---

## Binara — Use `BrainCircuit` or `Brain` from Lucide + `Activity` wave

For binaural beats, we want to communicate "brain + frequency". Lucide has:
- `Brain` — clean brain icon
- `BrainCircuit` — brain with circuit nodes (more techy)
- `Activity` — EKG/waveform line
- `Headphones` — headphone icon

### Option A: Brain with wave overlay (PREFERRED)
Use Lucide's `Brain` icon as the main element. Add a horizontal wave/pulse line cutting through it to represent the binaural frequency entrainment:

```tsx
<svg width={size} height={size} viewBox="0 0 48 48" fill="none">
  {/* Lucide Brain icon paths scaled to fit 48x48 */}
  <g transform="translate(6, 4) scale(1.5)">
    {/* Brain icon paths from https://unpkg.com/lucide-static/icons/brain.svg */}
    {/* Reduce opacity slightly so the wave stands out */}
  </g>
  {/* Horizontal brainwave cutting through */}
  <path 
    d="M4 26 L12 26 L16 18 L20 32 L24 20 L28 30 L32 22 L36 26 L44 26"
    stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
    opacity="0.85"
  />
</svg>
```

### Option B: Pure Lucide BrainCircuit
```tsx
case 'binara':
  return <BrainCircuit size={size * 0.75} color={color} strokeWidth={1.8} />;
```

### Option C: Headphones + brain wave
```tsx
<svg width={size} height={size} viewBox="0 0 48 48" fill="none">
  <g transform="translate(4, 2) scale(1.65)">
    {/* Lucide Headphones paths */}
  </g>
  {/* EEG wave between the cups */}
  <path d="M14 32 L18 32 L20 26 L23 36 L26 24 L29 34 L32 28 L34 32"
    stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" opacity="0.8"/>
</svg>
```

---

## Implementation Steps

1. Install/verify `lucide-react` is available
2. Find the icon component file (likely `AppIcon.tsx` or similar)
3. For Overtone Singer: replace the SVG with `MicVocal` from Lucide (with optional harmonic arcs)
4. For Binara: replace the SVG with `Brain` from Lucide (with a horizontal brainwave overlay)
5. Match the `color` prop and approximate `size` to the existing icons

---

## Key Principle

**Use the Lucide icons as-is or with minimal additions.** Don't try to hand-draw custom organic shapes. The Lucide icons are designed by professional icon designers — they'll look 10x better than any hand-coded SVG path at every size.

---

## Fallback — Download SVGs Directly

If importing Lucide React components doesn't work cleanly with the existing icon architecture, download the SVG files directly:

```bash
# Download the specific icon SVGs
curl -o src/assets/mic-vocal.svg https://unpkg.com/lucide-static/icons/mic-vocal.svg
curl -o src/assets/brain.svg https://unpkg.com/lucide-static/icons/brain.svg
```

Then inline the SVG paths into the existing icon component, replacing only the Overtone Singer and Binara entries.

---

## Rules

- **ONLY** change the Overtone Singer and Binara icon SVGs
- **DO NOT** change any other icons, colours, layout, or components
- Match the existing `color` prop usage (stroke colour comes from the app's accent)
- Keep icons visually consistent in weight/size with the other 5 app icons
- Test at 40px (grid cards) and 48px (overlay) — both must look clean
