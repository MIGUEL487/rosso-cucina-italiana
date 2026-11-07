export const theme = {
  colors: {
    wine900: '#3F120E',
    wine700: '#5C1B16',
    wine500: '#7A2A22',
    cream100: '#EEE5CF',
    cream50: '#F6EBD9',
    ink: '#500000',
    tomato: '#C8281E',
    basil: '#4C7A34',
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
  },
  spacing: {
    xs: '8px',
    sm: '16px',
    md: '24px',
    lg: '32px',
    xl: '48px',
    xxl: '64px',
  },
} as const;

export type Theme = typeof theme;
