import { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { TrendingDown, Users2, Clock, Building2, ChevronDown } from 'lucide-react';

const POINTS = [
  { Icon: Users2,      color: '#00E5FF', val: '1.4B+', title: 'Diverse Patient Pool',         desc: 'India\'s 1.4 billion population offers unmatched genetic, ethnic, and treatment-naive diversity — enabling representative clinical cohorts that strengthen global submission packages.' },
  { Icon: TrendingDown,color: '#00FF88', val: '~50%',  title: 'Lower Trial Costs',             desc: 'Clinical trials in India cost ~50–60% less than equivalent US/EU studies — without compromising quality, compliance, or scientific standards.' },
  { Icon: Clock,       color: '#8B2FFF', val: 'Fast',  title: 'Expedited Approvals',           desc: 'CDSCO\'s new parallel review processes and StratifyBioZ\'s regulatory relationships enable some of Asia\'s fastest clinical trial approval timelines.' },
  { Icon: Building2,   color: '#F59E0B', val: '300+',  title: 'NABH-Accredited Sites',         desc: 'India\'s network of NABH-accredited teaching hospitals, specialty centres, and GCP-trained investigators provides world-class infrastructure.' },
];

export default function IndiaAdvantage() {
  const [ref, vis] = useScrollReveal();
  const [open, setOpen] = useState(null);

  return (
    <section style={{ background: 'var(--bz-dark)' }} className="py-20 lg:py-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
           style={{ backgroundImage: 'linear-gradient(rgba(0,229,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(0,229,255,0.02) 1px,transparent 1px)', backgroundSize: '80px 80px' }} />

      <div className="relative max-w-7xl mx-auto px-5 lg:px-8">

        <div ref={ref} className={`reveal ${vis ? 'in' : ''} grid lg:grid-cols-2 gap-10 items-center`}>

          {/* Left: text + expandable points */}
          <div>
            <p className="section-label mb-3">The India Advantage</p>
            <h2 className="font-display font-bold text-white leading-[1.04] mb-4"
                style={{ fontSize: 'clamp(28px, 3.8vw, 52px)' }}>
              Why Run Your Trial in India?
              <br />
              <span className="text-grad-green">The Case Is Compelling.</span>
            </h2>
            <p className="text-bz-muted text-sm lg:text-base leading-relaxed mb-8">
              India has emerged as one of the world's most strategic destinations for clinical trials —
              combining a massive, diverse patient pool with competitive costs and a regulatory ecosystem
              fully aligned with ICH GCP.
            </p>

            {/* Accordion points */}
            <div className="space-y-2">
              {POINTS.map((p, i) => (
                <div key={i} className={`reveal d${i + 1} ${vis ? 'in' : ''} rounded-xl overflow-hidden`}
                     style={{ background: 'var(--bz-surface)', border: `1px solid ${open === i ? `${p.color}25` : 'rgba(255,255,255,0.05)'}` }}>
                  <button onClick={() => setOpen(open === i ? null : i)}
                          className="w-full flex items-center gap-4 px-5 py-4 text-left">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                         style={{ background: `${p.color}12`, border: `1px solid ${p.color}20` }}>
                      <p.Icon className="w-4.5 h-4.5" style={{ color: p.color }} />
                    </div>
                    <div className="flex-1">
                      <span className="font-display font-semibold text-base text-white">{p.val}</span>
                      <span className="text-bz-muted text-sm ml-2">{p.title}</span>
                    </div>
                    <ChevronDown className="w-4 h-4 flex-shrink-0 transition-transform duration-200"
                                 style={{ transform: open === i ? 'rotate(180deg)' : 'none', color: p.color }} />
                  </button>
                  <div className="accordion-body" style={{ maxHeight: open === i ? '120px' : '0px', opacity: open === i ? 1 : 0 }}>
                    <p className="px-5 pb-4 text-bz-muted text-sm leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: image with overlay CTA */}
          <div className={`reveal reveal-right ${vis ? 'in' : ''} relative rounded-2xl overflow-hidden img-zoom`}
               style={{ border: '1px solid rgba(255,255,255,0.07)', height: '420px' }}>
            <img src="https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=700&auto=format&fit=crop&q=80"
                 alt="India clinical research infrastructure"
                 className="w-full h-full object-cover"
                 onError={e => { e.target.parentElement.style.background='linear-gradient(135deg,#0C1228,#0D2045)'; e.target.style.display='none'; }} />
            <div className="absolute inset-0"
                 style={{ background: 'linear-gradient(to top,rgba(3,4,14,0.92) 0%,rgba(3,4,14,0.2) 60%)' }} />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="font-display font-bold text-white text-lg mb-2 leading-snug">
                India's regulatory clock is moving in your favour.
              </p>
              <p className="text-bz-muted text-xs leading-relaxed mb-4">
                With CDSCO's new parallel review processes and StratifyBioZ's deep regulatory
                relationships, your programme can run faster here than almost anywhere in Asia.
              </p>
              <a href="#contact"
                 onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                 className="btn-primary inline-flex items-center gap-2 px-5 py-2.5 text-sm">
                Discuss Your India Strategy
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
