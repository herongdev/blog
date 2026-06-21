---
title: Android keystore 密码与 APK 签名：打包时发生什么、安装时验什么
date: 2026-05-19
tags:
  - uni-app
  - Android
  - keystore
  - APK 签名
  - Gradle
categories:
  - 移动开发
description: 正式 keystore 的 store 密码与 key 密码、Debug 默认证书、空密码风险，以及 APK 签名块、验签两步（双 hash 对比）与安装流程。
---

# Android keystore 密码与 APK 签名

本文是 uni-app Android 离线打包系列的补充。完整三平台流程见 [移动端打包签名与 DCloud 离线打包教程](/posts/移动开发/uni-app/移动端打包签名与%20DCloud%20离线打包教程)。相关阅读：[生产包需要什么](/posts/移动开发/uni-app/Android%20uni-app%20生产包需要什么？签名%20SHA1、keystore%20与构建流程)、[DCloud AppKey 是什么](/posts/移动开发/uni-app/DCloud%20AppKey%20是什么？离线打包三要素必须一致)。

## keystore 的两个密码

正式包用的 keystore 生成时会有两个密码：**keystore 密码** 和 **key 密码**（可以设成一样）。你们项目里的 `RELEASE_STORE_PASSWORD`、`RELEASE_KEY_PASSWORD` 就是这两个。

| 密码 | 作用 |
|------|------|
| `RELEASE_STORE_PASSWORD` | 打开 keystore 文件（保险柜） |
| `RELEASE_KEY_PASSWORD` | 使用 keystore 里某把 key 签名（盖章） |

容易觉得「不用设」的是 **Debug 包**：Android Studio 自动用 `debug.keystore`，默认密码是 `android`，不是自己新生成时填的。

### 和 SSH / OpenSSL 的区别

你说的「一路回车」多半是 **SSH 密钥**（`ssh-keygen`）或 **OpenSSL**，passphrase 可以留空。

**Android 正式签名 keystore 不一样**：`keytool` 生成时也会问密码，理论上也能全回车留空，但：

1. 你们项目里 **已经设了密码**（`secrets.properties` 里的 `RELEASE_STORE_PASSWORD` / `RELEASE_KEY_PASSWORD`）
2. Release 打包 **Gradle 会检查密码非空**，空的话 `assembleRelease` 直接失败

所以日常开发 Debug 用默认 `debug.keystore`（密码 `android`）可以不管；**你们这个项目的生产包 keystore 是有密码的，不能当 SSH 那样全回车。**

## 去掉 Gradle 检查，空密码能打包吗？

**可以，但有个前提。**

去掉 `build.gradle` 里那段检查之后：

- **keystore 当初就是一路回车、没设密码生成的** → 两个密码都留空，Gradle 签名 **一般能过**，Release 也能打出来。
- **keystore 当初设过密码**（你们仓库里现在是这种）→ 去掉检查也 **不行**，会在真正签名那步报错，不是 Gradle 检查拦的。

所以：**空密码能不能用，取决于 keystore 文件本身有没有密码**，不是 Gradle 检查决定的。你们现在的 keystore 是有密码的，不能填空。

## 不设密码有什么风险？

**主要风险就一个：谁拿到 `.keystore` 文件，谁就能用你的身份签名发 APK。**

不设密码时：

- 不需要再破解，文件拷走就能签正式包
- 备份、U 盘、误传 Git、电脑被入侵，后果一样
- 别人可以冒名更新你的 App（包名相同 + 同一证书 = 能覆盖安装）

设密码后：

- 光有文件还不够，还要知道密码才能签
- 但密码也存在仓库里的话，保护会打折扣（你们现在是 **keystore + 密码都在 `.secrets/`**）

**和 DCloud AppKey、SHA1 无关**——不设密码不改变指纹，只让 keystore **更容易被盗用**。

**结论**：正式上架用的 keystore **建议设密码**；Debug 的 `debug.keystore` 不设无所谓。

## 打包时 APK 里多了什么

可以想成 **两层东西**：

```text
APK
├── 正常内容（代码、资源、assets、www…）
├── 签名块（私钥对「内容摘要」签出来的结果）
└── 证书（里面的公钥，用来验签）
```

更细一点（v1 传统方式，概念最好懂）：

1. 先把 APK 里每个文件算 hash，写进 `META-INF/MANIFEST.MF`
2. 用 **私钥** 对这些 hash 再签一次 → 得到 `META-INF/CERT.SF`、`META-INF/CERT.RSA`（或 `.DSA`）
3. `CERT.RSA` 里 **同时带着证书（公钥）和签名块**

v2/v3 是把签名块放在 APK 末尾的 **Signing Block** 里，原理一样：**私钥签内容摘要，证书（公钥）跟着 APK 走**。

## 安装时系统干什么

**会检查。** 大致流程：

```text
用户点安装
    ↓
PackageManager 读 APK
    ↓
① 取出证书（公钥）
    ↓
② 用公钥验证签名块
   → 内容摘要和签名对不上 = 被改过 → 安装失败
    ↓
③ 若是更新安装
   → 对比已装 App 的证书
   → 必须同一张证（同一开发者）
   → 否则拒绝覆盖（防别人冒名更新）
    ↓
④ 通过 → 写入 /data/app，显示安装成功
```

**② 怎么验**：不是公钥和签名块直接比，详见下节「验签拆成两步」——用公钥从签名块还原 hash，再和重算内容的 hash 对比。

**③ 更新规则**：`com.future.hyqhjskh` 已装过，新包必须是 **同一 keystore 签的** 才能覆盖；换证书 = 不同 App，只能卸了重装。

## 验签拆成两步：比的是两个 hash

把「验签」拆成两步就清楚了：**不是公钥和签名块比大小，而是用公钥从签名块里还原出一个 hash，再和现算的 hash 比。**

### 打包时（私钥做的事）

```text
① 把整个 APK 内容（除签名区外）算一遍 hash
   → 得到一串固定长度的摘要，例如：A7F3B2...

② 用私钥对「这个 hash」做数学运算
   → 得到签名块（一长串二进制）

③ 签名块 + 证书（公钥）一起塞进 APK
```

重点：**私钥签的不是整个 APK 文件本身，而是「内容的 hash」。**

### 安装时（系统做的事）

```text
① 同样规则，把当前 APK 内容再算一遍 hash
   → 得到：A7F3B2...  （或如果被改过 → X9K1...）

② 用证书里的公钥，对「签名块」做逆运算
   → 还原出当初签进去的那个 hash
   → 应该也是：A7F3B2...

③ 对比：
   现算的 hash  ==  公钥还原出来的 hash ？
        是 → 验签通过，内容没被改
        否 → 验签失败，拒绝安装
```

### 「一验证得到了什么？和什么比？」

| 步骤 | 得到什么 | 和什么比 |
|------|----------|----------|
| 公钥 + 签名块 | 还原出 **当初签名时的 hash** | — |
| 重算 APK 内容 | **现在的 hash** | 和上面那个比 |

**比的是两个 hash 是否相同**，不是公钥和签名块直接比。

### 为什么改一个文件就失败

```text
原包：内容 → hash = A7F3B2 → 私钥签进签名块
改包：内容' → hash = X9K1... （变了）

验签：公钥还原出来还是 A7F3B2
      现算出来是 X9K1...
      A7F3B2 ≠ X9K1...  → 失败
```

### 为啥必须用配对的公钥

签名块是 **私钥对 hash 加密/签名** 的结果。  
只有 **配对的公钥** 能正确还原出那个 hash；换别的公钥，还原出来是乱码，对不上。

所以：**不是验证「公钥和签名块匹不匹配」，而是验证「签名块能不能证明内容 hash 没被改」。**

### 验签一句话

```text
公钥 + 签名块  →  还原出「当初签名的 hash」
重算 APK 内容  →  得到「现在的 hash」
两个 hash 一样  →  通过；不一样  →  被改过或签名伪造
```

## 和 DCloud 的关系

| 谁 | 查什么 |
|----|--------|
| **Android 系统** | 签名块 + 证书 → APK 有没有被改、更新是不是同开发者 |
| **DCloud SDK** | 证书 SHA1 + 包名 + appid + AppKey → 离线包授权 |

系统 **不管** DCloud AppKey；DCloud **不管** Google Play。各验各的。

## 一句话串起来

```text
打包：内容 → hash → 私钥签进签名块；证书（公钥）也进 APK
安装：公钥还原 hash，重算内容 hash，两个 hash 一致才通过；更新还要证书一致
```

---

**系列导航**

- [移动端打包签名与 DCloud 离线打包教程（总览）](/posts/移动开发/uni-app/移动端打包签名与%20DCloud%20离线打包教程)
- [DCloud AppKey 是什么？](/posts/移动开发/uni-app/DCloud%20AppKey%20是什么？离线打包三要素必须一致)
- [Android uni-app 生产包需要什么？](/posts/移动开发/uni-app/Android%20uni-app%20生产包需要什么？签名%20SHA1、keystore%20与构建流程)
- [SHA1 是什么？Android、iOS 与鸿蒙签名发证有何不同](/posts/移动开发/uni-app/SHA1%20是什么？Android、iOS%20与鸿蒙签名发证有何不同)
