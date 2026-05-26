---
title: iOS 原生构建排坑复盘：从 Expo 启动到 Dev Client 跑通
date: 2026-05-26
tags:
  - Expo
  - React Native
  - iOS
  - CocoaPods
  - Xcode
categories:
  - 移动开发
---

终于跑起来了，这条 iOS 链路你基本完整走了一遍，可以这样回顾：

1. 先执行 `yarn start`，确认 Expo/Metro 开发服务器能正常启动。

2. 发现 `expo start --dev-client` 只是启动 JS 服务，不等于真正构建 iOS App。

3. 执行 `yarn ios`，进入 `expo run:ios` 的原生 iOS 构建流程。

4. 系统提示没有 CocoaPods，因为 iOS 原生依赖需要通过 Pods 管理。

5. Expo 先尝试用 Ruby Gem 安装 CocoaPods，但失败了。

6. 后来通过 Homebrew 成功安装 CocoaPods，`pod` 命令可用了。

7. 第一次 `pod install` 很慢，因为要下载和生成大量 iOS 原生依赖。

8. 中途遇到 GitHub 下载依赖超时，例如 `SDWebImageWebPCoder`、`glog` 下载失败。

9. 解决终端访问 GitHub 的问题后，Pod 依赖继续下载。

10. 后来 `pod install` 又因为找不到 `iphoneos` SDK 失败。

11. 检查 `xcrun --sdk iphoneos --show-sdk-path`，确认 Xcode 命令行工具没有正确识别 iOS SDK。

12. 通过修正 Xcode Command Line Tools 指向完整 Xcode，恢复了 `iphoneos` SDK 路径。

13. 清理失败残留的 Pods 和 `Podfile.lock`，重新执行 `pod install --repo-update`。

14. Pods 最终安装成功，一共装了 132 个依赖、146 个 Pods。

15. 之后重新执行 `yarn ios`，正式进入 Xcode 编译阶段。

16. 编译阶段发现项目里的 Swift 文件 `VpnRiskNative.swift` 使用了 iOS 不可用的 CFNetwork 常量。

17. 把不可用的 `kCFNetworkProxiesHTTPSEnable`、`kCFNetworkProxiesSOCKSEnable` 改成字符串 key 读取代理配置。

18. 再次编译后，Xcode 原生构建通过。

19. iOS App 成功安装到模拟器或设备。

20. App 启动后连接 Metro，开发版 iOS 应用终于运行起来。

一句话总结：

```text
这次 iOS 从 Expo 启动，到 CocoaPods、GitHub 依赖、Xcode SDK、Pods 安装、Swift 编译错误，一路排完后才真正跑起来。
```

现在你已经不是单纯“启动了 Expo”，而是完整打通了：

```text
Expo → CocoaPods → Xcode → iOS 原生构建 → Dev Client App → Metro
```
