---
title: "The Little Book of C 中文教程总览"
date: "2026-07-04"
lang: "zh-CN"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "中文"
sidebarWeight: 0
alternateEn: "/posts/c教程/en-US/README"
description: "The Little Book of C 中文跟练课程：从 C 基础到可交付小项目。"
---

# The Little Book of C · 中文教程

[English version](/posts/c教程/en-US/README)

> 本文基于英文原文整理为中文跟练课程，术语与代码示例尽量保持可对照。欢迎提 PR 改进译文、命令和平台兼容性。

**出处：** Duc-Tam Nguyen · [原书](https://little-book-of.github.io/c/books/en-US/book.html)

---

## 学完后你能交付什么

如果你已经会一点基础语法，但写 C 时常卡在“指针怎么才算安全”“多个文件怎么组织”“程序崩了怎么查”“小项目怎么收尾”，这条路线会把这些问题压进一组连续练习里。

完成 001-100 后，你会留下一个完整的 C 练习仓库，里面至少包含：

- `020-calculator/`：一个可交互的命令行计算器，证明你能组织函数、分支、循环和输入输出。
- `030-memory/`：一个手动管理内存的小程序，证明你能说明谁申请、谁释放、哪里可能泄漏。
- `040-library/`：一个小型图书管理系统，证明你能用结构体、链表和枚举表达真实数据。
- `050-log-tool/`：一个读写日志的文件工具，证明你能处理文件、错误和命令行参数。
- `060-makefile-lab/`：一个多文件项目和 Makefile，证明你能把构建流程固定下来。
- `070-mini-shell/`：一个 Mini Shell 原型，证明你能连接进程、管道、重定向和信号。
- `080-debug-lab/`：一组修复记录，证明你能用调试器、断言、内存检查和代码审查定位问题。
- `090-portable-threads/`：一个可移植并发练习，证明你知道平台差异、原子操作和编译条件。
- `100-tinynotes/`：最终小项目，包含源码、README、Makefile、运行输出、测试记录和版本标签。

这些交付物对应常见工作任务：维护 C 代码、修复内存问题、拆分模块、写构建脚本、排查崩溃、阅读系统 API、把小工具交给别人使用。它们是作品集和面试复盘的证据，不是职位或录用结果的保证。

## 固定工作区和运行规则

所有练习统一放在 `~/c-course-labs`，不要在博客源码目录里生成二进制文件。

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

每个练习新建一个目录。例如第 20 课：

macOS / Linux:

```bash
mkdir -p ~/c-course-labs/020-calculator
cd ~/c-course-labs/020-calculator
```

Windows PowerShell:

```powershell
New-Item -ItemType Directory -Force "$HOME\c-course-labs\020-calculator"
Set-Location "$HOME\c-course-labs\020-calculator"
```

每章结束时在当前练习目录记录 `evidence.md`：

```md
# Evidence

- Input:
- Expected behavior:
- Actual behavior:
- Build command:
- Run command:
- Artifact path:
- Failure or surprise:
- Next improvement:
```

## 编译命令基线

主线练习优先使用 C17，降低不同编译器之间的差异：

```bash
gcc -std=c17 -Wall -Wextra -Wpedantic -g main.c -o main
```

当章节专门演示 C23 或现代特性时，再尝试：

```bash
gcc -std=c23 -Wall -Wextra -Wpedantic main.c -o main
```

如果 `-std=c23` 在你的编译器上不可用，先退回 `-std=c17` 完成主线，再把差异写进 `evidence.md`。GCC 文档说明 C23 可用 `-std=c23` 选择；Clang 的 C 支持页显示 C23 仍按特性逐步支持，所以本课程把 C17 作为稳定练习基线，把 C23 作为兼容性对照。

- Source: [GCC language standards](https://gcc.gnu.org/onlinedocs/gcc/Standards.html)
- Source: [Clang C language status](https://clang.llvm.org/c_status.html)

## 学习路径

先按文件编号线性学习。每章只做三件事：读懂一个概念，运行一个可观察示例，把风险或疑问写进证据记录。每个 `Practice` 章节是一次收束，必须留下可以重新运行的目录。

| 阶段 | 你要证明的能力 | 证据 |
|---|---|---|
| 001-009 | 装好工具链，能从源码得到可执行文件 | `hello` 可执行文件、编译命令、一次故意制造的编译错误 |
| 011-020 | 用函数、分支和循环做交互程序 | `020-calculator/` 和一段正常/异常输入记录 |
| 021-030 | 解释并验证内存所有权 | `030-memory/`、内存检查输出或手动释放说明 |
| 031-040 | 用结构体和链表建模业务数据 | `040-library/`、数据操作输出、结构设计说明 |
| 041-050 | 读写文件并处理失败路径 | `050-log-tool/`、输入文件、输出文件、错误样例 |
| 051-060 | 把多文件项目交给 Makefile 管理 | `060-makefile-lab/`、`make`、`make clean`、增量构建记录 |
| 061-070 | 写一个靠近系统的交互原型 | `070-mini-shell/`、命令执行、管道或重定向样例 |
| 071-080 | 定位崩溃、泄漏和逻辑错误 | `080-debug-lab/`、修复前后输出、调试记录 |
| 081-090 | 识别平台差异并做可移植处理 | `090-portable-threads/`、不同编译命令或平台差异说明 |
| 091-100 | 交付一个小型 C 工具 | `100-tinynotes/`、README、Makefile、测试记录、版本标签 |

## 边界

最低完成标准：每个 `Practice` 章节能编译运行，`evidence.md` 记录输入、输出、失败和下一步改进。

成熟目标：最终项目具备清晰目录、模块拆分、错误处理、构建脚本、README、测试样例、调试记录和一次小版本标记。

本教程暂不覆盖大型 GUI、内核模块、生产级网络服务器、复杂数据库存储引擎、跨平台发布流水线。这些适合在完成第 100 课后作为升级项目继续做。

## 01-入门（9 篇）

- [1. C 是什么以及为什么它仍然很重要](./01-入门/001-What C Is and Why It Still Matters.md)
- [2. 安装 C 编译器（gcc、clang、tinycc）](./01-入门/002-Installing a C Compiler (gcc, clang, tinycc).md)
- [3. 编写并运行您的第一个程序](./01-入门/003-Writing and Running Your First Program.md)
- [4. C 程序剖析](./01-入门/004-Anatomy of a C Program.md)
- [5. 使用标头和预处理器](./01-入门/005-Using Headers and the Preprocessor.md)
- [6. 编译、链接和执行](./01-入门/006-Compiling, Linking, and Executing.md)
- [7. 常见错误和警告](./01-入门/007-Common Errors and Warnings.md)
- [8. C 开发人员的命令行基础知识](./01-入门/008-Command Line Basics for C Developers.md)
- [9. 设置最小的项目结构](./01-入门/009-Setting Up a Minimal Project Structure.md)

## 02-语言基础（10 篇）

- [11. 数据类型和变量](./02-语言基础/011-Data Types and Variables.md)
- [12. 常量、文字和枚举](./02-语言基础/012-Constants, Literals, and Enumerations.md)
- [13. 运算符和表达式](./02-语言基础/013-Operators and Expressions.md)
- [14. 控制流程：if、else、switch](./02-语言基础/014-Control Flow if, else, switch.md)
- [15. 循环：for、while、do-while](./02-语言基础/015-Loops for, while, do-while.md)
- [16. 功能及参数](./02-语言基础/016-Functions and Parameters.md)
- [17. 变量的范围和生命周期](./02-语言基础/017-Scope and Lifetime of Variables.md)
- [18. 返回值和函数签名](./02-语言基础/018-Return Values and Function Signatures.md)
- [19. 代码单元的静态链接与动态链接](./02-语言基础/019-Static vs Dynamic Linking of Code Units.md)
- [20. 练习：构建一个简单的计算器](./02-语言基础/020-Practice Build a Simple Calculator.md)

## 03-内存（10 篇）

- [21. 了解内存布局（堆栈、堆、数据、代码）](./03-内存/021-Understanding Memory Layout (Stack, Heap, Data, Code).md)
- [22. 指针和地址](./03-内存/022-Pointers and Addresses.md)
- [23. 数组和指针算术](./03-内存/023-Arrays and Pointer Arithmetic.md)
- [24. 字符串作为字符数组](./03-内存/024-Strings as Character Arrays.md)
- [25. 动态内存分配（malloc、calloc、realloc、free）](./03-内存/025-Dynamic Memory Allocation (malloc, calloc, realloc, free).md)
- [26. 内存泄漏和未定义的行为](./03-内存/026-Memory Leaks and Undefined Behavior.md)
- [27. const 和 volatile 限定符](./03-内存/027-const and volatile Qualifiers.md)
- [28. 函数指针和回调](./03-内存/028-Function Pointers and Callbacks.md)
- [29. 深拷贝与浅拷贝](./03-内存/029-Deep vs Shallow Copies.md)
- [30. 练习：手动内存管理](./03-内存/030-Practice Manual Memory Management.md)

## 04-数据结构（10 篇）

- [31. 结构和嵌套结构](./04-数据结构/031-Structures and Nested Structures.md)
- [32. 联合和类型重用](./04-数据结构/032-Unions and Type Reuse.md)
- [33. Typedef 和代码清晰度](./04-数据结构/033-Typedef and Code Clarity.md)
- [34. 位域和内存打包](./04-数据结构/034-Bitfields and Memory Packing.md)
- [35. 重温枚举](./04-数据结构/035-Enumerations Revisited.md)
- [36. 从头开始的链接列表](./04-数据结构/036-Linked Lists from Scratch.md)
- [37. 具有结构的堆栈和队列](./04-数据结构/037-Stacks and Queues with Structs.md)
- [38. 哈希表和函数指针](./04-数据结构/038-Hash Tables and Function Pointers.md)
- [39. C 中的最小面向对象设计](./04-数据结构/039-Minimal Object-Oriented Design in C.md)
- [40. 实践：构建小型图书馆系统](./04-数据结构/040-Practice Build a Tiny Library System.md)

## 05-输入输出与文件（10 篇）

- [41. 标准 I/O 和 printf/scanf](./05-输入输出与文件/041-Standard IO and printfscanf.md)
- [42. 文件指针和 fopen / fclose](./05-输入输出与文件/042-File Pointers and fopen fclose.md)
- [43. 读写二进制文件](./05-输入输出与文件/043-Reading and Writing Binary Files.md)
- [44. 使用 stdin、stdout 和 stderr](./05-输入输出与文件/044-Working with stdin, stdout, and stderr.md)
- [45. 使用 fgets 和 fputs 进行缓冲 I/O](./05-输入输出与文件/045-Buffered IO with fgets and fputs.md)
- [46. 使用 errno 和 perror 进行错误检查](./05-输入输出与文件/046-Error Checking with errno and perror.md)
- [47. 命令行参数（argc、argv）](./05-输入输出与文件/047-Command-Line Arguments (argc, argv).md)
- [48. 读取配置文件](./05-输入输出与文件/048-Reading Configuration Files.md)
- [49. 将结构序列化到磁盘](./05-输入输出与文件/049-Serializing Structs to Disk.md)
- [50. 实践：构建日志读取器和写入器](./05-输入输出与文件/050-Practice Build a Log Reader and Writer.md)

## 06-编译与构建（10 篇）

- [51. 从源代码到可执行文件：编译管道](./06-编译与构建/051-From Source to Executable The Compilation Pipeline.md)
- [52. 预处理器和宏](./06-编译与构建/052-The Preprocessor and Macros.md)
- [53. 条件编译（#if、#ifdef、#ifndef）](./06-编译与构建/053-Conditional Compilation (%23if, %23ifdef, %23ifndef).md)
- [54. 内联函数和标头卫生](./06-编译与构建/054-Inline Functions and Header Hygiene.md)
- [55. Makefile 和构建自动化](./06-编译与构建/055-Makefiles and Build Automation.md)
- [56. 链接多个文件](./06-编译与构建/056-Linking Multiple Files.md)
- [57. 静态和共享库](./06-编译与构建/057-Static and Shared Libraries.md)
- [58. 编译器标志和优化级别](./06-编译与构建/058-Compiler Flags and Optimization Levels.md)
- [59. 了解目标文件](./06-编译与构建/059-Understanding the Object File.md)
- [60. 练习：编写自己的 Makefile](./06-编译与构建/060-Practice Write Your Own Makefile.md)

## 07-贴近系统（10 篇）

- [61. 系统调用和标准库](./07-贴近系统/061-System Calls and the Standard Library.md)
- [62. 进程创建（fork、exec、等待）](./07-贴近系统/062-Process Creation (fork, exec, wait).md)
- [63. 文件描述符和打开/读/写](./07-贴近系统/063-File Descriptors and openreadwrite.md)
- [64. 管道和重定向](./07-贴近系统/064-Pipes and Redirection.md)
- [65. 信号和信号处理程序](./07-贴近系统/065-Signals and Signal Handlers.md)
- [66. 内存映射（mmap）](./07-贴近系统/066-Memory Mapping (mmap).md)
- [67. 时间和时钟 API](./07-贴近系统/067-Time and Clock APIs.md)
- [68. 环境变量](./07-贴近系统/068-Environment Variables.md)
- [69. 错误处理和返回代码](./07-贴近系统/069-Error Handling and Return Codes.md)
- [70. 练习：C 语言的迷你 Shell](./07-贴近系统/070-Practice Mini Shell in C.md)

## 08-调试测试与 profiling（10 篇）

- [71. 使用 gdb 进行调试](./08-调试测试与 profiling/071-Debugging with gdb.md)
- [72. 使用 Valgrind 进行内存检查](./08-调试测试与 profiling/072-Using Valgrind for Memory Checking.md)
- [73. 断言和防御性编程](./08-调试测试与 profiling/073-Assertions and Defensive Programming.md)
- [74. C 语言的单元测试](./08-调试测试与 profiling/074-Unit Testing in C.md)
- [75. 记录系统](./08-调试测试与 profiling/075-Logging Systems.md)
- [76. 使用 gprof 进行分析](./08-调试测试与 profiling/076-Profiling with gprof.md)
- [77. 常见的未定义行为](./08-调试测试与 profiling/077-Common Undefined Behaviors.md)
- [78. 崩溃分析和核心转储](./08-调试测试与 profiling/078-Crash Analysis and Core Dumps.md)
- [79. C 项目的代码审查清单](./08-调试测试与 profiling/079-Code Review Checklist for C Projects.md)
- [80. 练习：修复内存和逻辑错误](./08-调试测试与 profiling/080-Practice Fix Memory and Logic Bugs.md)

## 09-可移植与现代 C（10 篇）

- [81. C 标准时间线（C89 到 C23）](./09-可移植与现代 C/081-The C Standard Timeline (C89 to C23).md)
- [82. 可移植性和字节顺序](./09-可移植与现代 C/082-Portability and Endianness.md)
- [83. 内联组装和硬件访问](./09-可移植与现代 C/083-Inline Assembly and Hardware Access.md)
- [84. 交叉编译](./09-可移植与现代 C/084-Cross-Compilation.md)
- [85. 使用 pthread 进行线程处理](./09-可移植与现代 C/085-Threading with pthreads.md)
- [86. 原子操作和内存模型](./09-可移植与现代 C/086-Atomic Operations and Memory Models.md)
- [87. 将 C 与其他语言结合使用 (FFI)](./09-可移植与现代 C/087-Using C with Other Languages (FFI).md)
- [88. 更安全的替代方案（边界检查、_Static_assert 和现代 C 安全工具）](./09-可移植与现代 C/088-Safer Alternatives (Bounds Checking, _Static_assert, and Modern C Safety Tools).md)
- [89. 现代风格：干净可读的 C](./09-可移植与现代 C/089-Modern Style Clean and Readable C.md)
- [90. 练习：可移植多线程程序](./09-可移植与现代 C/090-Practice Portable Multithreaded Program.md)

## 10-真实项目（10 篇）

- [91. 设计小型 C 库](./10-真实项目/091-Designing Small C Libraries.md)
- [92. 构建命令行工具](./10-真实项目/092-Building a Command-Line Tool.md)
- [93. 微型 HTTP 服务器（套接字和线程）](./10-真实项目/093-Tiny HTTP Server (Sockets and Threads).md)
- [94. 简单的键值存储](./10-真实项目/094-Simple Key-Value Store.md)
- [95. 实现自定义分配器](./10-真实项目/095-Implementing a Custom Allocator.md)
- [96. 编写文本解析器](./10-真实项目/096-Writing a Text Parser.md)
- [97. 表达语言的微型解释器](./10-真实项目/097-Tiny Interpreter for an Expression Language.md)
- [98. 与 SQLite 或 LevelDB 接口](./10-真实项目/098-Interfacing with SQLite or LevelDB.md)
- [99. 打包、版本控制和文档](./10-真实项目/099-Packaging, Versioning, and Documentation.md)
- [100. 练习：构建自己的迷你项目](./10-真实项目/100-Practice Build Your Own Mini Project.md)

## 11-结语（4 篇）

- [作者的话](./11-结语/A Note from the Author.md)
- [结语：C 的精神](./11-结语/Epilogue-The Spirit of C.md)
- [最后的练习](./11-结语/Final Exercise.md)
- [此后的路径](./11-结语/The Path Beyond.md)
