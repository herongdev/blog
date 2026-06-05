---
title: 网站 SEO 入门：收录、排名与上线检查清单
date: 2026-06-04
tags:
  - SEO
  - 搜索引擎
  - 站长工具
  - VitePress
categories:
  - 平台与博客
description: 从爬虫可发现、sitemap 提交、页面 meta 到结构化数据与国内备案，梳理网站被搜索引擎收录并提升排名的实操步骤。
---

你要做的事情可以分成两块：**先让搜索引擎能发现和收录你的页面，再让它觉得你的页面值得排在前面**。SEO 不是提交一下网址就结束，提交只能加快发现，不保证收录或排名；Google 和百度官方都明确说过类似意思。([Google for Developers][1])

- 确定要登录的搜索引擎
- 先添加网站
- 再证明网站是我们的
- 提交sitemap.xml：sitemap.xml的url不会变，只是内容会变，搜索引擎会定期根据这个内容来爬页面
- 再每次页面发生变化时，通过手动或api告诉搜索引擎，让他更新收录

## 1. 先确保页面“能被爬虫看到”

先检查这些基础项：

```txt
https://你的域名/
https://你的域名/robots.txt
https://你的域名/sitemap.xml
```

你的页面最好满足：

- 页面公开访问，不需要登录。
- 服务端返回状态码是 `200`，不要是 `403`、`404`、`500`。
- 不要在 `robots.txt` 里误写 `Disallow: /`。
- 页面里不要有 `noindex`。
- 主要内容尽量直接出现在 HTML 里，不要完全依赖前端 JS 异步渲染。

如果你做的是 React/Vue 单页应用，建议重要页面用 **SSR/SSG/预渲染**，比如 Next.js、Nuxt、Astro、Vite SSG。Google 可以处理 JavaScript，但它的流程包括抓取、渲染、索引；对 SEO 来说，把核心内容直接输出到 HTML 通常更稳。([Google for Developers][2])

## 2. 做 `robots.txt` 和 `sitemap.xml`

`robots.txt` 用来告诉爬虫哪些路径可以抓、哪些不抓；它不是用来防止页面出现在搜索结果里的，真不想被索引要用 `noindex` 或权限保护。([Google for Developers][3])

可以先这样放：

```txt
User-agent: *
Allow: /

Sitemap: https://你的域名/sitemap.xml
```

`sitemap.xml` 用来列出你希望搜索引擎发现的重要页面。Google 说明 sitemap 能帮助搜索引擎更高效地抓取网站，也可以提供页面更新时间、多语言版本等信息。([Google for Developers][4])

简单示例：

```xml
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://你的域名/</loc>
    <lastmod>2026-06-04</lastmod>
  </url>
  <url>
    <loc>https://你的域名/pricing</loc>
    <lastmod>2026-06-04</lastmod>
  </url>
</urlset>
```

## 3. 主动提交到搜索引擎

面向国内用户，优先做：

- **百度搜索资源平台**：添加站点、验证域名、提交 sitemap 或 URL。
- **必应站长平台**：提交 sitemap，接入 IndexNow。
- **360 搜索、搜狗搜索**：也可以提交站点，但优先级通常低于百度和必应。
- 面向海外用户，再重点做 **Google Search Console**。

Google Search Console 支持提交 sitemap、检查索引覆盖、查看 Google 如何抓取你的页面。([Google][5]) 百度的普通收录 / 链接提交工具可以缩短百度爬虫发现链接的时间，但百度也明确说明这不能保证一定收录。([Ziyuan.baidu.com][6]) Bing 这边可以考虑 IndexNow，它允许你在页面新增或更新时主动通知搜索引擎。([bing.com][7])

## 4. 每个页面都要有清晰的 SEO 信息

每个重要页面都应该有：

```html
<title>页面标题 - 品牌名</title>
<meta name="description" content="一句话说明这个页面能解决什么问题" />
<link rel="canonical" href="https://你的域名/当前页面" />
```

并且页面正文里要有：

```html
<h1>这个页面的核心主题</h1>
<h2>子主题</h2>
```

不要所有页面都用同一个 title。比如：

- 首页：`XXX - 面向开发者的 AI 工具导航`
- 定价页：`XXX 定价 - 免费版与专业版对比`
- 博客页：`如何用 XXX 自动生成 API 文档`

搜索引擎需要理解“这个页面是关于什么的”，用户也需要在搜索结果里一眼看懂点进去有什么价值。Google 的 SEO 入门文档也强调，SEO 的目标是帮助搜索引擎理解内容，并帮助用户判断是否访问你的网站。([Google for Developers][1])

## 5. 做真正有人会搜的内容

如果你的网站只有一个首页，通常很难获得自然流量。你需要围绕用户会搜索的问题做页面，例如：

- 产品页：你的工具解决什么问题。
- 对比页：`你的产品 vs 竞品`。
- 教程页：`如何用 xxx 做 yyy`。
- 案例页：真实使用场景。
- FAQ 页：用户常问问题。
- 博客 / 文档：覆盖长尾关键词。

比如你做的是“代码生成工具”，可以写：

```txt
如何用 AI 生成 TypeScript 类型
如何自动生成 OpenAPI 文档
Cursor、Copilot、XXX 对比
前端项目如何自动生成接口请求代码
```

这类页面比单纯写“最强 AI 工具”更容易匹配真实搜索需求。

## 6. 加结构化数据

如果你有文章、产品、FAQ、软件应用、面包屑导航，可以加 JSON-LD 结构化数据。Google 说明结构化数据能帮助它理解页面内容，并让页面有机会获得更丰富的搜索展示效果。([Google for Developers][8])

例如软件产品页可以考虑：

```html
<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "你的产品名",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web"
  }
</script>
```

## 7. 提升速度、移动端体验和稳定性

搜索引擎不只看文字，也会看页面体验。Google 的 Core Web Vitals 关注加载性能、交互响应和视觉稳定性，并建议站长优化这些指标。([Google for Developers][9])

你可以重点优化：

- 首页首屏加载速度。
- 图片压缩，使用 WebP / AVIF。
- JS bundle 不要太大。
- 移动端布局正常。
- 使用 HTTPS。
- 页面不要有遮挡内容的大弹窗。
- 重要按钮、链接可点击。
- 避免 CLS，图片和广告位预留尺寸。

## 8. 做内链和外链

站内要让搜索引擎能顺着链接发现页面：

```txt
首页 -> 产品页 -> 教程页 -> 案例页 -> FAQ
博客文章 -> 相关产品页
文档页 -> 注册页 / Demo 页
```

外部链接也很重要。你可以从这些地方获得自然链接：

- GitHub README。
- 技术博客。
- 掘金、知乎、V2EX、少数派、SegmentFault。
- Product Hunt、Hacker News、Reddit，面向海外时。
- 朋友网站、合作伙伴、开源项目文档。
- 真实用户案例。

不要买垃圾外链、堆关键词、隐藏文字、批量采集内容。这些短期可能有波动，长期容易被降权。

## 9. 面向中国大陆用户时的额外事项

如果你的网站主要服务国内用户，建议优先考虑：

- 中文内容质量。
- 百度搜索资源平台。
- 国内访问速度。
- 移动端体验。
- 如果服务器在中国大陆，通常需要做 ICP 备案。中国相关规定要求，在境内提供非经营性互联网信息服务应履行备案手续，未经备案不得从事非经营性互联网信息服务。([Shenzhen Market Authority][10])

ICP备案本身不是“排名魔法”，但国内访问稳定性、速度、可信度会影响用户体验，也会间接影响搜索表现。

## 10. 上线后的检查清单

上线后按这个顺序做：

```txt
1. 确认域名能正常访问
2. 配好 HTTPS
3. 配好 robots.txt
4. 生成 sitemap.xml
5. 每个页面设置 title / description / canonical
6. 重要页面使用 SSR / SSG / 预渲染
7. 提交百度搜索资源平台
8. 提交 Google Search Console
9. 提交 Bing Webmaster Tools
10. 接入统计工具
11. 每周看收录、点击、关键词、抓取异常
12. 持续新增高质量内容
```

你可以用这些搜索指令检查有没有被收录：

```txt
site:你的域名
site:你的域名 关键词
```

刚上线的网站不要期待马上有排名。Google 官方也提到，SEO 改动生效可能从几个小时到几个月不等，通常需要观察几周。([Google for Developers][1])

最小可行版本可以这样做：**先把首页、产品页、文档页、博客页做成可被爬虫直接读取的 HTML；加 sitemap；提交百度、Google、Bing；然后每周围绕用户会搜索的问题写 2-3 篇高质量页面。**

[1]: https://developers.google.com/search/docs/fundamentals/seo-starter-guide "SEO Starter Guide: The Basics | Google Search Central  |  Documentation  |  Google for Developers"
[2]: https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics?utm_source=chatgpt.com "Understand JavaScript SEO Basics | Google Search Central"
[3]: https://developers.google.com/search/docs/crawling-indexing/robots/intro?utm_source=chatgpt.com "Robots.txt Introduction and Guide | Google Search Central"
[4]: https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview?utm_source=chatgpt.com "What Is a Sitemap | Google Search Central | Documentation"
[5]: https://search.google.com/search-console/about?utm_source=chatgpt.com "Google Search Console"
[6]: https://ziyuan.baidu.com/sitemap/index "普通收录_加快网站内容抓取，快速提交数据工具_站长工具_网站支持_百度搜索资源平台"
[7]: https://www.bing.com/indexnow/getstarted?utm_source=chatgpt.com "How to add IndexNow to your website"
[8]: https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data "Intro to How Structured Data Markup Works | Google Search Central  |  Documentation  |  Google for Developers"
[9]: https://developers.google.com/search/docs/appearance/core-web-vitals?utm_source=chatgpt.com "Understanding Core Web Vitals and Google search results"
[10]: https://amr.sz.gov.cn/xxgk/zcwj/scjgfg/dzswgl/jlglfl/content/post_11724725.html?utm_source=chatgpt.com "非经营性互联网信息服务备案管理办法 - 深圳市市场监督管理局"
