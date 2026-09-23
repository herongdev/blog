import{_ as a,o as e,c as p,j as n,a as l}from"./chunks/framework.DJo0M80U.js";const m=JSON.parse('{"title":"Portals","description":"ReactDOM.createPortal(child, container) 第一个参数（child）是任何可渲染的 React 子元素，例如一个元素，字符串或 fragment。第二个参数（container）是一个 DOM 元素。 典型应用 一个 portal 的典型用例是。","frontmatter":{"title":"Portals","date":"2026-08-11T00:00:00.000Z","categories":["React 系统教程"],"tags":["React","Redux","前端","教程","OneNote","核心概念与组件"],"description":"ReactDOM.createPortal(child, container) 第一个参数（child）是任何可渲染的 React 子元素，例如一个元素，字符串或 fragment。第二个参数（container）是一个 DOM 元素。 典型应用 一个 portal 的典型用例是。","sidebarWeight":3,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/新特性/Portals.md"},"headers":[],"relativePath":"posts/React系统教程/01-核心概念与组件/Portals.md","filePath":"posts/React系统教程/01-核心概念与组件/Portals.md"}'),t={name:"posts/React系统教程/01-核心概念与组件/Portals.md"};function i(c,s,o,r,u,d){return e(),p("div",null,[...s[0]||(s[0]=[n("div",null,[n("h1",{id:"portals",tabindex:"-1"},[l("Portals "),n("a",{class:"header-anchor",href:"#portals","aria-label":'Permalink to "Portals"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“Portals”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"Portal 提供了一种将子节点渲染到存在于父组件以外的 DOM 节点的优秀的方案。")])])])]),n("p",null,[l("ReactDOM.createPortal(child, container) 第一个参数（child）是任何"),n("a",{href:"https://react.docschina.org/docs/react-component.html#render",target:"_blank",rel:"noreferrer"},"可渲染的"),l(" React 子元素，例如一个元素，字符串或 fragment。第二个参数（container）是一个 DOM 元素。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**用法**")]),l(`
`),n("span",{class:"line"},[n("span",null,"通常来讲，当你从组件的 render 方法返回一个元素时，该元素将被挂载到 DOM 节点中离其最近的父节点：")]),l(`
`),n("span",{class:"line"},[n("span",null,"render() {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    // React 挂载了一个新的 div，并且把子元素渲染其中")]),l(`
`),n("span",{class:"line"},[n("span",null,"    return (")]),l(`
`),n("span",{class:"line"},[n("span",null,"        <div>")]),l(`
`),n("span",{class:"line"},[n("span",null,"            {this.props.children}")]),l(`
`),n("span",{class:"line"},[n("span",null,"        </div>")]),l(`
`),n("span",{class:"line"},[n("span",null,"    );")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"然而，有时候将子元素插入到 DOM 节点中的不同位置也是有好处的：")]),l(`
`),n("span",{class:"line"},[n("span",null,"render() {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    // React 并*没有*创建一个新的 div。它只是把子元素渲染到 `domNode` 中。")]),l(`
`),n("span",{class:"line"},[n("span",null,"    // `domNode` 是一个可以在任何位置的有效 DOM 节点。")]),l(`
`),n("span",{class:"line"},[n("span",null,"    return ReactDOM.createPortal(")]),l(`
`),n("span",{class:"line"},[n("span",null,"        this.props.children,")]),l(`
`),n("span",{class:"line"},[n("span",null,"        domNode")]),l(`
`),n("span",{class:"line"},[n("span",null,"    );")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("p",null,[n("strong",null,"典型应用"),l(" 一个 portal 的典型用例是当父组件有 overflow: hidden 或 z-index 样式时，但你需要子组件能够在视觉上“跳出”其容器。例如，对话框、悬浮卡以及提示框：")]),n("p",null,[n("strong",null,"注意"),l("**😗* 当在使用 portal 时, 记住"),n("a",{href:"https://react.docschina.org/docs/accessibility.html#programmatically-managing-focus",target:"_blank",rel:"noreferrer"},"管理键盘焦点"),l("就变得尤为重要。 对于模态对话框，通过遵循 "),n("a",{href:"https://www.w3.org/TR/wai-aria-practices-1.1/#dialog_modal",target:"_blank",rel:"noreferrer"},"WAI-ARIA"),l(" 模态开发实践，来确保每个人都能够运用它。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**通过** **Portal** **进行事件冒泡**")]),l(`
`),n("span",{class:"line"},[n("span",null,"尽管 portal 可以被放置在 DOM 树中的任何地方，但在任何其他方面，其行为和普通的 React 子节点行为一致。由于 portal 仍存在于 _React_ _树_， 且与 _DOM_ _树_ 中的位置无关，那么无论其子节点是否是 portal，像 context 这样的功能特性都是不变的。")]),l(`
`),n("span",{class:"line"},[n("span",null,"这包含事件冒泡。一个从 portal 内部触发的事件会一直冒泡至包含 _React_ _树_的祖先，即便这些元素并不是 _DOM_ _树_ 中的祖先。假设存在如下 HTML 结构：")]),l(`
`),n("span",{class:"line"},[n("span",null,'<html>  <body>    <div id="app-root"></div>    <div id="modal-root"></div>  </body></html>')]),l(`
`),n("span",{class:"line"},[n("span",null,"在 #app-root 里的 Parent 组件能够捕获到未被捕获的从兄弟节点 #modal-root 冒泡上来的事件。")]),l(`
`),n("span",{class:"line"},[n("span",null,"// 在 DOM 中有两个容器是兄弟级 （siblings）")]),l(`
`),n("span",{class:"line"},[n("span",null,"const appRoot = document.getElementById('app-root');")]),l(`
`),n("span",{class:"line"},[n("span",null,"const modalRoot = document.getElementById('modal-root');")]),l(`
`),n("span",{class:"line"},[n("span",null,"class Modal extends React.Component {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    constructor(props) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        super(props);")]),l(`
`),n("span",{class:"line"},[n("span",null,"        this.el = document.createElement('div');")]),l(`
`),n("span",{class:"line"},[n("span",null,"    }")]),l(`
`),n("span",{class:"line"},[n("span",null,"    componentDidMount() {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        // 在 Modal 的所有子元素被挂载后，")]),l(`
`),n("span",{class:"line"},[n("span",null,"        // 这个 portal 元素会被嵌入到 DOM 树中，")]),l(`
`),n("span",{class:"line"},[n("span",null,"        // 这意味着子元素将被挂载到一个分离的 DOM 节点中。")]),l(`
`),n("span",{class:"line"},[n("span",null,"        // 如果要求子组件在挂载时可以立刻接入 DOM 树，")]),l(`
`),n("span",{class:"line"},[n("span",null,"        // 例如衡量一个 DOM 节点，")]),l(`
`),n("span",{class:"line"},[n("span",null,"        // 或者在后代节点中使用 ‘autoFocus’，")]),l(`
`),n("span",{class:"line"},[n("span",null,"        // 则需添加 state 到 Modal 中，")]),l(`
`),n("span",{class:"line"},[n("span",null,"        // 仅当 Modal 被插入 DOM 树中才能渲染子元素。")]),l(`
`),n("span",{class:"line"},[n("span",null,"        modalRoot.appendChild(this.el);")]),l(`
`),n("span",{class:"line"},[n("span",null,"    }")]),l(`
`),n("span",{class:"line"},[n("span",null,"    componentWillUnmount() {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        modalRoot.removeChild(this.el);")]),l(`
`),n("span",{class:"line"},[n("span",null,"    }")]),l(`
`),n("span",{class:"line"},[n("span",null,"    render() {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        return ReactDOM.createPortal(this.props.children, this.el);")]),l(`
`),n("span",{class:"line"},[n("span",null,"    }")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"class Parent extends React.Component {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    constructor(props) {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        super(props);")]),l(`
`),n("span",{class:"line"},[n("span",null,"        this.state = { clicks: 0 };")]),l(`
`),n("span",{class:"line"},[n("span",null,"        this.handleClick = this.handleClick.bind(this);")]),l(`
`),n("span",{class:"line"},[n("span",null,"    }")]),l(`
`),n("span",{class:"line"},[n("span",null,"    handleClick() {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        // 当子元素里的按钮被点击时，")]),l(`
`),n("span",{class:"line"},[n("span",null,"        // 这个将会被触发更新父元素的 state，")]),l(`
`),n("span",{class:"line"},[n("span",null,"        // 即使这个按钮在 DOM 中不是直接关联的后代")]),l(`
`),n("span",{class:"line"},[n("span",null,"        this.setState(state => ({ clicks: state.clicks + 1 }));")]),l(`
`),n("span",{class:"line"},[n("span",null,"    }")]),l(`
`),n("span",{class:"line"},[n("span",null,"    render() {")]),l(`
`),n("span",{class:"line"},[n("span",null,"        return (")]),l(`
`),n("span",{class:"line"},[n("span",null,"            <div onClick={this.handleClick}>")]),l(`
`),n("span",{class:"line"},[n("span",null,"                <p>Number of clicks: {this.state.clicks}</p>")]),l(`
`),n("span",{class:"line"},[n("span",null,"                <p>")]),l(`
`),n("span",{class:"line"},[n("span",null,"                    Open up the browser DevTools")]),l(`
`),n("span",{class:"line"},[n("span",null,"                    to observe that the button")]),l(`
`),n("span",{class:"line"},[n("span",null,"                    is not a child of the div")]),l(`
`),n("span",{class:"line"},[n("span",null,"                    with the onClick handler.")]),l(`
`),n("span",{class:"line"},[n("span",null,"                </p>")]),l(`
`),n("span",{class:"line"},[n("span",null,"                <Modal>")]),l(`
`),n("span",{class:"line"},[n("span",null,"                    <Child />")]),l(`
`),n("span",{class:"line"},[n("span",null,"                </Modal>")]),l(`
`),n("span",{class:"line"},[n("span",null,"            </div>")]),l(`
`),n("span",{class:"line"},[n("span",null,"        );")]),l(`
`),n("span",{class:"line"},[n("span",null,"    }")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"function Child() {")]),l(`
`),n("span",{class:"line"},[n("span",null,"    // 这个按钮的点击事件会冒泡到父元素")]),l(`
`),n("span",{class:"line"},[n("span",null,"    // 因为这里没有定义 'onClick' 属性")]),l(`
`),n("span",{class:"line"},[n("span",null,"    return (")]),l(`
`),n("span",{class:"line"},[n("span",null,'        <div className="modal">')]),l(`
`),n("span",{class:"line"},[n("span",null,"            <button>Click</button>")]),l(`
`),n("span",{class:"line"},[n("span",null,"        </div>")]),l(`
`),n("span",{class:"line"},[n("span",null,"    );")]),l(`
`),n("span",{class:"line"},[n("span",null,"}")]),l(`
`),n("span",{class:"line"},[n("span",null,"ReactDOM.render(<Parent />, appRoot);")]),l(`
`),n("span",{class:"line"},[n("span",null,"在父组件里捕获一个来自 portal 冒泡上来的事件，使之能够在开发时具有不完全依赖于 portal 的更为灵活的抽象。例如，如果你在渲染一个 <Modal /> 组件，无论其是否采用 portal 实现，父组件都能够捕获其事件。")]),l(`
`),n("span",{class:"line"},[n("span",null,"v16之前传送出去的组件不冒泡回来了（应该是在传送出去的那一端冒泡 有待考证） v16之后传送出去的组件事件会冒泡回来")])])])]),n("p",null,"> 来自"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null," <https://react.docschina.org/docs/portals.html>")])])])])],-1)])])}const g=a(t,[["render",i]]);export{m as __pageData,g as default};
