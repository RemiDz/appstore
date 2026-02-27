# REGENERATE APP ICON TO MATCH PAGE LOGO

> **Prompt for Claude Code** — Run from the `store.app` project root.
> The current home screen icon doesn't match the animated logo on the page. Rewrite the icon generation script so the static icon is a snapshot of the actual page logo: sacred geometry Seed of Life + frequency waves + energy core.

---

## What the Icon Should Look Like

A static frame of the animated HarmonicLogo component that's already on the page. Specifically:

1. **Background:** Deep purple-black radial gradient (`#1a1035` centre → `#0e0820` mid → `#080414` edge) with subtle aurora colour blobs (purple top-left, teal bottom-right, deep blue centre)
2. **Sacred geometry:** Seed of Life pattern — 7 circles (1 centre + 6 petals) in soft purple (`rgba(167,139,250,0.15-0.18)`), plus 2 outer boundary rings
3. **Frequency wave:** A horizontal sine wave composition cutting through the centre, with a cyan-to-purple gradient stroke — the signature element
4. **Ghost wave:** A fainter phase-shifted second wave behind the main one
5. **Energy core:** Bright white-to-purple glowing dot at the dead centre
6. **Subtle stars:** A few tiny white dots scattered around (only at sizes ≥128px)

It should look like someone screenshotted the animated logo at a perfect moment.

---

## Step 1: Update `scripts/generate-icons.mjs`

Replace the `drawIcon` function with this. Install `canvas` if not already present:

```bash
npm install canvas --save-dev
```

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

  // ── Background gradient ──
  const bgGrd = ctx.createRadialGradient(cx * 0.6, cy * 0.4, 0, cx, cy, s * 0.72);
  bgGrd.addColorStop(0, '#1a1035');
  bgGrd.addColorStop(0.5, '#0e0820');
  bgGrd.addColorStop(1, '#080414');
  ctx.fillStyle = bgGrd;
  ctx.fillRect(0, 0, s, s);

  // ── Aurora blobs ──
  const drawBlob = (x, y, r, cr, cg, cb, alpha) => {
    const grd = ctx.createRadialGradient(x, y, 0, x, y, r);
    grd.addColorStop(0, `rgba(${cr},${cg},${cb},${alpha})`);
    grd.addColorStop(0.6, `rgba(${cr},${cg},${cb},${alpha * 0.35})`);
    grd.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, s, s);
  };
  drawBlob(s * 0.25, s * 0.2, s * 0.5, 120, 60, 220, 0.2);
  drawBlob(s * 0.75, s * 0.75, s * 0.45, 20, 130, 200, 0.15);
  drawBlob(s * 0.5, s * 0.55, s * 0.4, 70, 30, 150, 0.12);

  // ── Emanation rings ──
  if (size >= 48) {
    const ringRadii = [0.22, 0.30, 0.38, 0.44];
    const ringAlphas = [0.14, 0.10, 0.06, 0.03];
    ringRadii.forEach((rr, i) => {
      ctx.beginPath();
      ctx.arc(cx, cy, s * rr, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(167,139,250,${ringAlphas[i]})`;
      ctx.lineWidth = Math.max(0.5, s * 0.002);
      ctx.stroke();
    });
  }

  // ── Sacred geometry — Seed of Life ──
  if (size >= 32) {
    const geoR = s * 0.14;
    ctx.strokeStyle = `rgba(167,139,250,0.17)`;
    ctx.lineWidth = Math.max(0.5, s * 0.0025);

    // Centre circle
    ctx.beginPath();
    ctx.arc(cx, cy, geoR, 0, Math.PI * 2);
    ctx.stroke();

    // 6 petal circles
    for (let i = 0; i < 6; i++) {
      const angle = (i * 60) * Math.PI / 180;
      const gx = cx + geoR * Math.cos(angle);
      const gy = cy + geoR * Math.sin(angle);
      ctx.beginPath();
      ctx.arc(gx, gy, geoR, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(167,139,250,${0.10 + (i % 2) * 0.04})`;
      ctx.stroke();
    }

    // Outer rings
    ctx.beginPath();
    ctx.arc(cx, cy, geoR * 2, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(167,139,250,0.07)';
    ctx.lineWidth = Math.max(0.4, s * 0.002);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(cx, cy, geoR * 2.6, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(120,140,250,0.04)';
    ctx.stroke();
  }

  // ── Primary frequency wave ──
  if (size >= 32) {
    const waveWidth = s * 0.38;
    ctx.save();
    ctx.beginPath();
    for (let x = -waveWidth; x <= waveWidth; x += 0.5) {
      const norm = x / waveWidth;
      const envelope = 1 - norm * norm;
      // Use a fixed time value to get a nice-looking wave frame
      const freq1 = Math.sin(norm * 12 + 1.8) * envelope;
      const freq2 = Math.sin(norm * 8 - 1.2) * envelope * 0.4;
      const py = cy + (freq1 + freq2) * s * 0.045;
      if (x === -waveWidth) ctx.moveTo(cx + x, py);
      else ctx.lineTo(cx + x, py);
    }
    const waveGrd = ctx.createLinearGradient(cx - waveWidth, 0, cx + waveWidth, 0);
    waveGrd.addColorStop(0, 'rgba(34,211,238,0)');
    waveGrd.addColorStop(0.2, 'rgba(34,211,238,0.55)');
    waveGrd.addColorStop(0.5, 'rgba(167,139,250,0.8)');
    waveGrd.addColorStop(0.8, 'rgba(34,211,238,0.55)');
    waveGrd.addColorStop(1, 'rgba(34,211,238,0)');
    ctx.strokeStyle = waveGrd;
    ctx.lineWidth = Math.max(1, s * 0.005);
    ctx.lineCap = 'round';
    ctx.stroke();
    ctx.restore();

    // Ghost wave (phase-shifted)
    ctx.save();
    ctx.beginPath();
    for (let x = -waveWidth; x <= waveWidth; x += 0.5) {
      const norm = x / waveWidth;
      const envelope = 1 - norm * norm;
      const freq1 = Math.sin(norm * 12 + 1.8 + 1.2) * envelope;
      const freq2 = Math.sin(norm * 8 - 1.2 + 0.8) * envelope * 0.4;
      const py = cy + (freq1 + freq2) * s * 0.035;
      if (x === -waveWidth) ctx.moveTo(cx + x, py);
      else ctx.lineTo(cx + x, py);
    }
    const wave2Grd = ctx.createLinearGradient(cx - waveWidth, 0, cx + waveWidth, 0);
    wave2Grd.addColorStop(0, 'rgba(192,132,252,0)');
    wave2Grd.addColorStop(0.3, 'rgba(192,132,252,0.18)');
    wave2Grd.addColorStop(0.5, 'rgba(167,139,250,0.25)');
    wave2Grd.addColorStop(0.7, 'rgba(192,132,252,0.18)');
    wave2Grd.addColorStop(1, 'rgba(192,132,252,0)');
    ctx.strokeStyle = wave2Grd;
    ctx.lineWidth = Math.max(0.6, s * 0.003);
    ctx.stroke();
    ctx.restore();
  }

  // ── Energy core ──
  // Outer halo
  const haloGrd = ctx.createRadialGradient(cx, cy, 0, cx, cy, s * 0.08);
  haloGrd.addColorStop(0, 'rgba(200,170,255,0.35)');
  haloGrd.addColorStop(0.5, 'rgba(140,100,240,0.12)');
  haloGrd.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = haloGrd;
  ctx.fillRect(cx - s * 0.08, cy - s * 0.08, s * 0.16, s * 0.16);

  // Bright core
  const coreR = Math.max(1, s * 0.025);
  const coreGrd = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR);
  coreGrd.addColorStop(0, 'rgba(255,255,255,0.95)');
  coreGrd.addColorStop(0.4, 'rgba(200,180,255,0.6)');
  coreGrd.addColorStop(1, 'rgba(167,139,250,0)');
  ctx.fillStyle = coreGrd;
  ctx.beginPath();
  ctx.arc(cx, cy, coreR, 0, Math.PI * 2);
  ctx.fill();

  // ── Orbiting particles ──
  if (size >= 64) {
    const orbitR = s * 0.14 * 2 + s * 0.02;
    for (let i = 0; i < 8; i++) {
      // Fixed positions (as if frozen at time=0)
      const orbitAngle = i * (Math.PI * 2 / 8);
      const px = cx + orbitR * Math.cos(orbitAngle);
      const py = cy + orbitR * Math.sin(orbitAngle);
      ctx.beginPath();
      ctx.arc(px, py, Math.max(0.6, s * 0.003), 0, Math.PI * 2);
      ctx.fillStyle = `rgba(167,139,250,${0.25 + (i % 3) * 0.08})`;
      ctx.fill();
    }
  }

  // ── Stars ──
  if (size >= 128) {
    const stars = [
      [0.12, 0.1], [0.88, 0.15], [0.1, 0.85], [0.9, 0.88],
      [0.72, 0.08], [0.18, 0.6], [0.82, 0.55], [0.5, 0.92],
    ];
    stars.forEach(([sx, sy]) => {
      ctx.beginPath();
      ctx.arc(s * sx, s * sy, Math.max(0.4, s * 0.0025), 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,0.3)';
      ctx.fill();
    });
  }

  return canvas;
}

// ── Generate all sizes ──
sizes.forEach((size) => {
  const canvas = drawIcon(size);
  const buffer = canvas.toBuffer('image/png');
  const filename = size === 180 ? 'apple-touch-icon.png' : `icon-${size}x${size}.png`;
  fs.writeFileSync(path.join(outDir, filename), buffer);
  console.log(`✓ Generated ${filename}`);
});

// Favicon
fs.writeFileSync(
  path.join(outDir, 'favicon-32x32.png'),
  drawIcon(32).toBuffer('image/png')
);
console.log('✓ Generated favicon-32x32.png');

// OG image (1200×630)
const ogW = 1200, ogH = 630;
const ogCanvas = createCanvas(ogW, ogH);
const ogCtx = ogCanvas.getContext('2d');

// OG background
const ogBg = ogCtx.createLinearGradient(0, 0, ogW, ogH);
ogBg.addColorStop(0, '#0e0820');
ogBg.addColorStop(0.5, '#1a1035');
ogBg.addColorStop(1, '#080414');
ogCtx.fillStyle = ogBg;
ogCtx.fillRect(0, 0, ogW, ogH);

// OG aurora blobs
const ogBlob = (x, y, r, cr, cg, cb, a) => {
  const g = ogCtx.createRadialGradient(x, y, 0, x, y, r);
  g.addColorStop(0, `rgba(${cr},${cg},${cb},${a})`);
  g.addColorStop(1, 'rgba(0,0,0,0)');
  ogCtx.fillStyle = g;
  ogCtx.fillRect(0, 0, ogW, ogH);
};
ogBlob(300, 180, 400, 120, 50, 200, 0.18);
ogBlob(900, 450, 350, 20, 140, 200, 0.14);
ogBlob(600, 315, 300, 60, 30, 150, 0.10);

// Draw the logo at centre of OG image
const logoSize = 280;
const logoCanvas = drawIcon(logoSize);
ogCtx.drawImage(logoCanvas, (ogW - logoSize) / 2, (ogH - logoSize) / 2 - 40);

// OG text below logo
ogCtx.textAlign = 'center';
ogCtx.fillStyle = 'rgba(255,255,255,0.9)';
ogCtx.font = '300 42px sans-serif';
ogCtx.fillText('HARMONIC WAVES', ogW / 2, ogH / 2 + 130);

ogCtx.fillStyle = 'rgba(201,169,110,0.7)';
ogCtx.font = 'italic 300 22px sans-serif';
ogCtx.fillText('Tools for Sound Healers', ogW / 2, ogH / 2 + 165);

fs.writeFileSync(path.join(outDir, 'og-image.png'), ogCanvas.toBuffer('image/png'));
console.log('✓ Generated og-image.png');

console.log('\nAll icons regenerated ✓');
```

---

## Step 2: Run It

```bash
node scripts/generate-icons.mjs
```

This overwrites all existing icons in `public/icons/` with the new design.

---

## Step 3: Verify

- Open `public/icons/apple-touch-icon.png` (180×180) — it should look like a frozen frame of the animated logo on the page: sacred geometry circles, frequency wave through the centre, glowing core, aurora background
- Open `public/icons/icon-512x512.png` — same but larger and more detailed
- The `og-image.png` should show the logo centred with the title below it

---

## What NOT to Change

- Do not change the manifest.json
- Do not change any meta tags
- Do not change anything on the page
- Only regenerate the icon image files

---

## Deploy

After generating, commit the new icons and deploy. Users who have already added to home screen may need to re-add to get the new icon (this is a browser limitation).
