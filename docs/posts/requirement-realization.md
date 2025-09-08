---
title: Web 端一键通行密钥：点击按钮后“先登录，失败再注册”的完整实现
date: 2025-09-05 00:21:16
tags:
---

---

title: Web 端一键通行密钥：点击按钮后“先登录，失败再注册”的完整实现
date: 2025-09-05
tags:

- Passkeys
- WebAuthn
- 前端实战
- 一键直登

---

## 摘要

本文给出 **Web 端** 的最小可用实现：**点击一个按钮 → 优先尝试登录（可发现凭证）→ 若无可用凭证或用户取消，则自动走 JIT 注册并直接登录**。
重点说明：“**不能事先枚举本地是否存在凭据**”（浏览器出于隐私不允许），正确姿势是**拿到服务端的 options 再调用 WebAuthn**，并对失败分支做平滑回退。

---

## 背景与原则

- 浏览器不会暴露“本地是否已有你家 RP 的通行密钥”的枚举 API（防侧信道追踪）。
- 正确流程永远是：**后端发 options（含 challenge）→ 前端发起 `get()`/`create()` → 前端把回包交给后端 `verify`**。
- 若想“先感知再决定”，只能做**能力探测**（如 `isConditionalMediationAvailable()`、`isUserVerifyingPlatformAuthenticatorAvailable()`），但这**不等于**“确有凭据”。
- 因此，本实现直接：**先请求登录 options** → `navigator.credentials.get` → 失败则 **请求注册 options** → `navigator.credentials.create` → 验证成功后**注册即登录**。

---

## 交互时序（简述）

1. 用户点击「一键登录」按钮
2. 前端 `POST /passkeys/login/options`（携带 `X-Device-Id`）
3. 浏览器 `navigator.credentials.get({ publicKey, mediation })`
4. 成功 → 回传 `/passkeys/login/verify` → **登录完成**
5. 失败（无匹配凭据/取消等）→ `POST /passkeys/register-or-login/options`
6. `navigator.credentials.create({ publicKey })`
7. 回传 `/passkeys/register-or-login/verify` → **注册并登录完成**

---

## 完整代码

> 下面给出**可直接粘贴落地**的最小实现（HTML + JS）。
> 复杂逻辑的上一行均有中文注释。
> 假设你的后端路由与本文一致：
>
> - `/passkeys/login/options`、`/passkeys/login/verify`
> - `/passkeys/register-or-login/options`、`/passkeys/register-or-login/verify`

### 1）页面与按钮

```html
<!-- index.html 片段：按钮与日志面板 -->
<button id="btn-passkey">一键通行密钥</button>

<pre
  id="log"
  style="background:#111;color:#9f9;padding:12px;white-space:pre-wrap"
></pre>

<script type="module" src="./passkeys-web.js"></script>
```

### 2）前端模块：`passkeys-web.js`

```js
// ======================= 基础工具 =======================

// 复杂：生成稳定的设备ID（首访生成并持久化，用于设备→账号绑定与风控）
function getDeviceId() {
  const key = "device_id";
  let id = localStorage.getItem(key);
  if (!id) {
    id =
      crypto?.randomUUID?.() ||
      "dev-" + Date.now() + "-" + Math.random().toString(16).slice(2);
    localStorage.setItem(key, id);
  }
  return id;
}

// 复杂：base64url ↔ ArrayBuffer 转换，确保与后端统一
function b64urlToBuf(b64url) {
  const pad = "=".repeat((4 - (b64url.length % 4)) % 4);
  const b64 = (b64url + pad).replace(/-/g, "+").replace(/_/g, "/");
  const str = atob(b64);
  const buf = new ArrayBuffer(str.length);
  const view = new Uint8Array(buf);
  for (let i = 0; i < str.length; i++) view[i] = str.charCodeAt(i);
  return buf;
}
function bufToB64url(buf) {
  const bytes = buf instanceof ArrayBuffer ? new Uint8Array(buf) : buf;
  let str = "";
  for (let i = 0; i < bytes.length; i++) str += String.fromCharCode(bytes[i]);
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

// 复杂：把 AuthenticationOptions 中的 base64url 字段转 ArrayBuffer
function toWebAuthnRequestOptions(serverOpts) {
  const opts = structuredClone(serverOpts);
  // challenge 需要转 ArrayBuffer
  if (typeof opts.challenge === "string")
    opts.challenge = b64urlToBuf(opts.challenge);
  // allowCredentials 中的 id 也需要转 ArrayBuffer
  if (Array.isArray(opts.allowCredentials)) {
    opts.allowCredentials = opts.allowCredentials.map((c) => ({
      ...c,
      id: typeof c.id === "string" ? b64urlToBuf(c.id) : c.id,
    }));
  }
  return opts;
}

// 复杂：把 RegistrationOptions 中的 base64url 字段转 ArrayBuffer/Uint8Array
function toWebAuthnCreationOptions(serverOpts) {
  const opts = structuredClone(serverOpts);
  if (typeof opts.challenge === "string")
    opts.challenge = b64urlToBuf(opts.challenge);
  if (opts.user && typeof opts.user.id === "string")
    opts.user.id = b64urlToBuf(opts.user.id);
  if (Array.isArray(opts.excludeCredentials)) {
    opts.excludeCredentials = opts.excludeCredentials.map((c) => ({
      ...c,
      id: typeof c.id === "string" ? b64urlToBuf(c.id) : c.id,
    }));
  }
  return opts;
}

// 复杂：把 get() 结果打包成后端可验证的 JSON（按 WebAuthn 规范，全用 base64url）
function packAssertion(cred) {
  const resp = cred.response;
  return {
    id: cred.id,
    rawId: bufToB64url(cred.rawId),
    type: cred.type,
    response: {
      clientDataJSON: bufToB64url(resp.clientDataJSON),
      authenticatorData: bufToB64url(resp.authenticatorData),
      signature: bufToB64url(resp.signature),
      userHandle: resp.userHandle ? bufToB64url(resp.userHandle) : null,
    },
    clientExtensionResults: cred.getClientExtensionResults?.() || {},
  };
}

// 复杂：把 create() 结果打包成后端可验证的 JSON（按 WebAuthn 规范，全用 base64url）
function packAttestation(cred) {
  const resp = cred.response;
  return {
    id: cred.id,
    rawId: bufToB64url(cred.rawId),
    type: cred.type,
    response: {
      clientDataJSON: bufToB64url(resp.clientDataJSON),
      attestationObject: bufToB64url(resp.attestationObject),
    },
    clientExtensionResults: cred.getClientExtensionResults?.() || {},
  };
}

// 复杂：通用 POST 封装，自动带上设备ID
async function postJSON(url, body) {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      // 设备ID写入 Header，便于后端风控/设备绑定。后端也可从 body 读取。
      "X-Device-Id": getDeviceId(),
    },
    body: JSON.stringify(body || {}),
    credentials: "include",
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json();
}

// 复杂：检测“条件UI”与平台验证器可用性（仅做能力判断，不代表一定有凭据）
async function detectSupport() {
  const hasWebAuthn = "PublicKeyCredential" in window;
  let conditional = false,
    uvpa = false;
  try {
    conditional =
      !!(await PublicKeyCredential.isConditionalMediationAvailable?.());
  } catch {}
  try {
    uvpa =
      !!(await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable?.());
  } catch {}
  return { hasWebAuthn, conditional, uvpa };
}

// ======================= 业务主流程 =======================

// 复杂：优先尝试登录（可发现凭证/或定向 allowCredentials）；失败则自动转注册并登录
export async function oneTapPasskey(baseUrl = "") {
  const log = (msg) => {
    const pre = document.getElementById("log");
    if (pre) pre.textContent += `[${new Date().toLocaleTimeString()}] ${msg}\n`;
    console.log(msg);
  };

  const deviceId = getDeviceId();
  const { hasWebAuthn, conditional, uvpa } = await detectSupport();
  if (!hasWebAuthn) throw new Error("当前环境不支持 WebAuthn");

  log(`检测：conditional=${conditional}, uvpa=${uvpa}`);

  try {
    // ========== 步骤A：请求“登录 options” ==========
    log("请求登录 options...");
    const loginOptsResp = await postJSON(`${baseUrl}/passkeys/login/options`, {
      deviceIdentifier: deviceId,
    });
    const requestOptions = loginOptsResp.options || loginOptsResp; // 兼容你的返回结构
    const publicKey = toWebAuthnRequestOptions(requestOptions);

    // 复杂：若支持条件UI，则 mediation 设为 'conditional'；否则 'required'（需用户手势）
    const mediation = conditional ? "conditional" : "required";

    // ========== 步骤B：发起 credentials.get ==========
    log(`调用 navigator.credentials.get (mediation=${mediation})...`);
    const assertion = await navigator.credentials.get({ publicKey, mediation });

    // ========== 步骤C：打包并回传后端校验 ==========
    log("提交登录 verify...");
    const verifyBody = packAssertion(assertion);
    const verifyResp = await postJSON(
      `${baseUrl}/passkeys/login/verify`,
      verifyBody
    );

    log("登录成功 ✅ " + JSON.stringify(verifyResp));
    return { mode: "login", result: verifyResp };
  } catch (err) {
    // 复杂：常见失败 1）用户取消 2）设备没有匹配凭据 3）options 过期
    console.warn("登录失败，准备转注册：", err);
    // ========== 步骤D：请求“一键注册 options” ==========
    const regOptsResp = await postJSON(
      `${baseUrl}/passkeys/register-or-login/options`,
      {
        deviceIdentifier: deviceId,
      }
    );
    const { userId, options: creationOptionsServer } = regOptsResp.userId
      ? regOptsResp
      : { userId: regOptsResp.userId, options: regOptsResp.options };

    const publicKey = toWebAuthnCreationOptions(creationOptionsServer);

    // ========== 步骤E：发起 credentials.create（注册） ==========
    log("调用 navigator.credentials.create ...");
    const attestation = await navigator.credentials.create({ publicKey });

    // ========== 步骤F：打包并回传后端，完成绑定+激活+登录 ==========
    log("提交注册 verify...");
    const verifyBody = {
      ...packAttestation(attestation),
      userId, // 复杂：JIT 返回的临时/访客 userId
      deviceIdentifier: deviceId, // 复杂：用于设备→账号唯一绑定
    };
    const verifyResp = await postJSON(
      `${baseUrl}/passkeys/register-or-login/verify`,
      verifyBody
    );

    log("注册并登录成功 ✅ " + JSON.stringify(verifyResp));
    return { mode: "register-then-login", result: verifyResp };
  }
}

// ======================= 页面挂载：按钮点击即触发 =======================
document.getElementById("btn-passkey")?.addEventListener("click", () => {
  // 复杂：这里的 baseUrl 请改为你的后端地址；同源部署可留空
  oneTapPasskey("").catch((e) => {
    const pre = document.getElementById("log");
    if (pre) pre.textContent += `❌ ${e?.message || e}\n`;
    console.error(e);
  });
});
```

---

## 与后端契约（对齐要点）

- `/passkeys/login/options`

  - **入参**：`{ deviceIdentifier?: string }`（Header 也可）
  - **返回**：`{ options: PublicKeyCredentialRequestOptions }`（`challenge`、`allowCredentials[].id` 为 **base64url** 字符串）

- `/passkeys/login/verify`

  - **入参**：上文 `packAssertion()` 的结果（所有字节字段 **base64url**）
  - **返回**：`{ verified: true, token, userId }`

- `/passkeys/register-or-login/options`

  - **入参**：`{ deviceIdentifier?: string }`
  - **返回**：`{ userId: string, options: PublicKeyCredentialCreationOptions }`（`challenge`、`user.id`、`excludeCredentials[].id` 为 **base64url**）

- `/passkeys/register-or-login/verify`

  - **入参**：`packAttestation()` + `{ userId, deviceIdentifier }`
  - **返回**：`{ verified: true, token, userId }`

> 以上与您现有的 `PasskeysService` 设计完全兼容。你也可以在“已绑定设备”场景下返回 `allowCredentials`，以提升命中率（文中已说明）。

---

## 常见问题（FAQ）

- **能不能“先看一下本地有没有凭据”，有就登录、没有就不调后端？**
  不能。浏览器不允许枚举凭据。你能做的只是能力探测与**尝试调用** `credentials.get`。而调用 `get/create` 都必须先有**服务端下发的 options（含 challenge）**。

- **什么时候用条件 UI（conditional mediation）？**
  页面加载即拿到 `login options` 后即可“无提示等候”；但为简化，这里在**按钮点击**后再调，用 `mediation='conditional'`（若可用）+ `required` 作为兜底。

- **后端 challenge 过期怎么办？**
  统一设置较短 TTL（如 300s），一旦 `get/create` 抛出 `InvalidStateError/NotAllowedError`，前端直接重拉 options 再试。

---

## 测试步骤

1. **HTTPS 环境**部署（本地可用 `localhost`）
2. **确保后端 RP_ID/ORIGIN 正确**、Redis 正常、四个路由可达
3. 首次访问：点击按钮 → 预期走注册 → 后端 verify 成功后返回 token
4. 再次访问：点击按钮 → 直接 `get()` 登录成功
5. Android/Chrome 测试条件 UI：地址栏出现通行密钥提示；Safari 需同源 HTTPS

---

## 小结

- “先判断本地是否有凭据”在浏览器上**不可行**；
- **正确做法**是**每次先拿登录 options**，用 `credentials.get` 尝试登录；
- **失败则无缝切到注册**（JIT 建号 + 可发现凭证 + 注册即登录）。
- 上文代码开箱即用，你只需要把 `baseUrl` 指向你的后端即可。
