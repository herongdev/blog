import fs from 'node:fs/promises'
import path from 'node:path'
import crypto from 'node:crypto'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { normalizeBase, siteRoot } from '../../blog/scripts/site-urls.mjs'
import { fileRoute, legacyHtmlOwner, legacyRedirects, siteRoutes } from './route-policy.mjs'

const appDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const generatedFiles = new Set(['sitemap.xml', 'route-manifest.json', '__site-health.json'])
const siteOwnedFiles = new Set(['robots.txt', 'sitemap-site.xml'])
const sharedFiles = new Set(['logo.png'])
const escapeXml = (value) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;')
const unescapeXml = (value) => value.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&quot;/g, '"')

export async function listFiles(dir, prefix = '') {
  const result = []
  for (const item of await fs.readdir(path.join(dir, prefix), { withFileTypes: true })) {
    const filename = prefix ? `${prefix}/${item.name}` : item.name
    if (item.isSymbolicLink()) throw new Error(`Symlink is not allowed in static input: ${filename}`)
    if (item.isDirectory()) result.push(...await listFiles(dir, filename))
    else if (item.isFile()) result.push(filename)
    else throw new Error(`Unsupported static input: ${filename}`)
  }
  return result.sort()
}

function isInside(parent, child) {
  const relative = path.relative(parent, child)
  return relative === '' || (!relative.startsWith(`..${path.sep}`) && relative !== '..' && !path.isAbsolute(relative))
}

export async function validatePaths(site, legacy, out) {
  for (const input of [site, legacy]) {
    const info = await fs.lstat(input)
    if (!info.isDirectory() || info.isSymbolicLink()) throw new Error(`Input must be a real directory: ${input}`)
    const realInput = await fs.realpath(input)
    const realParent = await fs.realpath(path.dirname(out))
    const realOut = path.join(realParent, path.basename(out))
    if (isInside(realInput, realOut) || isInside(realOut, realInput)) {
      throw new Error('Output must be separate from both inputs, never a parent or child')
    }
  }
  const output = await fs.lstat(out).catch((error) => error.code === 'ENOENT' ? null : Promise.reject(error))
  if (output && (!output.isDirectory() || output.isSymbolicLink())) throw new Error('Output must be a real directory')
}

async function sameFile(left, right) {
  const [a, b] = await Promise.all([fs.readFile(left), fs.readFile(right)])
  return a.equals(b)
}

export function routeForUrl(url, root) {
  const parsed = new URL(url)
  const site = new URL(root)
  if (parsed.origin !== site.origin || !parsed.pathname.startsWith(site.pathname)) return null
  return `/${decodeURIComponent(parsed.pathname.slice(site.pathname.length))}`
}

export function canonicalForRoute(route, root) {
  // Path punctuation (+, &, commas) must use the same encoding as legacy
  // PageData.relativePath canonical generation, rather than URL's loose parser.
  const encoded = route.replace(/^\//, '').split('/').map((segment) => encodeURIComponent(segment)).join('/')
  return new URL(encoded, root).href
}

async function sitemapUrls(dir, filenames) {
  const urls = new Set()
  const visited = new Set()
  async function read(filename) {
    if (visited.has(filename)) return
    visited.add(filename)
    const xml = await fs.readFile(path.join(dir, filename), 'utf8')
    if (/<sitemapindex\b/.test(xml)) {
      for (const match of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
        const pathname = decodeURIComponent(new URL(unescapeXml(match[1])).pathname)
        const child = filenames.find((candidate) => pathname.endsWith(`/${candidate}`))
        if (!child || !child.endsWith('.xml')) throw new Error(`Sitemap index points outside its build: ${pathname}`)
        await read(child)
      }
    } else {
      for (const match of xml.matchAll(/<url\b[^>]*>([\s\S]*?)<\/url>/g)) {
        const loc = match[1].match(/<loc>([^<]+)<\/loc>/)?.[1]
        if (loc) urls.add(unescapeXml(loc))
      }
    }
  }
  if (filenames.includes('sitemap.xml')) await read('sitemap.xml')
  else if (filenames.includes('sitemap-site.xml')) await read('sitemap-site.xml')
  else throw new Error(`Missing sitemap in ${dir}`)
  return urls
}

export async function mergeStatic({ site, legacy, out, base = '/', siteUrl = 'https://herong.info' }) {
  site = path.resolve(site)
  legacy = path.resolve(legacy)
  out = path.resolve(out)
  await validatePaths(site, legacy, out)
  const root = siteRoot(siteUrl, base)
  const [siteFiles, legacyFiles] = await Promise.all([listFiles(site), listFiles(legacy)])
  const plan = new Map()
  const skipped = []
  for (const filename of siteFiles) {
    if (generatedFiles.has(filename)) continue
    const route = fileRoute(filename)
    if (route && !siteRoutes.has(route)) throw new Error(`Unassigned Astro route: ${route}`)
    plan.set(filename, 'site')
  }
  for (const filename of legacyFiles) {
    if (generatedFiles.has(filename) || siteOwnedFiles.has(filename)) continue
    if (filename.endsWith('.html') && legacyHtmlOwner(filename) !== 'legacy') {
      skipped.push(filename)
      continue
    }
    if (plan.has(filename)) {
      if (!sharedFiles.has(filename) || !await sameFile(path.join(site, filename), path.join(legacy, filename))) {
        throw new Error(`Unassigned or different duplicate static file: ${filename}`)
      }
      continue
    }
    plan.set(filename, 'legacy')
  }
  const routes = []
  for (const [filename, owner] of plan) {
    const route = fileRoute(filename)
    if (route) routes.push({ path: route, file: filename, owner })
  }
  for (const route of siteRoutes) {
    if (!routes.some((entry) => entry.path === route && entry.owner === 'site')) throw new Error(`Missing required Astro route: ${route}`)
  }
  for (const required of ['rss.xml', 'atom.xml', 'feed.json', 'posts/index.html']) {
    if (!plan.has(required)) throw new Error(`Missing required legacy output: ${required}`)
  }
  const sitemap = new Set()
  const [newUrls, oldUrls] = await Promise.all([sitemapUrls(site, siteFiles), sitemapUrls(legacy, legacyFiles)])
  const indexingDisabled = newUrls.size === 0
  if (indexingDisabled) {
    const homepage = await fs.readFile(path.join(site, 'index.html'), 'utf8')
    if (!/<meta\b[^>]*\bname=["']robots["'][^>]*\bcontent=["'][^"']*noindex/i.test(homepage)) {
      throw new Error('Empty Astro sitemap is only valid for an explicitly noindex build')
    }
  }
  for (const [owner, urls] of [['site', newUrls], ['legacy', oldUrls]]) {
    for (const url of urls) {
      const route = routeForUrl(url, root)
      if (route === null) throw new Error(`Sitemap URL does not match configured site root ${root}: ${url}`)
      if (route === '/404') continue
      if (owner === 'legacy' && (siteRoutes.has(route) || legacyRedirects[route])) continue
      if (!routes.some((entry) => entry.path === route && entry.owner === owner)) throw new Error(`Sitemap URL has no ${owner} HTML: ${url}`)
      if (!indexingDisabled) sitemap.add(canonicalForRoute(route, root))
    }
  }
  const staging = await fs.mkdtemp(path.join(path.dirname(out), `.${path.basename(out)}.stage-`))
  const backup = `${staging}.previous`
  let backedUp = false
  try {
    let bytes = 0
    for (const [filename, owner] of plan) {
      const source = path.join(owner === 'site' ? site : legacy, filename)
      const destination = path.join(staging, filename)
      await fs.mkdir(path.dirname(destination), { recursive: true })
      await fs.copyFile(source, destination)
      bytes += (await fs.stat(source)).size
    }
    const manifest = {
      schema: 1, siteRoot: root, base: normalizeBase(base), indexingDisabled,
      routes, redirects: legacyRedirects, excludedLegacyPages: skipped,
      counts: { files: plan.size, html: routes.length, legacyHtml: routes.filter((route) => route.owner === 'legacy').length, sitemap: sitemap.size, bytes },
    }
    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[...sitemap].sort().map((url) => `<url><loc>${escapeXml(url)}</loc></url>`).join('\n')}\n</urlset>\n`
    await fs.writeFile(path.join(staging, 'sitemap.xml'), sitemapXml)
    await fs.writeFile(path.join(staging, 'route-manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`)
    await fs.writeFile(path.join(staging, '__site-health.json'), `${JSON.stringify({ status: 'ok', app: 'herong-site', schema: 1, buildId: crypto.createHash('sha256').update(JSON.stringify(manifest)).update(sitemapXml).digest('hex').slice(0, 16), ...manifest.counts })}\n`)
    try { await fs.rename(out, backup); backedUp = true } catch (error) { if (error.code !== 'ENOENT') throw error }
    try { await fs.rename(staging, out) } catch (error) { if (backedUp) await fs.rename(backup, out); throw error }
    if (backedUp) await fs.rm(backup, { recursive: true })
    return manifest
  } finally {
    await fs.rm(staging, { recursive: true, force: true })
  }
}

export function parseArgs(argv) {
  const args = {}
  for (let index = 0; index < argv.length; index += 2) {
    if (!['--site', '--legacy', '--out', '--base', '--site-url', '--dir'].includes(argv[index]) || !argv[index + 1]) throw new Error(`Unknown or incomplete argument: ${argv[index]}`)
    args[argv[index].slice(2)] = argv[index + 1]
  }
  return args
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const args = parseArgs(process.argv.slice(2))
  const manifest = await mergeStatic({
    site: args.site || path.join(appDir, 'dist'),
    legacy: args.legacy || path.join(appDir, '../blog/docs/.vitepress/dist-legacy'),
    out: args.out || path.join(appDir, 'dist-bundle'),
    base: args.base || process.env.PUBLIC_BASE_PATH || process.env.BASE || '/',
    siteUrl: args['site-url'] || process.env.PUBLIC_SITE_URL || process.env.SITE_URL || 'https://herong.info',
  })
  console.log(`[merge-static] ${JSON.stringify(manifest.counts)} root=${manifest.siteRoot}`)
}
