---
title: "89. 现代风格：干净可读的 C"
date: "2026-07-04"
lang: "zh-CN"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "09-可移植与现代 C"
  - "中文"
description: "The Little Book of C 中文版 — 89. 现代风格：干净可读的 C"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
translator: "机器辅助翻译（Google Translate）"
section: "89"
sidebarWeight: "89"
alternateZh: "/posts/c教程/zh-CN/09-可移植与现代 C/089-Modern Style Clean and Readable C"
alternateEn: "/posts/c教程/en-US/09-Portable and Modern C/089-Modern Style Clean and Readable C"
---

[English version](/posts/c教程/en-US/09-Portable and Modern C/089-Modern Style Clean and Readable C)

C 语言已经存在了 50 多年，并且仍在不断发展。现代 C (C11–C23) 将低级编程的强大功能与更安全的语法、更简洁的习惯用法以及使代码更易于推理的新功能结合起来。

本节将帮助您编写现代、可读且可维护的 C，一种感觉永恒的 C。

#### 第一步：“清晰而非聪明”

现代 C 语言的黄金法则是：

为人类而不是编译器编写。

编译器可以处理复杂性，但你的队友（以及未来的你）却不能。

坏的：

```
for (i = n; i--; ) a[i] = 0;
```

好的：

```
for (int i = 0; i < n; i++)
    a[i] = 0;
```

可读性和简单性总是获胜。

#### 步骤 2. 首选显式初始化

始终初始化变量。未初始化的内存是错误的最大来源之一。

坏的：

```
int x;
printf("%d\n", x);
```

好的：

```
int x = 0;
printf("%d\n", x);
```

还显式初始化数组和结构：

```
int arr[10] = {0};
struct Point p = { .x = 10, .y = 20 };
```

#### 步骤 3. 充分使用 const

`const`传达意图，“这个值不应该改变。”

```
const double PI = 3.14159;
void print(const char* message);
```

这有助于编译器优化、防止意外修改并提高清晰度。

#### 步骤 4. 更喜欢现代标准标头

使用标准标头，例如`<stdint.h>`,`<stdbool.h>`， 和`<stddef.h>`以获得清晰、可移植的代码。

例子：

```
#include <stdint.h>
#include <stdbool.h>
bool is_even(uint32_t n) {
    return (n % 2) == 0;
}
```

避免使用旧式 typedef，例如`typedef unsigned long ulong;`除非它改善了意义。

#### 步骤 5. 使用 bool 而不是 int 进行逻辑

在旧的C中，人们使用`int`对于真/假。现代 C 为您提供`_Bool`通过`<stdbool.h>`:

```
#include <stdbool.h>
bool done = false;
if (!done) {
    done = true;
}
```

这提高了清晰度并使您的代码能够自我记录。

#### 第 6 步：编写小而集中的函数

保持功能简短，最好每个功能都有一个目的。

坏的：

```
void handle_all() { /* does 10 things */ }
```

好的：

```
void read_input(void);
void process_data(void);
void write_output(void);
```

这使得测试和调试变得更加容易。

#### 步骤 7. 避免一切宏

在早期的 C 语言中，宏被过度用于常量和函数。如今，更喜欢内联函数和`const`反而。

坏的：

```
#define SQUARE(x) ((x) * (x))
```

好的：

```
static inline int square(int x) { return x * x; }
```

内联函数是类型安全且易于调试的。

#### 步骤 8. 使用作用域变量和声明

从 C99 开始，您可以在靠近使用变量的位置声明变量：

```
for (int i = 0; i < n; i++) {
    printf("%d\n", i);
}
```

避免使变量的存活时间超过必要的时间，这可以减少错误并澄清范围。

#### 第 9 步：拥抱 C23 功能

C23 使语法现代化并使 C 更安全、更具表现力。

亮点：

-`typeof`，自动重用变量类型
-`nullptr`, 替换`NULL`
-`[[nodiscard]]`, 如果函数返回被忽略则发出警告
-`auto`、局部变量的类型推断
- UTF-8 字符支持和字符串文字
-`alignof`/`alignas`精确的内存布局

例子：

```
[[nodiscard]] int divide(int a, int b) {
    if (b == 0) return 0;
    return a / b;
}
```

#### 步骤 10. 小代码：现代 C23 示例

```
#include <stdio.h>
#include <stdbool.h>
#include <stdint.h>
[[nodiscard]] static inline uint32_t add(uint32_t a, uint32_t b) {
    return a + b;
}
int main(void) {
    const uint32_t x = 10, y = 20;
    uint32_t sum = add(x, y);
    bool valid = (sum > 0);
    if (valid)
        printf("Sum = %u\n", sum);
    return 0;
}
```

使用现代编译器（GCC 13+ 或 Clang 17+）进行编译：

```
gcc -std=c23 modern.c -o modern
```

输出：

```
Sum = 30
```

这段代码使用`[[nodiscard]]`,`bool`， 和`const`，提高风格和安全性的小细节。

#### 为什么它很重要

可读的 C 代码可持续数十年。内核、编译器和库中的最佳系统代码看起来很简单，因为它遵循清晰的模式：

- 小而纯的函数。
- 显式类型。
- 内存处理方面没有什么意外。

现代 C 并不意味着重写一切。意思是用心写C语言，清晰、正确、富有表现力。

#### 自己尝试一下

1. 重构你的一个旧程序来使用`<stdint.h>`和`<stdbool.h>`.
2. 用内联函数替换宏。
3.添加`const`只要有可能。
4. 尝试编译`-std=c23`并探索新的警告。
5. 尽可能使你的函数纯净且无副作用。

接下来，您将通过练习：可移植多线程程序 (90) 来结束这一旅程，这是一个结合了从内存管理到线程和可移植性的所有内容的实践项目。
