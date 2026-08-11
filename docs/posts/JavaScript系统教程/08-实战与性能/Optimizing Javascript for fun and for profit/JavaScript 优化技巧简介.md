---
title: "JavaScript 优化技巧简介"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "实战与性能"
description: "很多时候，JavaScript 的代码性能比预期要差，原因通常是缺乏优化。优化代码通常会以可读性为代价，因此需要在性能和可读性之间进行权衡。本文总结了一些常用的优化技术，建议在进行优化时首先进行基准测试（benchmarking），以确定需要优化的部分，否则可能只是浪费时间。 0。"
sidebarWeight: 14
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/性能优化/Optimizing Javascript for fun and for profit/JavaScript 优化技巧简介.md"
---
::: v-pre

# JavaScript 优化技巧简介

> 本节目标：理解“JavaScript 优化技巧简介”的核心思路，并能把它用于实际开发或面试表达。
很多时候，JavaScript 的代码性能比预期要差，原因通常是缺乏优化。优化代码通常会以可读性为代价，因此需要在性能和可读性之间进行权衡。本文总结了一些常用的优化技术，建议在进行优化时首先进行基准测试（benchmarking），以确定需要优化的部分，否则可能只是浪费时间。
0. 避免不必要的工作
在进行优化之前，应该首先考虑如何避免不必要的工作。例如，使用缓存（memoization）、惰性计算（lazy computation）等技术。在 React 中，可以使用 `memo()`、`useMemo()` 这些 React 原生的性能优化工具。
1. 避免字符串比较
字符串比较在 JavaScript 中开销较大，尽可能避免将字符串作为枚举值。可以使用数字枚举，减少开销。
示例：字符串枚举 vs 数字枚举
// 字符串枚举 (性能较差)
enum Position \{
TOP = 'TOP',
BOTTOM = 'BOTTOM',
\}
// 数字枚举 (性能较好)
enum Position \{
TOP, // = 0
BOTTOM, // = 1
\}
在大规模循环中，数字枚举性能要显著优于字符串枚举。因为整数在底层是按值传递的，而字符串是通过指针传递的，涉及到更多的内存访问。
2. 避免不同的对象形状（Shape）
JavaScript 引擎会基于对象的形状进行优化，保持对象的形状一致可以提高性能。如果对象形状不同，性能可能会急剧下降。
示例：不同形状的对象对性能的影响
// 单一形状（性能较好）
const o1 = \{ a: 1, b: 2, c: 3 \}
const o2 = \{ a: 1, b: 2, c: 3 \}
// 多形状（性能下降）
const o1 = \{ a: 1, b: 2, c: 3 \}
const o2 = \{ b: 2, a: 1, c: 3 \}
JavaScript 引擎优化对象时，会假设对象的形状是相同的。如果你频繁传入不同形状的对象，JavaScript 引擎需要重新优化对象，导致性能下降。
3. 避免使用数组和对象方法
数组和对象的内置方法如 `map()`、`filter()`、`reduce()` 等会创建新的数组和对象，会增加内存开销。更高效的做法是使用普通的 `for` 循环。
示例：函数式编程 vs 命令式编程
// 函数式编程（性能较差）
const result = numbers
.map(n =\> Math.round(n))
.filter(n =\> n % 2 === 0)
.reduce((a, n) =\> a + n, 0)
// 命令式编程（性能较好）
let result = 0
for (let i = 0; i \< numbers.length; i++) \{
let n = Math.round(numbers[i])
if (n % 2 !== 0) continue
result += n
\}
函数式编程虽然代码简洁，但每个方法都会生成新的数组对象，影响性能。
4. 避免间接访问
每次间接访问数据时，JavaScript 引擎需要额外的时间进行查找。减少间接访问，如避免深度嵌套的对象，可以提高代码执行速度。
示例：代理访问 vs 直接访问
// 代理访问（性能较差）
const point = new Proxy(\{ x: 10, y: 20 \}, \{ get: (t, k) =\> t[k] \})
let _ = 0
for (let i = 0; i \< 100_000; i++) \{
_ += point.x
\}
// 直接访问（性能较好）
const point = \{ x: 10, y: 20 \}
let _ = 0
for (let i = 0; i \< 100_000; i++) \{
_ += point.x
\}
使用 `Proxy` 可能会阻止引擎进行优化，而直接访问对象属性的性能要好得多。
5. 避免缓存未命中（Cache Misses）
从 RAM 读取数据非常慢，而 CPU 会通过预取和缓存机制来加速内存访问。确保数据顺序访问可以避免缓存未命中的问题。
示例：顺序访问 vs 随机访问
// 顺序访问（性能较好）
for (let i = 0; i \< points.length; i++) \{
_ += points[i].x
\}
// 随机访问（性能较差）
for (let i = 0; i \< shuffledPoints.length; i++) \{
_ += shuffledPoints[i].x
\}
尽可能按顺序访问数据，可以充分利用 CPU 缓存机制，提高性能。
6. 避免大型对象
当对象过大时，JavaScript 引擎无法优化为简单的对象结构，而是转为使用哈希映射，影响性能。建议将大对象转换为数组进行处理。
示例：大型对象访问
// 大型对象（性能较差）
const byId = \{\}
Object.keys(byId).forEach(id =\> \{ _ += byId[id].id \})
// 使用数组（性能较好）
const users = Object.values(byId)
users.forEach(user =\> \{ _ += user.id \})
频繁索引大型对象时，性能会下降，因此可以考虑将对象转换为数组来提高性能。
7. 小心使用 `eval()`
`eval()` 虽然性能不好且安全风险较大，但在某些情况下可以用来优化动态对象创建。建议在性能关键的代码中谨慎使用。
示例：使用 `eval()` 优化对象键的创建
// 不使用 eval（性能较差）
function createMessages(key, values) \{
return values.map(value =\> (\{ [key]: value \}))
\}
// 使用 eval（性能较好）
function createMessages(key, values) \{
const createMessage = new Function('value', `return { ${JSON.stringify(key)}: value }`)
return values.map(createMessage)
\}
在循环中动态生成对象键时，使用 `eval()` 可以避免一些性能瓶颈。
8. 使用字符串时需谨慎
JavaScript 的字符串操作虽然方便，但其底层实现比较复杂。避免不必要的字符串操作，尽量使用 `+` 号连接字符串，而非 `concat()`。
示例：字符串操作
// 使用字符串连接（性能较好）
const result = classNames.map(c =\> 'button--' + c).reduce((acc, c) =\> acc + ' ' + c, '')
// 使用数组连接（性能较差）
const result = classNames.map(c =\> `button--${c}`).join(' ')
字符串连接往往比使用模板字符串或 `join()` 更高效。
9. 使用专门化处理
在你的应用中，很多逻辑都是有特定的常见情况的。你可以通过专门化处理这些常见情况来优化性能。
示例：专门化处理
// 不专门化处理
function processItems(items, tags) \{
return items.map(item =\> item + (tags[item] || ''))
\}
// 专门化处理
function processItemsSpecialized(items, tags) \{
if (isEmpty(tags)) \{
return items.map(item =\> item)
\} else \{
return items.map(item =\> item + (tags[item] || ''))
\}
\}
通过专门化处理，可以减少不必要的检查，从而提高性能。
10. 数据结构的选择
选择合适的数据结构非常重要，错误的数据结构可能会对性能产生巨大影响。要根据实际情况选择合适的结构，比如 `Set` 通常比 `Array` 更适合查找操作。
示例：`Array` vs `Set`
// 使用数组查找（性能较差）
adminIdsArray.includes(userId)
// 使用 Set 查找（性能较好）
adminIdsSet.has(userId)
选择合适的数据结构可以大幅提高性能。
11. 基准测试（Benchmarking）
优化之前最重要的一步是进行基准测试，以确定需要优化的部分。避免盲目优化。要确保在真实场景中进行基准测试，而不是仅仅依赖于微基准测试。
总结
优化 JavaScript 的关键在于避免不必要的工作，保持对象和数据的形状一致，使用合适的数据结构，并始终进行基准测试以确定性能瓶颈所在。

:::
