---
title: "21. Understanding Memory Layout (Stack, Heap, Data, Code)"
date: "2026-07-04"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "Working with Memory"
description: "The Little Book of C — 21. Understanding Memory Layout (Stack, Heap, Data, Code)"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
section: 21
sidebarWeight: 21
lang: "en-US"
alternateEn: "/posts/c教程/en-US/03-Working with Memory/021-Understanding Memory Layout (Stack, Heap, Data, Code)"
alternateZh: "/posts/c教程/zh-CN/03-内存/021-Understanding Memory Layout (Stack, Heap, Data, Code)"
---
[中文版本](/posts/c教程/zh-CN/03-内存/021-Understanding Memory Layout (Stack, Heap, Data, Code))

Before you can master pointers or dynamic memory, you need to understand how memory is organized in a running C program. C gives you a level of control that few languages allow, but to use it safely, you must know where your data lives and how long it stays there.

#### The Memory Segments

When a program runs, its memory is divided into several key sections:

| Segment | Purpose | Example Data |
| --- | --- | --- |
| Code (Text) | Stores compiled machine instructions | Functions, program logic |
| Data (Static) | Stores global and static variables with initialized values | `int count = 5;` |
| BSS (Uninitialized Data) | Holds global/static variables that start as zero or are uninitialized | `int buffer[256];` |
| Heap | Used for dynamic memory allocation (`malloc`,`calloc`) | Large, runtime-created data |
| Stack | Stores local variables, function parameters, return addresses | Function calls, recursion |

These segments are managed differently by the operating system, and each has a different lifetime and scope.

#### Tiny Code

Here’s a small program that prints the memory addresses of different variables to show where they live:

```
#include <stdio.h>
#include <stdlib.h>
// Global variable (Data segment)
int global_var = 42;
// Uninitialized global variable (BSS segment)
int global_bss;
void show_addresses(void) {
    // Local variable (Stack)
    int local_var = 10;
    // Static variable (Data segment)
    static int static_var = 20;
    // Dynamic variable (Heap)
    int *heap_var = malloc(sizeof(int));
    *heap_var = 30;
    printf("Code (function) address:     %p\n", (void *)show_addresses);
    printf("Global variable address:     %p\n", (void *)&global_var);
    printf("Uninitialized global address:%p\n", (void *)&global_bss);
    printf("Static variable address:     %p\n", (void *)&static_var);
    printf("Stack variable address:      %p\n", (void *)&local_var);
    printf("Heap variable address:       %p\n", (void *)heap_var);
    free(heap_var);
}
int main(void) {
    show_addresses();
    return 0;
}
```

Compile and run:

```
gcc memory_layout.c -o memory_layout
./memory_layout
```

Example output (addresses vary by system):

```
Code (function) address:     0x561ce7348169
Global variable address:     0x561ce7546014
Uninitialized global address:0x561ce7546018
Static variable address:     0x561ce7546020
Stack variable address:      0x7ffc94b65a5c
Heap variable address:       0x561ce774b2a0
```

Notice how the stack address is much higher than the heap, the stack usually grows downward, and the heap grows upward in memory.

#### How It All Works

Code segment

- Contains compiled instructions.
- Usually marked as read-only to prevent accidental modification.

Data segment

- Holds global and static variables initialized with values.
- Exists for the entire program duration.

BSS (Block Started by Symbol)

- Holds uninitialized global/static variables.
- Automatically zero-initialized at runtime.

Stack

- Used for local variables and function calls.
- Automatically managed, grows and shrinks as functions are called and return.

Heap

- Allocated manually at runtime.
- Requires explicit management (`malloc` and`free`).

#### Why It Matters

Every time you write a variable, you’re deciding, whether consciously or not, where in memory it lives. Understanding this layout helps you:

- Debug memory errors (segmentation faults, leaks, corruption).
- Reason about performance and function calls.
- Write correct code when using`malloc`,`free`, and pointers.
- Build real systems software like allocators or kernels.

Without this mental model, C memory bugs feel mysterious; with it, they become logical and fixable.

#### Try It Yourself

1. Add more global, local, and static variables to the example and print their addresses.
2. Allocate two blocks with`malloc()` and compare their addresses, the heap grows upward.
3. Call`show_addresses()` multiple times and notice how the stack variable’s address changes each call.
4. Move a variable from global to local and observe how its memory segment changes.
5. Draw a diagram showing stack, heap, data, and code regions for your system.

Understanding memory layout is your first real step into systems-level C, it’s how you begin to see your code not just as text, but as structured bytes living inside memory.
