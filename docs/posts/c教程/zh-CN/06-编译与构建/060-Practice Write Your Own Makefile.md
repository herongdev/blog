---
title: "60. 练习：编写自己的 Makefile"
date: "2026-07-04"
lang: "zh-CN"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "06-编译与构建"
  - "中文"
description: "The Little Book of C 中文版 — 60. 练习：编写自己的 Makefile"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
translator: "机器辅助翻译（Google Translate）"
section: "60"
sidebarWeight: "60"
alternateZh: "/posts/c教程/zh-CN/06-编译与构建/060-Practice Write Your Own Makefile"
alternateEn: "/posts/c教程/en-US/06-Compilation and Build/060-Practice Write Your Own Makefile"
---

[English version](/posts/c教程/en-US/06-Compilation and Build/060-Practice Write Your Own Makefile)

#### 跟练交付物

- 已具备状态：完成第 051-059 课，能重新编译上一章示例。
- 工作目录：`~/c-course-labs/060-makefile-lab`。
- 第一条命令：macOS / Linux 运行 `mkdir -p ~/c-course-labs/060-makefile-lab && cd ~/c-course-labs/060-makefile-lab`；Windows PowerShell 运行 `New-Item -ItemType Directory -Force "$HOME\c-course-labs\060-makefile-lab"; Set-Location "$HOME\c-course-labs\060-makefile-lab"`。
- 成功证据：保留源码、可执行文件、`evidence.md`，并记录`make`、修改一个 `.c` 后的增量构建、`make clean` 三段记录。
- 本章边界：本章关注可重复构建；暂不要求 CMake、Ninja 或跨平台发布流水线。
- 重置方式：删除本章生成的可执行文件、临时数据和输出文件，保留源码与 `evidence.md` 方便复盘。

现在您已经了解了 C 构建过程的工作原理、预处理、编译、链接和库，是时候将所有内容与您自己的 Makefile 结合在一起了。

`make`是 C 开发中最古老、最强大的自动化工具之一。它监视文件时间戳，仅构建已更改的内容，并允许您以简洁的方式定义构建规则。

通过编写自己的 Makefile，您将像专业人士一样自动化整个编译工作流程。

#### 步骤 1. 创建项目

让我们构建一个小型多文件项目：

```
project/
├── Makefile
├── main.c
├── math.c
├── math.h
└── string_utils.c
```

主程序

```
#include <stdio.h>
#include "math.h"
int main(void) {
    printf("2 + 3 = %d\n", add(2, 3));
    printf("2 * 3 = %d\n", mul(2, 3));
    return 0;
}
```

数学.c

```
#include "math.h"
int add(int a, int b) { return a + b; }
int mul(int a, int b) { return a * b; }
```

数学.h

```
#ifndef MATH_H
#define MATH_H
int add(int a, int b);
int mul(int a, int b);
#endif
```

#### 步骤 2. 编写最简单的 Makefile

生成文件

```
main: main.c math.c
    gcc main.c math.c -o main
```

跑步：

```
make
./main
```

输出：

```
2 + 3 = 5
2 * 3 = 6
```

这可行，但是`make`每次都会重建所有内容，即使只更改了一个文件。

让我们让它变得更聪明。

#### 步骤 3. 拆分编译步骤

单独编译成目标文件：

```
CC = gcc
CFLAGS = -Wall -std=c99
main: main.o math.o
    $(CC) $(CFLAGS) main.o math.o -o main
main.o: main.c math.h
    $(CC) $(CFLAGS) -c main.c
math.o: math.c math.h
    $(CC) $(CFLAGS) -c math.c
clean:
    rm -f *.o main
```

现在当你跑步时`make`，它构建了`.o`文件仅一次，并且仅重新编译更改的内容。

测试一下：

```
make
touch math.c
make
```

你只会看到`math.o`是重建的。

#### 步骤 4. 添加自动依赖关系处理

使用模式规则来避免对每个重复命令`.c`文件：

```
CC = gcc
CFLAGS = -Wall -std=c99
OBJS = main.o math.o string_utils.o
TARGET = app
$(TARGET): $(OBJS)
    $(CC) $(CFLAGS) $(OBJS) -o $(TARGET)
%.o: %.c
    $(CC) $(CFLAGS) -c $< -o $@
clean:
    rm -f $(OBJS) $(TARGET)
```

`$<`表示“第一个依赖项”（例如`main.c`).`$@`意思是“目标”（比如`main.o`).

现在 Makefile 适用于任何`.c`自动归档。

#### 步骤 5. 添加调试和发布目标

真实的项目有多种构建模式：

```
CC = gcc
CFLAGS = -Wall -std=c99
DEBUG_FLAGS = -g -O0 -DDEBUG
RELEASE_FLAGS = -O2 -DNDEBUG
OBJS = main.o math.o
TARGET = app
.PHONY: all clean debug release
all: release
debug: CFLAGS += $(DEBUG_FLAGS)
debug: $(TARGET)
release: CFLAGS += $(RELEASE_FLAGS)
release: $(TARGET)
$(TARGET): $(OBJS)
    $(CC) $(CFLAGS) $(OBJS) -o $(TARGET)
%.o: %.c
    $(CC) $(CFLAGS) -c $< -o $@
clean:
    rm -f $(OBJS) $(TARGET)
```

跑步：

```
make debug
./app
```

然后：

```
make clean
make release
```

调试版本具有以下符号`gdb`;发布版本已优化。

#### 步骤 6. 添加静态和共享库目标

将这些添加到您的 Makefile 中：

```
libmylib.a: math.o
    ar rcs libmylib.a math.o
libmylib.so: math.o
    $(CC) -shared -o libmylib.so math.o
```

现在您可以构建一个可重用的库：

```
make libmylib.a
make libmylib.so
```

#### 步骤 7. 添加安装和帮助

```
install:
    cp app /usr/local/bin/
help:
    @echo "make [target]"
    @echo "Targets: all, debug, release, clean, install, libmylib.a, libmylib.so"
```

这`@`抑制命令回显，仅打印您的消息。

跑步：

```
make help
```

#### 步骤 8. 使用变量作为路径和选项

通过对相关标志进行分组来清理 Makefile：

```
CC = gcc
SRC = $(wildcard *.c)
OBJ = $(SRC:.c=.o)
CFLAGS = -Wall -Wextra -std=c99
LDFLAGS = -lm
TARGET = app
$(TARGET): $(OBJ)
    $(CC) $(CFLAGS) $(OBJ) -o $(TARGET) $(LDFLAGS)
clean:
    rm -f $(OBJ) $(TARGET)
```

`wildcard`和`patsubst`让你自动包含新的`.c`随着项目的增长而生成的文件。

#### 小代码：最终完善的 Makefile

```
CC = gcc
CFLAGS = -Wall -Wextra -std=c99 -O2
LDFLAGS = -lm
SRC = $(wildcard *.c)
OBJ = $(SRC:.c=.o)
TARGET = app
all: $(TARGET)
$(TARGET): $(OBJ)
    $(CC) $(CFLAGS) $(OBJ) -o $(TARGET) $(LDFLAGS)
%.o: %.c
    $(CC) $(CFLAGS) -c $< -o $@
clean:
    rm -f $(OBJ) $(TARGET)
```

跑步：

```
make
./app
```

这种模式简单、健壮且可扩展，是几乎所有 C 构建系统的基础。

#### 步骤9.Makefile调试

查看有哪些命令`make`正在运行：

```
make VERBOSE=1
```

或者跟踪变量扩展：

```
make -p
```

添加`@echo "Building $@"`为了清楚起见，在命令之前。

#### 第 10 步：为什么它很重要

精心设计的 Makefile：

- 自动化您的整个 C 构建工作流程
- 避免重新编译未更改的文件
- 扩展到大型多目录项目
- 使您的构建可跨系统重现

这是您迈向 CMake、Meson 或 Bazel 等专业构建系统的第一步，所有这些系统都建立在这些原则之上。

#### 自己尝试一下

1.添加一个新的`.c`文件并观察 Makefile 自动编译它。
2.添加一个`test`编译和运行单元测试的目标。
3. 使用添加彩色输出`tput`或 ANSI 转义。
4. 在一次运行中构建静态库和共享库。
5. 将 Makefile 转换为使用多个目录 (`src/`,`include/`,`build/`).

恭喜！您已经完成了第 6 章 – 编译和构建过程。您现在了解了源代码如何成为可执行文件、从预处理器到链接器的每个阶段以及其间的每个工具。

接下来，我们将深入了解第 7 章：靠近系统工作，您的程序开始通过系统调用、进程和文件直接与操作系统交互。
