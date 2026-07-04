---
title: "28. 函数指针和回调"
date: "2026-07-04"
lang: "zh-CN"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "03-内存"
  - "中文"
description: "The Little Book of C 中文版 — 28. 函数指针和回调"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
translator: "机器辅助翻译（Google Translate）"
section: 28
sidebarWeight: 28
alternateZh: "/posts/c教程/zh-CN/03-内存/028-Function Pointers and Callbacks"
alternateEn: "/posts/c教程/en-US/03-Working with Memory/028-Function Pointers and Callbacks"
---

[English version](/posts/c教程/en-US/03-Working with Memory/028-Function Pointers and Callbacks)

C 中的函数也是值，它们存在于内存中并且像变量一样有地址。函数指针是存储函数地址的指针，允许您间接调用该函数。这个想法为 C 中的回调、事件系统、自定义排序器和插件架构提供了支持。

#### 什么是函数指针？

一样`int *`指向一个整数，函数指针指向一个函数。

句法：

```
return_type (*pointer_name)(parameter_types);
```

例子：

```
int add(int a, int b) {
    return a + b;
}
int (*func_ptr)(int, int) = add;
```

现在您可以通过指针调用该函数：

```
int result = func_ptr(2, 3); // same as add(2, 3)
```

#### 小代码

下面是一个完整的示例，展示了如何声明、分配和调用函数指针：

```
#include <stdio.h>
int add(int a, int b) { return a + b; }
int sub(int a, int b) { return a - b; }
int mul(int a, int b) { return a * b; }
void operate(int x, int y, int (*op)(int, int)) {
    printf("Result: %d\n", op(x, y)); // call through pointer
}
int main(void) {
    int (*f)(int, int); // declaration
    f = add;
    printf("Add via pointer: %d\n", f(5, 3));
    f = sub;
    printf("Subtract via pointer: %d\n", f(5, 3));
    printf("\nUsing callback function:\n");
    operate(4, 6, mul); // pass function pointer as argument
    return 0;
}
```

编译并运行：

```
gcc func_pointer_demo.c -o func_pointer_demo
./func_pointer_demo
```

输出：

```
通过指针添加：8
通过指针减：2

使用回调函数：
结果：24
```

#### 数组中的函数指针

您还可以在数组中存储多个函数指针，这对于构建操作表很有用。

```
int (*ops[3])(int, int) = {add, sub, mul};
for (int i = 0; i < 3; i++)
    printf("ops[%d](4, 2) = %d\n", i, ops[i](4, 2));
```

输出：

```
ops[0](4, 2) = 6
ops[1](4, 2) = 2
ops[2](4, 2) = 8
```

这种模式是 C 中调度表、解释器和虚拟函数系统的基础。

#### 回调

回调是作为参数传递给另一个函数的函数，让被调用者“回调”到用户代码中。这种模式在事件驱动和模块化设计中至关重要。

示例：接受回调的简单迭代器

```
#include <stdio.h>
void for_each(int *arr, int n, void (*callback)(int)) {
    for (int i = 0; i < n; i++)
        callback(arr[i]);
}
void print_square(int x) {
    printf("%d^2 = %d\n", x, x * x);
}
int main(void) {
    int nums[] = {1, 2, 3, 4, 5};
    for_each(nums, 5, print_square); // pass callback
    return 0;
}
```

输出：

```
1^2 = 1
2^2 = 4
3^2 = 9
4^2 = 16
5^2 = 25
```

#### 为什么它很重要

函数指针可以让你：

- 选择运行时的行为（动态调度）。
- 将逻辑传递到库中而无需重新编译它们。
- 构建框架、事件处理程序、解释器和插件。
- 用优雅的调度表取代巨大的开关盒结构。

它们也是 C 的实现方式：

-`qsort()`和`bsearch()`比较函数，
- 信号处理程序（`signal(SIGINT, handler)`）， 和
- GUI 或内核中的系统回调。

#### 自己尝试一下

1. 编写三个算术函数并将它们存储在函数指针数组中。
2. 建立一个`calculate(a, b, char op)`函数根据以下条件选择正确的函数指针`op`.
3. 实现回调式循环，为每个数组元素调用用户定义的函数。
4. 传递一个函数指针`qsort()`从`<stdlib.h>`按降序对整数进行排序。
5. 编写一个小型菜单系统，根据用户选择调用正确的功能。

函数指针和回调为您的程序提供灵活性和抽象性，而不会牺牲速度。它们是 C 实现动态行为的方式，是数据和可执行逻辑之间的桥梁。
