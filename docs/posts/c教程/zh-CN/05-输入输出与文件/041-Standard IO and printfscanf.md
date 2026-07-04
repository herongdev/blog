---
title: "41. 标准 I/O 和 printf/scanf"
date: "2026-07-04"
lang: "zh-CN"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "05-输入输出与文件"
  - "中文"
description: "The Little Book of C 中文版 — 41. 标准 I/O 和 printf/scanf"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
translator: "机器辅助翻译（Google Translate）"
section: 41
sidebarWeight: 41
alternateZh: "/posts/c教程/zh-CN/05-输入输出与文件/041-Standard IO and printfscanf"
alternateEn: "/posts/c教程/en-US/05-Input Output and Files/041-Standard IO and printfscanf"
---

[English version](/posts/c教程/en-US/05-Input Output and Files/041-Standard IO and printfscanf)

输入和输出是程序与外界对话的方式。在 C 中，几乎所有内容都通过标准 I/O 库，定义在`<stdio.h>`。你已经遇见过`printf()`在“Hello，C World”中，现在您将了解所有这些函数如何组合在一起、它们如何工作以及如何安全使用它们。

#### 标准流

每个 C 程序都会自动打开三个标准流：

|流 |目的|示例函数 |
| --- | --- | --- |
|`stdin`|标准输入（键盘或重定向文件）|`scanf()`,`fgets()`|
|`stdout`|标准输出（屏幕）|`printf()`,`puts()`|
|`stderr`|标准错误（屏幕，用于诊断）|`fprintf(stderr, ...)`|

您可以在终端中重定向这些流：

```
./program < input.txt > output.txt 2> errors.log
```

#### 使用 printf() 打印

`printf()`格式化并打印数据到`stdout`。它的力量在于格式说明符，它描述了要打印的内容的类型和布局。

|类型 |格式|示例|
| --- | --- | --- |
|整数 |`%d`|`printf("%d", 42);`|
|浮动|`%f`|`printf("%.2f", 3.1415);`|
|字符|`%c`|`printf("%c", 'A');`|
|字符串|`%s`|`printf("%s", "Hello");`|
|指针|`%p`|`printf("%p", ptr);`|
|十六进制 |`%x`|`printf("%x", 255);`|

您可以控制宽度、精度和对齐方式：

```
printf("%-10s | %6.2f\n", "Price", 3.5);
```

输出：

```
Price      |   3.50
```

#### 小代码：打印所有内容

```
#include <stdio.h>
int main(void) {
    int i = 42;
    float f = 3.1415;
    char c = 'C';
    char *s = "Hello, C!";
    printf("Integer: %d\n", i);
    printf("Float: %.2f\n", f);
    printf("Char: %c\n", c);
    printf("String: %s\n", s);
    printf("Pointer: %p\n", (void*)s);
    return 0;
}
```

输出：

```
Integer: 42
Float: 3.14
Char: C
String: Hello, C!
Pointer: 0x7ffeed001234
```

#### 使用 scanf() 读取

`scanf()`读取格式化输入`stdin`。就像`printf()`相反，你告诉它格式，它会填充你的变量。

```
int age;
float height;
printf("Enter age and height: ");
scanf("%d %f", &age, &height);
printf("You are %d years old and %.1f meters tall.\n", age, height);
```

输入：

```
25 1.75
```

输出：

```
You are 25 years old and 1.8 meters tall.
```

始终使用`&`非数组变量的运算符 - 它传递应存储值的内存地址。

#### 更安全的输入：fgets() 和 sscanf()

`scanf()`对于字符串来说是有风险的，它不能防止缓冲区溢出。更安全的模式：使用`fgets()`读取整行，然后解析它。

```
char buf[100];
printf("Enter your name: ");
fgets(buf, sizeof(buf), stdin);
buf[strcspn(buf, "\n")] = '\0'; // remove newline
printf("Hello, %s!\n", buf);
```

#### 结合 printf 和 scanf

您可以轻松构建交互式控制台工具：

```
#include <stdio.h>
int main(void) {
    char name[50];
    int year;
    printf("Enter your name: ");
    scanf("%49s", name); // limit input to 49 chars + null
    printf("Enter your birth year: ");
    scanf("%d", &year);
    printf("Hi %s! You are about %d years old.\n", name, 2025 - year);
    return 0;
}
```

输出：

```
Enter your name: Alice
Enter your birth year: 2000
Hi Alice! You are about 25 years old.
```

#### 格式化输出到文件和字符串

您可以在任何地方重定向格式化输出，而不仅仅是屏幕。

```
fprintf(stderr, "Error: invalid input.\n"); // print to stderr
char buffer[50];
sprintf(buffer, "Pi = %.3f", 3.14159); // print to string
puts(buffer);
```

输出：

```
Pi = 3.142
```

#### 为什么它很重要

`printf()`和`scanf()`是控制台 I/O 的主力。他们教你：

- 数据如何在内存和流之间移动。
- 如何控制数字精度和布局。
- 输入和输出如何与终端或文件交互。

每个 C 系统，从微型微控制器到完整的操作系统，都使用这些相同的基础。

#### 自己尝试一下

1. 打印一个包含两列的数字表：数字及其平方。
2. 使用读取三个整数`scanf`并打印他们的平均值。
3. 使用`fgets`和`sscanf`安全地解析`"42 3.14"`分为 int 和 float。
4. 编写一个小测验应用程序：提出问题、读取输入、打印“正确”或“重试”。
5. 尝试打印`stderr`，将错误重定向到文件。

掌握标准 I/O 就像掌握程序的声音一样，这就是 C 代码说话和倾听的方式。接下来，您将更深入地了解文件处理，在第 42 节中学习如何使用文件指针打开、读取和写入文件。
