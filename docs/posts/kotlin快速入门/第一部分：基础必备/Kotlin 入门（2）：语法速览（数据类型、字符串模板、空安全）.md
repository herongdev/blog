---
title: Kotlin 入门（2）：语法速览（数据类型、字符串模板、空安全）
date: 2025-09-12
categories: [Kotlin 快速入门]
tags: [Kotlin, 语法速览, AI学习, Android]
---

# Kotlin 入门（2）：语法速览（数据类型、字符串模板、空安全）

## 1. 常见数据类型

Kotlin 是强类型语言，常见数据类型包括：

```kotlin
val age: Int = 20        // 整数
val price: Double = 9.99 // 小数
val isVip: Boolean = true // 布尔
val name: String = "Tom" // 字符串
```

Kotlin 会自动推断类型，所以一般不用写类型：

```kotlin
val age = 20
val price = 9.99
val isVip = true
val name = "Tom"
```

## 2. 字符串模板

Kotlin 内置了「字符串模板」功能，用 `$变量名` 或 `${表达式}` 嵌入变量：

```kotlin
fun main() {
    val name = "Alice"
    val age = 18
    println("名字: $name, 年龄: $age")

    // 表达式要加 {}
    println("明年年龄: ${age + 1}")
}
```

输出：

```
名字: Alice, 年龄: 18
明年年龄: 19
```

非常常用！比拼接字符串 `+` 更直观。

## 3. 空安全（Null Safety）

Kotlin 最大的特点之一就是「空安全」，尽量避免空指针错误。

### 普通变量（不能为 null）

```kotlin
val name: String = "Alice"
// name = null // ❌ 报错，普通变量不能赋值为 null
```

### 可空变量（可以为 null）

```kotlin
var nickname: String? = null
nickname = "小明"
```

- 加 `?` 表示这个变量可以为 null
- 读取时要小心

### 安全调用：`?.`

```kotlin
val length = nickname?.length
```

如果 `nickname` 为 null，结果就是 `null`，不会报错。

### Elvis 操作符：`?:`

```kotlin
val length = nickname?.length ?: 0
```

如果 `nickname` 为 null，就返回 `0`。

### 强制非空：`!!`

```kotlin
val length = nickname!!.length
```

如果 `nickname` 是 `null`，会抛出异常。⚠️ 一般少用。
