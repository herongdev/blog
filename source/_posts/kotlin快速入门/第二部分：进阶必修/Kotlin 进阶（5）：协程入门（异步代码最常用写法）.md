好的 ✅ 我来帮你写 **进阶系列第 5 篇**，主题是 **协程入门（异步代码最常用写法）**，保持 Hexo 博客风格，简明实用。

---

````markdown
---
title: Kotlin 进阶（5）：协程入门（异步代码最常用写法）
date: 2025-09-12
categories: [Kotlin 进阶学习]
tags: [Kotlin, 协程, 异步, 并发, Coroutine]
---

# Kotlin 进阶（5）：协程入门（异步代码最常用写法）

协程（Coroutine）是 Kotlin 最强大的特性之一，用于 **异步任务** 和 **并发编程**。  
相比传统的线程，协程更轻量，写法像同步代码一样清晰。

---

## 1. 最小示例

要使用协程，需要引入 `kotlinx.coroutines` 库：

```kotlin
import kotlinx.coroutines.*

fun main() = runBlocking {
    launch {
        delay(1000L)
        println("协程任务完成")
    }
    println("主线程继续执行")
}
```
````

👉 输出：

```
主线程继续执行
协程任务完成
```

- `runBlocking`：阻塞主线程，直到协程执行完毕（通常用在 `main` 或测试）。
- `launch`：启动一个协程（不会阻塞当前线程）。
- `delay`：挂起，不阻塞线程。

---

## 2. 并发执行

多个任务可以并行运行：

```kotlin
fun main() = runBlocking {
    val job1 = launch {
        delay(1000)
        println("任务1完成")
    }
    val job2 = launch {
        delay(500)
        println("任务2完成")
    }
    println("等待子任务完成")
    joinAll(job1, job2)
    println("全部完成")
}
```

👉 输出顺序：

```
等待子任务完成
任务2完成
任务1完成
全部完成
```

---

## 3. async 并发返回结果

`async` 启动协程并返回结果，用 `await()` 获取。

```kotlin
fun main() = runBlocking {
    val a = async {
        delay(1000)
        10
    }
    val b = async {
        delay(1500)
        20
    }
    println("结果: ${a.await() + b.await()}")
}
```

👉 输出：

```
结果: 30
```

---

## 4. suspend 挂起函数

`suspend` 关键字表示函数可以挂起，用于协程里。

```kotlin
suspend fun fetchData(): String {
    delay(1000)
    return "网络数据"
}

fun main() = runBlocking {
    println("请求中…")
    val data = fetchData()
    println("结果: $data")
}
```

---

## 5. 协程作用域（scope）

在 Android 中，常用作用域有：

- `GlobalScope.launch {}`：全局协程（不推荐，容易泄露）
- `lifecycleScope.launch {}`：Activity/Fragment 生命周期范围
- `viewModelScope.launch {}`：ViewModel 范围

---

## 6. 小结

- `launch`：启动协程（无返回值）
- `async/await`：并发执行并返回结果
- `suspend`：挂起函数，用于协程内
- `delay`：非阻塞延迟

---

下一篇我们学习 👉 **《Kotlin 进阶（6）：协程进阶（异常、取消、作用域）》**，掌握协程的高级用法。

```

---

要不要我现在接着帮你写 **《Kotlin 进阶（6）：协程进阶》**？
```
