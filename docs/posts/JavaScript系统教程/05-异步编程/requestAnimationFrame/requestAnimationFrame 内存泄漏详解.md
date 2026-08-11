---
title: "requestAnimationFrame 内存泄漏详解"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "异步编程"
description: "什么是 rAF 内存泄漏？ requestAnimationFrame (rAF) 本身不会直接导致传统意义上的内存泄漏，但如果不正确管理动画循环，会导致 无效的资源占用 和 不必要的计算 。 什么情况下会发生？ 1. 组件卸载未清理 2. 页面切换未停止 3. Worker 未。"
sidebarWeight: 98
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/11-异步编程/requestAnimationFrame/`requestAnimationFrame` 内存泄漏详解.md"
---
::: v-pre

# requestAnimationFrame 内存泄漏详解

> 本节目标：理解“requestAnimationFrame 内存泄漏详解”的核心思路，并能把它用于实际开发或面试表达。
## 什么是 rAF 内存泄漏？
`requestAnimationFrame` (rAF) 本身不会直接导致传统意义上的内存泄漏，但如果不正确管理动画循环，会导致****无效的资源占用****和****不必要的计算****。

## 什么情况下会发生？
### 1. 组件卸载未清理
```javascript
// Vue 组件示例
export default {
  mounted() {
    this.animate()
  },
  methods: {
    animate() {
      // 没有保存id也无法取消
      requestAnimationFrame(() => {
        this.updateSomething()
        this.animate() // 递归调用
      })
    },
  },
  // 卸载时没有取消动画
}
```
### 2. 页面切换未停止
```javascript
// SPA应用切换路由时
function startGlobalAnimation() {
  function frame() {
    updateGlobalState()
    requestAnimationFrame(frame) // 持续运行即使页面已切换
  }
  frame()
}
```
### 3. Worker 未终止
```javascript
// 主线程与Worker配合时
let worker = new Worker('worker.js')
function poll() {
  worker.postMessage('update')
  requestAnimationFrame(poll) // 即使worker终止仍在调用
}
```
## "泄漏"的内存存储了什么？
1. ****回调函数闭包****：
   - 包含的作用域链
   - 引用的外部变量
   - 组件实例(在Vue/React中)
2. ****浏览器内部数据结构****：
   - 动画帧队列条目
   - 相关DOM状态
   - 事件监听器(如果回调中有注册)
3. ****计算资源****：
   - 持续的CPU计算周期
   - GPU资源(如果涉及WebGL)
## 会导致什么问题？
1. ****性能下降****：
   - 不必要的重绘/重排
   - CPU使用率居高不下
2. ****数据不一致****：
   - 已卸载组件仍尝试更新状态
   - 过时的数据计算
3. ****电池消耗****：
   - 移动设备电池快速耗尽
   - 笔记本电脑风扇高速运转

## 如何检测？
### 1. Chrome DevTools
****内存面板****：
1. 拍取堆快照
2. 搜索你的动画函数名称
3. 检查是否有多余实例
****Performance面板****：
1. 录制性能时间线
2. 检查"Animation Frame Fired"事件
3. 观察是否在不需要时仍在触发

### 2. Vue DevTools
- 检查已卸载组件是否仍有活动
- 观察意外的状态更新
### 3. 代码检测模式
```javascript
let _rafCount = 0
function monitoredRAF(callback) {
  _rafCount++
  console.log(`Active RAF: ${_rafCount}`)
  return requestAnimationFrame((...args) => {
    callback(...args)
    _rafCount--
    console.log(`Active RAF: ${_rafCount}`)
  })
}
// 使用替代原生rAF
monitoredRAF(() => {
  /*...*/
})
```

## 最佳实践解决方案
### 1. Vue 3 Composition API
```javascript
import { onMounted, onUnmounted } from 'vue'
export function useAnimation() {
  let rafId = null
  function animate() {
    // 动画逻辑
    rafId = requestAnimationFrame(animate)
  }
  onMounted(animate)
  onUnmounted(() => {
    cancelAnimationFrame(rafId)
  })
}
```
### 2. React 解决方案
```javascript
useEffect(() => {
  let rafId = null
  function animate() {
    // 动画逻辑
    rafId = requestAnimationFrame(animate)
  }
  animate()
  return () => cancelAnimationFrame(rafId)
}, [])
```
### 3. 通用工具函数
```javascript
function createAnimationManager() {
  let rafId = null
  let isRunning = false
  return {
    start(callback) {
      if (isRunning) return
      isRunning = true
      function frame() {
        callback()
        rafId = requestAnimationFrame(frame)
      }
      frame()
    },
    stop() {
      isRunning = false
      cancelAnimationFrame(rafId)
    },
  }
}
```

## 高级检测技巧
### 1. 使用 FinalizationRegistry (ES2021)
```javascript
const registry = new FinalizationRegistry((heldValue) => {
  console.warn(`动画控制器 ${heldValue} 未被正确释放`)
})
class AnimationController {
  constructor() {
    registry.register(this, 'AnimationController')
    this.rafId = null
  }
  // ...其他方法
  dispose() {
    cancelAnimationFrame(this.rafId)
    registry.unregister(this)
  }
}
```
### 2. Performance Observer
```javascript
const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    if (entry.name === 'FireAnimationFrame' && entry.duration > 16) {
      console.warn('长帧动画:', entry)
    }
  })
})
observer.observe({ entryTypes: ['frame'] })
```
## 总结
`requestAnimationFrame` 的"泄漏"本质是****资源未及时释放****而非传统内存泄漏。关键点：
1. ****总是保存返回的ID****以便取消
2. ****组件/页面卸载时清理****
3. ****使用框架生命周期钩子****管理
4. ****定期检查****动画是否仍在需要时运行
通过良好管理和适当监控，可以完全避免这类问题，确保应用高效运行。

:::
