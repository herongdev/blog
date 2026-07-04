---
title: "58. 编译器标志和优化级别"
date: "2026-07-04"
lang: "zh-CN"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "06-编译与构建"
  - "中文"
description: "The Little Book of C 中文版 — 58. 编译器标志和优化级别"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
translator: "机器辅助翻译（Google Translate）"
section: 58
sidebarWeight: 58
alternateZh: "/posts/c教程/zh-CN/06-编译与构建/058-Compiler Flags and Optimization Levels"
alternateEn: "/posts/c教程/en-US/06-Compilation and Build/058-Compiler Flags and Optimization Levels"
---

[English version](/posts/c教程/en-US/06-Compilation and Build/058-Compiler Flags and Optimization Levels)

一旦您的程序正确编译和链接，下一步就是掌握编译器标志，即控制警告、调试信息、优化和性能的开关。

使用正确的标志可以使您的 C 代码更安全、更快且更易于调试。

我们来回顾一下最重要的部分`gcc`和`clang`每个 C 开发人员都应该知道的选项。

#### 步骤1.基本编译命令

最常见的编译命令如下所示：

```
gcc main.c -o main
```

这编译`main.c`进入一个名为的可执行文件`main`使用默认设置、最少警告、无优化且无调试信息。

对于认真的开发，您需要更多的控制。

#### 步骤 2. 警告标志

警告是编译器的预警系统。他们在错误变成错误之前发现它们。

|旗帜|意义|
| --- | --- |
|`-Wall`|启用最常见的警告 |
|`-Wextra`|启用额外的、更严格的警告 |
|`-Werror`|将警告视为错误 |
|`-Wpedantic`|严格遵守 ISO C |
|`-Wshadow`|如果局部变量隐藏另一个变量，则发出警告 |
|`-Wconversion`|关于隐式类型转换的警告 |
|`-Wunused`|警告未使用的变量或函数 |

例子：

```
gcc -Wall -Wextra -Werror main.c -o main
```

如果您的代码有：

```
int x;
printf("%d\n", x);
```

你会得到：

```
warning: 'x' is used uninitialized
```

和`-Werror`，该警告成为构建停止错误，这是干净代码库的好习惯。

#### 步骤 3. 调试标志

调试信息允许使用诸如`gdb`或者`lldb`将机器代码映射回您的 C 源代码。

|旗帜|描述 |
| --- | --- |
|`-g`|包括调试符号（文件名、行号）|
|`-ggdb`|包含 gdb 的 GNU 特定符号 |
|`-O0`|禁用优化（使调试更容易）|

例子：

```
gcc -g -O0 main.c -o main
```

现在运行：

```
gdb ./main
```

您将能够检查变量并单步执行源代码行。

#### 步骤 4. 优化级别

优化告诉编译器如何积极地转换代码以提高速度或大小。

|旗帜|描述 |
| --- | --- |
|`-O0`|无需优化（编译快，调试方便）|
|`-O1`|基础优化|
|`-O2`|一般速度优化（大多数版本的默认设置）|
|`-O3`|积极优化（可能会增加大小）|
|`-Os`|优化尺寸 |
|`-Ofast`|忽视严格的速度标准（危险）|

例子：

```
gcc -O2 main.c -o main
```

比较尺寸：

```
gcc -O0 main.c -o slow
gcc -O2 main.c -o fast
ls -lh slow fast
```

`fast`当代码变得更小、运行速度更快时，编译器会重新排序代码、内联函数并删除死逻辑。

#### 步骤 5. 分析和检测标志

分析有助于测量程序的哪些部分消耗了最多的 CPU 时间。

|旗帜|目的|
| --- | --- |
|`-pg`|生成分析数据`gprof`|
|`-fprofile-generate`/`-fprofile-use`|使用配置文件引导优化 (PGO) |
|`-ftime-report`|显示每个编译阶段花费了多长时间 |

例子：

```
gcc -pg main.c -o main
./main
gprof main gmon.out > report.txt
```

#### 步骤 6. 标准合规标志

C语言不断发展，您可以指定遵循哪个版本。

|旗帜|意义|
| --- | --- |
|`-std=c89`| ANSI C (1989) |
|`-std=c99`|现代 C 与`inline`,`bool`,`// comments`|
|`-std=c11`|添加`_Generic`,`_Thread_local`，更安全的原子|
|`-std=c17`|小清理 |
|`-std=c23`|最新（添加`typeof`、更安全的宏等）|

例子：

```
gcc -std=c99 -Wall main.c -o main
```

始终为您的项目选择一致的标准。

#### 步骤 7. 平台和架构标志

|旗帜|描述 |
| --- | --- |
|`-m32`/`-m64`|针对 32 位或 64 位架构进行编译 |
|`-march=native`|针对主机 CPU 进行优化 |
|`-fPIC`|与位置无关的代码（共享库所需）|
|`-static`|完全静态链接|
|`-DNAME=value`|定义一个宏（与`#define`在代码中）|

例子：

```
gcc -DDEBUG=1 -O2 -m64 main.c -o main
```

#### 步骤 8.链接标志

|旗帜|描述 |
| --- | --- |
|`-L `|添加库搜索路径 |
|`-l `|与库的链接（例如，`-lm`数学）|
|`-static`|强制静态链接 |
|`-shared`|构建共享库 |
|`-rpath `|添加运行时库搜索路径 |

例子：

```
gcc main.o -L. -lmylib -Wl,-rpath=. -o app
```

`-Wl,`将选项直接传递给链接器（`ld`).

#### 小代码：调试和发布版本

生成文件

```
CC = gcc
CFLAGS = -Wall -std=c99
DEBUG_FLAGS = -g -O0 -DDEBUG
RELEASE_FLAGS = -O2 -DNDEBUG
SRC = main.c util.c
OBJ = $(SRC:.c=.o)
TARGET = app
debug: CFLAGS += $(DEBUG_FLAGS)
debug: $(TARGET)
release: CFLAGS += $(RELEASE_FLAGS)
release: $(TARGET)
$(TARGET): $(OBJ)
    $(CC) $(CFLAGS) $(OBJ) -o $(TARGET)
%.o: %.c
    $(CC) $(CFLAGS) -c $< -o $@
clean:
    rm -f $(OBJ) $(TARGET)
```

跑步：

```
make debug
make release
```

- 调试构建：完整符号，无优化。
- 发布版本：优化，无调试信息。

#### 步骤 9. Sanitizers（运行时安全工具）

现代编译器包含内置的清理程序来检测内存和线程错误：

|旗帜|检测 |
| --- | --- |
|`-fsanitize=address`|内存泄漏、缓冲区溢出 |
|`-fsanitize=undefined`|未定义的行为 |
|`-fsanitize=thread`|多线程代码中的数据竞争

例子：

```
gcc -g -fsanitize=address main.c -o main
./main
```

如果您的代码写入超出了数组边界，您将获得即时、可读的报告，无需猜测。

#### 步骤 10. 组合标志

典型的开发构建：

```
gcc -Wall -Wextra -Werror -g -O0 -std=c99 main.c -o debug_app
```

典型的发布版本：

```
gcc -O2 -march=native -flto -DNDEBUG main.c -o fast_app
```

-`-flto`启用链接时优化 (LTO)，跨文件进行优化。
-`-DNDEBUG`禁用`assert()`来电。

#### 为什么它很重要

编译器标志是专业人士控制的方式：

- 安全（警告、消毒剂）
- 性能（优化级别）
- 可调试性（符号和检查）
- 可移植性（标准和架构）

掌握它们可以让您精确控制代码的行为、构建和执行方式，这对于可靠的系统编程至关重要。

#### 自己尝试一下

1. 编译相同的程序`-O0`,`-O2`， 和`-O3`，每次运行的时间。
2. 添加`-fsanitize=address`并找到隐藏的内存错误。
3. 比较之间的二进制大小`-g`和`-s`.
4.添加`-Wall -Wextra -Werror`到你的 Makefile 并修复每个警告。
5. 探索`gcc --help=optimizers`查看所有可用的优化过程。

接下来，您将查看目标文件本身，了解其中存储的内容`.o`二进制文件以及链接器如何将它们拼接在一起以形成完整的可执行文件。
