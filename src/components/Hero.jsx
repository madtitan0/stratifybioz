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

      // Connections
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

      // Dots + mouse repulsion
      pts.forEach(p => {
        const mx = mouse.current.x - p.x, my = mouse.current.y - p.y;
        const md = Math.hypot(mx, my);
        if (md < 90) {
          const force = (90 - md) / 90 * 0.6;
          p.vx -= (mx / md) * force;
          p.vy -= (my / md) * force;
        }
        // dampen speed
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

function ImgCard({ src, alt, className, children }) {
  const ref = useTilt(4);
  return (
    <div ref={ref} className={`tilt-card img-zoom relative rounded-2xl overflow-hidden ${className}`}
         style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
      <img src={src} alt={alt} className="w-full h-full object-cover" loading="eager"
           onError={e => { e.target.style.display = 'none'; }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom,rgba(3,4,14,0.1) 0%,rgba(3,4,14,0.65) 100%)' }} />
      {children}
    </div>
  );
}

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden" style={{ background: 'var(--bz-black)', minHeight: '100svh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <ParticleCanvas />

      {/* Glow orbs */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full pointer-events-none"
           style={{ background: 'radial-gradient(circle,rgba(0,229,255,0.045) 0%,transparent 65%)' }} />
      <div className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] rounded-full pointer-events-none"
           style={{ background: 'radial-gradient(circle,rgba(139,47,255,0.05) 0%,transparent 65%)' }} />
      <div className="absolute inset-0 pointer-events-none opacity-[0.15]"
           style={{ backgroundImage: 'linear-gradient(rgba(0,229,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,229,255,0.04) 1px,transparent 1px)', backgroundSize: '80px 80px' }} />

      <div className="relative max-w-7xl mx-auto px-5 lg:px-8 pt-24 pb-10 lg:pt-28 w-full">
        <div className="grid lg:grid-cols-12 gap-10 xl:gap-14 items-center">

          {/* ── Content ── */}
          <div className="lg:col-span-7 space-y-7">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass text-bz-cyan text-xs font-semibold tracking-widest uppercase animate-fade-up"
                 style={{ borderColor: 'rgba(0,229,255,0.2)', animationDelay: '0s' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-bz-cyan animate-pulse" />
              India's Premier Clinical Research Organization
            </div>

            <div className="animate-fade-up" style={{ animationDelay: '.1s' }}>
              <h1 className="font-display font-bold leading-[1.03] tracking-tight text-white"
                  style={{ fontSize: 'clamp(44px, 6.5vw, 92px)' }}>
                The Future of
                <br />
                <span className="text-grad-brand">Clinical Research</span>
                <br />
                Starts Here.
              </h1>
            </div>

            <p className="text-bz-muted text-base lg:text-xl leading-relaxed max-w-[530px] animate-fade-up"
               style={{ animationDelay: '.2s' }}>
              StratifyBioZ delivers the perfect trifecta — speed, quality, and compliance —
              enabling fit-for-purpose development of novel therapeutics across India and APAC.
              Phase I through post-market, every variable orchestrated.
            </p>

            <div className="flex flex-wrap gap-x-6 gap-y-2 animate-fade-up" style={{ animationDelay: '.3s' }}>
              {[{ Icon: Shield, label: 'GCP Compliant' }, { Icon: Award, label: 'ICH Guidelines' }, { Icon: Globe2, label: 'APAC Network' }].map(({ Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-sm text-bz-muted">
                  <Icon className="w-4 h-4 flex-shrink-0" style={{ color: '#00E5FF' }} /> {label}
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-up" style={{ animationDelay: '.4s' }}>
              <a href="#services" onClick={e => { e.preventDefault(); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); }}
                 className="btn-primary gap-2 px-7 py-4 text-base">
                Explore Services <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#contact" onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                 className="btn-ghost inline-flex items-center justify-center px-7 py-4 text-base font-semibold">
                Talk to Our Team
              </a>
            </div>

            <div className="flex items-center gap-2.5 text-xs text-bz-muted font-mono animate-fade-up" style={{ animationDelay: '.5s' }}>
              <span className="w-2 h-2 rounded-full bg-bz-green animate-pulse flex-shrink-0" />
              Active clinical operations across India & APAC
            </div>
          </div>

          {/* ── Image mosaic ── */}
          <div className="hidden lg:block lg:col-span-5">
            <div className="relative h-[520px]">
              <ImgCard
                src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=500&auto=format&fit=crop&q=80"
                alt="Clinical research laboratory"
                className="absolute left-0 top-8 w-[58%] h-[68%] animate-float-a"
              >
                <div className="absolute bottom-4 left-4 glass-image rounded-xl px-3 py-2">
                  <div className="text-xl font-display font-bold text-white">100+</div>
                  <div className="text-[10px] text-bz-muted">Active Trial Sites</div>
                </div>
              </ImgCard>

              <ImgCard
                src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&auto=format&fit=crop&q=80"
                alt="Pharmaceutical research"
                className="absolute right-0 top-0 w-[44%] h-[44%] animate-float-b"
              >
                <div className="absolute top-3 right-3 glass-image rounded-lg px-2 py-1.5 flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-bz-green animate-pulse" />
                  <span className="text-[10px] font-mono text-bz-text">GCP Certified</span>
                </div>
              </ImgCard>

              <ImgCard
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&auto=format&fit=crop&q=80"
                alt="Clinical data analytics"
                className="absolute right-0 bottom-4 w-[44%] h-[42%] animate-float-a"
                style={{ animationDelay: '2s' }}
              >
                <div className="absolute bottom-3 left-3 glass-image rounded-lg px-2 py-1.5">
                  <div className="text-base font-display font-bold" style={{ color: '#8B2FFF' }}>29+</div>
                  <div className="text-[10px] text-bz-muted">Yrs Expertise</div>
                </div>
              </ImgCard>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue — part of normal flow, not absolute */}
      <div className="relative flex justify-center pb-8 pt-2">
        <button
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          className="flex flex-col items-center gap-1.5 text-bz-muted/40 hover:text-bz-muted/70 transition-colors"
        >
          <span className="text-[10px] tracking-widest uppercase font-mono">scroll</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </button>
      </div>
    </section>
  );
}
