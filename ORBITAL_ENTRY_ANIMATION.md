# ADD ORBITAL 3D ENTRY ANIMATION TO LOGO

> **Prompt for Claude Code** — Run from the `store.app` project root.
> This changes the **HarmonicLogo component internals** to add an orbital entry animation using the existing 3D rotation system. Also add a fade-in on the container.

---

## What We Want

When the page loads, the 3D sacred geometry should perform a smooth **orbital globe rotation** — spinning around both X and Y axes simultaneously, starting fast and decelerating to a gentle idle drift. Like a globe being spun and slowly settling.

This CANNOT be done with CSS — it must use the component's own `rotRef` values that drive the 3D projection.

---

## Changes to `HarmonicLogo.tsx`

### 1. Add an entry velocity boost at the start

Inside the `useEffect`, after initialising `rotRef` and `velRef`, set a high initial velocity so the geometry is already spinning when it first renders:

```ts
// Initial orbital spin — fast rotation that decelerates naturally
velRef.current = { x: 0.06, y: 0.08 };
```

The existing momentum decay (`*= 0.97` each frame) will naturally decelerate this over ~3-4 seconds until it settles into the gentle auto-rotation.

That's it for the 3D rotation — the existing physics (momentum + friction + auto-drift) handles the rest perfectly.

### 2. Add fade-in opacity

Add an `opacityRef` that animates from 0 to 1 over the first ~60 frames:

```ts
const opacityRef = useRef(0);
```

At the start of the `draw` function, increment it:
```ts
if (opacityRef.current < 1) {
  opacityRef.current = Math.min(1, opacityRef.current + 0.018); // ~55 frames to reach 1.0 ≈ 0.9s
}
ctx.globalAlpha = opacityRef.current;
```

Reset `ctx.globalAlpha = 1` at the very end of the draw function (after all drawing), so it doesn't affect the next frame's clearRect.

### 3. Add scale-in

Add a `scaleRef` that eases from 0.5 to 1.0:

```ts
const scaleRef = useRef(0.5);
```

At the start of draw:
```ts
if (scaleRef.current < 1) {
  scaleRef.current = Math.min(1, scaleRef.current + (1 - scaleRef.current) * 0.04);
}
```

Apply it by wrapping all drawing in a canvas transform:
```ts
ctx.save();
ctx.translate(cx, cy);
ctx.scale(scaleRef.current, scaleRef.current);
ctx.translate(-cx, -cy);

// ... all existing drawing code ...

ctx.restore();
ctx.globalAlpha = 1;
```

---

## Summary of All Changes

In `HarmonicLogo.tsx`:

1. Add `opacityRef = useRef(0)` and `scaleRef = useRef(0.5)` alongside existing refs
2. Set `velRef.current = { x: 0.06, y: 0.08 }` after ref initialisation (initial spin)
3. At the top of the `draw` function, before any drawing:
   ```ts
   // Entry animation
   if (opacityRef.current < 1) opacityRef.current = Math.min(1, opacityRef.current + 0.018);
   if (scaleRef.current < 1) scaleRef.current = Math.min(1, scaleRef.current + (1 - scaleRef.current) * 0.04);
   
   ctx.clearRect(0, 0, s, s);
   ctx.globalAlpha = opacityRef.current;
   ctx.save();
   ctx.translate(cx, cy);
   ctx.scale(scaleRef.current, scaleRef.current);
   ctx.translate(-cx, -cy);
   ```
4. At the very end of draw, after all drawing, before `requestAnimationFrame`:
   ```ts
   ctx.restore();
   ctx.globalAlpha = 1;
   ```

That's all. No CSS animations needed. The result:
- **Frame 0:** invisible, half-size, geometry spinning fast in 3D orbital motion
- **~0.5s:** fading in, growing, geometry still spinning noticeably
- **~2s:** fully visible, full size, spin decelerating
- **~4s:** spin nearly stopped, settling into gentle auto-drift
- **Ongoing:** gentle idle rotation as before

The deceleration is exponential (0.97 per frame), so it feels natural — fast initial spin that smoothly settles, like a physical globe.

---

## Rules

- **ONLY** modify HarmonicLogo.tsx as described above
- **DO NOT** change placement, container, size prop, or any other component
- **DO NOT** add any CSS animations — this is all canvas-driven
- **DO NOT** change any of the existing drawing/rendering code — only wrap it with the scale transform and add the entry refs
