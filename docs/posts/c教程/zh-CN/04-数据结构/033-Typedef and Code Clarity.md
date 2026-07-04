---
title: "33. Typedef 和代码清晰度"
date: "2026-07-04"
lang: "zh-CN"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "04-数据结构"
  - "中文"
description: "The Little Book of C 中文版 — 33. Typedef 和代码清晰度"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
translator: "机器辅助翻译（Google Translate）"
section: 33
sidebarWeight: 33
alternateZh: "/posts/c教程/zh-CN/04-数据结构/033-Typedef and Code Clarity"
alternateEn: "/posts/c教程/en-US/04-Structuring Data/033-Typedef and Code Clarity"
---

[English version](/posts/c教程/en-US/04-Structuring Data/033-Typedef and Code Clarity)

C 使您能够使用以下命令创建自己的类型名称`typedef`关键词。它不会在运行时创建新类型，而是创建别名，使您的代码更清晰、更具表现力且更易于维护。

如果`struct`,`enum`，或者指针语法感觉很混乱，`typedef`是你最好的朋友。

#### 什么是 typedef？

`typedef`给现有类型一个新名称。它就像一个复杂或经常使用的声明的昵称。

句法：

```
typedef existing_type new_name;
```

例子：

```
typedef unsigned long ulong;
```

现在`ulong`可以在您通常编写的任何地方使用`unsigned long`.

#### 基本示例

```
#include <stdio.h>
typedef int Score;
typedef char Letter;
int main(void) {
    Score math = 95;
    Letter grade = 'A';
    printf("Math: %d, Grade: %c\n", math, grade);
    return 0;
}
```

输出：

```
Math: 95, Grade: A
```

它不会改变编译器处理变量的方式，只是使代码更具可读性。

#### 带指针的 Typedef

指针声明可能会变得混乱。和`typedef`，你可以简化它们。

```
typedef int* IntPtr;
int main(void) {
    int x = 10;
    IntPtr p = &x; // same as int *p = &x;
    printf("Value: %d\n", *p);
    return 0;
}
```

输出：

```
Value: 10
```

提示：要小心，`IntPtr a, b;`意味着两者`a`和`b`是指针，与普通的不同`int *a, b;`.

#### 带有结构的 Typedef

`typedef`闪耀着`struct`,`union`， 和`enum`声明。没有类型定义：

```
struct Point {
    int x;
    int y;
};
struct Point p1 = {3, 4};
```

使用 typedef：

```
typedef struct {
    int x;
    int y;
} Point;
Point p1 = {3, 4};
```

不再需要重复这个词`struct`到处。

#### 结合结构和 Typedef

您可以在一行中定义一个结构体并为其添加别名：

```
typedef struct Person {
    char name[50];
    int age;
} Person;
```

现在你可以写：

```
Person p = {"Alice", 25};
```

而不是：

```
struct Person p = {"Alice", 25};
```

#### 带有函数指针的 Typedef

函数指针语法可能难以阅读，typedef 极大地简化了它。

没有类型定义：

```
int (*operation)(int, int);
```

使用 typedef：

```
typedef int (*Operation)(int, int);
int add(int a, int b) { return a + b; }
int main(void) {
    Operation op = add;
    printf("%d\n", op(2, 3));
}
```

现在`Operation`是一个指向函数的指针的干净别名，该函数接受两个 int 并返回一个 int。

#### 小代码

下面是一个完整的示例，显示了结构体、指针和函数类型的 typedef：

```
#include <stdio.h>
#include <string.h>
typedef struct {
    char name[50];
    int age;
} Person;
typedef Person* PersonPtr;
typedef void (*Printer)(const Person*);
void print_person(const Person *p) {
    printf("%s (%d years old)\n", p->name, p->age);
}
int main(void) {
    Person p = {"Alice", 25};
    PersonPtr ptr = &p;
    Printer print = print_person;
    print(ptr);
    return 0;
}
```

输出：

```
Alice (25 years old)
```

#### 为什么它很重要

`typedef`改进：

- 清晰度：长或复杂的声明变得可读。
- 一致性：标准化命名（例如，`size_t`,`uint32_t`).
- 可维护性：更改底层类型更容易，一次 typedef 更改会更新所有用途。
- 抽象：隐藏实现细节，尤其是在标头中。

它在大型项目和系统 API 中特别有用，其中命名约定定义了清晰的边界。

#### 常见的 Typedef 模式

|目的|示例|
| --- | --- |
|标准别名 |`typedef unsigned int uint;`|
|结构抽象 |`typedef struct Node Node;`|
|函数指针类型 |`typedef void (*Handler)(int signal);`|
|手柄状图案|`typedef struct File* FileHandle;`|
|平台类型|`typedef long long int64; typedef unsigned int uint32;`|

#### 自己尝试一下

1. 定义一个`typedef`为了`unsigned long long`被称为`u64`.
2. 创建一个`typedef struct`被称为`Book`包含标题和页面字段。
3. 定义一个`typedef`对于函数指针`Comparator(int, int)`.
4. 编写一个程序，通过`Comparator`到排序功能。
5. 修改一个 typedef 并观察代码如何在无需进一步编辑的情况下干净地编译。

`typedef`可能看起来很简单，但它是 C 语言中最强大的可读性工具之一。它可以让您为您的系统设计自己的词汇表，这是朝着编写可扩展的干净、自记录代码迈出的一小步。
