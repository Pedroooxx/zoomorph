// Simula as APIs da extensão para rodar o popup real fora do navegador
// (demonstração no GitHub Pages e capturas de tela). Cenário: monitor 21:9,
// arquivo 16:9 com um filme 2.39 dentro.
(() => {
  const MONITOR = 3440 / 1440;
  const FILE = 16 / 9;
  const store = { presets: [
    { name: "Ultrawide cinema", framing: { mode: "fill", car: 2.39, zoom: 1, x: 0, y: 0 } },
    { name: "Série 16:9", framing: { mode: "half", car: "auto", zoom: 1, x: 0, y: 0 } },
  ] };
  let framing = { mode: "fill", car: 2.39, zoom: 1, x: 0, y: 0 };

  function status() {
    const s = store.screen && store.screen !== "box" ? store.screen : MONITOR;
    const c = framing.car === "auto" ? FILE : framing.car;
    // arquivo encaixado numa área s×1; filme dentro do arquivo (tarja gravada)
    const [fw, fh] = FILE < s ? [FILE, 1] : [s, s / FILE];
    const [cw, ch] = c > FILE ? [fw, fw / c] : [fh * c, fh];
    const kx = Math.max(1, s / cw), ky = Math.max(1, 1 / ch);
    let z = 1;
    if (framing.mode === "fill") z = Math.max(kx, ky);
    if (framing.mode === "half") z = 1 + (Math.max(kx, ky) - 1) / 2;
    if (framing.mode === "stretch") z = Math.max(kx, ky);
    if (framing.mode === "manual") z = framing.zoom;
    return { has: true, vw: 1920, vh: 1080, bw: 3440, bh: 1440, s, c, zoom: z, active: z > 1, fs: false };
  }

  const info = () => ({ site: "streaming.exemplo", titleKey: "streaming.exemplo|demo-2391", status: status(), src: "title", framing, enabled: true });

  // Monitor simulado (o popup mostra a resolução detectada).
  try {
    Object.defineProperty(window, "screen", { value: { width: 3440, height: 1440 } });
    Object.defineProperty(window, "devicePixelRatio", { value: 1 });
  } catch {}

  window.chrome = {
    runtime: { id: "demo", sendMessage: async () => true, getURL: p => "../" + p },
    storage: { local: {
      get: async () => ({ ...store }),
      set: async o => { Object.assign(store, o); },
    }, onChanged: { addListener() {} } },
    tabs: {
      query: (_q, cb) => cb([{ id: 1 }]),
      get: async () => ({ url: "https://streaming.exemplo/play/demo" }),
      create: ({ url }) => console.log("abriria", url),
      reload() {},
      sendMessage: async (_id, msg) => {
        if (msg.type === "get") return info();
        if (msg.type === "set") { framing = { ...framing, ...msg.framing }; return true; }
        if (msg.type === "detect") return { ok: true, car: 2.39 };
        return true;
      },
    },
  };
})();
