---
title: "9. 设置最小的项目结构"
date: "2026-07-04"
lang: "zh-CN"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "01-入门"
  - "中文"
description: "The Little Book of C 中文版 — 9. 设置最小的项目结构"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
translator: "机器辅助翻译（Google Translate）"
section: 9
sidebarWeight: 9
alternateZh: "/posts/c教程/zh-CN/01-入门/009-Setting Up a Minimal Project Structure"
alternateEn: "/posts/c教程/en-US/01-Getting Started/009-Setting Up a Minimal Project Structure"
---

[English version](/posts/c教程/en-US/01-Getting Started/009-Setting Up a Minimal Project Structure)

随着您的 C 程序的增长，您将很快超出单文件“hello.c”样式。真实的项目由多个源文件、标头（有时还包括库）组成。清晰的文件夹结构使您的工作保持干净、易于构建和维护。在本部分中，您将创建一个小型的、有组织的布局，与专业人士使用的结构相同。

#### 小代码

这是一个最小的项目布局：

```
my_project/
├── include/
│   └── greet.h
├── src/
│   └── greet.c
├── main.c
└── Makefile
```

包含/greet.h

```
#ifndef GREET_H
#define GREET_H
void greet(const char *name);
#endif
```

src/greet.c

```
#include <stdio.h>
#include "greet.h"
void greet(const char *name) {
    printf("Hello, %s!\n", name);
}
```

主程序

```
#include "greet.h"
int main(void) {
    greet("C Learner");
    return 0;
}
```

生成文件

```
CC = gcc
CFLAGS = -Wall -Iinclude
SRC = main.c src/greet.c
OUT = my_program
$(OUT): $(SRC)
    $(CC) $(CFLAGS) $(SRC) -o $(OUT)
clean:
    rm -f $(OUT)
```

现在构建并运行：

```
make
./my_program
```

输出：

```
Hello, C Learner!
```

#### 了解结构

`include/`保存头文件（`.h`)、函数、常量和类型的声明。您将这些包含在`.c`使用引号的文件：

```
#include "greet.h"
```

`src/`包含源文件（`.c`) 实现标头中声明的函数。

`main.c`程序的入口点，该文件通常只是调用函数`src/`.

`Makefile`定义如何构建程序。你可以运行`make`而不是输入很长的内容`gcc`命令。

输出二进制编译后的可执行文件（这里`my_program`）为了方便起见保留在项目的根目录中。

#### 为什么它很重要

清晰的结构可以帮助您：

- 保持代码模块化和可重用
- 独立的接口（`.h`）来自实施（`.c`)
- 使编译更快、更易于管理
- 避免大型项目中的名称冲突
- 从一个文件扩展到数十个文件而不会造成混乱

即使小型 C 实用程序也能从结构中受益，当您稍后重新访问代码时，您会感谢自己。

#### 自己尝试一下

创建如上所示的目录和文件。

仔细输入每个文件并运行`make`.

调整`greet.c`打印个性化消息，例如

```
printf("Welcome back, %s!\n", name);
```

然后重建。

添加另一对文件，`src/farewell.c`和`include/farewell.h`，带有再见函数，并从`main.c`.

跑步`make clean`删除二进制文件并重新构建。

这个小结构是每​​个严肃的 C 项目的种子。一旦您能够以这种方式组织文件，您就可以成长为其他人可以使用和构建的更大的系统、库、工具和应用程序。
