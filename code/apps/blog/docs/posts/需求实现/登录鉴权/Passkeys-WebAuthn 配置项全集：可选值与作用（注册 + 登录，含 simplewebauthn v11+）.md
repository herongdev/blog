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

### 1. `generateAuthenticationOptions` 完整参数

基于 `@simplewebauthn/server` 的 TypeScript 定义，完整的登录选项配置：

| 字段               | 类型/可选值                                  | 必填 | 作用                                       | 建议                                             |
| ------------------ | -------------------------------------------- | ---- | ------------------------------------------ | ------------------------------------------------ |
| `rpID`             | `string`                                     | ✅   | **Relying Party ID**，与注册时相同的域名。 | 填你站点主域，如 `'example.com'`。               |
| `allowCredentials` | `Array<{id, transports?}>` 或 `undefined`    | ❌   | 指定可用的凭据列表（白名单模式）。         | 传统登录填入；Passkey 直登留空。                 |
| `challenge`        | `string \| Uint8Array` 或自动生成            | ❌   | 防重放挑战，一次性随机值。                 | 通常让库自动生成；手动指定需确保唯一性。         |
| `timeout`          | `number`（毫秒）                             | ❌   | 用户完成认证的超时时间。                   | 默认 60000ms，建议 60000–120000ms。              |
| `userVerification` | `'required' \| 'preferred' \| 'discouraged'` | ❌   | 是否要求用户验证（生物识别/PIN）。         | B2C：**`preferred`**；高敏后台：**`required`**。 |
| `extensions`       | `AuthenticationExtensionsClientInputs`       | ❌   | 扩展功能配置。                             | 按需配置，常用 `appid`、`uvm`。                  |

### 2. 基础字段详解

#### `rpID`（必填）

```ts
rpID: "example.com"; // 必须与注册时一致，且为当前域名或其父域
```

#### `allowCredentials`（关键字段）

```ts
// 类型定义
allowCredentials?: {
    id: Base64URLString;           // 凭据 ID（base64url 编码）
    transports?: AuthenticatorTransportFuture[];  // 传输方式提示
}[]

// 使用场景一：传统登录流程（已知用户）
allowCredentials: [
    {
        id: "user1_credential_id_base64url",
        transports: ['internal', 'hybrid', 'usb']
    },
    {
        id: "user1_another_credential_id",
        transports: ['internal']
    }
]

// 使用场景二：Passkey 直登（推荐）
allowCredentials: undefined  // 或不传此字段
```

**`transports` 支持的值（`AuthenticatorTransportFuture`）**：

- `'internal'`：平台内置认证器（如 Touch ID、Face ID）
- `'usb'`：USB 安全钥匙
- `'nfc'`：NFC 安全钥匙
- `'ble'`：蓝牙安全钥匙
- `'hybrid'`：混合传输（如手机扫码）
- `'cable'`：已废弃，被 `hybrid` 替代
- `'smart-card'`：智能卡

#### `challenge`

```ts
// 方式一：让库自动生成（推荐）
// 不传 challenge 参数，库会自动生成

// 方式二：手动指定
challenge: "your-unique-challenge-string";
// 或
challenge: new Uint8Array([
  /* 随机字节 */
]);
```

#### `timeout`

```ts
timeout: 60000; // 60秒超时
timeout: 120000; // 120秒超时（推荐，给用户更多时间）
```

#### `userVerification`

```ts
userVerification: "preferred"; // 推荐：有生物识别就用，没有也不强制
userVerification: "required"; // 高安全：必须生物识别/PIN
userVerification: "discouraged"; // 不推荐生物识别（少见）
```

### 2. 定位凭据 `allowCredentials`

| 字段               | 类型                                                             | 作用                                                                 | 典型用法                                          |
| ------------------ | ---------------------------------------------------------------- | -------------------------------------------------------------------- | ------------------------------------------------- |
| `allowCredentials` | `{ type:'public-key', id:ArrayBuffer, transports?: string[] }[]` | **白名单**方式，限定可用哪些凭据（常在"用户名已知"的传统登录流）。   | 用户名 → 查出该用户所有 credentialId → 全部填入。 |
| （为空或不传）     | ——                                                               | 允许**可发现凭据**自由匹配（配合 Conditional UI 可"无用户名直登"）。 | **Passkey 体验**常用做法。                        |

### 3. 浏览器端 UI 行为

#### `mediation` - Conditional UI 控制

| 字段                                                                          | 值                                        | 作用                                                                                  | 备注                            |
| ----------------------------------------------------------------------------- | ----------------------------------------- | ------------------------------------------------------------------------------------- | ------------------------------- |
| `mediation`（在 `navigator.credentials.get()` 的 `publicKey` 旁边、同级传入） | `'conditional' \| 'required' \| 'silent'` | **Conditional UI** 关键：`'conditional'` 允许地址栏内直接弹出选择框，实现"一键直登"。 | 需 HTTPS + 满足浏览器启用条件。 |

#### `hints` - 认证器类别提示

基于 `PublicKeyCredentialHint` 类型，用于优化浏览器的认证体验：

| 值                | 含义                                                               | 使用场景                  | 效果                           |
| ----------------- | ------------------------------------------------------------------ | ------------------------- | ------------------------------ |
| `'hybrid'`        | 移动设备上的平台认证器（如手机上的 Face ID、指纹）                 | 跨设备认证，QR 码扫描场景 | 浏览器可能优先显示 QR 码选项   |
| `'security-key'`  | 便携式 FIDO2 认证器，可通过 USB 或 NFC 在多个设备上使用            | 企业环境，高安全要求场景  | 浏览器可能优先显示硬件钥匙选项 |
| `'client-device'` | 当前设备的认证器，通常等同于平台认证器（如电脑上的 Windows Hello） | 本设备认证，便捷登录场景  | 浏览器可能优先显示本地认证选项 |

**使用示例：**

```ts
// 服务端生成 options 时指定 hints
const options = await generateAuthenticationOptions({
  rpID: "example.com",
  // 提示浏览器优先显示跨设备选项（如 QR 码）
  hints: ["hybrid", "security-key"],
  userVerification: "preferred",
});

// 或者根据用户环境动态设置
const hints: PublicKeyCredentialHint[] = [];
if (isMobileDevice) {
  hints.push("client-device"); // 移动设备优先本地认证
} else {
  hints.push("hybrid", "security-key"); // 桌面设备支持跨设备认证
}

const options = await generateAuthenticationOptions({
  rpID: "example.com",
  hints,
  userVerification: "preferred",
});
```

**注意事项：**

- `hints` 比 `authenticatorAttachment` 限制更宽松，是建议性的而非强制性的
- 不是所有浏览器都实现了对 `hints` 的支持
- 浏览器可能会根据自身的 UI 设计选择性地使用这些提示

### 3. 扩展 `extensions`（登录）

基于 TypeScript 定义的 `AuthenticationExtensionsClientInputs` 接口：

```ts
interface AuthenticationExtensionsClientInputs {
  appid?: string; // U2F 兼容性
  credProps?: boolean; // 凭据属性（通常用于注册）
  hmacCreateSecret?: boolean; // HMAC 密钥创建
  minPinLength?: boolean; // 最小 PIN 长度要求
}
```

| 扩展名             | 类型      | 作用                                                      | 返回                                      | 建议                |
| ------------------ | --------- | --------------------------------------------------------- | ----------------------------------------- | ------------------- |
| `appid`            | `string`  | **U2F 兼容**：指定旧 U2F AppID，允许使用旧 U2F 凭据登录。 | `clientExtensionResults.appid`            | 仅历史迁移时用。    |
| `credProps`        | `boolean` | 请求返回凭据属性信息（通常用于注册，登录时少见）。        | `clientExtensionResults.credProps`        | 登录时通常不需要。  |
| `hmacCreateSecret` | `boolean` | 请求创建 HMAC 密钥，用于后续的对称加密操作。              | `clientExtensionResults.hmacCreateSecret` | 高级加密场景使用。  |
| `minPinLength`     | `boolean` | 请求返回认证器支持的最小 PIN 长度。                       | `clientExtensionResults.minPinLength`     | 用于 PIN 策略制定。 |

#### 常用扩展配置示例

```ts
// 1. U2F 兼容登录（迁移场景）
extensions: {
    appid: "https://example.com/u2f-app-id.json"  // 指向你的 U2F AppID
}

// 2. HMAC 密钥创建（高级用途）
extensions: {
    hmacCreateSecret: true  // 创建用于对称加密的密钥
}

// 3. PIN 长度查询
extensions: {
    minPinLength: true  // 查询认证器 PIN 长度要求
}

// 4. 组合使用
extensions: {
    appid: "https://example.com/u2f-app-id.json",
    hmacCreateSecret: true
}
```

#### 其他常见扩展（非 TypeScript 定义中的）

| 扩展名      | 方向    | 作用                                                               | 返回                                  | 建议               |
| ----------- | ------- | ------------------------------------------------------------------ | ------------------------------------- | ------------------ |
| `uvm`       | get     | 请求返回 **User Verification Methods**（使用了何种生物识别/PIN）。 | `clientExtensionResults.uvm` 列出方法 | 可用于风控/审计。  |
| `largeBlob` | reg/get | 大对象存储，绑定在凭据上的数据。                                   | `clientExtensionResults.largeBlob`    | 存储小量用户数据。 |
| `prf`       | reg/get | 伪随机函数，基于密钥派生随机值。                                   | `clientExtensionResults.prf`          | 高阶密码学用途。   |

---

## 三、注册（Registration）完整 TypeScript 定义

### 1. `generateRegistrationOptions` 函数签名

```ts
/**
 * 为认证器注册准备传递给 navigator.credentials.create(...) 的值
 */
export declare function generateRegistrationOptions(options: {
  rpName: string; // 必填：用户可见的网站/服务名称
  rpID: string; // 必填：有效域名（https:// 后的部分）
  userName: string; // 必填：用户的网站特定用户名（邮箱等）
  userID?: Uint8Array; // 可选：用户的网站特定唯一ID，默认生成随机标识符
  challenge?: string | Uint8Array; // 可选：认证器需要签名的随机值，默认自动生成
  userDisplayName?: string; // 可选：用户的实际姓名，默认为空字符串
  timeout?: number; // 可选：用户完成证明的时间（毫秒），默认60000
  attestationType?: "direct" | "enterprise" | "none"; // 可选：特定证明声明，默认'none'
  excludeCredentials?: {
    // 可选：用户已注册的认证器，防止重复注册
    id: Base64URLString;
    transports?: AuthenticatorTransportFuture[];
  }[];
  authenticatorSelection?: AuthenticatorSelectionCriteria; // 可选：限制认证器类型的高级条件
  extensions?: AuthenticationExtensionsClientInputs; // 可选：认证器或浏览器应使用的扩展插件
  supportedAlgorithmIDs?: COSEAlgorithmIdentifier[]; // 可选：支持的COSE算法标识符，默认[-8,-7,-257]
  preferredAuthenticatorType?: "securityKey" | "localDevice" | "remoteDevice"; // 可选：鼓励用户注册特定类型认证器
}): Promise<PublicKeyCredentialCreationOptionsJSON>;
```

### 2. 注册相关类型定义

#### 核心接口

```ts
/**
 * 认证器选择条件
 */
export interface AuthenticatorSelectionCriteria {
  authenticatorAttachment?: AuthenticatorAttachment; // 认证器附加方式
  requireResidentKey?: boolean; // 是否需要常驻密钥（已废弃）
  residentKey?: ResidentKeyRequirement; // 常驻密钥要求
  userVerification?: UserVerificationRequirement; // 用户验证要求
}

/**
 * 认证器附加方式
 */
export type AuthenticatorAttachment = "cross-platform" | "platform";

/**
 * 常驻密钥要求
 */
export type ResidentKeyRequirement = "discouraged" | "preferred" | "required";

/**
 * COSE 算法标识符
 */
export type COSEAlgorithmIdentifier = number;

/**
 * 公钥凭据参数，定义支持的算法和类型
 */
export interface PublicKeyCredentialParameters {
  alg: COSEAlgorithmIdentifier; // 算法标识符（如 -7 表示 ES256）
  type: PublicKeyCredentialType; // 凭据类型，通常为 "public-key"
}
```

#### 常用算法标识符说明

| 算法标识符 | 算法名称 | 描述                           | 推荐度     | 兼容性     |
| ---------- | -------- | ------------------------------ | ---------- | ---------- |
| `-7`       | ES256    | ECDSA with SHA-256             | ⭐⭐⭐⭐⭐ | 最广泛支持 |
| `-8`       | EdDSA    | EdDSA signature algorithms     | ⭐⭐⭐⭐   | 现代推荐   |
| `-257`     | RS256    | RSASSA-PKCS1-v1_5 with SHA-256 | ⭐⭐⭐     | 兼容性好   |
| `-35`      | ES384    | ECDSA with SHA-384             | ⭐⭐       | 部分支持   |
| `-36`      | ES512    | ECDSA with SHA-512             | ⭐⭐       | 部分支持   |
| `-258`     | RS384    | RSASSA-PKCS1-v1_5 with SHA-384 | ⭐         | 较少使用   |
| `-259`     | RS512    | RSASSA-PKCS1-v1_5 with SHA-512 | ⭐         | 较少使用   |

**算法选择建议：**

```ts
// 推荐配置：现代 + 兼容
supportedAlgorithmIDs: [-7, -8, -257]; // ES256 + EdDSA + RS256

// 最小配置：仅现代算法
supportedAlgorithmIDs: [-7, -8]; // ES256 + EdDSA

// 兼容性优先：包含更多算法
supportedAlgorithmIDs: [-7, -257, -8, -35]; // ES256 + RS256 + EdDSA + ES384

// 实际的 pubKeyCredParams 结构
pubKeyCredParams: [
  { alg: -7, type: "public-key" }, // ES256
  { alg: -8, type: "public-key" }, // EdDSA
  { alg: -257, type: "public-key" }, // RS256
];

/**
 * 证明传递偏好
 */
export type AttestationConveyancePreference =
  | "direct"
  | "enterprise"
  | "indirect"
  | "none";

/**
 * 证明格式值
 * 参考：https://www.iana.org/assignments/webauthn/webauthn.xhtml#webauthn-attestation-statement-format-ids
 */
export type AttestationFormat =
  | "fido-u2f"
  | "packed"
  | "android-safetynet"
  | "android-key"
  | "tpm"
  | "apple"
  | "none";
```

#### 返回值接口

```ts
/**
 * 适合 JSON 传输的 PublicKeyCredentialCreationOptions 变体
 * https://w3c.github.io/webauthn/#dictdef-publickeycredentialcreationoptionsjson
 */
export interface PublicKeyCredentialCreationOptionsJSON {
  rp: PublicKeyCredentialRpEntity; // Relying Party 信息
  user: PublicKeyCredentialUserEntityJSON; // 用户信息
  challenge: Base64URLString; // 挑战值
  pubKeyCredParams: PublicKeyCredentialParameters[]; // 支持的公钥算法参数
  timeout?: number; // 超时时间
  excludeCredentials?: PublicKeyCredentialDescriptorJSON[]; // 排除的凭据
  authenticatorSelection?: AuthenticatorSelectionCriteria; // 认证器选择条件
  hints?: PublicKeyCredentialHint[]; // 浏览器提示
  attestation?: AttestationConveyancePreference; // 证明偏好
  attestationFormats?: AttestationFormat[]; // 证明格式
  extensions?: AuthenticationExtensionsClientInputs; // 扩展功能
}

/**
 * Relying Party 实体
 */
export interface PublicKeyCredentialRpEntity extends PublicKeyCredentialEntity {
  id?: string; // RP ID
}

export interface PublicKeyCredentialEntity {
  name: string; // 实体名称
}

/**
 * 用户实体 JSON 格式
 * https://w3c.github.io/webauthn/#dictdef-publickeycredentialuserentityjson
 */
export interface PublicKeyCredentialUserEntityJSON {
  id: string; // 用户 ID（Base64URL 编码）
  name: string; // 用户名
  displayName: string; // 显示名称
}
```

### 3. 服务端实现示例

```ts
import { generateRegistrationOptions } from "@simplewebauthn/server";

// 完整的注册选项生成
const createRegistrationOptions = async (user: {
  id: string;
  username: string;
  displayName?: string;
}) => {
  // 获取用户已有凭据（用于排除）
  const existingCredentials = await getUserCredentials(user.id);

  return generateRegistrationOptions({
    rpName: "示例应用",
    rpID: "example.com",
    userName: user.username,
    userID: new TextEncoder().encode(user.id), // 转为 Uint8Array
    userDisplayName: user.displayName || user.username,

    // 算法支持：ES256, EdDSA, RS256
    supportedAlgorithmIDs: [-7, -8, -257],

    // 证明类型：通常使用 none
    attestationType: "none",

    // 认证器选择
    authenticatorSelection: {
      residentKey: "required", // 创建 passkey
      userVerification: "preferred", // 推荐但不强制生物识别
      // authenticatorAttachment 不限制，允许所有类型
    },

    // 排除已有凭据
    excludeCredentials: existingCredentials.map((cred) => ({
      id: cred.credentialId as Base64URLString,
      transports: cred.transports as AuthenticatorTransportFuture[],
    })),

    // 扩展功能
    extensions: {
      credProps: true, // 获取凭据属性信息
    },

    // 超时设置
    timeout: 120_000,

    // 浏览器提示（可选）
    preferredAuthenticatorType: "localDevice", // 鼓励使用本地设备
  });
};
```

### 4. 常见配置模板

#### A. 标准 Passkey 配置

```ts
const passkeyConfig = {
  attestationType: "none" as const,
  supportedAlgorithmIDs: [-7, -257], // ES256 + RS256
  authenticatorSelection: {
    residentKey: "required" as const,
    userVerification: "preferred" as const,
  },
  extensions: { credProps: true },
  timeout: 120_000,
};
```

#### B. 高安全企业配置

```ts
const enterpriseConfig = {
  attestationType: "direct" as const, // 需要设备证明
  supportedAlgorithmIDs: [-7, -8], // ES256 + EdDSA
  authenticatorSelection: {
    residentKey: "required" as const,
    userVerification: "required" as const,
    authenticatorAttachment: "platform" as const, // 限制平台认证器
  },
  extensions: { credProps: true },
  timeout: 60_000,
};
```

#### C. 兼容性优先配置

```ts
const compatibilityConfig = {
  attestationType: "none" as const,
  supportedAlgorithmIDs: [-7, -257, -8], // 广泛算法支持
  authenticatorSelection: {
    residentKey: "preferred" as const, // 不强制 passkey
    userVerification: "preferred" as const,
  },
  extensions: {}, // 最小扩展
  timeout: 180_000, // 更长超时时间
};
```

### 2. 生成登录选项（server）

基于 `generateAuthenticationOptions` 的完整参数配置：

```ts
import { generateAuthenticationOptions } from "@simplewebauthn/server";

// 完整配置示例
const options = await generateAuthenticationOptions({
  rpID: "example.com", // 必填：你的域名
  allowCredentials: [
    // 可选：指定可用凭据（传统登录）
    {
      id: "credential_id_base64url",
      transports: ["internal", "hybrid", "usb"],
    },
  ],
  challenge: "optional-custom-challenge", // 可选：自定义挑战（通常让库生成）
  timeout: 120_000, // 可选：超时时间（毫秒）
  userVerification: "preferred", // 可选：用户验证要求
  extensions: {
    // 可选：扩展功能
    appid: "https://example.com/u2f-app-id.json", // U2F 兼容
  },
});
```

**参数说明：**

- `rpID`: **必填**，必须与注册时一致
- `allowCredentials`: **可选**，传统登录流程中指定用户的凭据列表；Passkey 直登时留空
- `challenge`: **可选**，库会自动生成安全的随机挑战
- `timeout`: **可选**，默认 60000ms，建议 120000ms
- `userVerification`: **可选**，默认 `'preferred'`
- `extensions`: **可选**，按需配置扩展功能

**常见配置模板：**

```ts
// 1. Passkey 直登（推荐）
const passkeyOptions = await generateAuthenticationOptions({
  rpID: "example.com",
  userVerification: "preferred",
  timeout: 120_000,
  // allowCredentials 留空，支持可发现凭据
});

// 2. 传统登录流程（已知用户）
const traditionalOptions = await generateAuthenticationOptions({
  rpID: "example.com",
  allowCredentials: getUserCredentials(userId), // 从数据库获取用户凭据
  userVerification: "preferred",
  timeout: 120_000,
});

// 3. 高安全场景
const secureOptions = await generateAuthenticationOptions({
  rpID: "example.com",
  userVerification: "required", // 强制生物识别
  timeout: 60_000, // 较短超时
  extensions: {
    uvm: true, // 记录验证方法用于审计
  },
});

// 4. U2F 兼容迁移
const u2fCompatOptions = await generateAuthenticationOptions({
  rpID: "example.com",
  allowCredentials: getLegacyU2FCredentials(userId),
  extensions: {
    appid: "https://example.com/u2f-app-id.json",
  },
});
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
// 使用 generateRegistrationOptions
import { generateRegistrationOptions } from '@simplewebauthn/server';

const regOptions = await generateRegistrationOptions({
  rpName: '示例站点',
  rpID: 'example.com',
  userName: 'alice@example.com',
  userID: new TextEncoder().encode('user_123'),  // 转为 Uint8Array
  userDisplayName: 'Alice',
  supportedAlgorithmIDs: [-7, -257],             // ES256 + RS256
  attestationType: 'none',
  authenticatorSelection: {
    residentKey: 'required',
    userVerification: 'preferred'
  },
  extensions: { credProps: true },
  timeout: 120_000
});

// 返回的 options 结构（PublicKeyCredentialCreationOptionsJSON）
{
  rp: { id: "example.com", name: "示例站点" },
  user: {
    id: "dXNlcl8xMjM",           // Base64URL 编码的用户ID
    name: "alice@example.com",
    displayName: "Alice"
  },
  challenge: "auto-generated-challenge",
  pubKeyCredParams: [
    { alg: -7, type: "public-key" },   // ES256
    { alg: -257, type: "public-key" }  // RS256
  ],
  timeout: 120000,
  excludeCredentials: [],  // 如果用户有已存在凭据会填入
  authenticatorSelection: {
    residentKey: "required",
    userVerification: "preferred"
  },
  attestation: "none",
  extensions: { credProps: true }
}
```

**登录 options（服务端生成）**

```ts
// 使用 generateAuthenticationOptions
import { generateAuthenticationOptions } from '@simplewebauthn/server';

const authOptions = await generateAuthenticationOptions({
  rpID: 'example.com',
  userVerification: 'preferred',
  timeout: 120_000
  // allowCredentials 留空以支持 passkey 直登
});

// 返回的 options 结构
{
  challenge: "auto-generated-challenge",
  timeout: 120000,
  rpId: "example.com",
  userVerification: "preferred"
  // allowCredentials 未设置，支持可发现凭据
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

## 七、TypeScript 类型定义与类型安全

### 1. 完整的 TypeScript 接口定义

#### `generateAuthenticationOptions` 函数签名

```ts
/**
 * 为认证器身份验证准备传递给 navigator.credentials.get(...) 的值
 */
export declare function generateAuthenticationOptions(options: {
  rpID: string; // 必填：有效域名（https:// 后的部分）
  allowCredentials?: {
    // 可选：用户之前注册的认证器（如果有的话）
    id: Base64URLString; // 凭据 ID（base64url 编码）
    transports?: AuthenticatorTransportFuture[]; // 传输方式提示
  }[];
  challenge?: string | Uint8Array; // 可选：认证器需要签名的随机值，默认自动生成
  timeout?: number; // 可选：用户完成认证的时间（毫秒），默认 60000
  userVerification?: UserVerificationRequirement; // 可选：用户验证要求，默认 'preferred'
  extensions?: AuthenticationExtensionsClientInputs; // 可选：认证器或浏览器应使用的扩展插件
}): Promise<PublicKeyCredentialRequestOptionsJSON>;
```

#### 核心接口定义

#### `PublicKeyCredentialDescriptorJSON`

```ts
/**
 * 凭据描述符的 JSON 格式
 * https://w3c.github.io/webauthn/#dictdef-publickeycredentialdescriptorjson
 */
export interface PublicKeyCredentialDescriptorJSON {
  id: Base64URLString;
  type: PublicKeyCredentialType;
  transports?: AuthenticatorTransportFuture[];
}
```

#### `AuthenticationExtensionsClientInputs`

```ts
export interface AuthenticationExtensionsClientInputs {
  appid?: string;
  credProps?: boolean;
  hmacCreateSecret?: boolean;
  minPinLength?: boolean;
}
```

#### 返回值：`PublicKeyCredentialRequestOptionsJSON`

```ts
/**
 * PublicKeyCredentialRequestOptions 的 JSON 传输变体
 * 适合传输到浏览器并最终传递给 navigator.credentials.get(...)
 */
export interface PublicKeyCredentialRequestOptionsJSON {
  challenge: Base64URLString;
  timeout?: number;
  rpId?: string;
  allowCredentials?: PublicKeyCredentialDescriptorJSON[];
  userVerification?: UserVerificationRequirement;
  hints?: PublicKeyCredentialHint[];
  extensions?: AuthenticationExtensionsClientInputs;
}
```

### 2. 完整的关键类型定义

#### 基础类型

```ts
/**
 * Base64URL 编码字符串的类型标识
 * 用于明确表示这不是普通字符串，而是 Base64URL 编码的字符串
 */
export type Base64URLString = string;

/**
 * 公钥凭据类型，目前只有一种
 */
export type PublicKeyCredentialType = "public-key";

/**
 * 用户验证要求类型
 */
export type UserVerificationRequirement =
  | "discouraged"
  | "preferred"
  | "required";
```

#### `AuthenticatorTransportFuture`

```ts
/**
 * TypeScript AuthenticatorTransport 的超集，包含对最新传输方式的支持
 * 最终应被 TypeScript 内置类型替代（在 4.6.3 之后的某个版本）
 */
export type AuthenticatorTransportFuture =
  | "ble" // 蓝牙低功耗
  | "cable" // 已废弃，被 hybrid 替代
  | "hybrid" // 混合传输（如 QR 码）
  | "internal" // 平台内置认证器
  | "nfc" // 近场通信
  | "smart-card" // 智能卡
  | "usb"; // USB 连接
```

#### `PublicKeyCredentialHint`

```ts
/**
 * 认证器类别提示，依赖方可以在注册过程中传递给浏览器
 * 浏览器理解这些值可以优化其模态体验，引导用户进入特定的注册流程
 *
 * - `hybrid`: 移动设备上的平台认证器
 * - `security-key`: 便携式 FIDO2 认证器，可通过 USB 或 NFC 在多个设备上使用
 * - `client-device`: 调用 WebAuthn 的设备，通常等同于平台认证器
 *
 * 参考：https://w3c.github.io/webauthn/#enumdef-publickeycredentialhint
 * 这些值比 `authenticatorAttachment` 限制更宽松
 */
export type PublicKeyCredentialHint =
  | "hybrid"
  | "security-key"
  | "client-device";
```

#### `AuthenticationExtensionsClientInputs`

```ts
export interface AuthenticationExtensionsClientInputs {
  appid?: string; // U2F 兼容：指定旧 U2F AppID
  credProps?: boolean; // 凭据属性（通常用于注册）
  hmacCreateSecret?: boolean; // HMAC 密钥创建
  minPinLength?: boolean; // 最小 PIN 长度要求
}
```

### 3. 类型安全的使用示例

#### 基础使用模式

```ts
import {
  generateAuthenticationOptions,
  PublicKeyCredentialRequestOptionsJSON,
  PublicKeyCredentialDescriptorJSON,
  AuthenticatorTransportFuture,
  UserVerificationRequirement,
} from "@simplewebauthn/server";

// 类型安全的配置
const createAuthOptions = async (
  userId?: string
): Promise<PublicKeyCredentialRequestOptionsJSON> => {
  // 基础配置（类型会被自动推断）
  const baseConfig = {
    rpID: "example.com" as const,
    userVerification: "preferred" as UserVerificationRequirement,
    timeout: 120_000,
  };

  // 如果有用户ID，获取其凭据（传统登录流程）
  if (userId) {
    const userCredentials = await getUserCredentials(userId);

    // 构建类型安全的 allowCredentials
    const allowCredentials: PublicKeyCredentialDescriptorJSON[] =
      userCredentials.map((cred) => ({
        id: cred.credentialId as Base64URLString,
        type: "public-key" as const,
        transports: cred.transports as AuthenticatorTransportFuture[],
      }));

    return generateAuthenticationOptions({
      ...baseConfig,
      allowCredentials,
    });
  }

  // Passkey 直登（无需 allowCredentials）
  return generateAuthenticationOptions(baseConfig);
};
```

#### 完整的服务端实现示例

```ts
// 数据库凭据类型定义
interface StoredCredential {
  credentialId: string;
  publicKey: Buffer;
  counter: number;
  transports: string[];
  userId: string;
}

// 类型安全的认证选项生成
class AuthenticationService {
  async generateOptions(
    userId?: string,
    options?: {
      userVerification?: UserVerificationRequirement;
      timeout?: number;
      extensions?: AuthenticationExtensionsClientInputs;
    }
  ): Promise<PublicKeyCredentialRequestOptionsJSON> {
    const config = {
      rpID: process.env.RP_ID!,
      userVerification:
        options?.userVerification ??
        ("preferred" as UserVerificationRequirement),
      timeout: options?.timeout ?? 120_000,
      extensions: options?.extensions,
    };

    // 传统登录：指定用户凭据
    if (userId) {
      const credentials = await this.getUserCredentials(userId);
      const allowCredentials = this.buildAllowCredentials(credentials);

      return generateAuthenticationOptions({
        ...config,
        allowCredentials,
      });
    }

    // Passkey 直登：不限制凭据
    return generateAuthenticationOptions(config);
  }

  private async getUserCredentials(
    userId: string
  ): Promise<StoredCredential[]> {
    // 从数据库获取用户凭据的实现
    return await db.credentials.findMany({ where: { userId } });
  }

  private buildAllowCredentials(
    credentials: StoredCredential[]
  ): PublicKeyCredentialDescriptorJSON[] {
    return credentials.map((cred) => ({
      id: cred.credentialId as Base64URLString,
      type: "public-key" as const,
      transports: this.sanitizeTransports(cred.transports),
    }));
  }

  private sanitizeTransports(
    transports: string[]
  ): AuthenticatorTransportFuture[] {
    const validTransports: AuthenticatorTransportFuture[] = [
      "ble",
      "cable",
      "hybrid",
      "internal",
      "nfc",
      "smart-card",
      "usb",
    ];

    return transports.filter((t): t is AuthenticatorTransportFuture =>
      validTransports.includes(t as AuthenticatorTransportFuture)
    );
  }
}
```

#### 路由处理示例

```ts
// Express.js 路由示例
app.post("/passkeys/login/options", async (req, res) => {
  try {
    const { userId, userVerification, enableU2FCompat } = req.body;

    // 构建扩展配置
    const extensions: AuthenticationExtensionsClientInputs = {};
    if (enableU2FCompat) {
      extensions.appid = "https://example.com/u2f-app-id.json";
    }

    const authService = new AuthenticationService();
    const options = await authService.generateOptions(userId, {
      userVerification: userVerification as UserVerificationRequirement,
      extensions: Object.keys(extensions).length > 0 ? extensions : undefined,
    });

    // 缓存 challenge 用于验证
    await redis.setex(
      `auth_challenge:${options.challenge}`,
      300, // 5分钟过期
      JSON.stringify({ userId, timestamp: Date.now() })
    );

    res.json(options);
  } catch (error) {
    console.error("Generate auth options error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
```

### 4. 完整的数据流示例

#### 服务端 → 前端的类型安全传输

```ts
// 服务端生成的完整 options 示例
const authOptions: PublicKeyCredentialRequestOptionsJSON = {
  challenge: "Y2hhbGxlbmdlLXN0cmluZw", // Base64URL 编码的挑战
  timeout: 120000,
  rpId: "example.com",
  allowCredentials: [
    {
      id: "Y3JlZGVudGlhbC1pZC0x", // Base64URL 编码的凭据 ID
      type: "public-key",
      transports: ["internal", "hybrid", "usb"],
    },
    {
      id: "Y3JlZGVudGlhbC1pZC0y",
      type: "public-key",
      transports: ["internal"],
    },
  ],
  userVerification: "preferred",
  extensions: {
    appid: "https://example.com/u2f-app-id.json",
  },
};
```

#### 前端接收和使用

```ts
// 前端类型定义（与服务端保持一致）
interface AuthenticationOptions {
  challenge: string;
  timeout?: number;
  rpId?: string;
  allowCredentials?: Array<{
    id: string;
    type: string;
    transports?: string[];
  }>;
  userVerification?: string;
  extensions?: {
    appid?: string;
    [key: string]: any;
  };
}

// 前端登录实现
async function authenticateWithPasskey(options: AuthenticationOptions) {
  try {
    // 直接使用服务端返回的 options
    const credential = await navigator.credentials.get({
      publicKey: options,
      mediation: "conditional", // 启用 Conditional UI
    });

    if (!credential) {
      throw new Error("No credential received");
    }

    // 发送到服务端验证
    const response = await fetch("/passkeys/login/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        credential: {
          id: credential.id,
          rawId: arrayBufferToBase64URL(credential.rawId),
          response: {
            authenticatorData: arrayBufferToBase64URL(
              credential.response.authenticatorData
            ),
            clientDataJSON: arrayBufferToBase64URL(
              credential.response.clientDataJSON
            ),
            signature: arrayBufferToBase64URL(credential.response.signature),
            userHandle: credential.response.userHandle
              ? arrayBufferToBase64URL(credential.response.userHandle)
              : null,
          },
          type: credential.type,
        },
      }),
    });

    return await response.json();
  } catch (error) {
    console.error("Authentication failed:", error);
    throw error;
  }
}

// 工具函数：ArrayBuffer 转 Base64URL
function arrayBufferToBase64URL(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}
```

### 5. 常见类型错误与解决

```ts
// ❌ 错误：类型不匹配
const wrongConfig = {
  rpID: "example.com",
  userVerification: "invalid-value", // TypeScript 错误：不在联合类型中
};

// ✅ 正确：使用正确的字面量类型
const correctConfig = {
  rpID: "example.com",
  userVerification: "preferred" as const, // 或直接使用字符串字面量
};

// ❌ 错误：transports 类型不匹配
const wrongTransports = {
  id: "credential-id",
  transports: ["unknown-transport"], // TypeScript 错误
};

// ✅ 正确：使用正确的 transport 类型
const correctTransports = {
  id: "credential-id",
  transports: ["internal", "hybrid"] as AuthenticatorTransportFuture[],
};
```

### 5. 运行时类型检查

```ts
// 验证 transport 类型的工具函数
const isValidTransport = (
  transport: string
): transport is AuthenticatorTransportFuture => {
  return [
    "ble",
    "cable",
    "hybrid",
    "internal",
    "nfc",
    "smart-card",
    "usb",
  ].includes(transport);
};

// 安全地处理来自数据库的 transport 数据
const sanitizeTransports = (
  transports: string[]
): AuthenticatorTransportFuture[] => {
  return transports.filter(isValidTransport);
};

// 在实际使用中
const userCredential = {
  credentialId: "some-id",
  transports: ["internal", "unknown", "usb"], // 可能包含无效值
};

const safeCredential = {
  id: userCredential.credentialId,
  transports: sanitizeTransports(userCredential.transports), // ['internal', 'usb']
};
```

---

## 结语

以上就是 **Passkeys/WebAuthn 配置项的"全景图 + 默认建议"**，现在包含了完整的 TypeScript 类型定义和类型安全指导。

**核心改进**：

- ✅ 基于 `@simplewebauthn/server` v11+ 的实际 TypeScript 定义
- ✅ 完整的 `generateAuthenticationOptions` 参数说明
- ✅ 详细的 `AuthenticatorTransportFuture` 类型支持
- ✅ 类型安全的使用示例和错误处理
- ✅ 运行时类型检查的最佳实践

如果你把这些配置落到当前项目，我可以按你仓库结构给出**类型安全的代码片段**（包含完整的 TypeScript 类型注解），直接对接你现有的 `/passkeys/*` 路由与 Redis/DB。
