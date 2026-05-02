import { useScrollReveal } from '../hooks/useScrollReveal';

const ROW1 = [
  { name: 'Oncology',           color: '#FF6B6B' },
  { name: 'Neurology',          color: '#8B2FFF' },
  { name: 'Cardiology',         color: '#FF8E53' },
  { name: 'Infectious Disease', color: '#00E5FF' },
  { name: 'Endocrinology',      color: '#00FF88' },
  { name: 'Dermatology',        color: '#FFD166' },
  { name: 'Respiratory',        color: '#06D6A0' },
];
const ROW2 = [
  { name: 'Gastroenterology',   color: '#A78BFA' },
  { name: 'Ophthalmology',      color: '#38BDF8' },
  { name: 'Rare Diseases',      color: '#F472B6' },
  { name: 'CNS Disorders',      color: '#818CF8' },
  { name: 'Metabolic Diseases', color: '#FB923C' },
  { name: 'Immunology',         color: '#34D399' },
  { name: 'Haematology',        color: '#EF4444' },
];

function Pill({ name, color }) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full mx-2 flex-shrink-0"
         style={{ background: `${color}0D`, border: `1px solid ${color}20` }}>
      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color, boxShadow: `0 0 6px ${color}80` }} />
      <span className="text-sm font-medium whitespace-nowrap" style={{ color: `${color}DD` }}>{name}</span>
    </div>
  );
}

function MarqueeRow({ items, reverse = false }) {
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden py-1">
      <div className={reverse ? 'animate-ticker-rev flex' : 'animate-ticker flex'}>
        {doubled.map((a, i) => <Pill key={i} {...a} />)}
      </div>
    </div>
  );
}

export default function TherapyAreas() {
  const [ref, vis] = useScrollReveal();

  return (
    <section style={{ background: 'var(--bz-black)' }} className="overflow-hidden">
      <div className="divider-glow" />
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-14">
        <div ref={ref} className={`reveal ${vis ? 'in' : ''} flex flex-col lg:flex-row lg:items-center gap-6 mb-8`}>
          <div className="flex-shrink-0">
            <p className="section-label mb-1.5">Therapeutic Coverage</p>
            <h2 className="font-display font-bold text-white text-xl lg:text-2xl">
              14 Therapy Areas
            </h2>
          </div>
          <div className="hidden lg:block h-px flex-1" style={{ background: 'rgba(255,255,255,0.06)' }} />
          <p className="text-bz-muted text-sm max-w-sm">
            Proven expertise across the full therapeutic spectrum — oncology, neurology,
            rare diseases, and beyond.
          </p>
        </div>
      </div>

      {/* Marquee rows — full bleed */}
      <div className="space-y-3 pb-14">
        <MarqueeRow items={ROW1} reverse={false} />
        <MarqueeRow items={ROW2} reverse={true} />
      </div>

      <div className="divider-glow" />
    </section>
  );
}
