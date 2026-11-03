// Local snapshot of the public tutorial source, using the production publication gate.
// Never read the separate author library or contact an administrator endpoint.
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { buildPublishedFeed } from '../../dev-guides/src/lib/published-search.mjs';

const app = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const matter = createRequire(path.resolve(app, '../blog/package.json'))('gray-matter');
const source = path.resolve(app, '../dev-guides/src/content/tutorials');
const entries = [];
for (const filename of (await fs.readdir(source)).filter((name) => name.endsWith('.md')).sort()) {
  const { data, content } = matter(await fs.readFile(path.join(source, filename), 'utf8'));
  entries.push({ id: filename.slice(0, -3), data, body: content });
}
const feed = buildPublishedFeed(entries, { origin: 'https://dev.herong.info', environment: 'production', base: '/' });
const destination = path.join(app, 'public/search-index/tutorials.json');
await fs.mkdir(path.dirname(destination), { recursive: true });
await fs.writeFile(destination, JSON.stringify(feed));
console.log(JSON.stringify({ publicSourceEntries: entries.length, published: feed.items.length, snapshot: destination }));
