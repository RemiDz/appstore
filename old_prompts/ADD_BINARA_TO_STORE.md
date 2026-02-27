# ADD BINARA TO HARMONIC WAVES STORE

> **Prompt for Claude Code** — Run from the `store.app` project root.

---

## Context

The Harmonic Waves hub (harmonicwaves.app) is the central app store for the sound healing ecosystem. It currently has 5 apps, one per element:

| App | Element | URL | Colour |
|---|---|---|---|
| Earth Pulse | 🌍 Earth | shumann.app | `#A0714F` |
| NestorLab | 💧 Water | nestorlab.app | `#3A9BC1` |
| Overtone Singer | 🔥 Fire | overtonesinger.com | `#E8621A` |
| Harmonic Intake (Sonarus) | 🌬️ Air | sonarus.app | `#7ECBCE` |
| Lunar Practitioner | ✨ Ether | lunata.app | `#8B6FE8` |

We are adding a **6th app: Binara** — a dedicated binaural beats generator and brainwave entrainment tool at **binara.app**.

---

## 1. App Definition

Add Binara to the apps data file (likely `src/lib/apps.ts` or similar):

```ts
{
  id: 'binara',
  name: 'Binara',
  tagline: 'Tune your brainwaves',
  description: 'Pure binaural beats and brainwave entrainment. Choose your target state — focus, sleep, meditation, creativity — and let precise stereo frequencies guide your brain into resonance. Headphones required.',
  element: 'Water',
  features: ['Binaural Beats', 'Brainwave Presets', 'Custom Frequencies', 'Session Timer'],
  pricing: 'free',
  url: 'https://binara.app',
  accentColor: '#1E6F8C',
}
```

### Element assignment: Water 💧

Binara sits alongside NestorLab in the Water element. Reasoning:
- Binaural beats are flowing, wave-based, rhythmic — inherently Water
- NestorLab is the broad "flow into frequency" toolkit; Binara is the focused, dedicated binaural instrument
- Water can hold multiple apps — it's the element of depth and layers

**Accent colour: `#1E6F8C`** — a deeper teal-blue that distinguishes it from NestorLab's `#3A9BC1` while staying within the Water palette.

---

## 2. Create Unique App Icon / Visual Identity

Generate a unique icon/visual for Binara that fits the hub's existing aesthetic. The icon should:

### Design spec
- **Shape:** Two overlapping sine waves forming a binaural interference pattern — one wave slightly offset from the other, merging in the centre to show the "beat" frequency
- **Style:** Clean, geometric, slightly organic — matching the sacred geometry aesthetic of the hub
- **Colour:** Gradient from `#1E6F8C` (deep teal) to `#3FC5D9` (bright cyan)
- **Background:** Transparent or dark (`#0A0F1A`) — must work on the hub's dark theme
- **Variants needed:**
  1. **Hub card icon** — SVG, ~64×64px logical, used in the app card on the store page
  2. **Favicon** — 32×32 `.ico` or `.png` for binara.app itself
  3. **OG image icon** — 192×192 PNG for social sharing / manifest
  4. **Apple touch icon** — 180×180 PNG

### Icon concept (SVG approach)
Create the icon as an inline SVG component (e.g. `BinaraIcon.tsx`) so it can be rendered directly in the hub. The design:
- Two sine wave paths, one shifted ~10% phase offset
- Where they overlap/intersect, render a subtle glow or brighter node
- Optionally: a small "headphones" silhouette subtly integrated or a circular boundary suggesting a head/mind
- Keep it minimal — it should read clearly at 32px and look stunning at 192px

```tsx
// Example structure — adapt to match existing icon component patterns in the project
export function BinaraIcon({ size = 64, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Circular boundary */}
      <circle cx="32" cy="32" r="30" stroke="url(#binara-grad)" strokeWidth="1.5" opacity="0.3" />
      
      {/* Left wave */}
      <path
        d="M12 32 C18 20, 26 20, 32 32 C38 44, 46 44, 52 32"
        stroke="url(#binara-grad)"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.8"
      />
      
      {/* Right wave — phase shifted */}
      <path
        d="M12 32 C18 44, 26 44, 32 32 C38 20, 46 20, 52 32"
        stroke="url(#binara-grad)"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.6"
      />
      
      {/* Centre convergence glow */}
      <circle cx="32" cy="32" r="4" fill="url(#binara-grad)" opacity="0.5" />
      <circle cx="32" cy="32" r="2" fill="#3FC5D9" opacity="0.9" />

      <defs>
        <linearGradient id="binara-grad" x1="0" y1="0" x2="64" y2="64">
          <stop offset="0%" stopColor="#1E6F8C" />
          <stop offset="100%" stopColor="#3FC5D9" />
        </linearGradient>
      </defs>
    </svg>
  );
}
```

### Static icon generation
Also export static PNG versions for favicon/OG/apple-touch:
- Use a canvas or sharp/puppeteer to render the SVG at 32, 180, and 192px
- Or create them manually and save to `public/icons/binara-{size}.png`
- Save favicon as `public/favicon-binara.ico` (for binara.app itself, not the hub)

---

## 3. Integrate into the Hub

### App card
Binara should appear in the Water element section of the hub. If the current layout groups apps by element:
- Water section now has **two apps**: NestorLab and Binara
- NestorLab should appear first (it's the broader toolkit), Binara second (focused tool)

If the hub uses a mandala/pentagon layout with one app per element, you'll need to adapt:
- **Option A:** Allow elements to hold multiple orbs — Water gets two orbs, slightly offset
- **Option B:** Add a secondary ring or inner position for the 6th app
- **Option C:** If the layout is a scrollable card grid (not mandala), simply add the card in the Water section

**Check the current layout in `src/` and choose the approach that requires the least restructuring.** If it's the mandala pentagon, Option A (two orbs in Water position, stacked or side-by-side with slight offset) is cleanest.

### Card content
Match the existing card component structure exactly. The Binara card should include:
- BinaraIcon component (or static image)
- App name: "Binara"
- Tagline: "Tune your brainwaves"
- Element badge: 💧 Water
- Feature pills: `Binaural Beats` · `Brainwave Presets` · `Custom Frequencies` · `Session Timer`
- Pricing badge: Free
- CTA button: "Open App →" linking to `https://binara.app`
- Accent glow on hover using `#1E6F8C`

---

## 4. Update Element Config (if applicable)

If `src/lib/elements.ts` defines per-element data including app counts or references, update Water to reflect it now holds two apps.

---

## 5. Update Metadata

If the hub has any of these, update them:
- App count in hero section copy (e.g. "Five elemental apps" → "Six sound healing tools" or similar)
- `<meta>` description if it mentions the number of apps
- Any JSON-LD or sitemap references

---

## 6. Testing Checklist

After implementation, verify:
- [ ] Binara card renders correctly on mobile (375px) and desktop (1440px)
- [ ] Hover glow uses Binara's accent colour, not NestorLab's
- [ ] "Open App →" link opens `https://binara.app` in a new tab
- [ ] BinaraIcon SVG renders crisply at all sizes
- [ ] Water section gracefully shows two apps without layout breakage
- [ ] Static PNGs generated for favicon, OG image, apple-touch-icon
- [ ] `next build` passes with no errors
- [ ] No visual regression on the other 5 app cards

---

## 7. Files to Create / Modify

**Create:**
- `src/components/icons/BinaraIcon.tsx` — SVG icon component
- `public/icons/binara-32.png` — favicon
- `public/icons/binara-180.png` — apple touch icon
- `public/icons/binara-192.png` — OG / manifest icon

**Modify:**
- `src/lib/apps.ts` — add Binara to the apps array
- `src/lib/elements.ts` — update Water element if it tracks associated apps
- Hub page component (likely `src/app/page.tsx` or whichever renders the app grid/mandala) — ensure 6 apps render
- Hero section — update app count copy if hardcoded
- Any layout component that assumes exactly 5 apps

---

## Design Quality Bar

Reference: lunata.app, sonarus.app — match their level of polish. The icon should feel like it belongs in the same family as the other 5 app icons. Glass morphism, subtle glow, smooth animations. No generic placeholder energy.
