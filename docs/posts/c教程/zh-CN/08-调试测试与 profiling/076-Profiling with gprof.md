---
title: "76. 使用 gprof 进行分析"
date: "2026-07-04"
lang: "zh-CN"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "08-调试测试与 profiling"
  - "中文"
description: "The Little Book of C 中文版 — 76. 使用 gprof 进行分析"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
translator: "机器辅助翻译（Google Translate）"
section: 76
sidebarWeight: 76
alternateZh: "/posts/c教程/zh-CN/08-调试测试与 profiling/076-Profiling with gprof"
alternateEn: "/posts/c教程/en-US/08-Debugging Testing Profiling/076-Profiling with gprof"
---

[English version](/posts/c教程/en-US/08-Debugging Testing Profiling/076-Profiling with gprof)

当您的程序可以运行但感觉很慢时，猜测是不够的，您需要进行测量。分析可以向您显示程序将时间花在哪些地方、哪些功能很热门以及哪些优化真正重要。

C 为您提供了很多控制权，但是没有分析的性能调整就像蒙住眼睛开车一样。这就是我们使用 GNU 分析器 gprof 的原因，它是一种测量代码在每个函数中花费多长时间的工具。

#### 步骤 1. 什么是分析？

分析是记录运行时统计信息的过程，例如：

- 每个函数运行多少次。
- 每个函数使用多少CPU时间。
- 哪些函数调用哪些函数。

它可以帮助您找到瓶颈、主导运行时的函数，并将优化重点放在此处。

#### 步骤 2. 使用 gprof 启用分析

编译你的程序`-pg`启用分析挂钩的标志：

```
gcc -pg main.c -o program
```

正常运行程序：

```
./program
```

完成后会生成一个名为`gmon.out`被创建。该文件包含运行时收集的执行数据。

生成报告：

```
gprof program gmon.out > analysis.txt
```

现已开放`analysis.txt`查看您的程序将时间花在哪里。

#### 步骤 3. 示例程序

这是一个演示分析的小示例：

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

编译并运行：

```
gcc -pg main.c -o profile_me
./profile_me
gprof profile_me gmon.out > report.txt
```

#### 步骤 4. 阅读 gprof 报告

该报告有两个关键部分：

1. 扁平轮廓

```
扁平轮廓：

每个样本计为 0.01 秒。
% 累计自我总计
时间 秒 秒 呼叫 ms/呼叫 ms/呼叫名称
66.7 0.20 0.20 2 100.00 100.00 慢速函数
33.3 0.30 0.10 1 100.00 100.00 快速函数
```

这告诉你：

-`slow_function()`占总时间的66%。
-`fast_function()`占了33%。

2. 调用图

```
index % time    self  children    called     name
                0.20    0.00       2/2       slow_function
                0.10    0.00       1/1       fast_function
```

这显示了关系、哪些函数调用了哪些函数，以及它们之间的时间分配方式。

#### 步骤 5. 分析多文件程序

当处理多个`.c`文件，只需编译每个文件`-pg`:

```
gcc -pg -c foo.c
gcc -pg -c bar.c
gcc -pg foo.o bar.o -o app
```

然后像以前一样运行并分析。

#### 步骤 6. 忽略初始化或短期运行

分析最适合实际工作负载。避免分析微小的运行，因为初始化成本可能会主导并扭曲结果。

例如，如果您的程序总共只运行 20 毫秒，则 10 毫秒的启动延迟可能看起来很大。使用代表性输入和真实循环来获取有意义的数据。

#### 步骤 7. 关注热点

当您知道哪些函数在运行时占主导地位（通常是前 5%）时，您可以：

- 手动内联它们。
- 使用更好的数据结构。
- 减少拨款。
- 简化内部循环。

优化关乎精度，不要猜测你的代码哪里慢；让分析器证明这一点。

#### 步骤 8. 将 gprof 与编译器优化相结合

比较添加优化标志之前和之后的性能：

```
gcc -pg -O0 main.c -o slow
gcc -pg -O3 main.c -o fast
```

然后运行两者并检查报告。您会看到时序分布发生巨大变化，有时甚至内联函数完全从配置文件中消失。

#### 步骤 9. 可视化配置文件

您可以使用 gprof2dot 和 Graphviz 可视化 gprof 结果：

```
pip install gprof2dot
gprof program gmon.out | gprof2dot | dot -Tpng -o profile.png
```

这会生成一个调用图图像，显示哪些函数占主导地位。箭头越粗，在那里花费的时间就越多。

#### 步骤 10. 小代码：测量排序算法

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

编译并运行：

```
gcc -pg main.c -O0 -o sort_profile
./sort_profile
gprof sort_profile gmon.out | head -n 20
```

输出（摘录）：

```
  %   cumulative   self              self     total
 time   seconds   seconds    calls   ms/call  ms/call  name
 95.0      0.95     0.95        1   950.00   950.00  bubble_sort
```

这告诉你 95% 的时间花在`bubble_sort()`，确认算法瓶颈。

#### 为什么它很重要

分析弥补了“感觉缓慢”和了解原因之间的差距。它可以帮助您：

- 将优化工作集中在最重要的地方。
- 定量验证改进。
- 消除猜测。

在性能工程中，测量每次都胜过直觉。

#### 自己尝试一下

1. 描述您自己的排序或搜索算法。
2. 比较结果`-O0`,`-O2`， 和`-O3`.
3. 分析多线程或 I/O 密集型程序。
4. 可视化结果`gprof2dot`.
5. 确定一个瓶颈并修复它，然后重新分析以查看差异。

接下来，您将探索 C 中常见的未定义行为，这些无声错误可能会使您完美分析的程序意外崩溃。
