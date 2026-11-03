# HR 品牌色 token 统一

日期：2026-11-03 至 2026-11-04。状态：2026-11-04 已正式上线，版本、回滚与线上验收见 [品牌上线记录](2026-11-04-brand-production-release.md)。下文为上线前构建与预览记录；Edge 实际范围与未完成项见末节及上线记录。

## 设计与范围

以已确认的 HR 小象蓝紫渐变为依据，UI 使用稳定的纯色主操作：浅色 `#5c50b8`，深色 `#b5a6e5`；同时定义 hover、按钮文字、链接、软背景、边框、选区、焦点与投影，以及共用中性色。

参考已实际打开的 [GitHub 搜索页面](https://github.com/search?q=design+tokens&type=repositories) 的中性色阅读区、链接与筛选层次，和 [Radix Playground](https://www.radix-ui.com/themes/playground) 的 Solid/Soft 控件状态。参考截图为仓库根 `output/playwright/brand-reference-{github,radix}.png`。本轮沿用现有布局与 Lucide，不安装新的 UI 主题库。

统一主站、历史文章、公开教程、文件工具、教程写作台。公共头尾和正文使用相同品牌色源。成功/警告/错误、软件身份与文件类别、代码高亮、项目图示颜色继续按各自语义使用；独立产品知序、声稿不在本轮改色范围内。Logo 矢量母版与生成资产不变。

## 唯一色源与适配

唯一 UI 色源为 `packages/site/chrome/src/brand.css`，通过 `@herong/site-chrome/brand.css` 导出。CSS 直接共享，无需复制生成色表。`light-dark()` 根据页面 `color-scheme` 选择主题，现有主题控制器负责跟随系统、手动选择与刷新恢复。

- 公共头尾 `src/styles.css` 引用色源，原 `hr-chrome-*` 颜色变量映射到公共角色。
- Astro 主站 `site.css` 保留 `home-*` 别名；搜索主按钮显式引用 primary/on-primary/hover，筛选选中态使用 soft/border。
- VitePress `site-chrome.css` 映射正文品牌色、按钮及搜索高亮文字；历史作品 CTA 和有效的 `/articles/` 归档入口也接入，保留项目图示色。
- 教程 `src/styles/tokens.css` 映射主操作、正文、页面中性色与焦点；写作台自动复用同一文件，Vite 只增加共享样式目录的精确读取许可，保留所有私有目录 deny。
- Next 工具 `globals.css` 映射已有品牌与中性色变量；“已开通”从 accent 分离为 success，避免成功状态变成紫色。

发布兼容：教程发布会在独立快照目录构建，不能使用指向 checkout 的相对路径。已采用包入口 import；部署清单原本包含所需共享包，无须改部署脚本。已在系统临时目录模拟仅有公开 token 和依赖 symlink 的快照，Vite 成功打包并解析全部 import（8,485 字节 CSS），未访问私有内容或执行真实发布。

## 可执行检查

在 code/ 执行 `pnpm run check:tokens`。`scripts/check-brand-tokens.mjs` 检查五个适配入口的品牌变量引用、公共定义未被重新声明、导入与包导出，并计算明暗各九组文字对比度。它接入 `check:chrome`，主站常规构建会执行。

18 组对比度全部达到 4.5:1：浅色主按钮白字 6.37:1，深色主按钮深字 7.55:1；涵盖 hover、链接/画布、链接/内容面、链接/软选中背景及正文/次要文字。此检查覆盖指定品牌角色和已知适配入口，不代表全仓所有图表、图片或任意第三方样式都经过自动审查。

## 构建与预览

- 共享组件 13/13 测试通过，品牌 SVG 资产一致性通过。
- 主站 Astro check 32 文件、教程 Astro check 33 文件均为 0 错误/警告/提示。
- 主站 Astro、VitePress、教程 Astro、作者 Vite、工具 Next 构建通过；作者构建包含 TypeScript 检查，Next 正常构建包含 lint/type 检查。
- 主站合并预览最初遇到本机 ENOSPC；失败 staging 自动回收，旧预览保留。回收本轮 Next `.next/cache` 约 254 MB 后合并成功，未清理其他项目或运行数据。
- 最终静态校验通过：9,211 文件、3,041 HTML（3,025 历史页），288,940,653 字节；抽查 57 页面、51 本地资源。预览禁止索引，sitemap 为空是预览配置。
- 原有大 chunk 与历史语法高亮降级提示仍存在，本轮没有扩大到构建优化。

日志与自动检查结果在 `code/output/brand-colors-20261103/`。主站、教程、工具原有本地服务已刷新：

- <http://127.0.0.1:4371/>
- <http://127.0.0.1:4372/>
- <http://127.0.0.1:4373/file-tools/tools>

## 浏览器验收与限制

用户提出改用 Edge 前，已在隔离 Chromium 会话实际查看主站、文章详情、教程、工具和写作台静态登录页的明暗截图；11 个公开入口在 8 种屏幕尺寸、明暗两种主题共 176 个状态检查通过，系统主题与手动主题相反时仍得到正确色值，Logo 单一可见且加载成功，无页面横向溢出。尺寸为 320×760、390×844、600×900、768×1024、1024×768、1440×900、2560×1440、844×390。证据为 `browser-matrix.log` 与根 `output/playwright/brand-*.png`。这些记录不能写成 Edge 或手机真机验收。

用户随后明确要求只用 Edge，已停止并关闭本任务 Chromium 会话。2026-11-04，在原生 Microsoft Edge 中实际查看主站首页、教程首页和工具目录各自深浅两种主题的截图，确认这三类页面的 Logo、主按钮、选中态与中性色正常。Edge 证据为本会话中的 CUA 截图与 AX 可访问性状态，没有保存本地 Edge PNG；上述 Chromium 的 176 个状态不计入 Edge 复核范围。

随后进入文章导航时，Edge 切换到其他产品窗口并打开文件菜单，Escape 操作被“user changed”保护中止。本轮 Edge 文章详情与窄屏专项复核未完成，不能据此宣称 Edge 全面验收通过；没有继续操作其他产品窗口。

写作台只使用本地静态登录预览，未启动作者 API、登录管理员、修改内容或验证发布动作；连接提示属于无后端静态预览限制。该预览阶段没有进行 iOS/Android 真机验收、服务器操作或线上发布；后续线上检查独立记录于品牌上线记录。
