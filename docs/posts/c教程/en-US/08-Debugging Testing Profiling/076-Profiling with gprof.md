---
title: "76. Profiling with gprof"
date: "2026-07-04"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "Debugging Testing Profiling"
description: "The Little Book of C — 76. Profiling with gprof"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
section: 76
sidebarWeight: 76
lang: "en-US"
alternateEn: "/posts/c教程/en-US/08-Debugging Testing Profiling/076-Profiling with gprof"
alternateZh: "/posts/c教程/zh-CN/08-调试测试与 profiling/076-Profiling with gprof"
---
[中文版本](/posts/c教程/zh-CN/08-调试测试与 profiling/076-Profiling with gprof)

When your program works but feels slow, guessing isn’t enough, you need to measure. Profiling shows you where your program spends its time, which functions are hot, and where optimization truly matters.

C gives you a lot of control, but performance tuning without profiling is like driving blindfolded. That’s why we use gprof, the GNU profiler, a tool that measures how long your code spends in each function.

#### Step 1. What Is Profiling?

Profiling is the process of recording runtime statistics such as:

- How many times each function runs.
- How much CPU time each function uses.
- Which functions call which others.

It helps you find bottlenecks, functions that dominate runtime, and focus your optimization there.

#### Step 2. Enabling Profiling with gprof

Compile your program with the`-pg` flag to enable profiling hooks:

```
gcc -pg main.c -o program
```

Run the program normally:

```
./program
```

After it finishes, a file named`gmon.out` is created. This file contains execution data collected during runtime.

Generate a report:

```
gprof program gmon.out > analysis.txt
```

Now open`analysis.txt` to see where your program spent its time.

#### Step 3. Example Program

Here’s a small example to demonstrate profiling:

```
#include <stdio.h>
void slow_function(void) {
    for (volatile long i = 0; i < 50000000; i++);
}
void fast_function(void) {
    for (volatile long i = 0; i < 5000000; i++);
}
int main(void) {
    slow_function();
    fast_function();
    slow_function();
    return 0;
}
```

Compile and run:

```
gcc -pg main.c -o profile_me
./profile_me
gprof profile_me gmon.out > report.txt
```

#### Step 4. Reading the gprof Report

The report has two key sections:

1. Flat Profile

```
Flat profile:

Each sample counts as 0.01 seconds.
  %   cumulative   self              self     total
 time   seconds   seconds    calls   ms/call  ms/call  name
 66.7      0.20     0.20        2   100.00   100.00  slow_function
 33.3      0.30     0.10        1   100.00   100.00  fast_function
```

This tells you:

- `slow_function()` took 66% of total time.
- `fast_function()` took 33%.

2. Call Graph

```
index % time    self  children    called     name
                0.20    0.00       2/2       slow_function
                0.10    0.00       1/1       fast_function
```

This shows relationships, which functions called which, and how time was distributed among them.

#### Step 5. Profiling Multi-File Programs

When working on multiple`.c` files, just compile each with`-pg`:

```
gcc -pg -c foo.c
gcc -pg -c bar.c
gcc -pg foo.o bar.o -o app
```

Then run and analyze as before.

#### Step 6. Ignoring Initialization or Short Runs

Profiling works best for real workloads. Avoid profiling tiny runs, because initialization costs can dominate and distort results.

For example, a 10 ms startup delay might look huge if your program only runs 20 ms in total. Use representative input and real loops to get meaningful data.

#### Step 7. Focusing on Hotspots

When you know which functions dominate runtime (often the top 5%), you can:

- Inline them manually.
- Use better data structures.
- Reduce allocations.
- Simplify inner loops.

Optimization is about precision, don’t guess where your code is slow; let the profiler prove it.

#### Step 8. Combining gprof with Compiler Optimizations

Compare your performance before and after adding optimization flags:

```
gcc -pg -O0 main.c -o slow
gcc -pg -O3 main.c -o fast
```

Then run both and inspect the reports. You’ll see dramatic changes in timing distribution, sometimes even inlined functions disappear entirely from the profile.

#### Step 9. Visualizing Profiles

You can visualize gprof results using gprof2dot and Graphviz:

```
pip install gprof2dot
gprof program gmon.out | gprof2dot | dot -Tpng -o profile.png
```

This generates a call graph image, showing which functions dominate. The thicker the arrow, the more time is spent there.

#### Step 10. Tiny Code: Measuring a Sorting Algorithm

```
#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#define N 100000
void bubble_sort(int *arr, int n) {
    for (int i = 0; i < n - 1; i++)
        for (int j = 0; j < n - i - 1; j++)
            if (arr[j] > arr[j + 1]) {
                int tmp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = tmp;
            }
}
void fill_random(int *arr, int n) {
    for (int i = 0; i < n; i++)
        arr[i] = rand() % 100000;
}
int main(void) {
    int *arr = malloc(N * sizeof(int));
    fill_random(arr, N);
    bubble_sort(arr, N);
    free(arr);
}
```

Compile and run:

```
gcc -pg main.c -O0 -o sort_profile
./sort_profile
gprof sort_profile gmon.out | head -n 20
```

Output (excerpt):

```
  %   cumulative   self              self     total
 time   seconds   seconds    calls   ms/call  ms/call  name
 95.0      0.95     0.95        1   950.00   950.00  bubble_sort
```

This tells you 95% of time is spent in`bubble_sort()`, confirming the algorithmic bottleneck.

#### Why It Matters

Profiling bridges the gap between “feels slow” and knowing why. It helps you:

- Focus optimization effort where it matters most.
- Verify improvements quantitatively.
- Eliminate guesswork.

In performance engineering, measurement beats intuition every time.

#### Try It Yourself

1. Profile your own sorting or search algorithm.
2. Compare results between`-O0`,`-O2`, and`-O3`.
3. Profile a multithreaded or I/O-bound program.
4. Visualize results with`gprof2dot`.
5. Identify one bottleneck and fix it, then re-profile to see the difference.

Next, you’ll explore common undefined behaviors in C, the silent bugs that can make your perfectly profiled program crash unpredictably.
