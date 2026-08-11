---
title: "避免在 didMount、didUpdate 中更新组件 State"
date: 2026-08-11
categories:
  - "Vue 系统教程"
tags:
  - "Vue"
  - "Vue3"
  - "前端"
  - "教程"
  - "OneNote"
  - "工程化、质量与性能"
description: "这个技巧不仅仅适用于 didMount、didUpdate，还包括 willUnmount、useLayoutEffect 和特殊场景下的 useEffect（当父组件的 CDU/CDM 触发时，子组件的 useEffect 会同步调用），本文为叙述方便将他们统称为「提交阶段钩子。"
sidebarWeight: 44
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/性能优化/减少不必要的渲染/避免在 didMount、didUpdate 中更新组件 State.md"
---
::: v-pre

# 避免在 didMount、didUpdate 中更新组件 State

> 本节目标：理解“避免在 didMount、didUpdate 中更新组件 State”的核心思路，并能把它用于实际开发或面试表达。
这个技巧不仅仅适用于 didMount、didUpdate，还包括 willUnmount、useLayoutEffect 和特殊场景下的 useEffect（当父组件的 CDU/CDM 触发时，子组件的 useEffect 会同步调用），本文为叙述方便将他们统称为「提交阶段钩子」。

[React](#heading-0) 工作流提交阶段的第二步就是执行提交阶段钩子，它们的执行会阻塞浏览器更新页面。如果在提交阶段钩子函数中更新组件 State，会再次触发组件的更新流程，造成两倍耗时。

```
一般在提交阶段的钩子中更新组件状态的场景有：
```

计算并更新组件的派生状态（Derived State）。在该场景中，类组件应使用 [getDerivedStateFromProps](https://reactjs.org/docs/react-component.html#static-getderivedstatefromprops) 钩子方法代替，函数组件应使用[函数调用时执行](https://reactjs.org/docs/hooks-faq.html#how-do-i-implement-getderivedstatefromprops) setState的方式代替。使用上面两种方式后，React 会将新状态和派生状态在一次更新内完成。

根据 DOM 信息，修改组件状态。在该场景中，除非想办法不依赖 DOM 信息，否则两次更新过程是少不了的，就只能用其他优化技巧了。

[use-swr](https://github.com/vercel/swr/blob/0.3.8/src/use-swr.ts#L536) 的源码就使用了该优化技巧。当某个接口存在缓存数据时，use-swr 会先使用该接口的缓存数据，并在 requestIdleCallback 时再重新发起请求，获取最新数据。如果 use-swr 不做该优化的话，就会在 useLayoutEffect 中触发重新验证并[设置](https://github.com/vercel/swr/blob/dedc017248e3de9502f5d9ff874d45de3b20ab06/src/use-swr.ts#L352) isValidating 状态为 true，引起组件的更新流程，造成性能损失。

:::
