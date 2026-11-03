import { getNavigation } from '@herong/site-chrome';
export { CONTACT_EMAIL } from '@herong/site-chrome';
const env = (key, fallback = '') => process.env[key] || import.meta.env?.[key] || fallback;
const rawBase = env('PUBLIC_BASE_PATH', '/');
export const BASE_PATH = `/${rawBase.split('/').filter(Boolean).join('/')}${rawBase.split('/').filter(Boolean).length ? '/' : ''}`;
export const SITE_URL = env('PUBLIC_SITE_URL', 'https://herong.info').replace(/\/$/, '');
const site = new URL(SITE_URL);
export const NOINDEX = env('PUBLIC_NOINDEX') === 'true'
  || env('PUBLIC_DEPLOY_ENV', 'production') !== 'production'
  || site.protocol !== 'https:'
  || site.hostname === 'localhost'
  || /^(?:\d{1,3}\.){3}\d{1,3}$/.test(site.hostname)
  || site.hostname.includes(':');
export const GUIDES_URL = env('PUBLIC_GUIDES_URL', 'https://dev.herong.info/');
export const TOOLS_URL = env('PUBLIC_TOOLS_URL', 'https://herong.info/file-tools');
export const TUTORIAL_SEARCH_URL = env('PUBLIC_TUTORIAL_SEARCH_URL', 'https://dev.herong.info/search/published.json');
export const localUrl = (path = '/') => `${BASE_PATH}${path.replace(/^\/+/, '')}`;
export const canonicalUrl = (path = '/') => new URL(localUrl(path), `${SITE_URL}/`).href;
export const contentUrl = (href) => /^https?:\/\//.test(href) ? href : localUrl(href);
export const navigation = getNavigation({ homeUrl: localUrl('/'), guidesUrl: GUIDES_URL, toolsUrl: TOOLS_URL });
// Products remain independently hosted. Keep their verified entry points in one place.
export const products = [
  { id: 'aurumchart', title: 'AurumChart', description: '跨端交易图表 SDK，覆盖 K 线、技术指标、实时行情与端侧交互。', href: 'https://aurumchart.com/', status: '产品站已上线', projectPath: '/projects/finance/aurumchart/' },
  { id: 'shopthrive', title: 'ShopThrive 商通', description: '面向独立商家和小团队的微信小程序经营系统，连接商品展示、下单、订单处理与履约。', href: 'https://shopthrive.cn/', status: '产品站已上线', projectPath: '/projects/fullstack/shopthrive/' },
];
