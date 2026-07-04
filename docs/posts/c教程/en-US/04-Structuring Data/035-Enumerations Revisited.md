---
title: "35. Enumerations Revisited"
date: "2026-07-04"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "Structuring Data"
description: "The Little Book of C — 35. Enumerations Revisited"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
section: 35
sidebarWeight: 35
lang: "en-US"
alternateEn: "/posts/c教程/en-US/04-Structuring Data/035-Enumerations Revisited"
alternateZh: "/posts/c教程/zh-CN/04-数据结构/035-Enumerations Revisited"
---
[中文版本](/posts/c教程/zh-CN/04-数据结构/035-Enumerations Revisited)

You’ve seen`enum` briefly when learning about constants, but now it’s time to use it as a first-class design tool. Enumerations give names to sets of integer values, making code easier to read, maintain, and debug. They also pair beautifully with`struct`,`union`, and`bitfield` patterns from the previous sections.

#### What Is an Enumeration?

An enumeration (`enum`) defines a type whose values are limited to a specific list of named constants.

Example:

```
enum Color {
    RED,
    GREEN,
    BLUE
};
```

Under the hood,`enum Color` is an integer type —`RED`= 0,`GREEN`= 1,`BLUE`= 2 by default.

#### Basic Usage

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

Output:

```
Current direction: 1
```

Even though`EAST` prints as`1`, using a named constant makes your code far more meaningful.

#### Assigning Custom Values

You can specify explicit integer values, useful for compatibility or mapping to real-world codes.

```
enum ErrorCode {
    OK = 0,
    FILE_NOT_FOUND = 404,
    SERVER_ERROR = 500
};
```

If you skip a value, enumeration continues counting from the last number:

```
enum Level {
    LOW = 1,
    MEDIUM,
    HIGH
};
// HIGH = 3
```

#### Tiny Code

A small program that uses enums for clear program flow:

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

Output:

```
Status: Warning (1)
```

This pattern,`enum`+`switch`, is everywhere in C projects: error handling, state machines, network protocols, and more.

#### Enumerations with Structs

Combine`enum` with`struct` for self-describing data:

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

Output:

```
Circle with radius 2.50
Rectangle 3.00x4.00
```

This pairing of`enum`+`union` is a common pattern in real-world systems, known as a tagged union.

#### Underlying types in Modern C (C23)

In C23, the underlying type of an enumeration refers to the integer type used to represent the enum values in memory. Prior to C23, this type was implementation-defined and could be any integer type capable of holding all enumerator values, typically`int`. With C23, programmers can now explicitly specify the underlying type using the syntax`enum name : type`, allowing precise control over storage size and signedness (e.g.,`enum color : unsigned char`).

This enables more efficient memory usage and predictable behavior across platforms, especially in embedded systems or when interfacing with hardware. Enumerations with a fixed underlying type are compatible with that type and must accommodate all enumerator values; otherwise, a compile-time error occurs.

Example:

```
enum color : unsigned char {
    RED,
    GREEN,
    BLUE
};
```

#### Why It Matters

Enumerations bring semantic clarity to your code:

- Replace “magic numbers” with meaningful names.
- Simplify debugging and logging.
- Enable compile-time checking, you can’t assign invalid constants easily.
- Combine cleanly with structs, unions, and bitfields to express state machines or protocols.

They also improve portability, your program logic is described by intent, not arbitrary numbers.

#### Try It Yourself

1. Define an enum`TrafficLight { RED, YELLOW, GREEN }` and print messages based on its value.
2. Create an enum`FileType { TEXT, BINARY, UNKNOWN }` and use it inside a`struct FileInfo`.
3. Extend your tagged-union pattern: add`TRIANGLE` to the`Shape` enum.
4. Write a`switch` statement that maps`enum ErrorCode` to error messages.
5. Experiment with explicitly setting values and skipping a few, observe the auto-increment behavior.

Enumerations make your programs speak in concepts, not numbers. They are the key to clarity, readability, and robust design, the bridge between human meaning and machine representation.
