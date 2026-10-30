# 开发工具库独立发布

## 2026-10-30 图标规范与导航更新（当前版本）

代码提交 `60dc9fb5dc07f7c60d907cd9c57d61e774019cf7` 已推送；UI 规范及教程站开发约定统一指定 Lucide，公开教程正文和工具页面包屑使用 `@lucide/astro` 的 `ChevronRight`。写作台继续使用已集成的 `lucide-react`，未更换编辑器或交互库。

| 用途 | 当前 release |
| --- | --- |
| 写作后台代码及下次发布源 | `20261030T064019Z-committed` |
| 测试网站 | `20261030T064223Z-280abd35` |
| 正式网站 | `20261030T064412Z-64a8c58d` |

两公开环境的来源指纹均为 `b8850ccef794520d5652abbe39652b0c985347f64007ad12f4df3734affc1008`。本地 Astro 检查和构建通过，浏览器确认面包屑的 Lucide SVG、12px 尺寸及装饰性隐藏语义；线上页面与资源以 HTTP 验证。作者服务 54 项测试、类型检查、构建通过，升级及发布前后全部私有数据摘要一致。公开搜索索引仍为原有 4 篇线索，135 篇草稿保持私有。没有实测教程的 `/tools/codex/` 按既有规则不生成，返回 404；不为图标验收伪造已发布内容。

运维回执位于 `/var/backups/herong-dev-guides/20261030T064019Z-committed/`。一次连续备份因同秒文件名相同而拒绝创建第二份，原备份完整，稍后重试成功；没有关闭备份或覆盖已有归档。可回滚的后台代码为 `20261030T062733Z-committed`，公开站上一版见以下基线表。

## 2026-10-30 Git 提交与两环境发布（项目基线）

用户确认提交及发布后，教程站、微信写作后台、目录树、媒体工具和关联文档作为完整项目基线提交到 `herongdev/blog` 的 `master`，代码提交为 `0d6e0a524598db8241f0e7b4d824b8a6a5c604cc`，已推送。其他项目的工作区改动、私有配置、草稿、历史、目录元数据及生成产物未纳入。共享依赖锁仅加入教程应用及其作者应用，保留其他项目原有依赖；隔离工作区的 frozen lockfile 检查通过。提交使用 `[skip ci]`，本次教程部署单独执行，不触发原主站自动发布。

| 用途 | 当前 release | 入口 |
| --- | --- | --- |
| 写作后台 | `20261030T053945Z-committed` | `https://dev.herong.info/admin/` |
| 测试网站 | `20261030T054230Z-fa8812b5` | `https://test-dev.herong.info/` |
| 正式网站 | `20261030T054415Z-a33ebf05` | `https://dev.herong.info/` |

代码包直接由上述 Git 提交归档生成，SHA256 为 `002df778d4238e48fa3c92ac43f65d974ed9feb8286faa4236259a2d2a1b553c`，在独立 release 安装锁定依赖；服务器的 47 项 author 测试、类型检查与生产构建通过。`source-revision.json` 保存在代码 release 根目录记录提交与归档摘要，不进入公开站。

公开发布采用既有 `createPublishManager`，以 `dev-guides-author` 用户、固定域名配置和无上传/登录凭据的环境执行；每次运维发布先备份、确认没有活动任务并短暂停止写作服务，结束或失败后恢复服务。北京时间 13:42 测试站发布后完成外部验收，随后 13:44 发布正式站。两环境的源码与服务器文章指纹均为 `d31a07a7cd88e03f125fbfdc99cc905aa013f1593dc200ceb6b9e9a5d8ad6300`。没有以仓库种子文章覆盖服务器内容，没有发布草稿或改变实测状态。

操作回执位于 `/var/backups/herong-dev-guides/20261030T053945Z-committed/`，含原链接、升级及分环境发布前的数据摘要、对应发布状态和生效记录。代码升级及两次发布前后私有文章、草稿、历史和目录文件一致，管理员仍已绑定；写作服务、备份 timer、Nginx 均正常。测试和正式站的页面、搜索索引、静态资源、canonical、索引规则及缺失/私有路径按公开站验收流程核对。

可回滚版本：后台 `20261030T052507Z-library`、测试 `20261030T030821Z-bc2586d5`、正式 `20261030T031446Z-361a6601`。回滚公开站时同步核对发布回执，重新发布前必须获得与当前代码和文章匹配的测试回执；不恢复旧备份覆盖后续写作数据。本次无 Nginx、域名、证书或云权限变更。

## 2026-10-30 文章目录树与写作布局

写作后台 `https://dev.herong.info/admin/` 当前 release 为 `20261030T052507Z-library`，上一版为 `20261030T040936Z-wechat`。本次从线上已验证版本克隆，只覆盖目录存储、相关接口和测试、作者前端组件与样式、作者依赖及锁文件、部署排除规则；没有发布本地其他项目变更或重新发布公开文章。

- 左侧支持最多 6 层目录、新增子目录、重命名、移动、搜索及删除空目录；文章可归入目录或退回未分类。原有文章初始未分类，不替用户预设分类。草稿加入发布内容后保留目录，文章网址保持不变。
- 私有组织数据在 `/var/lib/herong-dev-guides-author/project/.library.json`，原子写入、0600、版本冲突拒绝覆盖；第一次真实修改前无需生成空文件。代码包排除该文件，现有项目备份自动包含它，不由 Nginx 或公开站构建提供访问。
- Radix Dialog、DropdownMenu、Select 提供无样式弹窗、菜单和目录选择。ByteMD 默认样式先于本站样式加载，修复深色工具栏和状态栏白底。桌面采用侧栏与弹性编辑区，手机切换文章列表/编辑；标题自适应高度，窄屏编辑器用编辑/预览标签。

本地及服务器新 release 的 47 项 author 测试、TypeScript 与 `/admin/` 生产构建均通过，包含目录 CRUD、重启持久化、非空删除、同名/环/深度校验、并发冲突、草稿转发布保留归属和接口鉴权。隔离数据的浏览器实测完成目录/子目录创建、重命名、目录和文章移动、搜索保留祖先、新稿自动归档、未保存正文保留、禁用非空删除、弹窗焦点；320、390、768、1440、2560px 及 844×390 横屏无整页横向溢出，深浅色均已查看。最后刷新没有控制台警告或错误。以上是浏览器模拟验收，不是手机真机验收。

线上 HTTPS 页面及新哈希资源返回 200，未登录目录 API 返回 401，私有 `.library.json` 路径及测试域名后台返回 404。主站与两个公开教程站均可访问，公开站 current 链接、文章/草稿/历史文件和已绑定管理员身份摘要在升级前后一致，首次绑定仍关闭。写作服务、Nginx、备份 timer 均 active。线上内置浏览器控制连续超时，未将其计为登录后视觉验收；视觉截图来自同一代码的本地隔离数据，测试目录和草稿没有写入生产。

操作回执在 `/var/backups/herong-dev-guides/20261030T052507Z-library/`，含原链接、持久数据摘要和生效记录；切换前完整私有备份为 `/var/backups/herong-dev-guides-author/20261030T052657Z.tar.gz`。回滚只需把后台 current 原子切回上一微信版本并重启写作服务；保留所有持久数据，不用旧备份覆盖后续文章或目录。旧版本不显示目录，但不会删除新目录文件。本次未修改 Nginx、认证配置或云权限。

## 2026-10-30 微信管理员登录

`https://dev.herong.info/admin/` 已部署微信网站应用登录，release 为 `20261030T040936Z-wechat`；上一版本 `20261030T034044Z-author-domain`。当前配置 `AUTHOR_AUTH_PROVIDER=wechat`，密码登录和密码初始化接口均返回 404，页面不再显示密码表单。公开站仍使用此前两个域名 release，本次没有发布或覆盖文章。

用户明确仅自己的微信可进入，其他微信拒绝访问。首次从本机 Git 忽略的 `code/secrets/dev-guides-author-first-login.html` 进入，用本人的微信扫码；私有初始化证明与微信返回身份都验证成功后，绑定唯一 `AppID + OpenID` 管理员并消费初始化证明。普通入口的首位扫码访客没有管理员权限。新身份和会话放在 `auth/wechat-account.json`、`auth/wechat-sessions/`，临时 state 放在 `auth/wechat-states/`；旧密码文件只保留作历史回滚，不授予微信权限。

**2026-10-30 13:02（北京时间）所有者已完成真实微信扫码绑定。** 用户此前遇到 `redirect_uri 参数错误`，确认原授权回调域仍为 `www.herong.info`；随后由用户改为 `dev.herong.info` 并完成登录。代码回调固定为 `https://dev.herong.info/admin/api/auth/wechat/callback`。服务器已核对唯一所有者文件存在、AppID 匹配、身份非空、文件权限 0600，并存在 1 个归属于该所有者且未过期的微信会话；首次绑定证明已删除。无会话访问的接口返回 `provider: wechat`、`loginAvailable: true`、`setupRequired: false`、`authenticated: false`。没有记录或展示 OpenID、UnionID、会话及密钥。微信控制台的配置和扫码由用户本人完成，未绕过电脑操作工具限制。

绑定后已执行现有私有备份服务，生成 `/var/backups/herong-dev-guides-author/20261030T050328Z.tar.gz`，权限 0600；验证包含微信所有者文件且不再包含首次绑定证明。以后直接访问 `https://dev.herong.info/admin/` 使用同一微信登录，无需再次使用本机初始化 HTML。该验收确认一次真实登录，未额外声称已完成单手机授权或用第二个真实微信测试拒绝访问。

### 私有配置和代码边界

- 网站应用 AppID 为公开标识 `wxf94e17e9fb8a187a`，与面试题项目应用不同。借鉴 `mianshiti` 的 OAuth 流程，没有使用它的密钥或数据库身份。
- AppSecret 只保存在本机 Git 忽略的 `code/secrets/dev-guides-wechat.env` 和服务器 `/etc/herong-dev-guides-author/wechat.env`，0600。systemd 从后者注入 `AUTHOR_WECHAT_APP_ID` 与 `AUTHOR_WECHAT_APP_SECRET`；不写入本文档或 Git，不放进 VITE_/PUBLIC_ 变量。
- Nginx 原 `/admin/` 代理继续固定 Host，仅新增 `access_log off`，避免 OAuth code/state 和私有文章路径进入访问日志。会话 Cookie 为 Secure、HttpOnly、SameSite=Strict；OAuth state 使用单独的短期 Lax Cookie。普通 API 的 Origin 与 CSRF 检查保留。
- 仅精确 GET 微信 callback 可跨站回跳，需一次性 state、原浏览器 Cookie 和有效期验证。微信 token 只在服务端内存用于确认身份，不落盘，不写公开响应。callback 用 303 清除 code，回到固定后台路径。
- 新界面以无 opener 窗口登录，原页面只轮询本站会话；会话过期时不丢弃未保存稿，弹窗被拦且有未保存稿时不整页跳走。取消按钮只停止等待，授权本身由微信处理。
- 发布构建继续只继承白名单环境；服务器验证过实际 AppSecret 不在作者前端 dist。部署器后续排除所有 `*.env`，安装器遇到已绑定的微信账号不再生成新初始化证明。

### 验收和回滚

本地和新服务器代码版本的 39 项 author 测试通过，含 12 项微信 OAuth 回归；另有 14 项本地隔离 UI 流程检查、TypeScript 与 `/admin/` 生产构建通过。覆盖 state 错误、重放、过期、缺 Cookie、并发、错误初始化证明、其他微信拒绝、旧密码会话隔离、CSRF、重启、退出及 Strict Cookie 不随跨站 callback 发送时的旧会话撤销。均使用模拟微信响应，没有创建真实管理员或请求受限控制台。

上线后真实 HTTPS 检查页面/静态资源、微信 start 的 AppID/scope/固定 callback、短期 Cookie、取消和重复 callback、密码接口 404、私有 API 401、跨站 start 403、测试域名后台 404、原 IP 跳转及其他根站点通过。该 smoke 流程只生成并取消一条不含初始化证明的登录尝试，没有调用真实微信 token 接口。Chrome 原生浏览器工具超时，未将其作为浏览器视觉或扫码验收证据；单手机授权同样未验收，当前参考方案是网站桌面二维码。

切换前后的文章/草稿/历史及原认证文件摘要一致；公开站 current 未变，Nginx/写作服务/续期 timer 均 active。操作备份 `/var/backups/herong-dev-guides/20261030T040936Z-wechat/` 保存旧 service.env、systemd unit、Nginx snippet、链接、私有文件摘要、准备和生效回执；另运行既有私有备份服务。

回滚须配套恢复旧后台 current/previous、旧 service.env、unit 与 Nginx snippet，`daemon-reload`、重启写作服务、`nginx -t` 后 reload。私有文章和后续真实微信绑定数据保留，不用旧备份覆盖。旧版是密码界面且可能仍未初始化；所有者完成微信绑定后不能把代码回滚视为自动可用的登录恢复，应优先修复微信版本，并再次确认恢复方式。微信配置文件可继续保留为 root 专用，不公开或清除账号权限。凭据轮换时只安全替换 wechat.env 中 Secret 并重启本服务，不改变已绑定的 AppID/OpenID。

## 2026-10-30 写作后台域名迁移（后续认证已改为微信）

写作入口已改为 **https://dev.herong.info/admin/**。正式和测试教程站地址仍为 `https://dev.herong.info/`、`https://test-dev.herong.info/`；两个公开站 release 本次均未切换。旧 IP `/dev-admin` 和 `/dev-admin/…` 仅 GET/HEAD 以 308 跳转，保留原始转义路径和查询串；POST 等其他方法返回 405，防止旧表单跨源重发凭据或正文。浏览器跳转可继承原 fragment，服务端不接收初始化码。

实际后台版本为 `20261030T034044Z-author-domain`，上一版 `20261030T030754Z-domain-publish`。由已部署版本克隆，只重新构建作者前端 base 为 `/admin/`，没有打包工作区的其他界面改动，也没有重建公开教程。服务仍只监听 `127.0.0.1:24320`；Nginx 的正式域名 443 代理到该地址，测试域名不提供写作入口。

- `/etc/herong-dev-guides-author/service.env`：`AUTHOR_PUBLIC_ORIGIN=https://dev.herong.info`、`AUTHOR_BASE_PATH=/admin/`、`AUTHOR_PUBLISH_TARGET=domains`。
- 正式域名 include `/etc/nginx/snippets/herong-dev-guides-author-domain.conf`，源为 [`author/nginx-author.conf`](author/nginx-author.conf)，固定 Host 为 `dev.herong.info`。
- IP server 原 snippet `/etc/nginx/snippets/herong-dev-guides-author.conf` 改为 [`author/nginx-author-ip-redirects.conf`](author/nginx-author-ip-redirects.conf)；不再代理登录或写入请求。
- Cookie 保留 Secure、HttpOnly、SameSite=Strict，并使用新 Path `/admin/`；旧 IP Cookie 不会带到域名，需要重新登录。密码、会话文件和一次性初始化码未重置。私有初始化 HTML 已只替换入口前缀，权限仍 0600，不在本文档记录码值。
- 后续 `author/deploy.py` 在构建前只读取、验证线上 `AUTHOR_BASE_PATH`，避免代码升级重建回旧路径；`install.py` 的新安装默认采用域名配置，已有 service.env 不覆盖。

已通过 22 项公网 HTTPS、前端资源、API 认证、Origin 拦截、旧链接跳转和站点边界检查；另在隔离临时目录用新域名和 `/admin/` 运行 11 项认证/发布配置测试，包含 Cookie Path、CSRF、会话重启和退出。错误 Host 在回环接口返回 403；未登录文章/图片/发布 API 返回 401，旧入口 POST 返回 405，测试域名 `/admin/` 和后台私有文件路径返回 404。未以测试身份初始化真实后台，所有者仍需本人设置密码。浏览器已打开新入口，但用户切换了 Edge 活动页，内置浏览器控制又超时，因此本次没有声称完成新的浏览器内登录或发文验收。

迁移前后 `project` 和 `auth` 全目录聚合哈希一致，公开站 current 未变；Nginx、写作服务和既有续期 timer 均 active。继续使用已配置自动续期的正式域名证书，不需新增证书或 DNS。IP 和域名都可以使用有效 HTTPS；域名直接解析及同机 Nginx 不隐藏源站公网 IP。

私有备份目录：`/var/backups/herong-dev-guides/20261030T034044Z-author-domain/`，含原 service.env、两个旧 Nginx 文件、current/previous 链接、数据摘要、准备与生效回执。迁移前另执行现有完整私有备份服务。第一次切换验证紧随 Nginx 异步 reload 读到旧路由 404，已自动恢复原配置；第二次加入有界就绪检查后成功，后续独立公网检查通过。

回滚需停止写作服务、恢复该备份内的 service.env、两个原 Nginx 配置以及后台 current/previous 链接，移除新增 domain author snippet，再 `nginx -t`、启动写作服务并 reload Nginx。等待路由就绪后核对旧 IP 的页面与认证接口，并将本机私有初始化 HTML 的地址前缀恢复；不要复制备份覆盖后续新增的文章、草稿或认证文件。公开站、TOS 和证书无需回滚。

## 2026-10-30 公开站域名切换实录（后台随后迁移）

本节记录先完成的公开站切换，覆盖下文 2026-10-20/21 的公开站 IP 入口；其中后台 IP 状态已由上一节的新迁移记录覆盖。服务器仍为 `101.96.210.172`，标准 HTTPS 443。

| 用途 | 当时入口 | 本次版本 |
| --- | --- | --- |
| 正式教程站 | `https://dev.herong.info/` | `20261030T031446Z-361a6601` |
| 测试教程站 | `https://test-dev.herong.info/` | `20261030T030821Z-bc2586d5` |
| 写作后台 | `https://101.96.210.172/dev-admin/` | `20261030T030754Z-domain-publish` |

两个 A 记录均已核对为新服务器，未发现对应 AAAA 记录。HTTP 跳到各自 HTTPS；旧 IP 的 `/dev/`、`/test-dev/` 通过 308 去掉原前缀并保留后续路径、查询参数，跳到对应域名。`/dev-admin/` 保持原来的 HTTPS IP 登录、Cookie Path、Host 和 CSRF origin，首次初始化文件仍适用；本次未设置或重置所有者密码。

### 证书和入口

- 新增实际配置 `/etc/nginx/conf.d/herong-dev-guides-domains.conf`，对应仓库 [`nginx-domains.conf`](nginx-domains.conf)。正式站不再加全站 `noindex` 响应头；测试站所有响应继续禁止索引。各自静态目录、共享哈希资源和真实 404 保持隔离。
- 现有 `/etc/nginx/snippets/herong-dev-guides-ip-paths.conf` 已替换为 [`nginx-ip-redirects.conf`](nginx-ip-redirects.conf) 的重定向内容。不要同时保留旧 `^~ /dev/` 静态 location，否则会抢先匹配；独立写作后台 snippet 不变。
- 两个独立 Certbot lineage 为 `/etc/letsencrypt/live/dev.herong.info/` 与 `/etc/letsencrypt/live/test-dev.herong.info/`，本次证书有效期至 **2027-01-28**。没有输出或移动私钥。
- HTTP-01 webroot 为 `/var/www/herong-dev-guides-acme`，两域名的 `/.well-known/acme-challenge/` 持续由此提供。证书工具为 `/opt/ask-around-test/certbot/bin/certbot`，复用服务器已有 ACME 账号。
- 复用已启用且 active 的 `ask-around-cert-renew.timer`。虽然名字来自旧项目，它运行的是默认配置目录的 `certbot renew`，每 6 小时检查所有该目录内的 lineage，成功续期后 reload Nginx。本次对两个新 lineage 分别执行 `renew --cert-name <域名> --dry-run --no-random-sleep-on-renew --run-deploy-hooks --deploy-hook 'systemctl reload nginx'`，两次均成功。不要因名称而另建重复 timer；该任务与媒体 TOS 证书迁移待办不是同一件事。

### 发布代码与文章保护

`/etc/herong-dev-guides-author/service.env` 已增加 `AUTHOR_PUBLISH_TARGET=domains`。新增 `author/publish-profiles.mjs` 将发布目标固定为正式/测试两个域名根路径；默认 `ip` 保留旧部署兼容，非法值直接拒绝。正式发布必须匹配最近成功测试发布的内容指纹及测试站 URL，不能拿旧 IP 测试回执直接发布域名站。

本次从线上已有代码版本 `20261021T081902Z` 克隆新版本，只覆盖 3 个运行时文件和 2 个相关测试文件，没有将其他本地工作区修改一起发布。13 项发布/profile 测试在本地及新服务器代码版本通过。公开站用现有发布器从 `/var/lib/herong-dev-guides-author/project/src/content/tutorials/` 重建，顺序为测试构建、测试站验收、正式构建和正式站验收；没有用本地旧文章覆盖服务器。直接调用发布器的短暂维护期间停止写作服务，结束后重新启动，避免两个进程同时写发布状态。

两环境的源码指纹均为 `f60b0aeeaba21e64a9b0c92ccbe7d52a581cba412c2678b587e3072b4aed622a`。迁移前后 `project`（含文章、草稿、历史）及 `auth` 目录的聚合哈希均一致。当前仍是 4 篇 `lead`，没有擅自改成已亲测或发布用户的新文章。正式域名 robots 允许抓取，但无 `published` 教程时首页/目录和 lead 页面保持 `noindex`，sitemap 为空；真实教程通过后台正式发布后会按原规则进入 sitemap。测试域名始终全站禁止索引。

### 验收和回滚依据

已通过两域名真实 TLS 访问、首页/深层资料/搜索索引、首页引用的 `_astro` 资源、robots/sitemap/canonical 检查；不存在页面、缺失资源、隐藏配置及 author 私有路径为真实 404。Edge 实测测试站用“两个任务”搜索得到 Codex 功能资料，点击进入同一测试域名；正式域名已在 Edge 正常渲染。内置浏览器控制接口超时，因此未将其视为完成验收的证据。

旧 IP 根及深层链接（含查询参数）已验证 308 到对应域名；原 IP 根站、`herong.info` 主站和写作入口保留，未登录发布 API 继续要求认证。此次没有改页面设计、主站路由、云账号权限或 TOS 图片配置。

操作备份为 `/var/backups/herong-dev-guides/20261030T030247Z-domains/`，保存原 IP snippet、service.env、原 current/previous 链接和最终 `activation.json`。完整私有写作数据备份由 `herong-dev-guides-author-backup.service` 在切换前生成，位于原私有备份目录；不要公开或提交备份。

可回滚的原公开站版本：production `20261021T082116Z-3dd9d210`、staging `20261021T082104Z-47bb1384`，原后台代码 `20261021T081902Z`。域名和 IP 构建的 base 不同，不能只回滚一个 `current`：应先停止写作发布，按备份恢复匹配的代码/配置、两环境 current 和 IP snippet；域名入口临时停用或维护，`nginx -t` 成功后 reload。恢复对应私有备份中的发布回执，或重新跑完整测试→正式发布来生成匹配回执；不要覆盖切换后新增的文章、草稿或认证数据。证书 lineage 可保留，待重新启用域名时继续使用。

以下旧部署命令和状态保留作历史依据。现有两环境由线上写作台管理，不能使用旧静态上传命令覆盖文章。

2026-10-21 写作入口调整为登录保护的线上服务 `/dev-admin/`，详见 [线上写作台](author/README.md)。启用 `.author-managed` 的两环境由网页发布管理，下面原本地静态上传命令仅保留作历史与未接管环境参考，不能覆盖线上文章；代码升级改用 `python3 infra/dev-guides/author/deploy.py`。

目标服务器由本次用户明确改为 `101.96.210.172`。旧服务器 `115.190.214.176` 不再是本工具默认目标。用户已确认复用 **现有 HTTPS 443，通过 `/dev/` 与 `/test-dev/` 区分环境**，不开放 8443/8444。正式域名为 `dev.herong.info`，测试域名为 `test-dev.herong.info`，备案完成前不配置解析和域名证书。

2026-10-20 已完成两个 443 子路径入口的部署、公网访问及浏览器验收；媒体证书续期迁移仍待专用身份授权。`root@101.96.210.172:22` 通过现有密钥 `/Users/ronnie/.ssh/beszel_101_96_210_172` 连接。服务器为 Python 3.9.21、Nginx 1.20.1，现有 443 根路径由 ask-around 使用，必须保留。远程操作前完整阅读 [`enterprise-demo-deployment.md`](../../docs/enterprise-demo-deployment.md)，其中旧项目的服务器约定由本次用户对教程站的新要求覆盖；博客与其他演示的目录和服务保持原有边界。

## 云账号与媒体依赖

新服务器属于另一个云账号。现有 `herong-media` 桶、教程上传 IAM 子账号、`media.herong.info` 的 TOS 绑定及证书留在原账号，静态站通过公开 HTTPS 图片链接使用它们。2026-10-20 重新验证教程图片返回 200，媒体证书有效期至 2027-01-18。不要因网站换账号而重建桶、撤销现有上传凭据或修改媒体 CNAME。

用户已确认只让旧服务器到期，原账号与 TOS 存储继续保留，本次不迁桶或替换教程上传用户。媒体证书的 Certbot、同步任务和 `HerongMediaCertRenewal` 实例角色仍运行在旧服务器 `115.190.214.176`；尚未完成迁移。旧服务器到期前必须迁走任务并配置访问原账号资源的适当授权。不能认为新账号服务器已拥有原账号的实例角色权限。

新机已准备专用 SDK venv、隔离配置目录及跨账号钩子/服务模板；新机 16 项单元测试和 systemd 模板检查通过。尚未传输媒体 lineage/ACME 账号、尚未安装启用媒体 timer，也未创建新密钥。原账号 IAM 创建草稿已停在审阅页：`herong-media-cert-renewer`，编程访问开启、控制台访问关闭，仅绑定现有 `HerongMediaCertRenewal`；提交及授权待用户确认。

## 当前 443 部署与验收（2026-10-20）

| 环境 | 当前 Release ID | 公网入口 |
| --- | --- | --- |
| production | `20261020T152805Z-9b793f65e635` | `https://101.96.210.172/dev/` |
| staging | `20261020T152717Z-987f9c4af8cf` | `https://101.96.210.172/test-dev/` |

实际 Nginx 入口仍为 `/etc/nginx/conf.d/ask-around.conf` 的 IP 443 server，仅增加 include `/etc/nginx/snippets/herong-dev-guides-ip-paths.conf`。变更前原配置、片段及撤下的两份端口配置归档在 `/var/backups/herong-dev-guides/20261020-ip-paths/`。`nginx -t` 与 reload 成功；没有更改安全组。

两个公网入口均通过 TLS 验证并返回 200。服务器内部核对全部可直接访问产物的 SHA256、各环境八条真实 404、目录页、canonical 与禁止索引响应头；根 `/` 原站仍返回 200。Chrome 访客窗口实测按“两个任务”搜索、结果详情跳转、刷新恢复查询、主题切换及刷新持久化，另验证测试环境 Cursor 筛选及链接仍落在 `/test-dev/`。当前内容仍为四篇待实测资料，未虚构已亲测教程。首个子路径版本没有兼容的旧版本回滚目标。

## 旧端口方案的部署记录（2026-10-20，已废弃）

已使用原有专用密钥接入新机，并部署两个独立版本：

| 环境 | Release ID | HTTPS IP 入口 |
| --- | --- | --- |
| production | `20261020T151043Z-a83abd5cbcd1` | `https://101.96.210.172:8443/` |
| staging | `20261020T150958Z-b84f4640b370` | `https://101.96.210.172:8444/` |

Nginx 配置为 `/etc/nginx/conf.d/herong-dev-guides-ip.conf`、`/etc/nginx/conf.d/herong-dev-guides-staging-ip.conf`；变更前完整配置及模板备份为 `/var/backups/herong-dev-guides/20261020-ip-initial/`。`nginx -t`、reload 成功。两套环境均通过服务器本地 TLS 访问、全部公开产物 SHA256、六条真实 404、禁止索引响应头及详情页 canonical 校验；原有 443 根网站仍返回 200。首次发布没有上一版本，不虚构回滚目标。

外部对 8443/8444 的连接均超时，未完成公网验收。用户随后明确改用现有 443 子路径；之前的放行端口建议已取消，以上地址不再作为访问方案。旧 Nginx 配置已归档并撤出生效目录，仓库旧端口模板已移除。当前使用 `nginx-ip-paths.conf`。域名 DNS 和域名证书均未启用。

## 本次撤回记录（2026-10-20）

用户变更部署目标后，刚新增的 `dev.herong.info -> 115.190.214.176` A 记录已在 DNS 控制台停用，状态为“已暂停”；媒体 CNAME 仍启用。未提交旧测试名 `dev-dev`，也未创建 `test-dev` 解析。递归 DNS 可能保留旧记录至 TTL 到期。

旧服务器上仅为本次教程站新增的 HTTP 503/ACME 引导配置已撤出生效目录，归档为 `/var/backups/herong-dev-guides/withdraw-20261020T145121Z/dev.herong.info.conf`；`nginx -t` 和 reload 成功，Nginx 及媒体证书同步 timer 保持 active。该服务器未发布教程站内容，未签发教程站证书。原有博客和媒体服务继续保留。

## 两个独立环境

| 环境参数 | 独立目录 | 已验收的 IP HTTPS 入口 | 备案完成后的规范地址 |
| --- | --- | --- | --- |
| `production` | `/var/www/herong-dev-guides` | `https://101.96.210.172/dev/` | `https://dev.herong.info/` |
| `staging` | `/var/www/herong-dev-guides-staging` | `https://101.96.210.172/test-dev/` | `https://test-dev.herong.info/` |

两个入口均使用现有 443。`--public-url` 只传 origin `https://101.96.210.172`，通过 `--base-path /dev/` 或 `/test-dev/` 指定路径；脚本强制检查环境对应路径，不允许串槽或继续使用旧端口。SSH 的 `--port 22` 与网站入口无关。只有公网验收成功后才能称为已可访问。无论环境参数是什么，**任何 IP 预览和 staging 页面均必须为 `noindex, nofollow, noarchive`，robots.txt 禁止抓取**。脚本会验证这些构建结果，Nginx 也发送对应 `X-Robots-Tag`。

公开站只发布 Astro `dist/` 静态文件。本机 `127.0.0.1:4331` 写作台、`author/`、`drafts/`、`.env.media.local`、上传 API 与凭据不上传。服务器无需 Node/pnpm，不运行 Astro 开发服务器。

每个环境目录结构相同，但资源完全独立：

```text
releases/<release-id>/
  web/                 # 唯一公开根目录
  manifest.json        # 文件 SHA256 和字节数，在公开目录外
  release.json         # 环境、origin、base_path、实际地址、构建时间、Git HEAD
current -> releases/<release-id>
previous -> releases/<previous-id>
shared/_astro/         # 只在本环境内增量保留历次哈希资源
incoming/              # 上传压缩包，完整校验成功后移除
last-deployment.json   # 最近切换与上一 release
```

禁止发布到 `/var/www/herongsite/`，原博客 CI 会对该目录执行 `rsync --delete`。不要自动清理其他项目、旧 release 或共享资源。目录 755、文件 644；不设置 777，不关闭 SELinux、防火墙或 SSH 主机验证。

## 首次准备

由主任务核对新服务器实际 Nginx、磁盘与内存。在 `/etc/nginx/conf.d/ask-around.conf` 中**已有 IP 443 server 内**添加对 [`nginx-ip-paths.conf`](nginx-ip-paths.conf) 的 include，例如保存到 `/etc/nginx/snippets/herong-dev-guides-ip-paths.conf` 后引用。这个片段只有 `/dev/`、`/test-dev/` 对应的 location，不是完整 server 配置；保留原 `location /` 到 `127.0.0.1:13000` 的代理、80/ACME 和其他站点配置。安装前备份实际 Nginx 配置，`nginx -t` 成功后才 reload。片段使用 `root` 和限定前缀 rewrite，不使用 alias 或全局正则 location，也不添加 CSP。

新入口直接复用原 server 已有的有效 IP 证书 `/etc/letsencrypt/live/101.96.210.172/{fullchain.pem,privkey.pem}`。现有 `ask-around-cert-renew.timer` 每 6 小时执行续期并 reload 整个 Nginx；本次不修改证书文件、续期任务或其授权，也不为未备案域名申请证书。无需增加端口、修改安全组或放宽系统策略。

部署脚本只负责构建、上传、校验和切换版本，不修改 DNS、Nginx、证书、防火墙或其他 CI。root 负责首次目录与配置；以后如改为部署用户，仅授予这两个目录的必要权限。

## 构建与发布

在 `blog/code` 执行：

```bash
python3 infra/dev-guides/deploy.py --environment staging --public-url https://101.96.210.172 --base-path /test-dev/ --build-only
python3 infra/dev-guides/deploy.py --environment staging --public-url https://101.96.210.172 --base-path /test-dev/ --identity-file /Users/ronnie/.ssh/beszel_101_96_210_172
python3 infra/dev-guides/deploy.py --environment production --public-url https://101.96.210.172 --base-path /dev/ --build-only
python3 infra/dev-guides/deploy.py --environment production --public-url https://101.96.210.172 --base-path /dev/ --identity-file /Users/ronnie/.ssh/beszel_101_96_210_172
```

先验证 staging，再发布 production。两次构建分别设置 `PUBLIC_DEPLOY_ENV`、只含 origin 的 `PUBLIC_SITE_URL` 和 `PUBLIC_BASE_PATH`，不能把一套构建产物直接复制到另一环境。HTML、搜索索引与静态资源地址必须包含相应 base。生产发布不会覆盖 staging 的文件；staging 的 release 也不能作为生产回滚目标。

工具先运行该应用的 `astro check`、媒体检查和静态构建，只打包 `dist/`；拒绝符号链接、私有路径和非静态文件。上传到唯一 release 后，校验压缩包及全部文件的 SHA256 和大小，再原子切换 `current`。`_astro` 哈希资源按环境增量保留，旧浏览器和回滚版本继续可用。并发切换以该环境的文件锁串行执行。

可选参数：`--host 101.96.210.172 --user root --port 22 --release 20261020T150000Z-example --identity-file /Users/ronnie/.ssh/beszel_101_96_210_172`。任务专用环境变量为 `DEV_GUIDES_DEPLOY_HOST`、`DEV_GUIDES_DEPLOY_USER`、`DEV_GUIDES_DEPLOY_PORT`、`DEV_GUIDES_DEPLOY_IDENTITY_FILE`。默认密钥路径就是上面的已确认文件；工具仅检查该路径是普通文件，不读取或输出密钥内容。SSH/scp 均使用 `-i` 和 `IdentitiesOnly=yes`，并要求已有已知主机指纹匹配。`--stage-only` 只上传校验，不切换；`--build-only` 不发出任何 SSH。不要借参数切换到本次任务未经用户指定的服务器。

构建来自当前工作区，发布元数据记录 Git HEAD 和相关文件是否存在未提交改动。它不是“该提交已经包含所有内容”的声明。失败的未激活 release 会保留供排查；修正问题后使用新的 release ID，不能覆盖旧 release。

## 验收和回滚

对 `/dev/` 和 `/test-dev/` 分别检查：首页和已存在资料页为 200；对应前缀下的不存在页面、缺失 `_astro` 资源、`.env.media.local`、`author/`、`drafts/` 为真正 404；CSS/JS MIME 正确。两环境错误页必须留在各自路径，不能落入 ask-around 或另一环境。HTML robots、响应头和 robots.txt 均应禁止索引，canonical 必须包含正确的 IP 与 base。验证根 `/` 的 ask-around 功能不变；用浏览器检查搜索、资料链接、主题切换和手机布局。

```bash
python3 infra/dev-guides/deploy.py --environment staging --rollback PREVIOUS_RELEASE_ID
python3 infra/dev-guides/deploy.py --environment production --rollback PREVIOUS_RELEASE_ID
```

回滚先复核对应环境旧 release 的完整性与 origin/base 元数据，再原子切换 `current`，无需重启服务；使用当时保存的规范地址，不传 `--public-url` 或 `--base-path`。脚本输出上一 release，`last-deployment.json` 保留最近切换记录。旧 8443/8444 构建不含正确子路径，不能作为本方案的直接回滚目标；每个环境首次子路径发布尚无兼容旧版本时应明确说明。未来切换域名也须同时保留可恢复的 Nginx 路由方案，不能只切回不匹配 base 的静态版本。

## 备案完成后的域名切换

先确认备案、DNS 与两套独立 HTTPS 证书，再安装审阅后的域名 server 配置；两个域名仍通过正常 443 的 SNI 分流。正式环境重新以 `--environment production --public-url https://dev.herong.info --base-path /` 构建发布；测试环境用 `--environment staging --public-url https://test-dev.herong.info --base-path /`。测试域名继续全站禁止索引。验证 HTTPS、规范地址和 sitemap 后，关闭或重定向临时 IP 子路径，避免同一内容出现多个可索引地址。证书续期由服务器已有运维体系接入并实测，本脚本不负责证书生命周期。

当前只有 4 篇明确标注“待实测”的 `lead` 资料，原有正式内容规则也要求这些页面保持 noindex，sitemap 为空。IP 可访问代表预览部署成功；架构文档中“至少一篇亲测、可索引教程”的正式内容条件仍须真实满足，不得为了上线改写亲测状态。独立 GitHub Actions 尚未接入，原博客工作流不变。
