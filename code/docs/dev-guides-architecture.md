# 开发者工具教程子站：架构与上线边界

## 2026-10-30 当前架构

正式站为 `https://dev.herong.info/`，测试站为 `https://test-dev.herong.info/`，均已启用 HTTPS；旧 IP 子路径重定向到对应域名。写作后台为 `https://dev.herong.info/admin/`，独立 React 19 + ByteMD + Radix Primitives + Node 服务，仅已绑定的管理员微信可进入。公开站继续使用 Astro 静态页面，不提供编辑接口。文章、草稿和目录树 `.library.json` 保存在服务器私有 project 目录；目录最多 6 层，改名或移动不改变文章网址，升级代码保留全部写作数据。发布从服务器文章生成隔离快照，先测试验收，再发布正式。

以下章节保留初期架构决策，其中未启用域名、IP 写作入口和密码登录的阶段性描述已被本节及 [部署说明](../infra/dev-guides/DEPLOYMENT.md) 覆盖。公开站的 React/Radix 仍是按需集成约定，作者后台已实际使用；媒体证书跨账号迁移待办保持独立。

## 初期决策记录

日期：2026-10-20。状态：媒体 HTTPS、教程专用 IAM 凭据和真实图片上传已验证可用。新服务器两套隔离静态站已通过现有 443 子路径完成公网及浏览器验收；媒体证书续期跨账号迁移尚待专用身份授权。实际源代码位于 `/Users/ronnie/Documents/my-project/blog/code/apps/dev-guides/`。本文不改变现有官网首页、博客文章地址、工具箱或政企演示路径。涉及服务器操作前仍须完整阅读仓库的 [部署交接文档](enterprise-demo-deployment.md)，并核对线上实际配置。

## 决策

正式生产地址为 **`https://dev.herong.info/`**，测试环境地址为 **`https://test-dev.herong.info/`**，均为待启用的目标地址。`dev` 简短，覆盖 Codex、Cursor、TRAE、VS Code、Git/GitHub 等开发工作流，且不与现有 `/file-tools` 工具箱混淆。新服务器 `101.96.210.172` 属于另一个云账号；当前已验收的生产 IP 入口为 `https://101.96.210.172/dev/`，测试入口为 `https://101.96.210.172/test-dev/`，复用既有 443 和有效 IP 证书。用户已明确取消新增端口方案。备案前只使用 IP 子路径，不为这两个新子域名变更 DNS。用户已确认原云账号及 TOS 存储继续保留，只让旧服务器到期。

采用**同仓库独立 Astro 静态站**：结构化教程内容在构建时生成 HTML；浏览器端 JavaScript 仅负责站内搜索等交互。首期内容量小，静态搜索索引足够，不需要为正文读取引入常驻服务或数据库。[Astro 默认生成静态页面](https://docs.astro.build/en/guides/on-demand-rendering/)，将来确有登录、个人收藏或实时数据时，可让特定路由按需在服务器渲染；[内容集合](https://docs.astro.build/en/guides/content-collections/)适合约束每篇教程的版本、来源和状态字段。

现有 VitePress 也能生成静态 HTML、搜索、sitemap 和 RSS，若只扩充原博客路径会更省部署步骤。选择独立子站，是为了让开发者能按工具、功能或问题查找教程；短视频带来的访客也使用同一套检索和内容。Google [明确表示子目录与子域名没有固有的索引或排名偏好](https://developers.google.com/search/help/crawling-index-faq)；不能把子域名说成 SEO 捷径。

## 界面与设计系统

首页以搜索为首要任务，搜索框通过“搜索工具、功能或问题”的标签和示例说明用法。下方提供“按周 / 按主题 / 按工具”三个浏览入口：首页按首次正式发布周展示近期教程，完整周目录为 `/weeks/`，主题目录为 `/themes/`，工具目录为 `/tools/`；它们均链接到稳定的 `/topics/<slug>/` 正文。搜索匹配标题、工具别名、关键词、主题、回忆线索、摘要和正文，并可组合工具、主题和发布周筛选；URL 保留条件，结果提供总数和逐批加载。已亲测教程在有实际视频 URL 时提供视频入口，尚未实测的功能资料单独标明，不充作完整教程。

界面采用 **Astro 静态页面 + 按需 React 交互岛 + Radix Primitives + 本站 CSS 设计 tokens**。当前已运行的是 Astro、TypeScript、语义化 HTML 和少量原生 JavaScript；React 与 Radix 是后续复杂交互组件的指定组合，尚未安装或用于现有页面。简单工具筛选继续使用 HTML 单选组。出现弹层、菜单或组合选择时，通过 `@astrojs/react` 接入 React 19，再使用无样式的 Radix Primitives；不引入 Radix Themes。具体约束见 [UI 规范](ui-guidelines.md#开发工具教程子站headless-ui-约定)。颜色使用语义 tokens，另集中管理字体、间距、圆角、阴影及焦点样式；支持系统明暗偏好，并允许访客手动切换，手动选择保存在本机。

## 内容和索引规则

- 一条公开教程对应稳定地址，正文、步骤和来源在首次 HTML 响应中可见。站内搜索只是访客的入口，教程也须通过普通链接从首页/工具页可达。[Google 对链接可抓取性的说明](https://developers.google.com/search/docs/crawling-indexing/links-crawlable)。
- 候选功能与已发布教程分开：官方文档确认但尚未亲测的线索标`待实测`，若生成详情页则 `noindex` 且不加入 sitemap；完成当前版本实测、步骤与限制后才变成可索引教程。
- 当前 4 篇内容仍为 `lead`，尚未以已亲测的正式教程发布。
- 每篇教程保存具体官方条目 URL、版本/平台/套餐、测试日期、结果与失败边界、演示素材来源、视频入口、最后复核日期。第三方博主只是发现线索，视频与步骤来自自己的实操。
- 正式公开页面使用唯一标题、描述、H1、规范 HTTPS URL、清晰的工具与问题分类、移动端可复制的步骤和命令。本站通过 `src/pages/sitemap.xml.ts` 只列出真实已发布教程和符合开放索引条件的页面；缺失教程和静态资源必须返回真正的 404，不配置把任意 URL 返回首页的 SPA fallback。
- 构建时通过 `PUBLIC_DEPLOY_ENV=production|staging` 区分环境，`PUBLIC_SITE_URL` 指定实际访问地址。测试环境或任何 IP 地址构建均强制输出 `noindex, nofollow, noarchive`，robots 禁止抓取，sitemap 为空；即使生产环境暂用 IP 访问也适用。正式生产域名启用后才沿用内容自身的索引规则。
- canonical 与 Open Graph 使用本次构建的实际地址；正式上线后使用对应的 HTTPS 子域名。Google [支持子域名级站点名称](https://developers.google.com/search/docs/appearance/site-names)，可在子站首页放一致的 `WebSite` 结构化数据。

### 首次发布与周归档

公开周目录只使用 `published` 教程的 `publishedAt`，按 Asia/Shanghai 的周一至周日分组；`updatedAt` 继续表示内容复核/更新时间。后台 `.schedule.json` 与 `.library.json` 不参与公开归档，调整拍摄顺序或文章目录不会移动公开文章所属周。主题和工具页可以分区展示教程与功能资料；只有存在正式教程的相应目录页进入 sitemap，纯线索目录保持 noindex。

`author/publication-dates.mjs` 管理累计首发账本 `publish/publication-history.json`，并把同一账本写入正式 release 的非公开 `release.json`。发布器只在隔离构建快照中注入可信首发日期，不改源 Markdown；手工编辑的 `publishedAt` 不作为上线事实。测试发布只产生预览日期，正式发布激活后才确认新文章日期；首次发布跨上海日期时拒绝激活并要求重试，避免归错周。后续更新、撤回、恢复和正常版本回滚保留累计首发日期，未激活的 release 不参与恢复。

旧版已公开但缺少可靠首发日期的教程记录为 `legacyUndatedSlugs`，展示为“往期教程”，不拿最后更新日期或迁移日期补造历史。`lead` 与私有草稿不产生首发记录。账本备份及发布成功但私有历史保存失败时的处理顺序见 [线上写作台说明](../infra/dev-guides/author/README.md#首发日期账本与回滚顺序)。实际部署状态仍以部署记录为准。

## 发文流程与管理后台

2026-10-21 按跨电脑、手机发文要求，写作台扩展为独立的线上 Node 服务，入口为 `https://101.96.210.172/dev-admin/`。React 19 + ByteMD 提供编辑和预览；单作者首次设置密码后，通过 Secure/HttpOnly/SameSite Cookie 登录。所有业务 API 经认证，同源和 CSRF 检查保护写操作，服务仅监听回环地址，经现有 Nginx 443 转发。密码哈希、会话和一次性初始化码均保存在私有目录。

文章和草稿仍是 Markdown，持久保存在 `/var/lib/herong-dev-guides-author/project/`，与只读代码 release 分开；每次保存保留旧稿历史，另有每日私有备份。内容不要求数据库。仓库内初始内容不会随着网页编辑自动更新；服务器内容是线上发文来源，代码升级不得覆盖它。本机写作模式保留用于开发辅助。

作者在页面里完成：创建/保存草稿 → 填写结构化发布信息 → 加入发布内容 → 更新测试环境 → 查看 → 确认发布正式网站。草稿不进入公开集合；`lead` 是公开的待实测功能资料，不是私有草稿。正式发布继续要求真实实测信息和完整步骤，所有 Astro 字段、正文及媒体门禁保留。

服务以普通系统用户执行受限发布器，将只读代码与持久文章复制为私有快照，过滤构建环境中的上传密钥，通过检查、构建和产物验证后原子切换对应环境的 `current`。正式发布要求源码指纹与最近成功的测试发布相同；构建中内容变化也会阻止激活。公开目录为 0755、文件 0644，私有数据为 0700/0600；构建缓存位于可写快照内。旧 release 保留用于回滚，两个环境分开。

原静态脚本检测 `.author-managed` 标记后拒绝上传本地旧稿，避免与网页发文争抢内容；Git 提交尚不触发子站发布。流量统计仍独立于编辑服务。完整目录、配置、升级、备份和验证见 [线上写作台说明](../infra/dev-guides/author/README.md)。

## 教程图片与长期素材管理

采用成熟的 **S3 兼容对象存储 + 自有媒体域名 + Markdown 图片 URL**。已选用火山引擎 TOS 北京地域的私有桶 `herong-media`，教程对象独占 `dev-guides/tutorials/<slug>/<内容哈希>.<格式>` 前缀；教程专用 IAM 上传账号及凭据已创建并验证，仅允许读写这一前缀。企业素材仍在 `projects/enterprise/v1/assets/`。共享桶的公开读取范围和域名配置见 [云端启用清单](../apps/dev-guides/TOS-ACTIVATION.md)。写作台由本机 Node 服务检查图片真实格式、像素与体积，去除元数据、缩放过大的图片，上传后验证 HTTPS 公开地址，再把 URL 交给 Markdown 编辑器；线上 AK/SK 保存在服务器私有 `media.env`，由 systemd 注入写作服务；本地辅助模式使用 Git 忽略的 `.env.media.local`。两种模式都仅在服务端读取凭据。既有图片路径不会因编辑器更换而失效。[TOS 的 S3 SDK 接入](https://docs.volcengine.com/docs/TorchObjectStorage/AccessingTOSUsingAWSS3SDK?lang=zh)。

当前工作流：作者先裁剪并遮盖敏感内容 → 在写作台粘贴或拖入截图 → 写作台上传并验证地址 → 作者填写图片说明并核对步骤 → 发布教程。未配置对象存储时，编辑器明确标示“本地暂存”，文章插入 `./<slug>/<文件>`；`pnpm media:publish` 能把这类图片批量上传、验证后原子改写 Markdown。`pnpm media:check` 是构建门禁，拦住未上传、缺少替代文字或来自外站的图片。本地暂存原图被 Git 忽略；替换图片生成新对象，不覆盖旧缓存。删除无人引用的远端对象尚未自动化，清理时必须先查全站引用。页眉等通用 UI 图标继续走代码组件，教程截图走媒体流程。

**教程图片云端上传已接通，真实图片上传和 HTTPS 公开读取已验证。** `herong-media` 已在 `cn-beijing` 重建为私有桶，26 个企业素材已复制到原前缀，26/26 个公开链接及大小已验证。桶策略为企业、教程和 ACME 验证文件的指定前缀开放匿名读取；企业页面所需的 `https://herong.info` `GET`、`HEAD` CORS 已配置，页面内跨域加载仍待浏览器验收。`media.herong.info` 的 DNS、TOS 自定义域名绑定及 HTTPS 证书已完成；教程专用 IAM 凭据已接入本机写作台。现有企业素材凭据仍只能访问企业前缀，不得借用或把整桶设为公开。完整多图文章的发布、手机加载、改图与回滚仍需按下述验收流程完成。若以后引入 CDN，需要另行核对共享桶的回源权限和私有对象访问。GitHub [建议仓库尽量小于 1 GB](https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-large-files-on-github)，截图不应长期进入 Git 历史。

TOS 桶、教程上传 IAM 用户及已绑定证书留在原云账号，新服务器上的网站可直接引用现有媒体 HTTPS URL。旧 ECS 上承担媒体证书自动续期的角色与定时任务需要在旧机器关机前迁移；这项迁移尚未完成。新服务器属于另一云账号，不能默认继承原账号的角色或续期配置。

上线验收至少覆盖一篇多图教程的上传、预览、发布、手机加载、图片替换和回滚；图片失效不能在文章发布后才发现。

## 上线条件与部署隔离

新服务器 `101.96.210.172` 的 `/dev/`、`/test-dev/` 已于 2026-10-20 完成部署验收。线上写作台复用同一 443 的 `/dev-admin/`。备案前继续使用 IP 子路径，不变更新子域名 DNS；以下域名、证书和搜索收录步骤在备案条件满足后执行。

1. 至少完成一篇有亲测证据的可索引教程；从手机视频提示到站内搜索能找到它。未亲测线索可以保留在站内，但不得伪装成教程。
2. 核验新服务器所属账号、实际配置与接入备案要求；备案完成前不新增 `dev.herong.info` 或 `test-dev.herong.info` 的 DNS 记录。满足条件后，再分别接入生产与测试环境。主域名现有备案号不代表新服务器已完成接入备案，具体要求以新服务器接入商核对结果为准。
3. 域名启用时，为 `dev.herong.info`、`test-dev.herong.info` 签发和续期 HTTPS 证书，并以浏览器和命令行验证证书链、HTTP→HTTPS 跳转及规范地址。媒体域名已绑定的证书不能替代这两个网站域名的证书。
4. 生产与测试使用不同发布目录、`current` 链接及站点配置，例如 `/var/www/herong-dev-guides/production/` 与 `/var/www/herong-dev-guides/staging/`。**不得放入 `/var/www/herongsite/`**：现有博客 CI 对该目录使用 `rsync --delete`，后续博客发布会删除子站文件。
5. 先核对新服务器的实际服务和可用端口，再准备两个 IP 入口的独立 server block；备份原配置，检查 `nginx -t` 成功再 reload。正式域名启用时再配置相应主机名。静态页和资源应按真实存在路径返回 200 或 404，不回退到官网首页。
6. 子站 CI 应只构建并发布 `code/apps/dev-guides/` 的静态产物，保留现有博客和项目演示的发布边界。发布后验收首页、搜索、教程、404、`robots.txt`、`/sitemap.xml`、移动端、HTTPS 与 canonical，再向搜索站长平台提交这个 URL 列表文件。[百度普通收录说明](https://ziyuan.baidu.com/college/articleinfo?id=267&page=2)不接收索引型 sitemap。

首期统计以教程页访问、来源、搜索结果数量与点击、教程视频入口点击及回访为主。内容编辑与数据分析是两种工作：发文仍使用 Markdown/Git，数据可在 Umami 自带看板查看，当前无需开发一套统一管理后台。子站应使用独立站点 ID；可点击或扫码的每个平台、每条视频使用一致的 UTM 标记，再对比访问来源与站内行为。观众若听到域名后自行输入，访问通常会落入直接流量，无法准确归因到具体视频。

当前仅预留 Umami 脚本配置和部分搜索事件，尚未启用。启用前必须修正搜索把 `q` 写入 URL、每次输入都 `replaceState` 的行为：Umami 默认会采集 URL 查询串并监听 History API，可能记录原始词与重复页面浏览量。过滤 `q` 时保留 UTM 等合法来源参数，并以实际网络请求验收；见 [Umami 跟踪配置](https://docs.umami.is/docs/tracker-configuration/)与 [站内 README](../apps/dev-guides/README.md#可选分析)。

## 已发现的主站 SEO 问题

2026-10-20 线上 `https://herong.info/` 的 canonical 和 sitemap 仍使用 `http://herong.info`，虽然 HTTP 访问会跳转 HTTPS。本仓库 `.github/workflows/deploy.yml` 的 VPS `SITE_URL` 已改为 HTTPS；只有后续博客构建发布后线上才会更新。线上不存在的任意路径目前会以 200 返回首页，属于 soft-404；修复需要先核对实际 Nginx server block，避免影响既有项目路径。该问题与新子站分开处理。
