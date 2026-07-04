---
title: "79. Code Review Checklist for C Projects"
date: "2026-07-04"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "Debugging Testing Profiling"
description: "The Little Book of C — 79. Code Review Checklist for C Projects"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
section: 79
sidebarWeight: 79
lang: "en-US"
alternateEn: "/posts/c教程/en-US/08-Debugging Testing Profiling/079-Code Review Checklist for C Projects"
alternateZh: "/posts/c教程/zh-CN/08-调试测试与 profiling/079-Code Review Checklist for C Projects"
---
[中文版本](/posts/c教程/zh-CN/08-调试测试与 profiling/079-Code Review Checklist for C Projects)

Before your C program ships to production (or even your homework submission), it should survive one last test, a code review. This is where you or your teammates look at the code not just for correctness, but for clarity, safety, and maintainability.

Think of this as your personal pilot checklist before takeoff. Every great C programmer has one.

#### Step 1. Readability and Structure

- Are files organized logically (`src/`,`include/`,`tests/`)?
- Are headers clean, with include guards?
- Are functions short and focused (one purpose each)?
- Are names meaningful (`count_users()` is better than`doit()`)?
- Is indentation consistent and readable?
- Are comments clear and relevant, not just noise?

Tiny Code Example:

```
// Bad
void d(int a, int b) { printf("%d\n", a+b); }
// Good
void print_sum(int a, int b) {
    printf("%d\n", a + b);
}
```

Readable code explains itself.

#### Step 2. Header Hygiene

- Each`.h` file must have an include guard:

```
#ifndef MATH_UTILS_H
#define MATH_UTILS_H
// declarations
#endif
```

- Headers should declare, not define.
- No global variables unless justified.
- Use`static inline` carefully (for small utilities only).

#### Step 3. Memory Safety

- Every`malloc` must have a corresponding`free`.
- Check all allocation results:

```
p = malloc(size);
if (!p) { perror("malloc"); exit(1); }
```

- Avoid dangling pointers:

```
free(p);
p = NULL;
```

- Use Valgrind or AddressSanitizer to ensure no leaks.

#### Step 4. Pointer Discipline

- Check for null pointers before dereferencing.
- Don’t return pointers to local variables:

```
int* bad(void) {
    int x = 10;
    return &x; // wrong: stack memory
}
```

- Document ownership: who allocates, who frees.

#### Step 5. Error Handling

- Always check function return values:

```
if (fwrite(buf, 1, len, file) != len) {
    perror("fwrite");
}
```

- Use meaningful error messages.
- Prefer returning error codes over silently ignoring failures.
- For libraries, use`errno` or your own error enums.

#### Step 6. Undefined Behavior Prevention

- No uninitialized variables.
- No out-of-bounds array access.
- No signed integer overflow.
- No use-after-free.
- Compile with:

```
gcc -Wall -Wextra -Wpedantic -fsanitize=undefined,address
```

Fix all warnings, treat them as errors.

#### Step 7. Portability

- Don’t assume`int` is 32 bits or`char` is signed.
- Use`<stdint.h>` types (`int32_t`,`uint64_t`).
- Use`size_t` for sizes and indexing.
- Avoid platform-specific APIs unless wrapped.
- Test on multiple compilers (`gcc`,`clang`,`tinycc`).

#### Step 8. Testing and Validation

- Every function that can fail must have at least one test.
- Edge cases: empty input, zero values, large input.
- Tests should run automatically:

```
make test
```

- Compare results with known-good output.
- Document how to reproduce test results.

#### Step 9. Documentation

- Add a short header to every file:

```
/* math_utils.c
 * Simple math helpers.
 * Author: Your Name
 * License: MIT
 */
```

- Comment tricky code, but not the obvious.
- Maintain a`README.md` explaining build and run steps.
- Version your code (Git). Write meaningful commit messages.

#### Step 10. Tiny Code: Applying the Checklist

Let’s check a small example:

Original:

```
int *make_array(int n){
  int arr[n]; for(int i=0;i<n;i++) arr[i]=i; return arr;
}
```

Review notes:

- Returns pointer to local array → UB
- Magic loop style → unreadable
- Missing input validation

Fixed:

```
#include <stdlib.h>
#include <stdio.h>
int *make_array(int n) {
    if (n <= 0) return NULL;
    int *arr = malloc(n * sizeof(int));
    if (!arr) { perror("malloc"); return NULL; }
    for (int i = 0; i < n; i++) arr[i] = i;
    return arr;
}
```

Passes checklist ✅

- Safe, clear, and portable.

#### Why It Matters

A checklist builds discipline and consistency. It ensures:

- Clean, maintainable code.
- Fewer crashes and leaks.
- Easier debugging and onboarding.
- Long-term stability in complex systems.

Every high-quality C project uses one, from open-source libraries to kernels.

#### Try It Yourself

1. Take one of your old C programs and review it using this checklist.
2. Fix memory leaks, add error checks, clean up naming.
3. Compile with all warnings on.
4. Run it through AddressSanitizer or Valgrind.
5. Document everything, then repeat for your next project.

Next, you’ll wrap up this debugging chapter with a hands-on practice session: fixing real memory and logic bugs step by step.
