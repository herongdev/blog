import{_ as l,o as a,c as t,j as s,a as n}from"./chunks/framework.DJo0M80U.js";const h=JSON.parse('{"title":"列表 & Key","description":"围绕“列表 & Key”整理的概念、示例与实践笔记。","frontmatter":{"title":"列表 & Key","date":"2026-08-11T00:00:00.000Z","categories":["React 系统教程"],"tags":["React","Redux","前端","教程","OneNote","核心概念与组件"],"description":"围绕“列表 & Key”整理的概念、示例与实践笔记。","sidebarWeight":64,"lastUpdated":false,"feed":false,"source":"onenote","sourceNote":"OneNote/f-vue/概念/列表 & Key/列表 & Key.md"},"headers":[],"relativePath":"posts/React系统教程/01-核心概念与组件/列表 & Key/列表 & Key.md","filePath":"posts/React系统教程/01-核心概念与组件/列表 & Key/列表 & Key.md"}'),p={name:"posts/React系统教程/01-核心概念与组件/列表 & Key/列表 & Key.md"};function i(c,e,o,r,u,d){return a(),t("div",null,[...e[0]||(e[0]=[s("div",null,[s("h1",{id:"列表-key",tabindex:"-1"},[n("列表 & Key "),s("a",{class:"header-anchor",href:"#列表-key","aria-label":'Permalink to "列表 & Key"'},"​")]),s("blockquote",null,[s("p",null,"本节目标：理解“列表 & Key”的核心思路，并能把它用于实际开发或面试表达。")]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"**渲染多个组件**")]),n(`
`),s("span",{class:"line"},[s("span",null,"你可以通过使用 {} 在 JSX 内构建一个[元素集合](https://react.docschina.org/docs/introducing-jsx.html#embedding-expressions-in-jsx)。")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"下面，我们使用 Javascript 中的 [map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) 方法来遍历 numbers 数组。将数组中的每个元素变成 <li> 标签，最后我们将得到的数组赋值给 listItems：")]),n(`
`),s("span",{class:"line"},[s("span",null,"const numbers = [1, 2, 3, 4, 5];const listItems = numbers.map((number) =>  <li>{number}</li>);")]),n(`
`),s("span",{class:"line"},[s("span",null,"我们把整个 listItems 插入到 <ul> 元素中，然后[渲染进](https://react.docschina.org/docs/rendering-elements.html#rendering-an-element-into-the-dom) DOM：")]),n(`
`),s("span",{class:"line"},[s("span",null,"ReactDOM.render(")]),n(`
`),s("span",{class:"line"},[s("span",null,"  <ul>{listItems}</ul>,")]),n(`
`),s("span",{class:"line"},[s("span",null,"  document.getElementById('root')")]),n(`
`),s("span",{class:"line"},[s("span",null,");")]),n(`
`),s("span",{class:"line"},[s("span",null,"这段代码生成了一个 1 到 5 的项目符号列表。")])])])]),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0","v-pre":""},[s("code",null,[s("span",{class:"line"},[s("span",null,"**基础列表组件**")]),n(`
`),s("span",{class:"line"},[s("span",null,"通常你需要在一个[组件](https://react.docschina.org/docs/components-and-props.html)中渲染列表。")]),n(`
`),s("span",{class:"line"},[s("span",null,"我们可以把前面的例子重构成一个组件，这个组件接收 numbers 数组作为参数并输出一个元素列表。")]),n(`
`),s("span",{class:"line"},[s("span",null,"function NumberList(props) {")]),n(`
`),s("span",{class:"line"},[s("span",null,"  const numbers = props.numbers;")]),n(`
`),s("span",{class:"line"},[s("span",null,"  const listItems =")]),n(`
`),s("span",{class:"line"},[s("span",null,"    numbers.map((number) => <li>{number}</li>);")]),n(`
`),s("span",{class:"line"},[s("span",null,"  return (")]),n(`
`),s("span",{class:"line"},[s("span",null,"    <ul>{listItems}</ul>")]),n(`
`),s("span",{class:"line"},[s("span",null,"  );")]),n(`
`),s("span",{class:"line"},[s("span",null,"}")]),n(`
`),s("span",{class:"line"},[s("span",null,"const numbers = [1, 2, 3, 4, 5];")]),n(`
`),s("span",{class:"line"},[s("span",null,"ReactDOM.render(")]),n(`
`),s("span",{class:"line"},[s("span",null,"  <NumberList numbers={numbers} />,")]),n(`
`),s("span",{class:"line"},[s("span",null,"  document.getElementById('root')")]),n(`
`),s("span",{class:"line"},[s("span",null,");")]),n(`
`),s("span",{class:"line"},[s("span",null,"当我们运行这段代码，将会看到一个警告 a key should be provided for list items，意思是当你创建一个元素时，必须包括一个特殊的 key 属性。我们将在下一节讨论这是为什么。")])])])])],-1)])])}const b=l(p,[["render",i]]);export{h as __pageData,b as default};
