---

title: NestJS + TypeORM + Docker 迁移（Part 5）— DataSource：日志类型与迁移路径
date: 2025-11-17
tags:

- NestJS
- TypeORM
- MySQL
- ts-node
  categories:
- 后端
  description: 在 data-source.ts 中正确设置 LoggerOptions 类型，并根据运行时智能切换迁移路径（ts/js）。

---

## 症状与根因

- TS2322：`LoggerOptions` 只读元组类型不匹配。
- 迁移路径仅支持 ts，生产 dist 下找不到 js 迁移。

---

## 固定模板（片段）

```ts
import { resolve } from "node:path";
import { DataSource, LoggerOptions } from "typeorm";

const isTsEnv = __filename.endsWith(".ts");
const migrationsGlob = isTsEnv
  ? [resolve(__dirname, "../migrations/*.ts")]
  : [resolve(__dirname, "../migrations/*.js")];

const loggingOption: LoggerOptions =
  process.env.TYPEORM_LOGGING === "false"
    ? false
    : ["error", "warn", "schema", "migration"];

export default new DataSource({
  // ... 你的其它配置（host/port/username/password/database 等）
  migrations: migrationsGlob,
  logging: loggingOption,
});
```

---

## 要点

- 使用 `LoggerOptions` 的联合：`false | ReadonlyArray<...>`，避免用写死的只读元组类型不匹配。
- 根据运行文件后缀判断运行时（ts-node vs dist js），分别指向 ts/js 迁移文件。
- 生产执行迁移时，`-d dist/database/data-source.js` 与上面 `*.js` 匹配。
