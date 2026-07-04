---
title: "92. 构建命令行工具"
date: "2026-07-04"
lang: "zh-CN"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "10-真实项目"
  - "中文"
description: "The Little Book of C 中文版 — 92. 构建命令行工具"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
translator: "机器辅助翻译（Google Translate）"
section: 92
sidebarWeight: 92
alternateZh: "/posts/c教程/zh-CN/10-真实项目/092-Building a Command-Line Tool"
alternateEn: "/posts/c教程/en-US/10-Building Real Projects/092-Building a Command-Line Tool"
---

[English version](/posts/c教程/en-US/10-Building Real Projects/092-Building a Command-Line Tool)

命令行工具是大多数 C 程序员开始构建真正软件的地方。它们快速、可移植并且能够与类 Unix 环境自然集成。在本节中，您将构建一个小型、独立的 CLI 工具，用于处理输入参数、读取文件并输出结果，与诸如`grep`,`cat`， 和`wc`.

#### 步骤 1. 目标

我们将构建一个名为 linestat 的简单命令行工具，它：

- 计算文本文件中的行数、单词数和字符数（如迷你文件）`wc`).
- 从文件或标准输入获取输入。
- 接受像这样的标志`-l`,`-w`,`-c`.
- 使用干净的错误处理和模块化功能。

#### 步骤 2. 项目布局

```
linestat/
 ├── linestat.c
 ├── Makefile
 └── README.md
```

#### 步骤 3. 核心概念

命令行程序遵循一些永恒的模式：

1. 阅读论证`argc`和`argv`.
2. 在处理之前验证输入。
3. 安全地打开文件`fopen`或使用`stdin`.
4. 逐行处理数据。
5. 清晰、一致地报告结果。

#### 步骤 4. 小代码：linestat.c

```
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
static void print_usage(const char *prog) {
    printf("Usage: %s [-l] [-w] [-c] [file]\n", prog);
    printf("Options:\n");
    printf("  -l   count lines\n");
    printf("  -w   count words\n");
    printf("  -c   count characters\n");
}
int main(int argc, char *argv[]) {
    int count_lines = 0, count_words = 0, count_chars = 0;
    const char *filename = NULL;
    // Parse arguments
    for (int i = 1; i < argc; i++) {
        if (strcmp(argv[i], "-l") == 0) count_lines = 1;
        else if (strcmp(argv[i], "-w") == 0) count_words = 1;
        else if (strcmp(argv[i], "-c") == 0) count_chars = 1;
        else if (argv[i][0] != '-') filename = argv[i];
        else {
            print_usage(argv[0]);
            return 1;
        }
    }
    FILE *fp = filename ? fopen(filename, "r") : stdin;
    if (!fp) {
        perror("Error opening file");
        return 1;
    }
    long lines = 0, words = 0, chars = 0;
    int in_word = 0;
    int ch;
    while ((ch = fgetc(fp)) != EOF) {
        chars++;
        if (ch == '\n') lines++;
        if (ch == ' ' || ch == '\n' || ch == '\t') in_word = 0;
        else if (!in_word) { words++; in_word = 1; }
    }
    fclose(fp);
    if (!count_lines && !count_words && !count_chars) {
        count_lines = count_words = count_chars = 1; // Default all
    }
    if (count_lines) printf("Lines: %ld\n", lines);
    if (count_words) printf("Words: %ld\n", words);
    if (count_chars) printf("Chars: %ld\n", chars);
    return 0;
}
```

#### 步骤 5. 构建并运行

生成文件

```
CC = gcc
CFLAGS = -std=c23 -O2 -Wall -Wextra
linestat: linestat.c
    $(CC) $(CFLAGS) linestat.c -o linestat
clean:
    rm -f linestat
```

构建它：

```
make
```

运行它：

```
./linestat -l -w -c example.txt
```

或者从管道：

```
cat example.txt | ./linestat -w
```

输出示例：

```
Lines: 12
Words: 85
Chars: 430
```

#### 第 6 步：分解代码

- 参数解析：循环`argv`检测标志。
- 输入处理：读取`stdin`当没有给出文件时。
- 计数逻辑：跟踪空格和字符之间的转换以计算单词数。
- 优雅退出：用途`fclose`和`perror`用于错误报告。
- 默认行为：当没有传递任何标志时，将打印所有计数。

#### 第 7 步：使其更加稳健

您可以轻松扩展该程序：

添加`-q`用于安静模式（仅打印总计）。

添加`--help`获取扩展使用信息。

使用`getline()`用于读取整行（C POSIX）。

在一行中并排打印计数：

```
12  85  430  example.txt
```

#### 步骤 8. 跨平台注意事项

- 使用`#ifdef _WIN32`处理文件路径和换行符差异。
- 始终以文本模式打开文件：`fopen(filename, "r")`.
- 使用`size_t`而不是`long`为了便携性。

#### 第 9 步：为什么它很重要

编写 CLI 可以教授关键的系统技能：

- 参数解析和 I/O
- 文件处理和错误检查
- 性能思维（流、缓冲）
- 面向未来功能的模块化设计

每个用 C 语言编写的开发人员最终都会编写 CLI，这就是 Git、Curl 和 GCC 等工具的诞生。

#### 第 10 步：亲自尝试一下

1.添加一个`-v`显示程序版本的标志。
2.支持读取多个文件。
3.添加计时（使用`clock()`来测量运行时间）。
4. 打印所有文件的总计。
5. 集成您的简单数学库来计算每行的平均单词数。

接下来，您将转向 93. 微型 HTTP 服务器（套接字和线程），在这里您的命令行技能将发展为网络编程：接受连接、处理请求以及用纯 C 语言提供内容。
