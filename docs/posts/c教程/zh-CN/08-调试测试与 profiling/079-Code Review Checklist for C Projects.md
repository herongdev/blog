---
title: "79. C 项目的代码审查清单"
date: "2026-07-04"
lang: "zh-CN"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "08-调试测试与 profiling"
  - "中文"
description: "The Little Book of C 中文版 — 79. C 项目的代码审查清单"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
translator: "机器辅助翻译（Google Translate）"
section: 79
sidebarWeight: 79
alternateZh: "/posts/c教程/zh-CN/08-调试测试与 profiling/079-Code Review Checklist for C Projects"
alternateEn: "/posts/c教程/en-US/08-Debugging Testing Profiling/079-Code Review Checklist for C Projects"
---

[English version](/posts/c教程/en-US/08-Debugging Testing Profiling/079-Code Review Checklist for C Projects)

在你的 C 程序投入生产（甚至是你提交的作业）之前，它应该通过最后一次测试，即代码审查。您或您的团队成员在这里查看代码不仅是为了正确性，也是为了清晰度、安全性和可维护性。

将此视为起飞前您的个人飞行员清单。每个伟大的 C 程序员都有一个。

#### 步骤 1. 可读性和结构

- 文件是否按逻辑组织（`src/`,`include/`,`tests/`)?
- 标题是否干净，是否有包含防护？
- 职能是否简短且重点突出（每个职能都有一个目的）？
- 名字有意义吗（`count_users()`比`doit()`)?
- 缩进是否一致且可读？
- 评论是否清晰且相关，而不仅仅是噪音？

小代码示例：

```
// Bad
void d(int a, int b) { printf("%d\n", a+b); }
// Good
void print_sum(int a, int b) {
    printf("%d\n", a + b);
}
```

可读的代码会自我解释。

#### 步骤 2. 割台卫生

- 每个`.h`文件必须有一个包含保护：

```
#ifndef MATH_UTILS_H
#define MATH_UTILS_H
// declarations
#endif
```

- 标题应该声明，而不是定义。
- 除非合理，否则没有全局变量。
- 使用`static inline`小心（仅适用于小型公用事业）。

#### 步骤 3. 内存安全

- 每一个`malloc`一定有对应的`free`.
- 检查所有分配结果：

```
p = malloc(size);
if (!p) { perror("malloc"); exit(1); }
```

- 避免悬空指针：

```
free(p);
p = NULL;
```

- 使用 Valgrind 或 AddressSanitizer 确保无泄漏。

#### 步骤 4. 指针规则

- 在取消引用之前检查空指针。
- 不要返回指向局部变量的指针：

```
int* bad(void) {
    int x = 10;
    return &x; // wrong: stack memory
}
```

- 文件所有权：谁分配，谁释放。

#### 步骤 5. 错误处理

- 始终检查函数返回值：

```
if (fwrite(buf, 1, len, file) != len) {
    perror("fwrite");
}
```

- 使用有意义的错误消息。
- 更喜欢返回错误代码而不是默默地忽略失败。
- 对于图书馆，请使用`errno`或您自己的错误枚举。

#### 步骤 6. 未定义行为预防

- 没有未初始化的变量。
- 没有越界数组访问。
- 无符号整数溢出。
- 免费后不使用。
- 编译：

```
gcc -Wall -Wextra -Wpedantic -fsanitize=undefined,address
```

修复所有警告，将其视为错误。

#### 步骤 7. 可移植性

- 不要假设`int`是 32 位或`char`已签署。
- 使用`<stdint.h>`类型（`int32_t`,`uint64_t`).
- 使用`size_t`用于尺寸和索引。
- 除非包装，否则避免使用特定于平台的 API。
- 在多个编译器上进行测试（`gcc`,`clang`,`tinycc`).

#### 步骤 8. 测试和验证

- 每个可能失败的功能都必须至少进行一次测试。
- 边缘情况：空输入、零值、大输入。
- 测试应该自动运行：

```
make test
```

- 将结果与已知良好的输出进行比较。
- 记录如何重现测试结果。

#### 步骤 9. 文档

- 为每个文件添加一个短标题：

```
/* math_utils.c
 * Simple math helpers.
 * Author: Your Name
 * License: MIT
 */
```

- 注释棘手的代码，但不要注释显而易见的代码。
- 维持一个`README.md`解释构建和运行步骤。
- 对您的代码进行版本控制 (Git)。编写有意义的提交消息。

#### 步骤 10. 小代码：应用清单

让我们看一个小例子：

原来的：

```
int *make_array(int n){
  int arr[n]; for(int i=0;i<n;i++) arr[i]=i; return arr;
}
```

复习笔记：

- 返回指向本地数组的指针 → UB
- 魔法循环风格→不可读
- 缺少输入验证

固定的：

```
#include <stdlib.h>
#include <stdio.h>
int *make_array(int n) {
    if (n <= 0) return NULL;
    int *arr = malloc(n * sizeof(int));
    if (!arr) { perror("malloc"); return NULL; }
    for (int i = 0; i < n; i++) arr[i] = i;
    return arr;
}
```

通过清单 ✅

- 安全、清晰、便携。

#### 为什么它很重要

检查表可以建立纪律和一致性。它确保：

- 干净、可维护的代码。
- 减少碰撞和泄漏。
- 更轻松的调试和入门。
- 复杂系统的长期稳定性。

每个高质量的 C 项目都使用一个，从开源库到内核。

#### 自己尝试一下

1. 选取一个旧的 C 程序并使用此清单进行检查。
2.修复内存泄漏，添加错误检查，清理命名。
3. 在打开所有警告的情况下进行编译。
4.通过AddressSanitizer或Valgrind运行它。
5. 记录所有内容，然后对下一个项目重复此操作。

接下来，您将通过实践练习来结束本调试章节：逐步修复实际内存和逻辑错误。
