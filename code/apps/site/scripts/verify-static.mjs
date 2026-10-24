import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { canonicalForRoute, parseArgs, routeForUrl } from './merge-static.mjs'
import { siteRoot } from '../../blog/scripts/site-urls.mjs'
import { independentAppRoutes, siteRoutes } from './route-policy.mjs'

const decodeEntities = (value) => value.replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"')

async function exists(filename) {
  return fs.stat(filename).then((info) => info.isFile()).catch(() => false)
}

export async function verifyStatic({ dir, siteUrl, base }) {
  dir = path.resolve(dir)
  const manifest = JSON.parse(await fs.readFile(path.join(dir, 'route-manifest.json'), 'utf8'))
  const root = siteUrl || base ? siteRoot(siteUrl || manifest.siteRoot, base || manifest.base) : manifest.siteRoot
  if (root !== manifest.siteRoot) throw new Error(`Manifest site root ${manifest.siteRoot} differs from ${root}`)
  const rootUrl = new URL(root)
  const problems = []
  const canonicalUrls = new Set()
  const articleSamples = new Map()
  let canonicalCount = 0
  let legacyWithoutH1 = 0
  let noindexPages = 0
  for (const route of manifest.routes) {
    const filename = path.join(dir, route.file)
    const html = await fs.readFile(filename, 'utf8')
    const canonicalTags = [...html.matchAll(/<link\b[^>]*\brel=["']canonical["'][^>]*>/gi)]
    // An original downloadable HTML code sample is a static asset, not an article.
    const isPage = route.owner === 'site' || /__VP_(?:SITE_DATA|HASH_MAP)__|name="generator" content="VitePress/.test(html)
    if (isPage) {
      if (canonicalTags.length !== 1) { problems.push(`${route.file}: expected exactly one canonical`); continue }
      const canonical = decodeEntities(canonicalTags[0][0].match(/\bhref=(["'])(.*?)\1/i)?.[2] || '')
      const expected = canonicalForRoute(route.path, root)
      const valid404 = route.path === '/404' && [expected, `${expected}/`, `${expected}.html`].includes(canonical)
      if (canonical !== expected && !valid404) problems.push(`${route.file}: canonical ${canonical} != ${expected}`)
      if (canonicalUrls.has(canonical)) problems.push(`${route.file}: duplicate canonical ${canonical}`)
      canonicalUrls.add(canonical)
      canonicalCount++
      if (route.path !== '/404' && !/<h1\b[\s>]/i.test(html)) {
        if (route.owner === 'site') problems.push(`${route.file}: missing H1 in initial HTML`)
        else legacyWithoutH1++ // Preserve historical authoring instead of changing article content.
      }
      if (/<meta\b[^>]*\bname=["']robots["'][^>]*\bcontent=["'][^"']*noindex/i.test(html)) noindexPages++
    }
    if (route.owner === 'legacy' && route.path.startsWith('/posts/') && isPage) {
      const group = route.path.split('/')[2] || 'index'
      if (!articleSamples.has(group)) articleSamples.set(group, route)
    }
  }

  const sitePages = manifest.routes.filter((route) => route.owner === 'site' && route.path !== '/404')
  const samples = [...sitePages, ...articleSamples.values()]
  const checkedResources = new Set()
  const checkedLinks = new Set()
  async function checkLocalUrl(raw, source, kind) {
    if (!raw || raw.startsWith('#') || /^(?:mailto:|tel:|data:|javascript:)/i.test(raw)) return
    let target
    try { target = new URL(decodeEntities(raw), new URL(source.path.replace(/^\//, ''), root)) } catch { problems.push(`${source.file}: invalid URL ${raw}`); return }
    if (target.origin !== rootUrl.origin) return
    const route = routeForUrl(target, root)
    if (route === null) return // sibling applications on the same host have independent deployment.
    const key = `${kind}:${target.pathname}`
    if (checkedLinks.has(key)) return
    checkedLinks.add(key)
    const local = route.replace(/^\//, '')
    if (local.split('/').some((part) => part === '..') || local.includes('\\')) { problems.push(`${source.file}: unsafe URL ${raw}`); return }
    if (kind === 'asset') {
      checkedResources.add(target.pathname)
      if (!await exists(path.join(dir, local))) problems.push(`${source.file}: missing asset ${raw}`)
    } else {
      if (independentAppRoutes.some((prefix) => route === prefix || route.startsWith(`${prefix}/`))) return
      const alias = route.endsWith('.html') ? route.slice(0, -5) : route
      if (manifest.redirects[alias] || manifest.redirects[`${alias.replace(/\/$/, '')}/`]) return
      const candidates = local.endsWith('/') || local === '' ? [path.join(local, 'index.html')] : [local, `${local}.html`, path.join(local, 'index.html')]
      if (!(await Promise.all(candidates.map((candidate) => exists(path.join(dir, candidate))))).some(Boolean)) {
        // Existing archive content contains historical links to unpublished pages;
        // every new portfolio link and archive runtime asset must resolve.
        if (source.owner === 'site') problems.push(`${source.file}: missing internal link ${raw}`)
      }
    }
  }
  for (const route of samples) {
    const html = await fs.readFile(path.join(dir, route.file), 'utf8')
    for (const match of html.matchAll(/<(script|img|source|link|a)\b([^>]*)>/gi)) {
      const tag = match[1].toLowerCase()
      const attrs = match[2]
      if (tag === 'link' && !/\brel=["'](?:stylesheet|modulepreload|preload|icon|apple-touch-icon)["']/i.test(attrs)) continue
      const url = attrs.match(/\b(?:src|href)=(["'])(.*?)\1/i)?.[2]
      if (url) await checkLocalUrl(url, route, tag === 'a' ? 'page' : 'asset')
    }
  }
  const sitemap = await fs.readFile(path.join(dir, 'sitemap.xml'), 'utf8')
  const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => decodeEntities(match[1]))
  if (new Set(sitemapUrls).size !== sitemapUrls.length) problems.push('Duplicate sitemap URLs')
  for (const url of sitemapUrls) {
    if (!canonicalUrls.has(url)) problems.push(`Sitemap entry has no canonical HTML: ${url}`)
  }
  if (manifest.indexingDisabled && sitemapUrls.length) problems.push('Noindex build must have an empty sitemap')
  for (const route of manifest.indexingDisabled ? [] : siteRoutes) {
    if (route === '/404') continue
    const url = new URL(route.replace(/^\//, ''), root).href
    if (!sitemapUrls.includes(url)) problems.push(`Missing portfolio sitemap entry: ${url}`)
  }
  for (const file of ['rss.xml', 'atom.xml', 'feed.json']) {
    const feed = await fs.readFile(path.join(dir, file), 'utf8')
    if (!feed.includes(`${root}posts/`)) problems.push(`${file}: missing preserved article links for ${root}`)
    if (feed.includes('/blog/blog/')) problems.push(`${file}: duplicate GitHub Pages base`)
  }
  const health = JSON.parse(await fs.readFile(path.join(dir, '__site-health.json'), 'utf8'))
  if (health.status !== 'ok' || health.html !== manifest.routes.length) problems.push('Invalid health marker')
  if (problems.length) throw new Error(`Static validation failed (${problems.length}):\n${problems.slice(0, 40).join('\n')}`)
  return { html: manifest.routes.length, canonicals: canonicalCount, legacyWithoutH1, noindexPages, articleGroups: articleSamples.size, pagesSampled: samples.length, localAssetsChecked: checkedResources.size, sitemap: sitemapUrls.length, bytes: manifest.counts.bytes }
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const args = parseArgs(process.argv.slice(2))
  const dir = args.dir || path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../dist-bundle')
  console.log(`[verify-static] ${JSON.stringify(await verifyStatic({ dir, siteUrl: args['site-url'] || process.env.PUBLIC_SITE_URL, base: args.base || process.env.PUBLIC_BASE_PATH }))}`)
}
