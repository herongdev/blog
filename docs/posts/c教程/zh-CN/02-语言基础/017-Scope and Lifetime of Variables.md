---
title: "17. 变量的范围和生命周期"
date: "2026-07-04"
lang: "zh-CN"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "02-语言基础"
  - "中文"
description: "The Little Book of C 中文版 — 17. 变量的范围和生命周期"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
translator: "机器辅助翻译（Google Translate）"
section: 17
sidebarWeight: 17
alternateZh: "/posts/c教程/zh-CN/02-语言基础/017-Scope and Lifetime of Variables"
alternateEn: "/posts/c教程/en-US/02-Language Basics/017-Scope and Lifetime of Variables"
---

[English version](/posts/c教程/en-US/02-Language Basics/017-Scope and Lifetime of Variables)

C 中的每个变量都存在于特定的范围内（可以访问它）并且具有生命周期（它在内存中存在多长时间）。了解两者对于避免常见错误（从名称冲突到神秘的“垃圾值”）至关重要。一旦你知道变量在哪里以及如何存在，你就会开始像编译器一样思考。

#### 变量范围

范围定义了在代码中可以看到或使用变量的位置。

块作用域（局部变量）在函数或块内声明`{ ... }`。只能在该块内访问。

```
void example(void) {
    int x = 10;  // local to this function
    printf("%d\n", x);
}
```

您无法访问`x`之外`example()`.

文件范围（全局变量） 在所有函数之外声明。声明后可在文件中的任何位置访问。

```
int counter = 0; // global variable
void increment(void) {
    counter++;
}
```

函数参数范围 参数的行为类似于局部变量，仅在函数内可见。

```
void greet(const char *name) {
    printf("Hello, %s!\n", name);
}
```

块阴影 内部变量可以暂时“隐藏”外部变量：

```
int x = 5;
{
    int x = 10;  // shadows the outer x
    printf("%d\n", x); // prints 10
}
printf("%d\n", x); // prints 5
```

#### 可变寿命

生命周期决定了变量在内存中保留的时间。

自动（默认） 局部变量在函数启动时创建，在函数结束时销毁。

```
void demo(void) {
    int temp = 42;  // exists only while demo() runs
}
```

静态声明与`static`关键字，它们在函数调用之间保留其值。

```
void counter(void) {
    static int count = 0;  // initialized only once
    count++;
    printf("Count: %d\n", count);
}
```

每次致电`counter()`增加相同的变量。

动态使用手动创建`malloc()`或者`calloc()`，他们会一直活到你`free()`他们。 （您将在第 3 章中了解到这一点。）

在整个计划期间全局存在。

#### C 中的存储类

|关键词 |存储|范围 |终身|笔记|
| --- | --- | --- | --- | --- |
|`auto`|堆栈|块|函数调用|当地人的默认设置 |
|`register`| CPU寄存器|块|函数调用|优化速度的提示 |
|`static`|静态内存|块/文件|节目|保值 |
|`extern`|静态内存|全球|节目|在别处声明 |

#### 小代码

这是一个完整的程序，显示了实际的范围和生命周期：

```
#include <stdio.h>
int global_var = 10; // global scope
void demo_scope(void) {
    int local_var = 5; // block scope
    static int persistent = 0; // retains value between calls
    printf("Global: %d, Local: %d, Static: %d\n", global_var, local_var, persistent);
    persistent++;
}
int main(void) {
    printf("First call:\n");
    demo_scope();
    printf("\nSecond call:\n");
    demo_scope();
    printf("\nAccessing global variable in main: %d\n", global_var);
    return 0;
}
```

编译并运行：

```
gcc scope_demo.c -o scope_demo
./scope_demo
```

输出：

```
第一次通话：
全局：10，本地：5，静态：0

第二次通话：
全局：10，本地：5，静态：1

访问 main 中的全局变量：10
```

#### 为什么它很重要

范围和生命周期是代码下面不可见的结构。它们定义了哪些数据在何处可用以及可用时长。如果不理解它们，您将面临以下错误：

- 函数返回后未初始化的值
- 变量神秘重置
- 本地名称和全局名称之间的冲突

一旦了解编译器如何管理变量，您就可以自信地推断内存、性能和正确性。

#### 自己尝试一下

1. 编写一个带有静态计数器的函数并调用它3次。观察计数如何持续。
2. 添加一个全局变量，从两个不同的函数修改它，并打印结果。
3. 创建具有相同名称的变量的嵌套块，查看阴影的行为方式。
4. 将变量移出函数并对其进行标记`static`。尝试从另一个函数访问它，会发生什么？
5. 使用全局变量和局部变量重写之前的“计算器”示例以查看差异。

当您了解作用域和生命周期时，您就可以控制程序的数据如何移动、生存和消亡，这是每个真正的 C 程序员都需要的技能。
