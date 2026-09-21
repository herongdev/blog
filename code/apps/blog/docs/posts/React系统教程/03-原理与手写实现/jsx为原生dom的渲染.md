---
title: "jsx为原生dom的渲染"
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
description: "import React from ReactDOM from babel 会调用自动调用 React.createElement 去转换 let element1 ( color: \"red\" 了解元素 element 主要属性 先调用了 reactDOM.render 方法。"
sidebarWeight: 46
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/实现/jsx为原生dom的渲染.md"
---
::: v-pre

# jsx为原生dom的渲染

> 本节目标：理解“jsx为原生dom的渲染”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
`import` `React` `from`

```
"./react";
import
```

 `ReactDOM` `from`

```
"./react-dom";
//
```

 `babel`会调用自动调用`React.createElement`去转换
`let` `element1` `=` `(`

```
<div
```

```
className="title"
```

```
style={{
```

 `color:` `"red"`

```
}}>
```

```
<span>hello
```

```
world</span>
```

```
</div>
);
debugger
//
```

 了解元素`element`主要属性

```
console.log(element1);
ReactDOM.render('',
```

```
document.getElementById("root"));
```

先调用了`reactDOM.render`方法；
在这个方法中，我们传入了`createElement`返回的普通对象，也就是`vdom`；它的结构如下：

可见，对于`children`，如果只是单个，将是一个对象，如果是多个，将会是一个数组；
它本质上来说，就是用来描述jsx的一个对象，说到底，它描述的是一个会生成dom结构的函数，它描述了函数的名称type，它的参数，还是它返回的jsx结构的描述；
`let` `element1` `=` `(`

```
<div
```

```
className="title"
```

```
style={{
```

 `color:` `"red"`

```
}}>
```

```
<span>hello
```

```
world</span>
```

```
<span>hello
```

```
javascript</span>
```

```
</div>
);
```

此外，如果`children`是基本数据类型，其中`undefined,null,`布尔值，不会渲染处理，而字符串和数字才会处理；
`let` `element1` `=` `(`

```
<div
```

```
className="title"
```

```
style={{
```

 `color:` `"red"`

```
}}>
```
     `{null}`
    `{false}`
    `{undefined}`
    `{true}`

```
<span>hello
```

```
javascript</span>
```

```
</div>
);
```

`function`

```
createElement(type,
```

```
config,
```

```
children)
```

 `{`
    `let`

```
ref;//
```

可以通过 `ref`引用此元素
    `let`

```
key;//
```

可以唯一标识一个子元素
    `if`

```
(config)
```

 `{`
        `delete`

```
config.__source;
```
         `delete`

```
config.__self;
```
         `ref` `=`

```
config.ref;
```
         `key` `=`

```
config.key;
```
         `delete`

```
config.ref;
```
         `delete`

```
config.key;
```
     `}`
    `let` `props` `=` `{`

```
...config
```

 `};`
    `if`

```
(arguments.length
```

 `\>`

```
3)
```

 `{`

```
props.children
```

 `=`

```
Array.prototype.slice.call(arguments,
```

```
2).map(wrapToVdom);
```
     `}` `else` `{`

```
props.children
```

 `=`

```
wrapToVdom(children);//children
```

可能是`React`元素对象，也可能是一个字符串 数字 `null` `undefined`
    `}`
    `return` `{`

```
type,
```

```
ref,
```

```
key,
```

 `props`

```
};
}
//
```

 转换文本或数字为特殊的

```
vdom
export
```

 `function`

```
wrapToVdom(element)
```

 `{`
  `return` `typeof` `element` `===` `"string"` `||` `typeof` `element` `===` `"number"`
    `?` `{` `type:`

```
REACT_TEXT,
```

 `props:` `{` `content:` `element` `}` `}`
    `:`

```
element;
}
```
 这里没有处理`null`，`undefined`，布尔值的情况；

然后我们在`render`中调用了`mount`方法：
`function`

```
render(vdom,
```

```
container)
```

 `{`

```
mount(vdom,
```

```
container);
}
```

在`mount`方法中，我们主要是：

- 使用`vdom`创建一个真实`dom`；
- 然后操作`dom`，把这个真实`dom`，挂载到容器中：

`export` `function`

```
mount(vdom,
```

```
container)
```

 `{`
  `let` `newDOM` `=`

```
createDOM(vdom);
```

```
container.appendChild(newDOM);
}
```

我们创建真实`dom`要调用`createDOM`方法，这个方法比较重要：

- 它会判断`vdom`的`type`，根据类型的不同，调用不出的函数来创建出真实`dom`；
- 其中`type`有几个重要类型：
    - 一是字符串，这是原生`dom`；
    - 一是普通对象，这个对象上我们会加上`$$typeof`来分别出这些对象的区别，判断是使用`type&&type.$$typeof`；
    - 另外是函数类型，这是还是区分是类组件还是函数组件；

先创建要节点的`dom`，然后处理`children`，如果`children`是单个对象，就直接`mount`这个对象到父元素即可，也就是以这个对象创建新`dom`，然后挂载到父元素即可；
如果`children`是数组，也简单，循环这个数组，然后把每一个元素挂载到父元素上；
思考，能不能先创建所有好子`dom`，然后一起挂载；
`export` `function`

```
createDOM(vdom)
```

 `{`
  `if`

```
(!vdom)
```

 `return`

```
null;
```
   `let` `{`

```
type,
```

 `props` `}` `=`

```
vdom;
```
   `let`

```
dom;//
```

真实`DOM`
  `if`

```
(type
```

 `===`

```
REACT_TEXT)
```

```
{//
```

如果这个元素是一个文本的话
    `dom` `=`

```
document.createTextNode(props.content);
```
   `}` `else` `{`
    `dom` `=`

```
document.createElement(type);//
```

 `div` `span` `p`
  `}`
  `//`处理属性
  `if`

```
(props)
```

 `{`

```
updateProps(dom,
```

 `{},`

```
props);
```
     `//` 处理`children`
    `if`

```
(props.children)
```

 `{`
      `let` `children` `=`

```
props.children;
```
       `if`

```
(typeof
```

 `children` `===` `'object'` `&&`

```
children.type)
```

 `{`
        `//`说明这是一个`React`元素

```
mount(children,
```

```
dom);
```
       `}` `else` `if`

```
(Array.isArray(children))
```

 `{`

```
reconcileChildren(props.children,
```

```
dom);
```
       `}`
    `}`
  `}`
  `//`让虚拟`DOM`的`dom`属性指向这个虚拟`DOM`对应的真实`DOM`

```
vdom.dom
```

 `=`

```
dom;
```
   `return`

```
dom;
}
```

`function`

```
updateProps(dom,
```

```
oldProps,
```

```
newProps)
```

 `{`
  `for`

```
(let
```

 `key` `in`

```
newProps)
```

 `{`
    `if`

```
(key
```

 `===`

```
"children")
```

 `{`

```
continue;
```
     `}`
    `//` 处理`style`
    `if`

```
(key
```

 `===`

```
"style")
```

 `{`
      `let` `style` `=`

```
newProps[key];
```
       `for`

```
(let
```

 `attr` `in`

```
style)
```

 `{`

```
dom.style[attr]
```

 `=`

```
style[attr];
```
       `}`
    `}` `else` `{`

```
dom[key]
```

 `=`

```
newProps[key];
```
     `}`

```
}
}
```

`function`

```
reconcileChildren(childrenVdom,
```

```
parentDOM)
```

 `{`
  `for`

```
(let
```

 `i` `=`

```
0;
```

 `i` `\<`

```
childrenVdom.length;
```

```
i++)
```

 `{`
    `let` `childVdom` `=`

```
childrenVdom[i];
```

```
mount(childVdom,
```

```
parentDOM);
```

```
}
}
```

:::
