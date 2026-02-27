# HUB VISUAL INTENSITY FIX — INJECT COLOUR & ENERGY

> **Prompt for Claude Code** — Run from the `store.app` project root.
> Read the full codebase first. **Do NOT change the layout, component structure, or app data.** This is purely a visual intensity upgrade. Same bones, 10x more life.

---

## The Problem

The deployed hub is clean but lifeless. It looks like a settings menu, not a premium app store. Specifically:

1. **Aurora background is invisible** — too dim, cards block it
2. **Cards are identical grey boxes** — no colour identity per app
3. **No visible movement** — everything looks static on first glance
4. **Flagship card blends in** — doesn't feel special
5. **No dopamine** — nothing makes you stop and stare

---

## Fix 1: CRANK THE AURORA BACKGROUND UP

The canvas aurora blobs need to be **3-4x brighter**. They should be clearly visible — like actual coloured light washing across the screen behind the cards.

Find the canvas draw function and increase all blob opacity values:

```ts
// BEFORE (too dim):
g.addColorStop(0, `rgba(${r1},${g1},${b1},${0.14 * pulse})`);
g.addColorStop(0.4, `rgba(${r2},${g2},${b2},${0.08 * pulse})`);

// AFTER (visible):
g.addColorStop(0, `rgba(${r1},${g1},${b1},${0.35 * pulse})`);
g.addColorStop(0.4, `rgba(${r2},${g2},${b2},${0.20 * pulse})`);
```

Also increase the star brightness:
```ts
// Stars should twinkle at 0.3–0.8 opacity range, not 0.1–0.4
const a = s.a * (0.6 + Math.sin(t * s.s + s.o) * 0.4);
```

And make the star base alpha range brighter:
```ts
// When generating stars:
a: Math.random() * 0.5 + 0.3,  // was 0.4 + 0.2
r: Math.random() * 1.8 + 0.4,  // slightly bigger too
```

**The test:** Screenshot the page. If the background looks basically black, it's too dim. You should clearly see purple, teal, and blue light washing across the screen.

---

## Fix 2: COLOUR-TINTED CARDS — Each App Gets Its Own Energy

This is the biggest upgrade. Every card currently looks the same — grey glass on grey. Each card should feel like it's radiating its own colour.

### Card background — permanent colour tint:

Replace the current flat `rgba(255,255,255,0.03)` background with a colour-tinted gradient per card:

```css
/* Each card gets a coloured background */
background: linear-gradient(
  135deg,
  rgba(var(--accent-rgb), 0.08),
  rgba(var(--accent-rgb), 0.03)
);
```

Pass each app's `accentRgb` as a CSS variable on the card element:
```tsx
style={{ '--accent-rgb': app.accentRgb }}
```

### Card border — permanent colour tint:

```css
border: 1px solid rgba(var(--accent-rgb), 0.15);
```

Not white-transparent — coloured-transparent. Each card should have a faintly coloured edge that distinguishes it from its neighbours.

### Card hover — intensify the colour:

```css
.card:hover {
  background: linear-gradient(
    135deg,
    rgba(var(--accent-rgb), 0.15),
    rgba(var(--accent-rgb), 0.06)
  );
  border-color: rgba(var(--accent-rgb), 0.3);
  box-shadow:
    0 0 20px rgba(var(--accent-rgb), 0.12),
    0 8px 32px rgba(var(--accent-rgb), 0.18);
}
```

### Card inner glow — always visible, not just on hover:

Each card should have a subtle top-light effect that's ALWAYS visible:

```css
.card::after {
  content: '';
  position: absolute;
  top: -40%;
  left: 5%;
  right: 5%;
  height: 70%;
  border-radius: 50%;
  background: radial-gradient(ellipse, rgba(var(--accent-rgb), 0.10), transparent 70%);
  filter: blur(20px);
  pointer-events: none;
  opacity: 1;  /* ALWAYS visible, not just on hover */
}
.card:hover::after {
  opacity: 1;
  background: radial-gradient(ellipse, rgba(var(--accent-rgb), 0.20), transparent 70%);
}
```

### The result:
- Binara card has a cyan/teal tint
- Overtone Singer has a warm orange tint
- Sonarus has a green/teal tint
- Lunar has a purple tint
- Tidara has a blue tint
- Earth Pulse has a gold/amber tint
- Every card is UNIQUE at a glance

---

## Fix 3: ICON GLOW — Bigger, Brighter, Living

The icon glows behind each app icon need to be more visible:

```css
.icon-glow {
  position: absolute;
  inset: -16px;  /* was probably -10 or -12 */
  border-radius: 50%;
  background: radial-gradient(circle, rgba(var(--accent-rgb), 0.30), transparent 70%);
  /* was probably 0.15-0.18 — needs to be 0.30 */
  animation: glowPulse 3.5s ease-in-out infinite;
}

@keyframes glowPulse {
  0%, 100% { transform: scale(0.8); opacity: 0.5; }
  50% { transform: scale(1.35); opacity: 1; }
}
```

The pulse should be VISIBLE — when the glow expands, you should actually see it. Currently it's likely so faint you can't tell it's animating.

Stagger each card's glow animation:
```tsx
style={{ animationDelay: `${index * 0.5}s` }}
```

---

## Fix 4: FLAGSHIP CARD — Make It Actually Special

The Nestorium flagship card needs to look like the hero, not just a wider version of the grid cards.

### Animated gradient border — always visible (not just on hover):

```css
.flagship::before {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: 25px;
  background: linear-gradient(
    135deg,
    rgba(167,139,250,0.4),
    rgba(34,211,238,0.2),
    rgba(192,132,252,0.3),
    rgba(167,139,250,0.4)
  );
  background-size: 300% 300%;
  animation: borderShift 5s ease-in-out infinite;
  z-index: -1;
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: xor;
  -webkit-mask-composite: xor;
  padding: 1.5px;
  opacity: 1;  /* ALWAYS visible */
}

@keyframes borderShift {
  0%, 100% { background-position: 0% 50%; }
  25% { background-position: 100% 0%; }
  50% { background-position: 100% 100%; }
  75% { background-position: 0% 100%; }
}
```

### Flagship background — richer:

```css
.flagship {
  background: linear-gradient(
    135deg,
    rgba(167,139,250,0.10),
    rgba(139,111,232,0.04),
    rgba(167,139,250,0.08)
  );
  border: 1px solid rgba(167,139,250,0.2);
}
```

### Flagship icon glow — larger and brighter:

```css
.flagship-glow {
  inset: -24px;
  background: radial-gradient(circle, rgba(167,139,250,0.40), transparent 70%);
  animation: glowPulse 3.5s ease-in-out infinite;
}
```

---

## Fix 5: ANIMATED GRADIENT BORDERS ON GRID CARDS

Same mask border technique as flagship, but only visible on hover for grid cards. The gradient should use each card's glow1/glow2 colours:

```css
.card::before {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: 21px;
  background: linear-gradient(
    135deg,
    var(--glow1)66,  /* 40% opacity hex */
    var(--glow2)33,  /* 20% opacity hex */
    var(--glow1)66
  );
  background-size: 200% 200%;
  animation: borderShift 4s ease-in-out infinite;
  z-index: -1;
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: xor;
  -webkit-mask-composite: xor;
  padding: 1px;
  opacity: 0;
  transition: opacity 0.35s ease;
}
.card:hover::before {
  opacity: 1;
}
```

Pass `--glow1` and `--glow2` as CSS variables on each card.

---

## Fix 6: ENTRY ANIMATION — MORE DRAMATIC

The card entrance animation should be more dramatic:

```css
/* Cards start further away and more transparent */
.card-entering {
  opacity: 0;
  transform: scale(0.65) translateY(30px);
}

/* Spring in with more overshoot */
@keyframes cardIn {
  0% { opacity: 0; transform: scale(0.65) translateY(30px); }
  60% { opacity: 1; transform: scale(1.08) translateY(-4px); }
  80% { transform: scale(0.97) translateY(1px); }
  100% { opacity: 1; transform: scale(1) translateY(0); }
}
```

Duration: 0.8s per card. Stagger: 100ms apart. This creates a bouncy, satisfying cascade.

Flagship entrance should be even more dramatic:
```css
@keyframes flagshipIn {
  0% { opacity: 0; transform: scale(0.8) translateY(16px); }
  50% { opacity: 1; transform: scale(1.04) translateY(-3px); }
  70% { transform: scale(0.98) translateY(1px); }
  100% { opacity: 1; transform: scale(1) translateY(0); }
}
```

---

## Fix 7: CARD NAME TEXT — COLOUR ON DEFAULT (not just hover)

Each app name should already have a hint of its accent colour, not pure white:

```css
.card-name {
  color: rgba(255, 255, 255, 0.88);
  /* On hover, shift to full accent: */
  transition: color 0.25s ease;
}
.card:hover .card-name {
  color: var(--accent);
}
```

And the Pro badge on Overtone Singer should have more visual presence:
```css
.pro-badge {
  background: linear-gradient(135deg, rgba(251,146,60,0.2), rgba(251,146,60,0.1));
  border: 1px solid rgba(251,146,60,0.25);
  color: #FB923C;
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.1em;
  padding: 3px 10px;
  border-radius: 20px;
}
```

---

## Fix 8: REDUCE CARD GLASS OPACITY — Let the Aurora Through

The cards might be using `backdrop-filter: blur(12-20px)` which creates a fog that hides the aurora. Reduce or remove it:

```css
/* If cards have backdrop-filter, reduce it significantly */
.card {
  backdrop-filter: blur(6px);  /* was probably 12-20px */
  -webkit-backdrop-filter: blur(6px);
  /* OR remove it entirely and rely on the coloured background gradient */
}
```

The frosted glass effect is nice in theory but if it makes everything look like the same grey blob, it's doing more harm than good. The coloured tinted backgrounds from Fix 2 provide enough visual grounding without needing heavy blur.

---

## Summary of Changes

| Element | Before | After |
|---------|--------|-------|
| Aurora blobs | ~0.08-0.14 opacity | 0.20-0.35 opacity |
| Stars | Barely visible | Clearly twinkling |
| Card background | Grey glass (white 3%) | Colour-tinted glass (accent 3-8%) |
| Card border | White 4-6% | Accent-coloured 15% |
| Card inner glow | Hidden or hover-only | Always visible at 10% |
| Icon glow pulse | Faint 15-18% | Visible 30%, bigger inset |
| Flagship border | Static or hidden | Animated rainbow gradient, always on |
| Card hover | Subtle lift | Lift + glow border + ambient bloom + coloured shadow |
| Entry animation | Gentle fade | Bouncy spring with overshoot |
| Backdrop blur | Heavy (12-20px) | Light (6px) or removed |

---

## Testing Checklist

- [ ] Screenshot the page — can you clearly see coloured light in the background? (Purple, teal, blue blobs)
- [ ] Can you distinguish each card's colour at a glance without reading the name?
- [ ] Is the flagship card border visibly animating (colour shifting)?
- [ ] Are the icon glows visibly pulsing?
- [ ] Does the entry animation have a satisfying bounce/spring feel?
- [ ] On hover: does the card light up with its accent colour?
- [ ] Do stars twinkle at clearly visible brightness?
- [ ] Does the page still fit in one viewport with no scrolling?
- [ ] `next build` passes with zero errors
- [ ] Performance > 80 on Lighthouse (canvas + blur can hit perf)

---

## The Test

Show the page to someone who has never seen it. If they don't say "that looks cool" within 3 seconds, the visual intensity isn't high enough yet.
