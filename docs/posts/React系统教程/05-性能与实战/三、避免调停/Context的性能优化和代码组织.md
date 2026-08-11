---
title: "Context的性能优化和代码组织"
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
description: "谷歌发布的很多调研精确的展示了性能对于网站留存率的影响； 而代码组织优化则关系到后续的维护成本。 当然，这个优化也一样可以用 React.memo 包裹子组件来做，不过相对的增加维护成本，根据场景权衡选择吧。 当 LogProvider 中的 addLog 被子组件调用，导致 L。"
sidebarWeight: 14
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/应用/三、避免调停 /Context的性能优化和代码组织.md"
---
::: v-pre

# Context的性能优化和代码组织

> 本节目标：理解“Context的性能优化和代码组织”的核心思路，并能把它用于实际开发或面试表达。
谷歌发布的很多调研精确的展示了性能对于网站留存率的影响；
而代码组织优化则关系到后续的维护成本。

```
**神奇的** **children**
我们有一个需求，需要通过 Provider 传递一些主题信息给子组件：
看这样一段代码：
import React, { useContext, useState } from "react";
const ThemeContext = React.createContext();
export function ChildNonTheme() {
    console.log("不关心皮肤的子组件渲染了");
    return <div>我不关心皮肤，皮肤改变的时候别让我重新渲染！</div>;
}
export function ChildWithTheme() {
    const theme = useContext(ThemeContext);
    return <div>我是有皮肤的哦~ {theme}</div>;
}
export default function App() {
    const [theme, setTheme] = useState("light");
    const onChangeTheme = () => setTheme(theme === "light" ? "dark" : "light");
    return (
        <ThemeContext.Provider value={theme}>
            <button onClick={onChangeTheme}>改变皮肤</button>
            <ChildWithTheme />
            <ChildNonTheme />
            <ChildNonTheme />
            <ChildNonTheme />
            <ChildNonTheme />
            <ChildNonTheme />
            <ChildNonTheme />
            <ChildNonTheme />
        </ThemeContext.Provider>
    );
}
ChildNonTheme 这个不关心皮肤的子组件，在皮肤状态更改的时候也进行无效的重新渲染。
这本质上是由于 React 是自上而下递归更新，<ChildNonTheme /> 这样的代码会被 babel 翻译成 React.createElement(ChildNonTheme) 这样的函数调用，React官方经常强调 props 是immutable 的，所以在每次调用函数式组件的时候，都会生成一份新的 props 引用。
```

```
来看下 createElement 的返回结构：
const childNonThemeElement = {
    type: 'ChildNonTheme',
    props: {} // <- 这个引用更新了
}
正是由于这个新的 props 引用，导致 ChildNonTheme 这个组件也重新渲染了。
```

```
那么如何避免这个无效的重新渲染呢？关键词是「巧妙利用 children」。
import React, { useContext, useState } from "react";
const ThemeContext = React.createContext();
function ChildNonTheme() {
    console.log("不关心皮肤的子组件渲染了");
    return <div>我不关心皮肤，皮肤改变的时候别让我重新渲染！</div>;
}
function ChildWithTheme() {
    const theme = useContext(ThemeContext);
    return <div>我是有皮肤的哦~ {theme}</div>;
}
function ThemeApp({ children }) {
    const [theme, setTheme] = useState("light");
    const onChangeTheme = () => setTheme(theme === "light" ? "dark" : "light");
    return (
        <ThemeContext.Provider value={theme}>
            <button onClick={onChangeTheme}>改变皮肤</button>
            {children}
        </ThemeContext.Provider>
    );
}
export default function App() {
    return (
        <ThemeApp>
            <ChildWithTheme />
            <ChildNonTheme />
            <ChildNonTheme />
            <ChildNonTheme />
            <ChildNonTheme />
            <ChildNonTheme />
            <ChildNonTheme />
            <ChildNonTheme />
        </ThemeApp>
    );
}
没错，唯一的区别就是我把控制状态的组件和负责展示的子组件给抽离开了，通过 children 传入后直接渲染，由于 children 从外部传入的，也就是说 ThemeApp 这个组件内部不会再有 React.createElement 这样的代码，那么在 setTheme 触发重新渲染后，children 完全没有改变，所以可以直接复用。
```

```
让我们再看一下被 ThemeApp 包裹下的 <ChildNonTheme />，它会作为 children 传递给 ThemeApp，ThemeApp 内部的更新完全不会触发外部的 React.createElement，所以会直接复用之前的 element 结果：
// 完全复用，props 也不会改变。
const childNonThemeElement = {
    type: ChildNonTheme,
    props: {}
}
在改变皮肤之后，控制台空空如也！优化达成。
总结下来，就是要把渲染比较费时，但是不需要关心状态的子组件提升到「有状态组件」的外部，作为 children 或者props传递进去直接使用，防止被带着一起渲染。
[神奇的](https://codesandbox.io/s/react-shenqidechildren-lfmn0) children - 在线调试地址
```

当然，这个优化也一样可以用 React.memo 包裹子组件来做，不过相对的增加维护成本，根据场景权衡选择吧。

```
**Context** **读写分离**
现在我们有一个全局日志记录的需求，我们想通过 Provider 去做，很快代码就写好了：
import React, { useContext, useState } from "react";
import "./styles.css";
const LogContext = React.createContext();
function LogProvider({ children }) {
    const [logs, setLogs] = useState([]);
    const addLog = (log) => setLogs((prevLogs) => [...prevLogs, log]);
    return (
        <LogContext.Provider value={{ logs, addLog }}>
            {children}
        </LogContext.Provider>
    );
}
function Logger1() {
    const { addLog } = useContext(LogContext);
    console.log("Logger1 render");
    return (
        <>
            <p>一个能发日志的组件1</p>
            <button onClick={() => addLog("logger1")}>发日志</button>
        </>
    );
}
function Logger2() {
    const { addLog } = useContext(LogContext);
    console.log("Logger2 render");
    return (
        <>
            <p>一个能发日志的组件2</p>
            <button onClick={() => addLog("logger2")}>发日志</button>
        </>
    );
}
function LogsPanel() {
    const { logs } = useContext(LogContext);
    console.log("Logger1 render");
    return logs.map((log, index) => <p key={index}>{log}</p>);
}
export default function App() {
    return (
        <LogProvider>
            <div className="app">
                <section>
                    <Logger1 />
                    <Logger2 />
                </section>
                <section>
                    <LogsPanel />
                </section>
            </div>
        </LogProvider>
    );
}
我们已经用上了上一章节的优化小技巧，单独的把 LogProvider 封装起来，并且把子组件提升到外层传入。
先思考一下最佳的情况，Logger 组件只负责发出日志，它是不关心logs的变化的，在任何组件调用 addLog 去写入日志的时候，理想的情况下应该只有 LogsPanel 这个组件发生重新渲染。
但是这样的代码写法却会导致每次任意一个组件写入日志以后，所有的 Logger 和 LogsPanel 都发生重新渲染。
这肯定不是我们预期的，假设在现实场景的代码中，能写日志的组件可多着呢，每次一写入就导致全局的组件都重新渲染？这当然是不能接受的，发生这个问题的本质原因[官网](https://zh-hans.reactjs.org/docs/context.html#contextprovider) Context 的部分已经讲得很清楚了：
```

当 LogProvider 中的 addLog 被子组件调用，导致 LogProvider重渲染之后，必然会导致传递给 Provider 的 value 发生改变，由于 value 包含了 logs 和 setLogs 属性，所以两者中任意一个发生变化，都会导致所有的订阅了 LogProvider 的子组件重新渲染。

```
那么解决办法是什么呢？其实就是**读写分离**，我们把 logs（读）和 setLogs（写）分别通过不同的 Provider 传递，这样负责写入的组件更改了 logs，其他的「写组件」并不会重新渲染，只有真正关心 logs 的「读组件」会重新渲染。
function LogProvider({ children }) {
    const [logs, setLogs] = useState([]);
    const addLog = useCallback((log) => {
        setLogs((prevLogs) => [...prevLogs, log]);
    }, []);
    return (
        <LogDispatcherContext.Provider value={addLog}>
            <LogStateContext.Provider value={logs}>
                {children}
            </LogStateContext.Provider>
        </LogDispatcherContext.Provider>
    );
}
我们刚刚也提到，需要保证 value 的引用不能发生变化，所以这里自然要用 useCallback 把 addLog 方法包裹起来，才能保证 LogProvider 重渲染的时候，传递给的LogDispatcherContext的value 不发生变化。
现在我从任意「写组件」发送日志，都只会让「读组件」LogsPanel 渲染。
[Context](https://codesandbox.io/s/react-genghaodecontext-forked-l20yc) 读写分离 - 在线调试
```

```
**Context** **代码组织**
上面的案例中，我们在子组件中获取全局状态，都是直接裸用 useContext：
import React from 'react'
import { LogStateContext } from './context'
function App() {
    const logs = React.useContext(LogStateContext)
}
// 但是是否有更好的代码组织方法呢？比如这样：
import React from 'react'
import { useLogState } from './context'
function App() {
    const logs = useLogState()
}
// context
import React from 'react'
const LogStateContext = React.createContext();
export function useLogState() {
    return React.useContext(LogStateContext)
}
// 在加上点健壮性保证？
import React from 'react'
const LogStateContext = React.createContext();
const LogDispatcherContext = React.createContext();
export function useLogState() {
    const context = React.useContext(LogStateContext)
    if (context === undefined) {
        throw new Error('useLogState must be used within a LogStateProvider')
    }
    return context
}
export function useLogDispatcher() {
    const context = React.useContext(LogDispatcherContext)
    if (context === undefined) {
        throw new Error('useLogDispatcher must be used within a LogDispatcherContext')
    }
    return context
}
```

```
如果有的组件同时需要读写日志，调用两次很麻烦？
export function useLogs() {
    return [useLogState(), useLogDispatcher()]
}
export function App() {
    const [logs, addLogs] = useLogs()
    // ...
根据场景，灵活运用这些技巧，让你的代码更加健壮优雅~
```

```
**组合** **Providers**
假设我们使用上面的办法管理一些全局的小状态，Provider 变的越来越多了，有时候会遇到嵌套地狱的情况：
const StateProviders = ({ children }) => (
    <LogProvider>
        <UserProvider>
            <MenuProvider>
                <AppProvider>
                    {children}
                </AppProvider>
            </MenuProvider>
        </UserProvider>
    </LogProvider>
)
function App() {
    return (
        <StateProviders>
            <Main />
        </StateProviders>
    )
}
有没有办法解决呢？当然有，我们参考 redux 中的 compose 方法，自己写一个 composeProvider 方法：
function composeProviders(...providers) {
    return ({ children }) =>
        providers.reduce(
            (prev, Provider) => <Provider>{prev}</Provider>,
            children,
        )
}
//   代码就可以简化成这样：
const StateProviders = composeProviders(
    LogProvider,
    UserProvider,
    MenuProvider,
    AppProvider,
)
function App() {
    return (
        <StateProvider>
            <Main />
        </StateProvider>
    )
}
```

**总结**
本篇文章主要围绕这 Context 这个 API，讲了几个性能优化和代码组织的优化点，总结下来就是：

```
尽量提升渲染无关的子组件元素到「有状态组件」的外部。
```

```
在需要的情况下对 Context 进行读写分离。
```

```
包装Context 的使用，注意错误处理。
```

```
组合多个 Context，优化代码。
```

```
欢迎关注「**前端从进阶到入院**」，还有很多前端原创文章哦~
```
 \> 来自

```
 <https://juejin.im/post/6889247428797530126>
```

:::
