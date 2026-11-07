# PROMPT — Template de site de massas italianas (scroll cinematográfico)

> Para o **Google Antigravity**. Leia o prompt inteiro antes de escrever qualquer código.
> Objetivo: construir um **site TEMPLATE** (reutilizável e vendável para várias massarias/restaurantes italianos) que reproduz **fielmente** o site mostrado no vídeo de referência `57c07d4ee455e1dc7627ec720adbecdd_720w.mp4`.

---

## 0. Regras de ouro (leia primeiro)

1. **O vídeo é a verdade visual.** Antes de começar, assista/analise o vídeo quadro a quadro. Em caso de dúvida entre "o que eu acho bonito" e "o que está no vídeo", vale o vídeo.
2. **O notebook (MacBook em cima da mesa de madeira) é só a apresentação do vídeo. NÃO faz parte do site.** Replique apenas o que aparece dentro da tela.
3. **Nada estático.** Imagens e ingredientes nunca ficam parados: flutuam, giram, caem, orbitam. Todo elemento entra com animação (fade + movimento).
4. **Scroll nunca pode travar.** Fluidez a 60 fps é critério de aceite, não "bônus". Veja a seção 9.
5. **Template de verdade:** nome da marca, textos, cores e links ficam em arquivos de configuração. Trocar de cliente = editar 2 arquivos, sem mexer nos componentes.
6. **Não invente conteúdo.** Sem fotos, depoimentos, preços, endereços ou textos que não estejam neste prompt. Onde faltar imagem, use placeholder claramente marcado (ver seção 11).
7. Tamanhos, espaçamentos e raios em **múltiplos de 8 px**.

---

## 1. O que acontece no vídeo (linha do tempo, ~8 s)

O site é uma experiência de scroll em **3 atos**, com um header que muda de cor no meio do caminho.

| Tempo aprox. | O que acontece |
|---|---|
| 0:00–1:30 | **Ato 1 (Hero, fundo vinho/bordô).** Título grande "LOVE AT FIRST TWIRL.", garfo prateado entrando na diagonal (de cima à direita) com um novelo de espaguete, camarão e folha de manjericão em cima. Molho escorrendo. |
| 1:30–3:00 | Começa o scroll. O título sobe e some, o garfo/espaguete desce esticando os fios com gotas de molho, e uma **faixa creme sobe de baixo** cobrindo o vinho. O header troca de vinho para creme. Aparece "THE TWIRL" e depois "A LITTLE BIT OF EVERYTHING." |
| 3:00–5:30 | **Ato 2 ("The Ingredient Ballet", fundo creme).** O espaguete vira uma **espiral/hélice em S** no centro, e os ingredientes (mexilhões abertos, tomates, camarões, manjericão) **flutuam e orbitam** em volta, com linhas finas de "callout" ligando cada ingrediente a um rótulo em itálico. |
| 5:30–6:30 | Os ingredientes **caem** pela tela (passam na frente do texto) rumo ao prato. Aparece o número "03". |
| 6:30–7:45 | **Ato 3 ("The Masterpiece", fundo creme).** Título "YOUR TABLE IS WAITING." centralizado, prato grande de massa com frutos do mar montado embaixo, botão "RESERVE A TABLE". |

> Observação: o texto do menu no vídeo está embaralhado (parece vídeo gerado por IA). Use os textos em português que defini na seção 3 (o vídeo está em inglês; as citações em inglês nesta tabela só descrevem o vídeo). Não tente "ler" os borrões.

---

## 2. Stack e estrutura

- **Vite + React + TypeScript + Tailwind CSS** (build estático simples, ótimo para publicar na Cloudflare Pages).
- **GSAP + ScrollTrigger** para toda a coreografia de scroll.
- **Lenis** para smooth scroll, **sincronizado com o ScrollTrigger**:
  ```ts
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((t) => lenis.raf(t * 1000))
  gsap.ticker.lagSmoothing(0)
  ```
- Framer Motion só para microinterações de UI (hover de botão, menu mobile). **Scroll = GSAP.**
- Estrutura sugerida:
  ```
  src/
    config/theme.ts        # cores, fontes, raios (tokens)
    content/site.ts        # TODOS os textos, links, labels (veja seção 3)
    components/
      Header.tsx           # 2 estados (vinho / creme)
      ScrollStory.tsx      # orquestra os 3 atos (um pin + timelines)
      Hero.tsx, Ballet.tsx, Masterpiece.tsx
      PageDots.tsx, SectionLabel.tsx, CalloutLabel.tsx, CtaButton.tsx
    assets/ ou public/assets/
  ```
- Código limpo e pequeno (YAGNI). Sem dependências desnecessárias.

---

## 3. Conteúdo e marca (arquivo `src/content/site.ts`)

**Idioma do site: português do Brasil (pt-BR).** O vídeo de referência está em inglês, mas o site deve usar os textos abaixo (adaptados, não traduzidos ao pé da letra). Tudo editável num lugar só:

```ts
brand: { name: 'ROSSO', subtitle: 'Cucina italiana' }
nav: ['INÍCIO', 'CARDÁPIO', 'INGREDIENTES', 'CONTATO']
headerCta: { heroLabel: 'PEÇA AGORA', creamLabel: 'PEÇA AGORA' }   // trocável por cliente

hero: {
  eyebrow: 'O GIRO',
  sectionLabel: 'SEÇÃO 01',
  title: 'AMOR À PRIMEIRA GARFADA.',
  subtitle: ['Fresquinho do mar.', 'Direto pro coração.'],
  cta: 'VER O CARDÁPIO →'
}
ballet: {
  headerTitle: 'O BALÉ DOS INGREDIENTES',
  title: 'UM POUCO DE TUDO.',
  callouts: [ { label: 'Mexilhões frescos' }, { label: 'Tomates maduros' },
              { label: 'Camarão selvagem' }, { label: 'Folhas de manjericão' },
              { label: 'Espaguete artesanal' } ]
}
masterpiece: {
  number: '03',
  eyebrow: 'A OBRA-PRIMA',
  title: 'SUA MESA ESTÁ ESPERANDO.',
  cta: 'RESERVAR MESA'
}
socials: { instagram, whatsapp, facebook }   // links no rodapé / menu
```

Garanta que as fontes escolhidas suportam acentos do português (Á, À, Ã, Ç, É, Ê, Í, Ó, Õ, Ú) em maiúsculas e itálico. Se algum texto ficar longo demais num breakpoint, reduza o `font-size` com `clamp()` em vez de quebrar o layout.

---

## 4. Design system

**Cores (tokens em CSS variables, nunca hardcoded nos componentes):**

| Token | Valor aproximado | Uso |
|---|---|---|
| `--wine-900` | `#3F120E` | fundo do hero (parte escura/rodapé do degradê) |
| `--wine-700` | `#5C1B16` | fundo do hero (centro), botão de busca escuro |
| `--wine-500` | `#7A2A22` | brilho suave do hero (radial atrás da massa) |
| `--cream-100` | `#EEE5CF` | fundo dos atos 2 e 3 |
| `--cream-50` | `#F6EBD9` | texto e botões sobre o vinho |
| `--ink` | `#500000` | texto sobre o creme |
| `--tomato` / `--basil` | `#C8281E` / `#4C7A34` | só se precisar de detalhe; as cores vêm das imagens |

O hero NÃO é vinho chapado: use um **degradê radial** (mais claro atrás do garfo/massa, mais escuro nas bordas) para dar profundidade.

**Tipografia (1 serifa + 1 sans, via Google Fonts):**
- **Serifa de contraste alto** para logo, títulos e rótulos itálicos: *Instrument Serif* (principal) ou *Cormorant Garamond* (alternativa). Títulos em **MAIÚSCULAS**, tamanho grande, `line-height` ~0.95, levemente apertados.
- **Sans neutra** para menu, botões, subtítulo, eyebrows: *Inter* (ou DM Sans). Botões e eyebrows em maiúsculas, `letter-spacing` ~0.08em, peso médio.
- Os rótulos dos callouts (Ato 2) são **serifa itálica pequena**.

**Forma:** botões em **pílula** (raio total), contorno fino de 1 px, fundo creme no CTA do hero, contorno escuro no CTA do Ato 3. Espaçamentos e tamanhos em múltiplos de 8.

---

## 5. Header (dois estados)

- **Estado vinho (Ato 1):** fundo transparente sobre o vinho. Logo "ROSSO" em serifa creme com "Cucina italiana" minúsculo, em itálico, embaixo. Menu `INÍCIO` (item ativo com sublinhado fino), `CARDÁPIO`, `INGREDIENTES`, `CONTATO` à direita do logo. Botão pílula de contorno creme "PEÇA AGORA" com ícone de lupa, e ícone de menu hambúrguer.
- **Estado creme (Atos 2 e 3):** fundo creme. Logo em tinta escura. **O menu some e no centro aparece o título "O BALÉ DOS INGREDIENTES"** (sans, maiúsculas, espaçado). À direita: botão pílula de contorno escuro "PEÇA AGORA" **grudado num quadrado arredondado vinho com lupa branca**, e o hambúrguer.
- A troca de estado é **suave** (cor e crossfade do menu para o título), disparada pelo ScrollTrigger quando a faixa creme sobe e cobre o header. O header é fixo (`position: fixed`), compacto e nunca cobre conteúdo importante.
- No mobile: logo + botão + hambúrguer; o menu abre em tela cheia com animação.

---

## 6. Ato 1 — Hero (vinho)

Layout desktop (como no vídeo):
- **Esquerda:** coluna fina com o texto "SEÇÃO 01" **rotacionado 90°** e uma **linha vertical fina** ao lado. Mais à direita dessa coluna: eyebrow "O GIRO", título "AMOR À PRIMEIRA GARFADA." em 3 linhas (AMOR À / PRIMEIRA / GARFADA.), subtítulo em 2 linhas e o botão pílula creme "VER O CARDÁPIO →".
- **Direita:** garfo prateado entrando em **diagonal** (de cima à direita para baixo à esquerda), com o novelo de espaguete + camarão + manjericão. Fios soltos e gotas de molho pendurados embaixo.
- **Lateral direita:** indicador de paginação em **bolinhas verticais** (uma por ato; a ativa é cheia).
- **Movimento de entrada (ao carregar):** título entra linha a linha (fade + sobe), garfo/massa entra de cima com leve rotação, manjericão e camarão têm um flutuar sutil contínuo, molho "pinga" em loop lento (gota que estica e solta).

---

## 7. Transição Hero → Ato 2 (o momento mais importante)

Uma **timeline GSAP única com `scrub`** amarrada ao scroll, com o conteúdo do Ato 1 **fixado (`pin`)** durante a transição:

1. O título e o texto do hero **sobem e somem** (translateY negativo + fade).
2. O garfo + massa **desce** e os fios **esticam** (`scaleY` leve) enquanto as gotas de molho escorrem.
3. Uma **faixa creme sobe de baixo** (clip-path ou translateY de um painel) até cobrir o vinho. Na borda de entrada aparece o eyebrow "O GIRO" e logo depois o título "UM POUCO DE TUDO." no canto superior esquerdo.
4. O garfo sai (sobe/fade) e a massa **continua descendo e se transforma na espiral do Ato 2** (crossfade entre a imagem do novelo e a imagem da espiral, com rotação).
5. Header muda para o estado creme no meio da subida da faixa.

Sem pulos: a massa tem de parecer **a mesma massa** atravessando as seções.

---

## 8. Atos 2 e 3

### Ato 2 — "O Balé dos Ingredientes" (creme)
- Título "UM POUCO DE TUDO." (serifa, maiúsculas, canto superior esquerdo), que sai com fade quando a espiral assume o centro.
- **Espiral de espaguete em S no centro**, ocupando boa parte da altura da tela, **girando lentamente** (rotateY/rotateZ + leve oscilação) conforme o scroll avança.
- **Ingredientes orbitando** em volta (mexilhões abertos, tomates inteiros, camarões, folhas de manjericão): cada um com **flutuar contínuo** + rotação própria + profundidade (escala e `blur` mínimo para os de trás, sem custo de performance).
- **Callouts:** linha fina (com um cotovelo angular e um pontinho na ponta) ligando cada ingrediente a um rótulo serifa itálico pequeno (textos em `site.ts`). Os rótulos aparecem em sequência (fade + linha se desenhando com `strokeDashoffset`).
- Setinhas `‹` `›` discretas nas laterais para "girar" a cena (opcional; com teclado/click avançam o ângulo da espiral).

### Ato 3 — "A Obra-prima" (creme)
- Os ingredientes **caem** de cima passando por trás/na frente do título, com rotação, em direção ao prato.
- O número **"03"** (serifa itálica) aparece pequeno acima do eyebrow "A OBRA-PRIMA" (sans, maiúsculas), depois o título **"SUA MESA ESTÁ ESPERANDO."** centralizado.
- **Prato grande** de massa com mexilhões, camarão, tomates e manjericão **sobe de baixo** e se encaixa no centro-inferior, cortado levemente pela borda inferior. Ao final, os ingredientes soltos "assentam" no prato (fade para a imagem do prato montado).
- Botão pílula de contorno escuro **"RESERVAR MESA"** abaixo do prato.
- Depois deste ponto o scroll normal continua para o rodapé (seção 12).

---

## 9. Animação e performance (não negociável)

O histórico mostra que scroll travado é o erro mais comum. Portanto:

- Animar **somente `transform` e `opacity`** (e `clip-path` quando necessário). Nunca animar `top/left/width/height/margin`.
- `will-change: transform` apenas nos elementos que animam, removido depois que terminam.
- Um `ScrollTrigger` principal com `pin` + `scrub: 0.6` a `1`, `anticipatePin: 1`, `invalidateOnRefresh: true`. Evitar dezenas de triggers independentes.
- Imagens em **WebP/PNG com transparência**, no máximo 2x do tamanho exibido; `decoding="async"`; pré-carregar as do hero; carregar o resto sob demanda. Tela de loading curta e elegante enquanto os assets do hero carregam.
- Loops contínuos (flutuar, girar) com GSAP `repeat: -1, yoyo: true, ease: 'sine.inOut'` — leves e desacoplados do scroll.
- Respeitar `prefers-reduced-motion`: sem loops, sem scrub pesado, só fades simples.
- Ao avançar entre atos, o ato anterior **continua montado** (nada de desmontar/remontar), para o cliente poder voltar sem recarregar nada.
- Testar com Chrome Performance: sem long tasks no scroll, alvo 60 fps.

---

## 10. Responsivo (mobile em retrato)

- **Mobile-first de verdade**, não só "encolher o desktop".
- Hero no celular: título no topo (3 linhas), subtítulo, botão; garfo + massa **embaixo/centralizados** ocupando ~55% da altura; "SEÇÃO 01" vira um rótulo pequeno horizontal; bolinhas de paginação ficam na lateral.
- Espiral do Ato 2 centralizada, callouts reduzidos a 3 e reposicionados para não sobrepor.
- Prato do Ato 3 em largura quase total.
- Testar em 360, 390, 768, 1024, 1440 e 1920 px de largura. Alvos de toque ≥ 48 px. Sem scroll horizontal.

---

## 11. Assets (imagens) — o que o template precisa

Todas em **PNG/WebP com fundo transparente**, iluminação coerente (luz suave de cima à esquerda, estilo foto de estúdio), pasta `public/assets/`:

| Arquivo | Conteúdo |
|---|---|
| `hero-fork-twirl.png` | garfo prateado na diagonal + novelo de espaguete com camarão e manjericão no topo |
| `hero-sauce-drip.png` (opcional) | fios soltos e gotas de molho, para animar separadamente |
| `spiral-spaghetti.png` | espaguete em espiral/S vertical, com molho |
| `ing-mussel-open.png` / `ing-mussel-2.png` | mexilhões abertos (2 variações/ângulos) |
| `ing-tomato.png` / `ing-tomato-2.png` | tomates cereja inteiros |
| `ing-shrimp.png` / `ing-shrimp-2.png` | camarões |
| `ing-basil.png` | folhas de manjericão |
| `plate-dish.png` | prato de massa montado, vista 3/4 frontal |

**Se algum arquivo não existir:** gere um placeholder visível (retângulo arredondado com o nome do arquivo e a proporção esperada) e **liste no final o que está faltando**. Não substitua por fotos de banco de imagem nem por emoji.

**Opcional (qualidade máxima):** se existir `public/frames/` com uma sequência de frames (ex.: `frame_0001.webp` ... `frame_0180.webp`) da transição hero → espiral, use um **canvas com frame sequence controlado pelo scroll** nessa parte, com versão reduzida para celular. Se não existir, use a coreografia por camadas descrita acima.

---

## 12. Depois do vídeo (fase 2 — só se a parte acima estiver perfeita)

Rodapé simples e elegante, no mesmo creme: logo, menu, links de Instagram / WhatsApp / Facebook (de `site.ts`), horário e endereço como **placeholders editáveis**. Nada além disso sem eu pedir.

---

## 13. Skills / ferramentas a usar (se disponíveis)

`ponytail` (mudança mínima, código enxuto), `frontend-design` (direção estética), `apple-design` (revisão de UI/UX e acessibilidade), `gsap-scrolltrigger` (scroll, pin, scrub), `animate` / Framer Motion (microinterações), Strix ou equivalente (segurança básica antes de publicar).

---

## 14. Critérios de aceite (checklist final)

- [ ] Abre e é visualmente **idêntico em estrutura** aos 3 atos do vídeo (hero vinho → ballet creme → masterpiece creme).
- [ ] Header troca de estado vinho → creme exatamente na subida da faixa, com o título "O BALÉ DOS INGREDIENTES" no centro.
- [ ] Textos, cores, links e nome da marca vêm só de `site.ts` / `theme.ts`.
- [ ] Nenhuma imagem parada: tudo flutua, gira, cai ou orbita.
- [ ] Scroll fluido (Lenis + ScrollTrigger sincronizados), sem travadas no desktop nem no celular.
- [ ] Mobile em retrato funciona e é bonito (não é o desktop espremido).
- [ ] Nenhum conteúdo inventado; placeholders claramente identificados.
- [ ] `npm run build` passa sem erros; `README.md` curto explicando como trocar marca, textos, cores e imagens.
- [ ] Ao terminar, entregar um **resumo curto**: o que foi feito, o que ficou como placeholder e o que depende de mim.

---

## 15. O que NÃO fazer

- Não incluir o MacBook, a mesa ou a sombra de janela do vídeo.
- Não usar slider/carrossel pronto no lugar da coreografia de scroll.
- Não usar `position: sticky` + muitos `ScrollTrigger` independentes se isso causar travadas; preferir um pin orquestrado.
- Não trocar a paleta vinho + creme nem a dupla serifa + sans por "algo parecido".
- Não adicionar seções, preços, depoimentos ou funcionalidades (carrinho, login) que não foram pedidas.
