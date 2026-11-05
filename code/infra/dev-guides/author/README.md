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
2. AI 配套文章可通过“导入 Markdown”选择文件或粘贴全文，也可直接将带 YAML 信息头的整篇文章粘入正文编辑器。预览识别结果后应用到当前工作稿，核对并保存；标题、摘要、来源等一并带入，不用重复填表。“发布信息”默认收起，可按需修正；缺少真实实测依据时不填写亲测记录。导入不上传本地图片等资源，也不改变当前文章地址。
3. 完成草稿后点“加入发布内容”；未实测内容选择“功能线索”，有完整实测证据才选择“实测教程”。
4. 在当前内容的“发布”页签生成本文预览，检查页面、图片与搜索。
5. 确认已检查的本文预览后发布正式网站。只推进选中文章的固定修订，其它文章沿用已确认的线上版本，不夹带未确认的工作稿。

保存不改变线上页面。服务器构建仍会校验字段、实测信息、正文与图片；正式发布要求源码、选定的不可变内容投影及 `previewId` 与最近成功的测试发布一致，且回执 URL 匹配当前测试环境。预览后继续编辑不会改写已确认的快照。失败时保留当前网站版本。网页保存使用版本冲突检查，多设备编辑同一篇文章时不会静默覆盖。旧正式站缺少修订基线时，须先停写、备份，并从核对过的公开内容显式导入基线；不能把当前工作稿直接当作线上版本。

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
| 本周/其它拍摄队列与历史 | `/var/lib/herong-dev-guides-author/project/.schedule.json` |
| 私有拍摄准备与只读调研来源 | 上述目录中的 `.filming.json` |
| 选题整理预检、原数据与恢复回执 | 上述目录中的 `.editorial-curation/` |
| 旧稿历史 | 上述目录中的 `.history/` |
| 不可变文章修订、线上指针与预览计划 | 上述目录中的 `.article-revisions/` |
| 私有制作素材、分片与版本关系 | 上述目录中的 `.content-workspace/` |
| 视频发布队列、私有账号会话与投稿素材 | `/var/lib/herong-dev-guides-author/publishing/`（可由 `PUBLISHER_DATA_DIR` 配置） |
| 微信管理员身份、私有会话与首次绑定证明 | `/var/lib/herong-dev-guides-author/auth/` |
| 发布状态、隔离构建快照 | `/var/lib/herong-dev-guides-author/publish/` |
| 累计正式首发日期与旧教程日期缺失记录 | `/var/lib/herong-dev-guides-author/publish/publication-history.json` |
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

日备份 timer 为 `herong-dev-guides-author-backup.timer`，默认保留全部备份。备份递归包含整个 `project`，因此包含文章、草稿、历史、`.library.json`、`.schedule.json`、`.filming.json`、`.editorial-curation/`、`.content-workspace/` 和 `.article-revisions/`；另包含认证、发布状态、首发账本，以及视频发布数据库的一致 SQLite 快照、素材与账号会话。权限为 root 专用，不进入 Git、不由 Nginx 提供访问。普通在线 tar 不能保证项目内多个文件处于同一时点；工作区、修订和文章的完整恢复基线须在停写或一致文件系统快照下备份，不能仅凭日备份成功宣称已完成恢复演练。私有云对象另需独立副本，项目归档不包含其远端字节。

目录、排期、拍摄准备、调研来源、整理回执、工作区和修订应随对应文章一起恢复。发布队列恢复时先禁用执行器，并逐项核对备份后可能已经投稿的任务，不能直接重新跑旧队列；详见[发布中心说明](../../../docs/dev-guides/publishing-integration.md)。当前备份在同一服务器，需按实际运维要求另做异地保管。可用 SSH 将备份下载到本机 Git 忽略的 `code/secrets/`；恢复前先停写作服务并保留当前数据副本。

私有制作素材默认本地存储。需要 S3 兼容存储时，按 `apps/dev-guides/author/workspace.env.example` 创建 `/etc/herong-dev-guides-author/workspace.env`（root 所有、0600）；service 可选读取该文件，不复用公开图片凭据。模板只是配置说明，不创建桶或改变桶策略。本轮仅修订代码与模板，未更改线上配置。

## 首发日期账本与回滚顺序

公开站按周归档使用首次正式发布日期，按 Asia/Shanghai 的周一至周日分组，与私有拍摄排期、文章目录及 `updatedAt` 独立。`author/publication-dates.mjs` 在隔离快照中注入 `publishedAt`，不改作者原稿；测试日期只作预览，成功切换正式 `current` 后才确认新首发记录。新文章构建跨上海日期时拒绝激活，重新发布即可。旧版已公开而无法确认首发日期的教程保留为 `legacyUndatedSlugs`，不补造历史周。

累计账本为上述 `publish/publication-history.json`（0600），正式 release 的 `release.json` 同时保存 `publicationHistoryVersion`、`firstPublishedAtBySlug` 与 `legacyUndatedSlugs`；后者位于公开 `web/` 外。累计记录保留撤回文章的首发事实，正常回滚不清空它。服务启动和发布前会合并私有账本与当前正式 release 的确认记录；未激活 release、测试发布及手工编辑的日期不能作为首发证据。

若后台提示“网站已发布；发布日期已保存在当前版本，私有历史备份将在下次发布前恢复”，说明公开版本已经生效，不能当作发布失败盲目重发或直接回滚。**先保留当前 release 的元数据和私有数据备份，排除账本写入故障，使用当前版本的恢复逻辑补齐并核对 `publication-history.json`，再执行公开版本回滚。** 未恢复就切回旧 `current`，可能失去尚未落入私有账本的那次首发记录；不能从未激活目录或文件更新时间猜测补回。代码回滚同样保留累计账本，避免以后重新上线把旧教程归到新周。

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


## 2026-11-02 视频发布中心上线

- 当前作者服务 release：`20261102T142731Z`，正式入口仍为 `https://dev.herong.info/admin/`。独立执行器为 `/opt/herong-social-publisher/releases/20261102T134337Z`，通过 `current` 与 0600 的 `publishing.env` 引用；四个平台执行组件就绪，真实账号登录和投稿未执行。
- Chromium / Python / FFmpeg 可执行文件位于 `/opt`，不放在安装器会递归设为 0600 的私有数据目录。CentOS 的系统 `ffmpeg-free` 无法解析 H.264，正式使用 `PUBLISHER_FFPROBE` 指定的固定完整构建。
- 真实服务用户及 systemd 限制下通过两种 Chromium 启动、11 项 Python 离线测试、16 项 Node 发布测试及 H.264 文件探测。线上登录页、静态资源和未登录权限检查通过；未伪造管理员身份验收内部页面。
- SQLite 备份辅助进程使用 DB 所属的服务账号与 `mode=ro`，父进程继续保管 root 私有归档。备份服务仅对发布子目录开放 WAL/SHM 辅助文件写入；停服和运行中备份、重新启动及快照完整性均通过。自定义发布数据目录时须同步调整备份 service 的 `ReadWritePaths`。
- 原有 150 个项目文件、3 个认证文件内容完全保留；没有重发测试或正式教程站。上线后完整私有备份为 `20261102T142947Z.tar.gz`，剩余磁盘约 7.1 GiB；素材总额度 2 GiB、单视频 512 MiB。视频备份仍为全量并保留全部历史，异地与留存策略未配置。
- 部署回执、配置备份与代码回滚脚本：`/var/backups/herong-dev-guides-author/20261102T134248Z-before-publishing/`。原始回滚基线为 `20261030T080026Z-committed`；`previous` 指向本次中间版，完整回滚应使用保存的 `rollback-code.py`。不还原历史任务队列，不删除发布私有数据。

详细运行版本、来源摘要、边界与验收见 [发布中心集成说明](../../../docs/dev-guides/publishing-integration.md)。


## 2026-11-04 内容入口与工作区升级

- 当前作者 release `20261104T084824Z`，上版 `20261103T164143Z-brand`。源码包 SHA256 `f9fcff26df62aac1e4991b8cade1631a131d14d0a08192277faa7578e5e22171`。已启用文章/视频/资源直接添加入口与内容工作区；146 项回归在服务器的服务账号与 systemd 约束下通过。Edge 原生控制连续超时/采集错误，本轮未完成实际视觉与交互验收，不将接口或 SSR 检查当成 Edge 验收。
- 原正式网站仍为 `20261103T165200Z-10631a44`。通过历史源码、发布前归档和正式 manifest 的全部哈希建立准确四篇已发布基线，未把当前工作稿当成线上版，也未重发公开站。
- 152 个原项目文件及 3 个认证文件内容摘要全部保持一致。停写全备为 `20261104T090838Z.tar.gz`，上线后验证备份为 `20261104T091128Z.tar.gz`；配置、链接、基线回执和维护模式回滚脚本在 `/var/backups/herong-dev-guides-author/20261104T085306Z-content-entries/`。
- 生产使用本地私有存储，`workspace.env` 设置单文件 256 MiB、工作区 512 MiB；投稿器同为 256 MiB / 512 MiB。剩余磁盘约 2.9 GiB，上传、分片合并、私有云缓存及投稿导入加入实际文件系统可用空间检查，保留 512 MiB。没有删除历史版本或其他项目数据。全量日备份仍保留所有归档，应在大规模素材使用前落实扩容、异地备份与留存策略。
- Python 执行器切为 `20261104T085306Z-content-entries`，修复私有运行目录下 Stealth 脚本定位。新源码锁的 8 文件摘要核验；依赖锁完全一致后，通过指向旧 release 的绝对链接复用只读 venv/浏览器/FFmpeg/biliup。旧运行版本不得清理，不运行新 setup 改写共用依赖；服务配置下四个平台组件 ready，未运行真实登录或投稿。
- 两阶段部署：`deploy.py --stage-only` 只准备候选代码/依赖；迁移与停写备份完成后，执行输出的候选 installer `--activate-only`。回滚使用保存的 `rollback-code.py`，保留当前私有数据并禁用旧版网站/平台发布，待修订与任务核对完成后恢复；不能直接让旧发布器批量发布新工作稿，也不能回放历史任务数据库。

完整证据见 [本次上线记录](../../../docs/tasks/2026-11-04-content-entry-release.md)。


## 2026-11-04 工作型选题整理与共享组件

- 作者服务当前 release `20261104T140757Z`，上版 `20261104T101219Z`。原 138 条导入选题保留 10、可恢复归档 128；另 3 条非本批内容保留，活动内容 13。按工作用途组织为改动管理、排错定位、交付验收三个共享目录，排期与内容库共用。
- 新增独立拍摄准备与只读来源；不覆盖文章正文或已发布版。12 处下拉共用 Radix `AuthorSelect`，7 个弹窗复用 `AuthorDialogContent`，图标按钮复用 `IconButton`，统一开关动效。
- 停写备份 `20261104T140903Z.tar.gz`，激活后备份 `20261104T140905Z.tar.gz`；回执在 `/var/backups/herong-dev-guides-author/20261104T140757Z-work-curation/`。157 个原有非目标文件、认证、环境配置和公开站/执行器链接保持原样。165 项测试、类型检查和构建通过；Edge 部分桌面画面已看，最终动画、拖动全过程和窄屏主题视觉验收未完成。
- 具体选题、验证及数据回滚限制见 [本次整理记录](../../../docs/tasks/2026-11-04-work-focused-content-curation.md)。代码回滚本身不撤销归档数据，也不能覆盖上线后的作者编辑。

## 2026-11-05 完整 Markdown 导入

- 作者代码 release `20261104T165017Z`（UTC），上版 `20261104T163128Z`；支持 AI 完整 Markdown 文件/整篇粘贴、信息头自动识别与预览、确认后应用工作稿及手动保存。发布信息默认收起，新草稿不再预填 TODO，工具栏标签保持同行。
- 停写一致备份 `20261104T165507Z.tar.gz`，回执 `/var/backups/herong-dev-guides-author/20261104T165017Z-markdown-import/`。165 个项目文件摘要保持一致，认证、配置、公开站及执行器链接保持原样。首次导入功能部署 `20261104T163128Z` 仅更新代码管理的 `templates/tutorial.md`，没有重写旧稿。
- 180 项回归与构建通过；Edge 隔离环境桌面深色完成整篇粘贴、取消、错误输入、应用与保存核对。线上 HTML 与 16 个 JS/CSS 文件摘要一致，权限与私有路径检查通过；窄屏、浅色和手机真机视觉未覆盖。
- 云端「开发者知识微课制作」Skill 已加入文章元数据契约并重新下载核对；GPT 直送插件尚未启用。完整证据与范围见 [导入记录](../../../docs/tasks/2026-11-05-author-markdown-import.md)。

## 2026-11-05 视频上传反馈与平台入口

- 作者 release `20261104T171716Z`，前版 `20261104T165017Z`；选定文件后立即展示准备、传输和校验保存状态，成片页可直接进入账号及文案配置，准备期间防重复请求。新成片限 MP4/MOV/M4V/WebM，MKV 原片继续可保存，历史 MKV 成片可读但准备投稿时提示转换。
- 183 项测试及构建通过，Edge 隔离环境实际打开选择器、上传预览并带入发布中心。未真实投稿；COS/TOS 当前仍未配置启用。
- 停写备份 `20261104T171838Z.tar.gz`，回执 `/var/backups/herong-dev-guides-author/20261104T171716Z-video-upload/`。165 个项目文件、认证、配置与公开站/执行器链接保持原样。详细范围见 [本轮记录](../../../docs/tasks/2026-11-05-video-selection-publishing.md)。

## 2026-11-05 抖音登录二维码恢复

- 作者 release `20261104T174057Z`，前版 `20261104T171716Z`；执行器 release `20261104T174054Z-douyin-login`。同条件对照确认 `TasksMax=128` 导致 Chromium 页面崩溃，调整为 512 后生成二维码；2 GiB 内存限额及既有隔离保持不变。
- 错误反馈区分登录页不可用、没有二维码、扫码超时和检查失败；执行故障不再误报账号会话失效。187 项 Node、29 项选择性 Python 测试及生产构建通过。
- Edge 后台已实际显示抖音二维码；本人未完成扫码，该次登录超时，尚未验收会话保存或真实投稿。停写备份 `20261104T174434Z.tar.gz`，回执 `/var/backups/herong-dev-guides-author/20261104T174057Z-douyin-login/`，165 个项目文件及认证、配置、公开站保持原样。
- 新执行器复用 `20261104T085306Z-content-entries` 的只读依赖，该旧版本不可清理或原地重装。完整证据、源码摘要及回滚限制见 [登录修复记录](../../../docs/tasks/2026-11-05-douyin-login-recovery.md)。

## 2026-11-05 抖音二维码自动更新

- 作者 release `20261105T022731Z`，执行器 `20261105T023853Z-douyin-qr`；同步平台自动换图，移除错误的二维码有效时间，增加安全停止后重新获取的入口。45 秒仅为保守展示窗口，不能当作抖音承诺的有效期。
- 后续用户手机实测已能进入确认登录页面；该次后台操作仍超时、尚未保存会话。手机是否点击确认及确认后的回传尚待核实，不能称账号已连接。
- 198 项 Node、49 项选择性 Python 测试及构建通过；服务器组件实际发送两张不同二维码。线上真实登录自动到二维码版本 3，仍未完成手机扫码成功及会话保存验收；Edge 完整截图验收因连续标签切换与控制超时未完成。
- 停写备份 `20261105T024316Z.tar.gz`，回执 `/var/backups/herong-dev-guides-author/20261105T022731Z-douyin-qr/`。165 个项目文件、认证、配置及公开站保持原样，旧二进制依赖 release 继续保留。详见 [二维码更新记录](../../../docs/tasks/2026-11-05-douyin-qr-refresh.md)。
