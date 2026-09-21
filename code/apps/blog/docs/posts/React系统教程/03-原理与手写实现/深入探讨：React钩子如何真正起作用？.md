---
title: "深入探讨：React钩子如何真正起作用？"
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
description: "\\ 来自。"
sidebarWeight: 20
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/原理 2/深入探讨：React钩子如何真正起作用？.md"
---
::: v-pre

# 深入探讨：React钩子如何真正起作用？

> 本节目标：理解“深入探讨：React钩子如何真正起作用？”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
```
_作者的注释：本文已__变成演讲__，具有更多上下文。另外，本文也没有提及__React__调度程序__或__状态如何实际存储在__React__中__。_
[挂钩](https://reactjs.org/hooks)是从根本上更简单的方法，用于将状态行为和副作用封装在用户界面中。它们[最初是在](https://www.youtube.com/watch?v=dpw9EHDh2bM)React中引入的，并已被[Vue](https://css-tricks.com/what-hooks-mean-for-vue/)，[Svelte](https://twitter.com/Rich_Harris/status/1093260097558581250)等其他框架广泛采用，甚至适用于[通用功能](https://github.com/getify/TNG-Hooks)JS。但是，它们的功能设计需要对JavaScript中的闭包有充分的了解。
在本文中，我们通过构建一个很小的React Hooks克隆来重新介绍闭包。这有两个目的-演示闭包的有效使用，并展示如何仅用29行可读JS构建Hooks克隆。最后，我们得出“自定义挂钩”是如何自然产生的。
_Note️__注意：您无需执行任何操作即可了解__Hooks__。__如果您进行此练习，则可能仅对您的__JS__基础有所帮助。不用担心，这并不难！_
什么是封包？
使用钩子的[许多卖点](https://reactjs.org/docs/hooks-intro.html#classes-confuse-both-people-and-machines)之一是完全避免类和高阶组件的复杂性。但是，有了钩子，有些人觉得我们可能已经将一个问题换成另一个。现在我们[不必担心绑定上下文](https://overreacted.io/how-are-function-components-different-from-classes/)，而[不必](https://overreacted.io/how-are-function-components-different-from-classes/)[担心闭包](https://overreacted.io/making-setinterval-declarative-with-react-hooks/)。正如[Mark Dalgleish](https://twitter.com/markdalgleish/status/1095025468367990784)令人难忘的总结：
```

```
闭包是JS中的基本概念。尽管如此，他们还是因为与许多特别新的开发人员混淆而臭名昭著。“ [您不知道](https://github.com/getify/You-Dont-Know-JS/blob/master/scope%20%26%20closures/ch5.md)JS”一词的Kyle Simpson 将闭包定义为：
_闭包是指某个函数能够记住并访问其词法范围，即使该函数在其词法范围之外执行。_
它们显然与词法作用域的概念紧密相关，该词法作用域[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)定义为“函数嵌套时解析器如何解析变量名”。让我们看一个实际的例子，以更好地说明这一点：
==// Example 0========function== ==useState====(====initialValue====) {======  ==var== ==_val = initialValue== ==// _val is a local variable created by useState======  ==function== ==state====() {======    ==// state is an inner function, a closure======    ==return== ==_val== ==// state() uses _val, declared by parent funciton======  ==}======  ==function== ==setState====(====newVal====) {======    ==// same======    ==_val = newVal== ==// setting _val without exposing _val======  ==}======  ==return== ==[====state====,== ==setState====]== ==// exposing functions for external use========}========var== ==[====foo====,== ==setFoo====]== ===== ==useState====(====0====)== ==// using array destructuring========console====.====log====(====foo====())== ==// logs 0 - the initialValue we gave========setFoo====(====1====)== ==// sets _val inside useState's scope========console====.====log====(====foo====())== ==// logs 1 - new initialValue, despite exact same call==
在这里，我们正在创建React的useState钩子的原始副本。在我们的函数中，有2个内部函数，state和setState。state返回_val上面定义的局部变量，并将setState局部变量设置为传递给它的参数（即newVal）。
我们在state这里的实现是一个getter函数，[这不是理想的](https://twitter.com/sebmarkbage/status/1098809296396009472)函数，但是我们将稍作修复。重要的是，借助fooand setFoo，我们能够访问和操纵（也称为“封闭”）内部变量_val。它们保留对useState的作用域的访问权限，该引用称为闭包。在React和其他框架的上下文中，这看起来像状态，这就是状态。
如果您想更深入地研究闭包，建议阅读有关该主题的[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)，[YDKJS](https://github.com/getify/You-Dont-Know-JS/blob/master/scope%20%26%20closures/ch5.md)和[DailyJS](https://medium.com/dailyjs/i-never-understood-javascript-closures-9663703368e8)，但是如果您了解上面的代码示例，则将拥有所需的一切。
功能组件中的用法
让我们将新铸造的useState克隆应用到外观熟悉的环境中。我们将组成一个Counter组件！
==// Example 1========function== ==Counter====() {======  ==const== ==[====count====,== ==setCount====]== ===== ==useState====(====0====)== ==// same useState as above======  ==return== =={======    ==click====: ()== ===>== ==setCount====(====count====()== ==+== ==1====),======    ==render====: ()== ===> console====.====log====(===='render:'====, {== ==count====:== ==count====() })======  ==}========}========const== ==C === ==Counter====()========C====.====render====()== ==// render: { count: 0 }========C====.====click====()========C====.====render====()== ==// render: { count: 1 }==
在这里，我们选择呈现状态，而不是呈现给DOM console.log。我们还将为Counter公开一个程序化API，以便我们可以在脚本中运行它而不是附加事件处理程序。通过这种设计，我们能够模拟我们的组件渲染并响应用户操作。
尽管这可行，但调用getter来访问状态并不是真正的React.useState钩子的API 。让我们修复它。
关闭过时
如果我们想匹配真实的React API，我们的状态必须是变量而不是函数。如果我们只是公开_val而不是将其包装在函数中，则会遇到一个错误：
==// Example 0, revisited - this is BUGGY!========function== ==useState====(====initialValue====) {======  ==var== ==_val = initialValue======  ==// no state() function======  ==function== ==setState====(====newVal====) {======    ==_val = newVal======  ==}======  ==return== ==[====_val====,== ==setState====]== ==// directly exposing _val========}========var== ==[====foo====,== ==setFoo====]== ===== ==useState====(====0====)========console====.====log====(====foo====)== ==// logs 0 without needing function call========setFoo====(====1====)== ==// sets _val inside useState's scope========console====.====log====(====foo====)== ==// logs 0 - oops!!==
这是陈旧关闭问题的一种形式。当我们foo从的输出中解构时useState，它指_val的是初始useState调用中的as …再也不会更改了！这不是我们想要的；我们通常需要组件状态来反映_当前_状态，而只是一个变量而不是函数调用！这两个目标似乎截然相反。
模块封闭
我们可以useState通过以下方法解决难题：将我们的封闭件移到另一个封闭件中！（_Yo__，我听说你喜欢关闭……_）
==// Example 2========const== ==MyReact === ==(====function====() {======  ==let== ==_val== ==// hold our state in module scope======  ==return== =={======    ==render====(====Component====) {======      ==const== ==Comp === ==Component====()======      ==Comp====.====render====()======      ==return== ==Comp======    ==},======    ==useState====(====initialValue====) {======      ==_val = _val || initialValue== ==// assign anew every run======      ==function== ==setState====(====newVal====) {======        ==_val = newVal======      ==}======      ==return== ==[====_val====,== ==setState====]======    ==}======  ==}========})()==
在这里，我们选择使用[Module](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript)模式来制作我们的微型React克隆。像React一样，它跟踪组件状态（在我们的示例中，它仅跟踪状态为的一个组件_val）。这种设计允许MyReact“呈现”您的功能组件，从而允许它_val每次使用正确的闭包来分配内部值：
==// Example 2 continued========function== ==Counter====() {======  ==const== ==[====count====,== ==setCount====]== === MyReact====.====useState====(====0====)======  ==return== =={======    ==click====: ()== ===>== ==setCount====(====count +== ==1====),======    ==render====: ()== ===> console====.====log====(===='render:'====, {== ==count== ==})======  ==}========}========let== ==App========App = MyReact====.====render====(====Counter====)== ==// render: { count: 0 }========App====.====click====()========App = MyReact====.====render====(====Counter====)== ==// render: { count: 1 }==
现在，这看起来更像是React with Hooks！
您可以[在](https://github.com/getify/You-Dont-Know-JS/blob/master/scope%20%26%20closures/ch5.md#modules)YDKJS中阅读有关Module模式和闭包的更多信息。
复制中 useEffect
到目前为止，我们已经介绍了useState，这是第一个基本的React Hook。下一个最重要的挂钩是[useEffect](https://reactjs.org/docs/hooks-effect.html)。不同于setState，useEffect它是异步执行的，这意味着有更多机会遇到闭包问题。
我们可以扩展到目前为止已经建立的React微型模型，以包括以下内容：
==// Example 3========const== ==MyReact === ==(====function====() {======  ==let== ==_val====,== ==_deps== ==// hold our state and dependencies in scope======  ==return== =={======    ==render====(====Component====) {======      ==const== ==Comp === ==Component====()======      ==Comp====.====render====()======      ==return== ==Comp======    ==},======    ==useEffect====(====callback====,== ==depArray====) {======      ==const== ==hasNoDeps = !depArray======      ==const== ==hasChangedDeps = _deps ? !depArray====.====every====((====el====,== ==i====)== ===> el === _deps====[====i====]) :== ==true======      ==if== ==(====hasNoDeps || hasChangedDeps====) {======        ==callback====()======        ==_deps = depArray======      ==}======    ==},======    ==useState====(====initialValue====) {======      ==_val = _val || initialValue======      ==function== ==setState====(====newVal====) {======        ==_val = newVal======      ==}======      ==return== ==[====_val====,== ==setState====]======    ==}======  ==}========})()==
==// usage========function== ==Counter====() {======  ==const== ==[====count====,== ==setCount====]== === MyReact====.====useState====(====0====)======  ==MyReact====.====useEffect====(()== ===>== =={======    ==console====.====log====(===='effect'====,== ==count====)======  ==}, [====count====])======  ==return== =={======    ==click====: ()== ===>== ==setCount====(====count +== ==1====),======    ==noop====: ()== ===>== ==setCount====(====count====),======    ==render====: ()== ===> console====.====log====(===='render'====, {== ==count== ==})======  ==}========}========let== ==App========App = MyReact====.====render====(====Counter====)========// effect 0========// render {count: 0}========App====.====click====()========App = MyReact====.====render====(====Counter====)========// effect 1========// render {count: 1}========App====.====noop====()========App = MyReact====.====render====(====Counter====)========// // no effect run========// render {count: 1}========App====.====click====()========App = MyReact====.====render====(====Counter====)========// effect 2========// render {count: 2}==
为了跟踪依赖关系（因为useEffect依赖关系发生更改后会重新运行），我们引入了另一个变量track _deps。
不是魔术，只是数组
我们对useState和useEffect功能进行了很好的克隆，但两者均实现不良，导致[单例](https://en.wikipedia.org/wiki/Singleton_pattern)（每个中只有一个可以存在或发生错误）。为了做任何有趣的事情（并使最后一个过时的关闭示例成为可能），我们需要将它们概括为任意数量的状态和效果。幸运的是，正如[Rudi Yardley](https://medium.com/@ryardley/react-hooks-not-magic-just-arrays-cd4f1857236e)所写的那样，React Hooks不是魔术，而是数组。因此，我们将得到一个hooks数组。我们也将借此机会崩溃都_val和_deps到我们hooks，因为他们从来没有重叠排列：
==// Example 4========const== ==MyReact === ==(====function====() {======  ==let== ==hooks === ==[],======    ==currentHook === ==0== ==// array of hooks, and an iterator!======  ==return== =={======    ==render====(====Component====) {======      ==const== ==Comp === ==Component====()== ==// run effects======      ==Comp====.====render====()======      ==currentHook === ==0== ==// reset for next render======      ==return== ==Comp======    ==},======    ==useEffect====(====callback====,== ==depArray====) {======      ==const== ==hasNoDeps = !depArray======      ==const== ==deps = hooks====[====currentHook====]== ==// type: array | undefined======      ==const== ==hasChangedDeps = deps ? !depArray====.====every====((====el====,== ==i====)== ===> el === deps====[====i====]) :== ==true======      ==if== ==(====hasNoDeps || hasChangedDeps====) {======        ==callback====()======        ==hooks====[====currentHook====]== === depArray======      ==}======      ==currentHook++== ==// done with this hook======    ==},======    ==useState====(====initialValue====) {======      ==hooks====[====currentHook====]== === hooks====[====currentHook====]== ==|| initialValue== ==// type: any======      ==const== ==setStateHookIndex = currentHook== ==// for setState's closure!======      ==const== ==setState = newState =>== ==(====hooks====[====setStateHookIndex====]== === newState====)======      ==return== ==[====hooks====[====currentHook++====],== ==setState====]======    ==}======  ==}========})()==
请注意我们在setStateHookIndex这里的用法，这似乎没有任何作用，但可用于防止setState关闭currentHook变量！如果您将其取出，则setState由于已关闭currentHook而过时，因此再次停止工作。（试试吧！）
==// Example 4 continued - in usage========function== ==Counter====() {======  ==const== ==[====count====,== ==setCount====]== === MyReact====.====useState====(====0====)======  ==const== ==[====text====,== ==setText====]== === MyReact====.====useState====(===='foo'====)== ==// 2nd state hook!======  ==MyReact====.====useEffect====(()== ===>== =={======    ==console====.====log====(===='effect'====,== ==count====,== ==text====)======  ==}, [====count====,== ==text====])======  ==return== =={======    ==click====: ()== ===>== ==setCount====(====count +== ==1====),======    ==type====:== ==txt =>== ==setText====(====txt====),======    ==noop====: ()== ===>== ==setCount====(====count====),======    ==render====: ()== ===> console====.====log====(===='render'====, {== ==count====,== ==text== ==})======  ==}========}========let== ==App========App = MyReact====.====render====(====Counter====)========// effect 0 foo========// render {count: 0, text: 'foo'}========App====.====click====()========App = MyReact====.====render====(====Counter====)========// effect 1 foo========// render {count: 1, text: 'foo'}========App====.====type====(===='bar'====)========App = MyReact====.====render====(====Counter====)========// effect 1 bar========// render {count: 1, text: 'bar'}========App====.====noop====()========App = MyReact====.====render====(====Counter====)========// // no effect run========// render {count: 1, text: 'bar'}========App====.====click====()========App = MyReact====.====render====(====Counter====)========// effect 2 bar========// render {count: 2, text: 'bar'}==
因此，基本直觉是具有一个数组hooks和一个索引，该索引在调用每个挂钩时才递增，并在呈现组件时重置。
您还可以免费获得[自定义的挂钩](https://reactjs.org/docs/hooks-custom.html)：
==// Example 4, revisited========function== ==Component====() {======  ==const== ==[====text====,== ==setText====]== ===== ==useSplitURL====(===='www.netlify.com'====)======  ==return== =={======    ==type====:== ==txt =>== ==setText====(====txt====),======    ==render====: ()== ===> console====.====log====({== ==text== ==})======  ==}========}========function== ==useSplitURL====(====str====) {======  ==const== ==[====text====,== ==setText====]== === MyReact====.====useState====(====str====)======  ==const== ==masked = text====.====split====(===='.'====)======  ==return== ==[====masked====,== ==setText====]========}========let== ==App========App = MyReact====.====render====(====Component====)========// { text: [ 'www', 'netlify', 'com' ] }========App====.====type====(===='www.reactjs.org'====)========App = MyReact====.====render====(====Component====)========// { text: [ 'www', 'reactjs', 'org' ] }}==
**这确实构成了“非魔术”钩子的基础** -自定义钩子完全脱离了框架提供的原语-无论是React还是我们一直在构建的微小克隆。
导出挂钩规则
请注意，从这里您可以轻松理解“挂勾[规则”](https://reactjs.org/docs/hooks-rules.html)的第一个：[仅在顶层调用“挂勾”](https://reactjs.org/docs/hooks-rules.html#only-call-hooks-at-the-top-level)。我们已经使用currentHook变量显式地建模了React对调用顺序的依赖。您可以在牢记我们实施的基础上通读[完整的规则说明](https://reactjs.org/docs/hooks-rules.html#explanation)，并充分了解发生的一切。
还要注意，第二条规则“ [仅来自](https://reactjs.org/docs/hooks-rules.html#only-call-hooks-from-react-functions)React函数的调用挂钩 ”也不是我们实现的必要结果，但是明确划分代码的哪些部分依赖于状态逻辑无疑是一种好习惯。（作为一个很好的副作用，它也使编写工具以确保您遵循第一个规则变得更加容易。通过将有状态的函数（如常规JavaScript函数）包装在循环和条件中，您不会无意间陷入僵局。规则2可帮助您遵循规则1。）
结论
在这一点上，我们可能已经将练习尽可能地扩展了。您可以尝试将[useRef](https://www.reddit.com/r/reactjs/comments/aufijk/useref_is_basically_usestatecurrent_initialvalue_0/)作为单行实现，或者[使](https://www.npmjs.com/package/vdom)render函数实际上采用JSX并安装到DOM，或者在这个28行的React Hooks小型克隆中省略的其他重要细节。但是希望您已经获得了在上下文中使用闭包的经验，并且获得了一个有用的思维模型来揭露React Hooks的工作原理。
_我要感谢__Dan Abramov__和__Divya Sasidharan__审阅了此测定的早期草案并通过他们的宝贵反馈对其进行了改进。所有剩余的错误都是我的。_
```
 \> 来自

```
 <https://www.netlify.com/blog/2019/03/11/deep-dive-how-do-react-hooks-really-work/>
```

:::
