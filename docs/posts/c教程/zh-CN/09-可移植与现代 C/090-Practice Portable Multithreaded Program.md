---
title: "90. 练习：可移植多线程程序"
date: "2026-07-04"
lang: "zh-CN"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "09-可移植与现代 C"
  - "中文"
description: "The Little Book of C 中文版 — 90. 练习：可移植多线程程序"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
translator: "机器辅助翻译（Google Translate）"
section: "90"
sidebarWeight: "90"
alternateZh: "/posts/c教程/zh-CN/09-可移植与现代 C/090-Practice Portable Multithreaded Program"
alternateEn: "/posts/c教程/en-US/09-Portable and Modern C/090-Practice Portable Multithreaded Program"
---

[English version](/posts/c教程/en-US/09-Portable and Modern C/090-Practice Portable Multithreaded Program)

#### 跟练交付物

- 已具备状态：完成第 081-089 课，能重新编译上一章示例。
- 工作目录：`~/c-course-labs/090-portable-threads`。
- 第一条命令：macOS / Linux 运行 `mkdir -p ~/c-course-labs/090-portable-threads && cd ~/c-course-labs/090-portable-threads`；Windows PowerShell 运行 `New-Item -ItemType Directory -Force "$HOME\c-course-labs\090-portable-threads"; Set-Location "$HOME\c-course-labs\090-portable-threads"`。
- 成功证据：保留源码、可执行文件、`evidence.md`，并记录编译命令、线程运行输出、平台或编译器差异说明。
- 本章边界：本章关注平台差异和并发正确性；Windows 移植可以作为对照记录，不影响主线完成。
- 重置方式：删除本章生成的可执行文件、临时数据和输出文件，保留源码与 `evidence.md` 方便复盘。

是时候将您学到的所有内容（内存管理、线程、同步和可移植性）整合到一个有凝聚力的程序中了。

在第 9 章的最后一节中，您将构建一个可移植的多线程计数器，它可以跨架构、编译器和系统正确运行，从而在实践中展示干净、安全和现代的 C。

#### 步骤 1. 目标

我们将编写一个程序：

- 使用生成多个线程`pthread`（POSIX 标准）。
- 使用原子操作进行安全并发更新。
- 无论 CPU 或字节顺序如何，都打印一致的结果。
- 在 Linux、macOS 和 Windows 上干净地编译（通过 MinGW）。
- 使用现代、可读的 C11–C23 风格。

#### 步骤 2. 规划设计

1. 共享柜台：`atomic_int`用于线程安全的增量。
2. 线程功能：每个线程执行一个增量循环。
3. 计时：测量经过的时间以了解性能。
4. 便携性：使用`#ifdef`以实现跨平台兼容性。
5. 最终验证：确保结果等于总增量。

#### 步骤 3. 完整的小代码

```
#include <stdio.h>
#include <stdlib.h>
#include <stdatomic.h>
#include <pthread.h>
#include <stdint.h>
#include <time.h>
#ifdef _WIN32
#include <windows.h>
#define SLEEP(ms) Sleep(ms)
#else
#include <unistd.h>
#define SLEEP(ms) usleep((ms) * 1000)
#endif
#define THREADS 4
#define ITERATIONS 250000
atomic_int counter = 0;
void* worker(void* arg) {
    int id = *(int*)arg;
    for (int i = 0; i < ITERATIONS; i++) {
        atomic_fetch_add(&counter, 1);
        if (i % 100000 == 0 && id == 0)
            SLEEP(1);
    }
    return NULL;
}
double now(void) {
    struct timespec ts;
    clock_gettime(CLOCK_MONOTONIC, &ts);
    return ts.tv_sec + ts.tv_nsec / 1e9;
}
int main(void) {
    pthread_t threads[THREADS];
    int ids[THREADS];
    double start = now();
    for (int i = 0; i < THREADS; i++) {
        ids[i] = i;
        if (pthread_create(&threads[i], NULL, worker, &ids[i]) != 0) {
            perror("pthread_create failed");
            return 1;
        }
    }
    for (int i = 0; i < THREADS; i++)
        pthread_join(threads[i], NULL);
    double end = now();
    printf("Counter = %d (expected %d)\n", counter, THREADS * ITERATIONS);
    printf("Elapsed time: %.3f seconds\n", end - start);
    return 0;
}
```

#### 步骤 4. 工作原理

原子计数器：`atomic_fetch_add`确保增量是原子的且无竞争的，无需使用互斥体。

线程创建：每个线程运行`worker()`独立运作。

同步：`pthread_join`确保所有线程在打印结果之前完成。

时间：使用`clock_gettime()`用于精确的跨平台计时。

睡眠宏：`SLEEP(ms)`抽象化了 Windows 和 POSIX 之间的平台差异。

#### 步骤5.编译并运行

在 Linux 或 macOS 上：

```
gcc -std=c23 -pthread -O2 -Wall -Wextra portable_threads.c -o portable_threads
./portable_threads
```

在 Windows 上（MinGW）：

```
gcc -std=c23 -O2 -Wall -Wextra portable_threads.c -o portable_threads.exe -lws2_32
portable_threads.exe
```

预期输出：

```
Counter = 1000000 (expected 1000000)
Elapsed time: 0.134 seconds
```

该程序以完美的准确性完成，没有竞争条件，并且可以跨平台运行。

#### 步骤 6. 提高可移植性

用 C11 替换 pthreads`<threads.h>`如果您想要仅标准 C：

```
#include <threads.h>
```

使用`thrd_create`和`thrd_join`而不是`pthread_create`和`pthread_join`.

使用静态断言进行验证：

```
_Static_assert(THREADS > 0, "Must have at least one thread");
```

使用条件宏来解决系统差异（`_WIN32`,`__linux__`,`__APPLE__`).

#### 步骤 7. 安全性和清晰度检查表

✅ 没有不安全地共享原始指针 ✅ 原子操作防止竞争 ✅ 睡眠和计时是跨平台的 ✅ 干净、现代的语法，支持 C23 ✅ 易于修改（例如，更改线程数或工作负载）

#### 第 8 步：为什么它是便携式的

- 仅使用标准 C 和 POSIX API。
- 避免依赖于字节序或未定义的行为。
- 对特定于平台的代码有清晰的抽象。
- 依赖于原子类型，而不是特定于 CPU 的内在函数。
- 无需更改即可在 x86、ARM、RISC-V 和其他处理器上运行。

#### 第 9 步：为什么它很重要

这个小程序体现了 C 最擅长的：

- 速度：线程性能接近硬件。
- 控制：显式内存和并发性。
- 清晰度：现代 C 语法使其具有可读性。
- 可移植性：可以在任何有编译器的地方运行。

这就是当今的 C，简约、精确且可靠。

#### 第 10 步：亲自尝试一下

1. 改变`THREADS`并观察性能扩展。
2.用互斥体替换原子计数器，比较速度。
3. 将其移植到 Windows 并验证输出。
4. 添加计时来测量每个线程的持续时间。
5. 使用 C11 进行实验`<threads.h>`纯标准 C 的 API。

您已经完成了第 9 章“可移植和现代 C”。接下来是第 10 章：构建真实项目，您将应用这些基础知识来构建真实世界的系统、库、服务器和解释器，所有这些都使用干净、惯用的 C 语言。
