import { useScrollReveal } from '../hooks/useScrollReveal';

const TEAM = [
  {
    name: 'Suresh Kumar K',
    role: 'Director — Operations & Quality',
    xp:   '29+ years · Pharmaceutical Industry',
    bio:  '29 years of expertise spanning pharmaceutical manufacturing, quality assurance, formulation research, and clinical research operations. Suresh brings rigorous quality mindset to every aspect of StratifyBioZ\'s delivery model.',
    initials: 'SK',
    from: '#00E5FF', to: '#0EA5E9',
  },
  {
    name: 'Makesh Ketchaani Rajan',
    role: 'Director — Business Development',
    xp:   '15+ years · Life Sciences & Regulatory',
    bio:  'Over 15 years managing diverse portfolios across pharmaceuticals, nutraceuticals, and health products. Combines deep regulatory knowledge with sharp commercial acumen to drive StratifyBioZ\'s growth strategy.',
    initials: 'MR',
    from: '#8B2FFF', to: '#A855F7',
  },
  {
    name: 'Kannan Viswanathan',
    role: 'Director — Finance & Administration',
    xp:   '25+ years · Manufacturing & Finance',
    bio:  'A seasoned finance and administration professional with 25+ years across manufacturing sectors. Founded Nattura Biocare, a herbal and ayurvedic medicines provider. Brings institutional financial discipline to StratifyBioZ.',
    initials: 'KV',
    from: '#00FF88', to: '#10B981',
  },
  {
    name: 'Vishaleswaran Vijayasekaran',
    role: 'Lead — Regulatory & Compliance',
    xp:   'Specialist · Clinical Research & FDA',
    bio:  'A clinical research professional specializing in regulatory document management, compliance oversight, and FDA audit support. Ensures StratifyBioZ\'s operations consistently meet the highest global regulatory standards.',
    initials: 'VV',
    from: '#F59E0B', to: '#EF4444',
  },
];

function Card({ m, i, vis }) {
  return (
    <div
      className={`reveal d${(i % 2) + 1} ${vis ? 'in' : ''} card-lift group relative rounded-2xl overflow-hidden`}
      style={{ background: 'var(--bz-surface)', border: '1px solid rgba(255,255,255,0.05)' }}
    >
      {/* Colour header band */}
      <div className="h-1.5 w-full"
           style={{ background: `linear-gradient(90deg, ${m.from}, ${m.to})` }} />

      <div className="p-7">
        <div className="flex items-start gap-4 mb-5">
          {/* Avatar */}
          <div className="w-14 h-14 rounded-2xl flex-shrink-0 flex items-center justify-center font-display font-bold text-lg text-white shadow-lg"
               style={{ background: `linear-gradient(135deg, ${m.from}, ${m.to})`, boxShadow: `0 8px 24px ${m.from}30` }}>
            {m.initials}
          </div>
          <div>
            <h3 className="font-display font-bold text-white text-lg leading-tight">{m.name}</h3>
            <p className="text-bz-muted text-sm mt-0.5">{m.role}</p>
          </div>
        </div>

        {/* XP badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4 text-xs font-mono font-medium"
             style={{ background: `${m.from}10`, color: `${m.from}CC`, border: `1px solid ${m.from}20` }}>
          {m.xp}
        </div>

        <p className="text-bz-muted text-sm leading-relaxed">{m.bio}</p>
      </div>
    </div>
  );
}

export default function Team() {
  const [ref, vis] = useScrollReveal();

  return (
    <section id="team" style={{ background: 'var(--bz-dark)' }} className="py-24 lg:py-32 overflow-hidden relative">
      <div className="absolute inset-0 opacity-20 pointer-events-none"
           style={{ backgroundImage: 'radial-gradient(circle, rgba(0,229,255,0.04) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />

      <div className="relative max-w-7xl mx-auto px-5 lg:px-8">

        {/* Header */}
        <div ref={ref} className={`reveal ${vis ? 'in' : ''} text-center max-w-2xl mx-auto mb-14 lg:mb-16`}>
          <p className="font-mono text-xs text-bz-muted tracking-widest uppercase mb-3">Leadership Team</p>
          <h2 className="font-display font-bold text-white leading-[1.05]"
              style={{ fontSize: 'clamp(32px, 4.5vw, 60px)' }}>
            Decades of Expertise.
            <br />
            <span className="text-grad-cyan">One Shared Mission.</span>
          </h2>
          <p className="text-bz-muted text-base lg:text-lg leading-relaxed mt-4">
            75+ combined years of pharmaceutical development, regulatory affairs,
            finance, and clinical operations leadership.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-5">
          {TEAM.map((m, i) => <Card key={m.name} m={m} i={i} vis={vis} />)}
        </div>
      </div>
    </section>
  );
}
