---
title: "85. 使用 pthread 进行线程处理"
date: "2026-07-04"
lang: "zh-CN"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "09-可移植与现代 C"
  - "中文"
description: "The Little Book of C 中文版 — 85. 使用 pthread 进行线程处理"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
translator: "机器辅助翻译（Google Translate）"
section: 85
sidebarWeight: 85
alternateZh: "/posts/c教程/zh-CN/09-可移植与现代 C/085-Threading with pthreads"
alternateEn: "/posts/c教程/en-US/09-Portable and Modern C/085-Threading with pthreads"
---

[English version](/posts/c教程/en-US/09-Portable and Modern C/085-Threading with pthreads)

现代计算机同时运行许多东西。您的 Web 浏览器、文本编辑器和编译器都通过线程共享 CPU 时间。在 C 语言中，最广泛使用的线程 API 是 POSIX 线程，或 pthreads。它是低级的、可移植的，并为您提供对并行执行的细粒度控制。

本节将教您如何安全地创建、管理和同步线程。

#### 步骤 1. 什么是线程？

线程是一个轻量级的执行单元，与进程中的其他线程共享相同的内存空间。

|流程|主题 |
| --- | --- |
|拥有自己的内存（栈、堆、代码） |与其他线程共享内存|
|由操作系统创建 |由进程创建 |
|起步贵|便宜且快速启动 |
|通过IPC通讯 |通过共享内存进行通信 |

线程非常适合处理多个网络请求、执行并行计算或保持 UI 响应等任务。

#### 步骤 2. 包括 pthreads

要使用 pthreads，请包含标头：

```
#include <pthread.h>
```

编译时，链接pthread库：

```
gcc program.c -o program -lpthread
```

#### 步骤 3. 创建线程

每个线程运行一个单独的函数。该函数必须接受并返回`void *`.

小代码：基本线程创建

```
#include <pthread.h>
#include <stdio.h>
void* task(void* arg) {
    printf("Hello from thread! Arg = %d\n", *(int*)arg);
    return NULL;
}
int main(void) {
    pthread_t thread;
    int value = 42;
    pthread_create(&thread, NULL, task, &value);
    pthread_join(thread, NULL);
    printf("Main thread finished.\n");
    return 0;
}
```

输出：

```
Hello from thread! Arg = 42
Main thread finished.
```

解释：

-`pthread_create`启动一个新线程。
-`pthread_join`等待它完成。

#### 步骤 4. 多线程

```
#include <pthread.h>
#include <stdio.h>
void* work(void* arg) {
    int id = *(int*)arg;
    printf("Thread %d running\n", id);
    return NULL;
}
int main(void) {
    pthread_t threads[3];
    int ids[] = {1, 2, 3};
    for (int i = 0; i < 3; i++)
        pthread_create(&threads[i], NULL, work, &ids[i]);
    for (int i = 0; i < 3; i++)
        pthread_join(threads[i], NULL);
    printf("All threads done.\n");
}
```

输出顺序可能会有所不同，线程同时运行。

#### 步骤 5. 竞争条件

当两个线程同时修改同一个变量时，就会发生不好的事情。这称为竞争条件。

示例（不安全）：

```
#include <pthread.h>
#include <stdio.h>
int counter = 0;
void* increment(void* arg) {
    for (int i = 0; i < 100000; i++)
        counter++;
    return NULL;
}
int main(void) {
    pthread_t t1, t2;
    pthread_create(&t1, NULL, increment, NULL);
    pthread_create(&t2, NULL, increment, NULL);
    pthread_join(t1, NULL);
    pthread_join(t2, NULL);
    printf("Counter = %d\n", counter);
}
```

预期的：`200000`实际：不可预测（例如`137421`），因为增量重叠。

#### 步骤 6. 使用互斥锁（互斥锁）

互斥体确保一次只有一个线程修改共享数据。

```
#include <pthread.h>
#include <stdio.h>
int counter = 0;
pthread_mutex_t lock;
void* increment(void* arg) {
    for (int i = 0; i < 100000; i++) {
        pthread_mutex_lock(&lock);
        counter++;
        pthread_mutex_unlock(&lock);
    }
    return NULL;
}
int main(void) {
    pthread_t t1, t2;
    pthread_mutex_init(&lock, NULL);
    pthread_create(&t1, NULL, increment, NULL);
    pthread_create(&t2, NULL, increment, NULL);
    pthread_join(t1, NULL);
    pthread_join(t2, NULL);
    pthread_mutex_destroy(&lock);
    printf("Counter = %d\n", counter);
}
```

现在输出将始终是`200000`.

#### 步骤 7. 条件变量

条件变量让线程等待信号。它们用于协调生产者-消费者模型。

```
#include <pthread.h>
#include <stdio.h>
pthread_mutex_t lock;
pthread_cond_t cond;
int ready = 0;
void* worker(void* arg) {
    pthread_mutex_lock(&lock);
    while (!ready)
        pthread_cond_wait(&cond, &lock);
    printf("Worker got the signal!\n");
    pthread_mutex_unlock(&lock);
    return NULL;
}
int main(void) {
    pthread_t t;
    pthread_mutex_init(&lock, NULL);
    pthread_cond_init(&cond, NULL);
    pthread_create(&t, NULL, worker, NULL);
    sleep(1);
    pthread_mutex_lock(&lock);
    ready = 1;
    pthread_cond_signal(&cond);
    pthread_mutex_unlock(&lock);
    pthread_join(t, NULL);
}
```

#### 步骤 8. 线程属性

您可以使用控制线程行为`pthread_attr_t`:

- 堆栈大小
- 分离状态（可连接或分离）
- 调度策略

例子：

```
pthread_attr_t attr;
pthread_attr_init(&attr);
pthread_attr_setdetachstate(&attr, PTHREAD_CREATE_DETACHED);
pthread_create(&thread, &attr, task, NULL);
pthread_attr_destroy(&attr);
```

分离线程完成后会自动释放资源。

#### 步骤 9. 线程安全和最佳实践

- 使用互斥体保护所有共享数据。
- 尽可能避免全局变量。
- 使用线程安全函数（`strtok_r`而不是`strtok`).
- 保持关键部分简短。
- 在程序退出之前加入或分离所有线程。

#### 步骤 10. 小代码：并行求和

```
#include <pthread.h>
#include <stdio.h>
#define N 4
int partial[4];
void* compute(void* arg) {
    int id = *(int*)arg;
    int start = id * 25;
    int sum = 0;
    for (int i = start; i < start + 25; i++)
        sum += i;
    partial[id] = sum;
    return NULL;
}
int main(void) {
    pthread_t threads[N];
    int ids[N];
    for (int i = 0; i < N; i++) {
        ids[i] = i;
        pthread_create(&threads[i], NULL, compute, &ids[i]);
    }
    int total = 0;
    for (int i = 0; i < N; i++) {
        pthread_join(threads[i], NULL);
        total += partial[i];
    }
    printf("Total sum = %d\n", total);
}
```

该程序将任务拆分为多个线程并组合结果。

#### 为什么它很重要

线程使您的程序更快、响应更灵敏且可扩展。它们允许 C 语言充分利用现代多核 CPU，从服务器到嵌入式系统。学习 pthread 意味着了解真实系统如何高效、安全地执行多任务。

#### 自己尝试一下

1. 编写一个程序，启动 5 个线程，每个线程打印其 ID。
2. 添加一个共享计数器并用互斥体保护它。
3. 使用条件变量实现生产者-消费者队列。
4. 使用`pthread_attr_t`创建分离的工作线程。
5. 随着线程数的增加，分析程序的性能。

接下来，您将探索原子操作和内存模型，以及现代 CPU 如何在多个线程共享无锁数据时确保一致性。
