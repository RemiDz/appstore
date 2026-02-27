# CREATE PWA APP ICON & HOME SCREEN SUPPORT

> **Prompt for Claude Code** — Run from the `store.app` project root.
> Read the codebase first to understand the current Next.js setup, then add PWA home screen support with a beautiful generated icon.

---

## Overview

Users need to be able to save harmonicwaves.app to their phone home screen and see a beautiful, premium app icon. This requires:

1. A programmatically generated app icon (multiple sizes)
2. A `manifest.json` (Web App Manifest)
3. Proper `<meta>` tags in the `<head>` for iOS and Android
4. A splash screen colour that matches the app

---

## Step 1: Generate the App Icon

Since we can't use image editors, generate the icon using a **Node.js build script** that draws on a canvas and exports PNGs. Use the `canvas` npm package.

```bash
npm install canvas --save-dev
```

Create `scripts/generate-icons.mjs`:

```js
import { createCanvas } from 'canvas';
import fs from 'fs';
import path from 'path';

const sizes = [16, 32, 48, 64, 128, 180, 192, 384, 512];
const outDir = path.join(process.cwd(), 'public', 'icons');

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

function drawIcon(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  const s = size;
  const cx = s / 2;
  const cy = s / 2;

  // ── Background: deep purple-black with radial gradient ──
  const bgGrad = ctx.createRadialGradient(cx * 0.7, cy * 0.4, 0, cx, cy, s * 0.75);
  bgGrad.addColorStop(0, '#1a1035');
  bgGrad.addColorStop(0.5, '#0e0820');
  bgGrad.addColorStop(1, '#080414');
  ctx.fillStyle = bgGrad;
  ctx.beginPath();
  // Rounded rectangle (the icon shape — iOS clips automatically, Android uses the mask)
  const r = s * 0.22;
  ctx.moveTo(r, 0);
  ctx.lineTo(s - r, 0);
  ctx.quadraticCurveTo(s, 0, s, r);
  ctx.lineTo(s, s - r);
  ctx.quadraticCurveTo(s, s, s - r, s);
  ctx.lineTo(r, s);
  ctx.quadraticCurveTo(0, s, 0, s - r);
  ctx.lineTo(0, r);
  ctx.quadraticCurveTo(0, 0, r, 0);
  ctx.closePath();
  ctx.fill();

  // ── Aurora glow blobs ──
  const drawBlob = (x, y, radius, r, g, b, alpha) => {
    const grad = ctx.createRadialGradient(x, y, 0, x, y, radius);
    grad.addColorStop(0, `rgba(${r},${g},${b},${alpha})`);
    grad.addColorStop(0.6, `rgba(${r},${g},${b},${alpha * 0.4})`);
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, s, s);
  };

  // Purple top-left
  drawBlob(s * 0.25, s * 0.2, s * 0.5, 120, 50, 200, 0.25);
  // Teal bottom-right
  drawBlob(s * 0.75, s * 0.75, s * 0.45, 20, 140, 200, 0.2);
  // Deep blue centre
  drawBlob(s * 0.5, s * 0.55, s * 0.4, 60, 30, 150, 0.15);

  // ── Sacred geometry — Seed of Life (7 circles) ──
  if (size >= 64) {
    ctx.strokeStyle = 'rgba(255,255,255,0.06)';
    ctx.lineWidth = Math.max(0.5, s * 0.003);

    const geoR = s * 0.18;
    // Centre circle
    ctx.beginPath();
    ctx.arc(cx, cy, geoR, 0, Math.PI * 2);
    ctx.stroke();
    // 6 surrounding circles
    for (let i = 0; i < 6; i++) {
      const angle = (i * 60) * Math.PI / 180;
      const gx = cx + geoR * Math.cos(angle);
      const gy = cy + geoR * Math.sin(angle);
      ctx.beginPath();
      ctx.arc(gx, gy, geoR, 0, Math.PI * 2);
      ctx.stroke();
    }
    // Outer ring
    ctx.strokeStyle = 'rgba(255,255,255,0.035)';
    ctx.beginPath();
    ctx.arc(cx, cy, geoR * 2, 0, Math.PI * 2);
    ctx.stroke();
  }

  // ── Central symbol: stylised "HW" monogram made of wave + tuning fork ──
  // This is the Harmonic Waves brand mark — a combination of a sine wave 
  // and a vertical harmonic line, forming an abstract sound healing symbol

  const scale = s / 512; // Scale all drawing relative to 512px base
  ctx.save();
  ctx.translate(cx, cy);

  // Main vertical line (tuning fork stem)
  ctx.strokeStyle = 'rgba(255,255,255,0.9)';
  ctx.lineWidth = Math.max(1, 4 * scale);
  ctx.lineCap = 'round';

  ctx.beginPath();
  ctx.moveTo(0, -s * 0.22);
  ctx.lineTo(0, s * 0.22);
  ctx.stroke();

  // Tuning fork prongs (top)
  ctx.lineWidth = Math.max(0.8, 3 * scale);
  ctx.strokeStyle = 'rgba(255,255,255,0.8)';

  // Left prong
  ctx.beginPath();
  ctx.moveTo(0, -s * 0.22);
  ctx.quadraticCurveTo(-s * 0.09, -s * 0.28, -s * 0.1, -s * 0.18);
  ctx.stroke();

  // Right prong
  ctx.beginPath();
  ctx.moveTo(0, -s * 0.22);
  ctx.quadraticCurveTo(s * 0.09, -s * 0.28, s * 0.1, -s * 0.18);
  ctx.stroke();

  // Sine wave crossing through the centre (horizontal)
  ctx.strokeStyle = 'rgba(255,255,255,0.5)';
  ctx.lineWidth = Math.max(0.6, 2.5 * scale);
  ctx.beginPath();
  const waveLen = s * 0.32;
  const waveAmp = s * 0.06;
  for (let i = 0; i <= 40; i++) {
    const t = i / 40;
    const x = -waveLen / 2 + waveLen * t;
    const y = Math.sin(t * Math.PI * 3) * waveAmp;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();

  // Centre glow dot
  const dotGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, s * 0.04);
  dotGrad.addColorStop(0, 'rgba(167,139,250,0.9)');
  dotGrad.addColorStop(0.5, 'rgba(167,139,250,0.3)');
  dotGrad.addColorStop(1, 'rgba(167,139,250,0)');
  ctx.fillStyle = dotGrad;
  ctx.fillRect(-s * 0.04, -s * 0.04, s * 0.08, s * 0.08);

  // Larger ambient glow around the symbol
  const ambGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, s * 0.2);
  ambGrad.addColorStop(0, 'rgba(167,139,250,0.12)');
  ambGrad.addColorStop(0.5, 'rgba(100,60,200,0.05)');
  ambGrad.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = ambGrad;
  ctx.fillRect(-s * 0.2, -s * 0.2, s * 0.4, s * 0.4);

  ctx.restore();

  // ── Subtle corner stars (only at larger sizes) ──
  if (size >= 128) {
    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    const starPositions = [
      [s * 0.15, s * 0.12, 1.2],
      [s * 0.85, s * 0.18, 0.9],
      [s * 0.12, s * 0.82, 1.0],
      [s * 0.88, s * 0.85, 0.8],
      [s * 0.7, s * 0.15, 0.6],
      [s * 0.2, s * 0.6, 0.7],
      [s * 0.8, s * 0.55, 0.5],
    ];
    starPositions.forEach(([sx, sy, sr]) => {
      ctx.beginPath();
      ctx.arc(sx, sy, sr * scale, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  return canvas;
}

// Generate all sizes
sizes.forEach((size) => {
  const canvas = drawIcon(size);
  const buffer = canvas.toBuffer('image/png');
  const filename = size === 180 ? 'apple-touch-icon.png' : `icon-${size}x${size}.png`;
  fs.writeFileSync(path.join(outDir, filename), buffer);
  console.log(`✓ Generated ${filename}`);
});

// Also generate the favicon.ico (use 32px)
const favicon32 = drawIcon(32);
fs.writeFileSync(path.join(outDir, 'favicon-32x32.png'), favicon32.toBuffer('image/png'));

// Generate OG image (1200x630)
const ogCanvas = createCanvas(1200, 630);
const ogCtx = ogCanvas.getContext('2d');

// OG background
const ogBg = ogCtx.createLinearGradient(0, 0, 1200, 630);
ogBg.addColorStop(0, '#0e0820');
ogBg.addColorStop(0.5, '#1a1035');
ogBg.addColorStop(1, '#080414');
ogCtx.fillStyle = ogBg;
ogCtx.fillRect(0, 0, 1200, 630);

// OG blobs
const ogBlob = (x, y, r, cr, cg, cb, a) => {
  const g = ogCtx.createRadialGradient(x, y, 0, x, y, r);
  g.addColorStop(0, `rgba(${cr},${cg},${cb},${a})`);
  g.addColorStop(1, 'rgba(0,0,0,0)');
  ogCtx.fillStyle = g;
  ogCtx.fillRect(0, 0, 1200, 630);
};
ogBlob(300, 200, 400, 120, 50, 200, 0.2);
ogBlob(900, 450, 350, 20, 140, 200, 0.18);
ogBlob(600, 315, 300, 60, 30, 150, 0.12);

// OG text
ogCtx.fillStyle = 'rgba(255,255,255,0.92)';
ogCtx.font = '300 52px sans-serif';
ogCtx.textAlign = 'center';
ogCtx.letterSpacing = '16px';
ogCtx.fillText('HARMONIC WAVES', 600, 280);

ogCtx.fillStyle = 'rgba(201,169,110,0.7)';
ogCtx.font = 'italic 300 28px sans-serif';
ogCtx.letterSpacing = '2px';
ogCtx.fillText('Tools for Sound Healers', 600, 330);

ogCtx.fillStyle = 'rgba(255,255,255,0.4)';
ogCtx.font = '300 18px sans-serif';
ogCtx.letterSpacing = '4px';
ogCtx.fillText('7 FREE APPS  ·  ZERO FRICTION  ·  BUILT BY A SOUND HEALER', 600, 420);

fs.writeFileSync(path.join(outDir, 'og-image.png'), ogCanvas.toBuffer('image/png'));
console.log('✓ Generated og-image.png (1200x630)');

console.log('\nAll icons generated successfully!');
```

Run the script:
```bash
node scripts/generate-icons.mjs
```

---

## Step 2: Create Web App Manifest

Create `public/manifest.json`:

```json
{
  "name": "Harmonic Waves",
  "short_name": "Harmonic Waves",
  "description": "Tools for Sound Healers — 7 free apps for frequency work, brainwave entrainment, vocal analysis, and moon-guided practice.",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#080414",
  "theme_color": "#080414",
  "orientation": "portrait",
  "icons": [
    {
      "src": "/icons/icon-48x48.png",
      "sizes": "48x48",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-64x64.png",
      "sizes": "64x64",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-128x128.png",
      "sizes": "128x128",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/icons/icon-384x384.png",
      "sizes": "384x384",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ]
}
```

---

## Step 3: Add Meta Tags to Layout

In `src/app/layout.tsx`, add these to the `<head>` (either via Next.js `metadata` export or direct tags):

### Using Next.js Metadata API:

```tsx
import type { Metadata, Viewport } from 'next';

export const viewport: Viewport = {
  themeColor: '#080414',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  title: 'Harmonic Waves — Tools for Sound Healers',
  description: '7 free apps for frequency work, brainwave entrainment, vocal analysis, and moon-guided practice. Built by a sound healer.',
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/icons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  appleWebApp: {
    capable: true,
    title: 'Harmonic Waves',
    statusBarStyle: 'black-translucent',
  },
  openGraph: {
    title: 'Harmonic Waves — Tools for Sound Healers',
    description: '7 free apps for frequency work, brainwave entrainment, vocal analysis, and moon-guided practice.',
    url: 'https://harmonicwaves.app',
    siteName: 'Harmonic Waves',
    images: [
      {
        url: '/icons/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Harmonic Waves — Tools for Sound Healers',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Harmonic Waves — Tools for Sound Healers',
    description: '7 free apps for frequency work, brainwave entrainment, and sound healing.',
    images: ['/icons/og-image.png'],
  },
};
```

### Also add these as direct tags if the metadata API doesn't cover them:

```html
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
<meta name="apple-mobile-web-app-title" content="Harmonic Waves" />
<link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
```

---

## Step 4: Verify Favicon

Ensure `public/favicon.ico` exists. If not, either:
- Copy the 32px PNG as favicon: `cp public/icons/favicon-32x32.png public/favicon.ico`
- Or use a proper ICO converter in the script (the PNG will work for most browsers)

Also add a direct link tag in layout:
```html
<link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
```

---

## Icon Design Summary

The app icon features:
- **Deep purple-black background** with aurora colour blobs (matching the hub page)
- **Seed of Life sacred geometry** pattern at low opacity
- **Central brand symbol:** a tuning fork with a sine wave crossing through — representing "harmonic waves" literally
- **Purple glow** at the centre for energy
- **Scattered star dots** at the corners
- Premium, cosmic, unmistakably a sound healing tool

At 180px on a phone home screen, it should look like a glowing portal icon — dark, colourful, with a clear central symbol that reads at small size.

---

## Testing Checklist

- [ ] `node scripts/generate-icons.mjs` runs without errors
- [ ] All PNG files generated in `public/icons/`
- [ ] `public/manifest.json` exists and is valid JSON
- [ ] Favicon shows in browser tab
- [ ] On iPhone Safari: tap Share → Add to Home Screen → icon appears correctly
- [ ] On Android Chrome: tap menu → Add to Home Screen → icon appears correctly
- [ ] When opened from home screen, app launches in standalone mode (no browser chrome)
- [ ] Status bar is dark/translucent (not white)
- [ ] OG image shows correctly when link is shared on social media
- [ ] `next build` passes with zero errors

---

## Add to package.json Scripts

```json
{
  "scripts": {
    "generate-icons": "node scripts/generate-icons.mjs",
    "prebuild": "node scripts/generate-icons.mjs"
  }
}
```

This ensures icons are regenerated on every build.

---

## Important Notes

- If `canvas` npm package fails to install (it needs native dependencies), fall back to creating the icons as **inline SVGs rendered to PNG via a browser-based script** or simply create them as static SVGs in `public/icons/` and reference those directly
- The apple-touch-icon MUST be exactly 180×180 for iOS
- The 512×512 icon with `purpose: "any maskable"` is required for Android adaptive icons
- The `background_color` in manifest should match the app's background (#080414)
- `display: "standalone"` removes the browser chrome when launched from home screen
