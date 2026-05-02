import { useEffect, useRef } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';

/* ── Canvas particle network ── */
function ParticleCanvas() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const N = window.innerWidth < 768 ? 40 : 80;
    const pts = Array.from({ length: N }, () => ({
      x:  Math.random() * canvas.width,
      y:  Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r:  Math.random() * 1.5 + 0.5,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d  = Math.hypot(dx, dy);
          if (d < 130) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0,229,255,${(1 - d / 130) * 0.12})`;
            ctx.lineWidth   = 0.6;
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
      }

      pts.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0,229,255,0.45)';
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      });

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 w-full h-full opacity-60" />;
}

/* ── Floating stat chip ── */
function Chip({ className, children }) {
  return (
    <div className={`glass border border-white/8 rounded-2xl px-4 py-3 shadow-2xl shadow-black/50 ${className}`}>
      {children}
    </div>
  );
}

export default function Hero() {
  const scrollDown = e => {
    e.preventDefault();
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden" style={{ background: 'var(--bz-black)' }}>

      {/* ── Background layers ── */}
      <ParticleCanvas />

      {/* Radial glow spots */}
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full pointer-events-none"
           style={{ background: 'radial-gradient(circle, rgba(0,229,255,0.05) 0%, transparent 70%)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
           style={{ background: 'radial-gradient(circle, rgba(139,47,255,0.06) 0%, transparent 70%)' }} />

      {/* Grid overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-20"
           style={{
             backgroundImage: 'linear-gradient(rgba(0,229,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.03) 1px, transparent 1px)',
             backgroundSize: '80px 80px',
           }} />

      {/* ── Content ── */}
      <div className="relative max-w-7xl mx-auto px-5 lg:px-8 pt-28 pb-20 lg:pt-36 w-full">
        <div className="grid lg:grid-cols-12 gap-10 items-center">

          {/* Left — 7 cols */}
          <div className="lg:col-span-7 space-y-8">

            {/* Pill badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass border border-bz-cyan/20 text-bz-cyan text-xs font-semibold tracking-widest uppercase animate-fade-up">
              <span className="w-1.5 h-1.5 rounded-full bg-bz-cyan animate-pulse" />
              India's Premier Clinical Research Organization
            </div>

            {/* Headline — MASSIVE */}
            <div className="animate-fade-up" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
              <h1 className="font-display font-bold leading-[1.02] tracking-tight text-white"
                  style={{ fontSize: 'clamp(48px, 7vw, 96px)' }}>
                The Future of
                <br />
                <span className="text-grad-brand">Clinical Research</span>
                <br />
                Starts Here.
              </h1>
            </div>

            {/* Sub */}
            <p className="text-bz-muted text-base lg:text-xl leading-relaxed max-w-[520px] animate-fade-up"
               style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
              StratifyBioZ delivers the perfect trifecta of speed, quality, and compliance —
              enabling fit-for-purpose clinical development of novel therapeutics across India
              and the APAC region.
            </p>

            {/* Trust row */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-bz-muted font-medium animate-fade-up"
                 style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
              {['GCP Compliant', 'ICH Guidelines', 'FDA Audit Ready', 'CDSCO Approved', '21 CFR Part 11'].map(t => (
                <span key={t} className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-bz-cyan/60" />
                  {t}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-up"
                 style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
              <a href="#services" onClick={e => { e.preventDefault(); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); }}
                 className="btn-primary inline-flex items-center justify-center gap-2 px-7 py-4 text-base">
                Explore Services
                <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#contact" onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                 className="btn-ghost inline-flex items-center justify-center gap-2 px-7 py-4 text-base font-semibold">
                Get In Touch
              </a>
            </div>
          </div>

          {/* Right — floating chips */}
          <div className="hidden lg:block lg:col-span-5 relative h-[520px]">

            {/* Centre orb */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-56 h-56">
                <div className="absolute inset-0 rounded-full animate-spin-slow"
                     style={{ border: '1px solid rgba(0,229,255,0.12)' }} />
                <div className="absolute inset-6 rounded-full animate-spin-rev"
                     style={{ border: '1px solid rgba(139,47,255,0.10)' }} />
                <div className="absolute inset-12 rounded-full"
                     style={{ border: '1px solid rgba(0,229,255,0.08)' }} />
                {/* Pulsing core */}
                <div className="absolute inset-16 rounded-full flex items-center justify-center"
                     style={{ background: 'radial-gradient(circle, rgba(0,229,255,0.12) 0%, transparent 70%)' }}>
                  <div className="w-16 h-16 rounded-full glow-cyan flex items-center justify-center"
                       style={{ background: 'linear-gradient(135deg, rgba(0,229,255,0.2), rgba(139,47,255,0.2))', border: '1px solid rgba(0,229,255,0.3)' }}>
                    <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none" stroke="rgba(0,229,255,0.9)" strokeWidth="1.5" strokeLinecap="round">
                      <path d="M8 4 C15 11, 25 11, 32 20 C25 29, 15 29, 8 36 C15 43, 25 43, 32 52" />
                      <path d="M32 4 C25 11, 15 11, 8 20 C15 29, 25 29, 32 36 C25 43, 15 43, 8 52" />
                      <line x1="8" y1="11"  x2="32" y2="11"  strokeOpacity="0.35" />
                      <line x1="4" y1="20"  x2="36" y2="20"  strokeOpacity="0.6" />
                      <line x1="8" y1="29"  x2="32" y2="29"  strokeOpacity="0.35" />
                      <circle cx="20" cy="20" r="2.5" fill="rgba(0,229,255,0.9)" stroke="none" />
                    </svg>
                  </div>
                </div>
                {/* Orbiting dots */}
                <div className="absolute inset-0 animate-spin-slow">
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-bz-cyan shadow-lg shadow-bz-cyan/80" />
                </div>
                <div className="absolute inset-0 animate-spin-rev">
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full" style={{ background: '#8B2FFF', boxShadow: '0 0 8px rgba(139,47,255,0.9)' }} />
                </div>
              </div>
            </div>

            {/* Floating chips */}
            <Chip className="absolute top-10 right-6 animate-float-a text-center min-w-[130px]">
              <div className="text-2xl font-display font-bold text-white">29+</div>
              <div className="text-[11px] text-bz-muted mt-0.5">Years Experience</div>
            </Chip>
            <Chip className="absolute top-10 left-4 animate-float-b text-center min-w-[120px]">
              <div className="text-2xl font-display font-bold text-bz-green">7</div>
              <div className="text-[11px] text-bz-muted mt-0.5">Service Divisions</div>
            </Chip>
            <Chip className="absolute bottom-16 right-2 animate-float-b text-center min-w-[140px]">
              <div className="text-2xl font-display font-bold" style={{ color: '#8B2FFF' }}>APAC</div>
              <div className="text-[11px] text-bz-muted mt-0.5">Regional Reach</div>
            </Chip>
            <Chip className="absolute bottom-10 left-8 animate-float-a text-center min-w-[130px]">
              <div className="text-2xl font-display font-bold text-bz-cyan">100+</div>
              <div className="text-[11px] text-bz-muted mt-0.5">Trial Sites</div>
            </Chip>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button onClick={scrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-bz-muted/50 hover:text-bz-muted transition-colors">
        <span className="text-[10px] tracking-widest uppercase font-mono">scroll</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </button>
    </section>
  );
}
