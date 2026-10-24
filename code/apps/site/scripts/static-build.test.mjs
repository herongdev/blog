import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { articlePath, pageUrl, siteRoot } from '../../blog/scripts/site-urls.mjs'
import { canonicalForRoute, mergeStatic } from './merge-static.mjs'
import { verifyStatic } from './verify-static.mjs'
import { siteRoutes } from './route-policy.mjs'

test('canonical and RSS roots accept old CI config without repeating base', () => {
  assert.equal(siteRoot('https://herongdev.github.io/blog', '/blog/'), 'https://herongdev.github.io/blog/')
  assert.equal(pageUrl('posts/中文/a b.md', 'https://herong.info', '/'), 'https://herong.info/posts/%E4%B8%AD%E6%96%87/a%20b')
  assert.equal(pageUrl('posts/中文/index.md', 'https://101.96.210.172', '/site-preview/'), 'https://101.96.210.172/site-preview/posts/%E4%B8%AD%E6%96%87/')
  assert.equal(articlePath('posts/100%.md'), '/posts/100%25')
  assert.equal(canonicalForRoute('/posts/a + b, c & d', 'https://herong.info/'), pageUrl('posts/a + b, c & d.md', 'https://herong.info', '/'))
  assert.throws(() => siteRoot('https://herongdev.github.io/blog', '/preview/'), /conflicts/)
})

async function fixture(t) {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'herong-static-test-'))
  t.after(() => fs.rm(root, { recursive: true, force: true }))
  const site = path.join(root, 'site')
  const legacy = path.join(root, 'legacy')
  const out = path.join(root, 'bundle')
  async function write(dir, file, value) {
    await fs.mkdir(path.dirname(path.join(dir, file)), { recursive: true })
    await fs.writeFile(path.join(dir, file), value)
  }
  const urlRoot = 'https://herong.info/site-preview/'
  const html = (route, text) => `<meta name="generator" content="VitePress v1.6.4"><link rel="canonical" href="${new URL(route.replace(/^\//, ''), urlRoot).href}"><link rel="icon" href="/site-preview/logo.png"><h1>${text}</h1>`
  for (const route of siteRoutes) {
    await write(site, route === '/' ? 'index.html' : route.endsWith('/') ? `${route.slice(1)}index.html` : `${route.slice(1)}.html`, html(route, route))
  }
  const sitemap = (urls) => `<urlset>${urls.map((url) => `<url><loc>${url}</loc></url>`).join('')}</urlset>`
  await write(site, 'sitemap.xml', sitemap([...siteRoutes].filter((route) => route !== '/404').map((route) => `${urlRoot}${route.slice(1)}`)))
  await write(site, 'robots.txt', 'Disallow: /')
  await write(site, 'logo.png', 'same-logo')
  await write(legacy, 'logo.png', 'same-logo')
  await write(legacy, 'index.html', 'old homepage')
  await write(legacy, 'projects/ai-chat.html', 'old project')
  await write(legacy, 'posts/index.html', html('/posts/', 'Archive'))
  await write(legacy, 'posts/中文.html', html('/posts/中文', '中文'))
  await write(legacy, 'assets/legacy.js', 'article runtime')
  for (const feed of ['rss.xml', 'atom.xml', 'feed.json']) await write(legacy, feed, `${urlRoot}posts/中文`)
  await write(legacy, 'sitemap.xml', sitemap([`${urlRoot}posts/`, `${urlRoot}posts/%E4%B8%AD%E6%96%87`, urlRoot, `${urlRoot}projects/ai-chat`]))
  return { site, legacy, out, base: '/site-preview/', siteUrl: 'https://herong.info', write }
}

test('merge preserves archive and assets, explicit Astro ownership and redirects win', async (t) => {
  const input = await fixture(t)
  const manifest = await mergeStatic(input)
  assert((await fs.readFile(path.join(input.out, 'index.html'), 'utf8')).includes('<h1>/</h1>'))
  assert.equal(await fs.readFile(path.join(input.out, 'assets/legacy.js'), 'utf8'), 'article runtime')
  await assert.rejects(fs.stat(path.join(input.out, 'projects/ai-chat.html')), { code: 'ENOENT' })
  assert.equal(manifest.counts.legacyHtml, 2)
  assert.equal(manifest.redirects['/projects/ai-chat'], '/projects/ai-agent/ai-chat/')
  const sitemap = await fs.readFile(path.join(input.out, 'sitemap.xml'), 'utf8')
  assert.equal((sitemap.match(/<loc>/g) || []).length, manifest.counts.sitemap)
  assert(!sitemap.includes('projects/ai-chat<'))
  assert(sitemap.includes('posts/%E4%B8%AD%E6%96%87'))
  // Existing output is replaced only after a successful second merge.
  await input.write(input.legacy, 'assets/future.js', 'next')
  await mergeStatic(input)
  assert.equal(await fs.readFile(path.join(input.out, 'assets/future.js'), 'utf8'), 'next')
})

test('unassigned duplicate never overwrites existing output', async (t) => {
  const input = await fixture(t)
  await mergeStatic(input)
  await input.write(input.site, 'assets/legacy.js', 'different runtime')
  await assert.rejects(mergeStatic(input), /duplicate static file/)
  assert.equal(await fs.readFile(path.join(input.out, 'assets/legacy.js'), 'utf8'), 'article runtime')
})

test('new HTML needs explicit ownership and unknown legacy projects fail', async (t) => {
  const input = await fixture(t)
  await input.write(input.site, 'unreviewed/index.html', 'new')
  await assert.rejects(mergeStatic(input), /Unassigned Astro route/)
  await fs.rm(path.join(input.site, 'unreviewed'), { recursive: true })
  await input.write(input.legacy, 'projects/unknown.html', 'old')
  await assert.rejects(mergeStatic(input), /Unassigned legacy project/)
})

test('protect inputs and reject symlinks and mismatched origins', async (t) => {
  const input = await fixture(t)
  await assert.rejects(mergeStatic({ ...input, out: input.site }), /separate/)
  await assert.rejects(mergeStatic({ ...input, out: path.dirname(input.site) }), /separate/)
  await fs.symlink(path.join(input.legacy, 'logo.png'), path.join(input.legacy, 'unsafe.png'))
  await assert.rejects(mergeStatic(input), /Symlink/)
  await fs.rm(path.join(input.legacy, 'unsafe.png'))
  await assert.rejects(mergeStatic({ ...input, siteUrl: 'https://other.example' }), /Sitemap URL does not match/)
})

test('validation checks canonical URLs, sitemaps and local runtime assets', async (t) => {
  const input = await fixture(t)
  await mergeStatic(input)
  const result = await verifyStatic({ dir: input.out })
  assert.equal(result.canonicals, siteRoutes.size + 2)
  assert.equal(result.localAssetsChecked, 1)
  await fs.rm(path.join(input.out, 'logo.png'))
  await assert.rejects(verifyStatic({ dir: input.out }), /missing asset/)
})

test('validation rejects the historical all-pages-canonical-to-home bug', async (t) => {
  const input = await fixture(t)
  await mergeStatic(input)
  const article = path.join(input.out, 'posts/中文.html')
  const html = await fs.readFile(article, 'utf8')
  await fs.writeFile(article, html.replace('https://herong.info/site-preview/posts/%E4%B8%AD%E6%96%87', 'https://herong.info/site-preview/'))
  await assert.rejects(verifyStatic({ dir: input.out }), /canonical|duplicate canonical/)
})

test('noindex preview bundles keep their sitemap empty', async (t) => {
  const input = await fixture(t)
  const index = path.join(input.site, 'index.html')
  await fs.appendFile(index, '<meta name="robots" content="noindex, nofollow">')
  await input.write(input.site, 'sitemap.xml', '<urlset></urlset>')
  const manifest = await mergeStatic(input)
  assert.equal(manifest.indexingDisabled, true)
  const result = await verifyStatic({ dir: input.out })
  assert.equal(result.sitemap, 0)
})

test('double-quoted HTML attributes preserve apostrophes in real article paths', async (t) => {
  const input = await fixture(t)
  const filename = "posts/What's new Event('resize').html"
  const url = pageUrl(filename.replace(/\.html$/, '.md'), input.siteUrl, input.base)
  await input.write(input.legacy, filename, `<meta name="generator" content="VitePress v1.6.4"><link rel="canonical" href="${url}"><h1>Apostrophes</h1><img src="/site-preview/assets/icon's.svg" alt="example">`)
  await input.write(input.legacy, "assets/icon's.svg", '<svg xmlns="http://www.w3.org/2000/svg"/>')
  const sitemapFile = path.join(input.legacy, 'sitemap.xml')
  await fs.writeFile(sitemapFile, (await fs.readFile(sitemapFile, 'utf8')).replace('</urlset>', `<url><loc>${url}</loc></url></urlset>`))
  await mergeStatic(input)
  const result = await verifyStatic({ dir: input.out })
  assert.equal(result.canonicals, siteRoutes.size + 3)
  assert.equal(result.localAssetsChecked, 2)
})
