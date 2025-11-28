---
title: NestJS + TypeORM + Docker 迁移（Part 2）— ENTRYPOINT、CRLF 与 env/健康检查
date: 2025-11-17
tags:
  - Docker
  - NestJS
  - TypeORM
  - MySQL

categories:
  - 后端
description: 统一入口脚本到镜像、修复 CRLF、正确注入 env 与健康检查，保证容器自启动迁移。
---

## 症状与根因

- exec /docker-entrypoint.sh: no such file or directory、set: illegal option -
  - 根因：Windows CRLF 行尾 + 直接 exec 导致脚本解析异常。
- 容器重启后仍未迁移
  - 根因 1：后端容器未拿到 DB 密码（DB_PASS 未注入），探活循环一直失败。
  - 根因 2：`docker-compose.dev.yaml` 的 healthcheck 在宿主侧使用了 `${DB_PASS}`，未读取 `.env.dev`，同时产生干扰警告。

---

## 固定模板（可直接复用）

- Dockerfile.dev（镜像内 ENTRYPOINT，统一 CRLF）

```dockerfile
WORKDIR /workspace
COPY ./entrypoint.sh /docker-entrypoint.sh
RUN sed -i 's/\r$//' /docker-entrypoint.sh && chmod +x /docker-entrypoint.sh
ENTRYPOINT ["sh", "/docker-entrypoint.sh"]
CMD ["npm", "run", "start:dev"]
```

- docker-compose.dev.yaml（env 注入与健康检查）

```yaml
services:
  db:
    env_file:
      - .env.dev
    healthcheck:
      test:
        [
          "CMD",
          "mysqladmin",
          "ping",
          "-h",
          "localhost",
          "-u",
          "root",
          "-p${MYSQL_ROOT_PASSWORD}",
        ]
  backend:
    env_file:
      - .env.dev
    # ENTRYPOINT/CMD 由镜像控制（Dockerfile）
```

- .env.dev（提供两套变量且一致）

```ini
# 应用连接（Nest）
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=secret
DB_NAME=app

# DB 容器初始化/healthcheck
MYSQL_ROOT_PASSWORD=secret
MYSQL_DATABASE=app
```

---

## 要点

- 入口脚本放进镜像（不要用 Compose 覆盖），避免跨平台行尾/解释器差异。
- 复制脚本后统一行尾：`sed -i 's/\r$//' /docker-entrypoint.sh`。
- Compose 健康检查尽量使用 DB 容器可用变量（如 `MYSQL_ROOT_PASSWORD`），避免宿主解析失败。
- 所有应用侧必需的 `DB_*` 变量通过 `env_file` 注入后端容器。
