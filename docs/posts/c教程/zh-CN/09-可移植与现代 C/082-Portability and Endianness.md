---
title: "82. 可移植性和字节顺序"
date: "2026-07-04"
lang: "zh-CN"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "09-可移植与现代 C"
  - "中文"
description: "The Little Book of C 中文版 — 82. 可移植性和字节顺序"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
translator: "机器辅助翻译（Google Translate）"
section: 82
sidebarWeight: 82
alternateZh: "/posts/c教程/zh-CN/09-可移植与现代 C/082-Portability and Endianness"
alternateEn: "/posts/c教程/en-US/09-Portable and Modern C/082-Portability and Endianness"
---

[English version](/posts/c教程/en-US/09-Portable and Modern C/082-Portability and Endianness)

可移植性意味着您的 C 程序在任何地方（Linux、Windows、ARM、x86，甚至微型微控制器）都以相同的方式运行。编写可移植代码是系统编程中最难也是最重要的技能之一。

本节帮助您了解最大的低级陷阱：字节顺序，以及如何编写跨架构安全运行的代码。

#### 步骤 1. 什么是可移植性？

可移植的 C 程序是这样的：

- 使用不同的编译器进行干净的编译。
- 在 32 位、64 位和嵌入式系统上正确运行。
- 不假设 CPU、操作系统或编译器行为的详细信息。

可移植性取决于尊重 C 标准的保证，并避免仅在您的机器上正确的假设。

#### 第 2 步：为什么可移植性很重要

您可能会在 macOS (little-endian x86_64) 上编写一个 C 程序，稍后需要在以下设备上运行它：

- Raspberry Pi（ARM，也是小端）
- 大端 PowerPC 路由器
- 嵌入式 MIPS 控制器

如果您的程序读取或写入二进制数据，则它必须处理字节顺序，否则同一文件可能会在另一个体系结构上被误读。

#### 步骤 3. 了解字节顺序

字节顺序定义了多字节值的字节如何存储在内存中。

|类型 |描述 |内存（4 字节 int = 0x12345678）|
| --- | --- | --- |
|小尾数 |最低有效字节在前 |`78 56 34 12`|
|大尾数 |最重要字节在前 |`12 34 56 78`|

Intel 和 ARM（在大多数模式下）都是小端字节序。许多较旧的 CPU（PowerPC、SPARC）都是大端字节序。

C 没有定义字节顺序，它取决于平台。

#### 步骤 4. 在运行时检查字节顺序

```
#include <stdio.h>
int main(void) {
    unsigned int x = 0x12345678;
    unsigned char *p = (unsigned char *)&x;
    if (*p == 0x78)
        printf("Little-endian\n");
    else
        printf("Big-endian\n");
}
```

说明： 指针`p`读取最低内存字节。如果它包含最低有效字节（`0x78`)，它是小端字节序。

#### 步骤 5. 在字节序之间转换

使用标准 POSIX 函数安全地处理转换：

```
#include <arpa/inet.h>  // or <winsock2.h> on Windows
#include <stdint.h>
#include <stdio.h>
int main(void) {
    uint32_t x = 0x12345678;
    uint32_t y = htonl(x); // Host to Network Long (big-endian)
    printf("0x%x -> 0x%x\n", x, y);
}
```

功能：

-`htons`– 主机到网络短（16 位）
-`htonl`– 主机到网络长（32 位）
-`ntohs`– 网络到主机短
-`ntohl`– 网络到主机长

网络字节顺序始终是大端字节序。

#### 步骤 6. 处理文件格式的可移植性

如果将结构直接序列化到磁盘：

```
fwrite(&header, sizeof(header), 1, file);
```

你可能正在编写与机器相关的数据：

- 字节顺序可能不同。
- 填充和对齐方式可能有所不同。
- 结构布局可能因编译器而异。

更好的方法：按照明确的顺序单独编写每个字段：

```
uint32_t size_net = htonl(header.size);
fwrite(&size_net, sizeof(size_net), 1, file);
```

现在，任何机器都可以通过反转转换来读取您的文件（`ntohl`).

#### 步骤 7. 数据类型大小差异

不同系统的字体大小有所不同：

|类型 |典型 32 位 |典型 64 位 |
| --- | --- | --- |
|`char`| 1 字节 | 1 字节 |
|`short`| 2 个字节 | 2 个字节 |
|`int`| 4 字节 | 4 字节 |
|`long`| 4 字节 | 8 字节 |
|`long long`| 8 字节 | 8 字节 |
|`void*`| 4 字节 | 8 字节 |

使用`<stdint.h>`类型（`int32_t`,`uint64_t`等）以获得可预测的尺寸。

#### 步骤 8. 对齐和填充

编译器可能会在结构字段之间插入填充以提高速度或对齐。

例子：

```
struct Example {
    char a;
    int b;
};
```

在大多数系统上：

-`sizeof(struct Example)`= 8，而不是 5（3 个字节的填充）。

要制作可移植格式：

- 使用`#pragma pack(1)`（非标准）或逐个字段序列化。
- 永远不要假设`sizeof(struct)`跨系统都是一样的。

#### 步骤 9. 编译器和操作系统差异

小心：

- 路径分隔符（`/`与`\\`)
- 换行约定（`\n`与`\r\n`)
-`#include <unistd.h>`（仅限 POSIX）
-`system()`命令（特定于操作系统）
- 线程 API (`pthread`与 Windows 线程相比）
- 套接字 API（` `与`<winsock2.h>`)

使用条件编译：

```
#ifdef _WIN32
#include <winsock2.h>
#else
#include <arpa/inet.h>
#endif
```

#### 步骤 10. 小代码：编写可移植二进制 I/O

```
#include <stdio.h>
#include <stdint.h>
#include <arpa/inet.h>
int main(void) {
    FILE *f = fopen("num.bin", "wb");
    uint32_t n = 0x12345678;
    uint32_t net = htonl(n);
    fwrite(&net, sizeof(net), 1, f);
    fclose(f);
    f = fopen("num.bin", "rb");
    uint32_t read_net;
    fread(&read_net, sizeof(read_net), 1, f);
    fclose(f);
    printf("Read back: 0x%x\n", ntohl(read_net));
}
```

该程序以可移植大端形式写入和读取 32 位整数，在任何机器上都是相同的字节。

#### 为什么它很重要

可移植性可确保您的软件比硬件的寿命更长。便携式程序：

- 在不同的 CPU 和操作系统上运行。
- 跨架构安全地共享数据。
- 跨团队和系统建立对代码的信任。

可移植性是一种专业精神，让您的代码面向未来。

#### 自己尝试一下

1. 编写一个程序来检测并打印系统字节顺序。
2. 将结构体序列化为二进制文件，然后在另一个系统上将其反序列化。
3. 使用`htonl`和`ntohl`以确保数据保持一致。
4. 使用 GCC 和 Clang 编译代码。
5. 在 32 位和 64 位架构上进行测试。

接下来，您将探索内联汇编和硬件访问，这是纯 C 和底层 CPU 指令之间的桥梁。
