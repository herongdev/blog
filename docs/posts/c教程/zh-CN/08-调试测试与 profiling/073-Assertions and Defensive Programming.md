---
title: "73. 断言和防御性编程"
date: "2026-07-04"
lang: "zh-CN"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "08-调试测试与 profiling"
  - "中文"
description: "The Little Book of C 中文版 — 73. 断言和防御性编程"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
translator: "机器辅助翻译（Google Translate）"
section: 73
sidebarWeight: 73
alternateZh: "/posts/c教程/zh-CN/08-调试测试与 profiling/073-Assertions and Defensive Programming"
alternateEn: "/posts/c教程/en-US/08-Debugging Testing Profiling/073-Assertions and Defensive Programming"
---

[English version](/posts/c教程/en-US/08-Debugging Testing Profiling/073-Assertions and Defensive Programming)

错误是不可避免的，但崩溃不一定是这样。 C 为您提供了对机器的直接控制权，这意味着您必须保护自己的假设。这就是断言和防御性编程的用武之地：它们可以帮助您尽早发现错误，快速失败，并使您的代码可预测。

#### 步骤 1. 什么是断言？

断言是代码中内置的健全性检查。它测试你相信的事情是否真实。如果没有，程序会立即停止并显示错误消息，以免事情变得更糟。

包含标题：

```
#include <assert.h>
```

例子：

```
int divide(int a, int b) {
    assert(b != 0);  // ensure no division by zero
    return a / b;
}
```

如果`b`为零，程序中止：

```
Assertion failed: (b != 0), function divide, file main.c, line 3.
```

#### 步骤 2. 断言如何工作

`assert(expression)`扩展到类似：

```
if (!(expression)) {
    fprintf(stderr, "Assertion failed: %s, file %s, line %d\n",
            "expression", __FILE__, __LINE__);
    abort();
}
```

正常编译时，它会检查条件。当编译时`-DNDEBUG`，断言被禁用。

#### 步骤 3. 启用或禁用断言

默认值：断言处于活动状态。要禁用它们（对于生产版本）：

```
gcc -DNDEBUG program.c -o program
```

在那个建筑中，`assert()`语句被删除。

这使您可以保留调试检查，而不会减慢发布二进制文件的速度。

#### 步骤 4. 实际示例

```
#include <assert.h>
#include <stdio.h>
int find_max(int *arr, int n) {
    assert(arr != NULL);
    assert(n > 0);
    int max = arr[0];
    for (int i = 1; i < n; i++)
        if (arr[i] > max) max = arr[i];
    return max;
}
int main(void) {
    int data[] = {3, 5, 7, 2, 8};
    printf("Max: %d\n", find_max(data, 5));
}
```

如果你通过了`NULL`指针或无效长度，程序立即失败。

#### 第 5 步：编写好的断言

断言应该测试内部假设，而不是用户输入。坏的：

```
assert(argc == 3);
```

好的：

```
if (argc != 3) {
    fprintf(stderr, "Usage: %s input output\n", argv[0]);
    return 1;
}
```

使用断言来检查逻辑中的不变量，除非存在错误，否则永远不应该发生的事情。

#### 步骤 6. 防御性编程技术

防御性编程超越了断言，它是编写假设错误会发生的代码。

检查每个函数的返回值：

```
FILE *f = fopen("file.txt", "r");
if (!f) {
    perror("fopen");
    return 1;
}
```

验证输入：

```
int divide(int a, int b) {
    if (b == 0) {
        fprintf(stderr, "Division by zero!\n");
        return 0;
    }
    return a / b;
}
```

避免未定义的行为：

- 初始化所有变量。
- 不要访问已释放的内存。
- 检查数组边界。
- 始终匹配`malloc()`和`free()`.

#### 步骤 7. 复杂系统中的断言

在大型程序中，断言就像绊线一样，用于检测状态何时变得不一致。

示例：队列

```
#include <assert.h>
void enqueue(int *queue, int *count, int value, int max) {
    assert(*count < max);
    queue[*count] = value;
    (*count)++;
}
```

如果您的逻辑出现问题，断言会在内存损坏发生之前立即告诉您。

#### 步骤 8. 日志记录与断言

- 断言：捕获编程错误。
- 日志记录：记录运行时信息。

结合两者：

```
#include <assert.h>
#include <stdio.h>
int read_value(int *arr, int n, int index) {
    assert(index >= 0 && index < n);
    printf("Reading arr[%d] = %d\n", index, arr[index]);
    return arr[index];
}
```

#### 步骤 9. 使用 static_assert 进行编译时检查 (C11+)

C11介绍`_Static_assert`，它在编译期间检查条件。

```
#include <assert.h>
_Static_assert(sizeof(int) == 4, "int must be 4 bytes");
```

如果条件失败，编译器将停止并显示：

```
error: static assertion failed: "int must be 4 bytes"
```

这非常适合配置或架构假设。

#### 步骤 10. 小代码：安全数组访问

```
#include <assert.h>
#include <stdio.h>
#define MAX 5
int safe_get(int arr[], int n, int i) {
    assert(i >= 0 && i < n);
    return arr[i];
}
int main(void) {
    int nums[MAX] = {1, 2, 3, 4, 5};
    printf("%d\n", safe_get(nums, MAX, 2));  // OK
    printf("%d\n", safe_get(nums, MAX, 10)); // triggers assertion
}
```

输出：

```
Assertion failed: (i >= 0 && i < n), function safe_get, file main.c, line 7.
```

#### 为什么它很重要

断言和防御性编码使您的软件：

- 更安全，尽早发现错误。
- 更容易调试，从源头失败，而不是以后失败。
- 更易于维护，清楚地记录假设。

在 C 语言中，一个错误的指针可能会导致系统崩溃。断言是你的安全网。

#### 自己尝试一下

1. 将断言添加到堆栈或链表实现中。
2. 编写一个函数，在继续操作之前验证所有参数。
3. 使用`_Static_assert`检查跨平台程序中的类型大小。
4. 将断言与日志记录结合起来以获得详细的错误报告。
5. 使用无效输入运行程序，看看断言检测问题的速度有多快。

接下来，您将进入 C 语言单元测试，构建小型自动化测试，以确保每个功能完全按预期工作。
