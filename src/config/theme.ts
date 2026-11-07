export const theme = {
  colors: {
    cafe: '#221710',        // Café intenso escuro de fundo nobre
    marrom: '#49301B',      // Marrom institucional da marca
    creme: '#F7F0E2',       // Creme papel do fundo claro
    manteiga: '#E7D2AC',    // Manteiga suave para acentos e molduras
    verde: '#526343',       // Verde ervas discreto
    terracota: '#A64F33',   // Terracota quente em detalhes e tags
  },
  fonts: {
    serif: 'var(--font-serif)',
    sans: 'var(--font-sans)',
  },
  radii: {
    full: '9999px',
    base: '8px',
    lg: '16px',
    xl: '24px',
    pill: '9999px',
  },
} as const;

export type Theme = typeof theme;
