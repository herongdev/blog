---
title: "22. Pointers and Addresses"
date: "2026-07-04"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "Working with Memory"
description: "The Little Book of C — 22. Pointers and Addresses"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
section: 22
sidebarWeight: 22
lang: "en-US"
alternateEn: "/posts/c教程/en-US/03-Working with Memory/022-Pointers and Addresses"
alternateZh: "/posts/c教程/zh-CN/03-内存/022-Pointers and Addresses"
---
[中文版本](/posts/c教程/zh-CN/03-内存/022-Pointers and Addresses)

Pointers are at the heart of C programming. They give you direct access to memory, the power to read, write, and manipulate data stored anywhere in your program. Understanding pointers transforms how you think about variables, functions, and data structures.

You can’t truly master C without mastering pointers.

#### What Is a Pointer?

A pointer is a variable that stores the address of another variable. Think of it as a reference to a specific spot in memory.

```
int value = 42;
int *ptr = &value; // pointer to int, stores the address of value
```

- `&value` gives the memory address of`value`.
- `ptr` holds that address.
- `*ptr` lets you access the value stored there (this is called dereferencing).

#### Tiny Code

```
#include <stdio.h>
int main(void) {
    int number = 10;
    int *p = &number;  // pointer stores address of number
    printf("Value of number: %d\n", number);
    printf("Address of number: %p\n", (void *)&number);
    printf("Pointer p holds address: %p\n", (void *)p);
    printf("Value through pointer: %d\n", *p);
    *p = 20;  // modify the value via the pointer
    printf("New value of number: %d\n", number);
    return 0;
}
```

Compile and run:

```
gcc pointer_basics.c -o pointer_basics
./pointer_basics
```

Output (addresses vary):

```
Value of number: 10
Address of number: 0x7ffc8f4c9c4c
Pointer p holds address: 0x7ffc8f4c9c4c
Value through pointer: 10
New value of number: 20
```

#### Pointer Declaration and Dereferencing

| Syntax | Meaning |
| --- | --- |
| `int *p;` | Pointer to an integer |
| `char *c;` | Pointer to a character |
| `float *f;` | Pointer to a float |
| `p = &x;` | Assigns address of variable`x` to pointer`p` |
| `*p` | Accesses (dereferences) the value stored at the address held by`p` |

Dereferencing works both ways:

- Reading the value:`x = *p;`
- Writing to the address:`*p = 99;`

#### Null Pointers

A pointer that points to nothing should be set to`NULL`.

```
int *ptr = NULL;
if (ptr == NULL) {
    printf("Pointer is not initialized.\n");
}
```

Dereferencing a null pointer (`*ptr` when`ptr == NULL`) causes a segmentation fault, one of the most common C errors.

#### Pointer to Pointer

You can have pointers that store addresses of other pointers.

```
int x = 5;
int *p = &x;
int **pp = &p;
printf("x = %d\n", **pp);
```

This concept appears in multi-dimensional arrays and function pointers.

#### Why It Matters

Pointers are what make C powerful:

- They enable dynamic memory allocation (`malloc`,`calloc`,`free`).
- They allow arrays, strings, and structures to be passed efficiently.
- They are the foundation for linked lists, trees, and system calls.

But they also demand precision. A single misused pointer can cause crashes or memory corruption.

Mastering pointers means mastering both control and responsibility over memory.

#### Try It Yourself

1. Write a program that declares an integer and prints both its value and address.
2. Create a pointer to that integer and modify the variable’s value through the pointer.
3. Try declaring`int *p = NULL;` and check it before dereferencing.
4. Print a pointer to a pointer (`int **`) and see how the addresses relate.
5. For fun, declare two variables and make one pointer swap their values using dereferencing.

Once you truly understand pointers, the rest of C, arrays, structs, dynamic memory, even function calls, begins to make sense. They are the bridge between your code and the machine’s actual memory.
