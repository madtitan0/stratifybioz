import { useScrollReveal } from '../hooks/useScrollReveal';
import { Network, MapPin, Clock, Users, Lock, Cpu } from 'lucide-react';

const FEATURES = [
  { Icon: Network, color: '#00E5FF', title: 'Centralized Multi-Site Coordination', desc: 'One coordination point for all multi-specialty clinical sites — eliminating fragmented communication and accelerating trial timelines by 20–30%.' },
  { Icon: MapPin,  color: '#8B2FFF', title: 'Deep Indian Regulatory Expertise',   desc: 'Unparalleled knowledge of CDSCO frameworks, local IRB partnerships, and Schedule Y — ensuring smooth approvals with zero surprises.' },
  { Icon: Clock,   color: '#00FF88', title: 'Expedited Approval Mechanisms',       desc: 'Strategic regulatory relationships and a proven track record enable some of Asia\'s fastest clinical trial approval timelines.' },
  { Icon: Users,   color: '#F59E0B', title: 'Patient-Centric Enrollment',         desc: 'Biomarker-based stratification and diverse recruitment channels deliver precise, representative cohorts — minimizing screen failures dramatically.' },
  { Icon: Lock,    color: '#A78BFA', title: 'Independent Compliance Framework',   desc: 'Every activity is governed by an independent QA department, ensuring GCP, ICH, and local HA compliance at every stage — always audit-ready.' },
  { Icon: Cpu,     color: '#38BDF8', title: 'Technology-Driven Operations',       desc: 'AI-assisted platforms, eCRF systems, and healthcare-compliant data infrastructure give sponsors real-time visibility and superior data integrity.' },
];

export default function WhyUs() {
  const [ref, vis] = useScrollReveal();

  return (
    <section id="why-us" style={{ background: 'var(--bz-black)' }} className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
           style={{ background: 'radial-gradient(circle, rgba(139,47,255,0.04) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-5 lg:px-8">

        {/* Header */}
        <div ref={ref} className={`reveal ${vis ? 'in' : ''} grid lg:grid-cols-2 gap-10 items-end mb-14`}>
          <div>
            <p className="section-label mb-3">Why Choose Us</p>
            <h2 className="font-display font-bold text-white leading-[1.04]"
                style={{ fontSize: 'clamp(32px, 4.5vw, 60px)' }}>
              Built for Speed.
              <br />
              <span className="text-grad-brand">Engineered for Quality.</span>
            </h2>
          </div>
          <p className="text-bz-muted text-base lg:text-lg leading-relaxed">
            When scientific breakthroughs depend on flawless execution, sponsors and investigators choose
            StratifyBioZ for our unmatched combination of regional expertise, operational rigour, and
            technology-enabled transparency.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {FEATURES.map((f, i) => (
            <div key={f.title}
                 className={`reveal d${(i % 3) + 1} ${vis ? 'in' : ''} card-lift grad-border group rounded-2xl p-6 overflow-hidden relative`}
                 style={{ background: 'var(--bz-surface)' }}>
              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
                   style={{ background: `radial-gradient(circle at 20% 20%, ${f.color}07 0%, transparent 70%)` }} />
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                   style={{ background: `${f.color}10`, border: `1px solid ${f.color}20` }}>
                <f.Icon className="w-5 h-5" style={{ color: f.color }} />
              </div>
              <h3 className="font-display font-semibold text-white text-base mb-2.5">{f.title}</h3>
              <p className="text-bz-muted text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Image CTA strip */}
        <div className={`reveal d4 ${vis ? 'in' : ''} relative rounded-2xl overflow-hidden`}>
          <div className="relative img-zoom overflow-hidden rounded-2xl h-52 lg:h-60">
            <img src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1200&auto=format&fit=crop&q=80"
                 alt="Research collaboration" className="w-full h-full object-cover"
                 onError={e => { e.target.parentElement.style.background = 'linear-gradient(135deg,#0C1228,#0D2045)'; e.target.style.display='none'; }} />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(3,4,14,0.92) 0%, rgba(3,4,14,0.55) 60%, rgba(3,4,14,0.2) 100%)' }} />
            <div className="absolute inset-0 flex items-center px-8 lg:px-12">
              <div className="flex flex-col md:flex-row md:items-center justify-between w-full gap-6">
                <div>
                  <h3 className="font-display font-bold text-white text-xl lg:text-2xl mb-1.5">
                    Ready to accelerate your clinical programme?
                  </h3>
                  <p className="text-bz-muted text-sm max-w-lg">
                    Partner with StratifyBioZ for compliant, efficient, and patient-centric clinical development across India and APAC.
                  </p>
                </div>
                <a href="#contact"
                   onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                   className="btn-primary inline-flex items-center gap-2 px-7 py-4 text-sm flex-shrink-0 whitespace-nowrap">
                  Start the Conversation
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
