import { bootstrapTheme } from './theme.mjs';

const initialized = new WeakMap();

export function initSiteChrome(document) {
  const previous = initialized.get(document);
  if (previous) {
    previous.refresh();
    return previous.cleanup;
  }
  const window = document.defaultView;
  if (!window) return () => {};
  const theme = bootstrapTheme(document, window);
  const root = document.documentElement;
  root.dataset.hrChromeReady = 'true';

  function refresh() {
    const dark = root.classList.contains('dark');
    document.querySelectorAll('[data-hr-theme-toggle]').forEach((button) => {
      button.setAttribute('aria-label', dark ? '切换为浅色模式' : '切换为深色模式');
      button.setAttribute('aria-pressed', String(dark));
      button.setAttribute('title', dark ? '切换为浅色模式' : '切换为深色模式');
    });
    document.querySelectorAll('[data-hr-theme-system]').forEach((button) => {
      button.setAttribute('aria-pressed', String(theme.getPreference() === 'auto'));
    });
  }

  function announceStorageFailure() {
    document.querySelectorAll('[data-hr-theme-status]').forEach((element) => {
      element.textContent = root.dataset.hrThemeSaved === 'false' ? '主题已切换，本次偏好未能保存。' : '';
    });
  }

  function closeMenus(focus = false) {
    document.querySelectorAll('[data-hr-menu][open]').forEach((menu) => {
      menu.open = false;
      if (focus) menu.querySelector('summary')?.focus();
    });
  }

  function onClick(event) {
    const target = event.target?.nodeType === 1 ? event.target : event.target?.parentElement;
    if (!target?.closest) return;
    if (target.closest('[data-hr-theme-toggle]')) {
      theme.set(root.classList.contains('dark') ? 'light' : 'dark');
      refresh();
      announceStorageFailure();
    } else if (target.closest('[data-hr-theme-system]')) {
      theme.set('auto');
      refresh();
      announceStorageFailure();
    }
    if (!target.closest('[data-hr-chrome-header]') || target.closest('[data-hr-nav]')) closeMenus();
  }

  function onKeydown(event) {
    if (event.key === 'Escape') closeMenus(true);
  }

  function onSystemChange() {
    theme.sync();
    refresh();
  }

  function onStorage(event) {
    if (event.key === null || theme.keys.includes(event.key)) {
      theme.set(theme.read(), false);
      refresh();
    }
  }

  document.addEventListener('click', onClick);
  document.addEventListener('keydown', onKeydown);
  window.addEventListener('storage', onStorage);
  theme.media.addEventListener('change', onSystemChange);
  refresh();

  let active = true;
  const cleanup = () => {
    if (!active) return;
    active = false;
    document.removeEventListener('click', onClick);
    document.removeEventListener('keydown', onKeydown);
    window.removeEventListener('storage', onStorage);
    theme.media.removeEventListener('change', onSystemChange);
    initialized.delete(document);
  };
  initialized.set(document, { refresh, cleanup });
  return cleanup;
}
