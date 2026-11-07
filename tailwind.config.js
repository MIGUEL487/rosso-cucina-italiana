/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        wine: {
          900: 'var(--wine-900)',
          700: 'var(--wine-700)',
          500: 'var(--wine-500)',
        },
        cream: {
          100: 'var(--cream-100)',
          50: 'var(--cream-50)',
        },
        ink: 'var(--ink)',
        tomato: 'var(--tomato)',
        basil: 'var(--basil)',
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'serif'],
        sans: ['var(--font-sans)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
