---
title: passkeys 通行密钥 登录+注册一体化方案
date: 2025-09-04 23:29:49
categories: [web应用开发, 前端]
tags:
---

结论先说：**可以把“登录+注册”做成一体化体验**。

主流做法是 **“先尝试登录（可发现凭证）→ 如果用户或设备上没有可用通行密钥，再走 JIT 注册并在验证成功后直接登录”**。

原因是 WebAuthn 天生是“**两步握手**”：
**options**（服务端签发挑战）→ **客户端做凭证仪式** → **verify**（服务端校验）。
所以无论登录还是注册，都至少要走这一来一回；想“完全无交互”是不可能的。但你可以把 **登录与注册的分支逻辑** 封装好，让前端只调用 1\~2 次 API 就完成。

你的代码里已经有这个形态了：

- `/passkeys/login/options|verify`：**无用户名直登**（allowCredentials 留空 → 可发现凭证）
- `/passkeys/register-or-login/options|verify`：**JIT 建号 + 设备唯一 + 注册即登录**

这就是一体化的正确方向。下面给你**微调点**，让体验更顺滑，并回答“是否必须先绑定”的顾虑。

## 推荐落地流程（与大厂一致的用户体验）

1. **进入应用 → 前端先调用** `/passkeys/login/options`（不传 allowCredentials）。

   - Android/iOS 原生会列出与 **RP ID** 匹配的“可发现凭证”(resident key)。
   - 若用户设备上已有你的 RP 的通行密钥 → 用户点一下即返回 **assertion** → 你后端 `verifyAuthentication` → **直接登录**。

2. **若返回“没有可用凭证/用户取消/NotFound”**：前端**立即**调用 `/passkeys/register-or-login/options`（带上 `deviceIdentifier`）。

   - 后端 **JIT 建号**（或使用你已有的访客/待激活账号策略），签发 **registration options**（residentKey=required）。
   - 前端发起注册仪式 → 拿到 **attestation** 回 `/register-or-login/verify`。
   - 服务端 **校验 + 入库 + 绑定设备(可选) + 激活账号 + 签发 JWT** → **注册即登录**。

> 是否必须先“绑定再登录”？
> **不必须。**对已存在通行密钥的用户，第一步就能登录；对新设备/新用户，第二步完成**注册+登录**。
> “设备唯一绑定”是**风控策略**（特别适合你的“仅内部员工”场景），不是通行密钥的强制要求。

## 只给需要修改/新增的代码（复杂逻辑上一行有注释）

### A) `PasskeysService.issueAuthenticationOptions`：若发现设备已绑定账号，则**定向登录**（加速成功率）

```ts
// 复杂逻辑：若 deviceIdentifier 已绑定 userId，则定向下发 allowCredentials（命中率更高，更快）
async issueAuthenticationOptions({ deviceIdentifier }: { deviceIdentifier?: string }) {
  const relyingPartyId = this.configService.get<string>('RP_ID');

  // 可选的速率限制（60s/5次）
  if (deviceIdentifier) {
    const rlKey = `rl:authpub:${deviceIdentifier}`;
    const c = await this.redisService.incrementKey(rlKey);
    if (c === 1) await this.redisService.expireKey(rlKey, 60);
    if (c > 5) throw new BadRequestException('请求过于频繁，请稍后重试');
  }

  let allowCredentials: { id: Buffer; type: 'public-key' }[] | undefined;
  let preferUserId: string | null = null;

  if (deviceIdentifier) {
    // 复杂逻辑：如果该设备已绑定过账号，优先走“定向登录”
    preferUserId = await this.redisService.getValue(`dvc:owner:${deviceIdentifier}`);
    if (preferUserId) {
      // 复杂逻辑：查询该用户的所有凭证，拼出 allowCredentials（按你的持久层接口调整）
      const creds = await this.staffService.findManyCredentialsByUserId(preferUserId);
      allowCredentials = (creds || []).map((c: any) => ({
        id: Buffer.from(c.credentialId, 'base64url'),
        type: 'public-key' as const,
      }));
    }
  }

  const opts = await generateAuthenticationOptions({
    rpID: relyingPartyId,
    userVerification: 'preferred',
    // 复杂逻辑：存在 allowCredentials → 定向登录；否则留空 = 可发现凭证
    allowCredentials,
  });

  // 复杂逻辑：挑战转为 base64url，分别按“userId”或“challenge”做校验键
  const ch = typeof opts.challenge === 'string'
    ? opts.challenge
    : Buffer.from(opts.challenge).toString('base64url');

  if (preferUserId) {
    // 定向登录：按 userId 存
    await this.redisService.setWithTimeToLive(`webauthn:auth:${preferUserId}`, ch, 300);
  } else {
    // 无用户名直登：按 challenge 存
    await this.redisService.setWithTimeToLive(`webauthn:auth:ch:${ch}`, '1', 300);
  }

  // 兼容前端：无需改协议，仍返回纯 AuthenticationOptions
  return { options: opts };
}
```

> 说明：
>
> - 这段逻辑**不改变你的路由与前端协议**，仅在“已绑定设备”的情况下给出 `allowCredentials`，成功率会更高，且仍保留“可发现凭证”的默认路径。
> - `findManyCredentialsByUserId` 请在你的 `AdminStaffService` 或凭据仓库里补一个简单查询（只要返回 `credentialId` 列表即可）。

---

### B) 前端（你刚写的 `<script setup>` 页面）**登录按钮**增加“失败回退到注册”的兜底（只给改动段）

```ts
// 复杂逻辑：登录失败时自动回退到 JIT 注册（注册成功即登录）
async function onLogin() {
  try {
    appendLog("请求登录 options...");
    const { options } = await post("/passkeys/login/options", {
      deviceIdentifier: deviceId.value,
    });
    const requestOptionsJson = JSON.stringify(options);

    // 复杂逻辑：先尝试登录（Android 支持 conditional UI；iOS 忽略该参数）
    const authRespJson = await passkeys.getPasskey(requestOptionsJson, {
      conditional: true,
    });

    appendLog("登录响应返回，提交后端 verify...");
    const verify = await post(
      "/passkeys/login/verify",
      JSON.parse(authRespJson)
    );
    appendLog("登录完成：" + JSON.stringify(verify));
    uni.showToast({ title: "登录成功", icon: "success" });
  } catch (e: any) {
    appendLog("未找到可用通行密钥或用户取消，转入一键注册...");
    // ===== 回退到 JIT 注册 =====
    const { userId, options } = await post(
      "/passkeys/register-or-login/options",
      deviceId.value ? { deviceIdentifier: deviceId.value } : {}
    );
    const creationOptionsJson = JSON.stringify(options);
    const regRespJson = await passkeys.createPasskey(creationOptionsJson);

    appendLog("注册响应返回，提交后端 verify...");
    const verify = await post("/passkeys/register-or-login/verify", {
      ...JSON.parse(regRespJson),
      userId,
      deviceIdentifier: deviceId.value,
    });
    appendLog("注册并登录完成：" + JSON.stringify(verify));
    uni.showToast({ title: "已注册并登录", icon: "success" });
  }
}
```

---

### C) 小修小补（可选但建议）

```ts
// ✅ 注册 options：建议同时允许 ES256 与 RS256，兼容性更好
supportedAlgorithmIDs: [-7, -257],  // ES256 + RS256

// ✅ 注册时强制 residentKey=required 已很好；登录时建议 UV 至少 preferred（你已这么做）
// 可对内网/高敏环境将 requireUserVerification 提升为 true
requireUserVerification: true, // 在 verify* 中按需要切换
```

---

## 关键答疑

- **“能不能只请求一次后端就完成登录？”**
  不行。WebAuthn 必须由服务器先发“带签名挑战”的 **options**，客户端拿到后**本地安全硬件**完成签名/生成数据，再发给服务器 **verify**。这是设计使然，无法省略。

- **“新用户是否必须先走‘绑定’页面？”**
  不必须。你现在的 JIT 路线就是“**注册即登录**”。首次访问：登录失败 → 自动发起注册 → 验证成功后立刻签发会话即可。后续访问就直接“可发现凭证”一键登录了。

- **“设备唯一绑定是必须的吗？”**
  不是 WebAuthn 的硬性要求，但对**内部员工场景非常有用**（合规+风控）。你已经在 JIT 验证里写了 `dvc:owner:*` 的校验与写入，这就够了。

---

如果你愿意，我可以**补一个 `findManyCredentialsByUserId` 的最小实现**（Prisma/TypeORM 任一版）或把你的 `PasskeysController` 的“登录按钮”分支写成更干净的状态机。你说一声，我按你的“只给改动段”规范继续补。
