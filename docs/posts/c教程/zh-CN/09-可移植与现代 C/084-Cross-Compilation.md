---
title: "84. 交叉编译"
date: "2026-07-04"
lang: "zh-CN"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "09-可移植与现代 C"
  - "中文"
description: "The Little Book of C 中文版 — 84. 交叉编译"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
translator: "机器辅助翻译（Google Translate）"
section: 84
sidebarWeight: 84
alternateZh: "/posts/c教程/zh-CN/09-可移植与现代 C/084-Cross-Compilation"
alternateEn: "/posts/c教程/en-US/09-Portable and Modern C/084-Cross-Compilation"
---

[English version](/posts/c教程/en-US/09-Portable and Modern C/084-Cross-Compilation)

交叉编译意味着在一台机器上构建程序，以便它在另一台机器上运行。如果您曾经在笔记本电脑上编译过 C 程序并将其部署到 Raspberry Pi、ESP32 板，甚至自定义 Linux 映像，那么您就已经完成了交叉编译。

对于系统程序员、嵌入式开发人员以及任何为多种架构或操作系统进行构建的人来说，这是一项基本技能。

#### 步骤1.什么是交叉编译器？

交叉编译器是为不同于主机平台的目标平台生成可执行文件的编译器。

|术语 |意义|
| --- | --- |
|主持人|您构建代码的系统 |
|目标|程序将运行的系统 |
|构建|构建编译器本身的系统（通常与主机相同）|

示例：您使用的是 macOS (x86_64)，并且想要针对 Raspberry Pi (ARM) 进行编译。您的工具链必须将 x86 指令转换为 ARM 指令。

#### 步骤 2. 为什么要交叉编译？

- 将软件部署到嵌入式设备，无需直接在其上编译。
- 从一个工作站构建多种架构。
- 生成可移植的二进制文件（适用于 ARM、MIPS、RISC-V 等）。
- 为最小系统或容器准备静态二进制文件。

交叉编译是嵌入式Linux、物联网和固件开发的基础。

#### 步骤 3. 安装交叉编译器

在 Linux 上，安装适合您的目标体系结构的工具链包。示例：

```
sudo apt install gcc-arm-linux-gnueabihf
sudo apt install gcc-aarch64-linux-gnu
sudo apt install gcc-riscv64-linux-gnu
```

每个工具链包含：

-`gcc`或者`clang`交叉编译器
-`as`（汇编器）
-`ld`（链接器）
- 目标系统头文件和库

#### 步骤 4. 验证目标

检查编译器的目标三元组：

```
arm-linux-gnueabihf-gcc -v
```

输出示例：

```
Target: arm-linux-gnueabihf
```

三重编码：

```
<architecture>-<vendor>-<OS>-<ABI>
```

例如：

-`x86_64-pc-linux-gnu`
-`arm-none-eabi`（裸机，无操作系统）
-`aarch64-linux-gnu`

#### 步骤 5. 针对另一个平台进行编译

小代码：

```
#include <stdio.h>
int main(void) {
    printf("Hello from cross-compiled C!\n");
}
```

为 ARM 编译：

```
arm-linux-gnueabihf-gcc hello.c -o hello_arm
```

将其传输到您的 ARM 设备：

```
scp hello_arm user@raspberrypi.local:/home/user/
```

然后在 Pi 上运行：

```
./hello_arm
```

如果一切配置正确，您将看到：

```
Hello from cross-compiled C!
```

#### 步骤 6. 静态链接与动态链接

交叉编译时，您的目标系统可能没有相同的库。您可以将所有内容链接到一个二进制文件中：

```
arm-linux-gnueabihf-gcc -static hello.c -o hello_static
```

即使目标缺少共享库，静态链接也可确保二进制文件运行，这对于最小或嵌入式系统很有用。

#### 步骤 7. 使用 Clang 进行交叉编译

Clang 通过以下方式简化了多目标构建`--target`和`--sysroot`选项：

```
clang --target=aarch64-linux-gnu --sysroot=/path/to/sysroot hello.c -o hello_arm64
```

`--sysroot`指向模仿目标文件系统的目录，包含其标头和库。

#### 步骤 8. 从 Linux 构建 Windows 或 macOS

您还可以跨操作系统交叉编译：

Linux→Windows：

```
sudo apt install mingw-w64
x86_64-w64-mingw32-gcc hello.c -o hello.exe
```

Linux → macOS：更复杂，通常需要带有 Apple SDK 的 Clang 或`osxcross`.

#### 步骤 9. 使用 CMake 或 Makefile 实现自动化

CMake 使多平台构建变得容易。

`toolchain-arm.cmake`

```
SET(CMAKE_SYSTEM_NAME Linux)
SET(CMAKE_SYSTEM_PROCESSOR arm)
SET(CMAKE_C_COMPILER arm-linux-gnueabihf-gcc)
```

然后：

```
cmake -DCMAKE_TOOLCHAIN_FILE=toolchain-arm.cmake ..
make
```

您的构建系统现在知道它正在针对 ARM 进行交叉编译。

#### 步骤 10. 小代码：检测并打印目标架构

```
#include <stdio.h>
int main(void) {
#if defined(__x86_64__)
    printf("x86_64\n");
#elif defined(__aarch64__)
    printf("ARM64\n");
#elif defined(__arm__)
    printf("ARM 32-bit\n");
#elif defined(__riscv)
    printf("RISC-V\n");
#else
    printf("Unknown architecture\n");
#endif
}
```

针对不同的目标进行编译并观察输出。

#### 为什么它很重要

交叉编译将您的笔记本电脑连接到您将要编程的所有其他设备。这就是内核模块、嵌入式系统甚至 Android 应用程序的构建方式。一旦你学会了它，你就可以在任何地方、为任何东西进行构建。

#### 自己尝试一下

1. 在主机系统上安装 ARM 或 RISC-V 交叉编译器。
2. 在模拟器上交叉编译并运行一个简单的“Hello”二进制文件（`qemu-arm`).
3. 使用`-static`标志以使其独立。
4. 添加带有变量的 Makefile`CC`,`CFLAGS`， 和`LDFLAGS`以便于重复使用。
5. 尝试从同一源构建 Linux 和 Windows。

接下来，您将探索使用 pthread 的线程，以及如何使用标准 C 线程同时运行程序的多个部分。
