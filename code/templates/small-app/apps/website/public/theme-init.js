try {
  const storageKey = document.documentElement.dataset.themeStorage;
  const theme = storageKey ? localStorage.getItem(storageKey) : null;
  if (theme === 'light' || theme === 'dark' || theme === 'system') document.documentElement.dataset.theme = theme;
} catch {}
