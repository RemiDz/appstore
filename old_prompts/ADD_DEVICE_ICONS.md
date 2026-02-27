# ADD DEVICE TYPE ICONS TO APP CARDS

> **Prompt for Claude Code** — Run from the `store.app` project root.
> Read the codebase first. Small addition — no layout changes.

---

## What

Add a small device icon to each app card indicating whether the app is best used on desktop or mobile. This helps users instantly understand which device to use.

---

## Device Assignments

| App | Device | Icon |
|-----|--------|------|
| **Nestorium** | 🖥 Desktop | Laptop/monitor icon |
| **Binara** | 📱 Mobile | Phone icon |
| **Overtone Singer** | 📱 Mobile | Phone icon |
| **Sonarus** | 📱 Mobile | Phone icon |
| **Lunar Practitioner** | 📱 Mobile | Phone icon |
| **Tidara** | 📱 Mobile | Phone icon |
| **Earth Pulse** | 📱 Mobile | Phone icon |

---

## Data Change

Add a `device` field to each app in the apps data file:

```ts
device: 'desktop' | 'mobile'
```

Nestorium gets `'desktop'`, all others get `'mobile'`.

---

## Icon SVGs

Create two tiny inline SVG icons. Keep them simple, single-stroke, matching the existing icon style (round caps, no fill).

### Desktop icon (laptop/monitor):
```tsx
function DesktopIcon({ size = 14, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <rect x="2" y="2" width="12" height="8" rx="1.5" stroke={color} strokeWidth="1.2" />
      <path d="M5 13h6" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
      <path d="M8 10v3" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}
```

### Mobile icon (phone):
```tsx
function MobileIcon({ size = 14, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <rect x="4" y="1" width="8" height="14" rx="2" stroke={color} strokeWidth="1.2" />
      <path d="M7 12.5h2" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}
```

---

## Placement

### On grid cards (Binara, Overtone Singer, Sonarus, Lunar, Tidara, Earth Pulse):

Position the phone icon in the **top-right corner** of the card:

```tsx
<div style={{
  position: 'absolute',
  top: 8,
  right: 8,
  opacity: 0.3,
  transition: 'opacity 0.25s ease',
}}>
  <MobileIcon size={13} color="rgba(255,255,255,0.7)" />
</div>
```

On hover, increase opacity to 0.55:
```css
.card:hover .device-icon { opacity: 0.55; }
```

### On the flagship card (Nestorium):

Position the desktop icon on the **right side** of the card, vertically centred:

```tsx
<div style={{
  position: 'absolute',
  top: '50%',
  right: 16,
  transform: 'translateY(-50%)',
  opacity: 0.25,
  transition: 'opacity 0.25s ease',
}}>
  <DesktopIcon size={16} color="rgba(255,255,255,0.7)" />
</div>
```

On hover, increase to 0.5.

---

## Styling Rules

- Icons should be **subtle by default** (0.25–0.3 opacity) — they're informational, not decorative
- On hover they become slightly more visible (0.5–0.55 opacity)
- Use `rgba(255,255,255,0.7)` as the stroke colour so they work on all card tints
- Do NOT use emoji — use the SVG icons defined above
- Keep them small: 13px on grid cards, 16px on flagship
- They should never compete with the app's main icon or name

---

## Also Update the Overlay

When a user taps a card and the detail overlay opens, show the device info as a small label next to the app name or below the tagline:

```tsx
<div style={{
  display: 'inline-flex',
  alignItems: 'center',
  gap: 5,
  marginTop: 8,
  fontSize: 10,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.35)',
}}>
  {app.device === 'desktop' ? <DesktopIcon size={12} /> : <MobileIcon size={12} />}
  {app.device === 'desktop' ? 'Best on desktop' : 'Mobile optimised'}
</div>
```

---

## Testing Checklist

- [ ] Nestorium flagship card shows a laptop icon (top-right or right-centre)
- [ ] All 6 grid cards show a phone icon in top-right corner
- [ ] Icons are subtle (barely visible) at rest, slightly brighter on hover
- [ ] Icons don't overlap or crowd the app name or main icon
- [ ] Overlay shows "Best on desktop" or "Mobile optimised" label
- [ ] Icons render crisply at 13-16px (no blur, clean strokes)
- [ ] No layout shift — cards stay same size
- [ ] `next build` passes
