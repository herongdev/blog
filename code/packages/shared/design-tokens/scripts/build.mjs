import { readFile, writeFile } from 'node:fs/promises';

const source = new URL('../tokens.json', import.meta.url);
const output = new URL('../tokens.css', import.meta.url);
const { common, light, dark } = JSON.parse(await readFile(source, 'utf8'));
// A source token may refer to another shared token, never back to itself or an
// application alias. Reject cycles before CSS silently drops entire controls.
for (const theme of [light, dark]) {
  const values = { ...common, ...theme };
  const visited = new Set();
  const active = new Set();
  function visit(key) {
    if (active.has(key)) throw new Error(`Circular shared token reference: ${[...active, key].join(' -> ')}`);
    if (visited.has(key)) return;
    if (!(key in values)) throw new Error(`Unknown shared token reference: ${key}`);
    if (typeof values[key] !== 'string') throw new Error(`Token must be a string: ${key}`);
    active.add(key);
    for (const match of values[key].matchAll(/var\(\s*--hr-ui-([a-z0-9-]+)/g)) visit(match[1]);
    active.delete(key);
    visited.add(key);
  }
  for (const key of Object.keys(values)) visit(key);
}
const declarations = Object.entries(common).map(([key, value]) => `  --hr-ui-${key}: ${value};`);
for (const [key, value] of Object.entries(light)) {
  if (!(key in dark)) throw new Error(`Missing dark token: ${key}`);
  declarations.push(`  --hr-ui-${key}: light-dark(${value}, ${dark[key]});`);
}
if (Object.keys(dark).some((key) => !(key in light))) throw new Error('Light and dark token keys must match.');
// Applications own color-scheme and their brand adapters. Declaring defaults only
// at :root keeps overrides equally specific and avoids changing theme behavior.
const content = `/* Generated from @herongxhr/design-tokens/tokens.json. */\n:root {\n${declarations.join('\n')}\n}\n`;
if (process.argv.includes('--check')) {
  if (await readFile(output, 'utf8').catch(() => '') !== content) {
    throw new Error('Generated tokens.css is stale. Run the design-tokens build.');
  }
} else {
  await writeFile(output, content);
}
