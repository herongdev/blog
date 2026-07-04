---
title: "45. 使用 fgets 和 fputs 进行缓冲 I/O"
date: "2026-07-04"
lang: "zh-CN"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "05-输入输出与文件"
  - "中文"
description: "The Little Book of C 中文版 — 45. 使用 fgets 和 fputs 进行缓冲 I/O"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
translator: "机器辅助翻译（Google Translate）"
section: 45
sidebarWeight: 45
alternateZh: "/posts/c教程/zh-CN/05-输入输出与文件/045-Buffered IO with fgets and fputs"
alternateEn: "/posts/c教程/en-US/05-Input Output and Files/045-Buffered IO with fgets and fputs"
---

[English version](/posts/c教程/en-US/05-Input Output and Files/045-Buffered IO with fgets and fputs)

当您的程序读取和写入数据时，它并不总是直接进入磁盘或终端，而是使用缓冲区。缓冲区是临时保存数据的小内存块，通过减少系统执行缓慢 I/O 操作的频率来提高性能。

C 的标准 I/O 库（`<stdio.h>`）会自动为您处理此问题。在本节中，您将了解缓冲的工作原理以及如何使用`fgets`,`fputs`，以及有效管理它的相关功能。

#### 什么是缓冲 I/O？

C 库不是一次读取或写入一个字符，而是：

- 填充缓冲区（用于输入）或
- 收集一批字符（用于输出）

当缓冲区已满或刷新时，数据在程序和文件或终端之间移动。

这就是为什么有时`printf()`输出不会立即出现，它会在缓冲区中等待，直到发生换行或刷新。

#### 输入：fgets()

`fgets()`从流中读取整行（包括空格）并将其存储在字符串中。

```
char *fgets(char *str, int size, FILE *stream);
```

-`str`：存储线的位置
-`size`：读取的最大字符数（包括`\0`)
-`stream`：从哪里读取（例如`stdin`或文件指针）

例子：

```
#include <stdio.h>
int main(void) {
    char line[100];
    printf("Enter a sentence: ");
    if (fgets(line, sizeof(line), stdin))
        printf("You said: %s", line);
    return 0;
}
```

输入：

```
C is beautiful.
```

输出：

```
You said: C is beautiful.
```

如果输入超出缓冲区，`fgets`之后停止阅读`size - 1`字符以防止溢出，并自动以空值终止字符串。

#### 输出：fputs()

`fputs()`将字符串写入流。

```
int fputs(const char *str, FILE *stream);
```

例子：

```
#include <stdio.h>
int main(void) {
    FILE *fp = fopen("output.txt", "w");
    if (!fp) {
        perror("Open failed");
        return 1;
    }
    fputs("Buffered I/O makes C fast.\n", fp);
    fputs("fgets and fputs are line-based tools.\n", fp);
    fclose(fp);
    printf("Wrote to output.txt\n");
    return 0;
}
```

输出文件：

```
Buffered I/O makes C fast.
fgets and fputs are line-based tools.
```

#### 为什么 fgets 比 scanf("%s", …) 更安全

-`fgets()`尊重缓冲区边界
- 它可以正确读取空格和制表符
- 它可以防止溢出的未定义行为

避免这种情况：

```
scanf("%s", buffer); // stops at first space and may overflow
```

更喜欢这个：

```
fgets(buffer, sizeof(buffer), stdin);
```

#### 使用 fputs 写入 stdout 或 stderr

`fputs()`适用于任何输出流，而不仅仅是文件。

```
fputs("Message to screen.\n", stdout);
fputs("Error to stderr!\n", stderr);
```

您甚至可以在 shell 中重定向它们：

```
./program > result.txt 2> error.log
```

#### 逐行读取文件

以下是如何使用以下方法安全地读取文件`fgets()`:

```
#include <stdio.h>
int main(void) {
    FILE *fp = fopen("poem.txt", "r");
    if (!fp) {
        perror("Failed to open file");
        return 1;
    }
    char line[200];
    while (fgets(line, sizeof(line), fp))
        printf("%s", line);
    fclose(fp);
    return 0;
}
```

#### 小代码：复制文件

一个最小的文件复制器使用`fgets`和`fputs`:

```
#include <stdio.h>
int main(void) {
    FILE *in = fopen("input.txt", "r");
    FILE *out = fopen("copy.txt", "w");
    if (!in || !out) {
        perror("File error");
        return 1;
    }
    char buf[256];
    while (fgets(buf, sizeof(buf), in))
        fputs(buf, out);
    fclose(in);
    fclose(out);
    printf("Copied successfully.\n");
    return 0;
}
```

#### 缓冲液冲洗

有时您需要手动刷新输出：

```
fflush(stdout);
```

这对于必须立即显示消息的交互式程序非常有用。

要完全禁用缓冲（例如，用于日志记录）：

```
setbuf(stdout, NULL);
```

#### 为什么它很重要

缓冲 I/O 平衡速度和安全性：

-`fgets`防止溢出
-`fputs`确保高效输出
- 缓冲最大限度地减少缓慢的磁盘和控制台调用

这使得 C 既低级又高性能，而无需强迫您自己管理每个字节。

#### 自己尝试一下

1. 编写一个程序，从 stdin 读取行并将其写入新文件。
2. 计算在 EOF 之前读了多少行。
3. 使用以下命令打印每一行的行号`fgets`和`printf`.
4. 试验缓冲区大小，尝试 16 与 256 字节并注意性能差异。
5. 在交互式日志记录程序的每一行之后刷新输出。

`fgets`和`fputs`为您的文件和控制台 I/O 提供安全、基于行的基础。接下来，您将学习如何使用正确处理错误`errno`,`perror`， 和`strerror`，用 C 语言编写可靠系统程序的基本工具。
