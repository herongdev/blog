---
title: "8. C 开发人员的命令行基础知识"
date: "2026-07-04"
lang: "zh-CN"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "01-入门"
  - "中文"
description: "The Little Book of C 中文版 — 8. C 开发人员的命令行基础知识"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
translator: "机器辅助翻译（Google Translate）"
section: 8
sidebarWeight: 8
alternateZh: "/posts/c教程/zh-CN/01-入门/008-Command Line Basics for C Developers"
alternateEn: "/posts/c教程/en-US/01-Getting Started/008-Command Line Basics for C Developers"
---

[English version](/posts/c教程/en-US/01-Getting Started/008-Command Line Basics for C Developers)

C诞生于Unix世界，命令行是它天然的家。如果您可以在终端中轻松移动，您将了解您的工具正在做什么，直接编译、链接和运行程序。本节为您提供像真正的系统程序员一样构建和探索 C 项目所需的基本命令。

#### 小代码

让我们首先使用一个简单的文件快速回顾一下`hello.c`:

```
#include <stdio.h>
int main(void) {
    printf("Hello from the terminal!\n");
    return 0;
}
```

要从命令行构建并运行它：

```
gcc hello.c -o hello
./hello
```

输出：

```
Hello from the terminal!
```

这就是完整的循环：编写→编译→运行。现在让我们看看使该过程更加顺利的基本工具。

#### 基本命令行工具

`ls`– 列出当前目录下的文件

```
ls
```

你会看到类似的文件`hello.c`,`hello.o`， 或者`hello`.

`pwd`– 打印当前工作目录

```
pwd
```

`cd`– 更改目录

```
cd projects/c_programs
```

`cat`– 快速显示文件内容

```
cat hello.c
```

`rm`– 删除文件

```
rm hello
```

`clear`– 清除您的终端屏幕

```
clear
```

`man`– Read the manual for a command

```
man gcc
```

按`q`退出。

`echo`– 打印消息或变量

```
echo "Compiling C!"
```

`touch`– 创建一个新的空文件

```
touch main.c
```

`gcc`– 编译你的C源代码

```
gcc main.c -o main
```

#### 为什么它很重要

命令行不仅仅用于构建代码，它还能教您工具的实际工作原理。在 C 语言中，单击按钮后没有隐藏的环境运行。您键入的每个命令只执行一项工作，并且了解这些工作可以让您完全控制。

- 您可以直接看到构建过程。
- 您可以控制输出的去向。
- 您可以链接命令以实现自动化。

这种了解幕后发生的事情的心态使得 C 程序员可以轻松地在机器附近工作。

#### 自己尝试一下

手动导航和构建：

```
mkdir myfirstc
cd myfirstc
touch hello.c
```

使用您最喜欢的文本编辑器添加代码（例如`nano hello.c`），然后编译并运行。

使用编译器标志：

```
gcc -Wall -O2 hello.c -o hello
./hello
```

-`-Wall`启用警告。
-`-O2`应用优化。

使用输出重定向：

```
./hello > output.txt
cat output.txt
```

以交互方式探索命令：

```
man ls
man gcc
```

阅读几行，了解如何寻求帮助与编码本身一样重要。

C 和命令行一起成长。一旦您习惯了手动打字和编译，您就会开始感受到程序、文件和进程是如何组合在一起的。这是系统编程的真正开始，不仅仅是编写代码，而是直接命令计算机。
