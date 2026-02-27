'use client';

import { useEffect, useRef } from 'react';

interface Props {
  size?: number;
}

export default function HarmonicLogo({ size = 200 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);
  const rotRef = useRef({ x: 0, y: 0 });
  const velRef = useRef({ x: 0.06, y: 0.08 });
  const dragRef = useRef({ active: false, lastX: 0, lastY: 0 });
  const opacityRef = useRef(0);
  const scaleRef = useRef(0.5);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const s = size;

    c.width = s * dpr;
    c.height = s * dpr;
    c.style.width = s + 'px';
    c.style.height = s + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const cx = s / 2;
    const cy = s / 2;
    const TAU = Math.PI * 2;
    let running = true;

    // ── Touch/mouse handlers ──
    const getPos = (e: MouseEvent | TouchEvent) => {
      const rect = c.getBoundingClientRect();
      const src = 'touches' in e ? e.touches[0] : e;
      return { x: src.clientX - rect.left, y: src.clientY - rect.top };
    };

    const onDown = (e: MouseEvent | TouchEvent) => {
      e.preventDefault();
      const p = getPos(e);
      dragRef.current = { active: true, lastX: p.x, lastY: p.y };
      velRef.current = { x: 0, y: 0 };
    };

    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!dragRef.current.active) return;
      e.preventDefault();
      const p = getPos(e);
      const dx = p.x - dragRef.current.lastX;
      const dy = p.y - dragRef.current.lastY;
      rotRef.current.y += dx * 0.008;
      rotRef.current.x += dy * 0.008;
      velRef.current = { x: dy * 0.008, y: dx * 0.008 };
      dragRef.current.lastX = p.x;
      dragRef.current.lastY = p.y;
    };

    const onUp = () => {
      dragRef.current.active = false;
    };

    c.addEventListener('mousedown', onDown);
    c.addEventListener('mousemove', onMove);
    c.addEventListener('mouseup', onUp);
    c.addEventListener('mouseleave', onUp);
    c.addEventListener('touchstart', onDown, { passive: false });
    c.addEventListener('touchmove', onMove, { passive: false });
    c.addEventListener('touchend', onUp);

    // ── 3D helpers ──
    function rotateX(p: {x:number,y:number,z:number}, a: number) {
      const cos = Math.cos(a), sin = Math.sin(a);
      return { x: p.x, y: p.y * cos - p.z * sin, z: p.y * sin + p.z * cos };
    }
    function rotateY(p: {x:number,y:number,z:number}, a: number) {
      const cos = Math.cos(a), sin = Math.sin(a);
      return { x: p.x * cos + p.z * sin, y: p.y, z: -p.x * sin + p.z * cos };
    }
    function project(p: {x:number,y:number,z:number}, fov = 400) {
      const scale = fov / (fov + p.z);
      return { x: p.x * scale, y: p.y * scale, s: scale };
    }

    // ── Geometry data — scaled relative to canvas size ──
    const unit = s / 300;

    function getSeedCircles(radius: number) {
      const circles = [{ x: 0, y: 0, z: 0, r: radius }];
      for (let i = 0; i < 6; i++) {
        const a = (i * 60) * Math.PI / 180;
        circles.push({ x: radius * Math.cos(a), y: radius * Math.sin(a), z: 0, r: radius });
      }
      return circles;
    }

    const layers = [
      { circles: getSeedCircles(28 * unit), z: 0, alpha: 0.25, hue: 260 },
      { circles: getSeedCircles(22 * unit), z: -20 * unit, alpha: 0.12, hue: 280 },
      { circles: getSeedCircles(34 * unit), z: 20 * unit, alpha: 0.08, hue: 240 },
    ];

    const outerVerts: {x:number,y:number,z:number}[] = [];
    for (let i = 0; i < 12; i++) {
      const a = (i * 30) * Math.PI / 180;
      outerVerts.push({ x: 60 * unit * Math.cos(a), y: 60 * unit * Math.sin(a), z: 0 });
    }

    const particles: {x:number,y:number,z:number,size:number,speed:number,phase:number}[] = [];
    for (let i = 0; i < 30; i++) {
      particles.push({
        x: (Math.random() - 0.5) * 180 * unit,
        y: (Math.random() - 0.5) * 180 * unit,
        z: (Math.random() - 0.5) * 120 * unit,
        size: (0.5 + Math.random() * 1.2) * unit,
        speed: 0.5 + Math.random(),
        phase: Math.random() * TAU,
      });
    }

    // ── Draw loop ──
    const draw = () => {
      if (!running) return;
      const t = frameRef.current++;
      const time = t * 0.006;

      // Entry animation
      if (opacityRef.current < 1) opacityRef.current = Math.min(1, opacityRef.current + 0.018);
      if (scaleRef.current < 1) scaleRef.current = Math.min(1, scaleRef.current + (1 - scaleRef.current) * 0.04);

      ctx.clearRect(0, 0, s, s);
      ctx.globalAlpha = opacityRef.current;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(scaleRef.current, scaleRef.current);
      ctx.translate(-cx, -cy);

      // Momentum
      if (!dragRef.current.active) {
        rotRef.current.x += velRef.current.x;
        rotRef.current.y += velRef.current.y;
        velRef.current.x *= 0.97;
        velRef.current.y *= 0.97;
        if (Math.abs(velRef.current.x) < 0.0001 && Math.abs(velRef.current.y) < 0.0001) {
          rotRef.current.y += 0.002;
          rotRef.current.x += 0.0005;
        }
      }

      const rx = rotRef.current.x;
      const ry = rotRef.current.y;
      const breath = 0.93 + Math.sin(time * 0.3) * 0.07;

      // ═══ AMBIENT AURA ═══
      for (let i = 0; i < 3; i++) {
        const angle = time * 0.12 + i * (TAU / 3);
        const ax = cx + Math.cos(angle) * s * 0.05;
        const ay = cy + Math.sin(angle) * s * 0.05;
        const hue = (time * 6 + i * 45) % 360;
        const aGrd = ctx.createRadialGradient(ax, ay, 0, ax, ay, s * 0.48);
        aGrd.addColorStop(0, `hsla(${hue}, 55%, 50%, 0.07)`);
        aGrd.addColorStop(0.5, `hsla(${hue + 30}, 45%, 35%, 0.02)`);
        aGrd.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = aGrd;
        ctx.fillRect(0, 0, s, s);
      }

      // ═══ EMANATION RINGS ═══
      for (let i = 0; i < 5; i++) {
        const phase = time * (0.25 + i * 0.06) + i * 1.2;
        const ringR = s * 0.06 + ((phase % TAU) / TAU) * s * 0.4;
        const life = 1 - ringR / (s * 0.46);
        if (life <= 0) continue;
        ctx.beginPath();
        ctx.arc(cx, cy, ringR * breath, 0, TAU);
        const hue = (210 + i * 20 + time * 8) % 360;
        ctx.strokeStyle = `hsla(${hue}, 50%, 60%, ${life * 0.15})`;
        ctx.lineWidth = 0.5 + life * 0.7;
        ctx.stroke();
      }

      // ═══ 3D PARTICLES ═══
      particles.forEach((p) => {
        let pt = { x: p.x, y: p.y, z: p.z + Math.sin(time * p.speed + p.phase) * 10 * unit };
        pt = rotateX(pt, rx);
        pt = rotateY(pt, ry);
        const proj = project(pt);
        if (proj.s < 0.2) return;
        const alpha = (0.15 + Math.sin(time * 1.5 + p.phase) * 0.1) * proj.s;
        ctx.beginPath();
        ctx.arc(cx + proj.x, cy + proj.y, p.size * proj.s, 0, TAU);
        ctx.fillStyle = `rgba(180,170,255,${alpha})`;
        ctx.fill();
      });

      // ═══ 3D SEED OF LIFE ═══
      layers.forEach((layer) => {
        const timePulse = 0.85 + Math.sin(time * 0.5 + layer.z * 0.05) * 0.15;
        const layerHue = layer.hue + time * 4;

        layer.circles.forEach((circle, ci) => {
          let pt = { x: circle.x * breath, y: circle.y * breath, z: layer.z };
          pt = rotateX(pt, rx);
          pt = rotateY(pt, ry);
          const proj = project(pt);
          if (proj.s < 0.15) return;

          const r = circle.r * proj.s * breath;
          const alpha = layer.alpha * timePulse * proj.s;
          const petalPulse = ci > 0 ? (0.8 + Math.sin(time * 0.6 + ci * 1.05) * 0.2) : 1;

          ctx.save();
          ctx.translate(cx + proj.x, cy + proj.y);
          ctx.scale(1, 0.6 + proj.s * 0.4);
          ctx.beginPath();
          ctx.arc(0, 0, r, 0, TAU);
          ctx.strokeStyle = `hsla(${layerHue + ci * 6}, 50%, 65%, ${alpha * petalPulse})`;
          ctx.lineWidth = 0.5 + proj.s * 0.5;
          ctx.stroke();
          ctx.restore();
        });
      });

      // ═══ METATRON'S CUBE CONNECTIONS ═══
      for (let i = 0; i < outerVerts.length; i++) {
        const j = (i + 3) % outerVerts.length;
        const p1 = rotateY(rotateX(outerVerts[i], rx), ry);
        const p2 = rotateY(rotateX(outerVerts[j], rx), ry);
        const pr1 = project(p1);
        const pr2 = project(p2);
        ctx.beginPath();
        ctx.moveTo(cx + pr1.x, cy + pr1.y);
        ctx.lineTo(cx + pr2.x, cy + pr2.y);
        ctx.strokeStyle = `rgba(167,139,250,${(0.03 + Math.sin(time * 0.4 + i * 0.5) * 0.015) * (pr1.s + pr2.s) / 2})`;
        ctx.lineWidth = 0.4;
        ctx.stroke();
      }

      // ═══ FREQUENCY WAVES (2D overlay) ═══
      const waveWidth = s * 0.38;

      // Sub-bass
      ctx.save();
      ctx.beginPath();
      for (let x = -waveWidth; x <= waveWidth; x += 1.5) {
        const norm = x / waveWidth;
        const env = Math.pow(1 - norm * norm, 1.5);
        const py = cy + Math.sin(norm * 4 + time * 0.8) * env * s * 0.025;
        if (x === -waveWidth) ctx.moveTo(cx + x, py); else ctx.lineTo(cx + x, py);
      }
      ctx.strokeStyle = 'rgba(100,60,200,0.1)';
      ctx.lineWidth = 3.5;
      ctx.lineCap = 'round';
      ctx.stroke();
      ctx.restore();

      // Main wave
      ctx.save();
      ctx.beginPath();
      for (let x = -waveWidth; x <= waveWidth; x += 0.8) {
        const norm = x / waveWidth;
        const env = Math.pow(1 - norm * norm, 1.2);
        const f1 = Math.sin(norm * 14 + time * 2.8) * env;
        const f2 = Math.sin(norm * 9 - time * 2.0) * env * 0.35;
        const f3 = Math.sin(norm * 21 + time * 3.5) * env * 0.12;
        const py = cy + (f1 + f2 + f3) * s * 0.045;
        if (x === -waveWidth) ctx.moveTo(cx + x, py); else ctx.lineTo(cx + x, py);
      }
      const wH1 = (180 + Math.sin(time * 0.3) * 30) % 360;
      const wH2 = (270 + Math.sin(time * 0.4) * 20) % 360;
      const wGrd = ctx.createLinearGradient(cx - waveWidth, 0, cx + waveWidth, 0);
      wGrd.addColorStop(0, `hsla(${wH1},70%,60%,0)`);
      wGrd.addColorStop(0.15, `hsla(${wH1},70%,60%,0.55)`);
      wGrd.addColorStop(0.5, `hsla(${wH2},60%,65%,0.85)`);
      wGrd.addColorStop(0.85, `hsla(${wH1},70%,60%,0.55)`);
      wGrd.addColorStop(1, `hsla(${wH1},70%,60%,0)`);
      ctx.strokeStyle = wGrd;
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.stroke();
      ctx.restore();

      // Ghost wave
      ctx.save();
      ctx.beginPath();
      for (let x = -waveWidth; x <= waveWidth; x += 1.2) {
        const norm = x / waveWidth;
        const env = Math.pow(1 - norm * norm, 1.3);
        const py = cy + (Math.sin(norm * 14 + time * 2.8 + 1.5) * env + Math.sin(norm * 9 - time * 2.0 + 1.0) * env * 0.35) * s * 0.035;
        if (x === -waveWidth) ctx.moveTo(cx + x, py); else ctx.lineTo(cx + x, py);
      }
      ctx.strokeStyle = 'rgba(192,132,252,0.18)';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();

      // ═══ ENERGY CORE ═══
      const cp = 0.6 + Math.sin(time * 1.4) * 0.25 + Math.sin(time * 3.1) * 0.15;

      const aura = ctx.createRadialGradient(cx, cy, 0, cx, cy, s * 0.12);
      aura.addColorStop(0, `rgba(180,150,255,${0.2 * cp})`);
      aura.addColorStop(0.4, `rgba(120,80,230,${0.06 * cp})`);
      aura.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = aura;
      ctx.fillRect(cx - s * 0.12, cy - s * 0.12, s * 0.24, s * 0.24);

      const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, s * 0.035);
      core.addColorStop(0, `rgba(255,255,255,${0.95 * cp})`);
      core.addColorStop(0.3, `rgba(220,200,255,${0.6 * cp})`);
      core.addColorStop(0.6, `rgba(167,139,250,${0.2 * cp})`);
      core.addColorStop(1, 'rgba(167,139,250,0)');
      ctx.fillStyle = core;
      ctx.beginPath();
      ctx.arc(cx, cy, s * 0.035, 0, TAU);
      ctx.fill();

      // Lens flare
      const fl = s * 0.055 * cp;
      ctx.fillStyle = `rgba(220,200,255,${0.2 * cp})`;
      ctx.fillRect(cx - fl, cy - 0.6, fl * 2, 1.2);
      ctx.fillStyle = `rgba(200,210,255,${0.12 * cp})`;
      ctx.fillRect(cx - 0.5, cy - fl * 0.6, 1, fl * 1.2);

      ctx.restore();
      ctx.globalAlpha = 1;

      requestAnimationFrame(draw);
    };
    draw();

    return () => {
      running = false;
      c.removeEventListener('mousedown', onDown);
      c.removeEventListener('mousemove', onMove);
      c.removeEventListener('mouseup', onUp);
      c.removeEventListener('mouseleave', onUp);
      c.removeEventListener('touchstart', onDown);
      c.removeEventListener('touchmove', onMove);
      c.removeEventListener('touchend', onUp);
    };
  }, [size]);

  return (
    <canvas
      ref={canvasRef}
      style={{ display: 'block', cursor: 'grab', touchAction: 'none' }}
      aria-hidden="true"
    />
  );
}
