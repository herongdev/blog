import { Feed } from 'feed'
import fg from 'fast-glob'
import fs from 'node:fs/promises'
import matter from 'gray-matter'

const SITE_URL = process.env.SITE_URL || 'https://example.com'
const OUT_DIR = new URL('../docs/.vitepress/dist', import.meta.url)

function toArticleUrl(file) {
  const rel = file.replace(/^docs\//, '').replace(/index\.md$/, '').replace(/\.md$/, '')
  return `${SITE_URL}/${rel}`
}

async function main() {
  const feed = new Feed({
    title: '我的博客',
    description: '个人博客 RSS',
    id: SITE_URL,
    link: SITE_URL,
    language: 'zh-CN',
    favicon: `${SITE_URL}/favicon.ico`,
    updated: new Date(),
    feedLinks: {
      atom: `${SITE_URL}/atom.xml`,
      rss: `${SITE_URL}/rss.xml`,
      json: `${SITE_URL}/feed.json`,
    },
  })

  const files = await fg(['docs/**/*.md', '!docs/**/index.md', '!docs/**/_*.md'])
  for (const file of files) {
    const raw = await fs.readFile(file, 'utf8')
    const { data, content } = matter(raw)
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
  await fs.writeFile(new URL('rss.xml', OUT_DIR), feed.rss2(), 'utf8')
  await fs.writeFile(new URL('atom.xml', OUT_DIR), feed.atom1(), 'utf8')
  await fs.writeFile(new URL('feed.json', OUT_DIR), feed.json1(), 'utf8')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})


