---
title: "83. Inline Assembly and Hardware Access"
date: "2026-07-04"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "Portable and Modern C"
description: "The Little Book of C — 83. Inline Assembly and Hardware Access"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
section: 83
sidebarWeight: 83
lang: "en-US"
alternateEn: "/posts/c教程/en-US/09-Portable and Modern C/083-Inline Assembly and Hardware Access"
alternateZh: "/posts/c教程/zh-CN/09-可移植与现代 C/083-Inline Assembly and Hardware Access"
---
[中文版本](/posts/c教程/zh-CN/09-可移植与现代 C/083-Inline Assembly and Hardware Access)

C gives you precise control over memory and performance, but sometimes you need to go one level deeper, directly to the CPU. That’s where inline assembly comes in: embedding assembly language inside your C code to optimize performance or access hardware-level features.

This chapter will show how to mix C and assembly safely, portably, and meaningfully.

#### Step 1. What Is Inline Assembly?

Inline assembly lets you insert small snippets of machine instructions into your C program. You can use it to:

- Access CPU instructions not exposed by C.
- Optimize performance-critical paths.
- Implement hardware drivers or low-level routines.

However, it’s also non-portable and compiler-specific, so use it sparingly and isolate it behind clean C interfaces.

#### Step 2. Two Common Flavors

GCC / Clang syntax (AT&T or Intel style) Uses the`asm` or`__asm__` keyword.

MSVC syntax Uses`__asm { ... }` inside functions.

We’ll focus on GCC/Clang syntax, since it’s used in most systems programming contexts.

#### Step 3. Basic Inline Assembly Example

Tiny Code: Print CPU ID register (x86 only)

```
#include <stdio.h>
int main(void) {
    unsigned int eax, ebx, ecx, edx;
    eax = 0;
    __asm__ __volatile__(
        "cpuid"
        : "=a"(eax), "=b"(ebx), "=c"(ecx), "=d"(edx)
        : "a"(0)
    );
    printf("CPU Vendor: %.4s%.4s%.4s\n",
           (char*)&ebx, (char*)&edx, (char*)&ecx);
}
```

Explanation:

- `cpuid` is a CPU instruction that fills registers with information.
- `"=a"(eax)` means “store the output of register`eax` into variable`eax`.”
- `: "a"(0)` means “put 0 into`eax` before running the instruction.”
- The`__volatile__` keyword tells the compiler not to optimize it away.

#### Step 4. GCC Inline Assembly Syntax

General form:

```
asm volatile ("instruction list"
              : output_operands
              : input_operands
              : clobbered_registers);
```

Example:

```
asm volatile ("addl %%ebx, %%eax"
              : "=a"(result)
              : "a"(x), "b"(y));
```

Explanation:

- `"addl %%ebx, %%eax"`, assembly instruction
- `"=a"(result)`, output in`eax` goes to`result`
- `"a"(x), "b"(y)`, inputs: put`x` in`eax`,`y` in`ebx`

#### Step 5. Reading CPU Cycle Counters

Tiny Code: Measure CPU cycles between operations

```
#include <stdio.h>
unsigned long long rdtsc(void) {
    unsigned int lo, hi;
    __asm__ __volatile__("rdtsc" : "=a"(lo), "=d"(hi));
    return ((unsigned long long)hi << 32) | lo;
}
int main(void) {
    unsigned long long start = rdtsc();
    for (volatile int i = 0; i < 1000000; i++);
    unsigned long long end = rdtsc();
    printf("Cycles: %llu\n", end - start);
}
```

Explanation:

- `rdtsc` reads the CPU’s timestamp counter.
- It’s a precise measure of time in CPU cycles, great for microbenchmarking.

#### Step 6. Writing to I/O Ports (Embedded or Kernel Context)

If you’re writing embedded code or OS kernels, you often interact with hardware registers directly.

Example (x86, privileged mode only):

```
static inline void outb(unsigned short port, unsigned char value) {
    __asm__ __volatile__("outb %0, %1" : : "a"(value), "Nd"(port));
}
```

This writes a byte to an I/O port, used for devices like serial ports, timers, or PIC controllers.

In user-space, you generally can’t do this (needs kernel privileges).

#### Step 7. Memory Barriers and CPU Fences

When working with concurrency or hardware, you may need to control instruction ordering.

```
__asm__ __volatile__("mfence" ::: "memory");
```

This tells the CPU and compiler not to reorder memory operations, essential for writing thread-safe or device-control code at the hardware level.

#### Step 8. Register Constraints

GCC lets you specify which registers to use.

| Constraint | Register | Meaning |
| --- | --- | --- |
| `"a"` | `eax` | accumulator |
| `"b"` | `ebx` | base |
| `"c"` | `ecx` | counter |
| `"d"` | `edx` | data |
| `"S"` | `esi` | source index |
| `"D"` | `edi` | destination index |

Example:

```
asm("mul %1" : "=a"(res) : "r"(x));
```

The`"r"` constraint lets the compiler choose any register.

#### Step 9. Mixing Assembly and C Functions

You can write small routines in separate`.S` files (pure assembly) and call them from C:

```
# file: add.S
.global add_two
add_two:
    addl %esi, %edi
    movl %edi, %eax
    ret
```

Then in C:

```
int add_two(int a, int b);
int main(void) {
    printf("%d\n", add_two(5, 7));
}
```

This hybrid style is used in OS kernels, bootloaders, and math libraries.

#### Step 10. Tiny Code: Inline Assembly Add Function

```
#include <stdio.h>
int add_fast(int a, int b) {
    int result;
    __asm__ ("addl %1, %0" : "=r"(result) : "r"(b), "0"(a));
    return result;
}
int main(void) {
    printf("%d\n", add_fast(3, 5));
}
```

The`"0"(a)` constraint tells the compiler to use the same register for input and output.

#### Why It Matters

Inline assembly teaches you what really happens beneath your C code. Even if you rarely use it, understanding it helps you:

- Read compiler-generated assembly (`gcc -S`)
- Optimize performance-critical code
- Understand how system calls, context switches, and kernel traps work

It’s where software meets hardware, the true metal of computing.

#### Try It Yourself

1. Write a small inline assembly snippet that swaps two integers.
2. Print the CPU vendor string with`cpuid`.
3. Use`rdtsc()` to benchmark your function.
4. Inspect compiler-generated assembly using`gcc -S`.
5. Try to reimplement a basic math operation in assembly and compare performance.

Next, you’ll learn cross-compilation, how to build your C programs for other architectures and systems, from your own machine.
