---
title: "32. 联合和类型重用"
date: "2026-07-04"
lang: "zh-CN"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "04-数据结构"
  - "中文"
description: "The Little Book of C 中文版 — 32. 联合和类型重用"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
translator: "机器辅助翻译（Google Translate）"
section: 32
sidebarWeight: 32
alternateZh: "/posts/c教程/zh-CN/04-数据结构/032-Unions and Type Reuse"
alternateEn: "/posts/c教程/en-US/04-Structuring Data/032-Unions and Type Reuse"
---

[English version](/posts/c教程/en-US/04-Structuring Data/032-Unions and Type Reuse)

有时您需要一个可以在不同时间保存不同类型数据的变量，但您不想浪费内存让所有数据同时保持活动状态。这就是工会发挥作用的地方。

一个`union`让多个字段共享相同的内存位置。它是一个节省空间的功能，也是实现类型灵活性、变体数据甚至低级二进制操作的强大工具。

#### 什么是联盟？

联合就像一个结构，但不是为每个成员提供自己的内存，而是所有成员共享相同的内存块。任何时刻只有一个字段有效。

句法：

```
union Data {
    int i;
    float f;
    char c;
};
```

这里，`i`,`f`， 和`c`共享相同的存储。联合的大小等于其最大成员的大小。

#### 使用联盟

```
#include <stdio.h>
union Data {
    int i;
    float f;
    char c;
};
int main(void) {
    union Data d;
    d.i = 42;
    printf("d.i = %d\n", d.i);
    d.f = 3.14f;
    printf("d.f = %.2f\n", d.f);
    d.c = 'A';
    printf("d.c = %c\n", d.c);
    // The last assignment overwrites the previous ones
    printf("After d.c = 'A', d.i = %d (corrupted)\n", d.i);
    return 0;
}
```

输出：

```
d.i = 42
d.f = 3.14
d.c = A
After d.c = 'A', d.i = 1094795585
```

请注意对一个成员的写入如何影响其他成员，因为它们占用相同的内存。

#### 内存布局图

```
+------------------+
| Shared Memory    |  <- same location for all fields
| (size = largest) |
+------------------+
| i: 4 bytes       |
| f: 4 bytes       |
| c: 1 byte        |
+------------------+
```

所有字段在同一存储区域中重叠。

#### 小代码

让我们看一个联合节省内存的实际例子。

```
#include <stdio.h>
#include <string.h>
union Value {
    int i;
    float f;
    char str[20];
};
int main(void) {
    union Value v;
    v.i = 42;
    printf("As int: %d\n", v.i);
    v.f = 3.14f;
    printf("As float: %.2f\n", v.f);
    strcpy(v.str, "Hello");
    printf("As string: %s\n", v.str);
    printf("Union size: %zu bytes\n", sizeof(v));
    return 0;
}
```

输出：

```
As int: 42
As float: 3.14
As string: Hello
Union size: 20 bytes
```

尽管它包含一个`int`, 一个`float`，和一个`char[20]`，总大小只有20字节，是最大成员的大小。

#### 标记联合（类型安全模式）

在实践中，您经常使用标签（枚举或整数）来记住哪个成员是活动的，这称为标记联合或可区分联合。

```
#include <stdio.h>
#include <string.h>
enum Type { INT, FLOAT, STRING };
struct Variant {
    enum Type type;
    union {
        int i;
        float f;
        char str[20];
    } data;
};
void print_variant(const struct Variant *v) {
    switch (v->type) {
        case INT:   printf("INT: %d\n", v->data.i); break;
        case FLOAT: printf("FLOAT: %.2f\n", v->data.f); break;
        case STRING:printf("STRING: %s\n", v->data.str); break;
    }
}
int main(void) {
    struct Variant v;
    v.type = STRING;
    strcpy(v.data.str, "C Language");
    print_variant(&v);
    v.type = INT;
    v.data.i = 123;
    print_variant(&v);
    v.type = FLOAT;
    v.data.f = 9.81f;
    print_variant(&v);
    return 0;
}
```

输出：

```
STRING: C Language
INT: 123
FLOAT: 9.81
```

这就是如何将联合的灵活性与了解当前有效字段的安全性结合起来。

#### 为什么它很重要

工会对于以下方面至关重要：

- 节省内存，一次仅存在一个字段。
- 实现变体数据类型，例如 JSON 值、表达式树、网络数据包。
- 使用硬件寄存器，将一个寄存器映射到多种视图类型。
- 二进制序列化，将原始字节重新解释为各种数据形式。

在低级系统中，它们实现了 C 语言闻名的紧凑而灵活的表示。

#### 自己尝试一下

写一个联盟`Number`和`int`,`float`， 和`double`.

- 打印它的大小并观察哪个成员决定它。

实施标记联合`Message`类型为 TEXT、BINARY 和 COMMAND。

创建一个带有枚举标记和联合的结构体，模拟如何解析文件格式（如 PNG 块）。

编写一个使用标签打印活动联合字段的函数。

修改前面的示例以存储标记联合的数组。

在 C 中，联合为您提供了很少有语言允许的内存控制和灵活性。它们是高级结构的基础，如变体类型、多态结构，甚至消息协议，从 Linux 内核到嵌入式固件，无处不在。
