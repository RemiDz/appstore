# MAKE LOGO FILL AVAILABLE SPACE

> **Prompt for Claude Code** — Run from the `store.app` project root.
> **One change only.**

---

## What to Do

The logo is still too small. Instead of a fixed pixel size, make it **dynamically fill the available vertical space** between the header and the apps.

Replace the fixed size prop with a calculated value that uses all the gap:

```tsx
// Calculate available space between header bottom and first app card top
// Then use that as the logo size (square, so width = height = available gap)
const [logoSize, setLogoSize] = useState(280);

useEffect(() => {
  const calculate = () => {
    const vh = window.innerHeight;
    // Approximate: header ~100px, apps ~320px, footer ~40px, spacing ~40px
    // Logo gets everything else
    const available = vh - 500; // adjust this number based on actual layout
    setLogoSize(Math.max(200, Math.min(available, 340)));
  };
  calculate();
  window.addEventListener('resize', calculate);
  return () => window.removeEventListener('resize', calculate);
}, []);
```

The exact calculation depends on the actual page layout. The key principle: **the logo should be as large as possible while the page still fits in one viewport with no scrolling.**

As a simpler approach, just try these values in order and use the largest that doesn't cause scrolling:
- Try `320` first
- If scrolls, try `300`
- If scrolls, try `280`

On shorter phones (height < 700), drop to `220`.

---

## Rules

- **ONLY** change the logo size
- **DO NOT** change the logo component, page layout, or anything else
- Page must NOT scroll on any phone (375×667 minimum)
