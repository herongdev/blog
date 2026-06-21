---
title: DCloud AppKey 是什么？离线打包三要素必须一致
date: 2026-05-19
tags:
  - uni-app
  - DCloud
  - 离线打包
  - Android
  - iOS
  - AppKey
  - Gradle
categories:
  - 移动开发
description: DCloud AppKey 是后台生成的离线授权凭证；Android 运行时校验 appid、包名、签名 SHA1、AppKey 四者一致。Gradle Release 构建可提前拦截空 AppKey。
---

# DCloud AppKey 是什么？

可以把它理解成：**DCloud 给你这套「离线原生壳 + uni 资源包」发的授权码。**

> **注意：** Android 和 iOS 的 AppKey 是分开的（同品牌、不同平台各有一串）。

DCloud 的 uni-app 离线打包，不是随便把 `www` 塞进 APK 就能跑。运行时 DCloud 原生 SDK（5+ Runtime）会校验：

> 这个 APK 有没有资格跑 **这个 appid** 的 uni 应用？

Android 侧准确说是 **四者** 必须在 DCloud 开发者后台绑定一致（下文会细讲为何不是本地用 appid+包名算出来的）：

| 要素 | 你们项目里在哪 | 示例（华源 hyqh） |
|------|----------------|-------------------|
| appid | `dcloud_control.xml` | `__UNI__3EAF30F` |
| Android 包名 | `build.gradle` → `applicationId` | `com.future.hyqhjskh` |
| 签名证书 SHA1 | APK 实际签名（后台登记时提交） | Release keystore 对应 SHA1 |
| AppKey | `AndroidManifest.xml` → `dcloud_appkey` | 品牌配置里的那一串 |

在 [dev.dcloud.net.cn](https://dev.dcloud.net.cn) 后台，针对应用 `__UNI__3EAF30F`，Android 平台会登记「包名 + 证书 SHA1 → AppKey」。**任一项对不上**，App 常见表现是：白屏、闪退、或提示未授权 / 校验失败。

## 既然后台已有 appid + 包名，为什么还要 AppKey？

直觉是：后台查一下 appid、包名对上就放行。但问题是 **校验发生在用户手机上的 APK 里**，不是每次启动都去 DCloud 后台问一遍。

### appid 和包名都是「公开的」

| 信息 | 能否保密 |
|------|----------|
| appid `__UNI__3EAF30F` | 否，在 `manifest.json`、`dcloud_control.xml` 里明文 |
| Android 包名 | 否，APK 里、`AndroidManifest` 里、应用商店里都能看到 |
| uni 的 `www` 资源 | 否，解包就能拿到 |

如果只校验「appid + 包名」：

- 别人可以拿你们的 `www`，塞进自己的原生壳
- 把 appid 设成 `__UNI__3EAF30F`
- 包名也改成 `com.future.hyqhjskh`（或仿冒）
- 就能 **未授权** 跑你们的 uni 业务

单靠两个公开字段，无法证明「这个 APK 是你在 DCloud 后台登记过的合法离线包」。

## AppKey 的角色：嵌进 APK 的「授权凭证」

流程可以理解为：

```text
你在 dev.dcloud.net.cn 登记：
  appid + 平台(Android) + 包名 + 证书 SHA1
        ↓
DCloud 生成一串 AppKey（只有登记过的开发者能拿到）
        ↓
你把 AppKey 写进 AndroidManifest 的 dcloud_appkey
        ↓
App 启动时，DCloud SDK 校验：
  appid + 包名 + 实际 SHA1 + AppKey 是否与后台登记记录一致
```

AppKey 相当于 DCloud 发的 **离线打包许可证**：

- 证明你走过官方登记流程
- 绑定到具体的 appid + 平台 + 包名 + 证书 SHA1 组合
- SDK 可以在 **本地** 做校验，不必每次启动都联网问后台（弱网、无网也能启动）

## AppKey 是 appid+包名算出来的吗？

**不是。** 「内置规则校验」容易让人以为是本地算法 `hash(appid + 包名)`，更准确的说法是：

### AppKey 是 DCloud **后台登记时生成** 的一串凭证

在 [dev.dcloud.net.cn](https://dev.dcloud.net.cn) 申请离线 AppKey 时，你要提交的不只是 appid 和包名，Android 还要填：

- **签名证书的 SHA1**（以及 SHA256）

后台根据这套登记信息 **生成** AppKey（例如 `71bfd9a85f08b0a0c80f54988af511b2`），不是你在本地用公式算出来的。

[官方文档](https://nativesupport.dcloud.net.cn/AppDocs/usesdk/appkey.html) 原话大意是：appid + 应用包名 + 签名 SHA1 必须与申请时填写的一致，否则就会报「未配置 appkey 或配置错误」。

### 运行时 SDK 实际在验什么

DCloud SDK 在 **App 启动时**（闭源，仓库里看不到源码）大致会核对：

```text
① dcloud_control.xml 里的 appid
② APK 实际包名 (applicationId)
③ APK 实际签名证书的 SHA1
④ AndroidManifest 里写的 dcloud_appkey 值
```

这四项必须和你在 DCloud 后台 **申请 AppKey 时登记的那条记录** 对得上。  
AppKey 本身是「后台发给你的许可证编号」；SDK 用它去匹配那条登记记录，**不是** `f(appid, 包名)` 本地推导。

```text
登记阶段（后台）：
  你提交：appid + 包名 + 证书 SHA1
       ↓
  DCloud 生成：AppKey（存后台）

运行阶段（手机）：
  SDK 从 APK 读出：appid、包名、实际 SHA1、manifest 里的 AppKey
       ↓
  与后台登记记录比对（本地逻辑 + 可能联网，具体算法在闭源 SDK 里）
       ↓
  全对 → 加载 www；不对 → 白屏/报错
```

## AppKey 与 Android 签名证书的关系

AppKey **不是** keystore 文件本身，也 **不是** keystore 密码，但 **和签名 SHA1 绑在一起**：

- 后台登记的是「某个包名 + 某张证书的 SHA1」
- 打出来的 APK 必须用 **同一张证书** 签，SDK 读到的 SHA1 才对得上

| | AppKey | Release 签名证书 |
|---|--------|------------------|
| 谁发的 | DCloud | Google / 你们自己 |
| 防什么 | 未授权跑 uni 离线包 | APK 被篡改、冒名发布 |
| 与 Debug 的关系 | Debug 也要填 AppKey；SHA1 须与后台登记一致 | Debug 默认用 debug 证书，SHA1 与 Release 不同 |

如果 Debug 用 Android 默认 debug 证书，而后台只登记了 Release 证书的 SHA1，就会出现：**AppKey 填对了，仍然报配置错误**。

## 四者各自干什么

| 配置 / 信息 | 作用 |
|-------------|------|
| `dcloud_control.xml` | 告诉 SDK：要加载哪个 uni 应用（appid） |
| `AndroidManifest` 包名 | 告诉系统：这个 App 的身份 |
| APK 签名 SHA1 | 证明 APK 用的是后台登记时那张证书 |
| `dcloud_appkey` | 告诉 SDK：你有权跑上面那个 appid |

启动时大致逻辑：

1. 读 `dcloud_control.xml` → 得到 `__UNI__3EAF30F`
2. 读当前 APK 包名 → `com.future.hyqhjskh`
3. 读 APK 实际签名 SHA1
4. 读 `meta-data` `dcloud_appkey` → 那串 key
5. SDK 校验四者是否 **在 DCloud 登记过的合法组合**
6. **通过** → 加载 `assets/apps/__UNI__3EAF30F/www/`
7. **失败** → 白屏 / 未授权

## Gradle「AppKey 为空就构建失败」——具体怎么写的？

**两件事分开说：Gradle 里的检查是你们工程自己写的；AppKey 校验不是本地用 appid+包名算出来的。**

这是 **`futures-android/simpleDemo/build.gradle` 里你们自己加的保护逻辑**，不是 DCloud SDK 提供的，也 **只在打 Release 时生效**。

### 1. 先读 AppKey

```gradle
def dcloudAppKey = hyqhProp('DCLOUD_APPKEY', 'HYQH_DCLOUD_APPKEY')
```

`hyqhProp` 的优先级：

1. 环境变量 `HYQH_DCLOUD_APPKEY`
2. 否则读 `futures-android/secrets.properties` 里的 `DCLOUD_APPKEY`
3. 都没有 → 空字符串 `""`

### 2. 在任务图就绪时拦截 Release 构建

```gradle
gradle.taskGraph.whenReady { graph ->
    if (graph.hasTask(':simpleDemo:assembleRelease')) {
        if (releaseStorePassword.isEmpty() || releaseKeyPassword.isEmpty()) {
            throw new GradleException(
                    'Release signing: set futures-android/secrets.properties (see secrets.properties.example) ' +
                            'or HYQH_RELEASE_STORE_PASSWORD / HYQH_RELEASE_KEY_PASSWORD env vars.')
        }
        if (dcloudAppKey.isEmpty()) {
            throw new GradleException(
                    'DCLOUD_APPKEY is empty: set futures-android/secrets.properties or HYQH_DCLOUD_APPKEY.')
        }
    }
}
```

| 点 | 说明 |
|----|------|
| `gradle.taskGraph.whenReady` | Gradle 解析完本次要跑哪些 task 之后、真正执行之前 |
| `graph.hasTask(':simpleDemo:assembleRelease')` | **只有**本次构建包含 `assembleRelease` 才检查 |
| `dcloudAppKey.isEmpty()` | 空串就 `throw new GradleException(...)`，构建直接失败 |
| `assembleDebug` | **不会**进这个分支，所以 Debug 构建 Gradle 不拦 |

这是 **纯 Gradle 层面的提前报错**，避免打出没有 AppKey 的 Release 包。同一段里 Release 也会检查 keystore 密码是否为空。

### Debug 也尽量用 Release 证书

`secrets.properties` 里有 keystore 密码时，**Debug 也用 Release keystore 签名**，这样 Debug APK 的 SHA1 才和 DCloud 后台登记的一致，AppKey 校验才过：

```gradle
buildTypes {
    debug {
        debuggable true
        if (!releaseStorePassword.isEmpty() && !releaseKeyPassword.isEmpty()) {
            signingConfig signingConfigs.config
        }
    }
}
```

## 为什么 Android / iOS 各有一串 AppKey？

同一 appid，在 DCloud 后台 **按平台、按包名 / Bundle ID 分别登记**，会生成 **不同的 AppKey**。

你们项目里华源就是：

- Android：`offlinePackage.android.dcloudAppKey`
- iOS：`offlinePackage.ios.dcloudAppKey`

两串不一样，因为平台、包名规则都不同，**不能混用**。

## 对照总结

| 问题 | 答案 |
|------|------|
| Gradle 空 AppKey 失败谁写的？ | 你们 `build.gradle` 的 `taskGraph.whenReady`，仅 `assembleRelease` |
| AppKey 是本地算法算出来的吗？ | **不是**，DCloud 后台根据登记信息生成 |
| SDK 到底验什么？ | appid + 包名 + **APK 签名 SHA1** + manifest 里的 AppKey，与后台登记记录一致 |
| 为何不能只要 appid+包名？ | 两者公开；AppKey + 签名 SHA1 才能证明「这是登记过的离线包」 |

## 一句话

**appid + 包名是公开身份；AppKey 是 DCloud 发的私密授权码，且与登记时的签名 SHA1 绑定。**

后台登记的是「谁有资格拿这串 key」；APK 里带上 key，SDK 才能在本地确认「这是合法离线包」，而不是随便一个壳 + 抄来的 `www`。

---

**延伸阅读：**

- [移动端打包签名与 DCloud 离线打包教程（系列总览）](/posts/移动开发/uni-app/移动端打包签名与%20DCloud%20离线打包教程)
- [Android uni-app 生产包需要什么？签名 SHA1、keystore 与构建流程](/posts/移动开发/uni-app/Android%20uni-app%20生产包需要什么？签名%20SHA1、keystore%20与构建流程) — SHA1 指纹、四层生产要素与完整打包容流程
- [Android keystore 密码与 APK 签名：打包时发生什么、安装时验什么](/posts/移动开发/uni-app/Android%20keystore%20密码与%20APK%20签名：打包时发生什么、安装时验什么) — keystore 两个密码、空密码风险、安装验签
- [SHA1 是什么？Android、iOS 与鸿蒙签名发证有何不同](/posts/移动开发/uni-app/SHA1%20是什么？Android、iOS%20与鸿蒙签名发证有何不同) — 证书指纹 vs 内容 hash、三平台发证对比

若 AppKey 填错，可继续查 logcat 关键词，或按 **Debug 报 AppKey 错误时的排查顺序**（证书 SHA1 是否与后台登记一致）逐项核对。
