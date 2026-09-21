---
title: "Fibers"
date: 2026-08-11
categories:
  - "React 系统教程"
tags:
  - "React"
  - "Redux"
  - "前端"
  - "教程"
  - "OneNote"
  - "原理与手写实现"
description: "在渲染中，我们将创建根纤维并将其设置为下一个tunitofwork。剩下的工作将在performUnitOfWork功能上完成，在那里我们将为每根纤维做三件事: 这种数据结构的目标之一是使查找下一个工作单元变得容易。这就是为什么每根纤维都与它的第一个子细胞、下一个兄弟细胞和亲本细。"
sidebarWeight: 10
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/原理 2/从零开始实现一个React/Fibers.md"
---
::: v-pre

# Fibers

> 本节目标：理解“Fibers”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
```
为了组织工作单元，我们需要一个数据结：一个Fiber树。
We’ll have one fiber for each element and each fiber will be a unit of work.
```

```
让我举个例子。
假设我们想渲染一个这样的元素树：
```

```
==Didact====.====render====(==
==<div>==
==<h1>==
==<p />==
==<a />==
==</h1>==
==<h2 />==
==</div>,==
==container==
==)==
```

在渲染中，我们将创建根纤维并将其设置为下一个tunitofwork。剩下的工作将在performUnitOfWork功能上完成，在那里我们将为每根纤维做三件事:

```
==add the element to the DOM==
```

```
==create the fibers for the element’s children==
```

```
==select the next unit of work==
```

这种数据结构的目标之一是使查找下一个工作单元变得容易。这就是为什么每根纤维都与它的第一个子细胞、下一个兄弟细胞和亲本细胞相连。

当我们完成对一根纤维的工作时，如果它有一个孩子，那么纤维将是下一个工作单元。
在我们的示例中，当我们完成对div光纤的工作时，下一个工作单元将是h1光纤。

当我们完成对一根纤维的工作时，如果它有一个孩子，那么纤维将是下一个工作单元。
在我们的示例中，当我们完成对div光纤的工作时，下一个工作单元将是h1光纤。

如果纤维既没有孩子也没有兄弟姐妹，我们就去找“叔叔”:父母的兄弟姐妹。比如例子中的a和h2纤维。
同样，如果父结点没有兄弟结点，我们会一直向上，直到找到有兄弟结点的父结点，或者直到找到根结点。如果我们到达了根节点，这意味着我们已经完成了渲染的所有工作。

```
function createDom(fiber) {
    const dom =
        fiber.type == "TEXT_ELEMENT"
            ? document.createTextNode("")
            : document.createElement(fiber.type)
    const isProperty = key => key !== "children"
    Object.keys(fiber.props)
        .filter(isProperty)
        .forEach(name => {
            dom[name] = fiber.props[name]
        })
    return dom
}
```

```
In the ==render== function we set ==nextUnitOfWork== to the root of the fiber tree.
```

```
function render(element, container) {
    nextUnitOfWork = {
        dom: container,
        props: {
            children: [element],
        },
    }
}
```

```
let nextUnitOfWork = null
function workLoop(deadline) {
    let shouldYield = false
    while (nextUnitOfWork && !shouldYield) {
        nextUnitOfWork = performUnitOfWork(
            nextUnitOfWork
        )
        shouldYield = deadline.timeRemaining() < 1
    }
    requestIdleCallback(workLoop)
}
requestIdleCallback(workLoop)
```

```
function performUnitOfWork(fiber) {
    if (!fiber.dom) {
        fiber.dom = createDom(fiber)
    }
    if (fiber.parent) {
        fiber.parent.dom.appendChild(fiber.dom)
    }
    const elements = fiber.props.children
    let index = 0
    let prevSibling = null
    while (index < elements.length) {
        const element = elements[index]
        const newFiber = {
            type: element.type,
            props: element.props,
            parent: fiber,
            dom: null,
        }
        if (index === 0) {
            fiber.child = newFiber
        } else {
            prevSibling.sibling = newFiber
        }
        prevSibling = newFiber
        index++
    }
    if (fiber.child) {
        return fiber.child
    }
    let nextFiber = fiber
    while (nextFiber) {
        if (nextFiber.sibling) {
            return nextFiber.sibling
        }
        nextFiber = nextFiber.parent
    }
}
```

每次处理一个元素时，我们都会向DOM添加一个新节点。而且，请记住，浏览器可能会在我们完成渲染整个树之前中断我们的工作。在这种情况下，用户将看到一个不完整的UI。我们不想这样。

```
function commitRoot() {
    commitWork(wipRoot.child)
    wipRoot = null
}
function commitWork(fiber) {
    if (!fiber) {
        return
    }
    const domParent = fiber.parent.dom
    domParent.appendChild(fiber.dom)
    commitWork(fiber.child)
    commitWork(fiber.sibling)
}
```

:::
