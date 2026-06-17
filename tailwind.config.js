/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Brand palette
        cobalt: {
          50:  '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#1A56DB',   // Primary brand blue
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
        },
        // Neutrals — warm-tinted for premium feel
        ink: {
          950: '#0A0A0F',
          900: '#111827',
          800: '#1F2937',
          700: '#374151',
          600: '#4B5563',
          500: '#6B7280',
          400: '#9CA3AF',
          300: '#D1D5DB',
          200: '#E5E7EB',
          100: '#F3F4F6',
          50:  '#FAFAFA',
        },
        // Dark navy for accent sections
        navy: {
          950: '#050B18',
          900: '#0B1120',
          800: '#111827',
          700: '#1a2332',
        },
        // Background shades
        canvas: {
          DEFAULT: '#FAFAFA',
          warm:    '#F7F8FA',
          muted:   '#F0F2F5',
        },
      },
      fontFamily: {
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        display: ['Fraunces', 'Georgia', 'serif'],
        mono:    ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '1rem' }],
      },
      maxWidth: {
        editorial: '1400px',
        content:   '1100px',
        narrow:    '780px',
        reading:   '640px',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '112': '28rem',
        '128': '32rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'card':     '0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.06)',
        'card-md':  '0 2px 8px rgba(0,0,0,0.06), 0 8px 32px rgba(0,0,0,0.08)',
        'card-lg':  '0 4px 16px rgba(0,0,0,0.08), 0 16px 48px rgba(0,0,0,0.1)',
        'card-xl':  '0 8px 24px rgba(0,0,0,0.08), 0 24px 64px rgba(0,0,0,0.12)',
        'inset-sm': 'inset 0 1px 2px rgba(0,0,0,0.06)',
        'glow-cobalt': '0 0 40px rgba(26,86,219,0.15)',
      },
      animation: {
        'fade-up':          'fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in':          'fadeIn 0.5s ease-out forwards',
        'slide-up':         'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'float':            'float 6s ease-in-out infinite',
        'pulse-slow':       'pulse 4s ease-in-out infinite',
        'marquee':          'marqueeScroll 28s linear infinite',
        'marquee-reverse':  'marqueeScrollReverse 32s linear infinite',
        'shimmer':          'shimmer 2s linear infinite',
        'spin-slow':        'spin 8s linear infinite',
        'draw-line':        'drawLine 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'count-up':         'fadeUp 0.5s ease-out forwards',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
        marqueeScroll: {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marqueeScrollReverse: {
          '0%':   { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        drawLine: {
          '0%':   { width: '0%', opacity: '0' },
          '100%': { width: '100%', opacity: '1' },
        },
      },
      backgroundImage: {
        'dot-grid-light': 'radial-gradient(rgba(0,0,0,0.07) 1px, transparent 1px)',
        'dot-grid-dark':  'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)',
        'grid-light':     'linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)',
      },
      backgroundSize: {
        'dot-grid': '24px 24px',
        'grid':     '40px 40px',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};
