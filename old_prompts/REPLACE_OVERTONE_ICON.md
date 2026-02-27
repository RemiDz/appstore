# REPLACE OVERTONE SINGER ICON — SINGING FACE SIDE PROFILE

> **Prompt for Claude Code** — Run from the `store.app` project root.
> **Only change the Overtone Singer icon.** Do not touch any other icon.

---

## What We Need

A human face in **side profile (silhouette), mouth open, singing** — with 2-3 sound wave arcs emanating from the mouth. Must look professional.

---

## CRITICAL: Do NOT hand-draw SVG paths

Every attempt to manually write SVG path coordinates for a human face has looked terrible. **Do NOT create face paths from scratch.** Use a professional icon library.

---

## Strategy

Install one of these icon libraries and use their professionally designed side-profile head icon:

### Option 1: Phosphor Icons (preferred)
```bash
npm install @phosphor-icons/react
```
```tsx
import { UserSound } from '@phosphor-icons/react';

// UserSound is a side-profile head with sound waves
<UserSound size={size * 0.8} color={color} weight="light" />
```
Try weights: `"light"`, `"regular"`, `"duotone"`, `"fill"` — pick what looks best at 40px on dark background.

### Option 2: Font Awesome 6 via react-icons
```bash
npm install react-icons
```
Font Awesome 6 has `FaHeadSideCough` — a clean side-profile head silhouette with waves from the mouth:
```tsx
import { FaHeadSideCough } from 'react-icons/fa6';
<FaHeadSideCough size={size * 0.8} color={color} />
```

### Option 3: Hugeicons
```bash
npm install hugeicons-react
```
Search for "speaking", "voice", "singing" — they have 4000+ icons including vocal/speaking side profiles.

---

## Pick the Best One

Render each option at 40px on `#080414` background with `#FB923C` colour. Pick whichever:
1. Most clearly shows a human head in side profile
2. Has sound/voice indication
3. Looks clean and professional at small size
4. Matches the visual weight of the other icons (Binara brain, Sonarus waves, etc.)

---

## Rules

- **ONLY** change the Overtone Singer icon
- **DO NOT** change any other icons, layout, or styling
- **DO NOT** try to hand-code SVG face paths under any circumstances
- Use a professional icon from an established icon library
