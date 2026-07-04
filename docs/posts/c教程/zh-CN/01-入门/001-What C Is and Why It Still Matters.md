---
title: "1. C 是什么以及为什么它仍然很重要"
date: "2026-07-04"
lang: "zh-CN"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "01-入门"
  - "中文"
description: "The Little Book of C 中文版 — 1. C 是什么以及为什么它仍然很重要"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
translator: "机器辅助翻译（Google Translate）"
section: 1
sidebarWeight: 1
alternateZh: "/posts/c教程/zh-CN/01-入门/001-What C Is and Why It Still Matters"
alternateEn: "/posts/c教程/en-US/01-Getting Started/001-What C Is and Why It Still Matters"
---

[English version](/posts/c教程/en-US/01-Getting Started/001-What C Is and Why It Still Matters)

C 语言是最接近机器的语言，同时仍具有人类编写的感觉。它不是最新的或最简单的，但它是最强大的之一。每个现代操作系统、编译器和数据库都有一个用 C 编写的核心，从 Linux 和 Git 到 Python 的解释器，甚至浏览器的一部分。

学习 C 语言可以给你带来其他语言无法提供的东西：了解计算机的实际工作原理。您将看到如何管理内存、如何移动数据、CPU 如何运行代码，以及您编写的所有内容如何变成机器可以理解的微小指令。

C 教导纪律。没有垃圾收集器或安全网。您可以决定何时分配内存、何时释放内存以及忘记时会发生什么。您将学习精确性和控制力，这些技能可以成为任何语言的优秀程序员。

#### 小代码

```
#include <stdio.h>
int main(void) {
    printf("Hello, C World!\n");
    return 0;
}
```

运行这个程序，您就完成了每个 C 程序员开始做的事情，将第一行文本打印到屏幕上。它虽小，但却承载着 C 语言的精神：直接、明确、清晰。

#### 为什么它很重要

C 是所有系统编程的基础。当你理解它时，高级语言就更有意义了。您将了解编译器为何如此工作、为何会发生内存错误以及性能决策如何影响整个程序。

即使您从未编写过生产型 C 代码，它所建立的思维方式、仔细的推理、对细节的关注、对机器的尊重，也会影响您用任何语言编写代码的方式。

#### 自己尝试一下

安装 C 编译器，例如`gcc`或者`clang`.

将上面的代码保存到一个名为`hello.c`.

编译它：

```
gcc hello.c -o hello
```

运行它：

```
./hello
```

修改消息并尝试打印更多行。您刚刚构建了第一个 C 程序。
