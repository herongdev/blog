# 何荣开发工具库

这是独立于现有 VitePress 官网的 Astro 静态站。2026-10-20 完成 IP 入口部署验收；**2026-10-30 已接通正式环境 [https://dev.herong.info/](https://dev.herong.info/) 与测试环境 [https://test-dev.herong.info/](https://test-dev.herong.info/)**。旧 IP `/dev/`、`/test-dev/` 以 308 转向对应域名路径；写作后台已迁移为 [https://dev.herong.info/admin/](https://dev.herong.info/admin/)，旧 IP `/dev-admin/` 的 GET/HEAD 请求自动跳转，认证数据不变。构建产物保存在本应用 `dist/`，独立部署，不能复制到会被官网 CI `rsync --delete` 管理的 `/var/www/herongsite/`。

策划、来源库、候选选题和研究资料见 [项目文档入口](../../docs/dev-guides/README.md)；环境配置、发布与回滚以 [部署说明](../../infra/dev-guides/DEPLOYMENT.md)为准。

公开站与写作台共同遵循 [UI 规范](../../docs/ui-guidelines.md)。图标统一使用 Lucide：Astro 模板按需导入 `@lucide/astro`，React 写作台按需导入 `lucide-react`，两者均已安装使用。不得使用文本符号、Emoji、首字母或 CSS 拼图替代界面图标；Radix 继续提供 headless 交互行为。

## 本地运行

在 `blog/code` 下运行：

```bash
pnpm install --frozen-lockfile
pnpm --filter @herong/dev-guides dev
pnpm --filter @herong/dev-guides check
pnpm --filter @herong/dev-guides build
pnpm --filter @herong/dev-guides preview
```

构建时由 `PUBLIC_SITE_URL`、`PUBLIC_BASE_PATH` 和 `PUBLIC_DEPLOY_ENV` 决定站点 URL、路径前缀与环境。当前正式站使用 `https://dev.herong.info`，测试站使用 `https://test-dev.herong.info`，两者的 `PUBLIC_BASE_PATH` 均为 `/`。默认 `PUBLIC_SITE_URL` 为正式域名；构建测试环境必须显式传入测试域名和 `PUBLIC_DEPLOY_ENV=staging`。旧 IP 模式的 `/dev/`、`/test-dev/` 构建配置仅作兼容，实际发布参数见部署说明。

两个域名通过 Nginx、HTTPS 和独立静态目录提供访问。静态主机对不存在的页面或资源必须返回真正的 HTTP 404，可用构建产物 `404.html` 作错误页，不能将未知地址统一回退到首页。现有官网自动发布路径不包含这个子站。

## 技术栈与 UI 组件约定

公开网站运行的是 **Astro 7 静态站 + TypeScript + Astro 组件 + 少量原生 JavaScript**；教程页面在构建时生成 HTML。公开网站目前没有 React、Vue 或 UI 组件库。以后有真正需要弹窗、弹出菜单、复杂选择器的功能时，按 [全站 UI 规范](../../docs/ui-guidelines.md#开发工具教程子站headless-ui-约定)使用 **React 19 交互岛 + Radix Primitives**。Astro 可通过 `@astrojs/react` 只加载需要交互的部分；现有搜索框和单选筛选继续使用语义 HTML。独立的 `author/` 写作台使用 React 19、ByteMD 和 Node，支持本地模式及登录保护的线上模式。两边视觉值统一引用 `src/styles/tokens.css`。

## 写作与发布

线上写作台入口：[https://dev.herong.info/admin/](https://dev.herong.info/admin/)。现已改为微信登录，不再提供密码表单。首次从本机私有初始化 HTML 进入并用所有者微信扫码，绑定成功后仅该微信可进入；普通访客扫码不会获得管理员权限。网站扫码应先在电脑上完成，单手机授权尚未验收。使用与运维见 [线上写作台说明](../../infra/dev-guides/author/README.md)。

1. 新建草稿，填写标题和稳定的英文文章地址。正文使用 Markdown，可编辑并预览；保存后草稿存到服务器，换设备登录后可继续。
2. 粘贴、拖入或点“插入图片”选择截图，等待上传成功。图片由服务端优化并上传至自有 TOS，编辑器插入媒体 URL。
3. 在“发布信息”表单填写工具、内容类型、更新日期、版本、搜索线索、官方来源、实测记录和可选视频链接。未实测选“功能线索”；完整亲测后才选“实测教程”。高级 YAML 编辑仍可使用。
4. 草稿完成后点“加入发布内容”。这一步不会立即更新公开网站；未完成草稿不公开，同名内容不会被覆盖。
5. 点“更新测试环境”，等待检查和构建成功，再打开测试网站核对手机页面、搜索、图片和步骤。
6. 确认后点“发布正式网站”。若源码或发布内容与最近一次成功的测试发布不同，或该测试回执的地址不匹配当前测试环境，正式发布会被拒绝；构建失败保留现有网站版本。

内容类型与实测门禁仍按下文规则执行；不要把模板占位值或未实测内容当成正式教程。视频稍后制作也可以，拿到真实地址后补 `videoUrl`，保持文章网址不变。

本地写作台保留用于开发和离线辅助：在 `code/` 运行 `pnpm dev:guides:author`，打开 `http://127.0.0.1:4331/`。线上写作启用后，服务器文章是发文内容源；本地修改不会自动同步到线上，不要用本地旧稿覆盖线上内容。

### 教程截图与图片

线上写作时直接在写作台粘贴、拖入或点“插入图片”选择截图，凭据仅由服务器读取。以下为本地辅助写作方式。

写作台位于 [`author/`](author/)，使用 ByteMD 提供 Markdown 编辑和分栏预览。在 `blog/code` 运行 `pnpm dev:guides:author`，打开 `http://127.0.0.1:4331/`，新建或打开文章后粘贴、拖入 PNG/JPEG/WebP，最后保存即可。当前本机已接通云端直传：服务端负责检查真实格式与大小、移除图片元数据、上传到对象存储并校验公开地址，编辑器收到自有媒体 URL；不需要手动选择服务器目录或填写图片链接。云端 AK/SK 只由本机服务端读取，不会进入浏览器或网站构建产物。

继续使用 VS Code 时，打开项目内的 [`dev-guides.code-workspace`](dev-guides.code-workspace)，可直接粘贴或拖入截图。VS Code 先把文件保存到与文章同名的本地目录并插入相对路径，例如 `codex-worktrees.md` 对应 `codex-worktrees/step-01.png`；这只是**本地暂存**。运行 `pnpm media:publish` 后，脚本批量上传、检查图片公开地址，再把 `![说明](./codex-worktrees/step-01.png)` 改成自有媒体 URL。本地暂存图片被 Git 忽略；`media:check` 已接入构建前门禁，漏传或外站图片会阻止发布。文章中使用普通 Markdown 图片语法和有意义的替代文字；引用式图片和原始 HTML `<img>` 不在自动上传范围内。

媒体配置模板在 [`media.env.example`](media.env.example)。本机 `.env.media.local` 已配置为北京地域的私有桶 `herong-media`，文件权限为 `0600` 且被 Git 忽略；教程专用 IAM 用户 `herong-dev-guides-uploader` 禁用了控制台登录，仅附加自定义策略 `HerongTutorialMediaUpload`，允许读写 `dev-guides/tutorials/*`。在其他电脑使用时需单独安全配置凭据，修改配置后重启写作台。对象键为 `dev-guides/tutorials/<slug>/<内容哈希>.<格式>`；同图重复粘贴复用地址，替换图片会得到新地址，不覆盖已缓存的旧图。2026-10-20 已在写作台真实粘贴、保存并重开测试草稿，两张不同图片均成功显示，匿名 HTTPS `HEAD/GET` 均为 200 且下载内容与优化后的图片一致；上传账号的越权操作均返回 403。`astro check`、`media:check` 与静态构建通过。企业展示的 26 个素材和媒体域名 HTTPS 也已验收。具体记录见 [TOS 云端启用清单](TOS-ACTIVATION.md)和[架构文档的媒体方案](../../docs/dev-guides-architecture.md#教程图片与长期素材管理)。图片云端直传继续复用现有媒体服务，2026-10-30 的教程站域名切换未迁移图片桶或上传账号。

截图应在保存前裁出关键区域并遮盖密钥、账号等敏感内容；替代文字写出按钮名称或结果，不留空 `![]`。普通站点操作图标仍由 Lucide 组件提供，教程中的软件操作以真实截图配文字说明。

### 线上写作台与内容存储

`author/` 是独立的 React 19 + ByteMD + Node 应用；线上服务使用单个管理员微信登录、服务器端会话、同源与 CSRF 检查，通过现有 Nginx 443 提供访问。草稿、文章、修改历史和登录状态放在 `/var/lib/herong-dev-guides-author/`，与代码发布目录分开，代码升级不覆盖文章。每日私有备份由独立 timer 执行。

公开网站继续由 Astro 生成静态页面，不运行编辑 API，不依赖写作台会话或数据库。线上写作台可在页面里构建和发布两个环境；Git 提交不会自动上线。原本地静态部署工具会拒绝向已启用线上写作管理的目录上传旧稿。运维配置与回滚见 [线上写作台说明](../../infra/dev-guides/author/README.md)。流量统计仍是独立能力，当前未启用。

线上服务已设置 `AUTHOR_PUBLISH_TARGET=domains`，发布目标固定为正式、测试两个域名；未设置时默认使用兼容的 `ip` 模式。发布目标与后台登录地址独立。本次后台另同步迁移到 `https://dev.herong.info/admin/`：服务 Origin、Nginx Host、前端 base 和 Cookie Path 已配套更新。每次切换发布目标后，必须重新发布测试环境并核对效果，再发布正式环境。

## 内容发布规则

构建使用 `src/content/tutorials/*.md`。线上编辑的文章持久保存在服务器 `/var/lib/herong-dev-guides-author/project/src/content/tutorials/`，构建时复制到隔离快照；仓库内内容仅作为初始种子，不随网页保存自动更新。文件名就是 URL 的 slug，改名会改变地址。frontmatter 由 `src/content.config.ts` 校验。工具名称和别名在 `src/data/tools.ts`，主题选项在 `src/data/themes.ts`。

- 内容 URL 固定为 `/topics/<slug>/`，从线索升级为教程时地址不变，已有收藏链接继续有效。
- `status: lead`：只有官方资料支持、尚未亲测；页面显著标注“尚非教程”，`noindex`，不进 sitemap。
- `status: published`：必须填写 `verification.testedAt`、`verification.environment`、`verification.result`，并把正文替换成包含“操作步骤”“实测结果”的实测教程；构建会拦截仍含待实测模板提示语的正文。正式教程和有正式教程的分类页可进入 sitemap；功能资料在工具/主题目录中另列，仍不收录。
- `searchClues` 填用户可能记住的一星半点：工具旧名、按钮文案、问题短语、视频口播词；正式教程至少填两条。中文碎片和多词组合会参与站内搜索排序。
- `featured: true` 可把正式教程放进首页“精选教程”，最多展示 3 篇。`themes` 是任务导向主题；主题和工具目录只列已有内容的分类，教程与未实测资料分别计数和展示。
- `publishedAt` 由线上发布器在隔离快照中生成，以正式发布账本为准；不要手工补写。首次正式上线确定所属周，之后更新文章不改周归属。后台待拍计划和目录中的“第几周”不作为公开归档依据；缺少可靠首发日期的旧教程放入“往期教程”。
- 每条内容至少有一个准确的 `officialSources` 链接。若选题来自博主，额外填 `discoverySources`，不要把发现来源当作功能事实依据。
- 正式教程正文应包含前置条件、逐步操作、预期结果、常见失败情况、版本或平台限制。视频发布后再填真实的 `videoUrl` 与视频口播关键词；搜索结果会分别显示文字页和原视频入口，详情页的原视频入口在标题附近。没有视频时不会出现视频按钮。

### 按周、主题和工具查找

首页按首次发布周展示近期教程，完整周目录在 `/weeks/`，主题目录在 `/themes/`，工具目录在 `/tools/`。周范围采用上海时间、周一至周日；各入口复用同一篇文章的永久地址。正式教程的正文可回到所属周、主题或工具，有真实 `videoUrl` 时同时提供文字和视频入口。

搜索使用构建生成的 `/search-index.json`，匹配问题词、工具英文名/别名、口播词、主题、摘要和正文，并可组合工具、主题和发布周条件。`q/tool/theme/week` 写入 URL，刷新与前进后退可恢复；搜索时隐藏原目录，清除后重新显示。结果按教程与未实测功能资料分组，显示总数，每批 12 条并提供“加载更多”；网络失败可重试。私有草稿及拍摄队列不进入索引，搜索无后台服务依赖。检查日历周界和搜索规则可在 `code/` 执行 `pnpm --filter @herong/dev-guides test:browse`。

## 视觉 tokens 与主题

`src/styles/tokens.css` 是站点视觉变量的唯一来源：语义色、亮暗配色、字阶、间距、圆角、阴影、焦点、动效及内容宽度。组件样式使用这些变量；调整整站观感先改 tokens，不在页面里另写颜色。断点和少数特定布局尺寸保留在具体样式中。

首次访问跟随系统明暗偏好。页头使用 Vue 官网样式的双态滑动开关：太阳表示浅色，月亮表示深色；按钮带 `role="switch"` 和动态 `aria-checked`，可用键盘操作。图标来自 `@lucide/astro`，控件视觉为 40×22px，实际点击区域为 44×44px。手动切换后，若所选模式与当前系统偏好相同，则保存 `auto` 并继续跟随系统；否则保存明确的 `light` 或 `dark`。初始化脚本在页面绘制前读取偏好，避免亮暗闪烁。CSS 本身也会跟随系统偏好，因此禁用脚本时仍能显示正确主题。浏览器原生输入控件使用对应的 `color-scheme`。

## SEO 与上线边界

Astro 构建为普通静态 HTML。正式域名的 `/sitemap.xml` 从内容状态生成，只有已亲测的 `published` 教程、所属周/主题/工具页及符合内容条件的目录入口会进入。周目录没有已归档教程、主题目录没有归类的正式教程、工具目录没有正式教程时不加入 sitemap；纯线索页面保持 `noindex`。2026-10-30 域名切换保留原有 4 篇 `lead`，未发布新的正式教程；0 篇正式教程时首页和各目录均 `noindex`，sitemap 为空。测试域名全站 `noindex, nofollow, noarchive`，robots 禁止抓取，sitemap 为空。正式发布时检查 HTTPS、DNS 和证书、资源与未知路径的真实 404，避免对所有地址回退到首页。

建议至少完成一篇有录屏证据的正式教程后再开放搜索引擎收录。不要把当前候选线索当作亲测教程推广。

## 可选分析

配置 `PUBLIC_UMAMI_SRC` 与独立的 `PUBLIC_UMAMI_WEBSITE_ID` 后会载入 Umami。现有 `site_search`、`search_result_open` 自定义事件只发送工具、内容 slug、状态、结果数量或查询长度，不在事件属性中放原始搜索词；未配置时站点全部功能仍可使用。

**启用统计前必须先修正搜索 URL 的采集风险**：当前搜索把 `q` 放进 URL，并在每次输入时调用 `history.replaceState`。Umami 默认采集 URL 查询串并监听 History API，因此启用后仍可能采集原始搜索词、重复计入页面浏览量。应停止逐字更新 URL，在 Umami 发送前过滤 `q`、保留来源 UTM 参数，并用真实网络请求验证；不能仅靠不在自定义事件里发送 `q`。参见 [Umami 指标定义](https://docs.umami.is/docs/metric-definitions)、[追踪配置](https://docs.umami.is/docs/tracker-configuration/)。
