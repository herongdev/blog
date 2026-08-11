---
title: "错误边界(Error Boundaries)"
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
description: "如果当一个组件异步加载下载js文件时，网络错误，无法下载 js 文件 Suspense 无法处理这种错误情况， 在 react 中有一个 错误边界 （Error Boundaries）的概念，用来解决这种问题，它是利用了 react 生命周期的 componentDidCatch。"
sidebarWeight: 61
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/性能优化/错误边界(Error Boundaries).md"
---
::: v-pre

# 错误边界(Error Boundaries)

> 本节目标：理解“错误边界(Error Boundaries)”的核心思路，并能把它用于实际开发或面试表达。
- 如果当一个组件异步加载下载js文件时，网络错误，无法下载 js 文件 Suspense 无法处理这种错误情况， 在 react 中有一个 错误边界 （Error Boundaries）的概念，用来解决这种问题，它是利用了 react 生命周期的 componentDidCatch 方法来处理
- 有两种方式，一种是 生命周期 componentDidCatch 来处理错误，还有一种 是 静态方法 static getDerivedStateFromError 来处理错误，
- 请使用static getDerivedStateFromError()渲染备用 UI ，使用 componentDidCatch() 打印错误信息。

```
import React, { Component, Suspense } from 'react'
import ReactDOM from 'react-dom';
import Loading from './components/Loading';
const AppTitle = React.lazy(() => import(/* webpackChunkName: "title" */'./components/Title'))
class App extends Component {
  state = {
    visible: false,
    isError: false
  }
  show = () => {
    this.setState({ visible: true });
  }
  static getDerivedStateFromError(error) {
    return { isError: true };
  }
  componentDidCatch(err, info) {
    console.log(err, info)
  }
  render() {
    if (this.state.isError) {
      return (<div>error</div>)
    }
    return (
      <>
        {
          this.state.visible && (
            <Suspense fallback={<Loading />}>
              <App Title />
            </Suspense>
          )
        }
        <button onClick={this.show}>
```

加载

```
</button>
      </>
    )
  }
}
ReactDOM.render(
  <App />,
  document.querySelector('#root')
);
```

:::
