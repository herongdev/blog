---
title: "5. 使用标头和预处理器"
date: "2026-07-04"
lang: "zh-CN"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "01-入门"
  - "中文"
description: "The Little Book of C 中文版 — 5. 使用标头和预处理器"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
translator: "机器辅助翻译（Google Translate）"
section: 5
sidebarWeight: 5
alternateZh: "/posts/c教程/zh-CN/01-入门/005-Using Headers and the Preprocessor"
alternateEn: "/posts/c教程/en-US/01-Getting Started/005-Using Headers and the Preprocessor"
---

[English version](/posts/c教程/en-US/01-Getting Started/005-Using Headers and the Preprocessor)

每个 C 程序在开始运行之前就开始了，有一个叫做预处理器的东西。在编译器将代码转换为机器指令之前，预处理器会对其进行准备：它提取文件、替换宏并设置程序所需的一切。这一步就是让`#include <stdio.h>`工作，这是理解大型 C 项目如何组织的关键。

#### 小代码

```
#include <stdio.h>   // include the standard input/output header
#define PI 3.14159    // define a constant macro
int main(void) {
    printf("PI is approximately %.2f\n", PI);
    return 0;
}
```

当您编译该程序时，预处理器将替换`PI`和`3.14159`并包括文件的内容`stdio.h`在编译器启动之前。

您可以通过运行以下命令查看预处理结果：

```
gcc -E program.c
```

它将输出更长版本的代码，显示所有行`stdio.h`添加到幕后。

#### 标题如何工作

标头是声明文件。它们告诉编译器存在什么，例如函数、常量和类型，而不实际提供代码（定义）。例如，`stdio.h`声明函数`printf()`所以编译器知道如何调用它。

包含标头的主要方式有两种：

系统标头：

```
#include <stdio.h>
```

编译器在标准库目录中查找这些。

用户定义的标头：

```
#include "myutils.h"
```

编译器首先在您的项目文件夹中查找这些。

这种分离使大型程序保持模块化和可读性。

#### 为什么它很重要

预处理器就像程序的“设置人员”。它不会运行您的代码，而是准备代码。通过了解标头和宏，您可以：

- 将大程序分割成更小的、可重用的部分。
- 在一处定义常量而不是重复值。
- 编写可在不同系统上编译的可移植代码。
- 避免由于缺少声明而导致的细微错误。

当你写的时候`#include <stdio.h>`，您正在利用数十年的可靠共享代码，这是 C 生态系统的最大优势之一。

#### 自己尝试一下

创建两个文件：

Mathutils.h

```
#ifndef MATHUTILS_H
#define MATHUTILS_H
#define SQUARE(x) ((x) * (x))
#endif
```

主程序

```
#include <stdio.h>
#include "mathutils.h"
int main(void) {
    int n = 5;
    printf("The square of %d is %d\n", n, SQUARE(n));
    return 0;
}
```

编译并运行：

```
gcc main.c -o main
./main
```

尝试编辑宏`mathutils.h`添加一个`CUBE(x)`函数，并将其用于`main.c`.

然后运行：

```
gcc -E main.c | less
```

探索预处理的代码并查看包含和宏如何扩展。

一旦掌握了标头和预处理，您就会了解大型 C 代码库如何保持组织性，以及简单的 C 代码库如何保持组织性。`#include`line 可以解锁整个功能库。
