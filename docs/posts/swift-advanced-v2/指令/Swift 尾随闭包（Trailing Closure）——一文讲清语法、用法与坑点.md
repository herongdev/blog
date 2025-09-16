---
title: "Swift 尾随闭包（Trailing Closure）——一文讲清语法、用法与坑点"
date: 2025-09-16
---

## 什么是尾随闭包？

**尾随闭包**是 Swift 提供的语法糖：当**函数的最后一个参数是闭包**时，可以把这个闭包**写在圆括号 `()` 外面**，让调用更简洁、更像“DSL”。

对比（同义写法）：

```swift
// 普通写法（闭包写在括号里）
someFunc(arg1: 42, completion: { value in
    print(value)
})

// 尾随闭包（把最后一个闭包挪到括号外）
someFunc(arg1: 42) { value in
    print(value)
}
```

## 语法细节（逐条讲清）

### 1) 闭包基本形态

```swift
{ (参数列表) -> 返回类型 in
    // 闭包体
}
```

- `in`：分隔**参数/返回类型声明**与**闭包体**。
- 未用到的参数可用 `_` 忽略；也可用**参数速记** `$0`、`$1`：

```swift
{ value in print(value) }
{ print($0) }         // 等价
{ _ in print("done") }
```

### 2) 尾随闭包的触发条件

- **函数的最后一个参数**必须是闭包；否则不能使用尾随闭包语法（Swift 5.3 起有“多尾随闭包”，见下一条）。
- 若函数**只有一个参数且是闭包**，可以**省略空括号**：

```swift
// 只有闭包一个参数
doSomething { print("hi") }   // 等价于 doSomething(closure: { ... })
```

### 3) 多尾随闭包（Swift 5.3+）

当函数有**多个闭包参数**时，可以把**第一个**闭包写成**无标签**的尾随闭包，**后面的闭包**放在后面、**带标签**：

```swift
UIView.animate(withDuration: 0.25) {
    // animations（第一个尾随闭包，无标签）
} completion: { finished in
    // completion（第二个尾随闭包，有标签）
}
```

规则小抄：

- 第一个尾随闭包**不写标签**。
- 后续尾随闭包**必须写出参数标签**（如 `completion:`、`onError:`）。

### 4) 与 GCD/回调常见组合

你的 ATT 例子里就用了尾随闭包：

```swift
DispatchQueue.global().async {
    ATTrackingManager.requestTrackingAuthorization { _ in   // 尾随闭包
        sem.signal()
    }
}
```

- `async { ... }` 的 `{ ... }` 是**把任务提交到队列执行**的闭包。
- `requestTrackingAuthorization { _ in ... }` 是**授权结果回调**闭包；参数（授权状态）被 `_` 忽略。

### 5) 捕获列表与内存管理（避免循环引用）

尾随闭包一样可以写**捕获列表**：

```swift
someAsyncWork { [weak self] result in
    self?.handle(result)
}
```

- 闭包默认**强引用**捕获 `self`，在异步/长期存活的闭包里用 `[weak self]` 更安全。
- 与是否“尾随”无关；是**闭包语法**的一部分。

### 6) `@escaping` 与是否能“逃出当前作用域”

- 如果函数**把闭包存起来稍后再调用**（如异步回调），参数要标注 `@escaping`，这与是否尾随无关：

```swift
func doAsync(_ completion: @escaping (Int) -> Void) { ... }
doAsync { value in print(value) }   // 尾随闭包照常使用
```

---

## 何时该用/不该用？

**更该用的时候**

- 闭包体**较长**或**是调用的主体**（例如布局 DSL、动画、网络回调）。
- 读起来像自然语言，**减少括号层级**。

**不该用的时候**

- 函数还有**闭包后面的非闭包参数**（顺序不允许）。
- 读者难以分辨哪个是参数、哪个是闭包（**可回退**到普通写法提升可读性）。

---

## 常见坑

1. **闭包不是最后一个参数**
   不能用尾随闭包（或调整函数签名/调用顺序；或使用多尾随闭包语法）。

2. **主线程阻塞**
   尾随闭包只是写法变了，**线程/阻塞行为不变**。例如你那段代码里 `wait` 会阻塞当前线程，因此**不要在主线程**调用包着 `wait` 的函数。

3. **参数标签忘写（多尾随闭包）**
   第二个及之后的尾随闭包**必须写标签**，否则不通过。

---

## 一段对照练习（从普通到尾随）

```swift
// 普通
fetch(url: url, success: { data in
    print(data)
}, failure: { error in
    print(error)
})

// 多尾随闭包（Swift 5.3+）
fetch(url: url) { data in
    print(data)
} failure: { error in
    print(error)
}
```

---

## 小结

- **尾随闭包 = “把最后一个闭包参数挪到括号外”** 的写法，核心是**让调用更好读**。
- 掌握三件事：**基本闭包语法（参数/返回/in）**、**多尾随闭包规则**、**与并发内存管理的配合（`[weak self]`、`@escaping`）**。
- 记住：**语法糖不改变语义**；是否阻塞、在哪个线程、何时执行，取决于**函数实现与你怎么调**，不是“尾随”本身。
