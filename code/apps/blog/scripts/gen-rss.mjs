import { Feed } from 'feed'
import fg from 'fast-glob'
import fs from 'node:fs/promises'
import matter from 'gray-matter'
import path from 'node:path'
import { pageUrl, siteRoot } from './site-urls.mjs'

const SITE_URL = siteRoot(process.env.SITE_URL || 'https://herong.info', process.env.BASE || '/')
// 与 VitePress 使用同一 OUT_DIR，兼容默认、VPS 和 GitHub Pages 构建。
const OUT_DIR = path.resolve(
  process.cwd(),
  'docs',
  process.env.OUT_DIR || '.vitepress/dist',
)

function toArticleUrl(file) {
  return pageUrl(file.replace(/^docs\//, ''), SITE_URL, '/')
}

async function main() {
  const feed = new Feed({
    title: '我的技术分享',
    description: '个人技术分享 RSS',
    id: SITE_URL,
    link: SITE_URL,
    language: 'zh-CN',
    favicon: `${SITE_URL}logo.png`,
    updated: new Date(),
    feedLinks: {
      atom: `${SITE_URL}atom.xml`,
      rss: `${SITE_URL}rss.xml`,
      json: `${SITE_URL}feed.json`,
    },
  })

  const files = (await fg(['docs/posts/**/*.md', 'docs/vue-progress-scroll-tutorial.md', '!docs/**/index.md', '!docs/**/_*.md'])).sort()
  for (const file of files) {
    const raw = await fs.readFile(file, 'utf8')
    const { data, content } = matter(raw)
    if (data.feed === false) continue
    const url = toArticleUrl(file)
    feed.addItem({
      title: data.title || url,
      id: url,
      link: url,
      date: data.date ? new Date(data.date) : new Date(),
      description: data.description || '',
      content,
    })
  }

  await fs.mkdir(OUT_DIR, { recursive: true })
  await fs.writeFile(path.join(OUT_DIR, 'rss.xml'), feed.rss2(), 'utf8')
  await fs.writeFile(path.join(OUT_DIR, 'atom.xml'), feed.atom1(), 'utf8')
  await fs.writeFile(path.join(OUT_DIR, 'feed.json'), feed.json1(), 'utf8')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
