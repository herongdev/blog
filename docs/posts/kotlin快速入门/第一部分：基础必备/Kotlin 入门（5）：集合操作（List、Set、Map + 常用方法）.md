---
title: Kotlin 入门（8）：集合与泛型（List、Set、Map、泛型函数）
date: 2025-09-12
categories: [Kotlin 快速入门]
tags: [Kotlin, 集合, 泛型, List, Set, Map]
---

# Kotlin 入门（8）：集合与泛型（List、Set、Map、泛型函数）

在实际开发中，数据通常不是一个一个单独存在，而是成组的。  
Kotlin 提供了功能强大的 **集合 API**，加上 **泛型**，能让代码更安全、更灵活。

## 1. List（有序集合）

```kotlin
fun main() {
    // 不可变 List
    val fruits = listOf("Apple", "Banana", "Orange")
    println(fruits[0]) // Apple

    // 可变 List
    val nums = mutableListOf(1, 2, 3)
    nums.add(4)
    println(nums) // [1, 2, 3, 4]

    // 常用操作
    println(nums.first()) // 1
    println(nums.last())  // 4
    println(nums.filter { it % 2 == 0 }) // [2, 4]
    println(nums.map { it * it }) // [1, 4, 9, 16]
}
```

## 2. Set（无序且不重复）

```kotlin
fun main() {
    val set = mutableSetOf("A", "B", "C", "A")
    println(set) // [A, B, C] 自动去重

    println(set.contains("B")) // true

    set.remove("C")
    println(set) // [A, B]
}
```

## 3. Map（键值对）

```kotlin
fun main() {
    // 不可变 Map
    val map = mapOf("name" to "Alice", "age" to 20)
    println(map["name"]) // Alice

    // 可变 Map
    val scores = mutableMapOf("Tom" to 90, "Jerry" to 85)
    scores["Lucy"] = 95
    println(scores) // {Tom=90, Jerry=85, Lucy=95}

    // 遍历
    for ((k, v) in scores) {
        println("$k -> $v")
    }
}
```

## 4. 泛型（Generics）

泛型让函数/类支持多种类型，写一次，通用多处。

### 泛型函数

```kotlin
fun <T> printList(items: List<T>) {
    for (item in items) {
        println(item)
    }
}

fun main() {
    printList(listOf(1, 2, 3))        // 打印数字
    printList(listOf("a", "b", "c"))  // 打印字符串
}
```

### 泛型类

```kotlin
class Box<T>(val value: T)

fun main() {
    val intBox = Box(123)
    val strBox = Box("Hello")
    println(intBox.value) // 123
    println(strBox.value) // Hello
}
```

## 5. 常用集合操作

Kotlin 集合有大量便捷函数：

```kotlin
fun main() {
    val nums = listOf(5, 2, 8, 1)

    println(nums.sorted())       // [1, 2, 5, 8]
    println(nums.sortedDescending()) // [8, 5, 2, 1]
    println(nums.sum())          // 16
    println(nums.average())      // 4.0
    println(nums.maxOrNull())    // 8
}
```

## 6. 小结

- **List**：有序，可重复
- **Set**：无序，不重复
- **Map**：键值对存储
- **泛型**：提高代码复用性和类型安全
- **集合 API**：`filter`、`map`、`sorted` 等非常常用
