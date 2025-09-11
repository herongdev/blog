---
title: WebAuthn Passkeys：options 全字段长啥样？取值有哪些？（simplewebauthn v11+ 实战）
date: 2025-09-08 00:33:31
tags: [WebAuthn, Passkeys, simplewebauthn, NestJS]
---

> 适用版本：**@simplewebauthn/server v11+**
> 重点变化：`pubKeyCredParams` ➜ `supportedAlgorithmIDs`；注册验证结果中的 `credentialID/credentialPublicKey` ➜ 移到 `registrationInfo.credential`。

# 一、两类 options 是什么？

- **注册（Creation）**：发给前端 `navigator.credentials.create({ publicKey })` 的参数

  - 服务器生成：`generateRegistrationOptions(opts)`
  - 前端收到的是 **PublicKeyCredentialCreationOptions(JSON)**

- **登录（Request/Assertion）**：发给前端 `navigator.credentials.get({ publicKey })` 的参数

  - 服务器生成：`generateAuthenticationOptions(opts)`
  - 前端收到的是 **PublicKeyCredentialRequestOptions(JSON)**

> 前端 JSON 里的 `challenge` / `user.id` 等，通常是 **base64url** 字符串；服务端入参多数用 **Buffer/Uint8Array**。

# 二、注册：服务端入参 & 前端 options 全量长相

## 2.1 服务端入参（`generateRegistrationOptions(opts)`）

```ts
const options = await generateRegistrationOptions({
  // —— RP（你的站点） ——
  rpName: "Shop Thrive", // 展示名（弹窗可见）
  rpID: "example.com", // RP ID（域名，需与前端同源后缀匹配）

  // —— 用户信息（必须） ——
  // 注意：userID 必须是字节数组（Uint8Array/Buffer），不是 string
  userID: Buffer.from("user-123", "utf8"),
  userName: "user-123", // 可读名（设备 UI 展示）
  userDisplayName: "Alice Zhang", // 可选；不传时库会处理

  // —— 安全策略 ——
  // v11+：用 supportedAlgorithmIDs 指定算法（替代 pubKeyCredParams）
  // 常用：-7=ES256；如需兼容更广，可加 -257=RS256/-8=EdDSA 等
  supportedAlgorithmIDs: [-7, -257],

  // 要求/偏好做本地用户验证（UV：指纹/人脸/PIN）
  // 'required' | 'preferred' | 'discouraged'
  userVerification: "required",

  // 选择哪类认证器与凭证形态
  authenticatorSelection: {
    // 'platform'（本机/系统）| 'cross-platform'（外接/钥匙）| 不填（都可）
    authenticatorAttachment: "platform",
    // 要不要可发现凭证（resident key），用于“无用户名一键登录”
    // 'required' | 'preferred' | 'discouraged'
    residentKey: "required",
    // 旧字段（某些库还在）：requireResidentKey: true,
  },

  // 证明链/隐私：'none' | 'indirect' | 'direct' | 'enterprise'
  attestationType: "none",

  // —— 体验/兼容 ——
  timeout: 60_000, // 毫秒
  excludeCredentials: [
    // 防重复注册（可选）
    {
      id: Buffer.from("...", "base64url"),
      type: "public-key",
      transports: ["internal", "usb"],
    },
  ],

  // —— 扩展（按需） ——
  extensions: {
    credProps: true, // 要求返回“是否可发现凭证”等属性
    // largeBlob: { support: 'required' | 'preferred' },
    // hmacCreateSecret: true,
    // // 老 FIDO 兼容场景：
    // appidExclude: 'https://example.com'
  },
});
```

### COSE 算法常用映射

| ID              | 名称                  | 说明                                        |
| --------------- | --------------------- | ------------------------------------------- |
| **-7**          | ES256                 | ECDSA w/ SHA-256（最常用，passkey 默认）    |
| **-257**        | RS256                 | RSA w/ SHA-256（更广兼容）                  |
| **-8**          | EdDSA                 | 常见为 Ed25519（浏览器/平台支持度差异较大） |
| -35 / -36       | ES384 / ES512         | 更高位椭圆曲线                              |
| -38 / -39 / -40 | PS256 / PS384 / PS512 | RSA-PSS 系列                                |

> 生产一般 `[-7]` 足够；如有老设备需求，可加 `-257`。

---

## 2.2 前端收到的 **注册 options（完整 JSON 示例）**

```json
{
  "rp": { "name": "Shop Thrive", "id": "example.com" },
  "user": {
    "id": "dXNlci0xMjM", // base64url（服务端 userID 的 JSON 形式）
    "name": "user-123",
    "displayName": "Alice Zhang"
  },
  "challenge": "9P0mB1o0f1...Q",
  "pubKeyCredParams": [
    // 注意：这是浏览器原生结构；simplewebauthn 已根据 supportedAlgorithmIDs 生成
    { "type": "public-key", "alg": -7 },
    { "type": "public-key", "alg": -257 }
  ],
  "timeout": 60000,
  "attestation": "none",
  "authenticatorSelection": {
    "authenticatorAttachment": "platform",
    "residentKey": "required",
    "userVerification": "required"
  },
  "excludeCredentials": [
    { "type": "public-key", "id": "...", "transports": ["internal", "usb"] }
  ],
  "extensions": {
    "credProps": true
  }
}
```

> 实际上浏览器可能省略部分可选字段；**你看到的字段少，不代表“没生效”**，很多值有默认行为。

# 三、登录：服务端入参 & 前端 options 全量长相

## 3.1 服务端入参（`generateAuthenticationOptions(opts)`）

```ts
const options = await generateAuthenticationOptions({
  // —— 基本项 ——
  rpID: "example.com",
  timeout: 60_000,

  // —— UV 要求 ——
  // 'required' | 'preferred' | 'discouraged'
  userVerification: "preferred",

  // —— 可选：指定可用凭证（有用户名场景）
  // 省略则启用“可发现凭证”（一键直登：浏览器列出该站点可用 passkey）
  allowCredentials: [
    {
      id: Buffer.from("credential-id-base64url", "base64url"),
      type: "public-key",
      transports: ["internal", "usb", "nfc", "ble", "hybrid"], // 按需
    },
  ],

  // —— 扩展（按需） ——
  extensions: {
    // uvm: true,                    // 请求返回用户验证方式矩阵（支持时）
    // appid: 'https://example.com' // 老 FIDO 兼容
  },
});
```

### `transports` 可能值

- `usb` / `nfc` / `ble`：外接钥匙传输方式
- `internal`：平台认证器（如 iOS/Android/Windows 内置）
- `cable` / `hybrid`：跨设备传输（手机帮电脑解锁的流程）

---

## 3.2 前端收到的 **登录 options（完整 JSON 示例）**

```json
{
  "rpId": "example.com",
  "challenge": "jOr8QL_ExSr_7xsD2WUG1Kp8eM2lMiWNx8fFMg5wLyg",
  "timeout": 60000,
  "userVerification": "preferred",
  "allowCredentials": [
    { "type": "public-key", "id": "...", "transports": ["internal", "hybrid"] }
  ],
  "extensions": {
    "uvm": true
  }
}
```

> **条件式 UI（passkeys 一键直登）**：这是 `navigator.credentials.get()` 的**第二个参数**里的 `mediation: 'conditional'`，**不在** `publicKey` 这个 JSON 里。
> 形如：
>
> ```ts
> navigator.credentials.get({ publicKey: options, mediation: "conditional" });
> ```

---

# 四、关键字段取值解释（速查表）

## 4.1 `userVerification`

| 值            | 含义                                                              | 推荐                   |
| ------------- | ----------------------------------------------------------------- | ---------------------- |
| `required`    | 必须进行本地用户验证（指纹/人脸/PIN）；不支持 UV 的认证器会被排除 | **后台/金融** 强烈推荐 |
| `preferred`   | 优先进行 UV；不支持也可继续                                       | **通用登录** 默认      |
| `discouraged` | 不鼓励 UV                                                         | 不推荐用于登录         |

> **服务端也要对应开启**：`verifyRegistrationResponse/verifyAuthenticationResponse({ requireUserVerification: true })` 才算真正强制。

## 4.2 `authenticatorSelection`

| 字段                      | 值                                       | 说明                                     |
| ------------------------- | ---------------------------------------- | ---------------------------------------- |
| `authenticatorAttachment` | `platform` / `cross-platform`            | 本机认证器 vs 外接钥匙；不填=都可        |
| `residentKey`             | `required` / `preferred` / `discouraged` | 是否创建**可发现凭证**（一键直登的前提） |
| `requireResidentKey`      | `boolean`                                | 旧字段；等价于 `residentKey: 'required'` |

## 4.3 `attestationType`（simplewebauthn）

| 值                    | 说明                     | 备注         |
| --------------------- | ------------------------ | ------------ |
| `none`                | 不收集证明链（隐私友好） | **最常用**   |
| `indirect` / `direct` | 收集不同强度的证明链     | 较少用       |
| `enterprise`          | 企业场景                 | 需要配套策略 |

## 4.4 `allowCredentials` / `excludeCredentials`（描述符）

```ts
{
  id: Uint8Array | Buffer,     // 凭证ID（服务端存 base64url，生成时转回二进制）
  type: 'public-key',
  transports?: ('usb'|'nfc'|'ble'|'internal'|'cable'|'hybrid')[]
}
```

## 4.5 `supportedAlgorithmIDs`（替代 `pubKeyCredParams`）

- 传 **COSE 算法 ID** 数组（见上表）。
- 浏览器最终在前端 JSON 里仍会以 `pubKeyCredParams` 形式出现（这是 WebAuthn 原生结构），不冲突。

---

# 五、生产推荐模板

### 注册（Creation）

```ts
await generateRegistrationOptions({
  rpName: "Your App",
  rpID: "yourdomain.com",
  userID: Buffer.from(userId, "utf8"),
  userName: userNameOrEmail,
  supportedAlgorithmIDs: [-7], // 如需更广：[-7, -257]
  userVerification: "required",
  authenticatorSelection: {
    authenticatorAttachment: "platform",
    residentKey: "required",
    userVerification: "required",
  },
  attestationType: "none",
  timeout: 60_000,
  // excludeCredentials: [...],      // 防重复注册（可选）
  extensions: { credProps: true },
});
```

### 登录（Request）

```ts
await generateAuthenticationOptions({
  rpID: "yourdomain.com",
  timeout: 60_000,
  userVerification: "required",
  // 省略 allowCredentials → 可发现凭证（推荐做“一键直登”）
  // allowCredentials: [...],       // 指定账号登录时使用
  // extensions: { uvm: true },
});
```

> 核心校验与安全实践：
>
> 1. **challenge** 统一按 **base64url 字符串** 存/比；用后删除；短 TTL（≤5 分钟）。
> 2. **requireUserVerification: true**（服务端）与前端的 `userVerification: 'required'` 配套。
> 3. 注册时显式 `residentKey: 'required'`，保证后面能做“无用户名一键登录（conditional UI）”。

---

# 六、常见疑问

- **为什么我的 `options` 字段很少？**
  浏览器/库会省略默认字段；只要关键项（`rpId`、`challenge`、用户/算法/策略）正确，功能完全等价。
- **`challenge` 看起来很短，安全吗？**
  默认 32 字节随机数（base64url 后 ≈43 字符）已足够安全。
- **字段大小写为何不一致？**
  库的**入参**是 `rpID`、`userID`（TypeScript 结构）；前端 JSON 是 WebAuthn 原生的 `rpId`、`user.id`。库会正确映射。

---

如果你想把现有 NestJS 代码里的配置**替换为上面的“生产推荐模板”**，告诉我你文件里的具体几行；我只给“需要替换的片段”，并在复杂逻辑上一行加注释，符合你的改码规则。
