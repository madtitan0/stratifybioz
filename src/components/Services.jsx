import { useScrollReveal } from '../hooks/useScrollReveal';

const SVC = [
  {
    num: '01', title: 'Clinical Operations',
    color: '#00E5FF',
    span: 'lg:col-span-2',
    desc: 'Leveraging the most effective communication channels, we attract and retain a diverse, pre-screened patient pool. From feasibility assessments and site selection through data management, closeout, and CSR — every phase managed with precision.',
    tags: ['Feasibility', 'Site Selection', 'End-to-End PM', 'Vendor Oversight', 'CSR Support'],
  },
  {
    num: '02', title: 'Site Management Services',
    color: '#8B2FFF',
    span: 'lg:col-span-1',
    desc: 'Optimal site management is fundamental to clinical success. Dedicated Study Start-Up teams, investigator training, EC submissions, and research coordinator assignment for enrollment tracking.',
    tags: ['Protocol Training', 'Study Start-Up', 'EC Submissions'],
  },
  {
    num: '03', title: 'Data Management',
    color: '#00FF88',
    span: 'lg:col-span-1',
    desc: 'Integrated data management platform spanning CRF/eCRF design, query resolution, SAE reconciliation, and full 21 CFR Part 11 compliance.',
    tags: ['eCRF Design', 'SAE Reconciliation', '21 CFR Pt 11'],
  },
  {
    num: '04', title: 'Quality Assurance',
    color: '#F59E0B',
    span: 'lg:col-span-1',
    desc: 'Independent QA department ensuring GCP, ICH, and local Health Authority compliance across all trial activities. Internal audits, CAPA, SOP development.',
    tags: ['GCP Compliance', 'Internal Audits', 'CAPA'],
  },
  {
    num: '05', title: 'Regulatory Affairs',
    color: '#00E5FF',
    span: 'lg:col-span-2',
    desc: 'Deep expertise in Indian regulations. Comprehensive regulatory document preparation, clinical trial approvals, import/export licenses, protocol presentations to authorities, national registry, and safety reporting — handled end-to-end.',
    tags: ['CDSCO Filings', 'CT Approvals', 'Safety Reporting', 'Registry', 'Protocol Submissions'],
  },
  {
    num: '06', title: 'Biostatistics',
    color: '#8B2FFF',
    span: 'lg:col-span-1',
    desc: 'Statistics and programming team delivering comprehensive biostatistics from SAS programming and sample size calculations through statistical analysis plans and final analyses.',
    tags: ['SAS Programming', 'Sample Size', 'SAP'],
  },
  {
    num: '07', title: 'Real World Evidence',
    color: '#00FF88',
    span: 'lg:col-span-2',
    desc: 'RWE studies across diverse therapeutic areas, leveraging decentralized and hybrid trial designs to deliver customised datasets that support drug and device commercialization strategies globally.',
    tags: ['Decentralized Trials', 'Hybrid Design', 'Commercialization', 'Device Studies'],
  },
];

function Card({ s, index, vis }) {
  return (
    <div
      className={`${s.span} reveal d${(index % 4) + 1} ${vis ? 'in' : ''} card-lift group relative rounded-2xl p-7 flex flex-col overflow-hidden cursor-default`}
      style={{ background: 'var(--bz-surface)', border: '1px solid rgba(255,255,255,0.05)' }}
    >
      {/* Top-right number watermark */}
      <span className="absolute top-5 right-6 font-mono text-5xl font-bold select-none transition-colors duration-300"
            style={{ color: `${s.color}10` }}>
        {s.num}
      </span>

      {/* Gradient accent bar */}
      <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
           style={{ background: `linear-gradient(90deg, ${s.color}80, transparent)` }} />

      {/* Icon dot */}
      <div className="w-10 h-10 rounded-xl mb-5 flex items-center justify-center"
           style={{ background: `${s.color}12`, border: `1px solid ${s.color}20` }}>
        <div className="w-3 h-3 rounded-full" style={{ background: s.color, boxShadow: `0 0 10px ${s.color}60` }} />
      </div>

      <h3 className="font-display font-bold text-white text-xl mb-3">{s.title}</h3>
      <p className="text-bz-muted text-sm leading-relaxed flex-1 mb-5">{s.desc}</p>

      <div className="flex flex-wrap gap-2">
        {s.tags.map(tag => (
          <span key={tag}
                className="px-2.5 py-1 rounded-full text-[11px] font-medium"
                style={{ background: `${s.color}0D`, color: `${s.color}CC`, border: `1px solid ${s.color}18` }}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Services() {
  const [ref, vis] = useScrollReveal();

  return (
    <section id="services" style={{ background: 'var(--bz-black)' }} className="py-24 lg:py-32 relative overflow-hidden">
      {/* dot bg */}
      <div className="absolute inset-0 pointer-events-none opacity-30"
           style={{ backgroundImage: 'radial-gradient(circle, rgba(0,229,255,0.05) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none"
           style={{ background: 'radial-gradient(circle, rgba(139,47,255,0.06) 0%, transparent 70%)' }} />

      <div className="relative max-w-7xl mx-auto px-5 lg:px-8">

        {/* Header */}
        <div ref={ref} className={`reveal ${vis ? 'in' : ''} flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 lg:mb-14`}>
          <div>
            <p className="font-mono text-xs text-bz-cyan tracking-widest uppercase mb-3">Our Services</p>
            <h2 className="font-display font-bold text-white leading-[1.05]"
                style={{ fontSize: 'clamp(32px, 4.5vw, 60px)' }}>
              End-to-End Clinical
              <br />
              <span className="text-grad-cyan">Trial Support</span>
            </h2>
          </div>
          <p className="text-bz-muted text-base lg:text-lg max-w-sm leading-relaxed">
            Seven integrated divisions. One seamless journey from first-in-human to post-market.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid lg:grid-cols-3 gap-4">
          {SVC.map((s, i) => <Card key={s.num} s={s} index={i} vis={vis} />)}
        </div>
      </div>
    </section>
  );
}
