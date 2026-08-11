---
title: "用 key 管理可复用的元素"
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
description: "Vue 会尽可能高效地渲染元素，通常会复用已有元素而不是从头开始渲染。 这么做除了使 Vue 变得非常快之外，还有其它一些好处。例如，如果你允许用户在不同的登录方式之间切换： 那么在上面的代码中切换 loginType 将不会清除用户已经输入的内容。因为两个模板使用了相同的元素。"
sidebarWeight: 48
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/api/条件渲染/用 key 管理可复用的元素.md"
---
::: v-pre

# 用 key 管理可复用的元素

> 本节目标：理解“用 key 管理可复用的元素”的核心思路，并能把它用于实际开发或面试表达。
`Vue` ==会尽可能高效地渲染元素，通常会复用已有元素而不是从头开始渲染。==
==这么做除了使== `Vue` ==变得非常快之外，还有其它一些好处。例如，如果你允许用户在不同的登录方式之间切换：==

```
<template v-if="loginType === 'username'">  <label>Username</label>  <input placeholder="Enter your username"></template><template v-else>  <label>Email</label>  <input placeholder="Enter your email address"></template>
```
 ==那么在上面的代码中切换== `loginType` ==将不会清除用户已经输入的内容。因为两个模板使用了相同的元素，==`\<input\>` ==不会被替换掉——仅仅是替换了它的== `placeholder`==。==

==给元素添加一个具有唯一值的== `key` `attribute`==的话，则表示“这个元素是完全独立的，不要复用它们”，如==

```
<template v-if="loginType === 'username'">  <label>Username</label>  <input placeholder="Enter your username" key="username-input"></template><template v-else>  <label>Email</label>  <input placeholder="Enter your email address" key="email-input"></template>
```
 ==现在，每次切换时，输入框都将被重新渲染。==
==注意：==`\<label\>` ==元素仍然会被高效地复用，因为它们没有添加== `key` `attribute`==。==
 \> 来自

```
 <https://cn.vuejs.org/v2/guide/conditional.html>
```

:::
