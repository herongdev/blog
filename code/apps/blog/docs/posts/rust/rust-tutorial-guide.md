---
title: Rust 快速入门实战教程 - 从零基础到项目应用
date: 2024-01-01
categories: [编程语言, Rust]
tags: [Rust, 入门, OpenGL, N-API]
math: false
mermaid: false
pin: false
---

> 本文基于实际项目代码，从最基础的语法开始，逐步深入到高级特性。目标读者：有编程基础但从未接触过 Rust 的开发者。

# 第一部分：基础语法篇

## 1. Hello World 与基本概念

### 1.1 一个最简单的 Rust 程序

```rust
fn main() {
    println!("Hello, Rust!");
}
```

**关键点解释：**

- `fn` 是 Rust 中定义函数的关键字（function 的缩写）
- `main` 是程序的入口点
- `println!` 是个**宏（macro）**，用于输出文本（注意感叹号）
- 每行代码以分号 `;` 结尾

### 1.2 Cargo - Rust 的项目管理工具

Rust 使用 **Cargo** 作为包管理和构建工具，类似于 npm、Maven。

**创建新项目：**

```bash
cargo new my_project
```

**项目结构：**

```
my_project/
├── Cargo.toml    # 项目配置和依赖声明
└── src/
    └── main.rs   # 主程序入口
```

**在你的代码中的体现：**

```toml
[package]
name = "focus_gl"
version = "0.1.0"
edition = "2021"  # Rust 版本

[dependencies]    # 依赖库
napi = { version = "2", features = ["napi6"] }
glow = "0.13"
```

## 2. 数据类型和变量

### 2.1 基本数据类型

```rust
// 整数类型
let age: u32 = 30;          // 无符号 32 位整数（你的代码第 10 行）
let count: i32 = -5;        // 有符号 32 位整数
let bytes: u8 = 255;        // 8 位（0-255）

// 浮点数
let price: f32 = 99.99;     // 32 位浮点
let precise: f64 = 3.14159; // 64 位浮点

// 布尔值
let is_active: bool = true;

// 字符（4字节，支持 Unicode）
let ch: char = '中';
```

### 2.2 变量和可变性

**核心概念：默认不可变！**

```rust
let x = 5;      // 不可变变量
x = 10;         // ❌ 编译错误！

let mut y = 5;  // 使用 mut 声明可变变量
y = 10;         // ✅ 可以改变
```

**为什么这样设计？**

- 防止意外的修改，提高代码安全性
- 编译器可以进行更多优化

### 2.3 数组和切片

```rust
// 固定大小数组（你的代码第 129 行）
let positions: [f32; 24] = [-0.5, -0.5, -0.5, /* ... */];

// 动态数组 Vec（最常用）
let mut names: Vec<String> = Vec::new();
names.push("Alice".to_string());

// 或者使用宏
let numbers = vec![1, 2, 3, 4, 5];
```

**切片（Slice）- 数组的引用：**

```rust
let arr = [1, 2, 3, 4, 5];
let slice = &arr[1..3];  // 获取 [2, 3]
```

## 3. 控制流

### 3.1 条件语句

```rust
let age = 18;

if age >= 18 {
    println!("成年人");
} else {
    println!("未成年人");
}

// Rust 中 if 是表达式，可以返回值
let status = if age >= 18 { "成年" } else { "未成年" };
```

### 3.2 循环

```rust
// loop 无限循环（可 break 退出）
loop {
    println!("无限循环");
    break; // 退出
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

for name in names.iter() {
    println!("{}", name);
}
```

### 3.3 match 表达式（类似 switch，但更强大）

```rust
let result = SessionResult::Completed;

match result {
    SessionResult::Ongoing => println!("进行中"),
    SessionResult::Completed => println!("已完成"),
    SessionResult::Interrupted => println!("已中断"),
}
```

## 4. 函数

### 4.1 函数定义

```rust
// 基本函数
fn greet(name: String) {
    println!("Hello, {}!", name);
}

// 带返回值的函数
fn add(a: i32, b: i32) -> i32 {
    a + b  // 最后一个表达式作为返回值（无分号）
}

// 显式 return
fn max(a: i32, b: i32) -> i32 {
    if a > b {
        return a;
    }
    b
}
```

### 4.2 泛型函数（你的代码使用了很多）

```rust
// 泛型函数示例
fn get_first<T>(items: &[T]) -> Option<&T> {
    items.first()
}
```

## 5. 字符串

**Rust 的字符串有两个类型：**

```rust
// &str: 字符串切片（不可变）
let s1: &str = "Hello";

// String: 可变的字符串（动态分配）
let mut s2: String = String::from("Hello");
s2.push_str(" World");

// 相互转换
let s3 = "hello".to_string();
let s4 = s2.as_str();
```

---

# 第二部分：中级特性篇

## 6. 所有权系统（Rust 的核心概念）

### 6.1 什么是所有权？

Rust 通过**所有权（Ownership）** 自动管理内存，无需手动 malloc/free，也无需 GC。

**三大规则：**

1. 每个值都有唯一的所有者
2. 同时只能有一个所有者
3. 所有者离开作用域，值被销毁

```rust
let s1 = String::from("hello");
let s2 = s1;           // s1 的所有权移给了 s2
// println!("{}", s1); // ❌ 错误！s1 已失效
println!("{}", s2);    // ✅ 正确

// 使用借用（引用）来避免移动
let s3 = &s2;          // s3 借用了 s2，s2 仍然有效
println!("{}", s2);    // ✅ s2 仍然可用
println!("{}", s3);    // ✅ s3 也可用
```

### 6.2 引用和借用

```rust
// 不可变引用（可以有多个）
let s = String::from("hello");
let r1 = &s;
let r2 = &s;  // ✅ 可以有多个不可变引用
println!("{}", r1);

// 可变引用（只能有一个，且不能与其他引用共存）
let mut s = String::from("hello");
let r1 = &mut s;
// let r2 = &mut s;  // ❌ 错误！同一时间只能有一个可变引用
println!("{}", r1);
```

**为什么限制引用？**

- 防止数据竞争（Data Race）
- 保证线程安全

### 6.3 生命周期（你的代码第 6 行用到）

```rust
// 生命周期注解（通常编译器会自动推断）
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() {
        x
    } else {
        y
    }
}
```

## 7. 结构体和枚举

### 7.1 结构体（Struct）

```rust
// 定义结构体
struct Person {
    name: String,
    age: u32,
}

// 创建实例
let person = Person {
    name: String::from("Alice"),
    age: 30,
};

// 访问字段
println!("{}", person.name);
```

**在你的代码中的应用（第 2-5 行）：**

```rust
#[derive(Clone, Copy)]  // 自动生成 Clone 和 Copy 特征
pub struct Instance {
    pub pos: [f32; 3],
    pub color: [f32; 4],
}
```

### 7.2 枚举（Enum）

```rust
// 定义枚举
enum Color {
    Red,
    Green,
    Blue,
}

// 带数据的枚举（你的代码第 2-6 行）
enum SessionResult {
    Ongoing,
    Completed,
    Interrupted,
}

// 使用 match 处理
match result {
    SessionResult::Ongoing => println!("进行中"),
    _ => println!("其他状态"),
}
```

### 7.3 方法和关联函数

```rust
impl Person {
    // 关联函数（类似静态方法）
    fn new(name: String, age: u32) -> Self {
        Self { name, age }
    }

    // 方法（第一个参数是 &self）
    fn greet(&self) {
        println!("Hello, I'm {}", self.name);
    }

    // 可变方法
    fn have_birthday(&mut self) {
        self.age += 1;
    }
}

// 使用
let mut alice = Person::new("Alice".to_string(), 30);
alice.greet();
alice.have_birthday();
```

**在你的代码中的应用（整个 GLRenderer impl）：**

```rust
impl GLRenderer {
    pub fn new(surface_id: String, width: u32, height: u32) -> napi::Result<Self> {
        // ... 构造逻辑
        Ok(Self { /* ... */ })
    }

    pub fn init_gl_pipeline(&mut self) -> napi::Result<()> {
        // ... 初始化逻辑
        Ok(())
    }
}
```

## 8. 特征（Trait）- 类似接口

```rust
// 定义特征
trait Drawable {
    fn draw(&self);
}

// 为类型实现特征
struct Circle {
    radius: f64,
}

impl Drawable for Circle {
    fn draw(&self) {
        println!("Drawing circle with radius {}", self.radius);
    }
}

// 使用特征作为参数
fn render(item: impl Drawable) {
    item.draw();
}
```

**你的代码中使用的特征：**

- `HasContext` from `glow` crate
- `Drop` trait（第 380 行）

## 9. 错误处理

### 9.1 Result 类型

```rust
// Result<T, E> 表示可能成功(T) 或失败(E)
enum Result<T, E> {
    Ok(T),   // 成功
    Err(E),  // 错误
}

// 示例
fn divide(a: f64, b: f64) -> Result<f64, String> {
    if b == 0.0 {
        Err("Cannot divide by zero".to_string())
    } else {
        Ok(a / b)
    }
}

// 处理 Result
match divide(10.0, 2.0) {
    Ok(result) => println!("Result: {}", result),
    Err(e) => println!("Error: {}", e),
}
```

### 9.2 使用 ? 运算符（你的代码大量使用）

```rust
fn read_file() -> Result<String, io::Error> {
    let contents = std::fs::read_to_string("file.txt")?;  // 遇到错误自动返回
    Ok(contents)
}

// 等价于
fn read_file() -> Result<String, io::Error> {
    let contents = match std::fs::read_to_string("file.txt") {
        Ok(c) => c,
        Err(e) => return Err(e),
    };
    Ok(contents)
}
```

**在你的代码中：**

```rust
pub fn new(surface_id: String, width: u32, height: u32) -> napi::Result<Self> {
    unsafe {
        let display = eglGetDisplay(EGL_DEFAULT_DISPLAY);
        if display == EGL_NO_DISPLAY {
            return Err(napi::Error::from_reason("eglGetDisplay failed"));  // 返回错误
        }
        // ...
        Ok(Self { /* ... */ })  // 返回成功
    }
}
```

## 10. Option 类型

```rust
// Option<T> 表示可能有值(Some)或没有值(None)
enum Option<T> {
    Some(T),
    None,
}

// 示例
let numbers = vec![1, 2, 3];
let first = numbers.first();  // 返回 Option<&i32>

match first {
    Some(value) => println!("First: {}", value),
    None => println!("No elements"),
}

// 使用 unwrap（危险：None 会 panic）
let value = first.unwrap();

// 安全的 unwrap
let value = first.unwrap_or(&0);  // 如果是 None 返回默认值
```

**在你的代码中的使用（第 7 行）：**

```rust
static mut R: Option<GLRenderer> = None;  // 可能没有渲染器

// 使用时检查
if let Some(r) = R.as_mut() {  // 安全访问
    r.start_render_loop();
}
```

---

# 第三部分：高级特性篇

## 11. 模块系统

### 11.1 模块定义

```rust
// src/lib.rs 或 main.rs
mod renderer;  // 声明 renderer 模块

// src/renderer/mod.rs 或 src/renderer.rs
pub mod shaders;  // 公开子模块
mod cubes;        // 私有子模块
```

### 11.2 使用模块

```rust
// 使用绝对路径
use crate::renderer::GLRenderer;

// 使用相对路径
use renderer::cubes::Instance;

// 重命名
use std::collections::HashMap as Map;
```

## 12. 宏（Macro）

### 12.1 常见的宏

```rust
println!("Hello, {}!", name);      // 格式化输出
vec![1, 2, 3];                     // 创建向量
format!("Hello, {}!", name);       // 格式化字符串
panic!("Something went wrong!");   // 程序终止
```

### 12.2 属性宏（你的代码使用）

```rust
// derive 宏 - 自动生成代码
#[derive(Clone, Copy, Debug, Serialize, Deserialize)]
pub struct Instance {
    // ...
}

// 函数属性
#[napi]
pub fn init(surface_id: String, width: u32, height: u32) -> Result<()> {
    // ...
}
```

## 13. 并发和并行

### 13.1 线程

```rust
use std::thread;

let handle = thread::spawn(|| {
    // 新线程执行的代码
    println!("Hello from thread!");
});

handle.join().unwrap();  // 等待线程完成
```

### 13.2 互斥锁（你的代码第 55 行使用）

```rust
use std::sync::{Arc, Mutex};

let data = Arc::new(Mutex::new(0));

let data_clone = Arc::clone(&data);
thread::spawn(move || {
    let mut num = data_clone.lock().unwrap();
    *num += 1;
});
```

**你的代码中使用的 parking_lot：**

```rust
use parking_lot::Mutex;

static RUNNING: Lazy<Mutex<bool>> = Lazy::new(|| Mutex::new(false));

// 使用
*RUNNING.lock() = true;  // parking_lot 更高效
```

## 14. 智能指针

### 14.1 Box - 堆分配

```rust
let b = Box::new(5);  // 将值分配到堆上
```

### 14.2 Rc - 引用计数（单线程）

```rust
use std::rc::Rc;

let data = Rc::new(5);
let data2 = Rc::clone(&data);  // 引用计数增加
```

### 14.3 Arc - 原子引用计数（多线程）

```rust
use std::sync::Arc;

let data = Arc::new(5);
let data2 = Arc::clone(&data);  // 可以在线程间共享
```

## 15. 特征对象（Trait Objects）

```rust
trait Animal {
    fn speak(&self);
}

struct Dog;
impl Animal for Dog {
    fn speak(&self) {
        println!("Woof!");
    }
}

let animals: Vec<Box<dyn Animal>> = vec![
    Box::new(Dog),
];

for animal in animals {
    animal.speak();
}
```

---

# 第四部分：实战应用篇

## 16. 你的代码中用到的关键概念解析

### 16.1 安全和不安全代码

```rust
unsafe {
    // 需要 unsafe 的操作：
    // 1. 解引用裸指针
    // 2. 调用 unsafe 函数
    // 3. 访问可变静态变量
    // 4. 实现 unsafe trait
}

// 你的代码第 89 行
static mut R: Option<GLRenderer> = None;  // 可变静态变量必须用 unsafe
```

### 16.2 外部函数接口（FFI）

```rust
// 你的代码第 48-58 行
extern "C" {
    fn eglGetDisplay(native_display: *mut c_void) -> EGLDisplay;
    fn eglInitialize(dpy: EGLDisplay, major: *mut i32, minor: *mut i32) -> i32;
    // ...
}

// 调用 C 函数
unsafe {
    let display = eglGetDisplay(EGL_DEFAULT_DISPLAY);
}
```

### 16.3 泛型和特征约束

```rust
// 泛型函数
fn find_first<T, P>(items: &[T], predicate: P) -> Option<&T>
where
    P: Fn(&T) -> bool,  // P 必须是可以调用的函数
{
    items.iter().find(|item| predicate(item))
}
```

### 16.4 迭代器

```rust
// 你的代码第 270 行
let raw: Vec<RawInst> = instances.iter().map(|it| RawInst { pos: it.pos, color: it.color }).collect();

// 分解说明：
instances.iter()                          // 创建迭代器
    .map(|it| RawInst { /* ... */ })      // 转换每个元素
    .collect();                           // 收集结果

// 更多迭代器方法
numbers.iter()
    .filter(|&x| x > 5)      // 过滤
    .map(|x| x * 2)          // 转换
    .collect();
```

## 17. 模式匹配进阶

### 17.1 解构

```rust
// 解构结构体
let person = Person { name: "Alice".to_string(), age: 30 };
let Person { name, age } = person;

// 解构元组
let (x, y) = (3, 4);

// if let 语法糖
if let Some(value) = option {
    println!("Found: {}", value);
}

// 你的代码第 31 行
if let Some(r) = R.as_mut() {
    r.start_render_loop();
}
```

### 17.2 守卫（Guard）

```rust
match value {
    Some(x) if x > 10 => println!("Large number"),
    Some(x) => println!("Small number"),
    None => println!("No value"),
}
```

## 18. 生命周期实战

```rust
// 结构体持有引用需要生命周期注解
struct GLRenderer<'a> {
    gl: &'a glow::Context,
}

impl<'a> GLRenderer<'a> {
    fn new(gl: &'a glow::Context) -> Self {
        Self { gl }
    }
}

// 高级生命周期
fn longest<'a, 'b>(x: &'a str, y: &'b str) -> &'a str
where
    'a: 'b,  // a 的生命周期至少和 b 一样长
{
    if x.len() > y.len() {
        x
    } else {
        y
    }
}
```

## 19. 异步编程（Future 和 async/await）

```rust
use tokio;  // 异步运行时

async fn fetch_data() -> Result<String, Error> {
    // 异步操作
    let response = reqwest::get("https://example.com").await?;
    let text = response.text().await?;
    Ok(text)
}

#[tokio::main]
async fn main() {
    let result = fetch_data().await;
}
```

---

# 第五部分：专家级话题

## 20. 高级类型系统

### 20.1 关联类型

```rust
trait Iterator {
    type Item;  // 关联类型

    fn next(&mut self) -> Option<Self::Item>;
}

impl Iterator for Counter {
    type Item = i32;

    fn next(&mut self) -> Option<Self::Item> {
        Some(1)
    }
}
```

### 20.2 高级特征绑定

```rust
// 多个特征约束
fn process<T>(item: T)
where
    T: Clone + Debug + Display,
{
    // ...
}

// 特征继承
trait Read: BufRead {
    // Read 的所有方法
}

// 默认方法实现
trait Default {
    fn default() -> Self;
}

// 特征对象
fn process(items: Vec<Box<dyn Drawable>>) {
    // ...
}
```

## 21. 宏编程

### 21.1 声明宏（macro_rules!）

```rust
macro_rules! vec {
    ( $( $x:expr ),* ) => {
        {
            let mut temp_vec = Vec::new();
            $(
                temp_vec.push($x);
            )*
            temp_vec
        }
    };
}
```

### 21.2 过程宏

```rust
// derive 宏示例
#[derive(Clone)]
struct MyStruct {
    // ...
}

// 属性宏
#[route(GET, "/")]
fn index() { }

// 函数宏
println!("Hello");
```

## 22. 内存布局和优化

### 22.1 零成本抽象

```rust
// Rust 的迭代器是零成本的
let sum: i32 = numbers.iter().map(|x| x * 2).sum();
// 编译后和手写循环一样高效
```

### 22.2 内存布局

```rust
// #[repr(C)] 指定 C 兼容的内存布局
#[repr(C)]
struct Point {
    x: f32,
    y: f32,
}

// #[repr(packed)] 紧密打包
#[repr(packed)]
struct Compact {
    x: u8,
    y: u16,
}
```

### 22.3 未定义行为（UB）

```rust
unsafe {
    // 错误的操作会导致未定义行为
    let mut x = 1;
    let y = &mut x;
    let z = &x;  // 错误：同时有可变和不可变引用
}
```

## 23. 高级并发模式

### 23.1 通道（Channel）

```rust
use std::sync::mpsc;

let (sender, receiver) = mpsc::channel();

thread::spawn(move || {
    sender.send("Hello").unwrap();
});

let message = receiver.recv().unwrap();
```

### 23.2 无锁数据结构

```rust
use std::sync::atomic::{AtomicUsize, Ordering};

let counter = AtomicUsize::new(0);
counter.fetch_add(1, Ordering::SeqCst);
```

### 23.3 条件变量

```rust
use std::sync::{Arc, Mutex, Condvar};

let pair = Arc::new((Mutex::new(false), Condvar::new()));
let (lock, cvar) = &*pair;

// 等待条件满足
let mut started = lock.lock().unwrap();
while !*started {
    started = cvar.wait(started).unwrap();
}
```

## 24. 内联汇编

```rust
use std::arch::asm;

unsafe {
    asm!("nop");
}
```

## 25. 自定义堆分配器

```rust
use std::alloc::{GlobalAlloc, Layout};

struct MyAllocator;

unsafe impl GlobalAlloc for MyAllocator {
    unsafe fn alloc(&self, layout: Layout) -> *mut u8 {
        std::alloc::alloc(layout)
    }

    unsafe fn dealloc(&self, ptr: *mut u8, layout: Layout) {
        std::alloc::dealloc(ptr, layout)
    }
}
```

---

# 总结：实践建议

## 学习路径

1. **第 1-2 周：基础语法**

   - 变量、数据类型、控制流
   - 函数、结构体、枚举
   - 所有权和借用

2. **第 3-4 周：中级特性**

   - 模块系统
   - 错误处理（Result, Option）
   - 特征（Trait）

3. **第 5-6 周：实战项目**

   - 使用 Cargo 创建项目
   - 熟悉常用 crate
   - 调试和测试

4. **持续学习：高级特性**
   - 并发编程
   - 宏编程
   - 性能优化

## 常见陷阱

1. **所有权混淆**

   - 忘记使用 `mut` 声明可变变量
   - 试图使用已移动的值

2. **生命周期错误**

   - 返回对临时值的引用
   - 生命周期参数使用不当

3. **借用检查**
   - 同时持有可变和不可变引用
   - 闭包捕获导致借用问题

## 推荐资源

- **官方文档**：https://doc.rust-lang.org/
- **Rust By Example**：https://doc.rust-lang.org/rust-by-example/
- **Rust Book 中文版**：https://kaisery.github.io/trpl-zh-cn/
- **Crates.io**：Rust 的包仓库

## 你的项目中的关键概念总结

1. **N-API 集成**：使用 `#[napi]` 宏导出函数供 Node.js 调用
2. **OpenGL 渲染**：通过 FFI 调用 OpenGL ES 函数
3. **内存安全**：使用 `unsafe` 块调用 C API，但管理安全的 Rust 抽象
4. **错误处理**：大量使用 `Result` 类型和 `?` 运算符
5. **模块组织**：清晰的模块结构（renderer, shaders, cubes）
6. **RAII**：自动资源管理（Drop trait）

---

_祝你学习 Rust 愉快！🎉_
