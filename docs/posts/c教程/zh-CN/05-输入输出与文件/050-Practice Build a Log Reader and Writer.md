---
title: "50. 实践：构建日志读取器和写入器"
date: "2026-07-04"
lang: "zh-CN"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "05-输入输出与文件"
  - "中文"
description: "The Little Book of C 中文版 — 50. 实践：构建日志读取器和写入器"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
translator: "机器辅助翻译（Google Translate）"
section: "50"
sidebarWeight: "50"
alternateZh: "/posts/c教程/zh-CN/05-输入输出与文件/050-Practice Build a Log Reader and Writer"
alternateEn: "/posts/c教程/en-US/05-Input Output and Files/050-Practice Build a Log Reader and Writer"
---

[English version](/posts/c教程/en-US/05-Input Output and Files/050-Practice Build a Log Reader and Writer)

#### 跟练交付物

- 已具备状态：完成第 041-049 课，能重新编译上一章示例。
- 工作目录：`~/c-course-labs/050-log-tool`。
- 第一条命令：macOS / Linux 运行 `mkdir -p ~/c-course-labs/050-log-tool && cd ~/c-course-labs/050-log-tool`；Windows PowerShell 运行 `New-Item -ItemType Directory -Force "$HOME\c-course-labs\050-log-tool"; Set-Location "$HOME\c-course-labs\050-log-tool"`。
- 成功证据：保留源码、可执行文件、`evidence.md`，并记录输入日志、输出文件、一次文件不存在或权限失败的错误记录。
- 本章边界：本章关注文本文件、错误处理和命令行参数；暂不要求数据库、索引或网络同步。
- 重置方式：删除本章生成的可执行文件、临时数据和输出文件，保留源码与 `evidence.md` 方便复盘。

您已经探索了文本和二进制 I/O、缓冲、错误处理和配置。现在是时候将所有内容整合到一个现实世界的实践项目中，即 C 语言的日志读取器和写入器。

该系统允许您将结构化日志写入文件，然后将其读回，这是服务器、守护程序和调试实用程序等工具的基础。

#### 项目概况

您将构建一个包含两个主要部分的最小日志系统：

记录员（作家）：

- 将日志消息附加到带有时间戳和级别（INFO、WARN、ERROR）的文件。
- 处理文件打开、写入和安全关闭。

读者：

- 逐行读取日志条目。
- 按日志级别或关键字过滤。

该项目教授结构化文件 I/O、格式化输出、解析和简单文本搜索，全部采用干净的 C 语言。

#### 步骤 1. 定义日志格式

日志行将如下所示：

```
[2025-10-15 21:00:32] [INFO] Server started
[2025-10-15 21:01:05] [WARN] High CPU usage
[2025-10-15 21:02:10] [ERROR] Connection failed
```

每个条目包括：

- 时间戳
- 级别（信息/警告/错误）
- 留言

#### 步骤 2. 实现记录器

```
#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <stdarg.h>
#include <string.h>
typedef enum {
    INFO,
    WARN,
    ERROR
} LogLevel;
const char* level_to_string(LogLevel level) {
    switch (level) {
        case INFO: return "INFO";
        case WARN: return "WARN";
        case ERROR: return "ERROR";
        default: return "UNKNOWN";
    }
}
void write_log(FILE *fp, LogLevel level, const char *fmt, ...) {
    if (!fp) return;
    // Timestamp
    time_t t = time(NULL);
    struct tm *tm_info = localtime(&t);
    char timebuf[32];
    strftime(timebuf, sizeof(timebuf), "%Y-%m-%d %H:%M:%S", tm_info);
    // Format message
    va_list args;
    va_start(args, fmt);
    fprintf(fp, "[%s] [%s] ", timebuf, level_to_string(level));
    vfprintf(fp, fmt, args);
    fprintf(fp, "\n");
    fflush(fp); // flush immediately for safety
    va_end(args);
}
```

#### 步骤 3. 示例 Writer 程序

```
int main(void) {
    FILE *log = fopen("system.log", "a");
    if (!log) {
        perror("Cannot open log file");
        return 1;
    }
    write_log(log, INFO, "System started");
    write_log(log, WARN, "Low disk space on /dev/sda1");
    write_log(log, ERROR, "Failed to connect to database");
    write_log(log, INFO, "Shutdown complete");
    fclose(log);
    return 0;
}
```

运行它：

```
[2025-10-15 21:00:32] [INFO] System started
[2025-10-15 21:00:35] [WARN] Low disk space on /dev/sda1
[2025-10-15 21:00:38] [ERROR] Failed to connect to database
[2025-10-15 21:01:00] [INFO] Shutdown complete
```

#### 步骤 4. 实施 Reader

```
#include <stdio.h>
#include <string.h>
void read_logs(const char *filename, const char *filter) {
    FILE *fp = fopen(filename, "r");
    if (!fp) {
        perror("Cannot open log file");
        return;
    }
    char line[256];
    while (fgets(line, sizeof(line), fp)) {
        if (filter == NULL || strstr(line, filter))
            printf("%s", line);
    }
    fclose(fp);
}
```

用法示例：

```
int main(void) {
    printf("All logs:\n");
    read_logs("system.log", NULL);
    printf("\nOnly errors:\n");
    read_logs("system.log", "ERROR");
    return 0;
}
```

输出：

```
所有日志：
[2025-10-15 21:00:32] [INFO] 系统启动
[2025-10-15 21:00:35] [警告] /dev/sda1 磁盘空间不足
[2025-10-15 21:00:38] [错误] 无法连接到数据库
[2025-10-15 21:01:00] [INFO] 关机完成

仅错误：
[2025-10-15 21:00:38] [错误] 无法连接到数据库
```

#### 步骤 5. 添加命令行界面

使用结合这两个功能`argc`和`argv`:

```
int main(int argc, char *argv[]) {
    if (argc < 2) {
        fprintf(stderr, "Usage: %s [write|read] [message/filter]\n", argv[0]);
        return 1;
    }
    if (strcmp(argv[1], "write") == 0) {
        FILE *log = fopen("system.log", "a");
        if (!log) {
            perror("open");
            return 1;
        }
        write_log(log, INFO, "%s", argc > 2 ? argv[2] : "Generic log entry");
        fclose(log);
    } else if (strcmp(argv[1], "read") == 0) {
        const char *filter = argc > 2 ? argv[2] : NULL;
        read_logs("system.log", filter);
    } else {
        fprintf(stderr, "Invalid command. Use write or read.\n");
    }
    return 0;
}
```

用法：

```
./logger write "Hello world"
./logger read
./logger read ERROR
```

#### 步骤 6. 优雅地处理错误

- 始终检查返回值`fopen`,`fgets`， 和`fprintf`.
- 使用`perror()`用于系统级诊断。
- 经常刷新或正确关闭以确保崩溃后日志仍然存在。

#### 步骤 7. 可选增强功能

- 添加日志轮换（在 N 行后重命名或截断）。
- 添加日志级别（仅写入高于阈值的日志）。
- 实施`save_config()`从配置文件定义日志文件路径和详细程度。
- 添加 UTC 时间戳或毫秒时间戳以确保精度。
- 以二进制格式写入日志以提高速度，然后再解析。

#### 为什么它很重要

日志记录是一项核心系统功能。该项目强化了：

- 结构化文件I/O
- 错误处理（`errno`,`perror`)
- 字符串解析和过滤
- 命令行工具设计

每个基于 C 的系统，从嵌入式设备到 Linux 守护进程，都依赖于某种形式的日志记录。

#### 自己尝试一下

1.添加一个`LogLevel`阈值（忽略低于 WARN 的日志）。
2. 实施`rotate_logs()`重命名`system.log`到`system.log.1`当超过100行时。
3. 添加 UTC 时间戳而不是本地时间。
4. 使用`argv`让用户指定自定义日志文件名。
5. 将日志存储到文件和`stderr`同时地。

第 5 章：输入、输出和文件就完成了，这是您旅程中的一个里程碑。您现在可以安全、清晰地处理文本、二进制、流和持久数据。接下来，您将进入第 6 章：编译和构建过程，其中源代码通过预处理、编译、链接和自动化转换为可执行二进制文件。
