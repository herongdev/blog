---
title: "67. 时间和时钟 API"
date: "2026-07-04"
lang: "zh-CN"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "07-贴近系统"
  - "中文"
description: "The Little Book of C 中文版 — 67. 时间和时钟 API"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
translator: "机器辅助翻译（Google Translate）"
section: 67
sidebarWeight: 67
alternateZh: "/posts/c教程/zh-CN/07-贴近系统/067-Time and Clock APIs"
alternateEn: "/posts/c教程/en-US/07-Working Close to the System/067-Time and Clock APIs"
---

[English version](/posts/c教程/en-US/07-Working Close to the System/067-Time and Clock APIs)

时间是人类理解的最简单的事物之一，也是计算机正确处理的最棘手的事物之一。在 C 中，时间以自 Unix 纪元（1970 年 1 月 1 日）以来的秒数表示，您可以在各个级别上使用它：挂钟时间、进程时间和高精度计时器。

让我们探讨如何在 C 中获取、格式化和测量时间。

#### 步骤 1. 基础知识：time()

获取当前时间的最简单方法是使用`time()`功能。

```
#include <time.h>
#include <stdio.h>
int main(void) {
    time_t now = time(NULL);
    printf("Seconds since epoch: %ld\n", now);
}
```

输出：

```
Seconds since epoch: 1739709201
```

这是自 1970-01-01 00:00:00 UTC 以来的秒数。

#### 步骤 2. 转换为人类可读格式

你可以转换`time_t`使用日历日期`localtime()`或者`gmtime()`.

```
#include <time.h>
#include <stdio.h>
int main(void) {
    time_t now = time(NULL);
    struct tm *t = localtime(&now);
    printf("Local time: %02d-%02d-%04d %02d:%02d:%02d\n",
           t->tm_mday, t->tm_mon + 1, t->tm_year + 1900,
           t->tm_hour, t->tm_min, t->tm_sec);
}
```

输出：

```
Local time: 16-10-2025 09:32:10
```

#### 步骤 3. 使用 strftime() 设置日期格式

`strftime()`让您安全地将时间格式化为字符串。

```
#include <time.h>
#include <stdio.h>
int main(void) {
    char buf[100];
    time_t now = time(NULL);
    struct tm *t = localtime(&now);
    strftime(buf, sizeof(buf), "%Y-%m-%d %H:%M:%S", t);
    printf("Formatted: %s\n", buf);
}
```

输出：

```
Formatted: 2025-10-16 09:32:10
```

#### 步骤 4. 测量经过的时间

要测量某件事需要多长时间，请使用`clock()`从`<time.h>`.

```
#include <time.h>
#include <stdio.h>
int main(void) {
    clock_t start = clock();
    for (volatile long i = 0; i < 100000000; i++);
    clock_t end = clock();
    double seconds = (double)(end - start) / CLOCKS_PER_SEC;
    printf("Elapsed time: %.3f seconds\n", seconds);
}
```

输出：

```
Elapsed time: 0.520 seconds
```

`clock()`测量 CPU 时间，而不是实际运行时间，因此不包括等待 I/O 或睡眠所花费的时间。

#### 步骤 5. 使用clock_gettime() 进行高分辨率计时

为了精确测量，请使用`clock_gettime()`.

```
#include <time.h>
#include <stdio.h>
int main(void) {
    struct timespec start, end;
    clock_gettime(CLOCK_MONOTONIC, &start);
    for (volatile long i = 0; i < 100000000; i++);
    clock_gettime(CLOCK_MONOTONIC, &end);
    double elapsed = (end.tv_sec - start.tv_sec)
                   + (end.tv_nsec - start.tv_nsec) / 1e9;
    printf("Elapsed: %.6f seconds\n", elapsed);
}
```

输出：

```
Elapsed: 0.515421 seconds
```

这测量实际经过的时间，不受系统时钟变化的影响。

#### 步骤 6. 睡眠一段时间

您可以使用以下命令暂停您的程序`sleep()`或者`nanosleep()`.

```
#include <unistd.h>
#include <stdio.h>
int main(void) {
    printf("Sleeping for 2 seconds...\n");
    sleep(2);
    printf("Awake!\n");
}
```

对于亚秒级精度：

```
#include <time.h>
int main(void) {
    struct timespec ts = {0, 500000000}; // 0.5 seconds
    nanosleep(&ts, NULL);
}
```

#### 步骤 7. 获取 UTC 和本地时区

`gmtime()`给你 UTC，同时`localtime()`转换为您系统的时区。

```
time_t now = time(NULL);
printf("UTC:   %s", asctime(gmtime(&now)));
printf("Local: %s", asctime(localtime(&now)));
```

您可以通过以下方式更改时区行为`TZ`环境变量和`tzset()`.

#### 步骤 8. 处理时间和资源使用

您可以检查您的程序使用了多少CPU时间`getrusage()`.

```
#include <sys/resource.h>
#include <stdio.h>
int main(void) {
    struct rusage usage;
    getrusage(RUSAGE_SELF, &usage);
    printf("User CPU time: %ld.%06lds\n",
           usage.ru_utime.tv_sec, usage.ru_utime.tv_usec);
    printf("System CPU time: %ld.%06lds\n",
           usage.ru_stime.tv_sec, usage.ru_stime.tv_usec);
}
```

这就是分析器测量 CPU 消耗的方式。

#### 步骤 9. 时差

你可以减去两个`time_t`价值观使用`difftime()`.

```
#include <time.h>
#include <stdio.h>
int main(void) {
    time_t start = time(NULL);
    sleep(2);
    time_t end = time(NULL);
    printf("Elapsed: %.0f seconds\n", difftime(end, start));
}
```

输出：

```
Elapsed: 2 seconds
```

#### 步骤 10. 小代码：倒计时器

```
#include <stdio.h>
#include <unistd.h>
int main(void) {
    for (int i = 5; i > 0; i--) {
        printf("%d...\n", i);
        sleep(1);
    }
    printf("Time's up!\n");
}
```

输出：

```
5...
4...
3...
2...
1...
Time's up!
```

#### 为什么它很重要

时间函数在以下方面至关重要：

- 日志记录和时间戳
- 基准测试和分析
- 安排活动
- 衡量算法的性能
- 同步分布式系统

每个系统程序最终都需要准确、可靠的时间测量，而 C 语言为您提供了所有低级工具来高效地完成此任务。

#### 自己尝试一下

1. 以 ISO 8601 格式打印当前日期。
2. 测量读取一个大文件需要多长时间。
3. 构建一个秒表来测量经过的时间`clock_gettime()`.
4. 创建一个在终端上更新的倒计时器。
5.同时显示UTC和本地时间，格式很好。

接下来，您将学习如何访问和修改环境变量，这是 Unix 程序如何与其运行时环境通信的另一个关键部分。
