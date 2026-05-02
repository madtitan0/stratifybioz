import { useEffect, useRef } from 'react';
import { ArrowRight, ChevronDown, Shield, Award, Globe2 } from 'lucide-react';
import { useTilt } from '../hooks/useTilt';

/* ─── Particle canvas with mouse repulsion ─── */
function ParticleCanvas() {
  const ref = useRef(null);
  const mouse = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext('2d'); let raf;
    const resize = () => { c.width = c.offsetWidth; c.height = c.offsetHeight; };
    resize(); window.addEventListener('resize', resize);

    const onMove = e => {
      const r = c.getBoundingClientRect();
      mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    window.addEventListener('mousemove', onMove);

    const N = window.innerWidth < 768 ? 40 : 85;
    const pts = Array.from({ length: N }, () => ({
      x: Math.random() * c.width,
      y: Math.random() * c.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.6 + 0.5,
      hue: Math.random() > 0.7 ? 'violet' : 'cyan',
    }));

    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const d = Math.hypot(dx, dy);
          if (d < 130) {
            const a = (1 - d / 130) * 0.14;
            ctx.beginPath();
            ctx.strokeStyle = pts[i].hue === 'violet' ? `rgba(139,47,255,${a})` : `rgba(0,229,255,${a})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.stroke();
          }
        }
      }
      pts.forEach(p => {
        const mx = mouse.current.x - p.x, my = mouse.current.y - p.y;
        const md = Math.hypot(mx, my);
        if (md < 90) {
          const force = (90 - md) / 90 * 0.6;
          p.vx -= (mx / md) * force; p.vy -= (my / md) * force;
        }
        p.vx *= 0.995; p.vy *= 0.995;
        const spd = Math.hypot(p.vx, p.vy);
        if (spd > 1.2) { p.vx = (p.vx / spd) * 1.2; p.vy = (p.vy / spd) * 1.2; }
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.hue === 'violet' ? 'rgba(139,47,255,0.55)' : 'rgba(0,229,255,0.5)';
        ctx.fill();
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > c.width) p.vx *= -1;
        if (p.y < 0 || p.y > c.height) p.vy *= -1;
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); window.removeEventListener('mousemove', onMove); };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 w-full h-full opacity-55" />;
}

/* ─── Animated data-flow lines connecting the 3 image cards ─── */
function MosaicCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext('2d'); let t = 0; let raf;
    const resize = () => { c.width = c.offsetWidth; c.height = c.offsetHeight; };
    resize(); window.addEventListener('resize', resize);
    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      t += 0.012;
      const pts = [
        { x: c.width * 0.28, y: c.height * 0.38 },
        { x: c.width * 0.78, y: c.height * 0.22 },
        { x: c.width * 0.78, y: c.height * 0.76 },
      ];
      const pairs = [[0,1],[0,2],[1,2]];
      pairs.forEach(([a, b], pi) => {
        const p1 = pts[a]; const p2 = pts[b];
        const pulse = Math.sin(t + pi * 2.1) * 0.5 + 0.5;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(0,229,255,${pulse * 0.12 + 0.02})`;
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 8]);
        ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y); ctx.stroke();
        ctx.setLineDash([]);
        const prog = ((t * 0.4 + pi * 0.6) % 1);
        const px = p1.x + (p2.x - p1.x) * prog;
        const py = p1.y + (p2.y - p1.y) * prog;
        ctx.beginPath(); ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,229,255,${0.55 * pulse + 0.15})`; ctx.fill();
      });
      pts.forEach((p, i) => {
        const r = 6 + Math.sin(t + i) * 2;
        ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0,229,255,${0.18 + Math.sin(t + i) * 0.08})`;
        ctx.lineWidth = 1; ctx.stroke();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none z-10" />;
}

function ImgCard({ src, alt, className, children }) {
  const ref = useTilt(5);
  return (
    <div ref={ref} className={`tilt-card img-zoom relative rounded-2xl overflow-hidden ${className}`}
         style={{ border: '1px solid rgba(255,255,255,0.09)' }}>
      <img src={src} alt={alt} className="w-full h-full object-cover" loading="eager"
           onError={e => { e.target.style.display = 'none'; }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom,rgba(3,4,14,0.05) 0%,rgba(3,4,14,0.7) 100%)' }} />
      {children}
    </div>
  );
}

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden"
             style={{ background: 'var(--bz-black)', minHeight: '100svh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <ParticleCanvas />

      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full pointer-events-none"
           style={{ background: 'radial-gradient(circle,rgba(0,229,255,0.045) 0%,transparent 65%)' }} />
      <div className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] rounded-full pointer-events-none"
           style={{ background: 'radial-gradient(circle,rgba(139,47,255,0.05) 0%,transparent 65%)' }} />
      <div className="absolute inset-0 pointer-events-none opacity-[0.15]"
           style={{ backgroundImage: 'linear-gradient(rgba(0,229,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,229,255,0.04) 1px,transparent 1px)', backgroundSize: '80px 80px' }} />

      <div className="relative max-w-7xl mx-auto px-5 lg:px-8 pt-24 pb-10 lg:pt-28 w-full">
        <div className="grid lg:grid-cols-12 gap-10 xl:gap-14 items-center">

          {/* ── Content ── */}
          <div className="lg:col-span-6 space-y-7">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass text-bz-cyan text-xs font-semibold tracking-widest uppercase animate-fade-up"
                 style={{ borderColor: 'rgba(0,229,255,0.2)', animationDelay: '0s' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-bz-cyan animate-pulse" />
              India's Premier Clinical Research Organization
            </div>

            <div className="animate-fade-up" style={{ animationDelay: '.1s' }}>
              <h1 className="font-display font-bold leading-[1.03] tracking-tight text-white"
                  style={{ fontSize: 'clamp(44px, 5.5vw, 84px)' }}>
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

          {/* ── Premium Image Mosaic ── */}
          <div className="hidden lg:block lg:col-span-6">
            <div className="relative h-[560px]">
              <MosaicCanvas />

              {/* Ambient glow behind mosaic */}
              <div className="absolute inset-0 pointer-events-none"
                   style={{ background: 'radial-gradient(ellipse 60% 55% at 55% 45%, rgba(0,229,255,0.055) 0%, transparent 70%)' }} />

              {/* ── Card 1: Large — clinical researcher ── */}
              <ImgCard
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80"
                alt="Clinical research scientist"
                className="absolute left-0 top-6 w-[57%] h-[66%] animate-float-a"
              >
                {/* Pulsing glow ring */}
                <div className="absolute inset-0 rounded-2xl pointer-events-none animate-glow-pulse"
                     style={{ boxShadow: '0 0 0 1px rgba(0,229,255,0.15), 0 0 32px rgba(0,229,255,0.1)' }} />
                <div className="absolute bottom-4 left-4 glass-image rounded-xl px-3 py-2">
                  <div className="text-xl font-display font-bold text-white">100+</div>
                  <div className="text-[10px] text-bz-muted">Active Trial Sites</div>
                </div>
                {/* Live indicator */}
                <div className="absolute top-3 left-3 glass-image rounded-full px-2.5 py-1 flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-bz-green animate-pulse" />
                  <span className="text-[9px] font-mono text-bz-text tracking-wider">LIVE OPS</span>
                </div>
              </ImgCard>

              {/* ── Card 2: Top right — pharmaceutical lab ── */}
              <ImgCard
                src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=450&auto=format&fit=crop&q=80"
                alt="Pharmaceutical laboratory research"
                className="absolute right-0 top-0 w-[41%] h-[46%] animate-float-b"
              >
                <div className="absolute top-3 right-3 glass-image rounded-lg px-2 py-1.5 flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-bz-green animate-pulse" />
                  <span className="text-[10px] font-mono text-bz-text">GCP Certified</span>
                </div>
              </ImgCard>

              {/* ── Card 3: Bottom right — research team ── */}
              <ImgCard
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=450&auto=format&fit=crop&q=80"
                alt="Clinical research team expertise"
                className="absolute right-0 bottom-2 w-[41%] h-[44%] animate-float-a"
              >
                <div className="absolute bottom-3 left-3 glass-image rounded-lg px-2 py-1.5">
                  <div className="text-base font-display font-bold" style={{ color: '#8B2FFF' }}>29+</div>
                  <div className="text-[10px] text-bz-muted">Yrs Expertise</div>
                </div>
              </ImgCard>

              {/* ── Floating data badge — bottom center ── */}
              <div className="absolute bottom-14 left-[28%] z-20 glass-image rounded-2xl px-4 py-3 animate-float-b"
                   style={{ border: '1px solid rgba(139,47,255,0.2)', animationDelay: '1.5s' }}>
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                       style={{ background: 'rgba(139,47,255,0.15)' }}>
                    <span className="text-[11px] font-mono font-bold" style={{ color: '#8B2FFF' }}>ICH</span>
                  </div>
                  <div>
                    <div className="text-[11px] font-semibold text-white">E6(R2) Compliant</div>
                    <div className="text-[9px] text-bz-muted">All studies, all phases</div>
                  </div>
                </div>
              </div>

              {/* ── Floating stat badge — right side ── */}
              <div className="absolute top-[47%] right-[41.5%] z-20 glass-image rounded-xl px-3 py-2 animate-float-b"
                   style={{ border: '1px solid rgba(0,255,136,0.15)', animationDelay: '3s' }}>
                <div className="text-xs font-display font-bold" style={{ color: '#00FF88' }}>14</div>
                <div className="text-[9px] text-bz-muted leading-tight">Therapy<br />Areas</div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll cue — scrolls to Ticker strip (next section) */}
      <div className="relative flex justify-center pb-8 pt-2">
        <button
          onClick={() => window.scrollBy({ top: window.innerHeight * 0.85, behavior: 'smooth' })}
          className="flex flex-col items-center gap-1.5 text-bz-muted/40 hover:text-bz-muted/70 transition-colors"
        >
          <span className="text-[10px] tracking-widest uppercase font-mono">scroll</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </button>
      </div>
    </section>
  );
}
