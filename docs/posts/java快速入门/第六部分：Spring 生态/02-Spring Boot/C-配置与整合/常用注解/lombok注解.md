---
title: lombok注解
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, Spring, OneNote]
---
@RequiredArgsConstructor 是一个来自 Lombok 库的注解，它用于自动生成一个构造函数，该构造函数包含了类中所有未初始化的 final 字段以及通过 @NonNull 标记的字段。这个注解可以减少模板代码的编写，使得代码更简洁。
这里是注解的详细解释：

1. @RequiredArgsConstructor:
    - 自动生成一个构造函数，该构造函数有一个参数对应于每个未初始化的 final 字段以及每个用 @NonNull 标记的字段。
    - 自动生成的构造函数会按照字段在类中声明的顺序来排序参数。
2. (onConstructor = @__(@Autowired)):
    - onConstructor 是一个 @RequiredArgsConstructor 注解的属性，它允许你在生成的构造函数上应用另一个注解，例如 @Autowired。
    - @__() 是一种语法糖，用于在 Lombok 注解内嵌套另一个注解。

通过利用这些注解，你可以减少很多样板代码，让你的代码更简洁、更易于维护。
