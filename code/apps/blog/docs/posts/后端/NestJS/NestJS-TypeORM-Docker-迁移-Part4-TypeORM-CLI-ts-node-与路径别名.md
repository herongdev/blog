---

title: NestJS + TypeORM + Docker 迁移（Part 4）— TypeORM CLI、ts-node 与路径别名
date: 2025-11-17
tags:

- NestJS
- TypeORM
- ts-node
- Docker

categories:
- 后端
description: 正确使用 TypeORM CLI（兼容当前版本），注入 ts-node 与 tsconfig-paths，避免严格编译阻断迁移。

---

## 症状与根因

- Cannot find module './cli.js'：直接用 `ts-node` 执行旧路径与当前 TypeORM 不匹配。
- Cannot find module '@/shared/entities/focus'：CLI 未加载 `tsconfig-paths`，`@` 别名不可用。
- TS7006/类型错误导致迁移中断：CLI 会编译 `data-source.ts`，严格类型阻断执行。

---

## 固定模板（entrypoint.sh 迁移段）

```bash
# 迁移（开发，ts-node）
echo "Running migrations (ts-node via npx)..."
TS_NODE_TRANSPILE_ONLY=1 TS_NODE_PROJECT=tsconfig.json \
  NODE_OPTIONS="$NODE_OPTIONS -r ts-node/register -r tsconfig-paths/register" \
  npx typeorm-ts-node-commonjs migration:run -d src/database/data-source.ts
```

- CLI：使用 `npx typeorm-ts-node-commonjs`（与 TypeORM 新版本兼容）。
- 预加载：`-r ts-node/register -r tsconfig-paths/register` 使 TS 与路径别名在 CLI 下生效。
- 仅转译：`TS_NODE_TRANSPILE_ONLY=1` 避免类型报错阻断迁移（生产 CI 可开启更严格策略）。
- 项目文件：通过 `TS_NODE_PROJECT=tsconfig.json` 指定正确 tsconfig。

---

## 常见陷阱

- 直接 `node --loader ts-node/esm` 运行 CLI 在 CJS 项目下常见兼容问题，推荐以上 CJS 命令。
- 忘记把 `NODE_OPTIONS` 传入容器环境，导致别名在 CLI 下仍然失效。
