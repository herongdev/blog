---
title: 用 VitePress 从零搭建个人技术分享（含 GitHub Pages 发布）
description: 一步步完成初始化、写作、构建、RSS、以及 GitHub Pages 自动发布
tags: [VitePress, 技术分享, GitHub Pages]
date: 2025-09-08
---

## 前置条件

- Node.js 18+（推荐 20）
- Git 与 GitHub 账号

## 1）初始化项目

```bash
mkdir my-blog && cd my-blog
npm init -y
```

## 2）安装与创建 VitePress

```bash
npm i -D vitepress

# 快速启动开发（首次运行会创建 docs/.vitepress 基础结构）
npx vitepress init # 如未安装可用：npm create vitepress@latest
```

选择 “技术分享” 模板或空模板均可。本仓库采用 `docs` 作为内容根目录。

开发预览：

```bash
npm run docs:dev
```

## 3）项目结构建议

```txt
docs/
  index.md                 # 首页（可用 hero 布局）
  posts/                   # 技术分享目录
    hello-world.md         # 你的第一篇文章（本页）
  .vitepress/
    config.ts              # 站点配置
    dist/                  # 构建输出（自动生成）
```

## 4）基础配置（docs/.vitepress/config.ts）

本仓库已内置一份可用于 GitHub Pages 的配置，关键点：

```ts
// 只展示关键片段
const BASE = process.env.BASE || "/";
const SITE_HOSTNAME = process.env.SITE_URL || "https://example.com";

export default {
  lang: "zh-CN",
  title: "我的技术分享",
  description: "记录、积累人气、可被搜索引擎良好收录的个人技术分享",
  base: BASE.endsWith("/") ? BASE : `${BASE}/`,
  sitemap: { hostname: SITE_HOSTNAME },
  themeConfig: {
    nav: [
      { text: "首页", link: "/" },
      { text: "文章", link: "/posts/hello-world" },
    ],
    search: { provider: "local" },
    outline: { level: [2, 3] },
  },
  // 如需在 Markdown 中写原始 HTML，可将 markdown.html 设为 true
  markdown: { html: false },
};
```

> 提示：GitHub Pages 二级路径（`https://<owner>.github.io/<repo>`）要设置 `BASE=/<repo>/`。

## 5）写第一篇文章（本页示例）

在 `docs/posts/` 下新建 Markdown 文件，建议包含 Frontmatter：

```md
---
title: 我的第一篇 VitePress 文章
description: 这是一段用于 SEO 的摘要
date: 2025-01-01
tags: [随笔]
---

这里是正文内容，可以使用 Markdown 语法、代码块等。
```

## 6）本地预览

```bash
npm run docs:dev
```

打开终端输出的本地地址，检查首页与文章路由是否可用。

## 7）生成静态站点

```bash
npm run build
```

构建产物在 `docs/.vitepress/dist` 目录。你可以用：

```bash
npm run docs:preview
```

进行本地预览。

## 8）生成 RSS（可选）

本仓库内置 `scripts/gen-rss.mjs`，`npm run build` 后会自动生成 RSS/Atom/JSON：

- 产物：`docs/.vitepress/rss.xml`、`atom.xml`、`feed.json`
- 设置站点地址：通过环境变量 `SITE_URL` 指定，例如：

```bash
SITE_URL="https://<owner>.github.io/<repo>" npm run build
```

如需单独生成：

```bash
SITE_URL="https://<owner>.github.io/<repo>" npm run rss
```

## 9）发布到 GitHub Pages（自动）

本仓库已包含工作流：`.github/workflows/deploy.yml`。

操作步骤：

1. 将仓库推送到 GitHub，分支 `main` 或 `master`。
2. 编辑工作流，将占位替换为你的信息：
   - `SITE_URL: https://<owner>.github.io/<repo>`
   - `BASE: /<repo>/`
3. 在 GitHub → Settings → Pages：
   - Build and deployment → Source 选择：GitHub Actions。

工作流会：安装依赖 → 构建 → 上传 `docs/.vitepress/dist` → 部署到 Pages。

## 10）常见问题

- 构建时报 HTML 标签错误：本配置默认 `markdown.html=false`，避免原始 HTML 引起解析问题。确需使用时改为 `true`，并确保标签闭合正确。
- 访问 404 或资源路径不对：多为 `base` 未设置为仓库名，如 `BASE=/your-repo/`。
- 中文文件名：VitePress 支持中文路径，但在 Windows 下请确保 Git 编码与终端能正确显示。

## 11）下一步

- 自定义主题外观、接入统计脚本（在 `head` 中注入）
- 组织文章分类/侧边栏
- 接入站点地图（已开启）、结构化数据、以及搜索优化

祝写作愉快！
