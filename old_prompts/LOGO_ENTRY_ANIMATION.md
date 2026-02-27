# ADD SMOOTH ROTATION ENTRY ANIMATION TO LOGO

> **Prompt for Claude Code** — Run from the `store.app` project root.
> **Only add an entry animation to the logo container.** Do not change the logo component or anything else.

---

## What to Do

When the page loads, the logo should smoothly fade in while rotating. No blur effects.

Add this to the logo container:

```tsx
<div
  ref={logoContainerRef}
  style={{
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 0,
    opacity: 0,
    animation: 'logoEntry 2.2s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards',
  }}
>
  <HarmonicLogo size={logoSize} />
</div>
```

Keyframe:

```css
@keyframes logoEntry {
  0% {
    opacity: 0;
    transform: scale(0.5) rotate(-180deg);
  }
  60% {
    opacity: 1;
    transform: scale(1.02) rotate(8deg);
  }
  80% {
    transform: scale(0.99) rotate(-3deg);
  }
  100% {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
}
```

### What this does:
- Starts invisible, half-size, rotated -180°
- Spins in while scaling up and fading in
- Slight overshoot (1.02 scale, 8° past zero)
- Gentle settle-back (0.99 scale, -3°)
- Lands perfectly at scale 1, rotation 0
- 2.2s duration, 0.3s delay
- No blur, no filter — pure transform and opacity (GPU-accelerated)

---

## Rules

- **ONLY** add the animation to the logo container
- **DO NOT** use blur or filter effects
- **DO NOT** change anything else
