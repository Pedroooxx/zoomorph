<p align="right"><b>English</b> · <a href="CONTRIBUTING.pt-BR.md">Português</a></p>

# Contributing to Zoomorph

Thanks for your interest! There are three easy ways to help.

## 1. Test a streaming service

The compatibility list in the [README](README.md#compatibility) depends on real tests. Open a movie, use **Preencher** (Fill) mode, and enter and leave fullscreen. Then [open an issue](https://github.com/Pedroooxx/zoomorph/issues/new/choose), even if it worked, and paste the diagnostic copied with <kbd>Alt</kbd>+<kbd>D</kbd>: it shows the chosen video and the zoom calculation.

## 2. Add a streaming service

Each service identifies a title in the URL in its own way. For Zoomorph to remember settings per movie, add a line to [`src/adapters.js`](src/adapters.js):

```js
{ host: /example\.com$/, title: u => u.pathname.match(/\/watch\/(\w+)/)?.[1] },
```

Everything else (finding the video, measuring, applying the zoom) already works on any site.

## 3. Code

```bash
git clone https://github.com/Pedroooxx/zoomorph.git
cd zoomorph
```

1. Load the folder as an unpacked extension (`chrome://extensions` → Developer mode → Load unpacked).
2. After editing, click reload (⟳) on the extension card. Open tabs pick up the new version automatically.
3. `python build.py` builds the package in `dist/` and refreshes the demo in `demo/popup.html`.

**Project conventions**
- Plain JavaScript, no dependencies and no build step.
- Documentation and commit messages in English; code comments and UI text are in Portuguese.
- When changing the zoom logic in `src/page.js`, bump the `VERSION` constant and the `manifest.json` `version` together. That is what makes the new version replace the old one in open tabs.
- The manifest `description` must stay within 132 characters (store limit).
- Record the change in [CHANGELOG.md](CHANGELOG.md).

## License of contributions

By sending a contribution (pull request, patch or code in an issue), you agree that it is released under the project's [license](LICENSE) and that Pedroooxx may also use, relicense and distribute it as part of Zoomorph, including in the browser extension stores. You keep the credit: contributors are listed in the repository history.

## Visual identity

Use the colors and symbol described in the [README](README.md#visual-identity). Promotional images live in `docs/images` and `store/images`.
