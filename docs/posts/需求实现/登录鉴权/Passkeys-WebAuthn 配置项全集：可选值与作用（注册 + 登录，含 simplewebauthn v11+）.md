---
title: Passkeys/WebAuthn 配置项全集：可选值与作用（注册 + 登录，含 simplewebauthn v11+）
date: 2025-09-19
tags: [Passkeys, WebAuthn, 配置项, simplewebauthn]
---

> 目标：把 **Passkeys/WebAuthn** 中"你会实际用到的配置项"一次讲清楚：
>
> - 覆盖 **注册（create）** 与 **登录（get）** 两个阶段
> - 对应 **服务端（simplewebauthn / @simplewebauthn/server v11+）** 产出的"options"以及**前端** `navigator.credentials.create()/get()` 的参数
> - 每个字段给出 **可选值** + **含义** + **常用建议**
> - 标注**兼容性/陷阱**与**推荐默认值**

---

## 总览思维导图（速查）

- 注册 Registration（`navigator.credentials.create()` / `generateRegistrationOptions()`）

  - 基础：`rp`, `user`, `challenge`, `pubKeyCredParams`(= simplewebauthn 的 `supportedAlgorithmIDs`), `timeout`, `attestation`
  - 选择器：`authenticatorSelection` → `residentKey`, `userVerification`, `authenticatorAttachment`, `requireResidentKey(旧)`
  - 其他：`excludeCredentials`, `hints(浏览器端)`, `extensions`（常用：`credProps`, `largeBlob`, `prf`, `appidExclude(兼容U2F)`）

- 登录 Authentication（`navigator.credentials.get()` / `generateAuthenticationOptions()`）

  - 基础：`challenge`, `timeout`, `rpId`, `userVerification`
  - 定位：`allowCredentials`
  - 其他：`hints(浏览器端)`, `mediation(浏览器端Conditional UI)`, `extensions`（常用：`uvm`, `largeBlob`, `appid(兼容U2F)`）

---

## 一、注册 Registration 配置项

### 1. 基础字段

| 字段                                 | 可选值/类型                                        | 作用                                                                 | 建议                                                                     |
| ------------------------------------ | -------------------------------------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| `rp.id`                              | 域名字符串（如 `example.com`）                     | **Relying Party ID**。**必须与站点有效父域匹配**，决定凭据的绑定域。 | 用你的主域名；本地开发用同源域。                                         |
| `rp.name`                            | 文本                                               | 在系统提示里展示给用户看的"站点名"。                                 | 友好易识别，如"公司后台"。                                               |
| `user.id`                            | `ArrayBuffer`/`Uint8Array`（**v11+ 推荐二进制**）  | 用户唯一 ID（不会显示给用户）。                                      | 用数据库主键编码为 `Uint8Array`。                                        |
| `user.name`                          | 文本                                               | 用户名（可能显示给用户）。                                           | 用登录名/邮箱；唯一。                                                    |
| `user.displayName`                   | 文本                                               | 美观显示名（一定会显示）。                                           | 用昵称/真实姓名。                                                        |
| `challenge`                          | 随机字节                                           | 防重放挑战，**必须一次性使用**。                                     | 服务端生成并缓存（Redis）；**Base64url** 存储。                          |
| `timeout`                            | 毫秒                                               | 超时。                                                               | 60000–120000ms，按体验权衡。                                             |
| `attestation`（= `attestationType`） | `'none' \| 'indirect' \| 'direct' \| 'enterprise'` | 是否要设备证明（隐私/合规取舍）。                                    | **默认 `none`**；合规强要求才用 `direct/enterprise`。                    |
| `pubKeyCredParams`                   | COSE 列表（如 `[{alg:-7,type:'public-key'}]`）     | 指定可接受算法。                                                     | **最少含 `-7`(ES256)**；为兼容可加 `-257`(RS256)；前瞻可加 `-8`(EdDSA)。 |

> 在 **simplewebauthn v11+** 中，你常会看到把算法用更直观的 `supportedAlgorithmIDs: number[]` 来传（例如 `[-7, -257]`）。两者等价，服务端会转换为 `pubKeyCredParams`。

### 2. 认证器选择器 `authenticatorSelection`

| 子字段                    | 可选值                                       | 作用                                                          | 影响/陷阱                                                             | 推荐                                                 |
| ------------------------- | -------------------------------------------- | ------------------------------------------------------------- | --------------------------------------------------------------------- | ---------------------------------------------------- |
| `residentKey`             | `'required' \| 'preferred' \| 'discouraged'` | 是否创建**可发现凭据**（也就是"**passkey**"：可免用户名）。   | `required` 会占用设备存储但带来一键直登；`discouraged` 不是 passkey。 | **`required`** 做 passkey 体验；保守用 `preferred`。 |
| `userVerification`        | `'required' \| 'preferred' \| 'discouraged'` | 是否要求生物识别/PIN。                                        | `required` 更安全但可能多一步；`discouraged` 少见。                   | B2C：**`preferred`**；高敏后台：**`required`**。     |
| `authenticatorAttachment` | `'platform' \| 'cross-platform'`             | 限定**平台认证器**（如手机/电脑内置）或**跨平台**（安全钥）。 | 限太死会掉成功率。                                                    | 一般**不指定**；或按场景选择。                       |
| `requireResidentKey`      | `boolean`（**已过时**）                      | 旧字段，等价于 `residentKey` 早期语义。                       | 新实现请用 `residentKey`。                                            | 不再使用。                                           |

### 3. 排他清单 `excludeCredentials`

| 字段                 | 类型                                                              | 作用                                          | 建议                                               |
| -------------------- | ----------------------------------------------------------------- | --------------------------------------------- | -------------------------------------------------- |
| `excludeCredentials` | `{ type:'public-key', id: ArrayBuffer, transports?: string[] }[]` | 列出**不允许重复注册**的已有凭据（按 `id`）。 | 取用户已有的 credentialId 全部填上，避免重复创建。 |

### 4. 浏览器"提示" `hints`（可选，前端）

| 值                                                 | 作用                                            | 备注                           |
| -------------------------------------------------- | ----------------------------------------------- | ------------------------------ |
| `'security-key'`, `'client-device'`, `'hybrid'` 等 | 给浏览器一个**提示**，帮助选择认证器/传输方式。 | 不是所有浏览器都实现；可不填。 |

### 5. 扩展 `extensions`（注册）

> 扩展是"可选增强"。不同平台支持度不同，**启用前要允许降级**。

| 扩展名                | 方向    | 可选值                                       | 作用                                                | 返回/副作用                                           | 建议                                   |
| --------------------- | ------- | -------------------------------------------- | --------------------------------------------------- | ----------------------------------------------------- | -------------------------------------- |
| `credProps`           | reg     | `true/false`                                 | 要求返回**凭据属性**（是否为 resident key）。       | `clientExtensionResults.credProps = { rk?: boolean }` | **建议 `true`**，落库凭据类型。        |
| `largeBlob`           | reg/get | `{ support: 'required' \| 'preferred' }`     | 支持**大对象存储**（绑定在凭据上）。                | 需要平台/设备支持；可用于小量用户数据。               | 如无强需求，默认不启或设 `preferred`。 |
| `prf`（WebAuthn PRF） | reg/get | `{ eval?: {...}, evalByCredential?: {...} }` | 让认证器基于密钥派生伪随机值，做**对称派生**用途。  | 前沿能力，支持度逐步增长。                            | 高阶场景再用。                         |
| `appidExclude`        | reg     | 旧 U2F 兼容                                  | 防止已在 U2F AppID 下注册的密钥在当前 rpId 再注册。 | 遗留兼容。                                            | 仅做历史迁移时用。                     |

---

## 二、登录 Authentication 配置项

### 1. 基础字段

| 字段               | 可选值/类型                                  | 作用                   | 建议                                             |
| ------------------ | -------------------------------------------- | ---------------------- | ------------------------------------------------ |
| `challenge`        | 随机字节                                     | 防重放挑战。           | 服务器生成并缓存（Redis）。                      |
| `timeout`          | 毫秒                                         | 超时。                 | 60000–120000ms。                                 |
| `rpId`             | 域名                                         | 与注册时相同的 RP ID。 | 填你站点主域。                                   |
| `userVerification` | `'required' \| 'preferred' \| 'discouraged'` | 是否要求生物识别/PIN。 | B2C：**`preferred`**；高敏后台：**`required`**。 |

### 2. 定位凭据 `allowCredentials`

| 字段               | 类型                                                             | 作用                                                                 | 典型用法                                          |
| ------------------ | ---------------------------------------------------------------- | -------------------------------------------------------------------- | ------------------------------------------------- |
| `allowCredentials` | `{ type:'public-key', id:ArrayBuffer, transports?: string[] }[]` | **白名单**方式，限定可用哪些凭据（常在"用户名已知"的传统登录流）。   | 用户名 → 查出该用户所有 credentialId → 全部填入。 |
| （为空或不传）     | ——                                                               | 允许**可发现凭据**自由匹配（配合 Conditional UI 可"无用户名直登"）。 | **Passkey 体验**常用做法。                        |

### 3. 浏览器端 UI 行为

| 字段                                                                          | 值                                        | 作用                                                                                  | 备注                            |
| ----------------------------------------------------------------------------- | ----------------------------------------- | ------------------------------------------------------------------------------------- | ------------------------------- |
| `mediation`（在 `navigator.credentials.get()` 的 `publicKey` 旁边、同级传入） | `'conditional' \| 'required' \| 'silent'` | **Conditional UI** 关键：`'conditional'` 允许地址栏内直接弹出选择框，实现"一键直登"。 | 需 HTTPS + 满足浏览器启用条件。 |
| `hints`                                                                       | 同注册                                    | 选择器提示                                                                            | 可省略。                        |

### 4. 扩展 `extensions`（登录）

| 扩展名      | 方向    | 作用                                                               | 返回                                  | 建议              |
| ----------- | ------- | ------------------------------------------------------------------ | ------------------------------------- | ----------------- |
| `uvm`       | get     | 请求返回 **User Verification Methods**（使用了何种生物识别/PIN）。 | `clientExtensionResults.uvm` 列出方法 | 可用于风控/审计。 |
| `largeBlob` | reg/get | 同上                                                               | 同上                                  | 同上              |
| `appid`     | get     | 兼容 U2F 的 AppID 登录                                             | 同上                                  | 仅历史迁移用。    |
| `prf`       | get     | 同上                                                               | 同上                                  | 高阶用途再用。    |

---

## 三、simplewebauthn（v11+）与服务端路由要点

> 你项目里已有：`/passkeys/register|login/(options|verify)`；挑战 **Base64url** 存 Redis；`passkey_credentials` 表存 `credential_id/public_key/counter`。

### 1. 生成注册选项（server）

常见字段（simplewebauthn 名称可能与原生略有不同）：

- `rpID`, `rpName`
- `userID: Uint8Array`, `userName`, `userDisplayName`
- `supportedAlgorithmIDs: number[]` → 映射到 `pubKeyCredParams`
- `attestationType: 'none' | 'indirect' | 'direct' | 'enterprise'`
- `authenticatorSelection: { residentKey, userVerification, authenticatorAttachment? }`
- `excludeCredentialIDs: Uint8Array[]`（封装后会变成 `excludeCredentials`）
- `timeout`, `extensions`（如 `credProps: true`）

**默认推荐（B2C/通用）：**

```ts
attestationType: 'none',
supportedAlgorithmIDs: [-7, -257], // ES256 优先兼容 RS256
authenticatorSelection: {
  residentKey: 'required',        // 明确走 passkey
  userVerification: 'preferred',  // 有则强校验，兼顾成功率
  // authenticatorAttachment 不限定
},
extensions: { credProps: true },
timeout: 120_000
```

### 2. 生成登录选项（server）

- `rpID`, `timeout`, `userVerification`
- `allowCredentialIDs?: Uint8Array[]`（有"已知用户流"用它；**passkey 直登**常为空）
- 你也可以在响应中带标识，提示前端是否采用 **Conditional UI**。

**默认推荐：**

```ts
userVerification: 'preferred',
timeout: 120_000,
// allowCredentialIDs 为空，鼓励可发现凭据 + Conditional UI
```

---

## 四、常见组合场景与参数模板

### A. 标准 Passkey（支持 Conditional UI）

**注册（create）**

- `attestation: 'none'`
- `supportedAlgorithmIDs: [-7, -257]`
- `authenticatorSelection.residentKey: 'required'`
- `authenticatorSelection.userVerification: 'preferred'`
- `extensions.credProps: true`

**登录（get）**

- `userVerification: 'preferred'`
- `allowCredentials` **不传/空**
- 浏览器端 `mediation: 'conditional'`（配合地址栏直登）

### B. 高安全后台/企业管理台

**注册**

- `attestation: 'none' | 'direct'`（合规要求再上 `direct`）
- `supportedAlgorithmIDs: [-7, -257]`
- `residentKey: 'required'`
- `userVerification: 'required'`
- `extensions.credProps: true`

**登录**

- `userVerification: 'required'`
- 已知用户流：填 `allowCredentials` 精确定位
- 不强追求 Conditional UI

### C. 兼容旧设备/历史 U2F

- 算法包含 `-257`
- 迁移阶段可能用到 `appid`/`appidExclude` 扩展（仅过渡）

---

## 五、易踩坑与实战建议

1. **RP ID 与域名**：`rp.id` 必须是**当前站点的有效父域**（或相同域）。子域 ↔ 主域要规划好。
2. **二进制 userID/credentialID**：simplewebauthn v11+ 推荐 **`Uint8Array`**；**持久化前做 base64url 编解码**。
3. **挑战 challenge**：务必 **一次性**、**短期缓存**（Redis）并按 **base64url** 存。
4. **计数器 counter**：验证成功后更新数据库的 `signCount`/`counter`，用于克隆检测。
5. **算法集合**：至少包含 **ES256(-7)**；为兼容再加 **RS256(-257)**。
6. **residentKey 与存储**：`required` 会在设备上保存可发现凭据，空间有限；建议允许用户管理/删除。
7. **Conditional UI 条件**：HTTPS、正确 RP、支持的浏览器版本等；前端要传 `mediation:'conditional'`。
8. **extensions 兼容**：`credProps` 安全开启；`largeBlob/prf/uvm` 按需，用前先检测支持与回退路径。
9. **跨端同步**：平台 passkey（iCloud/Google Password Manager）可跨设备同步，但**RP ID 必须一致**。
10. **合规与隐私**：`attestation!='none'` 需维护证书信任与合规评估，一般 B2C 不建议开启。

---

## 六、最小可用清单（可直接抄）

**注册 options（服务端生成）**

```ts
{
  rpID: 'example.com',
  rpName: '示例站点',
  userID: Uint8Array.from(...),     // 二进制
  userName: 'alice',
  userDisplayName: 'Alice',
  supportedAlgorithmIDs: [-7, -257],
  attestationType: 'none',
  authenticatorSelection: {
    residentKey: 'required',
    userVerification: 'preferred'
  },
  extensions: { credProps: true },
  timeout: 120_000
}
```

**登录 options（服务端生成）**

```ts
{
  rpID: 'example.com',
  userVerification: 'preferred',
  // allowCredentialIDs: [] // 留空以支持 passkey 直登
  timeout: 120_000
}
```

**浏览器端（登录）启用 Conditional UI（示例）**

```ts
const cred = await navigator.credentials.get({
  publicKey: authenticationOptions,
  // 关键：在同级位置（不是 publicKey 里）
  mediation: "conditional",
});
```

---

## 结语

以上就是 **Passkeys/WebAuthn 配置项的"全景图 + 默认建议"**。如果你把这些默认值落到当前项目，我可以按你仓库结构给出**最小改动的代码片段**（复杂逻辑行上加注释），直接对接你现有的 `/passkeys/*` 路由与 Redis/DB。
