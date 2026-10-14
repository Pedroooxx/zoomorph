// Repassa atalhos para a aba ativa, mostra o zoom no ícone e injeta os scripts
// em abas que já estavam abertas quando a extensão foi instalada/atualizada.
const PAGE = ["src/page.js"];
const CONTENT = ["src/shared.js", "src/adapters.js", "src/content.js"];

async function inject(tabId) {
  const target = { tabId, allFrames: true };
  await chrome.scripting.executeScript({ target, files: PAGE, world: "MAIN" });
  await chrome.scripting.executeScript({ target, files: CONTENT });
}

chrome.runtime.onInstalled.addListener(async () => {
  const tabs = await chrome.tabs.query({ url: ["http://*/*", "https://*/*"] });
  for (const t of tabs) inject(t.id).catch(() => {});
});

chrome.commands.onCommand.addListener(async cmd => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (tab) chrome.tabs.sendMessage(tab.id, { type: "cmd", cmd }).catch(() => {});
});

chrome.runtime.onMessage.addListener((msg, sender, reply) => {
  if (msg.type === "inject") {
    inject(msg.tabId).then(() => reply(true), () => reply(false));
    return true;
  }
  if (msg.type !== "badge" || !sender.tab) return;
  chrome.action.setBadgeBackgroundColor({ tabId: sender.tab.id, color: "#ffd23f" });
  chrome.action.setBadgeTextColor?.({ tabId: sender.tab.id, color: "#140826" });
  chrome.action.setBadgeText({ tabId: sender.tab.id, text: msg.text });
});
