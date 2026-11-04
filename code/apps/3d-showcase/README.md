# 3D Showcase

汽车采样站三维展示应用，迁移自 `/Users/ronnie/Documents/my-project/3DGis/apps/web`。
原工程保持只读；此目录是 blog 工作区内后续维护和部署的版本。

正式地址：`https://herong.info/projects/enterprise/sampling-station/`，返回领域首页 `https://herong.info/projects/enterprise/`。这是单个项目演示，领域首页由 `../enterprise-showcase/` 独立维护。

在 `code/` 执行：

```bash
pnpm --filter @herong/3d-showcase dev --port 5174
pnpm --filter @herong/3d-showcase check:paths
pnpm --filter @herong/3d-showcase build
pnpm --filter @herong/3d-showcase preview
```

开发服务从 `/projects/enterprise/sampling-station/` 打开。`VITE_BASE_PATH` 默认是该正式前缀，`VITE_API_BASE_URL` 未设置时使用同前缀下的 `api`；`.env.example` 给出显式配置。`API_PROXY_TARGET` 只供开发代理使用，默认 `http://127.0.0.1:8080`，代理把浏览器的项目 API 前缀改写为 Java 服务内部 `/api`。开发代理不会进入静态产物，生产环境必须配置 Nginx；不要把生产浏览器请求改成主域根 `/api`。

`dist/` 只用于独立发布，不合并进主站或 GitHub Pages，也不由主站 CI 自动部署。前端与 Java/H2 后端继续部署在旧机 `115.190.214.176`，主域新机以既定项目路径回源；不能部署回 `/3d/` 或 `/var/www/herongsite/`。完整目录、构建、API/SSE、备份与回滚规则见 [部署交接](../../docs/enterprise-demo-deployment.md)。

当前展示使用模拟数据，需要单独启动原 `3DGis` Java 后端；未取得接口数据不代表真实设备在线。`public/source-ui/` 是随原前端迁入的界面素材，仓库暂未提供逐图来源与再分发授权证明，不能仅据迁入记录宣称为自制或自由授权资源。浏览器及设备验收与 TypeScript/构建检查分开记录；本次本地校正不代表重新上线。
