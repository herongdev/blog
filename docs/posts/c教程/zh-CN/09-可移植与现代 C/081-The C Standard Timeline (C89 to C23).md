---
title: "81. C 标准时间线（C89 到 C23）"
date: "2026-07-04"
lang: "zh-CN"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "09-可移植与现代 C"
  - "中文"
description: "The Little Book of C 中文版 — 81. C 标准时间线（C89 到 C23）"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
translator: "机器辅助翻译（Google Translate）"
section: 81
sidebarWeight: 81
alternateZh: "/posts/c教程/zh-CN/09-可移植与现代 C/081-The C Standard Timeline (C89 to C23)"
alternateEn: "/posts/c教程/en-US/09-Portable and Modern C/081-The C Standard Timeline (C89 to C23)"
---

[English version](/posts/c教程/en-US/09-Portable and Modern C/081-The C Standard Timeline (C89 to C23))

C 语言已经存在了五十多年了，它的发展是缓慢而谨慎的。 C 标准的每个版本都改进了语言，同时保持与数十年现有代码的向后兼容性。

了解 C 标准的时间表有助于您编写可移植的现代代码，并了解哪些功能可以在目标环境中安全使用。

#### 步骤 1. 开始，K&R C (1972–1989)

C 诞生于 20 世纪 70 年代初的贝尔实验室，由 Dennis Ritchie 开发，作为 Unix 的系统编程语言。第一本书《C 编程语言》（Kernighan 和 Ritchie，1978 年）非正式地定义了“K&R C”。

主要特征：

- 尚未标准化。
- 隐式函数声明。
- 不`void`不带返回值的函数的类型。
- 无函数原型（未对参数进行类型检查）。
- 头文件是可选的。

例子：

```
main() {
    printf("Hello, world\n");
}
```

虽然简单、直接、危险，但确实有效。

#### 步骤 2. ANSI C (C89 / C90)

1989 年，C 被 ANSI 标准化（1990 年被 ISO 标准化）。这个版本 C89/C90 统一了编译器行为，并使 C 可以跨系统移植。

主要特点：

- 函数原型（`int add(int, int);`)
- 标准标头（`<stdio.h>`,`<stdlib.h>`,`<string.h>`)
-`void`关键词
- 类型限定符：`const`,`volatile`
- 新的库函数（`memcpy`,`qsort`,`assert`)
- 正式化标准库
- 仍然不支持单行注释（使用`/* */`)

小代码：

```
#include <stdio.h>
int add(int a, int b) { return a + b; }
int main(void) {
    printf("%d\n", add(2, 3));
}
```

#### 步骤 3.C95（ISO 修订版）

改进 C90 的一个小更新，很少被提及，但仍然很重要。

额外：

- 宽字符支持（`<wchar.h>`)
- 多字节字符串
- 更多国际化实用程序
- 像这样的宏`__STDC_VERSION__`

它为以后版本中的 Unicode 支持铺平了道路。

#### 步骤 4. C99，现代化开始

C99（1999 年发布）是自诞生以来最大的更新。

主要改进：

-`//`单行注释
- 任何地方的变量声明
- 内联函数
-`long long`（64 位整数）
-`stdbool.h`为了`bool`,`true`,`false`
-`stdint.h`对于固定宽度整数 (`int32_t`,`uint64_t`)
- 指定的初始值设定项和复合文字
- 灵活的数组成员
-`snprintf`更安全的字符串格式
- 可变长度数组（VLA）

小代码：

```
#include <stdbool.h>
#include <stdint.h>
#include <stdio.h>
int main(void) {
    bool done = false;
    uint64_t sum = 0;
    for (int i = 0; i < 5; i++)
        sum += i;
    printf("%llu\n", (unsigned long long)sum);
    return done;
}
```

C99 引入了更安全、更具表现力的语法，让 C 感觉很现代。

#### 步骤 5.C11，并发性和安全性

C11 于 2011 年发布，添加了更好的线程和安全机制。

关键补充：

-`_Thread_local`存储说明符
-`<threads.h>`用于可移植线程、互斥体、条件变量
-`_Atomic`对于原子操作
-`_Static_assert`用于编译时检查
- 边界检查函数（`strcpy_s`,`memcpy_s`)
- 可选附件 K 更安全的标准库函数
- 改进了 Unicode 和宽字符支持

小代码：

```
#include <threads.h>
#include <stdio.h>
int run(void *arg) {
    printf("Hello from thread %d\n", *(int *)arg);
    return 0;
}
int main(void) {
    int id = 1;
    thrd_t t;
    thrd_create(&t, run, &id);
    thrd_join(t, NULL);
}
```

C11 使 C 更安全并且具有并发意识，尽管并非所有编译器都实现了`<threads.h>`完全。

#### 步骤 6. C17（又名 C18），改进

C17 正式通过 ISO/IEC 9899:2018（2018 年发布），修复了 C11 中的不一致和错误，但没有添加新功能。

亮点：

- 对原子、宏和 UB 规则的澄清。
- 改进了与 C++ 编译器的兼容性。
- 标准库中的错误修复。
-`__STDC_VERSION__`是`201710L`.

它是现代 C 代码库的默认“稳定”标准。

#### 步骤 7. C23，最新标准

C23 是最新的（于 2024 年发布），在不破坏向后兼容性的情况下继续现代化。

主要特点：

-`typeof`（就像在海湾合作委员会）
-`nullptr`关键词
-`static_assert`（别名为`_Static_assert`)
- UTF-8 字符串文字：`u8"Hello"`
- 新的标准属性（`[[maybe_unused]]`,`[[nodiscard]]`)
-`constexpr`类似特征（`constexpr`功能已规划）
- 更好的 Unicode 和格式化 API
- 更安全的库扩展
- 改进了与 C++ 的互操作性

小代码：

```
#include <stdio.h>
int main(void) {
    int x = 10;
    [[maybe_unused]] int y = 20;
    static_assert(sizeof(int) == 4, "Expected 4-byte int");
    printf("%d\n", x);
}
```

C23 使 C 更接近现代 C++ 和 Rust 风格的安全性，同时保持简单和轻量级。

#### 步骤 8. 检查编译器的版本

您可以使用以下命令检查编译器支持的 C 标准：

```
gcc -dM -E - < /dev/null | grep __STDC_VERSION__
```

常见输出：

```
199901L  → C99  
201112L  → C11  
201710L  → C17  
202311L  → C23
```

或者编译：

```
gcc -std=c99 program.c
gcc -std=c11 program.c
gcc -std=c23 program.c
```

#### 步骤 9. 兼容性和可移植性提示

- 始终明确声明标准：`-std=c11`或者`-std=c17`.
- 避免特定于编译器的扩展，除非用`#ifdef __GNUC__`.
- 使用标准标题，例如`<stdint.h>`和`<stdbool.h>`.
- 编写库时，优先选择支持您的需求的最低标准。
- 添加`_Static_assert`或者`#error`对于不受支持的标准。

#### 步骤 10. 小代码：版本检测器

```
#include <stdio.h>
int main(void) {
#if __STDC_VERSION__ >= 202311L
    printf("C23 or newer\n");
#elif __STDC_VERSION__ >= 201710L
    printf("C17\n");
#elif __STDC_VERSION__ >= 201112L
    printf("C11\n");
#elif __STDC_VERSION__ >= 199901L
    printf("C99\n");
#else
    printf("C90 or earlier\n");
#endif
}
```

编译并运行以查看您的编译器支持什么。

#### 为什么它很重要

C 的演变显示了其独特的哲学：缓慢变化，但绝不破坏旧代码。了解您的目标标准意味着您可以自信地使用现代功能，而不会失去可移植性。

#### 自己尝试一下

1. 编写上面的版本检测程序并运行它`-std=c99`,`-std=c11`， 和`-std=c23`.
2. 尝试`_Static_assert`和`_Thread_local`，查看哪些标准支持它们。
3. 尝试使用以下命令编译一个小线程示例`<threads.h>`.
4. 查看编译器的文档，了解实现了哪些 C23 功能。
5. 选择一项功能（例如`[[nodiscard]]`）并在一个小项目中使用它。

接下来，您将探索可移植性和字节顺序，这些不可见的细节决定了 C 程序在不同机器和体系结构上的行为方式。
