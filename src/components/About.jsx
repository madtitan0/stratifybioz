import { useScrollReveal } from '../hooks/useScrollReveal';

const PILLARS = [
  { label: 'Vision',     color: '#00E5FF', text: 'To be the premier clinical research partner in Asia — delivering precision-driven trials through AI-powered platforms, patient-engagement tools, and real-world evidence that accelerate drug development.' },
  { label: 'Mission',    color: '#8B2FFF', text: 'Delivering rapid, high-quality clinical studies via an extensive site network, logistical excellence, and end-to-end project management across APAC — without compromise.' },
  { label: 'Core Value', color: '#00FF88', text: 'Representation matters. We actively reduce gender, ethnic, and racial disparities in clinical trials while championing access for underserved patient populations.' },
];

const CHECKS = [
  'Single coordination point for multi-specialty clinical sites',
  'Deep expertise in CDSCO & Indian regulatory frameworks',
  'Biomarker-based patient stratification for precise enrollment',
  'Clinical trial sample management & logistics excellence',
  'Integrated, healthcare-compliant data management platforms',
  'Expedited regulatory approval mechanisms across APAC',
];

const BARS = [
  { label: 'Clinical Site Network',  pct: 92, color: '#00E5FF' },
  { label: 'Regulatory Expertise',   pct: 96, color: '#8B2FFF' },
  { label: 'Data Management',        pct: 88, color: '#00E5FF' },
  { label: 'Quality Assurance',      pct: 94, color: '#00FF88' },
  { label: 'Biostatistics',          pct: 85, color: '#8B2FFF' },
];

export default function About() {
  const [ref, vis] = useScrollReveal();

  return (
    <section id="about" style={{ background: 'var(--bz-black)' }} className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
           style={{ background: 'radial-gradient(circle, rgba(0,229,255,0.04) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-5 lg:px-8">

        {/* ── Header ── */}
        <div ref={ref} className={`reveal ${vis ? 'in' : ''} max-w-3xl mb-16 lg:mb-20`}>
          <p className="font-mono text-xs text-bz-cyan tracking-widest uppercase mb-4">About StratifyBioZ</p>
          <h2 className="font-display font-bold text-white leading-[1.05] tracking-tight mb-5"
              style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}>
            The Perfect Trifecta in
            <br />
            <span className="text-grad-cyan">Translational Research</span>
          </h2>
          <p className="text-bz-muted text-base lg:text-lg leading-relaxed max-w-2xl">
            StratifyBioZ is a premier clinical research and healthcare company that enables
            fit-for-purpose clinical development of novel therapeutics. We combine early engagement,
            strategic planning, and centralized risk-based monitoring with an extensive clinical
            network across India and the APAC region.
          </p>
        </div>

        {/* ── Pillars ── */}
        <div className="grid md:grid-cols-3 gap-5 mb-16 lg:mb-20">
          {PILLARS.map((p, i) => (
            <div key={p.label}
                 className={`reveal d${i + 1} ${vis ? 'in' : ''} card-lift rounded-2xl p-7`}
                 style={{ background: 'var(--bz-surface)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div className="w-10 h-10 rounded-xl mb-5 flex items-center justify-center"
                   style={{ background: `${p.color}18`, border: `1px solid ${p.color}25` }}>
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: p.color }} />
              </div>
              <h3 className="font-display font-bold text-white text-lg mb-2">{p.label}</h3>
              <p className="text-bz-muted text-sm leading-relaxed">{p.text}</p>
            </div>
          ))}
        </div>

        {/* ── Checks + Bars ── */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* Checks */}
          <div className={`reveal ${vis ? 'in' : ''}`}>
            <h3 className="font-display font-bold text-white text-2xl lg:text-3xl mb-2">Why StratifyBioZ Stands Apart</h3>
            <p className="text-bz-muted text-sm mb-8">Our integrated approach makes us the preferred partner for sponsors seeking reliable, efficient, compliant clinical development.</p>
            <ul className="space-y-4">
              {CHECKS.map((c, i) => (
                <li key={i} className={`reveal d${Math.min(i + 1, 6)} ${vis ? 'in' : ''} flex items-start gap-3`}>
                  <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 20 20">
                    <circle cx="10" cy="10" r="9" stroke="rgba(0,229,255,0.3)" strokeWidth="1" />
                    <path d="M6 10l3 3 5-5" stroke="#00E5FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-bz-text text-sm leading-relaxed">{c}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Capability bars */}
          <div className={`reveal d2 ${vis ? 'in' : ''}`}>
            <div className="rounded-2xl p-8"
                 style={{ background: 'var(--bz-surface)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <p className="font-mono text-xs text-bz-muted tracking-widest uppercase mb-6">Capability Snapshot</p>
              <div className="space-y-6">
                {BARS.map(b => (
                  <div key={b.label}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-bz-text font-medium">{b.label}</span>
                      <span className="font-mono text-xs" style={{ color: b.color }}>{b.pct}%</span>
                    </div>
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                      <div className="h-full rounded-full transition-all duration-1000"
                           style={{ width: vis ? `${b.pct}%` : '0%', background: `linear-gradient(90deg, ${b.color}, ${b.color}88)` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
