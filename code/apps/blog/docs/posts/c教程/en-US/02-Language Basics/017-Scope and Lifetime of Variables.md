---
title: "17. Scope and Lifetime of Variables"
date: "2026-07-04"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "Language Basics"
description: "The Little Book of C — 17. Scope and Lifetime of Variables"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
section: 17
sidebarWeight: 17
lang: "en-US"
alternateEn: "/posts/c教程/en-US/02-Language Basics/017-Scope and Lifetime of Variables"
alternateZh: "/posts/c教程/zh-CN/02-语言基础/017-Scope and Lifetime of Variables"
---
[中文版本](/posts/c教程/zh-CN/02-语言基础/017-Scope and Lifetime of Variables)

Every variable in C exists within a specific scope (where it can be accessed) and has a lifetime (how long it exists in memory). Understanding both is essential to avoid common bugs, from name conflicts to mysterious “garbage values.” Once you know where and how variables live, you’ll start thinking like the compiler.

#### Variable Scope

Scope defines where a variable can be seen or used in your code.

Block scope (local variables) Declared inside a function or block`{ ... }`. Accessible only within that block.

```
void example(void) {
    int x = 10;  // local to this function
    printf("%d\n", x);
}
```

You can’t access`x` outside of`example()`.

File scope (global variables) Declared outside of all functions. Accessible anywhere in the file after declaration.

```
int counter = 0; // global variable
void increment(void) {
    counter++;
}
```

Function parameter scope Parameters behave like local variables, visible only within the function.

```
void greet(const char *name) {
    printf("Hello, %s!\n", name);
}
```

Block shadowing Inner variables can temporarily “hide” outer ones:

```
int x = 5;
{
    int x = 10;  // shadows the outer x
    printf("%d\n", x); // prints 10
}
printf("%d\n", x); // prints 5
```

#### Variable Lifetime

Lifetime determines how long a variable stays in memory.

Automatic (default) Local variables are created when a function starts and destroyed when it ends.

```
void demo(void) {
    int temp = 42;  // exists only while demo() runs
}
```

Static Declared with the`static` keyword, they keep their value between function calls.

```
void counter(void) {
    static int count = 0;  // initialized only once
    count++;
    printf("Count: %d\n", count);
}
```

Every call to`counter()` increases the same variable.

Dynamic Created manually using`malloc()` or`calloc()`, they live until you`free()` them. (You’ll learn this in Chapter 3.)

Global Exist for the entire duration of the program.

#### Storage Classes in C

| Keyword | Storage | Scope | Lifetime | Notes |
| --- | --- | --- | --- | --- |
| `auto` | Stack | Block | Function call | Default for locals |
| `register` | CPU Register | Block | Function call | Hint to optimize speed |
| `static` | Static Memory | Block/File | Program | Retains value |
| `extern` | Static Memory | Global | Program | Declared elsewhere |

#### Tiny Code

Here’s a full program showing scope and lifetime in action:

```
#include <stdio.h>
int global_var = 10; // global scope
void demo_scope(void) {
    int local_var = 5; // block scope
    static int persistent = 0; // retains value between calls
    printf("Global: %d, Local: %d, Static: %d\n", global_var, local_var, persistent);
    persistent++;
}
int main(void) {
    printf("First call:\n");
    demo_scope();
    printf("\nSecond call:\n");
    demo_scope();
    printf("\nAccessing global variable in main: %d\n", global_var);
    return 0;
}
```

Compile and run:

```
gcc scope_demo.c -o scope_demo
./scope_demo
```

Output:

```
First call:
Global: 10, Local: 5, Static: 0

Second call:
Global: 10, Local: 5, Static: 1

Accessing global variable in main: 10
```

#### Why It Matters

Scope and lifetime are the invisible structure beneath your code. They define what data is available where, and for how long. Without understanding them, you’ll face bugs like:

- Uninitialized values after a function returns
- Variables mysteriously resetting
- Conflicts between local and global names

Once you know how the compiler manages variables, you can reason about memory, performance, and correctness with confidence.

#### Try It Yourself

1. Write a function with a static counter and call it three times. Observe how the count persists.
2. Add a global variable, modify it from two different functions, and print the result.
3. Create nested blocks with variables of the same name, see how shadowing behaves.
4. Move a variable outside a function and mark it`static`. Try accessing it from another function, what happens?
5. Rewrite your earlier “calculator” example using global and local variables to see the difference.

When you understand scope and lifetime, you gain control over how your program’s data moves, lives, and dies, a skill every true C programmer needs.
