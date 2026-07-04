---
title: "75. 记录系统"
date: "2026-07-04"
lang: "zh-CN"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "08-调试测试与 profiling"
  - "中文"
description: "The Little Book of C 中文版 — 75. 记录系统"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
translator: "机器辅助翻译（Google Translate）"
section: 75
sidebarWeight: 75
alternateZh: "/posts/c教程/zh-CN/08-调试测试与 profiling/075-Logging Systems"
alternateEn: "/posts/c教程/en-US/08-Debugging Testing Profiling/075-Logging Systems"
---

[English version](/posts/c教程/en-US/08-Debugging Testing Profiling/075-Logging Systems)

随着程序的增长， printf 调试很快就会变得混乱。您需要一种方法来查看程序内部、它在做什么、出了什么问题以及原因，而不会让您的终端充斥着随机消息。

这就是日志系统的用武之地。良好的日志系统可以帮助您跟踪执行、记录错误并了解程序随时间的变化情况。

#### 步骤 1. 什么是日志记录？

日志记录就像为您的程序写日记。您无需将所有内容打印到屏幕上，而是记录带有级别（信息、警告、错误）和时间戳的结构化消息。

它对于以下方面至关重要：

- 调试复杂的流程。
- 审核事件和错误。
- 监控长期运行的服务。
- 诊断崩溃和性能问题。

#### 步骤 2. 最简单的记录器，带上下文的 printf

```
#include <stdio.h>
int main(void) {
    printf("[INFO] Starting program\n");
    printf("[WARN] Low memory\n");
    printf("[ERROR] Failed to open file\n");
}
```

这可行，但没有时间戳、文件名或严重性控制。

#### 步骤 3. 添加日志级别和宏

我们可以使用宏使其结构化并可重用。

```
#include <stdio.h>
#include <time.h>
#define LOG(level, msg, ...) do { \
    time_t t = time(NULL); \
    struct tm *tm_info = localtime(&t); \
    char buf[20]; \
    strftime(buf, 20, "%Y-%m-%d %H:%M:%S", tm_info); \
    fprintf(stderr, "[%s] [%s] " msg "\n", buf, level, ##__VA_ARGS__); \
} while (0)
#define LOG_INFO(msg, ...)  LOG("INFO", msg, ##__VA_ARGS__)
#define LOG_WARN(msg, ...)  LOG("WARN", msg, ##__VA_ARGS__)
#define LOG_ERROR(msg, ...) LOG("ERROR", msg, ##__VA_ARGS__)
int main(void) {
    LOG_INFO("Program started");
    LOG_WARN("Memory usage at %d%%", 80);
    LOG_ERROR("File %s not found", "data.txt");
}
```

输出：

```
[2025-10-16 23:41:09] [INFO] Program started
[2025-10-16 23:41:09] [WARN] Memory usage at 80%
[2025-10-16 23:41:09] [ERROR] File data.txt not found
```

现在您的日志具有一致的结构和有用的上下文。

#### 步骤 4. 控制日志详细程度

添加全局日志级别：

```
enum { LOG_LEVEL_INFO, LOG_LEVEL_WARN, LOG_LEVEL_ERROR };
int CURRENT_LOG_LEVEL = LOG_LEVEL_INFO;
#define SHOULD_LOG(level) ((level) >= CURRENT_LOG_LEVEL)
#define LOGX(level, tag, msg, ...) do { \
    if (SHOULD_LOG(level)) { \
        time_t t = time(NULL); \
        struct tm *tm_info = localtime(&t); \
        char buf[20]; \
        strftime(buf, 20, "%H:%M:%S", tm_info); \
        fprintf(stderr, "[%s] [%s] " msg "\n", buf, tag, ##__VA_ARGS__); \
    } \
} while (0)
```

现在：

```
LOGX(LOG_LEVEL_INFO, "INFO", "Running");
LOGX(LOG_LEVEL_WARN, "WARN", "Low disk space");
LOGX(LOG_LEVEL_ERROR, "ERROR", "Crash at line %d", __LINE__);
```

动态更改详细程度：

```
CURRENT_LOG_LEVEL = LOG_LEVEL_WARN;
```

现在，INFO 消息将被跳过。

#### 步骤 5. 记录到文件

```
#include <stdio.h>
#include <time.h>
void log_to_file(const char *filename, const char *msg) {
    FILE *f = fopen(filename, "a");
    if (!f) return;
    time_t t = time(NULL);
    fprintf(f, "%s: %s\n", ctime(&t), msg);
    fclose(f);
}
int main(void) {
    log_to_file("log.txt", "Program started");
    log_to_file("log.txt", "Action complete");
}
```

日志文件将包含：

```
Thu Oct 16 23:41:09 2025: Program started
Thu Oct 16 23:41:10 2025: Action complete
```

#### 步骤 6. 包含文件和行信息

您可以使用自动包含源信息`__FILE__`和`__LINE__`:

```
#define LOG_DEBUG(msg, ...) \
    fprintf(stderr, "[DEBUG] %s:%d " msg "\n", __FILE__, __LINE__, ##__VA_ARGS__)
```

例子：

```
LOG_DEBUG("x = %d", x);
```

输出：

```
[DEBUG] main.c:42 x = 10
```

#### 步骤 7.轮换或限制日志

对于长时间运行的程序，您不希望日志永远增长。你可以：

- 截断或重命名旧文件。
- 只保留N个条目。
- 写每日日志（`log_2025-10-16.txt`).

例子：

```
char filename[64];
time_t now = time(NULL);
strftime(filename, sizeof(filename), "log_%Y-%m-%d.txt", localtime(&now));
log_to_file(filename, "Daily entry");
```

#### 步骤 8. 添加颜色（可选）

使用 ANSI 颜色代码使控制台日志更易于阅读：

```
#define RED   "\x1b[31m"
#define YEL   "\x1b[33m"
#define GRN   "\x1b[32m"
#define RST   "\x1b[0m"
#define LOGC(level, color, msg, ...) \
    fprintf(stderr, color "[%s] " msg RST "\n", level, ##__VA_ARGS__)
```

例子：

```
LOGC("INFO", GRN, "Server started");
LOGC("WARN", YEL, "High CPU usage");
LOGC("ERROR", RED, "Out of memory");
```

#### 步骤 9. 结合日志记录和断言

您可以将断言与日志结合起来以提高安全性：

```
#include <assert.h>
#define SAFE_LOG(cond, msg, ...) \
    if (!(cond)) { \
        LOG_ERROR(msg, ##__VA_ARGS__); \
        assert(cond); \
    }
```

如果出现故障，它会记录并触发断言。

#### 步骤 10. 小代码：最小记录器

```
#include <stdio.h>
#include <time.h>
#define LOG(fmt, ...) do { \
    time_t now = time(NULL); \
    char buf[20]; \
    strftime(buf, sizeof(buf), "%H:%M:%S", localtime(&now)); \
    fprintf(stderr, "[%s] " fmt "\n", buf, ##__VA_ARGS__); \
} while (0)
int main(void) {
    LOG("Starting program");
    LOG("Loading config");
    LOG("Finished setup");
}
```

输出：

```
[23:42:00] Starting program
[23:42:01] Loading config
[23:42:02] Finished setup
```

#### 为什么它很重要

日志记录使不可见的进程变得可见。它可以帮助您：

- 跟踪执行流程。
- 调试生产代码。
- 审核错误和警告。
- 随着时间的推移了解系统性能。

在真实的系统中，服务器、编译器、数据库、日志是出现问题时的生命线。

#### 自己尝试一下

1.添加`LOG_INFO`,`LOG_WARN`， 和`LOG_ERROR`宏到您的 C 项目之一。
2. 向两者写入日志`stderr`和一个文件。
3. 自动添加时间戳和行号。
4. 为每个级别添加颜色。
5. 实施轮换文件日志系统，仅保留今天的文件处于活动状态。

接下来，您将了解如何使用 gprof 进行分析、如何衡量程序将时间花在哪里以及如何使其更快。
