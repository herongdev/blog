# 公共头部与页脚

`@herong/site-chrome` 是主站、历史文章、公开教程和文件工具共同引用的构建依赖。它负责公共菜单、HR 字标、联系邮箱、备案、样式、主题和手机菜单；业务目录与功能导航仍属于应用自身。它不加载子应用、不接管路由，也不请求远程配置。

唯一维护入口：

- `src/index.mjs`：六个全站菜单、品牌文字、邮箱与备案，以及完整头尾 HTML。框架适配层只调用 `renderHeader` / `renderFooter`，不要复制模板或再次定义菜单。
- `src/styles.css`：前缀为 `hr-chrome` 的语义 tokens 和布局；公共区域延续主站中性底色与紫色强调，应用正文保留自己的 tokens。
- `src/theme.mjs`：首屏与客户端共同使用的主题实现；`src/client.mjs` 管理可清理、可重复初始化的浏览器监听。
- `assets/logo-hr.svg`：已确认的纯 HR 字标。`src/assets.generated.mjs` 由它与 Lucide 官方包生成，只含实际需要的六个图标，禁止手改路径。

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

## 资源与检查

```sh
pnpm --filter @herong/site-chrome generate:assets
pnpm --filter @herong/site-chrome check
pnpm --filter @herong/site-chrome test
```

`check` 对比 canonical HR SVG、已锁定版本 Lucide 图标与生成模块，漂移时失败。Lucide 1.66.0 采用 ISC 许可证（依赖包携带 LICENSE）；这些是库生成的 SVG，不是自绘操作图标。测试覆盖 URL 安全、子路径/独立域名、初始静态链接、主题恢复/持久化失败/系统跟随、重复挂载和菜单关闭。

共享包更改后仍需重新构建发布消费它的应用；它不会自动修改已上线的静态产物。公开教程写作发布与工具容器构建也必须携带该 workspace 源码。本包不包含后台、私有内容、支付或产品业务逻辑。
