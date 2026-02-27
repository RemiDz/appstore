# IMPROVE HARMONIC WAVES HUB

> **Prompt for Claude Code** — Run from the `store.app` project root.
> Read the entire codebase first before making changes. Preserve all existing functionality and visual style.

---

## Context

The Harmonic Waves hub (harmonicwaves.app) is live and looks great. We're adding polish and depth — elemental identity, micro-animations, interaction cues, and small copy improvements. **No layout restructuring** — keep the vertical flow. These are refinements, not a rebuild.

### Current app lineup (top to bottom):

| App | Element | Colour | Pricing | URL |
|---|---|---|---|---|
| Nestorium | 💧 Water | `#3A9BC1` | Free | nestorlab.app |
| Binara | 💧 Water | `#1E6F8C` | Free | binara.app |
| Overtone Singer | 🔥 Fire | `#E8621A` | Pro · $6.99 | overtonesinger.com |
| Sonarus | 🌬️ Air | `#7ECBCE` | Free | sonarus.app |
| Lunar Practitioner | ✨ Ether | `#8B6FE8` | Free | lunata.app |
| Tidara | 💧 Water | `#2E86AB` | Free | tidara.app |
| Earth Pulse | 🌍 Earth | `#A0714F` | Free | shumann.app |

---

## 1. Add Elemental Identity to Each App

Below each app's tagline, add a subtle element label. Small, muted, spaced-letter style to match the hub's typographic aesthetic.

```
Example rendering:

    (∞)
   Binara
 Tune Your Brainwaves
    💧 Water
```

### Implementation:
- Text: element emoji + element name (e.g. `💧 Water`, `🔥 Fire`, `✨ Ether`, `🌬️ Air`, `🌍 Earth`)
- Style: `text-[11px] tracking-[0.15em] uppercase opacity-40` (or equivalent — should be visible but clearly secondary)
- Colour: use each app's element accent colour at ~40% opacity for the text
- Spacing: ~6px gap below the tagline

---

## 2. Add Pricing Badges

Each app needs a small pricing indicator. Position it near the icon or app name — wherever feels balanced.

### Free apps:
- No badge needed (free is the default assumption), OR
- A very subtle `Free` label in muted white at ~30% opacity — your call based on what looks cleaner. **If adding the badge feels cluttered, skip it for free apps and only badge the paid one.**

### Pro apps (currently only Overtone Singer):
- Badge text: `Pro · $6.99`
- Style: small pill/badge, semi-transparent background with the app's accent colour
- Example: `bg-[#E8621A]/15 text-[#E8621A] text-[10px] px-2 py-0.5 rounded-full tracking-wide`
- Position: inline next to the app name, or just below the element label

---

## 3. Micro-Animations — Bring the Page to Life

Add subtle, performant animations. **Nothing flashy — this is a temple, not a tech demo.** All animations should use CSS or lightweight JS. No heavy libraries.

### 3a. Sacred Geometry Background
If the sacred geometry pattern behind the apps is static, make it rotate:
- **Speed:** One full rotation every 120 seconds (barely perceptible)
- **CSS:** `animation: spin 120s linear infinite;`
- **Performance:** Use `will-change: transform` and ensure it's on a separate compositing layer

### 3b. Icon Glow Pulse
Each app icon should have a very subtle radial glow that pulses:
- **Colour:** The app's accent colour at ~10-15% opacity
- **Animation:** `scale(1) → scale(1.15)` on the glow, over 3-4 seconds, ease-in-out, infinite
- **Implementation:** A `::before` or `::after` pseudo-element behind each icon, or a dedicated `<div>` with a radial gradient
- **Stagger:** Each icon's animation should be offset by ~0.5s so they don't all pulse in sync — creates an organic, breathing feel

```css
/* Example */
.icon-glow {
  position: absolute;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: radial-gradient(circle, var(--accent-color) 0%, transparent 70%);
  opacity: 0.12;
  animation: glow-pulse 4s ease-in-out infinite;
}

@keyframes glow-pulse {
  0%, 100% { transform: scale(1); opacity: 0.08; }
  50% { transform: scale(1.2); opacity: 0.15; }
}

/* Stagger each app */
.app:nth-child(1) .icon-glow { animation-delay: 0s; }
.app:nth-child(2) .icon-glow { animation-delay: 0.5s; }
.app:nth-child(3) .icon-glow { animation-delay: 1.0s; }
/* etc. */
```

### 3c. Scroll Entrance
As each app scrolls into view, it should fade in and slide up slightly:
- **Effect:** `opacity: 0 → 1` and `translateY(20px) → 0` over 0.5s
- **Trigger:** Intersection Observer with `threshold: 0.1`
- **Once only:** Don't re-animate on scroll back up
- **Stagger:** If multiple apps are in view on load, stagger their entrance by ~100ms each

```js
// Lightweight Intersection Observer approach — no library needed
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.app-card').forEach(card => observer.observe(card));
```

```css
.app-card {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.app-card.visible {
  opacity: 1;
  transform: translateY(0);
}
```

---

## 4. Tap/Click Interaction

Each app card must be clearly tappable and link to its URL.

### Requirements:
- Wrap each app in an `<a>` tag (or clickable container) linking to the app URL
- `target="_blank"` and `rel="noopener noreferrer"`
- **Hover state (desktop):** Slight scale up (`scale(1.02)`), accent glow intensifies, cursor pointer
- **Active/press state (mobile):** Brief scale down (`scale(0.98)`) for tactile feedback
- **Visual cue:** Add a small `→` arrow or "Open →" text below the element label, visible at ~30% opacity, brightening to 60% on hover

```css
.app-card {
  cursor: pointer;
  transition: transform 0.2s ease;
}
.app-card:hover {
  transform: scale(1.02);
}
.app-card:active {
  transform: scale(0.98);
}
.app-card .open-cue {
  opacity: 0.25;
  transition: opacity 0.2s ease;
}
.app-card:hover .open-cue {
  opacity: 0.6;
}
```

---

## 5. Footer Enhancement

Update the footer from:
```
Created by Remigijus Dzingelevičius
```

To:
```
Created by Remigijus Dzingelevičius
Sound Healer & Developer
```

- Second line: `text-[11px] tracking-[0.12em] uppercase opacity-30`
- Adds practitioner credibility — tells visitors this was built by one of them

---

## 6. Hero Subtitle Enhancement

If there's space below "Tools for Sound Healers", add a secondary tagline:

```
Seven tools · Five elements · Zero friction
```

- Style: `text-[12px] tracking-[0.2em] uppercase opacity-35`
- Position: just below the existing subtitle, with ~8px gap
- If this feels too crowded in the hero area, skip it — don't force it

---

## 7. Element Colour Reference

Use these for all accent colours, glows, and badges:

```
Earth   🌍  #A0714F  (amber/brown)
Water   💧  #3A9BC1  (blue) — NestorLab
Water   💧  #1E6F8C  (deep teal) — Binara
Water   💧  #2E86AB  (ocean blue) — Tidara
Fire    🔥  #E8621A  (orange/red)
Air     🌬️  #7ECBCE  (soft teal/mint)
Ether   ✨  #8B6FE8  (violet/purple)
```

---

## 8. Performance Notes

- All animations must be GPU-accelerated (`transform`, `opacity` only — no `top`/`left`/`width` animations)
- Sacred geometry rotation: use `will-change: transform` and keep it on a fixed/absolute layer
- Intersection Observer is native — no polyfill needed for modern browsers
- Test on mobile (375px width) — ensure glow effects don't cause scroll jank
- Total added JS should be < 1KB minified

---

## 9. Testing Checklist

- [ ] Element labels visible but subtle beneath each app tagline
- [ ] Pro badge shows on Overtone Singer only (or on all apps if free badges added)
- [ ] Sacred geometry rotates smoothly (check for jank on mobile Safari)
- [ ] Icon glows pulse with staggered timing — organic, not synchronized
- [ ] Scroll entrance animation triggers once per card
- [ ] Tapping any app opens the correct URL in a new tab
- [ ] Hover states work on desktop, press states on mobile
- [ ] Footer shows both name and "Sound Healer & Developer"
- [ ] Hero subtitle added if space permits, skipped if cluttered
- [ ] `next build` passes with no errors
- [ ] No visual regression — existing layout, spacing, typography unchanged
- [ ] Lighthouse performance score stays above 90

---

## Design Quality Bar

Reference: lunata.app, sonarus.app — match their level of subtle, intentional motion. Every animation should feel like breathing, not bouncing. If in doubt, make it slower and more transparent. This is a sacred space for practitioners.
