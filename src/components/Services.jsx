import { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { CheckCircle2, ChevronRight, ChevronDown } from 'lucide-react';

/* ─── Curated, domain-relevant images ─── */
const SVC = [
  {
    num: '01', title: 'Clinical Operations', color: '#00E5FF',
    /* Laboratory/scientist at work */
    img: 'https://images.unsplash.com/photo-1576671081837-49000212a370?w=800&auto=format&fit=crop&q=80',
    tagline: 'End-to-end trial management with precision',
    desc: 'By leveraging the most appropriate communication channels, we attract and retain a diverse, broad, pre-screened patient pool. Our operations teams manage every phase from feasibility through final report with unwavering scientific rigour.',
    bullets: [
      'Comprehensive feasibility assessments and site evaluation',
      'Strategic site selection and investigator qualification',
      'Dedicated end-to-end project management teams',
      'Vendor evaluation, selection, and performance oversight',
      'Centralized risk-based monitoring and on-site visits',
      'Integrated data management through study closeout',
      'Clinical Study Report (CSR) preparation and support',
    ],
    stat: { val: 'Phase I–IV', desc: 'Full development lifecycle' },
  },
  {
    num: '02', title: 'Site Management', color: '#8B2FFF',
    /* Clinical site — investigator & coordinator at work */
    img: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800&auto=format&fit=crop&q=80',
    tagline: 'Operational excellence at every site',
    desc: 'Optimal site management is a key tenet of clinical trial success. We deploy dedicated Study Start-Up specialists, maintain rigorous compliance oversight, and ensure seamless communication between sponsors, investigators, and regulatory bodies.',
    bullets: [
      'Protocol training for principal investigators and site staff',
      'Dedicated Study Start-Up teams per site',
      'Ethics committee and IRB submission management',
      'Ongoing compliance and regulatory oversight',
      'Research coordinator assignment and supervision',
      'Enrollment tracking with real-time reporting dashboards',
      'Adverse event and SAE reporting workflows',
    ],
    stat: { val: '100+', desc: 'Qualified sites nationwide' },
  },
  {
    num: '03', title: 'Data Management', color: '#00FF88',
    /* Data analytics / screens */
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
    tagline: 'Streamlined, compliant, audit-ready',
    desc: 'Our integrated data management platform streamlines and manages clinical datasets from first data point to database lock. We build the infrastructure your data deserves, fully compliant with global regulatory requirements.',
    bullets: [
      'CRF and eCRF design aligned to protocol requirements',
      'Electronic database design, build, and validation',
      'Data entry verification and automated consistency checks',
      'Query generation, resolution, and tracking',
      'Database lock procedures with complete audit trails',
      'Safety database implementation and management',
      'SAE reconciliation and regulatory safety reporting',
      '21 CFR Part 11 compliant systems throughout',
    ],
    stat: { val: '21 CFR', desc: 'Part 11 fully compliant' },
  },
  {
    num: '04', title: 'Quality Assurance', color: '#F59E0B',
    /* Audit / document review — professionals reviewing papers */
    img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=80',
    tagline: 'Independent oversight at every stage',
    desc: 'Our dedicated, independent QA department provides oversight across all clinical trial activities — completely separate from operations. We ensure objective compliance monitoring so your study is inspection-ready from Day 1.',
    bullets: [
      'Quality Management System (QMS) design and implementation',
      'Scheduled internal audit programmes',
      'Vendor and CRO qualification audits',
      'Investigator site audits and compliance checks',
      'CAPA development, tracking, and closure verification',
      'Standard Operating Procedure (SOP) development',
      'Inspection readiness support for regulatory audits',
      'GCP, ICH E6(R2), and local Health Authority compliance',
    ],
    stat: { val: 'GCP', desc: 'ICH E6(R2) certified' },
  },
  {
    num: '05', title: 'Regulatory Affairs', color: '#A78BFA',
    /* Regulatory documents / filing */
    img: 'https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=800&auto=format&fit=crop&q=80',
    tagline: 'Deep Indian & global regulatory expertise',
    desc: 'With unparalleled depth in CDSCO regulatory frameworks, our team navigates India\'s approval pathways with confidence. From IND filing to drug approval, we are your complete regulatory partner — on time, every time.',
    bullets: [
      'Regulatory document preparation and quality review',
      'Clinical trial approval applications (IND/CTA) filing',
      'New Drug Application (NDA) submission support',
      'Import/export license applications and management',
      'Protocol presentations to CDSCO authorities',
      'National Clinical Trial Registry (CTRI) registration',
      'Periodic Safety Reporting (PSUR/DSUR) preparation',
      'Schedule Y and local Health Authority expertise',
    ],
    stat: { val: 'CDSCO', desc: 'Expert regulatory navigation' },
  },
  {
    num: '06', title: 'Biostatistics', color: '#38BDF8',
    /* Charts / data visualization */
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
    tagline: 'Protocol design through final CSR',
    desc: 'Our statistics and programming team delivers comprehensive biostatistics and data analysis services spanning the entire development programme — from protocol design through delivery of the final Clinical Study Report.',
    bullets: [
      'SAS programming and independent validation',
      'Sample size calculations and power analysis',
      'Endpoint selection, definition, and estimand framework',
      'Randomization schedules and IRT system coordination',
      'Statistical Analysis Plan (SAP) development',
      'Interim analyses and DSMB support packages',
      'Final statistical analyses and TLF generation',
      'Integrated Summaries of Safety and Efficacy (ISS/ISE)',
    ],
    stat: { val: 'SAS', desc: 'Programming & validation' },
  },
  {
    num: '07', title: 'Real World Evidence', color: '#34D399',
    /* Clinical / patient environment */
    img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80',
    tagline: 'Real-world data for real-world decisions',
    desc: 'We execute robust RWE studies across diverse therapeutic areas, leveraging decentralized and hybrid trial designs. Our RWE capabilities support every stage of the drug development and commercialization continuum.',
    bullets: [
      'Retrospective and prospective RWE study design',
      'Decentralized clinical trial (DCT) implementation',
      'Hybrid trial models combining site and remote elements',
      'Electronic health records and claims data analysis',
      'Patient registries and disease burden studies',
      'Comparative effectiveness and outcomes research',
      'Drug and device post-market surveillance',
      'Market access and payer dossier data generation',
    ],
    stat: { val: 'RWE', desc: 'Decentralized & hybrid' },
  },
];

export default function Services() {
  const [ref, vis] = useScrollReveal();
  const [active, setActive] = useState(0);
  const [tabOpen, setTabOpen] = useState(false);
  const s = SVC[active];

  return (
    <section id="services" style={{ background: 'var(--bz-black)' }} className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-20"
           style={{ backgroundImage: 'radial-gradient(circle,rgba(0,229,255,0.05) 1px,transparent 1px)', backgroundSize: '48px 48px' }} />

      <div className="relative max-w-7xl mx-auto px-5 lg:px-8">

        {/* Header */}
        <div ref={ref} className={`reveal ${vis ? 'in' : ''} max-w-3xl mb-10 lg:mb-12`}>
          <p className="section-label mb-3">Our Services</p>
          <h2 className="font-display font-bold text-white leading-[1.04] tracking-tight"
              style={{ fontSize: 'clamp(32px, 4.5vw, 58px)' }}>
            End-to-End Clinical Trial Support.
            <br />
            <span className="text-grad-cyan">Seven Divisions. One Vision.</span>
          </h2>
        </div>

        {/* ── Mobile: collapsible tab dropdown ── */}
        <div className={`reveal d2 ${vis ? 'in' : ''} md:hidden mb-6`}>
          <button onClick={() => setTabOpen(o => !o)}
                  className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl"
                  style={{ background: `${s.color}12`, border: `1px solid ${s.color}28` }}>
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-xs font-bold opacity-60" style={{ color: s.color }}>{s.num}</span>
              <span className="font-semibold text-sm text-white">{s.title}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: s.color }} />
              <ChevronDown className="w-4 h-4 transition-transform duration-200"
                           style={{ color: s.color, transform: tabOpen ? 'rotate(180deg)' : 'none' }} />
            </div>
          </button>
          {tabOpen && (
            <div className="mt-2 grid grid-cols-2 gap-2 p-3 rounded-xl"
                 style={{ background: 'var(--bz-surface)', border: '1px solid rgba(255,255,255,0.06)' }}>
              {SVC.map((sv, i) => (
                <button key={i} onClick={() => { setActive(i); setTabOpen(false); }}
                        className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-left text-xs font-semibold transition-all"
                        style={{
                          background: active === i ? `${sv.color}15` : 'rgba(255,255,255,0.02)',
                          border: `1px solid ${active === i ? `${sv.color}30` : 'rgba(255,255,255,0.05)'}`,
                          color: active === i ? sv.color : 'var(--bz-muted)',
                        }}>
                  <span className="font-mono opacity-60 text-[10px]">{sv.num}</span>
                  <span className="leading-tight">{sv.title}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── Desktop: horizontal scroll tab bar ── */}
        <div className={`reveal d2 ${vis ? 'in' : ''} hidden md:flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-none`}
             style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {SVC.map((sv, i) => (
            <button key={i} onClick={() => setActive(i)}
                    className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-250"
                    style={{
                      background: active === i ? `${sv.color}15` : 'rgba(12,18,40,0.8)',
                      border: `1px solid ${active === i ? `${sv.color}35` : 'rgba(255,255,255,0.06)'}`,
                      color: active === i ? sv.color : 'var(--bz-muted)',
                    }}>
              <span className="font-mono opacity-60">{sv.num}</span>
              <span>{sv.title}</span>
              {active === i && <div className="w-1.5 h-1.5 rounded-full" style={{ background: sv.color }} />}
            </button>
          ))}
        </div>

        {/* Content panel */}
        <div className={`reveal d3 ${vis ? 'in' : ''}`} key={active}>
          {/* flex-col-reverse = image above text on mobile; grid restores desktop order */}
          <div className="flex flex-col-reverse md:grid md:grid-cols-2 gap-8 lg:gap-12 items-start">

            {/* Left: text (below image on mobile) */}
            <div className="space-y-6">
              {/* Service header */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-lg"
                        style={{ background: `${s.color}15`, color: s.color, border: `1px solid ${s.color}25` }}>
                    {s.num}
                  </span>
                  <span className="text-xs font-medium" style={{ color: s.color }}>{s.tagline}</span>
                </div>
                <h3 className="font-display font-bold text-white text-3xl lg:text-4xl mb-3">{s.title}</h3>
                <p className="text-bz-muted text-base leading-relaxed">{s.desc}</p>
              </div>

              {/* Bullets */}
              <ul className="space-y-3">
                {s.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: s.color }} />
                    <span className="text-bz-text text-sm leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>

              {/* Prev / Next */}
              <div className="flex items-center gap-3 pt-2">
                <button disabled={active === 0} onClick={() => setActive(a => a - 1)}
                        className="px-4 py-2 rounded-xl text-xs font-semibold disabled:opacity-30 transition-all"
                        style={{ background: 'var(--bz-surface)', border: '1px solid rgba(255,255,255,0.07)', color: 'var(--bz-muted)' }}>
                  ← Previous
                </button>
                <button disabled={active === SVC.length - 1} onClick={() => setActive(a => a + 1)}
                        className="px-4 py-2 rounded-xl text-xs font-semibold disabled:opacity-30 transition-all flex items-center gap-1.5"
                        style={{ background: `${s.color}12`, border: `1px solid ${s.color}25`, color: s.color }}>
                  Next Service <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right: image */}
            <div className="relative">
              <div className="img-zoom relative rounded-2xl overflow-hidden h-80 lg:h-[420px]"
                   style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
                <img src={s.img} alt={s.title} className="w-full h-full object-cover"
                     onError={e => { e.target.parentElement.style.background = `linear-gradient(135deg,${s.color}15,#0C1228)`; e.target.style.display='none'; }} />
                <div className="absolute inset-0"
                     style={{ background: `linear-gradient(to bottom, ${s.color}08 0%, rgba(12,18,40,0.7) 100%)` }} />

                {/* Stat badge */}
                <div className="absolute top-5 left-5 glass-image rounded-xl px-4 py-3">
                  <div className="text-xl font-display font-bold text-white">{s.stat.val}</div>
                  <div className="text-[11px] text-bz-muted">{s.stat.desc}</div>
                </div>

                {/* Color accent bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1"
                     style={{ background: `linear-gradient(90deg, ${s.color}, ${s.color}44)` }} />
              </div>

              {/* Progress dots */}
              <div className="flex items-center justify-center gap-2 mt-4">
                {SVC.map((_, i) => (
                  <button key={i} onClick={() => setActive(i)}
                          className="rounded-full transition-all duration-250"
                          style={{
                            width: active === i ? '20px' : '6px',
                            height: '6px',
                            background: active === i ? s.color : 'rgba(255,255,255,0.15)',
                          }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
