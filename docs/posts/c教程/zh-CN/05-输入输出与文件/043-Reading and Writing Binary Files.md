---
title: "43. 读写二进制文件"
date: "2026-07-04"
lang: "zh-CN"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "05-输入输出与文件"
  - "中文"
description: "The Little Book of C 中文版 — 43. 读写二进制文件"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
translator: "机器辅助翻译（Google Translate）"
section: 43
sidebarWeight: 43
alternateZh: "/posts/c教程/zh-CN/05-输入输出与文件/043-Reading and Writing Binary Files"
alternateEn: "/posts/c教程/en-US/05-Input Output and Files/043-Reading and Writing Binary Files"
---

[English version](/posts/c教程/en-US/05-Input Output and Files/043-Reading and Writing Binary Files)

文本文件易于阅读，但并不总是高效。另一方面，二进制文件完全按照内存中存在的方式存储原始字节，无需格式化，无需转换。它们非常适合保存数组、结构或任何必须快速写入和读回而不会丢失或舍入的数据。

#### 文本与二进制

|方面|文本文件|二进制文件 |
| --- | --- | --- |
|格式|人类可读 (ASCII) |原始字节 |
|尺寸|更大（额外字符、换行符）|更小（紧凑形式）|
|读/写 |`fprintf`,`fscanf`,`fgets`|`fwrite`,`fread`|
|使用案例|日志、配置、报告 |结构、图像、可执行文件、序列化数据 |

当您打开二进制 I/O 文件时，添加`b`到模式：

```
FILE *fp = fopen("data.bin", "wb"); // write binary
FILE *fp = fopen("data.bin", "rb"); // read binary
```

#### 写入二进制数据

让我们将整数数组直接写入磁盘。

```
#include <stdio.h>
int main(void) {
    int numbers[] = {10, 20, 30, 40, 50};
    size_t count = sizeof(numbers) / sizeof(numbers[0]);
    FILE *fp = fopen("numbers.bin", "wb");
    if (!fp) {
        perror("Failed to open file");
        return 1;
    }
    fwrite(numbers, sizeof(int), count, fp);
    fclose(fp);
    printf("Wrote %zu integers to numbers.bin\n", count);
    return 0;
}
```

这会将 5 个整数（在大多数系统上每个整数 4 个字节）作为原始字节直接写入磁盘，不进行文本转换。

#### 读取二进制数据

现在让我们回读一下它们：

```
#include <stdio.h>
int main(void) {
    int numbers[5];
    FILE *fp = fopen("numbers.bin", "rb");
    if (!fp) {
        perror("Failed to open file");
        return 1;
    }
    size_t n = fread(numbers, sizeof(int), 5, fp);
    fclose(fp);
    printf("Read %zu integers:\n", n);
    for (size_t i = 0; i < n; i++)
        printf("%d ", numbers[i]);
    printf("\n");
    return 0;
}
```

输出：

```
Wrote 5 integers to numbers.bin
Read 5 integers:
10 20 30 40 50
```

#### 写作和阅读结构

您可以使用相同的模式直接存储整个结构。

```
#include <stdio.h>
#include <stdlib.h>
typedef struct {
    int id;
    float price;
    char title[50];
} Book;
int main(void) {
    Book b1 = {1, 9.99, "The C Book"};
    Book b2 = {2, 15.49, "Algorithms in C"};
    FILE *fp = fopen("books.bin", "wb");
    if (!fp) return 1;
    fwrite(&b1, sizeof(Book), 1, fp);
    fwrite(&b2, sizeof(Book), 1, fp);
    fclose(fp);
    fp = fopen("books.bin", "rb");
    if (!fp) return 1;
    Book b;
    while (fread(&b, sizeof(Book), 1, fp) == 1)
        printf("%d | %s | %.2f\n", b.id, b.title, b.price);
    fclose(fp);
    return 0;
}
```

输出：

```
1 | The C Book | 9.99
2 | Algorithms in C | 15.49
```

#### 处理字节顺序

二进制文件取决于 CPU 的字节顺序（字节顺序）。如果您在小端机器上写入并在大端机器上读取，则字节可能会出现反转。

对于便携式格式，您可以：

- 使用标准化序列化（如 Protocol Buffers 或 MessagePack）。
- 使用位移位或网络字节顺序函数手动转换（`htonl`,`ntohl`).

手动转换示例：

```
unsigned int to_big_endian(unsigned int x) {
    return ((x & 0xFF) << 24) |
           ((x & 0xFF00) << 8) |
           ((x & 0xFF0000) >> 8) |
           ((x >> 24) & 0xFF);
}
```

#### 附加二进制数据

您可以使用模式附加更多记录`"ab"`:

```
Book b3 = {3, 21.75, "Advanced C"};
FILE *fp = fopen("books.bin", "ab");
fwrite(&b3, sizeof(Book), 1, fp);
fclose(fp);
```

#### 二进制文件实用程序

|功能|目的|
| --- | --- |
|`fwrite(ptr, size, count, file)`|写入二进制数据 |
|`fread(ptr, size, count, file)`|读取二进制数据 |
|`fseek(file, offset, origin)`|移动位置|
|`ftell(file)`|获取当前位置 |
|`rewind(file)`|返回开始 |

#### 为什么它很重要

二进制 I/O 对于以下方面至关重要：

- 有效保存大型数据集
- 游戏保存文件、多媒体格式或科学数据
- 数据库和内存映射存储
- 嵌入式和系统级工具

它是序列化的基础，将内存中的数据转换为可以传输或持久的字节。

#### 自己尝试一下

1. 保存数组`double`值并读回它们。
2. 修改结构示例以包含`enum`字段并测试二进制结果。
3. 实现一个功能`count_records(filename)`计算存储了多少个结构。
4. 使用`fseek()`跳转到第三条记录并仅打印该记录。
5. 写入同一文件的文本和二进制版本并比较大小。

二进制 I/O 将 C 的低级功能与现实世界的存储效率联系起来。接下来，您将通过了解标准流、如何使用来进一步扩展它`stdin`,`stdout`， 和`stderr`构建灵活、可组合的命令行工具。
