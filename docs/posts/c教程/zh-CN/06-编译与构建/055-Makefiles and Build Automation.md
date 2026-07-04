---
title: "55. Makefile 和构建自动化"
date: "2026-07-04"
lang: "zh-CN"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "06-编译与构建"
  - "中文"
description: "The Little Book of C 中文版 — 55. Makefile 和构建自动化"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
translator: "机器辅助翻译（Google Translate）"
section: 55
sidebarWeight: 55
alternateZh: "/posts/c教程/zh-CN/06-编译与构建/055-Makefiles and Build Automation"
alternateEn: "/posts/c教程/en-US/06-Compilation and Build/055-Makefiles and Build Automation"
---

[English version](/posts/c教程/en-US/06-Compilation and Build/055-Makefiles and Build Automation)

手动编译一两个 C 文件就可以了，但实际项目很快就会增长到数十或数百个文件。打字时间长`gcc`每次执行命令都会变得乏味、容易出错并且在不同环境中不一致。

这就是 Makefile 的用武之地。它们自动化构建过程，跟踪依赖关系，并仅重建发生变化的部分。

让我们全面了解如何使用`make`并编写简单但功能强大的 Makefile。

#### 步骤 1. 什么是 make？

`make`是一个读取名为 Makefile 的文件并执行它定义的构建规则的工具。

每条规则描述：

1. 目标（你想要构建的东西）
2.它的依赖（它需要什么）
3. 构建命令

基本语法：

```
target: dependencies
<TAB>command
```

是的，缩进必须是真正的制表符，而不是空格。

#### 步骤 2. 最简单的 Makefile

假设您的项目有：

```
main.c
math.c
math.h
```

生成文件：

```
app: main.c math.c
    gcc main.c math.c -o app
```

建造：

```
make
```

输出：

```
gcc main.c math.c -o app
```

跑步：

```
./app
```

现在如果你跑`make`再次，什么也没有发生，因为`make`看到输出（`app`）比来源更新。这就是依赖跟踪的魔力。

#### 步骤 3. 分成编译步骤

更好的版本构建`.o`分别归档：

```
app: main.o math.o
    gcc main.o math.o -o app
main.o: main.c math.h
    gcc -c main.c
math.o: math.c math.h
    gcc -c math.c
```

现在当你只改变`math.c`， 仅有的`math.o`重新编译。

#### 小代码：最小项目

主程序

```
#include <stdio.h>
#include "math.h"
int main(void) {
    printf("2 + 3 = %d\n", add(2, 3));
    return 0;
}
```

数学.c

```
int add(int a, int b) { return a + b; }
```

数学.h

```
int add(int a, int b);
```

生成文件

```
app: main.o math.o
    gcc main.o math.o -o app
main.o: main.c math.h
    gcc -c main.c
math.o: math.c math.h
    gcc -c math.c
clean:
    rm -f *.o app
```

跑步：

```
make
./app
make clean
```

#### 步骤 4. 使用变量

Makefile 支持变量以避免重复：

```
CC = gcc
CFLAGS = -Wall -Wextra -std=c99
OBJ = main.o math.o
app: $(OBJ)
    $(CC) $(OBJ) -o app
%.o: %.c
    $(CC) $(CFLAGS) -c $< -o $@
clean:
    rm -f $(OBJ) app
```

这里：

-`$<`= 第一个依赖项
-`$@`= 目标名称
-`%.o: %.c`= 模式规则（适用于所有匹配文件）

#### 步骤 5. 添加调试和发布模式

```
CC = gcc
CFLAGS = -Wall -std=c99
DEBUG_FLAGS = -g -O0
RELEASE_FLAGS = -O2
OBJ = main.o math.o
TARGET = app
all: release
debug: CFLAGS += $(DEBUG_FLAGS)
debug: $(TARGET)
release: CFLAGS += $(RELEASE_FLAGS)
release: $(TARGET)
$(TARGET): $(OBJ)
    $(CC) $(CFLAGS) $(OBJ) -o $(TARGET)
clean:
    rm -f $(OBJ) $(TARGET)
```

在调试模式下构建：

```
make debug
```

构建优化版本：

```
make release
```

#### 步骤 6. 自动依赖关系

你可以有`gcc`自动生成依赖文件：

```
gcc -MMD -c main.c
```

这创造了`main.d`它跟踪包含的标头。您可以将这些文件包含在 Makefile 中以进行自动重建：

```
-include $(OBJ:.o=.d)
```

这就是专业构建系统保持依赖关系准确的方式。

#### 步骤 7. 虚假目标

不生成实际文件的目标应标记为虚假目标：

```
.PHONY: clean all debug release
```

这可以防止文件名冲突（例如，如果文件名为`clean`存在）。

#### 步骤 8. 组织更大的项目

对于多目录项目：

```
src/
 ├── main.c
 ├── util.c
include/
 ├── util.h
```

您可以像这样构造您的 Makefile：

```
SRC = src/main.c src/util.c
OBJ = $(SRC:.c=.o)
CFLAGS = -Iinclude -Wall
TARGET = app
$(TARGET): $(OBJ)
    $(CC) $(OBJ) -o $@
%.o: %.c
    $(CC) $(CFLAGS) -c $< -o $@
clean:
    rm -f $(OBJ) $(TARGET)
```

`-Iinclude`告诉编译器在哪里可以找到头文件。

#### 步骤 9. 使用内置规则

`make`已经知道如何构建`.o`从`.c`。一个极简的 Makefile 可以是：

```
app: main.o math.o
    gcc $^ -o $@
```

在哪里`$^`扩展到所有依赖项（`main.o math.o`).

#### 步骤 10. 小代码：库构建示例

```
CC = gcc
CFLAGS = -Wall -std=c99
OBJ = util.o io.o
LIB = libtools.a
$(LIB): $(OBJ)
    ar rcs $(LIB) $(OBJ)
clean:
    rm -f $(OBJ) $(LIB)
```

构建您的静态库：

```
make
```

现在链接它：

```
gcc main.c -L. -ltools -o app
```

#### 为什么它很重要

Makefile 为您提供：

- 可重复的构建，每次都使用相同的命令
- 增量重新编译，仅更改文件重建
- 多种配置、调试、发布、测试
- 可扩展性，可以运行脚本、代码生成、打包等。

每个严肃的 C 项目，从 Linux 内核到小型嵌入式工具，都依赖于`make`或其后代（如 CMake、Ninja、Meson）。

#### 自己尝试一下

1.创建一个项目有3`.c`文件和2`.h`文件。
2. 编写支持的Makefile`make debug`,`make release`， 和`make clean`.
3.添加一个`make install`将二进制文件复制到的目标`/usr/local/bin`.
4. 使用变量，如`CC`,`CFLAGS`和模式规则来简化您的文件列表。
5. 跑步`make -n`预览命令而不执行它们。

在下一节中，您将学习如何链接多个文件和库，了解目标文件、符号以及代码在构建过程中如何连接在一起。
