---
title: "39. C 中的最小面向对象设计"
date: "2026-07-04"
lang: "zh-CN"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "04-数据结构"
  - "中文"
description: "The Little Book of C 中文版 — 39. C 中的最小面向对象设计"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
translator: "机器辅助翻译（Google Translate）"
section: 39
sidebarWeight: 39
alternateZh: "/posts/c教程/zh-CN/04-数据结构/039-Minimal Object-Oriented Design in C"
alternateEn: "/posts/c教程/en-US/04-Structuring Data/039-Minimal Object-Oriented Design in C"
---

[English version](/posts/c教程/en-US/04-Structuring Data/039-Minimal Object-Oriented Design in C)

C 没有类或继承，但它通过约定为您提供结构、函数指针和封装。有了这些，您可以构建简单、快速且明确的面向对象风格的系统。您将学习如何设计“拥有”数据和行为的数据结构，例如轻量级对象。

#### 核心理念

在面向对象的设计中，对象结合了：

- 数据 → 状态
- 功能 → 操作

在 C 中，您可以通过将函数指针放置在结构中并将它们视为“方法”来实现此目的。

#### 一个简单的例子：计数器对象

```
#include <stdio.h>
#include <stdlib.h>
typedef struct Counter Counter; // forward declaration
struct Counter {
    int value;
    // methods (function pointers)
    void (*inc)(Counter *self);
    void (*reset)(Counter *self);
    void (*print)(const Counter *self);
};
void counter_inc(Counter *self) { self->value++; }
void counter_reset(Counter *self) { self->value = 0; }
void counter_print(const Counter *self) { printf("Value: %d\n", self->value); }
Counter* new_counter(void) {
    Counter *c = malloc(sizeof(Counter));
    c->value = 0;
    c->inc = counter_inc;
    c->reset = counter_reset;
    c->print = counter_print;
    return c;
}
void free_counter(Counter *c) { free(c); }
int main(void) {
    Counter *c = new_counter();
    c->inc(c);
    c->inc(c);
    c->print(c);
    c->reset(c);
    c->print(c);
    free_counter(c);
    return 0;
}
```

输出：

```
Value: 2
Value: 0
```

这里，`Counter`行为就像一个小类：它存储状态（`value`）及其方法（`inc`,`reset`,`print`).

#### 它是如何运作的

|概念（面向对象编程）|相当于 C |
| --- | --- |
|班级 |`struct`定义|
|对象|一个实例（`malloc`ed 结构）|
|方法|函数指针|
|构造函数|`new_...()`功能|
|析构函数 |`free_...()`功能|
|这|指向结构体的指针（`self`) |

#### 示例：形状接口（多态性）

您可以使用函数指针模拟多态性，即在不同类型上调用相同函数名的能力。

```
#include <stdio.h>
#include <stdlib.h>
#include <math.h>
typedef struct Shape Shape;
struct Shape {
    double (*area)(Shape *self);
    void (*print)(Shape *self);
};
typedef struct {
    Shape base;
    double radius;
} Circle;
typedef struct {
    Shape base;
    double width, height;
} Rectangle;
double circle_area(Shape *s) {
    Circle *c = (Circle*)s;
    return M_PI * c->radius * c->radius;
}
void circle_print(Shape *s) {
    Circle *c = (Circle*)s;
    printf("Circle (r=%.2f) area=%.2f\n", c->radius, circle_area(s));
}
double rect_area(Shape *s) {
    Rectangle *r = (Rectangle*)s;
    return r->width * r->height;
}
void rect_print(Shape *s) {
    Rectangle *r = (Rectangle*)s;
    printf("Rectangle (%.2fx%.2f) area=%.2f\n",
           r->width, r->height, rect_area(s));
}
Shape* new_circle(double r) {
    Circle *c = malloc(sizeof(Circle));
    c->radius = r;
    c->base.area = circle_area;
    c->base.print = circle_print;
    return (Shape*)c;
}
Shape* new_rectangle(double w, double h) {
    Rectangle *r = malloc(sizeof(Rectangle));
    r->width = w;
    r->height = h;
    r->base.area = rect_area;
    r->base.print = rect_print;
    return (Shape*)r;
}
int main(void) {
    Shape *s1 = new_circle(2.5);
    Shape *s2 = new_rectangle(3.0, 4.0);
    s1->print(s1);
    s2->print(s2);
    free(s1);
    free(s2);
    return 0;
}
```

输出：

```
Circle (r=2.50) area=19.63
Rectangle (3.00x4.00) area=12.00
```

两种形状共享相同的“界面”（`area`,`print`）但行为不同，典型的多态性。

#### 为什么这有效

每个“对象”都存储指向其方法的指针，因此您可以在不知道确切类型的情况下调用它们。第一个字段（`base`) 在派生结构中允许在父级 (`Shape*`）和孩子（`Circle*`,`Rectangle*`）。这模仿了组合继承。

#### 好处

- 提供接口和实现之间的清晰分离。
- 启用运行时调度（函数行为取决于类型）。
- 保持代码模块化，函数可以对抽象“对象”进行操作。
- 用于 Linux 内核、GTK 和 SQLite 等主要 C 项目。

#### 局限性

- 没有真正的类型安全，强制转换可能会出错。
- 没有自动析构函数或构造函数（您必须管理内存）。
- 没有继承语法，一切都是明确的。

但这些也是优势：没有什么是隐藏的，一切都在你的掌控之中。

#### 自己尝试一下

1. 添加新形状：`Triangle`与底座和高度。
2. 编写函数`print_all(Shape **arr, int n)`打印数组中的所有形状。
3.添加一个`destroy(Shape *s)`方法指针并实现特定于类型的清理。
4. 延长`Counter`结构体有一个`decrement`方法。
5. 尝试设计一个小的“界面”`Animal`→`Dog`,`Cat`与一个`speak()`功能。

借助结构体和函数指针，C 成为一个最小但功能强大的对象系统。您现在拥有设计可重用、模块化代码所需的一切，同时又不会失去 C 语言永恒的清晰度和效率。

接下来，您将通过将所有这些想法放在一起来完成本章：用 C 语言构建一个小型的、真实的系统，您自己的小型库系统，具有数据结构、内存管理和模块化设计。
