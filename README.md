# ROSSO — Cucina Italiana (Template Cinematográfico)

Template premium de alta conversão para restaurantes e massarias italianas, com experiência cinematográfica de scroll em 3 atos (Hero Vinho → Balé dos Ingredientes → A Obra-prima).

## 🚀 Tecnologias

- **Vite + React + TypeScript**
- **Tailwind CSS** com tokens em variáveis CSS
- **GSAP + ScrollTrigger** para coreografia fluida a 60 fps
- **Lenis** para smooth scrolling de alta precisão
- **Lucide React** para iconografia

---

## 🎨 Como customizar para novos clientes

Este projeto foi construído como um **template 100% modular**. Para trocar de restaurante/cliente, basta alterar 2 arquivos sem mexer na estrutura visual:

### 1. Textos, links e cardápio (`src/content/site.ts`)
Edite o arquivo `src/content/site.ts`:
- **Nome da marca e slogan:** `brand.name` e `brand.subtitle`
- **Menu e links:** `nav` e `socials` (Instagram, WhatsApp, Facebook)
- **Chamadas de ação (CTAs):** `hero.cta`, `headerCta`, `masterpiece.cta`
- **Rótulos dos ingredientes:** `ballet.callouts`
- **Endereço e horários:** `footer.address` e `footer.hours`

### 2. Paleta de cores e tipografia (`src/config/theme.ts` e `src/index.css`)
As cores do site são controladas por tokens CSS:
- `--wine-900`, `--wine-700`, `--wine-500`: Fundo degradê do Hero
- `--cream-100`, `--cream-50`: Fundo dos Atos 2 e 3 e botões
- `--ink`: Tipografia escura sobre o fundo creme
- `--tomato`, `--basil`: Cores de destaque para detalhes

### 3. Substituição de imagens (`public/assets/`)
Substitua as imagens em `public/assets/` mantendo os mesmos nomes com fundo transparente (PNG/WebP):
- `hero-fork-twirl.png`: Garfo na diagonal com novelo de espaguete
- `spiral-spaghetti.png`: Hélice / espiral em S vertical
- `plate-dish.png`: Prato principal montado visto em 3/4
- `ing-mussel-open.png`, `ing-tomato.png`, `ing-tomato-2.png`, `ing-shrimp.png`, `ing-basil.png`: Ingredientes individuais flutuantes

---

## 💻 Como rodar localmente

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Gerar build de produção
npm run build
```

---

## ☁️ Deploy no Cloudflare Pages

O projeto está otimizado para deploy estático no **Cloudflare Pages**:

```bash
# Build e deploy direto via Wrangler
npm run build
npx wrangler pages deploy dist --project-name=rosso-cucina-italiana
```
