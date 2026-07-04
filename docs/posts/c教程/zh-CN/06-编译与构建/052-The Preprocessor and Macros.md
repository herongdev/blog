---
title: "52. 预处理器和宏"
date: "2026-07-04"
lang: "zh-CN"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "06-编译与构建"
  - "中文"
description: "The Little Book of C 中文版 — 52. 预处理器和宏"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
translator: "机器辅助翻译（Google Translate）"
section: 52
sidebarWeight: 52
alternateZh: "/posts/c教程/zh-CN/06-编译与构建/052-The Preprocessor and Macros"
alternateEn: "/posts/c教程/en-US/06-Compilation and Build/052-The Preprocessor and Macros"
---

[English version](/posts/c教程/en-US/06-Compilation and Build/052-The Preprocessor and Macros)

在编译 C 代码之前，它会经过一个强大的文本处理阶段，称为预处理器。这是包含头文件、扩展宏和进行条件编译的地方。

预处理器不“理解”C，它执行文本替换和文件包含，为编译器准备代码。

#### 步骤 1. 预处理器的作用

每一行以`#`是一个预处理器指令。常见的包括：

|指令|目的|
| --- | --- |
|`#include`|插入头文件的内容 |
|`#define`|定义宏或常量 |
|`#undef`|删除宏定义 |
|`#if`,`#ifdef`,`#ifndef`|条件编译 |
|`#else`,`#elif`,`#endif`|预处理器的分支逻辑 |
|`#error`|停止编译并显示消息 |
|`#pragma`|编译器特定指令 |

#### 小代码：查看实际效果

创造`macro.c`:

```
#include <stdio.h>
#define PI 3.14159
#define CIRCLE_AREA(r) (PI * (r) * (r))
#define SQUARE(x) ((x) * (x))
int main(void) {
    printf("PI = %.2f\n", PI);
    printf("Area of circle (r=2): %.2f\n", CIRCLE_AREA(2));
    printf("Square of 5: %d\n", SQUARE(5));
    return 0;
}
```

编译并运行：

```
gcc macro.c -o macro
./macro
```

输出：

```
PI = 3.14
Area of circle (r=2): 12.57
Square of 5: 25
```

#### 步骤 2. 扩展宏

您可以在编译前检查预处理器输出：

```
gcc -E macro.c -o macro.i
```

打开`macro.i`，你会看到全部`#include`文件被扩展，宏被替换为它们的值。

这是调试宏行为或检查标准标头扩展大小的好方法。

#### 步骤 3. 类似函数的宏

宏看起来像函数，但它们是内联扩展的，这意味着没有调用开销，但也没有类型安全。

```
#define ADD(a, b) ((a) + (b))
```

用法：

```
printf("%d\n", ADD(2, 3));  // becomes ((2) + (3))
```

小心缺少括号：

```
#define BAD_ADD(a, b) a + b
printf("%d\n", 2 * BAD_ADD(3, 4)); // expands to 2 * 3 + 4 → 10, not 14
```

始终将参数和整个表达式括在括号中。

#### 步骤 4. 字符串化和标记粘贴

宏可以使用特殊运算符来操作文本。

字符串化 (`#`) 将参数转换为字符串文字：

```
#define PRINT_EXPR(expr) printf(#expr " = %d\n", expr)
```

用法：

```
int x = 5, y = 10;
PRINT_EXPR(x + y);  // prints: x + y = 15
```

标记粘贴 (`##`) 连接标记：

```
#define MAKE_VAR(name, num) name##num
int MAKE_VAR(counter, 1) = 42;  // becomes int counter1 = 42;
```

#### 步骤 5. 条件编译

您可以根据条件包含或排除代码：

```
#define DEBUG 1
#if DEBUG
    #define LOG(msg) printf("DEBUG: %s\n", msg)
#else
    #define LOG(msg)
#endif
```

用法：

```
int main(void) {
    LOG("Starting program");
    printf("Running main logic\n");
    return 0;
}
```

编译有或没有`-DDEBUG=1`:

```
gcc -DDEBUG=1 log.c -o log
```

您还可以使用：

```
#ifdef DEBUG
#ifndef RELEASE
```

#### 步骤 6. 接头护罩

通过使用预处理器防护来防止多次包含同一头文件：

```
#ifndef MY_HEADER_H
#define MY_HEADER_H
void greet(void);
#endif
```

如果`MY_HEADER_H`已经定义，内容被跳过。这可以防止跨多个包含的重复定义。

#### 步骤 7. 内置宏

编译器自动定义了一些方便的宏：

|宏|扩展到 |
| --- | --- |
|`__FILE__`|当前文件名 |
|`__LINE__`|当前行号 |
|`__DATE__`|编译日期 |
|`__TIME__`|编译时间|
|`__func__`|当前函数名称 (C99+) |

例子：

```
printf("Error at %s:%d in %s()\n", __FILE__, __LINE__, __func__);
```

输出：

```
Error at macro.c:10 in main()
```

#### 小代码：调试宏

```
#define DEBUG_PRINT(fmt, ...) \
    fprintf(stderr, "[%s:%d] " fmt "\n", __FILE__, __LINE__, __VA_ARGS__)
int main(void) {
    int x = 10;
    DEBUG_PRINT("x = %d", x);
    return 0;
}
```

输出：

```
[macro.c:5] x = 10
```

这就是使用宏在 C 中实现日志记录框架的方式。

#### 步骤 8. 取消定义和重新定义

您可以使用以下命令删除宏`#undef`:

```
#undef PI
#define PI 3.14
```

这通常在大型项目中使用，以避免库之间的宏名称冲突。

#### 为什么它很重要

预处理器在编译时赋予 C 灵活性和强大功能，从而能够：

- 跨平台构建（条件编译）
- 调试日志系统
- 内联性能优化
- 简化的配置管理

它也是一把双刃剑，过度使用宏会使代码难以调试和维护。现代 C 在大多数用例中都支持内联函数（参见第 54 节），但宏对于低级系统工作仍然是不可或缺的。

#### 自己尝试一下

1. 编写一个宏，在没有临时变量的情况下交换两个变量。
2. 实施`LOG(level, msg)`仅当以下情况时才打印消息的宏`level >= MIN_LOG_LEVEL`.
3. 使用`__DATE__`和`__TIME__`打印构建信息。
4. 为您的所有内容添加标头防护`.h`文件并测试多个包含项。
5. 尝试`gcc -E`在不同的程序上了解预处理如何改变源。

在下一节中，您将深入了解条件编译，根据平台、功能或调试需求控制程序的哪些部分是构建的。
