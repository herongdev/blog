---
title: "83. 内联组装和硬件访问"
date: "2026-07-04"
lang: "zh-CN"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "09-可移植与现代 C"
  - "中文"
description: "The Little Book of C 中文版 — 83. 内联组装和硬件访问"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
translator: "机器辅助翻译（Google Translate）"
section: 83
sidebarWeight: 83
alternateZh: "/posts/c教程/zh-CN/09-可移植与现代 C/083-Inline Assembly and Hardware Access"
alternateEn: "/posts/c教程/en-US/09-Portable and Modern C/083-Inline Assembly and Hardware Access"
---

[English version](/posts/c教程/en-US/09-Portable and Modern C/083-Inline Assembly and Hardware Access)

C 可以让您精确控制内存和性能，但有时您需要更深入一层，直接控制 CPU。这就是内联汇编的用武之地：将汇编语言嵌入到 C 代码中以优化性能或访问硬件级功能。

本章将展示如何安全、可移植且有意义地混合 C 和汇编。

#### 步骤 1. 什么是内联汇编？

内联汇编允许您将机器指令的小片段插入到 C 程序中。您可以用它来：

- 访问 C 未公开的 CPU 指令。
- 优化性能关键路径。
- 实施硬件驱动程序或低级例程。

然而，它也是不可移植的并且是特定于编译器的，因此请谨慎使用它并将其隔离在干净的 C 接口后面。

#### 步骤 2. 两种常见口味

GCC / Clang 语法（AT&T 或 Intel 风格）使用`asm`或者`__asm__`关键词。

MSVC 语法用途`__asm { ... }`内部函数。

我们将重点关注 GCC/Clang 语法，因为它在大多数系统编程环境中使用。

#### 步骤 3. 基本内联汇编示例

Tiny Code：打印 CPU ID 寄存器（仅限 x86）

```
#include <stdio.h>
int main(void) {
    unsigned int eax, ebx, ecx, edx;
    eax = 0;
    __asm__ __volatile__(
        "cpuid"
        : "=a"(eax), "=b"(ebx), "=c"(ecx), "=d"(edx)
        : "a"(0)
    );
    printf("CPU Vendor: %.4s%.4s%.4s\n",
           (char*)&ebx, (char*)&edx, (char*)&ecx);
}
```

解释：

-`cpuid`是一条向寄存器填充信息的CPU指令。
-`"=a"(eax)`意思是“存储寄存器的输出`eax`进入变量`eax`.”
-`: "a"(0)`意思是“将 0 放入`eax`在运行指令之前。”
- 这`__volatile__`关键字告诉编译器不要优化它。

#### 步骤 4.GCC 内联汇编语法

一般形式：

```
asm volatile ("instruction list"
              : output_operands
              : input_operands
              : clobbered_registers);
```

例子：

```
asm volatile ("addl %%ebx, %%eax"
              : "=a"(result)
              : "a"(x), "b"(y));
```

解释：

-`"addl %%ebx, %%eax"`, 装配说明
-`"=a"(result)`，输出于`eax`去`result`
-`"a"(x), "b"(y)`，输入：放`x`在`eax`,`y`在`ebx`

#### 步骤 5. 读取 CPU 周期计数器

Tiny Code：测量操作之间的 CPU 周期

```
#include <stdio.h>
unsigned long long rdtsc(void) {
    unsigned int lo, hi;
    __asm__ __volatile__("rdtsc" : "=a"(lo), "=d"(hi));
    return ((unsigned long long)hi << 32) | lo;
}
int main(void) {
    unsigned long long start = rdtsc();
    for (volatile int i = 0; i < 1000000; i++);
    unsigned long long end = rdtsc();
    printf("Cycles: %llu\n", end - start);
}
```

解释：

-`rdtsc`读取 CPU 的时间戳计数器。
- 它是 CPU 周期时间的精确测量，非常适合微基准测试。

#### 步骤 6. 写入 I/O 端口（嵌入式或内核上下文）

如果您正在编写嵌入式代码或操作系统内核，您通常会直接与硬件寄存器交互。

示例（x86，仅限特权模式）：

```
static inline void outb(unsigned short port, unsigned char value) {
    __asm__ __volatile__("outb %0, %1" : : "a"(value), "Nd"(port));
}
```

这会将一个字节写入 I/O 端口，用于串行端口、定时器或 PIC 控制器等设备。

在用户空间中，您通常无法执行此操作（需要内核权限）。

#### 步骤 7. 内存屏障和 CPU 围栏

使用并发或硬件时，您可能需要控制指令顺序。

```
__asm__ __volatile__("mfence" ::: "memory");
```

这告诉 CPU 和编译器不要重新排序内存操作，这对于在硬件级别编写线程安全或设备控制代码至关重要。

#### 步骤 8. 注册约束

GCC 允许您指定要使用的寄存器。

|约束|注册 |意义|
| --- | --- | --- |
|`"a"`|`eax`|蓄能器 |
|`"b"`|`ebx`|基地|
|`"c"`|`ecx`|柜台 |
|`"d"`|`edx`|数据|
|`"S"`|`esi`|来源索引 |
|`"D"`|`edi`|目的地索引 |

例子：

```
asm("mul %1" : "=a"(res) : "r"(x));
```

这`"r"`约束允许编译器选择任何寄存器。

#### 步骤 9. 混合汇编和 C 函数

您可以单独编写小例程`.S`文件（纯汇编）并从 C: 调用它们

```
# file: add.S
.global add_two
add_two:
    addl %esi, %edi
    movl %edi, %eax
    ret
```

然后在C中：

```
int add_two(int a, int b);
int main(void) {
    printf("%d\n", add_two(5, 7));
}
```

这种混合风格用于操作系统内核、引导加载程序和数学库。

#### 步骤 10. 小代码：内联汇编添加函数

```
#include <stdio.h>
int add_fast(int a, int b) {
    int result;
    __asm__ ("addl %1, %0" : "=r"(result) : "r"(b), "0"(a));
    return result;
}
int main(void) {
    printf("%d\n", add_fast(3, 5));
}
```

这`"0"(a)`约束告诉编译器使用相同的寄存器进行输入和输出。

#### 为什么它很重要

内联汇编会告诉您 C 代码下面到底发生了什么。即使您很少使用它，了解它也可以帮助您：

- 读取编译器生成的程序集（`gcc -S`)
- 优化性能关键代码
- 了解系统调用、上下文切换和内核陷阱如何工作

这是软件与硬件相遇的地方，硬件是计算的真正金属。

#### 自己尝试一下

1. 编写一个小的内联汇编片段来交换两个整数。
2. 打印 CPU 供应商字符串`cpuid`.
3. 使用`rdtsc()`对您的功能进行基准测试。
4. 使用检查编译器生成的程序集`gcc -S`.
5. 尝试在汇编中重新实现基本数学运算并比较性能。

接下来，您将学习交叉编译，即如何在您自己的机器上为其他架构和系统构建 C 程序。
