---
title: "77. 常见的未定义行为"
date: "2026-07-04"
lang: "zh-CN"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "08-调试测试与 profiling"
  - "中文"
description: "The Little Book of C 中文版 — 77. 常见的未定义行为"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
translator: "机器辅助翻译（Google Translate）"
section: 77
sidebarWeight: 77
alternateZh: "/posts/c教程/zh-CN/08-调试测试与 profiling/077-Common Undefined Behaviors"
alternateEn: "/posts/c教程/en-US/08-Debugging Testing Profiling/077-Common Undefined Behaviors"
---

[English version](/posts/c教程/en-US/08-Debugging Testing Profiling/077-Common Undefined Behaviors)

C给你自由，但也给你责任。与高级语言不同，C 不能保护您免受危险错误的影响。有些操作会导致未定义的行为 (UB)：允许编译器执行任何响应操作、崩溃、挂起，甚至看起来工作正常，直到实际情况并非如此。

未定义的行为使得 C 语言既强大又危险。让我们探讨一下它的原因、如何识别它以及如何编写永远不会落入其陷阱的代码。

#### 步骤 1. 什么是未定义行为？

在 C 标准中，未定义的行为意味着“没有规则适用”。如果你的程序执行了语言未定义的操作，编译器可以假设它永远不会发生并自由优化。

这意味着您的程序可能：

- 立即崩溃。
- 产生错误的结果。
- 每次都有不同的行为。
- 在一个编译器上工作正常，在另一个编译器上失败。

例子：

```
int x = 5 / 0;  // UB: division by zero
```

编译器不需要警告您或安全地处理这个问题。

#### 步骤 2. UB 的常见来源

以下是每个 C 程序员必须知道的最常见的错误：

|类别 |示例|
| --- | --- |
|越界访问 |`arr[10]`当数组有 10 个元素时 |
|使用未初始化的变量 |`int x; printf("%d", x);`|
|悬空指针访问 |之后使用内存`free()`|
|无效的指针算术 |`(p + 5)`什么时候`p`不指向数组 |
|有符号整数溢出 |`int x = INT_MAX + 1;`|
|修改和读取同一变量|`i = i++;`或者`a[i] = i++;`|
|空指针取消引用 |`int *p = NULL; *p = 5;`|
|错误类型双关语 |通过错误的指针类型以 int 形式访问 float |
|不匹配`malloc`/`free`|`free()`内存未被分配`malloc()`|
|违反`const`或者`volatile`合同|写信给一个`const`变量|

#### 步骤 3. 越界访问

```
int arr[3] = {1, 2, 3};
printf("%d\n", arr[3]);  // UB: index 3 is past the end
```

C 不检查边界，你要对此负责。您可能会打印垃圾、崩溃或意外覆盖另一个变量。

经常检查：

```
if (index >= 0 && index < size)
    printf("%d\n", arr[index]);
```

#### 步骤 4. 使用未初始化的变量

```
int x;
printf("%d\n", x);  // UB: x is uninitialized
```

即使打印出来`0`，那是运气，而不是正确性。始终显式初始化变量：

```
int x = 0;
```

#### 步骤 5. 悬空指针

```
int *p = malloc(sizeof(int));
*p = 10;
free(p);
printf("%d\n", *p);  // UB: accessing freed memory
```

后`free()`，指针仍然存在，但内存不属于你。将其设置为`NULL`:

```
free(p);
p = NULL;
```

#### 步骤 6. 有符号整数溢出

在 C 中，有符号溢出是未定义的，但无符号溢出可以预见地回绕。

```
int x = 2147483647;
x = x + 1;  // UB
```

未签名版本：

```
unsigned int x = 4294967295;
x = x + 1;  // wraps to 0 (defined)
```

要安全地检查溢出：

```
if (a > INT_MAX - b) {
    printf("overflow\n");
} else {
    x = a + b;
}
```

#### 步骤 7. 在一个表达式中修改和读取

```
int i = 0;
i = i++ + 1;  // UB: reading and writing i without sequence point
```

避免同时出现副作用。编写干净的代码：

```
i++;
i = i + 1;
```

#### 步骤 8. 空指针取消引用

```
int *p = NULL;
*p = 10;  // UB
```

始终验证指针：

```
if (p != NULL) *p = 10;
```

#### 步骤 9. 类型双关和别名

```
float f = 3.14;
int *ip = (int *)&f;  // UB: violates strict aliasing
printf("%d\n", *ip);
```

如果必须重新解释字节，请使用`memcpy`:

```
int i;
memcpy(&i, &f, sizeof(i));
```

这可以避免别名冲突并且跨编译器是安全的。

#### 步骤10.Tiny Code：使用工具检测UB

使用编译器和运行时检查器在 UB 投入生产之前对其进行检测。

```
gcc -fsanitize=undefined -g ub_example.c -o ub_example
./ub_example
```

示例程序：

```
#include <stdio.h>
int main(void) {
    int x = 2147483647;
    x++;
    printf("%d\n", x);
}
```

输出：

```
runtime error: signed integer overflow: 2147483647 + 1 cannot be represented in type 'int'
```

这是运行中的未定义行为清理程序 (UBSan)，它是您查找隐形错误的最佳朋友。

#### 为什么它很重要

未定义的行为是无声的腐败。它可以：

- 在你的机器上工作但在其他地方失败。
- 更改编译器标志时中断。
- 造成微妙的、不可预测的错误。

避免 UB 是可靠系统编程的基础。在C语言中，正确性来自于纪律。

#### 自己尝试一下

1. 编写一个带有故意UB的小程序（例如使用未初始化的变量）。
2. 运行它`-fsanitize=undefined`.
3. 修复每个问题，直到 UBSan 运行干净。
4. 检查数组访问和指针的有效性。
5.重构旧的C代码以避免UB，这是一个很好的调试练习。

接下来，您将学习如何执行崩溃分析和读取核心转储，因此即使您的程序失败，您也可以找出确切的原因。
