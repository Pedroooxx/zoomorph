// Mundo da página (MAIN): encontra o vídeo principal e aplica o enquadramento.
// Roda antes do site para capturar shadow roots, inclusive fechados.
(() => {
  // Ao atualizar a extensão, a versão nova substitui a antiga na aba aberta.
  const VERSION = "2.2.1";
  const prev = window.__zoomorph;
  if (prev && prev.v === VERSION) return;
  prev?.stop?.();

  const roots = new Set([document]);
  const origAttach = Element.prototype.attachShadow;
  Element.prototype.attachShadow = function (init) {
    const r = origAttach.call(this, init);
    roots.add(r);
    return r;
  };

  let cfg = { mode: "original", car: "auto", zoom: 1, x: 0, y: 0, screen: null, enabled: true };
  let target = null;
  let last = null;

  function scanOpen(root) {
    root.querySelectorAll("*").forEach(el => {
      if (el.shadowRoot && !roots.has(el.shadowRoot)) {
        roots.add(el.shadowRoot);
        scanOpen(el.shadowRoot);
      }
    });
  }

  // Vídeo principal: o maior visível; tocando vale mais que pausado.
  // A Disney+ mantém um segundo <video> oculto; o filtro de visibilidade o descarta.
  function allVideos() {
    const out = [];
    for (const r of roots) {
      try { r.querySelectorAll("video").forEach(v => v.isConnected && out.push(v)); } catch {}
    }
    return out;
  }

  // Nota de 0 (descartado) para cima. Usa o retângulo na tela, que funciona
  // mesmo quando o player dimensiona o <video> por CSS externo (Prime Video).
  function rate(v) {
    const r = v.getBoundingClientRect();
    const w = r.width || v.clientWidth, h = r.height || v.clientHeight;
    if (w < 160 || h < 90) return { score: 0, why: `pequeno ${Math.round(w)}x${Math.round(h)}` };
    if (getComputedStyle(v).display === "none") return { score: 0, why: "display:none" };
    let s = w * h;
    if (!v.paused) s *= 2;
    if (v.readyState > 1 || v.videoWidth) s *= 2;
    if (!v.currentSrc && !v.srcObject) s *= 0.3;
    return { score: s, why: "ok" };
  }

  function pickMain() {
    let best = null, score = 0;
    for (const v of allVideos()) {
      const { score: s } = rate(v);
      if (s > score) { score = s; best = v; }
    }
    return best;
  }

  // Diagnóstico: no console da página, rode __zoomorphDebug()
  window.__zoomorphDebug = () => ({
    url: location.href,
    frame: window === top ? "top" : "iframe",
    roots: roots.size,
    cfg,
    chosen: target ? (target.id || target.className || "video") : null,
    geometry: target ? geometry(target) : null,
    result: target ? compute(target) : null,
    videos: allVideos().map(v => ({
      id: v.id, cls: String(v.className).slice(0, 60), ...rate(v),
      client: v.clientWidth + "x" + v.clientHeight,
      file: v.videoWidth + "x" + v.videoHeight, paused: v.paused, readyState: v.readyState,
      transform: getComputedStyle(v).transform,
    })),
  });

  // Tamanho sem o nosso transform (getBoundingClientRect incluiria o zoom).
  function layoutSize(v) {
    return { w: v.clientWidth || v.offsetWidth || v.parentElement?.clientWidth || 1,
             h: v.clientHeight || v.offsetHeight || v.parentElement?.clientHeight || 1 };
  }

  // Retângulo do <video> na tela sem o nosso zoom (o zoom é feito pelo centro).
  let applied = { sx: 1, sy: 1 };
  function boxRect(v) {
    const r = v.getBoundingClientRect();
    const sx = v.dataset.zoomorph ? applied.sx : 1, sy = v.dataset.zoomorph ? applied.sy : 1;
    const w = r.width / sx, h = r.height / sy, cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    return { l: cx - w / 2, t: cy - h / 2, r: cx + w / 2, b: cy + h / 2 };
  }
  const inter = (a, b) => ({ l: Math.max(a.l, b.l), t: Math.max(a.t, b.t), r: Math.min(a.r, b.r), b: Math.min(a.b, b.b) });
  const W = q => Math.max(1, q.r - q.l), H = q => Math.max(1, q.b - q.t);

  // Área visível do player: a caixa do vídeo recortada pelos contêineres com
  // overflow escondido e pela janela. O Prime, por exemplo, pode deixar o
  // <video> maior que o player e cortar o excesso.
  function visibleRect(v, box) {
    let vis = inter(box, { l: 0, t: 0, r: innerWidth, b: innerHeight });
    for (let el = v.parentElement; el && el !== document.documentElement; el = el.parentElement || el.getRootNode().host) {
      const cs = getComputedStyle(el);
      if (cs.overflow !== "visible") {
        const r = el.getBoundingClientRect();
        if (r.width && r.height) vis = inter(vis, { l: r.left, t: r.top, r: r.right, b: r.bottom });
      }
    }
    return vis;
  }

  // Imagem do arquivo dentro da caixa, conforme o object-fit do site.
  function pictureRect(v, box, fr) {
    const bw = W(box), bh = H(box), cx = (box.l + box.r) / 2, cy = (box.t + box.b) / 2;
    const fit = getComputedStyle(v).objectFit;
    let pw = bw, ph = bh;
    if (fit === "contain" || fit === "scale-down" || fit === "none") {
      if (bw / bh > fr) pw = bh * fr; else ph = bw / fr;
    } else if (fit === "cover") {
      if (bw / bh > fr) ph = bw / fr; else pw = bh * fr;
    }
    return { l: cx - pw / 2, t: cy - ph / 2, r: cx + pw / 2, b: cy + ph / 2 };
  }

  //  D = área de referência: em tela cheia, a tela; fora dela, um retângulo com
  //      a proporção do monitor dentro da área visível do player.
  //  E = parte do filme que aparece (filme dentro da imagem, recortado pela caixa).
  // O zoom é o necessário para E cobrir D. Se o vídeo já cobre, fica 100%.
  function geometry(v) {
    const box = boxRect(v);
    const fs = !!document.fullscreenElement;
    const vis = fs ? { l: 0, t: 0, r: innerWidth, b: innerHeight } : visibleRect(v, box);
    let dw = W(vis), dh = H(vis);
    const r = cfg.screen === "box" ? null : cfg.screen || (fs ? null : screen.width / screen.height);
    if (r) { if (dw / dh > r) dw = dh * r; else dh = dw / r; }

    const fr = v.videoWidth && v.videoHeight ? v.videoWidth / v.videoHeight : W(box) / H(box);
    const pic = pictureRect(v, box, fr);
    const ignored = cfg.car !== "auto" && cfg.car < fr - 0.03;
    const c = cfg.car === "auto" || ignored ? fr : cfg.car;
    let cw = W(pic), ch = cw / c;
    if (ch > H(pic)) { ch = H(pic); cw = ch * c; }
    const cx = (pic.l + pic.r) / 2, cy = (pic.t + pic.b) / 2;
    const film = inter({ l: cx - cw / 2, t: cy - ch / 2, r: cx + cw / 2, b: cy + ch / 2 }, box);
    return { dw, dh, cw: W(film), ch: H(film), s: dw / dh, c, fr, ignored,
             fit: getComputedStyle(v).objectFit, box: [W(box), H(box)], vis: [W(vis), H(vis)] };
  }

  // Dois usos que não se misturam:
  //  - automático (fill/half/stretch): recalculado a cada mudança de área;
  //  - manual: zoom fixo escolhido pelo usuário (100–300%).
  // Nunca abaixo de 100%, e a posição é limitada para não mostrar bordas.
  function compute(v) {
    const g = geometry(v);
    const kx = Math.max(1, g.dw / g.cw), ky = Math.max(1, g.dh / g.ch);
    let sx = 1, sy = 1;
    if (cfg.mode === "manual") sx = sy = Math.min(3, Math.max(1, cfg.zoom || 1));
    else if (cfg.mode === "fill") sx = sy = Math.max(kx, ky);
    else if (cfg.mode === "half") sx = sy = 1 + (Math.max(kx, ky) - 1) / 2;
    else if (cfg.mode === "stretch") { sx = kx; sy = ky; }
    sx = Math.min(4, sx); sy = Math.min(4, sy);
    const lim = z => (50 * (z - 1)) / z;
    const x = Math.max(-lim(sx), Math.min(lim(sx), cfg.x || 0));
    const y = Math.max(-lim(sy), Math.min(lim(sy), cfg.y || 0));
    return { sx, sy, x, y, s: g.s, c: g.c, ignored: g.ignored };
  }

  // O zoom vaza da caixa do vídeo; algum contêiner precisa cortar o excesso.
  // Usa o ancestral mais próximo que cobre o vídeo. Não pode ser o pai direto
  // às cegas: no YouTube ele mede 0×0 e cortaria o vídeo inteiro.
  let clipped = null;
  function clipTo(v) {
    const b = v.getBoundingClientRect();
    const sx = applied.sx || 1, sy = applied.sy || 1;
    const need = { w: (b.width / sx) * 0.9, h: (b.height / sy) * 0.9 };
    for (let el = v.parentElement; el && el !== document.body; el = el.parentElement || el.getRootNode().host) {
      if (el.clientWidth < need.w || el.clientHeight < need.h) continue;
      if (getComputedStyle(el).overflow !== "visible") return;
      if (clipped && clipped !== el) clipped.style.removeProperty("overflow");
      el.style.setProperty("overflow", "hidden", "important");
      clipped = el;
      return;
    }
  }

  function clear(v) {
    v.style.removeProperty("transform");
    v.style.removeProperty("transform-origin");
    delete v.dataset.zoomorph;
    if (clipped) { clipped.style.removeProperty("overflow"); clipped = null; }
  }

  function apply() {
    try { scanOpen(document); } catch {}
    const v = pickMain();
    if (target && target !== v && target.dataset.zoomorph) clear(target);
    if (target !== v) applied = { sx: 1, sy: 1 };
    target = v;
    if (!v) return report(null);
    const r = compute(v);
    const active = cfg.enabled && (r.sx !== 1 || r.sy !== 1);
    if (active) {
      const t = `scale(${r.sx.toFixed(4)}, ${r.sy.toFixed(4)}) translate(${r.x.toFixed(2)}%, ${r.y.toFixed(2)}%)`;
      if (v.style.getPropertyValue("transform") !== t || v.style.getPropertyPriority("transform") !== "important") {
        v.style.setProperty("transform", t, "important");
        v.style.setProperty("transform-origin", "center center", "important");
      }
      v.dataset.zoomorph = "1";
      applied = { sx: r.sx, sy: r.sy };
      clipTo(v);
    } else if (v.dataset.zoomorph) { clear(v); applied = { sx: 1, sy: 1 }; }
    report(v, r);
  }

  function report(v, r) {
    const st = v
      ? { has: true, vw: v.videoWidth, vh: v.videoHeight, bw: layoutSize(v).w, bh: layoutSize(v).h,
          s: r.s, c: r.c, zoom: Math.max(r.sx, r.sy), active: !!v.dataset.zoomorph, ignored: r.ignored, fs: !!document.fullscreenElement }
      : { has: false };
    const key = JSON.stringify(st);
    if (key === last) return;
    last = key;
    window.postMessage({ type: "zoomorph:status", st }, "*");
  }

  // Detecção de tarjas pelos pixels. Só funciona em vídeo sem DRM (YouTube,
  // Vimeo, Twitch...). Em Disney+/Netflix/Prime o quadro vem preto ou bloqueado.
  function detectBars() {
    const v = target;
    if (!v || !v.videoWidth) return { ok: false, reason: "nenhum vídeo tocando" };
    const W = 160, H = Math.round(160 * v.videoHeight / v.videoWidth);
    const cv = document.createElement("canvas");
    cv.width = W; cv.height = H;
    const ctx = cv.getContext("2d", { willReadFrequently: true });
    let px;
    try {
      ctx.drawImage(v, 0, 0, W, H);
      px = ctx.getImageData(0, 0, W, H).data;
    } catch {
      return { ok: false, reason: "este site protege o vídeo" };
    }
    const dark = y => {
      let sum = 0;
      for (let x = 0; x < W; x++) { const i = (y * W + x) * 4; sum += px[i] + px[i + 1] + px[i + 2]; }
      return sum / (W * 3) < 18;
    };
    let top = 0, bot = H - 1;
    while (top < H && dark(top)) top++;
    while (bot > top && dark(bot)) bot--;
    if (top >= H - 1) return { ok: false, reason: "quadro escuro ou vídeo protegido" };
    const contentH = bot - top + 1;
    if (contentH > H * 0.97) return { ok: true, car: +(v.videoWidth / v.videoHeight).toFixed(2) };
    return { ok: true, car: +(W / contentH).toFixed(2) };
  }

  function onMessage(e) {
    if (e.source !== window || !e.data) return;
    if (e.data.type === "zoomorph:cfg") { cfg = e.data.cfg; last = null; apply(); }
    if (e.data.type === "zoomorph:hello") { last = null; apply(); }
    if (e.data.type === "zoomorph:detect")
      window.postMessage({ type: "zoomorph:detected", res: detectBars() }, "*");
  }

  const onFs = () => setTimeout(apply, 50);
  window.addEventListener("message", onMessage);
  document.addEventListener("fullscreenchange", onFs, true);
  window.addEventListener("resize", onFs);
  const timers = [setInterval(apply, 800), setInterval(() => { last = null; }, 4000)];

  window.__zoomorph = {
    v: VERSION,
    stop() {
      timers.forEach(clearInterval);
      window.removeEventListener("message", onMessage);
      document.removeEventListener("fullscreenchange", onFs, true);
      window.removeEventListener("resize", onFs);
      if (target?.dataset.zoomorph) clear(target);
    },
  };
})();
