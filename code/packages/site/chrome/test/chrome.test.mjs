import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { getNavigation, renderHeader, renderFooter, BRAND_LOGO_DATA_URL, BRAND_LOGO_LIGHT_DATA_URL, BRAND_LOGO_DARK_DATA_URL, BRAND_FAVICON_DATA_URL, themeBootstrapScript } from '../src/index.mjs';
import { bootstrapTheme } from '../src/theme.mjs';
import { initSiteChrome } from '../src/client.mjs';

function browser({ values = {}, dark = false, blocked = false } = {}) {
  const listeners = () => {
    const events = new Map();
    return {
      events,
      addEventListener(name, fn) { if (!events.has(name)) events.set(name, new Set()); events.get(name).add(fn); },
      removeEventListener(name, fn) { events.get(name)?.delete(fn); },
      emit(name, event = {}) { for (const fn of [...events.get(name) || []]) fn(event); },
    };
  };
  const storage = new Map(Object.entries(values));
  const classes = new Set();
  const root = { dataset: {}, style: {}, classList: {
    contains: (name) => classes.has(name),
    toggle(name, enabled) { if (enabled) classes.add(name); else classes.delete(name); },
  } };
  const media = { ...listeners(), matches: dark };
  const toggle = { attrs: {}, setAttribute(name, value) { this.attrs[name] = value; } };
  const system = { attrs: {}, setAttribute(name, value) { this.attrs[name] = value; } };
  const status = { textContent: '' };
  let focused = 0;
  const menu = { open: false, querySelector: () => ({ focus: () => focused++ }) };
  const window = {
    ...listeners(),
    localStorage: {
      getItem(key) { if (blocked) throw new Error('blocked'); return storage.get(key) ?? null; },
      setItem(key, value) { if (blocked) throw new Error('blocked'); storage.set(key, value); },
    },
    matchMedia: () => media,
  };
  const document = {
    ...listeners(), defaultView: window, documentElement: root,
    querySelectorAll(selector) {
      return selector === '[data-hr-theme-toggle]' ? [toggle]
        : selector === '[data-hr-theme-system]' ? [system]
        : selector === '[data-hr-theme-status]' ? [status]
        : selector === '[data-hr-menu][open]' && menu.open ? [menu] : [];
    },
  };
  const target = (kind) => ({ nodeType: 1, closest(selector) {
    if (kind === 'toggle' && selector === '[data-hr-theme-toggle]') return toggle;
    if (kind === 'system' && selector === '[data-hr-theme-system]') return system;
    if (kind === 'nav' && selector === '[data-hr-nav]') return {};
    return kind !== 'outside' && selector === '[data-hr-chrome-header]' ? {} : null;
  } });
  return { document, window, root, media, storage, toggle, system, status, menu, target, focusCount: () => focused };
}

test('navigation preserves the hosting base and crosses only configured application boundaries', () => {
  const root = getNavigation({ homeUrl: '/', guidesUrl: 'http://127.0.0.1:4372/', toolsUrl: '/file-tools' });
  assert.equal(root.find(x => x.id === 'articles').href, '/posts/');
  assert.equal(root.find(x => x.id === 'tutorials').href, 'http://127.0.0.1:4372/');
  assert.equal(root.find(x => x.id === 'tools').href, '/file-tools');
  const backup = getNavigation({ homeUrl: '/blog/' });
  assert.equal(backup.find(x => x.id === 'apps').href, '/blog/products/');
  assert.equal(backup.find(x => x.id === 'tutorials').href, 'https://dev.herong.info/');
  const custom = getNavigation({ homeUrl: 'https://preview.example/site-preview' });
  assert.equal(custom.find(x => x.id === 'projects').href, 'https://preview.example/site-preview/projects/');
});

test('unsafe URL protocols, credentials, protocol-relative URLs, and control characters fail closed', () => {
  for (const value of ['javascript:alert(1)', 'data:text/html,hello', '//example.com/', 'https://a.example/\nx', 'https://user:password@example.com/', '\\example.com', '/\\example.com']) {
    for (const key of ['homeUrl', 'guidesUrl', 'toolsUrl']) assert.throws(() => renderHeader({ [key]: value }), TypeError);
  }
  assert.throws(() => renderHeader({ homeUrl: '/blog/?next=bad' }), TypeError);
  assert.throws(() => renderHeader({ homeUrl: '/blog/#fragment' }), TypeError);
});

test('query separators are escaped in SSR attributes and active state cannot inject markup', () => {
  const html = renderHeader({ toolsUrl: 'https://tool.example/?a=1&b=2', active: 'tools' });
  assert.ok(html.includes('https://tool.example/?a=1&amp;b=2'));
  assert.equal((html.match(/aria-current="page"/g) || []).length, 2);
  const malicious = renderHeader({ active: '"><script>bad</script>' });
  assert.ok(!malicious.includes('<script>'));
  assert.ok(!malicious.includes('aria-current'));
});

test('the complete navigation and brand exist before client JavaScript runs', () => {
  const html = renderHeader({ homeUrl: '/blog/' });
  assert.equal((html.match(/data-hr-nav=/g) || []).length, 12);
  assert.ok(html.includes('<details'));
  assert.ok(html.includes('href="/blog/"'));
  const brand = html.match(/<a class="hr-chrome__brand"[^>]*>[\s\S]*?<\/a>/)?.[0];
  assert.ok(brand);
  assert.equal((brand.match(/aria-label="何荣首页"/g) || []).length, 1);
  const logos = [...brand.matchAll(/<img\b[^>]*>/g)].map(match => match[0]);
  assert.equal(logos.length, 2);
  const sources = [BRAND_LOGO_LIGHT_DATA_URL, BRAND_LOGO_DARK_DATA_URL];
  for (const [index, theme] of ['light', 'dark'].entries()) {
    assert.ok(logos[index].includes(`hr-chrome__logo--${theme}`));
    assert.ok(logos[index].includes('alt=""'));
    assert.ok(logos[index].includes('width="64" height="44"'));
    const source = logos[index].match(/src="([^"]*)"/)?.[1].replace(/&#39;/g, "'").replace(/&amp;/g, '&');
    assert.equal(source, sources[index]);
  }
  assert.ok(!html.includes('<script'));
  for (const tag of html.matchAll(/<svg[^>]*>/g)) assert.equal((tag[0].match(/class=/g) || []).length, 1);
});

test('brand variants and favicon are self-contained vector SVGs', () => {
  for (const source of [BRAND_LOGO_DATA_URL, BRAND_LOGO_LIGHT_DATA_URL, BRAND_LOGO_DARK_DATA_URL, BRAND_FAVICON_DATA_URL]) {
    assert.match(source, /^data:image\/svg\+xml[,;]/);
    const svg = decodeURIComponent(source.slice(source.indexOf(',') + 1));
    assert.match(svg, /<svg\b[^>]*\bviewBox=/);
    assert.doesNotMatch(svg, /<(?:image|foreignObject|script)\b/i);
    assert.doesNotMatch(svg, /(?:xlink:)?href\s*=\s*["'](?!#)/i);
    assert.doesNotMatch(svg, /url\(\s*["']?(?!#)[^\s)"']/i);
  }
  assert.notEqual(BRAND_LOGO_LIGHT_DATA_URL, BRAND_LOGO_DARK_DATA_URL);
});

test('the shared footer exposes only the requested contact and filing links', () => {
  const html = renderFooter();
  assert.equal((html.match(/<a /g) || []).length, 2);
  assert.ok(html.includes('href="mailto:herong2023@qq.com"'));
  assert.ok(html.includes('href="https://beian.miit.gov.cn/"'));
  assert.ok(html.includes('湘ICP备2024071383号-6'));
  assert.ok(!html.includes('RSS'));
});

test('canonical theme preference wins over legacy values, including explicit system mode', () => {
  const b = browser({ values: { 'herong-theme': 'auto', 'vitepress-theme-appearance': 'light' }, dark: true });
  const theme = bootstrapTheme(b.document, b.window);
  assert.equal(theme.getPreference(), 'auto');
  assert.equal(b.root.dataset.theme, 'dark');
  assert.ok(b.root.classList.contains('dark'));
  b.media.matches = false; theme.sync();
  assert.equal(b.root.dataset.theme, 'light');
  theme.set('dark');
  for (const key of theme.keys) assert.equal(b.storage.get(key), 'dark');
  b.media.matches = false; theme.sync();
  assert.equal(b.root.dataset.theme, 'dark');
});

test('legacy theme recovery and first-paint script use the same behavior', () => {
  const b = browser({ values: { 'dev-guides-theme': 'dark' } });
  vm.runInNewContext(themeBootstrapScript, { document: b.document, window: b.window });
  assert.equal(b.root.dataset.theme, 'dark');
  assert.equal(b.root.dataset.hrThemePreference, 'dark');
  const recovered = bootstrapTheme(b.document, b.window);
  assert.equal(recovered.getPreference(), 'dark');
});

test('explicit first-paint themes override the opposite system theme', () => {
  for (const preference of ['light', 'dark']) {
    const b = browser({ values: { 'herong-theme': preference }, dark: preference === 'light' });
    vm.runInNewContext(themeBootstrapScript, { document: b.document, window: b.window });
    assert.equal(b.root.dataset.theme, preference);
    assert.equal(b.root.classList.contains('dark'), preference === 'dark');
  }
});

test('blocked persistence keeps the selected theme usable for the current visit', () => {
  const b = browser({ blocked: true, dark: false });
  const cleanup = initSiteChrome(b.document);
  b.document.emit('click', { target: b.target('toggle') });
  assert.equal(b.root.dataset.theme, 'dark');
  assert.equal(b.root.dataset.hrThemeSaved, 'false');
  assert.ok(b.status.textContent.includes('未能保存'));
  b.media.matches = false; b.media.emit('change');
  assert.equal(b.root.dataset.theme, 'dark');
  cleanup();
  initSiteChrome(b.document)();
  assert.equal(b.root.dataset.theme, 'dark');
});

test('progressive controls are idempotent, clean up listeners, and can be remounted', () => {
  const b = browser();
  const cleanup = initSiteChrome(b.document);
  assert.equal(initSiteChrome(b.document), cleanup);
  assert.equal(b.document.events.get('click').size, 1);
  b.document.emit('click', { target: b.target('toggle') });
  assert.equal(b.root.dataset.theme, 'dark');
  assert.equal(b.toggle.attrs['aria-pressed'], 'true');
  cleanup(); cleanup();
  assert.equal(b.document.events.get('click').size, 0);
  assert.equal(b.window.events.get('storage').size, 0);
  assert.equal(b.media.events.get('change').size, 0);
  const remount = initSiteChrome(b.document);
  b.document.emit('click', { target: b.target('toggle') });
  assert.equal(b.root.dataset.theme, 'light');
  remount();
});

test('system reset, browser storage changes, and cleared preferences update all theme surfaces', () => {
  const b = browser({ values: { 'herong-theme': 'dark' }, dark: false });
  const cleanup = initSiteChrome(b.document);
  b.document.emit('click', { target: b.target('system') });
  assert.equal(b.root.dataset.hrThemePreference, 'auto');
  assert.equal(b.root.dataset.theme, 'light');
  assert.equal(b.system.attrs['aria-pressed'], 'true');
  b.media.matches = true; b.media.emit('change');
  assert.equal(b.root.dataset.theme, 'dark');
  b.storage.set('herong-theme', 'light'); b.window.emit('storage', { key: 'herong-theme' });
  assert.equal(b.root.dataset.theme, 'light');
  b.storage.clear(); b.window.emit('storage', { key: null });
  assert.equal(b.root.dataset.theme, 'dark');
  assert.equal(b.root.dataset.hrThemePreference, 'auto');
  cleanup();
});

test('mobile navigation closes on escape, on navigation, and on outside click', () => {
  const b = browser(); const cleanup = initSiteChrome(b.document);
  b.menu.open = true; b.document.emit('keydown', { key: 'Escape' });
  assert.equal(b.menu.open, false); assert.equal(b.focusCount(), 1);
  b.menu.open = true; b.document.emit('click', { target: b.target('nav') });
  assert.equal(b.menu.open, false);
  b.menu.open = true; b.document.emit('click', { target: b.target('outside') });
  assert.equal(b.menu.open, false);
  cleanup();
});
