---
title: "57. 静态和共享库"
date: "2026-07-04"
lang: "zh-CN"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "06-编译与构建"
  - "中文"
description: "The Little Book of C 中文版 — 57. 静态和共享库"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
translator: "机器辅助翻译（Google Translate）"
section: 57
sidebarWeight: 57
alternateZh: "/posts/c教程/zh-CN/06-编译与构建/057-Static and Shared Libraries"
alternateEn: "/posts/c教程/en-US/06-Compilation and Build/057-Static and Shared Libraries"
---

[English version](/posts/c教程/en-US/06-Compilation and Build/057-Static and Shared Libraries)

在大型 C 项目中，您通常希望在多个程序中重用代码，而不复制相同的代码`.c`文件无处不在。这正是图书馆的用途。

库是预编译目标文件的集合（`.o`）打包在一起。主要有两种：

|类型 |扩展|已加载 |典型用途|
| --- | --- | --- | --- |
|静态库|`.a`|编译时|更简单、独立的可执行文件 |
|共享图书馆|`.so`|运行时 |更小的二进制文件，可在系统范围内重复使用 |

让我们看看如何构建和使用两者。

#### 步骤 1. 构建静态库 (.a)

静态库只是目标文件的存档。

示例项目：

```
math.c
string_utils.c
main.c
```

数学.c

```
int add(int a, int b) { return a + b; }
int mul(int a, int b) { return a * b; }
```

string_utils.c

```
#include <string.h>
int str_eq(const char *a, const char *b) {
    return strcmp(a, b) == 0;
}
```

数学.h

```
int add(int a, int b);
int mul(int a, int b);
```

字符串_utils.h

```
int str_eq(const char *a, const char *b);
```

编译目标文件：

```
gcc -c math.c string_utils.c
```

创建静态库：

```
ar rcs libmylib.a math.o string_utils.o
```

现在你有`libmylib.a`，你的第一个静态库。

#### 步骤 2. 链接库

主程序

```
#include <stdio.h>
#include "math.h"
#include "string_utils.h"
int main(void) {
    printf("3 + 4 = %d\n", add(3, 4));
    printf("Equal? %d\n", str_eq("abc", "abc"));
    return 0;
}
```

链接它：

```
gcc main.c -L. -lmylib -o app
```

输出：

```
3 + 4 = 7
Equal? 1
```

这里：

-`-L.`告诉编译器在当前目录中查找
-`-lmylib`链接反对`libmylib.a`

这`.a`文件已复制到您的可执行文件中，您现在可以删除它，并且您的程序仍将运行。

#### 步骤 3. 检查静态库

列出其内容：

```
ar -t libmylib.a
```

输出：

```
math.o
string_utils.o
```

提取文件：

```
ar -x libmylib.a math.o
```

你可以想到`.a`像“.zip”这样的文件`.o`模块。

#### 步骤 4. 构建共享库 (.so)

共享库在运行时动态加载，而不是编译到可执行文件中。它们就是你所看到的`/usr/lib`作为`.so`（Linux）或`.dll`（视窗）。

构建一个：

```
gcc -fPIC -c math.c string_utils.c
gcc -shared -o libmylib.so math.o string_utils.o
```

现在你有了一个共享库：

```
libmylib.so
```

`-fPIC`表示共享库所需的“位置无关代码”。

#### 步骤 5. 链接一个程序

```
gcc main.c -L. -lmylib -o app
```

运行它：

```
./app
```

如果你得到：

```
error while loading shared libraries: libmylib.so: cannot open shared object file
```

需要将当前目录添加到运行时库路径中：

```
export LD_LIBRARY_PATH=.
./app
```

输出：

```
3 + 4 = 7
Equal? 1
```

#### 步骤 6. 验证链接类型

检查您的程序是静态链接还是动态链接：

```
ldd app
```

动态链接的输出：

```
libmylib.so => ./libmylib.so (0x00007f8e8b...)
libc.so.6 => /lib/x86_64-linux-gnu/libc.so.6 (...)
```

对于静态链接，`libmylib.a`不会出现，它被烘焙到可执行文件中。

#### 步骤 7. 在系统范围内安装库

为了使您的图书馆可以在全球范围内访问：

复制`.so`文件到`/usr/local/lib`:

```
sudo cp libmylib.so /usr/local/lib
sudo ldconfig
```

将标题复制到`/usr/local/include`:

```
sudo cp math.h string_utils.h /usr/local/include
```

现在您可以使用以下命令在任何地方进行编译：

```
gcc main.c -lmylib -o app
```

#### 步骤 8. 对共享库进行版本控制

现实世界的共享库包含版本号以实现兼容性：

```
libmylib.so.1.0.0
libmylib.so -> libmylib.so.1.0.0  (symlink)
```

您可以在构建期间设置它：

```
gcc -shared -Wl,-soname,libmylib.so.1 -o libmylib.so.1.0.0 math.o string_utils.o
ln -sf libmylib.so.1.0.0 libmylib.so
```

#### 小代码：组合示例

生成文件

```
CC = gcc
CFLAGS = -Wall -fPIC
OBJS = math.o string_utils.o
TARGET_STATIC = libmylib.a
TARGET_SHARED = libmylib.so
all: $(TARGET_STATIC) $(TARGET_SHARED)
$(TARGET_STATIC): $(OBJS)
    ar rcs $@ $^
$(TARGET_SHARED): $(OBJS)
    $(CC) -shared -o $@ $^
%.o: %.c
    $(CC) $(CFLAGS) -c $< -o $@
clean:
    rm -f $(OBJS) $(TARGET_STATIC) $(TARGET_SHARED)
```

建造：

```
make
```

链接应用程序：

```
gcc main.c -L. -lmylib -o app
```

跑步：

```
LD_LIBRARY_PATH=. ./app
```

#### 步骤 9. 静态与共享权衡

|特色 |静止的 （`.a`) |共享（`.so`) |
| --- | --- | --- |
|链接|编译时|运行时 |
|文件大小 |更大的可执行文件|较小的可执行文件|
|更新 |需要重新编译 |代替`.so`文件 |
|便携性|完全独立 |需要图书馆存在|
|速度|稍微快一点|轻微加载延迟 |

对于小型工具或嵌入式系统，请使用静态。对于大型或可更新的软件，更喜欢共享。

#### 步骤 10. 检查库符号

要查看导出了哪些函数：

```
nm -D libmylib.so | grep add
```

要检查动态符号解析：

```
objdump -T libmylib.so | head
```

#### 为什么它很重要

库使您的 C 代码模块化、可维护且可重用。它们是每个严肃的 C 生态系统的基础，从`libc`到 OpenSSL 到 SDL。

一旦您了解如何构建和链接您自己的`.a`和`.so`文件，您可以：

- 提供其他人可以使用的 API
- 干净地组织大型代码库
- 了解系统库如何集成到您编译的每个程序中

#### 自己尝试一下

1. 建立一个小型数学库（`libmathx.a`,`libmathx.so`).
2. 创建一个仅包含标头的帮助程序并在多个程序中对其进行测试。
3. 尝试在一个构建中混合静态库和共享库。
4. 检查您的共享库`ldd`和`nm`.
5. 版本化你的`.so`使用符号链接的文件并测试兼容性。

接下来，您将探索编译器标志和优化级别如何影响性能、安全性和调试，学习如何调整`gcc`对于开发和发布版本。
