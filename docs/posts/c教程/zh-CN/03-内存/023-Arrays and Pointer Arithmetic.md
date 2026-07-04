---
title: "23. 数组和指针算术"
date: "2026-07-04"
lang: "zh-CN"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "03-内存"
  - "中文"
description: "The Little Book of C 中文版 — 23. 数组和指针算术"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
translator: "机器辅助翻译（Google Translate）"
section: 23
sidebarWeight: 23
alternateZh: "/posts/c教程/zh-CN/03-内存/023-Arrays and Pointer Arithmetic"
alternateEn: "/posts/c教程/en-US/03-Working with Memory/023-Arrays and Pointer Arithmetic"
---

[English version](/posts/c教程/en-US/03-Working with Memory/023-Arrays and Pointer Arithmetic)

数组是包含相同类型元素的连续存储单元块。数组和指针在 C 中紧密相连，事实上，数组的名称通常表现为指向其第一个元素的指针。了解数组和指针算术如何协同工作是编写快速、内存高效的程序的关键。

#### 声明和使用数组

```
#include <stdio.h>
int main(void) {
    int numbers[5] = {10, 20, 30, 40, 50};
    for (int i = 0; i < 5; i++) {
        printf("numbers[%d] = %d\n", i, numbers[i]);
    }
    return 0;
}
```

输出：

```
numbers[0] = 10
numbers[1] = 20
numbers[2] = 30
numbers[3] = 40
numbers[4] = 50
```

这里：

-`numbers`是一个由五个整数组成的数组。
- 每个元素在内存中彼此相邻存储。
- 编译器知道每个`int`占用相同的字节数，因此可以找到`numbers[i]`快速使用指针运算。

#### 数组名称作为指针

当您使用数组的名称（不带索引）时，它充当指向其第一个元素的指针。

```
int numbers[3] = {1, 2, 3};
int *p = numbers;  // same as &numbers[0]
printf("%d %d %d\n", *p, *(p + 1), *(p + 2));
```

输出：

```
1 2 3
```

每次向指针加 1 时，它都会向前移动一个元素，不是一个字节，而是该类型的一个对象。

#### 小代码

这是一个显示数组访问和指针算术的完整示例：

```
#include <stdio.h>
int main(void) {
    int arr[5] = {2, 4, 6, 8, 10};
    int *ptr = arr; // arr decays to pointer to arr[0]
    printf("Accessing with array index:\n");
    for (int i = 0; i < 5; i++) {
        printf("arr[%d] = %d\n", i, arr[i]);
    }
    printf("\nAccessing with pointer arithmetic:\n");
    for (int i = 0; i < 5; i++) {
        printf("*(ptr + %d) = %d\n", i, *(ptr + i));
    }
    printf("\nAddresses in memory:\n");
    for (int i = 0; i < 5; i++) {
        printf("&arr[%d] = %p\n", i, (void *)&arr[i]);
    }
    return 0;
}
```

编译并运行：

```
gcc array_pointer.c -o array_pointer
./array_pointer
```

输出（地址会有所不同）：

```
使用数组索引访问：
arr[0] = 2
arr[1] = 4
arr[2] = 6
arr[3] = 8
arr[4] = 10

使用指针算术访问：
*(ptr + 0) = 2
*(ptr + 1) = 4
*(ptr + 2) = 6
*(ptr + 3) = 8
*（指针+ 4）= 10

内存中的地址：
&arr[0] = 0x7ffcc73f9a60
&arr[1] = 0x7ffcc73f9a64
&arr[2] = 0x7ffcc73f9a68
&arr[3] = 0x7ffcc73f9a6c
&arr[4] = 0x7ffcc73f9a70
```

您可以看到每个元素相距 4 个字节（典型大小为`int`).

#### 指针运算规则

当您移动指针时，C 会自动按它们指向的类型的大小进行缩放：

|表达 |意义|
| --- | --- |
|`p + 1`|移至下一个元素 |
|`p - 1`|移至上一个元素 |
|`*(p + i)`|访问当前元素之后的第 i 个元素 |
|`p2 - p1`|返回两个指针之间的元素数量 |

例子：

```
int *start = arr;
int *end = arr + 5;
printf("Array length: %ld\n", end - start); // prints 5
```

#### 常见陷阱

越界访问访问超出数组有效范围的内存会导致未定义的行为：

```
arr[5] = 99; // invalid! array has only indices 0-4
```

数组衰减 当传递给函数时，数组“衰减”为指针，它们会丢失大小信息。您必须手动传递长度。

```
void print_array(int *arr, int len);
```

指针混淆 请记住`arr[i]`和`*(arr + i)`意思是一样的。混合它们很好，但为了可读性要保持一致。

#### 为什么它很重要

数组和指针构成了 C 数据结构的基础。您将使用它们来构建：

- 字符串（数组`char`)
- 矩阵（数组的数组）
- 链表和树（通过指针算术）

一旦您习惯将数组视为通过指针访问的连续内存块，您就可以像真正的系统程序员一样开始设计自己的数据结构。

#### 自己尝试一下

1. 编写一个仅使用指针打印数组的函数（无`[]`句法）。
2. 创建一个数组`char`并将其打印为字符串和单独的字符。
3. 声明一个包含 10 个数字的数组，然后使用指针对它们求和。
4. 打印两个元素之间的地址差。
5. 创建一个二维数组并使用嵌套循环打印它。

在 C 语言中，数组和指针是同一枚硬币的两面。一旦理解了它们的联系，您就会发现直接内存访问是多么强大、优雅。
