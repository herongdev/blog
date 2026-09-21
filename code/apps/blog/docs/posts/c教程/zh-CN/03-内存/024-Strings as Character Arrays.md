---
title: "24. 字符串作为字符数组"
date: "2026-07-04"
lang: "zh-CN"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "03-内存"
  - "中文"
description: "The Little Book of C 中文版 — 24. 字符串作为字符数组"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
translator: "机器辅助翻译（Google Translate）"
section: 24
sidebarWeight: 24
alternateZh: "/posts/c教程/zh-CN/03-内存/024-Strings as Character Arrays"
alternateEn: "/posts/c教程/en-US/03-Working with Memory/024-Strings as Character Arrays"
---

[English version](/posts/c教程/en-US/03-Working with Memory/024-Strings as Character Arrays)

在 C 中，字符串只是一个以特殊空字符结尾的字符数组`'\0'`。与高级语言不同，C 没有内置的字符串类型，只有数组和指针。这种简单性使您可以完全控制文本数据，但也需要小心：每个字符串操作都必须遵守内存限制和空终止符。

#### 弦乐的工作原理

像这样的字符串`"Hello"`在C中内部表示为：

|人物 |哈 |电子|我|我|哦|`\0`|
| --- | --- | --- | --- | --- | --- | --- |
|索引 | 0 | 1 | 2 | 3 | 4 | 5 |

这`'\0'`(ASCII 0) 标记字符串的结尾，这就是函数的方式`printf`或者`strlen`知道在哪里停下来。

#### 声明字符串

声明字符串有两种常见方法：

```
char greeting1[] = "Hello";        // automatic null terminator
char greeting2[6] = {'H','e','l','l','o','\0'}; // explicit
char *greeting3 = "Hello";         // pointer to string literal
```

`greeting1`是一个可以修改的可变数组。`greeting3`指向存储在内存中的只读字符串文字，修改它会导致未定义的行为。

#### 小代码

这是一个完整的示例，探讨了字符串声明、迭代和基本操作：

```
#include <stdio.h>
#include <string.h>
int main(void) {
    char msg[] = "C language";
    char *ptr = msg; // pointer to the first character
    printf("String: %s\n", msg);
    printf("Length: %zu\n", strlen(msg));
    printf("\nCharacters one by one:\n");
    for (int i = 0; msg[i] != '\0'; i++) {
        printf("msg[%d] = %c (address: %p)\n", i, msg[i], (void *)&msg[i]);
    }
    printf("\nAccess via pointer arithmetic:\n");
    for (int i = 0; *(ptr + i) != '\0'; i++) {
        printf("*(ptr + %d) = %c\n", i, *(ptr + i));
    }
    // Modify string safely
    msg[0] = 'C';
    msg[1] = '+';
    printf("\nModified string: %s\n", msg);
    return 0;
}
```

编译并运行：

```
gcc strings_demo.c -o strings_demo
./strings_demo
```

输出：

```
字符串：C语言
长度：10

人物一一：
消息[0] = C（地址：0x7ffd29c4a0a0）
消息[1] =（地址：0x7ffd29c4a0a1）
msg[2] = l（地址：0x7ffd29c4a0a2）
...

通过指针运算访问：
*(ptr + 0) = C
*（指针+ 1）=  
*(ptr + 2) = l
...

修改字符串：C+anguage
```

#### 常见的字符串操作

C提供了几个标准函数`<string.h>`:

|功能|描述 |示例|
| --- | --- | --- |
|`strlen(s)`|获取字符串长度（不包括`\0`) |`strlen("Hi") == 2`|
|`strcpy(dest, src)`|复制字符串|`strcpy(name, "Bob");`|
|`strcat(dest, src)`|连接字符串 |`strcat(full, last);`|
|`strcmp(a, b)`|比较字符串 (`0`如果相等）|`strcmp("a","b")`|
|`strchr(s, c)`|查找第一个出现的字符 |`strchr(word, 'a')`|
|`strstr(s, sub)`|查找子串 |`strstr(text, "find")`|

例子：

```
char a[20] = "Hello, ";
char b[] = "World!";
strcat(a, b);
printf("%s\n", a); // "Hello, World!"
```

#### 指针和字符串

因为字符串的名称会衰减为指针，所以您可以将字符串直接传递给函数：

```
void greet(const char *name) {
    printf("Hello, %s!\n", name);
}
int main(void) {
    greet("C Learner");
    return 0;
}
```

`const char *`防止意外修改字符串文字。

#### 常见陷阱

遗忘`'\0'`:

```
char word[4] = {'T','e','s','t'}; // missing terminator, unsafe
```

缓冲区溢出：复制的字符数量超出目标缓冲区的容纳范围会导致未定义的行为。

```
char dest[5];
strcpy(dest, "Too long!"); // dangerous
```

修改字符串文字：

```
char *s = "Hello";
s[0] = 'Y'; // crash or undefined behavior
```

#### 为什么它很重要

字符串是 C 语言中文本处理、文件处理和用户界面的基础。因为它们只是字符数组，所以理解字符串迫使您思考：

- 内存布局
- 空终止
- 缓冲区大小和安全性

一旦您内部化了 C 如何在字节级别处理文本，您就可以构建真正的解析器、文件读取器和命令行工具。

#### 自己尝试一下

1. 编写一个函数`void reverse(char *s)`就地反转字符串。
2. 实现您自己的版本`strlen`.
3. 创建一个计算字符串中元音的程序。
4. 使用连接两个用户输入的字符串`strcat`.
5. 尝试打印一个不带字符串的字符串`'\0'`，观察会发生什么。

C 中的字符串既优雅又危险，这是对精度的真正考验。一旦掌握了它们，您就会了解文本如何真正存在于内存中，一次一个字节。
