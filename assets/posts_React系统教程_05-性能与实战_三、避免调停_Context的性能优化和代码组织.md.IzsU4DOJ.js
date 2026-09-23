import{_ as a,o as e,c as p,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const g=JSON.parse('{"title":"Context的性能优化和代码组织","description":"谷歌发布的很多调研精确的展示了性能对于网站留存率的影响； 而代码组织优化则关系到后续的维护成本。 当然，这个优化也一样可以用 React.memo 包裹子组件来做，不过相对的增加维护成本，根据场景权衡选择吧。 当 LogProvider 中的 addLog 被子组件调用，导致 L。","frontmatter":{"title":"Context的性能优化和代码组织","date":"2026-08-11T00:00:00.000Z","categories":["React 系统教程"],"tags":["React","Redux","前端","教程","OneNote","性能与实战"],"description":"谷歌发布的很多调研精确的展示了性能对于网站留存率的影响； 而代码组织优化则关系到后续的维护成本。 当然，这个优化也一样可以用 React.memo 包裹子组件来做，不过相对的增加维护成本，根据场景权衡选择吧。 当 LogProvider 中的 addLog 被子组件调用，导致 L。","sidebarWeight":14,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/应用/三、避免调停 /Context的性能优化和代码组织.md"},"headers":[],"relativePath":"posts/React系统教程/05-性能与实战/三、避免调停/Context的性能优化和代码组织.md","filePath":"posts/React系统教程/05-性能与实战/三、避免调停/Context的性能优化和代码组织.md"}'),t={name:"posts/React系统教程/05-性能与实战/三、避免调停/Context的性能优化和代码组织.md"};function i(c,l,o,u,r,d){return e(),p("div",null,[...l[0]||(l[0]=[n("div",null,[n("h1",{id:"context的性能优化和代码组织",tabindex:"-1"},[s("Context的性能优化和代码组织 "),n("a",{class:"header-anchor",href:"#context的性能优化和代码组织","aria-label":'Permalink to "Context的性能优化和代码组织"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“Context的性能优化和代码组织”的核心思路，并能把它用于实际开发或面试表达。 谷歌发布的很多调研精确的展示了性能对于网站留存率的影响； 而代码组织优化则关系到后续的维护成本。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**神奇的** **children**")]),s(`
`),n("span",{class:"line"},[n("span",null,"我们有一个需求，需要通过 Provider 传递一些主题信息给子组件：")]),s(`
`),n("span",{class:"line"},[n("span",null,"看这样一段代码：")]),s(`
`),n("span",{class:"line"},[n("span",null,'import React, { useContext, useState } from "react";')]),s(`
`),n("span",{class:"line"},[n("span",null,"const ThemeContext = React.createContext();")]),s(`
`),n("span",{class:"line"},[n("span",null,"export function ChildNonTheme() {")]),s(`
`),n("span",{class:"line"},[n("span",null,'    console.log("不关心皮肤的子组件渲染了");')]),s(`
`),n("span",{class:"line"},[n("span",null,"    return <div>我不关心皮肤，皮肤改变的时候别让我重新渲染！</div>;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"export function ChildWithTheme() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const theme = useContext(ThemeContext);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return <div>我是有皮肤的哦~ {theme}</div>;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"export default function App() {")]),s(`
`),n("span",{class:"line"},[n("span",null,'    const [theme, setTheme] = useState("light");')]),s(`
`),n("span",{class:"line"},[n("span",null,'    const onChangeTheme = () => setTheme(theme === "light" ? "dark" : "light");')]),s(`
`),n("span",{class:"line"},[n("span",null,"    return (")]),s(`
`),n("span",{class:"line"},[n("span",null,"        <ThemeContext.Provider value={theme}>")]),s(`
`),n("span",{class:"line"},[n("span",null,"            <button onClick={onChangeTheme}>改变皮肤</button>")]),s(`
`),n("span",{class:"line"},[n("span",null,"            <ChildWithTheme />")]),s(`
`),n("span",{class:"line"},[n("span",null,"            <ChildNonTheme />")]),s(`
`),n("span",{class:"line"},[n("span",null,"            <ChildNonTheme />")]),s(`
`),n("span",{class:"line"},[n("span",null,"            <ChildNonTheme />")]),s(`
`),n("span",{class:"line"},[n("span",null,"            <ChildNonTheme />")]),s(`
`),n("span",{class:"line"},[n("span",null,"            <ChildNonTheme />")]),s(`
`),n("span",{class:"line"},[n("span",null,"            <ChildNonTheme />")]),s(`
`),n("span",{class:"line"},[n("span",null,"            <ChildNonTheme />")]),s(`
`),n("span",{class:"line"},[n("span",null,"        </ThemeContext.Provider>")]),s(`
`),n("span",{class:"line"},[n("span",null,"    );")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"ChildNonTheme 这个不关心皮肤的子组件，在皮肤状态更改的时候也进行无效的重新渲染。")]),s(`
`),n("span",{class:"line"},[n("span",null,"这本质上是由于 React 是自上而下递归更新，<ChildNonTheme /> 这样的代码会被 babel 翻译成 React.createElement(ChildNonTheme) 这样的函数调用，React官方经常强调 props 是immutable 的，所以在每次调用函数式组件的时候，都会生成一份新的 props 引用。")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"来看下 createElement 的返回结构：")]),s(`
`),n("span",{class:"line"},[n("span",null,"const childNonThemeElement = {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    type: 'ChildNonTheme',")]),s(`
`),n("span",{class:"line"},[n("span",null,"    props: {} // <- 这个引用更新了")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"正是由于这个新的 props 引用，导致 ChildNonTheme 这个组件也重新渲染了。")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"那么如何避免这个无效的重新渲染呢？关键词是「巧妙利用 children」。")]),s(`
`),n("span",{class:"line"},[n("span",null,'import React, { useContext, useState } from "react";')]),s(`
`),n("span",{class:"line"},[n("span",null,"const ThemeContext = React.createContext();")]),s(`
`),n("span",{class:"line"},[n("span",null,"function ChildNonTheme() {")]),s(`
`),n("span",{class:"line"},[n("span",null,'    console.log("不关心皮肤的子组件渲染了");')]),s(`
`),n("span",{class:"line"},[n("span",null,"    return <div>我不关心皮肤，皮肤改变的时候别让我重新渲染！</div>;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"function ChildWithTheme() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const theme = useContext(ThemeContext);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return <div>我是有皮肤的哦~ {theme}</div>;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"function ThemeApp({ children }) {")]),s(`
`),n("span",{class:"line"},[n("span",null,'    const [theme, setTheme] = useState("light");')]),s(`
`),n("span",{class:"line"},[n("span",null,'    const onChangeTheme = () => setTheme(theme === "light" ? "dark" : "light");')]),s(`
`),n("span",{class:"line"},[n("span",null,"    return (")]),s(`
`),n("span",{class:"line"},[n("span",null,"        <ThemeContext.Provider value={theme}>")]),s(`
`),n("span",{class:"line"},[n("span",null,"            <button onClick={onChangeTheme}>改变皮肤</button>")]),s(`
`),n("span",{class:"line"},[n("span",null,"            {children}")]),s(`
`),n("span",{class:"line"},[n("span",null,"        </ThemeContext.Provider>")]),s(`
`),n("span",{class:"line"},[n("span",null,"    );")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"export default function App() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return (")]),s(`
`),n("span",{class:"line"},[n("span",null,"        <ThemeApp>")]),s(`
`),n("span",{class:"line"},[n("span",null,"            <ChildWithTheme />")]),s(`
`),n("span",{class:"line"},[n("span",null,"            <ChildNonTheme />")]),s(`
`),n("span",{class:"line"},[n("span",null,"            <ChildNonTheme />")]),s(`
`),n("span",{class:"line"},[n("span",null,"            <ChildNonTheme />")]),s(`
`),n("span",{class:"line"},[n("span",null,"            <ChildNonTheme />")]),s(`
`),n("span",{class:"line"},[n("span",null,"            <ChildNonTheme />")]),s(`
`),n("span",{class:"line"},[n("span",null,"            <ChildNonTheme />")]),s(`
`),n("span",{class:"line"},[n("span",null,"            <ChildNonTheme />")]),s(`
`),n("span",{class:"line"},[n("span",null,"        </ThemeApp>")]),s(`
`),n("span",{class:"line"},[n("span",null,"    );")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"没错，唯一的区别就是我把控制状态的组件和负责展示的子组件给抽离开了，通过 children 传入后直接渲染，由于 children 从外部传入的，也就是说 ThemeApp 这个组件内部不会再有 React.createElement 这样的代码，那么在 setTheme 触发重新渲染后，children 完全没有改变，所以可以直接复用。")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"让我们再看一下被 ThemeApp 包裹下的 <ChildNonTheme />，它会作为 children 传递给 ThemeApp，ThemeApp 内部的更新完全不会触发外部的 React.createElement，所以会直接复用之前的 element 结果：")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 完全复用，props 也不会改变。")]),s(`
`),n("span",{class:"line"},[n("span",null,"const childNonThemeElement = {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    type: ChildNonTheme,")]),s(`
`),n("span",{class:"line"},[n("span",null,"    props: {}")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"在改变皮肤之后，控制台空空如也！优化达成。")]),s(`
`),n("span",{class:"line"},[n("span",null,"总结下来，就是要把渲染比较费时，但是不需要关心状态的子组件提升到「有状态组件」的外部，作为 children 或者props传递进去直接使用，防止被带着一起渲染。")]),s(`
`),n("span",{class:"line"},[n("span",null,"[神奇的](https://codesandbox.io/s/react-shenqidechildren-lfmn0) children - 在线调试地址")])])])]),n("p",null,"当然，这个优化也一样可以用 React.memo 包裹子组件来做，不过相对的增加维护成本，根据场景权衡选择吧。"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**Context** **读写分离**")]),s(`
`),n("span",{class:"line"},[n("span",null,"现在我们有一个全局日志记录的需求，我们想通过 Provider 去做，很快代码就写好了：")]),s(`
`),n("span",{class:"line"},[n("span",null,'import React, { useContext, useState } from "react";')]),s(`
`),n("span",{class:"line"},[n("span",null,'import "./styles.css";')]),s(`
`),n("span",{class:"line"},[n("span",null,"const LogContext = React.createContext();")]),s(`
`),n("span",{class:"line"},[n("span",null,"function LogProvider({ children }) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const [logs, setLogs] = useState([]);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const addLog = (log) => setLogs((prevLogs) => [...prevLogs, log]);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return (")]),s(`
`),n("span",{class:"line"},[n("span",null,"        <LogContext.Provider value={{ logs, addLog }}>")]),s(`
`),n("span",{class:"line"},[n("span",null,"            {children}")]),s(`
`),n("span",{class:"line"},[n("span",null,"        </LogContext.Provider>")]),s(`
`),n("span",{class:"line"},[n("span",null,"    );")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"function Logger1() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const { addLog } = useContext(LogContext);")]),s(`
`),n("span",{class:"line"},[n("span",null,'    console.log("Logger1 render");')]),s(`
`),n("span",{class:"line"},[n("span",null,"    return (")]),s(`
`),n("span",{class:"line"},[n("span",null,"        <>")]),s(`
`),n("span",{class:"line"},[n("span",null,"            <p>一个能发日志的组件1</p>")]),s(`
`),n("span",{class:"line"},[n("span",null,'            <button onClick={() => addLog("logger1")}>发日志</button>')]),s(`
`),n("span",{class:"line"},[n("span",null,"        </>")]),s(`
`),n("span",{class:"line"},[n("span",null,"    );")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"function Logger2() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const { addLog } = useContext(LogContext);")]),s(`
`),n("span",{class:"line"},[n("span",null,'    console.log("Logger2 render");')]),s(`
`),n("span",{class:"line"},[n("span",null,"    return (")]),s(`
`),n("span",{class:"line"},[n("span",null,"        <>")]),s(`
`),n("span",{class:"line"},[n("span",null,"            <p>一个能发日志的组件2</p>")]),s(`
`),n("span",{class:"line"},[n("span",null,'            <button onClick={() => addLog("logger2")}>发日志</button>')]),s(`
`),n("span",{class:"line"},[n("span",null,"        </>")]),s(`
`),n("span",{class:"line"},[n("span",null,"    );")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"function LogsPanel() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const { logs } = useContext(LogContext);")]),s(`
`),n("span",{class:"line"},[n("span",null,'    console.log("Logger1 render");')]),s(`
`),n("span",{class:"line"},[n("span",null,"    return logs.map((log, index) => <p key={index}>{log}</p>);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"export default function App() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return (")]),s(`
`),n("span",{class:"line"},[n("span",null,"        <LogProvider>")]),s(`
`),n("span",{class:"line"},[n("span",null,'            <div className="app">')]),s(`
`),n("span",{class:"line"},[n("span",null,"                <section>")]),s(`
`),n("span",{class:"line"},[n("span",null,"                    <Logger1 />")]),s(`
`),n("span",{class:"line"},[n("span",null,"                    <Logger2 />")]),s(`
`),n("span",{class:"line"},[n("span",null,"                </section>")]),s(`
`),n("span",{class:"line"},[n("span",null,"                <section>")]),s(`
`),n("span",{class:"line"},[n("span",null,"                    <LogsPanel />")]),s(`
`),n("span",{class:"line"},[n("span",null,"                </section>")]),s(`
`),n("span",{class:"line"},[n("span",null,"            </div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"        </LogProvider>")]),s(`
`),n("span",{class:"line"},[n("span",null,"    );")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"我们已经用上了上一章节的优化小技巧，单独的把 LogProvider 封装起来，并且把子组件提升到外层传入。")]),s(`
`),n("span",{class:"line"},[n("span",null,"先思考一下最佳的情况，Logger 组件只负责发出日志，它是不关心logs的变化的，在任何组件调用 addLog 去写入日志的时候，理想的情况下应该只有 LogsPanel 这个组件发生重新渲染。")]),s(`
`),n("span",{class:"line"},[n("span",null,"但是这样的代码写法却会导致每次任意一个组件写入日志以后，所有的 Logger 和 LogsPanel 都发生重新渲染。")]),s(`
`),n("span",{class:"line"},[n("span",null,"这肯定不是我们预期的，假设在现实场景的代码中，能写日志的组件可多着呢，每次一写入就导致全局的组件都重新渲染？这当然是不能接受的，发生这个问题的本质原因[官网](https://zh-hans.reactjs.org/docs/context.html#contextprovider) Context 的部分已经讲得很清楚了：")])])])]),n("p",null,"当 LogProvider 中的 addLog 被子组件调用，导致 LogProvider重渲染之后，必然会导致传递给 Provider 的 value 发生改变，由于 value 包含了 logs 和 setLogs 属性，所以两者中任意一个发生变化，都会导致所有的订阅了 LogProvider 的子组件重新渲染。"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"那么解决办法是什么呢？其实就是**读写分离**，我们把 logs（读）和 setLogs（写）分别通过不同的 Provider 传递，这样负责写入的组件更改了 logs，其他的「写组件」并不会重新渲染，只有真正关心 logs 的「读组件」会重新渲染。")]),s(`
`),n("span",{class:"line"},[n("span",null,"function LogProvider({ children }) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const [logs, setLogs] = useState([]);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const addLog = useCallback((log) => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        setLogs((prevLogs) => [...prevLogs, log]);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }, []);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return (")]),s(`
`),n("span",{class:"line"},[n("span",null,"        <LogDispatcherContext.Provider value={addLog}>")]),s(`
`),n("span",{class:"line"},[n("span",null,"            <LogStateContext.Provider value={logs}>")]),s(`
`),n("span",{class:"line"},[n("span",null,"                {children}")]),s(`
`),n("span",{class:"line"},[n("span",null,"            </LogStateContext.Provider>")]),s(`
`),n("span",{class:"line"},[n("span",null,"        </LogDispatcherContext.Provider>")]),s(`
`),n("span",{class:"line"},[n("span",null,"    );")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"我们刚刚也提到，需要保证 value 的引用不能发生变化，所以这里自然要用 useCallback 把 addLog 方法包裹起来，才能保证 LogProvider 重渲染的时候，传递给的LogDispatcherContext的value 不发生变化。")]),s(`
`),n("span",{class:"line"},[n("span",null,"现在我从任意「写组件」发送日志，都只会让「读组件」LogsPanel 渲染。")]),s(`
`),n("span",{class:"line"},[n("span",null,"[Context](https://codesandbox.io/s/react-genghaodecontext-forked-l20yc) 读写分离 - 在线调试")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**Context** **代码组织**")]),s(`
`),n("span",{class:"line"},[n("span",null,"上面的案例中，我们在子组件中获取全局状态，都是直接裸用 useContext：")]),s(`
`),n("span",{class:"line"},[n("span",null,"import React from 'react'")]),s(`
`),n("span",{class:"line"},[n("span",null,"import { LogStateContext } from './context'")]),s(`
`),n("span",{class:"line"},[n("span",null,"function App() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const logs = React.useContext(LogStateContext)")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 但是是否有更好的代码组织方法呢？比如这样：")]),s(`
`),n("span",{class:"line"},[n("span",null,"import React from 'react'")]),s(`
`),n("span",{class:"line"},[n("span",null,"import { useLogState } from './context'")]),s(`
`),n("span",{class:"line"},[n("span",null,"function App() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const logs = useLogState()")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"// context")]),s(`
`),n("span",{class:"line"},[n("span",null,"import React from 'react'")]),s(`
`),n("span",{class:"line"},[n("span",null,"const LogStateContext = React.createContext();")]),s(`
`),n("span",{class:"line"},[n("span",null,"export function useLogState() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return React.useContext(LogStateContext)")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 在加上点健壮性保证？")]),s(`
`),n("span",{class:"line"},[n("span",null,"import React from 'react'")]),s(`
`),n("span",{class:"line"},[n("span",null,"const LogStateContext = React.createContext();")]),s(`
`),n("span",{class:"line"},[n("span",null,"const LogDispatcherContext = React.createContext();")]),s(`
`),n("span",{class:"line"},[n("span",null,"export function useLogState() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const context = React.useContext(LogStateContext)")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (context === undefined) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        throw new Error('useLogState must be used within a LogStateProvider')")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return context")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"export function useLogDispatcher() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const context = React.useContext(LogDispatcherContext)")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (context === undefined) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        throw new Error('useLogDispatcher must be used within a LogDispatcherContext')")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return context")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"如果有的组件同时需要读写日志，调用两次很麻烦？")]),s(`
`),n("span",{class:"line"},[n("span",null,"export function useLogs() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return [useLogState(), useLogDispatcher()]")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"export function App() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const [logs, addLogs] = useLogs()")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // ...")]),s(`
`),n("span",{class:"line"},[n("span",null,"根据场景，灵活运用这些技巧，让你的代码更加健壮优雅~")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**组合** **Providers**")]),s(`
`),n("span",{class:"line"},[n("span",null,"假设我们使用上面的办法管理一些全局的小状态，Provider 变的越来越多了，有时候会遇到嵌套地狱的情况：")]),s(`
`),n("span",{class:"line"},[n("span",null,"const StateProviders = ({ children }) => (")]),s(`
`),n("span",{class:"line"},[n("span",null,"    <LogProvider>")]),s(`
`),n("span",{class:"line"},[n("span",null,"        <UserProvider>")]),s(`
`),n("span",{class:"line"},[n("span",null,"            <MenuProvider>")]),s(`
`),n("span",{class:"line"},[n("span",null,"                <AppProvider>")]),s(`
`),n("span",{class:"line"},[n("span",null,"                    {children}")]),s(`
`),n("span",{class:"line"},[n("span",null,"                </AppProvider>")]),s(`
`),n("span",{class:"line"},[n("span",null,"            </MenuProvider>")]),s(`
`),n("span",{class:"line"},[n("span",null,"        </UserProvider>")]),s(`
`),n("span",{class:"line"},[n("span",null,"    </LogProvider>")]),s(`
`),n("span",{class:"line"},[n("span",null,")")]),s(`
`),n("span",{class:"line"},[n("span",null,"function App() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return (")]),s(`
`),n("span",{class:"line"},[n("span",null,"        <StateProviders>")]),s(`
`),n("span",{class:"line"},[n("span",null,"            <Main />")]),s(`
`),n("span",{class:"line"},[n("span",null,"        </StateProviders>")]),s(`
`),n("span",{class:"line"},[n("span",null,"    )")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"有没有办法解决呢？当然有，我们参考 redux 中的 compose 方法，自己写一个 composeProvider 方法：")]),s(`
`),n("span",{class:"line"},[n("span",null,"function composeProviders(...providers) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return ({ children }) =>")]),s(`
`),n("span",{class:"line"},[n("span",null,"        providers.reduce(")]),s(`
`),n("span",{class:"line"},[n("span",null,"            (prev, Provider) => <Provider>{prev}</Provider>,")]),s(`
`),n("span",{class:"line"},[n("span",null,"            children,")]),s(`
`),n("span",{class:"line"},[n("span",null,"        )")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"//   代码就可以简化成这样：")]),s(`
`),n("span",{class:"line"},[n("span",null,"const StateProviders = composeProviders(")]),s(`
`),n("span",{class:"line"},[n("span",null,"    LogProvider,")]),s(`
`),n("span",{class:"line"},[n("span",null,"    UserProvider,")]),s(`
`),n("span",{class:"line"},[n("span",null,"    MenuProvider,")]),s(`
`),n("span",{class:"line"},[n("span",null,"    AppProvider,")]),s(`
`),n("span",{class:"line"},[n("span",null,")")]),s(`
`),n("span",{class:"line"},[n("span",null,"function App() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return (")]),s(`
`),n("span",{class:"line"},[n("span",null,"        <StateProvider>")]),s(`
`),n("span",{class:"line"},[n("span",null,"            <Main />")]),s(`
`),n("span",{class:"line"},[n("span",null,"        </StateProvider>")]),s(`
`),n("span",{class:"line"},[n("span",null,"    )")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("p",null,[n("strong",null,"总结"),s(" 本篇文章主要围绕这 Context 这个 API，讲了几个性能优化和代码组织的优化点，总结下来就是：")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"尽量提升渲染无关的子组件元素到「有状态组件」的外部。")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"在需要的情况下对 Context 进行读写分离。")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"包装Context 的使用，注意错误处理。")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"组合多个 Context，优化代码。")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"欢迎关注「**前端从进阶到入院**」，还有很多前端原创文章哦~")])])])]),n("p",null,"> 来自"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null," <https://juejin.im/post/6889247428797530126>")])])])])],-1)])])}const v=a(t,[["render",i]]);export{g as __pageData,v as default};
