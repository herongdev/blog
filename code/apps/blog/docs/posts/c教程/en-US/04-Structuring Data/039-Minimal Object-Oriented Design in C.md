---
title: "39. Minimal Object-Oriented Design in C"
date: "2026-07-04"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "Structuring Data"
description: "The Little Book of C — 39. Minimal Object-Oriented Design in C"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
section: 39
sidebarWeight: 39
lang: "en-US"
alternateEn: "/posts/c教程/en-US/04-Structuring Data/039-Minimal Object-Oriented Design in C"
alternateZh: "/posts/c教程/zh-CN/04-数据结构/039-Minimal Object-Oriented Design in C"
---
[中文版本](/posts/c教程/zh-CN/04-数据结构/039-Minimal Object-Oriented Design in C)

C doesn’t have classes or inheritance, but it gives you structs, function pointers, and encapsulation through conventions. With these, you can build object-oriented style systems that are simple, fast, and explicit. You’ll learn how to design data structures that “own” both data and behavior, like lightweight objects.

#### The Core Idea

In object-oriented design, an object combines:

- Data → the state
- Functions → the operations

In C, you can achieve this by placing function pointers inside structs, and treating them as “methods.”

#### A Simple Example: A Counter Object

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

Output:

```
Value: 2
Value: 0
```

Here,`Counter` behaves like a small class: it stores both the state (`value`) and its methods (`inc`,`reset`,`print`).

#### How It Works

| Concept (OOP) | Equivalent in C |
| --- | --- |
| Class | `struct` definition |
| Object | An instance (`malloc` ed struct) |
| Method | Function pointer |
| Constructor | `new_...()` function |
| Destructor | `free_...()` function |
| this | Pointer to the struct (`self`) |

#### Example: Shape Interface (Polymorphism)

You can simulate polymorphism, the ability to call the same function name on different types, using function pointers.

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

Output:

```
Circle (r=2.50) area=19.63
Rectangle (3.00x4.00) area=12.00
```

Both shapes share the same “interface” (`area`,`print`) but behave differently, classic polymorphism.

#### Why This Works

Every “object” stores pointers to its methods, so you can call them without knowing the exact type. The first field (`base`) in derived structs allows casting between the parent (`Shape*`) and child (`Circle*`,`Rectangle*`). This mimics inheritance by composition.

#### Benefits

- Provides clear separation between interface and implementation.
- Enables runtime dispatch (function behavior depends on type).
- Keeps code modular, functions can operate on abstract “objects.”
- Used in major C projects like the Linux kernel, GTK, and SQLite.

#### Limitations

- No true type safety, casts can go wrong.
- No automatic destructors or constructors (you must manage memory).
- No inheritance syntax, everything is explicit.

But these are also strengths: nothing is hidden, and everything is under your control.

#### Try It Yourself

1. Add a new shape:`Triangle` with base and height.
2. Write a function`print_all(Shape **arr, int n)` that prints all shapes in an array.
3. Add a`destroy(Shape *s)` method pointer and implement type-specific cleanup.
4. Extend the`Counter` struct with a`decrement` method.
5. Try designing a small “interface” for`Animal`→`Dog`,`Cat` with a`speak()` function.

With structs and function pointers, C becomes a minimal but powerful object system. You now have everything needed to design reusable, modular code, without losing the clarity and efficiency that make C timeless.

Next, you’ll finish this chapter by putting all these ideas together: building a small, real-world system in C, your own Tiny Library System, with data structures, memory management, and modular design.
