# 线上教程写作台

代码与公开教程站仍在同一仓库。写作台以独立 Node 服务运行，文章、草稿、修改历史和登录状态保存在服务器私有目录，公开站继续由 Astro 生成静态 HTML。

## 入口与使用

- 写作台：[https://dev.herong.info/admin/](https://dev.herong.info/admin/)。
- 测试网站：[https://test-dev.herong.info/](https://test-dev.herong.info/)。
- 正式网站：[https://dev.herong.info/](https://dev.herong.info/)。

**2026-10-30 当前状态：**两个公开网站域名已接通，旧 IP `/dev/`、`/test-dev/` 以 308 转向对应域名路径。后台已迁移至正式域名的 `/admin/`，旧 IP `/dev-admin/` 的 GET/HEAD 请求以 308 跳转，其他方法返回 405，避免旧表单跨源重发密码或正文。认证数据、草稿与文章持久目录保持不变；随后已部署微信认证，密码登录接口在当前模式下关闭；所有者已于当日 13:02（北京时间）完成本人扫码绑定，首次绑定证明已消费；没有发布新的教程。

管理员已完成首次绑定，以后直接打开写作台使用同一微信登录。本机 `code/secrets/dev-guides-author-first-login.html` 中的首次绑定证明已失效。初始化证明放在 URL fragment，页面读取后立即移除，仅在同源 start JSON 请求中发送；微信回调验证成功并绑定管理员后删除该证明。不把第一位普通访客自动设为管理员，其他微信不能查看文章或使用任何写入、图片与发布接口。不要把初始化链接提交到 Git 或发送给他人。

当前采用微信网站应用扫码（`snsapi_login`），应先在电脑完成首次绑定；这不是公众号网页授权，单手机登录尚未验收。登录在新窗口进行，原页通过同源会话检查等待结果；会话过期重登时原页未保存文章保留，勿刷新或关闭原页。

1. 新建草稿，编辑正文并保存；粘贴或选择截图后等待上传成功。
2. 在“发布信息”填写类型、搜索线索、官方来源、版本、实测记录及可选视频链接。手机可用表单，不必直接编写 YAML。
3. 完成草稿后点“加入发布内容”；未实测内容选择“功能线索”，有完整实测证据才选择“实测教程”。
4. 点“更新测试环境”，检查页面、图片与搜索。
5. 点“发布正式网站”，确认后更新。发布覆盖“发布内容”中的全部文章；草稿不公开。

保存不改变线上页面。服务器构建仍会校验字段、实测信息、正文与图片；正式发布要求源码和内容与最近成功的测试发布一致，且该回执 URL 匹配当前测试环境。失败时保留当前网站版本。网页保存使用版本冲突检查，多设备编辑同一篇文章时不会静默覆盖。

## 文章目录管理

目录树实现位于 `author/src/ArticleLibrary.tsx` 与 `author/library-store.mjs`，实际线上生效版本见 [部署说明](../DEPLOYMENT.md)。目录只用于写作台内部组织，不直接改变公开网站的导航或文章网址。

- 左侧可按目录名、文章标题或文章地址搜索；深层匹配保留祖先路径。已有文章默认出现在“未分类”，无需移动 Markdown 文件。
- 支持新建目录、子目录、重命名和跨父级移动，最多 **6 层**。同一父目录不能重名，不能把目录移到自己或自己的后代中。
- 选中目录后新建的草稿归入该目录；文章也可单独选择目标目录或移回“未分类”。移动目录会连同其子目录及文章的组织关系一起调整，**不修改文章 slug、正文、图片路径或公开网址**。草稿加入发布内容后保留原分类。
- 只能删除空目录。有文章或子目录时需先移走内容，目录操作不删除文章。目录更新采用版本冲突检查，其他窗口已修改时刷新目录并提示重试，保留当前未保存稿。

目录及文章归属保存在私有项目数据 `project/.library.json`，不是代码配置。本机模式使用 `apps/dev-guides/.library.json`；线上使用下表中的服务器路径。文件按 0600 原子写入，内部以稳定目录 ID 和文章 slug 保存关系；API 再投影为当前草稿或发布内容的归属。未进行目录操作时可以没有该文件。不要提交本机目录数据、打入代码发布包或复制到公开站；线上代码升级必须保留服务器原文件。

## 目录与权限

| 用途 | 服务器路径 |
| --- | --- |
| 只读代码、独立 Node 24 LTS/pnpm 运行时 | `/opt/herong-dev-guides-author/` |
| 持久文章与草稿 | `/var/lib/herong-dev-guides-author/project/` |
| 私有目录树与文章归属 | `/var/lib/herong-dev-guides-author/project/.library.json` |
| 两周拍摄排期、待拍顺序与历史 | `/var/lib/herong-dev-guides-author/project/.schedule.json` |
| 旧稿历史 | 上述目录中的 `.history/` |
| 微信管理员身份、私有会话与首次绑定证明 | `/var/lib/herong-dev-guides-author/auth/` |
| 发布状态、隔离构建快照 | `/var/lib/herong-dev-guides-author/publish/` |
| 服务配置与目录受限的图片凭据 | `/etc/herong-dev-guides-author/` |
| 每日私有备份 | `/var/backups/herong-dev-guides-author/` |

服务为 `herong-dev-guides-author.service`，使用无登录用户 `dev-guides-author`，仅监听 `127.0.0.1:24320`。Nginx 通过正式域名既有 443 的 `/admin/` 转发，剥除路径前缀并设置固定 Host；不开放公网新端口。媒体 AK/SK 由 systemd 读取 `media.env` 注入服务，不传给前端或公开站构建子进程。

当前 `AUTHOR_AUTH_PROVIDER=wechat`。身份绑定 `AppID + OpenID`，UnionID 不扩大权限；微信会话与旧密码会话隔离。Cookie 设置 Secure、HttpOnly、SameSite 和专用 Path；变更接口同时验证 Origin 和会话 CSRF token，发起登录有限流。短期 OAuth state 由服务端存储并单次消费，同时使用 Lax Cookie 绑定发起浏览器；仅精确 GET callback 接受跨站返回。服务端通过固定官方接口换取身份，不持久化微信 access_token，不向前端提供 AppSecret。旧密码实现仅留作历史回滚兼容，当前模式的密码初始化和登录接口返回 404。安全约定参考 [OWASP 会话管理](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html)。代码运行时固定为 [Node 官方 LTS](https://nodejs.org/en/about/previous-releases) 的 24.22.0，并校验官方归档 SHA256。

## 代码升级与内容维护

在仓库 `code/` 目录运行：

```bash
python3 infra/dev-guides/author/deploy.py
```

该命令先只读获取并验证服务器 `AUTHOR_BASE_PATH`，按该路径构建写作台界面、打包白名单代码、通过专用 SSH 密钥上传校验、安装锁定依赖、保留上一代码版本并重启本服务。**升级不覆盖服务器上的文章、草稿、目录树或登录状态。** 本机 `.library.json` 属于私有写作数据，不能随代码包替换线上目录组织。首次安装默认 `https://dev.herong.info/admin/`、域名发布模式和微信认证；已有配置保留。首次安装还需传入已校验的 Node Linux x64 归档，并单独安全配置 `media.env`、`wechat.env`，接入 Nginx 前验证服务已启用认证。`wechat.env` 仅包含 `AUTHOR_WECHAT_APP_ID`、`AUTHOR_WECHAT_APP_SECRET`，root 所有、0600；不要使用 `VITE_` / `PUBLIC_` 变量保存密钥。微信开放平台授权回调域须设为 `dev.herong.info`，代码回调固定为 `https://dev.herong.info/admin/api/auth/wechat/callback`。

启用线上写作后，服务器持久内容是发文内容源。本地 `src/content/tutorials/` 不会随网页编辑自动更新；原静态部署工具检测到 `.author-managed` 时拒绝新发布，防止本地旧稿覆盖线上文章。代码升级与文章发布分开执行。

日备份 timer 为 `herong-dev-guides-author-backup.timer`，默认保留全部备份。备份递归包含整个 `project`，因此包含文章、草稿、历史、`.library.json` 和 `.schedule.json`，另包含认证及发布状态，权限为 root 专用；不进入 Git、不由 Nginx 提供访问。目录与排期数据应随对应文章数据一起恢复；恢复旧备份会回到当时的目录组织和拍摄安排，不能只用代码回滚替代数据恢复。当前备份在同一服务器，需按实际运维要求另做异地保管。可用 SSH 将备份下载到本机 Git 忽略的 `code/secrets/`；恢复前先停写作服务并保留当前数据副本。

## 回滚与验证

代码回滚：检查 `/opt/herong-dev-guides-author/previous`，将 `current` 原子切回对应已验证版本并重启本服务；持久内容保持原样。公开站仍保留分环境的 release、`current` 和 `previous`，具体静态版本回滚见 [部署说明](../DEPLOYMENT.md)。应先停止网页发布任务再做运维回滚。

上线验收：未登录的内容/图片/发布 API 为 401；跨站和错误 CSRF 请求被拒绝；私有路径返回 404；登录与退出、重启后的会话、截图上传、草稿保存重开、多设备版本冲突、两环境发布及现有根站点正常。首次微信扫码绑定由站点所有者完成，不为验收伪造身份或正式教程。

## 公开站域名与后台地址分离（2026-10-30）

线上 `/etc/herong-dev-guides-author/service.env` 已设置 `AUTHOR_PUBLISH_TARGET=domains`。该配置仅接受 `ip`、`domains`，未设置时默认 `ip`，不接受浏览器提交的任意发布地址。

| 模式 | 测试发布地址 | 正式发布地址 |
| --- | --- | --- |
| `domains`（当前） | `https://test-dev.herong.info/` | `https://dev.herong.info/` |
| `ip`（兼容） | `https://101.96.210.172/test-dev/` | `https://101.96.210.172/dev/` |

公开站接通后，写作后台也已迁移：`AUTHOR_PUBLIC_ORIGIN=https://dev.herong.info`、`AUTHOR_BASE_PATH=/admin/`；Nginx 固定 Host 为 `dev.herong.info`，前端构建 base 和 Cookie Path 均为 `/admin/`。原 IP Cookie 不会自动带到域名，需要重新登录；域名迁移时没有重置旧认证数据。随后微信迁移使用独立 `wechat-account.json` / `wechat-sessions/` / `wechat-states/`，原密码状态不授予微信权限。所有者已完成真实扫码，唯一身份和有效会话已核对；初始化证明已删除，原初始化 HTML 不能再次授予管理员权限。绑定后私有备份为 `20261030T050328Z.tar.gz`（0600）。

发布器使用服务器持久内容创建隔离快照，不从代码包的旧稿覆盖线上文章。切换模式后必须重新发布测试环境；内容指纹相同但 URL 属于旧 IP 的回执也不能授权正式域名发布。使用一次性运维脚本直接调用发布器时须先停止写作服务，避免两个进程同时修改发布状态。

域名切换保留现有 4 篇 `lead`，没有将未实测资料改成正式教程。正式站符合规则的 `published` 教程才可进入 sitemap；暂无正式教程时首页和目录保持 `noindex`，线索页始终不收录。测试站全站禁止索引。证书与路由的详细执行记录见 [部署说明](../DEPLOYMENT.md)。

## 2026-10-21 实际部署与验收

- 写作台代码 release：`20261021T081902Z`；上一版：`20261021T081509Z`。
- 从真实服务发布成功的测试站 release：`20261021T082104Z-47bb1384`；正式站 release：`20261021T082116Z-3dd9d210`。
- 实际服务用户完成检查、构建和原子切换，证明只读代码与可写构建缓存兼容 systemd 限制；服务器仍保留约 19GB 磁盘空间。
- 22 项接口与发布测试通过；本地真实浏览器完成 320/390px、桌面、深色、草稿创建保存、重开和刷新。公网 HTTPS 登录入口已在浏览器查看；真实公网 API 验证草稿版本冲突、CSRF 拦截、图片上传和读取、两环境发布、重启后会话保留及退出撤销。
- 未登录内容与发布 API 返回 401；配置、草稿和源码路径返回 404；原根站与两个公开教程入口仍为 200。
- 验收使用的临时身份已移出服务认证目录，不能继续登录；站点所有者仍需本人首次设置密码。初始化文件保存在本机 Git 忽略的 `code/secrets/dev-guides-author-first-login.html`，权限 0600，文档不包含初始化码或密码。
- 验收草稿已移入私有历史归档，没有发布为教程。公开内容仍是原来的 4 篇待实测资料。
- 日备份 timer 已启用；恢复所有者初始化状态后的备份 `20261021T082449Z.tar.gz` 已另下载到本机 Git 忽略的 `code/secrets/`。持续自动异地备份尚未配置。
- 本次代码与文档尚未提交 Git；部署来自工作区文件，不代表某个 Git 提交已包含全部内容。

## 2026-10-30 半年选题入库

- 写作台当前代码 release：`20261030T062733Z-committed`，对应提交 `7622fcde3da105fe63358ef7a94343747ac82513`；54 项服务端测试、前端类型检查和构建通过。工具列表补齐 Git、Chrome DevTools、Claude Code、ZCode、ttok、Remotion。
- 用户授权将已有研究入库：主计划 78 个（26 周，每周 3 个）、备选 52 个、近期精选 8 个；新增 135 篇私有草稿，DG004/DG006/DG125 复用原稿并归档，没有覆盖原文。后台共有 139 篇文章，其中原有 4 篇，新增草稿 135 篇；42 个目录、138 个选题归属。
- 数据仍在 `/var/lib/herong-dev-guides-author/project/`；标题、搜索词、来源、演示提纲已预填。所有新增稿件标记 `draft` / 待实测，未填虚构验证或视频地址。来源核对时间保留 2026-10-27，不能视为拍摄当天已重新确认。
- 导入前后均已私有备份，导入后备份为 `20261030T062833Z.tar.gz`。运维回执在 `/var/backups/herong-dev-guides/editorial-20261030/`；具体事务回执在项目 `.editorial-imports/`。重复预检确认 138 项全部保留，不产生第二份稿件。工具用法见 [写作台说明](../../../apps/dev-guides/author/README.md)。
- 线上入口与静态资源 200，未登录文章/目录 API 401，私有文件及草稿公开地址 404。测试、正式公开站 release 均保持原样，搜索索引仍各有原来 4 篇线索；本次没有发布计划稿。隔离环境验证了 135 篇草稿可读取、保存重开和目录结构；线上验证为持久数据、权限、HTTP 与资源检查，未以伪造管理员身份验收。
