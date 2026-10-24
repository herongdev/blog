# 主站

Astro + TypeScript 静态作品站。页面文字、导航、作品列表、详情和概念图在构建时生成；首页背景是唯一的 Vue 客户端交互岛。作品事实与已有 Vue 概念图复用 `apps/blog` 的数据和组件，不另写项目履历。

```bash
pnpm --filter @herong/site check
pnpm --filter @herong/site build
pnpm --filter @herong/site dev --host 127.0.0.1
```

环境变量见 `.env.example`。`PUBLIC_BASE_PATH` 同时用于静态资源和内部链接；`PUBLIC_SITE_URL` 是站点 origin。正式根域名默认 `https://herong.info`。预览请设置 `PUBLIC_DEPLOY_ENV=staging`，或显式 `PUBLIC_NOINDEX=true`；HTTP、IP 与 localhost 自动禁止索引。预览生成空 sitemap，页面也输出 noindex。

```bash
PUBLIC_SITE_URL=https://101.96.210.172 PUBLIC_BASE_PATH=/site-preview/ PUBLIC_DEPLOY_ENV=staging pnpm --filter @herong/site build
```

主站菜单使用统一配置中的 `PUBLIC_GUIDES_URL` / `PUBLIC_TOOLS_URL`；产品域名集中在 `src/config/site.mjs`。教程暂指已存在的 IP 入口，正式域名就绪后通过配置调整。

正式作品路径是 `/projects/<领域>/<项目>/`。政企领域页和汽车采样站继续由 HTTPS 入口代理到各自独立应用；此处的政企页只提供可索引的目录降级内容，采样站链接始终保留正式 URL。旧作品地址的永久重定向由入口配置承担。缺失页面须由 Nginx 以真实 404 返回 `404.html`。

此应用只构建新主站，历史文章、RSS、搜索资产由仓库构建脚本合并。`sitemap-site.xml` 包含新主站路由；主构建负责合并完整 `sitemap.xml`，禁止用覆盖复制处理 HTML 归属冲突。原始 Logo 按字节复用。原博客和独立应用的目录与发布职责不变。
