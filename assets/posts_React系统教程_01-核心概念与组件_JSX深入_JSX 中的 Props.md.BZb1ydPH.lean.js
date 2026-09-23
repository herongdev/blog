import{_ as a,o as e,c as p,j as s,a as n}from"./chunks/framework.DJo0M80U.js";const g=JSON.parse('{"title":"JSX 中的 Props","description":"注意： 属性展开在某些情况下很有用，但是也很容易将不必要的 props 传递给不相关的组件，或者将无效的 HTML 属性传递给 DOM。我们建议谨慎的使用该语法。","frontmatter":{"title":"JSX 中的 Props","date":"2026-08-11T00:00:00.000Z","categories":["React 系统教程"],"tags":["React","Redux","前端","教程","OneNote","核心概念与组件"],"description":"注意： 属性展开在某些情况下很有用，但是也很容易将不必要的 props 传递给不相关的组件，或者将无效的 HTML 属性传递给 DOM。我们建议谨慎的使用该语法。","sidebarWeight":18,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/概念/JSX深入/JSX 中的 Props.md"},"headers":[],"relativePath":"posts/React系统教程/01-核心概念与组件/JSX深入/JSX 中的 Props.md","filePath":"posts/React系统教程/01-核心概念与组件/JSX深入/JSX 中的 Props.md"}'),t={name:"posts/React系统教程/01-核心概念与组件/JSX深入/JSX 中的 Props.md"};function i(o,l,c,r,u,d){return e(),p("div",null,[...l[0]||(l[0]=[s("div",null,[s("h1",{id:"jsx-中的-props",tabindex:"-1"},[n("JSX 中的 Props "),s("a",{class:"header-anchor",href:"#jsx-中的-props","aria-label":'Permalink to "JSX 中的 Props"'},"​")]),s("blockquote",null,[s("p",null,"本节目标：理解“JSX 中的 Props”的核心思路，并能把它用于实际开发或面试表达。")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"有多种方式可以在 JSX 中指定 props。")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"**一、****JavaScript** **表达式作为** **Props**")]),n(`
`),s("span",{class:"line"},[s("span",null,"你可以把包裹在 {} 中的 JavaScript 表达式作为一个 prop 传递给 JSX 元素。例如，如下的 JSX：")]),n(`
`),s("span",{class:"line"},[s("span",null,"<MyComponent foo={1 + 2 + 3 + 4} />")]),n(`
`),s("span",{class:"line"},[s("span",null,"if 语句以及 for 循环不是 JavaScript 表达式，所以不能在 JSX 中直接使用。但是，你可以用在 JSX 以外的代码中。比如：")]),n(`
`),s("span",{class:"line"},[s("span",null,"function NumberDescriber(props) {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    let description;")]),n(`
`),s("span",{class:"line"},[s("span",null,"    if (props.number % 2 == 0) {")]),n(`
`),s("span",{class:"line"},[s("span",null,"        description = <strong>even</strong>;")]),n(`
`),s("span",{class:"line"},[s("span",null,"    } else {")]),n(`
`),s("span",{class:"line"},[s("span",null,"        description = <i>odd</i>;")]),n(`
`),s("span",{class:"line"},[s("span",null,"    }")]),n(`
`),s("span",{class:"line"},[s("span",null,"    return <div>{props.number} is an {description} number</div>;")]),n(`
`),s("span",{class:"line"},[s("span",null,"}")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"**二、字符串字面量**")]),n(`
`),s("span",{class:"line"},[s("span",null,"可以将字符串字面量赋值给 prop. 如下两个 JSX 表达式是等价的：")]),n(`
`),s("span",{class:"line"},[s("span",null,'<MyComponent message="hello world" />')]),n(`
`),s("span",{class:"line"},[s("span",null,"<MyComponent message={'hello world'} />")]),n(`
`),s("span",{class:"line"},[s("span",null,"当将字符串字面量赋值给 prop 时，它的值是未转义的。所以以下两个 JSX 表达式是等价的：")]),n(`
`),s("span",{class:"line"},[s("span",null,'<MyComponent message="&lt;3" />')]),n(`
`),s("span",{class:"line"},[s("span",null,"<MyComponent message={'<3'} />")]),n(`
`),s("span",{class:"line"},[s("span",null,"这种行为通常是不重要的，这里只是提醒有这个用法。")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"**三、Props 默认值为 “True”**")]),n(`
`),s("span",{class:"line"},[s("span",null,"如果你没给 prop 赋值，它的默认值是 true。以下两个 JSX 表达式是等价的：")]),n(`
`),s("span",{class:"line"},[s("span",null,"<MyTextBox autocomplete />")]),n(`
`),s("span",{class:"line"},[s("span",null,"<MyTextBox autocomplete={true} />")]),n(`
`),s("span",{class:"line"},[s("span",null,"通常，我们不建议不传递 value 给 prop，因为这可能与 [ES6](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Object_initializer#New_notations_in_ECMAScript_2015) 对象简写混淆，{foo} 是 {foo: foo} 的简写，而不是 {foo: true}。这样实现只是为了保持和 HTML 中标签属性的行为一致。")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"**四、属性展开**")]),n(`
`),s("span",{class:"line"},[s("span",null,"如果已经有了一个 props 对象，可以使用展开运算符 ... 来在 JSX 中传递整个 props 对象。以下两个组件是等价的：")]),n(`
`),s("span",{class:"line"},[s("span",null,"function App1() {")]),n(`
`),s("span",{class:"line"},[s("span",null,'    return <Greeting firstName="Ben" lastName="Hector" />;')]),n(`
`),s("span",{class:"line"},[s("span",null,"}")]),n(`
`),s("span",{class:"line"},[s("span",null,"function App2() {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    const props = { firstName: 'Ben', lastName: 'Hector' };")]),n(`
`),s("span",{class:"line"},[s("span",null,"    return <Greeting {...props} />;")]),n(`
`),s("span",{class:"line"},[s("span",null,"}")]),n(`
`),s("span",{class:"line"},[s("span",null,"你还可以选择只保留当前组件需要接收的 props，并使用展开运算符将其他 props 传递下去。")]),n(`
`),s("span",{class:"line"},[s("span",null,"const Button = props => {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    const { kind, ...other } = props;")]),n(`
`),s("span",{class:"line"},[s("span",null,'    const className = kind === "primary" ? "PrimaryButton" : "SecondaryButton";')]),n(`
`),s("span",{class:"line"},[s("span",null,"    return <button className={className} {...other} />;")]),n(`
`),s("span",{class:"line"},[s("span",null,"};")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"const App = () => {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    return (")]),n(`
`),s("span",{class:"line"},[s("span",null,"        <div>")]),n(`
`),s("span",{class:"line"},[s("span",null,'            <Button kind="primary" onClick={() => console.log("clicked!")}>')]),n(`
`),s("span",{class:"line"},[s("span",null,"                Hello World!")]),n(`
`),s("span",{class:"line"},[s("span",null,"        </Button>")]),n(`
`),s("span",{class:"line"},[s("span",null,"        </div>")]),n(`
`),s("span",{class:"line"},[s("span",null,"    );")]),n(`
`),s("span",{class:"line"},[s("span",null,"};")]),n(`
`),s("span",{class:"line"},[s("span",null,"在上述例子中，kind 的 prop 会被安全的保留，它将_不会_被传递给 DOM 中的 <button> 元素。 所有其他的 props 会通过 ...other 对象传递，使得这个组件的应用可以非常灵活。你可以看到它传递了一个 onClick 和 children 属性。")])])])]),s("p",null,[s("strong",null,"注意："),n(" 属性展开在某些情况下很有用，但是也很容易将不必要的 props 传递给不相关的组件，或者将无效的 HTML 属性传递给 DOM。我们建议谨慎的使用该语法。")])],-1)])])}const m=a(t,[["render",i]]);export{g as __pageData,m as default};
