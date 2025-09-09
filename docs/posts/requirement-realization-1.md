---
title: 已登录用户的“绑定通行密钥”最佳实践：把唯一标识安全传给后端（含前后端完整实现）
date: 2025-09-05 00:54:31
tags:
---

---

title: 已登录用户的“绑定通行密钥”最佳实践：把唯一标识安全传给后端（含前后端完整实现）
date: 2025-09-05
tags:

- Passkeys
- WebAuthn
- 账号绑定
- 设备唯一

---

## 摘要

当**用户已经登录（本地有 JWT/token）**时，常见需求是“**再绑定一把通行密钥**”（或在新设备上补绑）。本文给出一个**稳妥的一次点击方案**：

- 前端：带上 **Authorization: Bearer \<token>** 与 **X-Device-Id（设备唯一码）** 请求 `/passkeys/register/options`。
- 浏览器完成 `navigator.credentials.create(...)` 后，将结果 + `deviceIdentifier` 回传 `/passkeys/register/verify`。
- 后端：从 **token 解析 userId**，生成/校验 challenge、**入库凭证**，并执行**设备唯一绑定**（`deviceId -> userId`）。

> 关键点：**不要尝试枚举本地是否已有凭证**；隐私模型不允许。登录态下的“绑定”其实就是“已知用户的注册流程”。

---

## 设计要点

- **用户唯一标识**：后端**不靠前端传 userId**，而是从 **JWT** 中解析（`sub`）→ 更安全。
- **设备唯一**：前端生成/缓存 `deviceId`，通过 `X-Device-Id` 头传给后端；后端使用 `dvc:owner:${deviceId}` 在 Redis 做“一致性绑定”。
- **防重复注册**：注册 options 中使用 `excludeCredentials`（由后端查询该用户已绑定的 credentialId）。
- **风控与速率限制**：对 `deviceId` 做限流（如 1h/3 次），并在 verify 阶段二次校验。
- **协议对齐**：保持与登录/JIT 注册完全相同的编码规范（字节字段统一 **base64url**）。

---

## 前端实现（Web）

> 仅新增**一个按钮事件**用于“绑定通行密钥”。代码自包含；把 `BASE_URL` 改成你的后端地址即可。
> 复杂逻辑均在上一行写注释。

```html
<!-- 你的页面按钮 -->
<button id="btn-bind-passkey">绑定通行密钥</button>
<pre
  id="log"
  style="background:#111;color:#9f9;padding:12px;white-space:pre-wrap"
></pre>

<script type="module">
  // ========= 工具：设备ID与 base64url 转换 =========
  function getDeviceId() {
    let id = localStorage.getItem("device_id");
    if (!id) {
      id =
        crypto?.randomUUID?.() ||
        "dev-" + Date.now() + "-" + Math.random().toString(16).slice(2);
      localStorage.setItem("device_id", id);
    }
    return id;
  }
  function b64urlToBuf(b64url) {
    const pad = "=".repeat((4 - (b64url.length % 4)) % 4);
    const b64 = (b64url + pad).replace(/-/g, "+").replace(/_/g, "/");
    const bin = atob(b64);
    const buf = new ArrayBuffer(bin.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < bin.length; i++) view[i] = bin.charCodeAt(i);
    return buf;
  }
  function bufToB64url(buf) {
    const bytes = buf instanceof ArrayBuffer ? new Uint8Array(buf) : buf;
    let s = "";
    for (let i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i]);
    return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
  }
  // 复杂：把 CreationOptions 中的 base64url → ArrayBuffer
  function toCreationOptions(serverOpts) {
    const opts = structuredClone(serverOpts);
    if (typeof opts.challenge === "string")
      opts.challenge = b64urlToBuf(opts.challenge);
    if (opts.user && typeof opts.user.id === "string")
      opts.user.id = b64urlToBuf(opts.user.id);
    if (Array.isArray(opts.excludeCredentials)) {
      opts.excludeCredentials = opts.excludeCredentials.map((c) => ({
        ...c,
        id: b64urlToBuf(c.id),
      }));
    }
    return opts;
  }
  // 复杂：将 create() 结果打包为后端可校验的 JSON（统一 base64url）
  function packAttestation(cred) {
    return {
      id: cred.id,
      rawId: bufToB64url(cred.rawId),
      type: cred.type,
      response: {
        clientDataJSON: bufToB64url(cred.response.clientDataJSON),
        attestationObject: bufToB64url(cred.response.attestationObject),
      },
      clientExtensionResults: cred.getClientExtensionResults?.() || {},
    };
  }
  // 复杂：通用 POST，附带 token 与设备ID
  async function postJSON(url, body, token) {
    const res = await fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        "content-type": "application/json",
        "X-Device-Id": getDeviceId(), // 设备唯一
        ...(token ? { Authorization: `Bearer ${token}` } : {}), // 已登录用户必带
      },
      body: JSON.stringify(body || {}),
    });
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    return res.json();
  }

  // ========= 绑定入口：用户已登录（本地有 token） =========
  const BASE_URL = ""; // 同源可留空；跨域改成你的后端地址
  function getToken() {
    // 复杂：示例从 localStorage 取；实际按你的项目来源（Cookie/JWT 管理方案）
    return localStorage.getItem("token");
  }
  async function bindPasskey() {
    const log = (m) =>
      (document.getElementById(
        "log"
      ).textContent += `[${new Date().toLocaleTimeString()}] ${m}\n`);
    const token = getToken();
    if (!token) {
      log("未登录：请先登录再绑定");
      return;
    }

    try {
      // 复杂：步骤1——向后端请求“注册（绑定）options”，后端将从 JWT 解析 userId
      log("请求 /passkeys/register/options ...");
      const data = await postJSON(
        `${BASE_URL}/passkeys/register/options`,
        {},
        token
      );
      const serverOptions = data.options || data; // 兼容返回形态
      const publicKey = toCreationOptions(serverOptions);

      // 复杂：步骤2——发起浏览器创建凭据
      log("调用 navigator.credentials.create ...");
      const att = await navigator.credentials.create({ publicKey });

      // 复杂：步骤3——打包 + 回传 verify，并带上 deviceIdentifier 以完成设备唯一绑定
      log("提交 /passkeys/register/verify ...");
      const verifyBody = {
        ...packAttestation(att),
        deviceIdentifier: getDeviceId(),
      };
      const verifyResp = await postJSON(
        `${BASE_URL}/passkeys/register/verify`,
        verifyBody,
        token
      );

      log("绑定完成 ✅ " + JSON.stringify(verifyResp));
      alert("通行密钥绑定成功");
    } catch (e) {
      console.error(e);
      alert("绑定失败：" + (e?.message || e));
    }
  }

  // 绑定按钮点击
  document
    .getElementById("btn-bind-passkey")
    ?.addEventListener("click", bindPasskey);
</script>
```

> 若你在 **uni-app**（H5）里使用，也可沿用同样逻辑；在 **App（UTS 插件）** 上只需把 `navigator.credentials.create` 替换为你的 `passkeys.createPasskey(optionsJson)` 即可，其余协议不变。

---

## 后端实现（NestJS，仅给“增量/改动片段”）

> 你的工程里已有 JIT 与登录接口。这里**新增/完善**“**已登录的注册（绑定）**”两个端点，并对 Service 增强**按 token 解析 user** 与**设备唯一**。

### 1）Controller 片段

```ts
// 复杂：新增“已登录绑定”端点；依赖 JWT 守卫把 user 注入 request.user
import { Controller, Post, Req, UseGuards, Body } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { PasskeysService } from "../../services/passkeys.service";

@Controller("passkeys")
export class PasskeysController {
  constructor(private readonly passkeysService: PasskeysService) {}

  // 复杂：注册（绑定）options——登录态
  @UseGuards(AuthGuard("jwt"))
  @Post("register/options")
  getBindOptions(@Req() req: any) {
    // 复杂：设备ID从 Header/Cookie/IP 提取，用于风控与后续绑定一致性
    const deviceIdentifier =
      req.headers["x-device-id"] || req.cookies?.dvc || `ip:${req.ip}`;
    const userId = req.user?.sub; // 复杂：从 JWT 解析出的 userId
    return this.passkeysService.issueRegistrationOptionsForUser(
      userId,
      deviceIdentifier
    );
  }

  // 复杂：注册（绑定）verify——登录态
  @UseGuards(AuthGuard("jwt"))
  @Post("register/verify")
  verifyBind(@Req() req: any, @Body() body: any) {
    const deviceIdentifier =
      req.headers["x-device-id"] ||
      body.deviceIdentifier ||
      req.cookies?.dvc ||
      `ip:${req.ip}`;
    const userId = req.user?.sub;
    return this.passkeysService.verifyRegistrationForUser(
      userId,
      body,
      deviceIdentifier
    );
  }
}
```

### 2）Service 片段

```ts
// 复杂：为“已登录绑定”增加两个方法
@Injectable()
export class PasskeysService {
  // ... 省略已有依赖与构造

  // 复杂：签发已登录用户的注册 options（含 excludeCredentials 与限流）
  async issueRegistrationOptionsForUser(
    userId: string,
    deviceIdentifier?: string
  ) {
    if (!userId) throw new UnauthorizedException("未登录");

    // 复杂：限流（1h/3次）
    if (deviceIdentifier) {
      const rlKey = `rl:bind:${deviceIdentifier}`;
      const n = await this.redisService.incrementKey(rlKey);
      if (n === 1) await this.redisService.expireKey(rlKey, 3600);
      if (n > 3) throw new BadRequestException("操作过于频繁，请稍后再试");
    }

    const rpId = this.configService.get<string>("RP_ID");

    // 复杂：查询该用户已有凭证，构造 excludeCredentials 防重复注册
    const existing = await this.staffService.findManyCredentialsByUserId(
      userId
    ); // 需要你实现查询
    const exclude = (existing || []).map((c: any) => ({
      id: Buffer.from(c.credentialId, "base64url"),
      type: "public-key" as const,
    }));

    const options = await generateRegistrationOptions({
      rpName: "Your App",
      rpID: rpId,
      // 复杂：v11+ 要求 userID 为字节；这里直接用 UTF-8 Buffer
      userID: Buffer.from(String(userId), "utf8"),
      userName: String(userId),
      attestationType: "none",
      // 复杂：兼容性更好（ES256 + RS256）
      supportedAlgorithmIDs: [-7, -257],
      authenticatorSelection: {
        residentKey: "required", // 复杂：要求可发现凭证，便于后续一键直登
        userVerification: "preferred",
      },
      excludeCredentials: exclude,
      extensions: { credProps: true },
    });

    // 复杂：将 challenge(base64url) 与 user 绑定，TTL 5 分钟
    const ch =
      typeof options.challenge === "string"
        ? options.challenge
        : Buffer.from(options.challenge).toString("base64url");
    await this.redisService.setWithTimeToLive(
      `webauthn:register:${userId}`,
      ch,
      300
    );

    return { options };
  }

  // 复杂：校验 attestation + 入库 + 设备唯一绑定（不重新发 token，也可选择刷新）
  async verifyRegistrationForUser(
    userId: string,
    requestBody: any,
    deviceIdentifier?: string
  ) {
    if (!userId) throw new UnauthorizedException("未登录");

    const rpId = this.configService.get<string>("RP_ID");
    const origin = this.configService.get<string>("ORIGIN");
    const cachedChallenge = await this.redisService.getValue(
      `webauthn:register:${userId}`
    );
    if (!cachedChallenge)
      throw new BadRequestException("注册挑战不存在或已过期");

    const verification = await verifyRegistrationResponse({
      response: requestBody,
      expectedRPID: rpId,
      expectedOrigin: origin,
      expectedChallenge: cachedChallenge,
      requireUserVerification: true, // 复杂：绑定建议要求 UV
    });
    if (!verification.verified || !verification.registrationInfo) {
      throw new UnauthorizedException("注册校验失败");
    }

    const { credential } = verification.registrationInfo;
    const credentialIdB64url = Buffer.from(credential.id).toString("base64url");
    const publicKey = Buffer.from(credential.publicKey); // 存二进制或 base64 皆可
    const counter = credential.counter ?? 0;

    // 复杂：入库（若同 credentialId 已存在且属同人，可忽略/幂等）
    await this.staffService.upsertCredential({
      userId,
      credentialId: credentialIdB64url,
      publicKey,
      counter,
      transports: credential.transports
        ? JSON.stringify(credential.transports)
        : null,
    });

    // 复杂：设备唯一绑定（若存在 deviceId 且已被他人占用，则拒绝）
    if (deviceIdentifier) {
      const key = `dvc:owner:${deviceIdentifier}`;
      const existed = await this.redisService.getValue(key);
      if (existed && existed !== String(userId)) {
        throw new ForbiddenException("此设备已绑定其他账号");
      }
      // 绑定一年（或不设 TTL）
      await this.redisService.setWithTimeToLive(key, String(userId), 31536000);
    }

    await this.redisService.deleteKey(`webauthn:register:${userId}`);
    // 已登录状态下可不必重签 token；如需刷新可在此签新 JWT
    return { verified: true, userId, credentialId: credentialIdB64url };
  }
}
```

> 你只需要实现（或补齐）`staffService.findManyCredentialsByUserId` 与 `upsertCredential` 两个数据存取方法；字段即你现有的 `credentialId/publicKey/counter/transports/userId`。

---

## 时序对照（已登录绑定）

1. 前端带 **Authorization** 与 **X-Device-Id** → `POST /passkeys/register/options`
2. 后端从 **JWT** 取 `userId`，构造 **excludeCredentials**，保存 **challenge**
3. 前端调用 **`navigator.credentials.create({ publicKey })`**
4. 前端回传 **attestation + deviceIdentifier** → `/passkeys/register/verify`
5. 后端 **verify + 入库 + 设备唯一绑定** → 返回 `{ verified: true, userId }`

---

## 常见问题

- **为什么不让前端直接传 userId？**
  防止伪造。登录态下应以 **Authorization** 为准，由后端解析身份。

- **若用户已绑定过此设备，再次点击绑定会怎样？**
  由于 `excludeCredentials` 与 `dvc:owner:*` 绑定同时生效，**不会重复写入**；可返回幂等成功或提示“已绑定”。

- **如何与一键直登/JIT 流程共存？**

  - **未登录**：走 `/login/options` → 失败回退 `/register-or-login/*`。
  - **已登录**：走本文 `/register/*`（绑定专用）。两套互不冲突。

---

## 小结

- **唯一标识传递**：已登录场景下，把 **用户身份交给 JWT**，把 **设备唯一交给 `X-Device-Id`**。
- **绑定即注册**：本质是“已知用户”的注册流程；用 `excludeCredentials` 防重复，用 Redis 绑定 `deviceId -> userId`。
- **最少交互**：一次点击完成整个绑定，协议与登录/JIT 完全一致，维护成本低。
