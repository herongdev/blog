---
title: "toRefs做了什么事件"
date: 2026-08-11
categories:
  - "Vue 系统教程"
tags:
  - "Vue"
  - "Vue3"
  - "前端"
  - "教程"
  - "OneNote"
  - "响应式与组合式 API"
description: "ChatGPT toRefs 是 Vue Composition API 中的一个实用函数，它用于将响应式对象转换为普通对象，同时保持响应性。这个函数在与解构一起使用时非常有用，因为解构响应式对象通常会导致丢失响应性。 这里是 toRefs 所做的事情的详细描述： 创建新对象:。"
sidebarWeight: 54
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vue3/toRefs做了什么事件.md"
---
::: v-pre

# toRefs做了什么事件

> 本节目标：理解“toRefs做了什么事件”的核心思路，并能把它用于实际开发或面试表达。
ChatGPT
toRefs 是 Vue Composition API 中的一个实用函数，它用于将响应式对象转换为普通对象，同时保持响应性。这个函数在与解构一起使用时非常有用，因为解构响应式对象通常会导致丢失响应性。

这里是 toRefs 所做的事情的详细描述：

创建新对象: 它创建一个新的对象，其属性与原始响应式对象的属性相对应。

保持响应性: 每个属性都被转换为一个 ref，这意味着即使在解构或传递新对象时，属性的响应性也会被保留。这与直接解构响应式对象不同，直接解构会导致丢失响应性。

反应源属性的变化: 由于新对象的属性是响应式的，因此对这些属性的更改会反映在源响应式对象上，反之亦然。

假设你有一个响应式对象，例如通过 reactive 创建的对象：

javascript
Copy code
import \{ reactive, toRefs \} from 'vue';

const person = reactive(\{
firstName: 'John',
lastName: 'Doe'
\});

const personRefs = toRefs(person);
在这里，personRefs 是一个新的非响应式对象，其属性 firstName 和 lastName 是 ref，它们与原始响应式对象的相应属性保持同步。这意味着你可以解构 personRefs 而不会失去响应性，或者将其传递给不了解 Vue 响应性的代码，而仍然能够观察和响应源对象的更改。

User
普通对象可以传递给toRefs不
ChatGPT
不，toRefs 是设计用来接收由 reactive 创建的响应式对象的。如果你尝试将普通对象传递给 toRefs，它将返回一个空对象。

这里的关键是 toRefs 的目的是将响应式对象的每个属性转换为单独的 ref 对象，从而允许您在不丢失响应性的情况下解构对象。如果对象本身不是响应式的，那么这个操作就没有意义。

如果你想将普通对象的属性转换为 ref，你可以使用 reactive 将对象转换为响应式对象，然后使用 toRefs。

例如：

javascript
Copy code
import \{ reactive, toRefs \} from 'vue';

const ordinaryObject = \{
firstName: 'John',
lastName: 'Doe'
\};

const reactiveObject = reactive(ordinaryObject);
const refs = toRefs(reactiveObject);
在这个例子中，refs 现在是一个包含与原始对象的属性相对应的 ref 的对象。

:::
