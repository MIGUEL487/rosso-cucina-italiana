export const siteContent = {
  brand: {
    name: 'ROSSO',
    subtitle: 'Cucina italiana',
  },
  nav: [
    { label: 'INÍCIO', href: '#inicio' },
    { label: 'CARDÁPIO', href: '#cardapio' },
    { label: 'INGREDIENTES', href: '#ingredientes' },
    { label: 'CONTATO', href: '#contato' },
  ],
  headerCta: {
    heroLabel: 'PEÇA AGORA',
    creamLabel: 'PEÇA AGORA',
    searchAria: 'Buscar no cardápio',
  },
  hero: {
    sectionNumber: '01',
    sectionLabel: 'SEÇÃO 01',
    eyebrow: 'O GIRO',
    titleLines: ['AMOR À', 'PRIMEIRA', 'GARFADA.'],
    subtitle: ['Fresquinho do mar.', 'Direto pro coração.'],
    cta: 'VER O CARDÁPIO →',
  },
  ballet: {
    sectionNumber: '02',
    headerTitle: 'O BALÉ DOS INGREDIENTES',
    eyebrow: 'O GIRO',
    title: 'UM POUCO DE TUDO.',
    callouts: [
      { id: 'mussel-top', label: 'Mexilhões frescos', x: 26, y: 32, side: 'left' },
      { id: 'tomato-right', label: 'Tomates maduros', x: 74, y: 22, side: 'right' },
      { id: 'tomato-half', label: 'Tomates maduros', x: 28, y: 64, side: 'left' },
      { id: 'mussel-center', label: 'Mexilhões frescos', x: 62, y: 52, side: 'right' },
      { id: 'shrimp-bot', label: 'Camarão selvagem', x: 76, y: 78, side: 'right' },
      { id: 'spaghetti', label: 'Espaguete artesanal', x: 42, y: 38, side: 'left' },
      { id: 'basil', label: 'Folhas de manjericão', x: 50, y: 72, side: 'left' },
    ],
  },
  masterpiece: {
    sectionNumber: '03',
    number: '03',
    eyebrow: 'A OBRA-PRIMA',
    title: 'SUA MESA ESTÁ ESPERANDO.',
    cta: 'RESERVAR MESA',
  },
  footer: {
    address: 'Rua das Oliveiras, 142 — Jardins, São Paulo',
    hours: 'Terça a Domingo: 12h às 15h e 19h às 23h',
    phone: '+55 11 99999-8888',
    copyright: '© 2026 ROSSO Cucina Italiana. Todos os direitos reservados.',
  },
  socials: {
    instagram: 'https://instagram.com/rosso.cucina',
    whatsapp: 'https://wa.me/5511999998888',
    facebook: 'https://facebook.com/rosso.cucina',
  },
} as const;

export type SiteContent = typeof siteContent;
