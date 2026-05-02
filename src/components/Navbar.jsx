import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const LINKS = [
  { label: 'About',    href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Process',  href: '#process' },
  { label: 'Why Us',   href: '#why-us' },
  { label: 'Team',     href: '#team' },
];

function go(e, href) {
  e.preventDefault();
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [open, setOpen]           = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <nav className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
      scrolled ? 'glass-strong shadow-2xl shadow-black/40' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-5 lg:px-8 flex items-center justify-between h-16 lg:h-20">

        {/* ── Logo ── */}
        <a href="#home" onClick={e => go(e, '#home')}>
          <img
            src="https://stratifybioz.com/wp-content/uploads/2023/11/cropped-cropped-cropped-logo-3-e1701076484227-1-140x79.png"
            alt="StratifyBioZ"
            className="h-9 lg:h-11 w-auto object-contain"
            loading="eager"
          />
        </a>

        {/* ── Desktop nav ── */}
        <div className="hidden lg:flex items-center gap-1">
          {LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={e => { go(e, href); }}
              className="px-4 py-2 text-sm font-medium text-bz-muted hover:text-white rounded-lg hover:bg-white/5 transition-all duration-200"
            >
              {label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            onClick={e => go(e, '#contact')}
            className="hidden lg:inline-flex btn-primary px-5 py-2.5 text-sm items-center"
          >
            Get In Touch
          </a>
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 rounded-lg text-bz-muted hover:text-white hover:bg-white/8 transition-all"
            aria-label="Menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* ── Mobile drawer ── */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ${open ? 'max-h-screen' : 'max-h-0'}`}>
        <div className="glass-strong border-t border-white/5 px-5 py-5 space-y-1">
          {LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={e => { go(e, href); setOpen(false); }}
              className="block px-3 py-2.5 text-bz-muted hover:text-white text-sm font-medium rounded-lg hover:bg-white/5 transition-all"
            >
              {label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={e => { go(e, '#contact'); setOpen(false); }}
            className="btn-primary mt-3 px-4 py-3 text-sm text-center w-full block"
          >
            Get In Touch
          </a>
        </div>
      </div>
    </nav>
  );
}
