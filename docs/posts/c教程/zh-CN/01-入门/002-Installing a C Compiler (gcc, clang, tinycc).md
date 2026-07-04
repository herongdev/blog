---
title: "2. 安装 C 编译器（gcc、clang、tinycc）"
date: "2026-07-04"
lang: "zh-CN"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "01-入门"
  - "中文"
description: "The Little Book of C 中文版 — 2. 安装 C 编译器（gcc、clang、tinycc）"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
translator: "机器辅助翻译（Google Translate）"
section: 2
sidebarWeight: 2
alternateZh: "/posts/c教程/zh-CN/01-入门/002-Installing a C Compiler (gcc, clang, tinycc)"
alternateEn: "/posts/c教程/en-US/01-Getting Started/002-Installing a C Compiler (gcc, clang, tinycc)"
---

[English version](/posts/c教程/en-US/01-Getting Started/002-Installing a C Compiler (gcc, clang, tinycc))

在编写和运行 C 程序之前，您需要一个编译器。编译器是一种将人类可读的代码转换为 CPU 可以理解的机器指令的工具。在 C 语言中，这个过程是明确的，你可以看到它，控制它，并从中学习。

有许多可用的编译器，但最常见的是以下三种：

- GCC（GNU 编译器集合）**，Linux 和 macOS 上的标准编译器，以可靠性和广泛支持而闻名。
- Clang，一种现代编译器，旨在提高速度、更清晰的诊断以及与 LLVM 等工具的集成。
- TinyCC (tcc)，一款超轻量级编译器，非常适合学习和快速测试。

#### 小代码

您可以通过在终端中运行以下命令之一来检查是否已安装编译器：

```
gcc --version
clang --version
tcc --version
```

如果您看到版本号，则说明您已准备就绪。如果没有，您需要安装一个。

#### 在不同系统上安装

Linux（Debian/Ubuntu）：

```
sudo apt update
sudo apt install build-essential
```

这会安装 GCC 以及其他有用的工具，例如`make`.

macOS（使用 Xcode 命令行工具）：

```
xcode-select --install
```

这将安装 Clang 和开发人员工具链。

Windows（通过 Mingw-w64）：

1. 转到Mingw-w64。
2.下载并安装。
3.添加编译器`bin`文件夹到您的系统路径。
4. 打开`cmd`或 PowerShell 并运行`gcc --version`确认。

或者，如果您更喜欢一体化环境，请安装 WSL（适用于 Linux 的 Windows 子系统）并使用上面的 Linux 命令。

#### 为什么它很重要

安装编译器是了解程序如何成为可执行文件的第一步。在 C 中，没有隐藏的构建系统或自动运行时，编写代码和运行代码之间发生的所有事情都是可见的。这种清晰性是 C 语言成为如此强大的学习工具的部分原因。

当您安装编译器时，您还安装了探索软件实际工作原理的能力。

#### 自己尝试一下

打开终端或命令提示符。

类型`gcc --version`或者`clang --version`确认安装。

创建一个简单的文件，名为`test.c`:

```
int main(void) { return 0; }
```

编译它：

```
gcc test.c -o test
```

运行它：

```
./test
```

如果它运行时没有输出，那就完美了，你的编译器已经准备好了。您刚刚从源代码构建了第一个可执行程序。
