# 工具容器迁移

沿用现有单个 Next.js + FFmpeg 镜像，不增加 Redis、数据库或 worker。主机由 `115.190.214.176` 迁往用户指定的 `101.96.210.172`。主站容器与工具容器分开发布；本目录不改变工具业务或数据格式。

已盘点的旧部署：容器 `light-tools-web`，持久卷 `light-tools_light-tools-data`，私有挂载 `/opt/light-tools/secrets`，镜像 ID `sha256:ff137343c228a2b9330afcb9e81ab9ddc853d6d25421b01d66002d1685e968f6`。每次迁移前重新核对，不依据这些记录覆盖新数据。新机使用独立卷 `herong-light-tools-data`、回环 `127.0.0.1:3001`、Compose 项目 `herong-light-tools`；部署目录 `/opt/herong-light-tools/`，私有运行配置 `runtime.env` 和 `secrets/`，代码版本在 `releases/<release-id>/`。

## 路径与运行配置

本次先沿用 **`/file-tools` 编译时 basePath**，以原镜像迁移数据和会话。生产主站菜单暂用 `https://herong.info/file-tools`；IP 隔离入口使用 `https://101.96.210.172/file-tools`。若启用 `tools.herong.info`，可先让其根入口重定向到主站 `/file-tools`，或在工具域名继续使用 `/file-tools`。不能只改 Nginx 就把现有镜像变成域名根路径部署。

原 Next.js 镜像沿用 `trailingSlash=false`：**`/file-tools/` 由 Next.js 308 到 `/file-tools`，后者 307 到目录 `/file-tools/tools`，目录最终返回 200**。新入口和旧→新桥接的精确 `location = /file-tools` 都必须完整代理，并与 `/file-tools/` 前缀使用一致的 upstream；不能由边缘把无斜线入口反向 308 到带斜线，否则会与 Next.js 形成重定向循环。验收逐段检查状态、Location 和最终目录 200，并验证工具内部 API、转换和下载不丢失 basePath。

以后根路径工具站需要单独重新构建 `NEXT_PUBLIC_BASE_PATH` 与 `NEXT_PUBLIC_SITE_URL`，同步内部链接、Cookie、下载、API、登录和已启用的支付通知地址，并保留旧 `/file-tools` 兼容入口。不要在本次数据迁移中混入这一变化。

`compose.yaml` 的 `env_file.format: raw` 要求 **Docker Compose 2.30+**，避免密码中的 `$` 或引号被再次解释。保留旧运行环境、会话密钥及私有证书，不打印其内容。未确认配置是否包含多行值前不能将 Docker `Config.Env` 直接逐行拼成 `.env`；多行值需要经过验证的配置转存方式。本次执行者已核对现有环境可采用 raw 文件；后续版本仍应复核。

## 一致性备份与空卷恢复

在旧主机运行：

```bash
bash /path/to/reviewed/migration/backup.sh /var/backups/herong-light-tools/20261024T120000Z
```

备份脚本读取容器的真实 `/data` 命名卷与已安装镜像，短暂停止**工具容器**，将数据、私有 Docker manifest、挂载的 secrets 和校验和存到新的 0700 目录。即使备份失败也尝试恢复原运行状态。不会打印环境值、下载新镜像或操作其他服务。备份 manifest 含凭据，文件权限为 0600；经 SSH 安全复制到新机及私有异地副本，不进 Git、公开目录或工单。

默认备份完成后重新启动旧工具。正式切换时显式设置 `TOOLS_KEEP_STOPPED=1`，仅在整份备份成功后让原本运行中的旧工具保持停止，防止最终备份后继续写入；任何失败仍尝试恢复原运行状态：

```bash
TOOLS_KEEP_STOPPED=1 bash /path/to/reviewed/migration/backup.sh /var/backups/herong-light-tools/<final-release-id>
```

原镜像用 `docker save` 导出并校验后导入新主机；新机只需运行，不在紧张磁盘上重建整仓。数据归档与镜像分别计算 SHA256。复制后在新主机恢复：

```bash
TOOLS_DATA_VOLUME=herong-light-tools-data \
bash /path/to/reviewed/migration/restore.sh /absolute/private/backup-directory
```

恢复脚本验证完整性，只创建或恢复**空卷**；目标卷已附着到容器或非空时拒绝覆盖。它不恢复私有配置。执行者单独将 secrets 恢复到 `/opt/herong-light-tools/secrets/`，以 0700/0600 保存，并从私有 manifest 恢复运行环境到 `runtime.env`，不改变会话密钥；不要把 macOS UID/GID 带入服务器数据。持久卷只由工具容器访问，不进入主站 release 或旧博客 rsync 目录。

预览可先复制旧数据验证。正式切换顺序为：新机预先导入核验过的原镜像、暂存配置与私有证书 → 显式 `TOOLS_KEEP_STOPPED=1` 停旧工具并完成最终一致性备份 → 恢复到新机空卷 → 启新工具并验健康和真实转换 → 将**旧主机**的 `/file-tools/` 边缘转发到新机字面 IP `https://101.96.210.172`，Host/SNI 固定 `herong.info`、开启 CA 验证、保留完整 `/file-tools` 前缀 → 校验两条入口均进新工具 → 切 DNS。

这一临时旧入口代理让仍命中 DNS 缓存的请求也到新工具，避免两端同时接收转换、账号或订单而产生数据分叉；不能把旧代理回源写成 `https://herong.info`，否则旧 DNS 缓存或解析变更可能造成循环。新机只代理本地 3001，不反向代理旧工具。旧容器保持停止 standby，原数据卷不删除。在旧 Nginx 规则测试通过前不开放新机正式写入入口；切换失败恢复旧入口前，先确认新端是否已有写入，必要时停止新端做最新一致性备份再恢复到另一个空卷，不能直接用较旧的备份覆盖新数据。

Nginx reload 返回时新 worker 不一定已接管。旧工具刚停、桥接刚 reload 后立即检查可能仍命中旧 worker 的 `127.0.0.1:3001` 而返回 502，不能因此误判跨机 TLS 失败。用 HTTP/1.1、`Connection: close` 的新连接做有界健康重试，例如 8 次、间隔 1 秒；确认响应经新 upstream。最终失败才回滚，结合 error log 中真实 upstream 地址区分旧 worker、网络、TLS 和新进程失败，不关闭证书验证。

旧→新桥接必须显式设置 **`proxy_ssl_verify_depth 3`**，保留 `proxy_ssl_verify on`、Host/SNI `herong.info` 和旧机实际 CA `/etc/pki/tls/certs/ca-bundle.crt`。2026-10-24 实际证书链在 depth=2 包含 ISRG Root YE：旧机用同一 CA 的 OpenSSL `-verify_depth 1` 报 `certificate chain too long`，`-verify_depth 3` 验证通过；Nginx 默认 depth=1 会出现 upstream 证书验证失败。curl 自身验证通过不能证明 Nginx 的默认深度也足够。

本次故障同时包含 reload 后第一条请求命中旧 worker，以及后续新 worker 的真实证书深度失败；不能只检查第一条 error 就归因。修复后，执行者先在旧机独立回环临时 server 代理新主站健康接口，已验证 Nginx 的真实 HTTPS upstream，再移除临时 server 并重做工具最终快照。后续跨机代理变更同样先隔离验证，避免反复冻结真实工具数据。这些是事务验收要求，本目录备份/激活脚本不加入固定等待时间。

## 版本切换

准备 `/opt/herong-light-tools/releases/<release-id>/compose.yaml`，以及仅包含引用的 `release.env`：

```dotenv
TOOLS_IMAGE=light-tools-web:<verified-release-id>
TOOLS_PORT=3001
TOOLS_DATA_VOLUME=herong-light-tools-data
TOOLS_RUNTIME_ENV=/opt/herong-light-tools/runtime.env
TOOLS_SECRETS_DIR=/opt/herong-light-tools/secrets
```

镜像标签必须指向核验过的原镜像或新版本，不能从不确定的 `latest` 拉取。准备后运行：

```bash
bash /path/to/reviewed/migration/activate.sh <release-id>
```

脚本不输出展开后的 Compose 配置，以固定项目启动并等待 `/file-tools/api/health` 返回 `{ "ok": true }`。健康后原子更新 `current`、`previous`；健康失败恢复上一镜像。新机边缘使用 [主站工具 snippet](../../site/nginx/edge-tools.conf)，只新增独立 `/file-tools/` 规则，不覆盖既有 IP 根站和教程路径。

回滚时运行上一 release 的 `activate.sh` 参数对应旧 release，或用相同脚本指定旧 release ID。数据保持原样。**应用镜像回滚不等于数据库回滚**：若升级涉及数据格式变化，先用已验证备份和独立恢复计划，不自动覆盖数据。本次首次迁移使用相同原镜像避免引入 schema 变化。

验收包括真实上传 → 转换 → 下载、FFmpeg 可执行、登录/会话、额度或会员信息、管理入口、重启后持久数据、旧 `/file-tools` 链接及已启用的支付回调。健康接口只能证明进程可响应，不能替代真实转换。迁移过程保留旧机和备份，最终记录镜像摘要、备份校验、volume、release、Nginx 备份与回滚路径。
