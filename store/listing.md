# Material das lojas

## Dados gerais

| Campo | Valor |
|---|---|
| Nome | Zoomorph |
| Categoria | Ferramentas / Fotos e vídeos *(Chrome: "Ferramentas"; Opera: "Productivity")* |
| Idiomas | Português (Brasil), Inglês |
| Site | `https://Pedroooxx.github.io/zoomorph/` |
| Política de privacidade | `https://Pedroooxx.github.io/zoomorph/privacy.html` |
| Pacote | `dist/zoomorph-<versão>.zip` (gerado por `python build.py`) |
| Ícone | `icons/icon128.png` |
| Bloco pequeno 440×280 | `store/images/promo-small-440x280.png` |
| Bloco grande 1400×560 | `store/images/promo-marquee-1400x560.png` |
| Imagem promocional do Opera 300×188 | `store/images/promo-opera-300x188.png` (já enviada) |
| Capturas 1280×800 | `store/images/screenshot-1-1280x800.png`, `screenshot-2-1280x800.png` |

## Descrição curta (até 132 caracteres)

**PT:** Tire a tarja preta dos filmes em streaming. Zoom automático pela sua tela e pelo formato do vídeo, em qualquer site.

**EN:** Remove black bars from streaming movies. Automatic zoom based on your screen and the video format, on any site.

## Descrição completa (PT)

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

## Full description (EN)

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

## Justificativas (Chrome Web Store → Privacidade)

**Finalidade única:** ajustar o enquadramento (zoom e proporção) do vídeo em sites de streaming para remover as faixas pretas.

| Permissão | Justificativa |
|---|---|
| `storage` | Guarda localmente o ajuste de cada título, o modo padrão de cada site e os presets do usuário. |
| `scripting` | Ativa a extensão em abas que já estavam abertas quando ela é instalada ou atualizada, sem obrigar o usuário a recarregar a página. |
| Acesso a todos os sites (`<all_urls>`) | O vídeo pode estar em qualquer streaming ou site com vídeo HTML5, inclusive em iframes de outros domínios. O script só mede o elemento `<video>` e aplica um CSS transform nele; não lê conteúdo da página, formulários nem dados pessoais. |
| Código remoto | Não usa. Todo o código está no pacote. |

**Uso de dados:** marcar "Não coleta dados do usuário" e as três declarações (não vende, não usa para fins não relacionados, não usa para crédito).

## Passo a passo

### Chrome Web Store
1. Entre em https://chrome.google.com/webstore/devconsole e pague a taxa única de registro.
2. **Novo item** → envie o `.zip`.
3. **Ficha da loja:** descrições, categoria, idioma, ícone, capturas e blocos promocionais.
4. **Privacidade:** finalidade única, justificativas das permissões e URL da política.
5. **Distribuição:** pública, todos os países.
6. **Enviar para revisão.** Com acesso a todos os sites, a revisão costuma levar alguns dias.

### Opera Add-ons
1. Entre em https://addons.opera.com/developer/ (gratuito, com conta Opera).
2. **Upload new extension** → envie o `.zip`.
3. Preencha descrição, categoria, capturas e URL da política. O Opera exige que a extensão tenha **um objetivo claro**, e a descrição acima já cobre isso.
4. A revisão é manual e pode levar de dias a semanas.

### Edge Add-ons
1. Entre em https://partner.microsoft.com/dashboard/microsoftedge (gratuito).
2. Envie o mesmo `.zip` e o mesmo material.

### Depois de publicar
Cole os links das fichas em `ZM.STORE` no `src/shared.js`, para ativar o convite de avaliação do popup, e publique uma nova versão.
