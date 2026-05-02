import { useScrollReveal } from '../hooks/useScrollReveal';

const STEPS = [
  {
    n: '01', color: '#00E5FF',
    title: 'Feasibility & Strategy',
    desc: 'We begin with a thorough feasibility assessment — evaluating site capabilities, patient populations, and regulatory pathways to define the optimal development strategy for your molecule.',
  },
  {
    n: '02', color: '#8B2FFF',
    title: 'Regulatory Planning',
    desc: 'Our regulatory team prepares comprehensive submission packages, navigates CDSCO requirements, and establishes the approval roadmap with defined milestones and timelines.',
  },
  {
    n: '03', color: '#00E5FF',
    title: 'Site Selection & Initiation',
    desc: 'Drawing on our pan-India site network, we evaluate, select, and initiate sites — with full protocol training, ethics committee submissions, and investigator briefings.',
  },
  {
    n: '04', color: '#00FF88',
    title: 'Execution & Monitoring',
    desc: 'Centralized, risk-based monitoring ensures real-time data quality and patient safety. Our coordinators manage enrollment, adverse event reporting, and protocol compliance.',
  },
  {
    n: '05', color: '#8B2FFF',
    title: 'Data Analysis & Reporting',
    desc: 'From database lock through statistical analysis to the final Clinical Study Report — our biostatistics team delivers precise, audit-ready deliverables.',
  },
  {
    n: '06', color: '#00E5FF',
    title: 'Closeout & Submission',
    desc: 'We manage site closeout, archival, and final regulatory submissions — ensuring every artifact meets the standards required for global drug approval dossiers.',
  },
];

export default function Process() {
  const [ref, vis] = useScrollReveal();

  return (
    <section id="process" style={{ background: 'var(--bz-dark)' }} className="py-24 lg:py-32 overflow-hidden">
      <div className="divider-glow" style={{ marginBottom: 0, position: 'absolute', top: 0, left: 0, right: 0 }} />

      <div className="max-w-7xl mx-auto px-5 lg:px-8">

        {/* Header */}
        <div ref={ref} className={`reveal ${vis ? 'in' : ''} max-w-2xl mb-14 lg:mb-18`}>
          <p className="font-mono text-xs text-bz-muted tracking-widest uppercase mb-3">Our Methodology</p>
          <h2 className="font-display font-bold text-white leading-[1.05]"
              style={{ fontSize: 'clamp(32px, 4.5vw, 60px)' }}>
            A Proven, Six-Phase
            <br />
            <span className="text-grad-brand">Development Process</span>
          </h2>
          <p className="text-bz-muted text-base lg:text-lg leading-relaxed mt-4">
            Every engagement follows a disciplined methodology — ensuring predictability,
            quality, and speed from first contact to final submission.
          </p>
        </div>

        {/* Timeline */}
        <div className="grid lg:grid-cols-2 gap-x-16 gap-y-0">
          {STEPS.map((s, i) => (
            <div key={s.n}
                 className={`reveal d${(i % 3) + 1} ${vis ? 'in' : ''} relative flex gap-6 pb-10`}>
              {/* Connector line (all but last in column) */}
              {i < STEPS.length - 2 && (
                <div className="absolute left-[19px] top-[44px] bottom-0 w-px"
                     style={{ background: `linear-gradient(to bottom, ${s.color}30, transparent)` }} />
              )}

              {/* Step dot */}
              <div className="flex-shrink-0 relative z-10">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center font-mono text-xs font-bold"
                     style={{ background: `${s.color}15`, border: `1px solid ${s.color}30`, color: s.color }}>
                  {s.n}
                </div>
              </div>

              {/* Content */}
              <div className="pt-1.5 pb-2">
                <h3 className="font-display font-bold text-white text-lg mb-2">{s.title}</h3>
                <p className="text-bz-muted text-sm leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
