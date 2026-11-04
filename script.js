const swup = new Swup({
  plugins: [new SwupPreloadPlugin()]
});

// Loads the Vimeo player in a hidden frame while a case is hovered, so its code
// and poster are cached before the visit. Without autoplay, no video is downloaded.
swup.hooks.on('page:preload', (visit, { page }) => {
  const doc = new DOMParser().parseFromString(page.html, 'text/html');
  const embed = doc.querySelector('iframe[src*="player.vimeo.com"]');
  if (!embed) return;

  const url = new URL(embed.src);
  url.searchParams.delete('autoplay');

  const frame = document.createElement('iframe');
  frame.src = url.href;
  frame.hidden = true;
  frame.title = '';
  frame.setAttribute('aria-hidden', 'true');
  frame.tabIndex = -1;
  document.body.append(frame);
  setTimeout(() => frame.remove(), 8000);
});
