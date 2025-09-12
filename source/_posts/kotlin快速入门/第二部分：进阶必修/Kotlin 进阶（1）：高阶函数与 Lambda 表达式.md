好的 ✅ 我来帮你写 **进阶系列第 1 篇**，保持 Hexo 博客风格，主题是 **高阶函数与 Lambda 表达式**。

---

````markdown
---
title: Kotlin 进阶（1）：高阶函数与 Lambda 表达式
date: 2025-09-12
categories: [Kotlin 进阶学习]
tags: [Kotlin, 函数式编程, Lambda, 高阶函数]
---

# Kotlin 进阶（1）：高阶函数与 Lambda 表达式

Kotlin 支持 **函数式编程**，最核心的就是 **高阶函数** 和 **Lambda 表达式**。  
掌握它们后，你会发现很多标准库函数（`map`、`filter`、`let`、`apply` 等）原来都在用这些特性。

---

## 1. 什么是高阶函数？

👉 **高阶函数**：把函数当作参数或返回值的函数。

```kotlin
// 高阶函数：接收一个函数作为参数
fun operate(x: Int, y: Int, op: (Int, Int) -> Int): Int {
    return op(x, y)
}

fun main() {
    val sum = operate(3, 4) { a, b -> a + b }
    println(sum) // 7
}
```
````

这里 `op: (Int, Int) -> Int` 就是一个函数类型参数。

---

## 2. Lambda 表达式基础

Lambda 是 **匿名函数**，语法更简洁。

```kotlin
val add: (Int, Int) -> Int = { a, b -> a + b }
println(add(2, 3)) // 5
```

简写规则：

- 参数类型可省略（由上下文推断）
- 单参数时可用 `it`
- 最后一行就是返回值

```kotlin
val square: (Int) -> Int = { it * it }
println(square(5)) // 25
```

---

## 3. 常见标准库函数

高阶函数+Lambda 在集合操作里用得最多。

```kotlin
val nums = listOf(1, 2, 3, 4, 5)

println(nums.filter { it % 2 == 0 }) // [2, 4]
println(nums.map { it * it })        // [1, 4, 9, 16, 25]
println(nums.any { it > 3 })         // true
println(nums.all { it > 0 })         // true
```

---

## 4. 函数作为返回值

函数也能“生成函数”。

```kotlin
fun multiplier(factor: Int): (Int) -> Int {
    return { x -> x * factor }
}

fun main() {
    val double = multiplier(2)
    println(double(5)) // 10
}
```

---

## 5. 内联函数（inline）

高阶函数会带来额外的函数对象开销。
用 `inline` 可以避免多余的对象创建和调用成本。

```kotlin
inline fun measureTime(block: () -> Unit) {
    val start = System.currentTimeMillis()
    block()
    val end = System.currentTimeMillis()
    println("耗时: ${end - start} ms")
}

fun main() {
    measureTime {
        Thread.sleep(500)
    }
}
```

---

## 6. 小结

- **高阶函数**：函数可当参数或返回值
- **Lambda**：简洁的匿名函数
- **集合操作**：`filter`、`map`、`any`、`all` 等大量使用 Lambda
- **内联函数**：优化高阶函数性能

---

下一篇我们学习 👉 **《Kotlin 进阶（2）：作用域函数（let、apply、run、also、with）》**，写出更优雅的链式代码。

```

---

要不要我接着帮你写 **《Kotlin 进阶（2）：作用域函数》**？
```
