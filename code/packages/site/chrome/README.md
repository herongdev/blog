# 公共头部与页脚

`@herong/site-chrome` 是主站、历史文章、公开教程和文件工具共同引用的构建依赖。它负责公共菜单、HR 小象标志接入、联系邮箱、备案、样式、主题和手机菜单；业务目录与功能导航仍属于应用自身。它不加载子应用、不接管路由，也不请求远程配置。

唯一维护入口：

- `src/index.mjs`：六个全站菜单、品牌文字、邮箱与备案，以及完整头尾 HTML。框架适配层只调用 `renderHeader` / `renderFooter`，不要复制模板或再次定义菜单。
- `src/brand.css`：UI 主色、交互状态与页面中性色的唯一来源，导出为 `@herong/site-chrome/brand.css`。通过 CSS 直接共享，不生成各应用副本。
- `src/styles.css`：导入 `brand.css`，维护前缀为 `hr-chrome` 的颜色别名和布局；应用正文保留原有语义 tokens 名称，将对应 UI 颜色映射到 `--hr-brand-*`。
- `src/theme.mjs`：首屏与客户端共同使用的主题实现；`src/client.mjs` 管理可清理、可重复初始化的浏览器监听。
- 仓库根目录 `logo.svg`：唯一可编辑的纯矢量 HR 小象母版。H 由背毯和下方留白提示，R 由 D 形耳朵与象鼻提示；主体、耳朵和鼻尖保持蓝紫同色系，保留微渐变与浅层次。
- `assets/logo-hr.svg`、`logo-hr-light.svg`、`logo-hr-dark.svg`、`favicon.svg`：母版的打包副本、固定浅色/深色版本与简化小尺寸版本，均由 `code/scripts/generate-brand-assets.mjs` 同步。根目录 `logo-light.svg`、`logo-dark.svg`、`logo-icon.svg` 同样为生成导出，不应手改。
- `src/assets.generated.mjs`：从上述品牌资源与 Lucide 官方包生成 data URL 及实际需要的六个操作图标，禁止手改路径。只包含 `code/` 的独立构建使用已提交的 `assets/logo-hr.svg` 打包副本。

## 消费接口

```js
import { renderHeader, renderFooter, themeBootstrapScript } from '@herong/site-chrome';
import '@herong/site-chrome/styles.css';

const header = renderHeader({
  homeUrl: '/', // 可为 /blog/ 或 https://herong.info/；文章、应用、作品、关于在此基址下派生
  guidesUrl: 'https://dev.herong.info/',
  toolsUrl: 'https://herong.info/file-tools',
  active: 'articles', // tutorials / articles / tools / apps / projects / about，首页省略
});
const footer = renderFooter();
```

Astro 使用 `set:html`，Vue 使用 `v-html`，React 使用 `dangerouslySetInnerHTML`。这里的 HTML 完全来自共享模板；接口校验链接协议、拒绝凭据/控制字符，并转义属性。不要将用户输入或文章 HTML 插入返回值。

在 head 的首屏内联脚本中使用 `themeBootstrapScript`，在浏览器中调用：

```js
import { initSiteChrome } from '@herong/site-chrome/client';
const cleanup = initSiteChrome(document);
// Vue/React 卸载时 cleanup()；SPA 路由更换后可再次 init，以刷新按钮状态。
```

内容链接和原生 details 菜单在禁用 JS 时仍存在；主题控件在初始化后显示。主题支持浅色、深色及“跟随系统”，同步 `.dark` 与 `[data-theme]` 两种现有正文约定。优先读 `herong-theme`，兼容 VitePress、教程站、文件工具旧 key；写入失败不影响本次操作，并通过状态文字说明。localStorage 按 origin 隔离；使用相同 key 不意味着不同域名之间自动同步偏好。

头部显式渲染 `BRAND_LOGO_LIGHT_DATA_URL`、`BRAND_LOGO_DARK_DATA_URL` 两个 `img`，由共享 CSS 随站点 `[data-theme]` 切换，兼容 `.dark`，未设置站点主题时跟随系统；不能仅用 SVG 内的系统主题媒体查询替代站点的手动主题选择。`BRAND_FAVICON_DATA_URL` 则使用移除细织物装饰与浅浮雕细节的版本，随系统明暗主题变化。`BRAND_LOGO_DATA_URL` 保留为自适应母版的兼容导出。

## 统一 UI 色源

`src/brand.css` 使用 `light-dark()` 提供两套主题值，由现有主题入口的 `color-scheme` 决定取值。主色为浅色 `#5c50b8` / 深色 `#b5a6e5`，悬停为 `#4f439f` / `#c7b8f2`，主色上文字为 `#ffffff` / `#211a36`；轻背景、强调边框、焦点、选区及页面中性色也在同一文件维护。实际值和用途见源文件及 `code/docs/ui-guidelines.md`。

消费 `@herong/site-chrome/styles.css` 已加载该色源；仅需品牌变量时可直接导入 `@herong/site-chrome/brand.css`。主站、历史博客、教程、文件工具及写作台通过既有语义别名接入，不复制色值或生成多份 CSS。教程的 `apps/dev-guides/src/styles/tokens.css` 使用 `@import '@herong/site-chrome/brand.css'`，写作台继续引用这份教程 tokens；不通过跨目录相对路径定位品牌色源，保证独立发布快照中仍由包入口解析。

本轮只统一 UI 语义颜色，不修改根目录 Logo、页面布局、状态色、软件/文件分类、代码高亮或项目图示。参考 [GitHub 搜索页](https://github.com/search?q=design+tokens&type=repositories) 与 [Radix Playground](https://www.radix-ui.com/themes/playground) 的控件层次和状态，不引入 Radix Themes 库。

检查入口为 `code/scripts/check-brand-tokens.mjs` / `pnpm run check:tokens`，检查共享入口、漂移与对比度；`check:chrome` 先调用该检查，主站构建再通过 `check:chrome` 执行。当前代码与本地预览已完成，Edge 原生复核的实际范围及未完成项记录在 `code/docs/tasks/2026-11-03-brand-color-tokens.md`；Logo 与配色已于 2026-11-04 正式上线，详见 `code/docs/tasks/2026-11-04-brand-production-release.md`；线上 HTTP 检查不等同于 Edge 全面验收或手机真机验收。

## 资源与检查

以下命令在 `code/` 执行；母版修改后先生成全部派生资源，再检查：

```sh
pnpm run brand:generate
pnpm run check:brand
pnpm run check:tokens
pnpm --filter @herong/site-chrome check
pnpm --filter @herong/site-chrome test
```

`brand:generate` 从母版同步根目录导出、共享包与各应用的 SVG、favicon、分享 PNG 和 Apple touch icon，并重新生成本包 data URL 模块。`check:brand` 检查派生资产与清单一致性；本包 `check`（也由 `pnpm run check:chrome` 调用）对比品牌 SVG、已锁定版本 Lucide 图标与生成模块，漂移时失败。原 `logo.png` 文件保留文章兼容，知序、声稿等独立产品品牌不随本脚本替换。

UI 色源更新不需要执行 `brand:generate`；该命令只处理标志资产。UI 颜色的检查使用上述 `check:tokens` 入口，应用仍需重新构建以使用修改后的共享 CSS。

Lucide 1.66.0 采用 ISC 许可证（依赖包携带 LICENSE）；这些是库生成的 SVG，不是自绘操作图标。测试覆盖 URL 安全、子路径/独立域名、初始静态链接、主题恢复/持久化失败/系统跟随、重复挂载和菜单关闭。

共享包更改后仍需重新构建发布消费它的应用；它不会自动修改已上线的静态产物。公开教程写作发布与工具容器构建也必须携带该 workspace 源码。本包不包含后台、私有内容、支付或产品业务逻辑。
