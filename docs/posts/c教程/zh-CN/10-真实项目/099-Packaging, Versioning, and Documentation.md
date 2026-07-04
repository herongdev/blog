---
title: "99. 打包、版本控制和文档"
date: "2026-07-04"
lang: "zh-CN"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "10-真实项目"
  - "中文"
description: "The Little Book of C 中文版 — 99. 打包、版本控制和文档"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
translator: "机器辅助翻译（Google Translate）"
section: 99
sidebarWeight: 99
alternateZh: "/posts/c教程/zh-CN/10-真实项目/099-Packaging, Versioning, and Documentation"
alternateEn: "/posts/c教程/en-US/10-Building Real Projects/099-Packaging, Versioning, and Documentation"
---

[English version](/posts/c教程/en-US/10-Building Real Projects/099-Packaging, Versioning, and Documentation)

您已经编写了真正的 C 程序 - 现在是时候像专业人士一样打包、版本化和记录它们了。这就是使您的代码可供其他人使用并可供未来的您维护的原因。

#### 步骤1. 包装的目标

打包的目的是让您的项目易于：

- 建造 （`make`,`cmake`， 或者`meson`)
- 安装 （`make install`)
- 关联 （`pkg-config`)
- 使用 （`#include "yourlib.h"`)

您将创建一个结构，帮助其他人无需猜测即可构建和使用您的代码。

#### 步骤 2. 标准项目布局

C 项目的简单、常规布局：

```
myproject/
├── include/
│   └── myproject.h
├── src/
│   ├── main.c
│   └── util.c
├── tests/
│   └── test_basic.c
├── Makefile
├── README.md
└── LICENSE
```

-`include/`保存其他人可以包含的标头
-`src/`保存您的实施文件
-`tests/`举行单元测试
-`Makefile`定义如何构建和安装

#### 步骤 3.Tiny Code：一个简单的可重用库

```
// include/myproject.h
#ifndef MYPROJECT_H
#define MYPROJECT_H
int add(int a, int b);
int sub(int a, int b);
#endif
```

```
// src/myproject.c
#include "myproject.h"
int add(int a, int b) { return a + b; }
int sub(int a, int b) { return a - b; }
```

#### 步骤 4. 最小 Makefile

```
CC      = gcc
CFLAGS  = -std=c23 -O2 -Wall -Iinclude
LDFLAGS =
SRC = $(wildcard src/*.c)
OBJ = $(SRC:.c=.o)
LIB = libmyproject.a
.PHONY: all clean install uninstall
all: $(LIB)
$(LIB): $(OBJ)
    ar rcs $@ $^
%.o: %.c
    $(CC) $(CFLAGS) -c $< -o $@
install:
    mkdir -p /usr/local/include/myproject
    cp include/*.h /usr/local/include/myproject/
    cp $(LIB) /usr/local/lib/
uninstall:
    rm -f /usr/local/lib/$(LIB)
    rm -rf /usr/local/include/myproject
clean:
    rm -f $(OBJ) $(LIB)
```

构建库：

```
make
sudo make install
```

然后另一个项目可以链接到它：

```
gcc main.c -lmyproject -L/usr/local/lib -I/usr/local/include/myproject
```

#### 步骤 5. 对您的版本进行版本控制

遵循语义版本控制：

```
vMAJOR.MINOR.PATCH
```

示例：

-`v1.0.0`– 稳定发布
-`v1.1.0`– 新功能，向后兼容
-`v1.1.1`– 错误修复，没有 API 更改
-`v2.0.0`– 重大 API 变更

在 git 中标记您的版本：

```
git tag -a v1.0.0 -m "First stable release"
git push origin v1.0.0
```

#### 步骤 6. 创建 pkg-config 文件

`pkg-config`让其他人轻松编译您的库。

创造`myproject.pc`:

```
前缀=/usr/local
exec_prefix=${前缀}
libdir=${exec_prefix}/lib
Includedir=${前缀}/include/myproject

名称： 我的项​​目
描述：小型数学助手库
版本：1.0.0
库：-L${libdir} -lmyproject
Cflags：-I${includedir}
```

将其安装在`/usr/local/lib/pkgconfig/`并测试：

```
pkg-config --cflags --libs myproject
```

#### 步骤 7. 使用 Markdown 和 Doxygen 进行文档记录

在根目录中保留清晰的 README.md：

```
# myproject
A tiny example C library for arithmetic functions.
## Build
```

进行 sudo 进行安装

```

＃＃ 用法
````c
#include <myproject.h>

int main() {
printf("%d\n", 添加(3, 4));
}
```

```

对于 API 文档，请使用 **Doxygen**：

```bash
sudo apt install doxygen
doxygen -g
```

编辑`Doxyfile`包含您的源路径，然后运行：

```
doxygen Doxyfile
```

文档将出现在`html/`或者`latex/`.

#### 步骤 8. 许可

添加一个`LICENSE`文件，以便其他人知道如何使用您的代码。常见的：

- MIT 许可证：简单、宽松
- Apache 2.0：增加专利保护
- GPLv3：确保衍生品保持开放

源文件的 MIT 许可证标头示例：

```
/* 
 * Copyright (c) 2025 Your Name
 * Licensed under the MIT License.
 */
```

#### 步骤 9.持续集成（可选）

添加 GitHub Actions 或其他 CI 服务：

```
# .github/workflows/build.yml
name: Build and Test
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - run: make
    - run: make test || echo "No tests yet"
```

现在，每次推送都会自动构建。

#### 第 10 步：为什么这很重要

专业包装是系统工程师的一部分：

- 您的项目可重复构建。
- 其他人可以轻松安装、链接和使用它们。
- 文档和版本标签创建信心。
- 许可明确了所有权。

您现在已经从 C 程序员转变为 C 维护者，即其他人信任的能够提供可靠、可重用且文档齐全的软件的人。

接下来是 100. 练习：构建您自己的迷你项目，您将在其中将所有内容整合在一起，用纯 C 语言编写、构建、调试和打包一个完整的小型系统。
