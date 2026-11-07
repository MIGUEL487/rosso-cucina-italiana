/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cafe: {
          DEFAULT: '#221710',
          dark: '#170F0B',
          light: '#2D1F16',
        },
        marrom: {
          DEFAULT: '#49301B',
          dark: '#3A2615',
          light: '#5D3E23',
        },
        creme: {
          DEFAULT: '#F7F0E2',
          paper: '#FDFBF7',
          warm: '#EFE7D4',
        },
        manteiga: {
          DEFAULT: '#E7D2AC',
          light: '#F2E3C6',
          dark: '#D8BE8E',
        },
        verde: {
          DEFAULT: '#526343',
          dark: '#3E4B33',
          light: '#6B8058',
        },
        terracota: {
          DEFAULT: '#A64F33',
          dark: '#8C3F27',
          light: '#BD6143',
        },
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'serif'],
        sans: ['var(--font-sans)', 'sans-serif'],
      },
      animation: {
        'pulse-subtle': 'pulseSubtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
      },
      keyframes: {
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.02)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
}
