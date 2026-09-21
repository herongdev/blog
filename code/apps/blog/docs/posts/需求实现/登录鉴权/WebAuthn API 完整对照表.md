---
title: WebAuthn API 完整对照表：参数、属性值与作用详解
date: 2025-01-27
tags: [WebAuthn, API, 参数对照, 开发参考]
---

# WebAuthn API 完整对照表

> 本文档提供 WebAuthn/Passkeys 开发中所有 API、参数、属性值的完整对照表，方便开发者快速查找和参考。

## 目录

1. [注册 API 对照表](#注册-api-对照表)
2. [登录 API 对照表](#登录-api-对照表)
3. [类型定义对照表](#类型定义对照表)
4. [错误码对照表](#错误码对照表)
5. [算法标识符对照表](#算法标识符对照表)
6. [传输方式对照表](#传输方式对照表)
7. [扩展功能对照表](#扩展功能对照表)

---

## 注册 API 对照表

### `generateRegistrationOptions()` 参数

| 参数                     | 类型                                   | 必填 | 默认值           | 说明                   | 示例值                            |
| ------------------------ | -------------------------------------- | ---- | ---------------- | ---------------------- | --------------------------------- |
| `rpName`                 | `string`                               | ✅   | -                | 依赖方名称（用户可见） | `"我的应用"`                      |
| `rpID`                   | `string`                               | ✅   | -                | 依赖方 ID（域名）      | `"example.com"`                   |
| `userID`                 | `Uint8Array`                           | ✅   | -                | 用户唯一标识（二进制） | `Buffer.from("user-123", "utf8")` |
| `userName`               | `string`                               | ✅   | -                | 用户名                 | `"user@example.com"`              |
| `userDisplayName`        | `string`                               | ❌   | `""`             | 用户显示名称           | `"张三"`                          |
| `challenge`              | `string \| Uint8Array`                 | ❌   | 自动生成         | 防重放挑战             | `"random-challenge-string"`       |
| `timeout`                | `number`                               | ❌   | `60000`          | 超时时间（毫秒）       | `120000`                          |
| `attestationType`        | `AttestationType`                      | ❌   | `"none"`         | 证明类型               | `"none"`                          |
| `excludeCredentials`     | `CredentialDescriptor[]`               | ❌   | `[]`             | 排除的凭据列表         | `[{id, type, transports}]`        |
| `authenticatorSelection` | `AuthenticatorSelectionCriteria`       | ❌   | `{}`             | 认证器选择条件         | `{residentKey: "required"}`       |
| `extensions`             | `AuthenticationExtensionsClientInputs` | ❌   | `{}`             | 扩展功能配置           | `{credProps: true}`               |
| `supportedAlgorithmIDs`  | `number[]`                             | ❌   | `[-8, -7, -257]` | 支持的算法 ID 列表     | `[-7, -257]`                      |

### `verifyRegistrationResponse()` 参数

| 参数                      | 类型                       | 必填 | 说明               | 示例值                        |
| ------------------------- | -------------------------- | ---- | ------------------ | ----------------------------- |
| `response`                | `RegistrationResponseJSON` | ✅   | 前端返回的注册响应 | `{id, rawId, type, response}` |
| `expectedChallenge`       | `string`                   | ✅   | 期望的挑战值       | `"expected-challenge"`        |
| `expectedOrigin`          | `string`                   | ✅   | 期望的来源         | `"https://example.com"`       |
| `expectedRPID`            | `string`                   | ✅   | 期望的 RP ID       | `"example.com"`               |
| `requireUserVerification` | `boolean`                  | ❌   | 是否要求用户验证   | `true`                        |

### 注册响应结构

| 字段                         | 类型     | 说明                         | 示例值                                        |
| ---------------------------- | -------- | ---------------------------- | --------------------------------------------- |
| `id`                         | `string` | 凭据 ID（字符串形式）        | `"credential-id-string"`                      |
| `rawId`                      | `string` | 凭据 ID（Base64URL 编码）    | `"Y3JlZGVudGlhbC1pZA"`                        |
| `type`                       | `string` | 凭据类型                     | `"public-key"`                                |
| `response.clientDataJSON`    | `string` | 客户端数据（Base64URL 编码） | `"eyJ0eXBlIjoi..."`                           |
| `response.attestationObject` | `string` | 证明对象（Base64URL 编码）   | `"o2NmbXRkbm9uZWdhdHRTdG10oGhhdXRoRGF0YV..."` |

---

## 登录 API 对照表

### `generateAuthenticationOptions()` 参数

| 参数               | 类型                                   | 必填 | 默认值        | 说明             | 示例值                     |
| ------------------ | -------------------------------------- | ---- | ------------- | ---------------- | -------------------------- |
| `rpID`             | `string`                               | ✅   | -             | 依赖方 ID        | `"example.com"`            |
| `allowCredentials` | `CredentialDescriptor[]`               | ❌   | `[]`          | 允许的凭据列表   | `[{id, type, transports}]` |
| `challenge`        | `string \| Uint8Array`                 | ❌   | 自动生成      | 防重放挑战       | `"auth-challenge"`         |
| `timeout`          | `number`                               | ❌   | `60000`       | 超时时间（毫秒） | `120000`                   |
| `userVerification` | `UserVerificationRequirement`          | ❌   | `"preferred"` | 用户验证要求     | `"required"`               |
| `extensions`       | `AuthenticationExtensionsClientInputs` | ❌   | `{}`          | 扩展功能配置     | `{uvm: true}`              |

### `verifyAuthenticationResponse()` 参数

| 参数                      | 类型                         | 必填 | 说明               | 示例值                                         |
| ------------------------- | ---------------------------- | ---- | ------------------ | ---------------------------------------------- |
| `response`                | `AuthenticationResponseJSON` | ✅   | 前端返回的认证响应 | `{id, rawId, type, response}`                  |
| `expectedChallenge`       | `string`                     | ✅   | 期望的挑战值       | `"expected-challenge"`                         |
| `expectedOrigin`          | `string`                     | ✅   | 期望的来源         | `"https://example.com"`                        |
| `expectedRPID`            | `string`                     | ✅   | 期望的 RP ID       | `"example.com"`                                |
| `authenticator`           | `AuthenticatorDevice`        | ✅   | 存储的认证器信息   | `{credentialID, credentialPublicKey, counter}` |
| `requireUserVerification` | `boolean`                    | ❌   | 是否要求用户验证   | `true`                                         |

### 认证响应结构

| 字段                         | 类型             | 说明                         | 示例值                        |
| ---------------------------- | ---------------- | ---------------------------- | ----------------------------- |
| `id`                         | `string`         | 凭据 ID（字符串形式）        | `"credential-id-string"`      |
| `rawId`                      | `string`         | 凭据 ID（Base64URL 编码）    | `"Y3JlZGVudGlhbC1pZA"`        |
| `type`                       | `string`         | 凭据类型                     | `"public-key"`                |
| `response.clientDataJSON`    | `string`         | 客户端数据（Base64URL 编码） | `"eyJ0eXBlIjoi..."`           |
| `response.authenticatorData` | `string`         | 认证器数据（Base64URL 编码） | `"SZYN5YgOjGh0NBcPZHZgW4..."` |
| `response.signature`         | `string`         | 签名（Base64URL 编码）       | `"MEUCIQDx..."`               |
| `response.userHandle`        | `string \| null` | 用户句柄（Base64URL 编码）   | `"dXNlci0xMjM"`               |

---

## 类型定义对照表

### 基础类型

| 类型                          | 说明           | 可选值                                             | 示例           |
| ----------------------------- | -------------- | -------------------------------------------------- | -------------- |
| `AttestationType`             | 证明类型       | `"none"`, `"direct"`, `"indirect"`, `"enterprise"` | `"none"`       |
| `UserVerificationRequirement` | 用户验证要求   | `"required"`, `"preferred"`, `"discouraged"`       | `"preferred"`  |
| `ResidentKeyRequirement`      | 可发现凭据要求 | `"required"`, `"preferred"`, `"discouraged"`       | `"required"`   |
| `AuthenticatorAttachment`     | 认证器附加方式 | `"platform"`, `"cross-platform"`                   | `"platform"`   |
| `PublicKeyCredentialType`     | 公钥凭据类型   | `"public-key"`                                     | `"public-key"` |

### 认证器选择条件

| 字段                      | 类型                          | 说明                         | 示例值        |
| ------------------------- | ----------------------------- | ---------------------------- | ------------- |
| `authenticatorAttachment` | `AuthenticatorAttachment`     | 认证器附加方式               | `"platform"`  |
| `residentKey`             | `ResidentKeyRequirement`      | 可发现凭据要求               | `"required"`  |
| `userVerification`        | `UserVerificationRequirement` | 用户验证要求                 | `"preferred"` |
| `requireResidentKey`      | `boolean`                     | 是否需要可发现凭据（已废弃） | `true`        |

### 凭据描述符

| 字段         | 类型                       | 说明              | 示例值                           |
| ------------ | -------------------------- | ----------------- | -------------------------------- |
| `id`         | `Uint8Array`               | 凭据 ID（二进制） | `Buffer.from("id", "base64url")` |
| `type`       | `PublicKeyCredentialType`  | 凭据类型          | `"public-key"`                   |
| `transports` | `AuthenticatorTransport[]` | 传输方式列表      | `["internal", "hybrid"]`         |

---

## 错误码对照表

### 浏览器错误

| 错误名称            | 说明         | 常见原因                 | 解决方案                   |
| ------------------- | ------------ | ------------------------ | -------------------------- |
| `NotAllowedError`   | 操作不被允许 | 用户取消、超时、策略限制 | 提示用户重试或使用其他方式 |
| `SecurityError`     | 安全错误     | rpID 不匹配、HTTPS 问题  | 检查域名配置和 HTTPS 设置  |
| `NotSupportedError` | 不支持错误   | 浏览器或设备不支持       | 降级到传统认证方式         |
| `InvalidStateError` | 无效状态错误 | 认证器状态异常           | 重新初始化认证器           |
| `ConstraintError`   | 约束错误     | 参数约束不满足           | 检查参数配置               |
| `UnknownError`      | 未知错误     | 其他未分类错误           | 记录日志并降级处理         |

### 服务端验证错误

| 错误类型                 | 说明         | 检查项                  |
| ------------------------ | ------------ | ----------------------- |
| `ChallengeMismatch`      | 挑战值不匹配 | 验证 challenge 是否一致 |
| `OriginMismatch`         | 来源不匹配   | 验证 origin 是否正确    |
| `RPIDMismatch`           | RP ID 不匹配 | 验证 rpId 是否一致      |
| `SignatureInvalid`       | 签名无效     | 验证签名是否正确        |
| `CounterNotIncreased`    | 计数器未递增 | 检查 signCount 是否递增 |
| `UserVerificationFailed` | 用户验证失败 | 检查 UV 标志位          |

---

## 算法标识符对照表

### COSE 算法标识符

| ID     | 算法名称 | 说明               | 推荐度     | 兼容性     |
| ------ | -------- | ------------------ | ---------- | ---------- |
| `-7`   | ES256    | ECDSA w/ SHA-256   | ⭐⭐⭐⭐⭐ | 最广泛支持 |
| `-8`   | EdDSA    | EdDSA 签名算法     | ⭐⭐⭐⭐   | 现代推荐   |
| `-257` | RS256    | RSA w/ SHA-256     | ⭐⭐⭐     | 兼容性好   |
| `-35`  | ES384    | ECDSA w/ SHA-384   | ⭐⭐       | 部分支持   |
| `-36`  | ES512    | ECDSA w/ SHA-512   | ⭐⭐       | 部分支持   |
| `-258` | RS384    | RSA w/ SHA-384     | ⭐         | 较少使用   |
| `-259` | RS512    | RSA w/ SHA-512     | ⭐         | 较少使用   |
| `-38`  | PS256    | RSA-PSS w/ SHA-256 | ⭐⭐       | 现代算法   |
| `-39`  | PS384    | RSA-PSS w/ SHA-384 | ⭐         | 较少使用   |
| `-40`  | PS512    | RSA-PSS w/ SHA-512 | ⭐         | 较少使用   |

### 算法选择建议

| 场景       | 推荐算法         | 说明                      |
| ---------- | ---------------- | ------------------------- |
| 生产环境   | `[-7, -257]`     | ES256 + RS256，兼容性最佳 |
| 现代应用   | `[-7, -8]`       | ES256 + EdDSA，性能最佳   |
| 兼容性优先 | `[-7, -257, -8]` | 包含所有主流算法          |
| 安全优先   | `[-7, -8, -38]`  | 现代算法组合              |

---

## 传输方式对照表

### 认证器传输方式

| 传输方式     | 说明           | 使用场景                         | 示例设备                    |
| ------------ | -------------- | -------------------------------- | --------------------------- |
| `internal`   | 平台内置认证器 | 手机指纹、Face ID、Windows Hello | iPhone、Android、Windows PC |
| `usb`        | USB 连接       | USB 安全钥匙                     | YubiKey、Feitian            |
| `nfc`        | 近场通信       | NFC 安全钥匙                     | NFC YubiKey                 |
| `ble`        | 蓝牙低功耗     | 蓝牙安全钥匙                     | 蓝牙 YubiKey                |
| `hybrid`     | 混合传输       | 跨设备认证                       | 手机扫码登录                |
| `cable`      | 有线传输       | 已废弃，被 hybrid 替代           | -                           |
| `smart-card` | 智能卡         | 企业环境                         | 企业智能卡                  |

### 传输方式选择策略

| 场景     | 推荐传输方式                                  | 说明                 |
| -------- | --------------------------------------------- | -------------------- |
| 移动应用 | `["internal", "hybrid"]`                      | 优先本机，支持跨设备 |
| 桌面应用 | `["internal", "usb", "hybrid"]`               | 支持多种方式         |
| 企业环境 | `["usb", "nfc", "smart-card"]`                | 硬件安全优先         |
| 通用场景 | `["internal", "usb", "nfc", "ble", "hybrid"]` | 最大兼容性           |

---

## 扩展功能对照表

### 注册扩展

| 扩展名         | 类型                | 说明         | 返回值                 | 使用场景           |
| -------------- | ------------------- | ------------ | ---------------------- | ------------------ |
| `credProps`    | `boolean`           | 凭据属性     | `{rk?: boolean}`       | 获取可发现凭据信息 |
| `largeBlob`    | `{support: string}` | 大对象存储   | `{supported: boolean}` | 存储用户数据       |
| `prf`          | `{eval: object}`    | 伪随机函数   | `{enabled: boolean}`   | 密钥派生           |
| `appidExclude` | `string`            | U2F 兼容排除 | `{value: boolean}`     | 历史迁移           |

### 认证扩展

| 扩展名             | 类型      | 说明          | 返回值                        | 使用场景 |
| ------------------ | --------- | ------------- | ----------------------------- | -------- |
| `appid`            | `string`  | U2F 兼容      | `{value: boolean}`            | 历史迁移 |
| `uvm`              | `boolean` | 用户验证方法  | `{uvm: number[][]}`           | 风控审计 |
| `hmacCreateSecret` | `boolean` | HMAC 密钥创建 | `{hmacCreateSecret: boolean}` | 对称加密 |
| `minPinLength`     | `boolean` | 最小 PIN 长度 | `{minPinLength: number}`      | PIN 策略 |

### 扩展配置示例

```typescript
// 注册扩展
const registrationExtensions = {
  credProps: true, // 获取凭据属性
  largeBlob: { support: "preferred" }, // 大对象存储
  prf: { eval: { first: new Uint8Array(32) } }, // 伪随机函数
};

// 认证扩展
const authenticationExtensions = {
  uvm: true, // 用户验证方法
  appid: "https://example.com/u2f-app-id.json", // U2F 兼容
  hmacCreateSecret: true, // HMAC 密钥创建
};
```

---

## 常用配置模板

### 标准 Passkey 配置

```typescript
// 注册配置
const standardRegistration = {
  rpName: "我的应用",
  rpID: "example.com",
  userID: Buffer.from(userId, "utf8"),
  userName: userEmail,
  userDisplayName: userDisplayName,
  supportedAlgorithmIDs: [-7, -257],
  authenticatorSelection: {
    residentKey: "required",
    userVerification: "preferred",
  },
  attestationType: "none",
  extensions: { credProps: true },
  timeout: 120000,
};

// 认证配置
const standardAuthentication = {
  rpID: "example.com",
  userVerification: "preferred",
  timeout: 120000,
  // allowCredentials 留空支持可发现凭据
};
```

### 高安全配置

```typescript
// 高安全注册配置
const secureRegistration = {
  rpName: "企业后台",
  rpID: "admin.example.com",
  userID: Buffer.from(userId, "utf8"),
  userName: userEmail,
  userDisplayName: userDisplayName,
  supportedAlgorithmIDs: [-7, -8],
  authenticatorSelection: {
    residentKey: "required",
    userVerification: "required",
    authenticatorAttachment: "platform",
  },
  attestationType: "direct",
  extensions: { credProps: true },
  timeout: 60000,
};

// 高安全认证配置
const secureAuthentication = {
  rpID: "admin.example.com",
  userVerification: "required",
  timeout: 60000,
  extensions: { uvm: true },
};
```

### 兼容性配置

```typescript
// 兼容性优先配置
const compatibilityRegistration = {
  rpName: "通用应用",
  rpID: "example.com",
  userID: Buffer.from(userId, "utf8"),
  userName: userEmail,
  userDisplayName: userDisplayName,
  supportedAlgorithmIDs: [-7, -257, -8],
  authenticatorSelection: {
    residentKey: "preferred",
    userVerification: "preferred",
  },
  attestationType: "none",
  extensions: { credProps: true },
  timeout: 180000,
};
```

---

## 设备识别对照表

### AAGUID 映射表

| AAGUID                                 | 设备/服务               | 说明                  |
| -------------------------------------- | ----------------------- | --------------------- |
| `ea9b8d66-4d01-1d21-3ce4-b6b48cb575d4` | Google Password Manager | Android 设备          |
| `adce0002-35bc-c60a-648b-0b25f1f05503` | Chrome on Mac           | macOS Chrome          |
| `08987058-cadc-4b81-b6e1-30de50dcbe96` | Windows Hello           | Windows 10/11         |
| `9ddd1817-af5a-4672-a2b9-3e3dd95000a9` | Windows Hello           | Windows 10/11         |
| `6028b017-b1d4-4c02-b4b3-afcdafc96bb2` | Windows Hello           | Windows 10/11         |
| `fbfc3007-154e-4ecc-8c0b-6e020557d7bd` | iCloud Keychain         | iOS/macOS             |
| `00000000-0000-0000-0000-000000000000` | Apple/Unknown           | iOS/macOS（隐私模式） |
| `bada5566-a7aa-401f-bd96-45619a55120d` | 1Password               | 第三方密码管理器      |
| `d548826e-79b4-db40-a3d8-11116f7e8349` | Bitwarden               | 第三方密码管理器      |
| `531126d6-e717-415c-9320-3d9aa6981239` | Dashlane                | 第三方密码管理器      |

### 设备识别函数

```typescript
function identifyDevice(aaguid: string): string {
  const deviceMap: Record<string, string> = {
    "ea9b8d66-4d01-1d21-3ce4-b6b48cb575d4": "Google Password Manager",
    "adce0002-35bc-c60a-648b-0b25f1f05503": "Chrome on Mac",
    "08987058-cadc-4b81-b6e1-30de50dcbe96": "Windows Hello",
    "9ddd1817-af5a-4672-a2b9-3e3dd95000a9": "Windows Hello",
    "6028b017-b1d4-4c02-b4b3-afcdafc96bb2": "Windows Hello",
    "fbfc3007-154e-4ecc-8c0b-6e020557d7bd": "iCloud Keychain",
    "00000000-0000-0000-0000-000000000000": "Apple/Unknown",
    "bada5566-a7aa-401f-bd96-45619a55120d": "1Password",
    "d548826e-79b4-db40-a3d8-11116f7e8349": "Bitwarden",
    "531126d6-e717-415c-9320-3d9aa6981239": "Dashlane",
  };

  return deviceMap[aaguid] || "Unknown Device";
}
```

---

## 总结

本对照表涵盖了 WebAuthn/Passkeys 开发中的主要 API、参数和配置选项。在实际开发中，建议：

1. **根据场景选择合适的配置**：不同应用场景需要不同的安全级别和兼容性要求
2. **实现完整的错误处理**：覆盖所有可能的错误情况，提供用户友好的提示
3. **进行充分的测试**：在不同设备、浏览器和网络环境下测试
4. **监控和优化**：收集性能数据，持续优化用户体验

通过合理使用这些 API 和配置，可以构建安全、便捷的通行密钥认证系统。
