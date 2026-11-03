import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const code = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const project = path.dirname(code);
const assets = path.join(code, 'packages/site/chrome/assets');
const check = process.argv.includes('--check');
const exists = async (filename) => fs.access(filename).then(() => true, () => false);
const sourceInProject = path.join(project, 'logo.svg');
// Independent builds only contain code/. They consume the checked-in package copy.
const hasMaster = await exists(sourceInProject);
const master = await fs.readFile(hasMaster ? sourceInProject : path.join(assets, 'logo-hr.svg'), 'utf8');
if (!master.includes('data-brand="herong-hr-elephant"') || /<(?:image|script|foreignObject)\b/i.test(master)) {
  throw new Error('The brand master must be the self-contained HR elephant vector, not an embedded bitmap.');
}
const style = master.match(/<style>([\s\S]*?)<\/style>/)?.[1] || '';
const light = master.replace(/\s*<style>[\s\S]*?<\/style>/, '').replace('data-variant="adaptive"', 'data-variant="light"');
let dark = light.replace('data-variant="light"', 'data-variant="dark"');
for (const [, className, property, value] of style.matchAll(/\.([\w-]+)\s*\{\s*(stop-color|fill|stroke):\s*([^;]+);\s*\}/g)) {
  dark = dark.replace(/<(?:stop|path)\b[^>]*>/g, (tag) => {
    if (!tag.match(/class="([^"]*)"/)?.[1].split(/\s+/).includes(className)) return tag;
    return tag.replace(new RegExp(`${property}="[^"]*"`), `${property}="${value.trim()}"`);
  });
}
// At browser-tab size keep the silhouette and both letter counters, omit fine textile detail.
const icon = master.replace('data-variant="adaptive"', 'data-variant="icon"')
  .replace(/\s*<g class="hr-detail"[^>]*>[\s\S]*?<\/g>/g, '')
  .replace(/\s*<path\b[^>]*class="[^"]*(?:hr-detail|hr-relief)[^"]*"[^>]*\/>/g, '');
const vectors = new Map([
  ['logo-hr.svg', master], ['logo-hr-light.svg', light], ['logo-hr-dark.svg', dark], ['favicon.svg', icon],
]);
const outputs = new Map();
for (const [name, svg] of vectors) outputs.set(path.join(assets, name), Buffer.from(svg));
if (hasMaster) {
  outputs.set(path.join(project, 'logo-light.svg'), Buffer.from(light));
  outputs.set(path.join(project, 'logo-dark.svg'), Buffer.from(dark));
  outputs.set(path.join(project, 'logo-icon.svg'), Buffer.from(icon));
}
let png512, png180;
if (!check) {
  const require = createRequire(path.join(code, 'apps/dev-guides/package.json'));
  const sharp = require('sharp');
  const render = (size) => sharp(Buffer.from(light)).resize(size, size, {
    fit: 'contain', background: '#f3f3f1',
  }).flatten({ background: '#f3f3f1' }).png().toBuffer();
  [png512, png180] = await Promise.all([render(512), render(180)]);
} else {
  [png512, png180] = await Promise.all(['logo-hr.png', 'apple-touch-icon.png'].map((name) => fs.readFile(path.join(assets, name))));
}
outputs.set(path.join(assets, 'logo-hr.png'), png512);
outputs.set(path.join(assets, 'apple-touch-icon.png'), png180);
const publicDirs = ['apps/site/public', 'apps/blog/docs/public', 'apps/dev-guides/public', 'apps/dev-guides/author/public', 'apps/light-tools/web/public'];
for (const dir of publicDirs) {
  for (const [name, svg] of vectors) outputs.set(path.join(code, dir, name), Buffer.from(svg));
  outputs.set(path.join(code, dir, 'logo-hr.png'), png512);
  outputs.set(path.join(code, dir, 'apple-touch-icon.png'), png180);
}
outputs.set(path.join(code, 'apps/light-tools/web/src/app/icon.svg'), Buffer.from(icon));
outputs.set(path.join(code, 'apps/enterprise-showcase/favicon.svg'), Buffer.from(icon));
const hash = (bytes) => crypto.createHash('sha256').update(bytes).digest('hex');
const manifest = {
  source: 'logo.svg (repository root; packaged copy: assets/logo-hr.svg)',
  sourceSha256: hash(master),
  raster: { 'logo-hr.png': { size: 512, sha256: hash(png512) }, 'apple-touch-icon.png': { size: 180, sha256: hash(png180) } },
};
outputs.set(path.join(assets, 'brand-manifest.json'), Buffer.from(`${JSON.stringify(manifest, null, 2)}\n`));
const drift = [];
for (const [filename, bytes] of outputs) {
  if (check) {
    if (!(await fs.readFile(filename).catch(() => Buffer.alloc(0))).equals(bytes)) drift.push(path.relative(project, filename));
  } else {
    await fs.mkdir(path.dirname(filename), { recursive: true });
    await fs.writeFile(filename, bytes);
  }
}
if (drift.length) throw new Error(`Brand assets drifted; run pnpm run brand:generate:\n${drift.join('\n')}`);
console.log(`${check ? 'Verified' : 'Generated'} ${outputs.size} HR elephant brand assets; original logo.png files preserved.`);
