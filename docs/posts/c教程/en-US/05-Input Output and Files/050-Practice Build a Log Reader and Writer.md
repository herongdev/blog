---
title: "50. Practice: Build a Log Reader and Writer"
date: "2026-07-04"
categories: "[C 教程]"
tags: "[C, Little Book of C, Input Output and Files]"
description: "The Little Book of C — 50. Practice: Build a Log Reader and Writer"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
section: "50"
sidebarWeight: "50"
lang: "en-US"
alternateEn: "/posts/c教程/en-US/05-Input Output and Files/050-Practice Build a Log Reader and Writer"
alternateZh: "/posts/c教程/zh-CN/05-输入输出与文件/050-Practice Build a Log Reader and Writer"
---
[中文版本](/posts/c教程/zh-CN/05-输入输出与文件/050-Practice Build a Log Reader and Writer)

#### Follow-Along Deliverable

- Assumed state: lessons 041-049 are complete and you can rebuild the previous example.
- Working directory: `~/c-course-labs/050-log-tool`.
- First command: on macOS / Linux run `mkdir -p ~/c-course-labs/050-log-tool && cd ~/c-course-labs/050-log-tool`; on Windows PowerShell run `New-Item -ItemType Directory -Force "$HOME\c-course-labs\050-log-tool"; Set-Location "$HOME\c-course-labs\050-log-tool"`.
- Success evidence: keep the source file, executable, `evidence.md`, and record input log, output file, and one missing-file or permission failure record.
- Boundary for this lab: This lab focuses on text files, error handling, and command-line arguments. Databases, indexes, and network sync are out of scope.
- Reset: remove the executable, temporary data, and generated output for this lab; keep source and `evidence.md` for review.

You’ve explored text and binary I/O, buffering, error handling, and configuration. Now it’s time to bring everything together in one real-world practice project, a Log Reader and Writer in C.

This system will let you write structured logs to a file and later read them back, a foundation for tools like servers, daemons, and debugging utilities.

#### Project Overview

You’ll build a minimal logging system with two main parts:

Logger (Writer):

- Appends log messages to a file with timestamps and levels (INFO, WARN, ERROR).
- Handles file opening, writing, and safe closure.

Reader:

- Reads log entries line by line.
- Filters by log level or keyword.

This project teaches structured file I/O, formatted output, parsing, and simple text search, all in clean C.

#### Step 1. Define the Log Format

A log line will look like this:

```
[2025-10-15 21:00:32] [INFO] Server started
[2025-10-15 21:01:05] [WARN] High CPU usage
[2025-10-15 21:02:10] [ERROR] Connection failed
```

Each entry includes:

- Timestamp
- Level (INFO/WARN/ERROR)
- Message

#### Step 2. Implement the Logger

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

#### Step 3. Example Writer Program

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

Run it:

```
[2025-10-15 21:00:32] [INFO] System started
[2025-10-15 21:00:35] [WARN] Low disk space on /dev/sda1
[2025-10-15 21:00:38] [ERROR] Failed to connect to database
[2025-10-15 21:01:00] [INFO] Shutdown complete
```

#### Step 4. Implement the Reader

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

Example usage:

```
int main(void) {
    printf("All logs:\n");
    read_logs("system.log", NULL);
    printf("\nOnly errors:\n");
    read_logs("system.log", "ERROR");
    return 0;
}
```

Output:

```
All logs:
[2025-10-15 21:00:32] [INFO] System started
[2025-10-15 21:00:35] [WARN] Low disk space on /dev/sda1
[2025-10-15 21:00:38] [ERROR] Failed to connect to database
[2025-10-15 21:01:00] [INFO] Shutdown complete

Only errors:
[2025-10-15 21:00:38] [ERROR] Failed to connect to database
```

#### Step 5. Add Command-Line Interface

Combine both features using`argc` and`argv`:

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

Usage:

```
./logger write "Hello world"
./logger read
./logger read ERROR
```

#### Step 6. Handling Errors Gracefully

- Always check return values from`fopen`,`fgets`, and`fprintf`.
- Use`perror()` for system-level diagnostics.
- Flush frequently or close properly to ensure logs persist after crashes.

#### Step 7. Optional Enhancements

- Add log rotation (rename or truncate after N lines).
- Add log levels (only write logs above a threshold).
- Implement`save_config()` to define a log file path and verbosity from a config file.
- Add timestamps in UTC or with milliseconds for precision.
- Write logs in binary format for higher speed, then parse later.

#### Why It Matters

Logging is a core system capability. This project reinforces:

- Structured file I/O
- Error handling (`errno`,`perror`)
- String parsing and filtering
- Command-line tool design

Every C-based system, from embedded devices to Linux daemons, relies on some form of logging.

#### Try It Yourself

1. Add a`LogLevel` threshold (ignore logs below WARN).
2. Implement a`rotate_logs()` that renames`system.log` to`system.log.1` when it exceeds 100 lines.
3. Add timestamps in UTC instead of localtime.
4. Use`argv` to let users specify a custom log file name.
5. Store logs both to file and to`stderr` simultaneously.

This completes Chapter 5: Input, Output, and Files, a milestone in your journey. You can now handle text, binary, streams, and persistent data with safety and clarity. Next, you’ll step into Chapter 6: Compilation and the Build Process, where source code transforms into executable binaries through preprocessing, compilation, linking, and automation.
