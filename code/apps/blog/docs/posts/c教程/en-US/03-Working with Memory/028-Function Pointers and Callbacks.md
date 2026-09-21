---
title: "28. Function Pointers and Callbacks"
date: "2026-07-04"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "Working with Memory"
description: "The Little Book of C — 28. Function Pointers and Callbacks"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
section: 28
sidebarWeight: 28
lang: "en-US"
alternateEn: "/posts/c教程/en-US/03-Working with Memory/028-Function Pointers and Callbacks"
alternateZh: "/posts/c教程/zh-CN/03-内存/028-Function Pointers and Callbacks"
---
[中文版本](/posts/c教程/zh-CN/03-内存/028-Function Pointers and Callbacks)

Functions in C are values too, they live in memory and have addresses just like variables. A function pointer is a pointer that stores the address of a function, allowing you to call that function indirectly. This idea powers callbacks, event systems, custom sorters, and plug-in architectures in C.

#### What Is a Function Pointer?

Just like`int *` points to an integer, a function pointer points to a function.

Syntax:

```
return_type (*pointer_name)(parameter_types);
```

Example:

```
int add(int a, int b) {
    return a + b;
}
int (*func_ptr)(int, int) = add;
```

Now you can call the function through the pointer:

```
int result = func_ptr(2, 3); // same as add(2, 3)
```

#### Tiny Code

Here’s a complete example showing how to declare, assign, and call function pointers:

```
#include <stdio.h>
int add(int a, int b) { return a + b; }
int sub(int a, int b) { return a - b; }
int mul(int a, int b) { return a * b; }
void operate(int x, int y, int (*op)(int, int)) {
    printf("Result: %d\n", op(x, y)); // call through pointer
}
int main(void) {
    int (*f)(int, int); // declaration
    f = add;
    printf("Add via pointer: %d\n", f(5, 3));
    f = sub;
    printf("Subtract via pointer: %d\n", f(5, 3));
    printf("\nUsing callback function:\n");
    operate(4, 6, mul); // pass function pointer as argument
    return 0;
}
```

Compile and run:

```
gcc func_pointer_demo.c -o func_pointer_demo
./func_pointer_demo
```

Output:

```
Add via pointer: 8
Subtract via pointer: 2

Using callback function:
Result: 24
```

#### Function Pointers in Arrays

You can also store multiple function pointers in an array, useful for building tables of operations.

```
int (*ops[3])(int, int) = {add, sub, mul};
for (int i = 0; i < 3; i++)
    printf("ops[%d](4, 2) = %d\n", i, ops[i](4, 2));
```

Output:

```
ops[0](4, 2) = 6
ops[1](4, 2) = 2
ops[2](4, 2) = 8
```

This pattern underlies dispatch tables, interpreters, and virtual function systems in C.

#### Callbacks

A callback is a function you pass as an argument to another function, letting the callee “call back” into user code. This pattern is essential in event-driven and modular designs.

Example: a simple iterator that accepts a callback

```
#include <stdio.h>
void for_each(int *arr, int n, void (*callback)(int)) {
    for (int i = 0; i < n; i++)
        callback(arr[i]);
}
void print_square(int x) {
    printf("%d^2 = %d\n", x, x * x);
}
int main(void) {
    int nums[] = {1, 2, 3, 4, 5};
    for_each(nums, 5, print_square); // pass callback
    return 0;
}
```

Output:

```
1^2 = 1
2^2 = 4
3^2 = 9
4^2 = 16
5^2 = 25
```

#### Why It Matters

Function pointers let you:

- Select behavior at runtime (dynamic dispatch).
- Pass logic into libraries without recompiling them.
- Build frameworks, event handlers, interpreters, and plug-ins.
- Replace huge switch-case structures with elegant dispatch tables.

They are also how C implements:

- `qsort()` and`bsearch()` comparison functions,
- signal handlers (`signal(SIGINT, handler)`), and
- system callbacks in GUIs or kernels.

#### Try It Yourself

1. Write three arithmetic functions and store them in an array of function pointers.
2. Build a`calculate(a, b, char op)` function that picks the right function pointer based on`op`.
3. Implement a callback-style loop that calls a user-defined function for each array element.
4. Pass a function pointer to`qsort()` from`<stdlib.h>` to sort integers in descending order.
5. Write a small menu system that calls the right function based on user choice.

Function pointers and callbacks give your programs flexibility and abstraction without sacrificing speed. They’re how C achieves dynamic behavior, the bridge between data and executable logic.
