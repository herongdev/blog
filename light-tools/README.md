# LightTools

面向中文用户的轻量文件处理工具箱。当前已完成项目初始化、基础网站骨架、课程会员权限 MVP、微信支付 Native 接入框架和 MP4 转 GIF 首个服务端工具。数据库和队列仍放在后续阶段。

## 当前范围

- Next.js App Router 网站
- 首页 `/`
- 工具列表页 `/tools`
- 课程列表页 `/courses`
- 课程登录 / 注册 `/courses/login`
- 我的课程 `/courses/me`
- 课程权限后台 `/admin/courses`
- 共享工具注册表
- `/api/health`
- MP4 转 GIF `/tools/mp4-to-gif`
- 图片转 PDF `/tools/image-to-pdf`
- PDF 合并 `/tools/pdf-merge`
- PDF 拆分 `/tools/pdf-split`
- PDF 页面整理 `/tools/pdf-organize`
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
https://herong.info/file-tools/
```

工具箱服务监听服务器本机端口：

```text
127.0.0.1:3001
```

Nginx 把 `/file-tools/` 反代到这个本机端口。博客 GitHub Actions 的 VPS 构建会把“工具箱”菜单指向 `/file-tools/`，GitHub Pages 构建会指向 `https://herong.info/file-tools/`。

服务器上启动工具箱：

```bash
cd light-tools
NEXT_PUBLIC_BASE_PATH=/file-tools \
NEXT_PUBLIC_SITE_URL=https://herong.info/file-tools \
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

## 课程会员与收费 MVP

课程功能先采用“后端权限 + 手动收款开通”的 MVP：

- 课程入口：`/courses`
- 课程账号：`/courses/login`
- 我的课程：`/courses/me`
- 管理员手动开通：`/admin/courses`
- 课程账号保存在 `LIGHT_TOOLS_DATA_DIR/course-access.json`
- 密码使用 Node.js `scrypt` 加盐哈希保存。
- 登录使用 HttpOnly cookie，不把付费正文放进静态博客 HTML。
- 购买按钮会创建 `pending` 订单。
- 未配置微信商户参数时，由管理员在后台输入邮箱和订单号手动开通。
- 配置微信商户参数后，订单页会生成 Native 支付二维码，支付回调成功后自动开通课程权限。

生产环境建议额外配置：

```bash
LIGHT_TOOLS_MEMBER_SESSION_SECRET=replace-with-a-long-random-secret
```

微信支付建议先接 Native 扫码支付，详细接入步骤见：

```text
docs/wechat-pay-integration-plan.md
```

本地已经准备了 `.env` 生产配置模板，文件被 `.gitignore` 忽略，不会进入 Git。服务器部署时可以复制这份配置，或用服务器上的安全环境变量替代。

启用微信支付前，需要准备：

```bash
WECHAT_PAY_ENABLED=true
WECHAT_PAY_APPID=已认证服务号/小程序/移动应用 appid
WECHAT_PAY_MCH_ID=微信支付商户号
WECHAT_PAY_API_V3_KEY=32位 API v3 密钥
WECHAT_PAY_CERT_SERIAL_NO=商户 API 证书序列号
WECHAT_PAY_PRIVATE_KEY_PATH=/run/secrets/light-tools/apiclient_key.pem
WECHAT_PAY_PLATFORM_CERT_PATH=/run/secrets/light-tools/wechatpay_platform_cert.pem
WECHAT_PAY_NOTIFY_URL=https://herong.info/file-tools/api/payments/wechat/notify
```

生产 compose 会把仓库外的 `secrets/` 目录只读挂载到容器内 `/run/secrets/light-tools`。`secrets/` 已加入 `.gitignore` 和 `.dockerignore`，不要把私钥提交进 Git。

## 统计与后台

当前先实现自有统计 MVP：

- 前端记录页面访问和工具页打开，提交到 `/api/analytics`。
- 服务端记录工具使用尝试、成功、失败和额度拦截。
- 统计事件写入 `LIGHT_TOOLS_DATA_DIR/analytics-events.jsonl`。
- 后台入口为 `/admin`，登录后访问 `/admin/stats` 查看最近 30 天统计。
- 生产环境必须配置 `LIGHT_TOOLS_ADMIN_PASSWORD` 和 `LIGHT_TOOLS_ADMIN_SESSION_SECRET`。

这套统计不依赖第三方 SDK；目前保存的是匿名访客哈希、客户端 IP、IP 哈希、路径、事件类型和时间。客户端 IP 仅用于后台排查和近似地域判断，不对外展示。后续如果要做长期趋势、漏斗和付费分析，建议迁移到 PostgreSQL 或 ClickHouse。

## 下一步

优先继续完善浏览器本地 PDF 工具：PDF 转图片、PDF 轻量压缩和图片裁剪/证件照尺寸。服务器任务、会员、支付、数据库和队列放到后续阶段。
