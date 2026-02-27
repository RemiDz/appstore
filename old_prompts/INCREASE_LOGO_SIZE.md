# INCREASE LOGO SIZE

> **Prompt for Claude Code** — Run from the `store.app` project root.
> **One change only.**

---

## What to Do

The HarmonicLogo canvas is currently too small — there's wasted space above and below it. Increase the `size` prop from its current value to `200`. 

Find where `<HarmonicLogo>` is rendered in the page and change:

```tsx
<HarmonicLogo size={200} />
```

If there's a responsive size calculation, adjust that too — the minimum (for short phones) should be `170`, the default `200`.

**The page must still fit in one viewport with no scrolling.** If 200 causes scrolling on 375×812, try 190. Find the largest size that fills the gap without breaking the layout.

---

## Rules

- **ONLY** change the size prop value
- **DO NOT** change the logo component, page layout, or anything else
