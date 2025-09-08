---
title: "userVerification:"
date: 2025-09-08 00:12:36
tags:
---

好，我逐条拆解你看到的这段响应，并把“该用什么值”“挑战长度”为啥看起来短、“大厂是不是也这样返回”讲清楚；最后给出**只需改几行**的建议（不贴整文件）。

---

# 1、`"userVerification": "preferred"` 是啥？

**它告诉浏览器/认证器：是否必须做“本地用户验证（UV）”**（指纹/人脸/PIN）。可选值只有 3 个：

| 值                            | 含义                                                     | 常见效果/场景                                                                                                |
| ----------------------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| **`required`**                | **必须**进行本地用户验证（没有 UV 能力的认证器会被排除） | 金融、后台管理、提升安全性。旧 U2F 钥匙（无 PIN）会被拒。                                                    |
| **`preferred`**（你现在的值） | **优先**做 UV，如果设备支持就做；不支持也可以继续        | 一般网站登录、降低失败率。绝大多数“平台 passkey”（Android/Apple）都会做 UV，所以体验和 `required` 基本一样。 |
| **`discouraged`**             | **不鼓励**做 UV（允许仅“持有设备”就通过）                | 很少用；降低安全门槛，适合低风险二级操作（不建议用于登录）。                                                 |

> 注意：这只是“**意愿**”。真正的**强制**要在**服务端验证**时也打开：
> `verifyRegistrationResponse/verifyAuthenticationResponse({ requireUserVerification: true })`。
> 否则前端说 `required`，服务端放宽为 `false`，就**没有被强制**。

**给你的建议：**

- 如果这是**员工后台**或敏感操作：前端设 `userVerification: 'required'`，服务端配套 `requireUserVerification: true`。
- 如果是**大众登录**：`preferred` + 风控/设备指纹/异常登录再二次验证。

# 2、这个 `challenge` 看起来“很短”，正常吗？

**正常。**

- simplewebauthn 默认生成 **32 字节**随机挑战（≈ **256 bit**）。
- 32 字节用 **base64url** 表示通常是 **43\~44 个字符**（无 `=` 填充）。
- 你看到的：`jOr8QL_ExSr_7xsD2WUG1Kp8eM2lMiWNx8fFMg5wLyg`，长度 43，很标准。
- 我们服务端已把 challenge 统一按 **base64url** 存/比（你代码里已处理），与前端 `clientDataJSON.challenge` 能**精确一致**。

> 若你担心强度，也可以自定义更长挑战（例如 64 字节），但 32 字节已足够随机且是行业常见默认。

# 3、大厂实践里返回的也是这种结构吗？

**是的。**这就是 WebAuthn 规范的 **PublicKeyCredentialRequestOptions(JSON)** 的形态，各家（Google、Apple、微软、GitHub、PayPal…）都会返回类似结构。差异主要在**有没有 `allowCredentials`** 和某些可选字段：

- 一键直登/可发现凭证：**省略 `allowCredentials`**（你现在就是），浏览器会弹出该 RP 的可用 passkey 列表。
- 指定账号登录：会带 `allowCredentials: [{ id, type: 'public-key' }, ...]`。
- 其他常见字段：`rpId`、`challenge`、`timeout`、`userVerification`、有时 `extensions`。
- 前端会另外传 `mediation: 'conditional'`（这不是 options 里的字段，而是 `navigator.credentials.get` 的参数，用于条件式 UI）。

所以你这个响应：

```json
{
  "options": {
    "rpId": "localhost",
    "challenge": "…",
    "timeout": 60000,
    "userVerification": "preferred"
  }
}
```

**完全合理**、符合规范，也符合大厂常见做法（本地开发把 `rpId` 设为 `localhost` 没问题，上线要换为你的主域）。

# 4、如果你要“更安全”，只改这几行（前后端各一处）

**后端·验证时强制 UV（把 `false` 改为 `true`）**

```ts
// 复杂：强制需要本地用户验证（指纹/人脸/PIN）
requireUserVerification: true,
```

> 出现位置：
>
> - `verifyRegistrationResponse({...})`
> - `verifyAuthenticationResponse({...})`

**生成登录 options 时（可选）：把首选项也改为 required**

```ts
// 复杂：要求认证器执行 UV
userVerification: 'required',
```

> 这两处配合使用，才能做到“名副其实的强制 UV”。

---

# 5、小补充：别名/大小写别差异别担心

- simplewebauthn（v11+）返回的 JSON 用 `rpId`（小写 d）；
- 你传入 `generateAuthenticationOptions({ rpID: '…' })` 是库的入参写法；
- **这是正常的**：入参/出参字段命名略有差异，但库会正确映射。
