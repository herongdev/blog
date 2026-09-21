---
title: "ref实现"
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
description: "创建一个虚拟 DOM ，也就是一个 React 元素 元素的类型 配置对象 儿子，有可能独生子 ( 对象 ) ，也可能是多个 ( 数组 可以通过 ref 引用此元素 可以唯一标识一个子元素 可能是 React 元素对象，也可能是一个字符串 数字 React父组件调用子组件的方法。"
sidebarWeight: 27
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/实现/7.ref /ref实现.md"
---
::: v-pre

# ref实现

> 本节目标：理解“ref实现”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
```
src\constants.js
export const REACT_TEXT = Symbol('REACT_TEXT');
export const REACT_FORWARD_REF_TYPE = Symbol('react.forward_ref');
```

```
src\react.js
import { wrapToVdom } from "./utils";
import { Component } from './Component';
/**
 * createElement('h1',null,'a','b');
 *
```

创建一个虚拟`DOM`，也就是一个`React`元素

```
 * @param {*} type
```

元素的类型

```
span div p
 * @param {*} config
```

配置对象

```
 className style
 * @param {*} children
```

儿子，有可能独生子`(`对象`)`，也可能是多个`(`数组

```
)
 */
function createElement(type, config, children) {
    let ref;//
```

可以通过 `ref`引用此元素

```
    let key;//
```

可以唯一标识一个子元素

```
    if (config) {
        delete config.__source;
        delete config.__self;
        ref = config.ref;
        key = config.key;
        delete config.ref;
        delete config.key;
    }
    let props = { ...config };
    if (arguments.length > 3) {
        props.children = Array.prototype.slice.call(arguments, 2).map(wrapToVdom);
    } else {
        props.children = wrapToVdom(children);//children
```

可能是`React`元素对象，也可能是一个字符串 数字

```
 null undefined
    }
    return { type, ref, key, props };
}
```

```
export function createRef() {
  return { current: null };
}
export function forwardRef(render) {
  var elementType = {
    $$typeof: REACT_FORWARD_REF_TYPE,
    render: render
  };
  return elementType;
}
const React = {
  createElement,
  Component,
  createRef
};
export default React;
src\react-dom.js
import { REACT_TEXT, REACT_FORWARD_REF_TYPE } from './constants';
import { addEvent } from './event';
function render(vdom, container) {
  mount(vdom, container);
}
export function mount(vdom, container) {
  let newDOM = createDOM(vdom);
  container.appendChild(newDOM);
}
export function createDOM(vdom) {
  let { type, props, ref } = vdom;
  let dom;
  if (type && type.$$typeof === REACT_FORWARD_REF_TYPE) {
    return mountForwardComponent(vdom);
  } else if (type === REACT_TEXT) {
    dom = document.createTextNode(props.content);
  } else if (typeof type === "function") {
    if (type.isReactComponent) {
      return mountClassComponent(vdom);
    } else {
      return mountFunctionComponent(vdom);
    }
  } else {
    dom = document.createElement(type);
  }
  if (props) {
    updateProps(dom, {}, props);
    if (typeof props.children == "object" && props.children.type) {
      mount(props.children, dom);
    } else if (Array.isArray(props.children)) {
      reconcileChildren(props.children, dom);
    }
  }
  vdom.dom = dom;
  if (ref) ref.current = dom;
  return dom;
}
function mountForwardComponent(vdom) {
  let { type, props, ref } = vdom;
  let renderVdom = type.render(props, ref);
  vdom.oldRenderVdom = renderVdom;
  return createDOM(renderVdom);
}
function mountClassComponent(vdom) {
  let { type, props, ref } = vdom;
  let classInstance = new type(props);
  if (ref) ref.current = classInstance;
  let renderVdom = classInstance.render();
  classInstance.oldRenderVdom = renderVdom;
  let dom = createDOM(renderVdom);
  return dom;
}
function mountFunctionComponent(vdom) {
  let { type, props } = vdom;
  let renderVdom = type(props);
  vdom.oldRenderVdom = renderVdom;
  return createDOM(renderVdom);
}
function updateProps(dom, oldProps, newProps) {
  for (let key in newProps) {
    if (key === "children") {
      continue;
    }
    if (key === "style") {
      let style = newProps[key];
      for (let attr in style) {
        dom.style[attr] = style[attr];
      }
    } else if (key.startsWith("on")) {
      addEvent(dom, key.toLocaleLowerCase(), newProps[key]);
    } else {
      dom[key] = newProps[key];
    }
  }
}
export function findDOM(vdom) {
  let { type } = vdom;
  let dom;
  if (typeof type === 'function') {
    dom = findDOM(vdom.oldRenderVdom);
  } else {
    dom = vdom.dom;
  }
  return dom;
}
export function compareTwoVdom(parentDOM, oldVdom, newVdom) {
  let oldDOM = findDOM(oldVdom);
  let newDOM = createDOM(newVdom);
  parentDOM.replaceChild(newDOM, oldDOM);
}
function reconcileChildren(childrenVdom, parentDOM) {
  for (let i = 0; i < childrenVdom.length; i) {
    let childVdom = childrenVdom[i];
    mount(childVdom, parentDOM);
  }
}
const ReactDOM = {
  render,
};
export default ReactDOM;
```

**React父组件调用子组件的方法**

**前言**
在React中，我们经常在子组件中调用父组件的方法，一般用props回调即可。但是有时候也需要在父组件中调用子组件的方法，通过这种方法实现高内聚。有多种方法，请按需服用。
**类组件中**
**React.createRef()**

- 优点：通俗易懂，用ref指向。
- 缺点：使用了HOC的子组件不可用，无法指向真是子组件比如一些常用的写法，mobx的@observer包裹的子组件就不适用此方法。

==import React, \{ Component \} from 'react';======
==class Sub extends Component \{====== ==callback() \{====== ==console.log('====执行回调====');====== ==\}====== ==render() \{====== ==return \<div\>====子组件====\</div\>;====== ==\}========\}======
==class Super extends Component \{====== ==constructor(props) \{====== ==super(props);====== ==this.sub = React.createRef();====== ==\}====== ==handleOnClick() \{====== ==this.sub.callback();====== ==\}====== ==render() \{====== ==return (====== ==\<div\>====== ==\<Sub ref=\{this.sub\}\>\</Sub\>====== ==\</div\>====== ==);====== ==\}========\}======

- 优点：ref写法简洁
- 缺点：使用了HOC的子组件不可用，无法指向真是子组件（同上）

使用方法和上述的一样，就是定义ref的方式不同。
==...======
==\<Sub ref=\{ref =\> this.sub = ref\}\>\</Sub\>======
==...======

- 优点：假如子组件是嵌套了HOC，也可以指向真实子组件。
- 缺点：需要自定义props属性

==import React, \{ Component \} from 'react';========import \{ observer \} from 'mobx-react'======
==@observer========class Sub extends Component \{====== ==componentDidMount()\{====== ==//== ==将子组件指向父组件的变量====== ==this.props.onRef && this.props.onRef(this);====== ==\}====== ==callback()\{====== ==console.log("====执行我====")====== ==\}====== ==render()\{====== ==return (\<div\>====子组件====\</div\>);====== ==\}========\}======
==class Super extends Component \{====== ==handleOnClick()\{====== ==//== ==可以调用子组件方法====== ==this.Sub.callback();====== ==\}====== ==render()\{====== ==return (====== ==\<div\>====== ==\<div onClick=\{this.handleOnClick\}\>click\</div\>====== ==\<Sub onRef=\{ node =\> this.Sub = node \}\>\</Sub\>== ==== ==\</div\>)====== ==\}========\}======
**函数组件、Hook组件**

- 优点：
    - 缺点：

    1、需要自定义props属性 2、需要自定义暴露的方法
    ==import React, \{ useImperativeHandle \} from 'react';========import \{ observer \} from 'mobx-react'======
    ==const Parent = () =\> \{====== ==let ChildRef = React.createRef();======
    ==function handleOnClick() \{====== ==ChildRef.current.func();====== ==\}======
    ==return (====== ==\<div\>====== ==\<button onClick=\{handleOnClick\}\>click\</button\>====== ==\<Child onRef=\{ChildRef\} /\>====== ==\</div\>====== ==);========\};======
    ==const Child = observer(props =\> \{====== ==//====用====useImperativeHandle====暴露一些外部====ref====能访问的属性====== ==useImperativeHandle(props.onRef, () =\> \{====== ==//== ==需要将暴露的接口返回出去====== ==return \{====== ==func: func,====== ==\};====== ==\});====== ==function func() \{====== ==console.log('====执行我====');====== ==\}====== ==return \<div\>====子组件====\</div\>;========\});======
    ==export default Parent;======
    **forwardRef**
    使用forwardRef抛出子组件的ref
    这个方法其实更适合自定义HOC。但问题是，withRouter、connect、Form.create等方法并不能抛出ref，假如Child本身就需要嵌套这些方法，那基本就不能混着用了。forwardRef本身也是用来抛出子元素，如input等原生元素的ref的，并不适合做组件ref抛出，因为组件的使用场景太复杂了。
    ==import React, \{ useRef, useImperativeHandle \} from 'react';========import ReactDOM from 'react-dom';========import \{ observer \} from 'mobx-react'======
    ==const FancyInput = React.forwardRef((props, ref) =\> \{====== ==const inputRef = useRef();====== ==useImperativeHandle(ref, () =\> (\{====== ==focus: () =\> \{====== ==inputRef.current.focus();====== ==\}====== ==\}));======
    ==return \<input ref=\{inputRef\} type="text" /\>========\});======
    ==const Sub = observer(FancyInput)======
    ==const App = props =\> \{====== ==const fancyInputRef = useRef();======
    ==return (====== ==\<div\>====== ==\<FancyInput ref=\{fancyInputRef\} /\>====== ==\<button====== ==onClick=\{() =\> fancyInputRef.current.focus()\}====== ==\>====父组件调用子组件的== ==focus\</button\>====== ==\</div\>====== ==)========\}======
    ==export default App;======
    **总结**

    - 子组件无HOC嵌套：推荐使用ref直接调用
    - 有HOC嵌套：推荐使用自定义props的方式

**ref的函数式声明**
**使用props自定义onRef属性**
**useImperativeHandle**
1、写法简单易懂 2、假如子组件嵌套了HOC，也可以指向真实子组件
父组件调子组件函数有两种情况

:::
