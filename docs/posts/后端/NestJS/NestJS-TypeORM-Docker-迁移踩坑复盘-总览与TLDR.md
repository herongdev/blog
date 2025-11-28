---

title: NestJS + TypeORM + Docker 迁移踩坑复盘（总览与 TL;DR）
date: 2025-11-17
tags:

- Docker
- NestJS
- TypeORM
- MySQL
- ts-node

categories:
- 后端
description: 迁移长期不生效的根因与一次性修复要点，提供后续文章导航。

---

### 结论（TL;DR）

- 迁移长期不生效的根因是多点叠加：环境变量未注入、Docker ENTRYPOINT 覆盖/丢失、CLI 调用方式与 TypeORM 版本不匹配、路径别名未加载、TS 严格编译阻断 CLI 执行、等待 DB 的 TLS 客户端参数不兼容等。
- 现已全部修复：容器启动 → 等待 DB→ 自动预览并执行迁移 →Nest 启动；后续无需手动敲命令。

---

## 本系列导航

- Part 1（本文）：总览与 TL;DR
- Part 2：Docker ENTRYPOINT、CRLF、`.env` 注入与 Compose 健康检查
- Part 3：等待数据库与 TLS 客户端参数（`mysql --ssl=FALSE`）
- Part 4：TypeORM CLI 正确姿势（`npx typeorm-ts-node-commonjs` + `tsconfig-paths` + `TRANSPILE_ONLY`）
- Part 5：`data-source.ts` 的日志类型与迁移路径（ts/js 双环境）

---

## 主要问题与对应修复（摘要）

- Unknown column 'session.last_ping_at' → 强制在容器启动时自动执行迁移（固定模板）
- 容器重启未迁移 → `.env.dev` 未注入 DB_PASS；Compose 健康检查变量插值警告
- 入口脚本报错 → Windows CRLF + 直接 exec 导致解析异常；镜像内统一行尾并用 `sh` 启动
- mysql TLS 报错 → 探活阶段禁用 TLS 验证：`--ssl=FALSE --ssl-verify-server-cert=OFF`
- TypeORM CLI 路径不匹配 → 使用 `npx typeorm-ts-node-commonjs ...`
- 别名 `@` 解析失败 → 预加载 `-r ts-node/register -r tsconfig-paths/register`
- TS 严格编译阻断迁移 → `TS_NODE_TRANSPILE_ONLY=1`，并设定 `TS_NODE_PROJECT`
- 迁移路径 ts/js 不兼容 → 运行时判断 `__filename` 后切换 glob
- LoggerOptions 类型不匹配 → 使用 `LoggerOptions` 正确联合类型（或 `false`）

---

后续各篇会给出可直接复制的固定模板与详细注释，确保“容器每次启动自动、幂等地完成迁移”。
