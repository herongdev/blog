---
title: "59. 了解目标文件"
date: "2026-07-04"
lang: "zh-CN"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "06-编译与构建"
  - "中文"
description: "The Little Book of C 中文版 — 59. 了解目标文件"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
translator: "机器辅助翻译（Google Translate）"
section: 59
sidebarWeight: 59
alternateZh: "/posts/c教程/zh-CN/06-编译与构建/059-Understanding the Object File"
alternateEn: "/posts/c教程/en-US/06-Compilation and Build/059-Understanding the Object File"
---

[English version](/posts/c教程/en-US/06-Compilation and Build/059-Understanding the Object File)

到现在为止，你已经看到了`.o`文件出现在每个构建步骤中，即源代码和可执行文件之间的中间产品。但它们里面到底是什么？

目标文件是编译器打包机器代码、符号表和元数据的方式，可供链接器组装成最终程序。了解目标文件可以帮助您调试链接错误、检查性能，甚至对编译的代码进行逆向工程。

#### 步骤 1. 生命周期回顾

编译管道如下所示：

```
source.c ──> preprocessor ──> compiler ──> assembler ──> linker
     |                           |             |          |
     |                        hello.s        hello.o     a.out
```

你的`.c`文件变成`.o`文件在汇编之后、链接之前。

每个`.o`是独立的，它知道它定义了什么，它需要什么，以及它的代码位于内存中的位置。

#### 步骤 2. 目标文件格式

不同的操作系统使用不同的二进制格式：

|操作系统 |格式|典型扩展|
| --- | --- | --- |
| Linux | ELF（可执行和可链接格式）|`.o`,`.so`, 可执行 |
| macOS |马赫-O |`.o`,`.dylib`|
|窗户|咖啡/PE |`.obj`,`.dll`,`.exe`|

在 Linux 上，ELF 占主导地位，因此我们将使用它作为参考。

#### 步骤 3. 目标文件内的部分

跑步：

```
gcc -c main.c -o main.o
readelf -S main.o
```

你会看到如下输出：

```
[ 1] .text     PROGBITS  code and functions
[ 2] .data     PROGBITS  initialized global variables
[ 3] .bss      NOBITS    uninitialized globals
[ 4] .rodata   PROGBITS  constants (e.g., string literals)
[ 5] .symtab   SYMTAB    symbol table
[ 6] .strtab   STRTAB    string table
[ 7] .rel.text RELA      relocation info
```

|部分|内容 |
| --- | --- |
|`.text`|编译后的机器代码（函数）|
|`.data`|具有初始值的全局变量 |
|`.bss`|没有初始值的全局变量 |
|`.rodata`|常数，`const`变量、字符串文字 |
|`.symtab`|符号表：函数和变量元数据 |
|`.rel*`|搬迁信息，如何将此文件连接到其他文件 |

#### 步骤 4. 检查符号

每一个`.o`文件包含描述其功能和变量的符号。列出它们：

```
nm main.o
```

输出：

```
0000000000000000 T main
                 U printf
```

|符号|意义|
| --- | --- |
|`T`|定义在文本（代码）部分 |
|`U`|未定义，必须由另一个文件或库提供 |
|`D`|定义在数据部分 |
|`B`|定义在 bss 部分 |
|`R`|在只读数据中定义 |
|`W`|弱符号（可以被覆盖）|

这里，`main`被定义，`printf`未定义，意味着链接器必须在 C 标准库中找到它。

#### 小代码：检查多文件示例

数学.c

```
int add(int a, int b) { return a + b; }
int mul(int a, int b) { return a * b; }
```

主程序

```
#include <stdio.h>
int add(int, int);
int mul(int, int);
int main(void) {
    printf("%d\n", add(2, 3) * mul(1, 4));
    return 0;
}
```

编译但不链接：

```
gcc -c main.c
gcc -c math.c
```

检查：

```
nm main.o
```

```
U add
U mul
U printf
T main
```

`U`表示未定义，链接器必须解决这些问题。

现在检查`math.o`:

```
T add
T mul
```

这些定义将满足链接器的要求。

链接并检查结果：

```
gcc main.o math.o -o app
nm app | grep add
```

现在你会看到：

```
0000000000401136 T add
```

链接器重新定位`add()`进入其最终地址。

#### 步骤 5. 符号可见性

默认情况下，每个函数和全局变量都有外部链接，对链接器可见。

使用`static`限制当前文件的可见性：

```
static int hidden_func(void) { return 42; }
```

现在`nm`不会将其列为导出符号。这可以保持您的二进制文件干净并防止文件之间的名称冲突。

#### 步骤 6. 检查搬迁

目标文件尚不知道最终地址，因此它们存储重定位条目：链接器稍后必须填充的地址占位符。

检查它们：

```
readelf -r main.o
```

输出：

```
Relocation section '.rela.text':
0000000000000010 R_X86_64_PC32 printf-0x4
```

这告诉链接器：

“链接时，将此占位符替换为`printf()`.”

#### 步骤 7. 反汇编代码

可以看到实际的机器指令：

```
objdump -d main.o
```

输出片段：

```
0000000000000000 <main>:
   0: 55                    push   %rbp
   1: 48 89 e5              mov    %rsp,%rbp
   4: b8 00 00 00 00        mov    $0x0,%eax
```

每条指令对应于已编译的 C 代码。这是验证优化、检查内联或研究生成的程序集的方式。

#### 步骤 8. 混合目标文件

因为`.o`文件包含清晰的符号元数据，您可以混合来自不同语言的目标文件，例如 C 和汇编。

总和

```
.globl sum
sum:
    addq %rsi, %rdi
    movq %rdi, %rax
    ret
```

编译并链接：

```
as sum.s -o sum.o
gcc main.c sum.o -o app
```

这就是 C 与低级代码干净地集成的方式。

#### 步骤 9. 对象文件大小和内容

检查文件大小：

```
size main.o
```

输出：

```
text    data     bss     dec     hex filename
45      4        0       49      31  main.o
```

-`text`→ 代码大小
-`data`→ 初始化全局变量
-`bss`→ 未初始化的变量

#### 步骤 10. 小代码：调查一切

```
gcc -c hello.c -o hello.o
readelf -h hello.o          # ELF header
readelf -S hello.o          # Sections
readelf -s hello.o | head   # Symbol table
readelf -r hello.o          # Relocations
objdump -d hello.o | head   # Disassembly
```

您将获得有关 C 代码在编译器看来如何的完整低级视图。

#### 为什么它很重要

了解目标文件可以帮助您：

- 调试链接错误和符号冲突
- 检查编译器优化
- 将C与汇编集成
- 手动构建静态和共享库
- 查看二进制文件中的实际内容

在系统编程中，这种见解将代码用户与代码工程师分开。

#### 自己尝试一下

1. 创建两个`.o`相互依赖的文件并检查其未定义的符号。
2. 使用`readelf -S`比较`.text`,`.data`， 和`.bss`对于不同的程序。
3.添加一个全局变量，看看它是如何出现的`.data`或者`.bss`.
4. 将函数标记为`static`并确认它从以下位置消失`nm`输出。
5. 编译`-O2`并观察拆卸中的变化`objdump -d`.

接下来，您将通过从头开始构建自己的基于 Makefile 的编译管道，显式编写每个阶段来完成第 6 章的转换`.c`文件到`.o`,`.a`， 和`.so`工件就像真正的编译器工具链一样。
