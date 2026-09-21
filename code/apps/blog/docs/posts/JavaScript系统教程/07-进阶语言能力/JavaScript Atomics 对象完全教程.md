---
title: "JavaScript Atomics 对象完全教程"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "进阶语言能力"
description: "Atomics 是 JavaScript 中用于操作 SharedArrayBuffer 共享内存的原子操作对象，它提供了线程安全的操作方式。下面我会详细介绍它的使用方法和原理。 一、为什么需要 Atomics ？ 当多个线程（如主线程和 Web Worker）共享同一块内存时。"
sidebarWeight: 1
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/Atomics/JavaScript `Atomics` 对象完全教程.md"
---
::: v-pre

# JavaScript Atomics 对象完全教程

> 本节目标：理解“JavaScript Atomics 对象完全教程”的核心思路，并能把它用于实际开发或面试表达。
`Atomics` 是 JavaScript 中用于操作 `SharedArrayBuffer` 共享内存的原子操作对象，它提供了线程安全的操作方式。下面我会详细介绍它的使用方法和原理。

## 一、为什么需要** **`Atomics`****？
当多个线程（如主线程和 Web Worker）共享同一块内存时，普通的读写操作可能会因为****竞态条件****导致数据不一致。`Atomics` 提供了：
1. ****原子操作****：确保操作不可中断
2. ****内存屏障****：保证操作顺序
3. ****线程同步****：协调多个线程的执行
## 二、基本概念
### 1. SharedArrayBuffer
共享内存的基础数据结构，可以被多个线程访问。
```javascript
const sharedBuffer = new SharedArrayBuffer(1024) // 1KB共享内存
```
### 2. TypedArray 视图
用于操作共享内存的视图：
```javascript
const int32View = new Int32Array(sharedBuffer)
```
### 3. 原子操作的必要性
****非原子操作的问题****：
```javascript
// 线程A
int32View[0] += 1
// 线程B
int32View[0] += 1
// 最终结果可能是+1而不是+2
```
## 三、Atomics 核心方法
### 1. 原子读写
```javascript
// 原子写入
Atomics.store(int32View, index, value)
// 原子读取
const value = Atomics.load(int32View, index)
```
### 2. 原子运算
```javascript
// 原子加
Atomics.add(int32View, index, value) // 返回旧值
// 原子减
Atomics.sub(int32View, index, value) // 返回旧值
// 原子与/或/异或
Atomics.and(int32View, index, value)
Atomics.or(int32View, index, value)
Atomics.xor(int32View, index, value)
```
### 3. 原子交换
```javascript
// 交换值并返回旧值
const old = Atomics.exchange(int32View, index, newValue)
// 比较交换(CAS)
const old = Atomics.compareExchange(int32View, index, expectedValue, newValue)
// 只有当当前值 === expectedValue时才会交换
```
### 4. 线程等待/通知
```javascript
// 线程等待(阻塞)
Atomics.wait(int32View, index, expectedValue)
// 唤醒等待的线程
Atomics.notify(int32View, index, count)
```
## 四、你的代码解析
```javascript
// 更新版本号(原子递增)
Atomics.add(quoteHeaderView, QUOTE_VERSION_INDEX, 1)
// 原子写入报价数量
Atomics.store(quoteHeaderView, QUOTE_COUNT_INDEX, batch.length)
```
这段代码的作用：
1. ****原子递增版本号****：通知其他线程数据已更新
2. ****原子写入数量****：确保其他线程能正确读取数据长度
## 五、完整示例：多线程计数器
### 主线程
```javascript
// 创建共享内存
const sharedBuffer = new SharedArrayBuffer(16)
const sharedArray = new Int32Array(sharedBuffer)
// 初始化值
Atomics.store(sharedArray, 0, 0) // 计数器
Atomics.store(sharedArray, 1, 0) // 版本号
// 创建Worker
const worker = new Worker('worker.js')
worker.postMessage({ buffer: sharedBuffer })
// 定时读取
setInterval(() => {
  const count = Atomics.load(sharedArray, 0)
  const version = Atomics.load(sharedArray, 1)
  console.log(`主线程读取: count=${count}, version=${version}`)
}, 500)
```
### Worker线程 (worker.js)
```javascript
let sharedArray
onmessage = function (e) {
  sharedArray = new Int32Array(e.data.buffer)
  setInterval(increment, 1000)
}
function increment() {
  // 原子递增计数器
  const oldCount = Atomics.add(sharedArray, 0, 1)
  // 原子更新版本号
  Atomics.add(sharedArray, 1, 1)
  console.log(`Worker递增: 旧值=${oldCount}`)
}
```
## 六、Atomics 使用场景
1. ****多线程状态共享****：如你的行情数据更新
2. ****高性能计算****：多个Worker协同处理大数据
3. ****线程同步****：实现锁、信号量等同步原语
4. ****实时数据处理****：音频/视频处理等
## 七、注意事项
1. ****浏览器兼容性****：需要现代浏览器并正确配置COOP/COEP头
2. ****性能影响****：原子操作比普通操作慢，应适度使用
3. ****死锁风险****：不当使用wait/notify可能导致死锁
4. ****数据类型****：只能用于Int8/16/32和Uint8/16/32数组
## 八、调试技巧
1. ****内存检查****：
   ```javascript
   console.log(Atomics.load(sharedArray, index))
   ```
2. ****跟踪修改****：
   ```javascript
   const old = Atomics.compareExchange(sharedArray, index, expected, newValue)
   if (old !== expected) {
     console.warn('值被其他线程修改了!')
   }
   ```
3. ****性能分析****：使用DevTools的Performance面板监控原子操作耗时
## 九、替代方案比较
|   |   |   |
|---|---|---|
|方法|优点|缺点|
|==Atomics==|原生支持、高性能|复杂度高、浏览器限制|
|==postMessage==|简单安全|序列化开销大|
|==BroadcastChannel==|简单|性能较低|

`Atomics` 是 JavaScript 多线程编程的强大工具，特别适合：
- 高频数据更新（如行情数据）
- 需要精确线程同步的场景
- 性能敏感的多线程应用
在你的代码中，`Atomics.add` 用于版本控制，`Atomics.store` 用于安全更新数据，这是典型的生产者-消费者模式实现。正确使用这些API可以构建出高性能的Web金融应用。

:::
