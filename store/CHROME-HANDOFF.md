Você vai me ajudar a publicar a extensão Zoomorph na Chrome Web Store. Já estou logado no painel, nesta aba:
https://chrome.google.com/webstore/devconsole/c41fe9c7-0918-4544-9d33-af8ab2ea1469

Regras:
- Preencha todos os campos de texto com os valores abaixo, exatamente como estão.
- Você NÃO consegue enviar arquivos. Sempre que chegar num campo de upload (pacote .zip, ícone, capturas, blocos promocionais), PARE e me diga qual arquivo devo arrastar, usando o nome da lista "ARQUIVOS". Espere eu confirmar antes de continuar.
- Taxa de registro, verificação de e-mail e qualquer pagamento ou dado pessoal são comigo: se aparecerem, pare e me avise.
- Antes de clicar em "Enviar para revisão" / "Submit for review", me mostre um resumo do que foi preenchido e espere o meu "pode enviar".
- Se um campo não existir ou tiver outro nome, me diga o que encontrou em vez de improvisar.

=====================================================================
ARQUIVOS (eu arrasto quando você pedir)
=====================================================================
[ZIP]        Pacote da extensão ......... zoomorph-2.3.3.zip
[ICON]       Ícone da loja 128×128 ...... icon-128.png
[SHOT1]      Captura 1 (1280×800) ....... screenshot-1-1280x800.png
[SHOT2]      Captura 2 (1280×800) ....... screenshot-2-1280x800.png
[SMALL]      Bloco promocional pequeno 440×280 ...... promo-small-440x280.png
[MARQUEE]    Bloco promocional grande (marquee) 1400×560 ...... promo-marquee-1400x560.png

=====================================================================
1. PACOTE
=====================================================================
Se o item ainda não tiver pacote, o primeiro passo é o upload do [ZIP]. Pare e peça.
A versão do pacote é 2.3.3. Nome no manifest: "Zoomorph".

=====================================================================
2. FICHA DA LOJA (Store listing)
=====================================================================
Idioma principal: Português (Brasil). O app e as imagens estão em português, então a ficha também.

Descrição (Description) — cole tudo, o português em cima e o inglês embaixo:
---
O Zoomorph faz o filme ocupar a sua tela inteira, sem tarja preta.

Ele lê o tamanho da sua tela e o formato do vídeo e calcula o zoom certo. Você não precisa adivinhar porcentagem, e o ajuste acompanha a entrada e a saída da tela cheia. Se o vídeo já cobre a tela, o zoom fica em 100%.

MODOS
• Preencher: zoom até a tarja sumir, sem distorcer
• Meio-termo: metade da tarja, metade do corte
• Esticar: ocupa a tela toda sem cortar nada
• Manual: zoom fixo de 100% a 300%

FEITO PARA QUALQUER TELA
• Monitor, janela do player, 16:10, 16:9, 21:9 e 32:9
• Ideal para monitores ultrawide
• No YouTube e em sites sem DRM, detecta sozinho a tarja gravada no vídeo

LEMBRA DE TUDO
• Cada filme ou série guarda o próprio ajuste
• O modo pode virar padrão do site
• Presets com nome

ATALHOS
• Alt+Z alterna entre o ajuste e o original
• Alt+X troca o formato do filme, Alt+M troca o modo
• Alt+roda do mouse ajusta o zoom
• Aviso na tela, também em tela cheia

FUNCIONA COM
Disney+, Prime Video, Netflix, Max, Apple TV+, Paramount+, Globoplay, Crunchyroll, YouTube e qualquer site com vídeo HTML5.

PRIVACIDADE
Nenhum dado é coletado ou enviado. Tudo fica no seu navegador.

Código-fonte: https://github.com/Pedroooxx/zoomorph

————————————————————
ENGLISH

Zoomorph makes movies fill your whole screen, with no black bars.

It reads your screen size and the video format and works out the right zoom. No guessing percentages, and it adapts when you enter or leave fullscreen. If the video already covers the screen, the zoom stays at 100%.

MODES
• Fill: zoom until the bars are gone, without distortion
• Half-way: half the bars, half the crop
• Stretch: fill the screen without cropping
• Manual: fixed zoom from 100% to 300%

ANY SCREEN
• Monitor, player window, 16:10, 16:9, 21:9 and 32:9
• Great for ultrawide monitors
• On YouTube and other DRM-free sites, detects letterboxing baked into the video automatically

REMEMBERS EVERYTHING
• Each movie or show keeps its own setting
• Make a mode the default for a site
• Named presets

SHORTCUTS
• Alt+Z toggles between your setting and the original
• Alt+X cycles the film ratio, Alt+M cycles the mode
• Alt+mouse wheel adjusts the zoom
• On-screen indicator, also in fullscreen

WORKS WITH
Disney+, Prime Video, Netflix, Max, Apple TV+, Paramount+, Globoplay, Crunchyroll, YouTube and any site with HTML5 video.

PRIVACY
No data is collected or sent. Everything stays in your browser.

Source code: https://github.com/Pedroooxx/zoomorph
---

Categoria (Category): Entertainment  (se não existir: Tools / Ferramentas)
Ícone da loja: [ICON]  → pare e peça
Capturas de tela: [SHOT1] e [SHOT2]  → pare e peça
Bloco promocional pequeno: [SMALL]  → pare e peça
Bloco promocional grande / marquee: [MARQUEE]  → pare e peça
Vídeo promocional do YouTube: deixe vazio
URL oficial / Official URL: deixe "None" se for um seletor de domínio verificado
URL da página inicial (Homepage URL): https://pedroooxx.github.io/zoomorph/
URL de suporte (Support URL): https://github.com/Pedroooxx/zoomorph/issues
Conteúdo adulto (Mature content): Não / No

Descrição curta (se o painel pedir; ela vem do manifest e já está em português):
Tire a tarja preta dos filmes em streaming. Zoom automático pela sua tela e pelo formato do vídeo, em qualquer site.

Não adicione um segundo idioma separado: o inglês já vai no fim da descrição.

=====================================================================
3. PRIVACIDADE (Privacy practices)
=====================================================================
Finalidade única (Single purpose description):
Zoomorph adjusts the framing (zoom and aspect ratio) of the main video on streaming sites to remove black bars (letterboxing/pillarboxing), so movies fill the user's screen. It works on any site with an HTML5 <video> element, such as Disney+, Netflix, Prime Video, Max and YouTube.

Justificativa da permissão "storage":
Stores the user's framing settings locally (chrome.storage.local): the mode and film aspect ratio per title, the default mode per site, named presets, the chosen screen ratio and a usage counter used once to show a rating prompt. Nothing is sent anywhere.

Justificativa da permissão "scripting":
Used only when the extension is installed or updated, to activate the extension in tabs that were already open (injecting its own packaged content scripts), so the user does not have to reload the streaming page.

Justificativa de permissão de host (Host permission / <all_urls>):
The video can be on any streaming site or any page with an HTML5 video, including iframes from other domains, so the content scripts run on all URLs. They only locate the main <video> element, measure its size and apply a CSS transform to it. On DRM-free sites they also analyse a 160 px thumbnail of a frame locally to detect black bars. They do not read page text, forms, cookies, credentials or browsing history, and nothing is transmitted.

Código remoto (Are you using remote code?): Não / No, I am not using remote code

Uso de dados (Data usage) — o que a extensão coleta: NÃO marque nenhuma categoria (nenhum dado é coletado).
Marque as três declarações:
- I do not sell or transfer user data to third parties, outside of the approved use cases
- I do not use or transfer user data for purposes that are unrelated to my item's single purpose
- I do not use or transfer user data to determine creditworthiness or for lending purposes

URL da política de privacidade (Privacy policy URL):
https://pedroooxx.github.io/zoomorph/privacy.html

=====================================================================
4. DISTRIBUIÇÃO (Distribution)
=====================================================================
Pagamento: Gratuito / Free (sem compras no app)
Visibilidade: Pública / Public
Regiões: Todas / All regions

=====================================================================
5. INSTRUÇÕES DE TESTE (Test instructions), se existir a aba
=====================================================================
No account is needed. The extension adjusts the CSS transform of the main <video> element to remove black bars; it collects and transmits no data (settings stay in chrome.storage.local).

How to test (no login required):
1. Open a public YouTube movie trailer with letterboxing, e.g. https://www.youtube.com/watch?v=n9xhJrPXop4 , and play it.
2. Click the Zoomorph toolbar icon. Under "automático", choose "Preencher" (Fill). Within a few seconds the black bars are detected and the video is zoomed to fill the player. Enter fullscreen: the zoom is recalculated for the screen.
3. "Original" restores the video. The "manual" slider sets a fixed zoom from 100% to 300%.
4. Shortcuts: Alt+Z toggles, Alt+mouse wheel zooms, Alt+D copies a diagnostic.

The UI is in Portuguese (Brazil). Source code (not minified): https://github.com/Pedroooxx/zoomorph

=====================================================================
6. ENVIO
=====================================================================
Quando tudo estiver preenchido, me mostre o resumo e espere meu "pode enviar" antes de clicar em "Submit for review" / "Enviar para revisão".
