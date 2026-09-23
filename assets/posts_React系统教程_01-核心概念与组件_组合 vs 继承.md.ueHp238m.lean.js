import{_ as a,o as e,c as p,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const g=JSON.parse('{"title":"组合 vs 继承","description":"React 有十分强大的组合模式。 我们推荐使用组合而非继承来实现组件间的代码重用。 在这篇文档中，我们将考虑初学 React 的开发人员使用继承时经常会遇到的一些问题，并展示如何通过组合思想来解决这些问题。 这种方法可能使你想起别的库中“槽”（slot）的概念，但在 React。","frontmatter":{"title":"组合 vs 继承","date":"2026-08-11T00:00:00.000Z","categories":["React 系统教程"],"tags":["React","Redux","前端","教程","OneNote","核心概念与组件"],"description":"React 有十分强大的组合模式。 我们推荐使用组合而非继承来实现组件间的代码重用。 在这篇文档中，我们将考虑初学 React 的开发人员使用继承时经常会遇到的一些问题，并展示如何通过组合思想来解决这些问题。 这种方法可能使你想起别的库中“槽”（slot）的概念，但在 React。","sidebarWeight":86,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/概念/组合 vs 继承.md"},"headers":[],"relativePath":"posts/React系统教程/01-核心概念与组件/组合 vs 继承.md","filePath":"posts/React系统教程/01-核心概念与组件/组合 vs 继承.md"}'),i={name:"posts/React系统教程/01-核心概念与组件/组合 vs 继承.md"};function c(t,l,u,o,r,d){return e(),p("div",null,[...l[0]||(l[0]=[n("div",null,[n("h1",{id:"组合-vs-继承",tabindex:"-1"},[s("组合 vs 继承 "),n("a",{class:"header-anchor",href:"#组合-vs-继承","aria-label":'Permalink to "组合 vs 继承"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“组合 vs 继承”的核心思路，并能把它用于实际开发或面试表达。 React 有十分强大的组合模式。 我们推荐使用组合而非继承来实现组件间的代码重用。")]),n("p",null,"在这篇文档中，我们将考虑初学 React 的开发人员使用继承时经常会遇到的一些问题，并展示如何通过组合思想来解决这些问题。"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**包含关系**")]),s(`
`),n("span",{class:"line"},[n("span",null,"有些组件无法提前知晓它们子组件的具体内容。在 Sidebar（侧边栏）和 Dialog（对话框）等展现通用容器（box）的组件中特别容易遇到这种情况。")]),s(`
`),n("span",{class:"line"},[n("span",null,"我们建议这些组件使用一个特殊的 children prop 来将他们的子组件传递到渲染结果中：")]),s(`
`),n("span",{class:"line"},[n("span",null,"function FancyBorder(props) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return (")]),s(`
`),n("span",{class:"line"},[n("span",null,"    <div")]),s(`
`),n("span",{class:"line"},[n("span",null,"      className={'FancyBorder FancyBorder-' + props.color}>")]),s(`
`),n("span",{class:"line"},[n("span",null,"      {props.children}")]),s(`
`),n("span",{class:"line"},[n("span",null,"    </div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"  );")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"这使得别的组件可以通过 JSX 嵌套，将任意组件作为子组件传递给它们。")]),s(`
`),n("span",{class:"line"},[n("span",null,"function WelcomeDialog() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return (")]),s(`
`),n("span",{class:"line"},[n("span",null,'    <FancyBorder color="blue">')]),s(`
`),n("span",{class:"line"},[n("span",null,'      <h1 className="Dialog-title">')]),s(`
`),n("span",{class:"line"},[n("span",null,"        Welcome")]),s(`
`),n("span",{class:"line"},[n("span",null,"      </h1>")]),s(`
`),n("span",{class:"line"},[n("span",null,'      <p className="Dialog-message">')]),s(`
`),n("span",{class:"line"},[n("span",null,"        Thank you for visiting our spacecraft!")]),s(`
`),n("span",{class:"line"},[n("span",null,"      </p>")]),s(`
`),n("span",{class:"line"},[n("span",null,"    </FancyBorder>")]),s(`
`),n("span",{class:"line"},[n("span",null,"  );")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"<FancyBorder> JSX 标签中的所有内容都会作为一个 children prop 传递给 FancyBorder 组件。")]),s(`
`),n("span",{class:"line"},[n("span",null,"因为 FancyBorder 将 {props.children} 渲染在一个 <div> 中，被传递的这些子组件最终都会出现在输出结果中。")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"少数情况下，你可能需要在一个组件中预留出几个“洞”。这种情况下，我们可以不使用 children，而是自行约定：将所需内容传入 props，并使用相应的 prop。")]),s(`
`),n("span",{class:"line"},[n("span",null,"function SplitPane(props) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return (")]),s(`
`),n("span",{class:"line"},[n("span",null,'    <div className="SplitPane">')]),s(`
`),n("span",{class:"line"},[n("span",null,'      <div className="SplitPane-left">')]),s(`
`),n("span",{class:"line"},[n("span",null,"        {props.left}")]),s(`
`),n("span",{class:"line"},[n("span",null,"      </div>")]),s(`
`),n("span",{class:"line"},[n("span",null,'      <div className="SplitPane-right">')]),s(`
`),n("span",{class:"line"},[n("span",null,"        {props.right}")]),s(`
`),n("span",{class:"line"},[n("span",null,"      </div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"    </div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"  );")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"function App() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return (")]),s(`
`),n("span",{class:"line"},[n("span",null,"    <SplitPane")]),s(`
`),n("span",{class:"line"},[n("span",null,"      left={<Contacts />}")]),s(`
`),n("span",{class:"line"},[n("span",null,"      right={<Chat />}")]),s(`
`),n("span",{class:"line"},[n("span",null,"    />")]),s(`
`),n("span",{class:"line"},[n("span",null,"  );")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"<Contacts /> 和 <Chat /> 之类的 React 元素本质就是对象（object），所以你可以把它们当作 props，像其他数据一样传递。")])])])]),n("p",null,"这种方法可能使你想起别的库中“槽”（slot）的概念，但在 React 中没有“槽”这一概念的限制，你可以将任何东西作为 props 进行传递。"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**特例关系**")]),s(`
`),n("span",{class:"line"},[n("span",null,"有些时候，我们会把一些组件看作是其他组件的特殊实例，比如 WelcomeDialog 可以说是 Dialog 的特殊实例。")]),s(`
`),n("span",{class:"line"},[n("span",null,"在 React 中，我们也可以通过组合来实现这一点。“特殊”组件可以通过 props 定制并渲染“一般”组件：")]),s(`
`),n("span",{class:"line"},[n("span",null,"function Dialog(props) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return (")]),s(`
`),n("span",{class:"line"},[n("span",null,'    <FancyBorder color="blue">')]),s(`
`),n("span",{class:"line"},[n("span",null,'      <h1 className="Dialog-title">')]),s(`
`),n("span",{class:"line"},[n("span",null,"        {props.title}")]),s(`
`),n("span",{class:"line"},[n("span",null,"      </h1>")]),s(`
`),n("span",{class:"line"},[n("span",null,'      <p className="Dialog-message">')]),s(`
`),n("span",{class:"line"},[n("span",null,"        {props.message}")]),s(`
`),n("span",{class:"line"},[n("span",null,"      </p>")]),s(`
`),n("span",{class:"line"},[n("span",null,"    </FancyBorder>")]),s(`
`),n("span",{class:"line"},[n("span",null,"  );")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"function WelcomeDialog() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return (")]),s(`
`),n("span",{class:"line"},[n("span",null,"    <Dialog")]),s(`
`),n("span",{class:"line"},[n("span",null,'      title="Welcome"')]),s(`
`),n("span",{class:"line"},[n("span",null,'      message="Thank you for visiting our spacecraft!"')]),s(`
`),n("span",{class:"line"},[n("span",null,"    />")]),s(`
`),n("span",{class:"line"},[n("span",null,"  );")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"组合也同样适用于以 class 形式定义的组件。")]),s(`
`),n("span",{class:"line"},[n("span",null,"function Dialog(props) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return (")]),s(`
`),n("span",{class:"line"},[n("span",null,'    <FancyBorder color="blue">')]),s(`
`),n("span",{class:"line"},[n("span",null,'      <h1 className="Dialog-title">')]),s(`
`),n("span",{class:"line"},[n("span",null,"        {props.title}")]),s(`
`),n("span",{class:"line"},[n("span",null,"      </h1>")]),s(`
`),n("span",{class:"line"},[n("span",null,'      <p className="Dialog-message">')]),s(`
`),n("span",{class:"line"},[n("span",null,"        {props.message}")]),s(`
`),n("span",{class:"line"},[n("span",null,"      </p>")]),s(`
`),n("span",{class:"line"},[n("span",null,"      {props.children}")]),s(`
`),n("span",{class:"line"},[n("span",null,"    </FancyBorder>")]),s(`
`),n("span",{class:"line"},[n("span",null,"  );")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"class SignUpDialog extends React.Component {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  constructor(props) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    super(props);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.handleChange =")]),s(`
`),n("span",{class:"line"},[n("span",null,"      this.handleChange.bind(this);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.handleSignUp =")]),s(`
`),n("span",{class:"line"},[n("span",null,"      this.handleSignUp.bind(this);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.state = {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      login: ''")]),s(`
`),n("span",{class:"line"},[n("span",null,"    };")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  render() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return (")]),s(`
`),n("span",{class:"line"},[n("span",null,"      <Dialog")]),s(`
`),n("span",{class:"line"},[n("span",null,'        title="Mars Exploration Program"')]),s(`
`),n("span",{class:"line"},[n("span",null,'        message="How should we refer to you?"')]),s(`
`),n("span",{class:"line"},[n("span",null,"      >")]),s(`
`),n("span",{class:"line"},[n("span",null,"        <input")]),s(`
`),n("span",{class:"line"},[n("span",null,"          value={this.state.login}")]),s(`
`),n("span",{class:"line"},[n("span",null,"          onChange={this.handleChange}")]),s(`
`),n("span",{class:"line"},[n("span",null,"        />")]),s(`
`),n("span",{class:"line"},[n("span",null,"        <button onClick={this.handleSignUp}>")]),s(`
`),n("span",{class:"line"},[n("span",null,"          Sign Me Up!")]),s(`
`),n("span",{class:"line"},[n("span",null,"        </button>")]),s(`
`),n("span",{class:"line"},[n("span",null,"      </Dialog>")]),s(`
`),n("span",{class:"line"},[n("span",null,"    );")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  handleChange(e) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.setState({")]),s(`
`),n("span",{class:"line"},[n("span",null,"      login: e.target.value")]),s(`
`),n("span",{class:"line"},[n("span",null,"    });")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  handleSignUp() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    alert(`Welcome aboard, ${this.state.login}!`);")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])])]),n("p",null,[n("strong",null,"那么继承呢？"),s(" 在 Facebook，我们在成百上千个组件中使用 React。我们并没有发现需要使用继承来构建组件层次的情况。 Props 和组合为你提供了清晰而安全地定制组件外观和行为的灵活方式。")]),n("p",null,"注意：组件可以接受任意 props，包括基本数据类型，React 元素以及函数。"),n("p",null,"如果你想要在组件间复用非 UI 的功能，我们建议将其提取为一个单独的 JavaScript 模块，如函数、对象或者类。组件可以直接引入（import）而无需通过 extend 继承它们。 > 来自"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null," <https://react.docschina.org/docs/composition-vs-inheritance.html>")])])])])],-1)])])}const v=a(i,[["render",c]]);export{g as __pageData,v as default};
