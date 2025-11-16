---
title: "CMake实战：从零到生成动态库"
date: 2025-01-27
tags:
  - CMake
  - C++
  - 构建系统
  - 动态库
description: "深入理解 CMake，从最简单的 Hello World 到生成共享库的完整实战教程。"
---

# CMake 实战：从零到生成动态库

> 从最简单的 CMake 起步，一步步理解如何生成共享库（.so 文件），并能被其他程序调用。

## 📖 内容概览

1. CMake 是什么？
2. 最简单的 CMake 项目
3. CMake 核心概念
4. 生成动态库
5. 实战：完整的 CMake 项目
6. 进阶：条件编译和路径管理

---

## 1. CMake 是什么？

### 1.1 为什么需要 CMake？

在学 CMake 之前，让我们看看没有它时的问题：

```bash
# 传统方式编译（手写每个命令）
gcc -c add.c -o add.o
gcc -c main.c -o main.o
gcc main.o add.o -o app

# 问题：命令复杂、难以维护、跨平台困难
```

**CMake 的优势**：

- **跨平台**：Windows、Linux、macOS 都支持
- **自动化**：一次配置，到处编译
- **管理依赖**：自动处理库的依赖关系
- **生成 IDE 项目**：VSCode、Visual Studio、CLion 等

### 1.2 CMake 的三个阶段

```text
1. 配置    →   2. 生成    →   3. 编译
cmake .         make          ./app
                 (生成Makefile)
```

1. **配置阶段**：读取 `CMakeLists.txt`，检查环境
2. **生成阶段**：生成 Makefile 或其他构建文件
3. **编译阶段**：执行编译，生成可执行文件或库

---

## 2. 最简单的 CMake 项目

### 项目结构

```text
hello/
├── CMakeLists.txt
├── main.c
└── README.md
```

### CMakeLists.txt

```cmake
# 告诉 CMake：我需要至少 3.16 版本的 CMake
cmake_minimum_required(VERSION 3.16)

# 定义项目：项目名叫 hello，使用 C 语言
project(hello C)

# 添加可执行文件：名叫 hello_app
# 从 main.c 这个源文件编译而来
add_executable(hello_app main.c)
```

### main.c

```c
#include <stdio.h>

int main() {
    printf("Hello, CMake!\n");
    return 0;
}
```

### 编译运行

```bash
# 创建构建目录
mkdir build
cd build

# 运行 CMake（配置 + 生成）
cmake ..

# 编译
make

# 运行
./hello_app
```

**输出**：

```
Hello, CMake!
```

### 解释每个命令

#### `cmake_minimum_required(VERSION 3.16)`

- **作用**：指定 CMake 的最低版本要求
- **为什么**：不同版本的 CMake 语法可能不同
- **类比**：告诉工人"你得有工具 A 才能干活"

#### `project(hello C)`

- **作用**：定义项目名称和使用的语言
- **参数**：
  - `hello`：项目名称
  - `C`：使用 C 语言（也可以是 CXX/C++ 或两者）
- **类比**：给项目起个名字，说明用什么语言

#### `add_executable(hello_app main.c)`

- **作用**：添加可执行文件目标
- **参数**：
  - `hello_app`：生成的可执行文件名
  - `main.c`：源文件列表
- **类比**：告诉编译器"把 main.c 编译成 hello_app 程序"

---

## 3. CMake 核心概念

### 3.1 变量和路径

```cmake
# CMAKE_CURRENT_SOURCE_DIR：当前 CMakeLists.txt 所在目录
# 例如：/home/user/project

# CMAKE_CURRENT_BINARY_DIR：构建目录（通常是 build/）
# 例如：/home/user/project/build

# CMAKE_SOURCE_DIR：项目根目录
# 例如：/home/user/project
```

**实际使用**：

```cmake
# 设置输出路径
set(OUTPUT_DIR ${CMAKE_CURRENT_SOURCE_DIR}/output)

# 打印调试信息
message(STATUS "Source dir: ${CMAKE_CURRENT_SOURCE_DIR}")
message(STATUS "Binary dir: ${CMAKE_CURRENT_BINARY_DIR}")
```

### 3.2 标准设置

```cmake
# 设置 C 语言标准
set(CMAKE_C_STANDARD 99)
set(CMAKE_C_STANDARD_REQUIRED ON)

# 或者设置 C++ 标准
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
```

### 3.3 条件和消息

```cmake
# IF 条件判断
if(NOT VARIABLE)
    message(WARNING "Variable not set!")
    set(VARIABLE default_value)
endif()

# MESSAGE 消息类型
message(STATUS "Status message")     # 普通信息
message(WARNING "Warning message")   # 警告
message(ERROR "Error message")       # 错误（会停止配置）
```

---

## 4. 生成动态库

### 4.1 什么是动态库？

**静态库 vs 动态库**：

| 特性     | 静态库 (.a)          | 动态库 (.so)       |
| -------- | -------------------- | ------------------ |
| 链接时机 | 编译时嵌入到程序     | 运行时才加载       |
| 文件体积 | 大                   | 小                 |
| 更新     | 需要重新编译整个程序 | 只需更新库文件     |
| 共享性   | 不能共享             | 多个程序共享同一库 |

### 4.2 创建简单的动态库

**项目结构**：

```text
native_add/
├── CMakeLists.txt
├── add.h
└── add.c
```

**CMakeLists.txt**：

```cmake
cmake_minimum_required(VERSION 3.16)
project(native_add C)

# 设置 C 标准
set(CMAKE_C_STANDARD 99)
set(CMAKE_C_STANDARD_REQUIRED ON)

# 生成共享库（动态库）
# nativeAdd 是库名，最终生成 libnativeAdd.so
# SHARED 表示生成共享库
add_library(nativeAdd SHARED
    add.c
)
```

### add.h

```c
#pragma once

#ifdef __cplusplus
extern "C" {
#endif

// 加法函数
int add(int a, int b);

// 减法函数
int subtract(int a, int b);

#ifdef __cplusplus
}
#endif
```

### add.c

```c
#include "add.h"

int add(int a, int b) {
    return a + b;
}

int subtract(int a, int b) {
    return a - b;
}
```

### 编译动态库

```bash
mkdir build && cd build
cmake ..
make
```

**生成的文件**：

```text
build/
└── libnativeAdd.so  ← 这就是生成的动态库
```

### 4.3 使用动态库

**创建测试程序**：

```text
native_add/
├── CMakeLists.txt      ← 修改这个
├── add.h
├── add.c
├── main.c              ← 新增
└── test/
    └── CMakeLists.txt  ← 新增
```

### test/main.c

```c
#include <stdio.h>
#include "add.h"

int main() {
    int result = add(10, 20);
    printf("10 + 20 = %d\n", result);

    result = subtract(30, 10);
    printf("30 - 10 = %d\n", result);

    return 0;
}
```

### test/CMakeLists.txt

```cmake
cmake_minimum_required(VERSION 3.16)
project(native_add_test C)

# 创建可执行文件
add_executable(test_app main.c)

# 链接动态库 nativeAdd
target_link_libraries(test_app PRIVATE nativeAdd)

# 添加头文件搜索路径
target_include_directories(test_app PRIVATE
    ../
)
```

### 根目录 CMakeLists.txt（修改）

```cmake
cmake_minimum_required(VERSION 3.16)
project(native_add C)

# 设置标准
set(CMAKE_C_STANDARD 99)
set(CMAKE_C_STANDARD_REQUIRED ON)

# 生成动态库
add_library(nativeAdd SHARED
    add.c
)

# 公开头文件路径
target_include_directories(nativeAdd PUBLIC
    ${CMAKE_CURRENT_SOURCE_DIR}
)

# 添加子目录（测试程序）
add_subdirectory(test)
```

### 编译和运行

```bash
mkdir build && cd build
cmake ..
make
./test/test_app
```

**输出**：

```text
10 + 20 = 30
30 - 10 = 20
```

---

## 5. 实战：完整的 CMake 项目

### 项目结构

```text
native_add_complete/
├── CMakeLists.txt
├── add.h
├── add.c
└── example/
    ├── CMakeLists.txt
    └── main.c
```

### 根目录 CMakeLists.txt

```cmake
cmake_minimum_required(VERSION 3.16)

# 项目名和语言
project(native_add_complete C)

# C 标准
set(CMAKE_C_STANDARD 99)
set(CMAKE_C_STANDARD_REQUIRED ON)

# 生成共享库
add_library(nativeAdd SHARED
    ${CMAKE_CURRENT_SOURCE_DIR}/add.c
)

# 公开头文件路径（其他程序可以找到 add.h）
target_include_directories(nativeAdd PUBLIC
    ${CMAKE_CURRENT_SOURCE_DIR}
)

# 添加 example 子目录
add_subdirectory(example)
```

### example/CMakeLists.txt

```cmake
# 创建示例程序
add_executable(example_main ../main.c)

# 链接动态库
target_link_libraries(example_main PRIVATE nativeAdd)

# 包含头文件路径
target_include_directories(example_main PRIVATE
    ..
)
```

### example/main.c

```c
#include <stdio.h>
#include "add.h"

int main() {
    printf("=== Native Add Demo ===\n");

    int a = 15, b = 25;
    printf("%d + %d = %d\n", a, b, add(a, b));
    printf("%d - %d = %d\n", a, b, subtract(a, b));

    return 0;
}
```

---

## 6. 进阶：条件编译和路径管理

现在我们来看一个更复杂的 CMakeLists.txt（基于你提供的例子）：

### 项目结构

```text
entry/
└── src/
    └── main/
        └── cpp/
            └── 3rd/
                └── native_add/
                    ├── CMakeLists.txt
                    ├── add.h
                    └── add.c
```

### 完整的 CMakeLists.txt（带详细注释）

```cmake
# 中文注释：仅负责生成"第三方"动态库 libnativeAdd.so
# 并把产物输出到 entry/libs/<ABI>/

# 告诉CMake：我需要至少3.16版本的CMake才能正常工作
cmake_minimum_required(VERSION 3.16)

# 定义项目：项目名叫 native_add_lib，用的是C语言
project(native_add_lib C)

# 设置C语言标准：用C99标准（1999年发布的C语言规范）
set(CMAKE_C_STANDARD 99)
# 要求必须使用这个标准，不能降级
set(CMAKE_C_STANDARD_REQUIRED ON)

# 生成共享库（动态库）：
# 目标名叫 nativeAdd → 实际生成的文件叫 libnativeAdd.so
# 源码文件是 add.c
add_library(nativeAdd SHARED
    ${CMAKE_CURRENT_SOURCE_DIR}/add.c
)

# 公开头文件路径（给其他要使用这个库的程序使用）
# 这样别人就知道去哪里找add.h这样的头文件
target_include_directories(nativeAdd PUBLIC
    ${CMAKE_CURRENT_SOURCE_DIR}
)

# OHOS 构建时会自动告诉我们是什么CPU架构（如 x86_64 / arm64-v8a）
# 如果没收到这个信息，就显示警告并用默认值
if(NOT OHOS_ARCH)
    message(WARNING "OHOS_ARCH not set; default to arm64-v8a")
    set(OHOS_ARCH arm64-v8a)  # 默认用64位ARM架构
endif()

# 设置输出目录：把生成的 libnativeAdd.so 放到 entry/libs/<CPU架构> 文件夹里
# 这样打包时就能自动找到这个库文件
# 当前我们在：entry/src/main/cpp/3rd/native_add 目录
set(OUTPUT_LIB_DIR ${CMAKE_CURRENT_SOURCE_DIR}/../../../../libs/${OHOS_ARCH})
# 确保输出目录存在，如果不存在就创建
file(MAKE_DIRECTORY ${OUTPUT_LIB_DIR})

# 告诉编译系统：把生成的库文件放到我们指定的目录里
set_target_properties(nativeAdd PROPERTIES
    LIBRARY_OUTPUT_DIRECTORY ${OUTPUT_LIB_DIR}
)
```

### 逐行解析

#### 基础设置

```cmake
cmake_minimum_required(VERSION 3.16)
```

- 指定最低 CMake 版本 3.16
- 低于该版本会报错

```cmake
project(native_add_lib C)
```

- 项目名：`native_add_lib`
- 语言：C
- 自动定义变量（如 `CMAKE_PROJECT_NAME`）

```cmake
set(CMAKE_C_STANDARD 99)
set(CMAKE_C_STANDARD_REQUIRED ON)
```

- 启用 C99 标准
- 必须启用，不允许降级

#### 生成库

```cmake
add_library(nativeAdd SHARED
    ${CMAKE_CURRENT_SOURCE_DIR}/add.c
)
```

**参数**：

- `nativeAdd`：目标名，实际输出 `libnativeAdd.so`
- `SHARED`：共享库
- `${CMAKE_CURRENT_SOURCE_DIR}/add.c`：源文件路径

**`add_library` 的三种类型详解**：

**① 动态库（SHARED）**：

```cmake
add_library(entry SHARED napi_init.cpp)
```

- 生成 `.so` 文件
- 多个程序可以共享使用
- 运行时才加载，节省内存
- 可以更新而不重新编译主程序
- **类比**：公共图书馆

**② 静态库（STATIC）**：

```cmake
add_library(entry STATIC napi_init.cpp)
```

- 生成 `.a` 文件
- 代码直接复制到最终程序里
- 编译时就被打包进去
- 运行快，但文件体积大
- **类比**：私人书柜

**③ 模块库（MODULE）**：

```cmake
add_library(entry MODULE napi_init.cpp)
```

- 生成可插拔的模块
- 不被直接链接，可以被动态加载
- **类比**：USB 设备即插即用

**对比表格**：

| 类型      | 用途               | 生成文件               | 类比       |
| --------- | ------------------ | ---------------------- | ---------- |
| SHARED    | 动态链接库         | libXXX.so              | 公共图书馆 |
| STATIC    | 静态链接库         | libXXX.a               | 私人书柜   |
| MODULE    | 插件模块           | XXX.so                 | USB 设备   |
| INTERFACE | 接口库（头文件库） | 不生成文件，只提供路径 | 接口描述   |

#### 包含头文件：PUBLIC、PRIVATE、INTERFACE 详解

```cmake
target_include_directories(nativeAdd PUBLIC
    ${CMAKE_CURRENT_SOURCE_DIR}
)
```

**想象你在建房子**：

**① `PUBLIC` - "完全公开"**：

```cmake
target_include_directories(entry PUBLIC include_dir)
target_link_libraries(entry PUBLIC some_lib)
```

- **用法**：我自己用，来我家的客人也能用
- **类比**：房子的大门，谁都能看到和通过
- **特点**：依赖会传递给所有使用我这个库的人

**② `PRIVATE` - "私人专用"**：

```cmake
target_include_directories(entry PRIVATE internal_dir)
target_link_libraries(entry PRIVATE internal_lib)
```

- **用法**：只有我自己内部使用
- **类比**：房子的卧室，只有自家人能用
- **特点**：依赖不会传递给其他人

**③ `INTERFACE` - "只给客人用"**：

```cmake
target_include_directories(entry INTERFACE header_dir)
target_link_libraries(entry INTERFACE header_only_lib)
```

- **用法**：我自己不用，但来我家的客人需要用
- **类比**：房子的门牌号，我自己不看，但客人需要看
- **特点**：只有头文件库或纯接口库用这个

**实际例子**：

```cmake
# 假设我们在建一个数学库 math_lib

# PUBLIC：数学函数接口，所有人都需要知道
target_include_directories(math_lib PUBLIC
    ${CMAKE_CURRENT_SOURCE_DIR}/include  # 头文件目录，用户需要包含
)

# PRIVATE：内部实现细节，用户不需要知道
target_include_directories(math_lib PRIVATE
    ${CMAKE_CURRENT_SOURCE_DIR}/src/internal  # 内部头文件
)

# PUBLIC：基础数学库，用户也需要链接
target_link_libraries(math_lib PUBLIC
    m  # 数学库 libm.so，用户也需要
)

# PRIVATE：内部优化库，用户不需要知道
target_link_libraries(math_lib PRIVATE
    internal_optimize  # 内部优化库
)

# INTERFACE：只有头文件的模板库
target_include_directories(header_only_lib INTERFACE
    ${CMAKE_CURRENT_SOURCE_DIR}/headers  # 用户需要包含，但库本身不编译
)
```

**主程序使用**：

```cmake
# 用户只需要这样：
target_link_libraries(app PUBLIC math_lib)

# 自动获得：
# - math_lib 的 PUBLIC 头文件路径
# - math_lib 的 PUBLIC 链接库（如 libm.so）
# - 但不会获得 PRIVATE 的内部细节
```

**总结表格**：

| 关键字    | 自己用 | 别人用 | 类比 |
| --------- | ------ | ------ | ---- |
| PUBLIC    | ✅     | ✅     | 大门 |
| PRIVATE   | ✅     | ❌     | 卧室 |
| INTERFACE | ❌     | ✅     | 门牌 |

**记忆技巧**：

- `PUBLIC` = 完全公开
- `PRIVATE` = 私人专用
- `INTERFACE` = 只给接口

**好处**：依赖关系清晰，不会把内部实现细节泄露给用户

#### 条件编译

```cmake
if(NOT OHOS_ARCH)
    message(WARNING "OHOS_ARCH not set; default to arm64-v8a")
    set(OHOS_ARCH arm64-v8a)
endif()
```

**说明**：

- `if(NOT OHOS_ARCH)`：未定义则执行
- `message()`：打印警告
- `set()`：设置默认值

**变量与判断**：

```cmake
# 字符串比较
if(VARIABLE EQUAL "value")
    # ...
endif()

# 数值比较
if(NUMBER GREATER 5)
    # ...
endif()

# 布尔判断
if(VARIABLE)
    # 已定义且非空
endif()

if(NOT VARIABLE)
    # 未定义或为空
endif()
```

#### 路径管理

```cmake
set(OUTPUT_LIB_DIR ${CMAKE_CURRENT_SOURCE_DIR}/../../../../libs/${OHOS_ARCH})
```

当前目录示例：

```text
entry/src/main/cpp/3rd/native_add  ← 当前目录（CMakeLists.txt在这里）
         ↑        ↑   ↑     ↑        ← 到根目录需要往上级4次
```

解析：

```text
CMAKE_CURRENT_SOURCE_DIR = entry/src/main/cpp/3rd/native_add
                  .. = ../../../                              (回到 cpp)
                  .. = ../../../../../                        (回到 main)
                  .. = ../../../../../../                     (回到 src)
                  .. = ../../../../../../../                  (回到 entry)
libs/${OHOS_ARCH} = ../../../../libs/arm64-v8a

最终输出目录：
entry/libs/arm64-v8a/
```

**路径分隔与变量**：

```cmake
# 使用 ${} 获取变量值
set(MY_PATH ${CMAKE_SOURCE_DIR}/include)

# 路径拼接
set(OUTPUT_PATH "${CMAKE_BINARY_DIR}/libs")
```

#### 创建目录

```cmake
file(MAKE_DIRECTORY ${OUTPUT_LIB_DIR})
```

`file()` 示例：

```cmake
# 创建目录
file(MAKE_DIRECTORY ${OUTPUT_LIB_DIR})

# 读取文件
file(READ filename.txt variable)

# 写入文件
file(WRITE filename.txt "content")

# 复制文件
file(COPY ${SRC_FILE} DESTINATION ${DEST_DIR})
```

#### 设置输出目录

```cmake
set_target_properties(nativeAdd PROPERTIES
    LIBRARY_OUTPUT_DIRECTORY ${OUTPUT_LIB_DIR}
)
```

**作用**：指定库文件输出目录

输出属性：

| 属性                       | 说明               |
| -------------------------- | ------------------ |
| `LIBRARY_OUTPUT_DIRECTORY` | 动态库输出目录     |
| `ARCHIVE_OUTPUT_DIRECTORY` | 静态库输出目录     |
| `RUNTIME_OUTPUT_DIRECTORY` | 可执行文件输出目录 |

**示例**：

```cmake
# 设置输出目录
set_target_properties(myLib PROPERTIES
    LIBRARY_OUTPUT_DIRECTORY ${OUTPUT_DIR}/libs
    ARCHIVE_OUTPUT_DIRECTORY ${OUTPUT_DIR}/libs
)
```

---

## 7. 实战总结

### 大白话总结

这个 CMakeLists.txt 所做的工作：

1. 要求：需要 CMake 3.16 以上
2. 项目：叫做 native_add_lib 的 C 语言项目
3. 产品：生产 libnativeAdd.so
4. 原料：用 add.c 生产
5. 说明书：把头文件路径公开
6. 适配：根据 CPU（ARM/Intel）选文件夹
7. 存放：放到 entry/libs/ 对应架构

### 学习路径建议

1. 先跑通简单示例（Hello World）
2. 理解变量、路径、子项目
3. 区分静态/动态库与输出目录
4. 掌握属性、条件、目录操作
5. 选一个真实项目实践

### 常用命令速查

```cmake
# 基础
cmake_minimum_required(VERSION x.y)
project(name LANGUAGES C CXX)

# 添加目标
add_executable(name sources...)
add_library(name SHARED sources...)
add_library(name STATIC sources...)

# 链接
target_link_libraries(target PRIVATE library)
target_include_directories(target PUBLIC path)

# 子目录
add_subdirectory(subdir)

# 设置变量
set(VARIABLE value)
set(CMAKE_C_STANDARD 99)

# 输出属性
set_target_properties(target PROPERTIES
    LIBRARY_OUTPUT_DIRECTORY path
)

# 文件操作
file(MAKE_DIRECTORY path)

# 消息
message(STATUS "info")
message(WARNING "warning")
```

---

**恭喜你掌握了 CMake 从零到生成动态库的完整流程！** 🎉
