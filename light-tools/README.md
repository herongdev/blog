# LightTools

面向中文用户的轻量文件处理工具箱。当前已完成项目初始化、基础网站骨架和 MP4 转 GIF 首个服务端工具，不包含登录、支付、数据库或队列。

## 当前范围

- Next.js App Router 网站
- 首页 `/`
- 工具列表页 `/tools`
- 5 个工具占位页
- 共享工具注册表
- `/api/health`
- MP4 转 GIF `/tools/mp4-to-gif`
- Worker 占位应用

## 和博客的关系

当前工具箱是独立的 Next.js 应用，代码放在博客仓库的 `light-tools/` 目录里。博客的 VitePress 导航已经加入“工具箱”菜单，本地默认指向：

```text
http://127.0.0.1:3000
```

这只是本地融合，尚未发布到线上。正式上线时需要：

1. 单独部署 `light-tools/apps/web`。
2. 给工具箱配置线上域名，例如 `https://tools.example.com` 或博客子路径反代。
3. 在博客构建环境里设置 `LIGHT_TOOLS_URL` 为线上工具箱地址。
4. 重新构建并发布博客。

当前仓库已按“博客同域子路径”准备好生产配置：

```text
http://herong.info/file-tools/
```

工具箱服务监听服务器本机端口：

```text
127.0.0.1:3001
```

Nginx 把 `/file-tools/` 反代到这个本机端口。博客 GitHub Actions 的 VPS 构建会把“工具箱”菜单指向 `/file-tools/`，GitHub Pages 构建会指向 `http://herong.info/file-tools/`。

服务器上启动工具箱：

```bash
cd light-tools
NEXT_PUBLIC_BASE_PATH=/file-tools \
NEXT_PUBLIC_SITE_URL=http://herong.info/file-tools \
docker compose -f docker-compose.prod.yml up -d --build
```

Nginx 需要在博客 `server { ... }` 中包含或复制：

```text
nginx/light-tools-location.conf
```

## 本地启动

```bash
cd light-tools
pnpm install
pnpm dev
```

默认访问：

```text
http://localhost:3000
```

健康检查：

```text
http://localhost:3000/api/health
```

## 常用命令

```bash
pnpm dev
pnpm build
pnpm typecheck
pnpm lint
```

## 上传安全

当前 MP4 转 GIF 已做基础上传校验：

- 单个 MP4 免费限制 50MB。
- 只接受 `.mp4` 文件。
- 校验 MIME 类型，允许浏览器上传时常见的空类型和 `application/octet-stream`，但必须继续通过文件头校验。
- 校验 MP4 `ftyp` 文件头。
- 拦截常见可执行文件、脚本和伪装成 MP4 的 PDF、图片、ZIP 文件头。
- 文件只写入系统临时目录，转换结束后删除。

这些是文件类型与大小的安全闸门，不等同于真正的病毒查杀。生产环境如果开放匿名上传，建议再接入：

- 反向代理层请求体大小限制。
- 任务队列隔离转换进程。
- ClamAV 或云厂商对象存储杀毒扫描。
- 临时文件生命周期清理任务。
- 下载前再次校验任务归属和文件状态。

## 下一步

优先实现浏览器本地处理工具：PDF 合并、PDF 拆分、图片转 PDF。服务器任务、会员、支付、数据库和队列放到后续阶段。
