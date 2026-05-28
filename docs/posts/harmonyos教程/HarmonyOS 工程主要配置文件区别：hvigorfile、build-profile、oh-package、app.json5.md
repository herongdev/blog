---
title: HarmonyOS 工程主要配置文件区别：hvigorfile、build-profile、oh-package、app.json5
date: 2026-05-27 00:00:00
tags:
  - HarmonyOS
  - ArkTS
  - DevEco Studio
  - Hvigor
categories:
  - HarmonyOS
---

## 一、整体思路

一个 HarmonyOS 工程大致可以分成两层：

```text
apps/harmony                 # 工程根目录：管理整个 App
├─ hvigorfile.ts              # 工程级构建入口
├─ build-profile.json5        # 工程级构建配置
├─ oh-package.json5           # 工程级依赖
├─ hvigor/hvigor-config.json5 # Hvigor 工具链配置
└─ entry                      # entry 模块：真正的应用模块
   ├─ hvigorfile.ts           # 模块级构建入口
   ├─ build-profile.json5     # 模块级构建配置
   ├─ oh-package.json5        # 模块级依赖
   └─ src/main
      ├─ module.json5         # 模块能力、页面、权限配置
      └─ ets                  # ArkTS/ETS 业务代码
```

可以简单理解为：

```text
根目录配置：管整个 App 怎么构建
entry 配置：管具体模块怎么打包
src/main 配置：管应用运行时信息
```

---

## 二、`apps/harmony/hvigorfile.ts`

这个文件是 **工程级构建入口**。

它告诉 DevEco Studio / Hvigor：

> 当前这个工程应该按什么类型来构建。

普通 HarmonyOS 应用一般应该是：

```ts
export { appTasks } from '@ohos/hvigor-ohos-plugin';
```

你的截图里之前是：

```ts
export { AppTasksForArkUIX } from '@ohos/hvigor-ohos-arkui-x-plugin';
```

这表示当前工程被识别成了 **ArkUI-X 跨端工程**，所以它会要求配置：

```text
arkui-x.dir
```

或者环境变量：

```text
ARKUIX_SDK_HOME
```

如果你不要跨端，就不应该使用 ArkUI-X 插件。

### 普通 HarmonyOS 应用应该改成

```ts
export { appTasks } from '@ohos/hvigor-ohos-plugin';
```

---

## 三、`apps/harmony/entry/hvigorfile.ts`

这个文件是 **entry 模块级构建入口**。

它告诉 Hvigor：

> entry 这个模块应该怎么打包。

普通应用的 entry 模块一般是：

```ts
export { hapTasks } from '@ohos/hvigor-ohos-plugin';
```

含义是：

```text
把 entry 模块构建成 HAP 包
```

### 和根目录 `hvigorfile.ts` 的区别

| 文件                                 | 作用               |
| ---------------------------------- | ---------------- |
| `apps/harmony/hvigorfile.ts`       | 定义整个 App 工程的构建任务 |
| `apps/harmony/entry/hvigorfile.ts` | 定义 entry 模块的构建任务 |

可以这样理解：

```text
根 hvigorfile.ts：我是一个 App
entry/hvigorfile.ts：我是 App 里的一个 HAP 模块
```

---

## 四、`apps/harmony/build-profile.json5`

这个是 **工程级构建配置文件**。

它通常负责：

```text
产品配置
签名配置
模块列表
构建目标
bundleName
runtimeOS
```

常见内容类似：

```json5
{
  app: {
    signingConfigs: [],
    products: [
      {
        name: "default",
        signingConfig: "default"
      }
    ]
  },
  modules: [
    {
      name: "entry",
      srcPath: "./entry"
    }
  ]
}
```

它的重点是：

```text
整个 App 有哪些模块
使用哪个产品配置
使用哪个签名配置
```

你的命令里有：

```bash
-p product=default
```

这里的 `default` 就通常来自根目录 `build-profile.json5` 里的 `products` 配置。

---

## 五、`apps/harmony/entry/build-profile.json5`

这个是 **entry 模块级构建配置文件**。

它负责 entry 模块自己的构建信息，例如：

```text
模块类型
编译目标
sourceOption
buildOption
targets
```

常见内容类似：

```json5
{
  apiType: "stageMode",
  buildOption: {},
  targets: [
    {
      name: "default"
    }
  ]
}
```

### 和根目录 `build-profile.json5` 的区别

| 文件                          | 作用                |
| --------------------------- | ----------------- |
| 根目录 `build-profile.json5`   | 管整个 App 的产品、签名、模块 |
| `entry/build-profile.json5` | 管 entry 模块自身怎么编译  |

可以这样理解：

```text
根 build-profile.json5：App 级别配置
entry/build-profile.json5：模块级别配置
```

---

## 六、`apps/harmony/oh-package.json5`

这个是 **工程级依赖配置文件**。

它类似前端项目里的：

```text
package.json
```

主要管理当前 HarmonyOS 工程需要的依赖。

比如：

```json5
{
  "devDependencies": {
    "@ohos/hvigor-ohos-plugin": "4.20.4"
  }
}
```

如果这里出现：

```json5
"@ohos/hvigor-ohos-arkui-x-plugin": "4.20.4"
```

就说明工程依赖了 ArkUI-X 构建插件。

如果你不做跨端，这个依赖应该删除。

---

## 七、`apps/harmony/entry/oh-package.json5`

这个是 **entry 模块自己的依赖配置文件**。

如果某个依赖只给 entry 模块使用，可以放这里。

例如：

```json5
{
  "dependencies": {}
}
```

### 和根目录 `oh-package.json5` 的区别

| 文件                       | 作用             |
| ------------------------ | -------------- |
| 根目录 `oh-package.json5`   | 工程级依赖，常放构建插件   |
| `entry/oh-package.json5` | 模块级依赖，常放业务模块依赖 |

简单理解：

```text
根 oh-package.json5：构建工具、全局依赖
entry/oh-package.json5：entry 模块业务依赖
```

---

## 八、`apps/harmony/oh-package-lock.json5`

这个是 **依赖锁定文件**。

类似前端里的：

```text
package-lock.json
pnpm-lock.yaml
yarn.lock
```

它记录当前实际安装的依赖版本。

一般不手动改。

当你修改了：

```text
oh-package.json5
```

再重新安装依赖后，这个文件会自动更新。

如果依赖状态混乱，可以删除后重新同步：

```bash
rm -rf oh_modules oh-package-lock.json5
```

然后重新 Sync。

---

## 九、`apps/harmony/hvigor/hvigor-config.json5`

这个文件是 **Hvigor 构建工具自身的配置**。

它不是业务配置，也不是 App 产品配置，而是控制 Hvigor 构建行为。

常见作用包括：

```text
Hvigor 插件配置
构建缓存配置
任务执行配置
工具链相关配置
```

一般情况下不频繁修改。

如果项目突然引入了某些构建插件，也可以检查这个文件里有没有相关配置。

---

## 十、`entry/src/main/module.json5`

这个文件非常重要，它是 **模块运行时配置文件**。

它描述 entry 模块的核心信息，比如：

```text
模块名称
入口 Ability
页面路由
权限声明
设备类型
metadata
extensionAbility
```

常见结构类似：

```json5
{
  module: {
    name: "entry",
    type: "entry",
    srcEntry: "./ets/Application/AbilityStage.ets",
    abilities: [
      {
        name: "EntryAbility",
        srcEntry: "./ets/entryability/EntryAbility.ets",
        launchType: "singleton",
        startWindowIcon: "$media:startIcon",
        startWindowBackground: "$color:start_window_background"
      }
    ]
  }
}
```

这个文件和构建文件不同，它更接近：

```text
应用运行声明文件
```

比如你要加权限，通常也是改这里：

```json5
{
  module: {
    requestPermissions: [
      {
        name: "ohos.permission.INTERNET"
      }
    ]
  }
}
```

---

## 十一、`AppScope/app.json5` 或 `app.json5`

这个是 **应用级运行配置**。

它通常描述整个 App 的基础信息，比如：

```text
bundleName
vendor
versionCode
versionName
icon
label
```

常见结构类似：

```json5
{
  app: {
    bundleName: "com.example.demo",
    vendor: "example",
    versionCode: 1000000,
    versionName: "1.0.0",
    icon: "$media:app_icon",
    label: "$string:app_name"
  }
}
```

### 和 `module.json5` 的区别

| 文件             | 作用              |
| -------------- | --------------- |
| `app.json5`    | 整个 App 的身份信息    |
| `module.json5` | 某个模块的能力、页面、权限信息 |

可以这样理解：

```text
app.json5：这个 App 是谁
module.json5：这个模块能做什么
```

---

## 十二、这些文件的关系总结

| 文件                          | 层级    | 主要作用          | 是否经常修改 |
| --------------------------- | ----- | ------------- | ------ |
| `hvigorfile.ts`             | 工程级   | 声明 App 构建任务   | 少      |
| `entry/hvigorfile.ts`       | 模块级   | 声明 HAP 模块构建任务 | 少      |
| `build-profile.json5`       | 工程级   | 产品、签名、模块配置    | 中      |
| `entry/build-profile.json5` | 模块级   | entry 编译配置    | 少      |
| `oh-package.json5`          | 工程级   | 工程依赖、构建插件     | 中      |
| `entry/oh-package.json5`    | 模块级   | entry 模块依赖    | 中      |
| `oh-package-lock.json5`     | 工程级   | 锁定依赖版本        | 不手动改   |
| `hvigor-config.json5`       | 工具链级  | Hvigor 构建工具配置 | 少      |
| `app.json5`                 | App 级 | App 身份信息      | 中      |
| `module.json5`              | 模块级   | Ability、页面、权限 | 较常改    |

---

## 十三、结合你这次的问题看

你这次报错的核心链路是：

```text
根目录 hvigorfile.ts
    ↓
使用了 AppTasksForArkUIX
    ↓
Hvigor 认为这是 ArkUI-X 跨端工程
    ↓
开始查找 arkui-x.dir 或 ARKUIX_SDK_HOME
    ↓
本机没装 ArkUI-X SDK
    ↓
同步失败
```

你不要跨端，所以应该把工程级构建入口改回普通 HarmonyOS：

```ts
export { appTasks } from '@ohos/hvigor-ohos-plugin';
```

同时检查依赖里是否还有：

```json5
"@ohos/hvigor-ohos-arkui-x-plugin"
```

如果有，删除。

---

## 十四、最简排查命令

在工程目录执行：

```bash
grep -R "arkui-x\|ArkUIX\|hvigor-ohos-arkui-x-plugin" .
```

如果还能搜到这些内容，说明项目里仍然存在 ArkUI-X 配置。

普通 HarmonyOS 项目里，核心应该是：

```ts
export { appTasks } from '@ohos/hvigor-ohos-plugin';
```

和：

```ts
export { hapTasks } from '@ohos/hvigor-ohos-plugin';
```

不应该再出现：

```ts
AppTasksForArkUIX
```

或：

```text
@ohos/hvigor-ohos-arkui-x-plugin
```
