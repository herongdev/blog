---
title: "85. Threading with pthreads"
date: "2026-07-04"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "Portable and Modern C"
description: "The Little Book of C — 85. Threading with pthreads"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
section: 85
sidebarWeight: 85
lang: "en-US"
alternateEn: "/posts/c教程/en-US/09-Portable and Modern C/085-Threading with pthreads"
alternateZh: "/posts/c教程/zh-CN/09-可移植与现代 C/085-Threading with pthreads"
---
[中文版本](/posts/c教程/zh-CN/09-可移植与现代 C/085-Threading with pthreads)

Modern computers run many things at once. Your web browser, text editor, and compiler all share CPU time through threads. In C, the most widely used threading API is POSIX threads, or pthreads. It’s low-level, portable, and gives you fine-grained control over parallel execution.

This section will teach you how to create, manage, and synchronize threads safely.

#### Step 1. What Is a Thread?

A thread is a lightweight execution unit that shares the same memory space as other threads in a process.

| Process | Thread |
| --- | --- |
| Has its own memory (stack, heap, code) | Shares memory with other threads |
| Created by OS | Created by process |
| Expensive to start | Cheap and fast to start |
| Communicates via IPC | Communicates via shared memory |

Threads are ideal for tasks like handling multiple network requests, performing parallel computation, or keeping a UI responsive.

#### Step 2. Including pthreads

To use pthreads, include the header:

```
#include <pthread.h>
```

When compiling, link with the pthread library:

```
gcc program.c -o program -lpthread
```

#### Step 3. Creating Threads

Each thread runs a separate function. The function must take and return`void *`.

Tiny Code: Basic Thread Creation

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

Output:

```
Hello from thread! Arg = 42
Main thread finished.
```

Explanation:

- `pthread_create` starts a new thread.
- `pthread_join` waits for it to finish.

#### Step 4. Multiple Threads

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

Output order may vary, threads run concurrently.

#### Step 5. Race Conditions

When two threads modify the same variable at the same time, bad things happen. This is called a race condition.

Example (unsafe):

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

Expected:`200000` Actual: unpredictable (e.g.`137421`), because increments overlap.

#### Step 6. Using Mutexes (Mutual Exclusion Locks)

A mutex ensures that only one thread modifies shared data at a time.

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

Now the output will consistently be`200000`.

#### Step 7. Condition Variables

Condition variables let threads wait for a signal. They’re used to coordinate producer–consumer models.

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

#### Step 8. Thread Attributes

You can control thread behavior using`pthread_attr_t`:

- Stack size
- Detach state (joinable or detached)
- Scheduling policy

Example:

```
pthread_attr_t attr;
pthread_attr_init(&attr);
pthread_attr_setdetachstate(&attr, PTHREAD_CREATE_DETACHED);
pthread_create(&thread, &attr, task, NULL);
pthread_attr_destroy(&attr);
```

Detached threads free resources automatically when done.

#### Step 9. Thread Safety and Best Practices

- Protect all shared data with mutexes.
- Avoid global variables when possible.
- Use thread-safe functions (`strtok_r` instead of`strtok`).
- Keep critical sections short.
- Join or detach all threads before program exit.

#### Step 10. Tiny Code: Parallel Sum

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

This program splits a task across multiple threads and combines results.

#### Why It Matters

Threads make your programs faster, more responsive, and scalable. They allow C to fully exploit modern multi-core CPUs, from servers to embedded systems. Learning pthreads means learning how real systems multitask efficiently and safely.

#### Try It Yourself

1. Write a program that starts 5 threads, each printing its ID.
2. Add a shared counter and protect it with a mutex.
3. Implement a producer–consumer queue using condition variables.
4. Use`pthread_attr_t` to create detached worker threads.
5. Profile your program’s performance as you increase the thread count.

Next, you’ll explore atomic operations and memory models, how modern CPUs ensure consistency when multiple threads share data without locks.
