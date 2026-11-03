// This function is deliberately self-contained: the same implementation runs
// before first paint and in the progressive client controller.
export function bootstrapTheme(document, window) {
  const root = document.documentElement;
  const keys = ['herong-theme', 'vitepress-theme-appearance', 'dev-guides-theme', 'light-tools-theme'];
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  const normalize = (value) => ['light', 'dark'].includes(value) ? value : ['auto', 'system'].includes(value) ? 'auto' : null;
  function read() {
    try {
      for (const key of keys) {
        const saved = normalize(window.localStorage.getItem(key));
        if (saved) return saved;
      }
    } catch { return normalize(root.dataset.hrThemePreference) || 'auto'; }
    return 'auto';
  }
  let preference = read();
  function sync() {
    const resolved = preference === 'auto' ? (media.matches ? 'dark' : 'light') : preference;
    root.classList.toggle('dark', resolved === 'dark');
    root.dataset.theme = resolved;
    root.dataset.themeJs = 'true';
    root.dataset.hrThemePreference = preference;
    root.style.colorScheme = resolved;
    return resolved;
  }
  function set(value, persist = true) {
    preference = normalize(value) || 'auto';
    const resolved = sync();
    let saved = true;
    if (persist) {
      for (const key of keys) {
        try { window.localStorage.setItem(key, preference); } catch { saved = false; }
      }
    }
    root.dataset.hrThemeSaved = String(saved);
    return resolved;
  }
  sync();
  return { media, keys, read, sync, set, getPreference: () => preference };
}

export const themeBootstrapScript = `(${bootstrapTheme.toString()})(document,window);`;
