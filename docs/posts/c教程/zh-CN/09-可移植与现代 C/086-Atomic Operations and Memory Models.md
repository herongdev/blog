---
title: "86. 原子操作和内存模型"
date: "2026-07-04"
lang: "zh-CN"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "09-可移植与现代 C"
  - "中文"
description: "The Little Book of C 中文版 — 86. 原子操作和内存模型"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
translator: "机器辅助翻译（Google Translate）"
section: 86
sidebarWeight: 86
alternateZh: "/posts/c教程/zh-CN/09-可移植与现代 C/086-Atomic Operations and Memory Models"
alternateEn: "/posts/c教程/en-US/09-Portable and Modern C/086-Atomic Operations and Memory Models"
---

[English version](/posts/c教程/en-US/09-Portable and Modern C/086-Atomic Operations and Memory Models)

当多个线程共享数据时，您通常使用锁来保护该数据，例如`pthread_mutex_t`。但有时，您需要更快的速度，一种即使跨线程也不能中断的执行更新的方法。这就是原子操作的用武之地。

本节介绍 C 语言中的原子操作以及内存模型如何确保程序在多个内核之间的行为可预测。

#### 步骤 1.“原子”是什么意思？

原子操作是一次性发生的操作，不能被分割或中断。

示例想法：如果两个线程都运行`counter++`同时：

- 没有原子性→竞争条件。
- 具有原子性 → 一个线程的更新在另一个线程开始之前完全完成。

原子操作在无锁算法、并发队列和引用计数器中至关重要。

#### 步骤 2. counter++ 的问题

这行看起来很简单：

```
counter++;
```

但在幕后，它是三个独立的步骤：

1. 负载`counter`从记忆中。
2. 增加它。
3. 将其存放回去。

两个线程同时执行此操作可能会丢失更新：

```
Thread A: load(5)
Thread B: load(5)
Thread A: store(6)
Thread B: store(6)
```

结果：丢失了一个增量，最终值应该是 7，但最终却是 6。

#### 步骤 3. 使用原子类型

C11介绍`<stdatomic.h>`，一种使用原子操作的可移植方式。

```
#include <stdatomic.h>
#include <stdio.h>
int main(void) {
    atomic_int counter = 0;
    atomic_fetch_add(&counter, 1);
    atomic_fetch_add(&counter, 1);
    printf("%d\n", counter); // 2
}
```

没有锁。没有比赛条件。这`atomic_*`函数保证操作在硬件级别是原子的。

#### 步骤 4. 常见原子函数

|功能|描述 |
| --- | --- |
|`atomic_load`|原子读取 |
|`atomic_store`|原子写入 |
|`atomic_fetch_add`|添加并返回旧值 |
|`atomic_fetch_sub`|减去并返回旧值 |
|`atomic_exchange`|替换并返回旧值 |
|`atomic_compare_exchange_strong`|比较和交换 |

例子：

```
atomic_compare_exchange_strong(&counter, &expected, desired);
```

如果`counter == expected`，将其替换为`desired`。否则，更新`expected`与当前值。

#### 步骤 5. 小代码：带线程的原子计数器

```
#include <stdio.h>
#include <pthread.h>
#include <stdatomic.h>
atomic_int counter = 0;
void* work(void* arg) {
    for (int i = 0; i < 100000; i++)
        atomic_fetch_add(&counter, 1);
    return NULL;
}
int main(void) {
    pthread_t t1, t2;
    pthread_create(&t1, NULL, work, NULL);
    pthread_create(&t2, NULL, work, NULL);
    pthread_join(t1, NULL);
    pthread_join(t2, NULL);
    printf("Counter = %d\n", counter);
}
```

输出始终是`200000`，没有互斥锁，也没有数据竞争。

#### 第 6 步：宽松一致性与顺序一致性

原子操作可以有不同的内存顺序。默认情况下，它们是顺序一致的、最强且最安全的排序。

|记忆顺序|意义|
| --- | --- |
|`memory_order_seq_cst`|全局一致顺序（默认） |
|`memory_order_relaxed`|只保证原子性 |
|`memory_order_acquire`|防止加载前重新排序 |
|`memory_order_release`|防止商店后重新订购 |
|`memory_order_acq_rel`|获取+释放组合|

例子：

```
atomic_fetch_add_explicit(&counter, 1, memory_order_relaxed);
```

这更快但更弱，只有当你了解你的内存模型时才使用。

#### 步骤 7. 内存屏障和可见性

现代 CPU 会重新排序读/写以提高性能。原子、栅栏和锁控制更新何时对其他线程可见。

示例：线程 A 写入`ready = 1`。线程B等待直到它看到`ready == 1`。如果编译器重新排序内存操作，线程 B 可能看不到更改。

使用：

```
atomic_thread_fence(memory_order_seq_cst);
```

以防止跨越栅栏重新排序。

#### 步骤 8. 比较和交换 (CAS)

CAS 是无锁数据结构的支柱。

```
int expected = 0;
int desired = 1;
if (atomic_compare_exchange_strong(&counter, &expected, desired)) {
    printf("Swapped!\n");
}
```

它自动检查是否`counter == expected`并更新它，全部通过一条指令完成。这用于构建诸如自旋锁、队列和引用计数器之类的东西。

#### 步骤 9. 使用原子的自旋锁

自旋锁不断检查，直到它可以获得锁。

```
#include <stdatomic.h>
#include <unistd.h>
atomic_flag lock = ATOMIC_FLAG_INIT;
void lock_spin(void) {
    while (atomic_flag_test_and_set(&lock))
        ; // busy wait
}
void unlock_spin(void) {
    atomic_flag_clear(&lock);
}
```

当锁持有时间很短时，这是有效的。如果等待时间较长，请使用`pthread_mutex_t`反而。

#### 步骤 10. 小代码：原子参考计数器

```
#include <stdatomic.h>
#include <stdio.h>
typedef struct {
    atomic_int refcount;
} Object;
void retain(Object* obj) {
    atomic_fetch_add(&obj->refcount, 1);
}
void release(Object* obj) {
    if (atomic_fetch_sub(&obj->refcount, 1) == 1)
        printf("Object freed\n");
}
int main(void) {
    Object obj = { .refcount = 1 };
    retain(&obj);
    release(&obj);
    release(&obj);
}
```

输出：

```
Object freed
```

这就是许多现实世界的系统（例如文件句柄、共享内存）跟踪使用情况的数量。

#### 为什么它很重要

原子操作是无锁编程的构建块。它们允许您编写高性能并发代码，而不会阻塞其他线程。 C 内存模型可以保证即使跨多个 CPU 内核也能推理出正确性。

#### 自己尝试一下

1. 用原子计数器替换互斥计数器。
2. 使用以下方法实现自旋锁`atomic_flag`.
3. 使用`atomic_compare_exchange_strong`构建一个简单的 CAS 循环。
4. 测试之间的差异`memory_order_relaxed`和`seq_cst`.
5. 使用原子构建引用计数结构。

接下来，您将探索将 C 与其他语言 (FFI) 结合使用，以及如何使 C 库可从 Python、Rust 和 Go 调用。
