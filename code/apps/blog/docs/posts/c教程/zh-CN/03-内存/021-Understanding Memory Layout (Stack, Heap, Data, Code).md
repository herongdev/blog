---
title: "21. 了解内存布局（堆栈、堆、数据、代码）"
date: "2026-07-04"
lang: "zh-CN"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "03-内存"
  - "中文"
description: "The Little Book of C 中文版 — 21. 了解内存布局（堆栈、堆、数据、代码）"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
translator: "机器辅助翻译（Google Translate）"
section: 21
sidebarWeight: 21
alternateZh: "/posts/c教程/zh-CN/03-内存/021-Understanding Memory Layout (Stack, Heap, Data, Code)"
alternateEn: "/posts/c教程/en-US/03-Working with Memory/021-Understanding Memory Layout (Stack, Heap, Data, Code)"
---

[English version](/posts/c教程/en-US/03-Working with Memory/021-Understanding Memory Layout (Stack, Heap, Data, Code))

在掌握指针或动态内存之前，您需要了解正在运行的 C 程序中内存是如何组织的。 C 为您提供了很少有语言允许的控制级别，但为了安全地使用它，您必须知道数据存放在哪里以及在那里存放多长时间。

#### 内存段

当程序运行时，其内存分为几个关键部分：

|细分 |目的|示例数据 |
| --- | --- | --- |
|代码（文本）|存储编译的机器指令 |函数、程序逻辑 |
|数据（静态）|存储具有初始化值的全局变量和静态变量 |`int count = 5;`|
| BSS（未初始化数据）|保存从零开始或未初始化的全局/静态变量 |`int buffer[256];`|
|堆|用于动态内存分配（`malloc`,`calloc`) |运行时创建的大型数据 |
|堆栈|存储局部变量、函数参数、返回地址 |函数调用、递归 |

这些段由操作系统以不同的方式管理，并且每个段都有不同的生命周期和范围。

#### 小代码

这是一个小程序，它打印不同变量的内存地址以显示它们所在的位置：

```
#include <stdio.h>
#include <stdlib.h>
// Global variable (Data segment)
int global_var = 42;
// Uninitialized global variable (BSS segment)
int global_bss;
void show_addresses(void) {
    // Local variable (Stack)
    int local_var = 10;
    // Static variable (Data segment)
    static int static_var = 20;
    // Dynamic variable (Heap)
    int *heap_var = malloc(sizeof(int));
    *heap_var = 30;
    printf("Code (function) address:     %p\n", (void *)show_addresses);
    printf("Global variable address:     %p\n", (void *)&global_var);
    printf("Uninitialized global address:%p\n", (void *)&global_bss);
    printf("Static variable address:     %p\n", (void *)&static_var);
    printf("Stack variable address:      %p\n", (void *)&local_var);
    printf("Heap variable address:       %p\n", (void *)heap_var);
    free(heap_var);
}
int main(void) {
    show_addresses();
    return 0;
}
```

编译并运行：

```
gcc memory_layout.c -o memory_layout
./memory_layout
```

示例输出（地址因系统而异）：

```
Code (function) address:     0x561ce7348169
Global variable address:     0x561ce7546014
Uninitialized global address:0x561ce7546018
Static variable address:     0x561ce7546020
Stack variable address:      0x7ffc94b65a5c
Heap variable address:       0x561ce774b2a0
```

注意栈地址远高于堆，栈通常向下增长，而堆在内存中向上增长。

#### 一切如何运作

代码段

- 包含编译指令。
- 通常标记为只读以防止意外修改。

数据段

- 保存用值初始化的全局变量和静态变量。
- 在整个计划期间都存在。

BSS（由符号开始的块）

- 保存未初始化的全局/静态变量。
- 运行时自动零初始化。

堆

- 用于局部变量和函数调用。
- 随着函数被调用和返回而自动管理、增长和收缩。

堆

- 在运行时手动分配。
- 需要明确的管理（`malloc`和`free`).

#### 为什么它很重要

每次编写变量时，无论是否有意识，您都在决定它在内存中的位置。了解此布局可以帮助您：

- 调试内存错误（分段错误、泄漏、损坏）。
- 关于性能和函数调用的原因。
- 使用时编写正确的代码`malloc`,`free`和指针。
- 构建真实的系统软件，如分配器或内核。

如果没有这种思维模型，C 内存错误就会让人感到神秘；有了它，它们就变得合乎逻辑并且可以修复。

#### 自己尝试一下

1. 在示例中添加更多全局、局部和静态变量并打印它们的地址。
2. 分配两个块`malloc()`并比较它们的地址，堆向上增长。
3. 打电话`show_addresses()`多次并注意每次调用时堆栈变量的地址如何变化。
4. 将变量从全局移动到局部，并观察其内存段如何变化。
5. 绘制一个图表，显示系统的堆栈、堆、数据和代码区域。

了解内存布局是您进入系统级 C 语言的第一步，您可以通过它开始将代码不仅视为文本，而且视为内存中的结构化字节。
