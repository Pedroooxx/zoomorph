const $ = id => document.getElementById(id);
let tabId, info, store = {};

const send = msg => chrome.tabs.sendMessage(tabId, msg).catch(() => null);
const set = framing => send({ type: "set", framing }).then(refresh);
const fmt = n => (typeof n === "number" ? n.toFixed(2) : n);
const nameOf = (list, v) => (list.find(r => r[1] === v || (typeof v === "number" && typeof r[1] === "number" && Math.abs(r[1] - v) < 0.01)) || [fmt(v)])[0];
const SRC = { title: "salvo para este título", site: "do arquivo", global: "do arquivo", default: "do arquivo" };

function seg(el, items, isOn, onPick, labelIdx = 0) {
  $(el).replaceChildren(...items.map(item => {
    const key = item[0];
    const b = document.createElement("button");
    b.textContent = item[labelIdx];
    b.setAttribute("aria-pressed", isOn(key));
    b.onclick = () => onPick(key);
    return b;
  }));
}

function preview(f, st) {
  const s = st.s;
  const c = f.car === "auto" ? st.c : f.car;
  let sx = 1, sy = 1;
  if (f.mode === "manual") sx = sy = st.zoom || f.zoom || 1;
  else if (c && f.mode !== "original") {
    const k = Math.min(4, Math.max(s / c, c / s));
    if (f.mode === "fill") sx = sy = k;
    else if (f.mode === "half") sx = sy = 1 + (k - 1) / 2;
    else if (c > s) sy = k; else sx = k;
  }
  $("stage").style.setProperty("--sar", s);
  $("frame").style.setProperty("--car", c || s);
  $("frame").style.transform = `scale(${sx}, ${sy}) translate(${f.x}%, ${f.y}%)`;
  $("tag").textContent = f.mode === "original" ? "original"
    : f.mode === "manual" ? `manual ${Math.round(sx * 100)}%`
    : `${nameOf(ZM.RATIOS, c)} → ${nameOf(ZM.SCREENS, s)}${st.fs ? " · tela cheia" : ""}`;
}

function render() {
  $("site").textContent = info.site;
  $("title").textContent = info.titleKey ? "· título " + info.titleKey.split("|")[1].slice(0, 12) : "";
  $("enabled").checked = info.enabled;
  $("novideo").hidden = info.status.has;
  $("ui").hidden = !info.status.has;
  if (!info.status.has) return;

  const f = info.framing, st = info.status;
  const dpr = devicePixelRatio || 1;
  const mon = `monitor ${Math.round(screen.width * dpr)}×${Math.round(screen.height * dpr)}`;
  $("scrInfo").textContent = store.screen === "box" ? `player ${st.bw}×${st.bh}` : store.screen ? "fixada manualmente" : mon;
  seg("screens", ZM.SCREENS, k => (ZM.SCREENS.find(r => r[0] === k)[1] || null) === (store.screen || null), k => {
    chrome.storage.local.set({ screen: ZM.SCREENS.find(r => r[0] === k)[1] }).then(refresh);
  });
  const carNow = f.car === "auto" ? st.c : f.car;
  $("carV").textContent = carNow ? carNow.toFixed(2) : "—";
  if (document.activeElement !== $("carR") && carNow) $("carR").value = carNow;
  $("carAuto").hidden = f.car === "auto";
  $("src").textContent = st.ignored ? `arquivo já é ${fmt(st.c)} · formato salvo ignorado`
    : f.car === "auto" ? (st.auto ? `auto · tarja detectada (${fmt(st.c)})` : "auto · igual ao arquivo") : `ajustado · ${SRC[info.src]}`;
  seg("modes", ZM.MODES.filter(m => m[0] !== "manual"), k => k === f.mode, k => set({ mode: k }), 1);
  const isManual = f.mode === "manual";
  $("manualBox").classList.toggle("on", isManual);
  $("filmBox").classList.toggle("muted", isManual);
  $("manualHint").textContent = isManual ? "zoom fixo · não acompanha a tela" : "arraste para fixar um zoom";
  $("zoomV").textContent = Math.round((st.zoom || 1) * 100) + "%";
  if (document.activeElement !== $("zoomR")) $("zoomR").value = Math.round((st.zoom || 1) * 100);
  $("forget").hidden = info.src !== "title";
  preview(f, st);
  renderPresets(f);
}

function renderPresets(f) {
  const list = store.presets || [];
  if (!list.length) {
    $("presets").innerHTML = '<div class="none">Nenhum preset ainda. Ajuste o vídeo e salve.</div>';
    return;
  }
  $("presets").replaceChildren(...list.map((p, i) => {
    const row = document.createElement("div");
    row.className = "preset";
    const a = document.createElement("button");
    a.className = "apply";
    a.textContent = p.name;
    a.onclick = () => set({ ...p.framing });
    const meta = document.createElement("small");
    meta.textContent = `${nameOf(ZM.RATIOS, p.framing.car)} · ${ZM.MODES.find(m => m[0] === p.framing.mode)[1]}`;
    const del = document.createElement("button");
    del.className = "del";
    del.textContent = "×";
    del.setAttribute("aria-label", "Excluir " + p.name);
    del.onclick = () => chrome.storage.local.set({ presets: list.filter((_, j) => j !== i) }).then(refresh);
    row.append(a, meta, del);
    return row;
  }));
}

let injected = false, misses = 0;

function noVideo(title, text) {
  $("ui").hidden = true;
  $("novideo").hidden = false;
  $("nvTitle").textContent = title;
  $("nvText").textContent = text;
}

async function refresh() {
  store = await chrome.storage.local.get(null);
  let res = await send({ type: "get" });
  // Sem resposta: a aba foi aberta antes da extensão ser instalada/atualizada.
  if (!res && !injected) {
    injected = true;
    await chrome.runtime.sendMessage({ type: "inject", tabId });
    await new Promise(r => setTimeout(r, 400));
    res = await send({ type: "get" });
  }
  renderRate();
  if (!res) {
    const url = (await chrome.tabs.get(tabId)).url || "";
    if (!/^https?:/.test(url)) return noVideo("Página sem suporte", "O navegador não permite extensões nesta página.");
    return noVideo("Zoomorph ainda não está ativo nesta aba", "Recarregue a página para ativar.");
  }
  info = res;
  if (!info.status.has) {
    misses++;
    $("site").textContent = info.site;
    return noVideo(
      misses < 4 ? "Procurando vídeo…" : "Nenhum vídeo encontrado",
      misses < 4 ? "Dê play no vídeo. Este painel atualiza sozinho quando encontrar."
                 : "Confira se o vídeo está tocando. Se ele já está na tela, clique em Procurar de novo ou recarregue a página.");
  }
  misses = 0;
  render();
}

// ---------- controles ----------
// Ajuste exato do formato: continua automático (acompanha a tela cheia).
$("carAuto").onclick = e => { e.preventDefault(); set({ car: "auto" }); };
$("carR").oninput = e => {
  const car = +(+e.target.value).toFixed(2);
  $("carV").textContent = car.toFixed(2);
  set({ car, mode: ZM.AUTO_MODES.includes(info.framing.mode) ? info.framing.mode : "fill" });
};

const manual = z => set({ mode: "manual", zoom: Math.min(3, Math.max(1, Math.round(z * 100) / 100)) });
$("zoomR").oninput = e => manual(e.target.value / 100);
$("minus").onclick = () => manual((info.status.zoom || 1) - 0.02);
$("plus").onclick = () => manual((info.status.zoom || 1) + 0.02);
document.querySelectorAll(".pan button").forEach(b => (b.onclick = () => {
  const f = info.framing;
  const d = { left: { x: f.x + 1 }, right: { x: f.x - 1 }, up: { y: f.y + 1 }, down: { y: f.y - 1 }, center: { x: 0, y: 0 } };
  set(d[b.dataset.p]);
}));

$("detect").onclick = async e => {
  e.preventDefault();
  $("src").textContent = "analisando…";
  const res = await send({ type: "detect" });
  if (res?.ok) set({ car: res.car, mode: ZM.AUTO_MODES.includes(info.framing.mode) ? info.framing.mode : "fill" });
  else $("src").textContent = res?.reason || "não foi possível";
};

$("enabled").onchange = e => {
  const sites = store.sites || {};
  chrome.storage.local.set({ sites: { ...sites, [info.site]: { ...sites[info.site], enabled: e.target.checked } } }).then(refresh);
};

$("siteDefault").onclick = async () => {
  const sites = store.sites || {};
  // Só o modo vira padrão do site: o formato muda de um filme para outro.
  const { mode, zoom } = info.framing;
  await chrome.storage.local.set({ sites: { ...sites, [info.site]: { ...sites[info.site], framing: { mode, zoom } } } });
  $("siteDefault").textContent = "Salvo como padrão do site";
  $("siteDefault").classList.add("done");
  refresh();
};

$("forget").onclick = async () => {
  const titles = { ...(store.titles || {}) };
  delete titles[info.titleKey];
  await chrome.storage.local.set({ titles });
  refresh();
};

$("savePreset").onclick = e => {
  e.preventDefault();
  $("presetForm").hidden = false;
  $("presetName").value = `${nameOf(ZM.RATIOS, info.framing.car)} ${ZM.MODES.find(m => m[0] === info.framing.mode)[1].toLowerCase()}`;
  $("presetName").select();
};
$("presetForm").onsubmit = async e => {
  e.preventDefault();
  const name = $("presetName").value.trim();
  if (!name) return;
  const { lastMode, fine, ...framing } = info.framing;
  await chrome.storage.local.set({ presets: [...(store.presets || []), { name, framing }] });
  $("presetForm").hidden = true;
  refresh();
};

// ---------- atalhos e avaliação ----------
const isOpera = navigator.userAgent.includes("OPR/");
const isEdge = navigator.userAgent.includes("Edg/");
$("shortcuts").onclick = e => {
  e.preventDefault();
  chrome.tabs.create({ url: isOpera ? "opera://extensions/shortcuts" : isEdge ? "edge://extensions/shortcuts" : "chrome://extensions/shortcuts" });
};

function renderRate() {
  const show = (store.uses || 0) >= ZM.RATE_AFTER_USES && !store.rateDismissed;
  $("rate").hidden = !show;
  const url = ZM.STORE[isOpera ? "opera" : isEdge ? "edge" : "chrome"];
  $("rateLink").classList.toggle("off", !url);
  $("rateLink").textContent = url ? "Avaliar na loja" : "em breve na loja";
  $("rateLink").onclick = e => {
    e.preventDefault();
    if (!url) return;
    chrome.tabs.create({ url });
    chrome.storage.local.set({ rateDismissed: true });
  };
}
$("rateLater").onclick = () => chrome.storage.local.set({ rateDismissed: true }).then(refresh);

$("retry").onclick = async () => {
  injected = false;
  misses = 0;
  await send({ type: "rescan" });
  refresh();
};
$("reload").onclick = () => { chrome.tabs.reload(tabId); window.close(); };

chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
  tabId = tab.id;
  refresh();
  setInterval(refresh, 1000);
});
