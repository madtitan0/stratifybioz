import { useScrollReveal, useCountUp } from '../hooks/useScrollReveal';

const DATA = [
  { n: 29,  suf: '+', label: 'Years Combined Leadership',   sub: 'Pharma, QA, finance & regulatory', color: '#00E5FF', icon: '◈' },
  { n: 7,   suf: '',  label: 'Integrated Service Divisions', sub: 'End-to-end clinical support',      color: '#8B2FFF', icon: '◈' },
  { n: 100, suf: '+', label: 'Clinical Sites Across India',  sub: 'Pan-India & APAC network',         color: '#00FF88', icon: '◈' },
  { n: 75,  suf: '+', label: 'Years in Life Sciences',      sub: 'Leadership team expertise',         color: '#00E5FF', icon: '◈' },
];

function StatNum({ n, suf, color, go }) {
  const v = useCountUp(n, 1800, go);
  return (
    <span className="font-display font-bold leading-none block" style={{ color, fontSize: 'clamp(60px, 6vw, 96px)' }}>
      {v}{suf}
    </span>
  );
}

export default function Stats() {
  const [ref, vis] = useScrollReveal(0.05);
  return (
    <section style={{ background: 'var(--bz-dark)' }}>
      <div className="divider-glow" />
      <div ref={ref} className="max-w-7xl mx-auto px-5 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {DATA.map((d, i) => (
            <div key={i}
                 className={`reveal d${i + 1} ${vis ? 'in' : ''} flex flex-col justify-between p-7 lg:p-10`}
                 style={{ borderRight: i < 3 ? '1px solid rgba(255,255,255,0.05)' : 'none', borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
              {/* Accent dot */}
              <div className="w-7 h-7 rounded-lg mb-6 flex items-center justify-center"
                   style={{ background: `${d.color}15`, border: `1px solid ${d.color}25` }}>
                <div className="w-2 h-2 rounded-full" style={{ background: d.color, boxShadow: `0 0 6px ${d.color}` }} />
              </div>
              <StatNum n={d.n} suf={d.suf} color={d.color} go={vis} />
              <div className="mt-4 space-y-1">
                <div className="text-white font-display font-semibold text-base lg:text-lg">{d.label}</div>
                <div className="text-bz-muted text-xs lg:text-sm">{d.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="divider-glow" />
    </section>
  );
}
