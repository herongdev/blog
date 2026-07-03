---
title: `new String(a) + new String(b)` 会创建几个对象？
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, Java基础, OneNote]
---
1. `new String("a")` 会创建两个对象：
- 一个是在字符串常量池中的 `"a"`（如果之前没有创建过）。
- 一个是在堆中的 `new String("a")`。

2. `new String("b")` 同样会创建两个对象：
- 一个是在字符串常量池中的 `"b"`（如果之前没有创建过）。
- 一个是在堆中的 `new String("b")`。

3. `new String("a") + new String("b")` 实际上是用 `StringBuilder` 进行拼接，然后调用 `toString()` 方法：
- 一个 `StringBuilder` 对象。
- `StringBuilder` 的 `append` 方法调用后，会在堆中创建一个包含 `"ab"` 的新 `String` 对象。

所以，综合以上分析，总共有以下几个对象被创建：

1. 字符串常量池中的 `"a"`（如果之前没有创建过）。
2. 字符串常量池中的 `"b"`（如果之前没有创建过）。
3. 堆中的 `new String("a")`。
4. 堆中的 `new String("b")`。
5. 一个 `StringBuilder` 对象。
6. `StringBuilder` 在拼接 `"a"` 和 `"b"` 后在堆中创建的一个新的 `String("ab")` 对象。

总结：总共会创建 6 个对象（假设 `"a"` 和 `"b"` 在常量池中之前没有被创建过）。
