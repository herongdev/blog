---
title: "19. 代码单元的静态链接与动态链接"
date: "2026-07-04"
lang: "zh-CN"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "02-语言基础"
  - "中文"
description: "The Little Book of C 中文版 — 19. 代码单元的静态链接与动态链接"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
translator: "机器辅助翻译（Google Translate）"
section: 19
sidebarWeight: 19
alternateZh: "/posts/c教程/zh-CN/02-语言基础/019-Static vs Dynamic Linking of Code Units"
alternateEn: "/posts/c教程/en-US/02-Language Basics/019-Static vs Dynamic Linking of Code Units"
---

[English version](/posts/c教程/en-US/02-Language Basics/019-Static vs Dynamic Linking of Code Units)

当您的程序超出单个文件时，您开始将位于不同文件中的多个代码单元、函数和数据链接在一起。此链接步骤决定您的程序如何组合和共享代码。 C 语言主要有两种实现方式：静态链接和动态链接。理解两者对于构建现实世界的软件至关重要。

#### 大局观

当您编译 C 程序时：

每个`.c`文件成为目标文件（`.o`).

链接器将所有目标文件和库组合成一个可执行文件。

根据您的链接方式，该可执行文件可能包含：

- 所有必需的代码都在里面（静态链接），或者
- 对系统上共享库的引用（动态链接）。

#### 静态链接

静态链接在构建时将所有必要的库代码直接复制到您的程序中。

命令示例：

```
gcc main.c mathutils.c -o app_static
```

一切都来自`mathutils.c`嵌入内部`app_static`.

优点：

- 运行时无外部依赖
- 启动速度更快（一切都是独立的）
- 更容易部署

缺点：

- 更大的可执行文件
- 更新库意味着重新编译程序

#### 动态链接

动态链接（或共享链接）将您的程序链接到共享库（`.so`在Linux上，`.dll`在 Windows 上）在运行时而不是嵌入它们。

例子：

```
gcc main.c -o app_dynamic -lm
```

这里，`-lm`告诉链接器使用共享数学库（`libm.so`).

您的程序将库分开，在执行时加载它。

优点：

- 较小的可执行文件
- 库可以独立更新
- 多个程序共享内存中的同一个库

缺点：

- 需要在运行时提供正确的库
- 启动速度稍慢

#### 小代码

让我们使用一个简单的数学实用程序来演示静态链接与动态链接。

mathutils.c

```
#include <stdio.h>
int add(int a, int b) {
    return a + b;
}
int multiply(int a, int b) {
    return a * b;
}
```

Mathutils.h

```
#ifndef MATHUTILS_H
#define MATHUTILS_H
int add(int a, int b);
int multiply(int a, int b);
#endif
```

主程序

```
#include <stdio.h>
#include "mathutils.h"
int main(void) {
    int x = 4, y = 5;
    printf("Add: %d\n", add(x, y));
    printf("Multiply: %d\n", multiply(x, y));
    return 0;
}
```

静态链接构建：

```
gcc main.c mathutils.c -o static_app
./static_app
```

输出：

```
Add: 9
Multiply: 20
```

动态链接构建（使用共享库）：

```
gcc -c -fPIC mathutils.c -o mathutils.o
gcc -shared -o libmathutils.so mathutils.o
gcc main.c -L. -lmathutils -o dynamic_app
export LD_LIBRARY_PATH=.
./dynamic_app
```

输出：

```
Add: 9
Multiply: 20
```

现在您的可执行文件依赖于共享`libmathutils.so`，同一个库可以被许多其他程序使用。

#### 为什么它很重要

链接决定了您的软件如何连接和共享代码。它影响：

- 性能和内存使用情况
- 部署和可移植性
- 当库发生变化时您的程序更新有多容易

静态链接非常适合小型独立工具。动态链接更适合大型系统、共享组件或依赖系统库（例如`libc`,`libm`,`pthread`).

理解链接使您成为一名系统思考者，您将知道程序的各个部分如何在二进制级别组合在一起。

#### 自己尝试一下

1. 创建`mathutils.c`和`mathutils.h`如上所述。
2、静态编译和动态编译；使用比较文件大小`ls -lh`.
3. 移动`libmathutils.so`退出目录并运行`./dynamic_app`，注意缺少库错误。
4.添加`export LD_LIBRARY_PATH=.`并再次运行。
5. 修改`multiply()`要打印消息，只需重新编译共享库即可看到更改立即生效。

静态与动态链接是您的 C 程序从“源代码”转移到实际软件的地方，您的逻辑如何成为在任何机器上生存、加载和运行的可执行文件的一部分。
