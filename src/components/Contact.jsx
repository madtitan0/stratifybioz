import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { MapPin, Phone, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';

// ─────────────────────────────────────────────────────────────
// EmailJS setup — free at https://emailjs.com (200 emails/month)
//
// Steps:
//  1. Sign up at emailjs.com
//  2. Add Email Service (Gmail / Outlook) → copy Service ID
//  3. Create Email Template → copy Template ID
//     Template variables used: {{from_name}}, {{from_email}},
//     {{organisation}}, {{phone}}, {{service}}, {{message}}
//  4. Go to Account → copy Public Key
// ─────────────────────────────────────────────────────────────
const EJS_SERVICE  = 'YOUR_SERVICE_ID';   // e.g. 'service_abc123'
const EJS_TEMPLATE = 'YOUR_TEMPLATE_ID';  // e.g. 'template_xyz456'
const EJS_KEY      = 'YOUR_PUBLIC_KEY';   // e.g. 'abcDEFghiJKL'

const SERVICES = [
  'Clinical Operations', 'Site Management Services', 'Data Management',
  'Regulatory Affairs', 'Biostatistics', 'Quality Assurance', 'Real World Evidence', 'General Enquiry',
];

function Field({ label, req, children }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-bz-muted tracking-wide mb-2 uppercase">
        {label} {req && <span style={{ color: '#00E5FF' }}>*</span>}
      </label>
      {children}
    </div>
  );
}

const inputCls = `w-full bg-white/3 border border-white/8 text-bz-text placeholder-bz-muted/50 text-sm rounded-xl px-4 focus:outline-none transition-all duration-200`
  + ` focus:border-[rgba(0,229,255,0.4)] focus:bg-[rgba(0,229,255,0.03)] focus:ring-1 focus:ring-[rgba(0,229,255,0.15)]`;

export default function Contact() {
  const [ref, vis] = useScrollReveal();
  const [sent, setSent]   = useState(false);
  const [busy, setBusy]   = useState(false);
  const [error, setError] = useState('');
  const formRef           = useRef(null);

  const submit = async e => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      await emailjs.sendForm(EJS_SERVICE, EJS_TEMPLATE, formRef.current, EJS_KEY);
      setSent(true);
    } catch (err) {
      setError('Failed to send. Please email us at info@stratifybioz.com or call 044-45853891.');
      console.error(err);
    } finally {
      setBusy(false);
    }
  };

  return (
    <section id="contact" style={{ background: 'var(--bz-black)' }} className="py-24 lg:py-32 relative overflow-hidden">
      <div className="divider-glow absolute top-0 inset-x-0" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full pointer-events-none"
           style={{ background: 'radial-gradient(circle, rgba(0,229,255,0.04) 0%, transparent 70%)' }} />

      <div className="relative max-w-7xl mx-auto px-5 lg:px-8">

        {/* Header */}
        <div ref={ref} className={`reveal ${vis ? 'in' : ''} text-center max-w-2xl mx-auto mb-14`}>
          <p className="font-mono text-xs text-bz-cyan tracking-widest uppercase mb-3 flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-bz-cyan animate-pulse inline-block" />
            Contact Us
          </p>
          <h2 className="font-display font-bold text-white leading-[1.05]"
              style={{ fontSize: 'clamp(32px, 4.5vw, 60px)' }}>
            Let's Build Something
            <br />
            <span className="text-grad-cyan">Remarkable Together.</span>
          </h2>
          <p className="text-bz-muted text-base lg:text-lg leading-relaxed mt-4">
            Whether you're exploring a clinical program or ready to engage, our team is available
            to discuss your specific requirements.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">

          {/* ── Info sidebar ── */}
          <div className={`reveal ${vis ? 'in' : ''} lg:col-span-2 space-y-4`}>
            {[
              {
                Icon: MapPin, title: 'Office Address',
                lines: ['The Carrington, Bhoomi & Buildings,', 'Plot 6 "Sri Shankara," 7 East Coast Road,', 'Kottivakkam, Chennai – 600 041'],
              },
              {
                Icon: Phone, title: 'Phone',
                lines: ['044-45853891', '94447 77779'],
                tel: true,
              },
            ].map(({ Icon, title, lines, tel }, i) => (
              <div key={title}
                   className={`reveal d${i + 1} ${vis ? 'in' : ''} rounded-2xl p-6 flex gap-4`}
                   style={{ background: 'var(--bz-surface)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                     style={{ background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.15)' }}>
                  <Icon className="w-4.5 h-4.5" style={{ color: '#00E5FF' }} />
                </div>
                <div>
                  <p className="text-xs font-mono text-bz-muted uppercase tracking-widest mb-2">{title}</p>
                  {lines.map(l => tel
                    ? <a key={l} href={`tel:${l.replace(/\D/g,'')}`} className="block text-bz-text text-sm hover:text-bz-cyan transition-colors">{l}</a>
                    : <p key={l} className="text-bz-text text-sm leading-relaxed">{l}</p>
                  )}
                </div>
              </div>
            ))}

            {/* APAC note */}
            <div className={`reveal d3 ${vis ? 'in' : ''} rounded-2xl p-6`}
                 style={{ background: 'rgba(0,229,255,0.04)', border: '1px solid rgba(0,229,255,0.1)' }}>
              <p className="font-mono text-xs text-bz-cyan uppercase tracking-widest mb-2">Coverage</p>
              <p className="text-bz-text text-sm leading-relaxed">
                Pan-India clinical site network with APAC regional reach — enabling multi-country
                trials from a single coordination hub.
              </p>
            </div>
          </div>

          {/* ── Form ── */}
          <div className={`reveal d2 ${vis ? 'in' : ''} lg:col-span-3`}>
            <div className="rounded-2xl p-7 lg:p-8"
                 style={{ background: 'var(--bz-surface)', border: '1px solid rgba(255,255,255,0.05)' }}>

              {sent ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
                       style={{ background: 'rgba(0,255,136,0.1)', border: '1px solid rgba(0,255,136,0.25)' }}>
                    <CheckCircle className="w-8 h-8" style={{ color: '#00FF88' }} />
                  </div>
                  <h3 className="font-display font-bold text-white text-xl mb-2">Message Sent!</h3>
                  <p className="text-bz-muted text-sm max-w-xs">Our team will respond within one business day.</p>
                </div>
              ) : (
                <form ref={formRef} onSubmit={submit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label="Full Name" req>
                      <input name="from_name" type="text" required placeholder="Dr. Jane Smith" className={`${inputCls} h-11`} />
                    </Field>
                    <Field label="Email Address" req>
                      <input name="from_email" type="email" required placeholder="jane@pharma.com" className={`${inputCls} h-11`} />
                    </Field>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label="Organisation">
                      <input name="organisation" type="text" placeholder="Pharma Company Ltd." className={`${inputCls} h-11`} />
                    </Field>
                    <Field label="Phone">
                      <input name="phone" type="tel" placeholder="+91 98765 43210" className={`${inputCls} h-11`} />
                    </Field>
                  </div>
                  <Field label="Area of Interest">
                    <select name="service" className={`${inputCls} h-11 appearance-none cursor-pointer`}>
                      <option value="">Select a service area...</option>
                      {SERVICES.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </Field>
                  <Field label="Message" req>
                    <textarea name="message" required rows={4}
                              placeholder="Tell us about your clinical program, timeline, and how we can help..."
                              className={`${inputCls} py-3 resize-none`} />
                  </Field>

                  {error && (
                    <div className="flex items-start gap-3 rounded-xl px-4 py-3 text-sm"
                         style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#FCA5A5' }}>
                      <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      {error}
                    </div>
                  )}

                  <button type="submit" disabled={busy}
                          className="btn-primary w-full flex items-center justify-center gap-2 px-6 py-4 text-sm disabled:opacity-60 disabled:pointer-events-none">
                    {busy ? (
                      <>
                        <div className="w-4 h-4 border-2 border-bz-black/30 border-t-bz-black rounded-full animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>Send Message <ArrowRight className="w-4 h-4" /></>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
