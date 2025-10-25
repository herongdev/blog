---
title: Rust 入门进阶教程（二）：模块、特征和并发
date: 2024-01-01
categories: [编程语言, Rust]
tags: [Rust, 进阶, 模块, 并发]
---

# Rust 入门进阶教程（二）：模块、特征和并发

> 本文是 Rust 系列教程的第二篇，深入讲解模块系统、特征、并发编程等进阶主题。

## 1. 模块系统

### 1.1 模块定义

```rust
// src/lib.rs 或 main.rs
mod front_of_house {
    // 模块内容
    pub fn add() {}
}

mod back_of_house {
    // 私有模块
}
```

### 1.2 模块的可见性

```rust
mod restaurant {
    pub struct Breakfast {
        pub toast: String,      // 公开字段
        seasonal_fruit: String, // 私有字段
    }

    impl Breakfast {
        pub fn summer(toast: String) -> Breakfast {
            Breakfast {
                toast,
                seasonal_fruit: String::from("peaches"),
            }
        }
    }
}
```

### 1.3 use 关键字

```rust
// 使用绝对路径
use std::collections::HashMap;

// 使用相对路径
use crate::front_of_house::hosting;

// 重命名
use std::io::{self, Read};  // self 表示 io 本身

// 导入所有公开项（不推荐）
use std::collections::*;

// 使用 as 别名
use std::io::Result as IoResult;
```

### 1.4 分离文件到模块

**项目结构：**

```
src/
├── main.rs
├── lib.rs
├── front_of_house.rs
└── front_of_house/
    └── hosting.rs
```

**src/main.rs:**

```rust
mod front_of_house;

use front_of_house::hosting;

fn main() {
    hosting::add_to_waitlist();
}
```

**src/front_of_house.rs:**

```rust
pub mod hosting;
```

**src/front_of_house/hosting.rs:**

```rust
pub fn add_to_waitlist() {}
```

## 2. 特征（Trait）

### 2.1 定义特征

```rust
trait Summary {
    fn summarize(&self) -> String;
}
```

### 2.2 为类型实现特征

```rust
struct Article {
    headline: String,
    author: String,
}

impl Summary for Article {
    fn summarize(&self) -> String {
        format!("{}, by {}", self.headline, self.author)
    }
}
```

### 2.3 默认实现

```rust
trait Summary {
    fn summarize(&self) -> String {
        String::from("(Read more...)")
    }

    fn summarize_author(&self) -> String {
        format!("(Read more from {}...)", self.author())
    }

    fn author(&self) -> String;  // 必需方法
}
```

### 2.4 特征作为参数

```rust
// impl Trait 语法
fn notify(item: impl Summary) {
    println!("Breaking news! {}", item.summarize());
}

// Trait Bound 语法
fn notify<T: Summary>(item: T) {
    println!("Breaking news! {}", item.summarize());
}

// 多个特征约束
fn notify(item: impl Summary + Display) {}

// 使用 where 从句（更清晰）
fn some_function<T, U>(t: T, u: U) -> i32
where
    T: Display + Clone,
    U: Clone + Debug,
{
    // ...
}
```

### 2.5 特征作为返回值

```rust
fn returns_summarizable() -> impl Summary {
    Article {
        headline: String::from("Breaking news!"),
        author: String::from("John Doe"),
    }
}
```

### 2.6 派生特征（Derive）

```rust
#[derive(Debug, Clone, Copy)]
struct Point {
    x: i32,
    y: i32,
}

// 常见的可派生特征
// Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Hash
```

## 3. 生命周期

### 3.1 生命周期注解

```rust
// 单个生命周期参数
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() {
        x
    } else {
        y
    }
}
```

### 3.2 结构体中的生命周期

```rust
struct ImportantExcerpt<'a> {
    part: &'a str,
}

impl<'a> ImportantExcerpt<'a> {
    fn level(&self) -> i32 {
        3
    }

    fn announce_and_return_part(&self, announcement: &str) -> &str {
        println!("Attention please: {}", announcement);
        self.part
    }
}
```

### 3.3 生命周期省略规则

编译器会自动推断以下情况的生命周期：

1. 函数参数的生命周期（输入生命周期）
2. 输出生命周期（如果有唯一引用）
3. `&self` 的生命周期被赋给所有输出生命周期参数

### 3.4 静态生命周期

```rust
let s: &'static str = "I have a static lifetime.";
```

## 4. 泛型

### 4.1 泛型函数

```rust
fn largest<T: PartialOrd + Copy>(list: &[T]) -> T {
    let mut largest = list[0];

    for &item in list {
        if item > largest {
            largest = item;
        }
    }

    largest
}
```

### 4.2 泛型结构体

```rust
struct Point<T> {
    x: T,
    y: T,
}

let integer = Point { x: 5, y: 10 };
let float = Point { x: 1.0, y: 4.0 };
```

### 4.3 泛型枚举

```rust
enum Option<T> {
    Some(T),
    None,
}

enum Result<T, E> {
    Ok(T),
    Err(E),
}
```

### 4.4 泛型方法

```rust
impl<T> Point<T> {
    fn x(&self) -> &T {
        &self.x
    }
}

impl Point<f32> {
    fn distance_from_origin(&self) -> f32 {
        (self.x.powi(2) + self.y.powi(2)).sqrt()
    }
}
```

## 5. 智能指针

### 5.1 Box<T>

```rust
let b = Box::new(5);
println!("b = {}", b);

// 递归数据结构
enum List {
    Cons(i32, Box<List>),
    Nil,
}
```

### 5.2 Rc<T> - 引用计数

```rust
use std::rc::Rc;

let a = Rc::new(5);
let b = Rc::clone(&a);
let c = Rc::clone(&a);

println!("count = {}", Rc::strong_count(&a));
```

### 5.3 RefCell<T> - 内部可变性

```rust
use std::cell::RefCell;

let value = RefCell::new(5);

{
    let mut r1 = value.borrow_mut();
    *r1 += 1;
}

println!("{}", value.borrow());
```

### 5.4 Arc<T> - 原子引用计数

```rust
use std::sync::Arc;
use std::thread;

let data = Arc::new(vec![1, 2, 3]);

for i in 0..3 {
    let data = Arc::clone(&data);
    thread::spawn(move || {
        println!("{:?}", data);
    });
}
```

## 6. 并发编程

### 6.1 线程

```rust
use std::thread;
use std::time::Duration;

let handle = thread::spawn(|| {
    for i in 1..10 {
        println!("hi number {} from spawned thread!", i);
        thread::sleep(Duration::from_millis(1));
    }
});

for i in 1..5 {
    println!("hi number {} from main thread!", i);
    thread::sleep(Duration::from_millis(1));
}

handle.join().unwrap();
```

### 6.2 使用 move 闭包

```rust
let v = vec![1, 2, 3];

let handle = thread::spawn(move || {
    println!("Here's a vector: {:?}", v);
});

// v 不再可用，所有权已转移到线程
// println!("{:?}", v);  // 错误！

handle.join().unwrap();
```

### 6.3 通道

```rust
use std::sync::mpsc;
use std::thread;

let (tx, rx) = mpsc::channel();

thread::spawn(move || {
    let val = String::from("hi");
    tx.send(val).unwrap();
});

let received = rx.recv().unwrap();
println!("Got: {}", received);
```

### 6.4 多个发送者

```rust
let (tx, rx) = mpsc::channel();

let tx1 = tx.clone();
thread::spawn(move || {
    let vals = vec![
        String::from("hi"),
        String::from("from"),
        String::from("the"),
        String::from("thread"),
    ];

    for val in vals {
        tx1.send(val).unwrap();
        thread::sleep(Duration::from_millis(1));
    }
});

thread::spawn(move || {
    let vals = vec![
        String::from("more"),
        String::from("messages"),
    ];

    for val in vals {
        tx.send(val).unwrap();
        thread::sleep(Duration::from_millis(1));
    }
});

for received in rx {
    println!("Got: {}", received);
}
```

### 6.5 共享状态并发

```rust
use std::sync::{Arc, Mutex};
use std::thread;

let counter = Arc::new(Mutex::new(0));
let mut handles = vec![];

for _ in 0..10 {
    let counter = Arc::clone(&counter);
    let handle = thread::spawn(move || {
        let mut num = counter.lock().unwrap();
        *num += 1;
    });
    handles.push(handle);
}

for handle in handles {
    handle.join().unwrap();
}

println!("Result: {}", *counter.lock().unwrap());
```

### 6.6 使用 parking_lot（更高效）

```rust
use parking_lot::Mutex;

let data = Arc::new(Mutex::new(0));

let data_clone = Arc::clone(&data);
thread::spawn(move || {
    let mut num = data_clone.lock();
    *num += 1;
});
```

## 7. 异步编程

### 7.1 Future

```rust
use std::future::Future;

fn async_function() -> impl Future<Output = i32> {
    async {
        42
    }
}
```

### 7.2 async/await

```rust
async fn learn_song() -> &'static str {
    "song"
}

async fn sing_song(song: &str) {
    println!("Singing: {}", song);
}

async fn dance() {
    println!("Dancing!");
}

async fn learn_and_sing() {
    let song = learn_song().await;
    sing_song(song).await;
}

async fn async_main() {
    let f1 = learn_and_sing();
    let f2 = dance();

    futures::join!(f1, f2);
}
```

### 7.3 使用 tokio

```rust
use tokio::time::{sleep, Duration};

async fn async_function() {
    println!("Async function started");
    sleep(Duration::from_secs(1)).await;
    println!("Async function completed");
}

#[tokio::main]
async fn main() {
    async_function().await;
}
```

## 练习

1. 创建一个自定义的 `Error` 类型，并实现 `std::error::Error` 特征
2. 实现一个线程池，能够并发执行多个任务
3. 创建一个 `Cache` 结构体，使用 `RefCell` 实现内部可变性
4. 使用 `Arc` 和 `Mutex` 实现一个线程安全的计数器

---

上一篇：[Rust 入门基础教程（一）：语法基础](./rust-basics.md)  
下一篇：[Rust 实战教程（三）：项目实战](./rust-practical.md)
