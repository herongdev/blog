---
title: "25. Dynamic Memory Allocation (malloc, calloc, realloc, free)"
date: "2026-07-04"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "Working with Memory"
description: "The Little Book of C — 25. Dynamic Memory Allocation (malloc, calloc, realloc, free)"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
section: 25
sidebarWeight: 25
lang: "en-US"
alternateEn: "/posts/c教程/en-US/03-Working with Memory/025-Dynamic Memory Allocation (malloc, calloc, realloc, free)"
alternateZh: "/posts/c教程/zh-CN/03-内存/025-Dynamic Memory Allocation (malloc, calloc, realloc, free)"
---
[中文版本](/posts/c教程/zh-CN/03-内存/025-Dynamic Memory Allocation (malloc, calloc, realloc, free))

Static arrays have fixed size, but real programs often need flexible data that grows or shrinks at runtime. Dynamic memory allocation lets you request, use, and release memory manually while your program is running. It’s one of the most powerful and error-prone parts of C.

#### The Idea

C provides four key functions from`<stdlib.h>` for dynamic memory management:

| Function | Purpose |
| --- | --- |
| `malloc(size)` | Allocates a block of memory |
| `calloc(n, size)` | Allocates and clears memory for`n` elements |
| `realloc(ptr, size)` | Changes the size of a previously allocated block |
| `free(ptr)` | Releases memory back to the system |

These return a pointer to the allocated memory, or`NULL` if allocation fails.

#### Basic Example

```
#include <stdio.h>
#include <stdlib.h>
int main(void) {
    int *p = malloc(sizeof(int));  // allocate space for one int
    if (p == NULL) {
        printf("Memory allocation failed.\n");
        return 1;
    }
    *p = 42;  // store a value in allocated memory
    printf("Value: %d\n", *p);
    free(p);  // release the memory
    return 0;
}
```

Compile and run:

```
gcc malloc_demo.c -o malloc_demo
./malloc_demo
```

Output:

```
Value: 42
```

#### Allocating Arrays Dynamically

You can allocate arrays at runtime using`malloc()` or`calloc()`.

```
int n;
printf("Enter number of elements: ");
scanf("%d", &n);
int *arr = malloc(n * sizeof(int));
if (arr == NULL) {
    printf("Out of memory.\n");
    return 1;
}
// Initialize and print
for (int i = 0; i < n; i++) {
    arr[i] = i * 10;
    printf("%d ", arr[i]);
}
free(arr);
```

Output example:

```
Enter number of elements: 5
0 10 20 30 40
```

`malloc()` leaves memory uninitialized, while`calloc()` clears it to zero:

```
int *arr = calloc(n, sizeof(int)); // all elements start at 0
```

#### Changing Memory Size with realloc()

When you need to resize an allocated block, say, double an array’s capacity, use`realloc()`.

```
int *arr = malloc(3 * sizeof(int));
arr[0] = 1; arr[1] = 2; arr[2] = 3;
// grow array to 5 elements
int *temp = realloc(arr, 5 * sizeof(int));
if (temp == NULL) {
    printf("Reallocation failed!\n");
    free(arr);
    return 1;
}
arr = temp;
arr[3] = 4;
arr[4] = 5;
for (int i = 0; i < 5; i++)
    printf("%d ", arr[i]);
free(arr);
```

Output:

```
1 2 3 4 5
```

`realloc()` tries to expand the existing block if possible; if not, it allocates a new block, copies the data, and frees the old one automatically.

#### Tiny Code

Here’s a complete program combining`malloc`,`calloc`,`realloc`, and`free`:

```
#include <stdio.h>
#include <stdlib.h>
int main(void) {
    int n = 3;
    int *nums = calloc(n, sizeof(int));
    if (nums == NULL) {
        printf("Initial allocation failed.\n");
        return 1;
    }
    // Fill array
    for (int i = 0; i < n; i++) nums[i] = (i + 1) * 5;
    printf("Initial values: ");
    for (int i = 0; i < n; i++) printf("%d ", nums[i]);
    printf("\n");
    // Resize
    n = 5;
    int *new_nums = realloc(nums, n * sizeof(int));
    if (new_nums == NULL) {
        printf("Reallocation failed.\n");
        free(nums);
        return 1;
    }
    nums = new_nums;
    // Fill new slots
    for (int i = 3; i < n; i++) nums[i] = (i + 1) * 5;
    printf("After realloc: ");
    for (int i = 0; i < n; i++) printf("%d ", nums[i]);
    printf("\n");
    free(nums);
    return 0;
}
```

Output:

```
Initial values: 5 10 15
After realloc: 5 10 15 20 25
```

#### Memory Allocation Diagram

```
Stack   →   grows downward
Heap    →   grows upward
Data    →   global/static variables
Code    →   program instructions
```

Each call to`malloc` reserves space on the heap, which stays allocated until explicitly freed.

#### Why It Matters

Dynamic memory is the backbone of all real systems programming. Without it, you can’t build:

- Variable-sized arrays
- Linked lists, trees, graphs
- Caches and databases
- File readers and parsers

It’s also where most C bugs happen, dangling pointers, leaks, double frees, and buffer overruns, so disciplined management is crucial.

#### Try It Yourself

1. Allocate an array of 10 integers, fill it, print it, and free it.
2. Use`calloc` instead of`malloc` and observe the zero initialization.
3. Resize the array from 10 to 20 elements using`realloc`.
4. Forget to call`free()` and then run your program with Valgrind, see the memory leak report.
5. Write a function`int *make_array(int n)` that allocates and returns a pointer to a new array.

Dynamic allocation is where you start managing memory by hand. Done right, it gives you incredible control and efficiency, done wrong, it’s chaos. Master it carefully: it’s the essence of being a C programmer.
