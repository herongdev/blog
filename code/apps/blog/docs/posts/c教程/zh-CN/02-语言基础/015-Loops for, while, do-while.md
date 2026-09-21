---
title: "15. 循环：for、while、do-while"
date: "2026-07-04"
lang: "zh-CN"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "02-语言基础"
  - "中文"
description: "The Little Book of C 中文版 — 15. 循环：for、while、do-while"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
translator: "机器辅助翻译（Google Translate）"
section: "15"
sidebarWeight: "15"
alternateZh: "/posts/c教程/zh-CN/02-语言基础/015-Loops for, while, do-while"
alternateEn: "/posts/c教程/en-US/02-Language Basics/015-Loops for, while, do-while"
---

[English version](/posts/c教程/en-US/02-Language Basics/015-Loops for, while, do-while)

有时，您需要程序一次又一次地重复某些操作、计算、打印语句或检查。您不必多次复制同一行代码，而是使用循环。循环使您的程序高效、紧凑，并且能够处理任何大小的动态数据。

#### for 循环

一个`for`循环重复一段代码固定次数。

```
for (initialization; condition; update) {
    // repeated statements
}
```

例子：

```
for (int i = 0; i < 10; i++) {
    printf("%d ", i);
}
```

解释：

- 初始化在开始时运行一次（`int i = 0`)
- 在每个循环之前检查条件（`i < 10`)
- 每次迭代后运行更新（`i++`)
- 当条件变为假时循环停止

#### while 循环

这`while`当条件保持为真时循环会重复。

```
int n = 5;
while (n > 0) {
    printf("n = %d\n", n);
    n--;
}
```

该循环执行只要`n`大于零。

#### do-while 循环

这`do-while`循环保证至少执行一次，因为条件是在主体之后检查的。

```
int i = 0;
do {
    printf("Running once! i = %d\n", i);
    i++;
} while (i < 1);
```

它对于输入验证或重复任务直到用户选择停止非常有用。

#### 中断与继续

有时您想在循环中跳过或停止。

```
for (int i = 1; i <= 10; i++) {
    if (i == 5) continue;   // skip this iteration
    if (i == 8) break;      // stop the loop
    printf("%d ", i);
}
```

输出：

```
1 2 3 4 6 7
```

#### 嵌套循环

您可以将一个循环放入另一个循环中以处理网格、表格或多个维度。

```
for (int i = 1; i <= 3; i++) {
    for (int j = 1; j <= 2; j++) {
        printf("i=%d, j=%d\n", i, j);
    }
}
```

输出：

```
i=1, j=1
i=1, j=2
i=2, j=1
i=2, j=2
i=3, j=1
i=3, j=2
```

#### 小代码

这是一个完整的程序，演示了所有三种类型的循环和控制流功能：

```
#include <stdio.h>
int main(void) {
    // for loop
    printf("for loop:\n");
    for (int i = 1; i <= 5; i++) {
        printf("%d ", i);
    }
    printf("\n\n");
    // while loop
    printf("while loop:\n");
    int n = 3;
    while (n > 0) {
        printf("n = %d\n", n);
        n--;
    }
    printf("\n");
    // do-while loop
    printf("do-while loop:\n");
    int x = 0;
    do {
        printf("x = %d\n", x);
        x++;
    } while (x < 1);
    printf("\n");
    // break and continue
    printf("break and continue demo:\n");
    for (int i = 1; i <= 10; i++) {
        if (i == 5) continue; // skip 5
        if (i == 8) break;    // stop at 8
        printf("%d ", i);
    }
    printf("\n");
    // nested loop
    printf("\nnested loops:\n");
    for (int i = 1; i <= 2; i++) {
        for (int j = 1; j <= 3; j++) {
            printf("(%d,%d) ", i, j);
        }
        printf("\n");
    }
    return 0;
}
```

编译并运行：

```
gcc loops_demo.c -o loops_demo
./loops_demo
```

您将看到所有类型的循环正在运行。

#### 为什么它很重要

循环是每个 C 程序中重复的引擎。它们使以下成为可能：

- 处理数组、文件和数据列表
- 运行迭代直到满足条件的算法
- 有效地自动化重复性任务

在C语言中，循环与CPU本身的运行方式很接近，每次迭代都是逻辑和计算的直接循环。通过掌握它们，您可以控制程序如何移动、停止和重复，这是每个算法的心跳。

#### 自己尝试一下

写一个`for`打印数字 1 到 100 的循环。

添加一个`if`在里面只打印偶数。

写一个`while`从 10 倒数到 1 的循环。

创建一个打印 3×3 乘法表的嵌套循环。

安全地尝试无限循环：

```
while (1) {
    printf("Press Ctrl+C to stop\n");
    break; // or add a condition to exit
}
```

一旦您熟悉了循环，您就可以通过控制代码重复次数和条件来构建模式、算法和数据处理器。
