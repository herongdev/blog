import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const code = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const chrome = path.join(code, 'packages/site/chrome');
const assets = path.join(chrome, 'assets');
const check = process.argv.includes('--check');
const sourceFiles = [
  'herong-benrong-horizontal-purple.svg',
  'herong-benrong-horizontal-white.svg',
  'herong-benrong-stacked-purple.svg',
  'herong-benrong-stacked-white.svg',
];
const [light, dark, stackedLight, stackedDark] = await Promise.all(
  sourceFiles.map((name) => fs.readFile(path.join(chrome, 'brand', name), 'utf8')),
);
for (const svg of [light, dark, stackedLight, stackedDark]) {
  if (!/<svg\b[^>]*\bviewBox=/.test(svg) || !svg.includes('何荣本荣') || /<(?:image|script|foreignObject)\b|\bhref\s*=/i.test(svg)) {
    throw new Error('The brand sources must be self-contained 何荣本荣 SVGs.');
  }
}
const adaptive = (svg, darkSvg) => {
  const darkFill = darkSvg.match(/<path fill="(#[\da-f]{6})"/i)?.[1];
  if (!darkFill) throw new Error('The dark brand variant must define a solid path fill.');
  return svg.replace('<path', `<style>@media (prefers-color-scheme: dark) { path { fill: ${darkFill}; } }</style>\n<path`);
};
const master = adaptive(light, dark);
const icon = adaptive(stackedLight, stackedDark);
const vectors = new Map([
  ['logo-hr.svg', master], ['logo-hr-light.svg', light], ['logo-hr-dark.svg', dark], ['favicon.svg', icon],
]);
const outputs = new Map();
for (const [name, svg] of vectors) outputs.set(path.join(assets, name), Buffer.from(svg));
let png512, png180;
if (!check) {
  const require = createRequire(path.join(code, 'apps/dev-guides/package.json'));
  const sharp = require('sharp');
  const background = '#f3f3f1';
  const render = (size) => {
    const margin = Math.round(size * 0.1);
    const contentSize = size - 2 * margin;
    return sharp(Buffer.from(stackedLight))
      .resize(contentSize, contentSize, { fit: 'contain', background })
      .extend({ top: margin, right: margin, bottom: margin, left: margin, background })
      .flatten({ background }).png().toBuffer();
  };
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
outputs.set(path.join(code, 'apps/dev-guides/author/public/logo-stacked-light.svg'), Buffer.from(stackedLight));
outputs.set(path.join(code, 'apps/dev-guides/author/public/logo-stacked-dark.svg'), Buffer.from(stackedDark));
const hash = (bytes) => crypto.createHash('sha256').update(bytes).digest('hex');
const enterpriseDir = path.join(code, 'apps/enterprise-showcase');
const enterpriseManifestPath = path.join(enterpriseDir, 'manifest.json');
const enterpriseManifest = JSON.parse(await fs.readFile(enterpriseManifestPath, 'utf8'));
enterpriseManifest.find((file) => file.path === 'favicon.svg').sha256 = hash(icon);
outputs.set(path.join(enterpriseDir, 'favicon.svg'), Buffer.from(icon));
outputs.set(enterpriseManifestPath, Buffer.from(`${JSON.stringify(enterpriseManifest, null, 2)}\n`));
const manifest = {
  sources: Object.fromEntries(sourceFiles.map((name, index) => [
    `brand/${name}`, hash([light, dark, stackedLight, stackedDark][index]),
  ])),
  raster: { 'logo-hr.png': { size: 512, sha256: hash(png512) }, 'apple-touch-icon.png': { size: 180, sha256: hash(png180) } },
};
outputs.set(path.join(assets, 'brand-manifest.json'), Buffer.from(`${JSON.stringify(manifest, null, 2)}\n`));
const drift = [];
for (const [filename, bytes] of outputs) {
  if (check) {
    if (!(await fs.readFile(filename).catch(() => Buffer.alloc(0))).equals(bytes)) drift.push(path.relative(code, filename));
  } else {
    await fs.mkdir(path.dirname(filename), { recursive: true });
    await fs.writeFile(filename, bytes);
  }
}
if (drift.length) throw new Error(`Brand assets drifted; run pnpm run brand:generate:\n${drift.join('\n')}`);
console.log(`${check ? 'Verified' : 'Generated'} ${outputs.size} 何荣本荣 brand assets.`);
