---
title: "87. 将 C 与其他语言结合使用 (FFI)"
date: "2026-07-04"
lang: "zh-CN"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "09-可移植与现代 C"
  - "中文"
description: "The Little Book of C 中文版 — 87. 将 C 与其他语言结合使用 (FFI)"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
translator: "机器辅助翻译（Google Translate）"
section: 87
sidebarWeight: 87
alternateZh: "/posts/c教程/zh-CN/09-可移植与现代 C/087-Using C with Other Languages (FFI)"
alternateEn: "/posts/c教程/en-US/09-Portable and Modern C/087-Using C with Other Languages (FFI)"
---

[English version](/posts/c教程/en-US/09-Portable and Modern C/087-Using C with Other Languages (FFI))

C 通常被称为通用汇编语言，几乎所有现代语言都可以调用它。这是通过外部函数接口 (FFI) 实现的，它定义了不同语言如何与 C 代码交互。

在本节中，您将学习如何将 C 函数公开给 Python、Rust 和 Go，以及如何在 C 中调用这些语言的函数。

#### 步骤 1. 什么是 FFI？

FFI（外部函数接口）是一个桥梁，允许用一种语言编写的程序使用另一种语言编写的代码。

为什么 FFI 很重要：

- 重用快速、低级 C 库（例如 OpenSSL、SQLite）。
- 将 C 模块集成到 Python 或 Go 等高级语言中。
- 扩展现有程序而无需重写所有内容。
- 将系统级控制与生产力相结合。

#### 步骤 2. 基础：C ABI

ABI（应用程序二进制接口）定义了函数调用、参数和数据结构在内存中的表示方式。 FFI 之所以有效，是因为 C 具有稳定且简单的 ABI。

规则包括：

- 参数如何传递（寄存器或堆栈）。
- 如何处理返回值。
- 数据类型如何在内存中对齐。

这就是为什么几乎每种语言都提供了一种“讲”C ABI 的方法。

#### 步骤 3. 将 C 函数公开给其他语言

您可以通过将 C 函数标记为可由其他语言调用`extern "C"`（如果编译为 C++）或只是常规 C 函数。

小代码：共享 C 库

```
// file: mathlib.c
#include <stdio.h>
int add(int a, int b) {
    return a + b;
}
int multiply(int a, int b) {
    return a * b;
}
```

将其编译成共享库：

```
gcc -shared -fPIC -o libmathlib.so mathlib.c
```

这创建了一个`.so`（Linux）或`.dll`（Windows）或`.dylib`(macOS) 文件，您可以加载其他语言版本。

#### 步骤 4. 在 Python 中使用 C (ctypes)

Python可以直接调用C函数`ctypes`模块。

```
import ctypes
lib = ctypes.CDLL("./libmathlib.so")
print(lib.add(2, 3))
print(lib.multiply(4, 5))
```

输出：

```
5
20
```

Python 自动转换标准类型 (`int`,`float`,`char *`) 到 C 等价物。

对于更复杂的类型，您可以定义`ctypes.Structure`与您的 C 结构相匹配的类。

#### 步骤 5. 在 Rust 中使用 C

Rust 有一个内置的`extern "C"`FFI 的封锁。

生锈示例：

```
#[link(name = "mathlib")]
extern "C" {
    fn add(a: i32, b: i32) -> i32;
}
fn main() {
    unsafe {
        println!("{}", add(2, 3));
    }
}
```

编译：

```
rustc main.rs -L .
```

Rust 强制执行`unsafe`因为它无法验证 C 函数内部发生了什么。

#### 步骤 6. 在 Go 中使用 C

Go 使用`import "C"`无缝 C 集成指令。

去示例：

```
/*
#include "mathlib.c"
*/
import "C"
import "fmt"
func main() {
    fmt.Println(C.add(2, 3))
}
```

编译并运行：

```
go run main.go
```

Go 将在幕后编译您的 C 代码并自动链接它。

#### 步骤 7. 从 C 调用外部代码

您也可以采取另一种方式，在 C 中调用另一种语言的函数。

示例：C 调用 Python

```
#include <Python.h>
int main(void) {
    Py_Initialize();
    PyRun_SimpleString("print('Hello from Python in C!')");
    Py_Finalize();
}
```

编译：

```
gcc main.c -o main $(python3-config --cflags --ldflags)
```

这会在您的 C 程序中嵌入一个 Python 解释器，对于脚本编写或 AI 集成来说非常强大。

#### 步骤 8. 跨语言的数据结构

FFI 最适合简单的、C 兼容类型：

-`int`,`double`,`char *`和平面结构。避免使用 C++ 类、指向复杂结构的指针或可变长度数组，它们通常不能干净地转换。

例子：

```
typedef struct {
    int id;
    double score;
} Record;
```

您可以从 Python 轻松使用此结构（`ctypes.Structure`) 或 铁锈 (`#[repr(C)] struct`).

#### 步骤 9. 内存所有权规则

始终定义谁分配内存和谁释放内存。

如果 C 分配了一些东西：

```
char* greet(void) {
    char* s = malloc(32);
    sprintf(s, "Hello from C!");
    return s;
}
```

然后调用者（例如Python）必须调用`free()`通过 FFI 以避免泄漏。永远不要假设另一种语言的垃圾收集器会清理 C 内存。

#### 步骤 10. 微小代码：C 共享库 + Python

```
// greet.c
#include <stdio.h>
#include <stdlib.h>
char* greet(const char* name) {
    static char buf[64];
    snprintf(buf, sizeof(buf), "Hello, %s!", name);
    return buf;
}
```

编译：

```
gcc -shared -fPIC -o libgreet.so greet.c
```

Python：

```
import ctypes
lib = ctypes.CDLL("./libgreet.so")
lib.greet.restype = ctypes.c_char_p
print(lib.greet(b"World"))
```

输出：

```
Hello, World!
```

#### 为什么它很重要

FFI 将 C 语言变成了软件世界的基础，您的 C 代码可以为用任何语言编写的系统提供动力。这就是数据库、操作系统内核和人工智能框架跨生态系统公开 API 的方式。了解 FFI 意味着您可以构建语言桥梁，而不仅仅是程序。

#### 自己尝试一下

1. 编写一个简单的 C 库（数学、字符串或排序）。
2. 使用Python加载它`ctypes`并调用它的函数。
3. 使用 Rust 重用相同的库`extern "C"`.
4. 在 C 中嵌入 Python 作为脚本层。
5. 考虑哪一方应该拥有和释放内存。

接下来，您将探索更安全的替代方案和现代 C 功能、边界检查、静态断言以及使 C 代码更可靠的方法。
