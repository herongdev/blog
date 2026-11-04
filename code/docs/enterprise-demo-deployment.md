# 政企与数字孪生：部署交接文档

初稿日期：2026-09-23。给执行部署的 AI 使用。本文同时保留部署规则与按日期记录的实际发布事实；旧方案的“待部署”表述不能覆盖后续记录。执行前重新核实服务器状态、端口、代码和资源。

## 2026-10-24 主站迁移方向更新

用户已明确将主站和工具的迁移目标改为 `101.96.210.172`，各自一个容器；其他产品独立部署，通过域名链接进入。主站和工具现已迁移，实际承接见下节；该新要求覆盖本文旧服务器记录中对**主站和工具迁移目标**的约定，政企领域页、汽车采样站的正式 URL 和独立服务部署边界保持有效。

主站域名切换前必须确保现有政企领域页、采样站页面及 API/SSE 在新入口下仍然可用；具体演示承接或迁移要按本文独立核验，不能仅搬主站静态文件后直接切域名。方案见 [官网架构调整与服务器迁移](site-architecture-migration.md)。下文实际部署记录继续作为既有服务的历史基线。

## 2026-10-24 主站迁移后的实际承接

`herong.info` 与 `www.herong.info` 的 A 记录已切到 `101.96.210.172`，主站和工具分别由新机独立容器提供。政企领域页与汽车采样站的前端、Java/H2 服务及数据仍位于 `115.190.214.176`，本次没有移动它们。

新机 `/etc/nginx/conf.d/herong.info.conf` 包含 `/etc/nginx/snippets/herong-site-enterprise-origin.conf`，按原正式项目路径通过 HTTPS 转发到旧机字面 IP，Host/SNI 固定为 `herong.info` 并验证证书；不能改成域名回源以免 DNS 切换后形成循环。只有采样站事件流关闭缓冲，普通 JSON 保持缓冲。`/projects/enterprise/enterprise-platform/` 使用更精确的主站规则提供 Astro 详情，不覆盖政企目录或采样站。

公共 DNS 切换后，政企目录、采样站页面、系统信息 `local-demo`、站点列表、真实 station ID 的 snapshot 和连续 SSE 事件均已通过正式 URL 验收，详见 [主站实际部署记录](site-architecture-migration.md)。最新入口配置备份为 `/var/backups/herong-site/20261024T083555Z-edge.OYE7GZ`。

旧服务器仍是这些演示与媒体证书续期等服务的依赖，不能因主站迁移而关停或清理演示目录。以后迁移这些独立服务时仍须单独执行本文件规定的备份、验收和回滚流程。

## 1. 产品路径：已确认，不要自行改动

主站导航“作品” → `/projects/` 作品目录 → 领域首页 → 领域内的具体项目展示页。主域首页现为知识搜索；作品结构以 `homepage.md` 为准。领域首页的项目卡片直接进入项目展示页；项目展示页本身承载可交互演示，不再额外增加一层介绍页。简介、场景和技术标签放在领域首页的项目卡片上。

| 用途 | 正式地址 |
| --- | --- |
| 官网首页 | `https://herong.info/` |
| 政企与数字孪生领域首页 | `https://herong.info/projects/enterprise/` |
| 汽车采样站项目展示页 | `https://herong.info/projects/enterprise/sampling-station/` |
| 本项目 API 前缀 | `https://herong.info/projects/enterprise/sampling-station/api/` |

其他领域沿用 `/projects/<领域标识>/`，领域内的项目展示页沿用 `/projects/<领域标识>/<项目标识>/`。`fields` 是旧实现目录，只保留兼容，不属于正式 URL。一级是领域首页，二级是该领域中的具体项目。不要把代码目录名 `apps`、内部分类 `fields` 或技术分类 `demos` 放入 URL，不用 localhost 地址作为正式入口，不把整个政企领域首页直接替换成一个采样站。

演示提供“返回政企与数字孪生”入口，目标为 `/projects/enterprise/`。领域首页仍属于官网的作品入口，由独立应用维护发布。不得虚构客户名称、实际项目经验或交付成果。

### 两个 3D 项目不能混淆

- “何荣工作室的数字孪生世界”是**政企与数字孪生领域首页的视觉与项目目录**：上方为多层 WebM 媒体合成主视觉，下方为行业 Tabs、热点与项目卡片。源码已从 `easyv-display-v21` 迁入 blog 的 `code/apps/enterprise-showcase/`，以独立静态应用承载到 `/projects/enterprise/`，不要再直接从 `web-replica/retained-inputs` 发布。
- `code/apps/3d-showcase` 是**汽车采样站项目展示页中的交互演示**：React + Vite + Babylon.js，需要独立 Java API，只发布到 `/projects/enterprise/sampling-station/`。
- 不得把汽车采样站覆盖整个领域首页；也不得把媒体领域首页部署成汽车采样站演示或放到 `/3d/`。
- 作品目录中的政企卡片进入领域首页；领域首页中的汽车采样站项目卡片再进入具体演示。

## 2. 已核对的源码和依赖

- 官网仓库：`/Users/ronnie/Documents/my-project/blog`。
- 官网主站：`code/apps/site`，Astro；历史文章兼容站：`code/apps/blog`，VitePress。
- 演示前端：`code/apps/3d-showcase`，React + Vite + Babylon.js，包名 `@herong/3d-showcase`。
- 前端构建产物：`code/apps/3d-showcase/dist/`。
- 前端已经支持 `VITE_BASE_PATH`、`VITE_API_BASE_URL`，资源辅助函数使用 `import.meta.env.BASE_URL`。
- 后端目前不在 blog 仓库中！源码在 `/Users/ronnie/Documents/my-project/3DGis/apps/server`，父 POM 在 `/Users/ronnie/Documents/my-project/3DGis/pom.xml`。
- 后端为 Java 21 / Spring Boot，构建后 JAR 为 `apps/server/target/fuelvision-server.jar`。原工程保持只读；从它构建，不擅自迁移、重构或修改原工程。若无法取得源码，停止部署并报告，不伪造 API。
- 后端 `local` profile 使用持久化 H2（相对目录 `.data/fuelvision`），开启模拟场景。默认 profile 是 `mysql`，因此必须显式选择 `local`，不能误连现有 MySQL。
- 前端初始化会读取站点、系统信息、快照，并在模拟场景 IDLE 时调用启动 API；实时更新通过 EventSource/SSE。

源码检查日期不是运行保证：部署 AI 必须实际执行前后端构建、接口和浏览器验收。开发服务代理只在开发环境有效，不会随静态文件自动部署。

## 3. 部署目标和不可触碰的边界

演示继续独立部署在旧机 `115.190.214.176`，由主域入口 `101.96.210.172` 按上文规则回源；不能因主站或工具迁移而自动移动 Java/H2 和演示目录，也不合并进主站 CI。

服务器当前同时承载其他应用。已有 8080、8090、3306 等端口正在被使用。为本项目预留候选端口 `127.0.0.1:24310`，执行前用 `ss -lntp` 确认空闲；占用时先报告，不停止现有服务。

最近磁盘紧张，旧镜像清理后可用空间约 2.65GB，数值会变化。上线前重新执行 `df -h`、`free -h`，评估 JDK、JAR、H2 与日志空间。尽量本地构建，不在服务器安装整套 Node/Maven 构建依赖或执行全量镜像构建。资源不足先报告，不清理别的项目。

**禁止把演示独立部署到 `/var/www/herongsite/` 内。** 官网 GitHub Actions 对该目录使用 `rsync --delete`，会删除不属于官网构建的子项目文件。

### 2026-09-23 路径误部署的恢复记录

一次部署曾错误使用 `/3d/`。旧 `/var/www/herongsite/3d/` 与媒体预览目录已移动到 `/var/backups/herong-misplaced-3d/20260923/` 可恢复归档；`/3d` 和 `/3d/` 只允许跳转到正式领域首页，不能再次成为部署目标。

正式部署时应先保留可恢复副本，再将这两个目录迁出 `/var/www/herongsite/` 到项目专用归档位置；未经核对不得直接删除。不得把它们加入正式链接、Nginx 新入口或 CI 产物。完成正式路径验收后，按准确目录和保留策略单独处理旧路径。

约定独立目录：

```text
/var/www/herong-demos/sampling-station/
  releases/<release-id>/
    web/projects/enterprise/sampling-station/    # 前端 dist 的内容，不是 dist 文件夹本身
    server/fuelvision-server.jar
  current -> releases/<release-id>
/var/lib/herong-sampling-station/ # H2 工作目录；不随版本删除
  .data/
/etc/systemd/system/herong-sampling-station.service
/etc/nginx/snippets/herong-sampling-station.conf
```

前后端放进同一个版本目录便于配套回滚。部署目录可归 `deploy:deploy`；后端用独立无登录用户 `sampling-demo`。静态文件 644、目录 755，数据库目录仅服务账号访问。不得设置 777，不要把 macOS 的 UID 501/GID 20 带到服务器。

连接旧官网服务器已有 `root` SSH 访问条件；执行 AI 应使用现有凭据，不输出私钥或密码。日常上传用有权限的部署账号，root 仅用于必要的系统配置。

## 4. 构建前端

在 `blog/code` 内执行（Node 22.12+，pnpm 10.28.0；以实际依赖 engines 检查为准）：

```bash
pnpm install --frozen-lockfile
VITE_BASE_PATH=/projects/enterprise/sampling-station/ \
VITE_API_BASE_URL=/projects/enterprise/sampling-station/api \
pnpm --filter @herong/3d-showcase build
```

不要用 `API_PROXY_TARGET` 代替生产 API 配置。不要把 API 指向根 `/api`，它可能属于现有业务。VITE 变量会写进前端公开文件，禁止放入密钥。当前源码默认静态前缀即 `/projects/enterprise/sampling-station/`，API 未覆盖时从该前缀派生；`.env.example` 同样使用正式前缀。本地 Vite 代理将此前缀改写到 Java 的内部 `/api`，部署时仍由 Nginx 提供等价转发。可运行 `pnpm --filter @herong/3d-showcase check:paths` 对本机 fixture 验证 GET/POST/SSE 地址与代理改写，不接触正式 API。

检查 `dist/index.html`、动态 JS chunk、图片、字体和模型 URL 都落在 `/projects/enterprise/sampling-station/` 下。子路径刷新必须可用。当前开发脚本使用 5173，与官网可能冲突；本地联调改用空闲端口，例如 5174，不停掉官网开发服务。

## 5. 构建和运行后端

在原后端工程根目录（仅构建，不修改源码）执行：

```bash
cd /Users/ronnie/Documents/my-project/3DGis
./mvnw -pl apps/server -am clean verify
```

服务器必须有 Java 21 运行时，先验证 `java -version`。没有运行时则由执行 AI 安装适合目标系统的软件包，并记录版本和空间占用，不盲目复制 macOS Java。

创建独立服务账号及数据目录后，使用以下 systemd 单元模板（由执行 AI 落盘并验证，不是已经安装的配置）：

```ini
[Unit]
Description=Herong sampling station demo API
After=network.target

[Service]
Type=simple
User=sampling-demo
Group=sampling-demo
WorkingDirectory=/var/lib/herong-sampling-station
Environment=SPRING_PROFILES_ACTIVE=local
Environment=SERVER_ADDRESS=127.0.0.1
Environment=SERVER_PORT=24310
ExecStart=/usr/bin/java -Xms128m -Xmx384m -jar /var/www/herong-demos/sampling-station/current/server/fuelvision-server.jar
Restart=on-failure
RestartSec=5
UMask=0077
NoNewPrivileges=true
PrivateTmp=true
ProtectHome=true
ProtectSystem=strict
ReadWritePaths=/var/lib/herong-sampling-station
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
```

校验 Java 路径；内存参数只是起点，需检查启动峰值、重启次数及主机余量。不要运行两个实例同时访问同一 H2 文件。读 `db/local/schema.sql`、`data.sql`，确认重启初始化行为不会破坏需保留的数据，再执行重启测试。本项目只使用可公开的模拟数据，不能接入生产采样设备。

首次启动后先检查 `http://127.0.0.1:24310/actuator/health`，预期 `UP`，再检查 `/api/system/info` 的 `dataMode` 为 `local-demo`。健康接口无需对公网开放。

## 6. Nginx：独立路径、不覆盖其他站点

先用 `nginx -T` 确认**线上实际生效**的 `herong.info` HTTPS server block。仓库里的 `code/infra/nginx/herongsite` 可能是旧配置，不要整份覆盖线上。备份目标配置，仅在正确的 server 中 include 本项目 snippet。

以下 snippet 放在 server 上下文；顺序和 `^~` 用于避免被网站已有静态资源正则或官网 SPA fallback 截走：

```nginx
location = /projects/enterprise/sampling-station {
    return 308 /projects/enterprise/sampling-station/;
}

location = /projects/enterprise/sampling-station/api {
    return 308 /projects/enterprise/sampling-station/api/;
}

location ~ ^/projects/enterprise/sampling-station/api/v1/sampling/stations/[^/]+/events$ {
    rewrite ^/projects/enterprise/sampling-station/api/(.*)$ /api/$1 break;
    proxy_pass http://127.0.0.1:24310;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_buffering off;
    proxy_cache off;
    proxy_read_timeout 1h;
    add_header X-Accel-Buffering no;
}

location /projects/enterprise/sampling-station/api/ {
    # 普通 JSON 接口保留 Nginx 默认缓冲；不能与 SSE 共用 proxy_buffering off，
    # 否则部分 HTTP/2 浏览器可能拿到 200 但延迟读取响应正文。
    proxy_pass http://127.0.0.1:24310/api/;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}

location ^~ /projects/enterprise/sampling-station/assets/ {
    root /var/www/herong-demos/sampling-station/current/web;
    try_files $uri =404;
    add_header Cache-Control "public, max-age=31536000, immutable";
}

location ^~ /projects/enterprise/sampling-station/source-ui/ {
    root /var/www/herong-demos/sampling-station/current/web;
    try_files $uri =404;
    add_header Cache-Control "no-cache";
}

location ^~ /projects/enterprise/sampling-station/ {
    root /var/www/herong-demos/sampling-station/current/web;
    index index.html;
    try_files $uri $uri/ /projects/enterprise/sampling-station/index.html;
    add_header Cache-Control "no-cache" always;
}
```

这里使用 `root`，所以产物必须放到 `web/projects/enterprise/sampling-station/`，不能直接放 `web/`。新加其他静态目录时也要提供缺失资源返回 404 的规则，不让 JS/图片请求返回首页 HTML。访问无尾斜杠的入口应跳转到带斜杠入口。

公众演示含 POST 场景启动/重置接口：上线前评估共享演示状态和滥用风险，在 http 上下文为写操作配置独立限流，在 server 中应用；不要把低阈值请求限流直接套到所有 SSE 连接。必要时先加演示访问认证。不能把真实设备控制或真实业务数据暴露给公众。前端自动启动场景的行为也需要在多访客情况下验证。

执行 `nginx -t` 成功后才 reload；失败则恢复备份，不重启其他服务。如果 SELinux 拒绝静态文件访问或本地代理，调整必要的文件标签/网络策略，不关闭 SELinux 或整个防火墙。

## 7. 上传、切换、回滚

1. 读取 Git 状态：当前 `3d-showcase` 和根工作区依赖曾有未提交改动，不要漏文件或打包其他项目的脏改动。记录源码版本与产物 SHA256，前后端都记录。
2. 本地构建并测试，生成唯一 release-id；确认远程同名 release 不存在，创建上文版本目录。
3. 上传前端到版本内 `web/projects/enterprise/sampling-station/`，上传 JAR 到 `server/`。rsync 使用 `--no-owner --no-group`，仅允许同步本次版本的目录，不能对 `/var/www` 或官网根目录执行 `--delete`。
4. 校验完整性、权限和磁盘余量。上传期间不更换 `current`，不让线上出现 HTML 已更新但资源缺失的中间状态。
5. 保存旧 `current` 目标；对数据库先停本项目服务再备份 `.data`，不要直接复制正在写入的 H2。只影响本演示。
6. 用临时链接加同目录原子 rename 切换 `current` 到已完整上传的版本；首次部署才创建服务。
7. `systemctl daemon-reload`，启动/重启 `herong-sampling-station`，验证本机健康和业务接口。
8. 首次接入检查 Nginx 并 reload；完成公网验证后，再发布领域页的项目入口。
9. 失败时切回旧 release 并重启本演示服务；如新版本改变数据库结构，必须按已验证的备份恢复策略处理，不能宣称切回 JAR 就一定能回滚数据库。
10. 至少保留当前版和上一版，不自动清除本项目数据；删除历史版本需要先确认准确路径和保留策略。

更新静态文件时注意旧浏览器还可能请求上一版懒加载 chunk。保留兼容的上版 assets，或安排明确刷新策略并验证，不能在新版本上线时立刻删光旧资源。

## 8. 官网入口改动范围

- 作品目录 `/projects/` 中的政企卡片仍指向 `/projects/enterprise/`，不改为直接进采样站。
- 政企领域首页由 `code/apps/enterprise-showcase/` 独立提供；主站其他领域位于 `code/apps/site/src/pages/projects/`，VitePress 中的项目页面保留兼容。旧 `projects/fields/` 仅作兼容入口。
- 数据位置：`code/apps/blog/docs/.vitepress/theme/data/portfolio.ts`。
- 为采样站项目配置独立 `showcaseUrl`（若现有类型没有就补充），领域卡片优先链接这个地址。不要把所有项目的详情链接全局替换成该项目展示页。
- 未部署、不可访问的项目不得伪装成可演示；其他领域没有演示时保留诚实状态。
- 官网在 GitHub Pages 的 `/blog/` 下也发布时，项目入口使用完整正式地址 `https://herong.info/projects/enterprise/sampling-station/`，不要被 VitePress `withBase` 变成 `/blog/projects/...`。
- 返回领域首页的正式地址可用 `https://herong.info/projects/enterprise/`，不绑定开发端口。
- 不因独立演示发布改变主站当前搜索布局、备案、Logo、文章 URL、现有工具箱或博客自动发布流程；“首页一屏六卡”已是历史约定。

## 9. 必须通过的验收

```bash
curl -fsS http://127.0.0.1:24310/actuator/health
curl -fsS https://herong.info/projects/enterprise/sampling-station/api/system/info
curl -fsS https://herong.info/projects/enterprise/sampling-station/api/stations
curl -I https://herong.info/projects/enterprise/sampling-station
curl -I https://herong.info/projects/enterprise/sampling-station/
```

从 stations 响应取真实 stationId 并 URL 编码，不硬编码猜测 ID。验证：

- `GET /api/v1/sampling/stations/<id>/snapshot`：JSON 包装为 `code: OK`，包含站点、流程、设备、指标；模拟源 `simulated: true`。
- `GET /api/v1/sampling/stations/<id>/events`：通过公网前缀访问，`curl -N --max-time 20` 能连续收到 `snapshot` 事件，而不是等结束后一次性返回。流测试超时是预期终止，需根据已收到事件判断。
- `POST /api/v1/simulation/stations/<id>/scenarios/NORMAL/start`：只在确认模拟模式后测试，看到状态变化；测试重复点击、多访客及重连。
- 浏览器从官网首页 → 领域首页 → 演示 → 返回领域首页，路径正确。
- 三维场景、图片、动态 chunk 均无 404；控制台无致命异常；API 没有误返回官网 HTML；SSE 不跨域。
- 桌面、手机、横屏下可访问；刷新演示地址正常。后台接口不可访问时显示真实失败状态，不伪装成功。
- 重启服务后 H2 行为符合预期；服务只监听 127.0.0.1:24310，没有公网数据库端口。
- 官网首页、文章、`/file-tools`、`chat.herong.info` 仍正常；再跑一次官网发布，演示文件仍保留。
- 部署后检查磁盘、内存和服务日志；报告剩余容量，不掩盖低空间风险。

## 10. 执行 AI 的最终交付

请返回：正式演示 URL、领域页 URL、前后端源码版本、release-id、服务器路径、端口、服务名、实际 Nginx 文件及备份位置、验收结果、回滚目标和未解决问题。说明是否使用模拟数据，不能把本方案写成已经部署成功。

## 11. 2026-09-23 实际部署记录

本节是实际执行记录，会覆盖本文早期“仅为方案、尚未部署”的状态说明。

- 已部署正式演示：`https://herong.info/projects/enterprise/sampling-station/`。
- 领域首页正式路径：`https://herong.info/projects/enterprise/`。当前由 `code/apps/enterprise-showcase/` 的视频+Tabs 独立应用接管，服务器目录为 `/var/www/herong-demos/enterprise-home/releases/<release-id>/web/projects/enterprise/`，`current` 原子软链接切换版本。旧 `/projects/fields/enterprise/` 以 308 跳转到新地址。
- 当前 release-id：`20260923T131113Z-initial-fetch`；服务器目录为 `/var/www/herong-demos/sampling-station/releases/<release-id>`，`current` 原子软链接指向当前版本。
- 上一可回滚版本：`20260923T130528Z-api30s`；最初版本 `20260923T125810Z-bde32dc` 也保留。回滚只切换本演示的 `current` 并重启 `herong-sampling-station`。
- 后端服务：`herong-sampling-station.service`，用户 `sampling-demo`，只监听 `127.0.0.1:24310`，使用 `local` profile 与 H2 持久化模拟数据。
- 实际 Nginx 主配置：`/etc/nginx/conf.d/www.herong.info.conf`；接入 snippet：`/etc/nginx/snippets/herong-sampling-station.conf`；修改前备份文件名为同目录下 `www.herong.info.conf.before-sampling-<UTC 时间戳>`。
- 误部署的 `/var/www/herongsite/3d` 与 `3d-studio-preview-20260923` 已移动到可恢复归档 `/var/backups/herong-misplaced-3d/20260923/`，没有删除；`/3d` 与 `/3d/` 只做 308 跳转到领域首页。
- 已验证健康检查为 `UP`、`dataMode` 为 `local-demo`、场站/快照/场景启动接口、SSE 连续事件、服务重启后的 H2 初始化、Nginx 配置检查和公网静态资源。浏览器已加载 Babylon 三维场景，控制台无应用错误；站点根 `favicon.ico` 仍返回 404，不影响演示。
- 首次加载包含约 972KB 的 Babylon 懒加载 chunk，慢链路下三维场景和业务数据可能延迟出现。前端初始加载改为由组件生命周期信号控制，不再使用会误报断链的固定超时；后续应继续拆分/预加载三维 chunk。
- 领域首页当前 release-id：`20260923T145455Z-enterprise-tos-v1`，上一可回滚版本为 `20260923T134013Z-enterprise-sequential-media`（更早版本 `20260923T133032Z-enterprise-v21-progressive` 继续保留）。案例封面通过 IntersectionObserver 按视口加载；4 个原始 WebM 保持原分辨率和码率，改为顺序加载，每层失败最多自动重试两次，并通过资源版本参数避免浏览器继续执行旧逻辑。这样既保留画质，也避免旧 Nginx 同时传输多个大媒体时出现 HTTP/2 协议错误。
- 领域首页的 26 个媒体文件已原样上传到火山引擎 TOS 北京区域：桶 `herong-media`，对象前缀 `projects/enterprise/v1/assets/`。桶保持私有，仅该前缀通过桶策略开放匿名读取且不开放 `ListBucket`；CORS 只允许 `https://herong.info` 的 `GET`、`HEAD`，暴露 Range 相关响应头。对象使用一年 immutable 缓存，更新媒体必须使用新版本前缀。源码 `assets/` 和服务器 release 内的本地副本继续保留用于回滚，不得因迁移到 TOS 而删除。上传凭证必须使用目录受限的 IAM 用户，完成上传验收后删除或停用 AK/SK。
- 未解决：公众写接口尚未做独立限流或认证，现阶段只能保持模拟数据，不能接真实设备控制。媒体文件合计约 9MB，慢链路首屏仍可能逐层出现，后续可继续做转码和 CDN。

以后部署或编辑必须以本节和仓库中的 `code/infra/sampling-station/` 模板为准；不得恢复 `/3d/`、根 `/api` 或改投其他服务器。

## 12. 2026-10-20 媒体桶恢复进度

本节更新上面 2026-09-23 对 **TOS 桶状态** 的记录；领域页和采样站的正式路径、部署边界不变。旧 `herong-media` 桶已不存在，随后在 `cn-beijing` 以同名私有桶重建。26 个企业素材已从仓库素材目录复制到 `projects/enterprise/v1/assets/`，26/26 个原公开链接及对象大小已验证。当前桶策略仅为该企业前缀、教程前缀 `dev-guides/tutorials/*` 与证书续期临时验证前缀 `.well-known/acme-challenge/*` 开放匿名 `GetObject`，桶根目录不公开；企业页面所需 `https://herong.info` 的 `GET`、`HEAD` CORS 已配置。线上领域页经浏览器验收，22 张图片解码成功、4 个 WebM 可播放、TOS 请求无失败、控制台无错误；私有桶根目录对象经匿名请求返回 403。教程图片已复用此桶；`media.herong.info` 的 TXT、CNAME 与 TOS 域名绑定已完成，Certbot 已通过脚本签发证书并启用续期任务，TOS 跨服务授权及证书绑定已完成。四个解析地址的线上 HTTPS 证书均与 Certbot 本地证书一致，已知公开素材返回 200。

教程专用 IAM 用户 `herong-dev-guides-uploader` 已创建并禁用控制台登录，仅附加自定义策略 `HerongTutorialMediaUpload`，允许 `tos:GetObject`、`tos:PutObject` 到 `trn:tos:::herong-media/dev-guides/tutorials/*`。本机配置文件权限为 `0600` 且被 Git 忽略。写作台已真实完成两张不同图片的粘贴上传、保存和重开显示；两张图的匿名 HTTPS `HEAD/GET` 均为 200，内容哈希与优化后图片一致，重复同图复用 URL 且不改变原对象的修改时间。列桶、越界上传、删除不存在测试键和读取桶策略均返回 403 `AccessDenied`，没有越权写入成功。`astro check`、媒体检查与静态构建均通过。验收稿保留在非公开草稿目录，未发布为教程。`dev.herong.info` 的独立网站部署仍未接通；图片云端直传成功不代表公开子站已上线。详情见 [教程图片云端启用清单](../apps/dev-guides/TOS-ACTIVATION.md)。


## 13. 2026-11-04 品牌记录与本地源码校正

政企领域页已在品牌发布中独立切到 `20261103T170340Z-brand-favicon-57903ab`，上一版本 `20260923T145455Z-enterprise-tos-v1` 保留。该次仅更新 favicon 引用并新增 SVG，未改动采样站 Java/H2、Nginx 或媒体；证据与验证范围见 [品牌上线记录](tasks/2026-11-04-brand-production-release.md)。本节以下源码校正尚未部署，不能用本地构建覆盖这条线上版本记录。

本轮整理未提交源码时，已移除采样站 README 中 `/3d/` 与“合并主站 CI”的错误部署说明，并将 Vite、环境模板和浏览器 API 默认统一到正式项目路径；本地代理继续访问单独启动的 Java 服务。Nginx 模板补齐 API 无尾斜杠跳转与静态资源缺失返回 404 的规则，独立领域页无客户端路由，缺失文件不再回退首页 HTML。这些仅是仓库模板修改，未执行远端操作或 reload。

采样站删除了接口无告警时补入的硬编码告警；未收到快照时显示等待，实际坐标没有数据时保留空值，不再编造方案值或提前标为 LIVE。`check:paths` 覆盖 API GET/POST/SSE 前缀、站点 ID 编码、错误 HTML 响应、本地 JSON/SSE 代理，以及 SSR 的等待/无告警/有告警状态；TypeScript 与 Vite 构建通过，Babylon 场景仍有约 972 KB 的较大 chunk 提示。

领域页 `node scripts/check-assets.mjs` 检查 37 个运行文件、26 份原始媒体的 SHA256 与大小、18 个 EasyV 原作引用及本地文件引用；当前 `manifest.json` 已按实际文件更新并包含 favicon。操作与导航图标改为由已锁定的官方 Lucide 生成的固定 SVG 模块与首页静态标记，并保留许可文件，检查同时核对生成结果；采样站移除无必要的装饰加号。26 份图片与视频未改动或重新压缩。`sources.json` 是来源记录，许可状态为未核实，不代表有第三方素材再分发授权；`public/source-ui/` 的逐图来源和许可同样尚未补齐。参考卡片不计为个人交付成果，后续复刻记录见 [EasyV 记录](enterprise-easyv-replication.md)。

本轮代码校正本身未验证 Edge、窄屏或设备效果；本地静态检查与 SSR 不能代替这些验收。Edge 曾遇到系统画面采集失败与前台窗口切换，用户于本轮明确选择“视觉复核留待以后”，因此只记录自动检查通过，不声称视觉已验收。已有独立本地 API fixture 可复现等待、空告警和模拟告警，供以后单独复核；具体结果应据实际操作补记。既有页面仍含展示性控件，不能据本次构建通过宣称所有按钮或视觉均已完成。
