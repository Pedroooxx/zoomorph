# Publicar o Zoomorph: passo a passo

## Situação

| Loja | Status | Identificação |
|---|---|---|
| Edge Add-ons | Em revisão desde 15/10/2026 (versão 2.3.3, prazo informado: até 7 dias úteis) | Store ID `0RDCKDC295GJ` · CRX ID `npkglikcgcbfnelmiimhjcmnmmabjlka` · link após aprovação: `https://microsoftedge.microsoft.com/addons/detail/npkglikcgcbfnelmiimhjcmnmmabjlka` |
| Opera Add-ons | Não enviado | |
| Chrome Web Store | Não enviado | |

Faça tudo no seu navegador (Opera, Chrome ou Edge), fora do app. Abra este arquivo ao lado e copie os valores.

**Arquivos** (pasta `D:\PEDRO\Extensions\stream-zoom`)

| O quê | Arquivo |
|---|---|
| Pacote | `dist\zoomorph-2.3.3.zip` |
| Ícone 128 | `store\images\icon-128.png` |
| Logo 300×300 (Edge) | `store\images\logo-300x300.png` |
| Capturas 1280×800 | `store\images\screenshot-1-1280x800.png`, `screenshot-2-1280x800.png` |
| Bloco pequeno 440×280 | `store\images\promo-small-440x280.png` |
| Bloco grande 1400×560 | `store\images\promo-marquee-1400x560.png` |

**Links que se repetem**

| Campo | Valor |
|---|---|
| Site / página inicial | `https://pedroooxx.github.io/zoomorph/` |
| Política de privacidade | `https://pedroooxx.github.io/zoomorph/privacy.html` |
| Suporte | `https://github.com/Pedroooxx/zoomorph/issues` |

Os textos (descrição curta e completa, em português e inglês) estão em [listing.md](listing.md).

> Os nomes dos campos abaixo podem mudar um pouco de uma loja para outra ou com o tempo. Se algo não bater, me mande um print que eu te digo o que pôr.

---

## 1. Opera Add-ons (grátis)

1. Abra https://addons.opera.com/developer/ e entre com a sua conta Opera (ou crie uma).
2. Aceite o contrato de desenvolvedor, se for pedido.
3. Clique em **Upload new extension** (ou **Add extension**) e envie o `dist\zoomorph-2.3.3.zip`.
4. Na ficha, preencha:
   - **Name:** `Zoomorph`
   - **Category:** `Productivity` (ou `Accessibility`, se existir)
   - **Summary:** a descrição curta (EN) do listing.md
   - **Description:** a descrição completa (EN). Se houver aba de idioma, adicione **Português (Brasil)** com o texto PT.
   - **Homepage:** o site · **Support page:** o link de suporte · **Privacy policy:** a URL da política
   - **Screenshots:** as duas capturas 1280×800
   - **License:** MIT, se o formulário pedir
5. **Notes for moderators**, se houver, cole:
   > The extension adjusts the CSS transform of the main `<video>` element on streaming sites to remove letterboxing. No data is collected or transmitted; settings are stored in chrome.storage.local. Source code (not minified): https://github.com/Pedroooxx/zoomorph
6. Envie para revisão. A revisão do Opera é manual e pode levar de alguns dias a algumas semanas.

---

## 2. Microsoft Edge Add-ons (grátis)

1. Abra https://partner.microsoft.com/dashboard/microsoftedge/overview e entre com uma conta Microsoft.
2. Na primeira vez, faça o **cadastro de desenvolvedor**: conta individual, nome de exibição `Pedroooxx` (ou o que preferir), país e contato. Não tem custo.
3. Clique em **Create new extension** e envie o `dist\zoomorph-2.3.3.zip`.
4. **Availability:** visibilidade **Public**, mercados **todos**.
5. **Properties:**
   - **Category:** `Productivity`
   - **Privacy policy:** sim, a extensão tem → URL da política
   - **Website:** o site · **Support contact:** o link de suporte
   - **Mature content:** não
6. **Store listings:** adicione **English** e **Português (Brasil)**. Em cada idioma:
   - **Description:** a descrição completa do idioma
   - **Short description:** a descrição curta do idioma
   - **Extension logo:** `logo-300x300.png`
   - **Small promotional tile:** `promo-small-440x280.png`
   - **Screenshots:** as duas capturas
   - **Large promotional tile:** `promo-marquee-1400x560.png` (opcional)
   - **Search terms:** `ultrawide`, `aspect ratio`, `black bars`, `video zoom`, `letterbox`
7. **Submission options / Notes for certification:** cole a mesma nota do Opera (passo 5 acima).
8. Clique em **Publish**. A revisão leva alguns dias úteis.

---

## 3. Chrome Web Store (taxa única de registro)

1. Abra https://chrome.google.com/webstore/devconsole no Chrome e entre com a conta Google.
2. Aceite o contrato e **pague a taxa de registro** (cartão, uma vez só; a página mostra o valor antes de cobrar).
3. Em **Account**, preencha o nome do editor (`Pedroooxx`) e **verifique o e-mail de contato**. Sem isso o botão de envio fica bloqueado.
4. Clique em **New item** e envie o `dist\zoomorph-2.3.3.zip`.
5. Aba **Store listing:**
   - **Description:** a descrição completa (PT, ou EN se o idioma principal for inglês)
   - **Category:** `Tools` (Ferramentas)
   - **Language:** Português (Brasil). Depois adicione English.
   - **Store icon:** `icon-128.png`
   - **Screenshots:** as duas capturas 1280×800
   - **Small promo tile:** `promo-small-440x280.png` · **Marquee promo tile:** `promo-marquee-1400x560.png`
   - **Homepage URL:** o site · **Support URL:** o link de suporte
6. Aba **Privacy:**
   - **Single purpose:** `Ajustar o enquadramento (zoom e proporção) do vídeo em sites de streaming para remover as faixas pretas.`
   - **Justificativas das permissões:** copie a tabela "Justificativas" do listing.md (`storage`, `scripting` e acesso aos sites)
   - **Remote code:** **No**
   - **Data usage:** não marque nenhum tipo de dado. Marque as três declarações (não vende, não usa para fins não relacionados, não usa para crédito).
   - **Privacy policy URL:** a URL da política
7. Aba **Distribution:** **Public**, todas as regiões.
8. Clique em **Submit for review**. Como a extensão roda em todos os sites, a revisão pode levar alguns dias.

---

## Depois que for aprovada

Me mande os links das fichas. Eu coloco os links em `ZM.STORE` no `src/shared.js` para ativar o convite de avaliação, atualizo o README e o site com os botões das lojas e publico a 2.2.1.
