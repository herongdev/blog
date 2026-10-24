# 主站容器与独立入口

主站交付一个 Nginx 静态镜像：Astro 作品站与 VitePress 历史文章在构建阶段合并，容器内没有 Node、数据库、教程写作台或工具运行时。目标主机为用户确认的 `101.96.210.172`。部署前完整阅读 [政企部署边界](../../docs/enterprise-demo-deployment.md) 和 [迁移方案](../../docs/site-architecture-migration.md)。本文中的命令和模板本身不代表已经执行线上迁移；实际 release 与验证结果由执行者记录。

## 目录与构建

```text
/opt/herong-site/
  releases/<release-id>/
    compose.yaml
    site.env                 # 只有镜像标签、回环端口，无私有凭据
    remote-deploy.sh
    image.sha256
  current -> releases/<release-id>
  previous -> releases/<previous-release-id>
```

从 `code/` 构建生产产物：

```bash
PUBLIC_SITE_URL=https://herong.info PUBLIC_BASE_PATH=/ \
PUBLIC_DEPLOY_ENV=production \
PUBLIC_GUIDES_URL=https://101.96.210.172/dev/ \
PUBLIC_TOOLS_URL=https://herong.info/file-tools \
pnpm build:site
bash infra/site/deploy.sh --build-only
```

镜像构建脚本只复制 `apps/site/dist-bundle/`、Dockerfile 和两个 Nginx 文件到临时 context，不使用整个仓库作为构建上下文，不受现有工具专用 `.dockerignore` 排除 `dist`、`infra` 的规则影响，也不会带入 `code/secrets/`。可通过 `NGINX_IMAGE` 指定经过核验的镜像或摘要。Docker Hub 无法连接时，本机已有的 `docker.m.daocloud.io/library/nginx:stable-alpine` 可以显式指定；不自动修改 Docker daemon 或清理其他镜像。

IP 预览与正式域名使用不同的构建产物，不能通过代理重写把同一个版本混用：

```bash
PUBLIC_SITE_URL=https://101.96.210.172 PUBLIC_BASE_PATH=/site-preview/ \
PUBLIC_DEPLOY_ENV=staging PUBLIC_NOINDEX=true \
PUBLIC_GUIDES_URL=https://101.96.210.172/dev/ \
PUBLIC_TOOLS_URL=https://101.96.210.172/file-tools \
pnpm build:site
```

预览初始 HTML、robots 和 sitemap 由构建规则禁止索引，边缘另加 `X-Robots-Tag`。正式产物 canonical 使用 `https://herong.info`。

## 版本化部署与回滚

先核对目标磁盘、Docker/Compose、现有服务与 `127.0.0.1:24380` 是否空闲。该端口仅为已盘点过的候选值，使用 `SITE_PORT` 更换时同步修改边缘 snippet。仅监听回环，不额外开放公网端口。

```bash
SITE_SSH_HOST=101.96.210.172 SITE_SSH_USER=root \
SITE_SSH_IDENTITY_FILE=/absolute/path/to/existing-private-key \
SITE_RELEASE=20261024T120000Z-example \
bash infra/site/deploy.sh --deploy
```

所有 SSH/SCP 都使用 `BatchMode=yes`、`IdentitiesOnly=yes` 和 `StrictHostKeyChecking=yes`；必须预先核实并保存主机指纹。脚本只接受本次确认的新服务器，不默认连接任何主机。可设置 `SITE_SSH_PORT`，不会输出私钥。

脚本构建 `linux/amd64` 镜像，验证 Nginx 配置，传输版本化镜像归档并校验 SHA256，在目标运行固定 Compose 项目 `herong-site`、容器 `herong-site`。归档导入后只删除这份传输文件，不清除镜像。健康检查同时覆盖 Nginx `/healthz`、合并产物 `/__site-health.json` 和首页；通过后才原子更新 `current` 与 `previous`。失败自动恢复上一版本。首次启动失败仅移除本项目容器。

在目标主机回滚：

```bash
bash /path/to/reviewed/infra/site/rollback.sh
# 或指定已有 release；也可直接运行该 release 的 remote-deploy.sh。
bash /opt/herong-site/releases/<release-id>/remote-deploy.sh <release-id>
```

保留当前版与上一版的镜像和 release；不自动清理。镜像切换会重新创建这个容器，可能短暂中断主站，边缘 Nginx 和其他应用不会重启。上版懒加载资源兼容性仍须检查，不能上线时立即删除上版镜像。回滚不会改变 DNS 或覆盖主机 Nginx，需要分别恢复切换前的边缘配置与 DNS。

## 现有 HTTPS 入口的局部配置

所有文件都是 **server 级 include snippet**，没有新建完整的 server block。先备份实际生效文件，确认原 location 不冲突，`nginx -t` 通过后才 reload。

- `nginx/edge-preview.conf`：仅给现有 IP HTTPS server 增加 `/site-preview/`；代理剥去这一前缀。保留根站、`/dev/`、`/test-dev/`、`/dev-admin/`。`X-Forwarded-Prefix` 在容器中只接受空值和固定 `/site-preview/`，旧作品重定向保留该前缀，不反射任意请求头。
- `nginx/edge-production.conf`：只给正式 `herong.info` server 增加主站 `location /`。不能放进现有 IP server 抢占根应用，也不能与已有同名 location 同时保留。
- `nginx/edge-tools.conf`：独立转发 `/file-tools/` 到 `127.0.0.1:3001`，保留 Next.js 编译时 basePath。
- `nginx/edge-enterprise-origin.conf`：正式域名切换后保留政企领域页、采样站前端、API 和 SSE；将完整路径转发到已确认的旧服务器 **字面 IP `https://115.190.214.176`**，Host 与 SNI 固定 `herong.info`，开启 CA 验证。新 Astro 详情 `/projects/enterprise/enterprise-platform/` 通过更精确的 location 交由主站容器，不能误转到没有该详情的旧应用。`nginx/enterprise-origin-headers.conf` 安装为 `/etc/nginx/snippets/herong-enterprise-origin-headers.conf`。新主机已只读核对 CA 为 `/etc/pki/tls/certs/ca-bundle.crt`，迁到其他系统时重新核对。只对明确的采样站 events 路径关闭缓冲，其余 JSON 保留缓冲。父级 `/projects/enterprise/` 不能加 `^~`，否则会阻断 SSE 正则 location 的选择。

旧 origin 仍按原独立目录、Java/H2 模拟数据与发布流程运行。修改 origin 前重新核对目标身份、HTTPS、SNI、CA、完整路径与 SSE；两个 `proxy_pass` 必须一致。**不能把 origin 写成 `https://herong.info`**：DNS 切换后会自循环。不能把 API 改成根 `/api`。在新入口通过页面、API/SSE 和浏览器验收前不切 DNS；旧服务未独立迁移、媒体证书续期未承接前不能关闭旧服务器。

静态容器按真实文件返回 200/404，没有 SPA 首页 fallback；缺失 JS、图片也返回 404。旧扁平项目地址（无扩展、`.html`、尾斜线）逐条 301 到新的作品路径；旧 `projects/fields/<field>/` 同样只跳到对应领域，原 `/3d` 兼容跳领域首页。Nginx 不向旧站猜测性回源，不代理根 API。

## 自动发布切换

`.github/workflows/deploy.yml` 保留 master 提交自动发布及 GitHub Pages `/blog/`。2026-10-24 已记录迁移目标 `production-target=101.96.210.172`，源码默认改为 `SITE_DEPLOY_TARGET=container-production`。显式选择 `legacy` 时仍限制旧 rsync 主机为 `115.190.214.176`，防止把旧 `--delete` 目录意外指向新服务器。当前源码尚未提交、尚未推送；新机受限发布器已实际验收，但本次 GitHub Actions runner 尚未运行。

新目标通过仓库 Actions 变量 `SITE_DEPLOY_TARGET` 或 `workflow_dispatch.deploy_target` 明确选择：

| 值 | 行为 |
| --- | --- |
| `legacy` | 原博客构建 + 旧机 rsync + GitHub Pages |
| `build-only` | 正式主站合并产物、可下载 artifact、镜像构建 + GitHub Pages；不连接新服务器 |
| `container-production` | 正式域名构建，受限身份上传静态归档并激活 + GitHub Pages；要求已记录迁移完成标记或 `SITE_PRODUCTION_READY=true` |

正式容器 CI 使用受限的 `site-ci` 账号，只传静态归档，由 root-owned 固定发布器构建和激活；不上传 image/compose/script。已有专用 CI 密钥已独立核实，可通过 `SITE_SSH_KEY || SSH_KEY` 复用；公开主机指纹从 Secret/变量或已核实的仓库文件读取。完整身份、安装与启用说明见 [受限自动发布](CI.md)。`PUBLIC_GUIDES_URL`、`PUBLIC_TOOLS_URL` 可用仓库变量覆盖。它们是公开入口，不能放密钥。旧 `SSH_*` 的主机等配置继续用于旧回滚流程，不能改向新服务器。所有构建继续安装 frozen lockfile，使用 Node 24 和 pnpm 10.28.0。

迁移完成标记表示执行者已完成本次入口、独立政企/API/SSE、工具单写和回滚核验；不要求另配 `SITE_PRODUCTION_READY`，显式 `false` 仍可阻止正式发布。CI 只更新主站容器，不修改 Nginx、DNS、工具数据、教程内容或其他产品。源码推送后核验首次 master 自动触发或一次 `workflow_dispatch`；服务器受限发布验收不能代替 GitHub Actions 的真实运行记录。

## 验收

在主机通过 `/__site-health.json`，首页、五个作品领域、具体项目、历史文章 URL/RSS/搜索资源、Logo/备案页脚；`/does-not-exist/` 与不存在的 JS 都应 404；核对旧作品的 301 Location。分别验证正式与预览前缀，检查任意恶意 `X-Forwarded-Prefix` 不会进入 Location。浏览器检查手机、桌面、亮暗色与导航。

通过新边缘而不先改 DNS：使用 `curl --resolve herong.info:443:101.96.210.172` 验证主页、工具、政企页、采样站 JSON 与连续 SSE。再验证一个真实工具上传、转换、下载和容器重启后的数据；新入口检查通过后才切流量。独立演示需要实际浏览器加载，不只检查 HTTP 200。
