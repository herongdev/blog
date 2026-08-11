---
title: "React.createRef()"
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
description: "概述： 引用（ Refs ）提供了一个获得 DOM 节点或者创建在 render 方法中的 React 元素的方法； 在典型的 React 数据流中， props 是唯一的父组件与它们的子元素的通信方式。更改子元素，你需要使用新的 props 去重新渲染子元素。但是在一些情况下你。"
sidebarWeight: 33
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/概念/Refs and the DOM/React.createRef().md"
---
::: v-pre

# React.createRef()

> 本节目标：理解“React.createRef()”的核心思路，并能把它用于实际开发或面试表达。
**概述：**
    引用（`Refs`）提供了一个获得`DOM`节点或者创建在`render`方法中的`React`元素的方法；
    在典型的`React`数据流中，`props`是唯一的父组件与它们的子元素的通信方式。更改子元素，你需要使用新的`props`去重新渲染子元素。但是在一些情况下你现在典型数据流之外强制的更改元素。被更改的子元素可能是一个`React`组件的实例，或者是一个`DOM`元素。对所有这些情况，`React`提供了一种特殊方法：`Refs`；
**（一）什么时候使用**`Refs`**：**

- 管理焦点、文本选择、媒体回放
- 触发必要动画；
- 整合第三方`DOM`库

    避免对任何可以声明式解决的问题使用`Refs`；（比如相对于暴露一个对话框组件的`open()`、`close()`方法，请使用`isOpen prop`！）
**（二）不要过度使用**`Refs`**！**
    你的第一个倾向可能是使用`Refs`去实现一些`APP`中的东西。在这种情况下，请停下来，仔细想想`state`应该存在的组件层次。经常地，我们都知道应该由更高的层次去拥有`state`。
**（三）创建**`Refs`**：**
    可以通过`React.createRef()`创建`Refs`并通过`ref`属性联系到`React`组件。`Refs`通常当组件被创建时被分配给实例变量，这样它们就能在组件中被引用。

```
class MyComponent extends React.Component {
constructor(props) {
super(props);
this.myRef = React.createRef();
}
render() {
return <div ref={this.myRef} />;
}
}
```
 **（四）访问**`Refs`**：**
    当一个`ref`通过`render`放入一个元素中，一个对节点的引用可以通过`ref`的`current`属性得到；

```
const node = this.myRef.current;
```
     `ref`的值根据节点类型的不同而不同：

-     当`ref`属性用于`HTML`元素，在构造器中通过`React.createRef()`函数创建的`ref`接收底层`DOM`元素作为它的`current`属性；
-     当`ref`属性用于传统的类组件，`ref`对象接收挂载好的组件实例作为它的`current`；
-     你不能将`ref`属性用于函数式组件上，因为他们并没有实例（`instance`）！

    下面是对应于不同`ref`的例子
`1`**）**`DOM`**元素：**

```
class CustomTextInput extends React.Component {
constructor(props) {
super(props);
//
```

_创建一个_`ref`_去储存_`textInput DOM`_元素_

```
this.textInput = React.createRef();
this.focusTextInput = this.focusTextInput.bind(this);
}
focusTextInput() {
//
```

_很明显的，让_`text input`_获得焦点使用了原生的_

```
DOM API
//
```

_注意：我们通过_`current`_去获得_`DOM`_节点_

```
this.textInput.current.focus();
}
render() {
//
```

_告诉_`React`_我们想要将_`\<input\>`_的_`ref`_和构造器中创建的_`textInput`_联系起来_

```
return (
<div>
<input
type="text"
ref={this.textInput} />
<input
type="button"
value="Focus the text input"
onClick={this.focusTextInput}
/>
</div>
);
}
}
```
    `React`将会将会在组件挂载时将`DOM`元素分配给`current`属性，并且在组件被卸载时，将`current`属性重置为`null`。`ref`将会在`componentDidMount`和`componentDidUpdate`生命周期钩子前被更新
`2`**）类组件：**
    如果我们想要包装上面的`CustomTextInput`，模仿挂载后被点击。我们可以通过`ref`得到自定义的`Input`组件，手动调用它的`focusTextInput`函数。（注意！只有当`CustomTextInput`被声明为类的时候才有用！）

```
class AutoFocusTextInput extends React.Component {
constructor(props) {
super(props);
this.textInput = React.createRef();
}
componentDidMount() {
this.textInput.current.focusTextInput();
}
render() {
return (
<CustomTextInput ref={this.textInput} />
);
}
}
3
```

**）函数式组件（没有用的！）**

```
function MyFunctionalComponent() {
return <input />;
}
class Parent extends React.Component {
constructor(props) {
super(props);
this.textInput = React.createRef();
}
render() {
//
```

==这样没用！函数式组件根本就没有实例！==

```
return (
<MyFunctionalComponent ref={this.textInput} />
);
}
}
```
 但是，你可以在函数式组件中使用`ref`属性，就像你引用`DOM`元素和类组件一样。

```
function CustomTextInput(props) {
// textInput
```

_必须被声明在这里——_`ref`_才能适用于它_

```
let textInput = React.createRef();
function handleClick() {
textInput.current.focus();
}
return (
<div>
<input
type="text"
ref={textInput} />
<input
type="button"
value="Focus the text input"
onClick={handleClick}
/>
</div>
);
}
```

**（五）向父组件暴露**`DOM`**引用（**`Refs`**）**
    在很罕见的情况下，你也许想要从父组件访问到子元素的`DOM`节点。通常来说我们不建议这样做，因为这样破坏了组件的封装性，但是在某些情况下对于类似：触发聚焦、改变子元素`DOM`节点的大小、位置等情况非常有用。
    你可以向子组件增加`ref`（就像上面说的），但是这并不是一个完美的解决方案——你只会获得一个组件实例而不是`DOM`节点。更糟糕的是，它对函数式组件没用！
    如果你使用`React 16.3`或者更高的版本，我们建议你在这些情况下使用

```
ref forwarding
```

，`Ref fprwarding`让组件可以选择去暴露子组件的`ref`作为他们自己的。你可以在

```
ref forwarding
```

文档中找到更全面的例子——怎样暴露子元素的`DOM`节点给父元素。
    如果你使用`React 16.2`或者更低的版本，或者你需要比`ref forwarding`所能提供的更多的灵活性。你可以使用[替代方法](https://gist.github.com/gaearon/1a018a023347fe1c2476073330cc5509)，并且显式的传入一个`ref`当做一个不同命名的`prop`。
    如果可能，我们不建议暴露`DOM`节点，但是在一些情况下还是非常有用的。注意，这种方法需要你去在子组件中增加一些代码，如果你完全没有对于子组件实现的控制，你最后的选择是使用

```
findDOMNode()
```

方法，当然，也只能这样了。
**（六）回调**`Refs`
    `React`同样支持另一种名为“回调`refs`”的方法去设置`refs`——它可以给我们对`refs`创建和销毁更细粒度的控制。
    放入一个函数，而不是一个由`createRef()`创建的`ref`属性。这个函数接受`React`组件实例、或者`HTML DOM`元素作为参数——可以被储存并且在其他地方被访问。
    下面的例子实现了一个通常的模式：使用`ref`回调储存一个`DOM`节点的应用在实例变量中：

```
class CustomTextInput extends React.Component {
constructor(props) {
super(props);
this.textInput = null;
this.setTextInputRef = element => {
this.textInput = element;
};
this.focusTextInput = () => {
//
```

_通过原生_`DOM API`_聚焦文本_

```
if (this.textInput) this.textInput.focus();
};
}
componentDidMount() {
//
```

_在挂载时自动聚焦_

```
this.focusTextInput();
}
render() {
//
```

_使用_`'ref'`_回调去在一个实例域中储存文本输入_`DOM`_元素的引用_`(`_比如_

```
, this.textInput).
return (
<div>
<input
type="text"
ref={this.setTextInputRef}
/>
<input
type="button"
value="Focus the text input"
onClick={this.focusTextInput}
/>
</div>
);
}
}
```
    `React`将会在组件挂载时使用`DOM`元素调用`ref`回调，在组件卸载时使用`null`调用`ref`回调。`ref`回调都会在`componentDidMount`或者`componentDidUpdate`生命周期钩子之前被调用。
    你可以在组件之间传递回调`refs`，就像你可以对通过`React.createRef()`创建的对象`refs`一样：

```
function CustomTextInput(props) {
return (
<div>
<input ref={props.inputRef} />
</div>
);
}
class Parent extends React.Component {
render() {
return (
<CustomTextInput
inputRef={el => this.inputElement = el}
/>
);
}
}
```
     在上面的例子中，`Parent`组件将他的`ref`回调作为`inputRef`这个属性（`props`）传入`CustomTextInput`组件，接着`CustomTextInput`组件将同样的函数作为一个特殊的`ref`属性（`attribute`）传给`\<input\>`。从结果来看，`Parent`组件中的`this.inputElement`将会被放在与在`CustomTextInput`组件的`\<input\>`元素相关的`DOM`节点中。
**（七）历史遗留的**`API`**：字符串**`Refs`
    不用管，以后都要移除（见到`this.refs.textInput`的形式，就使用`React.createRef()`或者回调模式代替）。
**（八）关于回调**`refs`**的警告**
    如果`ref`回调被定义为一个行内函数，当组件更新时会被调用两次——第一次被`null`调用、而后被`DOM`元素调用。这是因为函数的新实例会在每次渲染的时候创建，所以`React`需要清除老的`ref`然后生成一个新的。你可以通过在`class`中定义一个绑定的`ref`回调方法避免这个问题，但是注意，这种问题在大多数情况下都没什么影响`~`
 \> 来自

```
 <https://blog.csdn.net/weixin_33971977/article/details/86027673>
```

:::
