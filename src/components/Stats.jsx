import { useScrollReveal, useCountUp } from '../hooks/useScrollReveal';

const DATA = [
  { n: 29,  suf: '+', label: 'Years of Combined Leadership',   sub: 'Pharma, QA, finance, regulatory', color: '#00E5FF' },
  { n: 7,   suf: '',  label: 'Integrated Service Divisions',  sub: 'End-to-end clinical support',     color: '#8B2FFF' },
  { n: 100, suf: '+', label: 'Clinical Sites Across India',   sub: 'Pan-India & APAC network',        color: '#00FF88' },
  { n: 75,  suf: '+', label: 'Years Combined in Life Sciences',sub: 'Leadership team expertise',      color: '#00E5FF' },
];

function Count({ n, suf, color, go }) {
  const v = useCountUp(n, 1800, go);
  return (
    <span className="font-display font-bold leading-none" style={{ color, fontSize: 'clamp(64px, 7vw, 100px)' }}>
      {v}{suf}
    </span>
  );
}

export default function Stats() {
  const [ref, visible] = useScrollReveal(0.1);

  return (
    <section style={{ background: 'var(--bz-dark)' }}>
      <div className="divider-glow" />
      <div ref={ref} className="max-w-7xl mx-auto px-5 lg:px-8 py-20 lg:py-28">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: 'rgba(255,255,255,0.05)' }}>
          {DATA.map((d, i) => (
            <div key={i} className={`reveal d${i + 1} ${visible ? 'in' : ''} flex flex-col justify-between p-8 lg:p-10`}
                 style={{ background: 'var(--bz-dark)' }}>
              <Count n={d.n} suf={d.suf} color={d.color} go={visible} />
              <div className="mt-4">
                <div className="text-white font-display font-semibold text-base lg:text-lg leading-tight mb-1">{d.label}</div>
                <div className="text-bz-muted text-sm">{d.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="divider-glow" />
    </section>
  );
}
