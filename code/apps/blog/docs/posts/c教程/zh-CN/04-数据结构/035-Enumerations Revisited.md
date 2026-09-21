---
title: "35. 重温枚举"
date: "2026-07-04"
lang: "zh-CN"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "04-数据结构"
  - "中文"
description: "The Little Book of C 中文版 — 35. 重温枚举"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
translator: "机器辅助翻译（Google Translate）"
section: 35
sidebarWeight: 35
alternateZh: "/posts/c教程/zh-CN/04-数据结构/035-Enumerations Revisited"
alternateEn: "/posts/c教程/en-US/04-Structuring Data/035-Enumerations Revisited"
---

[English version](/posts/c教程/en-US/04-Structuring Data/035-Enumerations Revisited)

你见过`enum`在学习常量时简要介绍过，但现在是时候将其用作一流的设计工具了。枚举为整数值集提供名称，使代码更易于阅读、维护和调试。它们还可以与`struct`,`union`， 和`bitfield`前面部分的模式。

#### 什么是枚举？

一个枚举（`enum`) 定义一个类型，其值仅限于特定的命名常量列表。

例子：

```
enum Color {
    RED,
    GREEN,
    BLUE
};
```

在引擎盖下，`enum Color`是一个整数类型——`RED`= 0,`GREEN`= 1,`BLUE`默认 = 2。

#### 基本用法

```
#include <stdio.h>
enum Direction {
    NORTH,
    EAST,
    SOUTH,
    WEST
};
int main(void) {
    enum Direction d = EAST;
    printf("Current direction: %d\n", d);
    return 0;
}
```

输出：

```
Current direction: 1
```

虽然`EAST`打印为`1`，使用命名常量使您的代码更有意义。

#### 分配自定义值

您可以指定显式整数值，这对于兼容性或映射到实际代码很有用。

```
enum ErrorCode {
    OK = 0,
    FILE_NOT_FOUND = 404,
    SERVER_ERROR = 500
};
```

如果跳过某个值，枚举将继续从最后一个数字开始计数：

```
enum Level {
    LOW = 1,
    MEDIUM,
    HIGH
};
// HIGH = 3
```

#### 小代码

一个使用枚举来清晰程序流程的小程序：

```
#include <stdio.h>
enum Status {
    SUCCESS = 0,
    WARNING = 1,
    ERROR = 2
};
const char* status_to_string(enum Status s) {
    switch (s) {
        case SUCCESS: return "Success";
        case WARNING: return "Warning";
        case ERROR:   return "Error";
        default:      return "Unknown";
    }
}
int main(void) {
    enum Status s = WARNING;
    printf("Status: %s (%d)\n", status_to_string(s), s);
    return 0;
}
```

输出：

```
Status: Warning (1)
```

这个图案，`enum`+`switch`，在 C 项目中无处不在：错误处理、状态机、网络协议等等。

#### 带有结构的枚举

结合`enum`和`struct`对于自描述数据：

```
#include <stdio.h>
enum ShapeType {
    CIRCLE,
    RECTANGLE
};
struct Shape {
    enum ShapeType type;
    union {
        struct { float radius; };
        struct { float width, height; };
    };
};
void print_shape(struct Shape s) {
    if (s.type == CIRCLE)
        printf("Circle with radius %.2f\n", s.radius);
    else
        printf("Rectangle %.2fx%.2f\n", s.width, s.height);
}
int main(void) {
    struct Shape c = {CIRCLE, .radius = 2.5f};
    struct Shape r = {RECTANGLE, .width = 3.0f, .height = 4.0f};
    print_shape(c);
    print_shape(r);
    return 0;
}
```

输出：

```
Circle with radius 2.50
Rectangle 3.00x4.00
```

这对搭配`enum`+`union`是现实系统中的常见模式，称为标记联合。

#### 现代 C (C23) 中的基础类型

在 C23 中，枚举的基础类型是指用于表示内存中枚举值的整数类型。在 C23 之前，此类型是实现定义的，并且可以是能够保存所有枚举器值的任何整数类型，通常是`int`。使用 C23，程序员现在可以使用以下语法显式指定基础类型`enum name : type`，允许精确控制存储大小和符号（例如，`enum color : unsigned char`).

这可以实现更高效的内存使用和跨平台的可预测行为，特别是在嵌入式系统中或与硬件连接时。具有固定基础类型的枚举与该类型兼容，并且必须容纳所有枚举器值；否则，会出现编译时错误。

例子：

```
enum color : unsigned char {
    RED,
    GREEN,
    BLUE
};
```

#### 为什么它很重要

枚举使您的代码语义清晰：

- 用有意义的名称替换“幻数”。
- 简化调试和日志记录。
- 启用编译时检查，您不能轻易分配无效常量。
- 与结构、联合和位域干净地结合以表达状态机或协议。

它们还提高了可移植性，您的程序逻辑是按意图描述的，而不是任意数字。

#### 自己尝试一下

1. 定义一个枚举`TrafficLight { RED, YELLOW, GREEN }`并根据其值打印消息。
2. 创建一个枚举`FileType { TEXT, BINARY, UNKNOWN }`并在里面使用它`struct FileInfo`.
3. 扩展你的 tagged-union 模式：添加`TRIANGLE`到`Shape`枚举。
4. 写一个`switch`映射的语句`enum ErrorCode`到错误消息。
5. 尝试显式设置值并跳过一些值，观察自动增量行为。

枚举使您的程序用概念而不是数字来说话。它们是清晰度、可读性和稳健设计的关键，是人类意义和机器表示之间的桥梁。
