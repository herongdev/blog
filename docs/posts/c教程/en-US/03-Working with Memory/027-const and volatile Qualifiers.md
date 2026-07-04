---
title: "27. const and volatile Qualifiers"
date: "2026-07-04"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "Working with Memory"
description: "The Little Book of C — 27. const and volatile Qualifiers"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
section: 27
sidebarWeight: 27
lang: "en-US"
alternateEn: "/posts/c教程/en-US/03-Working with Memory/027-const and volatile Qualifiers"
alternateZh: "/posts/c教程/zh-CN/03-内存/027-const and volatile Qualifiers"
---
[中文版本](/posts/c教程/zh-CN/03-内存/027-const and volatile Qualifiers)

C gives you fine-grained control over how variables are used through type qualifiers. Two of the most important are`const` and`volatile`. They look simple but play a crucial role in writing safe, predictable, and efficient code, especially in systems programming, embedded systems, and multithreaded environments.

#### The const Qualifier

`const` means read-only: once a variable is initialized, you cannot modify it.

```
const int x = 10;
x = 20; // ❌ error: assignment of read-only variable
```

It’s a promise to the compiler, and to other programmers, that the value won’t change.

`const` can be applied to many things:

- Variables
- Function parameters
- Pointers
- Return types

#### const with Pointers

`const` with pointers can be tricky but follows consistent rules. The position of`const` determines what cannot change.

| Declaration | Meaning |
| --- | --- |
| `const int *p;` | Pointer to constant data, data can’t change |
| `int *const p;` | Constant pointer, pointer can’t change, data can |
| `const int *const p;` | Both pointer and data are constant |

Example:

```
int value = 42;
const int *p1 = &value;   // cannot modify *p1
int *const p2 = &value;   // cannot reassign p2
const int *const p3 = &value; // cannot change *p3 or p3
```

#### const in Function Parameters

Marking parameters as`const` helps prevent accidental modification and enables compiler optimizations.

```
void print_message(const char *msg) {
    printf("%s\n", msg);
}
```

Here,`msg` is read-only; the function can’t modify the string it points to.

#### Tiny Code

Here’s a program demonstrating`const` in action:

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

Compile and run:

```
gcc const_demo.c -o const_demo
./const_demo
```

Output:

```
num = 5
num after q change = 15
Value: 15
```

#### The volatile Qualifier

`volatile` tells the compiler that a variable can change at any time, even if your code doesn’t modify it. It prevents the compiler from optimizing out reads or writes.

Use`volatile` when:

- A variable can be changed by hardware (e.g., memory-mapped I/O registers).
- A variable can be modified by another thread or signal handler.
- You need to force an actual memory read each time, not a cached value.

Example:

```
volatile int sensor_value;
while (sensor_value < 100) {
    // without volatile, compiler might optimize this loop away
}
```

Here,`sensor_value` might be updated by hardware;`volatile` ensures each check re-reads memory instead of reusing a cached register value.

#### Combining const and volatile

Yes, you can use both together, a value that can change unexpectedly, but your code cannot modify it.

Example:

```
const volatile int status_register = 0x1234;
```

This is common in embedded systems, where a hardware register’s bits may change due to external events.

#### Why It Matters

- `const` improves safety and clarity: makes interfaces self-documenting and helps the compiler catch mistakes.
- `volatile` preserves correctness in concurrent or hardware-driven systems.
- Together, they let you balance optimization with precision, critical in low-level C programming.

If you misuse or forget them:

- You risk accidental modification of data (`const`).
- You risk the compiler removing critical reads/writes (`volatile`).

#### Try It Yourself

Write a program that tries to modify a`const int` through a pointer, observe the compiler error.

Declare a variable as`volatile int counter` and increment it in a loop.

- Then remove`volatile` and inspect the generated assembly with`gcc -S`.

Create a function with`const char *msg` and try to modify it, see why it’s prohibited.

Experiment with`const int *p` vs`int *const p` to understand their difference.

Combine both:`const volatile int flag;` and print it in a loop.

In C,`const` and`volatile` are more than just keywords, they’re contracts. They tell the compiler exactly how memory can be used, which helps both humans and machines reason safely about your code.
