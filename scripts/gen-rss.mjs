import { Feed } from 'feed'
import fg from 'fast-glob'
import fs from 'node:fs/promises'
import matter from 'gray-matter'
import path from 'node:path'

const SITE_URL = process.env.SITE_URL || 'https://example.com'
// 输出到构建产物目录：docs/.vitepress/dist
const OUT_DIR = path.resolve(process.cwd(), 'docs/.vitepress/dist')

function toArticleUrl(file) {
  const rel = file.replace(/^docs\//, '').replace(/index\.md$/, '').replace(/\.md$/, '')
  return `${SITE_URL}/${rel}`
}

async function main() {
  const feed = new Feed({
    title: '我的技术分享',
    description: '个人技术分享 RSS',
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
  await fs.writeFile(path.join(OUT_DIR, 'rss.xml'), feed.rss2(), 'utf8')
  await fs.writeFile(path.join(OUT_DIR, 'atom.xml'), feed.atom1(), 'utf8')
  await fs.writeFile(path.join(OUT_DIR, 'feed.json'), feed.json1(), 'utf8')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})


