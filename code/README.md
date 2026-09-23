# 站点代码 Monorepo

`code/` 是本仓库唯一的代码工作区，由 pnpm workspace 统一管理。

## 目录

```text
code/
├─ apps/
│  ├─ blog/                 # VitePress 技术博客及文章
│  ├─ chat/                  # React + NestJS 对话应用（chat.herong.info）
│  └─ light-tools/
│     ├─ web/               # Next.js 工具箱与课程站
│     └─ worker/            # 后台处理 Worker
├─ packages/
│  └─ light-tools/
│     ├─ shared/           # 工具箱共享类型与注册表
│     └─ file-core/        # 文件处理核心包
├─ docs/light-tools/            # 工具箱设计与运维文档
├─ infra/                       # Docker Compose 与 Nginx 配置
├─ package.json
└─ pnpm-workspace.yaml
```

## 开发

界面开发遵循 [UI 规范](docs/ui-guidelines.md)，图标统一使用图标库或 UI 库组件，禁止以字符代替图标。

修改官网首页前，先阅读 [首页定位与内容约定](docs/homepage.md)，保留领域分类、文章教程入口及已确认的设计边界。

需要 Node.js 20+ 和 pnpm 10.28.0。在仓库根目录执行：

```bash
cd code
corepack enable
pnpm install
pnpm dev:blog       # 技术博客
pnpm dev:tools      # 工具箱
pnpm dev:chat       # AI 对话应用（前后端同时启动）
```

常用检查和构建：

```bash
pnpm build:blog
pnpm build:tools
pnpm build:worker
pnpm check:chat
pnpm build:chat
pnpm typecheck
pnpm lint
```

创建博客文章：

```bash
pnpm blog:new -- "文章标题"
```

## 部署

- 博客：`.github/workflows/deploy.yml` 会构建 `apps/blog` 并发布到 VPS 和 GitHub Pages。
- 工具箱：使用 `docker compose -f infra/light-tools/docker-compose.prod.yml up -d --build`。
- AI 对话：运行 `pnpm deploy:chat`，脚本会生成内容版本、构建 linux/amd64 镜像、上传服务器、健康检查并保留失败回滚点。仅构建验证可运行 `pnpm deploy:chat -- --build-only`。默认镜像代理仍固定原基础镜像摘要；可通过 `CHAT_NODE_IMAGE` 切换可信仓库。
- Nginx：配置文件位于 `infra/nginx/`；对话站沿用服务器现有 `chat.herong.info` 配置。
