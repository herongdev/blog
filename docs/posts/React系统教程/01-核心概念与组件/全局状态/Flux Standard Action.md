---
title: "Flux Standard Action"
date: 2026-08-11
categories:
  - "React 系统教程"
tags:
  - "React"
  - "Redux"
  - "前端"
  - "教程"
  - "OneNote"
  - "核心概念与组件"
description: "Introduction 一个对人类友好的Flux action objects 动作对象标准。欢迎反馈。 Motivation 动机 如果我们能对 Flux 的形状做出某些假设，那么处理 Flux actions 就会容易得多。例如，基本上所有的Flux操作都有一个标识符字段。"
sidebarWeight: 98
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/状态改变/全局状态/Flux Standard Action.md"
---
::: v-pre

# Flux Standard Action

> 本节目标：理解“Flux Standard Action”的核心思路，并能把它用于实际开发或面试表达。
`Introduction`
一个对人类友好的Flux ==action objects==动作对象标准。欢迎反馈。
`Motivation`**动机**
如果我们能对`Flux`的形状做出某些假设，那么处理`Flux actions`就会容易得多。例如，基本上所有的Flux操作都有一个标识符字段，例如type、actionType或actionId。许多Flux实现还包括一种动作指示成功或失败的方法，特别是数据获取操作的结果。为这些模式定义一个最小的、通用的标准可以创建有用的工具和抽象。
**错误是第一类概念**`Errors as a first class concept`
Flux ==actions==可以被认为是一个==asynchronous sequence of values==异步的值序列。异步序列处理错误非常重要。目前，许多Flux实现并不这样做，而是定义单独的操作类型，比如LOAD_SUCCESS和LOAD_FAILURE。这并不理想，因为它会重载两个独立的关注点：从“全局”操作序列中消除某种类型的操作的歧义，以及指示某个操作是否表示错误。FSA将错误视为头等概念。
`Design goals`

- `Human-friendly.` FSA操作应该易于人类读写。
- `Useful.` FSA操作应该能够创建有用的工具和抽象。
- `Simple.`它的设计应该简单、直接、灵活。
```
Example
A
```

一个基本的==Flux== ==Standard Action==流量标准动作

```
:
{  type: 'ADD_TODO',  payload: {    text: 'Do something.'    }}
```

表示错误的FSA，

```
analogous to a rejected Promise:
{  type: 'ADD_TODO',  payload: new Error(),  error: true}
Actions
An action
```

==必须==`MUST`

- `be a plain JavaScript object.`
- `have a` `type` `property.`

`An action` ==可以==`MAY`

- `have an` `error` `property.`
- `have a` `payload` `property.`
- `have a` `meta` `property.`

操作不能包含==type==类型、 ==payload==有效负载、 ==error==错误和 ==meta==以外的属性。

- `type`==：==操作的 ==type==类型向使用者标识已发生的操作的性质。type是一个字符串常量。如果两种类型相同，则它们必须严格等价(使用===)。
- `payload`==：==可选的有效负载属性可以是任何类型的值。它表示操作的有效负载。关于操作的任何信息(不是操作的类型或状态)都应该是有效负载字段的一部分。按照惯例，如果错误为==true==真，那么负载应该是一个错误对象。这==akin==类似于用错误对象==rejecting a promise。==
- `error`==：==如果操作表示错误，则可选错误属性可设置为true。错误为真的行为类似于被==rejected Promise==。按照惯例，负载应该是一个错误对象。如果error除了true之外还有其他值，包括undefined和null，则不能将该操作解释为错误。
- `meta`==：==可选的==meta==属性可以是任何类型的值。它用于不属于负载的任何额外信息。

`Utility functions`
模块flux-standard-action在npm上可用。它导出了一些实用函数。

- `isFSA(action)`

```
import { isFSA } from 'flux-standard-action';
Returns true if
```

 `action` `is FSA` ==许可的==`compliant.`

- `isError(action)`

```
import { isError } from 'flux-standard-action';
Returns true if
```

 `action` ==标志着==`represents an error`==。==
`Libraries`

- ```
    redux-actions
    ```

     `- a set of helpers for creating and handling FSA actions in Redux.`
- ```
    redux-promise
    ```

     `- Redux promise middleware that supports FSA actions.`
- ```
    redux-rx
    ```

     `- RxJS utilities for Redux, including a middleware that supports FSA actions.`
 \> 来自

```
 <https://github.com/redux-utilities/flux-standard-action>
```

:::
