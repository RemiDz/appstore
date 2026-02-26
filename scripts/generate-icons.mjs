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
  // Rounded rectangle
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

  // ── Central symbol: tuning fork + sine wave ──
  const scale = s / 512;
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
  console.log(`Generated ${filename}`);
});

// Also generate the favicon (use 32px)
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
ogCtx.fillText('HARMONIC WAVES', 600, 280);

ogCtx.fillStyle = 'rgba(201,169,110,0.7)';
ogCtx.font = 'italic 300 28px sans-serif';
ogCtx.fillText('Tools for Sound Healers', 600, 330);

ogCtx.fillStyle = 'rgba(255,255,255,0.4)';
ogCtx.font = '300 18px sans-serif';
ogCtx.fillText('7 FREE APPS  -  ZERO FRICTION  -  BUILT BY A SOUND HEALER', 600, 420);

fs.writeFileSync(path.join(outDir, 'og-image.png'), ogCanvas.toBuffer('image/png'));
console.log('Generated og-image.png (1200x630)');

console.log('\nAll icons generated successfully!');
