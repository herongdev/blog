---
title: 在 NestJS 中引入 Redis——从 0 到可用（ioredis 版）
date: 2025-09-07 20:40:23
tags:
---

---

title: 在 NestJS 中引入 Redis——从 0 到可用（ioredis 版）
date: 2025-09-07
tags:

- NestJS
- Redis
- ioredis
- 教程
  categories:
- 后端
  description: 手把手带你在 NestJS 中集成 Redis（基于 ioredis），涵盖安装、配置、Provider、全局模块封装、业务实践（限流/一次性令牌）、Docker、本地调试与常见报错排查。

---

# 目标与适用读者

- 目标：在 **NestJS** 项目中稳定接入 **Redis**，通过 **ioredis** 驱动，提供可复用的 `RedisService`（封装 `set/get/del/incr/expire`、NX 写入等），并支持 **全局模块**、**环境配置**、**本地/生产** 两套部署。
- 适用：会基本 NestJS 模块/依赖注入的同学；数据库用 TypeORM/Prisma 均可（与本教程无冲突）。

---

# 技术栈选型

- Redis 客户端：**ioredis**（成熟、支持集群/哨兵、TypeScript 友好）。
- Nest 集成方式：自定义 **Provider + 全局模块**，暴露 `REDIS_CLIENT` 与 `RedisService`。
- 配置：`.env` 中支持 `REDIS_URL` 或 `REDIS_HOST/PORT/PASSWORD/DB`。

---

# 目录结构（建议）

```
src/
  common/
    redis/
      redis.module.ts       # 全局模块（@Global）
      redis.service.ts      # 业务友好封装（依赖 REDIS_CLIENT）
  app.module.ts             # 或各业务模块，引入 RedisModule 一次即可
```

---

# 第一步：安装依赖

```bash
# 使用 pnpm（推荐）
pnpm add ioredis
# 或者 npm
# npm i ioredis
```

---

# 第二步：准备环境变量

建议在 `.env`（或 `.env.dev`）中添加 **二选一**：

```ini
# 方式 A：URL 一行式（含密码与 DB 索引，推荐）
REDIS_URL=redis://:password@localhost:6379/0

# 方式 B：分散式
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
REDIS_PASSWORD=
REDIS_DB=0
```

---

# 第三步：编写 `RedisService`

> 放在 `src/common/redis/redis.service.ts`
> 命名**清晰可读**，复杂逻辑上方有中文注释。

```ts
import { Injectable, Inject } from "@nestjs/common";
import type { Redis } from "ioredis";

// 复杂：作为底层连接的注入令牌；项目全局唯一
export const REDIS_CLIENT = "REDIS_CLIENT";

@Injectable()
export class RedisService {
  constructor(@Inject(REDIS_CLIENT) private readonly redisClient: Redis) {}

  // 复杂：统一封装写入并设置过期时间，便于存挑战/一次性令牌
  async setWithTimeToLive(
    key: string,
    value: string,
    timeToLiveSeconds = 300
  ): Promise<void> {
    await this.redisClient.set(key, value, "EX", timeToLiveSeconds);
  }

  async getValue(key: string): Promise<string | null> {
    return this.redisClient.get(key);
  }

  async deleteKey(key: string): Promise<void> {
    await this.redisClient.del(key);
  }

  // 复杂：自增计数用于限流（第一次返回 1）
  async incrementKey(key: string): Promise<number> {
    return this.redisClient.incr(key);
  }

  // 复杂：给键设置过期时间，配合 incrementKey 实现简单窗口限流
  async expireKey(key: string, seconds: number): Promise<void> {
    await this.redisClient.expire(key, seconds);
  }

  // 复杂：仅当键不存在时写入并设置 TTL（一次性令牌/幂等防重放）
  async setIfAbsentWithTimeToLive(
    key: string,
    value: string,
    timeToLiveSeconds: number
  ): Promise<boolean> {
    // 复杂：NX 确保不存在才写入；避免并发下的重复写入
    const result = await this.redisClient.set(
      key,
      value,
      "NX",
      "EX",
      timeToLiveSeconds
    );
    return result === "OK";
  }
}
```

---

# 第四步：编写 `RedisModule`（全局模块，一次引入处处可用）

> 放在 `src/common/redis/redis.module.ts`，标记 `@Global()`，自动对全局开放。

```ts
import { Global, Module } from "@nestjs/common";
import * as IORedis from "ioredis";
import { RedisService, REDIS_CLIENT } from "./redis.service";

@Global()
@Module({
  providers: [
    {
      provide: REDIS_CLIENT,
      // 复杂：通过工厂读取 .env，创建 ioredis 客户端
      useFactory: () => {
        const url = process.env.REDIS_URL;
        const host = process.env.REDIS_HOST ?? "127.0.0.1";
        const port = parseInt(process.env.REDIS_PORT ?? "6379", 10);
        const password = process.env.REDIS_PASSWORD || undefined;
        const db = parseInt(process.env.REDIS_DB ?? "0", 10);

        const client: IORedis.Redis = url
          ? new (IORedis as any)(url)
          : new (IORedis as any)({ host, port, password, db });

        // 复杂：记录连接错误，便于排查
        client.on("error", (err: any) => {
          // eslint-disable-next-line no-console
          console.error("[Redis] connection error:", err?.message || err);
        });

        return client;
      },
    },
    RedisService,
  ],
  exports: [REDIS_CLIENT, RedisService],
})
export class RedisModule {}
```

---

# 第五步：在应用中引入 `RedisModule`

> 只需在**任意一个模块**引入一次（例如 `AppModule`），因为它是 `@Global()`。

```ts
// src/app.module.ts（或你任一根模块）
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { RedisModule } from "./common/redis/redis.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    RedisModule, // 复杂：全局模块，仅需引入一次
    // ... 你的其它模块
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

---

# 第六步：业务中使用示例

### 6.1 限流（每分钟最多 10 次）

```ts
import { Injectable, TooManyRequestsException } from "@nestjs/common";
import { RedisService } from "src/common/redis/redis.service";

@Injectable()
export class LoginService {
  constructor(private readonly redisService: RedisService) {}

  // 复杂：按 IP 做 60 秒/10 次 限流
  async limitByIp(ipAddress: string) {
    const rateLimitKey = `rl:login:${ipAddress}`;
    const currentCount = await this.redisService.incrementKey(rateLimitKey);
    if (currentCount === 1) {
      await this.redisService.expireKey(rateLimitKey, 60);
    }
    if (currentCount > 10) {
      throw new TooManyRequestsException("请求过于频繁，请稍后再试");
    }
  }
}
```

### 6.2 一次性令牌（幂等/防重放）

```ts
// 复杂：仅当 key 不存在时写入，5 分钟有效
const ok = await this.redisService.setIfAbsentWithTimeToLive(
  `once:${token}`,
  "1",
  300
);
if (!ok) {
  throw new Error("令牌已使用或失效");
}
```

### 6.3 短期会话/挑战值（例如 WebAuthn）

```ts
await this.redisService.setWithTimeToLive(
  `webauthn:register:${userId}`,
  challengeBase64Url,
  300
);
const cached = await this.redisService.getValue(`webauthn:register:${userId}`);
// ... 验证后删除
await this.redisService.deleteKey(`webauthn:register:${userId}`);
```

---

# 第七步：Docker Compose（本地起 Redis）

> `docker-compose.yml`（项目根目录）

```yaml
version: "3.9"
services:
  redis:
    image: redis:7-alpine
    container_name: demo-redis
    ports:
      - "6379:6379"
    command: ["redis-server", "--appendonly", "yes"]
    volumes:
      - redis-data:/data
volumes:
  redis-data:
```

启动：

```bash
docker compose up -d
# .env 示例
# REDIS_URL=redis://localhost:6379
```

---

# 第八步：生产环境注意事项

- **连接池与超时**：ioredis 默认复用单连接；高并发可根据需要创建多个客户端或使用 `cluster`/`sentinel`。
- **密码与 ACL**：生产务必启用密码或 ACL；不要暴露无鉴权实例。
- **键名规范**：`<领域>:<用途>:<实体>`（如 `webauthn:auth:ch:<challenge>`），可读性与清理都更好。
- **TTL 策略**：短期挑战/令牌务必设置 TTL，并在验证后删除，避免重放。
- **监控**：监控 `connected clients`、`keyspace hits/misses`、`latency`；必要时加慢日志。
- **持久化**：默认 RDB；根据业务考虑 AOF（`appendonly yes`）与混合持久化。

---

# 第九步：常见报错与排查

- **Nest can't resolve dependencies of the RedisService (REDIS_CLIENT)**
  说明：未注册 `REDIS_CLIENT` Provider。
  解决：确保 `RedisModule`（或 `AppModule` 的 `providers`）里 **provide: REDIS_CLIENT** 已配置，并且模块被应用引入。
- **ECONNREFUSED / getaddrinfo ENOTFOUND**
  说明：Redis 未启动或地址错误。
  解决：检查 `REDIS_URL/REDIS_HOST/REDIS_PORT`，本地起容器或服务端口是否 6379。
- **WRONGPASS invalid username-password pair**
  说明：密码有误或未配置。
  解决：核对 `REDIS_URL` 中 `:password@` 或 `REDIS_PASSWORD`。
- **Ready check failed**
  说明：网络/权限/ACL 问题或连接尚未可用。
  解决：检查安全组/防火墙；对云服务需配置白名单。

---

# 第十步：单元测试（Mock Redis）

> 不在测试中连真实 Redis，可用 `ioredis-mock` 或手写假对象。

```ts
import { Test } from "@nestjs/testing";
import { RedisService, REDIS_CLIENT } from "src/common/redis/redis.service";

describe("RedisService", () => {
  it("set/get works", async () => {
    // 复杂：用最小可用的假客户端满足接口
    const fakeClient = {
      storage: new Map<string, string>(),
      set: function (k: string, v: string) {
        this.storage.set(k, v);
        return Promise.resolve("OK");
      },
      get: function (k: string) {
        return Promise.resolve(this.storage.get(k) ?? null);
      },
      del: function (k: string) {
        this.storage.delete(k);
        return Promise.resolve();
      },
      incr: function (k: string) {
        const next = Number(this.storage.get(k) ?? "0") + 1;
        this.storage.set(k, String(next));
        return Promise.resolve(next);
      },
      expire: function () {
        return Promise.resolve();
      },
    } as any;

    const moduleRef = await Test.createTestingModule({
      providers: [
        { provide: REDIS_CLIENT, useValue: fakeClient },
        RedisService,
      ],
    }).compile();

    const redis = moduleRef.get(RedisService);
    await redis.setWithTimeToLive("foo", "bar", 60);
    expect(await redis.getValue("foo")).toBe("bar");
  });
});
```

---

# 结语

至此，你已经完成了 **NestJS × Redis（ioredis）** 的完整接入：

- 全局模块提供底层连接与服务封装；
- 业务中可轻松完成 **限流**、**一次性令牌**、**短期会话/挑战** 等高频需求；
- 本地用 Docker 起 Redis，生产注意密码、ACL、监控与 TTL 策略。

需要我把你的现有项目改造为 **全局 `RedisModule` 方案** 或 **在 `AppModule` 直接注册 Provider** 的最小改动 **完整文件**，就把相关文件发我（或让我复用你上面的 `AppModule` 路径）。
