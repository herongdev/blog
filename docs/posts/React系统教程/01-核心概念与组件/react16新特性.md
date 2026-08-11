---
title: "react16新特性"
date: 2026-08-11
categories:
  - "React 系统教程"
tags:
  - "React"
  - "Redux"
  - "前端"
  - "教程"
  - "OneNote"
  - "核心概念与组件"
description: "2、Error Boundary（错误边界） \\<ErrorBoundary\\ \\<BuggyCounter /\\ \\</ErrorBoundary\\ 包裹在组件外，组件出错，可以抛出异常，但是不会让页面白屏。 3、createPortal ReactDOM.createPort。"
sidebarWeight: 9
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/新特性/react16新特性.md"
---
::: v-pre

# react16新特性

> 本节目标：理解“react16新特性”的核心思路，并能把它用于实际开发或面试表达。
```
这里将列出react16所有新特性。我觉得重要的：
1、render 支持返回数组和字符串；
2、新生命周期getDerivedStateFromProps，getSnapshotBeforeUpate；
3、createPortal，modal传送到任意位置；
4、新增指针事件
5、给函数式组件加memo，实现性能优化
6、懒加载组件，lazy, suspense
7、react hooks
1、render 支持返回数组和字符串
class Example extends React.Component {  render() {    return [      <div key="1">first element</div>,      <div key="2">second element</div>,    ];  }}
```

2、Error Boundary（错误边界）
\<ErrorBoundary\>   \<BuggyCounter /\>\</ErrorBoundary\>
包裹在组件外，组件出错，可以抛出异常，但是不会让页面白屏。

3、createPortal
ReactDOM.createPortal(      // Any valid React child: JSX, strings, arrays, etc.      this.props.children,      // A DOM element      this.el,  )
传送门，通过createPortal生成的组件，可以任意定义你需要放的位置。比如弹框放在body上面，就可以document.body..appendChild(this.el)。

4、自定义属性
ReactDOM.render(  \<h1 custom="hello"\>Hello, world!\</h1\>,  document.getElementById("root"));
custom就是自定义的属性，以前的有白名单的，自定义就抛错。

```
5、优化SSR
```

```
生成更简洁的HTML
```

```
宽松的客户端一致性校验
```

```
无需提前编译
```

```
react 16服务端渲染速度更快
```

```
支持流式渲染
```

6、Fiber：react对于对比更新的一种新算法，它影响着生命周期函数的变化跟异步渲染。[学习地址](https://links.jianshu.com/go?to=http%3A%2F%2Flink.zhihu.com%2F%3Ftarget%3Dhttps%253A%2F%2Fwww.youtube.com%2Fwatch%253Fv%253DVLAqywvHpD0)

```
7、 Fragement：可以通过Fragement直接返回多个组件，好处是有时间我们不想用div，但是不得不用导致嵌套过深。
render() { return (    <>      <ChildA />      <ChildB />    </>  );}
或者
render() {  return (    <Fragement>      1      <h2>2</h2>    </Fragement>  );}
```

```
8、新的生命周期（新算法导致生命周期更改）
抛弃并兼容：componentWillMount, componentWillReceiveProps,componentWillUpdate
1、getDerivedStateFromProps替换componentWillReceiveProps
2、getSnapshotBeforeUpate替代componentWillUpdate
```

```
9、新的context API：全局变量，不需要向之前一样传递下去
const ThemeContext = React.createContext('light');
class App extends React.Component {  render() { return (      <ThemeContext.Provider value="dark">        <Toolbar />      </ThemeContext.Provider>    );  }}
class Toolbar extends React.Component {  static contextType = ThemeContext;  render() {   return <Button theme={this.context} />;  }}
```

```
10、createRef API：refs扩展
react16之前：
<input type="text" ref={element => this.textInput = element} />
react16：
class MyComponent extends React.Component {  constructor(props) { super(props);
this.inputRef = React.createRef();  }
render() { return <input type="text" ref={this.inputRef} />;  }
componentDidMount() { this.inputRef.current.focus();  }}
```

11、forwardRef API： 父组件需要将自己的引用传给子组件，自行研究吧，个人不喜欢用。

```
12、strictMode component：严格模式用来帮助开发者发现潜在问题的工具
```

```
识别出使用不安全生命周期的组件
```

```
对使用string ref进行告警
```

```
对使用findDOMNode进行告警
```

```
探测某些产生副作用的方法
```

```
对使用弃用context API进行警告
```

```
function ExampleApplication() { return (    <div>      <Header />      <React.StrictMode>        <div>          <ComponentOne />          <ComponentTwo />        </div>      </React.StrictMode>      <Footer />    </div>  );}
```

```
13、新增指针事件（鼠标，触控笔，或者手指触摸）
```

```
onPointerDown
```

```
onPointerMove
```

```
onPointerEnter
```

```
onPointerLeave
```

```
onPointerOver
```

```
onPointerOut
```

```
14、React Profiler：谷歌插件下载即可，可以检测到组件渲染耗时。
```

```
image.png
```

```
15、memo
import React, { memo } from "react";import ReactDOM from "react-dom";
import "./styles.css";
function Demo(props) {  console.log("render");  return <div>{props.name}</div>;}
const Demo1 = memo(function Demo(props) {  console.log("render");  return <div>{props.name}</div>;});
class App extends React.Component {  state = { count: 0 };  handleClick = () => {    this.setState({ count: 1 });  };  render() {    return (      <div className="App">        <h1>Hello Memo</h1>        <button onClick={this.handleClick}>          This is Memo Demo{this.state.count}        </button>        <Demo1 name={"daisy"} />      </div>    );  }}
在你的函数前面加Memo就可以像PureComponent实现shouldComponentUpdate优化渲染功能。
```

```
16、lazy、suspense
<!--import B from "./B";-->
// 需要用到的时候才加载进来，当然还有预加载更好const B = lazy(() => import("./B"));
<Suspense fallback={<div>Loading...</div>}>    <TabPanel>    <B />    </TabPanel> </Suspense>
```

17、简化static contextType，就是不需要包裹consumer，用this.context即可。这个文档需要各位亲好好查查，就是新版context的使用方式，redux的connect原理就是基于它而生。

```
18、static getDerivedStateFromError
class ErrorBoundary extends React.Component {  state = { hasError: false };    static getDerivedStateFromError(error) {    // Update state so the next render will show the fallback UI.    // 更新state所以下次render可以立刻显示fallback UI    return { hasError: true };  }    componentDidCatch(error, info) {    // You can also log the error to an error reporting service    logErrorToMyService(error, info);  }    render() {    if (this.state.hasError) {      // You can render any custom fallback UI      return <h1>Something went wrong.</h1>;    }        return this.props.children;   }
```

```
最牛逼的登场了！！！
19、react hooks：建议好好研究下，我这边只说个大概。
之前class
class Example extends React.Component {  constructor(props) {    super(props);    this.state = {      count: 0    };  }
render() {    return (      <div>        <p>You clicked {this.state.count} times</p>        <button onClick={() => this.setState({ count: this.state.count + 1 })}>          Click me        </button>      </div>    );  }}
hooks
import React, { useState } from 'react';        function Example() {      // count表示预设置参数；setCount表示方法，useState(0)设置初始值0      const [count, setCount] = useState(0);      const [ok, setOk] = useState("yes");
return (        <div>          <p>You clicked {count} times</p>          <button onClick={() => setCount(count + 1)}>            Click me          </button>        </div>      );
```
 \> 来自

```
 <https://www.jianshu.com/p/24ed0bc34c12>
```

:::
