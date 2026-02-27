# CHANGE OVERTONE SINGER ICON

> **Prompt for Claude Code** — Run from the `store.app` project root.
> **One change only — replace the Overtone Singer icon SVG.**

---

## What to Do

The Overtone Singer app currently uses a tuning fork icon. This is wrong — Overtone Singer is about human vocal overtone singing, not instruments. Replace it with a **side profile of a singing human face** with sound/harmonic waves emanating from the mouth.

Find the Overtone Singer icon in the icon component (likely `AppIcon.tsx` or similar) and replace its SVG with this concept:

### Design: Singing Face Profile with Harmonics

ViewBox: `0 0 48 48` — same as all other icons.

The icon should contain:
1. **Side profile silhouette** (facing right) — forehead, nose, lips, chin, drawn with a single continuous stroke path. Minimal and elegant, not detailed/realistic.
2. **Open mouth** — a small gap in the profile line at the lips, suggesting singing
3. **2-3 sound wave arcs** emanating from the mouth area toward the right — these represent the overtones/harmonics being produced. Progressively lower opacity (0.7, 0.45, 0.25) as they get further from the mouth.

### SVG Reference:

```tsx
// Overtone Singer — singing face profile with harmonic emanation
<svg width={size} height={size} viewBox="0 0 48 48" fill="none">
  {/* Face profile — single stroke, facing right */}
  <path
    d="M22 8 C22 8, 16 10, 16 16 C16 20, 18 22, 20 23 L18 25 C18 25, 16 27, 17 29 L20 31 C20 31, 18 36, 18 40"
    stroke={color}
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    fill="none"
  />
  {/* Mouth opening — small gap showing singing */}
  <path
    d="M20 25.5 L23 24.5"
    stroke={color}
    strokeWidth="1.6"
    strokeLinecap="round"
    opacity="0.7"
  />
  {/* Harmonic waves from mouth */}
  <path d="M26 22 Q30 25, 26 28" stroke={color} strokeWidth="1.8" strokeLinecap="round" opacity="0.7" />
  <path d="M30 19 Q36 25, 30 31" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.45" />
  <path d="M34 16 Q42 25, 34 34" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.25" />
</svg>
```

**Important:** This is a starting reference. The exact path coordinates may need tweaking to look good at 40-48px. The key requirements are:
- Clearly reads as a human face profile at small size (40px)
- Mouth area is open/singing
- Sound arcs emanate from the mouth
- Uses the app's accent `color` prop for all strokes (same as other icons)
- Same strokeWidth range as other icons (1.2–2.2)
- Same viewBox `0 0 48 48`
- No fill, stroke only, round caps

If the face profile is too complex to read at 40px, simplify it — fewer curves, bolder strokes. A recognisable head shape + open mouth + sound waves is all that's needed.

---

## Rules

- **ONLY** change the Overtone Singer SVG path data
- **DO NOT** change any other icons
- **DO NOT** change colours, component structure, layout, or anything else
- Keep the same props interface (`size`, `color`)
