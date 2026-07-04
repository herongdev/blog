---
title: "77. Common Undefined Behaviors"
date: "2026-07-04"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "Debugging Testing Profiling"
description: "The Little Book of C — 77. Common Undefined Behaviors"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
section: 77
sidebarWeight: 77
lang: "en-US"
alternateEn: "/posts/c教程/en-US/08-Debugging Testing Profiling/077-Common Undefined Behaviors"
alternateZh: "/posts/c教程/zh-CN/08-调试测试与 profiling/077-Common Undefined Behaviors"
---
[中文版本](/posts/c教程/zh-CN/08-调试测试与 profiling/077-Common Undefined Behaviors)

C gives you freedom, but also responsibility. Unlike higher-level languages, C doesn’t protect you from dangerous mistakes. Some actions cause undefined behavior (UB): the compiler is allowed to do anything in response, crash, hang, or even appear to work fine until it doesn’t.

Undefined behavior is what makes C both powerful and perilous. Let’s explore what causes it, how to recognize it, and how to write code that never falls into its traps.

#### Step 1. What Is Undefined Behavior?

In the C standard, undefined behavior means “no rules apply.” If your program does something the language doesn’t define, the compiler can assume it never happens and optimize freely.

This means your program might:

- Crash immediately.
- Produce wrong results.
- Behave differently each time.
- Work fine on one compiler and fail on another.

Example:

```
int x = 5 / 0;  // UB: division by zero
```

The compiler is not required to warn you or handle this safely.

#### Step 2. Common Sources of UB

Here are the most frequent offenders every C programmer must know:

| Category | Example |
| --- | --- |
| Out-of-bounds access | `arr[10]` when the array has 10 elements |
| Use of uninitialized variable | `int x; printf("%d", x);` |
| Dangling pointer access | Use memory after`free()` |
| Invalid pointer arithmetic | `(p + 5)` when`p` doesn’t point into an array |
| Signed integer overflow | `int x = INT_MAX + 1;` |
| Modifying and reading same variable | `i = i++;` or`a[i] = i++;` |
| Null pointer dereference | `int *p = NULL; *p = 5;` |
| Incorrect type punning | Accessing a float as int through wrong pointer type |
| Mismatched`malloc`/`free` | `free()` memory not allocated by`malloc()` |
| Violating`const` or`volatile` contracts | Writing to a`const` variable |

#### Step 3. Out-of-Bounds Access

```
int arr[3] = {1, 2, 3};
printf("%d\n", arr[3]);  // UB: index 3 is past the end
```

C doesn’t check bounds, you’re responsible for it. You might print garbage, crash, or accidentally overwrite another variable.

Always check:

```
if (index >= 0 && index < size)
    printf("%d\n", arr[index]);
```

#### Step 4. Using Uninitialized Variables

```
int x;
printf("%d\n", x);  // UB: x is uninitialized
```

Even if it prints`0`, that’s luck, not correctness. Always initialize your variables explicitly:

```
int x = 0;
```

#### Step 5. Dangling Pointers

```
int *p = malloc(sizeof(int));
*p = 10;
free(p);
printf("%d\n", *p);  // UB: accessing freed memory
```

After`free()`, the pointer still exists but the memory doesn’t belong to you. Set it to`NULL`:

```
free(p);
p = NULL;
```

#### Step 6. Signed Integer Overflow

In C, signed overflow is undefined, but unsigned overflow wraps around predictably.

```
int x = 2147483647;
x = x + 1;  // UB
```

Unsigned version:

```
unsigned int x = 4294967295;
x = x + 1;  // wraps to 0 (defined)
```

To check overflow safely:

```
if (a > INT_MAX - b) {
    printf("overflow\n");
} else {
    x = a + b;
}
```

#### Step 7. Modifying and Reading in One Expression

```
int i = 0;
i = i++ + 1;  // UB: reading and writing i without sequence point
```

Avoid combining side effects. Write clean code:

```
i++;
i = i + 1;
```

#### Step 8. Null Pointer Dereference

```
int *p = NULL;
*p = 10;  // UB
```

Always validate pointers:

```
if (p != NULL) *p = 10;
```

#### Step 9. Type Punning and Aliasing

```
float f = 3.14;
int *ip = (int *)&f;  // UB: violates strict aliasing
printf("%d\n", *ip);
```

If you must reinterpret bytes, use`memcpy`:

```
int i;
memcpy(&i, &f, sizeof(i));
```

This avoids aliasing violations and is safe across compilers.

#### Step 10. Tiny Code: Detecting UB with Tools

Use compilers and runtime checkers to detect UB before it hits production.

```
gcc -fsanitize=undefined -g ub_example.c -o ub_example
./ub_example
```

Sample program:

```
#include <stdio.h>
int main(void) {
    int x = 2147483647;
    x++;
    printf("%d\n", x);
}
```

Output:

```
runtime error: signed integer overflow: 2147483647 + 1 cannot be represented in type 'int'
```

This is the Undefined Behavior Sanitizer (UBSan) in action, your best friend for finding invisible bugs.

#### Why It Matters

Undefined behavior is silent corruption. It can:

- Work on your machine but fail elsewhere.
- Break when you change compiler flags.
- Cause subtle, unpredictable bugs.

Avoiding UB is the foundation of reliable systems programming. In C, correctness comes from discipline.

#### Try It Yourself

1. Write a small program with deliberate UB (like using uninitialized variables).
2. Run it with`-fsanitize=undefined`.
3. Fix each issue until UBSan runs clean.
4. Check array access and pointer validity.
5. Refactor old C code to avoid UB, it’s a great debugging exercise.

Next, you’ll learn how to perform crash analysis and read core dumps, so even when your program fails, you can find out exactly why.
