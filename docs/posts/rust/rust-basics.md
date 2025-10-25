---
title: Rust 入门基础教程（一）：语法基础
date: 2024-01-01
categories: [编程语言, Rust]
tags: [Rust, 入门, 基础]
---

# Rust 入门基础教程（一）：语法基础

> 本文是 Rust 系列教程的第一篇，适合有编程基础但从未接触过 Rust 的开发者。我们将从最基础的语法开始，通过实际代码示例学习。

## 1. Hello World 与 Cargo

### 1.1 第一个程序

```rust
fn main() {
    println!("Hello, Rust!");
}
```

**关键点：**

- `fn` 是函数关键字
- `main` 是程序入口点
- `println!` 是宏（注意感叹号）
- 每行以分号结尾

### 1.2 Cargo 项目管理

Rust 使用 **Cargo** 管理项目，类似 npm：

```bash
cargo new my_project
cd my_project
cargo run
```

**Cargo.toml** 配置文件：

```toml
[package]
name = "my_project"
version = "0.1.0"
edition = "2021"

[dependencies]
serde = "1.0"
```

## 2. 变量和数据类型

### 2.1 基本类型

```rust
// 整数类型
let age: u32 = 30;      // 无符号 32 位
let count: i32 = -5;    // 有符号 32 位

// 浮点数
let price: f64 = 99.99;

// 布尔值
let is_active: bool = true;

// 字符（4字节，支持 Unicode）
let ch: char = '中';
```

### 2.2 变量可变性

**Rust 变量默认不可变：**

```rust
let x = 5;
x = 10;  // ❌ 编译错误！

let mut y = 5;
y = 10;  // ✅ 正确
```

### 2.3 数组和 Vector

```rust
// 固定大小数组
let arr: [i32; 3] = [1, 2, 3];
let first = arr[0];

// 动态数组 Vec（最常用）
let mut vec = Vec::new();
vec.push(1);

// 或使用宏
let vec2 = vec![1, 2, 3, 4, 5];
```

### 2.4 字符串

```rust
// &str: 字符串切片（不可变）
let s1: &str = "Hello";

// String: 可变字符串
let mut s2 = String::from("Hello");
s2.push_str(" World");

// 转换
let s3 = "hello".to_string();
```

## 3. 控制流

### 3.1 if/else

```rust
let age = 18;

if age >= 18 {
    println!("成年人");
} else {
    println!("未成年人");
}

// if 是表达式，可以返回值
let status = if age >= 18 { "成年" } else { "未成年" };
```

### 3.2 循环

```rust
// loop 无限循环
loop {
    println!("无限循环");
    break;
}

// while 循环
let mut i = 0;
while i < 10 {
    i += 1;
}

// for 循环（最常用）
for i in 0..10 {
    println!("{}", i);
}

// 遍历数组
let numbers = vec![1, 2, 3];
for num in numbers {
    println!("{}", num);
}
```

### 3.3 match 表达式

```rust
let result = Some(5);

match result {
    Some(x) => println!("Got: {}", x),
    None => println!("No value"),
}

// 枚举匹配
enum Status {
    Pending,
    Completed,
    Failed,
}

match status {
    Status::Pending => println!("等待中"),
    Status::Completed => println!("已完成"),
    Status::Failed => println!("失败"),
}
```

## 4. 函数

```rust
// 基本函数
fn greet(name: &str) {
    println!("Hello, {}!", name);
}

// 带返回值
fn add(a: i32, b: i32) -> i32 {
    a + b  // 最后一行表达式的值（无分号）
}

// 显式 return
fn max(a: i32, b: i32) -> i32 {
    if a > b {
        return a;
    }
    b
}
```

## 5. 所有权系统（核心概念）

### 5.1 所有权规则

1. 每个值有唯一的所有者
2. 同时只能有一个所有者
3. 所有者离开作用域，值被销毁

```rust
let s1 = String::from("hello");
let s2 = s1;           // s1 的所有权移给 s2
// println!("{}", s1); // ❌ s1 已失效
println!("{}", s2);    // ✅ 正确
```

### 5.2 引用和借用

```rust
// 不可变引用（可以有多个）
let s = String::from("hello");
let r1 = &s;
let r2 = &s;  // ✅ 可以有多个不可变引用

// 可变引用（只能有一个）
let mut s = String::from("hello");
let r1 = &mut s;
// let r2 = &mut s;  // ❌ 错误！
```

## 6. 结构体和枚举

### 6.1 结构体

```rust
struct Person {
    name: String,
    age: u32,
}

let person = Person {
    name: String::from("Alice"),
    age: 30,
};

println!("{}: {}", person.name, person.age);
```

### 6.2 方法

```rust
impl Person {
    // 关联函数（类似静态方法）
    fn new(name: String, age: u32) -> Self {
        Self { name, age }
    }

    // 方法
    fn greet(&self) {
        println!("Hello, I'm {}", self.name);
    }
}

let alice = Person::new("Alice".to_string(), 30);
alice.greet();
```

### 6.3 枚举

```rust
enum Direction {
    Up,
    Down,
    Left,
    Right,
}

// 带数据的枚举
enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
}

// 使用 match
let msg = Message::Move { x: 10, y: 20 };
match msg {
    Message::Quit => println!("退出"),
    Message::Move { x, y } => println!("移动到 ({}, {})", x, y),
    Message::Write(text) => println!("消息: {}", text),
    _ => println!("其他"),
}
```

## 7. 错误处理

### 7.1 Result 类型

```rust
fn divide(a: f64, b: f64) -> Result<f64, String> {
    if b == 0.0 {
        Err("Cannot divide by zero".to_string())
    } else {
        Ok(a / b)
    }
}

// 处理 Result
match divide(10.0, 2.0) {
    Ok(result) => println!("结果: {}", result),
    Err(e) => println!("错误: {}", e),
}
```

### 7.2 Option 类型

```rust
// Option<T> 表示可能有值
let numbers = vec![1, 2, 3];
let first = numbers.first();  // Option<&i32>

match first {
    Some(value) => println!("第一个: {}", value),
    None => println!("没有元素"),
}

// 安全的 unwrap
let value = first.unwrap_or(&0);
```

### 7.3 ? 运算符

```rust
fn read_file() -> Result<String, io::Error> {
    let contents = std::fs::read_to_string("file.txt")?;
    Ok(contents)
}

// ? 遇到错误自动返回
```

## 练习

尝试实现以下功能：

1. 写一个函数，计算阶乘
2. 定义一个 `Rectangle` 结构体，包含宽度和高度，并实现计算面积的方法
3. 写一个函数，接受一个整数切片，返回最大值（使用 `Option`）
4. 实现一个简单的计算器，支持加减乘除

---

下一篇：[Rust 入门进阶教程（二）：模块、特征和并发](./rust-advanced.md)
