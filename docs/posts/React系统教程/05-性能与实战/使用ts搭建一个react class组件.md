---
title: "使用ts搭建一个react class组件"
date: 2026-08-11
categories:
  - "React 系统教程"
tags:
  - "React"
  - "Redux"
  - "前端"
  - "教程"
  - "OneNote"
  - "性能与实战"
description: "sweetBoy 9126 2020.04.17 16:18 字数 554 阅读 524评论 0喜欢 0 1. 在父组件中给子组件传参在父组件中引入子组件，然后直接传入参数，子组件通过React.Component\\<Iprops\\ ，它里面的第一个泛型参数就是你父组件传来的参数。"
sidebarWeight: 15
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/应用/使用ts搭建一个react class组件.md"
---
::: v-pre

# 使用ts搭建一个react class组件

> 本节目标：理解“使用ts搭建一个react class组件”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
[](https://www.jianshu.com/u/56540ed9f123)

[sweetBoy_9126](https://www.jianshu.com/u/56540ed9f123)
2020.04.17 16:18 字数 554 阅读 524评论 0喜欢 0

1. 在父组件中给子组件传参在父组件中引入子组件，然后直接传入参数，子组件通过React.Component\<Iprops\>，它里面的第一个泛型参数就是你父组件传来的参数
2. App.tsx

import React, \{ Component \} from 'react';import Button from './componets/button'
class App extends Component \{ render() \{ return ( \<div className="App"\> \<Button\>小改改\</Button\> \</div\> ) \}\}

- button.tsx

import React from 'react'import './button.css'interface Iprops \{ size: string\}class Button extends React.Component\<Iprops\>\{ render() \{ return ( \<div className="button"\>\{this.props.children\}\</div\> ) \}\}export default Button

1. 设置组件里的私有属性组件中的私有属性就是React.Component\<\>里面的第二个参数

interface IState \{ n: number\}class Button extends React.Component\<Iprops, IState\>\{ constructor(props: Iprops) \{ super(props) this.state = \{ n: 1 \} \} render() \{ return ( \<div className="button"\> \{this.state.n\} \</div\> ) \}\}

1. 修改react开发者工具里组件的名字

我们现在的组件名字是Button，如果我们想修改它只需要在对应组件中修改它静态资源的displayName
class Button extends React.Component\<Iprops, IState\>\{ static displayName = 'LifaButton'\}

1. 设置组件的props的默认值当我们没有在父组件中传给子组件props时，我们可以在子组件中通过defaultProps来设置它的默认值

class Button extends React.Component\<Iprops, IState\>\{ static defaultProps = \{ size: 'normal' \}\}
问题：在我们不传的时候，我们设置默认值，可能在使用的时候会报错，比如

它会报size有可能是undefined，解决方法强制指定类型为string
this.props.size as string + 1

1. 触发父组件中的点击事件(1). 在子组件中的props对应的接口里定义onClick类型为React.MouseEventHandler(2). 父组件中传入onClick，并声明对应的onClick事件，事件里的event类型指定为React.MouseEvent(3). 子组件里的onClick调用父组件传来的onClick
2. App.tsx

class App extends Component \{ onClick(e: React.MouseEvent) \{ console.log(e) \} render() \{ return ( \<div className="App"\> \<Button onClick=\{this.onClick\}\>哈哈哈小改改\</Button\> \</div\> ) \}\}

- button.tsx

interface Iprops \{ onClick: React.MouseEventHandler\}class Button extends React.Component\<Iprops\> \{ render( \<div className="button" onClick=\{this.props.onClick\}\>\</div\> )\}
问题：
上面的e: React.MouseEvent，我们直接打印出e.target是当前的div标签，div可以设置style，所以我们尝试打印出e.target.style，但是我们发现会报错，因为它认为e.target有可能是undefined。
解决办法：

1. 指定e.target类型为HTMLDIVElement

e.target as HTMLDivElement).style

1. 直接为e指定React.MouseEvent\<HTMLDivElement\>

onClick(e: React.MouseEvent\<HTMLDivElement\>) \{ const div = e.currentTarget console.log(div.style.width) \}

1. this问题，react里默认this是undefined，如果需要对属性进行操作，需要使用箭头函数，或者绑定它的this写法1：

class Button extends React.Component\<Iprops, IState\>\{ static displayName = 'LifaButton' static defaultProps = \{ size: 'normal' \} constructor(props: Iprops) \{ super(props) this.state = \{ n: 1 \} \} // 使用箭头函数让this等于外界的this onClick= ()=\> \{ this.setState(\{ n: this.state.n + 1 \}) \} render() \{ return ( \<div className="button" onClick=\{this.onClick\}\> \{this.props.children\} \{this.state.n\} \</div\> ) \}\}
写法2：
onClick()\{ this.setState(\{ n: this.state.n + 1 \}) \} render() \{ return ( \<div className="button" onClick=\{this.onClick.bind(this)\}\> \{this.props.children\} \{this.state.n\} \</div\> ) \}
总结：

1. React.Compoent\<\>里的第一个参数是props的类型，第二个是state的类型
2. 如果需要绑定click事件，你需要声明onClick类型为React.Mouse(事件类型)EventHandler
3. onClick两种写法：(1). 旧语法加bind this.onClick.bind(this)(2). 直接箭头函数
 \> 来自 \<[https://www.jianshu.com/p/ed9509025699/](https://www.jianshu.com/p/ed9509025699/)\>

:::
