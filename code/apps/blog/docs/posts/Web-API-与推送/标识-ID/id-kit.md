---
title: id-kit
date: 2025-09-07 12:35:03
tags:
---

棒～这个方向很实用。按你的节奏来：**先取名 → 再讲实现思路 → 之后我们再一步步落地**。

---

## 先取个名字（我给你几个风格不同的备选）

**强推：`UniIdKit`（中文：一体设备 ID 工具包）**

- 简洁、易记、和 uni-app 生态贴合（Uni 前缀）。
- “Kit” 体现工具集合的定位（OAID/AAID/AndroidID/GUID…聚合）。

其它好选项（任选其一也行）：

- `UniDeviceID`（直白、上手即懂）
- `IdFusion` / 中文：ID 融合（强调多源融合）
- `OmniIdKit` / 中文：全域 ID 工具包（强调覆盖广泛）
- `SignalID` / 中文：设备信标（更“概念化”，偏品牌感）

> 没有特别诉求的话，我后续以 **`UniIdKit`** 为默认名继续讲实现与代码。

---

## 实现思路（先把“大图”画清楚）

### 1) 目标与边界

- **平台覆盖**：Android（App-Plus 原生）、iOS（可选：IDFV）、H5（本地持久 GUID）。
- **能力聚合**：OAID、AAID、AndroidID、（可选）IMEI/MEID、WidevineID、PseudoID、GUID。
- **合规优先**：

  - 默认**不采集强隐私**（如 IMEI），需**显式同意**与**动态权限**才允许。
  - 提供**哈希化输出**（SHA-256）选项，避免直传原始标识。
  - 尊重系统/用户“广告追踪限制”（AAID/OAID 可能返回空或受限标志）。

### 2) 能力分层（便于维护与扩展）

```
UniIdKit（JS/TS 封装与 API ）
 ├─ ConsentManager（隐私同意、选项管理、状态缓存）
 ├─ CacheLayer（本地缓存：uni.storage / iOS Keychain / Android MMKV）
 ├─ Aggregator（聚合各 Adapter 的结果、去重、优先级策略、哈希化）
 └─ Adapters
     ├─ Android:
     │   ├─ OAIDAdapter（MSA SDK）
     │   ├─ AAIDAdapter（Google Play 服务）
     │   ├─ AndroidIdAdapter（SSAID）
     │   ├─ WidevineIdAdapter（DRM ID，有些机型/ROM可能不可用）
     │   ├─ PseudoIdAdapter（Build 信息拼接的伪 ID，稳定性一般）
     │   └─ IMEI/MEIDAdapter（需权限；默认关闭）
     ├─ iOS:
     │   └─ IDFVAdapter（IdentifierForVendor）
     └─ H5:
         └─ GuidAdapter（首访生成 UUID，localStorage/IndexedDB/Cookie 持久化）
```

### 3) API 设计（兼容回调，也提供 Promise 风格）

与 Ba-IdCode 的 API 兼容，但**统一返回结构**、并补充 Promise 版本：

- `register(options?)`：完成 SDK 初始化/权限请求/合规弹窗接入（**只有用户同意后才能继续**）。
- `getIdCodes(options?)`：一次性返回所有可用标识（含哈希/明文二选一），并标出可用性/限制信息。
- `getOAID()` / `getAAID()` / `getAndroidId()` / `getGuid()`：单项拉取。
- `getBestId(options?)`：按优先级策略返回“一个最合适的设备标识”（例如：`OAID > AAID > AndroidID > IDFV > GUID`）。
- `setSalt(salt: string)`：设置服务端协商的哈希盐（建议）；前端仅输出 hash 以降低风险。

**统一返回结构（示例）**：

```ts
type IdValue = {
  value?: string; // 原始值（默认可关闭）
  hash?: string; // SHA-256(value + salt) 的十六进制
  available: boolean; // 是否成功获取
  limited?: boolean; // 是否受限制（如关闭广告标识、受 ROM 策略限制）
  source?: string; // 具体来源：oaid/aaid/androidId/idfv/guid/...
  message?: string; // 失败/限制说明
};

type IdCodesResult = {
  oaid?: IdValue;
  aaid?: IdValue;
  androidId?: IdValue;
  idfv?: IdValue; // iOS
  widevineId?: IdValue;
  pseudoId?: IdValue;
  imei?: IdValue; // 默认不返回，需开启 & 权限通过
  guid?: IdValue; // H5/兜底
  ts: number; // 时间戳
  consent: boolean; // 是否已取得用户隐私同意
};
```

**调用风格**：

```ts
// 回调
idKit.getIdCodes((res) => {
  /* ... */
});

// Promise（推荐）
const res = await UniIdKit.getIdCodes({
  hashOnly: true,
  include: ["oaid", "aaid", "androidId", "guid"],
});
```

### 4) 平台实现要点

- **Android**：

  - OAID：集成 **MSA (移动安全联盟) SDK** 或厂商合规通道（插件市场常用做法）。
  - AAID：Google Play 服务 `AdvertisingIdClient`（需处理“限制广告跟踪”返回）。
  - AndroidID：`Settings.Secure.ANDROID_ID`。
  - IMEI/MEID：`READ_PHONE_STATE` 动态权限 + Play 政策；**默认关闭**、强提醒不建议依赖。
  - 缓存：优先使用 MMKV/SharedPreferences，配合有效期（如 24 小时）避免频繁拉取。

- **iOS**：

  - IDFV：`UIDevice.current.identifierForVendor`；卸载所有同一 Vendor 应用后可能变。
  - 不建议用 IDFA（需要 ATT 授权且涉广告用途，与你目标不匹配）。

- **H5**：

  - 生成 `uuid`，持久化在 `localStorage` + `cookie` 双存；被清理会变，属于“弱设备 ID”。
  - 返回 `guid` 字段；可选加“服务端长 Cookie dvc=xxx”作为辅助。

### 5) 合规与配置

- 插件默认只返回 **hash**；要返回原值需显式 `exposeRaw: true`。
- 提供 `register()` 用于展示你的隐私弹窗（或与现有弹窗 SDK 对接），**未同意**则所有采集接口返回 `available=false`。
- 允许配置 `include/exclude` 字段（避免不必要的请求/权限）。
- 提供 `fallback: 'guid' | 'none'` 选项控制 H5 的兜底行为。

---

## 3) 先给你一份可直接用的 JS 封装（跨端 & 可渐进增强）

> 先从 JS 层开始（不依赖原生插件也可工作），App 端等你绑定好原生插件后，再把 `native` 分支接上即可。

```ts
// src/utils/uni-id-kit.ts  —— 先做纯JS壳子，后续接原生
function uuid4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

async function sha256Hex(msg: string): Promise<string> {
  if (typeof window !== "undefined" && window.crypto?.subtle) {
    const enc = new TextEncoder().encode(msg);
    const buf = await window.crypto.subtle.digest("SHA-256", enc);
    return Array.from(new Uint8Array(buf))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }
  // 非 H5（App 小程序）用简易实现或交给原生
  // 这里先用最简单的占位：直接返回 msg（上线前请接真 SHA-256，如 plus.crypto / 原生）
  return msg;
}

type GetIdOptions = {
  include?: Array<
    | "oaid"
    | "aaid"
    | "androidId"
    | "idfv"
    | "widevineId"
    | "pseudoId"
    | "imei"
    | "guid"
  >;
  exposeRaw?: boolean; // 默认 false，默认仅返回 hash
  salt?: string; // 建议传服务端下发的盐
  fallback?: "guid" | "none";
  ttlMs?: number; // 缓存有效期，默认 1 天
};

let _consent = false;
let _salt = "";
let _cache: { ts: number; data: any } | null = null;

export const UniIdKit = {
  setSalt(salt: string) {
    _salt = salt || "";
  },

  async register(): Promise<{ consent: boolean }> {
    // TODO: 这里接你的隐私弹窗或第三方隐私 SDK
    _consent = true; // 演示先直接同意
    return { consent: _consent };
  },

  async getIdCodes(opts: GetIdOptions = {}) {
    const include = opts.include || [
      "oaid",
      "aaid",
      "androidId",
      "idfv",
      "guid",
    ]; // 先常用
    const ttl = opts.ttlMs ?? 24 * 3600 * 1000;

    // 简单缓存
    if (_cache && Date.now() - _cache.ts < ttl) {
      return _cache.data;
    }

    const data: any = { ts: Date.now(), consent: _consent };

    // App 原生插件（占位），后续把 requireNativePlugin 接上
    let native: any = null;
    try {
      // @ts-ignore
      native = uni.requireNativePlugin && uni.requireNativePlugin("Uni-IdKit");
    } catch {}

    // 工具：组装返回（含 hash）
    const build = async (
      source: string,
      value?: string,
      limited?: boolean,
      msg?: string
    ) => {
      const available = !!value;
      const raw = opts.exposeRaw ? value : undefined;
      const hash = value ? await sha256Hex(value + (_salt || "")) : undefined;
      return { value: raw, hash, available, limited, source, message: msg };
    };

    // Android / iOS / H5 分支（先写 H5 + 纯 JS 兜底，原生等你接上）
    const isH5 =
      typeof window !== "undefined" && typeof document !== "undefined";

    // OAID / AAID / AndroidID / IDFV —— 占位：若未接原生，返回不可用
    if (include.includes("oaid"))
      data.oaid = await build(
        "oaid",
        native?.getOAID ? await native.getOAID() : undefined
      );
    if (include.includes("aaid"))
      data.aaid = await build(
        "aaid",
        native?.getAAID ? await native.getAAID() : undefined
      );
    if (include.includes("androidId"))
      data.androidId = await build(
        "androidId",
        native?.getAndroidID ? await native.getAndroidID() : undefined
      );
    if (include.includes("idfv"))
      data.idfv = await build(
        "idfv",
        native?.getIDFV ? await native.getIDFV() : undefined
      );
    if (include.includes("widevineId"))
      data.widevineId = await build(
        "widevineId",
        native?.getWidevineID ? await native.getWidevineID() : undefined
      );
    if (include.includes("pseudoId"))
      data.pseudoId = await build(
        "pseudoId",
        native?.getPseudoID ? await native.getPseudoID() : undefined
      );
    if (include.includes("imei"))
      data.imei = await build(
        "imei",
        native?.getIMEI ? await native.getIMEI() : undefined
      );

    // H5 / 兜底 GUID
    if (include.includes("guid")) {
      let guid = uni.getStorageSync("UNI_ID_KIT_GUID");
      if (!guid) {
        guid = `web:${uuid4()}`;
        uni.setStorageSync("UNI_ID_KIT_GUID", guid);
      }
      data.guid = await build("guid", guid);
    }

    // 如果要求有“最佳 ID”
    data.best = (() => {
      const order = ["oaid", "aaid", "androidId", "idfv", "guid"];
      for (const k of order) {
        if (data[k]?.available) return k;
      }
      return null;
    })();

    _cache = { ts: Date.now(), data };
    return data;
  },

  async getBestId(opts: GetIdOptions = {}) {
    const res = await this.getIdCodes(opts);
    const key = res.best;
    return key ? res[key] : { available: false, source: "none" };
  },
};
```

> 这份 JS 壳子**现在就能在 H5 返回一个稳定的 GUID**；等你把 Android/iOS 原生侧接上 `Uni-IdKit` 插件，就能自动获得 OAID/AAID/AndroidID/IDFV 等真实值，API 不变。

---

## 下一步怎么干？

1. **确定名字**（默认我用 `UniIdKit` 继续）。
2. 我给你 **Android 原生插件最小实现骨架（Kotlin）**：

   - 暴露 `getOAID/getAAID/getAndroidID/...` 方法；
   - 可先不接 MSA/AAID，返回占位，跑通桥接；
   - 再逐个接入 MSA SDK、Google Play Advertising ID。

3. 同步给 **iOS 原生插件（Swift）** 获取 IDFV；
4. 最后在你的登录流程里，把 `const dvc = await UniIdKit.getBestId({ hashOnly: true })` 接上，作为 `x-device-id` 传后端。

要不要我直接开始贴 **Android 插件骨架（可云打包）**？你点个头我就开写。

太好了，我们就按 **UTS 插件**来落地。下面我先给出**项目结构 & API 设计（最佳实践版）**，然后直接给你**可运行的首版代码骨架**（先支持 Web；Android 提供可运行的基础实现 + OAID/AAID 预留点），后续你把 MSA/GP 的 SDK 接上即可。

---

# 一、插件命名 & 目录结构

**插件名**：`uni-id-kit`（简洁、易记、符合 uni 插件生态）

- 英文：**UniIdKit**
- 中文：**一体设备 ID 工具包**

**目录（uni_modules 标准）**：

```
uni_modules/
  uni-id-kit/
    package.json
    module.json
    utssdk/
      index.uts              # 聚合导出（按平台分发）
      common/
        types.uts            # 类型与常量定义（复用）
        hash.uts             # SHA-256 工具（Web/Android 均可）
        storage.uts          # 本地缓存工具（uni.storage封装）
      web/
        index.uts            # Web 实现（GUID、hash、缓存）
      app-android/
        index.uts            # Android 实现（AndroidID，OAID/AAID占位）
        adapters/
          android_id.uts     # ANDROID_ID
          aaid.uts           # Google AAID（待接SDK）
          oaid.uts           # MSA OAID  （待接SDK）
          pseudo_id.uts      # 伪ID（可选）
```

> iOS（IDFV）可稍后补：`app-ios/index.uts` + `adapters/idfv.uts`。
> 你让我们“先国内”，就先 **Web→Android**；Android 国内核心是 **AndroidID/OAID**，海外补 **AAID**。

---

# 二、API 设计（Promise + 回调兼容）

> 统一 Promise 风格，另兼容回调（可选）；返回结构“可读 + 可扩展”。

## 公开方法

```ts
// 1) 隐私合规：注册/初始化（未同意时一律返回 available=false）
export function register(options?: {
  showPrivacyDialog?: boolean; // 需要时展示你自有的隐私弹窗
}): Promise<{ consent: boolean }>;

// 2) 配置哈希盐（建议服务端下发）；默认仅返回 hash
export function setSalt(salt: string): void;

// 3) 一次性获取所有可用的 ID（聚合）
export function getIdCodes(options?: {
  include?: Array<
    | "oaid"
    | "aaid"
    | "androidId"
    | "idfv"
    | "widevineId"
    | "pseudoId"
    | "imei"
    | "guid"
  >;
  exposeRaw?: boolean; // 默认 false（仅返回hash），开启后返回原值 value
  ttlMs?: number; // 缓存有效期，默认 24h
}): Promise<IdCodesResult>;

// 4) 返回“最合适”的一个（按优先级：国内默认 oaid > androidId > guid）
export function getBestId(options?: {
  prefer?: Array<"oaid" | "aaid" | "androidId" | "idfv" | "guid">; // 可自定义优先级
  exposeRaw?: boolean;
  ttlMs?: number;
}): Promise<IdValue>;

// 5) 单项拉取（必要时）
export function getOAID(): Promise<IdValue>;
export function getAAID(): Promise<IdValue>;
export function getAndroidId(): Promise<IdValue>;
export function getGuid(): Promise<IdValue>;
```

## 返回类型（最佳实践）

```ts
// utssdk/common/types.uts
export type IdValue = {
  value?: string; // 原始值（exposeRaw=true 才返回）
  hash?: string; // SHA-256(value + salt) 十六进制
  available: boolean; // 是否获取成功
  limited?: boolean; // 是否受限（系统关闭广告跟踪等）
  source: string; // oaid/aaid/androidId/idfv/guid/...
  message?: string; // 失败或说明
};

export type IdCodesResult = {
  oaid?: IdValue;
  aaid?: IdValue;
  androidId?: IdValue;
  idfv?: IdValue; // 预留给 iOS
  widevineId?: IdValue; // 可选
  pseudoId?: IdValue; // 可选
  imei?: IdValue; // 不建议默认启用
  guid?: IdValue; // H5/兜底
  best?: string | null; // 最佳项的 key
  consent: boolean;
  ts: number; // 生成时间戳
};
```

---

# 三、首版代码（可直接放进项目）

> **说明**：以下代码为 **可运行骨架**。
>
> - Web：已可直接返回 `guid`（localStorage/uni.storage 持久化），并做 SHA-256。
> - Android：已可返回 **AndroidID**（无需额外权限），OAID/AAID 先返回占位（后续你把 SDK 接上）。
> - 聚合导出：`utssdk/index.uts` 会按平台引导到对应实现。

## 1）`uni_modules/uni-id-kit/module.json`

```json
{
  "id": "uni-id-kit",
  "displayName": "UniIdKit - 一体设备ID工具包",
  "version": "0.1.0",
  "description": "聚合 OAID/AAID/AndroidID/GUID 等设备标识，合规&哈希化输出",
  "keywords": ["deviceid", "oaid", "aaid", "androidid", "guid", "uts"],
  "repository": "",
  "engines": {
    "HBuilderX": "^3.8.0"
  },
  "uni_modules": {
    "platforms": {
      "app-android": {
        "utssdk": {
          "kotlin": ">=1.7.0"
        }
      },
      "web": {
        "utssdk": {}
      }
    }
  }
}
```

## 2）`uni_modules/uni-id-kit/utssdk/common/types.uts`

```ts
export type IdValue = {
  value?: string;
  hash?: string;
  available: boolean;
  limited?: boolean;
  source: string;
  message?: string;
};

export type IdCodesResult = {
  oaid?: IdValue;
  aaid?: IdValue;
  androidId?: IdValue;
  idfv?: IdValue;
  widevineId?: IdValue;
  pseudoId?: IdValue;
  imei?: IdValue;
  guid?: IdValue;
  best?: string | null;
  consent: boolean;
  ts: number;
};
```

## 3）`uni_modules/uni-id-kit/utssdk/common/hash.uts`

```ts
// Web 有 crypto.subtle；Android 走 Java MessageDigest（见安卓实现）
export async function sha256Hex(input: string): Promise<string> {
  // @ts-ignore
  const g: any = globalThis;
  if (g && g.crypto && g.crypto.subtle) {
    const enc = new TextEncoder().encode(input);
    const buf = await g.crypto.subtle.digest("SHA-256", enc);
    const arr = Array.from(new Uint8Array(buf));
    return arr.map((b) => b.toString(16).padStart(2, "0")).join("");
  }
  // 无 WebCrypto 时，先退回原文（开发期），建议后续接原生或 JS 实现
  return input;
}
```

## 4）`uni_modules/uni-id-kit/utssdk/common/storage.uts`

```ts
export function get(key: string): string | null {
  try {
    // @ts-ignore
    return uni.getStorageSync(key) || null;
  } catch {
    return null;
  }
}

export function set(key: string, val: string) {
  try {
    // @ts-ignore
    uni.setStorageSync(key, val);
  } catch {}
}
```

## 5）`uni_modules/uni-id-kit/utssdk/web/index.uts`（Web 实现）

```ts
import { IdCodesResult, IdValue } from "../common/types.uts";
import { sha256Hex } from "../common/hash.uts";
import { get, set } from "../common/storage.uts";

let _consent = false;
let _salt = "";

function uuid4(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = ((Math.random() * 16) as number) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

async function build(
  source: string,
  value?: string,
  exposeRaw?: boolean,
  limited?: boolean,
  msg?: string
): Promise<IdValue> {
  const available = !!value;
  const raw = exposeRaw ? value : undefined;
  const hash = value ? await sha256Hex(value + _salt) : undefined;
  return { value: raw, hash, available, limited, source, message: msg };
}

export async function register(
  _: UTSJSONObject | null = null
): Promise<UTSJSONObject> {
  // Web demo：默认视为已同意；你可以在这里弹你的隐私弹窗
  _consent = true;
  return { consent: _consent } as UTSJSONObject;
}

export function setSalt(salt: string): void {
  _salt = salt || "";
}

export async function getGuid(exposeRaw: boolean = false): Promise<IdValue> {
  let guid = get("UNIIDKIT_GUID");
  if (!guid) {
    guid = `web:${uuid4()}`;
    set("UNIIDKIT_GUID", guid);
  }
  return await build("guid", guid as string, exposeRaw);
}

export async function getAndroidId(): Promise<IdValue> {
  // Web 没有 AndroidID
  return await build(
    "androidId",
    undefined,
    false,
    false,
    "Not supported on Web"
  );
}

export async function getOAID(): Promise<IdValue> {
  return await build("oaid", undefined, false, false, "Not supported on Web");
}

export async function getAAID(): Promise<IdValue> {
  return await build("aaid", undefined, false, false, "Not supported on Web");
}

export async function getIdCodes(
  options?: UTSJSONObject | null
): Promise<IdCodesResult> {
  const include = (options?.getArray<string>("include") || [
    "oaid",
    "aaid",
    "androidId",
    "guid",
  ]) as string[];
  const exposeRaw = (options?.getBoolean("exposeRaw") || false) as boolean;

  const res: IdCodesResult = {
    consent: _consent,
    ts: Date.now(),
  } as IdCodesResult;

  if (!_consent) {
    res.guid = { available: false, source: "guid", message: "consent=false" };
    return res;
  }

  if (include.indexOf("guid") >= 0) res.guid = await getGuid(exposeRaw);
  if (include.indexOf("androidId") >= 0) res.androidId = await getAndroidId();
  if (include.indexOf("oaid") >= 0) res.oaid = await getOAID();
  if (include.indexOf("aaid") >= 0) res.aaid = await getAAID();

  // 国内默认优先级
  const order = ["oaid", "androidId", "guid"];
  res.best = null;
  for (let i = 0; i < order.length; i++) {
    const k = order[i];
    // @ts-ignore
    const v: IdValue | null = (res as UTSJSONObject)[k] as any;
    if (v && v.available) {
      res.best = k;
      break;
    }
  }

  return res;
}

export async function getBestId(
  options?: UTSJSONObject | null
): Promise<IdValue> {
  const arr = (options?.getArray<string>("prefer") || [
    "oaid",
    "androidId",
    "guid",
  ]) as string[];
  const exposeRaw = (options?.getBoolean("exposeRaw") || false) as boolean;
  const r = await getIdCodes({ include: arr as any, exposeRaw } as any);
  if (r.best) {
    // @ts-ignore
    return (r as UTSJSONObject)[r.best] as IdValue;
  }
  return { available: false, source: "none", message: "no id available" };
}
```

## 6）`uni_modules/uni-id-kit/utssdk/app-android/adapters/android_id.uts`

```ts
// ANDROID_ID，无需额外权限（相对稳定，但可能因某些ROM策略变化）
export function getAndroidIdRaw(): string | null {
  try {
    // @ts-ignore
    const ctx = plus.android.runtimeMainActivity();
    // @ts-ignore
    const SettingsSecure = plus.android.importClass(
      "android.provider.Settings$Secure"
    );
    // @ts-ignore
    const contentResolver = ctx.getContentResolver();
    // @ts-ignore
    const id = SettingsSecure.getString(
      contentResolver,
      "android_id"
    ) as string;
    return id ? `android:${id}` : null;
  } catch (e) {
    return null;
  }
}
```

## 7）`uni_modules/uni-id-kit/utssdk/app-android/index.uts`

```ts
import { IdCodesResult, IdValue } from "../common/types.uts";
import { get, set } from "../common/storage.uts";
import { getAndroidIdRaw } from "./adapters/android_id.uts";

let _consent = false;
let _salt = "";

// Android 原生侧用 Java 的 MessageDigest 做 SHA-256 更稳，这里暂用 Web 版占位：
// 你也可以在此通过 plus.android.importClass 使用 java.security.MessageDigest 实现
async function sha256Hex(input: string): Promise<string> {
  return input; // TODO: 接入原生 MessageDigest 后返回真 SHA-256
}

function uuid4(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = ((Math.random() * 16) as number) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

async function build(
  source: string,
  value?: string,
  exposeRaw?: boolean,
  limited?: boolean,
  msg?: string
): Promise<IdValue> {
  const available = !!value;
  const raw = exposeRaw ? value : undefined;
  const hash = value ? await sha256Hex(value + _salt) : undefined;
  return { value: raw, hash, available, limited, source, message: msg };
}

export async function register(
  _: UTSJSONObject | null = null
): Promise<UTSJSONObject> {
  // 这里接入你的合规弹窗/SDK；同意前建议不采集
  _consent = true;
  return { consent: _consent } as UTSJSONObject;
}

export function setSalt(salt: string): void {
  _salt = salt || "";
}

export async function getAndroidId(
  exposeRaw: boolean = false
): Promise<IdValue> {
  const v = getAndroidIdRaw();
  return await build("androidId", v || undefined, exposeRaw);
}

// 预留：接入 Google Advertising ID（AAID）
export async function getAAID(): Promise<IdValue> {
  // TODO：集成 com.google.android.gms:play-services-ads-identifier
  return await build("aaid", undefined, false, true, "AAID not integrated");
}

// 预留：接入 MSA OAID（国内主流）
export async function getOAID(): Promise<IdValue> {
  // TODO：接入 MSA/OAID SDK
  return await build("oaid", undefined, false, true, "OAID not integrated");
}

export async function getGuid(exposeRaw: boolean = false): Promise<IdValue> {
  let guid = get("UNIIDKIT_GUID");
  if (!guid) {
    guid = `app:${uuid4()}`;
    set("UNIIDKIT_GUID", guid);
  }
  return await build("guid", guid as string, exposeRaw);
}

export async function getIdCodes(
  options?: UTSJSONObject | null
): Promise<IdCodesResult> {
  const include = (options?.getArray<string>("include") || [
    "oaid",
    "aaid",
    "androidId",
    "guid",
  ]) as string[];
  const exposeRaw = (options?.getBoolean("exposeRaw") || false) as boolean;

  const res: IdCodesResult = {
    consent: _consent,
    ts: Date.now(),
  } as IdCodesResult;
  if (!_consent) {
    res.guid = { available: false, source: "guid", message: "consent=false" };
    return res;
  }

  if (include.indexOf("androidId") >= 0)
    res.androidId = await getAndroidId(exposeRaw);
  if (include.indexOf("oaid") >= 0) res.oaid = await getOAID();
  if (include.indexOf("aaid") >= 0) res.aaid = await getAAID();
  if (include.indexOf("guid") >= 0) res.guid = await getGuid(exposeRaw);

  // 国内优先级：oaid > androidId > guid
  const order = ["oaid", "androidId", "guid"];
  res.best = null;
  for (let i = 0; i < order.length; i++) {
    const k = order[i];
    // @ts-ignore
    const v: IdValue | null = (res as UTSJSONObject)[k] as any;
    if (v && v.available) {
      res.best = k;
      break;
    }
  }
  return res;
}

export async function getBestId(
  options?: UTSJSONObject | null
): Promise<IdValue> {
  const arr = (options?.getArray<string>("prefer") || [
    "oaid",
    "androidId",
    "guid",
  ]) as string[];
  const exposeRaw = (options?.getBoolean("exposeRaw") || false) as boolean;
  const r = await getIdCodes({ include: arr as any, exposeRaw } as any);
  if (r.best) {
    // @ts-ignore
    return (r as UTSJSONObject)[r.best] as IdValue;
  }
  return { available: false, source: "none", message: "no id available" };
}
```

## 8）`uni_modules/uni-id-kit/utssdk/index.uts`（聚合导出）

```ts
// 平台分发：同名导出，业务方 import 一处即可
// #ifdef APP-ANDROID
export {
  register,
  setSalt,
  getIdCodes,
  getBestId,
  getOAID,
  getAAID,
  getAndroidId,
  getGuid,
} from "./app-android/index.uts";
// #endif

// #ifdef H5
export {
  register,
  setSalt,
  getIdCodes,
  getBestId,
  getOAID,
  getAAID,
  getAndroidId,
  getGuid,
} from "./web/index.uts";
// #endif
```

---

# 四、在页面中使用（uni-app x）

```ts
// pages/login/index.uvue (示例)
import {
  register,
  setSalt,
  getBestId,
  getIdCodes,
} from "@/uni_modules/uni-id-kit/utssdk/index.uts";

onMounted(async () => {
  await register(); // 视需求弹你的隐私协议
  setSalt("server-salt-xxx"); // 建议从服务端下发

  const best = await getBestId({ exposeRaw: false });
  // 携带 best.hash 作为 x-device-id（或 getIdCodes 的 best 项）
  const dvc = best.hash || best.value || "unknown";

  await uni.request({
    url: `${baseUrl}/passkeys/login/options`,
    method: "POST",
    header: { "x-device-id": dvc },
    data: {},
  });
});
```

---

# 五、后续接入指引（Android OAID/AAID）

- **OAID**：集成 **MSA/联运** SDK（各大国产厂商支持），在 `app-android/adapters/oaid.uts` 中封装 `getOAIDRaw()`，在 `index.uts` 调 `await build('oaid', v, ...)`。
- **AAID**：添加 `com.google.android.gms:play-services-ads-identifier` 依赖，调用 `AdvertisingIdClient.getAdvertisingIdInfo(context)`。
- **SHA-256**：Android 侧推荐用 `java.security.MessageDigest`，性能更稳定；把 web 占位换掉。
- **权限**：AndroidID 不需要额外权限；IMEI/MEID 需要 READ_PHONE_STATE（**不推荐默认启用**）。
- **合规**：未同意隐私协议前，一律返回 `available=false`；默认仅返回 `hash`，除非 `exposeRaw=true`。

---

如果你认可这个结构和 API，我可以继续把 **Android 的 OAID/AAID 具体适配代码**补上（带依赖、打包参数、权限说明），以及 **iOS 的 IDFV** 版本。
