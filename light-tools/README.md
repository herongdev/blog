# LightTools

面向中文用户的轻量文件处理工具箱。当前已完成项目初始化、基础网站骨架和 MP4 转 GIF 首个服务端工具，不包含登录、支付、数据库或队列。

## 当前范围

- Next.js App Router 网站
- 首页 `/`
- 工具列表页 `/tools`
- 1 个工具占位页
- 共享工具注册表
- `/api/health`
- MP4 转 GIF `/tools/mp4-to-gif`
- 图片转 PDF `/tools/image-to-pdf`
- PDF 合并 `/tools/pdf-merge`
- 图片压缩 `/tools/image-compress`
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

## 免费次数识别

当前 MP4 转 GIF 先用 MVP 方案限制匿名免费次数：

- 服务端给浏览器设置 `lt_anon_id` HttpOnly 匿名 cookie。
- 同一个匿名 cookie 和同一个 IP 哈希都会按工具计数，默认 30 天内免费 5 次。
- 可通过 `LIGHT_TOOLS_FREE_CONVERSIONS` 和 `LIGHT_TOOLS_FREE_WINDOW_DAYS` 调整。
- 用户清 cookie 或换浏览器时，IP 哈希会做一层兜底；但换网络、VPN、共享出口 IP 或服务重启仍会影响计数，所以这不是最终收费级方案。

正式付费前建议升级为：登录用户 ID + 数据库持久化额度记录 + 匿名 cookie/IP/UA 作为未登录兜底 + 支付订单和额度流水。

## 统计与后台

当前先实现自有统计 MVP：

- 前端记录页面访问和工具页打开，提交到 `/api/analytics`。
- 服务端记录工具使用尝试、成功、失败和额度拦截。
- 统计事件写入 `LIGHT_TOOLS_DATA_DIR/analytics-events.jsonl`。
- 后台入口为 `/admin`，登录后访问 `/admin/stats` 查看最近 30 天统计。
- 生产环境必须配置 `LIGHT_TOOLS_ADMIN_PASSWORD` 和 `LIGHT_TOOLS_ADMIN_SESSION_SECRET`。

这套统计不依赖第三方 SDK；目前保存的是匿名访客哈希、IP 哈希、路径、事件类型和时间，不保存原始 IP。后续如果要做长期趋势、漏斗和付费分析，建议迁移到 PostgreSQL 或 ClickHouse。

## 下一步

优先实现浏览器本地处理工具：PDF 拆分。服务器任务、会员、支付、数据库和队列放到后续阶段。
