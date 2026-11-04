import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile, readdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';
import { validateShowcase } from '../runtime/media-showcase.js';
import { execFileSync } from 'node:child_process';

const root = fileURLToPath(new URL('../', import.meta.url));
execFileSync(process.execPath, [resolve(root, 'scripts/generate-icons.mjs'), '--check'], { stdio: 'inherit' });
const read = path => readFile(resolve(root, path));
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const sources = JSON.parse(await read('sources.json'));
const stage = JSON.parse(await read('stage.json'));
validateShowcase({ ...stage.showcase, assetBase: stage.assetBase });
const files = ['app.js', 'favicon.svg', 'index.html', 'showcase.css', 'sources.json', 'stage.css', 'stage.json'];
for (const directory of ['assets', 'runtime']) {
  for (const entry of await readdir(resolve(root, directory), { withFileTypes: true })) {
    assert(entry.isFile(), `Unexpected non-file: ${directory}/${entry.name}`);
    files.push(`${directory}/${entry.name}`);
  }
}
files.sort();
const known = new Set(files);
const sourcePaths = sources.resources.map(resource => resource.path).sort();
assert.deepEqual(sourcePaths, files.filter(path => path.startsWith('assets/')));
for (const source of sources.resources) {
  const bytes = await read(source.path);
  assert.equal(bytes.length, source.bytes, `Source byte count: ${source.path}`);
  assert.equal(hash(bytes), source.sha256, `Source hash: ${source.path}`);
  assert.equal(new URL(source.url).protocol, 'https:');
}
for (const layer of [...stage.backdrop, ...stage.layers]) assert(known.has(layer.src), `Missing layer: ${layer.src}`);
for (const project of stage.showcase.projects) {
  if (project.cover) assert(known.has(project.cover), `Missing cover: ${project.cover}`);
  if (project.reference) {
    assert.equal(project.reference.url, `https://easyv.cloud/m/market/${project.id.replace(/^easyv-/, '')}.html`);
    assert.equal(project.reference.label, 'EasyV');
    assert(!project.role && !project.href, `Reference cannot claim own responsibilities/demo: ${project.id}`);
  }
}
const references = stage.showcase.projects.filter(project => project.reference);
assert.equal(references.length, 18);
assert.equal(stage.showcase.projects.find(project => project.id === 'sampling-station')?.href, 'https://herong.info/projects/enterprise/sampling-station/');
const html = (await read('index.html')).toString();
assert.match(html, /rel="icon" type="image\/svg\+xml" href="\.\/favicon\.svg"/);
for (const path of files.filter(path => /\.(?:html|css|m?js)$/.test(path))) {
  const text = (await read(path)).toString();
  const links = [...text.matchAll(/(?:src|href)=["'](\.\/[^"']+)["']|(?:from\s*|import\(|fetch\()["'](\.\/[^"']+)["']|url\(["']?(assets\/[^)'"\s]+)/g)];
  for (const match of links) {
    const target = (match[1] || match[2] || match[3]).split(/[?#]/)[0];
    const relative = resolve(root, dirname(path), target).slice(root.length);
    assert(known.has(relative), `Missing reference from ${path}: ${target}`);
  }
}
const expected = await Promise.all(files.map(async path => ({ path, sha256: hash(await read(path)) })));
if (process.argv.includes('--write-manifest')) await writeFile(resolve(root, 'manifest.json'), `${JSON.stringify(expected, null, 2)}\n`);
assert.deepEqual(JSON.parse(await read('manifest.json')), expected, 'Manifest stale: review changes, then run with --write-manifest');
console.log(`Enterprise assets passed: ${expected.length} runtime files, ${sourcePaths.length} original media hashes, ${references.length} attributed references, local links and SVG favicon.`);
