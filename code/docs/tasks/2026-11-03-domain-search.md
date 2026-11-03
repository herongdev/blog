# herong.info 主域知识搜索：首页改造任务

状态：代码、完整静态预览和浏览器验收已完成；正式网站未部署。用户要求在现有仓库交付代码和可验证预览，本任务不自动切换正式网站或改动独立产品部署。任务进度、接口与验收只记录在仓库内，不写入任何 Skill。

## 基线核查与差异

- 已读 `output/ip-structure-audit-20261102/current-structure.md`、根 AGENTS、首页/UI 约定与完整部署文档。
- 当前主站 Astro，历史 VitePress 在构建阶段合入同一个静态容器；`/projects/` 已能承接原作品总目录，不另造路由。
- 教程域名实际已启用，首页菜单和 CI 缺省仍使用旧 IP；本次改为 `https://dev.herong.info/`。工具当前有效入口是 `/file-tools`，不会采用尚未接通的 tools 子域名。
- 教程旧 `/search-index.json` 兼容公开的待实测资料，包含 `bodyText`，不能直接用作本次正式教程数据源。
- 本地公开教程种子为 4 条 lead、0 条 published；私有稿件在作者服务独立目录，主站索引不得扫描作者、策划或测试环境。
- 实际扫描 3,023 份历史 Markdown：2,966 篇可公开检索，排除 55 个目录/README 和 2 个模板。放行 `__proto__`、`_.template`、`_render` 等真实技术文章，不用前导下划线误判私有。历史页面本身与 URL 不删除。
- 旧 VitePress 搜索原先仅处理 `search: false`，不识别其它私有/禁止索引标记；当前历史源未检出这些标记。本轮将旧搜索与新索引共用 `apps/blog/scripts/search-visibility.mjs` 门禁，防止后续新增此类内容时进入旧下载索引。
- 工作区已有大量作者后台、视频发布等改动，本任务保持它们原样，不将其作为主站搜索源。

## 实际参考与布局

先使用真实浏览器查看 Google 搜索首页及“上下文压缩”结果页：

- 参考页面：https://www.google.com.hk/；场景是只记得关键词、直接查找答案。
- 截图：`output/playwright/reference-google-home.png`、`output/playwright/reference-google-results.png`。
- 采用首页单一醒目搜索框、少量辅助入口，结果页使用来源/标题/摘要的纵向列表；不加入产品入口墙或虚构热门内容。
- 保留 HR 灯塔 Logo、中性底色、现有紫色强调、明暗主题、Lucide、备案和阅读排版体系；不复制 Google 品牌或配色。
- 首页显示“最新内容”（复用教程 `/weeks/`）和“按工具查阅”（复用教程 `/tools/`）；它们展示真实公开状态，不拿私有拍摄排期当最新内容。
- 导航为搜索、教程、工具、作品、关于；自营产品保留原 `/products/`，由页脚等次级入口进入。
- 作品介绍标题“技术落地的不同现场”转由现有 `/projects/` 承接，领域/详情/演示路径不变。

## 检索与公开边界

- 不增加搜索集群、RAG 或常驻服务。复用教程站的 NFKC、小写、中文分词思路及现有博客/工具数据；无新增检索依赖。
- 主站构建时只读取 `apps/blog/docs/posts/` 与明确公开的独立旧文，以及现有工具注册表；构建分片倒排索引，正文只参与构建分词，公开产物只包含结果摘要/元数据和 token postings。
- 客户端在首次非空搜索时才启动 Worker，获取小 manifest、结果元数据和查询涉及的 token 分片；首页不预加载三千篇正文。
- 可维护别名组覆盖用户给出的三组用语，但结果必须命中真实公共内容，不生成示例文章。
- 相关性先匹配标题、软件、关键词/别名，再匹配摘要/正文词；只有相关程度接近时才允许正式教程的轻量优先。
- 新增教程 `/search/published.json` 公开契约：源端只导出正式域名 production 下的 public、published、允许索引且通过现有实测门禁的记录；lead、draft、private、unlisted、noindex、staging/IP 一律排除。
- 主站动态消费此公开 feed，正式教程发布后不要求重新构建主站；不调用管理接口，不携带后台 Cookie。生产使用该新端点前需随教程应用独立发布。已在正式教程 Nginx 源配置加入精确路径、仅允许 `https://herong.info` 的公共 GET/HEAD CORS；本次未发布到服务器，本机无 Nginx/Docker daemon，未运行 `nginx -t`。
- 每次构建只保留当前索引 digest。文章改成私有后，旧 digest 不会继续被打入新的公共产物；已有 Worker 请求旧分片失败时刷新 manifest 一次。已被访客下载的数据无法追溯收回。
- 预览使用同一严格导出器从公开种子生成的 0 条正式教程快照，路径 `/search-index/tutorials.json`；不会用测试假教程充填预览。测试中的合成条目仅保留在 Node 测试临时夹具中。
- 新首页支持来源筛选、真实总数/分页、加载/空/失败重试、URL 查询状态与前进后退。历史文章保留来源标签和可靠原日期，不统一标成已验证教程。

## 进度

- [x] 读取基线、代码和部署边界
- [x] 查看成熟产品真实首页与结果页，确定信息层次
- [x] 首页和导航实现、复用作品总目录
- [x] 公共数据过滤、索引与检索安全测试
- [x] 严格教程 feed 与预览快照
- [x] 完整构建、历史地址与静态产物验证
- [x] 桌面/手机模拟/明暗主题与真实搜索交互验收

## 验收记录

代码检查、自动化、浏览器视觉分别记录；浏览器尺寸模拟不能称为手机真机验收。正式域名与独立应用未因本任务发布改造。

### 自动检查与隐私

- 主站 Astro check：0 errors / 0 warnings / 0 hints（`output/site-check-search.log`）；生产 Astro 构建 16 HTML 页面通过（`output/main-search-site-build.log`）。
- 教程新增 7 项测试通过，含 `os.tmpdir()` 内隔离 Astro 构建：private/unlisted/draft/noindex 夹具的 sentinel 未进入任何公共 HTML、JSON、JS 或 XML；临时目录清除，不将测试教程放入预览。
- 教程原有 4 项浏览测试通过；公开种子仍 4 lead、0 published。新 feed 为 73 字节、0 条；旧教程搜索保留明确标识的 lead，但主域从不调用旧 feed。
- 主搜索 13 项测试覆盖中文/全角/大小写/空格/标点、三组别名、相关性优先、私有字段、下载产物、懒加载、断网重试、原生 Worker fetch receiver、公开转私有后清理旧索引。另验证同一 runtime 的教程 feed 从 0→正式发布 1→私有撤回 0，无需重建主索引。Node 测试后另做真实浏览器，修复了 mock 无法发现的原生 fetch 绑定问题。
- `pnpm test:site` 22/22；另与 VitePress `_render` 门禁 2 项联合 24/24。加上教程 7 项与原浏览 4 项，共 35 项相关测试通过。日志目录：`output/search-home-20261103/`。
- 生产合并：3,041 HTML、3,040 canonical、3,039 sitemap URL；抽查 42 组历史目录、57 页面、51 个本地资源通过。1 个原有下载 HTML 示例不作为内容页，917 份旧文原先无 H1，保留作者原文，未为本任务改写正文。
- staging 合并再次验证通过：3,041 HTML、16 个 Astro 页面 noindex、sitemap 为 0。16 条 HTTP 检查覆盖首页/作品/项目/关于/产品/文章归档/历史文章/三种 feed/robots/sitemap 与真实 404，均有全局禁止索引响应头，详见 `preview-http-checks.json`。
- 最终检索 digest `670c5780d4719936`：2,966 篇文章 + 9 个工具，元数据 1,999,980 B（gzip 463,124 B），64 个分片加元数据合计 17,996,626 B（gzip 4,999,695 B）。构建后的真实浏览器首次“图片压缩”只读取元数据和 2 个分片，总传输 601,652 B；不是下载全索引。生产已有 Nginx gzip JSON 配置。

### 实际浏览器检查

- 桌面 1440×1000、手机模拟 390×844 的浅色首页、深色结果页均已截图查看，对照真实 Google 首页/结果页检查信息层次；手机描述使用平衡换行避免单字孤行。
- 320、390、600、768、1024、1440、2560 宽和 844×390 横屏：均无整页横向溢出；矮屏允许自然纵向滚动。移动菜单打开/Escape 关闭、主题切换正常。
- “图片压缩”实际返回 27 条：1 个工具、26 篇历史文章，首条为正式工具 `https://herong.info/file-tools/tools/image-compress`。12→24 加载更多正常；正式教程筛选真实 0 条；工具筛选 1 条。后退/前进恢复来源与关键词，清空后焦点返回输入框。
- “Redis 持久化”和“Redis持久化”均返回 6 篇；“Vue路由”374 条。屏蔽 manifest 后显示失败，移除故障并点击“重新搜索”恢复结果。
- 构建后的 Worker 再验：“Codex 扳手”“子代理”真实 0 条；“自动压缩”找到 2 篇现有历史文章，仍标历史文章，不冒充 Codex 正式教程；全角 `ＤＯＣＫＥＲ，ＣＯＭＰＯＳＥ` 12 条、`Next.js` 58 条。模拟 compositionstart 时 Enter 不提交，compositionend 后正常搜索；这不等于系统中文输入法真机测试。
- 首页初始搜索索引请求 0；首次 Redis 查询仅请求 manifest、教程空快照、结果元数据和 3 个倒排分片，不请求文章全文或全部 64 个分片。
- 静态构建初始 Worker 为 0、搜索后为 1；结果状态在 320～2560px 也无横向溢出。浏览器 console 0 errors / 0 warnings。
- 截图：仓库根 `output/playwright/main-search-home-desktop.png`、`main-search-results-desktop.png`、`main-search-home-mobile.png`、`main-search-results-mobile-dark.png`。完成的是浏览器模拟验收，尚未做 iOS/Android 真机验收。

### 可复现的预览

在 `code/` 执行以下命令生成严格公开教程快照和完整无索引预览：

```sh
node apps/site/scripts/prepare-search-preview.mjs
PUBLIC_TUTORIAL_SEARCH_URL=/search-index/tutorials.json PUBLIC_DEPLOY_ENV=staging pnpm build:site
pnpm --filter @herong/site preview:bundle
```

默认地址 `http://127.0.0.1:4371/`；端口通过 `PREVIEW_PORT` 指定。这个本地服务只读取合并后的静态产物，为所有响应加 `X-Robots-Tag: noindex, nofollow, noarchive`，robots 禁止抓取；工具仍进入正式独立应用。它只用于本机审阅，不替代生产 Nginx。

`4371` 完整预览服务现由本机 launchd 用户会话独立运行，任务名 `info.herong.blog-search-preview`；不依附临时工具终端。停止命令：`launchctl remove info.herong.blog-search-preview`。未安装登录启动项。临时 `4370` 开发服务已停止；需要开发时使用 `PUBLIC_TUTORIAL_SEARCH_URL=/search-index/tutorials.json PUBLIC_DEPLOY_ENV=staging PUBLIC_NOINDEX=true pnpm --filter @herong/site dev --host 127.0.0.1 --port 4370`，该快速开发服务不包含合并的历史 HTML。

正式发布仍使用现有 `build:site`/CI 流程，默认指向 `https://dev.herong.info/search/published.json`；需要先独立发布教程 feed 和精确 Nginx 配置，再发布主站。本任务没有推送 master、切换 DNS、重启生产容器或更改独立产品部署。

### 2026-11-03 预览服务恢复

- 用户反馈无法查看；现场确认 `127.0.0.1:4371` 无监听，原临时进程已经退出，HTTP 连接被拒绝。
- 静态 HTML、CSS、JS、Worker、2,975 条结果元数据及 64 个索引分片均完整，无需重构建。
- 使用 `launchctl submit` 将同一本机预览脚本交由用户会话运行，绑定地址仍仅为 `127.0.0.1`。主进程的 PPID 为 1；日志 `output/search-home-20261103/preview-service.log` 和 `preview-service-error.log`。
- 再次确认首页 HTTP 200；在用户当前应用内浏览器实际打开首页并搜索“图片压缩”，返回 27 条结果，已显示 12 条；最后返回首页并保留标签页。
- 恢复后实拍：`output/search-home-20261103/preview-recovered-20261103.png`。正式站和部署配置未改动。

### 2026-11-03 首页文案精简

- 按用户要求，将搜索区原三行说明精简为单一主标题“想找什么？”，保留原搜索框提示；移除品牌重复说明和范围描述，同时清理无效的 `aria-describedby` 引用及对应样式，调整标题到搜索框的间距。
- Astro check 0 errors / 0 warnings / 0 hints，主站静态构建通过，并重新合入当前 4371 预览；没有重建历史内容或修改检索源。
- 实际浏览器查看 1440×900 桌面及 390×844 手机模拟截图，布局正常且无横向溢出；“图片压缩”仍返回 27 条结果、首屏显示 12 条。内置浏览器的已有标签页控制连接异常，本轮用独立 Playwright 浏览器完成视觉和交互检查，不声称已经刷新用户的原标签页。
- 截图：`output/search-home-20261103/home-copy-trimmed.png`、`home-copy-trimmed-mobile.png`。首页约定已同步 `docs/homepage.md`。正式网站未发布此修改。

### 2026-11-03 主题与时间快捷筛选（已更新预览）

- 用户场景：记不起准确关键词时，先凭内容方向或发布时期缩小范围。使用资深产品与 UI 审查流程，先实际查看 Google 中文搜索的“工具 → 时间不限”，参考 URL 为 `https://www.google.com.hk/search?q=codex+context+compaction&hl=zh-CN`。桌面与手机参考截图在仓库根 `output/playwright/filter-reference-google-*.png`；保留主题与时间分组、明确选中态，不照搬多级菜单和 Google 配色。
- 搜索框下新增两行轻量单选：主题为全部、AI 编程、前端开发、后端开发、部署运维、文件处理；发布时间为不限、本周、本月、近半年、近一年。手机主题为三列两行，所有快捷条件及清除按钮触控高度至少 44px；仍以搜索框为主要操作。
- 主题由 `src/search/filters.mjs` 的可维护规则，根据公开目录、标题、软件、关键词与原有工具注册表归属，允许交叉；其余内容仍在全部中。现有索引分别有 18 / 2055 / 573 / 90 / 28 条对应主题记录，不能将这些相加当作内容总数。
- 时间严格使用可靠 `publishedAt`：北京时间本周一、本月一日起；半年/一年为滚动自然月，月底与闰年取有效日期，截止今天。未来日期、无效日期及无首发日期不进入时间窗，不用 mtime/更新时间补日期。结果优先显示发布时间，缺少发布时间才显示真实更新时间；2,975 项中 2,925 项有发布时间，50 项无日期（含 9 个工具）。
- 可以不输入关键词直接筛选，按发布时间从新到旧浏览；有关键词时仍优先相关性。来源计数与分页在主题、时间条件之后计算。“最新内容”改为主域主动浏览；按工具查阅继续进入教程站。清空关键词保留筛选，清除筛选保留关键词；`q/source/topic/period/browse` 保存 URL 状态，刷新及前进后退恢复条件。
- 新索引 digest `ead19a0f28b747d7`，仍为 2,966 篇历史文章 + 9 个工具，正式教程快照仍 0 条。元数据仅增加公开 `topics`：2,062,217 B（gzip 465,277 B）；所有索引合计 18,058,863 B（gzip 5,001,848 B）。空首页继续零索引请求；仅主题/时间浏览只读取元数据和正式教程 feed，不加载任何倒排分片，不请求全文、后台或测试站。
- 测试：新增 8 项日期/主题/组合/懒载测试，连同原 13 项搜索回归 21/21；主站全套含原静态兼容共 30/30。Astro check 0 errors / warnings / hints；构建与合并验证通过，3,041 HTML、原 canonical/RSS/历史地址保留。日志为 `output/search-home-20261103/quick-filter-*.log` 与 `quick-filters-check.log`。
- 实际浏览器：初始索引请求 0；不输入关键词选文件处理返回 28 条且倒排请求 0；“Vue + 前端开发 + 近半年”返回 825 条、首屏 12 条。刷新、清空关键词、清除筛选、后退/前进、最新内容 12→24 分页和 9 个工具来源筛选均正常。当前本周、本月无新发布资料，真实显示 0 条，不补造内容。
- 视觉分别检查桌面 1440×1000、手机模拟 390×844、明暗主题和筛选结果；320～2560px 及 844×390 横屏均无横向溢出，快捷条件与清除按钮最小高度 44px。浏览器 console 无错误。截图在仓库根 `output/playwright/quick-filters-home-desktop.png`、`quick-filters-home-mobile.png`、`quick-filters-home-dark.png`、`quick-filters-results-mobile-dark.png`；属于浏览器模拟，未做手机真机验收。
- 本机 4371 后台预览服务继续运行，刷新即可看到更新。文档同步 `docs/homepage.md`、`docs/ui-guidelines.md`；未发布正式网站或改动独立应用部署。

### 2026-11-03 顶部与页脚去重（已更新预览）

- 用户指出顶部与页脚品牌、菜单重复。对照已核验的 Google 搜索首页参考截图（仓库根 `output/playwright/reference-google-home.png`）的主操作与底部独有实用链接分工，保留本站顶部 HR Logo 和主导航，移除共享 Astro 页脚 Logo、标语及重复的作品入口。
- 页脚仅留自营产品、文章归档、RSS 和备案；实用链接与备案分组，沿用本站主题与颜色，减少上下留白，手机自然两行。原品牌文件、顶部品牌、作品路径和页脚实用链接地址均保留。
- Astro check 0 errors / warnings / hints；主站构建与静态合并验证通过。实际浏览器首页只有 1 个可见品牌 Logo、页脚 0 个图片、顶部与页脚链接集合无重复；320～2560px 无横向溢出，手机页脚四个链接均有 44px 触控高度。
- 实际查看桌面 1440×1000 与手机模拟 390×844 的截图并核对明暗主题，底部不再重复品牌与主导航。截图在仓库根 `output/playwright/footer-dedup-desktop.png`、`footer-dedup-mobile.png`、`footer-dedup-dark.png`；未做手机真机验收。
- 记录已同步首页/UI 约定；本地 4371 预览已更新，正式网站未发布此修改。日志为 `output/search-home-20261103/footer-dedup-*.log`。

### 2026-11-03 恢复纯 HR 简化字标（已更新预览）

- 用户回忆 Logo 曾简化，随后明确确认简化版“只有 HR 字母”。只读核对仓库历史与相关素材：主站旧 `logo.png` 等同于 2026-06-17 灯塔原图；教程站已有深蓝圆角底、白色 HR 的字标，源文件 `apps/dev-guides/public/favicon.svg`，由 `0d6e0a5` 引入。
- 主站复用现有字标为 `apps/site/public/logo-hr.svg`，与教程源 SVG 的 SHA-256 均为 `757ce0245c069a9386800f37f1832fb6e5c81be352ec1aa38cac076d84026fb6`。没有重新设计或生成另一套 Logo。顶部和 favicon 共用该 SVG，分享图使用同图的 512×512 RGBA PNG 导出 `logo-hr.png`。
- 两处旧 `logo.png` 及根目录原图未覆盖、移动或删除；历史博客构建继续兼容原资产。首页/UI 约定已明确当前品牌是纯 HR，不再将灯塔作为当前主站的顶部品牌。
- Astro check 0 errors / warnings / hints；构建、合并及静态校验通过。实际浏览器确认主站 SVG 图片加载完成，favicon 与分享图均指向新资产，本地 SVG/PNG 都返回 200；页脚仍无 Logo。已查看桌面、手机模拟、明暗主题渲染，截图为仓库根 `output/playwright/hr-logo-desktop.png`、`hr-logo-mobile.png`、`hr-logo-dark.png`。
- 本地 4371 预览已更新；未发布正式网站、教程站或历史博客。日志 `output/search-home-20261103/hr-logo-*.log`。

### 2026-11-03 删除主站辅助浏览入口及专用逻辑（已更新预览）

- 用户要求删除“最新内容 / 按工具查阅”及相关代码。先核对依赖：主站没有对应的独立页面，“最新内容”是元数据浏览状态，“按工具查阅”链接独立教程站。教程站的按周、按工具目录仍被该站首页、导航、正文和搜索回退使用。用户已明确选择“只清理主站这两个入口及专用逻辑”，本轮不删除教程目录或其共享数据模型。
- 删除 `SearchHome.astro` 中两个入口、图标导入、DOM 查询、事件、最新内容状态和 URL 参数读写；删除 `search.css` 对应样式。客户端、类型、Worker 参数与搜索引擎不再接受专用 `browse` 开关；`hasBrowseFilters` 替换为只识别来源/主题/时间条件的 `hasSearchFilters`，同步移除旧专用测试并增加来源单独筛选回归。
- 保留筛选需要的元数据查询、按发布时间排序、分页、公开门禁和教程 feed。默认空首页仍零索引请求；无关键词时有效来源/主题/时间条件可以查询，清除全部条件后返回空闲首页，不再隐式进入全部内容列表。当前主站源码和搜索测试中已无旧 browse 状态、DOM/CSS 选择器及两个入口文案残留。
- 原 13 项搜索与筛选 9 项共 22/22，通过主站全部测试为 31/31；Astro check 0 errors / warnings / hints，构建、合并、静态路由/canonical/RSS 校验通过。日志为 `remove-latest-runtime-tests.log` 和 `remove-browse-*.log`，位于 `output/search-home-20261103/`。
- 真实浏览器：两个入口/旧选择器均为 0；初始索引请求 0；空关键词文件处理 28 条且倒排请求 0；来源单独 `?source=tool` 返回 9 个真实工具；图片压缩仍返回 27 条。主题/时间刷新及后退恢复正常，清除条件后结果区隐藏。已查看桌面 1440×1000、手机模拟 390×844、明暗主题截图，手机无横向溢出。截图为仓库根 `output/playwright/remove-browse-desktop.png`、`remove-browse-mobile.png`、`remove-browse-dark.png`；未做手机真机验收。
- 首页及 UI 约定已同步。独立教程站、写作台和产品部署没有改动；本地 4371 预览已更新，正式网站未发布此修改。

### 2026-11-03 移除可见搜索标题（已更新预览）

- 用户认为 placeholder 已说明用途，要求移除“想找什么？”。主站不再显示该标题，保留搜索框提示及主题/发布时间筛选；清理标题字号、查询状态标题样式和表单上方专用间距，不为已删标题保留占位。
- 保留仅读屏可见的语义 H1“知识搜索”和原表单 label，区域的 `aria-labelledby` 仍有效。旧问题文案已不在页面正文，H1 的绝对定位及 `clip: rect(0,0,0,0)` 不占可见布局，满足静态页面语义校验。
- Astro check 0 errors / warnings / hints；构建、合并及静态校验通过。实际查看桌面 1440×1000、手机模拟 390×844 和明暗主题截图；原 placeholder 保留，“图片压缩”仍返回 27 条、首屏 12 条。
- 截图为仓库根 `output/playwright/remove-heading-desktop.png`、`remove-heading-mobile.png`、`remove-heading-dark.png`；日志 `output/search-home-20261103/remove-heading-*.log`。首页/UI 约定已同步；本机 4371 预览已更新，正式网站未发布此修改。


### 2026-11-03 应用、文章菜单与联系邮箱（已更新预览）

- 用户希望“自营产品”更自然地表达本人开发的收费小应用和工具，并将“文章归档”简化为“文章”、评估 RSS 入口、增加联系邮箱。使用产品与文案审查流程，核验 MacPaw 实际官网 `https://macpaw.com/` 的导航及页脚：Logo 返回首页、不设重复 Home，Store / Blog 承担浏览入口，联系渠道放页脚。参考截图为仓库根 `output/playwright/nav-reference-macpaw-menu.png`、`nav-reference-macpaw-footer.png`；借鉴信息分工，保留本站颜色、主题、HR 字标与 Lucide。
- 主导航收为教程、文章、工具、应用、作品、关于；Logo 返回搜索首页。应用继续使用 `/products/`，页面标题和结构化数据统一为“我的应用”，描述为“我开发和维护的应用与开发工具。”；只保留原有 AurumChart、ShopThrive 及各自正式链接，不编造价格、套餐、支付或收费能力。关于页对应入口同步命名。文章仍使用 `/posts/`，不改变文章、归档、项目和工具地址。
- 主站页脚移除与顶部重复的浏览链接及可见 RSS 入口，增加可点击的“联系我 herong2023@qq.com”及现有备案链接。邮箱统一配置在 `src/config/site.mjs` 的 `CONTACT_EMAIL`。RSS 是供订阅阅读器自动获取更新的格式；`/rss.xml`、Atom、JSON Feed 和 head 中订阅自动发现继续保留，不删除订阅或改动自动发布流程。
- 历史 VitePress 导航同步六个入口，防止点击文章后仍看到旧“自营产品”菜单；历史正文、Logo、侧栏及订阅生成逻辑保持原有实现。本轮只改代码与本地预览，没有发布正式网站或更改独立产品部署。

- 代码检查：Astro check 为 0 errors / warnings / hints；主站构建、VitePress 历史构建及订阅生成、静态合并和 verify-static 均通过。合并产物仍为 3,041 HTML / 3,040 canonical，验证抽样 57 页、52 个本地资源，预览 sitemap 为 0（禁止索引）。历史语法高亮回退提示、917 个历史页面缺 H1 为原有状态，本轮未改正文。
- 浏览器交互：实际从主导航进入“我的应用”和“文章”，六个入口及 URL 在两个框架中一致；应用页标题、H1、选中菜单和两项原有链接核对通过。页脚仅有邮箱和备案两个链接，均为 44px 高；邮箱只核对 mailto，不触发邮件发送。RSS、Atom、JSON Feed 均 HTTP 200，首页 RSS alternate 仍指向 `/rss.xml`。初始首页索引请求 0；“图片压缩”返回 27 条、首屏 12 条；浏览器无 pageerror。
- 视觉检查：已实际查看首页桌面 1440×1000、手机模拟 390×844 的明暗主题、手机菜单、应用页及文章页截图；首页在 320、390、600、768、1024、1440、2560px 和 844×390 横屏无横向溢出；应用、关于、作品总目录、金融领域和 AurumChart 详情在 320px 下页脚邮箱正常、无横向溢出。手机菜单显示全部六项，Escape 可关闭。属于浏览器模拟，未做手机真机验收。
- 截图位于仓库根 `output/playwright/nav-footer-*.png`。检查、构建、合并日志及浏览器验证 JSON 为 `code/output/search-home-20261103/nav-footer-*`。首页/UI 约定已同步；本机 `http://127.0.0.1:4371/` 完整预览继续由 launchd 运行，刷新可看，正式站未部署本次改动。


### 2026-11-03 公共头部与页脚

用户确认采用各应用自行渲染、共同引用一处维护的公共头尾，保留独立技术栈和部署。本轮接入主站、历史文章、教程公开站和文件工具；完整模板、菜单、字标、邮箱备案、样式与交互统一在 `packages/site/chrome/`。搜索内容、正式 URL 及各业务功能保留。实施边界、发布依赖、预览和验证详见 [公共头尾任务](2026-11-03-shared-site-chrome.md)。未部署正式站。


### 2026-11-03 上线前作品入口修正

用户确认作品入口应是改造前的首页。`/projects/` 已恢复原六卡作品首页及原概念图/背景，主域 `/` 继续搜索。桌面与手机模拟已查看，后续上线记录见公共头尾任务。
