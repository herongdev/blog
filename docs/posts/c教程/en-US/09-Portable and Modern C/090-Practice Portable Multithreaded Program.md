---
title: "90. Practice: Portable Multithreaded Program"
date: "2026-07-04"
categories: "[C 教程]"
tags: "[C, Little Book of C, Portable and Modern C]"
description: "The Little Book of C — 90. Practice: Portable Multithreaded Program"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
section: "90"
sidebarWeight: "90"
lang: "en-US"
alternateEn: "/posts/c教程/en-US/09-Portable and Modern C/090-Practice Portable Multithreaded Program"
alternateZh: "/posts/c教程/zh-CN/09-可移植与现代 C/090-Practice Portable Multithreaded Program"
---
[中文版本](/posts/c教程/zh-CN/09-可移植与现代 C/090-Practice Portable Multithreaded Program)

#### Follow-Along Deliverable

- Assumed state: lessons 081-089 are complete and you can rebuild the previous example.
- Working directory: `~/c-course-labs/090-portable-threads`.
- First command: on macOS / Linux run `mkdir -p ~/c-course-labs/090-portable-threads && cd ~/c-course-labs/090-portable-threads`; on Windows PowerShell run `New-Item -ItemType Directory -Force "$HOME\c-course-labs\090-portable-threads"; Set-Location "$HOME\c-course-labs\090-portable-threads"`.
- Success evidence: keep the source file, executable, `evidence.md`, and record compiler command, threaded output, and platform or compiler notes.
- Boundary for this lab: This lab focuses on platform differences and concurrency correctness. Windows porting can be recorded as a comparison, but it is not required for the main path.
- Reset: remove the executable, temporary data, and generated output for this lab; keep source and `evidence.md` for review.

It’s time to bring together everything you’ve learned, memory management, threads, synchronization, and portability, into one cohesive program.

In this final section of Chapter 9, you’ll build a portable multithreaded counter that runs correctly across architectures, compilers, and systems, demonstrating clean, safe, and modern C in practice.

#### Step 1. The Goal

We’ll write a program that:

- Spawns multiple threads using`pthread`(POSIX standard).
- Uses atomic operations for safe concurrent updates.
- Prints consistent results regardless of CPU or endianness.
- Compiles cleanly across Linux, macOS, and Windows (via MinGW).
- Uses modern, readable C11–C23 style.

#### Step 2. Plan the Design

1. Shared Counter:`atomic_int` for thread-safe increments.
2. Thread Function: Each thread performs a loop of increments.
3. Timing: Measure elapsed time for performance insight.
4. Portability: Use`#ifdef` for cross-platform compatibility.
5. Final Validation: Ensure result equals total increments.

#### Step 3. Full Tiny Code

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

#### Step 4. How It Works

Atomic Counter:`atomic_fetch_add` ensures that increments are atomic and race-free without using a mutex.

Thread Creation: Each thread runs the`worker()` function independently.

Synchronization:`pthread_join` ensures all threads finish before printing results.

Timing: Uses`clock_gettime()` for precise cross-platform timing.

Sleep Macro:`SLEEP(ms)` abstracts away platform differences between Windows and POSIX.

#### Step 5. Compile and Run

On Linux or macOS:

```
gcc -std=c23 -pthread -O2 -Wall -Wextra portable_threads.c -o portable_threads
./portable_threads
```

On Windows (MinGW):

```
gcc -std=c23 -O2 -Wall -Wextra portable_threads.c -o portable_threads.exe -lws2_32
portable_threads.exe
```

Expected output:

```
Counter = 1000000 (expected 1000000)
Elapsed time: 0.134 seconds
```

The program finishes with perfect accuracy, no race conditions, and works across platforms.

#### Step 6. Improving Portability

Replace pthreads with C11`<threads.h>` if you want standard-only C:

```
#include <threads.h>
```

Use`thrd_create` and`thrd_join` instead of`pthread_create` and`pthread_join`.

Use static assertions for validation:

```
_Static_assert(THREADS > 0, "Must have at least one thread");
```

Use conditional macros for system differences (`_WIN32`,`__linux__`,`__APPLE__`).

#### Step 7. Safety and Clarity Checklist

✅ No raw pointers shared unsafely ✅ Atomic operations prevent races ✅ Sleep and timing are cross-platform ✅ Clean, modern syntax with C23 support ✅ Easy to modify (e.g., change thread count or workload)

#### Step 8. Why It’s Portable

- Uses only standard C and POSIX APIs.
- Avoids endian-dependent or undefined behavior.
- Has clear abstractions for platform-specific code.
- Relies on atomic types, not CPU-specific intrinsics.
- Runs on x86, ARM, RISC-V, and others without changes.

#### Step 9. Why It Matters

This tiny program embodies what C is best at:

- Speed: Threaded performance close to hardware.
- Control: Explicit memory and concurrency.
- Clarity: Modern C syntax keeps it readable.
- Portability: Runs everywhere a compiler exists.

This is the C of today, minimal, precise, and reliable.

#### Step 10. Try It Yourself

1. Change`THREADS` and observe performance scaling.
2. Replace the atomic counter with a mutex, compare speed.
3. Port it to Windows and verify output.
4. Add timing to measure each thread’s duration.
5. Experiment with C11`<threads.h>` API for pure standard C.

You’ve completed Chapter 9, Portable and Modern C. Next comes Chapter 10: Building Real Projects, where you’ll apply these foundations to construct real-world systems, libraries, servers, and interpreters, all in clean, idiomatic C.
