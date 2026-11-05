const observationKeys = ['checkerResult', 'pageCount', 'pages', 'observationUnavailable'];
const pageFlags = ['hasSessionCookie', 'any_visible_login_marker', 'scan_confirmation_visible', 'visible_code_input', 'captcha_visible', 'creator_publish_control'];
const pageKeys = ['route', ...pageFlags];
const exactKeys = (value, keys) => value !== null && typeof value === 'object' && !Array.isArray(value) && Object.keys(value).length === keys.length && keys.every(key => Object.hasOwn(value, key));

// Store booleans and bounded classifications only. Invalid or additional fields reject the whole observation.
export function safeAuthObservation(value) {
  if (!exactKeys(value, observationKeys) || typeof value.checkerResult !== 'boolean' || typeof value.observationUnavailable !== 'boolean' || !Number.isInteger(value.pageCount) || value.pageCount < 0 || value.pageCount > 3 || !Array.isArray(value.pages) || value.pages.length !== value.pageCount || (value.observationUnavailable && value.pageCount !== 0)) return null;
  const pages = [];
  for (const page of value.pages) {
    if (!exactKeys(page, pageKeys) || !['creator_root', 'creator_micro', 'other'].includes(page.route) || !pageFlags.every(key => typeof page[key] === 'boolean')) return null;
    pages.push({ route: page.route, ...Object.fromEntries(pageFlags.map(key => [key, page[key]])) });
  }
  return { checkerResult: value.checkerResult, pageCount: value.pageCount, pages, observationUnavailable: value.observationUnavailable };
}
