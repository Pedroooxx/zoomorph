# Changelog

## 2.3.0 — 2026-10-14

- **YouTube, Vimeo e outros sites sem DRM:** no formato "auto", a tarja gravada no arquivo agora é detectada sozinha, lendo um quadro pequeno a cada 2 s. Trailers e filmes em arquivo 16:9 passam a preencher o player sem ajuste manual.
- **Área de referência pelo player:** o YouTube dimensiona o `<video>` do tamanho exato da imagem e deixa as faixas no fundo do player. A conta passou a usar o contêiner do player, e não só a caixa do vídeo, e por isso os modos automáticos não ficavam mais presos em 100%.
- **Modo "monitor" em janela:** preenche o player, mas nunca passa do zoom que a tela cheia pediria. Evita cortar imagem à toa num player mais largo que o monitor.
- Diferenças de zoom abaixo de 0,5% são ignoradas.

## 2.2.1 — 2026-10-14

- Corrige o vídeo sumindo no YouTube ao aplicar qualquer ajuste. A extensão cortava o excesso do zoom no elemento em volta do vídeo, que no YouTube mede 0×0. Agora ela usa o contêiner mais próximo que realmente cobre o vídeo, e só se ele ainda não corta o excesso.

## 2.2.0 — 2026-10-14

Primeira versão pública.

- Zoom calculado pela geometria real: área visível, caixa do vídeo, `object-fit` do site e filme dentro do arquivo. Vídeos que já cobrem a tela ficam em 100%.
- Modos automáticos (preencher, meio-termo, esticar) que acompanham a entrada e a saída da tela cheia, e zoom manual separado (100–300%).
- Referência pela proporção do monitor também em janela, com opção "janela" e proporções fixas.
- Formato do filme ajustável, salvo por título, e detecção de tarja em sites sem DRM.
- Memória por título e modo padrão por site.
- Presets, liga e desliga por site, aviso na tela, zoom no ícone e atalhos configuráveis.
- Injeção automática em abas já abertas ao instalar ou atualizar.
- Mensagens claras no popup quando nenhum vídeo é encontrado.
