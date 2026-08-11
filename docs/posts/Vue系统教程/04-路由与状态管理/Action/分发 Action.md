---
title: "分发 Action"
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
description: "Action 通过 store.dispatch 方法触发： 乍一眼看上去感觉多此一举，我们直接分发 mutation 岂不更方便？实际上并非如此，还记得 mutation 必须同步执行这个限制么？ Action 就不受约束！我们可以在 action 内部执行异步操作： 支持同样。"
sidebarWeight: 67
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vuex/Action/分发 Action.md"
---
::: v-pre

# 分发 Action

> 本节目标：理解“分发 Action”的核心思路，并能把它用于实际开发或面试表达。
`Action` 通过 `store.dispatch` 方法触发：

```
store.dispatch('increment')
```
 乍一眼看上去感觉多此一举，我们直接分发 `mutation` 岂不更方便？实际上并非如此，还记得 `mutation` 必须同步执行这个限制么？`Action` 就不受约束！我们可以在 `action` 内部执行异步操作：

```
actions: {  incrementAsync ({ commit }) {    setTimeout(() => {      commit('increment')    }, 1000)  }}
Actions
```

支持同样的载荷方式和对象方式进行分发：
`//` 以载荷形式分发

```
store.dispatch('incrementAsync', {  amount: 10})
//
```

以对象形式分发

```
store.dispatch({  type: 'incrementAsync',  amount: 10})
```
 来看一个更加实际的购物车示例，涉及到调用异步 `API` 和分发多重 `mutation`：

```
actions: {  checkout ({ commit, state }, products) {    //
```

把当前购物车的物品备份起来

```
    const savedCartItems = [...state.cart.added]    //
```

发出结账请求，然后乐观地清空购物车

```
    commit(types.CHECKOUT_REQUEST)    //
```

购物 `API` 接受一个成功回调和一个失败回调

```
    shop.buyProducts(      products,      //
```

成功操作

```
      () => commit(types.CHECKOUT_SUCCESS),      //
```

失败操作

```
      () => commit(types.CHECKOUT_FAILURE, savedCartItems)    )  }}
```
 注意我们正在进行一系列的异步操作，并且通过提交 `mutation` 来记录 `action` 产生的副作用（即状态变更）。

:::
