---
title: "29. 深拷贝与浅拷贝"
date: "2026-07-04"
lang: "zh-CN"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "03-内存"
  - "中文"
description: "The Little Book of C 中文版 — 29. 深拷贝与浅拷贝"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
translator: "机器辅助翻译（Google Translate）"
section: 29
sidebarWeight: 29
alternateZh: "/posts/c教程/zh-CN/03-内存/029-Deep vs Shallow Copies"
alternateEn: "/posts/c教程/en-US/03-Working with Memory/029-Deep vs Shallow Copies"
---

[English version](/posts/c教程/en-US/03-Working with Memory/029-Deep vs Shallow Copies)

当您在 C 中将一个变量分配给另一个变量时，您通常会复制地址，而不是实际数据。在使用指针、数组和动态分配的结构时，浅拷贝和深拷贝之间的区别变得至关重要。了解它可以帮助您防止内存损坏、双重释放和神秘的错误。

#### 核心理念

- 浅拷贝仅复制指针，两个变量引用同一内存。
- 深拷贝复制数据本身，每个变量拥有自己独立的内存。

#### 简单的比喻

将浅复制与深复制想象成两栋房子：

- 浅拷贝：你把你家的钥匙交给某人。你们都打开同一扇门。
- 深度复制：你建造一座看起来相同但又独立的新房子。

#### 浅拷贝示例

```
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
int main(void) {
    char *original = malloc(10);
    strcpy(original, "Hello");
    // Shallow copy
    char *copy = original;
    printf("Before change: %s | %s\n", original, copy);
    copy[0] = 'J'; // modify one
    printf("After change: %s | %s\n", original, copy);
    free(original);
    // free(copy); // ❌ would cause double free error!
    return 0;
}
```

输出：

```
Before change: Hello | Hello
After change: Jello | Jello
```

解释：

-`copy`指向相同的内存`original`.
- 改变其中之一会改变两者。
- 你必须只`free()`一次，释放两者都是一个错误。

#### 深拷贝示例

深复制分配新内存并复制数据。

```
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
int main(void) {
    char *original = malloc(10);
    strcpy(original, "Hello");
    // Deep copy
    char *copy = malloc(strlen(original) + 1);
    strcpy(copy, original);
    printf("Before change: %s | %s\n", original, copy);
    copy[0] = 'J';
    printf("After change: %s | %s\n", original, copy);
    free(original);
    free(copy); // ✅ both safely freed
    return 0;
}
```

输出：

```
Before change: Hello | Hello
After change: Hello | Jello
```

现在两个字符串完全独立，是真正的深拷贝。

#### 结构中的浅层与深层

考虑这个结构：

```
typedef struct {
    char *name;
} Person;
```

如果您指定一个`Person`到另一个：

```
Person a, b;
a.name = malloc(20);
strcpy(a.name, "Alice");
b = a; // shallow copy
b.name[0] = 'M'; // modifies a.name too!
```

两个都`a`和`b`指向同一个内存。要进行深层复制：

```
b.name = malloc(strlen(a.name) + 1);
strcpy(b.name, a.name);
```

现在他们独立了。

#### 小代码

这是一个完整的程序，演示了两个带有结构的副本：

```
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
typedef struct {
    char *name;
    int age;
} Person;
void print_person(const char *label, Person p) {
    printf("%s: name=%s age=%d\n", label, p.name, p.age);
}
int main(void) {
    Person p1;
    p1.name = malloc(20);
    strcpy(p1.name, "Alice");
    p1.age = 25;
    // Shallow copy
    Person p2 = p1;
    print_person("Before", p1);
    p2.name[0] = 'M'; // modifies same memory
    print_person("After shallow copy", p1);
    // Deep copy
    Person p3;
    p3.name = malloc(strlen(p1.name) + 1);
    strcpy(p3.name, p1.name);
    p3.age = p1.age;
    p3.name[0] = 'C'; // independent copy
    print_person("After deep copy", p1);
    print_person("Deep copy result", p3);
    free(p1.name);
    free(p3.name); // ✅ safe
    return 0;
}
```

输出：

```
Before: name=Alice age=25
After shallow copy: name=Mlice age=25
After deep copy: name=Mlice age=25
Deep copy result: name=Clice age=25
```

#### 为什么它很重要

浅拷贝和深拷贝决定内存的所有权：

- 如果两个变量共享同一指针（浅），则释放一个变量会使另一个变量无效。
- 深度复制隔离数据，防止干扰，但使用更多内存。

犯这个错误会导致：

- 双自由或悬垂指针错误
- 内存泄漏
- 复杂结构中的数据损坏

理解这些概念对于以下方面至关重要：

- 管理动态数组和链表
- 设计安全返回或复制数据的 API
- 为结构编写自定义复制构造函数

#### 自己尝试一下

1. 创建一个具有动态分配字段的结构体（例如，`name`,`address`）并编写两个复制函数：`copy_shallow()`和`copy_deep()`.
2. 修改一份并观察差异。
3. 打电话`free()`以错误的顺序并记下会发生什么。
4. 使用 Valgrind 验证深拷贝是否已正确释放。
5. 将概念扩展到结构体数组，为每个元素实现深复制。

当您了解深拷贝与浅拷贝时，您就可以控制内存所有权在程序中的移动方式，这是安全、模块化和无泄漏 C 设计的基础。
