import { useScrollReveal } from '../hooks/useScrollReveal';

const TEAM = [
  {
    name: 'Suresh Kumar K',
    role: 'Director — Operations & Quality',
    xp: '29+ Years · Pharmaceutical Industry',
    bio: '29 years of expertise spanning pharmaceutical manufacturing, quality assurance, formulation research, and clinical research operations. Suresh brings a rigorous, zero-compromise quality mindset to every aspect of StratifyBioZ\'s delivery model — from SOP design to GCP audit readiness.',
    initials: 'SK', from: '#00E5FF', to: '#0EA5E9',
    tags: ['Quality Assurance', 'Manufacturing', 'GCP Compliance'],
  },
  {
    name: 'Makesh Ketchaani Rajan',
    role: 'Director — Business Development',
    xp: '15+ Years · Life Sciences & Regulatory',
    bio: 'Over 15 years managing diverse portfolios across pharmaceuticals, nutraceuticals, and health products. Makesh combines deep regulatory knowledge with sharp commercial acumen — building the strategic partnerships that give StratifyBioZ its competitive edge in the Indian market.',
    initials: 'MR', from: '#8B2FFF', to: '#A855F7',
    tags: ['Regulatory Affairs', 'Business Strategy', 'Life Sciences'],
  },
  {
    name: 'Kannan Viswanathan',
    role: 'Director — Finance & Administration',
    xp: '25+ Years · Manufacturing & Finance',
    bio: 'A seasoned finance and administration professional with 25+ years across manufacturing sectors. Kannan founded Nattura Biocare, a herbal and ayurvedic medicines provider, and brings institutional financial discipline and operational structure to StratifyBioZ\'s growth journey.',
    initials: 'KV', from: '#00FF88', to: '#10B981',
    tags: ['Finance', 'Administration', 'Entrepreneurship'],
  },
  {
    name: 'Vishaleswaran Vijayasekaran',
    role: 'Lead — Regulatory & Compliance',
    xp: 'Specialist · Clinical Research & FDA',
    bio: 'A clinical research professional specializing in regulatory document management, GCP compliance oversight, and FDA audit support. Vishaleswaran ensures that StratifyBioZ\'s operations consistently meet the highest global regulatory standards — keeping every study inspection-ready.',
    initials: 'VV', from: '#F59E0B', to: '#EF4444',
    tags: ['FDA Audit', 'Document Management', 'GCP'],
  },
];

export default function Team() {
  const [ref, vis] = useScrollReveal();

  return (
    <section id="team" style={{ background: 'var(--bz-dark)' }} className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 opacity-15 pointer-events-none"
           style={{ backgroundImage: 'radial-gradient(circle, rgba(0,229,255,0.04) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />

      <div className="relative max-w-7xl mx-auto px-5 lg:px-8">

        {/* Header + image row */}
        <div ref={ref} className={`reveal ${vis ? 'in' : ''} grid lg:grid-cols-2 gap-10 items-center mb-14`}>
          <div>
            <p className="section-label mb-3">Leadership Team</p>
            <h2 className="font-display font-bold text-white leading-[1.04]"
                style={{ fontSize: 'clamp(32px, 4.5vw, 60px)' }}>
              Decades of Expertise.
              <br />
              <span className="text-grad-cyan">One Shared Mission.</span>
            </h2>
            <p className="text-bz-muted text-base leading-relaxed mt-4 max-w-md">
              75+ combined years of pharmaceutical development, regulatory affairs,
              finance, and clinical operations. Our leadership is StratifyBioZ's strongest asset.
            </p>
          </div>
          {/* Team image */}
          <div className="relative rounded-2xl overflow-hidden h-52 img-zoom"
               style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
            <img src="https://images.unsplash.com/photo-1576086213369-97a306d36557?w=700&auto=format&fit=crop&q=80"
                 alt="StratifyBioZ leadership team environment"
                 className="w-full h-full object-cover"
                 onError={e => { e.target.parentElement.style.background = 'linear-gradient(135deg,#0C1228,#0D2045)'; e.target.style.display='none'; }} />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(3,4,14,0.2) 0%, rgba(3,4,14,0.5) 100%)' }} />
            <div className="absolute bottom-4 left-4 glass-image rounded-xl px-4 py-2.5">
              <div className="text-sm font-display font-semibold text-white">75+ Years Combined</div>
              <div className="text-xs text-bz-muted">Industry Leadership Experience</div>
            </div>
          </div>
        </div>

        {/* Team cards */}
        <div className="grid md:grid-cols-2 gap-5">
          {TEAM.map((m, i) => (
            <div key={m.name}
                 className={`reveal d${(i % 2) + 1} ${vis ? 'in' : ''} card-lift grad-border rounded-2xl overflow-hidden group`}
                 style={{ background: 'var(--bz-surface)' }}>
              {/* Colour band */}
              <div className="h-1" style={{ background: `linear-gradient(90deg, ${m.from}, ${m.to})` }} />
              <div className="p-7">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 rounded-2xl flex-shrink-0 flex items-center justify-center font-display font-bold text-lg text-white shadow-lg"
                       style={{ background: `linear-gradient(135deg, ${m.from}, ${m.to})`, boxShadow: `0 8px 24px ${m.from}28` }}>
                    {m.initials}
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-white text-lg leading-tight">{m.name}</h3>
                    <p className="text-bz-muted text-sm mt-0.5">{m.role}</p>
                  </div>
                </div>
                <div className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-mono font-medium mb-4"
                     style={{ background: `${m.from}10`, color: `${m.from}BB`, border: `1px solid ${m.from}20` }}>
                  {m.xp}
                </div>
                <p className="text-bz-muted text-sm leading-relaxed mb-4">{m.bio}</p>
                <div className="flex flex-wrap gap-2 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                  {m.tags.map(t => (
                    <span key={t} className="px-2.5 py-1 rounded-full text-[11px] font-medium"
                          style={{ background: `${m.from}0C`, color: `${m.from}AA`, border: `1px solid ${m.from}15` }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
