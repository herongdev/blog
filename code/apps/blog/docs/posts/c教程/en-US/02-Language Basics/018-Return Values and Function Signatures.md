---
title: "18. Return Values and Function Signatures"
date: "2026-07-04"
categories:
  - "C 教程"
tags:
  - "C"
  - "Little Book of C"
  - "Language Basics"
description: "The Little Book of C — 18. Return Values and Function Signatures"
source: "https://little-book-of.github.io/c/books/en-US/book.html"
license: "CC BY-NC-SA 4.0"
originalAuthor: "Duc-Tam Nguyen"
section: 18
sidebarWeight: 18
lang: "en-US"
alternateEn: "/posts/c教程/en-US/02-Language Basics/018-Return Values and Function Signatures"
alternateZh: "/posts/c教程/zh-CN/02-语言基础/018-Return Values and Function Signatures"
---
[中文版本](/posts/c教程/zh-CN/02-语言基础/018-Return Values and Function Signatures)

Functions not only perform tasks but often communicate results back to the caller. They do this through return values. Every C function has a signature, a declaration that defines its return type, name, and parameters. Getting comfortable with signatures and return values helps you write clean, predictable, and modular programs.

#### Function Signatures Explained

A function signature looks like this:

```
return_type function_name(parameter_list);
```

It tells the compiler:

1. What kind of value the function returns (`int`,`double`,`void`, etc.)
2. What the function is called
3. What arguments it expects and their types

Example:

```
int max(int a, int b);
```

This says: “`max` is a function that takes two integers and returns an integer.”

#### Returning Values

You use the`return` keyword to send a value back from a function.

```
int add(int x, int y) {
    return x + y;
}
```

The type of the value you return must match the function’s declared return type.

If a function doesn’t need to return anything, declare it as`void`:

```
void greet(void) {
    printf("Hello!\n");
}
```

A`void` function can still perform actions, it just doesn’t produce a result.

#### Multiple Return Points

You can return early if certain conditions are met.

```
int divide(int a, int b) {
    if (b == 0) {
        printf("Error: division by zero!\n");
        return 0;
    }
    return a / b;
}
```

This is common for error handling or input validation.

#### Returning Different Data Types

You can return any type, not just integers.

```
double average(double a, double b) {
    return (a + b) / 2.0;
}
char first_letter(const char *word) {
    return word[0];
}
_Bool is_even(int n) {
    return n % 2 == 0;
}
```

For more complex data, you’ll later learn how to return pointers or structs.

#### Tiny Code

Here’s a complete example showing several return types and signatures:

```
#include <stdio.h>
#include <stdbool.h>
// function declarations
int add(int x, int y);
double divide(double a, double b);
bool is_even(int n);
void greet(const char *name);
int main(void) {
    greet("C Programmer");
    int sum = add(7, 3);
    double quotient = divide(10.0, 4.0);
    bool check = is_even(sum);
    printf("Sum: %d\n", sum);
    printf("Quotient: %.2f\n", quotient);
    printf("Is sum even? %s\n", check ? "Yes" : "No");
    return 0;
}
// function definitions
int add(int x, int y) {
    return x + y;
}
double divide(double a, double b) {
    if (b == 0.0) {
        printf("Cannot divide by zero.\n");
        return 0.0;
    }
    return a / b;
}
bool is_even(int n) {
    return n % 2 == 0;
}
void greet(const char *name) {
    printf("Hello, %s!\n", name);
}
```

Compile and run:

```
gcc return_demo.c -o return_demo
./return_demo
```

Output:

```
Hello, C Programmer!
Sum: 10
Quotient: 2.50
Is sum even? Yes
```

#### Why It Matters

Return values are how functions communicate. By designing clear and meaningful signatures:

- You make your code predictable, every function has a defined purpose and output.
- The compiler can check correctness, mismatched types raise warnings.
- You can compose functions, one function’s return becomes another’s input.

In large systems, consistent signatures and meaningful return types form the backbone of good API design.

#### Try It Yourself

1. Write a function`max(a, b)` that returns the larger of two integers.
2. Write a function`to_upper(char c)` that returns an uppercase version of a character.
3. Modify a`divide()` function to return`-1` if division by zero occurs.
4. Create a`sum_to_n(int n)` that returns the sum of all numbers from 1 to`n`.
5. Try using a`void` function that prints the result of another function call.

Return values give your functions purpose, they turn simple actions into reusable building blocks that make your programs expressive, modular, and alive.
