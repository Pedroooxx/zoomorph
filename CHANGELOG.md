# Changelog

## 2.3.5 — 2026-10-15

- **Netflix:** the zoom pushed the picture to the bottom-right corner. Netflix centres its `<video>` with its own `translate(-50%, -50%)`, and the extension replaced that transform. The zoom is now applied on top of the site's own transform, on every site.

## 2.3.4 — 2026-10-15

- **License changed** from MIT to [PolyForm Noncommercial 1.0.0](LICENSE): free for non-commercial use; the Zoomorph name and logo are reserved. Versions 2.3.3 and earlier remain under MIT.
- The rating prompt in the popup links to the Edge Add-ons and Opera Add-ons listings.

## 2.3.3 — 2026-10-15

- Manifest description shortened to the 132-character limit required by the stores (Edge and Chrome).

## 2.3.2 — 2026-10-15

YouTube working for real.

- **Reference area from the player:** YouTube sizes the `<video>` to the exact picture and leaves the bars in the player background. The calculation now uses the player container instead of only the video box, which kept automatic modes stuck at 100%.
- **Automatic letterbox detection** in "auto" format on DRM-free sites (YouTube, Vimeo…): one 160 px thumbnail per second, using the format seen in most samples over the last minute. Title cards, logos and dark scenes no longer switch the zoom off.
- **Video changes on YouTube:** the site reuses the same `<video>`; detection now notices the change and no longer inherits the previous video's bars.
- **Fullscreen without a jump:** the zoom waits for the player to finish resizing the video, instead of briefly appearing too large.
- **Zoom also applied through its own stylesheet** (the Ultrawidify technique), so it keeps working when the player rewrites the video's style.
- **"Monitor" mode in a window:** fills the player but never zooms more than fullscreen would need.
- **Alt+D** copies a diagnostic, including in fullscreen, for bug reports.
- The on-screen indicator no longer uses `innerHTML` (compatible with sites that require Trusted Types, such as YouTube).
- Zoom differences below 0.5% are ignored.

## 2.2.1 — 2026-10-14

- Fixes the video disappearing on YouTube when any setting was applied. The extension clipped the zoom overflow on the element around the video, which is 0×0 on YouTube. It now uses the nearest container that actually covers the video, and only if that container doesn't already clip.

## 2.2.0 — 2026-10-14

First public release.

- Zoom calculated from the real geometry: visible area, video box, the site's `object-fit` and the movie inside the file. Videos that already cover the screen stay at 100%.
- Automatic modes (fill, half-way, stretch) that follow entering and leaving fullscreen, plus a separate manual zoom (100–300%).
- Reference based on the monitor's aspect ratio in a window too, with a "window" option and fixed ratios.
- Adjustable movie format saved per title, and letterbox detection on DRM-free sites.
- Per-title memory and default mode per site.
- Presets, per-site on/off switch, on-screen indicator, zoom badge on the icon and configurable shortcuts.
- Automatic activation in already open tabs when installing or updating.
- Clear popup messages when no video is found.
