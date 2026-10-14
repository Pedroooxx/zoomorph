// Mundo isolado: guarda as preferências, resolve o enquadramento (título >
// site > global), recebe atalhos e mostra o aviso na tela.
(() => {
  if (window.__zoomorphContent) return;
  window.__zoomorphContent = true;
  const site = zmSite(location.hostname);
  let titleKey = zmTitleKey(location.href);
  let href = location.href;
  let store = { sites: {}, titles: {}, presets: [], screen: null, global: null, uses: 0 };
  let status = { has: false };
  let cur = resolve();

  function resolve() {
    const t = titleKey && store.titles[titleKey];
    const s = store.sites[site]?.framing;
    if (t) return { f: clean(t), src: "title" };
    if (s) return { f: { ...clean(s), car: "auto", x: 0, y: 0 }, src: "site" };
    if (store.global) return { f: { ...clean(store.global), car: "auto", x: 0, y: 0 }, src: "global" };
    return { f: { ...ZM.DEFAULT }, src: "default" };
  }

  // Descarta o antigo "fine" (somava ao modo e podia ir abaixo de 100%).
  function clean(f) {
    const { fine, ...rest } = f;
    return { ...ZM.DEFAULT, ...rest };
  }

  // Zoom manual parte do zoom que está na tela, para não dar salto.
  const manual = z => save({ mode: "manual", zoom: Math.min(3, Math.max(1, Math.round(z * 100) / 100)) });

  const enabled = () => store.sites[site]?.enabled !== false;

  function push() {
    if (!chrome.runtime?.id) return; // extensão atualizada: esta cópia ficou órfã
    cur = resolve();
    window.postMessage({ type: "zoomorph:cfg", cfg: { ...cur.f, screen: store.screen, enabled: enabled() } }, "*");
  }

  function save(framing) {
    const f = { ...cur.f, ...framing };
    const patch = {};
    if (titleKey) patch.titles = { ...store.titles, [titleKey]: f };
    else patch.sites = { ...store.sites, [site]: { ...store.sites[site], framing: f } };
    if (f.mode !== "original") patch.uses = (store.uses || 0) + 1;
    Object.assign(store, patch);
    chrome.storage.local.set(patch);
    push();
  }

  // ---------- aviso na tela ----------
  let hud, hudTimer;
  function showHud() {
    if (!status.has) return;
    const label = (list, v) => (list.find(r => r[1] === v) || [typeof v === "number" ? v.toFixed(2) : v])[0];
    const mode = ZM.MODES.find(m => m[0] === cur.f.mode)[1];
    const text = cur.f.mode === "original" ? "Original"
      : cur.f.mode === "manual" ? `Manual · ${Math.round((status.zoom || 1) * 100)}%`
      : `${label(ZM.RATIOS, cur.f.car)} → ${store.screen ? label(ZM.SCREENS, store.screen) : "player"} · ${mode} · ${Math.round((status.zoom || 1) * 100)}%`;
    if (!hud) {
      hud = document.createElement("div");
      hud.style.cssText = "position:fixed;top:18px;right:18px;z-index:2147483647;display:flex;gap:10px;align-items:center;" +
        "background:rgba(20,8,38,.86);color:#f3edff;font:500 13px ui-monospace,Consolas,monospace;padding:8px 12px;" +
        "border-radius:6px;pointer-events:none;transition:opacity .25s;backdrop-filter:blur(6px)";
    }
    hud.innerHTML = `<img src="${chrome.runtime.getURL("icons/icon32.png")}" width="16" height="16" alt=""><span></span>`;
    hud.lastChild.textContent = text;
    (document.fullscreenElement || document.body || document.documentElement).appendChild(hud);
    hud.style.opacity = "1";
    clearTimeout(hudTimer);
    hudTimer = setTimeout(() => (hud.style.opacity = "0"), 1500);
  }

  // ---------- comandos ----------
  const next = (list, v) => list[(list.findIndex(x => x[0] === v || x[1] === v) + 1) % list.length];
  const cmds = {
    toggle: () => cur.f.mode === "original"
      ? save({ mode: cur.f.lastMode || "fill" })
      : save({ lastMode: cur.f.mode, mode: "original" }),
    "cycle-ratio": () => save({ car: next(ZM.RATIOS, cur.f.car)[1], mode: ZM.AUTO_MODES.includes(cur.f.mode) ? cur.f.mode : "fill" }),
    "cycle-mode": () => save({ mode: next(ZM.AUTO_MODES.map(m => [m]).concat([["original"]]), cur.f.mode)[0] }),
    zoomIn: () => manual((status.zoom || 1) + 0.02),
    zoomOut: () => manual((status.zoom || 1) - 0.02),
    up: () => save({ y: cur.f.y + 1 }), down: () => save({ y: cur.f.y - 1 }),
    left: () => save({ x: cur.f.x + 1 }), right: () => save({ x: cur.f.x - 1 }),
    manual: z => manual(z),
  };
  function run(cmd, arg) {
    if (!status.has || !cmds[cmd]) return;
    cmds[cmd](arg);
    setTimeout(showHud, 120);
  }

  window.addEventListener("keydown", e => {
    if (!e.altKey || !status.has) return;
    const map = e.shiftKey
      ? { ArrowUp: "up", ArrowDown: "down", ArrowLeft: "left", ArrowRight: "right" }
      : { ArrowUp: "zoomIn", ArrowDown: "zoomOut" };
    if (map[e.code]) { e.preventDefault(); e.stopImmediatePropagation(); run(map[e.code]); }
  }, true);

  window.addEventListener("wheel", e => {
    if (!e.altKey || !status.has) return;
    e.preventDefault();
    run(e.deltaY < 0 ? "zoomIn" : "zoomOut");
  }, { capture: true, passive: false });

  // ---------- mensagens ----------
  let detectCb = null;
  window.addEventListener("message", e => {
    if (e.source !== window || !e.data) return;
    if (e.data.type === "zoomorph:status") {
      const had = status.has;
      status = e.data.st;
      if (status.has || had)
        chrome.runtime.sendMessage({ type: "badge", text: status.has && status.active ? String(Math.round(status.zoom * 100)) : "" }).catch(() => {});
    }
    if (e.data.type === "zoomorph:detected" && detectCb) { detectCb(e.data.res); detectCb = null; }
  });

  chrome.runtime.onMessage.addListener((msg, _s, reply) => {
    if (msg.type === "cmd") { run(msg.cmd, msg.arg); return; }
    if (msg.type === "rescan") { window.postMessage({ type: "zoomorph:hello" }, "*"); return; }
    if (msg.type === "get") {
      const answer = () => reply({ site, titleKey, status, src: cur.src, framing: cur.f, enabled: enabled() });
      if (status.has) { answer(); return; }
      if (window === top) { setTimeout(answer, 300); return true; }
      return; // frames sem vídeo não respondem
    }
    if (!status.has) return;
    if (msg.type === "set") { save(msg.framing); reply(true); }
    if (msg.type === "detect") {
      detectCb = reply;
      window.postMessage({ type: "zoomorph:detect" }, "*");
      return true;
    }
  });

  chrome.storage.local.get(null, s => {
    Object.assign(store, s);
    push();
    // Pede o estado atual: o page.js pode ter achado o vídeo antes de nós ouvirmos.
    window.postMessage({ type: "zoomorph:hello" }, "*");
  });
  chrome.storage.onChanged.addListener(ch => {
    for (const k in ch) store[k] = ch[k].newValue;
    push();
  });

  // Streamings são SPA: o título muda sem recarregar a página.
  setInterval(() => {
    if (location.href === href) return;
    href = location.href;
    titleKey = zmTitleKey(href);
    push();
  }, 1000);
})();
