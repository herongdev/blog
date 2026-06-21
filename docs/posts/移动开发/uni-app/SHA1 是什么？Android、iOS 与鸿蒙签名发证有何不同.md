---
title: SHA1 是什么？Android、iOS 与鸿蒙签名发证有何不同
date: 2026-05-19
tags:
  - uni-app
  - Android
  - iOS
  - 鸿蒙
  - HarmonyOS
  - SHA1
  - 签名
categories:
  - 移动开发
description: SHA1 是证书指纹而非 APK 内容 hash；Android 自签名，iOS 与鸿蒙由平台发证，验签原理相同、身份门禁不同。
---

# SHA1 是什么？Android、iOS 与鸿蒙有何不同

分两块说：**SHA1 是什么**，以及 **为什么鸿蒙 / iOS 和 Android 不一样**。

本文是 uni-app 离线打包系列补充。完整三平台流程见 [移动端打包签名与 DCloud 离线打包教程](/posts/移动开发/uni-app/移动端打包签名与%20DCloud%20离线打包教程)。相关阅读：[生产包需要什么](/posts/移动开发/uni-app/Android%20uni-app%20生产包需要什么？签名%20SHA1、keystore%20与构建流程)、[keystore 密码与 APK 验签](/posts/移动开发/uni-app/Android%20keystore%20密码与%20APK%20签名：打包时发生什么、安装时验什么)。

## SHA1 是什么？

前面说的 **hash** 是算法统称；**SHA1** 是其中一种具体算法（还有 SHA256 等）。

在 Android 签名语境里，SHA1 常指 **证书的指纹**，不是 APK 内容的 hash：

```text
证书（公钥 + 身份信息）
    ↓ 对证书本身做 SHA1 运算
SHA1 指纹：AA:BB:CC:DD:...（40 位十六进制）
```

作用：**给证书起个短编号**，方便登记、对比。

| | 验签用的 hash | SHA1 指纹 |
|---|--------------|-----------|
| **算什么** | APK 文件内容 | 证书本身 |
| **什么时候用** | 每次安装验签 | 填 DCloud / 微信等后台 |
| **会变吗** | 改 APK 就变 | 同一张证永远一样 |

DCloud 后台让你填 SHA1，意思是：**「我登记的是这张签名证，以后只有这张证签的包我才认 AppKey。」**

## Android vs iOS / 鸿蒙：谁发证？

### Android：自己签（自签名）

```text
你自己生成 keystore
    → 自己给自己发证书（自签名）
    → 用私钥签 APK
    → 系统只验「签名对不对、更新是不是同一张证」
    → 不问你证书谁发的
```

Google **不给你发** App 签名证书。你是自己的 CA。上架 Google Play 时可选 **Play 代管签名**，但本质仍是「开发者身份 = 某张证」。

### iOS：Apple 发证

```text
加入 Apple 开发者计划（付费）
    → 在 Apple 后台申请 Development / Distribution 证书
    → Apple 当 CA，验证你是合法开发者后才发证
    → 还要 Provisioning Profile（绑定 Bundle ID + 证书 + 设备/商店）
    → 没有 Apple 发的证，真机装不上、上不了 App Store
```

**Apple 控制整个链条**：谁能开发、谁能装、谁能上架。

### 鸿蒙：华为 / AppGallery 发证

和你们项目一样，证书在 `.secrets/harmonyos/`：

| 文件 | 作用 |
|------|------|
| `.cer` | 华为开发者平台发的数字证书 |
| `.p7b` | Profile（类似 iOS 描述文件，绑定包名 / 权限） |
| `.p12` | 私钥 + 证书打包（签名时用） |

流程和 iOS 很像：**在华为开发者后台申请 → 平台发证 → 用这套签鸿蒙包**。不是像 Android 那样自己 `keytool` 随便生成。

## 核心区别一张表

| | Android | iOS | 鸿蒙 |
|---|---------|-----|------|
| **谁发证** | 自己（自签名） | Apple | 华为 |
| **门槛** | 低，本地就能生成 | 开发者账号 + 审核 | 开发者账号 + 申请 |
| **私钥在哪** | 你的 `.keystore` | Mac 钥匙串 / `.p12` | `.p12` |
| **平台管控** | 弱（侧载即可） | 强 | 强 |
| **DCloud 登记** | 包名 + SHA1 + AppKey | Bundle ID + AppKey | 包名 + 平台证书 |

## 为什么 iOS / 鸿蒙要平台发证？

Android 开放：**有 APK + 允许未知来源就能装**。  
iOS / 鸿蒙封闭：**只有平台认可的开发者 + 平台发的证，才能装、才能上架**。

平台发证 = 平台先验证你是谁，再给你签名资格，比 Android 自签名多一层 **身份门禁**。

## 和你们项目的关系

```text
Android  → .secrets/android/keystore/*.keystore（自管）
iOS      → Apple 开发者账号 + Xcode 签名（不在 Git 里）
鸿蒙     → .secrets/harmonyos/huayuan|sanli/（.cer/.p7b/.p12，华为发的）
```

**验签原理三家一样**（私钥签、公钥验），差别在 **谁有权拿到那张证、能不能随便自签**。

## 一句话

**SHA1 是证书的身份证号**；Android 自己发证，iOS / 鸿蒙 **平台发证**，管控更严。

---

**系列导航**

- [移动端打包签名与 DCloud 离线打包教程（总览）](/posts/移动开发/uni-app/移动端打包签名与%20DCloud%20离线打包教程)
- [DCloud AppKey 是什么？](/posts/移动开发/uni-app/DCloud%20AppKey%20是什么？离线打包三要素必须一致)
- [Android uni-app 生产包需要什么？](/posts/移动开发/uni-app/Android%20uni-app%20生产包需要什么？签名%20SHA1、keystore%20与构建流程)
- [Android keystore 密码与 APK 签名](/posts/移动开发/uni-app/Android%20keystore%20密码与%20APK%20签名：打包时发生什么、安装时验什么)
