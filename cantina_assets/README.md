# Assets — Cantina Viana

## Uso
Copie as pastas `reais`, `marca` e `decorativos` para `public/images/cantina-viana/`.
Os nomes dos arquivos são descritivos, não comprovam o nome comercial de cada prato.

- `reais/`: 10 fotografias recortadas dos prints enviados (resolução modesta; usar WebP em tamanhos apropriados, sem upscaling falso).
- `marca/logo-original.png`: logo original fornecida.
- `marca/logo-transparente.png`: remoção automatizada do fundo branco; conferir as bordas antes de publicar.
- `decorativos/`: 2 texturas neutras geradas para fundos; CSS puro também serve.
- `referencias/inspiracao-eden.jpg`: referência de composição, **não publicar como conteúdo do restaurante**.
- `manifest.json`: origem e coordenadas dos recortes.

## Observações importantes
1. O macarrão visto no recorte `prato-feito-macarrao-e-carne.webp` é massa comprida no prato; **não tratar automaticamente a imagem como comprovação de que seja o famoso macarrão quadrado**.
2. A referência de macarrão quadrado precisa ser conferida visualmente. Até confirmar, usar título/copy sobre a especialidade e fotografia real genérica com legenda honesta, sem falsificar um prato específico.
3. Não inventar preços, contato, horário, história ou certificação oficial de patrimônio cultural.
4. Os recortes vêm de capturas de tela com cantos arredondados e podem ter pequenos resíduos nos cantos: preferir tratamento via `border-radius`, `object-fit: cover` e máscara de arredondamento na UI.
