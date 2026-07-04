---
title: "53. 条件编译（#if、#ifdef、#ifndef）"
date: "2026-07-04"
lang: "zh-CN"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "06-编译与构建"
  - "中文"
description: "The Little Book of C 中文版 — 53. 条件编译（#if、#ifdef、#ifndef）"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
translator: "机器辅助翻译（Google Translate）"
section: 53
sidebarWeight: 53
alternateZh: "/posts/c教程/zh-CN/06-编译与构建/053-Conditional Compilation (%23if, %23ifdef, %23ifndef)"
alternateEn: "/posts/c教程/en-US/06-Compilation and Build/053-Conditional Compilation (%23if, %23ifdef, %23ifndef)"
---

[English version](/posts/c教程/en-US/06-Compilation and Build/053-Conditional Compilation (%23if, %23ifdef, %23ifndef))

条件编译允许您控制编译哪些代码，不是在运行时，而是在编译时。这就是 C 程序如何适应不同的操作系统、体系结构或构建配置，而无需手动更改源文件。

将其视为仅编译器可见的逻辑。

#### 步骤 1. 为什么存在条件编译

大型 C 程序通常需要处理差异，例如：

- 平台（Windows、Linux、macOS、嵌入式）
- 编译器（gcc、clang、MSVC）
- 调试与发布版本
- 可选功能或实验模块

您可以使用条件指令有选择地包含或排除代码，而不是维护同一文件的多个版本。

#### 步骤 2. 核心指令

|指令|目的|
| --- | --- |
|`#if `|如果表达式为 true 则编译代码 |
|`#ifdef `|如果定义了宏则编译 |
|`#ifndef `|如果未定义宏则编译 |
|`#else`|备用块 |
|`#elif `|预处理器的 else-if |
|`#endif`|标记条件块的结束 |

这些仅在编译开始之前的预处理期间起作用。

#### 小代码：特定于平台的编译

```
#include <stdio.h>
int main(void) {
#ifdef _WIN32
    printf("Running on Windows\n");
#elif __linux__
    printf("Running on Linux\n");
#elif __APPLE__
    printf("Running on macOS\n");
#else
    printf("Unknown platform\n");
#endif
    return 0;
}
```

在您的系统上编译并运行。输出将取决于编译器自动设置的预定义宏。

#### 步骤 3. 启用和禁用功能

您可以在编译时定义标志`-D`:

```
gcc -DDEBUG log.c -o log
```

在你的代码中：

```
#ifdef DEBUG
    printf("Debug mode: extra checks enabled\n");
#endif
```

切换无需重新编译，只需重新运行`gcc`有或没有`-DDEBUG`.

您还可以指定值：

```
gcc -DVERSION=2 main.c -o main
```

然后：

```
#if VERSION >= 2
    printf("New feature enabled!\n");
#endif
```

#### 步骤 4. 使用 #ifndef 保护代码

这是 C 头文件中最常见的习惯用法之一：

```
#ifndef CONFIG_H
#define CONFIG_H
#define MAX_CLIENTS 100
#define TIMEOUT_MS 3000
#endif
```

它确保如果`config.h`被包含多次，它只被处理一次。 C 标准库中的每个头文件都使用此模式。

#### 步骤 5. 排除实验代码

```
#define ENABLE_EXPERIMENTAL 0
#if ENABLE_EXPERIMENTAL
void experimental_feature() {
    printf("Running experimental feature\n");
}
#endif
```

如果`ENABLE_EXPERIMENTAL`设置为`0`，这段代码在编译之前就被完全删除了，它甚至不存在于目标文件中。

#### 小代码：调试模式示例

```
#include <stdio.h>
#define DEBUG_MODE 1
void compute(int x) {
#if DEBUG_MODE
    printf("[DEBUG] compute() called with x=%d\n", x);
#endif
    printf("Result: %d\n", x * x);
}
int main(void) {
    compute(5);
    return 0;
}
```

输出时`DEBUG_MODE`是 1：

```
[DEBUG] compute() called with x=5
Result: 25
```

放`DEBUG_MODE`为0，重新编译，`[DEBUG]`消息完全消失。

#### 步骤 6. 使用 #elif 和 #else

```
#define OS 2
#if OS == 1
    #define OS_NAME "Windows"
#elif OS == 2
    #define OS_NAME "Linux"
#else
    #define OS_NAME "Unknown"
#endif
int main(void) {
    printf("OS: %s\n", OS_NAME);
    return 0;
}
```

输出：

```
OS: Linux
```

#### 步骤 7. 与逻辑运算符组合

您可以使用`&&`,`||`， 和`!`在预处理器条件下。

```
#if defined(DEBUG) && !defined(RELEASE)
    printf("Debug build only\n");
#endif
```

您甚至可以使用数字比较：

```
#if VERSION >= 3
    printf("Version 3+ detected\n");
#endif
```

#### 步骤 8. 强制编译错误

有时，如果缺少所需的宏，您想停止编译：

```
#ifndef API_KEY
#error "API_KEY not defined! Please compile with -DAPI_KEY=your_key"
#endif
```

这对于构建时的配置验证很有用。

#### 步骤 9. 编译器特定的宏

编译器自动定义宏来识别自身和环境。

|宏|意义|
| --- | --- |
|`__GNUC__`|由 GCC 定义 |
|`__clang__`|由 Clang 定义 |
|`_MSC_VER`|由 MSVC 定义 |
|`__x86_64__`| 64 位架构 |
|`__arm__`,`__aarch64__`| ARM 架构 |
|`__STDC__`|符合ANSI C标准|

您可以使用它们来编写可移植的自适应代码：

```
#ifdef __clang__
    printf("Compiled with Clang\n");
#elif defined(__GNUC__)
    printf("Compiled with GCC\n");
#endif
```

#### 小代码：便携式睡眠功能

```
#include <stdio.h>
#ifdef _WIN32
    #include <windows.h>
    #define SLEEP(ms) Sleep(ms)
#else
    #include <unistd.h>
    #define SLEEP(ms) usleep((ms) * 1000)
#endif
int main(void) {
    printf("Waiting...\n");
    SLEEP(1000);
    printf("Done!\n");
    return 0;
}
```

这可以在 Windows 和 Linux 上干净地编译，无需更改代码。

#### 为什么它很重要

条件编译使您的 C 代码：

- 可移植，相同的代码可以在多个系统上运行
- 可配置，功能可以在构建时切换
- 可维护，不需要多个代码库
- 高效、排除的代码甚至不进入二进制文件

在系统软件和嵌入式开发中，这是必不可少的。

#### 自己尝试一下

1. 编写一个程序，根据操作系统打印不同的问候语。
2. 使用`#if`和`#error`强制执行只有其中之一`DEBUG`或者`RELEASE`可以定义。
3. 编写一个标头，定义不同CPU 架构的常量。
4. 添加功能标志（`ENABLE_LOGGING`）可以通过以下方式打开/关闭`gcc -D`.
5. 使用`#ifdef`和`#ifndef`创建一个轻量级的构建时配置系统。

在下一节中，您将通过了解内联函数和标头卫生以及许多宏模式的现代、更安全的替代品，向干净、可维护的 C 代码迈出下一步。
