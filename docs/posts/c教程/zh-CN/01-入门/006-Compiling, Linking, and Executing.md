---
title: "6. 编译、链接和执行"
date: "2026-07-04"
lang: "zh-CN"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "01-入门"
  - "中文"
description: "The Little Book of C 中文版 — 6. 编译、链接和执行"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
translator: "机器辅助翻译（Google Translate）"
section: 6
sidebarWeight: 6
alternateZh: "/posts/c教程/zh-CN/01-入门/006-Compiling, Linking, and Executing"
alternateEn: "/posts/c教程/en-US/01-Getting Started/006-Compiling, Linking, and Executing"
---

[English version](/posts/c教程/en-US/01-Getting Started/006-Compiling, Linking, and Executing)

当您按 Enter 编译 C 程序时，幕后会发生很多事情。您的源代码在成为可运行的可执行文件之前会经历几个阶段。理解这些步骤至关重要，它将编译错误从神秘变成简单、可修复的线索。

#### 小代码

让我们从一个熟悉的程序开始：

```
#include <stdio.h>
int main(void) {
    printf("Learning the C build process!\n");
    return 0;
}
```

现在一步步编译并运行：

```
# Step 1: Compile to object file
gcc -c hello.c -o hello.o
# Step 2: Link object file into executable
gcc hello.o -o hello
# Step 3: Run the program
./hello
```

输出：

```
Learning the C build process!
```

#### 构建 C 程序的四个阶段

预处理 预处理器处理所有以`#`。它扩展宏、包含标头并准备编译代码。检查命令：

```
gcc -E hello.c | less
```

编译 编译器将预处理后的代码翻译成汇编语言，然后翻译成目标代码。每个源文件（例如`hello.c`) 成为目标文件 (`hello.o`）。命令：

```
gcc -c hello.c
```

链接 链接器将所有目标文件和库组合成一个最终的可执行文件。例如，`printf`来自C标准库（`libc`)，因此链接器将您的代码连接到它。命令：

```
gcc hello.o -o hello
```

执行一旦链接，您的二进制文件（`hello`）由操作系统加载并由CPU执行。命令：

```
./hello
```

#### 为什么它很重要

C 使您可以控制此过程的每个阶段。大多数现代语言隐藏编译或链接，但在 C 中，这些步骤是透明且可配置的。当出现问题、缺少函数、未定义的符号或损坏的包含时，您将确切地知道要查看哪个阶段。

掌握构建过程也为更深层次的技能打开了大门：

- 创建可重用的库（`.a`或者`.so`文件）
- 了解 Makefile 和构建自动化
- 使用符号和优化构建进行调试
- 编写可在任何地方干净编译的便携式程序

每个系统程序员最终都会学会像编译器一样思考，这就是思考的开始。

#### 自己尝试一下

尝试单独编译：

创建两个文件：

主程序

```
#include <stdio.h>
void greet(void);
int main(void) {
    greet();
    return 0;
}
```

问候.c

```
#include <stdio.h>
void greet(void) {
    printf("Hello from another file!\n");
}
```

然后编译并链接：

```
gcc -c main.c
gcc -c greet.c
gcc main.o greet.o -o greetprog
./greetprog
```

尝试打破它：删除`void greet(void);`线路输入`main.c`并重新编译，看看编译器如何警告您有关隐式声明的信息。

观察阶段：添加标志，例如`-Wall -O2 -v`查看来自编译器和链接器的详细消息。

一旦了解了编译和链接，您就解锁了 C 最强大的部分之一，即能够准确控制软件的构建、组合和执行方式。
