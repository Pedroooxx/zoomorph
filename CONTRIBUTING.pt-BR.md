<p align="right"><a href="CONTRIBUTING.md">English</a> · <b>Português</b></p>

# Contribuir com o Zoomorph

Obrigado pelo interesse! Há três jeitos fáceis de ajudar.

## 1. Testar um streaming

A lista de compatibilidade no [README](README.pt-BR.md#compatibilidade) depende de testes reais. Abra um filme, use o modo **Preencher** e entre e saia da tela cheia. Depois [abra uma issue](https://github.com/Pedroooxx/zoomorph/issues/new/choose), mesmo que tenha funcionado, e cole o diagnóstico copiado com <kbd>Alt</kbd>+<kbd>D</kbd>: ele mostra o vídeo escolhido e a conta do zoom.

## 2. Adicionar um streaming

Cada streaming identifica o título na URL de um jeito. Para o Zoomorph lembrar o ajuste por filme, inclua uma linha em [`src/adapters.js`](src/adapters.js):

```js
{ host: /exemplo\.com$/, title: u => u.pathname.match(/\/assistir\/(\w+)/)?.[1] },
```

O resto (achar o vídeo, medir, aplicar o zoom) já funciona em qualquer site.

## 3. Código

```bash
git clone https://github.com/Pedroooxx/zoomorph.git
cd zoomorph
```

1. Carregue a pasta como extensão sem compactação (`chrome://extensions` → Modo do desenvolvedor → Carregar sem compactação).
2. Depois de editar, clique em recarregar (⟳) no card. As abas abertas recebem a versão nova sozinhas.
3. `python build.py` gera o pacote em `dist/` e atualiza a demonstração em `demo/popup.html`.

**Padrões do projeto**
- JavaScript puro, sem dependências nem etapa de build.
- Documentação e mensagens de commit em inglês; comentários do código e textos da interface em português.
- Ao mudar a lógica do zoom em `src/page.js`, suba a constante `VERSION` e o `version` do `manifest.json` juntos. É isso que faz a versão nova substituir a antiga nas abas abertas.
- Registre a mudança no [CHANGELOG.md](CHANGELOG.md).

## Identidade visual

Use as cores e o símbolo descritos no [README](README.pt-BR.md#identidade-visual). As imagens de divulgação ficam em `docs/images` e `store/images`.
