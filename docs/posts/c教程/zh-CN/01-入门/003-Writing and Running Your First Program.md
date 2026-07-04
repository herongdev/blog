---
title: "3. 编写并运行您的第一个程序"
date: "2026-07-04"
lang: "zh-CN"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "01-入门"
  - "中文"
description: "The Little Book of C 中文版 — 3. 编写并运行您的第一个程序"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
translator: "机器辅助翻译（Google Translate）"
section: 3
sidebarWeight: 3
alternateZh: "/posts/c教程/zh-CN/01-入门/003-Writing and Running Your First Program"
alternateEn: "/posts/c教程/en-US/01-Getting Started/003-Writing and Running Your First Program"
---

[English version](/posts/c教程/en-US/01-Getting Started/003-Writing and Running Your First Program)

现在您的编译器已准备就绪，是时候编写您的第一个真正的 C 程序了。这就是奇迹发生的地方，您将编写纯文本，将其编译成机器指令，然后观察您的计算机准确地遵循您的命令。

C 不会隐藏幕后发生的事情。每一步，编写、编译、链接、运行，都是可见的并在您的控制之下。

#### 小代码

创建一个新文件，名为`hello.c`并输入以下代码：

```
#include <stdio.h>
int main(void) {
    printf("Hello, world!\n");
    return 0;
}
```

然后，编译并运行它：

```
gcc hello.c -o hello
./hello
```

你应该看到：

```
Hello, world!
```

#### 分解它

`#include <stdio.h>`这告诉编译器使用标准输入/输出库，它提供了`printf`功能。

`int main(void)`每个 C 程序都以`main`功能。这是执行开始的入口点。

`printf("Hello, world!\n");`这会将文本打印到屏幕上。这`\n`意思是“换行”，所以下一个输出从新行开始。

`return 0;`什么时候`main`返回 0，它告诉操作系统您的程序已成功完成。

#### 为什么它很重要

你的“Hello, world”可能看起来很简单，但它代表了一个完整的过程：

1. 编译器翻译你的文本（`hello.c`) 转换为目标代码 (`hello.o`).
2. 链接器将该代码与标准库结合起来。
3. 可执行文件（`hello`）是纯机器指令。
4.操作系统加载并运行它。

理解这个流程是 C 语言的特别之处，它不仅仅是编写代码，而是了解代码如何成为软件。

#### 自己尝试一下

将消息更改为`"Hello, C learner!"`并重新编译。

添加另一行：

```
printf("This is my first C program.\n");
```

尝试省略分号，编译器会显示什么错误？

尝试删除`#include <stdio.h>`，然后会发生什么？

尝试并打破事物。每个错误都会告诉你 C 是如何思考的。

您刚刚编写并运行了第一个 C 程序，这是您和机器之间的直接对话。从这里开始，每一段新代码都建立在这个简单的控制和理解时刻之上。
