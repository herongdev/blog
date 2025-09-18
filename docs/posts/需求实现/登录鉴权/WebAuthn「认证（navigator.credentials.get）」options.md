## 一、后端返回的 `PublicKeyCredentialRequestOptions`（认证阶段 options）

这是浏览器发起 **get/assertion** 的必要参数对象。常见字段如下（都由**后端**生成与返回）：

### 1) `challenge`（必填）

- **类型**：`BufferSource`（你通常用 base64url 字符串传，到前端转成 `ArrayBuffer`）
- **作用**：一次性的随机值，防重放。浏览器会把它写进 `clientDataJSON`，并参与签名校验（后端要比对它是否与发给客户端的一致）。([W3C][1])
- **要点**：应足够随机/高熵；后端必须保存并在验证时对上。([GitHub][2])

### 2) `rpId`（可选）

- **类型**：字符串（域名）
- **作用**：指定**Relying Party ID**。若不填，默认是**调用页面的有效顶级域名(ETLD+1)或其子域**。必须与当前页面域满足“后缀匹配”规则；否则浏览器直接抛 `SecurityError`。([GitHub][3])
- **跨站/多域**：如果你希望 `app.example.com` 也能使用 `example.com` 作为 rpId，需要在 `https://example.com/.well-known/webauthn` 配置 **Related Origin Requests** 白名单；否则也会 `SecurityError`。注意 Firefox 尚不支持该机制。([web.dev][4])

### 3) `allowCredentials`（可选）

- **类型**：`PublicKeyCredentialDescriptor[]`
- **作用**：限制可用的凭据集合（凭据 ID 列表）。如果你想做**无用户名/可发现凭据（discoverable credentials）**登录，通常**留空**让浏览器从设备中自动发现。([W3C][1])
- **子字段**：

  - `type`: 目前恒为 `"public-key"`。([MDN Web Docs][5])
  - `id`: **credentialId**（二进制）；前端需 base64url→ArrayBuffer。([MDN Web Docs][5])
  - `transports`: **提示**浏览器优先尝试的传输介质（不是安全校验的一部分）。值包括：`"ble" | "hybrid" | "internal" | "nfc" | "usb"`（有的实现还保留 `"cable"`；`"hybrid"`为其替代）。([MDN Web Docs][6])

### 4) `userVerification`（可选）

- **类型**：`"required" | "preferred" | "discouraged"`
- **作用**：要求是否必须本地生物识别/解锁等**用户验证**：

  - `"required"`：必须有人脸/指纹/设备 PIN；后端验证 `UV` 标志位。
  - `"preferred"`：尽量有（最常用默认）。
  - `"discouraged"`：不要求。([MDN Web Docs][5])

### 5) `timeout`（可选）

- **类型**：毫秒
- **作用**：给浏览器的人机交互超时建议。浏览器**可忽略**或有自己的上限/下限。([MDN Web Docs][5])

### 6) `extensions`（可选）

- **类型**：对象
- **作用**：扩展输入（如历史 U2F 兼容的 `appid`、`uvm` 等，不同实现支持不同）。后端在验证时也会得到**扩展输出**以决定后续处理。([MDN Web Docs][5])

> ⚠️ **`mediation` 不属于 `PublicKeyCredentialRequestOptions`！**
> 它是 `navigator.credentials.get({ publicKey, mediation })` 的**顶层**参数，用来启用 **Conditional UI**（`'conditional'`）、`'required'`、`'optional'`、`'silent'` 等。放在 `publicKey` 里会被忽略。([MDN Web Docs][7])

**最简调用形态（仅示意差异处）**：

```ts
const publicKey = toPublicKeyOptions(optionsFromServer);
const mediation = optionsFromServer.mediation; // 由你自己透传
const cred = await navigator.credentials.get({ publicKey, mediation }); // ← mediation 在顶层
```

（`mediation: 'conditional'` 可启用表单自动填充式的 passkey UI）([MDN Web Docs][7])

## 二、你回传给后端的断言 `payload`（认证结果）

```ts
const payload = {
  id,                // 字符串 ID（可视化用）
  rawId,             // base64url(二进制 credentialId) —— 服务端验证优先用它
  type,              // "public-key"
  options_token,     // 你系统自有：把 options 与本次会话/挑战绑定的防重放令牌
  response: {
    clientDataJSON,      // 包含 challenge/ origin / type 等
    authenticatorData,   // rpIdHash/flags/signCount/扩展输出
    signature,           // 对 (authenticatorData || SHA256(clientDataJSON)) 的签名
    userHandle | null,   // 可发现凭据时可能包含到用户主键的字节串
  },
  // 可选：clientExtensionResults
}
```

每个字段的用处——

### 1) `id` / `rawId`

- **`id`**：DOM 字符串形式的凭据标识（实现可把二进制编码成可打印字符串）。
- **`rawId`**：真正的二进制凭据 ID（你已做 base64url）。**后端应以 `rawId` 匹配数据库中的 credential 记录**。([MDN Web Docs][5])

### 2) `type`

- 目前恒为 `"public-key"`。后端可做兜底校验。([MDN Web Docs][5])

### 3) `response.clientDataJSON`

- **浏览器生成的 JSON（再序列化为 ArrayBuffer）**，包含：

  - `type`：本次操作类型，认证为 `"webauthn.get"`；
  - `challenge`：后端发的挑战（base64url），**后端必须与会话中保存的挑战比对**；
  - `origin`：调用页面的源（协议+域+端口），用来防钓鱼；
  - 可能还有 `crossOrigin` 等。

- **服务器验证**会对 `clientDataJSON` 做 SHA-256，作为签名消息的一部分。([W3C][1])

### 4) `response.authenticatorData`

- 由**认证器**返回的二进制结构，包含：

  - `rpIdHash`：`SHA-256(rpId)`；
  - `flags`：位标志（如 `UP` 用户在场、`UV` 用户已验证、`BE/BS/AT/ED` 等）；
  - `signCount`：签名计数（防克隆）；
  - 以及扩展输出（如果启用）。([MDN Web Docs][8])

- **服务器需检查**：

  - `rpIdHash` 是否与期望 rpId 匹配；
  - `flags` 是否满足 `userVerification` 要求（如要求 `UV=1`）；
  - `signCount` 是否单调递增（> 上次保存的值）。([W3C][1])

### 5) `response.signature`

- 认证器使用**该凭据绑定的公钥**对应的**私钥**对如下字节串签名：
  `authenticatorData || SHA-256(clientDataJSON)`
- **服务器**用数据库保存的**公钥**验证签名的真实性。([W3C][1])

### 6) `response.userHandle`（可能为 `null`）

- **discoverable credentials** 场景下，认证器可回传**与凭据绑定的用户标识**（byte\[]）。
- 后端可据此直接找到用户（无须用户名）。若你只用非可发现凭据或 `allowCredentials` 白名单，常见为 `null`。([W3C][1])

### 7) `clientExtensionResults`（可选）

- 前端可一并传回，服务端可依据需要处理（例如 `uvm` 等）。([MDN Web Docs][5])

### 8) `options_token`（你系统自定义）

- **标准外**字段，用于**把“本次 options”与“本次 verify”绑定**（有的系统用 session/redis，也有的用外带 token）。目的：**抗重放**与**防参数串改**。无统一规范，思路与保存 `challenge` 并验证一致。可参考 SimpleWebAuthn 关于“保存 challenge 的会话方案”。([SimpleWebAuthn][9])

---

## 三、服务端典型验证清单（认证）

后端在收到上面的 `payload` 后，一般需要做（摘要）：

1. 按 `rawId` 查找已注册的凭据与其公钥；
2. 校验 **`challenge`**（来自已保存的 options）；
3. 校验 **`origin`** 与 **`rpIdHash`**（域/站点匹配）；
4. 按 `userVerification` 要求检查 **`flags`** 中的 `UP/UV`；
5. 用保存的**公钥**验证 **`signature`**；
6. 检查并更新 **`signCount`**（克隆检测）；
7. 处理扩展输出（若配置）。
   这些步骤在 W3C 规范“验证认证断言”一节与社区文档中有详细说明。([W3C][1])

---

## 四、与你当前代码的两个关键提示

1. **`mediation` 放错位置**
   `mediation` 必须放在 `navigator.credentials.get({ publicKey, mediation })` 的顶层，而不是 `publicKey` 里。否则 Conditional UI 不生效。([MDN Web Docs][7])

2. **`rpId` 本地兜底**
   本地开发建议在前端兜底 `rpId='localhost'`（或让后端按环境返回），否则很容易 `SecurityError`。跨域/多域要配 **`/.well-known/webauthn`** 以启用 Related Origin Requests（当前 Firefox 不支持，需考虑降级策略）。([web.dev][4])

---

## 五、`allowCredentials` 使用小抄

- **用户名+密码+随后二次验证（绑定到用户）**：通常**传递用户的所有 credentialId** 列表到 `allowCredentials`，限制可选项。
- **无用户名/一键直登（discoverable）**：**留空** `allowCredentials`，并使用 `mediation: 'conditional'` 以获得自动填充式 UI。([developers.yubico.com][10])
- `transports` 仅是**提示**给浏览器，不影响安全验证逻辑。([developers.yubico.com][11])

---

如果你愿意，我可以按你的接口结构再给一个\*\*“后端认证校验要点对照表”**（结合 `@simplewebauthn/server` 的参数名、如何比对 challenge、如何处理 signCount 与 UV 要求等），并补充**错误映射\*\*（`NotAllowedError/SecurityError` 等）与常见排错 Checklist。

[1]: https://www.w3.org/TR/webauthn-2/?utm_source=chatgpt.com "Web Authentication: An API for accessing Public Key ..."
[2]: https://github.com/w3c/webauthn/issues/1856?utm_source=chatgpt.com "Clarify the need for truly randomly generated challenges ..."
[3]: https://github.com/w3c/webauthn/wiki/Explainer%3A-Related-origin-requests?utm_source=chatgpt.com "Explainer: Related origin requests · w3c/webauthn Wiki"
[4]: https://web.dev/articles/webauthn-related-origin-requests?utm_source=chatgpt.com "Allow passkey reuse across your sites with Related Origin ..."
[5]: https://developer.mozilla.org/en-US/docs/Web/API/PublicKeyCredentialRequestOptions?utm_source=chatgpt.com "PublicKeyCredentialRequestOpti..."
[6]: https://developer.mozilla.org/en-US/docs/Web/API/AuthenticatorAttestationResponse/getTransports?utm_source=chatgpt.com "AuthenticatorAttestationResponse: getTransports() method"
[7]: https://developer.mozilla.org/en-US/docs/Web/API/CredentialsContainer/get?utm_source=chatgpt.com "CredentialsContainer: get() method - Web APIs - MDN - Mozilla"
[8]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Authentication_API/Authenticator_data?utm_source=chatgpt.com "Authenticator data - Web APIs | MDN - Mozilla"
[9]: https://simplewebauthn.dev/docs/packages/server?utm_source=chatgpt.com "simplewebauthn/server"
[10]: https://developers.yubico.com/WebAuthn/WebAuthn_Developer_Guide/WebAuthn_Client_Authentication.html?utm_source=chatgpt.com "WebAuthn Client Authentication"
[11]: https://developers.yubico.com/java-webauthn-server/JavaDoc/webauthn-server-core/2.3.0/com/yubico/webauthn/data/AuthenticatorTransport.html?utm_source=chatgpt.com "AuthenticatorTransport (webauthn-server-core 2.3.0 API)"

好嘞——下面给你一份\*\*“后端认证校验要点对照表 + SimpleWebAuthn（v11+）实务清单”**，把**后端返回的 `options` 各字段作用/取值\*\*，以及**前端回传给后端的断言 payload**如何被验证，逐一对齐。还附上**最小必要的服务端代码片段**（只放关键行、复杂逻辑行上方有中文注释），以及**常见坑与错误映射**。文末都给了权威出处。

---

## 一、认证阶段 `PublicKeyCredentialRequestOptions`（后端生成 → 前端 `navigator.credentials.get({ publicKey, mediation? })`）

| 字段               | 必须 | 类型/典型值                                                        | 作用 & 校验点                                                                                                                                                                          |       |       |       |                                               |
| ------------------ | ---: | ------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- | ----- | ----- | --------------------------------------------- |
| `challenge`        |   ✅ | 高熵随机字节（前端以 **base64url** 字符串接收 → 转 `ArrayBuffer`） | **防重放**。浏览器会把它写进 `clientDataJSON` 并参与签名；后端必须与会话中保存的 challenge 完全一致才通过。([MDN Web Docs][1])                                                         |       |       |       |                                               |
| `rpId`             |   ⭕ | 域名字符串（如 `example.com` / `localhost`）                       | 指定 **RP ID**。应与当前页面域名满足后缀匹配；不匹配浏览器直接抛 **`SecurityError`**。多域/跨站共用需配置 `/.well-known/webauthn` 的 **Related Origin Requests** 白名单。([GitHub][2]) |       |       |       |                                               |
| `allowCredentials` |   ⭕ | `[{ type: 'public-key', id: <Buffer>, transports?: [...] }]`       | 限定可用凭据（**credentialId 白名单**）。做 **无用户名/可发现凭据** 登录时通常留空，让浏览器从设备中自动发现。`transports` 为提示（\`"internal"                                        | "usb" | "nfc" | "ble" | "hybrid"\` 等）。([udn.realityripple.com][3]) |
| `userVerification` |   ⭕ | `"required" \| "preferred" \| "discouraged"`                       | 是否必须本地生物识别/解锁。若设为 `"required"`，后端需检查 `UV` 标志。([MDN Web Docs][1])                                                                                              |       |       |       |                                               |
| `timeout`          |   ⭕ | 毫秒数                                                             | 用户交互超时建议；浏览器可忽略。([MDN Web Docs][1])                                                                                                                                    |       |       |       |                                               |
| `extensions`       |   ⭕ | 任意对象（各扩展自定义形态）                                       | WebAuthn 扩展输入；验证时可读取扩展输出决定策略（如 `uvm` 等）。([MDN Web Docs][4])                                                                                                    |       |       |       |                                               |
| `mediation`        |   ❌ | **不在 `publicKey` 里！**                                          | **在 `navigator.credentials.get` 顶层**传入（例如 `'conditional'` 开启 Conditional UI/表单自动填充式 UI）。放进 `publicKey` 会被忽略。([MDN Web Docs][5])                              |       |       |       |                                               |

> 小结：你 `toPublicKeyOptions(...)` 里把 `mediation` 放进了 `publicKey`，应移到 `credentials.get` 的顶层；`rpId` 在本地开发建议兜底为 `localhost`，否则极易 `SecurityError`。([MDN Web Docs][5])

---

## 二、前端回传给后端的断言 `payload`（认证结果）

你当前回传结构（简化）是对的：

```ts
{
  id,                // UI 标识；通常不用于严谨校验
  rawId,             // <- base64url(credentialId二进制)，后端用它匹配库中凭据
  type,              // "public-key"
  options_token,     // 你的系统自定义防重放/绑会话令牌
  response: {
    clientDataJSON,      // 含 challenge / origin / type="webauthn.get"
    authenticatorData,   // 含 rpIdHash / flags(UP/UV/...) / signCount / 扩展输出
    signature,           // 对 (authenticatorData || SHA256(clientDataJSON)) 的签名
    userHandle | null,   // 可发现凭据时可能存在（用户主键字节串）
  },
  clientExtensionResults? // 可选
}
```

- **`clientDataJSON`**：后端需校验 `challenge`、`origin`、`type="webauthn.get"`，再做 `SHA-256` 参与签名验证。([MDN Web Docs][6])
- **`authenticatorData`**：后端校验 `rpIdHash==SHA256(rpId)`、`flags`（例如是否包含 `UV`）、并进行 **`signCount` 单调递增**检查。([MDN Web Docs][6])
- **`signature`**：用数据库保存的**公钥**验签，消息是 `authenticatorData || SHA256(clientDataJSON)`。([MDN Web Docs][7])

---

## 三、SimpleWebAuthn（v11+）后端验证清单（认证）

> 术语对齐：
>
> - 生成 options：`generateAuthenticationOptions()`
> - 校验断言：`verifyAuthenticationResponse()`（v11+）

**1）生成认证 options（登录 / 二次校验）**

```ts
// 复杂逻辑：用用户已绑定的 credentialId 组装 allowCredentials；若做“无用户名直登”，则留空
const opts = await generateAuthenticationOptions({
  rpID: process.env.RP_ID, // 上一行：与页面域名/Related Origins 配套
  allowCredentials: userCreds?.map((c) => ({
    id: base64url.toBuffer(c.credentialId), // 上一行：DB里通常以base64url存；此处还原为Buffer
    type: "public-key",
    transports: c.transports as any, // 可选；仅提示 UA 选择通道
  })),
  userVerification: "preferred", // 或 'required'（则后端需检查 UV）
  timeout: 60_000,
  // extensions: {...}                              // 需要再加
});

// 复杂逻辑：把 challenge 与会话绑定（如用 Redis，键=会话ID）；严格用 base64url 存储与比对
await redis.setEx(`webauthn:challenge:${sid}`, 300, opts.challenge); // 5分钟有效
return opts;
```

要点：**challenge 必须保存并一次性使用**；即使验证失败也要作废，防止重放。([简单网页认证][8])

**2）验证断言**（前端把 `PublicKeyCredential` 序列化为上面的 payload 发来）

```ts
// 复杂逻辑：取回并删除 challenge，保证一次性使用
const expectedChallenge = await redis.getDel(`webauthn:challenge:${sid}`);

const verification = await verifyAuthenticationResponse({
  response: payload, // 上一行：就是你发来的 id/rawId/type/response/...
  expectedChallenge, // 严格等比对；base64url 字面一致
  expectedOrigin: process.env.ORIGIN, // 例：https://app.example.com
  expectedRPID: process.env.RP_ID, // 例：example.com（或 localhost）
  requireUserVerification: true, // 若你在 options 里要求 UV，此处也应 true
});

if (!verification.verified) {
  // … 统一返回登录失败/请重试
  throw new UnauthorizedException("webauthn verification failed");
}

// 复杂逻辑：依据 authenticationInfo 更新 signCount、定位凭据与用户
const { newCounter, credentialID, credentialDeviceType, userVerified } =
  verification.authenticationInfo;

// 上一行：比对/更新 DB 中该 credential 的 counter；若 newCounter <= 已存值，则可能存在克隆风险
await credentialRepo.updateById(credentialID, { counter: newCounter });

// 复杂逻辑：若 userHandle 存在，可用于无用户名直登从凭据反查用户
// （simplewebauthn 已做基础校验；你可根据业务增加“账号冻结/设备绑定”等策略）
```

接口与字段含义、错误场景见官方文档。([简单网页认证][9])

---

## 四、浏览器端调用要点（只列差异处）

```ts
const publicKey = toPublicKeyOptions(optionsFromServer);

// 上一行：Conditional UI 时，请把 mediation 放在顶层（不是 publicKey 内）
const mediation = optionsFromServer.mediation ?? undefined;

// 上一行：本地开发/线下环境，rpId 建议兜底为 'localhost'
if (["localhost", "127.0.0.1"].includes(location.hostname)) {
  (publicKey as any).rpId = "localhost";
}

const cred = await navigator.credentials.get({ publicKey, mediation });
```

- `mediation: 'conditional'` 可启用表单自动填充式 Passkey 选择 UI。([MDN Web Docs][5])
- 多域共享凭据需配置 **`/.well-known/webauthn`** 的 Related Origin Requests；否则会 **`SecurityError`**。([web.dev][10])

---

## 五、常见坑 & 错误映射（含排查建议）

- **`SecurityError`**：`rpId` 与当前页面域不匹配；或跨域未配置 **Related Origin Requests**。

  - 检查：页面 `origin`、服务端 `rpId`、以及是否有 `/.well-known/webauthn` JSON（Chrome 支持、Firefox 目前不支持）。([web.dev][10])

- **`NotAllowedError`**：用户取消、未选择、超时或环境不支持。

  - 建议：UI 上给“重试/改用其它方式”；适当延长 `timeout`。([MDN Web Docs][5])

- **验签失败**：服务端公钥与凭据不匹配，或签名消息拼装错误（必须 `authenticatorData || SHA256(clientDataJSON)`）。([MDN Web Docs][7])
- **`UV` 不满足**：前端 `userVerification: 'required'`，但设备未解锁；后端 `requireUserVerification: true` 会拒绝。([MDN Web Docs][1])
- **`signCount` 未递增**：提示可能的凭据克隆（部分平台计数恒 0，需在策略上兼容）。([MDN Web Docs][6])
- **JOSE/曲线不支持**（如 OKP/Ed25519）导致 `verifyAuthenticationResponse` 报错：升级依赖或改用受支持算法；参考 SimpleWebAuthn 的已知问题。([简单网页认证][9])

---

## 六、字段作用快速对照（你问到的两类）

**A. 后端返回给前端的 `options` 字段（认证阶段）**

- `challenge`：一次性随机数，**必须保存并严格匹配**；验证链路里参与签名。([MDN Web Docs][1])
- `rpId`：RP ID 域；**决定可用凭据的作用域**；与页面域不匹配会被浏览器直接拒绝。([GitHub][2])
- `allowCredentials`：可用凭据白名单；空则走“设备自动发现”（更适合**无用户名/直登**）。([udn.realityripple.com][3])
- `userVerification`：本地解锁强度要求；后端需一致地要求/校验。([MDN Web Docs][1])
- `timeout`：交互时间建议。([MDN Web Docs][1])
- `extensions`：功能扩展输入。([MDN Web Docs][4])
- `mediation`：**顶层参数**（非 `publicKey` 字段）；控制 Conditional UI。([MDN Web Docs][5])

**B. 你回传给后端的断言字段（认证结果）**

- `id`/`rawId`：凭据标识，**以 `rawId` 匹配库中凭据**。([MDN Web Docs][1])
- `type`：恒为 `"public-key"`。([MDN Web Docs][1])
- `response.clientDataJSON`：含 `challenge`/`origin`/`type` 等，**要校验**；其哈希参与签名。([MDN Web Docs][6])
- `response.authenticatorData`：含 `rpIdHash`/`flags`/`signCount` 等，**要校验并更新 counter**。([MDN Web Docs][6])
- `response.signature`：对（`authenticatorData || SHA256(clientDataJSON)`）的签名，**用公钥验签**。([MDN Web Docs][7])
- `response.userHandle`：可发现凭据时可能有；可用于**无用户名直登**回查账号。([MDN Web Docs][1])
- `clientExtensionResults`：若使用扩展，建议一并传回。([MDN Web Docs][4])
- `options_token`：**你系统自定义**的会话/挑战绑定令牌，目的与保存/匹配 challenge 一致（防重放）。([简单网页认证][8])

---

## 七、参考与延伸

- MDN：`PublicKeyCredentialRequestOptions` 字段总览（挑战、UV、allowCredentials 等）。([MDN Web Docs][1])
- MDN：`CredentialsContainer.get()`（顶层 `mediation` 选项）。([MDN Web Docs][5])
- MDN：`AuthenticatorAssertionResponse`（断言结构、`signature` 含义）。([MDN Web Docs][6])
- W3C WebAuthn Level 3（2025-01-27 版）。([W3C][11])
- Chrome/Web.dev：**Related Origin Requests** 与 `/.well-known/webauthn`。([web.dev][10])
- SimpleWebAuthn：`@simplewebauthn/server` 与 `@simplewebauthn/browser` 文档与“Passkeys”最佳实践。([简单网页认证][9])

---

如果你接下来想**严格对齐你后端（NestJS + Redis + SimpleWebAuthn v11+）的参数名**，我可以把上面的两段服务端片段，分别扩成**控制器/服务方法**的“最小可运行版本”，并把\*\*`expectedChallenge/Origin/RPID`**、**`newCounter`\*\* 更新、**设备 ID→ 账号绑定**等都按你现有项目约定补齐。需要的话直接说一声。

[1]: https://developer.mozilla.org/en-US/docs/Web/API/PublicKeyCredentialRequestOptions?utm_source=chatgpt.com "PublicKeyCredentialRequestOpti..."
[2]: https://github.com/w3c/webauthn/wiki/Explainer%3A-Related-origin-requests?utm_source=chatgpt.com "Explainer: Related origin requests · w3c/webauthn Wiki"
[3]: https://udn.realityripple.com/docs/Web/API/PublicKeyCredentialRequestOptions/allowCredentials?utm_source=chatgpt.com "PublicKeyCredentialRequestOpti..."
[4]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Authentication_API/WebAuthn_extensions?utm_source=chatgpt.com "Web Authentication extensions - Web APIs - MDN"
[5]: https://developer.mozilla.org/en-US/docs/Web/API/CredentialsContainer/get?utm_source=chatgpt.com "CredentialsContainer: get() method - Web APIs - MDN - Mozilla"
[6]: https://developer.mozilla.org/en-US/docs/Web/API/AuthenticatorAssertionResponse?utm_source=chatgpt.com "AuthenticatorAssertionResponse - Web APIs | MDN - Mozilla"
[7]: https://developer.mozilla.org/en-US/docs/Web/API/AuthenticatorAssertionResponse/signature?utm_source=chatgpt.com "AuthenticatorAssertionResponse: signature property - Web APIs"
[8]: https://simplewebauthn.dev/docs/advanced/passkeys?utm_source=chatgpt.com "Passkeys"
[9]: https://simplewebauthn.dev/docs/packages/server?utm_source=chatgpt.com "simplewebauthn/server"
[10]: https://web.dev/articles/webauthn-related-origin-requests?utm_source=chatgpt.com "Allow passkey reuse across your sites with Related Origin ..."
[11]: https://www.w3.org/TR/webauthn-3/?utm_source=chatgpt.com "An API for accessing Public Key Credentials - Level 3"
