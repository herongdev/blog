---
title: "34. 位域和内存打包"
date: "2026-07-04"
lang: "zh-CN"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "04-数据结构"
  - "中文"
description: "The Little Book of C 中文版 — 34. 位域和内存打包"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
translator: "机器辅助翻译（Google Translate）"
section: 34
sidebarWeight: 34
alternateZh: "/posts/c教程/zh-CN/04-数据结构/034-Bitfields and Memory Packing"
alternateEn: "/posts/c教程/en-US/04-Structuring Data/034-Bitfields and Memory Packing"
---

[English version](/posts/c教程/en-US/04-Structuring Data/034-Bitfields and Memory Packing)

C 允许您使用位域将数据布局控制到位级别。它们允许您在结构内紧凑地存储小值，非常适合标志、配置寄存器或通信协议。与打包相结合，您可以将数据压缩到最小的空间，同时仍然保持易于符号操作。

#### 什么是位域？

位字段允许您定义为内部字段分配的确切位数。`struct`.

例子：

```
struct Flags {
    unsigned int is_visible : 1;
    unsigned int is_enabled : 1;
    unsigned int has_error  : 1;
};
```

这里，每个字段仅使用 1 位，而不是完整的 4 字节`int`。这意味着 8 个这样的标志可以轻松容纳在一个字节中。

#### 声明和使用位域

```
#include <stdio.h>
struct Status {
    unsigned int connected : 1;
    unsigned int error     : 1;
    unsigned int active    : 1;
    unsigned int reserved  : 5; // padding bits
};
int main(void) {
    struct Status s = {1, 0, 1, 0};
    printf("Connected: %u, Active: %u\n", s.connected, s.active);
    s.error = 1;
    printf("Error now: %u\n", s.error);
    return 0;
}
```

输出：

```
Connected: 1, Active: 1
Error now: 1
```

尽管有 4 个字段，但整个结构通常只占用 1 个字节。

#### 小代码

这是一个完整的示例，演示了打包标志和打印位值：

```
#include <stdio.h>
struct DeviceStatus {
    unsigned int powered_on : 1;
    unsigned int connected  : 1;
    unsigned int has_error  : 1;
    unsigned int battery_low: 1;
    unsigned int reserved   : 4;
};
void print_bits(unsigned char byte) {
    for (int i = 7; i >= 0; i--)
        printf("%d", (byte >> i) & 1);
    printf("\n");
}
int main(void) {
    struct DeviceStatus d = {1, 1, 0, 0, 0};
    printf("Size of DeviceStatus: %zu bytes\n", sizeof(d));
    unsigned char *raw = (unsigned char*)&d;
    printf("Binary layout: ");
    print_bits(*raw);
    d.has_error = 1;
    printf("Updated binary: ");
    print_bits(*raw);
    return 0;
}
```

输出（可能因平台而异）：

```
Size of DeviceStatus: 1 bytes
Binary layout: 00000011
Updated binary: 00000111
```

#### 嵌套位域示例

您甚至可以在嵌套结构中使用位字段来创建紧凑但富有表现力的数据模型：

```
struct Sensor {
    unsigned id       : 4;  // 0–15
    unsigned type     : 3;  // 0–7
    unsigned active   : 1;  // boolean
};
struct Device {
    struct Sensor sensors[2];
};
```

现在，每个传感器条目都整齐地装入一个字节中。

#### 内存打包

默认情况下，编译器可能会插入填充字节来对齐字段以加快访问速度。如果您想要更紧密的打包，例如，将二进制数据保存到文件或通过网络发送时，您可以请求打包结构。

编译器指令因系统而异：

```
#pragma pack(push, 1)
struct Packet {
    char type;
    unsigned int length;
    short checksum;
};
#pragma pack(pop)
```

现在，结构体紧密包装，字段之间没有对齐填充。

#### 实际系统中的位域

位域在系统编程中无处不在：

- 硬件控制寄存器：代表设备的开/关位。
- 网络协议：TCP、UDP 或 IP 标头中的标志。
- 压缩和序列化：状态或元数据的紧凑表示。
- 嵌入式系统：将 RAM 的每个字节保存在微控制器中。

#### 局限性

- 位字段排序（哪个位是“第一个”）取决于实现，因编译器和平台而异。
- 它们无法跨架构可靠地跨越字边界。
- 位域不能直接用指针寻址（`&field`不允许）。
- 如果跨不同系统传输，字节序很重要。

对于便携式位级控制（尤其是在网络中），许多工程师使用显式位运算符。

#### 手动按位控制

有时您会更喜欢手动蒙版和班次：

```
unsigned char flags = 0;
flags |= (1 << 0); // set bit 0
flags |= (1 << 2); // set bit 2
flags &= ~(1 << 0); // clear bit 0
```

这种方法更便携、更明确，但对于大量标志来说可读性较差。

#### 为什么它很重要

位域使您能够对内存布局和二进制表示进行紧凑的控制。它们在以下方面至关重要：

- 嵌入式固件
- 网络堆栈
- 内核驱动程序
- 压缩库

只要您了解对齐和可移植性问题，它们就会使您的代码富有表现力且高效。

#### 自己尝试一下

1. 定义一个结构体`Permissions`具有 1 位字段`read`,`write`， 和`execute`.
2. 打印其尺寸并检查其紧凑程度。
3. 使用位域结构来表示简化的 TCP 标头（SYN、ACK、FIN 等标志）。
4. 使用`#pragma pack(1)`并观察尺寸差异。
5. 使用按位运算符编写函数来设置、清除和切换位。

位域是 C 与硬件相遇的地方。它们让你不仅可以用字节来与机器对话，还可以用位来与机器对话，这是计算机的真正语言。接下来，您将重新审视枚举，并了解它们如何通过为值赋予符号含义来补充这些紧凑的结构。
