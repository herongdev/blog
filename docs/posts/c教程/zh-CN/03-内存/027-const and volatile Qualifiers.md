---
title: "27. const 和 volatile 限定符"
date: "2026-07-04"
lang: "zh-CN"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "03-内存"
  - "中文"
description: "The Little Book of C 中文版 — 27. const 和 volatile 限定符"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
translator: "机器辅助翻译（Google Translate）"
section: 27
sidebarWeight: 27
alternateZh: "/posts/c教程/zh-CN/03-内存/027-const and volatile Qualifiers"
alternateEn: "/posts/c教程/en-US/03-Working with Memory/027-const and volatile Qualifiers"
---

[English version](/posts/c教程/en-US/03-Working with Memory/027-const and volatile Qualifiers)

C 使您可以通过类型限定符对变量的使用方式进行细粒度控制。其中最重要的两个是`const`和`volatile`。它们看起来很简单，但在编写安全、可预测和高效的代码方面发挥着至关重要的作用，特别是在系统编程、嵌入式系统和多线程环境中。

#### const 限定符

`const`表示只读：变量一旦初始化，就无法修改。

```
const int x = 10;
x = 20; // ❌ error: assignment of read-only variable
```

这是对编译器和其他程序员的承诺，该值不会改变。

`const`可以应用到很多事情上：

- 变量
- 功能参数
- 指针
- 返回类型

#### const 与指针

`const`使用指针可能很棘手，但遵循一致的规则。的位置`const`决定了什么是不能改变的。

|声明|意义|
| --- | --- |
|`const int *p;`|指向常量数据的指针，数据不能改变 |
|`int *const p;`|常量指针，指针不能改变，数据可以 |
|`const int *const p;`|指针和数据都是常量 |

例子：

```
int value = 42;
const int *p1 = &value;   // cannot modify *p1
int *const p2 = &value;   // cannot reassign p2
const int *const p3 = &value; // cannot change *p3 or p3
```

#### 函数参数中的 const

将参数标记为`const`有助于防止意外修改并启用编译器优化。

```
void print_message(const char *msg) {
    printf("%s\n", msg);
}
```

这里，`msg`是只读的；该函数无法修改它指向的字符串。

#### 小代码

这是一个程序演示`const`行动中：

```
#include <stdio.h>
void show(const int *ptr) {
    // *ptr = 10; // ❌ not allowed
    printf("Value: %d\n", *ptr);
}
int main(void) {
    int num = 5;
    const int *p = #
    int *const q = #
    printf("num = %d\n", num);
    // *p = 10; // ❌ cannot modify value through const pointer
    *q = 15;   // ✅ data modifiable through q
    printf("num after q change = %d\n", num);
    show(&num); // function accepts const pointer
    return 0;
}
```

编译并运行：

```
gcc const_demo.c -o const_demo
./const_demo
```

输出：

```
num = 5
num after q change = 15
Value: 15
```

#### 不稳定的限定符

`volatile`告诉编译器变量可以随时更改，即使您的代码没有修改它。它阻止编译器优化读取或写入。

使用`volatile`什么时候：

- 变量可以由硬件（例如，内存映射 I/O 寄存器）更改。
- 变量可以被另一个线程或信号处理程序修改。
- 您需要每次强制读取实际内存，而不是缓存值。

例子：

```
volatile int sensor_value;
while (sensor_value < 100) {
    // without volatile, compiler might optimize this loop away
}
```

这里，`sensor_value`可能由硬件更新；`volatile`确保每次检查都会重新读取内存，而不是重用缓存的寄存器值。

#### 结合常量和易失性

是的，您可以一起使用两者，一个值可能会意外更改，但您的代码无法修改它。

例子：

```
const volatile int status_register = 0x1234;
```

这在嵌入式系统中很常见，其中硬件寄存器的位可能会因外部事件而改变。

#### 为什么它很重要

-`const`提高安全性和清晰度：使接口自我记录并帮助编译器发现错误。
-`volatile`保持并发或硬件驱动系统的正确性。
- 它们共同帮助您平衡优化与精度，这在低级 C 编程中至关重要。

如果您误用或忘记它们：

- 您面临数据意外修改的风险（`const`).
- 编译器可能会删除关键读/写（`volatile`).

#### 自己尝试一下

编写一个程序尝试修改`const int`通过指针，观察编译器错误。

将变量声明为`volatile int counter`并在循环中递增它。

- 然后删除`volatile`并检查生成的程序集`gcc -S`.

创建一个函数`const char *msg`并尝试修改它，看看为什么它被禁止。

进行实验`const int *p`与`int *const p`了解他们的区别。

结合两者：`const volatile int flag;`并循环打印它。

在C中，`const`和`volatile`不仅仅是关键字，它们是合同。它们准确地告诉编译器如何使用内存，这有助于人类和机器安全地推理您的代码。
