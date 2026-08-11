---
title: "Vue Computed 和 Watch 的区别及运用场景"
date: 2026-08-11
categories:
  - "Vue 系统教程"
tags:
  - "Vue"
  - "Vue3"
  - "前端"
  - "教程"
  - "OneNote"
  - "模板、组件与交互"
description: "Computed 定义 computed 是一个基于依赖进行缓存的计算属性。它们依赖于其它响应式属性，只有当依赖的响应式属性发生变化时， computed 的值才会重新计算。 特点 1. 缓存特性 ：只有当依赖的响应式数据发生变化时， computed 才会重新计算。 2. 声明。"
sidebarWeight: 9
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/api/Vue Computed 和 Watch 的区别及运用场景.md"
---
::: v-pre

# Vue Computed 和 Watch 的区别及运用场景

> 本节目标：理解“Vue Computed 和 Watch 的区别及运用场景”的核心思路，并能把它用于实际开发或面试表达。
Computed
定义
`computed` 是一个基于依赖进行缓存的计算属性。它们依赖于其它响应式属性，只有当依赖的响应式属性发生变化时，`computed` 的值才会重新计算。
特点
1. **缓存特性**：只有当依赖的响应式数据发生变化时，`computed` 才会重新计算。
2. **声明式**：`computed` 属性在模板中使用时，看起来像是普通属性，但实际上是基于其他属性的计算结果。
3. **简单适用**：用于简单的逻辑计算或属性转换。
使用场景
1. **复杂逻辑计算**：当需要根据一个或多个响应式属性计算出一个新值时，使用 `computed`。
2. **模板数据转换**：将响应式数据进行格式化或转换后显示在模板中。
3. **数据缓存**：如果一个属性依赖多个响应式属性，且这些属性不会频繁变化，可以使用 `computed` 来减少不必要的计算。
示例代码
export default \{
data() \{
return \{
firstName: 'John',
lastName: 'Doe'
\};
\},
computed: \{
fullName() \{
return `${this.firstName} ${this.lastName}`;
\}
\}
\};
Watch
定义
`watch` 是一个监听属性，专门用于观察和响应数据的变化。可以用于深度监听对象和数组的变化。
特点
1. **异步操作**：适用于需要在数据变化时执行异步操作或复杂逻辑。
2. **灵活性**：可以自定义回调函数，并可以处理复杂的业务逻辑。
3. **手动监听**：需要显式地声明要监听的属性及其对应的回调函数。
使用场景
1. **异步操作**：当数据变化需要触发异步操作，如 AJAX 请求时，使用 `watch`。
2. **复杂逻辑处理**：当数据变化需要执行复杂的逻辑或触发多个方法时。
3. **数据监听**：需要监听非响应式数据或深层嵌套对象的变化时。
示例代码
export default \{
data() \{
return \{
question: '',
answer: 'I cannot give you an answer until you ask a question!'
\};
\},
watch: \{
question(newQuestion) \{
this.answer = 'Waiting for you to stop typing...';
this.getAnswer();
\}
\},
methods: \{
getAnswer() \{
// 模拟异步操作
setTimeout(() =\> \{
this.answer = 'Here is the answer to your question!';
\}, 1000);
\}
\}
\};
总结
- `computed` 适用于依赖其他响应式数据的计算属性，具有缓存特性，适合用在模板中进行数据转换或简单的逻辑计算。
- `watch` 适用于监听数据变化并执行异步操作或复杂逻辑，灵活且可以深度监听对象和数组的变化。

:::
