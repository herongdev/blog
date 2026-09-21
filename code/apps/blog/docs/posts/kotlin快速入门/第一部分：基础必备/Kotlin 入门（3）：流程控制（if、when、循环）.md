---
title: Kotlin 入门（3）：流程控制（if、when、循环）
date: 2025-09-12
categories: [Kotlin 快速入门]
tags: [Kotlin, 流程控制, if, when, 循环]
---

# Kotlin 入门（3）：流程控制（if、when、循环）

程序离不开 **条件判断** 和 **循环**。

## 1. if 表达式

Kotlin 的 `if` 不仅能做判断，还能当表达式返回值。

```kotlin
val age = 20

if (age >= 18) {
    println("成年人")
} else {
    println("未成年人")
}
```

也可以直接赋值：

```kotlin
val category = if (age >= 18) "成年人" else "未成年人"
println(category) // 成年人
```

## 2. when 表达式

`when` 是 Kotlin 里的「多分支选择」，比 `switch` 更强大。

### 基本用法

```kotlin
val score = 85

when {
    score >= 90 -> println("优秀")
    score >= 60 -> println("及格")
    else -> println("不及格")
}
```

### 匹配具体值

```kotlin
val day = 3
val weekday = when (day) {
    1 -> "周一"
    2 -> "周二"
    3 -> "周三"
    else -> "未知"
}
println(weekday) // 周三
```

### 多个条件合并

```kotlin
when (day) {
    1, 7 -> println("周末")
    in 2..6 -> println("工作日")
    else -> println("未知")
}
```

## 3. 循环

### for 循环（区间）

```kotlin
for (i in 1..5) {
    println(i) // 1,2,3,4,5
}
```

### 递减循环

```kotlin
for (i in 5 downTo 1) {
    println(i) // 5,4,3,2,1
}
```

### 指定步长

```kotlin
for (i in 0..10 step 2) {
    println(i) // 0,2,4,6,8,10
}
```

### 遍历数组/集合

```kotlin
val list = listOf("A", "B", "C")
for (item in list) {
    println(item)
}
```

## 4. while 循环

```kotlin
var n = 3
while (n > 0) {
    println(n)
    n--
}
```

## 5. 小结

- `if` 可以做条件判断，也能当表达式返回值
- `when` 是 Kotlin 的多分支选择，功能比 `switch` 强大
- `for` 支持区间、步长、集合遍历
- `while` 和其他语言差不多，适合条件循环
