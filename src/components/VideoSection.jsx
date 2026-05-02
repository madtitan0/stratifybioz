import { useRef, useEffect, useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Play, X, Zap, Users, Globe, ChevronLeft, ChevronRight } from 'lucide-react';

// ← Once you have a company video, paste the YouTube embed URL here:
// e.g. "https://www.youtube.com/embed/YOUR_VIDEO_ID"
const COMPANY_VIDEO = '';

/* ─── Science canvas background ─── */
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
  return <canvas ref={ref} className="absolute inset-0 w-full h-full" />;
}

/* ─── Animated company story shown in modal when no video URL is set ─── */
const SLIDES = [
  { color: '#00E5FF', stat: '29+', unit: 'Years', label: 'Combined Clinical Expertise', sub: 'Decades of India & APAC regulatory mastery' },
  { color: '#8B2FFF', stat: '100+', unit: 'Sites',  label: 'Active Pan-India Trial Sites', sub: 'NABH-accredited investigator network' },
  { color: '#00FF88', stat: '14',   unit: 'Areas',  label: 'Therapeutic Specialisations', sub: 'Oncology, CNS, Rare Diseases & beyond' },
  { color: '#F59E0B', stat: '~50%', unit: 'Saving', label: 'Lower Costs vs US/EU Studies', sub: 'ICH GCP quality at emerging-market rates' },
  { color: '#38BDF8', stat: '1.4B+', unit: 'Reach', label: 'India Patient Pool Advantage', sub: 'Unmatched diversity for global submissions' },
];

function CountUp({ target, color, active }) {
  const [val, setVal] = useState('0');
  useEffect(() => {
    if (!active) return;
    const num = parseFloat(target.replace(/[^0-9.]/g, ''));
    const prefix = target.match(/^[^0-9]*/)?.[0] ?? '';
    const suffix = target.match(/[^0-9.]+$/)?.[0] ?? '';
    if (!num) { setVal(target); return; }
    let start = null; const dur = 900;
    const step = ts => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(`${prefix}${num >= 10 ? Math.round(eased * num) : (eased * num).toFixed(1)}${suffix}`);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target]);
  return (
    <span className="font-display font-bold tabular-nums" style={{ color, fontSize: 'clamp(64px,9vw,120px)', lineHeight: 1 }}>
      {val}
    </span>
  );
}

function CompanyStory() {
  const [slide, setSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef(null);
  const DURATION = 3800;

  const startTimer = () => {
    clearInterval(timerRef.current);
    setProgress(0);
    const start = Date.now();
    timerRef.current = setInterval(() => {
      const elapsed = Date.now() - start;
      const p = elapsed / DURATION;
      if (p >= 1) {
        setSlide(s => {
          const next = (s + 1) % SLIDES.length;
          return next;
        });
        startTimer();
      } else {
        setProgress(p);
      }
    }, 40);
  };

  useEffect(() => { startTimer(); return () => clearInterval(timerRef.current); }, []);
  useEffect(() => { startTimer(); }, [slide]);

  const go = n => { setSlide(n); startTimer(); };
  const s = SLIDES[slide];

  return (
    <div className="w-full h-full relative flex flex-col overflow-hidden"
         style={{ background: 'linear-gradient(135deg, var(--bz-dark) 0%, var(--bz-surface) 100%)' }}>

      {/* Animated background rings */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[1,2,3].map(i => (
          <div key={i} className="absolute rounded-full border border-current opacity-5 animate-spin-slow"
               style={{
                 color: s.color,
                 width: `${i * 260}px`,
                 height: `${i * 260}px`,
                 top: '50%', left: '50%',
                 transform: 'translate(-50%, -50%)',
                 animationDuration: `${20 + i * 8}s`,
                 animationDirection: i % 2 === 0 ? 'reverse' : 'normal',
               }} />
        ))}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full pointer-events-none"
             style={{ background: `radial-gradient(circle, ${s.color}18 0%, transparent 70%)`, transition: 'background 0.6s ease' }} />
      </div>

      {/* Header */}
      <div className="relative flex items-center justify-between px-8 pt-8 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
               style={{ background: `${s.color}18`, border: `1px solid ${s.color}30` }}>
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: s.color }} />
          </div>
          <span className="font-mono text-xs tracking-widest uppercase" style={{ color: s.color }}>StratifyBioZ</span>
        </div>
        <span className="font-mono text-xs text-bz-muted">{slide + 1} / {SLIDES.length}</span>
      </div>

      {/* Main stat */}
      <div className="relative flex-1 flex flex-col items-center justify-center px-8 text-center">
        <div className="mb-2 font-mono text-xs tracking-widest uppercase" style={{ color: `${s.color}99` }}>
          {s.unit}
        </div>
        <CountUp target={s.stat} color={s.color} active={true} key={slide} />
        <div className="mt-5 font-display font-bold text-white text-xl lg:text-2xl leading-snug max-w-sm">
          {s.label}
        </div>
        <div className="mt-2 text-bz-muted text-sm max-w-xs">{s.sub}</div>
      </div>

      {/* Progress bar + controls */}
      <div className="relative px-8 pb-8">
        {/* Progress bar */}
        <div className="h-0.5 rounded-full mb-5 overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)' }}>
          <div className="h-full rounded-full transition-none"
               style={{ width: `${progress * 100}%`, background: `linear-gradient(90deg, ${s.color}, ${s.color}88)` }} />
        </div>

        {/* Dot nav + arrows */}
        <div className="flex items-center justify-between">
          <button onClick={() => go((slide - 1 + SLIDES.length) % SLIDES.length)}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-all"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <ChevronLeft className="w-4 h-4 text-bz-muted" />
          </button>

          <div className="flex items-center gap-2">
            {SLIDES.map((sl, i) => (
              <button key={i} onClick={() => go(i)}
                      className="rounded-full transition-all duration-300"
                      style={{
                        width: i === slide ? '20px' : '6px',
                        height: '6px',
                        background: i === slide ? sl.color : 'rgba(255,255,255,0.15)',
                      }} />
            ))}
          </div>

          <button onClick={() => go((slide + 1) % SLIDES.length)}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-all"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <ChevronRight className="w-4 h-4 text-bz-muted" />
          </button>
        </div>
      </div>
    </div>
  );
}

const HIGHLIGHTS = [
  { Icon: Zap,   val: 'Phase I–IV', desc: 'Full trial lifecycle support' },
  { Icon: Users, val: '1.4B+',      desc: 'India patient pool diversity' },
  { Icon: Globe, val: 'APAC',       desc: 'Multi-country trial capacity' },
];

export default function VideoSection() {
  const [ref, vis] = useScrollReveal(0.08);
  const [modal, setModal] = useState(false);

  return (
    <section style={{ background: 'var(--bz-dark)', minHeight: '75vh' }} className="relative overflow-hidden flex items-center">
      <ScienceCanvas />

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
                <div className="text-xs text-bz-muted">Key facts & capabilities</div>
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
          <div className="relative w-full max-w-3xl aspect-video rounded-2xl overflow-hidden shadow-2xl"
               onClick={e => e.stopPropagation()}>
            {COMPANY_VIDEO
              ? <iframe src={`${COMPANY_VIDEO}?autoplay=1&rel=0&modestbranding=1`}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen title="StratifyBioZ" />
              : <CompanyStory onClose={() => setModal(false)} />
            }
            <button onClick={() => setModal(false)}
                    className="absolute top-4 right-4 w-9 h-9 rounded-full glass flex items-center justify-center text-white hover:bg-white/10 z-10">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
