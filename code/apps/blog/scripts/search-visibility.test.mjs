import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createMarkdownRenderer } from 'vitepress';
import { isPublicSearchMetadata, renderPublicSearchDocument } from './search-visibility.mjs';

test('both public search indexes reject nonpublic metadata at their source', () => {
  for (const metadata of [
    { draft: true }, { private: true }, { unlisted: true }, { noindex: true },
    { public: false }, { published: false }, { publish: false },
    { search: false }, { searchable: false }, { draft: 'yes' }, { search: '0' },
    { visibility: 'private' }, { visibility: 'unlisted' }, { status: 'draft' }, { status: 'lead' },
    { password: 'protected' }, { robots: 'NOINDEX, follow' }, { robots: ['follow', 'none'] },
    { head: [['meta', { name: 'robots', content: 'noindex,follow' }]] },
  ]) assert.equal(isPublicSearchMetadata(metadata), false, JSON.stringify(metadata));
  for (const metadata of [{}, { visibility: 'public' }, { status: 'published' }, { draft: false }, { search: true }]) {
    assert.equal(isPublicSearchMetadata(metadata), true);
  }
});

test('VitePress parses visibility before giving MiniSearch any private HTML', async () => {
  const root = fileURLToPath(new URL('../docs/', import.meta.url));
  const markdown = await createMarkdownRenderer(root, { html: false }, '/');
  for (const flag of ['draft: true', 'private: true', 'unlisted: true', 'noindex: true', 'search: false',
    'searchable: false', 'visibility: private', 'status: draft', "robots: 'noindex, follow'"]) {
    const env = { path: path.join(root, 'fixture.md'), relativePath: 'fixture.md', cleanUrls: true };
    const html = renderPublicSearchDocument(`---\n${flag}\n---\n# PRIVATE_SEARCH_SENTINEL\n\nPRIVATE_SEARCH_BODY`, env, markdown);
    assert.equal(html, '', flag);
    assert.ok(env.frontmatter, 'the real renderer must have populated metadata');
  }
  // Paths remain owned by VitePress: public directories and legitimate JS method
  // names are not silently treated as a draft just because they start with '_'.
  for (const relativePath of ['posts/index.md', 'about/index.md', 'posts/_render方法.md', 'posts/__proto__属性.md']) {
    const env = { path: path.join(root, relativePath), relativePath, cleanUrls: true };
    const html = renderPublicSearchDocument('# 公开页面\n\n公开的技术内容。', env, markdown);
    assert.match(html, /公开的技术内容/);
  }
});
