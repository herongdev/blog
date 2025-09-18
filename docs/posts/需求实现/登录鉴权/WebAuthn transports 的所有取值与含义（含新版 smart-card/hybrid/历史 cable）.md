---
title: WebAuthn `transports` 的所有取值与含义（含新版 `smart-card` / `hybrid` / 历史 `cable`）
date: 2025-09-16
tags: [WebAuthn, Passkeys, FIDO2]
---

## 概览

`transports` 是**提示性（hint）字段**，告诉浏览器“这枚凭据对应的认证器通常通过什么介质可达”。它来自**注册时**的 `AuthenticatorAttestationResponse.getTransports()`，建议你把返回值存到数据库；**认证时**再放进 `allowCredentials[i].transports`，以便浏览器优先尝试合适的介质。该字段**不是安全校验的一部分**，浏览器可忽略未知值。([MDN Web Docs][1])

---

## 规范定义的取值（WebAuthn Level 3）

> WebAuthn L3 的 `AuthenticatorTransport` 枚举：`"usb" | "nfc" | "ble" | "smart-card" | "hybrid" | "internal"`。([W3C][2])

- **`usb`**
  可移除的 USB 安全密钥（如 YubiKey）。典型用于台式机有线插拔。([W3C][2])

- **`nfc`**
  通过近场通信（NFC）触达的漫游认证器；常见于手机轻触安全钥。([W3C][2])

- **`ble`**
  通过蓝牙低功耗（BLE）连接的漫游认证器。([W3C][2])

- **`smart-card`**
  通过 **接触式智能卡（ISO/IEC 7816）** 的认证器；适配某些企业/政务卡式设备。**这是 L3 新增枚举**。([W3C][2])

- **`hybrid`**
  混合传输：通常指**跨设备认证**（电脑上登录，拿手机确认），由**近距信道 + 云辅助**组合完成；是现代 **passkeys（CDA/caBLE）** 的核心通道。([W3C][2])

- **`internal`**
  平台认证器（设备内置，不可移除），如 Windows Hello、Touch ID、Android 平台密钥。([W3C][2])

> 说明：MDN 的 `getTransports()` 文档同样列举了 `ble / hybrid / internal / nfc / usb`，并建议把注册期获得的数组原样存储并在认证时回填为 `allowCredentials[*].transports`。([MDN Web Docs][1])

---

## 兼容与历史值

- **`cable`（历史/实现细节）**
  早期生态（尤其是 Chrome/DevTools 与部分库）里把“**cloud-assisted BLE**（caBLE）”直接写成 `cable`。在 L3 里正式名称为 **`hybrid`**；若你读取到 `cable`，可以把它**等价视作 `hybrid`**。([chromedevtools.github.io][3])

---

## 实务建议

1. **注册时保存**
   用 `response.getTransports()` 取到数组（如 `["internal"]` 或 `["usb","nfc"]`），**与凭据一起存库**。下次认证时作为 hint 提供，减少用户被动尝试的摩擦。([MDN Web Docs][1])
2. **认证时回填**
   为每个 `allowCredentials[i]` 设置 `transports: storedTransports`。如果做**无用户名/可发现凭据 + Conditional UI**，通常**不传 `allowCredentials`**（因此也没有 `transports`），由浏览器自行发现。([MDN Web Docs][1])
3. **忽略未知值**
   规范要求客户端忽略未知 `transports`，所以**直接存原值**是安全的。([W3C][2])
4. **与“提示（Hints）”配合**
   当你不提供 `allowCredentials`（比如做直登），可用 **PublicKeyCredentialHint**（如 `"security-key" | "client-device" | "hybrid"`）引导 UI，弥补没有 `transports` 的情况。([W3C][2])

---

## 一览速查表

| 取值         | 设备/场景                           | 典型例子                 |
| ------------ | ----------------------------------- | ------------------------ |
| `usb`        | 漫游钥，经 USB 连接                 | YubiKey USB-A/C          |
| `nfc`        | 漫游钥，经 NFC 轻触                 | 手机 NFC 读卡            |
| `ble`        | 漫游钥，经 BLE                      | 蓝牙安全钥               |
| `smart-card` | 接触式智能卡                        | PIV/CAC 卡座             |
| `hybrid`     | **跨设备 passkey**（近距 + 云辅助） | 用手机给电脑“确认登录”   |
| `internal`   | **平台认证器**（不可移除）          | Windows Hello / Touch ID |

（如遇到历史值 `cable`，按 `hybrid` 处理。）([chromedevtools.github.io][3])

如果你愿意，我可以**给出你项目里保存/回填 `transports` 的最小改动片段**（只贴需要改的行，复杂逻辑行会上方加中文注释），并顺手加一条\*\*`cable→hybrid` 兼容映射\*\*。

[1]: https://developer.mozilla.org/en-US/docs/Web/API/AuthenticatorAttestationResponse/getTransports "AuthenticatorAttestationResponse: getTransports() method - Web APIs | MDN"
[2]: https://www.w3.org/TR/webauthn-3/ "Web Authentication: An API for accessing Public Key Credentials - Level 3"
[3]: https://chromedevtools.github.io/devtools-protocol/tot/WebAuthn/?utm_source=chatgpt.com "WebAuthn domain - Chrome DevTools Protocol - GitHub Pages"
