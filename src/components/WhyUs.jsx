import { useScrollReveal } from '../hooks/useScrollReveal';

const FEATURES = [
  { n: '01', title: 'Centralized Multi-Site Coordination', color: '#00E5FF',
    desc: 'One coordination point for all multi-specialty clinical sites — eliminating fragmented communication and accelerating trial timelines significantly.' },
  { n: '02', title: 'Deep Indian Regulatory Expertise', color: '#8B2FFF',
    desc: 'Unparalleled knowledge of CDSCO frameworks, local IRB partnerships, and stringent ethical guidelines ensures smooth approvals and full compliance.' },
  { n: '03', title: 'Expedited Approval Mechanisms', color: '#00FF88',
    desc: 'Strategic relationships with regulatory bodies and a proven track record enable accelerated clinical trial approval timelines across India.' },
  { n: '04', title: 'Patient-Centric Enrollment', color: '#00E5FF',
    desc: 'Biomarker-based patient stratification and diverse recruitment channels deliver precise, representative cohorts — minimizing screen failures.' },
  { n: '05', title: 'Independent Compliance Framework', color: '#F59E0B',
    desc: 'Every activity is governed by an independent QA department, ensuring GCP, ICH, and local Health Authority compliance at every trial stage.' },
  { n: '06', title: 'Technology-Driven Operations', color: '#8B2FFF',
    desc: 'AI-assisted platforms, eCRF systems, and healthcare-compliant data infrastructure provide real-time sponsor visibility and superior data integrity.' },
];

export default function WhyUs() {
  const [ref, vis] = useScrollReveal();

  return (
    <section id="why-us" style={{ background: 'var(--bz-black)' }} className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
           style={{ background: 'radial-gradient(circle, rgba(139,47,255,0.05) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-5 lg:px-8">

        {/* ── Header ── */}
        <div ref={ref} className={`reveal ${vis ? 'in' : ''} mb-14 lg:mb-16`}>
          <div className="grid lg:grid-cols-2 gap-8 items-end">
            <div>
              <p className="font-mono text-xs text-bz-muted tracking-widest uppercase mb-3">Why Choose Us</p>
              <h2 className="font-display font-bold text-white leading-[1.05]"
                  style={{ fontSize: 'clamp(32px, 4.5vw, 60px)' }}>
                Built for Speed.
                <br />
                <span className="text-grad-brand">Engineered for Quality.</span>
              </h2>
            </div>
            <p className="text-bz-muted text-base lg:text-lg leading-relaxed">
              When scientific breakthroughs depend on flawless execution, sponsors and investigators
              choose StratifyBioZ for our unmatched combination of regional expertise, operational
              rigour, and technology-enabled transparency.
            </p>
          </div>
        </div>

        {/* ── Features ── */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {FEATURES.map((f, i) => (
            <div key={f.n}
                 className={`reveal d${(i % 3) + 1} ${vis ? 'in' : ''} card-lift group relative rounded-2xl p-6 overflow-hidden`}
                 style={{ background: 'var(--bz-surface)', border: '1px solid rgba(255,255,255,0.05)' }}>
              {/* Hover gradient */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
                   style={{ background: `radial-gradient(circle at 30% 30%, ${f.color}08 0%, transparent 70%)` }} />
              {/* Number */}
              <span className="absolute top-4 right-5 font-mono text-4xl font-bold select-none"
                    style={{ color: `${f.color}0D` }}>{f.n}</span>

              <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-5"
                   style={{ background: `${f.color}12`, border: `1px solid ${f.color}20` }}>
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: f.color }} />
              </div>
              <h3 className="font-display font-semibold text-white text-base mb-2.5">{f.title}</h3>
              <p className="text-bz-muted text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* ── CTA strip ── */}
        <div className={`reveal d3 ${vis ? 'in' : ''} rounded-2xl p-8 lg:p-10 flex flex-col md:flex-row items-center justify-between gap-6`}
             style={{ background: 'linear-gradient(135deg, rgba(0,229,255,0.05) 0%, rgba(139,47,255,0.05) 100%)', border: '1px solid rgba(0,229,255,0.1)' }}>
          <div>
            <h3 className="font-display font-bold text-white text-xl lg:text-2xl mb-1.5">
              Ready to accelerate your clinical program?
            </h3>
            <p className="text-bz-muted text-sm">
              Partner with StratifyBioZ for compliant, efficient, and patient-centric clinical development.
            </p>
          </div>
          <a href="#contact"
             onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
             className="btn-primary inline-flex items-center justify-center px-8 py-4 text-sm flex-shrink-0 whitespace-nowrap">
            Start the Conversation
          </a>
        </div>
      </div>
    </section>
  );
}
