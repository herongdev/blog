---
title: Android 原生构建排坑复盘：从 yarn android 到 Metro 跑通
date: 2026-05-26
tags:
  - Expo
  - React Native
  - Android
  - Gradle
  - Android SDK
categories:
  - 移动开发
---

可以，Android 这条链路也可以按“一步一句话”回顾：

1. 代码完成后，先执行 `yarn android`，进入 `expo run:android` 的原生 Android 构建流程。

2. 一开始 Expo 找不到 Android SDK，提示 `Failed to resolve the Android SDK path`。

3. 发现本机虽然有 Android Studio，但终端没有正确识别 Android SDK。

4. 检查 `~/Library/Android/sdk`，确认 SDK 实际目录存在。

5. 配置 `ANDROID_HOME=/Users/ronnie/Library/Android/sdk`，让 Gradle 和 Expo 能找到 SDK。

6. 配置 `platform-tools` 到 `PATH`，让终端可以执行 `adb`。

7. 执行 `adb version`，确认 Android Debug Bridge 已经可用。

8. 给项目补充 `android/local.properties`，明确写入本机 SDK 路径。

9. 再次执行 `yarn android`，进入 Gradle 构建阶段。

10. 构建时提示找不到 Java Runtime，说明 JDK 环境还没准备好。

11. 安装 JDK 17，因为 React Native / Gradle 构建需要 Java 环境。

12. 执行 `java -version`，确认 OpenJDK 17 已经可用。

13. 执行 `/usr/libexec/java_home -v 17`，找到 JDK 17 的真实路径。

14. 配置 `JAVA_HOME`，让 Gradle 明确使用 JDK 17。

15. 再次执行 `yarn android`，Gradle 开始下载自身和项目依赖。

16. 中途遇到 Maven / Kotlin 依赖下载失败，说明 Gradle 访问远程仓库网络不稳定。

17. 检查并处理代理或 Maven 源问题，让 Gradle 能继续下载依赖。

18. 构建继续后，项目提示缺少 Android NDK。

19. 日志明确要求安装指定版本 `NDK 27.0.12077973`。

20. 发现 `sdkmanager` 命令不可用，说明 Android SDK Command-line Tools 没装或没进 PATH。

21. 在 Android Studio 的 SDK Tools 里安装 Android SDK Command-line Tools。

22. 重新检查 `sdkmanager --version`，确认命令行工具可用。

23. 通过 Android Studio 或 `sdkmanager` 安装项目指定的 NDK 版本。

24. 检查 `$ANDROID_HOME/ndk`，确认存在 `27.0.12077973`。

25. 再次执行 `yarn android`，发现还有 `Invalid https.proxyPort ''` 警告。

26. 搜索代理配置，定位到 `android/gradle.properties` 里有空的 proxy 配置。

27. 删除或修正 `systemProp.http.proxyPort=`、`systemProp.https.proxyPort=` 这些空配置。

28. 再次执行 `yarn android`，Gradle 不再被错误代理配置干扰。

29. Gradle 完成 Android 原生项目编译。

30. Expo 调用 `adb` 把 debug App 安装到安卓设备或模拟器。

31. App 启动后连接 Metro，Android 开发版应用终于运行起来。

一句话总结：

```text
Android 这条路主要是在补齐本机原生开发环境：Android SDK、adb、JDK 17、JAVA_HOME、ANDROID_HOME、Command-line Tools、NDK，以及 Gradle 网络和代理配置。
```

完整链路就是：

```text
代码完成 → Expo run:android → Gradle → Android SDK → JDK 17 → adb → NDK → 原生编译 → 安装到设备 → 连接 Metro → Android 运行
```
