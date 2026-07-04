---
title: "26. 内存泄漏和未定义的行为"
date: "2026-07-04"
lang: "zh-CN"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "03-内存"
  - "中文"
description: "The Little Book of C 中文版 — 26. 内存泄漏和未定义的行为"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
translator: "机器辅助翻译（Google Translate）"
section: 26
sidebarWeight: 26
alternateZh: "/posts/c教程/zh-CN/03-内存/026-Memory Leaks and Undefined Behavior"
alternateEn: "/posts/c教程/en-US/03-Working with Memory/026-Memory Leaks and Undefined Behavior"
---

[English version](/posts/c教程/en-US/03-Working with Memory/026-Memory Leaks and Undefined Behavior)

C 使您可以完全控制内存，这意味着您可以做任何您想做的事情，包括永远不应该做的事情。两个最大的危险是内存泄漏（当内存永远不会被释放时）和未定义的行为（当程序执行不可预测的操作时）。学会避免这些是编写稳定、安全和正确的 C 程序的关键。

#### 什么是内存泄漏？

当您在堆上分配内存并且从未释放它时，就会发生内存泄漏。即使您无法再访问它，内存仍会保留。

例子：

```
#include <stdlib.h>
void leak(void) {
    int *data = malloc(100 * sizeof(int)); // allocated
    data[0] = 42;
    // forgot to free(data); memory is now lost
}
```

如果`leak()`运行多次后，您的程序会消耗越来越多的内存，直到崩溃或变慢。在长时间运行的程序（如服务器）中，这是致命的。

规则：每个`malloc`,`calloc`， 或者`realloc`最终必须与匹配的配对`free()`.

#### 小代码

让我们看看泄漏和修复的实际情况。

```
#include <stdio.h>
#include <stdlib.h>
void with_leak(void) {
    int *arr = malloc(5 * sizeof(int));
    for (int i = 0; i < 5; i++) arr[i] = i;
    printf("with_leak: allocated 5 ints, but not freed.\n");
}
void without_leak(void) {
    int *arr = malloc(5 * sizeof(int));
    for (int i = 0; i < 5; i++) arr[i] = i;
    printf("without_leak: freeing memory.\n");
    free(arr);
}
int main(void) {
    with_leak();
    without_leak();
    return 0;
}
```

使用 Valgrind（内存检查器）编译并运行：

```
gcc leaks_demo.c -o leaks_demo
valgrind ./leaks_demo
```

Valgrind 输出（简化）：

```
==1234== HEAP SUMMARY:
==1234==    definitely lost: 20 bytes in 1 blocks
==1234==    indirectly lost: 0 bytes in 0 blocks
==1234== LEAK SUMMARY:
==1234==    1 blocks definitely lost
```

您可以看到第一个函数泄漏了内存，而第二个函数则正确释放了内存。

#### 悬空指针

悬空指针指向已释放或无效的内存。

```
int *p = malloc(sizeof(int));
*p = 10;
free(p);
printf("%d\n", *p); // ❌ undefined behavior
```

后`free(p)`, 指针`p`仍然保留旧地址，但该内存不再属于您。访问它可能会崩溃，或者看起来可以工作，或者损坏数据，你不能依赖它。

始终使释放的指针无效：

```
free(p);
p = NULL;
```

#### 双重免费

两次释放相同的内存也会导致未定义的行为：

```
int *p = malloc(sizeof(int));
free(p);
free(p); // ❌ double free error
```

大多数现代操作系统都会检测到这一点并中止，但这仍然是一个严重的错误。

#### 释放后使用

这是最严重的内存错误之一。当您在释放内存后访问内存时，就会发生这种情况。

```
int *arr = malloc(3 * sizeof(int));
arr[0] = 5;
free(arr);
arr[0] = 7; // ❌ use-after-free
```

编译器不会发现这一点，但 Valgrind 会警告你。

#### 未初始化内存

读取从未写入过的内存也是未定义的：

```
int *arr = malloc(5 * sizeof(int));
printf("%d\n", arr[2]); // ❌ uninitialized read
```

`malloc()`不将内存清零，使用`calloc()`如果您需要清除数据。

#### 未定义行为的常见原因

|类型 |示例|后果|
| --- | --- | --- |
|越界访问 |`arr[10]`在 5 元素数组中 |破坏记忆 |
|免费后使用 |取消引用已释放的指针 |崩溃还是无声的腐败|
|空指针取消引用 |`*NULL`|崩溃 |
|除以零 |`x / 0`|崩溃 |
|无效的指针算术 |`(int *)0 + 1`|未定义 |
|修改字符串文字 |`char *s = "hi"; s[0]='H';`|崩溃 |

#### 为什么它很重要

未定义的行为不仅仅是“一个错误”。这意味着任何事情都可能发生：

- 你的程序可能看起来不错，但后来会失败。
- 编译器优化可能会意外删除或重新排序代码。
- 相同的代码可能在一个系统上运行，但在另一个系统上崩溃。

在 C 语言中，正确性是你的责任。您必须知道内存何时有效、谁拥有它以及何时释放它。

#### 防御技术

1. 经常检查`malloc()`返回值。
2. 初始化指针`NULL`.
3. 将指针设置为`NULL`释放后。
4. 使用 Valgrind (Linux) 或 AddressSanitizer (Clang/GCC) 检测泄漏和无效访问。
5. 喜欢小型、可测试的函数，更容易验证内存所有权。
6. 避免混合堆栈和堆内存，除非您确定生命周期。

#### 自己尝试一下

1. 编写一个故意泄漏内存的小程序。在 Valgrind 下运行它。
2.通过调用修复泄漏`free()`适当地。
3. 创建一个悬空指针并观察会发生什么（在某些系统上它会崩溃，在其他系统上则不会）。
4. 尝试`calloc()`查看零初始化内存的行为方式。
5. 编写一个分配内存并返回内存的函数，然后确保调用者释放它。

#### 最后的想法

内存错误是最难跟踪的错误，因为它们可能不会立即出现。但是一旦你了解了所有权、谁分配、谁释放，C 语言中的内存就变得可预测，甚至是优雅的。这种纪律是将临时 C 用户与真正的系统程序员区分开来的。
