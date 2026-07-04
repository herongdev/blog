---
title: "74. C 语言的单元测试"
date: "2026-07-04"
lang: "zh-CN"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "08-调试测试与 profiling"
  - "中文"
description: "The Little Book of C 中文版 — 74. C 语言的单元测试"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
translator: "机器辅助翻译（Google Translate）"
section: 74
sidebarWeight: 74
alternateZh: "/posts/c教程/zh-CN/08-调试测试与 profiling/074-Unit Testing in C"
alternateEn: "/posts/c教程/en-US/08-Debugging Testing Profiling/074-Unit Testing in C"
---

[English version](/posts/c教程/en-US/08-Debugging Testing Profiling/074-Unit Testing in C)

测试不仅仅是你最后要做的事情，它是你对每一行代码建立信心的方式。单元测试意味着自动检查小的、孤立的部分（函数、模块），这样您就可以毫无恐惧地更改代码。

C 没有内置的测试框架，但构建轻量级框架很容易，如果您想要更强大的功能，可以使用几个优秀的库。

让我们逐步了解如何用纯 C 语言设计和运行单元测试。

#### 步骤 1. 什么是单元测试？

单元测试验证单个行为：

给定输入，该函数是否会产生正确的输出？

例如：

```
int add(int a, int b) { return a + b; }
void test_add(void) {
    if (add(2, 3) != 5) printf("test_add failed!\n");
    else printf("test_add passed!\n");
}
```

运行这个测试：

```
int main(void) {
    test_add();
}
```

输出：

```
test_add passed!
```

简单，但功能强大。

#### 步骤 2. 组织测试

将测试与生产代码分开。典型的布局：

```
src/
  math.c
  math.h
tests/
  test_math.c
Makefile
```

您的 Makefile 可能会同时构建：

```
all:
    gcc -g -Wall -I../src ../src/math.c test_math.c -o test_math
```

#### 步骤 3. 编写可重用的测试助手

定义宏以简化您的检查。

```
#include <stdio.h>
#define ASSERT_EQ_INT(expected, actual) \
    if ((expected) != (actual)) \
        printf("FAIL: %s:%d: expected %d, got %d\n", __FILE__, __LINE__, (expected), (actual)); \
    else \
        printf("PASS: %s:%d\n", __FILE__, __LINE__);
```

现在：

```
int add(int a, int b) { return a + b; }
void test_add(void) {
    ASSERT_EQ_INT(5, add(2, 3));
    ASSERT_EQ_INT(0, add(-1, 1));
}
int main(void) { test_add(); }
```

输出：

```
PASS: test_math.c:10
PASS: test_math.c:11
```

#### 步骤 4. 测试多个功能

添加更多测试函数并按顺序调用它们：

```
void test_subtract(void) { ASSERT_EQ_INT(1, 3 - 2); }
int main(void) {
    test_add();
    test_subtract();
}
```

现在您的程序会自动验证这两个函数。

#### 步骤 5. 处理浮点比较

浮点值很少完全匹配，请使用容差。

```
#include <math.h>
#define ASSERT_EQ_FLOAT(expected, actual, eps) \
    if (fabs((expected) - (actual)) > (eps)) \
        printf("FAIL: expected %.3f, got %.3f\n", (expected), (actual)); \
    else \
        printf("PASS\n");
```

#### 步骤 6. 使用返回代码来标记失败

您可以使测试二进制返回，而不是仅仅打印结果`EXIT_FAILURE`如果任何测试失败。

```
int fails = 0;
#define TEST(cond) \
    do { if (!(cond)) { \
        printf("FAIL: %s:%d: %s\n", __FILE__, __LINE__, #cond); \
        fails++; \
    } else { \
        printf("PASS: %s:%d\n", __FILE__, __LINE__); \
    } } while (0)
```

在最后：

```
return fails ? EXIT_FAILURE : EXIT_SUCCESS;
```

现在您的 CI 或 shell 可以通过以下方式检测测试结果`$?`.

#### 步骤 7. 最小测试框架：TinyTest

```
#include <stdio.h>
#include <stdlib.h>
int tests_run = 0, tests_failed = 0;
#define TEST(name) void name(void)
#define RUN(test) do { \
    printf("Running %s... ", #test); \
    test(); \
    tests_run++; \
    printf("OK\n"); \
} while(0)
#define ASSERT_TRUE(cond) if (!(cond)) { \
    printf("\n  Assertion failed: %s\n", #cond); \
    tests_failed++; \
    return; \
}
TEST(test_addition) {
    int sum = 2 + 3;
    ASSERT_TRUE(sum == 5);
}
int main(void) {
    RUN(test_addition);
    printf("\nTests run: %d, failed: %d\n", tests_run, tests_failed);
    return tests_failed ? EXIT_FAILURE : EXIT_SUCCESS;
}
```

输出：

```
运行 test_addition...好的

测试运行：1，失败：0
```

#### 步骤 8. 使用真实测试库

当您的项目不断增长时，您可以使用以下框架：

- 检查（符合 POSIX）
- Unity（嵌入式友好）
- CMocka
- 标准

带支票的示例：

```
sudo apt install check
```

```
#include <check.h>
START_TEST(test_add)
{
    ck_assert_int_eq(2 + 3, 5);
}
END_TEST
```

然后编译：

```
gcc test.c -lcheck -o test
```

#### 步骤 9. 使用 Makefile 自动测试

添加测试目标：

```
test:
    gcc -Wall -g src/*.c tests/*.c -o tests/run_tests
    ./tests/run_tests
```

现在你可以运行：

```
make test
```

并查看全套套件的结果。

#### 步骤 10. 小代码：测试链表

```
#include <stdio.h>
#include <stdlib.h>
#include <assert.h>
typedef struct Node {
    int value;
    struct Node *next;
} Node;
Node *push(Node *head, int val) {
    Node *n = malloc(sizeof(Node));
    n->value = val;
    n->next = head;
    return n;
}
void test_push(void) {
    Node *head = NULL;
    head = push(head, 10);
    head = push(head, 20);
    assert(head->value == 20);
    assert(head->next->value == 10);
    printf("test_push passed\n");
}
int main(void) {
    test_push();
    printf("All tests passed.\n");
}
```

输出：

```
test_push passed
All tests passed.
```

#### 为什么它很重要

单元测试将代码转化为可验证的逻辑：

- 防止回归。
- 鼓励小型、干净的功能。
- 使调试速度更快。
- 在重构之前建立信心。

当您信任自己的测试时，您就可以无所畏惧地重写代码。

#### 自己尝试一下

1. 为动态数组实现编写一个测试套件。
2. 添加`ASSERT_EQ_FLOAT`和`ASSERT_EQ_STR`宏。
3. 使用自动化测试`make test`.
4. 添加一个`fails`计数器并为您的结果着色。
5. 使用 Criterion 或 Unity 等测试库并比较样式。

接下来，您将学习如何将日志记录系统添加到 C 程序中，以受控、可读的方式记录幕后发生的情况。
