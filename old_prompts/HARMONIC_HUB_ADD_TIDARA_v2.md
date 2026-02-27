# Add Tidara to Harmonic Waves Hub

## GitHub Repo: https://github.com/RemiDz/appstore

## Context

The hub currently shows 5 apps, each with a **simple line-art SVG icon** (single colour, no fills, just strokes) and a name + tagline. The icons are minimal symbols:

- NestorLab: tuning fork / psi symbol (purple)
- Overtone Singer: voice waves emanating from parentheses (cyan)
- Sonarus: circular sound waves (green)
- Lunar Practitioner: crescent moon (blue-grey)
- Earth Pulse: globe with latitude lines (teal)

**Tidara's icon must match this exact style — simple line-art, single colour, no backgrounds, no fills.**

## App Entry

```
Name:        Tidara
Tagline:     Live Tidal Intelligence
URL:         https://tidara.app
Colour:      #4fc3f7 (bioluminescent cyan — distinct from Overtone Singer's cyan, 
             so if they look too similar, use #29b6f6 or #0097a7 instead)
```

## Icon Design — Simple Line-Art Wave

The icon should be a **tidal wave symbol** drawn in the same minimal stroke style as the other icons. Think: 2-3 flowing wave lines stacked, suggesting ocean tidal movement.

**Concept:**

```
    ≈
   ≋≋≋
```

Specifically: two or three smooth sine-wave curves stacked vertically, with the top wave larger/higher (representing high tide) and bottom wave smaller/lower. A small dot on the top wave represents the "NOW" marker — Tidara's signature element.

**SVG approach:**

```svg
<!-- Simple tidal wave icon matching hub's line-art style -->
<svg viewBox="0 0 48 48" fill="none" stroke="#4fc3f7" stroke-width="2" stroke-linecap="round">
  <!-- Top wave (larger, representing high tide) -->
  <path d="M8,18 C12,12 16,12 20,18 C24,24 28,24 32,18 C36,12 40,12 44,18" />
  
  <!-- Middle wave -->
  <path d="M6,26 C10,21 14,21 18,26 C22,31 26,31 30,26 C34,21 38,21 42,26" opacity="0.6" />
  
  <!-- Bottom wave (smaller, representing low tide) -->
  <path d="M10,34 C13,30 16,30 19,34 C22,38 25,38 28,34 C31,30 34,30 37,34" opacity="0.35" />
  
  <!-- NOW dot on top wave peak -->
  <circle cx="20" cy="18" r="2" fill="#4fc3f7" stroke="none" />
</svg>
```

**Key requirements:**
- Stroke only, no background rectangle, no filled shapes (except the small NOW dot)
- Single colour (#4fc3f7) with opacity variations for depth
- Same visual weight and size as the other icons in the hub
- Must be instantly recognisable as "water / waves / ocean" at small sizes

## Instructions for Claude Code

1. Open the project at the appstore repo path
2. Find where the app list is defined (likely in `src/` — look for an array of apps with name, tagline, url, icon properties)
3. Study how existing icons are implemented (inline SVG? separate SVG files? React components?)
4. Add Tidara to the app list following the exact same pattern as the existing entries
5. Create the wave icon matching the line-art style of the other icons
6. Place Tidara **after Earth Pulse** (as the newest app, at the bottom of the list)
7. Ensure the colour (#4fc3f7) is visually distinct from Overtone Singer's colour — if they're too similar, adjust Tidara to a slightly different ocean tone
8. Test that it renders correctly and the link to https://tidara.app works
9. Commit and push
