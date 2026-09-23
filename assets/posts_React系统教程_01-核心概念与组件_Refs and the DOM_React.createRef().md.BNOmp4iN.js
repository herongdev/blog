import{_ as e,o as a,c as t,j as n,a as l}from"./chunks/framework.DJo0M80U.js";const g=JSON.parse('{"title":"React.createRef()","description":"概述： 引用（ Refs ）提供了一个获得 DOM 节点或者创建在 render 方法中的 React 元素的方法； 在典型的 React 数据流中， props 是唯一的父组件与它们的子元素的通信方式。更改子元素，你需要使用新的 props 去重新渲染子元素。但是在一些情况下你。","frontmatter":{"title":"React.createRef()","date":"2026-08-11T00:00:00.000Z","categories":["React 系统教程"],"tags":["React","Redux","前端","教程","OneNote","核心概念与组件"],"description":"概述： 引用（ Refs ）提供了一个获得 DOM 节点或者创建在 render 方法中的 React 元素的方法； 在典型的 React 数据流中， props 是唯一的父组件与它们的子元素的通信方式。更改子元素，你需要使用新的 props 去重新渲染子元素。但是在一些情况下你。","sidebarWeight":33,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/概念/Refs and the DOM/React.createRef().md"},"headers":[],"relativePath":"posts/React系统教程/01-核心概念与组件/Refs and the DOM/React.createRef().md","filePath":"posts/React系统教程/01-核心概念与组件/Refs and the DOM/React.createRef().md"}'),p={name:"posts/React系统教程/01-核心概念与组件/Refs and the DOM/React.createRef().md"};function u(c,s,i,o,d,r){return a(),t("div",null,[...s[0]||(s[0]=[n("div",null,[n("h1",{id:"react-createref",tabindex:"-1"},[l("React.createRef() "),n("a",{class:"header-anchor",href:"#react-createref","aria-label":'Permalink to "React.createRef()"'},"​")]),n("blockquote",null,[n("p",null,[l("本节目标：理解“React.createRef()”的核心思路，并能把它用于实际开发或面试表达。 "),n("strong",null,"概述："),l(" 引用（"),n("code",null,"Refs"),l("）提供了一个获得"),n("code",null,"DOM"),l("节点或者创建在"),n("code",null,"render"),l("方法中的"),n("code",null,"React"),l("元素的方法； 在典型的"),n("code",null,"React"),l("数据流中，"),n("code",null,"props"),l("是唯一的父组件与它们的子元素的通信方式。更改子元素，你需要使用新的"),n("code",null,"props"),l("去重新渲染子元素。但是在一些情况下你现在典型数据流之外强制的更改元素。被更改的子元素可能是一个"),n("code",null,"React"),l("组件的实例，或者是一个"),n("code",null,"DOM"),l("元素。对所有这些情况，"),n("code",null,"React"),l("提供了一种特殊方法："),n("code",null,"Refs"),l("； "),n("strong",null,"（一）什么时候使用"),n("code",null,"Refs"),n("strong",null,"：")])]),n("ul",null,[n("li",null,[n("p",null,"管理焦点、文本选择、媒体回放")]),n("li",null,[n("p",null,"触发必要动画；")]),n("li",null,[n("p",null,[l("整合第三方"),n("code",null,"DOM"),l("库")]),n("p",null,[l("避免对任何可以声明式解决的问题使用"),n("code",null,"Refs"),l("；（比如相对于暴露一个对话框组件的"),n("code",null,"open()"),l("、"),n("code",null,"close()"),l("方法，请使用"),n("code",null,"isOpen prop"),l("！） "),n("strong",null,"（二）不要过度使用"),n("code",null,"Refs"),n("strong",null,"！"),l(" 你的第一个倾向可能是使用"),n("code",null,"Refs"),l("去实现一些"),n("code",null,"APP"),l("中的东西。在这种情况下，请停下来，仔细想想"),n("code",null,"state"),l("应该存在的组件层次。经常地，我们都知道应该由更高的层次去拥有"),n("code",null,"state"),l("。 "),n("strong",null,"（三）创建"),n("code",null,"Refs"),n("strong",null,"："),l(" 可以通过"),n("code",null,"React.createRef()"),l("创建"),n("code",null,"Refs"),l("并通过"),n("code",null,"ref"),l("属性联系到"),n("code",null,"React"),l("组件。"),n("code",null,"Refs"),l("通常当组件被创建时被分配给实例变量，这样它们就能在组件中被引用。")])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"class MyComponent extends React.Component {")]),l(`
`),n("span",{class:"line"},[n("span",null,"constructor(props) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"super(props);")]),l(`
`),n("span",{class:"line"},[n("span",null,"this.myRef = React.createRef();")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"render() {")]),l(`
`),n("span",{class:"line"},[n("span",null,"return <div ref={this.myRef} />;")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("p",null,[n("strong",null,"（四）访问"),n("code",null,"Refs"),n("strong",null,"："),l(" 当一个"),n("code",null,"ref"),l("通过"),n("code",null,"render"),l("放入一个元素中，一个对节点的引用可以通过"),n("code",null,"ref"),l("的"),n("code",null,"current"),l("属性得到；")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"const node = this.myRef.current;")])])])]),n("pre",null,[n("code",null," `ref`的值根据节点类型的不同而不同：\n")]),n("ul",null,[n("li",null,[n("pre",null,[n("code",null,"当`ref`属性用于`HTML`元素，在构造器中通过`React.createRef()`函数创建的`ref`接收底层`DOM`元素作为它的`current`属性；\n")])]),n("li",null,[n("pre",null,[n("code",null,"当`ref`属性用于传统的类组件，`ref`对象接收挂载好的组件实例作为它的`current`；\n")])]),n("li",null,[n("pre",null,[n("code",null,"你不能将`ref`属性用于函数式组件上，因为他们并没有实例（`instance`）！\n")]),n("p",null,[l("下面是对应于不同"),n("code",null,"ref"),l("的例子 "),n("code",null,"1"),n("strong",null,"）"),n("code",null,"DOM"),n("strong",null,"元素：")])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"class CustomTextInput extends React.Component {")]),l(`
`),n("span",{class:"line"},[n("span",null,"constructor(props) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"super(props);")]),l(`
`),n("span",{class:"line"},[n("span",null,"//")])])])]),n("p",null,[n("em",null,"创建一个"),n("code",null,"ref"),n("em",null,"去储存"),n("code",null,"textInput DOM"),n("em",null,"元素")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"this.textInput = React.createRef();")]),l(`
`),n("span",{class:"line"},[n("span",null,"this.focusTextInput = this.focusTextInput.bind(this);")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"focusTextInput() {")]),l(`
`),n("span",{class:"line"},[n("span",null,"//")])])])]),n("p",null,[n("em",null,"很明显的，让"),n("code",null,"text input"),n("em",null,"获得焦点使用了原生的")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"DOM API")]),l(`
`),n("span",{class:"line"},[n("span",null,"//")])])])]),n("p",null,[n("em",null,"注意：我们通过"),n("code",null,"current"),n("em",null,"去获得"),n("code",null,"DOM"),n("em",null,"节点")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"this.textInput.current.focus();")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"render() {")]),l(`
`),n("span",{class:"line"},[n("span",null,"//")])])])]),n("p",null,[n("em",null,"告诉"),n("code",null,"React"),n("em",null,"我们想要将"),n("code",null,"\\<input\\>"),n("em",null,"的"),n("code",null,"ref"),n("em",null,"和构造器中创建的"),n("code",null,"textInput"),n("em",null,"联系起来")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"return (")]),l(`
`),n("span",{class:"line"},[n("span",null,"<div>")]),l(`
`),n("span",{class:"line"},[n("span",null,"<input")]),l(`
`),n("span",{class:"line"},[n("span",null,'type="text"')]),l(`
`),n("span",{class:"line"},[n("span",null,"ref={this.textInput} />")]),l(`
`),n("span",{class:"line"},[n("span",null,"<input")]),l(`
`),n("span",{class:"line"},[n("span",null,'type="button"')]),l(`
`),n("span",{class:"line"},[n("span",null,'value="Focus the text input"')]),l(`
`),n("span",{class:"line"},[n("span",null,"onClick={this.focusTextInput}")]),l(`
`),n("span",{class:"line"},[n("span",null,"/>")]),l(`
`),n("span",{class:"line"},[n("span",null,"</div>")]),l(`
`),n("span",{class:"line"},[n("span",null,");")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("pre",null,[n("code",null,"`React`将会将会在组件挂载时将`DOM`元素分配给`current`属性，并且在组件被卸载时，将`current`属性重置为`null`。`ref`将会在`componentDidMount`和`componentDidUpdate`生命周期钩子前被更新\n")]),n("p",null,[n("code",null,"2"),n("strong",null,"）类组件："),l(" 如果我们想要包装上面的"),n("code",null,"CustomTextInput"),l("，模仿挂载后被点击。我们可以通过"),n("code",null,"ref"),l("得到自定义的"),n("code",null,"Input"),l("组件，手动调用它的"),n("code",null,"focusTextInput"),l("函数。（注意！只有当"),n("code",null,"CustomTextInput"),l("被声明为类的时候才有用！）")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"class AutoFocusTextInput extends React.Component {")]),l(`
`),n("span",{class:"line"},[n("span",null,"constructor(props) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"super(props);")]),l(`
`),n("span",{class:"line"},[n("span",null,"this.textInput = React.createRef();")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"componentDidMount() {")]),l(`
`),n("span",{class:"line"},[n("span",null,"this.textInput.current.focusTextInput();")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"render() {")]),l(`
`),n("span",{class:"line"},[n("span",null,"return (")]),l(`
`),n("span",{class:"line"},[n("span",null,"<CustomTextInput ref={this.textInput} />")]),l(`
`),n("span",{class:"line"},[n("span",null,");")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"3")])])])]),n("p",null,[n("strong",null,"）函数式组件（没有用的！）")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function MyFunctionalComponent() {")]),l(`
`),n("span",{class:"line"},[n("span",null,"return <input />;")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"class Parent extends React.Component {")]),l(`
`),n("span",{class:"line"},[n("span",null,"constructor(props) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"super(props);")]),l(`
`),n("span",{class:"line"},[n("span",null,"this.textInput = React.createRef();")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"render() {")]),l(`
`),n("span",{class:"line"},[n("span",null,"//")])])])]),n("p",null,"==这样没用！函数式组件根本就没有实例！=="),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"return (")]),l(`
`),n("span",{class:"line"},[n("span",null,"<MyFunctionalComponent ref={this.textInput} />")]),l(`
`),n("span",{class:"line"},[n("span",null,");")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("p",null,[l("但是，你可以在函数式组件中使用"),n("code",null,"ref"),l("属性，就像你引用"),n("code",null,"DOM"),l("元素和类组件一样。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function CustomTextInput(props) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"// textInput")])])])]),n("p",null,[n("em",null,"必须被声明在这里——"),n("code",null,"ref"),n("em",null,"才能适用于它")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"let textInput = React.createRef();")]),l(`
`),n("span",{class:"line"},[n("span",null,"function handleClick() {")]),l(`
`),n("span",{class:"line"},[n("span",null,"textInput.current.focus();")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"return (")]),l(`
`),n("span",{class:"line"},[n("span",null,"<div>")]),l(`
`),n("span",{class:"line"},[n("span",null,"<input")]),l(`
`),n("span",{class:"line"},[n("span",null,'type="text"')]),l(`
`),n("span",{class:"line"},[n("span",null,"ref={textInput} />")]),l(`
`),n("span",{class:"line"},[n("span",null,"<input")]),l(`
`),n("span",{class:"line"},[n("span",null,'type="button"')]),l(`
`),n("span",{class:"line"},[n("span",null,'value="Focus the text input"')]),l(`
`),n("span",{class:"line"},[n("span",null,"onClick={handleClick}")]),l(`
`),n("span",{class:"line"},[n("span",null,"/>")]),l(`
`),n("span",{class:"line"},[n("span",null,"</div>")]),l(`
`),n("span",{class:"line"},[n("span",null,");")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("p",null,[n("strong",null,"（五）向父组件暴露"),n("code",null,"DOM"),n("strong",null,"引用（"),n("code",null,"Refs"),n("strong",null,"）"),l(" 在很罕见的情况下，你也许想要从父组件访问到子元素的"),n("code",null,"DOM"),l("节点。通常来说我们不建议这样做，因为这样破坏了组件的封装性，但是在某些情况下对于类似：触发聚焦、改变子元素"),n("code",null,"DOM"),l("节点的大小、位置等情况非常有用。 你可以向子组件增加"),n("code",null,"ref"),l("（就像上面说的），但是这并不是一个完美的解决方案——你只会获得一个组件实例而不是"),n("code",null,"DOM"),l("节点。更糟糕的是，它对函数式组件没用！ 如果你使用"),n("code",null,"React 16.3"),l("或者更高的版本，我们建议你在这些情况下使用")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"ref forwarding")])])])]),n("p",null,[l("，"),n("code",null,"Ref fprwarding"),l("让组件可以选择去暴露子组件的"),n("code",null,"ref"),l("作为他们自己的。你可以在")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"ref forwarding")])])])]),n("p",null,[l("文档中找到更全面的例子——怎样暴露子元素的"),n("code",null,"DOM"),l("节点给父元素。 如果你使用"),n("code",null,"React 16.2"),l("或者更低的版本，或者你需要比"),n("code",null,"ref forwarding"),l("所能提供的更多的灵活性。你可以使用"),n("a",{href:"https://gist.github.com/gaearon/1a018a023347fe1c2476073330cc5509",target:"_blank",rel:"noreferrer"},"替代方法"),l("，并且显式的传入一个"),n("code",null,"ref"),l("当做一个不同命名的"),n("code",null,"prop"),l("。 如果可能，我们不建议暴露"),n("code",null,"DOM"),l("节点，但是在一些情况下还是非常有用的。注意，这种方法需要你去在子组件中增加一些代码，如果你完全没有对于子组件实现的控制，你最后的选择是使用")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"findDOMNode()")])])])]),n("p",null,[l("方法，当然，也只能这样了。 "),n("strong",null,"（六）回调"),n("code",null,"Refs"),n("code",null,"React"),l("同样支持另一种名为“回调"),n("code",null,"refs"),l("”的方法去设置"),n("code",null,"refs"),l("——它可以给我们对"),n("code",null,"refs"),l("创建和销毁更细粒度的控制。 放入一个函数，而不是一个由"),n("code",null,"createRef()"),l("创建的"),n("code",null,"ref"),l("属性。这个函数接受"),n("code",null,"React"),l("组件实例、或者"),n("code",null,"HTML DOM"),l("元素作为参数——可以被储存并且在其他地方被访问。 下面的例子实现了一个通常的模式：使用"),n("code",null,"ref"),l("回调储存一个"),n("code",null,"DOM"),l("节点的应用在实例变量中：")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"class CustomTextInput extends React.Component {")]),l(`
`),n("span",{class:"line"},[n("span",null,"constructor(props) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"super(props);")]),l(`
`),n("span",{class:"line"},[n("span",null,"this.textInput = null;")]),l(`
`),n("span",{class:"line"},[n("span",null,"this.setTextInputRef = element => {")]),l(`
`),n("span",{class:"line"},[n("span",null,"this.textInput = element;")]),l(`
`),n("span",{class:"line"},[n("span",null,"};")]),l(`
`),n("span",{class:"line"},[n("span",null,"this.focusTextInput = () => {")]),l(`
`),n("span",{class:"line"},[n("span",null,"//")])])])]),n("p",null,[n("em",null,"通过原生"),n("code",null,"DOM API"),n("em",null,"聚焦文本")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"if (this.textInput) this.textInput.focus();")]),l(`
`),n("span",{class:"line"},[n("span",null,"};")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"componentDidMount() {")]),l(`
`),n("span",{class:"line"},[n("span",null,"//")])])])]),n("p",null,[n("em",null,"在挂载时自动聚焦")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"this.focusTextInput();")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"render() {")]),l(`
`),n("span",{class:"line"},[n("span",null,"//")])])])]),n("p",null,[n("em",null,"使用"),n("code",null,"'ref'"),n("em",null,"回调去在一个实例域中储存文本输入"),n("code",null,"DOM"),n("em",null,"元素的引用"),n("code",null,"("),n("em",null,"比如")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,", this.textInput).")]),l(`
`),n("span",{class:"line"},[n("span",null,"return (")]),l(`
`),n("span",{class:"line"},[n("span",null,"<div>")]),l(`
`),n("span",{class:"line"},[n("span",null,"<input")]),l(`
`),n("span",{class:"line"},[n("span",null,'type="text"')]),l(`
`),n("span",{class:"line"},[n("span",null,"ref={this.setTextInputRef}")]),l(`
`),n("span",{class:"line"},[n("span",null,"/>")]),l(`
`),n("span",{class:"line"},[n("span",null,"<input")]),l(`
`),n("span",{class:"line"},[n("span",null,'type="button"')]),l(`
`),n("span",{class:"line"},[n("span",null,'value="Focus the text input"')]),l(`
`),n("span",{class:"line"},[n("span",null,"onClick={this.focusTextInput}")]),l(`
`),n("span",{class:"line"},[n("span",null,"/>")]),l(`
`),n("span",{class:"line"},[n("span",null,"</div>")]),l(`
`),n("span",{class:"line"},[n("span",null,");")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("pre",null,[n("code",null,"`React`将会在组件挂载时使用`DOM`元素调用`ref`回调，在组件卸载时使用`null`调用`ref`回调。`ref`回调都会在`componentDidMount`或者`componentDidUpdate`生命周期钩子之前被调用。\n你可以在组件之间传递回调`refs`，就像你可以对通过`React.createRef()`创建的对象`refs`一样：\n")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function CustomTextInput(props) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"return (")]),l(`
`),n("span",{class:"line"},[n("span",null,"<div>")]),l(`
`),n("span",{class:"line"},[n("span",null,"<input ref={props.inputRef} />")]),l(`
`),n("span",{class:"line"},[n("span",null,"</div>")]),l(`
`),n("span",{class:"line"},[n("span",null,");")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"class Parent extends React.Component {")]),l(`
`),n("span",{class:"line"},[n("span",null,"render() {")]),l(`
`),n("span",{class:"line"},[n("span",null,"return (")]),l(`
`),n("span",{class:"line"},[n("span",null,"<CustomTextInput")]),l(`
`),n("span",{class:"line"},[n("span",null,"inputRef={el => this.inputElement = el}")]),l(`
`),n("span",{class:"line"},[n("span",null,"/>")]),l(`
`),n("span",{class:"line"},[n("span",null,");")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("pre",null,[n("code",null," 在上面的例子中，`Parent`组件将他的`ref`回调作为`inputRef`这个属性（`props`）传入`CustomTextInput`组件，接着`CustomTextInput`组件将同样的函数作为一个特殊的`ref`属性（`attribute`）传给`\\<input\\>`。从结果来看，`Parent`组件中的`this.inputElement`将会被放在与在`CustomTextInput`组件的`\\<input\\>`元素相关的`DOM`节点中。\n")]),n("p",null,[n("strong",null,"（七）历史遗留的"),n("code",null,"API"),n("strong",null,"：字符串"),n("code",null,"Refs"),l(" 不用管，以后都要移除（见到"),n("code",null,"this.refs.textInput"),l("的形式，就使用"),n("code",null,"React.createRef()"),l("或者回调模式代替）。 "),n("strong",null,"（八）关于回调"),n("code",null,"refs"),n("strong",null,"的警告"),l(" 如果"),n("code",null,"ref"),l("回调被定义为一个行内函数，当组件更新时会被调用两次——第一次被"),n("code",null,"null"),l("调用、而后被"),n("code",null,"DOM"),l("元素调用。这是因为函数的新实例会在每次渲染的时候创建，所以"),n("code",null,"React"),l("需要清除老的"),n("code",null,"ref"),l("然后生成一个新的。你可以通过在"),n("code",null,"class"),l("中定义一个绑定的"),n("code",null,"ref"),l("回调方法避免这个问题，但是注意，这种问题在大多数情况下都没什么影响"),n("code",null,"~"),l(" > 来自")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null," <https://blog.csdn.net/weixin_33971977/article/details/86027673>")])])])])],-1)])])}const f=e(p,[["render",u]]);export{g as __pageData,f as default};
