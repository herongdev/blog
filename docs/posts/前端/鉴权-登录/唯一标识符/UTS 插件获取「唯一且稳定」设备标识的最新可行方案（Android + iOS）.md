---

title: UTS 插件获取「唯一且稳定」设备标识的最新可行方案（Android + iOS）
date: 2025-09-11
tags:

- UTS插件
- 设备标识
- OAID
- IDFV
- App Set ID
- Keychain

---

## 摘要

不是只能用 `import DeviceIdentifier from "com.github.gzuliyujiang.oaid.DeviceIdentifier"`。在 **Android** 与 **iOS** 上都有多条“合规且相对稳定”的选型路径。下面给出用途导向的选择矩阵、实现要点与 UTS 插件接口建议，并标注风险点与合规注意事项。

---

## 一、用途导向的选择矩阵（建议优先级）

| 用途                                       | Android 推荐                                                          | iOS 推荐                                   | 备注                                                                                                |
| ------------------------------------------ | --------------------------------------------------------------------- | ------------------------------------------ | --------------------------------------------------------------------------------------------------- |
| **广告归因（中国 ROM / 无 GMS）**          | **OAID**（MSA 生态）                                                  | **IDFA**（需 ATT 授权）                    | OAID 为国产厂商统一方案；IDFA 自 iOS 14.5 起需弹窗同意，否则取不到值。([Adjust][1])                 |
| **同一开发者多 App 之间关联、反作弊/频控** | **App Set ID**（开发者作用域）                                        | **IDFV**（同一 Vendor 共享）               | App Set ID 对同一开发者帐号下应用一致；IDFV 对同一 Vendor 的 App 一致。([Android Developers][2])    |
| **单 App 层面的“近永久”稳定标识**          | **App Set ID**（若仅需开发者内一致）或 **本地生成并存储**（清理即失） | **Keychain 持久化 UUID（ThisDeviceOnly）** | iOS Keychain 通常在卸载重装后仍可读（用户选择“删除我的数据”或抹掉设备除外）。([Apple Developer][3]) |
| **历史兼容 / 设备级信号**                  | `ANDROID_ID`（受作用域与重置影响）                                    | 无（不建议做设备指纹）                     | Android 8.0 起 `ANDROID_ID` 改为“每 App 签名键 + 用户 + 设备”作用域。([Android Developers][4])      |

> 合规红线：**避免设备指纹**与不可重置的跨 App 追踪；ATT/隐私清单要到位；Google/Apple 对“持久 ID、指纹化”有明确限制/指引。([Google 帮助][5])

---

## 二、Android 方案详解

### 2.1 OAID（国内主流、广告归因场景）

- 适用：无 GMS 的国产设备市场；广告/归因。
- 接入：可用 **gzu-liyujiang/Android_CN_OAID** 封装（你提到的 `DeviceIdentifier` 即来自此库），支持多家厂商与 AAID/OAID 统一封装。([GitHub][6])
- 风险：不同 ROM 适配差异、厂商服务可用性偶发问题，需兜底。([GitHub][7])

### 2.2 App Set ID（Google Play 服务）

- 适用：**同一开发者**名下多 App 的关联分析、反作弊、频控；**可跨重装**直到该开发者的所有 App 都卸载/设备重置。
- 特性：作用域为“开发者账号”或“App”；由 Google Play 服务提供，**可重置**但稳定。([Android Developers][2])

### 2.3 ANDROID_ID（SSAID）

- 适用：单 App 级别识别；**不建议**用于跨 App 追踪。
- 变更：Android 8.0 起 **按 App 签名键 + 用户 + 设备**唯一，非跨 App。([Android Developers][4])

### 2.4 Advertising ID（GAID/AAID）

- 适用：广告生态；Android 12 起用户“限制个性化广告”会**直接清零**该 ID。([Google for Developers][8])

---

## 三、iOS 方案详解

### 3.1 IDFA（Identifier for Advertisers）

- 适用：广告/归因。
- 要求：iOS 14.5+ 必须走 **AppTrackingTransparency** 授权；未授权通常返回全零。([Apple Developer][9])

### 3.2 IDFV（Identifier for Vendor）

- 适用：同一公司（Vendor）多 App 之间统一标识；对单设备+同 Vendor 稳定。
- 官方定义：**“唯一标识某设备对该供应商的标识符”**。([Apple Developer][10])

### 3.3 Keychain 持久化 UUID

- 适用：单 App 的“近永久”设备标识（**不跨 App**）。
- 做法：首次生成 UUID，写入 Keychain（`ThisDeviceOnly`），重装后通常仍可读；若用户在删除时选择**同时删除数据**或抹掉设备/重置 Keychain，则会丢失。([Apple Developer][3])

### 3.4 DeviceCheck / App Attest（服务器侧“设备已见过”证明）

- 特性：**不直接给出设备 ID**，而是提供设备级令牌与**2 个可持久位**存储（设备+开发者作用域），适合“是否已领取过活动”等场景。([Apple Developer][11])

---

## 四、UTS 插件接口与兜底策略（跨平台统一）

### 4.1 建议的跨端 API（interface.uts）

```ts
// 复杂逻辑：根据 scope 不同，分别走 OAID/IDFA、AppSetID/IDFV、或本地/服务器证明
export type IdScope =
  | "ads"
  | "devAccount"
  | "vendor"
  | "appInstall"
  | "deviceCheck";

export interface GetIdOptions {
  scope: IdScope; // 业务用途
  requestATT?: boolean; // iOS 是否弹窗请求 IDFA
}

export interface GetIdResult {
  id: string; // 返回的标识
  source: string; // 'OAID' | 'GAID' | 'APP_SET_ID' | 'ANDROID_ID' | 'IDFA' | 'IDFV' | 'KEYCHAIN_UUID' | 'DEVICECHECK'
  resettable: boolean; // 是否可被用户或系统重置
}

export function getDeviceId(opts: GetIdOptions): Promise<GetIdResult>;
```

### 4.2 Android 端实现要点（index.uts 片段）

```ts
// 复杂逻辑：Android 侧优先顺序按用途选择并兜底
// ads -> OAID -> GAID(可能清零) -> APP_SET_ID -> ANDROID_ID(哈希)
// devAccount -> APP_SET_ID -> ANDROID_ID(哈希)
// appInstall -> 本地生成并持久化(卸载即失)

// 仅展示关键调用点（依赖在 config.json 声明）
import DeviceIdentifier from "com.github.gzuliyujiang.oaid.DeviceIdentifier"; // OAID
// App Set ID 通过 com.google.android.gms:play-services-appset

async function getAndroidIdByScope(scope: IdScope): Promise<GetIdResult> {
  if (scope === "ads") {
    // 复杂逻辑：优先 OAID，不可用再尝试 GAID，再兜底
    const oaid = DeviceIdentifier.getOAID(/* context */);
    if (oaid) return { id: oaid, source: "OAID", resettable: true };
    const gaid = await getAdvertisingIdOrNull();
    if (gaid) return { id: gaid, source: "GAID", resettable: true };
  }
  if (scope === "devAccount" || scope === "ads") {
    const appSetId = await getAppSetIdOrNull();
    if (appSetId)
      return { id: appSetId, source: "APP_SET_ID", resettable: true };
  }
  // 最后兜底（不建议跨 App 使用）
  const ssaid = await getAndroidIdHashed();
  return { id: ssaid, source: "ANDROID_ID", resettable: false };
}
```

**`config.json`（Android 依赖声明片段）**

```json
{
  "dependencies": {
    "maven": {
      "repositories": ["https://jitpack.io", "https://maven.google.com"],
      "dependencies": [
        "com.github.gzu-liyujiang:Android_CN_OAID:4.2.8",
        "com.google.android.gms:play-services-appset:16.0.2"
      ]
    }
  }
}
```

> 说明：`Android_CN_OAID` 负责对接厂商 OAID；`play-services-appset` 提供 App Set ID。GAID 需要 `com.google.android.gms.permission.AD_ID`（Android 13 起如需）并处理“清零”场景。([gzu-liyujiang.github.io][12])

### 4.3 iOS 端实现要点（index.uts 片段）

```ts
// 复杂逻辑：iOS 侧按用途选择
// ads -> (可选弹窗) ATT -> 取 IDFA；未授权则降级
// devAccount/vendor -> IDFV
// appInstall -> Keychain UUID

import {
  requestTrackingAuthorizationIfNeeded,
  getIDFAOrNull,
} from "./att-idfa";
import { getOrCreateKeychainUUID } from "./keychain-uuid";

async function getIOSIdByScope(
  scope: IdScope,
  requestATT?: boolean
): Promise<GetIdResult> {
  if (scope === "ads") {
    if (requestATT) await requestTrackingAuthorizationIfNeeded();
    const idfa = getIDFAOrNull();
    if (idfa) return { id: idfa, source: "IDFA", resettable: true };
  }
  if (scope === "vendor" || scope === "devAccount") {
    const idfv = UIDevice.current.identifierForVendor?.UUIDString();
    if (idfv) return { id: idfv, source: "IDFV", resettable: true };
  }
  // 单 App 持久
  const uuid = getOrCreateKeychainUUID();
  return { id: uuid, source: "KEYCHAIN_UUID", resettable: false };
}
```

**iOS 依赖与权限要点**

- `AdSupport.framework` 与 `AppTrackingTransparency.framework`（若取 IDFA）。([Apple Developer][9])
- Keychain 仅存 **ThisDeviceOnly**，避免 iCloud 同步；可选设置 Access Group 以多 App 共享（同 Team）。([Apple Developer][13])

---

## 五、是否“只能用 OAID 这个包”？

**不是。**OAID 只是 **广告归因/国产 ROM** 的**首选**之一；不同用途存在更优或更稳的方案（如 Android 的 **App Set ID**、iOS 的 **IDFV/Keychain UUID**）。你的 UTS 插件应按**用途路由**，并为异常环境提供**多级兜底**。([Android Developers][2])

---

## 六、合规与上线风险清单（强烈建议遵守）

1. **禁止设备指纹化**：不要将多种硬件/系统信号融合成不可重置的跨 App ID。([Google 帮助][5])
2. **最小化收集**：按用途选择最小必要 ID（广告用 OAID/IDFA；开发者关联用 App Set ID/IDFV）。([Android Developers][14])
3. **弹窗与披露**：iOS 取 IDFA 必须 ATT；隐私政策须披露用途、可重置性与退出方式。([Apple Developer][9])
4. **灰度与兜底**：准备好“取不到/被清零”的分支逻辑（GAID 被清零、OAID 获取失败等）。([Google for Developers][8])

---

## 七、常见问答

- **Q：希望“卸载重装后仍稳定”，选哪个？**
  Android：优先 **App Set ID**（以开发者为作用域）。iOS：**Keychain UUID**（用户选择“删除数据”或抹除设备时会失效）。([Android Developers][2])
- **Q：国产 ROM 没有 GMS 怎么办？**
  用 **OAID**，并准备 GAID/APP_SET_ID 不可用时的兜底。([Adjust][1])

---

## 八、小结（落地建议）

1. **先定用途**（ads / devAccount / vendor / appInstall / deviceCheck）。
2. **按用途路由**到 OAID/IDFA、App Set ID/IDFV、或 Keychain UUID。
3. **准备兜底**与“清零/不可用”分支。
4. **严格合规**，避免设备指纹与越权采集。

如果你愿意，我可以基于以上方案直接给你**UTS 插件的骨架与最小可运行代码**（Android/iOS 各一份），并按你的项目结构落地到 `interface.uts / app-android/index.uts / app-ios/index.uts`。

[1]: https://dev.adjust.com/en/sdk/android/plugins/oaid-plugin/?utm_source=chatgpt.com "OAID"
[2]: https://developer.android.com/identity/app-set-id?utm_source=chatgpt.com "Identify developer-owned apps | Identity"
[3]: https://developer.apple.com/documentation/security/keychain-services?utm_source=chatgpt.com "Keychain services | Apple Developer Documentation"
[4]: https://developer.android.com/about/versions/oreo/android-8.0-changes?utm_source=chatgpt.com "Android 8.0 Behavior Changes"
[5]: https://support.google.com/googleplay/android-developer/answer/16543315?hl=en&utm_source=chatgpt.com "Developer Program Policy - Play Console Help"
[6]: https://github.com/gzu-liyujiang/Android_CN_OAID?utm_source=chatgpt.com "gzu-liyujiang/Android_CN_OAID: 安卓设备唯一标识解决 ..."
[7]: https://github.com/gzu-liyujiang/Android_CN_OAID/issues/85?utm_source=chatgpt.com "急！线上大面积华为，荣耀用户突遇 ..."
[8]: https://developers.google.com/ad-manager/dynamic-ad-insertion/sdk/android/android-12?utm_source=chatgpt.com "Review Android version requirements | IMA DAI SDK ..."
[9]: https://developer.apple.com/app-store/user-privacy-and-data-use/?utm_source=chatgpt.com "User Privacy and Data Use - App Store"
[10]: https://developer.apple.com/documentation/uikit/uidevice/identifierforvendor?utm_source=chatgpt.com "identifierForVendor | Apple Developer Documentation"
[11]: https://developer.apple.com/documentation/devicecheck?utm_source=chatgpt.com "DeviceCheck | Apple Developer Documentation"
[12]: https://gzu-liyujiang.github.io/Android_CN_OAID/?utm_source=chatgpt.com ":library"
[13]: https://developer.apple.com/documentation/security/sharing-access-to-keychain-items-among-a-collection-of-apps?utm_source=chatgpt.com "Sharing access to keychain items among a collection of apps"
[14]: https://developer.android.com/identity/user-data-ids?utm_source=chatgpt.com "Best practices for unique identifiers | Identity"
