const ITEMS = [
  'GCP COMPLIANT', 'ICH E6 GUIDELINES', 'CDSCO APPROVED', 'FDA AUDIT READY',
  '21 CFR PART 11', 'SCHEDULE Y', 'PAN-INDIA NETWORK', 'APAC COVERAGE',
  'PHASE I – IV TRIALS', 'DECENTRALIZED TRIALS', 'REAL WORLD EVIDENCE', 'GCP COMPLIANT',
  'ICH E6 GUIDELINES', 'CDSCO APPROVED', 'FDA AUDIT READY', '21 CFR PART 11',
  'SCHEDULE Y', 'PAN-INDIA NETWORK', 'APAC COVERAGE', 'PHASE I – IV TRIALS',
  'DECENTRALIZED TRIALS', 'REAL WORLD EVIDENCE',
];

export default function Ticker() {
  return (
    <div className="relative overflow-hidden py-3.5" style={{ background: 'rgba(0,229,255,0.03)', borderTop: '1px solid rgba(0,229,255,0.08)', borderBottom: '1px solid rgba(0,229,255,0.08)' }}>
      {/* Left fade */}
      <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
           style={{ background: 'linear-gradient(to right, var(--bz-black), transparent)' }} />
      {/* Right fade */}
      <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
           style={{ background: 'linear-gradient(to left, var(--bz-black), transparent)' }} />

      <div className="flex whitespace-nowrap animate-ticker">
        {ITEMS.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-3 mx-4 text-[11px] font-mono font-semibold tracking-widest" style={{ color: 'rgba(0,229,255,0.55)' }}>
            <span className="w-1 h-1 rounded-full inline-block" style={{ background: 'rgba(0,229,255,0.4)' }} />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
