---
title: Kotlin 入门（7）：常见工具类（String、Date、正则、异常处理）
date: 2025-09-12
categories: [Kotlin 快速入门]
tags: [Kotlin, String, Date, 正则, 异常处理]
---

# Kotlin 入门（7）：常见工具类（String、Date、正则、异常处理）

写应用时，常用到 **字符串、日期、正则、异常处理**。

## 1. String（字符串）

Kotlin 的字符串功能非常强大。

```kotlin
fun main() {
    val name = "Alice"
    val age = 20

    // 模板字符串
    println("我是 $name，今年 $age 岁")

    // 多行字符串
    val msg = """
        第一行
        第二行
    """.trimIndent()
    println(msg)

    // 常用方法
    val text = "Hello Kotlin"
    println(text.lowercase())  // hello kotlin
    println(text.uppercase())  // HELLO KOTLIN
    println(text.contains("Kot")) // true
    println(text.replace("Kotlin", "World")) // Hello World
}
```

## 2. 日期与时间

Kotlin 推荐使用 **Java 8+ 的 java.time API**。

```kotlin
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

fun main() {
    val now = LocalDateTime.now()
    println(now) // 2025-09-12T10:15:30

    // 格式化
    val formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")
    println(now.format(formatter)) // 2025-09-12 10:15:30

    // 加减时间
    val tomorrow = now.plusDays(1)
    println("明天: ${tomorrow.format(formatter)}")
}
```

## 3. 正则表达式

```kotlin
fun main() {
    val regex = Regex("\\d{3}-\\d{4}")
    val input = "我的电话是 123-4567"

    // 匹配
    println(regex.containsMatchIn(input)) // true

    // 查找
    val match = regex.find(input)
    println(match?.value) // 123-4567

    // 替换
    val masked = regex.replace(input, "***-****")
    println(masked) // 我的电话是 ***-****
}
```

## 4. 异常处理

Kotlin 的异常和 Java 类似，用 `try...catch...finally`。

```kotlin
fun main() {
    try {
        val x = 10 / 0
    } catch (e: ArithmeticException) {
        println("错误: ${e.message}")
    } finally {
        println("无论是否出错都会执行")
    }
}
```

### 自定义异常

```kotlin
class InvalidInputException(msg: String) : Exception(msg)

fun checkAge(age: Int) {
    if (age < 0) throw InvalidInputException("年龄不能为负数")
}

fun main() {
    try {
        checkAge(-1)
    } catch (e: InvalidInputException) {
        println("捕获异常: ${e.message}")
    }
}
```

## 5. 小结

- **String**：支持模板、常用方法丰富
- **Date/Time**：推荐用 `java.time.*` API
- **正则**：`Regex` 类自带匹配/替换
- **异常处理**：`try-catch-finally`，支持自定义异常
