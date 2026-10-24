# 主站自动发布：静态上传与受限激活

CI 只生成、验证并上传 `apps/site/dist-bundle/` 的静态归档。新机的 `site-ci` 账号没有 Docker 权限，不可写 release、Nginx、发布器或模板；唯一 sudo 命令是固定的 `/usr/local/sbin/herong-site-publish <release-id>`。不允许 sudo 执行上传的脚本、Compose 或任意 Docker 命令。

`ci-publish.py` 安装为 root-owned 固定发布器。它接受唯一形态 `40位commit-runId-attempt`，只读取 `/opt/herong-site/incoming/<release-id>.tar.gz`，私有快照后限量解压，拒绝绝对路径、路径穿越、重复路径、符号/硬链接、设备、FIFO、稀疏文件；文件权限重置为 0644、目录 0755。上限为压缩 256MiB、tar 600MiB、有效文件 512MiB、单文件 128MiB、条目 25,000。剩余磁盘低于 768MiB 拒绝发布，不清理其他项目。

发布器核验正式域名 `/` 的 manifest、health、buildId、文件/字节/HTML/历史页/站点地图计数及必要路由，拒绝 IP/预览产物。然后只用 root-owned Dockerfile/Nginx/Compose、预先核验的本地 `herong-site-nginx:ci-base` 构建纯 COPY 镜像（无网络构建、无上传脚本），通过固定版本激活逻辑切换；健康响应必须包含本次 buildId。失败保留当前站或恢复前一版本。archive SHA256、buildId 和计数写入对应 release 的 `ci-receipt.json`。

上传使用 `pack-static.py` 的普通文件打包器，跨 macOS/Linux 不携带 AppleDouble 或扩展属性。不要用默认 macOS BSD tar 替代：它可能额外插入 `._` 成员，引发真实文件计数校验失败；不能为这类错误放宽发布器计数。

## 磁盘计量

按新 Docker 的实际展开和共享层计量预留空间，不能只看归档大小。2026-10-24 本次静态 bundle 约 223MB、归档约 39MB，但新主站镜像计量约 379MB，其中每版独有约 286MB；一次本地 BuildKit context 缓存另占约 248MB。工具旧镜像导入新 Docker 后计量约 1.06GB，不能沿用旧环境约 273MB 的显示口径判断容量。

发布器解包时保留至少 256MiB 空间，构建前再按实际文件量检查余量。后续内容变化会增加镜像层，低空间时 CI 安全拒绝，当前服务继续运行。不会自动全局 prune 或清理其他项目。仅本应用历史版本和缓存按明确策略处理，并保留当前和可用回滚目标；长期持续发布需要足够容量，不能把本次候选版本清理当作永久解决方案。

## 服务器一次性安装

以下仅为在**已核实的 `101.96.210.172`** 上执行的清单；不能据此认为已经安装。服务器用户、目录、SSH 身份由执行者实际核验。`site-ci` 不加入 `docker` 组；Docker 组具有主机管理能力。用户只需写 incoming，home/authorized_keys 可由 root 管理为用户可读但不可写，SSH key 禁止代理/端口/X11 转发及 PTY，不影响 SCP/SFTP 和固定 sudo 调用。

目标目录：

```text
/opt/herong-site/incoming/       site-ci 可写；只用于静态上传
/opt/herong-site/publisher/      root:root，不可由 site-ci 写
  Dockerfile
  nginx.conf                    来自 nginx/nginx.conf，含 gzip
  site.conf                     来自 nginx/site.conf
  compose.yaml
  remote-deploy.sh
  target-machine.sha256         已独立核验的目标 /etc/machine-id SHA256
/opt/herong-site/releases/       root 管理
/usr/local/sbin/herong-site-publish  来自 ci-publish.py，root:root 0755
/etc/sudoers.d/herong-site-ci    来自 site-ci.sudoers，root:root 0440
```

必须用已独立核验的主机身份摘要写入 `target-machine.sha256`，不把实际摘要硬编码到公共文档；发布器每次本地比较。根目录和 templates 均须 root-owned，group/other 不可写；template 不使用 symlink。`visudo -cf /etc/sudoers.d/herong-site-ci` 通过后再测试。确认本地固定 base tag 指向已审查的 Nginx 镜像，不能让 CI 自行改变它。root 单独维护模板和基础镜像升级，常规发文不覆盖模板。

现有旧服务器的部署公钥已由执行者只读核实为 CI 专用 `github-ci-deploy`，可复用同一**公钥**到新 `site-ci`，无需把个人 SSH 私钥存入 GitHub。旧 `SSH_*` 留给旧回滚流程，不将它们的主机改成新服务器。工作流优先使用 `SITE_SSH_KEY`，不存在则复用已有专用 `SSH_KEY`；默认用户 `site-ci`、目标固定 `101.96.210.172`。端口可用仓库 `SITE_SSH_PORT` 指定。

主机指纹必须事先独立核验。工作流按 Secret/变量 `SITE_SSH_KNOWN_HOSTS`，或仓库中的公开 `infra/site/ssh_known_hosts` 读取已核验的主机公钥；开启 `StrictHostKeyChecking=yes`，不在 CI 临时 `ssh-keyscan` 后盲目信任。

## 当前默认与验收

2026-10-24 已完成新主站受限发布、工具单写迁移及完整入口预检，正式域名的两条 A 记录已提交为 `101.96.210.172`，权威 DNS 同步仍可能短暂返回旧地址。仓库 `infra/site/production-target` 已记录该目标，工作流默认改为 **`container-production`**；`legacy` 保留为显式选项，GitHub Pages `/blog/` 自动发布保留。仓库变量 `SITE_DEPLOY_TARGET` 可显式覆盖；不要求配置 `SITE_PRODUCTION_READY`，缺省使用迁移完成标记，显式 `false` 可阻止正式发布。

当前这些源码变更尚未提交、尚未推送。新机已经实际执行受限发布器并验收，但**尚无本次 GitHub Actions runner 的真实运行记录**。源码推送后，master 提交才会按新的默认目标触发；不能把服务器受限发布验收等同于工作流已运行。

源码推送后运行一次 `workflow_dispatch` 的 `container-production` 或核验首次 master 自动触发，检查新容器镜像标签、本次 buildId、历史 RSS/文章、真实 404、工具和演示未被改动；GH Pages `/blog/` 继续独立构建并推送 `gh-pages`。新生产 CI 不承担 IP 预览部署，预览可本地构建并由已授权运维入口单独发布，避免把 `/site-preview/` 产物替换正式容器。

验证权限边界：site-ci 可上传 archive，但不可写 publisher/releases、不可操作 Docker；额外 sudo 参数、路径穿越 release 和恶意 tar 均被拒绝，当前容器不受影响。运行 `python3 infra/site/test-ci-publish.py -v` 覆盖归档边界、权限重置、大小上限、真实产物与坏 manifest。生产端至少实际完成一次受限身份发布；仅有本地测试不表示 GitHub Actions 已执行。
