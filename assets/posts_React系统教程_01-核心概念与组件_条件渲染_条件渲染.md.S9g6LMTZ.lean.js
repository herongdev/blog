import{_ as a,o as e,c as p,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"条件渲染","description":"方法： 一、使用if条件语句来return不同元素或组件； 二、将条件判断的结果赋值给元素变量，渲染元素变量； 声明一个变量并使用 if 语句进行条件渲染是不错的方式，但有时你可能会想使用更为简洁的语法。","frontmatter":{"title":"条件渲染","date":"2026-08-11T00:00:00.000Z","categories":["React 系统教程"],"tags":["React","Redux","前端","教程","OneNote","核心概念与组件"],"description":"方法： 一、使用if条件语句来return不同元素或组件； 二、将条件判断的结果赋值给元素变量，渲染元素变量； 声明一个变量并使用 if 语句进行条件渲染是不错的方式，但有时你可能会想使用更为简洁的语法。","sidebarWeight":73,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/概念/条件渲染/条件渲染.md"},"headers":[],"relativePath":"posts/React系统教程/01-核心概念与组件/条件渲染/条件渲染.md","filePath":"posts/React系统教程/01-核心概念与组件/条件渲染/条件渲染.md"}'),i={name:"posts/React系统教程/01-核心概念与组件/条件渲染/条件渲染.md"};function t(c,l,o,u,r,d){return e(),p("div",null,[...l[0]||(l[0]=[n("div",null,[n("h1",{id:"条件渲染",tabindex:"-1"},[s("条件渲染 "),n("a",{class:"header-anchor",href:"#条件渲染","aria-label":'Permalink to "条件渲染"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“条件渲染”的核心思路，并能把它用于实际开发或面试表达。 方法： 一、使用if条件语句来return不同元素或组件； 二、将条件判断的结果赋值给元素变量，渲染元素变量；")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"React 中的条件渲染和 JavaScript 中的一样，使用 JavaScript 运算符 [if](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else) 或者[条件运算符](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Conditional_Operator)去创建元素来表现当前的状态，然后让 React 根据它们来更新 UI。")]),s(`
`),n("span",{class:"line"},[n("span",null,"观察这两个组件:")]),s(`
`),n("span",{class:"line"},[n("span",null,"function UserGreeting(props) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return <h1>Welcome back!</h1>;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"function GuestGreeting(props) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return <h1>Please sign up.</h1>;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"再创建一个 Greeting 组件，它会根据用户是否登录来决定显示上面的哪一个组件。")]),s(`
`),n("span",{class:"line"},[n("span",null,"function Greeting(props) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  const isLoggedIn = props.isLoggedIn;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  if (isLoggedIn) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return <UserGreeting />;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return <GuestGreeting />;")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"ReactDOM.render(")]),s(`
`),n("span",{class:"line"},[n("span",null,"  // Try changing to isLoggedIn={true}:")]),s(`
`),n("span",{class:"line"},[n("span",null,"  <Greeting isLoggedIn={false} />,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  document.getElementById('root')")]),s(`
`),n("span",{class:"line"},[n("span",null,");")]),s(`
`),n("span",{class:"line"},[n("span",null,"这个示例根据 isLoggedIn 的值来渲染不同的问候语。")])])])]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**元素变量**")]),s(`
`),n("span",{class:"line"},[n("span",null,"你可以使用变量来储存元素。 它可以帮助你有条件地渲染组件的一部分，而其他的渲染部分并不会因此而改变。")]),s(`
`),n("span",{class:"line"},[n("span",null,"观察这两个组件，它们分别代表了注销和登录按钮：")]),s(`
`),n("span",{class:"line"},[n("span",null,"function LoginButton(props) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return (")]),s(`
`),n("span",{class:"line"},[n("span",null,"    <button onClick={props.onClick}>")]),s(`
`),n("span",{class:"line"},[n("span",null,"      Login")]),s(`
`),n("span",{class:"line"},[n("span",null,"    </button>")]),s(`
`),n("span",{class:"line"},[n("span",null,"  );")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"class LoginControl extends React.Component {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  constructor(props) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    super(props);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.handleLoginClick =")]),s(`
`),n("span",{class:"line"},[n("span",null,"      this.handleLoginClick.bind(this);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.handleLogoutClick =")]),s(`
`),n("span",{class:"line"},[n("span",null,"      this.handleLogoutClick.bind(this);")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.state = { isLoggedIn: false };")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  handleLoginClick() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.setState({")]),s(`
`),n("span",{class:"line"},[n("span",null,"      isLoggedIn: true")]),s(`
`),n("span",{class:"line"},[n("span",null,"    });")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  handleLogoutClick() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    this.setState({")]),s(`
`),n("span",{class:"line"},[n("span",null,"      isLoggedIn: false")]),s(`
`),n("span",{class:"line"},[n("span",null,"    });")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  render() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const isLoggedIn = this.state.isLoggedIn;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    let button;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (isLoggedIn) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      button =")]),s(`
`),n("span",{class:"line"},[n("span",null,"        <LogoutButton")]),s(`
`),n("span",{class:"line"},[n("span",null,"          onClick={this.handleLogoutClick}")]),s(`
`),n("span",{class:"line"},[n("span",null,"        />;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    } else {")]),s(`
`),n("span",{class:"line"},[n("span",null,"      button =")]),s(`
`),n("span",{class:"line"},[n("span",null,"        <LoginButton")]),s(`
`),n("span",{class:"line"},[n("span",null,"          onClick={this.handleLoginClick}")]),s(`
`),n("span",{class:"line"},[n("span",null,"        />;")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return (")]),s(`
`),n("span",{class:"line"},[n("span",null,"      <div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"        <Greeting isLoggedIn={isLoggedIn} />")]),s(`
`),n("span",{class:"line"},[n("span",null,"        {button}")]),s(`
`),n("span",{class:"line"},[n("span",null,"      </div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"    );")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"ReactDOM.render(")]),s(`
`),n("span",{class:"line"},[n("span",null,"  <LoginControl />,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  document.getElementById('root')")]),s(`
`),n("span",{class:"line"},[n("span",null,");")]),s(`
`),n("span",{class:"line"},[n("span",null,"function LogoutButton(props) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return (")]),s(`
`),n("span",{class:"line"},[n("span",null,"    <button onClick={props.onClick}>")]),s(`
`),n("span",{class:"line"},[n("span",null,"      Logout")]),s(`
`),n("span",{class:"line"},[n("span",null,"    </button>")]),s(`
`),n("span",{class:"line"},[n("span",null,"  );")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"在下面的示例中，我们将创建一个名叫 LoginControl 的[有状态的组件](https://react.docschina.org/docs/state-and-lifecycle.html#adding-local-state-to-a-class)。")]),s(`
`),n("span",{class:"line"},[n("span",null,"它将根据当前的状态来渲染 <LoginButton /> 或者 <LogoutButton />。同时它还会渲染上一个示例中的 <Greeting />。")])])])]),n("p",null,"声明一个变量并使用 if 语句进行条件渲染是不错的方式，但有时你可能会想使用更为简洁的语法。")],-1)])])}const f=a(i,[["render",t]]);export{h as __pageData,f as default};
