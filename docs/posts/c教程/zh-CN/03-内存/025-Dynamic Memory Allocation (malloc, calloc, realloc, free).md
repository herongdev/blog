---
title: "25. 动态内存分配（malloc、calloc、realloc、free）"
date: "2026-07-04"
lang: "zh-CN"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "03-内存"
  - "中文"
description: "The Little Book of C 中文版 — 25. 动态内存分配（malloc、calloc、realloc、free）"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
translator: "机器辅助翻译（Google Translate）"
section: 25
sidebarWeight: 25
alternateZh: "/posts/c教程/zh-CN/03-内存/025-Dynamic Memory Allocation (malloc, calloc, realloc, free)"
alternateEn: "/posts/c教程/en-US/03-Working with Memory/025-Dynamic Memory Allocation (malloc, calloc, realloc, free)"
---

[English version](/posts/c教程/en-US/03-Working with Memory/025-Dynamic Memory Allocation (malloc, calloc, realloc, free))

静态数组具有固定大小，但实际程序通常需要在运行时增长或缩小的灵活数据。动态内存分配允许您在程序运行时手动请求、使用和释放内存。它是 C 中最强大和最容易出错的部分之一。

#### 想法

C 提供了四个关键函数`<stdlib.h>`对于动态内存管理：

|功能|目的|
| --- | --- |
|`malloc(size)`|分配一块内存|
|`calloc(n, size)`|分配和清除内存`n`元素|
|`realloc(ptr, size)`|更改先前分配的块的大小 |
|`free(ptr)`|将内存释放回系统 |

它们返回指向已分配内存的指针，或者`NULL`如果分配失败。

#### 基本示例

```
#include <stdio.h>
#include <stdlib.h>
int main(void) {
    int *p = malloc(sizeof(int));  // allocate space for one int
    if (p == NULL) {
        printf("Memory allocation failed.\n");
        return 1;
    }
    *p = 42;  // store a value in allocated memory
    printf("Value: %d\n", *p);
    free(p);  // release the memory
    return 0;
}
```

编译并运行：

```
gcc malloc_demo.c -o malloc_demo
./malloc_demo
```

输出：

```
Value: 42
```

#### 动态分配数组

您可以使用在运行时分配数组`malloc()`或者`calloc()`.

```
int n;
printf("Enter number of elements: ");
scanf("%d", &n);
int *arr = malloc(n * sizeof(int));
if (arr == NULL) {
    printf("Out of memory.\n");
    return 1;
}
// Initialize and print
for (int i = 0; i < n; i++) {
    arr[i] = i * 10;
    printf("%d ", arr[i]);
}
free(arr);
```

输出示例：

```
Enter number of elements: 5
0 10 20 30 40
```

`malloc()`留下内存未初始化，同时`calloc()`将其清零：

```
int *arr = calloc(n, sizeof(int)); // all elements start at 0
```

#### 使用 realloc() 更改内存大小

当您需要调整已分配块的大小（例如，将数组容量加倍）时，请使用`realloc()`.

```
int *arr = malloc(3 * sizeof(int));
arr[0] = 1; arr[1] = 2; arr[2] = 3;
// grow array to 5 elements
int *temp = realloc(arr, 5 * sizeof(int));
if (temp == NULL) {
    printf("Reallocation failed!\n");
    free(arr);
    return 1;
}
arr = temp;
arr[3] = 4;
arr[4] = 5;
for (int i = 0; i < 5; i++)
    printf("%d ", arr[i]);
free(arr);
```

输出：

```
1 2 3 4 5
```

`realloc()`如果可能的话尝试扩大现有区块；如果没有，它会分配一个新块，复制数据，并自动释放旧块。

#### 小代码

这是一个完整的程序结合`malloc`,`calloc`,`realloc`， 和`free`:

```
#include <stdio.h>
#include <stdlib.h>
int main(void) {
    int n = 3;
    int *nums = calloc(n, sizeof(int));
    if (nums == NULL) {
        printf("Initial allocation failed.\n");
        return 1;
    }
    // Fill array
    for (int i = 0; i < n; i++) nums[i] = (i + 1) * 5;
    printf("Initial values: ");
    for (int i = 0; i < n; i++) printf("%d ", nums[i]);
    printf("\n");
    // Resize
    n = 5;
    int *new_nums = realloc(nums, n * sizeof(int));
    if (new_nums == NULL) {
        printf("Reallocation failed.\n");
        free(nums);
        return 1;
    }
    nums = new_nums;
    // Fill new slots
    for (int i = 3; i < n; i++) nums[i] = (i + 1) * 5;
    printf("After realloc: ");
    for (int i = 0; i < n; i++) printf("%d ", nums[i]);
    printf("\n");
    free(nums);
    return 0;
}
```

输出：

```
Initial values: 5 10 15
After realloc: 5 10 15 20 25
```

#### 内存分配图

```
Stack   →   grows downward
Heap    →   grows upward
Data    →   global/static variables
Code    →   program instructions
```

每次致电`malloc`在堆上保留空间，该空间在显式释放之前一直保持分配状态。

#### 为什么它很重要

动态内存是所有实际系统编程的支柱。没有它，您将无法构建：

- 可变大小的数组
- 链接列表、树、图
- 缓存和数据库
- 文件读取器和解析器

这也是大多数 C 错误发生的地方，包括悬挂指针、泄漏、双重释放和缓冲区溢出，因此严格的管理至关重要。

#### 自己尝试一下

1. 分配一个包含 10 个整数的数组，填充它，打印它，然后释放它。
2. 使用`calloc`而不是`malloc`并观察零初始化。
3. 使用以下命令将数组大小从 10 个元素调整为 20 个元素`realloc`.
4.忘记打电话`free()`然后用 Valgrind 运行你的程序，查看内存泄漏报告。
5. 编写函数`int *make_array(int n)`分配并返回指向新数组的指针。

动态分配是您开始手动管理内存的地方。如果做得对，它会给你令人难以置信的控制力和效率，如果做错了，那就是混乱。认真掌握：这是作为一名C程序员的精髓。
