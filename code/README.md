# 站点代码 Monorepo

`code/` 是本仓库唯一的代码工作区，由 pnpm workspace 统一管理。作品主站采用 Astro 静态生成；3022 篇历史文章继续由 VitePress 构建，保留原 URL、归档、RSS 和搜索资产，最终合并进同一个主站 Nginx 容器。工具是独立容器，教程与其他产品保持各自部署。

## 目录

```text
code/
├─ apps/
│  ├─ site/                 # Astro 作品主站；dist-bundle 为合并交付产物
│  ├─ blog/                 # VitePress 历史文章兼容站及共享作品数据 / 概念图
│  ├─ enterprise-showcase/  # 政企领域的独立视觉目录
│  ├─ 3d-showcase/          # 汽车采样站交互演示前端
│  ├─ chat/                 # React + NestJS 对话应用（chat.herong.info）
│  ├─ dev-guides/           # Astro 教程站与线上 / 本地写作台
│  └─ light-tools/
│     ├─ web/               # Next.js 工具箱与课程站
│     └─ worker/            # 后台处理 Worker（不代表生产工具容器依赖它）
├─ packages/
│  └─ light-tools/
│     ├─ shared/            # 工具箱共享类型与注册表
│     └─ file-core/         # 文件处理核心包
├─ docs/
│  ├─ homepage.md           # 首页定位、六张卡片与代码入口
│  ├─ site-architecture-migration.md # 主站架构与迁移边界
│  ├─ dev-guides/           # 教程 IP 的计划、来源库、选题与研究资料
│  └─ light-tools/          # 工具箱设计与运维文档
├─ infra/
│  ├─ site/                 # 主站镜像、独立入口、版本化部署与回滚
│  └─ light-tools/migration/ # 工具原镜像、数据卷及私有配置迁移
├─ scripts/build-site.mjs   # 主站检查、历史构建、Astro 构建、合并与验证
├─ package.json
└─ pnpm-workspace.yaml
```

## 开发

开发者工具教程与短视频 IP 的资料统一从 [项目文档入口](docs/dev-guides/README.md) 查看；写作、图片上传和内容发布见 [教程站使用说明](apps/dev-guides/README.md)。

界面开发遵循 [UI 规范](docs/ui-guidelines.md)，业务图标统一使用 **Lucide**：Astro 用 `@lucide/astro`，React 用 `lucide-react`，Vue 用 `lucide-vue-next`；禁止以文本符号、Emoji、CSS 拼图或手写 SVG 代替库图标。规则覆盖公开站、后台和移动端。修改官网首页前，先阅读 [首页定位与内容约定](docs/homepage.md)，保留五个领域、开发工具教程入口及已确认的设计边界。

需要 Node.js **22.22.0+**（当前 Astro 的引擎要求；CI 配置使用 Node 24）和 pnpm 10.28.0。在仓库根目录执行：

```bash
cd code
corepack enable
pnpm install --frozen-lockfile
pnpm dev:site       # Astro 作品主站；pnpm dev 默认也启动它
pnpm dev:blog       # VitePress 完整兼容站 / 历史文章
pnpm dev:tools      # 工具箱
pnpm dev:chat       # AI 对话应用（前后端同时启动）
```

主站入口配置见 [主站说明](apps/site/README.md) 和 `apps/site/.env.example`。主要变量为 `PUBLIC_SITE_URL`（站点 origin）、`PUBLIC_BASE_PATH`（链接与资源前缀）、`PUBLIC_GUIDES_URL` 和 `PUBLIC_TOOLS_URL`；独立产品域名集中在 `apps/site/src/config/site.mjs`。预览设置 `PUBLIC_DEPLOY_ENV=staging` 或 `PUBLIC_NOINDEX=true`，不能将 IP 预览产物作为正式根域名产物部署。

常用检查和构建：

```bash
pnpm check:site     # Astro 类型和模板检查
pnpm test:site      # 路由归属、合并、canonical、资源与预览索引规则回归测试
pnpm build:site    # 完整主站交付：检查 → VitePress 兼容 → Astro → 合并 → 验证
pnpm preview:site  # 仅预览 Astro 的 dist，不包含历史文章或入口代理
pnpm build:blog    # 独立完整 VitePress 构建，保留 GitHub Pages 发布能力
pnpm build:tools
pnpm build:worker
pnpm check:chat
pnpm build:chat
pnpm typecheck
pnpm lint
```

主站完整生产构建示例：

```bash
PUBLIC_SITE_URL=https://herong.info PUBLIC_BASE_PATH=/ \
PUBLIC_DEPLOY_ENV=production \
PUBLIC_GUIDES_URL=https://101.96.210.172/dev/ \
PUBLIC_TOOLS_URL=https://herong.info/file-tools \
pnpm build:site
```

输出为 `apps/site/dist-bundle/`；`apps/site/dist/` 只包含 Astro 新页面。完整交付按 `apps/site/scripts/route-policy.mjs` 明确归属合并历史文章和资源，冲突即失败；新增路由必须同步归属清单。可只读复验已有产物：

```bash
node apps/site/scripts/verify-static.mjs --dir apps/site/dist-bundle --base / --site-url https://herong.info
```

创建博客文章：

```bash
pnpm blog:new -- "文章标题"
```

## 部署

2026-10-24 的主站实现和本地合并验证已完成；本节提供代码与操作入口，不代表正式域名已切换、远程迁移已验收或 CI 新目标已启用。实际 release、服务器配置、验收和回滚结果见部署记录。

- 主站：[架构与迁移边界](docs/site-architecture-migration.md)、[容器部署与回滚说明](infra/site/README.md)。目标服务器为用户确认的 `101.96.210.172`，主站一个 Nginx 容器。版本化部署脚本不覆盖教程内容或其他产品。
- 政企与数字孪生演示：[完整部署交接文档](docs/enterprise-demo-deployment.md)，包括领域入口、独立前后端、Nginx、SSE、验收和回滚。主站迁移不改变 `/projects/enterprise/` 和 `/projects/enterprise/sampling-station/` 的身份、正式路径及独立部署边界；旧服务器的独立服务和媒体证书续期未承接前不能退役。
- 自动发布：`.github/workflows/deploy.yml` 保留 `master` 提交发布和 GitHub Pages `/blog/`；默认仍选择旧 `legacy` 目标。新工作区已准备 `build-only`、`container-preview`、`container-production` 目标，实际启用依赖仓库变量、Secrets 与手动验收，不能仅依据工作流文件宣称已切换。详见 [主站自动发布切换](infra/site/README.md#自动发布切换)。
- 工具箱：现有生产是单个 Next.js + FFmpeg 容器。原构建入口为 `docker compose -f infra/light-tools/docker-compose.prod.yml up -d --build`；本次迁移使用 [数据与原镜像迁移说明](infra/light-tools/migration/README.md)，与主站分开发布，先保留 `/file-tools` 编译时路径，不混入域名根路径重构。
- AI 对话：运行 `pnpm deploy:chat`，脚本会生成内容版本、构建 linux/amd64 镜像、上传服务器、健康检查并保留失败回滚点。仅构建验证可运行 `pnpm deploy:chat -- --build-only`。默认镜像代理仍固定原基础镜像摘要；可通过 `CHAT_NODE_IMAGE` 切换可信仓库。
- Nginx：历史参考配置位于 `infra/nginx/`；新主站只按 `infra/site/nginx/` 为实际 HTTPS server 增补必要规则，不整份覆盖其他站点。对话站沿用服务器现有 `chat.herong.info` 配置。
