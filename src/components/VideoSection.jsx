import { useRef, useEffect, useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Play, X, Zap, Users, Globe } from 'lucide-react';

function ScienceCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext('2d'); let raf, t = 0;
    const resize = () => { c.width = c.offsetWidth; c.height = c.offsetHeight; };
    resize(); window.addEventListener('resize', resize);
    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height); t += 0.006;
      for (let w = 0; w < 7; w++) {
        const phase = (w / 7) * Math.PI * 2, amp = 35 + w * 18, freq = 0.007 + w * 0.0008;
        const yBase = c.height * 0.15 + w * (c.height * 0.1);
        const alpha = 0.03 + (Math.sin(t + phase) * 0.5 + 0.5) * 0.07;
        ctx.beginPath();
        ctx.strokeStyle = w % 2 === 0 ? `rgba(0,229,255,${alpha})` : `rgba(139,47,255,${alpha * 0.8})`;
        ctx.lineWidth = 1;
        for (let x = 0; x <= c.width; x += 3) {
          const y = yBase + Math.sin(x * freq + t + phase) * amp;
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      const sp = 55;
      for (let gx = 0; gx < c.width; gx += sp) for (let gy = 0; gy < c.height; gy += sp) {
        const p = Math.sin(t * 1.8 + gx * 0.018 + gy * 0.018) * 0.5 + 0.5;
        if (p > 0.01) { ctx.beginPath(); ctx.arc(gx, gy, p * 1.5, 0, Math.PI * 2); ctx.fillStyle = `rgba(0,229,255,${p * 0.08})`; ctx.fill(); }
      }
      const sy = ((t * 75) % (c.height + 160)) - 80;
      const sg = ctx.createLinearGradient(0, sy - 30, 0, sy + 30);
      sg.addColorStop(0, 'transparent'); sg.addColorStop(0.5, 'rgba(0,229,255,0.05)'); sg.addColorStop(1, 'transparent');
      ctx.fillStyle = sg; ctx.fillRect(0, sy - 30, c.width, 60);
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={c => { ref.current = c; }} className="absolute inset-0 w-full h-full" />;
}

const HIGHLIGHTS = [
  { Icon: Zap,   val: 'Phase I–IV', desc: 'Full trial lifecycle support' },
  { Icon: Users, val: '1.4B+',      desc: 'India patient pool diversity' },
  { Icon: Globe, val: 'APAC',       desc: 'Multi-country trial capacity' },
];

export default function VideoSection() {
  const [ref, vis] = useScrollReveal(0.08);
  const [modal, setModal] = useState(false);
  const vidRef = useRef(null);

  return (
    <section style={{ background: 'var(--bz-dark)', minHeight: '75vh' }} className="relative overflow-hidden flex items-center">
      <ScienceCanvas />

      {/* Real video element — drop your MP4 path in src="" */}
      <video ref={vidRef} className="absolute inset-0 w-full h-full object-cover opacity-0"
             autoPlay muted loop playsInline src=""
             onCanPlay={() => { if (vidRef.current) vidRef.current.style.opacity = '0.15'; }} />

      <div className="absolute inset-0 pointer-events-none"
           style={{ background: 'linear-gradient(135deg, rgba(3,4,14,0.88) 0%, rgba(7,9,26,0.65) 50%, rgba(3,4,14,0.88) 100%)' }} />

      <div ref={ref} className="relative max-w-7xl mx-auto px-5 lg:px-8 py-24 lg:py-32 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <div className={`space-y-8 reveal-left ${vis ? 'in' : ''}`}>
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass text-bz-muted text-xs font-mono tracking-widest uppercase"
                 style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-bz-green animate-pulse" />
              Science in Action
            </div>

            <h2 className="font-display font-bold text-white leading-[1.03]"
                style={{ fontSize: 'clamp(38px, 5vw, 70px)' }}>
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

            <button onClick={() => setModal(true)}
                    className="group inline-flex items-center gap-4 text-white">
              <div className="w-14 h-14 rounded-full flex items-center justify-center animate-glow-pulse transition-transform duration-300 group-hover:scale-110"
                   style={{ background: 'linear-gradient(135deg,rgba(0,229,255,0.18),rgba(0,229,255,0.05))', border: '1px solid rgba(0,229,255,0.4)' }}>
                <Play className="w-5 h-5 ml-0.5" style={{ color: '#00E5FF' }} fill="#00E5FF" />
              </div>
              <div>
                <div className="text-sm font-display font-semibold">Watch Our Story</div>
                <div className="text-xs text-bz-muted">2-minute overview</div>
              </div>
            </button>
          </div>

          {/* Right: Highlight cards */}
          <div className={`space-y-4 reveal-right ${vis ? 'in' : ''}`}>
            {HIGHLIGHTS.map((h, i) => (
              <div key={i}
                   className={`glass border-white/5 card-lift rounded-2xl p-6 flex items-center gap-5 d${i + 1}`}
                   style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                     style={{ background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.15)' }}>
                  <h.Icon className="w-5 h-5" style={{ color: '#00E5FF' }} />
                </div>
                <div>
                  <div className="text-2xl font-display font-bold text-white">{h.val}</div>
                  <div className="text-bz-muted text-sm">{h.desc}</div>
                </div>
              </div>
            ))}

            {/* Image card */}
            <div className={`reveal d4 ${vis ? 'in' : ''} relative rounded-2xl overflow-hidden h-40 img-zoom`}
                 style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
              <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&auto=format&fit=crop&q=80"
                   alt="Clinical research in progress" className="w-full h-full object-cover"
                   onError={e => { e.target.parentElement.style.background = 'linear-gradient(135deg,#0C1228,#0D2045)'; e.target.style.display='none'; }} />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg,rgba(3,4,14,0.4),rgba(3,4,14,0.1))' }} />
              <div className="absolute bottom-4 left-4 text-white">
                <div className="text-sm font-display font-semibold">Real-World Evidence Studies</div>
                <div className="text-xs text-bz-muted">Decentralized & hybrid trial designs</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4"
             style={{ background: 'rgba(3,4,14,0.96)', backdropFilter: 'blur(24px)' }}
             onClick={() => setModal(false)}>
          <div className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden shadow-2xl"
               onClick={e => e.stopPropagation()}>
            {/* Replace src with your YouTube embed or video URL */}
            <div className="w-full h-full flex items-center justify-center" style={{ background: 'var(--bz-surface)' }}>
              <div className="text-center text-bz-muted">
                <Play className="w-12 h-12 mx-auto mb-3" style={{ color: '#00E5FF' }} />
                <p className="text-sm">Add your YouTube embed URL or video file path here</p>
              </div>
            </div>
            <button onClick={() => setModal(false)}
                    className="absolute top-4 right-4 w-9 h-9 rounded-full glass flex items-center justify-center text-white hover:bg-white/10">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
