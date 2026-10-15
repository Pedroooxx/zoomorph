# Política de privacidade do Zoomorph

Última atualização: 15 de outubro de 2026

O Zoomorph **não coleta, não envia e não vende nenhum dado**. Ele não tem servidor, conta, análise de uso nem anúncios.

## O que fica guardado

Ficam salvos **só no seu navegador** (`chrome.storage.local`):

- o ajuste de cada título (modo, formato do filme, zoom e posição), identificado pelo domínio e pelo ID do título na URL, por exemplo `disneyplus.com|560861a0`;
- o modo padrão de cada site e se a extensão está ligada nele;
- seus presets;
- a proporção de tela escolhida;
- um contador de usos, para mostrar uma vez o convite de avaliação na loja.

Esses dados nunca saem do seu computador. Para apagar tudo, remova a extensão.

## Por que a extensão pede acesso a todos os sites

Para encontrar o vídeo e ajustar o zoom em qualquer streaming, inclusive em sites que ainda não estão na lista, a extensão precisa rodar nas páginas. Ela só lê o tamanho do vídeo na página e aplica um ajuste visual nele. Ela não lê o que você digita, seus dados de login nem o seu histórico.

A detecção de tarja analisa, **localmente**, uma miniatura de 160 px de um quadro do vídeo: uma vez por segundo enquanto o vídeo toca no formato "auto", ou quando você clica em "detectar tarja". Ela só funciona em sites sem proteção de vídeo (DRM), como o YouTube. A análise só conta as linhas escuras em cima e embaixo; nenhuma imagem é guardada nem enviada.

## Contato

Dúvidas: abra uma issue no repositório do projeto.

---

# Zoomorph privacy policy

Zoomorph **collects, transmits and sells no data**. It has no servers, accounts, analytics or ads. Settings (per-title framing, per-site mode, presets, screen ratio and a usage counter for the rating prompt) are stored only in your browser via `chrome.storage.local`. Access to all sites is needed to find the video and apply a visual transform on any streaming site. Bar detection analyses a 160 px thumbnail of a video frame locally (once per second while a video plays in "auto" format, or when you click "detect bars"), only on sites without DRM such as YouTube. It only counts dark rows at the top and bottom; no image is stored or sent.
