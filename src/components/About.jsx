import { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { CheckCircle2, ChevronDown } from 'lucide-react';

const PILLARS = [
  { label: 'Vision',     color: '#00E5FF', text: 'To be the premier clinical research partner in Asia — delivering precision-driven trials through AI-powered platforms, patient-engagement tools, and real-world evidence.' },
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

export default function About() {
  const [ref, vis] = useScrollReveal();
  const [expanded, setExpanded] = useState(false);

  return (
    <section id="about" style={{ background: 'var(--bz-black)' }} className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
           style={{ background: 'radial-gradient(circle,rgba(0,229,255,0.03) 0%,transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-5 lg:px-8">

        {/* Header */}
        <div ref={ref} className={`reveal ${vis ? 'in' : ''} grid lg:grid-cols-2 gap-10 items-end mb-12`}>
          <div>
            <p className="section-label mb-3">About StratifyBioZ</p>
            <h2 className="font-display font-bold text-white leading-[1.04]"
                style={{ fontSize: 'clamp(30px, 4vw, 54px)' }}>
              The Perfect Trifecta in
              <br />
              <span className="text-grad-cyan">Translational Research</span>
            </h2>
          </div>
          <p className="text-bz-muted text-base lg:text-lg leading-relaxed">
            StratifyBioZ enables fit-for-purpose clinical development of novel therapeutics —
            combining early engagement, strategic planning, centralized risk-based monitoring,
            and an extensive clinical network across India and the APAC region.
          </p>
        </div>

        {/* Pillars */}
        <div className="grid md:grid-cols-3 gap-4 mb-12">
          {PILLARS.map((p, i) => (
            <div key={p.label}
                 className={`reveal d${i + 1} ${vis ? 'in' : ''} grad-border rounded-2xl p-6`}
                 style={{ background: 'var(--bz-surface)' }}>
              <div className="w-9 h-9 rounded-xl mb-4 flex items-center justify-center"
                   style={{ background: `${p.color}12`, border: `1px solid ${p.color}20` }}>
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: p.color, boxShadow: `0 0 8px ${p.color}` }} />
              </div>
              <h3 className="font-display font-bold text-white text-base mb-1.5">{p.label}</h3>
              <p className="text-bz-muted text-sm leading-relaxed">{p.text}</p>
            </div>
          ))}
        </div>

        {/* Two-col: image + checks */}
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Image */}
          <div className={`reveal reveal-left ${vis ? 'in' : ''} relative rounded-2xl overflow-hidden img-zoom`}
               style={{ border: '1px solid rgba(255,255,255,0.07)', height: '340px' }}>
            <img src="https://images.unsplash.com/photo-1576671081837-49000212a370?w=700&auto=format&fit=crop&q=80"
                 alt="StratifyBioZ research"
                 className="w-full h-full object-cover"
                 onError={e => { e.target.parentElement.style.background='linear-gradient(135deg,#0C1228,#0D2045)'; e.target.style.display='none'; }} />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top,rgba(3,4,14,0.75) 0%,transparent 55%)' }} />
            <div className="absolute bottom-5 left-5 right-5">
              <div className="glass-image rounded-xl px-4 py-3">
                <div className="text-xs text-bz-muted mb-1 font-mono uppercase tracking-wider">Core Principle</div>
                <div className="text-sm text-white font-medium leading-snug">"Representation matters in clinical research — for science and for humanity."</div>
              </div>
            </div>
          </div>

          {/* Checks with expand */}
          <div className={`reveal reveal-right ${vis ? 'in' : ''}`}>
            <h3 className="font-display font-bold text-white text-xl lg:text-2xl mb-2">Why StratifyBioZ?</h3>
            <p className="text-bz-muted text-sm mb-6">Our integrated approach makes us the preferred CRO partner across India and APAC.</p>

            <ul className="space-y-3.5">
              {(expanded ? CHECKS : CHECKS.slice(0, 4)).map((c, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4.5 h-4.5 flex-shrink-0 mt-0.5" style={{ color: '#00E5FF' }} />
                  <span className="text-bz-text text-sm leading-relaxed">{c}</span>
                </li>
              ))}
            </ul>

            {CHECKS.length > 4 && (
              <button onClick={() => setExpanded(!expanded)}
                      className="mt-4 flex items-center gap-2 text-xs font-semibold text-bz-muted hover:text-bz-cyan transition-colors">
                <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200"
                             style={{ transform: expanded ? 'rotate(180deg)' : 'none' }} />
                {expanded ? 'Show less' : `Show ${CHECKS.length - 4} more`}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
