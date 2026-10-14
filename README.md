<p align="center">
  <img src="docs/images/banner.png" alt="Zoomorph — qualquer filme, qualquer tela, qualquer streaming" width="100%">
</p>

<p align="center">
  <a href="../../releases/latest"><img alt="Baixar" src="https://img.shields.io/github/v/release/Pedroooxx/zoomorph?label=baixar&color=8a3ffc&style=for-the-badge"></a>
  <img alt="Chrome, Opera, Edge" src="https://img.shields.io/badge/Chrome%20·%20Opera%20·%20Edge-Manifest%20V3-ffd23f?style=for-the-badge&labelColor=140826">
  <img alt="Licença MIT" src="https://img.shields.io/badge/licença-MIT-a596c7?style=for-the-badge&labelColor=140826">
</p>

<p align="center">
  <b>Zoomorph</b> tira a tarja preta dos filmes em streaming.<br>
  Ele lê o tamanho da sua tela e o formato do vídeo e calcula o zoom certo, sem você precisar adivinhar porcentagem.
</p>

<p align="center">
  <a href="#instalar">Instalar</a> ·
  <a href="#como-usar">Como usar</a> ·
  <a href="#atalhos">Atalhos</a> ·
  <a href="#compatibilidade">Compatibilidade</a> ·
  <a href="https://Pedroooxx.github.io/zoomorph/demo/popup.html">Demonstração</a> ·
  <a href="#english">English</a>
</p>

---

<img src="docs/images/popup.png" alt="Popup do Zoomorph" width="300" align="right">

## Por que existe

Filmes de cinema são mais largos que a maioria das telas. Os streamings entregam esses filmes com faixas pretas em cima e embaixo, e num monitor ultrawide muitas vezes também nas laterais. Extensões de zoom comuns pedem uma porcentagem e não acompanham a mudança para tela cheia, e várias nem encontram o vídeo em sites como a Disney+.

O Zoomorph mede o que aparece de fato na tela (o player, o arquivo de vídeo e o filme dentro dele) e aplica só o zoom necessário. Se o vídeo já cobre a tela, ele fica em 100%.

## Recursos

- **Detecção automática** da tela (monitor, janela do player ou proporção fixa) e do formato do vídeo.
- **Quatro modos automáticos**, que se recalculam ao entrar e sair da tela cheia:
  - **Preencher:** zoom até sumir a tarja, cortando um pouco das bordas, sem distorcer.
  - **Meio-termo:** metade da tarja, metade do corte.
  - **Esticar:** ocupa a tela sem cortar nada, distorcendo a imagem.
  - **Original:** como o streaming entrega.
- **Zoom manual** de 100% a 300%, separado dos modos automáticos.
- **Ajuste do formato do filme** para quando a tarja vem gravada dentro do arquivo, e **detecção de tarja** pela imagem em sites sem proteção (YouTube, Vimeo…).
- **Memória por título:** cada filme ou série lembra o próprio ajuste. O modo pode virar padrão do site.
- **Presets** com nome, disponíveis em qualquer site.
- **Aviso na tela** a cada atalho, também em tela cheia, e **zoom no ícone** da extensão.
- **Liga e desliga por site.**
- **Sem coleta de dados:** nada sai do seu navegador. Veja a [política de privacidade](PRIVACY.md).

<br clear="right">

## Instalar

### Pela loja

Em breve na Chrome Web Store, no Opera Add-ons e no Edge Add-ons.

### Pelo arquivo (agora)

1. Baixe o `zoomorph-<versão>.zip` na [página de versões](../../releases/latest) e extraia numa pasta.
2. Abra a página de extensões do navegador:

   | Navegador | Endereço |
   |---|---|
   | Chrome | `chrome://extensions` |
   | Opera | `opera://extensions` |
   | Edge | `edge://extensions` |
   | Brave | `brave://extensions` |

3. Ative o **Modo do desenvolvedor**.
4. Clique em **Carregar sem compactação** e escolha a pasta extraída.
5. Recarregue as abas dos streamings que já estavam abertas.

Para atualizar, troque os arquivos da pasta e clique em recarregar (⟳) no card da extensão.

## Como usar

1. Dê play no filme e clique no ícone do Zoomorph.
2. Em **automático**, escolha **Preencher**. Pronto: o ajuste fica salvo para esse título.
3. Ainda sobrou tarja? Ela provavelmente está gravada no arquivo. Arraste **formato** até ela sumir, ou use **detectar tarja** em sites sem proteção.
4. Quer o mesmo modo em todos os títulos do site? Clique em **Usar como padrão do site**.

Experimente o popup sem instalar: [demonstração interativa](https://Pedroooxx.github.io/zoomorph/demo/popup.html).

## Atalhos

| Atalho | Ação |
|---|---|
| <kbd>Alt</kbd> + <kbd>Z</kbd> | Alterna entre o ajuste salvo e o original |
| <kbd>Alt</kbd> + <kbd>X</kbd> | Troca o formato do filme |
| <kbd>Alt</kbd> + <kbd>M</kbd> | Troca o modo automático |
| <kbd>Alt</kbd> + <kbd>↑</kbd> <kbd>↓</kbd> ou <kbd>Alt</kbd> + roda do mouse | Zoom manual de 2 em 2% |
| <kbd>Alt</kbd> + <kbd>Shift</kbd> + setas | Move a imagem |

Os três primeiros podem ser trocados na página de atalhos do navegador (link **atalhos** no rodapé do popup).

## Compatibilidade

| Streaming | Situação |
|---|---|
| Disney+ | ✅ testado |
| Prime Video | ✅ testado |
| Netflix, Max, Apple TV+, Paramount+, Globoplay, Crunchyroll | 🟡 reconhecidos, aguardando testes |
| YouTube, Vimeo, Twitch e qualquer site com `<video>` | 🟡 modo genérico |

Testou em algum? [Conte numa issue](../../issues/new) como foi.

**Limitação:** Disney+, Netflix e Prime protegem o vídeo (DRM), então a extensão não consegue ler a imagem para achar a tarja sozinha. Nesses sites ela usa o formato do arquivo e o que você salvou para o título.

## Como funciona

```
src/page.js       roda no contexto da página: acha o vídeo principal (inclusive em
                  shadow DOM e iframes), mede a geometria e aplica o transform
src/content.js    preferências, memória por título/site, atalhos e aviso na tela
src/adapters.js   como cada streaming identifica o título na URL
popup/            interface
background.js     atalhos globais, zoom no ícone, injeção em abas já abertas
```

O zoom é o necessário para a parte visível do filme cobrir a área de referência:

- **área de referência:** a tela em tela cheia; fora dela, um retângulo com a proporção do monitor dentro do player.
- **parte visível do filme:** o filme dentro do arquivo, posicionado conforme o `object-fit` do site e recortado pela caixa do vídeo.

## Desenvolvimento

```bash
git clone https://github.com/Pedroooxx/zoomorph.git
cd zoomorph
python build.py      # gera dist/zoomorph-<versão>.zip e demo/popup.html
```

Carregue a pasta do projeto como extensão sem compactação. No console de uma página com vídeo, `__zoomorphDebug()` mostra o vídeo escolhido e a conta do zoom.

Para adicionar um streaming, inclua uma linha em [`src/adapters.js`](src/adapters.js) com o domínio e a regra que extrai o ID do título da URL.

## Licença

[MIT](LICENSE). Use, modifique e distribua à vontade.

---

## English

**Zoomorph** removes black bars from streaming movies. It reads your screen and the video format, then applies only the zoom needed: fill, half-way, stretch or manual. It remembers each title, follows you into fullscreen and collects no data. It works on Chrome, Opera, Edge and Brave (Manifest V3), with Disney+, Prime Video, Netflix, Max, YouTube and any site with a `<video>`.

**Install:** download the zip from [Releases](../../releases/latest), extract it, open `chrome://extensions` (or `opera://`, `edge://`), enable Developer mode, then click **Load unpacked**.

**Shortcuts:** <kbd>Alt</kbd>+<kbd>Z</kbd> toggles, <kbd>Alt</kbd>+<kbd>X</kbd> cycles the film ratio, <kbd>Alt</kbd>+<kbd>M</kbd> cycles the mode, <kbd>Alt</kbd>+mouse wheel sets a manual zoom.
