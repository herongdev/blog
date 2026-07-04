---
title: "80. Practice: Fix Memory and Logic Bugs"
date: "2026-07-04"
categories: "[C 教程]"
tags: "[C, Little Book of C, Debugging Testing Profiling]"
description: "The Little Book of C — 80. Practice: Fix Memory and Logic Bugs"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
section: "80"
sidebarWeight: "80"
lang: "en-US"
alternateEn: "/posts/c教程/en-US/08-Debugging Testing Profiling/080-Practice Fix Memory and Logic Bugs"
alternateZh: "/posts/c教程/zh-CN/08-调试测试与 profiling/080-Practice Fix Memory and Logic Bugs"
---
[中文版本](/posts/c教程/zh-CN/08-调试测试与 profiling/080-Practice Fix Memory and Logic Bugs)

#### Follow-Along Deliverable

- Assumed state: lessons 071-079 are complete and you can rebuild the previous example.
- Working directory: `~/c-course-labs/080-debug-lab`.
- First command: on macOS / Linux run `mkdir -p ~/c-course-labs/080-debug-lab && cd ~/c-course-labs/080-debug-lab`; on Windows PowerShell run `New-Item -ItemType Directory -Force "$HOME\c-course-labs\080-debug-lab"; Set-Location "$HOME\c-course-labs\080-debug-lab"`.
- Success evidence: keep the source file, executable, `evidence.md`, and record before-fix failure, diagnosis method, after-fix output, and memory-check or assertion result.
- Boundary for this lab: This lab is about repair evidence, not feature count. A full test framework or CI pipeline is out of scope.
- Reset: remove the executable, temporary data, and generated output for this lab; keep source and `evidence.md` for review.

Now it’s time to apply everything you’ve learned, debugging, testing, assertions, logging, and analysis, to real code that’s broken. This section walks you through a handful of small, common C bugs that new programmers (and even experienced ones) run into, showing how to find, understand, and fix them.

#### Step 1. Bug #1, Segmentation Fault from a Bad Pointer

Buggy Code:

```
#include <stdio.h>
int main(void) {
    int *p;
    *p = 10;  // writing to uninitialized pointer
    printf("%d\n", *p);
}
```

Symptom:

```
Segmentation fault (core dumped)
```

Diagnosis:

- The pointer`p` is never initialized.
- It points to an undefined address.

Fix:

```
#include <stdio.h>
int main(void) {
    int x = 10;
    int *p = &x;
    printf("%d\n", *p);
}
```

Lesson: Always initialize pointers before use. If dynamic, allocate with`malloc()` and check for`NULL`.

#### Step 2. Bug #2, Memory Leak

Buggy Code:

```
#include <stdlib.h>
void leak(void) {
    int *arr = malloc(10 * sizeof(int));
    for (int i = 0; i < 10; i++) arr[i] = i;
    // forgot to free
}
int main(void) {
    for (int i = 0; i < 10000; i++) leak();
}
```

Diagnosis: Each call to`leak()` allocates memory and never frees it. Use Valgrind to confirm:

```
valgrind ./a.out
```

Fix:

```
void leak(void) {
    int *arr = malloc(10 * sizeof(int));
    if (!arr) return;
    for (int i = 0; i < 10; i++) arr[i] = i;
    free(arr);
}
```

Lesson: Every`malloc()` needs a matching`free()`, no exceptions.

#### Step 3. Bug #3, Off-by-One Error

Buggy Code:

```
#include <stdio.h>
int main(void) {
    int nums[5] = {0, 1, 2, 3, 4};
    for (int i = 0; i <= 5; i++)  // ❌ should be < 5
        printf("%d ", nums[i]);
}
```

Symptom: Sometimes prints garbage or segfaults.

Fix:

```
for (int i = 0; i < 5; i++)
```

Lesson: Off-by-one errors are the most common bug in loops. Always check your boundary conditions carefully.

#### Step 4. Bug #4, Use-After-Free

Buggy Code:

```
#include <stdio.h>
#include <stdlib.h>
int main(void) {
    int *x = malloc(sizeof(int));
    *x = 5;
    free(x);
    printf("%d\n", *x);  // ❌ accessing freed memory
}
```

Fix:

```
free(x);
x = NULL;
```

Now:

```
if (x) printf("%d\n", *x);
```

Lesson: Once you free memory, it’s no longer yours, never touch it again.

#### Step 5. Bug #5, Stack Variable Escaping Scope

Buggy Code:

```
int *make_ptr(void) {
    int x = 10;
    return &x;  // ❌ pointer to local variable
}
int main(void) {
    int *p = make_ptr();
    printf("%d\n", *p);  // UB
}
```

Fix:

```
int *make_ptr(void) {
    int *x = malloc(sizeof(int));
    *x = 10;
    return x;
}
```

and remember to`free(p)` later.

Lesson: Never return the address of a local variable, its lifetime ends when the function returns.

#### Step 6. Bug #6, Missing Return Statement

Buggy Code:

```
int add(int a, int b) {
    int c = a + b;
    // forgot to return
}
int main(void) {
    printf("%d\n", add(2, 3));
}
```

Fix:

```
return c;
```

Lesson: If the function’s return type is non-`void`, always return a value. Compile with`-Wall -Wextra` to catch this automatically.

#### Step 7. Bug #7, Uninitialized Variable

Buggy Code:

```
int sum(void) {
    int s;
    for (int i = 0; i < 3; i++) s += i;  // s not initialized
    return s;
}
```

Fix:

```
int s = 0;
```

Lesson: Initialize all variables before using them, especially accumulators.

#### Step 8. Bug #8, Mixing Signed and Unsigned

Buggy Code:

```
#include <stdio.h>
int main(void) {
    int a = -1;
    unsigned int b = 1;
    if (a < b) printf("less\n"); else printf("greater\n");
}
```

Output:

```
greater
```

Explanation:`a` is converted to unsigned, so it becomes a large positive number.

Fix: Avoid mixing signed and unsigned types. Use explicit casts or consistent types.

#### Step 9. Bug #9, Buffer Overflow

Buggy Code:

```
#include <stdio.h>
#include <string.h>
int main(void) {
    char name[8];
    strcpy(name, "Superlongname");  // ❌ too big
    printf("%s\n", name);
}
```

Fix:

```
strncpy(name, "Superlongname", sizeof(name) - 1);
name[7] = '\0';
```

Lesson: Never trust input size, always use bounded functions.

#### Step 10. Bug #10, Floating-Point Comparison

Buggy Code:

```
#include <stdio.h>
int main(void) {
    float a = 0.1f * 3;
    if (a == 0.3f) printf("Equal\n");
    else printf("Not equal\n");
}
```

Output:

```
Not equal
```

Fix:

```
if (fabsf(a - 0.3f) < 1e-6) printf("Equal\n");
```

Lesson: Floating-point math is approximate, always compare with a tolerance.

#### Putting It All Together

You can combine all these techniques:

- Use assertions to catch impossible states.
- Use logging to trace events.
- Run Valgrind or ASan to detect memory bugs.
- Use unit tests to verify correctness.
- And if it still crashes, analyze the core dump.

Every debugging tool is a lens. Use them together to see clearly.

#### Why It Matters

Debugging teaches you how programs fail. Each bug fixed makes you a more confident systems engineer. C doesn’t forgive mistakes, but it rewards precision.

#### Try It Yourself

1. Write a program containing at least 3 of these bugs.
2. Run it under AddressSanitizer (`-fsanitize=address`).
3. Fix each bug one by one.
4. Document what caused it and what fixed it.
5. Make this a personal debugging kata, practice until no bug survives longer than 10 minutes.

Next, we’ll begin Chapter 9: Portable and Modern C, where you’ll learn how to write C that runs everywhere, from embedded chips to modern servers.
