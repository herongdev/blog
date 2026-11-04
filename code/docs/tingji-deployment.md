# 声稿（原听记）独立站点部署

用户要求何荣（herong2023@qq.com）的听记应用官网部署在 herong.info 下，允许创建子域名。2026-10-13 已创建并上线 `https://tingji.herong.info/`，`/privacy/`、`/support/`、`/privacy/versions/2026-10-13/`。

源码镜像：`code/apps/tingji-site/`。政策源在 voice-transcriber 项目，详见站点 README。部署脚本 `code/infra/tingji/deploy.sh`；Nginx 配置镜像 `code/infra/tingji/tingji.herong.info.conf`。

目标 `root@115.190.214.176`；独立根 `/var/www/tingji`，`releases` 完整产物，`current` 原子链接。与博客 CI 的 `/var/www/herongsite/` 严格分开，避免 rsync --delete 影响。不改首页导航、现有应用和旧部署流水线。

证书由服务器现有 Certbot 账号通过 webroot `/var/www/tingji/acme` 申请，自动续期；首次证书到期 2027-01-11。HTTP 转 HTTPS；ACME 路径保留。静态缺失文件返回 404，不返回首页；访问日志关闭，错误日志仍依系统策略处理。更改 Nginx 前备份独立配置，`nginx -t` 成功后 reload，失败恢复，不重启其他服务。

回滚：从 `/var/www/tingji/previous-<release>.txt` 取上一 current 目标，创建临时软链接后 `mv -Tf` 原子切换。首次 HTTP 配置备份 `/var/www/tingji/initial-http.backup`。所有旧 release 与历史政策保留，不自动删除。

首次验收：域名解析正确、独立 SSL 证书签发、Nginx 测试成功，公网页面返回 200，HTTP 跳转与缺失文件 404；官网主站与 chat 子站也做只读回归。浏览器自动化服务不可用，尚未完成官网的浏览器视觉验收；不能用 HTTP 200 代替布局验收。界面截图来自应用真实 Widget 的虚构演示内容。

## 2026-10-14 声稿 / SonaDraft 品牌同步

用户确认应用中文名「声稿」、英文名「SonaDraft」。沿用现有域名与独立部署边界，同步官网、支持页及政策；没有迁移域名或改动博客首页和 Nginx 配置。新 current 为 `releases/20261014T084736Z`，回滚目标为 `releases/20261013T082454Z`，记录在 `/var/www/tingji/previous-20261014T084736Z.txt`。

2026-10-14 政策 JSON 已与 App 的唯一政策源逐字段比对，当前页和归档公开可访问；2026-10-13 归档字节保持不变。缺失静态资源返回 404，herong.info 与 chat.herong.info 只读 HTTP 检查通过。服务器可用空间 16 GB。应用截图为生产 Widget 的虚构演示记录渲染，浏览器视觉验收仍待完成。

## 2026-11-04 本地提交前审查

本轮仅校正独立发布脚本和说明，未连接服务器、部署或更新证书。上面的 release、证书到期时间、磁盘容量均为当时记录，不作为当前状态保证；本站仍使用旧服务器 `115.190.214.176`，不随主站迁移至新服务器。

`deploy.sh` 现在只允许 `root@115.190.214.176`，SSH 与 rsync 均启用 `StrictHostKeyChecking=yes`、`BatchMode=yes`。脚本要求既有独立站点和有效的旧 release，拒绝越界链接及同名版本；记录上一 `current` 后上传，激活前再检查基线。切换后验证首页、隐私页、支持页和政策 JSON，HTTPS 解析固定到既有目标服务器。连接中断或健康检查失败会尝试原子恢复上一版本，但只恢复仍指向本次 release 的 `current`，不覆盖并发发布；不清理任何 release、不修改 Nginx 或其他项目。

隔离部署测试 10/10 通过，覆盖成功、上传失败、健康失败、激活响应丢失、前后两阶段的并发切换保护、错误主机、越界目标、同名版本及绝对旧链接；使用临时目录和假的 SSH、rsync、curl，没有真实远程操作。并发分支通过模拟 `current` 变化验证，未执行真实多进程的 `flock` 竞争测试。`bash -n` 通过。

静态检查通过：6 个 HTML、89 处引用中的 72 处本域链接/资源和 6 处片段锚点有效；6 条 canonical 与 sitemap 一致，robots 指向正式 sitemap。镜像政策 JSON 与原项目 `code/assets/legal/privacy-policy.json` 字段及字节一致，版本 `2026-10-14`，SHA256 为 `91295256be94217ac7813a633907481ba965c00eafe154cdf528f4844971a4cb`；当前页和对应归档都包含源政策的全部 20 段标题/正文。两份历史政策未改动。复跑命令见站点 README。

本轮未做 UI 布局改动或浏览器验收，不能据此宣称页面视觉或真实部署已通过。
