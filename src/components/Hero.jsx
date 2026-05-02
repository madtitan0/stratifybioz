import { useEffect, useRef } from 'react';
import { ArrowRight, ChevronDown, Shield, Award, Globe2 } from 'lucide-react';

/* ─── Background particle network ─── */
function ParticleCanvas() {
  const ref = useRef(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext('2d'); let raf;
    const resize = () => { c.width = c.offsetWidth; c.height = c.offsetHeight; };
    resize(); window.addEventListener('resize', resize);
    const onMove = e => { const r = c.getBoundingClientRect(); mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top }; };
    window.addEventListener('mousemove', onMove);
    const N = window.innerWidth < 768 ? 30 : 70;
    const pts = Array.from({ length: N }, () => ({ x: Math.random() * c.width, y: Math.random() * c.height, vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3, r: Math.random() * 1.4 + 0.5, hue: Math.random() > 0.7 ? 'v' : 'c' }));
    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) { const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y); if (d < 120) { const a = (1 - d / 120) * 0.1; ctx.beginPath(); ctx.strokeStyle = pts[i].hue === 'v' ? `rgba(139,47,255,${a})` : `rgba(0,229,255,${a})`; ctx.lineWidth = 0.6; ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.stroke(); } }
      pts.forEach(p => { const mx = mouse.current.x - p.x, my = mouse.current.y - p.y, md = Math.hypot(mx, my); if (md < 80) { const f = (80 - md) / 80 * 0.5; p.vx -= mx / md * f; p.vy -= my / md * f; } p.vx *= 0.996; p.vy *= 0.996; const sp = Math.hypot(p.vx, p.vy); if (sp > 1.1) { p.vx = p.vx / sp * 1.1; p.vy = p.vy / sp * 1.1; } ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fillStyle = p.hue === 'v' ? 'rgba(139,47,255,0.5)' : 'rgba(0,229,255,0.45)'; ctx.fill(); p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > c.width) p.vx *= -1; if (p.y < 0 || p.y > c.height) p.vy *= -1; });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); window.removeEventListener('mousemove', onMove); };
  }, []);
  return <canvas ref={ref} className="absolute inset-0 w-full h-full opacity-45" />;
}

/* ─── Clinical research domain animation: DNA helix + Phase orbit rings ─── */
function ClinicalCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext('2d'); let t = 0; let raf;
    const resize = () => { c.width = c.offsetWidth; c.height = c.offsetHeight; };
    resize(); window.addEventListener('resize', resize);

    // Expanding pulse rings (represent patient cohorts enrolling)
    const pulses = [];
    let pTimer = 0;

    const PHASES = [
      { name: 'Phase I',   r: 110, speed:  0.42, color: '#00E5FF', off: 0 },
      { name: 'Phase II',  r: 150, speed: -0.26, color: '#8B2FFF', off: Math.PI * 0.5 },
      { name: 'Phase III', r: 190, speed:  0.17, color: '#00FF88', off: Math.PI },
      { name: 'Phase IV',  r: 228, speed: -0.11, color: '#F59E0B', off: Math.PI * 1.5 },
    ];

    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      t += 0.008;
      pTimer++;

      const cx = c.width / 2;
      const cy = c.height / 2;
      // Scale so all elements fit inside the canvas, capped to avoid being too large
      const sc = Math.min(c.width / 520, c.height / 580, 1.15);

      // Spawn patient-cohort pulse every 55 frames
      if (pTimer % 55 === 0) {
        const angle = Math.random() * Math.PI * 2;
        const dist = (90 + Math.random() * 100) * sc;
        pulses.push({ angle, dist, age: 0, life: 110 + Math.random() * 50 });
      }

      // ── 1. Faint radial data spokes from core ──
      for (let i = 0; i < 14; i++) {
        const a = (i / 14) * Math.PI * 2 + t * 0.04;
        const r1 = 50 * sc;
        const r2 = (82 + Math.sin(t * 2.2 + i * 1.4) * 16) * sc;
        ctx.beginPath();
        ctx.moveTo(cx + r1 * Math.cos(a), cy + r1 * Math.sin(a));
        ctx.lineTo(cx + r2 * Math.cos(a), cy + r2 * Math.sin(a));
        ctx.strokeStyle = `rgba(0,229,255,${0.035 + Math.sin(t * 2.8 + i) * 0.02})`;
        ctx.lineWidth = 1; ctx.stroke();
      }

      // ── 2. Phase orbit rings + moving dots ──
      PHASES.forEach(p => {
        const r = p.r * sc;
        // Dashed orbit ring
        ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = `${p.color}1E`; ctx.lineWidth = 1;
        ctx.setLineDash([4, 8]); ctx.stroke(); ctx.setLineDash([]);

        const angle = t * p.speed + p.off;
        const dx = cx + r * Math.cos(angle);
        const dy = cy + r * Math.sin(angle);

        // Comet tail
        for (let ti = 12; ti >= 1; ti--) {
          const ta = angle - (ti / 12) * 0.55 * Math.sign(p.speed);
          const tx = cx + r * Math.cos(ta);
          const ty = cy + r * Math.sin(ta);
          const tailA = Math.round(((1 - ti / 12) * 0.4) * 255).toString(16).padStart(2, '0');
          ctx.beginPath(); ctx.arc(tx, ty, (5 * sc) * (1 - ti / 14), 0, Math.PI * 2);
          ctx.fillStyle = `${p.color}${tailA}`; ctx.fill();
        }

        // Dot with glow
        ctx.shadowBlur = 12; ctx.shadowColor = p.color;
        ctx.beginPath(); ctx.arc(dx, dy, 5.5 * sc, 0, Math.PI * 2);
        ctx.fillStyle = p.color; ctx.fill();
        ctx.shadowBlur = 0;

        // Phase label (show when dot is in the right half of canvas)
        if (Math.cos(angle) > 0.15 && c.width > 300) {
          ctx.fillStyle = `${p.color}CC`;
          ctx.font = `bold ${Math.round(9.5 * sc)}px monospace`;
          ctx.fillText(p.name, dx + 9 * sc, dy + 4 * sc);
        }
      });

      // ── 3. DNA Double Helix (vertical, centered) ──
      const helixH = c.height * 0.74;
      const helixAmp = 50 * sc;
      const helixFreq = 0.095;
      const helixTop = cy - helixH / 2;

      for (let i = 0; i <= helixH; i += 3) {
        const y = helixTop + i;
        const phase = t * 1.55 + i * helixFreq;
        const x1 = cx + helixAmp * Math.sin(phase);
        const x2 = cx + helixAmp * Math.sin(phase + Math.PI);
        const d1 = (Math.sin(phase) + 1) / 2;
        const d2 = 1 - d1;

        ctx.beginPath(); ctx.arc(x1, y, (2.2 + d1 * 1.8) * sc, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,229,255,${0.22 + d1 * 0.65})`; ctx.fill();

        ctx.beginPath(); ctx.arc(x2, y, (2.2 + d2 * 1.8) * sc, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139,47,255,${0.22 + d2 * 0.65})`; ctx.fill();

        // Base-pair rungs every 20px
        if (Math.round(i) % 20 === 0) {
          const rAlpha = (d1 + d2) * 0.09 + 0.035;
          const grad = ctx.createLinearGradient(x1, y, x2, y);
          grad.addColorStop(0, `rgba(0,229,255,${rAlpha})`);
          grad.addColorStop(0.5, `rgba(200,200,255,${rAlpha * 0.7})`);
          grad.addColorStop(1, `rgba(139,47,255,${rAlpha})`);
          ctx.beginPath(); ctx.moveTo(x1, y); ctx.lineTo(x2, y);
          ctx.strokeStyle = grad; ctx.lineWidth = 1.5 * sc; ctx.stroke();
        }
      }

      // DNA scan line
      const scanY = helixTop + ((t * 55) % helixH);
      const sg = ctx.createLinearGradient(cx - 70 * sc, scanY, cx + 70 * sc, scanY);
      sg.addColorStop(0, 'transparent'); sg.addColorStop(0.5, 'rgba(0,229,255,0.11)'); sg.addColorStop(1, 'transparent');
      ctx.fillStyle = sg; ctx.fillRect(cx - 70 * sc, scanY - 2, 140 * sc, 4);

      // ── 4. Glowing core ──
      const cR = 44 * sc;
      const cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, cR);
      cg.addColorStop(0, 'rgba(0,229,255,0.20)'); cg.addColorStop(1, 'transparent');
      ctx.beginPath(); ctx.arc(cx, cy, cR, 0, Math.PI * 2); ctx.fillStyle = cg; ctx.fill();

      const pulse = 0.22 + Math.sin(t * 2.1) * 0.07;
      ctx.beginPath(); ctx.arc(cx, cy, (cR - 7) * 1, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(0,229,255,${pulse})`; ctx.lineWidth = 1.5; ctx.stroke();

      ctx.textAlign = 'center';
      ctx.fillStyle = `rgba(0,229,255,${0.8 + Math.sin(t * 1.8) * 0.15})`;
      ctx.font = `bold ${Math.round(11 * sc)}px monospace`;
      ctx.fillText('CRO', cx, cy - 3 * sc);
      ctx.fillStyle = 'rgba(0,229,255,0.38)';
      ctx.font = `${Math.round(8 * sc)}px monospace`;
      ctx.fillText('INDIA', cx, cy + 10 * sc);
      ctx.textAlign = 'left';

      // ── 5. Patient cohort pulses ──
      for (let pi = pulses.length - 1; pi >= 0; pi--) {
        const p = pulses[pi]; p.age++;
        if (p.age > p.life) { pulses.splice(pi, 1); continue; }
        const prog = p.age / p.life;
        const pr = (12 + prog * 38) * sc;
        ctx.beginPath(); ctx.arc(cx + p.dist * Math.cos(p.angle), cy + p.dist * Math.sin(p.angle), pr, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0,255,136,${(1 - prog) * 0.22})`; ctx.lineWidth = 1; ctx.stroke();
      }

      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={ref} className="w-full h-full" />;
}

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden"
             style={{ background: 'var(--bz-black)', minHeight: '100svh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <ParticleCanvas />

      {/* Glow orbs */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full pointer-events-none"
           style={{ background: 'radial-gradient(circle,rgba(0,229,255,0.04) 0%,transparent 65%)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
           style={{ background: 'radial-gradient(circle,rgba(139,47,255,0.05) 0%,transparent 65%)' }} />
      <div className="absolute inset-0 pointer-events-none opacity-[0.12]"
           style={{ backgroundImage: 'linear-gradient(rgba(0,229,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,229,255,0.04) 1px,transparent 1px)', backgroundSize: '80px 80px' }} />

      <div className="relative max-w-7xl mx-auto px-5 lg:px-8 pt-24 pb-10 lg:pt-28 w-full">
        <div className="grid lg:grid-cols-2 gap-10 xl:gap-12 items-center">

          {/* ── Content ── */}
          <div className="space-y-7 order-2 lg:order-1">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass text-bz-cyan text-xs font-semibold tracking-widest uppercase animate-fade-up"
                 style={{ borderColor: 'rgba(0,229,255,0.2)', animationDelay: '0s' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-bz-cyan animate-pulse" />
              India's Premier Clinical Research Organization
            </div>

            <div className="animate-fade-up" style={{ animationDelay: '.1s' }}>
              <h1 className="font-display font-bold leading-[1.03] tracking-tight text-white"
                  style={{ fontSize: 'clamp(40px, 5.5vw, 84px)' }}>
                The Future of
                <br />
                <span className="text-grad-brand">Clinical Research</span>
                <br />
                Starts Here.
              </h1>
            </div>

            <p className="text-bz-muted text-base lg:text-lg leading-relaxed max-w-[520px] animate-fade-up"
               style={{ animationDelay: '.2s' }}>
              StratifyBioZ delivers the perfect trifecta — speed, quality, and compliance —
              enabling fit-for-purpose development of novel therapeutics across India and APAC.
            </p>

            <div className="flex flex-wrap gap-x-6 gap-y-2 animate-fade-up" style={{ animationDelay: '.3s' }}>
              {[{ Icon: Shield, label: 'GCP Compliant' }, { Icon: Award, label: 'ICH Guidelines' }, { Icon: Globe2, label: 'APAC Network' }].map(({ Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-sm text-bz-muted">
                  <Icon className="w-4 h-4 flex-shrink-0" style={{ color: '#00E5FF' }} /> {label}
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-up" style={{ animationDelay: '.4s' }}>
              <a href="#services"
                 onClick={e => { e.preventDefault(); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); }}
                 className="btn-primary gap-2 px-7 py-4 text-base">
                Explore Services <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#contact"
                 onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                 className="btn-ghost inline-flex items-center justify-center px-7 py-4 text-base font-semibold">
                Talk to Our Team
              </a>
            </div>

            <div className="flex items-center gap-2.5 text-xs text-bz-muted font-mono animate-fade-up" style={{ animationDelay: '.5s' }}>
              <span className="w-2 h-2 rounded-full bg-bz-green animate-pulse flex-shrink-0" />
              Active clinical operations across India & APAC
            </div>
          </div>

          {/* ── Clinical Domain Animation (mobile + desktop) ── */}
          <div className="order-1 lg:order-2 relative animate-fade-up" style={{ animationDelay: '.15s' }}>
            {/* Canvas container */}
            <div className="relative h-[300px] lg:h-[540px] rounded-2xl overflow-hidden"
                 style={{ background: 'rgba(0,229,255,0.015)', border: '1px solid rgba(0,229,255,0.07)' }}>
              <ClinicalCanvas />
              {/* Corner label — top left */}
              <div className="absolute top-4 left-4 glass-image rounded-xl px-3 py-2 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-bz-green animate-pulse flex-shrink-0" />
                <span className="text-[10px] font-mono text-bz-text tracking-wider">LIVE — ACTIVE TRIALS</span>
              </div>
              {/* Corner label — bottom right */}
              <div className="absolute bottom-4 right-4 glass-image rounded-xl px-3 py-2 text-right">
                <div className="text-sm font-display font-bold text-white">Phase I – IV</div>
                <div className="text-[10px] text-bz-muted">Full development lifecycle</div>
              </div>
            </div>

            {/* Stat strip below canvas */}
            <div className="grid grid-cols-3 gap-2 mt-3">
              {[
                { val: '100+', label: 'Trial Sites', color: '#00E5FF' },
                { val: '14',   label: 'Therapy Areas', color: '#8B2FFF' },
                { val: '29+',  label: 'Yrs Expertise', color: '#00FF88' },
              ].map(s => (
                <div key={s.val} className="rounded-xl px-3 py-2.5 text-center"
                     style={{ background: 'var(--bz-surface)', border: `1px solid ${s.color}18` }}>
                  <div className="font-display font-bold text-base lg:text-lg" style={{ color: s.color }}>{s.val}</div>
                  <div className="text-[10px] text-bz-muted leading-tight">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Scroll cue */}
      <div className="relative flex justify-center pb-8 pt-2">
        <button
          onClick={() => window.scrollBy({ top: window.innerHeight * 0.85, behavior: 'smooth' })}
          className="flex flex-col items-center gap-1.5 text-bz-muted/40 hover:text-bz-muted/70 transition-colors">
          <span className="text-[10px] tracking-widest uppercase font-mono">scroll</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </button>
      </div>
    </section>
  );
}
