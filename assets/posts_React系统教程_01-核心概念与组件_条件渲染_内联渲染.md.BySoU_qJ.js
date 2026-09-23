import{_ as e,o as l,c as p,j as n,a as s}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"内联渲染","description":"之所以能这样做，是因为在 JavaScript 中，true && expression 总是会返回 expression, 而 false && expression 总是会返回 false。 因此，如果条件是 true，&& 右侧的元素就会被渲染，如果是 false，Reac。","frontmatter":{"title":"内联渲染","date":"2026-08-11T00:00:00.000Z","categories":["React 系统教程"],"tags":["React","Redux","前端","教程","OneNote","核心概念与组件"],"description":"之所以能这样做，是因为在 JavaScript 中，true && expression 总是会返回 expression, 而 false && expression 总是会返回 false。 因此，如果条件是 true，&& 右侧的元素就会被渲染，如果是 false，Reac。","sidebarWeight":72,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/概念/条件渲染/内联渲染.md"},"headers":[],"relativePath":"posts/React系统教程/01-核心概念与组件/条件渲染/内联渲染.md","filePath":"posts/React系统教程/01-核心概念与组件/条件渲染/内联渲染.md"}'),i={name:"posts/React系统教程/01-核心概念与组件/条件渲染/内联渲染.md"};function t(c,a,o,r,u,d){return l(),p("div",null,[...a[0]||(a[0]=[n("div",null,[n("h1",{id:"内联渲染",tabindex:"-1"},[s("内联渲染 "),n("a",{class:"header-anchor",href:"#内联渲染","aria-label":'Permalink to "内联渲染"'},"​")]),n("blockquote",null,[n("p",null,"本节目标：理解“内联渲染”的核心思路，并能把它用于实际开发或面试表达。")]),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"一、与运算符 &&")]),s(`
`),n("span",{class:"line"},[n("span",null,"通过花括号包裹代码，你可以[在](https://react.docschina.org/docs/introducing-jsx.html#embedding-expressions-in-jsx) JSX 中嵌入任何表达式。这也包括 JavaScript 中的逻辑与 (&&) 运算符。它可以很方便地进行元素的条件渲染。")]),s(`
`),n("span",{class:"line"},[n("span",null,"function Mailbox(props) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  const unreadMessages = props.unreadMessages;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return (")]),s(`
`),n("span",{class:"line"},[n("span",null,"    <div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"      <h1>Hello!</h1>")]),s(`
`),n("span",{class:"line"},[n("span",null,"      {unreadMessages.length > 0")]),s(`
`),n("span",{class:"line"},[n("span",null,"        && <h2>")]),s(`
`),n("span",{class:"line"},[n("span",null,"          You have {unreadMessages.length} unread messages.")]),s(`
`),n("span",{class:"line"},[n("span",null,"        </h2>")]),s(`
`),n("span",{class:"line"},[n("span",null,"      }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    </div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"  );")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"const messages = ['React', 'Re: React', 'Re:Re: React'];")]),s(`
`),n("span",{class:"line"},[n("span",null,"ReactDOM.render(")]),s(`
`),n("span",{class:"line"},[n("span",null,"  <Mailbox unreadMessages={messages} />,")]),s(`
`),n("span",{class:"line"},[n("span",null,"  document.getElementById('root')")]),s(`
`),n("span",{class:"line"},[n("span",null,");")])])])]),n("p",null,"之所以能这样做，是因为在 JavaScript 中，true && expression 总是会返回 expression, 而 false && expression 总是会返回 false。 因此，如果条件是 true，&& 右侧的元素就会被渲染，如果是 false，React 会忽略并跳过它。"),n("div",{class:"language- vp-adaptive-theme"},[n("button",{title:"Copy Code",class:"copy"}),n("span",{class:"lang"}),n("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"**二、三目运算符**")]),s(`
`),n("span",{class:"line"},[n("span",null,"另一种内联条件渲染的方法是使用 JavaScript 中的三目运算符 [condition ? true : false](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Conditional_Operator)。")]),s(`
`),n("span",{class:"line"},[n("span",null,"在下面这个示例中，我们用它来条件渲染一小段文本")]),s(`
`),n("span",{class:"line"},[n("span",null,"render() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  const isLoggedIn = this.state.isLoggedIn;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return (")]),s(`
`),n("span",{class:"line"},[n("span",null,"    <div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"      The user is <b>{isLoggedIn")]),s(`
`),n("span",{class:"line"},[n("span",null,"        ? 'currently'")]),s(`
`),n("span",{class:"line"},[n("span",null,"        : 'not'}</b> logged in.")]),s(`
`),n("span",{class:"line"},[n("span",null,"    </div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"  );")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"//同样的，它也可以用于较为复杂的表达式中，虽然看起来不是很直观：")]),s(`
`),n("span",{class:"line"},[n("span",null,"render() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  const isLoggedIn = this.state.isLoggedIn;")]),s(`
`),n("span",{class:"line"},[n("span",null,"  return (")]),s(`
`),n("span",{class:"line"},[n("span",null,"    <div>")]),s(`
`),n("span",{class:"line"},[n("span",null,"      {isLoggedIn")]),s(`
`),n("span",{class:"line"},[n("span",null,"        ? <LogoutButton onClick={this.handleLogoutClick} />")]),s(`
`),n("span",{class:"line"},[n("span",null,"        : <LoginButton onClick={this.handleLoginClick} />}")]),s(`
`),n("span",{class:"line"},[n("span",null,"    </div>);")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span",null,"就像在 JavaScript 中一样，你可以根据团队的习惯来选择可读性更高的代码风格。需要注意的是，如果条件变得过于复杂，那你应该考虑如何[提取组件](https://react.docschina.org/docs/components-and-props.html#extracting-components)。")])])])])],-1)])])}const v=e(i,[["render",t]]);export{h as __pageData,v as default};
