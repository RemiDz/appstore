# FIT LOGO TO AVAILABLE SPACE

> **Prompt for Claude Code** — Run from the `store.app` project root.
> **Only change how the logo size is determined.** Do not change the logo component itself or any other layout.

---

## What to Do

The logo should **measure the actual gap** between the header and the apps at runtime and size itself to fill it.

### Implementation

1. Add a `ref` to the header element (the title/subtitle/divider section) and a `ref` to the first app element (the Nestorium flagship card or the app grid container).

2. On mount (and on resize), measure:
```tsx
const headerBottom = headerRef.current.getBoundingClientRect().bottom;
const appsTop = appsRef.current.getBoundingClientRect().top;
const gap = appsTop - headerBottom;
const logoSize = Math.floor(gap * 0.9); // 90% of gap, leaving a tiny breathing room
```

3. Pass that calculated value as the `size` prop to `<HarmonicLogo>`.

### Example:
```tsx
const headerRef = useRef<HTMLDivElement>(null);
const appsRef = useRef<HTMLDivElement>(null);
const [logoSize, setLogoSize] = useState(200); // sensible default before measurement

useEffect(() => {
  const measure = () => {
    if (!headerRef.current || !appsRef.current) return;
    const gap = appsRef.current.getBoundingClientRect().top - headerRef.current.getBoundingClientRect().bottom;
    setLogoSize(Math.floor(Math.max(140, gap * 0.9)));
  };
  measure();
  window.addEventListener('resize', measure);
  return () => window.removeEventListener('resize', measure);
}, []);

// Then wrap the header section:
<div ref={headerRef}>
  {/* title, subtitle, divider */}
</div>

<HarmonicLogo size={logoSize} />

<div ref={appsRef}>
  {/* Nestorium card, grid, etc */}
</div>
```

This way the logo automatically fills whatever space is available on any screen size — no guessing, no fixed pixel values.

---

## Important

- The logo container itself should have zero margin/padding so the measured gap is accurate
- The logo canvas is square (`width = height = size`), so it will fill the gap vertically and centre horizontally
- Minimum size floor of 140px so it never gets too tiny on very short screens
- The `0.9` multiplier leaves ~5% breathing room above and below so it doesn't feel cramped — adjust to 0.85 or 0.95 if needed

---

## Rules

- **ONLY** add refs to header/apps and calculate the size
- **DO NOT** change the logo component internals
- **DO NOT** change the layout, spacing, or any other components
