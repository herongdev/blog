import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';

const code = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = 'packages/site/chrome/src/brand.css';
const css = await fs.readFile(path.join(code, source), 'utf8');
const palette = new Map([...css.matchAll(/--hr-brand-([\w-]+):\s*light-dark\((#[\da-f]{6}),\s*(#[\da-f]{6})\)/gi)]
  .map(([, name, light, dark]) => [name, [light, dark]]));
function luminance(hex) {
  return hex.slice(1).match(/../g).map(x => parseInt(x, 16) / 255)
    .map(x => x <= .04045 ? x / 12.92 : ((x + .055) / 1.055) ** 2.4)
    .reduce((sum, x, i) => sum + x * [.2126, .7152, .0722][i], 0);
}
const results = [];
for (const [index, theme] of ['light', 'dark'].entries()) {
  for (const [foreground, background] of [
    ['primary', 'on-primary'], ['primary-hover', 'on-primary'],
    ['primary', 'canvas'], ['primary', 'surface'], ['primary', 'soft'],
    ['primary-hover', 'surface'], ['ink', 'canvas'], ['text', 'canvas'], ['muted', 'canvas'],
  ]) {
    assert.ok(palette.has(foreground) && palette.has(background), `Missing canonical palette role: ${foreground}/${background}`);
    const a = luminance(palette.get(foreground)[index]), b = luminance(palette.get(background)[index]);
    const ratio = (Math.max(a, b) + .05) / (Math.min(a, b) + .05);
    assert.ok(ratio >= 4.5, `${theme} ${foreground}/${background}: ${ratio.toFixed(2)} < 4.5`);
    results.push({ theme, foreground, background, ratio: Number(ratio.toFixed(2)) });
  }
}
const contracts = {
  'packages/site/chrome/src/styles.css': ['hr-chrome-accent'],
  'apps/site/src/styles/site.css': ['home-accent'],
  'apps/dev-guides/src/styles/tokens.css': ['color-accent', 'color-accent-strong', 'color-action', 'color-text-on-action', 'focus-ring'],
  'apps/light-tools/web/src/app/globals.css': ['color-primary', 'color-primary-hover', 'color-primary-foreground', 'color-accent', 'color-accent-soft', 'color-accent-border', 'shadow-focus'],
  'apps/blog/docs/.vitepress/theme/site-chrome.css': ['vp-c-brand-1', 'vp-c-brand-2', 'vp-c-brand-3', 'vp-c-brand-soft'],
};
for (const [file, roles] of Object.entries(contracts)) {
  const text = await fs.readFile(path.join(code, file), 'utf8');
  assert.doesNotMatch(text, /--hr-brand-[\w-]+\s*:/, `Canonical palette must not be redeclared in ${file}`);
  for (const role of roles) {
    const declarations = [...text.matchAll(new RegExp(`--${role}\\s*:\\s*([^;]+);`, 'g'))];
    assert.ok(declarations.length, `${file}: missing ${role}`);
    for (const [, value] of declarations) assert.match(value, /var\(--hr-brand-/, `${file}: ${role} must consume the canonical brand palette`);
  }
}
const chrome = await fs.readFile(path.join(code, 'packages/site/chrome/src/styles.css'), 'utf8');
const guides = await fs.readFile(path.join(code, 'apps/dev-guides/src/styles/tokens.css'), 'utf8');
assert.match(chrome, /@import ['"]\.\/brand\.css['"]/);
assert.match(guides, /@import ['"]@herong\/site-chrome\/brand\.css['"]/);
const chromePackage = JSON.parse(await fs.readFile(path.join(code, 'packages/site/chrome/package.json'), 'utf8'));
assert.equal(chromePackage.exports['./brand.css'], './src/brand.css');
console.log(JSON.stringify({ source, applications: Object.keys(contracts).length, contrastChecks: results }, null, 2));
