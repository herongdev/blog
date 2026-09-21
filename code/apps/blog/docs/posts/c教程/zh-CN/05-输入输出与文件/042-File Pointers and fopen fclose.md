---
title: "42. 文件指针和 fopen / fclose"
date: "2026-07-04"
lang: "zh-CN"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "05-输入输出与文件"
  - "中文"
description: "The Little Book of C 中文版 — 42. 文件指针和 fopen / fclose"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
translator: "机器辅助翻译（Google Translate）"
section: 42
sidebarWeight: 42
alternateZh: "/posts/c教程/zh-CN/05-输入输出与文件/042-File Pointers and fopen fclose"
alternateEn: "/posts/c教程/en-US/05-Input Output and Files/042-File Pointers and fopen fclose"
---

[English version](/posts/c教程/en-US/05-Input Output and Files/042-File Pointers and fopen fclose)

文件让你的 C 程序记住运行时之外的事情。与程序结束时消失的标准输入和输出不同，文件提供持久存储，您可以在运行之间读取和写入数据。

本节介绍 C 语言中的关键文件处理 API：`fopen()`,`fclose()`,`fprintf()`,`fscanf()`，以及他们的亲戚。

#### 大局观

C 中的文件 I/O 使用`FILE *`代表一个打开的文件的指针。您不直接操作磁盘，而是通过运行时管理的缓冲文件流进行读写。

```
FILE *fp = fopen("data.txt", "r");
```

这将返回一个指向`FILE`如果成功则反对，或者`NULL`如果文件无法打开。

#### 文件模式

打开文件时，您指定一种模式，即您打算用它做什么。

|模式|意义|行为 |
| --- | --- | --- |
|`"r"`|阅读 |如果文件不存在则失败 |
|`"w"`|写 |创建新的或截断现有的 |
|`"a"`|附加|打开或创建；写到最后 |
|`"r+"`|读/写 |必须存在 |
|`"w+"`|读/写 |如果存在则截断 |
|`"a+"`|读/写 |追加；阅读从头开始|

#### 小代码：写入和读取文件

```
#include <stdio.h>
int main(void) {
    FILE *fp = fopen("example.txt", "w");
    if (!fp) {
        perror("Failed to open file");
        return 1;
    }
    fprintf(fp, "Hello, file world!\n");
    fprintf(fp, "C makes you closer to the machine.\n");
    fclose(fp);
    fp = fopen("example.txt", "r");
    if (!fp) {
        perror("Failed to reopen file");
        return 1;
    }
    char line[100];
    printf("--- File Content ---\n");
    while (fgets(line, sizeof(line), fp))
        printf("%s", line);
    fclose(fp);
    return 0;
}
```

输出：

```
--- File Content ---
Hello, file world!
C makes you closer to the machine.
```

#### 它是如何运作的

1.`fopen()`创建与文件的连接。
2.`fprintf()`写入格式化文本，就像`printf()`但对于文件流。
3.`fclose()`刷新缓冲区并关闭文件。
4. 重新打开`"r"`模式来阅读您所写的内容。

您还可以与`fscanf()`读取格式化数据。

#### 检查错误

始终检查文件操作是否有错误。使用`if (!fp)`后`fopen()`，并使用`perror()`打印原因。

```
FILE *f = fopen("missing.txt", "r");
if (!f) {
    perror("Error opening file");
}
```

输出示例：

```
Error opening file: No such file or directory
```

#### 使用 fscanf 读取格式化数据

您可以使用解析文本文件`fscanf()`，就像`scanf()`:

```
#include <stdio.h>
int main(void) {
    FILE *fp = fopen("numbers.txt", "r");
    if (!fp) return 1;
    int a, b;
    while (fscanf(fp, "%d %d", &a, &b) == 2)
        printf("%d + %d = %d\n", a, b, a + b);
    fclose(fp);
    return 0;
}
```

如果`numbers.txt`包含：

```
2 3
10 15
7 9
```

输出：

```
2 + 3 = 5
10 + 15 = 25
7 + 9 = 16
```

#### 文件位置和倒带

您可以使用以下方法移动文件：

```
fseek(fp, 0, SEEK_SET);  // go to beginning
fseek(fp, 0, SEEK_END);  // go to end
rewind(fp);              // reset to start
```

要知道你在哪里：

```
long pos = ftell(fp);
printf("Current position: %ld\n", pos);
```

#### 写入二进制数据

文本文件是人类可读的；二进制文件存储原始字节。你将使用`fwrite()`和`fread()`为此（下一节将详细介绍）。

例子：

```
int numbers[] = {1, 2, 3, 4};
fwrite(numbers, sizeof(int), 4, fp);
```

#### 为什么它很重要

文件 I/O 是 C 程序和现实世界之间的桥梁：

- 配置和日志文件
- 数据库存储
- 缓存和序列化
- 操作系统实用程序（复制、移动、grep 等）

它总是教导资源管理`fopen()`和`fclose()`两人一组，检查错误，并优雅地处理故障。

#### 自己尝试一下

1. 编写一个程序，询问您的姓名并将其保存到`user.txt`.
2. 每次程序运行时附加时间戳。
3. 读取所有行并计算程序已执行的次数。
4. 修改示例以反转从文件读取的所有行。
5. 使用优雅地处理丢失的文件`perror()`.

您现在知道如何安全地打开、读取和写入文本文件。接下来，您将深入了解二进制文件，其中数据以原始字节移动，非常适合高效存储结构和数组。
