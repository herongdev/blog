---
title: "31. 结构和嵌套结构"
date: "2026-07-04"
lang: "zh-CN"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "04-数据结构"
  - "中文"
description: "The Little Book of C 中文版 — 31. 结构和嵌套结构"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
translator: "机器辅助翻译（Google Translate）"
section: 31
sidebarWeight: 31
alternateZh: "/posts/c教程/zh-CN/04-数据结构/031-Structures and Nested Structures"
alternateEn: "/posts/c教程/en-US/04-Structuring Data/031-Structures and Nested Structures"
---

[English version](/posts/c教程/en-US/04-Structuring Data/031-Structures and Nested Structures)

现实世界的程序通常处理相关数据组，而不仅仅是单个变量。例如，一个人有姓名、年龄和地址。您可以使用以下命令将它们组合成一个结构，而不是处理单独的变量`struct`.

`struct`是 C 中最强大的功能之一，它允许您定义自己的数据类型，对信息进行逻辑有效的分组。

#### 什么是结构？

结构是一种用户定义的类型，它在一个名称下保存不同类型的变量。

```
struct Person {
    char name[50];
    int age;
    float height;
};
```

这声明了一个模板`Person`目的。它还没有创建实际数据，只是创建蓝图。

#### 声明和使用结构

您现在可以创建这种新类型的变量：

```
#include <stdio.h>
struct Person {
    char name[50];
    int age;
    float height;
};
int main(void) {
    struct Person p1 = {"Alice", 25, 1.65f};
    printf("Name: %s\n", p1.name);
    printf("Age: %d\n", p1.age);
    printf("Height: %.2f m\n", p1.height);
    return 0;
}
```

输出：

```
Name: Alice
Age: 25
Height: 1.65 m
```

#### 访问会员

使用点运算符`.`访问结构体变量的字段：

```
p1.age = 26;
printf("Updated age: %d\n", p1.age);
```

如果您有指向结构的指针，请使用箭头运算符`->`:

```
struct Person *ptr = &p1;
printf("Pointer access: %s is %d years old.\n", ptr->name, ptr->age);
```

输出：

```
Pointer access: Alice is 26 years old.
```

#### 初始化和复制结构

您可以直接初始化结构体：

```
struct Person p2 = {.name = "Bob", .age = 30, .height = 1.75f};
```

结构体可以按值赋值和复制：

```
struct Person copy = p2;
printf("Copy: %s (%d)\n", copy.name, copy.age);
```

这执行浅复制，所有字段都被复制，但如果有任何包含指针，它们仍然会引用相同的内存（稍后您将学习如何进行深复制）。

#### 嵌套结构

结构可以包含其他结构。这可以帮助您清晰地组织复杂的数据。

例子：

```
#include <stdio.h>
struct Date {
    int day;
    int month;
    int year;
};
struct Student {
    char name[50];
    int id;
    struct Date birthdate; // nested structure
};
int main(void) {
    struct Student s = {
        .name = "Carol",
        .id = 1234,
        .birthdate = {15, 8, 2003}
    };
    printf("%s (ID %d) was born on %02d/%02d/%04d\n",
           s.name, s.id,
           s.birthdate.day, s.birthdate.month, s.birthdate.year);
    return 0;
}
```

输出：

```
Carol (ID 1234) was born on 15/08/2003
```

您可以使用点运算符访问嵌套字段：

```
s.birthdate.year = 2004;
```

#### 结构与功能

您可以通过值或指针将结构传递给函数：

```
void print_person(struct Person p);
void update_age(struct Person *p, int new_age);
```

例子：

```
void update_age(struct Person *p, int new_age) {
    p->age = new_age;
}
```

传递指针更有效，特别是对于大型结构。

#### 小代码

这是一个结合了上述所有内容的完整示例：

```
#include <stdio.h>
struct Date {
    int day;
    int month;
    int year;
};
struct Person {
    char name[50];
    int age;
    float height;
    struct Date birthdate;
};
void print_person(const struct Person *p) {
    printf("%s, %d years old, born on %02d/%02d/%04d, height %.2fm\n",
           p->name, p->age,
           p->birthdate.day, p->birthdate.month, p->birthdate.year,
           p->height);
}
int main(void) {
    struct Person person = {"Alice", 25, 1.68f, {1, 2, 1999}};
    print_person(&person);
    person.age++;
    person.birthdate.year++;
    printf("After update:\n");
    print_person(&person);
    return 0;
}
```

输出：

```
Alice, 25 years old, born on 01/02/1999, height 1.68m
After update:
Alice, 26 years old, born on 01/02/2000, height 1.68m
```

#### 为什么它很重要

结构让您：

- 将相关数据组合成逻辑单元。
- 直接在代码中对现实世界的实体进行建模。
- 在函数之间有效地传递数据。
- 构建更高级别的数据抽象，例如列表、树或对象。

它们是所有复杂 C 系统、文件、网络数据包、内核数据甚至数据库行的基础`struct`.

#### 自己尝试一下

1. 创建一个`Book`结构与`title`,`author`， 和`year`.
2. 编写一个函数来打印a的所有详细信息`Book`.
3. 创建嵌套结构`Library`包含多本书。
4. 访问嵌套字段（例如，第一本书的标题）。
5. 修改`Library`通过指针使用`->`操作员。

结构是 C 语言让您对世界进行建模的方式，紧凑、明确且快速。接下来，您将了解联合以及 C 如何让不同的数据类型有效地共享相同的内存空间。
