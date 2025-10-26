---
title: NAPI 原生模块接口入门指南
date: 2025-01-27
tags:
  - HarmonyOS
  - NAPI
  - 原生开发
  - C/C++
  - Rust
  - ArkTS
---

> NAPI（Native API）是 OpenHarmony/HarmonyOS 系统中的原生模块接口，它允许 JavaScript/ArkTS 代码调用 C/C++ 原生代码，提供高性能计算能力，访问系统底层能力，并复用现有的 C/C++ 库。

## 📚 什么是 NAPI？

NAPI（Native API）是 OpenHarmony/HarmonyOS 系统中的原生模块接口，它允许：

- **JavaScript/ArkTS 代码调用 C/C++ 原生代码**
- **提供高性能计算能力**（如 AI 推理）
- **访问系统底层能力**
- 复用现有的 C/C++ 库

## 🎯 NAPI 的核心价值

### 1. 性能提升

通过调用原生代码，可以获得接近原生的性能，特别适合：

- 图像处理
- 加密解密
- 数据压缩
- AI 模型推理
- 大量计算密集型任务

### 2. 系统能力访问

可以访问 HarmonyOS 系统底层能力：

- 硬件抽象层（HAL）
- 驱动接口
- 系统服务
- 设备管理

### 3. 代码复用

可以复用现有的 C/C++ 库：

- OpenCV（图像处理）
- TensorFlow Lite（AI 推理）
- FFmpeg（音视频处理）
- SQLite（数据库）
- 其他成熟的 C/C++ 库

## 🔧 NAPI 开发环境

### 前置要求

- **DevEco Studio** 4.0+
- **HarmonyOS SDK** 4.0+
- **C/C++ 编译器**（CMake）
- **NDK**（Native Development Kit）

### 项目结构

```text
MyApplication
├── entry
│   ├── src
│   │   ├── main
│   │   │   ├── cpp
│   │   │   │   ├── CMakeLists.txt      # C/C++ 构建配置
│   │   │   │   └── native_module.cpp   # 原生模块实现
│   │   │   ├── ets
│   │   │   │   └── pages
│   │   │   │       └── Index.ets       # ArkTS 调用代码
│   │   │   └── resources
```

## 💻 快速开始

### 1. 创建 NAPI 模块

在 `entry/src/main/cpp/` 目录下创建 `native_module.cpp`：

```cpp
#include "napi/native_api.h"

// 导出函数：计算两个数的和
static napi_value Add(napi_env env, napi_callback_info info)
{
    size_t argc = 2;
    napi_value args[2];
    napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);

    // 获取参数
    double a, b;
    napi_get_value_double(env, args[0], &a]);
    napi_get_value_double(env, args[1], &b);

    // 计算结果
    double result = a + b;

    // 返回结果
    napi_value returnValue;
    napi_create_double(env, result, &returnValue);
    return returnValue;
}

// 模块导出
EXTERN_C_START
static napi_value Init(napi_env env, napi_value exports)
{
    napi_property_descriptor desc[] = {
        {"add", nullptr, Add, nullptr, nullptr, nullptr, napi_default, nullptr}
    };
    napi_define_properties(env, exports, sizeof(desc) / sizeof(desc[0]), desc);
    return exports;
}
EXTERN_C_END

static napi_module demoModule = {
    .nm_version = 1,
    .nm_flags = 0,
    .nm_filename = nullptr,
    .nm_register_func = Init,
    .nm_modname = "native_module",
    .nm_priv = ((void*)0),
    .reserved = { 0 },
};

extern "C" __attribute__((constructor)) void RegisterModule(void)
{
    napi_module_register(&demoModule);
}
```

### 2. 配置 CMakeLists.txt

在 `entry/src/main/cpp/` 目录下创建 `CMakeLists.txt`：

```cmake
cmake_minimum_required(VERSION 3.4.1)
project(native_module)

add_library(native_module SHARED
    native_module.cpp
)

target_link_libraries(native_module PUBLIC libace_napi.z.so)
```

### 3. ArkTS 调用原生模块

在 `entry/src/main/ets/pages/Index.ets` 中：

```typescript
import native_module from 'libnative_module.so';

@Entry
@Component
struct Index {
  @State result: number = 0;

  build() {
    Column() {
      Text('NAPI 示例')
        .fontSize(30)
        .fontWeight(FontWeight.Bold)
        .margin({ bottom: 20 })

      Button('计算 10 + 20')
        .onClick(() => {
          try {
            this.result = native_module.add(10, 20);
          } catch (error) {
            console.error('调用原生模块失败:', error);
          }
        })
        .margin({ bottom: 10 })

      Text(`结果: ${this.result}`)
        .fontSize(20)
        .fontColor('#4A90E2')
    }
    .width('100%')
    .height('100%')
    .justifyContent(FlexAlign.Center)
  }
}
```

## 📦 .so 文件详解

### 什么是 .so 文件？

`.so` 文件是 **Shared Object（共享对象）**的缩写，在 Linux/Unix/HarmonyOS 系统中相当于 Windows 中的 `.dll`（动态链接库）文件。

### 文件类型对比

| 文件类型 | 平台                         | 描述       |
| -------- | ---------------------------- | ---------- |
| `.so`    | Linux/Unix/Android/HarmonyOS | 动态链接库 |
| `.dll`   | Windows                      | 动态链接库 |
| `.a`     | Linux/Unix                   | 静态链接库 |
| `.lib`   | Windows                      | 静态链接库 |

### 动态库 vs 静态库

#### 静态库 (.a)

- ✅ 编译时直接嵌入到可执行文件中
- ✅ 部署简单，不依赖外部库
- ❌ 文件体积较大
- ❌ 更新时需要重新编译整个应用

#### 动态库 (.so)

- ✅ 运行时才加载
- ✅ 多个程序可共享同一个库
- ✅ 文件体积较小
- ✅ 库更新无需重新编译应用
- ⚠️ 需要确保目标系统有相应的库

### 在 HarmonyOS 中使用 .so 文件

#### 1. 编译生成 .so 文件

通过 CMake 配置编译为动态库：

```cmake
cmake_minimum_required(VERSION 3.4.1)
project(native_module)

# 编译为动态库（SHARED）
add_library(native_module SHARED
    native_module.cpp
)

# 链接系统库
target_link_libraries(native_module PUBLIC libace_napi.z.so)
```

编译后会生成：

- `libnative_module.so` - 动态库文件
- 位于 `entry/build/default/intermediates/libs/arm64-v8a/` 目录

#### 2. 在 ArkTS 中导入 .so 文件

```typescript
// 导入动态库
import native_module from "libnative_module.so";

// 调用原生函数
const result = native_module.add(10, 20);
```

#### 3. .so 文件命名规则

HarmonyOS 中的 .so 文件命名：

```text
lib<模块名>.so
```

例如：

- `libnative_module.so` - 原生模块
- `libace_napi.z.so` - NAPI 系统库
- `libc++.so` - C++ 标准库

### .so 文件的优势

1. **模块化开发**：将功能封装为独立模块
2. **代码复用**：多个应用可共享同一个库
3. **按需加载**：只在需要时加载，节省内存
4. **独立更新**：库更新不影响应用主体
5. **性能优化**：原生代码执行效率高

### 常见问题

#### Q: .so 文件找不到怎么办？

```typescript
// ❌ 错误：路径不正确
import module from "native_module.so";

// ✅ 正确：使用 lib 前缀
import module from "libnative_module.so";
```

#### Q: 如何调试 .so 文件？

```bash
# 查看 .so 文件信息
readelf -d libnative_module.so

# 查看符号表
nm -D libnative_module.so

# 使用 ldd 查看依赖（Linux）
ldd libnative_module.so
```

#### Q: 如何减小 .so 文件体积？

```cmake
# 使用 Release 模式编译
set(CMAKE_BUILD_TYPE Release)

# 启用链接时优化
set(CMAKE_CXX_FLAGS_RELEASE "-O3 -flto")

# 去除调试信息
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -s")
```

### 多架构支持

HarmonyOS 支持多种 CPU 架构：

```text
entry/build/default/intermediates/libs/
├── arm64-v8a/          # 64 位 ARM
│   └── libnative_module.so
├── armeabi-v7a/        # 32 位 ARM
│   └── libnative_module.so
└── x86_64/             # 64 位 x86
    └── libnative_module.so
```

在 `build-profile.json5` 中配置：

```json5
{
  apiType: "stageMode",
  buildOption: {
    arkOptions: {
      runtimeOnly: false,
    },
  },
  targets: [
    {
      name: "default",
      compileSdkVersion: 9,
      compatibleSdkVersion: 9,
    },
  ],
}
```

## 📖 NAPI 常用 API

### 数据类型转换

#### JavaScript → C/C++

```cpp
// 获取数字
double value;
napi_get_value_double(env, jsValue, &value);

// 获取字符串
size_t strLen;
napi_get_value_string_utf8(env, jsValue, nullptr, 0, &strLen);
char* buffer = new char[strLen + 1];
napi_get_value_string_utf8(env, jsValue, buffer, strLen + 1, &strLen);

// 获取布尔值
bool boolValue;
napi_get_value_bool(env, jsValue, &boolValue);
```

#### C/C++ → JavaScript

```cpp
// 创建数字
napi_value jsNumber;
napi_create_double(env, 3.14, &jsNumber);

// 创建字符串
napi_value jsString;
napi_create_string_utf8(env, "Hello", NAPI_AUTO_LENGTH, &jsString);

// 创建布尔值
napi_value jsBool;
napi_get_boolean(env, true, &jsBool);
```

### 对象操作

```cpp
// 创建对象
napi_value obj;
napi_create_object(env, &obj);

// 设置属性
napi_value propValue;
napi_create_string_utf8(env, "value", NAPI_AUTO_LENGTH, &propValue);
napi_set_named_property(env, obj, "name", propValue);

// 获取属性
napi_value prop;
napi_get_named_property(env, obj, "name", &prop);
```

### 数组操作

```cpp
// 创建数组
napi_value arr;
napi_create_array(env, &arr);

// 设置数组元素
napi_value element;
napi_create_double(env, 1.0, &element);
napi_set_element(env, arr, 0, element);

// 获取数组长度
uint32_t length;
napi_get_array_length(env, arr, &length);

// 获取数组元素
napi_value element;
napi_get_element(env, arr, 0, &element);
```

## 🎨 实战案例

### 案例 1：图像处理

```cpp
#include "napi/native_api.h"
#include <opencv2/opencv.hpp>

static napi_value ProcessImage(napi_env env, napi_callback_info info)
{
    // 获取参数（图像数据）
    size_t argc = 1;
    napi_value args[1];
    napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);

    // 从 JavaScript 获取图像数据
    uint8_t* imageData;
    size_t length;
    napi_get_buffer_info(env, args[0], (void**)&imageData, &length);

    // 使用 OpenCV 处理图像
    cv::Mat image = cv::imdecode(cv::Mat(1, length, CV_8UC1, imageData), cv::IMREAD_COLOR);
    cv::Mat gray;
    cv::cvtColor(image, gray, cv::COLOR_BGR2GRAY);

    // 返回处理后的图像数据
    std::vector<uchar> buffer;
    cv::imencode(".jpg", gray, buffer);

    napi_value result;
    napi_create_buffer_copy(env, buffer.size(), buffer.data(), nullptr, &result);
    return result;
}
```

### 案例 2：AI 推理

```cpp
#include "napi/native_api.h"
#include "tensorflow/lite/interpreter.h"

static napi_value RunInference(napi_env env, napi_callback_info info)
{
    // 获取输入数据
    size_t argc = 1;
    napi_value args[1];
    napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);

    float* inputData;
    size_t length;
    napi_get_arraybuffer_info(env, args[0], (void**)&inputData, &length);

    // 运行 AI 推理
    // ... TensorFlow Lite 推理代码 ...

    // 返回结果
    napi_value result;
    napi_create_arraybuffer(env, outputSize * sizeof(float), nullptr, &result);
    return result;
}
```

## ⚠️ 注意事项

### 1. 内存管理

```cpp
// ❌ 错误：忘记释放内存
char* buffer = new char[1024];
// 使用 buffer
// 忘记 delete[]

// ✅ 正确：使用智能指针或 RAII
std::unique_ptr<char[]> buffer(new char[1024]);
// 自动释放
```

### 2. 异常处理

```cpp
// 检查 NAPI 调用是否成功
napi_status status = napi_get_value_double(env, value, &result);
if (status != napi_ok) {
    // 处理错误
    napi_throw_error(env, nullptr, "Failed to get double value");
    return nullptr;
}
```

### 3. 线程安全

```cpp
// NAPI 不是线程安全的
// 不要在多线程中直接调用 NAPI API

// 如果需要在后台线程工作
// 使用 napi_create_async_work 创建异步任务
```

## 📚 进阶主题

### 异步操作

```cpp
struct AsyncData {
    napi_async_work work;
    napi_deferred deferred;
    // 其他数据
};

static void AsyncWorkExecute(napi_env env, void* data)
{
    AsyncData* asyncData = (AsyncData*)data;
    // 在后台线程执行耗时操作
}

static void AsyncWorkComplete(napi_env env, napi_status status, void* data)
{
    AsyncData* asyncData = (AsyncData*)data;
    // 返回结果给 JavaScript
    napi_resolve_deferred(env, asyncData->deferred, result);
    napi_delete_async_work(env, asyncData->work);
    delete asyncData;
}
```

### 回调函数

```cpp
static napi_value CallCallback(napi_env env, napi_callback_info info)
{
    // 获取回调函数
    napi_value callback;
    napi_get_cb_info(env, info, nullptr, nullptr, nullptr, &callback);

    // 调用回调
    napi_value result;
    napi_create_string_utf8(env, "Hello from native", NAPI_AUTO_LENGTH, &result);
    napi_value argv[1] = { result };
    napi_value global;
    napi_get_global(env, &global);
    napi_call_function(env, global, callback, 1, argv, nullptr);

    return nullptr;
}
```

## 🔗 相关资源

### 官方文档

- [HarmonyOS NAPI 开发指南](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides-V13/napi-overview-V13)
- [NAPI 参考文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references-V13/napi-overview-V13)

### 示例代码

- [OpenHarmony NAPI 示例](https://gitee.com/openharmony-sig/napi-examples)
- [HarmonyOS 示例代码](https://gitee.com/openharmony)

### 推荐阅读

- [Node.js NAPI 文档](https://nodejs.org/api/n-api.html)（API 相似）
- [OpenHarmony 原生开发](https://docs.openharmony.cn/)

## 💡 最佳实践

1. **性能优先**：只在需要高性能或系统能力时使用 NAPI
2. **错误处理**：始终检查 NAPI 调用的返回值
3. **内存管理**：使用智能指针或 RAII 模式
4. **类型安全**：使用 TypeScript 类型定义
5. **测试覆盖**：为原生模块编写单元测试

## 🦀 Rust NAPI 模块语法

### 导入语句解析

```rust
use napi::bindgen_prelude::*;
use napi::{Env, JsObject, Result};
use napi_derive::napi;
use napi_derive::{module_exports, napi};
```

#### 1. `use napi::bindgen_prelude::*;`

**作用**：导入 NAPI 的预绑定模块，包含常用的类型和宏

**包含的内容**：

- `JsFunction` - JavaScript 函数类型
- `JsNumber` - JavaScript 数字类型
- `JsString` - JavaScript 字符串类型
- `JsObject` - JavaScript 对象类型
- `JsArray` - JavaScript 数组类型
- `JsBuffer` - JavaScript 缓冲区类型
- `JsPromise` - JavaScript Promise 类型
- `JsUndefined` - JavaScript undefined 类型
- `JsNull` - JavaScript null 类型
- `JsBoolean` - JavaScript 布尔类型
- `JsDate` - JavaScript 日期类型
- `JsError` - JavaScript 错误类型

**使用示例**：

```rust
use napi::bindgen_prelude::*;

#[napi]
fn add(a: f64, b: f64) -> f64 {
    a + b
}
```

#### 2. `use napi::{Env, JsObject, Result};`

**作用**：导入 NAPI 核心类型

**包含的内容**：

- `Env` - NAPI 环境句柄，用于访问 JavaScript 环境
- `JsObject` - JavaScript 对象包装器
- `Result<T>` - NAPI 操作的结果类型

**使用示例**：

```rust
use napi::{Env, JsObject, Result};

#[napi]
fn create_object(env: Env) -> Result<JsObject> {
    let mut obj = env.create_object()?;
    obj.set_named_property("name", env.create_string("Hello")?)?;
    Ok(obj)
}
```

#### 3. `use napi_derive::napi;`

**作用**：导入 `napi` 过程宏，用于自动生成 NAPI 绑定代码

**功能**：

- 自动生成函数导出代码
- 自动处理类型转换
- 自动生成错误处理

**使用示例**：

```rust
use napi_derive::napi;

#[napi]
fn fibonacci(n: u32) -> u32 {
    match n {
        0 => 0,
        1 => 1,
        _ => fibonacci(n - 1) + fibonacci(n - 2),
    }
}
```

#### 4. `use napi_derive::{module_exports, napi};`

**作用**：导入模块导出宏

**功能**：

- `napi` - 标记函数为 NAPI 导出函数
- `module_exports` - 标记模块导出函数

**使用示例**：

```rust
use napi_derive::{module_exports, napi};

// 导出函数
#[napi]
fn add(a: f64, b: f64) -> f64 {
    a + b
}

// 导出模块
#[module_exports]
fn init(module: &mut JsObject) -> Result<()> {
    module.create_named_method("add", add)?;
    Ok(())
}
```

### 完整的 Rust NAPI 模块示例

```rust
use napi::bindgen_prelude::*;
use napi::{Env, JsObject, Result};
use napi_derive::napi;

// 导出普通函数
#[napi]
fn add(a: f64, b: f64) -> f64 {
    a + b
}

// 导出异步函数
#[napi]
async fn async_add(a: f64, b: f64) -> f64 {
    tokio::time::sleep(tokio::time::Duration::from_millis(100)).await;
    a + b
}

// 导出结构体
#[napi]
struct Calculator {
    value: f64,
}

#[napi]
impl Calculator {
    #[napi(constructor)]
    pub fn new(value: f64) -> Self {
        Calculator { value }
    }

    #[napi]
    pub fn add(&mut self, n: f64) -> f64 {
        self.value += n;
        self.value
    }

    #[napi]
    pub fn get_value(&self) -> f64 {
        self.value
    }
}

// 导出常量
#[napi]
const PI: f64 = 3.141592653589793;

// 导出枚举
#[napi]
enum Operation {
    Add,
    Subtract,
    Multiply,
    Divide,
}

#[napi]
fn calculate(op: Operation, a: f64, b: f64) -> f64 {
    match op {
        Operation::Add => a + b,
        Operation::Subtract => a - b,
        Operation::Multiply => a * b,
        Operation::Divide => a / b,
    }
}
```

### Rust vs C++ NAPI 对比

| 特性         | C++      | Rust             |
| ------------ | -------- | ---------------- |
| **内存安全** | 手动管理 | 编译器保证       |
| **类型系统** | 手动转换 | 自动推导         |
| **宏支持**   | 有限     | 强大的过程宏     |
| **异步支持** | 手动实现 | 原生 async/await |
| **错误处理** | 手动检查 | Result 类型      |
| **代码生成** | 手动编写 | 自动生成         |

### Rust NAPI 的优势

1. **内存安全**：编译器保证，无需手动管理
2. **类型安全**：编译时检查，减少运行时错误
3. **自动转换**：宏自动处理 JavaScript 和 Rust 类型转换
4. **异步支持**：原生支持 async/await
5. **错误处理**：Result 类型统一处理错误

### 在 HarmonyOS 中使用 Rust NAPI

#### 1. 配置 Cargo.toml

```toml
[package]
name = "native_module"
version = "0.1.0"
edition = "2021"

[lib]
crate-type = ["cdylib"]

[dependencies]
napi = { version = "2", features = ["tokio_rt"] }
napi-derive = "2"
tokio = { version = "1", features = ["rt", "rt-multi-thread"] }
```

#### 2. 构建配置

```bash
# 安装 Rust 工具链
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# 添加目标架构
rustup target add aarch64-linux-android

# 构建 .so 文件
cargo build --target aarch64-linux-android --release
```

#### 3. ArkTS 调用

```typescript
import native_module from "libnative_module.so";

// 调用 Rust 函数
const result = native_module.add(10, 20);
console.log(result); // 30

// 使用 Rust 结构体
const calc = new native_module.Calculator(10);
calc.add(5);
console.log(calc.getValue()); // 15

// 调用异步函数
const asyncResult = await native_module.asyncAdd(10, 20);
console.log(asyncResult); // 30
```

### Rust NAPI 常见问题

#### Q: Rust NAPI 和 C++ NAPI 可以混用吗？

```rust
// ✅ 可以，但需要分别编译
// C++ 模块
// libnative_module_cpp.so

// Rust 模块
// libnative_module_rust.so
```

#### Q: 如何处理 Rust 错误？

```rust
use napi::Result;

#[napi]
fn divide(a: f64, b: f64) -> Result<f64> {
    if b == 0.0 {
        return Err(napi::Error::from_reason("Division by zero"));
    }
    Ok(a / b)
}
```

#### Q: 如何导出复杂类型？

```rust
use napi::bindgen_prelude::*;

#[napi]
struct Point {
    x: f64,
    y: f64,
}

#[napi]
impl Point {
    #[napi]
    fn distance(&self, other: &Point) -> f64 {
        ((self.x - other.x).powi(2) + (self.y - other.y).powi(2)).sqrt()
    }
}
```

## 🎓 学习路径

### 初学者

1. 学习 C/C++ 基础
2. 了解 NAPI 基本 API
3. 实现简单的计算函数
4. 学习数据类型转换

### 进阶开发者

1. 掌握异步操作
2. 学习回调函数
3. 集成第三方库
4. 性能优化技巧
5. **学习 Rust NAPI**（新增）

### 专家级

1. 自定义数据结构
2. 复杂内存管理
3. 多线程编程
4. 系统级优化
5. **Rust 与 C++ 混合开发**（新增）

---

**让我们一起探索 HarmonyOS 原生开发的无限可能！** 🚀
