---
title: "vue中拖动的实现"
date: 2026-08-11
categories:
  - "Vue 系统教程"
tags:
  - "Vue"
  - "Vue3"
  - "前端"
  - "教程"
  - "OneNote"
  - "项目实战"
description: "将拖动事件全部代理到这些拖动元素的公共父元素之上，即事件代理； 在事件处理函数中，我们一般要把被真实拖动的元素记录下来，记下一些坐标值等，配置拖拽属性： evt.dataTransfer.effectAllowed 'move' 然后在回调中再添加上其它拖拽事件： eventDe。"
sidebarWeight: 50
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/实战/vue中拖动的实现.md"
---
::: v-pre

# vue中拖动的实现

> 本节目标：理解“vue中拖动的实现”的核心思路，并能把它用于实际开发或面试表达。
```
给dom中需要拖动的元素加上属性，也可以带上数据
el.draggable = true
```

将拖动事件全部代理到这些拖动元素的公共父元素之上，即事件代理；

```
先给公共父元素加上最基本的dragstart事件：
eventDelegationEl.addEventListener(
  'dragstart',
  function (evt) {
    dragEl = evt.target
    startX = evt.clientX
    startY = evt.clientY
    evt.dataTransfer.effectAllowed = 'move'
    //   evt.dataTransfer.setData('Text', dragEl.textContent)
    eventDelegationEl.addEventListener('dragover', _onDragOver, false)
    eventDelegationEl.addEventListener('dragend', _onDragEnd, false)
    eventDelegationEl.addEventListener('dragleave', _onDragLeave, false)
    setTimeout(function () {
      dragEl.classList.add('ghost')
    }, 0)
  },
  false
)
```

在事件处理函数中，我们一般要把被真实拖动的元素记录下来，记下一些坐标值等，配置拖拽属性：
evt.dataTransfer.effectAllowed = 'move'

然后在回调中再添加上其它拖拽事件：
eventDelegationEl.addEventListener('dragover', _onDragOver, false)
eventDelegationEl.addEventListener('dragend', _onDragEnd, false)
eventDelegationEl.addEventListener('dragleave', _onDragLeave, false)
这里基本上有拖动目标元素的所有事件了；

dragover
接下来，便是在dragover或dragenter中进行处理，一般拖拽中，我们会在目标元素上添加一些样式，表示拖拽元素将会放置的位置；一般要判断拖拽方向，然后在目标元素或上或下，或左或右添加放置的样式；

```
drageleave这个事件中，一般是清除掉我们dragover添加的样式；
function _onDragLeave() {
  if (dropTarget) {
    dropTarget.classList.remove('drop-to-top')
    dropTarget.classList.remove('drop-to-right')
    dropTarget.classList.remove('drop-to-bottom')
    dropTarget.classList.remove('drop-to-left')
  }
}
```

dragend事件中，我们一般对数据进行修改，然后让数据影响视图；
同时，我们还要清除样式，清除我们添加的事件监听；主要是:

```
dragover
```

```
dragend
```

```
drageleave
```

```
function _onDragEnd(evt) {
  evt.preventDefault()
  dragEl.classList.remove('ghost')
  if (dropTarget) {
    dropTarget.classList.remove('drop-to-top')
    dropTarget.classList.remove('drop-to-right')
    dropTarget.classList.remove('drop-to-bottom')
    dropTarget.classList.remove('drop-to-left')
  }
  eventDelegationEl.removeEventListener('dragover', _onDragOver, false)
  eventDelegationEl.removeEventListener('dragend', _onDragEnd, false)
  eventDelegationEl.removeEventListener('dragleave', _onDragLeave, false)
  if (dragEnd) {
    const from = dragEl.dataset.type
    const oldIndex = dragEl.dataset.index
    dragEnd({
      oldIndex,
      newIndex,
      from,
      to,
      direction
    })
  }
}
```

:::
