# Changelog

## Próxima versão

- Convite de avaliação no popup aponta para as fichas do Edge Add-ons e do Opera Add-ons.

## 2.3.3 — 2026-10-15

- Descrição do manifest encurtada para o limite de 132 caracteres exigido pelas lojas (Edge e Chrome).

## 2.3.2 — 2026-10-15

YouTube funcionando de verdade.

- **Área de referência pelo player:** o YouTube dimensiona o `<video>` do tamanho exato da imagem e deixa as faixas no fundo do player. A conta passou a usar o contêiner do player, e não só a caixa do vídeo, que travava os modos automáticos em 100%.
- **Tarja detectada sozinha** no formato "auto" em sites sem DRM (YouTube, Vimeo…): uma miniatura de 160 px por segundo, valendo o formato da maioria das amostras do último minuto. Cartelas, logos e cenas escuras não desligam mais o zoom.
- **Troca de vídeo no YouTube:** o site reaproveita o mesmo `<video>`; a detecção agora reconhece a troca e não herda a tarja do vídeo anterior.
- **Tela cheia sem salto:** o zoom espera o player terminar de redimensionar o vídeo antes de ser aplicado, em vez de aparecer exagerado por um instante.
- **Zoom aplicado também por folha de estilo própria** (técnica do Ultrawidify), que continua valendo quando o player reescreve o estilo do vídeo.
- **Modo "monitor" em janela:** preenche o player, mas nunca passa do zoom que a tela cheia pediria.
- **Alt+D** copia um diagnóstico, inclusive em tela cheia, para relatar problemas.
- O aviso na tela não usa mais `innerHTML` (compatível com sites que exigem Trusted Types, como o YouTube).
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
