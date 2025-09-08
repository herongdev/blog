---
title: OAID 库的初始化与获取
date: 2025-09-07 15:44:21
tags:
---

# 一、国内主流 OAID 获取的两条路线

1. **MSA 官方 SDK（闭源）**

- 由“移动安全联盟/CAICT”提供。接入要放 `oaid_sdk_x.x.x.aar`（或早期 `miit_mdid_x.x.x.aar`）、`supplierconfig.json`、证书（`xxx.cert.pem`），并**先加载安全库**再 `MdidSdkHelper.InitSdk(...)` 获取 OAID。常见混淆与加载问题官方 FAQ 也有说明。([百度移动统计][1], [网站名称][2])

2. **开源聚合库（Android_CN_OAID）**

- 由 gzu-liyujiang 提供，统一封装**各厂商 OAID + 海外 AAID + 多种替代 ID**（AndroidID/WidevineID/GUID 等），API 友好。常用入口：`DeviceIdentifier.register(app)` 预取，或者 `DeviceID.getOAID(context, IGetter)` 异步获取。([李宇江的个人网站][3])

> 额外：**华为设备**可直接通过 **HMS Ads Identifier** 获取 OAID（`AdvertisingIdClient.getAdvertisingIdInfo(context).getId()`），不依赖 MSA（很多三方 SDK 文档也这样说明）。([华为开发者][4], [Adjust][5])

---

# 二、你的两个 UTS 插件实际做法（我已解包查看）

- **`android-deviceid`**（UTS for Android）

  - 直接 `import com.github.gzuliyujiang.oaid.*`，调用 `DeviceIdentifier.register(UTSAndroid.getUniActivity()!!.getApplication()!!)` 进行预取；随后通过接口把结果回调出去。
  - 插件内还自带 **华为 HMS ads-identifier AAR**（`ads-identifier-*.aar`），作为获取 OAID 的华为路径支撑。
  - 这是一个\*\*标准的“开源聚合库 + （可选）HMS”\*\*实现范式。

  片段（来自 `utssdk/app-android/index.uts`）：

  ```ts
  import DeviceIdentifier from "com.github.gzuliyujiang.oaid.DeviceIdentifier";
  export const register = function () {
    DeviceIdentifier.register(UTSAndroid.getUniActivity()!!.getApplication()!!);
  };
  ```

  （随后通过自定义 `MyListener implements IDManger.OnIOAIDListener` 回传 JSON 结果）

- **`zws-uniqueid`**

  - 不取 OAID，仅根据 `android.os.Build` 若干字段计算 `MD5` 作为**伪标识**（PseudoID），没有广告/合规可重置特性，仅能用于弱追踪/灰度分配等**非广告**用途。

---

# 三、初始化 & 获取：可直接抄的代码片段库

## 方案 A：开源 Android_CN_OAID（推荐起步用）

**初始化（建议在用户同意隐私后再调用）**

```kotlin
// Application.onCreate 或隐私同意后
DeviceIdentifier.register(application)  // 预取 clientId/OAID
```

**获取 OAID（两种）**

- 同步拿预取结果（需先 register）：

  ```kotlin
  val oaid = DeviceID.getOAID()  // 若未预取会为空
  ```

- 异步获取（不需要 register）：

  ```kotlin
  DeviceID.getOAID(context, object : IGetter {
      override fun onOAIDGetComplete(result: String) { /* result 即 OAID */ }
      override fun onOAIDGetError(error: Exception) { /* 失败或不支持 */ }
  })
  ```

这些方法签名、时机说明都在官方 javadoc 文档中有清晰描述：`register(...)` 预取、`getOAID(...)` 异步、`supportedOAID(context)` 判断支持性、以及 `getGUID`、`getAndroidID` 等替代项。([李宇江的个人网站][6])

> **优点**：开源、快速落地；**缺点**：在个别厂商/系统组合上获取率可能不如官方 MSA；不过开源库会优先尝试 HMS、厂商通道，整体覆盖度已较好。([李宇江的个人网站][3])

## 方案 B：MSA 官方 SDK（企业/上量后建议切换或并行）

**准备**

- `oaid_sdk_x.x.x.aar` 放 `libs/`
- `supplierconfig.json`、`<package>.cert.pem` 放 `assets/`
- Proguard：`-keep class com.bun.miitmdid.core.** { *; }`
- **在 Init 前加载安全库**（不同版本库名可能不同，如 `msaoaidsec` 或文档示例里的 nllvm 加固库名），否则会出现 `No implementation found for ... InitCert` 之类错误。([百度移动统计][1], [网站名称][2])

**初始化 & 获取**

```java
// 1) （可选但推荐）在 Application.onCreate 尝试加载安全库
try { System.loadLibrary("msaoaidsec"); } catch(Throwable ignore) {}

// 2) 在合适时机发起初始化与获取（不要在主线程里做耗时 I/O）
MdidSdkHelper.InitSdk(
  context.getApplicationContext(),
  /* isCert = */ true,
  new IIdentifierListener() {
    @Override public void onSupport(IdSupplier supplier) {
      if (supplier != null) {
        String oaid = supplier.getOAID();
        // supplier.isSupported() / isLimited() 等也可读
      }
    }
  }
);
```

上面这段 init 与回调写法，在各家第三方接入文档里都是类似范式（百度统计、Adjust、AppsFlyer 等均说明“MSA 或 HMS”两路径），并给出了混淆、AAR、`supplierconfig.json` 的标准放置方法。([百度移动统计][1], [Adjust][5], [AppsFlyer 支持中心][7])

## 方案 C：华为设备走 HMS（若接入了 HMS Core）

```java
// 不依赖 MSA，在华为设备上直接拿 OAID
AdvertisingIdClient.Info info =
    com.huawei.hms.ads.identifier.AdvertisingIdClient.getAdvertisingIdInfo(context);
String oaid = info.getId();
// info.isLimitAdTrackingEnabled() 可读 “限制个性化广告” 状态
```

HMS 文档对 OAID / Identifier Service 的 API 有明确说明。([华为开发者][4])

---

# 四、UTS（uni-app x）里的**最佳实践**总方案

> 目标：**一个 API 跨 H5 / Android**，Android 侧**优先 MSA/HMS**，没有则回退到 **Android_CN_OAID**，最后再降级 **AndroidID / GUID**；且**必须在取得隐私同意后**再初始化与获取。

### 1) API 设计（简洁且可扩展）

```ts
// /uni_modules/uaid-kit/utssdk/index.uts
export type UaidInfo = {
  oaid: string | null;
  source: "MSA" | "HMS" | "GZU" | "NONE";
  limitAdTracking?: boolean | null;
  aaid?: string | null; // 海外广告标识，未来可补
  androidId?: string | null; // 回退项
  guid?: string | null; // 本地持久 GUID（Web/低版本回退）
};

export function initAfterConsent(): void;
export function getUaid(callback: (info: UaidInfo) => void): void;
```

### 2) UTS 源码（**可直接用**；Android + Web 双端）

> 说明：
>
> - **MSA** 部分需要你把 `oaid_sdk_x.x.x.aar` 放到 `utssdk/app-android/libs/`，并在 `manifest.json` 勾选 UTS 插件；否则请把 `// MSA 可选块` 注释掉再编译。
> - **HMS** 部分需要 `ads-identifier` 依赖；没有就留开源库/回退路径。
> - Web 端只能**生成/持久化 GUID**，OAID 是 Android 概念。

```ts
// /uni_modules/uaid-kit/utssdk/app-android/index.uts
// #ifdef APP-ANDROID
import Context from "android.content.Context";
import Application from "android.app.Application";
import System from "java.lang.System";

// 开源库（gzu-liyujiang）
import DeviceIdentifier from "com.github.gzuliyujiang.oaid.DeviceIdentifier";
import DeviceID from "com.github.gzuliyujiang.oaid.DeviceID";
import IGetter from "com.github.gzuliyujiang.oaid.IGetter";

// HMS（若集成）
import AdvertisingIdClient from "com.huawei.hms.ads.identifier.AdvertisingIdClient";

// MSA（若集成了 AAR，否则请注释下一行两行以及使用处）
import MdidSdkHelper from "com.bun.miitmdid.core.MdidSdkHelper";
import IIdentifierListener from "com.bun.miitmdid.interfaces.IIdentifierListener";
import IdSupplier from "com.bun.miitmdid.interfaces.IdSupplier";
// #endif

// #ifdef H5
import { ref } from "vue";
// #endif

export type UaidInfo = {
  oaid: string | null;
  source: "MSA" | "HMS" | "GZU" | "NONE";
  limitAdTracking?: boolean | null;
  aaid?: string | null;
  androidId?: string | null;
  guid?: string | null;
};

export function initAfterConsent(): void {
  // #ifdef APP-ANDROID
  try {
    // 优先预取开源库的 clientId/OAID
    DeviceIdentifier.register(
      UTSAndroid.getUniActivity()!!.getApplication()!! as Application
    );
  } catch (e) {}

  // （可选）若你计划走 MSA，尽早加载安全库，避免 InitCert 报错
  try {
    System.loadLibrary("msaoaidsec");
  } catch (e) {}
  // #endif
  // #ifdef H5
  // nothing
  // #endif
}

function buildGuid(): string {
  // 128bit GUID，H5/Android 均可用，H5 存 localStorage 即可
  const s = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
  return s.replace(/[xy]/g, (c) => {
    const r = (Math.floor(Math.random() * 16) as number) & 0xf;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function getUaid(cb: (info: UaidInfo) => void): void {
  // #ifdef APP-ANDROID
  const ctx = UTSAndroid.getUniActivity()!! as Context;

  // 1) 尝试 HMS（若集成）
  try {
    const info = AdvertisingIdClient.getAdvertisingIdInfo(ctx);
    const id = info.getId();
    if (id) {
      cb({
        oaid: id,
        source: "HMS",
        limitAdTracking: info.isLimitAdTrackingEnabled(),
      });
      return;
    }
  } catch (e) {
    /* ignore */
  }

  // 2) 尝试 MSA 官方（若集成了 AAR）
  try {
    MdidSdkHelper.InitSdk(
      ctx,
      true,
      new (class implements IIdentifierListener {
        override onSupport(supplier: IdSupplier | null) {
          if (supplier != null && supplier.getOAID() != null) {
            cb({ oaid: supplier.getOAID(), source: "MSA" });
          } else {
            // 3) 回退：开源库异步
            DeviceID.getOAID(
              ctx,
              new (class implements IGetter {
                override onOAIDGetComplete(result: string) {
                  cb({ oaid: result, source: "GZU" });
                }
                override onOAIDGetError(err: any) {
                  const androidId = DeviceID.getAndroidID(ctx);
                  cb({ oaid: null, source: "NONE", androidId });
                }
              })()
            );
          }
        }
      })()
    );
    return;
  } catch (e) {
    // 没集成 MSA 或运行异常，继续走开源库回退
  }

  // 3) 开源库异步（无预取也能用）
  DeviceID.getOAID(
    ctx,
    new (class implements IGetter {
      override onOAIDGetComplete(result: string) {
        cb({ oaid: result, source: "GZU" });
      }
      override onOAIDGetError(err: any) {
        const androidId = DeviceID.getAndroidID(ctx);
        cb({ oaid: null, source: "NONE", androidId });
      }
    })()
  );
  // #endif

  // #ifdef H5
  try {
    let guid = uni.getStorageSync("UAID_GUID") as string;
    if (!guid) {
      guid = buildGuid();
      uni.setStorageSync("UAID_GUID", guid);
    }
    cb({ oaid: null, source: "NONE", guid });
  } catch (e) {
    cb({ oaid: null, source: "NONE", guid: buildGuid() });
  }
  // #endif
}
```

**混淆/配置建议（Android）**

- 若启用 **MSA**：

  ```
  -keep class com.bun.miitmdid.core.** { *; }
  ```

  同时把 `oaid_sdk_x.x.x.aar`、`supplierconfig.json`、`<pkg>.cert.pem` 放到对应目录（AAR: `libs/`，其余在 `assets/`）。初始化前加载安全库，避免 `InitCert` 报错。([百度移动统计][1], [网站名称][2])

- 若启用 **HMS**：确保引入 `com.huawei.hms:ads-identifier`（你现有 `android-deviceid` 插件已内置两个 ads-identifier AAR）。华为 OAID API 文档参考。([华为开发者][4])
- 若只用**开源库**：不需要证书，按上面 `DeviceID` / `DeviceIdentifier` 的调用即可（方法签名见官方 javadoc）。([李宇江的个人网站][6])

**隐私合规关键点**

- **必须在用户同意隐私政策后**再 `initAfterConsent()`；开源库文档也特别提示 register/获取前需获同意。([李宇江的个人网站][6])

---

# 五、再回答你“原来的插件中如何实现”的要点

- 你的 **`android-deviceid`** 正是采用**开源库（Android_CN_OAID）+（可选）HMS**的组合：

  - 预取：`DeviceIdentifier.register(...)`
  - 异步获取：`DeviceID.getOAID(context, IGetter)`
  - 附带 ad-identifier AAR，完善华为路径

  > 这与文档推荐用法一致（register 预取、或异步获取；支持 `supportedOAID` 检查）。([李宇江的个人网站][6])

- 你的 **`zws-uniqueid`** 只是**伪 ID**（基于 `Build.*` 拼接+MD5），**不属于 OAID**，适合作兜底标识，不可用于广告归因。

---

# 六、为什么推荐“先开源库 → 再视需要加 MSA/HMS”

- **落地速度**：开源库无证书/厂商注册门槛，上线快；API 稳定，文档完整（还有 `GUID/AndroidID` 兜底）。([李宇江的个人网站][3])
- **兼容与获取率**：有华为设备时可直接走 **HMS OAID**；大盘上量/商业化合规要求更高时，再**并行接入 MSA** 提升部分机型覆盖率。([华为开发者][4], [Adjust][5])
- **合规**：始终把 OAID 获取放在**隐私同意之后**。([李宇江的个人网站][6])

---

## 附：权威/一手资料（便于你对照）

- Android_CN_OAID 文档（`DeviceID.register/getOAID/supportedOAID/...` 方法签名）([李宇江的个人网站][6])
- Android_CN_OAID 项目主页/文档导航（含包结构/实现原理）([李宇江的个人网站][3])
- MSA 官方接入说明（AAR、`supplierconfig.json`、混淆、加载安全库/InitCert 问题）([百度移动统计][1], [网站名称][2])
- Adjust / AppsFlyer 对 OAID 的总述与“MSA 或 HMS”两条路径的明确表述（帮助理解生态）([Adjust][5], [AppsFlyer 支持中心][7])
- 华为 HMS Ads Identifier OAID 能力文档（API 参考）([华为开发者][4])

---

如果你同意这套方案，我可以把上面的 **UTS 插件源码**按你项目结构打包成 `uni_modules/uaid-kit`（含 `package.json`、`utssdk/app-android/config.json`、`README.md`、示例页），并给出在 **uni-app x** 项目里如何调用的示例页（含隐私弹窗 → 同意后初始化 → 展示结果）的完整代码。

[1]: https://mtj.baidu.com/static/userguide/book/android/oaid.html?utm_source=chatgpt.com "Android OAID 接入"
[2]: https://16054554.s21i.faiusr.com/61/ABUIABA9GAAgx5iGjgYo2_j-1AE.pdf?utm_source=chatgpt.com "常见问题问答F&Q - 信息资源系统"
[3]: https://gzu-liyujiang.github.io/Android_CN_OAID/?utm_source=chatgpt.com ":library"
[4]: https://developer.huawei.com/consumer/en/doc/hmscore-references/overview-0000001050066887?utm_source=chatgpt.com "Overview-com.huawei.hms.ads.identifier-Android-Java- ..."
[5]: https://dev.adjust.com/zh/sdk/android/plugins/oaid-plugin/?utm_source=chatgpt.com "OAID"
[6]: https://gzu-liyujiang.github.io/Android_CN_OAID/com/github/gzuliyujiang/oaid/DeviceID.html "DeviceID "
[7]: https://support.appsflyer.com/hc/en-us/articles/360006278797-Android-OAID-implementation-in-the-SDK?utm_source=chatgpt.com "Android OAID implementation in the SDK"
