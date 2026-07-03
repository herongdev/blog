---
title: Function.identity()
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 核心API, OneNote]
---
在Java中，`Function.identity()` 是一个非常实用的静态方法，属于 `java.util.function.Function` 接口。这个方法提供了一个简单的、返回其输入参数的函数。其实质是一个恒等函数，即对于任何输入值，它都简单地返回该值。

### 用途

`Function.identity()` 通常在需要使用函数但实际上不想改变输入值时非常有用。它在流操作或其他需要函数接口的地方非常方便，特别是在你想要使用元素本身而不进行任何转换时。

### 示例

例如，在使用 `Collectors.toMap()` 收集器创建一个映射时，如果你只是想将列表或集合的元素作为键映射到它们自己时，`Function.identity()` 就显得非常方便：

```java
List\<String\> names = Arrays.asList("Alice", "Bob", "Charlie");
Map\<String, String\> nameMap = names.stream()
.collect(Collectors.toMap(Function.identity(), Function.identity()));
在这个示例中，每个字符串元素既是键也是值，这在某些场景下非常有用，比如你想保留原始集合元素的同时，快速通过元素访问它们。

### 实现细节

实际上，`Function.identity()` 的实现非常简单，它只是返回一个总是返回其输入参数的函数：

```java
static \<T\> Function\<T, T\> identity() {
return t -\> t;
}
这种函数可以被视为一个通用工具，适用于任何类型的数据，从而使其在Java的函数式编程中非常灵活和广泛使用。
