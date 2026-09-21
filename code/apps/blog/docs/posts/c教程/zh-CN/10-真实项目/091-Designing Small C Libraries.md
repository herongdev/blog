---
title: "91. 设计小型 C 库"
date: "2026-07-04"
lang: "zh-CN"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "10-真实项目"
  - "中文"
description: "The Little Book of C 中文版 — 91. 设计小型 C 库"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
translator: "机器辅助翻译（Google Translate）"
section: 91
sidebarWeight: 91
alternateZh: "/posts/c教程/zh-CN/10-真实项目/091-Designing Small C Libraries"
alternateEn: "/posts/c教程/en-US/10-Building Real Projects/091-Designing Small C Libraries"
---

[English version](/posts/c教程/en-US/10-Building Real Projects/091-Designing Small C Libraries)

编写库可以让您的 C 代码可重用、模块化且易于维护。在本节中，您将学习如何设计和构建一个小型、可移植且文档齐全的 C 库，这种库已在实际系统中使用了数十年。

#### 步骤 1. 什么是 C 语言库？

C 中的库是可由多个程序使用的函数和数据类型的集合。

有两种类型的库：

- 静态库（`.a`或者`.lib`) – 在构建时编译成最终程序。
- 共享库（`.so`或者`.dll`) – 在运行时动态加载。

您将首先构建一个提供可重用数学实用程序的小型静态库。

#### 步骤 2. 规划图书馆

让我们设计一个名为 simplemath 的库，它提供：

-`add`,`subtract`,`multiply`,`divide`
- 除零的错误处理
- 干净、一致的命名

结构：

```
simplemath/
 ├── include/
 │    └── simplemath.h
 ├── src/
 │    └── simplemath.c
 └── Makefile
```

#### 步骤 3. 头文件 (simplemath.h)

```
#ifndef SIMPLEMATH_H
#define SIMPLEMATH_H
#ifdef __cplusplus
extern "C" {
#endif
double sm_add(double a, double b);
double sm_sub(double a, double b);
double sm_mul(double a, double b);
double sm_div(double a, double b, int *error);
#ifdef __cplusplus
}
#endif
#endif
```

笔记：

- 包括防护装置以防止双重包含。
-`extern "C"`允许在 C++ 项目中使用。
- 前缀 (`sm_`) 防止命名冲突。

#### 步骤 4. 实现文件 (simplemath.c)

```
#include "simplemath.h"
#include <stdio.h>
double sm_add(double a, double b) { return a + b; }
double sm_sub(double a, double b) { return a - b; }
double sm_mul(double a, double b) { return a * b; }
double sm_div(double a, double b, int *error) {
    if (b == 0) {
        if (error) *error = 1;
        fprintf(stderr, "Division by zero\n");
        return 0.0;
    }
    if (error) *error = 0;
    return a / b;
}
```

#### 步骤 5. 小代码：使用库的示例程序

```
#include <stdio.h>
#include "simplemath.h"
int main(void) {
    int err;
    double x = sm_div(10, 2, &err);
    printf("10 / 2 = %.2f\n", x);
    x = sm_div(10, 0, &err);
    if (err) printf("Error detected during division.\n");
    return 0;
}
```

#### 步骤 6. 用于构建库的 Makefile

```
CC = gcc
CFLAGS = -std=c23 -O2 -Wall -Wextra -Iinclude
all: libsimplemath.a test
libsimplemath.a: src/simplemath.o
    ar rcs libsimplemath.a src/simplemath.o
src/simplemath.o: src/simplemath.c include/simplemath.h
    $(CC) $(CFLAGS) -c src/simplemath.c -o src/simplemath.o
test: test.c libsimplemath.a
    $(CC) $(CFLAGS) test.c -L. -lsimplemath -o test
clean:
    rm -f src/*.o *.a test
```

构建它：

```
make
```

跑步：

```
./test
```

输出：

```
10 / 2 = 5.00
Division by zero
Error detected during division.
```

#### 步骤 7. Clean C 库的设计指南

|原理|描述 |
| --- | --- |
|所有符号 | 前缀避免全局名称冲突（例如，`sm_add`) |
|单一责任 |每个功能应该做一件明确的事情 |
|最小的依赖性|不要依赖非标准标头 |
|使用标题保护 |防止重复包含 |
|提供错误处理|返回代码，`errno`，或输出参数 |
|编写文档 |使用 Doxygen 或简单的注释块 |
|版本化您的 API |彻底改变轨道 |

#### 步骤 8. 添加版本控制和元数据

将其添加到您的标题中：

```
#define SIMPLEMATH_VERSION "1.0.0"
```

在您的 CMake 或 Makefile 构建脚本中，您可以将此版本传播到您的打包系统或文档中。

#### 第 9 步：为什么它很重要

编写库可以将您从脚本作者转变为系统构建者。它教授 API 设计、接口和实现的分离以及长期维护，与 glibc、SQLite 和curl 等现实软件中使用的原理相同。

#### 第 10 步：亲自尝试一下

1.添加新功能（`sm_pow`,`sm_mod`,`sm_avg`).
2. 创建库的共享版本（`libsimplemath.so`).
3. 使用 Doxygen 风格的注释来记录您的 API。
4. 编写一个只有标头的版本（`static inline`功能）。
5. 使用版本控制和示例打包您的库。

接下来，您将学习如何用 C (92) 构建完整的命令行工具，将可重用库连接到实用的、面向用户的应用程序。
