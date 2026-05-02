/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        bz: {
          black:   '#03040E',
          dark:    '#07091A',
          surface: '#0C1228',
          border:  'rgba(255,255,255,0.06)',
          cyan:    '#00E5FF',
          violet:  '#8B2FFF',
          green:   '#00FF88',
          text:    '#EDF2FF',
          muted:   '#7B8AA4',
        },
      },
      animation: {
        'ticker':      'ticker 30s linear infinite',
        'float-a':     'floatA 8s ease-in-out infinite',
        'float-b':     'floatB 10s ease-in-out infinite',
        'pulse-glow':  'pulseGlow 3s ease-in-out infinite alternate',
        'scan':        'scan 4s ease-in-out infinite',
        'fade-up':     'fadeUp 0.7s ease-out forwards',
        'spin-slow':   'spin 25s linear infinite',
        'spin-rev':    'spin 18s linear infinite reverse',
        'gradient':    'gradientShift 12s ease infinite',
      },
      keyframes: {
        ticker: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        floatA: {
          '0%,100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%':     { transform: 'translateY(-22px) rotate(2deg)' },
        },
        floatB: {
          '0%,100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%':     { transform: 'translateY(-16px) rotate(-1.5deg)' },
        },
        pulseGlow: {
          '0%':   { opacity: '0.4', transform: 'scale(1)' },
          '100%': { opacity: '0.9', transform: 'scale(1.05)' },
        },
        scan: {
          '0%':   { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        gradientShift: {
          '0%,100%': { backgroundPosition: '0% 50%' },
          '50%':     { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
}
