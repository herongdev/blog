---
title: "动画库直接修改 DOM 属性，跳过组件 Render 阶段"
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
description: "这个优化在业务中应该用不上，但还是非常值得学习的，将来可以应用到组件库中。"
sidebarWeight: 42
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/性能优化/减少不必要的渲染/动画库直接修改 DOM 属性，跳过组件 Render 阶段.md"
---
::: v-pre

# 动画库直接修改 DOM 属性，跳过组件 Render 阶段

> 本节目标：理解“动画库直接修改 DOM 属性，跳过组件 Render 阶段”的核心思路，并能把它用于实际开发或面试表达。
这个优化在业务中应该用不上，但还是非常值得学习的，将来可以应用到组件库中。

```
参考 [react-spring](https://github.com/pmndrs/react-spring)  的动画实现，当一个动画启动后，每次动画属性改变不会引起组件重新 Render ，而是直接修改了 dom 上相关属性值。
例子演示：[CodeSandbox](https://codesandbox.io/s/donghuakuzhijiexiugai-domtiaoguoxuanranjieduan-ij7px) 在线 Demo
import React, { useState } from "react"
import { useSpring, animated as a } from "react-spring"
import "./styles.css"
let renderCount = 0;
export function Card() {
  const [flipped, setFlipped] = useState(false)
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  })
  // 尽管 opacity 和 transform 的值在动画期间一直变化
  // 但是并没有组件的重新 Render
  return (
    <div onClick={() => setFlipped(state => !state)}>
      <div style={{ position: "fixed", top: 10, left: 10 }}>
        Render 次数：{++renderCount}
      </div>
      <a.div
        class="c back"
        style={{ opacity: opacity.interpolate(o => 1 - o), transform }}
      />
      <a.div
        class="c front"
        style={{
          opacity,
          transform: transform.interpolate(t => `${t} rotateX(180deg)`),
        }}
      />
    </div>
  )
}
export default Card
```

:::
