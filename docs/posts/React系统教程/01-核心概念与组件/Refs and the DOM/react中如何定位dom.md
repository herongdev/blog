---
title: "react中如何定位dom"
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
description: "class组件可以用createRef或者ReactDOM.findDOMNode去找到组件真实DOM实例。（findDOMNode只能用于class组件） 函数组件用useRef，如果外部需要访问一个函数组件内部的ref，需要用forwardRef进行ref转发。（因为函数组件。"
sidebarWeight: 37
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/概念/Refs and the DOM/react中如何定位dom.md"
---
::: v-pre

# react中如何定位dom

> 本节目标：理解“react中如何定位dom”的核心思路，并能把它用于实际开发或面试表达。
class组件可以用createRef或者ReactDOM.findDOMNode去找到组件真实DOM实例。（findDOMNode只能用于class组件）
函数组件用useRef，如果外部需要访问一个函数组件内部的ref，需要用forwardRef进行ref转发。（因为函数组件props里是不会传递ref的，转发之后将作为第二个参数传入）
最不推荐的是通过document.querySelector来获取。（即使一定要这么做，请务必在useEffect中进行，并使用useRef对element进行keep。jquery同理。）

:::
