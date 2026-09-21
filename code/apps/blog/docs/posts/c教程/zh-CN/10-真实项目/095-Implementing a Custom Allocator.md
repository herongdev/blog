---
title: "95. 实现自定义分配器"
date: "2026-07-04"
lang: "zh-CN"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "10-真实项目"
  - "中文"
description: "The Little Book of C 中文版 — 95. 实现自定义分配器"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
translator: "机器辅助翻译（Google Translate）"
section: 95
sidebarWeight: 95
alternateZh: "/posts/c教程/zh-CN/10-真实项目/095-Implementing a Custom Allocator"
alternateEn: "/posts/c教程/en-US/10-Building Real Projects/095-Implementing a Custom Allocator"
---

[English version](/posts/c教程/en-US/10-Building Real Projects/095-Implementing a Custom Allocator)

每个 C 程序最终都会向操作系统请求内存，但是`malloc`和`free`不是魔法——它们是系统调用之上的层，例如`brk`和`mmap`。在本节中，您将构建自己的自定义内存分配器 - 一个简单的 arena 分配器，它一次抓取一大块内存并有效地将其分配出去。

您将看到真正的分配器如何在内核、游戏和嵌入式系统中工作。

#### 步骤 1. 目标

我们将实现一个最小的竞技场分配器：

- 从预分配块中分配
- 从不释放单个对象
- 当竞技场被清除时立即重置所有内存

该模型非常适合短期数据结构、解析和高性能应用程序。

#### 步骤 2. 设计

竞技场分配器跟踪：

- 基址指针（内存的开始）
- 当前指针（下一个空闲位置）
- 容量（竞技场的总面积）

当您分配时，它只是将指针向前移动。

结构：

```
typedef struct {
    unsigned char *base;
    size_t capacity;
    size_t offset;
} Arena;
```

#### 步骤 3. 小代码：最小竞技场

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

#### 步骤 4. 示例使用

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

#### 第 5 步：如何运作

1.`arena_create`抢了一大块`malloc`.
2.`arena_alloc`通过增加偏移量来分配内存——没有每个对象的元数据。
3.`arena_reset`倒带竞技场以立即重用内存。
4.`arena_free`在一次调用中释放整个块。

每次分配都是 O(1)，碎片为零。

#### 步骤 6. 添加对齐

有时分配必须对齐（例如，SIMD 的 16 字节对齐）。我们可以将偏移量四舍五入到最近的对齐边界。

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

#### 步骤 7. 调试助手

添加诊断打印以了解用法：

```
void arena_stats(Arena *a) {
    printf("Arena used: %zu / %zu bytes (%.1f%%)\n",
           a->offset, a->capacity,
           (a->offset * 100.0) / a->capacity);
}
```

#### 步骤 8.高级想法：嵌套竞技场

您可以为作用域内存创建子区域：

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

这使您可以“临时分配”函数或块并自动重置。

#### 第 9 步：为什么它很重要

分配器定义了大型系统中的性能感受。通过写一篇，你就会明白：

- 如何`malloc`和`free`管理元数据
- 碎片是如何发生的
- 专门的分配器（arena、pool、slab）如何实现速度和可预测性

游戏、Web 服务器和编译器都使用自定义分配器来控制生命周期并避免开销。

#### 第 10 步：亲自尝试一下

1. 添加边界检查，在溢出时打印错误。
2. 为固定大小的对象实现一个池分配器（例如，`struct Node`).
3. 使用`mmap`直接从操作系统请求匿名内存。
4. 添加一个泄漏检测器，报告关机时未释放的字节。
5. 将多个 arena 组合成一个分层分配器。

接下来，您将构建 96。编写一个文本解析器，在用纯 C 构建迷你词法分析器和解析器时，使用分配器来管理短期字符串和标记。
