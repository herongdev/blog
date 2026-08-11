---
title: "react16 版本常见 api"
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
description: "围绕“react16 版本常见 api”整理的概念、示例与实践笔记。"
sidebarWeight: 59
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/概念/介绍/react16 版本常见 api.md"
---
::: v-pre

# react16 版本常见 api

> 本节目标：理解“react16 版本常见 api”的核心思路，并能把它用于实际开发或面试表达。
```
const React = {
  Children: {
    map,
    forEach,
    count,
    toArray,
    only
  },
  createRef,
  Component,
  PureComponent,
  createContext,
  forwardRef,
  Fragment: REACT_FRAGMENT_TYPE,
  StrictMode: REACT_STRICT_MODE_TYPE,
  unstable_AsyncMode: REACT_ASYNC_MODE_TYPE,
  unstable_Profiler: REACT_PROFILER_TYPE,
  createElement: __DEV__ ? createElementWithValidation : createElement,
  cloneElement: __DEV__ ? cloneElementWithValidation : cloneElement,
  createFactory: __DEV__ ? createFactoryWithValidation : createFactory,
  isValidElement: isValidElement,
  version: ReactVersion,
  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: ReactSharedInternals
}
```

:::
