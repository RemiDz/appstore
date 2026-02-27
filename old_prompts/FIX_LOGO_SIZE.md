# FIX LOGO SIZE AND CENTERING

> **Prompt for Claude Code** — Run from the `store.app` project root.
> Read the codebase and look at the current logo placement. **Only fix the logo size and position.**

---

## The Problem

The logo is tiny and not centred in the gap between the header and the apps. The dynamic measurement approach isn't working correctly — the logo is rendering much smaller than the available space.

---

## The Fix

Remove any dynamic size calculation. Instead, use CSS flexbox to make the logo container **grow to fill all available space** between the header and the apps, then size the canvas to match.

### Strategy: Use `flex: 1` on the logo container

The page layout should be a full-viewport flex column:

```
┌─────────────────────┐ ← 100vh flex column
│ Header (fixed size)  │ ← flex: none
│                      │
│   ┌──────────────┐   │
│   │              │   │
│   │    LOGO      │   │ ← flex: 1 (takes ALL remaining space)
│   │              │   │
│   └──────────────┘   │
│                      │
│ Apps (fixed size)    │ ← flex: none
│ Footer (fixed size)  │ ← flex: none
└─────────────────────┘
```

### Implementation

1. Make sure the outermost page container is:
```css
display: flex;
flex-direction: column;
height: 100vh; /* or 100dvh */
overflow: hidden;
```

2. The header section (title + subtitle + divider) should be `flex-shrink: 0` (don't compress).

3. The logo container should be:
```tsx
<div
  ref={logoContainerRef}
  style={{
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 0, // important for flex children
  }}
>
  <HarmonicLogo size={logoSize} />
</div>
```

4. The apps section (flagship + grid + install button + footer) should be `flex-shrink: 0`.

5. Measure the logo container's actual rendered height and use it as the logo size:
```tsx
const logoContainerRef = useRef<HTMLDivElement>(null);
const [logoSize, setLogoSize] = useState(180);

useEffect(() => {
  const measure = () => {
    if (!logoContainerRef.current) return;
    const h = logoContainerRef.current.clientHeight;
    const w = logoContainerRef.current.clientWidth;
    // Logo is square, so use the smaller of width and height
    // Use 95% to leave slight breathing room
    const s = Math.floor(Math.min(h, w) * 0.95);
    setLogoSize(Math.max(140, s));
  };
  // Measure after layout settles
  requestAnimationFrame(() => {
    requestAnimationFrame(measure);
  });
  window.addEventListener('resize', measure);
  return () => window.removeEventListener('resize', measure);
}, []);
```

This way the logo container gets ALL leftover vertical space via `flex: 1`, then the canvas sizes itself to fill that container. It will be automatically centred both horizontally and vertically.

---

## Key Points

- The logo container MUST have `flex: 1` — this is what gives it the remaining space
- The header and apps sections MUST have `flex-shrink: 0` so they don't compress
- The page container MUST have `height: 100vh` (or `100dvh`) and `overflow: hidden`
- `alignItems: 'center'` + `justifyContent: 'center'` on the logo container centres it perfectly
- Use `requestAnimationFrame` double-wrapped for the measurement to ensure layout has settled

---

## Rules

- Fix the logo container to use `flex: 1`
- Ensure the page is a `100vh` flex column
- **DO NOT** change the HarmonicLogo component internals (the canvas drawing code)
- **DO NOT** change the app cards, header styling, or any other visual elements
- The page must still not scroll
