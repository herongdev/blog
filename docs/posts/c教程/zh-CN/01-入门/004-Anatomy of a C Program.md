---
title: "4. C 程序剖析"
date: "2026-07-04"
lang: "zh-CN"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "01-入门"
  - "中文"
description: "The Little Book of C 中文版 — 4. C 程序剖析"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
translator: "机器辅助翻译（Google Translate）"
section: 4
sidebarWeight: 4
alternateZh: "/posts/c教程/zh-CN/01-入门/004-Anatomy of a C Program"
alternateEn: "/posts/c教程/en-US/01-Getting Started/004-Anatomy of a C Program"
---

[English version](/posts/c教程/en-US/01-Getting Started/004-Anatomy of a C Program)

现在您的第一个程序已经运行，让我们打开它看看里面。每个 C 程序都遵循一个清晰的结构，一组规则告诉您和编译器每个部分的含义。尽早理解这种结构将帮助您充满信心地阅读、编写和调试代码。

#### 小代码

这是同一个程序，带有解释每个部分的注释：

```
#include <stdio.h>      // 1. Preprocessor directive
// 2. Function definition
int main(void) {        // main: entry point of every C program
    printf("Hello, C!\n");  // 3. Statement: prints a message
    return 0;           // 4. Return statement: signals success
}
```

#### 四个主要部分

预处理器指令以以下内容开头的行`#`在编译代码之前就已经处理了。它们包含或定义您的程序所依赖的事物。例子：

```
#include <stdio.h>
#define PI 3.14159
```

函数 每个 C 程序都是由函数组成的。功能`main()`很特别，它是你的程序开始的地方。您可以定义更多函数来组织代码。

语句 函数内的每条指令都以分号结尾。这些是您的程序所采取的一一步骤。

注释 注释会被编译器忽略，但会被人类读取。用它们来解释你的代码为什么要做某事，而不仅仅是它做了什么。

```
// This is a single-line comment
/* This is a multi-line comment */
```

#### 为什么它很重要

C是一种结构化语言。每个函数、语句和声明都存在于清晰的边界内。与脚本语言不同，没有自动设置或隐藏的运行时，您看到的一切都是运行的。

学习 C 程序的剖析会给你一个思维导图：

- 你知道执行从哪里开始（`main`).
- 你知道代码所在的位置（函数内部）。
- 你知道库从哪里来（通过包含）。

一旦这张图变得自然，阅读大型 C 程序就会开始变得轻松且合乎逻辑。

#### 自己尝试一下

创建文件`structure.c`包含以下内容：

```
#include <stdio.h>
void greet(void) {
    printf("Welcome to C programming!\n");
}
int main(void) {
    greet();
    return 0;
}
```

编译并运行它：

```
gcc structure.c -o structure
./structure
```

也许添加另一个功能`void bye(void)`打印一条再见消息，然后调用它`greet()`.

尝试删除`return 0;`，注意程序仍然如何运行，但添加它可以使您的意图清晰。

您编写的每个 C 程序都遵循这个基本形状。一旦你能够识别这些部分，你就可以开始构建更长、更智能、更接近系统的程序。
