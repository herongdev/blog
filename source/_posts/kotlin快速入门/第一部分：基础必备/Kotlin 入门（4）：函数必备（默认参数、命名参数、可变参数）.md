好的 ✅ 我来帮你写 **第 4 篇博客**，保持 Hexo 博客风格，聚焦最常用的函数进阶语法。

---

````markdown
---
title: Kotlin 入门（4）：函数进阶（默认参数、命名参数、内联函数）
date: 2025-09-12
categories: [Kotlin 快速入门]
tags: [Kotlin, 函数, 默认参数, 命名参数, 内联函数]
---

# Kotlin 入门（4）：函数进阶（默认参数、命名参数、内联函数）

Kotlin 的函数非常灵活，尤其是 **默认参数、命名参数、内联函数**，在日常开发和 AI 代码里出现频率极高。

---

## 1. 默认参数

函数可以为参数提供默认值，调用时就可以省略。

```kotlin
fun greet(name: String = "游客") {
    println("你好, $name")
}

fun main() {
    greet()          // 输出: 你好, 游客
    greet("Alice")   // 输出: 你好, Alice
}
```
````

👉 好处：比方法重载更简洁。

---

## 2. 命名参数

调用函数时，可以按「参数名」指定值，避免记混顺序。

```kotlin
fun showUser(name: String, age: Int) {
    println("名字: $name, 年龄: $age")
}

fun main() {
    showUser(age = 20, name = "Bob") // 顺序可变
}
```

👉 在参数多时特别清晰。

---

## 3. 结合使用：默认参数 + 命名参数

```kotlin
fun connect(host: String = "localhost", port: Int = 3306) {
    println("连接到 $host:$port")
}

fun main() {
    connect()                   // localhost:3306
    connect("192.168.1.1")      // 192.168.1.1:3306
    connect(port = 8080)        // localhost:8080
}
```

---

## 4. 内联函数（inline）

在高阶函数中，**内联函数**能避免额外开销，提高性能。
常见于 **lambda 回调**。

```kotlin
inline fun measureTime(block: () -> Unit) {
    val start = System.currentTimeMillis()
    block()
    val end = System.currentTimeMillis()
    println("耗时: ${end - start}ms")
}

fun main() {
    measureTime {
        Thread.sleep(500)
    }
}
```

👉 `inline` 的作用：调用时把函数体「内联展开」，避免函数调用栈的开销。
👉 在 Android/多层回调中用得很多。

---

## 5. 小结

- **默认参数**：减少重载，让函数调用更灵活
- **命名参数**：让调用更清晰，不怕顺序错乱
- **内联函数**：提升高阶函数性能，常见于回调/工具函数

---

下一篇我们学习 👉 **《Kotlin 入门（5）：类与对象（构造函数、属性、方法）》**，开始进入面向对象部分。

```

---

要不要我接着帮你写 **第 5 篇《类与对象》**？
```
