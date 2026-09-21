---
title: "95. Implementing a Custom Allocator"
date: "2026-07-04"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "Building Real Projects"
description: "The Little Book of C — 95. Implementing a Custom Allocator"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
section: 95
sidebarWeight: 95
lang: "en-US"
alternateEn: "/posts/c教程/en-US/10-Building Real Projects/095-Implementing a Custom Allocator"
alternateZh: "/posts/c教程/zh-CN/10-真实项目/095-Implementing a Custom Allocator"
---
[中文版本](/posts/c教程/zh-CN/10-真实项目/095-Implementing a Custom Allocator)

Every C program eventually asks the operating system for memory, but`malloc` and`free` are not magic—they are layers above system calls like`brk` and`mmap`. In this section, you will build your own custom memory allocator—a simple arena allocator that grabs a large block of memory once and doles it out efficiently.

You’ll see how real allocators work inside kernels, games, and embedded systems.

#### Step 1. The Goal

We’ll implement a minimal arena allocator that:

- Allocates from a preallocated block
- Never frees individual objects
- Resets all memory at once when the arena is cleared

This model is perfect for short-lived data structures, parsing, and high-performance applications.

#### Step 2. Design

An arena allocator tracks:

- The base pointer (start of memory)
- The current pointer (next free position)
- The capacity (total size of the arena)

When you allocate, it simply bumps the pointer forward.

Structure:

```
typedef struct {
    unsigned char *base;
    size_t capacity;
    size_t offset;
} Arena;
```

#### Step 3. Tiny Code: Minimal Arena

```
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdint.h>
typedef struct {
    unsigned char *base;
    size_t capacity;
    size_t offset;
} Arena;
Arena *arena_create(size_t capacity) {
    Arena *a = malloc(sizeof(Arena));
    if (!a) return NULL;
    a->base = malloc(capacity);
    if (!a->base) { free(a); return NULL; }
    a->capacity = capacity;
    a->offset = 0;
    return a;
}
void *arena_alloc(Arena *a, size_t size) {
    if (a->offset + size > a->capacity) return NULL;
    void *ptr = a->base + a->offset;
    a->offset += size;
    return ptr;
}
void arena_reset(Arena *a) {
    a->offset = 0;
}
void arena_free(Arena *a) {
    free(a->base);
    free(a);
}
```

#### Step 4. Example Use

```
int main(void) {
    Arena *arena = arena_create(1024);
    if (!arena) {
        fprintf(stderr, "Failed to create arena\n");
        return 1;
    }
    int *arr = arena_alloc(arena, 10 * sizeof(int));
    if (!arr) {
        fprintf(stderr, "Allocation failed\n");
        arena_free(arena);
        return 1;
    }
    for (int i = 0; i < 10; i++) arr[i] = i * i;
    printf("Squares: ");
    for (int i = 0; i < 10; i++) printf("%d ", arr[i]);
    printf("\n");
    arena_reset(arena);  // all memory reused
    arena_free(arena);
    return 0;
}
```

#### Step 5. How It Works

1. `arena_create` grabs one large block from`malloc`.
2. `arena_alloc` hands out memory by increasing an offset—no per-object metadata.
3. `arena_reset` rewinds the arena to reuse the memory instantly.
4. `arena_free` releases the entire block in one call.

This is O(1) for every allocation, with zero fragmentation.

#### Step 6. Adding Alignment

Sometimes allocations must be aligned (for example, 16-byte alignment for SIMD). We can round up the offset to the nearest alignment boundary.

```
static size_t align_up(size_t n, size_t align) {
    return (n + (align - 1)) & ~(align - 1);
}
void *arena_alloc_aligned(Arena *a, size_t size, size_t align) {
    size_t new_offset = align_up(a->offset, align);
    if (new_offset + size > a->capacity) return NULL;
    void *ptr = a->base + new_offset;
    a->offset = new_offset + size;
    return ptr;
}
```

#### Step 7. Debugging Helpers

Add diagnostic printing to understand usage:

```
void arena_stats(Arena *a) {
    printf("Arena used: %zu / %zu bytes (%.1f%%)\n",
           a->offset, a->capacity,
           (a->offset * 100.0) / a->capacity);
}
```

#### Step 8. Advanced Idea: Nested Arenas

You can make sub-arenas for scoped memory:

```
typedef struct {
    Arena *parent;
    size_t start;
} ArenaScope;
ArenaScope arena_push(Arena *a) {
    return (ArenaScope){ .parent = a, .start = a->offset };
}
void arena_pop(ArenaScope s) {
    s.parent->offset = s.start;
}
```

This lets you “temporarily allocate” for a function or block and reset automatically.

#### Step 9. Why It Matters

Allocators define how performance feels in large systems. By writing one, you understand:

- How`malloc` and`free` manage metadata
- How fragmentation occurs
- How specialized allocators (arenas, pools, slabs) achieve speed and predictability

Games, web servers, and compilers all use custom allocators to control lifetime and avoid overhead.

#### Step 10. Try It Yourself

1. Add bounds checking that prints errors when overrun.
2. Implement a pool allocator for fixed-size objects (e.g.,`struct Node`).
3. Use`mmap` to request anonymous memory directly from the OS.
4. Add a leak detector that reports unfreed bytes at shutdown.
5. Combine multiple arenas into a hierarchical allocator.

Next you’ll build 96. Writing a Text Parser, using your allocator to manage short-lived strings and tokens as you build a mini lexer and parser in pure C.
