---
title: "56. 链接多个文件"
date: "2026-07-04"
lang: "zh-CN"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "06-编译与构建"
  - "中文"
description: "The Little Book of C 中文版 — 56. 链接多个文件"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
translator: "机器辅助翻译（Google Translate）"
section: 56
sidebarWeight: 56
alternateZh: "/posts/c教程/zh-CN/06-编译与构建/056-Linking Multiple Files"
alternateEn: "/posts/c教程/en-US/06-Compilation and Build/056-Linking Multiple Files"
---

[English version](/posts/c教程/en-US/06-Compilation and Build/056-Linking Multiple Files)

当一个程序超出一个程序时`.c`文件中，编译器必须将它们组合成一个可执行文件。这个链接过程是将所有函数、变量和库引用连接到一个二进制文件中。

您已经看过它的片段：

```
gcc main.o math.o -o app
```

但现在我们将更深入地了解链接的工作原理以及出现问题时会发生什么。

#### 步骤 1. 两个编译阶段

每个 C 构建都有两个主要阶段：

编译 - 每个`.c`文件变成`.o`（目标文件）。

```
gcc -c main.c -o main.o
gcc -c math.c -o math.o
```

每个`.o`文件包含机器代码和符号表（它定义的内容和需要的内容的列表）。

链接 – 链接器 (`ld`) 合并所有`.o`文件和库转换为可执行文件：

```
gcc main.o math.o -o app
```

如果缺少任何符号（例如未定义的函数），链接器将失败。

#### 步骤 2. 什么是符号？

符号是编译器用来跟踪函数和全局变量的名称。有两种：

- 定义的符号 – 该文件提供的函数或变量。
- 未定义的符号——它需要从另一个文件中获取的东西。

例子：

数学.c

```
int add(int a, int b) { return a + b; }
```

主程序

```
#include <stdio.h>
int add(int, int);
int main(void) {
    printf("%d\n", add(2, 3));
    return 0;
}
```

编译并链接：

```
gcc -c main.c
gcc -c math.c
gcc main.o math.o -o app
```

跑步：

```
5
```

如果您忘记链接`math.o`:

```
gcc main.o -o app
```

你会得到：

```
undefined reference to `add'
```

#### 步骤 3. 使用头文件进行声明

每个`.c`文件应在标头中声明（而不是定义）外部函数：

数学.h

```
#ifndef MATH_H
#define MATH_H
int add(int a, int b);
#endif
```

然后将其包含在两者中`main.c`和`math.c`:

```
#include "math.h"
```

这确保了声明和定义之间的一致性。

#### 步骤 4. 链接目标文件和库

您可以链接任意数量的`.o`文件：

```
gcc main.o math.o util.o io.o -o app
```

您还可以链接到库：

```
gcc main.o -lm -o app
```

(`-lm`链接数学库，提供如下功能`sqrt`,`sin`， ETC。）

这`-l`标记搜索`/usr/lib`和`/lib`默认情况下。

自定义库示例：

```
gcc main.o -L. -lmyutils -o app
```

这里，`-L.`将当前目录添加到库搜索路径中，并且`-lmyutils`链接`libmyutils.a`或者`libmyutils.so`.

#### 步骤 5. 链接顺序很重要

链接器从左到右读取。如果在其定义出现之前使用符号，则可能会失败。

例子：

```
gcc -lm main.o -o app    # ❌ wrong order
gcc main.o -lm -o app    # ✅ correct
```

始终在需要库的目标文件之后列出库。

#### 步骤 6. 拆分和链接多文件项目

```
project/
├── main.c
├── math.c
├── io.c
├── math.h
├── io.h
└── Makefile
```

生成文件

```
CC = gcc
CFLAGS = -Wall -std=c99
OBJ = main.o math.o io.o
TARGET = app
$(TARGET): $(OBJ)
    $(CC) $(OBJ) -o $(TARGET)
%.o: %.c
    $(CC) $(CFLAGS) -c $< -o $@
clean:
    rm -f $(OBJ) $(TARGET)
```

现在，只需运行：

```
make
./app
```

Makefile 负责按顺序编译和链接所有内容。

#### Tiny Code：构建小型模块化程序

数学.c

```
#include "math.h"
int square(int x) { return x * x; }
int cube(int x) { return x * x * x; }
```

数学.h

```
#ifndef MATH_H
#define MATH_H
int square(int x);
int cube(int x);
#endif
```

主程序

```
#include <stdio.h>
#include "math.h"
int main(void) {
    printf("square(3) = %d\n", square(3));
    printf("cube(2) = %d\n", cube(2));
    return 0;
}
```

手动构建：

```
gcc -c math.c -o math.o
gcc -c main.c -o main.o
gcc main.o math.o -o app
./app
```

输出：

```
square(3) = 9
cube(2) = 8
```

#### 步骤 7. 静态链接与动态链接

|类型 |文件|描述 |
| --- | --- | --- |
|静态|`.a`|代码被复制到可执行文件中 |
|动态 |`.so`|代码在运行时通过系统库共享 |

静态链接：

```
gcc main.o -L. -lmath -static -o app
```

动态链接（默认）：

```
gcc main.o -L. -lmath -o app
```

动态可执行文件较小，并且跨程序共享库。

#### 步骤 8. 检查链接的二进制文件

要查看哪些符号已定义或缺失：

```
nm main.o | head
```

或者对于完整的二进制文件：

```
objdump -t app | less
ldd app
```

`ldd`显示程序依赖哪些共享库。

#### 步骤 9. 常见链接错误

|错误 |意义|修复 |
| --- | --- | --- |
|`undefined reference to `|丢失的`.o`或图书馆 |添加所有目标文件或更正`-l`旗帜|
|`multiple definition of `|多个文件中定义的相同函数 |使用`extern`在声明中|
|`cannot find -lfoo`|缺少库文件 |查看`-L`路径或安装开发包 |
|`relocation truncated`|不匹配的架构|确保所有文件都是为同一目标构建的 |

#### 步骤 10. 内联与外部链接

内联函数定义为`static inline`标题中不需要链接，每个`.c`文件获得自己的副本。但功能正常`.c`文件必须仅链接一次。

#### 为什么它很重要

链接是你的程序变得完整的地方。它教你：

- 如何`.o`和`.h`文件交互
- 库如何与您的二进制文件集成
- 如何调试丢失的符号和多个定义
- 模块化设计如何影响构建架构

了解链接器对于构建可扩展的多文件系统（从小型实用程序到整个内核）至关重要。

#### 自己尝试一下

1. 创建一个程序 3`.c`文件和 3`.h`文件。
2. 故意省略一个目标文件并观察链接器错误。
3. 使用`nm`检查每个函数的功能`.o`定义和参考。
4. 构建静态库（`ar rcs libutils.a util.o`）并手动链接它。
5. 使用`ldd`列出您编译的程序所依赖的共享库。

接下来，您将学习如何创建和使用静态库和共享库，这是每个严肃的 C 项目所依赖的可重用性和可扩展性的模块化构建块。
