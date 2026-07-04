---
title: "51. 从源代码到可执行文件：编译管道"
date: "2026-07-04"
lang: "zh-CN"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "06-编译与构建"
  - "中文"
description: "The Little Book of C 中文版 — 51. 从源代码到可执行文件：编译管道"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
translator: "机器辅助翻译（Google Translate）"
section: "51"
sidebarWeight: "51"
alternateZh: "/posts/c教程/zh-CN/06-编译与构建/051-From Source to Executable The Compilation Pipeline"
alternateEn: "/posts/c教程/en-US/06-Compilation and Build/051-From Source to Executable The Compilation Pipeline"
---

[English version](/posts/c教程/en-US/06-Compilation and Build/051-From Source to Executable The Compilation Pipeline)

每次你跑步的时候

```
gcc hello.c -o hello
```

您正在启动一个复杂的多阶段过程，将人类可读的 C 代码转换为机器可执行的二进制文件。了解这个编译管道是成为真正的系统程序员的核心。

让我们来解开你们之间发生的事情`.c`文件和最终的可执行文件。

#### 步骤 1. 四个阶段

C 编译器（例如`gcc`或者`clang`）在内部执行四个主要阶段：

|舞台|工具|输入|输出|描述 |
| --- | --- | --- | --- | --- |
| 1. 预处理|`cpp`|`hello.c`|扩展源 |手柄`#include`,`#define`、 和宏 |
| 2. 编译|`cc1`|扩展源 |`hello.s`|将 C 翻译成汇编 |
| 3. 组装|`as`|`hello.s`|`hello.o`|将汇编代码转换为机器代码 |
| 4. 链接 |`ld`|`.o`+ 图书馆 |`hello`|将所有内容组合成一个可运行的程序 |

您可以使用编译器标志在任何步骤停止以查看发生了什么。

#### 小代码：观察每个阶段

让我们使用一个简单的程序：

```
// hello.c
#include <stdio.h>
int main(void) {
    printf("Hello, C!\n");
    return 0;
}
```

运行这些命令来检查每个阶段：

```
# 1. Preprocessing
gcc -E hello.c -o hello.i
# 2. Compilation to Assembly
gcc -S hello.i -o hello.s
# 3. Assembly to Object File
gcc -c hello.s -o hello.o
# 4. Linking
gcc hello.o -o hello
```

现在检查每个文件的样子：

-`hello.i`: 扩展了头文件的 C 代码
-`hello.s`：人类可读的汇编指令
-`hello.o`：机器代码（二进制对象）
-`hello`：最终可执行文件

跑步：

```
./hello
```

输出：

```
Hello, C!
```

#### 步骤 2. 预处理（#include、#define、#if）

预处理器处理所有以`#`。它是纯文本的，还没有代码执行。

```
gcc -E hello.c -o hello.i
```

打开`hello.i`你会看到数千行`stdio.h`插入到您的代码中。它还替换了宏并删除了注释。

这是头文件、宏和条件编译发挥作用的阶段。

#### 步骤 3. 编译（到汇编）

接下来，编译器将预处理的 C 代码转换为目标 CPU 的汇编语言。

```
gcc -S hello.i -o hello.s
```

打开`hello.s`查看低级指令，例如：

```
mov     edi, OFFSET FLAT:.LC0
call    puts
```

这些是特定于 CPU 的，在 x86、ARM 或 RISC-V 上，它们会有所不同。此阶段还执行优化、类型检查和错误检测。

#### 步骤 4. 组装（到目标文件）

汇编器将转换为`.s`文件转换为原始机器指令和数据结构，生成可重定位的目标文件。

```
gcc -c hello.s -o hello.o
```

您可以使用以下方法检查它：

```
objdump -d hello.o
```

代码中的每个函数都成为该目标文件中的一个符号。

#### 步骤 5. 链接

链接器（`ld`）将目标文件和库组合成一个可执行文件。

```
gcc hello.o -o hello
```

如果您的程序使用外部函数（例如`printf`），链接器将它们定位在系统库中（例如，`/usr/lib/libc.so`）并记录他们的地址。

结果：一个独立的可执行文件可以运行。

#### 步骤 6. 检查最终的二进制文件

使用以下工具：

```
file hello
nm hello | head
readelf -h hello
```

这些揭示了：

- 文件类型（ELF、Mach-O 等）
- 定义和未定义的符号
- 像这样的部分`.text`,`.data`,`.bss`

您现在可以看到机器级别的 C 代码。

#### 步骤 7. 清理和自动化

虽然手动运行每个步骤很有教育意义，但大多数时候您将依赖：

```
gcc hello.c -o hello
```

或一个`Makefile`编排多个文件（我们将在第 55 节中介绍）。

#### 小代码：多文件示例

让我们手动构建一个两个文件的程序：

主程序

```
#include "greet.h"
int main(void) {
    greet("C programmer");
    return 0;
}
```

问候.c

```
#include <stdio.h>
void greet(const char *name) {
    printf("Hello, %s!\n", name);
}
```

问候.h

```
void greet(const char *name);
```

手动编译和链接：

```
gcc -c main.c
gcc -c greet.c
gcc main.o greet.o -o app
./app
```

输出：

```
Hello, C programmer!
```

#### 为什么它很重要

了解编译管道可以帮助您：

- 调试棘手的构建错误（`undefined reference`,`multiple definition`， ETC。）
- 控制优化和调试符号
- 检查中间阶段的学习或调整性能
- 构建您自己的轻量级构建系统或编译器

这就是源代码如何一步一步、精确定义地变成机器现实的方式。

#### 自己尝试一下

1.生成所有中间文件（`.i`,`.s`,`.o`）一些程序并检查它们。
2. 尝试`gcc -O0`,`-O2`， 和`-O3`并观察装配如何变化。
3.添加`-g`并探索二进制文件`gdb`.
4. 构建一个跨多个领域的程序`.c`文件。
5. 使用`nm`和`objdump`追踪符号如何在各个阶段移动。

接下来，您将探索预处理器和宏、包含、常量和编译时代码生成背后的引擎。
