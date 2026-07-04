---
title: "72. 使用 Valgrind 进行内存检查"
date: "2026-07-04"
lang: "zh-CN"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "08-调试测试与 profiling"
  - "中文"
description: "The Little Book of C 中文版 — 72. 使用 Valgrind 进行内存检查"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
translator: "机器辅助翻译（Google Translate）"
section: 72
sidebarWeight: 72
alternateZh: "/posts/c教程/zh-CN/08-调试测试与 profiling/072-Using Valgrind for Memory Checking"
alternateEn: "/posts/c教程/en-US/08-Debugging Testing Profiling/072-Using Valgrind for Memory Checking"
---

[English version](/posts/c教程/en-US/08-Debugging Testing Profiling/072-Using Valgrind for Memory Checking)

如果 gdb 可以帮助您了解程序如何运行，那么 Valgrind 可以帮助您了解程序的泄漏位置。 C 为您提供了对内存的原始控制，这意味着您负责每次分配、释放和指针访问。

当您需要找到以下内容时，Valgrind 是您最好的朋友：

- 内存泄漏（忘记`free()`)
- 无效读/写
- 双重免费
- 释放后使用错误

让我们学习如何使用它来使您的程序可靠且无泄漏。

#### 步骤1.安装Valgrind

在 Linux 上：

```
sudo apt install valgrind
```

在 macOS 上（使用 Homebrew）：

```
brew install valgrind
```

使用调试符号编译程序：

```
gcc -g memory.c -o memory
```

#### 步骤 2. 使用 Valgrind 运行

在 Valgrind 下运行你的程序：

```
valgrind ./memory
```

Valgrind 在虚拟 CPU 中运行您的程序并监视每个内存操作。最后，它打印分配和泄漏的详细报告。

#### 步骤 3. 一个简单的例子

这是一个有两个常见错误的程序：泄漏和无效释放。

```
#include <stdlib.h>
#include <stdio.h>
int main(void) {
    int *p = malloc(10 * sizeof(int));
    p[10] = 42;  // invalid write (out of bounds)
    return 0;    // forgot to free(p)
}
```

运行它：

```
gcc -g mem_bug.c -o mem_bug
valgrind ./mem_bug
```

输出：

```
==1234== Invalid write of size 4
==1234==    at 0x1091A: main (mem_bug.c:6)
==1234==  Address 0x5201048 is 0 bytes after a block of size 40 alloc'd
==1234==    at 0x484186F: malloc (vg_replace_malloc.c:380)
==1234==
==1234== HEAP SUMMARY:
==1234==    definitely lost: 40 bytes in 1 blocks
==1234== LEAK SUMMARY:
==1234==    definitely lost: 40 bytes in 1 blocks
```

Valgrind 捕获了无效访问和泄漏。

#### 步骤 4. 修复错误

正确版本：

```
#include <stdlib.h>
#include <stdio.h>
int main(void) {
    int *p = malloc(10 * sizeof(int));
    if (!p) return 1;
    p[9] = 42;   // valid index
    free(p);
}
```

再次运行：

```
valgrind ./mem_bug
```

输出：

```
== All heap blocks were freed -- no leaks are possible
== ERROR SUMMARY: 0 errors from 0 contexts
```

干净又完美。

#### 步骤 5. 检测释放后使用

```
#include <stdlib.h>
#include <stdio.h>
int main(void) {
    int *p = malloc(sizeof(int));
    *p = 5;
    free(p);
    printf("%d\n", *p); // using freed memory
}
```

瓦尔格林德 说：

```
==1234== Invalid read of size 4
==1234==    at 0x1091A: main (use_after_free.c:7)
==1234==  Address 0x5201040 is 0 bytes inside a block of size 4 free'd
```

它甚至显示了块被释放的位置。

#### 步骤 6. 检测双重释放

```
#include <stdlib.h>
int main(void) {
    int *p = malloc(4);
    free(p);
    free(p);
}
```

Valgrind 输出：

```
==1234== Invalid free() / delete / delete[]
==1234==    at 0x4845DEF: free (vg_replace_malloc.c:872)
==1234==  Address 0x5201040 was freed previously
```

#### 步骤 7. 内存泄漏类别

Valgrind 将泄漏分为几类：

|类型 |意义|
| --- | --- |
|肯定输了|没有指向该块的指针保留，真正的泄漏 |
|间接损失|被泄露的块引用 |
|可能丢失|指针可能存在但Valgrind无法确认 |
|仍然可达 |程序结束但内存未释放（通常是无害的）|

#### 步骤 8. 获取干净的报告

仅检查是否存在真正的泄漏：

```
valgrind --leak-check=full --show-leak-kinds=definite ./program
```

对于更详细的跟踪：

```
valgrind --track-origins=yes ./program
```

该标志告诉您未初始化的变量首次出现的位置。

#### 步骤 9. 检查堆栈或未初始化的值

```
#include <stdio.h>
int main(void) {
    int x;
    printf("%d\n", x); // uninitialized read
}
```

Valgrind 输出：

```
==1234== Use of uninitialised value of size 4
==1234==    at 0x1091A: main (uninit.c:5)
```

始终初始化变量！

#### 步骤 10. 小代码：泄漏检测器

```
#include <stdlib.h>
void leak1(void) { malloc(100); }
void leak2(void) { char *p = malloc(50); free(p); }
int main(void) {
    leak1();
    leak2();
}
```

跑步：

```
valgrind --leak-check=full ./leaks
```

输出：

```
==1234== 100 bytes in 1 blocks are definitely lost in loss record 1 of 1
==1234== LEAK SUMMARY:
==1234==    definitely lost: 100 bytes in 1 blocks
```

仅有的`leak1()`忘记了`free()`，Valgrind 准确地指出了这一点。

#### 为什么它很重要

Valgrind 可以帮助您：

- 查找隐藏的内存泄漏
- 检测无效指针的使用
- 捕获未初始化的值
- 编写更安全、更干净、更可靠的C

它是工作流程中必不可少的工具，特别是对于长时间运行的程序、服务器或系统软件。

#### 自己尝试一下

编写一个分配多个块但忘记释放其中一个的程序。

故意使用`p[10]`在一个`malloc(10)`堵塞。

触发释放后使用并在 Valgrind 中找到它。

使用`--track-origins=yes`跟踪未初始化的数据。

重构您的代码，直到 Valgrind 报告：

```
All heap blocks were freed -- no leaks are possible
```

接下来，您将探索断言和防御性编程，这些技术可以在逻辑错误达到运行时崩溃之前捕获它们。
