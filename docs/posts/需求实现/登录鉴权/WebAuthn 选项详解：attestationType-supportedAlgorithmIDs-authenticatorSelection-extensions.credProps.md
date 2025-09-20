---
title: WebAuthn 选项详解：attestationType / supportedAlgorithmIDs / authenticatorSelection / extensions.credProps
date: 2025-09-19
tags: [WebAuthn, Passkeys, simplewebauthn]
---

## 场景

你在注册时传了这段配置：

```ts
attestationType: 'none',
supportedAlgorithmIDs: [-7], // 仅 ES256；如需 RS256 可再加 -257
authenticatorSelection: {
  residentKey: 'required',
  userVerification: 'preferred',
},
extensions: { credProps: true },
```

下面把**作用**、**可选值**与**含义**逐项讲清楚，并给出常见取值建议。

---

## 1) `attestationType`

**作用**：告诉浏览器/认证器，你希望拿到怎样的"证明这把公钥来自哪个厂商/设备"的**证明材料（Attestation）**。
**可选值**（WebAuthn 标准/`simplewebauthn` 一致）：

| 取值         | 含义                                                     | 典型用途                                    |
| ------------ | -------------------------------------------------------- | ------------------------------------------- |
| `none`       | 不要设备证明，只要公钥即可；最隐私、最通用。             | **推荐**给 B2C/通用站点（不校验设备来源）。 |
| `indirect`   | 由平台挑选匿名化或中介的证明格式，可能给到有限厂商信息。 | 基本很少用。                                |
| `direct`     | 要求直接的设备证明，便于校验厂商证书链。                 | 合规/高安全场景，需维护证书信任。           |
| `enterprise` | 企业专用，可拿到可唯一识别设备的证明。                   | 需要设备可追溯的企业场景；通常需额外资质。  |

> 你的取值：`'none'` → 省心、隐私友好、成功率高。

---

## 2) `supportedAlgorithmIDs`

**作用**：指定**可接受的公钥算法**（COSE 算法 ID 列表）。浏览器会在这些里选一个创建公钥。
**常见取值**（COSE ID → 算法）：

| COSE ID | 算法                                      | 说明                                           |
| ------- | ----------------------------------------- | ---------------------------------------------- |
| `-7`    | **ES256**（ECDSA w/ SHA-256）             | **WebAuthn 强烈推荐/最普及**，跨平台兼容最好。 |
| `-257`  | **RS256**（RSASSA-PKCS1-v1_5 w/ SHA-256） | 一些旧平台/安全钥匙需要；密钥体积更大。        |
| `-8`    | **EdDSA**（常见 Ed25519）                 | 新趋势，部分平台/浏览器逐步支持。              |

> 你的取值：`[-7]` → 仅 ES256。
> **建议**：如需兼容老设备/Windows Hello 某些环境，可改为 `[-7, -257]`；若想前瞻支持，可加 `-8`（视目标平台而定）。

---

## 3) `authenticatorSelection`

**作用**：约束要创建哪种类型的凭据/交互体验。

### 3.1 `residentKey`

是否创建**可发现凭据（Discoverable Credential / "本地居民密钥"）**，也就是通常说的**Passkey**（用户名可省略，靠设备里保存的账户标识来找回）。

| 取值          | 含义                               | 体验影响                                                        |
| ------------- | ---------------------------------- | --------------------------------------------------------------- |
| `required`    | **必须**创建可发现凭据。           | 支持"无用户名登录"、**Conditional UI 一键直登**；占用设备存储。 |
| `preferred`   | **尽量**创建；不行就退回不可发现。 | 成功率高，可能部分用户仍生成不可发现。                          |
| `discouraged` | 不鼓励（通常就创建不可发现凭据）。 | 需要用户名 + 凭据句柄才能登录；非 passkey 体验。                |

> 你的取值：`'required'` → 明确走 **Passkey** 路线（推荐做法）。

### 3.2 `userVerification`

是否要求**用户验证**（UV：指纹/人脸/PIN 等）。

| 取值          | 含义                       | 体验影响                                 |
| ------------- | -------------------------- | ---------------------------------------- |
| `required`    | 必须进行 UV。              | **最安全**，一定会弹 biometrics/PIN。    |
| `preferred`   | 能 UV 就做；没有也可继续。 | **折中**：有生物识别就用，没有也不阻塞。 |
| `discouraged` | 不希望 UV。                | 免打扰，但安全性最低，少见于账号体系。   |

> 你的取值：`'preferred'` → 让支持生物识别的设备走强校验，同时兼顾广泛兼容性。
> **建议**：如果是**高敏/企业后台**，可改为 `'required'`。

---

## 4) `extensions: { credProps: true }`

**作用**：启用 **Credential Properties 扩展**，让返回结果里带上**这把凭据是否为可发现凭据**等属性。
**返回**：通常会得到 `clientExtensionResults.credProps = { rk?: boolean }`，其中：

- `rk: true` → 表示**创建了可发现凭据**（resident key）。
- `rk: false/缺失` → 不是可发现凭据，或平台未返回。

> 你的取值：`credProps: true` → 便于**落库记录**这把凭据是否为 passkey、做后续风控或回显。

---

## 常见组合与建议

- **通用 B2C / 技术社区登录**（首选）

  ```ts
  attestationType: 'none',
  supportedAlgorithmIDs: [-7, -257], // ES256 优先，兼容 RS256
  authenticatorSelection: { residentKey: 'required', userVerification: 'preferred' },
  extensions: { credProps: true }
  ```

  - 目标：高成功率 + Passkey 体验 + 宽兼容。

- **高安全后台/企业管理台**

  ```ts
  attestationType: 'none' | 'direct', // 视合规要求
  supportedAlgorithmIDs: [-7, -257],
  authenticatorSelection: { residentKey: 'required', userVerification: 'required' },
  extensions: { credProps: true }
  ```

  - 目标：强制生物识别；如需设备可追溯再考虑 `direct/enterprise`（谨慎）。

---

## 小结（对应你的现配）

- `attestationType: 'none'`：最省心、最隐私，推荐。
- `supportedAlgorithmIDs: [-7]`：仅 ES256；为兼容面可加 `-257`（RS256），前瞻再加 `-8`（EdDSA）。
- `residentKey: 'required'`：明确走 **Passkey/可发现凭据**，利于**无用户名登录**与**Conditional UI**。
- `userVerification: 'preferred'`：有生物识别就启用，兼顾成功率与体验。
- `credProps: true`：拿到 `rk` 标志，便于你在服务端做记录与策略。
