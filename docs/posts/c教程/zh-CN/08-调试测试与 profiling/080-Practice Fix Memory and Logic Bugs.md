---
title: "80. 练习：修复内存和逻辑错误"
date: "2026-07-04"
lang: "zh-CN"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "08-调试测试与 profiling"
  - "中文"
description: "The Little Book of C 中文版 — 80. 练习：修复内存和逻辑错误"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
translator: "机器辅助翻译（Google Translate）"
section: "80"
sidebarWeight: "80"
alternateZh: "/posts/c教程/zh-CN/08-调试测试与 profiling/080-Practice Fix Memory and Logic Bugs"
alternateEn: "/posts/c教程/en-US/08-Debugging Testing Profiling/080-Practice Fix Memory and Logic Bugs"
---

[English version](/posts/c教程/en-US/08-Debugging Testing Profiling/080-Practice Fix Memory and Logic Bugs)

#### 跟练交付物

- 已具备状态：完成第 071-079 课，能重新编译上一章示例。
- 工作目录：`~/c-course-labs/080-debug-lab`。
- 第一条命令：macOS / Linux 运行 `mkdir -p ~/c-course-labs/080-debug-lab && cd ~/c-course-labs/080-debug-lab`；Windows PowerShell 运行 `New-Item -ItemType Directory -Force "$HOME\c-course-labs\080-debug-lab"; Set-Location "$HOME\c-course-labs\080-debug-lab"`。
- 成功证据：保留源码、可执行文件、`evidence.md`，并记录修复前失败、定位方法、修复后输出、内存检查或断言结果。
- 本章边界：本章目标是修复证据，不是追求功能数量；暂不要求完整测试框架或 CI。
- 重置方式：删除本章生成的可执行文件、临时数据和输出文件，保留源码与 `evidence.md` 方便复盘。

现在是时候将您所学到的一切（调试、测试、断言、日志记录和分析）应用到实际损坏的代码中了。本节将引导您了解新程序员（甚至有经验的程序员）会遇到的一些常见的小 C 错误，并展示如何查找、理解和修复它们。

#### 步骤 1. Bug #1，来自坏指针的分段错误

越野车代码：

```
#include <stdio.h>
int main(void) {
    int *p;
    *p = 10;  // writing to uninitialized pointer
    printf("%d\n", *p);
}
```

症状：

```
Segmentation fault (core dumped)
```

诊断：

- 指针`p`从未被初始化。
- 它指向一个未定义的地址。

使固定：

```
#include <stdio.h>
int main(void) {
    int x = 10;
    int *p = &x;
    printf("%d\n", *p);
}
```

经验教训：在使用指针之前始终初始化指针。如果是动态的，则分配`malloc()`并检查`NULL`.

#### 步骤 2. Bug #2，内存泄漏

越野车代码：

```
#include <stdlib.h>
void leak(void) {
    int *arr = malloc(10 * sizeof(int));
    for (int i = 0; i < 10; i++) arr[i] = i;
    // forgot to free
}
int main(void) {
    for (int i = 0; i < 10000; i++) leak();
}
```

诊断：每次致电`leak()`分配内存并且从不释放它。使用 Valgrind 确认：

```
valgrind ./a.out
```

使固定：

```
void leak(void) {
    int *arr = malloc(10 * sizeof(int));
    if (!arr) return;
    for (int i = 0; i < 10; i++) arr[i] = i;
    free(arr);
}
```

课程：每`malloc()`需要一个匹配的`free()`，无一例外。

#### 步骤 3. Bug #3，相差一错误

越野车代码：

```
#include <stdio.h>
int main(void) {
    int nums[5] = {0, 1, 2, 3, 4};
    for (int i = 0; i <= 5; i++)  // ❌ should be < 5
        printf("%d ", nums[i]);
}
```

症状：有时会打印垃圾或段错误。

使固定：

```
for (int i = 0; i < 5; i++)
```

教训：差一错误是循环中最常见的错误。务必仔细检查边界条件。

#### 步骤 4. Bug #4，释放后使用

越野车代码：

```
#include <stdio.h>
#include <stdlib.h>
int main(void) {
    int *x = malloc(sizeof(int));
    *x = 5;
    free(x);
    printf("%d\n", *x);  // ❌ accessing freed memory
}
```

使固定：

```
free(x);
x = NULL;
```

现在：

```
if (x) printf("%d\n", *x);
```

教训：一旦释放了内存，它就不再是你的了，永远不要再碰它。

#### 步骤 5. Bug #5，堆栈变量转义作用域

越野车代码：

```
int *make_ptr(void) {
    int x = 10;
    return &x;  // ❌ pointer to local variable
}
int main(void) {
    int *p = make_ptr();
    printf("%d\n", *p);  // UB
}
```

使固定：

```
int *make_ptr(void) {
    int *x = malloc(sizeof(int));
    *x = 10;
    return x;
}
```

并记住`free(p)`之后。

教训：永远不要返回局部变量的地址，它的生命周期在函数返回时结束。

#### 步骤 6. Bug #6，缺少返回语句

越野车代码：

```
int add(int a, int b) {
    int c = a + b;
    // forgot to return
}
int main(void) {
    printf("%d\n", add(2, 3));
}
```

使固定：

```
return c;
```

教训：如果函数的返回类型是非`void`，始终返回一个值。编译用`-Wall -Wextra`自动捕捉这个。

#### 步骤 7.Bug #7，未初始化的变量

越野车代码：

```
int sum(void) {
    int s;
    for (int i = 0; i < 3; i++) s += i;  // s not initialized
    return s;
}
```

使固定：

```
int s = 0;
```

教训：在使用所有变量之前初始化它们，尤其是累加器。

#### 步骤 8. Bug #8，混合签名和未签名

越野车代码：

```
#include <stdio.h>
int main(void) {
    int a = -1;
    unsigned int b = 1;
    if (a < b) printf("less\n"); else printf("greater\n");
}
```

输出：

```
greater
```

解释：`a`转换为无符号，因此它变成一个很大的正数。

修复：避免混合有符号和无符号类型。使用显式强制转换或一致类型。

#### 步骤 9. Bug #9，缓冲区溢出

越野车代码：

```
#include <stdio.h>
#include <string.h>
int main(void) {
    char name[8];
    strcpy(name, "Superlongname");  // ❌ too big
    printf("%s\n", name);
}
```

使固定：

```
strncpy(name, "Superlongname", sizeof(name) - 1);
name[7] = '\0';
```

教训：永远不要相信输入大小，始终使用有界函数。

#### 步骤 10. Bug #10，浮点比较

越野车代码：

```
#include <stdio.h>
int main(void) {
    float a = 0.1f * 3;
    if (a == 0.3f) printf("Equal\n");
    else printf("Not equal\n");
}
```

输出：

```
Not equal
```

使固定：

```
if (fabsf(a - 0.3f) < 1e-6) printf("Equal\n");
```

教训：浮点数学是近似的，总是与公差进行比较。

#### 把它们放在一起

您可以结合所有这些技术：

- 使用断言来捕获不可能的状态。
- 使用日志记录来跟踪事件。
- 运行 Valgrind 或 ASan 来检测内存错误。
- 使用单元测试来验证正确性。
- 如果仍然崩溃，请分析核心转储。

每个调试工具都是一个镜头。一起使用它们可以看得更清楚。

#### 为什么它很重要

调试告诉您程序如何失败。每个修复的错误都会让您成为更加自信的系统工程师。 C 不会原谅错误，但它奖励精确性。

#### 自己尝试一下

1. 编写一个包含至少 3 个此类错误的程序。
2. 在AddressSanitizer下运行它（`-fsanitize=address`).
3.一一修复每个bug。
4. 记录导致该问题的原因以及解决该问题的方法。
5. 将此作为个人调试套路，练习直至没有 bug 存活时间超过 10 分钟。

接下来，我们将开始第 9 章：可移植和现代 C，您将学习如何编写可以在从嵌入式芯片到现代服务器的任何地方运行的 C。
