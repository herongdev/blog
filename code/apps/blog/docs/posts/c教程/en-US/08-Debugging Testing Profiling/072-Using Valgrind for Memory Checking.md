---
title: "72. Using Valgrind for Memory Checking"
date: "2026-07-04"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "Debugging Testing Profiling"
description: "The Little Book of C — 72. Using Valgrind for Memory Checking"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
section: 72
sidebarWeight: 72
lang: "en-US"
alternateEn: "/posts/c教程/en-US/08-Debugging Testing Profiling/072-Using Valgrind for Memory Checking"
alternateZh: "/posts/c教程/zh-CN/08-调试测试与 profiling/072-Using Valgrind for Memory Checking"
---
[中文版本](/posts/c教程/zh-CN/08-调试测试与 profiling/072-Using Valgrind for Memory Checking)

If gdb helps you see how your program runs, Valgrind helps you see where it leaks. C gives you raw control over memory, and that means you’re responsible for every allocation, deallocation, and pointer access.

Valgrind is your best friend when you need to find:

- Memory leaks (forgotten`free()`)
- Invalid reads/writes
- Double frees
- Use-after-free errors

Let’s learn how to use it to make your programs solid and leak-free.

#### Step 1. Installing Valgrind

On Linux:

```
sudo apt install valgrind
```

On macOS (with Homebrew):

```
brew install valgrind
```

Compile your program with debug symbols:

```
gcc -g memory.c -o memory
```

#### Step 2. Running with Valgrind

Run your program under Valgrind:

```
valgrind ./memory
```

Valgrind runs your program inside a virtual CPU and monitors every memory operation. At the end, it prints a detailed report of allocations and leaks.

#### Step 3. A Simple Example

Here’s a program with two common mistakes: a leak and an invalid free.

```
#include <stdlib.h>
#include <stdio.h>
int main(void) {
    int *p = malloc(10 * sizeof(int));
    p[10] = 42;  // invalid write (out of bounds)
    return 0;    // forgot to free(p)
}
```

Run it:

```
gcc -g mem_bug.c -o mem_bug
valgrind ./mem_bug
```

Output:

```
==1234== Invalid write of size 4
==1234==    at 0x1091A: main (mem_bug.c:6)
==1234==  Address 0x5201048 is 0 bytes after a block of size 40 alloc'd
==1234==    at 0x484186F: malloc (vg_replace_malloc.c:380)
==1234==
==1234== HEAP SUMMARY:
==1234==    definitely lost: 40 bytes in 1 blocks
==1234== LEAK SUMMARY:
==1234==    definitely lost: 40 bytes in 1 blocks
```

Valgrind caught both the invalid access and the leak.

#### Step 4. Fixing the Errors

Correct version:

```
#include <stdlib.h>
#include <stdio.h>
int main(void) {
    int *p = malloc(10 * sizeof(int));
    if (!p) return 1;
    p[9] = 42;   // valid index
    free(p);
}
```

Run again:

```
valgrind ./mem_bug
```

Output:

```
== All heap blocks were freed -- no leaks are possible
== ERROR SUMMARY: 0 errors from 0 contexts
```

Clean and perfect.

#### Step 5. Detecting Use-After-Free

```
#include <stdlib.h>
#include <stdio.h>
int main(void) {
    int *p = malloc(sizeof(int));
    *p = 5;
    free(p);
    printf("%d\n", *p); // using freed memory
}
```

Valgrind says:

```
==1234== Invalid read of size 4
==1234==    at 0x1091A: main (use_after_free.c:7)
==1234==  Address 0x5201040 is 0 bytes inside a block of size 4 free'd
```

It even shows where the block was freed.

#### Step 6. Detecting Double Free

```
#include <stdlib.h>
int main(void) {
    int *p = malloc(4);
    free(p);
    free(p);
}
```

Valgrind output:

```
==1234== Invalid free() / delete / delete[]
==1234==    at 0x4845DEF: free (vg_replace_malloc.c:872)
==1234==  Address 0x5201040 was freed previously
```

#### Step 7. Memory Leak Categories

Valgrind divides leaks into categories:

| Type | Meaning |
| --- | --- |
| definitely lost | No pointer to the block remains, true leak |
| indirectly lost | Referenced by a leaked block |
| possibly lost | Pointer may exist but Valgrind can’t confirm |
| still reachable | Program ended but memory wasn’t freed (often harmless) |

#### Step 8. Getting a Clean Report

To check for true leaks only:

```
valgrind --leak-check=full --show-leak-kinds=definite ./program
```

For more verbose tracking:

```
valgrind --track-origins=yes ./program
```

That flag tells you where an uninitialized variable first appeared.

#### Step 9. Checking for Stack or Uninitialized Values

```
#include <stdio.h>
int main(void) {
    int x;
    printf("%d\n", x); // uninitialized read
}
```

Valgrind output:

```
==1234== Use of uninitialised value of size 4
==1234==    at 0x1091A: main (uninit.c:5)
```

Always initialize your variables!

#### Step 10. Tiny Code: Leak Detector

```
#include <stdlib.h>
void leak1(void) { malloc(100); }
void leak2(void) { char *p = malloc(50); free(p); }
int main(void) {
    leak1();
    leak2();
}
```

Run:

```
valgrind --leak-check=full ./leaks
```

Output:

```
==1234== 100 bytes in 1 blocks are definitely lost in loss record 1 of 1
==1234== LEAK SUMMARY:
==1234==    definitely lost: 100 bytes in 1 blocks
```

Only`leak1()` forgot to`free()`, Valgrind pinpointed it exactly.

#### Why It Matters

Valgrind helps you:

- Find hidden memory leaks
- Detect invalid pointer usage
- Catch uninitialized values
- Write safer, cleaner, more reliable C

It’s an essential tool in your workflow, especially for long-running programs, servers, or systems software.

#### Try It Yourself

Write a program that allocates multiple blocks and forgets to free one.

Intentionally use`p[10]` on a`malloc(10)` block.

Trigger a use-after-free and find it in Valgrind.

Use`--track-origins=yes` to trace uninitialized data.

Refactor your code until Valgrind reports:

```
All heap blocks were freed -- no leaks are possible
```

Next, you’ll explore Assertions and Defensive Programming, techniques to catch logic errors before they reach runtime crashes.
