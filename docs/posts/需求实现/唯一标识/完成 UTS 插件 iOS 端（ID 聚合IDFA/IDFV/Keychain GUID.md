---
title: 完成 UTS 插件 iOS 端（ID 聚合：IDFA / IDFV / Keychain GUID）
date: 2025-09-15
tags: [UTS, uni-app]
---

## 一、实现思路总览

- **统一导出 API** 与 Android 保持一致：`register`、`setSalt`、`getBestId`、`getIdCodes` 等。
- **原生侧（Swift）提供最小能力**：

  - 读取 **IDFA**（可选触发 ATT 弹窗，未授权/受限返回 `nil`）。
  - 读取 **IDFV**。
  - 生成并**持久化 Keychain GUID**（删除 App 也尽量保留）。
  - 提供 **SHA-256**（用 CommonCrypto）供 UTS 侧做加盐哈希。

- **UTS 侧（app-ios/index.uts）**：

  - 维护 `_consent`、`_salt`、`_strict` 状态。
  - 按策略组合并挑选最佳 ID：

    - `global`：优先 `idfa`（若可用）→ `idfv` → `guid`
    - `cn`：优先 `idfv` → `guid`（不强依赖 IDFA）
    - `strict`：**禁用 `idfa`**，只用 `idfv` / `guid`

  - `exposeRaw` 控制是否返回原始值；默认只返回 `hash`。

## 二、关键原理（调研要点）

- **UTS iOS 插件结构与 Info.plist 合并**：`uni_modules/**/utssdk/app-ios/` 下可放 `Info.plist`、`UTS.entitlements`，打包时合并到原生工程。([en.uniapp.dcloud.io][1])
- **ATT 与 IDFA**：iOS 14.5+ 要先请求 ATT 才能使用 IDFA；未授权时不可访问或为全 0。([Apple Developer][2])
- **IDFV**：同一 vendor 的 App 共享；当**设备上该 vendor 的 App 全部卸载**后重装会变更。([Apple Developer][3])
- **Keychain 持久化**：Keychain 条目通常 **跨重装**保留（用户抹掉数据或系统重置例外，iOS 17+ 删除 App 时可选“连同数据”也会清除）。([Apple Developer][4])
- **iOS 侧 SHA-256 实现**：可用 CommonCrypto（系统库）。([Agnostic Development][5])
- **必须配置** `NSUserTrackingUsageDescription`（ATT 弹窗文案），可在插件 `app-ios/Info.plist` 中提供并合并到宿主。([Apple Developer][2])

---

## 三、需要修改 / 新增的代码

> 只给**变更片段**；复杂逻辑均在上一行加注释。

### 1）原生 Swift：`utssdk/app-ios/DeviceIdNative.swift`

**① 顶部 import 增加：**

```swift
// 复杂逻辑：使用 CommonCrypto 做 SHA-256
import CommonCrypto
```

**② 增加 SHA-256 能力（类内任意位置，建议与其他静态方法放一起）：**

```swift
// 复杂逻辑：原生侧提供 SHA-256，UTS 侧用于加盐哈希
@objc public static func sha256Hex(_ input: String) -> String {
    let data = input.data(using: .utf8) ?? Data()
    var hash = [UInt8](repeating: 0, count: Int(CC_SHA256_DIGEST_LENGTH))
    data.withUnsafeBytes { buf in
        _ = CC_SHA256(buf.baseAddress, CC_LONG(data.count), &hash)
    }
    return hash.map { String(format: "%02x", $0) }.joined()
}
```

**③ 实现 IDFA 读取（补全 `getIDFAOrNull`）：**

```swift
// 复杂逻辑：仅在 requestATT=true 且状态未决定时，同步等待一次 ATT 请求
@objc public static func getIDFAOrNull(_ requestATT: Bool) -> String? {
    if #available(iOS 14, *), requestATT,
       ATTrackingManager.trackingAuthorizationStatus == .notDetermined {
        let sem = DispatchSemaphore(value: 0)
        ATTrackingManager.requestTrackingAuthorization { _ in sem.signal() }
        _ = sem.wait(timeout: .now() + 1.0)
    }
    guard ASIdentifierManager.shared().isAdvertisingTrackingEnabled else { return nil }
    let id = ASIdentifierManager.shared().advertisingIdentifier.uuidString
    // 复杂逻辑：全 0 视为不可用
    let stripped = id.replacingOccurrences(of: "-", with: "").replacingOccurrences(of: "0", with: "")
    return stripped.isEmpty ? nil : id
}
```

**④ 实现 IDFV 读取（补全 `getIDFVOrNull`）：**

```swift
// 复杂逻辑：IDFV 在同 vendor App 全卸载后重装会变化
@objc public static func getIDFVOrNull() -> String? {
    return UIDevice.current.identifierForVendor?.uuidString
}
```

**⑤ Keychain GUID 读写（补全 `getKeychainUUID` + `save`）：**

```swift
// 复杂逻辑：首次生成 UUID 写入 Keychain；跨重装尽量保留
@objc public static func getKeychainUUID() -> String {
    let service = "uts.sdk.modules.idKit"
    let account = "device.guid"
    if let data = read(service: service, account: account),
       let s = String(data: data, encoding: .utf8), !s.isEmpty {
        return s
    }
    let newVal = UUID().uuidString
    _ = save(service: service, account: account, data: Data(newVal.utf8))
    return newVal
}

// 复杂逻辑：若已存在则走 update
@discardableResult
static func save(service: String, account: String, data: Data) -> Bool {
    let query: [String: Any] = [
        kSecClass as String: kSecClassGenericPassword,
        kSecAttrService as String: service,
        kSecAttrAccount as String: account,
        kSecValueData as String: data,
        kSecAttrAccessible as String: kSecAttrAccessibleAfterFirstUnlock
    ]
    let status = SecItemAdd(query as CFDictionary, nil)
    if status == errSecDuplicateItem {
        let find: [String: Any] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrService as String: service,
            kSecAttrAccount as String: account
        ]
        let attrs: [String: Any] = [kSecValueData as String: data]
        return SecItemUpdate(find as CFDictionary, attrs as CFDictionary) == errSecSuccess
    }
    return status == errSecSuccess
}
```

> 说明：你文件里已有 `read(service:account:)`；上述与之配套即可。

---

### 2）UTS：`utssdk/app-ios/index.uts`

**① 扩展原生声明，增加 `sha256Hex`：**

```ts
// 复杂逻辑：调用 Swift 提供的 SHA-256
declare class DeviceIdNative {
  static getIDFAOrNull(requestATT: boolean): string | null;
  static getIDFVOrNull(): string | null;
  static getKeychainUUID(): string;
  static sha256Hex(input: string): string; // ← 新增
}
```

**② 改造 `register`：授权后“预热”一次 ATT（不强制弹窗）：**

```ts
// 复杂逻辑：同意隐私后尝试读取一次 IDFA（仅在未授权时会触发系统弹窗）
export async function register(
  _: UTSJSONObject | null = null
): Promise<UTSJSONObject> {
  _consent = true;
  try {
    DeviceIdNative.getIDFAOrNull(true);
  } catch {}
  return { consent: _consent } as UTSJSONObject;
}
```

**③ 新增/修正构建返回对象的同步方法（统一哈希）：**

```ts
// 复杂逻辑：统一加盐哈希；非 exposeRaw 不返回原文
function buildSync(
  source: string,
  value?: string | null,
  exposeRaw?: boolean = false,
  limited?: boolean | null = null,
  msg?: string | null = null
): IdValue {
  const val = value ?? null;
  const out: any = {
    source,
    available: !!val,
    limited: limited ?? null,
    value: null,
    hash: null,
    message: msg ?? null,
  };
  if (val) {
    const salted = _salt ? `${_salt}:${val}` : val;
    // 复杂逻辑：iOS 侧使用原生 SHA-256，避免 H5-only 的 crypto.subtle 依赖
    out.hash = DeviceIdNative.sha256Hex(salted);
    if (exposeRaw) out.value = val;
  }
  return out as IdValue;
}
```

**④ 在 `getIdCodes` 中完善策略与取值顺序：**

```ts
// 复杂逻辑：根据策略与 include 产出“有效顺序”
const policy = getPolicy();
let include: string[] = (options?.getArray<string>("include") ||
  []) as string[];
if (!include.length)
  include =
    policy === "global"
      ? ["idfa", "idfv", "guid"]
      : policy === "strict"
      ? ["idfv", "guid"]
      : /* cn */ ["idfv", "guid"];

// 复杂逻辑：读取各 ID（严格模式禁用 idfa；未同意时不弹窗）
const exposeRaw = (options?.getBoolean("exposeRaw") || false) as boolean;
const idfa = _strict
  ? null
  : _consent
  ? DeviceIdNative.getIDFAOrNull(false)
  : null;
const idfv = DeviceIdNative.getIDFVOrNull();
const guid = DeviceIdNative.getKeychainUUID();

const res: any = {
  idfa: buildSync(
    "idfa",
    idfa,
    exposeRaw,
    _strict ? true : _consent && !idfa ? true : null
  ),
  idfv: buildSync(
    "idfv",
    idfv,
    exposeRaw,
    null,
    idfv ? null : "no identifierForVendor"
  ),
  guid: buildSync("guid", guid, exposeRaw, null),
};

// 复杂逻辑：按 include 顺序挑第一个 available 作为 best
res.best = null;
for (const k of include) {
  /* @ts-ignore */
  if (res[k]?.available) {
    res.best = k;
    break;
  }
}
return res as IdCodesResult;
```

**⑤ 小增强：保留的严格模式开关（若你已有可忽略）：**

```ts
export function setStrictMode(strict: boolean): void {
  _strict = strict;
}
```

---

### 3）新增插件级 `Info.plist`（合并到宿主）

**路径**：`utssdk/app-ios/Info.plist`

**内容示例**（请按产品文案调整）：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <!-- 复杂逻辑：ATT 弹窗说明，必须提供非空文案 -->
    <key>NSUserTrackingUsageDescription</key>
    <string>为提供更相关的内容与体验，我们希望使用设备广告标识（IDFA）。</string>
  </dict>
</plist>
```

> UTS 插件放在 `app-ios/Info.plist` 会在云打包时**自动合并**到原生工程。([en.uniapp.dcloud.io][1])

---

## 四、使用与测试

1. **初始化（在合适时机，比如隐私协议同意后）**

   ```ts
   await register();
   setSalt("your-secret-salt"); // 建议设置，便于脱敏
   // 可选：开启严格模式（不使用 IDFA）
   // setStrictMode(true)
   ```

2. **获取最优 ID**

   ```ts
   const id = await getBestId({
     prefer: ["idfa", "idfv", "guid"],
     exposeRaw: false,
   } as any);
   // 正常返回：{ source, available: true, hash: '…' }
   ```

3. **校验 ATT 流程**：首次调用后应出现系统弹窗（若设备允许弹窗、且未决定）。([Apple Developer][2])
4. **卸载/重装**：验证 **Keychain GUID** 是否仍在（新系统“连同数据删除”会清除）。([Apple Developer][4])
5. **全卸载 vendor App 后**：观察 **IDFV** 是否变化。([Apple Developer][3])

---

## 五、常见坑位

- **未配置 `NSUserTrackingUsageDescription`**：ATT 请求会被拒或审核警告。([Apple Developer][2])
- **强拉 IDFA**：未授权直接读取会失败（或全 0）。务必在合适的时机触发 ATT。([Firebase][6])
- **仅依赖 IDFV**：业务需长期稳定标识时，建议同时保留 **Keychain GUID** 作为兜底。([Apple Developer][4])
- **哈希位置**：H5 可用 `crypto.subtle`，但原生侧建议走系统实现（本文用 CommonCrypto）。([Agnostic Development][5])

---

## 六、你现在需要做的事（最少步骤）

1. 粘贴上面 **Swift** 与 **UTS** 的变更片段到对应文件。
2. 在 `utssdk/app-ios/` 新增 **Info.plist**（ATT 文案）。
3. 重新云打包 iOS App 进行真机验证。

若你希望我继续：我可以把 **完整 iOS 目录的差异补丁（diff）** 或 **最小可运行 demo** 打包出来，方便你直接替换集成。

[1]: https://en.uniapp.dcloud.io/plugin/uts-for-ios.html?utm_source=chatgpt.com "uts for iOS | uni-app - DCloud"
[2]: https://developer.apple.com/documentation/apptrackingtransparency?utm_source=chatgpt.com "App Tracking Transparency"
[3]: https://developer.apple.com/documentation/uikit/uidevice/identifierforvendor?utm_source=chatgpt.com "identifierForVendor | Apple Developer Documentation"
[4]: https://developer.apple.com/documentation/security/secitemcopymatching%28_%3A_%3A%29?utm_source=chatgpt.com "SecItemCopyMatching(_:_:) | Apple ..."
[5]: https://www.agnosticdev.com/content/how-use-commoncrypto-apis-swift-5?utm_source=chatgpt.com "How to use CommonCrypto APIs in Swift 5"
[6]: https://firebase.google.com/docs/ios/supporting-ios-14?utm_source=chatgpt.com "Supporting iOS 14 | Firebase for Apple platforms - Google"
