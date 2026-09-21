---
title: "32. Unions and Type Reuse"
date: "2026-07-04"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "Structuring Data"
description: "The Little Book of C — 32. Unions and Type Reuse"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
section: 32
sidebarWeight: 32
lang: "en-US"
alternateEn: "/posts/c教程/en-US/04-Structuring Data/032-Unions and Type Reuse"
alternateZh: "/posts/c教程/zh-CN/04-数据结构/032-Unions and Type Reuse"
---
[中文版本](/posts/c教程/zh-CN/04-数据结构/032-Unions and Type Reuse)

Sometimes you need a variable that can hold different types of data at different times, but you don’t want to waste memory keeping all of them active at once. That’s where unions come in.

A`union` lets multiple fields share the same memory location. It’s a space-saving feature and a powerful tool for implementing type flexibility, variant data, and even low-level binary manipulation.

#### What Is a Union?

A union is like a structure, but instead of giving each member its own memory, all members share the same memory block. Only one field is valid at any moment.

Syntax:

```
union Data {
    int i;
    float f;
    char c;
};
```

Here,`i`,`f`, and`c` share the same storage. The size of the union is equal to the size of its largest member.

#### Using a Union

```
#include <stdio.h>
union Data {
    int i;
    float f;
    char c;
};
int main(void) {
    union Data d;
    d.i = 42;
    printf("d.i = %d\n", d.i);
    d.f = 3.14f;
    printf("d.f = %.2f\n", d.f);
    d.c = 'A';
    printf("d.c = %c\n", d.c);
    // The last assignment overwrites the previous ones
    printf("After d.c = 'A', d.i = %d (corrupted)\n", d.i);
    return 0;
}
```

Output:

```
d.i = 42
d.f = 3.14
d.c = A
After d.c = 'A', d.i = 1094795585
```

Notice how writing to one member affects the others, because they occupy the same memory.

#### Memory Layout Illustration

```
+------------------+
| Shared Memory    |  <- same location for all fields
| (size = largest) |
+------------------+
| i: 4 bytes       |
| f: 4 bytes       |
| c: 1 byte        |
+------------------+
```

All fields overlap in the same storage area.

#### Tiny Code

Let’s see a practical example where a union saves memory.

```
#include <stdio.h>
#include <string.h>
union Value {
    int i;
    float f;
    char str[20];
};
int main(void) {
    union Value v;
    v.i = 42;
    printf("As int: %d\n", v.i);
    v.f = 3.14f;
    printf("As float: %.2f\n", v.f);
    strcpy(v.str, "Hello");
    printf("As string: %s\n", v.str);
    printf("Union size: %zu bytes\n", sizeof(v));
    return 0;
}
```

Output:

```
As int: 42
As float: 3.14
As string: Hello
Union size: 20 bytes
```

Even though it contains an`int`, a`float`, and a`char[20]`, the total size is only 20 bytes, the size of the largest member.

#### Tagged Unions (Type-Safe Pattern)

In practice, you often use a tag (an enum or integer) to remember which member is active, this is known as a tagged union or discriminated union.

```
#include <stdio.h>
#include <string.h>
enum Type { INT, FLOAT, STRING };
struct Variant {
    enum Type type;
    union {
        int i;
        float f;
        char str[20];
    } data;
};
void print_variant(const struct Variant *v) {
    switch (v->type) {
        case INT:   printf("INT: %d\n", v->data.i); break;
        case FLOAT: printf("FLOAT: %.2f\n", v->data.f); break;
        case STRING:printf("STRING: %s\n", v->data.str); break;
    }
}
int main(void) {
    struct Variant v;
    v.type = STRING;
    strcpy(v.data.str, "C Language");
    print_variant(&v);
    v.type = INT;
    v.data.i = 123;
    print_variant(&v);
    v.type = FLOAT;
    v.data.f = 9.81f;
    print_variant(&v);
    return 0;
}
```

Output:

```
STRING: C Language
INT: 123
FLOAT: 9.81
```

This is how you combine the flexibility of unions with the safety of knowing which field is currently valid.

#### Why It Matters

Unions are crucial for:

- Saving memory, only one field exists at a time.
- Implementing variant data types, e.g., JSON values, expression trees, network packets.
- Working with hardware registers, map one register into multiple view types.
- Binary serialization, reinterpret raw bytes as various data forms.

In low-level systems, they enable compact and flexible representations that C is famous for.

#### Try It Yourself

Write a union`Number` with`int`,`float`, and`double`.

- Print its size and observe which member determines it.

Implement a tagged union`Message` with types TEXT, BINARY, and COMMAND.

Create a struct with an enum tag and a union, simulate how file formats (like PNG chunks) are parsed.

Write a function that prints the active union field using the tag.

Modify the previous example to store an array of tagged unions.

In C, unions give you memory control and flexibility that few languages allow. They’re the foundation for advanced constructs like variant types, polymorphic structs, and even message protocols, used everywhere from the Linux kernel to embedded firmware.
