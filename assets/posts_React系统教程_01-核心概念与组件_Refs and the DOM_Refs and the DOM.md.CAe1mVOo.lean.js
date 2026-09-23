import{_ as a,o as e,c as t,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const f=JSON.parse('{"title":"Refs and the DOM","description":"Refs 提供了一种方式，允许我们访问 DOM 节点或在 render 方法中创建的 React 元素。 在典型的 React 数据流中，props 是父组件与子组件交互的唯一方式。要修改一个子组件，你需要使用新的 props 来重新渲染它。但是，在某些情况下，你需要在典型数据流。","frontmatter":{"title":"Refs and the DOM","date":"2026-08-11T00:00:00.000Z","categories":["React 系统教程"],"tags":["React","Redux","前端","教程","OneNote","核心概念与组件"],"description":"Refs 提供了一种方式，允许我们访问 DOM 节点或在 render 方法中创建的 React 元素。 在典型的 React 数据流中，props 是父组件与子组件交互的唯一方式。要修改一个子组件，你需要使用新的 props 来重新渲染它。但是，在某些情况下，你需要在典型数据流。","sidebarWeight":36,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/概念/Refs and the DOM/Refs and the DOM.md"},"headers":[],"relativePath":"posts/React系统教程/01-核心概念与组件/Refs and the DOM/Refs and the DOM.md","filePath":"posts/React系统教程/01-核心概念与组件/Refs and the DOM/Refs and the DOM.md"}'),p={name:"posts/React系统教程/01-核心概念与组件/Refs and the DOM/Refs and the DOM.md"};function c(i,l,u,r,o,d){return e(),t("div",null,[...l[0]||(l[0]=[n("div",null,[n("h1",{id:"refs-and-the-dom",tabindex:"-1"},[s("Refs and the DOM "),n("a",{class:"header-anchor",href:"#refs-and-the-dom","aria-label":'Permalink to "Refs and the DOM"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“Refs and the DOM”的核心思路，并能把它用于实际开发或面试表达。 Refs 提供了一种方式，允许我们访问 DOM 节点或在 render 方法中创建的 React 元素。")]),n("p",null,[s("在典型的 React 数据流中，"),n("a",{href:"https://react.docschina.org/docs/components-and-props.html",target:"_blank",rel:"noreferrer"},"props"),s(" 是父组件与子组件交互的唯一方式。要修改一个子组件，你需要使用新的 props 来重新渲染它。但是，在某些情况下，你需要在典型数据流之外强制修改子组件。被修改的子组件可能是一个 React 组件的实例，也可能是一个 DOM 元素。对于这两种情况，React 都提供了解决办法。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**何时使用** **Refs**")]),s(`
`),n("span",{class:"line"},[n("span",null,"下面是几个适合使用 refs 的情况：")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"管理焦点，文本选择或媒体播放。")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"触发强制动画。")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"集成第三方 DOM 库。")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"避免使用 refs 来做任何可以通过声明式实现来完成的事情。")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"举个例子，避免在 Dialog 组件里暴露 open() 和 close() 方法，最好传递 isOpen 属性。")])])])]),n("p",null,[n("strong",null,"勿过度使用"),s(),n("strong",null,"Refs"),s(" 你可能首先会想到使用 refs 在你的 app 中“让事情发生”。如果是这种情况，请花一点时间，认真再考虑一下 state 属性应该被安排在哪个组件层中。通常你会想明白，让更高的组件层级拥有这个 state，是更恰当的。查看 "),n("a",{href:"https://react.docschina.org/docs/lifting-state-up.html",target:"_blank",rel:"noreferrer"},"状态提升"),s(" 以获取更多有关示例。 注意 下面的例子已经更新为使用在 React 16.3 版本引入的 React.createRef() API。如果你正在使用一个较早版本的 React，我们推荐你使用"),n("a",{href:"https://react.docschina.org/docs/refs-and-the-dom.html#callback-refs",target:"_blank",rel:"noreferrer"},"回调形式的"),s(" refs。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**创建** **Refs**")]),s(`
`),n("span",{class:"line"},[n("span",null,"Refs 是使用 React.createRef() 创建的，并通过 ref 属性附加到 React 元素。")]),s(`
`),n("span",{class:"line"},[n("span",null,"在构造组件时，通常将 Refs 分配给实例属性，以便可以在整个组件中引用它们。")]),s(`
`),n("span",{class:"line"},[n("span",null,"class MyComponent extends React.Component {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  constructor(props) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    super(props);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.myRef = React.createRef();")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  render() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return <div ref={this.myRef} />;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**访问****Refs**")]),s(`
`),n("span",{class:"line"},[n("span",null,"当 ref 被传递给 render 中的元素时，对该节点的引用可以在 ref 的 current 属性中被访问。")]),s(`
`),n("span",{class:"line"},[n("span",null,"const node = this.myRef.current;")]),s(`
`),n("span",{class:"line"},[n("span",null,"ref 的值根据节点的类型而有所不同：")])])])]),n("p",null,"当 ref 属性用于 HTML 元素时，构造函数中使用 React.createRef() 创建的 ref 接收底层 DOM 元素作为其 current 属性。"),n("p",null,"当 ref 属性用于自定义 class 组件时，ref 对象接收组件的挂载实例作为其 current 属性。"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**你不能在函数组件上使用** **ref** **属性**，因为他们没有实例。")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"以下例子说明了这些差异。")]),s(`
`),n("span",{class:"line"},[n("span",null,"**为** **DOM** **元素添加** **ref**")]),s(`
`),n("span",{class:"line"},[n("span",null,"以下代码使用 ref 去存储 DOM 节点的引用：")]),s(`
`),n("span",{class:"line"},[n("span",null,"class CustomTextInput extends React.Component {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  constructor(props) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    super(props);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 创建一个 ref 来存储 textInput 的 DOM 元素")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.textInput = React.createRef();")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.focusTextInput = this.focusTextInput.bind(this);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  focusTextInput() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 直接使用原生 API 使 text 输入框获得焦点")]),s(`
`),n("span",{class:"line"},[n("span",null,'    // 注意：我们通过 "current" 来访问 DOM 节点')]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.textInput.current.focus();")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  render() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 告诉 React 我们想把 <input> ref 关联到")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 构造器里创建的 `textInput` 上")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return (")]),s(`
`),n("span",{class:"line"},[n("span",null,"      <div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"        <input")]),s(`
`),n("span",{class:"line"},[n("span",null,'          type="text"')]),s(`
`),n("span",{class:"line"},[n("span",null,"          ref={this.textInput}")]),s(`
`),n("span",{class:"line"},[n("span",null,"        />")]),s(`
`),n("span",{class:"line"},[n("span",null,"        <input")]),s(`
`),n("span",{class:"line"},[n("span",null,'          type="button"')]),s(`
`),n("span",{class:"line"},[n("span",null,'          value="Focus the text input"')]),s(`
`),n("span",{class:"line"},[n("span",null,"          onClick={this.focusTextInput}")]),s(`
`),n("span",{class:"line"},[n("span",null,"        />")]),s(`
`),n("span",{class:"line"},[n("span",null,"      </div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"    );")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"React 会在组件挂载时给 current 属性传入 DOM 元素，并在组件卸载时传入 null 值。ref 会在 componentDidMount 或 componentDidUpdate 生命周期钩子触发前更新。")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**为** **class** **组件添加** **Ref**")]),s(`
`),n("span",{class:"line"},[n("span",null,"如果我们想包装上面的 CustomTextInput，来模拟它挂载之后立即被点击的操作，我们可以使用 ref 来获取这个自定义的 input 组件并手动调用它的 focusTextInput 方法：")]),s(`
`),n("span",{class:"line"},[n("span",null,"class AutoFocusTextInput extends React.Component {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  constructor(props) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    super(props);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.textInput = React.createRef();")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  componentDidMount() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.textInput.current.focusTextInput();")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  render() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return (")]),s(`
`),n("span",{class:"line"},[n("span",null,"      <CustomTextInput ref={this.textInput} />);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"//请注意，这仅在 CustomTextInput 声明为 class 时才有效：")]),s(`
`),n("span",{class:"line"},[n("span",null,"class CustomTextInput extends React.Component {  // ...")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**Refs** **与函数组件**")]),s(`
`),n("span",{class:"line"},[n("span",null,"默认情况下，**你不能在函数组件上使用** **ref** **属性**，因为它们没有实例：")]),s(`
`),n("span",{class:"line"},[n("span",null,"function MyFunctionComponent() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return <input />;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"class Parent extends React.Component {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  constructor(props) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    super(props);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.textInput = React.createRef();")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  render() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // This will *not* work!")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return (")]),s(`
`),n("span",{class:"line"},[n("span",null,"      <MyFunctionComponent ref={this.textInput} />);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"如果要在函数组件中使用 ref，你可以使用 [forwardRef](https://react.docschina.org/docs/forwarding-refs.html)（可与 [useImperativeHandle](https://react.docschina.org/docs/hooks-reference.html#useimperativehandle) 结合使用），或者可以将该组件转化为 class 组件。")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"不管怎样，你可以**在函数组件内部使用** **ref** **属性**，只要它指向一个 DOM 元素或 class 组件：")]),s(`
`),n("span",{class:"line"},[n("span",null,"function CustomTextInput(props) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // 这里必须声明 textInput，这样 ref 才可以引用它")]),s(`
`),n("span",{class:"line"},[n("span",null,"  const textInput = useRef(null);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  function handleClick() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    textInput.current.focus();")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return (")]),s(`
`),n("span",{class:"line"},[n("span",null,"    <div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"      <input")]),s(`
`),n("span",{class:"line"},[n("span",null,'        type="text"')]),s(`
`),n("span",{class:"line"},[n("span",null,"        ref={textInput}")]),s(`
`),n("span",{class:"line"},[n("span",null,"      />")]),s(`
`),n("span",{class:"line"},[n("span",null,"      <input")]),s(`
`),n("span",{class:"line"},[n("span",null,'        type="button"')]),s(`
`),n("span",{class:"line"},[n("span",null,'        value="Focus the text input"')]),s(`
`),n("span",{class:"line"},[n("span",null,"        onClick={handleClick}")]),s(`
`),n("span",{class:"line"},[n("span",null,"      />")]),s(`
`),n("span",{class:"line"},[n("span",null,"    </div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"  );")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("p",null,[n("strong",null,"将"),s(),n("strong",null,"DOM Refs"),s(),n("strong",null,"暴露给父组件"),s(" 在极少数情况下，你可能希望在父组件中引用子节点的 DOM 节点。 通常不建议这样做，因为它会打破组件的封装，但它偶尔可用于触发焦点或测量子 DOM 节点的大小或位置。")]),n("p",null,[s("虽然你可以"),n("a",{href:"https://react.docschina.org/docs/refs-and-the-dom.html#adding-a-ref-to-a-class-component",target:"_blank",rel:"noreferrer"},"向子组件添加"),s(" ref，但这不是一个理想的解决方案，因为你只能获取组件实例而不是 DOM 节点。并且，它还在函数组件上无效。")]),n("p",null,[s("如果你使用 16.3 或更高版本的 React, 这种情况下我们推荐使用 "),n("a",{href:"https://react.docschina.org/docs/forwarding-refs.html",target:"_blank",rel:"noreferrer"},"ref"),s(" 转发。"),n("strong",null,"Ref"),s(),n("strong",null,"转发使组件可以像暴露自己的"),s(),n("strong",null,"ref"),s(),n("strong",null,"一样暴露子组件的"),s(),n("strong",null,"ref"),s("。关于怎样对父组件暴露子组件的 DOM 节点，在 "),n("a",{href:"https://react.docschina.org/docs/forwarding-refs.html#forwarding-refs-to-dom-components",target:"_blank",rel:"noreferrer"},"ref"),s(" 转发文档中有一个详细的例子。")]),n("p",null,[s("如果你使用 16.2 或更低版本的 React，或者你需要比 ref 转发更高的灵活性，你可以使用"),n("a",{href:"https://gist.github.com/gaearon/1a018a023347fe1c2476073330cc5509",target:"_blank",rel:"noreferrer"},"这个替代方案"),s("将 ref 作为特殊名字的 prop 直接传递。 可能的话，我们不建议暴露 DOM 节点，但有时候它会成为救命稻草。注意这个方案需要你在子组件中增加一些代码。如果你对子组件的实现没有控制权的话，你剩下的选择是使用 "),n("a",{href:"https://react.docschina.org/docs/react-dom.html#finddomnode",target:"_blank",rel:"noreferrer"},"findDOMNode()"),s("，但在"),n("a",{href:"https://react.docschina.org/docs/strict-mode.html#warning-about-deprecated-finddomnode-usage",target:"_blank",rel:"noreferrer"},"严格模式"),s(" 下已被废弃且不推荐使用。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**回调** **Refs**")]),s(`
`),n("span",{class:"line"},[n("span",null,"React 也支持另一种设置 refs 的方式，称为“回调 refs”。它能助你更精细地控制何时 refs 被设置和解除。")]),s(`
`),n("span",{class:"line"},[n("span",null,"不同于传递 createRef() 创建的 ref 属性，你会传递一个函数。这个函数中接受 React 组件实例或 HTML DOM 元素作为参数，以使它们能在其他地方被存储和访问。")]),s(`
`),n("span",{class:"line"},[n("span",null,"下面的例子描述了一个通用的范例：使用 ref 回调函数，在实例的属性中存储对 DOM 节点的引用。")]),s(`
`),n("span",{class:"line"},[n("span",null,"class CustomTextInput extends React.Component {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  constructor(props) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    super(props);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.textInput = null;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.setTextInputRef = element => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      this.textInput = element;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    };")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.focusTextInput = () => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      // 使用原生 DOM API 使 text 输入框获得焦点")]),s(`
`),n("span",{class:"line"},[n("span",null,"      if (this.textInput) this.textInput.focus();")]),s(`
`),n("span",{class:"line"},[n("span",null,"    };")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  componentDidMount() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 组件挂载后，让文本框自动获得焦点")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.focusTextInput();")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  render() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 使用 `ref` 的回调函数将 text 输入框 DOM 节点的引用存储到 React")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 实例上（比如 this.textInput）")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return (")]),s(`
`),n("span",{class:"line"},[n("span",null,"      <div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"        <input")]),s(`
`),n("span",{class:"line"},[n("span",null,'          type="text"')]),s(`
`),n("span",{class:"line"},[n("span",null,"          ref={this.setTextInputRef}")]),s(`
`),n("span",{class:"line"},[n("span",null,"        />")]),s(`
`),n("span",{class:"line"},[n("span",null,"        <input")]),s(`
`),n("span",{class:"line"},[n("span",null,'          type="button"')]),s(`
`),n("span",{class:"line"},[n("span",null,'          value="Focus the text input"')]),s(`
`),n("span",{class:"line"},[n("span",null,"          onClick={this.focusTextInput} />")]),s(`
`),n("span",{class:"line"},[n("span",null,"      </div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"    );")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"React 将在组件挂载时，会调用 ref 回调函数并传入 DOM 元素，当卸载时调用它并传入 null。在 componentDidMount 或 componentDidUpdate 触发前，React 会保证 refs 一定是最新的。")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"你可以在组件间传递回调形式的 refs，就像你可以传递通过 React.createRef() 创建的对象 refs 一样。")]),s(`
`),n("span",{class:"line"},[n("span",null,"function CustomTextInput(props) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return (")]),s(`
`),n("span",{class:"line"},[n("span",null,"    <div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"      <input ref={props.inputRef} />")]),s(`
`),n("span",{class:"line"},[n("span",null,"    </div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"  );")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"class Parent extends React.Component {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  render() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return (")]),s(`
`),n("span",{class:"line"},[n("span",null,"      <CustomTextInput")]),s(`
`),n("span",{class:"line"},[n("span",null,"        inputRef={el => this.inputElement = el}")]),s(`
`),n("span",{class:"line"},[n("span",null,"      />")]),s(`
`),n("span",{class:"line"},[n("span",null,"    );")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"在上面的例子中，Parent 把它的 refs 回调函数当作 inputRef props 传递给了 CustomTextInput，而且 CustomTextInput 把相同的函数作为特殊的 ref 属性传递给了 <input>。结果是，在 Parent 中的 this.inputElement 会被设置为与 CustomTextInput 中的 input 元素相对应的 DOM 节点。")])])])]),n("p",null,[n("strong",null,"关于回调"),s(),n("strong",null,"refs"),s(),n("strong",null,"的说明"),s(" 如果 ref 回调函数是以内联函数的方式定义的，在更新过程中它会被执行两次，第一次传入参数 null，然后第二次会传入参数 DOM 元素。这是因为在每次渲染时会创建一个新的函数实例，所以 React 清空旧的 ref 并且设置新的。通过将 ref 的回调函数定义成 class 的绑定函数的方式可以避免上述问题，但是大多数情况下它是无关紧要的。 > 来自")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null," <https://react.docschina.org/docs/refs-and-the-dom.html>")])])])])],-1)])])}const g=a(p,[["render",c]]);export{f as __pageData,g as default};
