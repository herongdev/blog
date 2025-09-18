## 1）`mediation` 放在 `credentials.get` 顶层到底干嘛？

`navigator.credentials.get({ publicKey, mediation })` 的 `mediation` 是**取凭据的“介入方式”**，跟 WebAuthn 的 `publicKey` 选项是两块：

- **`'conditional'`（条件式 UI）**

  - 典型用法：页面一加载或输入框聚焦就发起 `get(...)`，浏览器在**输入框自动填充/下拉**里展示“用通行密钥登录”。
  - **不需要用户先点击按钮**；用户从下拉里点某个账号，Promise 才 resolve。
  - 适合“无用户名/可发现凭据（discoverable）”的直登体验。

- **`'optional'`（默认）**

  - 需要**按钮触发**（用户激活）后弹系统对话框。
  - 适合你现在“点击【使用通行密钥登录】”这类显式触发。

- **`'required'`**

  - 强制出现“选择/确认”的 UI，不走自动化；对 WebAuthn 实际体验上跟 `optional` 区别不大，更多用于“别走自动登录”的场景。

- **`'silent'`**

  - WebAuthn 基本不可用（不会静默给你断言），可忽略。

> 结论：
>
> - **自动填充场景** → 用 `'conditional'`。
> - **点击按钮场景** → 用 `'optional'`（或 `'required'`，差别很小）。

## 2）`mode: 'roaming_only'` 是什么？

这是**我们上文建议的自定义字段**，不是 WebAuthn 规范。
用途：告诉你的**前端/风控逻辑**“这次必须用**漫游安全密钥**（USB/NFC/BLE 的硬件钥）”。前端据此可以改变文案与兜底逻辑（例如失败就提示插入安全钥、给出备用登录方式等）。

> 标准层面真正起作用的是 `allowCredentials` 的**筛选集合**和 `userVerification` 的强度要求，`mode` 只是你系统内的**状态标签**。

## 3）为什么没看到“安全密钥选择列表”，只提示“使用某种介质”？

看你后端返回的 options：

```json
{
  "extensions": { "extensions": [] },
  "challenge": "1758013239513162",
  "timeout": null,
  "rpId": "www.52wukong.com",
  "allowCredentials": [
    { "type": "public-key", "id": "/NlEbL4Ozv4C+ZIig+td7Q==", "transports": [] }
  ],
  "userVerification": null
}
```

关键问题有三点：

1. **你把 `allowCredentials` 限定为“只有这一个 credentialId”**

   - 浏览器就会**直接走这个凭据**，不会给你“选择其它方式/设备”的列表（比如“附近的手机/iPhone/Google 管理器”）。
   - 如果这枚凭据是**硬件钥**，UI 就只会提示“插入/轻触/连接”（也就是你看到的“用介质”）。
   - 想要看到“用手机/用钥匙串/附近设备”的更多选项，**不要传 `allowCredentials`**（走可发现凭据），让浏览器自己找可用的 passkey 与跨设备选项。

2. **`transports: []` 是空的**

   - 这是**提示性信息**，空数组会让提示很“泛”（比如 Safari 就只说“使用安全密钥”，不显示 USB/NFC/BLE 的具体指引）。
   - 如果这是硬件钥，请把你保存的 `transports`（如 `["usb","nfc","ble"]`）**回填**进去，用户引导会更清晰。

3. **强度与超时未设置**

   - `userVerification: null` → 建议明确：

     - 普通登录用 `'preferred'`；
     - 高风险必须 `'required'`。

   - `timeout: null` → 建议设置具体毫秒（如 60000）。

> 额外提醒：
>
> - 你这份 `id` 看起来是 **Base64**（含 `+` `/` `=`），前端转换函数能兼容就行；规范常用 **base64url**。
> - `extensions` 里套了个 `extensions` 字段没意义，可以直接删掉或按需设置真正的扩展。

---

## 4）后端应该怎么回（只给必要片段）

### A. 通用登录（让用户可以用**本机或跨设备**的任何 passkey；适合 Safari/Chrome/iOS/Android 混合人群）

```ts
// 上一行：通用直登，不传 allowCredentials，交给浏览器发现
const options = await generateAuthenticationOptions({
  rpID: "www.52wukong.com",
  userVerification: "preferred", // 高风险可切 'required'
  timeout: 60000,
  // 不要传 allowCredentials
  // extensions: { /* 需要才加，如 devicePubKey */ }
});

// 上一行：把 mediation 发给前端放在 credentials.get 顶层（自动填充体验）
return { options, mediation: "conditional" as const };
```

效果：

- Safari 上即便用户只在 Android/Google 那边绑定过，仍可通过**跨设备**（二维码/附近设备）完成登录。
- Chrome 上能直接调起 Google Password Manager 的 passkey。
- iOS 上能调起 iCloud 钥匙串。
- 你不做“平台”限定，不会把用户锁死。

### B. 高风险 → **只允许“安全密钥（硬件钥）”**

```ts
// 上一行：从你库里筛出该用户“硬件钥”憑据（transports 包含 usb/nfc/ble）
const roamingCreds = userCreds.filter((c) =>
  c.transports?.some((t) => ["usb", "nfc", "ble"].includes(t))
);

if (roamingCreds.length > 0) {
  const options = await generateAuthenticationOptions({
    rpID: "www.52wukong.com",
    userVerification: "required", // 强制本地解锁
    timeout: 60000,
    allowCredentials: roamingCreds.map((c) => ({
      id: base64url.toBuffer(c.credentialId),
      type: "public-key",
      // 上一行：把已存的 transports 回填，改善提示（USB/NFC/BLE）
      transports: c.transports as any,
    })),
  });

  // 上一行：自定义标签，供前端 UI/风控使用（非 WebAuthn 规范）
  return {
    options,
    mediation: "required" as const,
    mode: "roaming_only" as const,
  };
}

// 上一行：没有硬件钥 → 回落通用直登但强 UV，并提示用户尽快绑定安全钥
const fallback = await generateAuthenticationOptions({
  rpID: "www.52wukong.com",
  userVerification: "required",
  timeout: 60000,
});
return {
  options: fallback,
  mediation: "optional" as const,
  mode: "any_passkey_fallback" as const,
};
```

---

## 5）前端只需改这两行（你已有按钮触发场景）

```diff
- const cred = await navigator.credentials.get({ publicKey })
+ // 上一行：把后端返回的 mediation 放到顶层（conditional/optional/required）
+ const cred = await navigator.credentials.get({ publicKey, mediation })
```

（自动填充场景才用 `'conditional'`；按钮点击可用 `'optional'` 或 `'required'`。）

---

## 6）一份“为什么不出现选择列表”的速查清单

- ✅ 想看到“附近设备 / 钥匙串 / Google 管理器” → **不传 `allowCredentials`**（discoverable）。
- ✅ 只想让硬件钥可用 → **传 `allowCredentials = 仅硬件钥的 credentialId 集合`**，并把 **`transports` 正确回填**。
- ✅ 高风险 → `userVerification: 'required'`。
- ✅ 自动填充体验（无需点击） → 顶层 `mediation: 'conditional'`。
- ⚠️ 传了单个 `allowCredentials` → 浏览器**直奔该凭据**，不会给你“选择其它方式”的 UI（你现在就是这个情况）。
- ⚠️ `transports: []` → 提示信息会很“泛”，尽量回填 `["usb","nfc","ble"]` 等。
- ⚠️ `rpId` 必须匹配当前页面域（或用 Related Origins 机制），否则 `SecurityError`。

结论：这是**注册（create）用的 options**，不是登录（get）。结构里有几处会导致体验或兼容性问题：`challenge` 低熵/格式不规范、`user.id` 类型不对、`pubKeyCredParams` 为空、`extensions` 形态不对、`timeout` 为 null、`authenticatorAttachment: 'platform'` 会强制仅平台认证器。下面只给**需要改的字段**（复杂点的上一行有注释）。

---

### 只改这些

```diff
- "challenge": "1758018552291119",
+ // 上一行：必须是 32-64 字节的随机值，后端生成后以 base64url 返回（前端再转 ArrayBuffer）
+ "challenge": "<base64url(randomBytes[32~64])>",

- "rp": {
-   "icon": null,
-   "name": "GtcApp",
-   "id": "www.52wukong.com"
- },
+ // 上一行：若登录页只在 www 子域，用 www.52wukong.com；若希望全子域通用，建议用根域 52wukong.com
+ "rp": { "name": "GtcApp", "id": "52wukong.com" },

- "user": {
-   "icon": null,
-   "name": "herongxhr11@gmail.com",
-   "id": "669876516",
-   "displayName": "herongxhr11@gmail.com"
- },
+ // 上一行：user.id 必须是字节串（1-64 字节）。后端把内部 userId 编成字节再 base64url 返回；
+ // 前端再 b64url→ArrayBuffer。不要直接给十进制/普通字符串。
+ "user": {
+   "name": "herongxhr11@gmail.com",
+   "id": "<base64url(userIdBytes)>",
+   "displayName": "herongxhr11@gmail.com"
+ },

- "pubKeyCredParams": [],
+ // 上一行：至少给出一种算法。最通用：ES256(-7)。如需兼容更多，可追加 RS256(-257)、EdDSA(-8)（按需）。
+ "pubKeyCredParams": [{ "type": "public-key", "alg": -7 }],

- "authenticatorSelection": {
-   "authenticatorAttachment": "platform",
-   "userVerification": "required",
-   "residentKey": "required"
- },
+ // 上一行：只做“平台 Passkey”（Windows Hello / Touch ID / Android 平台）就保留 attachment: platform；
+ // 若同时允许安全钥/跨设备注册，把 authenticatorAttachment 删掉，让浏览器自行选择。
+ "authenticatorSelection": {
+   "userVerification": "required",
+   "residentKey": "required"
+ },

- "attestation": null,
+ // 上一行：大多数场景用 "none"（隐私友好）；需要企业背书才考虑 "direct/enterprise"
+ "attestation": "none",

- "excludeCredentials": []
+ // 上一行：防重复注册：填入该用户已注册的所有 credentialId（base64url）
+ "excludeCredentials": [
+   { "type": "public-key", "id": "<credId1_base64url>" },
+   { "type": "public-key", "id": "<credId2_base64url>" }
+ ],

- "extensions": { "extensions": [] },
+ // 上一行：没用扩展就不要带；有就按键值对给，比如 { "credProps": true }
+ // "extensions": { "credProps": true },

- "timeout": null
+ // 上一行：给出合理超时（毫秒）
+ "timeout": 60000
```

---

### 说明要点（对应上面的改动）

- **challenge**：必须是一次性高熵随机字节（32–64B），并在服务端校验与会话中保存的挑战**严格相等**。
- **rp.id**：与当前页面域后缀匹配；要支持多个子域 → 用 `52wukong.com`。
- **user.id**：是**字节串**（前端最终是 `ArrayBuffer`）。SimpleWebAuthn v11+ 也要求 `Uint8Array`。
- **pubKeyCredParams**：不能为空；至少 `alg: -7 (ES256)`。
- **authenticatorSelection**：

  - 只做“平台 Passkey”→ 保留 `authenticatorAttachment: "platform"`；
  - 想允许**安全密钥/跨设备**注册 → 删掉该字段（让浏览器任选），`residentKey: "required"` 仍可保留以确保可发现凭据。

- **attestation**：常用 `"none"`；企业合规才用 `"direct"/"enterprise"`。
- **excludeCredentials**：避免同一用户重复注册同一把凭据。
- **extensions**：必须是对象；没用就删。
- **timeout**：建议 60s。

需要的话，我可以把你后端（NestJS + simplewebauthn v11+）的**生成注册 options**函数改成最小可用版本（支持把 `userId` 编码成 `Uint8Array`、`supportedAlgorithmIDs→pubKeyCredParams`、自动填充 `excludeCredentials`），只贴需要修改的行。
