---
title: "CMake 实战 2：NAPI 模块构建详解"
date: 2025-01-27
tags:
  - CMake
  - NAPI
  - HarmonyOS
  - 原生开发
description: "深入解析 CMake 在 NAPI 项目中的应用：从第三方库到 NAPI 模块的完整构建流程。"
---

# CMake 实战 2：NAPI 模块构建详解

> 深入解析如何在 HarmonyOS 项目中使用 CMake 构建 NAPI 模块，包括第三方库管理、头文件路径设置和依赖链接。

## 📚 项目结构

```text
entry/src/main/cpp/
├── CMakeLists.txt          ← 主构建文件（本文重点）
├── napi_init.cpp           ← NAPI 初始化代码
└── 3rd/
    └── native_add/
        ├── CMakeLists.txt  ← 第三方库构建文件
        ├── add.h
        └── add.c
```

---

## 🎯 主 CMakeLists.txt 逐行详解

### 1. 基础设置

```cmake
cmake_minimum_required(VERSION 3.16)
project(entry_native)
```

**作用**：

- 指定最低 CMake 版本 3.16
- 定义项目名称 `entry_native`

**为什么**：不同版本的 CMake 语法可能不同，指定版本可以保证兼容性。

### 2. C++ 标准设置

```cmake
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
```

**作用**：

- `CMAKE_CXX_STANDARD 17`：使用 C++17 标准
- `CMAKE_CXX_STANDARD_REQUIRED ON`：必须使用，不允许降级

**为什么**：NAPI 开发通常需要现代 C++ 特性，C++17 提供了足够的语言支持。

### 3. 架构信息打印

```cmake
message(STATUS "OHOS_ARCH=${OHOS_ARCH}")
```

**作用**：打印当前 CPU 架构信息到控制台

**输出示例**：

```
-- OHOS_ARCH=arm64-v8a
```

**为什么**：方便调试，确认在正确的架构下编译。

---

## 🔧 核心构建流程

### 4. 构建第三方库

```cmake
add_subdirectory(${CMAKE_CURRENT_SOURCE_DIR}/3rd/native_add)
```

**作用**：将第三方库子目录加入构建流程

**执行流程**：

1. 进入 `3rd/native_add` 目录
2. 读取该目录下的 `CMakeLists.txt`
3. 执行其中的构建命令
4. 生成 `libnativeAdd.so` 动态库
5. 输出到 `entry/libs/<ABI>/` 目录

**类比**：就像说"先去把那个做加法运算的小工厂建起来"

**路径解析**：

```text
${CMAKE_CURRENT_SOURCE_DIR} = entry/src/main/cpp
3rd/native_add                = 第三方库目录
最终路径                      = entry/src/main/cpp/3rd/native_add
```

### 5. 构建 NAPI 模块

```cmake
add_library(entry SHARED
    ${CMAKE_CURRENT_SOURCE_DIR}/napi_init.cpp
)
```

**参数详解**：

- `entry`：目标名称（内部使用）
- `SHARED`：生成动态库（.so 文件）
- `napi_init.cpp`：源代码文件

**生成的文件**：

```text
build/
└── libentry.so  ← 最终生成的 NAPI 模块
```

**模块名约定**：

- CMake 中的目标名：`entry`（构建时使用）
- 最终模块名：由 `napi_init.cpp` 中的 `nm_modname` 决定
- ArkTS 导入名：`nm_modname` 指定的名字

**示例代码（napi_init.cpp）**：

```cpp
static napi_module entryModule = {
    .nm_version = 1,
    .nm_flags = 0,
    .nm_filename = nullptr,
    .nm_register_func = Init,          // 初始化函数
    .nm_modname = "entry_native",      // ← 这个才是 ArkTS 用的名字
    .nm_priv = ((void*)0),
    .reserved = { 0 },
};
```

ArkTS 中使用：

```typescript
import entry_native from "libentry.so"; // 使用 nm_modname
```

---

## 📂 头文件路径管理

### 6. 设置头文件搜索路径

```cmake
target_include_directories(entry PUBLIC
    ${CMAKE_CURRENT_SOURCE_DIR}                   # 当前目录
    ${CMAKE_CURRENT_SOURCE_DIR}/3rd/native_add   # 第三方库目录
)
```

**路径详解**：

**路径 1：当前目录**

```text
${CMAKE_CURRENT_SOURCE_DIR} = entry/src/main/cpp/
```

用于包含本地的头文件，例如：

```cpp
#include "my_local_header.h"  // 从 entry/src/main/cpp/ 查找
```

**路径 2：第三方库目录**

```text
${CMAKE_CURRENT_SOURCE_DIR}/3rd/native_add = entry/src/main/cpp/3rd/native_add
```

用于包含第三方库的头文件：

```cpp
#include "add.h"  // 从 entry/src/main/cpp/3rd/native_add/ 查找
```

**PUBLIC 的含义**：

- `PUBLIC`：使用 `entry` 库的其他库也能访问这些头文件路径
- 自动继承：如果项目 A 使用 `entry`，项目 A 也自动获得这些路径

**对比表格**：

| 级别      | 自己用 | 别人用 | 使用场景       |
| --------- | ------ | ------ | -------------- |
| PUBLIC    | ✅     | ✅     | 公开的头文件   |
| PRIVATE   | ✅     | ❌     | 内部实现头文件 |
| INTERFACE | ❌     | ✅     | 仅头文件库     |

---

## 🔗 库依赖链接

### 7. 链接所需的库

```cmake
target_link_libraries(entry PUBLIC
    ace_napi.z      # 鸿蒙的 NAPI 库
    hilog_ndk.z     # 鸿蒙的日志库
    nativeAdd       # 我们刚建的加法库
)
```

**链接详解**：

#### ① `ace_napi.z`

**作用**：HarmonyOS 的 NAPI 运行时库

**提供功能**：

- JavaScript ↔ C++ 类型转换
- NAPI API 调用
- 异步任务支持
- Promise 回调

**实际使用**：

```cpp
#include "napi/native_api.h"  // 包含 NAPI 头文件

static napi_value Add(napi_env env, napi_callback_info info) {
    // 使用 NAPI API
    size_t argc = 2;
    napi_value args[2];
    napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);

    // 获取参数并处理...
    return result;
}
```

#### ② `hilog_ndk.z`

**作用**：HarmonyOS 的日志库

**提供功能**：

- 多级别日志输出（DEBUG、INFO、WARN、ERROR）
- 日志过滤和输出控制
- 性能优化

**实际使用**：

```cpp
#include <hilog/log.h>

// 日志级别
static constexpr OHOS::HiviewDFX::HiLogLabel LABEL = {
    LOG_CORE, 0xD001800, "Entry"  // 领域、标签ID、标签名
};

// 打印日志
HiLog::Debug(LABEL, "Debug message: %d", value);
HiLog::Info(LABEL, "Info message: %s", "hello");
HiLog::Warn(LABEL, "Warning message");
HiLog::Error(LABEL, "Error message: %d", error_code);
```

#### ③ `nativeAdd`

**作用**：我们刚才通过 `add_subdirectory` 生成的加法库

**提供功能**：

```cpp
// add.h
int add(int a, int b);
int subtract(int a, int b);

// add.c
int add(int a, int b) { return a + b; }
int subtract(int a, int b) { return a - b; }
```

**在 NAPI 中使用**：

```cpp
#include "add.h"  // 使用我们刚才设置的头文件路径

static napi_value CallAdd(napi_env env, napi_callback_info info) {
    // 调用 nativeAdd 库的函数
    int result = add(10, 20);

    // 返回给 JavaScript
    napi_value js_result;
    napi_create_int32(env, result, &js_result);
    return js_result;
}
```

**PUBLIC 的含义**：

- `PUBLIC`：使用 `entry` 库的其他库也会自动链接这些库
- 自动依赖：构建系统会自动处理依赖关系

---

## 📋 完整的构建流程图

```
1. 配置阶段
   cmake ..

2. 构建第三方库
   └─> add_subdirectory(3rd/native_add)
       └─> 生成 libnativeAdd.so
           └─> 输出到 entry/libs/arm64-v8a/

3. 构建 NAPI 模块
   └─> add_library(entry SHARED napi_init.cpp)
       └─> 设置头文件路径
       └─> 链接依赖库
           ├─ ace_napi.z
           ├─ hilog_ndk.z
           └─ nativeAdd
       └─> 生成 libentry.so
```

---

## 💻 实际代码示例

### napi_init.cpp 完整示例

```cpp
#include "napi/native_api.h"
#include "add.h"  // 使用我们设置的头文件路径
#include <hilog/log.h>

// 日志标签
static constexpr OHOS::HiviewDFX::HiLogLabel LABEL = {
    LOG_CORE, 0xD001800, "Entry"
};

// 加法函数
static napi_value Add(napi_env env, napi_callback_info info) {
    HiLog::Info(LABEL, "Add function called");

    // 获取参数
    size_t argc = 2;
    napi_value args[2];
    napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);

    // 转换参数
    int32_t a, b;
    napi_get_value_int32(env, args[0], &a);
    napi_get_value_int32(env, args[1], &b);

    // 调用第三方库函数
    int result = add(a, b);

    // 返回结果
    napi_value js_result;
    napi_create_int32(env, result, &js_result);
    return js_result;
}

// 模块初始化
static napi_value Init(napi_env env, napi_value exports) {
    HiLog::Info(LABEL, "Module initialized");

    napi_property_descriptor desc[] = {
        {"add", nullptr, Add, nullptr, nullptr, nullptr, napi_default, nullptr}
    };
    napi_define_properties(env, exports, sizeof(desc) / sizeof(desc[0]), desc);
    return exports;
}

// 模块定义
static napi_module entryModule = {
    .nm_version = 1,
    .nm_flags = 0,
    .nm_filename = nullptr,
    .nm_register_func = Init,
    .nm_modname = "entry_native",  // ← ArkTS 使用这个名字
    .nm_priv = ((void*)0),
    .reserved = { 0 },
};

// 注册模块
extern "C" __attribute__((constructor)) void RegisterModule(void) {
    napi_module_register(&entryModule);
}
```

### ArkTS 调用示例

```typescript
import entry_native from "libentry.so";
import hilog from '@ohos.hilog';

@Entry
@Component
struct Index {
  @State result: number = 0;

  build() {
    Column() {
      Text('NAPI 示例')
        .fontSize(30)
        .margin({ bottom: 20 })

      Button('计算 10 + 20')
        .onClick(() => {
          try {
            this.result = entry_native.add(10, 20);
            hilog.info(0x0000, 'Entry', 'Result: %d', this.result);
          } catch (error) {
            hilog.error(0x0000, 'Entry', 'Error: %s', JSON.stringify(error));
          }
        })

      Text(`结果: ${this.result}`)
        .fontSize(20)
        .fontColor('#4A90E2')
        .margin({ top: 10 })
    }
    .width('100%')
    .height('100%')
    .justifyContent(FlexAlign.Center)
  }
}
```

---

## 🔍 常见问题

### Q1: 为什么需要两个 CMakeLists.txt？

**答案**：分层设计，职责分离

- **主 CMakeLists.txt**：构建 NAPI 模块，管理整体依赖
- **子 CMakeLists.txt**（3rd/native_add）：构建第三方库

**好处**：

- 模块化：每个模块独立构建
- 可复用：第三方库可以在多个项目中使用
- 清晰：构建逻辑分层清晰

### Q2: PUBLIC vs PRIVATE 如何选择？

**PUBLIC 适用场景**：

```cmake
# 公开接口：用户需要包含这些头文件
target_include_directories(entry PUBLIC
    ${CMAKE_CURRENT_SOURCE_DIR}
)

# 公共依赖：用户也需要这个库
target_link_libraries(entry PUBLIC
    ace_napi.z  # 用户也需要 NAPI 功能
)
```

**PRIVATE 适用场景**：

```cmake
# 内部实现：用户不需要知道这些
target_include_directories(entry PRIVATE
    ${CMAKE_CURRENT_SOURCE_DIR}/internal
)

# 内部依赖：用户不需要这个库
target_link_libraries(entry PRIVATE
    internal_helper  # 只是内部使用
)
```

### Q3: 如何调试库找不到的问题？

**检查步骤**：

1. **检查库是否存在**：

```bash
# 查找库文件
find entry/libs -name "*.so"

# 应该看到：
# entry/libs/arm64-v8a/libnativeAdd.so
# entry/libs/arm64-v8a/libentry.so
```

2. **检查链接是否正确**：

```cmake
# 在 CMakeLists.txt 中添加
message(STATUS "Libraries: ${CMAKE_CURRENT_BINARY_DIR}/libs")
```

3. **查看编译输出**：

```bash
# 查看编译命令
cmake --build build --verbose
```

---

## 📚 总结

### 构建流程总结

1. **配置阶段**：读取 CMakeLists.txt，设置变量
2. **构建第三方库**：生成 libnativeAdd.so
3. **构建 NAPI 模块**：生成 libentry.so
4. **链接依赖**：将所需的库连接在一起
5. **生成输出**：在指定目录生成最终文件

### 关键命令速查（大白话版）

#### ① add_subdirectory - "先去建那个小工厂"

```cmake
add_subdirectory(${CMAKE_CURRENT_SOURCE_DIR}/3rd/native_add)
```

**大白话**：

- 去 `3rd/native_add` 目录，找到那里的 CMakeLists.txt
- 执行那个文件里的构建命令
- 先把这个"工厂"建好（生成 libnativeAdd.so）
- 然后再回来继续当前的构建

**类比**：就像做菜要先准备食材，这里是先建好第三方库。

**参数**：

- `${CMAKE_CURRENT_SOURCE_DIR}`：当前 CMakeLists.txt 所在目录
- `3rd/native_add`：子目录路径（相对于当前目录）

**执行顺序**：

```
主 CMakeLists.txt 执行到 add_subdirectory
    ↓
暂停当前构建
    ↓
进入 3rd/native_add/CMakeLists.txt
    ↓
执行子目录的构建（生成 libnativeAdd.so）
    ↓
回到主 CMakeLists.txt
    ↓
继续执行后面的命令
```

#### ② add_library - "造一个动态库"

```cmake
add_library(entry SHARED napi_init.cpp)
```

**大白话**：

- `entry`：给这个库起的名字（内部用）
- `SHARED`：做个动态库（.so 文件）
- `napi_init.cpp`：用这个源文件来造

**生成的文件**：

```
libentry.so  ← 最终生成的文件（自动加 lib 前缀和 .so 后缀）
```

**类比**：就像盖房子，`entry` 是房子名，`SHARED` 是建共享房，`napi_init.cpp` 是砖块。

**SHARED vs STATIC**：

| 类型   | 生成什么  | 什么时候链接   | 更新方式           |
| ------ | --------- | -------------- | ------------------ |
| SHARED | libXXX.so | 运行时才加载   | 只需更新 .so 文件  |
| STATIC | libXXX.a  | 编译时打包进去 | 需要重新编译主程序 |

**这里为什么用 SHARED**：

- NAPI 模块需要被 ArkTS 动态加载
- 多个应用可以共享同一个库
- 更新方便，不用重新编译整个应用

#### ③ target_include_directories - "告诉编译器去哪儿找头文件"

```cmake
target_include_directories(entry PUBLIC
    ${CMAKE_CURRENT_SOURCE_DIR}                   # 当前目录
    ${CMAKE_CURRENT_SOURCE_DIR}/3rd/native_add    # 第三方库目录
)
```

**大白话**：

- 告诉编译器：要找头文件时，去这两个地方找
- `PUBLIC`：不仅我能用，用我这个库的人也能用这些路径

**实际效果**：

```cpp
// 在 napi_init.cpp 中可以这样写：
#include "my_header.h"        // 从当前目录找
#include "add.h"              // 从 3rd/native_add 目录找
```

**路径对照**：

```text
路径1: entry/src/main/cpp/          ← 当前目录
      ↓
#include "my_header.h"              ← 在这里找

路径2: entry/src/main/cpp/3rd/native_add/  ← 第三方库目录
      ↓
#include "add.h"                    ← 在这里找
```

**PUBLIC vs PRIVATE**：

| 关键字    | 我用 | 别人用 | 类比 |
| --------- | ---- | ------ | ---- |
| PUBLIC    | ✅   | ✅     | 大门 |
| PRIVATE   | ✅   | ❌     | 卧室 |
| INTERFACE | ❌   | ✅     | 门牌 |

**为什么这里用 PUBLIC**：

- `entry` 库需要的头文件路径，其他使用 `entry` 的库也需要
- 自动继承，不需要手动再设置一遍

#### ④ target_link_libraries - "把这些库都连在一起"

```cmake
target_link_libraries(entry PUBLIC
    ace_napi.z      # NAPI 运行库
    hilog_ndk.z     # 日志库
    nativeAdd       # 刚才建的加法库
)
```

**大白话**：

- 把 `entry` 和这几个库"连线"，让 `entry` 能调用它们的功能
- `PUBLIC`：使用 `entry` 的库也会自动获得这些依赖

**实际效果**：

```cpp
// 在 napi_init.cpp 中可以调用：

#include "napi/native_api.h"  // ← 来自 ace_napi.z
#include <hilog/log.h>        // ← 来自 hilog_ndk.z
#include "add.h"              // ← 来自 nativeAdd

static napi_value Add(napi_env env, napi_callback_info info) {
    // 调用 NAPI 函数（来自 ace_napi.z）
    napi_get_cb_info(env, info, ...);

    // 调用日志函数（来自 hilog_ndk.z）
    HiLog::Info(LABEL, "Add called");

    // 调用加法函数（来自 nativeAdd）
    int result = add(10, 20);

    return result;
}
```

**链接顺序**：

```
libentry.so
    ↓
依赖 → libace_napi.z.so  (提供 NAPI 功能)
    ↓
依赖 → libhilog_ndk.z.so (提供日志功能)
    ↓
依赖 → libnativeAdd.so   (提供加法功能)
```

**PUBLIC 的作用**：

假设有个库 `my_app` 使用 `entry`：

```cmake
target_link_libraries(my_app PRIVATE entry)
```

**自动获得**：

- `my_app` 不需要手动链接 `ace_napi.z`、`hilog_ndk.z`、`nativeAdd`
- 这些依赖会自动传递过来

**不获得**：

- `my_app` 的直接依赖是 `entry`
- `entry` 的内部实现（如某些 PRIVATE 库）不会暴露

#### 完整命令组合示例

**场景**：构建一个 NAPI 模块，调用第三方库

```cmake
# 1. 先建第三方库
add_subdirectory(${CMAKE_CURRENT_SOURCE_DIR}/3rd/native_add)
# → 生成 libnativeAdd.so

# 2. 建 NAPI 模块
add_library(entry SHARED napi_init.cpp)
# → 目标：生成 libentry.so

# 3. 告诉编译器去哪儿找头文件
target_include_directories(entry PUBLIC
    ${CMAKE_CURRENT_SOURCE_DIR}              # 找自己的头文件
    ${CMAKE_CURRENT_SOURCE_DIR}/3rd/native_add  # 找第三方库的头文件
)

# 4. 链接所有需要的库
target_link_libraries(entry PUBLIC
    ace_napi.z   # 和 NAPI 运行库"连线"
    hilog_ndk.z  # 和日志库"连线"
    nativeAdd    # 和加法库"连线"
)
```

**执行后的效果**：

```text
生成的文件:
├── libnativeAdd.so  ← 第三方库
└── libentry.so      ← NAPI 模块

依赖关系:
entry (我们造的)
  ├─→ ace_napi.z   (HarmonyOS提供)
  ├─→ hilog_ndk.z  (HarmonyOS提供)
  └─→ nativeAdd    (刚才造的)

在代码中可以:
napi_init.cpp
  ├─→ 使用 NAPI API    (因为链接了 ace_napi.z)
  ├─→ 使用日志功能    (因为链接了 hilog_ndk.z)
  └─→ 调用 add() 函数 (因为链接了 nativeAdd)
```

### 设计原则

1. **职责分离**：主构建文件管理整体，子构建文件管理局部
2. **依赖透明**：使用 PUBLIC 自动传递依赖
3. **路径清晰**：明确指定所有头文件搜索路径
4. **易于调试**：使用 message 打印关键信息

---

**恭喜你掌握了 CMake 在 NAPI 项目中的完整应用！** 🎉
