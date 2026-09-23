import{_ as l,o as a,c as t,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const f=JSON.parse('{"title":"React Ref","description":"string ref 强制React跟踪当前正在执行的组件。 这是有问题的，因为它使react模块处于有状态，并在捆绑中复制react模块时导致奇怪的错误。在 reconciliation 阶段，React Element 创建和更新的过程中，ref 会被封装为一个闭包函数，等待。","frontmatter":{"title":"React Ref","date":"2026-08-11T00:00:00.000Z","categories":["React 系统教程"],"tags":["React","Redux","前端","教程","OneNote","核心概念与组件"],"description":"string ref 强制React跟踪当前正在执行的组件。 这是有问题的，因为它使react模块处于有状态，并在捆绑中复制react模块时导致奇怪的错误。在 reconciliation 阶段，React Element 创建和更新的过程中，ref 会被封装为一个闭包函数，等待。","sidebarWeight":32,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/概念/Refs and the DOM/React Ref.md"},"headers":[],"relativePath":"posts/React系统教程/01-核心概念与组件/Refs and the DOM/React Ref.md","filePath":"posts/React系统教程/01-核心概念与组件/Refs and the DOM/React Ref.md"}'),p={name:"posts/React系统教程/01-核心概念与组件/Refs and the DOM/React Ref.md"};function i(c,e,u,r,o,d){return a(),t("div",null,[...e[0]||(e[0]=[n("div",null,[n("h1",{id:"react-ref",tabindex:"-1"},[s("React Ref "),n("a",{class:"header-anchor",href:"#react-ref","aria-label":'Permalink to "React Ref"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“React Ref”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**ref** **的四种方式**")]),s(`
`),n("span",{class:"line"},[n("span",null,"一、在 React v16.3 之前，ref 通过字符串（string ref）或者回调函数（callback ref）的形式进行获取。")]),s(`
`),n("span",{class:"line"},[n("span",null,"ref 通过字符获取：")]),s(`
`),n("span",{class:"line"},[n("span",null,"// string ref")]),s(`
`),n("span",{class:"line"},[n("span",null,"class MyComponent extends React.Component {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    componentDidMount() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        this.refs.myRef.focus();")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    render() {")]),s(`
`),n("span",{class:"line"},[n("span",null,'        return <input ref="myRef" />;')]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"二、ref 通过回调函数获取：")]),s(`
`),n("span",{class:"line"},[n("span",null,"// callback ref")]),s(`
`),n("span",{class:"line"},[n("span",null,"class MyComponent extends React.Component {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    componentDidMount() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        this.myRef.focus();")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    render() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        return <input ref={(ele) => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            this.myRef = ele;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }} />;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"三、在 v16.3 中，提案引入了新的 API：React.createRef。ref 通过 React.createRef 获取：")]),s(`
`),n("span",{class:"line"},[n("span",null,"// React.createRef")]),s(`
`),n("span",{class:"line"},[n("span",null,"class MyComponent extends React.Component {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    constructor(props) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        super(props);")]),s(`
`),n("span",{class:"line"},[n("span",null,"        this.myRef = React.createRef();")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    componentDidMount() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        this.myRef.current.focus();")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    render() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        return <input ref={this.myRef} />;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"四、hooks：useRef")]),s(`
`),n("span",{class:"line"},[n("span",null,"function MyComponent() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const myRef = useRef(null);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const onButtonClick = () => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        // `current` 指向已挂载到 DOM 上的文本输入元素")]),s(`
`),n("span",{class:"line"},[n("span",null,"        myRef.current.focus();")]),s(`
`),n("span",{class:"line"},[n("span",null,"    };")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return (")]),s(`
`),n("span",{class:"line"},[n("span",null,"        <>")]),s(`
`),n("span",{class:"line"},[n("span",null,'            <input ref={myRef} type="text" />')]),s(`
`),n("span",{class:"line"},[n("span",null,"            <button onClick={onButtonClick}>聚焦</button>")]),s(`
`),n("span",{class:"line"},[n("span",null,"        </>")]),s(`
`),n("span",{class:"line"},[n("span",null,"    );")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**将被移除的** **string ref**")]),s(`
`),n("span",{class:"line"},[n("span",null,"string ref 不可组合。 例如一个第三方库的父组件已经给子组件传递了 ref，那么我们就无法在在子组件上添加 ref 了。 另一方面，回调引用没有一个所有者，因此您可以随时编写它们。例如：")]),s(`
`),n("span",{class:"line"},[n("span",null,"/** string ref **/")]),s(`
`),n("span",{class:"line"},[n("span",null,"class Parent extends React.Component {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    componentDidMount() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        // 可获取到 this.refs.childRef")]),s(`
`),n("span",{class:"line"},[n("span",null,"        console.log(this.refs);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    render() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        const { children } = this.props;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        return React.cloneElement(children, {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            ref: 'childRef',")]),s(`
`),n("span",{class:"line"},[n("span",null,"        });")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"class App extends React.Component {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    componentDidMount() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        // this.refs.child 无法获取到")]),s(`
`),n("span",{class:"line"},[n("span",null,"        console.log(this.refs);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    render() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        return (")]),s(`
`),n("span",{class:"line"},[n("span",null,"            <Parent>")]),s(`
`),n("span",{class:"line"},[n("span",null,'                <Child ref="child" />')]),s(`
`),n("span",{class:"line"},[n("span",null,"            </Parent>")]),s(`
`),n("span",{class:"line"},[n("span",null,"        );")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"string ref 的所有者由当前执行的组件确定。 这意味着使用通用的“渲染回调”模式（例如react），错误的组件将拥有引用（它将最终在react上而不是您的组件定义renderRow）。")]),s(`
`),n("span",{class:"line"},[n("span",null,"class MyComponent extends Component {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    renderRow = (index) => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        // string ref 会挂载在 DataTable this 上")]),s(`
`),n("span",{class:"line"},[n("span",null,"        return <input ref={'input-' + index} />;")]),s(`
`),n("span",{class:"line"},[n("span",null,"        // callback ref 会挂载在 MyComponent this 上")]),s(`
`),n("span",{class:"line"},[n("span",null,"        return <input ref={input => this['input-' + index] = input} />;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    render() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        return <DataTable")]),s(`
`),n("span",{class:"line"},[n("span",null,"            data={this.props.data}")]),s(`
`),n("span",{class:"line"},[n("span",null,"            renderRow={this.renderRow}")]),s(`
`),n("span",{class:"line"},[n("span",null,"        />")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"string ref 不适用于Flow之类的静态分析。 Flow不能猜测框架可以使字符串ref“出现”在react上的神奇效果，以及它的类型（可能有所不同）。 回调引用比静态分析更友好。")])])])]),n("p",null,[s("string ref 强制React跟踪当前正在执行的组件。 这是有问题的，因为它使react模块处于有状态，并在捆绑中复制react模块时导致奇怪的错误。在 reconciliation 阶段，React Element 创建和更新的过程中，ref 会被封装为一个闭包函数，等待 commit 阶段被执行，这会对 React 的性能产生一些影响。 关于这点可以参考 React 源码 coerceRef 的实现： 在调和子节点得过程中，会对 string ref 进行处理，把他转换成一个方法，这个方法主要做的事情就是设置 instance.refs[stringRef] = element，相当于把他转换成了function ref 对于更新得过程中string ref是否变化需要对比得是 current.ref._stringRef，这里记录了上一次渲染得时候如果使用得是string ref他的值是什么 owner是在调用createElement的时候获取的，通过ReactCurrentOwner.current获取，这个值在更新一个组件前会被设置，比如更新ClassComponent的时候，调用render方法之前会设置，然后调用render的时候就可以获取对应的owner了。 "),n("strong",null,"坚挺的"),s(),n("strong",null,"callback ref"),s(" React 将在组件挂载时，会调用 ref 回调函数并传入 DOM 元素，当卸载时调用它并传入 null。在 componentDidMount 或 componentDidUpdate 触发前，React 会保证 refs 一定是最新的。 如果 ref 回调函数是以内联函数的方式定义的，在更新过程中它会被执行两次，第一次传入参数 null，然后第二次会传入参数 DOM 元素。这是因为在每次渲染时会创建一个新的函数实例，所以 React 清空旧的 ref 并且设置新的。通过将 ref 的回调函数定义成 class 的绑定函数的方式可以避免上述问题，但是大多数情况下它是无关紧要的。 "),n("strong",null,"后来的"),s(),n("strong",null,"React.createRef"),s(" React.createRef 的优点：")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"相对于 callback ref 而言 React.createRef 显得更加直观，避免了 callback ref 的一些理解问题。")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"React.createRef 的缺点：")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"性能略低于 callback ref")])])])]),n("p",null,"能力上仍逊色于 callback ref，例如上一节提到的组合问题，createRef 也是无能为力的。"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"ref 的值根据节点的类型而有所不同：")])])])]),n("p",null,"当 ref 属性用于 HTML 元素时，构造函数中使用 React.createRef() 创建的 ref 接收底层 DOM 元素作为其 current 属性。"),n("p",null,"当 ref 属性用于自定义 class 组件时，ref 对象接收组件的挂载实例作为其 current 属性。"),n("ul",null,[n("li",null,[n("p",null,"默认情况下，你不能在函数组件上使用 ref 属性（可以在函数组件内部使用），因为它们没有实例："),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"如果要在函数组件中使用 ref，你可以使用 forwardRef（可与 useImperativeHandle 结合使用）")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"或者可以将该组件转化为 class 组件。")])])])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**useRef**")]),s(`
`),n("span",{class:"line"},[n("span",null,"useRef 返回一个可变的 ref 对象，其 .current 属性被初始化为传入的参数（initialValue）。**返回的** **ref** **对象在组件的整个生命周期内保持不变**。")]),s(`
`),n("span",{class:"line"},[n("span",null,"并且 useRef 可以很方便地保存任何可变值，其类似于在 class 中使用实例字段的方式。")]),s(`
`),n("span",{class:"line"},[n("span",null,"正是由于这些特性，useRef 和 createRef 出现了很大差异。")]),s(`
`),n("span",{class:"line"},[n("span",null,"可以运行下以下代码：")]),s(`
`),n("span",{class:"line"},[n("span",null,'import React, { useState, useRef, useEffect } from "react";')]),s(`
`),n("span",{class:"line"},[n("span",null,"export default function App() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const [count, setCount] = useState(0);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const latestCount = useRef(count);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    useEffect(() => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        latestCount.current = count;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    });")]),s(`
`),n("span",{class:"line"},[n("span",null,"    function handleAlertclick() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        setTimeout(() => {")]),s(`
`),n("span",{class:"line"},[n("span",null,`            alert("latestCount.current:" + latestCount.current + '.. count: ' + count);`)]),s(`
`),n("span",{class:"line"},[n("span",null,"        }, 2000);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return (")]),s(`
`),n("span",{class:"line"},[n("span",null,"        <div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"            <p>当前count： {count} </p>")]),s(`
`),n("span",{class:"line"},[n("span",null,"            <button onClick={() => setCount(count + 1)}>count + 1</button>")]),s(`
`),n("span",{class:"line"},[n("span",null,"            <button onClick={handleAlertclick}> 提示 </button>")]),s(`
`),n("span",{class:"line"},[n("span",null,"        </div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"    )")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"然后按照下面步骤进行操作：")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"连续点击5次 count + 1 按钮")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"点击 提示 按钮")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"再点击完 提示 按钮后2秒内连续点击2次 count + 1 按钮")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"等待 alert 弹窗提示。")])])])]),n("p",null,[s("然后会你会得到一个有趣的答案：alert 弹窗会提示： latestCount.current:7.. count: 5。使用 useRef 能获取到最新的值，但是 useState 却不能。 具体原因可以参考 react 作者之一 dan 的个人博客。或者查看 "),n("a",{href:"https://juejin.im/post/6844904049146331150",target:"_blank",rel:"noreferrer"},"React"),s(" 函数式组件和类组件的区别，不是只有state和性能！")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"那么 useRef 真有那么很好用吗？并不是的。还有由于它上面的那个特性，问题还是不少的。")]),s(`
`),n("span",{class:"line"},[n("span",null,"你可以尝试跑一下下面这段代码，或者 [点击这里查看](https://codesandbox.io/s/1rvwnj71x3)")]),s(`
`),n("span",{class:"line"},[n("span",null,'import React, { useRef, createRef, useState } from "react";import ReactDOM from "react-dom";')]),s(`
`),n("span",{class:"line"},[n("span",null,"function App() {  const [renderIndex, setRenderIndex] = useState(1);")]),s(`
`),n("span",{class:"line"},[n("span",null,"const refFromUseRef = useRef();  const refFromCreateRef = createRef();")]),s(`
`),n("span",{class:"line"},[n("span",null,'if (!refFromUseRef.current) {    // 赋值操作    refFromUseRef.current = renderIndex;  }  if (!refFromCreateRef.current) {    // 赋值操作    refFromCreateRef.current = renderIndex;  }  return (    <div className="App">      Current render index: {renderIndex}      <br />      在refFromUseRef.current中记住的第一个渲染索引：      {refFromUseRef.current}      <br />      在refFromCreateRef.current中未能成功记住第一个渲染索引：      {refFromCreateRef.current}      <br />      <button onClick={() => setRenderIndex(prev => prev + 1)}>        数值 + 1      </button>    </div>  );}')]),s(`
`),n("span",{class:"line"},[n("span",null,'const rootElement = document.getElementById("root");ReactDOM.render(<App />, rootElement);复制代码')]),s(`
`),n("span",{class:"line"},[n("span",null,"上面的案例中无论如何点击按钮 refFromUseRef.current 将始终为 1，而 renderIndex 和 refFromCreateRef.current 会伴随点击事件改变; 意想不到吧？")]),s(`
`),n("span",{class:"line"},[n("span",null,"因为：当 ref 对象内容发生变化时，useRef 并不会通知你。变更 .current 属性不会引发组件重新渲染。如果想要在 React 绑定或解绑 DOM 节点的 ref 时运行某些代码，则需要使用 callback ref 来实现。")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"总结下：")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"useRef 可以获取 DOM ref")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"useRef 可以获取最新的值")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"useRef 内容发生改变并不会通知")])])])]),n("p",null,"由于上面的一些问题，起初我也是并不想把 useRef 作为操作 ref 的方法来讲的。"),n("p",null,[n("strong",null,"Refs"),s(),n("strong",null,"转发"),n("strong",null,"是否需要将"),s(),n("strong",null,"DOM Refs"),s(),n("strong",null,"暴露给父组件？"),s(" 在极少数情况下，你可能希望在父组件中引用子节点的 DOM 节点。通常不建议这样做，因为它会打破组件的封装，但它偶尔可用于触发焦点或测量子 DOM 节点的大小或位置。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**如何将** **ref** **暴露给父组件？**")]),s(`
`),n("span",{class:"line"},[n("span",null,"如果你使用 16.3 或更高版本的 React, 这种情况下我们推荐使用 ref 转发。Ref 转发使组件可以像暴露自己的 ref 一样暴露子组件的 ref。")]),s(`
`),n("span",{class:"line"},[n("span",null,"什么是 ref 转发？")]),s(`
`),n("span",{class:"line"},[n("span",null,"const FancyButton = React.forwardRef((props, ref) => (")]),s(`
`),n("span",{class:"line"},[n("span",null,'    <button ref={ref} className="FancyButton">')]),s(`
`),n("span",{class:"line"},[n("span",null,"        {props.children}")]),s(`
`),n("span",{class:"line"},[n("span",null,"    </button>")]),s(`
`),n("span",{class:"line"},[n("span",null,"));")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 你可以直接获取 DOM button 的 ref：")]),s(`
`),n("span",{class:"line"},[n("span",null,"const ref = React.createRef();")]),s(`
`),n("span",{class:"line"},[n("span",null,"<FancyButton ref={ref}>Click me!</FancyButton>;")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"如果在低版本中如何转发？")]),s(`
`),n("span",{class:"line"},[n("span",null,"如果你使用 16.2 或更低版本的 React，或者你需要比 ref 转发更高的灵活性，你可以使用 ref 作为特殊名字的 prop 直接传递。")]),s(`
`),n("span",{class:"line"},[n("span",null,"比如下面这样：")]),s(`
`),n("span",{class:"line"},[n("span",null,"function CustomTextInput(props) {  return (    <div>      <input ref={props.inputRef} />    </div>  );}")]),s(`
`),n("span",{class:"line"},[n("span",null,"class Parent extends React.Component {  constructor(props) {    super(props);    this.inputElement = React.createRef();  }  render() {    return (      <CustomTextInput inputRef={this.inputElement} />    );  }}复制代码")]),s(`
`),n("span",{class:"line"},[n("span",null,"以下是对上述示例发生情况的逐步解释：")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"我们通过调用 React.createRef 创建了一个 React ref 并将其赋值给 ref 变量。")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"我们通过指定 ref 为 JSX 属性，将其向下传递给 <FancyButton ref={ref}>。")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"React 传递 ref 给 forwardRef 内函数 (props, ref) => ...，作为其第二个参数。")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"我们向下转发该 ref 参数到 <button ref={ref}>，将其指定为 JSX 属性。")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"当 ref 挂载完成，ref.current 将指向 <button> DOM 节点。")])])])]),n("p",null,"> 来自"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null," <https://juejin.im/post/6883671829395800072>")])])])])],-1)])])}const g=l(p,[["render",i]]);export{f as __pageData,g as default};
