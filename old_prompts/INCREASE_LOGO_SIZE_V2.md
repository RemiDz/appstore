# INCREASE INTERACTIVE LOGO SIZE

> **Prompt for Claude Code** — Run from the `store.app` project root.
> **One change only.**

---

## What to Do

The interactive 3D logo is too small. Increase the `size` prop passed to `<HarmonicLogo>` in the page from its current value to `240`.

If there's a responsive size calculation, adjust it too — minimum (short phones) should be `200`, default `240`.

```tsx
const logoSize = typeof window !== 'undefined' && window.innerHeight < 700 ? 200 : 240;
<HarmonicLogo size={logoSize} />
```

**The page must still fit in one viewport with no scrolling.** If 240 causes scrolling on 375×812, try 220. Find the largest size that fills the space without breaking the layout.

---

## Rules

- **ONLY** change the size prop value
- **DO NOT** change the logo component, page layout, or anything else
