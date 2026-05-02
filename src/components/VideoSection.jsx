import { useRef, useEffect, useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Play, X } from 'lucide-react';

/* ── Animated scientific visualization background ── */
function VisualBg() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;
    let t = 0;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const W = () => canvas.width;
    const H = () => canvas.height;

    function draw() {
      ctx.clearRect(0, 0, W(), H());
      t += 0.008;

      // Flowing sine wave lines
      for (let wave = 0; wave < 8; wave++) {
        const phase     = (wave / 8) * Math.PI * 2;
        const amplitude = 40 + wave * 15;
        const freq      = 0.008 + wave * 0.001;
        const yBase     = H() * 0.2 + wave * (H() * 0.08);
        const alpha     = 0.04 + (Math.sin(t + phase) * 0.5 + 0.5) * 0.08;

        ctx.beginPath();
        ctx.strokeStyle = wave % 2 === 0
          ? `rgba(0,229,255,${alpha})`
          : `rgba(139,47,255,${alpha * 0.7})`;
        ctx.lineWidth = 1;

        for (let x = 0; x <= W(); x += 2) {
          const y = yBase + Math.sin(x * freq + t + phase) * amplitude;
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Moving dot grid
      const spacing = 60;
      for (let gx = 0; gx < W(); gx += spacing) {
        for (let gy = 0; gy < H(); gy += spacing) {
          const pulse = Math.sin(t * 2 + gx * 0.02 + gy * 0.02) * 0.5 + 0.5;
          const a = pulse * 0.1;
          if (a > 0.01) {
            ctx.beginPath();
            ctx.arc(gx, gy, 1 + pulse * 1.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0,229,255,${a})`;
            ctx.fill();
          }
        }
      }

      // Scan line
      const scanY = ((t * 80) % (H() + 200)) - 100;
      const sg = ctx.createLinearGradient(0, scanY - 40, 0, scanY + 40);
      sg.addColorStop(0,   'transparent');
      sg.addColorStop(0.5, 'rgba(0,229,255,0.06)');
      sg.addColorStop(1,   'transparent');
      ctx.fillStyle = sg;
      ctx.fillRect(0, scanY - 40, W(), 80);

      raf = requestAnimationFrame(draw);
    }
    draw();

    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

const STATS = [
  { value: '29+', label: 'Years of expertise in pharma & clinical research' },
  { value: '7',   label: 'Integrated service divisions under one roof' },
  { value: '100+',label: 'Clinical trial sites across pan-India network' },
];

export default function VideoSection() {
  const [ref, isVisible] = useScrollReveal(0.1);
  const [modal, setModal]   = useState(false);
  const videoRef            = useRef(null);

  return (
    <section className="relative overflow-hidden" style={{ background: 'var(--bz-dark)', minHeight: '80vh' }}>
      {/* ── Animated scientific background ── */}
      <VisualBg />

      {/* Dark gradient overlays */}
      <div className="absolute inset-0 pointer-events-none"
           style={{ background: 'linear-gradient(135deg, rgba(3,4,14,0.85) 0%, rgba(7,9,26,0.6) 50%, rgba(3,4,14,0.85) 100%)' }} />

      {/* ── Actual video element (replace src with your video file) ── */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover opacity-0"
        autoPlay muted loop playsInline
        onCanPlay={() => { if (videoRef.current) videoRef.current.style.opacity = '0.18'; }}
        /* ↓ Replace with your own video URL or file path */
        src=""
      />

      {/* ── Content ── */}
      <div ref={ref} className="relative max-w-7xl mx-auto px-5 lg:px-8 py-28 lg:py-36">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left: text */}
          <div className={`space-y-8 reveal ${isVisible ? 'in' : ''}`}>
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass border border-white/8 text-bz-muted text-xs font-mono tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-bz-green animate-pulse" />
              Science in Action
            </div>

            <h2 className="font-display font-bold text-white leading-[1.05]"
                style={{ fontSize: 'clamp(36px, 5vw, 68px)' }}>
              Precision.
              <br />
              <span className="text-grad-cyan">At Scale.</span>
              <br />
              Every Time.
            </h2>

            <p className="text-bz-muted text-base lg:text-lg leading-relaxed max-w-[480px]">
              From first-in-human studies to large-scale Phase III trials, StratifyBioZ
              orchestrates every variable — patient stratification, regulatory pathways,
              data integrity — with the rigour your molecule deserves.
            </p>

            {/* Play button */}
            <button
              onClick={() => setModal(true)}
              className="group inline-flex items-center gap-4 text-white font-semibold"
            >
              <div className="w-14 h-14 rounded-full flex items-center justify-center glow-cyan transition-transform duration-300 group-hover:scale-110"
                   style={{ background: 'linear-gradient(135deg, rgba(0,229,255,0.2), rgba(0,229,255,0.05))', border: '1px solid rgba(0,229,255,0.4)' }}>
                <Play className="w-5 h-5 text-bz-cyan ml-0.5" fill="currentColor" />
              </div>
              <div>
                <div className="text-sm font-display font-semibold">Watch Our Story</div>
                <div className="text-xs text-bz-muted">2 min overview</div>
              </div>
            </button>
          </div>

          {/* Right: stats panel */}
          <div className={`reveal d2 ${isVisible ? 'in' : ''}`}>
            <div className="space-y-4">
              {STATS.map((s, i) => (
                <div key={i}
                     className="glass border border-white/6 rounded-2xl p-6 flex items-center gap-6 card-lift"
                     style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                  <div className="text-4xl font-display font-bold text-grad-cyan flex-shrink-0 min-w-[70px]">
                    {s.value}
                  </div>
                  <p className="text-bz-muted text-sm leading-relaxed">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Live indicator */}
            <div className="mt-5 flex items-center gap-2.5 text-xs text-bz-muted font-mono">
              <span className="w-2 h-2 rounded-full bg-bz-green animate-pulse" />
              Live clinical operations · India & APAC
            </div>
          </div>
        </div>
      </div>

      {/* ── Video modal ── */}
      {modal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4"
             style={{ background: 'rgba(3,4,14,0.95)', backdropFilter: 'blur(20px)' }}
             onClick={() => setModal(false)}>
          <div className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden shadow-2xl"
               onClick={e => e.stopPropagation()}>
            {/* Replace the src with your actual video or YouTube embed URL */}
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/?autoplay=1"
              allow="autoplay; fullscreen"
              allowFullScreen
              title="StratifyBioZ Overview"
            />
            <button onClick={() => setModal(false)}
                    className="absolute top-4 right-4 w-9 h-9 rounded-full glass flex items-center justify-center text-white hover:bg-white/10 transition-all">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
