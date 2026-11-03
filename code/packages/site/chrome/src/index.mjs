import { icons, BRAND_LOGO_DATA_URL, BRAND_LOGO_LIGHT_DATA_URL, BRAND_LOGO_DARK_DATA_URL, BRAND_FAVICON_DATA_URL } from './assets.generated.mjs';
export { BRAND_LOGO_DATA_URL, BRAND_LOGO_LIGHT_DATA_URL, BRAND_LOGO_DARK_DATA_URL, BRAND_FAVICON_DATA_URL };
export { themeBootstrapScript } from './theme.mjs';

export const CONTACT_EMAIL = 'herong2023@qq.com';
export const BRAND_NAME = '何荣';
export const BRAND_DESCRIPTION = '工具与技术资料';
export const FILING_NUMBER = '湘ICP备2024071383号-6';
export const FILING_URL = 'https://beian.miit.gov.cn/';

const DEFAULT_HOME = 'https://herong.info/';
const DEFAULT_GUIDES = 'https://dev.herong.info/';
const DEFAULT_TOOLS = 'https://herong.info/file-tools';
const navigation = [
  ['tutorials', '教程'], ['articles', '文章'], ['tools', '工具'],
  ['apps', '应用'], ['projects', '作品'], ['about', '关于'],
];

const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);

function safeUrl(value, name, home = false) {
  if (typeof value !== 'string' || !value || /[\u0000-\u0020\u007f\\]/.test(value)) throw new TypeError(`Invalid ${name}`);
  const relative = value.startsWith('/') && !value.startsWith('//');
  if (!relative && !/^https?:\/\//i.test(value)) throw new TypeError(`${name} must be an HTTP(S) URL or root-relative path`);
  const parsed = new URL(value, 'https://chrome.invalid');
  if (!['http:', 'https:'].includes(parsed.protocol) || parsed.username || parsed.password) throw new TypeError(`Invalid ${name}`);
  if (home && (parsed.search || parsed.hash)) throw new TypeError(`${name} must not include a query or fragment`);
  if (home && !parsed.pathname.endsWith('/')) parsed.pathname += '/';
  return relative ? `${parsed.pathname}${parsed.search}${parsed.hash}` : parsed.href;
}

function urls(options = {}) {
  const home = safeUrl(options.homeUrl ?? DEFAULT_HOME, 'homeUrl', true);
  const child = (value) => home.startsWith('/') ? `${home}${value}` : new URL(value, home).href;
  return {
    home,
    tutorials: safeUrl(options.guidesUrl ?? DEFAULT_GUIDES, 'guidesUrl'),
    articles: child('posts/'),
    tools: safeUrl(options.toolsUrl ?? DEFAULT_TOOLS, 'toolsUrl'),
    apps: child('products/'), projects: child('projects/'), about: child('about/'),
  };
}

export function getNavigation(options = {}) {
  const targets = urls(options);
  return navigation.map(([id, label]) => ({ id, label, href: targets[id] }));
}

function icon(name, className = '') {
  return icons[name].replace(/class="([^"]*)"/, (_, original) => `class="${original} hr-chrome__icon ${className}"`);
}

function links(items, active) {
  return items.map(({ id, label, href }) => `<a href="${escapeHtml(href)}" data-hr-nav="${id}"${active === id ? ' aria-current="page"' : ''}>${label}</a>`).join('');
}

export function renderHeader(options = {}) {
  const targets = urls(options);
  const items = getNavigation(options);
  const htmlLinks = links(items, options.active);
  return `<header class="hr-chrome hr-chrome-header" data-hr-chrome-header>
  <div class="hr-chrome__container hr-chrome-header__inner">
    <a class="hr-chrome__brand" href="${escapeHtml(targets.home)}" aria-label="何荣首页"><img class="hr-chrome__logo hr-chrome__logo--light" src="${escapeHtml(BRAND_LOGO_LIGHT_DATA_URL)}" alt="" width="64" height="44"><img class="hr-chrome__logo hr-chrome__logo--dark" src="${escapeHtml(BRAND_LOGO_DARK_DATA_URL)}" alt="" width="64" height="44"><span class="hr-chrome__name">${BRAND_NAME}</span><span class="hr-chrome__edition">${BRAND_DESCRIPTION}</span></a>
    <nav class="hr-chrome__nav" aria-label="主导航">${htmlLinks}</nav>
    <div class="hr-chrome__controls">
      <button class="hr-chrome__button hr-chrome__theme" type="button" data-hr-theme-toggle aria-label="切换深浅色模式" aria-pressed="false">${icon('sun', 'hr-chrome__sun')}${icon('moon', 'hr-chrome__moon')}</button>
      <button class="hr-chrome__button hr-chrome__theme" type="button" data-hr-theme-system aria-label="跟随系统主题" aria-pressed="true" title="跟随系统主题">${icon('monitor')}</button>
      <span class="hr-chrome__sr-only" data-hr-theme-status role="status" aria-live="polite"></span>
      <details class="hr-chrome__menu" data-hr-menu><summary class="hr-chrome__button" aria-label="打开或关闭导航">${icon('menu', 'hr-chrome__menu-open')}${icon('x', 'hr-chrome__menu-close')}</summary><nav class="hr-chrome__mobile-nav" aria-label="移动端导航">${htmlLinks}</nav></details>
    </div>
  </div>
</header>`;
}

export function renderFooter() {
  return `<footer class="hr-chrome hr-chrome-footer"><div class="hr-chrome__container hr-chrome-footer__inner"><a class="hr-chrome-footer__contact" href="mailto:${CONTACT_EMAIL}">${icon('mail')}<span>联系我</span><span>${CONTACT_EMAIL}</span></a><a class="hr-chrome-footer__legal" href="${FILING_URL}" target="_blank" rel="noreferrer">${FILING_NUMBER}</a></div></footer>`;
}
