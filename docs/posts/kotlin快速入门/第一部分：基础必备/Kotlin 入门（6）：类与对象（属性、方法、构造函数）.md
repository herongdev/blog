---
title: Kotlin 入门（5）：类与对象（构造函数、属性、方法）
date: 2025-09-12
categories: [Kotlin 快速入门]
tags: [Kotlin, 类, 对象, 构造函数, 属性, 方法]
---

# Kotlin 入门（5）：类与对象（构造函数、属性、方法）

Kotlin 是面向对象语言，几乎所有功能都依赖 **类与对象**。  
这一篇我们快速掌握 **构造函数、属性、方法** —— 写应用必备。

## 1. 定义类

```kotlin
class User(val name: String, var age: Int) {
    fun sayHello() {
        println("大家好，我是 $name，今年 $age 岁")
    }
}
```

- `val` → 只读属性
- `var` → 可变属性
- 构造函数可以直接写在类名后面。

## 2. 创建对象

```kotlin
fun main() {
    val u1 = User("Alice", 20)
    u1.sayHello()
}
```

输出：

```
大家好，我是 Alice，今年 20 岁
```

## 3. 主构造函数

上例里的 `(val name: String, var age: Int)` 就是 **主构造函数**。

也可以加 `init` 代码块做初始化逻辑：

```kotlin
class Person(val name: String, var age: Int) {
    init {
        println("创建 Person: $name, $age 岁")
    }
}
```

## 4. 次构造函数

如果需要多个不同的构造方式，可以写 **次构造函数**。

```kotlin
class Book(val title: String, val price: Double) {
    constructor(title: String) : this(title, 0.0)
}
```

调用：

```kotlin
val b1 = Book("Kotlin 入门", 39.9)
val b2 = Book("免费电子书")
```

## 5. 属性

属性本质上是 **字段 + getter/setter**。
Kotlin 可以自定义逻辑：

```kotlin
class Account(var balance: Double) {
    var isRich: Boolean
        get() = balance > 1_000_000
        set(value) {
            println("忽略设置，isRich 根据余额计算")
        }
}
```

## 6. 方法

类里定义的函数就是 **方法**。

```kotlin
class Calculator {
    fun add(a: Int, b: Int): Int = a + b
}
```

调用：

```kotlin
val calc = Calculator()
println(calc.add(3, 5)) // 8
```

## 7. 小结

- **主构造函数**：最常用，属性可直接写进去
- **次构造函数**：提供额外初始化方式
- **属性**：默认带 getter/setter，可自定义
- **方法**：就是类中的函数
