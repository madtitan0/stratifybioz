const SERVICES = [
  'Clinical Operations', 'Site Management Services', 'Data Management',
  'Quality Assurance', 'Regulatory Affairs', 'Biostatistics', 'Real World Evidence',
];
const LINKS = [
  { l: 'Home', h: '#home' }, { l: 'About', h: '#about' }, { l: 'Services', h: '#services' },
  { l: 'Our Process', h: '#process' }, { l: 'Why Choose Us', h: '#why-us' },
  { l: 'Leadership', h: '#team' }, { l: 'Contact', h: '#contact' },
];
const go = (e, h) => { e.preventDefault(); document.querySelector(h)?.scrollIntoView({ behavior: 'smooth' }); };

export default function Footer() {
  return (
    <footer style={{ background: '#020610', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      {/* Glow line */}
      <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(0,229,255,0.2), rgba(139,47,255,0.2), transparent)' }} />

      <div className="max-w-7xl mx-auto px-5 lg:px-8 pt-14 pb-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="lg:col-span-1">
            <a href="#home" onClick={e => go(e, '#home')} className="block mb-5">
              <img
                src="https://stratifybioz.com/wp-content/uploads/2023/11/cropped-cropped-cropped-logo-3-e1701076484227-1-140x79.png"
                alt="StratifyBioZ"
                className="h-10 w-auto object-contain"
              />
            </a>
            <p className="text-bz-muted text-sm leading-relaxed mb-5">
              Premier clinical research and healthcare company — enabling fit-for-purpose
              clinical development of novel therapeutics across India and APAC.
            </p>
            <div className="flex items-center gap-2 text-[11px] font-mono text-bz-muted/50">
              <span className="w-1.5 h-1.5 rounded-full bg-bz-green animate-pulse" />
              GCP · ICH · CDSCO Compliant
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-display font-semibold text-sm mb-5 tracking-wide">Navigation</h4>
            <ul className="space-y-3">
              {LINKS.map(({ l, h }) => (
                <li key={l}>
                  <a href={h} onClick={e => go(e, h)}
                     className="text-bz-muted hover:text-bz-cyan text-sm transition-colors duration-200">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-display font-semibold text-sm mb-5 tracking-wide">Services</h4>
            <ul className="space-y-3">
              {SERVICES.map(s => (
                <li key={s}>
                  <a href="#services" onClick={e => go(e, '#services')}
                     className="text-bz-muted hover:text-bz-cyan text-sm transition-colors duration-200">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-display font-semibold text-sm mb-5 tracking-wide">Contact</h4>
            <div className="space-y-4 text-sm text-bz-muted">
              <div>
                <p className="text-[10px] font-mono uppercase tracking-widest text-bz-muted/50 mb-1.5">Address</p>
                <p className="leading-relaxed text-bz-text/70 text-xs">
                  The Carrington, Bhoomi & Buildings,<br />
                  Plot 6 "Sri Shankara," 7 East Coast Road,<br />
                  Kottivakkam, Chennai – 600 041
                </p>
              </div>
              <div>
                <p className="text-[10px] font-mono uppercase tracking-widest text-bz-muted/50 mb-1.5">Phone</p>
                <a href="tel:04445853891" className="block text-bz-text/70 text-xs hover:text-bz-cyan transition-colors">044-45853891</a>
                <a href="tel:9444777779"  className="block text-bz-text/70 text-xs hover:text-bz-cyan transition-colors">94447 77779</a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6"
             style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <p className="text-bz-muted/50 text-xs text-center sm:text-left">
            © {new Date().getFullYear()} StratifyBioZ Private Limited. All rights reserved.
          </p>
          <p className="text-bz-muted/30 text-xs">StratifyBioZ Pvt. Ltd. · Chennai, India</p>
        </div>
      </div>
    </footer>
  );
}
