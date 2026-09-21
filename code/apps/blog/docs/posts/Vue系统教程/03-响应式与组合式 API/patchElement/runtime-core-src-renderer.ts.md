---
title: "runtime-core-src-renderer.ts"
date: 2026-08-11
categories:
  - "Vue 系统教程"
tags:
  - "Vue"
  - "Vue3"
  - "前端"
  - "教程"
  - "OneNote"
  - "响应式与组合式 API"
description: "接下来调用createRenderer的Render方法，这个方法主要调用patch方法，patch方法里，会进行新老vnode是否全等和是否同一个vnode的判断，如果不是同一个vnode就直接把老的卸载掉，然后把旧vnode置为空；接下来vnode相同的逻辑了，即更新dom操。"
sidebarWeight: 36
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vue3/patchElement/runtime-core-src-renderer.ts.md"
---
::: v-pre

# runtime-core-src-renderer.ts

> 本节目标：理解“runtime-core-src-renderer.ts”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
```
<body>
  <div id="app"></div>
  <script src="./runtime-dom.global.js"></script>
  <script>
    let { createRenderer, h, render, Text } = VueRuntimeDOM
    render(h('h1', { style: { color: 'red' } }, '1111'), app);
    setTimeout(() => {
      render(h('h1', { style: { color: 'blue', background: 'red' } }, '1111'), app);
    }, 1000)
  </script>
</body>
```

```
对于以一模板代码：
我们进入了render方法，
第一参数是h方法，进入，由于参数是3个，并且最后参数不是vnode，执行
return createVnode(type, propsOrChildren, children);
相当将参数不动传给createVnode，当只有三个参数，并且第三个参数不是Vnode时；
```

```
接下来，创建Vnode，
由于type为h1，字符串，最终得到vnode为：
```

```
其中ShapeFlags表明它的子元素是文本；
```

```
接下来执行render方法，它的内部调用了createRenderer方法，这个方法在runtime-core中，
export function render(vnode, container) {
  // 在创建渲染器的时候 传入选项
  createRenderer(renderOptions).render(vnode, container)
}
即把一个对象渲染到一个容器中：
先调用createRenderer方法，它的参数为操作dom的自定义api和patchProps方法，即如何处理各类型属性值，并进行增删更新操作；
```

```
它的参数renderOptions我们定义如下
export const nodeOps = {
  // 增加 删除 修改 查询
  insert(child, parent, anchor = null) {
    // insertBefore 可以等价于appendChild
    parent.insertBefore(child, anchor);
  },
  remove(child) { // 删除节点
    const parentNode = child.parentNode;
    if (parentNode) {
      parentNode.removeChild(child)
    }
  },
  setElementText(el, text) {
    el.textContent = text;
  },
  setText(node, text) {
    // document.createTextNode()
    node.nodeValue = text;
  },
  querySelector(selector) {
    return document.querySelector(selector)
  },
  parentNode(node) {
    return node.parentNode
  },
  nextSibling(node) {
    return node.nextSibling
  },
  createElement(tagName) {
    return document.createElement(tagName);
  },
  createText(text) {
    return document.createTextNode(text);
  }
}
```

```
createRenderer方法返回一个包含Rendre方法的对象，render方法如下：
// vnode 虚拟dom
const render = (vnode, container) => {
  // 渲染过程是用你传入的renderOptions来渲染
  if (vnode == null) {
    // 卸载逻辑
    if (container._vnode) { // 之前确实渲染过了，那么就卸载掉dom
      unmount(container._vnode); // el
    }
  } else {
    // 这里既有初始化的逻辑，又有更新的逻辑
    patch(container._vnode || null, vnode, container)
  }
  container._vnode = vnode
  // 如果当前vnode是空的话
}
```

```
接下来进入到patch方法中：
这个方法会比较前后两个vnode，从而决定操作：
如果老vnode有，只是新旧类型不同，就卸载掉老的Dom，接下来就都是没有老vnode的情况了，有一个情况是新vnode也没有，还有一个情况是有新的vnode，我们就假设都有即可；在具体处理时，再考虑老vnode为空的情况
添加的时候，要看一下vnode的类型：
const patch = (n1, n2, container) => {
  //  核心的patch方法
  if (n1 === n2) return;
  if (n1 && !isSameVnode(n1, n2)) {
    // 判断两个元素是否相同，不相同卸载在添加
    unmount(n1); // 删除老的
    n1 = null
  }
  const { type, shapeFlag } = n2
  switch (type) {
    case Text:
      processText(n1, n2, container);
      break;
    default:
      if (shapeFlag & ShapeFlags.ELEMENT) {
        processElement(n1, n2, container);
      }
  }
}
```

```
我们的新vnode是元素而不是文本，执行processElement方法：
const processElement = (n1, n2, container) => {
  if (n1 === null) {
    mountElement(n2, container);
  } else {
    // 元素比对
    patchElement(n1, n2)
  }
}
```

```
在老vnode为空的情况下，即初始渲染，
做以下四件事：
一、创建元素
二、创建属性
三、处理子元素
四、将元素插入到容器
const mountElement = (vnode, container) => {
  let { type, props, children, shapeFlag } = vnode;
  let el = vnode.el = hostCreateElement(type);
  // 将真实元素挂载到这个虚拟节点上，后续用于复用节点和更新
  if (props) {
    for (let key in props) {
      hostPatchProp(el, key, null, props[key])
    }
  }
  if (shapeFlag & ShapeFlags.TEXT_CHILDREN) { // 文本
    hostSetElementText(el, children)
  } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) { // 数组
    mountChildren(children, el)
  }
  hostInsert(el, container)
}
至此，首次渲染完成；
```

```
接下来，我们render一个新的h()方法返回的虚拟dom：
这次创建的vnode为：
```

```
主要是属性不一样，类型type是一样的；
```

接下来调用createRenderer的Render方法，这个方法主要调用patch方法，patch方法里，会进行新老vnode是否全等和是否同一个vnode的判断，如果不是同一个vnode就直接把老的卸载掉，然后把旧vnode置为空；接下来vnode相同的逻辑了，即更新dom操作；

```
执行patchElement操作：
const patchElement = (n1, n2) => {
  // 先复用节点、在比较属性、在比较儿子
  let el = n2.el = n1.el;
  let oldProps = n1.props || {}; // 对象
  let newProps = n2.props || {}; // 对象
  patchProps(oldProps, newProps, el);
  patchChildren(n1, n2, el);
}
```

```
比较属性
const patchProps = (oldProps, newProps, el) => {
  for (let key in newProps) {
    // 新的里面有，如果老的有就是覆盖，没有就是新增
    hostPatchProp(el, key, oldProps[key], newProps[key]);
  }
  for (let key in oldProps) {
    // 如果老的里面有新的没有，则是删除
    if (newProps[key] == null) {
      hostPatchProp(el, key, oldProps[key], null);
    }
  }
}
```

```
const patchChildren = (n1, n2, el) => {
  // 比较两个虚拟节点的儿子的差异 ， el就是当前的父节点
  const c1 = n1 && n1.children;
  const c2 = n2 && n2.children;
  // 文本  空的null  数组
  // 比较两个儿子列表的差异了
}
```

```
const mountChildren = (children, container) => {
  for (let i = 0; i < children.length; i++) {
    let child = normalize(children[i])
    patch(null, child, container)
  }
}
```

```
const normalize = (child) => {
  if (isString(child)) {
    return createVnode(Text, null, child)
  }
  return child
}
```

:::
