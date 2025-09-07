---
title: id-kit开发
date: 2025-09-07 12:57:14
tags:
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

# 参考实现

太好了，我把你这两个现成插件解包看过了，简单总结下各自实现，然后给一套“最佳实践”的统一 API 和落地改造方案（含可以直接替换的 UTS 代码片段）。

---

## 现有两个插件的实现差异（速览）

### 1) `android-deviceid`（UTS，App-Android）

- **用到的库**：`com.github.gzuliyujiang.oaid`（常用 OAID SDK 聚合库），还打包了 3 个 AAR（`ads-identifier-*.aar`、`IDlibrary-release.aar`）。
- **关键点**：

  - 在 `register()` 里调用 `DeviceIdentifier.register(UTSAndroid.getUniActivity().getApplication())` 完成 **OAID 初始化**。
  - 暴露了一个 **监听器**（`IDManger.OnIOAIDListener`），把厂商返回的 JSON 结果转成你定义的 `Device` 对象回调出去。

- **优点**：能拿到 **OAID**，并且是较为标准的做法；兼容多厂商。
- **需要补强**：

  - **统一 Promise API**（目前是回调），方便在页面里用 `await`。
  - **AAID（Google 广告 ID）**、**AndroidID** 的兜底与优先级策略。
  - **隐私合规**（register 同意前不采集）、**hash-only** 输出（默认只回传哈希，原值可开关）。
  - **缓存**（ttl），防止频繁拉取。
  - 错误/受限标记（例如用户关闭了广告跟踪）。

### 2) `zws-uniqueid`（UTS，App-Android）

- **实现**：拼接 `Build.*` 信息做一段文本，MD5 后作为“唯一 ID”。
- **优点**：无需权限/SDK，易用。
- **问题**：这是典型 **PseudoID**，**同型号/同批次设备可能相同**，也可能因 ROM/版本变更；不适合用来做**设备唯一绑定**或风控。
- **建议**：可以作为 `pseudoId` 字段的**最末位兜底**，不要当主标识。

---

## 建议的统一方案（名字可用你之前认可的：**`uni-id-kit`**）

**目标**：同一份 UTS 插件，覆盖 Web/H5 与 App-Android；API 一致、返回结构一致、默认合规（hash-only），国内优先级 `OAID > AndroidID > GUID > PseudoID`，海外可加 `AAID`。

### 统一 API（Promise 风格）

```ts
// 注册/合规：未同意前一律 available=false
export function register(options?: {
  showPrivacyDialog?: boolean;
}): Promise<{ consent: boolean }>;

// 配置哈希盐（建议服务端下发）
export function setSalt(salt: string): void;

// 一次性获取所有（含可用性、受限说明、hash）
export function getIdCodes(options?: {
  include?: Array<"oaid" | "aaid" | "androidId" | "pseudoId" | "guid">;
  exposeRaw?: boolean; // 默认 false
  ttlMs?: number; // 默认 24h
}): Promise<IdCodesResult>;

// 返回“最合适”的一个（按优先级，可定制）
export function getBestId(options?: {
  prefer?: Array<"oaid" | "androidId" | "guid" | "pseudoId" | "aaid">;
  exposeRaw?: boolean;
  ttlMs?: number;
}): Promise<IdValue>;

// 单项
export function getOAID(): Promise<IdValue>;
export function getAAID(): Promise<IdValue>;
export function getAndroidId(): Promise<IdValue>;
export function getGuid(): Promise<IdValue>;
```

**统一返回结构**

```ts
type IdValue = {
  value?: string; // exposeRaw=true 才返回
  hash?: string; // SHA-256(value + salt)
  available: boolean;
  limited?: boolean; // 例如系统关闭广告跟踪
  source: string; // oaid/aaid/androidId/pseudoId/guid
  message?: string;
};

type IdCodesResult = {
  oaid?: IdValue;
  aaid?: IdValue;
  androidId?: IdValue;
  pseudoId?: IdValue;
  guid?: IdValue;
  best?: string | null;
  consent: boolean;
  ts: number;
};
```

---

## 如何改造你现有的两个插件

> 下面给的都是 **直接能塞进工程** 的 UTS 代码。你可以新建一个 `uni_modules/uni-id-kit`，把这两个插件的“能力”合在一起；或者在你现有 `android-deviceid` 里重构导出，效果一致。

### 1) 公共类型与工具（`common/types.uts`、`common/storage.uts`、`common/hash.uts`）

```ts
// common/types.uts
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
  pseudoId?: IdValue;
  guid?: IdValue;
  best?: string | null;
  consent: boolean;
  ts: number;
};
```

```ts
// common/storage.uts
export function get(key: string): string | null {
  try {
    return uni.getStorageSync(key) || null;
  } catch {
    return null;
  }
}
export function set(key: string, val: string) {
  try {
    uni.setStorageSync(key, val);
  } catch {}
}
```

```ts
// common/hash.uts（Web 有 crypto.subtle；Android 建议换成 MessageDigest）
export async function sha256Hex(input: string): Promise<string> {
  // @ts-ignore
  const g: any = globalThis;
  if (g && g.crypto && g.crypto.subtle) {
    const enc = new TextEncoder().encode(input);
    const buf = await g.crypto.subtle.digest("SHA-256", enc);
    return Array.from(new Uint8Array(buf))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }
  return input; // Android 再换成原生 MessageDigest（见下）
}
```

### 2) Web 实现（先把 H5 跑起来：GUID + hash + 缓存）

```ts
// web/index.uts
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
  _consent = true; // 你可在这里弹你的隐私协议
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

  res.best = res.guid?.available ? "guid" : null;
  return res;
}

export async function getBestId(
  options?: UTSJSONObject | null
): Promise<IdValue> {
  const r = await getIdCodes(options);
  if (r.best) {
    /* @ts-ignore */ return (r as UTSJSONObject)[r.best] as IdValue;
  }
  return { available: false, source: "none", message: "no id available" };
}
```

### 3) Android 实现（融合你两个插件思路，Promise 化 + 兜底 + 可拓展）

- **AndroidID**：直接取 `Settings.Secure.ANDROID_ID`（不需要权限）。
- **OAID**：沿用你 `android-deviceid` 的库，包装为 Promise；初始化要在 `register()` 里做。
- **AAID**：先留占位，后续加 `play-services-ads-identifier`。
- **PseudoID**：把 `zws-uniqueid` 的思路做成可选兜底，不当主标识。
- **SHA-256**：建议在 Android 侧用 `java.security.MessageDigest`，比 web 占位靠谱。

```ts
// app-android/adapters/android_id.uts
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

```ts
// app-android/adapters/pseudo_id.uts（把 zws 的实现收编为兜底项）
import Build from "android.os.Build";
import MessageDigest from "java.security.MessageDigest";
import BigInteger from "java.math.BigInteger";

export function getPseudoIdRaw(): string | null {
  try {
    const text =
      Build.BOARD +
      Build.BRAND +
      Build.DEVICE +
      Build.DISPLAY +
      Build.FINGERPRINT +
      "uni-id-kit";
    const md5s = MessageDigest.getInstance("MD5").digest(
      (text as any).toString().toByteArray()
    );
    return new BigInteger(1, md5s).toString(16);
  } catch {
    return null;
  }
}
```

```ts
// app-android/index.uts
import { IdCodesResult, IdValue } from "../common/types.uts";
import { get, set } from "../common/storage.uts";
import { getAndroidIdRaw } from "./adapters/android_id.uts";
import { getPseudoIdRaw } from "./adapters/pseudo_id.uts";

// ==== 引入你 android-deviceid 插件用到的 OAID 库 ====
import DeviceIdentifier from "com.github.gzuliyujiang.oaid.DeviceIdentifier";
// 你现有的监听器写法是 IDManger.OnIOAIDListener + JSON 回调，这里改 Promise 风格：
// 如果库支持 IGetter 回调也可以（取决于版本），我这里按你包内的风格保留 register 初始化。

let _consent = false;
let _salt = "";

// 使用 Android 的 MessageDigest 实现 SHA-256（优于 web 占位）
function sha256HexSync(input: string): string {
  try {
    // @ts-ignore
    const MessageDigest = plus.android.importClass(
      "java.security.MessageDigest"
    );
    // @ts-ignore
    const md = MessageDigest.getInstance("SHA-256");
    // @ts-ignore
    const bytes = (input as any).toString().getBytes();
    const out = md.digest(bytes);
    let hex = "";
    for (let i = 0; i < out.length; i++) {
      const b = (out[i] as number) & 0xff;
      hex += (b < 16 ? "0" : "") + b.toString(16);
    }
    return hex;
  } catch {
    return input;
  }
}

function uuid4(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = ((Math.random() * 16) as number) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function buildSync(
  source: string,
  value?: string,
  exposeRaw?: boolean,
  limited?: boolean,
  msg?: string
): IdValue {
  const available = !!value;
  const raw = exposeRaw ? value : undefined;
  const hash = value ? sha256HexSync(value + _salt) : undefined;
  return { value: raw, hash, available, limited, source, message: msg };
}

export async function register(
  _: UTSJSONObject | null = null
): Promise<UTSJSONObject> {
  try {
    DeviceIdentifier.register(UTSAndroid.getUniActivity()!!.getApplication()!!);
  } catch {}
  _consent = true; // 这里接你的隐私弹窗
  return { consent: _consent } as UTSJSONObject;
}

export function setSalt(salt: string): void {
  _salt = salt || "";
}

export async function getAndroidId(
  exposeRaw: boolean = false
): Promise<IdValue> {
  const v = getAndroidIdRaw();
  return buildSync("androidId", v || undefined, exposeRaw);
}

export async function getGuid(exposeRaw: boolean = false): Promise<IdValue> {
  let guid = get("UNIIDKIT_GUID");
  if (!guid) {
    guid = `app:${uuid4()}`;
    set("UNIIDKIT_GUID", guid);
  }
  return buildSync("guid", guid as string, exposeRaw);
}

// OAID：基于你现有库封装为 Promise（示例：如果库是同步 API 换成同步返回即可）
export async function getOAID(): Promise<IdValue> {
  try {
    // 你包里是通过监听器把结果 JSON 回调出来的；
    // 这里建议写一个同步/异步包装（示意）：
    // 假设库提供 DeviceIdentifier.getOAID(ctx) 或者 DeviceID.getOAID(...)
    // 如果仅有回调形式，就 new Promise 包一下。
    // 先占位为“未集成”，避免误用：
    return buildSync(
      "oaid",
      undefined,
      false,
      true,
      "OAID not integrated to Promise wrapper"
    );
  } catch (e) {
    return buildSync("oaid", undefined, false, false, (e as any).toString());
  }
}

// AAID：等你接 play-services-ads-identifier，这里先占位
export async function getAAID(): Promise<IdValue> {
  return buildSync("aaid", undefined, false, true, "AAID not integrated");
}

export async function getIdCodes(
  options?: UTSJSONObject | null
): Promise<IdCodesResult> {
  const include = (options?.getArray<string>("include") || [
    "oaid",
    "androidId",
    "guid",
    "pseudoId",
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

  if (include.indexOf("oaid") >= 0) res.oaid = await getOAID();
  if (include.indexOf("androidId") >= 0)
    res.androidId = await getAndroidId(exposeRaw);
  if (include.indexOf("guid") >= 0) res.guid = await getGuid(exposeRaw);
  if (include.indexOf("pseudoId") >= 0)
    res.pseudoId = buildSync(
      "pseudoId",
      getPseudoIdRaw() || undefined,
      exposeRaw
    );

  // 国内默认优先级：oaid > androidId > guid > pseudoId
  const order = ["oaid", "androidId", "guid", "pseudoId"];
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
  const prefer = (options?.getArray<string>("prefer") || [
    "oaid",
    "androidId",
    "guid",
    "pseudoId",
  ]) as string[];
  const exposeRaw = (options?.getBoolean("exposeRaw") || false) as boolean;
  const r = await getIdCodes({ include: prefer as any, exposeRaw } as any);
  if (r.best) {
    /* @ts-ignore */ return (r as UTSJSONObject)[r.best] as IdValue;
  }
  return { available: false, source: "none", message: "no id available" };
}
```

### 4) 平台聚合导出（`utssdk/index.uts`）

```ts
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

## 要不要“调整现在的代码”？

**要的**，但改动并不大，主要集中在 4 点：

1. **Promise 化**：把回调/监听器的导出改为 Promise，页面里可以 `await`。
2. **统一返回结构**：所有方法都返回 `IdValue/IdCodesResult`，好串联与埋点。
3. **合规默认 & hash-only**：提供 `register()` 和 `setSalt()`，未同意前不采集；默认只回 `hash`。
4. **兜底与优先级**：在拿不到 OAID 时，**自动回退**到 `AndroidID`、`GUID`、`pseudoId`，并清晰标出 `limited`/`message`。

> 你的 `android-deviceid` 插件可以直接把库继续用；我在上面的安卓实现里已经把“桥接位”留好了。
> `zws-uniqueid` 的算法我收编到 `pseudoId`，作为兜底，不再当主标识使用。

---

## 下一步

- 你确认用 **`uni-id-kit`** 的方案我就把 **OAID Promise 包装**（基于你现有 `DeviceIdentifier` 监听回调）也给你写上，并且给出 **AAID 接入**（`play-services-ads-identifier`）的 `gradle` 依赖与 UTS 调用示例。
- 如果需要，我也可以给 **iOS（IDFV）** 的 UTS 版本，一起并到这个套件里。
