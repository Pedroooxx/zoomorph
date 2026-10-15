"""Gera o pacote das lojas e a demonstração do popup.

  python build.py   ->  dist/zoomorph-<versão>.zip  e  demo/popup.html
"""
import json, zipfile, pathlib

root = pathlib.Path(__file__).parent
version = json.loads((root / "manifest.json").read_text(encoding="utf-8"))["version"]

# Pacote: só o que a extensão usa.
include = ["manifest.json", "background.js", "src", "popup", "icons", "LICENSE"]
out = root / "dist" / f"zoomorph-{version}.zip"
out.parent.mkdir(exist_ok=True)
with zipfile.ZipFile(out, "w", zipfile.ZIP_DEFLATED) as z:
    for name in include:
        p = root / name
        for f in ([p] if p.is_file() else sorted(p.rglob("*"))):
            if f.is_file():
                z.write(f, f.relative_to(root).as_posix())
print(out, out.stat().st_size, "bytes")

# Demonstração: o popup real com as APIs simuladas (demo/fake-chrome.js).
html = (root / "popup" / "popup.html").read_text(encoding="utf-8")
html = (html.replace('href="popup.css"', 'href="../popup/popup.css"')
            .replace('<script src="../src/shared.js">', '<script src="fake-chrome.js"></script>\n  <script src="../src/shared.js">')
            .replace('<script src="popup.js">', '<script src="../popup/popup.js">'))
(root / "demo" / "popup.html").write_text(html, encoding="utf-8")
print(root / "demo" / "popup.html")
