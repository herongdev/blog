---
title: "71. 使用 gdb 进行调试"
date: "2026-07-04"
lang: "zh-CN"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "08-调试测试与 profiling"
  - "中文"
description: "The Little Book of C 中文版 — 71. 使用 gdb 进行调试"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
translator: "机器辅助翻译（Google Translate）"
section: 71
sidebarWeight: 71
alternateZh: "/posts/c教程/zh-CN/08-调试测试与 profiling/071-Debugging with gdb"
alternateEn: "/posts/c教程/en-US/08-Debugging Testing Profiling/071-Debugging with gdb"
---

[English version](/posts/c教程/en-US/08-Debugging Testing Profiling/071-Debugging with gdb)

每个 C 程序员最终都会遇到分段错误，这时您就会发现您最强大的伴侣：gdb，GNU 调试器。调试不是靠运气，而是靠运气。它是关于学习在程序运行时检查程序、暂停时间并了解计算机真正在做什么。

让我们学习如何使用 gdb 来查找错误、检查内存、跟踪崩溃并真正理解您的代码。

#### 步骤 1. 使用调试信息进行编译

在调试之前，您需要告诉编译器包含符号信息（变量名称、行号等）。使用`-g`旗帜：

```
gcc -g main.c -o main
```

您现在可以在 gdb 中打开它：

```
gdb ./main
```

#### 步骤 2. 启动并运行您的程序

在 gdb 中，您可以像平常一样运行您的程序：

```
(gdb) run
```

如果它崩溃了，你会得到类似的信息：

```
Program received signal SIGSEGV, Segmentation fault.
0x000000000040114a in buggy_function () at main.c:12
12        *ptr = 42;
```

您现在确切地知道它失败在哪里。

#### 步骤 3. 设置断点

断点告诉 gdb 在执行特定行或函数之前暂停。

```
(gdb) break main
Breakpoint 1 at 0x40113b: file main.c, line 5.
(gdb) run
```

当程序停止时，您可以检查状态：

```
(gdb) print variable_name
(gdb) next
(gdb) step
```

-`next`执行下一行（跳过函数调用）。
-`step`进入函数调用。

#### 步骤 4. 示例：一个简单的错误

这是一个存在经典分段错误的程序。

```
#include <stdio.h>
void buggy(void) {
    int *p = NULL;
    *p = 10;
}
int main(void) {
    printf("Before crash\n");
    buggy();
    printf("After crash\n");
}
```

编译和调试：

```
gcc -g bug.c -o bug
gdb ./bug
(gdb) run
```

输出：

```
Program received signal SIGSEGV, Segmentation fault.
0x0000555555555159 in buggy () at bug.c:5
5        *p = 10;
```

现在检查：

```
(gdb) backtrace
#0 buggy () at bug.c:5
#1 main () at bug.c:10
```

您刚刚从主线路到确切的故障线路追踪了崩溃。

#### 步骤 5. 检查变量

您可以随时查看变量值：

```
(gdb) print x
(gdb) print *ptr
```

您还可以修改它们：

```
(gdb) set variable x = 100
```

列出所有局部变量：

```
(gdb) info locals
```

#### 步骤 6. 导航执行

常用gdb命令：

|命令 |行动|
| --- | --- |
|`run`|启动程序|
|`break N`|停在 N 线 |
|`next`|运行下一行 |
|`step`|进入函数|
|`continue`|继续直到下一个断点 |
|`finish`|运行直到函数返回 |
|`backtrace`|显示调用堆栈 |
|`info locals`|列出本地变量 |
|`print VAR`|显示价值 |
|`quit`|退出 gdb |

#### 步骤 7.观察变量

您可以设置观察点，当变量更改时 gdb 会停止。

```
int counter = 0;
for (int i = 0; i < 10; i++)
    counter += i;
```

在gdb中：

```
(gdb) watch counter
(gdb) run
```

每次`counter`发生变化时，程序会暂停，显示发生的位置。

#### 步骤 8. 条件断点

有时您只想在特定条件下停止：

```
(gdb) break loop.c:25 if i > 100
```

该断点仅在以下情况下触发`i`超过100。

#### 步骤 9. 检查内存和寄存器

您可以检查原始内存：

```
(gdb) x/10x &array
```

这会打印 10 个十六进制单词，从`&array`.

或者查看寄存器：

```
(gdb) info registers
```

这对于低级调试（例如编译器、操作系统内核、嵌入式代码）很有用。

#### 步骤 10. 小代码：调试逻辑错误

```
#include <stdio.h>
int main(void) {
    int sum = 0;
    for (int i = 1; i <= 5; i++) {
        sum = sum + i;
    }
    printf("Sum = %d\n", sum); // should be 15
}
```

引入一个bug：

```
for (int i = 1; i <= 5; i++); // extra semicolon!
```

编译和调试：

```
gcc -g bug.c -o bug
gdb ./bug
(gdb) break main
(gdb) run
(gdb) print sum
(gdb) next
(gdb) print sum
```

你会看到`sum`永远不会改变，因为循环体是空的。

#### 为什么它很重要

调试是您学习像机器一样思考的方式：

- 您可以检查线路之间发生的情况。
- 您可以看到每个变量的值。
- 您可以在几秒钟内找到分段错误。

学习 gdb 会教你 C 是如何真正运行的，从堆栈帧到指针。

#### 自己尝试一下

1. 编写一个崩溃的程序（例如，使用空指针）并使用 gdb 跟踪原因。
2. 使用`next`和`step`跟踪递归函数。
3. 在循环中的变量上设置观察点。
4. 添加条件断点，仅在值超出限制时触发。
5. 探索`backtrace`和`info locals`车祸后。

接下来，您将学习如何使用不可或缺的 Valgrind 工具来检测隐藏的内存错误、泄漏、无效释放和缓冲区溢出。
