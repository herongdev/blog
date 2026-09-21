---
title: 「浏览器/平台探测」与 UA 字符串解读（含 UA-CH、WebAuthn 能力探测与实战示例）
date: 2025-09-17
tags: [Web 安全, 前端探测]
---

## 一、整体思路

- **优先用 UA-CH（User-Agent Client Hints）**：更隐私、可控，浏览器逐步**冻结**传统 UA 字符串的细节，官方鼓励迁移到 UA-CH。([WICG][1])
- **UA 兜底**：当 UA-CH 不可用或信息不足，再解析 `navigator.userAgent`。([MDN Web Docs][2])
- **能力优先**：涉及 Passkeys/WebAuthn 时，尽量做“**能力探测**”而不是“品牌猜测”，例如探测平台验证器、条件式 UI 等。([MDN Web Docs][3])

## 二、分步实现

### 步骤 1：读取低熵 UA-CH（无需权限）

```ts
// 复杂逻辑：优先读取 UA-CH 的低熵字段，获取平台与品牌
const uaData = (navigator as any).userAgentData;
const platform = uaData?.platform ?? ""; // 例：'Windows' | 'macOS' | 'Android' | 'iOS' ...
const brands = uaData?.brands ?? []; // 例：[ {brand:'Chromium', version:'140'}, {brand:'Microsoft Edge', version:'140'} ]
```

- `platform`：当前平台名称。
- `brands`：浏览器“品牌”列表（Chromium/Chrome/Edge 等），常用于判断是否 Chromium 家族。
  以上字段由 **NavigatorUAData** 暴露，属于 UA-CH 的“低熵”部分。([MDN Web Docs][4])

### 步骤 2：读取高熵 UA-CH（需显式请求）

```ts
// 复杂逻辑：请求高熵字段，获取更细粒度的版本/架构/模式等
const high = uaData
  ? await uaData.getHighEntropyValues([
      "architecture", // CPU 架构：'x86' | 'arm' ...
      "bitness", // 位宽：'64' | '32'
      "model", // 设备型号（移动端常见）
      "platformVersion", // 平台版本：如 Windows 内核版本
      "uaFullVersion", // 浏览器完整版本号
      "fullVersionList", // 全量 brand+version 列表
      "wow64", // 是否 WOW64 兼容层
    ])
  : {};
```

这些字段由 `NavigatorUAData.getHighEntropyValues()` 一次性返回，便于做平台差异化或下载架构选择（如 32/64 位）。([MDN Web Docs][5])

> 常见用途举例：
>
> - **bitness/architecture**：选择下载 64 位或 32 位安装包。([MDN Web Docs][6])
> - **platformVersion**：区分 **Windows 10 vs 11** 的行为、样式或性能开关。([Microsoft Learn][7])
> - **fullVersionList**：更精确地判断浏览器及其完整版本。([MDN Web Docs][5])

### 步骤 3：UA 字符串兜底解析

```ts
// 复杂逻辑：在 UA-CH 不可用时兜底解析 UA 字符串
const ua = navigator.userAgent; // 传统 UA，需注意已逐步“去细节化”
const isEdge = /\bEdg\/([\d.]+)/.test(ua); // Edge 使用 "Edg/..." 标记
const isChrome = /\bChrome\/([\d.]+)/.test(ua) && !isEdge;
const isSafari = /Safari\/[\d.]+$/.test(ua) && !isChrome && !isEdge;
```

- `Navigator.userAgent` 是传统 UA 字符串，仍可用，但细节可能被“冻结”。([MDN Web Docs][2])
- **Edge** 在 UA 中以 `Edg/<version>` 标记；不要只匹配 `Edge`。([MDN Web Docs][8])

### 步骤 4：WebAuthn/Passkeys 能力探测（推荐）

```ts
// 复杂逻辑：是否存在“平台验证器”（本机指纹/面容/Windows Hello 等）
const uvpaa =
  await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();

// 复杂逻辑：是否支持“条件式 UI”（表单自动填充一键直登）
const canConditional = await(
  PublicKeyCredential as any
).isConditionalMediationAvailable?.();

// 复杂逻辑：未来可用：一次性查询浏览器 WebAuthn 能力集合
const caps = await(PublicKeyCredential as any).getClientCapabilities?.();
```

- `isUserVerifyingPlatformAuthenticatorAvailable()`：探测本机是否有“可用户验证”的平台验证器。([MDN Web Docs][3])
- `isConditionalMediationAvailable()`：探测是否支持 **Conditional UI** 登录体验。([MDN Web Docs][9])
- `getClientCapabilities()`：WebAuthn Level 3 引入的能力查询。([MDN Web Docs][10])

---

## 三、UA-CH 字段一览与用途

| 字段              | 类型/示例                                       | 作用与典型用法                                                     |
| ----------------- | ----------------------------------------------- | ------------------------------------------------------------------ |
| `platform`        | `"Windows"` / `"macOS"` / `"Android"` / `"iOS"` | 粗粒度平台判断（低熵）。([MDN Web Docs][4])                        |
| `brands`          | `[{brand:'Chromium',version:'140'}...]`         | 判断是否基于 Chromium、有哪些品牌标识（低熵）。([MDN Web Docs][4]) |
| `architecture`    | `"x86"` / `"arm"`                               | CPU 架构（高熵，需申请）。([MDN Web Docs][5])                      |
| `bitness`         | `"64"` / `"32"`                                 | 选择 64/32 位资源（高熵）。([MDN Web Docs][6])                     |
| `model`           | `"iPhone"` 等                                   | 设备型号（移动端常见，高熵）。([MDN Web Docs][5])                  |
| `platformVersion` | `"13.0.0"`                                      | Windows 11 等版本区分（高熵）。([Microsoft Learn][7])              |
| `uaFullVersion`   | `"140.0.0.0"`                                   | 浏览器完整版本（高熵）。([MDN Web Docs][5])                        |
| `fullVersionList` | `[{brand:'Chromium',version:'140.0.0.0'}, ...]` | 更精确识别品牌+版本（高熵）。([MDN Web Docs][5])                   |
| `wow64`           | `true/false`                                    | 是否运行在 WOW64 兼容层（高熵）。([MDN Web Docs][5])               |

> 注意：UA-CH 的“高熵”字段需要通过 JS 显式请求或服务端通过 `Accept-CH` 提示，浏览器才会提供。([MDN Web Docs][4])

---

## 四、最简代码示例

> 仅演示关键探测点；复杂逻辑处已在上一行写注释。

```ts
// 复杂逻辑：综合 UA-CH 与 UA，返回 { platform, isChromium, isEdge, isSafari, versions }
export async function detectRuntime() {
  const navAny = navigator as any;
  const uaData = navAny.userAgentData;
  const ua = navigator.userAgent;

  let platform = "";
  let brands: Array<{ brand: string; version: string }> = [];
  let fullVersionList: Array<{ brand: string; version: string }> = [];

  if (uaData) {
    platform = uaData.platform ?? "";
    brands = uaData.brands ?? [];
    try {
      // 复杂逻辑：尽量取到完整版本列表
      const high = await uaData.getHighEntropyValues(["fullVersionList"]);
      fullVersionList = high.fullVersionList ?? [];
    } catch {}
  }

  // 复杂逻辑：判断 Chromium 家族（从 brands 与 UA 双通道）
  const brandsText = brands.map((b) => b.brand).join(" ");
  const isChromium =
    /Chrom(e|ium)|Google Chrome|Microsoft Edge|Opera|OPR|Brave/i.test(
      brandsText
    ) || /\b(Chrome|Chromium|Edg|OPR|Brave)\b/i.test(ua);

  // 复杂逻辑：Edge、Chrome、Safari 的基本判断
  const isEdge = /\bEdg\/[\d.]+/.test(ua);
  const isChrome = /\bChrome\/[\d.]+/.test(ua) && !isEdge;
  const isSafari = /Safari\/[\d.]+$/.test(ua) && !isChrome && !isEdge;

  return {
    platform,
    isChromium,
    isEdge,
    isSafari,
    versions: { brands, fullVersionList },
  };
}

// 复杂逻辑：WebAuthn 能力探测（平台验证器 & 条件式 UI）
export async function detectWebAuthn() {
  const uvpaa =
    await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
  const canConditional = await (
    PublicKeyCredential as any
  ).isConditionalMediationAvailable?.();
  const caps = await (PublicKeyCredential as any)
    .getClientCapabilities?.()
    .catch(() => undefined);
  return { uvpaa, canConditional, caps };
}
```

- UA-CH 的 **fullVersionList** 提供比 UA 更稳的“品牌+完整版本”。([MDN Web Docs][5])
- WebAuthn 的三个静态探测方法可用于决定是否展示 **条件式 UI**、是否允许**平台凭据**登录等。([MDN Web Docs][3])

---

## 五、UA 字符串逐段拆解（实战）

给定 UA：

```
Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36
(KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36 Edg/140.0.0.0
```

逐段含义：

- **`Mozilla/5.0`**：历史兼容标记，表示“与 Mozilla 兼容”。如今几乎所有浏览器都会带上它。([Stack Overflow][11])
- **`(Windows NT 10.0; Win64; x64)`**：平台信息（Windows，内核版本 10.0，64 位）。
- **`AppleWebKit/537.36`**：渲染引擎历史标识（WebKit/Blink 系都常带此段，出于兼容）。([MDN Web Docs][8])
- **`(KHTML, like Gecko)`**：历史说明“像 Gecko 一样”，早期对站点嗅探的兼容产物。
- **`Chrome/140.0.0.0`**：**Chromium/Chrome** 基因的版本号片段。
- **`Safari/537.36`**：同样是历史兼容字段，非真正 Safari 也会带。([MDN Web Docs][8])
- **`Edg/140.0.0.0`**：**Microsoft Edge** 的明确标记（注意是 `Edg/` 而非 `Edge/`）。([MDN Web Docs][8])

> 结论：这串 UA 同时包含 WebKit/Chrome/Safari 的历史兼容片段，**真正决定“它是 Edge”的是结尾的 `Edg/140...`**。这就是你看到“怎么什么都有”的原因：**为了兼容旧站点的 UA 嗅探**，浏览器刻意保留了多段看似“矛盾”的标识。([MDN Web Docs][8])

---

## 六、最佳实践与注意事项

1. **能用 UA-CH 就别靠 UA**：UA 正在“去细节化/冻结”，准确性和可持续性不如 UA-CH。([MDN Web Docs][4])
2. **WebAuthn 以“能力探测”为先**：优先根据 `uvpaa/conditional` 等能力决定登录体验，而非“浏览器品牌”。([MDN Web Docs][3])
3. **确定“供应商/来源”时用 AAGUID**：注册阶段记录 **AAGUID**（如需），比 UA/UA-CH 更可靠。([web.dev][12])

---

## 七、快速参考

- UA-CH 规范与 API：MDN、WICG 文档与 Chrome 指南。([MDN Web Docs][4])
- UA 基础与 Edge 标记：MDN UA 参考、Microsoft 文档。([MDN Web Docs][8])
- WebAuthn 能力：MDN 与 WebAuthn Level 3。([MDN Web Docs][3])

> 有了上述探测与解读框架，你就可以**稳定地拿到平台/浏览器/能力**信息，并在 Passkeys 场景里用“**能力优先**”的策略，提供更一致的登录体验。

[1]: https://wicg.github.io/ua-client-hints/?utm_source=chatgpt.com "User-Agent Client Hints - GitHub Pages"
[2]: https://developer.mozilla.org/en-US/docs/Web/API/Navigator/userAgent?utm_source=chatgpt.com "Navigator: userAgent property - Web APIs - MDN - Mozilla"
[3]: https://developer.mozilla.org/en-US/docs/Web/API/PublicKeyCredential/isUserVerifyingPlatformAuthenticatorAvailable_static?utm_source=chatgpt.com "isUserVerifyingPlatformAuthentic..."
[4]: https://developer.mozilla.org/en-US/docs/Web/API/User-Agent_Client_Hints_API?utm_source=chatgpt.com "User-Agent Client Hints API - Web APIs - MDN - Mozilla"
[5]: https://developer.mozilla.org/en-US/docs/Web/API/NavigatorUAData/getHighEntropyValues?utm_source=chatgpt.com "NavigatorUAData: getHighEntropyValues() method - Web APIs"
[6]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Sec-CH-UA-Bitness?utm_source=chatgpt.com "Sec-CH-UA-Bitness header - HTTP - MDN"
[7]: https://learn.microsoft.com/en-us/microsoft-edge/web-platform/how-to-detect-win11?utm_source=chatgpt.com "Detect Windows 11 and CPU architecture using User ..."
[8]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/User-Agent?utm_source=chatgpt.com "User-Agent header - HTTP - MDN - Mozilla"
[9]: https://developer.mozilla.org/en-US/docs/Web/API/PublicKeyCredential/isConditionalMediationAvailable_static?utm_source=chatgpt.com "isConditionalMediationAvailable() static method - Web APIs"
[10]: https://developer.mozilla.org/en-US/docs/Web/API/PublicKeyCredential?utm_source=chatgpt.com "PublicKeyCredential - Web APIs - MDN"

[11]: https://stackoverflow.com/questions/5125438/why-do-chrome-and-ie-put-mozilla-5-0-in-the-user-agent-they-send-to-the-server?utm_source=chatgpt.com "Why do Chrome and IE put \"Mozilla 5.0\" in the User-Agent ..."
[12]: https://web.dev/articles/webauthn-aaguid?utm_source=chatgpt.com "Determine the passkey provider with AAGUID | Articles"
