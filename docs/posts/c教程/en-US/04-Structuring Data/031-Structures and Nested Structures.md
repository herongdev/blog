---
title: "31. Structures and Nested Structures"
date: "2026-07-04"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "Structuring Data"
description: "The Little Book of C — 31. Structures and Nested Structures"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
section: 31
sidebarWeight: 31
lang: "en-US"
alternateEn: "/posts/c教程/en-US/04-Structuring Data/031-Structures and Nested Structures"
alternateZh: "/posts/c教程/zh-CN/04-数据结构/031-Structures and Nested Structures"
---
[中文版本](/posts/c教程/zh-CN/04-数据结构/031-Structures and Nested Structures)

Real-world programs often deal with groups of related data, not just single variables. For example, a person has a name, an age, and an address. Instead of juggling separate variables, you can combine them into a single structure using`struct`.

`struct` is one of the most powerful features in C, it lets you define your own data types that group information logically and efficiently.

#### What Is a Structure?

A structure is a user-defined type that holds variables of different kinds under one name.

```
struct Person {
    char name[50];
    int age;
    float height;
};
```

This declares a template for a`Person` object. It doesn’t create actual data yet, just the blueprint.

#### Declaring and Using Structures

You can now create variables of this new type:

```
#include <stdio.h>
struct Person {
    char name[50];
    int age;
    float height;
};
int main(void) {
    struct Person p1 = {"Alice", 25, 1.65f};
    printf("Name: %s\n", p1.name);
    printf("Age: %d\n", p1.age);
    printf("Height: %.2f m\n", p1.height);
    return 0;
}
```

Output:

```
Name: Alice
Age: 25
Height: 1.65 m
```

#### Accessing Members

Use the dot operator`.` to access fields of a structure variable:

```
p1.age = 26;
printf("Updated age: %d\n", p1.age);
```

If you have a pointer to a structure, use the arrow operator`->`:

```
struct Person *ptr = &p1;
printf("Pointer access: %s is %d years old.\n", ptr->name, ptr->age);
```

Output:

```
Pointer access: Alice is 26 years old.
```

#### Initializing and Copying Structures

You can initialize a struct directly:

```
struct Person p2 = {.name = "Bob", .age = 30, .height = 1.75f};
```

Structures can be assigned and copied by value:

```
struct Person copy = p2;
printf("Copy: %s (%d)\n", copy.name, copy.age);
```

This performs a shallow copy, all fields are copied, but if any contain pointers, they’ll still refer to the same memory (you’ll learn how to make deep copies later).

#### Nested Structures

Structures can contain other structures. This helps you organize complex data clearly.

Example:

```
#include <stdio.h>
struct Date {
    int day;
    int month;
    int year;
};
struct Student {
    char name[50];
    int id;
    struct Date birthdate; // nested structure
};
int main(void) {
    struct Student s = {
        .name = "Carol",
        .id = 1234,
        .birthdate = {15, 8, 2003}
    };
    printf("%s (ID %d) was born on %02d/%02d/%04d\n",
           s.name, s.id,
           s.birthdate.day, s.birthdate.month, s.birthdate.year);
    return 0;
}
```

Output:

```
Carol (ID 1234) was born on 15/08/2003
```

You access nested fields with the dot operator:

```
s.birthdate.year = 2004;
```

#### Structures and Functions

You can pass structs to functions by value or by pointer:

```
void print_person(struct Person p);
void update_age(struct Person *p, int new_age);
```

Example:

```
void update_age(struct Person *p, int new_age) {
    p->age = new_age;
}
```

Passing a pointer is more efficient, especially for large structures.

#### Tiny Code

Here’s a full example combining everything above:

```
#include <stdio.h>
struct Date {
    int day;
    int month;
    int year;
};
struct Person {
    char name[50];
    int age;
    float height;
    struct Date birthdate;
};
void print_person(const struct Person *p) {
    printf("%s, %d years old, born on %02d/%02d/%04d, height %.2fm\n",
           p->name, p->age,
           p->birthdate.day, p->birthdate.month, p->birthdate.year,
           p->height);
}
int main(void) {
    struct Person person = {"Alice", 25, 1.68f, {1, 2, 1999}};
    print_person(&person);
    person.age++;
    person.birthdate.year++;
    printf("After update:\n");
    print_person(&person);
    return 0;
}
```

Output:

```
Alice, 25 years old, born on 01/02/1999, height 1.68m
After update:
Alice, 26 years old, born on 01/02/2000, height 1.68m
```

#### Why It Matters

Structures let you:

- Combine related data into logical units.
- Model real-world entities directly in code.
- Pass data efficiently between functions.
- Build higher-level data abstractions like lists, trees, or objects.

They’re the foundation of all complex C systems, files, network packets, kernel data, even database rows are built on top of`struct`.

#### Try It Yourself

1. Create a`Book` structure with`title`,`author`, and`year`.
2. Write a function to print all details of a`Book`.
3. Create a nested structure`Library` that contains multiple books.
4. Access a nested field (e.g., the title of the first book).
5. Modify the`Library` through a pointer using the`->` operator.

Structures are how C lets you model the world, compact, explicit, and fast. Next, you’ll learn about unions and how C lets different data types share the same memory space efficiently.
