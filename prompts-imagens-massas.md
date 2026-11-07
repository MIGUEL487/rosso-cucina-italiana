# Prompts para gerar as imagens do site de massas

Um prompt por arquivo que o `prompt-antigravity-massas.md` pede. Os prompts estão em **inglês** de propósito (geradores de imagem entendem melhor), mas os títulos estão em português.

## Antes de começar

1. **Use a mesma ferramenta e a mesma conversa para tudo** (ChatGPT/Imagens, Gemini, Midjourney, o que você preferir). Assim a luz e o estilo ficam coerentes entre as peças.
2. **Anexe os frames de referência** da pasta `referencias/` no primeiro pedido e diga: *"use these as the style reference for lighting, color and realism"*.
3. **Fundo transparente:** peça "isolated on a transparent background (PNG)". Se a ferramenta não entregar transparência de verdade (fundo xadrez desenhado ou fundo branco), gere em **fundo branco liso** e remova o fundo depois (Photoroom, remove.bg ou similar). Confira as bordas dos fios de espaguete: é onde o recorte mais falha.
4. **Gere 3 a 4 variações** de cada peça e escolha a melhor. Nome dos arquivos exatamente como a tabela abaixo.
5. Tamanho: peça o maior possível (2048 px no lado maior). O Antigravity reduz depois.

---

## Bloco de estilo (cole no início de TODOS os prompts)

```
Photorealistic high-end food photography, studio lighting with a soft key light
from the upper left, gentle natural shadows, rich saturated colors, shallow
realism like a premium Italian restaurant campaign. Fresh seafood pasta in
tomato sauce. Isolated on a pure transparent background, no text, no logo,
no table, no cast shadow on the background.
```

---

## 1. `hero-fork-twirl.png`

```
[STYLE BLOCK] A shiny stainless steel fork seen at a diagonal, entering from the
upper right and pointing down to the lower left. On the fork, a tight tall twirl
of golden spaghetti coated in red tomato sauce, topped with one large peeled
shrimp and a fresh green basil sprig of three leaves. A few loose spaghetti
strands hang below the twirl. Vertical composition, the twirl in the center of
the frame, the fork handle extends beyond the top right corner.
```

## 2. `hero-sauce-drip.png` (opcional)

```
[STYLE BLOCK] Several long strands of spaghetti hanging straight down with thick
red tomato sauce dripping from their ends, one large drop falling. Vertical
composition, strands start at the very top edge of the frame.
```

## 3. `spiral-spaghetti.png`

```
[STYLE BLOCK] A tall vertical S-shaped spiral ribbon of spaghetti in tomato
sauce floating in mid-air, like a helix twisting in space, no plate, no fork,
glossy sauce, a few strands escaping the spiral. Centered, lots of empty space
around it so other ingredients can orbit.
```

## 4. `ing-mussel-open.png` e `ing-mussel-2.png`

```
[STYLE BLOCK] One black mussel with the shell open, showing the bright orange
meat inside, floating, shown at a three-quarter angle. Glossy dark blue-black
shell. Single object, centered.
```
Para a variação 2, peça "same mussel from a different angle, shell more closed".

## 5. `ing-tomato.png` e `ing-tomato-2.png`

```
[STYLE BLOCK] One ripe red cherry tomato with a small green stem, glossy skin
with tiny water droplets, floating, single object, centered.
```
Variação 2: "same style, one tomato cut in half showing the inside" (ou o tomate inteiro em outro ângulo).

## 6. `ing-shrimp.png` e `ing-shrimp-2.png`

```
[STYLE BLOCK] One cooked peeled shrimp curled in a C shape with its tail,
orange-pink, glossy, lightly coated in tomato sauce, floating, single object,
centered.
```
Variação 2: "same shrimp rotated, tail pointing up".

## 7. `ing-basil.png`

```
[STYLE BLOCK] Two fresh green basil leaves on a short stem, vibrant green with
natural veins, floating, slightly curled, single object, centered.
```

## 8. `plate-dish.png`

```
[STYLE BLOCK] A wide round off-white ceramic plate seen from a three-quarter
frontal angle, filled with a nest of spaghetti in tomato sauce, topped with
open black mussels, peeled shrimp, halved cherry tomatoes and fresh basil
leaves. The plate is cropped slightly by the bottom edge of the frame. The
dish is the only object. Wide horizontal composition.
```

---

## Dicas para ficar parecido com o vídeo

- Se o resultado ficar "fotografia de banco de imagem", adicione: *"dramatic, editorial, slightly stylized, like a luxury campaign"*.
- Se os ingredientes de peças diferentes parecerem de mundos diferentes, regenere a peça fora do padrão **na mesma conversa** com: *"match the lighting and color of the previous images"*.
- Os fios de espaguete são o ponto fraco de qualquer recorte. Se ficar serrilhado, regenere em fundo branco chapado e remova o fundo com uma ferramenta melhor.
- **Opcional (qualidade máxima):** se quiser a transição do hero para a espiral em frames, gere um vídeo curto (Veo, Kling, Runway, Sora) partindo da imagem `hero-fork-twirl` e extraia os frames. É o que dá o efeito mais próximo do vídeo, mas dá mais trabalho.
