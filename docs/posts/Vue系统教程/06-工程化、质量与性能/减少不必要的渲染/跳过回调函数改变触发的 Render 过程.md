---
title: "跳过回调函数改变触发的 Render 过程"
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
description: "另一类是组件 Render 后的回调函数，如：onClick、onVisibleChange。 这类属性并不参与到组件的 Render 过程，因为可以对这类属性进行优化。当这类属性发生改变时，不触发组件的重新 Render ，而是在回调触发时调用最新的回调函数。 Dan Abra。"
sidebarWeight: 43
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/性能优化/减少不必要的渲染/跳过回调函数改变触发的 Render 过程.md"
---
::: v-pre

# 跳过回调函数改变触发的 Render 过程

> 本节目标：理解“跳过回调函数改变触发的 Render 过程”的核心思路，并能把它用于实际开发或面试表达。
```
React 组件的 Props 可以分为两类。
```

```
一类是在对组件 Render 有影响的属性，如：页面数据、[getPopupContainer](https://ant.design/components/dropdown/) 和 enderProps 函数。
```

另一类是组件 Render 后的回调函数，如：onClick、[onVisibleChange](https://ant.design/components/dropdown/)。 这类属性并不参与到组件的 Render 过程，因为可以对这类属性进行优化。当这类属性发生改变时，不触发组件的重新 Render ，而是在回调触发时调用最新的回调函数。

Dan Abramov 在 [A Complete Guide to useEffect](https://overreacted.io/a-complete-guide-to-useeffect/#each-render-has-its-own-event-handlers) 文章中认为，每次 Render 都有自己的事件回调是一件很酷的特性。但该特性要求每次回调函数改变就触发组件的重新 Render ，这在性能优化过程中是可以取舍的。

例子参考：[跳过回调函数改变触发的](https://codesandbox.io/s/tiaoguohuidiaohanshugaibianhongfade-render-guocheng-3i59n) Render 过程。以下代码比较难以理解，可通过调试该例子，帮助理解消化。

```
import { Children, cloneElement, memo, useEffect, useRef } from "react"
import { useDeepCompareMemo } from "use-deep-compare"
import omit from "lodash.omit"
let renderCnt = 0
export function SkipNotRenderProps({ children, skips }) {
  if (!skips) {
    // 默认跳过所有回调函数
    skips = prop => prop.startsWith("on")
  }
  const child = Children.only(children)
  const childProps = child.props
  const propsRef = useRef({})
  const nextSkippedPropsRef = useRef({})
  Object.keys(childProps)
    .filter(it => skips(it))
    .forEach(key => {
      // 代理函数只会生成一次，其值始终不变
      nextSkippedPropsRef.current[key] =
        nextSkippedPropsRef.current[key] ||
        function skipNonRenderPropsProxy(...args) {
          propsRef.current[key].apply(this, args)
        }
    })
  useEffect(() => {
    propsRef.current = childProps
  })
  // 这里使用 useMemo 优化技巧
  // 除去回调函数，其他属性改变生成新的 React.Element
  return useDeepCompareMemo(() => {
    return cloneElement(child, {
      ...child.props,
      ...nextSkippedPropsRef.current,
    })
  }, [omit(childProps, Object.keys(nextSkippedPropsRef.current))])
}
// SkipNotRenderPropsComp 组件内容和 Normal 内容一样
export function SkipNotRenderPropsComp({ onClick }) {
  return (
    <div className="case">
      <div className="caseHeader">
        跳过『与 Render 无关的 Props』改变触发的重新 Render
      </div>
      Render 次数为：{++renderCnt}
      <div>
        <button onClick={onClick} style={{ color: "blue" }}>
          点我回调，回调弹出值为 1000（优化成功）
        </button>
      </div>
    </div>
  )
}
export default SkipNotRenderPropsComp
```

:::
