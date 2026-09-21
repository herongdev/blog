---
title: "22. 指针和地址"
date: "2026-07-04"
lang: "zh-CN"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "03-内存"
  - "中文"
description: "The Little Book of C 中文版 — 22. 指针和地址"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
translator: "机器辅助翻译（Google Translate）"
section: 22
sidebarWeight: 22
alternateZh: "/posts/c教程/zh-CN/03-内存/022-Pointers and Addresses"
alternateEn: "/posts/c教程/en-US/03-Working with Memory/022-Pointers and Addresses"
---

[English version](/posts/c教程/en-US/03-Working with Memory/022-Pointers and Addresses)

指针是 C 编程的核心。它们使您能够直接访问内存，以及读取、写入和操作存储在程序中任何位置的数据的能力。了解指针会改变您对变量、函数和数据结构的看法。

如果不掌握指针，就无法真正掌握 C。

#### 什么是指针？

指针是一个存储另一个变量地址的变量。将其视为对内存中特定位置的引用。

```
int value = 42;
int *ptr = &value; // pointer to int, stores the address of value
```

-`&value`给出内存地址`value`.
-`ptr`持有该地址。
-`*ptr`允许您访问存储在那里的值（这称为取消引用）。

#### 小代码

```
#include <stdio.h>
int main(void) {
    int number = 10;
    int *p = &number;  // pointer stores address of number
    printf("Value of number: %d\n", number);
    printf("Address of number: %p\n", (void *)&number);
    printf("Pointer p holds address: %p\n", (void *)p);
    printf("Value through pointer: %d\n", *p);
    *p = 20;  // modify the value via the pointer
    printf("New value of number: %d\n", number);
    return 0;
}
```

编译并运行：

```
gcc pointer_basics.c -o pointer_basics
./pointer_basics
```

输出（地址不同）：

```
Value of number: 10
Address of number: 0x7ffc8f4c9c4c
Pointer p holds address: 0x7ffc8f4c9c4c
Value through pointer: 10
New value of number: 20
```

#### 指针声明和解除引用

|语法 |意义|
| --- | --- |
|`int *p;`|指向整数的指针 |
|`char *c;`|指向字符的指针 |
|`float *f;`|指向浮点数的指针 |
|`p = &x;`|分配变量的地址`x`到指针`p`|
|`*p`|访问（取消引用）存储在地址中的值`p`|

解除引用有两种作用：

- 读取值：`x = *p;`
- 写入地址：`*p = 99;`

#### 空指针

一个不指向任何东西的指针应该被设置为`NULL`.

```
int *ptr = NULL;
if (ptr == NULL) {
    printf("Pointer is not initialized.\n");
}
```

取消引用空指针（`*ptr`什么时候`ptr == NULL`）导致分段错误，这是最常见的 C 错误之一。

#### 指针到指针

您可以使用存储其他指针地址的指针。

```
int x = 5;
int *p = &x;
int **pp = &p;
printf("x = %d\n", **pp);
```

这个概念出现在多维数组和函数指针中。

#### 为什么它很重要

指针使 C 变得强大：

- 它们启用动态内存分配（`malloc`,`calloc`,`free`).
- 它们允许有效地传递数组、字符串和结构。
- 它们是链表、树和系统调用的基础。

但他们也要求精度。单个误用的指针可能会导致崩溃或内存损坏。

掌握指针意味着掌握对内存的控制和责任。

#### 自己尝试一下

1. 编写一个程序，声明一个整数并打印它的值和地址。
2. 创建一个指向该整数的指针，并通过该指针修改变量的值。
3.尝试声明`int *p = NULL;`并在取消引用之前检查它。
4. 打印一个指向指针的指针（`int **`）并查看地址如何关联。
5. 为了好玩，声明两个变量并使用解引用使一个指针交换它们的值。

一旦你真正理解了指针，C 的其余部分、数组、结构、动态内存，甚至函数调用，就开始有意义了。它们是代码和机器实际内存之间的桥梁。
