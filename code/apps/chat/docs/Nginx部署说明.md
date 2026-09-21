# Nginx 部署说明

本次部署使用现有服务器 `115.190.214.176`，站点为 `https://chat.herong.info`。React 静态资源与 NestJS API 由同一个应用容器提供，宿主机 Nginx 负责 HTTPS 和反向代理。

## 配置位置

| 项目     | 配置                                                                                                    |
| -------- | ------------------------------------------------------------------------------------------------------- |
| DNS      | 火山引擎 `herong.info` 下的 `chat` A 记录，值 `115.190.214.176`，TTL 600 秒                             |
| 应用目录 | `/opt/zhixu-chat`                                                                                       |
| Compose  | `compose.yaml` + `compose.local.yaml`，项目名 `zhixu-chat`                                              |
| 应用端口 | `127.0.0.1:24301` 映射容器 `3001`，不向公网直接开放                                                     |
| 站点来源 | `APP_ORIGIN=https://chat.herong.info`                                                                   |
| Nginx    | `/etc/nginx/conf.d/chat.herong.info.conf`，仓库模板见 [站点配置](../deploy/nginx/chat.herong.info.conf) |
| 证书     | `/etc/nginx/ssl/chat.herong.info/`，由服务器现有 acme.sh 定时任务续期并校验、重载 Nginx                 |
| 模型配置 | 服务器 `/opt/zhixu-chat/.env.runtime`，只交给容器运行时，不进入镜像或代码仓库                           |

这里复用 `compose.local.yaml` 的回环端口映射，由宿主机 Nginx 提供公网入口。不要叠加 `compose.production.yaml`：它的 Caddy 会尝试占用已有的 80/443 端口。

Nginx 对流式响应关闭代理缓冲和压缩；客户端断开后不继续保持上游请求，代理读取超时大于应用的最大生成时限。具体语义见 [Nginx 官方代理模块说明](https://nginx.org/en/docs/http/ngx_http_proxy_module.html)。

## 构建与更新

应用迁入 `herong.info/code/apps/chat/` 后，在 monorepo 的 `code/` 目录运行 `pnpm deploy:chat` 即可完成内容版本计算、linux/amd64 镜像构建、旧日志归档、上传、健康检查和失败回滚。`pnpm deploy:chat -- --build-only` 只验证镜像构建。默认使用固定 SHA-256 摘要的镜像代理；可通过 `CHAT_NODE_IMAGE` 切换可信仓库，摘要仍应保持一致。脚本位于 `code/infra/chat/`，复用服务器现有 `.env.deploy`、`.env.runtime` 和 Nginx 配置，不读取或上传密钥。

服务器已有其他应用，镜像仍在开发机按服务器架构构建，避免占用服务器的构建资源。以下是等价的分步操作：

```bash
docker build --platform linux/amd64 -t zhixu-chat:版本标识 .
docker save zhixu-chat:版本标识 | gzip > /tmp/zhixu-chat.tar.gz
scp /tmp/zhixu-chat.tar.gz root@115.190.214.176:/opt/zhixu-chat/releases/
```

在服务器执行：

```bash
cd /opt/zhixu-chat
docker load < releases/zhixu-chat.tar.gz
# 先记录当前容器镜像，供回退使用。
docker compose --project-name zhixu-chat --env-file .env.deploy \
  -f compose.yaml -f compose.local.yaml images
# 将 .env.deploy 中 APP_IMAGE 改为刚加载的版本，再执行：
docker compose --project-name zhixu-chat --env-file .env.deploy \
  -f compose.yaml -f compose.local.yaml up -d --no-build --wait --wait-timeout 60
curl --fail http://127.0.0.1:24301/api/healthz
nginx -t && systemctl reload nginx
```

验收失败时，将 `APP_IMAGE` 改回记录的旧镜像，再执行同一条 Compose 更新命令。保留上一版镜像，确认新版本稳定后再清理本应用的旧归档；不清理服务器其他项目的镜像或卷。

Docker Hub 连接失败时，可通过可信镜像代理获取 Dockerfile 指定的同一个 SHA-256 摘要。本次使用 `docker.m.daocloud.io/library/node` 获取相同摘要，构建日志保留实际来源。

## 上线检查

- DNS 指向目标服务器，HTTP 跳转 HTTPS，证书匹配域名。
- `/api/healthz` 返回正常，首页及静态资源能够加载。
- 本地样例能够展示完整正文、活动过程和引用；刷新后恢复本浏览器的聊天记录。
- 模型配置接口只返回公开配置状态。JSON 回放不需要密钥；真实模型是否可用以线上配置状态为准。
- 模型密钥只通过服务器运行环境注入，不放入 Nginx、前端或镜像。本站当前按演示需要开放访问，不设共享口令；保留单进程最多 4 路生成和 120 秒超时。

日志分别位于容器标准输出及 `/var/log/nginx/chat.herong.info.*.log`。容器已设置健康检查、自动重启、内存限制和日志轮转。站点配置增加 `chat.herong.info.timing.log`，按请求编号关联应用与代理耗时，字段见 [请求诊断与草稿](请求诊断与草稿.md)。宿主机的 `/etc/logrotate.d/nginx` 已覆盖该文件，每日轮转、保留 10 份并压缩。

Docker 日志轮转不能保留已经被删除的旧容器日志。每次替换容器前应执行以下归档；本次线上发布也执行此步骤。目录和文件仅管理员可读，不纳入交付 ZIP：

```bash
install -d -m 700 /opt/zhixu-chat/output/deploy/logs
(umask 077; docker logs --timestamps zhixu-chat-app-1 > "/opt/zhixu-chat/output/deploy/logs/app-$(date -u +%Y%m%dT%H%M%SZ).log" 2>&1)
```

归档只保存容器现有标准输出，不读取运行环境。按运维需要定期清理旧归档；自动化 `scripts/deploy.mjs` 当前不代管这一步。Nginx 耗时日志位于宿主机，容器更新不会删除它。修改站点配置前备份，`nginx -t` 成功后再 reload，校验失败恢复备份。

## 版本核对

快速发布按 Docker 构建输入生成 12 位内容版本；相同源码得到相同版本。镜像标签和 `org.opencontainers.image.revision` 均记录该内容版本，适用于 monorepo 中尚未提交的本地验证。可在服务器执行以下命令核对线上版本和健康状态，不读取模型密钥：

```bash
docker inspect zhixu-chat-app-1 --format 'revision={{index .Config.Labels "org.opencontainers.image.revision"}} health={{.State.Health.Status}}'
```

## 首次上线与接口验证记录

2026-09-04 发布工作区构建镜像 `zhixu-chat:20260904-chat`，镜像摘要为 `sha256:e4775b9d14369656ac3ca7667f0bc21946939a0913058eaf01ab368da6e70911`。容器健康检查通过，DNS、HTTP 到 HTTPS 跳转、证书域名与信任校验、首页和公开接口均已验证。

通过 Chrome 对线上站点实际操作，完成原附件回放、引用弹窗从 1/2 翻到 2/2、活动过程资料展示，以及刷新后恢复回答、草稿和 16 处引用。验收脚本等待 Markdown 异步加载完成后再核对引用数量。

首次上线使用本地 JSON 样例。同日按演示需要接入服务器模型配置：百炼和 DeepSeek 的公开配置状态均为已配置。经公网 HTTPS / Nginx 分别调用 `qwen-plus` 与 `deepseek-v4-flash`，关闭深度思考、各发送一次简短连通性问题；两家均返回 HTTP 200、`text/event-stream`、非空正文和正常结束事件，流式响应没有被 gzip 压缩。该验证只说明这两个模型在验证时可用，不代表其他模型或所有能力均已实测。

本次只更新运行时配置并重建应用容器，没有更换应用镜像。HTTPS 证书有效期截至 2026-12-03，后续由现有 acme.sh 定时任务自动续期。

同日补充 `qwen3-vl-plus` 到线上百炼模型列表，使用一张左红右蓝的 PNG 测试图，经公网接口发送真实图片请求，模型正确识别两侧颜色并正常结束。图片问答选择该视觉模型；原有文本模型保持不变。模型能力依据见 [百炼视觉模型说明](https://help.aliyun.com/zh/model-studio/qwen3-vl-plus)。
