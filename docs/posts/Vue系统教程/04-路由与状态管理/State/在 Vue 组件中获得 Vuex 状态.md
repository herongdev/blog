---
title: "在 Vue 组件中获得 Vuex 状态"
date: 2026-08-11
categories:
  - "Vue 系统教程"
tags:
  - "Vue"
  - "Vue3"
  - "前端"
  - "教程"
  - "OneNote"
  - "路由与状态管理"
description: "一、最简单方法 在计算属性中返回某个状态： // 创建一个 Counter 组件 每当 store.state.count 变化的时候 , 都会重新求取计算属性，并且触发更新相关联的 DOM 。 然而，这种模式导致组件依赖全局状态单例。在模块化的构建系统中，在每个需要使用 sta。"
sidebarWeight: 88
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vuex/State/在 Vue 组件中获得 Vuex 状态.md"
---
::: v-pre

# 在 Vue 组件中获得 Vuex 状态

> 本节目标：理解“在 Vue 组件中获得 Vuex 状态”的核心思路，并能把它用于实际开发或面试表达。
**一、最简单方法**
在[计算属性](https://cn.vuejs.org/guide/computed.html)中返回某个状态：
`//` 创建一个 `Counter` 组件

```
const Counter = {  template: `<div>{{ count }}</div>`,  computed: {    count () {      return store.state.count    }  }}
```
 每当 `store.state.count` 变化的时候`,` 都会重新求取计算属性，并且触发更新相关联的 `DOM`。
然而，这种模式导致组件依赖全局状态单例。在模块化的构建系统中，在每个需要使用 `state` 的组件中需要频繁地导入，并且在测试组件时需要模拟状态。

**二、从根组件注入**
`Vuex` 通过 `store` 选项，提供了一种机制将状态从根组件“注入”到每一个子组件中（需调用 `Vue.use(Vuex)`）：

```
const app = new Vue({  el: '#app',  //
```

把 `store` 对象提供给 “`store`” 选项，这可以把 `store` 的实例注入所有的子组件

```
  store,  components: { Counter },  template: `    <div class="app">      <counter></counter>    </div>  `})
```
 通过在根实例中注册 `store` 选项，该 `store` 实例会注入到根组件下的所有子组件中，且子组件能通过 `this.$store` 访问到。让我们更新下 `Counter` 的实现：

```
const Counter = {  template: `<div>{{ count }}</div>`,  computed: {    count () {      return this.$store.state.count    }  }}
```

**三、**`mapState` **辅助函数**
当一个组件需要获取多个状态的时候，将这些状态都声明为计算属性会有些重复和冗余。为了解决这个问题，我们可以使用 `mapState` 辅助函数帮助我们生成计算属性，让你少按几次键：
`//` 在单独构建的版本中辅助函数为

```
 Vuex.mapStateimport { mapState } from 'vuex'
export default {  // ...  computed: mapState({    //
```

箭头函数可使代码更简练

```
    count: state => state.count,
//
```

传字符串参数 `'count'` 等同于

```
 `state => state.count`    countAlias: 'count',
//
```

为了能够使用 `` `this` `` 获取局部状态，必须使用常规函数

```
    countPlusLocalState (state) {      return state.count + this.localCount    }  })}
```
 当映射的计算属性的名称与 `state` 的子节点名称相同时，我们也可以给 `mapState` 传一个字符串数组。

```
computed: mapState([  //
```

映射 `this.count` 为

```
 store.state.count  'count'])
```

**对象展开运算符**
`mapState` 函数返回的是一个对象。我们如何将它与局部计算属性混合使用呢？通常，我们需要使用一个工具函数将多个对象合并为一个，以使我们可以将最终对象传给 `computed` 属性。但是自从有了[对象展开运算符](https://github.com/tc39/proposal-object-rest-spread)，我们可以极大地简化写法：

```
computed: {  localComputed () { /* ... */ },  //
```

使用对象展开运算符将此对象混入到外部对象中

```
  ...mapState({    // ...  })}
```

:::
