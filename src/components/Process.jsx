import { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { ChevronDown } from 'lucide-react';

const STEPS = [
  {
    n: '01', color: '#00E5FF', title: 'Feasibility & Strategy',
    preview: 'Evaluating sites, patient populations, and regulatory pathways.',
    desc: 'We begin with a thorough feasibility assessment — evaluating site capabilities, patient populations, and regulatory pathways to define the optimal development strategy for your molecule.',
    img: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&auto=format&fit=crop&q=80',
  },
  {
    n: '02', color: '#8B2FFF', title: 'Regulatory Planning',
    preview: 'Comprehensive submission packages and CDSCO approval roadmap.',
    desc: 'Our regulatory team prepares comprehensive submission packages, navigates CDSCO requirements, and establishes the approval roadmap with defined milestones and timelines.',
    img: 'https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=600&auto=format&fit=crop&q=80',
  },
  {
    n: '03', color: '#00FF88', title: 'Site Selection & Initiation',
    preview: 'Pan-India network evaluation, protocol training, and ethics submissions.',
    desc: 'Drawing on our extensive pan-India site network, we evaluate, select, and initiate sites — complete protocol training, ethics committee submissions, and investigator briefings included.',
    img: 'https://images.unsplash.com/photo-1519494026892-476f08a9b7c4?w=600&auto=format&fit=crop&q=80',
  },
  {
    n: '04', color: '#F59E0B', title: 'Execution & Monitoring',
    preview: 'Risk-based monitoring with real-time data quality and safety tracking.',
    desc: 'Centralized, risk-based monitoring ensures real-time data quality and patient safety. Our coordinators manage enrollment, adverse event reporting, and protocol compliance on an ongoing basis.',
    img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&auto=format&fit=crop&q=80',
  },
  {
    n: '05', color: '#A78BFA', title: 'Data Analysis & Reporting',
    preview: 'Database lock through statistical analysis to audit-ready CSR.',
    desc: 'From database lock through statistical analysis to the final Clinical Study Report — our biostatistics and data management teams deliver precise, audit-ready deliverables on schedule.',
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80',
  },
  {
    n: '06', color: '#38BDF8', title: 'Closeout & Submission',
    preview: 'Site closeout, archival, and final regulatory submissions.',
    desc: 'We manage site closeout, archival, and final regulatory submissions — ensuring every artifact meets the standards required for global drug approval dossiers.',
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80',
  },
];

function AccordionItem({ s, open, onToggle, index, vis }) {
  return (
    <div className={`reveal d${Math.min(index + 1, 6)} ${vis ? 'in' : ''}`}
         style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>

      {/* Header */}
      <button onClick={onToggle}
              className="w-full flex items-center gap-4 py-5 text-left group">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center font-mono text-xs font-bold flex-shrink-0 transition-all duration-300"
             style={{ background: open ? `${s.color}20` : 'rgba(255,255,255,0.04)', border: `1px solid ${open ? `${s.color}35` : 'rgba(255,255,255,0.06)'}`, color: open ? s.color : 'var(--bz-muted)' }}>
          {s.n}
        </div>
        <div className="flex-1">
          <span className="font-display font-semibold text-base lg:text-lg transition-colors duration-200"
                style={{ color: open ? 'white' : 'rgba(237,242,255,0.7)' }}>
            {s.title}
          </span>
          {!open && (
            <p className="text-bz-muted text-xs mt-0.5 hidden sm:block">{s.preview}</p>
          )}
        </div>
        {/* Accent line */}
        <div className="hidden lg:block h-px flex-1 max-w-[80px] transition-all duration-300"
             style={{ background: open ? `${s.color}50` : 'rgba(255,255,255,0.05)' }} />
        <ChevronDown className="w-4 h-4 flex-shrink-0 transition-transform duration-300"
                     style={{ transform: open ? 'rotate(180deg)' : 'none', color: open ? s.color : 'var(--bz-muted)' }} />
      </button>

      {/* Body */}
      <div className="accordion-body" style={{ maxHeight: open ? '400px' : '0px', opacity: open ? 1 : 0 }}>
        <div className="pb-6 grid sm:grid-cols-3 gap-5">
          <p className="text-bz-muted text-sm leading-relaxed sm:col-span-2">{s.desc}</p>
          <div className="relative rounded-xl overflow-hidden h-28 sm:h-full img-zoom"
               style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
            <img src={s.img} alt={s.title} className="w-full h-full object-cover"
                 onError={e => { e.target.parentElement.style.background = `linear-gradient(135deg,${s.color}15,#0C1228)`; e.target.style.display='none'; }} />
            <div className="absolute inset-0" style={{ background: 'rgba(7,9,26,0.3)' }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Process() {
  const [ref, vis] = useScrollReveal();
  const [open, setOpen] = useState(0);

  return (
    <section id="process" style={{ background: 'var(--bz-dark)' }} className="py-24 lg:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">

        <div ref={ref} className={`reveal ${vis ? 'in' : ''} grid lg:grid-cols-2 gap-10 items-start`}>

          {/* Left: title (sticky on desktop) */}
          <div className="lg:sticky lg:top-24">
            <p className="section-label mb-3">Our Methodology</p>
            <h2 className="font-display font-bold text-white leading-[1.04]"
                style={{ fontSize: 'clamp(30px, 4vw, 54px)' }}>
              Six-Phase Process.
              <br />
              <span className="text-grad-brand">Zero Compromises.</span>
            </h2>
            <p className="text-bz-muted text-base leading-relaxed mt-4 max-w-md">
              Every engagement follows a disciplined methodology — ensuring
              predictability, quality, and speed from first contact to final submission.
              Click each phase to explore the detail.
            </p>
            {/* Progress indicator */}
            <div className="flex items-center gap-2 mt-8">
              {STEPS.map((s, i) => (
                <button key={i} onClick={() => setOpen(i)}
                        className="h-1.5 rounded-full transition-all duration-300"
                        style={{ width: open === i ? '24px' : '8px', background: open === i ? s.color : 'rgba(255,255,255,0.12)' }} />
              ))}
            </div>
          </div>

          {/* Right: accordion */}
          <div className={`reveal-right ${vis ? 'in' : ''}`}>
            {STEPS.map((s, i) => (
              <AccordionItem key={s.n} s={s} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} index={i} vis={vis} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
