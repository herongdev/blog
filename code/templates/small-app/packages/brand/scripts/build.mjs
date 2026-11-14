import { readFile, writeFile } from 'node:fs/promises';

const product = JSON.parse(await readFile(new URL(import.meta.resolve('@app/config/product.json')), 'utf8'));
const colors = [product.brand?.lightAccent, product.brand?.darkAccent];
if (colors.some((color) => typeof color !== 'string' || !/^#[a-f0-9]{6}$/i.test(color))) {
  throw new Error('Product brand colors must use the #RRGGBB format.');
}
function luminance(hex) {
  const rgb = [1, 3, 5].map((offset) => parseInt(hex.slice(offset, offset + 2), 16) / 255)
    .map((value) => value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4);
  return rgb[0] * .2126 + rgb[1] * .7152 + rgb[2] * .0722;
}
function foreground(hex) {
  const value = luminance(hex);
  return (value + .05) / .05 > 1.05 / (value + .05) ? '#000000' : '#FFFFFF';
}
function hoverColor(hex, target) {
  return `#${[1, 3, 5].map((offset) => Math.round(parseInt(hex.slice(offset, offset + 2), 16) * .85 + target * .15).toString(16).padStart(2, '0')).join('')}`;
}
const [light, dark] = colors;
const lightHover = hoverColor(light, 0);
const darkHover = hoverColor(dark, 255);
const content = `/* Generated from @app/config/product.json by @app/brand. */
@import "@herongxhr/design-tokens/tokens.css";

:root {
  color-scheme: light dark;
  --hr-ui-color-accent: light-dark(${light}, ${dark});
  --hr-ui-color-accent-hover: light-dark(${lightHover}, ${darkHover});
  --hr-ui-color-on-accent: light-dark(${foreground(light)}, ${foreground(dark)});
  --app-color-on-accent-hover: light-dark(${foreground(lightHover)}, ${foreground(darkHover)});
  --hr-ui-color-accent-soft: light-dark(color-mix(in srgb, ${light} 10%, white), color-mix(in srgb, ${dark} 15%, #18181b));
  --hr-ui-color-focus: var(--hr-ui-color-accent);
}
:root[data-theme="light"] { color-scheme: light; }
:root[data-theme="dark"] { color-scheme: dark; }
`;
const output = new URL('../theme.css', import.meta.url);
if (process.argv.includes('--check')) {
  const actual = await readFile(output, 'utf8').catch(() => '');
  if (actual !== content) {
    throw new Error('Brand styles are out of date. Run pnpm --filter @app/brand build.');
  }
} else {
  await writeFile(output, content);
}
