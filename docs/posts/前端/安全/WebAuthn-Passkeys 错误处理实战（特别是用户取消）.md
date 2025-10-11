---
title: WebAuthn/Passkeys 错误处理实战（特别是"用户取消"）
date: 2025-10-11
categories:
  - 前端安全
tags:
  - WebAuthn
  - Passkeys
  - Vue
  - 错误处理
---

## 概述

在实现通行密钥（Passkeys）登录时，**用户取消**是高频场景：用户点了弹窗的关闭、ESC、切换账号后放弃、或条件式 UI 中直接收起。本文用最小必要代码演示如何**区分正常取消**与**真正错误**，避免把取消当异常弹"红色报错"。

---

## 实现思路

1. **能力检测**：无 WebAuthn 能力，直接提示并返回。
2. **构造 `PublicKeyCredentialRequestOptions`**：将后端返回的 challenge/allowCredentials 转为 `ArrayBuffer`。
3. **获取凭据**：`navigator.credentials.get({ publicKey })`。
4. **正确处理结果**：
   - 返回 `null`：条件式 UI/某些实现下代表**已取消**。
   - 抛异常：
     - `NotAllowedError` / `AbortError` / message 含 _aborted/cancel/dismissed/timed out_ → **已取消/超时**（信息级）。
     - `SecurityError` → rpId 与域不匹配（错误级）。
     - 其他异常 → 统一"登录失败"（错误级）。
5. **仅在成功时上送断言**，更新登录态。

---

## 分步实现

### 1️⃣ 能力检测

```ts
// 复杂逻辑：浏览器不支持 WebAuthn，则不进入登录流程
if (!("credentials" in navigator) || !(window as any).PublicKeyCredential) {
  window.GtcNotification("error", "该环境不支持通行密钥");
  return;
}
```

### 2️⃣ 构造请求参数（示例）

```ts
// 复杂逻辑：后端的 base64url 转 ArrayBuffer；本地/生产区分 rpId
const publicKey: PublicKeyCredentialRequestOptions = {
  challenge: b64urlToArrayBuffer(options.challenge),
  rpId: isLocalhost() ? "localhost" : options.rpId, // 防止 SecurityError
  allowCredentials: (options.allowCredentials || []).map((c: any) => ({
    id: b64urlToArrayBuffer(c.id),
    type: (c.type as PublicKeyCredentialType) || "public-key",
    transports: c.transports as AuthenticatorTransport[] | undefined,
  })),
  userVerification:
    (options.userVerification as UserVerificationRequirement) || "preferred",
  timeout: options.timeout ?? undefined,
  extensions: options.extensions as any,
};
```

### 3️⃣ 处理"用户取消"与真正错误

```ts
try {
  // 复杂逻辑：条件式 UI/某些实现下取消会返回 null 而非抛错
  const cred = (await navigator.credentials.get({
    publicKey,
  })) as PublicKeyCredential | null;
  if (!cred) {
    window.GtcNotification("info", "已取消通行密钥登录");
    return;
  }

  const assertion = cred.response as AuthenticatorAssertionResponse;
  // ... 组织上送 payload（略）

  // 复杂逻辑：仅成功时调用后端验证
  const result = await loginByCredential(payload);
  if (!result) throw new Error("登录失败");
  onAuthSuccess(result);
} catch (err: any) {
  // 复杂逻辑：用户主动取消/关闭/超时 —— 视为正常取消而非错误
  if (
    err?.name === "NotAllowedError" ||
    err?.name === "AbortError" ||
    /aborted|dismissed|cancel|timed\s*out/i.test(err?.message || "")
  ) {
    window.GtcNotification("info", "已取消通行密钥登录");
    return;
  }

  // 复杂逻辑：rpId 与当前域不匹配的硬错误
  if (err?.name === "SecurityError") {
    window.GtcNotification(
      "error",
      "rpId 与当前域不匹配：本地请用 rpId=localhost；跨域请配置 /.well-known/webauthn"
    );
    return;
  }

  // 其他错误统一兜底
  window.GtcNotification("error", err?.message || "通行密钥登录失败");
}
```

---

## 最简可复用工具函数

```ts
// 复杂逻辑：统一判定"用户取消/超时"错误
export function isUserCancelWebAuthn(err: unknown): boolean {
  const e = err as any;
  return (
    e?.name === "NotAllowedError" ||
    e?.name === "AbortError" ||
    /aborted|dismissed|cancel|timed\s*out/i.test(e?.message || "")
  );
}
```

> 用法：在 `catch` 里 `if (isUserCancelWebAuthn(err)) { info 提示; return }`。

---

## 错误分类对照表

| 场景                    | 表现                                                                                | 处理级别 | 提示                         |
| ----------------------- | ----------------------------------------------------------------------------------- | -------- | ---------------------------- |
| 用户点击取消/关闭、超时 | `NotAllowedError` / `AbortError` / 信息含 canceled/aborted/timed out；或返回 `null` | info     | "已取消通行密钥登录"         |
| 域名与 rpId 不匹配      | `SecurityError`                                                                     | error    | "rpId 与当前域不匹配…"       |
| 设备不支持              | 能力检测失败                                                                        | error    | "该环境不支持通行密钥"       |
| 其他异常                | 其它错误对象                                                                        | error    | "通行密钥登录失败"或具体信息 |

---

## 跨端与实现差异

- **返回 `null` 与抛错并存**：条件式 UI（Conditional Mediation）或特定浏览器版本可能在取消时**返回 `null`**，务必同时处理"`null` 结果"和"异常"。
- **超时表现**：有的环境抛 `NotAllowedError`，有的 message 仅提示 "timed out"。建议用**正则匹配**兜住。
- **rpId 规范**：本地开发用 `localhost`，生产与后端配置一致；跨子域时需 `.well-known/webauthn`。

---

## 常见坑与规避

1. **把取消当错误红弹**：分类不当，影响体验 → 使用"info 级提示 + 早返回"。
2. **只处理异常，没处理 `null`**：条件式 UI 下会漏判 → 先判 `!cred` 再走 `catch`。
3. **Base64 与 base64url 混用**：断言验签失败 → 全链路统一 **base64url**。
4. **rpId 与域不一致**：`SecurityError` → 开发/生产分别设置；跨域加固定路径。

---

## 调试与观测建议

- 在 `get()` 前后打印关键字段（`rpId/allowCredentials/challenge` 长度）。
- 对 `err.name` 与 `err.message` 打点统计，观察浏览器分布与占比。
- 将"取消/超时"与"真正错误"分别打埋点，优化引导话术与流程转化。

---

## 结语

把"用户取消"当**可预期分支**而非异常，是通行密钥良好体验的关键。
通过**`null` 检测 + 错误名/信息分类**的双保险，既能稳住体验，又能快速定位真正问题。
