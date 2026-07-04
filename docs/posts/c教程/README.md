---
title: The Little Book of C 教程（多语言）
date: 2026-07-04
categories: [C 教程]
tags: [C, Little Book of C, 多语言]
sidebarWeight: 0
description: The Little Book of C 中英双语动手课程入口：从第一个程序到可交付 C 小工具。
---

# The Little Book of C · C 语言小书

> 基于 Duc-Tam Nguyen 的 [The Little Book of C](https://little-book-of.github.io/c/books/en-US/book.html)（[CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/)）

这套教程不只适合通读概念。你会从 `printf` 开始，逐步完成计算器、手动内存管理、小型数据结构、文件日志工具、Makefile、Mini Shell、调试修复、可移植多线程程序，最后交付一个可以构建、运行、测试、打包和说明取舍的 C 小项目。

完成后，你应该能把 C 代码从“能跑”推进到“可维护、可调试、可交付”：

- 设计一个小型命令行工具，拆分 `.c` / `.h` 文件，并用 Makefile 稳定构建。
- 解释栈、堆、指针、生命周期、深浅拷贝和未定义行为对程序正确性的影响。
- 用警告、断言、调试器、内存检查和代码审查清单定位问题。
- 处理文件 I/O、错误码、命令行参数、系统调用、进程、管道和信号。
- 为最终项目留下可展示证据：源码、构建命令、运行输出、测试记录、调试记录、README 和版本标签。

这份证据可以用于作品集、代码面试复盘、系统编程入门项目，或后续学习操作系统、数据库、编译器、嵌入式开发时的基础练习。它不能保证职位或录用结果，但能证明你已经动手完成过 C 项目的核心工程流程。

## 固定练习工作区

所有练习统一放在同一个工作区，避免命令输出散落在教程目录里。

macOS / Linux:

```bash
mkdir -p ~/c-course-labs
cd ~/c-course-labs
```

Windows PowerShell:

```powershell
New-Item -ItemType Directory -Force "$HOME\c-course-labs"
Set-Location "$HOME\c-course-labs"
```

每个练习单独创建目录，例如 `020-calculator`、`060-makefile-lab`、`100-tinynotes`。每章完成后，把运行命令、关键输出、遇到的问题和下一步改进写进该目录下的 `evidence.md`。

## 编译标准选择

默认练习建议使用更稳妥的 C17：

```bash
gcc -std=c17 -Wall -Wextra -Wpedantic -g main.c -o main
```

课程中涉及 C23 的章节会把它作为现代能力或可选升级来练。GCC 文档说明 C23 可用 `-std=c23` 选择，Clang 的 C 支持页把 C23 标为部分支持；因此做跨编译器练习时，先用 C17 保证主线能跑，再用 C23 对照新特性和兼容性。

- Source: [GCC language standards](https://gcc.gnu.org/onlinedocs/gcc/Standards.html)
- Source: [Clang C language status](https://clang.llvm.org/c_status.html)

## 选择语言

| 语言 | 目录 | 说明 |
|------|------|------|
| **中文** | [zh-CN 教程总览](./zh-CN/README.md) | 适合中文跟练，保留原书代码并补充课程化学习路径 |
| **English** | [en-US Index](./en-US/README.md) | English path with the same hands-on contract |

## 章节对照

| 英文章节 | 中文章节 |
|----------|----------|
| 01-Getting Started | 01-入门 |
| 02-Language Basics | 02-语言基础 |
| 03-Working with Memory | 03-内存 |
| 04-Structuring Data | 04-数据结构 |
| 05-Input Output and Files | 05-输入输出与文件 |
| 06-Compilation and Build | 06-编译与构建 |
| 07-Working Close to the System | 07-贴近系统 |
| 08-Debugging Testing Profiling | 08-调试测试与 profiling |
| 09-Portable and Modern C | 09-可移植与现代 C |
| 10-Building Real Projects | 10-真实项目 |
| 11-Epilogue | 11-结语 |

每篇文章顶部可切换 **中文 / English**（`alternateZh` / `alternateEn`）。
