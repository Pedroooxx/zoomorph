// Constantes compartilhadas entre content script e popup.
var ZM = {
  RATIOS: [["auto", "auto"], ["2.39", 2.39], ["2.00", 2], ["1.85", 1.85], ["16:9", 16 / 9], ["4:3", 4 / 3]],
  SCREENS: [["monitor", null], ["janela", "box"], ["16:10", 1.6], ["16:9", 16 / 9], ["21:9", 64 / 27], ["32:9", 32 / 9]],
  MODES: [["original", "Original"], ["fill", "Preencher"], ["half", "Meio-termo"], ["stretch", "Esticar"], ["manual", "Manual"]],
  AUTO_MODES: ["fill", "half", "stretch"],
  DEFAULT: { mode: "original", car: "auto", zoom: 1, x: 0, y: 0 },
  // Links de avaliação: preencher quando a extensão for publicada.
  STORE: { chrome: "", opera: "https://addons.opera.com/extensions/details/zoomorph/", edge: "https://microsoftedge.microsoft.com/addons/detail/npkglikcgcbfnelmiimhjcmnmmabjlka" },
  RATE_AFTER_USES: 5,
};
